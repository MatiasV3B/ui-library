import type { FileTreeNode } from "../../../components/21st-dev/FileTree";
import type { SearchActionItem } from "../../../components/21st-dev/ActionSearchBar";
import type { PricingTier } from "../../../components/21st-dev/PricingSelector";
import type { RemovableTagItem } from "../../../components/21st-dev/StatusTag";
import type { BarDatum } from "../../../components/data-viz/BarDistribution";
import type { ProductShowcaseChapter } from "../../../components/motion/StickyProductShowcase";

export type PaletteId = "cobalt" | "pine" | "vermilion" | "amber" | "ink";

export interface PalettePreset {
  id: PaletteId;
  name: string;
  tagline: string;
  lightAccent: string;
  darkAccent: string;
  lightCanvas: string;
  darkCanvas: string;
  contrastLabel: string;
}

export const PALETTE_PRESETS: readonly PalettePreset[] = [
  {
    id: "cobalt",
    name: "Signal Cobalt",
    tagline: "Warm alabaster + crisp cobalt ink",
    lightAccent: "#1d4ed8",
    darkAccent: "#60a5fa",
    lightCanvas: "#fafaf9",
    darkCanvas: "#121211",
    contrastLabel: "6.7 : 1",
  },
  {
    id: "pine",
    name: "Forest Pine",
    tagline: "Mineral paper + botanical green",
    lightAccent: "#15803d",
    darkAccent: "#4ade80",
    lightCanvas: "#f8faf8",
    darkCanvas: "#101311",
    contrastLabel: "5.1 : 1",
  },
  {
    id: "vermilion",
    name: "Vermilion Ink",
    tagline: "Editorial ivory + Swiss press red",
    lightAccent: "#b91c1c",
    darkAccent: "#f87171",
    lightCanvas: "#fbfaf8",
    darkCanvas: "#141110",
    contrastLabel: "6.4 : 1",
  },
  {
    id: "amber",
    name: "Ochre Amber",
    tagline: "Archival stock + burnished ochre",
    lightAccent: "#b45309",
    darkAccent: "#fbbf24",
    lightCanvas: "#faf9f6",
    darkCanvas: "#131210",
    contrastLabel: "5.0 : 1",
  },
  {
    id: "ink",
    name: "Swiss Ink",
    tagline: "Pure carbon monochrome precision",
    lightAccent: "#141413",
    darkAccent: "#f5f4f1",
    lightCanvas: "#fafafa",
    darkCanvas: "#111111",
    contrastLabel: "17.5 : 1",
  },
];

export const REPO_TREE_NODES: readonly FileTreeNode[] = [
  {
    id: "root-agents",
    name: "AGENTS.md",
    type: "file",
    meta: "Codex",
  },
  {
    id: "root-claude",
    name: "CLAUDE.md",
    type: "file",
    meta: "Claude",
  },
  {
    id: "root-registry",
    name: "registry.json",
    type: "file",
    meta: "22 items",
  },
  {
    id: "dir-tokens",
    name: "tokens",
    type: "dir",
    children: [
      { id: "tok-colors", name: "colors.css", type: "file", meta: "5 palettes" },
      { id: "tok-typo", name: "typography.css", type: "file", meta: "3 pairings" },
      { id: "tok-motion", name: "spacing-motion.css", type: "file", meta: "Springs" },
    ],
  },
  {
    id: "dir-primitives",
    name: "primitives",
    type: "dir",
    children: [
      { id: "prim-btn", name: "radix/ActionButton.tsx", type: "file", meta: "Layer 1" },
      { id: "prim-card", name: "radix/SurfaceCard.tsx", type: "file", meta: "Layer 1" },
    ],
  },
  {
    id: "dir-components",
    name: "components",
    type: "dir",
    children: [
      { id: "comp-tabs", name: "motion/TactileTabs.tsx", type: "file", meta: "layoutId" },
      { id: "comp-card", name: "motion/AppStoreCard.tsx", type: "file", meta: "AnimatePresence" },
      { id: "comp-sticky", name: "motion/StickyProductShowcase.tsx", type: "file", meta: "useScroll" },
      { id: "comp-drawer", name: "motion/MotionDrawer.tsx", type: "file", meta: "drag='y'" },
      { id: "comp-number", name: "motion/AnimatedNumber.tsx", type: "file", meta: "tabular-nums" },
      { id: "comp-seg", name: "21st-dev/SegmentedControl.tsx", type: "file", meta: "Curated" },
      { id: "comp-tag", name: "21st-dev/StatusTag.tsx", type: "file", meta: "popLayout" },
      { id: "comp-prompt", name: "21st-dev/CommandPromptInput.tsx", type: "file", meta: "Composer" },
      { id: "comp-kpi", name: "data-viz/KpiMetricCard.tsx", type: "file", meta: "tabular-nums" },
      { id: "comp-bar", name: "data-viz/BarDistribution.tsx", type: "file", meta: "ScaleY" },
    ],
  },
  {
    id: "dir-patterns",
    name: "patterns",
    type: "dir",
    children: [
      { id: "pat-hero", name: "hero-editorial/HeroEditorial.tsx", type: "file", meta: "Layer 3" },
      { id: "pat-dash", name: "dashboard-shell/DashboardShell.tsx", type: "file", meta: "Layer 3" },
      { id: "pat-auth", name: "auth-minimal/AuthMinimal.tsx", type: "file", meta: "Layer 3" },
    ],
  },
  {
    id: "dir-guidelines",
    name: "guidelines",
    type: "dir",
    children: [
      { id: "guide-slop", name: "anti-slop-checklist.md", type: "file", meta: "Layer 4" },
      { id: "guide-typo", name: "typography-pairings.md", type: "file", meta: "Layer 4" },
      { id: "guide-comp", name: "composition-rules.md", type: "file", meta: "Layer 4" },
    ],
  },
];

