import type { SeasonId } from "@/lib/catalog";

/**
 * Bảng màu từng mùa — ánh xạ đúng vai trò màu trong bản thiết kế Stitch
 * (Xuân = primary, Hạ = secondary, Thu = tertiary, Đông = surface/outline).
 */
export const SEASON_THEME: Record<
  SeasonId,
  { chip: string; mood: string; glow: string; button: string }
> = {
  xuan: {
    chip: "bg-primary-fixed text-on-primary-fixed",
    mood: "text-primary",
    glow: "bg-primary-fixed-dim/40",
    button:
      "bg-primary-container text-on-primary shadow-[inset_0_2px_3px_rgba(255,255,255,0.4),0_6px_16px_rgba(47,108,64,0.25)] hover:bg-primary",
  },
  ha: {
    chip: "bg-secondary-fixed text-on-secondary-fixed",
    mood: "text-secondary",
    glow: "bg-secondary-container/40",
    button:
      "bg-secondary-container text-on-secondary-container shadow-[inset_0_2px_3px_rgba(255,255,255,0.5),0_6px_16px_rgba(209,151,71,0.3)] hover:opacity-95",
  },
  thu: {
    chip: "bg-tertiary-fixed text-on-tertiary-fixed",
    mood: "text-tertiary",
    glow: "bg-tertiary-fixed-dim/40",
    button:
      "bg-tertiary text-on-tertiary shadow-[inset_0_2px_3px_rgba(255,255,255,0.4),0_6px_16px_rgba(146,75,17,0.25)] hover:opacity-95",
  },
  dong: {
    chip: "bg-surface-variant text-on-surface-variant",
    mood: "text-on-surface-variant",
    glow: "bg-outline-variant/30",
    button:
      "bg-inverse-surface text-inverse-on-surface shadow-[inset_0_2px_3px_rgba(255,255,255,0.15),0_6px_16px_rgba(37,85,51,0.25)] hover:opacity-95",
  },
};
