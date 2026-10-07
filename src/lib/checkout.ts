"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useCart, type Order, type PaymentMethod } from "./cart";
import { getProduct, priceFor } from "./products";
import { COUPONS, POLICY, vietQrUrl } from "./site";

export const PAYMENT_METHODS: { id: PaymentMethod; label: string }[] = [
  { id: "cod", label: "Thanh toán khi nhận hàng (COD)" },
  { id: "bank", label: "Chuyển khoản ngân hàng / VietQR" },
  { id: "momo", label: "Ví MoMo" },
];

export type CustomerForm = Order["customer"];
export type CheckoutErrors = Partial<Record<keyof CustomerForm, string>>;

const EMPTY_FORM: CustomerForm = { name: "", phone: "", email: "", address: "", note: "" };
const LAST_ORDER_KEY = "luvia-last-order";
const ORDERS_KEY = "luvia-orders";

export interface Totals {
  subtotal: number;
  couponDiscount: number;
  oilVoucher: number;
  shipping: number;
  giftWrap: number;
  total: number;
  isFreeShip: boolean;
  /** Số tiền cần mua thêm để được freeship */
  freeShipRemaining: number;
  /** 0–100 */
  freeShipProgress: number;
}

/** Hàm thuần — dùng được cả ở server/test */
export function computeTotals(opts: {
  subtotal: number;
  coupon: string | null;
  oilReturn: boolean;
  giftWrap: boolean;
  hasItems: boolean;
}): Totals {
  const { subtotal, coupon, oilReturn, giftWrap, hasItems } = opts;
  const couponDiscount = coupon && COUPONS[coupon] ? Math.round((subtotal * COUPONS[coupon].pct) / 100) : 0;
  const isFreeShip = subtotal >= POLICY.freeShipFrom;
  const shipping = isFreeShip || !hasItems ? 0 : POLICY.shippingFee;
  const oilVoucher = oilReturn && hasItems ? POLICY.oilVoucher : 0;
  const wrap = giftWrap && hasItems ? POLICY.giftWrapFee : 0;
  return {
    subtotal,
    couponDiscount,
    oilVoucher,
    shipping,
    giftWrap: wrap,
    total: Math.max(0, subtotal - couponDiscount - oilVoucher + shipping + wrap),
    isFreeShip,
    freeShipRemaining: Math.max(0, POLICY.freeShipFrom - subtotal),
    freeShipProgress: Math.min(100, Math.round((subtotal / POLICY.freeShipFrom) * 100)),
  };
}

export function validateCustomer(form: CustomerForm): CheckoutErrors {
  const errs: CheckoutErrors = {};
  if (form.name.trim().length < 2) errs.name = "Vui lòng nhập họ tên";
  if (!/^(0|\+84)\d{9,10}$/.test(form.phone.replace(/[\s.-]/g, ""))) errs.phone = "Số điện thoại chưa đúng";
  if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = "Email chưa đúng";
  if (form.address.trim().length < 8) errs.address = "Vui lòng nhập địa chỉ đầy đủ";
  return errs;
}

/**
 * Toàn bộ logic thanh toán. Giao diện chỉ cần đọc state và gọi hàm.
 *
 * const co = useCheckout();
 * <input value={co.form.name} onChange={e => co.setField("name", e.target.value)} />
 * {co.errors.name && <p>{co.errors.name}</p>}
 * <button onClick={co.applyCoupon}>Áp dụng</button>
 * const order = await co.placeOrder(); // null nếu form lỗi
 */
export function useCheckout(options: { defaultPayment?: PaymentMethod } = {}) {
  const { items, subtotal, ready, clear } = useCart();
  const [form, setForm] = useState<CustomerForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [payment, setPayment] = useState<PaymentMethod>(options.defaultPayment ?? "cod");
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [oilReturn, setOilReturn] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totals = useMemo(
    () => computeTotals({ subtotal, coupon, oilReturn, giftWrap, hasItems: items.length > 0 }),
    [subtotal, coupon, oilReturn, giftWrap, items.length],
  );

  const setField = useCallback(<K extends keyof CustomerForm>(key: K, value: CustomerForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }, []);

  const applyCoupon = useCallback(() => {
    const code = couponCode.trim().toUpperCase();
    if (COUPONS[code]) {
      setCoupon(code);
      setCouponError("");
      return true;
    }
    setCoupon(null);
    setCouponError(`Mã không hợp lệ. Thử ${Object.keys(COUPONS).join(" hoặc ")} nhé!`);
    return false;
  }, [couponCode]);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
    setCouponCode("");
    setCouponError("");
  }, []);

  /** Kiểm tra form, lưu đơn, xoá giỏ. Trả về đơn hàng, hoặc null nếu form lỗi / giỏ trống. */
  const placeOrder = useCallback(async (): Promise<Order | null> => {
    if (!items.length || submitting) return null;
    const errs = validateCustomer(form);
    setErrors(errs);
    if (Object.keys(errs).length) return null;

    setSubmitting(true);
    const order: Order = {
      id: "LV" + Date.now().toString().slice(-8),
      createdAt: new Date().toISOString(),
      items: items.map((i) => {
        const p = getProduct(i.slug)!;
        return { ...i, name: p.name, unitPrice: priceFor(p, i.size) };
      }),
      subtotal: totals.subtotal,
      discount: totals.couponDiscount + totals.oilVoucher,
      shipping: totals.shipping + totals.giftWrap,
      total: totals.total,
      customer: {
        ...form,
        name: form.name.trim(),
        phone: form.phone.replace(/[\s.-]/g, ""),
        email: form.email.trim(),
        address: form.address.trim(),
      },
      payment: PAYMENT_METHODS.find((m) => m.id === payment)!.label,
      paymentMethod: payment,
      coupon,
      oilReturn,
      giftWrap,
    };
    saveOrder(order);
    // Bản demo: chưa có backend đơn hàng. Khi có, gọi API tại đây.
    await new Promise((r) => setTimeout(r, 500));
    clear();
    setSubmitting(false);
    return order;
  }, [items, submitting, form, totals, payment, coupon, oilReturn, giftWrap, clear]);

  return {
    ready,
    items,
    form,
    setField,
    errors,
    payment,
    setPayment,
    paymentMethods: PAYMENT_METHODS,
    couponCode,
    setCouponCode,
    coupon,
    couponLabel: coupon ? COUPONS[coupon].label : null,
    couponPct: coupon ? COUPONS[coupon].pct : 0,
    couponError,
    applyCoupon,
    removeCoupon,
    oilReturn,
    setOilReturn,
    giftWrap,
    setGiftWrap,
    totals,
    submitting,
    placeOrder,
  };
}

function saveOrder(order: Order) {
  try {
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...all].slice(0, 20)));
  } catch {}
}

/** Đơn vừa đặt (cho trang cảm ơn). `loaded` = đã đọc xong localStorage. */
export function useLastOrder() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAST_ORDER_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read saved order once on mount
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);
  return { order, loaded };
}

/** URL ảnh VietQR cho đơn, hoặc null nếu shop chưa cấu hình tài khoản (NEXT_PUBLIC_BANK_*) */
export function orderQrUrl(order: Pick<Order, "id" | "total">) {
  return vietQrUrl(order.total, `LUVIA ${order.id}`);
}
