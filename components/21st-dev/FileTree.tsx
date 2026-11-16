"use client";

import * as React from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";
import { APPLE_FADE_TRANSITION, TACTILE_SPRING } from "../motion/motion-tokens";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export interface FileTreeNode {
  id: string;
  name: string;
  type: "dir" | "file";
  meta?: string;
  children?: readonly FileTreeNode[];
}

export interface FileTreeProps {
  nodes: readonly FileTreeNode[];
  selectedId?: string;
  onSelectFile?: (node: FileTreeNode) => void;
  defaultExpandedIds?: readonly string[];
  className?: string;
}

interface TreeRowProps {
  node: FileTreeNode;
  depth: number;
  expandedIds: Set<string>;
  toggleDir: (id: string) => void;
  selectedId?: string;
  onSelectFile?: (node: FileTreeNode) => void;
  reducedMotion: boolean;
}

function TreeRow({
  node,
  depth,
  expandedIds,
  toggleDir,
  selectedId,
  onSelectFile,
  reducedMotion,
}: TreeRowProps) {
  const isOpen = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const indentPx = depth * 16 + 8;

  if (node.type === "file") {
    return (
      <motion.button
        type="button"
        whileTap={reducedMotion ? undefined : { scale: 0.985 }}
        transition={TACTILE_SPRING}
        onClick={() => onSelectFile?.(node)}
        style={{ paddingLeft: `${indentPx}px` }}
        className={cx(
          "flex w-full items-center justify-between gap-[var(--space-2)] rounded-[var(--radius-sm)] pr-[var(--space-2)] py-[var(--space-1)] text-left text-[var(--text-xs)]",
          "transition-colors duration-[var(--duration-fast)]",
          isSelected
            ? "bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] font-medium"
            : "text-[var(--text-secondary)] hover:bg-[var(--surface-interactive)] hover:text-[var(--text-primary)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        )}
      >
        <span className="flex items-center gap-[var(--space-2)] truncate">
          <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate font-[var(--font-mono)]">{node.name}</span>
        </span>
        {node.meta ? (
          <span className="shrink-0 font-[var(--font-mono)] text-[11px] text-[var(--text-muted)]">
            {node.meta}
          </span>
        ) : null}
      </motion.button>
    );
  }

  return (
    <div>
      <motion.button
        type="button"
        aria-expanded={isOpen}
        whileTap={reducedMotion ? undefined : { scale: 0.985 }}
        transition={TACTILE_SPRING}
        onClick={() => toggleDir(node.id)}
        style={{ paddingLeft: `${indentPx}px` }}
        className={cx(
          "flex w-full items-center gap-[var(--space-2)] rounded-[var(--radius-sm)] pr-[var(--space-2)] py-[var(--space-1)] text-left text-[var(--text-xs)] font-medium text-[var(--text-primary)]",
          "transition-colors duration-[var(--duration-fast)] hover:bg-[var(--surface-interactive)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
        )}
      >
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={reducedMotion ? { duration: 0 } : TACTILE_SPRING}
          className="inline-flex shrink-0 text-[var(--text-muted)]"
        >
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </motion.span>
        {isOpen ? (
          <FolderOpen
            className="h-3.5 w-3.5 shrink-0 text-[var(--accent-primary)]"
            aria-hidden="true"
          />
        ) : (
          <Folder
            className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]"
            aria-hidden="true"
          />
        )}
        <span className="truncate font-[var(--font-mono)]">{node.name}</span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && node.children && node.children.length > 0 ? (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -2 }}
            transition={
              reducedMotion ? { duration: 0 } : APPLE_FADE_TRANSITION
            }
            className="space-y-0.5"
          >
            {node.children.map((child) => (
              <TreeRow
                key={child.id}
                node={child}
                depth={depth + 1}
                expandedIds={expandedIds}
                toggleDir={toggleDir}
                selectedId={selectedId}
                onSelectFile={onSelectFile}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FileTree({
  nodes,
  selectedId,
  onSelectFile,
  defaultExpandedIds = [],
  className,
}: FileTreeProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () => new Set(defaultExpandedIds)
  );
  const shouldReduceMotion = Boolean(useReducedMotion());

  const toggleDir = React.useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <nav
        aria-label="Repository file structure"
        className={cx(
          "w-full rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[var(--space-3)] font-[var(--font-sans)] shadow-[var(--shadow-hairline)]",
          className
        )}
      >
        <div className="space-y-0.5">
          {nodes.map((node) => (
            <TreeRow
              key={node.id}
              node={node}
              depth={0}
              expandedIds={expandedIds}
              toggleDir={toggleDir}
              selectedId={selectedId}
              onSelectFile={onSelectFile}
              reducedMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </nav>
    </MotionConfig>
  );
}
