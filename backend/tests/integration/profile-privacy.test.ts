/**
 * Profile privacy + independent image removal.
 *
 * Everything here is asserted at the HTTP boundary, so a frontend visibility
 * condition can never be the only thing standing between a visitor and an
 * owner-only figure.
 */
import type { Server } from "node:http";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

interface Row {
  [key: string]: unknown;
}

const AVATAR_PATH = "profiles/11111111-1111-4111-8111-111111111111/avatar-1.webp";
const COVER_PATH = "profiles/11111111-1111-4111-8111-111111111111/cover-1.webp";

const memory = vi.hoisted(() => {
  const USER_ID = "11111111-1111-4111-8111-111111111111";
  const OTHER_ID = "22222222-2222-4222-8222-222222222222";
  const tables: Record<string, Row[]> = {};

  function baseProfile() {
    return {
      id: USER_ID,
      role: "member",
      access_status: "ACTIVE",
      full_name: "Member Student",
      plan: "member",
      premium_status: false,
      username: "member",
      bio: "NEB aspirant",
      location: null,
      website: null,
      avatar_path: "profiles/11111111-1111-4111-8111-111111111111/avatar-1.webp",
      avatar_bytes: 4096,
      cover_path: "profiles/11111111-1111-4111-8111-111111111111/cover-1.webp",
      cover_bytes: 20480,
      credits: 42,
      credits_limit: 100,
      storage_used_bytes: 24576,
      storage_limit_bytes: null,
      profile_visibility: "public",
      profile_extras: {},
    };
  }

  function reset() {
    for (const key of Object.keys(tables)) delete tables[key];
    tables.profiles = [baseProfile()];
    tables.storage_objects = [
      { user_id: USER_ID, path: "profiles/11111111-1111-4111-8111-111111111111/avatar-1.webp", byte_size: 4096 },
      { user_id: USER_ID, path: "profiles/11111111-1111-4111-8111-111111111111/cover-1.webp", byte_size: 20480 },
    ];
    tables.user_journey = [
      { id: "j1", user_id: USER_ID, class_slug: "class-11-notes", subject_slug: "physics", unit_slug: "u1", topic_slug: "t1", status: "completed", completed_at: "2026-01-01T00:00:00.000Z" },
      { id: "j2", user_id: USER_ID, class_slug: "class-11-notes", subject_slug: "physics", unit_slug: "u2", topic_slug: "t2", status: "started", completed_at: null },
      { id: "j3", user_id: USER_ID, class_slug: "class-11-notes", subject_slug: "biology", unit_slug: "u3", topic_slug: "t3", status: "completed", completed_at: "2026-01-02T00:00:00.000Z" },
      { id: "j4", user_id: OTHER_ID, class_slug: "class-11-notes", subject_slug: "chemistry", unit_slug: "u4", topic_slug: "t4", status: "completed", completed_at: "2026-01-03T00:00:00.000Z" },
    ];
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
      this.payload = Array.isArray(data) ? data : [data];
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
        list = [...list].sort((a, b) => (String(a[field]) > String(b[field]) ? dir : -dir));
      }
      if (this.limitCount !== undefined) list = list.slice(0, this.limitCount);
      return list;
    }

    private run() {
      if (this.done) return this.result;
      this.done = true;
      if (this.op === "insert") {
        tables[this.table].push(...this.payload.map((row) => ({ ...row })));
        this.result = { data: this.payload.map((row) => ({ ...row })), error: null };
        return this.result;
      }
      if (this.op === "delete") {
        const drop = new Set(this.matched());
        tables[this.table] = tables[this.table].filter((row) => !drop.has(row));
        this.result = { data: [...drop], error: null };
        return this.result;
      }
      if (this.op === "update") {
        const rows = this.matched();
        for (const row of rows) Object.assign(row, this.patch);
        this.result = { data: rows.map((row) => ({ ...row })), error: null };
        return this.result;
      }
      this.result = { data: this.matched().map((row) => ({ ...row })), error: null };
      return this.result;
    }

    async single() {
      const rows = this.matched();
      return rows.length ? { data: rows[0], error: null } : { data: null, error: { message: "Row not found" } };
    }

    async maybeSingle() {
      const rows = this.matched();
      return { data: rows[0] ?? null, error: null };
    }

    then<T>(
      resolve: (value: { data: Row | Row[] | null; error: null; count?: number }) => T,
      reject?: (reason: unknown) => T,
    ) {
      if (this.head) {
        this.done = true;
        return Promise.resolve({ data: null, error: null, count: this.matched().length }).then(resolve, reject);
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
          data: { user: { id: USER_ID, email: "member@example.com", user_metadata: {} } },
          error: null,
        };
      },
    },
  };

  reset();
  return { client, reset, USER_ID, OTHER_ID, tables };
});

vi.mock("../../src/db/supabase", () => ({
  supabaseAdmin: memory.client,
  createAuthClient: () => memory.client,
}));

const r2 = vi.hoisted(() => ({
  delete: vi.fn(async () => undefined),
  upload: vi.fn(async () => ({ url: "https://example.test/x" })),
  download: vi.fn(async () => ({ buffer: Buffer.from("img"), contentType: "image/webp" })),
}));