export const FILE_DESCRIPTIONS: Record<string, { title: string; summary: string }> = {
  "root-agents": {
    title: "AGENTS.md — Master Rules",
    summary:
      "Defines strict anti-AI-slop prohibitions, Apple-grade Motion physics, and the mandatory 6-step pre-delivery audit.",
  },
  "root-claude": {
    title: "CLAUDE.md — Claude Code Sync",
    summary:
      "Symlink or synchronized mirror of AGENTS.md so Claude Code enforces identical architecture and token rules.",
  },
  "root-registry": {
    title: "registry.json — Shadcn Discovery Index",
    summary:
      "Machine-readable catalog of all 22 tokens, primitives, motion blocks, curated 21st.dev pieces, data-viz blocks, and patterns.",
  },
  "tok-colors": {
    title: "tokens/colors.css",
    summary:
      "Light & dark semantic surfaces plus 5 single-accent [data-palette] presets (cobalt, pine, vermilion, amber, ink) with >= 4.5:1 contrast.",
  },
  "tok-typo": {
    title: "tokens/typography.css",
    summary:
      "Curated Technical, Editorial, and Geometric pairings with fluid clamp() display sizes and tabular-nums utilities.",
  },
  "tok-motion": {
    title: "tokens/spacing-motion.css",
    summary:
      "4px/8px spatial scale, concentric border radii, neutral hairline shadows, and cubic-bezier(0.22, 1, 0.36, 1) easing.",
  },
  "prim-btn": {
    title: "primitives/radix/ActionButton.tsx",
    summary:
      "Accessible button primitive with primary/secondary/outline/ghost variants, tactile scale(0.97) feedback, :focus-visible ring, and loading state.",
  },
  "prim-card": {
    title: "primitives/radix/SurfaceCard.tsx",
    summary:
      "Composable card subcomponents (Header, Title, Description, Content, Footer) styled with 1px hairline borders.",
  },
  "comp-tabs": {
    title: "components/motion/TactileTabs.tsx",
    summary:
      "Tabs and Dock switcher using scoped layoutId, tactile spring (380/32/0.8), WAI-ARIA arrow navigation, and popLayout exits.",
  },
  "comp-card": {
    title: "components/motion/AppStoreCard.tsx",
    summary:
      "Expandable App Store card morphing shell, media, eyebrow, and title via layoutId with drag='y' dismissal.",
  },
  "comp-sticky": {
    title: "components/motion/StickyProductShowcase.tsx",
    summary:
      "Scroll-linked sticky stage transforming clip-path, scale, and chapter opacity without repetitive fade-in-up triggers.",
  },
  "comp-drawer": {
    title: "components/motion/MotionDrawer.tsx",
    summary:
      "Apple-style draggable bottom/center sheet with drag='y' elastic inertia, Escape key handling, and automatic focus restoration.",
  },
  "comp-number": {
    title: "components/motion/AnimatedNumber.tsx",
    summary:
      "Viewport-triggered numeric counter enforcing tabular-nums alignment, APPLE_EASE_OUT curve, and reduced-motion safety.",
  },
  "comp-seg": {
    title: "components/21st-dev/SegmentedControl.tsx",
    summary:
      "Filtered 21st.dev component upgraded with WAI-ARIA radiogroup semantics, arrow keys, and tactile spring indicator.",
  },
  "comp-tag": {
    title: "components/21st-dev/StatusTag.tsx",
    summary:
      "Semantic dot status pills and animated RemovableTagGroup using layout + AnimatePresence mode='popLayout'.",
  },
  "comp-prompt": {
    title: "components/21st-dev/CommandPromptInput.tsx",
    summary:
      "Curated multi-line prompt composer with layoutId mode switcher, Enter-to-dispatch, and tactile submit action.",
  },
  "comp-kpi": {
    title: "components/data-viz/KpiMetricCard.tsx",
    summary:
      "Metric summary card enforcing right-aligned tabular-nums, semantic trend deltas, and layout-matched skeleton/error states.",
  },
  "comp-bar": {
    title: "components/data-viz/BarDistribution.tsx",
    summary:
      "Swiss telemetry bar chart with hover/focus scrubbing, tabular-nums header readout, and GPU scaleY entrance.",
  },
  "pat-hero": {
    title: "patterns/hero-editorial/HeroEditorial.tsx",
    summary:
      "Asymmetric 50/50 split hero pairing concrete thesis copy and tabular specs with a live interactive artifact.",
  },
  "pat-dash": {
    title: "patterns/dashboard-shell/DashboardShell.tsx",
    summary:
      "Persistent workspace frame with layoutId active rail indicator, tabular counters, and crisp 1px structural dividers.",
  },
  "pat-auth": {
    title: "patterns/auth-minimal/AuthMinimal.tsx",
    summary:
      "Focused email verification flow demonstrating idle, loading, inline role='alert' error, and sent states.",
  },
  "guide-slop": {
    title: "guidelines/anti-slop-checklist.md",
    summary:
      "Pre-commit checklist auditing palettes, typography, subtraction, GPU motion, icon consistency, and keyboard support.",
  },
  "guide-typo": {
    title: "guidelines/typography-pairings.md",
    summary:
      "Approved pairing matrix banning unexamined Inter/Geist defaults and single-axis color dimming.",
  },
  "guide-comp": {
    title: "guidelines/composition-rules.md",
    summary:
      "Rules for editorial splits, unequal bento grids, concentric border radii, and state completeness.",
  },
};

