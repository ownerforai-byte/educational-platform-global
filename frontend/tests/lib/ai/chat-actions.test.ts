import { describe, expect, test, vi, beforeEach } from "vitest";

import {
  GO_DEEPER_INSTRUCTION,
  KEEP_IT_SHORT_INSTRUCTION,
  PHOTO_ONLY_PROMPT,
  QUIZ_SEED_KEY,
  SUMMARIZE_INSTRUCTION,
  writeQuizSeed,
  isBriefChatMessage,
} from "@/lib/ai/chat-actions";

/**
 * Contract suite for the shared chat quick-action wording used by BOTH the
 * floating widget and the /chat tutor console. The two surfaces must always
 * send the same instructions — a drift here is invisible until students notice
 * one surface behaving differently, so the text is pinned.
 *
 * The follow-up wording and brief-answer copy visibility stay consistent across
 * both the floating chat and the tutor console.
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

  test("shorter asks for a concise answer without imposing a fixed minimum", () => {
    expect(KEEP_IT_SHORT_INSTRUCTION).toContain("shortest form");
    expect(KEEP_IT_SHORT_INSTRUCTION).not.toMatch(/\b\d{3}\b/);
  });

  test("identifies short conversational text for hiding the copy button", () => {
    expect(isBriefChatMessage("I'm Veer, your study mentor.")).toBe(true);
    expect(isBriefChatMessage("Thanks!")).toBe(true);
    expect(isBriefChatMessage("**Hello!**")).toBe(true);
    expect(isBriefChatMessage("**Kinetic energy** is energy of motion.")).toBe(false);
    expect(isBriefChatMessage("A complete lesson with a worked example.\n\n- First point\n- Second point")).toBe(false);
    expect(isBriefChatMessage("A long answer. ".repeat(20))).toBe(false);
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
