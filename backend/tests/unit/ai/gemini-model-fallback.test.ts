import { afterEach, describe, expect, it, vi } from "vitest";
import { AIService } from "../../../src/ai/service.js";
import { FREE_GEMINI_MODELS, getGeminiModelFallbacks } from "../../../src/ai/config.js";

/**
 * Gemini free-tier model fallback (owner report 2026-11-20: the Diagram Hub was
 * dead because gemini-3.8-flash returned 503 "currently experiencing high
 * demand" on every call). Google overloads one free model at a time while a
 * sibling answers normally, so the provider must walk the free chain instead of
 * failing the whole lane on a single pinned id.
 */
describe("Gemini free-model fallback", () => {
  const SAVE = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    DIAGRAM_GEMINI_API_KEY: process.env.DIAGRAM_GEMINI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL,
    DIAGRAM_GEMINI_MODEL: process.env.DIAGRAM_GEMINI_MODEL,
    AGNES_API_KEY: process.env.AGNES_API_KEY,
    AI_CHAIN_ORDER: process.env.AI_CHAIN_ORDER,
    AI_DEFAULT_PROVIDER: process.env.AI_DEFAULT_PROVIDER,
    AI_PROVIDER: process.env.AI_PROVIDER,
    DIAGRAM_HUB_DISABLED: process.env.DIAGRAM_HUB_DISABLED,
  };

  afterEach(() => {
    vi.unstubAllGlobals();
    for (const [k, v] of Object.entries(SAVE)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });

  function geminiService() {
    delete process.env.AGNES_API_KEY;
    delete process.env.AI_CHAIN_ORDER;
    delete process.env.AI_DEFAULT_PROVIDER;
    delete process.env.AI_PROVIDER;
    process.env.GEMINI_API_KEY = "gemini_test_key";
    return new AIService();
  }

  /** Minimal fetch stub recording which model each call hit. */
  function stubFetch(handler: (model: string) => Response) {
    const seen: string[] = [];
    vi.stubGlobal("fetch", (url: string) => {
      const model = /\/models\/([^:]+):/.exec(String(url))?.[1] ?? "?";
      seen.push(model);
      return Promise.resolve(handler(model));
    });
    return seen;
  }

  const ok = (text: string) =>
    new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text }] } }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  const unavailable = () =>
    new Response(JSON.stringify({ error: { message: "high demand" } }), { status: 503 });

  it("keeps the primary model out of its own fallback list", () => {
    expect(getGeminiModelFallbacks("gemini-3.5-flash")).not.toContain("gemini-3.5-flash");
    expect(getGeminiModelFallbacks("gemini-3.5-flash").length).toBe(FREE_GEMINI_MODELS.length - 1);
    expect(getGeminiModelFallbacks(undefined).length).toBe(FREE_GEMINI_MODELS.length - 1);
  });

  it("falls back to the next free model when one is 503 'high demand'", async () => {
    process.env.GEMINI_MODEL = "gemini-3.8-flash";
    const seen = stubFetch((model) => (model === "gemini-3.8-flash" ? unavailable() : ok("OK")));

    const service = geminiService();
    const answer = await service.chat("gemini", [{ role: "user", content: "hi" }]);

    expect(answer).toBe("OK");
    expect(seen[0]).toBe("gemini-3.8-flash");
    expect(seen.length).toBeGreaterThan(1); // it moved on
    expect(seen).not.toContain("gemini-3.8-flash".repeat(2));
  });

  it("remembers the model that answered so the next call skips the dead one", async () => {
    process.env.GEMINI_MODEL = "gemini-3.8-flash";
    const seen = stubFetch((model) => (model === "gemini-3.8-flash" ? unavailable() : ok("OK")));

    const service = geminiService();
    await service.chat("gemini", [{ role: "user", content: "one" }]);
    const firstRound = [...seen];
    const working = firstRound[firstRound.length - 1];

    seen.length = 0;
    await service.chat("gemini", [{ role: "user", content: "two" }]);

    expect(seen[0]).toBe(working); // starts on the model that worked
    expect(seen).not.toContain("gemini-3.8-flash");
  });

  it("fails fast on a bad key instead of walking the whole chain", async () => {
    process.env.GEMINI_MODEL = "gemini-3.8-flash";
    const seen = stubFetch(
      () =>
        new Response(JSON.stringify({ error: { message: "API key not valid" } }), {
          status: 400,
        }),
    );

    const service = geminiService();
    // A 400 is not a model outage: one attempt per call, no fallback walk.
    const answer = await service.tryChatProvider("gemini", [{ role: "user", content: "hi" }]);
    expect(answer).toBeNull();
    expect(seen.filter((m) => FREE_GEMINI_MODELS.includes(m)).length).toBe(1);
  });

  it("gives the Diagram Hub the same fallback chain", async () => {
    delete process.env.DIAGRAM_GEMINI_API_KEY; // shares the Gemini key
    process.env.DIAGRAM_GEMINI_MODEL = "gemini-3.8-flash";
    process.env.GEMINI_API_KEY = "gemini_test_key";
    delete process.env.DIAGRAM_HUB_DISABLED;

    const seen = stubFetch((model) => (model === "gemini-3.8-flash" ? unavailable() : ok("figure")));
    const service = new AIService();
    const answer = await service.tryChatProvider("diagram-hub", [{ role: "user", content: "hi" }]);

    expect(answer).toBe("figure");
    expect(seen).toContain("gemini-3.8-flash");
  });
});
