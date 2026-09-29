import { describe, expect, it } from "vitest";
import {
  BlockSchema,
  ComputeBlockSchema,
  ConceptNoteSchema,
  FormulaSchema,
  WidgetBlockSchema,
  computeBlock,
  defineNote,
  formula,
  md,
  widgetBlock,
} from "@/lib/content/schema";

const base = {
  title: "T",
  unitSlug: "u",
  topicSlug: "t",
  topicTitle: "T",
  relevance: 100,
  notes: ["**x** $x$"],
};

describe("ConceptNoteSchema", () => {
  it("accepts a minimal note", () => expect(ConceptNoteSchema.safeParse(base).success).toBe(true));
  it("rejects out-of-range relevance", () =>
    expect(ConceptNoteSchema.safeParse({ ...base, relevance: 101 }).success).toBe(false));
  it("empty notes are a THIN state, not a schema violation", () => {
    const empty = ConceptNoteSchema.safeParse({ ...base, notes: [] });
    // Applied MdList carries no .min(1) (PLANS.md §4.3: "valid but unfinished"
    // is not "broken") — validate.ts grades [] as THIN, schema accepts it.
    expect(empty.success).toBe(true);
  });
  it("rejects a malformed MCQ answer", () =>
    expect(
      ConceptNoteSchema.safeParse({
        ...base,
        mcs: [{ question: "q", options: ["a", "b"], answer: "Z", explanation: "e" }],
      }).success,
    ).toBe(false));
  it("accepts the Phase 4 opt-in fields formulaSpecs + blocks", () => {
    const note = defineNote({
      ...base,
      unitSlug: "kinematics",
      formulaSpecs: [
        formula("x-def", { latex: "x = ut", expr: "u * t", solve: "x", vars: { u: { unit: "m" }, t: {} } }),
      ],
      blocks: [computeBlock({ formula: "x-def", solveFor: "x", inputs: [{ var: "u", value: 1 }] })],
    });
    const res = ConceptNoteSchema.safeParse(note);
    if (!res.success) console.error(res.error.issues.slice(0, 3));
    expect(res.success).toBe(true);
  });
});

describe("FormulaSchema", () => {
  it("requires an id and latex, defaults vars/constants", () => {
    const parsed = FormulaSchema.safeParse({ id: "c", latex: "C = Q / V" });
    expect(parsed.success).toBe(true);
    if (!parsed.success) throw new Error("unreachable");
    expect(parsed.data.vars).toEqual({});
    expect(parsed.data.constants).toEqual({});
  });
  it("rejects an unknown unit symbol", () =>
    expect(
      FormulaSchema.safeParse({ id: "c", latex: "x", vars: { v: { unit: "furlong" } } }).success,
    ).toBe(false));
});

describe("blocks", () => {
  it("compute blocks carry no executable string", () => {
    const ok = ComputeBlockSchema.safeParse({
      kind: "compute",
      formula: "f",
      solveFor: "x",
      inputs: [{ var: "q", value: 1, unit: "µC" }],
    });
    if (!ok.success) console.error(ok.error.issues.slice(0, 3));
    expect(ok.success).toBe(true);
  });
  it("rejects a widget name with path characters", () =>
    expect(WidgetBlockSchema.safeParse({ kind: "widget", block: "../evil", props: {} }).success).toBe(false));
  it("rejects unknown props against BlockSchema", () =>
    expect(BlockSchema.safeParse({ kind: "compute" }).success).toBe(false));
  it("helpers produce canonical shapes", () => {
    const w = widgetBlock({ block: "schematic", caption: md("see") });
    expect(w).toMatchObject({ kind: "widget", props: {} });
    const c = computeBlock({ formula: "f", solveFor: "x", inputs: [{ var: "x" }] });
    expect(c).toMatchObject({ kind: "compute", showUnits: true, checks: [] });
  });
});
