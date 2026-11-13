import type { Server } from "node:http";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

interface Row {
  [key: string]: unknown;
}

const memory = vi.hoisted(() => {
  const USER_ID = "11111111-1111-4111-8111-111111111111";
  const tables: Record<string, Row[]> = {};

  function reset() {
    for (const key of Object.keys(tables)) delete tables[key];
    tables.profiles = [
      {
        id: USER_ID,
        role: "member",
        access_status: "ACTIVE",
        full_name: "Member Student",
        plan: "member",
        premium_status: false,
        username: "member",
        bio: null,
        location: null,
        website: null,
        avatar_path: null,
        avatar_bytes: 0,
        cover_path: null,
        cover_bytes: 0,
        storage_used_bytes: 0,
        storage_limit_bytes: null,
        profile_visibility: "public",
        profile_extras: {},
      },
    ];
    tables.storage_objects = [];
    tables.profile_follows = [];
    tables.community_feed_posts = [];
    tables.community_feed_comments = [];
    tables.community_feed_likes = [];
    tables.community_feed_attachments = [];
  }

  class Query {
    private filters: Array<(row: Row) => boolean> = [];
    private orderField?: string;
    private ascending = true;
    private limitCount?: number;
    private op: "select" | "insert" | "update" | "delete" = "select";
    private payload: Row[] = [];
    private patch: Row = {};
    private done = false;
    private result: { data: Row | Row[] | null; error: null } = { data: null, error: null };
    private head = false;

    constructor(private table: string) {
      if (!tables[table]) tables[table] = [];
    }

    select(_cols?: string, opts?: { count?: string; head?: boolean }) {
      if (opts?.head) this.head = true;
      return this;
    }

    or(_expr: string) {
      return this;
    }

    eq(field: string, value: unknown) {
      this.filters.push((row) => row[field] === value);
      return this;
    }

    neq(field: string, value: unknown) {
      this.filters.push((row) => row[field] !== value);
      return this;
    }

    in(field: string, values: unknown[]) {
      this.filters.push((row) => values.includes(row[field]));
      return this;
    }

    order(field: string, options?: { ascending?: boolean }) {
      this.orderField = field;
      this.ascending = options?.ascending ?? true;
      return this;
    }

    limit(count: number) {
      this.limitCount = count;
      return this;
    }

    insert(data: Row | Row[]) {
      this.op = "insert";
      const records = Array.isArray(data) ? data : [data];
      const now = new Date().toISOString();
      this.payload = records.map((item) => ({
        created_at: now,
        updated_at: now,
        ...item,
        id: (item.id as string | undefined) ?? `mock-${Math.random().toString(36).slice(2)}`,
      }));
      return this;
    }

    update(data: Row) {
      this.op = "update";
      this.patch = data;
      return this;
    }

    delete() {
      this.op = "delete";
      return this;
    }

    private matched(): Row[] {
      let list = tables[this.table].filter((row) => this.filters.every((filter) => filter(row)));
      if (this.orderField) {
        const field = this.orderField;
        const dir = this.ascending ? 1 : -1;
        list = [...list].sort((a, b) => {
          const av = a[field];
          const bv = b[field];
          if (av === bv) return 0;
          if (av == null) return 1;
          if (bv == null) return -1;
          return (String(av) > String(bv) ? 1 : -1) * dir;
        });
      }
      if (this.limitCount !== undefined) list = list.slice(0, this.limitCount);
      return list;
    }

    private run() {
      if (this.done) return this.result;
      this.done = true;
      if (this.op === "insert") {
        tables[this.table].push(...this.payload.map((row) => ({ ...row })));
        const stored = tables[this.table].slice(-this.payload.length);
        this.result = {
          data: stored.length === 1 ? { ...stored[0] } : stored.map((row) => ({ ...row })),
          error: null,
        };
        return this.result;
      }
      if (this.op === "delete") {
        const drop = new Set(this.matched());
        tables[this.table] = tables[this.table].filter((row) => !drop.has(row));
        this.result = { data: [...drop].map((row) => ({ ...row })), error: null };
        return this.result;
      }
      if (this.op === "update") {
        const rows = this.matched();
        for (const row of rows) Object.assign(row, this.patch);
        this.result = { data: rows.map((row) => ({ ...row })), error: null };
        return this.result;
      }
      const rows = this.matched();
      if (this.head) {
        (this.result as { count?: number }).count = rows.length;
        this.result = { data: null, error: null };
        return this.result;
      }
      this.result = { data: rows.map((row) => ({ ...row })), error: null };
      return this.result;
    }

    async single() {
      const res = this.run();
      const rows = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
      if (rows.length === 0) return { data: null, error: { message: "Row not found", code: "PGRST116" } };
      return { data: rows[0], error: null };
    }

    async maybeSingle() {
      const res = this.run();
      const rows = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
      return { data: rows[0] ?? null, error: null };
    }

    then<T>(
      resolve: (value: { data: Row | Row[] | null; error: null; count?: number }) => T,
      reject?: (reason: unknown) => T,
    ) {
      if (this.head) {
        const count = this.matched().length;
        this.done = true;
        return Promise.resolve({ data: null, error: null, count }).then(resolve, reject);
      }
      return Promise.resolve(this.run()).then(resolve, reject);
    }
  }

  const client = {
    from(table: string) {
      return new Query(table);
    },
    auth: {
      async getUser(token?: string) {
        if (token !== "member-token") {
          return { data: { user: null }, error: { message: "Invalid JWT" } };
        }
        return {
          data: {
            user: {
              id: USER_ID,
              email: "member@example.com",
              user_metadata: { full_name: "Member Student" },
            },
          },
          error: null,
        };
      },
    },
  };

  reset();
  return { client, reset, USER_ID, tables };
});

