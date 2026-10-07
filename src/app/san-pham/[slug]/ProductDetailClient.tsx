"use client";

import { useState } from "react";
import { Check, Heart, Minus, Plus, ShoppingBag, Sparkles, Star, Truck } from "lucide-react";
import CandleArt from "@/components/CandleArt";
import { FAMILIES, MOODS, SIZES, formatVND, priceFor, type Product, type SizeId } from "@/lib/products";
import { useCart, openChat } from "@/lib/cart";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<SizeId>("classic");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const currentPrice = priceFor(product, size);
  const selectedSizeInfo = SIZES.find((s) => s.id === size) || SIZES[1];

  const handleAdd = () => {
    add(product.slug, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* ẢNH MINH HỌA HŨ NẾN LUVIA */}
      <div className="relative aspect-square overflow-hidden rounded-[40px] bg-white p-10 shadow-sm ring-1 ring-leaf/10 flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 60%, ${product.wax}, #fbf4e1 75%)` }}
        />
        <CandleArt product={product} className="relative z-10 h-4/5 w-auto drop-shadow-2xl transition duration-500 hover:scale-105" />
        {product.badge && (
          <span className="absolute left-6 top-6 rounded-full bg-leaf px-4 py-1.5 text-xs font-bold text-white shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* THÔNG TIN & MUA HÀNG */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-leaf-soft px-3.5 py-1 text-xs font-bold text-leaf-dark uppercase tracking-wider">
            {FAMILIES[product.families[0]]}
          </span>
          <span className="text-xs text-ink-soft">· Nến thơm tái chế sinh học</span>
        </div>

        <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">{product.name}</h1>
        <p className="mt-2 text-base font-medium text-leaf">{product.tagline}</p>

        {/* ĐÁNH GIÁ */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center text-flame">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <span className="text-sm font-bold text-ink">{product.rating}</span>
          <span className="text-xs text-ink-soft">({product.reviews} đánh giá đã mua)</span>
        </div>

        {/* GIÁ */}
        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-3xl font-black text-leaf-dark">{formatVND(currentPrice)}</span>
          <span className="text-sm text-ink-soft">/ hũ {selectedSizeInfo.label}</span>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-ink-soft">{product.description}</p>

        {/* CHỌN SIZE */}
        <div className="mt-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink">
            Chọn kích cỡ nến:
          </label>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {SIZES.map((s) => {
              const active = size === s.id;
              const price = priceFor(product, s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`rounded-2xl p-3.5 text-center transition ${
                    active
                      ? "bg-leaf text-white shadow-md ring-2 ring-leaf"
                      : "bg-white text-ink ring-1 ring-leaf/20 hover:bg-cream"
                  }`}
                >
                  <p className="text-sm font-bold">{s.label}</p>
                  <p className={`mt-0.5 text-xs ${active ? "text-white/80" : "text-ink-soft"}`}>
                    Đốt {s.burn}
                  </p>
                  <p className={`mt-1 text-xs font-semibold ${active ? "text-flame" : "text-leaf"}`}>
                    {formatVND(price)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* CHỌN SỐ LƯỢNG & NÚT MUA */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-12 w-32 items-center justify-between rounded-full bg-white px-3 ring-1 ring-leaf/20">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="grid size-8 place-items-center rounded-full hover:bg-cream text-ink"
              aria-label="Giảm"
            >
              <Minus className="size-4" />
            </button>
            <span className="font-bold text-ink">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="grid size-8 place-items-center rounded-full hover:bg-cream text-ink"
              aria-label="Tăng"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className={`flex flex-1 h-12 items-center justify-center gap-2 rounded-full font-bold shadow-lg transition active:scale-95 ${
              added
                ? "bg-leaf-dark text-white"
                : "bg-leaf text-white shadow-leaf/25 hover:bg-leaf-dark"
            }`}
          >
            {added ? (
              <>
                <Check className="size-5" /> Đã thêm vào giỏ!
              </>
            ) : (
              <>
                <ShoppingBag className="size-5" /> Thêm vào giỏ hàng
              </>
            )}
          </button>
        </div>

        {/* HỎI AI & CAM KẾT VẬN CHUYỂN */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-cream p-4 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Truck className="size-4 text-leaf" />
            <span>Freeship từ 500k · Đổi trả trong 7 ngày</span>
          </div>
          <button
            onClick={() => openChat(`Mùi ${product.name} này hợp với ai và không gian nào?`)}
            className="flex items-center gap-1 font-bold text-flame-dark hover:underline"
          >
            <Sparkles className="size-3.5" /> Hỏi Luvia về mùi này
          </button>
        </div>
      </div>
    </div>
  );
}
