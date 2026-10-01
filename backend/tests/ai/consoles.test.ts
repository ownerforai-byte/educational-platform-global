/**
 * Dedicated chat consoles (owner 2026-10-01):
 *   - "nepali"  → शुद्ध नेपाली console: EVERY reply in Nepali, scope NEB 11/12
 *                 नेपाली only (no other subject).
 *   - "grammar" → English grammar console: origin-first ladder, citations
 *                 extracted from attached sources, language dev + writing +
 *                 idea generation.
 *
 * The rule block must ride at the END of the system prompt (after every
 * generic rule), because it is what wins conflicts with reply-style rules
 * like "mirror the student's vocabulary".
 */
import { describe, expect, test } from "vitest";
import {
  appendConsoleRules,
  NEPALI_CONSOLE_RULES,
  GRAMMAR_CONSOLE_RULES,
} from "../../src/ai/prompts";

const BASE = "MASTER_ACADEMIC_PROMPT_BLOCK";

describe("appendConsoleRules", () => {
  test("nepali: block appended LAST, after the base context", () => {
    const out = appendConsoleRules(BASE, "nepali");
    expect(out.startsWith(BASE)).toBe(true);
    expect(out.endsWith(NEPALI_CONSOLE_RULES)).toBe(true);
    expect(out).toContain(`${BASE}\n\n${NEPALI_CONSOLE_RULES}`);
  });

  test("grammar: block appended LAST, after the base context", () => {
    const out = appendConsoleRules(BASE, "grammar");
    expect(out).toContain(`${BASE}\n\n${GRAMMAR_CONSOLE_RULES}`);
    expect(out.endsWith(GRAMMAR_CONSOLE_RULES)).toBe(true);
  });

  test("unknown or absent console id appends nothing", () => {
    expect(appendConsoleRules(BASE, "")).toBe(BASE);
    expect(appendConsoleRules(BASE, "physics")).toBe(BASE);
    expect(appendConsoleRules(BASE, "<script>")).toBe(BASE);
  });
});

describe("NEPALI_CONSOLE_RULES — pure Nepali law", () => {
  test("the language law is absolute and names its winner", () => {
    const t = NEPALI_CONSOLE_RULES.toLowerCase();
    expect(t).toContain("absolute language law");
    // The law must beat the generic mirror-the-student rules.
    expect(t).toContain("this law wins");
    // Reply is Nepali whatever the question's language.
    expect(t).toContain("whatever language the question arrives in");
  });

  test("scope pins NEB Class 11/12 नेपाली: व्याकरण, रचना, साहित्य", () => {
    expect(NEPALI_CONSOLE_RULES).toContain("NEB Class 11/12 नेपाली ONLY");
    expect(NEPALI_CONSOLE_RULES).toContain("व्याकरण");
    expect(NEPALI_CONSOLE_RULES).toContain("रचना");
    expect(NEPALI_CONSOLE_RULES).toContain("साहित्य");
    expect(NEPALI_CONSOLE_RULES).toContain("दक्षता");
  });
});

describe("GRAMMAR_CONSOLE_RULES — citations + origin ladder", () => {
  test("citation law: named sources at point of use, never invented", () => {
    const t = GRAMMAR_CONSOLE_RULES.toLowerCase();
    expect(t).toContain("citation law");
    expect(t).toContain("as extracted from a named source");
    expect(t).toContain("never invent a book");
    // Real source examples are named so the model cites by name.
    expect(GRAMMAR_CONSOLE_RULES).toContain("Quirk");
    expect(GRAMMAR_CONSOLE_RULES).toContain("Wren & Martin");
  });

  test("origin-first ladder runs word → phrase → clause → sentence … mastery", () => {
    const t = GRAMMAR_CONSOLE_RULES;
    for (const stop of [
      "word (letters",
      "phrase (all kinds)",
      "clause (all kinds)",
      "sentence (kinds & structure)",
      "MASTERY PLAN",
    ]) {
      expect(t).toContain(stop);
    }
  });

  test("language development, writing skills and idea generation are in scope", () => {
    const t = GRAMMAR_CONSOLE_RULES;
    expect(t).toContain("WRITING SKILL & IDEA GENERATION");
    expect(t).toContain("IDEA GENERATION");
    expect(t).toContain("vocabulary building");
    expect(t).toContain("self-editing checklist");
    // …and the console stays scoped to the language itself.
    expect(t).toContain("THE ENGLISH LANGUAGE ITSELF and nothing else");
  });
});
