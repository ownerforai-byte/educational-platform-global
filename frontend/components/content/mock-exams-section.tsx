"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, Clock, ListChecks, RotateCcw, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getExam, getExams } from "@/lib/api";
import { examSchema, type Exam, type Mcq } from "@/lib/schemas/exam";

type ExamSummaryView = {
  slug: string;
  title: string;
  durationMin: number;
  questionCount: number;
};

function QuestionCard({
  question,
  selected,
  checked,
  onSelect,
  onCheck,
}: {
  question: Mcq;
  selected: number | undefined;
  checked: boolean;
  onSelect: (index: number) => void;
  onCheck: () => void;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base">{question.prompt}</CardTitle>
          <Badge variant="outline" className="shrink-0 text-xs">
            {question.options.length} options
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2">
          {question.options.map((option, i) => {
            const isCorrect = i === question.correctIndex;
            const state = !checked
              ? selected === i
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/30"
              : isCorrect
                ? "border-emerald-500/60 bg-emerald-500/10"
                : selected === i
                  ? "border-red-500/60 bg-red-500/10"
                  : "border-border opacity-70";
            return (
              <button
                key={i}
                type="button"
                onClick={() => !checked && onSelect(i)}
                disabled={checked}
                className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-left text-sm transition-all ${state}`}
              >
                <span className="font-semibold text-muted-foreground">
                  {String.fromCharCode(65 + i)}.
                </span>
                <span className="flex-1">{option}</span>
                {checked && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                {checked && !isCorrect && selected === i && (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {!checked && (
          <Button onClick={onCheck} disabled={selected === undefined} className="w-full rounded-xl">
            Check answer
          </Button>
        )}

        {checked && question.explanation && (
          <div className="rounded-xl border border-border bg-muted/30 p-3 text-sm leading-relaxed text-muted-foreground">
            {question.explanation}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MockExamsSection() {
  const [exams, setExams] = useState<ExamSummaryView[]>([]);
  const [listError, setListError] = useState<string | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getExams()
      .then((list) => {
        if (!cancelled) setExams(list);
      })
      .catch(() => {
        if (!cancelled) setListError("Could not load the exam list. Check your connection.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const startExam = async (slug: string) => {
    setStarting(true);
    setStartError(null);
    try {
      const parsed = examSchema.safeParse(await getExam(slug));
      if (!parsed.success) {
        setStartError("This exam failed validation and cannot be started.");
        return;
      }
      setExam(parsed.data);
      setIndex(0);
      setAnswers({});
      setChecked(false);
      setFinished(false);
    } catch {
      setStartError("Could not load this exam. Please retry.");
    } finally {
      setStarting(false);
    }
  };

  const reset = () => {
    setExam(null);
    setIndex(0);
    setAnswers({});
    setChecked(false);
    setFinished(false);
    setStartError(null);
  };

  if (!exam) {
    return (
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">Official Mock Exams</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Full-length NEB mock papers in MCQ format. Every paper is validated on
          load before you can start it.
        </p>
        {listError && <p className="text-sm text-red-500">{listError}</p>}
        {startError && <p className="text-sm text-red-500">{startError}</p>}
        {exams.length === 0 && !listError ? (
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              No mock exams are available yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {exams.map((summary) => (
              <Card key={summary.slug}>
                <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{summary.title}</p>
                    <p className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {summary.durationMin} min
                      </span>
                      <span>{summary.questionCount} questions</span>
                    </p>
                  </div>
                  <Button
                    onClick={() => startExam(summary.slug)}
                    disabled={starting}
                    className="rounded-xl"
                  >
                    Start <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    );
  }

  const questions = exam.questions;
  const current = questions[index];
  const isLast = index === questions.length - 1;

  if (finished) {
    const score = questions.filter((q) => answers[q.id] === q.correctIndex).length;
    return (
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">{exam.title}</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {score} / {questions.length} correct
            </CardTitle>
            <CardDescription>
              {exam.durationMin} minute paper · {Math.round((score / questions.length) * 100)}%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {questions.map((q, i) => {
              const correct = answers[q.id] === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`flex items-start gap-2 rounded-lg border p-2.5 text-sm ${
                    correct
                      ? "border-emerald-500/40 bg-emerald-500/5"
                      : "border-red-500/40 bg-red-500/5"
                  }`}
                >
                  {correct ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {i + 1}. {q.prompt}
                    </p>
                    {!correct && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Correct: {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <div className="flex gap-3">
          <Button variant="outline" onClick={reset} className="flex-1 rounded-xl">
            All mock exams
          </Button>
          <Button
            onClick={() => {
              setIndex(0);
              setAnswers({});
              setChecked(false);
              setFinished(false);
            }}
            className="flex-1 rounded-xl"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Retake
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">{exam.title}</h2>
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {index + 1} / {questions.length}
        </span>
      </div>

      {startError && <p className="text-sm text-red-500">{startError}</p>}

      <QuestionCard
        question={current}
        selected={answers[current.id]}
        checked={checked}
        onSelect={(choice) => setAnswers((prev) => ({ ...prev, [current.id]: choice }))}
        onCheck={() => setChecked(true)}
      />

      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={reset} className="text-xs">
          ← All mock exams
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!checked}
          onClick={() => {
            if (isLast) {
              setFinished(true);
              return;
            }
            setIndex((i) => i + 1);
            setChecked(false);
          }}
          className="rounded-lg text-xs"
        >
          {isLast ? "Finish" : "Next"} <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </section>
  );
}
