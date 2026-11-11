"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Clock, RefreshCw, Truck } from "lucide-react";
import { useOrderStatus } from "@/lib/checkout";
import { formatVND } from "@/lib/pricing";
import { BANK_TRANSFER_DEADLINE_MINUTES } from "@/lib/site";
import { useTheme } from "@/lib/themeContext";
import { CHECKOUT, CLOSING, ORDER_STATUS, fill } from "@/content/vi";

const VIEW_ICON = {
  awaiting_payment: Clock,
  paid: CheckCircle2,
  cod: Truck,
  failed: AlertCircle,
} as const;

export default function OrderStatusClient({ code }: { code: string }) {
  const s = useOrderStatus(code);
  const { is3D } = useTheme();
  const [phone, setPhone] = useState("");
  const [lookupError, setLookupError] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);

  // Đồng hồ đếm ngược mã QR. Chỉ chạy với đơn chuyển khoản đang chờ thanh toán.
  const [now, setNow] = useState(() => Date.now());
  // Khách bấm "Tạo mã mới" → gia hạn thêm 5 phút ở phía giao diện. Mã QR không đổi
  // (VietQR không có hạn thật), đơn hàng cũng không bị đụng tới.
  const [renewedAt, setRenewedAt] = useState<number | null>(null);
  const counting = s.view === "awaiting_payment" && Boolean(s.order?.transfer);

  useEffect(() => {
    if (!counting) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [counting]);

  const panel = `rounded-3xl bg-white p-6 sm:p-8 ${is3D ? "clay-card" : "shadow-sm ring-1 ring-leaf/10"}`;

  if (!s.loaded) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className={`${panel} h-48 animate-pulse`} />
      </div>
    );
  }

  // Mở link trên máy khác → tra cứu bằng số điện thoại đặt hàng
  if (!s.order) {
    const handleLookup = async (e: React.FormEvent) => {
      e.preventDefault();
      setLookingUp(true);
      setLookupError(false);
      const ok = await s.lookup(phone.trim());
      setLookupError(!ok);
      setLookingUp(false);
    };

    return (
      <div className="mx-auto max-w-lg px-4 py-20 sm:px-6">
        <div className={panel}>
          <h1 className="text-xl font-extrabold text-ink">
            {ORDER_STATUS.labels.code}: {code}
          </h1>
          <p className="mt-3 text-sm text-ink-soft">{ORDER_STATUS.notFound}</p>
          <form onSubmit={handleLookup} className="mt-6">
            <label htmlFor="lookup-phone" className="mb-1 block text-xs font-bold text-ink">
              {ORDER_STATUS.lookupPhone}
            </label>
            <input
              id="lookup-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-leaf/20 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-leaf"
            />
            {lookupError && <p className="mt-2 text-xs text-flame-dark">{ORDER_STATUS.notFound}</p>}
            <button
              type="submit"
              disabled={lookingUp}
              className={`mt-4 w-full py-3 font-bold text-white transition disabled:opacity-50 ${
                is3D ? "clay-btn-leaf" : "rounded-full bg-leaf hover:bg-leaf-dark"
              }`}
            >
              {lookingUp ? "Đang kiểm tra…" : ORDER_STATUS.lookup}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const order = s.order;
  const Icon = s.view ? VIEW_ICON[s.view] : Clock;
  const transfer = order.transfer;

  const remaining = transfer
    ? Math.max(0, (renewedAt ?? Date.parse(transfer.deadline)) - now)
    : 0;
  const expired = remaining <= 0;
  const mmss = `${Math.floor(remaining / 60_000)}:${String(Math.floor(remaining / 1000) % 60).padStart(2, "0")}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Trạng thái */}
      <div className={`${panel} text-center`}>
        <Icon className={`mx-auto size-12 ${s.view === "failed" ? "text-flame-dark" : "text-leaf"}`} />
        <p className="mt-5 text-lg font-bold text-ink">{s.message}</p>
        <p className="mt-2 font-mono text-sm text-ink-soft">
          {ORDER_STATUS.labels.code}: <b className="text-ink">{order.code}</b>
        </p>
        <button
          type="button"
          onClick={() => void s.refresh()}
          disabled={s.refreshing}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2 text-xs font-semibold text-ink-soft transition hover:text-leaf disabled:opacity-50"
        >
          <RefreshCw className={`size-3.5 ${s.refreshing ? "animate-spin" : ""}`} /> Cập nhật trạng thái
        </button>
      </div>

      {/* Hướng dẫn chuyển khoản */}
      {transfer && s.view === "awaiting_payment" && (
        <div className={`${panel} mt-6`}>
          <h2 className="text-lg font-extrabold text-ink">Hướng dẫn chuyển khoản</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
            {transfer.qrUrl && (
              <div className="mx-auto w-[200px]">
                <div className="relative">
                  <Image
                    src={transfer.qrUrl}
                    alt={`Mã QR chuyển khoản đơn ${order.code}`}
                    width={200}
                    height={260}
                    unoptimized
                    className={`rounded-2xl ring-1 ring-leaf/15 ${expired ? "blur-[3px]" : ""}`}
                  />
                  {expired && <div className="absolute inset-0 rounded-2xl bg-white/60" />}
                </div>

                {expired ? (
                  <>
                    <p className="mt-3 text-center text-xs font-semibold text-flame-dark">
                      {ORDER_STATUS.expired}
                    </p>
                    <button
                      type="button"
                      onClick={() => setRenewedAt(Date.now() + BANK_TRANSFER_DEADLINE_MINUTES * 60_000)}
                      className={`mt-2 w-full py-2 text-xs font-bold text-white transition ${
                        is3D ? "clay-btn-leaf" : "rounded-full bg-leaf hover:bg-leaf-dark"
                      }`}
                    >
                      {ORDER_STATUS.regenerate}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mt-3 text-center text-sm font-bold text-leaf-dark">
                      {fill(ORDER_STATUS.countdown, { time: mmss })}
                    </p>
                    <p className="mt-1 text-center text-[11px] leading-snug text-ink-soft">
                      {ORDER_STATUS.scanHint}
                    </p>
                  </>
                )}
              </div>
            )}
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Ngân hàng</dt>
                <dd className="text-right font-medium text-ink">{transfer.bankName || "Đang cập nhật"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Số tài khoản</dt>
                <dd className="text-right font-mono font-medium text-ink">{transfer.account || "Đang cập nhật"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Chủ tài khoản</dt>
                <dd className="text-right font-medium text-ink">{transfer.accountName || "Đang cập nhật"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Số tiền</dt>
                <dd className="text-right font-bold text-leaf-dark">{formatVND(transfer.amount)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">{ORDER_STATUS.labels.transferContent}</dt>
                <dd className="text-right font-mono font-bold text-ink">{transfer.content}</dd>
              </div>
              {/* Hạn thanh toán nay là đồng hồ đếm ngược ngay dưới mã QR — in ngày giờ
                  đầy đủ cho một mốc chỉ cách 5 phút thì vừa thừa vừa khó đọc. */}
            </dl>
          </div>
        </div>
      )}

      {/* Chi tiết đơn */}
      <div className={`${panel} mt-6`}>
        <h2 className="text-lg font-extrabold text-ink">{ORDER_STATUS.labels.items}</h2>
        <ul className="mt-4 divide-y divide-leaf/10">
          {order.lines.map((l, i) => (
            <li key={i} className="flex justify-between gap-3 py-3 text-sm">
              <div className="min-w-0">
                <p className="font-medium text-ink">{l.title}</p>
                <p className="text-xs text-ink-soft">
                  {l.variant}
                  {l.box ? ` · ${l.box}` : ""} · SL {l.qty}
                  {l.isPreorder ? ` · ${CHECKOUT.preorderNote}` : ""}
                </p>
                {l.message && <p className="mt-0.5 text-xs italic text-ink-soft">&quot;{l.message}&quot;</p>}
              </div>
              <span className="shrink-0 font-semibold text-ink">{formatVND(l.total)}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2 border-t border-leaf/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">{CHECKOUT.totals.subtotal}</dt>
            <dd className="font-medium text-ink">{formatVND(order.totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">{CHECKOUT.totals.shipping}</dt>
            <dd className="font-medium text-ink">{formatVND(order.totals.shipping)}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-leaf/10 pt-3">
            <dt className="font-bold text-ink">{ORDER_STATUS.labels.total}</dt>
            <dd className="text-xl font-extrabold text-leaf-dark">{formatVND(order.totals.total)}</dd>
          </div>
        </dl>

        <dl className="mt-6 space-y-2 border-t border-leaf/10 pt-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">{ORDER_STATUS.labels.address}</dt>
            <dd className="text-right font-medium text-ink">
              {order.customer.name} · {order.customer.phone}
              <br />
              {order.customer.address}, {order.customer.province}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">{ORDER_STATUS.labels.orderStatus}</dt>
            <dd className="text-right font-medium text-ink">{order.orderStatus}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">{ORDER_STATUS.labels.paymentStatus}</dt>
            <dd className="text-right font-medium text-ink">
              {order.paymentStatus} · {order.paymentLabel}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">{ORDER_STATUS.labels.eta}</dt>
            <dd className="text-right font-medium text-ink">
              {[order.eta.prep && `${CHECKOUT.shipping.prep} ${order.eta.prep}`, order.eta.transit && `giao ${order.eta.transit}`]
                .filter(Boolean)
                .join(" + ") || "Đang cập nhật"}
            </dd>
          </div>
        </dl>
      </div>

      <Link
        href={CLOSING.primary.href}
        className={`mt-8 flex items-center justify-center py-3.5 font-bold text-white transition ${
          is3D ? "clay-btn-leaf" : "rounded-full bg-leaf hover:bg-leaf-dark"
        }`}
      >
        {ORDER_STATUS.continue}
      </Link>
    </div>
  );
}
