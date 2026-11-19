"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLink } from "@/components/nav-link";
import { profile } from "@/lib/content";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};

export function SiteHeader() {
  const { scrollY } = useScroll();
  // Read from the window so a page loaded mid-scroll starts lifted.
  const lifted = useSyncExternalStore(subscribeScroll, () => window.scrollY > 24, () => false);
  const [hidden, setHidden] = useState(false);

  // Retreats on the way down, returns the moment you scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 220);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        lifted ? "bg-paper/85 backdrop-blur-md" : ""
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/#top"
          className="flex items-center gap-3"
          aria-label={`${profile.name}, home`}
        >
          <Image
            src="/portrait-v2.jpg"
            alt=""
            width={40}
            height={40}
            className="avatar size-10"
          />
          <span className="text-lg font-semibold tracking-[-0.01em]">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium text-ink-faint hover:text-ink"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="sweep hidden text-[0.95rem] font-medium text-ink-muted sm:inline-block"
          >
            Résumé
          </a>
          <a href={`mailto:${profile.email}`} className="pill btn-primary hidden sm:inline-flex">
            <span className="cap" aria-hidden />
            Email me
          </a>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
