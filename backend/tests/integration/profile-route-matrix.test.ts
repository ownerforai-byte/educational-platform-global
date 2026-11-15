/**
 * /api/profile/* route matrix — every documented route × every viewer class.
 *
 * Asserted at the HTTP boundary with the in-memory Supabase harness (the
 * pattern from `profile-privacy.test.ts`), so a frontend guard can never be
 * the only thing enforcing a status:
 *
 *  - read + write routes answer the documented status for an anonymous
 *    visitor, another authenticated member, and the profile owner;
 *  - no public response body ever contains a credit figure;
 *  - `:username/progress` respects `private` and `members` visibility.
 *
 * The profile-image pipeline runs for real (sharp), so format validation on
 * the write routes is genuine, not mocked away.
 */
import type { Server } from "node:http";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import sharp from "sharp";

interface Row {
  [key: string]: unknown;
}

const OWNER_ID = "11111111-1111-4111-8111-111111111111";
const OTHER_ID = "22222222-2222-4222-8222-222222222222";
const AVATAR_PATH = `profiles/${OWNER_ID}/avatar-1.webp`;
const COVER_PATH = `profiles/${OWNER_ID}/cover-1.webp`;

const memory = vi.hoisted(() => {
  const OWNER_ID = "11111111-1111-4111-8111-111111111111";
  const OTHER_ID = "22222222-2222-4222-8222-222222222222";
  const AVATAR_PATH = `profiles/${OWNER_ID}/avatar-1.webp`;
  const COVER_PATH = `profiles/${OWNER_ID}/cover-1.webp`;
  const tables: Record<string, Row[]> = {};

  function baseProfile(id: string, username: string) {
    return {
      id,
      role: "member",
      access_status: "ACTIVE",
      full_name: username === "member" ? "Member Student" : "Other Student",
      plan: "member",
      premium_status: false,
      username,
      bio: username === "member" ? "NEB aspirant" : "Hello there",
      location: null,
      website: null,
      avatar_path: id === OWNER_ID ? AVATAR_PATH : null,
      avatar_bytes: id === OWNER_ID ? 4096 : 0,
      cover_path: id === OWNER_ID ? COVER_PATH : null,
      cover_bytes: id === OWNER_ID ? 20480 : 0,
      credits: 42,
      credits_limit: 100,
      storage_used_bytes: id === OWNER_ID ? 24576 : 0,
      storage_limit_bytes: null,
      profile_visibility: "public",
      profile_extras: {},
    };
  }

  function reset() {
    for (const key of Object.keys(tables)) delete tables[key];
    tables.profiles = [baseProfile(OWNER_ID, "member"), baseProfile(OTHER_ID, "other")];
    tables.storage_objects = [
      { user_id: OWNER_ID, path: AVATAR_PATH, byte_size: 4096, ref_count: 1 },
      { user_id: OWNER_ID, path: COVER_PATH, byte_size: 20480, ref_count: 1 },
    ];
    tables.user_journey = [
      { id: "j1", user_id: OWNER_ID, class_slug: "class-11-notes", subject_slug: "physics", unit_slug: "u1", topic_slug: "t1", status: "completed", completed_at: "2026-01-01T00:00:00.000Z" },
      { id: "j2", user_id: OWNER_ID, class_slug: "class-11-notes", subject_slug: "physics", unit_slug: "u2", topic_slug: "t2", status: "started", completed_at: null },
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
        if (token === "member-token") {
          return {
            data: { user: { id: OWNER_ID, email: "member@example.com", user_metadata: {} } },
            error: null,
          };
        }
        if (token === "other-token") {
          return {
            data: { user: { id: OTHER_ID, email: "other@example.com", user_metadata: {} } },
            error: null,
          };
        }
        return { data: { user: null }, error: { message: "Invalid JWT" } };
      },
    },
  };

  reset();
  return { client, reset, OWNER_ID, OTHER_ID, tables };
});

vi.mock("../../src/db/supabase", () => ({
  supabaseAdmin: memory.client,
  createAuthClient: () => memory.client,
}));

