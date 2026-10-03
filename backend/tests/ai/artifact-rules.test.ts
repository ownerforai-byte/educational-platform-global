import { describe, expect, test } from "vitest";
import { ARTIFACT_RULES } from "../../src/ai/artifact-rules";
import { DEEP_ANSWER_RULES } from "../../src/ai/deep-answer";
import { CLASS_SCOPE_RULES } from "../../src/ai/class-scope";
import { MASTER_ACADEMIC_PROMPT } from "../../src/ai/prompts";

/**
 * The owner's complaint of 2026-10-03: "the ai is capable to write code in chat
 * but not to present them, why he haste and just give a little information".
 * The cause was in the prompt itself — the platform told the tutor it could not
 * run code and pushed any code into a short aside. These assertions pin the new
 * law (the tutor writes a run fence, the panel runs it on screen, and it is
 * never rushed) and the retirement of the suppression clause.
 */
describe("the on-screen artefact law", () => {
  test("grants the capability the prompt used to deny", () => {
    for (const clause of [
      "THE PLATFORM RUNS YOUR CODE",
      "whose language is run",
      "LIVE, RESPONSIVE widget",
      "USE IT WHEN",
      "asks for code, an app, a demo",
    ]) {
      expect(ARTIFACT_RULES, `missing clause: ${clause}`).toContain(clause);
    }
    // The old self-denial must not survive in the answer contract.
    expect(DEEP_ANSWER_RULES).toContain("THE ONE EXCEPTION IS THE run FENCE");
    expect(DEEP_ANSWER_RULES).toContain("it is a working object the student can use");
  });

  test("forbids hurrying or abbreviating the code", () => {
    for (const clause of [
      "NEVER RUSH IT",
      "never leave a placeholder",
      "never a TODO",
      "The stream keeps typing for as long as you need",
      "a real simulation legitimately runs to a couple of hundred lines",
      "The word floor counts the PROSE around the artefact, not the code inside it",
    ]) {
      expect(ARTIFACT_RULES, `missing anti-haste clause: ${clause}`).toContain(clause);
    }
  });

  test("requires a self-contained, responsive, honest document", () => {
    for (const clause of [
      "closing html tag on the very last line",
      "Inline style element and inline script element only",
      "no fetch, no XMLHttpRequest",
      "viewport meta",
      "controls reachable at 360 pixels wide",
      "the syllabus relation you taught",
      "At most TWO artefacts per reply",
    ]) {
      expect(ARTIFACT_RULES, `missing shape clause: ${clause}`).toContain(clause);
    }
  });

  test("rides the master prompt after the answer contract and before class scope", () => {
    expect(MASTER_ACADEMIC_PROMPT).toContain(ARTIFACT_RULES);
    expect(MASTER_ACADEMIC_PROMPT.indexOf(DEEP_ANSWER_RULES)).toBeLessThan(
      MASTER_ACADEMIC_PROMPT.indexOf(ARTIFACT_RULES),
    );
    expect(MASTER_ACADEMIC_PROMPT.indexOf(ARTIFACT_RULES)).toBeLessThan(
      MASTER_ACADEMIC_PROMPT.indexOf(CLASS_SCOPE_RULES),
    );
  });

  test("stays clean for the prompt-contract gates", () => {
    // The composition test forbids any backtick in the master prompt, so the
    // fence language has to be named in words here.
    expect(ARTIFACT_RULES).not.toContain("`");
    expect(ARTIFACT_RULES).not.toContain("${");
  });
});
