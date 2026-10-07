/**
 * Nguồn dữ liệu DUY NHẤT cho thông tin liên hệ & chính sách bán hàng.
 * Giao diện, trang thanh toán và prompt của AI tư vấn đều đọc từ đây —
 * sửa ở đây là toàn bộ website (kể cả chatbot) cập nhật theo.
 *
 * TODO(chủ shop): thay các thông tin liên hệ dưới đây bằng thông tin thật.
 */
export const SITE = {
  name: "Luvia",
  slogan: "Lan tỏa ánh sáng xanh cùng Luvia",
  hotline: "0988 123 456",
  email: "hello@luvia.vn",
  b2bEmail: "b2b@luvia.vn",
  address: "Hà Nội, Việt Nam",
  socials: {
    facebook: "#",
    instagram: "#",
  },
} as const;

export const POLICY = {
  /** Miễn phí giao hàng khi tạm tính (trước giảm giá) đạt mức này */
  freeShipFrom: 500_000,
  shippingFee: 30_000,
  /** Voucher khi gửi 1 lít dầu ăn cũ */
  oilVoucher: 30_000,
  /** % giảm cho đơn sau khi trả lại hũ thuỷ tinh rỗng */
  jarReturnPct: 10,
  giftWrapFee: 15_000,
} as const;

export const COUPONS: Record<string, { pct: number; label: string }> = {
  XANH10: { pct: 10, label: "Giảm 10% — Sống xanh mỗi ngày" },
  LUVIA15: { pct: 15, label: "Giảm 15% — Khách hàng mới" },
};

/**
 * Tài khoản nhận chuyển khoản VietQR — cấu hình trong .env.local.
 * Chưa cấu hình → không hiển thị mã QR (tránh khách chuyển nhầm vào tài khoản giả).
 */
export const BANK = {
  bin: process.env.NEXT_PUBLIC_BANK_BIN ?? "",
  account: process.env.NEXT_PUBLIC_BANK_ACCOUNT ?? "",
  accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME ?? "",
};

export function vietQrUrl(amount: number, memo: string): string | null {
  if (!BANK.bin || !BANK.account) return null;
  const params = new URLSearchParams({
    amount: String(Math.round(amount)),
    addInfo: memo,
    accountName: BANK.accountName,
  });
  return `https://img.vietqr.io/image/${BANK.bin}-${BANK.account}-compact2.png?${params}`;
}

/** Tóm tắt chính sách cho AI tư vấn (đồng bộ với POLICY) */
export function policyForAI() {
  const vnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";
  return [
    `Miễn phí giao hàng đơn từ ${vnd(POLICY.freeShipFrom)} (dưới mức đó phí ${vnd(POLICY.shippingFee)}).`,
    `Gửi 1 lít dầu ăn cũ (cho shipper hoặc mang đến điểm thu gom) được trừ ${vnd(POLICY.oilVoucher)}.`,
    `Trả lại hũ thuỷ tinh rỗng được giảm ${POLICY.jarReturnPct}% đơn tiếp theo.`,
    `Gói quà giấy kraft + thiệp viết tay: ${vnd(POLICY.giftWrapFee)}.`,
    `Mã giảm giá: ${Object.entries(COUPONS)
      .map(([code, c]) => `${code} (${c.label})`)
      .join(", ")}.`,
    `Liên hệ: hotline ${SITE.hotline}, email ${SITE.email}; hợp tác doanh nghiệp/quà tặng B2B: ${SITE.b2bEmail} hoặc trang /doi-ngu.`,
  ].join("\n- ");
}
