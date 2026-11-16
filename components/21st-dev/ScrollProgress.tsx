"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX: shouldReduceMotion ? scrollYProgress : scaleX,
        transformOrigin: "left",
      }}
      className={`fixed left-0 right-0 top-0 z-50 h-[2px] bg-[var(--accent-primary)] ${className}`}
    />
  );
}
