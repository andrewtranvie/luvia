/**
 * Danh mục sản phẩm Luvia — Bộ sưu tập bốn mùa + hộp quà cộng thêm.
 * Dùng được ở cả server (API đặt hàng tính lại giá) và client.
 *
 * QUY ƯỚC: giá trị `null` = khách CHƯA CHỐT → giao diện hiển thị "Đang cập nhật".
 * Giá lấy từ bảng "Dự kiến danh mục sản phẩm bán thử nghiệm" khách gửi 2026-10-21.
 * Thời gian cháy, thành phần và đặc điểm nổi bật lấy từ FILE TEM NHÃN (packing.pdf,
 * cùng ngày) — bảng giá ghi giờ cháy thấp hơn (22–25 / 35–38 / 45–50) nhưng web phải
 * khớp con số in trên hộp khách cầm trên tay.
 * Lỗi chính tả trên tem ("trắm hương", "tuyệt tùng", "Bắc cotton", "thành khiết")
 * đã sửa lại cho đúng khi đưa lên web.
 * Không thêm số sao, đánh giá hay khẳng định an toàn khi chưa có căn cứ.
 */
import { SEASON_COPY } from "@/content/vi";

export type SeasonId = "xuan" | "ha" | "thu" | "dong";
export type StockStatus = "in_stock" | "preorder" | "unavailable";

export interface Variant {
  id: string;
  label: string;
  /** Khối lượng tịnh, ví dụ "200 g" — null = chờ chốt */
  netWeight: string | null;
  /** Thời gian cháy tham khảo, ví dụ "45–50 giờ" — null = chờ chốt */
  burnTime: string | null;
  /** Không gian phù hợp, theo bảng danh mục khách gửi — null = chờ chốt */
  spaceNote: string | null;
  /** Cộng thêm vào giá mùa (VND) */
  priceDelta: number;
}

/** Một ảnh trong thư viện trang chi tiết. Mọi ảnh đều vuông 1:1 để khớp khung. */
export interface GalleryImage {
  src: string;
}

export interface Season {
  id: SeasonId;
  name: string;
  fullName: string;
  mood: string;
  description: string;
  suggestion: string;
  cta: string;
  /** Bảng màu riêng của mùa (theo gợi ý trình bày: mỗi mùa một sắc màu) */
  color: { primary: string; soft: string; wax: string };
  /** Mục "ĐẶC ĐIỂM NỔI BẬT" trên tem nhãn — dòng đầu riêng từng mùi */
  highlights: string[];
  /** Mục "THÀNH PHẦN" trên tem nhãn */
  ingredients: string[];
  /** Riêng phần tinh dầu trong THÀNH PHẦN — thứ phân biệt bốn mùi với nhau */
  essentialOils: string[];
  /** Giá quy cách nhỏ nhất (VND). Quy cách lớn hơn cộng thêm Variant.priceDelta. */
  price: number;
  status: StockStatus;
  /** Số ngày chuẩn bị trước khi giao (hàng có sẵn thường 1) — null = chờ chốt */
  prepDays: [number, number] | null;
  /** Ảnh cho lưới bốn mùa nhỏ ngoài trang chủ. null = chưa có ảnh */
  image: string | null;
  /** Poster vuông 1:1 khách gửi (có logo + tên mùi hương) cho thẻ trang Bộ sưu tập.
      Phải để nguyên khung vuông, cắt ngang là mất chữ. */
  poster: string;
  /** Thư viện ảnh trang chi tiết: poster → một hũ → trọn bộ ba quy cách */
  gallery: GalleryImage[];
  variants: string[];
}

export interface Box {
  id: string;
  name: string;
  description: string;
  /** Phụ phí hộp (VND) */
  surcharge: number;
  /** Hộp này có kèm thiệp viết lời nhắn không */
  allowsCard: boolean;
  /** Phụ phí khi có lời nhắn trên thiệp (VND) */
  cardFee: number;
  available: boolean;
}

// ---------------------------------------------------------------------------
// Dữ liệu (TẠM — thay bằng thông tin khách chốt)
// ---------------------------------------------------------------------------

/**
 * Ba quy cách bán thử nghiệm — theo bảng "Dự kiến danh mục sản phẩm bán thử nghiệm"
 * khách gửi 2026-10-21. Giá niêm yết: 115.000 / 155.000 / 199.000.
 * Giá cuối = season.price (115.000) + priceDelta.
 */
