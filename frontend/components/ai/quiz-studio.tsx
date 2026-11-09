"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Brain,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  BookOpen,
  Zap,
  Target,
  Trophy,
  Lightbulb,
  Minus,
  Save,
  ListChecks,
  ToggleLeft,
  Pencil,
  ScrollText,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { SYLLABUS } from "@/lib/syllabus";
import { generateQuestions, evaluateAnswers } from "@/lib/api/ai";
import { recordAiSparkUse } from "@/components/ai/ai-spark-badge";
import { MathMarkdown } from "@/components/content/math-markdown";
import { saveQuizHistory } from "@/lib/api/ai-quiz-history";
import { pushNotification } from "@/lib/notifications";
import { notifyLiveStatsChanged } from "@/lib/hooks/use-live-stats";
import {
  GUEST_DAILY_LIMIT,
  writeGuestCount,
} from "@/lib/ai/guest-quota";
import type {
  EvaluatedAnswer,
  EvaluateAnswersResponse,
  GeneratedQuestion,
  QuizFormat,
} from "@/types/api";

// ── Colour palette per difficulty ────────────────────────────────────────────
const DIFF_META: Record<
  string,
  { label: string; color: string; bg: string; border: string; icon: React.ReactNode }
> = {
  easy: {
    label: "Easy",
    color: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    icon: <Zap className="h-3 w-3" />,
  },
  intermediate: {
    label: "Intermediate",
    color: "text-blue-700 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    icon: <Target className="h-3 w-3" />,
  },
  hard: {
    label: "Hard",
    color: "text-rose-700 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200 dark:border-rose-800",
    icon: <Trophy className="h-3 w-3" />,
  },
};

const DIFFICULTIES: Array<"easy" | "intermediate" | "hard"> = [
  "easy",
  "intermediate",
  "hard",
];

const QUESTION_COUNTS = [5, 10, 15, 20];

// ── Quiz formats (plan.md §11.1) ────────────────────────────────────────
const FORMAT_META: Array<{
  id: QuizFormat;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    id: "mcq",
    label: "Multiple Choice",
    description: "4 options, one correct",
    icon: <ListChecks className="h-4 w-4" />,
  },
  {
    id: "true-false",
    label: "True / False",
    description: "Judge the statement",
    icon: <ToggleLeft className="h-4 w-4" />,
  },
  {
    id: "fill-blank",
    label: "Fill in the Blank",
    description: "Type the missing word",
    icon: <Pencil className="h-4 w-4" />,
  },
  {
    id: "short-answer",
    label: "Short Answer",
    description: "2–6 sentence writing",
    icon: <ScrollText className="h-4 w-4" />,
  },
  {
    id: "long-answer",
    label: "Writing Test",
    description: "Essay + AI grading",
    icon: <FileText className="h-4 w-4" />,
  },
];

function formatMeta(id: QuizFormat) {
  return FORMAT_META.find((f) => f.id === id) ?? FORMAT_META[0];
}

/** Choice formats answer with an option index; text formats with free text. */
function isChoiceFormat(id: QuizFormat): boolean {
  return id === "mcq" || id === "true-false";
}

// ── Phase 1: Configuration screen ────────────────────────────────────────────

