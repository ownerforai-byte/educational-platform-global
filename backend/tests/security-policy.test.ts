import express from "express";
import { afterAll, afterEach, describe, expect, test, vi } from "vitest";
import { isOriginAllowed } from "../src/middleware/cors";
import { checkStartupEnv, inspectStartupEnv, isProductionEnv } from "../src/config/env";
import { rateLimit, resetRateLimits } from "../src/middleware/rateLimit";
import { securityHeaders, HSTS_MAX_AGE_SECONDS } from "../src/middleware/securityHeaders";
import { errorHandler, serverError } from "../src/middleware/errors";

// ───────────────────────────────────────────────────────────────────────────
// Test server helper — a fresh app per test so tiers/servers never collide.
// ───────────────────────────────────────────────────────────────────────────
const openServers: Array<{ close: (cb: (err?: Error) => void) => void }> = [];

async function mountApp(build: (app: express.Express) => void) {
  const app = express();
  build(app);
  const server = app.listen(0, "127.0.0.1");
  openServers.push(server);
  await new Promise<void>((resolve) => server.once("listening", () => resolve()));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  return {
    baseUrl: `http://127.0.0.1:${port}`,
    async json(path: string, init?: RequestInit) {
      const res = await fetch(`http://127.0.0.1:${port}${path}`, init);
      const body = await res.json().catch(() => null);
      return { status: res.status, headers: res.headers, body };
    },
  };
}

/** Route table used by the rate-limit tests. */
function credentialRoutes(app: express.Express) {
  app.use(rateLimit);
  app.post("/api/auth/login", (_req, res) => res.json({ ok: true }));
  app.post("/api/auth/signup", (_req, res) => res.json({ ok: true }));
  app.post("/api/auth/reset-password", (_req, res) => res.json({ ok: true }));
  app.post("/api/ai", (_req, res) => res.json({ ok: true }));
  app.get("/api/levels", (_req, res) => res.json({ ok: true }));
}

afterEach(() => {
  resetRateLimits();
  vi.unstubAllEnvs();
});

afterAll(async () => {
  await Promise.all(
    openServers.map((server) => new Promise<void>((resolve) => server.close(() => resolve()))),
  );
});

describe("CORS policy", () => {
  test("isProductionEnv detects Render runtime env", () => {
    vi.stubEnv("RENDER", "true");
    expect(isProductionEnv()).toBe(true);

    vi.stubEnv("RENDER", "");
    vi.stubEnv("RENDER_EXTERNAL_URL", "https://x.onrender.com");
    expect(isProductionEnv()).toBe(true);

    vi.unstubAllEnvs();
    vi.stubEnv("RENDER_EXTERNAL_URL", "");
    expect(isProductionEnv()).toBe(process.env.NODE_ENV === "production");
    vi.unstubAllEnvs();
  });

  test("development: localhost and preview wildcards allowed, random origins rejected", () => {
    // Test env runs without RENDER/NODE_ENV=production → development behavior.
    expect(isOriginAllowed("http://localhost:5173")).toBe(true);
    expect(isOriginAllowed("http://127.0.0.1:3000")).toBe(true);
    expect(isOriginAllowed("https://preview-abc.vercel.app")).toBe(true);
    expect(isOriginAllowed("https://evil.example.com")).toBe(false);
  });

  test("production: exact allowlist only — no wildcard hosts, no allow-all", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("FRONTEND_URL", "https://real-frontend.example.com");

    expect(isOriginAllowed("https://real-frontend.example.com")).toBe(true);
    // The old wildcard rules used to allow these:
    expect(isOriginAllowed("https://attacker.vercel.app")).toBe(false);
    expect(isOriginAllowed("https://attacker.onrender.com")).toBe(false);
    expect(isOriginAllowed("https://random.example.com")).toBe(false);

    vi.unstubAllEnvs();
  });
});

describe("rate limit tiers", () => {
  test("login is capped at 5/min per IP while authenticated AI stays unlimited", async () => {
    const { baseUrl } = await mountApp(credentialRoutes);

    // 6 login attempts → the 6th must be 429 (auth tier = 5).
    const loginStatuses: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      const res = await fetch(`${baseUrl}/api/auth/login`, { method: "POST" });
      loginStatuses.push(res.status);
    }
    expect(loginStatuses[4]).toBe(200);
    expect(loginStatuses[5]).toBe(429);

    // Authenticated AI is unlimited by design: 25 calls, zero 429s.
    const aiStatuses: number[] = [];
    for (let i = 0; i < 25; i += 1) {
      const res = await fetch(`${baseUrl}/api/ai`, { method: "POST" });
      aiStatuses.push(res.status);
    }
    expect(aiStatuses.every((s) => s === 200)).toBe(true);

    // A normal content endpoint (60/min default) still fine after all that.
    expect((await fetch(`${baseUrl}/api/levels`)).status).toBe(200);
  });

  test("signup sits on the strict credential tier, not the 60/min default", async () => {
    const { baseUrl } = await mountApp(credentialRoutes);

    const statuses: number[] = [];
    for (let i = 0; i < 8; i += 1) {
      const res = await fetch(`${baseUrl}/api/auth/signup`, { method: "POST" });
      statuses.push(res.status);
    }
    // Mass account creation is blocked well below the generic default.
    expect(statuses[5]).toBe(429);
    expect(statuses.filter((s) => s === 200)).toHaveLength(5);
  });

  test("password reset allows 3/hour per IP and keeps its own budget", async () => {
    const { baseUrl } = await mountApp(credentialRoutes);

    const resets: number[] = [];
    for (let i = 0; i < 4; i += 1) {
      const res = await fetch(`${baseUrl}/api/auth/reset-password`, { method: "POST" });
      resets.push(res.status);
    }
    expect(resets.slice(0, 3).every((s) => s === 200)).toBe(true);
    expect(resets[3]).toBe(429);

    // Per-tier isolation: burning the reset budget must not lock out login.
    expect((await fetch(`${baseUrl}/api/auth/login`, { method: "POST" })).status).toBe(200);
  });

  test("a malformed limit variable cannot silently disable the limiter", async () => {
    vi.stubEnv("RATE_LIMIT_MAX_REQUESTS", "not-a-number");
    vi.resetModules();
    const { rateLimit: freshLimit, resetRateLimits: freshReset } = await import(
      "../src/middleware/rateLimit"
    );
    const { baseUrl } = await mountApp((app) => {
      app.use(freshLimit);
      app.get("/api/levels", (_req, res) => res.json({ ok: true }));
    });

    const statuses: number[] = [];
    for (let i = 0; i < 61; i += 1) {
      statuses.push((await fetch(`${baseUrl}/api/levels`)).status);
    }
    // Falls back to the built-in default (60/min) instead of failing open.
    expect(statuses.filter((s) => s === 429)).toHaveLength(1);
    freshReset();
  });
});

