/**
 * IMAGE-GEN — "draw a figure live, then keep the chat going".
 *
 * Owner request (2026-09-30): when an answer needs a picture, the model should
 * WRITE the answer, GENERATE the figure where it belongs, and CONTINUE — in
 * that order, visibly.
 *
 * Protocol (model → platform):
 *   The model places exactly one fenced block at the very end of its answer,
 *   after all text (before the "Explore further" links when present):
 *
 *       ```veer-image
 *       one short English line describing exactly what to draw (max 120 chars)
 *       ```
 *
 *   The fence language is `veer-image` on purpose: it must not collide with
 *   the existing model-drawn-SVG fences (`svg` / `diagram` / `figure`, see
 *   frontend/lib/content/visuals.ts) — those carry SVG markup, this carries a
 *   plain drawing instruction.
 *
 * Engines (ordered, per owner choice 2026-09-30 "wire agnes 2.1 for sure"):
 *   1. Agnes `agnes-image-2.1-flash` (auto-fallback `agnes-image-2.0-flash`)
 *      — same gateway + AGNES_API_KEY as chat; verified live 2026-09-30.
 *   2. Browser-side puter.js (`frontend/lib/puter-image.ts`) — fires only
 *      when the server-side image(s) failed, so a single answer costs at most
 *      one extra engine. The student may be asked to sign into a free Puter
 *      account (User-Pays model: the app pays nothing).
 *
 * Kill-switch: AI_IMAGE_GEN=off disables the server engine + the prompt
 * instruction + the fence scanner (answers simply never carry fences).
 */

import {
  FIGURE_ARCHETYPES,
  FIGURE_ARCHETYPE_GUIDE,
  classifyFigureKind,
} from "./academic-figures";

// ── config ────────────────────────────────────────────────────────────────────

/** Verify the gateway with AI_IMAGE_GEN=on|off (default: on when a key exists). */
export function imageGenEnabled(): boolean {
  if (process.env.AI_IMAGE_GEN?.trim().toLowerCase() === "off") return false;
  return !!process.env.AGNES_API_KEY;
}

/** Ordered image-model chain. Override with AI_IMAGE_MODELS (comma list). */
const IMAGE_MODELS: string[] =
  process.env.AI_IMAGE_MODELS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? ["agnes-image-2.1-flash", "agnes-image-2.0-flash"];

/** Verified sizes: the 2026-09-30 probe succeeded at 512x512. */
const IMAGE_SIZE = process.env.AI_IMAGE_SIZE || "512x512";

const IMAGE_GEN_TIMEOUT_MS = Number(process.env.AI_IMAGE_GEN_TIMEOUT_MS) || 120_000;

/** A figure instruction is a drawing brief, not an essay. */
const MAX_PROMPT_CHARS = 500;

/** The fence language the model writes. */
export const FIGURE_FENCE = "veer-image";

export interface FigureSpec {
  /** The model's one-line drawing instruction. */
  prompt: string;
  /** Short human label shown as the caption (first line, trimmed). */
  caption: string;
}

export interface GeneratedFigure extends FigureSpec {
  url?: string;
  reason?: string;
}

// ── Agnes generator ───────────────────────────────────────────────────────────

/**
 * SUBJECT ACCURACY CLAUSES — the 2026-10-04 accuracy upgrade ("upgrade image
 * accuracy"). One generic "textbook diagram" prefix let the painter drift into
 * art; now the prompt's own words pull in the accuracy law of the subject it
 * belongs to, so a ray diagram is judged by physics rules and a cell by
 * biology rules.
 */
