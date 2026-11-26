"use client";

import Link from "next/link";
import { Flame, Target, ListChecks, PlayCircle, Compass, GraduationCap, Layers, CircleCheck } from "lucide-react";
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
import {
  buildCards,
  dueQueue,
  isoDay,
  readSrsStore,
  type SrsStore,
} from "@/lib/srs";
import { getQuizHistory, type QuizHistoryRow } from "@/lib/api/ai-quiz-history";
import { overallAccuracy } from "@/lib/analytics";
import { useSession } from "@/features/auth/hooks/use-session";
import { useStudyGoals } from "./use-study-goals";
import { useJourney } from "./use-journey";
import { useSubjectBank } from "./use-subject-bank";
import { WeakTopics } from "./weak-topics";
import { useCallback, useEffect, useMemo, useState } from "react";

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

  // Due SRS reviews across the viewer's goal subjects — the SM-2 scheduler
  // already exists; the dashboard is where it becomes visible daily.
  const [dueCounts, setDueCounts] = useState<Record<string, number | null>>({});
  const reportDue = useCallback((key: string, n: number) => {
    setDueCounts((current) => (current[key] === n ? current : { ...current, [key]: n }));
  }, []);
  const dueTotal = goals.subjects.reduce<number | null>((sum, key) => {
    const n = dueCounts[key];
    if (n === undefined || n === null) return sum; // still loading
    return (sum ?? 0) + n;
  }, null);
  const dueKnown = goals.subjects.every((key) => typeof dueCounts[key] === "number");

  // Practice accuracy from the real quiz history (no invented numbers).
  const [quizRows, setQuizRows] = useState<QuizHistoryRow[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    getQuizHistory()
      .then((r) => !cancelled && setQuizRows(r.rows))
      .catch(() => !cancelled && setQuizRows([]));
    return () => {
      cancelled = true;
    };
  }, []);
  const overall = useMemo(() => (quizRows ? overallAccuracy(quizRows) : null), [quizRows]);

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Layers className="h-4 w-4" /> Reviews due
            </CardTitle>
            <CardDescription>
              {!ready ? (
                "Loading"
              ) : goals.subjects.length === 0 ? (
                <Link href="/onboarding" className="font-semibold text-primary hover:underline">
                  Pick subjects to schedule reviews
                </Link>
              ) : !dueKnown ? (
                "Counting…"
              ) : (dueTotal ?? 0) === 0 ? (
                "Nothing due — keep the streak"
              ) : (
                <Link href="/srs" className="font-semibold text-primary hover:underline">
                  {dueTotal} card{(dueTotal ?? 0) === 1 ? "" : "s"} due today — review now
                </Link>
              )}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Per-subject SRS due counters (child components keep hook order stable) */}
      {goals.subjects.map((key) => (
        <SubjectDueCount key={key} subjectKey={key} onCount={reportDue} />
      ))}

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
            plan.map((item) => {
              const [classSlug, subjectSlug] = item.subjectKey.split("/");
              return (
                <div key={item.subjectKey} className="flex items-center justify-between gap-2">
                  <Link
                    href={`/${classSlug}/${subjectSlug}`}
                    className="font-medium text-foreground hover:text-primary hover:underline"
                  >
                    {item.subjectName}
                  </Link>
                  <span className="tabular-nums text-muted-foreground">{item.minutes} min</span>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CircleCheck className="h-4 w-4" /> Practice accuracy
            </CardTitle>
            <CardDescription>
              {overall === null
                ? "Loading"
                : overall.answered === 0
                  ? "No practice yet"
                  : `${overall.answered} answers across ${overall.quizzes} quizz${overall.quizzes === 1 ? "" : "es"}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            {overall === null || overall.answered === 0 ? (
              <Link href="/quiz" className="font-semibold text-primary hover:underline">
                Start a practice quiz
              </Link>
            ) : (
              <p>
                <span className="text-2xl font-extrabold tabular-nums">{Math.round(overall.accuracy)}%</span>{" "}
                <span className="text-muted-foreground">correct so far — </span>
                <Link href="/analytics" className="font-semibold text-primary hover:underline">
                  see the breakdown
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      </div>

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

/**
 * Counts this subject's due SRS cards and reports it to the dashboard.
 * A child component (not a loop body) so hook order stays stable; reuses the
 * exact readers the /srs screen uses — buildCards + dueQueue + readSrsStore.
 */
function SubjectDueCount({
  subjectKey,
  onCount,
}: {
  subjectKey: string;
  onCount: (key: string, due: number) => void;
}) {
  const { bank } = useSubjectBank(subjectKey);
  const [store, setStore] = useState<SrsStore>({});
  useEffect(() => setStore(readSrsStore()), []);
  useEffect(() => {
    if (!bank) return;
    const cards = buildCards(subjectKey, bank);
    onCount(subjectKey, dueQueue(cards, store, isoDay(new Date())).due.length);
  }, [bank, store, subjectKey, onCount]);
  return null;
}
