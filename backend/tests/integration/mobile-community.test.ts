import express from "express";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import type { Server } from "node:http";

/**
 * GET /api/mobile/community — cursor-paginated public post list (Agent 2,
 * session 3 CONTINUE step 3). Read-only and compact: publishing and
 * moderation stay on the existing /api/feed routes. Keyset pagination runs
 * on created_at DESC with limit + 1 prefetch to detect the next page.
 */

interface Row {
  [key: string]: unknown;
}

const state = {
  posts: [] as Row[],
  fail: false,
};

vi.mock("../../src/db/supabase", () => {
  function builder(table: string) {
    const filters: Array<(row: Row) => boolean> = [];
    let ascending = true;
    let maxRows: number | undefined;
    const api = {
      select() {
        return api;
      },
      eq(field: string, value: unknown) {
        filters.push((row) => row[field] === value);
        return api;
      },
      lt(field: string, value: unknown) {
        filters.push((row) => String(row[field]) < String(value));
        return api;
      },
      order(_field: string, opts: { ascending?: boolean }) {
        ascending = opts?.ascending ?? true;
        return api;
      },
      limit(n: number) {
        maxRows = n;
        return api;
      },
      then(resolve: (v: unknown) => void, reject: (e: unknown) => void) {
        if (state.fail) {
          return reject({ message: "supabase down (simulated)" });
        }
        const rows = (table === "community_feed_posts" ? state.posts : []).filter((row) =>
          filters.every((f) => f(row)),
        );
        const sorted = [...rows].sort((a, b) =>
          ascending
            ? String(a.created_at).localeCompare(String(b.created_at))
            : String(b.created_at).localeCompare(String(a.created_at)),
        );
        const limited = maxRows !== undefined ? sorted.slice(0, maxRows) : sorted;
        resolve({ data: limited.map((row) => ({ ...row })), error: null });
      },
    };
    return api;
  }
  return { supabaseAdmin: { from: builder } };
});

vi.mock("../../src/db/repositories/base.repository.js", () => ({
  isMissingTable: (error: { message?: string } | null) =>
    Boolean(error?.message?.includes("does not exist")),
}));

import communityRouter from "../../src/api/mobile/community";

const app = express();
app.use("/api/mobile/community", communityRouter);

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
  state.posts = [];
  for (let i = 1; i <= 25; i++) {
    const at = new Date(Date.UTC(2026, 0, 1, 0, 0, i)).toISOString();
    state.posts.push({
      id: `post-${String(i).padStart(2, "0")}`,
      author_id: `author-${i % 3}`,
      title: `Post ${i}`,
      body: `Body ${i}`,
      category: i % 2 === 0 ? "physics" : "general",
      kind: "discussion",
      visibility: i === 7 ? "private" : "public",
      created_at: at,
      updated_at: at,
    });
  }
});

interface Page {
  ok: boolean;
  data: {
    items: Array<{ id: string; authorId: string; title: string; createdAt: string }>;
    nextCursor: string | null;
  };
}

async function getPage(query: string): Promise<Page> {
  const res = await fetch(`${baseUrl}/api/mobile/community${query}`);
  expect(res.status).toBe(200);
  return (await res.json()) as Page;
}

describe("GET /api/mobile/community", () => {
  test("serves the newest public posts first in compact rows", async () => {
    const body = await getPage("?limit=5");
    expect(body.ok).toBe(true);
    expect(body.data.items.map((p) => p.id)).toEqual([
      "post-25",
      "post-24",
      "post-23",
      "post-22",
      "post-21",
    ]);
    expect(body.data.items[0]).toMatchObject({ authorId: "author-1", title: "Post 25" });
  });

  test("excludes private rows and honours the category filter", async () => {
    const body = await getPage("?limit=50&category=physics");
    const ids = body.data.items.map((p) => p.id);
    expect(ids).not.toContain("post-7"); // private
    for (const id of ids) {
      const n = Number(id.split("-")[1]);
      expect(n % 2).toBe(0);
    }
  });

  test("walking cursors yields every public post exactly once, then terminates", async () => {
    const seen: string[] = [];
    let cursor: string | null = null;
    do {
      const query = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
      const body = await getPage(query);
      seen.push(...body.data.items.map((p) => p.id));
      cursor = body.data.nextCursor;
    } while (cursor);
    expect(seen).toHaveLength(24); // 25 rows minus the private one
    expect(new Set(seen).size).toBe(seen.length);
    expect(seen[0]).toBe("post-25");
    expect(seen[seen.length - 1]).toBe("post-01");
  });

  test("a database failure is a 500, not a truncated page", async () => {
    state.fail = true;
    const res = await fetch(`${baseUrl}/api/mobile/community`);
    expect(res.status).toBe(500);
  });
});
