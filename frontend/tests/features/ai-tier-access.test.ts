import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  AI_SPARK_LIMITS,
  aiSparkLimitLabel,
  aiSparkTierFor,
} from "@/lib/ai/ai-spark-tiers";

const read = (p: string) => readFileSync(path.resolve(p), "utf8");
const readRoot = (p: string) => readFileSync(path.resolve("..", p), "utf8");

/**
 * AI access policy (owner 2026-10-13: "restrict the ai spark to 1 for public,
 * 7 for member and unlimited for owner" + "create for plus and pro member
 * also like 25 and 50"). Veer chat is metered per tier by AI sparks. This
 * REPLACES the 2026-10-05 owner-only gate (and its old source pins in
 * ai-owner-gate.test.ts) — the owner chose the open, tier-metered policy on
 * 2026-10-13.
 *
 * 2026-10-17: the floating Veer LAUNCHER is now locked under the spark gate —
 * "lock ai widget under spark gate also". Pro + owner pass and open /chat;
 * visitor / member / plus meet a lock that routes to /pro-plan. The /ai and
 * /chat ROUTES stay public (AI-spark metered), so the gate is on the launcher
 * surface, not an owner allowlist.
 */
describe("AI spark tier table", () => {
  it("allowances: guest 1 · member 7 · plus 25 · pro 50 · owner unlimited", () => {
    expect(AI_SPARK_LIMITS.guest).toBe(1);
    expect(AI_SPARK_LIMITS.member).toBe(7);
    expect(AI_SPARK_LIMITS.plus).toBe(25);
    expect(AI_SPARK_LIMITS.pro).toBe(50);
    expect(Number.isFinite(AI_SPARK_LIMITS.owner)).toBe(false);
    expect(aiSparkLimitLabel("member")).toBe("7");
    expect(aiSparkLimitLabel("owner")).toBe("Unlimited");
  });

  it("mirrors the backend tier table exactly", () => {
    const backend = readRoot("backend/src/utils/aiSpark.ts");
    for (const [tier, limit] of Object.entries({
      guest: 1,
      member: 7,
      plus: 25,
      pro: 50,
    })) {
      expect(backend, `backend AI_SPARK_LIMITS.${tier}`).toContain(
        `${tier}: ${limit},`,
      );
    }
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
    // Legacy PRO flag maps to the pro tier…
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
  });
});

describe("Veer chat: routes stay public (metered), launcher sits under the spark gate", () => {
  it("the /ai and /chat layouts no longer gate on owner emails", () => {
    for (const p of ["app/(app)/ai/layout.tsx", "app/(app)/chat/layout.tsx"]) {
      const src = read(p);
      expect(src, p).not.toContain("isOwnerUser");
      expect(src, p).toContain("return <>{children}</>");
    }
  });

  it("the floating Veer launcher is locked under the spark gate (Pro + owner)", () => {
    const src = read("components/layout/ai-widget.tsx");
    // Gate is the ACCESS LADDER (Pro + owner pass), never the owner allowlist.
    expect(src).not.toContain("isOwnerUser");
    expect(src).toContain("hasLevel");
    // Below Pro the launcher locks and routes to the plan page.
    expect(src).toContain("/pro-plan");
  });

  it("no Veer nav entry carries ownerOnly", () => {
    const nav = read("lib/navigation.ts");
    const chatLines = nav
      .split("\n")
      .filter((l) => /href: "\/(ai|chat)(\/|")/.test(l));
    expect(chatLines.length).toBeGreaterThanOrEqual(6);
    for (const line of chatLines) expect(line).not.toContain("ownerOnly");
  });

  it("/ai + /chat are public (AI-spark metered), never content-spark locked", () => {
    const constants = read("features/credits/constants.ts");
    const publicBlock =
      constants.match(/PUBLIC_PATHS = \[[\s\S]*?\] as const/)?.[0] ?? "";
    expect(publicBlock).toContain('"/ai"');
    expect(publicBlock).toContain('"/chat"');
    const exemptBlock =
      constants.match(/EXEMPT_PATHS = \[[\s\S]*?\] as const/)?.[0] ?? "";
    expect(exemptBlock).not.toContain('"/ai"');
    expect(exemptBlock).not.toContain('"/chat"');
  });

  it("the chat API meters AI sparks and is not owner-gated", () => {
    const route = readRoot("backend/src/api/ai.ts");
    expect(route).not.toContain("requireOwnerEmail");
    expect(route).toContain('router.post("/", requireAuth, async');
    expect(route).toContain("consumeUserSlot");
    expect(route).toContain("aiSparkTierFor");
    // Owner tier draws nothing — the metered check is explicit.
    expect(route).toContain("aiSparkIsMetered(tier)");
  });

  it("the guest pool still caps public visitors at 1/day", () => {
    const guestQuota = readRoot("backend/src/utils/guestQuota.ts");
    expect(guestQuota).toContain("export const GUEST_DAILY_LIMIT = 1;");
  });
});
