import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildDiagramKnowledge,
  cleanKnowledgeValue,
  DIAGRAM_KNOWLEDGE_FIELDS,
  DIAGRAM_KNOWLEDGE_MARKER,
  formatDiagramKnowledgeBlock,
  parseDiagramKnowledge,
  relationsCoverBothKinds,
} from "../../../src/ai/media/diagram-knowledge";

/**
 * Owner 2026-11-12: "the agent should make the information for those
 * interfaces ... in each diagram creation (mentioning related, relations and
 * contrasts) according to questions ... make the diagram agent capable to this".
 *
 * These tests pin the REASONING PASS that creates that information. It must be
 * driven by the actual question, must produce relations as a distinct field,
 * must regenerate per request, and must never block the drawing when it fails.
 */

const BRIEF = [
  "FOCUS: Pressure-driven filling of the left atrium",
  "ENTITIES: Left atrium, Mitral valve, Left ventricle, Pulmonary vein, Atrial pressure",
  "RELATED: Preload because it sets end-diastolic volume; Compliance because the atrial wall stretches; Frank-Starling law because filling sets stroke volume",
  "RELATIONS: Multiplicative: atrial pressure scales with venous inflow because more volume raises wall tension; Inverse: filling rate falls as ventricular pressure rises because the gradient shrinks; Atrial pressure drives mitral opening because the gradient exceeds ventricular pressure in mmHg",
  "CONTRASTS: Atrium vs Ventricle — atria receive blood while ventricles eject it; Systole vs Diastole — contraction raises pressure while relaxation lowers it",
  "MECHANISM: During diastole the mitral valve is open and left atrial pressure stays near 8-12 mmHg. Blood moves down the gradient until the two pressures equalise.",
  "EXAM: Do not confuse atrial systole with ventricular systole; the atrial kick adds only the final fraction of filling.",
].join("\n");

