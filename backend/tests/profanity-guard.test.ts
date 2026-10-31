import { describe, expect, test } from "vitest";

import {
  detectRoughInput,
  ROUGH_REDFLAG_REPLY,
  ROUGH_INPUT_RULE,
} from "../src/ai/profanity-guard";

/**
 * Contract suite for the ROUGH-INPUT GUARD (owner request 2026-10-31: "train
 * the outside AI for rough questions like 'fuck you' → polite academic redirect).
 *
 * Pins:
 *   1. profane input fires the redirect;
 *   2. direct hostility aimed at Veer/owner fires it;
 *   3. ordinary academic / self-deprecation / emotional input does NOT fire it
 *      (the warm mode must keep answering those);
 *   4. the owner's reply line is the single source of truth and is referenced
 *      by the prompt-layer rule.
 */

describe("ROUGH_REDFLAG_REPLY", () => {
  test("is the academic boundary redirect line", () => {
    expect(ROUGH_REDFLAG_REPLY).toBe(
      "I am Veer, your academic study tutor. Let's keep our conversation focused on your coursework, syllabus topics, and exams. How can I help you with your studies today?",
    );
  });

  test("the prompt-layer rule routes abuse to that same line", () => {
    expect(ROUGH_INPUT_RULE).toContain(ROUGH_REDFLAG_REPLY);
  });
});

describe("detectRoughInput — fires on abuse", () => {
  test("the flagship 'fuck you' case", () => {
    const v = detectRoughInput("fuck you");
    expect(v.hit).toBe(true);
    expect(v.kind).toBe("profanity");
    expect(v.match).toBe("fuck");
  });

  test("case-insensitive and with surrounding text", () => {
    expect(detectRoughInput("FUCK YOU!!!").hit).toBe(true);
    expect(detectRoughInput("what the fuck are you even").hit).toBe(true);
    expect(detectRoughInput("you fucking idiot").hit).toBe(true);
  });

  test("slurs and other expletives", () => {
    expect(detectRoughInput("you're a bastard").hit).toBe(true);
    expect(detectRoughInput("shut up").hit).toBe(true);
    expect(detectRoughInput("i hate you").hit).toBe(true);
    expect(detectRoughInput("you are stupid, go to hell").hit).toBe(true);
  });

  test("direct hostility phrases are classified as hostility", () => {
    expect(detectRoughInput("shut up").kind).toBe("hostility");
    expect(detectRoughInput("go to hell").kind).toBe("hostility");
  });
});

describe("detectRoughInput — does NOT false-fire", () => {
  test("empty / blank input is clean", () => {
    expect(detectRoughInput("").hit).toBe(false);
    expect(detectRoughInput("   ").hit).toBe(false);
  });

  test("normal academic questions pass", () => {
    const qs = [
      "explain the photoelectric effect in physics",
      "derive the quadratic formula for ax^2 + bx + c",
      "what is the cell theory of biology?",
      "solve this math problem: 2x + 3 = 11",
      "why does the moon have phases?",
    ];
    for (const q of qs) expect(detectRoughInput(q).hit, q).toBe(false);
  });

  test("'ass' / 'fag' / 'shit' inside academic words does not fire", () => {
    // Whole-word boundary: these substrings are safe.
    expect(detectRoughInput("class action and mass assumption").hit).toBe(false);
    expect(detectRoughInput("the retarding force on the object").hit).toBe(false);
  });

  test("self-deprecation and frustration are the warm mode, not abuse", () => {
    const gentle = [
      "I feel so stupid, I can't understand this chapter",
      "I'm so tired and dumb today, help me revise",
      "this topic is really hard for me, please explain slower",
      "I hate this exam, I'm so anxious about it",
    ];
    // "i hate this exam" is self-directed (the exam), not aimed at Veer/owner.
    for (const g of gentle) expect(detectRoughInput(g).hit, g).toBe(false);
  });
});
