/**
 * Mô hình dòng sản phẩm + tính giá. Hàm thuần — dùng chung cho client (giỏ hàng)
 * và server (API đặt hàng tính lại giá, không tin giá client gửi lên).
 */
import { GIFT_WRAP_BOX_ID, getBox, getSeason, getVariant, type SeasonId } from "./catalog";
import { CARD_MESSAGE } from "./site";

/**
 * Cấu hình một dòng sản phẩm: một mùa hương × một quy cách, có thể kèm hộp quà.
 * Trường `kind` giữ lại dù chỉ còn một giá trị: dữ liệu đã lưu ở localStorage và
 * đơn hàng cũ đều có nó, và nhờ nó `parseConfig` tự loại các dòng "custom" của
 * bộ tự chọn mùi & hộp đã ngừng bán.
 */
export type LineConfig = {
  kind: "season";
  seasonId: SeasonId;
  variantId: string;
  giftWrap?: boolean;
  cardMessage?: string;
};

export interface CartLine {
  id: string;
  config: LineConfig;
  qty: number;
}

export const MAX_QTY = 20;

export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(n) + "₫";

export function normalizeMessage(msg: string | undefined) {
  return (msg ?? "").replace(/\s+/g, " ").trim().slice(0, CARD_MESSAGE.maxLength);
}

/** Khoá định danh cấu hình: cùng khoá → gộp số lượng; khác khoá → dòng riêng */
export function configKey(c: LineConfig): string {
  return `season|${c.seasonId}|${c.variantId}|${c.giftWrap ? `${GIFT_WRAP_BOX_ID}:${normalizeMessage(c.cardMessage)}` : ""}`;
}

export interface PriceBreakdown {
  base: number;
  box: number;
  card: number;
  unit: number;
}

/** Bảng giá một đơn vị. null nếu cấu hình không hợp lệ (mã không tồn tại) */
export function unitPrice(c: LineConfig): PriceBreakdown | null {
  const variant = getVariant(c.variantId);
  if (!variant) return null;
  const season = getSeason(c.seasonId);
  if (!season || !season.variants.includes(c.variantId)) return null;
  const base = season.price + variant.priceDelta;
  const gift = c.giftWrap ? getBox(GIFT_WRAP_BOX_ID) : null;
  if (c.giftWrap && !gift) return null;
  const box = gift?.surcharge ?? 0;
  const card = gift && normalizeMessage(c.cardMessage) ? gift.cardFee : 0;
  return { base, box, card, unit: base + box + card };
}

export function lineTotal(line: CartLine) {
  return (unitPrice(line.config)?.unit ?? 0) * line.qty;
}

export type Availability = { ok: true } | { ok: false; name: string; reason: "invalid" | "unavailable" | "message" };

/** Lời nhắn chỉ hợp lệ khi hộp có thiệp, tính năng đang bật và chưa vượt số ký tự cho phép */
function messageIssue(msg: string | undefined, allowsCard: boolean): Availability | null {
  if (!msg) return null;
  if (allowsCard && CARD_MESSAGE.enabled && msg.trim().length <= CARD_MESSAGE.maxLength) return null;
  return { ok: false, name: "lời nhắn trên thiệp", reason: "message" };
}

/** Kiểm tra cấu hình còn đặt được không (tồn kho/khả năng sản xuất, mã hợp lệ, lời nhắn hợp lệ) */
export function checkAvailability(c: LineConfig): Availability {
  if (!unitPrice(c)) return { ok: false, name: describeLine(c).title, reason: "invalid" };
  const s = getSeason(c.seasonId)!;
  if (s.status === "unavailable") return { ok: false, name: s.fullName, reason: "unavailable" };
  if (!c.giftWrap) return { ok: true };
  const box = getBox(GIFT_WRAP_BOX_ID)!;
  if (!box.available) return { ok: false, name: box.name, reason: "unavailable" };
  return messageIssue(c.cardMessage, box.allowsCard) ?? { ok: true };
}

export interface LineDescription {
  title: string;
  scent: string;
  variant: string;
  netWeight: string | null;
  box: string | null;
  message: string | null;
  isPreorder: boolean;
  seasonId: SeasonId | null;
  prepDays: [number, number] | null;
}

/** Thông tin hiển thị cho một dòng (giỏ hàng, trang đặt hàng, email đơn) */
export function describeLine(c: LineConfig): LineDescription {
  const variant = getVariant(c.variantId);
  const s = getSeason(c.seasonId);
  const gift = c.giftWrap ? getBox(GIFT_WRAP_BOX_ID) : null;
  return {
    title: s?.fullName ?? "Sản phẩm không còn khả dụng",
    scent: s?.name ?? "",
    variant: variant?.label ?? "",
    netWeight: variant?.netWeight ?? null,
    box: gift?.name ?? null,
    message: (gift && normalizeMessage(c.cardMessage)) || null,
    isPreorder: s?.status === "preorder",
    seasonId: s?.id ?? null,
    prepDays: s?.prepDays ?? null,
  };
}

/** Thời gian chuẩn bị dài nhất trong đơn (để cộng với thời gian vận chuyển) */
export function maxPrepDays(lines: CartLine[]): [number, number] | null {
  let res: [number, number] | null = null;
  for (const l of lines) {
    const p = describeLine(l.config).prepDays;
    if (!p) continue;
    res = res ? [Math.max(res[0], p[0]), Math.max(res[1], p[1])] : [p[0], p[1]];
  }
  return res;
}

/** Ép kiểu + làm sạch cấu hình nhận từ bên ngoài (localStorage, request body, URL) */
export function parseConfig(raw: unknown): LineConfig | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.slice(0, 64) : "");
  const cardMessage = typeof r.cardMessage === "string" ? r.cardMessage.slice(0, 500) : undefined;
  // kind khác "season" (ví dụ "custom" của bộ tự chọn đã ngừng bán) → bỏ dòng đó
  if (r.kind !== "season") return null;
  const seasonId = str(r.seasonId);
  if (!getSeason(seasonId)) return null;
  return {
    kind: "season",
    seasonId: seasonId as SeasonId,
    variantId: str(r.variantId),
    ...(r.giftWrap === true ? { giftWrap: true as const, ...(cardMessage ? { cardMessage } : {}) } : {}),
  };
}
