"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { TACTILE_SPRING } from "../../components/motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface HeroEditorialProps {
  eyebrow: string;
  headline: string;
  summary: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  specs?: ReadonlyArray<{
    label: string;
    value: string;
  }>;
  artifact: React.ReactNode;
  className?: string;
}

export function HeroEditorial({
  eyebrow,
  headline,
  summary,
  primaryAction,
  secondaryAction,
  specs,
  artifact,
  className,
}: HeroEditorialProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section
        className={cx(
          "border-b border-[var(--border-subtle)] bg-[var(--surface-canvas)] py-[var(--space-12)] lg:py-[var(--space-16)] font-[var(--font-sans)] text-[var(--text-primary)]",
          className
        )}
      >
        <div className="mx-auto grid w-full max-w-[var(--container-ui)] grid-cols-1 items-start gap-[var(--space-10)] px-[var(--space-4)] sm:px-[var(--space-6)] lg:grid-cols-12 lg:gap-[var(--space-12)] lg:px-[var(--space-8)]">
          <div className="flex flex-col gap-[var(--space-6)] lg:col-span-6">
            <span className="w-fit font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
              {eyebrow}
            </span>

            <h1 className="font-[var(--font-display)] text-[var(--text-display-lg)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tighter)] text-[var(--text-primary)]">
              {headline}
            </h1>

            <p className="max-w-[54ch] text-[var(--text-base)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
              {summary}
            </p>

            {primaryAction || secondaryAction ? (
              <div className="flex flex-wrap items-center gap-[var(--space-3)]">
                {primaryAction ? (
                  <motion.a
                    href={primaryAction.href}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    transition={TACTILE_SPRING}
                    className="inline-flex h-10 items-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--accent-primary)] px-[var(--space-4)] text-[var(--text-sm)] font-semibold text-[var(--accent-primary-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  >
                    <span>{primaryAction.label}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </motion.a>
                ) : null}

                {secondaryAction ? (
                  <motion.a
                    href={secondaryAction.href}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                    transition={TACTILE_SPRING}
                    className="inline-flex h-10 items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-4)] text-[var(--text-sm)] font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  >
                    {secondaryAction.label}
                  </motion.a>
                ) : null}
              </div>
            ) : null}

            {specs && specs.length > 0 ? (
              <dl className="grid grid-cols-2 gap-[var(--space-4)] border-t border-[var(--border-subtle)] pt-[var(--space-5)] sm:grid-cols-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="space-y-1">
                    <dt className="text-[var(--text-xs)] text-[var(--text-muted)]">
                      {spec.label}
                    </dt>
                    <dd className="tabular-nums font-[var(--font-mono)] text-[var(--text-sm)] font-semibold text-[var(--text-primary)]">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <div className="lg:col-span-6">{artifact}</div>
        </div>
      </section>
    </MotionConfig>
  );
}
