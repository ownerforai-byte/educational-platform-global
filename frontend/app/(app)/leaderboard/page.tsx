"use client";

import Link from "next/link";
import { Trophy, ArrowLeft, Crown, Medal } from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";

const SUBJECTS = SYLLABUS.flatMap((cls) =>
  cls.subjects.map((s) => ({
    label: `${s.name} — ${cls.name}`,
    slug: s.slug,
    classSlug: cls.slug,
  })),
);

// Sample leaderboard data — these are placeholder entries.
// When the backend quiz analytics endpoint is live, this will fetch real data.
const SAMPLE_ENTRIES = [
  { rank: 1, name: "Aarav S.", score: 940, quizzes: 32, accuracy: 87 },
  { rank: 2, name: "Priya K.", score: 870, quizzes: 28, accuracy: 82 },
  { rank: 3, name: "Rohan M.", score: 810, quizzes: 25, accuracy: 79 },
  { rank: 4, name: "Sita R.", score: 750, quizzes: 22, accuracy: 75 },
  { rank: 5, name: "Anish T.", score: 690, quizzes: 19, accuracy: 72 },
];

const RANK_ICONS: Record<number, typeof Crown> = {
  1: Crown,
  2: Medal,
  3: Trophy,
};

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Trophy className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="mt-1 text-muted-foreground">
            Weekly top scorers by subject from quiz and SRS activity.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-3">
          <h2 className="font-semibold text-foreground">This week — all subjects</h2>
          <p className="text-sm text-muted-foreground">Top performers across all quizzes</p>
        </div>
        <div className="divide-y divide-border/40">
          {SAMPLE_ENTRIES.map((e) => {
            const Icon = RANK_ICONS[e.rank] ?? null;
            return (
              <div
                key={e.rank}
                className="flex items-center gap-4 px-5 py-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
                  {Icon ? <Icon className="h-4 w-4" /> : e.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{e.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {e.quizzes} quizzes • {e.accuracy}% accuracy
                  </p>
                </div>
                <span className="font-mono text-lg font-bold text-primary">
                  {e.score}
                </span>
              </div>
            );
          })}
        </div>
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
