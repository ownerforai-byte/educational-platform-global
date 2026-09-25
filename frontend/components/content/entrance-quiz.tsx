"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
  ChevronDown,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import type { EntranceQuestion } from "@/lib/entrance-questions";

/**
 * EntranceQuiz — the interactive MCQ runner for a topic's entrance question
 * bank. Two modes: attempt (pick answers, live scoring, submit at the end)
 * and instant reveal (tap an option to see correctness + the trick right away).
 * Every question carries its exam tag (CEE/IOE/NEB year).
 */

const LETTERS = ["A", "B", "C", "D"];

export function EntranceQuiz({ questions, title }: { questions: EntranceQuestion[]; title: string }) {
  const [mode, setMode] = useState<"instant" | "attempt">("instant");
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return null;
    const right = questions.reduce((acc, q, i) => acc + (picked[i] === q.answer ? 1 : 0), 0);
    return { right, total: questions.length, pct: Math.round((right / questions.length) * 100) };
  }, [submitted, picked, questions]);

  const answeredCount = Object.keys(picked).length;

  const reset = () => {
    setPicked({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      {/* mode switch + progress */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-background/80 p-1 text-xs">
          <button
            onClick={() => { setMode("instant"); reset(); }}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${mode === "instant" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Lightbulb className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
            Learn mode
          </button>
          <button
            onClick={() => { setMode("attempt"); reset(); }}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${mode === "attempt" ? "bg-indigo-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ListChecks className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
            Test mode
          </button>
        </div>

        <span className="text-xs text-muted-foreground">
          {questions.length} entrance questions
          {mode === "attempt" && !submitted && answeredCount > 0 && ` · ${answeredCount}/${questions.length} answered`}
        </span>

        {mode === "attempt" && answeredCount > 0 && !submitted && (
          <button
            onClick={() => setSubmitted(true)}
            className="ml-auto px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            Submit &amp; score
          </button>
        )}
        {answeredCount > 0 && (
          <button
            onClick={reset}
            className="px-2.5 py-1.5 rounded-xl border border-border/60 text-muted-foreground hover:text-foreground text-xs font-bold transition-all"
            title="Clear all answers"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* score card */}
      {score && (
        <div className={`rounded-2xl border p-4 flex items-center gap-4 ${
          score.pct >= 75
            ? "border-emerald-500/40 bg-emerald-500/10"
            : score.pct >= 40
              ? "border-amber-500/40 bg-amber-500/10"
              : "border-rose-500/40 bg-rose-500/10"
        }`}>
          <Trophy className={`h-8 w-8 shrink-0 ${score.pct >= 75 ? "text-emerald-500" : score.pct >= 40 ? "text-amber-500" : "text-rose-500"}`} />
          <div>
            <p className="text-lg font-black text-foreground">
              {score.right} / {score.total} — {score.pct}%
            </p>
            <p className="text-xs text-muted-foreground">
              {score.pct >= 75
                ? `Entrance-ready on ${title}. Move to the next unit's bank.`
                : score.pct >= 40
                  ? `Solid base — reread the explanations you missed on ${title}.`
                  : `Work through Learn mode first, then retest ${title}.`}
            </p>
          </div>
        </div>
      )}

      {/* questions */}
      <div className="space-y-3">
        {questions.map((q, qi) => {
          const chosen = picked[qi];
          const revealed = mode === "instant" ? chosen !== undefined : submitted;
          const isRight = revealed && chosen === q.answer;

          return (
            <div key={qi} className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold mt-0.5">
                  {qi + 1}
                </span>
                <p className="text-sm font-semibold text-foreground leading-snug flex-1">{q.q}</p>
                {q.exam && (
                  <span className="shrink-0 rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                    {q.exam}
                  </span>
                )}
              </div>

              <div className="grid gap-1.5 sm:grid-cols-2 pl-7">
                {q.options.map((opt, oi) => {
                  const isChosen = chosen === oi;
                  const isAnswer = oi === q.answer;
                  const showState = revealed && (isChosen || isAnswer);
                  return (
                    <button
                      key={oi}
                      disabled={mode === "attempt" && submitted}
                      onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                      className={`text-left px-3 py-2 rounded-xl border text-xs transition-all flex items-center gap-2 ${
                        showState
                          ? isAnswer
                            ? "bg-emerald-500/15 border-emerald-500/40 text-foreground font-semibold"
                            : isChosen
                              ? "bg-rose-500/15 border-rose-500/40 text-foreground"
                              : "bg-card/60 border-border text-muted-foreground"
                          : isChosen
                            ? "bg-primary/10 border-primary/40 text-foreground font-semibold"
                            : "bg-card/80 border-border hover:border-primary/40 text-foreground"
                      } ${mode === "attempt" && submitted ? "cursor-default" : ""}`}
                    >
                      <span className={`flex h-4.5 w-4.5 h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[9px] font-black ${
                        showState && isAnswer
                          ? "bg-emerald-500 text-white"
                          : showState && isChosen
                            ? "bg-rose-500 text-white"
                            : "bg-muted-foreground/15 text-muted-foreground"
                      }`}>
                        {LETTERS[oi]}
                      </span>
                      <span className="leading-relaxed flex-1">{opt}</span>
                      {showState && isAnswer && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                      {showState && isChosen && !isAnswer && <XCircle className="h-4 w-4 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {revealed && (
                <div className="ml-7 flex items-start gap-2 rounded-xl bg-sky-500/10 border border-sky-500/20 p-2.5">
                  <Lightbulb className="h-3.5 w-3.5 text-sky-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground leading-relaxed">
                    <strong className="text-sky-600 dark:text-sky-400">Trick: </strong>
                    {q.why}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mode === "attempt" && !submitted && answeredCount === 0 && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5 text-indigo-500" />
          Test mode: answer every question, then submit for your score — no answers shown until you submit.
        </p>
      )}
      {mode === "attempt" && !submitted && answeredCount > 0 && answeredCount < questions.length && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <ChevronDown className="h-3.5 w-3.5" />
          {questions.length - answeredCount} question{questions.length - answeredCount > 1 ? "s" : ""} left.
        </p>
      )}
    </div>
  );
}
