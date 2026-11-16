"use client";

import * as React from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { AlertCircle, RotateCcw, X } from "lucide-react";
import {
  APPLE_FADE_TRANSITION,
  FLUID_SPRING,
  STAGGER_STEP_SECONDS,
  TACTILE_SPRING,
} from "./motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

interface AppStoreCardContextValue {
  id: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const AppStoreCardContext =
  React.createContext<AppStoreCardContextValue | null>(null);

function useAppStoreCard() {
  const ctx = React.useContext(AppStoreCardContext);
  if (!ctx) {
    throw new Error(
      "AppStoreCard subcomponents must be used inside <AppStoreCard>."
    );
  }
  return ctx;
}

export function AppStoreCardGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const groupId = React.useId();
  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id={`app-store-group-${groupId}`}>
        <div
          data-slot="app-store-card-group"
          className={cx("font-[var(--font-sans)]", className)}
        >
          {children}
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}

export interface AppStoreCardProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function AppStoreCard({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: AppStoreCardProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
  const id = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const open = React.useCallback(() => setOpen(true), [setOpen]);
  const close = React.useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, [setOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  const value = React.useMemo<AppStoreCardContextValue>(
    () => ({ id, isOpen, open, close, triggerRef }),
    [id, isOpen, open, close]
  );

  return (
    <AppStoreCardContext.Provider value={value}>
      {children}
    </AppStoreCardContext.Provider>
  );
}

export interface AppStoreCardTriggerProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
  > {
  children: React.ReactNode;
}

export function AppStoreCardTrigger({
  className,
  children,
  onClick,
  ...props
}: AppStoreCardTriggerProps) {
  const { id, isOpen, open, triggerRef } = useAppStoreCard();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      ref={triggerRef}
      type="button"
      layoutId={`card-shell-${id}`}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={shouldReduceMotion ? { duration: 0 } : FLUID_SPRING}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          open();
        }
      }}
      className={cx(
        "group relative flex w-full flex-col overflow-hidden text-left",
        "rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)] shadow-[var(--shadow-card)]",
        "transition-colors duration-[var(--duration-fast)] hover:border-[var(--border-strong)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
        isOpen && "pointer-events-none opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function AppStoreCardMedia({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { id } = useAppStoreCard();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      layoutId={`card-media-${id}`}
      transition={shouldReduceMotion ? { duration: 0 } : FLUID_SPRING}
      className={cx(
        "relative w-full overflow-hidden bg-[var(--surface-sunken)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function AppStoreCardEyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { id } = useAppStoreCard();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      layoutId={`card-eyebrow-${id}`}
      transition={shouldReduceMotion ? { duration: 0 } : FLUID_SPRING}
      className={cx(
        "inline-block font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]",
        className
      )}
    >
      {children}
    </motion.span>
  );
}

export function AppStoreCardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { id } = useAppStoreCard();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.h3
      layoutId={`card-title-${id}`}
      transition={shouldReduceMotion ? { duration: 0 } : FLUID_SPRING}
      className={cx(
        "font-[var(--font-display)] text-[var(--text-2xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-[var(--text-primary)]",
        className
      )}
    >
      {children}
    </motion.h3>
  );
}

export function AppStoreCardSummary({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cx(
        "text-[var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-secondary)]",
        className
      )}
    >
      {children}
    </p>
  );
}

export interface AppStoreCardDetailProps {
  closeLabel?: string;
  className?: string;
  headerMedia?: React.ReactNode;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}

