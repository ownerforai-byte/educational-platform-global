import http from "node:http";
import type { AddressInfo } from "node:net";
import express from "express";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

// ───────────────────────────────────────────────────────────────────────────
// Self-contained supabaseAdmin mock (pattern: tests/hardening.test.ts).
// FIFO result queues per table + a recorded call log for scoping assertions.
// ───────────────────────────────────────────────────────────────────────────
const h = vi.hoisted(() => {
  type QueueResult = { data?: any; error?: any } | null;
  const queues: Record<string, QueueResult[]> = {};
  const calls: Array<{ table: string; method: string; args: any[] }> = [];
  const getUser = vi.fn();
  const listUsers = vi.fn();

  function enqueue(table: string, result: QueueResult) {
    (queues[table] ??= []).push(result);
  }

  function nextFor(table: string): QueueResult {
    const q = queues[table];
    return q && q.length > 0 ? q.shift()! : { data: [], error: null };
  }

  function opsFor(table: string) {
    return calls.filter((c) => c.table === table && c.method !== "from");
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
      "select",
      "eq",
      "neq",
      "in",
      "is",
      "gte",
      "lte",
      "order",
      "limit",
      "insert",
      "update",
      "delete",
      "upsert",
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
    chain.then = (onFulfilled?: any, onRejected?: any) => finish().then(onFulfilled, onRejected);
    chain.catch = (onRejected: any) => finish().catch(onRejected);
    return chain;
  }

  const supabaseAdmin: any = {
    auth: {
      getUser: (...args: any[]) => getUser(...args),
      admin: { listUsers: (...args: any[]) => listUsers(...args) },
    },
    from: (table: string) => makeBuilder(table),
  };

  function reset() {
    for (const k of Object.keys(queues)) delete queues[k];
    calls.length = 0;
    getUser.mockReset();
    listUsers.mockReset();
  }

  function mockUser(userId: string, email: string) {
    getUser.mockResolvedValue({ data: { user: { id: userId, email } }, error: null });
  }

  return { supabaseAdmin, enqueue, opsFor, reset, mockUser, calls, listUsers };
});

vi.mock("../src/db/supabase", () => ({
  supabaseAdmin: h.supabaseAdmin,
  createAuthClient: () => h.supabaseAdmin,
}));

const r1Router = (await import("../src/api/r1")).default;
const r1ActivitiesRouter = (await import("../src/api/r1-activities")).default;
const r1PlansRouter = (await import("../src/api/r1-plans")).default;
const r1JournalRouter = (await import("../src/api/r1-journal")).default;
const r1HabitsRouter = (await import("../src/api/r1-habits")).default;
const ownerRouter = (await import("../src/api/owner")).default;
const { invalidateR1GrantCache } = await import("../src/utils/r1Grants");

const OWNER_EMAIL = "harindarsah98172@gmail.com";
const GRANTED_EMAIL = "granted@example.com";
const STRANGER_EMAIL = "stranger@example.com";

type TestRes = { status: number; body: any };

