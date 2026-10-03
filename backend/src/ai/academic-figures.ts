/**
 * ACADEMIC FIGURES — one shared archetype engine for every figure the platform
 * draws, so a life cycle, a labelled organ, an apparatus, a graph and a
 * free-body diagram all come out exam-grade instead of "a rough picture".
 *
 * Owner request (2026-10-03): "train it for all kind of academic images like
 * lifecycle, labelling, all parts name with their interface with supporting
 * details which opens after hovering".
 *
 * Three consumers share this module:
 *
 *   1. the vector figure writer (ai/figure-draw.ts) — builds the brief the text
 *      model turns into ONE complete <svg> figure;
 *   2. the chat tutor's drawn figures (ai/deep-answer.ts) — the compact
 *      FIGURE_ARCHETYPE_GUIDE is folded into its svg-fence section;
 *   3. the raster figure tool (ai/image-gen.ts) — the same guide is appended to
 *      the ```veer-image brief, so a painted figure follows the same archetypes.
 *
 * The hover contract is the same everywhere: every labelled part is wrapped in
 * `<g><title>NAME — what it does and how it links to the parts around it</title>
 * …</g>`. The frontend surfaces that title on hover/click
 * (components/content/interactive-markdown.tsx), and `figureParts()` below is
 * the machine-readable half: the API returns the legend so the hub can also
 * list every part with its detail without a pointer.
 */

// ── kinds ─────────────────────────────────────────────────────────────────────

/** Every academic figure shape the platform recognises. */
export type FigureKind =
  | "lifecycle"
  | "labelled"
  | "apparatus"
  | "process"
  | "graph"
  | "circuit"
  | "ray"
  | "free-body"
  | "geometry"
  | "hierarchy"
  | "comparison"
  | "timeline"
  | "illustration";

export interface FigureArchetype {
  /** Human label shown as a badge ("Life cycle"). */
  label: string;
  /** The must-haves a draughtsman may never omit for this kind. */
  must: string;
}

/**
 * The archetype catalogue. `must` is written as a drawing law, not as advice:
 * it is copied verbatim into both the vector brief and the shared guide.
 */
export const FIGURE_ARCHETYPES: Record<FigureKind, FigureArchetype> = {
  lifecycle: {
    label: "Life cycle",
    must: "stages in true order around the cycle, arrowheads showing the real direction of travel; every stage named; ploidy (n / 2n / 3n) on each stage where the syllabus marks it; the event that moves one stage to the next (mitosis, meiosis, fertilisation, sporulation, germination) written on or beside the arrow.",
  },
  labelled: {
    label: "Labelled structure",
    must: "the whole structure outlined, then EVERY part an examiner can name carrying its own leader line; each part's hover line says what it does AND what it connects to (its interface with the neighbouring parts).",
  },
  apparatus: {
    label: "Apparatus",
    must: "the set-up as it stands on the bench; every vessel, burner, stand, clamp, electrode, thermometer, delivery tube labelled; contents of each vessel named; the direction of liquid/gas flow shown with arrowheads.",
  },
  process: {
    label: "Process",
    must: "boxes or compartments joined by directed arrows in the true sequence; each step named with substrate → product and the enzyme/condition on the arrow; ATP / energy / electron carriers marked where the syllabus marks them; no step floating without its arrow.",
  },
  graph: {
    label: "Graph",
    must: "both axes labelled with quantity AND unit, scale ticks drawn, every curve named, the marked points (max, min, intercept, break, asymptote) called out, any shaded area explained.",
  },
  circuit: {
    label: "Circuit",
    must: "standard symbols only, every component labelled with its letter/value, current and voltage arrows with units, the switch state shown, the meter polarities correct.",
  },
  ray: {
    label: "Ray diagram",
    must: "principal axis drawn with pole/optical centre and F, C marked on it; object and image as upright arrows with heights; every ray arrow-headed; virtual rays and virtual images dashed.",
  },
  "free-body": {
    label: "Free-body diagram",
    must: "the body sketched free of its surroundings; every force as an arrow starting at its true point of action, each named with its symbol (mg, N, T, f); inclines and angles marked; no extra forces invented.",
  },
  geometry: {
    label: "Geometry figure",
    must: "drawn to scale where the shape matters; every vertex/point lettered; equal sides and equal angles marked; the asked quantity highlighted; axes with units when plotted.",
  },
  hierarchy: {
    label: "Hierarchy",
    must: "a top-down tree: the parent at the top, the distinguishing feature named on each branch, every terminal node labelled, no crossing lines.",
  },
  comparison: {
    label: "Comparison",
    must: "two (or three) panels of the same size with the SAME structures in the SAME positions in each; every structure labelled in each panel; the difference called out per structure.",
  },
  timeline: {
    label: "Timeline",
    must: "dated events in ascending order along one line, each event one short phrase, cause → effect arrows between linked events.",
  },
  illustration: {
    label: "Illustration",
    must: "a pictorial scene, not a diagram — it is drawn by the raster engine, never as vector line art.",
  },
};

