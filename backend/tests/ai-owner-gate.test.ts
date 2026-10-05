import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

/**
 * Owner request (2026-10-05): AI under owner emails only, like the Image Hub.
 * Source-level pins — the chat endpoints must carry `requireOwnerEmail`
 * (email allowlist, not role) after `requireAuth`, so students can neither
 * chat nor burn the platform key. The quiz generator stays open (students
 * keep /ai-quiz through /api/ai/generate-questions).
 */
const read = (p: string) => readFileSync(path.resolve(__dirname, p), "utf8");

describe("AI owner gate (source pins)", () => {
  test("POST /api/ai requires an owner email", () => {
    const src = read("../src/api/ai.ts");
    expect(src).toMatch(/router\.post\("\/", requireAuth, requireOwnerEmail/);
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