function makeRequest(base: string) {
  return async (
    method: string,
    path: string,
    body?: unknown,
    token = "test-token"
  ): Promise<TestRes> => {
    const res = await fetch(`${base}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    let parsed: any = null;
    try {
      parsed = await res.json();
    } catch {
      parsed = null;
    }
    return { status: res.status, body: parsed };
  };
}

const servers: Array<http.Server> = [];

async function mount(routers: Array<[string, express.Router]>) {
  const app = express();
  app.use(express.json({ limit: "30mb" }));
  for (const [mountPath, router] of routers) {
    app.use(mountPath, router);
  }
  const server = http.createServer(app);
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return { request: makeRequest(`http://127.0.0.1:${port}`), server };
}

afterAll(async () => {
  await Promise.all(servers.map((server) => new Promise((resolve) => server.close(resolve))));
});

beforeEach(() => {
  h.reset();
  invalidateR1GrantCache();
});

// ───────────────────────────────────────────────────────────────────────────
// /api/r1/access + requireR1Access gate
// ───────────────────────────────────────────────────────────────────────────
describe("R1 access gate", () => {
  it("owner emails always hold R1 (no grant row needed)", async () => {
    const { request } = await mount([["/api/r1", r1Router]]);
    h.mockUser("owner-1", OWNER_EMAIL);

    const res = await request("GET", "/api/r1/access");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ r1: true });
  });

  it("a granted email holds R1; an ungranted email does not", async () => {
    const { request } = await mount([["/api/r1", r1Router]]);
    h.mockUser("user-a", GRANTED_EMAIL);
    h.enqueue("r1_grants", { data: [{ email: GRANTED_EMAIL }], error: null });
    expect((await request("GET", "/api/r1/access")).body).toEqual({ r1: true });

    h.mockUser("user-b", STRANGER_EMAIL);
    h.enqueue("r1_grants", { data: [{ email: GRANTED_EMAIL }], error: null });
    expect((await request("GET", "/api/r1/access")).body).toEqual({ r1: false });
  });

  it("401s without a token and 403s ungranted members on module routes", async () => {
    const { request } = await mount([["/api/r1/activities", r1ActivitiesRouter]]);

    const anon = await request("POST", "/api/r1/activities", { activityDate: "2026-10-13", title: "x" }, "");
    expect(anon.status).toBe(401);

    h.mockUser("user-b", STRANGER_EMAIL);
    h.enqueue("r1_grants", { data: [], error: null });
    const denied = await request("POST", "/api/r1/activities", {
      activityDate: "2026-10-13",
      title: "x",
    });
    expect(denied.status).toBe(403);
    // Nothing was ever written for the stranger.
    expect(h.opsFor("r1_activities").filter((c) => c.method === "insert")).toHaveLength(0);
  });

  it("granted members can create activities", async () => {
    const { request } = await mount([["/api/r1/activities", r1ActivitiesRouter]]);
    h.mockUser("user-a", GRANTED_EMAIL);
    h.enqueue("r1_grants", { data: [{ email: GRANTED_EMAIL }], error: null });
    h.enqueue("r1_activities", {
      data: [{ id: "act-1", activity_date: "2026-10-13", title: "Study", category: "study" }],
      error: null,
    });

    const res = await request("POST", "/api/r1/activities", {
      activityDate: "2026-10-13",
      title: "Study",
      category: "study",
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Study");
  });
});

// ───────────────────────────────────────────────────────────────────────────
// Per-user data scoping (IDOR)
// ───────────────────────────────────────────────────────────────────────────
describe("R1 per-user scoping (no IDOR)", () => {
  it("every activity read is scoped to the caller's user id", async () => {
    const { request } = await mount([["/api/r1/activities", r1ActivitiesRouter]]);
    h.mockUser("user-a", GRANTED_EMAIL);
    h.enqueue("r1_grants", { data: [{ email: GRANTED_EMAIL }], error: null });
    h.enqueue("r1_activities", { data: [], error: null });

    await request("GET", "/api/r1/activities");
    const scoping = h
      .opsFor("r1_activities")
      .filter((c) => c.method === "eq" && c.args[0] === "user_id");
    expect(scoping.length).toBeGreaterThan(0);
    expect(scoping.every((c) => c.args[1] === "user-a")).toBe(true);
  });

  it("PATCH and DELETE cannot touch another user's rows (404 on the scoped lookup)", async () => {
    const { request } = await mount([
      ["/api/r1/activities", r1ActivitiesRouter],
      ["/api/r1/plans", r1PlansRouter],
    ]);
    h.mockUser("user-a", GRANTED_EMAIL);
    h.enqueue("r1_grants", { data: [{ email: GRANTED_EMAIL }], error: null });

    // The scoped .eq("id", …).eq("user_id", …) lookup finds no row → 404.
    h.enqueue("r1_activities", { data: [], error: null });
    const patch = await request("PATCH", "/api/r1/activities/act-owned-by-b", { title: "hijack" });
    expect(patch.status).toBe(404);

    h.enqueue("r1_grants", { data: [{ email: GRANTED_EMAIL }], error: null });
    h.enqueue("r1_plans", { data: [], error: null });
    const del = await request("DELETE", "/api/r1/plans/plan-owned-by-b");
    expect(del.status).toBe(404);

    const scopedUpdates = h
      .opsFor("r1_activities")
      .filter((c) => c.method === "update")
      .flatMap((c) => h.calls.filter((x) => x.table === "r1_activities" && x.method === "eq"));
    expect(scopedUpdates.some((c) => c.args[0] === "user_id" && c.args[1] === "user-a")).toBe(true);
  });

  it("journal upsert is keyed on (user_id, entry_date) and habits checkins verify ownership", async () => {
    const { request } = await mount([
      ["/api/r1/journal", r1JournalRouter],
      ["/api/r1/habits", r1HabitsRouter],
    ]);
    h.mockUser("user-a", GRANTED_EMAIL);
    h.enqueue("r1_grants", { data: [{ email: GRANTED_EMAIL }], error: null });
    h.enqueue("r1_journal", {
      data: [{ id: "j-1", entry_date: "2026-10-13", body: "today", tags: [] }],
      error: null,
    });

    const put = await request("PUT", "/api/r1/journal", {
      entryDate: "2026-10-13",
      body: "today",
    });
    expect(put.status).toBe(200);
    const upsertCall = h.opsFor("r1_journal").find((c) => c.method === "upsert");
    expect(upsertCall?.args[1]).toMatchObject({ onConflict: "user_id,entry_date" });
    expect(upsertCall?.args[0][0].user_id).toBe("user-a");

    // Habit check-in on a foreign habit must 404 before any check-in write.
    h.enqueue("r1_grants", { data: [{ email: GRANTED_EMAIL }], error: null });
    h.enqueue("r1_habits", { data: [], error: null });
    const checkin = await request("POST", "/api/r1/habits/habit-of-b/checkins", {
      date: "2026-10-13",
      done: true,
    });
    expect(checkin.status).toBe(404);
    expect(h.opsFor("r1_habit_checkins")).toHaveLength(0);
  });

  it("rejects invalid payloads before touching the database", async () => {
    const { request } = await mount([["/api/r1/activities", r1ActivitiesRouter]]);
    h.mockUser("user-a", GRANTED_EMAIL);
    h.enqueue("r1_grants", { data: [{ email: GRANTED_EMAIL }], error: null });

    const badDate = await request("POST", "/api/r1/activities", {
      activityDate: "13-10-2026",
      title: "x",
    });
    expect(badDate.status).toBe(400);

    const smuggled = await request("POST", "/api/r1/activities", {
      activityDate: "2026-10-13",
      title: "x",
      user_id: "user-b",
    });
    expect(smuggled.status).toBe(400);
    expect(h.opsFor("r1_activities").filter((c) => c.method === "insert")).toHaveLength(0);
  });
});

// ───────────────────────────────────────────────────────────────────────────
// Owner grants API
// ───────────────────────────────────────────────────────────────────────────
describe("owner R1 grant management", () => {
  it("only owner emails may manage grants", async () => {
    const { request } = await mount([["/api/owner", ownerRouter]]);
    h.mockUser("user-9", STRANGER_EMAIL);
    expect((await request("GET", "/api/owner/r1-grants")).status).toBe(403);
    expect(
      (await request("POST", "/api/owner/r1-grants", { email: GRANTED_EMAIL })).status
    ).toBe(403);
  });

  it("granting upserts an active row and revoking is a soft delete", async () => {
    const { request } = await mount([["/api/owner", ownerRouter]]);
    h.mockUser("owner-1", OWNER_EMAIL);

    // POST: the upsert result.
    h.enqueue("r1_grants", {
      data: [{ id: "g-1", email: GRANTED_EMAIL, granted_by: "owner-1", revoked_at: null }],
      error: null,
    });
    // POST: the activation scan resolves no existing account for the email.
    h.listUsers.mockResolvedValue({
      data: { users: [{ id: "user-x", email: "someone-else@example.com" }], totalPages: 1 },
      error: null,
    });

    const grant = await request("POST", "/api/owner/r1-grants", { email: GRANTED_EMAIL });
    expect(grant.status).toBe(201);
    const upsertCall = h.opsFor("r1_grants").find((c) => c.method === "upsert");
    expect(upsertCall?.args[0][0]).toMatchObject({ email: GRANTED_EMAIL, revoked_at: null });

    h.enqueue("r1_grants", {
      data: [{ id: "g-1", email: GRANTED_EMAIL }],
      error: null,
    });
    const revoke = await request("DELETE", "/api/owner/r1-grants/g-1");
    expect(revoke.status).toBe(200);
    expect(revoke.body).toMatchObject({ revoked: true, email: GRANTED_EMAIL });
    const updateCall = h.opsFor("r1_grants").find((c) => c.method === "update");
    expect(updateCall?.args[0]).toHaveProperty("revoked_at");
  });
});
