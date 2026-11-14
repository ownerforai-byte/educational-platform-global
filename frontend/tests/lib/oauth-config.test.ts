import { describe, it, expect, vi, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { PUBLIC_SUPABASE_URL } from "@/lib/supabase/public-config";
import {
  APP_OAUTH_CALLBACK_URL,
  CANONICAL_SITE_URL,
  SUPABASE_AUTH_CALLBACK_URL,
  isOAuthAccessBlocked,
  oauthAccessBlockedMessage,
  oauthCallbackUrl,
} from "@/lib/supabase/oauth-config";

/**
 * Owner request 2026-11-08: "continue with google is not working ... saying
 * access is blocked --- wire it to the right place". Google blocks any OAuth
 * request whose redirect URI is not registered. These tests pin the ONE
 * canonical callback and the actionable diagnostic.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("OAuth callback wiring", () => {
  it("exports the exact URLs the Google / Supabase dashboards need", () => {
    expect(SUPABASE_AUTH_CALLBACK_URL).toBe(`${PUBLIC_SUPABASE_URL}/auth/v1/callback`);
    expect(CANONICAL_SITE_URL).toMatch(/^https:\/\//);
    expect(APP_OAUTH_CALLBACK_URL).toBe(`${CANONICAL_SITE_URL}/auth/callback`);
  });

  it("keeps local development on its own origin", () => {
    // jsdom runs on localhost, so the callback must remain reachable locally.
    expect(oauthCallbackUrl()).toBe(`${window.location.origin}/auth/callback`);
  });

  it("uses the configured HTTPS origin as the single production callback", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://study.example.edu.np/");
    const fresh = await import("@/lib/supabase/oauth-config");
    expect(fresh.CANONICAL_SITE_URL).toBe("https://study.example.edu.np");
    expect(fresh.APP_OAUTH_CALLBACK_URL).toBe("https://study.example.edu.np/auth/callback");
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("ignores a localhost NEXT_PUBLIC_SITE_URL so production never bounces to it", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:5173");
    const fresh = await import("@/lib/supabase/oauth-config");
    expect(fresh.CANONICAL_SITE_URL).toMatch(/^https:\/\//);
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  // 2026-11-11 regression: a pruned Vercel preview URL was baked into the
  // production bundle and every Google login hit DEPLOYMENT_NOT_FOUND.
  it.each([
    "https://ravikisan-84i5u61il-ownerforai-byte.vercel.app/",
    "https://ravikisan-git-main-ownerforai-byte.vercel.app",
    "https://some-other-project.vercel.app",
  ])("rejects ephemeral Vercel preview host %s", async (siteUrl) => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", siteUrl);
    const fresh = await import("@/lib/supabase/oauth-config");
    expect(fresh.CANONICAL_SITE_URL).toBe("https://www.harindrasah.com.np");
    expect(fresh.APP_OAUTH_CALLBACK_URL).toBe("https://www.harindrasah.com.np/auth/callback");
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("still allows a custom production domain", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://study.harindrasah.com.np/");
    const fresh = await import("@/lib/supabase/oauth-config");
    expect(fresh.CANONICAL_SITE_URL).toBe("https://study.harindrasah.com.np");
    vi.unstubAllEnvs();
    vi.resetModules();
  });
});

describe("Google 'Access blocked' diagnosis", () => {
  it("recognises blocked / redirect / origin errors, but not a real cancellation", () => {
    expect(isOAuthAccessBlocked({ message: "access_denied Access blocked: This app's request is invalid" })).toBe(true);
    expect(isOAuthAccessBlocked(new Error("redirect_uri_mismatch"))).toBe(true);
    expect(isOAuthAccessBlocked(new Error("OAuth sign-in is not allowed from this origin"))).toBe(true);
    expect(isOAuthAccessBlocked({ code: "validation_failed" })).toBe(true);
    expect(isOAuthAccessBlocked(new Error("Sign-in was cancelled."))).toBe(false);
  });

  it("names both URLs that must be registered", () => {
    const message = oauthAccessBlockedMessage("Google");
    expect(message).toContain(SUPABASE_AUTH_CALLBACK_URL);
    expect(message).toContain(APP_OAUTH_CALLBACK_URL);
    expect(message).toContain("Google Cloud Console");
  });

  it("wires both OAuth ends to the canonical helper", () => {
    expect(read("features/auth/components/social-auth-buttons.tsx")).toContain("oauthCallbackUrl()");
    expect(read("features/auth/components/social-auth-buttons.tsx")).not.toContain('new URL("/auth/callback"');
    expect(read("app/auth/callback/page.tsx")).toContain("authFailureMessage");
  });
});
