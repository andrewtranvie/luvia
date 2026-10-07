"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, Sparkles, X } from "lucide-react";
import Logo from "./Logo";
import { openChat, useCart } from "@/lib/cart";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Cửa hàng" },
  { href: "/cau-chuyen", label: "Câu chuyện xanh" },
  { href: "/doi-ngu", label: "Đội ngũ (Bên B)" },
  { href: "/tu-van", label: "Tư vấn AI" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, lastAdded } = useCart();
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!lastAdded) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- short animation trigger
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [lastAdded]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled ? "bg-cream/90 shadow-[0_6px_24px_-12px_rgba(46,58,34,0.25)] backdrop-blur-md" : "bg-cream"
      }`}
    >
      <div className="bg-leaf px-4 py-1.5 text-center text-xs font-medium text-white sm:text-sm">
        🌿 Miễn phí giao hàng cho đơn từ 500.000₫ · Mang 1 lít dầu ăn cũ đổi voucher 30.000₫
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-4 py-2 text-[15px] font-medium transition ${
                isActive(n.href) ? "bg-leaf-soft text-leaf-dark" : "text-ink-soft hover:bg-white/70 hover:text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openChat()}
            className="hidden items-center gap-1.5 rounded-full border border-flame/50 bg-flame-soft px-4 py-2 text-sm font-semibold text-flame-dark transition hover:bg-flame hover:text-white sm:flex"
          >
            <Sparkles className="size-4" /> Hỏi Luvia
          </button>
          <Link
            href="/gio-hang"
            className={`relative grid size-11 place-items-center rounded-full bg-white text-leaf-dark shadow-sm ring-1 ring-leaf/10 transition hover:bg-leaf hover:text-white ${
              bump ? "scale-110" : ""
            }`}
            aria-label={`Giỏ hàng (${count} sản phẩm)`}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-flame px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            className="grid size-11 place-items-center rounded-full bg-white shadow-sm ring-1 ring-leaf/10 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-leaf/10 bg-cream-light px-4 pb-4 pt-2 lg:hidden" aria-label="Điều hướng di động">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`block rounded-xl px-4 py-3 font-medium ${
                isActive(n.href) ? "bg-leaf-soft text-leaf-dark" : "text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
