import { describe, it, expect, vi } from "vitest";
import type { AIChatMessage } from "@/types/api";
import {
  buildDiagramPrompt,
  parseDiagramJson,
  layoutDiagram,
  generateDiagram,
  DIAGRAM_TYPES,
  MAX_NODES,
  type DiagramType,
} from "@/features/mindmap-studio/generate";

/** Handy fixture: root → (a → a1), b — 4 nodes, one branch, one chain. */
function fixtureSpec(): unknown {
  return {
    title: "Demo map",
    nodes: [
      { id: "rootish", parent: null, label: "Root topic", kind: "concept", tags: ["core"] },
      { id: "a", parent: "rootish", label: "Branch A", kind: "concept", tags: [] },
      { id: "b", parent: "rootish", label: "Branch B", kind: "fact", tags: ["stat"] },
      { id: "a1", parent: "a", label: "Leaf A1", kind: "question", tags: [] },
    ],
  };
}

describe("buildDiagramPrompt", () => {
  it("carries the JSON schema and the type guidance in the system prompt", () => {
    const { system, user } = buildDiagramPrompt("flowchart", "Water cycle");
    expect(system).toContain('"parent": string|null');
    expect(system).toContain('"kind": "concept"|"fact"|"question"|"link"');
    expect(system).toContain("left to right"); // flowchart guidance
    expect(user).toContain("Diagram type: Flowchart");
    expect(user).toContain("Water cycle");
  });

  it("exposes all six diagram types with labels", () => {
    expect(DIAGRAM_TYPES.map((d) => d.id)).toEqual([
      "mindmap",
      "tree",
      "flowchart",
      "hierarchy",
      "timeline",
      "sequence",
    ]);
    for (const t of DIAGRAM_TYPES) expect(t.label.length).toBeGreaterThan(0);
  });
});

describe("parseDiagramJson", () => {
  it("parses clean JSON into a titled spec", () => {
    const spec = parseDiagramJson(JSON.stringify(fixtureSpec()));
    expect(spec.title).toBe("Demo map");
    expect(spec.nodes).toHaveLength(4);
    expect(spec.nodes[0].parent).toBeNull();
    expect(spec.nodes.map((n) => n.parent)).toEqual([null, "rootish", "rootish", "a"]);
  });

  it("strips code fences and surrounding prose", () => {
    const fenced = "```json\n" + JSON.stringify(fixtureSpec()) + "\n```";
    expect(parseDiagramJson(fenced).nodes).toHaveLength(4);
    const prose = "Sure! Here you go: " + JSON.stringify(fixtureSpec()) + " Enjoy.";
    expect(parseDiagramJson(prose).title).toBe("Demo map");
  });

  it("throws readable errors on unusable output", () => {
    expect(() => parseDiagramJson("")).toThrow(/nothing/i);
    expect(() => parseDiagramJson("I cannot help with that.")).toThrow(/not valid JSON/);
    expect(() => parseDiagramJson('{"title":"x"}')).toThrow(/no nodes/);
    expect(() => parseDiagramJson('{"nodes":[]}')).toThrow(/no nodes/);
  });

  it("reattaches unknown parents to the root", () => {
    const spec = parseDiagramJson(
      JSON.stringify({
        title: "T",
        nodes: [
          { id: "r", parent: null, label: "Root" },
          { id: "orphan", parent: "ghost", label: "Orphan" },
        ],
      }),
    );
    expect(spec.nodes[1].parent).toBe("r");
  });

  it("deduplicates ids and never lets a non-root keep the id 'root'", () => {
    const spec = parseDiagramJson(
      JSON.stringify({
        nodes: [
          { id: "alpha", parent: null, label: "Alpha" },
          { id: "root", parent: "alpha", label: "Pretender" },
          { id: "alpha", parent: "alpha", label: "Twin" },
        ],
      }),
    );
    const ids = spec.nodes.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
    // The special id "root" is reserved for the real root: a pretender gets
    // renamed at parse time so the emitted tree can never collide.
    const rootIdx = spec.nodes.findIndex((n) => n.parent === null);
    spec.nodes.forEach((n, i) => {
      if (i !== rootIdx) expect(n.id).not.toBe("root");
    });
    expect(spec.nodes[0].id).toBe("alpha"); // the real root kept its id
  });

  it("breaks cycles by detaching to the root", () => {
    const spec = parseDiagramJson(
      JSON.stringify({
        nodes: [
          { id: "r", parent: null, label: "Root" },
          { id: "x", parent: "y", label: "X" },
          { id: "y", parent: "x", label: "Y" },
        ],
      }),
    );
    const byId = new Map(spec.nodes.map((n) => [n.id, n]));
    // Walking up from x or y must terminate at r, not loop.
    let cursor: string | null = "x";
    const seen = new Set<string>();
    while (cursor) {
      expect(seen.has(cursor)).toBe(false);
      seen.add(cursor);
      const next: string | null | undefined = byId.get(cursor)?.parent ?? null;
      cursor = next;
    }
    expect(seen.has("r")).toBe(true);
  });

  it("caps node count and cleans labels, kinds and tags", () => {
    const many = {
      nodes: [
        { id: "r", parent: null, label: "Root" },
        ...Array.from({ length: MAX_NODES + 40 }, (_, i) => ({
          id: `n${i}`,
          parent: "r",
          label: `L${i}`,
          kind: "banana",
          tags: [123, "  OK  ", "x".repeat(60)],
        })),
      ],
    };
    const spec = parseDiagramJson(JSON.stringify(many));
    expect(spec.nodes).toHaveLength(MAX_NODES);
    expect(spec.nodes[1].kind).toBe("concept");
    expect(spec.nodes[1].tags).toEqual(["ok", "x".repeat(24)]);
    const long = parseDiagramJson(
      JSON.stringify({
        nodes: [
          { id: "r", parent: null, label: "y".repeat(400) },
          { id: "c", parent: "r", label: "kid" },
        ],
      }),
    );
    expect(long.nodes[0].label).toHaveLength(140);
  });
});

