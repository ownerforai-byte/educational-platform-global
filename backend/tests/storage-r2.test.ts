import http from "node:http";
import type { AddressInfo } from "node:net";
import express from "express";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * CLOUDFLARE R2 STORAGE WIRING (owner 2026-10-24: "firebase, its place is
 * replaced by cloudflare r2 … check it and wire if something is left").
 *
 * Supabase Storage is the PRIMARY store; Cloudflare R2 is the OVERFLOW backup
 * that activates only when a Supabase upload fails with a quota/storage-limit
 * error. These guards pin the route's branching, the classifier, and the
 * no-op switch semantics — the wiring the Render build depends on.
 */

const m = vi.hoisted(() => {
  const getUser = vi.fn();
  const role = { value: "owner" as string | null };
  const storageUpload = vi.fn();
  const r2Upload = vi.fn();
  const r2Active = { value: true };
  return { getUser, role, storageUpload, r2Upload, r2Active };
});

vi.mock("../src/db/supabase", () => {
  const supabaseAdmin = {
    auth: {
      getUser: (...args: unknown[]) => m.getUser(...args),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: { role: m.role.value }, error: null }),
        }),
      }),
    }),
    storage: {
      from: () => ({
        upload: (...args: unknown[]) => m.storageUpload(...args),
        getPublicUrl: (p: string) => ({
          data: {
            publicUrl: `https://sb.example/storage/v1/object/public/resources/${p}`,
          },
        }),
      }),
    },
  };
  return { supabaseAdmin, createAuthClient: () => supabaseAdmin };
});

vi.mock("../src/storage/r2", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../src/storage/r2")>();
  return {
    ...actual,
    isR2StorageActive: () => m.r2Active.value,
    r2Upload: (...args: unknown[]) => m.r2Upload(...args),
  };
});

const { storageRoutes } = await import("../src/api/storage");

type TestRes = { status: number; body: any };

function makeRequest(base: string) {
  return async (
    method: string,
    path: string,
    body?: unknown,
    token = "test-token",
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

async function mount() {
  const app = express();
  app.use(express.json({ limit: "30mb" }));
  app.use("/api/storage", storageRoutes);
  const server = http.createServer(app);
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return makeRequest(`http://127.0.0.1:${port}`);
}

const UPLOAD_BODY = {
  path: "class-11/physics/unit-3/notes.pdf",
  contentType: "application/pdf",
  dataBase64: "aGVsbG8=",
};

beforeEach(() => {
  m.getUser.mockReset();
  m.storageUpload.mockReset();
  m.r2Upload.mockReset();
  m.role.value = "owner";
  m.r2Active.value = true;
  m.getUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null });
  m.storageUpload.mockResolvedValue({
    data: { path: UPLOAD_BODY.path },
    error: null,
  });
  m.r2Upload.mockResolvedValue({ url: "https://pub.r2.example/class-11/x.pdf" });
});

afterAll(async () => {
  await Promise.all(
    servers.map((server) => new Promise((resolve) => server.close(resolve))),
  );
});

