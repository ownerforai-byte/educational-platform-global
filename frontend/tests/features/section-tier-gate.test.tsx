import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

/**
 * SECTION GATE (plan.md §8 P4 + §9: lower tiers see a muted disabled state,
 * without lock icons or plan links). A member opening a Pro section sees that
 * state rather than a blank page or dead redirect; open routes render untouched.
 * Owner runtime minimums
 * (settings `section_min_tier.*`, published on /api/config) move the line.
 */

const session = vi.hoisted(() => ({ user: null as unknown, isLoading: false }));
const pathname = vi.hoisted(() => ({ value: "/pdfs" }));
const overrides = vi.hoisted(() => ({ value: {} as Record<string, string> }));

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => session,
}));

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    usePathname: () => pathname.value,
  };
});

vi.mock("@/lib/hooks/use-section-tiers", () => ({
  useSectionTierOverrides: () => overrides.value,
  refreshSectionTierOverrides: vi.fn(),
}));

import { SectionTierGate } from "@/components/content/section-tier-gate";

const CONTENT = <div data-testid="section-content">the section</div>;

beforeEach(() => {
  session.user = null;
  session.isLoading = false;
  pathname.value = "/pdfs";
  overrides.value = {};
});

describe("SectionTierGate — visible-but-dimmed, no dead ends", () => {
  it("renders the section untouched at or above its rung", () => {
    session.user = { email: "student@example.com", plan: "pro" };
    render(<SectionTierGate>{CONTENT}</SectionTierGate>);
    expect(screen.getByTestId("section-content")).toBeInTheDocument();
  });

  it("shows a muted disabled card to a lower rung, without a lock icon or plans link", () => {
    session.user = { email: "student@example.com" }; // member; PDF Library opens at Pro
    render(<SectionTierGate>{CONTENT}</SectionTierGate>);

    expect(screen.queryByTestId("section-content")).toBeNull();
    expect(screen.getByRole("heading", { name: /pdf library is unavailable on this plan/i })).toBeInTheDocument();
    // Owner 2026-10-25: "plan is available one time for all, only in footer" —
    // the locked card carries no /plans link at all.
    const hrefs = screen.getAllByRole("link").map((el) => el.getAttribute("href"));
    expect(hrefs).not.toContain("/plans");
    expect(screen.getByRole("link", { name: /go to my home/i })).toHaveAttribute("href", "/home");
    expect(screen.getByRole("heading", { name: /pdf library is unavailable on this plan/i }).closest("div")).toHaveClass("grayscale");
  });

  it("matches deep routes to their section (the unit page gates like its root)", () => {
    session.user = { email: "student@example.com" };
    pathname.value = "/pdfs/some/deep/collection";
    render(<SectionTierGate>{CONTENT}</SectionTierGate>);
    expect(screen.queryByTestId("section-content")).toBeNull();
  });

  it("lets routes outside the registry through for every rung", () => {
    session.user = { email: "student@example.com" };
    // /credits is a personal account page — deliberately unregistered, must
    // render for every tier (previously used /profile, which gained a
    // "Progress, Profile & Credits" section and started gating).
    pathname.value = "/credits";
    render(<SectionTierGate>{CONTENT}</SectionTierGate>);
    expect(screen.getByTestId("section-content")).toBeInTheDocument();
  });

  it("applies owner runtime minimums from /api/config", () => {
    // The owner moved the PDF Library down to Member at /owner/sections.
    overrides.value = { "pdf-library": "member" };
    session.user = { email: "student@example.com" }; // member
    render(<SectionTierGate>{CONTENT}</SectionTierGate>);
    expect(screen.getByTestId("section-content")).toBeInTheDocument();
  });

  it("raises the line when the owner moves a section up", () => {
    overrides.value = { "class-11-notes": "owner" };
    session.user = { email: "student@example.com", plan: "pro" };
    pathname.value = "/class-11-notes/physics";
    render(<SectionTierGate>{CONTENT}</SectionTierGate>);
    expect(screen.queryByTestId("section-content")).toBeNull();
    expect(screen.getByRole("heading", { name: /class 11 notes is unavailable on this plan/i })).toBeInTheDocument();
  });
});
