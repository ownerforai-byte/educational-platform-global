import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

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

import type {
  LeaderboardRange,
  LeaderboardResponse,
  LeaderboardRule,
} from "@/lib/api/leaderboard";
import type { LeaderboardState } from "@/lib/hooks/use-leaderboard";

const setLeaderboardRange = vi.fn();
const refreshLeaderboard = vi.fn();
const board: { state: LeaderboardState; range: LeaderboardRange } = {
  state: { status: "loading" },
  range: "all",
};

vi.mock("@/lib/hooks/use-leaderboard", () => ({
  useLeaderboard: () => board.state,
  useLeaderboardRange: () => board.range,
  setLeaderboardRange: (...args: unknown[]) => setLeaderboardRange(...args),
  refreshLeaderboard: (...args: unknown[]) => refreshLeaderboard(...args),
}));

import LeaderboardPage from "@/app/(app)/leaderboard/page";

// ─── Fixtures ───────────────────────────────────────────────────────────────

const rule: LeaderboardRule = {
  correctChoice: 10,
  wrongChoice: 2,
  writingPerQuestion: 40,
  writingWeakMultiplier: 0.5,
  writingWeakBelowPct: 50,
  bonus: { at80: 25, at60: 15, at40: 5 },
};

function response(overrides: Partial<LeaderboardResponse> = {}): LeaderboardResponse {
  return {
    entries: [
      {
        rank: 1,
        name: "Aarav S.",
        xp: 320,
        accuracy: 86,
        answered: 40,
        sets: 5,
        isYou: false,
      },
      {
        rank: 2,
        name: "Sita T.",
        xp: 210,
        accuracy: 72,
        answered: 30,
        sets: 4,
        isYou: true,
      },
    ],
    you: {
      rank: 2,
      xp: 210,
      accuracy: 72,
      answered: 30,
      correct: 22,
      sets: 4,
      inTopList: true,
      gapToNext: 110,
      nextName: "Aarav S.",
    },
    totals: { students: 2, sets: 9 },
    rule,
    mode: "history",
    range: "all",
    cohort: { students: 2, medianXp: 265, medianAccuracy: 79, yourXpPercentile: 50 },
    migrated: true,
    formatKnown: true,
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  board.range = "all";
  board.state = { status: "ready", data: response() };
});

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("LeaderboardPage", () => {
  it("renders the board with the ranking-window filter on All time by default", () => {
    render(<LeaderboardPage />);

    // Shown on the podium and again in the full-ranking table.
    expect(screen.getAllByText("Aarav S.").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Your position")).toBeInTheDocument();

    // The three window chips; All time is the pressed one.
    const week = screen.getByRole("button", { name: "Last 7 days" });
    const month = screen.getByRole("button", { name: "Last 30 days" });
    const all = screen.getByRole("button", { name: "All time" });
    expect(all).toHaveAttribute("aria-pressed", "true");
    expect(week).toHaveAttribute("aria-pressed", "false");
    expect(month).toHaveAttribute("aria-pressed", "false");
  });

  it("switches the ranking window through the store", () => {
    render(<LeaderboardPage />);

    fireEvent.click(screen.getByRole("button", { name: "Last 7 days" }));
    expect(setLeaderboardRange).toHaveBeenCalledWith("week");

    fireEvent.click(screen.getByRole("button", { name: "Last 30 days" }));
    expect(setLeaderboardRange).toHaveBeenCalledWith("month");
  });

  it("reflects a non-default window in the totals and empty copy", () => {
    board.range = "week";
    board.state = { status: "ready", data: response({ entries: [], you: null }) };

    render(<LeaderboardPage />);

    expect(screen.getByRole("button", { name: "Last 7 days" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("No scored sets in this window")).toBeInTheDocument();
    expect(screen.getByText(/students · 9 scored sets/)).toHaveTextContent(
      "in this window",
    );
  });

  it("shows the error state and retries through the store", () => {
    board.state = { status: "error", message: "boom" };

    render(<LeaderboardPage />);

    expect(screen.getByText("The board could not load")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(refreshLeaderboard).toHaveBeenCalled();
  });
});