/** Kinds the vector (SVG) writer should draw; `illustration` routes to raster. */
export function isVectorFigureKind(kind: FigureKind): boolean {
  return kind !== "illustration";
}

// ── classification ────────────────────────────────────────────────────────────

/**
 * Request → archetype, by the words the request actually uses. Ordered most
 * specific first; the default is `labelled`, because a bare academic request
 * ("diagram of the human heart") wants a labelled figure, never a photo.
 *
 * Deterministic on purpose: the owner must be able to predict which figure
 * shape a prompt will produce, and the rule table is testable.
 */
export function classifyFigureKind(request: string): FigureKind {
  const text = (request ?? "").toLowerCase();

  const rules: Array<[FigureKind, RegExp]> = [
    [
      "illustration",
      /photo|photoreal|realistic|real[- ]life|painting|water[- ]?colour|water[- ]?color|portrait|scenery|landscape|wallpaper|poster|mascot|logo|cartoon|sticker|no labels|without labels|artwork|3d render/,
    ],
    [
      "lifecycle",
      /\blife[- ]?(cycle|history|stages)\b|alternation of generations|metagenesis|life span of|stages of .*(reproduc|development|life)|cycle of (the )?(malaria|plasmodium|frog|mosquito|butterfly|silkworm|bryophyte|pteridophyte|angiosperm|gymnosperm|virus|hiv)/,
    ],
    [
      "circuit",
      /circuit|resistor|rheostat|galvanometer|potentiometer|meter bridge|wheatstone|ammeter|voltmeter|battery|\bemf\b|internal resistance|kirchhoff|series and parallel/,
    ],
    [
      "ray",
      /ray diagram|refraction|refraction through|reflection|mirror|lens|prism|image formation|focal length|magnification|total internal reflection|optical fibre|telescope|microscope.*(objective|eyepiece)/,
    ],
    [
      "free-body",
      /free[- ]?body|force diagram|forces acting|body diagram|friction.*(block|incline)|on an incline|tension in/,
    ],
    [
      "apparatus",
      /apparatus|experimental set[- ]?up|set[- ]?up|titration|distillation|electrolysis|kipp|calorimeter|searle|potometer|osmometer|respirometer|preparation of|test for|burette|pipette|conical flask|delivery tube|thermometer/,
    ],
    [
      "graph",
      /\bgraph\b|plot of|plotted|curve|versus|\bvs\.?\b|variation of|s[-–]t graph|v[-–]t graph|a[-–]t graph|energy profile|boltzmann|binding energy|photoelectric|maxwell|displacement[- ]time|velocity[- ]time|half[- ]life|titration curve|action spectrum|absorption spectrum/,
    ],
    [
      "geometry",
      /unit circle|conic|parabola|ellipse|hyperbola|tangent|normal to|circle theorem|construction|venn|triangle|\bargand\b|complex plane|vector diagram|projectile path|area under|definite integral|coordinate (geometry|plane)|straight line.*(graph|figure)|inscribed|circumscribed/,
    ],
    [
      "hierarchy",
      /classif|taxonom|tree diagram|mind[- ]?map|family tree|phylogen|genealog|hierarch|kingdom.*(phylum|division)|cladogram|pedigree|blood relation/,
    ],
    [
      "comparison",
      /compar|difference[s]? between|side[- ]by[- ]side|versus table|contrast|distinguish between|prokaryot.*eukaryot|artery.*vein|plant cell.*animal cell/,
    ],
    [
      "timeline",
      /timeline|history of|chronolog|events in order|evolution of the (model|atom|theory)|landmark discoveries|milestones/,
    ],
    [
      "process",
      /process|mechanism|pathway|cascade|\bcycle\b|steps of|step[- ]by[- ]step|glycolysis|krebs|calvin|photosynthesis.*(stage|light|dark)|nitrogen cycle|carbon cycle|oxygen cycle|water cycle|reflex|digestion|respiration|transpiration|translation|transcription|replication|reaction sequence|how .* works/,
    ],
  ];

  for (const [kind, pattern] of rules) {
    if (pattern.test(text)) return kind;
  }
  return "labelled";
}

