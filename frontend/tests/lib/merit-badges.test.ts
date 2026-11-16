import { describe, expect, it } from "vitest";
import { evaluateEarnedBadgeIds, buildEarnedBadgeContext } from "@/features/badges/evaluate-earned-badges";
import { MERIT_XP_BAND } from "@/features/merit-badges/merit-badges";

describe("evaluateEarnedBadgeIds", () => {
  it("unlocks leaderboard #1 only at rank 1", () => {
    const top = buildEarnedBadgeContext({
      quizRows: [{ id: "a", title: "", classSlug: null, subjectSlug: null, topic: null, difficulty: null, answered: 10, correct: 9, scorePct: 90, createdat: "" }],
      rank: 1,
    });
    expect(evaluateEarnedBadgeIds(top)).toContain("leaderboard-1");
    const second = { ...top, rank: 2 };
    expect(evaluateEarnedBadgeIds(second)).not.toContain("leaderboard-1");
  });

  it("steps milestone badges by XP bands", () => {
    const ctx = buildEarnedBadgeContext({
      quizRows: Array.from({ length: 14 }, (_, i) => ({
        id: String(i),
        title: "",
        classSlug: null,
        subjectSlug: null,
        topic: null,
        difficulty: null,
        answered: 5,
        correct: 5,
        scorePct: 100,
        format: "mcq" as const,
        createdat: "",
      })),
      rank: null,
      topicsCompleted: 1,
    });
    const ids = evaluateEarnedBadgeIds(ctx);
    expect(ids).toContain("first-quiz");
    expect(ctx.xp).toBeGreaterThanOrEqual(MERIT_XP_BAND);
    expect(ids).toContain("beginner");
    if (ctx.xp >= MERIT_XP_BAND * 2) expect(ids).toContain("intermediate");
  });
});