describe("POST /api/storage/upload — Supabase primary, R2 overflow", () => {
  it("401s without a bearer token", async () => {
    const request = await mount();
    const res = await request("POST", "/api/storage/upload", UPLOAD_BODY, "");
    expect(res.status).toBe(401);
  });

  it("403s a non-teacher role", async () => {
    const request = await mount();
    m.role.value = "member";
    const res = await request("POST", "/api/storage/upload", UPLOAD_BODY);
    expect(res.status).toBe(403);
  });

  it("rejects path traversal before touching storage", async () => {
    const request = await mount();
    const res = await request("POST", "/api/storage/upload", {
      ...UPLOAD_BODY,
      path: "docs/../secrets.pdf",
    });
    expect(res.status).toBe(400);
    expect(m.storageUpload).not.toHaveBeenCalled();
    expect(m.r2Upload).not.toHaveBeenCalled();
  });

  it("stores in Supabase and returns its public URL without touching R2", async () => {
    const request = await mount();
    const res = await request("POST", "/api/storage/upload", UPLOAD_BODY);
    expect(res.status).toBe(201);
    expect(res.body.path).toBe(UPLOAD_BODY.path);
    expect(res.body.publicUrl).toContain("sb.example");
    expect(res.body.storedIn).toBeUndefined();
    expect(m.r2Upload).not.toHaveBeenCalled();
  });

  it("overflows to R2 when Supabase is at quota", async () => {
    const request = await mount();
    m.storageUpload.mockResolvedValue({
      data: null,
      error: { message: "Bucket quota exceeded" },
    });
    const res = await request("POST", "/api/storage/upload", UPLOAD_BODY);
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      path: UPLOAD_BODY.path,
      publicUrl: "https://pub.r2.example/class-11/x.pdf",
      storedIn: "r2",
    });
    expect(m.r2Upload).toHaveBeenCalledTimes(1);
  });

  it("stays Supabase-only (500) when R2 is not configured", async () => {
    const request = await mount();
    m.r2Active.value = false;
    m.storageUpload.mockResolvedValue({
      data: null,
      error: { message: "Bucket quota exceeded" },
    });
    const res = await request("POST", "/api/storage/upload", UPLOAD_BODY);
    expect(res.status).toBe(500);
    expect(m.r2Upload).not.toHaveBeenCalled();
  });

  it("500s a non-quota Supabase error without touching R2", async () => {
    const request = await mount();
    m.storageUpload.mockResolvedValue({
      data: null,
      error: { message: "violates row-level security policy" },
    });
    const res = await request("POST", "/api/storage/upload", UPLOAD_BODY);
    expect(res.status).toBe(500);
    expect(m.r2Upload).not.toHaveBeenCalled();
  });
});

describe("r2 module — overflow trigger + no-op switch", () => {
  it("recognizes quota/storage-limit errors and nothing else", async () => {
    const actual =
      await vi.importActual<typeof import("../src/storage/r2")>(
        "../src/storage/r2",
      );
    expect(actual.looksLikeSupabaseStorageLimit("quota exceeded")).toBe(true);
    expect(actual.looksLikeSupabaseStorageLimit({ message: "Storage limit exceeded" })).toBe(true);
    expect(actual.looksLikeSupabaseStorageLimit("exceeded storage capacity")).toBe(true);
    expect(actual.looksLikeSupabaseStorageLimit("duplicate key value")).toBe(false);
    expect(actual.looksLikeSupabaseStorageLimit(null)).toBe(false);
  });

  it("isR2StorageActive needs all four vars — nothing less, no secrets logged", async () => {
    const vars = {
      R2_ACCOUNT_ID: "acct",
      R2_BUCKET: "bucket",
      R2_ACCESS_KEY_ID: "key-id",
      R2_SECRET_ACCESS_KEY: "secret",
    } as const;
    const original: Record<string, string | undefined> = {};
    for (const name of Object.keys(vars)) {
      original[name] = process.env[name];
      delete process.env[name];
    }
    try {
      const fresh = async () => {
        vi.resetModules();
        return vi.importActual<typeof import("../src/storage/r2")>(
          "../src/storage/r2",
        );
      };

      expect((await fresh()).isR2StorageActive()).toBe(false);

      // A partial set is still inactive (the startup report calls this out).
      process.env.R2_ACCOUNT_ID = vars.R2_ACCOUNT_ID;
      process.env.R2_BUCKET = vars.R2_BUCKET;
      expect((await fresh()).isR2StorageActive()).toBe(false);

      process.env.R2_ACCESS_KEY_ID = vars.R2_ACCESS_KEY_ID;
      process.env.R2_SECRET_ACCESS_KEY = vars.R2_SECRET_ACCESS_KEY;
      expect((await fresh()).isR2StorageActive()).toBe(true);
    } finally {
      for (const name of Object.keys(vars)) {
        if (original[name] === undefined) delete process.env[name];
        else process.env[name] = original[name];
      }
    }
  });
});
