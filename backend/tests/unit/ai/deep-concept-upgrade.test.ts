import express from "express";
import type { Request, Response } from "express";
import type { Server } from "node:http";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  chat: vi.fn(),
  stream: vi.fn(),
  searchEnabled: false,
  searchResults: [] as Array<{ title: string; link: string; snippet: string; displayLink: string }>,
  rows: [] as Array<{ user_id: string; session: string; role: string; content: string; created_at?: string }>,
  diagramLinks: [] as Array<{ url: string; label: string; source: string }>,
  contexts: [] as string[],
}));

vi.mock("../../../src/db/supabase", () => ({
  supabaseAdmin: {
    from: () => {
      const filters: Array<[string, string]> = [];
      const query = {
        select: () => query,
        eq: (key: string, value: string) => { filters.push([key, value]); return query; },
        order: () => query,
        limit: async () => ({ data: mocks.rows.filter((row) => filters.every(([key, value]) => row[key as keyof typeof row] === value)), error: null }),
        insert: async (rows: typeof mocks.rows) => { mocks.rows.push(...rows); return { error: null }; },
      };
      return query;
    },
  },
}));
vi.mock("../../../src/ai/search-engine", () => ({
  formatSearchContext: (results: Array<{ title: string; link: string }>) =>
    results.length
      ? `[REAL-TIME INTERNET SEARCH RESULTS]\n${results.map((result) => `${result.title}\nSource: ${result.link}`).join("\n")}`
      : "",
  getSearchService: () => ({
    isEnabled: () => mocks.searchEnabled,
    search: async () => mocks.searchResults,
    searchAsContext: async () => mocks.searchEnabled ? "[REAL-TIME INTERNET SEARCH RESULTS]" : "",
  }),
}));
vi.mock("../../../src/ai/diagram-search", () => ({
  DIAGRAM_TIMEOUT_MS: 10,
  fetchDiagramContext: async () => "",
  fetchDiagramLinks: async () => mocks.diagramLinks,
  formatGraphLinksBlock: (links: Array<{ url: string; label: string }>) =>
    links.length
      ? `\n\n**Graphs & diagrams**\n${links.map((link) => `- [${link.label}](<${link.url}>)`).join("\n")}`
      : "",
}));
vi.mock("../../../src/ai/curriculum-retrieval", async (original) => {
  const actual = await original<typeof import("../../../src/ai/curriculum-retrieval")>();
  return { ...actual, buildCurriculumContext: () => "" };
});
vi.mock("../../../src/ai/prompts", () => ({
  answerTierRules: () => "verified tier rules",
  buildProfessorContext: async () => "teacher context",
  appendConsoleRules: (context: string) => { mocks.contexts.push(context); return context; },
  withProfessorContext: (messages: unknown[]) => messages,
}));
vi.mock("../../../src/ai/service", () => ({ createAIService: () => ({
  chat: mocks.chat,
  chatStream: mocks.stream,
  getLastFinishReason: () => "stop",
  getLastAnsweredBy: () => "test",
}) }));
vi.mock("../../../src/middleware/auth", async (original) => {
  const actual = await original<typeof import("../../../src/middleware/auth")>();
  const attach = (req: Request) => { (req as Request & { user: unknown }).user = { id: String(req.headers["x-test-user"] || "alice"), email: [...actual.OWNER_EMAILS][0] }; };
  return { ...actual, requireAuth: (req: Request, _res: Response, next: () => void) => { attach(req); next(); }, getUserFromRequest: async (req: Request) => { attach(req); return (req as Request & { user: unknown }).user; } };
});
vi.mock("../../../src/middleware/aiSparkGate", () => ({
  aiSparkGateIfAuthed: (_req: Request, _res: Response, next: () => void) => next(),
  requirePlusAiStudio: () => (_req: Request, _res: Response, next: () => void) => next(),
}));

import chatRoutes from "../../../src/api/ai";
import mathRoutes from "../../../src/api/ai-math";
import deepRoutes from "../../../src/api/ai-deep-dive";
import {
  deepConceptResearch,
  formatResearchPaperReferences,
  relatedHistory,
  shouldUpgradeAcademic,
} from "../../../src/ai/complete-answer";
import { getCorpus } from "../../../src/ai/curriculum-corpus";

