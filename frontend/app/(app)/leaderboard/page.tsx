"use client";

/**
 * Live performance board. There is no cross-user leaderboard endpoint, so the
 * honest live view ranks the student's OWN subjects by real quiz accuracy.
 * The old version rendered five invented people with hardcoded scores.
 */

import Link from "next/link";
import { Trophy, ArrowLeft, Crown, Medal } from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";
import { useLiveStats } from "@/lib/hooks/use-live-stats";

const SUBJECTS = SYLLABUS.flatMap((cls) =>
  cls.subjects.map((s) => ({
    label: `${s.name} — ${cls.name}`,
    slug: s.slug,
    classSlug: cls.slug,
  })),
);

const RANK_ICONS: Record<number, typeof Crown> = {
  1: Crown,
  2: Medal,
  3: Trophy,
};

export default function LeaderboardPage() {
  const { loading, subjectAccuracy, overall } = useLiveStats();

  // `accuracyBySubject` returns weakest-first; a board ranks strongest-first.
  const entries = [...subjectAccuracy].sort(
    (a, b) => b.accuracy - a.accuracy || b.correct - a.correct,
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Trophy className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Performance Board</h1>
          <p className="mt-1 text-muted-foreground">
            Your subjects ranked by live quiz accuracy — {overall.quizzes} quizzes, {overall.answered} questions answered.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-3">
          <h2 className="font-semibold text-foreground">All-time — your real results</h2>
          <p className="text-sm text-muted-foreground">
            Overall accuracy {overall.accuracy}% · no sample scores
          </p>
        </div>
        {entries.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            {loading
              ? "Loading your real results…"
              : "No quizzes scored yet. Complete a quiz to see your subjects ranked here."}
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {entries.map((e, index) => {
              const rank = index + 1;
              const Icon = RANK_ICONS[rank] ?? null;
              return (
                <div key={e.key} className="flex items-center gap-4 px-5 py-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
                    {Icon ? <Icon className="h-4 w-4" /> : rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{e.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {e.quizzes} quizzes • {e.accuracy}% accuracy
                    </p>
                  </div>
                  <span className="font-mono text-lg font-bold text-primary">
                    {e.correct}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Subject filter chips */}
      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Browse by subject</h2>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <Link
              key={`${s.classSlug}/${s.slug}`}
              href={`/quiz/${s.slug}`}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/practice"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Practice Hub
      </Link>
    </div>
  );
}
