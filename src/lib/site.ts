/**
 * Cấu hình bán hàng & liên hệ — nguồn DUY NHẤT cho giao diện, API đặt hàng và AI Lumi.
 * Các giá trị đánh dấu TẠM là số giả định để chạy thử; thay bằng số khách chốt trước khi mở bán.
 */

export const SITE = {
  name: "Luvia",
  tagline: "Hương thơm từ những điều tưởng chừng bỏ đi.",
  email: "luvia.nenthom@gmail.com",
  hotline: "0372 268 723",
  hotlineHref: "tel:0372268723",
  /** Địa chỉ liên hệ theo tài liệu — KHÔNG phải cửa hàng/điểm nhận hàng */
  address: "Đại học FPT – Campus Hòa Lạc – Hà Nội",
  /** Liên kết khách sẽ bổ sung. null = chưa có → giao diện không hiển thị */
  links: {
    tiktok: "https://www.tiktok.com/@luvia.com204",
    fanpage: "https://www.facebook.com/profile.php?id=61594794540816" as string | null,
    zalo: null as string | null,
    usageGuide: null as string | null,
    shippingPolicy: null as string | null,
    returnPolicy: null as string | null,
    privacyPolicy: null as string | null,
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

/**
 * Cờ mở bán. false → nút mua hiển thị "Sắp mở bán" và API từ chối tạo đơn.
 * Bật bằng biến môi trường NEXT_PUBLIC_SALES_OPEN=true khi khách đã chốt giá & chính sách.
 */
export const SALES_OPEN = process.env.NEXT_PUBLIC_SALES_OPEN === "true";

/** Lời nhắn trên thiệp — giới hạn ký tự chờ khách chốt (TẠM) */
export const CARD_MESSAGE = { enabled: true, maxLength: 120 } as const;

// ---------------------------------------------------------------------------
// Giao hàng (TẠM — chờ khách chốt bảng phí và đơn vị vận chuyển)
// ---------------------------------------------------------------------------

export type ShippingZone = "hanoi" | "north" | "other";

export const SHIPPING_ZONES: Record<ShippingZone, { label: string; fee: number; transitDays: [number, number] }> = {
  hanoi: { label: "Nội thành Hà Nội", fee: 25_000, transitDays: [1, 2] },
  north: { label: "Các tỉnh miền Bắc", fee: 30_000, transitDays: [2, 3] },
  other: { label: "Các tỉnh/thành khác", fee: 35_000, transitDays: [3, 5] },
};

export const SHIPPING_METHOD = { id: "standard", label: "Giao hàng tiêu chuẩn" } as const;

/** 34 tỉnh/thành sau sắp xếp đơn vị hành chính 2025 → vùng tính phí */
export const PROVINCES: { name: string; zone: ShippingZone }[] = [
  { name: "Hà Nội", zone: "hanoi" },
  { name: "Hải Phòng", zone: "north" },
  { name: "Quảng Ninh", zone: "north" },
  { name: "Bắc Ninh", zone: "north" },
  { name: "Hưng Yên", zone: "north" },
  { name: "Ninh Bình", zone: "north" },
  { name: "Phú Thọ", zone: "north" },
  { name: "Thái Nguyên", zone: "north" },
  { name: "Tuyên Quang", zone: "north" },
  { name: "Lào Cai", zone: "north" },
  { name: "Lạng Sơn", zone: "north" },
  { name: "Cao Bằng", zone: "north" },
  { name: "Lai Châu", zone: "north" },
  { name: "Điện Biên", zone: "north" },
  { name: "Sơn La", zone: "north" },
  { name: "Thanh Hóa", zone: "other" },
  { name: "Nghệ An", zone: "other" },
  { name: "Hà Tĩnh", zone: "other" },
  { name: "Quảng Trị", zone: "other" },
  { name: "Huế", zone: "other" },
  { name: "Đà Nẵng", zone: "other" },
  { name: "Quảng Ngãi", zone: "other" },
  { name: "Gia Lai", zone: "other" },
  { name: "Đắk Lắk", zone: "other" },
  { name: "Khánh Hòa", zone: "other" },
  { name: "Lâm Đồng", zone: "other" },
  { name: "Đồng Nai", zone: "other" },
  { name: "TP. Hồ Chí Minh", zone: "other" },
  { name: "Tây Ninh", zone: "other" },
  { name: "Đồng Tháp", zone: "other" },
  { name: "Vĩnh Long", zone: "other" },
  { name: "Cần Thơ", zone: "other" },
  { name: "An Giang", zone: "other" },
  { name: "Cà Mau", zone: "other" },
];

export function shippingFor(province: string) {
  const p = PROVINCES.find((x) => x.name === province);
  if (!p) return null;
  return { zone: p.zone, ...SHIPPING_ZONES[p.zone] };
}

// ---------------------------------------------------------------------------
// Thanh toán — chỉ hiển thị phương thức đã kích hoạt (tài liệu mục 7.5 phần 3)
// ---------------------------------------------------------------------------

export type PaymentMethod = "cod" | "bank" | "online";

export const PAYMENT_METHODS: { id: PaymentMethod; label: string; enabled: boolean }[] = [
  { id: "cod", label: "Thanh toán khi nhận hàng (COD)", enabled: true },
  { id: "bank", label: "Chuyển khoản ngân hàng / QR", enabled: true },
  // Cổng thanh toán trực tuyến: chưa tích hợp → không hiển thị
  { id: "online", label: "Thanh toán trực tuyến", enabled: false },
];

export const ENABLED_PAYMENT_METHODS = PAYMENT_METHODS.filter((m) => m.enabled);

/**
 * Hạn chuyển khoản cho đơn "Chờ thanh toán".
 * Lưu ý: mã VietQR KHÔNG thật sự hết hiệu lực sau mốc này — nó chỉ là một ảnh sinh theo
 * tham số, không có máy chủ nào vô hiệu hoá nó. Mốc này chỉ để giục khách trên giao diện.
 */
export const BANK_TRANSFER_DEADLINE_MINUTES = 5;

/** Mã giảm giá hợp lệ — hiện chưa có chương trình nào (tài liệu: không thêm ưu đãi khi chưa xác nhận) */
export const COUPONS: Record<string, { pct: number; label: string }> = {};

/**
 * Tài khoản nhận chuyển khoản VietQR — cấu hình trong .env.local.
 * Chưa cấu hình → không hiển thị mã QR (tránh khách chuyển nhầm).
 */
export const BANK = {
  bin: process.env.NEXT_PUBLIC_BANK_BIN ?? "",
  account: process.env.NEXT_PUBLIC_BANK_ACCOUNT ?? "",
  accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME ?? "",
  bankName: process.env.NEXT_PUBLIC_BANK_NAME ?? "",
};

export const BANK_CONFIGURED = Boolean(BANK.bin && BANK.account);

export function vietQrUrl(amount: number, memo: string): string | null {
  if (!BANK_CONFIGURED) return null;
  const params = new URLSearchParams({
    amount: String(Math.round(amount)),
    addInfo: memo,
    accountName: BANK.accountName,
  });
  return `https://img.vietqr.io/image/${BANK.bin}-${BANK.account}-compact2.png?${params}`;
}

/** Thông tin chính sách cho Lumi — CHỈ những gì đã có trong tài liệu khách */
export function policyForAI() {
  return [
    `Liên hệ đội ngũ Luvia: email ${SITE.email}, hotline ${SITE.hotline}.`,
    ...(SITE.links.fanpage ? [`Fanpage Facebook: ${SITE.links.fanpage}`] : []),
    ...(SITE.links.tiktok ? [`TikTok: ${SITE.links.tiktok}`] : []),
    "Đặt nhiều sản phẩm làm quà / doanh nghiệp: gửi nhu cầu qua mục Quà tặng & Hợp tác; Luvia trao đổi số lượng, ngân sách, đóng gói, thời gian trước khi thống nhất.",
    "Muốn mùi hoặc mẫu hộp ngoài danh mục: gửi yêu cầu riêng để Luvia tư vấn và báo giá.",
    "Thời gian giao dự kiến hiển thị ở trang sản phẩm và bước đặt hàng; hàng tùy chỉnh/đặt trước có thêm thời gian chuẩn bị.",
    SALES_OPEN
      ? "Website đang nhận đơn trực tuyến."
      : "Website CHƯA mở nhận đơn trực tuyến; khách cần đặt thì nhắn đội ngũ Luvia.",
  ].join("\n- ");
}