// ── the shared guide (chat + raster briefs) ───────────────────────────────────

/**
 * The compact guide appended to every figure instruction in the platform. It
 * is deliberately short — it rides inside per-request prompts — while
 * `buildFigureBrief()` carries the long form for the vector writer.
 */
export const FIGURE_ARCHETYPE_GUIDE = `[FIGURE ARCHETYPE GUIDE — every academic figure is one of these shapes, never a generic sketch]

1. LIFE CYCLE — stages in true order around the loop, arrowheads in the real direction; each stage named, its ploidy (n / 2n / 3n) where the syllabus marks it, and the event on the arrow (mitosis / meiosis / fertilisation / germination).
2. LABELLED STRUCTURE (the default for "diagram of X") — the whole structure outlined, then EVERY part an examiner can name with its own leader line; each part's hover line says what it does AND what it connects to.
3. APPARATUS — the experiment as it stands on the bench: every vessel, stand, burner, electrode and tube labelled, contents named, flow direction arrowed.
4. PROCESS / MECHANISM — compartments joined by directed arrows; each step named with substrate → product and the enzyme/condition on the arrow; ATP and carriers marked.
5. GRAPH — both axes with quantity AND unit, ticks, each curve named, max/min/intercept/break called out, shaded areas explained.
6. CIRCUIT — standard symbols, every component labelled with its letter/value, current and voltage arrows with units.
7. RAY DIAGRAM — principal axis with F and C, object and image as arrows, every ray arrow-headed, virtual parts dashed.
8. FREE-BODY — the body alone, every force arrow starting at its true point of action and named with its symbol (mg, N, T, f).
9. GEOMETRY / MATH — to scale where the shape matters, vertices lettered, equal sides/angles marked, the asked quantity highlighted.
10. HIERARCHY / CLASSIFICATION — top-down tree, the distinguishing feature named on each branch, every terminal node labelled.
11. COMPARISON — matching panels with the SAME structures in the SAME positions, each labelled, the difference called out per structure.
12. TIMELINE — dated events ascending along one line, cause → effect arrows between linked events.

UNIVERSAL LAW for all twelve: label every part an examiner can name; wrap each labelled part in its own <g> holding a <title>NAME — what it does and how it links to the parts around it</title> (the platform opens that title on hover/click, so it must be a real one-line explanation, never just the name); spell every label exactly as the syllabus spells it; keep arrow directions physically correct; SI units on every axis and value; standard notation (IUPAC, italic genus/species); white paper, dark thin lines, no decoration, nothing invented.`;

// ── the vector writer's brief ─────────────────────────────────────────────────

