import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Beaker, CookingPot, Droplet, Eye, FlaskConical, HeartHandshake, Target } from "lucide-react";
import { SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Câu chuyện thương hiệu",
  description: "Hành trình Luvia biến dầu ăn đã qua sử dụng thành những ngọn nến thơm thân thiện với môi trường.",
};

/* Chép nguyên văn từ infographic "Một hũ nến Luvia được tạo ra như thế nào?" khách gửi
   2026-11-03 (ảnh gốc: 02_Du-an/Luvia/Anh-khach-gui-2026-11-03/D_Thuong-hieu/quy-trinh-lam-nen.png).
   Thay cho 6 bước cũ do tôi tự viết — bản cũ có vài chi tiết tôi bịa (đất tẩy màu, ủ nến 7 ngày).
   Không sửa câu chữ của khách: bước 5 đọc hơi lủng củng và khách viết "thủy tinh" (chỗ cũ
   của tôi là "thuỷ tinh") — giữ đúng bản khách. */
const PROCESS = [
  { icon: Droplet, title: "Chuẩn bị nguyên liệu", desc: "Dầu ăn đã qua xử lý, sáp thực vật, bấc nến và các nguyên liệu an toàn, thân thiện với môi trường." },
  { icon: CookingPot, title: "Tạo hỗn hợp sáp", desc: "Đun nóng và hòa trộn dầu đã qua xử lý với sáp thực vật, tạo thành hỗn hợp sáp mịn, ổn định." },
  { icon: FlaskConical, title: "Thêm hương thơm", desc: "Cho tinh dầu thiên nhiên với 4 hương đặc trưng của Luvia, mang hơi thở bốn mùa vào từng hũ nến." },
  { icon: Beaker, title: "Rót nến vào hũ", desc: "Cẩn thận rót hỗn hợp sáp vào hũ thủy tinh đã chuẩn bị bấc nến, đảm bảo đúng nhiệt độ và tỉ lệ." },
  { icon: BadgeCheck, title: "Hoàn thiện thành phẩm", desc: "Để nến nguội, kiểm tra chất lượng và dán nhãn trước khi đến tay bạn, những hũ nến thơm nhỏ xinh từ những điều tốt đẹp hơn cho hành tinh." },
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
          {/* Ảnh banner có chữ nên dùng tỉ lệ 16:9 đúng gốc, không crop mất tiêu đề */}
          <Image
            src="/brand/preorder-bon-mua.jpg"
            alt="Pre-order đã mở — bộ bốn mùa nến thơm Luvia"
            width={1672}
            height={940}
            priority
            className="h-auto w-full rounded-[40px] shadow-xl"
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
            <div key={v.title} className="clay-card p-8">
              <div className="grid size-14 place-items-center rounded-2xl bg-flame-soft text-flame-dark">
                <v.icon className="size-7" />
              </div>
              <h3 className="font-serif mt-5 text-2xl font-bold">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUY TRÌNH */}
      {/* Bỏ scroll-mt-32: scroll-padding-top ở html đã chừa chỗ cho header dính,
          để cả hai thì cộng dồn thành 240px, mục này tụt hẳn xuống giữa màn. */}
      <section id="quy-trinh" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionTitle
          center
          tag="Quy trình"
          title="Một hũ nến Luvia được tạo ra như thế nào?"
          /* ⚠️ Câu desc này tôi viết, chờ khách duyệt — infographic khách gửi không có câu dẫn */
          desc="Từ dầu ăn đã qua xử lý đến những hũ nến thơm nhỏ xinh."
        />
        <div className="clay-card mx-auto mt-10 max-w-2xl overflow-hidden p-4">
          {/* Bản khách gửi 2752×1536 (lưu ở ../anh-goc/process-2752x1536.png), đã cắt bớt
              lề trên/dưới và xuất 1800×605. File 450×145 cũ vẫn giữ ở process.jpg. */}
          <Image
            src="/brand/process-hd.jpg"
            alt="Dầu ăn đã qua sử dụng → Tái chế xử lý → Nến thơm Luvia"
            width={1800}
            height={605}
            sizes="(max-width: 768px) 100vw, 640px"
            /* quality phải nằm trong images.qualities của next.config.ts ([75, 90]), nếu không
               bản build thật trả 400 INVALID_IMAGE_OPTIMIZE_REQUEST, ảnh mất trắng. Dev không chặn. */
            quality={90}
            className="w-full"
          />
        </div>
        {/* 5 thẻ trên lưới 2 cột (sm) / 3 cột (lg) sẽ để thẻ cuối trơ lệch trái. Dùng lưới
            4/6 cột, mỗi thẻ chiếm 2 cột, rồi đẩy hai thẻ cuối vào giữa bằng col-start. */}
        <ol className="mt-12 grid gap-5 sm:grid-cols-4 lg:grid-cols-6">
          {PROCESS.map((s, i) => (
            <li
              key={s.title}
              className={`clay-card flex gap-4 p-6 sm:col-span-2 ${
                i === 3 ? "lg:col-start-2" : i === 4 ? "sm:col-start-2 lg:col-start-4" : ""
              }`}
            >
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

    </>
  );
}


