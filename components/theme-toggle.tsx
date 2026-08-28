"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === "dark";

  const toggle = useCallback(() => {
    const next = dark ? "light" : "dark";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Circular wipe out of the button itself. Falls back to an instant swap
    // wherever View Transitions are unsupported (Firefox, Safari < 18).
    if (!ref.current || reduced || !document.startViewTransition) {
      setTheme(next);
      return;
    }

    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));

    document
      .startViewTransition(() => setTheme(next))
      .ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`] },
          {
            duration: 620,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      });
  }, [dark, setTheme]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${dark ? "light" : "dark"} theme` : "Switch theme"}
      className="grid size-8 place-items-center text-ink-muted transition-colors hover:text-ink"
    >
      <span className="relative block size-4" suppressHydrationWarning>
        <Sun
          className="absolute inset-0 size-4 rotate-0 scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] dark:-rotate-90 dark:scale-0"
          strokeWidth={1.5}
          aria-hidden
        />
        <Moon
          className="absolute inset-0 size-4 rotate-90 scale-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] dark:rotate-0 dark:scale-100"
          strokeWidth={1.5}
          aria-hidden
        />
      </span>
    </button>
  );
}
