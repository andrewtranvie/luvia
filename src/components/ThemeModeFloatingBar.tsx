"use client";

import { useTheme } from "@/lib/themeContext";
import { Sparkles, Sprout } from "lucide-react";

export default function ThemeModeFloatingBar() {
  const { mode, setMode, is3D } = useTheme();

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-2 rounded-full bg-white/90 p-1.5 shadow-[0_12px_36px_rgba(46,58,34,0.18)] backdrop-blur-md ring-1 ring-leaf/20">
      <div className="px-2 text-[11px] font-bold text-ink-soft tracking-wider uppercase">
        Chế độ:
      </div>
      <button
        onClick={() => setMode("craft")}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
          !is3D
            ? "bg-leaf text-white shadow-sm"
            : "text-ink-soft hover:bg-cream hover:text-ink"
        }`}
      >
        <Sprout className="size-3.5" />
        <span>Bản 1: Eco Mộc Mạc</span>
      </button>

      <button
        onClick={() => setMode("clay3d")}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
          is3D
            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/30 scale-105"
            : "text-ink-soft hover:bg-cream hover:text-ink"
        }`}
      >
        <Sparkles className="size-3.5 text-yellow-200" />
        <span>Bản 2: 3D Sống Động</span>
      </button>
    </div>
  );
}
