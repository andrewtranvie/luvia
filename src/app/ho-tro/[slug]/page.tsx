import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { POLICIES } from "@/content/vi";
import { SITE } from "@/lib/site";

/* Một route động cho cả 4 văn bản thay vì 4 file gần như giống hệt nhau.
   Nội dung nằm trong POLICIES ở `content/vi.ts` — xem cảnh báo ⚠️ ở đó: khách CHƯA duyệt. */

const getDoc = (slug: string) => POLICIES.docs.find((d) => d.slug === slug);

export function generateStaticParams() {
  return POLICIES.docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: "Không tìm thấy trang" };
  return { title: `${doc.title} — Luvia`, description: doc.summary };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const others = POLICIES.docs.filter((d) => d.slug !== doc.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Cùng kiểu nút quay lại như trang sản phẩm: cao 44px, bấm được bằng ngón tay */}
      <nav className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-base">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-semibold text-leaf-dark ring-1 ring-leaf/25 transition hover:bg-leaf-soft hover:ring-leaf active:scale-95"
        >
          <ArrowLeft className="size-5" /> Trang chủ
        </Link>
        <span className="text-ink-soft/50">/</span>
        <span className="font-bold text-ink">{doc.title}</span>
      </nav>

      <header>
        <h1 className="text-3xl font-extrabold leading-tight text-balance text-ink sm:text-4xl">{doc.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-pretty text-ink-soft">{doc.summary}</p>
        <p className="mt-4 text-xs text-ink-soft/70">
          {POLICIES.updatedLabel}: {POLICIES.updated}
        </p>
      </header>

      <div className="mt-10 space-y-8">
        {doc.sections.map((section) => (
          <section key={section.heading} className="rounded-3xl bg-white p-6 ring-1 ring-leaf/10 sm:p-7">
            <h2 className="text-lg font-bold text-ink sm:text-xl">{section.heading}</h2>

            {"body" in section && section.body && (
              <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-soft sm:text-base">{section.body}</p>
            )}

            {"items" in section && section.items && (
              <ul className="mt-4 space-y-2.5">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-leaf" />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {"note" in section && section.note && (
              <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm leading-relaxed text-pretty text-ink-soft">
                {section.note}
              </p>
            )}
          </section>
        ))}
      </div>

      {/* Liên hệ — mọi chính sách ở trên đều kết thúc bằng "liên hệ Luvia", nên để sẵn ở đây */}
      <section className="mt-12 rounded-3xl bg-leaf-soft p-6 ring-1 ring-leaf/15 sm:p-7">
        <h2 className="text-lg font-bold text-ink">{POLICIES.contactTitle}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={SITE.hotlineHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-leaf px-5 font-bold text-white transition hover:bg-leaf-dark active:scale-95"
          >
            <Phone className="size-4" /> {SITE.hotline}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 font-semibold text-leaf-dark ring-1 ring-leaf/25 transition hover:ring-leaf active:scale-95"
          >
            <Mail className="size-4" /> {SITE.email}
          </a>
        </div>
      </section>

      <nav className="mt-12 border-t border-leaf/15 pt-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-ink-soft">{POLICIES.backLabel}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {others.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/ho-tro/${d.slug}`}
                className="block h-full rounded-2xl bg-white p-4 text-sm font-semibold text-leaf-dark ring-1 ring-leaf/15 transition hover:bg-leaf-soft hover:ring-leaf"
              >
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
