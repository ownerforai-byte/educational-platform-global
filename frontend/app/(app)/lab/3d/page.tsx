"use client";

/**
 * Lab 3D — THE single hub for all 3D simulations, unit suites and theory labs.
 *
 * Consolidation rules (project-wide audit):
 *  - One ordered route per lab: every entry in LAB_REGISTRY is listed here,
 *    grouped by subject → official NEB syllabus unit (via LAB_UNIT_ORDER,
 *    which derives its ordering from lib/syllabus.ts) → General bucket.
 *  - The periodic table entry renders the canonical CEE all-blocks table
 *    (/periodic-table), wired directly into the registry — no duplicate table.
 *  - Empty units are simply not rendered; every lab stays reachable.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Cuboid } from "lucide-react";
import { LAB_REGISTRY, getLabsByCategory } from "@/lib/lab-registry";
import { LAB_UNIT_ORDER, LAB_SUBJECTS } from "@/lib/lab-unit-order";
import { getSubjectSyllabus } from "@/lib/syllabus";
import type { LabMeta } from "@/lib/types/lab";

const CLASS_OPTIONS = ["class-11-notes", "class-12-notes"] as const;
type ClassSlug = (typeof CLASS_OPTIONS)[number];

type LabCardData = LabMeta & { href: string };

/** Syllabus unit ids that belong to Class 11 vs Class 12, for filtering. */
function classOfUnit(subject: string, unitId: string): ClassSlug | "both" {
  const c11 = getSubjectSyllabus("class-11-notes", subject);
  const c12 = getSubjectSyllabus("class-12-notes", subject);
  const in11 = c11?.units.some((u) => u.id === unitId) ?? false;
  const in12 = c12?.units.some((u) => u.id === unitId) ?? false;
  if (in11 && in12) return "both";
  if (in11) return "class-11-notes";
  if (in12) return "class-12-notes";
  return "both";
}

