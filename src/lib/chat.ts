"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getProduct, type Product } from "./products";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const GREETING: ChatMessage = {
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

const STORAGE_KEY = "luvia-chat";
const ERROR_REPLY = "Ôi, ngọn lửa của mình vừa chập chờn một chút 🕯️ Bạn thử gửi lại giúp mình nhé!";
const RATE_LIMIT_REPLY = "Bạn hỏi nhanh quá, Luvia xin nghỉ một chút nha 🕯️ Thử lại sau ít phút nhé!";

/** Đoạn của một tin nhắn AI sau khi tách: chữ thường, chữ đậm, hoặc thẻ sản phẩm [[slug]] */
export type MessageSegment =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "product"; product: Product };

/**
 * Tách tin nhắn AI thành các đoạn để giao diện tự render.
 * `products` = các sản phẩm được nhắc đến (không trùng, theo thứ tự) để hiển thị thẻ "Thêm vào giỏ".
 */
export function parseMessage(text: string): { segments: MessageSegment[]; products: Product[] } {
  const segments: MessageSegment[] = [];
  const products: Product[] = [];
  for (const part of text.split(/(\[\[[a-z0-9-]+\]\])/g)) {
    const m = part.match(/^\[\[([a-z0-9-]+)\]\]$/);
    if (m) {
      const p = getProduct(m[1]);
      if (!p) continue;
      segments.push({ type: "product", product: p });
      if (!products.includes(p)) products.push(p);
      continue;
    }
    for (const s of part.split(/(\*\*[^*]+\*\*)/g)) {
      if (!s) continue;
      if (s.startsWith("**") && s.endsWith("**")) segments.push({ type: "bold", text: s.slice(2, -2) });
      else segments.push({ type: "text", text: s });
    }
  }
  return { segments, products };
}

/**
 * Trạng thái & hành động của khung chat tư vấn.
 *
 * const chat = useChat({ initialPrompt, onPromptConsumed });
 * chat.messages, chat.loading, chat.send("..."), chat.reset()
 * `streamingIndex` = vị trí tin nhắn đang được AI gõ (để ẩn thẻ sản phẩm cho tới khi xong).
 */
export function useChat(opts: { initialPrompt?: string | null; onPromptConsumed?: () => void } = {}) {
  const [messages, setMessagesState] = useState<ChatMessage[]>([GREETING]);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<ChatMessage[]>([GREETING]);
  const loadingRef = useRef(false);
  const restored = useRef(false);

  const setMessages = useCallback((next: ChatMessage[]) => {
    messagesRef.current = next;
    setMessagesState(next);
  }, []);

  // Khôi phục lịch sử trong phiên
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch {}
    restored.current = true;
  }, [setMessages]);

  // Lưu lịch sử khi không còn đang stream
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
          body: JSON.stringify({ messages: history.filter((m) => m !== GREETING).slice(-16) }),
        });
        if (res.status === 429) {
          setMessages([...history, { role: "assistant", content: RATE_LIMIT_REPLY }]);
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
        setMessages([...history, { role: "assistant", content: ERROR_REPLY }]);
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

  // Câu hỏi truyền từ nút "Hỏi Luvia" ở nơi khác (xem openChat trong lib/cart)
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
    quickPrompts: QUICK_PROMPTS,
  };
}
