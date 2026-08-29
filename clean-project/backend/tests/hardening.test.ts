import http from "node:http";
import type { AddressInfo } from "node:net";
import express from "express";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

// ───────────────────────────────────────────────────────────────────────────
// Self-contained supabaseAdmin mock (no env vars needed): FIFO result queues
// per table plus a recorded call log the tests assert against.
// ───────────────────────────────────────────────────────────────────────────
const h = vi.hoisted(() => {
  type QueueResult = { data?: any; error?: any } | null;
  const queues: Record<string, QueueResult[]> = {};
  const calls: Array<{ table: string; method: string; args: any[] }> = [];
  const getUser = vi.fn();
  const storageFrom = vi.fn();
  const storageUpload = vi.fn();
  const storageGetPublicUrl = vi.fn();

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
    },
    from: (table: string) => makeBuilder(table),
    storage: {
      from: (bucket: string) => {
        storageFrom(bucket);
        return {
          upload: (...args: any[]) => storageUpload(...args),
          getPublicUrl: (...args: any[]) => storageGetPublicUrl(...args),
        };
      },
    },
  };

  function reset() {
    for (const k of Object.keys(queues)) delete queues[k];
    calls.length = 0;
    getUser.mockReset();
    storageFrom.mockReset();
    storageUpload.mockReset();
    storageGetPublicUrl.mockReset();
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null });
    storageUpload.mockResolvedValue({ data: { path: "uploaded/x" }, error: null });
    storageGetPublicUrl.mockReturnValue({
      data: { publicUrl: "https://example.supabase.co/storage/v1/object/public/resources/uploaded/x" },
    });
  }

  // Convenience: authenticate as a user with the given profile role.
  function mockRole(role: string | null, userId = "user-1") {
    getUser.mockResolvedValue({ data: { user: { id: userId } }, error: null });
    enqueue("profiles", { data: [{ role }], error: null });
  }

  return {
    supabaseAdmin,
    enqueue,
    opsFor,
    reset,
    mockRole,
    calls,
    storageFrom,
    storageUpload,
    storageGetPublicUrl,
  };
});

vi.mock("../src/db/supabase", () => ({ supabaseAdmin: h.supabaseAdmin }));

const resourcesRouter = (await import("../src/api/resources")).default;
const progressRouter = (await import("../src/api/progress")).default;
const bookmarksRouter = (await import("../src/api/bookmarks")).default;
const controllerRouter = (await import("../src/api/controller")).default;
const { storageRoutes } = await import("../src/api/storage");

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

async function mount(router: express.Router, mountPath: string) {
  const app = express();
  app.use(express.json({ limit: "30mb" }));
  // Mirror index.ts: every router is mounted under its own /api/<name> path.
  app.use(mountPath, router);
  const server = http.createServer(app);
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return { request: makeRequest(`http://127.0.0.1:${port}`), server };
}

afterAll(async () => {
  await Promise.all(
    servers.map(
      (server) => new Promise((resolve) => server.close(resolve))
    )
  );
});

beforeEach(() => {
  h.reset();
});

