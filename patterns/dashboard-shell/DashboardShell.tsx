"use client";

import * as React from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { TACTILE_SPRING } from "../../components/motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface DashboardNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface DashboardShellProps {
  workspaceName: string;
  navItems: readonly DashboardNavItem[];
  activeNavId: string;
  onSelectNav: (id: string) => void;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({
  workspaceName,
  navItems,
  activeNavId,
  onSelectNav,
  headerActions,
  children,
  className,
}: DashboardShellProps) {
  const shouldReduceMotion = useReducedMotion();
  const instanceId = React.useId();

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cx(
          "grid min-h-[420px] w-full grid-cols-1 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-canvas)] font-[var(--font-sans)] text-[var(--text-primary)] shadow-[var(--shadow-card)] md:grid-cols-[220px_1fr]",
          className
        )}
      >
        <aside className="flex flex-col justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)] md:border-b-0 md:border-r">
          <div className="space-y-[var(--space-5)]">
            <div className="px-[var(--space-2)]">
              <span className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--text-muted)]">
                Workspace
              </span>
              <p className="mt-0.5 text-[var(--text-sm)] font-semibold text-[var(--text-primary)]">
                {workspaceName}
              </p>
            </div>

            <nav aria-label="Dashboard navigation" className="space-y-1">
              {navItems.map((item) => {
                const isActive = item.id === activeNavId;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.98 }
                    }
                    transition={TACTILE_SPRING}
                    onClick={() => onSelectNav(item.id)}
                    className={cx(
                      "relative z-0 flex w-full items-center justify-between gap-[var(--space-2)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)] text-left text-[var(--text-sm)] font-medium",
                      "transition-colors duration-[var(--duration-fast)]",
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId={`dash-nav-${instanceId}`}
                        transition={
                          shouldReduceMotion ? { duration: 0 } : TACTILE_SPRING
                        }
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--shadow-hairline)]"
                      />
                    ) : null}
                    <span className="flex items-center gap-[var(--space-2)] truncate">
                      <span
                        aria-hidden="true"
                        className={
                          isActive
                            ? "text-[var(--accent-primary)]"
                            : "text-[var(--text-muted)]"
                        }
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </span>
                    {typeof item.badge === "number" ? (
                      <span className="tabular-nums font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
                        {item.badge}
                      </span>
                    ) : null}
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="flex flex-col">
          {headerActions ? (
            <header className="flex flex-wrap items-center justify-between gap-[var(--space-3)] border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-[var(--space-6)] py-[var(--space-4)]">
              {headerActions}
            </header>
          ) : null}
          <main className="flex-1 p-[var(--space-6)]">{children}</main>
        </div>
      </div>
    </MotionConfig>
  );
}
