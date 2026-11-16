import http from "node:http";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";

// Self-contained supabaseAdmin mock (copy pattern from auth-flow.test.ts) so
// the full createApp() router tree mounts without real env vars.
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

import { createApp } from "../../src/app";
import {
  createFunctionHandler,
  normalizeFunctionPath,
  wrapAppForFunctions,
} from "../../src/utils/function-entry";
import { resetRateLimits } from "../../src/middleware/rateLimit";

// ───────────────────────────────────────────────────────────────────────────
// This suite pins the FIXED Cloud Functions contract: the `api` function's
// public base URL ends in `/api`, the frontend calls `${base}/api/<path>` and
// `${base}/health`, and Cloud Functions may deliver the request path either
// WITH the function-name prefix ("/api/api/x", "/api/health") or WITHOUT it
// ("/api/x", "/health"). Both delivery forms must reach createApp()'s routes.
// ───────────────────────────────────────────────────────────────────────────

describe("normalizeFunctionPath (fixed contract)", () => {
  test("strips the first /api segment from the with-prefix forms", () => {
    expect(normalizeFunctionPath("/api/api/auth/login")).toBe("/api/auth/login");
    expect(normalizeFunctionPath("/api/api/ai/chat?x=1")).toBe("/api/ai/chat?x=1");
    expect(normalizeFunctionPath("/api/health")).toBe("/health");
    expect(normalizeFunctionPath("/api/health?probe=1")).toBe("/health?probe=1");
    expect(normalizeFunctionPath("/api/api")).toBe("/api");
    expect(normalizeFunctionPath("/api/api/")).toBe("/api/");
  });

  test("passes every other form through unchanged", () => {
    expect(normalizeFunctionPath("/api/auth/login")).toBe("/api/auth/login");
    expect(normalizeFunctionPath("/api/ai/status")).toBe("/api/ai/status");
    expect(normalizeFunctionPath("/health")).toBe("/health");
    expect(normalizeFunctionPath("/health?probe=1")).toBe("/health?probe=1");
    expect(normalizeFunctionPath("/")).toBe("/");
  });
});

describe("function entry dispatching createApp()", () => {
  let server: http.Server;
  let baseUrl: string;

  beforeAll(async () => {
    const handler = wrapAppForFunctions(createApp());
    server = http.createServer((req, res) => handler(req, res));
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  beforeEach(() => {
    resetRateLimits();
  });

  test("health responds when delivered WITH the function-name prefix (/api/health)", async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string; timestamp: string };
    expect(body.status).toBe("ok");
    expect(typeof body.timestamp).toBe("string");
  });

  test("health responds when delivered WITHOUT the prefix (/health)", async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string };
    expect(body.status).toBe("ok");
  });

  test("API routes answer in both delivery forms (/api/api/ai/status and /api/ai/status)", async () => {
    for (const path of ["/api/api/ai/status", "/api/ai/status"]) {
      const res = await fetch(`${baseUrl}${path}`);
      expect(res.status).toBe(200);
      const body = (await res.json()) as { configured: boolean; online: boolean };
      expect(typeof body.configured).toBe("boolean");
      expect(body.online).toBe(body.configured);
    }
  });

  test("unknown API routes 404 in both delivery forms", async () => {
    for (const path of ["/api/api/definitely-not-a-route", "/api/definitely-not-a-route"]) {
      const res = await fetch(`${baseUrl}${path}`);
      expect(res.status).toBe(404);
    }
  });

  test("health commit stamp falls back COMMIT_SHA → K_REVISION", async () => {
    const saved = {
      COMMIT_SHA: process.env.COMMIT_SHA,
      K_REVISION: process.env.K_REVISION,
    };
    const restore = () => {
      for (const [key, value] of Object.entries(saved)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    };
    try {
      process.env.COMMIT_SHA = "testsha-000";
      let body = (await (await fetch(`${baseUrl}/api/health`)).json()) as { commit: string };
      expect(body.commit).toBe("testsha-000");

      delete process.env.COMMIT_SHA;
      process.env.K_REVISION = "rev-42";
      body = (await (await fetch(`${baseUrl}/health`)).json()) as { commit: string };
      expect(body.commit).toBe("rev-42");
    } finally {
      restore();
    }
  });

  test("createFunctionHandler answers 503 when the production config gate fails", async () => {
    const saved = {
      NODE_ENV: process.env.NODE_ENV,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      STORAGE_UPLOADS_ENABLED: process.env.STORAGE_UPLOADS_ENABLED,
    };
    const restore = () => {
      for (const [key, value] of Object.entries(saved)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    };
    try {
      process.env.NODE_ENV = "production";
      delete process.env.SUPABASE_URL;
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      delete process.env.STORAGE_UPLOADS_ENABLED;

      const handler = createFunctionHandler();
      const gateServer = http.createServer((req, res) => handler(req, res));
      await new Promise<void>((resolve) => gateServer.listen(0, "127.0.0.1", resolve));
      const gateUrl = `http://127.0.0.1:${(gateServer.address() as AddressInfo).port}`;
      try {
        const res = await fetch(`${gateUrl}/api/health`);
        expect(res.status).toBe(503);
        const body = (await res.json()) as { status: string };
        expect(body.status).toBe("error");
      } finally {
        await new Promise<void>((resolve) => gateServer.close(() => resolve()));
      }
    } finally {
      restore();
    }
  });
});
