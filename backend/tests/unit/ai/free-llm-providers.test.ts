import { describe, it, expect, vi, afterEach } from "vitest";
import { AIService } from "../../../src/ai/service.js";
import {
  FREE_LLM_PROVIDERS,
  configuredFreeLlmProviders,
  describeFreeLlmPresence,
} from "../../../src/ai/free-llm-providers.js";

/**
 * Free-tier fallback links taken from the awesome-free-llm-apis directory
 * (github.com/open-free-llm-api/awesome-free-llm-apis).
 *
 * Two invariants matter:
 *   · a provider with no key never registers (no dangling links), while
 *     LLM7.io's keyless tier always does — so a deployment with no LLM key
 *     still has a real model in front of the internal engine;
 *   · the free pool sits after the owner's explicit order and before
 *     `internal`, so it can never outrank a configured primary link.
 */
const FREE_AFFECTING_ENV = [
  "FREE_LLM_DISABLED",
  "FREE_LLM_TIMEOUT_MS",
  "FREE_LLM_MAX_OUTPUT_TOKENS",
  "LLM7_API_KEY",
  "LLM7_MODEL",
  "LLM7_API_URL",
  "OVH_AI_API_KEY",
  "OVHCLOUD_API_KEY",
  "OVH_MODEL",
  "OPENROUTER_API_KEY",
  "OPENROUTER_MODEL",
  "NIM_API_KEY",
  "NVIDIA_API_KEY",
  "NVIDIA_MODEL",
  "AGNES_API_KEY",
  "GROQ_API_KEY",
  "AI_CHAIN_ORDER",
  "AI_DEFAULT_PROVIDER",
];

