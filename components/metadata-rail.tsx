"use client";

import { useEffect, useState } from "react";

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/**
 * Fixed vertical metadata rail in the left gutter — desktop-only chrome that
 * reads like the margin of a spec sheet. Non-interactive, never overlaps the
 * 76rem content column.
 */
export function MetadataRail() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setMounted(true);
    setTime(clockFormatter.format(new Date()));
    const id = setInterval(() => setTime(clockFormatter.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-20 hidden h-full w-10 flex-col items-center justify-between py-8 lg:flex"
    >
      <div className="flex flex-col items-center gap-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint [writing-mode:vertical-rl] rotate-180">
          PORTFOLIO / 2026
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint [writing-mode:vertical-rl] rotate-180">
          BENGALURU · IN
        </span>
      </div>

      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint tabular-nums [writing-mode:vertical-rl] rotate-180">
        {time}
      </span>
    </div>
  );
}
