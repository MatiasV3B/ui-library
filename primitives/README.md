# Layer 1 — Primitives

Accessible, unopinionated foundational building blocks:

- `primitives/astryx/`: Meta Astryx base components customized via `tokens/colors.css` and Tailwind `className` overrides before running `astryx swizzle`.
- `primitives/radix/`: Composable React primitives (`ActionButton`, `SurfaceCard`) wired directly to `tokens/`.
- `primitives/animate-primitives/`: Drop-in Animate UI primitives when lower-level motion wrappers are required.

## Usage Rule

Always compose higher-level components and patterns on top of these primitives rather than creating bespoke `<button>` or `<div className="card">` elements from scratch.
