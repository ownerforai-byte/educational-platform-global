/**
 * Study goals & preferences — the ONE typed reader/writer for what a student
 * told the platform about themselves (onboarding), tuned later (settings) and
 * what the dashboard, planner seed and report card read back.
 *
 * Client-only state in localStorage (same pattern as lib/streaks). There is no
 * server write: the record never leaves the device. Subject options come from
 * lib/syllabus.ts (the curriculum source of truth), never a hardcoded list.
 */

import { SYLLABUS } from "@/lib/core/syllabus";
import { existingAnonScope, key, keyForScope, storageScope } from "@/lib/scoped-storage";

export const STUDY_GOALS_KEY = "neb-study-goals:v1";

export type AppLanguage = "en" | "ne";

export interface StudyPreferences {
  language: AppLanguage;
  /** Daily study reminder opt-in (in-app notifications center only). */
  notifyDailyReminder: boolean;
  notifyStreakAlerts: boolean;
  /** Accessibility toggles. */
  reduceMotion: boolean;
  largeText: boolean;
}

export interface StudyGoals {
  /** Subject keys `classSlug/subjectSlug`, as produced by listGoalSubjects(). */
  subjects: string[];
  /** ISO date (YYYY-MM-DD) of the exam, or null. */
  examDate: string | null;
  /** Target percentage 0-100, or null. */
  targetPercent: number | null;
  /** Minutes of study per day. */
  dailyMinutes: number;
  /** True once onboarding was completed. */
  onboarded: boolean;
  preferences: StudyPreferences;
}

export interface GoalSubject {
  key: string;
  classSlug: string;
  className: string;
  subjectSlug: string;
  subjectName: string;
}

export const DAILY_MINUTES_OPTIONS = [30, 60, 90, 120, 180] as const;

export const DEFAULT_PREFERENCES: StudyPreferences = {
  language: "en",
  notifyDailyReminder: false,
  notifyStreakAlerts: false,
  reduceMotion: false,
  largeText: false,
};

export const DEFAULT_GOALS: StudyGoals = {
  subjects: [],
  examDate: null,
  targetPercent: null,
  dailyMinutes: 60,
  onboarded: false,
  preferences: DEFAULT_PREFERENCES,
};

/** Every class + subject pair in the syllabus, in curriculum order. */
export function listGoalSubjects(): GoalSubject[] {
  return SYLLABUS.flatMap((cls) =>
    cls.subjects.map((subject) => ({
      key: `${cls.slug}/${subject.slug}`,
      classSlug: cls.slug,
      className: cls.name,
      subjectSlug: subject.slug,
      subjectName: subject.name,
    })),
  );
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

/** Coerce anything (parsed JSON, partial record) into a valid StudyGoals. */
export function normalizeGoals(input: unknown): StudyGoals {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const rawPrefs = (raw.preferences && typeof raw.preferences === "object" ? raw.preferences : {}) as Record<
    string,
    unknown
  >;
  const known = new Set(listGoalSubjects().map((s) => s.key));
  const subjects = Array.isArray(raw.subjects)
    ? Array.from(new Set(raw.subjects.filter((s): s is string => typeof s === "string" && known.has(s))))
    : [];
  const target =
    typeof raw.targetPercent === "number" && raw.targetPercent >= 0 && raw.targetPercent <= 100
      ? Math.round(raw.targetPercent)
      : null;
  const minutes =
    typeof raw.dailyMinutes === "number" && raw.dailyMinutes >= 5 && raw.dailyMinutes <= 720
      ? Math.round(raw.dailyMinutes)
      : DEFAULT_GOALS.dailyMinutes;
  const flag = (key: keyof StudyPreferences) =>
    typeof rawPrefs[key] === "boolean" ? (rawPrefs[key] as boolean) : DEFAULT_PREFERENCES[key];
  return {
    subjects,
    examDate: isIsoDate(raw.examDate) ? raw.examDate : null,
    targetPercent: target,
    dailyMinutes: minutes,
    onboarded: raw.onboarded === true,
    preferences: {
      language: rawPrefs.language === "ne" ? "ne" : "en",
      notifyDailyReminder: flag("notifyDailyReminder") as boolean,
      notifyStreakAlerts: flag("notifyStreakAlerts") as boolean,
      reduceMotion: flag("reduceMotion") as boolean,
      largeText: flag("largeText") as boolean,
    },
  };
}

/** Read the stored goals (defaults on the server or when nothing is stored). */
export function readGoals(): StudyGoals {
  if (typeof window === "undefined") return DEFAULT_GOALS;
  try {
    const raw = window.localStorage.getItem(key(STUDY_GOALS_KEY));
    return raw ? normalizeGoals(JSON.parse(raw)) : DEFAULT_GOALS;
  } catch {
    return DEFAULT_GOALS;
  }
}

/** Persist goals on this device only. Returns the normalised record. */
export function writeGoals(goals: StudyGoals): StudyGoals {
  const next = normalizeGoals(goals);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key(STUDY_GOALS_KEY), JSON.stringify(next));
    } catch {
      /* storage full or blocked: keep working in memory */
    }
  }
  return next;
}

