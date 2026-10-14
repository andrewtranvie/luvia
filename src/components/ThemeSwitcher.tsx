"use client";

import { useTheme } from "@/lib/themeContext";
import { Sparkles, Sprout } from "lucide-react";

interface ThemeSwitcherProps {
  compact?: boolean;
}

export default function ThemeSwitcher({ compact = false }: ThemeSwitcherProps) {
  const { mode, setMode, is3D } = useTheme();

  if (compact) {
    return (
      <div className="inline-flex items-center rounded-full bg-cream-dark/80 p-1 shadow-inner ring-1 ring-leaf/15">
        <button
          onClick={() => setMode("craft")}
          title="Bản 1: Giao diện Eco Craft mộc mạc"
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition-all ${
            !is3D
              ? "bg-leaf text-white shadow-sm"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          <Sprout className="size-3.5" />
          <span>Eco Craft</span>
        </button>
        <button
          onClick={() => setMode("clay3d")}
          title="Bản 2: Giao diện 3D Claymorphism sống động"
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition-all ${
            is3D
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/30 scale-105"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          <Sparkles className="size-3.5 text-yellow-200" />
          <span>3D Clay</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={`inline-flex items-center rounded-full p-1 transition-all duration-300 ${
          is3D
            ? "bg-amber-100/90 shadow-[inset_0_2px_4px_rgba(180,120,40,0.15)] ring-2 ring-amber-400/50"
            : "bg-leaf-soft/80 shadow-inner ring-1 ring-leaf/20"
        }`}
      >
        <button
          onClick={() => setMode("craft")}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
            !is3D
              ? "bg-leaf text-white shadow-sm scale-102"
              : "text-ink-soft hover:text-ink hover:bg-white/40"
          }`}
        >
          <Sprout className="size-3.5 text-white/90" />
          <span>Bản 1: Eco Mộc Mạc</span>
        </button>

        <button
          onClick={() => setMode("clay3d")}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
            is3D
              ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md shadow-amber-500/40 scale-105 ring-1 ring-white/50"
              : "text-ink-soft hover:text-ink hover:bg-white/40"
          }`}
        >
          <Sparkles className={`size-3.5 ${is3D ? "text-yellow-200 animate-spin-slow" : "text-amber-600"}`} />
          <span>Bản 2: 3D Sống Động</span>
        </button>
      </div>
    </div>
  );
}
