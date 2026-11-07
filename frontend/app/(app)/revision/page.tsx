"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Repeat, ArrowLeft, Layers, Clock, ChevronRight } from "lucide-react";
import { readGoals, listGoalSubjects, daysUntilExam } from "@/lib/study-goals";
import type { StudyGoals } from "@/lib/study-goals";
import { SYLLABUS } from "@/lib/syllabus";

export default function RevisionPage() {
  const [goals, setGoals] = useState<StudyGoals | null>(null);

  useEffect(() => {
    setGoals(readGoals());
  }, []);

  const selectedSubjects = goals
    ? listGoalSubjects().filter((s) => goals.subjects.includes(s.key))
    : [];
  const daysLeft = goals ? daysUntilExam(goals) : null;

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Repeat className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quick Revision</h1>
          <p className="mt-1 text-muted-foreground">
            Focused flashcard sessions from your SRS deck — pick a topic and
            revise in minutes.
          </p>
        </div>
      </div>

      {daysLeft !== null && daysLeft > 0 && (
        <div className="rounded-2xl border border-border bg-muted/40 p-5 text-center">
          <Clock className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-2 text-sm text-foreground">
            <span className="font-bold text-primary">{daysLeft} days</span> until
            your exam — every revision session counts.
          </p>
        </div>
      )}

      {selectedSubjects.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Revise your subjects
          </h2>
          {selectedSubjects.map((s) => {
            const syllabus = SYLLABUS.find((c) => c.slug === s.classSlug)?.subjects.find(
              (sub) => sub.slug === s.subjectSlug,
            );
            return (
              <Link
                key={s.key}
                href="/srs"
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{s.subjectName}</p>
                  <p className="text-sm text-muted-foreground">{s.className}</p>
                  {syllabus && (
                    <p className="text-sm text-muted-foreground">
                      {syllabus.units.length} units available for review
                    </p>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-muted/40 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No subjects selected yet. Set your study goals to see revision
            topics here.
          </p>
          <Link
            href="/goals"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Set study goals
          </Link>
        </div>
      )}

      <Link
        href="/srs"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Spaced Repetition
      </Link>
    </div>
  );
}
