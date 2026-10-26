import { afterEach, describe, expect, it, vi } from "vitest";
import {
  describeAiKeyStatus,
  getAgnesKey,
  getCloudflareAiKey,
  getCloudflareAccountId,
  getGoogleCseCx,
  getGoogleCseKey,
  getGroqKey,
  getSearchEngineKeys,
  hasAnyLlmKey,
  hasAnySearchEngine,
  isGoogleCseConfigured,
  isImageGenConfigured,
} from "../src/ai/config";

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
