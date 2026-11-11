import { describe, expect, test } from "vitest";
import { readApiSource } from "./read-api-source.js";

/**
 * AI route gates (source-level pins).
 *
 * Owner policy 2026-10-13 supersedes the 2026-10-05 owner-only gate on
 * POST /api/ai: chat is open to every signed-in tier and metered by AI sparks
 * (member 13 / plus 25 / pro 50 per UTC day, owner unlimited; guests get the
 * home guide only). Remaining chat routes keep the owner-email allowlist, and
 * the quiz generator stays open (students keep /ai-quiz via /api/ai/generate-questions).
 */
const read = (p: string) => readApiSource(p.replace(/^(\.\.\/)+src\/api\//, ""));

describe("AI owner gate (source pins)", () => {
  test("POST /api/ai is session-gated and AI-spark metered (open to every tier)", () => {
    const src = read("../src/api/ai.ts");
    expect(src).toMatch(/router\.post\("\/", requireAuth/);
    expect(src).not.toMatch(/router\.post\("\/", requireAuth, requireOwnerEmail/);
    expect(src).toContain("consumeUserSlot");
  });

  test("POST /api/ai/guest is public, rate-limited, and closed", () => {
    const src = read("../src/api/ai-guest.ts");
    expect(src).toMatch(/router\.post\("\/", rateLimit,/);
    expect(src).not.toContain("requireAuth");
    expect(src).not.toContain("requireOwnerEmail");
    expect(src).toContain('res.status(403).json({');
    expect(src).toContain('error: "Veer chat is for members"');
  });

  test("POST /api/ai/enhance requires an owner email", () => {
    const src = read("../src/api/ai-enhance.ts");
    expect(src).toMatch(/router\.post\("\/", requireAuth, requireOwnerEmail/);
  });

  test("POST /api/ai/history-search requires an owner email", () => {
    const src = read("../src/api/ai-history.ts");
    expect(src).toMatch(/router\.post\("\/", requireAuth, requireOwnerEmail/);
  });

  test("POST /api/ai/generate-questions stays open for the student quiz", () => {
    const src = readApiSource("ai-generate.ts");
    expect(src).not.toContain("requireOwnerEmail");
  });
});
