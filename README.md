<img src="assets/icon.svg" width="64" height="64" alt="UI Libary mark">

# UI Libary

A personal, agent-ready UI design system, component registry, and anti-AI-slop engineering specification built for **Claude Code**, **Codex**, and **Antigravity**.

**Live Interactive Documentation & Showcase:** [https://matiasv3b.github.io/ui-library/](https://matiasv3b.github.io/ui-library/)

---

## Why This Exists

Most LLM-generated interfaces collapse into the same statistical defaults: `#09090b` backdrops, purple-to-cyan gradients, neon card glows, `Inter` everywhere, and generic 3-column feature grids.

**UI Libary** fixes this by giving coding agents a strict, discoverable four-layer architecture paired with Apple-calibrated `motion/react` physics and semantic CSS tokens.

## Repository Structure

```text
ui-library/
├── AGENTS.md                        # Master design & engineering rules (Codex / generic agents)
├── CLAUDE.md                        # Synchronized copy or symlink of AGENTS.md for Claude Code
├── .agent/
│   └── skills/
│       └── ui-libary/
│           └── SKILL.md             # Antigravity skill enforcing registry & guideline discovery
├── registry.json                    # Central shadcn-format component & token index
├── tokens/
│   ├── colors.css                   # Light/dark semantic surfaces + 5 [data-palette] single-accent presets
│   ├── typography.css               # Intentional pairings, fluid display scale, tabular-nums
│   └── spacing-motion.css           # 4/8px spacing, concentric radii, Apple easing & spring tokens
├── primitives/                      # Layer 1: Accessible, unopinionated base components
│   ├── astryx/                      # Meta Astryx primitives (via `astryx swizzle`)
│   ├── radix/                       # ActionButton, SurfaceCard composable primitives
│   └── animate-primitives/          # Drop-in Animate UI primitives
├── components/                      # Layer 2: Curated, production-ready UI pieces
│   ├── motion/                      # TactileTabs, AppStoreCard, StickyProductShowcase, MotionDrawer, AnimatedNumber
│   ├── 21st-dev/                    # SegmentedControl, ActionSearchBar, FileTree, ScrollProgress, PricingSelector, StatusTag, CommandPromptInput
│   ├── data-viz/                    # KpiMetricCard & BarDistribution with tabular-nums
│   └── feedback/                    # EmptyState, ErrorNotice, SkeletonBlock
├── patterns/                        # Layer 3: Full page sections & application shells
│   ├── hero-editorial/              # Asymmetric editorial split hero + README guide
│   ├── dashboard-shell/             # Workspace sidebar & header shell + README guide
│   └── auth-minimal/                # Focused passwordless auth flow + README guide
├── guidelines/                      # Layer 4: Visual craft & anti-AI-slop criteria
│   ├── anti-slop-checklist.md       # Pre-commit / pre-delivery audit
│   ├── typography-pairings.md       # Approved font pairings & hierarchy matrix
│   └── composition-rules.md         # Density, tonal depth & state completeness rules
└── site/                            # Live interactive documentation website (GitHub Pages)
```

## How Agents Stay Synchronized

1. **Single Source of Truth (`AGENTS.md` -> `CLAUDE.md`)**:
   ```bash
   ln -s AGENTS.md CLAUDE.md
   ```
   *(On Windows without elevated symlink privileges, keep `CLAUDE.md` as an exact copy of `AGENTS.md`.)*
2. **Antigravity Skill (`.agent/skills/ui-libary/SKILL.md`)**:
   Forces the agent to read `AGENTS.md`, `registry.json`, `tokens/`, and `guidelines/` before writing UI, then run the 6-point Section 4 audit before returning code.
3. **Meta Astryx + Curated 21st.dev Workflow**:
   Import `tokens/colors.css` first so Astryx aliases (`--background`, `--foreground`, `--primary`, `--border`, `--ring`) and `21st-dev/` components share identical brand variables. Customize via `[data-palette]` (`cobalt`, `pine`, `vermilion`, `amber`, `ink`) or CSS tokens before using `astryx swizzle` inside `primitives/astryx/`.

## Component & Pattern Inventory (22 Registry Items)

| Layer | Name | Highlights | Source |
| --- | --- | --- | --- |
| Tokens | `design-tokens` | 5 light/dark WCAG >= 4.5:1 palettes (`cobalt`, `pine`, `vermilion`, `amber`, `ink`), 3 font pairings, Apple motion curves | [tokens/](tokens/) |
| Primitives | `ActionButton`, `SurfaceCard` | Tactile `0.97` tap scale, crisp `1px` borders, composable subcomponents | [primitives/radix/](primitives/radix/) |
| Motion | `TactileTabs`, `AppStoreCard`, `StickyProductShowcase`, `MotionDrawer`, `AnimatedNumber` | Shared `layoutId`, `AnimatePresence mode="popLayout"`, `drag="y"` sheets, `useScroll` aperture, `tabular-nums` counters | [components/motion/](components/motion/) |
| Curated 21st.dev | `SegmentedControl`, `ActionSearchBar`, `FileTree`, `ScrollProgress`, `PricingSelector`, `StatusTag`, `CommandPromptInput` | Filtered from raw 21st.dev pieces, stripped of neon/glow slop, wired to `tokens/` | [components/21st-dev/](components/21st-dev/) |
| Data & Feedback | `KpiMetricCard`, `BarDistribution`, `EmptyState`, `ErrorNotice`, `SkeletonBlock` | Right-aligned `tabular-nums`, interactive bar scrubbing, layout-matched skeletons, explicit error recovery | [components/data-viz/](components/data-viz/) |
| Patterns | `HeroEditorial`, `DashboardShell`, `AuthMinimal` | Complete sections paired with local `README.md` usage guides | [patterns/](patterns/) |

## Running Locally & Deploying to GitHub Pages

```bash
npm install
npm run typecheck    # Strict TypeScript verification across all layers and docs site
npm run dev:site     # Start local documentation & interactive sandbox
npm run build:site   # Build static GitHub Pages bundle into site/dist
```

Every push to `master` triggers [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) to typecheck, build the static documentation site, and publish it to GitHub Pages.
