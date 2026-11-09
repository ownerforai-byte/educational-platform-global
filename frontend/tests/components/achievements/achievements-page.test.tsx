import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

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

const getProgress = vi.fn();
const getLeaderboard = vi.fn();

vi.mock("@/lib/api/progress", () => ({
  getProgress: (...args: unknown[]) => getProgress(...args),
}));
vi.mock("@/lib/api/leaderboard", () => ({
  getLeaderboard: (...args: unknown[]) => getLeaderboard(...args),
}));

const sessionState: { user: unknown } = { user: null };
vi.mock("@/features/auth/hooks/use-session", () => ({
  useSession: () => ({ user: sessionState.user, isLoading: false, logoutUser: vi.fn() }),
}));

vi.mock("@/lib/streaks", () => ({
  getStreak: () => ({ count: 4, lastCheckIn: "2026-11-09" }),
  streakLabel: (n: number) => `${n}-day study streak`,
}));

import AchievementsPage from "@/app/(app)/achievements/page";
import type { ProgressEntry } from "@/types/api";

// ─── Fixtures ───────────────────────────────────────────────────────────────

function entry(topicSlug: string, unitSlug: string, completed: boolean): ProgressEntry {
  return {
    id: completed ? `row-${topicSlug}` : `new:${topicSlug}`,
    topicId: `class-11-notes/physics/${unitSlug}/${topicSlug}`,
    status: completed ? "completed" : "in_progress",
    completed,
    completedAt: completed ? "2026-10-02T00:00:00.000Z" : null,
    updatedAt: "2026-10-02T00:00:00.000Z",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    unitSlug,
    topicSlug,
    topic: { slug: topicSlug, title: topicSlug },
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  sessionState.user = { id: "u1", email: "a@example.com", credits: 10 };
  // One certified unit (both topics done) + one unit still open.
  getProgress.mockResolvedValue([
    entry("motion", "kinematics", true),
    entry("vectors", "kinematics", true),
    entry("forces", "dynamics", false),
  ]);
  getLeaderboard.mockResolvedValue({
    entries: [],
    you: { rank: 2, xp: 210, accuracy: 72, answered: 30, correct: 22, sets: 4, inTopList: true, gapToNext: 0, nextName: null },
    totals: { students: 1, sets: 1 },
    rule: {},
    mode: "history",
    range: "all",
    cohort: { students: 48, medianXp: 180, medianAccuracy: 65, yourXpPercentile: 88 },
    migrated: true,
    formatKnown: true,
  });
});

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("AchievementsPage", () => {
  it("shows every award system and counts earned certificates", async () => {
    render(<AchievementsPage />);

    expect(await screen.findByText("Achievements")).toBeInTheDocument();
    // Level derived from the journey (2 completed topics → Level 2).
    expect(await screen.findByText(/Level 2 · Curious Explorer/)).toBeInTheDocument();
    // 1 unit certificate (kinematics fully done), 0 subject certificates.
    expect(screen.getByText("1 unit · 0 subject certificates earned")).toBeInTheDocument();
    // Leaderboard rank from the live board.
    expect(screen.getByText("#2")).toBeInTheDocument();
    // Streak from the local store.
    expect(screen.getByText("4-day study streak")).toBeInTheDocument();
  });

  it("marks achieved milestones and links them", async () => {
    render(<AchievementsPage />);

    expect(await screen.findByText(/of 8 unlocked/)).toBeInTheDocument();
    expect(screen.getAllByText("Unlocked").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("link", { name: /see the board/i })).toHaveAttribute("href", "/leaderboard");
  });
});
