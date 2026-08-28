"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Single motion primitive for the whole site: content rises and fades in once,
 * when it enters the viewport. `delay` staggers siblings.
 * Reduced-motion users get the final state immediately.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section";
  /** Play on mount instead of on scroll. Use for anything above the fold —
   *  it must never depend on an intersection that has already happened. */
  immediate?: boolean;
}) {
  const still = useReducedMotion();
  const Tag = motion[as];
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: 0.75, delay, ease: EASE };

  if (immediate) {
    return (
      <Tag
        className={className}
        initial={still ? false : { opacity: 0, y }}
        animate={shown}
        transition={transition}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={still ? false : { opacity: 0, y }}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={transition}
    >
      {children}
    </Tag>
  );
}

/**
 * Display type that wipes up from behind a mask. Used for the hero and for
 * section headings — the one piece of theatre on the page.
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const still = useReducedMotion();

  if (still) return <span className={className}>{children}</span>;

  const motionProps = immediate
    ? { animate: { y: 0 } }
    : { whileInView: { y: 0 }, viewport: { once: true } };

  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className={className}
        style={{ display: "block" }}
        initial={{ y: "110%" }}
        {...motionProps}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
