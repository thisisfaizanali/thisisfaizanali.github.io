"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Project thumbnail with two layers of motion:
 *  - the image drifts slowly against the scroll (parallax), so the frame feels
 *    like a window rather than a pasted rectangle;
 *  - a disc tracks the cursor inside the frame and reads "case study".
 *
 * Images are anchored left-top: these are app screenshots with a left sidebar,
 * and losing the sidebar to a centre crop loses the point of the picture.
 */
export function ProjectMedia({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  /** Set on the first project — it sits near the fold and drives LCP. */
  priority?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "end start"],
  });
  // Slightly oversized image + counter-scroll drift = parallax with no gaps.
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const dx = useSpring(mx, { stiffness: 350, damping: 28, mass: 0.4 });
  const dy = useSpring(my, { stiffness: 350, damping: 28, mass: 0.4 });

  return (
    <div
      ref={wrap}
      className="group/media relative aspect-[19/10] overflow-hidden border border-rule bg-paper-raised"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !wrap.current) return;
        const r = wrap.current.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Oversized on the vertical axis so the counter-drift never exposes an
          edge. Explicit insets — a negative percentage arbitrary class does not
          survive the Tailwind build, and a zero-height box renders no image. */}
      <motion.div
        className="absolute"
        style={{
          left: 0,
          right: 0,
          top: "-7%",
          bottom: "-7%",
          ...(still ? {} : { y }),
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 58vw, 100vw"
          className="object-cover object-left-top"
          priority={priority}
        />
      </motion.div>

      {/* Ink veil so the disc stays legible over any screenshot. */}
      <div
        className={`pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 ${
          hovered ? "bg-ink/25" : ""
        }`}
      />

      <AnimatePresence>
        {hovered && !still ? (
          <motion.span
            className="pointer-events-none absolute z-10 grid size-24 place-items-center rounded-full bg-accent text-center font-mono text-[0.5625rem] uppercase leading-tight tracking-[0.14em] text-accent-foreground"
            style={{ left: dx, top: dy, x: "-50%", y: "-50%" }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            Case
            <br />
            study
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
