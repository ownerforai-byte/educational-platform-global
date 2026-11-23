import { describe, expect, it } from "vitest";
import { SEMANTIC_COLORS, TYPE_SCALE_VARS } from "@/lib/design-tokens";

describe("design tokens", () => {
  it("maps semantic colors to hsl CSS variables", () => {
    for (const value of Object.values(SEMANTIC_COLORS)) {
      expect(value).toMatch(/^hsl\(var\(--/);
    }
  });

  it("lists the modular type scale variables", () => {
    expect(TYPE_SCALE_VARS[0]).toBe("--type-scale-00");
    expect(TYPE_SCALE_VARS.at(-1)).toBe("--type-scale-13");
  });
});