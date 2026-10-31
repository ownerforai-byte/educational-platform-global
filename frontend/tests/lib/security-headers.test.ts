import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy, SUPABASE_ORIGIN } from "@/proxy";

function headersFor(path: string) {
  return proxy(new NextRequest(`https://ravikisan.vercel.app${path}`)).headers;
}

function statusFor(path: string, headers: Record<string, string>) {
  return proxy(new NextRequest(`https://ravikisan.vercel.app${path}`, { headers })).status;
}

function requestStatuses(count: number, path: string, headers: Record<string, string>) {
  return Array.from({ length: count }, () => statusFor(path, headers));
}

describe("proxy security headers", () => {
  it("lets the app frame its own documents and the supported embeds", () => {
    const csp = headersFor("/pdfs").get("content-security-policy") ?? "";

    // Regression guard: `frame-src 'none'` blanked every in-app viewer
    // (PDF Library, PdfViewer, video viewer) even for same-origin PDFs.
    expect(csp).not.toContain("frame-src 'none'");
    expect(csp).toContain("frame-src 'self'");

    // The origins the app actually embeds. Supabase origin is env-driven so
    // the CSP can never silently point at a stale project.
    expect(csp).toContain("https://drive.google.com");
    expect(csp).toContain("https://www.youtube.com");
    expect(csp).toContain("https://player.vimeo.com");
    expect(csp).toContain(SUPABASE_ORIGIN);
  });

  it("keeps clickjacking protection: same-origin framing only", () => {
    const headers = headersFor("/");
    const csp = headers.get("content-security-policy") ?? "";

    expect(headers.get("x-frame-options")).toBe("SAMEORIGIN");
    expect(csp).toContain("frame-ancestors 'self'");
  });
});

describe("proxy per-IP request budget", () => {
  it("caps ordinary page requests", () => {
    const codes = requestStatuses(121, "/home", { "x-real-ip": "203.0.113.11" });

    expect(codes.slice(0, 120).every((s) => s === 200)).toBe(true);
    expect(codes[120]).toBe(429);
  });

  it("does not spend the page budget on Next link prefetches", () => {
    // One pass over a notes index fires dozens of speculative RSC prefetches.
    // Sharing the page budget turned that markup into plain-text 429s on pages
    // the student never opened (the CI smoke run's error-route failures).
    const prefetches = requestStatuses(300, "/notes", {
      "x-real-ip": "203.0.113.12",
      "next-router-prefetch": "1",
    });
    const visits = requestStatuses(120, "/notes", { "x-real-ip": "203.0.113.12" });

    expect(prefetches.every((s) => s === 200)).toBe(true);
    expect(visits.every((s) => s === 200)).toBe(true);
  });

  it("still caps prefetches, because the header is client-supplied", () => {
    const codes = requestStatuses(601, "/plans", { "sec-purpose": "prefetch" });

    expect(codes.slice(0, 600).every((s) => s === 200)).toBe(true);
    expect(codes[600]).toBe(429);
  });
});
