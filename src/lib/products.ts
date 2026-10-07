export type ScentFamily = "cam-chanh" | "hoa-co" | "go-am" | "thao-moc" | "ngot-ngao";
export type Mood = "thu-gian" | "tap-trung" | "ngu-ngon" | "am-cung" | "tuoi-moi" | "lang-man";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  families: ScentFamily[];
  moods: Mood[];
  /** Giá size Classic 200g (VND) */
  price: number;
  notes: { top: string; heart: string; base: string };
  description: string;
  inspiration: string;
  wax: string; // màu sáp
  accent: string; // màu nhãn
  badge?: string;
  rating: number;
  reviews: number;
}

export const FAMILIES: Record<ScentFamily, string> = {
  "cam-chanh": "Cam chanh tươi mát",
  "hoa-co": "Hoa cỏ dịu dàng",
  "go-am": "Gỗ ấm trầm",
  "thao-moc": "Thảo mộc thanh",
  "ngot-ngao": "Ngọt ngào ấm áp",
};

export const MOODS: Record<Mood, { label: string; desc: string; emoji: string }> = {
  "thu-gian": { label: "Thư giãn", desc: "Sau một ngày dài", emoji: "🌿" },
  "tap-trung": { label: "Tập trung", desc: "Góc học tập, làm việc", emoji: "✏️" },
  "ngu-ngon": { label: "Ngủ ngon", desc: "Trước giờ đi ngủ", emoji: "🌙" },
  "am-cung": { label: "Ấm cúng", desc: "Ngày mưa, ngày lạnh", emoji: "☕" },
  "tuoi-moi": { label: "Tươi mới", desc: "Bắt đầu ngày mới", emoji: "🍋" },
  "lang-man": { label: "Lãng mạn", desc: "Hẹn hò, quà tặng", emoji: "💛" },
};

export const SIZES = [
  { id: "mini", label: "Mini 100g", factor: 0.6, burn: "20–25 giờ" },
  { id: "classic", label: "Classic 200g", factor: 1, burn: "40–45 giờ" },
  { id: "grand", label: "Grand 350g", factor: 1.6, burn: "70–80 giờ" },
] as const;
export type SizeId = (typeof SIZES)[number]["id"];

export function priceFor(product: Product, size: SizeId) {
  const s = SIZES.find((x) => x.id === size) ?? SIZES[1];
  return Math.round((product.price * s.factor) / 1000) * 1000;
}