export const REGISTRY_ACTIONS: readonly SearchActionItem[] = [
  { id: "action-button", label: "ActionButton", category: "primitives/radix", shortcut: "button" },
  { id: "surface-card", label: "SurfaceCard", category: "primitives/radix", shortcut: "card" },
  { id: "tactile-tabs", label: "TactileTabs & Dock", category: "components/motion", shortcut: "layoutId" },
  { id: "app-store-card", label: "AppStoreCard", category: "components/motion", shortcut: "sheet" },
  { id: "sticky-product-showcase", label: "StickyProductShowcase", category: "components/motion", shortcut: "useScroll" },
  { id: "motion-drawer", label: "MotionDrawer", category: "components/motion", shortcut: "drag='y'" },
  { id: "animated-number", label: "AnimatedNumber", category: "components/motion", shortcut: "counter" },
  { id: "segmented-control", label: "SegmentedControl", category: "components/21st-dev", shortcut: "radiogroup" },
  { id: "action-search-bar", label: "ActionSearchBar", category: "components/21st-dev", shortcut: "combobox" },
  { id: "pricing-selector", label: "PricingSelector", category: "components/21st-dev", shortcut: "tabular" },
  { id: "status-tag", label: "StatusTag & RemovableTagGroup", category: "components/21st-dev", shortcut: "popLayout" },
  { id: "command-prompt-input", label: "CommandPromptInput", category: "components/21st-dev", shortcut: "composer" },
  { id: "kpi-metric-card", label: "KpiMetricCard", category: "components/data-viz", shortcut: "metrics" },
  { id: "bar-distribution", label: "BarDistribution", category: "components/data-viz", shortcut: "chart" },
  { id: "hero-editorial", label: "HeroEditorial", category: "patterns", shortcut: "split" },
  { id: "dashboard-shell", label: "DashboardShell", category: "patterns", shortcut: "shell" },
  { id: "auth-minimal", label: "AuthMinimal", category: "patterns", shortcut: "form" },
];

