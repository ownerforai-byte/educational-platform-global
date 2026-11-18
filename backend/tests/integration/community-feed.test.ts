import type { Server } from "node:http";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

interface Row {
  [key: string]: unknown;
}

const memory = vi.hoisted(() => {
  const USER_ID = "11111111-1111-4111-8111-111111111111";
  const OTHER_ID = "22222222-2222-4222-8222-222222222222";
  const OWNER_ID = "33333333-3333-4333-8333-333333333333";
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
      {
        id: OTHER_ID,
        role: "member",
        access_status: "ACTIVE",
        full_name: "Other Student",
        plan: "member",
        premium_status: false,
      },
      {
        id: OWNER_ID,
        role: "member",
        access_status: "ACTIVE",
        full_name: "Platform Owner",
        plan: "pro",
        premium_status: false,
      },
      {
        id: "rn-study-assistant",
        role: "assistant",
        access_status: "ACTIVE",
        full_name: "Community bot",
        username: "community-bot",
        plan: "pro",
        premium_status: false,
      },
    ];
    tables.community_feed_ai_replies = [];
  }

  class Query {
    private filters: Array<(row: Row) => boolean> = [];
    private orderField?: string;
    private ascending = true;
    private limitCount?: number;
    private rangeFrom?: number;
    private rangeTo?: number;
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

    range(from: number, to: number) {
      this.rangeFrom = from;
      this.rangeTo = to;
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
      if (this.rangeFrom !== undefined && this.rangeTo !== undefined) {
        list = list.slice(this.rangeFrom, this.rangeTo + 1);
      }
      return list;
    }

    private run() {
      if (this.done) return this.result;
      this.done = true;
      if (this.op === "insert") {
        if (this.table === "community_feed_ai_replies") {
          const duplicate = this.payload.some((row) =>
            tables[this.table].some((existing) => existing.post_id === row.post_id),
          );
          if (duplicate) {
            this.result = {
              data: null,
              error: { message: "duplicate key value violates unique constraint", code: "23505" },
            } as { data: Row | Row[] | null; error: null };
            return this.result;
          }
        }
        if (this.table === "community_feed_saves") {
          const duplicate = this.payload.some((row) =>
            tables[this.table].some(
              (existing) => existing.post_id === row.post_id && existing.user_id === row.user_id,
            ),
          );
          if (duplicate) {
            this.result = {
              data: null,
              error: { message: "duplicate key value violates unique constraint", code: "23505" },
            } as { data: Row | Row[] | null; error: null };
            return this.result;
          }
        }
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
        if (token === "other-token") {
          return {
            data: {
              user: {
                id: OTHER_ID,
                email: "other@example.com",
                user_metadata: { full_name: "Other Student" },
              },
            },
            error: null,
          };
        }
        if (token === "owner-token") {
          return {
            data: {
              user: {
                id: OWNER_ID,
                email: "sahrocky81@gmail.com",
                user_metadata: { full_name: "Platform Owner" },
              },
            },
            error: null,
          };
        }
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
  return { client, reset, tables, USER_ID, OTHER_ID, OWNER_ID };
});

const USER_ID = memory.USER_ID;
const OTHER_ID = memory.OTHER_ID;

vi.mock("../../src/db/supabase", () => ({
  supabaseAdmin: memory.client,
  createAuthClient: () => memory.client,
}));

vi.mock("../../src/services/community-ai-reply", () => ({
  CommunityAssistantReplyError: class CommunityAssistantReplyError extends Error {},
  generateCommunityAssistantReply: vi.fn(async () => "Grounded **assistant** reply for the post."),
  generateCommunityFollowUpReply: vi.fn(async () => "Follow-up **assistant** answer for the thread."),
}));

vi.mock("../../src/lib/community-bot", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/lib/community-bot")>();
  return {
    ...actual,
    ensureCommunityBotProfile: vi.fn(async () => {}),
  };
});

const r2 = vi.hoisted(() => {
  const objects = new Map<string, { buffer: Buffer; contentType: string }>();
  return {
    active: false,
    objects,
    upload: vi.fn(async (path: unknown, body: unknown, contentType: unknown) => {
      const key = String(path);
      const buffer = Buffer.isBuffer(body) ? body : Buffer.from(body as Uint8Array);
      objects.set(key, { buffer, contentType: String(contentType) });
      return { url: `https://r2.test/${key}` };
    }),
    download: vi.fn(async (path: unknown) => objects.get(String(path)) ?? null),
    remove: vi.fn(async (path: unknown) => {
      objects.delete(String(path));
    }),
  };
});

