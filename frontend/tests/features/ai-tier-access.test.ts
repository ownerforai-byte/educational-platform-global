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

describe("AI spark tier table", () => {
  it("allowances: guest 0 · member 3 · plus 25 · pro 50 · owner unlimited", () => {
    expect(AI_SPARK_LIMITS.guest).toBe(0);
    expect(AI_SPARK_LIMITS.member).toBe(3);
    expect(AI_SPARK_LIMITS.plus).toBe(25);
    expect(AI_SPARK_LIMITS.pro).toBe(50);
    expect(Number.isFinite(AI_SPARK_LIMITS.owner)).toBe(false);
    expect(aiSparkLimitLabel("member")).toBe("3");
    expect(aiSparkLimitLabel("owner")).toBe("Unlimited");
  });

  it("mirrors the backend tier table exactly", () => {
    const backend = readRoot("backend/src/utils/aiSpark.ts");
    for (const [tier, limit] of Object.entries({
      guest: 0,
      member: 3,
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

describe("Veer chat: routes stay metered, professor workspace is Plus-gated", () => {
  it("the /ai and /chat layouts no longer gate on owner emails", () => {
    for (const p of ["app/(app)/ai/layout.tsx", "app/(app)/chat/layout.tsx"]) {
      const src = read(p);
      expect(src, p).not.toContain("isOwnerUser");
      expect(src, p).toContain("return <>{children}</>");
    }
  });

  it("the floating professor workspace is available at Plus and above", () => {
    const src = read("components/layout/ai-widget.tsx");
    expect(src).toContain('hasLevel(user, "plus")');
    expect(src).toContain("Veer Professor");
    expect(src).not.toContain("/plans");
  });

  it("integrates all four professor engines without redirecting deep questions", () => {
    const src = read("components/layout/ai-widget.tsx");
    expect(src).toContain("streamChat");
    expect(src).toContain("saveChatHistory");
    expect(src).toContain('"/api/ai/solve-math"');
    expect(src).toContain('"/api/ai/deep-dive"');
    expect(src).toContain("generateQuestions");
    expect(src).toContain("evaluateAnswers");
    expect(src).not.toContain("isDeepQuestion");
    expect(src).not.toContain("router.push");
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

  it("AI Studio routes meter AI sparks, not content sparks", () => {
    for (const file of ["backend/src/api/ai-math.ts", "backend/src/api/ai-deep-dive.ts", "backend/src/api/ai-generate.ts"]) {
      const src = readRoot(file);
      expect(src).toContain("aiSparkGateIfAuthed");
      expect(src).not.toContain('requireCredit("aiChat")');
    }
    expect(readRoot("backend/src/middleware/creditCheck.ts")).toContain('aiChat: { cost: 0');
  });

  it("hardcodes public chat to three messages per UTC day on client and server", () => {
    const guestQuota = readRoot("backend/src/utils/guestQuota.ts");
    expect(guestQuota).toContain("export const GUEST_DAILY_LIMIT = 3;");
    expect(read("lib/ai/guest-quota.ts")).toContain("export const GUEST_DAILY_LIMIT = 3;");
  });

  it("removes Search from the mobile quick links", () => {
    // QUICK_LINKS is the shared registry (lib/navigation.ts) consumed by the
    // mobile strip AND the tier home pages' quick-links rail.
    const quickLinks = read("lib/navigation.ts");
    expect(quickLinks).not.toContain('{ href: "/search", label: "Search" }');
    expect(quickLinks).toContain('{ href: "/chat", label: "AI" }');
  });
});
