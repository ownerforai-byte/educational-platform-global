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

  it("keeps multi-line display bodies on their own $$ lines (aligned environments must parse)", () => {
    // Owner report 2026-10-27 ("step by step derivations… katex and latex
    // should work properly"): gluing "$$\begin{aligned}" onto one line breaks
    // remark-math's flow parser — the aligned environment is never opened and
    // every & and \\ inside renders as a KaTeX error. Multi-line bodies must
    // keep the $$ fences on their own lines.
    const input = "$$\\begin{aligned}\na &= 1 \\\\\nb &= 2\n\\end{aligned}$$";
    expect(normalizeMathDelimiters(input)).toBe(
      "$$\n\\begin{aligned}\na &= 1 \\\\\nb &= 2\n\\end{aligned}\n$$",
    );

    // The already-line-padded form survives unchanged.
    const padded = "$$\n\\begin{aligned}\na &= 1 \\\\\nb &= 2\n\\end{aligned}\n$$";
    expect(normalizeMathDelimiters(padded)).toBe(padded);

    // Single-line bodies stay compact.
    expect(normalizeMathDelimiters("$$x = 1$$")).toBe("$$x = 1$$");
  });

  it("renders multi-line aligned derivations without KaTeX errors", () => {
    const html = renderNoteHtml(
      "$$\n\\begin{aligned}\nv^2 &= u^2 + 2as \\\\\n\\Rightarrow s &= \\frac{v^2 - u^2}{2a}\n\\end{aligned}\n$$",
    );
    expect(html).toContain('class="katex"');
    expect(html).not.toContain("katex-error");
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
