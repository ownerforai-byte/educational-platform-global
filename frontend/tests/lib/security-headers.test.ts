import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { config, proxy, SUPABASE_ORIGIN } from "@/proxy";
import robots from "@/app/robots";

function headersFor(path: string) {
  return proxy(new NextRequest(`https://ravikisan.vercel.app${path}`)).headers;
}

function statusFor(path: string, headers: Record<string, string>) {
  return proxy(new NextRequest(`https://ravikisan.vercel.app${path}`, { headers })).status;
}

/** A browser's top-level navigation: what the page budget is meant to bound. */
const DOCUMENT = { accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" };

function requestStatuses(count: number, path: string, headers: Record<string, string>) {
  return Array.from({ length: count }, () => statusFor(path, headers));
}

describe("proxy security headers", () => {
  it("uses a per-request nonce for scripts without enabling eval or inline scripts", () => {
    const response = proxy(new NextRequest("https://ravikisan.vercel.app/"));
    const csp = response.headers.get("content-security-policy") ?? "";
    const scriptSrc = csp.split(";").find((directive) => directive.trim().startsWith("script-src")) ?? "";
    const nonce = scriptSrc.match(/'nonce-([^']+)'/)?.[1];

    expect(nonce).toBeTruthy();
    expect(scriptSrc).not.toContain("'unsafe-inline'");
    expect(scriptSrc).not.toContain("'unsafe-eval'");
    expect(response.headers.get("x-middleware-request-content-security-policy")).toBe(csp);
    expect(response.headers.get("x-middleware-request-x-nonce")).toBe(nonce);
  });

  it("lets the app frame its own documents and the supported embeds", () => {
    const csp = headersFor("/pdfs").get("content-security-policy") ?? "";

    // Regression guard: `frame-src 'none'` blanked every in-app viewer
    // (PDF Library, PdfViewer, video viewer) even for same-origin PDFs.
    expect(csp).not.toContain("frame-src 'none'");
    expect(csp).toContain("frame-src 'self'");

    // The origins the app actually embeds. Supabase origin is env-driven so
    // the CSP can never silently point at a stale project.
    expect(csp).toContain("https://drive.google.com");
    expect(csp).toContain("https://docs.google.com");
    expect(csp).toContain("https://www.youtube.com");
    expect(csp).toContain("https://player.vimeo.com");
    expect(csp).toContain("https://webnotee.com");
    expect(csp).toContain(SUPABASE_ORIGIN);
  });

  it("keeps clickjacking protection: same-origin framing only", () => {
    const headers = headersFor("/");
    const csp = headers.get("content-security-policy") ?? "";

    expect(headers.get("x-frame-options")).toBe("SAMEORIGIN");
    expect(csp).toContain("frame-ancestors 'self'");
  });
});

describe("automated client access", () => {
  it.each([
    "OpenCode/1.0",
    "codex-cli/1.0",
    "OpenAI/1.0",
    "Mozilla/5.0 (compatible; GPTBot/1.2)",
    "ChatGPT-User/1.0",
    "OAI-SearchBot/1.0",
    "ClaudeBot/1.0",
    "claude-code/2.0",
    "ClaudeCode/2.0",
    "Claude-User/1.0",
    "Claude-SearchBot/1.0",
    "anthropic-ai/1.0",
  ])("rejects %s on pages, APIs, speculative requests and assets", async (userAgent) => {
    for (const path of [
      "/home", "/api/ai", "/api/auth/me", "/notes?_rsc=abc",
      "/_next/static/chunk.js", "/_next/image?url=x", "/data/private.json",
      "/favicon.ico", "/icon-192.png", "/sw.js", "/all_elements.json",
    ]) {
      const response = proxy(new NextRequest(`https://ravikisan.vercel.app${path}`, {
        headers: { "user-agent": userAgent, authorization: "Bearer valid-session" },
      }));
      expect(response.status).toBe(403);
      expect(response.headers.get("cache-control")).toContain("no-store");
      expect(response.headers.get("x-middleware-next")).toBeNull();
      expect(await response.json()).toEqual({ error: "Automated client access denied" });
    }
  });

  it.each([
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0 Safari/537.36",
    "node", "undici", "Googlebot/2.1", "NotClaude/1.0",
  ])("preserves normal browsing and OAuth for %s", (userAgent) => {
    for (const path of ["/login", "/auth/callback?code=example", "/_next/static/chunk.js", "/data/example.json"]) {
      expect(statusFor(path, { "user-agent": userAgent })).toBe(200);
    }
  });

  it("rejects named clients regardless of HTTP method", () => {
    for (const method of ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
      expect(proxy(new NextRequest("https://ravikisan.vercel.app/api/ai", {
        method, headers: { "user-agent": "cOdEx/1.0" },
      })).status).toBe(403);
    }
  });

  it("covers public assets in the matcher and publishes AI crawler disallows", () => {
    expect(config.matcher).toBe("/:path*");
    const rules = robots().rules;
    expect(Array.isArray(rules) && rules[0]).toMatchObject({
      userAgent: expect.arrayContaining(["OpenCode", "Codex", "ClaudeBot", "GPTBot"]),
      disallow: "/",
    });
  });
});

