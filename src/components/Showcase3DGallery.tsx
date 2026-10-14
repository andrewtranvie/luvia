"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Check, Copy, ExternalLink, Layers, ArrowRight } from "lucide-react";

interface ScreenMockup {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  description: string;
  stitchPrompt: string;
}

const SCREENS: ScreenMockup[] = [
  {
    id: "home",
    title: "1. Trang Chủ & Mua Sắm Xanh",
    subtitle: "Hero Mascot 3D, Quy trình 3 bước Isometric & Bục nến nổi",
    tag: "Desktop Home",
    image: "/brand/mockups3d/3d-home-ui.jpg",
    description: "Khung điều hướng Frosted Glass mờ đục với Bé Nến 3D đội khăn len xanh lá rực sáng, ong mật bay lượn, quy trình tái chế dầu ăn 3 bước dạng Isometric và các hũ nến đặt trên bục gốm đất sét mềm mại.",
    stitchPrompt: "Design a 3D claymorphism desktop e-commerce home page for 'LUVIA - Scented candles from recycled cooking oil'. Top frosted glass pill navbar with logo, links (Trang chủ, Sản phẩm, Câu chuyện, Liên hệ), search icon, and 3D pill cart button. Hero section: charming 3D candle mascot wearing a warm green knitted scarf holding a glowing amber candle jar, with flying honeybees and translucent bubbles. Right side has headline 'Lan tỏa ánh sáng xanh cùng Luvia!' with two 3D pill buttons. Below hero: 3-step isometric clay recycling process and bestseller candles on cylindrical pedestals."
  },
  {
    id: "custom",
    title: "2. Studio Tự Thiết Kế Nến & In Nhãn",
    subtitle: "Chọn mùi hương 3D, loại bấc & Live Mockup hũ quà tặng",
    tag: "Custom Studio",
    image: "/brand/mockups3d/3d-custom-ui.jpg",
    description: "Bộ chọn mùi hương dạng gạch đất sét nổi khối (Hoa bưởi, Sả chanh, Oải hương), bộ chọn bấc cotton / bấc gỗ sồi lách tách, trường nhập nhãn thư pháp dập nổi trên hũ nến thực tế cạnh hộp quà kraft thắt nơ xanh 3D.",
    stitchPrompt: "Design a 3D claymorphism 'Custom Candle Studio' page for LUVIA. Headline: 'LUVIA - Studio Tự Thiết Kế Nến & In Nhãn Quà Tặng'. Left: Step 1 Scent Picker with 3D tactile icon tiles (Hoa bưởi, Sả chanh, Oải hương); Step 2 Size & Wick pills (100g, 200g, 350g, Bấc cotton, Bấc gỗ sồi); Step 3 Custom label input 'Dành Tặng Mẹ Yêu'. Right: Realistic 3D glass candle jar with glowing flame showing embossed label, paired with 3D kraft gift box, green ribbon, dried orange slices and cinnamon sticks."
  },
  {
    id: "chat",
    title: "3. Bé Nến AI Sommelier",
    subtitle: "Linh vật ló đầu tương tác & Nhúng Card mua nến trực tiếp",
    tag: "AI Sommelier",
    image: "/brand/mockups3d/3d-chat-ui.jpg",
    description: "Bé Nến 3D ló đầu ấm áp từ mép khung chat kính mờ, bong bóng hội thoại phân cấp rõ ràng, tự động render hũ nến kèm nút 'Thêm vào giỏ' 199.000đ ngay trong hội thoại, kèm các thẻ gợi ý nhanh (Quick Chips).",
    stitchPrompt: "Design a 3D claymorphism floating AI chat assistant for LUVIA candle e-commerce. The top features cute 3D candle mascot Bé Nến with a knitted green scarf and glowing flame peeking over frosted glass card edge. Chat contains user speech bubble 'Mình cần một mùi nến giúp thư giãn và dễ ngủ', bot reply with embedded 3D product card (thumbnail, 199.000đ, green 3D Add to Cart button), and quick prompt chips below."
  },
  {
    id: "team",
    title: "4. Đội Ngũ Bên B & Giải Pháp B2B",
    subtitle: "3 Bục dịch vụ doanh nghiệp 3D & Form báo giá nhanh",
    tag: "B2B Solutions",
    image: "/brand/mockups3d/3d-team-b2b-ui.jpg",
    description: "Khẳng định dự án sinh viên biến dầu ăn thừa thành nến thơm. Trưng bày 3 bục đất sét đại diện cho 3 gói B2B: Quà tặng doanh nghiệp (khắc logo gỗ), Workshop nến xanh (dụng cụ chiết rót mini), và Trạm thu gom dầu ăn (thùng phi inox eco).",
    stitchPrompt: "Design a 3D claymorphism B2B corporate services and student founder profile page for LUVIA. Header: 'Đội Ngũ Sáng Lập Bên B & Hợp Tác B2B' - 'Dự án khởi nghiệp sinh viên biến dầu ăn thừa thành nến thơm'. Three elevated 3D clay pedestals: 1. Corporate Gift Box with laser-engraved wooden lid; 2. Candle Workshop craft table with beaker and molds; 3. Stainless steel oil recycling barrel with leaf badge. Right side: 3D B2B inquiry form card."
  },
  {
    id: "detail",
    title: "5. Chi Tiết Nến & Tháp Hương 3 Tầng",
    subtitle: "Hũ nến hổ phách trên bục gốm & Nguyên liệu thực tế bay lơ lửng",
    tag: "Product Detail",
    image: "/brand/mockups3d/3d-product-detail-ui.jpg",
    description: "Hũ nến thắp sáng lung linh bao quanh bởi sả chanh tươi, cam bergamot, lá kim thông bay lơ lửng. Widget Tháp Hương Thơm 3 tầng (Top / Middle / Base Notes) tạo hình các bậc đất sét xếp chồng độc đáo.",
    stitchPrompt: "Design a 3D claymorphism product detail screen for LUVIA candles. Left: An elevated round clay pedestal holding a 3D amber glass candle jar with warm flickering flame, surrounded by floating 3D botanical ingredients (fresh lemongrass, bergamot citrus, pine needles). Right: Title, price 180.000đ, 3-tier Fragrance Pyramid widget shaped like stacked clay steps, size selector pills, and wide 3D emerald green 'Thêm Vào Giỏ Hàng' button."
  },
  {
    id: "cart",
    title: "6. Giỏ Hàng & Đổi Dầu Ăn Eco",
    subtitle: "Thẻ giảm giá đổi dầu ăn thừa -30k & Thanh toán VietQR",
    tag: "Cart & Checkout",
    image: "/brand/mockups3d/3d-checkout-ui.jpg",
    description: "Giao diện thanh toán thân thiện với môi trường: Danh sách hũ nến giỏ hàng, thẻ xanh nổi bật đổi dầu ăn thừa nhận ngay xu giảm giá -30.000đ, và khung quét VietQR động tích hợp đặt hàng nhanh qua Zalo.",
    stitchPrompt: "Design a 3D claymorphism cart and eco checkout screen for LUVIA. Left: Cart items list with 3D candle jars, quantity stepper pills, and free shipping progress bar. Center standout card (Forest Green Clay): 'Đổi Dầu Ăn Thừa Nhận Giảm Giá -30.000₫' with 3D oil bottle converting to golden eco coin. Right: Order summary with VietQR payment box containing dynamic scan QR code, and dual 3D action buttons: Confirm Order and Order via Zalo."
  }
];

