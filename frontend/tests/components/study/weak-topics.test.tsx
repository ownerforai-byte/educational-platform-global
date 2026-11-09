import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const getQuizHistory = vi.fn();

vi.mock("@/lib/api/ai-quiz-history", () => ({
  getQuizHistory: (...args: unknown[]) => getQuizHistory(...args),
}));

import {
  WeakTopics,
  weakTopics,
  WEAK_ACCURACY_BELOW,
  WEAK_MIN_ANSWERED,
} from "@/components/study/weak-topics";
import type { QuizHistoryRow } from "@/lib/api/ai-quiz-history";

function row(topic: string, answered: number, correct: number): QuizHistoryRow {
  return {
    id: `q-${topic}-${answered}`,
    title: `${topic} quiz`,
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    topic,
    difficulty: null,
    answered,
    correct,
    scorePct: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    createdat: "2026-11-01T00:00:00.000Z",
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  getQuizHistory.mockResolvedValue({ rows: [] });
});

describe("weakTopics (pure)", () => {
  it("keeps topics below the threshold with enough attempts, weakest first", () => {
    const weak = weakTopics([
      row("Kinematics", 10, 9), // 90% — strong
      row("Rotational Motion", 10, 4), // 40% — weak
      row("Waves", 2, 0), // 0% but only 2 attempts — too early to call
    ]);
    expect(weak.map((t) => t.label)).toEqual(["Rotational Motion"]);
    expect(weak[0].accuracy).toBeLessThan(WEAK_ACCURACY_BELOW);
    expect(weak[0].answered).toBeGreaterThanOrEqual(WEAK_MIN_ANSWERED);
  });
});

describe("<WeakTopics />", () => {
  it("lists the derived weak topics with their accuracy", async () => {
    getQuizHistory.mockResolvedValue({
      rows: [row("Rotational Motion", 10, 4), row("Kinematics", 10, 9)],
    });

    render(<WeakTopics />);

    expect(await screen.findByText("Rotational Motion")).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.queryByText("Kinematics")).not.toBeInTheDocument();
  });

  it("celebrates an all-strong practice record", async () => {
    getQuizHistory.mockResolvedValue({ rows: [row("Kinematics", 10, 9)] });

    render(<WeakTopics />);

    expect(await screen.findByText(/No weak topics right now/)).toBeInTheDocument();
  });

  it("explains the empty state before the first scored set", async () => {
    getQuizHistory.mockResolvedValue({ rows: [] });

    render(<WeakTopics />);

    expect(await screen.findByText(/No quiz attempts yet/)).toBeInTheDocument();
  });
});
