import { normalizePhone } from "@/lib/orders";
import { clientIp, getOrderFromWebhook, rateLimit, webhookConfigured } from "@/lib/server/integrations";

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** GET /api/orders/LV-261014-AB12?phone=0372268723 → trạng thái đơn mới nhất trong Google Sheet */
export async function GET(req: Request, ctx: RouteContext<"/api/orders/[code]">) {
  if (!rateLimit(`lookup:${clientIp(req)}`, 30, 10 * 60_000)) return json({ ok: false, error: "rate_limited" }, 429);

  const { code } = await ctx.params;
  const phone = normalizePhone(new URL(req.url).searchParams.get("phone") ?? "");
  if (!/^LV-\d{6}-[A-Z0-9]{4}$/.test(code) || phone.length < 9) return json({ ok: false, error: "invalid" }, 400);
  if (!webhookConfigured()) return json({ ok: false, error: "not_configured" }, 404);

  const res = await getOrderFromWebhook(code, phone);
  if (!res.ok) return json({ ok: false, error: "not_found" }, 404);
  return json({ ok: true, status: res.data });
}
