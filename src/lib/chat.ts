"use client";

/**
 * Logic khung chat Lumi (tài liệu mục 4). Giao diện chỉ đọc state và gọi hàm.
 *
 *   openChat({ prompt?, context? })          // mở widget từ bất kỳ đâu (nút "Hỏi Lumi…")
 *   const chat = useChat({ initialPrompt, context, onPromptConsumed });
 *   chat.messages · chat.loading · chat.send(text) · chat.reset() · chat.quickReplies
 *   chat.streamingIndex  // tin đang được gõ → ẩn thẻ sản phẩm tới khi xong
 *   parseMessage(text)   // → segments (text | bold | season | handoff) + cards
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { getSeason, type Season } from "./catalog";
import { LUMI } from "@/content/vi";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Ngữ cảnh trang hiện tại gửi kèm cho Lumi (ví dụ mùa hương đang xem) */
export interface ChatContext {
  page?: "home" | "product" | "cart" | "checkout";
  seasonId?: string;
}

export const OPEN_CHAT_EVENT = "luvia:open-chat";

/** Mở cửa sổ Lumi. Không tự bật — chỉ gọi khi khách bấm nút (tài liệu mục 4). */
export function openChat(opts: { prompt?: string; context?: ChatContext } = {}) {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: opts }));
}

export const GREETING: ChatMessage = { role: "assistant", content: LUMI.greeting };

const STORAGE_KEY = "luvia-lumi-chat";

// ---------------------------------------------------------------------------
// Tách tin nhắn
// ---------------------------------------------------------------------------

export type MessageSegment =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "season"; season: Season }
  | { type: "handoff" };

export interface ParsedMessage {
  segments: MessageSegment[];
  /** Thẻ sản phẩm hiển thị dưới tin nhắn (Ảnh | Tên mùi | Đặc điểm | Giá | Tình trạng) */
  seasonCards: Season[];
  /** Có nút "Nhắn đội ngũ Luvia" */
  handoff: boolean;
}

const TOKEN = /(\[\[(?:season:[a-z0-9-]+|handoff)\]\])/g;

export function parseMessage(text: string): ParsedMessage {
  const segments: MessageSegment[] = [];
  const seasonCards: Season[] = [];
  let handoff = false;

  for (const part of text.split(TOKEN)) {
    if (!part) continue;
    const season = part.match(/^\[\[season:([a-z0-9-]+)\]\]$/);
    if (season) {
      const s = getSeason(season[1]);
      if (s) {
        segments.push({ type: "season", season: s });
        if (!seasonCards.includes(s)) seasonCards.push(s);
      }
      continue;
    }
    if (part === "[[handoff]]") {
      handoff = true;
      segments.push({ type: "handoff" });
      continue;
    }
    for (const s of part.split(/(\*\*[^*]+\*\*)/g)) {
      if (!s) continue;
      if (s.startsWith("**") && s.endsWith("**")) segments.push({ type: "bold", text: s.slice(2, -2) });
      else segments.push({ type: "text", text: s });
    }
  }
  // Câu "chưa có thông tin chắc chắn" luôn kèm nút chuyển sang đội ngũ
  if (!handoff && text.includes("chưa có thông tin chắc chắn")) handoff = true;
  return { segments, seasonCards: seasonCards.slice(0, 2), handoff };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useChat(opts: { initialPrompt?: string | null; context?: ChatContext; onPromptConsumed?: () => void } = {}) {
  const [messages, setMessagesState] = useState<ChatMessage[]>([GREETING]);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<ChatMessage[]>([GREETING]);
  const loadingRef = useRef(false);
  const restored = useRef(false);
  const contextRef = useRef<ChatContext | undefined>(opts.context);
  contextRef.current = opts.context;

  const setMessages = useCallback((next: ChatMessage[]) => {
    messagesRef.current = next;
    setMessagesState(next);
  }, []);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
    } catch {}
    restored.current = true;
  }, [setMessages]);

  useEffect(() => {
    if (!restored.current || loading) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {}
  }, [messages, loading]);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim().slice(0, 500);
      if (!content || loadingRef.current) return;
      const history: ChatMessage[] = [...messagesRef.current, { role: "user", content }];
      setMessages([...history, { role: "assistant", content: "" }]);
      loadingRef.current = true;
      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.filter((m) => m !== GREETING && m.content !== GREETING.content).slice(-16),
            context: contextRef.current,
          }),
        });
        if (res.status === 429) {
          setMessages([...history, { role: "assistant", content: LUMI.rateLimited }]);
          return;
        }
        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages([...history, { role: "assistant", content: acc }]);
        }
        if (!acc.trim()) throw new Error("empty");
      } catch {
        setMessages([...history, { role: "assistant", content: `${LUMI.error} [[handoff]]` }]);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [setMessages],
  );

  const reset = useCallback(() => {
    if (loadingRef.current) return;
    setMessages([GREETING]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [setMessages]);

  const { initialPrompt, onPromptConsumed } = opts;
  useEffect(() => {
    if (!initialPrompt) return;
    onPromptConsumed?.();
    void send(initialPrompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ chạy khi có prompt mới
  }, [initialPrompt]);

  return {
    messages,
    loading,
    send,
    reset,
    streamingIndex: loading ? messages.length - 1 : -1,
    isFresh: messages.length <= 1,
    quickReplies: LUMI.quickReplies,
  };
}

/** Lắng nghe yêu cầu mở chat (dùng trong widget Lumi) */
export function useOpenChatListener(onOpen: (opts: { prompt?: string; context?: ChatContext }) => void) {
  const ref = useRef(onOpen);
  ref.current = onOpen;
  useEffect(() => {
    const handler = (e: Event) => ref.current((e as CustomEvent).detail ?? {});
    window.addEventListener(OPEN_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler);
  }, []);
}
