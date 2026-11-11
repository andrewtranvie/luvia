"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Season } from "@/lib/catalog";
import { PRODUCT_PAGE, SEASON_COPY } from "@/content/vi";

const FOCUSABLE = 'button,[href],[tabindex]:not([tabindex="-1"])';

export default function ProductGallery({ season, is3D }: { season: Season; is3D: boolean }) {
  const [view, setView] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const lightbox = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const copy = SEASON_COPY[season.id];
  const g = PRODUCT_PAGE.gallery;
  const views = season.gallery;
  const step = useCallback((d: number) => setView((v) => (v + d + views.length) % views.length), [views.length]);

  // Mở: nhớ chỗ đang đứng rồi đưa focus vào nút đóng. Đóng: trả focus về chỗ cũ.
  useEffect(() => {
    if (zoomed) closeBtn.current?.focus();
    else opener.current?.focus();
  }, [zoomed]);

  useEffect(() => {
    if (!zoomed) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  const onDialogKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setZoomed(false);
    if (e.key === "ArrowLeft") return step(-1);
    if (e.key === "ArrowRight") return step(1);
    if (e.key !== "Tab") return;
    // Bẫy Tab: chỉ có nút đóng và hai mũi tên nên quay vòng trong hộp thoại
    const items = [...(lightbox.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])];
    if (!items.length) return;
    const edge = e.shiftKey ? items[0] : items[items.length - 1];
    if (document.activeElement === edge) {
      e.preventDefault();
      (e.shiftKey ? items[items.length - 1] : items[0]).focus();
    }
  };

  return (
    <div className="lg:sticky lg:top-28">
      {/* Khung vuông cố định cho mọi ảnh. Cả ba ảnh đều đã cắt sẵn về 1:1 nên lấp kín
          khung, không hở viền trắng và cũng không bị cắt mất chữ in trong ảnh. */}
      <button
        type="button"
        onClick={(e) => {
          opener.current = e.currentTarget;
          setZoomed(true);
        }}
        aria-label={g.zoom}
        className={`relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-[40px] bg-white ${
          is3D ? "clay-card" : "shadow-sm ring-1 ring-leaf/10"
        }`}
      >
        {/* Dải ảnh trượt ngang — đổi ảnh thì lướt sang chứ không thay đột ngột */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${view * 100}%)` }}
        >
          {views.map((v, i) => (
            <div key={v.src} className="relative h-full w-full shrink-0">
              <Image
                src={v.src}
                alt={`${season.fullName} — ${g.views[i] ?? ""}`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <span
          className={`absolute left-6 top-6 px-4 py-1.5 text-xs font-bold ${is3D ? "pebble-badge" : "rounded-full"}`}
          style={{ backgroundColor: season.color.soft, color: season.color.primary }}
        >
          {copy.season}
        </span>
      </button>

      <div className="mt-3 flex items-center gap-2">
        <Arrow label={g.prev} onClick={() => step(-1)}>
          <ChevronLeft className="size-4" />
        </Arrow>
        {/* Thumbnail cỡ cố định, căn giữa — thư viện chỉ vài ảnh nên grid giãn đều sẽ cho thumb cao quá khổ */}
        <div className="flex flex-1 justify-center gap-2">
          {views.map((v, i) => (
            <button
              key={v.src}
              type="button"
              onClick={() => setView(i)}
              onMouseEnter={() => setView(i)}
              aria-current={i === view}
              aria-label={g.views[i] ?? `${i + 1}`}
              className={`relative aspect-square w-20 overflow-hidden rounded-2xl bg-white ring-2 transition ${
                i === view ? "ring-leaf" : "ring-leaf/10 hover:ring-leaf/40"
              }`}
            >
              <Image
                src={v.src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
        <Arrow label={g.next} onClick={() => step(1)}>
          <ChevronRight className="size-4" />
        </Arrow>
      </div>

      <p className="mt-2 text-center text-xs text-ink-soft">{g.views[view]}</p>

      {/* Phải portal ra <body>: thẻ bọc ngoài có `lg:sticky` nên tạo stacking context riêng,
          giam z-50 của lightbox xuống dưới header (cũng z-50) → nút đóng bị header che. */}
      {zoomed && createPortal(
        <div
          ref={lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={g.lightbox}
          onKeyDown={onDialogKey}
          onClick={(e) => {
            if (e.target === e.currentTarget) setZoomed(false);
          }}
          className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-5"
        >
          <button
            ref={closeBtn}
            type="button"
            onClick={() => setZoomed(false)}
            aria-label={g.close}
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <X className="size-5" />
          </button>
          {/* Khung vuông giống hệt khung ngoài, không co giãn theo ảnh. Chặn theo `vh` để
              còn chỗ cho hai mũi tên bên dưới: 80vh + 48px mũi tên + 40px lề vẫn trong màn hình. */}
          <div className="relative aspect-square w-[min(80vh,90vw)] overflow-hidden rounded-3xl bg-white">
            <Image src={views[view].src} alt={`${season.fullName} — ${g.views[view] ?? ""}`} fill sizes="95vw" className="object-contain" />
          </div>
          <div className="mt-4 flex gap-3">
            <Arrow label={g.prev} onClick={() => step(-1)} dark>
              <ChevronLeft className="size-4" />
            </Arrow>
            <Arrow label={g.next} onClick={() => step(1)} dark>
              <ChevronRight className="size-4" />
            </Arrow>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}

function Arrow({
  label,
  onClick,
  dark,
  children,
}: {
  label: string;
  onClick: () => void;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid size-8 shrink-0 place-items-center rounded-full transition ${
        dark ? "bg-white/15 text-white hover:bg-white/25" : "bg-white text-ink-soft ring-1 ring-leaf/15 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
