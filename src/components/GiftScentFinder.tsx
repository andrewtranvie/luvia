"use client";

import { useState } from "react";
import { GIFT_FINDER } from "@/content/vi";
import { openChat } from "@/lib/chat";

/**
 * Ô "tả người nhận → Lumi gợi ý mùi + lý do".
 *
 * Không gọi API riêng: nó soạn sẵn câu hỏi rồi đẩy vào khung chat Lumi có sẵn qua
 * openChat({ prompt }) — useChat nhận bằng initialPrompt và tự gửi. Nhờ vậy câu trả lời
 * vẫn kèm thẻ sản phẩm do token [[season:...]] sinh ra, không phải dựng lại gì.
 *
 * `variant` vì hai trang đích đang dùng hai hệ thiết kế khác nhau: /qua-tang theo hệ
 * clay3d (surface-container / space-* / clay-raise), /tu-van vẫn theo hệ cũ (cream / leaf / ink).
 */
export default function GiftScentFinder({ variant = "clay" }: { variant?: "clay" | "legacy" }) {
  const [desc, setDesc] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const toggle = (chip: string) => {
    setError(false);
    setPicked((prev) => (prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]));
  };

  const submit = () => {
    /* Chip không ghi đè chữ khách gõ — nối thêm vào sau, để khách vừa gõ vừa bấm đều được. */
    const full = [desc.trim(), picked.join(", ")].filter(Boolean).join(", ");
    if (!full) {
      setError(true);
      return;
    }
    openChat({ prompt: GIFT_FINDER.prompt.replace("{desc}", full) });
  };

  const legacy = variant === "legacy";

  const box = legacy
    ? "rounded-[40px] bg-cream-light/60 p-6 ring-1 ring-leaf/15 sm:p-8"
    : "rounded-clay-xl bg-surface-container-lowest p-space-lg ring-1 ring-outline-variant/60";
  const eyebrow = legacy
    ? "text-xs font-bold uppercase tracking-[0.2em] text-leaf"
    : "text-label-sm font-bold uppercase tracking-[0.2em] text-secondary";
  const title = legacy ? "mt-2 text-2xl font-bold text-ink sm:text-3xl" : "mt-space-xs text-headline-sm text-on-surface";
  const lead = legacy ? "mt-2 text-sm leading-relaxed text-ink-soft" : "mt-space-xs text-body-md text-on-surface-variant";
  const field = legacy
    ? "mt-5 w-full resize-none rounded-3xl border border-leaf/20 bg-white px-5 py-4 text-sm text-ink outline-none transition placeholder:text-ink-soft/60 focus:border-leaf focus:ring-2 focus:ring-leaf/20"
    : "mt-space-md w-full resize-none rounded-clay border border-outline-variant bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20";
  const chipsLabel = legacy ? "mt-4 text-xs font-semibold text-ink-soft" : "mt-space-md text-label-sm text-on-surface-variant";
  const chipOn = legacy
    ? "border-leaf bg-leaf text-white"
    : "border-primary bg-primary-container text-on-primary-container";
  const chipOff = legacy
    ? "border-leaf/25 bg-white text-ink-soft hover:border-leaf/60 hover:text-ink"
    : "border-outline-variant bg-surface text-on-surface-variant hover:border-primary/60 hover:text-on-surface";
  const button = legacy
    ? "mt-5 inline-flex items-center justify-center rounded-full bg-flame px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
    : "mt-space-md inline-flex items-center justify-center rounded-full bg-primary-container px-space-lg py-space-sm text-label-md text-on-primary clay-press transition hover:bg-primary";

  return (
    <div className={box}>
      <p className={eyebrow}>{GIFT_FINDER.eyebrow}</p>
      <h3 className={title}>{GIFT_FINDER.title}</h3>
      <p className={lead}>{GIFT_FINDER.lead}</p>

      <label className="sr-only" htmlFor="gift-finder-desc">
        {GIFT_FINDER.title}
      </label>
      <textarea
        id="gift-finder-desc"
        rows={3}
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
          setError(false);
        }}
        placeholder={GIFT_FINDER.placeholder}
        className={field}
      />

      <p className={chipsLabel}>{GIFT_FINDER.chipsLabel}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {GIFT_FINDER.chips.map((chip) => {
          const on = picked.includes(chip);
          return (
            <button
              key={chip}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(chip)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${on ? chipOn : chipOff}`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={submit} className={button}>
          {GIFT_FINDER.submit}
        </button>
        {error && (
          <p role="alert" className={legacy ? "mt-5 text-xs text-flame" : "mt-space-md text-label-sm text-error"}>
            {GIFT_FINDER.empty}
          </p>
        )}
      </div>
    </div>
  );
}
