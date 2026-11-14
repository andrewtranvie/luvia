/**
 * Mô hình đơn hàng — dùng chung client & server.
 * Server gọi buildOrder() để TÍNH LẠI toàn bộ giá/phí từ catalog (không tin số liệu client gửi).
 */
import { formatDays } from "./catalog";
import {
  checkAvailability,
  describeLine,
  lineTotal,
  maxPrepDays,
  MAX_QTY,
  parseConfig,
  unitPrice,
  type CartLine,
} from "./pricing";
import {
  BANK,
  BANK_TRANSFER_DEADLINE_MINUTES,
  ENABLED_PAYMENT_METHODS,
  FREE_SHIPPING_THRESHOLD,
  SALES_OPEN,
  SHIPPING_METHOD,
  shippingFor,
  vietQrUrl,
  type PaymentMethod,
} from "./site";
import { CHECKOUT, ORDER_STATE_VALUES, fill } from "@/content/vi";

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  province: string;
  address: string;
  note: string;
}

export type CustomerField = keyof CustomerInfo;
export type FieldErrors = Partial<Record<CustomerField | "agree" | "payment", string>>;

export const EMPTY_CUSTOMER: CustomerInfo = { name: "", phone: "", email: "", province: "", address: "", note: "" };

export interface OrderRequest {
  idempotencyKey: string;
  lines: { config: unknown; qty: number }[];
  customer: CustomerInfo;
  payment: PaymentMethod;
  agreed: boolean;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export interface OrderLineSnapshot {
  title: string;
  scent: string;
  variant: string;
  box: string | null;
  message: string | null;
  qty: number;
  unitPrice: number;
  total: number;
  isPreorder: boolean;
}

export type OrderStatusValue = (typeof ORDER_STATE_VALUES.order)[keyof typeof ORDER_STATE_VALUES.order];
export type PaymentStatusValue = (typeof ORDER_STATE_VALUES.payment)[keyof typeof ORDER_STATE_VALUES.payment];

export interface CreatedOrder {
  code: string;
  createdAt: string;
  lines: OrderLineSnapshot[];
  totals: OrderTotals;
  customer: CustomerInfo;
  payment: PaymentMethod;
  paymentLabel: string;
  orderStatus: OrderStatusValue;
  paymentStatus: PaymentStatusValue;
  /** Ví dụ "Chuẩn bị 3–5 ngày + giao 1–2 ngày" */
  eta: { prep: string | null; transit: string };
  hasPreorder: boolean;
  transfer: null | {
    content: string;
    amount: number;
    deadline: string;
    qrUrl: string | null;
    bankName: string;
    account: string;
    accountName: string;
  };
}

// ---------------------------------------------------------------------------

const PHONE_RE = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const normalizePhone = (p: string) => p.replace(/[\s.\-()]/g, "");

/** Kiểm tra thông tin nhận hàng. Thông báo theo mẫu "Vui lòng bổ sung [tên trường] để tiếp tục." */
export function validateCustomer(c: CustomerInfo, opts: { agreed?: boolean } = {}): FieldErrors {
  const e: FieldErrors = {};
  const miss = (field: CustomerField) => fill(CHECKOUT.missingField, { field: CHECKOUT.fields[field].toLowerCase() });
  if (c.name.trim().length < 2) e.name = miss("name");
  if (!PHONE_RE.test(normalizePhone(c.phone))) e.phone = c.phone.trim() ? "Số điện thoại chưa đúng định dạng." : miss("phone");
  if (c.email.trim() && !EMAIL_RE.test(c.email.trim())) e.email = "Email chưa đúng định dạng.";
  if (!shippingFor(c.province)) e.province = miss("province");
  if (c.address.trim().length < 8) e.address = miss("address");
  if (opts.agreed === false) e.agree = "Vui lòng xác nhận đã kiểm tra thông tin đơn hàng để tiếp tục.";
  return e;
}

/** Tổng tiền (client xem trước & server tính chính thức dùng chung hàm này) */
export function computeTotals(
  lines: CartLine[],
  province: string,
): OrderTotals & { shippingKnown: boolean; freeShipping: boolean } {
  const subtotal = lines.reduce((s, l) => s + lineTotal(l), 0);
  const ship = shippingFor(province);
  // Đơn từ FREE_SHIPPING_THRESHOLD được miễn phí giao (xem Chính sách giao hàng)
  const freeShipping = Boolean(lines.length) && subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = lines.length && ship && !freeShipping ? ship.fee : 0;
  const discount = 0; // Chưa có chương trình giảm giá được xác nhận
  return {
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
    shippingKnown: Boolean(ship),
    freeShipping,
  };
}

export function estimateDelivery(lines: CartLine[], province: string) {
  const ship = shippingFor(province);
  const prep = maxPrepDays(lines);
  return {
    method: SHIPPING_METHOD.label,
    prep: prep ? formatDays(prep) : null,
    transit: ship ? formatDays(ship.transitDays) : null,
  };
}

export function generateOrderCode(now = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  const ymd = `${String(now.getFullYear()).slice(2)}${p(now.getMonth() + 1)}${p(now.getDate())}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "X");
  return `LV-${ymd}-${rand}`;
}

export type BuildResult =
  | { ok: true; order: CreatedOrder }
  | { ok: false; status: 400 | 409; error: string; fields?: FieldErrors };

/** Dựng đơn hàng từ yêu cầu thô. Mọi giá trị tiền đều tính lại tại đây. */
export function buildOrder(raw: unknown, now = new Date()): BuildResult {
  if (!SALES_OPEN) return { ok: false, status: 409, error: CHECKOUT.salesClosed };
  if (!raw || typeof raw !== "object") return { ok: false, status: 400, error: CHECKOUT.genericError };
  const req = raw as Partial<OrderRequest>;

  // Dòng sản phẩm
  if (!Array.isArray(req.lines) || req.lines.length === 0 || req.lines.length > 30) {
    return { ok: false, status: 400, error: CHECKOUT.genericError };
  }
  const lines: CartLine[] = [];
  for (const [i, l] of req.lines.entries()) {
    const config = parseConfig(l?.config);
    const qty = Math.floor(Number(l?.qty));
    if (!config || !(qty >= 1 && qty <= MAX_QTY)) return { ok: false, status: 400, error: CHECKOUT.genericError };
    const av = checkAvailability(config);
    if (!av.ok) return { ok: false, status: 409, error: fill(CHECKOUT.unavailable, { name: av.name }) };
    lines.push({ id: String(i), config, qty });
  }

  // Khách hàng
  const c = (req.customer ?? {}) as Partial<CustomerInfo>;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const customer: CustomerInfo = {
    name: str(c.name, 80),
    phone: normalizePhone(str(c.phone, 20)),
    email: str(c.email, 120),
    province: str(c.province, 40),
    address: str(c.address, 300),
    note: str(c.note, 500),
  };
  const fields = validateCustomer(customer, { agreed: req.agreed === true });
  const payment = ENABLED_PAYMENT_METHODS.find((m) => m.id === req.payment);
  if (!payment) fields.payment = "Vui lòng chọn phương thức thanh toán.";
  if (Object.keys(fields).length) {
    return { ok: false, status: 400, error: Object.values(fields)[0]!, fields };
  }

  const totals = computeTotals(lines, customer.province);
  const delivery = estimateDelivery(lines, customer.province);
  const code = generateOrderCode(now);
  const isBank = payment!.id === "bank";

  return {
    ok: true,
    order: {
      code,
      createdAt: now.toISOString(),
      lines: lines.map((l) => {
        const d = describeLine(l.config);
        const unit = unitPrice(l.config)!.unit;
        return {
          title: d.title,
          scent: d.scent,
          variant: d.variant,
          box: d.box,
          message: d.message,
          qty: l.qty,
          unitPrice: unit,
          total: unit * l.qty,
          isPreorder: d.isPreorder,
        };
      }),
      totals: { subtotal: totals.subtotal, discount: totals.discount, shipping: totals.shipping, total: totals.total },
      customer,
      payment: payment!.id,
      paymentLabel: payment!.label,
      orderStatus: ORDER_STATE_VALUES.order.pending,
      paymentStatus: isBank ? ORDER_STATE_VALUES.payment.awaiting : ORDER_STATE_VALUES.payment.unpaid,
      eta: { prep: delivery.prep, transit: delivery.transit ?? "" },
      hasPreorder: lines.some((l) => describeLine(l.config).isPreorder),
      transfer: isBank
        ? {
            content: code.replace(/-/g, " "),
            amount: totals.total,
            deadline: new Date(now.getTime() + BANK_TRANSFER_DEADLINE_MINUTES * 60_000).toISOString(),
            qrUrl: vietQrUrl(totals.total, code.replace(/-/g, " ")),
            bankName: BANK.bankName,
            account: BANK.account,
            accountName: BANK.accountName,
          }
        : null,
    },
  };
}

/** Trạng thái hiển thị sau khi đặt (tài liệu mục 7.6) */
export type OrderView = "awaiting_payment" | "paid" | "cod" | "failed";

export function orderView(o: Pick<CreatedOrder, "payment" | "paymentStatus">): OrderView {
  if (o.paymentStatus === ORDER_STATE_VALUES.payment.paid) return "paid";
  if (o.paymentStatus === ORDER_STATE_VALUES.payment.failed) return "failed";
  if (o.payment === "cod") return "cod";
  return "awaiting_payment";
}