/** Subject detected from the request, used to sharpen the brief. */
export function subjectOfFigure(request: string): string {
  const t = (request ?? "").toLowerCase();
  if (/physics|ray|circuit|lens|mirror|force|wave|current|magnet|optic|projectile|pendulum/.test(t)) return "Physics";
  if (/chemistry|reaction|mole|acid|base|salt|orbital|bond|titration|electroly|organic|periodic/.test(t)) return "Chemistry";
  if (/biology|cell|organ|tissue|plant|animal|blood|heart|leaf|flower|dna|gene|nephron|neuron|photosynth|bacteria|virus|ecosystem/.test(t)) return "Biology";
  if (/math|geometry|algebra|calculus|trigonometr|vector|matrix|conic|circle|prove|theorem/.test(t)) return "Mathematics";
  if (/english|grammar|parse|sentence|phonetic|essay|poem|vowel/.test(t)) return "English";
  if (/nepali|वर्ण|व्याकरण|कविता|निबन्ध|साहित्य/.test(t)) return "Nepali";
  return "";
}

/**
 * The brief the vector writer receives. It is intentionally declarative — the
 * drawing laws the draughtsman may never break — and it names the archetype so
 * one request cannot drift into another figure shape.
 */
export function buildFigureBrief(input: {
  request: string;
  kind: FigureKind;
  classLevel?: string;
}): string {
  const { request, kind } = input;
  const subject = subjectOfFigure(request);
  const archetype = FIGURE_ARCHETYPES[kind];
  const level = input.classLevel?.trim() || "NEB Class 11/12";

  return [
    `Draw ONE exam-grade academic figure for this ${level}${subject ? ` ${subject}` : ""} request:`,
    `"${request.trim()}"`,
    "",
    `ARCHETYPE: ${archetype.label.toUpperCase()} — ${archetype.must}`,
    "",
    "CANVAS AND STYLE:",
    '- one <svg viewBox="0 0 900 640"> drawing; white paper, no background rect needed;',
    "- strokes #0f172a at stroke-width 1.5–2; flat translucent fills for shading (e.g. fill=\"#93c5fd\" fill-opacity=\"0.28\"); no gradients, shadows or texture;",
    "- label text font-size 15–18, font-family sans-serif, horizontal only, never rotated and never overlapping a shape or another label;",
    "- arrows are small polygons or two-segment polylines with a solid head — `<marker>`, `<defs>` and `url(#…)` are not allowed;",
    "- keep the drawing inside the canvas with at least 24px margin, and leave room under the figure for the leader-line labels.",
    "",
    "LABELLING LAW (the mark scheme):",
    "- every part an examiner can name carries a label; nothing nameable is left bare;",
    "- each label sits outside the figure and joins its part with a thin leader line ending in a 3px dot at the exact point of attachment;",
    "- wrap every labelled part in its own <g> element whose FIRST child is a <title>;",
    "- the <title> is exactly: NAME — what it does and how it links to the parts around it. One line, 10–30 words, real teaching text (function + interface), never just the name;",
    "- name parts with the syllabus's own words and spell them exactly (e.g. \"Pulmonary artery — carries deoxygenated blood from the right ventricle to the lungs\").",
    "",
    "CORRECTNESS:",
    "- arrow directions, ray paths, current direction, electron flow and force directions must be physically correct;",
    "- every axis carries its quantity AND unit; every value carries its unit;",
    "- life-cycle stages carry their ploidy where the syllabus marks it; process steps carry the enzyme/condition on the arrow;",
    "- standard notation only (SI units, IUPAC names, italic genus/species);",
    "- draw only what the syllabus shows — never invent a part, a value or a label that does not exist.",
  ].join("\n");
}

