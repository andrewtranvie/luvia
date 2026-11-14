import Link from "next/link";
import { Mail, MapPin, Music2, Phone } from "lucide-react";
import Logo from "./Logo";
import { FOOTER, NAV, CLOSING, POLICIES } from "@/content/vi";
import { SITE } from "@/lib/site";

/** lucide-react không còn icon thương hiệu nên vẽ chữ "f" của Facebook trực tiếp */
function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="mt-0.5 size-4 shrink-0 text-secondary-fixed-dim">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 bg-leaf-dark text-white/90">
      {/* 9 Lời mời cuối trang */}
      <div className="border-b border-white/10 bg-leaf-dark/60 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl text-white">
            {CLOSING.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/80">
            {CLOSING.body}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={CLOSING.primary.href}
              className="rounded-full bg-white px-6 py-2.5 text-xs font-bold text-leaf-dark shadow hover:bg-cream transition"
            >
              {CLOSING.primary.label}
            </Link>
            <Link
              href={CLOSING.secondary.href}
              className="rounded-full bg-white/15 px-6 py-2.5 text-xs font-bold text-white hover:bg-white/25 transition ring-1 ring-white/20"
            >
              {CLOSING.secondary.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Cột 1: Thương hiệu */}
        <div>
          <div className="inline-block rounded-2xl bg-cream px-4 py-3">
            <Logo />
          </div>
          <p className="mt-4 text-sm font-semibold text-white">
            {FOOTER.tagline}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/75">
            {FOOTER.description}
          </p>
        </div>

        {/* Cột 2: Điều hướng */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Khám phá</h3>
          <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
            {NAV.menu.map((m) => (
              <li key={m.href}>
                <Link className="hover:text-secondary-fixed transition" href={m.href}>
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Chính sách & Hướng dẫn */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Chính sách & Hỗ trợ</h3>
          <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-white/80">
            {POLICIES.docs.map((doc) => (
              <li key={doc.slug}>
                <Link className="hover:text-secondary-fixed transition" href={`/ho-tro/${doc.slug}`}>
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 4: Thông tin liên hệ */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Thông tin liên hệ</h3>
          <ul className="mt-4 space-y-3 text-xs sm:text-sm">
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-secondary-fixed-dim" />
              <div>
                <p className="text-[11px] text-white/60">{FOOTER.hotlineLabel}:</p>
                <a href={`tel:${SITE.hotline.replace(/\s+/g, "")}`} className="font-semibold hover:underline">
                  {SITE.hotline}
                </a>
              </div>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-secondary-fixed-dim" />
              <div>
                <p className="text-[11px] text-white/60">{FOOTER.emailLabel}:</p>
                <a href={`mailto:${SITE.email}`} className="font-semibold hover:underline">
                  {SITE.email}
                </a>
              </div>
            </li>
            {SITE.links.fanpage && (
              <li className="flex gap-2">
                <FacebookGlyph />
                <div>
                  <p className="text-[11px] text-white/60">Fanpage:</p>
                  <a
                    href={SITE.links.fanpage}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold hover:underline"
                  >
                    Luvia trên Facebook
                  </a>
                </div>
              </li>
            )}
            {SITE.links.tiktok && (
              <li className="flex gap-2">
                <Music2 className="mt-0.5 size-4 shrink-0 text-secondary-fixed-dim" />
                <div>
                  <p className="text-[11px] text-white/60">TikTok:</p>
                  <a
                    href={SITE.links.tiktok}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold hover:underline"
                  >
                    @luvia.com204
                  </a>
                </div>
              </li>
            )}
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-secondary-fixed-dim" />
              <div>
                <p className="text-[11px] text-white/60">{FOOTER.addressLabel}:</p>
                <p className="leading-relaxed text-white/85">{SITE.address}</p>
                <p className="mt-1 text-[10px] text-white/50 italic">(Địa chỉ theo hồ sơ dự án)</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © 2026 Luvia · Nến thơm tái chế nâng cấp từ dầu ăn đã qua sử dụng.
      </div>
    </footer>
  );
}
