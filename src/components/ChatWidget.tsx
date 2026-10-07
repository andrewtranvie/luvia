"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ChatPanel from "./ChatPanel";

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const p = (e as CustomEvent<{ prompt?: string }>).detail?.prompt;
      setOpen(true);
      if (p) setPrompt(p);
    };
    window.addEventListener("luvia:open-chat", onOpen);
    const t = setTimeout(() => setHint(true), 4000);
    return () => {
      window.removeEventListener("luvia:open-chat", onOpen);
      clearTimeout(t);
    };
  }, []);

  if (pathname === "/tu-van") return null;

  return (
    <>
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 flex h-[85dvh] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl ring-1 ring-leaf/15 animate-fade-up sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:max-h-[calc(100dvh-8rem)] sm:w-[400px] sm:rounded-[28px]"
          role="dialog"
          aria-label="Chat tư vấn mùi hương"
        >
          <div className="flex items-center gap-3 bg-leaf px-4 py-3 text-white">
            <Image src="/brand/exp-love.jpg" alt="" width={44} height={44} className="size-11 rounded-full object-cover ring-2 ring-white/60" />
            <div className="flex-1">
              <p className="font-bold leading-tight">Luvia tư vấn mùi hương</p>
              <p className="flex items-center gap-1.5 text-xs text-white/80">
                <span className="size-2 rounded-full bg-flame" /> Trợ lý AI · trả lời ngay
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full hover:bg-white/15" aria-label="Đóng chat">
              <X className="size-5" />
            </button>
          </div>
          <ChatPanel className="flex-1" initialPrompt={prompt} onPromptConsumed={() => setPrompt(null)} />
        </div>
      )}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="group flex items-center gap-2 rounded-2xl rounded-br-xs bg-white px-3.5 py-2 text-left text-xs font-semibold text-ink shadow-xl ring-2 ring-leaf/20 transition hover:scale-105"
          >
            <span className="size-2 rounded-full bg-flame animate-ping" />
            <span>
              <b className="text-leaf">Bé Nến Luvia:</b> Chưa biết chọn mùi gì? Hỏi mình nhé 🌿✨
            </span>
          </button>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          className={`group relative size-16 overflow-hidden rounded-full bg-white shadow-2xl ring-4 ring-leaf transition duration-300 hover:scale-110 active:scale-95 ${
            open ? "max-sm:hidden ring-flame" : ""
          }`}
          aria-label={open ? "Đóng chat tư vấn" : "Mở chat tư vấn mùi hương Bé Nến"}
        >
          <Image
            src="/brand/exp-happy.jpg"
            alt="Linh vật Bé Nến Luvia"
            fill
            sizes="64px"
            className="object-cover transition duration-300 group-hover:rotate-6"
          />
          {!open && (
            <span className="absolute right-1 top-1 flex size-3.5 items-center justify-center rounded-full bg-flame ring-2 ring-white">
              <span className="size-1.5 rounded-full bg-white" />
            </span>
          )}
        </button>
      </div>
    </>
  );
}
