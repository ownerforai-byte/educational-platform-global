import type { Plugin } from "unified";
import type { Code, Root, RootContent } from "mdast";

/**
 * MODEL-DRAWN VISUALS — a fenced `svg` block becomes a real picture.
 *
 * Owner request (2026-09-30): "it should create visuals on screen with the help
 * of codes". The tutor (Agnes, which writes code well) answers with a fenced
 * block whose language is `svg`; this plugin turns that block into an inline
 * figure, so the student SEES the ray diagram, the circuit, the free-body
 * arrows, the cell or the plotted curve instead of reading a description of it.
 *
 * Why SVG and not a charting/runtime language: an SVG drawing is static markup.
 * Nothing is executed — not by the server, not by the browser — so the platform
 * gains diagrams without gaining an execution surface. The note pipeline's
 * existing trust order still holds: the drawing is parsed by the raw pass, then
 * SANITIZED against the allowlist below, and only then rendered. A drawing that
 * uses a construct we do not allow is dropped here and falls back to an
 * ordinary code block, so the student sees exactly what the model wrote rather
 * than a half-stripped figure.
 *
 * Syntax (the caption is optional and lives on the fence line):
 *
 *     ```svg Refraction through a glass prism
 *     <svg viewBox="0 0 640 360"> … </svg>
 *     ```
 *
 * Rules the guard enforces, and why each one exists:
 *
 *   · the block must be exactly one `<svg>…</svg>` drawing (nothing after it),
 *     capped in size and element count so one answer cannot ship a megabyte of
 *     path data;
 *   · no scripting, no styling, no foreignObject, no external fetches
 *     (`<script>`, `<style>`, inline `on*=` handlers, `javascript:`, `<use>`,
 *     `<image>`, `<iframe>`/`<object>`/`<embed>`, `<a>`) — the same constructs
 *     a sanitizer would strip, rejected up front so a stripped figure is never
 *     mistaken for a complete one;
 *   · no `<defs>` / gradients / markers / clip paths / masks, because
 *     rehype-sanitize prefixes every `id` (clobber protection) and would leave
 *     `url(#…)` references pointing at nothing. Shading is done with
 *     translucent flat fills and arrowheads are drawn as polygons instead.
 *     See SVG_SANITIZE_* below, which is the machine-checkable half of this.
 */

/** Fence languages that mean "draw this" (aliases: `diagram`, `figure`). */
export const VISUAL_FENCE_LANGS = new Set(["svg", "diagram", "figure"]);

/**
 * True when a fence language means "draw this". Beyond the plain aliases the
 * tutor paints a `figure/<name>.svg` fence — the language it is told to use for
 * short academically precise figures — so any `figure/…` or `*.svg` language is
 * a drawing too. Anything else still renders as source code.
 */
export function isVisualFenceLang(lang: string | null | undefined): boolean {
  const clean = (lang ?? "").trim().toLowerCase();
  if (!clean) return false;
  return VISUAL_FENCE_LANGS.has(clean) || clean.startsWith("figure/") || clean.endsWith(".svg");
}

/** Longest drawing accepted, in characters. */
export const MAX_SVG_CHARS = 40_000;

/** Longest drawing accepted, in `<` characters (a cheap element count). */
export const MAX_SVG_ELEMENTS = 900;

/** Longest caption accepted, in characters. */
export const MAX_CAPTION_CHARS = 160;

export const VISUAL_CLASS = "edu-visual";
export const CAPTION_CLASS = "edu-visual__caption";

/**
 * Constructs the guard refuses. Deliberately conservative: each entry is either
 * an execution vector, a network fetch, or a reference that the sanitizer's id
 * clobbering would break — all of which would make the figure wrong rather than
 * merely plainer.
 */