export const VARIANTS: Variant[] = [
  {
    id: "hu-100g",
    label: "Hũ thủy tinh đen vai bầu, nắp bần",
    netWeight: "100 g",
    burnTime: "25–30 giờ",
    spaceNote: "Nhỏ gọn, hợp bàn học, góc làm việc cá nhân, góc decor nhỏ.",
    priceDelta: 0,
  },
  {
    id: "coc-150g",
    label: "Cốc thủy tinh đen mờ, dáng trụ thẳng",
    netWeight: "150 g",
    burnTime: "36–40 giờ",
    spaceNote: "Hiện đại, tối giản. Hợp phòng ngủ, phòng làm việc cỡ vừa (15–20 m²).",
    priceDelta: 40_000,
  },
  {
    id: "hu-200g",
    label: "Hũ thủy tinh đen vai bầu cao, nắp bần",
    netWeight: "200 g",
    burnTime: "50–54 giờ",
    spaceNote: "Dung tích lớn, tỏa hương mạnh. Hợp phòng khách, phòng rộng hoặc làm quà tặng.",
    priceDelta: 84_000,
  },
];

/** Mã mọi quy cách — cả 4 mùi đều có đủ 3 quy cách (theo bảng khách gửi) */
const ALL_VARIANTS = VARIANTS.map((v) => v.id);

/** Hai dòng cuối của mục "ĐẶC ĐIỂM NỔI BẬT" in giống hệt nhau trên cả 4 tem nhãn. */
const SHARED_HIGHLIGHTS = [
  "Giúp cân bằng cảm xúc, giảm căng thẳng.",
  "An toàn cho sức khỏe, thân thiện với môi trường.",
];

/** Bốn dòng thành phần chung; mỗi mùa chèn thêm tinh dầu riêng vào sau sáp đậu nành. */
const baseIngredients = (...essentialOils: string[]) => ({
  essentialOils,
  ingredients: ["Sáp đậu nành tự nhiên", ...essentialOils, "Sáp ong, phụ gia tự nhiên", "Bấc cotton"],
});

/**
 * Bộ ảnh khách gửi 2026-11-03, mỗi mùi ba tấm: poster giới thiệu (có mascot Lumi),
 * ảnh một hũ 200 g, và ảnh trọn bộ ba quy cách 100/150/200 g.
 *
 * Cả ba đều vuông 1:1 nên lấp kín khung vuông, không hở viền trắng. Riêng ảnh ba hũ
 * gốc là ảnh dọc 1149×1369, cắt về vuông bằng cách giữ gần nguyên phần đỉnh và bỏ
 * ~220 px dưới đáy (chỗ đó chỉ có nền vải và hoa, không chạm đế gỗ của hũ).
 * Mốc cắt chọn sao cho ngọn lửa logo LUVIA rơi vào ~1,5% chiều cao — trùng vị trí logo
 * trong poster và ảnh một hũ, để lướt qua ba ảnh mà logo không nhảy lên nhảy xuống.
 */
const photos = (slug: string) => ({
  image: `/mua/${slug}-1hu.jpg`,
  poster: `/mua/${slug}-poster.jpg`,
  gallery: [
    { src: `/mua/${slug}-poster.jpg` },
    { src: `/mua/${slug}-1hu.jpg` },
    { src: `/mua/${slug}-3hu.jpg` },
  ],
});

const seasonBase = (id: SeasonId) => ({
  id,
  name: SEASON_COPY[id].name,
  fullName: `Nến thơm Luvia – ${SEASON_COPY[id].name}`,
  mood: SEASON_COPY[id].mood,
  description: SEASON_COPY[id].description,
  suggestion: SEASON_COPY[id].suggestion,
  cta: SEASON_COPY[id].cta,
});

