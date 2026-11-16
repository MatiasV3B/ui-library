import type { FileTreeNode } from "../../../components/21st-dev/FileTree";
import type { SearchActionItem } from "../../../components/21st-dev/ActionSearchBar";
import type { PricingTier } from "../../../components/21st-dev/PricingSelector";
import type { ProductShowcaseChapter } from "../../../components/motion/StickyProductShowcase";

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
    meta: "17 items",
  },
  {
    id: "dir-tokens",
    name: "tokens",
    type: "dir",
    children: [
      { id: "tok-colors", name: "colors.css", type: "file", meta: "WCAG 4.5+" },
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
      { id: "comp-seg", name: "21st-dev/SegmentedControl.tsx", type: "file", meta: "Curated" },
      { id: "comp-kpi", name: "data-viz/KpiMetricCard.tsx", type: "file", meta: "tabular-nums" },
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
      "Machine-readable catalog of all 17 tokens, primitives, motion blocks, curated 21st.dev pieces, and patterns.",
  },
  "tok-colors": {
    title: "tokens/colors.css",
    summary:
      "Warm alabaster (#fafaf9) and obsidian (#121211) surfaces with a single primary accent (#1d4ed8 / #60a5fa) and >= 4.5:1 contrast.",
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
      "Accessible button primitive with tactile scale(0.97) feedback, clear :focus-visible ring, and loading state.",
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
  "comp-seg": {
    title: "components/21st-dev/SegmentedControl.tsx",
    summary:
      "Filtered 21st.dev component upgraded with WAI-ARIA radiogroup semantics, arrow keys, and tactile spring indicator.",
  },
  "comp-kpi": {
    title: "components/data-viz/KpiMetricCard.tsx",
    summary:
      "Metric summary card enforcing right-aligned tabular-nums, semantic trend deltas, and layout-matched skeleton/error states.",
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
  { id: "tactile-tabs", label: "TactileTabs & Dock", category: "components/motion", shortcut: "motion" },
  { id: "app-store-card", label: "AppStoreCard", category: "components/motion", shortcut: "layoutId" },
  { id: "sticky-product-showcase", label: "StickyProductShowcase", category: "components/motion", shortcut: "useScroll" },
  { id: "segmented-control", label: "SegmentedControl", category: "components/21st-dev", shortcut: "radiogroup" },
  { id: "action-search-bar", label: "ActionSearchBar", category: "components/21st-dev", shortcut: "combobox" },
  { id: "pricing-selector", label: "PricingSelector", category: "components/21st-dev", shortcut: "tabular" },
  { id: "kpi-metric-card", label: "KpiMetricCard", category: "components/data-viz", shortcut: "metrics" },
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
      "Every view consumes light and dark CSS variables from tokens/colors.css—keeping primary text above 7:1 contrast and eliminating #09090b + purple-cyan defaults.",
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
      "Discrete controls snap with 380 / 32 / 0.8 tactile springs while modal expansions glide on 240 / 28 fluid springs, always respecting reduced-motion preferences.",
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

export const COLOR_SWATCHES = [
  { token: "--surface-canvas", role: "Base page canvas", light: "#fafaf9", dark: "#121211" },
  { token: "--surface-elevated", role: "Cards & dialogs", light: "#ffffff", dark: "#1b1b19" },
  { token: "--surface-sunken", role: "Rails & code wells", light: "#f3f2ef", dark: "#0d0d0c" },
  { token: "--accent-primary", role: "Single primary accent", light: "#1d4ed8", dark: "#60a5fa" },
  { token: "--text-primary", role: "Headings & body copy", light: "#141413", dark: "#f5f4f1" },
  { token: "--text-secondary", role: "Supporting metadata", light: "#52514d", dark: "#b5b3ac" },
  { token: "--border-default", role: "Crisp 1px card edges", light: "#d6d3cc", dark: "#353531" },
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
    detail: "CSS custom properties for light/dark themes, concentric radii, zero raw hex overrides.",
  },
  {
    id: "audit-3",
    question: "Were existing primitives/ and components/ reused?",
    detail: "Composed via ActionButton, SurfaceCard, TactileTabs, and curated 21st-dev blocks.",
  },
  {
    id: "audit-4",
    question: "Are animations GPU-composited with real springs?",
    detail: "Uses spring physics, layoutId, AnimatePresence mode='popLayout', and useScroll.",
  },
  {
    id: "audit-5",
    question: "Do controls have clear :focus-visible & keyboard support?",
    detail: "Arrow-key navigation for tabs/radiogroups, Escape focus restoration in dialogs.",
  },
  {
    id: "audit-6",
    question: "Were purely decorative elements stripped out?",
    detail: "Single icon library (lucide-react), zero UI emojis, zero neon box-shadows.",
  },
] as const;
