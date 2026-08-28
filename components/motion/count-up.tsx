"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts a figure up when it scrolls into view. Takes the display string
 * ("700+", "Rank 2", "587") and animates only the leading number, so prefixes
 * and suffixes survive intact.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const still = useReducedMotion();

  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || !match || still) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v).toLocaleString("en-IN")}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, match, still]);

  // Server and pre-animation render show the final value — never a stray zero.
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
