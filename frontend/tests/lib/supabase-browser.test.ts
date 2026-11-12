import { beforeEach, describe, expect, it, vi } from "vitest";
import { PUBLIC_SUPABASE_URL } from "@/lib/supabase/public-config";

/**
 * Regression: the OAuth provider pre-check used `settings.external?.google ===
 * true`, so ANY payload that omitted the key (different GoTrue versions,
 * partial settings) reported Google as disabled and blocked the redirect even
 * though Supabase had Google enabled. Only an explicit `false` may block.
 *
 * The URL is intentionally NOT stubbed: this test exercises the public-config
 * fallback in public-config.ts, which resolves to the real CSP project when the
 * env var is absent (the same value already inlined in the production bundle —
 * an anon key, not a secret). `fetch` is mocked below, so no network call is
 * ever made. Only the anon key is stubbed so the request-headers assertion
 * stays deterministic.
 */

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  // URL falls back to PUBLIC_SUPABASE_URL; only the anon key is pinned.
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key-stub");
});

async function loadBrowser() {
  return import("@/lib/supabase/browser");
}

function stubSettings(body: unknown, ok = true) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok, json: async () => body })),
  );
}

describe("isOAuthProviderEnabled", () => {
  it("returns true when Supabase reports google enabled", async () => {
    stubSettings({ external: { google: true } });
    const { isOAuthProviderEnabled } = await loadBrowser();
    expect(await isOAuthProviderEnabled("google")).toBe(true);
  });

  it("does not block Google when the provider key is missing", async () => {
    stubSettings({ external: {} });
    const { isOAuthProviderEnabled } = await loadBrowser();
    expect(await isOAuthProviderEnabled("google")).toBe(true);
  });

  it("does not block Google when the whole external object is missing", async () => {
    stubSettings({ disable_signup: false });
    const { isOAuthProviderEnabled } = await loadBrowser();
    expect(await isOAuthProviderEnabled("google")).toBe(true);
  });

  it("returns false only for an explicit disable", async () => {
    stubSettings({ external: { google: false } });
    const { isOAuthProviderEnabled } = await loadBrowser();
    expect(await isOAuthProviderEnabled("google")).toBe(false);
  });

  it("fails open when the settings request fails", async () => {
    stubSettings({}, false);
    const { isOAuthProviderEnabled } = await loadBrowser();
    expect(await isOAuthProviderEnabled("google")).toBe(true);
  });

  it("fails open when the settings request throws", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("network down"); }));
    const { isOAuthProviderEnabled } = await loadBrowser();
    expect(await isOAuthProviderEnabled("google")).toBe(true);
  });

  it("sends the anon key and an abort signal to the settings endpoint", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      json: async () => ({ external: { google: true } }),
    }));
    vi.stubGlobal("fetch", fetchMock);
    const { isOAuthProviderEnabled } = await loadBrowser();
    await isOAuthProviderEnabled("google");
    expect(fetchMock).toHaveBeenCalledWith(
      `${PUBLIC_SUPABASE_URL}/auth/v1/settings`,
      expect.objectContaining({
        headers: { apikey: "test-anon-key-stub" },
        signal: expect.any(AbortSignal),
      }),
    );
  });
});
