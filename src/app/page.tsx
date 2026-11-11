"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { HERO, SEASON_COPY, MASCOT_BANNER, STORY, FAQ } from "@/content/vi";
import { SEASONS } from "@/lib/catalog";
import { openChat } from "@/lib/chat";
import { SEASON_THEME } from "@/lib/season-theme";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<string | null>("faq-nguyen-lieu");

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative w-full overflow-hidden px-margin-mobile py-space-xl sm:px-margin">
        <div className="pointer-events-none absolute left-10 top-1/4 -z-10 size-96 rounded-full bg-secondary-container/15 blur-3xl" />
        <div className="pointer-events-none absolute right-20 top-10 -z-10 size-[480px] rounded-full bg-primary-container/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
          <div className="flex flex-col gap-space-md lg:col-span-6">
            <div className="inline-flex w-fit items-center gap-space-xs self-start rounded-full bg-surface-container-high px-space-md py-space-xs text-primary shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),0_2px_8px_rgba(46,58,34,0.05)]">
              <Icon name="spa" className="text-[16px] text-primary" fill />
              <span className="text-label-md font-bold uppercase tracking-wider text-on-surface">
                {HERO.eyebrow}
              </span>
            </div>

            <h1 className="text-headline-xl-mobile leading-tight tracking-tight text-on-surface sm:text-headline-xl">
              {HERO.title}
            </h1>

            <p className="max-w-xl text-body-lg text-on-surface-variant">{HERO.body}</p>

            <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
              <Link
                href={HERO.primary.href}
                className="inline-flex items-center justify-center rounded-full bg-primary-container px-space-lg py-space-md text-label-lg text-on-primary transition-all clay-press-lg hover:scale-[1.02] hover:bg-primary active:translate-y-0.5"
              >
                <Icon name="local_fire_department" className="mr-2 text-[20px]" />
                {HERO.primary.label}
              </Link>
              <Link
                href={HERO.secondary.href}
                className="inline-flex items-center justify-center rounded-full bg-surface-container-lowest px-space-lg py-space-md text-label-lg text-on-surface shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),0_6px_16px_rgba(46,58,34,0.06)] transition-all hover:scale-[1.02] hover:bg-surface-container active:translate-y-0.5"
              >
                <Icon name="tune" className="mr-2 text-[20px] text-secondary" />
                {HERO.secondary.label}
              </Link>
            </div>

            <div className="flex items-center gap-space-xs pt-space-xs">
              <button
                type="button"
                onClick={() => openChat()}
                className="group inline-flex items-center gap-space-xs text-label-md text-secondary transition-colors hover:text-on-secondary-container"
              >
                <Icon
                  name="light_mode"
                  className="text-[18px] text-secondary-container transition-transform group-hover:rotate-12"
                  fill
                />
                <span className="font-bold underline decoration-secondary-container underline-offset-4">
                  {HERO.askLumi} →
                </span>
              </button>
            </div>
          </div>

          {/* Khối 4 bệ mùa */}
          <div className="relative flex items-center justify-center lg:col-span-6">
            <div className="relative flex aspect-square w-full max-w-lg items-center justify-center p-space-md">
              <div className="absolute inset-4 rounded-clay-xl bg-surface-container-lowest/60 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.9),0_18px_40px_-10px_rgba(46,58,34,0.1)] backdrop-blur-md" />
              <div className="relative z-10 grid h-full w-full grid-cols-2 gap-space-md p-space-sm">
                {SEASONS.map((season) => {
                  const theme = SEASON_THEME[season.id];
                  const copy = SEASON_COPY[season.id];
                  return (
                    <Link
                      key={season.id}
                      href={`/san-pham/${season.id}`}
                      className="relative flex flex-col items-center justify-between rounded-clay-lg bg-surface-container/70 p-space-sm shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8),0_8px_16px_rgba(141,181,96,0.18)] transition-all duration-300 hover:-translate-y-1 sm:p-space-md"
                    >
                      <span
                        className={`self-start rounded-full px-space-sm py-0.5 text-[11px] font-bold uppercase tracking-wider ${theme.chip}`}
                      >
                        {copy.season}
                      </span>
                      <span className="relative my-auto flex size-20 items-center justify-center sm:size-28">
                        <span className={`absolute size-16 animate-pulse rounded-full blur-lg sm:size-20 ${theme.glow}`} />
                        {season.image && (
                          <Image
                            src={season.image}
                            alt={season.fullName}
                            fill
                            sizes="384px"
                            quality={90}
                            className="relative z-10 rounded-clay object-cover"
                          />
                        )}
                      </span>
                      <span className="flex w-full items-center justify-between pt-space-xs text-label-sm text-on-surface-variant">
                        <span className="truncate font-semibold">{copy.name}</span>
                        <span
                          className="size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: season.color.primary }}
                        />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- BĂNG CHUYỆN MASCOT LUMI ---------------- */}
      <section className="w-full px-margin-mobile py-space-lg sm:px-margin">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-clay-xl bg-surface-container p-space-lg shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),0_12px_24px_rgba(46,58,34,0.06)]">
          <div className="pointer-events-none absolute -bottom-10 -right-10 size-72 rounded-full bg-secondary-fixed/40 blur-3xl" />
          {/* Bỏ ảnh bên trái → khối chữ chiếm trọn bề ngang, căn giữa cho cân đối */}
          <div className="relative z-10 flex flex-col items-center gap-space-sm text-center">
            <div className="inline-flex items-center gap-space-xs rounded-full bg-surface-container-lowest px-space-sm py-1 text-label-sm text-primary clay-inset">
              <Icon name="recycling" className="text-[16px]" />
              <span>{MASCOT_BANNER.eyebrow}</span>
            </div>
            <h2 className="text-headline-md text-on-surface">{MASCOT_BANNER.title}</h2>
            <p className="max-w-2xl text-body-md text-on-surface-variant">{MASCOT_BANNER.body}</p>

            <div className="grid w-full grid-cols-1 gap-space-sm pt-space-xs sm:grid-cols-3">
              {MASCOT_BANNER.steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="flex items-center gap-space-sm rounded-clay bg-surface-container-lowest/80 p-space-sm text-left shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9)]"
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full ${
                      idx === 0
                        ? "bg-secondary-fixed text-on-secondary-fixed"
                        : idx === 1
                          ? "bg-primary-fixed text-on-primary-fixed"
                          : "bg-tertiary-fixed text-on-tertiary-fixed"
                    }`}
                  >
                    <Icon
                      name={idx === 0 ? "water_drop" : idx === 1 ? "sync_alt" : "eco"}
                      className="text-[18px]"
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-label-md text-on-surface">{step.title}</span>
                    <span className="text-label-sm font-normal text-on-surface-variant">{step.desc}</span>
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/tu-van"
              className="mt-space-sm inline-flex items-center gap-space-xs rounded-full bg-secondary-container px-space-lg py-space-sm text-label-md text-on-secondary-container shadow-[inset_0_2px_3px_rgba(255,255,255,0.5),0_6px_16px_rgba(242,169,59,0.3)] transition hover:opacity-95"
            >
              <Icon name="forum" className="text-[18px]" />
              {MASCOT_BANNER.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- CÂU CHUYỆN ---------------- */}
      <section id={STORY.id} className="w-full px-margin-mobile py-space-xl sm:px-margin">
        <div className="mx-auto grid max-w-6xl items-center gap-space-xl lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-clay-xl bg-surface-container-low p-space-sm clay-raise">
            <Image
              src="/stitch/story-scene.jpg"
              alt="Câu chuyện Luvia"
              fill
              sizes="(max-width:1024px) 100vw, 1080px"
              quality={90}
              className="rounded-clay-lg object-cover p-space-sm"
            />
          </div>

          <div>
            <span className="text-label-md font-bold uppercase tracking-widest text-primary">
              HÀNH TRÌNH TÁI SINH
            </span>
            <h2 className="mt-space-xs text-headline-lg-mobile text-on-surface sm:text-headline-lg">
              {STORY.title}
            </h2>
            <div className="mt-space-md flex flex-col gap-space-sm text-body-md text-on-surface-variant">
              {STORY.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <Link
              href={STORY.cta.href}
              className="mt-space-lg inline-flex items-center gap-space-xs rounded-full bg-surface-container-lowest px-space-lg py-space-sm text-label-md text-on-surface clay-raise-sm transition hover:bg-surface-container"
            >
              {STORY.cta.label}
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id={FAQ.id} className="w-full px-margin-mobile py-space-xl sm:px-margin">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-label-md font-bold uppercase tracking-widest text-primary">
              GIẢI ĐÁP THẮC MẮC
            </span>
            <h2 className="mt-space-xs text-headline-lg-mobile text-on-surface sm:text-headline-lg">
              {FAQ.title}
            </h2>
          </div>

          <div className="mt-space-xl flex flex-col gap-space-sm">
            {FAQ.items.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="overflow-hidden rounded-clay-lg bg-surface-container-lowest clay-raise"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-space-md p-space-md text-left text-label-lg text-on-surface transition hover:text-primary"
                  >
                    <span>{item.q}</span>
                    <Icon
                      name="expand_more"
                      className={`shrink-0 text-[20px] text-on-surface-variant transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-surface-container px-space-md pb-space-md pt-space-sm text-body-md text-on-surface-variant">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
