import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ONE_DAY_MS = 86_400_000;

describe("community bot daily provider", () => {
  beforeEach(() => {
    vi.stubEnv("AGNES_API_KEY", "test-agnes");
    vi.stubEnv("GROQ_API_KEY", "test-groq");
    vi.stubEnv("FREE_LLM_DISABLED", "1");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("picks one pool member per UTC day without exposing keys", async () => {
    const day0 = 3 * ONE_DAY_MS;
    const mod = await import("../../src/ai/community-bot-daily-provider");
    const pool = mod.configuredCommunityBotProviderPool();
    expect(pool).toEqual(["agnes", "groq"]);
    const index0 = Math.floor(day0 / ONE_DAY_MS);
    const index1 = index0 + 1;
    expect(mod.getCommunityBotDailyProvider(day0)).toBe(pool[index0 % pool.length]);
    expect(mod.getCommunityBotDailyProvider(day0 + ONE_DAY_MS)).toBe(pool[index1 % pool.length]);
  });
});