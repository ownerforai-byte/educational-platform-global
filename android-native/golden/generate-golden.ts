/**
 * Golden-vector generator — run with:  npx tsx android-native/golden/generate-golden.ts
 * (from the repo root; resolves the frontend `@/` alias through frontend/tsconfig.json).
 *
 * Executes the REAL website TypeScript and writes the outputs to
 * app/src/test/resources/golden/*.json. The Kotlin ports in core/logic/*.kt
 * are unit-tested against these files. Regenerate after any owner-approved
 * web-side change to the source features.
 */

import * as fs from "node:fs";
import * as path from "node:path";

import {
  SRS_BANK,
  SRS_SM2_CASES,
  SRS_ADD_DAYS_CASES,
  SRS_STORE_JUNK,
  MCQ_POOL,
  PYQ_YEARS,
  MOCK_ASSEMBLE_CASES,
  MOCK_PARSE_MARKS_CASES,
  ACHIEVEMENT_INPUTS,
  OFFLINE_BANK,
  OFFLINE_FORMULA_UNIT,
  OFFLINE_FILENAME_CASES,
  GOAL_SUBJECTS,
  GOALS_JUNK,
  GOALS_JUNK_2,
  GOALS_JUNK_3,
  PLAN_ENTRIES,
  PLAN_GOALS,
  PLAN_GOALS_NO_EXAM,
  PLAN_GOALS_PAST_EXAM,
  PLAN_GOALS_SOON_EXAM,
  QUIZ_ROWS,
  ANALYTICS_ENTRIES,
  PINNED_NOW_ISO,
  NOTES_SEED,
  NOTE_DRAFT_VALID,
  NOTE_DRAFT_EMPTY_TITLE,
  NOTE_DRAFT_LONG_TITLE,
  NOTE_DRAFT_EMPTY_BODY_AND_QUOTE,
  NOTE_DRAFT_LONG_BODY,
  NOTE_DRAFT_LONG_QUOTE,
  NOTES_JUNK,
  COMMUNITY_QUESTIONS,
  ASK_PROMPT_CASES,
} from "./fixtures";

/* The study-plan feature reads the subject catalog from listGoalSubjects()
 * (the real frontend SYLLABUS). The port injects the catalog as a parameter,
 * so the golden JSON carries the REAL catalog rows for the fixture keys —
 * no stubbing, the genuine website data drives the expectations. */
const goalMod = await import("@/features/study-plan/study-goals");
const planMod = await import("@/features/study-plan/study-plan");
const FIXTURE_KEYS = new Set(GOAL_SUBJECTS.map((s) => s.key));
const REAL_CATALOG = goalMod.listGoalSubjects().filter((s) => FIXTURE_KEYS.has(s.key));

const srs = await import("@/features/srs");
const mock = await import("@/features/mock-exam");
const ach = await import("@/features/achievements");
const offline = await import("@/features/offline");
const analytics = await import("@/features/analytics");

/** Local-noon date helper: the plan/goals functions read LOCAL date
 * components (getFullYear/getMonth/getDate), so golden inputs are
 * constructed at local noon - TZ-stable for any fixed-offset zone. */
function localNoon(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day, 12, 0, 0);
}

const OUT = path.join(
  import.meta.dirname ?? ".",
  "..",
  "app",
  "src",
  "test",
  "resources",
  "golden",
);
fs.mkdirSync(OUT, { recursive: true });

function write(name: string, payload: unknown): void {
  const file = path.join(OUT, name);
  fs.writeFileSync(file, JSON.stringify(payload, null, 1));
  console.log(`wrote ${name} (${Buffer.byteLength(JSON.stringify(payload))} B)`);
}

/* ── SRS ─────────────────────────────────────────────────────── */

const sm2Golden = SRS_SM2_CASES.map((c) => ({
  name: c.name,
  prev: c.prev,
  quality: c.quality,
  today: c.today,
  expected: srs.sm2(c.prev ?? undefined, c.quality as 0 | 1 | 2 | 3 | 4 | 5, c.today),
}));

const cards = srs.buildCards("class-11-notes/physics", SRS_BANK);

