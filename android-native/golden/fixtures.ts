/**
 * Golden-vector fixtures for the Kotlin algorithm ports (parity plan §0.5).
 *
 * Every fixture here is fed to the REAL website TypeScript (via tsx) by
 * generate-golden.ts, and the outputs are checked into
 * app/src/test/resources/golden/*.json. The Kotlin ports in
 * core/logic/*.kt must reproduce these outputs exactly — parity means
 * "same code, different language", tested against TS behavior.
 */

import type { SubjectPyqBank } from "@/features/pyqs/pyq-bank";
import type { EntranceQuestion } from "@/lib/entrance-questions/types";
import type { PyqYear } from "@/features/pyqs/pyq-bank";
import type { FormulaSheetUnit } from "@/features/formula-sheet";

/* ── SRS ─────────────────────────────────────────────────────── */

export const SRS_BANK: SubjectPyqBank = {
  theory: [
    {
      title: "Kinematic equations",
      notes: ["v = u + at", "s = ut + ½at²"],
      detail: "Derived from uniform acceleration.",
    },
    { title: "  Newton's first law  ", notes: ["Law of inertia"] },
    { title: "", notes: ["x"] }, // empty front → dropped
    { title: "Dup", notes: [] }, // empty back → dropped
  ],
  pyqs: [
    {
      year: 2080,
      title: "NEB 2080",
      units: [],
      questions: [
        { question: "State Ohm's law.", marks: "2", solution: "V = IR at constant temperature." },
        { question: "State Ohm's law.", marks: 2 }, // dup front, no solution → dropped
        { question: "Define capacitance.", solution: "Q = CV" },
      ],
    },
    {
      year: 2079,
      title: "NEB 2079",
      units: [],
      questions: [
        { question: "State Ohm's law.", solution: "duplicate front across years" }, // deduped
      ],
    },
  ],
  drills: [
    {
      id: "d1",
      question: "Why does a conductor shield its interior?",
      solution: "E = 0 inside a conductor.",
      unit: "electrostatics",
      kind: "concept",
    },
    {
      id: "d2",
      question: "Why does a conductor shield its interior?",
      solution: "E = 0 inside a conductor.",
      unit: "electrostatics",
      kind: "practical",
    }, // dup → deduped
  ],
};

export const SRS_SM2_CASES: Array<{
  name: string;
  prev: { ease: number; interval: number; reps: number; lapses: number; due: string } | null;
  quality: number;
  today: string;
}> = [
  { name: "new-q5", prev: null, quality: 5, today: "2026-01-05" },
  { name: "new-q4", prev: null, quality: 4, today: "2026-01-05" },
  { name: "new-q3", prev: null, quality: 3, today: "2026-01-05" },
  { name: "new-q2-lapse", prev: null, quality: 2, today: "2026-01-05" },
  { name: "new-q0", prev: null, quality: 0, today: "2026-01-05" },
  { name: "floor-clamp", prev: { ease: 1.3, interval: 6, reps: 2, lapses: 1, due: "2026-01-04" }, quality: 0, today: "2026-01-05" },
  { name: "chain-step2", prev: { ease: 2.6, interval: 1, reps: 1, lapses: 0, due: "2026-01-06" }, quality: 5, today: "2026-01-06" },
  { name: "chain-step3", prev: { ease: 2.6, interval: 6, reps: 2, lapses: 0, due: "2026-01-12" }, quality: 5, today: "2026-01-12" },
  { name: "fractional-ease", prev: { ease: 2.35, interval: 8, reps: 3, lapses: 0, due: "2026-01-10" }, quality: 3, today: "2026-01-10" },
  { name: "lapses-accumulate", prev: { ease: 2.1, interval: 4, reps: 2, lapses: 2, due: "2026-01-05" }, quality: 1, today: "2026-01-05" },
];

export const SRS_ADD_DAYS_CASES: Array<{ iso: string; days: number }> = [
  { iso: "2026-01-31", days: 1 },
  { iso: "2024-02-29", days: 1 },
  { iso: "2026-02-28", days: 1 },
  { iso: "2026-12-31", days: 1 },
  { iso: "2026-03-01", days: -1 },
  { iso: "2026-01-01", days: 30 },
];

export const SRS_STORE_JUNK: unknown = {
  ok1: { ease: 2.5, interval: 3, reps: 2, lapses: 0, due: "2026-01-04" },
  badEase: { ease: "high", interval: 3, reps: 2, lapses: 0, due: "2026-01-04" },
  badDue: { ease: 2.5, interval: 3, reps: 2, lapses: 0, due: "2026-1-4" },
  missingField: { ease: 2.5, interval: 3, reps: 2, due: "2026-01-04" },
  nullEntry: null,
  numberEntry: 5,
  ok2: { ease: 1.9, interval: 1, reps: 0, lapses: 3, due: "2026-01-10" },
};