export const PRODUCTS: Product[] = [
  {
    slug: "sa-chanh-rung",
    name: "Sả Chanh Rừng",
    tagline: "Tỉnh táo như buổi sáng trên đồi chè",
    families: ["cam-chanh", "thao-moc"],
    moods: ["tuoi-moi", "tap-trung"],
    price: 189000,
    notes: { top: "Chanh xanh, vỏ bưởi", heart: "Sả, lá chanh", base: "Cỏ vetiver" },
    description:
      "Mùi sả chanh sạch sẽ, sảng khoái giúp xua tan mùi bếp và mùi ẩm. Lựa chọn yêu thích cho phòng khách và góc làm việc.",
    inspiration: "Gợi nhớ những vườn sả sau nhà bà ngoại, nắng sớm và tiếng chim.",
    wax: "#F4F1C9",
    accent: "#8DB560",
    badge: "Bán chạy",
    rating: 4.9,
    reviews: 312,
  },
  {
    slug: "hoa-buoi-thang-hai",
    name: "Hoa Bưởi Tháng Hai",
    tagline: "Hương hoa bưởi thuần Việt, thanh và ngọt",
    families: ["hoa-co", "cam-chanh"],
    moods: ["thu-gian", "lang-man"],
    price: 209000,
    notes: { top: "Hoa bưởi", heart: "Hoa cam neroli, nhài", base: "Xạ hương trắng" },
    description:
      "Hoa bưởi nở rộ đầu xuân, ngọt nhẹ mà không gắt. Hợp với phòng ngủ, phòng tắm và làm quà tặng mẹ.",
    inspiration: "Mùi hương của những buổi gội đầu nước hoa bưởi ngày Tết.",
    wax: "#FFF8E8",
    accent: "#E9B949",
    badge: "Thuần Việt",
    rating: 4.9,
    reviews: 248,
  },
  {
    slug: "oai-huong-da-lat",
    name: "Oải Hương Đà Lạt",
    tagline: "Thả lỏng, hít sâu, ngủ thật ngon",
    families: ["hoa-co", "thao-moc"],
    moods: ["ngu-ngon", "thu-gian"],
    price: 199000,
    notes: { top: "Bergamot", heart: "Oải hương, hoa cúc La Mã", base: "Gỗ tuyết tùng" },
    description:
      "Oải hương dịu nhẹ kết hợp cúc La Mã — công thức kinh điển giúp thư giãn trước giờ ngủ.",
    inspiration: "Một buổi tối se lạnh ở Đà Lạt, chăn ấm và trà nóng.",
    wax: "#EDE6F5",
    accent: "#9B86C4",
    rating: 4.8,
    reviews: 276,
  },
  {
    slug: "go-dan-huong",
    name: "Gỗ Đàn Hương",
    tagline: "Trầm ấm, tĩnh lặng như một buổi thiền",
    families: ["go-am"],
    moods: ["thu-gian", "tap-trung"],
    price: 229000,
    notes: { top: "Tiêu hồng", heart: "Đàn hương, hoắc hương", base: "Hổ phách, trầm" },
    description:
      "Mùi gỗ sâu và ấm, mang lại cảm giác vững chãi. Thích hợp cho phòng đọc sách, thiền và yoga.",
    inspiration: "Không gian tĩnh lặng của một ngôi chùa cổ trên núi.",
    wax: "#F3E3C8",
    accent: "#8A5A35",
    badge: "Cao cấp",
    rating: 4.8,
    reviews: 154,
  },
  {
    slug: "cam-que-tet-ve",
    name: "Cam Quế Tết Về",
    tagline: "Ấm áp như căn bếp ngày đoàn viên",
    families: ["ngot-ngao", "cam-chanh"],
    moods: ["am-cung", "lang-man"],
    price: 199000,
    notes: { top: "Cam ngọt", heart: "Quế, hồi, đinh hương", base: "Vani, mật ong" },
    description:
      "Cam chín hòa quyện quế hồi, ấm và ngọt. Mùi hương của những ngày se lạnh và mùa lễ hội.",
    inspiration: "Nồi nước lá xông, mứt gừng và tiếng cười cả nhà đêm giao thừa.",
    wax: "#FBE3C2",
    accent: "#E07B1A",
    badge: "Mùa lễ hội",
    rating: 4.9,
    reviews: 198,
  },
  {
    slug: "tra-xanh-bac-ha",
    name: "Trà Xanh Bạc Hà",
    tagline: "Đầu óc trong veo cho những giờ cày deadline",
    families: ["thao-moc"],
    moods: ["tap-trung", "tuoi-moi"],
    price: 189000,
    notes: { top: "Bạc hà", heart: "Trà xanh Thái Nguyên", base: "Rêu sồi" },
    description:
      "Trà xanh thanh mát với chút bạc hà the nhẹ, giúp tỉnh táo mà không gây nặng đầu.",
    inspiration: "Ấm trà buổi sáng của ông, ngồi bên hiên nhìn mưa.",
    wax: "#E6F0D8",
    accent: "#548333",
    rating: 4.7,
    reviews: 131,
  },
  {
    slug: "vani-dua-non",
    name: "Vani Dừa Non",
    tagline: "Ngọt ngào, mềm mại như một cái ôm",
    families: ["ngot-ngao"],
    moods: ["am-cung", "lang-man"],
    price: 199000,
    notes: { top: "Nước dừa", heart: "Vani Madagascar", base: "Đậu tonka, xạ hương" },
    description:
      "Hương vani kem sữa và dừa non béo nhẹ — dễ chịu với cả những người mới làm quen với nến thơm.",
    inspiration: "Ly sinh tố dừa mát lạnh bên bờ biển miền Tây.",
    wax: "#FFF6E9",
    accent: "#D9A066",
    rating: 4.8,
    reviews: 220,
  },
  {
    slug: "mua-rung-nhiet-doi",
    name: "Mưa Rừng Nhiệt Đới",
    tagline: "Mùi đất và lá cây sau cơn mưa đầu mùa",
    families: ["thao-moc", "go-am"],
    moods: ["thu-gian", "ngu-ngon"],
    price: 219000,
    notes: { top: "Lá xanh, sương mai", heart: "Dương xỉ, rêu", base: "Đất ẩm, gỗ tuyết tùng" },
    description:
      "Hương petrichor — mùi đất sau mưa — tươi mát, xanh và rất \"thiên nhiên\". Đem cả khu rừng vào phòng bạn.",
    inspiration: "Những chuyến trekking Cúc Phương và cơn mưa rào bất chợt.",
    wax: "#DCE8D0",
    accent: "#3B6324",
    badge: "Mới",
    rating: 4.9,
    reviews: 87,
  },
  {
    slug: "nhai-sen-ho-tay",
    name: "Nhài Sen Hồ Tây",
    tagline: "Thanh tao, nhẹ nhàng như sớm mai Hà Nội",
    families: ["hoa-co"],
    moods: ["thu-gian", "lang-man"],
    price: 219000,
    notes: { top: "Lá sen", heart: "Hoa nhài, hoa sen", base: "Gạo nếp, xạ hương" },
    description:
      "Sen và nhài — hai loài hoa của Hà Nội — hòa quyện thanh khiết, phù hợp làm quà biếu và không gian tiếp khách.",
    inspiration: "Mùa sen tháng sáu, những gánh hàng hoa trên phố cổ.",
    wax: "#FCEFF0",
    accent: "#D98A9A",
    rating: 4.8,
    reviews: 119,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(n) + "₫";

/** Tóm tắt danh mục cho AI tư vấn */
export function catalogForAI() {
  return PRODUCTS.map(
    (p) =>
      `- [[${p.slug}]] ${p.name} — ${formatVND(p.price)} (Classic 200g; Mini 100g ${formatVND(
        priceFor(p, "mini"),
      )}; Grand 350g ${formatVND(priceFor(p, "grand"))}). Nhóm: ${p.families
        .map((f) => FAMILIES[f])
        .join(", ")}. Tâm trạng: ${p.moods.map((m) => MOODS[m].label).join(", ")}. Hương đầu: ${
        p.notes.top
      }; hương giữa: ${p.notes.heart}; hương cuối: ${p.notes.base}. ${p.description}`,
  ).join("\n");
}
