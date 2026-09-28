import { describe, expect, it } from "vitest";
import {
  MD_LIST_FIELDS,
  liftEmbeddedFields,
  normalizeMcqAnswer,
  normalizeMcqAnswers,
  normalizeVisualKeys,
  pruneBlankEntries,
  repairNote,
} from "@/lib/content/repair";
import { ConceptNoteSchema } from "@/lib/content/schema/concept";

const mcq = (over: Record<string, unknown> = {}) => ({
  question: "What is 2 + 2?",
  options: ["3", "4", "5", "22"],
  ...over,
});

describe("liftEmbeddedFields", () => {
  it("lifts authored fields out of enrichedContent onto the note", () => {
    const note: Record<string, unknown> = {
      topicSlug: "collisions",
      enrichedContent: { notes: ["first", "second"], keyPoints: ["k1"] },
    };
    liftEmbeddedFields(note, []);
    expect(note.notes).toEqual(["first", "second"]);
    expect(note.keyPoints).toEqual(["k1"]);
  });

  it("falls through to originalContent for fields enrichedContent lacks", () => {
    const note: Record<string, unknown> = {
      enrichedContent: { notes: ["from enriched"] },
      originalContent: { notes: ["from original"], formulas: ["F = ma"] },
    };
    liftEmbeddedFields(note, []);
    expect(note.notes).toEqual(["from enriched"]); // precedence: enrichedContent first
    expect(note.formulas).toEqual(["F = ma"]); // gaps filled from originalContent
  });

  it("never overwrites top-level data that is already there", () => {
    const note: Record<string, unknown> = {
      notes: ["authored"],
      enrichedContent: { notes: ["junk"], keyPoints: ["kept"] },
    };
    liftEmbeddedFields(note, []);
    expect(note.notes).toEqual(["authored"]); // authored body wins
    expect(note.keyPoints).toEqual(["kept"]); // gaps still filled from the snapshot
  });

  it("does not lift junk mcs arrays (strings, not MCQ objects)", () => {
    const note: Record<string, unknown> = {
      enrichedContent: { mcs: ["Added new rich content for mcs."] },
    };
    liftEmbeddedFields(note, []);
    expect(note.mcs).toBeUndefined();
  });

  it("keeps an authored body but still fills other gaps from the snapshot", () => {
    const note: Record<string, unknown> = {
      notes: ["present"],
      enrichedContent: { notes: ["other"], practice: ["p"] },
    };
    const changes: Array<{ rule: string; detail: string }> = [];
    liftEmbeddedFields(note, changes);
    expect(note.notes).toEqual(["present"]); // authored body is never overwritten
    expect(note.practice).toEqual(["p"]); // missing field lifted from the snapshot
    expect(changes).toHaveLength(1);
  });
});

describe("pruneBlankEntries", () => {
  it("drops empty-string separators and non-string entries from list fields", () => {
    const note: Record<string, unknown> = {
      notes: ["real note", "", "   ", "another", 42, null],
    };
    const changes: Array<{ rule: string; detail: string }> = [];
    pruneBlankEntries(note, changes);
    expect(note.notes).toEqual(["real note", "another"]);
    expect(changes[0].rule).toBe("prune-blank-entries");
    expect(changes[0].detail).toContain("dropped 4");
  });

  it("leaves every MdList field untouched when there is nothing to prune", () => {
    const note: Record<string, unknown> = { notes: ["a"], formulas: ["F = ma"] };
    pruneBlankEntries(note, []);
    expect(note.notes).toEqual(["a"]); // nothing to prune → untouched
    expect(note.formulas).toEqual(["F = ma"]);
  });

  it("covers every MdList field the schema declares (numericals included)", () => {
    expect(MD_LIST_FIELDS).toContain("numericals");
    expect(MD_LIST_FIELDS).not.toContain("exercises"); // z.array(z.unknown()), not MdList
  });
});

