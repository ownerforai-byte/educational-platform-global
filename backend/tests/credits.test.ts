import { describe, expect, test, beforeEach, vi } from "vitest";

/**
 * Regression suite for the compare-and-swap credit primitives (the
 * 2026-09-26 redesign). These pin the exact weak points that shipped once:
 *
 *  1. lost updates — two writers applying the same read balance;
 *  2. silent no-op writes — PostgREST answers 200 with zero rows;
 *  3. double grants / false 402s when a parallel reset wins the race.
 *
 * The scripted mock below queues a response per (table, operation), so each
 * test controls exactly what the database answers on every round-trip.
 */

type Res = { data: unknown; error: { message: string; code?: string } | null };

function makeDb() {
  const queues = new Map<string, Res[]>();
  const calls: Array<{ table: string; op: string; args: unknown[]; filters: unknown[][] }> = [];

  const queue = (key: string, ...responses: Res[]) => {
    const list = queues.get(key) ?? [];
    list.push(...responses);
    queues.set(key, list);
  };

  const from = (table: string) => {
    let op: string | null = null;
    let args: unknown[] = [];
    let filters: unknown[][] = [];

    const terminal = () => {
      calls.push({ table, op: op ?? "select", args, filters });
      const list = queues.get(`${table}:${op ?? "select"}`);
      const res = list && list.length ? (list.shift() as Res) : { data: null, error: null };
      return Promise.resolve(res);
    };

    const builder: Record<string, unknown> = {};
    const modifiers = [
      "select",
      "update",
      "insert",
      "upsert",
      "delete",
      "eq",
      "lt",
      "gt",
      "neq",
      "or",
      "is",
      "order",
      "limit",
    ];
    for (const m of modifiers) {
      builder[m] = (...a: unknown[]) => {
        if (m === "select") {
          // `update(...).select("id")` is the RETURNING clause of the update,
          // not a fresh read — only a leading select starts a read op.
          op ??= "select";
        } else if (["update", "insert", "upsert", "delete"].includes(m)) {
          op = m;
          args = a;
          filters = [];
        } else if (m === "eq") {
          // WHERE clauses — the CAS guards these tests exist to pin.
          filters.push(a);
        }
        return builder;
      };
    }
    builder.maybeSingle = terminal;
    builder.single = terminal;
    builder.then = (onFulfilled?: unknown, onRejected?: unknown) =>
      terminal().then(onFulfilled, onRejected);
    return builder;
  };

  return { from, queue, calls, clear: () => queues.clear() };
}

const db = makeDb();

vi.mock("../src/db/supabase", () => ({ supabaseAdmin: { from: (t: string) => db.from(t) } }));

import {
  ensureDailyCredits,
  spendCredits,
  refundCredits,
  updateMatchedRows,
  DAILY_CREDIT_POOL,
} from "../src/utils/credits";

const USER = "user-under-test";
const TODAY = new Date().toISOString().slice(0, 10);

function reset() {
  db.calls.length = 0;
  db.clear(); // no queued responses may leak between tests
}

beforeEach(reset);

describe("updateMatchedRows", () => {
  test("empty array means the UPDATE matched no row (silent RLS block)", () => {
    expect(updateMatchedRows([])).toBe(false);
  });
  test("non-empty array means the write landed", () => {
    expect(updateMatchedRows([{ id: "x" }])).toBe(true);
  });
  test("null/undefined never counts as success", () => {
    expect(updateMatchedRows(null)).toBe(false);
    expect(updateMatchedRows(undefined)).toBe(false);
  });
});

