"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  FileText,
  Gift,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Mail,
  Package,
  Phone,
  Recycle,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SectionTitle } from "@/components/ui";

const TEAM_MEMBERS = [
  {
    name: "Trần Minh Khôi",
    role: "Co-Founder & Trưởng nhóm R&D",
    major: "Kỹ thuật Hóa học & Môi trường",
    quote: "Mỗi mẻ dầu là một thử nghiệm tỉ mỉ để lọc sạch hoàn toàn tạp chất và giữ lại sự ấm êm, lành tính nhất cho người đốt.",
    avatar: "/brand/exp-nature.jpg",
    badge: "Công thức sáp sinh học",
  },
  {
    name: "Lê Ngọc Mai",
    role: "Co-Founder & Giám đốc Sáng tạo",
    major: "Thiết kế Đồ họa & Truyền thông",
    quote: "Mình vẽ Bé Nến Luvia như một người bạn nhỏ, nhắc nhở chúng ta rằng sống xanh không khô khan mà rất đáng yêu và ấm áp.",
    avatar: "/brand/exp-happy.jpg",
    badge: "Bộ nhận diện & Mascot",
  },
  {
    name: "Nguyễn Tuấn Anh",
    role: "Co-Founder & Phụ trách Công nghệ & AI",
    major: "Khoa học Dữ liệu & Hệ thống",
    quote: "Tích hợp AI tư vấn mùi hương để khách hàng tìm thấy đúng hũ nến chữa lành cho tâm trạng của mình chỉ sau vài câu trò chuyện.",
    avatar: "/brand/exp-playful.jpg",
    badge: "Website & AI Sommelier",
  },
  {
    name: "Hoàng Khánh Vy",
    role: "Co-Founder & Điều phối Chuỗi thu gom",
    major: "Quản trị Kinh doanh Bền vững",
    quote: "Mỗi lít dầu ăn bạn không đổ xuống cống là một mét vuông đất và nguồn nước được bảo vệ nguyên vẹn.",
    avatar: "/brand/exp-love.jpg",
    badge: "Mạng lưới đối tác & B2B",
  },
];

const PACKAGES = [
  {
    id: "giftset",
    title: "Gift Set Quà Tặng Doanh Nghiệp (B2B)",
    target: "Dành cho công ty, sự kiện tri ân, hội nghị, đám cưới xanh",
    price: "Từ 149.000₫ / set",
    minQty: "Tối thiểu 30 set",
    features: [
      "Khắc laser logo doanh nghiệp hoặc thông điệp riêng lên nắp hũ",
      "Hộp giấy kraft mộc mạc kèm nơ gai và thiệp hoa khô viết tay",
      "Tùy chọn mix mùi hương độc quyền theo nhận diện thương hiệu",
      "Tặng kèm báo cáo tác động môi trường (số lít dầu ăn đã tái chế)",
      "Chiết khấu lũy tiến 15% – 30% theo số lượng đặt hàng",
    ],
    popular: true,
  },
  {
    id: "workshop",
    title: "Workshop Tự Làm Nến Tái Chế Xanh",
    target: "Dành cho trường học, văn phòng team-building, câu lạc bộ sinh viên",
    price: "Từ 199.000₫ / người",
    minQty: "Từ 15 người tham gia",
    features: [
      "Nhóm Luvia trực tiếp mang đầy đủ trang thiết bị, sáp và tinh dầu",
      "Hướng dẫn khoa học xử lý dầu ăn và kỹ thuật đổ nến nhiều tầng hương",
      "Mỗi người tham gia tự tay mang về 01 hũ nến hoàn chỉnh 200g",
      "Tài liệu giáo dục môi trường và chứng chỉ Sống Xanh của Luvia",
      "Thời lượng linh hoạt từ 90 đến 120 phút",
    ],
    popular: false,
  },
  {
    id: "station",
    title: "Trạm Đối Tác Thu Gom Dầu Ăn Định Kỳ",
    target: "Dành cho nhà hàng, quán ăn, bếp ăn công nghiệp, quán cà phê",
    price: "Miễn phí thu gom + Hoàn trả nến",
    minQty: "Từ 20 lít dầu ăn thừa / tháng",
    features: [
      "Luvia cung cấp can chứa chuyên dụng chống tràn và nhãn an toàn",
      "Đội ngũ đến tận nơi lấy dầu theo lịch hẹn định kỳ cố định",
      "Quy đổi dầu ăn thành nến thơm Luvia để bàn quán hoặc voucher giảm giá",
      "Cấp biển chứng nhận 'Điểm Ẩm Thực Xanh Đồng Hành Cùng Luvia'",
      "Hỗ trợ truyền thông quảng bá nhà hàng trên các kênh của dự án",
    ],
    popular: false,
  },
];

