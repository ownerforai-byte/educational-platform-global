"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUp,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  GraduationCap,
  History,
  Lightbulb,
  Loader2,
  Plus,
  RotateCcw,
  Sigma,
  Sparkles,
  Target,
  UserRound,
  X,
  type LucideIcon,
  Square,
} from "lucide-react";
import { CaptainAvatar, CaptainMark } from "@/components/ai/captain-logo";
import {
  AiSparkBadge,
  recordAiSparkUse,
  refreshAiSparkMeters,
} from "@/components/ai/ai-spark-badge";
import { VoiceMicButton } from "@/components/ai/voice-mic-button";
import { InteractiveMarkdown } from "@/components/content/interactive-markdown";
import { AiReplyCard } from "@/components/ai/ai-reply-card";
import { MathMarkdown } from "@/components/content/math-markdown";
import { useSession } from "@/features/auth/hooks/use-session";
import { hasLevel } from "@/lib/access-level";
import { apiFetch } from "@/lib/api-client";
import { reportClientError } from "@/lib/errors/app-error";
import {
  evaluateAnswers,
  generateQuestions,
  getChatHistory,
  getChatSessions,
  saveChatHistory,
  streamChat,
  type ChatHistoryMessage,
  type ChatSession,
} from "@/lib/api/ai";
import { useVoiceInput } from "@/lib/hooks/use-voice-input";
import { AiStatusDot } from "@/components/ai/ai-status-dot";
import { VOICE_AUTO_SEND_MS } from "@/lib/chat/silence-trigger";
import { SYLLABUS } from "@/lib/syllabus";
import type {
  AIChatMessage,
  EvaluateAnswersResponse,
  GeneratedQuestion,
  QuizFormat,
} from "@/types/api";

type Mode = "teach" | "solve" | "deep-dive" | "practice";
type Line = { role: "user" | "assistant"; content: string };
type Difficulty = "easy" | "intermediate" | "hard";
type Depth = "intuitive" | "exam-mastery" | "deep-synthesis";

type MathSolveResponse = {
  solution: string;
  provider: string;
  subject: string;
  classLevel: string;
};

type DeepDiveResponse = {
  explanation: string;
  provider: string;
  topic: string;
  depth: Depth;
  subject: string;
  classLevel: string;
};

const MODES: Array<{ id: Mode; label: string; icon: LucideIcon }> = [
  { id: "teach", label: "Teach", icon: GraduationCap },
  { id: "solve", label: "Solve", icon: Sigma },
  { id: "deep-dive", label: "Deep Dive", icon: Brain },
  { id: "practice", label: "Practice", icon: Target },
];

const LESSON_STARTERS = [
  "Teach me the derivation of Bernoulli's equation with the physical meaning of every term.",
  "Explain aldol condensation as a mechanism, then give me a board-exam trap to watch for.",
  "Build my intuition for wave-particle duality using one experiment and one numerical example.",
  "Compare leading and lagging strand synthesis, then test my understanding with two questions.",
];

const FORMATS: Array<{ id: QuizFormat; label: string }> = [
  { id: "mcq", label: "Multiple choice" },
  { id: "true-false", label: "True / false" },
  { id: "fill-blank", label: "Fill blank" },
  { id: "short-answer", label: "Short answer" },
  { id: "long-answer", label: "Writing test" },
];

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message.trim() ? error.message : fallback;
}

