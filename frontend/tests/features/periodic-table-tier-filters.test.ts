import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * PERIODIC TABLE FILTER TIERS
 * (owner 2026-10-27: "block all s,p,d,f block characteristics from member —
 * it is a plus feature; for members — metal, non-metal and metalloid filters
 * only").
 *
 * The tier split is enforced client-side (the session resolves in the
 * browser), so — same style as periodic-table-cee-gate.test.ts — we pin the
 * wiring at source level instead of rendering a session in jsdom.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

describe("Periodic table filter tiers", () => {
  it("nature opens at Member; the s/p/d/f block family stays at Plus", () => {
    const lib = read("lib/periodic-table.ts");
    expect(lib).toContain("nature: \"member\"");
    expect(lib).toContain("block: \"plus\"");
  });

  it("filters unlock by their tier rung — not by the Pro password gate", () => {
    const view = read("components/periodic-table/periodic-table-view.tsx");
    expect(view).toContain(
      "hasLevel(user, filterMinTier(cat)) || unlocked",
    );
    // The old shape (whole filter rail behind Pro-or-password) must not return.
    expect(view).not.toContain("plusTools && hasLevel(user, filterMinTier(cat))");
  });

  it("s/p/d/f characteristics (recolor + block explorer) gate at Plus", () => {
    const view = read("components/periodic-table/periodic-table-view.tsx");
    expect(view).toContain(
      'const blockTools = hasLevel(user, "plus") || unlocked;',
    );
    const explorer = view.indexOf("{blockTools && (");
    expect(explorer).toBeGreaterThan(-1);
    expect(view.indexOf("<BlockExplorer", explorer)).toBeGreaterThan(explorer);
  });
});
