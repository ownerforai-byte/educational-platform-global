import { describe, it, expect } from "vitest";
import { AIService } from "../../../src/ai/service.js";
import { FREE_LLM_NAMES } from "../../../src/ai/free-llm-providers.js";

describe("AIService provider registration & chain wiring", () => {
  const SAVE = {
    CEREBRAS_API_KEY: process.env.CEREBRAS_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    AGNES_API_KEY: process.env.AGNES_API_KEY,
    AI_CHAIN_ORDER: process.env.AI_CHAIN_ORDER,
    AI_DEFAULT_PROVIDER: process.env.AI_DEFAULT_PROVIDER,
  };

  function clean() {
    delete process.env.CEREBRAS_API_KEY;
    delete process.env.GEMINI_API_KEY;
    delete process.env.GROQ_API_KEY;
    delete process.env.AGNES_API_KEY;
    delete process.env.AI_CHAIN_ORDER;
    delete process.env.AI_DEFAULT_PROVIDER;
  }

  function restore() {
    for (const [k, v] of Object.entries(SAVE)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }

  it("registers cerebras and gemini providers when keys are set", () => {
    clean();
    process.env.CEREBRAS_API_KEY = "csk-test";
    process.env.GEMINI_API_KEY = "test-gemini-key";
    process.env.GROQ_API_KEY = "gsk-test";

    const svc = new AIService() as any;
    expect(svc.providers.has("cerebras")).toBe(true);
    expect(svc.providers.has("gemini")).toBe(true);
    expect(svc.providers.has("groq")).toBe(true);
    expect(svc.providers.has("internal")).toBe(true);
    restore();
  });

  it("orders providers according to AI_CHAIN_ORDER", () => {
    clean();
    process.env.CEREBRAS_API_KEY = "csk-test";
    process.env.GEMINI_API_KEY = "test-gemini-key";
    process.env.GROQ_API_KEY = "gsk-test";
    process.env.AI_CHAIN_ORDER = "groq,gemini,cerebras,internal";

    const svc = new AIService() as any;
    const chain = svc.chainProviders();
    const names = chain.map((p: any) => p.name);
    // The free-tier links are appended before the internal keyword engine:
    // free fallbacks never jump an explicitly ordered link, and internal stays
    // the last resort. WHICH free links register depends on the keys present in
    // the environment (LLM7.io and OVHcloud are keyless and always live), so
    // the invariant is asserted structurally instead of pinning today's list.
    expect(names.slice(0, 3)).toEqual(["groq", "gemini", "cerebras"]);
    expect(names[names.length - 1]).toBe("internal");

    const freeLinks = names.slice(3, -1);
    expect(freeLinks.length).toBeGreaterThan(0);
    for (const name of freeLinks) {
      expect(FREE_LLM_NAMES).toContain(name);
    }
    // Registry order is preserved, so a free link's position is deterministic.
    const indices = freeLinks.map((name) => FREE_LLM_NAMES.indexOf(name as never));
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
    // The two keyless free tiers are always usable, so they are always present.
    expect(freeLinks).toContain("llm7");
    expect(freeLinks).toContain("ovh");
    restore();
  });

  it("defaults to groq as primary when groq key is configured", () => {
    clean();
    process.env.GROQ_API_KEY = "gsk-test";
    process.env.AI_DEFAULT_PROVIDER = "groq";

    const svc = new AIService();
    expect(svc.getDefaultProvider()).toBe("groq");
    restore();
  });
});