function stubCleanEnv() {
  for (const name of FREE_AFFECTING_ENV) vi.stubEnv(name, "");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("free-tier provider registry", () => {
  it("every registry entry is an OpenAI-compatible provider with a model and docs link", () => {
    expect(FREE_LLM_PROVIDERS.length).toBeGreaterThan(0);
    for (const spec of FREE_LLM_PROVIDERS) {
      expect(spec.baseUrl).toMatch(/^https:\/\//);
      expect(spec.baseUrl.endsWith("/v1")).toBe(true);
      expect(spec.defaultModel.trim()).not.toBe("");
      expect(spec.envVars.length).toBeGreaterThan(0);
      expect(spec.docsUrl).toMatch(/^https:\/\//);
    }
  });

  it("registers the keyless links (LLM7 + OVHcloud) with zero keys configured", () => {
    stubCleanEnv();

    const live = configuredFreeLlmProviders().map((p) => p.spec.name);
    expect(live).toEqual(["llm7", "ovh"]);
    expect(describeFreeLlmPresence()).toEqual({
      live: ["llm7", "ovh"],
      keyless: ["llm7", "ovh"],
    });
  });

  it("defaults the NVIDIA NIM lane to the best free frontier model", () => {
    const nvidia = FREE_LLM_PROVIDERS.find((p) => p.name === "nvidia");
    expect(nvidia?.defaultModel).toBe("nvidia/nemotron-3-ultra-550b-a55b");
    // The retired default returned HTTP 410 Gone; it must never come back.
    expect(FREE_LLM_PROVIDERS.some((p) => p.defaultModel === "z-ai/glm-5.2")).toBe(false);
  });

  it("registers a keyed provider once its key is present (alias count too)", () => {
    stubCleanEnv();
    vi.stubEnv("OPENROUTER_API_KEY", "sk-or-test");
    vi.stubEnv("NIM_API_KEY", "nvapi-test");

    const live = configuredFreeLlmProviders();
    expect(live.map((p) => p.spec.name)).toEqual(["llm7", "ovh", "openrouter", "nvidia"]);
    expect(live.find((p) => p.spec.name === "openrouter")?.apiKey).toBe("sk-or-test");
  });

  it("FREE_LLM_DISABLED=1 keeps the whole pool out", () => {
    stubCleanEnv();
    vi.stubEnv("FREE_LLM_DISABLED", "1");
    vi.stubEnv("OPENROUTER_API_KEY", "sk-or-test");

    expect(configuredFreeLlmProviders()).toEqual([]);
    expect(describeFreeLlmPresence()).toEqual({ live: [], keyless: [] });
  });
});

describe("AIService registration — free-tier links", () => {
  it("registers llm7 and appends it before internal in the chain", () => {
    stubCleanEnv();
    vi.stubEnv("GROQ_API_KEY", "gsk-test");
    vi.stubEnv("AI_CHAIN_ORDER", "groq,internal");

    const svc = new AIService() as any;
    expect(svc.providers.has("llm7")).toBe(true);
    expect(svc.providers.has("ovh")).toBe(true);
    expect(svc.chainProviders().map((p: any) => p.name)).toEqual([
      "groq",
      "llm7",
      "ovh",
      "internal",
    ]);
  });

  it("does not register free links when the pool is disabled", () => {
    stubCleanEnv();
    vi.stubEnv("FREE_LLM_DISABLED", "true");
    vi.stubEnv("GROQ_API_KEY", "gsk-test");
    vi.stubEnv("AI_CHAIN_ORDER", "groq,internal");

    const svc = new AIService() as any;
    expect(svc.providers.has("llm7")).toBe(false);
    expect(svc.chainProviders().map((p: any) => p.name)).toEqual(["groq", "internal"]);
  });

  it("honours an explicitly ordered free link without duplicating it", () => {
    stubCleanEnv();
    vi.stubEnv("AI_CHAIN_ORDER", "llm7,internal");

    const svc = new AIService() as any;
    // llm7 keeps the position AI_CHAIN_ORDER gave it (never duplicated); the
    // remaining free links still follow it, ahead of internal.
    expect(svc.chainProviders().map((p: any) => p.name)).toEqual([
      "llm7",
      "ovh",
      "internal",
    ]);
  });
});

describe("OpenAICompatProvider transport", () => {
  it("sends no Authorization header for the keyless link and posts to /chat/completions", async () => {
    stubCleanEnv();
    const svc = new AIService() as any;
    const provider = svc.providers.get("llm7");

    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [{ message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const reply = await provider.chat([
      { role: "system", content: "Be brief." },
      { role: "user", content: "Say OK" },
    ]);

    expect(reply).toBe("OK");
    expect(provider.getLastFinishReason()).toBe("stop");
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.llm7.io/v1/chat/completions");
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBeUndefined();
    const body = JSON.parse(String(init.body));
    expect(body.model).toBe("gpt-oss:20b");
    expect(body.messages[0]).toEqual({ role: "system", content: "Be brief." });
  });

  it("sends a bearer token and the configured model when a key is set", async () => {
    stubCleanEnv();
    vi.stubEnv("OPENROUTER_API_KEY", "sk-or-test");
    vi.stubEnv("OPENROUTER_MODEL", "vendor/model:free");
    vi.stubEnv("FREE_LLM_MAX_OUTPUT_TOKENS", "1234");

    const svc = new AIService() as any;
    const provider = svc.providers.get("openrouter");

    const fetchMock = vi.fn(async () =>
      new Response(JSON.stringify({ choices: [{ message: { content: "hi" } }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await provider.chat([{ role: "user", content: "hello" }]);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://openrouter.ai/api/v1/chat/completions");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer sk-or-test");
    expect(JSON.parse(String(init.body)).model).toBe("vendor/model:free");
    expect(JSON.parse(String(init.body)).max_tokens).toBe(1234);
  });

  it("wires the NVIDIA key and default model into the transport", async () => {
    stubCleanEnv();
    vi.stubEnv("NVIDIA_API_KEY", "nvapi-test");

    const svc = new AIService() as any;
    const provider = svc.providers.get("nvidia");
    expect(provider).toBeTruthy();

    const fetchMock = vi.fn(async () =>
      new Response(
        JSON.stringify({
          choices: [{ message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const reply = await provider.chat([{ role: "user", content: "Say OK" }]);
    expect(reply).toBe("OK");
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://integrate.api.nvidia.com/v1/chat/completions");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer nvapi-test");
    expect(JSON.parse(String(init.body)).model).toBe("nvidia/nemotron-3-ultra-550b-a55b");
  });

  it("surfaces an HTTP failure with the provider label so the chain can fall through", async () => {
    stubCleanEnv();
    const svc = new AIService() as any;
    const provider = svc.providers.get("llm7");

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("rate limited", { status: 429 })),
    );

    await expect(provider.chat([{ role: "user", content: "hi" }])).rejects.toThrow(
      /LLM7\.io error: 429/,
    );
  });

  it("streams content deltas from an OpenAI-style SSE body", async () => {
    stubCleanEnv();
    const svc = new AIService() as any;
    const provider = svc.providers.get("llm7");

    const sse = [
      'data: {"choices":[{"delta":{"content":"Nep"}}]}',
      "",
      'data: {"choices":[{"delta":{"content":"al"}}]}',
      "",
      'data: {"choices":[{"delta":{},"finish_reason":"stop"}]}',
      "",
      "data: [DONE]",
      "",
    ].join("\n");

    vi.stubGlobal("fetch", vi.fn(async () => new Response(sse, { status: 200 })));

    let out = "";
    for await (const chunk of provider.chatStream([{ role: "user", content: "hi" }])) {
      out += chunk;
    }
    expect(out).toBe("Nepal");
    expect(provider.getLastFinishReason()).toBe("stop");
  });
});
