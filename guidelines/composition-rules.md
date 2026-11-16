# Composition Rules — Density, Contrast & Hierarchy

These rules govern the spatial structure of pages, patterns (`patterns/`), and components (`components/`).

## 1. Approved Structures (No 3-Identical-Card Clichés)

Avoid the generic *"centered hero + gradient + 3 symmetric icon-on-top cards"* pattern. Select a layout driven by real content:

- **Editorial Split (40/60 or 55/45)**: asymmetric headline and thesis on the left; live interactive artifact, table, or code specimen on the right.
- **Unequal Functional Bento**: one primary focal module (`col-span-2` or taller canvas) paired with compact supporting panels—never three identical boxes with uniform density.
- **Dense Technical Index / List**: `1px` border rows (`--border-subtle`), strict vertical alignment, right-aligned `tabular-nums` metric column, and contextual hover/focus action.
- **Sticky Scroll Narrative**: tall container with a `position: sticky` stage where `useScroll` + `useTransform` morph a single focal artifact across concise chapters.

## 2. The Subtraction Rule

Before keeping any visual element, ask what information it adds:
1. If a **badge** repeats information already stated in the title, remove it.
2. If a card already separates from the canvas via tonal contrast (`--surface-elevated` over `--surface-canvas`), avoid redundant inner dividers.
3. If an icon is purely decorative next to obvious copy, remove it. Reserve icons for actions, navigation anchors, and status indicators.

## 3. Geometric Consistency & Concentric Radii

Every border radius must reference `tokens/spacing-motion.css`:
- Parent `--radius-xl` (`20px`) with `--space-2` (`8px`) padding -> child `--radius-lg` (`12–14px`).
- Parent `--radius-lg` (`14px`) with `--space-1` (`4px`) padding -> child `--radius-md` (`10px`).
- Standard inputs and buttons -> `--radius-sm` (`6px`) or `--radius-md` (`10px`).
- Tab/dock pills -> `--radius-pill` (`9999px`) or `--radius-md` consistently across the bar.

## 4. Tonal Depth Without Heavy Shadows

Allowed surface hierarchy:
1. `--surface-canvas` (page base plane)
2. `--surface-sunken` (tab rails, toolbars, code wells)
3. `--surface-elevated` + `1px solid var(--border-subtle)` (cards, panels)
4. `--surface-elevated` + `1px solid var(--border-default)` + `--shadow-overlay` (modals, popovers, expanded cards)

Never stack `backdrop-blur` + bright colored borders + diffuse colored shadows on static cards.

## 5. State Completeness

Every data view or interactive component must explicitly design:
- **`default` / `hover`**: subtle surface (`--surface-interactive`) or border (`--border-strong`) shift, never abrupt size jumps.
- **`focus-visible`**: `2px` outline in `--focus-ring` with `outline-offset: 2px`.
- **`loading`**: skeleton matching the exact layout geometry and radii (`--skeleton-base`), never generic centered spinners.
- **`empty`**: concise explanation of why no data is present plus a concrete recovery action.
- **`error`**: direct cause and retry action; restrict `--status-danger` to border/text indicators without tinting the entire screen.