/** The system prompt for the vector writer (element and output law). */
export const FIGURE_WRITER_SYSTEM = [
  "You are Ravikisan's academic figure draughtsman for NEB Class 11/12 (Nepal). You produce exactly ONE figure per reply, as one complete SVG drawing.",
  "",
  "ALLOWED ELEMENTS (nothing else): svg, g, title, desc, rect, circle, ellipse, line, polyline, polygon, path, text, tspan.",
  "ALLOWED ATTRIBUTES: viewBox, preserveAspectRatio, role, aria-label, width, height, fill, fill-opacity, fill-rule, stroke, stroke-width, stroke-opacity, stroke-linecap, stroke-linejoin, stroke-dasharray, stroke-dashoffset, stroke-miterlimit, opacity, transform, vector-effect, d, points, x, y, x1, y1, x2, y2, cx, cy, r, rx, ry, font-size, font-family, font-weight, font-style, text-anchor, dominant-baseline, letter-spacing, dx, dy.",
  "FORBIDDEN: script, style, defs, marker, gradient, pattern, clipPath, mask, animate, use, image, a, foreignObject, url(#…), any on-… handler, any external URL, any font or file reference.",
  "",
  "OUTPUT LAW — reply with exactly one fenced block and no prose at all:",
  "```svg <caption: 3–10 plain words naming the figure>",
  "<svg viewBox=\"0 0 900 640\">…the complete drawing…</svg>",
  "```",
  "The drawing must be complete in that single reply: every shape styled, every label written, every part grouped with its <title>. Never abbreviate, never say \"…\", never ask a question.",
].join("\n");

// ── extraction and validation ────────────────────────────────────────────────

/** Longest figure accepted, in characters (mirrors the frontend guard). */
export const MAX_FIGURE_CHARS = 40_000;
/** Longest figure accepted, in `<` characters (a cheap element count). */
export const MAX_FIGURE_ELEMENTS = 900;

/**
 * Constructs the renderer refuses. Same list as
 * frontend/lib/content/visuals.ts, plus absolute URLs: a figure that reaches
 * for the network would be dropped by the sanitizer anyway, so it must never
 * pass this gate.
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
  // Any url(…) reference at all: gradients, markers, patterns and clip paths
  // are refused, so a reference could only point at something that is gone.
  /url\(\s*['"]?[^)]*\)/i,
  /javascript:/i,
  /data:/i,
  // A link or an embedded source would be dropped by the renderer anyway.
  /\b(?:xlink:)?href\s*=/i,
  /\bsrc\s*=/i,
  /\son[a-z]+\s*=/i,
];

/**
 * The XML namespace declaration is NOT a network reference — it is what every
 * model writes on the opening tag, and the renderer simply drops it. Strip it
 * before validating, or every standard drawing would be refused.
 */
function stripXmlns(svg: string): string {
  return svg.replace(/\s+xmlns(?::[a-z]+)?\s*=\s*["'][^"']*["']/gi, "");
}

export interface ExtractedFigure {
  /** The validated drawing, viewBox normalised. */
  svg: string;
  /** Caption from the fence line ("" when the model gave none). */
  caption: string;
}

/** True when the drawing contains a construct the renderer refuses. */
export function hasForbiddenFigureConstruct(svg: string): boolean {
  return FORBIDDEN.some((pattern) => pattern.test(svg));
}

/** Give the drawing a coordinate system even when the model forgot one. */
export function ensureFigureViewBox(svg: string): string {
  const normalised = svg
    .replace(/\bviewbox\s*=/gi, "viewBox=")
    .replace(/\bpreserveaspectratio\s*=/gi, "preserveAspectRatio=");
  if (/\bviewBox\s*=/.test(normalised)) return normalised;

  const open = /^(<svg\b[^>]*>)/i.exec(normalised);
  if (!open) return normalised;
  const width = /\bwidth\s*=\s*"(\d+(?:\.\d+)?)(?:px)?"/i.exec(open[1]);
  const height = /\bheight\s*=\s*"(\d+(?:\.\d+)?)(?:px)?"/i.exec(open[1]);
  const box = width && height ? `0 0 ${width[1]} ${height[1]}` : "0 0 900 640";
  return normalised.replace(open[1], open[1].replace(/^<svg\b/i, `<svg viewBox="${box}"`));
}

/**
 * Pull ONE complete drawing out of a model reply and validate it against the
 * renderer's rules. Returns null when the reply is not a usable figure, so the
 * caller can ask for a repair instead of showing a broken picture.
 *
 * Accepts both shapes the model actually writes: a ```svg fence (preferred,
 * carries the caption) and a bare `<svg>…</svg>` run.
 */
