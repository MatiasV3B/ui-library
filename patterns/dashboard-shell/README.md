# DashboardShell Pattern

Structural application frame separating persistent workspace navigation (`--surface-sunken`) from the primary data canvas (`--surface-canvas`).

## When to Use

- Multi-view engineering consoles, telemetry panels, and operational workspaces.
- Interfaces combining `KpiMetricCard`, `ActionSearchBar`, and tabular data lists.

## Rules & Accessibility

- Use `lucide-react` icons only—never emojis in sidebar items.
- Right-align numeric badges and table metrics with `.tabular-nums`.
- Preserve `aria-current="page"` and `:focus-visible` outlines across all navigation controls.