const CREDENTIALS = [
  {
    title: "100% Không Paraffin & Không Khói Độc",
    desc: "Sáp nến từ dầu ăn xử lý kết hợp sáp đậu nành thực vật, bấc cotton 100% không chứa chì hay kim loại nặng.",
    icon: ShieldCheck,
  },
  {
    title: "Tinh Dầu Thiên Nhiên Chuẩn IFRA",
    desc: "Mùi hương dịu êm, nguồn gốc thảo mộc Việt Nam, an toàn cho cả phụ nữ mang thai và thú cưng.",
    icon: Leaf,
  },
  {
    title: "Năng Lực Sản Xuất Độc Lập",
    desc: "Xưởng thủ công mẻ nhỏ công suất 2.500 hũ/tháng, sẵn sàng mở rộng đáp ứng đơn hàng sự kiện lớn.",
    icon: Package,
  },
  {
    title: "Hợp Đồng & Hóa Đơn Pháp Nhân Minh Bạch",
    desc: "Đầy đủ chứng từ Bên B, biên bản bàn giao, hóa đơn hợp lệ theo quy định nhà nước.",
    icon: FileText,
  },
];

export default function TeamPage() {
  return (
    <div className="pb-24">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-cream-light py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-20 -top-20 size-96 rounded-full bg-leaf-soft/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 size-96 rounded-full bg-flame-soft/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-leaf shadow-sm ring-1 ring-leaf/20">
                <Users className="size-4" /> Hồ Sơ Năng Lực & Đội Ngũ Sáng Lập (Bên B)
              </div>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
                Chúng mình là nhóm bạn trẻ{" "}
                <span className="text-leaf underline decoration-flame decoration-wavy decoration-2">
                  thắp sáng ước mơ xanh
                </span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Luvia khởi đầu từ câu hỏi giản dị của một nhóm bạn sinh viên quanh chảo dầu ăn thừa:{" "}
                <span className="font-semibold text-ink">
                  “Làm sao để thứ rác thải ô nhiễm nguồn nước này trở thành ánh sáng ấm áp và hương thơm chữa lành?”
                </span>
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Với tư cách là <b>Bên B (Đơn vị nghiên cứu & sản xuất)</b>, chúng mình không chỉ bán nến lẻ mà còn cung cấp
                các giải pháp quà tặng doanh nghiệp xanh, tổ chức workshop và đồng hành cùng các đơn vị đối tác trên hành trình phát triển bền vững (ESG).
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#dich-vu-b2b"
                  className="inline-flex items-center gap-2 rounded-full bg-leaf px-7 py-3.5 font-semibold text-white shadow-lg shadow-leaf/20 transition hover:bg-leaf-dark"
                >
                  <Gift className="size-4" /> Xem các gói dịch vụ B2B
                </a>
                <a
                  href="#lien-he-hop-tac"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-leaf bg-white px-6 py-3.5 font-semibold text-leaf transition hover:bg-leaf hover:text-white"
                >
                  <HeartHandshake className="size-4" /> Đăng ký hợp tác ngay
                </a>
              </div>

              {/* QUICK STATS */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-leaf/15 pt-8">
                <div>
                  <p className="text-3xl font-extrabold text-leaf">2.400+</p>
                  <p className="mt-1 text-xs text-ink-soft sm:text-sm">Lít dầu ăn thu gom</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-flame-dark">2.500</p>
                  <p className="mt-1 text-xs text-ink-soft sm:text-sm">Hũ nến/tháng năng lực</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-leaf-dark">45+</p>
                  <p className="mt-1 text-xs text-ink-soft sm:text-sm">Đối tác quán ăn & công ty</p>
                </div>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative overflow-hidden rounded-[36px] bg-white p-3 shadow-2xl ring-1 ring-leaf/10">
                <Image
                  src="/brand/brand-board.jpg"
                  alt="Bộ nhận diện thương hiệu LUVIA và linh vật Bé Nến"
                  width={900}
                  height={900}
                  className="rounded-[28px] object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-leaf/10 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-xl bg-leaf-soft text-leaf">
                    <GraduationCap className="size-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-leaf">Xuất phát điểm</p>
                    <p className="text-sm font-bold text-ink">Dự án Khởi nghiệp Xanh Sinh viên</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE TEAM MEMBERS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle
          tag="Những người thắp nến"
          title="Nhóm bạn đứng sau hành trình Luvia"
          desc="4 người bạn với 4 mảnh ghép chuyên môn: từ phòng thí nghiệm hóa học, bảng vẽ thiết kế, dòng code AI đến chuỗi vận hành thực địa."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="group flex flex-col rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-leaf/10 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-leaf/10"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-leaf backdrop-blur-sm shadow-sm">
                  {member.badge}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">{member.name}</h3>
              <p className="text-sm font-semibold text-leaf">{member.role}</p>
              <p className="mt-1 text-xs text-ink-soft">{member.major}</p>
              <p className="mt-4 flex-1 text-sm italic leading-relaxed text-ink-soft">
                “{member.quote}”
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CÂU CHUYỆN BÊN B & NĂNG LỰC */}
      <section className="paper border-y border-leaf/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            center
            tag="Cam kết của Bên B"
            title="Hồ sơ chất lượng & Năng lực thực thi"
            desc="Dù là một nhóm bạn trẻ, chúng mình làm việc với sự nghiêm cẩn cao nhất để mang lại sản phẩm an toàn chuẩn mực."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="rounded-3xl bg-white p-7 text-left shadow-sm ring-1 ring-leaf/10 transition hover:shadow-md"
                >
                  <div className="grid size-14 place-items-center rounded-2xl bg-leaf-soft text-leaf">
                    <Icon className="size-7" />
                  </div>
                  <h4 className="mt-5 text-lg font-bold text-ink">{c.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GIAO DIỆN BÁN HÀNG B2B: CÁC GÓI HỢP TÁC & DỊCH VỤ */}
      <section id="dich-vu-b2b" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            tag="Dịch vụ & Báo giá Bên B"
            title="Các gói giải pháp cho tổ chức & đối tác"
            desc="Lựa chọn phương án phù hợp để mang ánh sáng xanh vào doanh nghiệp, lớp học hoặc sự kiện của bạn."
          />
          <div className="shrink-0">
            <span className="rounded-full bg-flame-soft px-4 py-2 text-sm font-bold text-flame-dark">
              ✦ Chiết khấu từ 15% cho đơn số lượng lớn
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col rounded-[36px] bg-white p-8 transition duration-300 ${
                pkg.popular
                  ? "ring-2 ring-leaf shadow-xl shadow-leaf/15"
                  : "ring-1 ring-leaf/15 shadow-md"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-leaf px-4 py-1 text-xs font-bold text-white shadow-sm">
                  Gói Được Yêu Thích Nhất
                </span>
              )}

              <h3 className="text-2xl font-extrabold text-ink">{pkg.title}</h3>
              <p className="mt-2 text-xs text-ink-soft">{pkg.target}</p>

              <div className="mt-6 border-y border-leaf/10 py-5">
                <p className="text-3xl font-extrabold text-leaf-dark">{pkg.price}</p>
                <p className="mt-1 text-xs font-medium text-flame-dark">{pkg.minQty}</p>
              </div>

              <ul className="mt-6 flex-1 space-y-3.5 text-sm text-ink-soft">
                {pkg.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-leaf" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4">
                <a
                  href="#lien-he-hop-tac"
                  className={`block w-full rounded-full py-3.5 text-center font-bold transition ${
                    pkg.popular
                      ? "bg-leaf text-white hover:bg-leaf-dark"
                      : "bg-leaf-soft text-leaf-dark hover:bg-leaf hover:text-white"
                  }`}
                >
                  Yêu cầu báo giá gói này
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIẾN TRÌNH HỢP TÁC GIỮA BÊN A VÀ BÊN B */}
      <section className="bg-leaf text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="font-hand text-2xl text-flame">Quy trình làm việc chuẩn mực</span>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Quy trình hợp tác 4 bước giữa Bên A và Bên B
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Minh bạch, nhanh chóng và tận tâm trong từng khâu để đảm bảo trải nghiệm tốt nhất cho đối tác.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Tiếp nhận nhu cầu",
                desc: "Trao đổi về số lượng, ngân sách, phong cách quà tặng và thông điệp mà Bên A muốn truyền tải.",
              },
              {
                step: "02",
                title: "Gửi mẫu & Báo giá",
                desc: "Bên B gửi mẫu thử mùi hương thực tế, bản vẽ mockup in ấn logo và bảng báo giá chi tiết trong 24h.",
              },
              {
                step: "03",
                title: "Ký kết & Sản xuất",
                desc: "Thống nhất hợp đồng kinh tế, Bên B tiến hành sản xuất thủ công tỉ mỉ theo đúng tiến độ cam kết.",
              },
              {
                step: "04",
                title: "Giao hàng & Đo lường",
                desc: "Bàn giao tận nơi, xuất hóa đơn VAT và gửi kèm chứng nhận bảo vệ môi trường cho sự kiện của Bên A.",
              },
            ].map((st) => (
              <div key={st.step} className="rounded-3xl bg-white/10 p-7 backdrop-blur-sm">
                <span className="font-hand text-4xl text-flame">{st.step}</span>
                <h3 className="mt-3 text-xl font-bold text-white">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM LIÊN HỆ HỢP TÁC (CTA BÁN HÀNG) */}
      <section id="lien-he-hop-tac" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <div className="overflow-hidden rounded-[40px] bg-white p-8 shadow-2xl ring-1 ring-leaf/15 sm:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="brush-tag text-lg">Liên hệ Bên B</span>
              <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
                Cùng Luvia thắp sáng ngọn nến của bạn
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Hãy để lại thông tin, nhóm chúng mình sẽ liên hệ lại qua điện thoại hoặc Zalo trong vòng 2 giờ làm việc để tư vấn chi tiết và gửi mẫu thử miễn phí.
              </p>

              <div className="mt-8 space-y-4 text-sm text-ink-soft">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-leaf-soft text-leaf">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-soft">Hotline / Zalo tư vấn</p>
                    <p className="font-bold text-ink">0988 123 456 (Mr. Khôi)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-leaf-soft text-leaf">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-soft">Email nhận hồ sơ dự án</p>
                    <p className="font-bold text-ink">b2b@luvia.vn / khoiduong@luvia.vn</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-leaf-soft text-leaf">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-soft">Địa chỉ xưởng & văn phòng nhóm</p>
                    <p className="font-bold text-ink">Khu Công nghệ Sáng tạo Trẻ, Cầu Giấy, Hà Nội</p>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Cảm ơn bạn! Nhóm Luvia đã nhận được thông tin và sẽ liên hệ ngay.");
              }}
              className="space-y-4 rounded-3xl bg-cream p-6 sm:p-8"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink" htmlFor="name">
                  Họ và tên người đại diện *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="mt-1.5 w-full rounded-2xl border border-leaf/20 bg-white px-4 py-3 text-sm focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf/20"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink" htmlFor="phone">
                    Số điện thoại / Zalo *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    className="mt-1.5 w-full rounded-2xl border border-leaf/20 bg-white px-4 py-3 text-sm focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink" htmlFor="org">
                    Tên cơ quan / Doanh nghiệp
                  </label>
                  <input
                    id="org"
                    type="text"
                    placeholder="Công ty / Trường học"
                    className="mt-1.5 w-full rounded-2xl border border-leaf/20 bg-white px-4 py-3 text-sm focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink" htmlFor="service">
                  Gói dịch vụ bạn quan tâm *
                </label>
                <select
                  id="service"
                  className="mt-1.5 w-full rounded-2xl border border-leaf/20 bg-white px-4 py-3 text-sm focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf/20"
                >
                  <option>Gift Set Quà Tặng Doanh Nghiệp (In logo)</option>
                  <option>Workshop Làm Nến Cho Team / Trường Học</option>
                  <option>Đăng Ký Làm Trạm Thu Gom Dầu Ăn Đối Tác</option>
                  <option>Đặt Gia Công / Sản Xuất Mùi Riêng</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink" htmlFor="message">
                  Ghi chú thêm (Số lượng dự kiến, thời gian cần...)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Ví dụ: Cần 100 set quà tặng ngày 20/10, ngân sách khoảng 150k/set..."
                  className="mt-1.5 w-full rounded-2xl border border-leaf/20 bg-white px-4 py-3 text-sm focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf/20"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-leaf py-3.5 font-bold text-white shadow-md shadow-leaf/25 transition hover:bg-leaf-dark"
              >
                <Send className="size-4" /> Gửi yêu cầu cho nhóm Luvia
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
