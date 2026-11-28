import express, { type NextFunction, type Request, type Response } from "express";
import type { Server } from "node:http";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  const previousBudget = process.env.COMMUNITY_AI_REPLY_MAX_REQUESTS;
  process.env.COMMUNITY_AI_REPLY_MAX_REQUESTS = "2";
  return {
    curateNotes: vi.fn(),
    previousBudget,
  };
});

vi.mock("../../src/middleware/auth.js", () => ({
  requireAuth: (req: Request, _res: Response, next: NextFunction) => {
    const id = req.headers["x-test-user"];
    if (typeof id !== "string" || !id) {
      _res.status(401).json({ error: "Unauthorized" });
      return;
    }
    (req as Request & { user: unknown }).user = {
      id,
      email: `${id}@example.com`,
      role: "member",
      plan: "member",
    };
    next();
  },
}));

vi.mock("../../src/ai/curate-notes.js", () => ({
  curateNotes: mocks.curateNotes,
}));

import curateNotesRouter from "../../src/api/ai/curate-notes.controller.js";
import * as rateLimit from "../../src/middleware/rateLimit.js";
import {
  configureRateLimitStore,
  resetRateLimitStoreForTests,
} from "../../src/middleware/rateLimitStore.js";

let server: Server;
let base: string;

beforeAll(async () => {
  const app = express();
  app.use(express.json());
  app.use("/api/ai/curate-notes", curateNotesRouter);
  server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("No test port");
  base = `http://127.0.0.1:${address.port}/api/ai/curate-notes`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  if (mocks.previousBudget === undefined) delete process.env.COMMUNITY_AI_REPLY_MAX_REQUESTS;
  else process.env.COMMUNITY_AI_REPLY_MAX_REQUESTS = mocks.previousBudget;
});

beforeEach(() => {
  resetRateLimitStoreForTests();
  mocks.curateNotes.mockReset();
  mocks.curateNotes.mockResolvedValue({ provider: "agnes", sections: [], bulletCount: 0 });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  resetRateLimitStoreForTests();
});

const sendRequest = globalThis.fetch;

function curate(userId: string) {
  return sendRequest(base, {
    method: "POST",
    headers: { "content-type": "application/json", "x-test-user": userId },
    body: JSON.stringify({ place: { surface: "chapter-tab", subject: "Physics" } }),
  });
}

describe("paid AI generation budget", () => {
  it("reserves budget before invoking the provider", async () => {
    const events: string[] = [];
    const reservation = vi.spyOn(rateLimit, "reserveCommunityAiReply").mockImplementation(async () => {
      events.push("reserve");
      return true;
    });
    mocks.curateNotes.mockImplementation(async () => {
      events.push("generate");
      return { provider: "agnes", sections: [], bulletCount: 0 };
    });

    const response = await curate("student-a");

    expect(response.status).toBe(200);
    expect(reservation).toHaveBeenCalledWith("student-a");
    expect(events).toEqual(["reserve", "generate"]);
  });

  it("stops an exhausted account before invoking the provider", async () => {
    expect((await curate("student-a")).status).toBe(200);
    expect((await curate("student-a")).status).toBe(200);

    const blocked = await curate("student-a");

    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("cache-control")).toContain("no-store");
    expect(mocks.curateNotes).toHaveBeenCalledTimes(2);
  });

  it("keeps the budget scoped to the authenticated account", async () => {
    expect((await curate("student-a")).status).toBe(200);
    expect((await curate("student-a")).status).toBe(200);
    expect((await curate("student-a")).status).toBe(429);

    expect((await curate("student-b")).status).toBe(200);
    expect(mocks.curateNotes).toHaveBeenCalledTimes(3);
  });

  it("fails closed without generation when the shared counter is unavailable", async () => {
    configureRateLimitStore({
      UPSTASH_REDIS_REST_URL: "https://redis.example.test",
      UPSTASH_REDIS_REST_TOKEN: "test-token",
    });
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("redis unavailable")));

    const response = await curate("student-a");

    expect(response.status).toBe(429);
    expect(mocks.curateNotes).not.toHaveBeenCalled();
  });
});