describe("layoutDiagram", () => {
  const parse = (raw: unknown) => parseDiagramJson(JSON.stringify(raw));

  function expectSane(nodes: ReturnType<typeof layoutDiagram>) {
    const ids = new Set(nodes.map((n) => n.id));
    expect(ids.has("root")).toBe(true);
    for (const n of nodes) {
      expect(Number.isFinite(n.x) && Number.isFinite(n.y)).toBe(true);
      if (n.parentId) {
        expect(ids.has(n.parentId)).toBe(true);
        expect(n.parentId).not.toBe(n.id);
      }
    }
    const root = nodes.find((n) => n.id === "root")!;
    expect(root.parentId).toBeUndefined();
  }

  const types: DiagramType[] = ["mindmap", "tree", "flowchart", "hierarchy", "timeline", "sequence"];

  it("produces a rooted, finite layout for every diagram type", () => {
    for (const type of types) {
      expectSane(layoutDiagram(parse(fixtureSpec()), type));
    }
  });

  it("tree and hierarchy stack children below their parents", () => {
    for (const type of ["tree", "hierarchy"] as DiagramType[]) {
      const nodes = layoutDiagram(parse(fixtureSpec()), type);
      const by = (id: string) => nodes.find((n) => n.id === id)!;
      expect(by("a").y).toBeGreaterThan(by("root").y);
      expect(by("a1").y).toBeGreaterThan(by("a").y);
      expect(by("b").y).toBe(by("a").y); // siblings share a level
    }
  });

  it("flowchart and timeline advance along x", () => {
    for (const type of ["flowchart", "timeline"] as DiagramType[]) {
      const nodes = layoutDiagram(parse(fixtureSpec()), type);
      const by = (id: string) => nodes.find((n) => n.id === id)!;
      expect(by("a").x).toBeGreaterThan(by("root").x);
      expect(by("a1").x).toBeGreaterThan(by("a").x);
      // Left-to-right means depth advances on x while branches stack on y:
      // a chain keeps its row, sibling branches get separate rows.
      expect(by("a1").y).toBe(by("a").y);
      expect(by("a").y).not.toBe(by("b").y);
    }
  });

  it("mindmap splits level-1 branches across both sides", () => {
    const nodes = layoutDiagram(parse(fixtureSpec()), "mindmap");
    const kids = nodes.filter((n) => n.parentId === "root");
    expect(kids.some((n) => n.x > 0)).toBe(true);
    expect(kids.some((n) => n.x < 0)).toBe(true);
    expect(nodes.find((n) => n.id === "root")!.x).toBe(0);
  });

  it("sequence puts actors in lanes with steps beneath them", () => {
    const nodes = layoutDiagram(parse(fixtureSpec()), "sequence");
    const by = (id: string) => nodes.find((n) => n.id === id)!;
    expect(by("a").y).toBe(by("b").y); // actors share the actor row
    expect(by("a1").x).toBe(by("a").x); // steps stay in their lane
    expect(by("a1").y).toBeGreaterThan(by("a").y);
    expect(by("root").y).toBeLessThan(by("a").y); // title above the lanes
  });

  it("sequence falls back to one ordered column for flat output", () => {
    const flat = {
      nodes: [
        { id: "r", parent: null, label: "Scene" },
        ...Array.from({ length: 6 }, (_, i) => ({ id: `s${i}`, parent: "r", label: `Step ${i}` })),
      ],
    };
    const nodes = layoutDiagram(parse(flat), "sequence");
    const steps = nodes.filter((n) => n.id !== "root");
    for (const s of steps) expect(s.x).toBe(steps[0].x);
    const ys = steps.map((s) => s.y);
    expect([...ys].sort((a, b) => a - b)).toEqual(ys); // ordered top-down
  });
});