const r2 = vi.hoisted(() => ({
  delete: vi.fn(async () => undefined),
  upload: vi.fn(async () => ({ url: "https://example.test/x" })),
  download: vi.fn(async (path: string) => {
    if (path.includes("missing")) return null;
    return { buffer: Buffer.from("img"), contentType: "image/webp" };
  }),
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
let tinyPng: Buffer;

beforeAll(async () => {
  tinyPng = await sharp({
    create: { width: 16, height: 16, channels: 3, background: { r: 40, g: 80, b: 160 } },
  })
    .png()
    .toBuffer();
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
  r2.upload.mockClear();
});

const owner: HeadersInit = { Authorization: "Bearer member-token" };
const other: HeadersInit = { Authorization: "Bearer other-token" };

function headers(auth: HeadersInit | null, extra: HeadersInit = {}): HeadersInit {
  return { ...(auth ?? {}), ...extra };
}

// ─── Status matrix: every route × anonymous / other member / owner ──────────

describe("route status matrix", () => {
  const publicGets = [
    "/profile/member",
    "/profile/member/about",
    "/profile/member/posts",
    "/profile/member/files",
    "/profile/member/followers",
    "/profile/member/following",
    "/profile/member/progress",
    "/profile?q=member",
    `/profile/media?path=${encodeURIComponent(AVATAR_PATH)}`,
  ];

  for (const path of publicGets) {
    it(`GET ${path} answers 200 for anonymous, member and owner without a credit figure`, async () => {
      for (const auth of [null, other, owner]) {
        const res = await fetch(`${base}${path}`, { headers: headers(auth) });
        expect(res.status, `${path} as ${auth ? "authed" : "anonymous"}`).toBe(200);
        expect(await res.text()).not.toMatch(/credit/i);
      }
    });
  }

  const authedGets = ["/profile/me", "/profile/storage", "/profile/username-check?username=newname"];

  for (const path of authedGets) {
    it(`GET ${path} is 401 anonymous and 200 for member and owner`, async () => {
      const anonymous = await fetch(`${base}${path}`);
      expect(anonymous.status).toBe(401);

      for (const auth of [other, owner]) {
        const res = await fetch(`${base}${path}`, { headers: headers(auth) });
        expect(res.status, `${path} as authed`).toBe(200);
        expect(await res.text()).not.toMatch(/credit/i);
      }
    });
  }

  it("PATCH /me is 401 anonymous and 200 for each account editing only itself", async () => {
    const anonymous = await fetch(`${base}/profile/me`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio: "hacked" }),
    });
    expect(anonymous.status).toBe(401);

    const asOther = await fetch(`${base}/profile/me`, {
      method: "PATCH",
      headers: headers(other, { "Content-Type": "application/json" }),
      body: JSON.stringify({ bio: "other was here" }),
    });
    expect(asOther.status).toBe(200);
    const otherBody = (await asOther.json()) as { profile: { id: string; bio: string } };
    expect(otherBody.profile.id).toBe(memory.OTHER_ID);

    // The member could only edit their own row — the owner's profile is intact.
    expect(memory.tables.profiles[0]!.bio).toBe("NEB aspirant");

    const asOwner = await fetch(`${base}/profile/me`, {
      method: "PATCH",
      headers: headers(owner, { "Content-Type": "application/json" }),
      body: JSON.stringify({ bio: "owner was here" }),
    });
    expect(asOwner.status).toBe(200);
    expect(memory.tables.profiles[0]!.bio).toBe("owner was here");
    expect(memory.tables.profiles[1]!.bio).toBe("other was here");
  });

  it("POST /me/avatar is 401 anonymous and 200 for member and owner", async () => {
    const anonymous = await fetch(`${base}/profile/me/avatar`, {
      method: "POST",
      headers: { "Content-Type": "image/png" },
      body: tinyPng,
    });
    expect(anonymous.status).toBe(401);
    expect(r2.upload).not.toHaveBeenCalled();

    for (const auth of [other, owner]) {
      const res = await fetch(`${base}/profile/me/avatar`, {
        method: "POST",
        headers: headers(auth, { "Content-Type": "image/png" }),
        body: tinyPng,
      });
      expect(res.status, "authed avatar upload").toBe(200);
      expect(await res.text()).not.toMatch(/credit/i);
    }
  });

  it("DELETE /me/avatar and /me/cover are 401 anonymous and 200 for member and owner", async () => {
    for (const path of ["/profile/me/avatar", "/profile/me/cover"]) {
      const anonymous = await fetch(`${base}${path}`, { method: "DELETE" });
      expect(anonymous.status, `${path} anonymous`).toBe(401);

      for (const auth of [other, owner]) {
        const res = await fetch(`${base}${path}`, { method: "DELETE", headers: headers(auth) });
        expect(res.status, `${path} authed`).toBe(200);
      }
    }
  });

  it("follow routes are 401 anonymous; members may follow, the owner cannot follow themselves", async () => {
    const anonymous = await fetch(`${base}/profile/member/follow`, { method: "POST" });
    expect(anonymous.status).toBe(401);

    const follow = await fetch(`${base}/profile/member/follow`, { method: "POST", headers: other });
    expect(follow.status).toBe(200);
    expect((await follow.json()) as { following: boolean }).toMatchObject({ following: true });

    const selfFollow = await fetch(`${base}/profile/member/follow`, { method: "POST", headers: owner });
    expect(selfFollow.status).toBe(400);

    const unfollow = await fetch(`${base}/profile/member/follow`, { method: "DELETE", headers: other });
    expect(unfollow.status).toBe(200);
    expect((await unfollow.json()) as { following: boolean }).toMatchObject({ following: false });
  });

  it("GET /media is public media, but only for safe keys of the allowed prefixes", async () => {
    // Public by design: the visitor's <img> needs it without a session.
    const ok = await fetch(`${base}/profile/media?path=${encodeURIComponent(AVATAR_PATH)}`);
    expect(ok.status).toBe(200);
    expect(ok.headers.get("content-type")).toBe("image/webp");

    const traversal = await fetch(`${base}/profile/media?path=${encodeURIComponent("../secrets/key.png")}`);
    expect(traversal.status).toBe(400);

    const foreignPrefix = await fetch(`${base}/profile/media?path=${encodeURIComponent("secrets/key.png")}`);
    expect(foreignPrefix.status).toBe(400);

    const missing = await fetch(`${base}/profile/media?path=${encodeURIComponent(`profiles/${OWNER_ID}/missing.webp`)}`);
    expect(missing.status).toBe(404);
  });

  it("rejects malformed uploads with the documented format statuses", async () => {
    // JSON/base64 envelopes are refused outright.
    const json = await fetch(`${base}/profile/me/avatar`, {
      method: "POST",
      headers: headers(owner, { "Content-Type": "application/json" }),
      body: JSON.stringify({ dataBase64: tinyPng.toString("base64"), contentType: "image/png" }),
    });
    expect(json.status).toBe(415);

    const wrongContentType = await fetch(`${base}/profile/me/avatar`, {
      method: "POST",
      headers: headers(owner, { "Content-Type": "text/plain" }),
      body: Buffer.from("not an image"),
    });
    expect(wrongContentType.status).toBe(415);

    // Real bytes that are not a real image fail the signature check.
    const fakeBytes = await fetch(`${base}/profile/me/avatar`, {
      method: "POST",
      headers: headers(owner, { "Content-Type": "image/png" }),
      body: Buffer.from("definitely-not-an-image"),
    });
    expect(fakeBytes.status).toBe(415);
    expect(r2.upload).not.toHaveBeenCalled();
  });
});

