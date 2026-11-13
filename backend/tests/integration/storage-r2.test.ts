import http from "node:http";
import type { AddressInfo } from "node:net";
import express from "express";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Free-tier three-lane routing:
 *   Tier 3 (R2) — all binaries (Spark cannot enable Firebase Storage)
 *   Tier 2 (Firestore) — docs only (tested elsewhere)
 *   Tier 1 (Supabase) — relational only
 */

const m = vi.hoisted(() => {
  const getUser = vi.fn();
  const role = { value: "owner" as string | null };
  const accessStatus = { value: undefined as string | undefined };
  const r2Upload = vi.fn();
  const r2Active = { value: true };
  const firebaseUpload = vi.fn();
  const firebaseConfigured = { value: false };
  return {
    getUser,
    role,
    accessStatus,
    r2Upload,
    r2Active,
    firebaseUpload,
    firebaseConfigured,
  };
});

vi.mock("../../src/db/supabase", () => {
  const supabaseAdmin = {
    auth: {
      getUser: (...args: unknown[]) => m.getUser(...args),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({
            data: { role: m.role.value, access_status: m.accessStatus.value },
            error: null,
          }),
          maybeSingle: async () => ({
            data: { role: m.role.value, access_status: m.accessStatus.value },
            error: null,
          }),
        }),
      }),
    }),
    storage: {
      from: () => ({
        upload: vi.fn(),
        getPublicUrl: () => ({ data: { publicUrl: "https://sb.example/x" } }),
        list: async () => ({ data: [], error: null }),
      }),
      getBucket: async () => ({ data: { id: "resources", public: true }, error: null }),
    },
  };
  return { supabaseAdmin, createAuthClient: () => supabaseAdmin };
});

vi.mock("../../src/storage/r2", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/storage/r2")>();
  return {
    ...actual,
    isR2StorageActive: () => m.r2Active.value,
    r2Upload: (...args: unknown[]) => m.r2Upload(...args),
    supabaseStorageHealth: async () => ({
      configured: true,
      buckets: [],
      totalBytes: 0,
    }),
  };
});

vi.mock("../../src/storage/firebase-admin", () => ({
  isFirebaseAdminConfigured: () => m.firebaseConfigured.value,
  firebaseAdminHealth: () => ({
    configured: m.firebaseConfigured.value,
    ready: m.firebaseConfigured.value,
    error: null,
    storageBucket: null,
  }),
  ensureFirebaseAdmin: () => null,
  getFirestore: () => null,
  getStorageBucket: () => null,
  getFirebaseInitError: () => null,
}));

vi.mock("../../src/storage/firebase-store", () => ({
  firebaseUpload: (...args: unknown[]) => m.firebaseUpload(...args),
  upsertFcmTokenDoc: async () => {},
  appendNotificationLog: async () => null,
  upsertAccessSession: async () => {},
}));

const { storageRoutes } = await import("../../src/api/storage");

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

const PDF_BODY = {
  path: "class-11/physics/unit-3/notes.pdf",
  contentType: "application/pdf",
  dataBase64: "aGVsbG8=",
};

const IMAGE_BODY = {
  path: "class-11/physics/diagram.png",
  contentType: "image/png",
  dataBase64: "aGVsbG8=",
};

beforeEach(() => {
  delete process.env.FIREBASE_STORAGE_ENABLED;
  m.getUser.mockReset();
  m.r2Upload.mockReset();
  m.firebaseUpload.mockReset();
  m.role.value = "owner";
  m.accessStatus.value = undefined;
  m.r2Active.value = true;
  m.firebaseConfigured.value = false;
  m.getUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null });
  m.r2Upload.mockResolvedValue({ url: "https://pub.r2.example/class-11/x.pdf" });
  m.firebaseUpload.mockResolvedValue({
    url: "https://firebasestorage.example/media/diagram.png",
    path: "media/class-11/physics/diagram.png",
  });
});

afterAll(async () => {
  await Promise.all(
    servers.map((server) => new Promise((resolve) => server.close(resolve))),
  );
});

describe("POST /api/storage/upload — free-tier R2 routing", () => {
  it("401s without a bearer token", async () => {
    const request = await mount();
    const res = await request("POST", "/api/storage/upload", PDF_BODY, "");
    expect(res.status).toBe(401);
  });

  it("403s a non-teacher role", async () => {
    const request = await mount();
    m.role.value = "member";
    m.accessStatus.value = "ACTIVE";
    const res = await request("POST", "/api/storage/upload", PDF_BODY);
    expect(res.status).toBe(403);
  });

  it("rejects path traversal before touching storage", async () => {
    const request = await mount();
    const res = await request("POST", "/api/storage/upload", {
      ...PDF_BODY,
      path: "docs/../secrets.pdf",
    });
    expect(res.status).toBe(400);
    expect(m.r2Upload).not.toHaveBeenCalled();
  });

  it("routes PDFs to R2", async () => {
    const request = await mount();
    const res = await request("POST", "/api/storage/upload", PDF_BODY);
    expect(res.status).toBe(201);
    expect(res.body.storedIn).toBe("r2");
    expect(res.body.tier).toBe(3);
    expect(m.r2Upload).toHaveBeenCalledTimes(1);
    expect(m.firebaseUpload).not.toHaveBeenCalled();
  });

  it("routes small images to R2 on free tier (no Firebase Storage)", async () => {
    const request = await mount();
    const res = await request("POST", "/api/storage/upload", IMAGE_BODY);
    expect(res.status).toBe(201);
    expect(res.body.storedIn).toBe("r2");
    expect(res.body.tier).toBe(3);
    expect(m.r2Upload).toHaveBeenCalledTimes(1);
    expect(m.firebaseUpload).not.toHaveBeenCalled();
  });

  it("500s when R2 is not configured on free tier", async () => {
    m.r2Active.value = false;
    const request = await mount();
    const res = await request("POST", "/api/storage/upload", PDF_BODY);
    expect(res.status).toBe(500);
    expect(m.r2Upload).not.toHaveBeenCalled();
  });
});

describe("tier classifier (free tier)", () => {
  it("sends every binary to tier 3 when Firebase Storage is disabled", async () => {
    delete process.env.FIREBASE_STORAGE_ENABLED;
    const { classifyBinaryUpload } = await import("../../src/storage/tiers");
    expect(
      classifyBinaryUpload({
        contentType: "application/pdf",
        byteLength: 100,
        path: "a.pdf",
      }),
    ).toBe(3);
    expect(
      classifyBinaryUpload({
        contentType: "image/png",
        byteLength: 100,
        path: "a.png",
      }),
    ).toBe(3);
  });
});