const store = srs.normalizeStore({
  ...SRS_STORE_JUNK,
  [cards[0].id]: { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: "2026-01-05" },
  [cards[1].id]: { ease: 2.5, interval: 6, reps: 2, lapses: 0, due: "2026-01-03" },
  [cards[2].id]: { ease: 2.2, interval: 4, reps: 3, lapses: 1, due: "2026-01-20" },
});

const srsGolden = {
  sm2: sm2Golden,
  addDays: SRS_ADD_DAYS_CASES.map((c) => ({ ...c, expected: srs.addDays(c.iso, c.days) })),
  buildCards: { subjectKey: "class-11-notes/physics", bank: SRS_BANK, expected: cards },
  store: {
    junk: SRS_STORE_JUNK,
    // Entries added on top of the normalized junk, keyed by generated card ids.
    added: [
      { id: cards[0].id, state: { ease: 2.5, interval: 1, reps: 1, lapses: 0, due: "2026-01-05" } },
      { id: cards[1].id, state: { ease: 2.5, interval: 6, reps: 2, lapses: 0, due: "2026-01-03" } },
      { id: cards[2].id, state: { ease: 2.2, interval: 4, reps: 3, lapses: 1, due: "2026-01-20" } },
    ],
  },
  dueQueue: {
    today: "2026-01-05",
    newLimit: 2,
    expected: srs.dueQueue(cards, store, "2026-01-05", 2),
  },
  normalizeStore: { input: SRS_STORE_JUNK, expected: srs.normalizeStore(SRS_STORE_JUNK) },
};
write("srs-golden.json", srsGolden);

/* ── Mock exam ───────────────────────────────────────────────── */

const mulberryGolden: Record<string, number[]> = {};
for (const seed of [1, 0, 42, 4294967295, 123456789]) {
  const rnd = mock.mulberry32(seed);
  mulberryGolden[String(seed)] = Array.from({ length: 8 }, () => rnd());
}

const assembled = new Map<string, ReturnType<typeof mock.assembleMock>>();
const assembleGolden = MOCK_ASSEMBLE_CASES.map((c) => {
  const paper = mock.assembleMock({
    mcqPool: MCQ_POOL,
    pyqs: PYQ_YEARS,
    objectiveCount: c.objectiveCount,
    writtenCount: c.writtenCount,
    seed: c.seed,
  });
  assembled.set(c.name, paper);
  return { name: c.name, objectiveCount: c.objectiveCount, writtenCount: c.writtenCount, seed: c.seed, expected: paper };
});

const mainPaper = assembled.get("default")!;
const scoreAnswers: Record<string, number> = {
  [mainPaper.objective[0].id]: mainPaper.objective[0].answer,
  [mainPaper.objective[1].id]:
    (mainPaper.objective[1].answer + 1) % mainPaper.objective[1].options.length,
  [mainPaper.objective[2].id]: -1,
};
const scoreSelfMarks: Record<string, number> = {};
mainPaper.written.forEach((w, i) => {
  scoreSelfMarks[w.id] = i === 0 ? w.marks + 10 : i === 1 ? Math.max(0, w.marks - 1) : -3;
});
const scoreGolden = {
  answers: scoreAnswers,
  selfMarks: scoreSelfMarks,
  expected: mock.scoreMock(mainPaper, scoreAnswers, scoreSelfMarks),
  blankAll: { answers: {}, selfMarks: {}, expected: mock.scoreMock(mainPaper, {}, {}) },
  key: mock.answerKey(mainPaper),
};

const mockGolden = {
  mcqPool: MCQ_POOL,
  pyqBank: { pyqs: PYQ_YEARS },
  mulberry32: mulberryGolden,
  assemble: assembleGolden,
  parseMarks: MOCK_PARSE_MARKS_CASES.map((c) => ({
    name: c.name,
    marks: c.marks === undefined ? null : c.marks,
    expected: mock.parseMarks(c.marks),
  })),
  score: scoreGolden,
};
write("mock-exam-golden.json", mockGolden);

/* ── Achievements ────────────────────────────────────────────── */

