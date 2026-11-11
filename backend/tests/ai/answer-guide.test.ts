import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";
import { ANSWER_GUIDE_RULES } from "../../src/ai/answer-guide";
import { MASTER_ACADEMIC_PROMPT } from "../../src/ai/prompts";

/**
 * ANSWER GUIDE contract (owner law 2026-10-27: "make all ai follow answers
 * guide on web while giving any solution — valid by human, natural and
 * full of idea").
 *
 * The guide is defined once and must ride on EVERY AI surface: the chat
 * master prompt (all chat consoles + subject classrooms, via
 * buildProfessorContext), the math studio, deep-dive, quiz generation and
 * quiz grading. The specialized routes build their own prompts, so their
 * wiring is pinned source-contract style (same approach as
 * ai-evaluate.test.ts).
 */

const read = (p: string) =>
  readFileSync(new URL(`../../src/api/${p}`, import.meta.url), "utf8");

describe("ANSWER_GUIDE_RULES", () => {
  test("states the three laws", () => {
    expect(ANSWER_GUIDE_RULES).toMatch(/VALID BY A HUMAN\./i);
    expect(ANSWER_GUIDE_RULES).toMatch(/NATURAL\./i);
    expect(ANSWER_GUIDE_RULES).toMatch(/FULL OF IDEA\./i);
    expect(ANSWER_GUIDE_RULES).toMatch(/every mode/i);
  });
});

describe("every AI surface carries the guide", () => {
  test("the chat master prompt (all consoles + classrooms)", () => {
    expect(MASTER_ACADEMIC_PROMPT).toContain(ANSWER_GUIDE_RULES);
  });

  test("the math studio", () => {
    const src = read("ai-math.ts");
    expect(src).toContain("ANSWER_GUIDE_RULES");
    expect(src).toMatch(/content: `\$\{MATH_SOLVER_SYSTEM_PROMPT\}\\n\\n\$\{ANSWER_GUIDE_RULES\}`/);
  });

  test("deep-dive", () => {
    const src = read("ai-deep-dive.ts");
    expect(src).toContain("ANSWER_GUIDE_RULES");
    expect(src).toMatch(/content: `\$\{DEEP_DIVE_SYSTEM_PROMPT\}\\n\\n\$\{ANSWER_GUIDE_RULES\}`/);
  });

  // Owner 2026-11-10: tier-bound answer depth appends `answerTierRules(...)`
  // after the guide. The guide must still be INTERPOLATED into the prompt (not
  // merely imported), so pin the interpolation and allow the optional suffix.
  test("quiz generation (every format)", () => {
    const src = read("ai-generate.ts");
    expect(src).toContain("ANSWER_GUIDE_RULES");
    expect(src).toMatch(/\$\{ANSWER_GUIDE_RULES\}(?:\\n\\n\$\{answerTierRules\([\s\S]*?\)\})?`/);
  });

  test("quiz grading", () => {
    const src = read("ai-evaluate.ts");
    expect(src).toMatch(/\$\{ANSWER_GUIDE_RULES\}(?:\\n\\n\$\{answerTierRules\([\s\S]*?\)\})?`;/);
  });
});