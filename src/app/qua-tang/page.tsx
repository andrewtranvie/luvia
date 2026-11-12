import type { Metadata } from "next";
import Link from "next/link";
import AskLumiLink from "@/components/AskLumiLink";
import GiftScentFinder from "@/components/GiftScentFinder";
import Icon from "@/components/Icon";
import { GIFTS } from "@/content/vi";
import B2BForm from "./B2BForm";

export const metadata: Metadata = { title: GIFTS.page.title };

export default function GiftsPage() {
  return (
    <div className="w-full px-margin-mobile py-space-xl sm:px-margin">
      <div className="mx-auto flex max-w-7xl flex-col gap-space-xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-space-sm text-center">
          <span className="text-label-md font-bold uppercase tracking-widest text-primary">{GIFTS.eyebrow}</span>
          <h1 className="text-headline-lg-mobile text-on-surface sm:text-headline-lg">{GIFTS.page.title}</h1>
          <p className="text-body-md text-on-surface-variant">{GIFTS.page.lead}</p>
        </div>

        <div className="grid gap-space-lg lg:grid-cols-2">
          {/* Quà tặng cá nhân */}
          <div className="flex flex-col justify-between rounded-clay-xl bg-surface-container-lowest p-space-lg clay-raise sm:p-space-xl">
            <div>
              <h2 className="text-headline-md text-on-surface">{GIFTS.title}</h2>
              <p className="mt-space-sm text-body-md text-on-surface-variant">{GIFTS.body}</p>
            </div>

            {/* Ô tả người nhận — đặt trên hàng nút vì đây là lối vào khách dùng nhiều nhất
                theo góp ý nhóm khách 2026-11-12. AskLumiLink bên dưới giữ lại làm lối tắt
                cho người không muốn gõ. */}
            <div className="mt-space-lg">
              <GiftScentFinder />
            </div>

            <div className="mt-space-lg flex flex-wrap items-center gap-space-md">
              <Link
                href={GIFTS.cta.href}
                className="rounded-full bg-primary-container px-space-lg py-space-sm text-label-md text-on-primary clay-press transition hover:bg-primary"
              >
                {GIFTS.cta.label}
              </Link>
              <AskLumiLink label={GIFTS.askLumi} prompt="Mình muốn chọn nến Luvia làm quà, bạn gợi ý giúp mình nhé." />
            </div>
          </div>

          {/* Hợp tác doanh nghiệp */}
          <div
            id={GIFTS.b2b.id}
            className="flex flex-col justify-between rounded-clay-xl bg-inverse-surface p-space-lg text-inverse-on-surface shadow-[0_16px_36px_-8px_rgba(40,52,28,0.3)] sm:p-space-xl"
          >
            <div>
              <span className="inline-flex items-center gap-space-xs rounded-full bg-white/10 px-space-sm py-1 text-label-sm font-bold">
                <Icon name="corporate_fare" className="text-[16px]" />
                {GIFTS.b2b.eyebrow}
              </span>
              <h2 className="mt-space-sm text-headline-md">{GIFTS.b2b.title}</h2>
              <p className="mt-space-sm text-body-md text-inverse-on-surface/80">{GIFTS.b2b.body}</p>
            </div>
          </div>
        </div>

        {/* Biểu mẫu nhu cầu hợp tác — đặt trên nền sáng để đọc được các trường nhập */}
        <div className="mx-auto w-full max-w-3xl rounded-clay-xl bg-surface-container-lowest p-space-lg clay-raise sm:p-space-xl">
          <h2 className="text-headline-sm text-on-surface">{GIFTS.b2b.cta}</h2>
          <div className="mt-space-md">
            <B2BForm />
          </div>
        </div>
      </div>
    </div>
  );
}
