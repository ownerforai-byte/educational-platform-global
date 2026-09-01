"use client";

import React, { useMemo } from "react";
import {
  TrendingUp, TrendingDown, Minus, CheckCircle2, XCircle,
  Pencil, Calendar, Eye, ChevronRight,
} from "lucide-react";
import { DateBadge } from "@/components/content/date-badge";
import type {
  SyllabusVersion,
  SubjectBiologyData,
} from "../data/biology";

/* ────────────────────────────────────────────────────────────
   Diff engine
   ──────────────────────────────────────────────────────────── */

function slugify(title: string) {
  return title.toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0900-\u097f]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export interface DiffResult {
  topicTitle: string;
  unitSlug: string;
  unitTitle: string;
  status: "added" | "removed" | "modified" | "unchanged";
  /** Original text (for removed/modified) */
  original?: string;
  /** New text (for added/modified) */
  revised?: string;
  /** Year when change occurred (BS) */
  year?: number;
}

export function diffVersions(
  older: SyllabusVersion,
  newer: SyllabusVersion,
): DiffResult[] {
  const olderBySlug = new Map<string, { title: string; unitSlug: string; unitTitle: string }>();
  for (const u of older.units) {
    for (const t of u.topics) {
      olderBySlug.set(slugify(t.title), {
        title: t.title,
        unitSlug: u.id,
        unitTitle: u.title,
      });
    }
  }
  const newerBySlug = new Map<string, { title: string; unitSlug: string; unitTitle: string }>();
  for (const u of newer.units) {
    for (const t of u.topics) {
      newerBySlug.set(slugify(t.title), {
        title: t.title,
        unitSlug: u.id,
        unitTitle: u.title,
      });
    }
  }

  const results: DiffResult[] = [];
  const allSlugs = new Set([...olderBySlug.keys(), ...newerBySlug.keys()]);
  for (const s of allSlugs) {
    const olderEntry = olderBySlug.get(s);
    const newerEntry = newerBySlug.get(s);
    if (!olderEntry && newerEntry) {
      results.push({
        topicTitle: newerEntry.title,
        unitSlug: newerEntry.unitSlug,
        unitTitle: newerEntry.unitTitle,
        status: "added",
        revised: newerEntry.title,
        year: newer.year,
      });
    } else if (olderEntry && !newerEntry) {
      results.push({
        topicTitle: olderEntry.title,
        unitSlug: olderEntry.unitSlug,
        unitTitle: olderEntry.unitTitle,
        status: "removed",
        original: olderEntry.title,
      });
    } else if (olderEntry && newerEntry && olderEntry.title !== newerEntry.title) {
      results.push({
        topicTitle: newerEntry.title,
        unitSlug: newerEntry.unitSlug,
        unitTitle: newerEntry.unitTitle,
        status: "modified",
        original: olderEntry.title,
        revised: newerEntry.title,
        year: newer.year,
      });
    }
  }
  return results;
}

/* ────────────────────────────────────────────────────────────
   UI components
   ──────────────────────────────────────────────────────────── */

