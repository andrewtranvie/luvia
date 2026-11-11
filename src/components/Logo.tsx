import Image from "next/image";
import Link from "next/link";

/**
 * Logo chính thức của Luvia (bộ nhận diện khách gửi).
 * Dùng PNG nền trong suốt, KHÔNG bo tròn/crop để không cắt mất ngọn lửa và chiếc lá.
 * compact = true → ẩn dòng mô tả dưới chữ LUVIA.
 */
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Luvia — trang chủ">
      <Image
        src="/brand/logo-icon.png"
        alt=""
        width={444}
        height={524}
        className="h-11 w-auto shrink-0 transition group-hover:rotate-6"
        priority
      />
      <span className="leading-none">
        <Image
          src="/brand/logo-wordmark.png"
          alt="Luvia"
          width={732}
          height={170}
          className="h-[22px] w-auto"
          priority
        />
        {!compact && (
          <span className="mt-1.5 hidden sm:block font-hand text-[13px] text-ink-soft">
            Nến thơm từ dầu ăn tái chế
          </span>
        )}
      </span>
    </Link>
  );
}
