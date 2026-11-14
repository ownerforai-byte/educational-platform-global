import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi, type Mock } from "vitest";

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
  return {
    supabaseAdmin: admin,
    // Prod uses a throwaway client per auth call (session isolation); the
    // tests reuse the same mock so existing assertions hold.
    createAuthClient: () => admin,
  };
});

import aiGenerateRoutes from "../../src/api/ai/generate.controller";
import aiGuestRoutes from "../../src/api/ai/guest.controller";
import biologyRoutes from "../../src/api/content/biology.controller";
import { createApp } from "../../src/app";
import { supabaseAdmin } from "../../src/db/supabase";
import { resetRateLimits } from "../../src/middleware/rateLimit";
import { requireAuth, requireRole, requireAdmin } from "../../src/middleware/auth";
import { requireCredit, requirePremium } from "../../src/middleware/creditCheck";
import { verifyStatusToken } from "../../src/utils/statusToken";

const mocked = supabaseAdmin as unknown as {
  auth: {
    signInWithPassword: Mock;
    signUp: Mock;
    getUser: Mock;
    signOut: Mock;
    refreshSession: Mock;
    resetPasswordForEmail: Mock;
    admin: { updateUserById: Mock; getUserById: Mock; listUsers: Mock };
  };
  from: Mock;
};

const VALID_TOKEN = "valid-access-token";

