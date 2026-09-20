"use client";

/**
 * Lab Theory — THE single hub routing every lab's theory content.
 *
 * Routes every `type: "theory"` entry in LAB_REGISTRY (30 topics across
 * Physics, Chemistry, Biology, Mathematics) in subject groups, with search.
 * Empty subjects are simply not shown as tabs; the grid shows an explicit
 * empty state when a filter/search matches nothing.
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, Cuboid, ChevronRight } from "lucide-react";
import { LAB_REGISTRY, getLabsByCategory } from "@/lib/lab-registry";
import { LAB_SUBJECTS } from "@/lib/lab-unit-order";
import type { LabMeta } from "@/lib/types/lab";

export default function LabTheoryPage() {
  const subjects = useMemo(
    () => LAB_SUBJECTS.filter((s) => getLabsByCategory(s.key).some((l) => l.type === "theory")),
    []
  );
  const [activeSubject, setActiveSubject] = useState<string>(subjects[0]?.key ?? "physics");
  const [query, setQuery] = useState("");

  const subjectLabs = useMemo(
    () => getLabsByCategory(activeSubject).filter((l) => l.type === "theory"),
    [activeSubject]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subjectLabs;
    // Search spans ALL subjects by title/description; empty results get an
    // explicit empty state rather than falling back to unrelated topics.
    return LAB_REGISTRY.filter(
      (l) =>
        l.type === "theory" &&
        (l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q))
    );
  }, [query, subjectLabs]);

  const totalTheory = LAB_REGISTRY.filter((l) => l.type === "theory").length;

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Lab Theory
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every lab&apos;s theory in one place — {totalTheory} structured topics across Physics,
          Chemistry, Biology and Mathematics, each with Look / Principle / Why explanations.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {subjects.map((s) => {
          const count = getLabsByCategory(s.key).filter((l) => l.type === "theory").length;
          const isActive = activeSubject === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setActiveSubject(s.key)}
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "shadow-md elev-2 ring-2"
                  : "bg-muted text-muted-foreground hover:elev-1"
              }`}
              style={
                isActive
                  ? { backgroundColor: s.color, color: "#fff", borderColor: s.color }
                  : undefined
              }
            >
              {s.label}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-md ${
                  isActive ? "bg-white/20" : "bg-muted-foreground/20"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-muted-foreground">
            <p className="text-sm">
              {query.trim()
                ? `No topics match “${query}”.`
                : "No theory topics for this subject yet — check back soon."}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
        <span className="stat-pill">
          <span className="text-muted-foreground">Total theory topics:</span>
          <span className="stat-pill-value">{totalTheory}</span>
        </span>
        {subjects.map((s) => (
          <span key={s.key} className="stat-pill">
            <span className="text-muted-foreground">{s.label}:</span>
            <span className="stat-pill-value" style={{ color: s.color }}>
              {getLabsByCategory(s.key).filter((l) => l.type === "theory").length}
            </span>
          </span>
        ))}
        <Link
          href="/lab/3d"
          className="ml-auto inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <Cuboid className="h-4 w-4" />
          Explore 3D labs
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function LabCard({ lab }: { lab: LabMeta }) {
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
    <Link href={`/lab/${lab.id}`} className="block group">
      <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card hover:border-primary/50 transition-all duration-[200ms] hover:elev-2 h-full flex flex-col">
        <div className="p-4 flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${lab.color}18`, color: lab.color }}
          >
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
              {lab.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{lab.description}</p>
          </div>
        </div>
        <div className="px-4 py-2.5 border-t border-border/50 flex items-center justify-between">
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              color: lab.color,
              borderColor: `${lab.color}40`,
              backgroundColor: `${lab.color}10`,
            }}
          >
            {lab.unit || lab.category}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBg} ${statusColor}`}>
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
