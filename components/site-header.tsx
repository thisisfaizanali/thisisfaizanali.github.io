"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [lifted, setLifted] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setLifted(window.scrollY > 24);
  }, []);

  // Retreats on the way down, returns the moment you scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setLifted(y > 24);
    setHidden(y > prev && y > 220);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        lifted ? "border-rule bg-paper/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/#top"
          className="group/logo font-serif text-xl leading-none tracking-tight md:text-2xl"
          aria-label={`${profile.name}, home`}
        >
          <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:-translate-y-px">
            Faizan Ali
          </span>
          <span className="mt-1 block h-px w-0 bg-ink transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/logo:w-full" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href} className="label">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="label hidden sweep hover:text-ink sm:inline-block"
          >
            Résumé
          </a>
          <span className="mx-3 hidden h-4 w-px bg-rule sm:block" aria-hidden />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