export const SHOWCASE_CHAPTERS: readonly ProductShowcaseChapter[] = [
  {
    id: "tokens",
    indexLabel: "01",
    eyebrow: "Token Contract",
    title: "Semantic surfaces replace arbitrary hex values.",
    description:
      "Every view consumes light, dark, and [data-palette] CSS variables from tokens/colors.css—keeping primary text above 7:1 contrast and eliminating #09090b + purple-cyan defaults.",
    metric: {
      label: "Primary text contrast",
      value: "17.5 : 1",
    },
  },
  {
    id: "springs",
    indexLabel: "02",
    eyebrow: "Calibrated Springs",
    title: "Real spring physics over flat ease-in-out.",
    description:
      "Discrete controls snap with 380 / 32 / 0.8 tactile springs while drawers and modal cards glide on 240 / 28 fluid springs, always respecting reduced-motion preferences.",
    metric: {
      label: "Tap compression",
      value: "scale(0.97)",
    },
  },
  {
    id: "gpu",
    indexLabel: "03",
    eyebrow: "GPU Composition",
    title: "Scroll-linked clip-path without fade-in-up spam.",
    description:
      "Container scroll progress drives composited transform, opacity, and clip-path directly on the GPU inside sticky stages—zero layout-thrashing width or margin animations.",
    metric: {
      label: "Animated properties",
      value: "transform · opacity · clip-path",
    },
  },
];

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "core",
    name: "Core Registry",
    summary: "Tokens, primitives, and anti-slop checklists for solo engineers.",
    monthlyPrice: 0,
    yearlyPrice: 0,
  },
  {
    id: "studio",
    name: "Design Studio",
    summary: "Motion blocks, curated 21st.dev pieces, and pattern templates.",
    monthlyPrice: 24,
    yearlyPrice: 19,
    badge: "Recommended",
  },
  {
    id: "org",
    name: "Engineering Org",
    summary: "Shared private registry sync across Claude, Codex, and CI audits.",
    monthlyPrice: 68,
    yearlyPrice: 54,
  },
];

export const INITIAL_STATUS_TAGS: readonly RemovableTagItem[] = [
  { id: "tag-tokens", label: "tokens/colors.css" },
  { id: "tag-springs", label: "TACTILE_SPRING" },
  { id: "tag-aria", label: "WAI-ARIA Keyboard" },
  { id: "tag-tabular", label: "tabular-nums" },
  { id: "tag-gpu", label: "GPU Composited" },
];

export const BAR_CHART_DATA: Record<"7d" | "30d" | "90d", readonly BarDatum[]> = {
  "7d": [
    { id: "mon", label: "Mon", value: 94, unit: "%" },
    { id: "tue", label: "Tue", value: 96, unit: "%" },
    { id: "wed", label: "Wed", value: 92, unit: "%" },
    { id: "thu", label: "Thu", value: 98, unit: "%" },
    { id: "fri", label: "Fri", value: 99, unit: "%" },
    { id: "sat", label: "Sat", value: 97, unit: "%" },
    { id: "sun", label: "Sun", value: 100, unit: "%" },
  ],
  "30d": [
    { id: "w1", label: "Wk 1", value: 84, unit: "%" },
    { id: "w2", label: "Wk 2", value: 89, unit: "%" },
    { id: "w3", label: "Wk 3", value: 93, unit: "%" },
    { id: "w4", label: "Wk 4", value: 97, unit: "%" },
    { id: "w5", label: "Now", value: 100, unit: "%" },
  ],
  "90d": [
    { id: "m1", label: "Month 1", value: 72, unit: "%" },
    { id: "m2", label: "Month 2", value: 88, unit: "%" },
    { id: "m3", label: "Month 3", value: 100, unit: "%" },
  ],
};

