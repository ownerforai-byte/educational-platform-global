import type { Express } from "express";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi, type Mock } from "vitest";

const PHONE_TOKEN = "firebase-phone-id-token";
const PHONE_UID = "firebasePhoneUid12345678";
const PHONE_E164 = "+9779812345678";
const PHONE_SYNTH_EMAIL = `phone+9779812345678@phone.signin.harindrasah.com.np`;

const verifyFirebaseIdToken = vi.fn();

vi.mock("../../src/db/supabase", () => {
  const admin = {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
      refreshSession: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      admin: { updateUserById: vi.fn(), getUserById: vi.fn(), listUsers: vi.fn() },
    },
    from: vi.fn(),
  };
  return {
    supabaseAdmin: admin,
    createAuthClient: () => admin,
  };
});

vi.mock("../../src/auth/firebase-admin-auth.js", () => ({
  verifyFirebaseIdToken: (...args: unknown[]) => verifyFirebaseIdToken(...args),
  firebaseSessionEmail: (verified: {
    email?: string | null;
    phoneNumber?: string | null;
    uid?: string;
  }) => {
    const email = verified.email?.trim();
    if (email) return email;
    const phone = verified.phoneNumber?.trim();
    if (phone) {
      const digits = phone.replace(/\D/g, "");
      if (digits) return `phone+${digits}@phone.signin.harindrasah.com.np`;
    }
    const uid = verified.uid?.trim();
    return uid ? `phone+${uid}@phone.signin.harindrasah.com.np` : null;
  },
  isFirebaseAuthReady: () => true,
  revokeFirebaseSessions: vi.fn(),
  firebaseCreateUser: vi.fn(),
  firebaseUpdatePassword: vi.fn(),
  firebaseGetUserByEmail: vi.fn(),
  firebaseSendPasswordResetEmail: vi.fn(),
}));

vi.mock("../../src/services/auth-profile.js", () => ({
  ensureAuthProfile: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("../../src/storage/firebase-store.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/storage/firebase-store.js")>();
  return {
    ...actual,
    readProfileDoc: vi.fn().mockResolvedValue(null),
  };
});

import { createApp } from "../../src/app";
import { supabaseAdmin } from "../../src/db/supabase";
import { resetRateLimits } from "../../src/middleware/rateLimit";

const mocked = supabaseAdmin as unknown as { from: Mock };

function makeQueryChain(result: { data: unknown; error: unknown }) {
  const chain: Record<string, unknown> = {};
  for (const method of [
    "select",
    "eq",
    "neq",
    "in",
    "like",
    "order",
    "single",
    "maybeSingle",
    "limit",
    "upsert",
    "update",
    "insert",
    "delete",
  ]) {
    chain[method] = vi.fn(() => chain);
  }
  chain.then = (
    onFulfilled?: (value: { data: unknown; error: unknown }) => unknown,
    onRejected?: (reason: unknown) => unknown,
  ) => Promise.resolve({ data: result.data, error: result.error }).then(onFulfilled, onRejected);
  return chain;
}

function mockProfiles(profileData: unknown, profileError: unknown = null) {
  mocked.from.mockImplementation((table: string) => {
    if (table === "profiles") {
      return makeQueryChain({ data: profileData, error: profileError });
    }
    return makeQueryChain({ data: [], error: null });
  });
}

function setCookiesOf(res: Response): string[] {
  const anyHeaders = res.headers as Headers & { getSetCookie?: () => string[] };
  if (typeof anyHeaders.getSetCookie === "function") {
    return anyHeaders.getSetCookie();
  }
  const single = res.headers.get("set-cookie");
  return single ? [single] : [];
}

let server: ReturnType<Express["listen"]>;
let baseUrl: string;

beforeEach(() => {
  vi.clearAllMocks();
  mocked.from.mockReset();
  mocked.from.mockImplementation(() => makeQueryChain({ data: [], error: null }));
  resetRateLimits();
  verifyFirebaseIdToken.mockResolvedValue({
    uid: PHONE_UID,
    email: null,
    phoneNumber: PHONE_E164,
    displayName: "Phone Student",
    emailVerified: false,
    providerIds: ["phone"],
  });
});

beforeAll(async () => {
  process.env.USE_FIREBASE_AUTH = "true";
  await new Promise<void>((resolve) => {
    const app = createApp();
    server = app.listen(0, () => {
      const address = server.address();
      const port = address && typeof address === "object" ? address.port : 0;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

afterAll(async () => {
  delete process.env.USE_FIREBASE_AUTH;
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

describe("firebase phone login", () => {
  test("POST /login accepts idToken from phone sign-in and issues a session cookie", async () => {
    mockProfiles({ role: "member", access_status: "ACTIVE", plan: "member", premium_status: false });

    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: PHONE_TOKEN }),
    });

    expect(res.status).toBe(200);
    expect(verifyFirebaseIdToken).toHaveBeenCalledWith(PHONE_TOKEN);
    const body = await res.json();
    expect(body.user).toMatchObject({ id: PHONE_UID, email: PHONE_SYNTH_EMAIL, role: "member" });
    expect(body.accessToken).toBe(PHONE_TOKEN);

    const sessionCookie = setCookiesOf(res).find((c) => c.startsWith("sb-access-token="));
    expect(sessionCookie).toContain(`sb-access-token=${PHONE_TOKEN}`);
  });

  test("POST /login rejects missing idToken when Firebase auth mode is on", async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@example.com", password: "password123" }),
    });

    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({
      code: "FIREBASE_CLIENT_AUTH",
    });
    expect(verifyFirebaseIdToken).not.toHaveBeenCalled();
  });
});