import { describe, expect, it } from "vitest";
import { renderNoteHtml } from "@/lib/content/pipeline";
import {
  MAX_SVG_CHARS,
  captionFromMeta,
  ensureViewBox,
  extractVisual,
  hasForbiddenConstruct,
} from "@/lib/content/visuals";

/** A minimal, valid figure of the shape the prompt asks for. */
const DRAWING = `<svg viewBox="0 0 200 120">
  <rect x="10" y="10" width="180" height="100" fill="none" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="20" y1="100" x2="180" y2="20" stroke="#ef4444" stroke-width="2"/>
  <text x="100" y="112" font-size="11" text-anchor="middle">principal axis</text>
</svg>`;

const fence = (body: string, info = "svg") => "```" + info + "\n" + body + "\n```";

describe("extractVisual — the guard", () => {
  it("accepts a plain drawing and keeps it whole", () => {
    const visual = extractVisual(DRAWING);
    expect(visual).not.toBeNull();
    expect(visual!.svg).toContain("<line");
    expect(visual!.svg).toContain("stroke-width");
  });

  it("refuses anything that is not exactly one svg drawing", () => {
    expect(extractVisual("const a = 1;")).toBeNull();
    // Prose around the drawing would mean truncating the figure to render it.
    expect(extractVisual(`${DRAWING}\nHere is the diagram.`)).toBeNull();
    expect(extractVisual(`<svg viewBox="0 0 10 10"><rect x="0"/>`)).toBeNull();
    expect(extractVisual("   ")).toBeNull();
  });

  it("refuses execution, styling and fetch constructs", () => {
    const poisoned = [
      `<svg viewBox="0 0 10 10"><script>alert(1)</script></svg>`,
      `<svg viewBox="0 0 10 10" onload="alert(1)"><rect x="0" y="0"/></svg>`,
      `<svg viewBox="0 0 10 10"><style>rect{display:none}</style><rect/></svg>`,
      `<svg viewBox="0 0 10 10"><foreignObject><div>x</div></foreignObject></svg>`,
      `<svg viewBox="0 0 10 10"><image href="https://evil.test/a.png"/></svg>`,
      `<svg viewBox="0 0 10 10"><use href="https://evil.test/a.svg#x"/></svg>`,
      `<svg viewBox="0 0 10 10"><a href="javascript:alert(1)"><text x="1" y="1">x</text></a></svg>`,
      `<svg viewBox="0 0 10 10"><iframe src="https://evil.test"/></svg>`,
    ];
    for (const svg of poisoned) {
      expect(hasForbiddenConstruct(svg)).toBe(true);
      expect(extractVisual(svg)).toBeNull();
    }
  });

  it("refuses id references, which sanitizer clobbering would break", () => {
    // rehype-sanitize prefixes every id, so url(#…) would point at nothing and
    // the figure would render with a missing arrowhead or fill. Rejected up
    // front rather than silently mis-drawn.
    const gradient = `<svg viewBox="0 0 10 10"><defs><linearGradient id="g"><stop offset="0"/></linearGradient></defs><rect fill="url(#g)"/></svg>`;
    expect(extractVisual(gradient)).toBeNull();
  });

  it("refuses an oversized drawing", () => {
    const huge = `<svg viewBox="0 0 10 10"><path d="${"L1 1".repeat(MAX_SVG_CHARS / 3)}"/></svg>`;
    expect(extractVisual(huge)).toBeNull();
  });
});

describe("extractVisual — normalisation", () => {
  it("adds a viewBox so the drawing can scale", () => {
    expect(ensureViewBox(`<svg><rect/></svg>`)).toContain('viewBox="0 0 640 400"');
    expect(ensureViewBox(`<svg width="300" height="150"><rect/></svg>`)).toContain(
      'viewBox="0 0 300 150"',
    );
  });

  it("repairs the lowercase attribute spelling browsers ignore", () => {
    expect(ensureViewBox(`<svg viewbox="0 0 80 40"><rect/></svg>`)).toContain('viewBox="0 0 80 40"');
  });

  it("keeps a viewBox the drawing already has", () => {
    expect(ensureViewBox(DRAWING)).toContain('viewBox="0 0 200 120"');
  });

  it("reads the caption from the fence line and cleans it", () => {
    expect(captionFromMeta('"Refraction through a prism"')).toBe("Refraction through a prism");
    expect(captionFromMeta("Refraction through a prism.")).toBe("Refraction through a prism");
    expect(captionFromMeta("")).toBe("");
    expect(captionFromMeta(null)).toBe("");
  });

  it("labels the figure for screen readers", () => {
    const visual = extractVisual(DRAWING, "A ray bending");
    expect(visual!.svg).toContain('role="img"');
    expect(visual!.svg).toContain('aria-label="A ray bending"');
    expect(visual!.svg).toContain("<title>A ray bending</title>");
  });

  it("does not double up attributes the model already wrote", () => {
    const visual = extractVisual(
      `<svg viewBox="0 0 10 10" role="img" aria-label="given"><title>given</title><rect/></svg>`,
      "different",
    );
    expect(visual!.svg.match(/role=/g)?.length).toBe(1);
    expect(visual!.svg.match(/aria-label=/g)?.length).toBe(1);
    expect(visual!.svg.match(/<title>/g)?.length).toBe(1);
  });
});

describe("renderNoteHtml — a drawing reaches the page", () => {
  it("renders a fenced svg as a real inline figure", () => {
    const html = renderNoteHtml(fence(DRAWING, "svg Principal axis"));
    expect(html).toContain('class="edu-visual"');
    expect(html).toContain("<figure");
    expect(html).toContain("<svg");
    expect(html).toContain("<line");
    expect(html).toContain("<text");
    // The kebab-case attributes a browser needs survive the round trip.
    expect(html).toContain('stroke-width="2"');
    expect(html).toContain("viewBox");
  });

  it("carries the fence caption through as a figcaption", () => {
    const html = renderNoteHtml(fence(DRAWING, "svg Principal axis"));
    expect(html).toContain("<figcaption");
    expect(html).toContain("Principal axis");
  });

  it("renders the drawing inside a callout box too", () => {
    const html = renderNoteHtml(`:::trick Ray diagram\n${fence(DRAWING)}\n:::`);
    expect(html).toContain("edu-callout");
    expect(html).toContain("<svg");
  });

  it("leaves a non-drawing svg fence as highlighted code", () => {
    const html = renderNoteHtml(fence("svg { fill: red }", "css"));
    expect(html).not.toContain("edu-visual");
    expect(html).toContain("<code");
  });

  it("falls back to code when the drawing is poisoned", () => {
    const html = renderNoteHtml(
      fence(`<svg viewBox="0 0 10 10"><script>alert(1)</script><rect/></svg>`),
    );
    // Shown as source the student can read — never as a half-drawn figure and
    // never as executable markup.
    expect(html).not.toContain("edu-visual");
    expect(html).not.toContain("<script>");
    expect(html).toContain("<pre><code");
    expect(html).toMatch(/svg/);
  });

  it("strips anything forbidden that slipped past the fence", () => {
    // Defence in depth: the same constructs in raw authored HTML are sanitized
    // even though no figure wrapper is involved.
    const html = renderNoteHtml(
      `<svg viewBox="0 0 10 10" onload="alert(1)"><script>x</script><image href="https://evil.test/a.png"/><rect width="4" height="4" fill-opacity="0.4"/></svg>`,
    );
    expect(html).not.toContain("onload");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("evil.test");
    expect(html).toContain("fill-opacity");
  });
});
