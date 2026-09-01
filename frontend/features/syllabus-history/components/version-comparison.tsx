"use client";

import React, { useMemo } from "react";
import { TrendingUp, TrendingDown, Pencil, ChevronRight } from "lucide-react";
import { DateBadge } from "@/components/content/date-badge";
import type { SyllabusSubjectData, SyllabusVersion } from "../data";

/* ────────────────────────────────────────────────────────────
   Diff engine — generic over any SyllabusSubjectData
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
  status: "added" | "removed" | "modified";
  original?: string;
  revised?: string;
  year?: number;
}

export function diffVersions(older: SyllabusVersion, newer: SyllabusVersion): DiffResult[] {
  const buildIndex = (v: SyllabusVersion) =>
    new Map<string, { title: string; unitSlug: string; unitTitle: string }>(
      v.units.flatMap((u) =>
        u.topics.map((t) => [slugify(t.title), { title: t.title, unitSlug: u.id, unitTitle: u.title }] as const),
      ),
    );

  const olderIdx = buildIndex(older);
  const newerIdx = buildIndex(newer);
  const results: DiffResult[] = [];

  for (const s of new Set([...olderIdx.keys(), ...newerIdx.keys()])) {
    const o = olderIdx.get(s);
    const n = newerIdx.get(s);
    if (!o && n) {
      results.push({ topicTitle: n.title, unitSlug: n.unitSlug, unitTitle: n.unitTitle, status: "added", revised: n.title, year: newer.year });
    } else if (o && !n) {
      results.push({ topicTitle: o.title, unitSlug: o.unitSlug, unitTitle: o.unitTitle, status: "removed", original: o.title });
    } else if (o && n && o.title !== n.title) {
      results.push({ topicTitle: n.title, unitSlug: n.unitSlug, unitTitle: n.unitTitle, status: "modified", original: o.title, revised: n.title, year: newer.year });
    }
  }
  return results;
}

/**
 * Multi-year timeline diffs: for every consecutive pair of versions,
 * produces a list of { year, diffs } entries sorted chronologically.
 */
export function diffTimeline(data: SyllabusSubjectData): Array<{ year: number; bsYear: string; diffs: DiffResult[]; notes?: string }> {
  const sorted = [...data.versions].sort((a, b) => a.year - b.year);
  const timeline: Array<{ year: number; bsYear: string; diffs: DiffResult[]; notes?: string }> = [];
  for (let i = 1; i < sorted.length; i++) {
    const older = sorted[i - 1];
    const newer = sorted[i];
    const changes = diffVersions(older, newer);
    if (changes.length > 0) {
      timeline.push({ year: newer.year, bsYear: newer.bsYear, diffs: changes, notes: newer.notes });
    }
  }
  return timeline;
}

/* ────────────────────────────────────────────────────────────
   Topic-level badge renderer
   ──────────────────────────────────────────────────────────── */

const STYLE: Record<DiffResult["status"], { icon: React.ElementType; color: string; bg: string; border: string; badge: string }> = {
  added:    { icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800", badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  removed:  { icon: TrendingDown, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-800", badge: "bg-red-500/10 text-red-700 dark:text-red-300" },
  modified: { icon: Pencil, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800", badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
};

function TopicBadge({ diff }: { diff: DiffResult }) {
  const s = STYLE[diff.status];
  const IconMap = { added: TrendingUp, removed: TrendingDown, modified: Pencil } as const;
  const IconComp = IconMap[diff.status];
  return (
    <div className={`rounded-lg border ${s.border} ${s.bg} p-3 space-y-1`}>
      <div className="flex items-start gap-2">
        <div className={`h-4 w-4 shrink-0 mt-0.5 ${s.color}`}>
          <IconComp className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-medium ${s.color}`}>{diff.status === "added" ? "Added" : diff.status === "removed" ? "Removed" : "Modified"}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{diff.topicTitle}</p>
        </div>
        {diff.year && (
          <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${s.badge}`}>
            {diff.year} BS
          </span>
        )}
      </div>
      {diff.status === "modified" && (
        <div className="pl-6 space-y-1 text-xs">
          {diff.original && (
            <p className="text-muted-foreground/70 line-clamp-1">
              <span className="text-red-500 font-semibold mr-1">−</span>
              {diff.original.slice(0, 120)}{diff.original.length > 120 ? "…" : ""}
            </p>
          )}
          {diff.revised && (
            <p className="text-foreground line-clamp-1">
              <span className="text-emerald-500 font-semibold mr-1">+</span>
              {diff.revised.slice(0, 120)}{diff.revised.length > 120 ? "…" : ""}
            </p>
          )}
        </div>
      )}
      <div className="pl-6 text-[11px] text-muted-foreground font-mono">{diff.unitSlug}</div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Multi-year timeline viewer
   ──────────────────────────────────────────────────────────── */

