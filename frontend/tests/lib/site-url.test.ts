import { describe, it, expect, vi, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { CANONICAL_SITE_URL, publicOrigin, publicUrl } from "@/lib/site-url";

/**
 * Owner request 2026-11-14: remove the Vercel application alias and keep
 * www.harindrasah.com.np everywhere. The host had no single owner — each surface resolved it separately, so a preview URL or a
 * missing env var changed the address on every surface at once. These tests pin
 * the one owner and forbid the drifting patterns from coming back.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

/** Runtime surfaces that must never resolve the host themselves. */
const SURFACES = [
  "lib/supabase/oauth-config.ts",
  "features/ai/prompts.ts",
  "lib/data-loader.ts",
  "app/(app)/resources/page.tsx",
  "features/lab/components/AnnotatedModelViewer.tsx",
  "features/auth/components/social-auth-buttons.tsx",
  "lib/firebase/client-auth.ts",
  "components/study/referrals-view.tsx",
  "features/profile/public-profile-shell.tsx",
  "features/community/community-board.tsx",
];

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("canonical site origin", () => {
  it("is always the stable HTTPS production alias", () => {
    expect(CANONICAL_SITE_URL).toBe("https://www.harindrasah.com.np");
  });

  it("is used for absolute links instead of whatever host the tab is on", () => {
    // jsdom runs on localhost, where the tab origin is deliberately kept so a
    // local share link stays reachable.
    expect(publicOrigin()).toBe(window.location.origin);
    expect(publicUrl("/lab")).toBe(`${window.location.origin}/lab`);
  });

  it("falls back to the alias on a deployed preview host", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://ravikisan-8f3a2c9b-ownerforai-byte.vercel.app");
    const fresh = await import("@/lib/site-url");
    expect(fresh.CANONICAL_SITE_URL).toBe("https://www.harindrasah.com.np");
  });

  it("accepts an HTTPS custom domain and normalises a trailing slash", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://study.harindrasah.com.np/");
    const fresh = await import("@/lib/site-url");
    expect(fresh.CANONICAL_SITE_URL).toBe("https://study.harindrasah.com.np");
    // jsdom is on localhost, so links stay on the tab origin even then.
    expect(fresh.publicUrl("sitemap.xml")).toBe(`${window.location.origin}/sitemap.xml`);
  });
});

describe("no surface resolves the host on its own", () => {
  it.each(SURFACES)("%s imports from lib/site-url", (file) => {
    expect(read(file)).toContain("@/lib/site-url");
  });

  it("does not re-introduce the drifting patterns", () => {
    // The AI prompt and sitemap used to read the raw env var directly.
    expect(read("features/ai/prompts.ts")).not.toContain("process.env.NEXT_PUBLIC_SITE_URL");
    // Local-only fallbacks made the deployed host depend on the open tab.
    expect(read("app/(app)/resources/page.tsx")).not.toContain("window.location.origin");
    expect(read("features/lab/components/AnnotatedModelViewer.tsx")).not.toContain(
      "${window.location.origin}",
    );
    expect(read("features/auth/components/social-auth-buttons.tsx")).not.toContain(
      "window.location.origin",
    );
  });
});
