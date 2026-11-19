"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${dark ? "light" : "dark"} theme` : "Switch theme"}
      className="grid size-9 place-items-center border-2 border-ink text-ink hover:bg-paper-raised"
    >
      <span className="relative block size-4" suppressHydrationWarning>
        <Sun className="size-4 dark:hidden" strokeWidth={2} aria-hidden />
        <Moon className="hidden size-4 dark:block" strokeWidth={2} aria-hidden />
      </span>
    </button>
  );
}
