"use client";

import { useMemo } from "react";
import { BookOpen, Check, ListChecks, PenLine, Send } from "lucide-react";
import type { WritingQuestion } from "@/lib/practice/types";
import { resolveContrasts } from "@/lib/practice/contrasts";
import { ContrastTable } from "./contrast-table";

export type SelfScore = 100 | 60 | 30;

const SELF_SCORE_OPTIONS: Array<{ value: SelfScore; label: string; hint: string }> = [
  { value: 100, label: "I covered it", hint: "Every marking point is in my answer." },
  { value: 60, label: "Partly", hint: "I had the idea but missed points." },
  { value: 30, label: "Not yet", hint: "I need to study this again." },
];

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * One Writing question.
 *
 * Before submission: a real editor with a word counter and a target length
 * derived from the marks. After submission: model answer, the marking points,
 * then the contrast table — the part that turns "I got it wrong" into "I now
 * know which two ideas I fused".
 */
export function WritingQuestion({
  question,
  value,
  submitted,
  selfScore,
  onChange,
  onSubmit,
  onSelfScore,
}: {
  question: WritingQuestion;
  value: string;
  submitted: boolean;
  selfScore: SelfScore | null;
  onChange: (text: string) => void;
  onSubmit: () => void;
  onSelfScore: (score: SelfScore) => void;
}) {
  const words = wordCount(value);
  const target = question.marks * 30;
  const pairs = useMemo(() => resolveContrasts(question.contrasts), [question.contrasts]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold text-sky-700 dark:text-sky-400">
            <PenLine className="h-3 w-3" aria-hidden="true" />
            Writing
          </span>
          <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {question.topic}
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">
            {question.marks} marks · {question.subject} · {question.unit}
          </span>
        </div>

        <h2 className="text-base font-semibold leading-relaxed text-foreground sm:text-lg">
          {question.prompt}
        </h2>

        {!submitted && question.tip && (
          <p className="mt-3 rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Plan first: </span>
            {question.tip}
          </p>
        )}

        <label htmlFor={`answer-${question.id}`} className="sr-only">
          Your answer
        </label>
        <textarea
          id={`answer-${question.id}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          readOnly={submitted}
          rows={8}
          placeholder="Write your full answer here — definitions first, then the reasoning, then the example."
          className="mt-4 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background read-only:bg-muted/30"
        />

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span aria-live="polite" className={words >= target ? "text-emerald-600 dark:text-emerald-400" : undefined}>
            {words} words · aim for about {target} for {question.marks} marks
          </span>
          {!submitted && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={words === 0}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
              Submit answer
            </button>
          )}
        </div>
      </div>

      {submitted && (
        <div className="space-y-4">
          <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.05] p-4 sm:p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-300">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Model answer
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {question.modelAnswer}
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <ListChecks className="h-4 w-4" aria-hidden="true" />
              What the marker looks for
            </h3>
            <ul className="mt-3 space-y-1.5">
              {question.markingPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <ContrastTable pairs={pairs} />

          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <h3 className="text-sm font-bold text-foreground">Mark yourself honestly</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              This is what your XP is based on, so a generous mark only fools your own leaderboard position.
            </p>
            <div
              role="radiogroup"
              aria-label="Self-assessment"
              className="mt-3 grid gap-2 sm:grid-cols-3"
            >
              {SELF_SCORE_OPTIONS.map((option) => {
                const active = selfScore === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => onSelfScore(option.value)}
                    className={`rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      active
                        ? "border-primary bg-primary/[0.07] ring-1 ring-primary/30"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-foreground">
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {option.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