const SUBJECT_ACCURACY: Array<{ test: RegExp; clause: string }> = [
  {
    test: /(physic|optic|lens|mirror|prism|ray diagram|circuit|current|voltage|resist|capacit|magnet|wave|oscillat|pendulum|projectile|force|friction|velocity|acceleration|newton|electromagnet|electrostatic|electroscope|galvanometer|potentiometer|vernier|screw gauge|torque|momentum)/i,
    clause:
      "Physics accuracy: standard circuit/ray symbols only, arrowheads on every ray and vector in the physically correct direction, axes labelled with quantity and SI unit, true proportions and angles.",
  },
  {
    test: /(chemistr|molecule|atomic|electron configuration|orbital|bond|lewis|titrat|distill|electrolys|electrochemical|electrode|reaction|periodic|acid|alkane|alkene|benzene|crystal|valency|salt bridge|galvanic|cathode|anode)/i,
    clause:
      "Chemistry accuracy: correct valency, bond lines and bond angles, apparatus drawn vessel-by-vessel with labels, reaction and electron flow shown with arrows, IUPAC-standard notation.",
  },
  {
    test: /(biolog|cell|organelle|tissue|anatomy|organ|dna|rna|mitosis|meiosis|life ?cycle|plant|animal|photosynth|respirat|enzyme|protein|genetic|punnett|heart|kidney|nephron|neuron|brain|plasmodium|fern|flower|seed|root|stem|leaf)/i,
    clause:
      "Biology accuracy: anatomically correct proportions, orientation and relative sizes, every visible structure identified with a straight leader line, life-cycle stages in their true order with ploidy marked.",
  },
  {
    test: /(math|graph|function|parabola|ellipse|hyperbola|circle theorem|vector|triangle|geometry|calculus|integral|derivative|probabilit|venn|unit circle|asymptote|matrix|coordinate)/i,
    clause:
      "Mathematics accuracy: exact shapes with correct curvature and symmetry, axes with scale marks and units, all points/vertices lettered, tangents and shaded regions precise.",
  },
];

/**
 * Turn a student's one-line brief into a drawing brief the painter can be
 * graded against. Two lanes:
 *   · academic kinds (lifecycle, labelled, apparatus, graph, …) — the
 *     archetype's own `must` clauses plus the subject accuracy law plus the
 *     rendering law (labels, leader lines, no art);
 *   · `illustration` (photos, scenes, mood boards) — accuracy means fidelity
 *     to the real world instead of labels.
 */
