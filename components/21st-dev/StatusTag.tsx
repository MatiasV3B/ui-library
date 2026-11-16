"use client";

import * as React from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { RotateCcw, X } from "lucide-react";
import { TACTILE_SPRING } from "../motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type StatusTone = "success" | "warning" | "danger" | "accent" | "neutral";

const TONE_DOT: Record<StatusTone, string> = {
  success: "bg-[var(--status-success)]",
  warning: "bg-[var(--status-warning)]",
  danger: "bg-[var(--status-danger)]",
  accent: "bg-[var(--accent-primary)]",
  neutral: "bg-[var(--text-muted)]",
};

export interface StatusTagProps {
  label: string;
  tone?: StatusTone;
  className?: string;
}

export function StatusTag({
  label,
  tone = "neutral",
  className,
}: StatusTagProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] py-[var(--space-1)]",
        "font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-medium text-[var(--text-primary)]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cx("h-2 w-2 rounded-[var(--radius-pill)]", TONE_DOT[tone])}
      />
      <span>{label}</span>
    </span>
  );
}

export interface RemovableTagItem {
  id: string;
  label: string;
}

export interface RemovableTagGroupProps {
  items: readonly RemovableTagItem[];
  onRemove: (id: string) => void;
  onReset?: () => void;
  emptyLabel?: string;
  className?: string;
}

export function RemovableTagGroup({
  items,
  onRemove,
  onReset,
  emptyLabel = "All tags cleared.",
  className,
}: RemovableTagGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <div className={cx("flex flex-wrap items-center gap-[var(--space-2)]", className)}>
        <AnimatePresence mode="popLayout" initial={false}>
          {items.length > 0 ? (
            items.map((item) => (
              <motion.span
                key={item.id}
                layout
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                transition={shouldReduceMotion ? { duration: 0 } : TACTILE_SPRING}
                className="inline-flex items-center gap-[var(--space-1)] rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--surface-sunken)] py-[var(--space-1)] pr-[var(--space-1)] pl-[var(--space-3)] font-[family-name:var(--font-sans)] text-[length:var(--text-xs)] font-medium text-[var(--text-primary)]"
              >
                <span>{item.label}</span>
                <motion.button
                  type="button"
                  aria-label={`Remove ${item.label}`}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                  transition={TACTILE_SPRING}
                  onClick={() => onRemove(item.id)}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-[var(--radius-pill)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-interactive)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus-ring)]"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </motion.button>
              </motion.span>
            ))
          ) : (
            <motion.div
              key="empty"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-[var(--space-3)] text-[length:var(--text-xs)] text-[var(--text-muted)]"
            >
              <span>{emptyLabel}</span>
              {onReset ? (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-1 font-medium text-[var(--accent-primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-xs)]"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
