"use client";

import * as React from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { TACTILE_SPRING } from "../motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface PricingTier {
  id: string;
  name: string;
  summary: string;
  monthlyPrice: number;
  yearlyPrice: number;
  badge?: string;
}

export interface PricingSelectorProps {
  tiers: readonly PricingTier[];
  defaultTierId?: string;
  onSelectTier?: (tier: PricingTier, billing: "monthly" | "yearly") => void;
  ctaLabel?: string;
  className?: string;
}

export function PricingSelector({
  tiers,
  defaultTierId,
  onSelectTier,
  ctaLabel = "Continue with selected tier",
  className,
}: PricingSelectorProps) {
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("monthly");
  const [selectedId, setSelectedId] = React.useState<string>(
    defaultTierId ?? tiers[0]?.id ?? ""
  );
  const instanceId = React.useId();
  const shouldReduceMotion = useReducedMotion();

  const selectedTier =
    tiers.find((tier) => tier.id === selectedId) ?? tiers[0];

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cx(
          "flex w-full flex-col gap-[var(--space-4)] rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-4)] font-[var(--font-sans)] shadow-[var(--shadow-card)]",
          className
        )}
      >
        <div
          role="radiogroup"
          aria-label="Billing interval"
          className="relative grid grid-cols-2 rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-1)]"
        >
          {(["monthly", "yearly"] as const).map((period) => {
            const active = billing === period;
            return (
              <motion.button
                key={period}
                type="button"
                role="radio"
                aria-checked={active}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                transition={TACTILE_SPRING}
                onClick={() => setBilling(period)}
                className={cx(
                  "relative z-0 rounded-[var(--radius-pill)] py-[var(--space-2)] text-[var(--text-xs)] font-semibold capitalize select-none",
                  active
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId={`pricing-billing-${instanceId}`}
                    transition={
                      shouldReduceMotion ? { duration: 0 } : TACTILE_SPRING
                    }
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--shadow-hairline)]"
                  />
                ) : null}
                {period === "monthly" ? "Monthly" : "Yearly (-20%)"}
              </motion.button>
            );
          })}
        </div>

        <div role="radiogroup" aria-label="Plan tiers" className="space-y-[var(--space-2)]">
          {tiers.map((tier) => {
            const active = tier.id === selectedTier?.id;
            const price =
              billing === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;

            return (
              <motion.button
                key={tier.id}
                type="button"
                role="radio"
                aria-checked={active}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                transition={TACTILE_SPRING}
                onClick={() => setSelectedId(tier.id)}
                className={cx(
                  "relative flex w-full items-center justify-between gap-[var(--space-4)] rounded-[var(--radius-lg)] border p-[var(--space-4)] text-left",
                  "transition-colors duration-[var(--duration-fast)]",
                  active
                    ? "border-transparent bg-[var(--surface-elevated)]"
                    : "border-[var(--border-subtle)] bg-[var(--surface-canvas)] hover:border-[var(--border-default)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId={`pricing-tier-ring-${instanceId}`}
                    transition={
                      shouldReduceMotion ? { duration: 0 } : TACTILE_SPRING
                    }
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] border-2 border-[var(--accent-primary)]"
                  />
                ) : null}

                <div className="space-y-0.5">
                  <div className="flex items-center gap-[var(--space-2)]">
                    <span className="text-[var(--text-base)] font-semibold text-[var(--text-primary)]">
                      {tier.name}
                    </span>
                    {tier.badge ? (
                      <span className="rounded-[var(--radius-xs)] bg-[var(--accent-primary-subtle)] px-[var(--space-2)] py-0.5 font-[var(--font-mono)] text-[11px] font-semibold text-[var(--accent-primary)]">
                        {tier.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[var(--text-xs)] text-[var(--text-secondary)]">
                    {tier.summary}
                  </p>
                </div>

                <div className="flex items-center gap-[var(--space-3)] shrink-0">
                  <div className="text-right">
                    <span className="tabular-nums font-[var(--font-mono)] text-[var(--text-lg)] font-semibold text-[var(--text-primary)]">
                      ${price}
                    </span>
                    <span className="text-[var(--text-xs)] text-[var(--text-muted)]">
                      /mo
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className={cx(
                      "inline-flex h-5 w-5 items-center justify-center rounded-[var(--radius-pill)] border transition-colors",
                      active
                        ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--accent-primary-foreground)]"
                        : "border-[var(--border-default)] bg-transparent"
                    )}
                  >
                    {active ? <Check className="h-3 w-3" /> : null}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          type="button"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          transition={TACTILE_SPRING}
          onClick={() => {
            if (selectedTier) {
              onSelectTier?.(selectedTier, billing);
            }
          }}
          className="h-10 w-full rounded-[var(--radius-md)] bg-[var(--accent-primary)] px-[var(--space-4)] text-[var(--text-sm)] font-semibold text-[var(--accent-primary-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          {ctaLabel}
        </motion.button>
      </div>
    </MotionConfig>
  );
}
