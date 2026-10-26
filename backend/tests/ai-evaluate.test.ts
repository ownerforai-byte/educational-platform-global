import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

/**
 * AI evaluation route gates (source-level pins, plan.md §11.2).
 *
 * POST /api/ai/evaluate-answers grades writing-format submissions and must
 * sit behind the SAME access gates as the quiz generator — `rateLimit`,
 * `authOrGuestQuota` (signed-in credit pool / guest metered pool),
 * `creditGate` — with NO new gate and NO owner allowlist.
 */
const read = (p: string) => readFileSync(path.resolve(__dirname, p), "utf8");

describe("AI evaluate-answers route (source pins)", () => {
  test("is gated exactly like generate-questions — no new gate, no owner lock", () => {
    const src = read("../src/api/ai-evaluate.ts");
    expect(src).toMatch(/router\.post\(\s*"\/",\s*rateLimit,\s*authOrGuestQuota,\s*creditGate/);
    expect(src).not.toContain("requireOwnerEmail");
    // Reuses the generator's gates rather than re-implementing them.
    expect(src).toContain('from "./ai-generate"');
  });

  test("returns per-item score/verdict/feedback/modelAnswer/improvements + summary", () => {
    const src = read("../src/api/ai-evaluate.ts");
    expect(src).toContain("verdict");
    expect(src).toContain("modelAnswer");
    expect(src).toContain("improvements");
    expect(src).toContain("summary");
  });

  test("validates the format against the five quiz formats", () => {
    const src = read("../src/api/ai-evaluate.ts");
    expect(src).toContain("QUIZ_FORMATS");
  });

  test("generate-questions accepts format and keeps MCQ back-compat", () => {
    const src = read("../src/api/ai-generate.ts");
    expect(src).toContain("QUIZ_FORMATS");
    expect(src).toContain('format = "mcq"');
    // Per-format prompt builders exist for the four non-MCQ formats.
    expect(src).toContain("buildFormatSystemPrompt");
    expect(src).toContain("buildFormatUserPrompt");
  });

  test("evaluate-answers is registered before the /api/ai catch-all", () => {
    const src = read("../src/app.ts");
    expect(src).toContain('app.use("/api/ai/evaluate-answers", aiEvaluateRoutes)');
    const evaluateIdx = src.indexOf("/api/ai/evaluate-answers");
    const catchAllIdx = src.indexOf('app.use("/api/ai", aiRoutes)');
    expect(evaluateIdx).toBeGreaterThan(-1);
    expect(catchAllIdx).toBeGreaterThan(-1);
    expect(evaluateIdx).toBeLessThan(catchAllIdx);
  });
});
