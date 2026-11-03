import express from "express";
import type { Request, Response } from "express";
import type { Server } from "node:http";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  chat: vi.fn(),
  stream: vi.fn(),
  rows: [] as Array<{ user_id: string; session: string; role: string; content: string; created_at?: string }>,
}));

vi.mock("../../src/db/supabase", () => ({
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
vi.mock("../../src/ai/search-engine", () => ({ getSearchService: () => ({ isEnabled: () => false }) }));
vi.mock("../../src/ai/diagram-search", () => ({ DIAGRAM_TIMEOUT_MS: 10, fetchDiagramContext: async () => "" }));
vi.mock("../../src/ai/curriculum-retrieval", async (original) => {
  const actual = await original<typeof import("../../src/ai/curriculum-retrieval")>();
  return { ...actual, buildCurriculumContext: () => "" };
});
vi.mock("../../src/ai/prompts", () => ({
  buildProfessorContext: async () => "teacher context",
  appendConsoleRules: (context: string) => context,
  withProfessorContext: (messages: unknown[]) => messages,
}));
vi.mock("../../src/ai/service", () => ({ createAIService: () => ({
  chat: mocks.chat,
  chatStream: mocks.stream,
  getLastFinishReason: () => "stop",
  getLastAnsweredBy: () => "test",
}) }));
vi.mock("../../src/middleware/auth", async (original) => {
  const actual = await original<typeof import("../../src/middleware/auth")>();
  const attach = (req: Request) => { (req as Request & { user: unknown }).user = { id: String(req.headers["x-test-user"] || "alice"), email: [...actual.OWNER_EMAILS][0] }; };
  return { ...actual, requireAuth: (req: Request, _res: Response, next: () => void) => { attach(req); next(); }, getUserFromRequest: async (req: Request) => { attach(req); return (req as Request & { user: unknown }).user; } };
});
vi.mock("../../src/middleware/aiSparkGate", () => ({
  aiSparkGateIfAuthed: (_req: Request, _res: Response, next: () => void) => next(),
  requirePlusAiStudio: () => (_req: Request, _res: Response, next: () => void) => next(),
}));

import chatRoutes from "../../src/api/ai";
import mathRoutes from "../../src/api/ai-math";
import deepRoutes from "../../src/api/ai-deep-dive";
import { deepConceptResearch, relatedHistory, shouldUpgradeAcademic } from "../../src/ai/complete-answer";

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
});
afterAll(async () => { await new Promise<void>((resolve) => server.close(() => resolve())); });
beforeEach(() => {
  mocks.rows.length = 0;
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
  });
  it("rebuilds non-streaming academic answers without exposing the draft", async () => {
    const res = await post("/chat", { messages: [{ role: "user", content: "Explain capacitor" }] });
    const json = await res.json() as { response: string };
    expect(res.status).toBe(200);
    expect(json.response).toBe("Upgraded answer.");
    expect(mocks.chat).toHaveBeenCalledTimes(2);
    expect(mocks.chat.mock.calls[1][1][0].content).toContain("DEEP-CONCEPT ANSWER UPGRADE");
  });
  it("reports a failed upgrade instead of returning the raw draft", async () => {
    mocks.chat.mockReset().mockResolvedValueOnce("Raw draft.").mockRejectedValueOnce(new Error("provider unavailable"));
    const res = await post("/chat", { messages: [{ role: "user", content: "Explain capacitor" }] });
    expect(res.status).toBeGreaterThanOrEqual(500);
    expect(await res.text()).not.toContain("Raw draft.");
  });
  it("does not upgrade a casual message", async () => {
    const res = await post("/chat", { messages: [{ role: "user", content: "hello" }] });
    expect((await res.json() as { response: string }).response).toBe("Raw draft.");
    expect(mocks.chat).toHaveBeenCalledTimes(1);
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