describe("spendCredits", () => {
  test("returns null without writing when the balance is short", async () => {
    db.queue("profiles:select", { data: { credits: 0 }, error: null });
    expect(await spendCredits(USER, 1, "test")).toBeNull();
    expect(db.calls.filter((c) => c.op === "update")).toHaveLength(0);
  });

  test("happy path: CAS write on the exact balance just read", async () => {
    db.queue("profiles:select", { data: { credits: 8 }, error: null });
    db.queue("profiles:update", { data: { credits: 7 }, error: null });
    db.queue("credit_transactions:insert", { data: [], error: null });

    expect(await spendCredits(USER, 1, "test")).toBe(7);

    const update = db.calls.find((c) => c.op === "update");
    expect(update).toBeDefined();
    // payload = balance just read minus cost; guard = the balance just read
    expect(update?.args?.[0]).toEqual({ credits: 7 });
    expect(update?.filters).toContainEqual(["id", USER]);
    expect(update?.filters).toContainEqual(["credits", 8]);

    const tx = db.calls.find((c) => c.table === "credit_transactions");
    expect(tx?.args?.[0]).toMatchObject({ amount: -1, type: "SPEND" });
  });

  test("CAS miss → re-reads and spends against the FRESH balance", async () => {
    // First read says 8, but a concurrent writer changed it before our CAS.
    db.queue("profiles:select", { data: { credits: 8 }, error: null });
    db.queue("profiles:update", { data: null, error: null }); // 0 rows → lost race
    db.queue("profiles:select", { data: { credits: 5 }, error: null }); // fresh read
    db.queue("profiles:update", { data: { credits: 4 }, error: null }); // wins
    db.queue("credit_transactions:insert", { data: [], error: null });

    expect(await spendCredits(USER, 1, "test")).toBe(4);

    const updates = db.calls.filter((c) => c.op === "update");
    expect(updates).toHaveLength(2);
    expect(updates[0]?.args?.[0]).toEqual({ credits: 7 }); // stale attempt (rejected)
    expect(updates[1]?.args?.[0]).toEqual({ credits: 4 }); // fresh attempt (applied)
  });

  test("persistent CAS contention gives up with null instead of guessing", async () => {
    db.queue("profiles:select", { data: { credits: 8 }, error: null });
    db.queue("profiles:update", { data: null, error: null });
    db.queue("profiles:select", { data: { credits: 8 }, error: null });
    db.queue("profiles:update", { data: null, error: null });
    db.queue("profiles:select", { data: { credits: 8 }, error: null });
    db.queue("profiles:update", { data: null, error: null });
    db.queue("profiles:select", { data: { credits: 8 }, error: null });
    db.queue("profiles:update", { data: null, error: null });

    expect(await spendCredits(USER, 1, "test")).toBeNull();
    expect(db.calls.filter((c) => c.op === "update")).toHaveLength(4);
  });
});

describe("refundCredits", () => {
  test("non-positive amount is a no-op", async () => {
    expect(await refundCredits(USER, 0, "test")).toBeNull();
    expect(db.calls).toHaveLength(0);
  });

  test("happy path: CAS increment logged as a GRANT", async () => {
    db.queue("profiles:select", { data: { credits: 0 }, error: null });
    db.queue("profiles:update", { data: { credits: 1 }, error: null });
    db.queue("credit_transactions:insert", { data: [], error: null });

    expect(await refundCredits(USER, 1, "Refund: AI reply failed")).toBe(1);

    const update = db.calls.find((c) => c.op === "update");
    expect(update?.args?.[0]).toEqual({ credits: 1 });
    const tx = db.calls.find((c) => c.table === "credit_transactions");
    expect(tx?.args?.[0]).toMatchObject({ amount: 1, type: "GRANT" });
  });

  test("CAS miss → retries against the fresh balance", async () => {
    db.queue("profiles:select", { data: { credits: 2 }, error: null });
    db.queue("profiles:update", { data: null, error: null }); // lost race
    db.queue("profiles:select", { data: { credits: 3 }, error: null });
    db.queue("profiles:update", { data: { credits: 4 }, error: null });
    db.queue("credit_transactions:insert", { data: [], error: null });

    expect(await refundCredits(USER, 1, "test")).toBe(4);
    const updates = db.calls.filter((c) => c.op === "update");
    expect(updates[0]?.args?.[0]).toEqual({ credits: 3 }); // rejected
    expect(updates[1]?.args?.[0]).toEqual({ credits: 4 }); // applied
  });
});

