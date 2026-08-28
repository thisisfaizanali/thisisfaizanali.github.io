"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const GRID = 8;
const snap = (v: number) => Math.round(v / GRID) * GRID;

/**
 * Faint full-viewport crosshair that tracks the cursor and snaps to an 8px
 * grid — transform-only, fine-pointer + motion-allowed gated, sits below the
 * header (z-50) but above the page background.
 */
export function GridCrosshair() {
  const reducedMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.2 });

  useEffect(() => {
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || !finePointer) return;
    const handleMove = (event: MouseEvent) => {
      x.set(snap(event.clientX));
      y.set(snap(event.clientY));
      setActive(true);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion, finePointer, x, y]);

  if (reducedMotion || !finePointer) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ y: springY, opacity: active ? 1 : 0 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-px w-full bg-[var(--crosshair)] transition-opacity duration-500"
      />
      <motion.div
        aria-hidden
        style={{ x: springX, opacity: active ? 1 : 0 }}
        className="pointer-events-none fixed inset-y-0 left-0 z-30 h-full w-px bg-[var(--crosshair)] transition-opacity duration-500"
      />
    </>
  );
}
