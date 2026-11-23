import http from "node:http";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import {
  aiStatusResponseSchema,
  apiV2MetaSchema,
  healthResponseSchema,
} from "../../src/api/contracts/public-schemas.js";

vi.mock("../../src/db/supabase", () => {
  const admin = {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
      refreshSession: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      admin: { updateUserById: vi.fn(), getUserById: vi.fn(), listUsers: vi.fn() },
    },
    from: vi.fn(),
  };
  return { supabaseAdmin: admin, createAuthClient: () => admin };
});

import { createApp } from "../../src/app.js";
import { resetRateLimits } from "../../src/middleware/rateLimit.js";

describe("public API contract (Zod)", () => {
  let server: http.Server;
  let baseUrl: string;

  beforeAll(async () => {
    const app = createApp();
    server = http.createServer(app);
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  beforeEach(() => {
    resetRateLimits();
  });

  test("GET /health", async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(healthResponseSchema.safeParse(body).success).toBe(true);
  });

  test("GET /api/ai/status", async () => {
    const res = await fetch(`${baseUrl}/api/ai/status`);
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    const body = await res.json();
    expect(aiStatusResponseSchema.safeParse(body).success).toBe(true);
  });

  test("GET /api/v2/health", async () => {
    const res = await fetch(`${baseUrl}/api/v2/health`);
    expect(res.status).toBe(200);
    expect(res.headers.get("x-api-version")).toBe("2");
    const body = await res.json();
    expect(healthResponseSchema.safeParse(body).success).toBe(true);
  });

  test("GET /api/v2/ai/status", async () => {
    const res = await fetch(`${baseUrl}/api/v2/ai/status`);
    expect(res.status).toBe(200);
    expect(res.headers.get("x-api-version")).toBe("2");
    const body = await res.json();
    expect(aiStatusResponseSchema.safeParse(body).success).toBe(true);
  });

  test("GET /api/v2/meta", async () => {
    const res = await fetch(`${baseUrl}/api/v2/meta`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(apiV2MetaSchema.safeParse(body).success).toBe(true);
    expect(body.requirements.legal.privacy).toMatch(/\/legal\/privacy$/);
    expect(body.requirements.clients.androidPackage).toBe("com.ravikisan.platform");
  });
});