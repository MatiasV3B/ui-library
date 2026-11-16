"use client";

import * as React from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { AlertCircle, ArrowUpRight, Layers, RotateCcw } from "lucide-react";
import { TACTILE_SPRING } from "./motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface ProductShowcaseChapter {
  id: string;
  indexLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  metric?: {
    label: string;
    value: string;
  };
}

export interface StickyProductShowcaseProps {
  chapters: readonly ProductShowcaseChapter[];
  renderVisual: (progress: MotionValue<number>) => React.ReactNode;
  sectionLabel?: string;
  cta?: {
    label: string;
    href: string;
  };
  className?: string;
}

interface ChapterRowProps {
  chapter: ProductShowcaseChapter;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
}

function ChapterRow({
  chapter,
  index,
  total,
  scrollYProgress,
  reducedMotion,
  onSelect,
}: ChapterRowProps) {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const peakIn = start + segment * 0.2;
  const peakOut = start + segment * 0.8;
  const end = (index + 1) * segment;

  const isSingle = total <= 1;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const opacityRange = isSingle
    ? [0, 1]
    : isFirst
      ? [0, peakOut, end]
      : isLast
        ? [start, peakIn, 1]
        : [start, peakIn, peakOut, end];
  const opacityOutput = isSingle
    ? [1, 1]
    : isFirst
      ? [1, 1, 0.34]
      : isLast
        ? [0.34, 1, 1]
        : [0.34, 1, 1, 0.34];

  const yRange = isSingle
    ? [0, 1]
    : isFirst
      ? [0, end]
      : isLast
        ? [start, peakIn]
        : [start, peakIn, end];
  const yOutput = isSingle
    ? [0, 0]
    : isFirst
      ? [0, -8]
      : isLast
        ? [10, 0]
        : [10, 0, -8];

  const opacity = useTransform(scrollYProgress, opacityRange, opacityOutput);
  const y = useTransform(scrollYProgress, yRange, yOutput);

  return (
    <motion.div
      style={reducedMotion ? undefined : { opacity, y }}
      className="border-t border-[var(--border-subtle)] pt-[var(--space-4)] first:border-t-0 first:pt-0"
    >
      <motion.button
        type="button"
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        transition={TACTILE_SPRING}
        onClick={() => onSelect(index)}
        className={cx(
          "group flex w-full flex-col gap-[var(--space-2)] rounded-[var(--radius-md)] p-[var(--space-2)] -mx-[var(--space-2)] text-left",
          "transition-colors duration-[var(--duration-fast)] hover:bg-[var(--surface-sunken)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        )}
      >
        <div className="flex items-center justify-between gap-[var(--space-3)]">
          <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
            {chapter.eyebrow}
          </span>
          <span className="tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
            {chapter.indexLabel}
          </span>
        </div>

        <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-tight)] text-[var(--text-primary)]">
          {chapter.title}
        </h3>

        <p className="max-w-[46ch] text-[length:var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
          {chapter.description}
        </p>

        {chapter.metric ? (
          <div className="mt-[var(--space-1)] flex items-baseline justify-between border-t border-[var(--border-subtle)] pt-[var(--space-2)]">
            <span className="text-[length:var(--text-xs)] text-[var(--text-muted)]">
              {chapter.metric.label}
            </span>
            <span className="tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] font-semibold text-[var(--text-primary)]">
              {chapter.metric.value}
            </span>
          </div>
        ) : null}
      </motion.button>
    </motion.div>
  );
}

