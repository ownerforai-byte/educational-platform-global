import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Regression: the OAuth provider pre-check used `settings.external?.google ===
 * true`, so ANY payload that omitted the key (different GoTrue versions,
 * partial settings) reported Google as disabled and blocked the redirect even
 * though Supabase had Google enabled. Only an explicit `false` may block.
 */

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://testproj.supabase.co");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
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
    stubSettings({ external: { google: true, facebook: false } });
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
      "https://testproj.supabase.co/auth/v1/settings",
      expect.objectContaining({
        headers: { apikey: "test-anon-key" },
        signal: expect.any(AbortSignal),
      }),
    );
  });
});
