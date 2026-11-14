"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import CandleArt from "@/components/CandleArt";
import { getSeason } from "@/lib/catalog";
import { MAX_QTY, describeLine, formatVND, unitPrice } from "@/lib/pricing";
import { useShopCart } from "@/lib/shop-cart";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import { useTheme } from "@/lib/themeContext";
import { CART, CHECKOUT, SEASON_COPY, fill } from "@/content/vi";

/** Màu sáp/nhãn để vẽ minh hoạ: lấy theo mùa của dòng hàng, không có thì dùng màu kem mặc định */
const look = (seasonId: string | null, title: string, key: string) => {
  const season = seasonId ? getSeason(seasonId) : undefined;
  return {
    slug: key,
    name: season ? SEASON_COPY[season.id].name : title,
    wax: season?.color.wax ?? "#F6EFDC",
    accent: season?.color.primary ?? "#8DB560",
  };
};

export default function CartPage() {
  const cart = useShopCart();
  const { is3D } = useTheme();

  const panel = `rounded-3xl bg-white p-6 sm:p-8 ${is3D ? "clay-card" : "shadow-sm ring-1 ring-leaf/10"}`;

  if (!cart.ready) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className={`${panel} h-48 animate-pulse`} />
      </div>
    );
  }

  if (!cart.lines.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className={panel}>
          <ShoppingBag className="mx-auto size-10 text-leaf" />
          <p className="mt-5 font-hand text-2xl text-leaf-dark">{CART.empty}</p>
          <Link
            href={CART.emptyCta.href}
            className={`mt-7 inline-flex items-center gap-2 px-6 py-3 font-bold text-white transition ${
              is3D ? "clay-btn-leaf" : "rounded-full bg-leaf hover:bg-leaf-dark"
            }`}
          >
            {CART.emptyCta.label}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/san-pham" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-leaf">
        <ArrowLeft className="size-4" /> {CART.continue}
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">{CART.title}</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        {/* Danh sách dòng hàng */}
        <ul className="space-y-4">
          {cart.lines.map((line) => {
            const info = describeLine(line.config);
            const unit = unitPrice(line.config)?.unit ?? 0;
            const editHref = info.seasonId ? `/san-pham/${info.seasonId}` : null;

            return (
              <li key={line.id} className={panel}>
                <div className="flex gap-4">
                  <div className="size-24 shrink-0 overflow-hidden rounded-2xl bg-cream">
                    <CandleArt product={look(info.seasonId, info.title, line.id)} className="h-full w-auto" lit={false} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="truncate font-bold text-ink">{info.title}</h2>
                        {info.isPreorder && (
                          <span className="mt-1 inline-block rounded-full bg-flame-soft px-2 py-0.5 text-[11px] font-bold text-flame-dark">
                            {CHECKOUT.preorderNote}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.remove(line.id)}
                        className="shrink-0 rounded-full p-1.5 text-ink-soft transition hover:bg-cream hover:text-flame-dark"
                        aria-label={`${CART.actions.remove}: ${info.title}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <dl className="mt-2 space-y-0.5 text-xs text-ink-soft">
                      <div className="flex gap-1.5">
                        <dt>{CART.columns.variant}:</dt>
                        <dd className="font-medium text-ink">{info.netWeight ?? info.variant}</dd>
                      </div>
                      {info.box && (
                        <div className="flex gap-1.5">
                          <dt>{CART.columns.box}:</dt>
                          <dd className="font-medium text-ink">{info.box}</dd>
                        </div>
                      )}
                      {info.message && (
                        <div className="flex gap-1.5">
                          <dt>{CART.columns.message}:</dt>
                          <dd className="font-medium text-ink italic">&quot;{info.message}&quot;</dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center rounded-full bg-cream ring-1 ring-leaf/15">
                        <button
                          type="button"
                          onClick={() => cart.setQty(line.id, line.qty - 1)}
                          className="grid size-9 place-items-center rounded-full text-ink hover:bg-cream-dark"
                          aria-label="Giảm số lượng"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-ink" aria-live="polite">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => cart.setQty(line.id, Math.min(MAX_QTY, line.qty + 1))}
                          className="grid size-9 place-items-center rounded-full text-ink hover:bg-cream-dark"
                          aria-label="Tăng số lượng"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-ink-soft">
                          {CART.columns.unitPrice}: {formatVND(unit)}
                        </p>
                        <p className="font-extrabold text-leaf-dark">{formatVND(unit * line.qty)}</p>
                      </div>
                    </div>

                    {editHref && (
                      <Link href={editHref} className="mt-3 inline-block text-xs font-semibold text-leaf hover:underline">
                        {CART.actions.edit}
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Tạm tính */}
        <aside className={`${panel} lg:sticky lg:top-28`}>
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-ink">{CART.subtotal}</span>
            <span className="text-2xl font-extrabold text-leaf-dark">{formatVND(cart.subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-ink-soft">{CART.shippingNote}</p>

          {/* Mốc miễn phí giao hàng — thanh tiến trình để khách thấy còn thiếu bao nhiêu */}
          {cart.subtotal >= FREE_SHIPPING_THRESHOLD ? (
            <p className="mt-4 flex items-center gap-2 rounded-2xl bg-leaf-soft px-3.5 py-2.5 text-xs font-bold text-leaf-dark">
              <Truck className="size-4 shrink-0" /> {CART.freeShippingReached}
            </p>
          ) : (
            <div className="mt-4 rounded-2xl bg-cream px-3.5 py-2.5">
              <p className="flex items-start gap-2 text-xs text-ink-soft">
                <Truck className="mt-0.5 size-4 shrink-0 text-leaf" />
                <span className="text-pretty">
                  {fill(CART.freeShippingProgress, {
                    amount: formatVND(FREE_SHIPPING_THRESHOLD - cart.subtotal),
                  })}
                </span>
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-leaf/15">
                <div
                  className="h-full rounded-full bg-leaf transition-[width] duration-300"
                  style={{ width: `${Math.round((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          )}

          <Link
            href="/dat-hang"
            className={`mt-6 flex items-center justify-center gap-2 py-3.5 font-bold text-white transition ${
              is3D ? "clay-btn-leaf" : "rounded-full bg-leaf shadow-lg shadow-leaf/25 hover:bg-leaf-dark"
            }`}
          >
            <ShoppingBag className="size-4" /> {CART.checkout}
          </Link>
          <Link
            href="/san-pham"
            className="mt-3 block text-center text-sm font-semibold text-ink-soft hover:text-leaf"
          >
            {CART.continue}
          </Link>
        </aside>
      </div>
    </div>
  );
}