const app = express();
app.use(express.json());
app.use("/chat", chatRoutes);
app.use("/math", mathRoutes);
app.use("/deep", deepRoutes);
let server: Server;
let base: string;
beforeAll(async () => {
  await new Promise<void>((resolve) => { server = app.listen(0, "127.0.0.1", resolve); });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no test port");
  base = `http://127.0.0.1:${address.port}`;
  // Warm the curriculum corpus here (120s hook budget) so the first /chat
  // route test — which now retrieves grounding citations — does not pay the
  // Windows cold-read cost inside the 5s test timeout.
  await getCorpus();
});
afterAll(async () => { await new Promise<void>((resolve) => server.close(() => resolve())); });
beforeEach(() => {
  mocks.rows.length = 0;
  mocks.searchEnabled = false;
  mocks.searchResults.length = 0;
  mocks.diagramLinks.length = 0;
  mocks.contexts.length = 0;
  mocks.chat.mockReset().mockResolvedValueOnce("Raw draft.").mockResolvedValue("Upgraded answer.");
  mocks.stream.mockReset().mockImplementation(async function* () { yield "Upgraded answer."; });
});
async function post(path: string, body: unknown) {
  return fetch(base + path, { method: "POST", headers: { "Content-Type": "application/json", "x-test-user": "alice" }, body: JSON.stringify(body) });
}

