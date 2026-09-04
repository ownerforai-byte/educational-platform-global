"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, ChevronLeft, Clock, Lightbulb, BookOpen, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { SYLLABUS } from "@/lib/syllabus";
import { getSubjectPyqBank, type PyqYear } from "@/lib/pyq-bank";
import { MISCONCEPTION_QUESTIONS, type MisconceptionQuestion } from "@/lib/misconception-questions";
import type { MisconceptionQuestion as MCQ } from "@/lib/misconception-questions";

// ── Types ───────────────────────────────────────────────────────────────────

type QuizMode = "pyq" | "misconception";
type QuizPhase = "select" | "quiz" | "review" | "results";

interface QuizQuestion {
  id: string;
  prompt: string;
  marks?: string | number;
  /** For PYQ: the model answer. For misconception: the explanation. */
  solution: string;
  /** For misconception mode: whether the statement is true */
  isTrue?: boolean;
}

interface QuizSession {
  mode: QuizMode;
  subject: string;
  year?: number;
  questions: QuizQuestion[];
  answers: Record<string, string | boolean>; // questionId → answer
  submitted: boolean;
}

// ── Data helpers ─────────────────────────────────────────────────────────────

function buildPyqQuestions(pyqs: PyqYear[], yearFilter?: number): QuizQuestion[] {
  const years = yearFilter ? pyqs.filter((p) => p.year === yearFilter) : pyqs;
  const questions: QuizQuestion[] = [];
  for (const pyq of years) {
    for (let i = 0; i < pyq.questions.length; i++) {
      const q = pyq.questions[i];
      questions.push({
        id: `pyq-${pyq.year}-${i}`,
        prompt: q.question,
        marks: q.marks,
        solution: q.solution ?? "Refer to the model answer in the PYQ source.",
      });
    }
  }
  return questions;
}

function buildMisconceptionQuestions(subject: string): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  for (const tc of MISCONCEPTION_QUESTIONS) {
    if (tc.subject.toLowerCase() !== subject.toLowerCase()) continue;
    for (let i = 0; i < tc.questions.length; i++) {
      const q = tc.questions[i];
      questions.push({
        id: `mcq-${tc.topicSlug}-${i}`,
        prompt: q.prompt,
        solution: q.truth,
        isTrue: q.verdict === "TRUE",
      });
    }
  }
  return questions;
}

// ── Subject config ───────────────────────────────────────────────────────────

const SUBJECT_COLORS: Record<string, string> = {
  physics: "#3b82f6",
  chemistry: "#10b981",
  mathematics: "#8b5cf6",
  biology: "#22c55e",
  english: "#f59e0b",
  nepali: "#ef4444",
};

const SUBJECT_EMOJI: Record<string, string> = {
  physics: "⚡",
  chemistry: "🧪",
  mathematics: "🔢",
  biology: "🌿",
  english: "📖",
  nepali: "🇳🇵",
};

// ── Selection screen ─────────────────────────────────────────────────────────

