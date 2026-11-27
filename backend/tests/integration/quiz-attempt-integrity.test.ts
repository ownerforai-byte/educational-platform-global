import express, { type Express } from "express";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";

const h = vi.hoisted(() => {
  const attempts: any[] = [];
  const history: any[] = [];
  const historyInserts = vi.fn();

  function reset() {
    attempts.length = 0;
    history.length = 0;
    historyInserts.mockReset();
  }

  function builder(table: string) {
    let operation = "select";
    let payload: any;
    const filters: Array<[string, unknown]> = [];
    const chain: any = {
      select: () => chain,
      eq: (column: string, value: unknown) => {
        filters.push([column, value]);
        return chain;
      },
      insert: (value: unknown) => {
        operation = "insert";
        payload = value;
        return chain;
      },
      update: (value: unknown) => {
        operation = "update";
        payload = value;
        return chain;
      },
      maybeSingle: () => chain.then((result: any) => ({
        data: Array.isArray(result.data) ? result.data[0] ?? null : result.data,
        error: result.error,
      })),
      then: (resolve: (value: any) => unknown) => {
        const rows = table === "quiz_attempts" ? attempts : history;
        const matches = () => rows.filter((row) => filters.every(([key, value]) => row[key] === value));
        let result: any = { data: [], error: null };
        if (operation === "insert") {
          if (table === "quiz_attempts") attempts.push(structuredClone(payload));
          if (table === "quiz_history") {
            history.push(structuredClone(payload));
            historyInserts(structuredClone(payload));
          }
        } else if (operation === "update") {
          const selected = matches();
          for (const row of selected) Object.assign(row, payload);
          result = { data: selected.map((row) => ({ id: row.id })), error: null };
        } else {
          result = { data: matches(), error: null };
        }
        return Promise.resolve(result).then(resolve);
      },
    };
    return chain;
  }

  return {
    attempts,
    history,
    historyInserts,
    reset,
    admin: { from: (table: string) => builder(table) },
  };
});

vi.mock("../../src/db/supabase", () => ({ supabaseAdmin: h.admin }));
vi.mock("../../src/middleware/auth", () => ({
  requireAuth: (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    (req as express.Request & { user: { id: string } }).user = {
      id: req.get("x-user-id") ?? "user-1",
    };
    next();
  },
}));

import quizHistoryRoutes from "../../src/api/ai/quiz-history.controller";
import { issueQuizAttempt, type QuizAttemptFormat } from "../../src/api/ai/quiz-attempt.service";
import { errorHandler } from "../../src/middleware/error-handler";
import { xpForVerifiedSet } from "../../src/utils/xp";

const question = (prompt: string, correctIndex: number) => ({
  prompt,
  options: ["A", "B"],
  correctIndex,
  difficulty: "easy" as const,
  subject: "Physics",
  topic: "Motion",
  explanation: "A is correct.",
  format: "mcq" as const,
});

const questions = [question("First?", 0), question("Second?", 1)];

let server: ReturnType<Express["listen"]>;
let baseUrl: string;

beforeAll(async () => {
  const app = express();
  app.use(express.json());
  app.use("/api/ai-quiz-history", quizHistoryRoutes);
  app.use(errorHandler);
  await new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const address = server.address();
      baseUrl = `http://127.0.0.1:${address && typeof address === "object" ? address.port : 0}`;
      resolve();
    });
  });
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

beforeEach(() => h.reset());

async function issue(format: QuizAttemptFormat = "mcq") {
  return issueQuizAttempt({
    userId: "user-1",
    metadata: { title: "Server title", subjectSlug: "physics", format },
    questions: format === "mcq" ? questions : questions.map((item) => ({
      ...item,
      options: [],
      correctIndex: -1,
      format,
      acceptedAnswers: ["answer"],
      modelAnswer: "Model answer",
    })),
  });
}

function save(body: Record<string, unknown>, userId = "user-1") {
  return fetch(`${baseUrl}/api/ai-quiz-history`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-user-id": userId },
    body: JSON.stringify(body),
  });
}

describe("quiz history attempt integrity", () => {
  test("ignores forged counts and stores the server grade", async () => {
    const attempt = await issue();
    const response = await save({
      attemptId: attempt.attemptId,
      title: "Client title",
      questions,
      responses: [{ selectedIndex: 0 }, { selectedIndex: 0 }],
      answered: 2,
      correct: 2,
      scorePct: 100,
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ saved: true, migrated: true, verified: true });
    expect(h.history).toHaveLength(1);
    expect(h.history[0]).toMatchObject({
      title: "Server title",
      subject_slug: "physics",
      answered: 2,
      correct: 1,
      score_pct: 50,
      verification_status: "verified",
      verification_reason: null,
      attempt_id: attempt.attemptId,
      question_count: 2,
      format: "mcq",
    });
    expect(h.history[0].verified_at).toEqual(expect.any(String));
  });

  test("saves client-only results as explicitly unverified", async () => {
    const response = await save({
      questions,
      answered: 2,
      correct: 2,
      scorePct: 100,
    });

    expect(response.status).toBe(200);
    expect(h.history[0]).toMatchObject({
      verification_status: "unverified",
      verification_reason: "client-unverified",
      attempt_id: null,
    });
    expect(xpForVerifiedSet(h.history[0])).toBe(0);
  });

  test("rejects replay without inserting another history row", async () => {
    const attempt = await issue();
    const body = {
      attemptId: attempt.attemptId,
      questions,
      responses: [{ selectedIndex: 0 }, { selectedIndex: 1 }],
      answered: 2,
      correct: 2,
      scorePct: 100,
    };
    expect((await save(body)).status).toBe(200);
    expect((await save(body)).status).toBe(409);
    expect(h.historyInserts).toHaveBeenCalledTimes(1);
  });

  test("rejects another user's attempt", async () => {
    const attempt = await issue();
    const response = await save({
      attemptId: attempt.attemptId,
      questions,
      responses: [{ selectedIndex: 0 }, { selectedIndex: 1 }],
      answered: 2,
      correct: 2,
      scorePct: 100,
    }, "user-2");

    expect(response.status).toBe(403);
    expect(h.historyInserts).not.toHaveBeenCalled();
    expect(h.attempts[0].consumed_at).toBeNull();
  });

  test("rejects changed question content without consuming the attempt", async () => {
    const attempt = await issue();
    const changed = questions.map((item) => ({ ...item }));
    changed[0].prompt = "Changed?";
    const body = {
      attemptId: attempt.attemptId,
      questions: changed,
      responses: [{ selectedIndex: 0 }, { selectedIndex: 1 }],
      answered: 2,
      correct: 2,
      scorePct: 100,
    };
    expect((await save(body)).status).toBe(400);
    expect(h.attempts[0].consumed_at).toBeNull();

    body.questions = questions;
    expect((await save(body)).status).toBe(200);
  });

  test("keeps writing attempts readable but ineligible for XP", async () => {
    const attempt = await issue("short-answer");
    const writingQuestions = h.attempts[0].questions;
    const response = await save({
      attemptId: attempt.attemptId,
      questions: writingQuestions,
      responses: [{ answer: "My answer" }, { answer: "Another answer" }],
      answered: 2,
      correct: 2,
      scorePct: 100,
    });

    expect(response.status).toBe(200);
    expect(h.history[0]).toMatchObject({
      answered: 2,
      correct: 0,
      score_pct: null,
      verification_status: "unverified",
      verification_reason: "writing-ai-grading",
      format: "short-answer",
    });
    expect(xpForVerifiedSet(h.history[0])).toBe(0);
  });
});
