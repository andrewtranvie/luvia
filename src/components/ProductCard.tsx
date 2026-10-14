"use client";

import Link from "next/link";
import { Plus, Star } from "lucide-react";
import CandleArt from "./CandleArt";
import { FAMILIES, formatVND, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useTheme } from "@/lib/themeContext";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { is3D } = useTheme();

  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-leaf/10 card-interactive ${is3D ? "clay-card" : ""}`}>
      <Link href={`/san-pham/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 60%, ${product.wax}, #fbf4e1 70%)` }} />
        {is3D && (
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 h-5 w-3/4 rounded-full bg-gradient-to-b from-[#f7eedc] to-[#e4d3b4] shadow-[0_10px_20px_rgba(140,110,60,0.25)] ring-1 ring-white/70" />
        )}
        <CandleArt product={product} className={`relative mx-auto h-full w-auto p-6 transition duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1 ${is3D ? "drop-shadow-[0_14px_16px_rgba(242,169,59,0.35)]" : ""}`} />
        {product.badge && (
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm transition group-hover:bg-flame ${is3D ? "clay-btn-leaf" : "bg-leaf"}`}>
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-leaf">{FAMILIES[product.families[0]]}</p>
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="mt-1 text-lg font-bold text-ink transition group-hover:text-leaf">{product.name}</h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{product.tagline}</p>
        <div className="mt-2 flex items-center gap-1 text-xs text-ink-soft">
          <Star className="size-3.5 fill-flame text-flame" /> {product.rating} · {product.reviews} đánh giá
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-leaf-dark">{formatVND(product.price)}</span>
          <button
            onClick={() => add(product.slug, "classic")}
            className="btn-shine flex items-center gap-1 rounded-full bg-leaf px-4 py-2 text-sm font-semibold text-white shadow-md shadow-leaf/20 transition hover:bg-flame hover:scale-105 active:scale-95"
            aria-label={`Thêm ${product.name} vào giỏ`}
          >
            <Plus className="size-4" /> Thêm
          </button>
        </div>
      </div>
    </article>
  );
}
