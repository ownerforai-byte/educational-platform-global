import { describe, it, expect } from "vitest";
import { PLATFORM_SYSTEM_PROMPT } from "@/lib/ai/prompts";

describe("PLATFORM_SYSTEM_PROMPT — step cards", () => {
  it("teaches the steps fence and its heading format", () => {
    expect(PLATFORM_SYSTEM_PROMPT).toContain("STEP CARDS — THE steps FENCE");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("whose language is steps");
    expect(PLATFORM_SYSTEM_PROMPT).toContain("heading line that starts with three hash marks");
  });

  it("keeps the step clause before the run-fence rule", () => {
    const stepAt = PLATFORM_SYSTEM_PROMPT.indexOf("STEP CARDS");
    const runAt = PLATFORM_SYSTEM_PROMPT.indexOf("ON-SCREEN ARTEFACTS");
    expect(stepAt).toBeGreaterThan(-1);
    expect(runAt).toBeGreaterThan(stepAt);
  });
});
