"use client";

import * as React from "react";
import { AlertCircle, Inbox, RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { TACTILE_SPRING } from "../motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col items-start gap-[var(--space-3)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-6)] font-[family-name:var(--font-sans)]",
        className
      )}
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]">
        <Inbox className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <p className="text-[length:var(--text-sm)] font-semibold text-[var(--text-primary)]">
          {title}
        </p>
        <p className="max-w-[54ch] text-[length:var(--text-sm)] text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function ErrorNotice({
  title,
  description,
  onRetry,
  retryLabel = "Retry",
  className,
}: {
  title: string;
  description: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      role="alert"
      className={cx(
        "flex flex-col items-start gap-[var(--space-3)] rounded-[var(--radius-lg)] border border-[var(--status-danger)] bg-[var(--status-danger-subtle)] p-[var(--space-5)] font-[family-name:var(--font-sans)]",
        className
      )}
    >
      <div className="flex items-center gap-[var(--space-2)] text-[var(--status-danger)]">
        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="text-[length:var(--text-sm)] font-semibold">{title}</p>
      </div>
      <p className="max-w-[56ch] text-[length:var(--text-sm)] text-[var(--text-primary)]">
        {description}
      </p>
      {onRetry ? (
        <motion.button
          type="button"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          transition={TACTILE_SPRING}
          onClick={onRetry}
          className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] py-[var(--space-2)] text-[length:var(--text-xs)] font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{retryLabel}</span>
        </motion.button>
      ) : null}
    </div>
  );
}

export function SkeletonBlock({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-label="Loading section"
      className={cx(
        "space-y-[var(--space-3)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-5)]",
        className
      )}
    >
      <div className="h-5 w-1/3 rounded-[var(--radius-sm)] bg-[var(--skeleton-base)]" />
      <div className="space-y-[var(--space-2)]">
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className="h-4 rounded-[var(--radius-xs)] bg-[var(--skeleton-base)]"
            style={{ width: `${94 - idx * 14}%` }}
          />
        ))}
      </div>
    </div>
  );
}