/* ── Mock exam ───────────────────────────────────────────────── */

export const MCQ_POOL: EntranceQuestion[] = [
  { q: "SI unit of force?", options: ["joule", "newton", "watt", "pascal"], answer: 1, why: "F = ma → kg·m/s² = newton.", exam: "NEB 2080" },
  { q: "Acceleration due to gravity on Earth?", options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "6.7 m/s²"], answer: 1, why: "Standard value g ≈ 9.8 m/s²." },
  { q: "Which is a vector?", options: ["speed", "distance", "displacement", "mass"], answer: 2, why: "Displacement has magnitude and direction." },
  { q: "Work done by centripetal force in circular motion?", options: ["positive", "negative", "zero", "infinite"], answer: 2, why: "Force ⊥ displacement → W = 0." },
  { q: "Dimension of pressure?", options: ["ML⁻²T⁻²", "ML⁻¹T⁻²", "MLT⁻²", "ML²T⁻²"], answer: 1, why: "P = F/A → ML⁻¹T⁻²." },
  { q: "Escape velocity from Earth?", options: ["7.9 km/s", "11.2 km/s", "9.8 km/s", "12.5 km/s"], answer: 1, why: "vₑ = √(2gR) ≈ 11.2 km/s." },
  { q: "6-option probe", options: ["a", "b", "c", "d", "e", "f"], answer: 5, why: "Exercises OMR letter F." },
];

export const PYQ_YEARS: PyqYear[] = [
  {
    year: 2080,
    title: "NEB 2080",
    units: [],
    questions: [
      { question: "Derive the equation of motion s = ut + ½at².", marks: "3", solution: "Graphical derivation from v–t graph." },
      { question: "State and explain Newton's second law.", marks: 4, solution: "F = ma; rate of change of momentum." },
      { question: "Why does a heavy parachute fall slower?", marks: "2a", solution: "Air drag grows with speed." },
      { question: "No marks question", solution: "Marks undefined → fallback 5." },
    ],
  },
  {
    year: 2079,
    title: "NEB 2079",
    units: [],
    questions: [
      { question: "Define escape velocity and derive its expression.", marks: "2.5", solution: "vₑ = √(2GM/R)." },
      { question: "Blank solution question", marks: 2 },
    ],
  },
];

export const MOCK_ASSEMBLE_CASES: Array<{ name: string; objectiveCount: number; writtenCount: number; seed: number }> = [
  { name: "default", objectiveCount: 5, writtenCount: 3, seed: 7 },
  { name: "pool-capped", objectiveCount: 20, writtenCount: 10, seed: 1 },
  { name: "zero-counts", objectiveCount: 0, writtenCount: 0, seed: 42 },
  { name: "seed-zero", objectiveCount: 3, writtenCount: 2, seed: 0 },
];

export const MOCK_PARSE_MARKS_CASES: Array<{ name: string; marks: string | number | undefined }> = [
  { name: "string-int", marks: "2" },
  { name: "number", marks: 5 },
  { name: "junk-suffix", marks: "2a" },
  { name: "undefined", marks: undefined },
  { name: "empty", marks: "" },
  { name: "zero", marks: "0" },
  { name: "negative", marks: -3 },
  { name: "decimal", marks: "3.5" },
  { name: "padded", marks: "  4  " },
  { name: "words", marks: "abc" },
];

/* ── Achievements ────────────────────────────────────────────── */

export const ACHIEVEMENT_INPUTS: Array<{ name: string; input: { streak: number; topicsCompleted: number; topicsInProgress: number; percent: number } }> = [
  { name: "fresh", input: { streak: 0, topicsCompleted: 0, topicsInProgress: 0, percent: 0 } },
  { name: "early", input: { streak: 3, topicsCompleted: 2, topicsInProgress: 4, percent: 12 } },
  { name: "midway", input: { streak: 9, topicsCompleted: 17, topicsInProgress: 6, percent: 44 } },
  { name: "strong", input: { streak: 31, topicsCompleted: 51, topicsInProgress: 9, percent: 76 } },
  { name: "negative-guard", input: { streak: -2, topicsCompleted: -4, topicsInProgress: 3, percent: 150 } },
];

/* ── Offline pack ────────────────────────────────────────────── */

