import { describe, expect, it } from "vitest";
import { KATEX_MACROS, normalizeMathDelimiters } from "@/lib/content/katex";

describe("normalizeMathDelimiters", () => {
  it("converts bracket display math to $$", () => {
    const input = "Consider \\$\\lim_{x \\to 0} x\\$ done";
    expect(normalizeMathDelimiters(input)).toBe(
      "Consider $$\\lim_{x \\to 0} x$$ done"
    );
  });

  it("converts parenthesis inline math to $", () => {
    const input = "value is \\(a^2 + b^2\\) here";
    expect(normalizeMathDelimiters(input)).toBe("value is $a^2 + b^2$ here");
  });

  it("handles multi-line bracket blocks", () => {
    const input = "\\$\n\\begin{pmatrix}\na & b\n\\end{pmatrix}\n\\$";
    const result = normalizeMathDelimiters(input);
    expect(result).toContain("$$");
    expect(result).toContain("\\begin{pmatrix}");
  });

  it("leaves inline code untouched", () => {
    const input = "use `\\(not math\\)` literally";
    expect(normalizeMathDelimiters(input)).toBe(input);
  });

  it("leaves code fences untouched", () => {
    const input = "```\n\\$x\\$\n```";
    expect(normalizeMathDelimiters(input)).toBe(input);
  });

  it("passes plain dollar math through unchanged", () => {
    const input = "$\\frac{1}{2}$ and $$\\int_0^1 x\\,dx$$";
    expect(normalizeMathDelimiters(input)).toBe(input);
  });
});

describe("KATEX_MACROS", () => {
  it("defines number set shortcuts", () => {
    expect(KATEX_MACROS["\\R"]).toBe("\\mathbb{R}");
    expect(KATEX_MACROS["\\N"]).toBe("\\mathbb{N}");
    expect(KATEX_MACROS["\\Z"]).toBe("\\mathbb{Z}");
  });
});
