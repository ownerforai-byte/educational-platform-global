import express from "express";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import type { Server } from "node:http";

/**
 * GET /api/mobile/syllabus — first real mobile data endpoint (Agent 2,
 * Supervisor session 2 CONTINUE). Reuses the website's `classes`/`subjects`
 * tables through the shared content cache and returns a compact two-level
 * tree (id/slug/name only) for the native syllabus screen.
 *
 * Pins: the tree shape and ordering, subject→class grouping, the shared
 * { ok, data } envelope + schema validation, CDN cache headers, DB-error
 * handling (500, never a partial tree), and that classes without subjects
 * still appear with an empty subjects array.
 */

interface Row {
  [key: string]: unknown;
}

const state = {
  classes: [] as Row[],
  subjects: [] as Row[],
  fail: false,
};

vi.mock("../../src/db/supabase", () => {
  function builder(table: string) {
    const filters: Array<(row: Row) => boolean> = [];
    let ascending = true;
    const api = {
      select() {
        return api;
      },
      eq(field: string, value: unknown) {
        filters.push((row) => row[field] === value);
        return api;
      },
      order(_field: string, opts: { ascending?: boolean }) {
        ascending = opts?.ascending ?? true;
        return api;
      },
      then(resolve: (v: unknown) => void, reject: (e: unknown) => void) {
        if (state.fail) {
          return reject(new Error("supabase down (simulated)"));
        }
        const table_ = table === "classes" ? state.classes : state.subjects;
        const rows = table_.filter((row) => filters.every((f) => f(row)));
        const sorted = [...rows].sort((a, b) =>
          ascending ? Number(a.order) - Number(b.order) : Number(b.order) - Number(a.order),
        );
        resolve({ data: sorted.map((row) => ({ ...row })), error: null });
      },
    };
    return api;
  }
  return { supabaseAdmin: { from: builder } };
});

vi.mock("../../src/lib/cache.js", () => ({
  CONTENT_CACHE_TTL_MS: 60_000,
  CONTENT_CDN_CACHE_CONTROL: "public, max-age=60, s-maxage=300",
  contentCache: {
    getOrLoad: async <T>(_key: string, _ttl: number, loader: () => Promise<T>) => loader(),
  },
}));

import syllabusRouter from "../../src/api/mobile/syllabus";

const app = express();
app.use("/api/mobile/syllabus", syllabusRouter);

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

beforeEach(() => {
  state.fail = false;
  state.classes = [
    { id: "c10", slug: "class-10", name: "Class 10", is_active: true, order: 2 },
    { id: "c11", slug: "class-11", name: "Class 11", is_active: true, order: 1 },
    { id: "cOff", slug: "class-old", name: "Retired", is_active: false, order: 0 },
  ];
  state.subjects = [
    { id: "s phy11", class_id: "c11", slug: "physics", name: "Physics", is_active: true, order: 2 },
    { id: "s math11", class_id: "c11", slug: "mathematics", name: "Mathematics", is_active: true, order: 1 },
    { id: "s bio10", class_id: "c10", slug: "biology", name: "Biology", is_active: true, order: 1 },
    { id: "s off", class_id: "c10", slug: "hidden", name: "Hidden", is_active: false, order: 0 },
  ];
});

interface SyllabusBody {
  ok: boolean;
  data: {
    classes: Array<{
      id: string;
      slug: string;
      name: string;
      subjects: Array<{ id: string; slug: string; name: string }>;
    }>;
  };
}

describe("GET /api/mobile/syllabus", () => {
  test("returns the full two-level tree, ordered, with inactive rows excluded", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/syllabus`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as SyllabusBody;
    expect(body.ok).toBe(true);
    expect(body.data.classes).toEqual([
      {
        id: "c11",
        slug: "class-11",
        name: "Class 11",
        subjects: [
          { id: "s math11", slug: "mathematics", name: "Mathematics" },
          { id: "s phy11", slug: "physics", name: "Physics" },
        ],
      },
      {
        id: "c10",
        slug: "class-10",
        name: "Class 10",
        subjects: [{ id: "s bio10", slug: "biology", name: "Biology" }],
      },
    ]);
  });

  test("keeps a class with no active subjects (empty array, not dropped)", async () => {
    state.subjects = [];
    const res = await fetch(`${baseUrl}/api/mobile/syllabus`);
    const body = (await res.json()) as SyllabusBody;
    expect(body.data.classes).toHaveLength(2);
    expect(body.data.classes[0].subjects).toEqual([]);
  });

  test("an empty curriculum is still a valid 200 (client shows empty state)", async () => {
    state.classes = [];
    state.subjects = [];
    const res = await fetch(`${baseUrl}/api/mobile/syllabus`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, data: { classes: [] } });
  });

  test("is CDN-cacheable like the website content routes", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/syllabus`);
    expect(res.headers.get("cache-control")).toBe("public, max-age=60, s-maxage=300");
  });

  test("a database failure is a 500, never a silently empty tree", async () => {
    state.fail = true;
    const res = await fetch(`${baseUrl}/api/mobile/syllabus`);
    expect(res.status).toBe(500);
  });
});
