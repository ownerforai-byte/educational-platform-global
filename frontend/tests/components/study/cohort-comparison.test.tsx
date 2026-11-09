import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const getLeaderboard = vi.fn();

vi.mock("@/lib/api/leaderboard", () => ({
  getLeaderboard: (...args: unknown[]) => getLeaderboard(...args),
}));

import { CohortComparison } from "@/components/study/cohort-comparison";
import type { LeaderboardResponse } from "@/lib/api/leaderboard";

function response(overrides: Partial<LeaderboardResponse> = {}): LeaderboardResponse {
  return {
    entries: [],
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
    rule: {
      correctChoice: 10,
      wrongChoice: 2,
      writingPerQuestion: 40,
      writingWeakMultiplier: 0.5,
      writingWeakBelowPct: 50,
      bonus: { at80: 25, at60: 15, at40: 5 },
    },
    mode: "history",
    range: "all",
    cohort: { students: 48, medianXp: 180, medianAccuracy: 65, yourXpPercentile: 88 },
    migrated: true,
    formatKnown: true,
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  getLeaderboard.mockResolvedValue(response());
});

describe("CohortComparison", () => {
  it("shows medians and the reader's percentile — anonymised", async () => {
    render(<CohortComparison />);

    expect(await screen.findByText(/Anonymous by design/)).toBeInTheDocument();
    expect(screen.getByText("48")).toBeInTheDocument(); // cohort size
    expect(screen.getByText(/#2 of 48/)).toBeInTheDocument();
    expect(screen.getByText(/outscored 88%/)).toBeInTheDocument();
    expect(screen.getByText("210 vs 180")).toBeInTheDocument(); // XP vs median
    expect(screen.getByText("72% vs 65%")).toBeInTheDocument(); // accuracy vs median
  });

  it("keeps medians-only for a reader who is not ranked yet", async () => {
    getLeaderboard.mockResolvedValue(response({ you: null }));

    render(<CohortComparison />);

    expect(await screen.findByText(/180 XP · 65% accuracy/)).toBeInTheDocument();
  });

  it("says so honestly before anyone has scored sets", async () => {
    getLeaderboard.mockResolvedValue(
      response({
        migrated: true,
        you: null,
        cohort: { students: 0, medianXp: 0, medianAccuracy: 0, yourXpPercentile: null },
      }),
    );

    render(<CohortComparison />);

    expect(await screen.findByText(/No scored sets across the platform yet/)).toBeInTheDocument();
  });
});
