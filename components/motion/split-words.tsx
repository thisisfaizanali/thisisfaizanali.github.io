"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Heading that resolves word by word — each word rises out of a mask with a
 * touch of blur burning off. Words keep their own baseline so the line still
 * wraps and reads as normal text to a screen reader.
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  italicFrom,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** Word index from which the rest of the line renders italic. */
  italicFrom?: number;
}) {
  const still = useReducedMotion();
  const words = text.split(" ");

  if (still) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className={italicFrom !== undefined && i >= italicFrom ? "italic" : undefined}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden pb-[0.14em] align-bottom"
          aria-hidden
        >
          <motion.span
            className={`inline-block ${italicFrom !== undefined && i >= italicFrom ? "italic" : ""}`}
            variants={{
              hidden: { y: "108%", filter: "blur(6px)", opacity: 0 },
              show: {
                y: 0,
                filter: "blur(0px)",
                opacity: 1,
                transition: { duration: 0.85, ease: EASE },
              },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </motion.span>
  );
}
