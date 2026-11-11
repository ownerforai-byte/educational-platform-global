import { describe, expect, it } from "vitest";
import {
  AI_SPARK_LIMITS,
  aiSparkIsMetered,
  aiSparkTierFor,
  type AiSparkUser,
} from "../src/utils/aiSpark";

/**
 * Owner contract: an allowlist email is the owner tier no matter what plan
 * row or premium flag they carry, the tier is unmetered (never counted,
 * never blocked), and the daily allowance is effectively unlimited. This
 * is the user-facing promise that "owner is never asked for spark".
 *
 * The other rungs are pinned to their known daily caps (guest 0, member 13,
 * plus 25, pro 50) so a stray edit to the tier table cannot silently regress.
 * The retired visitor name is guest and the phantom plus_20 pass is gone —
 * legacy plus_20 plan rows resolve to Plus, with no expiry.
 */
describe("aiSpark — owner is never asked for spark", () => {
  const ownerEmail = "sahrocky81@gmail.com";

  it("always resolves to the owner tier, regardless of plan row", () => {
    const cases: AiSparkUser[] = [
      { email: ownerEmail },                                      // no plan row
      { email: ownerEmail, plan: "member" },                      // member
      { email: ownerEmail, plan: "plus" },                        // plus
      { email: ownerEmail, plan: "plus_20" },                     // legacy pass → plus, owner wins
      { email: ownerEmail, plan: "pro" },                         // pro
      { email: ownerEmail, plan: "pro", premiumStatus: false },   // pro with legacy flag off
      { email: ownerEmail, role: "pro" },                         // any role
    ];
    for (const user of cases) {
      expect(aiSparkTierFor(user), `for ${JSON.stringify(user)}`).toBe("owner");
    }
  });

  it("owner tier is never metered (no daily counter touched)", () => {
    expect(aiSparkIsMetered("owner")).toBe(false);
    expect(Number.isFinite(AI_SPARK_LIMITS.owner)).toBe(false);
  });

  it("non-owner tiers stay on their documented daily caps", () => {
    expect(AI_SPARK_LIMITS.guest).toBe(0);
    expect(AI_SPARK_LIMITS.member).toBe(13);
    expect(AI_SPARK_LIMITS.plus).toBe(25);
    expect(AI_SPARK_LIMITS.pro).toBe(50);
  });
});

describe("aiSpark — one ladder, one resolver", () => {
  it("signed-out callers are guests; signed-in accounts default to member", () => {
    expect(aiSparkTierFor(null)).toBe("guest");
    expect(aiSparkTierFor(undefined)).toBe("guest");
    expect(aiSparkTierFor({ email: "x@example.com" })).toBe("member");
    expect(aiSparkTierFor({ email: "x@example.com", plan: "member" })).toBe("member");
  });

  it("legacy plus_20 plan rows resolve to Plus (no expiry)", () => {
    expect(aiSparkTierFor({ email: "x@example.com", plan: "plus_20" })).toBe("plus");
    expect(aiSparkTierFor({ email: "x@example.com", plan: "plus" })).toBe("plus");
    expect(aiSparkTierFor({ email: "x@example.com", role: "plus" })).toBe("plus");
  });

  it("pro is reached by role, plan, or the legacy premium flag", () => {
    expect(aiSparkTierFor({ email: "x@example.com", role: "pro" })).toBe("pro");
    expect(aiSparkTierFor({ email: "x@example.com", plan: "pro" })).toBe("pro");
    expect(aiSparkTierFor({ email: "x@example.com", premiumStatus: true })).toBe("pro");
  });

  it("owner role wins without an allowlist email; every rung but owner is metered", () => {
    expect(aiSparkTierFor({ email: "x@example.com", role: "owner" })).toBe("owner");
    for (const tier of ["guest", "member", "plus", "pro"] as const) {
      expect(aiSparkIsMetered(tier)).toBe(true);
    }
  });
});