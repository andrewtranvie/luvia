"use client";

import { Sparkles } from "lucide-react";
import { openChat } from "@/lib/chat";

export function SectionTitle({
  tag,
  title,
  desc,
  center = false,
}: {
  tag: string;
  title: React.ReactNode;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="brush-tag text-lg">{tag}</span>
      <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-ink-soft sm:text-lg">{desc}</p>}
    </div>
  );
}

export function AskLuviaButton({
  prompt,
  children = "Nhờ Luvia tư vấn",
  className = "",
}: {
  prompt?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={() => openChat({ prompt })}
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-leaf bg-white px-6 py-3 font-semibold text-leaf transition hover:bg-leaf hover:text-white ${className}`}
    >
      <Sparkles className="size-4" /> {children}
    </button>
  );
}
