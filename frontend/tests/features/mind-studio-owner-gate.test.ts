import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Owner request (2026-10-05): "make the image hub under owner emails only" —
 * the Image Hub (owner-only Mind Studio successor) opens to allowlisted owner
 * emails only and keeps their drawings in the account history. Source-level
 * pin, same style as tests/lib/navigation.test.ts — the gate is client-side
 * (session resolves in the browser), so we pin the wiring instead of trying
 * to render a session in jsdom.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

describe("Image Hub access gate", () => {
  it("is owner-only: layout bounces non-owners home and signed-out to login", () => {
    const layout = read("app/(app)/mind-studio/layout.tsx");
    expect(layout).toContain('"use client"');
    // Owner allowlist check — students never see the hub.
    expect(layout).toContain("isOwnerUser");
    // Signed-out visitors still bounce to login and come back here.
    expect(layout).toContain('"/login?next=/mind-studio"');
    // Signed-in non-owners bounce home.
    expect(layout).toContain('"/home"');
  });

  it("renders the hub as an owner page with account-saved history", () => {
    const page = read("app/(app)/mind-studio/page.tsx");
    expect(page).not.toContain("Every student's image studio");
    expect(page).toContain("Owner");
  });

  it("shows the home launcher inside the owner gate only", () => {
    const home = read("app/(app)/home/page.tsx");
    expect(home).toContain("<HomeMindStudio />");
    // The OwnerOnly helper itself still exists for the owner console.
    expect(read("features/auth/owner-only.tsx")).toContain("isOwnerUser(user)");

    // Every HomeMindStudio occurrence must sit inside an <OwnerOnly> block.
    const gates = home.match(/<OwnerOnly>[\s\S]*?<\/OwnerOnly>/g) ?? [];
    expect(gates.length).toBeGreaterThan(0);
    expect(gates.some((g) => g.includes("<HomeMindStudio />"))).toBe(true);
    // No bare launcher outside the gate.
    const stripped = home.replace(/<OwnerOnly>[\s\S]*?<\/OwnerOnly>/g, "");
    expect(stripped).not.toContain("<HomeMindStudio />");
  });
});
