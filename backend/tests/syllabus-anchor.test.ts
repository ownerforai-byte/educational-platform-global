import { beforeEach, describe, expect, test, vi } from "vitest";

/**
 * Contract suite for the SYLLABUS ANCHOR + REPLY FLOOR engine (owner
 * requirement 2026-09-29: no random replies, 150-word minimum that scales
 * with question depth). Pins:
 *
 *  1. the depth classifier and its floors (150 hard minimum, up-scaling);
 *  2. syllabus matching — subject/unit/topic hits, word-boundary safety,
 *     graceful empty results;
 *  3. the anchor block contract — syllabus hits => scope directive, no hits
 *     => OFF-SYLLABUS ORIGIN RULE;
 *  4. the word counter and the floor enforcer — pass-through when met, up to
 *     two expansion retries, longest-attempt-wins, never throws.
 */

type Res = { data: unknown; error: { message: string; code?: string } | null };

function makeDb() {
  const tables = new Map<string, Res[]>();
  const calls: Array<{ table: string; op: string }> = [];

  const from = (table: string) => {
    let op: string | null = null;
    const terminal = () => {
      calls.push({ table, op: op ?? "select" });
      const list = tables.get(`${table}:${op ?? "select"}`);
      const res = list && list.length ? (list.shift() as Res) : { data: null, error: null };
      return Promise.resolve(res);
    };
    const builder: Record<string, unknown> = {};
    for (const m of ["select", "update", "insert", "upsert", "delete", "eq", "lt", "gt", "neq", "or", "is", "order", "limit"]) {
      builder[m] = (...a: unknown[]) => {
        if (m === "select") op ??= "select";
        return builder;
      };
    }
    builder.maybeSingle = terminal;
    builder.single = terminal;
    builder.then = (onFulfilled?: unknown, onRejected?: unknown) =>
      terminal().then(onFulfilled, onRejected);
    return builder;
  };

  return {
    from,
    calls,
    queue: (table: string, rows: unknown[]) => tables.set(`${table}:select`, [{ data: rows, error: null }]),
    clear: () => tables.clear(),
  };
}

const db = makeDb();

vi.mock("../src/db/supabase", () => ({ supabaseAdmin: { from: (t: string) => db.from(t) } }));

import {
  DEPTH_FLOOR_WORDS,
  EXPANSION_REQUEST,
  EXPANSION_REQUEST_STRICT,
  REPLY_FLOOR_WORDS,
  buildSyllabusAnchorBlock,
  classifyQuestionDepth,
  enforceReplyFloor,
  findSyllabusMatches,
  floorWordsForQuestion,
  meetsReplyFloor,
  wordCount,
} from "../src/ai/syllabus-anchor";

beforeEach(() => {
  db.calls.length = 0;
  db.clear();
  // Standard mini-syllabus used by most tests below.
  db.queue("subjects", [
    { id: "s-phy", name: "Physics" },
    { id: "s-bio", name: "Biology" },
  ]);
  db.queue("chapters", [
    { id: "c-heat", subject_id: "s-phy", title: "Heat and Temperature" },
    { id: "c-cell", subject_id: "s-bio", title: "Cell Biology" },
  ]);
  db.queue("topics", [
    { id: "t-1", chapter_id: "c-heat", title: "Specific heat capacity of solids and liquids" },
    { id: "t-2", chapter_id: "c-cell", title: "Mitosis and cell division" },
  ]);
});

describe("classifyQuestionDepth", () => {
  test("deep for derivations, proofs and complete-knowledge requests", () => {
    expect(classifyQuestionDepth("Derive the lens formula")).toBe("deep");
    expect(classifyQuestionDepth("prove that PV = nRT")).toBe("deep");
    expect(classifyQuestionDepth("teach me the complete knowledge of thermodynamics")).toBe("deep");
  });

  test("medium for explanation, comparison, process, features, properties and factors", () => {
    expect(classifyQuestionDepth("why does ice float on water?")).toBe("medium");
    expect(classifyQuestionDepth("difference between mitosis and meiosis")).toBe("medium");
    expect(classifyQuestionDepth("explain the process of photosynthesis")).toBe("medium");
    expect(classifyQuestionDepth("what are the features and properties of benzene?")).toBe("medium");
    expect(classifyQuestionDepth("what factors affect surface tension?")).toBe("medium");
  });

  test("shallow for definitions, facts and casual chat (held to 250 floor)", () => {
    expect(classifyQuestionDepth("what is enthalpy?")).toBe("shallow");
    expect(classifyQuestionDepth("hi veer, feeling tired today")).toBe("shallow");
  });
});

describe("floorWordsForQuestion", () => {
  test("the hard minimum is exactly 250 words", () => {
    expect(REPLY_FLOOR_WORDS).toBe(250);
    expect(DEPTH_FLOOR_WORDS.shallow).toBe(250);
  });

  test("the floor scales UP with question depth, never below 250", () => {
    expect(floorWordsForQuestion("what is enthalpy?")).toBe(250);
    expect(floorWordsForQuestion("why does ice float?")).toBe(350);
    expect(floorWordsForQuestion("derive the lens formula")).toBe(500);
    for (const v of Object.values(DEPTH_FLOOR_WORDS)) expect(v).toBeGreaterThanOrEqual(250);
  });
});

