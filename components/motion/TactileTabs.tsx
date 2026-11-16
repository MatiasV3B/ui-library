"use client";

import * as React from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { AlertCircle, Inbox, RotateCcw } from "lucide-react";
import { APPLE_FADE_TRANSITION, TACTILE_SPRING } from "./motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type TactileTabsVariant = "tabs" | "dock";
export type TactileTabsOrientation = "horizontal" | "vertical";

interface TactileTabsContextValue {
  activeValue: string;
  setActiveValue: (next: string) => void;
  variant: TactileTabsVariant;
  orientation: TactileTabsOrientation;
  instanceId: string;
  registerTrigger: (value: string, el: HTMLButtonElement | null) => void;
  focusRelative: (currentValue: string, delta: number | "first" | "last") => void;
}

const TactileTabsContext = React.createContext<TactileTabsContextValue | null>(
  null
);

function useTactileTabs() {
  const ctx = React.useContext(TactileTabsContext);
  if (!ctx) {
    throw new Error(
      "TactileTabs subcomponents must be used inside <TactileTabs>."
    );
  }
  return ctx;
}

export interface TactileTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TactileTabsVariant;
  orientation?: TactileTabsOrientation;
}

export function TactileTabs({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  variant = "tabs",
  orientation = "horizontal",
  className,
  children,
  ...props
}: TactileTabsProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;
  const instanceId = React.useId();

  const triggersRef = React.useRef<
    Array<{ value: string; el: HTMLButtonElement }>
  >([]);

  const setActiveValue = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const registerTrigger = React.useCallback(
    (triggerValue: string, el: HTMLButtonElement | null) => {
      const list = triggersRef.current.filter(
        (item) => item.value !== triggerValue
      );
      if (el) {
        list.push({ value: triggerValue, el });
      }
      triggersRef.current = list;
    },
    []
  );

  const focusRelative = React.useCallback(
    (currentValue: string, delta: number | "first" | "last") => {
      const enabled = triggersRef.current.filter((item) => !item.el.disabled);
      if (enabled.length === 0) return;

      let nextIndex = 0;
      if (delta === "first") {
        nextIndex = 0;
      } else if (delta === "last") {
        nextIndex = enabled.length - 1;
      } else {
        const currentIndex = enabled.findIndex(
          (item) => item.value === currentValue
        );
        const start = currentIndex === -1 ? 0 : currentIndex;
        nextIndex = (start + delta + enabled.length) % enabled.length;
      }

      const target = enabled[nextIndex];
      if (!target) return;
      target.el.focus();
      setActiveValue(target.value);
    },
    [setActiveValue]
  );

  const contextValue = React.useMemo<TactileTabsContextValue>(
    () => ({
      activeValue,
      setActiveValue,
      variant,
      orientation,
      instanceId,
      registerTrigger,
      focusRelative,
    }),
    [
      activeValue,
      setActiveValue,
      variant,
      orientation,
      instanceId,
      registerTrigger,
      focusRelative,
    ]
  );

  return (
    <MotionConfig reducedMotion="user">
      <TactileTabsContext.Provider value={contextValue}>
        <div
          data-slot="tactile-tabs"
          data-variant={variant}
          data-orientation={orientation}
          className={cx(
            "font-[family-name:var(--font-sans)] text-[var(--text-primary)]",
            orientation === "vertical" && "flex items-start gap-[var(--space-6)]",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TactileTabsContext.Provider>
    </MotionConfig>
  );
}

export type TactileTabsListProps = React.HTMLAttributes<HTMLDivElement>;

export function TactileTabsList({
  className,
  children,
  ...props
}: TactileTabsListProps) {
  const { variant, orientation } = useTactileTabs();

  const isDock = variant === "dock";
  const isVertical = orientation === "vertical";

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      data-slot="tactile-tabs-list"
      className={cx(
        "relative inline-flex items-center border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-1)]",
        isVertical ? "flex-col items-stretch" : "flex-row gap-[var(--space-1)]",
        isDock
          ? "rounded-[var(--radius-pill)] bg-[var(--surface-elevated)] border-[var(--border-default)] shadow-[var(--shadow-card)] px-[var(--space-2)] py-[var(--space-1)]"
          : "rounded-[var(--radius-lg)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TactileTabsTriggerProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
  > {
  value: string;
  icon?: React.ReactNode;
  count?: number;
}

export function TactileTabsTrigger({
  value,
  icon,
  count,
  className,
  children,
  disabled,
  onKeyDown,
  onClick,
  ...props
}: TactileTabsTriggerProps) {
  const {
    activeValue,
    setActiveValue,
    variant,
    orientation,
    instanceId,
    registerTrigger,
    focusRelative,
  } = useTactileTabs();
  const shouldReduceMotion = useReducedMotion();

  const isActive = activeValue === value;
  const isDock = variant === "dock";
  const tabId = `${instanceId}-tab-${value}`;
  const panelId = `${instanceId}-panel-${value}`;

  const refCallback = React.useCallback(
    (node: HTMLButtonElement | null) => {
      registerTrigger(value, node);
    },
    [registerTrigger, value]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";

    if (event.key === nextKey) {
      event.preventDefault();
      focusRelative(value, 1);
    } else if (event.key === prevKey) {
      event.preventDefault();
      focusRelative(value, -1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusRelative(value, "first");
    } else if (event.key === "End") {
      event.preventDefault();
      focusRelative(value, "last");
    }
  };

  return (
    <motion.button
      ref={refCallback}
      type="button"
      role="tab"
      id={tabId}
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      whileTap={disabled || shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={TACTILE_SPRING}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) {
          setActiveValue(value);
        }
      }}
      onKeyDown={handleKeyDown}
      data-state={isActive ? "active" : "inactive"}
      className={cx(
        "relative z-0 inline-flex items-center justify-center gap-[var(--space-2)] select-none whitespace-nowrap",
        "text-[length:var(--text-sm)] font-medium tracking-[var(--tracking-normal)] transition-colors duration-[var(--duration-fast)]",
        isDock
          ? "rounded-[var(--radius-pill)] px-[var(--space-4)] py-[var(--space-2)]"
          : "rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)]",
        isActive
          ? "text-[var(--text-primary)]"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        "disabled:pointer-events-none disabled:opacity-45",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
        className
      )}
      {...props}
    >
      {isActive ? (
        <motion.span
          layoutId={`tactile-indicator-${instanceId}`}
          transition={shouldReduceMotion ? { duration: 0 } : TACTILE_SPRING}
          aria-hidden="true"
          className={cx(
            "absolute inset-0 -z-10 border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--shadow-hairline)]",
            isDock
              ? "rounded-[var(--radius-pill)] border-[var(--border-default)] bg-[var(--surface-interactive)]"
              : "rounded-[var(--radius-md)]"
          )}
        />
      ) : null}

      {icon ? (
        <span
          aria-hidden="true"
          className={cx(
            "inline-flex shrink-0 items-center justify-center transition-colors",
            isActive
              ? "text-[var(--accent-primary)]"
              : "text-[var(--text-muted)]"
          )}
        >
          {icon}
        </span>
      ) : null}

      <span>{children}</span>

      {typeof count === "number" ? (
        <span
          className={cx(
            "tabular-nums rounded-[var(--radius-pill)] px-[var(--space-2)] py-0.5 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] leading-none",
            isActive
              ? "bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)]"
              : "bg-[var(--surface-interactive)] text-[var(--text-secondary)]"
          )}
        >
          {count}
        </span>
      ) : null}
    </motion.button>
  );
}

export interface TactileTabsContentProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

export function TactileTabsContent({
  value,
  className,
  children,
}: TactileTabsContentProps) {
  const { activeValue, instanceId } = useTactileTabs();
  const shouldReduceMotion = useReducedMotion();
  const isActive = activeValue === value;

  const tabId = `${instanceId}-tab-${value}`;
  const panelId = `${instanceId}-panel-${value}`;

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isActive ? (
        <motion.div
          key={value}
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId}
          tabIndex={0}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={shouldReduceMotion ? { duration: 0 } : APPLE_FADE_TRANSITION}
          className={cx(
            "mt-[var(--space-4)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-5)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
            className
          )}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function TactileTabsSkeleton({
  rows = 3,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className={cx("space-y-[var(--space-3)]", className)}
    >
      <div className="h-5 w-1/3 rounded-[var(--radius-sm)] bg-[var(--skeleton-base)]" />
      <div className="space-y-[var(--space-2)]">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="h-4 rounded-[var(--radius-xs)] bg-[var(--skeleton-base)]"
            style={{ width: `${92 - index * 14}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function TactileTabsEmpty({
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
        "flex flex-col items-start gap-[var(--space-3)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-5)]",
        className
      )}
    >
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]">
        <Inbox className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="space-y-[var(--space-1)]">
        <p className="text-[length:var(--text-sm)] font-semibold text-[var(--text-primary)]">
          {title}
        </p>
        <p className="max-w-[52ch] text-[length:var(--text-sm)] text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function TactileTabsError({
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
  return (
    <div
      role="alert"
      className={cx(
        "flex flex-col items-start gap-[var(--space-3)] rounded-[var(--radius-md)] border border-[var(--status-danger)] bg-[var(--status-danger-subtle)] p-[var(--space-5)]",
        className
      )}
    >
      <div className="flex items-center gap-[var(--space-2)] text-[var(--status-danger)]">
        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="text-[length:var(--text-sm)] font-semibold">{title}</p>
      </div>
      <p className="max-w-[52ch] text-[length:var(--text-sm)] text-[var(--text-primary)]">
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
          <span>{retryLabel}</span>
        </motion.button>
      ) : null}
    </div>
  );
}