describe("deep concept upgrade", () => {
  it("selects academic and short definition questions but not personal or identity questions", () => {
    expect(shouldUpgradeAcademic("What is a cell?")).toBe(true);
    expect(shouldUpgradeAcademic("Explain how a capacitor stores charge")).toBe(true);
    expect(shouldUpgradeAcademic("Who are you?")).toBe(false);
    expect(shouldUpgradeAcademic("continue", "Explain capacitors")).toBe(true);
    expect(shouldUpgradeAcademic("I feel anxious about my physics exam")).toBe(false);
  });
  it("returns an honest absence of sources when research is unavailable", async () => {
    expect(await deepConceptResearch("unknown concept")).toContain("No past-paper search results were available");
  });
  it("formats only real HTTPS research-paper search results as reader links", () => {
    const references = formatResearchPaperReferences([
      {
        title: "Capacitor dielectric research paper",
        link: "https://doi.org/10.1000/capacitor",
        snippet: "Journal article.",
        displayLink: "doi.org",
      },
      {
        title: "Unrelated blog",
        link: "https://example.com/blog",
        snippet: "General information.",
        displayLink: "example.com",
      },
      {
        title: "Fake insecure paper",
        link: "http://doi.org/10.1000/insecure",
        snippet: "Journal article.",
        displayLink: "doi.org",
      },
    ]);

    expect(references).toContain("[Capacitor dielectric research paper](<https://doi.org/10.1000/capacitor>)");
    expect(references).not.toContain("example.com");
    expect(references).not.toContain("insecure");
  });
  it("links only matching questions belonging to the authenticated user", async () => {
    mocks.rows.push(
      { user_id: "alice", session: "previous", role: "user", content: "Explain capacitors" },
      { user_id: "alice", session: "current", role: "user", content: "capacitor" },
      { user_id: "bob", session: "private", role: "user", content: "capacitor" },
      { user_id: "alice", session: "unrelated", role: "user", content: "Explain photosynthesis" },
    );
    const links = await relatedHistory("alice", "Explain capacitor", "current");
    expect(links).toContain("[Explain capacitors](/chat?session=previous)");
    expect(links).not.toContain("private");
    expect(links).not.toContain("current");
    expect(links).not.toContain("unrelated");
  });
  it("streams only the regenerated answer after a separate draft pass", async () => {
    mocks.rows.push({ user_id: "alice", session: "prior", role: "user", content: "capacitor" });
    const res = await post("/chat", { stream: true, session: "current", messages: [{ role: "user", content: "Explain capacitor" }] });
    const body = await res.text();
    expect(res.status).toBe(200);
    expect(body).toContain("Upgraded answer.");
    expect(body).not.toContain("Raw draft.");
    expect(body).toContain("/chat?session=prior");
    expect(mocks.chat).toHaveBeenCalledTimes(1);
    expect(mocks.stream.mock.calls[0][1][0].content).toContain("DEEP-CONCEPT ANSWER UPGRADE");
    expect(mocks.stream.mock.calls[0][1][1].content).toContain("Raw draft.");
    // Two AI passes + citation retrieval; the default 5s budget is tight on
    // Windows under full-suite load (same 20s budget as other corpus tests).
  }, 20_000);
  it("appends real web paper references after related-history links in Veer chat", async () => {
    mocks.searchEnabled = true;
    mocks.rows.push({ user_id: "alice", session: "prior", role: "user", content: "capacitor" });
    mocks.searchResults.push(
      {
        title: "Capacitor dielectric research paper",
        link: "https://doi.org/10.1000/capacitor",
        snippet: "Journal article on capacitor dielectrics.",
        displayLink: "doi.org",
      },
      {
        title: "Unrelated blog",
        link: "https://example.com/blog",
        snippet: "General information.",
        displayLink: "example.com",
      },
    );

    const res = await post("/chat", {
      stream: true,
      session: "current",
      messages: [{ role: "user", content: "Explain capacitor" }],
    });
    const body = await res.text();

    expect(body).toContain("### Research papers & references");
    expect(body).toContain("https://doi.org/10.1000/capacitor");
    expect(body).not.toContain("https://example.com/blog");
    expect(body).toContain("/chat?session=prior");
    expect(body.indexOf("### Research papers & references")).toBeGreaterThan(
      body.indexOf("/chat?session=prior"),
    );
    // Owner 2026-11-08: the verified paper is also the closing single link,
    // with a short meaningful name, and it comes AFTER the references section.
    expect(body).toContain(
      "**Original research paper:** [Capacitor dielectric research paper](<https://doi.org/10.1000/capacitor>)",
    );
    expect(body.lastIndexOf("**Original research paper:**")).toBeGreaterThan(
      body.indexOf("### Research papers & references"),
    );
  });
  it("rebuilds non-streaming academic answers without exposing the draft", async () => {
    const res = await post("/chat", { messages: [{ role: "user", content: "Explain capacitor" }] });
    const json = await res.json() as { response: string; citations: unknown };
    expect(res.status).toBe(200);
    // The final answer is the upgraded text — the DRAFT pass must not leak.
    expect(json.response).toContain("Upgraded answer.");
    expect(json.response).not.toContain("Raw draft.");
    // Citations are now surfaced (grounding the answer in a real note/PYQ).
    expect(json.response).toContain("From your notes");
    expect(Array.isArray(json.citations)).toBe(true);
    expect(mocks.chat).toHaveBeenCalledTimes(2);
    expect(mocks.chat.mock.calls[1][1][0].content).toContain("DEEP-CONCEPT ANSWER UPGRADE");
  });
  it("reports a failed upgrade instead of returning the raw draft", async () => {
    mocks.chat.mockReset().mockResolvedValueOnce("Raw draft.").mockRejectedValueOnce(new Error("provider unavailable"));
    const res = await post("/chat", { messages: [{ role: "user", content: "Explain capacitor" }] });
    expect(res.status).toBeGreaterThanOrEqual(500);
    expect(await res.text()).not.toContain("Raw draft.");
  });
  it("does not upgrade a casual message but still closes with a research-paper link", async () => {
    const res = await post("/chat", { messages: [{ role: "user", content: "hello" }] });
    const response = (await res.json() as { response: string }).response;
    // Owner 2026-11-08: "simply for any question add link of research paper at
    // last" — casual turns are no longer a bare reply.
    expect(response).toContain("Raw draft.");
    expect(response).toContain("**Original research paper:**");
    expect(response).toContain("semanticscholar.org/search?q=");
    expect(response.indexOf("**Original research paper:**")).toBeGreaterThan(
      response.indexOf("Raw draft."),
    );
    expect(mocks.chat).toHaveBeenCalledTimes(1);
  });
  it("ends a streamed academic answer with the paper link when search is unavailable", async () => {
    const res = await post("/chat", {
      stream: true,
      session: "current",
      messages: [{ role: "user", content: "Explain capacitor" }],
    });
    const body = await res.text();
    expect(body).toContain("Upgraded answer.");
    expect(body).toContain("**Original research paper:**");
    expect(body).toContain("semanticscholar.org/search?q=");
    expect(body.lastIndexOf("**Original research paper:**")).toBeGreaterThan(
      body.indexOf("Upgraded answer."),
    );
  });
  it("streams a drawing request at once — no draft pass — and closes with the graph links", async () => {
    // Owner 2026-11-10: drawing questions start writing immediately (no hidden
    // upgrade draft), carry the syllabus condition guide, and end with the
    // verified graph links before the final research-paper link.
    process.env.AGNES_API_KEY = "test-key";
    mocks.diagramLinks.push({
      url: "https://upload.wikimedia.org/wikipedia/commons/full/Velocity_time_graph.svg",
      label: "Velocity time graph",
      source: "commons",
    });
    try {
      const res = await post("/chat", {
        stream: true,
        session: "current",
        messages: [{ role: "user", content: "Draw the v-t graph for a body in free fall" }],
      });
      const body = await res.text();
      expect(res.status).toBe(200);
      // The stream is the FIRST and ONLY AI call — no draft pass to wait for.
      expect(mocks.chat).not.toHaveBeenCalled();
      expect(mocks.stream).toHaveBeenCalledTimes(1);
      // The figure-tool instruction + matched condition guide ride in the
      // professor context (captured via appendConsoleRules).
      const context = mocks.contexts.at(-1) ?? "";
      expect(context).toContain("NEVER WRITE CODE ON SCREEN");
      expect(context).toContain("[SYLLABUS CONDITION GUIDE");
      expect(context).toContain("free fall (v = gt");
      expect(body).toContain("Upgraded answer.");
      expect(body).not.toContain("Raw draft.");
      expect(body).toContain("**Graphs & diagrams**");
      expect(body).toContain("Velocity time graph");
      expect(body.indexOf("**Graphs & diagrams**")).toBeGreaterThan(
        body.indexOf("Upgraded answer."),
      );
      expect(body.lastIndexOf("**Original research paper:**")).toBeGreaterThan(
        body.indexOf("**Graphs & diagrams**"),
      );
    } finally {
      delete process.env.AGNES_API_KEY;
    }
  });
  it("answers a non-streaming drawing request in one pass with citations and graph links", async () => {
    mocks.chat.mockReset().mockResolvedValue("The v-t graph is a straight line through the origin.");
    mocks.diagramLinks.push({
      url: "https://example.edu/vt.png",
      label: "Free fall v-t graph",
      source: "google",
    });
    const res = await post("/chat", {
      messages: [{ role: "user", content: "Draw the v-t graph for a body in free fall" }],
    });
    const json = await res.json() as { response: string; citations: unknown[] };
    expect(res.status).toBe(200);
    expect(mocks.chat).toHaveBeenCalledTimes(1);
    expect(json.response).toContain("straight line through the origin");
    expect(Array.isArray(json.citations)).toBe(true);
    expect(json.response).toContain("**Graphs & diagrams**");
    expect(json.response).toContain("[Free fall v-t graph](<https://example.edu/vt.png>)");
    expect(json.response.lastIndexOf("**Original research paper:**")).toBeGreaterThan(
      json.response.indexOf("**Graphs & diagrams**"),
    );
  });
  it.each([
    ["/math", { problem: "Solve x + 1 = 2" }, "solution"],
    ["/deep", { topic: "Explain capacitor" }, "explanation"],
  ])("rebuilds and persists the final answer for %s", async (path, body, field) => {
    const res = await post(path, body);
    const json = await res.json() as Record<string, string>;
    expect(res.status).toBe(200);
    expect(json[field]).toBe("Upgraded answer.");
    expect(mocks.chat).toHaveBeenCalledTimes(2);
    expect(mocks.chat.mock.calls[1][1][1].content).toContain("Raw draft.");
    expect(mocks.rows.map((row) => [row.user_id, row.role, row.content])).toEqual([
      ["alice", "user", Object.values(body)[0]],
      ["alice", "assistant", "Upgraded answer."],
    ]);
  });
});
