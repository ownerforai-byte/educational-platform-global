import express from "express";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import type { Request, Response } from "express";
import type { Server } from "node:http";

/**
 * /api/user-state/:namespace — account-backed personal state.
 *
 * Pinned here: every route is guarded by requireAuth, identity comes from the
 * session (never the body), payloads are validated, and optimistic concurrency
 * prevents a stale device from overwriting newer work.
 *
 * The Supabase admin is replaced by a tiny in-memory store so the whole suite
 * runs offline with no credentials.
 */

type Row = { user_id: string; namespace: string; payload: unknown; version: number; updated_at: string };
const rows = new Map<string, Row>();
const rowKey = (userId: unknown, namespace: unknown) => `${String(userId)}|${String(namespace)}`;

class Query {
  private filters: Record<string, unknown> = {};
  private mode: "select" | "delete" = "select";

  select() {
    this.mode = "select";
    return this;
  }
  delete() {
    this.mode = "delete";
    return this;
  }
  eq(field: string, value: unknown) {
    this.filters[field] = value;
    return this;
  }
  async maybeSingle() {
    const row = rows.get(rowKey(this.filters.user_id, this.filters.namespace));
    return {
      data: row ? { payload: row.payload, version: row.version, updated_at: row.updated_at } : null,
      error: null,
    };
  }
  upsert(row: Row) {
    rows.set(rowKey(row.user_id, row.namespace), row);
    return Promise.resolve({ data: row, error: null });
  }
  then(resolve: (value: unknown) => void, reject: (reason: unknown) => void) {
    if (this.mode === "delete") {
      rows.delete(rowKey(this.filters.user_id, this.filters.namespace));
    }
    return Promise.resolve({ data: null, error: null }).then(resolve, reject);
  }
}

vi.mock("../src/db/supabase", () => ({
  supabaseAdmin: { from: () => new Query() },
}));

vi.mock("../src/middleware/auth", () => ({
  requireAuth: (req: Request, _res: Response, next: () => void) => {
    const id = (req.headers["x-test-user"] as string) || "user-a";
    (req as unknown as { user: { id: string; role: string } }).user = { id, role: "member" };
    next();
  },
}));

import userStateRoutes from "../src/api/user-state";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use("/api/user-state", userStateRoutes);

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

async function call(method: string, namespace: string, body?: unknown, user = "user-a") {
  const res = await fetch(`${baseUrl}/api/user-state/${namespace}`, {
    method,
    headers: { "content-type": "application/json", "x-test-user": user },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: res.status, json: (await res.json().catch(() => ({}))) as Record<string, any> };
}

describe("/api/user-state", () => {
  test("every route is guarded by requireAuth (source pin)", () => {
    const src = readFileSync(path.resolve(__dirname, "../src/api/user-state.ts"), "utf8");
    const routes = src.match(/router\.(get|put|delete)\(/g) ?? [];
    const guarded = src.match(/router\.(get|put|delete)\("[^"]*", requireAuth/g) ?? [];
    expect(routes).toHaveLength(3);
    expect(guarded).toHaveLength(3);
  });

  test("starts empty and reports version 0", async () => {
    rows.clear();
    const res = await call("GET", "personal-notes");
    expect(res.status).toBe(200);
    expect(res.json).toMatchObject({ namespace: "personal-notes", payload: null, version: 0 });
  });

  test("writes, increments the version, and reads back the same payload", async () => {
    rows.clear();
    const payload = [{ id: "n1", title: "First note", updatedAt: "2026-11-07T00:00:00Z" }];
    const put = await call("PUT", "personal-notes", { payload, baseVersion: 0 });
    expect(put.status).toBe(200);
    expect(put.json.version).toBe(1);

    const get = await call("GET", "personal-notes");
    expect(get.json.payload).toEqual(payload);
    expect(get.json.version).toBe(1);

    const second = await call("PUT", "personal-notes", { payload, baseVersion: 1 });
    expect(second.json.version).toBe(2);
  });

  test("a second account never sees or deletes the first account's state", async () => {
    rows.clear();
    await call("PUT", "personal-notes", { payload: { secret: "A" }, baseVersion: 0 }, "user-a");
    const other = await call("GET", "personal-notes", undefined, "user-b");
    expect(other.json.payload).toBeNull();
    expect(other.json.version).toBe(0);

    await call("DELETE", "personal-notes", undefined, "user-b");
    const mine = await call("GET", "personal-notes", undefined, "user-a");
    expect(mine.json.payload).toEqual({ secret: "A" });
  });

  test("a stale baseVersion is rejected with 409 instead of clobbering", async () => {
    rows.clear();
    await call("PUT", "personal-notes", { payload: { v: 1 }, baseVersion: 0 });
    const stale = await call("PUT", "personal-notes", { payload: { v: 0 }, baseVersion: 0 });
    expect(stale.status).toBe(409);
    expect(stale.json.error).toBe("version_conflict");
    expect((await call("GET", "personal-notes")).json.payload).toEqual({ v: 1 });
  });

  test("rejects bad namespaces, primitive payloads and oversized documents", async () => {
    rows.clear();
    // Encoded so Express still matches /:namespace; the decoded value must be
    // rejected by the allowlist rather than escaping into another route.
    expect((await call("PUT", "..%2Fadmin", { payload: {} })).status).toBe(400);
    expect((await call("PUT", "BadName", { payload: {} })).status).toBe(400);
    expect((await call("PUT", "notes", { payload: "just a string" })).status).toBe(400);
    expect((await call("PUT", "notes", { payload: { blob: "x".repeat(300 * 1024) } })).status).toBe(400);
    expect((await call("PUT", "notes", { payload: {}, baseVersion: -1 })).status).toBe(400);
  });

  test("delete is scoped to the requesting user", async () => {
    rows.clear();
    await call("PUT", "personal-notes", { payload: { v: 1 }, baseVersion: 0 });
    const deleted = await call("DELETE", "personal-notes");
    expect(deleted.status).toBe(200);
    expect((await call("GET", "personal-notes")).json.version).toBe(0);
  });
});
