"use client";

import { getQuizHistory, getQuizHistoryQuiz, clearQuizHistory } from "@/lib/api/ai-quiz-history";
import {
  BookOpen,
  ArrowLeft,
  RotateCcw,
  Trash2,
  Clock,
  ChevronRight,
  Lightbulb,
  GraduationCap,
  Save,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { QuizHistoryRow, QuizHistoryQuiz } from "@/lib/api/ai-quiz-history";
import type { GeneratedQuestion } from "@/types/api";

const DIFF_META: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  easy: {
    label: "Easy",
    color: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  intermediate: {
    label: "Intermediate",
    color: "text-blue-700 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  hard: {
    label: "Hard",
    color: "text-rose-700 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200 dark:border-rose-800",
  },
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface ListState {
  rows: QuizHistoryRow[];
  loading: boolean;
  migrated: boolean;
}

interface QuizOpenState {
  quiz: QuizHistoryQuiz | null;
  loading: boolean;
}

type Phase = "list" | "quiz";

export default function QuizHistoryPage() {
  const [phase, setPhase] = useState<Phase>("list");
  const [list, setList] = useState<ListState>({
    rows: [],
    loading: true,
    migrated: true,
  });
  const [open, setOpen] = useState<QuizOpenState>({
    quiz: null,
    loading: false,
  });

  const loadList = async () => {
    setList((prev) => ({ ...prev, loading: true }));
    try {
      const res = await getQuizHistory(80);
      setList({ rows: res.rows, loading: false, migrated: res.migrated });
    } catch {
      setList((prev) => ({ ...prev, loading: false, migrated: false }));
      toast("Could not load your quiz history", { icon: <BookOpen className="h-4 w-4" /> });
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const openQuiz = async (id: string) => {
    setOpen({ quiz: null, loading: true });
    try {
      const res = await getQuizHistoryQuiz(id);
      setOpen({ quiz: res, loading: false });
      setPhase("quiz");
    } catch {
      setOpen({ quiz: null, loading: false });
      toast("Could not open that saved quiz", { icon: <BookOpen className="h-4 w-4" /> });
    }
  };

  const clearAll = async () => {
    const ok = confirm("Delete all saved quizzes for your account?");
    if (!ok) return;
    try {      const res = await clearQuizHistory();
      if (res.migrated === false) {
        toast("Your saved quizzes were not cleared — history storage is not available yet.", { description: "Nothing was deleted.", icon: <RotateCcw className="h-4 w-4" /> });
        return;
      }
      if (res.cleared) {
        toast("Cleared your saved quizzes.", { icon: <Trash2 className="h-4 w-4" /> });
        setList((prev) => ({ ...prev, rows: [] }));
      }
    } catch {
      toast("Could not clear your quiz history", { icon: <Trash2 className="h-4 w-4" /> });
    }
  };

  if (phase === "list") {
    return (
      <div className="mx-auto max-w-3xl space-y-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Saved quizzes</h1>
            <p className="text-sm text-muted-foreground">
              Quizzes you completed on /ai-quiz. Open one to review each option.
            </p>
          </div>
          {list.rows.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="gap-2 rounded-xl"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear all
            </Button>
          )}
        </div>

        {!list.migrated && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
            Quiz history is not stored yet in this deployment, so there is
            nothing to show here. Completed quizzes are saved automatically when
            storage is enabled.
          </div>
        )}

        {list.loading && (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        )}

        {!list.loading && list.rows.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              <GraduationCap className="mx-auto h-8 w-8 text-muted-foreground/50 mb-3" />
              No saved quizzes yet. Generate one on the{" "}
              <a
                href="/ai-quiz"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                quiz generator
              </a>{" "}
              page and finish it — it will appear here.
            </CardContent>
          </Card>
        )}

        {!list.loading && list.rows.length > 0 && (
          <div className="space-y-2">
            {list.rows.map((row) => {
              const meta = row.difficulty ? DIFF_META[row.difficulty] : null;
              const pct =
                row.scorePct ??
                (row.answered > 0
                  ? Math.round((row.correct / row.answered) * 100)
                  : null);
              const good = pct !== null && pct >= 75;
              const ok = pct !== null && pct >= 50 && pct < 75;
              const scoreLabel =
                pct === null
                  ? "Not graded"
                  : `${pct}% · ${row.correct}/${row.answered}`;
              return (
                <button
                  key={row.id}
                  onClick={() => openQuiz(row.id)}
                  className="w-full text-left rounded-xl border border-border bg-background px-4 py-3 text-sm transition-all hover:bg-accent"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{row.title}</span>
                        {meta && (
                          <Badge
                            variant="outline"
                            className={`${meta.bg} ${meta.border} ${meta.color} text-[11px]`}
                          >
                            {meta.label}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {row.subjectSlug && (
                          <span>Subject: {row.subjectSlug}</span>
                        )}
                        {row.topic && <span>Topic: {row.topic}</span>}
                        {pct !== null && row.answered > 0 && (
                          <span
                            className={
                              good
                                ? "text-emerald-600 dark:text-emerald-400"
                                : ok
                                  ? "text-blue-600 dark:text-blue-400"
                                  : "text-rose-600 dark:text-rose-400"
                            }
                          >
                            {scoreLabel}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {fmtDate(row.createdat)}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                  </div>
                  {pct !== null && row.answered > 0 && (
                    <div className="mt-2">
                      <Progress
                        value={pct}
                        className="h-1.5 accent-primary"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const quiz = open.quiz;
  if (!quiz) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 py-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setPhase("list");
            setOpen({ quiz: null, loading: false });
          }}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to saved quizzes
        </Button>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  const pct =
    quiz.scorePct ??
    (quiz.answered > 0
      ? Math.round((quiz.correct / quiz.answered) * 100)
      : null);
  const good = pct !== null && pct >= 75;
  const ok = pct !== null && pct >= 50 && pct < 75;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setPhase("list");
          setOpen({ quiz: null, loading: false });
        }}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back to saved quizzes
      </Button>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base">{quiz.title}</CardTitle>
              <CardDescription className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                {quiz.subjectSlug && <span>Subject: {quiz.subjectSlug}</span>}
                {quiz.topic && <span>Topic: {quiz.topic}</span>}
                {quiz.difficulty && (
                  <Badge
                    variant="outline"
                    className={`${DIFF_META[quiz.difficulty].bg} ${DIFF_META[quiz.difficulty].border} ${DIFF_META[quiz.difficulty].color} text-[11px]`}
                  >
                    {DIFF_META[quiz.difficulty].label}
                  </Badge>
                )}
                {pct !== null &&
                  quiz.answered > 0 && (
                    <span
                      className={
                        good
                          ? "text-emerald-600 dark:text-emerald-400"
                          : ok
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-rose-600 dark:text-rose-400"
                      }
                    >
                      {pct}% · {quiz.correct}/{quiz.answered}
                    </span>
                  )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {fmtDate(quiz.createdat)}
            </div>
          </div>
          {pct !== null && quiz.answered > 0 && (
            <div className="mt-3">
              <Progress value={pct} className="h-2 accent-primary" />
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {open.loading && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full rounded-xl" />
              ))}
            </div>
          )}

          {!open.loading &&
            quiz.questions.map((q, qIdx) => (
              <QuestionCard key={qIdx} question={q} qIdx={qIdx} />
            ))}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPhase("list");
            setOpen({ quiz: null, loading: false });
          }}
          className="rounded-xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> All saved quizzes
        </Button>
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  qIdx,
}: {
  question: GeneratedQuestion;
  qIdx: number;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-purple-500" />
      <CardHeader className="pb-3">
        <div className="flex items-start gap-2">
          <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="min-w-0">
            <CardTitle className="text-base leading-relaxed">
              {question.prompt}
            </CardTitle>
            <CardDescription className="mt-1 text-xs">
              Q{qIdx + 1}
              {question.topic ? ` · ${question.topic}` : ""}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {question.options.map((opt, optIdx) => {
          const key = String.fromCharCode(65 + optIdx);
          const analysis =
            question.optionAnalysis?.[key] ?? question.explanation ?? null;
          const isCorrect = optIdx === question.correctIndex;
          return (
            <div
              key={optIdx}
              className="flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm"
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isCorrect
                    ? "bg-emerald-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {key}
              </span>
              <div className="min-w-0 flex flex-col gap-1">
                <span className="font-medium">{opt}</span>
                {analysis && (
                  <div className="flex items-start gap-1.5 leading-relaxed text-xs text-muted-foreground">
                    <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                    <span>
                      {isCorrect ? "Right — " : "Wrong — "}
                      {analysis}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {question.explanation && (
          <div className="mt-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
            <span className="font-semibold text-primary">Explanation: </span>
            {question.explanation}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
