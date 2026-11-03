import { describe, it, expect } from "vitest";
import { buildAskPrompt, getCommunitySpace, listCommunitySpaces, MAX_QUESTION_LENGTH, validateQuestion } from "@/lib/community";
import { accuracyBySubject, accuracyByTopic, completionByUnit, overallAccuracy, weeklyTrend } from "@/lib/analytics";
import { evaluateAchievements, nextMilestone } from "@/lib/achievements";
import type { QuizHistoryRow } from "@/lib/api/ai-quiz-history";
import { addDays, buildCards, dueQueue, normalizeStore, sm2 } from "@/lib/srs";
import { buildWeeklyPlan, weakTopicsFromJourney } from "@/lib/study-plan";
import { answerKey, assembleMock, parseMarks, scoreMock } from "@/lib/mock-exam";
import { DEFAULT_GOALS, listGoalSubjects } from "@/lib/study-goals";
import { addNote, filterNotes, normalizeNotes, removeNote, updateNote, validateNote, EMPTY_DRAFT } from "@/lib/personal-notes";
import { buildUnitPack, packFilename, packItemCount, packToMarkdown } from "@/lib/offline-pack";
import type { SubjectPyqBank } from "@/lib/pyq-bank";
import { sectionForPath } from "@/lib/sections";
import { NAV_HREFS } from "@/lib/navigation";
import { buildSiteIndex } from "@/lib/site-index";
import type { ProgressEntry } from "@/types/api";

describe("SM-2", () => {
  it("schedules 1, 6 then ease-scaled days", () => {
    const a = sm2(undefined, 4, "2026-01-01");
    expect([a.interval, a.due]).toEqual([1, "2026-01-02"]);
    const b = sm2(a, 4, a.due);
    expect(b.interval).toBe(6);
    const c = sm2(b, 4, b.due);
    expect(c.interval).toBe(Math.round(6 * b.ease));
  });
  it("lapses reset reps and floor ease at 1.3", () => {
    let s = sm2(undefined, 5, "2026-01-01");
    for (let i = 0; i < 20; i++) s = sm2(s, 0, "2026-01-02");
    expect(s.reps).toBe(0);
    expect(s.ease).toBe(1.3);
    expect(s.lapses).toBe(20);
    expect(s.due).toBe("2026-01-03");
  });
  it("adds days across month ends", () => expect(addDays("2026-01-31", 1)).toBe("2026-02-01"));
});

describe("cards and queue", () => {
  const bank = {
    theory: [{ title: "Enzymes", notes: ["Biological catalysts"] }],
    pyqs: [{ year: 2023, title: "t", units: [], questions: [{ question: "Define enzyme", solution: "A catalyst" }, { question: "No answer" }] }],
    drills: [],
  };
  it("derives cards from the pyq-bank shape and skips answerless ones", () => {
    const cards = buildCards("class-11-notes/biology", bank);
    expect(cards.map((c) => c.kind)).toEqual(["concept", "pyq"]);
  });
  it("splits due vs new", () => {
    const cards = buildCards("k", bank);
    const store = { [cards[0].id]: sm2(undefined, 4, "2026-01-01") };
    const q = dueQueue(cards, store, "2026-01-02");
    expect(q.due).toHaveLength(1);
    expect(q.fresh).toHaveLength(1);
    expect(dueQueue(cards, store, "2026-01-01").due).toHaveLength(0);
  });
  it("drops invalid stored states", () => {
    expect(normalizeStore({ a: { ease: 2.5 }, b: sm2(undefined, 4, "2026-01-01") })).toHaveProperty("b");
    expect(Object.keys(normalizeStore("x"))).toHaveLength(0);
  });
});

