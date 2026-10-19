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
 * The other tiers are pinned to their known daily caps so a stray edit to
 * the tier table cannot silently regress owner behaviour.
 */
describe("aiSpark — owner is never asked for spark", () => {
  const ownerEmail = "ravikisan1814@gmail.com";

  it("always resolves to the owner tier, regardless of plan row", () => {
    const cases: AiSparkUser[] = [
      { email: ownerEmail },                                       // no plan row
      { email: ownerEmail, plan: "member" },                      // member
      { email: ownerEmail, plan: "plus" },                        // plus
      { email: ownerEmail, plan: "plus_20" },                     // temporary pass
      { email: ownerEmail, plan: "plus_20", planExpiresAt: new Date(Date.now() + 10 * 86_400_000) },
      { email: ownerEmail, plan: "pro" },                         // pro
      { email: ownerEmail, plan: "pro", premiumStatus: false },    // pro with legacy flag off
      { email: ownerEmail, role: "ADMIN" },                        // any role
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
    expect(AI_SPARK_LIMITS.guest).toBe(1);
    expect(AI_SPARK_LIMITS.member).toBe(7);
    expect(AI_SPARK_LIMITS.plus).toBe(25);
    expect(AI_SPARK_LIMITS.plus_20).toBe(25);
    expect(AI_SPARK_LIMITS.pro).toBe(50);
  });

  it("plus_20 falls back to member once the expiry has passed", () => {
    const active: AiSparkUser = {
      email: "x@example.com",
      plan: "plus_20",
      planExpiresAt: new Date(Date.now() + 5 * 86_400_000).toISOString(),
    };
    expect(aiSparkTierFor(active)).toBe("plus_20");

    const expired: AiSparkUser = {
      email: "x@example.com",
      plan: "plus_20",
      planExpiresAt: new Date(Date.now() - 86_400_000).toISOString(),
    };
    expect(aiSparkTierFor(expired)).toBe("member");

    const noExpiry: AiSparkUser = {
      email: "x@example.com",
      plan: "plus_20",
    };
    expect(aiSparkTierFor(noExpiry)).toBe("member");
  });
});
