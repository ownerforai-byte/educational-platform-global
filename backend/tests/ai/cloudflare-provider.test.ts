import { describe, it, expect } from "vitest";
import { AIService } from "../../src/ai/service.js";

/**
 * Cloudflare Workers AI link in the backend provider chain.
 * Cloudflare's REST path needs an account id; the provider reuses R2_ACCOUNT_ID
 * (or CF_ACCOUNT_ID), so it only registers when a key AND an account are both
 * present — a bare cfut_ token alone must not build a dangling URL.
 */
describe("AIService provider registration — Cloudflare Workers AI link", () => {
  const SAVE = {
    CF_AI_KEY: process.env.CF_AI_KEY,
    CLOUDFLARE_API_KEY: process.env.CLOUDFLARE_API_KEY,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    CF_ACCOUNT_ID: process.env.CF_ACCOUNT_ID,
    AGNES_API_KEY: process.env.AGNES_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    AI_CHAIN_ORDER: process.env.AI_CHAIN_ORDER,
    AI_DEFAULT_PROVIDER: process.env.AI_DEFAULT_PROVIDER,
    AI_PROVIDER: process.env.AI_PROVIDER,
  };

  function clean() {
    delete process.env.CF_AI_KEY;
    delete process.env.CLOUDFLARE_API_KEY;
    delete process.env.R2_ACCOUNT_ID;
    delete process.env.CF_ACCOUNT_ID;
    delete process.env.AGNES_API_KEY;
    delete process.env.GROQ_API_KEY;
    delete process.env.AI_CHAIN_ORDER;
    delete process.env.AI_DEFAULT_PROVIDER;
    delete process.env.AI_PROVIDER;
  }

  function restore() {
    for (const [k, v] of Object.entries(SAVE)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }

  it("registers cloudflare when CF_AI_KEY + an account id are present", () => {
    clean();
    process.env.CF_AI_KEY = "cfut_testkey";
    process.env.R2_ACCOUNT_ID = "testacct";
    const svc = new AIService() as any;
    expect(svc.providers.has("cloudflare")).toBe(true);
    restore();
  });

  it("skips cloudflare when no account id is available (bare key)", () => {
    clean();
    process.env.CF_AI_KEY = "cfut_testkey";
    const svc = new AIService() as any;
    expect(svc.providers.has("cloudflare")).toBe(false);
    restore();
  });

  it("cloudflare provider builds an account-scoped REST URL", () => {
    clean();
    process.env.CF_AI_KEY = "cfut_testkey";
    process.env.CF_ACCOUNT_ID = "acct123";
    const svc = new AIService() as any;
    const cf = svc.providers.get("cloudflare");
    expect(cf.apiUrl).toBe(
      "https://api.cloudflare.com/client/v4/accounts/acct123/ai/v1/chat/completions"
    );
    restore();
  });

  it("cloudflare is reachable in the chain when ordered and registered", () => {
    clean();
    process.env.CF_AI_KEY = "cfut_testkey";
    process.env.R2_ACCOUNT_ID = "testacct";
    process.env.AI_CHAIN_ORDER = "cloudflare";
    const svc = new AIService() as any;
    expect(svc.getDefaultProvider()).toBe("cloudflare");
    restore();
  });
});
