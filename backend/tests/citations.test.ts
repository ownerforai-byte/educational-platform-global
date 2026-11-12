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

  it("renders a From your notes block that LINKS each record instead of printing its path", () => {
    const out = formatCitations([
      { kind: "note", id: "n1", title: "Newton's Laws", classLevel: "class-11", subject: "Physics", unit: "Mechanics", topicSlug: "laws", source: "content/11/physics/unit-1/laws.md", strength: "strong", href: "/class-11-notes/physics/chapters/mechanics" },
      { kind: "pyq", id: "p1", title: "2079 Set A Q2", classLevel: "class-12", subject: "Chemistry", unit: "Acids", topicSlug: "ph", source: "content/12/chemistry/practice/questions/2079-a2.md", strength: "strong", href: "/class-12-notes/chemistry/chapters/acids" },
    ]);
    expect(out).toContain("From your notes");
    expect(out).toContain("[Newton's Laws](/class-11-notes/physics/chapters/mechanics)");
    expect(out).toContain("[2079 Set A Q2](/class-12-notes/chemistry/chapters/acids)");
    expect(out).toContain("Past paper");
    expect(out).toContain("[Notes archive](/notes)");
    // The long repo path is what the link replaces.
    expect(out).not.toContain("content/11/physics/unit-1/laws.md");
    expect(out).not.toContain("content/12/chemistry/practice/questions/2079-a2.md");
  });

  it("keeps the raw path for a record with no routable coordinates", () => {
    const out = formatCitations([
      { kind: "note", id: "kb1", title: "Drop-in note", classLevel: "class-11", subject: "physics", unit: "kb-folder", topicSlug: "x", source: "backend/kb/drop-in.json", strength: "strong" },
    ]);
    expect(out).toContain("**Drop-in note**");
    expect(out).toContain("`backend/kb/drop-in.json`");
  });
});

describe("citation links", () => {
  it("links a syllabus record to its chapter page", () => {
    const c = toCitation(hit({ id: "n1", source: "content/a.md" }));
    expect(c?.href).toBe("/class-11-notes/physics/chapters/mechanics");
  });

  it("falls back to the subject hub when the unit is not a slug", () => {
    const c = toCitation(hit({ id: "n2", source: "content/a.md", subject: "Physics", unit: "Unit 1: Motion" }));
    expect(c?.href).toBe("/class-11-notes/physics");
  });

  it("builds no link for a drop-in KB record or an unknown class", () => {
    const dropIn = hit({ id: "kb", source: "backend/kb/a.json" });
    dropIn.entry.dropIn = true;
    expect(toCitation(dropIn)?.href).toBeUndefined();

    const unknown = hit({ id: "u", source: "content/a.md", classLevel: "unknown" });
    expect(toCitation(unknown)?.href).toBeUndefined();
  });
});
