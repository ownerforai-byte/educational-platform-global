import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * Owner 2026-11-21: "for that one prompt all models activated and do their work
 * and finally it is represented by one". ensembleChat is that fan-out: every
 * configured lane answers in parallel and ONE synthesizer merges the drafts.
 */

const CLEAN = [
  "AGNES_API_KEY",
  "GROQ_API_KEY",
  "GEMINI_API_KEY",
  "CEREBRAS_API_KEY",
  "CLOUDFLARE_AI_TOKEN",
  "AI_CHAIN_ORDER",
  "FREE_LLM_DISABLED",
];

function stubCleanEnv() {
  for (const key of CLEAN) vi.stubEnv(key, "");
}

/** A provider stub that records the messages it was handed. */
function lane(name: string, text: string, seen?: { messages: unknown[] }) {
  return {
    name,
    chat: async (messages: unknown[]) => {
      if (seen) seen.messages = messages;
      return text;
    },
    chatStream: async function* () {
      yield text;
    },
    search: async () => ({ results: [] }),
  };
}

describe("AIService.ensembleChat", () => {
  beforeEach(() => stubCleanEnv());
  afterEach(() => vi.unstubAllEnvs());

  it("asks every lane, then lets the reasoning lane merge them into one answer", async () => {
    const { AIService } = await import("../../../src/ai/service.js");
    const svc = new AIService() as any;

    const editor = { messages: [] as unknown[] };
    svc.providers.clear();
    svc.providers.set("alpha", lane("alpha", "DRAFT FROM ALPHA"));
    svc.providers.set("beta", lane("beta", "DRAFT FROM BETA"));
    // The editor must receive the requested messages PLUS every draft.
    svc.providers.set("zai", lane("zai", "MERGED ANSWER", editor));

    const out = await svc.ensembleChat([{ role: "user", content: "draw the heart" }]);

    expect(out).toBe("MERGED ANSWER");
    const mergeText = JSON.stringify(editor.messages);
    expect(mergeText).toContain("DRAFT FROM ALPHA");
    expect(mergeText).toContain("DRAFT FROM BETA");
    expect(mergeText).toContain("draw the heart");
    expect(mergeText).toContain("Merge them into ONE final answer");
  });

  it("returns the single answer when only one lane responds", async () => {
    const { AIService } = await import("../../../src/ai/service.js");
    const svc = new AIService() as any;

    svc.providers.clear();
    svc.providers.set("alpha", lane("alpha", "ONLY ANSWER"));
    svc.providers.set("beta", {
      ...lane("beta", ""),
      chat: async () => {
        throw new Error("beta is down");
      },
    });

    await expect(svc.ensembleChat([{ role: "user", content: "x" }], { timeoutMs: 40 })).resolves.toBe("ONLY ANSWER");
  });

  it("returns an empty string when every lane fails, so callers still draw", async () => {
    const { AIService } = await import("../../../src/ai/service.js");
    const svc = new AIService() as any;

    svc.providers.clear();
    svc.providers.set("alpha", {
      ...lane("alpha", ""),
      chat: async () => {
        throw new Error("down");
      },
    });

    await expect(svc.ensembleChat([{ role: "user", content: "x" }], { timeoutMs: 40 })).resolves.toBe("");
  });

  it("keeps the longest draft when the merger fails", async () => {
    const { AIService } = await import("../../../src/ai/service.js");
    const svc = new AIService() as any;

    // Every lane drafts once, then every lane also fails as an editor, so the
    // merge chain is exhausted and the longest draft must survive.
    const draftsThenDead = (name: string, draft: string) => {
      let calls = 0;
      return {
        ...lane(name, draft),
        chat: async () => {
          calls += 1;
          if (calls > 1) throw new Error("editor down");
          return draft;
        },
      };
    };
    svc.providers.clear();
    svc.providers.set("alpha", draftsThenDead("alpha", "short"));
    svc.providers.set("beta", draftsThenDead("beta", "a much longer draft answer"));
    svc.providers.set("zai", draftsThenDead("zai", ""));

    await expect(svc.ensembleChat([{ role: "user", content: "x" }], { timeoutMs: 40 })).resolves.toBe(
      "a much longer draft answer",
    );
  });
});
