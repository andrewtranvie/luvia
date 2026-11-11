import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SeasonCard from "@/components/SeasonCard";
import ProductDetailClient from "./ProductDetailClient";
import ProductTabs from "./ProductTabs";
import { SEASONS, getSeason } from "@/lib/catalog";
import { COLLECTION, FAQ, SEASON_COPY } from "@/content/vi";

export function generateStaticParams() {
  return SEASONS.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const season = getSeason(slug);
  if (!season) return { title: "Không tìm thấy sản phẩm" };
  return { title: `${season.fullName} — Luvia`, description: season.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const season = getSeason(slug);
  if (!season) notFound();

  const others = SEASONS.filter((s) => s.id !== season.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-8 flex items-center gap-2 text-sm text-ink-soft">
        <Link href="/san-pham" className="flex items-center gap-1 hover:text-leaf">
          <ArrowLeft className="size-4" /> Cửa hàng
        </Link>
        <span>/</span>
        <span className="font-medium text-ink">{SEASON_COPY[season.id].name}</span>
      </nav>

      {/* key = mã mùa: chuyển sang mùa khác thì dựng lại, khỏi giữ quy cách/ảnh của mùa cũ */}
      <ProductDetailClient key={season.id} season={season} />

      {/* Mô tả · hướng dẫn dùng · đánh giá — gom vào tab để trang không kéo dài quá */}
      <ProductTabs season={season} />

      {/* Câu hỏi thường gặp liên quan tới sản phẩm */}
      <section className="mt-20">
        <h2 className="text-2xl font-extrabold text-ink">Trước khi chọn, bạn có thể muốn biết</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {FAQ.items
            .filter((item) => ["faq-nguyen-lieu", "faq-chon-mua", "faq-giao-hang", "faq-van-de"].includes(item.id))
            .map((item) => (
              <div key={item.id} className="rounded-3xl bg-white p-6 ring-1 ring-leaf/10">
                <h3 className="text-base font-bold text-ink">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.a}</p>
              </div>
            ))}
        </div>
        <Link href={`/#${FAQ.id}`} className="mt-5 inline-block text-sm font-semibold text-leaf hover:underline">
          Xem tất cả câu hỏi thường gặp →
        </Link>
      </section>

      {/* Các mùa khác */}
      <section className="mt-20">
        <h2 className="text-2xl font-extrabold text-ink">{COLLECTION.title}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <SeasonCard key={s.id} season={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
