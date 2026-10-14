import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-24 bg-leaf-dark text-white/85">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block rounded-2xl bg-cream px-4 py-3">
            <Logo />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Mỗi ngọn nến Luvia được làm thủ công từ dầu ăn đã qua sử dụng, lọc sạch và tái sinh thành ánh sáng
            ấm áp cho ngôi nhà của bạn.
          </p>
          <p className="mt-3 font-hand text-lg text-flame">Lan tỏa ánh sáng xanh ♡</p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Mua sắm</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-flame" href="/san-pham">Tất cả sản phẩm</Link></li>
            <li><Link className="hover:text-flame" href="/san-pham?mood=ngu-ngon">Nến cho giấc ngủ</Link></li>
            <li><Link className="hover:text-flame" href="/san-pham?mood=lang-man">Quà tặng</Link></li>
            <li><Link className="hover:text-flame" href="/tu-van">Tư vấn mùi hương AI</Link></li>
            <li><Link className="hover:text-flame" href="/gio-hang">Giỏ hàng</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Luvia</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-flame" href="/cau-chuyen">Câu chuyện thương hiệu</Link></li>
            <li><Link className="hover:text-flame" href="/cau-chuyen#quy-trinh">Quy trình tái chế</Link></li>
            <li><Link className="hover:text-flame" href="/doi-ngu">Đội ngũ sáng lập (Bên B)</Link></li>
            <li><Link className="hover:text-flame" href="/demo-3d">Concept 3D (Stitch Demo)</Link></li>
            <li><Link className="hover:text-flame" href="/lien-he#doi-dau">Chương trình đổi dầu ăn</Link></li>
            <li><Link className="hover:text-flame" href="/lien-he#faq">Câu hỏi thường gặp</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Liên hệ</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /> Hà Nội, Việt Nam</li>
            <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0" /> 0900 000 000</li>
            <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0" /> hello@luvia.vn</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-flame">
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V11H7v4h3v9h4v-9h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z" /></svg>
            </a>
            <a href="#" aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-flame">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © 2026 Luvia. Không chỉ là một ngọn nến — mà là hành trình vì một tương lai xanh hơn.
      </div>
    </footer>
  );
}
