import express from "express";
import type { Server } from "node:http";
import type { NextFunction, Request, Response } from "express";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("../../src/middleware/auth", () => ({
  requireAuth: (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization !== "Bearer test") {
      res.sendStatus(401);
      return;
    }
    Object.assign(req, { user: { id: req.header("x-test-user") || "account-123", email: "student@example.com" } });
    next();
  },
}));
vi.mock("../../src/utils/mailer", () => ({ sendMail: vi.fn() }));
import router from "../../src/api/support-requests";
import { sendMail } from "../../src/utils/mailer";
import { rateLimit, resetRateLimits } from "../../src/middleware/rateLimit";
let server: Server; let base: string;
beforeAll(async () => {
  const app = express(); app.use(express.json()); app.use(rateLimit);
  app.use("/api/user/support-requests", router);
  server = app.listen(0, "127.0.0.1");
  await new Promise<void>(resolve => server.once("listening", resolve));
  base = `http://127.0.0.1:${(server.address() as { port: number }).port}/api/user/support-requests`;
});
afterAll(() => new Promise<void>((resolve, reject) => server.close(err => err ? reject(err) : resolve())));
beforeEach(() => { resetRateLimits(); vi.mocked(sendMail).mockReset(); });
const post = (body: unknown, auth = true) => fetch(base, {
  method: "POST",
  headers: { "Content-Type": "application/json", ...(auth ? { Authorization: "Bearer test" } : {}) },
  body: JSON.stringify(body),
});
describe("support delivery", () => {
  it("requires authentication", async () => {
    expect((await post({ kind: "ai_report", message: "Unsafe AI answer" }, false)).status).toBe(401);
    expect(sendMail).not.toHaveBeenCalled();
  });
  it.each(["account_deletion", "ai_report"])("delivers %s with trusted account identity and escaped content", async kind => {
    vi.mocked(sendMail).mockResolvedValue({ sent: true });
    const response = await post({ kind, message: "<script>unsafe</script>" });
    expect(response.status).toBe(202);
    const result = await response.json() as { message: string };
    expect(result.message).toBe(kind === "account_deletion"
      ? "Your account deletion request was delivered to support for review. Identity verification is required before deletion."
      : "Your AI content report was delivered to support for review.");
    const payload = vi.mocked(sendMail).mock.calls[0][0];
    expect(payload.to).toBe("sahrocky81@gmail.com");
    expect(payload.text).toContain("Account: account-123");
    expect(payload.html).toContain("&lt;script&gt;");
    expect(payload.html).not.toContain("<script>");
  });
  it.each([{ sent: false, skipped: true }, { sent: false, error: "private provider error" }])("rejects failed delivery", async result => {
    vi.mocked(sendMail).mockResolvedValue(result);
    const response = await post({ kind: "ai_report", message: "Unsafe AI content" });
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("private provider error");
  });
  it.each([{ kind: "invalid", message: "Test report message" }, { kind: "ai_report", message: "short" }, { kind: "ai_report", message: "x".repeat(4001) }, { kind: "ai_report", message: "Test report message", userId: "spoofed" }])("rejects invalid payload", async body => {
    expect((await post(body)).status).toBe(400); expect(sendMail).not.toHaveBeenCalled();
  });
  it("does not let anonymous traffic exhaust an account support budget", async () => {
    vi.mocked(sendMail).mockResolvedValue({ sent: true });
    for (let i = 0; i < 5; i++) expect((await post({ kind: "ai_report", message: "Unsafe AI content" }, false)).status).toBe(401);
    expect((await post({ kind: "account_deletion", message: "Please delete my data" })).status).toBe(202);
  });
  it("limits support mail independently", async () => {
    vi.mocked(sendMail).mockResolvedValue({ sent: true });
    for (let i = 0; i < 5; i++) expect((await post({ kind: "ai_report", message: "Unsafe AI content" })).status).toBe(202);
    expect((await post({ kind: "ai_report", message: "Unsafe AI content" })).status).toBe(429);
    expect(sendMail).toHaveBeenCalledTimes(5);
    const secondAccount = await fetch(base, { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer test", "x-test-user": "other-account" }, body: JSON.stringify({ kind: "account_deletion", message: "Please delete my account" }) });
    expect(secondAccount.status).toBe(202);
  });
});
