import { describe, it, expect } from "vitest";
import {
  AI_SPARK_LIMITS,
  aiSparkIsMetered,
  aiSparkLimitFor,
  aiSparkTierFor,
} from "../../src/utils/aiSpark";

/**
 * AI spark tier enforcement (owner policy 2026-10-13: "restrict the ai spark
 * to 1 for public, 7 for member and unlimited for owner" + "create for plus
 * and pro member also like 25 and 50").
 */
describe("AI spark tier table", () => {
  it("daily allowances: guest 3 · member 7 · plus 25 · pro 50 · owner unlimited", () => {
    expect(AI_SPARK_LIMITS.guest).toBe(3);
    expect(AI_SPARK_LIMITS.member).toBe(7);
    expect(AI_SPARK_LIMITS.plus).toBe(25);
    expect(AI_SPARK_LIMITS.pro).toBe(50);
    expect(AI_SPARK_LIMITS.owner).toBe(Number.POSITIVE_INFINITY);
  });

  it("reports null limits for unlimited tiers", () => {
    expect(aiSparkLimitFor("owner")).toBeNull();
    expect(aiSparkLimitFor("pro")).toBe(50);
    expect(aiSparkLimitFor("guest")).toBe(3);
  });

  it("resolves tiers: owner allowlist wins, then plan, then membership", () => {
    expect(aiSparkTierFor(null)).toBe("guest");
    expect(aiSparkTierFor(undefined)).toBe("guest");
    expect(aiSparkTierFor({ email: "student@example.com" })).toBe("member");
    expect(aiSparkTierFor({ email: "student@example.com", plan: "plus" })).toBe(
      "plus",
    );
    expect(aiSparkTierFor({ email: "student@example.com", plan: "pro" })).toBe(
      "pro",
    );
    // Legacy PRO flag maps to the pro tier on un-migrated environments…
    expect(
      aiSparkTierFor({ email: "student@example.com", premiumStatus: true }),
    ).toBe("pro");
    // …and the hardcoded owner allowlist beats any plan row.
    expect(
      aiSparkTierFor({
        email: "harindarsah98172@gmail.com",
        plan: "member",
      }),
    ).toBe("owner");
    expect(
      aiSparkTierFor({
        email: "yashsah231@gmail.com",
        premiumStatus: true,
      }),
    ).toBe("owner");
  });

  it("only owners are unmetered", () => {
    expect(aiSparkIsMetered("owner")).toBe(false);
    for (const tier of ["guest", "member", "plus", "pro"] as const) {
      expect(aiSparkIsMetered(tier)).toBe(true);
    }
  });
});