export const SEASONS: Season[] = [
  {
    ...seasonBase("xuan"),
    color: { primary: "#8DB560", soft: "#EEF5E3", wax: "#F4F6DF" },
    highlights: [
      "Hương thơm tươi mát, sảng khoái và tràn đầy sức sống của buổi sáng sớm.",
      ...SHARED_HIGHLIGHTS,
    ],
    ...baseIngredients("Tinh dầu ban mai"),
    price: 115_000,
    status: "in_stock",
    prepDays: [1, 1],
    ...photos("ban-mai"),
    variants: ALL_VARIANTS,
  },
  {
    ...seasonBase("ha"),
    color: { primary: "#F2A93B", soft: "#FDF0D8", wax: "#FFF1D6" },
    highlights: [
      "Hương hoa sen thanh tao, dịu nhẹ, mang lại cảm giác bình yên, thư thái.",
      ...SHARED_HIGHLIGHTS,
    ],
    ...baseIngredients("Tinh dầu sen hồng"),
    price: 115_000,
    status: "in_stock",
    prepDays: [1, 1],
    ...photos("lien-huong"),
    variants: ALL_VARIANTS,
  },
  {
    ...seasonBase("thu"),
    color: { primary: "#C9773B", soft: "#F8E6D6", wax: "#FBE9D7" },
    highlights: ["Hương thơm thanh khiết, nhẹ nhàng, thư giãn.", ...SHARED_HIGHLIGHTS],
    // Tem Bạch Trà có ghi cả tuyết tùng — nghi là chép nhầm từ panel Mộc Trầm,
    // nhưng khách đã chốt "giữ đúng tem" nên để nguyên.
    ...baseIngredients("Tinh dầu trà trắng cao cấp", "Tinh dầu gỗ tuyết tùng (Cedarwood)"),
    price: 115_000,
    status: "in_stock",
    prepDays: [1, 1],
    ...photos("bach-tra"),
    variants: ALL_VARIANTS,
  },
  {
    ...seasonBase("dong"),
    color: { primary: "#6B7FA6", soft: "#E8ECF4", wax: "#EEF0F5" },
    highlights: ["Hương thơm ấm áp, trầm lắng, thư giãn.", ...SHARED_HIGHLIGHTS],
    ...baseIngredients("Tinh dầu trầm hương", "Tinh dầu gỗ tuyết tùng (Cedarwood)"),
    price: 115_000,
    status: "preorder",
    prepDays: [3, 5],
    ...photos("moc-tram"),
    variants: ALL_VARIANTS,
  },
];

/** Bao bì cộng thêm. Mặc định mọi hũ đã có hộp giấy kraft miễn phí nên không khai báo ở đây. */
export const BOXES: Box[] = [
  {
    id: "qua-tang",
    name: "Hộp quà có thiệp",
    description: "Hộp quà kèm thiệp để bạn gửi lời nhắn.",
    surcharge: 25_000,
    allowsCard: true,
    cardFee: 0,
    available: true,
  },
];

/** Hộp quà của ô "Gói quà" ở trang chi tiết — phụ phí chỉ khai báo một chỗ */
export const GIFT_WRAP_BOX_ID = "qua-tang";

// ---------------------------------------------------------------------------
// Tra cứu
// ---------------------------------------------------------------------------

export const getSeason = (id: string) => SEASONS.find((s) => s.id === id);
export const getVariant = (id: string) => VARIANTS.find((v) => v.id === id);
export const getBox = (id: string) => BOXES.find((b) => b.id === id);
export const isSeasonId = (id: string): id is SeasonId => SEASONS.some((s) => s.id === id);

export const formatVND = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

export function formatDays([min, max]: [number, number]) {
  return min === max ? `${min} ngày` : `${min}–${max} ngày`;
}

/** Tóm tắt danh mục cho Lumi — chỉ dữ liệu thật đang có, ô chờ chốt ghi rõ "chưa có thông tin" */
export function catalogForAI() {
  const unknown = "chưa có thông tin";
  const seasons = SEASONS.map(
    (s) =>
      `- [[season:${s.id}]] ${s.fullName} (${SEASON_COPY[s.id].nameEn}) — mùa ${SEASON_COPY[s.id].season}. ` +
      `Concept: ${SEASON_COPY[s.id].concept}. Cảm xúc: ${s.mood}. Mô tả: ${s.description} Gợi ý: ${s.suggestion} ` +
      `Đặc điểm nổi bật: ${s.highlights.join(" ")} ` +
      `Thành phần: ${s.ingredients.join(", ")}. ` +
      `Giá từ ${formatVND(s.price)} (đủ 3 quy cách). ` +
      `Tình trạng: ${s.status === "in_stock" ? "còn hàng" : s.status === "preorder" ? "đặt trước" : "tạm hết hàng"}.`,
  ).join("\n");
  const variants = VARIANTS.map(
    (v) =>
      `- ${v.netWeight ?? unknown} — ${v.label}. Thời gian cháy ${v.burnTime ?? unknown}. ` +
      `Giá ${formatVND(SEASONS[0].price + v.priceDelta)}. ${v.spaceNote ?? ""}`.trim(),
  ).join("\n");
  const gift = getBox(GIFT_WRAP_BOX_ID)!;
  return (
    `${seasons}\n\nQUY CÁCH (cả 4 mùi đều có đủ 3 quy cách này):\n${variants}\n\n` +
    `GÓI QUÀ: mỗi hũ có thể thêm ${gift.name.toLowerCase()} (+${formatVND(gift.surcharge)}) để viết lời nhắn, ` +
    `chọn ngay trên trang sản phẩm của mùa hương đó.`
  );
}
