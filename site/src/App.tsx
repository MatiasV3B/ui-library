import * as React from "react";
import { MotionConfig, motion, useTransform, type MotionValue } from "motion/react";
import {
  Activity,
  BookOpen,
  Check,
  Code2,
  Compass,
  Copy,
  FolderTree,
  Gauge,
  Github,
  Layers,
  Lock,
  Moon,
  Palette,
  PanelBottomOpen,
  RotateCcw,
  ShieldCheck,
  Sliders,
  Sparkles,
  Sun,
  Terminal,
  Type,
} from "lucide-react";

import { ActionButton } from "../../primitives/radix/ActionButton";
import {
  SurfaceCard,
  SurfaceCardContent,
  SurfaceCardDescription,
  SurfaceCardFooter,
  SurfaceCardHeader,
  SurfaceCardTitle,
} from "../../primitives/radix/SurfaceCard";

import {
  TactileTabs,
  TactileTabsContent,
  TactileTabsEmpty,
  TactileTabsError,
  TactileTabsList,
  TactileTabsSkeleton,
  TactileTabsTrigger,
} from "../../components/motion/TactileTabs";
import {
  AppStoreCard,
  AppStoreCardBody,
  AppStoreCardDetail,
  AppStoreCardEyebrow,
  AppStoreCardGroup,
  AppStoreCardMedia,
  AppStoreCardSkeleton,
  AppStoreCardSummary,
  AppStoreCardTitle,
  AppStoreCardTrigger,
} from "../../components/motion/AppStoreCard";
import { StickyProductShowcase } from "../../components/motion/StickyProductShowcase";
import { MotionDrawer } from "../../components/motion/MotionDrawer";
import { AnimatedNumber } from "../../components/motion/AnimatedNumber";
import { TACTILE_SPRING } from "../../components/motion/motion-tokens";

import { SegmentedControl } from "../../components/21st-dev/SegmentedControl";
import { ActionSearchBar } from "../../components/21st-dev/ActionSearchBar";
import { FileTree } from "../../components/21st-dev/FileTree";
import { ScrollProgress } from "../../components/21st-dev/ScrollProgress";
import { PricingSelector } from "../../components/21st-dev/PricingSelector";
import {
  RemovableTagGroup,
  StatusTag,
  type RemovableTagItem,
} from "../../components/21st-dev/StatusTag";
import {
  CommandPromptInput,
  type PromptMode,
} from "../../components/21st-dev/CommandPromptInput";
import {
  KpiMetricCard,
  KpiMetricCardError,
  KpiMetricCardSkeleton,
} from "../../components/data-viz/KpiMetricCard";
import { BarDistribution } from "../../components/data-viz/BarDistribution";
import { EmptyState, SkeletonBlock } from "../../components/feedback/StateNotice";

import { HeroEditorial } from "../../patterns/hero-editorial/HeroEditorial";
import { DashboardShell } from "../../patterns/dashboard-shell/DashboardShell";
import { AuthMinimal } from "../../patterns/auth-minimal/AuthMinimal";

import {
  AUDIT_CHECKLIST,
  BAR_CHART_DATA,
  COLOR_SWATCHES,
  ELEVATION_TOKENS,
  FILE_DESCRIPTIONS,
  INITIAL_STATUS_TAGS,
  PALETTE_PRESETS,
  PRICING_TIERS,
  RADIUS_TOKENS,
  REGISTRY_ACTIONS,
  REPO_TREE_NODES,
  SHOWCASE_CHAPTERS,
  TYPOGRAPHY_SCALE,
  type PaletteId,
} from "./data/showcase-data";

type ThemeMode = "light" | "dark";
type TypographyMode = "technical" | "editorial" | "geometric";

interface DispatchedPrompt {
  id: string;
  mode: PromptMode;
  prompt: string;
}

function StickyStageVisual({ progress }: { progress: MotionValue<number> }) {
  const tokenScale = useTransform(progress, [0, 0.35, 1], [0.96, 1, 1]);
  const barWidthA = useTransform(progress, [0, 0.5, 1], [0.62, 0.94, 0.88]);
  const barWidthB = useTransform(progress, [0, 0.5, 1], [0.42, 0.78, 0.96]);
  const barWidthC = useTransform(progress, [0, 0.5, 1], [0.8, 0.62, 0.94]);
  const markerX = useTransform(progress, [0, 1], [0, 228]);

  return (
    <motion.div
      style={{ scale: tokenScale }}
      className="flex h-full w-full flex-col justify-between bg-[var(--surface-sunken)] p-[var(--space-6)] sm:p-[var(--space-8)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-[var(--space-4)]">
        <div className="space-y-1">
          <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
            Runtime Telemetry
          </span>
          <p className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold text-[var(--text-primary)]">
            Live Token &amp; GPU Surface Stage
          </p>
        </div>
        <span className="tabular-nums rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] py-[var(--space-1)] font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-secondary)]">
          60 fps
        </span>
      </div>

      <div className="my-auto space-y-[var(--space-4)] py-[var(--space-4)]">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-4)]">
          <div className="mb-[var(--space-3)] flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
              Damped Spring Trajectory (Scroll-Linked)
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-primary)]">
              y(t) · GPU Transform
            </span>
          </div>

          <svg
            viewBox="0 0 280 76"
            className="h-20 w-full overflow-visible"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="18"
              x2="280"
              y2="18"
              stroke="var(--border-subtle)"
              strokeDasharray="3 3"
            />
            <line
              x1="0"
              y1="58"
              x2="280"
              y2="58"
              stroke="var(--border-subtle)"
            />
            <path
              d="M 8 58 C 34 58, 42 12, 74 16 C 98 19, 108 22, 134 18 C 164 15, 198 18, 272 18"
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <motion.circle
              cx="22"
              cy="18"
              r="4.5"
              fill="var(--surface-elevated)"
              stroke="var(--accent-primary)"
              strokeWidth="2"
              style={{ x: markerX }}
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-4)]">
            <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
              Tactile Control Spring
            </p>
            <p className="mt-1 tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-lg)] font-semibold text-[var(--text-primary)]">
              380 / 32 / 0.8
            </p>
            <div className="mt-[var(--space-3)] h-1.5 w-full overflow-hidden rounded-[var(--radius-pill)] bg-[var(--surface-sunken)]">
              <motion.div
                style={{ scaleX: barWidthA }}
                className="h-full origin-left bg-[var(--accent-primary)]"
              />
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-4)]">
            <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
              Fluid Expansion Spring
            </p>
            <p className="mt-1 tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-lg)] font-semibold text-[var(--text-primary)]">
              240 / 28 / 1.0
            </p>
            <div className="mt-[var(--space-3)] h-1.5 w-full overflow-hidden rounded-[var(--radius-pill)] bg-[var(--surface-sunken)]">
              <motion.div
                style={{ scaleX: barWidthB }}
                className="h-full origin-left bg-[var(--text-primary)]"
              />
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-4)] sm:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                WCAG Primary Contrast &amp; GPU Budget
              </span>
              <span className="tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold text-[var(--status-success)]">
                PASS · transform + opacity + clip-path
              </span>
            </div>
            <div className="mt-[var(--space-3)] h-1.5 w-full overflow-hidden rounded-[var(--radius-pill)] bg-[var(--surface-sunken)]">
              <motion.div
                style={{ scaleX: barWidthC }}
                className="h-full origin-left bg-[var(--status-success)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-[var(--space-4)] font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
        <span>tokens/spacing-motion.css</span>
        <span className="tabular-nums">cubic-bezier(0.22, 1, 0.36, 1)</span>
      </div>
    </motion.div>
  );
}

