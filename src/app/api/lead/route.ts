import { allowWithoutWebhook, clientIp, postToWebhook, rateLimit, webhookConfigured } from "@/lib/server/integrations";
import { LEAD_FIELDS, validateLead, type LeadKind } from "@/lib/lead";
import { LEAD_FORMS } from "@/content/vi";

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** Form "Trao đổi nhu cầu hợp tác" (B2B) ở trang Quà tặng */
export async function POST(req: Request) {
  if (!rateLimit(`lead:${clientIp(req)}`, 5, 10 * 60_000)) {
    return json({ ok: false, error: "Bạn gửi hơi nhanh, vui lòng thử lại sau ít phút." }, 429);
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: LEAD_FORMS.error }, 400);
  }
  // Honeypot: trường ẩn "website" chỉ bot mới điền → giả vờ thành công
  if (typeof body.website === "string" && body.website.trim()) return json({ ok: true });

  const kind = body.kind as LeadKind;
  if (!(kind in LEAD_FIELDS)) return json({ ok: false, error: LEAD_FORMS.error }, 400);
  const result = validateLead(kind, body.fields);
  if (!result.ok) return json({ ok: false, error: result.error, fields: result.errors }, 400);

  if (webhookConfigured()) {
    const sent = await postToWebhook("lead", { kind, fields: result.fields, createdAt: new Date().toISOString() });
    if (!sent.ok) {
      console.error("[lead] webhook failed:", sent.error);
      return json({ ok: false, error: LEAD_FORMS.error }, 502);
    }
  } else if (!allowWithoutWebhook()) {
    return json({ ok: false, error: LEAD_FORMS.error }, 503);
  } else {
    console.warn("[lead] DEMO: chưa cấu hình ORDERS_WEBHOOK_URL —", kind);
  }
  return json({ ok: true });
}
