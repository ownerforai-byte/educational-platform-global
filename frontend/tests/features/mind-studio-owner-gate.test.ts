import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Owner request (2026-10-04): "enable saving of image for every user" — the
 * Image Hub (formerly owner-only Mind Studio) now opens to every signed-in
 * student and keeps their drawings in the account history. Source-level pin,
 * same style as tests/lib/navigation.test.ts — the gate is client-side
 * (session resolves in the browser), so we pin the wiring instead of trying
 * to render a session in jsdom.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

describe("Image Hub access gate", () => {
  it("asks for a login but never for the owner allowlist", () => {
    const layout = read("app/(app)/mind-studio/layout.tsx");
    expect(layout).toContain('"use client"');
    // Signed-out visitors still bounce to login and come back here.
    expect(layout).toContain('"/login?next=/mind-studio"');
    // The former owner gate is gone: no owner check, no home bounce.
    expect(layout).not.toContain("isOwnerUser");
    expect(layout).not.toContain('"/home"');
  });

  it("renders the hub as a normal public page with account-saved history", () => {
    const page = read("app/(app)/mind-studio/page.tsx");
    // The owner-only noindex was dropped with the gate.
    expect(page).not.toContain("index: false");
    expect(page).toContain("Every student's image studio");
  });

  it("shows the home launcher to everyone, with no OwnerOnly wrapper", () => {
    const home = read("app/(app)/home/page.tsx");
    expect(home).toContain("<HomeMindStudio />");
    expect(home).not.toContain("<OwnerOnly>");
    // The OwnerOnly helper itself still exists for the owner console.
    expect(read("features/auth/owner-only.tsx")).toContain("isOwnerUser(user)");
  });
});
