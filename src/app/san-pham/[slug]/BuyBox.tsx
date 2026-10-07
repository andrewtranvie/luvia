"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { SIZES, formatVND, priceFor, type Product, type SizeId } from "@/lib/products";

export default function BuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<SizeId>("classic");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product.slug, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="mt-8">
      <p className="text-3xl font-extrabold text-leaf-dark">{formatVND(priceFor(product, size) * qty)}</p>

      <fieldset className="mt-5">
        <legend className="mb-3 text-sm font-semibold">Kích thước</legend>
        <div className="grid grid-cols-3 gap-3">
          {SIZES.map((s) => (
            <label
              key={s.id}
              className={`cursor-pointer rounded-2xl border-2 p-3 text-center transition ${
                size === s.id ? "border-leaf bg-leaf-soft" : "border-leaf/15 bg-white hover:border-leaf/40"
              }`}
            >
              <input type="radio" name="size" value={s.id} checked={size === s.id} onChange={() => setSize(s.id)} className="sr-only" />
              <span className="block text-sm font-bold">{s.label}</span>
              <span className="block text-xs text-ink-soft">{s.burn}</span>
              <span className="mt-1 block text-sm font-semibold text-leaf-dark">{formatVND(priceFor(product, s.id))}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 flex gap-3">
        <div className="flex items-center rounded-full bg-white ring-1 ring-leaf/20">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-12 place-items-center" aria-label="Giảm số lượng">
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="grid size-12 place-items-center" aria-label="Tăng số lượng">
            <Plus className="size-4" />
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-leaf px-6 font-semibold text-white shadow-lg shadow-leaf/25 transition hover:bg-leaf-dark active:scale-[0.98]"
        >
          {added ? <><Check className="size-5" /> Đã thêm vào giỏ</> : <><ShoppingBag className="size-5" /> Thêm vào giỏ</>}
        </button>
      </div>
      {added && (
        <Link href="/gio-hang" className="mt-3 block text-center text-sm font-semibold text-flame-dark hover:underline">
          Xem giỏ hàng & thanh toán →
        </Link>
      )}
      <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
        <Truck className="size-4 text-leaf" /> Giao 2–4 ngày · Miễn phí ship đơn từ 500.000₫
      </p>
    </div>
  );
}
