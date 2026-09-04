"use client";

import { useState, useMemo } from "react";
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
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SYLLABUS, type ClassSyllabus, type SubjectSyllabus } from "@/lib/syllabus";
import { generateQuestions } from "@/lib/api/ai";
import type { GeneratedQuestion } from "@/types/api";
import Link from "next/link";

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
  }) => void;
  generating: boolean;
}) {
  const [classSlug, setClassSlug] = useState("class-11-notes");
  const [subjectSlug, setSubjectSlug] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "intermediate" | "hard">(
    "intermediate"
  );
  const [count, setCount] = useState(10);

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
    <div className="mx-auto max-w-2xl space-y-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Quiz Generator</h1>
          <p className="text-sm text-muted-foreground">
            Generate practice questions from syllabus content — powered by AI
          </p>
        </div>
      </div>

      {/* Class selector */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
            Step 1 — Select class & subject
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
                className="rounded-xl h-11 text-sm"
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
            <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
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
              <label className="text-xs font-medium text-muted-foreground">
                Topic (optional — leave blank for full subject)
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">All topics in {subjectData?.name ?? ""}</option>
                {allTopics.map((t) => (
                  <option key={t.label} value={t.label}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
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
                      className={`flex-1 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all ${
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
              <label className="text-xs font-medium text-muted-foreground">
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
                  topic,
                  difficulty,
                  count,
                })
              }
              disabled={!canGenerate || generating}
              className="w-full rounded-xl py-6 text-base font-semibold"
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
  onBack,
  onRegenerate,
}: {
  questions: GeneratedQuestion[];
  difficulty: "easy" | "intermediate" | "hard";
  onBack: () => void;
  onRegenerate: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const q = questions[currentIndex];
  const meta = DIFF_META[difficulty];
  const total = questions.length;
  const answered = Object.keys(selectedIndices).length;
  const score = questions.reduce(
    (sum, question, i) =>
      sum + (selectedIndices[i] === question.correctIndex ? 1 : 0),
    0
  );
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const selectAnswer = (qIdx: number, optIdx: number) => {
    if (showResults) return;
    setSelectedIndices((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const goTo = (i: number) => setCurrentIndex(Math.max(0, Math.min(total - 1, i)));

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-8">
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
        <div className="flex items-center justify-between text-xs text-muted-foreground">
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
              <CardTitle className="text-base leading-relaxed">{q.prompt}</CardTitle>
              <CardDescription className="mt-1 text-xs">
                Topic: {q.topic}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {q.options.map((opt, optIdx) => {
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
                className={`w-full text-left rounded-xl border-2 px-4 py-3 text-sm transition-all hover:bg-accent disabled:cursor-default ${
                  showFeedback ? className : "border-border bg-background"
                } ${isSelected && !showFeedback ? "border-primary bg-primary/5" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
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
                </div>
              </button>
            );
          })}

          {/* Explanation (shown after answer or at end) */}
          {(showResults || selectedIndices[currentIndex] !== undefined) && (
            <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
              <span className="font-semibold text-primary">Explanation: </span>
              {q.explanation}
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
                  : selectedIndices[i] !== undefined
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
            onClick={() => setShowResults(true)}
            disabled={answered < total}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
          >
            Finish Quiz
          </Button>
        )}
      </div>

      {/* Results */}
      {showResults && (
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
              <p className="mt-1 text-sm text-muted-foreground">
                {pct >= 80
                  ? "Excellent! You've got this subject down."
                  : pct >= 50
                  ? "Good effort — review the ones you missed."
                  : "Keep practising. You'll improve with every attempt."}
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

// ── Main Page ────────────────────────────────────────────────────────────────

export default function AiQuizPage() {
  const [phase, setPhase] = useState<"config" | "quiz">("config");
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [difficulty, setDifficulty] = useState<"easy" | "intermediate" | "hard">(
    "intermediate"
  );
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (params: {
    classSlug: string;
    subjectSlug: string;
    topic: string;
    difficulty: "easy" | "intermediate" | "hard";
    count: number;
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
      });
      setQuestions(res.questions);
      setDifficulty(params.difficulty);
      setPhase("quiz");
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "error" in (err as any)
          ? (err as any).error
          : "Failed to generate questions. Please try again.";
      setError(msg);
    } finally {
      setGenerating(false);
    }
  };

  const handleRegenerate = () => {
    setPhase("config");
    setError(null);
  };

  return (
    <>
      {error && (
        <div className="mx-auto max-w-2xl mt-4">
          <div className="rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-950/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-400">
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
          onBack={() => setPhase("config")}
          onRegenerate={handleRegenerate}
        />
      )}
    </>
  );
}
