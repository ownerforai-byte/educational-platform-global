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

const r2 = vi.hoisted(() => ({
  download: vi.fn(async (path: string) => {
    if (path === "profiles/11111111-1111-4111-8111-111111111111/avatar.webp") {
      return { buffer: Buffer.from("img"), contentType: "image/webp" };
    }
    return null;
  }),
  upload: vi.fn(async () => ({ url: "https://example.test/x" })),
  delete: vi.fn(async () => undefined),
  stamp: 0,
}));

vi.mock("../../src/storage/r2", () => ({
  isR2StorageActive: () => true,
  r2Upload: (...args: unknown[]) => r2.upload(...args),
  r2Download: (...args: unknown[]) => r2.download(...args),
  r2Delete: (...args: unknown[]) => r2.delete(...args),
  supabaseStorageHealth: vi.fn(async () => ({ available: false, size: 0, objects: 0, buckets: [] })),
}));

vi.mock("../../src/services/profile-image", () => ({
  processProfileImage: vi.fn(async () => ({
    buffer: Buffer.from("webp-bytes"),
    contentType: "image/webp",
    byteSize: 10,
  })),
  profileImagePath: (userId: string, kind: string) => {
    r2.stamp += 1;
    return `profiles/${userId}/${kind}-${r2.stamp}.webp`;
  },
  isProfileImageCapError: (err: unknown) =>
    Boolean(err && typeof err === "object" && (err as { code?: string }).code === "PROFILE_IMAGE_CAP"),
  PROFILE_IMAGE_INPUT_MAX_BYTES: 8 * 1024 * 1024,
  PROFILE_MEDIA_CACHE_CONTROL: "public, max-age=31536000, immutable",
}));

