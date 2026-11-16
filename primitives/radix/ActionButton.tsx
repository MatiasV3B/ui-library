"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { TACTILE_SPRING } from "../../components/motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type ActionButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ActionButtonSize = "sm" | "md" | "lg";

export interface ActionButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
  > {
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  loading?: boolean;
}

const VARIANT_CLASSES: Record<ActionButtonVariant, string> = {
  primary:
    "border border-transparent bg-[var(--accent-primary)] text-[var(--accent-primary-foreground)] hover:bg-[var(--accent-primary-hover)]",
  secondary:
    "border border-[var(--border-subtle)] bg-[var(--surface-sunken)] text-[var(--text-primary)] hover:bg-[var(--surface-interactive)]",
  outline:
    "border border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-interactive)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-interactive)] hover:text-[var(--text-primary)]",
};

const SIZE_CLASSES: Record<ActionButtonSize, string> = {
  sm: "h-8 px-[var(--space-3)] text-[length:var(--text-xs)] rounded-[var(--radius-sm)]",
  md: "h-10 px-[var(--space-4)] text-[length:var(--text-sm)] rounded-[var(--radius-md)]",
  lg: "h-11 px-[var(--space-5)] text-[length:var(--text-base)] rounded-[var(--radius-md)]",
};

export const ActionButton = React.forwardRef<
  HTMLButtonElement,
  ActionButtonProps
>(function ActionButton(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled,
    className,
    children,
    type = "button",
    ...props
  },
  ref
) {
  const shouldReduceMotion = useReducedMotion();
  const isDisabled = Boolean(disabled || loading);

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      whileTap={isDisabled || shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={TACTILE_SPRING}
      className={cx(
        "inline-flex items-center justify-center gap-[var(--space-2)] font-[family-name:var(--font-sans)] font-medium whitespace-nowrap select-none",
        "transition-colors duration-[var(--duration-fast)]",
        "disabled:pointer-events-none disabled:opacity-45",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 rounded-[var(--radius-xs)] bg-current opacity-35"
        />
      ) : null}
      {children}
    </motion.button>
  );
});
