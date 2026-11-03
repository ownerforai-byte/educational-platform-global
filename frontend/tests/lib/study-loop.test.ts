import { describe, it, expect } from "vitest";
import { addDays, buildCards, dueQueue, normalizeStore, sm2 } from "@/lib/srs";
import { buildWeeklyPlan, weakTopicsFromJourney } from "@/lib/study-plan";
import { answerKey, assembleMock, parseMarks, scoreMock } from "@/lib/mock-exam";
import { DEFAULT_GOALS, listGoalSubjects } from "@/lib/study-goals";
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