export function extractSvgFigure(text: string): ExtractedFigure | null {
  const raw = text ?? "";
  const fenced = /```svg[ \t]*([\s\S]*?)```/i.exec(raw);
  const body = fenced ? fenced[1] : raw;

  // Locate the drawing by its OWN tags. The draughtsman routinely puts the
  // caption and the opening tag on one line — "```svg Figure 1: Labelled …
  // <svg viewBox=…>" — so assuming the fence line is only a caption silently
  // discarded every honest figure (found by running the real model).
  const start = body.search(/<svg[\s>]/i);
  if (start === -1) return null;
  const end = body.toLowerCase().lastIndexOf("</svg>");
  if (end <= start) return null;

  const candidate = stripXmlns(body.slice(start, end + "</svg>".length).trim());
  const caption = cleanCaption(fenced ? body.slice(0, start) : "");

  if (!candidate) return null;
  if (!/^<svg[\s>]/i.test(candidate)) return null;
  if (!/<\/svg>$/i.test(candidate)) return null;
  if (candidate.length > MAX_FIGURE_CHARS) return null;
  if (candidate.split("<").length - 1 > MAX_FIGURE_ELEMENTS) return null;
  if (hasForbiddenFigureConstruct(candidate)) return null;

  return { svg: ensureFigureViewBox(candidate), caption };
}

/** Fence-line caption cleanup: quotes, trailing punctuation, length cap. */
export function cleanCaption(meta: string | null | undefined): string {
  const raw = (meta ?? "").trim();
  if (!raw) return "";
  return raw
    .replace(/^[`"'\u201c\u201d]+/, "")
    .replace(/[`"'\u201c\u201d]+$/, "")
    // The draughtsman numbers its figures ("Figure 1: Labelled …"); the number
    // is noise in a gallery caption, so it goes.
    .replace(/^figure\s*\d*\s*[:.\-–—]\s*/i, "")
    // The draughtsman sometimes brackets its caption ("<Human heart>"); the
    // brackets are markup noise once the caption is rendered as text.
    .replace(/^[<>\[\]()]+/, "")
    .replace(/[<>\[\]()]+$/, "")
    .replace(/[.:;]\s*$/, "")
    .trim()
    .slice(0, 120);
}

// ── parts (the hover legend, machine-readable) ───────────────────────────────

export interface FigurePart {
  /** Part name as labelled in the figure. */
  name: string;
  /** The one-line explanation carried by the part's <title>. */
  detail: string;
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

function decodeEntities(text: string): string {
  return text.replace(/&(?:amp|lt|gt|quot|#39|apos);/g, (m) => ENTITIES[m] ?? m);
}

/**
 * Every `<g>` whose first child is a `<title>` is one hoverable part — the same
 * rule the frontend hydrates. Splits the title into name + detail on the first
 * dash/colon so the legend reads as a two-column list.
 */
export function figureParts(svg: string): FigurePart[] {
  const parts: FigurePart[] = [];
  const group = /<g\b[^>]*>\s*(?:<desc>[\s\S]*?<\/desc>\s*)?<title\b[^>]*>([\s\S]*?)<\/title>/gi;
  let match: RegExpExecArray | null;
  while ((match = group.exec(svg ?? "")) !== null) {
    const text = decodeEntities(match[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
    if (!text) continue;
    const split = /^(.{1,70}?)\s*(?:—|–|:| - )\s*([\s\S]+)$/.exec(text);
    parts.push(
      split
        ? { name: split[1].trim(), detail: split[2].trim() }
        : { name: text, detail: "" },
    );
    if (parts.length >= 80) break;
  }
  return parts;
}

/** A short caption for a figure when the model gave none. */
export function captionForFigure(request: string, kind: FigureKind): string {
  const clean = (request ?? "").trim().replace(/\s+/g, " ");
  const words = clean.split(" ").slice(0, 9).join(" ");
  const shortened = words.length > 84 ? `${words.slice(0, 84)}…` : words;
  return shortened || FIGURE_ARCHETYPES[kind].label;
}
