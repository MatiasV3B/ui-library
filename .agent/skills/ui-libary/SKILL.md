---
name: ui-libary
description: Mandatory design engineering skill for building or editing UI in UI-Libary. Enforces reading AGENTS.md, registry.json, tokens/, and guidelines/ before generating any component, pattern, or view to eliminate AI slop and deliver Apple-level motion choreography.
---

# UI-Libary Skill (Antigravity)

Use this skill **before writing, editing, or reviewing any UI code** inside this repository or projects consuming `UI-Libary`.

## Mandatory Pre-Flight Sequence (Do Not Skip)

Before generating a single line of JSX, TSX, or CSS:

1. **Read the master rules**: open and read [AGENTS.md](../../../AGENTS.md) completely.
2. **Read the component index**: inspect [registry.json](../../../registry.json) plus `primitives/`, `components/`, and `patterns/` to reuse or compose existing building blocks instead of rewriting from scratch.
3. **Read all visual guidelines**:
   - [anti-slop-checklist.md](../../../guidelines/anti-slop-checklist.md)
   - [typography-pairings.md](../../../guidelines/typography-pairings.md)
   - [composition-rules.md](../../../guidelines/composition-rules.md)
4. **Load the token contract**: inspect `tokens/colors.css`, `tokens/typography.css`, and `tokens/spacing-motion.css`. Never invent raw hex colors, arbitrary font families, or ad-hoc border radii when a token exists.

## Architecture Layers

- **Layer 1 — `primitives/`**: Accessible, unopinionated base pieces (`astryx/`, `radix/`, `animate-primitives/`). Customize Meta Astryx via CSS tokens or Tailwind `className` overrides before using `astryx swizzle`.
- **Layer 2 — `components/`**: Curated, production-ready components (`21st-dev/`, `motion/`, `data-viz/`, `feedback/`). Compose via explicit subcomponents (`<Card><CardHeader /></Card>`) rather than boolean prop proliferation.
- **Layer 3 — `patterns/`**: Full sections and page layouts (`hero-editorial/`, `dashboard-shell/`, `auth-minimal/`). Always read the pattern's local `README.md` before using it.
- **Layer 4 — `guidelines/`**: Anti-AI-slop, typography, and composition criteria.

## Non-Negotiable Engineering Rules

- **Palettes**: Never use `#09090b` + purple/cyan/pink gradients, decorative neon `box-shadow`s, or gratuitous glassmorphism. Limit each view to 1 primary accent (`--accent-primary`), crisp `1px` borders, and WCAG >= 4.5:1 text contrast.
- **Typography**: Never default to `Inter` or `Geist`. Pick an intentional pairing from `guidelines/typography-pairings.md` and differentiate levels by scale, weight, and tracking. Use `tabular-nums` right-aligned in tables and KPIs.
- **Copy & Layout**: Never write empty marketing filler (*"Unlock the power of..."*, *"Next-gen..."*, *"Seamless experience"*). Never repeat the centered-hero + 3-identical-icon-cards template. Apply the subtraction rule relentlessly.
- **Apple-Grade Motion (`motion/react`)**:
  - Wrap root trees in `<MotionConfig reducedMotion="user">`.
  - Tactile controls: `{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }` + `whileTap={{ scale: 0.97 }}`.
  - Fluid panels/modals/cards: `{ type: "spring", stiffness: 240, damping: 28 }`.
  - Fixed durations (when needed): `cubic-bezier(0.22, 1, 0.36, 1)`.
  - Spatial continuity: `layoutId` + `<AnimatePresence mode="popLayout">`.
  - Scroll storytelling: `useScroll` + `useTransform` on `sticky` containers (`scale`, `opacity`, `clip-path`, subtle parallax). Never spam repetitive `fade-in-up` blocks.
  - Strict GPU-only animation: animate only `transform`, `opacity`, `clip-path`, or Motion `layout`. Never animate `width`, `height`, `top`, `left`, or `margin`.
- **Icons & States**: Use one icon library (`lucide-react`), zero UI emojis, clear `:focus-visible` outlines, full keyboard navigation, and complete `default`, `hover`, `focus-visible`, `loading` (layout-matched skeleton), `empty`, and `error` states.

## Mandatory Post-Build Audit (Section 4 of AGENTS.md)

Before delivering any UI work, run through all 6 audit questions in `AGENTS.md` Section 4 and `guidelines/anti-slop-checklist.md`, fixing any defect prior to reporting completion.
