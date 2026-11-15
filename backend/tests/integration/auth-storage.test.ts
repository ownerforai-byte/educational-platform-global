/**
 * Signup/login PERSISTENCE and refusal matrix.
 *
 * The profile write is the thing that decides whether an account is stored at
 * all, so these tests assert the stores directly instead of mocking
 * `ensureAuthProfile` away:
 *
 *  - a signup writes the profile row (Supabase) AND the Firestore contract doc,
 *    binds the device, and answers "pending" with a pollable status token;
 *  - a login after approval issues a real session cookie;
 *  - a PENDING login is a "waiting" answer, never a deny;
 *  - a REJECTED login is a 403 with the actionable code;
 *  - a failing write degrades honestly (still pending + token, not a 500);
 *  - the Firestore mirror is not required to read approval back;
 *  - the owner allowlist skips the device gate and lands ACTIVE;
 *  - a second signup on the same device while the first is PENDING is refused
 *    with the exact owner message.
 */
import express from "express";
import cookieParser from "cookie-parser";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

interface Row {
  [key: string]: unknown;
}

const state = vi.hoisted(() => {
  const profiles = new Map<string, Row>();
  const usage = new Map<string, Row>();
  const requests = new Map<string, Row>();
  const firestore = new Map<string, Row>();
  const firestoreEnabled = { value: true };
  const failSupabaseWrites = { value: false };

  function reset() {
    profiles.clear();
    usage.clear();
    requests.clear();
    firestore.clear();
    firestoreEnabled.value = true;
    failSupabaseWrites.value = false;
  }

  return { profiles, usage, requests, firestore, firestoreEnabled, failSupabaseWrites, reset };
});

vi.mock("../../src/db/supabase", () => {
  const tables = () => ({ profiles: state.profiles, guest_chat_usage: state.usage, user_access_requests: state.requests });

  function builder(table: string) {
    const filters: Array<(row: Row) => boolean> = [];
    let mode: "select" | "insert" | "update" | "delete" = "select";
    let patch: Row = {};
    let inserted: Row[] = [];
    let single = false;
    let limitCount: number | undefined;

    const rows = () => {
      const map = tables()[table as keyof ReturnType<typeof tables>];
      return map ? [...map.values()] : [];
    };

    const resolve = () => {
      if (state.failSupabaseWrites.value && mode !== "select") {
        return Promise.resolve({ data: null, error: { message: "write failed (simulated)" } });
      }
      if (mode === "insert") {
        const map = tables()[table as keyof ReturnType<typeof tables>];
        if (map) {
          for (const record of inserted) map.set(String(record.id ?? record.client_key), record);
        }
        return Promise.resolve({ data: inserted, error: null });
      }
      if (mode === "update") {
        const matched = rows().filter((row) => filters.every((f) => f(row)));
        const map = tables()[table as keyof ReturnType<typeof tables>];
        for (const row of matched) Object.assign(row, patch);
        return Promise.resolve({ data: matched, error: null });
      }
      if (mode === "delete") {
        return Promise.resolve({ data: [], error: null });
      }
      let matched = rows().filter((row) => filters.every((f) => f(row)));
      if (limitCount !== undefined) matched = matched.slice(0, limitCount);
      return Promise.resolve({ data: single ? matched[0] ?? null : matched, error: null });
    };

    const chain: Record<string, unknown> = {
      select: () => chain,
      eq: (field: string, value: unknown) => {
        filters.push((row) => row[field] === value);
        return chain;
      },
      in: (field: string, values: unknown[]) => {
        filters.push((row) => values.includes(row[field]));
        return chain;
      },
      like: (field: string, prefix: string) => {
        filters.push((row) => String(row[field] ?? "").startsWith(prefix.replace(/%$/, "")));
        return chain;
      },
      order: () => chain,
      limit: (count: number) => {
        limitCount = count;
        return chain;
      },
      maybeSingle: () => {
        single = true;
        return resolve();
      },
      single: () => {
        single = true;
        return resolve();
      },
      insert: (data: Row | Row[]) => {
        mode = "insert";
        const now = new Date().toISOString();
        inserted = (Array.isArray(data) ? data : [data]).map((row) => ({
          id: row.id ?? `row-${Math.random().toString(36).slice(2)}`,
          requested_at: now,
          ...row,
        }));
        return chain;
      },
      update: (data: Row) => {
        mode = "update";
        patch = data;
        return chain;
      },
      delete: () => {
        mode = "delete";
        return chain;
      },
      upsert: (data: Row | Row[]) => {
        mode = "insert";
        inserted = (Array.isArray(data) ? data : [data]).map((row) => ({ ...row }));
        return chain;
      },
      then: (onF?: (value: unknown) => unknown, onR?: (reason: unknown) => unknown) =>
        resolve().then(onF, onR),
    };
    return chain;
  }

  const admin = {
    auth: {
      getUser: vi.fn(async () => ({ data: { user: null }, error: { message: "not used" } })),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      refreshSession: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      admin: { updateUserById: vi.fn(), getUserById: vi.fn() },
    },
    from: (table: string) => builder(table),
  };

  return { supabaseAdmin: admin, createAuthClient: () => admin };
});

