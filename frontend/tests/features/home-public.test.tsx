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

describe("public home", () => {
  it("explains the approval requirement without exposing gated study routes", () => {
    render(<HomePublic />);

    expect(
      screen.getByText(/Login works after administrative approval and system verification only\./),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("link", { name: "Request an account" })).toHaveAttribute("href", "/signup");
    expect(screen.getAllByRole("link", { name: /access (notice|works)/i }).some((link) => link.getAttribute("href") === "/notice")).toBe(true);
  });

  it("keeps the public overview clear and factual", () => {
    render(<HomePublic />);

    expect(screen.getByRole("heading", { name: "A clearer path through your studies." })).toBeInTheDocument();
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