export const OFFLINE_BANK: SubjectPyqBank = {
  theory: [
    { title: "Collisions", notes: ["Momentum conserved", "KE conserved only in elastic"], detail: "See derivation in reader." },
    { title: "Work–energy theorem", notes: ["W = ΔKE"] },
  ],
  pyqs: [
    {
      year: 2080,
      title: "NEB 2080",
      units: ["work-energy-power", "circuits"],
      questions: [
        { question: "A ball drops from 5 m. Find v at impact.", marks: 2, solution: "v = √(2gh) = 10 m/s." },
        { question: "Define power.", marks: "1", solution: "Rate of doing work." },
      ],
    },
    {
      year: 2079,
      title: "NEB 2079",
      units: ["work-energy-and-power"],
      questions: [{ question: "Show W = F·d for constant force.", marks: "2" }],
    },
  ],
  drills: [
    { id: "d1", question: "Does friction always oppose motion?", solution: "It opposes relative sliding.", unit: "work-energy-power", kind: "concept" },
    { id: "d2", question: "Unit of power?", solution: "watt", unit: "circuits", kind: "practical" },
  ],
};

export const OFFLINE_FORMULA_UNIT: FormulaSheetUnit = {
  id: "work-energy-and-power",
  title: "Work, Energy and Power",
  unitNo: 4,
  isExtra: false,
  topics: [
    { title: "Kinematics", formulas: ["v = u + at", "F = ma"] },
    { title: "Power", formulas: ["P = W/t", "F = ma"] },
  ],
  formulaCount: 3,
  noteCount: 2,
} as unknown as FormulaSheetUnit;

export const OFFLINE_FILENAME_CASES: Array<{ name: string; title: string }> = [
  { name: "punctuated", title: "Physics — Unit 4: Work!!" },
  { name: "blank", title: "   " },
  { name: "long", title: "A Very Long Physics Unit Title That Keeps Going Well Past Sixty Characters Total" },
  { name: "dashes", title: "--leading and trailing--" },
];

/* ── Study goals + weekly plan ───────────────────────────────── */

export interface GoalSubjectFixture {
  key: string;
  classSlug: string;
  className: string;
  subjectSlug: string;
  subjectName: string;
}

export const GOAL_SUBJECTS: GoalSubjectFixture[] = [
  { key: "class-11-notes/physics", classSlug: "class-11-notes", className: "Class 11", subjectSlug: "physics", subjectName: "Physics" },
  { key: "class-11-notes/chemistry", classSlug: "class-11-notes", className: "Class 11", subjectSlug: "chemistry", subjectName: "Chemistry" },
  { key: "class-12-notes/mathematics", classSlug: "class-12-notes", className: "Class 12", subjectSlug: "mathematics", subjectName: "Mathematics" },
  { key: "class-12-notes/biology", classSlug: "class-12-notes", className: "Class 12", subjectSlug: "biology", subjectName: "Biology" },
];

export const GOALS_JUNK: unknown = {
  subjects: ["class-11-notes/physics", "not-a-subject", "class-11-notes/physics", 42, "class-12-notes/biology"],
  examDate: "2026-05-10",
  targetPercent: 55.4,
  dailyMinutes: 90.7,
  onboarded: "yes",
  preferences: { language: "ne", notifyDailyReminder: 1, reduceMotion: true, extra: "ignored" },
};

export const GOALS_JUNK_2: unknown = {
  subjects: "physics",
  examDate: "2026-13-01",
  targetPercent: 120,
  dailyMinutes: 3,
  preferences: { language: "fr" },
};

export const GOALS_JUNK_3: unknown = {
  examDate: "2026-02-30",
  targetPercent: -5,
  dailyMinutes: 721,
};

export interface PlanEntryFixture {
  id: string;
  topicId: string;
  completed: boolean;
  completedAt: string | null;
  updatedAt: string;
  status?: string;
  classSlug?: string;
  subjectSlug?: string;
  unitSlug?: string;
  topicSlug?: string;
  topic?: { slug: string; title: string; chapter?: { slug: string; title: string } } | null;
}

