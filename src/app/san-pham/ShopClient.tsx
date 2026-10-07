"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { AskLuviaButton } from "@/components/ui";
import { FAMILIES, MOODS, getAllProducts, type Mood, type ScentFamily } from "@/lib/products";

type Sort = "popular" | "price-asc" | "price-desc" | "rating";

export default function ShopClient({
  initialMood,
  initialFamily,
}: {
  initialMood: Mood | null;
  initialFamily: ScentFamily | null;
}) {
  const [mood, setMood] = useState<Mood | null>(initialMood);
  const [family, setFamily] = useState<ScentFamily | null>(initialFamily);
  const [maxPrice, setMaxPrice] = useState(250000);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(getAllProducts());

  useEffect(() => {
    setProducts(getAllProducts());
    const onUpdate = () => setProducts(getAllProducts());
    window.addEventListener("luvia:products-updated", onUpdate);
    return () => window.removeEventListener("luvia:products-updated", onUpdate);
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const r = products.filter(
      (p) =>
        (!mood || p.moods.includes(mood)) &&
        (!family || p.families.includes(family)) &&
        p.price <= maxPrice &&
        (!q || `${p.name} ${p.tagline} ${p.notes.top} ${p.notes.heart} ${p.notes.base}`.toLowerCase().includes(q)),
    );
    const sorters: Record<Sort, (a: (typeof r)[0], b: (typeof r)[0]) => number> = {
      popular: (a, b) => b.reviews - a.reviews,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...r].sort(sorters[sort]);
  }, [mood, family, maxPrice, query, sort]);

  const activeCount = (mood ? 1 : 0) + (family ? 1 : 0) + (maxPrice < 250000 ? 1 : 0);
  const reset = () => {
    setMood(null);
    setFamily(null);
    setMaxPrice(250000);
    setQuery("");
  };

  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
      active ? "bg-leaf text-white" : "bg-white text-ink-soft ring-1 ring-leaf/15 hover:ring-leaf/50"
    }`;

  const filters = (
    <div className="space-y-7">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-leaf">Tâm trạng</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(MOODS) as Mood[]).map((m) => (
            <button key={m} onClick={() => setMood(mood === m ? null : m)} className={chip(mood === m)}>
              {MOODS[m].emoji} {MOODS[m].label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-leaf">Nhóm hương</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(FAMILIES) as ScentFamily[]).map((f) => (
            <button key={f} onClick={() => setFamily(family === f ? null : f)} className={chip(family === f)}>
              {FAMILIES[f]}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-leaf">Giá tối đa (Classic 200g)</h3>
        <input
          type="range"
          min={180000}
          max={250000}
          step={10000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-leaf"
          aria-label="Giá tối đa"
        />
        <p className="mt-1 text-sm text-ink-soft">
          Đến <b className="text-ink">{new Intl.NumberFormat("vi-VN").format(maxPrice)}₫</b>
        </p>
      </div>
      {activeCount > 0 && (
        <button onClick={reset} className="flex items-center gap-1 text-sm font-semibold text-flame-dark hover:underline">
          <X className="size-4" /> Xoá bộ lọc
        </button>
      )}
      <div className="rounded-3xl bg-leaf-soft p-5">
        <p className="font-hand text-xl text-leaf-dark">Phân vân quá?</p>
        <p className="mt-1 text-sm text-ink-soft">Kể Luvia nghe bạn thích gì, Luvia chọn giúp nhé.</p>
        <AskLuviaButton className="mt-4 w-full py-2.5 text-sm" prompt="Mình đang xem cửa hàng mà phân vân quá, bạn tư vấn giúp mình với." />
      </div>
    </div>
  );

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-32">{filters}</div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative min-w-0 flex-1 basis-60">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc nốt hương (vd: bưởi, vani)…"
              className="w-full rounded-full bg-white py-3 pl-11 pr-4 text-sm outline-none ring-1 ring-leaf/15 focus:ring-2 focus:ring-leaf/50"
            />
          </label>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold ring-1 ring-leaf/15 lg:hidden"
          >
            <SlidersHorizontal className="size-4" /> Bộ lọc {activeCount > 0 && `(${activeCount})`}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full bg-white px-4 py-3 text-sm font-medium outline-none ring-1 ring-leaf/15"
            aria-label="Sắp xếp"
          >
            <option value="popular">Phổ biến nhất</option>
            <option value="rating">Đánh giá cao</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </select>
        </div>

        {showFilters && <div className="mt-5 rounded-3xl bg-cream-light p-5 ring-1 ring-leaf/10 lg:hidden">{filters}</div>}

        <p className="mt-6 text-sm text-ink-soft">{list.length} sản phẩm</p>

        {list.length ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[28px] bg-white p-12 text-center ring-1 ring-leaf/10">
            <p className="font-hand text-2xl text-leaf">Chưa có mùi nào khớp 🥲</p>
            <p className="mt-2 text-ink-soft">Thử bỏ bớt bộ lọc hoặc hỏi Luvia nhé.</p>
            <button onClick={reset} className="mt-5 rounded-full bg-leaf px-6 py-2.5 font-semibold text-white">
              Xoá bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