describe("proxy per-IP request budget", () => {
  it.each([undefined, "*/*", "application/json"])("caps page requests even with Accept %s", (accept) => {
    const ip = accept === undefined ? "203.0.113.21" : accept === "*/*" ? "203.0.113.22" : "203.0.113.23";
    const headers: Record<string, string> = { "x-real-ip": ip };
    if (accept) headers.accept = accept;
    const codes = requestStatuses(121, "/home", headers);
    expect(codes.slice(0, 120).every((s) => s === 200)).toBe(true);
    expect(codes[120]).toBe(429);
  });

  it("caps ordinary page requests", () => {
    const codes = requestStatuses(121, "/home", {
      ...DOCUMENT,
      "x-real-ip": "203.0.113.11",
    });

    expect(codes.slice(0, 120).every((s) => s === 200)).toBe(true);
    expect(codes[120]).toBe(429);
  });

  it("does not spend the page budget on assets, JSON or API calls", () => {
    // A single visit also pulls the app shell (theme bootstrap, manifest,
    // sw-precache.json), the service worker's precache routes and a few API
    // calls. Charging all of those to the document budget answered real
    // navigations with plain-text "Too many requests" (2026-11 E2E smoke:
    // no login form, no error-page markup).
    const ip = { "x-real-ip": "203.0.113.15" };

    expect(requestStatuses(200, "/api/auth/me", ip).every((s) => s === 200)).toBe(true);
    expect(requestStatuses(200, "/sw-precache.json", ip).every((s) => s === 200)).toBe(true);
    expect(requestStatuses(200, "/theme-bootstrap.js", ip).every((s) => s === 200)).toBe(true);

    // The document budget is still intact after that traffic.
    const pages = requestStatuses(120, "/home", { ...DOCUMENT, ...ip });
    expect(pages.every((s) => s === 200)).toBe(true);
  });

  it("does not spend the page budget on Next link prefetches", () => {
    // A real browser fetches every in-viewport Link as `?_rsc=<tree>` (verified
    // against a production `next start` capture). Next strips its internal
    // `RSC` / `Next-Router-Prefetch` headers before middleware runs, so only the
    // URL shape is a usable signal — asserting a header here would stay green
    // while production kept sharing the page budget.
    const prefetches = requestStatuses(
      300,
      "/notes?_rsc=oTrcTB0iWaQCUmcy",
      { "x-real-ip": "203.0.113.12" },
    );
    const visits = requestStatuses(120, "/notes", {
      ...DOCUMENT,
      "x-real-ip": "203.0.113.12",
    });

    expect(prefetches.every((s) => s === 200)).toBe(true);
    expect(visits.every((s) => s === 200)).toBe(true);
  });

  it("recognizes the other speculative payload shapes", () => {
    const ip = { "x-real-ip": "203.0.113.14" };

    expect(statusFor("/_next/data/build/notes.json", ip)).toBe(200);
    expect(statusFor("/notes.rsc", ip)).toBe(200);
    expect(statusFor("/notes/.segments/default/notes.segment.rsc", ip)).toBe(200);
    expect(statusFor("/plans", { ...ip, "sec-purpose": "prefetch" })).toBe(200);
  });

  it("still caps prefetches, because their shape is client-supplied", () => {
    const codes = requestStatuses(601, "/plans?_rsc=aaa", { "x-real-ip": "203.0.113.13" });

    expect(codes.slice(0, 600).every((s) => s === 200)).toBe(true);
    expect(codes[600]).toBe(429);
  });
});
