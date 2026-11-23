import { describe, expect, it } from "vitest";
import {
  ACCESS_LABELS,
  ACCESS_LEVELS,
  ACCESS_RANK,
  ACCESS_TAGLINES,
  TIER_HOME_PATHS,
  TIER_SPARKS,
  TIER_WELCOME_PATHS,
  accessLevelFor,
  hasLevel,
  tierHomePathFor,
  tierWelcomePathFor,
} from "@/lib/core/access-level";
import { OWNER_EMAIL } from "@/lib/owner";

describe("lib/core/access-level", () => {
  it("lists the five rungs in low → high order", () => {
    expect(ACCESS_LEVELS).toEqual(["guest", "member", "plus", "pro", "owner"]);
    expect(ACCESS_RANK).toEqual({ guest: 0, member: 1, plus: 2, pro: 3, owner: 4 });
  });

  it("labels and taglines cover every rung", () => {
    for (const tier of ACCESS_LEVELS) {
      expect(ACCESS_LABELS[tier].length).toBeGreaterThan(0);
      expect(ACCESS_TAGLINES[tier].length).toBeGreaterThan(0);
      expect(TIER_SPARKS[tier].length).toBeGreaterThan(0);
    }
  });

  it("resolves guest when signed out", () => {
    expect(accessLevelFor(null)).toBe("guest");
    expect(accessLevelFor(undefined)).toBe("guest");
    expect(tierHomePathFor(null)).toBe("/");
    expect(tierWelcomePathFor(null)).toBe("/welcome/guest");
  });

  it("resolves member for a signed-in base account", () => {
    const user = { email: "student@example.com", role: "member", plan: "member" };
    expect(accessLevelFor(user)).toBe("member");
    expect(tierHomePathFor(user)).toBe(TIER_HOME_PATHS.member);
    expect(tierWelcomePathFor(user)).toBe(TIER_WELCOME_PATHS.member);
  });

  it("resolves plus, pro, and owner (email allowlist + role grant)", () => {
    expect(accessLevelFor({ email: "x@x.com", plan: "plus" })).toBe("plus");
    expect(accessLevelFor({ email: "x@x.com", role: "pro" })).toBe("pro");
    expect(accessLevelFor({ email: "x@x.com", premiumStatus: true })).toBe("pro");
    expect(accessLevelFor({ email: OWNER_EMAIL })).toBe("owner");
    expect(accessLevelFor({ email: "delegate@x.com", role: "owner" })).toBe("owner");
    expect(accessLevelFor({ email: "x@x.com", plan: "plus_20" })).toBe("plus");
  });

  it("hasLevel compares numeric ranks", () => {
    const plusUser = { email: "p@x.com", plan: "plus" };
    expect(hasLevel(plusUser, "guest")).toBe(true);
    expect(hasLevel(plusUser, "plus")).toBe(true);
    expect(hasLevel(plusUser, "pro")).toBe(false);
    expect(hasLevel({ email: OWNER_EMAIL }, "owner")).toBe(true);
  });
});