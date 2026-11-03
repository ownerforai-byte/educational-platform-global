"use client";

import Link from "next/link";
import { Flame, Target, ListChecks, PlayCircle, Compass } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComingSoon } from "@/components/content/coming-soon";
import { entryStatus, topicHref } from "@/lib/progress/catalog";
import { getStreak, streakLabel } from "@/lib/streaks";
import { daysUntilExam, seedDailyPlan } from "@/lib/study-goals";
import { QUICK_LINKS } from "@/lib/navigation";
import { useStudyGoals } from "./use-study-goals";
import { useJourney } from "./use-journey";
import { useEffect, useState } from "react";

/** /dashboard: today hub, a presentation of the goals, streak and progress readers. */
export function DashboardView() {
  const { goals, ready } = useStudyGoals();
  const { entries, summary, loading } = useJourney();
  const [streak, setStreak] = useState(0);

  useEffect(() => setStreak(getStreak().count), []);

  const plan = seedDailyPlan(goals);
  const days = daysUntilExam(goals);
  const nextUp = entries.find((e) => entryStatus(e) === "in_progress");

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your study day in one place.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Flame className="h-4 w-4" /> Streak
            </CardTitle>
            <CardDescription>{streakLabel(streak)}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4" /> Exam
            </CardTitle>
            <CardDescription>
              {days === null
                ? "No exam date yet"
                : days >= 0
                  ? `${days} day${days === 1 ? "" : "s"} to go`
                  : "Exam date has passed"}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Journey</CardTitle>
            <CardDescription>
              {loading ? "Loading" : summary ? `${summary.completed} of ${summary.total} topics done` : "Sign in data unavailable"}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ListChecks className="h-4 w-4" /> Today&apos;s plan
          </CardTitle>
          <CardDescription>
            {goals.dailyMinutes} minutes a day, split over your subjects.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {!ready ? null : plan.length === 0 ? (
            <p>
              No subjects chosen yet.{" "}
              <Link href="/onboarding" className="font-semibold text-primary hover:underline">
                Set your goals
              </Link>
            </p>
          ) : (
            plan.map((item) => (
              <div key={item.subjectKey} className="flex justify-between">
                <span>{item.subjectName}</span>
                <span className="tabular-nums text-muted-foreground">{item.minutes} min</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PlayCircle className="h-4 w-4" /> Next up
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          {nextUp ? (
            <Link href={topicHref(nextUp)} className="font-semibold text-primary hover:underline">
              Continue {nextUp.topic?.title ?? nextUp.topicSlug ?? "your last topic"}
            </Link>
          ) : (
            <p className="text-muted-foreground">Open a topic and it will appear here.</p>
          )}
        </CardContent>
      </Card>

      <ComingSoon
        title="Weak-topic call-out"
        kind="Notes"
        message="Under progress. It awaits per-topic quiz attempt history (the quiz results store), which does not exist yet."
      />

      <div>
        <h2 className="mb-2 flex items-center gap-2 text-base font-semibold">
          <Compass className="h-4 w-4" /> Quick start
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border p-3 text-center text-sm font-medium hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
