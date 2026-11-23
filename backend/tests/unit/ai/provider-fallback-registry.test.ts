import { describe, expect, it } from "vitest";
import { FREE_LLM_NAMES, FREE_LLM_PROVIDERS } from "../../../src/ai/providers/free-llm-pool.js";

/**
 * PLATFORM_UPGRADE_MASTER_PLAN T1.4 — every named free-tier fallback in the
 * pool must have a registered OpenAI-compatible spec (golden coverage proxy).
 */
describe("free-tier provider fallback registry", () => {
  it("covers every FREE_LLM_NAMES entry in FREE_LLM_PROVIDERS", () => {
    const registered = new Set(FREE_LLM_PROVIDERS.map((spec) => spec.name));
    for (const name of FREE_LLM_NAMES) {
      expect(registered.has(name), `missing registry spec for ${name}`).toBe(true);
    }
    expect(FREE_LLM_PROVIDERS.length).toBe(FREE_LLM_NAMES.length);
  });
});