/** Whole days from `today` to the exam date (negative once past), or null. */
export function daysUntilExam(goals: StudyGoals, today: Date = new Date()): number | null {
  if (!goals.examDate) return null;
  const start = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const [y, m, d] = goals.examDate.split("-").map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - start) / 86_400_000);
}

export interface PlannerSeedItem {
  subjectKey: string;
  subjectName: string;
  minutes: number;
}

/** Split the daily minutes evenly over the chosen subjects (planner seed). */
export function seedDailyPlan(goals: StudyGoals): PlannerSeedItem[] {
  if (goals.subjects.length === 0) return [];
  const byKey = new Map(listGoalSubjects().map((s) => [s.key, s]));
  const each = Math.max(5, Math.floor(goals.dailyMinutes / goals.subjects.length));
  return goals.subjects.map((key) => ({
    subjectKey: key,
    subjectName: byKey.get(key)?.subjectName ?? key,
    minutes: each,
  }));
}

/**
 * GUEST GOALS TRANSFER. Goals saved while logged out live under this device's
 * anonymous key; once signed in the reader switches to the account key, so
 * they would silently vanish. These helpers surface them for an EXPLICIT
 * transfer. Nothing here runs implicitly: readGoals/writeGoals never touch the
 * guest key, and the account key is only written by transferGuestGoals().
 */
function guestGoalsKey(): string | null {
  if (typeof window === "undefined" || !storageScope().startsWith("u:")) return null;
  const anon = existingAnonScope();
  return anon ? keyForScope(STUDY_GOALS_KEY, anon) : null;
}

/** Saved guest goals worth offering (signed in only), else null. */
export function findGuestGoals(): StudyGoals | null {
  const guestKey = guestGoalsKey();
  if (!guestKey) return null;
  try {
    const raw = window.localStorage.getItem(guestKey);
    if (!raw) return null;
    const goals = normalizeGoals(JSON.parse(raw));
    const meaningful = goals.onboarded || goals.subjects.length > 0 || goals.examDate !== null || goals.targetPercent !== null;
    return meaningful ? goals : null;
  } catch {
    return null;
  }
}

/** True when the signed-in account already has its own saved goals. */
export function accountHasGoals(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(key(STUDY_GOALS_KEY)) !== null;
  } catch {
    return false;
  }
}

/**
 * Move the guest goals to the account key and clear the guest copy. Call ONLY
 * after the student confirmed (the UI states when this replaces account goals).
 */
export function transferGuestGoals(): StudyGoals | null {
  const guest = findGuestGoals();
  const guestKey = guestGoalsKey();
  if (!guest || !guestKey) return null;
  const saved = writeGoals(guest);
  try {
    window.localStorage.removeItem(guestKey);
  } catch {
    /* keep the guest copy if it cannot be cleared */
  }
  return saved;
}

/** Delete the guest goals without transferring (explicit "discard"). */
export function discardGuestGoals(): void {
  const guestKey = guestGoalsKey();
  if (!guestKey) return;
  try {
    window.localStorage.removeItem(guestKey);
  } catch {
    /* ignore */
  }
}
