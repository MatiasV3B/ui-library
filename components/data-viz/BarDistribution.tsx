"use client";

import * as React from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { FLUID_SPRING, TACTILE_SPRING } from "../motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface BarDatum {
  id: string;
  label: string;
  value: number;
  unit?: string;
}

export interface BarDistributionProps {
  title: string;
  subtitle?: string;
  data: readonly BarDatum[];
  className?: string;
}

export function BarDistribution({
  title,
  subtitle,
  data,
  className,
}: BarDistributionProps) {
  const [activeId, setActiveId] = React.useState<string | null>(
    data[data.length - 1]?.id ?? null
  );
  const shouldReduceMotion = useReducedMotion();

  const maxValue = React.useMemo(
    () => Math.max(...data.map((d) => d.value), 1),
    [data]
  );

  const activeDatum =
    data.find((d) => d.id === activeId) ?? data[data.length - 1];

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cx(
          "flex flex-col gap-[var(--space-5)] rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-5)] font-[family-name:var(--font-sans)] shadow-[var(--shadow-card)]",
          className
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-[var(--space-3)] border-b border-[var(--border-subtle)] pb-[var(--space-4)]">
          <div className="space-y-0.5">
            <h4 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold text-[var(--text-primary)]">
              {title}
            </h4>
            {subtitle ? (
              <p className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                {subtitle}
              </p>
            ) : null}
          </div>

          {activeDatum ? (
            <div className="text-right">
              <span className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-wide)] text-[var(--text-muted)]">
                {activeDatum.label}
              </span>
              <span className="tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-xl)] font-semibold text-[var(--accent-primary)]">
                {activeDatum.value.toLocaleString()}
                {activeDatum.unit ?? ""}
              </span>
            </div>
          ) : null}
        </div>

        <div
          role="list"
          aria-label={title}
          className="grid h-44 items-end gap-[var(--space-2)] pt-[var(--space-2)]"
          style={{
            gridTemplateColumns: `repeat(${Math.max(data.length, 1)}, minmax(0, 1fr))`,
          }}
        >
          {data.map((datum) => {
            const isSelected = datum.id === activeDatum?.id;
            const ratio = Math.max(datum.value / maxValue, 0.08);
            return (
              <div
                key={datum.id}
                role="listitem"
                className="flex h-full flex-col items-center justify-end gap-[var(--space-2)]"
              >
                <div className="relative flex h-full w-full items-end">
                  <motion.button
                    type="button"
                    aria-label={`${datum.label}: ${datum.value}${datum.unit ?? ""}`}
                    onMouseEnter={() => setActiveId(datum.id)}
                    onFocus={() => setActiveId(datum.id)}
                    onClick={() => setActiveId(datum.id)}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    initial={shouldReduceMotion ? false : { scaleY: 0.15 }}
                    animate={{ scaleY: 1 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { ...FLUID_SPRING, scale: TACTILE_SPRING }
                    }
                    style={{ height: `${Math.round(ratio * 100)}%` }}
                    className={cx(
                      "w-full origin-bottom rounded-t-[var(--radius-sm)] border transition-colors duration-[var(--duration-fast)]",
                      isSelected
                        ? "border-[var(--accent-primary)] bg-[var(--accent-primary)]"
                        : "border-[var(--border-default)] bg-[var(--surface-sunken)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-interactive)]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                    )}
                  />
                </div>
                <span
                  className={cx(
                    "tabular-nums font-[family-name:var(--font-mono)] text-[11px]",
                    isSelected
                      ? "font-semibold text-[var(--text-primary)]"
                      : "text-[var(--text-muted)]"
                  )}
                >
                  {datum.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </MotionConfig>
  );
}
