import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { HomePublic } from "@/components/home/home-public";

const session = vi.hoisted(() => ({ user: null as unknown, isLoading: false }));
const replace = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => session,
}));

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    useRouter: () => ({ replace }),
  };
});

vi.mock("@/components/home/home-features-spark-gate", () => ({
  HomeFeaturesSparkGate: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/home/home-introduction", () => ({
  HomeIntroduction: () => <div data-testid="member-home" />,
}));

vi.mock("@/components/home/home-subject-rails", () => ({
  HomeSubjectRails: () => null,
}));

import HomePage from "@/app/(app)/home/page";

/**
 * THE GUEST HOME (owner 2026-10-25: the flow is "welcome → guest home → login
 * page → study home", and the guest home is designed "with only one or two
 * buttons with sign in, hide others").
 */
describe("guest home — sign in is the only action", () => {
  it("explains the approval requirement without exposing gated study routes", () => {
    render(<HomePublic />);

    expect(
      screen.getByText(/Login works after administrative approval and system verification only\./),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute("href", "/login");
    expect(screen.getAllByRole("link", { name: /access (notice|works)/i }).some((link) => link.getAttribute("href") === "/plans")).toBe(true);
    expect(screen.getAllByRole("link").map((link) => link.getAttribute("href"))).not.toContain("/notice");
  });

  it("hides every other action — one or two sign-in buttons, nothing else", () => {
    render(<HomePublic />);

    // Account-request and plan CTAs are hidden on the guest home ("hide
    // others"): sign-up stays on the login page, plans stay on /plans.
    expect(screen.queryByRole("link", { name: /request an account/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /see all plans/i })).toBeNull();

    const signInLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === "/login");
    expect(signInLinks).toHaveLength(1); // the shell account button is the second
  });

  it("keeps the public overview clear and factual", () => {
    render(<HomePublic />);

    expect(screen.getByRole("heading", { name: "Your NEB syllabus, organized for daily study." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Syllabus-led study" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Exam preparation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Interactive science" })).toBeInTheDocument();

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).not.toContain("/class-11-notes");
    expect(hrefs).not.toContain("/lab");
    expect(hrefs).not.toContain("/chat");
  });
});

describe("member home route", () => {
  beforeEach(() => {
    session.user = null;
    session.isLoading = false;
    replace.mockReset();
  });

  it("feeds the viewer's rung to the tier interface, never the public overview", () => {
    // /home resolves the session's rung and lands on the exact tier interface
    // (the interface itself is pinned in tests/features/tier-home-gate.test.tsx).
    session.user = { email: "student@example.com" }; // no plan → member
    render(<HomePage />);
    expect(replace).toHaveBeenCalledWith("/home/member");
    expect(screen.queryByTestId("public-home")).toBeNull();
  });
});