function ConfigScreen({
  onGenerate,
  generating,
}: {
  onGenerate: (params: {
    classSlug: string;
    subjectSlug: string;
    topic: string;
    difficulty: "easy" | "intermediate" | "hard";
    count: number;
    format: QuizFormat;
  }) => void;
  generating: boolean;
}) {
  const [classSlug, setClassSlug] = useState("class-11-notes");
  const [subjectSlug, setSubjectSlug] = useState("");
  const [topic, setTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "intermediate" | "hard">(
    "intermediate"
  );
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState<QuizFormat>("mcq");

  // Chat → quiz handoff: the tutor's "Practice quiz" button seeds the
  // subject/topic here (one-shot, consumed on mount).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("neb_quiz_seed");
      if (!raw) return;
      sessionStorage.removeItem("neb_quiz_seed");
      const seed = JSON.parse(raw) as {
        classSlug?: string;
        subjectSlug?: string;
        topic?: string;
      };
      const clsSlug =
        seed.classSlug === "class-12-notes" ? "class-12-notes" : "class-11-notes";
      const cls = SYLLABUS.find((c) => c.slug === clsSlug);
      if (seed.subjectSlug && cls?.subjects.some((s) => s.slug === seed.subjectSlug)) {
        setClassSlug(clsSlug);
        setSubjectSlug(seed.subjectSlug);
      }
      if (seed.topic) setCustomTopic(seed.topic);
    } catch {
      /* malformed seed — fall back to the default config */
    }
  }, []);

  const classData = useMemo(
    () => SYLLABUS.find((c) => c.slug === classSlug),
    [classSlug]
  );
  const subjectData = useMemo(
    () => classData?.subjects.find((s) => s.slug === subjectSlug),
    [classData, subjectSlug]
  );

  // Flatten all topics for the dropdown
  const allTopics = useMemo(
    () =>
      subjectData
        ? subjectData.units.flatMap((u) =>
            u.topics.map((t) => ({ label: t, unit: u.title }))
          )
        : [],
    [subjectData]
  );

  const canGenerate = !!subjectSlug;

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      {/* Class selector */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-[13px] uppercase tracking-wide text-muted-foreground">
            Step 1 — Select class &amp; subject
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {(["class-11-notes", "class-12-notes"] as const).map((slug) => (
              <Button
                key={slug}
                variant={classSlug === slug ? "default" : "outline"}
                onClick={() => {
                  setClassSlug(slug);
                  setSubjectSlug("");
                }}
                className="rounded-xl"
              >
                {slug === "class-11-notes" ? "Class 11" : "Class 12"}
              </Button>
            ))}
          </div>

          {/* Subject grid */}
          <div className="grid grid-cols-3 gap-2">
            {classData?.subjects.map((subj) => (
              <Button
                key={subj.slug}
                variant={subjectSlug === subj.slug ? "default" : "outline"}
                onClick={() => setSubjectSlug(subj.slug)}
                className="rounded-xl h-11 text-[13px]"
              >
                {subj.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topic + difficulty + count */}
      {subjectSlug && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-[13px] uppercase tracking-wide text-muted-foreground">
              Step 2 — Configure quiz
            </CardTitle>
            <CardDescription>
              {subjectData?.units.length ?? 0} units ·{" "}
              {subjectData?.units.reduce(
                (s, u) => s + u.topics.length,
                0
              )}{" "}
              topics available
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Topic selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground">
                Topic (optional — leave blank for full subject)
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={customTopic.trim().length > 0}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">All topics in {subjectData?.name ?? ""}</option>
                {allTopics.map((t) => (
                  <option key={t.label} value={t.label}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Free-text topic — ANY topic on the platform, not just the list */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground">
                …or type any topic from the platform
              </label>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g. Newton's second law, Photosynthesis, Organic nomenclature…"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {customTopic.trim() && (
                <p className="text-[11px] font-semibold text-primary">
                  Custom topic active — questions will target “{customTopic.trim()}”.
                </p>
              )}
            </div>

            {/* Quiz format — the engine diversities (plan.md §11.1) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground">
                Quiz format
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {FORMAT_META.map((f) => {
                  const selected = format === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFormat(f.id)}
                      aria-pressed={selected}
                      className={`flex flex-col items-start gap-1 rounded-xl border px-3 py-2.5 text-left transition-all ${
                        selected
                          ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                          : "border-border bg-background text-muted-foreground hover:border-muted-foreground/40"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-[13px] font-semibold">
                        {f.icon}
                        {f.label}
                      </span>
                      <span className="text-[11px] leading-tight text-muted-foreground">
                        {f.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground">
                Difficulty
              </label>
              <div className="flex gap-2">
                {DIFFICULTIES.map((d) => {
                  const meta = DIFF_META[d];
                  const selected = difficulty === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDifficulty(d)}
                      className={`flex-1 rounded-xl border px-3 py-2.5 text-left text-[13px] font-medium transition-all ${
                        selected
                          ? `${meta.bg} ${meta.border} ${meta.color} ring-2 ring-primary/30`
                          : "border-border bg-background text-muted-foreground hover:border-muted-foreground/40"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        {meta.icon}
                        {meta.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question count */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground">
                Number of questions
              </label>
              <div className="flex gap-2">
                {QUESTION_COUNTS.map((n) => (
                  <Button
                    key={n}
                    variant={count === n ? "default" : "outline"}
                    onClick={() => setCount(n)}
                    className="rounded-xl flex-1"
                  >
                    {n}
                  </Button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <Button
              onClick={() =>
                onGenerate({
                  classSlug,
                  subjectSlug,
                  topic: customTopic.trim() || topic,
                  difficulty,
                  count,
                  format,
                })
              }
              disabled={!canGenerate || generating}
              className="w-full rounded-xl py-6 text-[13px] font-semibold"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating questions…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate {count} Questions
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Phase 2: Quiz screen ─────────────────────────────────────────────────────

function QuizScreen({
  questions,
  difficulty,
  format,
  classSlug,
  subjectSlug,
  onBack,
  onRegenerate,
  onFinishQuiz,
}: {
  questions: GeneratedQuestion[];
  difficulty: "easy" | "intermediate" | "hard";
  format: QuizFormat;
  classSlug: string;
  subjectSlug: string;
  onBack: () => void;
  onRegenerate: () => void;
  onFinishQuiz: (
    summary: {
      format: QuizFormat;
      answered: number;
      correct: number;
      scorePct?: number;
      evaluation?: EvaluateAnswersResponse;
    }
  ) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<Record<number, number>>({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluateAnswersResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isChoice = isChoiceFormat(format);

  const q = questions[currentIndex];
  const meta = DIFF_META[difficulty];
  const total = questions.length;
  const answered = isChoice
    ? Object.keys(selectedIndices).length
    : Object.values(textAnswers).filter((v) => v.trim().length > 0).length;
  const score = questions.reduce(
    (sum, question, i) =>
      sum + (selectedIndices[i] === question.correctIndex ? 1 : 0),
    0
  );
  // Writing formats are graded by the AI — the score comes from its report.
  const evaluatedScore = evaluation
    ? Math.round(
        evaluation.results.reduce((s, r) => s + r.score, 0) /
          Math.max(1, evaluation.results.length)
      )
    : 0;
  const pct = isChoice
    ? total > 0
      ? Math.round((score / total) * 100)
      : 0
    : evaluatedScore;

  // Writing formats: autosave the draft so a refresh never loses an essay.
  useEffect(() => {
    if (isChoice) return;
    try {
      const raw = sessionStorage.getItem("neb_quiz_draft");
      if (raw) {
        const draft = JSON.parse(raw) as Record<number, string>;
        setTextAnswers((prev) => ({ ...draft, ...prev }));
      }
    } catch {
      /* malformed draft — start clean */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isChoice) return;
    try {
      sessionStorage.setItem("neb_quiz_draft", JSON.stringify(textAnswers));
    } catch {
      /* storage full/unavailable — the in-memory draft still works */
    }
  }, [textAnswers, isChoice]);

  const clearDraft = () => {
    try {
      sessionStorage.removeItem("neb_quiz_draft");
    } catch {
      /* ignore */
    }
  };

  const selectAnswer = (qIdx: number, optIdx: number) => {
    if (showResults) return;
    setSelectedIndices((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const setAnswerText = (qIdx: number, value: string) => {
    if (showResults) return;
    setTextAnswers((prev) => ({ ...prev, [qIdx]: value }));
  };

  const wordCount = (value: string) =>
    value.trim() ? value.trim().split(/\s+/).length : 0;

  /** Submit writing-format answers to the AI evaluator (plan.md §11.2). */
  const submitWriting = async () => {
    if (answered < total || submitting) return;
    setSubmitting(true);
    try {
      const res = await evaluateAnswers({
        classSlug,
        subjectSlug,
        topic: questions[0]?.topic,
        format,
        items: questions.map((question, i) => ({
          prompt: question.prompt,
          userAnswer: textAnswers[i] ?? "",
          modelAnswer: question.modelAnswer,
          rubric: question.rubric,
          acceptedAnswers: question.acceptedAnswers,
          maxScore: question.maxScore,
        })),
      });
      setEvaluation(res);
      recordAiSparkUse();
      clearDraft();
      onFinishQuiz({
        format,
        answered,
        correct: res.results.filter((r) => r.verdict === "correct").length,
        scorePct: Math.round(
          res.results.reduce((s, r) => s + r.score, 0) /
            Math.max(1, res.results.length)
        ),
        evaluation: res,
      });
      setShowResults(true);
    } catch (err) {
      const msg =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Could not evaluate your answers. Please try again.";
      toast(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const goTo = (i: number) => setCurrentIndex(Math.max(0, Math.min(total - 1, i)));

  const optionKey = (optIdx: number) => String.fromCharCode(65 + optIdx);
  const optionAnalysis = (optIdx: number): string => {
    if (!q.optionAnalysis) return q.explanation;
    const key = optionKey(optIdx);
    return q.optionAnalysis[key] ?? q.explanation;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`${meta.bg} ${meta.border} ${meta.color} font-medium`}>
            {meta.icon} {meta.label}
          </Badge>
          <Button variant="ghost" size="sm" onClick={onRegenerate} className="gap-2">
            <RefreshCw className="h-3 w-3" /> New
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            Question {currentIndex + 1} of {total}
          </span>
          <span>
            {answered}/{total} answered
          </span>
        </div>
        <Progress value={(answered / total) * 100} className="h-2" accentColor="#3b82f6" />
      </div>

      {/* Question card */}
      <Card className="overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-purple-500" />
        <CardHeader className="pb-3">
          <div className="flex items-start gap-2">
            <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="text-[13px] font-semibold leading-relaxed tracking-tight">
                <MathMarkdown content={q.prompt} className="[&_p]:my-0 [&_p]:text-[13px] [&_p]:font-semibold" />
              </div>
              <CardDescription className="mt-1 text-[11px]">
                Topic: {q.topic}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Writing formats: free-text answer with word count */}
          {!isChoice && (
            <div className="space-y-2">
              <label
                htmlFor="quiz-writing-answer"
                className="text-[11px] font-medium text-muted-foreground"
              >
                Your answer
              </label>
              <textarea
                id="quiz-writing-answer"
                value={textAnswers[currentIndex] ?? ""}
                onChange={(e) => setAnswerText(currentIndex, e.target.value)}
                disabled={showResults}
                rows={format === "long-answer" ? 10 : 5}
                placeholder={
                  format === "fill-blank"
                    ? "Type the missing word or phrase…"
                    : format === "short-answer"
                    ? "Write 2–6 sentences…"
                    : "Write your full answer — show the working for numericals…"
                }
                className="w-full rounded-xl border border-input bg-background px-3.5 py-3 text-[13px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-70"
              />
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>
                  {wordCount(textAnswers[currentIndex] ?? "")} words
                  {!showResults && " — draft autosaves"}
                </span>
                {questions[currentIndex].maxScore != null && (
                  <span>Marked out of {questions[currentIndex].maxScore}</span>
                )}
              </div>
            </div>
          )}

          {isChoice && q.options.map((opt, optIdx) => {
            const isSelected = selectedIndices[currentIndex] === optIdx;
            const isCorrect = optIdx === q.correctIndex;
            const showFeedback = showResults;

            let variant = "outline";
            let className = "";
            if (showFeedback) {
              if (isCorrect) {
                variant = "default";
                className = "bg-emerald-500 text-white border-emerald-500";
              } else if (isSelected && !isCorrect) {
                variant = "default";
                className = "bg-rose-500 text-white border-rose-500";
              } else {
                className = "opacity-50";
              }
            } else if (isSelected) {
              variant = "default";
              className = "bg-primary text-primary-foreground border-primary";
            }

            return (
              <button
                key={optIdx}
                onClick={() => selectAnswer(currentIndex, optIdx)}
                disabled={showResults}
                className={`w-full text-left rounded-xl border-2 px-4 py-3 text-[13px] transition-all hover:bg-accent disabled:cursor-default ${
                  showFeedback ? className : "border-border bg-background"
                } ${isSelected && !showFeedback ? "border-primary bg-primary/5" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      showFeedback && isCorrect
                        ? "bg-emerald-500 text-white"
                        : showFeedback && isSelected && !isCorrect
                        ? "bg-rose-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className={className}>{opt}</span>
                  {showFeedback && isCorrect && (
                    <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-500 shrink-0" />
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <XCircle className="ml-auto h-4 w-4 text-rose-500 shrink-0" />
                  )}
                </div>                </button>
            );
          })}

          {/* Explanation (shown after answer or at end) */}
          {(showResults ||
            (isChoice
              ? selectedIndices[currentIndex] !== undefined
              : (textAnswers[currentIndex] ?? "").trim().length > 0)) && (
            <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-[11px] text-muted-foreground">
              <span className="font-semibold text-primary">Explanation: </span>
              <MathMarkdown content={q.explanation} className="[&_p]:my-1 [&_p]:text-[11px] [&_p]:text-muted-foreground" />
            </div>
          )}

          {/* Per-option analysis (with proper why-right/why-wrong treatment) */}
          {(showResults ||
            (isChoice ? selectedIndices[currentIndex] !== undefined : false)) &&
            q.optionAnalysis && (
            <div className="mt-4 grid gap-2 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/10 px-4 py-3">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                <Lightbulb className="h-3.5 w-3.5 shrink-0" />
                Each option analysed — why it is right or wrong
              </div>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, optIdx) => {
                  const key = String.fromCharCode(65 + optIdx);
                  const analysis = q.optionAnalysis?.[key] ?? null;
                  if (!analysis) return null;

                  const isCorrect = optIdx === q.correctIndex;
                  return (
                    <div key={optIdx} className="flex items-start gap-2 rounded-lg bg-background/60 px-3 py-2 text-[11px]">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          isCorrect
                            ? "bg-emerald-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {key}
                      </span>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="font-medium text-muted-foreground">{opt}</span>
                        <MathMarkdown
                          content={`${isCorrect ? "✓ Right — " : "✗ Wrong — "}${analysis}`}
                          className="leading-snug [&_p]:my-0 [&_p]:text-[11px] [&_p]:text-muted-foreground"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="rounded-xl"
        >
          Previous
        </Button>

        {/* Question dots */}
        <div className="flex gap-1 flex-wrap justify-center max-w-[60%]">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-primary scale-125"
                  : (isChoice
                      ? selectedIndices[i] !== undefined
                      : (textAnswers[i] ?? "").trim().length > 0)
                  ? "bg-primary/50"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        {currentIndex < total - 1 ? (
          <Button
            size="sm"
            onClick={() => goTo(currentIndex + 1)}
            className="rounded-xl"
          >
            Next
          </Button>
        ) : (
            <Button
            size="sm"
            onClick={() => {
              if (answered < total) return;
              if (isChoice) {
                onFinishQuiz({
                  format,
                  answered,
                  correct: score,
                  scorePct: pct,
                });
                setShowResults(true);
              } else {
                void submitWriting();
              }
            }}
            disabled={answered < total || submitting}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Evaluating…
              </>
            ) : isChoice ? (
              "Finish Quiz"
            ) : (
              "Submit for AI Evaluation"
            )}
          </Button>
        )}
      </div>

      {/* AI Submission Report (writing formats — plan.md §11.3) */}
      {showResults && evaluation && (
        <Card className="overflow-hidden border-primary/20">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-purple-500" />
          <CardContent className="pt-8 pb-6 space-y-5">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold text-white"
                  style={{
                    background:
                      pct >= 80
                        ? "linear-gradient(135deg, #10b981, #059669)"
                        : pct >= 50
                        ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                        : "linear-gradient(135deg, #f59e0b, #d97706)",
                  }}
                >
                  {pct}%
                </div>
              </div>
              <p className="text-lg font-bold">AI Submission Report</p>
              <p className="mx-auto max-w-lg text-[13px] text-muted-foreground">
                {evaluation.summary}
              </p>
            </div>

            {evaluation.results.map((result, i) => (
              <div
                key={i}
                className="rounded-xl border-2 border-border/80 bg-muted/30 p-4 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <MathMarkdown
                    content={`**Q${i + 1}.** ${questions[i]?.prompt ?? ""}`}
                    className="min-w-0 flex-1 text-[13px] font-semibold leading-snug [&_p]:my-0 [&_p]:text-[13px] [&_p]:font-semibold"
                  />
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      result.verdict === "correct"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : result.verdict === "partial"
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                        : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {result.score}/100 · {result.verdict}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground">Your answer: </span>
                  {textAnswers[i]?.trim() || "(left blank)"}
                </p>
                <MathMarkdown
                  content={`**Feedback:** ${result.feedback}`}
                  className="[&_p]:my-0 [&_p]:text-[11px] [&_p]:text-muted-foreground"
                />
                {result.modelAnswer && (
                  <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/10 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                      Model answer
                    </p>
                    <MathMarkdown
                      content={result.modelAnswer}
                      className="mt-1 [&_p]:my-1 [&_p]:text-[11px] [&_p]:leading-relaxed [&_p]:text-muted-foreground"
                    />
                  </div>
                )}
                {result.improvements.length > 0 && (
                  <ul className="space-y-1 pt-1">
                    {result.improvements.map((imp, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-1.5 text-[11px] text-muted-foreground"
                      >
                        <Lightbulb className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                        <MathMarkdown content={imp} className="[&_p]:my-0 [&_p]:text-[11px] [&_p]:text-muted-foreground" />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" onClick={onBack} className="rounded-xl">
                ← Back to Config
              </Button>
              <Button
                onClick={onRegenerate}
                className="rounded-xl bg-primary hover:bg-primary/90"
              >
                <Sparkles className="mr-2 h-4 w-4" /> Generate Another Set
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results (choice formats) */}
      {showResults && isChoice && (
        <Card className="overflow-hidden border-emerald-200 dark:border-emerald-800">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
          <CardContent className="pt-8 pb-6 text-center space-y-4">
            <div className="flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold text-white"
                style={{
                  background:
                    pct >= 80
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : pct >= 50
                      ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                      : "linear-gradient(135deg, #f59e0b, #d97706)",
                }}
              >
                {pct}%
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {score} / {total} correct
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {pct >= 80
                  ? "Excellent! You have this subject down."
                  : pct >= 50
                  ? "Good effort — review the ones you missed."
                  : "Keep practising. You will improve with every attempt."}
              </p>
            </div>
            <Progress value={pct} className="h-3 accent-emerald-500" />
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" onClick={onBack} className="rounded-xl">
                ← Back to Config
              </Button>
              <Button
                onClick={onRegenerate}
                className="rounded-xl bg-primary hover:bg-primary/90"
              >
                <Sparkles className="mr-2 h-4 w-4" /> Generate Another Set
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Reusable studio flow ─────────────────────────────────────────────────────

export function QuizStudio() {
  const [phase, setPhase] = useState<"config" | "quiz">("config");
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [difficulty, setDifficulty] = useState<"easy" | "intermediate" | "hard">(
    "intermediate"
  );
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [format, setFormat] = useState<QuizFormat>("mcq");

  const [subjectSlug, setSubjectSlug] = useState<string>("");
  const [classSlug, setClassSlug] = useState<string>("class-11-notes");

  const handleGenerate = async (params: {
    classSlug: string;
    subjectSlug: string;
    topic: string;
    difficulty: "easy" | "intermediate" | "hard";
    count: number;
    format: QuizFormat;
  }) => {
    setGenerating(true);
    setError(null);
    try {
      const res = await generateQuestions({
        classSlug: params.classSlug,
        subjectSlug: params.subjectSlug,
        topic: params.topic || undefined,
        difficulty: params.difficulty,
        count: params.count,
        format: params.format,
      });
      setQuestions(res.questions);
      // Server-attested guest pool: mirror the REAL remainder so a cleared
      // localStorage / page refresh can never display a refilled quota.
      if (typeof res.remaining === "number") {
        writeGuestCount(Math.max(0, GUEST_DAILY_LIMIT - res.remaining));
      }
      recordAiSparkUse();
      setDifficulty(params.difficulty);
      setSubjectSlug(params.subjectSlug);
      setClassSlug(params.classSlug);
      setFormat(params.format);
      setPhase("quiz");
    } catch (err: unknown) {
      // api-client throws Error(message) — message carries the server's
      // human text (quota/credits/AI failures); the old `"error" in err`
      // check never matched an Error, so everyone saw the generic fallback.
      const msg =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Failed to generate questions. Please try again.";
      setError(msg);
      // Guest pool exhausted (server 402) → disable the client mirror too.
      const status =
        err && typeof err === "object" && "status" in err
          ? (err as { status?: number }).status
          : undefined;
      if (status === 402 && /free (AI|quiz) generations|guest/i.test(msg)) {
        writeGuestCount(GUEST_DAILY_LIMIT);
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleRegenerate = () => {
    setPhase("config");
    setError(null);
  };

  const handleFinishQuiz = async (summary: {
    format: QuizFormat;
    answered: number;
    correct: number;
    scorePct?: number;
    evaluation?: EvaluateAnswersResponse;
  }) => {
    if (questions.length === 0) return;
    const { answered, correct, scorePct } = summary;
    const subjectName =
      SYLLABUS.flatMap((c) => c.subjects).find((s) => s.slug === subjectSlug)?.name ??
      "Quiz";
    const ok = await saveQuizHistory({
      title: `${subjectName} — ${questions.length} questions`,
      classSlug,
      subjectSlug,
      topic: questions[0]?.topic ?? undefined,
      difficulty,
      format: summary.format,
      questions,
      answered,
      correct,
      scorePct,
    });
    if (ok.migrated === false) {
      toast(
        "Your quiz result was shown, but it was not saved to your account.",
        {
          description: "Quiz history storage is not available in this deployment yet.",
          icon: <Save className="h-4 w-4" />,
        },
      );
    }
    // Real event → real alert. The score is the one the student just earned,
    // never a placeholder, and it feeds the notification badges live.
    const accuracy = scorePct ?? (answered > 0 ? Math.round((correct / answered) * 100) : 0);
    pushNotification({
      id: `quiz-${Date.now()}`,
      category: "curriculum",
      title: `${subjectName} quiz — ${accuracy}%`,
      body: `You answered ${correct} of ${answered} questions correctly. Open your history to review each answer and explanation.`,
      href: "/ai-quiz/history",
      actionLabel: "Review answers",
    });
    // Every live score/overall view refreshes from the new real result.
    notifyLiveStatsChanged();
  };

  return (
    <>
      {error && (
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-950/20 px-4 py-3 text-[13px] text-rose-700 dark:text-rose-400">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}
      {phase === "config" ? (
        <ConfigScreen onGenerate={handleGenerate} generating={generating} />
      ) : (
        <QuizScreen
          questions={questions}
          difficulty={difficulty}
          format={format}
          classSlug={classSlug}
          subjectSlug={subjectSlug}
          onBack={() => setPhase("config")}
          onRegenerate={handleRegenerate}
          onFinishQuiz={handleFinishQuiz}
        />
      )}
    </>
  );
}
