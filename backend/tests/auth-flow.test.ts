import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi, type Mock } from "vitest";

vi.mock("../src/db/supabase", () => ({
  supabaseAdmin: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
      admin: { updateUserById: vi.fn() },
    },
    from: vi.fn(),
  },
}));

// Routers owned by another agent (resources/progress/bookmarks) are under
// active concurrent edits; stub them so mounting the full app stays stable.
// Auth behaviour itself is probed via the real requireAuth below.
vi.mock("../src/api/progress", async () => {
  const { Router } = await import("express");
  return { default: Router() };
});
vi.mock("../src/api/bookmarks", async () => {
  const { Router } = await import("express");
  return { default: Router() };
});
vi.mock("../src/api/resources", async () => {
  const { Router } = await import("express");
  return { default: Router() };
});

import { createApp } from "../src/app";
import { supabaseAdmin } from "../src/db/supabase";
import { requireAuth, requireRole, requireAdmin } from "../src/middleware/auth";

const mocked = supabaseAdmin as unknown as {
  auth: {
    signInWithPassword: Mock;
    signUp: Mock;
    getUser: Mock;
    signOut: Mock;
    admin: { updateUserById: Mock };
  };
  from: Mock;
};

const VALID_TOKEN = "valid-access-token";

function makeQueryChain(result: { data: unknown; error: unknown }) {
  const chain: Record<string, unknown> = {};
  for (const method of ["select", "eq", "order", "single", "maybeSingle", "limit", "upsert"]) {
    chain[method] = () => chain;
  }
  chain.then = (
    onFulfilled?: (value: { data: unknown; error: unknown }) => unknown,
    onRejected?: (reason: unknown) => unknown,
  ) => Promise.resolve({ data: result.data, error: result.error }).then(onFulfilled, onRejected);
  return chain;
}

function mockProfiles(profileData: unknown, profileError: unknown = null) {
  mocked.from.mockImplementation((table: string) => {
    if (table === "profiles") {
      return makeQueryChain({ data: profileData, error: profileError });
    }
    return makeQueryChain({ data: [], error: null });
  });
}

let server: ReturnType<Express["listen"]>;
let baseUrl: string;

let probeServer: ReturnType<Express["listen"]>;
let probeUrl: string;

function listen(app: express.Express): Promise<{ url: string; server: ReturnType<Express["listen"]> }> {
  return new Promise((resolve) => {
    const srv = app.listen(0, () => {
      const address = srv.address();
      const port = address && typeof address === "object" ? address.port : 0;
      resolve({ url: `http://127.0.0.1:${port}`, server: srv });
    });
  });
}

async function startServers() {
  const main = await listen(createApp());
  server = main.server;
  baseUrl = main.url;

  const probeApp = express();
  probeApp.use(express.json());
  probeApp.use(cookieParser());
  probeApp.get("/api/progress", requireAuth, (_req, res) => {
    res.status(200).json([]);
  });
  probeApp.get("/api/guard-admin", requireAuth, requireAdmin, (_req, res) => {
    res.status(200).json({ ok: "admin-or-owner" });
  });
  probeApp.get("/api/guard-owner", requireAuth, requireRole("OWNER"), (_req, res) => {
    res.status(200).json({ ok: "owner" });
  });

  const probe = await listen(probeApp);
  probeServer = probe.server;
  probeUrl = probe.url;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocked.auth.signOut.mockResolvedValue({ data: {}, error: null });
});

beforeAll(async () => {
  await startServers();
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
  await new Promise<void>((resolve, reject) => {
    probeServer.close((err) => (err ? reject(err) : resolve()));
  });
});

function setCookiesOf(res: Response): string[] {
  const anyHeaders = res.headers as Headers & { getSetCookie?: () => string[] };
  if (typeof anyHeaders.getSetCookie === "function") {
    return anyHeaders.getSetCookie();
  }
  const single = res.headers.get("set-cookie");
  return single ? [single] : [];
}

