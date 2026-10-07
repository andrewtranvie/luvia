"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Flame, Gift, Heart, Sparkles, Wand2 } from "lucide-react";
import { PRODUCTS, SIZES, formatVND, priceFor, type Product, type SizeId } from "@/lib/products";
import { useCart } from "@/lib/cart";

const LABEL_COLORS = [
  { name: "Xanh lá mộc", color: "#548333", bg: "#F4F7EE" },
  { name: "Vàng ấm áp", color: "#E07B1A", bg: "#FFF8ED" },
  { name: "Kem sữa tối giản", color: "#2E3A22", bg: "#FFFDF9" },
  { name: "Hồng dịu dàng", color: "#D98A9A", bg: "#FDF5F6" },
];

const STICKER_ICONS = [
  { name: "Vui vẻ", src: "/brand/exp-happy.jpg" },
  { name: "Yêu thiên nhiên", src: "/brand/exp-nature.jpg" },
  { name: "Tinh nghịch", src: "/brand/exp-playful.jpg" },
  { name: "Lan tỏa", src: "/brand/exp-love.jpg" },
];

export default function CustomCandlePage() {
  const { add } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[1]); // Hoa bưởi mặc định
  const [size, setSize] = useState<SizeId>("classic");
  const [wick, setWick] = useState<"cotton" | "wood">("wood");
  const [labelTitle, setLabelTitle] = useState("Dành Tặng Mẹ Yêu");
  const [labelSub, setLabelSub] = useState("Mong mẹ luôn an yên & thật nhiều sức khỏe ♡");
  const [labelColor, setLabelColor] = useState(LABEL_COLORS[0]);
  const [selectedSticker, setSelectedSticker] = useState(STICKER_ICONS[0]);
  const [added, setAdded] = useState(false);

  const basePrice = priceFor(selectedProduct, size);
  const customFee = 20000; // Phí in nhãn độc bản
  const totalPrice = basePrice + customFee;

  const handleAddToCart = () => {
    add(selectedProduct.slug, size, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-leaf-soft px-4 py-1.5 text-xs font-bold text-leaf-dark">
          <Wand2 className="size-4 text-flame" /> Luvia Custom Candle Studio
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-5xl">
          Tự thiết kế nến & in nhãn riêng độc bản
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
          Chọn mùi hương yêu thích, gõ tên người nhận hoặc lời chúc riêng để Luvia in tem nhãn thủ công dành tặng người đặc biệt của bạn.
        </p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* CỘT CẤU HÌNH BƯỚC THIẾT KẾ */}
        <div className="space-y-8 rounded-[40px] bg-white p-6 shadow-sm ring-1 ring-leaf/10 sm:p-10">
          {/* BƯỚC 1: CHỌN MÙI HƯƠNG */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-leaf">
              1. Chọn mùi hương nền ({PRODUCTS.length} mùi)
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {PRODUCTS.map((p) => {
                const active = selectedProduct.slug === p.slug;
                return (
                  <button
                    key={p.slug}
                    onClick={() => setSelectedProduct(p)}
                    className={`rounded-2xl p-3 text-left transition ${
                      active
                        ? "bg-leaf text-white shadow-md ring-2 ring-leaf"
                        : "bg-cream text-ink ring-1 ring-leaf/10 hover:bg-cream-dark"
                    }`}
                  >
                    <p className="text-xs font-bold truncate">{p.name}</p>
                    <p className={`text-[11px] truncate mt-0.5 ${active ? "text-white/80" : "text-ink-soft"}`}>
                      {p.notes.top}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BƯỚC 2: CHỌN SIZE & LOẠI BẤC */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-leaf">
                2. Chọn dung tích
              </h2>
              <div className="mt-3 space-y-2">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.id)}
                    className={`w-full rounded-2xl p-3 text-left flex justify-between items-center transition ${
                      size === s.id
                        ? "bg-leaf-soft text-leaf-dark ring-2 ring-leaf font-bold"
                        : "bg-cream text-ink ring-1 ring-leaf/10"
                    }`}
                  >
                    <span className="text-xs">{s.label}</span>
                    <span className="text-xs text-ink-soft">{s.burn}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-leaf">
                3. Chọn loại bấc nến
              </h2>
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => setWick("wood")}
                  className={`w-full rounded-2xl p-3 text-left flex justify-between items-center transition ${
                    wick === "wood"
                      ? "bg-leaf-soft text-leaf-dark ring-2 ring-leaf font-bold"
                      : "bg-cream text-ink ring-1 ring-leaf/10"
                  }`}
                >
                  <span className="text-xs">Bấc Gỗ sồi (Nổ lách tách)</span>
                  <span className="text-[11px] text-flame-dark">Ấm cúng</span>
                </button>
                <button
                  onClick={() => setWick("cotton")}
                  className={`w-full rounded-2xl p-3 text-left flex justify-between items-center transition ${
                    wick === "cotton"
                      ? "bg-leaf-soft text-leaf-dark ring-2 ring-leaf font-bold"
                      : "bg-cream text-ink ring-1 ring-leaf/10"
                  }`}
                >
                  <span className="text-xs">Bấc Cotton 100% không chì</span>
                  <span className="text-[11px] text-leaf">Cháy êm đềm</span>
                </button>
              </div>
            </div>
          </div>

          {/* BƯỚC 3: CÁ NHÂN HÓA NHÃN IN */}
          <div className="border-t border-leaf/10 pt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-leaf">
              4. Nội dung in riêng lên nhãn nến
            </h2>

            <div className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Tiêu đề trên nhãn (Tên người nhận / Dịp tặng) *
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={labelTitle}
                  onChange={(e) => setLabelTitle(e.target.value)}
                  placeholder="Ví dụ: Góc Bình Yên Của Mai, Dành Tặng Mẹ..."
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-sm font-bold focus:border-leaf focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Lời chúc / Thông điệp nhỏ bên dưới
                </label>
                <input
                  type="text"
                  maxLength={60}
                  value={labelSub}
                  onChange={(e) => setLabelSub(e.target.value)}
                  placeholder="Ví dụ: Mong bạn luôn an yên và mỉm cười mỗi ngày ♡"
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-xs focus:border-leaf focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Màu sắc tem nhãn
                  </label>
                  <div className="flex gap-2">
                    {LABEL_COLORS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setLabelColor(c)}
                        className={`size-8 rounded-full border-2 transition ${
                          labelColor.name === c.name ? "ring-2 ring-leaf scale-110" : "border-black/10"
                        }`}
                        style={{ background: c.color }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Sticker Bé Nến in kèm
                  </label>
                  <div className="flex gap-2">
                    {STICKER_ICONS.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => setSelectedSticker(s)}
                        className={`relative size-8 overflow-hidden rounded-full ring-2 transition ${
                          selectedSticker.name === s.name ? "ring-leaf scale-110" : "ring-transparent opacity-60"
                        }`}
                        title={s.name}
                      >
                        <Image src={s.src} alt={s.name} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT LIVE PREVIEW HŨ NẾN VỚI NHÃN IN */}
        <div className="flex flex-col justify-between rounded-[40px] bg-white p-8 shadow-xl ring-1 ring-leaf/10">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-leaf">
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-4 text-flame" /> Bản xem trước thời gian thực
              </span>
              <span>Hũ thuỷ tinh cao cấp</span>
            </div>

            {/* KHUNG PREVIEW NẾN VỚI TEM IN */}
            <div className="relative mx-auto mt-6 aspect-[4/5] max-w-[340px] rounded-3xl bg-cream flex flex-col items-center justify-center p-6 border border-leaf/15 overflow-hidden">
              <div
                className="absolute inset-0 opacity-40"
                style={{ background: `radial-gradient(circle at 50% 60%, ${selectedProduct.wax}, #fbf4e1 75%)` }}
              />

              {/* Ngọn lửa */}
              <div className="relative z-10 -mb-2 flex flex-col items-center animate-flicker">
                <div className="size-6 rounded-full bg-flame/70 blur-xs" />
                <div className="size-10 rounded-full bg-flame-dark/80 -mt-5" />
                <div className="h-4 w-1 bg-ink -mt-1 rounded-full" />
              </div>

              {/* Hũ nến và nhãn */}
              <div className="relative z-10 w-4/5 rounded-3xl border-2 border-leaf/20 bg-white/90 p-5 shadow-2xl backdrop-blur-xs flex flex-col items-center text-center">
                {/* Logo & Sticker */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-6 relative overflow-hidden rounded-full ring-1 ring-leaf/20">
                    <Image src={selectedSticker.src} alt="" fill className="object-cover" />
                  </div>
                  <span className="text-xs font-extrabold tracking-widest text-leaf">LUVIA</span>
                </div>

                {/* Nhãn custom do khách gõ */}
                <div
                  className="w-full rounded-2xl p-4 border transition-all"
                  style={{
                    backgroundColor: labelColor.bg,
                    borderColor: `${labelColor.color}40`,
                    color: labelColor.color,
                  }}
                >
                  <p className="font-hand text-xl font-bold leading-tight">
                    {labelTitle || "Tên Người Nhận"}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed opacity-85">
                    {labelSub || "Lời chúc yêu thương..."}
                  </p>
                  <div className="mt-3 border-t border-current/20 pt-2 text-[10px] uppercase font-bold tracking-wider">
                    {selectedProduct.name} · {wick === "wood" ? "Bấc Gỗ Sồi" : "Bấc Cotton"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-ink-soft">
              <p>Mùi hương nền: <b className="text-ink">{selectedProduct.name}</b></p>
              <p className="mt-1">Dung tích: <b className="text-ink">{SIZES.find((s) => s.id === size)?.label}</b></p>
            </div>
          </div>

          <div className="mt-8 border-t border-leaf/10 pt-6">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-sm text-ink-soft">Tổng cộng (Đã gồm nhãn in):</span>
              <span className="text-2xl font-black text-leaf-dark">{formatVND(totalPrice)}</span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full rounded-full py-4 font-bold text-white shadow-lg transition active:scale-95 flex items-center justify-center gap-2 ${
                added ? "bg-leaf-dark" : "bg-leaf shadow-leaf/25 hover:bg-leaf-dark"
              }`}
            >
              {added ? (
                <>
                  <Check className="size-5" /> Đã thêm hũ nến độc bản vào giỏ!
                </>
              ) : (
                <>
                  <Gift className="size-5" /> Thêm vào giỏ hàng ngay
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
