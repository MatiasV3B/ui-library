"use client";

import * as React from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { TACTILE_SPRING } from "../motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string = string> {
  options: readonly SegmentedOption<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  ariaLabel?: string;
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  ariaLabel = "Options",
  className,
}: SegmentedControlProps<T>) {
  const [uncontrolled, setUncontrolled] = React.useState<T | undefined>(
    defaultValue ?? options[0]?.value
  );
  const isControlled = controlledValue !== undefined;
  const active = isControlled ? controlledValue : uncontrolled;
  const instanceId = React.useId();
  const shouldReduceMotion = useReducedMotion();
  const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const select = React.useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolled(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (options.length === 0) return;
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % options.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + options.length) % options.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = options.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const targetOption = options[nextIndex];
      if (!targetOption) return;
      select(targetOption.value);
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className={cx(
          "inline-flex items-center gap-[var(--space-1)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-1)] font-[family-name:var(--font-sans)]",
          className
        )}
      >
        {options.map((option, index) => {
          const isSelected = active === option.value;
          return (
            <motion.button
              key={option.value}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              transition={TACTILE_SPRING}
              onClick={() => select(option.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cx(
                "relative z-0 rounded-[var(--radius-sm)] px-[var(--space-3)] py-[var(--space-1)] text-[length:var(--text-xs)] font-medium select-none",
                "transition-colors duration-[var(--duration-fast)]",
                isSelected
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              )}
            >
              {isSelected ? (
                <motion.span
                  layoutId={`segmented-pill-${instanceId}`}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : TACTILE_SPRING
                  }
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--shadow-hairline)]"
                />
              ) : null}
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </MotionConfig>
  );
}
