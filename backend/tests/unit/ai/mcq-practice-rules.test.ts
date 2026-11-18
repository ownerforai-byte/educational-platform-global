import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MCQ_PRACTICE_RULES } from "../../../src/ai/mcq-practice-rules";
import { upgradeMessages } from "../../../src/ai/complete-answer";

/**
 * PRACTICE MCQ BLOCK contract (owner law 2026-11-18: Veer chat, workspace and
 * all classroom AI include at least 5 objective MCQs from PYQs (web-verified
 * PYQs + conceptual) with 4 options and answers in each reply — except the
 * community bot, which keeps its own reply contract).
 *
 * The block rides on BOTH answer paths: buildProfessorContext (first pass /
 * non-upgraded replies) and upgradeMessages (the rebuilt second pass that the
 * Math Solver and Deep Concept Studio also use).
 */

const aiRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../src/ai");

describe("MCQ_PRACTICE_RULES", () => {
  test("mandates at least 5 MCQs with 4 options and answers", () => {
    expect(MCQ_PRACTICE_RULES).toMatch(/AT LEAST 5 objective MCQs/i);
    expect(MCQ_PRACTICE_RULES).toMatch(/EXACTLY 4 options/i);
    expect(MCQ_PRACTICE_RULES).toMatch(/A\) B\) C\) D\)/);
    expect(MCQ_PRACTICE_RULES).toMatch(/\*\*Answer: <letter>\*\*/);
  });

  test("mixes web-verified PYQs with conceptual questions and forbids invented years", () => {
    expect(MCQ_PRACTICE_RULES).toMatch(/PYQ-style questions grounded in the attached VERIFIED NEB PAST QUESTIONS block/i);
    expect(MCQ_PRACTICE_RULES).toMatch(/\[REAL-TIME INTERNET SEARCH RESULTS\]/);
    expect(MCQ_PRACTICE_RULES).toMatch(/CONCEPTUAL/);
    expect(MCQ_PRACTICE_RULES).toMatch(/NEVER invent or guess a year/i);
  });

  test("applies to every tier and exempts identity, emotional, diagram and continuation turns", () => {
    expect(MCQ_PRACTICE_RULES).toMatch(/mandatory for EVERY tier/i);
    expect(MCQ_PRACTICE_RULES).toMatch(/verbatim identity sentence/i);
    expect(MCQ_PRACTICE_RULES).toMatch(/emotional \/ casual \/ romantic/i);
    expect(MCQ_PRACTICE_RULES).toMatch(/Diagram Hub/i);
  });

  test("orders the set as a level-up ladder with tagged rungs", () => {
    expect(MCQ_PRACTICE_RULES).toMatch(/LEVEL-UP LADDER/i);
    expect(MCQ_PRACTICE_RULES).toMatch(/\(Foundation\), \(Board level\), \(Trap\)/);
    expect(MCQ_PRACTICE_RULES).toMatch(/trap \/ higher-order questions/i);
  });

  test("explains PYQ answers option-wise — correct option and the tempting wrong one", () => {
    expect(MCQ_PRACTICE_RULES).toMatch(/BEST-EXPLAINED, OPTION-WISE/i);
    expect(MCQ_PRACTICE_RULES).toMatch(/WHY the correct option is correct/i);
    expect(MCQ_PRACTICE_RULES).toMatch(/WHY the strongest wrong option tempts and fails/i);
  });
});

describe("every Veer answer path carries the MCQ block", () => {
  test("buildProfessorContext appends it after the tier boundary", () => {
    const src = readFileSync(path.join(aiRoot, "prompts/academic.ts"), "utf8");
    expect(src).toContain("MCQ_PRACTICE_RULES");
    expect(src).toMatch(/parts\.push\(answerTierRules\(tier\)\);[\s\S]*?parts\.push\(MCQ_PRACTICE_RULES\);/);
  });

  test("upgradeMessages (chat second pass + math + deep-dive studios) includes it last", () => {
    const messages = upgradeMessages("Explain capacitors", "draft", "research");
    const system = messages.find((m) => m.role === "system");
    expect(system?.content).toContain("DEEP-CONCEPT ANSWER UPGRADE");
    expect(system?.content).toContain(MCQ_PRACTICE_RULES);
    expect(system?.content.lastIndexOf("[PRACTICE MCQs")).toBeGreaterThan(
      system?.content.indexOf("[VERIFIED ANSWER DEPTH") ?? -1,
    );
  });
});

describe("community bot stays excluded", () => {
  test("community-ai-reply never imports the MCQ rules", () => {
    const src = readFileSync(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../src/services/community-ai-reply.ts"),
      "utf8",
    );
    expect(src).not.toContain("MCQ_PRACTICE_RULES");
    expect(src).not.toContain("mcq-practice-rules");
  });
});
