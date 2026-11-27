import type { Express } from "express";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi, type Mock } from "vitest";
import { restoreAccessApprovalEnv, stubAccessApprovalRequired } from "../helpers/access-approval-env";

const PHONE_TOKEN = "firebase-phone-id-token";
const PHONE_UID = "firebasePhoneUid12345678";
const PHONE_E164 = "+9779812345678";
const PHONE_SYNTH_EMAIL = `phone+9779812345678@phone.signin.harindrasah.com.np`;

const verifyFirebaseIdToken = vi.fn();
const firebaseCreateUser = vi.fn();
const firebaseSendEmailVerificationEmail = vi.fn();

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
    return null;
  },
  isFirebaseAuthReady: () => true,
  revokeFirebaseSessions: vi.fn(),
  firebaseCreateUser: (...args: unknown[]) => firebaseCreateUser(...args),
  firebaseSendPasswordResetEmail: vi.fn(),
  firebaseSendEmailVerificationEmail: (...args: unknown[]) => firebaseSendEmailVerificationEmail(...args),
}));

vi.mock("../../src/services/auth-profile.js", () => ({
  alignNonOwnerToMemberBaseline: vi.fn().mockResolvedValue(undefined),
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
  stubAccessApprovalRequired();
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
  firebaseSendEmailVerificationEmail.mockResolvedValue(true);
});

afterEach(() => {
  restoreAccessApprovalEnv();
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
  test("anonymous Firebase identities cannot create a login or protected session", async () => {
    verifyFirebaseIdToken.mockResolvedValue({
      uid: "anonymous-user",
      email: null,
      phoneNumber: null,
      displayName: null,
      emailVerified: false,
      providerIds: ["anonymous"],
    });

    const login = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: PHONE_TOKEN }),
    });
    expect(login.status).toBe(401);
    expect(setCookiesOf(login).some((cookie) => cookie.startsWith("sb-access-token="))).toBe(false);

    const me = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: `sb-access-token=${PHONE_TOKEN}` },
    });
    expect(me.status).toBe(401);
    expect(verifyFirebaseIdToken).toHaveBeenCalledTimes(2);
    expect(verifyFirebaseIdToken).toHaveBeenNthCalledWith(1, PHONE_TOKEN, { checkRevoked: true });
    expect(verifyFirebaseIdToken).toHaveBeenNthCalledWith(2, PHONE_TOKEN, { checkRevoked: true });
    expect(mocked.from).not.toHaveBeenCalled();
  });

  test("POST /login accepts idToken from phone sign-in and issues a session cookie", async () => {
    mockProfiles({ role: "member", access_status: "ACTIVE", plan: "member", premium_status: false });

    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: PHONE_TOKEN }),
    });

    expect(res.status).toBe(200);
    expect(verifyFirebaseIdToken).toHaveBeenCalledWith(PHONE_TOKEN, { checkRevoked: true });
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

  test("protected routes reject an unverified Firebase email identity", async () => {
    verifyFirebaseIdToken.mockResolvedValueOnce({
      uid: "unverified-email-user",
      email: "student@example.com",
      phoneNumber: null,
      emailVerified: false,
      providerIds: ["password"],
    });

    const res = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: `sb-access-token=${PHONE_TOKEN}` },
    });

    expect(res.status).toBe(401);
    expect(verifyFirebaseIdToken).toHaveBeenCalledWith(PHONE_TOKEN, { checkRevoked: true });
    expect(mocked.from).not.toHaveBeenCalled();
  });

  test("POST /login rejects an unverified email identity without issuing a session", async () => {
    verifyFirebaseIdToken.mockResolvedValueOnce({
      uid: "unverified-email-user",
      email: "student@example.com",
      phoneNumber: null,
      displayName: "Email Student",
      emailVerified: false,
      providerIds: ["password"],
    });

    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: "unverified-email-token" }),
    });

    expect(res.status).toBe(403);
    expect(await res.json()).toMatchObject({ code: "EMAIL_CONFIRMATION_REQUIRED" });
    expect(firebaseSendEmailVerificationEmail).toHaveBeenCalledWith(
      "student@example.com",
      expect.stringMatching(/\/login$/),
    );
    expect(setCookiesOf(res).some((cookie) => cookie.startsWith("sb-access-token="))).toBe(false);
  });

  test("POST /signup with an unverified email token returns 202 without a session", async () => {
    verifyFirebaseIdToken.mockResolvedValueOnce({
      uid: "unverified-signup-user",
      email: "newstudent@example.com",
      phoneNumber: null,
      displayName: null,
      emailVerified: false,
      providerIds: ["password"],
    });

    const res = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: "unverified-signup-token", fullName: "New Student" }),
    });

    expect(res.status).toBe(202);
    expect(await res.json()).toMatchObject({
      code: "EMAIL_CONFIRMATION_REQUIRED",
      user: null,
      accessToken: null,
    });
    expect(firebaseSendEmailVerificationEmail).toHaveBeenCalledWith(
      "newstudent@example.com",
      expect.stringMatching(/\/login$/),
    );
    expect(setCookiesOf(res).some((cookie) => cookie.startsWith("sb-access-token="))).toBe(false);
  });

  test("server-side signup never marks a new Firebase email as verified", async () => {
    firebaseCreateUser.mockResolvedValueOnce({
      uid: "server-created-user",
      email: "servercreated@example.com",
    });

    const res = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "servercreated@example.com",
        password: "strongPassword123",
        fullName: "Server Created",
      }),
    });

    expect(res.status).toBe(202);
    expect(firebaseCreateUser).toHaveBeenCalledWith({
      email: "servercreated@example.com",
      password: "strongPassword123",
      displayName: "Server Created",
    });
    expect(firebaseCreateUser.mock.calls[0][0]).not.toHaveProperty("emailVerified");
    expect(setCookiesOf(res).some((cookie) => cookie.startsWith("sb-access-token="))).toBe(false);
  });
});