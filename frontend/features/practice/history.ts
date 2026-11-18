/**
 * Device practice log.
 *
 * Completed sets are written here first so analytics, the practice strip and
 * a signed-out leaderboard still have a real source when quiz history is
 * unreachable. A successful account save is deduped against these rows.
 * Unfinished sets live in a separate draft so a run can be resumed.
 */

import { key } from "@/lib/state/scoped-storage";
import { saveQuizHistory, type QuizHistoryRow } from "@/lib/api/ai-quiz-history";
import type { GeneratedQuestion } from "@/types/api";
import type {
  Difficulty,
  McqQuestion,
  OptionId,
  PracticeMode,
  WritingQuestion,
} from "./types";
import { OPTION_IDS } from "./types";

const LOG_KEY = "neb-practice-log:v1";
const DRAFT_KEY = "neb-practice-draft:v1";
const MAX_ATTEMPTS = 80;
const EMPTY_ATTEMPTS: PracticeAttempt[] = [];

let logCache: { storageKey: string; raw: string; rows: PracticeAttempt[] } | null = null;
let draftCache: { storageKey: string; raw: string; draft: PracticeDraft | null } | null = null;

export interface PracticeReviewItem {
  id: string;
  prompt: string;
  topic: string;
  chosen: string;
  answer: string;
  correct: boolean;
  explanation: string;
}

export interface PracticeAttempt {
  id: string;
  createdAt: string;
  mode: PracticeMode;
  subjectSlug: string;
  subjectLabel: string;
  classSlug: string | null;
  topic: string | null;
  difficulty: Difficulty | null;
  timed: boolean;
  seconds: number;
  answered: number;
  correct: number;
  scorePct: number;
  xp: number;
  review: PracticeReviewItem[];
}

export interface PracticeDraft {
  draftKey: string;
  index: number;
  choices: Record<string, string>;
  drafts: Record<string, string>;
  submitted: Record<string, boolean>;
  selfScores: Record<string, number>;
  deadlineAt: number | null;
  questionIds: string[];
  savedAt: string;
}

function writeJson(storageKey: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key(storageKey), JSON.stringify(value));
  } catch {
    /* private mode or quota — the in-memory session still finishes */
  }
}

export function listPracticeAttempts(): PracticeAttempt[] {
  if (typeof window === "undefined") return EMPTY_ATTEMPTS;
  const storageKey = key(LOG_KEY);
  let raw = "";
  try {
    raw = window.localStorage.getItem(storageKey) ?? "";
  } catch {
    return EMPTY_ATTEMPTS;
  }
  if (logCache && logCache.storageKey === storageKey && logCache.raw === raw) return logCache.rows;
  let rows = EMPTY_ATTEMPTS;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as PracticeAttempt[];
      if (Array.isArray(parsed)) {
        rows = parsed.filter((row) => row && typeof row.id === "string" && typeof row.createdAt === "string");
      }
    } catch {
      rows = EMPTY_ATTEMPTS;
    }
  }
  logCache = { storageKey, raw, rows };
  return rows;
}

export function getPracticeAttempt(id: string): PracticeAttempt | null {
  return listPracticeAttempts().find((row) => row.id === id) ?? null;
}

export function recordPracticeAttempt(attempt: PracticeAttempt): void {
  const next = [attempt, ...listPracticeAttempts().filter((row) => row.id !== attempt.id)].slice(
    0,
    MAX_ATTEMPTS,
  );
  writeJson(LOG_KEY, next);
  logCache = null;
}

type PracticeQuestion = McqQuestion | WritingQuestion;

function isMcqQuestion(q: PracticeQuestion): q is McqQuestion {
  return "options" in q;
}

function optionLabel(q: McqQuestion, id: OptionId): string {
  const opt = q.options.find((o) => o.id === id);
  return opt ? `${id}. ${opt.text}` : id;
}

function mcqToGenerated(q: McqQuestion): GeneratedQuestion {
  return {
    prompt: q.stem,
    options: q.options.map((o) => o.text),
    correctIndex: OPTION_IDS.indexOf(q.correctId),
    difficulty: q.difficulty,
    subject: q.subject,
    topic: q.topic,
    explanation: q.explanations[q.correctId],
    optionAnalysis: {
      A: q.explanations.A,
      B: q.explanations.B,
      C: q.explanations.C,
      D: q.explanations.D,
    },
    format: "mcq",
  };
}

