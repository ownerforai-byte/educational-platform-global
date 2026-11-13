"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight, History } from "lucide-react";
import { listPracticeAttempts, type PracticeAttempt } from "@/features/practice/history";
import { LIVE_STATS_EVENT } from "@/lib/hooks/use-live-stats";

const NO_ATTEMPTS: PracticeAttempt[] = [];

function useAttempts(): PracticeAttempt[] {
  return useSyncExternalStore(
    (notify) => {
      window.addEventListener(LIVE_STATS_EVENT, notify);
      return () => window.removeEventListener(LIVE_STATS_EVENT, notify);
    },
    listPracticeAttempts,
    () => NO_ATTEMPTS,
  );
}

export default function PracticeHistoryPage() {
  const attempts = useAttempts();

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-3 py-6 sm:px-4 sm:py-8">
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Practice</p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
          <History className="h-6 w-6 text-primary" aria-hidden="true" />
          Practice history
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every set you finish on this device, newest first. Open one to review the questions you missed.
        </p>
      </header>

      {attempts.length === 0 ? (
        <section className="rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-base font-bold">No scored sets on this device yet</h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Finish a multiple-choice or writing set and it will be listed here with its score.
          </p>
          <Link
            href="/practice"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            Start practising
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      ) : (
        <ol className="space-y-2">
          {attempts.map((attempt) => (
            <li key={attempt.id}>
              <Link
                href={`/practice/history/${attempt.id}`}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-foreground">
                    {attempt.subjectLabel} · {attempt.mode === "mcq" ? "Multiple choice" : "Writing"}
                    {attempt.timed ? " · Timed" : ""}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-muted-foreground">
                    {new Date(attempt.createdAt).toLocaleString()}
                    {attempt.topic ? ` · ${attempt.topic}` : ""}
                    {attempt.difficulty ? ` · ${attempt.difficulty}` : ""}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-lg font-black tabular-nums text-foreground">{attempt.scorePct}%</span>
                  <span className="text-[11px] text-muted-foreground">+{attempt.xp} XP</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