describe("ensureDailyCredits", () => {
  test("fresh watermark (same day) → no write, current balance returned", async () => {
    db.queue("profiles:select", {
      data: { credits: 3, credits_reset_date: TODAY, premium_status: false, role: "STUDENT" },
      error: null,
    });

    const result = await ensureDailyCredits(USER, "u@example.com", "STUDENT", false);
    expect(result).toEqual({ credits: 3, resetDone: false, unlimited: false });
    expect(db.calls.filter((c) => c.op === "update")).toHaveLength(0);
  });

  test("stale watermark → CAS refill to the pool with one GRANT", async () => {
    db.queue("profiles:select", {
      data: { credits: 2, credits_reset_date: null, premium_status: false, role: "STUDENT" },
      error: null,
    });
    db.queue("profiles:update", { data: [{ id: USER }], error: null });
    db.queue("credit_transactions:insert", { data: [], error: null });

    const result = await ensureDailyCredits(USER, "u@example.com", "STUDENT", false);
    expect(result).toEqual({ credits: DAILY_CREDIT_POOL, resetDone: true, unlimited: false });

    const update = db.calls.find((c) => c.op === "update");
    expect(update?.args?.[0]).toEqual({
      credits: DAILY_CREDIT_POOL,
      credits_reset_date: TODAY,
    });
    // CAS guard on the balance just read (2) — a parallel spend/reset wins or loses cleanly.
    expect(update?.filters).toContainEqual(["id", USER]);
    expect(update?.filters).toContainEqual(["credits", 2]);

    const tx = db.calls.find((c) => c.table === "credit_transactions");
    expect(tx?.args?.[0]).toMatchObject({
      amount: DAILY_CREDIT_POOL - 2,
      type: "GRANT",
    });
  });

  test("parallel reset already won → returns the winner's balance, no double GRANT", async () => {
    db.queue("profiles:select", {
      data: { credits: 0, credits_reset_date: null, premium_status: false, role: "STUDENT" },
      error: null,
    });
    db.queue("profiles:update", { data: [], error: null }); // 0 rows: somebody won
    db.queue("profiles:select", {
      data: { credits: DAILY_CREDIT_POOL, credits_reset_date: TODAY },
      error: null,
    });

    const result = await ensureDailyCredits(USER, "u@example.com", "STUDENT", false);
    // The classic bug: report the stale 0 → caller 402s despite a full pool.
    expect(result).toEqual({ credits: DAILY_CREDIT_POOL, resetDone: false, unlimited: false });
    // No GRANT for a reset this call did not perform.
    expect(db.calls.filter((c) => c.table === "credit_transactions")).toHaveLength(0);
  });

  test("a spend won the race (watermark still stale) → retries against the new balance", async () => {
    db.queue("profiles:select", {
      data: { credits: 0, credits_reset_date: null, premium_status: false, role: "STUDENT" },
      error: null,
    });
    db.queue("profiles:update", { data: [], error: null }); // lost to a concurrent writer
    db.queue("profiles:select", {
      data: { credits: 1, credits_reset_date: null }, // still stale — spend changed credits
      error: null,
    });
    db.queue("profiles:update", { data: [{ id: USER }], error: null }); // retry wins
    db.queue("credit_transactions:insert", { data: [], error: null });

    const result = await ensureDailyCredits(USER, "u@example.com", "STUDENT", false);
    expect(result).toEqual({ credits: DAILY_CREDIT_POOL, resetDone: true, unlimited: false });

    const updates = db.calls.filter((c) => c.op === "update");
    expect(updates[1]?.args?.[0]).toEqual({ credits: DAILY_CREDIT_POOL, credits_reset_date: TODAY });
  });

  test("privileged roles are unlimited and never queried for updates", async () => {
    db.queue("profiles:select", {
      data: { credits: 0, credits_reset_date: null, premium_status: false, role: "OWNER" },
      error: null,
    });

    const result = await ensureDailyCredits(USER, "owner@example.com", "OWNER", false);
    expect(result.unlimited).toBe(true);
    expect(result.credits).toBe(Infinity);
    expect(db.calls.filter((c) => c.op === "update")).toHaveLength(0);
  });

  test("DB error during the reset fails conservative (no free day granted)", async () => {
    db.queue("profiles:select", {
      data: { credits: 4, credits_reset_date: null, premium_status: false, role: "STUDENT" },
      error: null,
    });
    db.queue("profiles:update", { data: null, error: { message: "boom" } });

    const result = await ensureDailyCredits(USER, "u@example.com", "STUDENT", false);
    expect(result).toEqual({ credits: 4, resetDone: false, unlimited: false });
    expect(db.calls.filter((c) => c.table === "credit_transactions")).toHaveLength(0);
  });
});