export const COLOR_SWATCHES = [
  { token: "--surface-canvas", role: "Base page canvas" },
  { token: "--surface-elevated", role: "Cards, dialogs & drawers" },
  { token: "--surface-sunken", role: "Rails, trays & code wells" },
  { token: "--surface-interactive", role: "Hover & pressed neutral fill" },
  { token: "--accent-primary", role: "Single primary action ink" },
  { token: "--accent-primary-subtle", role: "Selected badge & banner fill" },
  { token: "--text-primary", role: "Headings & body copy" },
  { token: "--text-secondary", role: "Supporting metadata" },
  { token: "--border-default", role: "Crisp 1px structural edge" },
  { token: "--status-success", role: "Verified state signal" },
  { token: "--status-warning", role: "Attention / caution signal" },
  { token: "--status-danger", role: "Validation & error signal" },
] as const;

export const TYPOGRAPHY_SCALE = [
  {
    token: "--text-display-lg",
    spec: "clamp(2.5rem, 4.5vw, 3.75rem)",
    role: "Hero display thesis",
    sample: "Precision over noise.",
    className:
      "font-[family-name:var(--font-display)] text-[length:var(--text-display-lg)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tighter)]",
  },
  {
    token: "--text-2xl",
    spec: "1.75rem · 28px",
    role: "Section heading",
    sample: "Architectural clarity in four layers.",
    className:
      "font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]",
  },
  {
    token: "--text-lg",
    spec: "1.125rem · 18px",
    role: "Card title & lead summary",
    sample: "Calibrated springs replace flat linear curves.",
    className:
      "font-[family-name:var(--font-sans)] text-[length:var(--text-lg)] font-medium leading-[var(--leading-snug)]",
  },
  {
    token: "--text-sm",
    spec: "0.875rem · 14px",
    role: "UI controls & dense metadata",
    sample: "1px hairline borders with WCAG >= 4.5:1 primary text contrast.",
    className:
      "font-[family-name:var(--font-sans)] text-[length:var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-secondary)]",
  },
  {
    token: "--text-xs",
    spec: "0.75rem · 12px · tabular-nums",
    role: "Eyebrows, specs & telemetry",
    sample: "380 / 32 / 0.8 · 17.5:1 · 60 FPS",
    className:
      "tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]",
  },
] as const;

export const RADIUS_TOKENS = [
  { token: "--radius-xs", px: "4px", role: "Keycaps & badges" },
  { token: "--radius-sm", px: "6px", role: "Compact buttons & pills" },
  { token: "--radius-md", px: "10px", role: "Inputs & list rows" },
  { token: "--radius-lg", px: "14px", role: "Nested trays & media" },
  { token: "--radius-xl", px: "20px", role: "Primary cards & panels" },
  { token: "--radius-2xl", px: "28px", role: "Sheets & modal dialogs" },
] as const;

export const ELEVATION_TOKENS = [
  {
    token: "--shadow-hairline",
    role: "Subtle interactive control rest state",
    surface: "bg-[var(--surface-elevated)]",
  },
  {
    token: "--shadow-card",
    role: "Primary cards & floating toolbars",
    surface: "bg-[var(--surface-elevated)]",
  },
  {
    token: "--shadow-overlay",
    role: "Expanded sheets, drawers & dialogs",
    surface: "bg-[var(--surface-elevated)]",
  },
] as const;

export const AUDIT_CHECKLIST = [
  {
    id: "audit-1",
    question: "Does it avoid generic AI landing templates?",
    detail: "Asymmetric editorial split, unequal functional modules, zero 3-identical-card rows.",
  },
  {
    id: "audit-2",
    question: "Do all colors, fonts, and radii come from tokens/?",
    detail: "CSS custom properties for light/dark themes, 5 palette presets, concentric radii, zero raw hex overrides.",
  },
  {
    id: "audit-3",
    question: "Were existing primitives/ and components/ reused?",
    detail: "Composed via ActionButton, SurfaceCard, TactileTabs, MotionDrawer, BarDistribution, and curated 21st-dev blocks.",
  },
  {
    id: "audit-4",
    question: "Are animations GPU-composited with real springs?",
    detail: "Uses spring physics, layoutId, AnimatePresence mode='popLayout', and useScroll.",
  },
  {
    id: "audit-5",
    question: "Do controls have clear :focus-visible & keyboard support?",
    detail: "Arrow-key navigation for tabs/radiogroups, Escape focus restoration in dialogs & drawers.",
  },
  {
    id: "audit-6",
    question: "Were purely decorative elements stripped out?",
    detail: "Single icon library (lucide-react), zero UI emojis, zero neon box-shadows.",
  },
] as const;