const token = vi.hoisted(() => ({ verify: vi.fn() }));
vi.mock("../../src/auth/firebase-admin-auth.js", () => ({
  verifyFirebaseIdToken: (...args: unknown[]) => token.verify(...args),
  firebaseSessionEmail: (verified: { email?: string | null; phoneNumber?: string | null; uid?: string }) =>
    verified.email?.trim() || (verified.uid ? `phone+${verified.uid}@phone.example` : null),
  isFirebaseAuthReady: () => true,
  revokeFirebaseSessions: vi.fn(async () => {}),
  firebaseCreateUser: vi.fn(async () => null),
  firebaseUpdatePassword: vi.fn(async () => true),
  firebaseGetUserByEmail: vi.fn(async () => null),
  firebaseSendPasswordResetEmail: vi.fn(async () => true),
}));

vi.mock("../../src/storage/firebase-store.js", () => ({
  PROFILES_COLLECTION: "profiles",
  readProfileDoc: async (uid: string) => state.firestore.get(uid) ?? null,
  upsertProfileDoc: async (uid: string, fields: Row) => {
    if (!state.firestoreEnabled.value) return { error: { message: "firestore down" } };
    state.firestore.set(uid, { ...(state.firestore.get(uid) ?? {}), ...fields, id: uid });
    return { error: null };
  },
  updateProfileDoc: async (uid: string, fields: Row) => {
    if (!state.firestoreEnabled.value) return { error: { message: "firestore down" } };
    const existing = state.firestore.get(uid);
    if (!existing) return { error: null };
    state.firestore.set(uid, { ...existing, ...fields });
    return { error: null };
  },
  upsertFcmTokenDoc: async () => {},
  appendNotificationLog: async () => null,
  upsertAccessSession: async () => {},
}));

process.env.USE_FIREBASE_AUTH = "true";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-auth-storage-signing-key";

const app = express();
app.use(express.json());
app.use(cookieParser());
const authRouter = (await import("../../src/api/auth/auth.routes")).default;
const { DEVICE_SIGNUP_LIMIT_MESSAGE, resetDeviceSignupMemory } = await import("../../src/utils/deviceSignup");
app.use("/api/auth", authRouter);

let server: Server;
let base: string;

beforeAll(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(() => new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve()))));

beforeEach(() => {
  state.reset();
  resetDeviceSignupMemory();
  token.verify.mockReset();
});

const NEW_UID = "uid-new-student-1";
const OWNER_UID = "uid-owner-1";

function asUser(uid: string, email: string) {
  token.verify.mockResolvedValue({ uid, email, displayName: "Test Student" });
}

