import { describe, expect, test } from "vitest";
import { COMPLETE_REVEAL_RULES } from "../../../src/ai/complete-reveal";
import { MASTER_ACADEMIC_PROMPT } from "../../../src/ai/prompts";

describe("complete reveal rules", () => {
  test("ride on the master prompt", () => {
    expect(MASTER_ACADEMIC_PROMPT).toContain(COMPLETE_REVEAL_RULES);
  });

  test("demand a full answer with no teaser", () => {
    expect(COMPLETE_REVEAL_RULES).toMatch(/never tease/i);
    expect(COMPLETE_REVEAL_RULES).toMatch(/NO HIDING/);
  });

  test("require related topics, a contrast table and simple meanings", () => {
    expect(COMPLETE_REVEAL_RULES).toMatch(/RELATED TOPICS/);
    expect(COMPLETE_REVEAL_RULES).toMatch(/markdown table/);
    expect(COMPLETE_REVEAL_RULES).toMatch(/SIMPLE MEANINGS/);
  });

  test("keeps the identity reply exempt", () => {
    expect(COMPLETE_REVEAL_RULES).toMatch(/identity reply/);
  });
});
