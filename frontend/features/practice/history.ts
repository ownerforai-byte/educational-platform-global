/**
 * Device practice log.
 *
 * Completed sets are written here first so analytics, the practice strip and
 * a signed-out leaderboard still have a real source when quiz history is
 * unreachable. A successful account save is deduped against these rows.
 * Unfinished sets live in a separate draft so a run can be resumed.
 */

import { key } from "@/lib/state/scoped-storage";
import type { QuizHistoryRow } from "@/lib/api/ai-quiz-history";
import type { Difficulty, PracticeMode } from "./types";

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