export function SyllabusTimeline({ data }: { data: SyllabusSubjectData }) {
  const timeline = useMemo(() => diffTimeline(data), [data]);
  if (timeline.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ChevronRight className="h-5 w-5 text-violet-500 rotate-90" />
        <h2 className="text-lg font-semibold">Year-by-Year Topic Changes</h2>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {(["added", "removed", "modified"] as const).map((status) => {
          const count = timeline.reduce((sum, t) => sum + t.diffs.filter((d) => d.status === status).length, 0);
          const colors = { added: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800", removed: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800", modified: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800" };
          const icons = { added: TrendingUp, removed: TrendingDown, modified: Pencil };
          const Icon = icons[status];
          return (
            <div key={status} className={`rounded-xl border ${colors[status]} p-4 text-center`}>
              <Icon className={`h-5 w-5 ${colors[status].split(" ")[1]} mx-auto mb-1`} />
              <p className="text-2xl font-bold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground capitalize">{status}</p>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {timeline.map((entry, idx) => {
          const stats = {
            added: entry.diffs.filter((d) => d.status === "added").length,
            removed: entry.diffs.filter((d) => d.status === "removed").length,
            modified: entry.diffs.filter((d) => d.status === "modified").length,
          };
          return (
            <div key={`${entry.year}-${idx}`} className="rounded-xl border border-border bg-card overflow-hidden">
              {/* Year header */}
              <div className="px-4 py-3 border-b border-border/60 bg-muted/30 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold">
                    {entry.year}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{entry.bsYear}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {stats.added > 0 && <span className="text-xs text-emerald-600 dark:text-emerald-400">+{stats.added} added</span>}
                      {stats.removed > 0 && <span className="text-xs text-red-600 dark:text-red-400">-{stats.removed} removed</span>}
                      {stats.modified > 0 && <span className="text-xs text-amber-600 dark:text-amber-400">{stats.modified} modified</span>}
                    </div>
                  </div>
                </div>
                {entry.notes && <DateBadge label="Source" date={`${entry.year} BS`} tone="gray" />}
              </div>

              {/* Diffs */}
              <div className="p-4 space-y-2">
                {entry.diffs.map((diff, i) => (
                  <TopicBadge key={`${diff.unitSlug}-${i}`} diff={diff} />
                ))}
                {entry.diffs.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No topic-level changes detected</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Pairwise comparison view (for "compare with previous" button)
   ──────────────────────────────────────────────────────────── */

export function SyllabusPairCompare({ data }: { data: SyllabusSubjectData }) {
  const sorted = [...data.versions].sort((a, b) => a.year - b.year);
  if (sorted.length < 2) return null;
  const older = sorted[sorted.length - 2];
  const newer = sorted[sorted.length - 1];
  const changes = diffVersions(older, newer);

  const stats = {
    added: changes.filter((d) => d.status === "added").length,
    removed: changes.filter((d) => d.status === "removed").length,
    modified: changes.filter((d) => d.status === "modified").length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{older.year} BS</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{newer.year} BS</span>
        {newer.isLatest && (
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium">
            Latest
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Added", value: stats.added, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800" },
          { label: "Removed", value: stats.removed, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/20", border: "border-red-200 dark:border-red-800" },
          { label: "Modified", value: stats.modified, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-800" },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className={`rounded-xl border ${border} ${bg} p-4 text-center`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {newer.notes && (
        <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
          <span className="shrink-0 mt-0.5">ℹ</span>
          <span>{newer.notes}</span>
        </div>
      )}

      <div className="space-y-2">
        {(["added", "modified", "removed"] as const).map((status) => {
          const items = changes.filter((d) => d.status === status);
          if (items.length === 0) return null;
          const labels = { added: "Added", modified: "Modified", removed: "Removed" };
          const colors = { added: "text-emerald-600 dark:text-emerald-400", modified: "text-amber-600 dark:text-amber-400", removed: "text-red-600 dark:text-red-400" };
          return (
            <div key={status}>
              <p className={`text-xs font-semibold uppercase tracking-wider ${colors[status]} mb-2`}>{labels[status]}</p>
              <div className="space-y-2">
                {items.map((diff, i) => <TopicBadge key={`${diff.unitSlug}-${i}`} diff={diff} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Current-version unit/topic view (with change badges on topics)
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
  const diffByUnit = new Map<string, DiffResult[]>();
  if (diffs) {
    for (const d of diffs) {
      if (!diffByUnit.has(d.unitSlug)) diffByUnit.set(d.unitSlug, []);
      diffByUnit.get(d.unitSlug)!.push(d);
    }
  }
  const unitDiffs = diffByUnit.get(unit.id) ?? [];
  const hasChanges = unitDiffs.length > 0;

  return (
    <div className={`rounded-xl border overflow-hidden ${hasChanges ? "border-violet-200 dark:border-violet-800" : "border-border"}`}>
      <div className="px-4 py-3 border-b border-border/60 bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{unit.title}</span>
          {unit.hours !== undefined && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{unit.hours} hrs</span>
          )}
        </div>
        <span className="text-[11px] font-mono text-muted-foreground/60">{unit.id}</span>
      </div>
      <div className="divide-y divide-border/40">
        {unit.topics.map((topic, i) => {
          const diff = unitDiffs.find((d) => d.topicTitle === topic.title);
          return (
            <div key={i} className={`px-4 py-2.5 flex items-start gap-3 text-sm ${diff ? (diff.status === "added" ? "bg-emerald-50 dark:bg-emerald-950/20" : diff.status === "removed" ? "bg-red-50 dark:bg-red-950/20" : diff.status === "modified" ? "bg-amber-50 dark:bg-amber-950/20" : "") : ""}`}>
              {diff && (
                <span className={`shrink-0 mt-0.5 h-2 w-2 rounded-full ${diff.status === "added" ? "bg-emerald-500" : diff.status === "removed" ? "bg-red-500" : "bg-amber-500"}`} />
              )}
              <div className="min-w-0 flex-1">
                <p className={`leading-relaxed ${diff?.status === "removed" ? "line-through opacity-50" : ""}`}>
                  {topic.title}
                </p>
                {topic.hours !== undefined && (
                  <p className="text-xs text-muted-foreground mt-0.5">{topic.hours} hrs</p>
                )}
              </div>
              {diff && diff.status !== "removed" && (
                <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${diff.status === "added" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-amber-500/10 text-amber-700 dark:text-amber-300"}`}>
                  {diff.status === "added" ? "NEW" : "CHANGED"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
