"use client";

import * as React from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { X } from "lucide-react";
import {
  APPLE_FADE_TRANSITION,
  FLUID_SPRING,
  TACTILE_SPRING,
} from "./motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface MotionDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  eyebrow?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function MotionDrawer({
  open,
  onOpenChange,
  title,
  description,
  eyebrow,
  children,
  footer,
  className,
}: MotionDrawerProps) {
  const shouldReduceMotion = useReducedMotion();
  const titleId = React.useId();
  const closeRef = React.useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (open) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      const frame = requestAnimationFrame(() => {
        closeRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    } else if (lastFocusedRef.current) {
      lastFocusedRef.current.focus();
      lastFocusedRef.current = null;
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 96 || info.velocity.y > 400) {
      onOpenChange(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="popLayout">
        {open ? (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-[var(--space-6)]">
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                shouldReduceMotion ? { duration: 0 } : APPLE_FADE_TRANSITION
              }
              onClick={() => onOpenChange(false)}
              className="fixed inset-0 bg-[var(--surface-overlay)]"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
              transition={shouldReduceMotion ? { duration: 0 } : FLUID_SPRING}
              drag={shouldReduceMotion ? false : "y"}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.3 }}
              onDragEnd={handleDragEnd}
              className={cx(
                "relative z-10 flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden",
                "rounded-t-[var(--radius-2xl)] sm:rounded-[var(--radius-2xl)]",
                "border border-[var(--border-default)] bg-[var(--surface-elevated)] font-[family-name:var(--font-sans)] shadow-[var(--shadow-overlay)]",
                className
              )}
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-[var(--space-3)] pb-[var(--space-1)]">
                <span
                  aria-hidden="true"
                  className="h-1 w-10 rounded-[var(--radius-pill)] bg-[var(--border-strong)]"
                />
              </div>

              <div className="flex items-start justify-between gap-[var(--space-4)] border-b border-[var(--border-subtle)] px-[var(--space-6)] pt-[var(--space-2)] pb-[var(--space-4)]">
                <div className="space-y-1">
                  {eyebrow ? (
                    <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                      {eyebrow}
                    </span>
                  ) : null}
                  <h2
                    id={titleId}
                    className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-[var(--text-primary)]"
                  >
                    {title}
                  </h2>
                  {description ? (
                    <p className="text-[length:var(--text-sm)] text-[var(--text-secondary)]">
                      {description}
                    </p>
                  ) : null}
                </div>

                <motion.button
                  ref={closeRef}
                  type="button"
                  aria-label="Close sheet"
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={TACTILE_SPRING}
                  onClick={() => onOpenChange(false)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--surface-canvas)] text-[var(--text-primary)] hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </motion.button>
              </div>

              <div className="overflow-y-auto overscroll-contain p-[var(--space-6)]">
                {children}
              </div>

              {footer ? (
                <div className="flex items-center justify-end gap-[var(--space-3)] border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-6)] py-[var(--space-4)]">
                  {footer}
                </div>
              ) : null}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  );
}
