import { describe, expect, test, vi, beforeEach } from "vitest";

import {
  GO_DEEPER_INSTRUCTION,
  KEEP_IT_SHORT_INSTRUCTION,
  PHOTO_ONLY_PROMPT,
  QUIZ_SEED_KEY,
  SUMMARIZE_INSTRUCTION,
  writeQuizSeed,
} from "@/lib/ai/chat-actions";

/**
 * Contract suite for the shared chat quick-action wording used by BOTH the
 * floating widget and the /chat tutor console. The two surfaces must always
 * send the same instructions — a drift here is invisible until students notice
 * one surface behaving differently, so the text is pinned.
 *
 * The 150-word floor is a platform rule (backend/src/ai/syllabus-anchor.ts), so
 * the "keep it short" instruction must never ask for a reply that breaks it.
 */

describe("quick-action instructions", () => {
  test("each action carries a real, specific instruction", () => {
    for (const text of [
      GO_DEEPER_INSTRUCTION,
      KEEP_IT_SHORT_INSTRUCTION,
      SUMMARIZE_INSTRUCTION,
      PHOTO_ONLY_PROMPT,
    ]) {
      expect(text.trim().length).toBeGreaterThan(40);
    }
  });

  test("deeper asks for working + example, shorter asks for compression", () => {
    expect(GO_DEEPER_INSTRUCTION.toLowerCase()).toContain("step-by-step");
    expect(GO_DEEPER_INSTRUCTION.toLowerCase()).toContain("example");
    expect(KEEP_IT_SHORT_INSTRUCTION.toLowerCase()).toContain("short");
  });

  test("never asks for a reply below the 150-word floor", () => {
    // "Keep it short" must stay compatible with the enforced 150-word minimum.
    expect(KEEP_IT_SHORT_INSTRUCTION).toMatch(/\b\d{3}\b/);
    expect(KEEP_IT_SHORT_INSTRUCTION).not.toMatch(/\b(half as long|one line only|brief)\b/i);
  });

  test("photo-only prompt tells the model to read the image first", () => {
    expect(PHOTO_ONLY_PROMPT.toLowerCase()).toContain("photo");
    expect(PHOTO_ONLY_PROMPT.toLowerCase()).toContain("teach");
  });
});

describe("writeQuizSeed", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("persists the subject + topic seed for the quiz handoff", () => {
    writeQuizSeed({ subjectSlug: "physics", topic: "Lens maker's formula" });
    const raw = sessionStorage.getItem(QUIZ_SEED_KEY);
    expect(raw).toBeTruthy();
    expect(JSON.parse(String(raw))).toEqual({
      subjectSlug: "physics",
      topic: "Lens maker's formula",
    });
  });

  test("storage failures never break the handoff", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() => writeQuizSeed({ topic: "x" })).not.toThrow();
    spy.mockRestore();
  });
});
