import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Owner request (2026-10-05): AI under owner emails only, like the Image Hub.
 * Source-level pins — the /ai and /chat routes bounce non-owners, the widget
 * hides for non-owners, the nav marks every Veer chat entry owner-only, and
 * the coin-gate lists treat /ai + /chat as exempt owner surfaces.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

describe("AI owner gate", () => {
  it("gates /ai behind the owner allowlist", () => {
    const layout = read("app/(app)/ai/layout.tsx");
    expect(layout).toContain('"use client"');
    expect(layout).toContain("isOwnerUser");
    expect(layout).toContain('"/login?next=/ai"');
    expect(layout).toContain('"/home"');
  });

  it("gates /chat behind the owner allowlist", () => {
    const layout = read("app/(app)/chat/layout.tsx");
    expect(layout).toContain('"use client"');
    expect(layout).toContain("isOwnerUser");
    expect(layout).toContain('"/login?next=/chat"');
    expect(layout).toContain('"/home"');
  });

  it("hides the floating Veer launcher for non-owners", () => {
    const widget = read("components/layout/ai-widget.tsx");
    expect(widget).toContain("isOwnerUser(user)");
    expect(widget).toContain("return null");
  });

  it("marks every Veer chat nav entry owner-only but keeps the quiz public", () => {
    const nav = read("lib/navigation.ts");
    for (const href of ["/ai", "/chat", "/chat/nepali", "/chat/grammar", "/ai/tutor", "/ai/search"]) {
      expect(nav).toContain(`"${href}"`);
    }
    // Six owner-only chat entries, quiz untouched.
    const ownerFlags = nav.match(/ownerOnly: true/g) ?? [];
    expect(ownerFlags.length).toBeGreaterThanOrEqual(6);
  });

  it("filters owner-only items in both menu surfaces", () => {
    const sidebar = read("components/layout/sidebar-navigation.tsx");
    const drawer = read("components/layout/mobile-nav.tsx");
    expect(sidebar).toContain("item.ownerOnly");
    expect(drawer).toContain("item.ownerOnly");
  });

  it("treats /ai + /chat as exempt owner surfaces, never public", () => {
    const constants = read("features/credits/constants.ts");
    expect(constants).toContain('"/ai"');
    expect(constants).toContain('"/chat"');
    const publicBlock = constants.match(/PUBLIC_PATHS = \[[\s\S]*?\] as const/)?.[0] ?? "";
    expect(publicBlock).not.toContain('"/ai"');
    expect(publicBlock).not.toContain('"/chat"');
    expect(publicBlock).toContain('"/ai-quiz"');
  });

  it("hides the directory Veer entry for non-owners", () => {
    const card = read("features/credits/directory-card.tsx");
    expect(card).toContain("ownerOnly: true");
    expect(card).toContain("portal.ownerOnly");
  });
});
