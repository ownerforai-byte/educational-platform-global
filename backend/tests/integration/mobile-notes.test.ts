import express from "express";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import type { Server } from "node:http";
import path from "path";

/**
 * GET /api/mobile/notes — cursor-paginated r-notes catalog (Agent 2, session 3
 * CONTINUE step 2). Reads the same manifest the website /api/r-notes route
 * serves; the mobile route adds the shared {items, nextCursor} pagination.
 * The manifest is loaded from a test fixture so the contract does not depend
 * on curriculum content in the repo.
 */

const FIXTURE_DIR = path.join(__dirname, "..", "fixtures", "mobile");

vi.mock("../../src/utils/paths", () => ({
  resolveDataPath: (...subpaths: string[]) => path.join(FIXTURE_DIR, "r-notes", ...subpaths),
}));

import notesRouter from "../../src/api/mobile/notes";

const app = express();
app.use("/api/mobile/notes", notesRouter);

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
    items: Array<{ id: string; subject: string; chapter: string; title: string; noteCount: number }>;
    nextCursor: string | null;
  };
}

async function getPage(query: string): Promise<Page> {
  const res = await fetch(`${baseUrl}/api/mobile/notes${query}`);
  expect(res.status).toBe(200);
  return (await res.json()) as Page;
}

describe("GET /api/mobile/notes", () => {
  test("returns compact rows with noteCount and a nextCursor", async () => {
    const body = await getPage("?limit=3");
    expect(body.ok).toBe(true);
    expect(body.data.items).toHaveLength(3);
    expect(body.data.items[0]).toEqual({
      id: "kin-01",
      subject: "physics",
      chapter: "kinematics",
      title: "Motion in a Straight Line",
      noteCount: 3,
    });
    expect(body.data.nextCursor).toBeTruthy();
  });

  test("walking cursors yields every catalog row exactly once", async () => {
    const seen: string[] = [];
    let cursor: string | null = null;
    do {
      const query = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
      const body = await getPage(query);
      seen.push(...body.data.items.map((i) => i.id));
      cursor = body.data.nextCursor;
    } while (cursor);
    expect(seen).toEqual(["kin-01", "kin-02", "opt-01", "chem-01"]);
  });

  test("subject and chapter filters narrow the page", async () => {
    const bySubject = await getPage("?subject=chemistry");
    expect(bySubject.data.items.map((i) => i.id)).toEqual(["chem-01"]);
    expect(bySubject.data.nextCursor).toBeNull();

    const byChapter = await getPage("?chapter=optics");
    expect(byChapter.data.items.map((i) => i.id)).toEqual(["opt-01"]);
  });

  test("limit is clamped and the last page ends with a null cursor", async () => {
    const first = await getPage("?limit=3");
    expect(first.data.items).toHaveLength(3);
    const last = await getPage(`?limit=3&cursor=${encodeURIComponent(first.data.nextCursor!)}`);
    expect(last.data.items.map((i) => i.id)).toEqual(["chem-01"]);
    expect(last.data.nextCursor).toBeNull();
  });
});
