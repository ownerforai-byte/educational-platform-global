"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Target, ArrowLeft, Calendar, Clock, Check } from "lucide-react";
import {
  readGoals,
  writeGoals,
  listGoalSubjects,
  DAILY_MINUTES_OPTIONS,
  type StudyGoals,
} from "@/lib/study-goals";

export default function GoalsPage() {
  const [goals, setGoals] = useState<StudyGoals | null>(null);
  const [mounted, setMounted] = useState(false);

  // localStorage is unavailable during SSR. Reading it after mount keeps the
  // server and the client's first paint on the same "Loading…" shell, so there
  // is no hydration mismatch. The post-mount setState is therefore deliberate.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setGoals(readGoals());
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!mounted || !goals) {
    return (
      <div className="mx-auto max-w-2xl py-20 text-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  const allSubjects = listGoalSubjects();
  const selectedSet = new Set(goals.subjects);

  function toggleSubject(key: string) {
    const next = new Set(selectedSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    const updated: StudyGoals = {
      ...goals,
      subjects: Array.from(next),
    } as StudyGoals;
    setGoals(updated);
    writeGoals(updated);
  }

  function update<K extends keyof StudyGoals>(key: K, value: StudyGoals[K]) {
    const updated: StudyGoals = { ...goals, [key]: value } as StudyGoals;
    setGoals(updated);
    writeGoals(updated);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Target className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Goals</h1>
          <p className="mt-1 text-muted-foreground">
            Your subjects, exam date, daily study target — all in one place.
          </p>
        </div>
      </div>

      {/* Exam date */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          Exam date
        </label>
        <input
          type="date"
          value={goals.examDate ?? ""}
          onChange={(e) => update("examDate", e.target.value || null)}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </section>

      {/* Daily study target */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Daily study target
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {DAILY_MINUTES_OPTIONS.map((m) => (
            <button
              key={m}
              onClick={() => update("dailyMinutes", m as number)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                goals.dailyMinutes === m
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              {m < 60 ? `${m} min` : `${m / 60} hr${m > 60 ? "s" : ""}`}
            </button>
          ))}
        </div>
      </section>

      {/* Subject selection */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-medium text-foreground">
          Your subjects
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select the subjects you are studying. The planner and dashboard use
          these to build your weekly schedule.
        </p>
        <div className="mt-4 space-y-4">
          {allSubjects
            .reduce<
              Array<{
                className: string;
                classSlug: string;
                subjects: Array<{ key: string; name: string }>;
              }>
            >((acc, s) => {
              let group = acc.find((g) => g.classSlug === s.classSlug);
              if (!group) {
                group = {
                  className: s.className,
                  classSlug: s.classSlug,
                  subjects: [],
                };
                acc.push(group);
              }
              group.subjects.push({ key: s.key, name: s.subjectName });
              return acc;
            }, [])
            .map((group) => (
              <div key={group.classSlug}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.className}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.subjects.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => toggleSubject(s.key)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                        selectedSet.has(s.key)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {selectedSet.has(s.key) && <Check className="h-3.5 w-3.5" />}
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      <Link
        href="/onboarding"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to onboarding
      </Link>
    </div>
  );
}
