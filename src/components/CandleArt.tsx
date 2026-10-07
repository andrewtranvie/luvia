import type { Product } from "@/lib/products";

/** Minh hoạ hũ nến Luvia theo màu sáp / nhãn của từng sản phẩm */
export default function CandleArt({
  product,
  className = "",
  lit = true,
}: {
  product: Pick<Product, "slug" | "name" | "wax" | "accent">;
  className?: string;
  lit?: boolean;
}) {
  const id = product.slug;
  return (
    <svg viewBox="0 0 200 240" className={className} role="img" aria-label={`Nến thơm ${product.name}`}>
      <defs>
        <linearGradient id={`glass-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.25" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="0.8" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f2a93b" stopOpacity="0.45" />
          <stop offset="1" stopColor="#f2a93b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`flame-${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e07b1a" />
          <stop offset="0.5" stopColor="#f2a93b" />
          <stop offset="1" stopColor="#ffe08a" />
        </linearGradient>
      </defs>

      {/* bóng đổ */}
      <ellipse cx="100" cy="226" rx="66" ry="8" fill="#2e3a22" opacity="0.12" />

      {lit && <circle cx="100" cy="44" r="46" fill={`url(#glow-${id})`} />}

      {/* thân hũ thuỷ tinh */}
      <rect x="38" y="70" width="124" height="152" rx="20" fill="#f6efdc" stroke="#d9cfb2" strokeWidth="2" />
      {/* sáp */}
      <rect x="44" y="92" width="112" height="124" rx="15" fill={product.wax} />
      <ellipse cx="100" cy="93" rx="56" ry="8" fill={product.wax} stroke="#00000010" />
      <ellipse cx="100" cy="93" rx="44" ry="5" fill="#ffffff" opacity="0.35" />

      {/* nhãn */}
      <rect x="54" y="132" width="92" height="58" rx="8" fill="#fffcf3" stroke={product.accent} strokeWidth="2" />
      <path
        d="M70 152 C 70 142, 80 138, 86 140 C 84 148, 78 154, 70 152 Z"
        fill={product.accent}
      />
      <path d="M86 140 C 92 136, 98 142, 94 150 C 90 152, 86 148, 86 140 Z" fill="#548333" opacity="0.8" />
      <text x="116" y="152" textAnchor="middle" fontFamily="var(--font-body)" fontWeight="800" fontSize="15" fill="#548333" letterSpacing="1">
        LUVIA
      </text>
      <line x1="64" y1="162" x2="136" y2="162" stroke={product.accent} strokeOpacity="0.4" />
      <text x="100" y="179" textAnchor="middle" fontFamily="var(--font-body)" fontWeight="600" fontSize="10.5" fill="#2e3a22">
        {product.name.length > 18 ? product.name.slice(0, 17) + "…" : product.name}
      </text>

      {/* kính phản chiếu */}
      <rect x="38" y="70" width="124" height="152" rx="20" fill={`url(#glass-${id})`} />
      <rect x="48" y="80" width="8" height="120" rx="4" fill="#fff" opacity="0.5" />

      {/* bấc + lửa */}
      <rect x="98.5" y="74" width="3" height="18" rx="1.5" fill="#3a2e22" />
      {lit && (
        <g className="origin-[100px_74px] animate-flicker">
          <path d="M100 30 C 112 46, 112 62, 100 76 C 88 62, 88 46, 100 30 Z" fill={`url(#flame-${id})`} />
          <path d="M100 52 C 105 60, 105 67, 100 74 C 95 67, 95 60, 100 52 Z" fill="#fff8dc" />
        </g>
      )}
    </svg>
  );
}
