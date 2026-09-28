"use client";

import React, { useState } from "react";
import { TopicMindMap } from "@/components/lab/topic-mindmap";
import { SYLLABUS } from "@/lib/syllabus";

const SUBJECTS = [
  { slug: "physics", name: "Physics", grade: "Grade 11 & 12 NEB" },
  { slug: "chemistry", name: "Chemistry", grade: "Grade 11 & 12 NEB" },
  { slug: "biology", name: "Biology", grade: "Grade 11 & 12 NEB" },
  { slug: "mathematics", name: "Mathematics", grade: "Grade 11 & 12 NEB" },
];

interface UnitOption {
  id: string;
  title: string;
}

/** Real syllabus units per subject (Grade 11 + 12, deduped by unit id). */
function unitsForSubject(subjectSlug: string): UnitOption[] {
  const seen = new Map<string, string>();
  for (const cls of SYLLABUS) {
    const subj = cls.subjects.find((x) => x.slug === subjectSlug);
    if (!subj) continue;
    for (const u of subj.units) {
      if (!seen.has(u.id)) seen.set(u.id, u.title);
    }
  }
  return [...seen].map(([id, title]) => ({ id, title }));
}

const UNITS: Record<string, UnitOption[]> = Object.fromEntries(
  SUBJECTS.map((s) => [s.slug, unitsForSubject(s.slug)]),
);

export default function MindMapHubPage() {
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0]);
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);

  const subjectUnits = UNITS[activeSubject.slug] ?? [];
  const activeUnit =
    subjectUnits.find((u) => u.id === activeUnitId) ?? subjectUnits[0];

  return (
    <div className="mx-auto max-w-7xl py-6 md:py-10 px-3 sm:px-6 space-y-8">
      {/* Hero Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              Interactive Blueprint Architecture
            </span>
            <span className="text-xs text-muted-foreground font-mono">NEB &bull; CEE &bull; IOE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mt-1">
            Visual Science Mindmaps
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Every syllabus unit carries its own branch tree — its laws, speed formulas, worked
            numericals and CEE traps — so no two units map the same way. Pick a subject, then a unit.
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {SUBJECTS.map((s) => {
            const isActive = activeSubject.slug === s.slug;
            return (
              <button
                key={s.slug}
                onClick={() => setActiveSubject(s)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md scale-105"
                    : "bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Unit picker — real syllabus units, one scrollable technical strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground shrink-0">
          {activeSubject.name} units
        </span>
        {subjectUnits.map((u) => {
          const isActive = activeUnit?.id === u.id;
          return (
            <button
              key={u.id}
              onClick={() => setActiveUnitId(u.id)}
              title={u.title}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap shrink-0 max-w-[15rem] truncate transition-all ${
                isActive
                  ? "bg-indigo-500/15 text-indigo-500 border border-indigo-500/50"
                  : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {u.title}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Mindmap Workspace — keyed per unit so expansion
          state, branch selection and the knowledge block reset cleanly. */}
      {activeUnit && (
        <TopicMindMap
          key={`${activeSubject.slug}:${activeUnit.id}`}
          subjectSlug={activeSubject.slug}
          topicSlug={activeUnit.id}
          topicTitle={activeUnit.title}
          unitId={activeUnit.id}
        />
      )}
    </div>
  );
}
