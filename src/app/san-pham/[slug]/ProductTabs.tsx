"use client";

import { useEffect, useRef, useState } from "react";
import { VARIANTS, type Season } from "@/lib/catalog";
import { DEMO_PRODUCT, DEMO_RATING, DEMO_REVIEW_COUNT } from "@/content/demo-san-pham";
import { CANDLE_CARE, CANDLE_STORAGE, COLLECTION, PRODUCT_PAGE, SEASON_COPY, fill } from "@/content/vi";

const TABS = ["desc", "care", "reviews"] as const;
type Tab = (typeof TABS)[number];

const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

export default function ProductTabs({ season }: { season: Season }) {
  const [tab, setTab] = useState<Tab>("desc");
  const tablist = useRef<HTMLDivElement>(null);

  // Màn hẹp không đủ chỗ cho cả ba tab nên dải tab cuộn ngang được. Tab mở bằng
  // code (không phải do người dùng bấm) có thể đang nằm khuất ngoài mép, nội dung
  // đổi mà dải tab vẫn đứng yên nên không biết mình đang ở tab nào.
  // Tự tính scrollLeft chứ không dùng scrollIntoView: hàm đó kéo cả trang theo chiều
  // dọc, đá nhau với cú cuộn tới #danh-gia đang chạy cùng lúc. scrollBy chỉ động vào
  // dải tab. Không truyền behavior để lấy theo scroll-smooth của CSS — nhờ vậy ai tắt
  // hiệu ứng trong cài đặt máy thì quy tắc prefers-reduced-motion tự ngắt luôn.
  const keoTabVaoKhung = (t: Tab) => {
    const list = tablist.current;
    const btn = list?.querySelector<HTMLElement>(`[data-tab="${t}"]`);
    if (!list || !btn) return;
    const lr = list.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    list.scrollBy({ left: br.left - lr.left - (lr.width - br.width) / 2 });
  };

  // Link "{số} đánh giá" ở đầu trang trỏ tới #danh-gia. Trước đây nó cuộn đúng chỗ
  // nhưng vẫn để tab "Mô tả sản phẩm" mở, người bấm không thấy đánh giá đâu.
  // Bắt cả hai đường: mở thẳng bằng link dán (lúc mount) và bấm khi đã ở trong trang
  // (hashchange — đổi hash giống nhau thì React không render lại).
  useEffect(() => {
    const moTabDanhGia = () => {
      if (window.location.hash !== "#danh-gia") return;
      setTab("reviews");
      keoTabVaoKhung("reviews");
    };
    moTabDanhGia();
    window.addEventListener("hashchange", moTabDanhGia);
    return () => window.removeEventListener("hashchange", moTabDanhGia);
  }, []);

  // Chuẩn WAI-ARIA: đi giữa các tab bằng ←/→, Home/End
  const onKey = (e: React.KeyboardEvent) => {
    const i = TABS.indexOf((document.activeElement as HTMLElement)?.dataset?.tab as Tab);
    if (i < 0) return;
    const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: TABS.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const next = TABS[(to + TABS.length) % TABS.length];
    setTab(next);
    tablist.current?.querySelector<HTMLElement>(`[data-tab="${next}"]`)?.focus();
  };

  return (
    <section id="danh-gia" className="mt-16 overflow-hidden rounded-3xl bg-white ring-1 ring-leaf/10">
      <div ref={tablist} role="tablist" aria-label={PRODUCT_PAGE.info.highlights} onKeyDown={onKey} className="flex overflow-x-auto scroll-smooth border-b border-leaf/10">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            data-tab={t}
            id={`tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`panel-${t}`}
            tabIndex={tab === t ? 0 : -1}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap border-b-2 px-6 py-4 text-sm transition ${
              tab === t ? "border-leaf font-bold text-ink" : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {PRODUCT_PAGE.tabs[t]}
            {t === "reviews" && ` (${DEMO_REVIEW_COUNT})`}
          </button>
        ))}
      </div>

      <Panel id="desc" active={tab}>
        <Description season={season} />
      </Panel>
      <Panel id="care" active={tab}>
        <Care />
      </Panel>
      <Panel id="reviews" active={tab}>
        <Reviews />
      </Panel>
    </section>
  );
}

function Panel({ id, active, children }: { id: Tab; active: Tab; children: React.ReactNode }) {
  return (
    <div role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} tabIndex={0} hidden={active !== id} className="max-w-3xl p-6 sm:p-8">
      {children}
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 text-base font-bold text-ink first:mt-0">{children}</h3>;
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {items.map((x) => (
        <li key={x} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
          <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-leaf" />
          {x}
        </li>
      ))}
    </ul>
  );
}

function Description({ season }: { season: Season }) {
  const copy = SEASON_COPY[season.id];
  return (
    <>
      <h2 className="font-serif text-2xl font-bold text-ink">{copy.headline}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{copy.description}</p>
      <p className="mt-2 text-sm leading-relaxed text-leaf-dark">{copy.suggestion}</p>

      <Heading>{PRODUCT_PAGE.info.highlights}</Heading>
      <Bullets items={season.highlights} />

      <Heading>{PRODUCT_PAGE.info.ingredients}</Heading>
      <Bullets items={season.ingredients} />

      <Heading>{PRODUCT_PAGE.variant}</Heading>
      <table className="mt-2 w-full text-left text-sm">
        <thead>
          <tr className="text-xs text-ink-soft">
            <th className="py-1.5 pr-4 font-medium">{PRODUCT_PAGE.info.netWeight}</th>
            <th className="py-1.5 pr-4 font-medium">{PRODUCT_PAGE.info.burnTime}</th>
            <th className="py-1.5 font-medium">{PRODUCT_PAGE.info.spaceNote}</th>
          </tr>
        </thead>
        <tbody>
          {VARIANTS.filter((v) => season.variants.includes(v.id)).map((v) => (
            <tr key={v.id} className="border-t border-leaf/10 align-top">
              <td className="py-2 pr-4 font-bold text-ink">{v.netWeight ?? COLLECTION.labels.pending}</td>
              <td className="py-2 pr-4 text-ink">{v.burnTime ?? COLLECTION.labels.pending}</td>
              <td className="py-2 leading-relaxed text-ink-soft">{v.spaceNote}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Heading>{PRODUCT_PAGE.info.storage}</Heading>
      <Bullets items={CANDLE_STORAGE} />
      <p className="mt-4 text-xs text-ink-soft">{CANDLE_CARE.expiry}</p>
    </>
  );
}

function Care() {
  return (
    <>
      <h2 className="font-serif text-2xl font-bold text-ink">{CANDLE_CARE.title}</h2>
      {CANDLE_CARE.groups.map((g) => (
        <div key={g.id}>
          <Heading>{g.title}</Heading>
          <Bullets items={g.items} />
        </div>
      ))}
      <Heading>{PRODUCT_PAGE.info.storage}</Heading>
      <Bullets items={CANDLE_STORAGE} />
      <p className="mt-4 text-xs text-ink-soft">{CANDLE_CARE.expiry}</p>
    </>
  );
}

/** ⚠️ Toàn bộ đánh giá dưới đây là dữ liệu minh họa (demo-san-pham.ts) */
function Reviews() {
  const [star, setStar] = useState(0);
  const [scent, setScent] = useState<string>("all");
  const c = PRODUCT_PAGE.reviewsBlock;

  const list = DEMO_PRODUCT.reviews.filter(
    (r) => (!star || r.stars === star) && (scent === "all" || r.seasonId === scent),
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-6 rounded-2xl bg-cream px-5 py-4">
        <div>
          <div className="text-4xl font-black leading-none text-leaf-dark">{DEMO_RATING}</div>
          <div aria-hidden className="mt-1 tracking-widest text-flame-dark">
            {stars(Math.round(DEMO_RATING))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Chips
            value={star}
            onChange={setStar}
            options={[
              { id: 0, label: `${c.allStars} (${DEMO_PRODUCT.reviews.length})` },
              ...[5, 4, 3, 2, 1].map((s) => ({
                id: s,
                label: `${s} ${c.starSuffix} (${DEMO_PRODUCT.reviews.filter((r) => r.stars === s).length})`,
              })),
            ]}
          />
          <Chips
            value={scent}
            onChange={setScent}
            options={[
              { id: "all", label: c.allScents },
              ...DEMO_PRODUCT.reviews
                .map((r) => r.seasonId)
                .filter((id, i, a) => a.indexOf(id) === i)
                .map((id) => ({ id, label: SEASON_COPY[id].name })),
            ]}
          />
        </div>
      </div>

      {list.length ? (
        list.map((r) => (
          <div key={`${r.name}-${r.date}`} className="flex gap-3 border-b border-leaf/10 py-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-leaf-soft font-bold text-leaf-dark">
              {r.name[0]}
            </div>
            <div>
              <div className="text-sm font-bold text-ink">{r.name}</div>
              <div className="text-xs text-ink-soft">
                <span aria-hidden className="tracking-widest text-flame-dark">
                  {stars(r.stars)}
                </span>
                <span className="sr-only">{fill(c.srStars, { n: r.stars })}</span> · {r.date} · {c.scentPrefix}:{" "}
                {SEASON_COPY[r.seasonId].name}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink">{r.text}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="py-6 text-sm text-ink-soft">{c.empty}</p>
      )}
    </>
  );
}

function Chips<T extends string | number>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={`rounded-full px-3 py-1 text-xs ring-1 transition ${
            value === o.id ? "bg-white font-bold text-leaf-dark ring-leaf" : "bg-white text-ink-soft ring-leaf/15 hover:ring-leaf/40"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
