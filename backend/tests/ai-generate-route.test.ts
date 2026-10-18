import express from "express";
import cookieParser from "cookie-parser";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getUserFromRequest: vi.fn(),
  consumeGuestSlot: vi.fn(),
  issueGuestDeviceCookie: vi.fn(),
  rollbackGuestSlot: vi.fn(),
  chat: vi.fn(),
  getLastAnsweredBy: vi.fn(),
  from: vi.fn(),
  requireCredit: vi.fn(),
}));

vi.mock("../src/middleware/auth", () => ({
  getUserFromRequest: mocks.getUserFromRequest,
}));
vi.mock("../src/utils/guestQuota", () => ({
  GUEST_DAILY_LIMIT: 1,
  consumeGuestSlot: mocks.consumeGuestSlot,
  getGuestDeviceId: () => "a1b2c3d4e5f6a7b8a1b2c3d4e5f6a7b8",
  issueGuestDeviceCookie: mocks.issueGuestDeviceCookie,
  rollbackGuestSlot: mocks.rollbackGuestSlot,
}));
vi.mock("../src/db/supabase", () => ({
  supabaseAdmin: { from: mocks.from },
}));
vi.mock("../src/middleware/creditCheck", () => ({
  requireCredit: () => (_req: unknown, _res: unknown, next: () => void) => next(),
}));
vi.mock("../src/ai/service", () => ({
  createAIService: () => ({
    chat: mocks.chat,
    getLastAnsweredBy: mocks.getLastAnsweredBy,
  }),
}));

import aiGenerateRoutes from "../src/api/ai-generate";

let server: ReturnType<express.Express["listen"]>;
let baseUrl: string;

function makeQueryChain(value: { data: unknown; error: unknown }) {
  const chain: Record<string, unknown> = {};
  for (const method of ["select", "eq", "in", "single"]) chain[method] = () => chain;
  chain.then = (resolve?: (v: typeof value) => unknown, reject?: (e: unknown) => unknown) =>
    Promise.resolve(value).then(resolve, reject);
  return chain;
}

beforeAll(async () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/ai/generate-questions", aiGenerateRoutes);
  await new Promise<void>((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Quiz test server did not bind");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => server.close((err) => err ? reject(err) : resolve()));
});

beforeEach(() => {
  vi.clearAllMocks();
  mocks.getUserFromRequest.mockResolvedValue({ id: "student-1", email: "student@example.test", role: "STUDENT" });
  mocks.consumeGuestSlot.mockResolvedValue({ status: "ok", remaining: 0 });
  mocks.requireCredit.mockImplementation(() => (_req: unknown, _res: unknown, next: () => void) => next());
  mocks.from.mockImplementation(() => makeQueryChain({ data: null, error: null }));
  mocks.chat.mockResolvedValue(JSON.stringify({
    questions: [{
      prompt: "A 2 kg object accelerates at 3 m/s². What is the net force?",
      options: ["6 N", "5 N", "1.5 N", "9 N"],
      correctIndex: 0,
      difficulty: "intermediate",
      subject: "Physics",
      topic: "Newton's second law",
      explanation: "F = ma = 2 × 3 = 6 N.",
    }],
  }));
  mocks.getLastAnsweredBy.mockReturnValue("agnes");
});

async function post(payload: unknown) {
  const response = await fetch(`${baseUrl}/api/ai/generate-questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  let responseBody: Record<string, unknown>;
  try {
    responseBody = JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error(`Expected JSON response, got HTTP ${response.status}: ${text.slice(0, 200)}`);
  }
  return { status: response.status, body: responseBody };
}

describe("POST /api/ai/generate-questions", () => {
  test("returns well-formed generated questions to an authenticated student", async () => {
    const result = await post({ classSlug: "class-11-notes", subjectSlug: "physics", count: 1 });
    expect(result.status).toBe(200);
    expect(result.body.questions).toHaveLength(1);
    expect(result.body.provider).toBe("agnes");
    expect(mocks.chat).toHaveBeenCalledOnce();
  });

  test("rejects a non-finite question count instead of passing NaN to the prompt", async () => {
    const result = await post({ classSlug: "class-11-notes", subjectSlug: "physics", count: "many" });
    expect(result.status).toBe(400);
    expect(mocks.chat).not.toHaveBeenCalled();
  });

  test("does not return a successful empty quiz when every model question is malformed", async () => {
    mocks.chat.mockResolvedValue(JSON.stringify({
      questions: [{ prompt: " ", options: ["only one option"], correctIndex: 8 }],
    }));
    const result = await post({ classSlug: "class-11-notes", subjectSlug: "physics", count: 5 });
    expect(result.status).toBe(502);
    expect(result.body).toMatchObject({ error: "Veer returned no valid questions" });
  });

  test("rejects invalid correct answers and non-string choices rather than coercing them", async () => {
    mocks.chat.mockResolvedValue(JSON.stringify({
      questions: [{ prompt: "Choose the correct force unit", options: ["N", 2, "kg", "m"], correctIndex: 8 }],
    }));
    const result = await post({ classSlug: "class-11-notes", subjectSlug: "physics", count: 1 });
    expect(result.status).toBe(502);
    expect(result.body).toMatchObject({ error: "Veer returned no valid questions" });
  });
});
