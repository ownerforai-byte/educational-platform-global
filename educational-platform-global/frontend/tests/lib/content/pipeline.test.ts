import { describe, expect, it } from "vitest";
import { renderNoteHtml } from "@/lib/content/pipeline";

describe("renderNoteHtml — universal note pipeline", () => {
  it("renders plain markdown", () => {
    const html = renderNoteHtml("# Title\n\n**bold** and _italic_");
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>italic</em>");
  });

  it("renders GFM tables", () => {
    const html = renderNoteHtml("| Quantity | Unit |\n|---|---|\n| force | N |");
    expect(html).toContain("<table>");
    expect(html).toContain("<th>Quantity</th>");
    expect(html).toContain("<td>force</td>");
  });

  it("renders GFM strikethrough, task lists and autolinks", () => {
    const html = renderNoteHtml(
      "~~wrong~~\n\n- [x] done\n- [ ] todo\n\nhttps://example.com",
    );
    expect(html).toContain("<del>wrong</del>");
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('href="https://example.com"');
  });

  it("renders inline and display math via KaTeX", () => {
    const html = renderNoteHtml("Energy $E = mc^2$ and\n\n$$\\int_0^1 x\\,dx$$");
    expect(html).toMatch(/katex/);
    expect(html).not.toContain("$E");
  });

  it("supports bracket math delimiters", () => {
    const html = renderNoteHtml("Value \\(a^2\\) here");
    expect(html).toMatch(/katex/);
  });

  it("renders chemistry via mhchem \\ce{}", () => {
    const html = renderNoteHtml("$\\ce{H2O}$ and $\\ce{SO4^2-}$");
    expect(html).toMatch(/katex/);
    // errorColor from KATEX_OPTIONS only appears when a command is undefined
    expect(html).not.toContain('mathcolor="#ef4444"');
    expect(html).not.toContain("color:#ef4444");
  });

  it("syntax-highlights fenced code server-side", () => {
    const html = renderNoteHtml("```python\nv = u + at\n```");
    expect(html).toMatch(/hljs/);
  });

  it("keeps benign raw HTML from notes", () => {
    const html = renderNoteHtml("<h2>Heading</h2><p><b>keep</b></p>");
    expect(html).toContain("<h2>Heading</h2>");
    expect(html).toContain("<b>keep</b>");
  });

  it("strips dangerous raw HTML (scripts, handlers, javascript: URLs)", () => {
    const html = renderNoteHtml(
      '<script>alert(1)</script><img src="x" onclick="alert(1)"><a href="javascript:alert(1)">x</a>',
    );
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onclick");
    expect(html).not.toContain("javascript:");
  });

  it("leaves code fences untouched by delimiter normalization", () => {
    const html = renderNoteHtml("```\n\\[x\\]\n```");
    expect(html).toContain("\\[x\\]");
  });
});