vi.mock("../../src/storage/r2", () => ({
  isR2StorageActive: () => true,
  r2Upload: (...args: unknown[]) => r2.upload(...args),
  r2Download: (...args: unknown[]) => r2.download(...args),
  r2Delete: (...args: unknown[]) => r2.delete(...args),
  supabaseStorageHealth: vi.fn(async () => ({ available: false, size: 0, objects: 0, buckets: [] })),
}));

import { createApp } from "../../src/app";
import { resetRateLimits } from "../../src/middleware/rateLimit";

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
  r2.delete.mockClear();
});

const auth: HeadersInit = { Authorization: "Bearer member-token" };

describe("credits never leak to visitors", () => {
  const publicGets = [
    "/profile/member",
    "/profile/member/about",
    "/profile/member/posts",
    "/profile/member/files",
    "/profile/member/followers",
    "/profile/member/following",
    "/profile/member/progress",
    "/users?q=member",
  ];

  for (const path of publicGets) {
    it(`${path} carries no credit figure`, async () => {
      const res = await fetch(`${base}${path}`, { headers: auth });
      expect(res.status).toBe(200);
      expect(await res.text()).not.toMatch(/credit/i);
    });
  }

  it("keeps the owner's balance out of the public profile object", async () => {
    const res = await fetch(`${base}/profile/member`);
    const body = (await res.json()) as { profile: Record<string, unknown> };
    expect(body.profile).not.toHaveProperty("credits");
    expect(body.profile).toMatchObject({ username: "member", bio: "NEB aspirant" });
  });
});

describe("progress aggregate", () => {
  it("counts completed and in-progress topics per subject", async () => {
    const res = await fetch(`${base}/profile/member/progress`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      progress: {
        completed: number;
        inProgress: number;
        notStarted: number;
        total: number;
        percent: number;
        subjects: Array<{ subjectSlug: string; completed: number; inProgress: number; total: number }>;
      };
      migrated: boolean;
    };
    expect(body.progress.completed).toBe(2);
    expect(body.progress.inProgress).toBe(1);
    expect(body.progress.total).toBe(3);
    expect(body.progress.notStarted).toBe(0);
    expect(body.progress.percent).toBe(67);
    // Deterministic subject order, and only this user's rows.
    expect(body.progress.subjects.map((s) => s.subjectSlug)).toEqual(["biology", "physics"]);
    expect(body.progress.subjects.find((s) => s.subjectSlug === "physics")).toMatchObject({
      completed: 1,
      inProgress: 1,
      total: 2,
    });
  });

  it("returns null for a private profile", async () => {
    memory.tables.profiles[0]!.profile_visibility = "private";
    const res = await fetch(`${base}/profile/member/progress`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ progress: null, migrated: true });
  });

  it("returns null when the owner opts out via hideProgress", async () => {
    memory.tables.profiles[0]!.profile_extras = { hideProgress: true };
    const res = await fetch(`${base}/profile/member/progress`);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ progress: null, migrated: true });
  });
});

describe("independent image removal", () => {
  it("DELETE avatar clears only the avatar and its stored object", async () => {
    const res = await fetch(`${base}/profile/me/avatar`, { method: "DELETE", headers: auth });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { profile: { avatarUrl: string | null; coverUrl: string | null } };
    expect(body.profile.avatarUrl).toBeNull();
    expect(body.profile.coverUrl).not.toBeNull();
    expect(memory.tables.profiles[0]!.avatar_path).toBeNull();
    expect(memory.tables.profiles[0]!.cover_path).toBe(COVER_PATH);
    expect(r2.delete).toHaveBeenCalledWith(AVATAR_PATH);
    expect(r2.delete).not.toHaveBeenCalledWith(COVER_PATH);
  });

  it("DELETE cover clears only the cover and its stored object", async () => {
    const res = await fetch(`${base}/profile/me/cover`, { method: "DELETE", headers: auth });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { profile: { avatarUrl: string | null; coverUrl: string | null } };
    expect(body.profile.coverUrl).toBeNull();
    expect(body.profile.avatarUrl).not.toBeNull();
    expect(memory.tables.profiles[0]!.cover_path).toBeNull();
    expect(memory.tables.profiles[0]!.avatar_path).toBe(AVATAR_PATH);
    expect(r2.delete).toHaveBeenCalledWith(COVER_PATH);
    expect(r2.delete).not.toHaveBeenCalledWith(AVATAR_PATH);
  });

  it("is idempotent: removing an absent image still succeeds", async () => {
    memory.tables.profiles[0]!.avatar_path = null;
    const res = await fetch(`${base}/profile/me/avatar`, { method: "DELETE", headers: auth });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { profile: { coverUrl: string | null } };
    expect(body.profile.coverUrl).not.toBeNull();
    expect(r2.delete).not.toHaveBeenCalledWith(AVATAR_PATH);
  });

  it("releases the storage the removed image was holding", async () => {
    await fetch(`${base}/profile/me/avatar`, { method: "DELETE", headers: auth });
    expect(memory.tables.storage_objects.map((row) => row.path)).not.toContain(AVATAR_PATH);
    expect(memory.tables.profiles[0]!.avatar_bytes).toBeNull();
  });

  it("refuses removal without a session", async () => {
    const res = await fetch(`${base}/profile/me/cover`, { method: "DELETE" });
    expect(res.status).toBe(401);
  });
});