function writingToGenerated(q: WritingQuestion): GeneratedQuestion {
  return {
    prompt: q.prompt,
    options: [],
    correctIndex: -1,
    difficulty: "intermediate",
    subject: q.subject,
    topic: q.topic,
    explanation: q.modelAnswer,
    format: "long-answer",
    modelAnswer: q.modelAnswer,
    rubric: q.markingPoints,
    maxScore: q.marks,
  };
}

function dominantDifficulty(questions: PracticeQuestion[]): Difficulty | null {
  const mcq = questions.filter(isMcqQuestion);
  if (mcq.length === 0) return null;
  const counts: Record<Difficulty, number> = { easy: 0, intermediate: 0, hard: 0 };
  for (const q of mcq) counts[q.difficulty] += 1;
  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    null) as Difficulty | null;
}

function dominantTopic(questions: PracticeQuestion[]): string | null {
  const counts = new Map<string, number>();
  for (const q of questions) {
    counts.set(q.topic, (counts.get(q.topic) ?? 0) + 1);
  }
  let best: string | null = null;
  let max = 0;
  for (const [topic, n] of counts) {
    if (n > max) {
      max = n;
      best = topic;
    }
  }
  return best;
}

export interface FinishPracticeSetInput {
  mode: PracticeMode;
  subjectSlug: string;
  subjectLabel: string;
  classSlug: string | null;
  timed: boolean;
  seconds: number;
  questions: PracticeQuestion[];
  choices: Record<string, OptionId>;
  drafts: Record<string, string>;
  selfScores: Record<string, number>;
  summary: {
    answered: number;
    correctMcq: number;
    markedWriting: number;
    accuracy: number;
    xp: number;
  };
}

/**
 * Persist a scored practice set on-device and, when the student is signed in,
 * mirror it to quiz history so analytics and cross-device lists stay accurate.
 */
export async function finishPracticeSet(input: FinishPracticeSetInput): Promise<PracticeAttempt> {
  const {
    mode,
    subjectSlug,
    subjectLabel,
    classSlug,
    timed,
    seconds,
    questions,
    choices,
    drafts,
    selfScores,
    summary,
  } = input;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `practice-${Date.now()}`;
  const createdAt = new Date().toISOString();
  const correct =
    mode === "mcq" ? summary.correctMcq : summary.markedWriting;

  const review: PracticeReviewItem[] = [];
  for (const q of questions) {
    if (isMcqQuestion(q)) {
      const chosen = choices[q.id];
      if (!chosen) continue;
      const ok = chosen === q.correctId;
      review.push({
        id: q.id,
        prompt: q.stem,
        topic: q.topic,
        chosen: optionLabel(q, chosen),
        answer: optionLabel(q, q.correctId),
        correct: ok,
        explanation: q.explanations[chosen],
      });
    } else {
      const text = (drafts[q.id] ?? "").trim();
      const score = selfScores[q.id];
      if (!text || score === undefined) continue;
      review.push({
        id: q.id,
        prompt: q.prompt,
        topic: q.topic,
        chosen: text,
        answer: q.modelAnswer,
        correct: score >= 60,
        explanation: q.markingPoints.join(" · "),
      });
    }
  }

  const attempt: PracticeAttempt = {
    id,
    createdAt,
    mode,
    subjectSlug,
    subjectLabel,
    classSlug,
    topic: dominantTopic(questions),
    difficulty: dominantDifficulty(questions),
    timed,
    seconds,
    answered: summary.answered,
    correct,
    scorePct: summary.accuracy,
    xp: summary.xp,
    review,
  };

  recordPracticeAttempt(attempt);

  const generated = questions.map((q) => (isMcqQuestion(q) ? mcqToGenerated(q) : writingToGenerated(q)));

  try {
    await saveQuizHistory({
      title: `${subjectLabel} practice`,
      classSlug: classSlug ?? undefined,
      subjectSlug,
      topic: attempt.topic ?? undefined,
      difficulty: attempt.difficulty ?? undefined,
      format: mode === "writing" ? "long-answer" : "mcq",
      questions: generated,
      answered: summary.answered,
      correct,
      scorePct: summary.accuracy,
    });
  } catch {
    /* guest or network — the device log still has the set */
  }

  return attempt;
}

