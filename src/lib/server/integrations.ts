import "server-only";

/**
 * Kết nối phía server: giới hạn tần suất + gửi dữ liệu sang Google Apps Script
 * (ghi Google Sheet và gửi email cho shop). Xem integrations/google-apps-script.gs.
 */

// ---------------------------------------------------------------------------
// Giới hạn tần suất (bộ nhớ trong — đủ cho một instance; mỗi instance serverless đếm riêng)
// ---------------------------------------------------------------------------

const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return true;
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
}

// ---------------------------------------------------------------------------
// Google Apps Script webhook
// ---------------------------------------------------------------------------

const WEBHOOK_URL = process.env.ORDERS_WEBHOOK_URL ?? "";
const WEBHOOK_SECRET = process.env.ORDERS_WEBHOOK_SECRET ?? "";

export const webhookConfigured = () => Boolean(WEBHOOK_URL);

/** Cho phép nhận đơn khi chưa có webhook (chỉ để demo — đơn KHÔNG tới được shop) */
export const allowWithoutWebhook = () =>
  process.env.ALLOW_ORDERS_WITHOUT_WEBHOOK === "true" || process.env.NODE_ENV !== "production";

export type WebhookResult = { ok: true; data: Record<string, unknown> } | { ok: false; error: string };

async function call(url: string, init: RequestInit): Promise<WebhookResult> {
  try {
    // Apps Script trả 302 sang googleusercontent → fetch tự theo redirect
    const res = await fetch(url, { ...init, redirect: "follow", signal: AbortSignal.timeout(10_000), cache: "no-store" });
    const text = await res.text();
    let data: Record<string, unknown> = {};
    try {
      data = JSON.parse(text);
    } catch {
      return { ok: false, error: `Webhook trả về không phải JSON (HTTP ${res.status})` };
    }
    if (!res.ok || data.ok === false) return { ok: false, error: String(data.error ?? `HTTP ${res.status}`) };
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "fetch failed" };
  }
}

/** Gửi một bản ghi (đơn hàng / form) tới Apps Script */
export function postToWebhook(type: "order" | "lead", payload: Record<string, unknown>) {
  return call(WEBHOOK_URL, {
    method: "POST",
    // text/plain để Apps Script nhận body nguyên vẹn, không bị preflight
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ type, secret: WEBHOOK_SECRET, ...payload }),
  });
}

/** Tra cứu trạng thái đơn trong Google Sheet */
export function getOrderFromWebhook(code: string, phone: string) {
  const q = new URLSearchParams({ action: "order", code, phone, secret: WEBHOOK_SECRET });
  return call(`${WEBHOOK_URL}?${q}`, { method: "GET" });
}
