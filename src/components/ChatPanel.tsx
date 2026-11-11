"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SendHorizontal, RotateCcw, Phone } from "lucide-react";
import { useChat, parseMessage, type ChatContext } from "@/lib/chat";
import { COLLECTION, LUMI, STOCK_STATUS } from "@/content/vi";
import { formatVND } from "@/lib/pricing";
import { SITE } from "@/lib/site";
import { useTheme } from "@/lib/themeContext";

export default function ChatPanel({
  initialPrompt,
  context,
  onPromptConsumed,
  className = "",
}: {
  initialPrompt?: string | null;
  context?: ChatContext;
  onPromptConsumed?: () => void;
  className?: string;
}) {
  const { messages, loading, send, reset, streamingIndex, isFresh, quickReplies } = useChat({
    initialPrompt,
    context,
    onPromptConsumed,
  });

  const { is3D } = useTheme();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const text = input;
    setInput("");
    void send(text);
  };

  return (
    // `min-h-0`: thẻ này là flex item (flex-1) nên mặc định min-height:auto, nó sẽ phình
    // theo chiều cao nội dung thay vì co lại — hậu quả là vùng tin nhắn không cuộn được
    // và ô nhập bị đẩy ra ngoài khung chat.
    <div className={`flex min-h-0 flex-col bg-cream ${className}`}>
      {/* Messages area */}
      <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 text-xs sm:text-sm">
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          const isStreaming = i === streamingIndex;
          const parsed = !isUser && !isStreaming ? parseMessage(m.content) : null;

          return (
            <div key={i} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
              {/* Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                  isUser
                    ? `rounded-br-xs text-white font-medium ${
                        is3D ? "clay-bubble-leaf" : "bg-leaf shadow-xs"
                      }`
                    : `rounded-bl-xs text-ink ${
                        is3D ? "clay-bubble" : "bg-white ring-1 ring-leaf/10 shadow-xs"
                      }`
                }`}
              >
                {isUser ? (
                  <span>{m.content}</span>
                ) : isStreaming ? (
                  <span>{m.content || <span className="animate-pulse">Đang suy nghĩ...</span>}</span>
                ) : parsed ? (
                  <div>
                    {parsed.segments.map((seg, idx) => {
                      if (seg.type === "bold") {
                        return <strong key={idx} className="font-bold text-leaf-dark">{seg.text}</strong>;
                      }
                      if (seg.type === "season") {
                        return (
                          <span key={idx} className="font-semibold text-leaf">
                            {seg.season.fullName}
                          </span>
                        );
                      }
                      if (seg.type === "handoff") {
                        return null;
                      }
                      return <span key={idx}>{seg.text}</span>;
                    })}
                  </div>
                ) : (
                  <span>{m.content}</span>
                )}
              </div>

              {/* Thẻ sản phẩm nhúng trong chat */}
              {parsed && parsed.seasonCards.length > 0 && (
                <div className="mt-2.5 w-full max-w-[90%] space-y-2">
                  {parsed.seasonCards.map((season) => (
                    <div
                      key={season.id}
                      className={`rounded-2xl p-3 ${
                        is3D ? "clay-card !rounded-2xl" : "border border-leaf/15 bg-white shadow-xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-ink">{season.fullName}</p>
                          <p className="text-[11px] text-ink-soft">
                            {COLLECTION.labels.highlight}: {season.highlights[0]}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-xs">
                            <span className="font-bold text-leaf-dark">{formatVND(season.price)}</span>
                            <span className="text-[10px] text-ink-soft/70">·</span>
                            <span className="text-[11px] text-leaf font-medium">
                              {STOCK_STATUS[season.status]}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-leaf/10">
                        <Link
                          href={`/san-pham/${season.id}`}
                          className="block w-full rounded-full bg-leaf py-1.5 text-center text-xs font-bold text-white hover:bg-leaf-dark transition"
                        >
                          {LUMI.card.viewProduct}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Nút Handoff: Nhắn đội ngũ Luvia */}
              {parsed && parsed.handoff && (
                <div className="mt-2 flex">
                  {/* Chuyển cho người thật: gọi hotline — chưa có kênh chat nào được khách chốt */}
                  <a
                    href={SITE.hotlineHref}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white transition ${
                      is3D ? "clay-btn-leaf" : "rounded-full bg-leaf shadow-sm hover:bg-leaf-dark"
                    }`}
                  >
                    <Phone className="size-3.5" />
                    {LUMI.handoffButton} · {SITE.hotline}
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Gợi ý bấm nhanh */}
      {isFresh && (
        <div className="flex shrink-0 flex-wrap gap-1.5 px-3 py-2 border-t border-leaf/10 bg-white">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => void send(reply)}
              className="rounded-full bg-cream px-3 py-1 text-[11px] font-medium text-ink hover:bg-leaf-soft hover:text-leaf-dark transition ring-1 ring-leaf/10"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input box */}
      <form onSubmit={handleSubmit} className="shrink-0 border-t border-leaf/10 bg-white p-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="grid size-9 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-cream hover:text-ink transition"
            title="Bắt đầu lại hội thoại"
          >
            <RotateCcw className="size-4" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={LUMI.inputPlaceholder}
            disabled={loading}
            className="flex-1 rounded-full border border-leaf/20 bg-cream/40 px-4 py-2 text-xs sm:text-sm text-ink placeholder:text-ink-soft/70 focus:bg-white focus:outline-leaf"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`grid size-9 shrink-0 place-items-center rounded-full text-white disabled:opacity-40 transition ${
              is3D ? "clay-btn-leaf" : "bg-leaf shadow hover:bg-leaf-dark"
            }`}
            aria-label="Gửi tin nhắn"
          >
            <SendHorizontal className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
