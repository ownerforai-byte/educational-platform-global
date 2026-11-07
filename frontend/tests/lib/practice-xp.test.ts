import { describe, expect, it } from "vitest";
import { xpForSet, xpForSets, xpLevel, setAccuracy, isWritingFormat } from "@/lib/practice/xp";

/**
 * Worked examples of the published XP rule. The backend mirror
 * (`backend/src/utils/xp.ts`) is pinned to the SAME numbers — if the two ever
 * disagree, one of these tables fails instead of the leaderboard ranking
 * students on a formula the UI does not describe.
 */
describe("xpForSet — choice sets", () => {
  it("pays 10 per correct answer, 2 per wrong attempt, plus the accuracy bonus", () => {
    // 5 questions, all correct → 50 + 25 bonus (100 %).
    expect(xpForSet({ answered: 5, correct: 5, scorePct: 100, format: "mcq" })).toBe(75);
    // 5 questions, 3 correct (60 %) → 30 + 4 + 15 bonus.
    expect(xpForSet({ answered: 5, correct: 3, scorePct: 60, format: "mcq" })).toBe(49);
    // 10 questions, 4 correct (40 %) → 40 + 12 + 5 bonus.
    expect(xpForSet({ answered: 10, correct: 4, scorePct: 40, format: "mcq" })).toBe(57);
    // Nothing correct still earns effort XP, and no bonus below 40 %.
    expect(xpForSet({ answered: 4, correct: 0, scorePct: 0, format: "mcq" })).toBe(8);
  });

  it("derives the score from the counts when scorePct is absent", () => {
    // 4 answered, 2 correct → 50 % → 20 + 4 + 5.
    expect(xpForSet({ answered: 4, correct: 2, scorePct: null, format: "true-false" })).toBe(29);
  });

  it("earns nothing for an untouched set", () => {
    expect(xpForSet({ answered: 0, correct: 0, scorePct: 0, format: "mcq" })).toBe(0);
  });
});

describe("xpForSet — writing sets", () => {
  it("scales 40 XP per question by the self-marked score", () => {
    // 3 questions at full marks → 120 + 25 bonus.
    expect(xpForSet({ answered: 3, correct: 3, scorePct: 100, format: "long-answer" })).toBe(145);
    // 2 questions at 60 % → 48 + 15 bonus.
    expect(xpForSet({ answered: 2, correct: 1, scorePct: 60, format: "short-answer" })).toBe(63);
  });

  it("halves the base below 50 %, so a guessed submission cannot out-earn honest work", () => {
    // 2 questions at 40 % → 32 halved = 16, + 5 bonus.
    expect(xpForSet({ answered: 2, correct: 1, scorePct: 40, format: "long-answer" })).toBe(21);
  });
});

describe("helpers", () => {
  it("classifies writing formats only", () => {
    expect(isWritingFormat("long-answer")).toBe(true);
    expect(isWritingFormat("short-answer")).toBe(true);
    expect(isWritingFormat("mcq")).toBe(false);
    expect(isWritingFormat("fill-blank")).toBe(false);
    expect(isWritingFormat(null)).toBe(false);
  });

  it("clamps accuracy to 0–100 and prefers the stored score", () => {
    expect(setAccuracy({ answered: 10, correct: 10, scorePct: null })).toBe(100);
    expect(setAccuracy({ answered: 4, correct: 1, scorePct: null })).toBe(25);
    expect(setAccuracy({ answered: 4, correct: 1, scorePct: 140 })).toBe(100);
    expect(setAccuracy({ answered: 0, correct: 0, scorePct: 90 })).toBe(0);
  });

  it("sums sets and reports level bands", () => {
    expect(
      xpForSets([
        { answered: 5, correct: 5, scorePct: 100, format: "mcq" },
        { answered: 5, correct: 5, scorePct: 100, format: "mcq" },
      ]),
    ).toBe(150);

    expect(xpLevel(0)).toMatchObject({ level: 1, title: "Starter", nextAt: 250 });
    expect(xpLevel(250)).toMatchObject({ level: 2, title: "Learner" });
    expect(xpLevel(999999)).toMatchObject({ level: 6, title: "Top Scholar", nextAt: 0 });
  });
});