describe("auth flow", () => {
  test("login success returns 200 and sets sb-access-token session cookie", async () => {
    mocked.auth.signInWithPassword.mockResolvedValue({
      data: {
        user: { id: "user-1", email: "student@example.com" },
        session: { access_token: VALID_TOKEN, expires_in: 3600 },
      },
      error: null,
    });
    mockProfiles({ role: "STUDENT" });

    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@example.com", password: "password123" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user).toMatchObject({ id: "user-1", email: "student@example.com", role: "STUDENT" });

    const cookies = setCookiesOf(res);
    const sessionCookie = cookies.find((c) => c.startsWith("sb-access-token="));
    expect(sessionCookie).toBeDefined();
    expect(sessionCookie).toContain(`sb-access-token=${VALID_TOKEN}`);
    expect(sessionCookie?.toLowerCase()).toContain("httponly");
    expect(sessionCookie?.toLowerCase()).toContain("samesite=lax");
    expect(sessionCookie?.toLowerCase()).toContain("max-age=3600");
    expect(mocked.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "student@example.com",
      password: "password123",
    });
  });

  test("login with invalid payload returns 400", async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "not-an-email" }),
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid email or password format" });
    expect(mocked.auth.signInWithPassword).not.toHaveBeenCalled();
  });

  test("GET /me without cookie returns 401 Unauthorized", async () => {
    const res = await fetch(`${baseUrl}/api/auth/me`);

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });

  test("GET /me with valid token cookie returns 200 and user object", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
      error: null,
    });
    mockProfiles({ role: "TEACHER" });

    const res = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user).toMatchObject({
      id: "user-1",
      email: "student@example.com",
      role: "TEACHER",
    });
    expect(mocked.auth.getUser).toHaveBeenCalledWith(VALID_TOKEN);
  });

  test("protected route GET /api/progress with valid cookie passes requireAuth (not 401)", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
      error: null,
    });
    mockProfiles({ role: "STUDENT" });

    const res = await fetch(`${probeUrl}/api/progress`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });

    expect(res.status).not.toBe(401);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([]);

    const denied = await fetch(`${probeUrl}/api/progress`);
    expect(denied.status).toBe(401);
  });

  test("logout clears sb-access-token cookie and responds ok", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
      error: null,
    });
    mockProfiles({ role: "STUDENT" });

    const res = await fetch(`${baseUrl}/api/auth/logout`, {
      method: "POST",
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    const cookies = setCookiesOf(res);
    const cleared = cookies.find((c) => c.startsWith("sb-access-token="));
    expect(cleared).toBeDefined();
    expect(cleared).toMatch(/expires=thu, 01 jan 1970/i);
    expect(mocked.auth.signOut).toHaveBeenCalledWith(VALID_TOKEN);
  });

  test("logout still clears cookie even when supabase signOut rejects", async () => {
    mocked.auth.signOut.mockRejectedValue(new Error("network down"));

    const res = await fetch(`${baseUrl}/api/auth/logout`, {
      method: "POST",
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const cookies = setCookiesOf(res);
    const cleared = cookies.find((c) => c.startsWith("sb-access-token="));
    expect(cleared).toBeDefined();
    expect(cleared).toMatch(/expires=thu, 01 jan 1970/i);
  });

  test("GET /me with invalid token returns 401", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: {},
      error: { message: "Invalid JWT", status: 401 },
    });

    const res = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: `sb-access-token=bogus-token` },
    });

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });
  test("POST /refresh with valid token returns 200, refreshed cookie, and extended user", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
      error: null,
    });
    mockProfiles({ role: "STUDENT", credits: 40, credits_limit: 100, premium_status: false });

    const res = await fetch(`${baseUrl}/api/auth/refresh`, {
      method: "POST",
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}`, "Content-Type": "application/json" },
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.accessToken).toBe(VALID_TOKEN);
    expect(body.user).toMatchObject({
      id: "user-1",
      email: "student@example.com",
      role: "STUDENT",
      credits: 40,
      creditsLimit: 100,
      premiumStatus: false,
    });
    const cookies = setCookiesOf(res);
    expect(cookies.find((c) => c.startsWith("sb-access-token="))).toBeDefined();
  });

  test("POST /refresh without any token returns 401", async () => {
    const res = await fetch(`${baseUrl}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "No session to refresh" });
  });

  test("POST /refresh with an invalid token returns 401 (invalid/expired)", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: {},
      error: { message: "Invalid JWT", status: 401 },
    });

    const res = await fetch(`${baseUrl}/api/auth/refresh`, {
      method: "POST",
      headers: { Cookie: "sb-access-token=bogus-token", "Content-Type": "application/json" },
    });
    expect(res.status).toBe(401);
  });

  test("POST /signup (confirmed) returns 200 with user, accessToken, and cookie", async () => {
    mocked.auth.signUp.mockResolvedValue({
      data: {
        user: { id: "user-9", email: "new@example.com" },
        session: { access_token: "fresh-token", expires_in: 3600 },
      },
      error: null,
    });
    mockProfiles({ role: "STUDENT", credits: 0, credits_limit: 100, premium_status: false });

    const res = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "new@example.com", password: "password123", fullName: "New" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.accessToken).toBe("fresh-token");
    expect(body.user).toMatchObject({ id: "user-9", email: "new@example.com", role: "STUDENT" });
    expect(setCookiesOf(res).some((c) => c.startsWith("sb-access-token="))).toBe(true);
  });

  test("POST /signup (needs email confirmation) returns 202 with a message", async () => {
    mocked.auth.signUp.mockResolvedValue({
      data: { user: { id: "user-9", email: "pending@example.com" }, session: null },
      error: null,
    });
    mocked.auth.admin.updateUserById.mockResolvedValue({});
    mocked.auth.signInWithPassword.mockResolvedValue({
      data: { user: { id: "user-9", email: "pending@example.com" }, session: null },
      error: null,
    });

    const res = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "pending@example.com", password: "password123" }),
    });

    expect(res.status).toBe(202);
    const body = await res.json();
    expect(body.user).toBeNull();
    expect(body.accessToken).toBeNull();
    expect(body.message).toMatch(/Check your email/i);
  });

  test("POST /signup with a weak password returns 400", async () => {
    const res = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "bad@example.com", password: "short" }),
    });
    expect(res.status).toBe(400);
  });

  test("role guard: /api/guard-admin rejects STUDENT (403) and allows ADMIN/OWNER (200)", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "s@example.com" } },
      error: null,
    });
    mockProfiles({ role: "STUDENT" });
    const denied = await fetch(`${probeUrl}/api/guard-admin`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });
    expect(denied.status).toBe(403);

    mockProfiles({ role: "ADMIN" });
    const ok = await fetch(`${probeUrl}/api/guard-admin`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });
    expect(ok.status).toBe(200);
    expect(await ok.json()).toEqual({ ok: "admin-or-owner" });

    mockProfiles({ role: "OWNER" });
    const owner = await fetch(`${probeUrl}/api/guard-admin`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });
    expect(owner.status).toBe(200);
  });

  test("role guard: /api/guard-owner rejects ADMIN (403) and allows OWNER (200)", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "a@example.com" } },
      error: null,
    });
    mockProfiles({ role: "ADMIN" });
    const denied = await fetch(`${probeUrl}/api/guard-owner`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });
    expect(denied.status).toBe(403);

    mockProfiles({ role: "OWNER" });
    const ok = await fetch(`${probeUrl}/api/guard-owner`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });
    expect(ok.status).toBe(200);
    expect(await ok.json()).toEqual({ ok: "owner" });
  });

  test("role guard: unauthenticated requests to guarded routes return 401", async () => {
    const res = await fetch(`${probeUrl}/api/guard-admin`);
    expect(res.status).toBe(401);
  });
});