export const PLAN_ENTRIES: PlanEntryFixture[] = [
  { id: "1", topicId: "a/b/c/d", completed: true, completedAt: "2026-01-02T10:00:00Z", updatedAt: "2026-01-02", classSlug: "class-11-notes", subjectSlug: "physics", unitSlug: "kinematics", topicSlug: "displacement", topic: { slug: "displacement", title: "Displacement", chapter: { slug: "kinematics", title: "Kinematics" } } },
  { id: "2", topicId: "a/b/c/e", completed: false, completedAt: null, updatedAt: "2026-01-03", status: "in_progress", classSlug: "class-11-notes", subjectSlug: "physics", unitSlug: "kinematics", topicSlug: "velocity", topic: { slug: "velocity", title: "Velocity" } },
  { id: "3", topicId: "a/b/c/f", completed: false, completedAt: null, updatedAt: "2026-01-03", classSlug: "class-11-notes", subjectSlug: "chemistry", unitSlug: "stoichiometry", topicSlug: "mole", topic: null },
  { id: "new:class-11-notes/physics/laws/force", topicId: "x", completed: false, completedAt: null, updatedAt: "2026-01-04", classSlug: "class-11-notes", subjectSlug: "physics", unitSlug: "laws", topicSlug: "force", topic: { slug: "force", title: "Force" } },
  { id: "5", topicId: "y", completed: false, completedAt: null, updatedAt: "2026-01-04", status: "in_progress", classSlug: "class-12-notes", subjectSlug: "mathematics", unitSlug: "calculus", topicSlug: "limits", topic: { slug: "limits", title: "Limits" } },
  { id: "6", topicId: "z", completed: false, completedAt: null, updatedAt: "2026-01-04", status: "in_progress" },
  { id: "7", topicId: "w", completed: false, completedAt: null, updatedAt: "2026-01-04", classSlug: "class-11-notes", subjectSlug: "physics", unitSlug: "optics", topicSlug: "", topic: { slug: "", title: "" } },
];

export const PLAN_GOALS = {
  subjects: ["class-11-notes/physics", "class-11-notes/chemistry", "class-12-notes/mathematics"],
  examDate: "2026-01-08" as string | null,
  targetPercent: 80,
  dailyMinutes: 60,
  onboarded: true,
  preferences: { language: "en", notifyDailyReminder: false, notifyStreakAlerts: false, reduceMotion: false, largeText: false },
};

export const PLAN_GOALS_NO_EXAM = { ...PLAN_GOALS, examDate: null };
export const PLAN_GOALS_PAST_EXAM = { ...PLAN_GOALS, examDate: "2026-01-02" };
export const PLAN_GOALS_SOON_EXAM = { ...PLAN_GOALS, examDate: "2026-01-06" };

/* ── Analytics ───────────────────────────────────────────────── */

export interface QuizRowFixture {
  id: string;
  title: string;
  classSlug: string | null;
  subjectSlug: string | null;
  topic: string | null;
  answered: number;
  correct: number;
  createdat: string;
}

export const QUIZ_ROWS: QuizRowFixture[] = [
  { id: "q1", title: "Kinematics quiz", classSlug: "class-11-notes", subjectSlug: "physics", topic: "Kinematics", answered: 10, correct: 8, createdat: "2026-01-05T14:00:00Z" },
  { id: "q2", title: "Kinematics quiz", classSlug: "class-11-notes", subjectSlug: "physics", topic: "kinematics ", answered: 5, correct: 2, createdat: "2026-01-06T09:00:00Z" },
  { id: "q3", title: "Organic quiz", classSlug: "class-11-notes", subjectSlug: "chemistry", topic: "Organic basics", answered: 8, correct: 8, createdat: "2026-01-08T11:00:00Z" },
  { id: "q4", title: "Calculus quiz", classSlug: "class-12-notes", subjectSlug: "mathematics", topic: null, answered: 4, correct: 9, createdat: "2026-01-12T16:30:00Z" },
  { id: "q5", title: "Empty quiz", classSlug: null, subjectSlug: null, topic: "Misc", answered: 0, correct: 0, createdat: "2026-01-13T10:00:00Z" },
  { id: "q6", title: "Overcount quiz", classSlug: "class-12-notes", subjectSlug: "biology", topic: "Cells", answered: 6, correct: 9, createdat: "2026-01-14T10:00:00Z" },
  { id: "q7", title: "Old quiz", classSlug: "class-11-notes", subjectSlug: "physics", topic: "Optics", answered: 10, correct: 3, createdat: "2025-12-30T10:00:00Z" },
];