export function AppStoreCardDetail({
  closeLabel = "Close detail view",
  className,
  headerMedia,
  eyebrow,
  title,
  subtitle,
  children,
}: AppStoreCardDetailProps) {
  const { id, isOpen, close } = useAppStoreCard();
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const titleId = `${id}-dialog-title`;

  React.useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isOpen]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 110 || info.velocity.y > 420) {
      close();
    }
  };

  return (
    <AnimatePresence mode="popLayout">
      {isOpen ? (
        <div
          key={`detail-portal-${id}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-[var(--space-4)] sm:p-[var(--space-6)]"
        >
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : APPLE_FADE_TRANSITION
            }
            onClick={close}
            className="fixed inset-0 bg-[var(--surface-overlay)]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            layoutId={`card-shell-${id}`}
            drag={shouldReduceMotion ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.06, bottom: 0.28 }}
            onDragEnd={handleDragEnd}
            transition={shouldReduceMotion ? { duration: 0 } : FLUID_SPRING}
            className={cx(
              "relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden",
              "rounded-[var(--radius-2xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)] shadow-[var(--shadow-overlay)]",
              className
            )}
          >
            <div className="relative overflow-y-auto overscroll-contain">
              <div className="pointer-events-none sticky top-0 z-20 flex items-center justify-end p-[var(--space-4)]">
                <motion.button
                  ref={closeButtonRef}
                  type="button"
                  aria-label={closeLabel}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={TACTILE_SPRING}
                  onClick={close}
                  className={cx(
                    "pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-pill)]",
                    "border border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-[var(--shadow-hairline)]",
                    "hover:bg-[var(--surface-interactive)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </motion.button>
              </div>

              {headerMedia ? (
                <motion.div
                  layoutId={`card-media-${id}`}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : FLUID_SPRING
                  }
                  className="-mt-[4.25rem] w-full overflow-hidden bg-[var(--surface-sunken)]"
                >
                  {headerMedia}
                </motion.div>
              ) : null}

              <div className="space-y-[var(--space-6)] p-[var(--space-6)] sm:p-[var(--space-8)]">
                <header className="space-y-[var(--space-2)]">
                  {eyebrow ? (
                    <motion.span
                      layoutId={`card-eyebrow-${id}`}
                      transition={
                        shouldReduceMotion ? { duration: 0 } : FLUID_SPRING
                      }
                      className="inline-block font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]"
                    >
                      {eyebrow}
                    </motion.span>
                  ) : null}

                  <motion.h2
                    id={titleId}
                    layoutId={`card-title-${id}`}
                    transition={
                      shouldReduceMotion ? { duration: 0 } : FLUID_SPRING
                    }
                    className="font-[var(--font-display)] text-[var(--text-3xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-[var(--text-primary)]"
                  >
                    {title}
                  </motion.h2>

                  {subtitle ? (
                    <p className="max-w-[60ch] text-[var(--text-base)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
                      {subtitle}
                    </p>
                  ) : null}
                </header>

                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  transition={{
                    ...APPLE_FADE_TRANSITION,
                    delay: shouldReduceMotion ? 0 : STAGGER_STEP_SECONDS,
                  }}
                  className="space-y-[var(--space-5)] border-t border-[var(--border-subtle)] pt-[var(--space-5)]"
                >
                  {children}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export function AppStoreCardBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-[var(--space-2)] p-[var(--space-5)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AppStoreCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading card"
      className={cx(
        "overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)]",
        className
      )}
    >
      <div className="aspect-[16/10] w-full bg-[var(--skeleton-base)]" />
      <div className="space-y-[var(--space-3)] p-[var(--space-5)]">
        <div className="h-3 w-24 rounded-[var(--radius-xs)] bg-[var(--skeleton-base)]" />
        <div className="h-7 w-3/4 rounded-[var(--radius-sm)] bg-[var(--skeleton-base)]" />
        <div className="h-4 w-full rounded-[var(--radius-xs)] bg-[var(--skeleton-base)]" />
      </div>
    </div>
  );
}

export function AppStoreCardError({
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
        "flex flex-col justify-between gap-[var(--space-4)] rounded-[var(--radius-xl)] border border-[var(--status-danger)] bg-[var(--status-danger-subtle)] p-[var(--space-5)]",
        className
      )}
    >
      <div className="space-y-[var(--space-2)]">
        <div className="flex items-center gap-[var(--space-2)] text-[var(--status-danger)]">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <p className="text-[var(--text-sm)] font-semibold">{title}</p>
        </div>
        <p className="text-[var(--text-sm)] text-[var(--text-primary)]">
          {description}
        </p>
      </div>
      {onRetry ? (
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          transition={TACTILE_SPRING}
          onClick={onRetry}
          className="inline-flex w-fit items-center gap-[var(--space-2)] rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--text-xs)] font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{retryLabel}</span>
        </motion.button>
      ) : null}
    </div>
  );
}
