import * as React from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const SurfaceCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SurfaceCard({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cx(
        "rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] font-[family-name:var(--font-sans)] text-[var(--text-primary)] shadow-[var(--shadow-hairline)]",
        className
      )}
      {...props}
    />
  );
});

export const SurfaceCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SurfaceCardHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cx(
        "flex flex-col gap-[var(--space-1)] p-[var(--space-6)]",
        className
      )}
      {...props}
    />
  );
});

export const SurfaceCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function SurfaceCardTitle({ className, ...props }, ref) {
  return (
    <h3
      ref={ref}
      className={cx(
        "font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-tight)] text-[var(--text-primary)]",
        className
      )}
      {...props}
    />
  );
});

export const SurfaceCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function SurfaceCardDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cx(
        "text-[length:var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-secondary)]",
        className
      )}
      {...props}
    />
  );
});

export const SurfaceCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SurfaceCardContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cx("px-[var(--space-6)] pb-[var(--space-6)]", className)}
      {...props}
    />
  );
});

export const SurfaceCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SurfaceCardFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cx(
        "flex items-center justify-between gap-[var(--space-3)] border-t border-[var(--border-subtle)] px-[var(--space-6)] py-[var(--space-4)]",
        className
      )}
      {...props}
    />
  );
});
