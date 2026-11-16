"use client";

import * as React from "react";
import { AlertCircle, ArrowDownRight, ArrowUpRight, Minus, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { TACTILE_SPRING } from "../motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type KpiTrend = "positive" | "negative" | "neutral";

export interface KpiMetricCardProps {
  label: string;
  value: string;
  delta?: string;
  trend?: KpiTrend;
  period?: string;
  className?: string;
}

export function KpiMetricCard({
  label,
  value,
  delta,
  trend = "neutral",
  period,
  className,
}: KpiMetricCardProps) {
  const trendColor =
    trend === "positive"
      ? "text-[var(--status-success)] bg-[var(--status-success-subtle)]"
      : trend === "negative"
        ? "text-[var(--status-danger)] bg-[var(--status-danger-subtle)]"
        : "text-[var(--text-secondary)] bg-[var(--surface-sunken)]";

  return (
    <div
      className={cx(
        "flex flex-col justify-between gap-[var(--space-3)] rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-5)] font-[family-name:var(--font-sans)] shadow-[var(--shadow-hairline)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-[var(--space-3)]">
        <span className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-wide)] text-[var(--text-muted)]">
          {label}
        </span>
        {delta ? (
          <span
            className={cx(
              "inline-flex items-center gap-1 rounded-[var(--radius-xs)] px-[var(--space-2)] py-0.5 tabular-nums font-[family-name:var(--font-mono)] text-[11px] font-semibold",
              trendColor
            )}
          >
            {trend === "positive" ? (
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            ) : trend === "negative" ? (
              <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Minus className="h-3 w-3" aria-hidden="true" />
            )}
            {delta}
          </span>
        ) : null}
      </div>

      <div className="flex items-baseline justify-between gap-[var(--space-4)]">
        {period ? (
          <span className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
            {period}
          </span>
        ) : (
          <span />
        )}
        <span className="tabular-nums text-right font-[family-name:var(--font-mono)] text-[length:var(--text-2xl)] font-semibold leading-none tracking-[var(--tracking-tight)] text-[var(--text-primary)]">
          {value}
        </span>
      </div>
    </div>
  );
}

export function KpiMetricCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading metric"
      className={cx(
        "flex flex-col justify-between gap-[var(--space-4)] rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-5)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded-[var(--radius-xs)] bg-[var(--skeleton-base)]" />
        <div className="h-5 w-14 rounded-[var(--radius-xs)] bg-[var(--skeleton-base)]" />
      </div>
      <div className="flex items-baseline justify-between">
        <div className="h-3 w-20 rounded-[var(--radius-xs)] bg-[var(--skeleton-base)]" />
        <div className="h-7 w-24 rounded-[var(--radius-sm)] bg-[var(--skeleton-base)]" />
      </div>
    </div>
  );
}

export function KpiMetricCardError({
  label,
  message = "Metric unavailable",
  onRetry,
  className,
}: {
  label: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cx(
        "flex flex-col justify-between gap-[var(--space-3)] rounded-[var(--radius-xl)] border border-[var(--status-danger)] bg-[var(--status-danger-subtle)] p-[var(--space-5)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-[var(--space-2)]">
        <span className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-wide)] text-[var(--text-primary)]">
          {label}
        </span>
        <AlertCircle
          className="h-4 w-4 shrink-0 text-[var(--status-danger)]"
          aria-hidden="true"
        />
      </div>
      <div className="flex items-center justify-between gap-[var(--space-3)]">
        <span className="text-[length:var(--text-xs)] text-[var(--text-primary)]">
          {message}
        </span>
        {onRetry ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            transition={TACTILE_SPRING}
            onClick={onRetry}
            className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-2)] py-1 text-[length:var(--text-xs)] font-medium text-[var(--text-primary)] hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Retry
          </motion.button>
        ) : null}
      </div>
    </div>
  );
}