const achGolden = {
  evaluate: ACHIEVEMENT_INPUTS.map((c) => ({
    name: c.name,
    input: c.input,
    expected: ach.evaluateAchievements(c.input),
  })),
  nextMilestone: {
    mixed: ach.nextMilestone(ach.evaluateAchievements(ACHIEVEMENT_INPUTS[1].input)),
    tie: ach.nextMilestone([
      { id: "a", title: "A", description: "a", earned: false, progress: 40 },
      { id: "b", title: "B", description: "b", earned: false, progress: 40 },
    ]),
    allEarned: ach.nextMilestone([
      { id: "a", title: "A", description: "a", earned: true, progress: 100 },
    ]),
    empty: ach.nextMilestone([]),
  },
};
write("achievements-golden.json", achGolden);

/* ── Offline pack ────────────────────────────────────────────── */

const pack = offline.buildUnitPack(
  "Work, Energy and Power",
  "work-energy-and-power",
  OFFLINE_BANK,
  OFFLINE_FORMULA_UNIT,
);
const offlineGolden = {
  bank: OFFLINE_BANK,
  formulaUnit: OFFLINE_FORMULA_UNIT,
  sameUnit: [
    { a: "chemical-bonding", b: "chemical-bonding-and-shapes-of-molecules", expected: offline.sameUnit("chemical-bonding", "chemical-bonding-and-shapes-of-molecules") },
    { a: "work-energy-power", b: "work-energy-and-power", expected: offline.sameUnit("work-energy-power", "work-energy-and-power") },
    { a: "kinematics", b: "kinematics", expected: offline.sameUnit("kinematics", "kinematics") },
    { a: "kinematics", b: "optics", expected: offline.sameUnit("kinematics", "optics") },
    { a: undefined as unknown as string, b: "kinematics", expected: offline.sameUnit(undefined as unknown as string, "kinematics") },
  ],
  pack,
  packItemCount: offline.packItemCount(pack),
  packToMarkdown: offline.packToMarkdown(pack),
  emptyPack: offline.buildUnitPack("Nothing", "optics", OFFLINE_BANK, null),
  emptyPackMarkdown: offline.packToMarkdown(offline.buildUnitPack("Nothing", "optics", OFFLINE_BANK, null)),
  filenames: OFFLINE_FILENAME_CASES.map((c) => ({ name: c.name, title: c.title, expected: offline.packFilename(c.title) })),
};
write("offline-golden.json", offlineGolden);

/* ── Study goals + weekly plan ───────────────────────────────── */

const goalsGolden = {
  catalog: REAL_CATALOG,
  normalize: [
    { name: "junk1", input: GOALS_JUNK, expected: goalMod.normalizeGoals(GOALS_JUNK) },
    { name: "junk2", input: GOALS_JUNK_2, expected: goalMod.normalizeGoals(GOALS_JUNK_2) },
    { name: "junk3", input: GOALS_JUNK_3, expected: goalMod.normalizeGoals(GOALS_JUNK_3) },
    { name: "null", input: null, expected: goalMod.normalizeGoals(null) },
  ],
  daysUntilExam: [
    { name: "null-exam", goals: { ...PLAN_GOALS, examDate: null }, today: "2026-01-05", expected: goalMod.daysUntilExam({ ...PLAN_GOALS, examDate: null }, localNoon(2026, 1, 5)) },
    { name: "future", goals: PLAN_GOALS, today: "2026-01-05", expected: goalMod.daysUntilExam(PLAN_GOALS, localNoon(2026, 1, 5)) },
    { name: "same-day", goals: PLAN_GOALS, today: "2026-01-08", expected: goalMod.daysUntilExam(PLAN_GOALS, localNoon(2026, 1, 8)) },
    { name: "past", goals: PLAN_GOALS, today: "2026-01-11", expected: goalMod.daysUntilExam(PLAN_GOALS, localNoon(2026, 1, 11)) },
  ],
  seedDailyPlan: [
    { name: "even", goals: PLAN_GOALS, expected: goalMod.seedDailyPlan(PLAN_GOALS) },
    { name: "floor-clamp", goals: { ...PLAN_GOALS, dailyMinutes: 10 }, expected: goalMod.seedDailyPlan({ ...PLAN_GOALS, dailyMinutes: 10 }) },
    { name: "empty", goals: { ...PLAN_GOALS, subjects: [] }, expected: goalMod.seedDailyPlan({ ...PLAN_GOALS, subjects: [] }) },
  ],
  weakTopics: { entries: PLAN_ENTRIES, expected: planMod.weakTopicsFromJourney(PLAN_ENTRIES as never) },
  weeklyPlan: [
    { name: "exam-week", goals: PLAN_GOALS, today: "2026-01-05", expected: planMod.buildWeeklyPlan(PLAN_GOALS, planMod.weakTopicsFromJourney(PLAN_ENTRIES as never), localNoon(2026, 1, 5)) },
    { name: "no-exam", goals: PLAN_GOALS_NO_EXAM, today: "2026-01-05", expected: planMod.buildWeeklyPlan(PLAN_GOALS_NO_EXAM, planMod.weakTopicsFromJourney(PLAN_ENTRIES as never), localNoon(2026, 1, 5)) },
    { name: "past-exam", goals: PLAN_GOALS_PAST_EXAM, today: "2026-01-05", expected: planMod.buildWeeklyPlan(PLAN_GOALS_PAST_EXAM, planMod.weakTopicsFromJourney(PLAN_ENTRIES as never), localNoon(2026, 1, 5)) },
    { name: "exam-tomorrow", goals: PLAN_GOALS_SOON_EXAM, today: "2026-01-05", expected: planMod.buildWeeklyPlan(PLAN_GOALS_SOON_EXAM, planMod.weakTopicsFromJourney(PLAN_ENTRIES as never), localNoon(2026, 1, 5)) },
    { name: "no-subjects", goals: { ...PLAN_GOALS, subjects: [] }, today: "2026-01-05", expected: planMod.buildWeeklyPlan({ ...PLAN_GOALS, subjects: [] }, planMod.weakTopicsFromJourney(PLAN_ENTRIES as never), localNoon(2026, 1, 5)) },
  ],
};
write("study-plan-golden.json", goalsGolden);

