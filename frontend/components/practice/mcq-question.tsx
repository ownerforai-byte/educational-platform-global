"use client";

import { CheckCircle2, Circle, Lightbulb, XCircle } from "lucide-react";
import { OPTION_IDS, type McqQuestion } from "@/lib/practice/types";
import type { OptionId } from "@/lib/practice/types";

const DIFFICULTY_STYLE: Record<McqQuestion["difficulty"], string> = {
  easy: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  intermediate: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  hard: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

function optionState(
  id: OptionId,
  correctId: OptionId,
  selected: OptionId | null,
  revealed: boolean,
): "idle" | "selected" | "correct" | "wrong" | "dimmed" {
  if (!revealed) return selected === id ? "selected" : "idle";
  if (id === correctId) return "correct";
  if (id === selected) return "wrong";
  return "dimmed";
}

const OPTION_CLASS: Record<ReturnType<typeof optionState>, string> = {
  idle: "border-border bg-card hover:border-primary/50 hover:bg-primary/[0.04]",
  selected: "border-primary bg-primary/[0.07] ring-1 ring-primary/30",
  correct: "border-emerald-500/60 bg-emerald-500/[0.08]",
  wrong: "border-rose-500/60 bg-rose-500/[0.08]",
  dimmed: "border-border/60 bg-card opacity-70",
};

const BADGE_CLASS: Record<ReturnType<typeof optionState>, string> = {
  idle: "bg-muted text-muted-foreground",
  selected: "bg-primary text-primary-foreground",
  correct: "bg-emerald-500 text-white",
  wrong: "bg-rose-500 text-white",
  dimmed: "bg-muted text-muted-foreground",
};

/**
 * One four-option MCQ.
 *
 * Before selection the options behave as a radio group. Once an option is
 * chosen the set locks and every option explains itself — that reveal is the
 * product, so it is rendered inline rather than hidden behind a toggle.
 */
export function McqQuestion({
  question,
  selected,
  revealed,
  onSelect,
}: {
  question: McqQuestion;
  selected: OptionId | null;
  revealed: boolean;
  onSelect: (id: OptionId) => void;
}) {
  const stemId = `stem-${question.id}`;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {question.topic}
          </span>
          <span
            className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize ${DIFFICULTY_STYLE[question.difficulty]}`}
          >
            {question.difficulty}
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">
            {question.subject} · {question.unit}
          </span>
        </div>

        <h2
          id={stemId}
          className="text-base font-semibold leading-relaxed text-foreground sm:text-lg"
        >
          {question.stem}
        </h2>

        <div
          role="radiogroup"
          aria-labelledby={stemId}
          aria-describedby={revealed ? `${stemId}-explain` : undefined}
          className="mt-5 grid gap-2.5"
        >
          {question.options.map((option) => {
            const state = optionState(option.id, question.correctId, selected, revealed);
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected === option.id}
                disabled={revealed}
                onClick={() => onSelect(option.id)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-default ${OPTION_CLASS[state]}`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${BADGE_CLASS[state]}`}
                >
                  {state === "correct" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : state === "wrong" ? (
                    <XCircle className="h-4 w-4" />
                  ) : (
                    option.id
                  )}
                </span>
                <span className="flex-1 text-sm leading-relaxed text-foreground">
                  {option.text}
                </span>
                {!revealed && (
                  <Circle
                    aria-hidden="true"
                    className={`mt-0.5 h-4 w-4 shrink-0 ${selected === option.id ? "text-primary" : "text-muted-foreground/40"}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {!revealed && (
          <p className="mt-3 text-xs text-muted-foreground">
            Pick one option — all four are explained straight after you choose.
          </p>
        )}
      </div>

      {revealed && (
        <div id={`${stemId}-explain`} className="space-y-3">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Every option, explained
            </h3>
            <p className="text-xs text-muted-foreground">
              {selected === question.correctId ? "You chose the correct option" : "You can retry this set any time"}
            </p>
          </div>

          <ul className="space-y-2">
            {OPTION_IDS.map((id) => {
              const isCorrect = id === question.correctId;
              const option = question.options.find((o) => o.id === id);
              return (
                <li
                  key={id}
                  className={`rounded-xl border p-3.5 ${
                    isCorrect
                      ? "border-emerald-500/40 bg-emerald-500/[0.06]"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] font-bold ${
                        isCorrect
                          ? "bg-emerald-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground">
                        <span className="sr-only">Option {id}: </span>
                        {option?.text}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        <span
                          className={`font-semibold ${isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-foreground/80"}`}
                        >
                          {isCorrect ? "Right, because " : "Wrong, because "}
                        </span>
                        {question.explanations[id]}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="flex items-start gap-2.5 rounded-xl border border-primary/25 bg-primary/[0.06] p-3.5">
            <Lightbulb
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-foreground">
              <span className="font-semibold">Remember this: </span>
              {question.conceptAnchor}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
