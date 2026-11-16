# AuthMinimal Pattern

Focused authentication surface without decorative split illustrations, neon borders, or social-button clutter.

## When to Use

- Workspace sign-in, passwordless OTP entry, and verification flows.

## States Covered

- `idle`: semantic `--surface-canvas` input over `--surface-elevated` card.
- `loading`: button disabled state with tactile feedback suppressed.
- `error`: inline `role="alert"` message using `--status-danger`.
- `sent`: confirmation panel with recovery option to change email.