const STATUS_CONFIG = {
  added: {
    label: "New",
    icon: TrendingUp,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  removed: {
    label: "Removed",
    icon: TrendingDown,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-500/10 text-red-700 dark:text-red-300",
  },
  modified: {
    label: "Modified",
    icon: Pencil,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  unchanged: {
    label: "Unchanged",
    icon: CheckCircle2,
    color: "text-slate-400 dark:text-slate-500",
    bg: "bg-slate-50 dark:bg-slate-900/30",
    border: "border-slate-200 dark:border-slate-800",
    badge: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
} as const;

function TopicDiffItem({ diff }: { diff: DiffResult }) {
  const cfg = STATUS_CONFIG[diff.status];
  const Icon = cfg.icon;
  return (
    <div className={`rounded-lg border ${cfg.border} ${cfg.bg} p-3 space-y-1.5`}>
      <div className="flex items-start gap-2">
        <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${cfg.color}`} />
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-medium ${cfg.color}`}>{cfg.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{diff.topicTitle}</p>
        </div>
        <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${cfg.badge}`}>
          {diff.year ? `${diff.year} BS` : ""}
        </span>
      </div>
      {diff.status === "modified" && (
        <div className="pl-6 space-y-1 text-xs">
          {diff.original && (
            <p className="text-muted-foreground/70 line-clamp-1">
              <span className="text-red-500 font-semibold mr-1">−</span>
              {diff.original.slice(0, 100)}{diff.original.length > 100 ? "…" : ""}
            </p>
          )}
          {diff.revised && (
            <p className="text-foreground line-clamp-1">
              <span className="text-emerald-500 font-semibold mr-1">+</span>
              {diff.revised.slice(0, 100)}{diff.revised.length > 100 ? "…" : ""}
            </p>
          )}
        </div>
      )}
      {diff.status === "added" && diff.revised && (
        <p className="pl-6 text-xs text-muted-foreground/80 line-clamp-1">
          <span className="text-emerald-500 font-semibold mr-1">+</span>
          {diff.revised.slice(0, 120)}
        </p>
      )}
      <div className="pl-6 flex items-center gap-2 text-[11px] text-muted-foreground">
        <span className="font-medium">{diff.unitTitle}</span>
        <span>·</span>
        <span className="font-mono">{diff.unitSlug}</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Comparison view
   ──────────────────────────────────────────────────────────── */

export function SyllabusVersionComparison({ data }: { data: SubjectBiologyData }) {
  const { versions } = data;
  const diffs = useMemo(() => {
    if (versions.length < 2) return null;
    const sorted = [...versions].sort((a, b) => a.year - b.year);
    const oldest = sorted[0];
    const newest = sorted[sorted.length - 1];
    return {
      older: oldest,
      newer: newest,
      changes: diffVersions(oldest, newest),
    };
  }, [versions]);

  if (!diffs || !diffs.changes) return null;

  const stats = {
    added: diffs.changes.filter((d) => d.status === "added").length,
    removed: diffs.changes.filter((d) => d.status === "removed").length,
    modified: diffs.changes.filter((d) => d.status === "modified").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="font-medium text-foreground">{diffs.older.year} BS</span>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">{diffs.newer.year} BS</span>
          <span className="text-muted-foreground mx-1">→</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
            {diffs.newer.isLatest ? "Latest" : ""}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 p-4 text-center">
          <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{stats.added}</p>
          <p className="text-xs text-emerald-600/80 dark:text-emerald-400/70">Added</p>
        </div>
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4 text-center">
          <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.removed}</p>
          <p className="text-xs text-red-600/80 dark:text-red-400/70">Removed</p>
        </div>
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4 text-center">
          <Pencil className="h-5 w-5 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
          <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{stats.modified}</p>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/70">Modified</p>
        </div>
      </div>

      {/* Notes */}
      {diffs.newer.notes && (
        <div className="rounded-xl border border-border bg-muted/40 p-4 flex items-start gap-3">
          <Eye className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Source Note</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{diffs.newer.notes}</p>
            <DateBadge label="Extracted from esikhcha.com" date={`${diffs.newer.year} BS`} tone="blue" />
          </div>
        </div>
      )}

      {/* Topic-level diffs */}
      <div className="space-y-4">
        {["added", "modified", "removed"].map((status) => {
          const items = diffs.changes.filter((d) => d.status === status);
          if (items.length === 0) return null;
          const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
          const Icon = cfg.icon;
          return (
            <div key={status}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`h-4 w-4 ${cfg.color}`} />
                <h3 className="text-sm font-semibold text-foreground">{cfg.label} Topics</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>
                  {items.length}
                </span>
              </div>
              <div className="grid gap-2">
                {items.map((diff, i) => (
                  <TopicDiffItem key={`${diff.unitSlug}-${i}`} diff={diff} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Version list (click to compare)
   ──────────────────────────────────────────────────────────── */

export function SyllabusVersionSelector({
  data,
  activeVersionYear,
  onSelect,
}: {
  data: SubjectBiologyData;
  activeVersionYear: number;
  onSelect: (year: number) => void;
}) {
  const sorted = [...data.versions].sort((a, b) => b.year - a.year);
  return (
    <div className="flex flex-wrap gap-2">
      {sorted.map((v) => (
        <button
          key={v.year}
          onClick={() => onSelect(v.year)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            v.year === activeVersionYear
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {v.year} BS
          {v.isLatest && (
            <span className="text-[10px] px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
              NEW
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Unit/topic renderer
   ──────────────────────────────────────────────────────────── */

export function SyllabusUnitView({
  unit,
  versionYear,
  diffs,
}: {
  unit: { id: string; title: string; hours: number; topics: { slug: string; title: string; hours?: number }[] };
  versionYear: number;
  diffs?: DiffResult[];
}) {
  const diffBySlug = new Map<string, DiffResult>();
  if (diffs) {
    for (const d of diffs) {
      if (d.unitSlug === unit.id) diffBySlug.set(d.topicTitle, d);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border/60 bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{unit.title}</span>
          {unit.hours !== undefined && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {unit.hours} hrs
            </span>
          )}
        </div>
        <span className="text-[11px] font-mono text-muted-foreground/60">{unit.id}</span>
      </div>
      <div className="divide-y divide-border/40">
        {unit.topics.map((topic, i) => {
          const diff = diffBySlug.get(topic.title);
          const diffCfg = diff ? STATUS_CONFIG[diff.status] : null;
          const DiffIcon = diffCfg?.icon;
          return (
            <div
              key={i}
              className={`px-4 py-2.5 flex items-start gap-3 text-sm transition-colors ${
                diffCfg ? diffCfg.bg : ""
              }`}
            >
              {diffCfg && DiffIcon && (
                <DiffIcon className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${diffCfg.color}`} />
              )}
              <div className="min-w-0 flex-1">
                <p className={`leading-relaxed ${diff?.status === "removed" ? "line-through opacity-50" : ""}`}>
                  {topic.title}
                </p>
                {topic.hours !== undefined && (
                  <p className="text-xs text-muted-foreground mt-0.5">{topic.hours} hrs</p>
                )}
              </div>
              {diffCfg && (
                <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${diffCfg.badge}`}>
                  {diffCfg.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