export const ANALYTICS_ENTRIES: PlanEntryFixture[] = [
  { id: "1", topicId: "t1", completed: true, completedAt: "2026-01-05T18:00:00Z", updatedAt: "2026-01-05", classSlug: "class-11-notes", subjectSlug: "physics", unitSlug: "kinematics", topicSlug: "displacement", topic: { slug: "displacement", title: "Displacement", chapter: { slug: "kinematics", title: "Kinematics" } } },
  { id: "2", topicId: "t2", completed: true, completedAt: "2026-01-09T18:00:00Z", updatedAt: "2026-01-09", classSlug: "class-11-notes", subjectSlug: "physics", unitSlug: "kinematics", topicSlug: "velocity", topic: { slug: "velocity", title: "Velocity", chapter: { slug: "kinematics", title: "Kinematics" } } },
  { id: "3", topicId: "t3", completed: false, completedAt: null, updatedAt: "2026-01-09", classSlug: "class-11-notes", subjectSlug: "chemistry", unitSlug: "stoichiometry", topicSlug: "mole", topic: { slug: "mole", title: "Mole", chapter: { slug: "stoichiometry", title: "Stoichiometry" } } },
  { id: "4", topicId: "t4", completed: true, completedAt: "not-a-date", updatedAt: "2026-01-09", classSlug: "class-11-notes", subjectSlug: "physics", unitSlug: "optics", topicSlug: "mirror", topic: { slug: "mirror", title: "Mirror", chapter: { slug: "optics", title: "Optics" } } },
  { id: "5", topicId: "t5", completed: true, completedAt: "2026-01-15T08:00:00Z", updatedAt: "2026-01-15", classSlug: "class-12-notes", subjectSlug: "mathematics", unitSlug: "calculus", topicSlug: "limits", topic: null },
];

/** Pinned "now" for dailyStudyActivity golden vectors (TS reads `new Date()` internally). */
export const PINNED_NOW_ISO = "2026-01-15T10:30:00.000Z";

/* ── Personal notes (Wave 1 port fixtures) ───────────────────────── */

export interface NoteFixture { id: string; title: string; body: string; quote: string; subjectKey: string; createdAt: string; updatedAt: string }

export const NOTES_SEED: NoteFixture[] = [
  { id: "n1", title: "Newton's second law", body: "F = ma holds in inertial frames.", quote: "The acceleration of an object...", subjectKey: "class-11-notes/physics", createdAt: "2026-01-01T10:00:00.000Z", updatedAt: "2026-01-02T10:00:00.000Z" },
  { id: "n2", title: "Mole concept", body: "One mole = 6.022e23 particles.", quote: "", subjectKey: "class-11-notes/chemistry", createdAt: "2026-01-03T10:00:00.000Z", updatedAt: "2026-01-05T10:00:00.000Z" },
  { id: "n3", title: "Integration tricks", body: "Substitution when the derivative of the inner function appears.", quote: "", subjectKey: "class-12-notes/mathematics", createdAt: "2026-01-04T10:00:00.000Z", updatedAt: "2026-01-04T10:00:00.000Z" },
];

export const NOTE_DRAFT_VALID = { title: "  Kinematics summary  ", body: "  v = u + at  ", quote: "  Equations of motion  ", subjectKey: "class-11-notes/physics" };
export const NOTE_DRAFT_EMPTY_TITLE = { title: "   ", body: "x", quote: "", subjectKey: "" };
export const NOTE_DRAFT_LONG_TITLE = { title: "t".repeat(121), body: "x", quote: "", subjectKey: "" };
export const NOTE_DRAFT_EMPTY_BODY_AND_QUOTE = { title: "Title", body: "   ", quote: "", subjectKey: "" };
export const NOTE_DRAFT_LONG_BODY = { title: "Title", body: "b".repeat(5001), quote: "", subjectKey: "" };
export const NOTE_DRAFT_LONG_QUOTE = { title: "Title", body: "x", quote: "q".repeat(601), subjectKey: "" };

export const NOTES_JUNK: unknown = [
  { id: "ok", title: "t", body: "b", quote: "q", subjectKey: "s", createdAt: "c", updatedAt: "u" },
  { id: 42, title: "t", body: "b", quote: "q", subjectKey: "s", createdAt: "c", updatedAt: "u" },
  { title: "missing id" },
  "not-an-object",
  null,
  { id: "no-body", title: "t", quote: "q", subjectKey: "s", createdAt: "c", updatedAt: "u" },
];

/* ── Community rules (Wave 1 port fixtures) ──────────────────────── */

export const COMMUNITY_QUESTIONS = {
  short: "help me",
  exactly8: "help me!",
  long: "q".repeat(1001),
  valid: "  Why does ice float on water?  ",
};

export const ASK_PROMPT_CASES = [
  { question: "  Explain Lenz's law  ", subjectName: "Physics" },
  { question: "  Explain Lenz's law  ", subjectName: "" },
  { question: "Explain Lenz's law", subjectName: undefined },
];
