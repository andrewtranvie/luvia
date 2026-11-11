"use client";

/**
 * Giỏ hàng v2 — mỗi dòng lưu đầy đủ cấu hình (mùa có sẵn hoặc mùi + hộp + lời nhắn).
 * Cấu hình khác nhau → dòng riêng; cùng cấu hình → cộng số lượng (tài liệu mục 7.3, 7.4).
 *
 * Cách dùng trong giao diện:
 *   const cart = useShopCart();
 *   cart.add({ kind: "season", seasonId: "thu", variantId: "hu-100g" }, 1);
 *   cart.lines.map(l => ({ ...l, info: describeLine(l.config), total: lineTotal(l) }))
 *   cart.setQty(line.id, 3); cart.remove(line.id); cart.updateLine(line.id, newConfig);
 *   cart.buyNow(config, qty) → chuyển tới /dat-hang?mode=buy-now (giỏ hàng giữ nguyên)
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { configKey, lineTotal, MAX_QTY, parseConfig, type CartLine, type LineConfig } from "./pricing";

const CART_KEY = "luvia-cart-v2";
const BUY_NOW_KEY = "luvia-buy-now";

interface ShopCartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** false cho tới khi đọc xong localStorage — tránh nháy "giỏ trống" */
  ready: boolean;
  add: (config: LineConfig, qty?: number) => void;
  setQty: (lineId: string, qty: number) => void;
  updateLine: (lineId: string, config: LineConfig) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  getLine: (lineId: string) => CartLine | undefined;
  /** Lưu một dòng "Mua ngay" (không đụng giỏ) — trang /dat-hang?mode=buy-now đọc lại */
  buyNow: (config: LineConfig, qty?: number) => void;
  /** Lần thêm gần nhất (configKey + thời điểm) — để hiện thông báo "Đã thêm vào giỏ hàng" */
  lastAdded: { key: string; at: number } | null;
}

const Ctx = createContext<ShopCartCtx | null>(null);

const newId = () => Math.random().toString(36).slice(2, 10);
const clampQty = (q: number) => Math.max(1, Math.min(MAX_QTY, Math.floor(q) || 1));

/** Đọc + làm sạch danh sách dòng từ dữ liệu lưu trữ (bỏ dòng hỏng) */
export function sanitizeLines(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const out: CartLine[] = [];
  for (const r of raw) {
    const config = parseConfig((r as CartLine)?.config);
    if (!config) continue;
    out.push({ id: typeof r.id === "string" ? r.id : newId(), config, qty: clampQty(Number(r.qty)) });
  }
  return out;
}

/** Thêm cấu hình vào danh sách dòng: gộp nếu trùng configKey. Hàm thuần (có test). */
export function mergeLine(lines: CartLine[], config: LineConfig, qty: number, id = newId()): CartLine[] {
  const key = configKey(config);
  const found = lines.find((l) => configKey(l.config) === key);
  if (found) return lines.map((l) => (l === found ? { ...l, qty: clampQty(l.qty + qty) } : l));
  return [...lines, { id, config, qty: clampQty(qty) }];
}

export function ShopCartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<ShopCartCtx["lastAdded"]>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once on mount
      if (raw) setLines(sanitizeLines(JSON.parse(raw)));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const add = useCallback((config: LineConfig, qty = 1) => {
    setLines((prev) => mergeLine(prev, config, qty));
    setLastAdded({ key: configKey(config), at: Date.now() });
  }, []);

  const setQty = useCallback((lineId: string, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== lineId) : prev.map((l) => (l.id === lineId ? { ...l, qty: clampQty(qty) } : l))));
  }, []);

  /** Đổi tùy chọn của một dòng. Nếu cấu hình mới trùng dòng khác → gộp vào dòng đó. */
  const updateLine = useCallback((lineId: string, config: LineConfig) => {
    setLines((prev) => {
      const target = prev.find((l) => l.id === lineId);
      if (!target) return prev;
      const key = configKey(config);
      const twin = prev.find((l) => l.id !== lineId && configKey(l.config) === key);
      if (twin) {
        return prev
          .filter((l) => l.id !== lineId)
          .map((l) => (l === twin ? { ...l, qty: clampQty(l.qty + target.qty) } : l));
      }
      return prev.map((l) => (l.id === lineId ? { ...l, config } : l));
    });
  }, []);

  const remove = useCallback((lineId: string) => setLines((prev) => prev.filter((l) => l.id !== lineId)), []);
  const clear = useCallback(() => setLines([]), []);
  const getLine = useCallback((lineId: string) => lines.find((l) => l.id === lineId), [lines]);

  const buyNow = useCallback((config: LineConfig, qty = 1) => {
    try {
      sessionStorage.setItem(BUY_NOW_KEY, JSON.stringify([{ id: newId(), config, qty: clampQty(qty) }]));
    } catch {}
  }, []);

  const value = useMemo<ShopCartCtx>(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + lineTotal(l), 0),
      ready,
      add,
      setQty,
      updateLine,
      remove,
      clear,
      getLine,
      buyNow,
      lastAdded,
    }),
    [lines, ready, add, setQty, updateLine, remove, clear, getLine, buyNow, lastAdded],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShopCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShopCart phải nằm trong <ShopCartProvider>");
  return ctx;
}

/** Dòng "Mua ngay" đang chờ đặt (đọc một lần ở trang đặt hàng) */
export function readBuyNow(): CartLine[] {
  try {
    return sanitizeLines(JSON.parse(sessionStorage.getItem(BUY_NOW_KEY) || "[]"));
  } catch {
    return [];
  }
}

export function clearBuyNow() {
  try {
    sessionStorage.removeItem(BUY_NOW_KEY);
  } catch {}
}
