"use client";

/**
 * /subjects — Subjects directory (redesigned 2026-11).
 *
 * Layout matches the reference screenshot:
 *   - "My Subjects" header with subtitle + search icon
 *   - Class filter pills (Class 11 / Class 12)
 *   - Status filter pills (All / Not Started / In Progress / Completed)
 *   - 2-column card grid with:
 *       · gradient header area with progress ring
 *       · subject name + class chip
 *       · chapter count + progress %
 *       · "New" / "Soon" badge per card
 *
 * Subject colours are unique — NOT the same per card (different gradient per subject).
 */

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";

// ─── Per-subject gradient definitions ─────────────────────────────────────────
const SUBJECT_GRADIENTS: Record<string, { from: string; to: string; badge: string }> = {
  physics:     { from: "#3b82f6", to: "#6366f1", badge: "bg-blue-500" },
  chemistry:   { from: "#10b981", to: "#059669", badge: "bg-emerald-500" },
  biology:     { from: "#8b5cf6", to: "#a855f7", badge: "bg-violet-500" },
  mathematics: { from: "#f59e0b", to: "#ef4444", badge: "bg-amber-500" },
  english:     { from: "#06b6d4", to: "#0ea5e9", badge: "bg-cyan-500" },
  nepali:      { from: "#ec4899", to: "#f43f5e", badge: "bg-rose-500" },
};

function getGradient(slug: string) {
  return SUBJECT_GRADIENTS[slug] ?? { from: "#6366f1", to: "#8b5cf6", badge: "bg-indigo-500" };
}

// ─── Progress ring (SVG) ──────────────────────────────────────────────────────
function ProgressRing({ percent, size = 52 }: { percent: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (percent / 100);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="5" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="white"
          strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[11px] font-black text-white">{percent}%</span>
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
type CardStatus = "New" | "Soon" | "In Progress" | null;

function StatusBadge({ status }: { status: CardStatus }) {
  if (!status) return null;
  const map = {
    "New":         "bg-white/20 text-white",
    "Soon":        "bg-amber-400 text-white",
    "In Progress": "bg-emerald-400 text-white",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${map[status]}`}>
      {status === "Soon" ? "🚀 Soon" : status}
    </span>
  );
}

// ─── Single subject card ──────────────────────────────────────────────────────
function SubjectCard({
  subject, classLabel, notesSlug, status,
}: {
  subject: { slug: string; name: string; units: { topics: unknown[]; id: string }[] };
  classLabel: string;
  notesSlug: string;
  status: CardStatus;
}) {
  const grad = getGradient(subject.slug);
  const totalChapters = subject.units.length;
  const percent = 0; // real progress would come from useJourney(); static for SSR

  return (
    <Link
      href={`/${notesSlug}/${subject.slug}`}
      className="flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Gradient header */}
      <div
        className="relative flex items-center justify-center py-6"
        style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
      >
        {/* Top-right badge */}
        <div className="absolute right-2.5 top-2.5">
          <StatusBadge status={status} />
        </div>
        <ProgressRing percent={percent} />
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-1.5 p-3.5">
        <h3 className="text-sm font-extrabold leading-tight text-foreground">{subject.name}</h3>
        <span
          className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
          style={{ backgroundColor: grad.from }}
        >
          {classLabel}
        </span>
        <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>0/{totalChapters} ch</span>
          <span className="font-semibold">{percent}%</span>
        </div>
        {/* thin progress bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted/60">
          <div className="h-1 rounded-full" style={{ width: `${percent}%`, backgroundColor: grad.from }} />
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
type ClassFilter = "Class 11" | "Class 12";
type StatusFilter = "All" | "Not Started" | "In Progress";

export default function SubjectsPage() {
  const [classFilter, setClassFilter] = useState<ClassFilter>("Class 11");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const classSyllabus = useMemo(
    () => SYLLABUS.find((c) => c.slug === (classFilter === "Class 11" ? "class-11-notes" : "class-12-notes")),
    [classFilter],
  );

  const notesSlug = classFilter === "Class 11" ? "class-11-notes" : "class-12-notes";
  const subjects = classSyllabus?.subjects ?? [];

  // Status is static for now — all are "New" since no real progress data in SSR
  const getStatus = (_slug: string): CardStatus => "New";

  const filtered = statusFilter === "All"
    ? subjects
    : subjects; // future: filter by actual progress state

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-4 py-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">My Subjects</h1>
          <p className="text-xs text-muted-foreground">{classFilter} · Pick a subject to study</p>
        </div>
        <button
          type="button"
          aria-label="Search subjects"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground hover:text-foreground transition-colors"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* Overall progress bar */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-900/30">
          🎯
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">
            0 of {subjects.length} subjects mastered
          </p>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
            <div className="h-1.5 w-[2%] rounded-full bg-red-400" />
          </div>
        </div>
        <span className="text-xs font-bold text-red-500">2% overall</span>
      </div>

      {/* Class filter */}
      <div className="flex gap-2 border-b border-border/60 pb-3">
        {(["Class 11", "Class 12"] as ClassFilter[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setClassFilter(c)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              classFilter === c
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex gap-2">
        {(["All", "Not Started"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === s
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {s !== "All" && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[9px] font-black">
                ○
              </span>
            )}
            {s}
            <span className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-extrabold ${statusFilter === s ? "bg-white/25 text-white" : "bg-muted text-muted-foreground"}`}>
              {subjects.length}
            </span>
          </button>
        ))}
      </div>

      {/* Subject count */}
      <p className="text-xs font-semibold text-muted-foreground">{filtered.length} subjects</p>

      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((subject) => (
          <SubjectCard
            key={subject.slug}
            subject={subject as any}
            classLabel={classFilter}
            notesSlug={notesSlug}
            status={getStatus(subject.slug)}
          />
        ))}
      </div>

    </div>
  );
}
