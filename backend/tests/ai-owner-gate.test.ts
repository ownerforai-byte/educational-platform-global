import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

/**
 * AI route gates (source-level pins).
 *
 * Owner policy 2026-10-13 supersedes the 2026-10-05 owner-only gate on
 * POST /api/ai: chat is open to every signed-in tier and metered by AI sparks
 * (guest 1 / member 7 / plus 25 / pro 50 per UTC day, owner unlimited). The
 * remaining chat routes keep the owner-email allowlist, and the quiz
 * generator stays open (students keep /ai-quiz via /api/ai/generate-questions).
 */
const read = (p: string) => readFileSync(path.resolve(__dirname, p), "utf8");

describe("AI owner gate (source pins)", () => {
  test("POST /api/ai is session-gated and AI-spark metered (open to every tier)", () => {
    const src = read("../src/api/ai.ts");
    expect(src).toMatch(/router\.post\("\/", requireAuth/);
    expect(src).not.toMatch(/router\.post\("\/", requireAuth, requireOwnerEmail/);
    expect(src).toContain("consumeUserSlot");
  });

  test("POST /api/ai/guest requires a session AND an owner email", () => {
    const src = read("../src/api/ai-guest.ts");
    expect(src).toMatch(
      /router\.post\("\/", rateLimit, requireAuth, requireOwnerEmail/,
    );
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
    const src = readFileSync(
      path.resolve(__dirname, "../src/api/ai-generate.ts"),
      "utf8",
    );
    expect(src).not.toContain("requireOwnerEmail");
  });
});