function makeQueryChain(result: { data: unknown; error: unknown }) {
  const chain: Record<string, unknown> = {};
  for (const method of ["select", "eq", "neq", "in", "like", "order", "single", "maybeSingle", "limit", "upsert", "update", "insert", "delete"]) {
    chain[method] = vi.fn(() => chain);
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

function mockResolverReads(
  profileData: unknown,
  profileError: unknown = null,
  planData: unknown = { plan: "member", premium_status: false },
) {
  const chains = [
    makeQueryChain({ data: profileData, error: profileError }),
    makeQueryChain({ data: { full_name: null }, error: null }),
    makeQueryChain({ data: planData, error: null }),
  ];
  mocked.from.mockImplementation(() => makeQueryChain({ data: [], error: null }));
  for (const chain of chains) mocked.from.mockImplementationOnce(() => chain);
  return chains;
}

function expectOnlyResolverReads(chains: ReturnType<typeof makeQueryChain>[], userId: string) {
  expect(mocked.from.mock.calls).toEqual([["profiles"], ["profiles"], ["profiles"]]);
  const columns = ["role, access_status", "full_name", "plan, premium_status"];
  chains.forEach((chain, index) => {
    expect(chain.select).toHaveBeenCalledExactlyOnceWith(columns[index]);
    expect(chain.eq).toHaveBeenCalledExactlyOnceWith("id", userId);
    for (const method of ["insert", "update", "upsert", "delete"]) {
      expect(chain[method]).not.toHaveBeenCalled();
    }
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
  probeApp.get("/api/guard-owner", requireAuth, requireRole("owner"), (_req, res) => {
    res.status(200).json({ ok: "owner" });
  });
  // Standalone credit gates exercise their fallback profile read, not req.user.
  probeApp.get("/api/guard-premium", requirePremium, (_req, res) => {
    res.status(200).json({ ok: true });
  });
  probeApp.get("/api/guard-credit", requireCredit("progress"), (_req, res) => {
    res.status(200).json({ ok: true });
  });

  // Real routers (not stubs): verify the security hardening end to end.
  probeApp.use("/api/ai/generate-questions", aiGenerateRoutes);
  probeApp.use("/api/ai/guest", aiGuestRoutes);
  probeApp.use("/api/biology", biologyRoutes);

  const probe = await listen(probeApp);
  probeServer = probe.server;
  probeUrl = probe.url;
}

beforeEach(() => {
  vi.clearAllMocks();
  // Discard any unused FIFO implementations before the next auth fixture.
  mocked.from.mockReset();
  mocked.from.mockImplementation(() => makeQueryChain({ data: [], error: null }));
  mocked.auth.signOut.mockResolvedValue({ data: {}, error: null });
  mocked.auth.getUser.mockResolvedValue({
    data: { user: { id: "oauth-user", email: "google@example.com", user_metadata: { full_name: "Google Student" } } },
    error: null,
  });
  // The tiered limiter (strict 10/min on auth endpoints) must not leak hits
  // between tests — the suite makes many refresh/login calls per IP.
  resetRateLimits();
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
  test("OAuth CSRF endpoint issues a short-lived, origin-checked state cookie", async () => {
    const res = await fetch(`${baseUrl}/api/auth/oauth/csrf`, {
      method: "POST",
      headers: { Origin: "http://localhost:5173" },
    });
    expect(res.status).toBe(200);
    const body = await res.json() as { csrfToken: string };
    expect(body.csrfToken).toMatch(/^[a-f0-9]{64}$/);
    expect(res.headers.get("cache-control")).toBe("no-store");
    const cookie = setCookiesOf(res).find((value) => value.startsWith("oauth-csrf-token="));
    expect(cookie).toContain(`oauth-csrf-token=${body.csrfToken}`);
    expect(cookie?.toLowerCase()).toContain("httponly");
    expect(cookie?.toLowerCase()).toContain("samesite=lax");
  });

  test("OAuth CSRF endpoint rejects untrusted and missing origins", async () => {
    for (const origin of [undefined, "https://attacker.example"]) {
      const res = await fetch(`${baseUrl}/api/auth/oauth/csrf`, {
        method: "POST",
        headers: origin ? { Origin: origin } : {},
      });
      expect(res.status).toBe(403);
      expect(res.headers.get("cache-control")).toBe("no-store");
      expect(setCookiesOf(res).some((cookie) => cookie.startsWith("oauth-csrf-token="))).toBe(false);
    }
  });

  test("OAuth session rejects missing CSRF and invalid Supabase tokens", async () => {
    const missingCsrf = await fetch(`${baseUrl}/api/auth/oauth/session`, {
      method: "POST",
      headers: { Origin: "http://localhost:5173", "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken: "token", refreshToken: "refresh", state: "a".repeat(64) }),
    });
    expect(missingCsrf.status).toBe(403);
    expect(missingCsrf.headers.get("cache-control")).toBe("no-store");

    const state = "b".repeat(64);
    mocked.auth.getUser.mockResolvedValueOnce({ data: {}, error: { message: "Invalid token" } });
    const invalidToken = await fetch(`${baseUrl}/api/auth/oauth/session`, {
      method: "POST",
      headers: {
        Origin: "http://localhost:5173",
        Cookie: `oauth-csrf-token=${state}`,
        "X-CSRF-Token": state,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: "token", refreshToken: "refresh", state }),
    });
    expect(invalidToken.status).toBe(401);
    expect(invalidToken.headers.get("cache-control")).toBe("no-store");
  });

  test("OAuth session validates the user, enforces owner approval and sets app cookies", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "oauth-user", email: "google@example.com", user_metadata: { full_name: "Google Student" }, app_metadata: { provider: "google" } } },
      error: null,
    });
    mockProfiles({ role: "member", access_status: "ACTIVE", credits: 7, credits_limit: 100, premium_status: false });
    const state = "c".repeat(64);

    const res = await fetch(`${baseUrl}/api/auth/oauth/session`, {
      method: "POST",
      headers: {
        Origin: "http://localhost:5173",
        Cookie: `oauth-csrf-token=${state}`,
        "X-CSRF-Token": state,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: VALID_TOKEN, refreshToken: "valid-refresh", state }),
    });

    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toMatchObject({
      user: { id: "oauth-user", email: "google@example.com", fullName: "Google Student" },
      accessToken: VALID_TOKEN,
    });
    expect(mocked.auth.getUser).toHaveBeenCalledWith(VALID_TOKEN);
    const cookies = setCookiesOf(res);
    expect(cookies.some((cookie) => cookie.startsWith(`sb-access-token=${VALID_TOKEN}`))).toBe(true);
    expect(cookies.some((cookie) => cookie.startsWith("sb-refresh-token=valid-refresh"))).toBe(true);
    expect(mocked.auth.getUser).toHaveBeenCalledWith(VALID_TOKEN);
  });

  test("OAuth session rejects providers outside the allowlist before issuing application cookies", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "11111111-1111-4111-8111-111111111111", email: "student@example.com", app_metadata: { provider: "github" } } },
      error: null,
    });
    const state = "e".repeat(64);
    const res = await fetch(`${baseUrl}/api/auth/oauth/session`, {
      method: "POST",
      headers: {
        Origin: "http://localhost:5173",
        Cookie: `oauth-csrf-token=${state}`,
        "X-CSRF-Token": state,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: VALID_TOKEN, refreshToken: "refresh", state }),
    });
    expect(res.status).toBe(401);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(setCookiesOf(res).some((cookie) => cookie.startsWith("sb-access-token="))).toBe(false);
  });

  test("OAuth session rejects Facebook identities (provider not wired)", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: "oauth-user",
          email: "student@example.com",
          app_metadata: { provider: "facebook" },
        },
      },
      error: null,
    });
    const state = "f".repeat(64);
    const res = await fetch(`${baseUrl}/api/auth/oauth/session`, {
      method: "POST",
      headers: {
        Origin: "http://localhost:5173",
        Cookie: `oauth-csrf-token=${state}`,
        "X-CSRF-Token": state,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: VALID_TOKEN, refreshToken: "refresh", state }),
    });
    expect(res.status).toBe(401);
    expect(setCookiesOf(res).some((cookie) => cookie.startsWith("sb-access-token="))).toBe(false);
  });

  test("OAuth session accepts Google sign-ins linked to an existing email account", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: "oauth-user",
          email: "ownerforai@example.com",
          user_metadata: { full_name: "Linked Student" },
          app_metadata: { provider: "email", providers: ["email", "google"] },
          identities: [{ provider: "email" }, { provider: "google" }],
        },
      },
      error: null,
    });
    mockProfiles({ role: "member", access_status: "ACTIVE", credits: 7, credits_limit: 100, premium_status: false });
    const state = "9".repeat(64);

    const res = await fetch(`${baseUrl}/api/auth/oauth/session`, {
      method: "POST",
      headers: {
        Origin: "http://localhost:5173",
        Cookie: `oauth-csrf-token=${state}`,
        "X-CSRF-Token": state,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: VALID_TOKEN, refreshToken: "valid-refresh", state }),
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({
      user: { id: "oauth-user", email: "ownerforai@example.com", fullName: "Linked Student" },
      accessToken: VALID_TOKEN,
    });
    expect(setCookiesOf(res).some((cookie) => cookie.startsWith("sb-access-token="))).toBe(true);
  });

  test("OAuth session routes pending accounts to the waiting screen without issuing cookies", async () => {
    const userId = "11111111-1111-4111-8111-111111111111";
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: userId, email: "google@example.com", app_metadata: { provider: "google" } } },
      error: null,
    });
    mockProfiles({ access_status: "PENDING" });
    const state = "d".repeat(64);
    const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-status-signing-key";
    try {
      const res = await fetch(`${baseUrl}/api/auth/oauth/session`, {
        method: "POST",
        headers: {
          Origin: "http://localhost:5173",
          Cookie: `oauth-csrf-token=${state}`,
          "X-CSRF-Token": state,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: VALID_TOKEN, refreshToken: "refresh", state }),
      });
      // PENDING is not a deny: 200 + statusToken so the client shows the
      // waiting screen while the auto-approval bot runs (contract 2026).
      expect(res.status).toBe(200);
      expect(res.headers.get("cache-control")).toBe("no-store");
      const payload = await res.json();
      expect(payload).toMatchObject({
        code: "PENDING_APPROVAL",
        accessStatus: "PENDING",
        user: null,
        accessToken: null,
      });
      expect(verifyStatusToken(payload.statusToken)).toBe(userId);
      expect(setCookiesOf(res).some((cookie) => cookie.startsWith("sb-access-token="))).toBe(false);
    } finally {
      if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    }
  });

  test("login success returns 200 and sets sb-access-token session cookie", async () => {
    mocked.auth.signInWithPassword.mockResolvedValue({
      data: {
        user: { id: "user-1", email: "student@example.com" },
        session: { access_token: VALID_TOKEN, expires_in: 3600 },
      },
      error: null,
    });
    mockProfiles({ role: "member", access_status: "ACTIVE" });

    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@example.com", password: "password123" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user).toMatchObject({ id: "user-1", email: "student@example.com", role: "member" });

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

  test("login returns live plan with the granted Plus tier", async () => {
    mocked.auth.signInWithPassword.mockResolvedValue({
      data: {
        user: { id: "user-plus", email: "plus@example.com" },
        session: { access_token: VALID_TOKEN, expires_in: 3600 },
      },
      error: null,
    });
    // Owner grants write role + plan together (TIER_GRANT.plus).
    mockProfiles({
      role: "plus",
      plan: "plus",
      access_status: "ACTIVE",
      credits: 10,
      credits_limit: 100,
      premium_status: false,
    });

    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "plus@example.com", password: "password123" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user).toMatchObject({
      id: "user-plus",
      email: "plus@example.com",
      role: "plus",
      plan: "plus",
      premiumStatus: false,
    });
  });

  test.each([
    { name: "pending", profile: { role: "member", access_status: "PENDING" }, error: null },
    { name: "rejected", profile: { role: "member", access_status: "REJECTED" }, error: null },
    { name: "unknown status", profile: { role: "member", access_status: "APPROVED" }, error: null },
    { name: "missing status", profile: { role: "member" }, error: null },
    { name: "missing profile", profile: null, error: null },
    { name: "profile lookup failure", profile: null, error: { message: "Unavailable" } },
  ])("login never issues a session for a non-owner with $name", async ({ name, profile, error }) => {
    const userId = "11111111-1111-4111-8111-111111111111";
    mocked.auth.signInWithPassword.mockResolvedValue({
      data: {
        user: { id: userId, email: "student@example.com" },
        session: { access_token: VALID_TOKEN, refresh_token: "refresh-token", expires_in: 3600 },
      },
      error: null,
    });
    mockProfiles(profile, error);
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-status-signing-key");
    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "student@example.com", password: "password123" }),
      });
      // REJECTED stays a hard deny (403); PENDING-ish states get the 200
      // "waiting" contract response — never a session either way.
      expect(res.status).toBe(name === "rejected" ? 403 : 200);
      expect(res.headers.get("cache-control")).toBe("private, no-store");
      const body = await res.json();
      expect(verifyStatusToken(body.statusToken)).toBe(userId);
      if (name === "rejected") {
        expect(body.code).toBe("ACCOUNT_REJECTED");
        expect(body).not.toHaveProperty("accessToken");
        expect(body).not.toHaveProperty("user");
      } else {
        expect(body.code).toBe("PENDING_APPROVAL");
        expect(body.accessStatus).toBe("PENDING");
        expect(body.accessToken).toBeNull();
        expect(body.user).toBeNull();
      }
      expect(setCookiesOf(res)).toEqual([]);
      // PENDING paths fire ensureAccessRequest (user_access_requests); REJECTED does not.
      await vi.waitFor(() => {
        const tables = mocked.from.mock.calls.map((call) => call[0]);
        expect(tables[0]).toBe("profiles");
        if (name === "rejected") {
          expect(tables).toEqual(["profiles"]);
        } else {
          expect(tables).toContain("user_access_requests");
        }
      });
    } finally {
      vi.unstubAllEnvs();
    }
  });

  test.each([
    { email: "sahrocky81@gmail.com", profile: null },
    { email: "operator@example.com", profile: { role: "owner", access_status: "REJECTED" } },
  ])("existing owner $email can still sign in independently", async ({ email, profile }) => {
    mocked.auth.signInWithPassword.mockResolvedValue({
      data: {
        user: { id: "owner-1", email },
        session: { access_token: VALID_TOKEN, expires_in: 3600 },
      },
      error: null,
    });
    mockProfiles(profile);
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "password123" }),
    });
    expect(res.status).toBe(200);
    expect((await res.json()).user.role).toBe("owner");
    expect(res.headers.get("cache-control")).toBe("private, no-store");
    expect(setCookiesOf(res).some((cookie) => cookie.startsWith(`sb-access-token=${VALID_TOKEN}`))).toBe(true);
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
    mockProfiles({ role: "plus", access_status: "ACTIVE" });

    const res = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.user).toMatchObject({
      id: "user-1",
      email: "student@example.com",
      role: "plus",
    });
    expect(mocked.auth.getUser).toHaveBeenCalledWith(VALID_TOKEN);
  });

  test("a same-day page/token refresh never regains the daily credit pool", async () => {
    // Fresh watermark (today) + a spent balance: two consecutive GET /me
    // calls — the exact page-refresh path — must return the SAME balance
    // and never trigger a refill log. Only the UTC rollover may top up.
    const infoSpy = vi.spyOn(console, "info");
    const today = new Date().toISOString().slice(0, 10);
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
      error: null,
    });
    mockProfiles({
      role: "member",
      access_status: "ACTIVE",
      credits: 1,
      credits_reset_date: today,
      premium_status: false,
    });

    const first = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });
    const second = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    const b1 = await first.json();
    const b2 = await second.json();
    expect(b1.user.credits).toBe(1);
    expect(b2.user.credits).toBe(1);
    expect(
      infoSpy.mock.calls.some((c) => String(c[0]).includes("daily reset")),
    ).toBe(false);
    infoSpy.mockRestore();
  });

  test("protected route GET /api/progress with valid cookie passes requireAuth (not 401)", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
      error: null,
    });
    mockProfiles({ role: "member", access_status: "ACTIVE" });

    const res = await fetch(`${probeUrl}/api/progress`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });

    expect(res.status).not.toBe(401);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([]);
    expect(res.headers.get("cache-control")).toBe("private, no-store");

    const denied = await fetch(`${probeUrl}/api/progress`);
    expect(denied.status).toBe(401);
    expect(denied.headers.get("cache-control")).toBe("private, no-store");
  });

  test.each([
    { name: "PENDING", profile: { role: "member", access_status: "PENDING" }, error: null },
    { name: "REJECTED", profile: { role: "member", access_status: "REJECTED" }, error: null },
    { name: "unknown status", profile: { role: "member", access_status: "APPROVED" }, error: null },
    { name: "missing status", profile: { role: "member" }, error: null },
    { name: "missing profile", profile: null, error: null },
    { name: "profile read error", profile: null, error: { message: "Profile unavailable" } },
  ])("valid JWT with $name cannot read private /api/progress", async ({ profile, error }) => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
      error: null,
    });
    const chains = mockResolverReads(profile, error);

    const res = await fetch(`${probeUrl}/api/progress`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
    expect(res.headers.get("cache-control")).toBe("private, no-store");
    expect(mocked.auth.getUser).toHaveBeenCalledExactlyOnceWith(VALID_TOKEN);
    expectOnlyResolverReads(chains, "user-1");
  });

  test("a rejected Pro cannot read /api/progress even with a Pro plan and premium flag", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "pro@example.com" } },
      error: null,
    });
    const chains = mockResolverReads(
      { role: "pro", access_status: "REJECTED" },
      null,
      { plan: "pro", premium_status: true },
    );

    const res = await fetch(`${probeUrl}/api/progress`, {
      headers: { Authorization: `Bearer ${VALID_TOKEN}` },
    });

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
    expect(res.headers.get("cache-control")).toBe("private, no-store");
    expectOnlyResolverReads(chains, "user-1");
  });

  test.each(["guard-premium", "guard-credit"])(
    "%s fallback rejects a rejected Pro before its premium/free-feature bypass",
    async (guard) => {
      mocked.auth.getUser.mockResolvedValue({
        data: { user: { id: "user-1", email: "pro@example.com" } },
        error: null,
      });
      const chain = makeQueryChain({
        data: { role: "pro", access_status: "REJECTED", premium_status: true },
        error: null,
      });
      mocked.from.mockReturnValue(chain);

      const res = await fetch(`${probeUrl}/api/${guard}`, {
        headers: { Authorization: `Bearer ${VALID_TOKEN}` },
      });

      expect(res.status).toBe(401);
      expect(await res.json()).toEqual({ error: "Unauthorized" });
      expect(mocked.from.mock.calls).toEqual([["profiles"]]);
      expect(chain.select).toHaveBeenCalledExactlyOnceWith("role, premium_status, access_status");
      expect(chain.eq).toHaveBeenCalledExactlyOnceWith("id", "user-1");
      for (const method of ["insert", "update", "upsert", "delete"]) {
        expect(chain[method]).not.toHaveBeenCalled();
      }
    },
  );

  test.each([
    { name: "allowlisted owner with unavailable profile", email: "sahrocky81@gmail.com", profile: null, error: { message: "Profile unavailable" } },
    { name: "persisted owner with REJECTED status", email: "operator@example.com", profile: { role: "owner", access_status: "REJECTED" }, error: null },
    { name: "normalized legacy owner with PENDING status", email: "operator@example.com", profile: { role: " ADMIN ", access_status: "PENDING" }, error: null },
  ])("$name retains independent authenticated owner access", async ({ email, profile, error }) => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "owner-1", email } },
      error: null,
    });
    const chains = mockResolverReads(profile, error);

    const res = await fetch(`${probeUrl}/api/guard-owner`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: "owner" });
    expect(res.headers.get("cache-control")).toBe("private, no-store");
    expectOnlyResolverReads(chains, "owner-1");
  });

  test("logout clears sb-access-token cookie and responds ok", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
      error: null,
    });
    mockProfiles({ role: "member", access_status: "ACTIVE" });

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
    mockProfiles({ role: "member", access_status: "ACTIVE", credits: 40, credits_limit: 100, premium_status: false });

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
      role: "member",
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
        session: { access_token: "fresh-token", refresh_token: "fresh-refresh", expires_in: 3600 },
      },
      error: null,
    });
    mockProfiles({ role: "member", access_status: "ACTIVE", credits: 0, credits_limit: 100, premium_status: false });

    const res = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "new@example.com", password: "password123", fullName: "New" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.accessToken).toBe("fresh-token");
    expect(body.user).toMatchObject({ id: "user-9", email: "new@example.com", role: "member" });
    expect(setCookiesOf(res).some((c) => c.startsWith("sb-access-token="))).toBe(true);
    expect(setCookiesOf(res).some((c) => c.startsWith("sb-refresh-token="))).toBe(true);
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
    mockProfiles({ role: "member", access_status: "ACTIVE" });
    const denied = await fetch(`${probeUrl}/api/guard-admin`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });
    expect(denied.status).toBe(403);

    mockProfiles({ role: "pro", access_status: "ACTIVE" });
    const ok = await fetch(`${probeUrl}/api/guard-admin`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });
    expect(ok.status).toBe(200);
    expect(await ok.json()).toEqual({ ok: "admin-or-owner" });

    mockProfiles({ role: "owner" });
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
    mockProfiles({ role: "pro", access_status: "ACTIVE" });
    const denied = await fetch(`${probeUrl}/api/guard-owner`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });
    expect(denied.status).toBe(403);

    mockProfiles({ role: "owner" });
    const ok = await fetch(`${probeUrl}/api/guard-owner`, {
      headers: { Cookie: `sb-access-token=${VALID_TOKEN}` },
    });
    expect(ok.status).toBe(200);
    expect(await ok.json()).toEqual({ ok: "owner" });
  });

  test.each([
    { method: "GET", path: "/api/admin/users", body: undefined },
    { method: "GET", path: "/api/admin/users/target-user", body: undefined },
    { method: "PATCH", path: "/api/admin/users/target-user/credits", body: { amount: 25, reason: "Grant" } },
    { method: "GET", path: "/api/admin/premium-requests", body: undefined },
    { method: "GET", path: "/api/admin/stats", body: undefined },
  ])("ACTIVE Pro is forbidden on real $method $path before downstream data/write", async ({ method, path, body }) => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "pro-user", email: "pro@example.com" } },
      error: null,
    });
    const chains = mockResolverReads(
      { role: "pro", access_status: "ACTIVE" },
      null,
      { plan: "pro", premium_status: true },
    );

    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: { Authorization: `Bearer ${VALID_TOKEN}`, "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: "Forbidden" });
    expect(res.headers.get("cache-control")).toBe("private, no-store");
    expectOnlyResolverReads(chains, "pro-user");
    expect(mocked.auth.admin.listUsers).not.toHaveBeenCalled();
    expect(mocked.auth.admin.getUserById).not.toHaveBeenCalled();
    expect(mocked.auth.admin.updateUserById).not.toHaveBeenCalled();
  });

  test("the real admin premium list remains available to a persisted owner without ACTIVE status", async () => {
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "owner-1", email: "operator@example.com" } },
      error: null,
    });
    mockResolverReads({ role: "owner", access_status: "REJECTED" });

    const res = await fetch(`${baseUrl}/api/admin/premium-requests`, {
      headers: { Authorization: `Bearer ${VALID_TOKEN}` },
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([]);
    expect(res.headers.get("cache-control")).toBe("private, no-store");
    expect(mocked.from.mock.calls).toEqual([
      ["profiles"], ["profiles"], ["profiles"], ["premium_requests"],
    ]);
  });

  test("role guard: unauthenticated requests to guarded routes return 401", async () => {
    const res = await fetch(`${probeUrl}/api/guard-admin`);
    expect(res.status).toBe(401);
  });

  test("POST /refresh with refresh-token cookie rotates to a fresh access token", async () => {
    mocked.auth.refreshSession.mockResolvedValue({
      data: { session: { access_token: "new-access", refresh_token: "new-refresh", expires_in: 3600 } },
      error: null,
    });
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "student@example.com" } },
      error: null,
    });
    mockProfiles({ role: "member", access_status: "ACTIVE", credits: 5, credits_limit: 100, premium_status: false });

    const res = await fetch(`${baseUrl}/api/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: "sb-refresh-token=old-refresh; sb-access-token=expired",
        "Content-Type": "application/json",
      },
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.accessToken).toBe("new-access");
    expect(mocked.auth.refreshSession).toHaveBeenCalledWith({ refresh_token: "old-refresh" });

    const cookies = setCookiesOf(res);
    expect(cookies.some((c) => c.startsWith("sb-access-token=new-access"))).toBe(true);
    expect(cookies.some((c) => c.startsWith("sb-refresh-token=new-refresh"))).toBe(true);
  });

  test.each(["PENDING", "REJECTED"].flatMap((accessStatus) => [
    { accessStatus, method: "GET", path: "/api/auth/me", cookie: `sb-access-token=${VALID_TOKEN}` },
    { accessStatus, method: "POST", path: "/api/auth/refresh", cookie: `sb-access-token=${VALID_TOKEN}` },
    { accessStatus, method: "POST", path: "/api/auth/refresh", cookie: "sb-refresh-token=old-refresh" },
  ]))("$accessStatus $method $path ($cookie) keeps the signed-statusToken 403 path", async ({
    accessStatus, method, path, cookie,
  }) => {
    const userId = "11111111-1111-4111-8111-111111111111";
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: userId, email: "student@example.com" } },
      error: null,
    });
    mocked.auth.refreshSession.mockResolvedValue({
      data: { session: { access_token: "new-access", refresh_token: "new-refresh", expires_in: 3600 } },
      error: null,
    });
    mockProfiles({ role: "member", access_status: accessStatus });
    const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-status-signing-key";
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: { Cookie: cookie, "Content-Type": "application/json" },
      });

      expect(res.status).toBe(403);
      const payload = await res.json();
      expect(payload.code).toBe(accessStatus === "PENDING" ? "PENDING_APPROVAL" : "ACCOUNT_REJECTED");
      expect(verifyStatusToken(payload.statusToken)).toBe(userId);
      expect(payload).not.toHaveProperty("accessToken");
      expect(payload).not.toHaveProperty("user");
      const cleared = setCookiesOf(res).find((value) => value.startsWith("sb-access-token="));
      expect(cleared).toMatch(/expires=thu, 01 jan 1970/i);
      expect(setCookiesOf(res).some((value) => value.startsWith("sb-refresh-token=new-refresh"))).toBe(false);
      // PENDING denial also ensures an access-request row (FCM clock); REJECTED does not.
      await vi.waitFor(() => {
        const tables = mocked.from.mock.calls.map((call) => call[0]);
        expect(tables.filter((table) => table === "profiles").length).toBeGreaterThanOrEqual(4);
        if (accessStatus === "PENDING") {
          expect(tables).toContain("user_access_requests");
        } else {
          expect(tables.every((table) => table === "profiles")).toBe(true);
        }
      });
    } finally {
      if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    }
  });

  test("POST /refresh with an invalid refresh token returns 401", async () => {
    mocked.auth.refreshSession.mockResolvedValue({
      data: { session: null },
      error: { message: "Invalid Refresh Token", status: 401 },
    });

    const res = await fetch(`${baseUrl}/api/auth/refresh`, {
      method: "POST",
      headers: { Cookie: "sb-refresh-token=bogus", "Content-Type": "application/json" },
    });
    expect(res.status).toBe(401);
  });

  test("public AI chat is closed; members use the signed-in route", async () => {
    const res = await fetch(`${probeUrl}/api/ai/guest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "hello" }], stream: true }),
    });

    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error).toBe("Veer chat is for members");
  });

  test("AI question generation is guest-quota-gated (was anonymous unlimited)", async () => {
    // Guests get three messages/day. An exhausted pool must answer 402 before
    // any AI call, regardless of stored count. Anonymous chat is quota-bound.
    mocked.from.mockImplementationOnce(() =>
      makeQueryChain({ data: { count: 999_999 }, error: null }),
    );
    const res = await fetch(`${probeUrl}/api/ai/generate-questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classSlug: "class-11", subjectSlug: "physics" }),
    });
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error).toBe("Veer studio opens at Plus");
  });

  test("biology progress POST requires auth and stores the session user id", async () => {
    // Anonymous write attempt (previously 200 with attacker-chosen userId).
    const denied = await fetch(`${probeUrl}/api/biology/labs/bio-cell-3d/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ labId: "bio-cell-3d", userId: "spoofed-user", progress: { completed: true } }),
    });
    expect(denied.status).toBe(401);

    // Authenticated: body userId is ignored, session user id is stored.
    mocked.auth.getUser.mockResolvedValue({
      data: { user: { id: "session-user", email: "s@example.com" } },
      error: null,
    });
    mockProfiles({ role: "member", access_status: "ACTIVE" });

    let insertedPayload: unknown = null;
    const profilesImpl = mocked.from.getMockImplementation();
    mocked.from.mockImplementation((table: string) => {
      if (table === "lab_progress") {
        const chain: Record<string, unknown> = {};
        for (const method of ["select", "eq", "neq", "in", "like", "order", "single", "maybeSingle", "limit", "upsert", "update", "insert", "delete"]) {
          chain[method] = (...args: unknown[]) => {
            if (method === "insert") insertedPayload = args[0];
            return chain;
          };
        }
        chain.then = (
          onFulfilled?: (v: { data: unknown; error: unknown }) => unknown,
          onRejected?: (r: unknown) => unknown,
        ) => Promise.resolve({ data: null, error: null }).then(onFulfilled, onRejected);
        return chain;
      }
      return profilesImpl ? profilesImpl(table) : makeQueryChain({ data: null, error: null });
    });

    const ok = await fetch(`${probeUrl}/api/biology/labs/bio-cell-3d/progress`, {
      method: "POST",
      headers: {
        Cookie: `sb-access-token=${VALID_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ labId: "bio-cell-3d", userId: "spoofed-user", progress: { completed: true } }),
    });
    expect(ok.status).toBe(200);
    expect((insertedPayload as { user_id?: string } | null)?.user_id).toBe("session-user");

    mocked.from.mockImplementation(profilesImpl ?? ((t: string) => makeQueryChain({ data: null, error: null }))(t));
  });
});
