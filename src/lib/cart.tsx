"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, priceFor, type SizeId } from "./products";
import { POLICY } from "./site";

export interface CartItem {
  slug: string;
  size: SizeId;
  qty: number;
}

export type PaymentMethod = "cod" | "bank" | "momo";

export interface Order {
  id: string;
  createdAt: string;
  items: (CartItem & { name: string; unitPrice: number })[];
  subtotal: number;
  /** Tổng giảm (mã giảm giá + voucher đổi dầu) */
  discount: number;
  /** Phí giao hàng + gói quà */
  shipping: number;
  total: number;
  customer: { name: string; phone: string; email: string; address: string; note: string };
  /** Nhãn hiển thị của phương thức thanh toán */
  payment: string;
  paymentMethod: PaymentMethod;
  coupon: string | null;
  oilReturn: boolean;
  giftWrap: boolean;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (slug: string, size: SizeId, qty?: number) => void;
  setQty: (slug: string, size: SizeId, qty: number) => void;
  remove: (slug: string, size: SizeId) => void;
  clear: () => void;
  lastAdded: { slug: string; at: number } | null;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "luvia-cart";

// Giữ để tương thích ngược — nguồn gốc nằm ở ./site
export { COUPONS } from "./site";
export const FREE_SHIP_FROM = POLICY.freeShipFrom;
export const SHIPPING_FEE = POLICY.shippingFee;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartCtx["lastAdded"]>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once on mount
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((slug: string, size: SizeId, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === slug && i.size === size);
      if (found) return prev.map((i) => (i === found ? { ...i, qty: Math.min(99, i.qty + qty) } : i));
      return [...prev, { slug, size, qty }];
    });
    setLastAdded({ slug, at: Date.now() });
  }, []);

  const setQty = useCallback((slug: string, size: SizeId, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.slug === slug && i.size === size))
        : prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty: Math.min(99, qty) } : i)),
    );
  }, []);

  const remove = useCallback((slug: string, size: SizeId) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => {
    const valid = items.filter((i) => getProduct(i.slug));
    return {
      items: valid,
      count: valid.reduce((s, i) => s + i.qty, 0),
      subtotal: valid.reduce((s, i) => s + priceFor(getProduct(i.slug)!, i.size) * i.qty, 0),
      ready,
      add,
      setQty,
      remove,
      clear,
      lastAdded,
    };
  }, [items, ready, add, setQty, remove, clear, lastAdded]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function openChat(prompt?: string) {
  window.dispatchEvent(new CustomEvent("luvia:open-chat", { detail: { prompt } }));
}
