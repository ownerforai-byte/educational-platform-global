"use client";

/**
 * Live quiz result. The old page showed three hardcoded "—" placeholders and
 * a promise that backend results would arrive "once loaded". It now loads the
 * real saved quiz by session id and renders the actual score, accuracy and
 * question-by-question review.
 */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Target, TrendingUp, RotateCcw, Loader2 } from "lucide-react";
import {
  getQuizHistoryQuiz,
  type QuizHistoryQuiz,
} from "@/lib/api/ai-quiz-history";

export default function ResultsPage() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params?.sessionId ?? "";
  const [quiz, setQuiz] = useState<QuizHistoryQuiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let active = true;
    setLoading(true);
    getQuizHistoryQuiz(sessionId)
      .then((data) => {
        if (!active) return;
        setQuiz(data);
        setFailed(false);
      })
      .catch(() => {
        if (active) setFailed(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [sessionId]);

  const answered = quiz?.answered ?? 0;
  const correct = quiz?.correct ?? 0;
  const accuracy =
    quiz?.scorePct ?? (answered > 0 ? Math.round((correct / answered) * 100) : 0);

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quiz Results</h1>
        <p className="mt-2 text-muted-foreground">
          {quiz?.title ?? (loading ? "Loading session…" : "Session")} ·{" "}
          <span className="font-mono">{sessionId}</span>
        </p>
      </div>

      {/* Live score summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center">
          <Target className="mx-auto h-5 w-5 text-muted-foreground" />
          <p className="mt-2 text-3xl font-bold text-foreground">
            {loading ? <Loader2 className="mx-auto h-7 w-7 animate-spin" /> : `${correct}/${answered}`}
          </p>
          <p className="text-sm text-muted-foreground">Score</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center">
          <TrendingUp className="mx-auto h-5 w-5 text-muted-foreground" />
          <p className="mt-2 text-3xl font-bold text-foreground">{loading ? "…" : `${accuracy}%`}</p>
          <p className="text-sm text-muted-foreground">Accuracy</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center">
          <Clock className="mx-auto h-5 w-5 text-muted-foreground" />
          <p className="mt-2 text-3xl font-bold text-foreground">{loading ? "…" : answered}</p>
          <p className="text-sm text-muted-foreground">Questions answered</p>
        </div>
      </div>

      {failed && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-center text-sm text-muted-foreground">
          This session could not be loaded. It may have been deleted, or you may
          need to sign in to see your saved quiz history.
        </div>
      )}

      {!loading && !failed && quiz && quiz.questions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Question review</h2>
          {quiz.questions.map((q, index) => (
            <div key={index} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-sm font-medium text-foreground">
                {index + 1}. {q.prompt}
              </p>
              <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Correct answer: {q.options[q.correctIndex] ?? "—"}
              </p>
              {q.explanation && (
                <p className="mt-1 text-xs text-muted-foreground">{q.explanation}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && !failed && (!quiz || quiz.questions.length === 0) && (
        <div className="rounded-2xl border border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
          No saved questions were found for this session.
        </div>
      )}

      <div className="flex justify-center gap-3">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <RotateCcw className="h-4 w-4" />
          Take another quiz
        </Link>
        <Link
          href="/ai-quiz/history"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          Quiz history
        </Link>
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
