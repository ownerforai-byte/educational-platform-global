import express from "express";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import type { Server } from "node:http";

/**
 * /api/mobile cursor-pagination convention (Agent 2 task: pagination pattern
 * for community-style lists). Pins the ?limit/&cursor contract, the
 * { items, nextCursor } envelope, the 50-item cap, and malformed-cursor
 * tolerance — the shape every mobile list endpoint must copy.
 */
import mobileRouter from "../../src/api/mobile";

const app = express();
app.use("/api/mobile", mobileRouter);

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
  data: { items: Array<{ id: string }>; nextCursor: string | null };
}

async function getPage(query: string): Promise<{ res: Response; body: Page }> {
  const res = await fetch(`${baseUrl}/api/mobile/demo/page${query}`);
  return { res, body: (await res.json()) as Page };
}

describe("GET /api/mobile/demo/page — cursor pagination convention", () => {
  test("first page: default limit 20, nextCursor present", async () => {
    const { res, body } = await getPage("");
    expect(res.status).toBe(200);
    expect(body.data.items).toHaveLength(20);
    expect(body.data.items[0].id).toBe("row-1");
    expect(body.data.nextCursor).toBeTruthy();
  });

  test("walking cursors reaches exactly 95 rows and then terminates", async () => {
    const seen: string[] = [];
    let cursor: string | null = null;
    let pages = 0;
    do {
      const query = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
      const { body } = await getPage(query);
      seen.push(...body.data.items.map((i) => i.id));
      cursor = body.data.nextCursor;
      pages += 1;
    } while (cursor && pages < 20);
    expect(pages).toBe(5);
    expect(seen).toHaveLength(95);
    expect(seen[0]).toBe("row-1");
    expect(seen[94]).toBe("row-95");
    expect(cursor).toBeNull();
  });

  test("explicit limit is honored and capped at 50", async () => {
    const capped = await getPage("?limit=500");
    expect(capped.body.data.items).toHaveLength(50);

    const small = await getPage("?limit=3");
    expect(small.body.data.items).toHaveLength(3);
    expect(small.body.data.items[2].id).toBe("row-3");
  });

  test("malformed cursor falls back to page 1 instead of erroring", async () => {
    const { res, body } = await getPage("?cursor=@@@not-base64@@@");
    expect(res.status).toBe(200);
    expect(body.data.items[0].id).toBe("row-1");
  });

  test("last page has null nextCursor", async () => {
    // 95 rows, limit 50 → second page holds rows 51..95 and ends the list.
    const first = await getPage("?limit=50");
    expect(first.body.data.nextCursor).toBeTruthy();
    const last = await getPage(`?limit=50&cursor=${encodeURIComponent(first.body.data.nextCursor!)}`);
    expect(last.body.data.items).toHaveLength(45);
    expect(last.body.data.nextCursor).toBeNull();
  });
});