describe("normalizeMcqAnswer", () => {
  it("accepts the letter shapes measured in the corpus", () => {
    expect(normalizeMcqAnswer("C", 4)).toEqual({ answer: "C" });
    expect(normalizeMcqAnswer("(b)", 4)).toEqual({ answer: "B" });
    expect(normalizeMcqAnswer("A.", 4)).toEqual({ answer: "A" });
    expect(normalizeMcqAnswer("C (h ∝ t²)", 4)).toEqual({ answer: "C", note: "h ∝ t²" });
    expect(normalizeMcqAnswer("B — the velocity is zero", 4)).toEqual({ answer: "B", note: "the velocity is zero" });
  });

  it("refuses to guess", () => {
    expect(normalizeMcqAnswer(2, 4)).toBeNull(); // numeric index — 0- or 1-based? unknowable
    expect(normalizeMcqAnswer("2", 4)).toBeNull();
    expect(normalizeMcqAnswer("all of the above", 4)).toBeNull();
    expect(normalizeMcqAnswer("E", 4)).toBeNull(); // letter beyond the options
    expect(normalizeMcqAnswer(null, 4)).toBeNull();
  });
});

describe("normalizeMcqAnswers", () => {
  it("rescues the worked answer into the option letter + explanation", () => {
    const item = mcq({ answer: "A (s₃ = 0 + 2(5) = 10 m)" });
    const note: Record<string, unknown> = { mcs: [item] };
    normalizeMcqAnswers(note as Record<string, unknown>, []);
    const fixed = (note.mcs as Array<Record<string, unknown>>)[0];
    expect(fixed.answer).toBe("A");
    expect(fixed.explanation).toBe("s₃ = 0 + 2(5) = 10 m");
  });

  it("merges into an existing explanation and keeps canonical answers alone", () => {
    const note = {
      mcs: [
        mcq({ answer: "B (T = 2u/g)", explanation: "From v = u + at." }),
        mcq({ answer: "B" }), // already canonical → untouched
      ],
    };
    normalizeMcqAnswers(note, []);
    const list = note.mcs as Array<Record<string, unknown>>;
    expect(list[0].explanation).toBe("From v = u + at. — T = 2u/g");
    expect(list[1]).not.toHaveProperty("explanation");
  });
});

describe("normalizeVisualKeys", () => {
  it("replaces over-bound prose with the unit slug (the field is a lookup key)", () => {
    const prose = "A 3D animation showing nuclear fission where a neutron strikes".repeat(4);
    expect(prose.length).toBeGreaterThan(200);
    const note = { unitSlug: "nuclear-physics", animation3D: prose };
    normalizeVisualKeys(note, []);
    expect(note.animation3D).toBe("nuclear-physics");
  });

  it("leaves short identifiers and non-strings alone", () => {
    const note = { unitSlug: "nuclear-physics", animation3D: "fission-chain", motionGraphics: 42 };
    normalizeVisualKeys(note, []);
    expect(note.animation3D).toBe("fission-chain");
    expect(note.motionGraphics).toBe(42);
  });
});

describe("repairNote", () => {
  it("produces a note that satisfies ConceptNoteSchema", () => {
    const { note, changes } = repairNote(liftedNoteFixture());
    const result = ConceptNoteSchema.safeParse(note);
    if (!result.success) console.error(result.error.issues.slice(0, 5));
    expect(result.success).toBe(true);
    expect(changes.map((c) => c.rule)).toEqual([
      "lift-embedded-fields", // notes
      "lift-embedded-fields", // mcs
      "prune-blank-entries",
      "mcq-answer-letter",
      "visual-key-identifier",
    ]);
  });

  it("does not mutate its input", () => {
    const input = JSON.parse(JSON.stringify(liftedNoteFixture()));
    repairNote(input);
    expect(input.enrichedContent).toBeDefined();
    expect(input.notes).toBeUndefined();
  });

  it("is idempotent — repairing a repaired note changes nothing", () => {
    const first = repairNote(liftedNoteFixture());
    const second = repairNote(first.note);
    expect(second.changes).toEqual([]);
  });
});

const liftedNoteFixture = () =>
  ({
    title: "Freely Falling Body",
    unitSlug: "kinematics",
    topicSlug: "freely-falling-body",
    topicTitle: "Motion of a Freely Falling Body",
    animation3D: `prose pasted by mistake, ${"x".repeat(230)}`,
    enrichedContent: {
      notes: ["v = u + gt", "", "  ", "h = ut + ½gt²"],
      mcs: [mcq({ answer: "C (h ∝ t²)" }), mcq({ answer: "B" })],
    },
  }) as unknown;
