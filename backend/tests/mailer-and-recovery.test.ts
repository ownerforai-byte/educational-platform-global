import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi, type Mock } from "vitest";

// Mock Supabase
vi.mock("../src/db/supabase", () => {
  const admin = {
    auth: {
      resetPasswordForEmail: vi.fn(),
      exchangeCodeForSession: vi.fn(),
      getUser: vi.fn(),
      admin: {
        updateUserById: vi.fn(),
        listUsers: vi.fn(),
        getUserById: vi.fn(),
      },
    },
    from: vi.fn(),
  };
  return {
    supabaseAdmin: admin,
    createAuthClient: () => admin,
  };
});

import { supabaseAdmin } from "../src/db/supabase";
import authRoutes from "../src/api/auth";
import { resetRateLimits } from "../src/middleware/rateLimit";
import { sendMail, sendApprovalEmail } from "../src/utils/mailer";

const mocked = supabaseAdmin as unknown as {
  auth: {
    resetPasswordForEmail: Mock;
    exchangeCodeForSession: Mock;
    getUser: Mock;
    admin: {
      updateUserById: Mock;
      listUsers: Mock;
      getUserById: Mock;
    };
  };
  from: Mock;
};

let server: ReturnType<Express["listen"]>;
let baseUrl: string;

function listen(app: express.Express): Promise<{ url: string; server: ReturnType<Express["listen"]> }> {
  return new Promise((resolve) => {
    const srv = app.listen(0, () => {
      const address = srv.address();
      const port = address && typeof address === "object" ? address.port : 0;
      resolve({ url: `http://127.0.0.1:${port}`, server: srv });
    });
  });
}

beforeAll(async () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/auth", authRoutes);

  const res = await listen(app);
  server = res.server;
  baseUrl = res.url;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

beforeEach(() => {
  vi.clearAllMocks();
  resetRateLimits();
});

describe("Mailer unit tests (backend/src/utils/mailer.ts)", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.RESEND_API_KEY;
    delete process.env.SENDGRID_API_KEY;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("skips gracefully when no mail provider API key is configured", async () => {
    const result = await sendMail({
      to: "student@example.com",
      subject: "Test email",
      html: "<p>Hello</p>",
    });

    expect(result.sent).toBe(false);
    expect(result.skipped).toBe(true);
    expect(result.error).toBeUndefined();
  });

  test("sends via Resend when RESEND_API_KEY is configured", async () => {
    process.env.RESEND_API_KEY = "re_test_123456";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ id: "msg_123" }), { status: 200, statusText: "OK" }),
    );

    const result = await sendApprovalEmail("student@example.com", "Ram Thapa");

    expect(result.sent).toBe(true);
    expect(result.skipped).toBeUndefined();
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer re_test_123456",
        }),
      }),
    );

    fetchSpy.mockRestore();
  });

  test("reports Resend API error cleanly without throwing", async () => {
    process.env.RESEND_API_KEY = "re_test_invalid";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("Invalid API key", { status: 401, statusText: "Unauthorized" }),
    );

    const result = await sendApprovalEmail("student@example.com", "Ram Thapa");

    expect(result.sent).toBe(false);
    expect(result.error).toContain("resend 401");

    fetchSpy.mockRestore();
  });

  test("sends via SendGrid when SENDGRID_API_KEY is configured", async () => {
    process.env.SENDGRID_API_KEY = "SG.test_123456";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("", { status: 202, statusText: "Accepted" }),
    );

    const result = await sendMail({
      to: "student@example.com",
      subject: "Test via SendGrid",
      html: "<p>SendGrid test</p>",
    });

    expect(result.sent).toBe(true);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.sendgrid.com/v3/mail/send",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer SG.test_123456",
        }),
      }),
    );

    fetchSpy.mockRestore();
  });
});

describe("Forgot Password flow (POST /api/auth/forgot-password)", () => {
  test("returns 400 when email format is invalid", async () => {
    const res = await fetch(`${baseUrl}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "invalid-email-address" }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("valid email");
    expect(mocked.auth.resetPasswordForEmail).not.toHaveBeenCalled();
  });

  test("calls Supabase resetPasswordForEmail and returns 200 { sent: true } for valid email", async () => {
    mocked.auth.resetPasswordForEmail.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    const res = await fetch(`${baseUrl}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "student@example.com" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ sent: true });
    expect(mocked.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      "student@example.com",
      expect.objectContaining({
        redirectTo: expect.stringMatching(/\/reset-password$/),
      }),
    );
  });

  test("anti-enumeration: returns 200 { sent: true } even if Supabase returns an error", async () => {
    mocked.auth.resetPasswordForEmail.mockResolvedValueOnce({
      data: null,
      error: { message: "User not found", status: 404 },
    });

    const res = await fetch(`${baseUrl}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "nonexistent@example.com" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ sent: true });
  });
});

describe("Reset Password flow (POST /api/auth/reset-password)", () => {
  test("returns 400 when password is under 8 characters", async () => {
    const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "short", code: "valid-code" }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("between 8 and 72 characters");
  });

  test("returns 400 when both code and token are missing", async () => {
    const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "newStrongPassword123" }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("missing or malformed");
  });

  test("returns 400 when code exchange fails (expired or invalid)", async () => {
    mocked.auth.exchangeCodeForSession.mockResolvedValueOnce({
      data: { user: null },
      error: { message: "Invalid code", status: 400 },
    });

    const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "newStrongPassword123", code: "bad-code" }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("invalid or has expired");
  });

  test("successfully resets password using PKCE code", async () => {
    mocked.auth.exchangeCodeForSession.mockResolvedValueOnce({
      data: { user: { id: "user-target-1", email: "student@example.com" } },
      error: null,
    });
    mocked.auth.admin.updateUserById.mockResolvedValueOnce({
      data: { user: { id: "user-target-1" } },
      error: null,
    });

    const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "brandNewSecurePassword2026", code: "valid-pkce-code" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ success: true });
    expect(mocked.auth.exchangeCodeForSession).toHaveBeenCalledWith("valid-pkce-code");
    expect(mocked.auth.admin.updateUserById).toHaveBeenCalledWith("user-target-1", {
      password: "brandNewSecurePassword2026",
    });
  });

  test("successfully resets password using recovery access token", async () => {
    mocked.auth.getUser.mockResolvedValueOnce({
      data: { user: { id: "user-target-2", email: "student2@example.com" } },
      error: null,
    });
    mocked.auth.admin.updateUserById.mockResolvedValueOnce({
      data: { user: { id: "user-target-2" } },
      error: null,
    });

    const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "brandNewSecurePassword2026", token: "valid-recovery-token" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ success: true });
    expect(mocked.auth.getUser).toHaveBeenCalledWith("valid-recovery-token");
    expect(mocked.auth.admin.updateUserById).toHaveBeenCalledWith("user-target-2", {
      password: "brandNewSecurePassword2026",
    });
  });
});
