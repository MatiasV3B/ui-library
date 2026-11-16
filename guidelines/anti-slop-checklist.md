# Anti-AI-Slop Checklist (Pre-Commit & Pre-Delivery)

Verify every item before committing or delivering any component, pattern, or view. Fix any failure before reporting completion.

## 1. Palettes, Surfaces & Contrast

- [ ] **Zero cliché `#09090b` + purple/cyan/pink gradients**: no `#09090b` backdrops, `from-purple-500 to-cyan-500` gradients, or gratuitous *glassmorphism* (`backdrop-blur` without functional scrolling context).
- [ ] **Zero neon `box-shadow` glows**: cards and controls use crisp `1px` borders (`--border-subtle` / `--border-default`) and tonal contrast across `--surface-canvas`, `--surface-elevated`, and `--surface-sunken`.
- [ ] **Maximum 1 primary accent per view**: interfaces rely on neutral surface hierarchy and a single primary accent (`--accent-primary`). Semantic status colors (`--status-*`) communicate state only.
- [ ] **WCAG >= 4.5:1 contrast**: primary (`--text-primary`) and secondary (`--text-secondary`) text meet readable contrast in both light and dark modes.
- [ ] **Zero raw values**: every color, font family, and border radius resolves from `tokens/` (`colors.css`, `typography.css`, `spacing-motion.css`).

## 2. Typography & Microcopy

- [ ] **Intentional pairing**: neither `Inter` nor `Geist` is used by default without checking [typography-pairings.md](./typography-pairings.md).
- [ ] **Multi-dimensional hierarchy**: titles, subtitles, body copy, and metadata differ by scale, weight, and `tracking`—not just faded gray colors.
- [ ] **Zero empty marketing filler**: removed clichés such as *"Unlock the power of..."*, *"Next-gen..."*, *"Seamless experience"*, or *"Revolutionize your workflow"*. Microcopy is concrete and direct.
- [ ] **Tabular numerals**: tables, KPIs, counters, and metrics use `tabular-nums` and right alignment in numeric columns.

## 3. Layout, Composition & Subtraction

- [ ] **No generic landing template**: views avoid the *"centered hero + 3 identical icon-on-top cards + gradient backdrop"* pattern, favoring asymmetric splits, editorial grids, dense lists, or interactive sandboxes.
- [ ] **Subtraction rule enforced**: every badge, icon, divider, border, or animation that neither communicates state nor aids readability has been removed.
- [ ] **Concentric radii & axis alignment**: nested elements follow `R_outer = R_inner + padding` and maintain aligned axes across sibling items.

## 4. Apple-Grade Motion (`motion/react`)

- [ ] **Real spring physics**: tactile controls use `stiffness: 380, damping: 32, mass: 0.8`; panels, modals, and expandable cards use `stiffness: 240, damping: 28`. Fixed durations use `cubic-bezier(0.22, 1, 0.36, 1)`.
- [ ] **Spatial continuity**: tabs, docks, and expandable detail cards share `layoutId` and wrap state transitions or exits in `<AnimatePresence mode="popLayout">`.
- [ ] **Scroll choreography without repetitive *fade-in-up***: product sections bind `scale`, `opacity`, `clip-path`, and subtle parallax to `useScroll` + `useTransform` inside `sticky` containers.
- [ ] **Strict GPU performance**: only `transform`, `opacity`, `clip-path`, or Motion `layout` are animated—never `width`, `height`, `top`, `left`, or `margin`.
- [ ] **Reduced motion**: root trees are wrapped in `<MotionConfig reducedMotion="user">`.

## 5. Iconography, Accessibility & Complete States

- [ ] **Single icon set & zero UI emojis**: exclusively `lucide-react` icons; never emojis in navigation, buttons, or technical headers.
- [ ] **Keyboard & `:focus-visible`**: every interactive control supports keyboard navigation (`Tab`, `Enter`, `Escape`, arrow keys for tabs/radiogroups) and shows a sharp `:focus-visible` ring (`--focus-ring`).
- [ ] **Complete states**: `default`, `hover`, `focus-visible`, `loading` (layout-matched skeleton, no generic spinners), `empty`, and `error` are implemented.