/* ── Analytics ───────────────────────────────────────────────── */

/* dailyStudyActivity reads `new Date()` internally — pin it for the golden run. */
const FixedNow = Date.parse(PINNED_NOW_ISO);
class PinnedDate extends Date {
  constructor(...args: unknown[]) {
    if (args.length === 0) super(FixedNow);
    else super(...(args as ConstructorParameters<typeof Date>));
  }
  static now(): number {
    return FixedNow;
  }
}
const RealDate = globalThis.Date;
(globalThis as { Date: unknown }).Date = PinnedDate;

const analyticsGolden = {
  accuracyBySubject: { rows: QUIZ_ROWS, expected: analytics.accuracyBySubject(QUIZ_ROWS as never) },
  accuracyByTopic: { rows: QUIZ_ROWS, expected: analytics.accuracyByTopic(QUIZ_ROWS as never) },
  completionByUnit: { entries: ANALYTICS_ENTRIES, expected: analytics.completionByUnit(ANALYTICS_ENTRIES as never) },
  weeklyTrend: { rows: QUIZ_ROWS, entries: ANALYTICS_ENTRIES, expected: analytics.weeklyTrend(QUIZ_ROWS as never, ANALYTICS_ENTRIES as never) },
  dailyStudyActivity: {
    rows: QUIZ_ROWS,
    entries: ANALYTICS_ENTRIES,
    days: 7,
    pinnedNow: PINNED_NOW_ISO,
    expected: analytics.dailyStudyActivity(QUIZ_ROWS as never, ANALYTICS_ENTRIES as never, 7),
  },
  overallAccuracy: { rows: QUIZ_ROWS, expected: analytics.overallAccuracy(QUIZ_ROWS as never) },
};

(globalThis as { Date: unknown }).Date = RealDate;
write("analytics-golden.json", analyticsGolden);

/* ── Personal notes (Wave 1) ─────────────────────────────── */

const pn = await import("@/features/personal-notes");

