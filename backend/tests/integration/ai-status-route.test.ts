import express from "express";
import cookieParser from "cookie-parser";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import type { Server } from "node:http";

/**
 * GET /api/ai/status — the configuration probe AiStatusDot polls on every
 * Veer surface. Must report whether any AI provider is wired up, never which
 * one, and never require auth (guests see the dot before signing in).
 */

const providerNames = vi.hoisted(() => ({ list: ["agnes", "gemini"] as string[] }));

vi.mock("../../src/ai/service", () => ({
  createAIService: vi.fn(() => ({
    getProviders: () => providerNames.list,
  })),
}));

import chatRouter from "../../src/api/ai/chat.controller";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/ai", chatRouter);

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no port");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise((resolve) => server?.close(resolve));
});

describe("GET /api/ai/status", () => {
  test("configured: true when at least one provider is wired", async () => {
    providerNames.list = ["agnes", "gemini"];
    const res = await fetch(`${baseUrl}/api/ai/status`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { configured: boolean; online: boolean };
    expect(body.configured).toBe(true);
    expect(body.online).toBe(true);
  });

  test("configured: false when no provider is wired (dot reads offline, not a 500)", async () => {
    providerNames.list = [];
    const res = await fetch(`${baseUrl}/api/ai/status`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { configured: boolean; online: boolean };
    expect(body.configured).toBe(false);
    expect(body.online).toBe(false);
  });
});
