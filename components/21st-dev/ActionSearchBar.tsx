"use client";

import * as React from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, Search, X } from "lucide-react";
import { APPLE_FADE_TRANSITION, TACTILE_SPRING } from "../motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface SearchActionItem {
  id: string;
  label: string;
  category?: string;
  shortcut?: string;
}

export interface ActionSearchBarProps {
  actions: readonly SearchActionItem[];
  onSelect?: (action: SearchActionItem) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function ActionSearchBar({
  actions,
  onSelect,
  placeholder = "Filter commands or components...",
  emptyMessage = "No matching commands found.",
  className,
}: ActionSearchBarProps) {
  const [query, setQuery] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();
  const listId = React.useId();

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
    );
  }, [actions, query]);

  React.useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filtered.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex(
        (prev) => (prev - 1 + filtered.length) % filtered.length
      );
    } else if (event.key === "Enter") {
      const active = filtered[highlightedIndex];
      if (active) {
        event.preventDefault();
        onSelect?.(active);
      }
    } else if (event.key === "Escape") {
      setQuery("");
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cx(
          "w-full rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-2)] font-[var(--font-sans)] shadow-[var(--shadow-card)]",
          className
        )}
      >
        <div className="flex items-center gap-[var(--space-2)] px-[var(--space-2)]">
          <Search
            className="h-4 w-4 shrink-0 text-[var(--text-muted)]"
            aria-hidden="true"
          />
          <input
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={
              filtered[highlightedIndex]
                ? `${listId}-${filtered[highlightedIndex].id}`
                : undefined
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cx(
              "h-10 flex-1 bg-transparent text-[var(--text-sm)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-sm)]"
            )}
          />
          {query ? (
            <motion.button
              type="button"
              aria-label="Clear search"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              transition={TACTILE_SPRING}
              onClick={() => setQuery("")}
              className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:bg-[var(--surface-interactive)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.button>
          ) : null}
        </div>

        <div
          id={listId}
          role="listbox"
          className="mt-[var(--space-2)] space-y-0.5 border-t border-[var(--border-subtle)] pt-[var(--space-2)]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.length > 0 ? (
              filtered.map((item, idx) => {
                const isHighlighted = idx === highlightedIndex;
                return (
                  <motion.button
                    key={item.id}
                    id={`${listId}-${item.id}`}
                    type="button"
                    role="option"
                    aria-selected={isHighlighted}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                    transition={
                      shouldReduceMotion ? { duration: 0 } : APPLE_FADE_TRANSITION
                    }
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.985 }
                    }
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => onSelect?.(item)}
                    className={cx(
                      "group flex w-full items-center justify-between gap-[var(--space-3)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)] text-left text-[var(--text-sm)]",
                      "transition-colors duration-[var(--duration-fast)]",
                      isHighlighted
                        ? "bg-[var(--surface-interactive)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                    )}
                  >
                    <span className="flex items-center gap-[var(--space-2)] truncate">
                      <span className="font-medium">{item.label}</span>
                      {item.category ? (
                        <span className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
                          {item.category}
                        </span>
                      ) : null}
                    </span>

                    <span className="flex items-center gap-[var(--space-2)] shrink-0">
                      {item.shortcut ? (
                        <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] bg-[var(--surface-canvas)] px-[var(--space-1)] py-0.5 font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
                          {item.shortcut}
                        </kbd>
                      ) : null}
                      <ArrowRight
                        className={cx(
                          "h-3.5 w-3.5 transition-opacity",
                          isHighlighted
                            ? "opacity-100 text-[var(--accent-primary)]"
                            : "opacity-0 group-hover:opacity-100"
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </motion.button>
                );
              })
            ) : (
              <motion.div
                key="empty"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-[var(--space-3)] py-[var(--space-6)] text-center text-[var(--text-xs)] text-[var(--text-muted)]"
              >
                {emptyMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