describe("weekly plan", () => {
  const key = listGoalSubjects()[0].key;
  const [classSlug, subjectSlug] = key.split("/");
  const entry = (n: string, status: ProgressEntry["status"]) =>
    ({ id: n, topicId: n, completed: status === "completed", completedAt: null, updatedAt: "", status, classSlug, subjectSlug, unitSlug: "u", topicSlug: n, topic: { title: n } }) as unknown as ProgressEntry;
  it("ranks in-progress before untouched and skips completed", () => {
    const weak = weakTopicsFromJourney([entry("a", "not_started"), entry("b", "in_progress"), entry("c", "completed")]);
    expect(weak.map((w) => w.title)).toEqual(["b", "a"]);
  });
  it("is empty without subjects or after the exam", () => {
    expect(buildWeeklyPlan(DEFAULT_GOALS, [])).toEqual([]);
    expect(buildWeeklyPlan({ ...DEFAULT_GOALS, subjects: [key], examDate: "2020-01-01" }, [], new Date(2026, 0, 1))).toEqual([]);
  });
  it("ends on exam day with a revision day before it", () => {
    const goals = { ...DEFAULT_GOALS, subjects: [key], examDate: "2026-01-03" };
    const days = buildWeeklyPlan(goals, weakTopicsFromJourney([entry("b", "in_progress")]), new Date(2026, 0, 1));
    expect(days.map((d) => d.daysToExam)).toEqual([2, 1, 0]);
    expect(days[0].blocks[0].focus?.title).toBe("b");
    expect(days[1].revision).toBe(true);
    expect(days[1].blocks[0].focus).toBeNull();
  });
  it("gives a full week with no exam date", () => {
    expect(buildWeeklyPlan({ ...DEFAULT_GOALS, subjects: [key] }, [])).toHaveLength(7);
  });
});

describe("mock exam", () => {
  const mcq = Array.from({ length: 6 }, (_, i) => ({ q: `Q${i}`, options: ["right", "x", "y", "z"], answer: 0, why: "w" }));
  const pyqs = [{ year: 2022, title: "t", units: [], questions: [{ question: "W1", marks: "5", solution: "s" }, { question: "W2", marks: 3 }] }];
  it("is reproducible per seed and keeps the key aligned after shuffling", () => {
    const a = assembleMock({ mcqPool: mcq, pyqs, objectiveCount: 4, writtenCount: 2, seed: 7 });
    const b = assembleMock({ mcqPool: mcq, pyqs, objectiveCount: 4, writtenCount: 2, seed: 7 });
    expect(a).toEqual(b);
    for (const o of a.objective) expect(o.options[o.answer]).toBe("right");
    expect(a.totalMarks).toBe(4 + 8);
    expect(a.durationMinutes).toBe(4 + 16);
  });
  it("caps counts and scores OMR + self marks", () => {
    const p = assembleMock({ mcqPool: mcq, pyqs, objectiveCount: 99, writtenCount: 99, seed: 3 });
    expect(p.objective).toHaveLength(6);
    expect(p.written).toHaveLength(2);
    const answers = { o1: p.objective[0].answer, o2: (p.objective[1].answer + 1) % 4 };
    const s = scoreMock(p, answers, { w1: 99, w2: -4 });
    expect([s.correct, s.wrong, s.blank]).toEqual([1, 1, 4]);
    expect(s.writtenMarks).toBe(p.written[0].marks);
    expect(answerKey(p)).toHaveLength(6);
  });
  it("parses marks", () => {
    expect(parseMarks("3")).toBe(3);
    expect(parseMarks(undefined)).toBe(5);
  });
});

describe("registry rows", () => {
  const gated = { "/planner": "plus", "/srs": "plus", "/mock-exams": "pro" } as const;
  it.each(Object.entries(gated))("%s is gated, in nav and in the site index", (href, tier) => {
    expect(sectionForPath(href)?.minTier).toBe(tier);
    expect(NAV_HREFS).toContain(href);
    const hrefs = JSON.stringify(buildSiteIndex());
    expect(hrefs).toContain(`"${href}"`);
  });
});

