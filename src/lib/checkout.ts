"use client";

/**
 * Hook trang đặt hàng, trạng thái đơn và biểu mẫu liên hệ. Giao diện chỉ đọc state và gọi hàm.
 *
 * Trang /dat-hang:
 *   const co = useCheckout();            // tự đọc ?mode=buy-now
 *   co.lines (kèm info, unitPrice, total) · co.form · co.setField("name", v) · co.errors.name
 *   co.provinces · co.payments · co.payment · co.setPayment("cod")
 *   co.agreed · co.setAgreed(true) · co.totals · co.delivery · co.submitLabel
 *   const r = await co.placeOrder();     // r.ok → router.push(r.href)
 *
 * Trang /don-hang/[code]:
 *   const s = useOrderStatus(code);      // s.order · s.view · s.message · s.refresh() · s.lookup(phone)
 *
 * Form B2B / yêu cầu riêng:
 *   const f = useLeadForm("b2b");        // f.values · f.setField · f.errors · f.submit() · f.status
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { describeLine, unitPrice, type CartLine } from "./pricing";
import { clearBuyNow, readBuyNow, useShopCart } from "./shop-cart";
import {
  computeTotals,
  EMPTY_CUSTOMER,
  estimateDelivery,
  orderView,
  validateCustomer,
  type CreatedOrder,
  type CustomerInfo,
  type FieldErrors,
  type OrderView,
} from "./orders";
import { ENABLED_PAYMENT_METHODS, PROVINCES, SALES_OPEN, type PaymentMethod } from "./site";
import { LEAD_FIELDS, validateLead, type LeadKind } from "./lead";
import { CHECKOUT, ORDER_STATUS, fill } from "@/content/vi";

const DRAFT_KEY = "luvia-checkout-draft";
const IDEM_KEY = "luvia-checkout-key";
const ORDERS_KEY = "luvia-orders-v2";

const newKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

// ---------------------------------------------------------------------------
// Đặt hàng
// ---------------------------------------------------------------------------

export type PlaceOrderResult =
  | { ok: true; order: CreatedOrder; href: string }
  | { ok: false; error: string };

export function useCheckout() {
  const cart = useShopCart();
  const [mode, setMode] = useState<"cart" | "buy-now">("cart");
  const [buyNowLines, setBuyNowLines] = useState<CartLine[]>([]);
  const [form, setForm] = useState<CustomerInfo>(EMPTY_CUSTOMER);
  const [payment, setPayment] = useState<PaymentMethod>(ENABLED_PAYMENT_METHODS[0]?.id ?? "cod");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const submittingRef = useRef(false);

  // Đọc chế độ mua ngay + bản nháp form (giữ thông tin khi quay lại chỉnh sửa)
  useEffect(() => {
    const isBuyNow = new URLSearchParams(window.location.search).get("mode") === "buy-now";
    const bn = isBuyNow ? readBuyNow() : [];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read URL/sessionStorage once on mount
    setMode(isBuyNow && bn.length ? "buy-now" : "cart");
    setBuyNowLines(bn);
    try {
      const d = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "null");
      if (d?.form) setForm({ ...EMPTY_CUSTOMER, ...d.form });
      if (d?.payment && ENABLED_PAYMENT_METHODS.some((m) => m.id === d.payment)) setPayment(d.payment);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ form, payment }));
    } catch {}
  }, [form, payment, hydrated]);

  const rawLines = mode === "buy-now" ? buyNowLines : cart.lines;
  const lines = useMemo(
    () =>
      rawLines.map((l) => ({
        ...l,
        info: describeLine(l.config),
        unitPrice: unitPrice(l.config)?.unit ?? 0,
        total: (unitPrice(l.config)?.unit ?? 0) * l.qty,
      })),
    [rawLines],
  );

  const totals = useMemo(() => computeTotals(rawLines, form.province), [rawLines, form.province]);
  const delivery = useMemo(() => estimateDelivery(rawLines, form.province), [rawLines, form.province]);

  const setField = useCallback(<K extends keyof CustomerInfo>(key: K, value: CustomerInfo[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }, []);

  const placeOrder = useCallback(async (): Promise<PlaceOrderResult> => {
    if (submittingRef.current) return { ok: false, error: "" };
    setSubmitError(null);
    if (!SALES_OPEN) {
      setSubmitError(CHECKOUT.salesClosed);
      return { ok: false, error: CHECKOUT.salesClosed };
    }
    if (!rawLines.length) return { ok: false, error: CHECKOUT.genericError };
    const errs = validateCustomer(form, { agreed });
    setErrors(errs);
    const first = Object.values(errs).find(Boolean);
    if (first) return { ok: false, error: first };

    // Cùng một lần đặt dùng chung khoá → bấm lặp / mạng chập chờn không tạo nhiều đơn
    let key = "";
    try {
      key = sessionStorage.getItem(IDEM_KEY) || "";
      if (!key) sessionStorage.setItem(IDEM_KEY, (key = newKey()));
    } catch {
      key = newKey();
    }

    submittingRef.current = true;
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey: key,
          lines: rawLines.map((l) => ({ config: l.config, qty: l.qty })),
          customer: form,
          payment,
          agreed,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.fields) setErrors(data.fields);
        const msg = data.error || CHECKOUT.genericError;
        setSubmitError(msg);
        return { ok: false, error: msg };
      }
      const order = data.order as CreatedOrder;
      saveOrderLocally(order);
      if (mode === "buy-now") clearBuyNow();
      else cart.clear();
      try {
        sessionStorage.removeItem(IDEM_KEY);
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {}
      return { ok: true, order, href: `/don-hang/${order.code}` };
    } catch {
      setSubmitError(CHECKOUT.genericError);
      return { ok: false, error: CHECKOUT.genericError };
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }, [rawLines, form, agreed, payment, mode, cart]);

  return {
    ready: hydrated && cart.ready,
    mode,
    salesOpen: SALES_OPEN,
    lines,
    isEmpty: hydrated && cart.ready && rawLines.length === 0,
    form,
    setField,
    errors,
    provinces: PROVINCES.map((p) => p.name),
    payments: ENABLED_PAYMENT_METHODS,
    payment,
    setPayment,
    agreed,
    setAgreed,
    totals,
    delivery,
    hasPreorder: lines.some((l) => l.info.isPreorder),
    submitLabel: CHECKOUT.submit[payment === "online" ? "online" : payment],
    submitting,
    submitError,
    placeOrder,
  };
}

// ---------------------------------------------------------------------------
// Đơn đã đặt
// ---------------------------------------------------------------------------

function readLocalOrders(): CreatedOrder[] {
  try {
    const v = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function saveOrderLocally(order: CreatedOrder) {
  try {
    const all = readLocalOrders().filter((o) => o.code !== order.code);
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...all].slice(0, 20)));
  } catch {}
}

function statusMessage(view: OrderView, code: string) {
  const map = { awaiting_payment: ORDER_STATUS.awaitingPayment, paid: ORDER_STATUS.paid, cod: ORDER_STATUS.cod, failed: ORDER_STATUS.failed };
  return fill(map[view], { code });
}

/**
 * Trạng thái đơn. Đọc bản lưu trên máy khách, rồi hỏi Google Sheet trạng thái mới nhất
 * (shop đổi "Thanh toán" thành "Đã thanh toán" → khách thấy "Thanh toán thành công").
 */
