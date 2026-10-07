"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  QrCode,
  Recycle,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import CandleArt from "@/components/CandleArt";
import {
  COUPONS,
  FREE_SHIP_FROM,
  SHIPPING_FEE,
  useCart,
} from "@/lib/cart";
import { SIZES, formatVND, getProduct, priceFor } from "@/lib/products";

export default function CartPage() {
  const { items, setQty, remove, clear, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [oilReturn, setOilReturn] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "qr">("qr");
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Customer Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const discountPct = appliedCoupon && COUPONS[appliedCoupon] ? COUPONS[appliedCoupon].pct : 0;
  const discountAmount = Math.round((subtotal * discountPct) / 100);
  const isFreeShip = subtotal >= FREE_SHIP_FROM;
  const shippingFee = isFreeShip || items.length === 0 ? 0 : SHIPPING_FEE;
  const oilDiscount = oilReturn ? 30000 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee - oilDiscount);

  const neededForFreeShip = Math.max(0, FREE_SHIP_FROM - subtotal);
  const freeShipProgress = Math.min(100, Math.round((subtotal / FREE_SHIP_FROM) * 100));

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError("");
    } else {
      setCouponError("Mã giảm giá không hợp lệ. Thử mã: XANH10 hoặc LUVIA15");
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Vui lòng điền đầy đủ tên, số điện thoại và địa chỉ giao hàng!");
      return;
    }
    setOrderSuccess(true);
    clear();
  };

  if (orderSuccess) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-leaf-soft text-leaf">
          <CheckCircle2 className="size-10" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-ink">Đặt hàng thành công!</h1>
        <p className="mt-3 text-base text-ink-soft">
          Cảm ơn bạn đã đồng hành lan tỏa ánh sáng xanh cùng Luvia. Chúng mình đã nhận được đơn hàng và sẽ liên hệ xác nhận trong ít phút.
        </p>

        {paymentMethod === "qr" && (
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-leaf/10 text-center">
            <p className="text-sm font-bold text-leaf">Quét mã VietQR để thanh toán nhanh:</p>
            <div className="mx-auto mt-4 size-48 rounded-2xl bg-cream flex items-center justify-center p-3 border border-leaf/20">
              <Image
                src={`https://api.vietqr.io/image/970422-0988123456-compact2.jpg?amount=${finalTotal}&addInfo=LUVIA%20${phone}&accountName=LUVIA%20CANDLE`}
                alt="Mã VietQR Luvia"
                width={180}
                height={180}
                className="rounded-xl object-contain"
                unoptimized
              />
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              Số tiền: <b className="text-ink">{formatVND(finalTotal)}</b> · Cú pháp: <b>LUVIA {phone}</b>
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-leaf px-8 py-3.5 font-bold text-white shadow-md hover:bg-leaf-dark"
          >
            Quay lại trang chủ
          </Link>
          <Link
            href="/san-pham"
            className="rounded-full border-2 border-leaf bg-white px-7 py-3.5 font-bold text-leaf hover:bg-cream"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-cream text-leaf">
          <ShoppingBag className="size-10 opacity-40" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-ink">Giỏ hàng của bạn đang trống</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Chưa có ngọn nến nào được chọn. Hãy ghé thăm cửa hàng để chọn mùi hương yêu thích nhé!
        </p>
        <div className="mt-8">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 rounded-full bg-leaf px-8 py-3.5 font-bold text-white shadow-md hover:bg-leaf-dark"
          >
            Khám phá các mùi hương ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold text-ink">Giỏ hàng & Thanh toán</h1>

      {/* THANH MIỄN PHÍ VẬN CHUYỂN */}
      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-leaf/10">
        <div className="flex items-center justify-between text-xs font-semibold sm:text-sm">
          <span className="flex items-center gap-1.5 text-leaf">
            <Truck className="size-4" />
            {isFreeShip ? "Đơn hàng của bạn đã được MIỄN PHÍ vận chuyển!" : `Mua thêm ${formatVND(neededForFreeShip)} để được FREESHIP`}
          </span>
          <span className="text-ink-soft">{freeShipProgress}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cream">
          <div className="h-full bg-leaf transition-all duration-300" style={{ width: `${freeShipProgress}%` }} />
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* DANH SÁCH SẢN PHẨM */}
        <div className="space-y-4">
          <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-leaf/10">
            <h2 className="text-lg font-bold text-ink mb-4">Các sản phẩm đã chọn ({items.length})</h2>
            <div className="divide-y divide-leaf/10">
              {items.map((item) => {
                const product = getProduct(item.slug);
                if (!product) return null;
                const sizeInfo = SIZES.find((s) => s.id === item.size) || SIZES[1];
                const unitPrice = priceFor(product, item.size);

                return (
                  <div key={`${item.slug}-${item.size}`} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="size-20 shrink-0 overflow-hidden rounded-2xl bg-cream flex items-center justify-center p-2">
                      <CandleArt product={product} className="h-full w-auto" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link href={`/san-pham/${product.slug}`} className="font-bold text-ink hover:text-leaf truncate block">
                        {product.name}
                      </Link>
                      <p className="text-xs text-ink-soft">Size: {sizeInfo.label}</p>
                      <p className="mt-1 text-sm font-bold text-leaf">{formatVND(unitPrice)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-full bg-cream ring-1 ring-leaf/15">
                        <button
                          onClick={() => setQty(item.slug, item.size, item.qty - 1)}
                          className="grid size-7 place-items-center text-ink hover:text-leaf"
                          aria-label="Giảm"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-ink">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.slug, item.size, item.qty + 1)}
                          className="grid size-7 place-items-center text-ink hover:text-leaf"
                          aria-label="Tăng"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => remove(item.slug, item.size)}
                        className="grid size-8 place-items-center text-ink-soft hover:text-red-500"
                        aria-label="Xoá"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MÃ GIẢM GIÁ & CHƯƠNG TRÌNH ĐỔI DẦU */}
          <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-leaf/10 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                Mã giảm giá
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Nhập XANH10 hoặc LUVIA15"
                  className="flex-1 rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-sm uppercase focus:border-leaf focus:outline-none"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="rounded-2xl bg-leaf px-5 py-2.5 text-sm font-bold text-white hover:bg-leaf-dark"
                >
                  Áp dụng
                </button>
              </div>
              {couponError && <p className="mt-1.5 text-xs text-red-500">{couponError}</p>}
              {appliedCoupon && (
                <p className="mt-1.5 text-xs font-bold text-leaf">
                  ✓ Đã áp dụng mã {appliedCoupon} (Giảm {discountPct}%)
                </p>
              )}
            </div>

            <div className="border-t border-leaf/10 pt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={oilReturn}
                  onChange={(e) => setOilReturn(e.target.checked)}
                  className="mt-1 size-4 rounded accent-leaf"
                />
                <div className="text-xs">
                  <span className="font-bold text-leaf flex items-center gap-1">
                    <Recycle className="size-3.5" /> Tôi có 1 chai dầu ăn cũ gửi shipper mang về
                  </span>
                  <p className="text-ink-soft mt-0.5">
                    Được trừ trực tiếp <b>30.000₫</b> vào đơn hàng này và cùng Luvia giữ sạch nguồn nước!
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* FORM THÔNG TIN & TỔNG TIỀN */}
        <form onSubmit={handleCheckout} className="space-y-6">
          <div className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-leaf/10">
            <h2 className="text-lg font-bold text-ink mb-4">Thông tin giao hàng</h2>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Họ và tên người nhận *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-sm focus:border-leaf focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912 345 678"
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-sm focus:border-leaf focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Địa chỉ nhận hàng chi tiết *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, ngõ, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-sm focus:border-leaf focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Ghi chú giao hàng</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                  className="w-full rounded-2xl border border-leaf/20 bg-cream px-4 py-2.5 text-sm focus:border-leaf focus:outline-none"
                />
              </div>
            </div>

            {/* HÌNH THỨC THANH TOÁN */}
            <div className="mt-5 border-t border-leaf/10 pt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                Phương thức thanh toán
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("qr")}
                  className={`rounded-2xl p-3 text-center border font-bold transition ${
                    paymentMethod === "qr"
                      ? "border-leaf bg-leaf-soft text-leaf"
                      : "border-leaf/20 bg-cream text-ink-soft"
                  }`}
                >
                  <QrCode className="mx-auto size-5 mb-1" /> Quét VietQR (Khuyên dùng)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`rounded-2xl p-3 text-center border font-bold transition ${
                    paymentMethod === "cod"
                      ? "border-leaf bg-leaf-soft text-leaf"
                      : "border-leaf/20 bg-cream text-ink-soft"
                  }`}
                >
                  <Truck className="mx-auto size-5 mb-1" /> Thanh toán khi nhận (COD)
                </button>
              </div>
            </div>

            {/* TỔNG KẾT ĐƠN HÀNG */}
            <div className="mt-6 border-t border-leaf/10 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>Tạm tính</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-leaf font-semibold">
                  <span>Giảm giá ({discountPct}%)</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              {oilDiscount > 0 && (
                <div className="flex justify-between text-leaf font-semibold">
                  <span>Ưu đãi đổi dầu ăn</span>
                  <span>-{formatVND(oilDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-ink-soft">
                <span>Phí vận chuyển</span>
                <span>{shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-leaf/10 pt-3 text-base font-extrabold text-ink">
                <span>Tổng thanh toán</span>
                <span className="text-2xl text-leaf-dark">{formatVND(finalTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-leaf py-4 font-bold text-white shadow-lg shadow-leaf/25 transition hover:bg-leaf-dark active:scale-95"
            >
              Xác nhận đặt hàng ({formatVND(finalTotal)})
            </button>

            <a
              href="https://zalo.me/0988123456"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full rounded-full border-2 border-leaf bg-white py-3 text-center text-xs font-bold text-leaf hover:bg-cream transition"
            >
              💬 Hoặc Nhắn Zalo Đặt Hàng Nhanh (0988 123 456)
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