const pnGolden = {
  validate: {
    valid: { draft: NOTE_DRAFT_VALID, expected: pn.validateNote(NOTE_DRAFT_VALID as never) },
    emptyTitle: { draft: NOTE_DRAFT_EMPTY_TITLE, expected: pn.validateNote(NOTE_DRAFT_EMPTY_TITLE as never) },
    longTitle: { draft: NOTE_DRAFT_LONG_TITLE, expected: pn.validateNote(NOTE_DRAFT_LONG_TITLE as never) },
    emptyBodyAndQuote: { draft: NOTE_DRAFT_EMPTY_BODY_AND_QUOTE, expected: pn.validateNote(NOTE_DRAFT_EMPTY_BODY_AND_QUOTE as never) },
    longBody: { draft: NOTE_DRAFT_LONG_BODY, expected: pn.validateNote(NOTE_DRAFT_LONG_BODY as never) },
    longQuote: { draft: NOTE_DRAFT_LONG_QUOTE, expected: pn.validateNote(NOTE_DRAFT_LONG_QUOTE as never) },
  },
  addNote: {
    seed: NOTES_SEED,
    draft: NOTE_DRAFT_VALID,
    id: "n9",
    now: "2026-02-01T09:00:00.000Z",
    expected: pn.addNote(NOTES_SEED as never, NOTE_DRAFT_VALID as never, "n9", "2026-02-01T09:00:00.000Z"),
  },
  updateNote: {
    seed: NOTES_SEED,
    id: "n2",
    draft: NOTE_DRAFT_VALID,
    now: "2026-02-02T09:00:00.000Z",
    expected: pn.updateNote(NOTES_SEED as never, "n2", NOTE_DRAFT_VALID as never, "2026-02-02T09:00:00.000Z"),
  },
  removeNote: { seed: NOTES_SEED, id: "n2", expected: pn.removeNote(NOTES_SEED as never, "n2") },
  filterNotes: {
    bySubject: { seed: NOTES_SEED, query: "", subjectKey: "class-11-notes/physics", expected: pn.filterNotes(NOTES_SEED as never, "", "class-11-notes/physics") },
    byQuery: { seed: NOTES_SEED, query: "MOLE", subjectKey: "", expected: pn.filterNotes(NOTES_SEED as never, "MOLE", "") },
    byQueryBody: { seed: NOTES_SEED, query: "substitution", subjectKey: "", expected: pn.filterNotes(NOTES_SEED as never, "substitution", "") },
    noMatch: { seed: NOTES_SEED, query: "zzz", subjectKey: "", expected: pn.filterNotes(NOTES_SEED as never, "zzz", "") },
  },
  normalizeNotes: { input: NOTES_JUNK, expected: pn.normalizeNotes(NOTES_JUNK) },
};
write("personal-notes-golden.json", pnGolden);

/* ── Community rules (Wave 1) ────────────────────────────── */

const cm = await import("@/features/community");

/* listCommunitySpaces() reads the REAL catalog internally; the golden must
 * carry those same rows so the Kotlin port (catalog injected) reproduces
 * `expected` exactly — fixture rows would NOT match (real className is
 * "Class 11 Notes", fixtures say "Class 11"). */
const REAL_SPACE_CATALOG = goalMod.listGoalSubjects();

const cmGolden = {
  spaces: {
    catalog: REAL_SPACE_CATALOG,
    expected: cm.listCommunitySpaces(),
  },
  getSpace: {
    hit: { id: "class-11-notes-physics", expected: cm.getCommunitySpace("class-11-notes-physics") ?? null },
    miss: { id: "no-such-space", expected: cm.getCommunitySpace("no-such-space") ?? null },
  },
  askPrompt: ASK_PROMPT_CASES.map((c) => ({ ...c, expected: cm.buildAskPrompt(c.question, c.subjectName) })),
  validateQuestion: {
    short: { q: COMMUNITY_QUESTIONS.short, expected: cm.validateQuestion(COMMUNITY_QUESTIONS.short) },
    exactly8: { q: COMMUNITY_QUESTIONS.exactly8, expected: cm.validateQuestion(COMMUNITY_QUESTIONS.exactly8) },
    long: { q: COMMUNITY_QUESTIONS.long, expected: cm.validateQuestion(COMMUNITY_QUESTIONS.long) },
    valid: { q: COMMUNITY_QUESTIONS.valid, expected: cm.validateQuestion(COMMUNITY_QUESTIONS.valid) },
  },
};
write("community-golden.json", cmGolden);

/* listGoalSubjects is read-only module state — no stubbing was needed. */
console.log("golden generation complete →", OUT);
