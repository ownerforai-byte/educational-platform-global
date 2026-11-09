import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";

/**
 * The per-tier surfaces — the study desk (tier home) and the study dashboard.
 *
 * The owner's rule stands: one hardcoded interface per rung. The 2026-11-09
 * desk redesign made each of them personal (name/streak/journey countdown),
 * so these tests pin both halves: personalisation renders, and the tier split
 * (spotlights, quick-link gating) still holds per rung.
 */

// ─── Mocks ──────────────────────────────────────────────────────────────────

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const session: { user: unknown } = {
  user: { id: "u1", email: "aayush@example.com", fullName: "Aayush Sharma", role: "member", credits: 4 },
};
vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({ user: session.user, isLoading: false, logoutUser: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/components/study/use-journey", () => ({
  useJourney: () => ({
    entries: [
      {
        id: "p1",
        topicId: "class-11-notes/physics/kinematics/motion",
        completed: false,
        status: "in_progress",
        updatedAt: "2026-11-01T00:00:00.000Z",
        classSlug: "class-11-notes",
        subjectSlug: "physics",
        unitSlug: "kinematics",
        topicSlug: "motion",
        topic: { slug: "motion", title: "Laws of Motion" },
      },
    ],
    summary: { total: 696, completed: 12, inProgress: 1, notStarted: 683, percent: 2 },
    loading: false,
    failed: false,
  }),
}));

vi.mock("@/components/study/use-study-goals", () => ({
  useStudyGoals: () => ({
    goals: { examDate: null, targetPercent: null, dailyMinutes: 60, subjects: [] },
    ready: true,
  }),
}));

vi.mock("@/lib/streaks", () => ({
  getStreak: () => ({ count: 3, lastCheckIn: "2026-11-09" }),
  streakLabel: (n: number) => `${n}-day study streak`,
}));

vi.mock("@/features/credits/spark-gate", () => ({
  SparkGate: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/home/home-subject-rails", () => ({
  HomeSubjectRails: () => <div data-testid="subject-rails" />,
}));

import {
  MemberHome,
  PlusHome,
  ProHome,
  OwnerHome,
} from "@/components/home/tier-interfaces";
import { DashboardView } from "@/components/study/dashboard-view";

beforeEach(() => {
  session.user = { id: "u1", email: "aayush@example.com", fullName: "Aayush Sharma", role: "member", credits: 4 };
});

// ─── The desk ───────────────────────────────────────────────────────────────

describe("tier desk", () => {
  it("greets the student personally and shows their own numbers", () => {
    render(<MemberHome rails={<div data-testid="subject-rails" />} />);

    // Personalised hero: greeting + name + date line, tier badge, streak chip.
    expect(screen.getByText(/Aayush Sharma\./)).toBeInTheDocument();
    expect(screen.getByText("Member interface")).toBeInTheDocument();
    expect(screen.getByText("3-day streak")).toBeInTheDocument();

    // Desk pulse: continue tile pulls the in-progress topic from the journey.
    expect(screen.getByText("Laws of Motion")).toBeInTheDocument();
    expect(screen.getByText("12 / 696")).toBeInTheDocument();
  });

  it("keeps the hardcoded tier split — member shows the member spotlights", () => {
    render(<MemberHome rails={<div data-testid="subject-rails" />} />);

    expect(screen.getByText("Your study desk is open.")).toBeInTheDocument();
    expect(within(screen.getByTestId("spotlights")).getByText("Class 11 Notes")).toBeInTheDocument();
    // Locked quick links stay visible but disabled (labs open at Plus).
    expect(document.querySelectorAll('[aria-disabled="true"]').length).toBeGreaterThan(0);
  });

  it("feeds each rung its own interface", () => {
    const { unmount: un1 } = render(<PlusHome rails={<div data-testid="subject-rails" />} />);
    expect(screen.getByText("Plus interface")).toBeInTheDocument();
    expect(
      within(screen.getByTestId("spotlights")).getByText("Advanced theory notes and board-exam depth."),
    ).toBeInTheDocument();
    un1();

    const { unmount: un2 } = render(<ProHome rails={<div data-testid="subject-rails" />} />);
    expect(screen.getByText("Pro interface")).toBeInTheDocument();
    expect(
      within(screen.getByTestId("spotlights")).getByText("Your private study journal — one entry per day."),
    ).toBeInTheDocument();
    un2();

    render(<OwnerHome rails={<div data-testid="subject-rails" />} />);
    expect(screen.getByText("Owner interface")).toBeInTheDocument();
    expect(
      within(screen.getByTestId("spotlights")).getByText("The full control surface."),
    ).toBeInTheDocument();
  });
});

// ─── The dashboard ──────────────────────────────────────────────────────────

describe("tier dashboard", () => {
  it("labels itself with the viewer's rung and gates quick links", () => {
    render(<DashboardView />);

    expect(screen.getByText("Member dashboard")).toBeInTheDocument();
    // At member, locked destinations are muted chips, open ones are links.
    expect(document.querySelectorAll('[aria-disabled="true"]').length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/home");
  });

  it("opens everything for the owner rung", () => {
    session.user = { id: "u1", email: "owner@example.com", fullName: "Owner", role: "owner", credits: 4 };

    render(<DashboardView />);

    expect(screen.getByText("Owner dashboard")).toBeInTheDocument();
    expect(document.querySelectorAll('[aria-disabled="true"]').length).toBe(0);
  });
});
