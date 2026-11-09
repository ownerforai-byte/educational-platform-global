"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getQuizHistory, type QuizHistoryRow } from "@/lib/api/ai-quiz-history";
import {
  accuracyBySubject,
  accuracyByTopic,
  completionByUnit,
  overallAccuracy,
  weeklyTrend,
} from "@/lib/analytics";
import { useJourney } from "./use-journey";
import { CohortComparison } from "./cohort-comparison";

function Bar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded bg-muted" role="presentation">
      <div className="h-2 rounded bg-primary" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

/** /analytics: accuracy by subject/topic, unit completion and weekly trend from quiz history + progress. */
export function AnalyticsView() {
  const { entries, loading: journeyLoading } = useJourney();
  const [rows, setRows] = useState<QuizHistoryRow[]>([]);
  const [quizLoading, setQuizLoading] = useState(true);
  const [quizFailed, setQuizFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getQuizHistory(200)
      .then((r) => !cancelled && setRows(r.rows))
      .catch(() => !cancelled && setQuizFailed(true))
      .finally(() => !cancelled && setQuizLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const subjects = useMemo(() => accuracyBySubject(rows), [rows]);
  const topics = useMemo(() => accuracyByTopic(rows).slice(0, 8), [rows]);
  const units = useMemo(() => completionByUnit(entries).filter((u) => u.completed > 0).slice(0, 8), [entries]);
  const trend = useMemo(() => weeklyTrend(rows, entries).slice(-8), [rows, entries]);
  const overall = useMemo(() => overallAccuracy(rows), [rows]);

  if (quizLoading || journeyLoading) {
    return <div className="container max-w-4xl py-8 text-sm text-muted-foreground">Loading analytics…</div>;
  }

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <BarChart3 className="h-6 w-6" /> Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Built from your AI quiz history and your topic progress.
          {overall.quizzes > 0 && ` Overall ${overall.accuracy}% across ${overall.quizzes} quizzes.`}
        </p>
      </div>

      {quizFailed || rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {quizFailed ? "Quiz history could not be loaded." : "No scored quizzes yet. Take an AI quiz and your accuracy shows up here."}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Accuracy by subject</CardTitle>
              <CardDescription>Weakest first</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {subjects.map((b) => (
                <div key={b.key} className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>{b.label}</span><span>{b.accuracy}%</span></div>
                  <Bar value={b.accuracy} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Accuracy by topic</CardTitle>
              <CardDescription>Weakest eight quiz topics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {topics.length === 0 && <p className="text-sm text-muted-foreground">Quizzes carry no topic yet.</p>}
              {topics.map((b) => (
                <div key={b.key} className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>{b.label}</span><span>{b.accuracy}%</span></div>
                  <Bar value={b.accuracy} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Units you are working through</CardTitle>
          <CardDescription>Completed topics per unit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {units.length === 0 && <p className="text-sm text-muted-foreground">Complete a topic to see unit progress.</p>}
          {units.map((u) => (
            <div key={u.key} className="space-y-1 text-sm">
              <div className="flex justify-between"><span>{u.label}</span><span>{u.completed}/{u.total}</span></div>
              <Bar value={u.percent} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly trend</CardTitle>
          <CardDescription>Last eight active weeks</CardDescription>
        </CardHeader>
        <CardContent>
          {trend.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing recorded yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-1">Week of</th><th>Quizzes</th><th>Accuracy</th><th>Topics done</th>
                </tr>
              </thead>
              <tbody>
                {trend.map((p) => (
                  <tr key={p.week}>
                    <td className="py-1">{p.week}</td>
                    <td>{p.quizzes}</td>
                    <td>{p.answered > 0 ? `${p.accuracy}%` : "-"}</td>
                    <td>{p.topicsCompleted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <CohortComparison />
    </div>
  );
}
