import express from "express";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import type { Server } from "node:http";
import path from "path";

/**
 * GET /api/mobile/practice — cursor-paginated exam catalog (Agent 2, session 3
 * CONTINUE step 3). Reads the same content/practice/exams files the website
 * /api/tests route serves; tier-gated PYQs stay on /api/pyqs untouched. The
 * exam files come from a test fixture so the contract does not depend on
 * curriculum content in the repo.
 */

const FIXTURE_DIR = path.join(__dirname, "..", "fixtures", "mobile");

vi.mock("../../src/utils/paths", () => ({
  resolveDataPath: (...subpaths: string[]) =>
    path.join(FIXTURE_DIR, ...subpaths),
}));

import practiceRouter from "../../src/api/mobile/practice";

const app = express();
app.use("/api/mobile/practice", practiceRouter);

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no port");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise((resolve) => server?.close(resolve));
});

interface Page {
  ok: boolean;
  data: {
    items: Array<{ slug: string; title: string; durationMin: number; questionCount: number }>;
    nextCursor: string | null;
  };
}

describe("GET /api/mobile/practice", () => {
  test("lists exams with compact rows in a deterministic order", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/practice`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as Page;
    expect(body.data.items).toEqual([
      { slug: "exam-a", title: "Model Exam A", durationMin: 60, questionCount: 2 },
      { slug: "exam-b", title: "Model Exam B", durationMin: 90, questionCount: 1 },
    ]);
    expect(body.data.nextCursor).toBeNull();
  });

  test("paginates with the shared cursor convention", async () => {
    const first = await fetch(`${baseUrl}/api/mobile/practice?limit=1`);
    const firstBody = (await first.json()) as Page;
    expect(firstBody.data.items).toHaveLength(1);
    expect(firstBody.data.nextCursor).toBeTruthy();

    const second = await fetch(
      `${baseUrl}/api/mobile/practice?limit=1&cursor=${encodeURIComponent(firstBody.data.nextCursor!)}`,
    );
    const secondBody = (await second.json()) as Page;
    expect(secondBody.data.items.map((i) => i.slug)).toEqual(["exam-b"]);
    expect(secondBody.data.nextCursor).toBeNull();
  });
});
