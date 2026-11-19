"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribeNoop = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const dark = resolvedTheme === "dark";

  const toggle = useCallback(() => setTheme(dark ? "light" : "dark"), [dark, setTheme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${dark ? "light" : "dark"} theme` : "Switch theme"}
      className="pill grid size-10 place-items-center p-0 text-ink-muted hover:text-ink"
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