// ───────────────────────────────────────────────────────────────────────────
// resources.ts
// ───────────────────────────────────────────────────────────────────────────
describe("PATCH /api/resources/:id allowlist", () => {
  it("rejects mass-assignment fields (created_by, role, id) with 400", async () => {
    const { request } = await mount(resourcesRouter, "/api/resources");
    h.mockRole("TEACHER");

    const res = await request("PATCH", "/api/resources/r1", {
      title: "ok",
      created_by: "user-1",
      role: "OWNER",
      id: "surprise",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("created_by");
    expect(res.body.fields).toEqual(
      expect.arrayContaining(["created_by", "role", "id"])
    );
    expect(h.opsFor("resources").filter((c) => c.method === "update")).toHaveLength(0);
  });

  it("rejects is_published from TEACHER but accepts it from ADMIN", async () => {
    const teacher = await mount(resourcesRouter, "/api/resources");
    h.mockRole("TEACHER");
    const rejected = await teacher.request("PATCH", "/api/resources/r1", {
      is_published: true,
    });
    expect(rejected.status).toBe(400);

    const admin = await mount(resourcesRouter, "/api/resources");
    h.mockRole("ADMIN");
    h.enqueue("resources", { data: [{ id: "r1", is_published: true }], error: null });
    const accepted = await admin.request("PATCH", "/api/resources/r1", {
      is_published: true,
    });
    expect(accepted.status).toBe(200);
    const updates = h.opsFor("resources").filter((c) => c.method === "update");
    expect(updates).toHaveLength(1);
    expect(updates[0].args[0]).toEqual({ is_published: true });
  });

  it("accepts a clean title update and forwards only that field", async () => {
    const { request } = await mount(resourcesRouter, "/api/resources");
    h.mockRole("TEACHER");
    h.enqueue("resources", { data: [{ id: "r1", title: "Renamed" }], error: null });

    const res = await request("PATCH", "/api/resources/r1", { title: "Renamed" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Renamed");
    const updates = h.opsFor("resources").filter((c) => c.method === "update");
    expect(updates).toHaveLength(1);
    expect(updates[0].args[0]).toEqual({ title: "Renamed" });
    expect(
      h.calls.some((c) => c.method === "eq" && c.args[0] === "id" && c.args[1] === "r1")
    ).toBe(true);
  });
});

describe("DELETE /api/resources/:id ownership", () => {
  it("403 when a TEACHER deletes a resource they did not create", async () => {
    const { request } = await mount(resourcesRouter, "/api/resources");
    h.mockRole("TEACHER");
    h.enqueue("resources", {
      data: [{ id: "r1", created_by: "someone-else" }],
      error: null,
    });

    const res = await request("DELETE", "/api/resources/r1");

    expect(res.status).toBe(403);
    expect(h.opsFor("resources").filter((c) => c.method === "delete")).toHaveLength(0);
  });

  it("proceeds when an ADMIN deletes another user's resource", async () => {
    const { request } = await mount(resourcesRouter, "/api/resources");
    h.mockRole("ADMIN");
    h.enqueue("resources", {
      data: [{ id: "r1", created_by: "someone-else" }],
      error: null,
    });

    const res = await request("DELETE", "/api/resources/r1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });
    const deletes = h.opsFor("resources").filter((c) => c.method === "delete");
    expect(deletes).toHaveLength(1);
    expect(deletes[0].args).toEqual([]); // scope comes from chained .eq("id", ...)
    expect(h.calls.some((c) => c.method === "eq" && c.args[0] === "id" && c.args[1] === "r1")).toBe(true);
  });

  it("404 when the resource does not exist", async () => {
    const { request } = await mount(resourcesRouter, "/api/resources");
    h.mockRole("TEACHER");
    h.enqueue("resources", { data: [null], error: null });

    const res = await request("DELETE", "/api/resources/missing");
    expect(res.status).toBe(404);
  });
});

// ───────────────────────────────────────────────────────────────────────────
// progress.ts
// ───────────────────────────────────────────────────────────────────────────
describe("POST /api/progress validation", () => {
  it("400 Invalid payload on a non-uuid topicId", async () => {
    const { request } = await mount(progressRouter, "/api/progress");
    h.mockRole("STUDENT");

    const res = await request("POST", "/api/progress", {
      topicId: "not-a-uuid",
      completed: true,
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid payload" });
    expect(h.opsFor("user_progress").filter((c) => c.method === "upsert")).toHaveLength(0);
  });

  it("400 when completed is not boolean or topic is missing", async () => {
    const { request } = await mount(progressRouter, "/api/progress");
    h.mockRole("STUDENT");

    expect(
      (await request("POST", "/api/progress", { topicId: crypto.randomUUID() })).status
    ).toBe(400);
    expect(
      (
        await request("POST", "/api/progress", {
          topic_id: crypto.randomUUID(),
          completed: "yes",
        })
      ).status
    ).toBe(400);
  });

  it("normalizes topic_id alias into the upsert payload", async () => {
    const { request } = await mount(progressRouter, "/api/progress");
    h.mockRole("STUDENT");
    const topicId = crypto.randomUUID();
    h.enqueue("user_progress", {
      data: [{ id: "p1", topic_id: topicId, completed: true }],
      error: null,
    });

    const res = await request("POST", "/api/progress", {
      topic_id: topicId,
      completed: true,
    });

    expect(res.status).toBe(200);
    const upserts = h.opsFor("user_progress").filter((c) => c.method === "upsert");
    expect(upserts).toHaveLength(1);
    expect(upserts[0].args[0]).toMatchObject({
      user_id: "user-1",
      topic_id: topicId,
      completed: true,
    });
  });
});

// ───────────────────────────────────────────────────────────────────────────
// bookmarks.ts
// ───────────────────────────────────────────────────────────────────────────
describe("POST /api/bookmarks idempotency", () => {
  it("returns 200 {ok:true} on duplicate instead of overwriting", async () => {
    const { request } = await mount(bookmarksRouter, "/api/bookmarks");
    h.mockRole("STUDENT");
    // ignoreDuplicates upsert that hit an existing row returns no rows.
    h.enqueue("bookmarks", { data: [], error: null });

    const res = await request("POST", "/api/bookmarks", {
      resource_id: "res-1",
      folder: "should-not-overwrite",
      notes: "nope",
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    const upserts = h.opsFor("bookmarks").filter((c) => c.method === "upsert");
    expect(upserts).toHaveLength(1);
    expect(upserts[0].args[1]).toEqual({
      onConflict: "user_id,resource_id",
      ignoreDuplicates: true,
    });
  });

  it("creates a bookmark with only allowlisted fields (201)", async () => {
    const { request } = await mount(bookmarksRouter, "/api/bookmarks");
    h.mockRole("STUDENT");
    h.enqueue("bookmarks", {
      data: [{ id: "b1", resource_id: "res-1", folder: null, notes: null }],
      error: null,
    });

    const res = await request("POST", "/api/bookmarks", {
      resource_id: "res-1",
      user_id: "attacker-id",
      folder: "Week 1",
    });

    expect(res.status).toBe(201);
    const upserts = h.opsFor("bookmarks").filter((c) => c.method === "upsert");
    expect(upserts[0].args[0]).toEqual({
      user_id: "user-1",
      resource_id: "res-1",
      folder: "Week 1",
      notes: null,
    });
  });

  it("DELETE stays scoped to the owning user", async () => {
    const { request } = await mount(bookmarksRouter, "/api/bookmarks");
    h.mockRole("STUDENT");

    await request("DELETE", "/api/bookmarks/b1");

    const eqCalls = h.opsFor("bookmarks").filter((c) => c.method === "eq");
    expect(eqCalls.map((c) => c.args)).toContainEqual(["user_id", "user-1"]);
    expect(eqCalls.map((c) => c.args)).toContainEqual(["id", "b1"]);
  });
});

// ───────────────────────────────────────────────────────────────────────────
// controller.ts settings
// ───────────────────────────────────────────────────────────────────────────
describe("settings endpoints", () => {
  it("PATCH requires ADMIN/OWNER (student gets 403)", async () => {
    const { request } = await mount(controllerRouter, "/api/controller");
    h.mockRole("STUDENT");

    const res = await request("PATCH", "/api/controller/settings", {
      key: "site_name",
      value: "X",
    });

    expect(res.status).toBe(403);
    expect(h.opsFor("settings").filter((c) => c.method === "upsert")).toHaveLength(0);
  });

  it("PATCH upserts with updated_by and returns updated entries", async () => {
    const { request } = await mount(controllerRouter, "/api/controller");
    h.mockRole("ADMIN");
    h.enqueue("settings", {
      data: [{ key: "site_name", value: "New Name" }],
      error: null,
    });

    const res = await request("PATCH", "/api/controller/settings", {
      key: "site_name",
      value: "New Name",
    });

    expect(res.status).toBe(200);
    expect(res.body.settings).toEqual([{ key: "site_name", value: "New Name" }]);
    const upserts = h.opsFor("settings").filter((c) => c.method === "upsert");
    expect(upserts).toHaveLength(1);
    expect(upserts[0].args[0]).toEqual([
      { key: "site_name", value: "New Name", updated_by: "user-1" },
    ]);
    expect(upserts[0].args[1]).toEqual({ onConflict: "key" });
  });

  it("PATCH accepts batch {settings:[...]} form", async () => {
    const { request } = await mount(controllerRouter, "/api/controller");
    h.mockRole("OWNER");
    h.enqueue("settings", {
      data: [
        { key: "a", value: 1 },
        { key: "b", value: true },
      ],
      error: null,
    });

    const res = await request("PATCH", "/api/controller/settings", {
      settings: [
        { key: "a", value: 1 },
        { key: "b", value: true },
      ],
    });

    expect(res.status).toBe(200);
    expect(res.body.settings).toHaveLength(2);
  });

  it("PATCH validates key/value limits", async () => {
    const { request } = await mount(controllerRouter, "/api/controller");

    const longKey = { key: "k".repeat(101), value: "v" };
    const longValue = { key: "ok", value: "v".repeat(5001) };

    for (const body of [longKey, longValue]) {
      h.reset();
      h.mockRole("ADMIN");
      const res = await request("PATCH", "/api/controller/settings", body);
      expect(res.status).toBe(400);
    }
  });

  it("GET returns original envelope {settings:[{key,value,description}]} plus flat map", async () => {
    const { request } = await mount(controllerRouter, "/api/controller");
    h.mockRole("ADMIN");
    h.enqueue("settings", {
      data: [{ key: "theme", value: "dark", description: "UI theme" }],
      error: null,
    });

    const res = await request("GET", "/api/controller/settings");

    expect(res.status).toBe(200);
    expect(res.body.settings).toEqual([
      { key: "theme", value: "dark", description: "UI theme" },
    ]);
    expect(res.body.map).toEqual({ theme: "dark" });
  });
});

// ───────────────────────────────────────────────────────────────────────────
// storage.ts
// ───────────────────────────────────────────────────────────────────────────
describe("POST /api/storage/upload", () => {
  const VALID_PNG_B64 = Buffer.from([0x89, 0x50, 0x4e, 0x47]).toString("base64");

  async function mountedStorage() {
    const m = await mount(storageRoutes as unknown as express.Router, "/api/storage");
    h.mockRole("TEACHER");
    return m;
  }

  it("rejects payloads larger than 10MB decoded (413)", async () => {
    const { request } = await mountedStorage();
    const big = Buffer.alloc(10 * 1024 * 1024 + 1, 97).toString("base64");

    const res = await request("POST", "/api/storage/upload", {
      path: "files/big.png",
      contentType: "image/png",
      dataBase64: big,
    });

    expect([413, 400]).toContain(res.status);
    expect(res.status).toBe(413);
    expect(h.storageUpload).not.toHaveBeenCalled();
  });

  it("rejects disallowed MIME types (400)", async () => {
    const { request } = await mountedStorage();

    const res = await request("POST", "/api/storage/upload", {
      path: "files/page.html",
      contentType: "text/html",
      dataBase64: VALID_PNG_B64,
    });

    expect(res.status).toBe(400);
    expect(h.storageUpload).not.toHaveBeenCalled();
  });

  it("rejects path traversal (400)", async () => {
    const { request } = await mountedStorage();

    const res = await request("POST", "/api/storage/upload", {
      path: "folder/../secret.png",
      contentType: "image/png",
      dataBase64: VALID_PNG_B64,
    });

    expect(res.status).toBe(400);
    expect(h.storageUpload).not.toHaveBeenCalled();
  });

  it("uploads to the default bucket and returns path + publicUrl", async () => {
    const { request } = await mountedStorage();
    h.storageUpload.mockResolvedValue({
      data: { path: "folder/img.png" },
      error: null,
    });
    h.storageGetPublicUrl.mockReturnValue({
      data: { publicUrl: "https://cdn.example.com/folder/img.png" },
    });

    const res = await request("POST", "/api/storage/upload", {
      path: "folder/img.png",
      contentType: "image/png",
      dataBase64: VALID_PNG_B64,
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      path: "folder/img.png",
      publicUrl: "https://cdn.example.com/folder/img.png",
    });
    expect(h.storageFrom).toHaveBeenCalledWith("resources");
    expect(h.storageUpload).toHaveBeenCalledWith(
      "folder/img.png",
      expect.any(Buffer),
      { contentType: "image/png", upsert: false }
    );
  });

  it("requires TEACHER/ADMIN/OWNER role", async () => {
    const { request } = await mount(storageRoutes as unknown as express.Router, "/api/storage");
    h.mockRole("STUDENT");

    const res = await request("POST", "/api/storage/upload", {
      path: "img.png",
      contentType: "image/png",
      dataBase64: VALID_PNG_B64,
    });

    expect(res.status).toBe(403);
    expect(h.storageUpload).not.toHaveBeenCalled();
  });
});
