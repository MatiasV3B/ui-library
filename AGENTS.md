# UI Libary — Agent Design & Engineering Rules

This repository is the UI design source of truth for this project. It applies to **Claude Code**, **Codex**, and **Antigravity**. Your goal is to build interfaces with editorial, technical, and functional rigor—completely eliminating *AI slop* (generic interfaces produced by statistical LLM defaults).

## 1. Mandatory Workflow Before Writing UI

1. **Read the index first**: before creating any new component, inspect `registry.json`, `primitives/`, and `components/`. If a piece already exists in `primitives/astryx/`, `components/21st-dev/`, or `components/motion/`, **reuse or compose on top of it** instead of rewriting from scratch.

2. **Consult the "how-to"**: when assembling a section or page, read the `README.md` of the corresponding pattern in `patterns/` and the rules in `guidelines/`.

3. **Use repository tokens**: never hardcode raw hex colors or arbitrary font sizes when a CSS variable exists in `tokens/`.

## 2. Anti-AI-Slop Rules (Strict Prohibitions)

### Palettes & Surfaces

* **Forbidden**: the cliché dark `#09090b` background + purple/blue/pink gradients (`from-purple-500 to-cyan-500`) + excessive *glassmorphism* with no functional reason.

* **Forbidden**: diffuse neon `box-shadow` glows or decorative glow halos on cards. Use crisp `1px` borders, subtle tonal contrast, and spacing hierarchy.

* Limit each view to **at most 1 primary accent color**, a neutral base, and its surface variations. Primary text must meet WCAG contrast >= 4.5:1.

### Typography & Hierarchy

* **Forbidden**: defaulting to `Inter` or `Geist` without reviewing `guidelines/typography-pairings.md`. Choose an intentional pairing tailored to the product tone (editorial, technical/monospaced, or geometric).

* Clearly differentiate headings, subtitles, body copy, and metadata using **scale, weight, and tracking**—not merely by turning text light gray.

* **Forbidden**: empty marketing filler ("Unlock the power of...", "Next-gen...", "Seamless experience", "Revolutionize your workflow"). Write concrete, direct microcopy.

### Layout & Density

* **Forbidden**: the generic *centered hero + 3 identical icon-on-top cards + gradient background* layout. Alternate asymmetric structures, editorial grids, dense lists, or split views driven by real content.

* **Subtraction rule**: if a badge, icon, border, divider, or animation neither communicates state nor improves readability, **remove it**.

* Maintain strict border-radius consistency (`tokens/spacing-motion.css`) and axis alignment across sibling elements.

### Apple-Grade Motion & Choreography (`motion/react`)

* **Real spring physics, never flat curves**: prefer `spring` physics over generic `ease-in-out`. Use crisp tactile responses (`type: "spring", stiffness: 380, damping: 32, mass: 0.8`) for controls and buttons, and more fluid springs (`stiffness: 240, damping: 28`) for panels, modals, and card expansions. When a fixed duration is required, use Apple-style deceleration curves (`cubic-bezier(0.22, 1, 0.36, 1)`).

* **Spatial continuity (`layoutId` and `AnimatePresence`)**: use `layoutId` for shared transitions between tabs, navigation pills, and cards expanding into a detail view (App Store / iOS style). Always wrap state transitions or exiting elements in `<AnimatePresence mode="popLayout">` to prevent abrupt cuts.

* **Scroll-linked choreography (`useScroll` + `useTransform`)**: on product pages or visual storytelling sections, bind scale, opacity, `clip-path`, and subtle parallax to scroll progress inside `sticky` containers. **Forbidden**: slapping the same generic *fade-in-up* on every block entering the viewport.

* **Tactile micro-interactions & gestures**: apply subtle press compression (`whileTap={{ scale: 0.97 }}`), inertia dragging on drawers/sheets (`drag="y"` with controlled elastic bounce), and short stagger (`0.03s–0.05s`) only within related lists or groups.

* **Strict GPU performance**: animate only composited properties (`transform`, `opacity`, `clip-path`). **Forbidden**: animating `width`, `height`, `top`, `left`, or `margin` directly; use Motion's `layout` prop for geometric changes. Wrap the root tree in `<MotionConfig reducedMotion="user">`.

### Iconography & Data

* Use a single icon set per project (do not mix Lucide with Heroicons or stray emojis as UI icons).

* **Forbidden**: using emojis as replacements for icons in sidebars, buttons, or technical headings.

* In tables and dashboards (`components/data-viz/`), right-align numbers with `tabular-nums`.

## 3. Code & Architecture Conventions

* **Primitives first**: for accessible buttons, dialogs, menus, tabs, and forms, always start from `primitives/astryx/` or `primitives/radix/`.

* **Clean overrides**: when using Meta Astryx components, customize via CSS tokens or Tailwind `className` overrides before running `swizzle` on source code.

* **Pure, composable components**: avoid endless boolean props (`isCompact`, `hasBorder`, `showHeaderAlt`). Prefer explicit composition (`<Card><CardHeader /><CardBody /></Card>`).

* **Complete states**: every interactive component or data view must include real states: `default`, `hover`, `focus-visible`, `loading` (layout-matched skeleton, not generic spinners), `empty`, and `error`.

## 4. Mandatory Pre-Delivery Audit

Before marking any interface complete, run this self-check:

1. Does it resemble a generic AI landing template? If yes, restructure the hero or strip ornamentation.

2. Does every color, font, and radius come from `tokens/`?

3. Did you reuse existing components in `components/` and `primitives/`?

4. Do animations use `spring` physics, `layoutId`, or `useScroll` on the GPU without repetitive *fade-in-up* blocks?

5. Do all buttons and inputs have a clear `:focus-visible` state and keyboard navigation?

6. Did you remove every decorative element that adds no information?
