import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AI_WORK_LANES,
  describeAiKeyStatus,
  getAgnesKey,
  getCerebrasKey,
  getCloudflareAiKey,
  getCloudflareAccountId,
  getGeminiKey,
  getGoogleCseCx,
  getGoogleCseKey,
  getGroqKey,
  getSearchEngineKeys,
  getWorkLaneKey,
  getWorkLaneProvider,
  hasAnyLlmKey,
  hasAnySearchEngine,
  isGoogleCseConfigured,
  isImageGenConfigured,
} from "../../src/ai/config";

/**
 * Central AI key resolver (plan.md §12 — M3): typed accessors over the
 * git-ignored env files, values never logged, missing keys degrade their
 * feature flags instead of throwing.
 */

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("AI key resolver", () => {
  it("returns trimmed keys and treats blanks as missing", () => {
    vi.stubEnv("AGNES_API_KEY", "  agnes-secret  ");
    vi.stubEnv("GROQ_API_KEY", "   ");
    expect(getAgnesKey()).toBe("agnes-secret");
    expect(getGroqKey()).toBeUndefined();
  });

  it("degrades feature flags when keys are absent", () => {
    vi.stubEnv("AGNES_API_KEY", "");
    vi.stubEnv("GROQ_API_KEY", "");
    vi.stubEnv("CF_AI_KEY", "");
    vi.stubEnv("CLOUDFLARE_API_KEY", "");
    expect(hasAnyLlmKey()).toBe(false);
    expect(isImageGenConfigured()).toBe(false);
  });

  it("accepts the Cloudflare legacy alias and R2 account fallback", () => {
    vi.stubEnv("CF_AI_KEY", "");
    vi.stubEnv("CLOUDFLARE_API_KEY", "cf-legacy");
    vi.stubEnv("CF_ACCOUNT_ID", "");
    vi.stubEnv("R2_ACCOUNT_ID", "r2-acct");
    expect(getCloudflareAiKey()).toBe("cf-legacy");
    expect(getCloudflareAccountId()).toBe("r2-acct");
  });

  it("google CSE needs BOTH key and cx", () => {
    vi.stubEnv("GOOGLE_CSE_API_KEY", "cse-key");
    vi.stubEnv("GOOGLE_CSE_CX", "");
    expect(isGoogleCseConfigured()).toBe(false);
    vi.stubEnv("GOOGLE_CSE_CX", "cx-id");
    expect(isGoogleCseConfigured()).toBe(true);
    expect(getGoogleCseKey()).toBe("cse-key");
    expect(getGoogleCseCx()).toBe("cx-id");
  });

  it("reports search-engine presence without leaking key material", () => {
    vi.stubEnv("TAVILY_API_KEY", "tavily-secret");
    vi.stubEnv("EXA_API_KEY", "");
    vi.stubEnv("FIRECRAWL_API_KEY", "");
    vi.stubEnv("JINA_API_KEY", "jina-secret");
    vi.stubEnv("YDC_API_KEY", "");

    expect(hasAnySearchEngine()).toBe(true);
    expect(getSearchEngineKeys().tavily).toBe("tavily-secret");

    const status = describeAiKeyStatus();
    expect(status.searchEngines).toEqual(["tavily", "jina"]);
    // The status report is boolean-only — it must never carry key values.
    expect(JSON.stringify(status)).not.toContain("secret");
  });
});

/**
 * One key per AI work type (owner 2026-10-25: "i want to add ai in the
 * platform widely, and one api key for one type … so no delays in work").
 * Each lane routes to its own provider key so parallel features never share
 * a rate limit, and an unconfigured lane degrades to the shared chain.
 */
describe("AI work-type lanes", () => {
  it("routes every work type to its dedicated provider", () => {
    expect(AI_WORK_LANES.chat).toBe("agnes");
    expect(AI_WORK_LANES["quiz-generate"]).toBe("cerebras");
    expect(AI_WORK_LANES.evaluate).toBe("gemini");
    expect(AI_WORK_LANES.math).toBe("cerebras");
    expect(AI_WORK_LANES["deep-dive"]).toBe("gemini");
    expect(AI_WORK_LANES["image-gen"]).toBe("agnes");
    expect(AI_WORK_LANES.figure).toBe("gemini");
    expect(AI_WORK_LANES.diagram).toBe("gemini");
    expect(AI_WORK_LANES.enhance).toBe("groq");
    expect(AI_WORK_LANES["history-search"]).toBe("groq");
    expect(AI_WORK_LANES.search).toBe("cloudflare");
  });

  it("uses the lane's own key when the provider is configured", () => {
    vi.stubEnv("CEREBRAS_API_KEY", "cerebras-secret");
    vi.stubEnv("GEMINI_API_KEY", "");
    expect(getWorkLaneProvider("quiz-generate")).toBe("cerebras");
    expect(getWorkLaneKey("quiz-generate")).toBe("cerebras-secret");
    // Gemini lane is unconfigured → falls back to the shared chain.
    expect(getWorkLaneProvider("evaluate")).toBe("");
    expect(getWorkLaneKey("evaluate")).toBeUndefined();
  });

  it("blanks are missing keys for lanes too", () => {
    vi.stubEnv("GEMINI_API_KEY", "   ");
    expect(getGeminiKey()).toBeUndefined();
    expect(getWorkLaneProvider("figure")).toBe("");
  });

  it("includes the new lane providers in the LLM presence flag", () => {
    vi.stubEnv("AGNES_API_KEY", "");
    vi.stubEnv("GROQ_API_KEY", "");
    vi.stubEnv("CF_AI_KEY", "");
    vi.stubEnv("CLOUDFLARE_API_KEY", "");
    vi.stubEnv("CEREBRAS_API_KEY", "");
    vi.stubEnv("GEMINI_API_KEY", "gemini-secret");
    expect(hasAnyLlmKey()).toBe(true);
    const status = describeAiKeyStatus();
    expect(status.llm.gemini).toBe(true);
    expect(status.llm.cerebras).toBe(false);
  });
});
