import { beforeEach, describe, expect, it } from "vitest";
import {
  activityByDay,
  attemptToQuizRow,
  mergeQuizRows,
  recordPracticeAttempt,
  listPracticeAttempts,
  type PracticeAttempt,
} from "@/features/practice/history";
import type { QuizHistoryRow } from "@/lib/api/ai-quiz-history";

function attempt(overrides: Partial<PracticeAttempt> = {}): PracticeAttempt {
  return {
    id: "local-1",
    createdAt: "2026-11-13T08:00:00.000Z",
    mode: "mcq",
    subjectSlug: "physics",
    subjectLabel: "Physics",
    classSlug: "class-11-notes",
    topic: "Kinematics",
    difficulty: "easy",
    timed: true,
    seconds: 40,
    answered: 4,
    correct: 3,
    scorePct: 75,
    xp: 36,
    review: [],
    ...overrides,
  };
}

function row(overrides: Partial<QuizHistoryRow> = {}): QuizHistoryRow {
  return {
    id: "server-1",
    title: "Physics practice",
    classSlug: "class-11-notes",
    subjectSlug: "physics",
    topic: "Kinematics",
    difficulty: "easy",
    format: "mcq",
    answered: 4,
    correct: 3,
    scorePct: 75,
    createdat: "2026-11-13T08:00:30.000Z",
    ...overrides,
  };
}

describe("practice history", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("keeps a device set when the server has not stored it", () => {
    const local = attemptToQuizRow(attempt());
    const merged = mergeQuizRows([], [local]);
    expect(merged).toEqual([local]);
  });

  it("drops a device set the server already has", () => {
    const local = attemptToQuizRow(attempt());
    const saved = row();
    expect(mergeQuizRows([saved], [local]).map((item) => item.id)).toEqual(["server-1"]);
  });

  it("records a set that analytics can read back", () => {
    recordPracticeAttempt(attempt());
    const stored = listPracticeAttempts();
    expect(stored).toHaveLength(1);
    expect(stored[0]?.scorePct).toBe(75);
    expect(attemptToQuizRow(stored[0]!).subjectSlug).toBe("physics");
  });

  it("counts sets on the day they were scored", () => {
    const days = activityByDay(
      [attemptToQuizRow(attempt())],
      3,
      new Date("2026-11-13T12:00:00.000Z"),
    );
    expect(days).toHaveLength(3);
    expect(days[2]).toMatchObject({ date: "2026-11-13", sets: 1, answered: 4 });
    expect(days[0]?.sets).toBe(0);
  });
});
