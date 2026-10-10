import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  EXEMPT_PATHS,
  PUBLIC_PATHS,
  TOKEN_MATRIX,
  categoryForPath,
} from "@/features/credits/constants";

/**
 * Owner request (2026-10-05): "make the image hub under owner emails only".
 * Owner request (2026-10-06): "it is under coin gate of 5 coin but free for
 * owner and only for owner".
 *
 * The end state: /mind-studio is a coin-gated section priced at 5 coins
 * (imagehub tier) — owners open it free, and a non-owner's unlock is refused
 * client-side AND by the server, so the studio is owner-emails-only while the
 * library still shows its premium price. Source-level pins — the gate is
 * client-side (the session resolves in the browser), so we pin the wiring
 * instead of trying to render a session in jsdom.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

describe("Diagram Hub coin position — 5-coin tier, owner-only unlock", () => {
  it("resolves /mind-studio to the imagehub category at 5 coins", () => {
    expect(categoryForPath("/mind-studio")).toBe("imagehub");
    expect(categoryForPath("/mind-studio/")).toBe("imagehub");
    expect(TOKEN_MATRIX.imagehub.cost).toBe(5);
  });

  it("is neither public nor exempt — the coin gate must render the lock", () => {
    expect(PUBLIC_PATHS).not.toContain("/mind-studio");
    expect(EXEMPT_PATHS).not.toContain("/mind-studio");
  });

  it("the provider refuses non-owner unlocks before any coin moves", () => {
    const provider = read("features/credits/credit-provider.tsx");
    expect(provider).toContain('category === "imagehub"');
    expect(provider).toContain("isOwnerUser");
    expect(provider).toContain("reserved for owner accounts");
  });

  it("the server unlock route treats imagehub as owner-only and owner-free", () => {
    const src = read("../backend/src/api/user.ts");
    expect(src).toContain("imagehub: 5");
    expect(src).toMatch(/z\.enum\(\[[^\]]*"imagehub"[^\]]*\]\)/);
    expect(src).toContain('category === "imagehub"');
    expect(src).toContain("The Diagram Hub is reserved for owner accounts.");
    // Owner branch: cost 0 without touching the billing pool.
    expect(src).toMatch(
      /if \(category === "imagehub"\) \{[\s\S]*?!owner[\s\S]*?status\(403\)[\s\S]*?cost: 0/,
    );
  });
});

describe("Diagram Hub route layout — gate now owns the lock", () => {
  it("layout redirects signed-out visitors and no longer bounces non-owners", () => {
    const layout = read("app/(app)/mind-studio/layout.tsx");
    expect(layout).toContain('"use client"');
    expect(layout).toContain('"/login?next=/mind-studio"');
    // The 5-coin lock (RouteCreditGate) is the boundary for non-owners now —
    // the layout must not redirect them home.
    expect(layout).not.toContain('"/home"');
    expect(layout).not.toContain("isOwnerUser");
  });

  it("renders the hub as an owner page with account-saved history", () => {
    const page = read("app/(app)/mind-studio/page.tsx");
    expect(page).not.toContain("Every student's image studio");
    expect(page).toContain("Owner");
  });

  it("shows the home launcher inside the owner gate only", () => {
    const home = read("app/(app)/home/page.tsx");
    expect(home).toContain("<HomeMindStudio />");
    // The OwnerOnly helper itself still exists for the owner console.
    expect(read("features/auth/owner-only.tsx")).toContain("isOwnerUser(user)");

    // Every HomeMindStudio occurrence must sit inside an <OwnerOnly> block.
    const gates = home.match(/<OwnerOnly>[\s\S]*?<\/OwnerOnly>/g) ?? [];
    expect(gates.length).toBeGreaterThan(0);
    expect(gates.some((g) => g.includes("<HomeMindStudio />"))).toBe(true);
    // No bare launcher outside the gate.
    const stripped = home.replace(/<OwnerOnly>[\s\S]*?<\/OwnerOnly>/g, "");
    expect(stripped).not.toContain("<HomeMindStudio />");
  });
});

/**
 * Owner request 2026-10-07: "remove the word agnes, ai from it completely and
 * keep the name" — the studio is presented as Diagram Hub and no vendor name
 * reaches the owner anywhere in the surfaces that carry copy.
 *
 * A vendor name creeping back in is invisible to every behavioural test (the
 * hub still draws), so it is pinned here at the source, the same way the coin
 * position above is. The provider's wire values — the gateway URL, its model
 * ids, the AGNES_* env names — are deliberately NOT part of this: they are the
 * live contract with the deployed backend, and renaming them would break
 * drawing (owner decision, 2026-10-07).
 */
describe("Diagram Hub naming", () => {
  const VENDOR = /agnes/i;

  it("prices the category under the Diagram Hub label, with no vendor name or \"AI\"", () => {
    expect(TOKEN_MATRIX.imagehub.label).toBe("Diagram Hub (Drawing Studio)");
    expect(TOKEN_MATRIX.imagehub.label).not.toMatch(VENDOR);
    expect(TOKEN_MATRIX.imagehub.label).not.toMatch(/\bAI\b/);
  });

  it("names the hub Diagram Hub in the home launcher and the studio, never the vendor", () => {
    const launcher = read("components/home/home-mind-studio.tsx");
    expect(launcher).toContain("Diagram Hub");
    expect(launcher).not.toContain("Image Hub");
    expect(launcher).not.toMatch(VENDOR);

    const hub = read("features/image-hub/image-hub.tsx");
    expect(hub).toContain("Diagram Hub");
    expect(hub).not.toContain("Image Hub");
    expect(hub).not.toMatch(VENDOR);
  });

  it("keeps the vendor out of the copy the owner reads mid-draw and on failure", () => {
    const hub = read("features/image-hub/image-hub.tsx");
    // The live status line and the all-engines-failed message.
    expect(hub).toContain("Drawing with the server engine");
    expect(hub).toContain("Server engine unavailable — drawing in your browser");
    expect(hub).toContain("the figure writer and the server engine may be busy");
    expect(hub).not.toMatch(VENDOR);

    // The route metadata the browser tab and search results show.
    const page = read("app/(app)/mind-studio/page.tsx");
    expect(page).toContain('title: "Diagram Hub · Ravikisan\'s Platform"');
    expect(page).not.toMatch(VENDOR);
  });

  it("folds a saved row's raw model id into the hub's own badge wording", () => {
    const hub = read("features/image-hub/image-hub.tsx");
    // The ONLY thing that may map a stored engine label is pictureLabel, and it
    // returns the neutral name for anything that is not google/puter.
    expect(hub).toContain("function pictureLabel(");
    expect(hub).toMatch(/function pictureLabel\([\s\S]*?return SERVER_DRAW_LABEL;/);
  });
});