beforeEach(() => {
  // Failure paths deliberately log a warning so production operators can see a
  // degraded knowledge pass; keep the suite output quiet.
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("diagram knowledge contract", () => {
  it("treats RELATIONS as a first-class field, separate from RELATED", () => {
    expect(DIAGRAM_KNOWLEDGE_FIELDS).toEqual([
      "FOCUS",
      "ENTITIES",
      "RELATED",
      "RELATIONS",
      "CONTRASTS",
      "MECHANISM",
      "EXAM",
    ]);
  });

  it("parses all seven generated lines", () => {
    const brief = parseDiagramKnowledge(BRIEF);
    expect(brief).not.toBeNull();
    expect(brief!.FOCUS).toContain("left atrium");
    expect(brief!.ENTITIES).toContain("Mitral valve");
    expect(brief!.RELATED).toContain("Frank-Starling");
    expect(brief!.RELATIONS).toContain("drives mitral opening");
    expect(brief!.CONTRASTS).toContain("Systole vs Diastole");
    expect(brief!.MECHANISM).toContain("8-12 mmHg");
    expect(brief!.EXAM).toContain("atrial systole");
    expect(brief!.raw).toBe(BRIEF);
  });

  it("tolerates markdown fences, bullets and bold labels", () => {
    const fenced = `\`\`\`\n- **FOCUS**: Left atrium filling\n* RELATED: Preload; Compliance\n1. RELATIONS: Gradient drives flow because J is proportional to dP\n- CONTRASTS: Atrium vs Ventricle — receive vs eject\n\`\`\``;
    const brief = parseDiagramKnowledge(fenced);
    expect(brief).not.toBeNull();
    expect(brief!.FOCUS).toBe("Left atrium filling");
    expect(brief!.RELATIONS).toContain("dP");
  });

  it("rejects a brief that has no RELATIONS — the owner's new requirement", () => {
    expect(
      parseDiagramKnowledge(
        "FOCUS: Diffusion\nRELATED: Osmosis; Active transport\nCONTRASTS: Passive vs Active — no ATP vs ATP",
      ),
    ).toBeNull();
    expect(parseDiagramKnowledge("a generic essay about science")).toBeNull();
    expect(parseDiagramKnowledge("")).toBeNull();
  });

  it("requires relations to cover both multiplicative and inverse kinds", () => {
    expect(
      relationsCoverBothKinds(
        "Multiplicative: flux scales with gradient because J = -D dC/dx; Inverse: concentration difference falls as mixing proceeds",
      ),
    ).toBe(true);
    expect(relationsCoverBothKinds("Gradient drives flux because J = -D dC/dx")).toBe(false);
  });
});

describe("cleanKnowledgeValue", () => {
  it("removes characters that would break a one-line dot <title>", () => {
    expect(cleanKnowledgeValue("  A | B < C > D & E  ")).toBe("A B C D and E");
    expect(cleanKnowledgeValue("line one\nline two")).toBe("line one line two");
    expect(cleanKnowledgeValue("```fenced```")).toBe("fenced");
  });
});

describe("formatDiagramKnowledgeBlock", () => {
  it("marks the block as freshly generated and carries every field", () => {
    const brief = parseDiagramKnowledge(BRIEF)!;
    const block = formatDiagramKnowledgeBlock(brief);
    expect(block).toContain(DIAGRAM_KNOWLEDGE_MARKER);
    expect(block).toContain("SOURCE OF TRUTH");
    expect(block).toContain("EVERY diagram creation");
    expect(block).toContain("PER-DOT LAW");
    expect(block).toContain("Multiplicative:");
    expect(block).toContain("Inverse:");
    for (const field of DIAGRAM_KNOWLEDGE_FIELDS) {
      expect(block).toContain(`${field}:`);
    }
    expect(block).toContain("RELATIONS: Multiplicative:");
    expect(block).toContain("[END OF DIAGRAM KNOWLEDGE BRIEF]");
    expect(block).not.toContain("undefined");
  });
});

describe("buildDiagramKnowledge", () => {
  const QUESTION = "Draw the labelled human heart showing atrial filling";

  it("derives the brief from THIS question with subject, thread and freshness", async () => {
    let captured: Array<{ role: string; content: string }> = [];
    const chat = vi.fn(async (messages: Array<{ role: string; content: string }>) => {
      captured = messages;
      return BRIEF;
    });

    const brief = await buildDiagramKnowledge(QUESTION, {
      subject: "Biology",
      conversationTail: "earlier we discussed cardiac output",
      priorDiagrams: 2,
      chat,
    });

    expect(brief).not.toBeNull();
    expect(brief!.RELATIONS).toContain("mitral opening");
    expect(chat).toHaveBeenCalledTimes(1);
    expect(captured[0].role).toBe("system");
    expect(captured[0].content).toContain("RELATIONS");
    expect(captured[0].content).toContain("Multiplicative:");
    expect(captured[0].content).toContain("Inverse:");
    expect(captured[0].content).toContain("generic study advice");
    const userTurn = captured[1].content;
    expect(userTurn).toContain(QUESTION);
    expect(userTurn).toContain("SUBJECT: Biology");
    expect(userTurn).toContain("earlier we discussed cardiac output");
    expect(userTurn).toContain("PRIOR DIAGRAMS IN THIS SESSION: 2");
    expect(userTurn).toContain("DIFFERENT related concepts");
  });

  it("asks for a fresh brief even on the first diagram", async () => {
    let userTurn = "";
    const chat = vi.fn(async (messages: Array<{ role: string; content: string }>) => {
      userTurn = messages[1].content;
      return BRIEF;
    });
    await buildDiagramKnowledge(QUESTION, { chat });
    expect(userTurn).toContain("PRIOR DIAGRAMS IN THIS SESSION: 0");
    expect(userTurn).not.toContain("DIFFERENT related concepts");
  });

  it("degrades to null on a provider failure so the drawing still happens", async () => {
    const chat = vi.fn(async () => {
      throw new Error("free lane offline");
    });
    expect(await buildDiagramKnowledge(QUESTION, { chat })).toBeNull();
  });

  it("degrades to null on a timeout instead of holding up the picture", async () => {
    const chat = vi.fn(() => new Promise<string>(() => {}));
    expect(
      await buildDiagramKnowledge(QUESTION, { chat, timeoutMs: 5 }),
    ).toBeNull();
  });

  it("degrades to null on malformed model output", async () => {
    const chat = vi.fn(async () => "Here is a lovely essay about the heart.");
    expect(await buildDiagramKnowledge(QUESTION, { chat })).toBeNull();
  });

  it("never calls the model for an empty question", async () => {
    const chat = vi.fn(async () => BRIEF);
    expect(await buildDiagramKnowledge("   ", { chat })).toBeNull();
    expect(chat).not.toHaveBeenCalled();
  });
});