function loadDraft(): PracticeDraft | null {
  if (typeof window === "undefined") return null;
  const storageKey = key(DRAFT_KEY);
  let raw = "";
  try {
    raw = window.localStorage.getItem(storageKey) ?? "";
  } catch {
    return null;
  }
  if (draftCache && draftCache.storageKey === storageKey && draftCache.raw === raw) {
    return draftCache.draft;
  }
  let draft: PracticeDraft | null = null;
  if (raw && raw !== "null") {
    try {
      const parsed = JSON.parse(raw) as PracticeDraft;
      if (parsed && typeof parsed.draftKey === "string" && Array.isArray(parsed.questionIds)) {
        draft = parsed;
      }
    } catch {
      draft = null;
    }
  }
  draftCache = { storageKey, raw, draft };
  return draft;
}

export function readPracticeDraft(draftKey: string): PracticeDraft | null {
  const draft = loadDraft();
  if (!draft || draft.draftKey !== draftKey) return null;
  return draft;
}

export function writePracticeDraft(draft: PracticeDraft): void {
  writeJson(DRAFT_KEY, draft);
}

export function clearPracticeDraft(draftKey?: string): void {
  if (!draftKey) {
    writeJson(DRAFT_KEY, null);
    return;
  }
  const current = loadDraft();
  if (current?.draftKey === draftKey) writeJson(DRAFT_KEY, null);
}

/** Map a saved practice set onto the quiz-history row analytics already aggregates. */
export function attemptToQuizRow(attempt: PracticeAttempt): QuizHistoryRow {
  return {
    id: attempt.id,
    title: `${attempt.subjectLabel} practice`,
    classSlug: attempt.classSlug,
    subjectSlug: attempt.subjectSlug,
    topic: attempt.topic,
    difficulty: attempt.difficulty,
    format: attempt.mode === "writing" ? "long-answer" : "mcq",
    answered: attempt.answered,
    correct: attempt.correct,
    scorePct: attempt.scorePct,
    createdat: attempt.createdAt,
  };
}

export function practiceRowsForAnalytics(): QuizHistoryRow[] {
  return listPracticeAttempts()
    .filter((row) => row.answered > 0)
    .map(attemptToQuizRow);
}

function sameSet(a: QuizHistoryRow, b: QuizHistoryRow): boolean {
  if ((a.subjectSlug ?? "") !== (b.subjectSlug ?? "")) return false;
  if (a.answered !== b.answered || a.correct !== b.correct) return false;
  if ((a.scorePct ?? -1) !== (b.scorePct ?? -1)) return false;
  const ta = Date.parse(a.createdat);
  const tb = Date.parse(b.createdat);
  if (Number.isNaN(ta) || Number.isNaN(tb)) return false;
  return Math.abs(ta - tb) < 3 * 60 * 1000;
}

/**
 * Account history wins. A device row is kept only when the server does not
 * already have that same scored set.
 */
export function mergeQuizRows(server: QuizHistoryRow[], local: QuizHistoryRow[]): QuizHistoryRow[] {
  const extra = local.filter(
    (row) => !server.some((saved) => saved.id === row.id || sameSet(saved, row)),
  );
  return [...server, ...extra].sort((a, b) => b.createdat.localeCompare(a.createdat));
}

export interface ActivityDay {
  date: string;
  label: string;
  sets: number;
  answered: number;
}

/** Oldest-first activity for the last `days` UTC dates, including empty days. */
export function activityByDay(rows: QuizHistoryRow[], days = 14, now = new Date()): ActivityDay[] {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const buckets: ActivityDay[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(end);
    day.setUTCDate(end.getUTCDate() - i);
    const date = day.toISOString().slice(0, 10);
    buckets.push({
      date,
      label: day.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }),
      sets: 0,
      answered: 0,
    });
  }
  const byDate = new Map(buckets.map((bucket) => [bucket.date, bucket]));
  for (const row of rows) {
    const date = row.createdat?.slice(0, 10);
    const bucket = date ? byDate.get(date) : undefined;
    if (!bucket || !row.answered) continue;
    bucket.sets += 1;
    bucket.answered += row.answered;
  }
  return buckets;
}

export interface DeviceStanding {
  name: string;
  xp: number;
  accuracy: number;
  answered: number;
  sets: number;
}

/** The signed-in (or this-device) student, scored from sets that actually exist. */
export function deviceStanding(rows: QuizHistoryRow[], name: string, xp: number): DeviceStanding | null {
  const scored = rows.filter((row) => row.answered > 0);
  if (scored.length === 0) return null;
  let answered = 0;
  let correct = 0;
  for (const row of scored) {
    answered += row.answered;
    correct += Math.min(row.correct, row.answered);
  }
  return {
    name: name.trim() || "You",
    xp,
    accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    answered,
    sets: scored.length,
  };
}