export function enrichImagePrompt(prompt: string): string {
  const clean = (prompt ?? "").trim();
  const kind = classifyFigureKind(clean);

  if (kind === "illustration") {
    return (
      `${clean}. ` +
      "Faithful real-world accuracy: correct anatomy, proportions and natural colours, " +
      "photographic detail and lighting, no distortion, no invented objects, clean composition, high resolution."
    );
  }

  const archetype = FIGURE_ARCHETYPES[kind];
  const subject = SUBJECT_ACCURACY.find((s) => s.test.test(clean))?.clause;
  return [
    `Educational science textbook figure: ${clean}.`,
    `Figure type — ${archetype.label}: ${archetype.must}`,
    subject,
    "Rendering law: crisp clean background, high contrast, thin precise outlines, " +
      "every part labelled with a straight leader line to legible text, standard notation, " +
      "syllabus-accurate content, no artistic distortion, no watermark.",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Generate one figure with the ordered Agnes image chain.
 * Best-effort: every failure path resolves to { reason }, never throws —
 * a dead image engine must not cost the student their answer.
 */
export async function generateVeerImage(
  prompt: string,
): Promise<{ url?: string; reason?: string; model?: string }> {
  const clean = (prompt ?? "").trim().slice(0, MAX_PROMPT_CHARS);
  if (!imageGenEnabled() || !clean) {
    return { reason: "image generation is disabled or no instruction was given" };
  }

  const key = process.env.AGNES_API_KEY;
  const baseUrl = (process.env.AGNES_API_URL || "https://apihub.agnes-ai.com").replace(/\/v1\/?$/, "");

  // Enrich the brief with the subject + archetype accuracy laws (see above):
  // eliminates random artistic hallucinations and pins label correctness.
  const enrichedPrompt = enrichImagePrompt(clean);

  for (const model of IMAGE_MODELS) {
    try {
      const res = await fetch(`${baseUrl}/v1/images/generations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ model, prompt: enrichedPrompt, n: 1, size: IMAGE_SIZE }),
        signal: AbortSignal.timeout(IMAGE_GEN_TIMEOUT_MS),
      });
      if (!res.ok) {
        const text = await res.text();
        console.warn(
          `[image-gen] ${model} → ${res.status}: ${text.slice(0, 200)}`,
        );
        continue;
      }
      const data: any = await res.json();
      const url = data?.data?.[0]?.url;
      if (typeof url === "string" && url.trim()) {
        console.info(`[image-gen] ${model} drew "${clean.slice(0, 60)}…" in ${url.slice(0, 60)}`);
        return { url, model };
      }
      console.warn(`[image-gen] ${model} returned no url`);
    } catch (err) {
      console.warn(
        `[image-gen] ${model} failed:`,
        err instanceof Error ? err.message : err,
      );
    }
  }
  return { reason: "all image models failed" };
}

// ── fence streaming filter ───────────────────────────────────────────────────

/**
 * TOKEN-LEVEL fence filter for the live stream.
 *
 * The model's fence arrives as ordinary text deltas, so it is SUPPRESSED from
 * the content the student sees: the opening fence line is swallowed, the
 * instruction line(s) are collected, and the closing fence triggers a
 * figureStart event exactly once.
 *
 * Streaming rule (owner 2026-10-01: "reply like Claude/ChatGPT — it must keep
 * typing, not arrive at once"): every delta that CANNOT be the start of a
 * figure fence is forwarded IMMEDIATELY. The previous line-buffered version
 * held all text until a "\n" arrived, which turned a paragraph of prose into
 * one lump and made the reply look like it landed in bursts. Now only two
 * things are ever held back: the body of an open fence, and a trailing partial
 * line that could still grow into the opener (e.g. "``", "```", "```vee"…).
 * Plain text is byte-for-byte identical to the input.
 */
export class FigureStreamFilter {
  private buf = "";
  private inFigure = false;
  private figLines: string[] = [];
  /** Every figure the filter has seen (resolved later by the caller). */
  figures: FigureSpec[] = [];

  /** The opener, e.g. "```veer-image" (the language may change with config). */
  private static readonly OPEN_RE = new RegExp(
    "^```" + FIGURE_FENCE + "(\\s|$)",
    "i",
  );

  /**
   * Could the pending tail (a newline-free partial line) still turn into a
   * fence opener? True for a prefix of the marker ("`", "```", "```veer")
   * and for the marker itself once its brief arrives on the same line.
   */
  private couldOpenFigure(): boolean {
    const tail = this.buf.trim();
    // Whitespace-only: may be up to 3 spaces of markdown fence indentation.
    if (!tail) return true;
    const marker = "```" + FIGURE_FENCE;
    if (marker.toLowerCase().startsWith(tail.toLowerCase())) return true;
    return FigureStreamFilter.OPEN_RE.test(tail);
  }

  /** Feed one delta; returns content chunks to forward + figure events. */
  push(
    delta: string,
  ): { chunks: string[]; figureStarts: FigureSpec[] } {
    this.buf += delta;
    const chunks: string[] = [];
    const figureStarts: FigureSpec[] = [];

    for (;;) {
      const idx = this.buf.indexOf("\n");
      if (idx === -1) {
        // No complete line yet: inside a fence the body stays hidden, and a
        // tail that could still become an opener is held. Everything else is
        // ordinary prose → forward it right now (this is the typing effect).
        if (this.inFigure || this.couldOpenFigure()) break;
        chunks.push(this.buf);
        this.buf = "";
        break;
      }
      const line = this.buf.slice(0, idx);
      this.buf = this.buf.slice(idx + 1);
      const trimmed = line.trim();

      if (this.inFigure) {
        if (/^```$/.test(trimmed)) {
          this.inFigure = false;
          const prompt = this.figLines.join(" ").trim();
          if (prompt) {
            const spec: FigureSpec = {
              prompt: prompt.slice(0, MAX_PROMPT_CHARS),
              caption: (this.figLines[0] ?? "").trim().slice(0, 48),
            };
            this.figures.push(spec);
            figureStarts.push(spec);
          }
          this.figLines = [];
        } else {
          this.figLines.push(line.trim());
        }
        continue; // figure lines never reach the student as text
      }

      if (FigureStreamFilter.OPEN_RE.test(trimmed)) {
        this.inFigure = true;
        this.figLines = [];
        continue; // swallow the opening fence line
      }

      chunks.push(line + "\n");
    }

    return { chunks, figureStarts };
  }

  /**
   * End of stream. Two cases: a dangling incomplete line (re-emit it), and a
   * figure fence that was never closed (close it with whatever was collected —
   * a too-short brief just fails generation, which the caller reports).
   *
   * The most common "never closed" shape is the model ending its answer EXACTLY
   * at the closing fence: the final "```" line has no trailing newline, so it
   * is still sitting in the buffer. Strip that token before folding the buffer
   * into the brief, or the drawing instruction would read "…diagram ```".
   */
  flush(): { tail: string; figureStarts: FigureSpec[] } {
    const figureStarts: FigureSpec[] = [];
    let tail = "";
    if (this.inFigure) {
      const leftover = this.buf.replace(/\s*```+\s*$/, "").trim();
      this.buf = "";
      const prompt = [...this.figLines, leftover].filter(Boolean).join(" ").trim();
      this.inFigure = false;
      if (prompt) {
        const spec: FigureSpec = {
          prompt: prompt.slice(0, MAX_PROMPT_CHARS),
          caption: (this.figLines[0] ?? prompt).trim().slice(0, 48),
        };
        // Recorded ONCE: dangling figures reach the caller through
        // figureStarts only — push() already carries the closed ones, so
        // callers never see a duplicate.
        figureStarts.push(spec);
      }
    } else {
      tail = this.buf;
      this.buf = "";
    }
    return { tail, figureStarts };
  }
}

// ── non-stream resolution ─────────────────────────────────────────────────────

/**
 * Post-process a finished answer: replace every ```veer-image fence with a
 * markdown image (or an inline note when drawing failed). Used by the
 * non-stream and guest routes.
 */
export async function resolveFiguresInText(
  text: string,
  generate?: (prompt: string) => Promise<{ url?: string; reason?: string }>,
): Promise<{ text: string; figures: GeneratedFigure[] }> {
  const generator = generate ?? generateVeerImage;
  const filter = new FigureStreamFilter();
  // Push the whole text at once, then flush — collects every figure spec.
  filter.push(text);
  const flushed = filter.flush();
  const specs = [...filter.figures, ...flushed.figureStarts];

  const figures: GeneratedFigure[] = [];
  let out = text;
  for (const spec of specs) {
    const result = await generator(spec.prompt);
    const figure: GeneratedFigure = { ...spec, url: result.url, reason: result.reason };
    figures.push(figure);
    const markdown = result.url
      ? `![${spec.caption || "figure"}](${result.url})`
      : `*(Figure not drawn${spec.caption ? `: ${spec.caption}` : ""} — ${result.reason ?? "unknown"})*`;
    // Replace the first fence occurrence that produced THIS spec, in order.
    out = out.replace(regexForFence(spec.prompt), markdown);
  }
  // A fence whose lines never reached us (pathological split) is stripped
  // anyway so raw fence markup can never reach the student.
  out = out.replace(new RegExp("```" + FIGURE_FENCE + "[\\s\\S]*?```", "gi"), "");
  return { text: out, figures };
}

function regexForFence(prompt: string): RegExp {
  const esc = prompt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // The fence body is the instruction; tolerate whitespace variations.
  return new RegExp(
    "```" + FIGURE_FENCE + "\\s*" + esc + "[\\s\\S]*?\\n?\\s*```",
    "i",
  );
}

// ── prompt instruction (appended to the professor context when enabled) ─────

export const FIGURE_TOOL_INSTRUCTION = [
  `[FIGURE TOOL — LIVE FIGURE DRAWING & INTERACTIVE LABELLING]`,
  `MANDATORY SEARCH & INTERACTIVE LABELLING (OWNER LAW 2026-10-03):`,
  `Never produce random, artistic, or unlabelled images — random images are strictly useless for academic study.`,
  `When an academic concept needs a visual (apparatus, anatomy, ray/circuit diagram, cycle, curve, geometry):`,
  `1. SEARCH MANDATORY FROM GOOGLE / ATTACHED DIAGRAMS: Consult Google Images and attached reference diagram files to get the exact idea, structure, orientation, and official textbook labels.`,
  `2. DRAW THE DIAGRAM WITH COMPLETE LABELLING: Prefer drawing the diagram directly using the \`\`\`svg fence on a 900x640 canvas so lines and text are razor-sharp. Run leader lines from every part to legible text labels.`,
  `3. INTERACTIVE LABELS: Wrap every labelled part in its own <g> tag with an informative <title>:`,
  `   <g><title>Part Name | Mechanism & Function | Exam Significance</title>...shapes, leader line, text label...</g>`,
  `   The platform automatically provides an interactive interface opening on hover and click for every single label!`,
  `4. If an image generation brief is emitted, place exactly this fenced block at the VERY END of your answer (after all text):`,
  `\`\`\`${FIGURE_FENCE}`,
  `one short English line (max 120 characters) describing a technical textbook schematic with clear labels and leader lines.`,
  `\`\`\``,
  `Figure rules: at most ONE figure per answer; write the instruction as a plain technical drawing brief, never random art; prefer the attached real diagram files and vector SVG drawings.`,
].join("\n");

/**
 * SUBJECT DIAGRAM GUIDE — the exam-grade figure each of the six NEB subjects
 * actually asks for. Appended to the figure-tool instruction so the image
 * creator draws subject-correct, deep-academic diagrams, never a generic
 * illustration.
 */
export const SUBJECT_DIAGRAM_GUIDE = `[FIGURE SUBJECT GUIDE — draw the exam-grade figure each subject actually asks for]

PHYSICS — ray diagrams for mirrors/lenses/prisms (principal axis, F, C, object, image, arrow-headed rays); circuit diagrams with standard symbols and labelled I (A) / V (V); free-body diagrams with named force arrows (weight mg, normal N, tension T, friction f) at their point of action; s-t / v-t / a-t graphs with labelled axes and units; transverse and longitudinal waves (crest, trough, amplitude, wavelength); electric and magnetic field lines with direction arrows; apparatus labelled part-by-part (vernier calliper, screw gauge, meter bridge, potentiometer).

CHEMISTRY — structural and Lewis formulas with correct valency and bonds; apparatus set-ups labelled vessel-by-vessel (distillation, titration, electrolysis, Kipp's apparatus); reaction mechanisms drawn with curled arrows tracing electron flow; orbital and energy-level diagrams obeying Aufbau and (n+l); periodic-trend graphs labelled on both axes; electrochemical (galvanic/electrolytic) cells with anode/cathode/salt bridge; crystal lattices and unit cells.

BIOLOGY — cell and organelle structure with every part labelled; tissues and organ systems (digestive, respiratory, circulatory, excretory, nervous, reproductive); life cycles with each stage's ploidy (n / 2n) and the meiosis that resets it; metabolic pathways (glycolysis, Krebs, Calvin, photosynthesis, respiration) showing substrate, enzyme, product and ATP/NADH/FADH2 per compartment; Mendelian crosses as Punnett squares; DNA double helix and replication fork.

MATHEMATICS — conic sections (circle, parabola, ellipse, hyperbola) with axes, foci, vertices, directrix, asymptotes; function graphs with labelled axes and intercepts; tangent line and area-under-the-curve shaded correctly; the unit circle with exact radian/degree values; vectors and 3D lines/planes; geometric constructions and circle theorems; Venn diagrams and probability curves.

ENGLISH — sentence/parse trees (phrase structure); grammar mind-maps; the phonetics vowel quadrilateral with IPA symbols; essay and story-structure diagrams.

NEPALI — वर्णमाला charts classifying स्वर/व्यञ्जन; व्याकरण mind-maps (नाम, सर्वनाम, विशेषण, क्रिया, कारक); साहित्य concept maps (रस, अलङ्कार, छन्द); कथाको संरचना as a flow in Devanagari.

Universal drawing law for all six subjects: label every part an examiner marks; give units on every axis; point arrows only in the physically/chemically correct direction; keep notation standard (italic genus species, SI units, IUPAC); and never invent a label or detail the source does not show.`;

/** Append the figure-tool instruction to the professor context when enabled. */
export function withFigureToolInstruction(context: string): string {
  if (!imageGenEnabled()) return context;
  // The archetype guide is shared with the vector figure writer
  // (ai/figure-draw.ts) and the chat's svg law (ai/deep-answer.ts), so a
  // PAINTED figure and a DRAWN figure follow the same twelve shapes and the
  // same hover contract.
  const instruction = `${FIGURE_TOOL_INSTRUCTION}\n\n${SUBJECT_DIAGRAM_GUIDE}\n\n${FIGURE_ARCHETYPE_GUIDE}`;
  return context ? `${context}\n\n${instruction}` : instruction;
}
