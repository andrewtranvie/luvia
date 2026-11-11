"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { useShopCart } from "@/lib/shop-cart";
import { NAV } from "@/content/vi";

/**
 * Port 1:1 của header trong bản thiết kế Stitch (luvia_trang_ch/code.html):
 * thanh thông báo mảnh phía trên + thanh điều hướng dạng viên thuốc trắng nổi
 * trên nền surface xanh nhạt.
 */
export default function Header() {
  const pathname = usePathname();
  const shopCart = useShopCart();
  const count = shopCart?.count ?? 0;
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (shopCart?.lastAdded) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 450);
      return () => clearTimeout(t);
    }
  }, [shopCart?.lastAdded]);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return path !== "/" && path !== "" && pathname.startsWith(path);
  };

  // bg-surface = đúng màu nền trang: ở đầu trang không lộ dải nào, nhưng khi cuộn thì
  // nội dung bị che hẳn thay vì xuyên qua khoảng trống quanh viên thuốc điều hướng.
  return (
    <header className="sticky top-0 z-50 bg-surface">
      <div className="flex items-center justify-center gap-space-sm bg-surface-container px-margin-mobile py-space-xs text-center text-label-sm text-on-surface-variant shadow-[0_1px_4px_rgba(46,58,34,0.04)] sm:px-margin">
        <span className="size-2 shrink-0 animate-pulse rounded-full bg-secondary-container" />
        <span>{NAV.announcement}</span>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-margin-mobile sm:px-margin">
        <div className="flex w-full items-center justify-between rounded-full bg-surface-container-lowest/80 px-space-md py-space-sm backdrop-blur-xl clay-raise sm:px-space-lg">
          <Link href="/" className="group flex items-center gap-space-sm" aria-label="Luvia — trang chủ">
            <Image
              src="/brand/logo-icon.png"
              alt=""
              width={444}
              height={524}
              className="h-10 w-auto shrink-0 transition group-hover:rotate-6"
              priority
            />
            <Image
              src="/brand/logo-wordmark.png"
              alt="Luvia"
              width={732}
              height={170}
              className="h-[21px] w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-space-xs p-space-xs lg:flex" aria-label="Điều hướng chính">
            {NAV.menu.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-space-md py-space-sm text-label-md transition-all ${
                  isActive(n.href)
                    ? "bg-surface-container-high font-bold text-on-surface"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-space-sm sm:gap-space-md">
            <Link
              href="/gio-hang"
              aria-label={`Giỏ hàng (${count} sản phẩm)`}
              className={`relative grid size-10 place-items-center rounded-full bg-surface-container-low text-on-surface-variant transition-all clay-inset hover:bg-surface-container hover:text-on-surface ${
                bump ? "scale-110" : ""
              }`}
            >
              <Icon name="shopping_bag" className="text-[20px]" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-secondary-container text-label-sm font-bold text-on-secondary-container shadow-[0_2px_6px_rgba(242,169,59,0.4)]">
                  {count}
                </span>
              )}
            </Link>

            <Link
              href={NAV.cta.href}
              className="hidden items-center justify-center whitespace-nowrap rounded-full bg-primary-container px-space-lg py-space-sm text-label-md text-on-primary transition-all clay-press hover:bg-primary active:translate-y-0.5 sm:inline-flex"
            >
              {NAV.cta.label}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full bg-surface-container-low text-on-surface-variant clay-inset lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="text-[20px]" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          className="mx-auto max-w-7xl px-margin-mobile pb-space-md lg:hidden sm:px-margin"
          aria-label="Điều hướng di động"
        >
          <div className="flex flex-col gap-space-xs rounded-clay-lg bg-surface-container-lowest p-space-md clay-raise">
            {NAV.menu.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-space-md py-space-sm text-label-lg ${
                  isActive(n.href)
                    ? "bg-surface-container-high font-bold text-on-surface"
                    : "text-on-surface-variant"
                }`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href={NAV.cta.href}
              className="mt-space-xs inline-flex items-center justify-center rounded-full bg-primary-container px-space-lg py-space-sm text-label-lg text-on-primary clay-press"
            >
              {NAV.cta.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
