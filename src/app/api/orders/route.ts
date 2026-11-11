import { buildOrder, type CreatedOrder } from "@/lib/orders";
import { allowWithoutWebhook, clientIp, postToWebhook, rateLimit, webhookConfigured } from "@/lib/server/integrations";
import { CHECKOUT } from "@/content/vi";

/** Chống tạo đơn lặp: cùng idempotencyKey trong 1 giờ trả lại đúng đơn đã tạo */
const recent = new Map<string, { order: CreatedOrder; at: number }>();
const IDEMPOTENCY_TTL = 3600_000;

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (!rateLimit(`order:${clientIp(req)}`, 10, 10 * 60_000)) {
    return json({ ok: false, error: "Bạn thao tác hơi nhanh, vui lòng thử lại sau ít phút." }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: CHECKOUT.genericError }, 400);
  }

  const key = typeof body.idempotencyKey === "string" ? body.idempotencyKey.slice(0, 64) : "";
  if (!/^[a-zA-Z0-9-]{8,64}$/.test(key)) return json({ ok: false, error: CHECKOUT.genericError }, 400);

  const now = Date.now();
  for (const [k, v] of recent) if (now - v.at > IDEMPOTENCY_TTL) recent.delete(k);
  const existing = recent.get(key);
  if (existing) return json({ ok: true, order: existing.order, duplicate: true });

  const result = buildOrder(body);
  if (!result.ok) return json({ ok: false, error: result.error, fields: result.fields }, result.status);
  const order = result.order;

  if (webhookConfigured()) {
    const sent = await postToWebhook("order", { idempotencyKey: key, order });
    if (!sent.ok) {
      console.error("[orders] webhook failed:", sent.error);
      return json({ ok: false, error: CHECKOUT.genericError }, 502);
    }
    // Apps Script lọc trùng theo idempotencyKey và trả lại mã đơn đã lưu
    if (typeof sent.data.code === "string" && sent.data.code !== order.code) order.code = sent.data.code;
  } else if (!allowWithoutWebhook()) {
    console.error("[orders] ORDERS_WEBHOOK_URL chưa được cấu hình — từ chối nhận đơn");
    return json({ ok: false, error: CHECKOUT.salesClosed }, 503);
  } else {
    console.warn(`[orders] DEMO: đơn ${order.code} chưa được gửi tới shop (chưa cấu hình ORDERS_WEBHOOK_URL)`);
  }

  recent.set(key, { order, at: now });
  return json({ ok: true, order, delivered: webhookConfigured() });
}