export function useOrderStatus(code: string) {
  const [order, setOrder] = useState<CreatedOrder | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRemote = useCallback(
    async (phone: string, base: CreatedOrder | null) => {
      setRefreshing(true);
      try {
        const res = await fetch(`/api/orders/${encodeURIComponent(code)}?phone=${encodeURIComponent(phone)}`, { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok && data.status) {
          const s = data.status as Partial<CreatedOrder>;
          const merged = { ...(base ?? (s as CreatedOrder)), ...(s.orderStatus ? { orderStatus: s.orderStatus } : {}), ...(s.paymentStatus ? { paymentStatus: s.paymentStatus } : {}) } as CreatedOrder;
          setOrder(merged);
          setNotFound(false);
          saveOrderLocally(merged);
          return true;
        }
        if (!base) setNotFound(true);
        return false;
      } finally {
        setRefreshing(false);
      }
    },
    [code],
  );

  useEffect(() => {
    const local = readLocalOrders().find((o) => o.code === code) ?? null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read saved order once on mount
    setOrder(local);
    setLoaded(true);
    if (local) void fetchRemote(local.customer.phone, local);
    else setNotFound(true);
  }, [code, fetchRemote]);

  const view = order ? orderView(order) : null;
  return {
    loaded,
    order,
    notFound: loaded && !order && notFound,
    view,
    message: view && order ? statusMessage(view, order.code) : null,
    refreshing,
    refresh: () => (order ? fetchRemote(order.customer.phone, order) : Promise.resolve(false)),
    /** Khách mở link trên máy khác: nhập số điện thoại đặt hàng để tra cứu */
    lookup: (phone: string) => fetchRemote(phone, null),
  };
}

// ---------------------------------------------------------------------------
// Biểu mẫu B2B / yêu cầu riêng
// ---------------------------------------------------------------------------

export function useLeadForm(kind: LeadKind) {
  const empty = useMemo(() => Object.fromEntries(Object.keys(LEAD_FIELDS[kind]).map((k) => [k, ""])), [kind]);
  const [values, setValues] = useState<Record<string, string>>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  /** Trường bẫy bot — giao diện render input ẩn: <input name="website" hidden tabIndex={-1} autoComplete="off" /> */
  const [honeypot, setHoneypot] = useState("");

  const setField = useCallback((name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: "" } : e));
  }, []);

  const submit = useCallback(async () => {
    if (status === "submitting") return false;
    const check = validateLead(kind, values);
    if (!check.ok) {
      setErrors(check.errors);
      setError(check.error);
      return false;
    }
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, fields: values, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.fields) setErrors(data.fields);
        setError(data.error || null);
        setStatus("error");
        return false;
      }
      setStatus("success");
      setValues(empty);
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }, [kind, values, honeypot, status, empty]);

  return {
    values,
    setField,
    errors,
    error,
    status,
    submit,
    honeypot,
    setHoneypot,
    reset: () => {
      setValues(empty);
      setErrors({});
      setStatus("idle");
      setError(null);
    },
  };
}
