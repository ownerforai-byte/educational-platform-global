"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Construction, Search } from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";

// ─── Per-subject gradients ─────────────────────────────────────────────────
const SUBJECT_GRADIENTS: Record<string, { from: string; to: string }> = {
  physics:     { from: "#3b82f6", to: "#6366f1" },
  chemistry:   { from: "#10b981", to: "#059669" },
  biology:     { from: "#8b5cf6", to: "#a855f7" },
  mathematics: { from: "#f59e0b", to: "#ef4444" },
  english:     { from: "#06b6d4", to: "#0ea5e9" },
  nepali:      { from: "#ec4899", to: "#f43f5e" },
};
function getGradient(slug: string) {
  return SUBJECT_GRADIENTS[slug] ?? { from: "#6366f1", to: "#8b5cf6" };
}

// ─── Progress ring ─────────────────────────────────────────────────────────
function ProgressRing({ percent, size = 52 }: { percent: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (percent / 100);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="5" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="white" strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span className="absolute text-[11px] font-black text-white">{percent}%</span>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────
type CardStatus = "New" | "Soon" | null;
function StatusBadge({ status }: { status: CardStatus }) {
  if (!status) return null;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${status === "Soon" ? "bg-amber-400 text-white" : "bg-white/20 text-white"}`}>
      {status === "Soon" ? "🚀 Soon" : "New"}
    </span>
  );
}

// ─── Live subject card ─────────────────────────────────────────────────────
function SubjectCard({ subject, classLabel, notesSlug }: {
  subject: { slug: string; name: string; units: { id: string }[] };
  classLabel: string;
  notesSlug: string;
}) {
  const grad = getGradient(subject.slug);
  return (
    <Link href={`/${notesSlug}/${subject.slug}`}
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="relative flex items-center justify-center py-6"
        style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}>
        <div className="absolute right-2.5 top-2.5"><StatusBadge status="New" /></div>
        <ProgressRing percent={0} />
      </div>
      <div className="flex flex-col gap-1.5 p-3.5">
        <h3 className="text-sm font-extrabold leading-tight text-foreground">{subject.name}</h3>
        <span className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
          style={{ backgroundColor: grad.from }}>{classLabel}</span>
        <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>0/{subject.units.length} ch</span>
          <span className="font-semibold">0%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted/60">
          <div className="h-1 rounded-full" style={{ width: "0%", backgroundColor: grad.from }} />
        </div>
      </div>
    </Link>
  );
}

// ─── Coming-soon stub card ─────────────────────────────────────────────────
function StubCard({ name, classLabel, color }: { name: string; classLabel: string; color: string }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-dashed border-border/50 bg-muted/20 opacity-70">
      <div className="relative flex items-center justify-center py-6"
        style={{ background: `linear-gradient(135deg, ${color}60, ${color}30)` }}>
        <div className="absolute right-2.5 top-2.5">
          <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold text-white">🚀 Soon</span>
        </div>
        <div className="flex h-13 w-13 items-center justify-center rounded-full bg-white/20">
          <Construction className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 p-3.5">
        <h3 className="text-sm font-extrabold leading-tight text-foreground">{name}</h3>
        <span className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
          style={{ backgroundColor: color }}>{classLabel}</span>
        <p className="mt-1 text-[10px] text-muted-foreground">Coming soon</p>
      </div>
    </div>
  );
}

function SubjectCardSkeleton({ index, classLabel }: { index: number; classLabel: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card"
    >
      <div className="flex items-center justify-center bg-muted/50 py-6">
        <div className="h-[52px] w-[52px] animate-pulse rounded-full bg-muted" />
      </div>
      <div className="flex flex-col gap-2 p-3.5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-16 animate-pulse rounded-full bg-muted" />
        <div className="mt-1 h-3 w-full animate-pulse rounded bg-muted" />
        <div className="h-1 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

// ─── Class 8/9/10 stub subjects ────────────────────────────────────────────
const STUB_SUBJECTS: Record<"8" | "9" | "10", Array<{ name: string; color: string }>> = {
  "8": [
    { name: "Science",      color: "#06b6d4" },
    { name: "Mathematics",  color: "#f59e0b" },
    { name: "English",      color: "#8b5cf6" },
    { name: "Nepali",       color: "#ec4899" },
    { name: "Social Studies",color: "#10b981" },
    { name: "Health",       color: "#ef4444" },
  ],
  "9": [
    { name: "Science",      color: "#06b6d4" },
    { name: "Mathematics",  color: "#f59e0b" },
    { name: "English",      color: "#8b5cf6" },
    { name: "Nepali",       color: "#ec4899" },
    { name: "Social Studies",color: "#10b981" },
    { name: "Health & PE",  color: "#ef4444" },
  ],
  "10": [
    { name: "Science",      color: "#06b6d4" },
    { name: "Mathematics",  color: "#f59e0b" },
    { name: "English",      color: "#8b5cf6" },
    { name: "Nepali",       color: "#ec4899" },
    { name: "Social Studies",color: "#10b981" },
    { name: "Optional Maths",color: "#ef4444" },
  ],
};

// ─── Page ──────────────────────────────────────────────────────────────────
type ClassFilter = "Class 8" | "Class 9" | "Class 10" | "Class 11" | "Class 12";
const CLASS_FILTERS: ClassFilter[] = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

export default function SubjectsPage() {
  const [classFilter, setClassFilter] = useState<ClassFilter>("Class 11");
  const [loadProgress, setLoadProgress] = useState({ classFilter: "Class 11" as ClassFilter, count: 0 });

  const isLive = classFilter === "Class 11" || classFilter === "Class 12";
  const notesSlug = classFilter === "Class 11" ? "class-11-notes" : "class-12-notes";
  const classSyllabus = useMemo(() =>
    isLive ? SYLLABUS.find((c) => c.slug === notesSlug) : null,
    [isLive, notesSlug]);
  const liveSubjects = classSyllabus?.subjects ?? [];
  const stubClass = classFilter.replace("Class ", "") as "8" | "9" | "10";
  const stubSubjects = STUB_SUBJECTS[stubClass] ?? [];

  const subjectCount = isLive ? liveSubjects.length : stubSubjects.length;
  const loadedCount = loadProgress.classFilter === classFilter ? loadProgress.count : 0;

  useEffect(() => {
    const timers = Array.from({ length: subjectCount }, (_, index) =>
      window.setTimeout(
        () => setLoadProgress({ classFilter, count: index + 1 }),
        (index + 1) * 400,
      ),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [classFilter, subjectCount]);

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-4 py-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">My Subjects</h1>
          <p className="text-xs text-muted-foreground">{classFilter} · Pick a subject to study</p>
        </div>
        <button type="button" aria-label="Search subjects"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground hover:text-foreground transition-colors">
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* Overall progress */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-900/30">🎯</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">{loadedCount} of {subjectCount} subjects loaded</p>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
            <div
              className="h-1.5 rounded-full bg-red-400 transition-[width] duration-300"
              style={{ width: `${subjectCount ? (loadedCount / subjectCount) * 100 : 100}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-bold text-red-500">
          {subjectCount ? Math.round((loadedCount / subjectCount) * 100) : 100}%
        </span>
      </div>

      {/* Class filter pills */}
      <div className="flex gap-2 overflow-x-auto border-b border-border/60 pb-3">
        {CLASS_FILTERS.map((c) => (
          <button key={c} type="button" onClick={() => setClassFilter(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              classFilter === c ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Subject count */}
      <p className="text-xs font-semibold text-muted-foreground">{subjectCount} subjects</p>

      {/* Coming-soon notice for Class 8/9/10 */}
      {!isLive && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/8 px-4 py-3 text-xs font-semibold text-amber-700 dark:text-amber-400">
          🚀 {classFilter} content is coming soon — notes, formula sheets and labs are being added.
        </div>
      )}

      {/* Cards */}
      <div key={classFilter} className="grid grid-cols-2 gap-3">
        {Array.from({ length: subjectCount }, (_, index) => {
          if (index >= loadedCount) {
            return <SubjectCardSkeleton key={`loading-${classFilter}-${index}`} index={index} classLabel={classFilter} />;
          }
          return isLive
            ? <SubjectCard key={liveSubjects[index].slug} subject={liveSubjects[index] as any} classLabel={classFilter} notesSlug={notesSlug} />
            : <StubCard key={stubSubjects[index].name} name={stubSubjects[index].name} classLabel={classFilter} color={stubSubjects[index].color} />;
        })}
      </div>

    </div>
  );
}
