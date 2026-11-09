"use client";

/**
 * /achievements — the one place the platform's recognition systems meet:
 * scholar level (XP), study streak, certificates and the leaderboard rank.
 * Each tile is derived from the same stores the dedicated pages use, so the
 * hub can never disagree with them; every tile links to its full page.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Flame,
  GraduationCap,
  Loader2,
  Medal,
  Target,
  Trophy,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/features/auth/hooks/use-session";
import { getProgress } from "@/lib/api/progress";
import { getLeaderboard } from "@/lib/api/leaderboard";
import { entryStatus, groupJourney, summarizeJourney } from "@/lib/progress/catalog";
import { streakLabel } from "@/lib/streaks";
import { useStreakCount } from "@/lib/hooks/use-streak";
import { calculateScholarLevel } from "@/app/(app)/profile/page";
import type { ProgressEntry } from "@/types/api";

/** Unit certified = every topic complete; subject certified = every unit. */
function certificateCounts(entries: ProgressEntry[]): { units: number; subjects: number } {
  let units = 0;
  let subjects = 0;
  for (const group of groupJourney(entries)) {
    const byUnit = new Map<string, { total: number; done: number }>();
    for (const entry of group.entries) {
      const key = entry.unitSlug ?? "general";
      const unit = byUnit.get(key) ?? { total: 0, done: 0 };
      unit.total += 1;
      if (entryStatus(entry) === "completed") unit.done += 1;
      byUnit.set(key, unit);
    }
    const certified = [...byUnit.values()].filter((u) => u.total > 0 && u.done === u.total).length;
    units += certified;
    if (byUnit.size > 0 && certified === byUnit.size) subjects += 1;
  }
  return { units, subjects };
}

export default function AchievementsPage() {
  const { user, isLoading } = useSession();
  const [entries, setEntries] = useState<ProgressEntry[] | null>(null);
  const [rank, setRank] = useState<{ rank: number; students: number } | null>(null);
  const streak = useStreakCount();

  useEffect(() => {
    let cancelled = false;
    getProgress()
      .then((rows) => {
        if (!cancelled) setEntries(rows);
      })
      .catch(() => {
        if (!cancelled) setEntries([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    getLeaderboard()
      .then((board) => {
        if (cancelled) return;
        const cohort = board.cohort?.students ?? 0;
        setRank(board.you ? { rank: board.you.rank, students: cohort } : null);
      })
      .catch(() => {
        /* leaderboard optional on this page */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const summary = useMemo(() => summarizeJourney(entries ?? []), [entries]);
  const certificates = useMemo(() => certificateCounts(entries ?? []), [entries]);
  const level = useMemo(
    () => calculateScholarLevel(summary.completed, user?.credits ?? 0),
    [summary.completed, user?.credits],
  );

  const milestones = [
    {
      label: "First topic completed",
      achieved: summary.completed >= 1,
      href: "/progress",
    },
    {
      label: "5 topics mastered",
      achieved: summary.completed >= 5,
      href: "/progress",
    },
    {
      label: "Level 2 — Curious Explorer",
      achieved: level.level >= 2,
      href: "/profile",
    },
    {
      label: "3-day study streak",
      achieved: streak >= 3,
      href: "/streaks",
    },
    {
      label: "First unit certificate",
      achieved: certificates.units >= 1,
      href: "/certificates",
    },
    {
      label: "Ranked on the leaderboard",
      achieved: rank !== null,
      href: "/leaderboard",
    },
    {
      label: "20 topics mastered",
      achieved: summary.completed >= 20,
      href: "/progress",
    },
    {
      label: "Subject certificate",
      achieved: certificates.subjects >= 1,
      href: "/certificates",
    },
  ];

  if (isLoading || entries === null) {
    return (
      <div className="container max-w-4xl py-8 space-y-6">
        <Skeleton className="h-24 w-full" />
        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Trophy className="h-6 w-6 text-amber-500" /> Achievements
        </h1>
        <p className="text-sm text-muted-foreground">
          Every award the platform tracks, in one place — earned from real study, not clicks.
        </p>
      </div>

      {/* Level + streak headline */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-card to-background">
        <CardContent className="pt-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Scholar Rank
                </p>
                <h2 className="text-lg font-bold text-foreground">
                  Level {level.level} · {level.title}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-orange-500">
              <Flame className="h-5 w-5" />
              {streakLabel(streak)}
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">
                {level.currentXp} XP · {level.nextPerk}
              </span>
              <span className="text-foreground">{level.progressPercent}%</span>
            </div>
            <Progress value={level.progressPercent} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Award tiles */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="border-amber-500/30 bg-amber-500/[0.06]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-amber-500" /> Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-black tabular-nums text-foreground">
              {certificates.units + certificates.subjects}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {certificates.units} unit · {certificates.subjects} subject certificates earned
            </p>
            <Link
              href="/certificates"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Open the award shelf <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Medal className="h-4 w-4 text-violet-500" /> Leaderboard rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            {rank ? (
              <>
                <p className="text-2xl font-black tabular-nums text-foreground">
                  #{rank.rank}
                  <span className="ml-1 text-xs font-semibold text-muted-foreground">
                    of {rank.students}
                  </span>
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Ranked by XP earned from scored practice sets.
                </p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                Not ranked yet — finish one scored practice set and your rank appears.
              </p>
            )}
            <Link
              href="/leaderboard"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              See the board <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-emerald-500" /> Milestones
          </CardTitle>
          <CardDescription>
            {milestones.filter((m) => m.achieved).length} of {milestones.length} unlocked.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {milestones.map((milestone) => (
              <li key={milestone.label}>
                <Link
                  href={milestone.href}
                  className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-xs transition-colors ${
                    milestone.achieved
                      ? "border-emerald-500/40 bg-emerald-500/[0.06] font-semibold text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {milestone.achieved ? (
                      <Award className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
                    ) : (
                      <Loader2 className="h-3.5 w-3.5 shrink-0 opacity-40" aria-hidden="true" />
                    )}
                    {milestone.label}
                  </span>
                  {milestone.achieved ? (
                    <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase">Locked</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