const FORBIDDEN = [
  /<script/i,
  /<style/i,
  /<foreignObject/i,
  /<iframe/i,
  /<object/i,
  /<embed/i,
  /<image/i,
  /<use\b/i,
  /<a\b/i,
  /<defs/i,
  /<marker/i,
  /<linearGradient/i,
  /<radialGradient/i,
  /<pattern/i,
  /<clipPath/i,
  /<mask/i,
  /<animate/i,
  /url\(\s*#/i,
  /javascript:/i,
  /data:text\/html/i,
  /\son[a-z]+\s*=/i,
];

/**
 * SVG elements the renderer keeps. Shape, group and text primitives only —
 * enough for every Class 11/12 figure (apparatus, circuits, ray diagrams,
 * anatomy, cycles, plots, free-body arrows).
 */
export const SVG_SANITIZE_TAGS = [
  "svg",
  "g",
  "title",
  "desc",
  "path",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "text",
  "tspan",
];

/**
 * SVG attributes the renderer keeps, written as hast PROPERTY names (camelCase)
 * because that is what `hast-util-sanitize` matches against — note the
 * irregular ones it actually produces: `strokeDashArray`, `strokeLineCap`,
 * `strokeDashOffset`, `preserveAspectRatio`, `dominantBaseline`.
 */
const PAINT = [
  "fill",
  "fillOpacity",
  "fillRule",
  "stroke",
  "strokeWidth",
  "strokeOpacity",
  "strokeLineCap",
  "strokeLineJoin",
  "strokeDashArray",
  "strokeDashOffset",
  "strokeMiterLimit",
  "opacity",
  "transform",
  "vectorEffect",
];

const GEOMETRY = [
  "d",
  "points",
  "pathLength",
  "x",
  "y",
  "x1",
  "y1",
  "x2",
  "y2",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "width",
  "height",
];

const TYPOGRAPHY = [
  "fontSize",
  "fontFamily",
  "fontWeight",
  "fontStyle",
  "textAnchor",
  "dominantBaseline",
  "letterSpacing",
  "wordSpacing",
  "dx",
  "dy",
  "textLength",
];

export const SVG_SANITIZE_ATTRIBUTES: Record<string, string[]> = {
  svg: ["viewBox", "preserveAspectRatio", "role", "ariaLabel", "width", "height", ...PAINT],
  g: ["className", ...PAINT],
  path: ["className", ...GEOMETRY, ...PAINT],
  rect: ["className", ...GEOMETRY, ...PAINT],
  circle: [...GEOMETRY, ...PAINT],
  ellipse: [...GEOMETRY, ...PAINT],
  line: [...GEOMETRY, ...PAINT],
  polyline: [...GEOMETRY, ...PAINT],
  polygon: [...GEOMETRY, ...PAINT],
  text: [...GEOMETRY, ...PAINT, ...TYPOGRAPHY],
  tspan: [...PAINT, ...TYPOGRAPHY],
};

export interface VisualFigure {
  /** The sanitized-on-the-way-in SVG markup, ready for the raw HTML pass. */
  svg: string;
  /** Optional caption from the fence line (```` ```svg caption ````). */
  caption: string;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** True when the drawing contains a construct the guard refuses. */
export function hasForbiddenConstruct(svg: string): boolean {
  return FORBIDDEN.some((pattern) => pattern.test(svg));
}

/**
 * Give the drawing a coordinate system even when the model forgot one: without
 * a `viewBox` an inline SVG has no scalable frame and renders at whatever
 * intrinsic size it can guess. `width`/`height` are used when they are plain
 * numbers, otherwise a 640×400 canvas is assumed (the size the prompt asks for).
 */
export function ensureViewBox(svg: string): string {
  // Attribute names are case-sensitive in SVG; `<svg viewbox=…>` is ignored by
  // the browser and would be dropped by the sanitizer, so normalise first.
  const normalised = svg.replace(/\bviewbox\s*=/gi, "viewBox=").replace(/\bpreserveaspectratio\s*=/gi, "preserveAspectRatio=");
  if (/\bviewBox\s*=/.test(normalised)) return normalised;

  const open = /^(<svg\b[^>]*>)/i.exec(normalised);
  if (!open) return normalised;
  const width = /\bwidth\s*=\s*"(\d+(?:\.\d+)?)(?:px)?"/i.exec(open[1]);
  const height = /\bheight\s*=\s*"(\d+(?:\.\d+)?)(?:px)?"/i.exec(open[1]);
  const box =
    width && height
      ? `0 0 ${width[1]} ${height[1]}`
      : "0 0 640 400";
  return normalised.replace(open[1], open[1].replace(/^<svg\b/i, `<svg viewBox="${box}"`));
}

/**
 * Add `role="img"` + a `<title>` so the drawing is announced to a screen reader
 * instead of being skipped as decoration. Both are only added when the model
 * has not supplied them.
 */
export function withAccessibility(svg: string, caption: string): string {
  if (!caption) return svg;
  const open = /^(<svg\b[^>]*>)/i.exec(svg);
  if (!open) return svg;
  let tag = open[1];
  if (!/\brole\s*=/.test(tag)) tag = tag.replace(/^<svg\b/i, `<svg role="img"`);
  if (!/\baria-label\s*=/.test(tag)) {
    tag = tag.replace(/>$/, ` aria-label="${escapeHtml(caption)}">`);
  }
  const title = /<title\b/i.test(svg) ? "" : `<title>${escapeHtml(caption)}</title>`;
  return svg.replace(open[1], `${tag}${title}`);
}

/**
 * The caption written on the fence line. Quotes and a trailing period are
 * stripped because the model writes both styles (````svg "Refraction"` and
 * ```svg Refraction.).
 */
export function captionFromMeta(meta: string | null | undefined): string {
  const raw = (meta ?? "").trim();
  if (!raw) return "";
  const unquoted = raw.replace(/^[`"'\u201c\u201d]+\s*/, "").replace(/\s*[`"'\u201c\u201d]+$/, "");
  return unquoted.replace(/[.:;]\s*$/, "").trim().slice(0, MAX_CAPTION_CHARS);
}

/**
 * Turn a fenced block into a figure, or return null to leave it as code.
 * Pure and exported so the guard is testable without building a mdast tree.
 */
export function extractVisual(code: string, meta?: string | null): VisualFigure | null {
  const svg = (code ?? "").trim();
  if (!svg) return null;
  if (!/^<svg[\s>]/i.test(svg)) return null;
  // The whole block must be the drawing: trailing prose means the model was not
  // actually emitting a figure, and truncating it would drop half the picture.
  if (!/<\/svg>\s*$/i.test(svg)) return null;
  if (svg.length > MAX_SVG_CHARS) return null;
  if (svg.split("<").length - 1 > MAX_SVG_ELEMENTS) return null;
  if (hasForbiddenConstruct(svg)) return null;

  const caption = captionFromMeta(meta);
  const prepared = withAccessibility(ensureViewBox(svg), caption);
  return { svg: prepared, caption };
}

function figureNode(visual: VisualFigure): RootContent {
  const children: RootContent[] = [{ type: "html", value: visual.svg } as RootContent];
  if (visual.caption) {
    children.push({
      type: "paragraph",
      data: {
        hName: "figcaption",
        hProperties: { className: [CAPTION_CLASS] },
      },
      children: [{ type: "text", value: visual.caption }],
    } as unknown as RootContent);
  }
  return {
    type: "paragraph",
    data: { hName: "figure", hProperties: { className: [VISUAL_CLASS] } },
    children,
  } as unknown as RootContent;
}

function transform(children: RootContent[]): RootContent[] {
  for (let index = 0; index < children.length; index += 1) {
    const node = children[index];

    if (node.type === "code" && isVisualFenceLang(node.lang)) {
      const visual = extractVisual((node as Code).value ?? "", (node as Code).meta);
      if (visual) {
        children[index] = figureNode(visual);
        continue;
      }
    }

    // Recurse so a drawing inside a list item or a callout box also converts.
    const nested = (node as { children?: RootContent[] }).children;
    if (Array.isArray(nested)) {
      (node as { children: RootContent[] }).children = transform(nested);
    }
  }
  return children;
}

/**
 * remark plugin — no options, safe to add to the shared note pipeline. Runs
 * before the raw/sanitize stages, which remain the security boundary: this
 * plugin only decides what a figure LOOKS like.
 */
export const remarkVisuals: Plugin<[], Root> = () => (tree) => {
  tree.children = transform(tree.children);
};
