"use client";

import Link from "next/link";
import {
  ArrowRight,
  Crown,
  Info,
  Medal,
  RefreshCw,
  Sparkles,
  Trophy,
  TrendingUp,
  Users,
} from "lucide-react";
import { refreshLeaderboard, useLeaderboard } from "@/lib/hooks/use-leaderboard";
import type { LeaderboardEntry, LeaderboardResponse } from "@/lib/api/leaderboard";
import { xpLevel } from "@/lib/practice/xp";

const PODIUM_STYLE = [
  {
    ring: "ring-amber-400/50",
    badge: "bg-amber-400 text-amber-950",
    icon: Crown,
    label: "1st",
  },
  {
    ring: "ring-slate-300/60",
    badge: "bg-slate-300 text-slate-900",
    icon: Medal,
    label: "2nd",
  },
  {
    ring: "ring-orange-400/40",
    badge: "bg-orange-400 text-orange-950",
    icon: Medal,
    label: "3rd",
  },
] as const;

function accuracyTone(pct: number): string {
  if (pct >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (pct >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-muted-foreground";
}

function Skeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      <div className="h-24 animate-pulse rounded-2xl border border-border bg-card" />
      <div className="grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl border border-border bg-card" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-2xl border border-border bg-card" />
    </div>
  );
}

