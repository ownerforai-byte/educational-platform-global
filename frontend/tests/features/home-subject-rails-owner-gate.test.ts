import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Owner request (2026-10-05): "make this features for owner emails only" —
 * the six continuous Class 11 subject rails on the home page stream only for
 * the OWNER_EMAILS allowlist in frontend/lib/owner.ts.
 *
 * The gate is client-side (the session resolves in the browser), so — same
 * style as tests/features/mind-studio-owner-gate.test.ts — we pin the wiring
 * at source level instead of trying to render a session in jsdom.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

describe("Home subject rails owner gate", () => {
  it("wraps the rails in OwnerOnly on the home page", () => {
    const home = read("app/(app)/home/page.tsx");
    expect(home).toContain(
      'import { OwnerOnly } from "@/features/auth/owner-only"',
    );
    const gate = home.match(/<OwnerOnly>[\s\S]*?<\/OwnerOnly>/)?.[0] ?? "";
    expect(gate).toContain("<HomeSubjectRails />");
  });

  it("hides the section instead of redirecting anyone", () => {
    const ownerOnly = read("features/auth/owner-only.tsx");
    expect(ownerOnly).toContain('"use client"');
    expect(ownerOnly).toContain("isOwnerUser(user)");
    // Guests and non-owners get null — never a bounce to /login or /home.
    expect(ownerOnly).not.toContain("router.push");
    expect(ownerOnly).not.toContain("redirect(");
  });

  it("reads the shared allowlist, with no email list inside the rails", () => {
    expect(read("lib/owner.ts")).toContain("OWNER_EMAILS");
    // The feature must not carry its own copy of owner addresses.
    expect(read("components/home/home-subject-rails.tsx")).not.toContain(
      "@gmail.com",
    );
    expect(read("components/home/subject-rails.tsx")).not.toContain(
      "@gmail.com",
    );
    expect(read("lib/home-subject-slides.ts")).not.toContain("@gmail.com");
  });

  it("keeps the rails data and renderer intact behind the gate", () => {
    // Gating must not disturb the feature itself: six rails, independent
    // pause switches, and the marquee track that loops on -50%.
    expect(read("components/home/subject-rails.tsx")).toContain(
      "aria-pressed",
    );
    expect(read("components/home/subject-rails.tsx")).toContain(
      "subject-rail-track",
    );
    // Unit classification: divider cards open each syllabus-unit group.
    expect(read("components/home/subject-rails.tsx")).toContain(
      "unitDivider",
    );
    expect(read("lib/home-subject-slides.ts")).toContain("unitDivider");
    expect(read("app/globals.css")).toContain("subjectRailScroll");
  });
});
