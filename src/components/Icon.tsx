/**
 * Icon Material Symbols — Stitch dùng icon font này cho toàn bộ giao diện.
 * Không dùng hook nên server component cũng import được.
 */
export default function Icon({
  name,
  className = "",
  fill = false,
}: {
  name: string;
  className?: string;
  fill?: boolean;
}) {
  return <span className={`material-symbols-outlined ${fill ? "fill" : ""} ${className}`}>{name}</span>;
}