function SelectScreen({ onStart }: { onStart: (mode: QuizMode, subject: string, year?: number) => void }) {
  const [mode, setMode] = useState<QuizMode>("misconception");
  const [classSlug, setClassSlug] = useState("class-11-notes");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState<number | undefined>();

  const classData = SYLLABUS.find((c) => c.slug === classSlug);
  const subjects = classData?.subjects ?? [];

  const handleStart = () => {
    if (subject) onStart(mode, subject, year);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">PYQ Practice</h1>
        <p className="mt-2 text-muted-foreground">
          Test yourself with past year questions and misconception checks.
        </p>
      </div>

      {/* Mode selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quiz Mode</CardTitle>
          <CardDescription>Choose how you want to practice</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMode("misconception")}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              mode === "misconception"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <div className="text-2xl mb-2">💡</div>
            <div className="font-semibold text-sm">Misconception Check</div>
            <div className="text-xs text-muted-foreground mt-1">
              True/False concept traps with explanations
            </div>
          </button>
          <button
            onClick={() => setMode("pyq")}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              mode === "pyq"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="font-semibold text-sm">Past Year Questions</div>
            <div className="text-xs text-muted-foreground mt-1">
              NEB exam questions with model answers
            </div>
          </button>
        </CardContent>
      </Card>

      {/* Class selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Class</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {(["class-11-notes", "class-12-notes"] as const).map((s) => (
              <Button
                key={s}
                variant={classSlug === s ? "default" : "outline"}
                onClick={() => { setClassSlug(s); setSubject(""); setYear(undefined); }}
                className="rounded-xl"
              >
                {s === "class-11-notes" ? "Class 11" : "Class 12"}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {subjects.map((subj) => (
              <button
                key={subj.slug}
                onClick={() => setSubject(subj.slug)}
                className={`flex items-center gap-2 rounded-xl border-2 p-3 text-left transition-all ${
                  subject === subj.slug
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <span className="text-xl">{SUBJECT_EMOJI[subj.slug] ?? "📘"}</span>
                <span className="font-semibold text-sm">{subj.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Year selector (only for PYQ mode) */}
      {mode === "pyq" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Exam Year</CardTitle>
            <CardDescription>Select a year or practice all available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={year === undefined ? "default" : "outline"}
                onClick={() => setYear(undefined)}
                className="rounded-xl"
              >
                All Years
              </Button>
              {[2082, 2081, 2080, 2079, 2078, 2077].map((y) => (
                <Button
                  key={y}
                  variant={year === y ? "default" : "outline"}
                  onClick={() => setYear(y)}
                  className="rounded-xl"
                >
                  {y}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={handleStart}
        disabled={!subject}
        className="w-full rounded-xl py-6 text-lg"
      >
        Start Quiz <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}

// ── Quiz screen ──────────────────────────────────────────────────────────────

function QuizScreen({
  session,
  color,
  emoji,
  onBack,
  onNext,
  onPrev,
  onFinish,
}: {
  session: QuizSession;
  color: string;
  emoji: string;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | boolean>("");
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = session.questions[currentIndex];
  const total = session.questions.length;
  const isLast = currentIndex === total - 1;
  const isFirst = currentIndex === 0;

  const handleSubmit = () => {
    if (!userAnswer && userAnswer !== false) return;
    setAnswered(true);
    session.answers[question.id] = userAnswer as string | boolean;
  };

  const handleNext = () => {
    if (!answered) { handleSubmit(); return; }
    if (isLast) onFinish();
    else onNext();
  };

  const handlePrev = () => {
    if (!answered) return;
    onPrev();
    const prevQ = session.questions[currentIndex - 1];
    setUserAnswer(session.answers[prevQ?.id] ?? "");
    setAnswered(!!session.answers[prevQ?.id]);
  };

  if (!question) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-4 py-6">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-muted">
          <div
            className="h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / total) * 100}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Question card */}
      <Card className="overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: color }} />
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{emoji}</span>
              <div>
                <CardTitle className="text-base">Question {currentIndex + 1}</CardTitle>
                {session.mode === "pyq" && question.marks && (
                  <CardDescription>
                    {typeof question.marks === "number" ? `${question.marks} marks` : question.marks}
                  </CardDescription>
                )}
              </div>
            </div>
            {session.mode === "misconception" && (
              <Badge variant="outline" className="text-xs">
                True or False?
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Question text */}
          <div className="rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
            {question.prompt}
          </div>

          {/* Answer input */}
          {session.mode === "misconception" ? (
            <div className="flex gap-3">
              <Button
                variant={userAnswer === true && answered ? "default" : userAnswer === true ? "outline" : "ghost"}
                onClick={() => { setUserAnswer(true); setAnswered(false); }}
                disabled={answered}
                className="flex-1 rounded-xl py-6 text-base"
              >
                ✅ True
              </Button>
              <Button
                variant={userAnswer === false && answered ? "default" : userAnswer === false ? "outline" : "ghost"}
                onClick={() => { setUserAnswer(false); setAnswered(false); }}
                disabled={answered}
                className="flex-1 rounded-xl py-6 text-base"
              >
                ❌ False
              </Button>
            </div>
          ) : (
            <textarea
              value={userAnswer as string}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={answered}
              placeholder="Type your answer here…"
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          )}

          {!answered && (
            <Button onClick={handleSubmit} disabled={!userAnswer && userAnswer !== false} className="w-full rounded-xl">
              Submit Answer
            </Button>
          )}

          {/* Solution reveal */}
          {answered && (
            <div className="space-y-3 pt-2">
              <div className={`rounded-xl p-4 text-sm ${
                session.mode === "misconception"
                  ? (userAnswer === question.isTrue
                      ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800")
                  : "bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
              }`}>
                <div className="flex items-center gap-2 font-semibold mb-1">
                  {session.mode === "misconception"
                    ? (userAnswer === question.isTrue ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />)
                    : <BookOpen className="h-4 w-4" />
                  }
                  {session.mode === "misconception"
                    ? (userAnswer === question.isTrue ? "Correct!" : "Not quite — see explanation below")
                    : "Model Answer"
                  }
                </div>
                <p className="leading-relaxed">{question.solution}</p>
              </div>

              {/* Hint toggle for PYQ */}
              {session.mode === "pyq" && !showHint && (
                <Button variant="ghost" size="sm" onClick={() => setShowHint(true)} className="text-xs">
                  <Lightbulb className="h-3 w-3 mr-1" /> Show key points
                </Button>
              )}
              {showHint && session.mode === "pyq" && (
                <p className="text-xs text-muted-foreground italic">
                  Focus on the key formula/concept mentioned in the question. Structure your answer with definition → derivation → application.
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-xs">
              <ArrowLeft className="h-3 w-3 mr-1" /> Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrev} disabled={isFirst || !answered} className="rounded-lg text-xs">
                <ChevronLeft className="h-3 w-3 mr-1" /> Prev
              </Button>
              <Button variant="outline" size="sm" onClick={handleNext} className="rounded-lg text-xs">
                {isLast ? "Finish" : "Next"} <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Results screen ───────────────────────────────────────────────────────────

function ResultsScreen({
  session,
  color,
  emoji,
  onBack,
  onRetry,
}: {
  session: QuizSession;
  color: string;
  emoji: string;
  onBack: () => void;
  onRetry: () => void;
}) {
  const total = session.questions.length;
  const correct = session.questions.filter((q) => {
    const ans = session.answers[q.id];
    if (q.isTrue !== undefined) return ans === q.isTrue;
    return !!ans && (ans as string).length > 5; // PYQ: any substantive answer counts
  }).length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  const message =
    pct >= 80 ? "Excellent! You've got this! 🎉"
    : pct >= 60 ? "Good progress! Keep practicing 💪"
    : pct >= 40 ? "Getting there — review the topics you missed 📖"
    : "Keep at it! Try the misconception quiz first for concept clarity 🌱";

  return (
    <div className="mx-auto max-w-xl space-y-6 py-10">
      <div className="text-center space-y-3">
        <div className="text-6xl">{emoji}</div>
        <h1 className="text-3xl font-bold">Quiz Complete!</h1>
        <p className="text-muted-foreground">{message}</p>
      </div>

      <Card className="overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: color }} />
        <CardContent className="pt-8">
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold tabular-nums" style={{ color }}>
              {pct}%
            </div>
            <p className="text-sm text-muted-foreground">
              {correct} out of {total} questions answered
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Question review */}
      <div className="space-y-2">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Review</h2>
        {session.questions.map((q, i) => {
          const ans = session.answers[q.id];
          const isCorrect = q.isTrue !== undefined ? ans === q.isTrue : (!!ans && (ans as string).length > 5);
          return (
            <div
              key={q.id}
              className={`flex items-start gap-3 rounded-lg border p-3 text-sm ${
                isCorrect
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20"
                  : "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20"
              }`}
            >
              <span className="shrink-0 mt-0.5">{isCorrect ? "✅" : "❌"}</span>
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{q.prompt}</p>
                {!isCorrect && <p className="text-xs text-muted-foreground mt-0.5">{q.solution}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 rounded-xl">
          ← Back to Selection
        </Button>
        <Button onClick={onRetry} className="flex-1 rounded-xl" style={{ backgroundColor: color }}>
          <RotateCcw className="h-4 w-4 mr-2" /> Retry
        </Button>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [phase, setPhase] = useState<QuizPhase>("select");
  const [session, setSession] = useState<QuizSession | null>(null);
  const [loaded, setLoaded] = useState(false);

  const color = session ? (SUBJECT_COLORS[session.subject] ?? "#64748b") : "#64748b";
  const emoji = session ? (SUBJECT_EMOJI[session.subject] ?? "📘") : "📘";

  const startQuiz = async (mode: QuizMode, subject: string, year?: number) => {
    let questions: QuizQuestion[] = [];
    if (mode === "misconception") {
      questions = buildMisconceptionQuestions(subject);
    } else {
      const bank = await getSubjectPyqBank(
        "class-11-notes",
        subject,
        5
      ).catch(() => ({ theory: [], pyqs: [] }));
      questions = buildPyqQuestions(bank.pyqs, year);
      // Fallback to class-12 if empty
      if (questions.length === 0) {
        const bank12 = await getSubjectPyqBank(
          "class-12-notes",
          subject,
          5
        ).catch(() => ({ theory: [], pyqs: [] }));
        questions = buildPyqQuestions(bank12.pyqs, year);
      }
    }
    if (questions.length === 0) {
      // Fallback: use whatever we can find
      questions = buildMisconceptionQuestions(subject);
    }
    setSession({ mode, subject, year, questions, answers: {}, submitted: false });
    setPhase("quiz");
  };

  const handleNext = () => {
    if (session) {
      setSession({ ...session }); // trigger re-render
    }
  };

  const handlePrev = () => {
    if (session) setSession({ ...session });
  };

  const handleFinish = () => {
    if (session) setSession({ ...session, submitted: true });
    setPhase("results");
  };

  const handleBack = () => {
    setSession(null);
    setPhase("select");
  };

  const handleRetry = () => {
    if (session) startQuiz(session.mode, session.subject, session.year);
  };

  // Initial load
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div>
      {phase === "select" && <SelectScreen onStart={startQuiz} />}
      {phase === "quiz" && session && (
        <QuizScreen
          session={session}
          color={color}
          emoji={emoji}
          onBack={handleBack}
          onNext={handleNext}
          onPrev={handlePrev}
          onFinish={handleFinish}
        />
      )}
      {phase === "results" && session && (
        <ResultsScreen
          session={session}
          color={color}
          emoji={emoji}
          onBack={handleBack}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
