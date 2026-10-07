import Image from "next/image";
import Link from "next/link";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Luvia — trang chủ">
      <Image
        src="/brand/logo-icon.jpg"
        alt=""
        width={44}
        height={44}
        className="size-11 rounded-full object-cover ring-2 ring-leaf/15 transition group-hover:rotate-6"
        priority
      />
      <span className="leading-none">
        <span className="block text-2xl font-extrabold tracking-wide text-leaf">LUVIA</span>
        {!compact && (
          <span className="block font-hand text-[13px] text-ink-soft">Nến thơm từ dầu ăn tái chế</span>
        )}
      </span>
    </Link>
  );
}
