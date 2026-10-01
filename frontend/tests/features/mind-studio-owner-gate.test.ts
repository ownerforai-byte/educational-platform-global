import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Owner request (2026-10-01): "hide the mind studio for owner emails only".
 * Source-level pin, same style as tests/lib/navigation.test.ts — the gate is
 * client-side (session resolves in the browser), so we pin the wiring instead
 * of trying to render a session in jsdom.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

describe("Mind Studio owner-only gate", () => {
  it("gates the route on the owner allowlist with the standard bounces", () => {
    const layout = read("app/(app)/mind-studio/layout.tsx");
    expect(layout).toContain('"use client"');
    expect(layout).toContain("isOwnerUser(user)");
    // Signed-out → login (coming back here), signed-in non-owner → home.
    expect(layout).toContain('"/login?next=/mind-studio"');
    expect(layout).toContain('"/home"');
  });

  it("keeps the workspace out of search indexes", () => {
    expect(read("app/(app)/mind-studio/page.tsx")).toContain("index: false");
  });

  it("hides the home launcher behind OwnerOnly", () => {
    const home = read("app/(app)/home/page.tsx");
    expect(home).toContain("<OwnerOnly>");
    expect(home).toContain("<HomeMindStudio />");
    expect(read("features/auth/owner-only.tsx")).toContain("isOwnerUser(user)");
  });
});
