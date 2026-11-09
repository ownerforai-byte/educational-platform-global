"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowLeft, ChevronRight, Clock } from "lucide-react";
import { readGoals, seedDailyPlan, daysUntilExam } from "@/lib/study-goals";
import type { StudyGoals, PlannerSeedItem } from "@/lib/study-goals";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SchedulePage() {
  const [plan, setPlan] = useState<PlannerSeedItem[]>([]);
  const [goals, setGoals] = useState<StudyGoals | null>(null);
  const [mounted, setMounted] = useState(false);

  // Client-only localStorage read after mount (no window during SSR); see the
  // same documented exception in goals/page.tsx.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const g = readGoals();
    setGoals(g);
    setPlan(seedDailyPlan(g));
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!mounted) {
    return (
      <div className="mx-auto max-w-2xl py-20 text-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  const daysLeft = goals ? daysUntilExam(goals) : null;

  // Group plan items by day of week (today onward)
  const today = new Date();
  const todayIdx = today.getDay();
  const days = Array.from({ length: 7 }, (_, i) => {
    const dayIdx = (todayIdx + i) % 7;
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const items = plan.filter((_, j) => j % 7 === i);
    return { dayIdx, date, items };
  });

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Schedule</h1>
          <p className="mt-1 text-muted-foreground">
            A calendar view of your planner output — see what topics are
            scheduled for each day.
          </p>
        </div>
      </div>

      {daysLeft !== null && daysLeft > 0 && (
        <div className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm">
          <Clock className="mr-2 inline h-4 w-4 text-muted-foreground" />
          <span className="font-bold text-primary">{daysLeft} days</span> until
          your exam.
        </div>
      )}

      {plan.length > 0 ? (
        <div className="space-y-3">
          {days.map((day, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">
                  {i === 0 ? "Today" : WEEKDAYS[day.dayIdx]}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {day.date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              {day.items.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {day.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2"
                    >
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">
                        {item.subjectName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        — {item.minutes} min
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No topics scheduled.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-muted/40 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No study plan yet. Set your study goals and subjects to generate a
            weekly schedule.
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
        href="/planner"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Planner
      </Link>
    </div>
  );
}