// ─── Visibility: :username/progress respects private and members ────────────

describe(":username/progress visibility", () => {
  async function getProgress(auth: HeadersInit | null) {
    const res = await fetch(`${base}/profile/member/progress`, { headers: headers(auth) });
    expect(res.status).toBe(200);
    return (await res.json()) as { progress: { completed: number } | null; migrated: boolean };
  }

  it("private: hidden from anonymous and members, visible to the owner", async () => {
    memory.tables.profiles[0]!.profile_visibility = "private";

    expect((await getProgress(null)).progress).toBeNull();
    expect((await getProgress(other)).progress).toBeNull();
    expect((await getProgress(owner)).progress).toMatchObject({ completed: 1 });

    // The profile shell itself is gated the same way.
    for (const auth of [null, other]) {
      const res = await fetch(`${base}/profile/member`, { headers: headers(auth) });
      expect(res.status).toBe(403);
    }
    const asOwner = await fetch(`${base}/profile/member`, { headers: owner });
    expect(asOwner.status).toBe(200);
  });

  it("members: hidden from anonymous, visible to members and the owner", async () => {
    memory.tables.profiles[0]!.profile_visibility = "members";

    expect((await getProgress(null)).progress).toBeNull();
    expect((await getProgress(other)).progress).toMatchObject({ completed: 1 });
    expect((await getProgress(owner)).progress).toMatchObject({ completed: 1 });

    const anonymous = await fetch(`${base}/profile/member`);
    expect(anonymous.status).toBe(403);
    const asMember = await fetch(`${base}/profile/member`, { headers: other });
    expect(asMember.status).toBe(200);
    expect(await asMember.text()).not.toMatch(/credit/i);
  });

  it("public: everyone reads the same counts, still credit-free", async () => {
    for (const auth of [null, other, owner]) {
      const body = await getProgress(auth);
      expect(body.progress).toMatchObject({ completed: 1, inProgress: 1, total: 2 });
    }
  });
});
