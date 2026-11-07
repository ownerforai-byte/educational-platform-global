import { describe, expect, it } from "vitest";
import { MCQ_BANK, mcqCountBySubject } from "@/lib/practice/mcq-bank";
import { WRITING_BANK } from "@/lib/practice/writing-bank";
import { CONTRASTS, resolveContrasts } from "@/lib/practice/contrasts";
import { OPTION_IDS } from "@/lib/practice/types";

/**
 * The bank is hand-authored, so these are the invariants a hand edit can break:
 * a fifth option, a missing explanation, a duplicate id, or a contrast id that
 * silently resolves to nothing (which would render an empty review screen).
 */
describe("MCQ bank", () => {
  it("has unique question ids", () => {
    const ids = MCQ_BANK.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every question exactly four options labelled A–D", () => {
    for (const question of MCQ_BANK) {
      expect(question.options, question.id).toHaveLength(4);
      expect(question.options.map((o) => o.id), question.id).toEqual([...OPTION_IDS]);
      for (const option of question.options) {
        expect(option.text.trim().length, `${question.id}/${option.id}`).toBeGreaterThan(0);
      }
    }
  });

  it("marks a correct option that exists in the option set", () => {
    for (const question of MCQ_BANK) {
      expect(
        question.options.some((o) => o.id === question.correctId),
        question.id,
      ).toBe(true);
    }
  });

  it("explains every option, each explanation distinct and substantial", () => {
    for (const question of MCQ_BANK) {
      const texts = OPTION_IDS.map((id) => question.explanations[id]?.trim() ?? "");
      for (const [index, text] of texts.entries()) {
        // 40 characters is short enough for any plain sentence and long enough
        // to reject "No." or a copied option label.
        expect(text.length, `${question.id}/${OPTION_IDS[index]}`).toBeGreaterThan(40);
      }
      expect(new Set(texts).size, `${question.id} repeats an explanation`).toBe(4);
    }
  });

  it("states a one-line concept anchor for each question", () => {
    for (const question of MCQ_BANK) {
      expect(question.conceptAnchor.trim().length, question.id).toBeGreaterThan(20);
    }
  });

  it("only references registered contrast pairs", () => {
    for (const question of MCQ_BANK) {
      for (const id of question.contrasts ?? []) {
        expect(resolveContrasts([id]), `${question.id} → ${id}`).toHaveLength(1);
      }
    }
  });

  it("covers every subject the practice hub offers", () => {
    const counts = mcqCountBySubject();
    for (const subject of ["physics", "chemistry", "biology", "mathematics", "english", "nepali"]) {
      expect(counts[subject] ?? 0, subject).toBeGreaterThan(0);
    }
  });
});

describe("Writing bank", () => {
  it("has unique ids and a real model answer", () => {
    const ids = WRITING_BANK.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const question of WRITING_BANK) {
      expect(question.modelAnswer.trim().length, question.id).toBeGreaterThan(200);
      expect(question.marks, question.id).toBeGreaterThan(0);
    }
  });

  it("gives at least two marking points per question", () => {
    for (const question of WRITING_BANK) {
      expect(question.markingPoints.length, question.id).toBeGreaterThanOrEqual(2);
      for (const point of question.markingPoints) {
        expect(point.trim().length, question.id).toBeGreaterThan(0);
      }
    }
  });

  it("always ships at least one contrast pair so the review can compare", () => {
    for (const question of WRITING_BANK) {
      expect(question.contrasts.length, question.id).toBeGreaterThan(0);
      expect(resolveContrasts(question.contrasts).length, question.id).toBe(
        question.contrasts.length,
      );
    }
  });
});

describe("contrast registry", () => {
  it("has unique ids and both sides of every pair described", () => {
    const ids = CONTRASTS.map((pair) => pair.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const pair of CONTRASTS) {
      expect(pair.a.trim(), pair.id).toBeTruthy();
      expect(pair.b.trim(), pair.id).toBeTruthy();
      expect(pair.aIs.length, pair.id).toBeGreaterThan(20);
      expect(pair.bIs.length, pair.id).toBeGreaterThan(20);
      expect(pair.difference.length, pair.id).toBeGreaterThan(40);
    }
  });
});