describe("generateDiagram engine chain", () => {
  const okBody = JSON.stringify({
    title: "Engine demo",
    nodes: [
      { id: "r", parent: null, label: "Root" },
      { id: "c", parent: "r", label: "Child" },
    ],
  });

  it("uses Agnes first and never touches the fallbacks on success", async () => {
    const authChat = vi.fn(async () => ({ response: okBody, credits: 7 }));
    const guest = vi.fn(async () => ({ response: okBody, remaining: 1 }));
    const puter = vi.fn(async () => okBody);
    const seen: string[] = [];
    const result = await generateDiagram(
      { topic: "Photosynthesis", type: "tree", onEngine: (e) => seen.push(e) },
      { authChat, guest, puter },
    );
    expect(result.engine).toBe("agnes");
    expect(result.credits).toBe(7);
    expect(result.nodes.some((n) => n.id === "root")).toBe(true);
    expect(seen).toEqual(["agnes"]);
    expect(guest).not.toHaveBeenCalled();
    expect(puter).not.toHaveBeenCalled();
  });

  it("falls back to the guest pool when signed out, then puter.js", async () => {
    const guestFirst = await generateDiagram(
      { topic: "T", type: "mindmap" },
      {
        authChat: vi.fn(async () => Promise.reject(new Error("401"))),
        guest: vi.fn(async () => ({ response: okBody })),
        puter: vi.fn(async () => okBody),
      },
    );
    expect(guestFirst.engine).toBe("guest-pool");

    const puterLast = await generateDiagram(
      { topic: "T", type: "mindmap" },
      {
        authChat: vi.fn(async () => Promise.reject(new Error("401"))),
        guest: vi.fn(async () => Promise.reject(new Error("pool empty"))),
        puter: vi.fn(async () => okBody),
      },
    );
    expect(puterLast.engine).toBe("puter");
  });

  it("sends the system schema and the topic to every server engine", async () => {
    const capture: Array<{ role: string; content: string }[]> = [];
    await generateDiagram(
      { topic: "Mughal Empire", type: "timeline" },
      {
        authChat: vi.fn(async (messages: AIChatMessage[]) => {
          capture.push(messages.map((m) => ({ role: m.role, content: m.content })));
          return Promise.reject(new Error("401"));
        }),
        guest: vi.fn(async (messages: AIChatMessage[]) => {
          capture.push(messages.map((m) => ({ role: m.role, content: m.content })));
          return Promise.reject(new Error("pool empty"));
        }),
        puter: vi.fn(async (prompt) => {
          expect(prompt).toContain("Mughal Empire");
          expect(prompt).toContain('"parent": string|null');
          return okBody;
        }),
      },
    );
    expect(capture).toHaveLength(2);
    for (const messages of capture) {
      expect(messages[0].role).toBe("system");
      expect(messages[0].content).toContain('"parent": string|null');
      expect(messages[1].role).toBe("user");
      expect(messages[1].content).toContain("Mughal Empire");
    }
  });

  it("reports every engine failure when the whole chain fails", async () => {
    await expect(
      generateDiagram(
        { topic: "x", type: "tree" },
        {
          authChat: vi.fn(async () => Promise.reject(new Error("no key"))),
          guest: vi.fn(async () => Promise.reject(new Error("pool empty"))),
          puter: vi.fn(async () => Promise.reject(new Error("declined"))),
        },
      ),
    ).rejects.toThrow(/All engines failed.*no key.*pool empty.*declined/);
  });

  it("rejects an empty topic before calling any engine", async () => {
    const authChat = vi.fn(async () => ({ response: okBody }));
    await expect(generateDiagram({ topic: "  ", type: "tree" }, { authChat })).rejects.toThrow(
      /topic/i,
    );
    expect(authChat).not.toHaveBeenCalled();
  });
});
