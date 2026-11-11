"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { VARIANTS, type Season } from "@/lib/catalog";
import { formatVND } from "@/lib/pricing";
import { SEASON_THEME } from "@/lib/season-theme";
import { useShopCart } from "@/lib/shop-cart";
import { COLLECTION, SEASON_COPY, STOCK_STATUS } from "@/content/vi";

/** Thẻ một mùa hương — dùng chung cho trang chủ và trang /san-pham. */
export default function SeasonCard({ season }: { season: Season }) {
  const shopCart = useShopCart();
  const [added, setAdded] = useState(false);

  const copy = SEASON_COPY[season.id];
  const theme = SEASON_THEME[season.id];
  const variantId = season.variants[0];
  const inStock = season.status === "in_stock";
  const soldOut = season.status === "unavailable";

  const seasonVariants = VARIANTS.filter((v) => season.variants.includes(v.id));
  const sizes = seasonVariants.map((v) => v.netWeight ?? COLLECTION.labels.pending).join(" · ");
  const fromPrice = season.price + Math.min(...seasonVariants.map((v) => v.priceDelta));
  const priceLabel = seasonVariants.length > 1 ? COLLECTION.labels.priceFrom : COLLECTION.labels.price;

  const handleAdd = () => {
    shopCart.add({ kind: "season", seasonId: season.id, variantId }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="group flex flex-col justify-between rounded-clay-lg bg-surface-container-lowest p-space-md transition-all duration-300 clay-raise hover:-translate-y-1.5">
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-space-sm py-1 text-label-sm font-bold uppercase shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6)] ${theme.chip}`}
          >
            {copy.season}
          </span>
          <span
            className={`flex items-center gap-1 rounded-full px-space-sm py-0.5 text-label-sm font-bold ${
              inStock
                ? "bg-surface-container-high text-primary"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            <span className={`size-1.5 rounded-full ${inStock ? "bg-primary" : "bg-outline"}`} />
            {STOCK_STATUS[season.status]}
          </span>
        </div>

        {/* Các min-h bên dưới giữ cho bốn thẻ cao bằng nhau: tên/mood/concept dài ngắn
            khác nhau, không chốt chiều cao thì ảnh và khối giá bị lệch hàng. */}
        <div>
          <h3 className="min-h-[56px] text-headline-sm text-on-surface">
            {copy.name} <span className="text-body-sm text-on-surface-variant">({copy.nameEn})</span>
          </h3>
          <p className={`min-h-[36px] text-label-md font-semibold ${theme.mood}`}>{copy.mood}</p>
          <p className="mt-0.5 min-h-[40px] text-body-sm italic text-on-surface-variant">{copy.concept}</p>
        </div>

        {/* Khung vuông, object-contain: poster khách gửi là ảnh 1:1 có logo và tên mùi
            hương in sẵn — cắt ngang kiểu cũ là mất chữ. Đừng đổi lại thành h-48. */}
        <div className="relative my-space-xs flex aspect-square w-full items-center justify-center overflow-hidden rounded-clay bg-surface-container-low">
          <div className={`absolute size-24 rounded-full blur-xl ${theme.glow}`} />
          <Image
            src={season.poster}
            alt={season.fullName}
            fill
            sizes="(max-width:640px) 100vw, 400px"
            quality={90}
            className="relative z-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col gap-space-sm rounded-clay bg-surface-container-low/70 p-space-sm">
          {/* Đặc điểm tách thành đoạn riêng, cao cố định 3 dòng (3 × 20px của text-body-sm).
              Trước đây nó là hàng "nhãn: giá trị" nên câu dài ngắn khác nhau đẩy hai hàng
              Trọng lượng / Giá từ xuống lệch nhau giữa bốn thẻ. */}
          <p className="min-h-[60px] text-body-sm text-on-surface">{season.highlights[0]}</p>
          <div className="flex flex-col gap-space-xs border-t border-outline-variant/50 pt-space-sm">
            <div className="flex items-baseline justify-between gap-space-sm text-body-sm">
              <span className="shrink-0 text-on-surface-variant">{COLLECTION.labels.sizes}</span>
              <span className="text-right font-semibold text-on-surface">{sizes}</span>
            </div>
            <div className="flex items-baseline justify-between gap-space-sm text-body-sm">
              <span className="shrink-0 text-on-surface-variant">{priceLabel}</span>
              <span className="text-right font-semibold text-on-surface">{formatVND(fromPrice)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-space-md flex flex-col gap-space-xs">
        <Link
          href={`/san-pham/${season.id}`}
          className={`inline-flex w-full items-center justify-center rounded-full py-space-sm text-label-md transition-all active:translate-y-0.5 ${theme.button}`}
        >
          {copy.cta}
        </Link>
        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          aria-label={`Thêm ${season.fullName} vào giỏ hàng`}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-surface-container-low py-space-sm text-label-md text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-surface-container-low"
        >
          <Icon name={added ? "check" : "add_shopping_cart"} className="text-[16px]" />
          {added ? COLLECTION.quickAdd.done : COLLECTION.quickAdd.idle}
        </button>
      </div>
    </div>
  );
}
