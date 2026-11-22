import { describe, expect, it } from "vitest";
import { DERIVATIONS_AND_THEOREMS } from "@/lib/derivations-data";

/**
 * Wave 3 merged solved problems: every grade-11 derivation of the three
 * formula-sheet subjects must now carry at least one board-style solved
 * problem, and every problem must have the fields the derivation detail
 * view renders (question, given, steps, final answer).
 */
const FORMULA_SUBJECTS = ["physics", "mathematics", "chemistry"] as const;

describe("wave 3 merged solved problems", () => {
  const grade11 = DERIVATIONS_AND_THEOREMS.filter(
    (d) => d.gradeTrack === "grade-11" && !d.isExtra && FORMULA_SUBJECTS.includes(d.subject as (typeof FORMULA_SUBJECTS)[number]),
  );

  it("gives every grade-11 physics/math/chemistry derivation at least one solved problem", () => {
    const missing = grade11.filter((d) => (d.solvedProblems ?? []).length === 0);
    expect(
      missing.map((d) => `${d.subject}/${d.slug}`),
      "these derivations still have no solved problems",
    ).toEqual([]);
  });

  it("keeps every solved problem structurally complete", () => {
    for (const derivation of grade11) {
      for (const problem of derivation.solvedProblems ?? []) {
        expect(problem.id, `${derivation.slug}: id`).toBeTruthy();
        expect(problem.question.trim().length, `${derivation.slug}: question`).toBeGreaterThan(10);
        expect(problem.given.trim().length, `${derivation.slug}: given`).toBeGreaterThan(3);
        expect(
          problem.stepByStep.length,
          `${derivation.slug}: stepByStep non-empty`,
        ).toBeGreaterThan(0);
        expect(problem.finalAnswer.trim().length, `${derivation.slug}: finalAnswer`).toBeGreaterThan(0);
      }
    }
  });

  it("does not duplicate solved-problem ids across the bank", () => {
    const ids = DERIVATIONS_AND_THEOREMS.flatMap((d) => (d.solvedProblems ?? []).map((p) => p.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});
