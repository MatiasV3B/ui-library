import * as React from "react";
import { MotionConfig, motion, useTransform, type MotionValue } from "motion/react";
import {
  Activity,
  BookOpen,
  Check,
  Code2,
  Compass,
  FolderTree,
  Gauge,
  Github,
  Layers,
  Lock,
  Moon,
  Palette,
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
import { TACTILE_SPRING } from "../../components/motion/motion-tokens";

import { SegmentedControl } from "../../components/21st-dev/SegmentedControl";
import { ActionSearchBar } from "../../components/21st-dev/ActionSearchBar";
import { FileTree } from "../../components/21st-dev/FileTree";
import { ScrollProgress } from "../../components/21st-dev/ScrollProgress";
import { PricingSelector } from "../../components/21st-dev/PricingSelector";
import {
  KpiMetricCard,
  KpiMetricCardError,
  KpiMetricCardSkeleton,
} from "../../components/data-viz/KpiMetricCard";
import { EmptyState, SkeletonBlock } from "../../components/feedback/StateNotice";

import { HeroEditorial } from "../../patterns/hero-editorial/HeroEditorial";
import { DashboardShell } from "../../patterns/dashboard-shell/DashboardShell";
import { AuthMinimal } from "../../patterns/auth-minimal/AuthMinimal";

import {
  AUDIT_CHECKLIST,
  COLOR_SWATCHES,
  FILE_DESCRIPTIONS,
  PRICING_TIERS,
  REGISTRY_ACTIONS,
  REPO_TREE_NODES,
  SHOWCASE_CHAPTERS,
} from "./data/showcase-data";

type ThemeMode = "light" | "dark";
type TypographyMode = "technical" | "editorial" | "geometric";

function StickyStageVisual({ progress }: { progress: MotionValue<number> }) {
  const tokenScale = useTransform(progress, [0, 0.35, 1], [0.96, 1, 1]);
  const barWidthA = useTransform(progress, [0, 0.5, 1], [0.65, 0.92, 0.88]);
  const barWidthB = useTransform(progress, [0, 0.5, 1], [0.42, 0.78, 0.95]);
  const barWidthC = useTransform(progress, [0, 0.5, 1], [0.82, 0.58, 0.9]);

  return (
    <motion.div
      style={{ scale: tokenScale }}
      className="flex h-full w-full flex-col justify-between bg-[var(--surface-sunken)] p-[var(--space-6)] sm:p-[var(--space-8)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-[var(--space-4)]">
        <div className="space-y-1">
          <span className="font-[var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
            Runtime Telemetry
          </span>
          <p className="font-[var(--font-display)] text-[var(--text-xl)] font-semibold text-[var(--text-primary)]">
            Live Token &amp; GPU Surface Stage
          </p>
        </div>
        <span className="rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] py-[var(--space-1)] font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-secondary)]">
          60 fps
        </span>
      </div>

      <div className="my-auto grid grid-cols-1 gap-[var(--space-4)] py-[var(--space-6)] sm:grid-cols-2">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-4)]">
          <p className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
            Tactile Control Spring
          </p>
          <p className="mt-1 tabular-nums font-[var(--font-mono)] text-[var(--text-lg)] font-semibold text-[var(--text-primary)]">
            380 / 32 / 0.8
          </p>
          <div className="mt-[var(--space-3)] h-2 w-full overflow-hidden rounded-[var(--radius-pill)] bg-[var(--surface-sunken)]">
            <motion.div
              style={{ scaleX: barWidthA }}
              className="h-full origin-left bg-[var(--accent-primary)]"
            />
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-4)]">
          <p className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
            Fluid Expansion Spring
          </p>
          <p className="mt-1 tabular-nums font-[var(--font-mono)] text-[var(--text-lg)] font-semibold text-[var(--text-primary)]">
            240 / 28 / 1.0
          </p>
          <div className="mt-[var(--space-3)] h-2 w-full overflow-hidden rounded-[var(--radius-pill)] bg-[var(--surface-sunken)]">
            <motion.div
              style={{ scaleX: barWidthB }}
              className="h-full origin-left bg-[var(--text-primary)]"
            />
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-4)] sm:col-span-2">
          <div className="flex items-center justify-between">
            <span className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
              WCAG Primary Contrast &amp; GPU Budget
            </span>
            <span className="tabular-nums font-[var(--font-mono)] text-[var(--text-xs)] font-semibold text-[var(--status-success)]">
              PASS · transform + opacity + clip-path
            </span>
          </div>
          <div className="mt-[var(--space-3)] h-2 w-full overflow-hidden rounded-[var(--radius-pill)] bg-[var(--surface-sunken)]">
            <motion.div
              style={{ scaleX: barWidthC }}
              className="h-full origin-left bg-[var(--status-success)]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-[var(--space-4)] font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
        <span>tokens/spacing-motion.css</span>
        <span className="tabular-nums">cubic-bezier(0.22, 1, 0.36, 1)</span>
      </div>
    </motion.div>
  );
}

