import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Layers, ExternalLink, Code2 } from "lucide-react";
import Showcase3DGallery from "@/components/Showcase3DGallery";

export const metadata: Metadata = {
  title: "Hồ sơ Thiết kế 3D & Stitch UI Showcase · Luvia",
  description: "Trưng bày 6 màn hình 3D Claymorphism và bộ prompt chuẩn cho Google Stitch của dự án Luvia.",
};

export default function Demo3DPage() {
  return (
    <main className="min-h-screen pb-20">
      {/* INTERNAL BANNER */}
      <div className="bg-ink text-white/90 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-flame px-2 py-0.5 text-[11px] font-bold text-ink">
              DEV / CLIENT DEMO
            </span>
            <span className="text-white/80">
              Trang hồ sơ năng lực UI/UX 3D & Prompt Blueprint cho Google Stitch
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-leaf-light hover:text-white transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Quay về Website chính
            </Link>
          </div>
        </div>
      </div>

      {/* HERO INTRODUCTION */}
      <section className="relative overflow-hidden pt-12 pb-6">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-flame-soft/60 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="brush-tag text-base">Hồ Sơ Thiết Kế Concept 3D</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl text-ink">
            Giao Diện 3D Claymorphism & Pixar Lighting
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-soft sm:text-lg">
            Dành riêng cho việc duyệt thiết kế với khách hàng, thuyết trình dự án và xuất layout qua Google Stitch. Bộ 6 màn hình bao quát toàn bộ luồng trải nghiệm khách hàng và giải pháp B2B.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://stitch.withgoogle.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-leaf-dark"
            >
              <ExternalLink className="size-3.5" /> Mở Google Stitch
            </a>
            <Link
              href="/doi-ngu"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-ink shadow-sm ring-1 ring-leaf/20 hover:bg-cream-dark"
            >
              <Layers className="size-3.5 text-leaf" /> Xem Hồ Sơ Bên B
            </Link>
          </div>
        </div>
      </section>

      {/* THE 3D INTERACTIVE GALLERY */}
      <Showcase3DGallery />
    </main>
  );
}