export default function Showcase3DGallery() {
  const [activeScreen, setActiveScreen] = useState<ScreenMockup>(SCREENS[0]);
  const [copied, setCopied] = useState(false);

  const copyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="trien-lam-3d" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-flame/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-flame-dark">
          <Sparkles className="size-3.5" />
          Bộ Thiết Kế 3D Claymorphism & Pixar Lighting
        </div>
        <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
          Giao Diện 3D Sinh Thái Chuẩn Google Stitch
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-ink-soft sm:text-lg">
          Trực quan hóa trọn vẹn 6 màn hình giao diện LUVIA theo phong cách đất sét 3D mềm mại, ánh sáng ấm áp và độ hoàn thiện cao cấp sẵn sàng xuất sang Figma / Stitch.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
        {SCREENS.map((s) => {
          const isActive = s.id === activeScreen.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveScreen(s)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                isActive
                  ? "clay-btn-leaf text-white shadow-md scale-105"
                  : "bg-white text-ink-soft hover:bg-cream-dark/60 hover:text-ink ring-1 ring-leaf/10"
              }`}
            >
              {s.title.split(". ")[1]}
            </button>
          );
        })}
      </div>

      {/* Main Preview Card */}
      <div className="mt-8 overflow-hidden rounded-[36px] bg-white p-4 shadow-xl ring-1 ring-leaf/10 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] items-center">
          {/* Image */}
          <div className="relative overflow-hidden rounded-[24px] bg-cream/40 ring-1 ring-leaf/10 group">
            <Image
              src={activeScreen.image}
              alt={activeScreen.title}
              width={1600}
              height={900}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
            <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-leaf shadow">
              {activeScreen.tag}
            </div>
          </div>

          {/* Details & Stitch Prompt */}
          <div className="space-y-5">
            <div>
              <span className="font-hand text-lg text-flame-dark font-bold">Concept 3D Độc Quyền</span>
              <h3 className="text-2xl font-extrabold text-ink sm:text-3xl mt-1">
                {activeScreen.title}
              </h3>
              <p className="text-sm font-medium text-leaf mt-1">
                {activeScreen.subtitle}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
              {activeScreen.description}
            </p>

            {/* Stitch Prompt Box */}
            <div className="rounded-[20px] bg-cream p-4 ring-1 ring-leaf/15">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-ink">
                  <Layers className="size-3.5 text-leaf" /> Prompt Chuẩn Google Stitch:
                </span>
                <button
                  onClick={() => copyPrompt(activeScreen.stitchPrompt)}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-leaf shadow-sm hover:bg-leaf hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-green-600" /> Đã chép!
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" /> Copy Prompt
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs font-mono leading-relaxed text-ink-soft line-clamp-4 bg-white/70 p-2.5 rounded-xl border border-leaf/10 select-all">
                {activeScreen.stitchPrompt}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={activeScreen.image}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-xs font-bold text-white hover:bg-leaf-dark shadow-sm"
              >
                Mở Ảnh 3D Gốc (Full Size) <ExternalLink className="size-3.5" />
              </a>
              <a
                href="https://stitch.withgoogle.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-ink hover:bg-cream-dark ring-1 ring-leaf/20"
              >
                Mở Google Stitch <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
