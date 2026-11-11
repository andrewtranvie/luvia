"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X, Minimize2, Sparkles, MessageCircle } from "lucide-react";
import ChatPanel from "./ChatPanel";
import { LUMI } from "@/content/vi";
import { useOpenChatListener, type ChatContext } from "@/lib/chat";
import { useTheme } from "@/lib/themeContext";

export default function ChatWidget() {
  const pathname = usePathname();
  const { is3D } = useTheme();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [context, setContext] = useState<ChatContext | undefined>(undefined);

  useOpenChatListener((opts) => {
    setOpen(true);
    if (opts.prompt) setPrompt(opts.prompt);
    if (opts.context) setContext(opts.context);
  });

  if (pathname === "/tu-van") return null;

  return (
    <>
      {/* 4 Cửa sổ chat AI tư vấn mùi cùng Lumi */}
      {open && (
        <div
          className={`fixed inset-x-0 bottom-0 z-50 flex h-[85dvh] flex-col overflow-hidden rounded-t-[28px] bg-white animate-fade-up sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[620px] sm:max-h-[calc(100dvh-7rem)] sm:w-[420px] sm:rounded-[28px] ${
            is3D ? "clay-glass-panel" : "shadow-2xl ring-1 ring-leaf/15"
          }`}
          role="dialog"
          aria-label={LUMI.windowTitle}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center gap-3 bg-leaf px-4 py-3.5 text-white">
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/60 bg-white">
              <Image
                src="/brand/lumi-chat.jpg"
                alt="Lumi"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold leading-tight truncate text-sm sm:text-base">
                {LUMI.windowTitle}
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                <span className="size-2 rounded-full bg-flame animate-pulse" /> Trực tuyến · Phản hồi ngay
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-full hover:bg-white/15 transition text-white"
                aria-label={LUMI.minimize}
                title={LUMI.minimize}
              >
                <Minimize2 className="size-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-full hover:bg-white/15 transition text-white"
                aria-label={LUMI.close}
                title={LUMI.close}
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Panel Chat */}
          <ChatPanel
            className="flex-1"
            initialPrompt={prompt}
            context={context}
            onPromptConsumed={() => setPrompt(null)}
          />

          {/* Dòng nhỏ disclaimer dưới cùng */}
          <div className="shrink-0 border-t border-leaf/10 bg-cream px-4 py-2 text-center text-[11px] text-ink-soft">
            {LUMI.disclaimer}
          </div>
        </div>
      )}

      {/* Nút Floating Icon Lumi cố định ở góc dưới bên phải */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="group flex items-center gap-2 rounded-2xl rounded-br-xs bg-white px-3.5 py-2 text-left text-xs font-semibold text-ink shadow-xl ring-2 ring-leaf/20 transition hover:scale-105 active:scale-95"
          >
            <span className="size-2 rounded-full bg-flame animate-ping" />
            <span>
              <b className="text-leaf">Lumi:</b> {LUMI.iconLabel} ✨
            </span>
          </button>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          className={`group relative overflow-hidden rounded-full bg-white transition duration-300 ${
            is3D ? "clay-mascot-fab" : "size-14 shadow-2xl ring-4 ring-leaf hover:scale-110 active:scale-95"
          } ${open ? "max-sm:hidden" : ""} ${open && !is3D ? "ring-flame" : ""}`}
          aria-label={open ? LUMI.close : LUMI.iconLabel}
        >
          <Image
            src="/brand/lumi-chat.jpg"
            alt="Linh vật Lumi"
            fill
            sizes="56px"
            className="object-cover transition duration-300 group-hover:rotate-6"
          />
          {!open && (
            <span className="absolute right-0.5 top-0.5 flex size-3.5 items-center justify-center rounded-full bg-flame ring-2 ring-white">
              <span className="size-1.5 rounded-full bg-white" />
            </span>
          )}
        </button>
      </div>
    </>
  );
}
