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
    // KaTeX 0.18.4 includes errorColor in output when mhchem commands are used
    expect(html).toContain("katex");
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

/**
 * Images inside an AI reply (owner requirement 2026-09-30): "it must be able to
 * present images in its reply". The tutor embeds real image URLs from its web
 * grounding as `![caption](url)`, and every AI surface renders replies through
 * MathMarkdown -> renderNoteHtml, so the pictures must survive this pipeline.
 * (Styles: app/globals.css `.prose img` sizes and frames them.)
 */
describe("renderNoteHtml — images in an AI reply", () => {
  it("renders a real https image as an <img> inside the answer", () => {
    const html = renderNoteHtml(
      "The nephron filters blood.\n\n![Nephron structure — glomerulus, tubule and collecting duct](https://upload.wikimedia.org/nephron.png)\n\n*Figure: the functional unit of the kidney.*",
    );
    expect(html).toContain("<img");
    expect(html).toContain('src="https://upload.wikimedia.org/nephron.png"');
    expect(html).toContain('alt="Nephron structure — glomerulus, tubule and collecting duct"');
    // The caption stays with it, and the prose around it is untouched.
    expect(html).toContain("<em>Figure: the functional unit of the kidney.</em>");
    expect(html).toContain("The nephron filters blood.");
  });

  it("renders several images from one answer, each where it was written", () => {
    const html = renderNoteHtml(
      "Step 1 — the cell body.\n\n![Neuron cell body](https://example.edu/neuron-body.png)\n\nStep 2 — the synapse.\n\n![Synapse](https://example.edu/synapse.jpg)",
    );
    const imgs = html.match(/<img/g) ?? [];
    expect(imgs.length).toBe(2);
    expect(html).toContain("https://example.edu/neuron-body.png");
    expect(html).toContain("https://example.edu/synapse.jpg");
    expect(html.indexOf("Step 1")).toBeLessThan(html.indexOf("neuron-body.png"));
    expect(html.indexOf("neuron-body.png")).toBeLessThan(html.indexOf("Step 2"));
  });

  it("still refuses dangerous URLs and scripts in an image line", () => {
    const html = renderNoteHtml(
      '![x](javascript:alert(1))\n\n<img src="x" onerror="alert(1)">\n\n<script>alert(1)</script>',
    );
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("<script");
  });

  it("a data-URL image keeps its alt text but is never given a src", () => {
    // The sanitizer only allows http(s) image sources, so an inline data URL
    // cannot smuggle markup into the answer: the tag survives with no src, so
    // the browser has nothing to fetch and nothing to render.
    const html = renderNoteHtml("![inline](data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=)");
    expect(html).not.toContain("src=");
    expect(html).not.toContain("base64");
  });
});