export default function Lab3DPage() {
  const [subject, setSubject] = useState<string>("physics");
  const [classFilter, setClassFilter] = useState<ClassSlug | "all">("all");
  const [query, setQuery] = useState("");

  const subjects = LAB_SUBJECTS.filter((s) => getLabsByCategory(s.key).length > 0);

  const grouped = useMemo(() => {
    const labs = getLabsByCategory(subject);
    const order = LAB_UNIT_ORDER[subject] ?? {};

    // Resolve syllabus units in official order for this subject
    const syllabusUnits: Array<{ id: string; title: string; cls: ClassSlug }> = [];
    for (const cls of CLASS_OPTIONS) {
      const syl = getSubjectSyllabus(cls, subject);
      for (const u of syl?.units ?? []) {
        if (!syllabusUnits.some((x) => x.id === u.id)) {
          syllabusUnits.push({ id: u.id, title: u.title, cls });
        }
      }
    }

    const general: LabCardData[] = [];
    const byUnit = new Map<string, LabCardData[]>();

    for (const lab of labs) {
      const item: LabCardData = { ...lab, href: `/lab/${lab.id}` };
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${lab.title} ${lab.description} ${lab.unit ?? ""}`.toLowerCase();
        if (!hay.includes(q)) continue;
      }
      const unitId = order[lab.unit?.replace("Unit: ", "") ?? ""] ?? "__general__";
      if (unitId === "__general__") {
        general.push(item);
      } else {
        if (!byUnit.has(unitId)) byUnit.set(unitId, []);
        byUnit.get(unitId)!.push(item);
      }
    }

    const sections = syllabusUnits
      .map((u) => ({
        id: u.id,
        title: u.title,
        cls: classOfUnit(subject, u.id),
        labs: byUnit.get(u.id) ?? [],
      }))
      .filter((s) => s.labs.length > 0);

    return { sections, general };
  }, [subject, query]);

  const visibleSections = grouped.sections.filter(
    (s) => classFilter === "all" || s.cls === "both" || s.cls === classFilter
  );
  const totalCount = visibleSections.reduce((n, s) => n + s.labs.length, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-12 px-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
            <span className="inline-flex h-10 w-10 rounded-2xl bg-primary/10 items-center justify-center">
              <Cuboid className="h-5 w-5 text-primary" />
            </span>
            3D Labs — All in One
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
            Every 3D simulation, unit suite and theory lab on one ordered route —
            grouped by subject and official NEB syllabus unit, Class 11 → Class 12.
          </p>
        </div>
        <Link
          href="/lab"
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/40 transition-colors"
        >
          Full lab dashboard →
        </Link>
      </div>

      {/* Subject tabs */}
      <div className="flex gap-2 flex-wrap" role="tablist">
        {subjects.map((s) => {
          const active = subject === s.key;
          const count = getLabsByCategory(s.key).length;
          return (
            <button
              key={s.key}
              onClick={() => setSubject(s.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "text-white shadow-md elev-2 ring-2 ring-primary/40"
                  : "bg-muted text-muted-foreground hover:elev-1"
              }`}
              style={active ? { backgroundColor: s.color } : undefined}
            >
              <span>{s.emoji}</span>
              {s.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-md ${
                  active ? "bg-white/20" : "bg-muted-foreground/20"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search simulations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-1 p-1 bg-muted rounded-xl">
          {(["all", "class-11-notes", "class-12-notes"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setClassFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                classFilter === c
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c === "all" ? "All classes" : c === "class-11-notes" ? "Class 11" : "Class 12"}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{totalCount} labs</span>
      </div>

      {/* Ordered sections */}
      {visibleSections.length === 0 && grouped.general.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-sm">
            {query
              ? `No labs match “${query}”.`
              : "No labs mapped for this subject yet — content lands here as it is added."}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {visibleSections.map((section) => (
            <section key={section.id} id={section.id}>
              <div className="flex items-baseline gap-3 mb-3">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <span className="text-[10px] font-semibold uppercase tracking-wide rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                  {section.cls === "class-11-notes"
                    ? "Class 11"
                    : section.cls === "class-12-notes"
                    ? "Class 12"
                    : "Both classes"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {section.labs.length}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.labs.map((lab) => (
                  <LabCard key={lab.id} lab={lab} />
                ))}
              </div>
            </section>
          ))}

          {grouped.general.length > 0 && (
            <section id="general">
              <div className="flex items-baseline gap-3 mb-3">
                <h2 className="text-lg font-semibold">General &amp; Tools</h2>
                <span className="text-xs text-muted-foreground">
                  {grouped.general.length}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {grouped.general.map((lab) => (
                  <LabCard key={lab.id} lab={lab} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function LabCard({ lab }: { lab: LabCardData }) {
  const subj = LAB_SUBJECTS.find((s) => s.key === lab.category);
  const color = lab.color || subj?.color || "#64748b";
  const statusColor =
    lab.status === "new"
      ? "text-blue-600 dark:text-blue-400"
      : lab.status === "premium"
      ? "text-amber-600 dark:text-amber-400"
      : lab.status === "development"
      ? "text-purple-600 dark:text-purple-400"
      : "text-emerald-600 dark:text-emerald-400";
  const statusBg =
    lab.status === "new"
      ? "bg-blue-500/10"
      : lab.status === "premium"
      ? "bg-amber-500/10"
      : lab.status === "development"
      ? "bg-purple-500/10"
      : "bg-emerald-500/10";

  return (
    <Link href={lab.href} className="block group h-full">
      <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card hover:border-primary/50 transition-all duration-200 hover:elev-2 h-full flex flex-col">
        <div className="p-4 flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${color}18`, color }}
          >
            <Cuboid className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
              {lab.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {lab.description}
            </p>
          </div>
        </div>
        <div className="px-4 py-2.5 border-t border-border/50 flex items-center justify-between gap-2">
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full border truncate"
            style={{ color, borderColor: `${color}40`, backgroundColor: `${color}10` }}
          >
            {lab.unit?.replace("Unit: ", "") ?? (subj?.label ?? "Lab")}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBg} ${statusColor} shrink-0`}>
            {lab.status === "new"
              ? "New"
              : lab.status === "premium"
              ? "Premium"
              : lab.status === "development"
              ? "Dev"
              : "Active"}
          </span>
        </div>
      </div>
    </Link>
  );
}
