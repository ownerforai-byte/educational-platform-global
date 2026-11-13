import { describe, it, expect } from "vitest";
import {
  DEFAULT_GOALS,
  daysUntilExam,
  listGoalSubjects,
  normalizeGoals,
  seedDailyPlan,
} from "@/lib/study-goals";
import { sectionForPath } from "@/lib/sections";
import { NAV_HREFS } from "@/lib/core/navigation";
import { buildSiteIndex } from "@/lib/core/site-index";

describe("study goals reader", () => {
  it("lists subjects from the syllabus", () => {
    const subjects = listGoalSubjects();
    expect(subjects.length).toBeGreaterThan(0);
    expect(new Set(subjects.map((s) => s.key)).size).toBe(subjects.length);
  });

  it("normalises junk to defaults", () => {
    expect(normalizeGoals(null)).toEqual(DEFAULT_GOALS);
    const bad = normalizeGoals({ subjects: ["nope", 3], examDate: "x", targetPercent: 150, dailyMinutes: 1 });
    expect(bad.subjects).toEqual([]);
    expect(bad.examDate).toBeNull();
    expect(bad.targetPercent).toBeNull();
    expect(bad.dailyMinutes).toBe(DEFAULT_GOALS.dailyMinutes);
  });

  it("keeps valid values and de-duplicates subjects", () => {
    const key = listGoalSubjects()[0].key;
    const g = normalizeGoals({ subjects: [key, key], examDate: "2030-01-10", targetPercent: 80, dailyMinutes: 90 });
    expect(g.subjects).toEqual([key]);
    expect(g.examDate).toBe("2030-01-10");
    expect(g.targetPercent).toBe(80);
    expect(g.dailyMinutes).toBe(90);
  });

  it("counts days to the exam", () => {
    const g = normalizeGoals({ examDate: "2030-01-10" });
    expect(daysUntilExam(g, new Date(2030, 0, 1))).toBe(9);
    expect(daysUntilExam(DEFAULT_GOALS)).toBeNull();
  });

  it("seeds a daily plan over the chosen subjects", () => {
    const [a, b] = listGoalSubjects();
    const plan = seedDailyPlan(normalizeGoals({ subjects: [a.key, b.key], dailyMinutes: 60 }));
    expect(plan.map((p) => p.minutes)).toEqual([30, 30]);
    expect(seedDailyPlan(DEFAULT_GOALS)).toEqual([]);
  });
});

describe("study desk registry rows", () => {
  const expected = [
    ["/dashboard", "member"],
    ["/settings", "member"],
    ["/onboarding", "guest"],
    ["/report-card", "plus"],
  ] as const;

  it("gates each page at its tier in sections.ts", () => {
    for (const [href, tier] of expected) expect(sectionForPath(href)?.minTier).toBe(tier);
  });

  // buildSiteIndex() is a full registry sweep (~2s standalone, longer when the
  // suite runs in parallel); a 5s default made this assertion flaky, not wrong.
  it("links each page in navigation.ts and site-index.ts", { timeout: 20_000 }, () => {
    const indexed = new Set(buildSiteIndex().flatMap((g) => g.entries.map((e) => e.href)));
    for (const [href] of expected) {
      expect(NAV_HREFS).toContain(href);
      expect(indexed.has(href)).toBe(true);
    }
  });
});
