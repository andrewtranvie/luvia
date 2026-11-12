import Image from "next/image";
import Link from "next/link";
import { Sparkles, Leaf, Flame, ShieldCheck } from "lucide-react";
import ChatPanel from "@/components/ChatPanel";
import GiftScentFinder from "@/components/GiftScentFinder";
import { SectionTitle } from "@/components/ui";

export const metadata = {
  /* Layout gốc đã nối " · Luvia" qua title.template nên đừng ghi "Luvia" ở đây nữa */
  title: "Lumi · AI tư vấn mùi hương",
  description:
    "Trò chuyện với Lumi để nhận gợi ý mùi hương phù hợp với tâm trạng, diện tích phòng và nhu cầu thư giãn của bạn.",
};

export default function ConsultationPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-leaf-soft px-4 py-1.5 text-sm font-bold text-leaf-dark">
          <Sparkles className="size-4 text-flame" /> Luvia Scent Sommelier AI
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
          Lumi, trợ lý mùi hương của Luvia
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          Được huấn luyện dựa trên thư viện mùi hương và tâm trạng trị liệu của Luvia. Kể cho Lumi nghe tâm trạng của bạn hôm nay nhé!
        </p>
      </div>

      {/* Lối vào nhanh: tả người được tặng rồi để Lumi chọn — đặt trước khung chat vì trước đây
          trang này chỉ có khung chat trắng, khách không biết nên gõ gì. variant="legacy" vì trang
          này còn dùng hệ màu cũ (cream / leaf / ink), chưa chuyển sang clay3d như /qua-tang. */}
      <div className="mt-10">
        <GiftScentFinder variant="legacy" />
      </div>

      <div className="mt-10 overflow-hidden rounded-[40px] bg-white shadow-xl ring-1 ring-leaf/15">
        <div className="bg-leaf px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/lumi-chat.jpg"
              alt="Lumi"
              width={40}
              height={40}
              className="size-10 rounded-full object-cover ring-2 ring-white/30"
            />
            <div>
              <p className="font-bold text-sm">Lumi 🌿</p>
              <p className="text-xs text-white/80">Đang trực tuyến · Sẵn sàng chọn mùi cùng bạn</p>
            </div>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-flame">
            100% Miễn phí
          </span>
        </div>

        <div className="h-[600px] p-4 sm:p-6 bg-cream-light/60">
          <ChatPanel className="h-full" />
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3 text-center text-xs text-ink-soft">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-leaf/10">
          <Leaf className="mx-auto size-6 text-leaf mb-2" />
          <p className="font-bold text-ink">Cá nhân hoá theo cảm xúc</p>
          <p className="mt-1">Đề xuất mùi hương dựa trên cảm xúc, thói quen và mục đích sử dụng.</p>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-leaf/10">
          <Flame className="mx-auto size-6 text-flame mb-2" />
          <p className="font-bold text-ink">Thêm giỏ hàng tức thì</p>
          <p className="mt-1">Dễ dàng chọn size và thêm ngay sản phẩm vào giỏ hàng từ khung chat.</p>
        </div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-leaf/10">
          <ShieldCheck className="mx-auto size-6 text-leaf mb-2" />
          <p className="font-bold text-ink">Hoàn toàn bảo mật</p>
          <p className="mt-1">Không thu thập thông tin cá nhân ngoài nội dung trò chuyện tư vấn.</p>
        </div>
      </div>
    </div>
  );
}
