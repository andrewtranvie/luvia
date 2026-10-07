import { catalogForAI, PRODUCTS } from "@/lib/products";


type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `Bạn là "Luvia" — linh vật kiêm chuyên gia tư vấn mùi hương của thương hiệu nến thơm Luvia (Việt Nam).
Luvia là một ngọn nến nhỏ dễ thương, đeo khăn lá xanh, luôn vui vẻ, ấm áp, yêu thiên nhiên.

VỀ THƯƠNG HIỆU:
- Nến Luvia làm thủ công từ dầu ăn đã qua sử dụng: thu gom → lọc cặn, khử mùi, tẩy màu → phối trộn với sáp thực vật → thêm tinh dầu/hương liệu an toàn → đổ khuôn trong hũ thuỷ tinh tái sử dụng được.
- Thành phẩm không còn mùi dầu ăn, bấc cotton không chì, cháy sạch, ít khói.
- Slogan: "Lan tỏa ánh sáng xanh cùng Luvia". "Không chỉ là một ngọn nến, mà là hành trình vì một tương lai xanh hơn."
- Chính sách: miễn phí giao hàng đơn từ 500.000₫ (dưới đó phí 30.000₫). Mang 1 lít dầu ăn cũ đến điểm thu gom đổi voucher 30.000₫. Hũ thuỷ tinh rỗng gửi lại được giảm 10% đơn sau. Mã XANH10 giảm 10%.
- Mẹo dùng nến: lần đầu đốt 2–3 tiếng cho sáp tan đều mặt; cắt bấc còn ~5mm trước mỗi lần đốt; không đốt quá 4 tiếng liên tục; để xa rèm, trẻ em và thú cưng.

DANH MỤC SẢN PHẨM (chỉ được gợi ý các sản phẩm này):
${catalogForAI()}

CÁCH TƯ VẤN:
- Trả lời bằng tiếng Việt, thân thiện, xưng "mình" và gọi khách là "bạn". Ngắn gọn (tối đa ~120 từ), dùng 1–2 emoji phù hợp (🌿✨🕯️💛).
- Nếu chưa đủ thông tin, hỏi lại 1 câu ngắn về: không gian (phòng ngủ, làm việc, phòng khách…), thời điểm/tâm trạng mong muốn, mùi yêu thích hoặc ghét, ngân sách, mua để dùng hay tặng.
- Khi gợi ý, chọn 1–3 sản phẩm phù hợp nhất. Mỗi khi nhắc đến sản phẩm, BẮT BUỘC viết đúng mã dạng [[slug]] thay cho tên (ví dụ: "Bạn thử [[oai-huong-da-lat]] nhé"). Giao diện sẽ tự hiển thị tên và thẻ sản phẩm. Giải thích ngắn gọn vì sao hợp (nốt hương, cảm giác).
- Có thể gợi ý size (Mini 100g, Classic 200g, Grand 350g) theo ngân sách hoặc làm quà.
- Dùng **chữ đậm** cho ý quan trọng. Không dùng tiêu đề markdown, không dùng bảng.
- Không bịa sản phẩm, giá, khuyến mãi ngoài thông tin trên. Câu hỏi về y tế: nhắc khách tham khảo bác sĩ, phụ nữ mang thai/người hen suyễn nên dùng ở phòng thông thoáng.
- Nếu khách hỏi ngoài chủ đề nến/mùi hương/thương hiệu, nhẹ nhàng đưa câu chuyện quay lại việc tư vấn.`;

