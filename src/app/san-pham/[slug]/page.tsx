import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Flame, Heart, Leaf, ShieldCheck, Sparkles, Star } from "lucide-react";
import CandleArt from "@/components/CandleArt";
import ProductCard from "@/components/ProductCard";
import ProductDetailClient from "./ProductDetailClient";
import { FAMILIES, MOODS, PRODUCTS, formatVND, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Không tìm thấy sản phẩm" };
  return {
    title: `${product.name} — Nến thơm Luvia`,
    description: `${product.tagline}. ${product.description}`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.slug !== product.slug && p.families.some((f) => product.families.includes(f))).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* BREADCRUMB */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-ink-soft">
        <Link href="/san-pham" className="flex items-center gap-1 hover:text-leaf">
          <ArrowLeft className="size-4" /> Cửa hàng
        </Link>
        <span>/</span>
        <span className="text-ink font-medium">{product.name}</span>
      </nav>

      {/* MAIN PRODUCT SECTION */}
      <ProductDetailClient product={product} />

      {/* KIM TỰ THÁP MÙI HƯƠNG */}
      <section className="mt-20 rounded-[40px] bg-white p-8 shadow-sm ring-1 ring-leaf/10 sm:p-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="brush-tag text-lg">Kim tự tháp mùi hương</span>
          <h2 className="mt-4 text-3xl font-extrabold text-ink">
            Cấu trúc 3 tầng hương của {product.name}
          </h2>
          <p className="mt-3 text-ink-soft">
            Mỗi tầng hương được chiết xuất tự nhiên, hé nở theo từng cung bậc thời gian khi ngọn nến cháy êm.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-cream p-7 text-center">
            <span className="inline-block rounded-full bg-leaf-soft px-3 py-1 text-xs font-bold text-leaf">
              Hương Đầu (Top Note)
            </span>
            <p className="mt-4 text-xs text-ink-soft">Cảm nhận trong 15 phút đầu</p>
            <h4 className="mt-2 text-xl font-bold text-ink">{product.notes.top}</h4>
            <p className="mt-2 text-xs text-ink-soft">Ấn tượng tươi mới đầu tiên khi vừa thắp nến.</p>
          </div>

          <div className="rounded-3xl bg-cream p-7 text-center ring-2 ring-leaf">
            <span className="inline-block rounded-full bg-leaf px-3 py-1 text-xs font-bold text-white">
              Hương Giữa (Heart Note)
            </span>
            <p className="mt-4 text-xs text-ink-soft">Linh hồn của ngọn nến (1-3 giờ)</p>
            <h4 className="mt-2 text-xl font-bold text-leaf-dark">{product.notes.heart}</h4>
            <p className="mt-2 text-xs text-ink-soft">Hương thơm chủ đạo lan tỏa khắp không gian phòng.</p>
          </div>

          <div className="rounded-3xl bg-cream p-7 text-center">
            <span className="inline-block rounded-full bg-flame-soft px-3 py-1 text-xs font-bold text-flame-dark">
              Hương Cuối (Base Note)
            </span>
            <p className="mt-4 text-xs text-ink-soft">Lưu hương sau khi tắt nến</p>
            <h4 className="mt-2 text-xl font-bold text-ink">{product.notes.base}</h4>
            <p className="mt-2 text-xs text-ink-soft">Hương trầm ấm, bền bỉ và tạo cảm giác thư giãn dài lâu.</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-leaf-soft/60 p-6 text-center">
          <p className="text-sm text-leaf-dark">
            🌿 <b>Cảm hứng sáng tạo:</b> “{product.inspiration}”
          </p>
        </div>
      </section>

      {/* HƯỚNG DẪN ĐỐT NẾN AN TOÀN */}
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-7 ring-1 ring-leaf/10">
          <Flame className="size-8 text-flame" />
          <h4 className="mt-4 text-lg font-bold text-ink">Đốt lần đầu ít nhất 2 giờ</h4>
          <p className="mt-2 text-sm text-ink-soft leading-relaxed">
            Để sáp tan chảy đều đến tận mép cốc, tránh hiện tượng lõm tim (tunneling) giúp nến bền đẹp.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-7 ring-1 ring-leaf/10">
          <Clock className="size-8 text-leaf" />
          <h4 className="mt-4 text-lg font-bold text-ink">Cắt bấc nến trước mỗi lần đốt</h4>
          <p className="mt-2 text-sm text-ink-soft leading-relaxed">
            Cắt ngắn bấc cotton còn khoảng 0.5cm để lửa cháy đều, không bị muội than và không bốc khói đen.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-7 ring-1 ring-leaf/10">
          <Leaf className="size-8 text-leaf" />
          <h4 className="mt-4 text-lg font-bold text-ink">Tái sử dụng hũ sau khi dùng</h4>
          <p className="mt-2 text-sm text-ink-soft leading-relaxed">
            Khi nến còn 1cm, ngâm nước ấm rửa sạch sáp. Bạn có thể dùng cốc để trồng sen đá, cắm bút hoặc gửi về Luvia để nhận voucher!
          </p>
        </div>
      </section>

      {/* SẢN PHẨM LIÊN QUAN */}
      {related.length > 0 && (
        <section className="mt-24">
          <h3 className="text-2xl font-extrabold text-ink">Có thể bạn cũng thích</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