function SolveStudio({ classLevel, subject }: { classLevel: string; subject: string }) {
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState<MathSolveResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function solve() {
    const value = problem.trim();
    if (!value || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await apiFetch<MathSolveResponse>("/api/ai/solve-math", {
        method: "POST",
        body: JSON.stringify({
          problem: value,
          subject,
          classLevel,
          stepByStep: true,
          verification: true,
        }),
      });
      setResult(response);
      recordAiSparkUse();
    } catch (err) {
      reportClientError("professor-widget-solve", err);
      setError(errorMessage(err, "Veer could not solve this problem. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5 p-4 sm:p-6">
      <div className="overflow-hidden rounded-2xl border-2 border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 via-card to-card">
        <div className="border-b border-indigo-500/10 px-5 py-5 sm:px-6">
          <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
            <Sigma className="h-5 w-5" />
          </span>
          <h2 className="text-xl font-black tracking-tight">Derivation & numerical desk</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Step-by-step working, dimensional checks, and a verification pass for Class {classLevel} {subject}.
          </p>
        </div>
        <form
          className="space-y-3 p-5 sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            void solve();
          }}
        >
          <label htmlFor="professor-problem" className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Problem or derivation
          </label>
          <textarea
            id="professor-problem"
            value={problem}
            onChange={(event) => setProblem(event.target.value)}
            rows={5}
            placeholder="Example: A projectile is launched at 20 m/s at 30°. Derive its range and verify the result."
            className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Steps and answer verification included
            </span>
            <button
              type="submit"
              disabled={loading || !problem.trim()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sigma className="h-4 w-4" />}
              {loading ? "Working through it…" : "Solve with verification"}
            </button>
          </div>
        </form>
      </div>
      {error && <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
      {result && (
        <AiReplyCard
          compact
          title="Verified professor solution"
          reply={result.solution}
          context={{ surface: "widget", subjectName: subject }}
        >
          <InteractiveMarkdown content={result.solution} className="chat-reading" />
        </AiReplyCard>
      )}
    </div>
  );
}

function DeepDiveStudio({ classLevel, subject }: { classLevel: string; subject: string }) {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState<Depth>("exam-mastery");
  const [result, setResult] = useState<DeepDiveResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function synthesize() {
    const value = topic.trim();
    if (!value || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await apiFetch<DeepDiveResponse>("/api/ai/deep-dive", {
        method: "POST",
        body: JSON.stringify({ topic: value, subject, classLevel, depth }),
      });
      setResult(response);
      recordAiSparkUse();
    } catch (err) {
      reportClientError("professor-widget-deep-dive", err);
      setError(errorMessage(err, "Veer could not build this concept synthesis. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5 p-4 sm:p-6">
      <div className="overflow-hidden rounded-2xl border-2 border-sky-500/25 bg-gradient-to-br from-sky-500/10 via-card to-card">
        <div className="border-b border-sky-500/10 px-5 py-5 sm:px-6">
          <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20">
            <Brain className="h-5 w-5" />
          </span>
          <h2 className="text-xl font-black tracking-tight">Concept synthesis laboratory</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            First principles, connected ideas, intuitive models, and exam-specific misconceptions in one rigorous brief.
          </p>
        </div>
        <form
          className="space-y-4 p-5 sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            void synthesize();
          }}
        >
          <div className="space-y-2">
            <label htmlFor="professor-deep-topic" className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Concept to master
            </label>
            <textarea
              id="professor-deep-topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              rows={3}
              placeholder="Example: Lenz's law as a consequence of conservation of energy"
              className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/10"
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3" role="group" aria-label="Synthesis depth">
            {([
              ["intuitive", "Intuitive", "Mental models first"],
              ["exam-mastery", "Exam mastery", "Board traps and method"],
              ["deep-synthesis", "Deep synthesis", "Advanced connections"],
            ] as const).map(([id, label, description]) => (
              <button
                key={id}
                type="button"
                onClick={() => setDepth(id)}
                aria-pressed={depth === id}
                className={`rounded-2xl border px-3 py-3 text-left transition ${depth === id ? "border-sky-500 bg-sky-500/10 ring-2 ring-sky-500/15" : "border-border bg-background hover:border-sky-500/40"}`}
              >
                <span className="block text-sm font-bold">{label}</span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">{description}</span>
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lightbulb className="h-4 w-4" />}
            {loading ? "Connecting the ideas…" : "Build concept synthesis"}
          </button>
        </form>
      </div>
      {error && <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
      {result && (
        <AiReplyCard
          compact
          title={`${result.depth.replace("-", " ")} synthesis`}
          reply={result.explanation}
          context={{ surface: "widget", subjectName: subject }}
        >
          <InteractiveMarkdown content={result.explanation} className="chat-reading" />
        </AiReplyCard>
      )}
    </div>
  );
}

function PracticeStudio({ classSlug, subjectSlug }: { classSlug: string; subjectSlug: string }) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [format, setFormat] = useState<QuizFormat>("mcq");
  const [count, setCount] = useState(5);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluateAnswersResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const choiceFormat = format === "mcq" || format === "true-false";
  const answered = questions.filter((_, index) => (answers[index] ?? "").trim()).length;
  const correct = questions.reduce((score, question, index) => score + (Number(answers[index]) === question.correctIndex ? 1 : 0), 0);
  const evaluatedScore = evaluation
    ? Math.round(evaluation.results.reduce((sum, item) => sum + item.score, 0) / Math.max(1, evaluation.results.length))
    : 0;

  async function createPractice() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const response = await generateQuestions({
        classSlug,
        subjectSlug,
        topic: topic.trim() || undefined,
        difficulty,
        count,
        format,
      });
      setQuestions(response.questions);
      setAnswers({});
      setEvaluation(null);
      setRevealed(false);
      recordAiSparkUse();
    } catch (err) {
      reportClientError("professor-widget-practice", err);
      setError(errorMessage(err, "Veer could not create this practice set. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  async function submitPractice() {
    if (answered !== questions.length || revealed || evaluating) return;
    if (choiceFormat) {
      setRevealed(true);
      return;
    }
    setEvaluating(true);
    setError(null);
    try {
      const response = await evaluateAnswers({
        classSlug,
        subjectSlug,
        topic: questions[0]?.topic || topic.trim() || undefined,
        format,
        items: questions.map((question, index) => ({
          prompt: question.prompt,
          userAnswer: answers[index] ?? "",
          modelAnswer: question.modelAnswer,
          rubric: question.rubric,
          acceptedAnswers: question.acceptedAnswers,
          maxScore: question.maxScore,
        })),
      });
      setEvaluation(response);
      setRevealed(true);
      recordAiSparkUse();
    } catch (err) {
      reportClientError("professor-widget-evaluation", err);
      setError(errorMessage(err, "Your answers are safe, but AI evaluation failed. Please submit again."));
    } finally {
      setEvaluating(false);
    }
  }

  function resetPractice() {
    setQuestions([]);
    setAnswers({});
    setEvaluation(null);
    setRevealed(false);
    setError(null);
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5 p-4 sm:p-6">
      <div className="rounded-2xl border-2 border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-card to-card p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500 text-white shadow-lg shadow-violet-500/20">
              <Target className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-black tracking-tight">Adaptive practice room</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Syllabus-grounded questions with instant reasoning or AI-marked written answers.
            </p>
          </div>
          {questions.length > 0 && (
            <button type="button" onClick={resetPractice} className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold hover:border-violet-500/40">
              <RotateCcw className="h-3.5 w-3.5" /> New set
            </button>
          )}
        </div>
        {questions.length === 0 && (
          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <label htmlFor="professor-practice-topic" className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Topic <span className="font-normal normal-case tracking-normal">(optional)</span></label>
              <input
                id="professor-practice-topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="Leave blank for the whole subject"
                className="min-h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Difficulty</span>
                <div className="flex rounded-xl border border-border bg-background p-1">
                  {(["easy", "intermediate", "hard"] as const).map((level) => (
                    <button key={level} type="button" onClick={() => setDifficulty(level)} aria-pressed={difficulty === level} className={`flex-1 rounded-lg px-2 py-2 text-xs font-bold capitalize transition ${difficulty === level ? "bg-violet-500 text-white" : "text-muted-foreground hover:text-foreground"}`}>{level}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Questions</span>
                <div className="flex rounded-xl border border-border bg-background p-1">
                  {[3, 5, 10].map((value) => (
                    <button key={value} type="button" onClick={() => setCount(value)} aria-pressed={count === value} className={`flex-1 rounded-lg px-2 py-2 text-xs font-bold transition ${count === value ? "bg-violet-500 text-white" : "text-muted-foreground hover:text-foreground"}`}>{value}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Format</span>
              <div className="flex flex-wrap gap-2">
                {FORMATS.map((item) => (
                  <button key={item.id} type="button" onClick={() => setFormat(item.id)} aria-pressed={format === item.id} className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${format === item.id ? "border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400" : "border-border bg-background text-muted-foreground hover:text-foreground"}`}>{item.label}</button>
                ))}
              </div>
            </div>
            <button type="button" onClick={() => void createPractice()} disabled={loading} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Writing your practice set…" : `Generate ${count} questions`}
            </button>
          </div>
        )}
      </div>
      {error && <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
      {questions.length > 0 && (
        <>
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-xs font-semibold">
            <span className="capitalize text-muted-foreground">{difficulty} · {FORMATS.find((item) => item.id === format)?.label}</span>
            <span>{answered}/{questions.length} answered</span>
          </div>
          {questions.map((question, index) => {
            const result = evaluation?.results[index];
            const selected = Number(answers[index]);
            const isCorrect = selected === question.correctIndex;
            return (
              <article key={`${question.prompt}-${index}`} className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-xs font-black text-violet-600 dark:text-violet-400">{index + 1}</span>
                  <MathMarkdown content={question.prompt} className="min-w-0 flex-1 font-semibold leading-relaxed [&_p]:my-0" />
                </div>
                {choiceFormat ? (
                  <div className="grid gap-2">
                    {question.options.map((option, optionIndex) => {
                      const chosen = answers[index] === String(optionIndex);
                      const answer = optionIndex === question.correctIndex;
                      return (
                        <button
                          key={`${option}-${optionIndex}`}
                          type="button"
                          disabled={revealed}
                          onClick={() => setAnswers((previous) => ({ ...previous, [index]: String(optionIndex) }))}
                          className={`flex items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${revealed && answer ? "border-emerald-500 bg-emerald-500/10" : revealed && chosen ? "border-rose-500 bg-rose-500/10" : chosen ? "border-violet-500 bg-violet-500/10" : "border-border bg-background hover:border-violet-500/40"}`}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-black">{String.fromCharCode(65 + optionIndex)}</span>
                          <span className="min-w-0 flex-1">{option}</span>
                          {revealed && answer && <Check className="h-4 w-4 shrink-0 text-emerald-500" />}
                          {revealed && chosen && !answer && <X className="h-4 w-4 shrink-0 text-rose-500" />}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <textarea
                    value={answers[index] ?? ""}
                    onChange={(event) => setAnswers((previous) => ({ ...previous, [index]: event.target.value }))}
                    disabled={revealed}
                    rows={format === "long-answer" ? 7 : 3}
                    aria-label={`Answer to question ${index + 1}`}
                    placeholder={format === "fill-blank" ? "Type the missing term…" : "Write your answer with reasoning…"}
                    className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 disabled:opacity-70"
                  />
                )}
                {revealed && choiceFormat && (
                  <div className={`mt-4 rounded-2xl px-4 py-3 text-xs leading-relaxed ${isCorrect ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-amber-500/10 text-amber-700 dark:text-amber-400"}`}>
                    <div className="mb-1 flex items-center gap-1.5 font-bold">{isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}{isCorrect ? "Correct reasoning" : "Professor's explanation"}</div>
                    <MathMarkdown content={question.explanation} className="[&_p]:my-0 [&_p]:text-xs" />
                  </div>
                )}
                {revealed && result && (
                  <div className="mt-4 space-y-3 rounded-2xl border border-violet-500/20 bg-violet-500/5 px-4 py-3 text-xs leading-relaxed">
                    <div className="flex items-center justify-between gap-2 font-bold"><span>AI marking report</span><span className="text-violet-600 dark:text-violet-400">{result.score}/100 · {result.verdict}</span></div>
                    <MathMarkdown content={result.feedback} className="[&_p]:my-0 [&_p]:text-xs" />
                    {result.modelAnswer && <div className="rounded-xl bg-background/70 p-3"><p className="mb-1 font-bold">Model answer</p><MathMarkdown content={result.modelAnswer} className="[&_p]:my-0 [&_p]:text-xs" /></div>}
                    {result.improvements.length > 0 && <ul className="space-y-1">{result.improvements.map((improvement, itemIndex) => <li key={itemIndex} className="flex gap-2"><Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" /><span>{improvement}</span></li>)}</ul>}
                  </div>
                )}
              </article>
            );
          })}
          {revealed ? (
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-center">
              <p className="text-2xl font-black">{choiceFormat ? `${correct}/${questions.length}` : `${evaluatedScore}%`}</p>
              <p className="mt-1 text-sm text-muted-foreground">{choiceFormat ? "correct answers" : evaluation?.summary || "AI evaluation complete"}</p>
            </div>
          ) : (
            <button type="button" onClick={() => void submitPractice()} disabled={answered !== questions.length || evaluating} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 disabled:opacity-50">
              {evaluating ? <Loader2 className="h-4 w-4 animate-spin" /> : choiceFormat ? <CheckCircle2 className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              {evaluating ? "Professor is marking…" : choiceFormat ? "Check my answers" : "Submit for AI evaluation"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export function AIWidget() {
  const { user, isLoading } = useSession();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("teach");
  const [view, setView] = useState<"home" | "thread">("home");
  const [classSlug, setClassSlug] = useState("class-11-notes");
  const [subjectSlug, setSubjectSlug] = useState("physics");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [streamPhase, setStreamPhase] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [session, setSession] = useState("professor:default");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loadingThread, setLoadingThread] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sessionsLoadedRef = useRef(false);
  const classData = useMemo(() => SYLLABUS.find((item) => item.slug === classSlug) ?? SYLLABUS[0], [classSlug]);
  const subjects = classData?.subjects ?? [];
  const classLevel = classSlug.match(/\d+/)?.[0] ?? "11";
  const contextKey = `${classSlug}:${subjectSlug}`;

  const {
    supported: voiceSupported,
    listening: voiceListening,
    interim: voiceInterim,
    transcript: voiceTranscript,
    start: voiceStart,
    stop: voiceStop,
    clear: voiceClear,
  } = useVoiceInput({
    onError: (message) => setError(message),
    autoSendMs: VOICE_AUTO_SEND_MS,
    onComplete: (spoken) => voiceSendRef.current(spoken),
  });
  const voiceSendRef = useRef<(spoken: string) => void>(() => {});
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!voiceTranscript) return;
    voiceClear();
    setInput((previous) => previous.trim() ? `${previous.trim()} ${voiceTranscript}` : voiceTranscript);
  }, [voiceTranscript, voiceClear]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open || !user || sessionsLoadedRef.current) return;
    sessionsLoadedRef.current = true;
    getChatSessions("professor:")
      .then(({ sessions: list }) => setSessions(list))
      .catch(() => {});
  }, [open, user]);

  useEffect(() => {
    const element = scrollerRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [lines, sending, streamPhase, open, loadingThread, view]);

  useEffect(() => {
    if (subjects.some((subject) => subject.slug === subjectSlug)) return;
    setSubjectSlug(subjects[0]?.slug ?? "physics");
  }, [subjects, subjectSlug]);

  if (!mounted || isLoading || !hasLevel(user, "plus")) return null;
  if (pathname === "/chat" || pathname.startsWith("/chat/") || pathname?.startsWith("/home/")) return null;

  async function refreshSessions() {
    try {
      const { sessions: list } = await getChatSessions("professor:");
      setSessions(list);
    } catch {}
  }

  async function openConversation(name: string) {
    if (sending) return;
    setSession(name);
    setMode("teach");
    setView("thread");
    setLoadingThread(true);
    setError(null);
    try {
      const { messages } = await getChatHistory(name, 50);
      setLines(messages.map((message: ChatHistoryMessage) => ({ role: message.role, content: message.content })));
    } catch {
      setLines([]);
      setError("That professor lesson could not be loaded.");
    } finally {
      setLoadingThread(false);
    }
  }

  function startNewLesson() {
    if (sending) return;
    setSession(`professor:${Date.now().toString(36)}`);
    setLines([]);
    setInput("");
    setError(null);
    setMode("teach");
    setView("thread");
  }

  async function send(override?: string) {
    const text = (override ?? input).trim();
    if (!text || sending) return;
    const history: AIChatMessage[] = [
      {
        role: "system",
        content: `You are teaching inside the Veer Professor workspace. The learner selected Class ${classLevel} ${subjectSlug}. Teach as a rigorous, approachable professor: build the concept, show reasoning or working, connect it to the syllabus, and finish with a useful checkpoint when appropriate. Do not redirect the learner to another interface.`,
      },
      ...lines.map((line) => ({ role: line.role, content: line.content })),
      { role: "user", content: text },
    ];
    setInput("");
    setError(null);
    setStreamPhase(null);
    setView("thread");
    setLines((previous) => [...previous, { role: "user", content: text }]);
    setSending(true);
    const controller = new AbortController();
    abortRef.current = controller;
    let liveAcc = "";
    let sawToken = false;
    let lastPaint = 0;
    const figures = new Map<number, { status: "pending" | "done" | "failed"; url?: string; svg?: string; caption?: string }>();
    const figureBlocks = () => [...figures.values()].map((figure) => {
      if (figure.status === "done" && figure.svg) return `\n\n\`\`\`svg ${figure.caption || "Veer-drawn figure"}\n${figure.svg}\n\`\`\`\n\n`;
      if (figure.status === "done" && figure.url) return `\n\n![${figure.caption || "Veer-drawn figure"}](${figure.url})\n\n`;
      if (figure.status === "pending") return "\n\n*Veer is drawing a figure…*";
      return "";
    }).join("");
    const paintLive = (force: boolean) => {
      const now = Date.now();
      if (!force && now - lastPaint < 40) return;
      lastPaint = now;
      const snapshot = liveAcc + figureBlocks();
      setLines((previous) => {
        const next = [...previous];
        const last = next[next.length - 1];
        if (last?.role === "assistant") next[next.length - 1] = { role: "assistant", content: snapshot };
        return next;
      });
    };
    try {
      try {
        for await (const chunk of streamChat(history, undefined, { session, signal: controller.signal })) {
          if (typeof chunk === "string") {
            if (!sawToken) {
              sawToken = true;
              liveAcc = chunk;
              setStreamPhase(null);
              setLines((previous) => [...previous, { role: "assistant", content: chunk + figureBlocks() }]);
            } else {
              liveAcc += chunk;
              paintLive(false);
            }
          } else if ("phase" in chunk) {
            setStreamPhase(chunk.label ?? "Professor is preparing the lesson…");
          } else if ("continuing" in chunk) {
            setStreamPhase(chunk.label ?? "Continuing the lesson…");
          } else if ("imageStart" in chunk) {
            figures.set(chunk.imageStart, { status: "pending", caption: chunk.caption });
            paintLive(true);
          } else if ("imageSuccess" in chunk) {
            const figure = figures.get(chunk.imageSuccess);
            if (figure) {
              figure.status = "done";
              figure.url = chunk.url;
              figure.svg = chunk.svg;
              figure.caption = figure.caption ?? chunk.caption;
            }
            paintLive(true);
          } else if ("imageFailed" in chunk) {
            const figure = figures.get(chunk.imageFailed);
            if (figure) figure.status = "failed";
            paintLive(true);
          }
        }
      } catch (streamError) {
        if (controller.signal.aborted) {
          if (!liveAcc.trim()) {
            setLines((previous) => (previous[previous.length - 1]?.role === "user" ? previous.slice(0, -1) : previous));
            setInput(text);
            return;
          }
        } else {
          if (!liveAcc.trim()) throw streamError;
          setError("The connection ended early. The partial lesson is preserved; ask Veer to continue if needed.");
        }
      }
      const finalContent = liveAcc + figureBlocks();
      paintLive(true);
      setStreamPhase(null);
      if (!finalContent.trim()) throw new Error("No lesson was received. Please try again.");
      const saved = await saveChatHistory(session, [
        { role: "user", content: text },
        { role: "assistant", content: finalContent },
      ]);
      if (!saved.migrated || saved.saved !== 2) setError("The lesson arrived, but it could not be saved to your history.");
      else void refreshSessions();
      refreshAiSparkMeters();
    } catch (err) {
      reportClientError("professor-widget-teach", err);
      setError(errorMessage(err, "Veer could not prepare this lesson. Please try again."));
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setSending(false);
      setStreamPhase(null);
    }
  }

  voiceSendRef.current = (spoken: string) => {
    if (sending) {
      setInput((previous) => (previous.trim() ? `${previous.trim()} ${spoken}` : spoken));
      return;
    }
    void send([input.trim(), spoken].filter(Boolean).join(" "));
  };

  return (
    <div className="fixed bottom-safe left-4 z-50 flex flex-col items-start gap-2">
      {open && (
        <section aria-label="Veer Professor workspace" className="flex h-[min(calc(100dvh-6.5rem),56rem)] w-[min(calc(100vw-2rem),72rem)] flex-col overflow-hidden rounded-2xl border-2 border-slate-700/60 bg-card shadow-2xl shadow-slate-950/25">
          <header className="relative overflow-hidden bg-slate-950 px-4 py-3 text-white sm:px-5">
            <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-950/40">
                  <CaptainAvatar className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-black tracking-tight sm:text-base">Veer Professor</p>
                    <span className="hidden rounded-full border border-violet-400/30 bg-violet-400/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-violet-300 sm:inline">Plus Studio</span>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1.5 truncate text-[10px] text-slate-400 sm:text-xs">
                    <AiStatusDot />
                    Teach · solve · synthesize · practise
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <AiSparkBadge className="hidden lg:inline-flex" />
                {/* CodeRabbit: the Stop control used to live only inside the
                    Teach composer, so switching tabs mid-reply unmounted it and
                    left a running stream with no way to cancel. */}
                {sending && (
                  <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop reply" title="Stop the reply" className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-destructive px-2.5 text-xs font-bold text-destructive-foreground shadow-md transition hover:opacity-90">
                    <Square className="h-3 w-3 fill-current" /> Stop
                  </button>
                )}
                <button type="button" onClick={() => setOpen(false)} className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label="Close Veer Professor">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <nav aria-label="Professor tools" className="grid grid-cols-4 border-b border-border bg-muted/30 p-1.5 sm:px-4">
            {MODES.map((item) => {
              const Icon = item.icon;
              const active = mode === item.id;
              return (
                <button key={item.id} type="button" onClick={() => { setMode(item.id); setError(null); }} aria-pressed={active} className={`flex min-w-0 items-center justify-center gap-1.5 rounded-xl px-1.5 py-2.5 text-[11px] font-bold transition sm:gap-2 sm:px-3 sm:text-xs ${active ? "bg-card text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:bg-card/60 hover:text-foreground"}`}>
                  <Icon className={`h-4 w-4 shrink-0 ${active ? item.id === "solve" ? "text-indigo-500" : item.id === "deep-dive" ? "text-sky-500" : item.id === "practice" ? "text-violet-500" : "text-primary" : ""}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-card px-3 py-2.5 sm:px-4">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <BookOpen className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
              <label className="sr-only" htmlFor="professor-class">Class</label>
              <select id="professor-class" value={classSlug} onChange={(event) => setClassSlug(event.target.value)} className="min-h-9 max-w-28 rounded-xl border border-border bg-background px-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/30 sm:max-w-none sm:px-3">
                {SYLLABUS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <label className="sr-only" htmlFor="professor-subject">Subject</label>
              <select id="professor-subject" value={subjectSlug} onChange={(event) => setSubjectSlug(event.target.value)} className="min-h-9 min-w-0 flex-1 rounded-xl border border-border bg-background px-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-primary/30 sm:flex-none sm:px-3">
                {subjects.map((subject) => <option key={subject.slug} value={subject.slug}>{subject.name}</option>)}
              </select>
            </div>
            {mode === "teach" && (
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => { setView("home"); setError(null); }} disabled={sending} className="inline-flex min-h-9 items-center gap-1.5 rounded-xl px-2.5 text-xs font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50" title="Saved professor lessons">
                  <History className="h-3.5 w-3.5" /><span className="hidden sm:inline">Lessons</span>
                </button>
                <button type="button" onClick={startNewLesson} disabled={sending} className="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-primary/10 px-2.5 text-xs font-bold text-primary transition hover:bg-primary/15 disabled:opacity-50">
                  <Plus className="h-3.5 w-3.5" /><span className="hidden sm:inline">New lesson</span>
                </button>
              </div>
            )}
          </div>

          {mode === "teach" && (
            <div className="flex min-h-0 flex-1 flex-col">
              <div ref={scrollerRef} className="min-h-0 flex-1 overflow-y-auto bg-muted/20">
                {view === "home" ? (
                  <div className="mx-auto w-full max-w-4xl space-y-5 p-4 sm:p-6">
                    <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-violet-500/5 p-5 sm:p-6">
                      <GraduationCap className="absolute -bottom-5 -right-3 h-32 w-32 text-primary/5" />
                      <div className="relative">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-primary"><Sparkles className="h-3 w-3" /> Your personal professor</span>
                        <h2 className="mt-3 text-xl font-black tracking-tight sm:text-2xl">What should we master today?</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Ask for a full lesson, a difficult derivation, a comparison, or a follow-up. Veer keeps the thread and teaches at your selected class level.</p>
                      </div>
                    </div>
                    {lines.length > 0 && (
                      <button type="button" onClick={() => setView("thread")} className="flex w-full items-center justify-between rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3 text-left text-sm font-bold text-primary transition hover:bg-primary/10">
                        Resume current lesson <span aria-hidden="true">→</span>
                      </button>
                    )}
                    <div className="grid gap-2 sm:grid-cols-2">
                      {LESSON_STARTERS.map((starter) => (
                        <button key={starter} type="button" onClick={() => void send(starter)} disabled={sending} className="rounded-2xl border border-border bg-card p-4 text-left text-sm font-medium leading-relaxed transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md disabled:opacity-50">{starter}</button>
                      ))}
                    </div>
                    <div className="rounded-3xl border border-border bg-card p-4 sm:p-5">
                      <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-muted-foreground"><History className="h-4 w-4" /> Saved lessons</div>
                      {sessions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Your professor lessons will appear here after your first conversation.</p>
                      ) : (
                        <div className="grid gap-2 sm:grid-cols-2">
                          {sessions.slice(0, 6).map((item) => (
                            <button key={item.session} type="button" onClick={() => void openConversation(item.session)} className="min-w-0 rounded-2xl border border-border bg-background px-4 py-3 text-left transition hover:border-primary/35">
                              <span className="block truncate text-sm font-semibold">{item.preview || "Professor lesson"}</span>
                              <span className="mt-1 block text-[11px] text-muted-foreground">{item.messages} messages</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mx-auto w-full max-w-4xl space-y-5 p-4 sm:p-6">
                    {loadingThread && <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading saved lesson…</p>}
                    {!loadingThread && lines.length === 0 && (
                      <div className="rounded-3xl border border-dashed border-primary/30 bg-primary/5 px-5 py-8 text-center">
                        <GraduationCap className="mx-auto h-8 w-8 text-primary" />
                        <p className="mt-3 font-bold">Your lesson desk is ready</p>
                        <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">Ask a precise question or request a complete lesson. Follow-ups stay in this saved thread.</p>
                      </div>
                    )}
                    {lines.map((line, index) => line.role === "user" ? (
                      <article key={`${line.role}-${index}`} className="flex items-end justify-end gap-2">
                        <div className="max-w-[88%] sm:max-w-[80%]">
                          <p className="mb-1 px-1 text-right text-[10px] font-black uppercase tracking-[0.14em] text-primary">You</p>
                          <p className="whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground">{line.content}</p>
                        </div>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><UserRound className="h-3.5 w-3.5" /></span>
                      </article>
                    ) : (
                      <article key={`${line.role}-${index}`} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-white"><CaptainAvatar className="h-4 w-4" /></span>
                          <span className="text-[10px] font-black uppercase tracking-[0.14em]">Veer Professor</span>
                        </div>
                        <div className="rounded-3xl border border-border bg-card px-4 py-4 shadow-sm sm:px-5 sm:py-5">
                          <InteractiveMarkdown content={line.content} className="chat-reading" />
                        </div>
                      </article>
                    ))}
                    {sending && lines.at(-1)?.role !== "assistant" && (
                      <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin text-primary" />{streamPhase || "Professor is preparing your lesson…"}</p>
                    )}
                    {sending && streamPhase && lines.at(-1)?.role === "assistant" && <p className="text-xs font-semibold text-primary">{streamPhase}</p>}
                    {error && <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
                  </div>
                )}
              </div>
              <form
                className="border-t border-border bg-card p-3 sm:p-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  void send();
                }}
              >
                <div className="mx-auto flex max-w-4xl items-end gap-2 rounded-2xl border border-border bg-background p-2 shadow-sm focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/5">
                  <label className="sr-only" htmlFor="veer-widget-message">Ask Veer Professor</label>
                  <textarea
                    id="veer-widget-message"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void send();
                      }
                    }}
                    rows={1}
                    placeholder={`Ask a Class ${classLevel} ${subjectSlug} question…`}
                    disabled={sending}
                    className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-relaxed outline-none disabled:opacity-60"
                  />
                  <VoiceMicButton supported={voiceSupported} listening={voiceListening} interim={voiceInterim} onStart={voiceStart} onStop={voiceStop} disabled={sending} />
                  {sending ? (
                    <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop reply" title="Stop the reply" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive text-destructive-foreground shadow-md transition hover:opacity-90">
                      <Square className="h-3.5 w-3.5 fill-current" />
                    </button>
                  ) : (
                    <button type="submit" disabled={!input.trim()} aria-label="Send to Veer Professor" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-600 text-primary-foreground shadow-md shadow-primary/20 transition hover:scale-[1.03] disabled:scale-100 disabled:opacity-40">
                      <ArrowUp className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <p className="mx-auto mt-2 max-w-4xl px-1 text-center text-[10px] text-muted-foreground">Enter to send · Shift + Enter for a new line · lessons save automatically</p>
              </form>
            </div>
          )}

          {mode !== "teach" && (
            <div className="min-h-0 flex-1 overflow-y-auto bg-muted/20">
              {mode === "solve" && <SolveStudio key={contextKey} classLevel={classLevel} subject={subjectSlug} />}
              {mode === "deep-dive" && <DeepDiveStudio key={contextKey} classLevel={classLevel} subject={subjectSlug} />}
              {mode === "practice" && <PracticeStudio key={contextKey} classSlug={classSlug} subjectSlug={subjectSlug} />}
            </div>
          )}
        </section>
      )}

      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close Veer Professor" : "Open Veer Professor"} className="group flex h-14 items-center gap-2.5 rounded-2xl border border-white/10 bg-slate-950 px-3.5 text-white shadow-xl shadow-slate-950/25 transition hover:-translate-y-0.5 hover:shadow-2xl sm:px-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-600"><CaptainMark className="h-5 w-5 text-white" /></span>
        <span className="hidden text-left sm:block">
          <span className="block text-xs font-black tracking-tight">Veer Professor</span>
          <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-violet-300">Plus AI workspace</span>
        </span>
      </button>
    </div>
  );
}
