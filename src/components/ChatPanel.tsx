"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { Plus, RotateCcw, SendHorizontal } from "lucide-react";
import CandleArt from "./CandleArt";
import { formatVND, getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "luvia-chat";
const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Xin chào! Mình là **Luvia** — ngọn nến nhỏ làm từ dầu ăn tái chế 🌿✨\nBạn kể mình nghe: bạn muốn thắp nến ở đâu, vào lúc nào, hay đang tìm quà cho ai? Mình sẽ gợi ý mùi hương hợp nhất nhé!",
};

export const QUICK_PROMPTS = [
  "Mình hay khó ngủ, nên chọn mùi nào?",
  "Tìm quà tặng mẹ khoảng 200k",
  "Mùi tươi mát cho góc làm việc",
  "Nến Luvia làm từ dầu ăn có an toàn không?",
];

/** Tách đoạn văn bản theo thẻ sản phẩm [[slug]] và định dạng **đậm** */
function renderContent(text: string) {
  const parts = text.split(/(\[\[[a-z0-9-]+\]\])/g);
  const products: string[] = [];
  const nodes = parts.map((part, i) => {
    const m = part.match(/^\[\[([a-z0-9-]+)\]\]$/);
    if (m) {
      const p = getProduct(m[1]);
      if (!p) return null;
      if (!products.includes(p.slug)) products.push(p.slug);
      return (
        <Link key={i} href={`/san-pham/${p.slug}`} className="font-semibold text-leaf underline decoration-flame/60 underline-offset-2">
          {p.name}
        </Link>
      );
    }
    return (
      <Fragment key={i}>
        {part.split(/(\*\*[^*]+\*\*)/g).map((s, j) =>
          s.startsWith("**") && s.endsWith("**") ? <strong key={j}>{s.slice(2, -2)}</strong> : s,
        )}
      </Fragment>
    );
  });
  return { nodes, products };
}

function ProductChip({ slug }: { slug: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const p = getProduct(slug);
  if (!p) return null;
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-2 pr-3 ring-1 ring-leaf/15">
      <Link href={`/san-pham/${p.slug}`} className="size-14 shrink-0 rounded-xl" style={{ background: p.wax }}>
        <CandleArt product={p} className="size-14 p-1" lit={false} />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/san-pham/${p.slug}`} className="block truncate text-sm font-semibold hover:text-leaf">
          {p.name}
        </Link>
        <p className="text-xs text-ink-soft">{formatVND(p.price)} · 200g</p>
      </div>
      <button
        onClick={() => {
          add(p.slug, "classic");
          setAdded(true);
        }}
        className="flex items-center gap-1 rounded-full bg-leaf px-3 py-1.5 text-xs font-semibold text-white hover:bg-flame"
      >
        {added ? "Đã thêm ✓" : <><Plus className="size-3.5" /> Giỏ</>}
      </button>
    </div>
  );
}

export default function ChatPanel({
  initialPrompt,
  onPromptConsumed,
  className = "",
}: {
  initialPrompt?: string | null;
  onPromptConsumed?: () => void;
  className?: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore chat history once
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (loaded.current && !loading) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
      } catch {}
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING).slice(-16) }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text());
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) throw new Error("empty");
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "Ôi, ngọn lửa của mình vừa chập chờn một chút 🕯️ Bạn thử gửi lại giúp mình nhé!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Câu hỏi được truyền từ nút "Hỏi Luvia" ở nơi khác trên trang
  useEffect(() => {
    if (initialPrompt) {
      onPromptConsumed?.();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- forward external prompt into chat
      void send(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  const reset = () => {
    setMessages([GREETING]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div ref={scrollRef} className="paper flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
        {messages.map((m, i) => {
          if (m.role === "user")
            return (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] whitespace-pre-wrap rounded-3xl rounded-br-md bg-leaf px-4 py-2.5 text-sm text-white">
                  {m.content}
                </p>
              </div>
            );
          const { nodes, products } = renderContent(m.content);
          return (
            <div key={i} className="flex gap-2.5">
              <Image src="/brand/exp-happy.jpg" alt="" width={36} height={36} className="size-9 shrink-0 rounded-full object-cover ring-2 ring-white" />
              <div className="max-w-[85%] space-y-2">
                <div className="whitespace-pre-wrap rounded-3xl rounded-tl-md bg-white px-4 py-2.5 text-sm leading-relaxed shadow-sm ring-1 ring-leaf/10">
                  {m.content ? nodes : (
                    <span className="flex gap-1 py-1.5" aria-label="Luvia đang trả lời">
                      <span className="size-2 animate-bounce rounded-full bg-flame" />
                      <span className="size-2 animate-bounce rounded-full bg-flame [animation-delay:120ms]" />
                      <span className="size-2 animate-bounce rounded-full bg-flame [animation-delay:240ms]" />
                    </span>
                  )}
                </div>
                {!(loading && i === messages.length - 1) && products.slice(0, 3).map((s) => <ProductChip key={s} slug={s} />)}
              </div>
            </div>
          );
        })}

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 pl-11">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-leaf/30 bg-white px-3 py-1.5 text-left text-xs font-medium text-leaf-dark transition hover:bg-leaf hover:text-white"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-leaf/10 bg-white p-3"
      >
        <button
          type="button"
          onClick={reset}
          className="grid size-10 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-cream"
          aria-label="Bắt đầu cuộc trò chuyện mới"
          title="Trò chuyện mới"
        >
          <RotateCcw className="size-4" />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hỏi Luvia về mùi hương…"
          maxLength={500}
          className="min-w-0 flex-1 rounded-full bg-cream px-4 py-2.5 text-sm outline-none ring-leaf/40 focus:ring-2"
          aria-label="Nhập tin nhắn"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-leaf text-white transition hover:bg-flame disabled:opacity-40"
          aria-label="Gửi"
        >
          <SendHorizontal className="size-4" />
        </button>
      </form>
    </div>
  );
}