describe("analytics and achievements", () => {
  const row = (o: Partial<QuizHistoryRow>): QuizHistoryRow => ({
    id: "1", title: "t", classSlug: null, subjectSlug: "physics", topic: "Optics",
    difficulty: null, answered: 10, correct: 5, scorePct: 50, createdat: "2026-03-04T10:00:00Z", ...o,
  });
  it("aggregates accuracy weakest first and ignores unanswered rows", () => {
    const rows = [row({}), row({ id: "2", subjectSlug: "chemistry", topic: "Acids", correct: 9 }), row({ id: "3", answered: 0, correct: 0 })];
    const s = accuracyBySubject(rows);
    expect(s.map((b) => b.key)).toEqual(["physics", "chemistry"]);
    expect(s[0].accuracy).toBe(50);
    expect(accuracyByTopic(rows)[1].label).toBe("Acids");
    expect(overallAccuracy(rows)).toEqual({ quizzes: 2, answered: 20, accuracy: 70 });
  });
  it("builds a weekly trend keyed by Monday", () => {
    const entries = [{ id: "a", topicId: "x", completed: true, completedAt: "2026-03-05T00:00:00Z", updatedAt: "" }] as ProgressEntry[];
    const t = weeklyTrend([row({}), row({ id: "2", createdat: "2026-03-12T10:00:00Z", correct: 10 })], entries);
    expect(t.map((p) => p.week)).toEqual(["2026-03-02", "2026-03-09"]);
    expect(t[0].topicsCompleted).toBe(1);
    expect(t[1].accuracy).toBe(100);
  });
  it("groups completion per unit", () => {
    const e = (u: string, done: boolean) => ({ id: u, topicId: u, completed: done, completedAt: null, updatedAt: "", classSlug: "c", subjectSlug: "s", unitSlug: u }) as ProgressEntry;
    const r = completionByUnit([e("u1", true), e("u1", false), e("u2", false)]);
    expect(r[0]).toMatchObject({ key: "c/s/u1", total: 2, completed: 1, percent: 50 });
  });
  it("evaluates badges and the next milestone", () => {
    const list = evaluateAchievements({ streak: 4, topicsCompleted: 0, topicsInProgress: 0, percent: 0 });
    expect(list.find((a) => a.id === "streak-3")?.earned).toBe(true);
    expect(list.find((a) => a.id === "streak-7")?.progress).toBe(57);
    expect(nextMilestone(list)?.id).toBe("streak-7");
    expect(nextMilestone(list.map((a) => ({ ...a, earned: true })))).toBeNull();
  });
  it("registers /analytics (pro) and /streaks (member) everywhere", () => {
    expect(sectionForPath("/analytics")?.minTier).toBe("pro");
    expect(sectionForPath("/streaks")?.minTier).toBe("member");
    expect(NAV_HREFS).toEqual(expect.arrayContaining(["/analytics", "/streaks"]));
    const flat = JSON.stringify(buildSiteIndex());
    expect(flat).toContain('"/analytics"');
    expect(flat).toContain('"/streaks"');
  });
});

describe("community and ask", () => {
  it("builds one space per syllabus subject and resolves by id", () => {
    const spaces = listCommunitySpaces();
    expect(spaces.length).toBe(listGoalSubjects().length);
    expect(new Set(spaces.map((s) => s.id)).size).toBe(spaces.length);
    expect(getCommunitySpace(spaces[0].id)).toEqual(spaces[0]);
    expect(getCommunitySpace("nope")).toBeUndefined();
  });
  it("validates and scopes questions", () => {
    expect(validateQuestion("hi")).not.toBeNull();
    expect(validateQuestion("x".repeat(MAX_QUESTION_LENGTH + 1))).not.toBeNull();
    expect(validateQuestion("Why is the sky blue?")).toBeNull();
    expect(buildAskPrompt("  Why? ", "Physics")).toBe("[NEB Physics] Why?");
    expect(buildAskPrompt("Why?")).toBe("Why?");
  });
  it("gates /community (plus), /community/[id] by prefix and /ask (member)", () => {
    expect(sectionForPath("/community")?.minTier).toBe("plus");
    expect(sectionForPath(`/community/${listCommunitySpaces()[0].id}`)?.minTier).toBe("plus");
    expect(sectionForPath("/ask")?.minTier).toBe("member");
    expect(NAV_HREFS).toEqual(expect.arrayContaining(["/community", "/ask"]));
    const flat = JSON.stringify(buildSiteIndex());
    expect(flat).toContain('"/community"');
    expect(flat).toContain('"/ask"');
  });
});

