import type { Metadata } from "next";
import AskLumiLink from "@/components/AskLumiLink";
import SeasonCard from "@/components/SeasonCard";
import { SEASONS } from "@/lib/catalog";
import { COLLECTION } from "@/content/vi";

export const metadata: Metadata = { title: COLLECTION.title };

export default function ShopPage() {
  return (
    <div className="w-full px-margin-mobile py-space-xl sm:px-margin">
      <div className="mx-auto flex max-w-7xl flex-col gap-space-xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-space-sm text-center">
          <span className="text-label-md font-bold uppercase tracking-widest text-primary">
            {COLLECTION.eyebrow}
          </span>
          <h1 className="text-headline-lg-mobile text-on-surface sm:text-headline-lg">{COLLECTION.title}</h1>
          <p className="text-body-md text-on-surface-variant">{COLLECTION.lead}</p>
          <AskLumiLink
            label={COLLECTION.askLumi}
            prompt="Mình đang xem bộ sưu tập bốn mùa mà phân vân quá, bạn tư vấn giúp mình với."
          />
        </div>

        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
          {SEASONS.map((season) => (
            <SeasonCard key={season.id} season={season} />
          ))}
        </div>
      </div>
    </div>
  );
}
