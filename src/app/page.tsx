import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplet, Flame, Leaf, Quote, Recycle, ShieldCheck, Sprout, Star, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { AskLuviaButton, SectionTitle } from "@/components/ui";
import { MOODS, PRODUCTS, type Mood } from "@/lib/products";

const STEPS = [
  {
    icon: Droplet,
    title: "Thu gom dầu ăn cũ",
    desc: "Từ bếp gia đình, quán ăn và nhà hàng — thay vì đổ xuống cống gây ô nhiễm nguồn nước.",
  },
  {
    icon: Recycle,
    title: "Lọc sạch & tái chế",
    desc: "Lọc cặn, khử mùi, tẩy màu nhiều lần rồi phối trộn cùng sáp thực vật thiên nhiên.",
  },
  {
    icon: Flame,
    title: "Thành nến thơm Luvia",
    desc: "Thêm hương liệu an toàn, bấc cotton không chì, đổ khuôn thủ công trong hũ thuỷ tinh.",
  },
];

const TESTIMONIALS = [
  {
    name: "Minh Anh",
    place: "Hà Nội",
    text: "Mình không tin nổi là làm từ dầu ăn! Mùi Hoa Bưởi thơm dịu, không hề hắc. Đốt cả tối mà phòng thơm nhẹ nhàng.",
    product: "Hoa Bưởi Tháng Hai",
  },
  {
    name: "Quốc Huy",
    place: "Đà Nẵng",
    text: "Mua Trà Xanh Bạc Hà để trên bàn làm việc, tỉnh hẳn. Thích nhất là được đổi dầu ăn cũ lấy voucher.",
    product: "Trà Xanh Bạc Hà",
  },
  {
    name: "Thu Trang",
    place: "TP. Hồ Chí Minh",
    text: "Hỏi bạn Luvia AI mãi mới chọn được quà cho mẹ, tư vấn có tâm cực. Hộp giấy kraft xinh xỉu.",
    product: "Nhài Sen Hồ Tây",
  },
];

