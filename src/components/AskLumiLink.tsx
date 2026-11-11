"use client";

import Icon from "./Icon";
import { openChat } from "@/lib/chat";

/** Nút chữ "Hỏi Lumi" theo thiết kế Stitch — dùng được từ server component. */
export default function AskLumiLink({ label, prompt }: { label: string; prompt?: string }) {
  return (
    <button
      type="button"
      onClick={() => openChat(prompt ? { prompt } : {})}
      className="group inline-flex items-center gap-space-xs text-label-md text-secondary transition-colors hover:text-on-secondary-container"
    >
      <Icon
        name="light_mode"
        className="text-[18px] text-secondary-container transition-transform group-hover:rotate-12"
        fill
      />
      <span className="font-bold underline decoration-secondary-container underline-offset-4">{label} →</span>
    </button>
  );
}
