import { describe, expect, test, beforeEach, vi } from "vitest";

/**
 * Regression suite for the DB-backed guest quota (the 2026-09-26 redesign
 * that replaced the restart-amnesiac in-memory Map). Pins:
 *
 *  1. the 5/day limit and its `remaining` contract;
 *  2. CAS increments — concurrent tabs can't both slip past the limit;
 *  3. rollback of a slot whose AI answer never arrived;
 *  4. the degraded in-memory fallback when the table is unavailable (schema
 *     drift must never hard-down guest chat).
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
    for (const m of [
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
    ]) {
      builder[m] = (...a: unknown[]) => {
        if (m === "select") op ??= "select";
        else if (["update", "insert", "upsert", "delete"].includes(m)) {
          op = m;
          args = a;
          filters = [];
        } else if (m === "eq") filters.push(a);
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

import { GUEST_DAILY_LIMIT, consumeGuestSlot, rollbackGuestSlot } from "../src/utils/guestQuota";

beforeEach(() => {
  db.calls.length = 0;
  db.clear();
});

describe("consumeGuestSlot", () => {
  test("first message of the day inserts the row and returns remaining = limit-1", async () => {
    db.queue("guest_chat_usage:select", { data: null, error: null });
    db.queue("guest_chat_usage:upsert", { data: [{ count: 1 }], error: null });

    const slot = await consumeGuestSlot("ip-insert-1");
    expect(slot).toEqual({ status: "ok", remaining: GUEST_DAILY_LIMIT - 1 });

    const upsert = db.calls.find((c) => c.op === "upsert");
    expect(upsert?.args?.[0]).toMatchObject({ count: 1 });
  });

  test("existing row: CAS increment against the count just read", async () => {
    db.queue("guest_chat_usage:select", { data: { count: 2 }, error: null });
    db.queue("guest_chat_usage:update", { data: [{ count: 3 }], error: null });

    const slot = await consumeGuestSlot("ip-increment-1");
    expect(slot).toEqual({ status: "ok", remaining: GUEST_DAILY_LIMIT - 3 });

    const update = db.calls.find((c) => c.op === "update");
    expect(update?.args?.[0]).toEqual({ count: 3 });
    expect(update?.filters).toContainEqual(["count", 2]); // guard: value just read
    expect(update?.filters.some((f) => f[0] === "client_key")).toBe(true);
  });

  test("pool already empty → limited, no write", async () => {
    db.queue("guest_chat_usage:select", { data: { count: GUEST_DAILY_LIMIT }, error: null });

    const slot = await consumeGuestSlot("ip-limited-1");
    expect(slot).toEqual({ status: "limited", remaining: 0 });
    expect(db.calls.filter((c) => c.op === "update")).toHaveLength(0);
  });

  test("last allowed message returns remaining 0 (not 'limited')", async () => {
    db.queue("guest_chat_usage:select", { data: { count: GUEST_DAILY_LIMIT - 1 }, error: null });
    db.queue("guest_chat_usage:update", { data: [{ count: GUEST_DAILY_LIMIT }], error: null });

    const slot = await consumeGuestSlot("ip-last-1");
    expect(slot).toEqual({ status: "ok", remaining: 0 });
  });

  test("concurrent insert lost → retries and lands on the winner's row", async () => {
    db.queue("guest_chat_usage:select", { data: null, error: null });
    db.queue("guest_chat_usage:upsert", { data: null, error: { message: "dup", code: "23505" } });
    db.queue("guest_chat_usage:select", { data: null, error: null });
    db.queue("guest_chat_usage:upsert", { data: [{ count: 1 }], error: null });

    const slot = await consumeGuestSlot("ip-race-insert");
    expect(slot).toEqual({ status: "ok", remaining: GUEST_DAILY_LIMIT - 1 });
    expect(db.calls.filter((c) => c.op === "upsert")).toHaveLength(2);
  });

  test("CAS keeps losing under contention → unavailable (never silently over-grant)", async () => {
    for (let i = 0; i < 4; i++) {
      db.queue("guest_chat_usage:select", { data: { count: 1 }, error: null });
      db.queue("guest_chat_usage:update", { data: [], error: null });
    }

    const slot = await consumeGuestSlot("ip-contention");
    expect(slot).toEqual({ status: "unavailable" });
    expect(db.calls.filter((c) => c.op === "update")).toHaveLength(4);
  });

  test("read failure → in-memory fallback keeps guest chat alive", async () => {
    // Every DB read in this test fails (six consumes below) — each falls back
    // to the in-memory counter, which must still enforce the limit itself.
    for (let i = 0; i < 6; i++) {
      db.queue("guest_chat_usage:select", { data: null, error: { message: "relation does not exist" } });
    }

    const first = await consumeGuestSlot("ip-fallback-1");
    expect(first).toEqual({ status: "ok", remaining: GUEST_DAILY_LIMIT - 1 });

    const second = await consumeGuestSlot("ip-fallback-1");
    expect(second).toEqual({ status: "ok", remaining: GUEST_DAILY_LIMIT - 2 });
    // …and it still enforces the limit through the fallback.
    for (let i = 0; i < 3; i++) await consumeGuestSlot("ip-fallback-1");
    const exhausted = await consumeGuestSlot("ip-fallback-1");
    expect(exhausted).toEqual({ status: "limited", remaining: 0 });
  });

  test("update failure → in-memory fallback (availability over strictness)", async () => {
    db.queue("guest_chat_usage:select", { data: { count: 1 }, error: null });
    db.queue("guest_chat_usage:update", { data: null, error: { message: "timeout" } });

    const slot = await consumeGuestSlot("ip-fallback-2");
    expect(slot.status).toBe("ok");
  });
});

describe("rollbackGuestSlot", () => {
  test("returns the slot: CAS decrement of the count just read", async () => {
    db.queue("guest_chat_usage:select", { data: { count: 3 }, error: null });
    db.queue("guest_chat_usage:update", { data: [{ count: 2 }], error: null });

    await rollbackGuestSlot("ip-rollback-1");

    const update = db.calls.find((c) => c.op === "update");
    expect(update?.args?.[0]).toEqual({ count: 2 });
    expect(update?.filters).toContainEqual(["count", 3]);
  });

  test("empty row → nothing to roll back", async () => {
    db.queue("guest_chat_usage:select", { data: { count: 0 }, error: null });

    await rollbackGuestSlot("ip-rollback-2");

    expect(db.calls.filter((c) => c.op === "update")).toHaveLength(0);
  });

  test("DB failure → in-memory rollback, never throws", async () => {
    db.queue("guest_chat_usage:select", { data: null, error: { message: "down" } });

    await expect(rollbackGuestSlot("ip-rollback-3")).resolves.toBeUndefined();
  });
});
