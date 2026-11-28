import type { Server } from "node:http";
import express from "express";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  user: {
    id: "11111111-1111-4111-8111-111111111111",
    email: "plus@example.com",
    role: "member",
    plan: "plus",
    premiumStatus: false,
  },
  profile: {
    role: "member",
    plan: "plus",
    credits: 0,
    premium_status: false,
    credits_unlock: {} as Record<string, number>,
  },
  spendCredits: vi.fn(),
  ensureDailyCredits: vi.fn(),
  refundCredits: vi.fn(),
  updateProfileFields: vi.fn(),
}));

vi.mock("../../src/middleware/auth", () => ({
  requireAuth: (req: { user?: unknown }, _res: unknown, next: () => void) => {
    req.user = state.user;
    next();
  },
  isOwnerEmail: () => false,
}));

vi.mock("../../src/api/platform/support.controller", () => ({
  default: (_req: unknown, _res: unknown, next: () => void) => next(),
}));

vi.mock("../../src/db/repositories/user.repository", () => ({
  getProfileById: vi.fn(async () => ({ data: state.profile, error: null })),
  updateProfileFields: (...args: unknown[]) => state.updateProfileFields(...args),
  findPendingPremiumRequest: vi.fn(async () => ({ data: null, error: null })),
  insertPremiumRequest: vi.fn(),
  listPremiumRequests: vi.fn(async () => ({ data: [], error: null })),
}));

vi.mock("../../src/db/repositories/credit.repository", () => ({
  listCreditTransactions: vi.fn(async () => ({ data: [], error: null })),
}));

vi.mock("../../src/services/credit.service", () => ({
  DAILY_CREDIT_POOL: 4,
  ensureDailyCredits: (...args: unknown[]) => state.ensureDailyCredits(...args),
  spendCredits: (...args: unknown[]) => state.spendCredits(...args),
  refundCredits: (...args: unknown[]) => state.refundCredits(...args),
}));

vi.mock("../../src/services/profile-storage", () => ({
  getStorageSnapshot: vi.fn(),
  TIER_STORAGE_LIMITS: {},
}));

const router = (await import("../../src/api/user/profile.controller")).default;

let server: Server;
let base: string;

beforeAll(async () => {
  const app = express();
  app.use(express.json());
  app.use("/api/user", router);
  server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("No test server address");
  base = `http://127.0.0.1:${address.port}/api/user/credits/unlock`;
});

afterAll(() => new Promise<void>((resolve, reject) => {
  server.close((error) => (error ? reject(error) : resolve()));
}));

beforeEach(() => {
  state.profile.credits = 0;
  state.profile.premium_status = false;
  state.profile.credits_unlock = {};
  state.spendCredits.mockReset().mockResolvedValue(0);
  state.ensureDailyCredits.mockReset().mockResolvedValue({
    credits: 0,
    resetDone: false,
    unlimited: false,
  });
  state.refundCredits.mockReset().mockResolvedValue(0);
  state.updateProfileFields.mockReset().mockImplementation(async (_id: string, fields: Record<string, unknown>) => {
    state.profile.credits_unlock = fields.credits_unlock as Record<string, number>;
    return { error: null };
  });
});

const content = {
  kind: "concepts",
  classSlug: "class-11-notes",
  subjectSlug: "physics",
  unitSlug: "kinematics",
  filename: "motion.json",
};

async function unlock(body: Record<string, unknown>) {
  const response = await fetch(base, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { response, body: await response.json() };
}

describe("content unlock pricing", () => {
  it("charges paid content even when the client claims a free category", async () => {
    state.profile.credits = 1;
    state.ensureDailyCredits.mockResolvedValue({ credits: 1, resetDone: false, unlimited: false });
    state.spendCredits.mockResolvedValue(0);

    const { response, body } = await unlock({ category: "lab3d", content });

    expect(response.status).toBe(200);
    expect(body.cost).toBe(1);
    expect(state.spendCredits).toHaveBeenCalledWith(
      state.user.id,
      1,
      expect.stringContaining("concepts"),
    );
    expect(body.moduleKey).toMatch(/^content:[0-9a-f]{64}$/);
  });

  it("returns 402 without opening a free window when paid sparks are missing", async () => {
    const { response, body } = await unlock({ category: "visuals", content });

    expect(response.status).toBe(402);
    expect(body).toMatchObject({ required: 1, current: 0 });
    expect(state.spendCredits).not.toHaveBeenCalled();
    expect(state.updateProfileFields).not.toHaveBeenCalled();
    expect(state.profile.credits_unlock).toEqual({});
  });

  it("keeps visual content free without trusting the paid client category", async () => {
    const { response, body } = await unlock({
      category: "theory",
      content: { ...content, kind: "mindmap" },
    });

    expect(response.status).toBe(200);
    expect(body.cost).toBe(0);
    expect(state.ensureDailyCredits).not.toHaveBeenCalled();
    expect(state.spendCredits).not.toHaveBeenCalled();
  });
});
