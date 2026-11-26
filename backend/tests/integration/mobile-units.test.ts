import express from "express";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import type { Server } from "node:http";

/**
 * GET /api/mobile/units?subject=… — units for one subject (Agent 2, session 3
 * CONTINUE step 1). Reuses the website's subjects/chapters/topics tables via
 * the shared content cache and returns compact rows for the native
 * drill-down screen.
 */

interface Row {
  [key: string]: unknown;
}

const state = {
  subjects: [] as Row[],
  chapters: [] as Row[],
  topics: [] as Row[],
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
      limit() {
        return api;
      },
      then(resolve: (v: unknown) => void, reject: (e: unknown) => void) {
        if (state.fail) {
          return reject(new Error("supabase down (simulated)"));
        }
        const source =
          table === "subjects" ? state.subjects : table === "chapters" ? state.chapters : state.topics;
        const rows = source.filter((row) => filters.every((f) => f(row)));
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

import unitsRouter from "../../src/api/mobile/units";

const app = express();
app.use("/api/mobile/units", unitsRouter);

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
  state.subjects = [
    { id: "sub-11-phy", slug: "physics", name: "Physics", is_active: true },
    { id: "sub-11-bio", slug: "biology", name: "Biology", is_active: true },
  ];
  state.chapters = [
    { id: "chap-gravitation", subject_id: "sub-11-phy", slug: "gravitation", title: "Gravitation", is_active: true, order: 3 },
    { id: "chap-kinematics", subject_id: "sub-11-phy", slug: "kinematics", title: "Kinematics", is_active: true, order: 1 },
    { id: "chap-vectors", subject_id: "sub-11-phy", slug: "vectors", title: "Vectors & Scalars", is_active: true, order: 2 },
    { id: "chap-off", subject_id: "sub-11-phy", slug: "retired", title: "Retired", is_active: false, order: 0 },
  ];
  state.topics = [
    { id: "t1", chapter_id: "chap-kinematics", is_active: true },
    { id: "t2", chapter_id: "chap-kinematics", is_active: true },
    { id: "t3", chapter_id: "chap-gravitation", is_active: true },
    { id: "t4", chapter_id: "chap-vectors", is_active: false },
  ];
});

interface UnitsBody {
  data: {
    subject: { id: string; slug: string; name: string };
    units: Array<{ id: string; slug: string; title: string; order: number; topicCount: number }>;
  };
}

describe("GET /api/mobile/units", () => {
  test("returns the subject's units in curriculum order with topic counts", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/units?subject=physics`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as UnitsBody;
    expect(body.data.subject).toEqual({ id: "sub-11-phy", slug: "physics", name: "Physics" });
    expect(body.data.units).toEqual([
      { id: "chap-kinematics", slug: "kinematics", title: "Kinematics", order: 1, topicCount: 2 },
      { id: "chap-vectors", slug: "vectors", title: "Vectors & Scalars", order: 2, topicCount: 0 },
      { id: "chap-gravitation", slug: "gravitation", title: "Gravitation", order: 3, topicCount: 1 },
    ]);
  });

  test("missing subject parameter is a 400, unknown subject a 404", async () => {
    const missing = await fetch(`${baseUrl}/api/mobile/units`);
    expect(missing.status).toBe(400);

    const unknown = await fetch(`${baseUrl}/api/mobile/units?subject=astrology`);
    expect(unknown.status).toBe(404);
  });

  test("inactive chapters are excluded from the unit list", async () => {
    const res = await fetch(`${baseUrl}/api/mobile/units?subject=physics`);
    const body = (await res.json()) as UnitsBody;
    expect(body.data.units.some((u) => u.slug === "retired")).toBe(false);
  });

  test("a database failure is a 500", async () => {
    state.fail = true;
    const res = await fetch(`${baseUrl}/api/mobile/units?subject=physics`);
    expect(res.status).toBe(500);
  });
});