const STICKERS = [
  { src: "/brand/sticker-light.jpg", alt: "Thắp ánh sáng xanh!" },
  { src: "/brand/sticker-green.jpg", alt: "Sống xanh mỗi ngày" },
  { src: "/brand/sticker-share.jpg", alt: "Cùng Luvia lan tỏa điều tốt đẹp!" },
  { src: "/brand/sticker-planet.jpg", alt: "Yêu hành tinh của chúng ta" },
];

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.badge).slice(0, 4);
  const moods: Mood[] = ["thu-gian", "tap-trung", "ngu-ngon", "am-cung", "tuoi-moi", "lang-man"];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Hạt ánh sáng đom đóm / ngọn lửa bay bổng */}
        <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-flame-soft/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 size-[380px] rounded-full bg-leaf-soft blur-3xl" />
        <div className="pointer-events-none absolute left-1/4 top-1/3 size-3 rounded-full bg-flame/80 blur-xs animate-firefly" />
        <div className="pointer-events-none absolute right-1/3 top-1/4 size-4 rounded-full bg-flame/60 blur-xs animate-firefly [animation-delay:2s]" />
        <div className="pointer-events-none absolute left-1/3 bottom-1/4 size-2.5 rounded-full bg-leaf/70 blur-xs animate-firefly [animation-delay:4s]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-leaf shadow-sm ring-1 ring-leaf/15 hover:scale-105 transition">
              <Recycle className="size-4 animate-spin-slow" /> 100% từ dầu ăn tái chế & sáp thực vật
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              Lan tỏa <span className="squiggle text-leaf">ánh sáng xanh</span>
              <br />
              cùng <span className="font-hand text-[1.15em] font-normal text-flame-dark inline-block hover:rotate-3 transition duration-300">Luvia</span> ♡
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Mỗi ngọn nến thơm Luvia được tái sinh từ dầu ăn đã qua sử dụng — sạch mùi, cháy êm, thơm dịu. Thắp lên
              một ngọn nến, bạn cũng vừa giúp giữ sạch một dòng sông.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/san-pham"
                className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-8 py-4 font-bold text-white shadow-lg shadow-leaf/25 glow-leaf transition hover:bg-leaf-dark hover:scale-105 active:scale-95"
              >
                Mua nến ngay <ArrowRight className="size-4" />
              </Link>
              <AskLuviaButton prompt="Chào Luvia! Mình mới tìm hiểu nến thơm, bạn tư vấn giúp mình với." className="hover:scale-105 active:scale-95 transition">
                Chưa biết chọn mùi? Hỏi Luvia
              </AskLuviaButton>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                ["2.400+", "lít dầu ăn được tái chế"],
                ["15.000+", "ngọn nến đã thắp sáng"],
                ["4.9★", "điểm đánh giá trung bình"],
              ].map(([n, l]) => (
                <div key={l} className="group rounded-2xl p-2 transition hover:bg-white/60">
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-2xl font-extrabold text-leaf-dark sm:text-3xl transition group-hover:scale-105">{n}</dd>
                  <dd className="mt-1 text-xs leading-snug text-ink-soft sm:text-sm">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[48%_52%_44%_56%/50%_42%_58%_50%] shadow-2xl shadow-leaf/20 ring-8 ring-white animate-float-slow animate-pulse-glow">
              <Image
                src="/brand/mascot-main.jpg"
                alt="Linh vật Luvia — ngọn nến nhỏ ôm trái đất"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -left-4 top-10 animate-float rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-leaf/10 sm:-left-8 hover:scale-110 transition">
              <p className="font-hand text-lg leading-tight text-leaf">Sống xanh</p>
              <p className="text-xs text-ink-soft">mỗi ngày 🌿</p>
            </div>
            <div className="absolute -right-2 bottom-12 animate-float rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-leaf/10 [animation-delay:1.5s] sm:-right-6 hover:scale-110 transition">
              <p className="flex items-center gap-1 text-sm font-bold text-ink">
                <Star className="size-4 fill-flame text-flame animate-pulse" /> 4.9/5
              </p>
              <p className="text-xs text-ink-soft">1.500+ đánh giá</p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-leaf/15 bg-leaf py-3 text-white" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-hand text-xl">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Thắp ánh sáng xanh", "Sống xanh mỗi ngày", "Yêu hành tinh của chúng ta", "Cùng Luvia lan tỏa điều tốt đẹp", "Từ dầu ăn tái chế → nến thơm"].map(
              (t) => (
                <span key={`${k}-${t}`} className="flex items-center gap-10">
                  {t} <Leaf className="size-4 text-flame" />
                </span>
              ),
            ),
          )}
        </div>
      </div>

      {/* BÁN CHẠY */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle tag="Được yêu thích" title="Những mùi hương bán chạy" desc="Thủ công từng mẻ nhỏ, mỗi hũ là một câu chuyện." />
          <Link href="/san-pham" className="inline-flex shrink-0 items-center gap-2 font-semibold text-leaf hover:text-flame-dark">
            Xem tất cả <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* QUY TRÌNH */}
      <section className="paper border-y border-leaf/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            center
            tag="Hành trình tái sinh"
            title={<>Từ dầu ăn tái chế → <span className="text-leaf">nến thơm thân thiện</span></>}
            desc="1 lít dầu ăn đổ xuống cống có thể làm ô nhiễm hàng nghìn lít nước. Luvia biến nó thành ánh sáng."
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="group relative rounded-[28px] bg-white p-8 text-center ring-1 ring-leaf/10 card-interactive"
              >
                <span className="absolute left-6 top-5 font-hand text-4xl text-flame/50 transition group-hover:scale-110 group-hover:text-flame">
                  0{i + 1}
                </span>
                <div className="mx-auto grid size-20 place-items-center rounded-full bg-leaf-soft text-leaf transition duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-leaf group-hover:text-white">
                  <s.icon className="size-9" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-xl font-bold transition group-hover:text-leaf">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden size-8 -translate-y-1/2 rounded-full bg-flame p-1.5 text-white md:block animate-pulse" />
                )}
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link href="/cau-chuyen#quy-trinh" className="inline-flex items-center gap-2 font-semibold text-leaf hover:text-flame-dark hover:translate-x-1 transition">
              Tìm hiểu quy trình chi tiết <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* THEO TÂM TRẠNG */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle tag="Chọn theo cảm xúc" title="Hôm nay bạn muốn cảm thấy thế nào?" />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {moods.map((m) => (
            <Link
              key={m}
              href={`/san-pham?mood=${m}`}
              className="group rounded-3xl bg-white p-5 text-center ring-1 ring-leaf/10 card-interactive transition hover:bg-leaf hover:text-white"
            >
              <span className="inline-block text-4xl transition duration-300 group-hover:scale-125 group-hover:-rotate-6">{MOODS[m].emoji}</span>
              <p className="mt-3 font-bold">{MOODS[m].label}</p>
              <p className="mt-1 text-xs text-ink-soft group-hover:text-white/80">{MOODS[m].desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* AI TƯ VẤN */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative grid items-center gap-10 overflow-hidden rounded-[40px] bg-leaf px-6 py-12 text-white sm:px-12 lg:grid-cols-2">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-leaf-light/40 blur-2xl" />
          <div className="relative">
            <span className="font-hand text-2xl text-flame">Trợ lý mùi hương AI</span>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              Kể Luvia nghe một chút, Luvia chọn mùi giúp bạn
            </h2>
            <p className="mt-4 text-white/80">
              Bạn hay mất ngủ? Cần tập trung? Đang tìm quà cho mẹ? Trò chuyện với Luvia để nhận gợi ý mùi hương hợp với
              không gian, tâm trạng và ngân sách của bạn — chỉ trong 1 phút.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AskLuviaButton prompt="Mình hay khó ngủ, nên chọn mùi nào?" className="border-white">
                Bắt đầu trò chuyện
              </AskLuviaButton>
              <Link href="/tu-van" className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white hover:text-flame">
                Mở trang tư vấn <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="relative space-y-3 rounded-[28px] bg-cream p-5 text-ink shadow-xl">
            <div className="flex justify-end">
              <p className="rounded-3xl rounded-br-md bg-leaf px-4 py-2.5 text-sm text-white">Mình cần nến cho góc làm việc, hay buồn ngủ lúc 3h chiều 😪</p>
            </div>
            <div className="flex gap-2.5">
              <Image src="/brand/exp-happy.jpg" alt="" width={36} height={36} className="size-9 shrink-0 rounded-full object-cover" />
              <p className="rounded-3xl rounded-tl-md bg-white px-4 py-2.5 text-sm leading-relaxed shadow-sm">
                Bạn thử <b className="text-leaf">Trà Xanh Bạc Hà</b> nhé ✨ Bạc hà the nhẹ giúp tỉnh táo, trà xanh thanh mát mà
                không nặng đầu. Muốn tươi hơn nữa thì <b className="text-leaf">Sả Chanh Rừng</b> cũng rất hợp! 🌿
              </p>
            </div>
            <div className="flex gap-2 pl-11">
              {["Trà Xanh Bạc Hà", "Sả Chanh Rừng"].map((n) => (
                <span key={n} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-leaf ring-1 ring-leaf/20">
                  + {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TỰ THIẾT KẾ NẾN */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-[40px] bg-cream-light p-8 ring-1 ring-leaf/15 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="brush-tag text-base">Mới: Quà tặng độc bản</span>
              <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
                Tự tay chọn mùi & in tên người nhận lên nhãn nến
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Biến ngọn nến thơm thành món quà vô giá: Bạn chỉ cần chọn mùi hương nền, gõ lời chúc yêu thương (VD: <i>“Dành tặng mẹ yêu”</i>, <i>“Chúc mừng sinh nhật Lan”</i>), Luvia sẽ in riêng tem nhãn thủ công và đóng hộp quà trang trọng.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/tu-thiet-ke"
                  className="inline-flex items-center gap-2 rounded-full bg-leaf px-7 py-3.5 font-bold text-white shadow-md hover:bg-leaf-dark"
                >
                  Bắt đầu tự thiết kế <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-leaf/10 text-center">
              <span className="font-hand text-xl text-leaf-dark">Góc bình yên của Mai ♡</span>
              <p className="mt-1 text-xs text-ink-soft">“Mong em luôn an yên và mỉm cười mỗi ngày”</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-flame-dark">
                <span>✦ Bấc Gỗ Sồi tí tách</span>
                <span>✦ Hũ nến 200g</span>
                <span>✦ In nhãn theo yêu cầu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CÂU CHUYỆN */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
        <div className="relative">
          <Image
            src="/brand/scene-candle.jpg"
            alt="Luvia ôm hũ nến bên hộp giấy kraft"
            width={654}
            height={564}
            className="w-full rounded-[40px] object-cover shadow-xl"
          />
          <div className="absolute -bottom-6 right-6 max-w-[260px] rounded-3xl bg-white p-5 shadow-xl ring-1 ring-leaf/10">
            <Quote className="size-6 text-flame" />
            <p className="mt-1 font-hand text-lg leading-snug text-leaf-dark">
              Không chỉ là một ngọn nến, mà là hành trình vì một tương lai xanh hơn ♡
            </p>
          </div>
        </div>
        <div>
          <SectionTitle tag="Câu chuyện Luvia" title="Bắt đầu từ một chảo dầu đã nguội" />
          <p className="mt-5 leading-relaxed text-ink-soft">
            Mỗi ngày, hàng nghìn lít dầu ăn đã qua sử dụng bị đổ thẳng xuống cống, làm tắc nghẽn đường ống và ô nhiễm nguồn
            nước. Chúng mình tự hỏi: <i>liệu thứ bị bỏ đi ấy có thể trở thành điều gì đẹp đẽ?</i>
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Sau hàng trăm mẻ thử nghiệm, Luvia ra đời — những ngọn nến thơm được tái sinh từ dầu ăn, mang theo hương thơm
            của thiên nhiên Việt Nam và một lời nhắn nhỏ: sống xanh có thể bắt đầu từ chính căn bếp nhà mình.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              [Sprout, "Sáp thực vật, không paraffin"],
              [ShieldCheck, "Bấc cotton không chì"],
              [Recycle, "Hũ thuỷ tinh tái sử dụng"],
              [Leaf, "Bao bì giấy kraft tái chế"],
            ].map(([Icon, t]) => {
              const I = Icon as typeof Leaf;
              return (
                <li key={t as string} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium ring-1 ring-leaf/10">
                  <I className="size-5 text-leaf" /> {t as string}
                </li>
              );
            })}
          </ul>
          <Link
            href="/cau-chuyen"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-leaf px-7 py-3.5 font-semibold text-white hover:bg-leaf-dark"
          >
            Đọc câu chuyện đầy đủ <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* ĐỘI NGŨ & DỊCH VỤ BÊN B */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-leaf/10 sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="brush-tag text-lg">Đội ngũ sáng lập · Bên B</span>
              <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
                Nhóm bạn trẻ sinh viên & Hành trình khởi nghiệp xanh
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Luvia được sáng lập bởi nhóm 4 bạn trẻ yêu môi trường. Với vai trò là <b>Bên B (Đơn vị nghiên cứu & sản xuất)</b>,
                chúng mình không chỉ bán lẻ nến thơm mà còn cung cấp <b>Quà tặng doanh nghiệp (In logo riêng)</b>, tổ chức <b>Workshop làm nến cho trường học/công ty</b> và thiết lập <b>Trạm thu gom dầu ăn đối tác</b>.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-leaf-dark">
                <span className="rounded-full bg-leaf-soft px-3.5 py-1.5">✦ Cung cấp Gift Set B2B</span>
                <span className="rounded-full bg-flame-soft px-3.5 py-1.5 text-flame-dark">✦ Workshop Team-building</span>
                <span className="rounded-full bg-leaf-soft px-3.5 py-1.5">✦ Hợp đồng & Hóa đơn đầy đủ</span>
              </div>
              <div className="mt-8 flex gap-4">
                <Link
                  href="/doi-ngu"
                  className="inline-flex items-center gap-2 rounded-full bg-leaf px-7 py-3.5 font-bold text-white shadow-md hover:bg-leaf-dark"
                >
                  Xem hồ sơ năng lực Bên B <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-cream p-5 text-center">
                <Image src="/brand/exp-nature.jpg" alt="Minh Khôi" width={80} height={80} className="mx-auto size-16 rounded-full object-cover ring-2 ring-leaf/20" />
                <h4 className="mt-3 text-sm font-bold text-ink">Minh Khôi</h4>
                <p className="text-xs text-leaf">R&D Công thức sáp</p>
              </div>
              <div className="rounded-3xl bg-cream p-5 text-center">
                <Image src="/brand/exp-happy.jpg" alt="Ngọc Mai" width={80} height={80} className="mx-auto size-16 rounded-full object-cover ring-2 ring-leaf/20" />
                <h4 className="mt-3 text-sm font-bold text-ink">Ngọc Mai</h4>
                <p className="text-xs text-leaf">Thiết kế & Mascot</p>
              </div>
              <div className="rounded-3xl bg-cream p-5 text-center">
                <Image src="/brand/exp-playful.jpg" alt="Tuấn Anh" width={80} height={80} className="mx-auto size-16 rounded-full object-cover ring-2 ring-leaf/20" />
                <h4 className="mt-3 text-sm font-bold text-ink">Tuấn Anh</h4>
                <p className="text-xs text-leaf">Công nghệ & AI</p>
              </div>
              <div className="rounded-3xl bg-cream p-5 text-center">
                <Image src="/brand/exp-love.jpg" alt="Khánh Vy" width={80} height={80} className="mx-auto size-16 rounded-full object-cover ring-2 ring-leaf/20" />
                <h4 className="mt-3 text-sm font-bold text-ink">Khánh Vy</h4>
                <p className="text-xs text-leaf">Đối tác & B2B</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ĐÁNH GIÁ */}
      <section className="paper border-y border-leaf/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle center tag="Khách hàng nói gì" title="Những ngọn nến đã được thắp lên" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-leaf/10">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-flame text-flame" />
                  ))}
                </div>
                <blockquote className="mt-4 leading-relaxed text-ink">“{t.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-leaf/10 pt-4">
                  <span className="grid size-10 place-items-center rounded-full bg-leaf-soft font-bold text-leaf">{t.name[0]}</span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name} · {t.place}</span>
                    <span className="block text-xs text-ink-soft">Đã mua: {t.product}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* STICKERS + ĐỔI DẦU */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[36px] bg-white p-3 shadow-xl ring-1 ring-leaf/10 card-interactive">
            <Image
              src="/brand/stickers-set-hd.jpg"
              alt="Bộ sticker truyền thông Luvia siêu nét"
              width={700}
              height={525}
              className="w-full rounded-[28px] object-cover transition duration-500 hover:scale-[1.02]"
              priority
            />
          </div>
          <div id="doi-dau">
            <SectionTitle
              tag="Chương trình xanh"
              title="Mang dầu ăn cũ — nhận ánh sáng mới"
              desc="Gom dầu ăn đã qua sử dụng vào chai, mang đến điểm thu gom của Luvia hoặc gửi kèm khi nhận hàng."
            />
            <ul className="mt-6 space-y-3">
              {[
                ["1 lít dầu ăn cũ", "Voucher 30.000₫"],
                ["Trả lại hũ thuỷ tinh rỗng", "Giảm 10% đơn tiếp theo"],
                ["Đơn từ 500.000₫", "Miễn phí giao hàng toàn quốc"],
              ].map(([a, b]) => (
                <li key={a} className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-leaf/10">
                  <span className="flex items-center gap-3 font-medium">
                    {a === "Đơn từ 500.000₫" ? <Truck className="size-5 text-leaf" /> : <Recycle className="size-5 text-leaf" />} {a}
                  </span>
                  <span className="rounded-full bg-flame-soft px-3 py-1 text-sm font-semibold text-flame-dark">{b}</span>
                </li>
              ))}
            </ul>
            <Link href="/lien-he#doi-dau" className="mt-6 inline-flex items-center gap-2 font-semibold text-leaf hover:text-flame-dark">
              Xem điểm thu gom <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
