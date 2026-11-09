"use client";

/**
 * Weak-topic call-out — the feature the dashboard and report card used to
 * announce as "under progress, awaits the quiz results store". The store
 * exists (`quiz_history` via /api/ai-quiz-history), so this derives the call-out
 * from real per-topic accuracy: topics the student has actually answered
 * questions on but is still scoring below the weak threshold on.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Loader2, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getQuizHistory, type QuizHistoryRow } from "@/lib/api/ai-quiz-history";
import { accuracyByTopic, type AccuracyBucket } from "@/lib/analytics";

/** Below this accuracy a topic counts as weak. */
export const WEAK_ACCURACY_BELOW = 60;
/** At least this many answered questions before a topic is called weak. */
export const WEAK_MIN_ANSWERED = 4;

/**
 * Pure derivation: weak topics, weakest first. Exported for tests — the same
 * numbers the Analytics page shows, cut at the weak threshold.
 */
export function weakTopics(rows: QuizHistoryRow[]): AccuracyBucket[] {
  return accuracyByTopic(rows).filter(
    (t) => t.answered >= WEAK_MIN_ANSWERED && t.accuracy < WEAK_ACCURACY_BELOW,
  );
}

function WeakTopicRow({ topic, printable }: { topic: AccuracyBucket; printable: boolean }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-border/60 px-3 py-2">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{topic.label}</p>
        <p className="text-[11px] text-muted-foreground">
          {topic.correct}/{topic.answered} correct · {topic.quizzes}{" "}
          {topic.quizzes === 1 ? "set" : "sets"}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-rose-500"
            style={{ width: `${Math.max(4, topic.accuracy)}%` }}
          />
        </div>
        <span className="w-9 text-right text-xs font-bold tabular-nums text-rose-600 dark:text-rose-400">
          {topic.accuracy}%
        </span>
        {!printable && (
          <Link
            href="/practice"
            aria-label={`Practise ${topic.label}`}
            className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </li>
  );
}

export function WeakTopics({ variant = "card" }: { variant?: "card" | "report" }) {
  const printable = variant === "report";
  const [rows, setRows] = useState<QuizHistoryRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getQuizHistory(200)
      .then((r) => {
        if (!cancelled) setRows(r.rows);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const weak = rows ? weakTopics(rows).slice(0, 5) : [];
  const hasAttempts = (rows?.length ?? 0) > 0;

  return (
    <Card className={printable ? "" : "border-amber-500/30 bg-amber-500/[0.05]"}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Weak-topic call-out
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {rows === null && !failed ? (
          <p className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Reading your quiz history…
          </p>
        ) : failed ? (
          <p className="text-muted-foreground">
            Quiz history could not be loaded — the call-out will appear here once it is
            available.
          </p>
        ) : weak.length > 0 ? (
          <>
            <p className="text-xs text-muted-foreground">
              Below {WEAK_ACCURACY_BELOW}% accuracy on at least {WEAK_MIN_ANSWERED} answered
              questions. Practise these first:
            </p>
            <ul className="space-y-1.5">
              {weak.map((topic) => (
                <WeakTopicRow key={topic.key} topic={topic} printable={printable} />
              ))}
            </ul>
          </>
        ) : hasAttempts ? (
          <p className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            No weak topics right now — every topic you have practised is above{" "}
            {WEAK_ACCURACY_BELOW}%. Keep the streak going.
          </p>
        ) : (
          <p className="flex items-center gap-2 text-muted-foreground">
            <Target className="h-4 w-4 text-muted-foreground" />
            No quiz attempts yet. Finish a scored practice set and weak topics show up here.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