async function signup(uid: string, email: string, cookie?: string) {
  asUser(uid, email);
  const res = await fetch(`${base}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) },
    body: JSON.stringify({ idToken: `token-${uid}`, fullName: "Test Student" }),
  });
  const body = (await res.json()) as Record<string, unknown>;
  const deviceCookie = res.headers
    .getSetCookie?.()
    .map((value) => value.split(";")[0])
    .find((value) => value?.startsWith("neb-gid="));
  return { res, body, deviceCookie };
}

async function approve(uid: string, status: "ACTIVE" | "REJECTED" = "ACTIVE") {
  // The approval bot flips the Firestore contract doc; the Supabase mirror is
  // updated by the same flow. Both are set so the merged read agrees.
  const row = state.profiles.get(uid);
  if (row) row.access_status = status;
  const doc = state.firestore.get(uid);
  if (doc) doc.access_status = status;
}

describe("signup stores the account", () => {
  it("writes the profile row, the Firestore doc and the device binding", async () => {
    const { res, body, deviceCookie } = await signup(NEW_UID, "student@example.com");

    expect(res.status).toBe(200);
    expect(body.code).toBe("PENDING_APPROVAL");
    expect(typeof body.statusToken).toBe("string");
    expect(body.accessToken).toBeNull();

    // Supabase is the source of truth for what the app reads.
    const row = state.profiles.get(NEW_UID);
    expect(row).toBeTruthy();
    expect(row).toMatchObject({ access_status: "PENDING", role: "member", full_name: "Test Student" });
    expect(typeof row?.created_at).toBe("string");

    // ...and the Firestore contract doc the approval bot watches exists too.
    expect(state.firestore.get(NEW_UID)).toMatchObject({ access_status: "PENDING" });

    // The device is bound so a second account cannot slip through.
    expect(deviceCookie).toMatch(/^neb-gid=/);
    expect([...state.usage.keys()].some((key) => key.startsWith("signupdev:") && key.endsWith(NEW_UID))).toBe(true);
  });

  it("still answers pending when the profile write fails — not a 500", async () => {
    state.failSupabaseWrites.value = true;
    const { res, body } = await signup(NEW_UID, "student@example.com");
    expect(res.status).toBe(200);
    expect(body.code).toBe("PENDING_APPROVAL");
    expect(typeof body.statusToken).toBe("string");
    expect(body.message).toMatch(/being verified/i);
  });

  it("lets the owner through immediately with a session", async () => {
    const { res, body } = await signup(OWNER_UID, "sahrocky81@gmail.com");
    expect(res.status).toBe(200);
    expect(body.code).toBeUndefined();
    expect((body.user as { role?: string }).role).toBe("owner");
    expect(state.profiles.get(OWNER_UID)).toMatchObject({ access_status: "ACTIVE", role: "owner" });
    expect(res.headers.getSetCookie().some((c) => c.startsWith("sb-access-token="))).toBe(true);
  });
});

describe("login reflects the stored approval state", () => {
  const login = async (uid: string, email: string) => {
    asUser(uid, email);
    return fetch(`${base}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: `token-${uid}` }),
    });
  };

  it("issues a HttpOnly session once the account is ACTIVE", async () => {
    await signup(NEW_UID, "student@example.com");
    await approve(NEW_UID);

    const res = await login(NEW_UID, "student@example.com");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { user?: { id: string } };
    expect(body.user?.id).toBe(NEW_UID);

    const session = res.headers.getSetCookie().find((c) => c.startsWith("sb-access-token="));
    expect(session).toBeDefined();
    expect(session?.toLowerCase()).toContain("httponly");
  });

  it("answers pending (no session) while the account waits for approval", async () => {
    await signup(NEW_UID, "student@example.com");
    const res = await login(NEW_UID, "student@example.com");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { code?: string };
    expect(body.code).toBe("PENDING_APPROVAL");
    expect(res.headers.getSetCookie().some((c) => c.startsWith("sb-access-token="))).toBe(false);
  });

  it("rejects a denied account with the actionable code", async () => {
    await signup(NEW_UID, "student@example.com");
    await approve(NEW_UID, "REJECTED");
    const res = await login(NEW_UID, "student@example.com");
    expect(res.status).toBe(403);
    const body = (await res.json()) as { code?: string; statusToken?: string };
    expect(body.code).toBe("ACCOUNT_REJECTED");
    expect(typeof body.statusToken).toBe("string");
  });

  it("reads approval from Supabase even when the Firestore mirror is down", async () => {
    await signup(NEW_UID, "student@example.com");
    state.firestoreEnabled.value = false;
    state.profiles.get(NEW_UID)!.access_status = "ACTIVE";

    const res = await login(NEW_UID, "student@example.com");
    expect(res.status).toBe(200);
    expect(res.headers.getSetCookie().some((c) => c.startsWith("sb-access-token="))).toBe(true);
  });
});

describe("one account per device while unapproved", () => {
  it("refuses a second signup from the same device and reallows it after approval", async () => {
    const first = await signup(NEW_UID, "one@example.com");
    expect(first.res.status).toBe(200);

    const second = await signup("uid-second", "two@example.com", first.deviceCookie);
    expect(second.res.status).toBe(403);
    expect(second.body.code).toBe("DEVICE_SIGNUP_LIMIT");
    expect(second.body.error).toBe(DEVICE_SIGNUP_LIMIT_MESSAGE);

    // An approved account frees the device again.
    await approve(NEW_UID);
    const third = await signup("uid-second", "two@example.com", first.deviceCookie);
    expect(third.res.status).toBe(200);
  });
});
