"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { APPLE_EASE_OUT } from "./motion-tokens";

export interface AnimatedNumberProps {
  value: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedNumber({
  value,
  from = 0,
  duration = 1.1,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = React.useState(
    shouldReduceMotion ? value : from
  );

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }
    if (!inView) return;

    const controls = animate(from, value, {
      duration,
      ease: APPLE_EASE_OUT,
      onUpdate: (latest) => setDisplayValue(latest),
    });

    return () => controls.stop();
  }, [inView, from, value, duration, shouldReduceMotion]);

  const formatted = displayValue.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
