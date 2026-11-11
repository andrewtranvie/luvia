"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Check, Heart, Minus, Plus, ShoppingBag, Sparkles, Truck } from "lucide-react";
import ProductGallery from "./ProductGallery";
import { GIFT_WRAP_BOX_ID, SEASONS, VARIANTS, formatDays, formatVND, getBox, getVariant, type Season } from "@/lib/catalog";
import { MAX_QTY, unitPrice, type LineConfig } from "@/lib/pricing";
import { useShopCart } from "@/lib/shop-cart";
import { openChat } from "@/lib/chat";
import { useTheme } from "@/lib/themeContext";
import { CARD_MESSAGE, SHIPPING_ZONES, SITE } from "@/lib/site";
import { DEMO_PRODUCT, DEMO_RATING, DEMO_REVIEW_COUNT, demoOriginalPrice, demoStock } from "@/content/demo-san-pham";
import { COLLECTION, LUMI, PRODUCT_PAGE, SEASON_COPY, STOCK_STATUS, fill } from "@/content/vi";

const SHARE = [
  { id: "messenger", color: "#0A7CFF", letter: "M", url: (u: string) => `fb-messenger://share?link=${u}` },
  { id: "facebook", color: "#1877F2", letter: "f", url: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { id: "pinterest", color: "#E60023", letter: "P", url: (u: string) => `https://pinterest.com/pin/create/button/?url=${u}` },
  { id: "zalo", color: "#0068FF", letter: "Z", url: (u: string) => `https://sp.zalo.me/plugins/share?url=${u}` },
] as const;

const shipFees = Object.values(SHIPPING_ZONES).map((z) => z.fee);
const shipDays = Object.values(SHIPPING_ZONES).flatMap((z) => z.transitDays);

export default function ProductDetailClient({ season }: { season: Season }) {
  const cart = useShopCart();
  const router = useRouter();
  const { is3D } = useTheme();

  const variants = useMemo(() => VARIANTS.filter((v) => season.variants.includes(v.id)), [season.variants]);
  // Mặc định chọn quy cách đầu tiên còn hàng, để trang không mở ra đã báo hết hàng
  const defaultVariant = useMemo(
    () => (variants.find((v) => demoStock(season.id, v.id) > 0) ?? variants[0]).id,
    [variants, season.id],
  );

  const [variantId, setVariantId] = useState(defaultVariant);
  const [qtyInput, setQtyInput] = useState(1);
  const [gift, setGift] = useState(false);
  const [message, setMessage] = useState("");
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const copy = SEASON_COPY[season.id];
  const variant = getVariant(variantId);
  const giftBox = getBox(GIFT_WRAP_BOX_ID)!;
  const stock = demoStock(season.id, variantId);
  const maxQty = Math.min(MAX_QTY, stock);
  const soldOut = season.status === "unavailable" || stock === 0;

  // Kẹp ngay khi dựng hình: khách đổi sang quy cách ít hàng hơn thì số lượng tụt theo,
  // không cần effect chỉnh lại state sau đó.
  const qty = Math.min(Math.max(1, qtyInput), Math.max(1, maxQty));

  const config: LineConfig = {
    kind: "season",
    seasonId: season.id,
    variantId,
    ...(gift ? { giftWrap: true as const, ...(message.trim() ? { cardMessage: message } : {}) } : {}),
  };
  const unit = unitPrice(config)?.unit ?? 0;
  const listPrice = season.price + (variant?.priceDelta ?? 0);

  const handleAdd = () => {
    cart.add(config, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };
  const handleBuyNow = () => {
    cart.buyNow(config, qty);
    router.push("/dat-hang?mode=buy-now");
  };

  const shareUrl = encodeURIComponent(`${SITE.url}/san-pham/${season.id}`);
  const prep = season.prepDays;
  const deliveryDays: [number, number] = [
    (prep?.[0] ?? 0) + Math.min(...shipDays),
    (prep?.[1] ?? 0) + Math.max(...shipDays),
  ];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[45fr_55fr]">
      <ProductGallery season={season} is3D={is3D} />

      <div className="flex flex-col">
        <span className="w-fit rounded-full bg-leaf-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-leaf-dark">
          {copy.mood}
        </span>

        <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">{season.fullName}</h1>
        <p className="mt-1 text-sm font-medium uppercase tracking-wider text-ink-soft">{copy.nameEn}</p>
        <p className="mt-3 text-base font-semibold italic text-leaf-dark">{copy.headline}</p>

        {/* Điểm sao, lượt đánh giá và lượt bán đều là số minh họa (demo-san-pham.ts) */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <strong className="text-ink underline">{DEMO_RATING}</strong>
            <span aria-hidden className="tracking-widest text-flame-dark">
              {"★".repeat(Math.round(DEMO_RATING)) + "☆".repeat(5 - Math.round(DEMO_RATING))}
            </span>
          </span>
          <a href="#danh-gia" className="hover:text-leaf">
            <strong className="text-ink">{DEMO_REVIEW_COUNT}</strong> {PRODUCT_PAGE.meta.reviews}
          </a>
          <span>
            {PRODUCT_PAGE.meta.sold} <strong className="text-ink">{DEMO_PRODUCT.soldCount}</strong>
          </span>
        </div>

        {/* Giá bán lấy từ catalog.ts; giá gạch ngang suy ra từ đó nên hai số luôn khớp nhau */}
        <div className={`mt-5 rounded-3xl bg-cream px-5 py-4 ${is3D ? "clay-inset" : ""}`}>
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-black text-leaf-dark">{formatVND(unit)}</span>
            <span className="text-sm text-ink-soft line-through">{formatVND(demoOriginalPrice(listPrice))}</span>
            <span className="rounded-md bg-leaf px-2 py-0.5 text-xs font-bold text-white">
              -{Math.round(DEMO_PRODUCT.discount * 100)}%
            </span>
          </div>
          {gift && (
            <p className="mt-1.5 text-xs text-ink-soft">
              {formatVND(listPrice)} + {formatVND(giftBox.surcharge)} {giftBox.name.toLowerCase()}
            </p>
          )}
        </div>

        {/* Thông số rút gọn — đầy đủ nằm ở tab "Mô tả sản phẩm" phía dưới */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {[
            { k: PRODUCT_PAGE.info.burnTime, v: variant?.burnTime },
            { k: PRODUCT_PAGE.info.netWeight, v: variant?.netWeight },
            { k: PRODUCT_PAGE.info.status, v: STOCK_STATUS[season.status] },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-white px-3 py-2.5 ring-1 ring-leaf/10">
              <div className="text-[11px] leading-tight text-ink-soft">{s.k}</div>
              <div className="mt-0.5 text-sm font-bold text-ink">{s.v ?? COLLECTION.labels.pending}</div>
            </div>
          ))}
        </div>

        <ul className="mt-3 flex flex-wrap gap-2">
          {PRODUCT_PAGE.badges.map((b) => (
            <li key={b} className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-semibold text-leaf-dark">
              {b}
            </li>
          ))}
        </ul>

        <Row label={PRODUCT_PAGE.shipping.label}>
          <p className="flex items-center gap-1.5 font-semibold text-leaf-dark">
            <Truck className="size-4" />
            {fill(PRODUCT_PAGE.shipping.time, { days: formatDays(deliveryDays) })}
          </p>
          <p className="text-ink-soft">
            {fill(PRODUCT_PAGE.shipping.fee, {
              min: formatVND(Math.min(...shipFees)),
              max: formatVND(Math.max(...shipFees)),
            })}
          </p>
          <p className="text-xs text-ink-soft">{PRODUCT_PAGE.shipping.note}</p>
        </Row>

        {/* Mỗi mùi là một trang riêng → nút mùi là liên kết, không phải nút chọn */}
        <Row label={PRODUCT_PAGE.scent.label}>
          <div className="flex flex-wrap gap-2">
            {SEASONS.map((s) => {
              const current = s.id === season.id;
              // Chỉ khoá khi cả mùi đó hết sạch mọi quy cách — hết đúng quy cách đang chọn
              // thì vẫn cho sang, vì trang mùi kia tự mở ở quy cách còn hàng.
              const out = s.status === "unavailable" || s.variants.every((v) => demoStock(s.id, v) === 0);
              const cls = `flex items-center gap-2 rounded-xl px-3 py-2 text-sm ring-1 transition ${
                current ? "bg-leaf-soft font-bold text-leaf-dark ring-leaf" : "bg-white text-ink ring-leaf/15"
              }`;
              const body = (
                <>
                  <span className="size-4 rounded-full ring-1 ring-black/10" style={{ backgroundColor: s.color.primary }} />
                  {SEASON_COPY[s.id].name}
                </>
              );
              if (current) return <span key={s.id} className={cls} aria-current="true">{body}</span>;
              if (out)
                return (
                  <span key={s.id} className={`${cls} cursor-not-allowed opacity-45`} aria-disabled="true">
                    {body}
                  </span>
                );
              return (
                <Link key={s.id} href={`/san-pham/${s.id}`} className={`${cls} hover:ring-leaf`}>
                  {body}
                </Link>
              );
            })}
          </div>
          <dl className={`mt-3 grid gap-3 rounded-2xl bg-cream-light p-3.5 sm:grid-cols-3 ${is3D ? "clay-inset" : "ring-1 ring-leaf/10"}`}>
            {[
              { k: PRODUCT_PAGE.scent.season, v: `${copy.season} – ${copy.nameEn}` },
              { k: PRODUCT_PAGE.scent.oil, v: season.essentialOils.join(", ") },
              { k: PRODUCT_PAGE.scent.feel, v: copy.mood },
            ].map((n) => (
              <div key={n.k}>
                <dt className="text-xs text-ink-soft">{n.k}</dt>
                <dd className="mt-0.5 font-semibold leading-snug text-ink">{n.v}</dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row label={PRODUCT_PAGE.variant}>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const out = demoStock(season.id, v.id) === 0;
              return (
                <button
                  key={v.id}
                  type="button"
                  disabled={out}
                  onClick={() => setVariantId(v.id)}
                  aria-pressed={variantId === v.id}
                  className={`rounded-xl px-3.5 py-2 text-sm ring-1 transition disabled:cursor-not-allowed disabled:opacity-45 ${
                    variantId === v.id ? "bg-leaf-soft font-bold text-leaf-dark ring-leaf" : "bg-white text-ink ring-leaf/15 hover:ring-leaf"
                  }`}
                >
                  {v.netWeight ?? COLLECTION.labels.pending}
                  {out && <span className="ml-1.5 text-xs">· {PRODUCT_PAGE.stock.soldOut}</span>}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">{variant?.spaceNote}</p>
        </Row>

        <Row label={PRODUCT_PAGE.gift.label}>
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={gift}
              onChange={(e) => setGift(e.target.checked)}
              className="mt-0.5 size-4 accent-leaf"
            />
            <span className="text-ink">
              {fill(PRODUCT_PAGE.gift.checkbox, { box: giftBox.name.toLowerCase(), price: formatVND(giftBox.surcharge) })}
            </span>
          </label>
          {gift && CARD_MESSAGE.enabled && (
            <div className="mt-2.5">
              <textarea
                value={message}
                maxLength={CARD_MESSAGE.maxLength}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={fill(PRODUCT_PAGE.gift.placeholder, { max: CARD_MESSAGE.maxLength })}
                className="min-h-[70px] w-full resize-y rounded-2xl bg-white p-3 text-sm text-ink ring-1 ring-leaf/15 outline-none focus:ring-leaf"
              />
              <div className="text-right text-xs text-ink-soft">
                {message.length}/{CARD_MESSAGE.maxLength}
              </div>
            </div>
          )}
        </Row>

        <Row label={PRODUCT_PAGE.quantity}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-11 w-32 items-center justify-between rounded-full bg-white px-3 ring-1 ring-leaf/15">
              <button
                type="button"
                disabled={qty <= 1}
                onClick={() => setQtyInput(Math.max(1, qty - 1))}
                className="grid size-8 place-items-center rounded-full text-ink hover:bg-cream disabled:opacity-30"
                aria-label={PRODUCT_PAGE.stock.decrease}
              >
                <Minus className="size-4" />
              </button>
              <span className="font-bold text-ink" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                disabled={qty >= maxQty}
                onClick={() => setQtyInput(Math.min(maxQty, qty + 1))}
                className="grid size-8 place-items-center rounded-full text-ink hover:bg-cream disabled:opacity-30"
                aria-label={PRODUCT_PAGE.stock.increase}
              >
                <Plus className="size-4" />
              </button>
            </div>
            {/* Số tồn kho là số minh họa (demo-san-pham.ts) */}
            <span className="text-xs text-ink-soft">
              {stock ? fill(PRODUCT_PAGE.stock.available, { n: stock }) : PRODUCT_PAGE.stock.soldOut}
            </span>
          </div>
        </Row>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleAdd}
            disabled={soldOut}
            className={`flex h-13 flex-1 items-center justify-center gap-2 py-3.5 font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
              is3D ? "clay-btn" : "rounded-full bg-white text-leaf-dark ring-1 ring-leaf hover:bg-leaf-soft active:scale-95"
            }`}
          >
            {added ? <Check className="size-5" /> : <ShoppingBag className="size-5" />}
            {added ? PRODUCT_PAGE.added : PRODUCT_PAGE.addToCart}
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={soldOut}
            className={`flex flex-1 flex-col items-center justify-center py-2.5 font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
              is3D ? "clay-btn-leaf" : "rounded-full bg-leaf shadow-lg shadow-leaf/25 hover:bg-leaf-dark active:scale-95"
            }`}
          >
            {PRODUCT_PAGE.buyNow}
            <small className="text-xs font-medium opacity-90">{formatVND(unit * qty)}</small>
          </button>
        </div>

        {added && (
          <Link href="/gio-hang" className="mt-3 text-center text-sm font-semibold text-flame-dark hover:underline">
            {PRODUCT_PAGE.viewCart} →
          </Link>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-leaf/10 pt-4 text-sm">
          <div className="flex items-center gap-2 text-ink-soft">
            {PRODUCT_PAGE.share.label}
            {SHARE.map((s) => (
              <a
                key={s.id}
                href={s.url(shareUrl)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={PRODUCT_PAGE.share[s.id]}
                className="grid size-7 place-items-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: s.color }}
              >
                {s.letter}
              </a>
            ))}
          </div>
          {/* Lượt thích chỉ lưu trong phiên xem, chưa nối với tài khoản hay máy chủ */}
          <button
            type="button"
            onClick={() => setLiked((l) => !l)}
            aria-pressed={liked}
            className="flex items-center gap-2 font-semibold text-ink hover:text-flame-dark"
          >
            <Heart className={`size-5 ${liked ? "fill-flame-dark text-flame-dark" : ""}`} />
            {liked ? PRODUCT_PAGE.like.done : PRODUCT_PAGE.like.idle} ({DEMO_PRODUCT.likes + (liked ? 1 : 0)})
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center rounded-2xl bg-cream p-4 text-xs text-ink-soft">
          <button
            type="button"
            onClick={() =>
              openChat({
                prompt: `Mùi ${copy.name} này hợp với ai và không gian nào?`,
                context: { page: "product", seasonId: season.id },
              })
            }
            className="flex items-center gap-1 font-bold text-flame-dark hover:underline"
          >
            <Sparkles className="size-3.5" /> {LUMI.askAboutProduct}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Một hàng "nhãn — nội dung" của khối mua hàng */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 grid gap-1.5 border-t border-leaf/10 pt-4 text-sm sm:grid-cols-[108px_1fr] sm:gap-3">
      <div className="pt-0.5 text-ink-soft">{label}</div>
      <div>{children}</div>
    </div>
  );
}
