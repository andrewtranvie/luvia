import type { Metadata } from "next";
import ShopClient from "./ShopClient";
import { MOODS, FAMILIES, type Mood, type ScentFamily } from "@/lib/products";

export const metadata: Metadata = { title: "Cửa hàng nến thơm" };

export default async function ShopPage({ searchParams }: PageProps<"/san-pham">) {
  const sp = await searchParams;
  const mood = typeof sp.mood === "string" && sp.mood in MOODS ? (sp.mood as Mood) : null;
  const family = typeof sp.family === "string" && sp.family in FAMILIES ? (sp.family as ScentFamily) : null;
  return (
    <>
      <section className="paper border-b border-leaf/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <span className="brush-tag text-lg">Cửa hàng</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Nến thơm Luvia</h1>
          <p className="mt-3 max-w-2xl text-ink-soft">
            9 mùi hương lấy cảm hứng từ thiên nhiên và ký ức Việt. Mỗi hũ được làm thủ công từ dầu ăn tái chế, sáp thực vật
            và bấc cotton.
          </p>
        </div>
      </section>
      <ShopClient key={`${mood}-${family}`} initialMood={mood} initialFamily={family} />
    </>
  );
}