export function StickyProductShowcase({
  chapters,
  renderVisual,
  sectionLabel = "Product architecture",
  cta,
  className,
}: StickyProductShowcaseProps) {
  const containerRef = React.useRef<HTMLElement | null>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const stageClipPath = useTransform(
    scrollYProgress,
    [0, 0.32, 0.75, 1],
    [
      "inset(10% 8% 10% 8% round 20px)",
      "inset(0% 0% 0% 0% round 14px)",
      "inset(0% 0% 0% 0% round 14px)",
      "inset(4% 3% 4% 3% round 18px)",
    ]
  );

  const stageScale = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0.95, 1, 0.985]
  );

  const mediaParallaxY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const scrollToChapter = React.useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container || chapters.length === 0) return;
      const rect = container.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const scrollableDistance = Math.max(
        container.offsetHeight - window.innerHeight,
        0
      );
      const targetProgress =
        chapters.length === 1 ? 0 : index / (chapters.length - 1);
      window.scrollTo({
        top: top + scrollableDistance * targetProgress,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    },
    [chapters.length, shouldReduceMotion]
  );

  if (chapters.length === 0) {
    return <StickyProductShowcaseEmpty />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={containerRef}
        aria-label={sectionLabel}
        style={{
          minHeight: `${Math.max(chapters.length, 2) * 90}vh`,
        }}
        className={cx(
          "relative w-full overflow-x-clip bg-[var(--surface-canvas)] font-[family-name:var(--font-sans)] text-[var(--text-primary)]",
          className
        )}
      >
        <div className="sticky top-0 flex min-h-screen items-center py-[var(--space-8)] lg:py-[var(--space-12)]">
          <div className="mx-auto w-full max-w-[var(--container-ui)] px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="mb-[var(--space-6)] flex items-center justify-between gap-[var(--space-4)]">
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--text-secondary)]">
                {sectionLabel}
              </span>

              <div
                aria-hidden="true"
                className="h-[2px] w-32 overflow-hidden rounded-[var(--radius-pill)] bg-[var(--border-subtle)] sm:w-48"
              >
                <motion.div
                  style={{
                    scaleX: shouldReduceMotion ? 1 : scrollYProgress,
                  }}
                  className="h-full origin-left bg-[var(--accent-primary)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-[var(--space-8)] lg:grid-cols-12 lg:gap-[var(--space-10)]">
              <div className="order-2 flex flex-col gap-[var(--space-4)] lg:order-1 lg:col-span-5">
                {chapters.map((chapter, index) => (
                  <ChapterRow
                    key={chapter.id}
                    chapter={chapter}
                    index={index}
                    total={chapters.length}
                    scrollYProgress={scrollYProgress}
                    reducedMotion={shouldReduceMotion}
                    onSelect={scrollToChapter}
                  />
                ))}

                {cta ? (
                  <div className="pt-[var(--space-2)]">
                    <motion.a
                      href={cta.href}
                      whileTap={
                        shouldReduceMotion ? undefined : { scale: 0.97 }
                      }
                      transition={TACTILE_SPRING}
                      className={cx(
                        "inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)]",
                        "bg-[var(--accent-primary)] px-[var(--space-4)] py-[var(--space-3)]",
                        "text-[length:var(--text-sm)] font-semibold text-[var(--accent-primary-foreground)]",
                        "transition-colors duration-[var(--duration-fast)] hover:bg-[var(--accent-primary-hover)]",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                      )}
                    >
                      <span>{cta.label}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </motion.a>
                  </div>
                ) : null}
              </div>

              <div className="order-1 lg:order-2 lg:col-span-7">
                <motion.div
                  style={
                    shouldReduceMotion
                      ? undefined
                      : {
                          clipPath: stageClipPath,
                          scale: stageScale,
                        }
                  }
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-elevated)] shadow-[var(--shadow-card)] lg:aspect-[16/11]"
                >
                  <motion.div
                    style={
                      shouldReduceMotion ? undefined : { y: mediaParallaxY }
                    }
                    className="h-full w-full"
                  >
                    {renderVisual(scrollYProgress)}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

export function StickyProductShowcaseSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-label="Loading product showcase"
      className={cx(
        "mx-auto grid w-full max-w-[var(--container-ui)] grid-cols-1 gap-[var(--space-8)] px-[var(--space-6)] py-[var(--space-12)] lg:grid-cols-12",
        className
      )}
    >
      <div className="space-y-[var(--space-5)] lg:col-span-5">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="space-y-[var(--space-2)] border-t border-[var(--border-subtle)] pt-[var(--space-4)] first:border-t-0 first:pt-0"
          >
            <div className="h-3 w-24 rounded-[var(--radius-xs)] bg-[var(--skeleton-base)]" />
            <div className="h-6 w-3/4 rounded-[var(--radius-sm)] bg-[var(--skeleton-base)]" />
            <div className="h-4 w-full rounded-[var(--radius-xs)] bg-[var(--skeleton-base)]" />
          </div>
        ))}
      </div>
      <div className="aspect-[16/11] w-full rounded-[var(--radius-lg)] bg-[var(--skeleton-base)] lg:col-span-7" />
    </div>
  );
}

export function StickyProductShowcaseEmpty({
  title = "No showcase chapters configured",
  description = "Provide at least one chapter with a title and metric to render the sticky sequence.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "mx-auto flex w-full max-w-[var(--container-ui)] flex-col items-start gap-[var(--space-3)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-8)]",
        className
      )}
    >
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]">
        <Layers className="h-4 w-4" aria-hidden="true" />
      </div>
      <p className="text-[length:var(--text-base)] font-semibold text-[var(--text-primary)]">
        {title}
      </p>
      <p className="max-w-[52ch] text-[length:var(--text-sm)] text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );
}

export function StickyProductShowcaseError({
  title = "Unable to load visual sequence",
  description = "Verify product media assets or try loading again.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cx(
        "mx-auto flex w-full max-w-[var(--container-ui)] flex-col items-start gap-[var(--space-3)] rounded-[var(--radius-lg)] border border-[var(--status-danger)] bg-[var(--status-danger-subtle)] p-[var(--space-8)]",
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
          whileTap={{ scale: 0.97 }}
          transition={TACTILE_SPRING}
          onClick={onRetry}
          className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] py-[var(--space-2)] text-[length:var(--text-xs)] font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Retry</span>
        </motion.button>
      ) : null}
    </div>
  );
}