function Podium({ entries }: { entries: LeaderboardEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <section aria-labelledby="podium-heading" className="space-y-2">
      <h2 id="podium-heading" className="sr-only">
        Top three students
      </h2>
      <ol className="grid gap-3 sm:grid-cols-3">
        {entries.slice(0, 3).map((entry, index) => {
          const style = PODIUM_STYLE[index];
          const Icon = style.icon;
          return (
            <li
              key={`${entry.rank}-${entry.name}`}
              className={`rounded-2xl border border-border bg-card p-4 ring-1 ${style.ring} ${
                entry.isYou ? "bg-primary/[0.04]" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-black uppercase tracking-wide ${style.badge}`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {style.label}
                </span>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {xpLevel(entry.xp).title}
                </span>
              </div>
              <p className="mt-2.5 truncate text-sm font-bold text-foreground">
                {entry.name}
                {entry.isYou && (
                  <span className="ml-1.5 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                    You
                  </span>
                )}
              </p>
              <p className="mt-1 text-2xl font-black tabular-nums text-foreground">
                {entry.xp.toLocaleString()}
                <span className="ml-1 text-xs font-semibold text-muted-foreground">XP</span>
              </p>
              <p className={`mt-0.5 text-[11px] font-medium ${accuracyTone(entry.accuracy)}`}>
                {entry.accuracy}% accuracy · {entry.answered} answered
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function YourPosition({
  data,
  onRefresh,
}: {
  data: LeaderboardResponse;
  onRefresh: () => void;
}) {
  const { you } = data;

  if (!you) {
    return (
      <section className="rounded-2xl border border-primary/25 bg-primary/[0.05] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-foreground">You are not on the board yet</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Complete one practice set — an MCQ run or a writing run — and your XP appears here
              straight away.
            </p>
          </div>
          <Link
            href="/practice"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
          >
            Start practising
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }

  const level = xpLevel(you.xp);
  const progressToNext =
    level.nextAt > 0
      ? Math.min(100, Math.max(0, Math.round(((you.xp - level.floor) / (level.nextAt - level.floor)) * 100)))
      : 100;

  return (
    <section
      aria-labelledby="you-heading"
      className="rounded-2xl border border-primary/25 bg-primary/[0.05] p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-base font-black text-primary-foreground tabular-nums">
            #{you.rank}
          </span>
          <div>
            <h2 id="you-heading" className="text-sm font-bold text-foreground">
              Your position
            </h2>
            <p className="text-xs text-muted-foreground">
              {level.title} · {you.sets} scored {you.sets === 1 ? "set" : "sets"} ·{" "}
              {you.answered} answered
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xl font-black tabular-nums text-foreground">
            {you.xp.toLocaleString()}
            <span className="ml-1 text-xs font-semibold text-muted-foreground">XP</span>
          </p>
          <p className={`text-[11px] font-semibold ${accuracyTone(you.accuracy)}`}>
            {you.accuracy}% accuracy
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary/15"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressToNext}
          aria-label="Progress to the next level"
        >
          <div className="h-full rounded-full bg-primary" style={{ width: `${progressToNext}%` }} />
        </div>
        <span className="text-[11px] font-medium text-muted-foreground">
          {level.nextAt > 0
            ? `${Math.max(0, level.nextAt - you.xp).toLocaleString()} XP to level ${level.level + 1}`
            : "Top level reached"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-primary/15 pt-2.5">
        <p className="text-xs text-muted-foreground">
          {you.rank === 1 ? (
            <>
              <span className="font-semibold text-foreground">You lead the board.</span> Keep your
              accuracy above 80% to hold the 25 XP set bonus.
            </>
          ) : you.nextName ? (
            <>
              <span className="font-semibold text-foreground">{you.gapToNext} XP</span> behind{" "}
              {you.nextName}
            </>
          ) : (
            "Keep practising to climb."
          )}
        </p>
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RefreshCw className="h-3 w-3" aria-hidden="true" />
          Refresh
        </button>
      </div>
    </section>
  );
}

function RuleCard({ rule }: { rule: LeaderboardResponse["rule"] }) {
  return (
    <section
      aria-labelledby="rule-heading"
      className="rounded-2xl border border-border bg-card p-4 sm:p-5"
    >
      <h2 id="rule-heading" className="flex items-center gap-2 text-sm font-bold text-foreground">
        <Info className="h-4 w-4 text-primary" aria-hidden="true" />
        How XP is earned
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        XP comes from quiz accuracy only. Opening a set, watching time pass, or repeating a
        question you already know earns nothing extra.
      </p>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        {[
          {
            term: "Correct MCQ",
            detail: `${rule.correctChoice} XP`,
          },
          {
            term: "Wrong MCQ (answered)",
            detail: `${rule.wrongChoice} XP — effort, not accuracy`,
          },
          {
            term: "Writing set",
            detail: `up to ${rule.writingPerQuestion} XP per question × your score %, halved below ${rule.writingWeakBelowPct}%`,
          },
          {
            term: "Set accuracy bonus",
            detail: `+${rule.bonus.at80} at 80% · +${rule.bonus.at60} at 60% · +${rule.bonus.at40} at 40%`,
          },
        ].map((item) => (
          <div key={item.term} className="rounded-xl border border-border/70 bg-background p-3">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {item.term}
            </dt>
            <dd className="mt-0.5 text-xs font-medium text-foreground">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function LeaderboardPage() {
  const state = useLeaderboard();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-3 py-6 sm:px-4 sm:py-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            Leaderboard
          </p>
          <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
            Ranked by XP from real accuracy
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Every point is earned in a scored practice set. Names are shown first-name only —
            nobody&apos;s full name or email appears on this board.
          </p>
        </div>
        {state.status === "ready" && (
          <p className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {state.data.totals.students} students · {state.data.totals.sets} scored sets
          </p>
        )}
      </header>

      {state.status === "loading" && <Skeleton />}

      {state.status === "unauthorized" && (
        <section className="rounded-2xl border border-border bg-card p-8 text-center">
          <Trophy className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-3 text-base font-bold text-foreground">Sign in to see the board</h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Ranking is tied to your account&apos;s scored practice sets, so the board needs you to
            be signed in.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90"
          >
            Sign in
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      )}

      {state.status === "error" && (
        <section className="rounded-2xl border border-rose-500/30 bg-rose-500/[0.05] p-6 text-center">
          <h2 className="text-base font-bold text-foreground">The board could not load</h2>
          <p className="mt-1 text-sm text-muted-foreground">{state.message}</p>
          <button
            type="button"
            onClick={() => refreshLeaderboard()}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            Try again
          </button>
        </section>
      )}

      {state.status === "ready" && (
        <>
          {!state.data.migrated && (
            <p className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] px-3.5 py-2.5 text-xs text-amber-800 dark:text-amber-300">
              Quiz history is not set up on this deployment yet, so nobody can be ranked. Once it is
              migrated, every completed set counts automatically.
            </p>
          )}

          <YourPosition data={state.data} onRefresh={() => refreshLeaderboard()} />

          {state.data.entries.length === 0 ? (
            <section className="rounded-2xl border border-border bg-card p-8 text-center">
              <TrendingUp className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <h2 className="mt-3 text-base font-bold text-foreground">No scored sets yet</h2>
              <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
                The board fills up as soon as students finish practice sets. Yours would be the
                first.
              </p>
              <Link
                href="/practice"
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Open Practice
              </Link>
            </section>
          ) : (
            <>
              <Podium entries={state.data.entries} />

              <section
                aria-labelledby="table-heading"
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <h2 id="table-heading" className="text-sm font-bold text-foreground">
                    Full ranking
                  </h2>
                  <p className="text-[11px] text-muted-foreground">
                    Top {state.data.entries.length} · ties share a rank
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <caption className="sr-only">
                      Students ranked by XP earned from practice accuracy
                    </caption>
                    <thead>
                      <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                        <th scope="col" className="w-14 px-4 py-2 font-semibold">
                          Rank
                        </th>
                        <th scope="col" className="px-2 py-2 font-semibold">
                          Student
                        </th>
                        <th scope="col" className="w-[34%] px-2 py-2 font-semibold">
                          XP
                        </th>
                        <th scope="col" className="w-24 px-2 py-2 text-right font-semibold">
                          Accuracy
                        </th>
                        <th scope="col" className="w-20 px-4 py-2 text-right font-semibold">
                          Sets
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.data.entries.map((entry) => {
                        const maxXp = state.data.entries[0]?.xp || 1;
                        const width = Math.max(2, Math.round((entry.xp / maxXp) * 100));
                        return (
                          <tr
                            key={`${entry.rank}-${entry.name}`}
                            aria-current={entry.isYou ? "true" : undefined}
                            className={`border-b border-border/40 last:border-0 ${
                              entry.isYou ? "bg-primary/[0.05]" : ""
                            }`}
                          >
                            <td className="px-4 py-2.5">
                              <span
                                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-xs font-bold tabular-nums ${
                                  entry.rank <= 3
                                    ? "bg-amber-400/20 text-amber-700 dark:text-amber-300"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {entry.rank}
                              </span>
                            </td>
                            <td className="px-2 py-2.5">
                              <span className="font-semibold text-foreground">{entry.name}</span>
                              {entry.isYou && (
                                <span className="ml-1.5 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                                  You
                                </span>
                              )}
                              <span className="ml-2 text-[11px] text-muted-foreground">
                                {xpLevel(entry.xp).title}
                              </span>
                            </td>
                            <td className="px-2 py-2.5">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-full max-w-[160px] overflow-hidden rounded-full bg-muted">
                                  <div
                                    className={`h-full rounded-full ${entry.isYou ? "bg-primary" : "bg-primary/50"}`}
                                    style={{ width: `${width}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold tabular-nums text-foreground">
                                  {entry.xp.toLocaleString()}
                                </span>
                              </div>
                            </td>
                            <td className={`px-2 py-2.5 text-right text-xs font-semibold ${accuracyTone(entry.accuracy)}`}>
                              {entry.accuracy}%
                            </td>
                            <td className="px-4 py-2.5 text-right text-xs tabular-nums text-muted-foreground">
                              {entry.sets}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          <RuleCard rule={state.data.rule} />
        </>
      )}
    </div>
  );
}