describe("security headers", () => {
  test("production sends DENY, strict CSP, 1-year HSTS and nosniff", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { json } = await mountApp((app) => {
      app.use(securityHeaders);
      app.get("/api/levels", (_req, res) => res.json({ ok: true }));
    });

    const { headers } = await json("/api/levels");

    expect(headers.get("x-frame-options")).toBe("DENY");
    expect(headers.get("x-content-type-options")).toBe("nosniff");
    expect(headers.get("strict-transport-security")).toContain(
      `max-age=${HSTS_MAX_AGE_SECONDS}`,
    );
    const csp = headers.get("content-security-policy") ?? "";
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    // No wildcard script source may sneak in.
    expect(csp).not.toContain("script-src *");
  });

  test("development keeps the preview frameable and avoids pinning localhost to https", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { json } = await mountApp((app) => {
      app.use(securityHeaders);
      app.get("/api/levels", (_req, res) => res.json({ ok: true }));
    });

    const { headers } = await json("/api/levels");

    expect(headers.get("x-frame-options")).toBeNull();
    expect(headers.get("strict-transport-security")).toBeNull();
    expect(headers.get("content-security-policy")).toContain("frame-ancestors *");
    // nosniff is universal — it must not depend on the environment.
    expect(headers.get("x-content-type-options")).toBe("nosniff");
  });
});

describe("error responses", () => {
  test("internal detail is replaced by a generic message plus a correlation id", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { json } = await mountApp((app) => {
      app.get("/boom", (_req, res) =>
        serverError(res, new Error('relation "profiles" does not exist')),
      );
      app.get("/thrown", () => {
        throw new Error("connect ECONNREFUSED 10.0.0.5:5432");
      });
      app.use(errorHandler);
    });

    const handled = await json("/boom");
    expect(handled.status).toBe(500);
    expect(handled.body.error).toBe("Internal server error");
    expect(typeof handled.body.errorId).toBe("string");
    expect(handled.body.errorId.length).toBeGreaterThan(0);
    // The database error must not survive anywhere in the payload (or header).
    expect(JSON.stringify(handled.body)).not.toContain("profiles");
    expect(handled.headers.get("x-error-id")).toBe(handled.body.errorId);

    const thrown = await json("/thrown");
    expect(thrown.status).toBe(500);
    expect(thrown.body.error).toBe("Internal server error");
    expect(JSON.stringify(thrown.body)).not.toContain("ECONNREFUSED");
    expect(thrown.body.errorId).toBeTruthy();

    // …but the operator still gets the real thing in the server log.
    expect(errorSpy).toHaveBeenCalled();
    const logged = errorSpy.mock.calls.flat().join(" ");
    expect(logged).toContain("profiles");
    expect(logged).toContain("ECONNREFUSED");

    errorSpy.mockRestore();
  });

  test("a streaming response that already sent headers is not double-answered", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { baseUrl } = await mountApp((app) => {
      app.get("/stream", (_req, res) => {
        res.setHeader("Content-Type", "text/event-stream");
        res.write("data: partial\n\n");
        serverError(res, new Error("upstream provider exploded"));
        res.end();
      });
    });

    const res = await fetch(`${baseUrl}/stream`);
    // The handler owns that stream; serverError must log without throwing or
    // trying to send a second response.
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("partial");
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});

describe("startup environment gate", () => {
  test("missing critical variables are reported", () => {
    const report = inspectStartupEnv({} as NodeJS.ProcessEnv);
    expect(report.missingCritical).toEqual(["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]);
    expect(report.noAIProvider).toBe(true);
    expect(report.malformedNumbers).toEqual([]);
  });

  test("malformed tuning numbers are flagged rather than trusted", () => {
    const report = inspectStartupEnv({
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "service-role",
      OPENROUTER_API_KEY: "key",
      RATE_LIMIT_MAX_REQUESTS: "abc",
      RATE_LIMIT_WINDOW_MS: "-5",
    } as unknown as NodeJS.ProcessEnv);

    expect(report.missingCritical).toEqual([]);
    expect(report.noAIProvider).toBe(false);
    expect(report.malformedNumbers).toEqual(["RATE_LIMIT_MAX_REQUESTS", "RATE_LIMIT_WINDOW_MS"]);
  });

  test("production refuses to boot without critical config, development warns", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RENDER", "");
    expect(checkStartupEnv({} as unknown as NodeJS.ProcessEnv)).toBe(false);

    vi.stubEnv("NODE_ENV", "development");
    expect(checkStartupEnv({} as unknown as NodeJS.ProcessEnv)).toBe(true);

    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });
});
