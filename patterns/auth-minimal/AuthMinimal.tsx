"use client";

import * as React from "react";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { TACTILE_SPRING } from "../../components/motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface AuthMinimalProps {
  title?: string;
  description?: string;
  onAuthenticate?: (email: string) => Promise<void> | void;
  className?: string;
}

export function AuthMinimal({
  title = "Sign in to workspace",
  description = "Enter your organization email to receive a one-time verification code.",
  onAuthenticate,
  className,
}: AuthMinimalProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "sent" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const shouldReduceMotion = useReducedMotion();
  const emailId = React.useId();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      await onAuthenticate?.(trimmed);
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Unable to dispatch verification code. Try again.");
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cx(
          "w-full max-w-md rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-6)] font-[family-name:var(--font-sans)] shadow-[var(--shadow-card)]",
          className
        )}
      >
        <div className="space-y-[var(--space-2)]">
          <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--text-muted)]">
            Authentication
          </span>
          <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)] text-[var(--text-primary)]">
            {title}
          </h3>
          <p className="text-[length:var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
            {description}
          </p>
        </div>

        {status === "sent" ? (
          <div className="mt-[var(--space-5)] space-y-[var(--space-4)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
            <div className="flex items-center gap-[var(--space-2)] text-[var(--status-success)]">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="text-[length:var(--text-sm)] font-semibold">
                Verification code sent
              </p>
            </div>
            <p className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
              Check <span className="font-[family-name:var(--font-mono)] text-[var(--text-primary)]">{email}</span> to complete sign-in.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-[length:var(--text-xs)] font-semibold text-[var(--accent-primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-xs)]"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-[var(--space-5)] space-y-[var(--space-4)]">
            <div className="space-y-1.5">
              <label
                htmlFor={emailId}
                className="block text-[length:var(--text-xs)] font-semibold text-[var(--text-primary)]"
              >
                Work email
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="name@company.com"
                aria-invalid={status === "error" || undefined}
                className={cx(
                  "h-10 w-full rounded-[var(--radius-md)] border bg-[var(--surface-canvas)] px-[var(--space-3)] text-[length:var(--text-sm)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
                  status === "error"
                    ? "border-[var(--status-danger)]"
                    : "border-[var(--border-default)] focus:border-[var(--border-strong)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                )}
              />
              {status === "error" && errorMsg ? (
                <p
                  role="alert"
                  className="flex items-center gap-1.5 text-[length:var(--text-xs)] text-[var(--status-danger)]"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </p>
              ) : null}
            </div>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileTap={
                status === "loading" || shouldReduceMotion
                  ? undefined
                  : { scale: 0.97 }
              }
              transition={TACTILE_SPRING}
              className="inline-flex h-10 w-full items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--accent-primary)] px-[var(--space-4)] text-[length:var(--text-sm)] font-semibold text-[var(--accent-primary-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <span>
                {status === "loading" ? "Sending code..." : "Continue with email"}
              </span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          </form>
        )}
      </div>
    </MotionConfig>
  );
}
