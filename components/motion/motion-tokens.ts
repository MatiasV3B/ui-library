import type { Transition } from "motion/react";

/**
 * Tactile spring for buttons, tabs, dock pills, and discrete controls.
 * Matches AGENTS.md: stiffness 380, damping 32, mass 0.8.
 */
export const TACTILE_SPRING: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.8,
};

/**
 * Fluid spring for panels, modals, sheets, and App Store card expansions.
 * Matches AGENTS.md: stiffness 240, damping 28.
 */
export const FLUID_SPRING: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 28,
  mass: 1,
};

/**
 * Apple deceleration cubic-bezier for fixed-duration opacity or clip fades.
 */
export const APPLE_EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const APPLE_FADE_TRANSITION: Transition = {
  duration: 0.24,
  ease: APPLE_EASE_OUT,
};

/**
 * Short controlled stagger for related list items or detail sections (0.03s–0.05s).
 */
export const STAGGER_STEP_SECONDS = 0.04;
