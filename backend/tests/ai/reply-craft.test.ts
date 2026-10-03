import { describe, expect, test } from "vitest";
import { REPLY_CRAFT_RULES } from "../../src/ai/reply-craft";
import {
  MASTER_ACADEMIC_PROMPT,
  PROFESSOR_STYLE_RULES,
} from "../../src/ai/prompts";
import { ARTIFACT_RULES } from "../../src/ai/artifact-rules";
import { CLASS_SCOPE_RULES } from "../../src/ai/class-scope";
import { DEEP_ANSWER_RULES } from "../../src/ai/deep-answer";
import { SOURCE_REGISTRY_RULES } from "../../src/ai/source-registry";

describe("reply craft — the ChatGPT/Claude-grade layer", () => {
  test("reaches the model as its own layer in the master prompt", () => {
    expect(MASTER_ACADEMIC_PROMPT).toContain(REPLY_CRAFT_RULES);
    // Owner request 2026-10-03: "improve ai — like it replies like ChatGPT,
    // Claude". The capability layers must stay binding (deep answer, artefact),
    // and the craft layer sits between them and the scope/source guards.
    const order = [
      PROFESSOR_STYLE_RULES,
      DEEP_ANSWER_RULES,
      ARTIFACT_RULES,
      REPLY_CRAFT_RULES,
      CLASS_SCOPE_RULES,
      SOURCE_REGISTRY_RULES,
    ];
    let cursor = -1;
    for (const layer of order) {
      const at = MASTER_ACADEMIC_PROMPT.indexOf(layer);
      expect(at, `layer missing or out of order: ${layer.slice(0, 40)}…`).toBeGreaterThan(cursor);
      cursor = at;
    }
  });

  test("pins the direct-answer-first craft", () => {
    // The answer must land in the first lines, the way ChatGPT and Claude land
    // it — depth unfolds AFTER the verdict, never before it.
    expect(REPLY_CRAFT_RULES).toContain("DIRECT ANSWER FIRST, DEPTH IMMEDIATELY AFTER");
    expect(REPLY_CRAFT_RULES).toContain("ALREADY CONTAIN the answer");
    expect(REPLY_CRAFT_RULES).toContain("Never bury the answer behind a build-up");
  });

  test("allows meaningful headings for long replies while keeping the ban on mechanical ones", () => {
    expect(REPLY_CRAFT_RULES).toContain("HEADINGS THAT CARRY MEANING");
    expect(REPLY_CRAFT_RULES).toContain("SHORT, MEANINGFUL headings");
    expect(REPLY_CRAFT_RULES).toContain("never a mechanical label");
    expect(REPLY_CRAFT_RULES).toContain("never printed as headings");
    // The older professor rule and the craft rule must read as one law: the
    // numbered template is the thinking order, meaningful headings are the
    // print form, mechanical labels are still dead.
    expect(PROFESSOR_STYLE_RULES).toContain("Never print mechanical headings");
  });

  test("pins rich formatting, worked examples and the analogy-before-term rule", () => {
    expect(REPLY_CRAFT_RULES).toContain("RICH FORMATTING BY MEANING");
    expect(REPLY_CRAFT_RULES).toContain("EVERY RULE LANDS IN A WORKED EXAMPLE");
    expect(REPLY_CRAFT_RULES).toContain("THE ANALOGY PRECEDES THE TERM");
    expect(REPLY_CRAFT_RULES).toContain("no wall of text");
  });

  test("pins the self-check and the finished close (no cliffhangers)", () => {
    expect(REPLY_CRAFT_RULES).toContain("SELF-CHECK BEFORE SENDING");
    expect(REPLY_CRAFT_RULES).toContain("CLOSE WITH THE NEXT MOVE");
    expect(REPLY_CRAFT_RULES).toContain("NO CLIFFHANGERS");
    expect(REPLY_CRAFT_RULES).toContain("never an amputation");
  });

  test("carries no template artefacts and keeps the master prompt a sane size", () => {
    expect(REPLY_CRAFT_RULES).not.toContain("${");
    expect(REPLY_CRAFT_RULES).not.toContain("`");
    expect(MASTER_ACADEMIC_PROMPT.length).toBeLessThan(60_000);
  });
});
