import { describe, expect, it } from "vitest";
import { XP_RULE, setAccuracy, xpForSet, xpForSets } from "../src/utils/xp";
import { cohortSummary, maskName, parseRange, rangeCutoff, rankEntries } from "../src/api/leaderboard";

/**
 * The leaderboard's two kinds of correctness:
 *
 *  1. The XP rule itself — these worked examples are IDENTICAL to
 *     `frontend/tests/lib/practice-xp.test.ts`. If the server and the practice
 *     UI ever disagree, one of the two tables fails.
 *  2. The presentation rules — a name is masked server-side, and equal XP
 *     shares a rank instead of being split by row order.
 */

describe("xpForSet — pinned to the practice UI", () => {
  it("pays the documented choice amounts", () => {
    expect(xpForSet({ answered: 5, correct: 5, scorePct: 100, format: "mcq" })).toBe(75);
    expect(xpForSet({ answered: 5, correct: 3, scorePct: 60, format: "mcq" })).toBe(49);
    expect(xpForSet({ answered: 10, correct: 4, scorePct: 40, format: "mcq" })).toBe(57);
    expect(xpForSet({ answered: 4, correct: 0, scorePct: 0, format: "mcq" })).toBe(8);
    expect(xpForSet({ answered: 0, correct: 0, scorePct: 0, format: "mcq" })).toBe(0);
  });

  it("pays the documented writing amounts, including the sub-50 % halving", () => {
    expect(xpForSet({ answered: 3, correct: 3, scorePct: 100, format: "long-answer" })).toBe(145);
    expect(xpForSet({ answered: 2, correct: 1, scorePct: 60, format: "short-answer" })).toBe(63);
    expect(xpForSet({ answered: 2, correct: 1, scorePct: 40, format: "long-answer" })).toBe(21);
  });

  it("treats an unknown format as a choice set", () => {
    expect(xpForSet({ answered: 4, correct: 2, scorePct: 50, format: undefined })).toBe(29);
    expect(setAccuracy({ answered: 4, correct: 2, scorePct: null })).toBe(50);
  });

  it("sums a student's whole history", () => {
    expect(
      xpForSets([
        { answered: 5, correct: 5, scorePct: 100, format: "mcq" },
        { answered: 5, correct: 5, scorePct: 100, format: "mcq" },
      ]),
    ).toBe(150);
  });

  it("exposes the rule the UI prints", () => {
    expect(XP_RULE.correctChoice).toBe(10);
    expect(XP_RULE.wrongChoice).toBe(2);
    expect(XP_RULE.writingPerQuestion).toBe(40);
    expect(XP_RULE.bonus).toEqual({ at80: 25, at60: 15, at40: 5 });
  });
});

describe("leaderboard range windows", () => {
  it("maps query values to known ranges; anything else is all-time", () => {
    expect(parseRange("week")).toBe("week");
    expect(parseRange("month")).toBe("month");
    expect(parseRange("all")).toBe("all");
    expect(parseRange("year")).toBe("all");
    expect(parseRange(undefined)).toBe("all");
  });

  it("cuts the rolling window at 7 and 30 days", () => {
    const now = new Date("2026-11-08T12:00:00.000Z");
    expect(rangeCutoff("week", now)).toBe("2026-11-01T12:00:00.000Z");
    expect(rangeCutoff("month", now)).toBe("2026-10-09T12:00:00.000Z");
    expect(rangeCutoff("all", now)).toBeNull();
  });
});

describe("cohortSummary — anonymised cohort comparison", () => {
  const ranked = [
    { userId: "a", xp: 300, accuracy: 90 },
    { userId: "b", xp: 200, accuracy: 70 },
    { userId: "c", xp: 100, accuracy: 50 },
    { userId: "d", xp: 100, accuracy: 40 },
  ];

  it("reports medians and the reader's XP percentile, never other data", () => {
    const cohort = cohortSummary(ranked, "b");
    expect(cohort.students).toBe(4);
    expect(cohort.medianXp).toBe(150); // (100 + 200) / 2
    expect(cohort.medianAccuracy).toBe(60); // (50 + 70) / 2
    // "b" outscored two of the four students.
    expect(cohort.yourXpPercentile).toBe(50);
  });

  it("returns no percentile for an unranked reader or a solo board", () => {
    expect(cohortSummary(ranked, "nobody").yourXpPercentile).toBeNull();
    expect(cohortSummary([{ userId: "a", xp: 10, accuracy: 10 }], "a").yourXpPercentile).toBeNull();
    expect(cohortSummary([], "a").students).toBe(0);
  });
});

describe("maskName", () => {
  it("keeps a first name and an initial only", () => {
    expect(maskName("Aarav Sharma")).toBe("Aarav S.");
    expect(maskName("  Sita   Kumari  Thapa ")).toBe("Sita T.");
  });

  it("never returns an empty label", () => {
    expect(maskName(null)).toBe("Student");
    expect(maskName("   ")).toBe("Student");
    expect(maskName("Ram")).toBe("Ram");
  });
});

describe("rankEntries", () => {
  it("ranks by XP and gives equal XP an equal rank", () => {
    const ranked = rankEntries([
      { userId: "a", xp: 100 },
      { userId: "b", xp: 300 },
      { userId: "c", xp: 300 },
      { userId: "d", xp: 50 },
    ]);
    expect(ranked.map((entry) => [entry.userId, entry.rank])).toEqual([
      ["b", 1],
      ["c", 1],
      ["a", 3],
      ["d", 4],
    ]);
  });

  it("does not mutate its input", () => {
    const input = [
      { userId: "a", xp: 10 },
      { userId: "b", xp: 20 },
    ];
    rankEntries(input);
    expect(input.map((entry) => entry.userId)).toEqual(["a", "b"]);
  });
});
