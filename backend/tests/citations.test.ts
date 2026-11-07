import { describe, it, expect } from "vitest";
import {
  toCitation,
  buildCitations,
  formatCitations,
  type AnswerCitation,
} from "../src/ai/citations";

type Hit = Parameters<typeof buildCitations>[2];

function hit(over: Partial<AnswerCitation> & { id: string; source: string }): any {
  const entry = {
    id: over.id,
    title: over.title ?? `Title ${over.id}`,
    classLevel: over.classLevel ?? "class-11",
    subject: over.subject ?? "Physics",
    unit: over.unit ?? "Mechanics",
    topicSlug: over.topicSlug ?? "motion",
    source: over.source,
    relevance: 0,
    sections: [],
    haystack: "",
    dropIn: false,
    contentChars: 0,
    filler: false,
  };
  return {
    entry,
    score: 1,
    matched: [],
    positionTokens: [],
    strength: over.strength === "weak" ? "weak" : "strong",
    related: false,
  } as any;
}

function fakeRetriever(hits: any[]): Hit {
  // Honour the limit argument, exactly like the production retriever does.
  return ((_q: string, n: number) => hits.slice(0, Math.max(1, n))) as unknown as Hit;
}

describe("toCitation", () => {
  it("detects a PYQ from a practice/questions source path", () => {
    const c = toCitation(hit({ id: "p1", source: "content/class-11/physics/practice/questions/q1.md" }));
    expect(c?.kind).toBe("pyq");
  });

  it("treats a note source as a note", () => {
    const c = toCitation(hit({ id: "n1", source: "content/class-11/physics/unit-1/motion.md" }));
    expect(c?.kind).toBe("note");
  });

  it("flags weak matches", () => {
    const c = toCitation(hit({ id: "w1", source: "content/x.md", strength: "weak" }));
    expect(c?.strength).toBe("weak");
  });

  it("returns null on a malformed hit", () => {
    expect(toCitation(null as any)).toBeNull();
    expect(toCitation({ entry: {} } as any)).toBeNull();
  });
});

describe("buildCitations", () => {
  it("returns [] for an empty question", () => {
    expect(buildCitations("")).toEqual([]);
  });

  it("returns [] when the retriever throws (never breaks an answer)", () => {
    const boom = (() => {
      throw new Error("corpus down");
    }) as unknown as Hit;
    expect(buildCitations("mitosis", 3, boom)).toEqual([]);
  });

  it("de-duplicates repeated hits by id", () => {
    const out = buildCitations(
      "forces",
      10,
      fakeRetriever([
        hit({ id: "a", source: "content/a.md" }),
        hit({ id: "a", source: "content/a.md" }),
        hit({ id: "b", source: "content/b.md" }),
        hit({ id: "c", source: "content/c.md" }),
      ]),
    );
    expect(out.map((c) => c.id)).toEqual(["a", "b", "c"]);
  });

  it("returns at most `limit` distinct citations (retriever caps first)", () => {
    const out = buildCitations(
      "forces",
      2,
      fakeRetriever([
        hit({ id: "a", source: "content/a.md" }),
        hit({ id: "b", source: "content/b.md" }),
        hit({ id: "c", source: "content/c.md" }),
      ]),
    );
    expect(out.map((c) => c.id)).toEqual(["a", "b"]);
  });

  it("passes the limit through to retrieval", () => {
    let captured = -1;
    buildCitations(
      "x",
      3,
      ((_q: string, n: number) => {
        captured = n;
        return [];
      }) as unknown as Hit,
    );
    expect(captured).toBe(3);
  });
});

describe("formatCitations", () => {
  it("returns an empty string when there are no citations", () => {
    expect(formatCitations([])).toBe("");
  });

  it("renders a From your notes block with source paths and a notes link", () => {
    const out = formatCitations([
      { kind: "note", id: "n1", title: "Newton's Laws", classLevel: "class-11", subject: "Physics", unit: "Mechanics", topicSlug: "laws", source: "content/11/physics/unit-1/laws.md", strength: "strong" },
      { kind: "pyq", id: "p1", title: "2079 Set A Q2", classLevel: "class-12", subject: "Chemistry", unit: "Acids", topicSlug: "ph", source: "content/12/chemistry/practice/questions/2079-a2.md", strength: "strong" },
    ]);
    expect(out).toContain("From your notes");
    expect(out).toContain("Newton's Laws");
    expect(out).toContain("2079 Set A Q2");
    expect(out).toContain("content/11/physics/unit-1/laws.md");
    expect(out).toContain("content/12/chemistry/practice/questions/2079-a2.md");
    expect(out).toContain("Past paper");
    expect(out).toContain("[Notes archive](/notes)");
  });
});
