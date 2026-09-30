import { describe, expect, it } from "vitest";

import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";

/**
 * The client-side mirror of the backend's academic contract.
 *
 * The consoles at /chat and /ai build their own system message from this file,
 * so a rule added in the backend must be mirrored here or those surfaces drift
 * and start answering shallow again. These assertions pin the owner's two
 * passes of 2026-09-30: the deep-answer contract (scan first, keywords under
 * each idea, output over raw code) and the follow-up — roots → ideas →
 * concepts, paste-the-verified-knowledge-with-a-light-polish, graded coverage,
 * and real images inside the reply.
 */
describe("PLATFORM_SYSTEM_PROMPT — the client mirror of the academic contract", () => {
  it("mirrors the deep-answer grounding layer", () => {
    for (const clause of [
      "GROUNDING — SCAN FIRST, THEN ANSWER",
      "SHAPE OF AN ACADEMIC REPLY",
      "**Key words:**",
      "OUTPUT, NOT RAW CODE",
      "CLASS SCOPE — STRICTLY NEB CLASS 11 AND CLASS 12",
      "SOURCE HIERARCHY",
    ]) {
      expect(PLATFORM_SYSTEM_PROMPT, `missing clause: ${clause}`).toContain(clause);
    }
  });

  it("requires the concept walk: roots → ideas → concepts, whole surface", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("ROOTS → IDEAS → CONCEPTS");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("Root first");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("Cover the WHOLE surface");
    // Existing house rule that the walk must not contradict.
    expect(PLATFORM_SYSTEM_PROMPT).toContain("CONCEPTUAL ORDER");
  });

  it("allows verified knowledge to be pasted with a light grammar polish", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("PASTE THE VERIFIED KNOWLEDGE, POLISH THE GRAMMAR");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("only LIGHT polish for grammar");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("Never shorten a source to save space");
  });

  it("grades coverage and forbids faking it", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("COVERAGE IS GRADED, NEVER FAKED");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("STRONG means the platform's own records really teach this concept");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("never dress a passing mention up as the syllabus treatment");
  });

  it("lets the tutor embed real images and never invent one", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("IMAGES IN THE REPLY");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("![short description of what is visible](url)");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("Never invent, guess");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("give the diagram in words");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("a real image only when a genuine, verifiable URL is in front of you");
  });

  it("no longer caps a complete answer at three sources", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("use every source attached to the message");
    expect(PLATFORM_SYSTEM_PROMPT).not.toContain("AT MOST 3");
    expect(PLATFORM_SYSTEM_PROMPT).not.toContain("never more than three");
  });
});