export function App() {
  const [theme, setTheme] = React.useState<ThemeMode>("light");
  const [typography, setTypography] =
    React.useState<TypographyMode>("technical");

  const [selectedFileId, setSelectedFileId] = React.useState("comp-tabs");
  const [tabsVariant, setTabsVariant] = React.useState<"tabs" | "dock">("tabs");
  const [panelState, setPanelState] = React.useState<
    "default" | "loading" | "empty" | "error"
  >("default");

  const [showCardSkeleton, setShowCardSkeleton] = React.useState(false);
  const [kpiState, setKpiState] = React.useState<"live" | "loading" | "error">(
    "live"
  );
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
    document.documentElement.setAttribute("data-typography", typography);
  }, [typography]);

  const activeFileInfo =
    FILE_DESCRIPTIONS[selectedFileId] ?? FILE_DESCRIPTIONS["comp-tabs"];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--surface-canvas)] text-[var(--text-primary)] font-[var(--font-sans)]">
        <ScrollProgress />

        {/* Sticky Top Utility Bar */}
        <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--surface-canvas)]">
          <div className="mx-auto flex max-w-[var(--container-ui)] flex-wrap items-center justify-between gap-[var(--space-4)] px-[var(--space-4)] py-[var(--space-3)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="flex items-center gap-[var(--space-6)]">
              <a
                href="#"
                className="flex items-center gap-[var(--space-2)] rounded-[var(--radius-sm)] font-semibold tracking-[var(--tracking-tight)] text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
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
                className="hidden items-center gap-[var(--space-5)] text-[var(--text-sm)] text-[var(--text-secondary)] md:flex"
              >
                <a
                  href="#architecture"
                  className="hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-xs)]"
                >
                  Architecture
                </a>
                <a
                  href="#motion"
                  className="hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-xs)]"
                >
                  Motion
                </a>
                <a
                  href="#components"
                  className="hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-xs)]"
                >
                  Components
                </a>
                <a
                  href="#patterns"
                  className="hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-xs)]"
                >
                  Patterns
                </a>
                <a
                  href="#tokens"
                  className="hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] rounded-[var(--radius-xs)]"
                >
                  Tokens
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-[var(--space-3)]">
              <div className="hidden sm:block">
                <SegmentedControl
                  ariaLabel="Typography pairing"
                  value={typography}
                  onValueChange={setTypography}
                  options={[
                    { value: "technical", label: "Technical" },
                    { value: "editorial", label: "Editorial" },
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
                className="inline-flex h-8 items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] text-[var(--text-xs)] font-medium text-[var(--text-primary)] hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
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
                className="inline-flex h-8 items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] text-[var(--text-xs)] font-medium text-[var(--text-primary)] hover:bg-[var(--surface-interactive)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">GitHub</span>
              </motion.a>
            </div>
          </div>
        </header>

        {/* Asymmetric Editorial Hero */}
        <HeroEditorial
          eyebrow="Design Engineering System · v0.2"
          headline="Precision UI without statistical AI slop."
          summary="A four-layer registry of semantic CSS tokens, accessible primitives, Apple-calibrated motion/react components, and anti-slop rules built to keep Claude Code, Codex, and Antigravity aligned."
          primaryAction={{ label: "Explore live components", href: "#motion" }}
          secondaryAction={{ label: "How agents sync", href: "#architecture" }}
          specs={[
            { label: "Architecture", value: "4 Layers" },
            { label: "Tactile Spring", value: "380 / 32 / 0.8" },
            { label: "Primary Contrast", value: "17.5 : 1" },
          ]}
          artifact={
            <div className="space-y-[var(--space-4)] rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
              <div className="flex items-center justify-between gap-[var(--space-3)] px-[var(--space-1)]">
                <span className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--text-muted)]">
                  Interactive Repository Map
                </span>
                <span className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--accent-primary)]">
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

                <div className="flex flex-col justify-between rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-4)] sm:col-span-5">
                  <div className="space-y-[var(--space-2)]">
                    <span className="font-[var(--font-mono)] text-[11px] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                      File Specification
                    </span>
                    <h2 className="font-[var(--font-display)] text-[var(--text-base)] font-semibold text-[var(--text-primary)]">
                      {activeFileInfo?.title}
                    </h2>
                    <p className="text-[var(--text-xs)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                      {activeFileInfo?.summary}
                    </p>
                  </div>

                  <div className="mt-[var(--space-4)] border-t border-[var(--border-subtle)] pt-[var(--space-3)] font-[var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                    Indexed in registry.json
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
            <div className="grid grid-cols-1 gap-[var(--space-8)] lg:grid-cols-12">
              <div className="space-y-[var(--space-3)] lg:col-span-5">
                <span className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                  01 · How It Works
                </span>
                <h2 className="font-[var(--font-display)] text-[var(--text-3xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]">
                  One source of truth across Claude, Codex, and Antigravity.
                </h2>
                <p className="max-w-[52ch] text-[var(--text-base)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                  Before an agent generates a single line of JSX, it reads{" "}
                  <code className="font-[var(--font-mono)] text-[var(--text-sm)] text-[var(--text-primary)]">
                    AGENTS.md
                  </code>{" "}
                  and{" "}
                  <code className="font-[var(--font-mono)] text-[var(--text-sm)] text-[var(--text-primary)]">
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
                      <p className="text-[var(--text-sm)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
                        Keep rules unified in <code className="font-[var(--font-mono)]">AGENTS.md</code> for Codex, mirror or symlink to <code className="font-[var(--font-mono)]">CLAUDE.md</code> for Claude Code, and enforce pre-flight reading via Antigravity&apos;s <code className="font-[var(--font-mono)]">SKILL.md</code>.
                      </p>
                      <pre className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)] font-[var(--font-mono)] text-[var(--text-xs)] leading-[var(--leading-relaxed)] text-[var(--text-primary)]">
{`# Sync Claude Code with AGENTS.md
ln -s AGENTS.md CLAUDE.md

# Antigravity pre-flight skill path
.agent/skills/ui-libary/SKILL.md -> AGENTS.md + registry.json + guidelines/`}
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
                          desc: "Motion blocks, curated 21st.dev pieces, KPI cards, and feedback notices.",
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
                          <p className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold text-[var(--accent-primary)]">
                            {item.layer}
                          </p>
                          <p className="mt-1 text-[var(--text-xs)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
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
                      <p className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-secondary)]">
                        {selectedActionMsg}
                      </p>
                    </div>
                  </TactileTabsContent>
                </TactileTabs>
              </div>
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
                <span className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                  02 · Motion Primitives
                </span>
                <h2 className="font-[var(--font-display)] text-[var(--text-3xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]">
                  Tactile springs, spatial continuity, and real states.
                </h2>
              </div>
              <p className="max-w-[44ch] text-[var(--text-sm)] text-[var(--text-secondary)]">
                Every control animates composited GPU properties only and wraps root trees in{" "}
                <code className="font-[var(--font-mono)]">MotionConfig reducedMotion=&quot;user&quot;</code>.
              </p>
            </div>

            {/* TactileTabs Interactive Lab */}
            <SurfaceCard>
              <SurfaceCardHeader className="border-b border-[var(--border-subtle)] sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <SurfaceCardTitle>TactileTabs &amp; Dock</SurfaceCardTitle>
                  <SurfaceCardDescription>
                    Shared <code className="font-[var(--font-mono)]">layoutId</code> pill with spring{" "}
                    <code className="font-[var(--font-mono)]">380 / 32 / 0.8</code>, WAI-ARIA arrow navigation, and complete state primitives.
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
                          <span className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
                            Controls &amp; Tabs
                          </span>
                          <p className="tabular-nums font-[var(--font-mono)] text-[var(--text-base)] font-semibold">
                            stiffness: 380 · damping: 32
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
                            Panels &amp; Cards
                          </span>
                          <p className="tabular-nums font-[var(--font-mono)] text-[var(--text-base)] font-semibold">
                            stiffness: 240 · damping: 28
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
                            Fixed Opacity Curve
                          </span>
                          <p className="tabular-nums font-[var(--font-mono)] text-[var(--text-base)] font-semibold">
                            (0.22, 1, 0.36, 1)
                          </p>
                        </div>
                      </div>
                    )}
                  </TactileTabsContent>

                  <TactileTabsContent value="keyboard">
                    <p className="max-w-[64ch] text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                      Focus any tab trigger and press <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] px-1.5 py-0.5 font-[var(--font-mono)] text-[var(--text-xs)]">ArrowRight</kbd>,{" "}
                      <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] px-1.5 py-0.5 font-[var(--font-mono)] text-[var(--text-xs)]">ArrowLeft</kbd>,{" "}
                      <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] px-1.5 py-0.5 font-[var(--font-mono)] text-[var(--text-xs)]">Home</kbd>, or{" "}
                      <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] px-1.5 py-0.5 font-[var(--font-mono)] text-[var(--text-xs)]">End</kbd>. Roving{" "}
                      <code className="font-[var(--font-mono)]">tabIndex</code> updates automatically alongside <code className="font-[var(--font-mono)]">aria-selected</code>.
                    </p>
                  </TactileTabsContent>

                  <TactileTabsContent value="gpu">
                    <p className="max-w-[64ch] text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                      Exiting panels use <code className="font-[var(--font-mono)]">AnimatePresence mode=&quot;popLayout&quot;</code> and animate strictly on <code className="font-[var(--font-mono)]">opacity</code> and <code className="font-[var(--font-mono)]">transform</code>, avoiding layout recalculations.
                    </p>
                  </TactileTabsContent>
                </TactileTabs>
              </SurfaceCardContent>
            </SurfaceCard>

            {/* App Store Expandable Card Gallery */}
            <div className="space-y-[var(--space-5)]">
              <div className="flex flex-wrap items-center justify-between gap-[var(--space-4)]">
                <div className="space-y-1">
                  <h3 className="font-[var(--font-display)] text-[var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)]">
                    AppStoreCard (Expandable Spatial Continuity)
                  </h3>
                  <p className="text-[var(--text-sm)] text-[var(--text-secondary)]">
                    Click either card to expand with shared <code className="font-[var(--font-mono)]">layoutId</code>, press <kbd className="rounded-[var(--radius-xs)] border border-[var(--border-default)] px-1.5 py-0.5 font-[var(--font-mono)] text-[var(--text-xs)]">Esc</kbd> or drag down to dismiss.
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
                        <AppStoreCardMedia className="aspect-[16/9] border-b border-[var(--border-subtle)] p-[var(--space-6)] flex flex-col justify-between bg-[var(--surface-sunken)]">
                          <div className="flex items-center justify-between font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
                            <span>components/motion/AppStoreCard.tsx</span>
                            <span className="tabular-nums">240 / 28</span>
                          </div>
                          <div className="grid grid-cols-3 gap-[var(--space-3)] pt-[var(--space-4)]">
                            <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-3)]">
                              <span className="font-[var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                                Shell
                              </span>
                              <p className="mt-1 font-[var(--font-mono)] text-[var(--text-xs)] font-semibold">
                                layoutId
                              </p>
                            </div>
                            <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-3)]">
                              <span className="font-[var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                                Exit
                              </span>
                              <p className="mt-1 font-[var(--font-mono)] text-[var(--text-xs)] font-semibold">
                                popLayout
                              </p>
                            </div>
                            <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-elevated)] p-[var(--space-3)]">
                              <span className="font-[var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                                Gesture
                              </span>
                              <p className="mt-1 font-[var(--font-mono)] text-[var(--text-xs)] font-semibold">
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
                            <span className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
                              FLUID_SPRING · stiffness: 240 · damping: 28 · dragElastic: 0.28
                            </span>
                          </div>
                        }
                      >
                        <p className="text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                          Rather than mounting an unrelated modal over the viewport, <code className="font-[var(--font-mono)] text-[var(--text-primary)]">AppStoreCard</code> pairs a scoped <code className="font-[var(--font-mono)] text-[var(--text-primary)]">LayoutGroup</code> with four synchronized <code className="font-[var(--font-mono)] text-[var(--text-primary)]">layoutId</code> anchors.
                        </p>
                        <div className="grid grid-cols-1 gap-[var(--space-3)] sm:grid-cols-2">
                          <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
                            <p className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold text-[var(--text-primary)]">
                              Focus Restoration
                            </p>
                            <p className="mt-1 text-[var(--text-xs)] text-[var(--text-secondary)]">
                              Opening moves focus to the close button; pressing Escape or dragging down returns focus to the originating card trigger.
                            </p>
                          </div>
                          <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-[var(--space-4)]">
                            <p className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold text-[var(--text-primary)]">
                              Inertia Drag Dismissal
                            </p>
                            <p className="mt-1 text-[var(--text-xs)] text-[var(--text-secondary)]">
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
                        <AppStoreCardMedia className="aspect-[16/10] border-b border-[var(--border-subtle)] p-[var(--space-5)] flex items-end bg-[var(--surface-sunken)]">
                          <div className="w-full space-y-2">
                            <div className="flex justify-between font-[var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                              <span>--accent-primary</span>
                              <span className="tabular-nums">6.70 : 1</span>
                            </div>
                            <div className="h-2 w-full rounded-[var(--radius-pill)] bg-[var(--accent-primary)]" />
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
                        <p className="text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                          Every view uses one neutral base, three tonal elevations (<code className="font-[var(--font-mono)]">--surface-canvas</code>, <code className="font-[var(--font-mono)]">--surface-sunken</code>, <code className="font-[var(--font-mono)]">--surface-elevated</code>), and one primary accent reserved for active intent.
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
          cta={{ label: "Inspect token palette", href: "#tokens" }}
          renderVisual={(progress) => <StickyStageVisual progress={progress} />}
        />

        {/* Section 3: Curated 21st.dev, Data-Viz & Patterns */}
        <section
          id="components"
          className="border-t border-b border-[var(--border-subtle)] py-[var(--space-16)]"
        >
          <div className="mx-auto max-w-[var(--container-ui)] space-y-[var(--space-12)] px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="space-y-[var(--space-2)]">
              <span className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                03 · Curated 21st.dev &amp; Data-Viz
              </span>
              <h2 className="font-[var(--font-display)] text-[var(--text-3xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]">
                Filtered components stripped of neon slop.
              </h2>
              <p className="max-w-[60ch] text-[var(--text-base)] text-[var(--text-secondary)]">
                Raw community snippets are audited, refactored to TypeScript, wired to <code className="font-[var(--font-mono)]">tokens/</code>, and upgraded with keyboard support and real loading/error states.
              </p>
            </div>

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
                  <p className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-[var(--space-3)] py-[var(--space-2)] font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-primary)]">
                    {selectedPlanMsg}
                  </p>
                ) : null}
              </div>

              <div className="space-y-[var(--space-6)] lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-[var(--space-3)]">
                  <div>
                    <h3 className="font-[var(--font-display)] text-[var(--text-xl)] font-semibold">
                      KpiMetricCard &amp; Feedback Primitives
                    </h3>
                    <p className="text-[var(--text-xs)] text-[var(--text-secondary)]">
                      Right-aligned <code className="font-[var(--font-mono)]">tabular-nums</code> metrics with explicit skeleton and error states.
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
                      value="17"
                      delta="+14 blocks"
                      trend="positive"
                      period="v0.2.0"
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

            {/* Patterns Interactive Preview */}
            <div id="patterns" className="space-y-[var(--space-6)] pt-[var(--space-6)]">
              <div className="flex flex-wrap items-center justify-between gap-[var(--space-4)]">
                <div className="space-y-1">
                  <span className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                    Layer 3 · Patterns
                  </span>
                  <h3 className="font-[var(--font-display)] text-[var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)]">
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
                      badge: 17,
                    },
                    {
                      id: "audit",
                      label: "Slop Audit",
                      icon: <ShieldCheck className="h-4 w-4" />,
                    },
                  ]}
                  headerActions={
                    <>
                      <span className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-secondary)]">
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
                    <h4 className="font-[var(--font-display)] text-[var(--text-lg)] font-semibold">
                      Active View: {dashNav}
                    </h4>
                    <p className="max-w-[56ch] text-[var(--text-sm)] text-[var(--text-secondary)]">
                      Sidebar items share a <code className="font-[var(--font-mono)]">layoutId</code> indicator on <code className="font-[var(--font-mono)]">TACTILE_SPRING</code> and align badge counts using <code className="font-[var(--font-mono)]">tabular-nums</code>.
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

        {/* Section 4: Tokens & Anti-Slop Audit Reference */}
        <section id="tokens" className="py-[var(--space-16)]">
          <div className="mx-auto max-w-[var(--container-ui)] space-y-[var(--space-12)] px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="grid grid-cols-1 gap-[var(--space-8)] lg:grid-cols-12">
              {/* Semantic Color Swatches */}
              <div className="space-y-[var(--space-5)] lg:col-span-6">
                <div className="flex items-center gap-[var(--space-2)] text-[var(--accent-primary)]">
                  <Palette className="h-4 w-4" aria-hidden="true" />
                  <span className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)]">
                    04 · Semantic Tokens
                  </span>
                </div>
                <h2 className="font-[var(--font-display)] text-[var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)]">
                  Color Palette ({theme === "light" ? "Light Mode" : "Dark Mode"})
                </h2>

                <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-elevated)]">
                  {COLOR_SWATCHES.map((swatch) => (
                    <div
                      key={swatch.token}
                      className="flex items-center justify-between gap-[var(--space-4)] border-b border-[var(--border-subtle)] px-[var(--space-4)] py-[var(--space-3)] last:border-b-0"
                    >
                      <div className="flex items-center gap-[var(--space-3)]">
                        <span
                          aria-hidden="true"
                          className="h-7 w-7 shrink-0 rounded-[var(--radius-sm)] border border-[var(--border-default)]"
                          style={{ backgroundColor: `var(${swatch.token})` }}
                        />
                        <div>
                          <p className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold text-[var(--text-primary)]">
                            {swatch.token}
                          </p>
                          <p className="text-[var(--text-xs)] text-[var(--text-muted)]">
                            {swatch.role}
                          </p>
                        </div>
                      </div>
                      <span className="tabular-nums font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-secondary)]">
                        {theme === "light" ? swatch.light : swatch.dark}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography Pairing Live Specimen */}
              <div className="space-y-[var(--space-5)] lg:col-span-6">
                <div className="flex items-center justify-between gap-[var(--space-3)]">
                  <div className="flex items-center gap-[var(--space-2)] text-[var(--accent-primary)]">
                    <Type className="h-4 w-4" aria-hidden="true" />
                    <span className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)]">
                      Typography Pairings
                    </span>
                  </div>
                  <SegmentedControl
                    ariaLabel="Typography specimen selector"
                    value={typography}
                    onValueChange={setTypography}
                    options={[
                      { value: "technical", label: "Technical" },
                      { value: "editorial", label: "Editorial" },
                      { value: "geometric", label: "Geometric" },
                    ]}
                  />
                </div>

                <SurfaceCard>
                  <SurfaceCardContent className="space-y-[var(--space-4)] pt-[var(--space-6)]">
                    <p className="font-[var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                      Active Preset · data-typography=&quot;{typography}&quot;
                    </p>
                    <p className="font-[var(--font-display)] text-[var(--text-3xl)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]">
                      Intentional hierarchy through scale, weight, and tracking.
                    </p>
                    <p className="text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
                      Defaulting to Inter or Geist without review is prohibited. Pair <code className="font-[var(--font-mono)]">Newsreader</code>, <code className="font-[var(--font-mono)]">IBM Plex Sans</code>, or <code className="font-[var(--font-mono)]">Plus Jakarta Sans</code> with <code className="font-[var(--font-mono)]">IBM Plex Mono</code> for technical metadata and <code className="font-[var(--font-mono)]">.tabular-nums</code>.
                    </p>
                  </SurfaceCardContent>
                  <SurfaceCardFooter className="font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--text-muted)]">
                    <span>tokens/typography.css</span>
                    <span className="tabular-nums">0123456789 · tabular-nums</span>
                  </SurfaceCardFooter>
                </SurfaceCard>
              </div>
            </div>

            {/* Section 4 Mandatory Audit */}
            <div className="space-y-[var(--space-5)] border-t border-[var(--border-subtle)] pt-[var(--space-10)]">
              <div className="flex flex-wrap items-center justify-between gap-[var(--space-4)]">
                <div className="space-y-1">
                  <span className="font-[var(--font-mono)] text-[var(--text-xs)] font-semibold uppercase tracking-[var(--tracking-caps)] text-[var(--accent-primary)]">
                    Mandatory Pre-Delivery Gate
                  </span>
                  <h2 className="font-[var(--font-display)] text-[var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)]">
                    Section 4 Audit Checklist (AGENTS.md)
                  </h2>
                </div>
                <span className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--surface-elevated)] px-[var(--space-3)] py-[var(--space-1)] font-[var(--font-mono)] text-[var(--text-xs)] text-[var(--status-success)]">
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
                      <span className="tabular-nums font-[var(--font-mono)] text-[var(--text-xs)] font-semibold text-[var(--accent-primary)]">
                        0{idx + 1}
                      </span>
                      <h3 className="text-[var(--text-sm)] font-semibold text-[var(--text-primary)]">
                        {item.question}
                      </h3>
                    </div>
                    <p className="text-[var(--text-xs)] leading-[var(--leading-normal)] text-[var(--text-secondary)]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-sunken)] py-[var(--space-8)]">
          <div className="mx-auto flex max-w-[var(--container-ui)] flex-wrap items-center justify-between gap-[var(--space-4)] px-[var(--space-4)] text-[var(--text-xs)] text-[var(--text-secondary)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
            <div className="flex items-center gap-[var(--space-2)]">
              <BookOpen className="h-3.5 w-3.5 text-[var(--text-muted)]" aria-hidden="true" />
              <span>UI Libary — Built with tokens/, primitives/, motion/react, and AGENTS.md</span>
            </div>
            <div className="flex items-center gap-[var(--space-4)] font-[var(--font-mono)]">
              <span className="inline-flex items-center gap-1">
                <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                registry.json
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
