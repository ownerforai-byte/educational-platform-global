"use client";

import Link from "next/link";
import { Flame, Target, ListChecks, PlayCircle, Compass, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { entryStatus, topicHref } from "@/lib/progress/catalog";
import { getStreak, streakLabel } from "@/lib/streaks";
import { daysUntilExam, seedDailyPlan } from "@/lib/study-goals";
import { ACCESS_LABELS, accessLevelFor } from "@/lib/core/access-level";
import {
  QUICK_LINKS,
  quickLinkMinTier,
  quickLinkUnlocked,
} from "@/lib/core/navigation";
import { useSession } from "@/features/auth/hooks/use-session";
import { useStudyGoals } from "./use-study-goals";
import { useJourney } from "./use-journey";
import { WeakTopics } from "./weak-topics";
import { useEffect, useState } from "react";

/** /dashboard: today hub, a presentation of the goals, streak and progress readers. */
export function DashboardView() {
  const { user } = useSession();
  const { goals, ready } = useStudyGoals();
  const { entries, summary, loading } = useJourney();
  const [streak, setStreak] = useState(0);

  useEffect(() => setStreak(getStreak().count), []);

  const plan = seedDailyPlan(goals);
  const days = daysUntilExam(goals);
  const nextUp = entries.find((e) => entryStatus(e) === "in_progress");

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your study day in one place.</p>
        </div>
        {/* The dashboard speaks the viewer's rung: the data is the same for
            everyone, the quick links below open at or below it. */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
          <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
          {ACCESS_LABELS[accessLevelFor(user)]} dashboard
        </span>
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

      <WeakTopics />

      <div>
        <h2 className="mb-2 flex items-center gap-2 text-base font-semibold">
          <Compass className="h-4 w-4" /> Quick start
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUICK_LINKS.map((link) => {
            const tier = accessLevelFor(user);
            if (!quickLinkUnlocked(tier, link.href)) {
              return (
                <span
                  key={link.href}
                  aria-disabled="true"
                  title={`${link.label} opens at ${ACCESS_LABELS[quickLinkMinTier(link.href)]}`}
                  className="cursor-not-allowed rounded-lg border border-border/60 bg-muted/40 p-3 text-center text-sm font-medium text-muted-foreground/50 opacity-60 grayscale"
                >
                  {link.label}
                </span>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border p-3 text-center text-sm font-medium hover:bg-muted"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