export function App() {
  const [theme, setTheme] = React.useState<ThemeMode>("light");
  const [palette, setPalette] = React.useState<PaletteId>("cobalt");
  const [typography, setTypography] =
    React.useState<TypographyMode>("editorial");

  const [selectedFileId, setSelectedFileId] = React.useState("comp-tabs");
  const [copiedSync, setCopiedSync] = React.useState(false);

  const [primClicks, setPrimClicks] = React.useState(0);
  const [primLoading, setPrimLoading] = React.useState(false);

  const [tabsVariant, setTabsVariant] = React.useState<"tabs" | "dock">("tabs");
  const [panelState, setPanelState] = React.useState<
    "default" | "loading" | "empty" | "error"
  >("default");

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [counterSeed, setCounterSeed] = React.useState(0);
  const [showCardSkeleton, setShowCardSkeleton] = React.useState(false);

  const [kpiState, setKpiState] = React.useState<"live" | "loading" | "error">(
    "live"
  );
  const [chartWindow, setChartWindow] = React.useState<"7d" | "30d" | "90d">(
    "7d"
  );
  const [tags, setTags] = React.useState<readonly RemovableTagItem[]>(
    INITIAL_STATUS_TAGS
  );
  const [dispatchedPrompts, setDispatchedPrompts] = React.useState<
    readonly DispatchedPrompt[]
  >([
    {
      id: "init-1",
      mode: "registry",
      prompt: "Compose an analytics shell with KpiMetricCard and BarDistribution.",
    },
  ]);

  const [selectedActionMsg, setSelectedActionMsg] = React.useState(
    "Select an action above or navigate with ArrowUp / ArrowDown + Enter."
  );
  const [selectedPlanMsg, setSelectedPlanMsg] = React.useState<string | null>(
    null
  );
  const [dashNav, setDashNav] = React.useState("overview");
  const [patternPreview, setPatternPreview] = React.useState<
    "dashboard" | "auth"
  >("dashboard");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-palette", palette);
  }, [palette]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-typography", typography);
  }, [typography]);

  const activeFileInfo =
    FILE_DESCRIPTIONS[selectedFileId] ?? FILE_DESCRIPTIONS["comp-tabs"];
  const activePaletteInfo =
    PALETTE_PRESETS.find((p) => p.id === palette) ?? {
      id: "cobalt" as const,
      name: "Signal Cobalt",
      tagline: "Warm alabaster + crisp cobalt ink",
      lightAccent: "#1d4ed8",
      darkAccent: "#60a5fa",
      lightCanvas: "#fafaf9",
      darkCanvas: "#121211",
      contrastLabel: "6.7 : 1",
    };

  const syncSnippet = `# Sync Claude Code with AGENTS.md
ln -s AGENTS.md CLAUDE.md

# Antigravity pre-flight skill path
.agent/skills/ui-libary/SKILL.md -> AGENTS.md + registry.json + guidelines/`;

  const handleCopySync = async () => {
    try {
      await navigator.clipboard.writeText(syncSnippet);
      setCopiedSync(true);
      setTimeout(() => setCopiedSync(false), 1800);
    } catch {
      setCopiedSync(false);
    }
  };

  const handleSimulatePrimLoading = () => {
    setPrimLoading(true);
    setTimeout(() => {
      setPrimLoading(false);
      setPrimClicks((c) => c + 1);
    }, 650);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--surface-canvas)] font-[family-name:var(--font-sans)] text-[var(--text-primary)]">
        <ScrollProgress />

        {/* Sticky Top Utility Bar */}
        <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--surface-canvas)]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-[var(--container-ui)] flex-wrap items-center justify-between gap-[var(--space-4)] px-[var(--space-4)] py-[var(--space-3)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="flex items-center gap-[var(--space-6)]">
              <a
                href="#"
                className="flex items-center gap-[var(--space-2)] rounded-[var(--radius-sm)] font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold tracking-[var(--tracking-tight)] text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <img
                  src={`${import.meta.env.BASE_URL}icon.svg`}
                  alt=""
                  className="h-6 w-6"
                />
                <span>UI Libary</span>
              </a>

              <nav
                aria-label="Primary documentation sections"
                className="hidden items-center gap-[var(--space-5)] text-[length:var(--text-sm)] font-medium text-[var(--text-secondary)] lg:flex"
              >
                <a
                  href="#architecture"
                  className="rounded-[var(--radius-xs)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  Architecture
                </a>
                <a
                  href="#primitives"
                  className="rounded-[var(--radius-xs)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  Primitives
                </a>
                <a
                  href="#motion"
                  className="rounded-[var(--radius-xs)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  Motion
                </a>
                <a
                  href="#components"
                  className="rounded-[var(--radius-xs)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  Components
                </a>
                <a
                  href="#tokens"
                  className="rounded-[var(--radius-xs)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                >
                  Palettes &amp; Tokens
                </a>
              </nav>
            </div>

            <div className="flex flex-wrap items-center gap-[var(--space-3)]">
              {/* Quick Palette Dot Selector */}
              <div
                role="group"
                aria-label="Quick accent palette selector"
                className="flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-2 py-1"
              >
                {PALETTE_PRESETS.map((preset) => {
                  const active = palette === preset.id;
                  const dotColor =
                    theme === "light" ? preset.lightAccent : preset.darkAccent;
                  return (
                    <motion.button
                      key={preset.id}
                      type="button"
                      title={`${preset.name} palette`}
                      aria-label={`Use ${preset.name} palette`}
                      aria-pressed={active}
                      whileTap={{ scale: 0.9 }}
                      transition={TACTILE_SPRING}
                      onClick={() => setPalette(preset.id)}
                      className={`relative flex h-5 w-5 items-center justify-center rounded-[var(--radius-pill)] border transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
                        active
                          ? "border-[var(--text-primary)] scale-105"
                          : "border-[var(--border-default)] opacity-75 hover:opacity-100"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-[var(--radius-pill)]"
                        style={{ backgroundColor: dotColor }}
                      />
                    </motion.button>
                  );
                })}
              </div>

              <div className="hidden sm:block">
                <SegmentedControl
                  ariaLabel="Typography pairing"
                  value={typography}
                  onValueChange={setTypography}
                  options={[
                    { value: "editorial", label: "Editorial" },
                    { value: "technical", label: "Technical" },
                    { value: "geometric", label: "Geometric" },
                  ]}
                />
              </div>

              <motion.button
                type="button"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                whileTap={{ scale: 0.97 }}
                transition={TACTILE_SPRING}
                onClick={() =>
                  setTheme((prev) => (prev === "light" ? "dark" : "light"))
                }
                className="inline-flex h-8 items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] text-[length:var(--text-xs)] font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                {theme === "light" ? (
                  <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                <span>{theme === "light" ? "Dark" : "Light"}</span>
              </motion.button>

              <motion.a
                href="https://github.com/MatiasV3B/ui-library"
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.97 }}
                transition={TACTILE_SPRING}
                className="inline-flex h-8 items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] text-[length:var(--text-xs)] font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">GitHub</span>
              </motion.a>
            </div>
          </div>
        </header>

        {/* Asymmetric Editorial Hero */}
        <HeroEditorial
          eyebrow={`Design Engineering System · v0.3 · ${activePaletteInfo.name}`}
          headline="Precision UI without statistical AI slop."
          summary="A four-layer registry of multi-palette CSS tokens, accessible primitives, Apple-calibrated motion/react components, and anti-slop rules built to keep Claude Code, Codex, and Antigravity aligned."
          primaryAction={{ label: "Explore live components", href: "#motion" }}
          secondaryAction={{ label: "Switch color palettes", href: "#tokens" }}
          specs={[
            { label: "Registry", value: "22 Blocks" },
            { label: "Palettes", value: "5 Presets" },
            { label: "Tactile Spring", value: "380 / 32 / 0.8" },
          ]}
          artifact={
            <div className="space-y-[var(--space-4)] rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-sunken)] p-[var(--space-4)] shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-[var(--space-3)] px-[var(--space-1)]">
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--text-muted)]">
                  Interactive Repository Map
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--accent-primary)]">
                  Click any file
                </span>
              </div>

              <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-12">
                <div className="sm:col-span-7">
                  <FileTree
                    nodes={REPO_TREE_NODES}
                    selectedId={selectedFileId}
                    defaultExpandedIds={["dir-tokens", "dir-components"]}
                    onSelectFile={(node) => setSelectedFileId(node.id)}
                  />
                </div>

                <div className="flex flex-col justify-between rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-5)] sm:col-span-5">
                  <div className="space-y-[var(--space-2)]">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                      File Specification
                    </span>
                    <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold leading-[var(--leading-snug)] text-[var(--text-primary)]">
                      {activeFileInfo?.title}
                    </h2>
                    <p className="text-[length:var(--text-xs)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                      {activeFileInfo?.summary}
                    </p>
                  </div>

                  <div className="mt-[var(--space-5)] flex items-center justify-between border-t border-[var(--border-subtle)] pt-[var(--space-3)] font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                    <span>registry.json</span>
                    <span className="text-[var(--status-success)]">22 Indexed</span>
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* Section 1: How It Works & Registry Discovery */}
        <section
          id="architecture"
          className="border-b border-[var(--border-subtle)] py-[var(--space-16)]"
        >
          <div className="mx-auto max-w-[var(--container-ui)] space-y-[var(--space-10)] px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="grid grid-cols-1 items-start gap-[var(--space-8)] lg:grid-cols-12">
              <div className="space-y-[var(--space-3)] lg:col-span-5">
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                  01 · How It Works
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]">
                  One source of truth across Claude, Codex, and Antigravity.
                </h2>
                <p className="max-w-[52ch] text-[length:var(--text-base)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                  Before an agent generates a single line of JSX, it reads{" "}
                  <code className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--text-primary)]">
                    AGENTS.md
                  </code>{" "}
                  and{" "}
                  <code className="font-[family-name:var(--font-mono)] text-[length:var(--text-sm)] text-[var(--text-primary)]">
                    registry.json
                  </code>
                  , selects tokens and primitives, composes curated blocks, and passes the 6-point audit.
                </p>
              </div>

              <div className="lg:col-span-7">
                <TactileTabs defaultValue="sync">
                  <TactileTabsList>
                    <TactileTabsTrigger
                      value="sync"
                      icon={<Terminal className="h-3.5 w-3.5" />}
                    >
                      Agent Sync
                    </TactileTabsTrigger>
                    <TactileTabsTrigger
                      value="layers"
                      icon={<Layers className="h-3.5 w-3.5" />}
                      count={4}
                    >
                      4 Layers
                    </TactileTabsTrigger>
                    <TactileTabsTrigger
                      value="registry"
                      icon={<Compass className="h-3.5 w-3.5" />}
                      count={REGISTRY_ACTIONS.length}
                    >
                      Registry Lookup
                    </TactileTabsTrigger>
                  </TactileTabsList>

                  <TactileTabsContent value="sync">
                    <div className="space-y-[var(--space-4)]">
                      <div className="flex flex-wrap items-start justify-between gap-[var(--space-3)]">
                        <p className="max-w-[56ch] text-[length:var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
                          Keep rules unified in{" "}
                          <code className="font-[family-name:var(--font-mono)]">AGENTS.md</code>{" "}
                          for Codex, mirror or symlink to{" "}
                          <code className="font-[family-name:var(--font-mono)]">CLAUDE.md</code>{" "}
                          for Claude Code, and enforce pre-flight reading via Antigravity&apos;s{" "}
                          <code className="font-[family-name:var(--font-mono)]">SKILL.md</code>.
                        </p>
                        <ActionButton
                          size="sm"
                          variant="outline"
                          onClick={handleCopySync}
                        >
                          {copiedSync ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-[var(--status-success)]" aria-hidden="true" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Copy</span>
                            </>
                          )}
                        </ActionButton>
                      </div>
                      <pre className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)] font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] leading-[var(--leading-relaxed)] text-[var(--text-primary)]">
                        {syncSnippet}
                      </pre>
                    </div>
                  </TactileTabsContent>

                  <TactileTabsContent value="layers">
                    <div className="grid grid-cols-1 gap-[var(--space-3)] sm:grid-cols-2">
                      {[
                        {
                          layer: "Layer 1 · primitives/",
                          desc: "ActionButton, SurfaceCard, and Astryx swizzle targets wired to CSS tokens.",
                        },
                        {
                          layer: "Layer 2 · components/",
                          desc: "Motion blocks, curated 21st.dev pieces, KPI/Bar charts, and feedback notices.",
                        },
                        {
                          layer: "Layer 3 · patterns/",
                          desc: "HeroEditorial, DashboardShell, and AuthMinimal with local README guides.",
                        },
                        {
                          layer: "Layer 4 · guidelines/",
                          desc: "Anti-slop checklist, typography pairings, and spatial composition rules.",
                        },
                      ].map((item) => (
                        <div
                          key={item.layer}
                          className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]"
                        >
                          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold text-[var(--accent-primary)]">
                            {item.layer}
                          </p>
                          <p className="mt-1 text-[length:var(--text-xs)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TactileTabsContent>

                  <TactileTabsContent value="registry">
                    <div className="space-y-[var(--space-3)]">
                      <ActionSearchBar
                        actions={REGISTRY_ACTIONS}
                        onSelect={(action) =>
                          setSelectedActionMsg(
                            `Selected "${action.label}" from ${action.category} (type: ${action.shortcut ?? "component"}).`
                          )
                        }
                      />
                      <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                        {selectedActionMsg}
                      </p>
                    </div>
                  </TactileTabsContent>
                </TactileTabs>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1b: Layer 1 Primitives Gallery */}
        <section
          id="primitives"
          className="border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)]/55 py-[var(--space-16)]"
        >
          <div className="mx-auto max-w-[var(--container-ui)] space-y-[var(--space-8)] px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="flex flex-wrap items-end justify-between gap-[var(--space-4)]">
              <div className="space-y-[var(--space-2)]">
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                  Layer 1 · Accessible Primitives
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]">
                  Tactile buttons &amp; composable surface cards.
                </h2>
              </div>
              <p className="max-w-[46ch] text-[length:var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
                Every higher-order block composes{" "}
                <code className="font-[family-name:var(--font-mono)]">ActionButton</code>{" "}
                and{" "}
                <code className="font-[family-name:var(--font-mono)]">SurfaceCard</code>{" "}
                instead of duplicating raw HTML or inline shadows.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-[var(--space-6)] lg:grid-cols-12">
              <SurfaceCard className="lg:col-span-7">
                <SurfaceCardHeader className="border-b border-[var(--border-subtle)]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <SurfaceCardTitle>ActionButton Matrix</SurfaceCardTitle>
                    <span className="tabular-nums rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--surface-sunken)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                      Taps: {primClicks}
                    </span>
                  </div>
                  <SurfaceCardDescription>
                    Four semantic variants, three density sizes (<code className="font-[family-name:var(--font-mono)]">sm</code> / <code className="font-[family-name:var(--font-mono)]">md</code> / <code className="font-[family-name:var(--font-mono)]">lg</code>), and tactile <code className="font-[family-name:var(--font-mono)]">scale(0.97)</code> tap compression.
                  </SurfaceCardDescription>
                </SurfaceCardHeader>
                <SurfaceCardContent className="space-y-[var(--space-5)] pt-[var(--space-6)]">
                  <div className="flex flex-wrap items-center gap-[var(--space-3)]">
                    <ActionButton
                      variant="primary"
                      onClick={() => setPrimClicks((c) => c + 1)}
                    >
                      Primary Action
                    </ActionButton>
                    <ActionButton
                      variant="secondary"
                      onClick={() => setPrimClicks((c) => c + 1)}
                    >
                      Secondary
                    </ActionButton>
                    <ActionButton
                      variant="outline"
                      onClick={() => setPrimClicks((c) => c + 1)}
                    >
                      Outline
                    </ActionButton>
                    <ActionButton
                      variant="ghost"
                      onClick={() => setPrimClicks((c) => c + 1)}
                    >
                      Ghost
                    </ActionButton>
                    <ActionButton
                      variant="primary"
                      loading={primLoading}
                      onClick={handleSimulatePrimLoading}
                    >
                      {primLoading ? "Working..." : "Trigger Loading"}
                    </ActionButton>
                  </div>

                  <div className="flex flex-wrap items-center gap-[var(--space-3)] border-t border-[var(--border-subtle)] pt-[var(--space-5)]">
                    <span className="mr-2 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                      Sizes:
                    </span>
                    <ActionButton
                      size="sm"
                      variant="outline"
                      onClick={() => setPrimClicks((c) => c + 1)}
                    >
                      Small · 32px
                    </ActionButton>
                    <ActionButton
                      size="md"
                      variant="outline"
                      onClick={() => setPrimClicks((c) => c + 1)}
                    >
                      Medium · 40px
                    </ActionButton>
                    <ActionButton
                      size="lg"
                      variant="outline"
                      onClick={() => setPrimClicks((c) => c + 1)}
                    >
                      Large · 44px
                    </ActionButton>
                  </div>
                </SurfaceCardContent>
                <SurfaceCardFooter className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                  <span>primitives/radix/ActionButton.tsx</span>
                  <span>:focus-visible · 2px offset</span>
                </SurfaceCardFooter>
              </SurfaceCard>

              <SurfaceCard className="flex flex-col justify-between lg:col-span-5">
                <SurfaceCardHeader className="border-b border-[var(--border-subtle)]">
                  <SurfaceCardTitle>SurfaceCard Anatomy</SurfaceCardTitle>
                  <SurfaceCardDescription>
                    Structured Header, Content, and Footer slots enforcing concentric outer/inner corner radii.
                  </SurfaceCardDescription>
                </SurfaceCardHeader>
                <SurfaceCardContent className="space-y-[var(--space-3)] pt-[var(--space-5)]">
                  <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
                    <div className="flex items-center justify-between font-[family-name:var(--font-mono)] text-[length:var(--text-xs)]">
                      <span className="text-[var(--text-muted)]">Outer Card Radius</span>
                      <span className="tabular-nums font-semibold text-[var(--text-primary)]">20px (--radius-xl)</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between font-[family-name:var(--font-mono)] text-[length:var(--text-xs)]">
                      <span className="text-[var(--text-muted)]">Nested Well Radius</span>
                      <span className="tabular-nums font-semibold text-[var(--accent-primary)]">14px (--radius-lg)</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between font-[family-name:var(--font-mono)] text-[length:var(--text-xs)]">
                      <span className="text-[var(--text-muted)]">Border Hairline</span>
                      <span className="tabular-nums font-semibold text-[var(--text-primary)]">1px solid --border-subtle</span>
                    </div>
                  </div>
                </SurfaceCardContent>
                <SurfaceCardFooter className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                  <span>primitives/radix/SurfaceCard.tsx</span>
                  <span className="text-[var(--status-success)]">Composable</span>
                </SurfaceCardFooter>
              </SurfaceCard>
            </div>
          </div>
        </section>

        {/* Section 2: Apple-Grade Motion Showcase */}
        <section
          id="motion"
          className="border-b border-[var(--border-subtle)] py-[var(--space-16)]"
        >
          <div className="mx-auto max-w-[var(--container-ui)] space-y-[var(--space-12)] px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="flex flex-wrap items-end justify-between gap-[var(--space-4)]">
              <div className="space-y-[var(--space-2)]">
                <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                  02 · Motion Primitives
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]">
                  Tactile springs, spatial continuity, and draggable sheets.
                </h2>
              </div>
              <p className="max-w-[44ch] text-[length:var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
                Every control animates composited GPU properties only and wraps root trees in{" "}
                <code className="font-[family-name:var(--font-mono)]">MotionConfig reducedMotion=&quot;user&quot;</code>.
              </p>
            </div>

            {/* TactileTabs Interactive Lab */}
            <SurfaceCard>
              <SurfaceCardHeader className="border-b border-[var(--border-subtle)] sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <SurfaceCardTitle>TactileTabs &amp; Dock</SurfaceCardTitle>
                  <SurfaceCardDescription>
                    Shared <code className="font-[family-name:var(--font-mono)]">layoutId</code> pill with spring{" "}
                    <code className="font-[family-name:var(--font-mono)]">380 / 32 / 0.8</code>, WAI-ARIA arrow navigation, and complete state primitives.
                  </SurfaceCardDescription>
                </div>

                <div className="flex flex-wrap items-center gap-[var(--space-3)] pt-[var(--space-2)] sm:pt-0">
                  <SegmentedControl
                    ariaLabel="Tabs variant"
                    value={tabsVariant}
                    onValueChange={setTabsVariant}
                    options={[
                      { value: "tabs", label: "Tabs" },
                      { value: "dock", label: "Dock" },
                    ]}
                  />
                  <SegmentedControl
                    ariaLabel="Panel state"
                    value={panelState}
                    onValueChange={setPanelState}
                    options={[
                      { value: "default", label: "Default" },
                      { value: "loading", label: "Skeleton" },
                      { value: "empty", label: "Empty" },
                      { value: "error", label: "Error" },
                    ]}
                  />
                </div>
              </SurfaceCardHeader>

              <SurfaceCardContent className="pt-[var(--space-6)]">
                <TactileTabs variant={tabsVariant} defaultValue="physics">
                  <TactileTabsList>
                    <TactileTabsTrigger
                      value="physics"
                      icon={<Gauge className="h-3.5 w-3.5" />}
                      count={3}
                    >
                      Spring Physics
                    </TactileTabsTrigger>
                    <TactileTabsTrigger
                      value="keyboard"
                      icon={<Sliders className="h-3.5 w-3.5" />}
                    >
                      Keyboard Spec
                    </TactileTabsTrigger>
                    <TactileTabsTrigger
                      value="gpu"
                      icon={<Activity className="h-3.5 w-3.5" />}
                    >
                      GPU Budget
                    </TactileTabsTrigger>
                  </TactileTabsList>

                  <TactileTabsContent value="physics">
                    {panelState === "loading" ? (
                      <TactileTabsSkeleton rows={3} />
                    ) : panelState === "empty" ? (
                      <TactileTabsEmpty
                        title="No custom spring overrides"
                        description="Using repository default tactile physics (stiffness: 380, damping: 32, mass: 0.8)."
                        action={
                          <ActionButton
                            size="sm"
                            variant="outline"
                            onClick={() => setPanelState("default")}
                          >
                            Restore default view
                          </ActionButton>
                        }
                      />
                    ) : panelState === "error" ? (
                      <TactileTabsError
                        title="Simulated telemetry fault"
                        description="Layout-matched error state using --status-danger without tinting the entire page."
                        onRetry={() => setPanelState("default")}
                      />
                    ) : (
                      <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-3">
                        <div className="space-y-1">
                          <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                            Controls &amp; Tabs
                          </span>
                          <p className="tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-base)] font-semibold">
                            stiffness: 380 · damping: 32
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                            Panels &amp; Cards
                          </span>
                          <p className="tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-base)] font-semibold">
                            stiffness: 240 · damping: 28
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                            Fixed Opacity Curve
                          </span>
                          <p className="tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-base)] font-semibold">
                            (0.22, 1, 0.36, 1)
                          </p>
                        </div>
                      </div>
                    )}
                  </TactileTabsContent>

                  <TactileTabsContent value="keyboard">
                    <p className="max-w-[64ch] text-[length:var(--text-sm)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                      Focus any tab trigger and press{" "}
                      <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)]">
                        ArrowRight
                      </kbd>
                      ,{" "}
                      <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)]">
                        ArrowLeft
                      </kbd>
                      ,{" "}
                      <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)]">
                        Home
                      </kbd>
                      , or{" "}
                      <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)]">
                        End
                      </kbd>
                      . Roving{" "}
                      <code className="font-[family-name:var(--font-mono)]">tabIndex</code>{" "}
                      updates automatically alongside{" "}
                      <code className="font-[family-name:var(--font-mono)]">aria-selected</code>.
                    </p>
                  </TactileTabsContent>

                  <TactileTabsContent value="gpu">
                    <p className="max-w-[64ch] text-[length:var(--text-sm)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                      Exiting panels use{" "}
                      <code className="font-[family-name:var(--font-mono)]">
                        AnimatePresence mode=&quot;popLayout&quot;
                      </code>{" "}
                      and animate strictly on{" "}
                      <code className="font-[family-name:var(--font-mono)]">opacity</code> and{" "}
                      <code className="font-[family-name:var(--font-mono)]">transform</code>, avoiding layout recalculations.
                    </p>
                  </TactileTabsContent>
                </TactileTabs>
              </SurfaceCardContent>
            </SurfaceCard>

            {/* AnimatedNumber & MotionDrawer Unequal Pair */}
            <div className="grid grid-cols-1 gap-[var(--space-6)] lg:grid-cols-12">
              <SurfaceCard className="lg:col-span-7">
                <SurfaceCardHeader className="border-b border-[var(--border-subtle)] sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <SurfaceCardTitle>AnimatedNumber (Tabular Telemetry)</SurfaceCardTitle>
                    <SurfaceCardDescription>
                      Viewport-triggered counters using{" "}
                      <code className="font-[family-name:var(--font-mono)]">APPLE_EASE_OUT</code>{" "}
                      and locked{" "}
                      <code className="font-[family-name:var(--font-mono)]">tabular-nums</code>{" "}
                      column width.
                    </SurfaceCardDescription>
                  </div>
                  <ActionButton
                    size="sm"
                    variant="outline"
                    onClick={() => setCounterSeed((s) => s + 1)}
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Replay</span>
                  </ActionButton>
                </SurfaceCardHeader>
                <SurfaceCardContent className="pt-[var(--space-6)]">
                  <div
                    key={counterSeed}
                    className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-3"
                  >
                    <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
                      <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                        Indexed Blocks
                      </span>
                      <p className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-semibold text-[var(--text-primary)]">
                        <AnimatedNumber value={22} />
                      </p>
                    </div>
                    <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
                      <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                        Primary Contrast
                      </span>
                      <p className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-semibold text-[var(--accent-primary)]">
                        <AnimatedNumber value={17.5} decimals={1} suffix=":1" />
                      </p>
                    </div>
                    <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
                      <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                        Frame Target
                      </span>
                      <p className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-semibold text-[var(--status-success)]">
                        <AnimatedNumber value={60} suffix=" fps" />
                      </p>
                    </div>
                  </div>
                </SurfaceCardContent>
              </SurfaceCard>

              <SurfaceCard className="flex flex-col justify-between lg:col-span-5">
                <SurfaceCardHeader className="border-b border-[var(--border-subtle)]">
                  <SurfaceCardTitle>MotionDrawer (Interactive Sheet)</SurfaceCardTitle>
                  <SurfaceCardDescription>
                    Apple-calibrated sheet with downward{" "}
                    <code className="font-[family-name:var(--font-mono)]">drag=&quot;y&quot;</code>{" "}
                    elastic dismissal, backdrop fade, and focus restoration.
                  </SurfaceCardDescription>
                </SurfaceCardHeader>
                <SurfaceCardContent className="space-y-[var(--space-4)] pt-[var(--space-6)]">
                  <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-4)] py-[var(--space-3)] font-[family-name:var(--font-mono)] text-[length:var(--text-xs)]">
                    <span className="text-[var(--text-secondary)]">Active Runtime Token Snapshot</span>
                    <span className="text-[var(--accent-primary)]">{activePaletteInfo.id} · {theme}</span>
                  </div>
                  <ActionButton
                    variant="primary"
                    className="w-full"
                    onClick={() => setDrawerOpen(true)}
                  >
                    <PanelBottomOpen className="h-4 w-4" aria-hidden="true" />
                    <span>Open Draggable Sheet</span>
                  </ActionButton>
                </SurfaceCardContent>
              </SurfaceCard>
            </div>

            {/* App Store Expandable Card Gallery */}
            <div className="space-y-[var(--space-5)]">
              <div className="flex flex-wrap items-center justify-between gap-[var(--space-4)]">
                <div className="space-y-1">
                  <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)]">
                    AppStoreCard (Expandable Spatial Continuity)
                  </h3>
                  <p className="text-[length:var(--text-sm)] text-[var(--text-secondary)]">
                    Click either card to expand with shared{" "}
                    <code className="font-[family-name:var(--font-mono)]">layoutId</code>, press{" "}
                    <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)]">
                      Esc
                    </kbd>{" "}
                    or drag down to dismiss.
                  </p>
                </div>

                <ActionButton
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCardSkeleton((prev) => !prev)}
                >
                  {showCardSkeleton ? "Show live cards" : "Preview skeleton state"}
                </ActionButton>
              </div>

              {showCardSkeleton ? (
                <div className="grid grid-cols-1 gap-[var(--space-6)] md:grid-cols-12">
                  <AppStoreCardSkeleton className="md:col-span-7" />
                  <AppStoreCardSkeleton className="md:col-span-5" />
                </div>
              ) : (
                <AppStoreCardGroup className="grid grid-cols-1 gap-[var(--space-6)] md:grid-cols-12">
                  <div className="md:col-span-7">
                    <AppStoreCard>
                      <AppStoreCardTrigger>
                        <AppStoreCardMedia className="flex aspect-[16/9] flex-col justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-6)]">
                          <div className="flex items-center justify-between font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                            <span>components/motion/AppStoreCard.tsx</span>
                            <span className="tabular-nums">240 / 28</span>
                          </div>

                          <svg
                            viewBox="0 0 360 88"
                            className="my-2 h-20 w-full"
                            aria-hidden="true"
                          >
                            <line
                              x1="0"
                              y1="72"
                              x2="360"
                              y2="72"
                              stroke="var(--border-default)"
                            />
                            <line
                              x1="0"
                              y1="24"
                              x2="360"
                              y2="24"
                              stroke="var(--border-subtle)"
                              strokeDasharray="4 4"
                            />
                            <path
                              d="M 10 72 L 160 24 L 350 24"
                              fill="none"
                              stroke="var(--border-strong)"
                              strokeWidth="1.5"
                              strokeDasharray="4 4"
                            />
                            <path
                              d="M 10 72 C 42 72, 58 14, 98 20 C 128 25, 146 26, 178 24 C 216 22, 260 24, 350 24"
                              fill="none"
                              stroke="var(--accent-primary)"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>

                          <div className="grid grid-cols-3 gap-[var(--space-3)]">
                            <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-3)]">
                              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                                Shell
                              </span>
                              <p className="mt-1 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold">
                                layoutId
                              </p>
                            </div>
                            <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-3)]">
                              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                                Exit
                              </span>
                              <p className="mt-1 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold">
                                popLayout
                              </p>
                            </div>
                            <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-3)]">
                              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                                Gesture
                              </span>
                              <p className="mt-1 font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold">
                                drag=&quot;y&quot;
                              </p>
                            </div>
                          </div>
                        </AppStoreCardMedia>
                        <AppStoreCardBody>
                          <AppStoreCardEyebrow>Spatial Continuity</AppStoreCardEyebrow>
                          <AppStoreCardTitle>
                            Zero-Cut Card-to-Sheet Morphing
                          </AppStoreCardTitle>
                          <AppStoreCardSummary>
                            Shared layoutId coordinates shell geometry, media framing, eyebrow, and headline into a keyboard-accessible dialog.
                          </AppStoreCardSummary>
                        </AppStoreCardBody>
                      </AppStoreCardTrigger>

                      <AppStoreCardDetail
                        eyebrow="Spatial Continuity"
                        title="Zero-Cut Card-to-Sheet Morphing"
                        subtitle="How AppStoreCard maintains object permanence across container transitions without animating width or height directly."
                        headerMedia={
                          <div className="flex h-44 flex-col justify-end border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-6)]">
                            <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                              FLUID_SPRING · stiffness: 240 · damping: 28 · dragElastic: 0.28
                            </span>
                          </div>
                        }
                      >
                        <p className="text-[length:var(--text-sm)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                          Rather than mounting an unrelated modal over the viewport,{" "}
                          <code className="font-[family-name:var(--font-mono)] text-[var(--text-primary)]">
                            AppStoreCard
                          </code>{" "}
                          pairs a scoped{" "}
                          <code className="font-[family-name:var(--font-mono)] text-[var(--text-primary)]">
                            LayoutGroup
                          </code>{" "}
                          with four synchronized{" "}
                          <code className="font-[family-name:var(--font-mono)] text-[var(--text-primary)]">
                            layoutId
                          </code>{" "}
                          anchors.
                        </p>
                        <div className="grid grid-cols-1 gap-[var(--space-3)] sm:grid-cols-2">
                          <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
                            <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold text-[var(--text-primary)]">
                              Focus Restoration
                            </p>
                            <p className="mt-1 text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                              Opening moves focus to the close button; pressing Escape or dragging down returns focus to the originating card trigger.
                            </p>
                          </div>
                          <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
                            <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold text-[var(--text-primary)]">
                              Inertia Drag Dismissal
                            </p>
                            <p className="mt-1 text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                              Downward drag past 110px or velocity above 420px/s dismisses the sheet smoothly on GPU transforms.
                            </p>
                          </div>
                        </div>
                      </AppStoreCardDetail>
                    </AppStoreCard>
                  </div>

                  <div className="md:col-span-5">
                    <AppStoreCard>
                      <AppStoreCardTrigger className="h-full justify-between">
                        <AppStoreCardMedia className="flex aspect-[16/10] flex-col justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-5)]">
                          <div className="flex items-center justify-between font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                            <span>Surface Elevation Stack</span>
                            <span className="tabular-nums">1px Borders</span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] py-[var(--space-2)]">
                              <span className="font-[family-name:var(--font-mono)] text-[11px]">
                                --surface-elevated
                              </span>
                              <span className="tabular-nums font-[family-name:var(--font-mono)] text-[11px] text-[var(--status-success)]">
                                17.5:1
                              </span>
                            </div>
                            <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--accent-primary-border)] bg-[var(--accent-primary-subtle)] px-[var(--space-3)] py-[var(--space-2)]">
                              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-primary)]">
                                --accent-primary
                              </span>
                              <span className="tabular-nums font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent-primary)]">
                                {activePaletteInfo.contrastLabel}
                              </span>
                            </div>
                          </div>
                        </AppStoreCardMedia>
                        <AppStoreCardBody>
                          <AppStoreCardEyebrow>Color Discipline</AppStoreCardEyebrow>
                          <AppStoreCardTitle>
                            One Accent, Crisp Hairlines
                          </AppStoreCardTitle>
                          <AppStoreCardSummary>
                            Why tonal surface steps and 1px borders outperform heavy blurred glass and neon box-shadows.
                          </AppStoreCardSummary>
                        </AppStoreCardBody>
                      </AppStoreCardTrigger>

                      <AppStoreCardDetail
                        eyebrow="Color Discipline"
                        title="One Accent, Crisp Hairlines"
                        subtitle="Inspect the exact surface hierarchy defined in tokens/colors.css."
                      >
                        <p className="text-[length:var(--text-sm)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                          Every view uses one neutral base, three tonal elevations (
                          <code className="font-[family-name:var(--font-mono)]">--surface-canvas</code>,{" "}
                          <code className="font-[family-name:var(--font-mono)]">--surface-sunken</code>,{" "}
                          <code className="font-[family-name:var(--font-mono)]">--surface-elevated</code>
                          ), and one primary accent reserved for active intent.
                        </p>
                      </AppStoreCardDetail>
                    </AppStoreCard>
                  </div>
                </AppStoreCardGroup>
              )}
            </div>
          </div>
        </section>

        {/* Sticky Scroll Product Sequence */}
        <StickyProductShowcase
          sectionLabel="02b · Scroll-Linked Choreography (StickyProductShowcase)"
          chapters={SHOWCASE_CHAPTERS}
          cta={{ label: "Inspect token palettes", href: "#tokens" }}
          renderVisual={(progress) => <StickyStageVisual progress={progress} />}
        />

        {/* Section 3: Curated 21st.dev, Data-Viz & Patterns */}
        <section
          id="components"
          className="border-t border-b border-[var(--border-subtle)] py-[var(--space-16)]"
        >
          <div className="mx-auto max-w-[var(--container-ui)] space-y-[var(--space-12)] px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="space-y-[var(--space-2)]">
              <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                03 · Curated 21st.dev &amp; Data-Viz
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]">
                Filtered components stripped of neon slop.
              </h2>
              <p className="max-w-[60ch] text-[length:var(--text-base)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                Raw community snippets are audited, refactored to TypeScript, wired to{" "}
                <code className="font-[family-name:var(--font-mono)]">tokens/</code>, and upgraded with keyboard support and real loading/error states.
              </p>
            </div>

            {/* Row A: PricingSelector + KpiMetricCard */}
            <div className="grid grid-cols-1 items-start gap-[var(--space-8)] lg:grid-cols-12">
              <div className="space-y-[var(--space-4)] lg:col-span-5">
                <PricingSelector
                  tiers={PRICING_TIERS}
                  defaultTierId="studio"
                  onSelectTier={(tier, billing) =>
                    setSelectedPlanMsg(
                      `Selected ${tier.name} (${billing}) — $${billing === "monthly" ? tier.monthlyPrice : tier.yearlyPrice}/mo.`
                    )
                  }
                />
                {selectedPlanMsg ? (
                  <p className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-primary)]">
                    {selectedPlanMsg}
                  </p>
                ) : null}
              </div>

              <div className="space-y-[var(--space-6)] lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-[var(--space-3)]">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold">
                      KpiMetricCard &amp; Feedback Primitives
                    </h3>
                    <p className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                      Right-aligned{" "}
                      <code className="font-[family-name:var(--font-mono)]">tabular-nums</code>{" "}
                      metrics with explicit skeleton and error states.
                    </p>
                  </div>
                  <SegmentedControl
                    ariaLabel="KPI display state"
                    value={kpiState}
                    onValueChange={setKpiState}
                    options={[
                      { value: "live", label: "Live" },
                      { value: "loading", label: "Skeleton" },
                      { value: "error", label: "Error" },
                    ]}
                  />
                </div>

                {kpiState === "loading" ? (
                  <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2">
                    <KpiMetricCardSkeleton />
                    <KpiMetricCardSkeleton />
                    <SkeletonBlock lines={2} className="sm:col-span-2" />
                  </div>
                ) : kpiState === "error" ? (
                  <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2">
                    <KpiMetricCardError
                      label="WCAG Contrast"
                      onRetry={() => setKpiState("live")}
                    />
                    <EmptyState
                      title="No telemetry snapshots"
                      description="Run a registry audit or restore live metrics to populate this panel."
                      action={
                        <ActionButton
                          size="sm"
                          variant="outline"
                          onClick={() => setKpiState("live")}
                        >
                          Restore live metrics
                        </ActionButton>
                      }
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2">
                    <KpiMetricCard
                      label="Body Contrast"
                      value="17.5 : 1"
                      delta="WCAG AAA"
                      trend="positive"
                      period="Light & Dark"
                    />
                    <KpiMetricCard
                      label="Registry Items"
                      value="22"
                      delta="+5 blocks"
                      trend="positive"
                      period="v0.3.0"
                    />
                    <KpiMetricCard
                      label="AI Slop Gradients"
                      value="0"
                      delta="Enforced"
                      trend="neutral"
                      period="Pre-commit audit"
                      className="sm:col-span-2"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Row B: StatusTag + CommandPromptInput + BarDistribution */}
            <div className="grid grid-cols-1 items-start gap-[var(--space-8)] border-t border-[var(--border-subtle)] pt-[var(--space-10)] lg:grid-cols-12">
              <div className="space-y-[var(--space-6)] lg:col-span-6">
                <SurfaceCard>
                  <SurfaceCardHeader className="border-b border-[var(--border-subtle)]">
                    <SurfaceCardTitle>StatusTag &amp; RemovableTagGroup</SurfaceCardTitle>
                    <SurfaceCardDescription>
                      Semantic status indicators paired with{" "}
                      <code className="font-[family-name:var(--font-mono)]">layout</code> +{" "}
                      <code className="font-[family-name:var(--font-mono)]">AnimatePresence mode=&quot;popLayout&quot;</code>{" "}
                      tag dismissal.
                    </SurfaceCardDescription>
                  </SurfaceCardHeader>
                  <SurfaceCardContent className="space-y-[var(--space-5)] pt-[var(--space-5)]">
                    <div className="flex flex-wrap gap-[var(--space-2)]">
                      <StatusTag tone="success" label="WCAG Pass" />
                      <StatusTag tone="accent" label={activePaletteInfo.name} />
                      <StatusTag tone="warning" label="Review Pending" />
                      <StatusTag tone="danger" label="Raw Hex Blocked" />
                      <StatusTag tone="neutral" label="v0.3.0" />
                    </div>

                    <div className="space-y-2 border-t border-[var(--border-subtle)] pt-[var(--space-4)]">
                      <span className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-caps)] text-[var(--text-muted)]">
                        Interactive Filter Chips (Click X to remove)
                      </span>
                      <RemovableTagGroup
                        items={tags}
                        onRemove={(id) =>
                          setTags((prev) => prev.filter((item) => item.id !== id))
                        }
                        onReset={() => setTags(INITIAL_STATUS_TAGS)}
                      />
                    </div>
                  </SurfaceCardContent>
                </SurfaceCard>

                <div className="space-y-[var(--space-3)]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold">
                      CommandPromptInput
                    </h3>
                    <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                      Enter to dispatch
                    </span>
                  </div>
                  <CommandPromptInput
                    onSubmitPrompt={(payload) =>
                      setDispatchedPrompts((prev) => [
                        {
                          id: `${Date.now()}`,
                          mode: payload.mode,
                          prompt: payload.prompt,
                        },
                        ...prev.slice(0, 2),
                      ])
                    }
                  />
                  <div className="space-y-2">
                    {dispatchedPrompts.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-start justify-between gap-[var(--space-3)] rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-3)] py-[var(--space-2)] text-[length:var(--text-xs)]"
                      >
                        <span className="text-[var(--text-primary)]">{entry.prompt}</span>
                        <span className="shrink-0 rounded-[var(--radius-xs)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[11px] uppercase text-[var(--accent-primary)]">
                          {entry.mode}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-[var(--space-4)] lg:col-span-6">
                <div className="flex flex-wrap items-center justify-between gap-[var(--space-3)]">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-semibold">
                      BarDistribution Telemetry
                    </h3>
                    <p className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                      Hover or focus any bar to inspect exact{" "}
                      <code className="font-[family-name:var(--font-mono)]">tabular-nums</code>{" "}
                      readings.
                    </p>
                  </div>
                  <SegmentedControl
                    ariaLabel="Telemetry window"
                    value={chartWindow}
                    onValueChange={setChartWindow}
                    options={[
                      { value: "7d", label: "7d" },
                      { value: "30d", label: "30d" },
                      { value: "90d", label: "90d" },
                    ]}
                  />
                </div>

                <BarDistribution
                  key={chartWindow}
                  title="Anti-Slop Audit Pass Rate"
                  subtitle={`Token & spring compliance across ${chartWindow} window`}
                  data={BAR_CHART_DATA[chartWindow]}
                />
              </div>
            </div>

            {/* Patterns Interactive Preview */}
            <div id="patterns" className="space-y-[var(--space-6)] border-t border-[var(--border-subtle)] pt-[var(--space-10)]">
              <div className="flex flex-wrap items-center justify-between gap-[var(--space-4)]">
                <div className="space-y-1">
                  <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                    Layer 3 · Patterns
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)]">
                    Complete Application Shells
                  </h3>
                </div>

                <SegmentedControl
                  ariaLabel="Pattern preview"
                  value={patternPreview}
                  onValueChange={setPatternPreview}
                  options={[
                    { value: "dashboard", label: "DashboardShell" },
                    { value: "auth", label: "AuthMinimal" },
                  ]}
                />
              </div>

              {patternPreview === "dashboard" ? (
                <DashboardShell
                  workspaceName="UI-Libary Ops"
                  activeNavId={dashNav}
                  onSelectNav={setDashNav}
                  navItems={[
                    {
                      id: "overview",
                      label: "Overview",
                      icon: <Compass className="h-4 w-4" />,
                      badge: 3,
                    },
                    {
                      id: "registry",
                      label: "Registry",
                      icon: <FolderTree className="h-4 w-4" />,
                      badge: 22,
                    },
                    {
                      id: "audit",
                      label: "Slop Audit",
                      icon: <ShieldCheck className="h-4 w-4" />,
                    },
                  ]}
                  headerActions={
                    <>
                      <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                        patterns/dashboard-shell/DashboardShell.tsx
                      </span>
                      <ActionButton
                        size="sm"
                        variant="outline"
                        onClick={() => setDashNav("audit")}
                      >
                        Jump to Audit
                      </ActionButton>
                    </>
                  }
                >
                  <div className="space-y-[var(--space-4)]">
                    <h4 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold">
                      Active View: {dashNav}
                    </h4>
                    <p className="max-w-[56ch] text-[length:var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
                      Sidebar items share a{" "}
                      <code className="font-[family-name:var(--font-mono)]">layoutId</code>{" "}
                      indicator on{" "}
                      <code className="font-[family-name:var(--font-mono)]">TACTILE_SPRING</code>{" "}
                      and align badge counts using{" "}
                      <code className="font-[family-name:var(--font-mono)]">tabular-nums</code>.
                    </p>
                    <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2">
                      <KpiMetricCard
                        label="Focus Ring Coverage"
                        value="100%"
                        delta="Keyboard OK"
                        trend="positive"
                      />
                      <KpiMetricCard
                        label="UI Emojis"
                        value="0"
                        delta="Lucide Only"
                        trend="neutral"
                      />
                    </div>
                  </div>
                </DashboardShell>
              ) : (
                <div className="flex justify-center rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-6)] sm:p-[var(--space-10)]">
                  <AuthMinimal
                    onAuthenticate={async () => {
                      await new Promise((resolve) => setTimeout(resolve, 450));
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 4: Palettes, Typography Ruler, Spatial Tokens & Audit */}
        <section id="tokens" className="py-[var(--space-16)]">
          <div className="mx-auto max-w-[var(--container-ui)] space-y-[var(--space-12)] px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            {/* Interactive 5-Palette Studio */}
            <div className="space-y-[var(--space-5)]">
              <div className="flex flex-wrap items-end justify-between gap-[var(--space-4)]">
                <div className="space-y-[var(--space-2)]">
                  <div className="flex items-center gap-[var(--space-2)] text-[var(--accent-primary)]">
                    <Palette className="h-4 w-4" aria-hidden="true" />
                    <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)]">
                      04 · Curated Single-Accent Palettes
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-semibold tracking-[var(--tracking-tight)]">
                    Five calibrated palettes for light &amp; dark surfaces.
                  </h2>
                </div>
                <p className="max-w-[46ch] text-[length:var(--text-sm)] text-[var(--text-secondary)]">
                  Select any preset below to live-theme the entire documentation site via{" "}
                  <code className="font-[family-name:var(--font-mono)]">[data-palette]</code>{" "}
                  in{" "}
                  <code className="font-[family-name:var(--font-mono)]">tokens/colors.css</code>.
                </p>
              </div>

              <div
                role="radiogroup"
                aria-label="Design system color palette presets"
                className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-5"
              >
                {PALETTE_PRESETS.map((preset) => {
                  const selected = palette === preset.id;
                  const accent =
                    theme === "light" ? preset.lightAccent : preset.darkAccent;
                  const canvas =
                    theme === "light" ? preset.lightCanvas : preset.darkCanvas;
                  return (
                    <motion.button
                      key={preset.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      whileTap={{ scale: 0.98 }}
                      transition={TACTILE_SPRING}
                      onClick={() => setPalette(preset.id)}
                      className={`flex flex-col justify-between gap-[var(--space-4)] rounded-[var(--radius-xl)] border p-[var(--space-4)] text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${
                        selected
                          ? "border-[var(--accent-primary)] bg-[var(--accent-primary-subtle)] shadow-[var(--shadow-card)]"
                          : "border-[var(--border-default)] bg-[var(--surface-elevated)] hover:border-[var(--border-strong)]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            aria-hidden="true"
                            className="h-5 w-5 rounded-[var(--radius-pill)] border border-[var(--border-default)]"
                            style={{ backgroundColor: accent }}
                          />
                          <span
                            aria-hidden="true"
                            className="h-5 w-5 rounded-[var(--radius-pill)] border border-[var(--border-default)]"
                            style={{ backgroundColor: canvas }}
                          />
                        </div>
                        <span className="tabular-nums font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                          {preset.contrastLabel}
                        </span>
                      </div>

                      <div>
                        <p className="font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold text-[var(--text-primary)]">
                          {preset.name}
                        </p>
                        <p className="mt-0.5 text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                          {preset.tagline}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-[var(--space-2)] font-[family-name:var(--font-mono)] text-[11px]">
                        <span className="text-[var(--text-muted)]">data-palette=&quot;{preset.id}&quot;</span>
                        {selected ? (
                          <span className="font-semibold text-[var(--accent-primary)]">Active</span>
                        ) : null}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Live Swatch Matrix + Typography Scale Ruler */}
            <div className="grid grid-cols-1 gap-[var(--space-8)] lg:grid-cols-12">
              {/* Semantic Color Swatches */}
              <div className="space-y-[var(--space-4)] lg:col-span-5">
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)]">
                  Live Semantic Tokens ({activePaletteInfo.name} · {theme})
                </h3>

                <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)]">
                  {COLOR_SWATCHES.map((swatch) => (
                    <div
                      key={swatch.token}
                      className="flex items-center justify-between gap-[var(--space-4)] border-b border-[var(--border-subtle)] px-[var(--space-4)] py-[var(--space-3)] last:border-b-0"
                    >
                      <div className="flex items-center gap-[var(--space-3)]">
                        <span
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 rounded-[var(--radius-sm)] border border-[var(--border-default)]"
                          style={{ backgroundColor: `var(${swatch.token})` }}
                        />
                        <div>
                          <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold text-[var(--text-primary)]">
                            {swatch.token}
                          </p>
                          <p className="text-[11px] text-[var(--text-muted)]">
                            {swatch.role}
                          </p>
                        </div>
                      </div>
                      <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-secondary)]">
                        CSS var
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography Pairing & Scale Ruler */}
              <div className="space-y-[var(--space-5)] lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-[var(--space-3)]">
                  <div className="flex items-center gap-[var(--space-2)] text-[var(--accent-primary)]">
                    <Type className="h-4 w-4" aria-hidden="true" />
                    <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)]">
                      Typography Scale &amp; Pairings
                    </span>
                  </div>
                  <SegmentedControl
                    ariaLabel="Typography specimen selector"
                    value={typography}
                    onValueChange={setTypography}
                    options={[
                      { value: "editorial", label: "Editorial" },
                      { value: "technical", label: "Technical" },
                      { value: "geometric", label: "Geometric" },
                    ]}
                  />
                </div>

                <SurfaceCard>
                  <SurfaceCardContent className="space-y-[var(--space-5)] pt-[var(--space-6)]">
                    {TYPOGRAPHY_SCALE.map((row) => (
                      <div
                        key={row.token}
                        className="space-y-1.5 border-b border-[var(--border-subtle)] pb-[var(--space-4)] last:border-b-0 last:pb-0"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                          <span className="font-semibold text-[var(--text-secondary)]">
                            {row.token}
                          </span>
                          <span className="tabular-nums">{row.spec} · {row.role}</span>
                        </div>
                        <p className={row.className}>{row.sample}</p>
                      </div>
                    ))}
                  </SurfaceCardContent>
                  <SurfaceCardFooter className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--text-muted)]">
                    <span>tokens/typography.css · {typography}</span>
                    <span className="tabular-nums">0123456789 · tabular-nums</span>
                  </SurfaceCardFooter>
                </SurfaceCard>
              </div>
            </div>

            {/* Border Radius & Elevation Visualizers */}
            <div className="grid grid-cols-1 gap-[var(--space-8)] border-t border-[var(--border-subtle)] pt-[var(--space-10)] lg:grid-cols-12">
              <div className="space-y-[var(--space-4)] lg:col-span-7">
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)]">
                  Concentric Border Radius Scale
                </h3>
                <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3">
                  {RADIUS_TOKENS.map((item) => (
                    <div
                      key={item.token}
                      className="flex flex-col justify-between gap-[var(--space-3)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-4)]"
                      style={{ borderRadius: `var(${item.token})` }}
                    >
                      <div className="flex items-center justify-between font-[family-name:var(--font-mono)] text-[11px]">
                        <span className="font-semibold text-[var(--accent-primary)]">{item.px}</span>
                        <span className="text-[var(--text-muted)]">{item.token}</span>
                      </div>
                      <p className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                        {item.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-[var(--space-4)] lg:col-span-5">
                <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)]">
                  Neutral Hairline Elevation
                </h3>
                <div className="space-y-[var(--space-4)] rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-5)]">
                  {ELEVATION_TOKENS.map((elev) => (
                    <div
                      key={elev.token}
                      className={`rounded-[var(--radius-lg)] border border-[var(--border-default)] p-[var(--space-4)] ${elev.surface}`}
                      style={{ boxShadow: `var(${elev.token})` }}
                    >
                      <p className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold text-[var(--text-primary)]">
                        {elev.token}
                      </p>
                      <p className="mt-1 text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                        {elev.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4 Mandatory Audit */}
            <div className="space-y-[var(--space-5)] border-t border-[var(--border-subtle)] pt-[var(--space-10)]">
              <div className="flex flex-wrap items-center justify-between gap-[var(--space-4)]">
                <div className="space-y-1">
                  <span className="font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                    Mandatory Pre-Delivery Gate
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)]">
                    Section 4 Audit Checklist (AGENTS.md)
                  </h2>
                </div>
                <span className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] py-[var(--space-1)] font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--status-success)]">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>6 / 6 Verified on This Site</span>
                </span>
              </div>

              <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2 lg:grid-cols-3">
                {AUDIT_CHECKLIST.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-[var(--space-3)] rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-5)]"
                  >
                    <div className="space-y-[var(--space-2)]">
                      <span className="tabular-nums font-[family-name:var(--font-mono)] text-[length:var(--text-xs)] font-semibold text-[var(--accent-primary)]">
                        0{idx + 1}
                      </span>
                      <h3 className="text-[length:var(--text-sm)] font-semibold text-[var(--text-primary)]">
                        {item.question}
                      </h3>
                    </div>
                    <p className="text-[length:var(--text-xs)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive MotionDrawer Instance */}
        <MotionDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          eyebrow="components/motion/MotionDrawer.tsx"
          title="Runtime Token Inspector"
          description="Drag down on the handle or press Escape to dismiss and restore focus to the trigger button."
          footer={
            <>
              <ActionButton
                variant="outline"
                size="sm"
                onClick={() =>
                  setTheme((prev) => (prev === "light" ? "dark" : "light"))
                }
              >
                Toggle {theme === "light" ? "Dark" : "Light"}
              </ActionButton>
              <ActionButton
                variant="primary"
                size="sm"
                onClick={() => setDrawerOpen(false)}
              >
                Done
              </ActionButton>
            </>
          }
        >
          <div className="space-y-[var(--space-4)]">
            <div className="grid grid-cols-2 gap-[var(--space-3)]">
              <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-3)]">
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                  Active Palette
                </span>
                <p className="mt-1 font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold text-[var(--accent-primary)]">
                  {activePaletteInfo.name}
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-3)]">
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                  Typography Preset
                </span>
                <p className="mt-1 font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-semibold capitalize text-[var(--text-primary)]">
                  {typography}
                </p>
              </div>
            </div>

            <div className="space-y-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
              <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-caps)] text-[var(--text-muted)]">
                Switch Palette Inside Sheet
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {PALETTE_PRESETS.map((preset) => (
                  <ActionButton
                    key={preset.id}
                    size="sm"
                    variant={palette === preset.id ? "primary" : "outline"}
                    onClick={() => setPalette(preset.id)}
                  >
                    {preset.name}
                  </ActionButton>
                ))}
              </div>
            </div>
          </div>
        </MotionDrawer>

        {/* Minimal Footer */}
        <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)] py-[var(--space-8)]">
          <div className="mx-auto flex max-w-[var(--container-ui)] flex-wrap items-center justify-between gap-[var(--space-4)] px-[var(--space-4)] text-[length:var(--text-xs)] text-[var(--text-secondary)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="flex items-center gap-[var(--space-2)]">
              <BookOpen className="h-3.5 w-3.5 text-[var(--text-muted)]" aria-hidden="true" />
              <span>UI Libary — Built with tokens/, primitives/, motion/react, and AGENTS.md</span>
            </div>
            <div className="flex items-center gap-[var(--space-4)] font-[family-name:var(--font-mono)]">
              <span className="inline-flex items-center gap-1">
                <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                registry.json (22)
              </span>
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                WCAG &gt;= 4.5:1
              </span>
              <span className="inline-flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Zero AI Slop
              </span>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
