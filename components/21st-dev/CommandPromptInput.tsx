"use client";

import * as React from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { ArrowUp, Compass, FileSearch, Terminal } from "lucide-react";
import { TACTILE_SPRING } from "../motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type PromptMode = "registry" | "audit" | "tokens";

export interface CommandPromptInputProps {
  onSubmitPrompt?: (payload: { prompt: string; mode: PromptMode }) => void;
  placeholder?: string;
  className?: string;
}

const MODES: ReadonlyArray<{
  id: PromptMode;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: "registry", label: "Registry", icon: <Compass className="h-3.5 w-3.5" /> },
  { id: "audit", label: "Audit", icon: <FileSearch className="h-3.5 w-3.5" /> },
  { id: "tokens", label: "Tokens", icon: <Terminal className="h-3.5 w-3.5" /> },
];

export function CommandPromptInput({
  onSubmitPrompt,
  placeholder = "Ask an agent to compose a dashboard view using registry.json...",
  className,
}: CommandPromptInputProps) {
  const [value, setValue] = React.useState("");
  const [mode, setMode] = React.useState<PromptMode>("registry");
  const shouldReduceMotion = useReducedMotion();
  const instanceId = React.useId();

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmitPrompt?.({ prompt: trimmed, mode });
    setValue("");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cx(
          "w-full rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-3)] font-[family-name:var(--font-sans)] shadow-[var(--shadow-card)]",
          className
        )}
      >
        <textarea
          rows={2}
          aria-label="Prompt input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={placeholder}
          className="w-full resize-none rounded-[var(--radius-md)] bg-transparent px-[var(--space-2)] py-[var(--space-1)] text-[length:var(--text-sm)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        />

        <div className="mt-[var(--space-2)] flex flex-wrap items-center justify-between gap-[var(--space-2)] border-t border-[var(--border-subtle)] pt-[var(--space-2)]">
          <div
            role="radiogroup"
            aria-label="Prompt context mode"
            className="inline-flex items-center gap-[var(--space-1)] rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-0.5"
          >
            {MODES.map((m) => {
              const active = mode === m.id;
              return (
                <motion.button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  transition={TACTILE_SPRING}
                  onClick={() => setMode(m.id)}
                  className={cx(
                    "relative z-0 inline-flex items-center gap-[var(--space-1)] rounded-[var(--radius-sm)] px-[var(--space-2)] py-[var(--space-1)] text-[length:var(--text-xs)] font-medium",
                    active
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId={`prompt-mode-${instanceId}`}
                      transition={
                        shouldReduceMotion ? { duration: 0 } : TACTILE_SPRING
                      }
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-[var(--shadow-hairline)]"
                    />
                  ) : null}
                  <span aria-hidden="true" className={active ? "text-[var(--accent-primary)]" : ""}>
                    {m.icon}
                  </span>
                  <span>{m.label}</span>
                </motion.button>
              );
            })}
          </div>

          <motion.button
            type="button"
            aria-label="Dispatch prompt"
            disabled={!value.trim()}
            whileTap={
              !value.trim() || shouldReduceMotion ? undefined : { scale: 0.97 }
            }
            transition={TACTILE_SPRING}
            onClick={submit}
            className="inline-flex h-8 items-center gap-[var(--space-1)] rounded-[var(--radius-md)] bg-[var(--accent-primary)] px-[var(--space-3)] text-[length:var(--text-xs)] font-semibold text-[var(--accent-primary-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            <span>Send</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </MotionConfig>
  );
}