import { createApp } from "../../src/app";
import { resetRateLimits } from "../../src/middleware/rateLimit";
import {
  compactProfileExtras,
  listAbandonedProfilePaths,
  releaseStoragePath,
  replaceReservedPath,
  reserveStoragePath,
} from "../../src/services/profile-storage";

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
  r2.stamp = 0;
  r2.upload.mockClear();
  r2.delete.mockClear();
  r2.download.mockClear();
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
    expect(r2.download).toHaveBeenCalledWith(key);
  });

  it("PATCH /profile/me is a partial update and reads back the new fields", async () => {
    memory.tables.profiles[0]!.bio = "keep-me";
    memory.tables.profiles[0]!.location = "Kathmandu";
    const patch = await fetch(`${base}/profile/me`, {
      method: "PATCH",
      headers: memberHeaders,
      body: JSON.stringify({ location: "Pokhara", extras: { occupation: "Student" } }),
    });
    expect(patch.status).toBe(200);
    const patched = (await patch.json()) as {
      profile: { location: string | null; bio: string | null; extras: Record<string, unknown> };
    };
    expect(patched.profile.location).toBe("Pokhara");
    expect(patched.profile.bio).toBe("keep-me");
    expect(patched.profile.extras.occupation).toBe("Student");

    const read = await fetch(`${base}/profile/me`, { headers: memberHeaders });
    expect(read.status).toBe(200);
    const body = (await read.json()) as {
      profile: { location: string | null; bio: string | null; extras: Record<string, unknown> };
    };
    expect(body.profile.location).toBe("Pokhara");
    expect(body.profile.bio).toBe("keep-me");
    expect(body.profile.extras.occupation).toBe("Student");
  });

  it("username-check reports taken names", async () => {
    const free = await fetch(`${base}/profile/username-check?username=brand-new-user`, {
      headers: memberHeaders,
    });
    expect(free.status).toBe(200);
    expect(await free.json()).toMatchObject({ available: true });

    const taken = await fetch(`${base}/profile/username-check?username=member`, {
      headers: memberHeaders,
    });
    expect(taken.status).toBe(200);
    expect(await taken.json()).toMatchObject({ available: true, reason: "ok" });

    memory.tables.profiles.push({
      id: "22222222-2222-4222-8222-222222222222",
      username: "takenname",
      full_name: "Other",
    });
    const other = await fetch(`${base}/profile/username-check?username=takenname`, {
      headers: memberHeaders,
    });
    expect(other.status).toBe(200);
    expect(await other.json()).toMatchObject({ available: false, reason: "taken" });
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

  it("omits empty extras keys on write", async () => {
    memory.tables.profiles[0]!.profile_extras = { occupation: "Teacher", intro: "Hi" };
    const patch = await fetch(`${base}/profile/me`, {
      method: "PATCH",
      headers: memberHeaders,
      body: JSON.stringify({ extras: { occupation: "", education: "Grade 12", intro: "  " } }),
    });
    expect(patch.status).toBe(200);
    const body = (await patch.json()) as { profile: { extras: Record<string, unknown> } };
    expect(body.profile.extras).toEqual({ education: "Grade 12" });
    expect(memory.tables.profiles[0]!.profile_extras).toEqual({ education: "Grade 12" });
  });

  it("replaceReservedPath counts both keys until the old one is released", async () => {
    const user = {
      id: memory.USER_ID,
      role: "member" as const,
      plan: "member",
      email: "member@example.com",
    };
    const first = await reserveStoragePath(memory.USER_ID, "profiles/u/avatar-1.webp", 100, user);
    expect(first.ok).toBe(true);
    const swapped = await replaceReservedPath(
      memory.USER_ID,
      "profiles/u/avatar-1.webp",
      "profiles/u/avatar-2.webp",
      80,
      user,
    );
    expect(swapped.ok).toBe(true);
    expect(memory.tables.profiles[0]!.storage_used_bytes).toBe(180);
    await releaseStoragePath(memory.USER_ID, "profiles/u/avatar-1.webp");
    expect(memory.tables.profiles[0]!.storage_used_bytes).toBe(80);
    expect(memory.tables.storage_objects.map((row) => row.path)).toEqual(["profiles/u/avatar-2.webp"]);
  });

  it("does not reject a same-size replace at quota (net delta)", async () => {
    const user = {
      id: memory.USER_ID,
      role: "member" as const,
      plan: "member",
      email: "member@example.com",
    };
    memory.tables.profiles[0]!.storage_used_bytes = 25 * 1024 * 1024 - 50;
    const first = await reserveStoragePath(memory.USER_ID, "profiles/u/cover-1.webp", 50, user);
    expect(first.ok).toBe(true);
    const swapped = await replaceReservedPath(
      memory.USER_ID,
      "profiles/u/cover-1.webp",
      "profiles/u/cover-2.webp",
      50,
      user,
    );
    expect(swapped.ok).toBe(true);
  });

  it("uploads an avatar over JSON base64 and records bytes", async () => {
    const res = await fetch(`${base}/profile/me/avatar`, {
      method: "POST",
      headers: memberHeaders,
      body: JSON.stringify({ dataBase64: Buffer.from("fake-photo").toString("base64"), contentType: "image/jpeg" }),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { byteSize: number; storage: { usedBytes: number } | null };
    expect(body.byteSize).toBe(10);
    expect(body.storage?.usedBytes).toBe(10);
    expect(memory.tables.profiles[0]!.avatar_bytes).toBe(10);
    expect(String(memory.tables.profiles[0]!.avatar_path)).toMatch(/avatar-1\.webp$/);
    expect(r2.upload).toHaveBeenCalled();
  });

  it("releases the old R2 key and does not double-count on replace", async () => {
    const first = await fetch(`${base}/profile/me/avatar`, {
      method: "POST",
      headers: memberHeaders,
      body: JSON.stringify({ dataBase64: Buffer.from("one").toString("base64") }),
    });
    expect(first.status).toBe(200);
    const oldPath = memory.tables.profiles[0]!.avatar_path as string;

    const second = await fetch(`${base}/profile/me/avatar`, {
      method: "POST",
      headers: memberHeaders,
      body: JSON.stringify({ dataBase64: Buffer.from("two").toString("base64") }),
    });
    expect(second.status).toBe(200);
    const newPath = memory.tables.profiles[0]!.avatar_path as string;
    expect(newPath).not.toBe(oldPath);
    expect(memory.tables.profiles[0]!.storage_used_bytes).toBe(10);
    expect(memory.tables.profiles[0]!.avatar_bytes).toBe(10);
    expect(memory.tables.storage_objects.filter((row) => String(row.path).startsWith("profiles/"))).toHaveLength(1);
    expect(r2.delete).toHaveBeenCalledWith(oldPath);
  });

  it("accepts a raw binary avatar body", async () => {
    const res = await fetch(`${base}/profile/me/avatar`, {
      method: "POST",
      headers: {
        Authorization: "Bearer member-token",
        "Content-Type": "image/jpeg",
      },
      body: Buffer.from("raw-jpeg-bytes"),
    });
    expect(res.status).toBe(200);
    expect(memory.tables.profiles[0]!.avatar_bytes).toBe(10);
  });

  it("cleans abandoned profile temps but never community attachments", async () => {
    memory.tables.storage_objects.push(
      {
        path: `profiles/${memory.USER_ID}/avatar-stale.webp`,
        owner_id: memory.USER_ID,
        byte_size: 40,
        ref_count: 1,
      },
      {
        path: "community/post-1/file.png",
        owner_id: memory.USER_ID,
        byte_size: 200,
        ref_count: 1,
      },
    );
    memory.tables.profiles[0]!.storage_used_bytes = 240;

    const res = await fetch(`${base}/profile/me/avatar`, {
      method: "POST",
      headers: memberHeaders,
      body: JSON.stringify({ dataBase64: Buffer.from("fresh").toString("base64") }),
    });
    expect(res.status).toBe(200);
    const paths = memory.tables.storage_objects.map((row) => row.path as string);
    expect(paths.some((p) => p.endsWith("avatar-stale.webp"))).toBe(false);
    expect(paths).toContain("community/post-1/file.png");
    expect(r2.delete).toHaveBeenCalledWith(`profiles/${memory.USER_ID}/avatar-stale.webp`);
    expect(r2.delete).not.toHaveBeenCalledWith("community/post-1/file.png");
    expect(memory.tables.profiles[0]!.storage_used_bytes).toBe(210);
  });
});

describe("profile extras compact", () => {
  it("drops empty strings and trims values", () => {
    expect(
      compactProfileExtras({ occupation: "Teacher", skills: "x" }, { occupation: "", education: "  Grade 12  " }),
    ).toEqual({ skills: "x", education: "Grade 12" });
  });

  it("lists only unreferenced profile-slot objects", async () => {
    memory.tables.storage_objects.push(
      { path: "profiles/u/live.webp", owner_id: memory.USER_ID, byte_size: 1, ref_count: 1 },
      { path: "profiles/u/tmp.webp", owner_id: memory.USER_ID, byte_size: 1, ref_count: 1 },
      { path: "community/p/a.bin", owner_id: memory.USER_ID, byte_size: 1, ref_count: 1 },
    );
    const abandoned = await listAbandonedProfilePaths(memory.USER_ID, ["profiles/u/live.webp"]);
    expect(abandoned.map((row) => row.path)).toEqual(["profiles/u/tmp.webp"]);
  });
});