vi.mock("../../src/storage/r2", () => ({
  isR2StorageActive: () => r2.active,
  r2Upload: (...args: unknown[]) => r2.upload(...args),
  r2Download: (...args: unknown[]) => r2.download(...args),
  r2Delete: (...args: unknown[]) => r2.remove(...args),
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
  r2.active = false;
  r2.objects.clear();
  r2.upload.mockClear();
  r2.download.mockClear();
  r2.remove.mockClear();
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

async function waitForComments(
  postId: string,
  minCount: number,
): Promise<
  Array<{
    id: string;
    parentId: string | null;
    replyTo: { id: string; fullName: string; username?: string | null } | null;
    author: { id: string; fullName: string; username?: string | null };
  }>
> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const res = await fetch(`${base}/feed/${postId}`);
    const body = (await res.json()) as {
      post: {
        comments: Array<{
          id: string;
          parentId: string | null;
          replyTo: { id: string; fullName: string; username?: string | null } | null;
          author: { id: string; fullName: string; username?: string | null };
        }>;
      };
    };
    if (body.post.comments.length >= minCount) return body.post.comments;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error(`Timed out waiting for ${minCount} comments on ${postId}`);
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

  it("lets only the post author or platform owner publish a Veer comment", async () => {
    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({
        title: "What is photosynthesis?",
        body: "How do plants make food?",
        category: "biology",
      }),
    });
    expect(created.status).toBe(201);
    const { post } = await created.json() as { post: { id: string } };
    const postId = post.id;

    const denied = await fetch(`${base}/feed/${postId}/ai-assistant/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(denied.status).toBe(401);

    const badBody = await fetch(`${base}/feed/${postId}/ai-assistant/reply`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({ approve: false }),
    });
    expect(badBody.status).toBe(400);

    const guestDetail = await fetch(`${base}/feed/${postId}`);
    const guest = await guestDetail.json() as {
      post: { assistantReply: { posted: boolean; canApprove: boolean } };
    };
    expect(guest.post.assistantReply).toEqual({ posted: false, canApprove: false });

    const otherBefore = await fetch(`${base}/feed/${postId}`, {
      headers: { Authorization: "Bearer other-token" },
    });
    const otherView = await otherBefore.json() as {
      post: { assistantReply: { posted: boolean; canApprove: boolean }; commentCount: number };
    };
    expect(otherView.post.assistantReply.posted).toBe(false);
    expect(otherView.post.assistantReply.canApprove).toBe(false);
    expect(otherView.post.commentCount).toBe(0);

    const deniedOther = await fetch(`${base}/feed/${postId}/ai-assistant/reply`, {
      method: "POST",
      headers: {
        Authorization: "Bearer other-token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ approve: true }),
    });
    expect(deniedOther.status).toBe(403);

    const authorBefore = await fetch(`${base}/feed/${postId}`, { headers: memberHeaders() });
    const authorView = await authorBefore.json() as {
      post: { assistantReply: { posted: boolean; canApprove: boolean } };
    };
    expect(authorView.post.assistantReply).toEqual({ posted: false, canApprove: true });

    const published = await fetch(`${base}/feed/${postId}/ai-assistant/reply`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({ approve: true }),
    });
    expect(published.status).toBe(201);
    const publishedBody = await published.json() as {
      comment: { body: string; author: { id: string; fullName: string; role: string | null } };
      assistantReply: { posted: boolean; canApprove: boolean };
    };
    expect(publishedBody.comment.author.id).toBe("rn-study-assistant");
    expect(publishedBody.comment.author.fullName).toBe("Community bot");
    expect(publishedBody.comment.author.role).toBe("assistant");
    expect(publishedBody.comment.body).toContain("assistant");
    expect(publishedBody.assistantReply).toEqual({ posted: true, canApprove: false });

    const duplicateAuthor = await fetch(`${base}/feed/${postId}/ai-assistant/reply`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({ approve: true }),
    });
    expect(duplicateAuthor.status).toBe(409);

    const duplicateOther = await fetch(`${base}/feed/${postId}/ai-assistant/reply`, {
      method: "POST",
      headers: {
        Authorization: "Bearer other-token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ approve: true }),
    });
    expect(duplicateOther.status).toBe(403);

    const ownerOnOthersPost = await fetch(`${base}/feed/${postId}`, {
      headers: { Authorization: "Bearer owner-token" },
    });
    const ownerView = await ownerOnOthersPost.json() as {
      post: { assistantReply: { posted: boolean; canApprove: boolean } };
    };
    expect(ownerView.post.assistantReply).toEqual({ posted: true, canApprove: false });

    const detailAfter = await fetch(`${base}/feed/${postId}`, { headers: memberHeaders() });
    const after = await detailAfter.json() as {
      post: {
        commentCount: number;
        comments: Array<{ author: { role: string | null; id: string } }>;
        assistantReply: { posted: boolean; canApprove: boolean };
      };
    };
    expect(after.post.commentCount).toBe(1);
    expect(after.post.assistantReply).toEqual({ posted: true, canApprove: false });
    expect(after.post.comments[0]?.author.role).toBe("assistant");
    expect(after.post.comments[0]?.author.id).toBe("rn-study-assistant");
    expect(after.post.comments[0]?.author.id).not.toBe(OTHER_ID);
  });

  it("lets the platform owner publish Veer on another member's post", async () => {
    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: {
        Authorization: "Bearer other-token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Help with cells",
        body: "What is mitosis?",
        category: "biology",
      }),
    });
    expect(created.status).toBe(201);
    const { post } = await created.json() as { post: { id: string } };

    const ownerDetail = await fetch(`${base}/feed/${post.id}`, {
      headers: { Authorization: "Bearer owner-token" },
    });
    const ownerBody = await ownerDetail.json() as {
      post: { assistantReply: { posted: boolean; canApprove: boolean } };
    };
    expect(ownerBody.post.assistantReply).toEqual({ posted: false, canApprove: true });

    const published = await fetch(`${base}/feed/${post.id}/ai-assistant/reply`, {
      method: "POST",
      headers: {
        Authorization: "Bearer owner-token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ approve: true }),
    });
    expect(published.status).toBe(201);
  });

  it("accepts a PDF when the browser sends application/octet-stream", async () => {
    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({
        title: "Notes PDF",
        body: "Attached scan.",
        category: "physics",
      }),
    });
    expect(created.status).toBe(201);
    const { post } = await created.json() as { post: { id: string } };
    const pdf = Buffer.from("%PDF-1.4 fixture");

    const uploaded = await fetch(`${base}/feed/${post.id}/attachments`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({
        filename: "scan.pdf",
        contentType: "application/octet-stream",
        dataBase64: pdf.toString("base64"),
      }),
    });
    expect(uploaded.status).toBe(201);
    const uploadedBody = await uploaded.json() as { attachment: { contentType: string; filename: string } };
    expect(uploadedBody.attachment.filename).toBe("scan.pdf");
    expect(uploadedBody.attachment.contentType).toBe("application/pdf");

    const file = await fetch(`${base}/feed/attachments/${uploadedBody.attachment.id}/file`);
    expect(file.status).toBe(200);
    expect(file.headers.get("content-type")).toContain("application/pdf");
    expect(Buffer.from(await file.arrayBuffer()).equals(pdf)).toBe(true);
  });

  it("stores attachments in R2 when configured and 404s a missing object", async () => {
    r2.active = true;
    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({
        title: "R2 diagram",
        body: "Cloud object.",
        category: "physics",
      }),
    });
    expect(created.status).toBe(201);
    const { post } = await created.json() as { post: { id: string } };

    const uploaded = await fetch(`${base}/feed/${post.id}/attachments`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({
        filename: "diagram.png",
        contentType: "image/png",
        dataBase64: png.toString("base64"),
      }),
    });
    expect(uploaded.status).toBe(201);
    expect(r2.upload).toHaveBeenCalled();
    const uploadedBody = await uploaded.json() as { attachment: { id: string } };

    const file = await fetch(`${base}/feed/attachments/${uploadedBody.attachment.id}/file`);
    expect(file.status).toBe(200);
    expect(Buffer.from(await file.arrayBuffer()).equals(png)).toBe(true);

    r2.objects.clear();
    const missing = await fetch(`${base}/feed/attachments/${uploadedBody.attachment.id}/file`);
    expect(missing.status).toBe(404);
  });

  it("accepts a raw binary PNG with Content-Type and X-Upload-Filename", async () => {
    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({
        title: "Raw binary diagram",
        body: "Direct file body upload.",
        category: "physics",
      }),
    });
    expect(created.status).toBe(201);
    const { post } = await created.json() as { post: { id: string } };

    const uploaded = await fetch(`${base}/feed/${post.id}/attachments`, {
      method: "POST",
      headers: {
        ...memberHeaders(),
        "Content-Type": "image/png",
        "X-Upload-Filename": encodeURIComponent("diagram.png"),
      },
      body: png,
    });
    expect(uploaded.status).toBe(201);
    const uploadedBody = await uploaded.json() as { attachment: { filename: string; contentType: string } };
    expect(uploadedBody.attachment.filename).toBe("diagram.png");
    expect(uploadedBody.attachment.contentType).toBe("image/png");
  });

  it("accepts a raw binary PDF and returns the same bytes on download", async () => {
    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({
        title: "Raw PDF notes",
        body: "Direct PDF body upload.",
        category: "physics",
      }),
    });
    expect(created.status).toBe(201);
    const { post } = await created.json() as { post: { id: string } };
    const pdf = Buffer.from("%PDF-1.4 raw-binary-fixture");

    const uploaded = await fetch(`${base}/feed/${post.id}/attachments`, {
      method: "POST",
      headers: {
        ...memberHeaders(),
        "Content-Type": "application/pdf",
        "X-Upload-Filename": encodeURIComponent("notes.pdf"),
      },
      body: pdf,
    });
    expect(uploaded.status).toBe(201);
    const uploadedBody = await uploaded.json() as { attachment: { id: string; filename: string; contentType: string } };
    expect(uploadedBody.attachment.filename).toBe("notes.pdf");
    expect(uploadedBody.attachment.contentType).toBe("application/pdf");

    const file = await fetch(`${base}/feed/attachments/${uploadedBody.attachment.id}/file`);
    expect(file.status).toBe(200);
    expect(file.headers.get("content-type")).toContain("application/pdf");
    expect(Buffer.from(await file.arrayBuffer()).equals(pdf)).toBe(true);
  });

  it("toggles saves and serializes saveCount/savedByYou in list and detail", async () => {
    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({ title: "Bookmark me", body: "Worth saving.", category: "general" }),
    });
    expect(created.status).toBe(201);
    const createdBody = (await created.json()) as {
      post: { id: string; saveCount: number; savedByYou: boolean };
    };
    expect(createdBody.post.saveCount).toBe(0);
    expect(createdBody.post.savedByYou).toBe(false);
    const postId = createdBody.post.id;

    // insert
    const saved = await fetch(`${base}/feed/${postId}/save`, { method: "POST", headers: memberHeaders() });
    expect(saved.status).toBe(200);
    expect(await saved.json()).toEqual({ saveCount: 1, savedByYou: true });

    // remove
    const removed = await fetch(`${base}/feed/${postId}/save`, { method: "POST", headers: memberHeaders() });
    expect(removed.status).toBe(200);
    expect(await removed.json()).toEqual({ saveCount: 0, savedByYou: false });

    // re-save stays one row per (post, user)
    const again = await fetch(`${base}/feed/${postId}/save`, { method: "POST", headers: memberHeaders() });
    expect(await again.json()).toEqual({ saveCount: 1, savedByYou: true });

    const byOther = await fetch(`${base}/feed/${postId}/save`, {
      method: "POST",
      headers: { Authorization: "Bearer other-token" },
    });
    expect(await byOther.json()).toEqual({ saveCount: 2, savedByYou: true });

    // public serialization in the list
    const listed = await fetch(`${base}/feed`);
    const listBody = (await listed.json()) as {
      posts: Array<{ id: string; saveCount: number; savedByYou: boolean }>;
    };
    expect(listBody.posts.find((item) => item.id === postId)).toMatchObject({
      saveCount: 2,
      savedByYou: false,
    });

    // ...and in detail, per viewer
    const memberView = (await (
      await fetch(`${base}/feed/${postId}`, { headers: memberHeaders() })
    ).json()) as { post: { saveCount: number; savedByYou: boolean } };
    expect(memberView.post).toMatchObject({ saveCount: 2, savedByYou: true });

    const guestView = (await (await fetch(`${base}/feed/${postId}`)).json()) as {
      post: { saveCount: number; savedByYou: boolean };
    };
    expect(guestView.post).toMatchObject({ saveCount: 2, savedByYou: false });

    // rows stay unique per (post, user)
    const rows = (memory.tables.community_feed_saves ?? []) as Array<{
      post_id: string;
      user_id: string;
    }>;
    expect(rows.filter((row) => row.post_id === postId && row.user_id === USER_ID)).toHaveLength(1);
    expect(rows.filter((row) => row.post_id === postId && row.user_id === OTHER_ID)).toHaveLength(1);

    const guestSave = await fetch(`${base}/feed/${postId}/save`, { method: "POST" });
    expect(guestSave.status).toBe(401);
  });

  it("keeps saves consistent when duplicate saves race", async () => {
    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({ title: "Race the save", body: "Double click.", category: "general" }),
    });
    expect(created.status).toBe(201);
    const { post } = (await created.json()) as { post: { id: string } };
    const postId = post.id;

    const [first, second] = await Promise.all([
      fetch(`${base}/feed/${postId}/save`, { method: "POST", headers: memberHeaders() }),
      fetch(`${base}/feed/${postId}/save`, { method: "POST", headers: memberHeaders() }),
    ]);
    expect(first.status).toBe(200);
    expect(second.status).toBe(200);

    const rows = (
      (memory.tables.community_feed_saves ?? []) as Array<{ post_id: string; user_id: string }>
    ).filter((row) => row.post_id === postId);
    const pairs = rows.map((row) => `${row.post_id}:${row.user_id}`);
    expect(new Set(pairs).size).toBe(pairs.length);

    const detail = (await (await fetch(`${base}/feed/${postId}`)).json()) as {
      post: { saveCount: number };
    };
    expect(detail.post.saveCount).toBe(rows.length);
  });

  it("threads bot and human replies with parentId/replyTo resolution", async () => {
    const created = await fetch(`${base}/feed`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({
        title: "Threaded help",
        body: "Explain projectile motion simply.",
        category: "physics",
      }),
    });
    expect(created.status).toBe(201);
    const { post } = (await created.json()) as { post: { id: string } };
    const postId = post.id;

    // (a) Initial bot reply is top-level and answers the post author.
    const published = await fetch(`${base}/feed/${postId}/ai-assistant/reply`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({ approve: true }),
    });
    expect(published.status).toBe(201);
    const publishedBody = (await published.json()) as {
      comment: {
        id: string;
        parentId: string | null;
        replyTo: { id: string; fullName: string; username?: string | null } | null;
      };
    };
    expect(publishedBody.comment.parentId).toBeNull();
    expect(publishedBody.comment.replyTo).toMatchObject({ id: USER_ID, fullName: "Member Student" });

    // (d) A human follow-up threads under the bot comment ("Replying to @Community bot").
    const followUp = await fetch(`${base}/feed/${postId}/comments`, {
      method: "POST",
      headers: { Authorization: "Bearer other-token", "Content-Type": "application/json" },
      body: JSON.stringify({ body: "Can you simplify the math?", followUpToBot: true }),
    });
    expect(followUp.status).toBe(201);
    const followUpBody = (await followUp.json()) as {
      comment: {
        id: string;
        parentId: string | null;
        replyTo: { id: string; fullName: string; username?: string | null } | null;
      };
    };
    const humanCommentId = followUpBody.comment.id;
    expect(followUpBody.comment.parentId).toBe(publishedBody.comment.id);
    expect(followUpBody.comment.replyTo).toMatchObject({
      id: "rn-study-assistant",
      fullName: "Community bot",
      username: "community-bot",
    });

    // (b) The deferred bot follow-up threads under the triggering human comment.
    const afterBot = await waitForComments(postId, 3);
    const botFollowUp = afterBot.find(
      (comment) => comment.author.id === "rn-study-assistant" && comment.id !== publishedBody.comment.id,
    );
    expect(botFollowUp).toBeTruthy();
    expect(botFollowUp?.parentId).toBe(humanCommentId);
    expect(botFollowUp?.replyTo).toMatchObject({ id: OTHER_ID, fullName: "Other Student" });

    // (c) A plain human comment is top-level with no replyTo.
    const plain = await fetch(`${base}/feed/${postId}/comments`, {
      method: "POST",
      headers: memberHeaders(true),
      body: JSON.stringify({ body: "Top-level thoughts." }),
    });
    expect(plain.status).toBe(201);
    const plainBody = (await plain.json()) as {
      comment: { id: string; parentId: string | null; replyTo: unknown };
    };
    expect(plainBody.comment.parentId).toBeNull();
    expect(plainBody.comment.replyTo).toBeNull();

    // Final detail serialization keeps every resolution.
    const detail = await waitForComments(postId, 4);
    expect(detail.find((comment) => comment.id === publishedBody.comment.id)).toMatchObject({
      parentId: null,
      replyTo: { id: USER_ID, fullName: "Member Student" },
    });
    expect(detail.find((comment) => comment.id === humanCommentId)).toMatchObject({
      parentId: publishedBody.comment.id,
      replyTo: { id: "rn-study-assistant", fullName: "Community bot", username: "community-bot" },
    });
    expect(detail.find((comment) => comment.id === plainBody.comment.id)).toMatchObject({
      parentId: null,
      replyTo: null,
    });
  });
});
