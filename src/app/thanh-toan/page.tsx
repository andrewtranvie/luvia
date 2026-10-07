"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Banknote, Check, Gift, QrCode, Recycle, ShieldCheck, Ticket, Wallet } from "lucide-react";
import CandleArt from "@/components/CandleArt";
import { COUPONS, FREE_SHIP_FROM, SHIPPING_FEE, useCart, type Order } from "@/lib/cart";
import { SIZES, formatVND, getProduct, priceFor } from "@/lib/products";

const PAYMENTS = [
  { id: "cod", label: "Thanh toán khi nhận hàng (COD)", icon: Banknote },
  { id: "bank", label: "Chuyển khoản ngân hàng / VietQR", icon: QrCode },
  { id: "momo", label: "Ví MoMo", icon: Wallet },
];

const GIFT_WRAP = 15000;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, ready, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", note: "" });
  const [payment, setPayment] = useState("cod");
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [gift, setGift] = useState(false);
  const [oilReturn, setOilReturn] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!ready) return <div className="min-h-[50vh]" />;
  if (!items.length && !submitting)
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold">Chưa có sản phẩm để thanh toán</h1>
        <Link href="/san-pham" className="mt-6 inline-block rounded-full bg-leaf px-7 py-3 font-semibold text-white">Về cửa hàng</Link>
      </div>
    );

  const discount = coupon ? Math.round((subtotal * COUPONS[coupon].pct) / 100) : 0;
  const shipping = subtotal >= FREE_SHIP_FROM ? 0 : SHIPPING_FEE;
  const oilVoucher = oilReturn ? 30000 : 0;
  const total = Math.max(0, subtotal - discount - oilVoucher + shipping + (gift ? GIFT_WRAP : 0));

  const applyCoupon = () => {
    const c = code.trim().toUpperCase();
    if (COUPONS[c]) {
      setCoupon(c);
      setCouponError("");
    } else {
      setCoupon(null);
      setCouponError("Mã không hợp lệ. Thử XANH10 nhé!");
    }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Vui lòng nhập họ tên";
    if (!/^(0|\+84)\d{9,10}$/.test(form.phone.replace(/\s/g, ""))) errs.phone = "Số điện thoại chưa đúng";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Email chưa đúng";
    if (form.address.trim().length < 8) errs.address = "Vui lòng nhập địa chỉ đầy đủ";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    const order: Order = {
      id: "LV" + Date.now().toString().slice(-8),
      createdAt: new Date().toISOString(),
      items: items.map((i) => {
        const p = getProduct(i.slug)!;
        return { ...i, name: p.name, unitPrice: priceFor(p, i.size) };
      }),
      subtotal,
      discount: discount + oilVoucher,
      shipping: shipping + (gift ? GIFT_WRAP : 0),
      total,
      customer: form,
      payment: PAYMENTS.find((p) => p.id === payment)!.label,
      paymentMethod: payment as Order["paymentMethod"],
      coupon,
      oilReturn,
      giftWrap: gift,
    };
    try {
      localStorage.setItem("luvia-last-order", JSON.stringify(order));
      const all = JSON.parse(localStorage.getItem("luvia-orders") || "[]");
      localStorage.setItem("luvia-orders", JSON.stringify([order, ...all].slice(0, 20)));
    } catch {}
    setTimeout(() => {
      clear();
      router.push("/dat-hang-thanh-cong");
    }, 700);
  };

  const field = (k: keyof typeof form, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        value={form[k]}
        onChange={set(k)}
        className={`mt-1.5 w-full rounded-2xl bg-cream px-4 py-3 outline-none ring-1 focus:ring-2 ${
          errors[k] ? "ring-red-400" : "ring-leaf/15 focus:ring-leaf/50"
        }`}
        aria-invalid={!!errors[k]}
        {...props}
      />
      {errors[k] && <span className="mt-1 block text-xs text-red-600">{errors[k]}</span>}
    </label>
  );

  return (
    <form onSubmit={submit} className="mx-auto max-w-7xl px-4 py-12 sm:px-6" noValidate>
      <h1 className="text-3xl font-extrabold sm:text-4xl">Thanh toán</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <section className="rounded-[28px] bg-white p-6 ring-1 ring-leaf/10">
            <h2 className="text-lg font-bold">1. Thông tin giao hàng</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {field("name", "Họ và tên *", { autoComplete: "name" })}
              {field("phone", "Số điện thoại *", { autoComplete: "tel", inputMode: "tel" })}
              <div className="sm:col-span-2">{field("email", "Email (nhận xác nhận đơn)", { type: "email", autoComplete: "email" })}</div>
              <div className="sm:col-span-2">{field("address", "Địa chỉ nhận hàng *", { autoComplete: "street-address", placeholder: "Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" })}</div>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Ghi chú</span>
                <textarea value={form.note} onChange={set("note")} rows={2} className="mt-1.5 w-full rounded-2xl bg-cream px-4 py-3 outline-none ring-1 ring-leaf/15 focus:ring-2 focus:ring-leaf/50" placeholder="Lời nhắn cho shop / lời chúc trên thiệp quà tặng" />
              </label>
            </div>
          </section>

          <section className="rounded-[28px] bg-white p-6 ring-1 ring-leaf/10">
            <h2 className="text-lg font-bold">2. Phương thức thanh toán</h2>
            <div className="mt-5 space-y-3">
              {PAYMENTS.map((p) => (
                <label key={p.id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition ${payment === p.id ? "border-leaf bg-leaf-soft" : "border-leaf/10 hover:border-leaf/30"}`}>
                  <input type="radio" name="payment" checked={payment === p.id} onChange={() => setPayment(p.id)} className="accent-leaf" />
                  <p.icon className="size-5 text-leaf" />
                  <span className="font-medium">{p.label}</span>
                </label>
              ))}
            </div>
            {payment !== "cod" && (
              <p className="mt-3 rounded-2xl bg-flame-soft/60 p-3 text-sm text-ink-soft">
                Thông tin chuyển khoản / mã QR sẽ hiển thị sau khi đặt hàng. (Bản demo — chưa kết nối cổng thanh toán thật.)
              </p>
            )}
          </section>

          <section className="rounded-[28px] bg-white p-6 ring-1 ring-leaf/10">
            <h2 className="text-lg font-bold">3. Lựa chọn xanh</h2>
            <div className="mt-5 space-y-3">
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-leaf/10 p-4 hover:border-leaf/30">
                <input type="checkbox" checked={oilReturn} onChange={(e) => setOilReturn(e.target.checked)} className="mt-1 accent-leaf" />
                <Recycle className="mt-0.5 size-5 shrink-0 text-leaf" />
                <span>
                  <span className="block font-medium">Gửi 1 lít dầu ăn cũ cho shipper (-30.000₫)</span>
                  <span className="block text-sm text-ink-soft">Đựng trong chai nhựa có nắp, shipper thu khi giao hàng.</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-leaf/10 p-4 hover:border-leaf/30">
                <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="mt-1 accent-leaf" />
                <Gift className="mt-0.5 size-5 shrink-0 text-flame" />
                <span>
                  <span className="block font-medium">Gói quà giấy kraft + thiệp viết tay (+{formatVND(GIFT_WRAP)})</span>
                  <span className="block text-sm text-ink-soft">Lời chúc ghi ở ô “Ghi chú” phía trên.</span>
                </span>
              </label>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-[28px] bg-white p-6 ring-1 ring-leaf/10 lg:sticky lg:top-32">
          <h2 className="text-lg font-bold">Đơn hàng ({items.reduce((s, i) => s + i.qty, 0)})</h2>
          <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto">
            {items.map((i) => {
              const p = getProduct(i.slug)!;
              return (
                <li key={`${i.slug}-${i.size}`} className="flex items-center gap-3">
                  <span className="relative size-14 shrink-0 rounded-xl" style={{ background: p.wax }}>
                    <CandleArt product={p} className="size-full p-1" lit={false} />
                    <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-leaf text-[10px] font-bold text-white">{i.qty}</span>
                  </span>
                  <span className="flex-1 text-sm">
                    <span className="block font-semibold">{p.name}</span>
                    <span className="text-ink-soft">{SIZES.find((s) => s.id === i.size)!.label}</span>
                  </span>
                  <span className="text-sm font-semibold">{formatVND(priceFor(p, i.size) * i.qty)}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex gap-2">
            <label className="relative flex-1">
              <Ticket className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Mã giảm giá" className="w-full rounded-full bg-cream py-2.5 pl-9 pr-3 text-sm uppercase outline-none ring-1 ring-leaf/15 focus:ring-leaf/50" />
            </label>
            <button type="button" onClick={applyCoupon} className="rounded-full bg-ink px-4 text-sm font-semibold text-white hover:bg-leaf">Áp dụng</button>
          </div>
          {coupon && <p className="mt-2 flex items-center gap-1 text-xs font-medium text-leaf"><Check className="size-3.5" /> {COUPONS[coupon].label}</p>}
          {couponError && <p className="mt-2 text-xs text-red-600">{couponError}</p>}

          <dl className="mt-5 space-y-2.5 border-t border-leaf/10 pt-5 text-sm">
            <div className="flex justify-between"><dt className="text-ink-soft">Tạm tính</dt><dd>{formatVND(subtotal)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-leaf"><dt>Mã {coupon}</dt><dd>-{formatVND(discount)}</dd></div>}
            {oilVoucher > 0 && <div className="flex justify-between text-leaf"><dt>Đổi dầu ăn cũ</dt><dd>-{formatVND(oilVoucher)}</dd></div>}
            <div className="flex justify-between"><dt className="text-ink-soft">Giao hàng</dt><dd>{shipping ? formatVND(shipping) : "Miễn phí"}</dd></div>
            {gift && <div className="flex justify-between"><dt className="text-ink-soft">Gói quà</dt><dd>{formatVND(GIFT_WRAP)}</dd></div>}
            <div className="flex justify-between border-t border-leaf/10 pt-3 text-base"><dt className="font-bold">Tổng thanh toán</dt><dd className="text-2xl font-extrabold text-leaf-dark">{formatVND(total)}</dd></div>
          </dl>

          <button type="submit" disabled={submitting} className="mt-6 w-full rounded-full bg-leaf py-4 font-semibold text-white shadow-lg shadow-leaf/25 transition hover:bg-leaf-dark disabled:opacity-60">
            {submitting ? "Đang xử lý…" : "Đặt hàng"}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-soft">
            <ShieldCheck className="size-3.5" /> Thông tin của bạn được bảo mật
          </p>
        </aside>
      </div>
    </form>
  );
}
