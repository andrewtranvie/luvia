"use client";

import Link from "next/link";
import { Plus, Star } from "lucide-react";
import CandleArt from "./CandleArt";
import { FAMILIES, formatVND, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-leaf/10 card-interactive">
      <Link href={`/san-pham/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 60%, ${product.wax}, #fbf4e1 70%)` }} />
        <CandleArt product={product} className="relative mx-auto h-full w-auto p-6 transition duration-700 ease-out group-hover:scale-110 group-hover:-rotate-1" />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-leaf px-3 py-1 text-xs font-semibold text-white shadow-sm transition group-hover:bg-flame">
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