describe("wordCount / meetsReplyFloor", () => {
  test("counts whitespace-separated words", () => {
    expect(wordCount("one two three")).toBe(3);
    expect(wordCount("  spaced   out\twords\nhere ")).toBe(4);
    expect(wordCount("")).toBe(0);
    expect(wordCount("   ")).toBe(0);
  });

  test("floor comparison is inclusive", () => {
    expect(meetsReplyFloor("a ".repeat(250).trim(), 250)).toBe(true);
    expect(meetsReplyFloor("a ".repeat(249).trim(), 250)).toBe(false);
  });
});

describe("findSyllabusMatches", () => {
  test("finds the subject/unit/topic for an in-syllabus question", async () => {
    const hits = await findSyllabusMatches(
      "Explain specific heat capacity of solids and liquids",
    );
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].subject).toBe("Physics");
    expect(hits[0].unit).toBe("Heat and Temperature");
  });

  test("matches by token overlap when the full title is not quoted", async () => {
    const hits = await findSyllabusMatches("something about mitosis and division please");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].subject).toBe("Biology");
  });

  test("word-boundary safe: 'cheating' must not summon the Heat chapter", async () => {
    db.queue("topics", [
      { id: "t-1", chapter_id: "c-heat", title: "Heat and Temperature" },
    ]);
    const hits = await findSyllabusMatches("the teacher is cheating on the exam");
    expect(hits).toHaveLength(0);
  });

  test("returns [] when nothing matches or the corpus is empty", async () => {
    expect(await findSyllabusMatches("who won the football match yesterday?")).toHaveLength(0);
    db.queue("subjects", []);
    expect(await findSyllabusMatches("what is heat?")).toHaveLength(0);
  });
});

describe("buildSyllabusAnchorBlock", () => {
  test("in-syllabus question yields the scope directive with hits", async () => {
    const block = await buildSyllabusAnchorBlock(
      "Explain specific heat capacity of solids and liquids",
    );
    expect(block).toContain("SYLLABUS ANCHOR");
    expect(block).toContain("Physics");
    expect(block).toContain("Heat and Temperature");
    expect(block).toContain("Answer within this scope");
  });

  test("off-syllabus question yields the OFF-SYLLABUS ORIGIN RULE", async () => {
    const block = await buildSyllabusAnchorBlock("who won the football match yesterday?");
    expect(block).toContain("OFF-SYLLABUS ORIGIN RULE");
    expect(block).toContain("origin");
  });

  test("empty corpus degrades to the origin rule, never throws", async () => {
    db.queue("subjects", []);
    const block = await buildSyllabusAnchorBlock("anything at all");
    expect(block).toContain("OFF-SYLLABUS ORIGIN RULE");
  });
});

describe("enforceReplyFloor", () => {
  const retry = vi.fn();

  beforeEach(() => {
    retry.mockReset();
  });

  test("pass-through when the reply already meets the floor", async () => {
    const good = "word ".repeat(160);
    const out = await enforceReplyFloor(good, 150, retry);
    expect(out).toEqual({ answer: good, floor: 150, words: 160, expanded: false });
    expect(retry).not.toHaveBeenCalled();
  });

  test("a short reply is retried until it meets the floor", async () => {
    retry.mockResolvedValueOnce("word ".repeat(170));
    const out = await enforceReplyFloor("too short", 150, retry);
    expect(out.expanded).toBe(true);
    expect(out.words).toBe(170);
    expect(out.answer).toBe("word ".repeat(170));
    expect(retry).toHaveBeenCalledTimes(1);
    expect(retry.mock.calls[0][0]).toContain("minimum");
  });

  test("second (strict) attempt is sent when the first retry is still short", async () => {
    retry.mockResolvedValueOnce("word ".repeat(160)); // still below 300
    retry.mockResolvedValueOnce("word ".repeat(310));
    const out = await enforceReplyFloor("short", 300, retry);
    expect(out.words).toBe(310);
    expect(retry).toHaveBeenCalledTimes(2);
    expect(retry.mock.calls[1][0]).toBe(EXPANSION_REQUEST_STRICT);
  });

  test("longest attempt wins when no retry reaches the floor", async () => {
    retry.mockResolvedValueOnce("word ".repeat(120));
    retry.mockResolvedValueOnce("word ".repeat(140));
    const out = await enforceReplyFloor("word ".repeat(100), 150, retry);
    expect(out.words).toBe(140);
    expect(out.expanded).toBe(true);
  });

  test("the original ships when retries fail or never help", async () => {
    retry.mockRejectedValueOnce(new Error("provider down")).mockRejectedValueOnce(new Error("down again"));
    const out = await enforceReplyFloor("short", 150, retry);
    expect(out.answer).toBe("short");
    expect(out.expanded).toBe(false);
    expect(out.words).toBe(1);

    retry.mockResolvedValue("tiny");
    const out2 = await enforceReplyFloor("word ".repeat(100), 150, retry);
    expect(out2.answer).toBe("word ".repeat(100));
  });

  test("the expansion request demands substance and forbids invention", async () => {
    expect(EXPANSION_REQUEST).toContain("invent NOTHING");
    expect(EXPANSION_REQUEST).toContain("do not pad with repetition, filler");
    expect(EXPANSION_REQUEST_STRICT).toContain("FINAL CHANCE");
  });
});
