import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplet, Eye, Filter, FlaskConical, Flame, HeartHandshake, Package, Sprout, Target } from "lucide-react";
import { AskLuviaButton, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Câu chuyện thương hiệu",
  description: "Hành trình Luvia biến dầu ăn đã qua sử dụng thành những ngọn nến thơm thân thiện với môi trường.",
};

const PROCESS = [
  { icon: Droplet, title: "Thu gom", desc: "Dầu ăn đã qua sử dụng từ hộ gia đình, quán ăn đối tác và chương trình đổi dầu lấy voucher." },
  { icon: Filter, title: "Lọc & làm sạch", desc: "Lắng cặn, lọc nhiều lớp qua vải và than hoạt tính để loại bỏ tạp chất, vụn thức ăn." },
  { icon: FlaskConical, title: "Khử mùi & tẩy màu", desc: "Xử lý bằng đất tẩy màu và than hoạt tính đến khi dầu trong, không còn mùi chiên rán." },
  { icon: Sprout, title: "Phối sáp thực vật", desc: "Trộn cùng sáp thực vật theo tỉ lệ riêng để nến đông đẹp, cháy đều và giữ hương lâu." },
  { icon: Flame, title: "Tạo hương & đổ khuôn", desc: "Thêm hương liệu an toàn, đặt bấc cotton không chì, đổ thủ công vào hũ thuỷ tinh." },
  { icon: Package, title: "Đóng gói xanh", desc: "Ủ nến 7 ngày cho hương “chín”, đóng hộp giấy kraft tái chế, không túi nilon." },
];

const EXPRESSIONS = [
  { src: "/brand/exp-happy.jpg", label: "Vui vẻ", desc: "Luôn tươi cười chào đón bạn" },
  { src: "/brand/exp-nature.jpg", label: "Yêu thiên nhiên", desc: "Ôm lá xanh mọi lúc mọi nơi" },
  { src: "/brand/exp-playful.jpg", label: "Tinh nghịch", desc: "Thích nháy mắt và bày trò" },
  { src: "/brand/exp-love.jpg", label: "Lan tỏa", desc: "Ôm cả trái đất vào lòng" },
];

