"use client";

import Link from "next/link";
import { Flame, Sparkles, Target, Trophy } from "lucide-react";
import { useLiveStats } from "@/lib/hooks/use-live-stats";
import { xpForSets, xpLevel } from "@/lib/practice/xp";

/**
 * The live strip above Practice.
 *
 * Every number comes from the student's own scored sets (`quiz_history`) and
 * the shared XP rule — no sample data, no placeholder percentages. Before the
 * first scored set it shows the honest zero state and says what to do about it.
 */
export function PracticeStats() {
  const { loading, quizRows, overall } = useLiveStats();
  const xp = xpForSets(quizRows);
  const level = xpLevel(xp);
  const progressToNext =
    level.nextAt > 0
      ? Math.round(((xp - level.floor) / (level.nextAt - level.floor)) * 100)
      : 100;

  if (loading) {
    return (
      <div className="grid gap-3 sm:grid-cols-4" aria-busy="true" aria-live="polite">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-[74px] animate-pulse rounded-2xl border border-border bg-card" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      icon: Sparkles,
      label: "XP earned",
      value: xp.toLocaleString(),
      hint: level.title,
      tone: "text-primary",
    },
    {
      icon: Target,
      label: "Accuracy",
      value: `${overall.accuracy}%`,
      hint: `${overall.answered} questions answered`,
      tone: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Flame,
      label: "Sets scored",
      value: String(overall.quizzes),
      hint: overall.quizzes === 0 ? "No sets scored yet" : "Every one counts",
      tone: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Trophy,
      label: "Level",
      value: `L${level.level}`,
      hint:
        level.nextAt > 0
          ? `${(Math.max(0, level.nextAt - xp)).toLocaleString()} XP to next`
          : "Top level",
      tone: "text-violet-600 dark:text-violet-400",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-card p-3.5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <card.icon className={`h-3.5 w-3.5 ${card.tone}`} aria-hidden="true" />
              {card.label}
            </div>
            <p className="mt-1 text-xl font-black tabular-nums text-foreground">{card.value}</p>
            <p className="text-[11px] text-muted-foreground">{card.hint}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/70 bg-card px-3.5 py-2.5">
        <div
          className="h-1.5 min-w-[120px] flex-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressToNext}
          aria-label={`Progress to level ${level.level + 1}`}
        >
          <div className="h-full rounded-full bg-primary" style={{ width: `${progressToNext}%` }} />
        </div>
        <p className="text-[11px] text-muted-foreground">
          {xp === 0 ? (
            <>
              Your first scored set starts your XP.{" "}
              <Link href="/leaderboard" className="font-semibold text-primary hover:underline">
                See how ranking works
              </Link>
            </>
          ) : (
            <>
              {level.title} · see where you stand on the{" "}
              <Link href="/leaderboard" className="font-semibold text-primary hover:underline">
                leaderboard
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
