# Typography Pairings

Baseline rule: **never default to `Inter` or `Geist`**. Every interface must explicitly declare one of the approved pairings in `tokens/typography.css` matched to the product tone.

## Approved Pairings

### 1. Editorial Classic (`data-typography="editorial"`)
- **Display / Headlines**: `--font-serif-editorial` (`"Newsreader", "Instrument Serif", Georgia, serif`)
- **UI / Body**: `--font-sans-editorial` (`"Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif`)
- **Code / Metadata**: `--font-mono-technical` (`"IBM Plex Mono", "JetBrains Mono", monospace`)
- **Best for**: narrative product pages, editorial documentation, release notes, case studies, and `hero-editorial/`.
- **Tuning**: pair serif display sizes (`--text-2xl` to `--text-display-xl`) with weight `400–500`, `--tracking-tight` (`-0.02em`), and `--leading-tight` (`1.12`). Avoid `700` serif body blocks.

### 2. Precision Technical (`data-typography="technical"` — Repository Default)
- **Display / UI / Body**: `--font-sans-technical` (`"IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif`)
- **Code / Data / KPIs**: `--font-mono-technical` (`"IBM Plex Mono", "JetBrains Mono", monospace`)
- **Best for**: dashboards, engineering tools, financial tables, configuration consoles, and `dashboard-shell/`.
- **Tuning**: pair `IBM Plex Mono` with `.tabular-nums` for status tags, timestamps, release versions, and comparative metrics.

### 3. Modern Swiss Geometric (`data-typography="geometric"`)
- **Display**: `--font-display-geometric` (`"Plus Jakarta Sans", "Outfit", sans-serif`)
- **UI / Body**: `--font-sans-geometric` (`"DM Sans", "Plus Jakarta Sans", sans-serif`)
- **Code / Data**: `--font-mono-technical` (`"IBM Plex Mono", "JetBrains Mono", monospace`)
- **Best for**: Apple / iOS-style consumer apps, interactive galleries, App Store cards, and `auth-minimal/`.
- **Tuning**: headlines in weight `600` with `--tracking-tighter` (`-0.035em`); category eyebrows in `--text-xs`, weight `600`, uppercase with `--tracking-caps` (`0.08em`).

## Mandatory Hierarchy Matrix

Never differentiate levels by color opacity alone. Combine at least **two variables** (scale + weight, or scale + font family/tracking):

| Level | Size Token | Weight | Tracking | Line Height |
| --- | --- | --- | --- | --- |
| Display Hero | `--text-display-lg` / `xl` | `500–600` | `--tracking-tighter` | `--leading-tight` |
| Page Title | `--text-3xl` | `600` | `--tracking-tight` | `--leading-tight` |
| Section Heading | `--text-2xl` | `600` | `--tracking-tight` | `--leading-snug` |
| Card / Panel Title | `--text-lg` | `600` | `--tracking-normal` | `--leading-snug` |
| Body Copy | `--text-base` | `400` | `--tracking-normal` | `--leading-normal` |
| UI / Dense List | `--text-sm` | `400–500` | `--tracking-normal` | `--leading-normal` |
| Eyebrow / Metadata | `--text-xs` | `500–600` | `--tracking-caps` / `wide` | `--leading-snug` |

## Typographic Anti-Patterns

1. Leaving `font-family` undeclared so browsers or templates fall back to generic `Inter` or `Geist`.
2. Using `text-gray-400` on a dark surface as the sole distinction between title and subtitle.
3. Center-aligning long prose blocks (`> 3 lines`); constrain prose to `--container-prose` (`65ch`) left-aligned.
4. Omitting `tabular-nums` in animated counters, tables, or pricing selectors.
