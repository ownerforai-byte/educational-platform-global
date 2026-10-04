import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config.mjs";

type Redirect = { source: string; destination: string; permanent?: boolean };

/**
 * Minimal Next-style redirect matcher: exact sources match the whole path,
 * `/:path*` sources match the base and every path below it, with the captured
 * tail substituted into the destination. First match wins, as in Next.
 */
function matchRedirect(pathname: string, redirects: Redirect[]): Redirect | undefined {
  for (const rule of redirects) {
    if (rule.source.endsWith("/:path*")) {
      const base = rule.source.slice(0, -"/:path*".length);
      if (pathname === base || pathname.startsWith(`${base}/`)) {
        const tail = pathname === base ? "" : pathname.slice(base.length + 1);
        return { ...rule, destination: rule.destination.replace(":path*", tail) };
      }
    } else if (rule.source === pathname) {
      return rule;
    }
  }
  return undefined;
}

async function redirects(): Promise<Redirect[]> {
  const config = nextConfig as { redirects?: () => Promise<Redirect[]> };
  return (await config.redirects?.()) ?? [];
}

describe("legacy note URL redirects", () => {
  it("forwards deep r-notes and ravikishan-notes paths to the notes index", async () => {
    const rules = await redirects();
    const cases: Array<[string, string]> = [
      ["/r-notes", "/notes"],
      ["/r-notes/physics/mechanics", "/notes"],
      ["/ravikishan-notes", "/notes"],
      ["/ravikishan-notes/class-12-notes/chemistry/chemical-kinetics", "/notes"],
    ];
    for (const [pathname, destination] of cases) {
      const hit = matchRedirect(pathname, rules);
      expect(hit, `${pathname} must be covered by a redirect`).toBeTruthy();
      expect(hit?.destination).toBe(destination);
    }
  });

  it("keeps the canonical migration pages out of the catch-all", async () => {
    const rules = await redirects();
    expect(matchRedirect("/r-notes-disabled", rules)).toBeUndefined();
    expect(matchRedirect("/ravikishan-notes-disabled", rules)).toBeUndefined();
  });

  it("keeps the class-11e / class-12e deep alias redirects intact", async () => {
    const rules = await redirects();
    expect(matchRedirect("/class-11e/chemistry/atomic-structure", rules)?.destination).toBe(
      "/class-11-notes/chemistry/atomic-structure",
    );
    expect(matchRedirect("/class-12-more/physics", rules)?.destination).toBe(
      "/class-12-notes/physics",
    );
  });
});
