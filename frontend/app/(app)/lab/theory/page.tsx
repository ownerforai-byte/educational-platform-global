"use client";

/**
 * Lab Theory — the theory filter of the single hub (Phase 3).
 *
 * This used to be a second catalog: it enumerated `LAB_REGISTRY` itself. It now
 * lists exactly the activities the manifest offers with `kind: "theory"`, so a
 * theory entry appears here only if the manifest places it, and every card links
 * to its canonical `/lab/<slug>`.
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, Cuboid, ChevronRight } from "lucide-react";
import { activityHref, listOfferedActivities, type LabActivity } from "@/lib/lab-manifest";
import { LAB_SUBJECTS } from "@/lib/lab-unit-order";

export default function LabTheoryPage() {
  const theory = useMemo(
    () => listOfferedActivities().filter((activity) => activity.kind === "theory"),
    []
  );

  const subjects = useMemo(
    () => LAB_SUBJECTS.filter((s) => theory.some((a) => a.curriculum.subject === s.key)),
    [theory]
  );

  const [activeSubject, setActiveSubject] = useState<string>(subjects[0]?.key ?? "physics");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // Search spans every subject by title; an empty result shows an explicit
    // empty state rather than falling back to unrelated topics.
    if (q) return theory.filter((a) => a.title.toLowerCase().includes(q));
    return theory.filter((a) => a.curriculum.subject === activeSubject);
  }, [query, theory, activeSubject]);

  const countFor = (key: string) =>
    theory.filter((a) => a.curriculum.subject === key).length;

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Lab Theory
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every lab&apos;s theory in one place — {theory.length} topics across Physics,
          Chemistry, Biology and Mathematics, each with Look / Principle / Why explanations.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {subjects.map((s) => {
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
                {countFor(s.key)}
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
        {filtered.map((activity) => (
          <TheoryCard key={activity.id} activity={activity} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-muted-foreground">
            <p className="text-sm">
              {query.trim()
                ? `No topics match “${query}”.`
                : "Theory topics for this subject are under progress — will be added in a future update."}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
        <span className="stat-pill">
          <span className="text-muted-foreground">Total theory topics:</span>
          <span className="stat-pill-value">{theory.length}</span>
        </span>
        {subjects.map((s) => (
          <span key={s.key} className="stat-pill">
            <span className="text-muted-foreground">{s.label}:</span>
            <span className="stat-pill-value" style={{ color: s.color }}>
              {countFor(s.key)}
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

function TheoryCard({ activity }: { activity: LabActivity }) {
  const subject = LAB_SUBJECTS.find((s) => s.key === activity.curriculum.subject);

  return (
    <Link href={activityHref(activity.id)} className="block group">
      <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card hover:border-primary/50 transition-all duration-[200ms] hover:elev-2 h-full flex flex-col">
        <div className="p-4 flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${subject?.color ?? "#64748b"}18`, color: subject?.color ?? "#64748b" }}
          >
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
              {activity.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              Look / Principle / Why explanations.
            </p>
          </div>
        </div>
        <div className="px-4 py-2.5 border-t border-border/50 flex items-center justify-between">
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              color: subject?.color ?? "#64748b",
              borderColor: `${subject?.color ?? "#64748b"}40`,
              backgroundColor: `${subject?.color ?? "#64748b"}10`,
            }}
          >
            {subject?.label ?? activity.curriculum.subject}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            {activity.lifecycle === "pilot" ? "Pilot" : "Live"}
          </span>
        </div>
      </div>
    </Link>
  );
}