describe("personal notes", () => {
  const draft = { ...EMPTY_DRAFT, title: " Lens ", body: "f = 1/v", subjectKey: "class-12/physics" };
  it("validates drafts", () => {
    expect(validateNote(EMPTY_DRAFT)).not.toBeNull();
    expect(validateNote({ ...EMPTY_DRAFT, title: "t" })).not.toBeNull();
    expect(validateNote(draft)).toBeNull();
  });
  it("adds, updates, filters and removes", () => {
    let notes = addNote([], draft, "a", "2026-01-01T00:00:00Z");
    notes = addNote(notes, { ...draft, title: "Prism", body: "angle", quote: "" }, "b", "2026-01-02T00:00:00Z");
    expect(notes[0].id).toBe("b");
    expect(notes[1].title).toBe("Lens");
    notes = updateNote(notes, "a", { ...draft, body: "changed" }, "2026-01-03T00:00:00Z");
    expect(filterNotes(notes, "", "")[0].id).toBe("a");
    expect(filterNotes(notes, "prism", "").map((n) => n.id)).toEqual(["b"]);
    expect(filterNotes(notes, "", "class-11/x")).toEqual([]);
    expect(removeNote(notes, "a").map((n) => n.id)).toEqual(["b"]);
  });
  it("drops malformed stored rows", () => {
    expect(normalizeNotes("x")).toEqual([]);
    expect(normalizeNotes([{ id: 1 }, addNote([], draft, "a", "t")[0]])).toHaveLength(1);
  });
});

describe("offline pack", () => {
  const bank: SubjectPyqBank = {
    theory: [{ title: "Concept", notes: ["n1"], detail: "d" }],
    pyqs: [
      { year: 2080, title: "2080", units: ["u1"], questions: [{ question: "Q1", marks: 2, solution: "A1" }] },
      { year: 2079, title: "2079", units: ["u2"], questions: [{ question: "Q2" }] },
    ],
    drills: [
      { id: "d1", question: "D1", unit: "u1", kind: "concept" },
      { id: "d2", question: "D2", unit: "u2", kind: "concept" },
    ],
  };
  it("slices a bank to one unit and renders markdown", () => {
    const pack = buildUnitPack("Unit One", "u1", bank, null);
    expect(pack.pyqs.map((y) => y.year)).toEqual([2080]);
    expect(pack.drills.map((d) => d.id)).toEqual(["d1"]);
    expect(packItemCount(pack)).toBe(3);
    const md = packToMarkdown(pack);
    expect(md).toContain("# Unit One");
    expect(md).toContain("1. Q1 [2]");
    expect(md).not.toContain("Q2");
    expect(packFilename("Unit One: Heat!")).toBe("unit-one-heat.md");
  });
});

describe("my-notes and downloads", () => {
  it("gates /my-notes (member) and /downloads (pro) and links them everywhere", () => {
    expect(sectionForPath("/my-notes")?.minTier).toBe("member");
    expect(sectionForPath("/downloads")?.minTier).toBe("pro");
    expect(NAV_HREFS).toEqual(expect.arrayContaining(["/my-notes", "/downloads"]));
    const flat = JSON.stringify(buildSiteIndex());
    expect(flat).toContain('"/my-notes"');
    expect(flat).toContain('"/downloads"');
  });
});
