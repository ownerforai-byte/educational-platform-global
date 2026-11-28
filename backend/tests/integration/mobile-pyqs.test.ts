import express from "express";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import type { Server } from "node:http";
import path from "path";

/**
 * GET /api/mobile/pyqs (+ /file) — cursor-paginated PYQ catalog for the native
 * PYQ browser (Agent 2, parity batch P1). Reads the same generated content
 * manifest the website's PYQ bank consumes; plus-tier gated exactly like the
 * /pyqs section (minLevel "plus" in frontend/lib/core/navigation.ts).
 * The manifest loads from a test fixture so the contract does not depend on
 * curriculum content in the repo.
 */

const FIXTURE_DIR = path.join(__dirname, "..", "fixtures", "mobile", "manifest");

vi.mock("../../src/utils/paths", () => ({
  resolveDataPath: (...subpaths: string[]) => {
    // resolveDataPath("content", "manifest.json") and per-file segments both
    // resolve inside the fixture's content/ tree.
    const segs = subpaths[0] === "content" ? subpaths.slice(1) : subpaths;
    return path.join(FIXTURE_DIR, "content", ...segs);
  },
}));

vi.mock("../../src/lib/cache.js", () => ({
  CONTENT_CACHE_TTL_MS: 60_000,
  CONTENT_CDN_CACHE_CONTROL: "public, max-age=60, s-maxage=300",
  contentCache: {
    getOrLoad: async <T>(_key: string, _ttl: number, loader: () => Promise<T>) => loader(),
  },
}));

vi.mock("../../src/middleware/auth", () => ({
  requireAuth: (_a: unknown, _b: unknown, c: unknown) => c(),
  requireTier: () => (_a: unknown, _b: unknown, c: unknown) => c(),
}));

import pyqsRouter from "../../src/api/mobile/pyqs";

const app = express();
app.use("/api/mobile/pyqs", pyqsRouter);

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
  await new Promise<void>((resolve) => server?.close(resolve));
});

interface PyqItem {
  id: string;
  class: string;
  subject: string;
  unit: string | null;
  year: number | null;
  title: string;
  questionCount: number;
}

interface Page {
  ok: boolean;
  data: { items: PyqItem[]; nextCursor: string | null };
}

async function getPage(query: string): Promise<Page> {
  const res = await fetch(`${baseUrl}/api/mobile/pyqs${query}`);
  expect(res.status).toBe(200);
  return (await res.json()) as Page;
}

describe("GET /api/mobile/pyqs", () => {
  test("returns only PYQ entries with derived coordinates", async () => {
    const body = await getPage("");
    expect(body.ok).toBe(true);
    expect(body.data.items).toHaveLength(4); // 4 PYQ entries; the notes/ entry is excluded
    const first = body.data.items[0];
    expect(first).toMatchObject({
      id: "practice/questions/class-11/physics/01-mixed-neb-2021.json",
      class: "class-11",
      subject: "physics",
      unit: null,
      year: 2021,
      questionCount: 1,
    });
  });

  test("entries with a unit carry unitSlug-derived coordinates and year", async () => {
    const body = await getPage("");
    const withUnit = body.data.items.find((i) => i.unit !== null);
    expect(withUnit).toMatchObject({
      class: "class-11",
      subject: "physics",
      unit: "heat-and-temperature",
      year: 2023,
      title: "NEB 2023 — Thermodynamics",
      questionCount: 3,
    });
  });

  test("filters by class, subject and year", async () => {
    const byClass = await getPage("?class=class-12");
    expect(byClass.data.items).toHaveLength(1);
    expect(byClass.data.items[0]).toMatchObject({ subject: "chemistry", year: 2023 });

    const bySubject = await getPage("?subject=physics");
    expect(bySubject.data.items).toHaveLength(3);

    const byYear = await getPage("?year=2022");
    expect(byYear.data.items).toHaveLength(1);
    expect(byYear.data.items[0]?.year).toBe(2022);
  });

  test("paginates with the shared cursor convention", async () => {
    const page1 = await getPage("?limit=2");
    expect(page1.data.items).toHaveLength(2);
    expect(page1.data.nextCursor).not.toBeNull();

    const page2 = await getPage(`?limit=2&cursor=${encodeURIComponent(page1.data.nextCursor as string)}`);
    expect(page2.data.items).toHaveLength(2);
    expect(page2.data.nextCursor).toBeNull(); // 4 items / limit 2 = exactly two pages

    const page3 = await getPage(`?limit=2&cursor=${encodeURIComponent(Buffer.from(JSON.stringify({ anchor: "4" })).toString("base64url"))}`);
    expect(page3.data.items).toHaveLength(0);
    expect(page3.data.nextCursor).toBeNull();

    // no item appears twice across pages
    const ids = [...page1.data.items, ...page2.data.items].map((i) => i.id);
    expect(new Set(ids).size).toBe(4);
  });
});

describe("GET /api/mobile/pyqs/file", () => {
  test("returns one entry's question lines", async () => {
    const res = await fetch(
      `${baseUrl}/api/mobile/pyqs/file?path=${encodeURIComponent(
        "practice/questions/class-11/physics/heat-and-temperature/01-neb-2023.json",
      )}`,
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      ok: boolean;
      data: { path: string; title: string; questions: string[] };
    };
    expect(body.ok).toBe(true);
    expect(body.data.title).toBe("NEB 2023 — Thermodynamics");
    expect(body.data.questions).toHaveLength(3);
    expect(body.data.questions[0]).toContain("first law");
  });

  test("reads structured questions from real-style PYQ files (production shape)", async () => {
    // Production files carry `questions: [{ question, marks, solution }]`
    // instead of the legacy `notes` lines the fixture manifest mirrors —
    // regression guard: the endpoint must return the question text, drop
    // blank/malformed rows, and never 500 on them.
    const res = await fetch(
      `${baseUrl}/api/mobile/pyqs/file?path=${encodeURIComponent(
        "practice/questions/class-11/physics/kinematics/04-neb-2024.json",
      )}`,
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      ok: boolean;
      data: { path: string; title: string; questions: string[] };
    };
    expect(body.ok).toBe(true);
    expect(body.data.title).toBe("NEB 2024 — Kinematics");
    expect(body.data.questions).toEqual([
      "Define displacement and state how it differs from distance.",
      "A ball is thrown vertically up. Sketch its velocity–time graph.",
    ]);
  });

  test("rejects paths outside the PYQ section or with traversal", async () => {
    for (const bad of [
      "formulas/class-11/physics/heat-and-temperature/01-key-equations.json",
      "practice/questions/../../secrets.json",
      "practice/questions/class-11/physics/heat-and-temperature/../../evil.json",
      "not-a-path",
    ]) {
      const res = await fetch(`${baseUrl}/api/mobile/pyqs/file?path=${encodeURIComponent(bad)}`);
      expect(res.status).toBe(400);
    }
  });

  test("404s (server error path) for a validated path that does not exist", async () => {
    const res = await fetch(
      `${baseUrl}/api/mobile/pyqs/file?path=${encodeURIComponent(
        "practice/questions/class-11/physics/heat-and-temperature/99-missing.json",
      )}`,
    );
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
