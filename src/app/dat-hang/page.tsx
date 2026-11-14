"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { useCheckout } from "@/lib/checkout";
import { formatVND } from "@/lib/pricing";
import { useTheme } from "@/lib/themeContext";
import { CART, CHECKOUT } from "@/content/vi";
import type { CustomerInfo } from "@/lib/orders";

export default function CheckoutPage() {
  const co = useCheckout();
  const router = useRouter();
  const { is3D } = useTheme();

  const panel = `rounded-3xl bg-white p-6 sm:p-8 ${is3D ? "clay-card" : "shadow-sm ring-1 ring-leaf/10"}`;
  const field = "w-full rounded-xl border border-leaf/20 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-leaf";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await co.placeOrder();
    if (r.ok) router.push(r.href);
  };

  if (!co.ready) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className={`${panel} h-56 animate-pulse`} />
      </div>
    );
  }

  if (co.isEmpty) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className={panel}>
          <ShoppingBag className="mx-auto size-10 text-leaf" />
          <p className="mt-5 font-hand text-2xl text-leaf-dark">{CART.empty}</p>
          <Link
            href={CART.emptyCta.href}
            className={`mt-7 inline-flex px-6 py-3 font-bold text-white transition ${
              is3D ? "clay-btn-leaf" : "rounded-full bg-leaf hover:bg-leaf-dark"
            }`}
          >
            {CART.emptyCta.label}
          </Link>
        </div>
      </div>
    );
  }

  // Trường nhập thông tin nhận hàng
  const textFields: { key: keyof CustomerInfo; required: boolean; type?: string; autoComplete?: string }[] = [
    { key: "name", required: true, autoComplete: "name" },
    { key: "phone", required: true, type: "tel", autoComplete: "tel" },
    { key: "email", required: false, type: "email", autoComplete: "email" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/gio-hang" className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-leaf">
        <ArrowLeft className="size-4" /> {CHECKOUT.help}
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">{CHECKOUT.title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">{CHECKOUT.body}</p>

      {!co.salesOpen && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-flame-soft p-4 text-sm text-flame-dark">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <p>{CHECKOUT.salesClosed}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="space-y-6">
          {/* Thông tin nhận hàng */}
          <section className={panel}>
            <h2 className="text-lg font-extrabold text-ink">{CHECKOUT.sections.customer}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {textFields.map((f) => (
                <div key={f.key} className={f.key === "email" ? "sm:col-span-2" : ""}>
                  <label htmlFor={f.key} className="mb-1 block text-xs font-bold text-ink">
                    {CHECKOUT.fields[f.key]} {f.required && <span className="text-flame-dark">*</span>}
                  </label>
                  <input
                    id={f.key}
                    type={f.type ?? "text"}
                    autoComplete={f.autoComplete}
                    value={co.form[f.key]}
                    onChange={(e) => co.setField(f.key, e.target.value)}
                    aria-invalid={Boolean(co.errors[f.key])}
                    className={field}
                  />
                  {co.errors[f.key] && <p className="mt-1 text-xs text-flame-dark">{co.errors[f.key]}</p>}
                </div>
              ))}

              <div>
                <label htmlFor="province" className="mb-1 block text-xs font-bold text-ink">
                  {CHECKOUT.fields.province} <span className="text-flame-dark">*</span>
                </label>
                <select
                  id="province"
                  value={co.form.province}
                  onChange={(e) => co.setField("province", e.target.value)}
                  aria-invalid={Boolean(co.errors.province)}
                  className={field}
                >
                  <option value="">{CHECKOUT.shipping.chooseProvince}</option>
                  {co.provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {co.errors.province && <p className="mt-1 text-xs text-flame-dark">{co.errors.province}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="mb-1 block text-xs font-bold text-ink">
                  {CHECKOUT.fields.address} <span className="text-flame-dark">*</span>
                </label>
                <input
                  id="address"
                  autoComplete="street-address"
                  value={co.form.address}
                  onChange={(e) => co.setField("address", e.target.value)}
                  aria-invalid={Boolean(co.errors.address)}
                  className={field}
                />
                {co.errors.address && <p className="mt-1 text-xs text-flame-dark">{co.errors.address}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="note" className="mb-1 block text-xs font-bold text-ink">
                  {CHECKOUT.fields.note}
                </label>
                <textarea
                  id="note"
                  rows={2}
                  value={co.form.note}
                  onChange={(e) => co.setField("note", e.target.value)}
                  className={field}
                />
              </div>
            </div>
          </section>

          {/* Giao hàng */}
          <section className={panel}>
            <h2 className="text-lg font-extrabold text-ink">{CHECKOUT.sections.shipping}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">{CHECKOUT.shipping.fee}</dt>
                <dd className={co.totals.freeShipping ? "font-bold text-leaf-dark" : "font-medium text-ink"}>
                  {!co.totals.shippingKnown
                    ? CHECKOUT.shipping.chooseProvince
                    : co.totals.freeShipping
                      ? CHECKOUT.totals.freeShipping
                      : formatVND(co.totals.shipping)}
                </dd>
              </div>
              {co.delivery.prep && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">{CHECKOUT.shipping.prep}</dt>
                  <dd className="font-medium text-ink">{co.delivery.prep}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">{CHECKOUT.shipping.transit}</dt>
                <dd className="font-medium text-ink">
                  {co.delivery.transit ?? CHECKOUT.shipping.chooseProvince}
                </dd>
              </div>
            </dl>
          </section>

          {/* Thanh toán */}
          <section className={panel}>
            <h2 className="text-lg font-extrabold text-ink">{CHECKOUT.sections.payment}</h2>
            <div className="mt-4 space-y-3">
              {co.payments.map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl p-4 text-sm transition ${
                    co.payment === m.id ? "bg-leaf-soft/60 ring-2 ring-leaf" : "bg-cream/50 ring-1 ring-leaf/10 hover:bg-cream"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={co.payment === m.id}
                    onChange={() => co.setPayment(m.id)}
                    className="accent-leaf"
                  />
                  <span className="font-medium text-ink">{m.label}</span>
                </label>
              ))}
            </div>
            {co.errors.payment && <p className="mt-2 text-xs text-flame-dark">{co.errors.payment}</p>}
          </section>
        </div>

        {/* Kiểm tra đơn */}
        <aside className={`${panel} lg:sticky lg:top-28`}>
          <h2 className="text-lg font-extrabold text-ink">{CHECKOUT.sections.review}</h2>

          <ul className="mt-4 divide-y divide-leaf/10">
            {co.lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-3 py-3 text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-ink">{l.info.title}</p>
                  <p className="text-xs text-ink-soft">
                    {l.info.netWeight ?? l.info.variant}
                    {l.info.box ? ` · ${l.info.box}` : ""} · SL {l.qty}
                    {l.info.isPreorder ? ` · ${CHECKOUT.preorderNote}` : ""}
                  </p>
                </div>
                <span className="shrink-0 font-semibold text-ink">{formatVND(l.total)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 border-t border-leaf/10 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">{CHECKOUT.totals.subtotal}</dt>
              <dd className="font-medium text-ink">{formatVND(co.totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">{CHECKOUT.totals.shipping}</dt>
              <dd className={co.totals.freeShipping ? "font-bold text-leaf-dark" : "font-medium text-ink"}>
                {!co.totals.shippingKnown
                  ? "—"
                  : co.totals.freeShipping
                    ? CHECKOUT.totals.freeShipping
                    : formatVND(co.totals.shipping)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-leaf/10 pt-3">
              <dt className="font-bold text-ink">{CHECKOUT.totals.total}</dt>
              <dd className="text-xl font-extrabold text-leaf-dark">{formatVND(co.totals.total)}</dd>
            </div>
          </dl>

          <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-xs text-ink-soft">
            <input
              type="checkbox"
              checked={co.agreed}
              onChange={(e) => co.setAgreed(e.target.checked)}
              className="mt-0.5 accent-leaf"
            />
            <span>{CHECKOUT.agree}</span>
          </label>
          {co.errors.agree && <p className="mt-1 text-xs text-flame-dark">{co.errors.agree}</p>}

          {co.submitError && (
            <p className="mt-4 flex items-start gap-2 rounded-xl bg-flame-soft p-3 text-xs text-flame-dark">
              <AlertCircle className="mt-0.5 size-3.5 shrink-0" /> {co.submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={co.submitting || !co.salesOpen}
            /* Trước đây nút là flex 2 cột (icon | chữ) và không có đệm trái–phải, nên với nhãn dài
               nhất — "Đặt hàng & xem hướng dẫn chuyển khoản" — ở 390px icon bị đẩy dính sát mép
               trái, tách hẳn khỏi khối chữ. Chuyển sang một dòng văn bản căn giữa, icon đi inline
               ngay trước chữ, nên icon và chữ luôn là một khối. text-balance để hai dòng dài bằng
               nhau (trước: 250px / 45px, mỗi chữ "khoản" nằm trơ một mình ở dòng dưới). */
            className={`mt-5 block w-full px-5 py-3.5 text-center leading-snug font-bold text-balance text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
              is3D ? "clay-btn-leaf" : "rounded-full bg-leaf shadow-lg shadow-leaf/25 hover:bg-leaf-dark"
            }`}
          >
            {co.submitting ? (
              <Loader2 className="mr-2 inline-block size-4 animate-spin align-[-3px]" />
            ) : (
              <ShoppingBag className="mr-2 inline-block size-4 align-[-3px]" />
            )}
            {co.submitLabel}
          </button>

          <Link href="/gio-hang" className="mt-3 block text-center text-xs font-semibold text-ink-soft hover:text-leaf">
            {CART.title}
          </Link>
        </aside>
      </form>
    </div>
  );
}
