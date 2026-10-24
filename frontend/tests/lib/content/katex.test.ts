import { describe, expect, it } from "vitest";
import {
  KATEX_MACROS,
  normalizeLatexExpression,
  normalizeMathDelimiters,
  renderKatexHtml,
} from "@/lib/content/katex";
import { renderNoteHtml } from "@/lib/content/pipeline";

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

  it("repairs repeated command escaping inside math", () => {
    expect(normalizeMathDelimiters("$0^\\\\\\\\circ + \\\\theta$")).toBe(
      "$0^\\circ + \\theta$",
    );
  });
});

describe("normalizeLatexExpression", () => {
  it("preserves aligned row breaks", () => {
    const input = "\\begin{aligned}a&=b\\\\\nc&=d\\end{aligned}";
    expect(normalizeLatexExpression(input)).toBe(input);
  });

  it("repairs double-escaped inline math via renderKatexHtml", () => {
    const html = renderKatexHtml("\\\\theta + \\\\sin x");
    expect(html).toContain('class="katex"');
    expect(html).not.toContain("\\\\theta");
  });

  it("collapses double-escaped commands generically", () => {
    expect(normalizeLatexExpression("\\\\theta + \\\\sin x = \\\\pm 1")).toBe(
      "\\theta + \\sin x = \\pm 1",
    );
    expect(normalizeLatexExpression("\\\\vec{v} = \\\\hat{x} + \\\\hat{y}")).toBe(
      "\\vec{v} = \\hat{x} + \\hat{y}",
    );
    expect(normalizeLatexExpression("\\\\sum_{i=1}^{n} i^2")).toBe("\\sum_{i=1}^{n} i^2");
    expect(normalizeLatexExpression("\\\\approx \\\\pi")).toBe("\\approx \\pi");
  });
});

describe("renderNoteHtml — double-escaped math from JSON", () => {
  it("renders generic commands inside $ delimiters", () => {
    const html = renderNoteHtml("$\\\\vec{v} = \\\\hat{x} + \\\\hat{y}$");
    expect(html).toContain('class="katex"');
    expect(html).not.toMatch(/\\\\vec/);
  });
});

describe("KATEX_MACROS", () => {
  it("defines number set shortcuts", () => {
    expect(KATEX_MACROS["\\R"]).toBe("\\mathbb{R}");
    expect(KATEX_MACROS["\\N"]).toBe("\\mathbb{N}");
    expect(KATEX_MACROS["\\Z"]).toBe("\\mathbb{Z}");
  });
});
