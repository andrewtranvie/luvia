import Image from "next/image";
import Link from "next/link";
import {
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Recycle,
  Send,
  Sparkles,
} from "lucide-react";
import { SectionTitle } from "@/components/ui";

export const metadata = {
  title: "Liên hệ & Điểm thu gom dầu ăn",
  description:
    "Mạng lưới trạm thu gom dầu ăn tái chế của Luvia và giải đáp thắc mắc về nến thơm sinh học.",
};

const STATIONS = [
  {
    city: "Hà Nội",
    name: "Trạm Trung tâm & Xưởng Luvia",
    address: "Số 18, Ngõ 92 Trần Phú, Hà Đông, Hà Nội",
    time: "8:30 – 18:00 (Tất cả các ngày)",
    phone: "0988 123 456",
  },
  {
    city: "Hà Nội",
    name: "Điểm Thu Gom Cầu Giấy (Đối tác The Green Coffee)",
    address: "Tầng 1, 45 Duy Tân, Cầu Giấy, Hà Nội",
    time: "7:30 – 21:00",
    phone: "0912 345 678",
  },
  {
    city: "Đà Nẵng",
    name: "Điểm Sống Xanh Sơn Trà",
    address: "12 Võ Văn Kiệt, An Hải Đông, Sơn Trà, Đà Nẵng",
    time: "8:00 – 17:30 (Thứ 2 – Thứ 7)",
    phone: "0905 888 999",
  },
  {
    city: "TP. Hồ Chí Minh",
    name: "Trạm Quận 1 (Không gian Eco Hub)",
    address: "28 Nguyễn Thị Minh Khai, Đa Kao, Quận 1, TP. HCM",
    time: "8:00 – 20:00",
    phone: "0933 666 777",
  },
];

const FAQS = [
  {
    q: "Nến làm từ dầu ăn đã qua sử dụng có mùi khét hay hôi thức ăn không?",
    a: "Hoàn toàn KHÔNG! Dầu thô sau khi thu gom được đưa vào quy trình lọc đa tầng, xử lý than hoạt tính gáo dừa và đất sét hoạt tính tự nhiên để triệt tiêu 100% mùi chiên rán cũ và axit béo tự do. Nến Luvia chỉ tỏa hương thơm dịu nhẹ, thanh khiết của tinh dầu thiên nhiên.",
  },
  {
    q: "Nến Luvia có an toàn khi đốt trong phòng máy lạnh không?",
    a: "Rất an toàn! Khác với nến công nghiệp làm từ sáp paraffin (gốc dầu mỏ) sinh ra khói đen và khí benzen độc hại, nến Luvia dùng 100% sáp sinh học thuần thực vật và bấc cotton nguyên chất không chì. Khi đốt không khói, không cay mắt và an toàn cho cả gia đình.",
  },
  {
    q: "Làm thế nào để gom dầu ăn cũ tại nhà đúng cách?",
    a: "Rất đơn giản: Sau khi nấu ăn xong, bạn để dầu nguội hoàn toàn. Đổ dầu qua một chiếc rây lọc mắt nhỏ để giữ lại cặn thức ăn, sau đó trút vào bất kỳ chai/can nhựa sạch nào đậy kín nắp. Khi gom được từ 1 lít trở lên, bạn có thể mang qua các trạm của Luvia hoặc gửi kèm shipper khi mua nến để nhận voucher!",
  },
  {
    q: "Mỗi hũ nến Luvia đốt được trong bao lâu?",
    a: "Size Mini 100g đốt được 20–25 giờ; size Classic 200g đốt được 40–45 giờ; và size Grand 350g đốt được 70–80 giờ. Mỗi ngày bạn chỉ cần đốt từ 1–2 giờ là phòng đã thơm ngát dễ chịu cả ngày.",
  },
];

export default function ContactPage() {
  return (
    <div className="pb-24">
      {/* HEADER SECTION */}
      <section className="bg-cream-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <span className="brush-tag text-lg">Kết nối cùng Luvia</span>
          <h1 className="mt-4 text-4xl font-extrabold text-ink sm:text-5xl">
            Liên hệ & Trạm Thu Gom Dầu Ăn
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
            Dù bạn muốn mua nến lẻ, hợp tác quà tặng B2B, hay mang dầu ăn cũ đổi voucher — Luvia luôn sẵn sàng lắng nghe!
          </p>
        </div>
      </section>

      {/* ĐIỂM THU GOM */}
      <section id="doi-dau" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle
          tag="Mạng lưới xanh"
          title="Các điểm thu gom dầu ăn đã qua sử dụng"
          desc="Gom dầu thừa vào chai nhựa sạch và mang đến một trong các địa chỉ dưới đây để nhận ngay voucher giảm giá."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {STATIONS.map((st) => (
            <div key={st.name} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-leaf/10">
              <span className="rounded-full bg-leaf-soft px-3.5 py-1 text-xs font-bold text-leaf-dark">
                {st.city}
              </span>
              <h3 className="mt-4 text-xl font-bold text-ink">{st.name}</h3>
              <div className="mt-4 space-y-2 text-sm text-ink-soft">
                <p className="flex items-start gap-2.5">
                  <MapPin className="size-4 shrink-0 mt-0.5 text-leaf" />
                  <span>{st.address}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="size-4 shrink-0 text-leaf" />
                  <span>{st.phone}</span>
                </p>
                <p className="text-xs text-flame-dark font-medium pl-6.5">
                  Thời gian mở cửa: {st.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="paper border-y border-leaf/10 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionTitle
            center
            tag="Hỏi đáp thường gặp"
            title="Những điều bạn quan tâm về Luvia"
            desc="Giải đáp mọi băn khoăn về quy trình xử lý, thành phần và độ an toàn của nến thơm dầu ăn tái chế."
          />

          <div className="mt-12 space-y-5">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-leaf/10">
                <h3 className="flex items-start gap-3 text-lg font-bold text-ink">
                  <HelpCircle className="size-5 shrink-0 text-leaf mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-3 pl-8 text-sm leading-relaxed text-ink-soft">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