export default function StoryPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-0 size-[480px] rounded-full bg-leaf-soft blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-16 text-center sm:px-6">
          <span className="brush-tag text-lg">Câu chuyện Luvia</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">
            Từ một chảo dầu đã nguội
            <br />
            <span className="squiggle text-leaf">đến một ngọn lửa ấm</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Luvia không chỉ là một ngọn nến. Đó là lời hứa nhỏ rằng những thứ tưởng như bị bỏ đi vẫn có thể được tái sinh
            thành điều tốt đẹp.
          </p>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Image
            src="/brand/scene-candle.jpg"
            alt="Linh vật Luvia ôm hũ nến giữa thiên nhiên"
            width={654}
            height={564}
            priority
            className="h-[280px] w-full rounded-[40px] object-cover object-[50%_60%] shadow-xl sm:h-[440px]"
          />
        </div>
      </section>

      {/* KHỞI NGUỒN */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionTitle tag="Khởi nguồn" title="Một câu hỏi bên bếp nhà" />
          <div className="mt-8 rounded-[28px] bg-leaf p-7 text-white">
            <p className="text-5xl font-extrabold">1 lít</p>
            <p className="mt-2 text-white/85">
              dầu ăn đổ xuống cống có thể tạo thành lớp màng ngăn oxy trên mặt nước, gây ô nhiễm cho một lượng nước rất lớn
              và làm tắc nghẽn hệ thống thoát nước.
            </p>
          </div>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>
            Ở nhiều gia đình Việt, dầu ăn sau khi chiên rán thường chỉ có hai số phận: <b className="text-ink">đổ xuống
            bồn rửa</b> hoặc <b className="text-ink">bị dùng đi dùng lại</b>. Cả hai đều không tốt — cho dòng sông, và
            cho sức khoẻ của chính chúng ta.
          </p>
          <p>
            Luvia bắt đầu từ một câu hỏi rất đời thường bên căn bếp: <i>“Nếu không đổ đi, thì chảo dầu này có thể trở
            thành gì?”</i> Câu trả lời đến sau hàng trăm mẻ thử nghiệm lọc, khử mùi, phối sáp: một ngọn nến thơm sạch
            sẽ, cháy êm, không còn chút mùi chiên rán nào.
          </p>
          <p>
            Cái tên <b className="text-leaf">Luvia</b> gợi đến <i>Love</i> và <i>Via</i> — “con đường của yêu thương”: yêu
            bản thân bằng những phút giây thư thái, và yêu hành tinh bằng những lựa chọn nhỏ mỗi ngày.
          </p>
        </div>
      </section>

      {/* SỨ MỆNH */}
      <section className="paper border-y border-leaf/10 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {[
            { icon: Target, title: "Sứ mệnh", text: "Biến dầu ăn thải thành sản phẩm hữu ích, giảm ô nhiễm nguồn nước và lan tỏa lối sống xanh từ chính căn bếp gia đình." },
            { icon: Eye, title: "Tầm nhìn", text: "Trở thành thương hiệu nến thơm tái chế được yêu thích tại Việt Nam, với mạng lưới thu gom dầu ăn ở mọi khu phố." },
            { icon: HeartHandshake, title: "Giá trị", text: "Xanh — Ấm áp — Minh bạch. Mỗi sản phẩm đều kể rõ nguồn gốc, quy trình và tác động mà nó tạo ra." },
          ].map((v) => (
            <div key={v.title} className="rounded-[28px] bg-white p-8 ring-1 ring-leaf/10">
              <div className="grid size-14 place-items-center rounded-2xl bg-flame-soft text-flame-dark">
                <v.icon className="size-7" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUY TRÌNH */}
      <section id="quy-trinh" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-24 sm:px-6">
        <SectionTitle
          center
          tag="Quy trình"
          title="6 bước tái sinh một ngọn nến"
          desc="Mỗi mẻ nến Luvia mất khoảng 10 ngày từ lúc nhận dầu đến khi tới tay bạn."
        />
        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-[28px] bg-white p-4 ring-1 ring-leaf/10">
          <Image src="/brand/process.jpg" alt="Dầu ăn đã qua sử dụng → Tái chế xử lý → Nến thơm Luvia" width={450} height={145} className="w-full" />
        </div>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-[24px] bg-white p-6 ring-1 ring-leaf/10">
              <div className="flex flex-col items-center">
                <span className="grid size-12 place-items-center rounded-full bg-leaf text-white">
                  <s.icon className="size-6" />
                </span>
                <span className="mt-2 font-hand text-xl text-flame-dark">0{i + 1}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* LINH VẬT */}
      <section className="bg-leaf py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="font-hand text-2xl text-flame">Gặp gỡ linh vật</span>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Xin chào, mình là Luvia!</h2>
              <p className="mt-4 leading-relaxed text-white/85">
                Một ngọn nến nhỏ được sinh ra từ dầu ăn tái chế, đeo khăn lá xanh, luôn ôm trái đất trong tay. Luvia vui vẻ,
                yêu thiên nhiên, hơi tinh nghịch và thích nhất là lan tỏa những điều tốt đẹp.
              </p>
              <p className="mt-4 leading-relaxed text-white/85">
                Bạn có thể trò chuyện trực tiếp với Luvia — trợ lý AI sẽ giúp bạn tìm mùi hương hợp nhất.
              </p>
              <AskLuviaButton className="mt-6 border-white" prompt="Chào Luvia! Kể mình nghe về bạn đi.">
                Trò chuyện với Luvia
              </AskLuviaButton>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {EXPRESSIONS.map((e) => (
                <figure key={e.label} className="rounded-3xl bg-cream p-3 text-center text-ink">
                  <Image src={e.src} alt={`Luvia ${e.label}`} width={160} height={190} className="mx-auto aspect-[4/5] w-full rounded-2xl object-cover" />
                  <figcaption className="mt-3">
                    <span className="block font-hand text-xl text-leaf">{e.label}</span>
                    <span className="block text-xs text-ink-soft">{e.desc}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TÁC ĐỘNG */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionTitle center tag="Tác động" title="Những con số khiến chúng mình tiếp tục" />
        <dl className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[
            ["2.400+", "lít dầu ăn đã được tái chế"],
            ["15.000+", "ngọn nến đã thắp sáng"],
            ["8.000+", "hũ thuỷ tinh được tái sử dụng"],
            ["45+", "quán ăn & đối tác thu gom"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-[28px] bg-white p-6 text-center ring-1 ring-leaf/10">
              <dd className="text-3xl font-extrabold text-leaf sm:text-4xl">{n}</dd>
              <dt className="mt-2 text-sm text-ink-soft">{l}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-center text-xs text-ink-soft">* Số liệu minh hoạ — cập nhật theo số liệu thực tế của Luvia.</p>
      </section>

      {/* BỘ NHẬN DIỆN */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 rounded-[40px] bg-white p-6 ring-1 ring-leaf/10 sm:p-10 lg:grid-cols-2">
          <Image src="/brand/brand-board.jpg" alt="Bộ nhận diện thương hiệu Luvia" width={1254} height={1254} className="w-full rounded-[28px]" />
          <div>
            <SectionTitle tag="Nhận diện" title="Xanh lá, vàng nến và màu kem ấm" />
            <p className="mt-4 leading-relaxed text-ink-soft">
              Màu xanh lá tượng trưng cho thiên nhiên và sự tái sinh. Màu vàng cam của ngọn lửa là sự ấm áp. Nền kem gợi
              cảm giác mộc mạc, gần gũi như giấy kraft.
            </p>
            <div className="mt-6 flex gap-3">
              {[["#548333", "Leaf"], ["#F2A93B", "Flame"], ["#FBF4E1", "Cream"], ["#C9A877", "Kraft"]].map(([c, n]) => (
                <div key={c} className="text-center">
                  <span className="block size-14 rounded-2xl ring-1 ring-black/10" style={{ background: c }} />
                  <span className="mt-1 block text-xs font-semibold">{n}</span>
                  <span className="block text-[10px] text-ink-soft">{c}</span>
                </div>
              ))}
            </div>
            <Link href="/san-pham" className="mt-8 inline-flex items-center gap-2 rounded-full bg-leaf px-7 py-3.5 font-semibold text-white hover:bg-leaf-dark">
              Thắp sáng cùng Luvia <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
