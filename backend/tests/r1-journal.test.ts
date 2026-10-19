import http from "node:http";
import type { AddressInfo } from "node:net";
import express from "express";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

// Same self-contained supabaseAdmin mock the r1-access suite uses (FIFO
// result queues per table + a recorded call log for scoping assertions).
const h = vi.hoisted(() => {
  type QueueResult = { data?: any; error?: any } | null;
  const queues: Record<string, QueueResult[]> = {};
  const calls: Array<{ table: string; method: string; args: any[] }> = [];
  const getUser = vi.fn();

  function enqueue(table: string, result: QueueResult) {
    (queues[table] ??= []).push(result);
  }
  function nextFor(table: string): QueueResult {
    const q = queues[table];
    return q && q.length > 0 ? q.shift()! : { data: [], error: null };
  }
  function makeBuilder(table: string) {
    const chain: any = {};
    const track =
      (method: string) =>
      (...args: any[]) => {
        calls.push({ table, method, args });
        return chain;
      };
    for (const m of [
      "select", "eq", "neq", "in", "is", "gte", "lte", "order", "limit",
      "insert", "update", "delete", "upsert",
    ]) {
      chain[m] = track(m);
    }
    const finish = () => Promise.resolve(nextFor(table));
    const terminal = () =>
      finish().then((r: any) =>
        Array.isArray(r.data)
          ? { data: r.data.length > 0 ? r.data[0] : null, error: r.error ?? null }
          : r
      );
    chain.single = (...args: any[]) => {
      calls.push({ table, method: "single", args });
      return terminal();
    };
    chain.maybeSingle = (...args: any[]) => {
      calls.push({ table, method: "maybeSingle", args });
      return terminal();
    };
    chain.then = (onFulfilled?: any, onRejected?: any) =>
      finish().then(onFulfilled, onRejected);
    chain.catch = (onRejected: any) => finish().catch(onRejected);
    return chain;
  }

  const supabaseAdmin: any = {
    auth: { getUser: (...args: any[]) => getUser(...args) },
    from: (table: string) => makeBuilder(table),
  };
  return { supabaseAdmin, enqueue, calls, getUser };
});

vi.mock("../src/db/supabase", () => ({
  supabaseAdmin: h.supabaseAdmin,
  createAuthClient: () => h.supabaseAdmin,
}));

const journalRouter = (await import("../src/api/r1-journal")).default;
const { invalidateR1GrantCache } = await import("../src/utils/r1Grants");
const USER_ID = "user-1";
const GRANTED_EMAIL = "granted@example.com";
const TODAY = "2026-10-18";


const servers: http.Server[] = [];

async function mount() {
  const app = express();
  app.use(express.json({ limit: "30mb" }));
  app.use("/api/r1/journal", journalRouter);
  const server = http.createServer(app);
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return makeRequest(`http://127.0.0.1:${port}`);
}

function makeRequest(base: string) {
  return async (method: string, path: string, body?: unknown) => {
    const res = await fetch(`${base}${path}`, {
      method,
      headers: { "Content-Type": "application/json", Authorization: "Bearer test-token" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    let parsed: any = null;
    try { parsed = await res.json(); } catch { parsed = null; }
    return { status: res.status, body: parsed };
  };
}

afterAll(async () => {
  await Promise.all(servers.map((s) => new Promise((r) => s.close(r))));
});

beforeEach(() => {
  invalidateR1GrantCache();
  h.getUser.mockResolvedValue({
    data: { user: { id: USER_ID, email: GRANTED_EMAIL } },
    error: null,
  });
  // requireR1Access reads the r1_grants allowlist; without a queued row the
  // middleware short-circuits to 403 before the handler runs.
  h.enqueue("r1_grants", { data: [{ email: GRANTED_EMAIL }], error: null });
});

const sampleEntry = (overrides: Record<string, unknown> = {}) => ({
  entryDate: TODAY,
  title: "Today's reflection",
  body: "Worked through the chemistry unit.",
  mood: "focused",
  tags: ["study"],
  ...overrides,
});

describe("r1 journal — 24h edit/delete lock", () => {
  it("rejects PUT with 410 once the row is older than 24h", async () => {
    const request = await mount();
    h.enqueue("r1_journal", {
      data: { created_at: new Date(Date.now() - 25 * 3600 * 1000).toISOString() },
      error: null,
    });

    const res = await request("PUT", "/api/r1/journal", sampleEntry());

    expect(res.status).toBe(410);
    expect(res.body).toMatchObject({ code: "JOURNAL_LOCKED" });
    expect(h.calls.some((c) => c.table === "r1_journal" && c.method === "upsert")).toBe(false);
  });

  it("accepts PUT while the row is still inside the 24h window", async () => {
    const request = await mount();
    h.enqueue("r1_journal", {
      data: { created_at: new Date(Date.now() - 23 * 3600 * 1000).toISOString() },
      error: null,
    });
    h.enqueue("r1_journal", {
      data: {
        id: "row-1", user_id: USER_ID, entry_date: TODAY, title: "Today's reflection",
        body: "Worked through the chemistry unit.", mood: "focused", tags: ["study"],
        created_at: new Date(Date.now() - 23 * 3600 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      error: null,
    });

    const res = await request("PUT", "/api/r1/journal", sampleEntry());

    expect(res.status).toBe(200);
    expect(res.body.id).toBe("row-1");
  });

  it("accepts PUT for a brand-new row (no prior entry for the day)", async () => {
    const request = await mount();
    h.enqueue("r1_journal", { data: null, error: null });
    h.enqueue("r1_journal", {
      data: {
        id: "row-new", user_id: USER_ID, entry_date: TODAY, title: "",
        body: "First entry of the day.", mood: null, tags: [],
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      },
      error: null,
    });

    const res = await request("PUT", "/api/r1/journal",
      sampleEntry({ body: "First entry of the day." }));

    expect(res.status).toBe(200);
    expect(res.body.id).toBe("row-new");
  });

  it("rejects DELETE with 410 once the row is older than 24h", async () => {
    const request = await mount();
    h.enqueue("r1_journal", {
      data: {
        id: "row-1", user_id: USER_ID,
        created_at: new Date(Date.now() - 25 * 3600 * 1000).toISOString(),
      },
      error: null,
    });

    const res = await request("DELETE", "/api/r1/journal/row-1");

    expect(res.status).toBe(410);
    expect(res.body.code).toBe("JOURNAL_LOCKED");
  });

  it("accepts DELETE while the row is inside the 24h window", async () => {
    const request = await mount();
    h.enqueue("r1_journal", {
      data: {
        id: "row-1", user_id: USER_ID,
        created_at: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
      },
      error: null,
    });
    h.enqueue("r1_journal", { data: null, error: null });

    const res = await request("DELETE", "/api/r1/journal/row-1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ deleted: true, id: "row-1" });
  });
});
