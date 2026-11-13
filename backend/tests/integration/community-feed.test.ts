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
      },
    ];
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

    constructor(private table: string) {
      if (!tables[table]) tables[table] = [];
    }

    select() {
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
      this.result = { data: this.matched().map((row) => ({ ...row })), error: null };
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
      resolve: (value: { data: Row | Row[] | null; error: null }) => T,
      reject?: (reason: unknown) => T,
    ) {
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
  return { client, reset, USER_ID };
});

const USER_ID = memory.USER_ID;

vi.mock("../../src/db/supabase", () => ({
  supabaseAdmin: memory.client,
  createAuthClient: () => memory.client,
}));

vi.mock("../../src/storage/r2", () => ({
  isR2StorageActive: () => false,
  r2Upload: vi.fn(),
  r2Download: vi.fn(async () => null),
  r2Delete: vi.fn(async () => undefined),
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
  base = `http://127.0.0.1:${address.port}/api/community`;
});

afterAll(() => new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve()))));

beforeEach(() => {
  memory.reset();
  resetRateLimits();
});

const png = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  0x00, 0x00, 0x00, 0x0d,
]);

function memberHeaders(json = false): HeadersInit {
  return {
    Authorization: "Bearer member-token",
    ...(json ? { "Content-Type": "application/json" } : {}),
  };
}

describe("community feed", () => {
  it("lets a guest list the feed and rejects a guest post", async () => {
    const listed = await fetch(`${base}/feed`);
    expect(listed.status).toBe(200);
    const body = await listed.json() as { posts: unknown[]; nextCursor: number | null; migrated: boolean };
    expect(body.migrated).toBe(true);
    expect(body.posts).toEqual([]);
    expect(body.nextCursor).toBeNull();

    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Guest note", body: "Should not publish.", category: "general" }),
    });
    expect(created.status).toBe(401);
    const denied = await created.json() as { error: string };
    expect(denied.error).toBeTruthy();
  });

  it("lets a member create a post, like and unlike it, comment, attach a PNG, and delete it", async () => {
    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({
        title: "Newton's laws",
        body: "Force equals mass times acceleration.",
        category: "physics",
      }),
    });
    expect(created.status).toBe(201);
    const createdBody = await created.json() as {
      post: {
        id: string;
        title: string;
        author: { id: string; fullName: string; plan: string };
        likeCount: number;
        attachments: unknown[];
      };
    };
    expect(createdBody.post.title).toBe("Newton's laws");
    expect(createdBody.post.author.id).toBe(USER_ID);
    expect(createdBody.post.author.fullName).toBe("Member Student");
    expect(createdBody.post.author.plan).toBe("member");
    expect(createdBody.post.likeCount).toBe(0);
    expect(JSON.stringify(createdBody)).not.toContain("data_base64");
    expect(JSON.stringify(createdBody)).not.toContain("storage_path");
    expect(JSON.stringify(createdBody)).not.toContain("member@example.com");
    const postId = createdBody.post.id;

    const liked = await fetch(`${base}/feed/${postId}/like`, { method: "POST", headers: memberHeaders() });
    expect(liked.status).toBe(200);
    expect(await liked.json()).toEqual({ likeCount: 1, likedByYou: true });

    const unliked = await fetch(`${base}/feed/${postId}/like`, { method: "POST", headers: memberHeaders() });
    expect(unliked.status).toBe(200);
    expect(await unliked.json()).toEqual({ likeCount: 0, likedByYou: false });

    const comment = await fetch(`${base}/feed/${postId}/comments`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({ body: "This matches the textbook." }),
    });
    expect(comment.status).toBe(201);
    const commentBody = await comment.json() as { comment: { id: string; body: string; author: { fullName: string } } };
    expect(commentBody.comment.body).toBe("This matches the textbook.");
    expect(commentBody.comment.author.fullName).toBe("Member Student");

    const uploaded = await fetch(`${base}/feed/${postId}/attachments`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({
        filename: "diagram.png",
        contentType: "image/png",
        dataBase64: png.toString("base64"),
      }),
    });
    expect(uploaded.status).toBe(201);
    const uploadedBody = await uploaded.json() as { attachment: { id: string; filename: string; contentType: string; byteSize: number } };
    expect(uploadedBody.attachment.filename).toBe("diagram.png");
    expect(uploadedBody.attachment.contentType).toBe("image/png");
    expect(uploadedBody.attachment.byteSize).toBe(png.length);
    expect(JSON.stringify(uploadedBody)).not.toContain("data_base64");
    expect(JSON.stringify(uploadedBody)).not.toContain("storage_path");

    const file = await fetch(`${base}/feed/attachments/${uploadedBody.attachment.id}/file`);
    expect(file.status).toBe(200);
    expect(file.headers.get("content-type")).toContain("image/png");
    const bytes = Buffer.from(await file.arrayBuffer());
    expect(bytes.equals(png)).toBe(true);

    const detail = await fetch(`${base}/feed/${postId}`);
    expect(detail.status).toBe(200);
    const detailBody = await detail.json() as { post: { commentCount: number; attachments: Array<{ id: string }> }; migrated: boolean };
    expect(detailBody.migrated).toBe(true);
    expect(detailBody.post.commentCount).toBe(1);
    expect(detailBody.post.attachments.map((item) => item.id)).toContain(uploadedBody.attachment.id);
    expect(JSON.stringify(detailBody)).not.toContain("data_base64");

    const removed = await fetch(`${base}/feed/${postId}`, { method: "DELETE", headers: memberHeaders() });
    expect(removed.status).toBe(200);
    expect(await removed.json()).toEqual({ ok: true });

    const missing = await fetch(`${base}/feed/${postId}`);
    expect(missing.status).toBe(404);
  });
});
