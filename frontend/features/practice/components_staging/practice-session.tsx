"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Flag,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";
import type {
  McqQuestion,
  OptionId,
  PracticeMode,
  WritingQuestion,
} from "@/lib/practice/types";
import { xpForSet, xpLevel } from "@/lib/practice/xp";
import { McqQuestion as McqCard } from "./mcq-question";
import { WritingQuestion as WritingCard, type SelfScore } from "./writing-question";

export type PracticeQuestion = McqQuestion | WritingQuestion;

export function isMcq(question: PracticeQuestion): question is McqQuestion {
  return "options" in question;
}

function accuracyTone(pct: number): string {
  if (pct >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (pct >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}

/**
 * The whole practice run: one mode, one subject, a fixed question list.
 *
 * Everything the student does is local state — this is a practice surface, not
 * an exam, so answers reveal their reasoning immediately and can be revisited.
 * The only number that leaves this component is the XP total.
 */
export function PracticeSession({
  mode,
  subjectLabel,
  subjectHref,
  questions,
  onExit,
}: {
  mode: PracticeMode;
  subjectLabel: string;
  subjectHref: string;
  questions: PracticeQuestion[];
  onExit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState<Record<string, OptionId>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [selfScores, setSelfScores] = useState<Record<string, SelfScore>>({});
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const question = questions[index];

  const summary = useMemo(() => {
    const mcqIds = questions.filter(isMcq).map((q) => q.id);
    const writtenIds = questions.filter((q) => !isMcq(q)).map((q) => q.id);
    const answeredMcq = mcqIds.filter((id) => choices[id]).length;
    const correctMcq = mcqIds.filter(
      (id) => choices[id] && (questions.find((q) => q.id === id) as McqQuestion).correctId === choices[id],
    ).length;
    const markedWriting = writtenIds.filter((id) => selfScores[id]);
    const writingPct = markedWriting.length
      ? Math.round(
          markedWriting.reduce((sum, id) => sum + selfScores[id], 0) / markedWriting.length,
        )
      : 0;

    const answered = answeredMcq + markedWriting.length;
    const accuracy = mode === "mcq"
      ? answered > 0
        ? Math.round((correctMcq / answered) * 100)
        : 0
      : writingPct;

    const xp = xpForSet({
      answered,
      correct: mode === "mcq" ? correctMcq : markedWriting.length,
      scorePct: accuracy,
      format: mode === "mcq" ? "mcq" : "long-answer",
    });

    return { answeredMcq, correctMcq, markedWriting: markedWriting.length, answered, accuracy, xp, writingPct };
  }, [questions, choices, selfScores, mode]);

  function finish() {
    setFinished(true);
  }

  if (total === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No {mode === "mcq" ? "MCQ" : "writing"} questions are available for {subjectLabel} yet.
        </p>
        <Link
          href={subjectHref}
          className="mt-4 inline-flex rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
        >
          Choose another mode
        </Link>
      </div>
    );
  }

  if (finished) {
    return (
      <SessionResult
        mode={mode}
        subjectLabel={subjectLabel}
        subjectHref={subjectHref}
        summary={summary}
        onRetry={() => {
          setIndex(0);
          setChoices({});
          setDrafts({});
          setSubmitted({});
          setSelfScores({});
          setFinished(false);
        }}
        onExit={onExit}
      />
    );
  }

  const isLast = index === total - 1;
  const progress = Math.round(((index + 1) / total) * 100);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      <header className="sticky top-0 z-10 -mx-1 border-b border-border/70 bg-background/95 px-1 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            End session
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-foreground">
              {subjectLabel} · {mode === "mcq" ? "Multiple choice" : "Writing"}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <div
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label="Session progress"
              >
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                {index + 1}/{total}
              </span>
            </div>
          </div>

          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Accuracy</p>
            <p className={`text-sm font-bold tabular-nums ${accuracyTone(summary.accuracy)}`}>
              {summary.accuracy}%
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
        <main className="min-w-0">
          {isMcq(question) ? (
            <McqCard
              key={question.id}
              question={question}
              selected={choices[question.id] ?? null}
              revealed={Boolean(choices[question.id])}
              onSelect={(id) =>
                setChoices((prev) => (prev[question.id] ? prev : { ...prev, [question.id]: id }))
              }
            />
          ) : (
            <WritingCard
              key={question.id}
              question={question}
              value={drafts[question.id] ?? ""}
              submitted={Boolean(submitted[question.id])}
              selfScore={selfScores[question.id] ?? null}
              onChange={(text) => setDrafts((prev) => ({ ...prev, [question.id]: text }))}
              onSubmit={() => setSubmitted((prev) => ({ ...prev, [question.id]: true }))}
              onSelfScore={(score) => setSelfScores((prev) => ({ ...prev, [question.id]: score }))}
            />
          )}
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            <div className="rounded-2xl border border-border bg-card p-3">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Questions
              </p>
              <div className="grid grid-cols-6 gap-1.5">
                {questions.map((q, i) => {
                  const done = isMcq(q) ? Boolean(choices[q.id]) : Boolean(selfScores[q.id]);
                  const correct =
                    isMcq(q) && choices[q.id] ? choices[q.id] === q.correctId : false;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Question ${i + 1}${done ? (correct ? ", correct" : ", answered") : ", not answered"}`}
                      aria-current={i === index ? "true" : undefined}
                      className={`flex h-7 w-full items-center justify-center rounded-md text-[11px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        i === index
                          ? "bg-primary text-primary-foreground"
                          : correct
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            : done
                              ? "bg-muted text-foreground"
                              : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-3">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3 w-3" aria-hidden="true" /> XP so far
              </p>
              <p className="mt-1 text-xl font-black tabular-nums text-foreground">{summary.xp}</p>
              <p className="text-[11px] text-muted-foreground">
                {meaningfulSubline(mode, summary)}
              </p>
            </div>
          </div>
        </aside>
      </div>

      <nav className="flex items-center justify-between gap-3 border-t border-border/70 pt-4">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Previous
        </button>

        <p className="hidden text-xs text-muted-foreground sm:block">
          {mode === "mcq"
            ? `${summary.answeredMcq} of ${total} answered`
            : `${summary.markedWriting} of ${total} marked`}
        </p>

        {isLast ? (
          <button
            type="button"
            onClick={finish}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Flag className="h-3.5 w-3.5" aria-hidden="true" />
            Finish session
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Next
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </nav>
    </div>
  );
}

function meaningfulSubline(
  mode: PracticeMode,
  summary: { answered: number; accuracy: number; correctMcq: number },
): string {
  if (summary.answered === 0) return "Answer to start earning";
  if (mode === "mcq") return `${summary.correctMcq} correct · ${summary.accuracy}% accuracy`;
  return `${summary.accuracy}% self-marked`;
}

function SessionResult({
  mode,
  subjectLabel,
  subjectHref,
  summary,
  onRetry,
  onExit,
}: {
  mode: PracticeMode;
  subjectLabel: string;
  subjectHref: string;
  summary: {
    answered: number;
    answeredMcq: number;
    correctMcq: number;
    markedWriting: number;
    accuracy: number;
    xp: number;
  };
  onRetry: () => void;
  onExit: () => void;
}) {
  const level = xpLevel(summary.xp);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Trophy className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-2xl font-black tracking-tight text-foreground">
          Session complete
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {subjectLabel} · {mode === "mcq" ? "Multiple choice" : "Writing"}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-border/70 bg-background p-3">
            <p className={`text-2xl font-black tabular-nums ${accuracyTone(summary.accuracy)}`}>
              {summary.accuracy}%
            </p>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {mode === "mcq" ? "Accuracy" : "Self-marked"}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background p-3">
            <p className="text-2xl font-black tabular-nums text-foreground">
              {mode === "mcq" ? `${summary.correctMcq}/${summary.answered}` : summary.markedWriting}
            </p>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {mode === "mcq" ? "Correct" : "Marked"}
            </p>
          </div>
          <div className="rounded-xl border border-primary/30 bg-primary/[0.06] p-3">
            <p className="text-2xl font-black tabular-nums text-primary">+{summary.xp}</p>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">XP earned</p>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          This session alone puts you at {level.title} level. XP is banked on the leaderboard from
          your scored sets.
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Retry this set
          </button>
          <button
            type="button"
            onClick={onExit}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Pick another mode
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <h2 className="text-sm font-bold text-foreground">What counts, and what does not</h2>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            Every correct choice answer earns 10 XP and pushes your accuracy up.
          </li>
          <li className="flex items-start gap-2">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden="true" />
            A wrong answer still earns 2 XP — effort counts, accuracy pays.
          </li>
          <li className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            A set at 80% accuracy or above adds a 25 XP bonus on top.
          </li>
        </ul>
        <Link
          href={subjectHref}
          className="mt-3 inline-flex text-xs font-semibold text-primary hover:underline"
        >
          Back to {subjectLabel} practice
        </Link>
      </div>
    </div>
  );
}