function sanitize(body: unknown): Msg[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const msgs = (body as { messages: unknown[] }).messages
    .filter(
      (m): m is Msg =>
        !!m &&
        typeof m === "object" &&
        ((m as Msg).role === "user" || (m as Msg).role === "assistant") &&
        typeof (m as Msg).content === "string",
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    .slice(-16);
  // Gemini yêu cầu lượt đầu tiên là của người dùng
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  return msgs.length ? msgs : null;
}

export async function POST(req: Request) {
  let messages: Msg[] | null;
  try {
    messages = sanitize(await req.json());
  } catch {
    messages = null;
  }
  if (!messages) return new Response("Yêu cầu không hợp lệ", { status: 400 });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return textStream(fallbackAnswer(messages[messages.length - 1].content));

  const model = process.env.GEMINI_MODEL || "gemini-flash-latest";
  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: { temperature: 0.8, maxOutputTokens: 2048 },
      }),
    },
  ).catch(() => null);

  if (!upstream?.ok || !upstream.body) {
    console.error("Gemini error", upstream?.status, await upstream?.text().catch(() => ""));
    return textStream(fallbackAnswer(messages[messages.length - 1].content));
  }

  // Chuyển SSE của Gemini thành luồng văn bản thuần cho client
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          try {
            const json = JSON.parse(line.slice(5).trim());
            const parts: { text?: string; thought?: boolean }[] = json.candidates?.[0]?.content?.parts ?? [];
            const text = parts.filter((p) => !p.thought).map((p) => p.text ?? "").join("");
            if (text) controller.enqueue(encoder.encode(text));
          } catch {}
        }
      },
    }),
  );
  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}

function textStream(text: string) {
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

/** Tư vấn theo từ khoá khi chưa cấu hình GEMINI_API_KEY (hoặc API lỗi) */
function fallbackAnswer(q: string): string {
  const s = q.toLowerCase().normalize("NFC");
  const rules: [RegExp, string[], string][] = [
    [/ngủ|mất ngủ|khó ngủ|thư giãn|stress|căng thẳng|mệt/, ["oai-huong-da-lat", "mua-rung-nhiet-doi"], "Để thả lỏng và ngủ ngon hơn"],
    [/làm việc|học|tập trung|deadline|văn phòng|tỉnh táo/, ["tra-xanh-bac-ha", "sa-chanh-rung"], "Cho góc làm việc cần sự tỉnh táo"],
    [/quà|tặng|mẹ|bạn gái|người yêu|sinh nhật|valentine|8\/3|20\/10/, ["hoa-buoi-thang-hai", "nhai-sen-ho-tay", "vani-dua-non"], "Làm quà tặng thì mình rất thích"],
    [/ngọt|vani|ấm|mưa|lạnh|giáng sinh|noel|tết/, ["cam-que-tet-ve", "vani-dua-non"], "Nếu bạn thích cảm giác ấm áp, ngọt ngào"],
    [/gỗ|trầm|thiền|yoga|nam|bố/, ["go-dan-huong", "mua-rung-nhiet-doi"], "Với hương gỗ trầm ấm, vững chãi"],
    [/tươi|mát|chanh|sả|bếp|khử mùi|ẩm/, ["sa-chanh-rung", "hoa-buoi-thang-hai"], "Để không gian luôn tươi mát, sạch mùi"],
    [/hoa|nhài|sen|bưởi|nữ tính|dịu/, ["hoa-buoi-thang-hai", "nhai-sen-ho-tay"], "Nếu bạn mê hương hoa dịu dàng"],
  ];
  if (/an toàn|dầu ăn|mùi dầu|độc|khói|làm từ|tái chế/.test(s)) {
    return "Bạn yên tâm nhé 🌿 Dầu ăn cũ được Luvia **lọc cặn, khử mùi, tẩy màu** kỹ rồi mới phối với sáp thực vật và hương liệu an toàn. Nến **không còn mùi dầu**, dùng bấc cotton không chì nên cháy sạch, ít khói. Bạn muốn mình gợi ý mùi hương nào để thử không?";
  }
  for (const [re, slugs, intro] of rules) {
    if (re.test(s)) {
      const list = slugs.map((x) => `[[${x}]]`).join(", ");
      return `${intro}, bạn thử ${list} nhé ✨ Mỗi hũ Classic 200g cháy được khoảng **40–45 giờ**. Nếu muốn thử trước, bạn chọn size Mini 100g cho tiết kiệm. Bạn còn muốn mình tư vấn thêm điều gì không? 🕯️`;
    }
  }
  const best = PRODUCTS.filter((p) => p.badge === "Bán chạy" || p.badge === "Thuần Việt").map((p) => `[[${p.slug}]]`);
  return `Mình gợi ý bạn hai mùi được yêu thích nhất: ${best.join(" và ")} 💛 Kể mình nghe thêm bạn định thắp nến ở đâu (phòng ngủ, góc làm việc…) và thích mùi tươi mát, hoa cỏ hay ngọt ấm để mình chọn chuẩn hơn nhé!`;
}
