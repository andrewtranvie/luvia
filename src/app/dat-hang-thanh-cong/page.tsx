"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PackageCheck } from "lucide-react";
import type { Order } from "@/lib/cart";
import { SIZES, formatVND } from "@/lib/products";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("luvia-last-order");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read saved order once
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  if (!loaded) return <div className="min-h-[50vh]" />;

  if (!order)
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold">Không tìm thấy đơn hàng</h1>
        <Link href="/san-pham" className="mt-6 inline-block rounded-full bg-leaf px-7 py-3 font-semibold text-white">Về cửa hàng</Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <Image src="/brand/exp-love.jpg" alt="Luvia vui mừng" width={160} height={190} className="mx-auto size-36 rounded-full object-cover ring-8 ring-white" />
        <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">Cảm ơn bạn đã thắp sáng cùng Luvia!</h1>
        <p className="mt-3 text-ink-soft">
          Đơn hàng <b className="text-leaf">#{order.id}</b> đã được ghi nhận. Luvia sẽ gọi xác nhận qua số {order.customer.phone} trong
          vòng 24 giờ.
        </p>
        <p className="mt-2 font-hand text-xl text-flame-dark">Bạn vừa góp phần giữ sạch thêm một dòng sông 🌿</p>
      </div>

      <div className="mt-10 rounded-[28px] bg-white p-6 ring-1 ring-leaf/10">
        <h2 className="flex items-center gap-2 font-bold"><PackageCheck className="size-5 text-leaf" /> Chi tiết đơn hàng</h2>
        <ul className="mt-4 divide-y divide-leaf/10">
          {order.items.map((i) => (
            <li key={`${i.slug}-${i.size}`} className="flex justify-between py-3 text-sm">
              <span>
                {i.name} <span className="text-ink-soft">· {SIZES.find((s) => s.id === i.size)?.label} × {i.qty}</span>
              </span>
              <span className="font-semibold">{formatVND(i.unitPrice * i.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-2 border-t border-leaf/10 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-ink-soft">Tạm tính</dt><dd>{formatVND(order.subtotal)}</dd></div>
          {order.discount > 0 && <div className="flex justify-between text-leaf"><dt>Giảm giá</dt><dd>-{formatVND(order.discount)}</dd></div>}
          <div className="flex justify-between"><dt className="text-ink-soft">Giao hàng & dịch vụ</dt><dd>{order.shipping ? formatVND(order.shipping) : "Miễn phí"}</dd></div>
          <div className="flex justify-between text-base font-bold"><dt>Tổng</dt><dd className="text-leaf-dark">{formatVND(order.total)}</dd></div>
        </dl>
        <div className="mt-5 grid gap-4 rounded-2xl bg-cream p-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-ink-soft">Giao đến</p>
            <p className="font-medium">{order.customer.name}</p>
            <p>{order.customer.address}</p>
          </div>
          <div>
            <p className="text-ink-soft">Thanh toán</p>
            <p className="font-medium">{order.payment}</p>
            {order.oilReturn && <p className="mt-1 text-leaf">♻ Nhớ chuẩn bị 1 lít dầu ăn cũ cho shipper nhé!</p>}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/san-pham" className="rounded-full bg-leaf px-7 py-3.5 text-center font-semibold text-white hover:bg-leaf-dark">Tiếp tục mua sắm</Link>
        <Link href="/cau-chuyen" className="rounded-full border-2 border-leaf px-7 py-3 text-center font-semibold text-leaf hover:bg-leaf hover:text-white">Đọc câu chuyện Luvia</Link>
      </div>
    </div>
  );
}
