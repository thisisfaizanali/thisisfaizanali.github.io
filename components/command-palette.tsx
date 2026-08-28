"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { profile, projects } from "@/lib/content";

const sections = [
  { label: "Top", href: "/#top" },
  { label: "Selected work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Jump to a section, open a case study, or change the theme"
      className="rounded-none border-rule"
    >
      <CommandInput placeholder="Jump to…" />
      <CommandList>
        <CommandEmpty>Nothing matches that.</CommandEmpty>

        <CommandGroup heading="Sections">
          {sections.map((s) => (
            <CommandItem
              key={s.href}
              value={s.label}
              onSelect={() => run(() => router.push(s.href))}
            >
              {s.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Case studies">
          {projects.map((p) => (
            <CommandItem
              key={p.slug}
              value={p.title}
              onSelect={() => run(() => router.push(`/work/${p.slug}`))}
            >
              {p.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Elsewhere">
          <CommandItem
            value="Email"
            onSelect={() => run(() => { window.location.href = `mailto:${profile.email}`; })}
          >
            Email {profile.email}
          </CommandItem>
          <CommandItem value="GitHub" onSelect={() => run(() => window.open(profile.links.github, "_blank"))}>
            GitHub
          </CommandItem>
          <CommandItem value="LinkedIn" onSelect={() => run(() => window.open(profile.links.linkedin, "_blank"))}>
            LinkedIn
          </CommandItem>
          <CommandItem value="LeetCode" onSelect={() => run(() => window.open(profile.links.leetcode, "_blank"))}>
            LeetCode
          </CommandItem>
          <CommandItem value="Resume" onSelect={() => run(() => window.open(profile.links.resume, "_blank"))}>
            Résumé (PDF)
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Theme">
          <CommandItem
            value="Toggle theme"
            onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
          >
            Switch to {resolvedTheme === "dark" ? "light" : "dark"}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