vi.mock("../../src/db/supabase", () => ({
  supabaseAdmin: memory.client,
  createAuthClient: () => memory.client,
}));

const r2DownloadMock = vi.hoisted(() =>
  vi.fn(async (path: string) => {
    if (path === "profiles/11111111-1111-4111-8111-111111111111/avatar.webp") {
      return { buffer: Buffer.from("img"), contentType: "image/webp" };
    }
    return null;
  }),
);

vi.mock("../../src/storage/r2", () => ({
  isR2StorageActive: () => true,
  r2Upload: vi.fn(async () => ({ url: "https://example.test/x" })),
  r2Download: r2DownloadMock,
  r2Delete: vi.fn(async () => undefined),
  supabaseStorageHealth: vi.fn(async () => ({ available: false, size: 0, objects: 0, buckets: [] })),
}));

vi.mock("../../src/services/profile-image", () => ({
  processProfileImage: vi.fn(async () => ({
    buffer: Buffer.from("webp-bytes"),
    contentType: "image/webp",
  })),
  profileImagePath: (userId: string, kind: string) => `profiles/${userId}/${kind}.webp`,
}));

import { createApp } from "../../src/app";
import { resetRateLimits } from "../../src/middleware/rateLimit";
import { reserveStoragePath } from "../../src/services/profile-storage";

let server: Server;
let base: string;

beforeAll(async () => {
  const app = createApp();
  server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("No port");
  base = `http://127.0.0.1:${address.port}/api`;
});

afterAll(() => new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve()))));

beforeEach(() => {
  memory.reset();
  resetRateLimits();
});

const memberHeaders: HeadersInit = {
  Authorization: "Bearer member-token",
  "Content-Type": "application/json",
};

describe("profile storage", () => {
  it("returns storage quota for the signed-in member", async () => {
    const res = await fetch(`${base}/user/storage`, { headers: memberHeaders });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { usedBytes: number; limitBytes: number; unlimited: boolean };
    expect(body.usedBytes).toBe(0);
    expect(body.limitBytes).toBe(25 * 1024 * 1024);
    expect(body.unlimited).toBe(false);
  });

  it("exposes a public profile by username with feed stats", async () => {
    memory.tables.community_feed_posts.push({
      id: "post-1",
      author_id: memory.USER_ID,
      title: "Hello",
      body: "World",
      category: "general",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    const res = await fetch(`${base}/profile/member`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { profile: { username: string }; stats: { posts: number } };
    expect(body.profile.username).toBe("member");
    expect(body.stats.posts).toBeGreaterThanOrEqual(0);
  });

  it("rejects storage reservation above the member quota", async () => {
    memory.tables.profiles[0]!.storage_used_bytes = 25 * 1024 * 1024 - 100;
    const reserved = await reserveStoragePath(memory.USER_ID, "community/x/file.png", 512, {
      id: memory.USER_ID,
      role: "member",
      plan: "member",
      email: "member@example.com",
    });
    expect(reserved.ok).toBe(false);
    if (!reserved.ok) expect(reserved.reason).toBe("quota");
  });

  it("rejects media proxy paths outside allowed prefixes", async () => {
    const res = await fetch(`${base}/profile/media?path=${encodeURIComponent("secrets/leak.bin")}`);
    expect(res.status).toBe(400);
    const traverse = await fetch(
      `${base}/profile/media?path=${encodeURIComponent("profiles/../etc/passwd")}`,
    );
    expect(traverse.status).toBe(400);
  });

  it("streams allowed profile media through the proxy", async () => {
    const key = "profiles/11111111-1111-4111-8111-111111111111/avatar.webp";
    const res = await fetch(`${base}/profile/media?path=${encodeURIComponent(key)}`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("image/webp");
    const body = await res.arrayBuffer();
    expect(body.byteLength).toBeGreaterThan(0);
    expect(r2DownloadMock).toHaveBeenCalledWith(key);
  });

  it("does not double-count the same storage path", async () => {
    const first = await reserveStoragePath(memory.USER_ID, "community/shared/object.bin", 4096, {
      id: memory.USER_ID,
      role: "member",
      plan: "member",
      email: "member@example.com",
    });
    expect(first.ok).toBe(true);
    const second = await reserveStoragePath(memory.USER_ID, "community/shared/object.bin", 4096, {
      id: memory.USER_ID,
      role: "member",
      plan: "member",
      email: "member@example.com",
    });
    expect(second.ok).toBe(true);
    expect(memory.tables.profiles[0]!.storage_used_bytes).toBe(4096);
    expect(memory.tables.storage_objects).toHaveLength(1);
    expect(memory.tables.storage_objects[0]!.ref_count).toBe(2);
  });
});
