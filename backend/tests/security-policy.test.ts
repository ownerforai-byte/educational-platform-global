import express from "express";
import { afterAll, describe, expect, test, vi } from "vitest";
import { isOriginAllowed } from "../src/middleware/cors";
import { isProductionEnv } from "../src/config/env";
import { rateLimit, resetRateLimits } from "../src/middleware/rateLimit";

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
  let server: ReturnType<express.Express["listen"]>;
  let baseUrl: string;

  const app = express();
  app.use(rateLimit);
  app.post("/api/auth/login", (_req, res) => res.json({ ok: true }));
  app.post("/api/ai", (_req, res) => res.json({ ok: true }));
  app.get("/api/levels", (_req, res) => res.json({ ok: true }));

  afterAll(async () => {
    await new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve())),
    );
    resetRateLimits();
  });

  test("login hits the strict auth tier (10/min) while authenticated AI stays unlimited", async () => {
    resetRateLimits();
    server = app.listen(0, () => {
      const addr = server.address();
      baseUrl = `http://127.0.0.1:${typeof addr === "object" && addr ? addr.port : 0}`;
    });
    // Wait for listen callback.
    await new Promise((r) => setTimeout(r, 100));

    // 11 login attempts → the 11th must be 429 (auth tier = 10).
    const loginStatuses: number[] = [];
    for (let i = 0; i < 11; i += 1) {
      const res = await fetch(`${baseUrl}/api/auth/login`, { method: "POST" });
      loginStatuses.push(res.status);
    }
    expect(loginStatuses[9]).toBe(200);
    expect(loginStatuses[10]).toBe(429);

    // Authenticated AI is unlimited by design: 25 calls, zero 429s.
    const aiStatuses: number[] = [];
    for (let i = 0; i < 25; i += 1) {
      const res = await fetch(`${baseUrl}/api/ai`, { method: "POST" });
      aiStatuses.push(res.status);
    }
    expect(aiStatuses.every((s) => s === 200)).toBe(true);

    // A normal content endpoint (60/min default) still fine after all that.
    const res = await fetch(`${baseUrl}/api/levels`);
    expect(res.status).toBe(200);

    resetRateLimits();
  });
});
