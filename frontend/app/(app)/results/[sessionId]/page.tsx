"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Target, TrendingUp, RotateCcw } from "lucide-react";

export default function ResultsPage() {
  const params = useParams<{ sessionId: string }>();

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quiz Results</h1>
        <p className="mt-2 text-muted-foreground">
          Session ID: <span className="font-mono">{params.sessionId}</span>
        </p>
      </div>

      {/* Score summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center">
          <Target className="mx-auto h-5 w-5 text-muted-foreground" />
          <p className="mt-2 text-3xl font-bold text-foreground">—</p>
          <p className="text-sm text-muted-foreground">Score</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center">
          <TrendingUp className="mx-auto h-5 w-5 text-muted-foreground" />
          <p className="mt-2 text-3xl font-bold text-foreground">—</p>
          <p className="text-sm text-muted-foreground">Accuracy</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center">
          <Clock className="mx-auto h-5 w-5 text-muted-foreground" />
          <p className="mt-2 text-3xl font-bold text-foreground">—</p>
          <p className="text-sm text-muted-foreground">Time taken</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-muted/40 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          This quiz session&apos;s detailed results (question-by-question review,
          correct answers, and explanations) will appear here once the session
          is loaded from the backend.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <RotateCcw className="h-4 w-4" />
            Take another quiz
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            Practice Hub
          </Link>
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
