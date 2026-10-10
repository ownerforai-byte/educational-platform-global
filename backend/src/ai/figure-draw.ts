/**
 * FIGURE DRAW — the vector figure writer.
 *
 * Owner request (2026-10-03): "agnes image is just drawing rough image ---- 
 * train it for all kind of academic images like lifecycle, labelling, all
 * parts name with their interface with supporting details which opens after
 * hovering".
 *
 * The raster image engine cannot spell, so it can never deliver "all parts
 * named". This writer puts the TEXT model to work instead: it receives the
 * exam-grade brief (ai/academic-figures.ts), returns ONE complete SVG drawing,
 * and every labelled part travels as `<g><title>NAME — detail</title>` — which
 * the frontend already opens on hover/click.
 *
 * Contract: never throws. Every failure path resolves to `{ reason }` so the
 * Diagram Hub can fall back to the raster chain (server raster → puter.js) and the
 * student still gets a picture.
 *
 * Kill-switch: AI_FIGURE_GEN=off disables the writer entirely.
 */

import {
  buildFigureBrief,
  captionForFigure,
  classifyFigureKind,
  extractSvgFigure,
  figureParts,
  FIGURE_WRITER_SYSTEM,
  isVectorFigureKind,
  type FigureKind,
  type FigurePart,
} from "./academic-figures";
import { createAIService, type AIChatMessage } from "./service";

/** Longest request accepted, in characters. */
export const MAX_FIGURE_REQUEST_CHARS = 400;

/** How many times the writer may be asked for a drawing (1 + one repair). */
const MAX_ATTEMPTS = 2;

export function figureGenEnabled(): boolean {
  return process.env.AI_FIGURE_GEN?.trim().toLowerCase() !== "off";
}

export interface DrawnFigure {
  /** The validated drawing (absent when the writer failed). */
  svg?: string;
  /** Figure caption — the model's fence-line caption, else derived. */
  caption: string;
  /** Archetype the request was classified into. */
  kind: FigureKind;
  /** Every hoverable part, in drawing order. */
  parts: FigurePart[];
  /** How many model calls were spent. */
  attempts: number;
  /** Present only when no drawing could be produced. */
  reason?: string;
}

/** Inject the model call so tests can pin the flow without a network. */
export type FigureChat = (messages: AIChatMessage[]) => Promise<string>;

const REPAIR_INSTRUCTION = [
  "That reply did not contain ONE complete, valid figure.",
  "Reply again with ONLY the fenced block: ```svg <caption> followed by a single complete <svg viewBox=\"0 0 900 640\">…</svg> drawing and the closing fence.",
  "Every labelled part must be wrapped in its own <g> whose first child is <title>NAME — what it does and how it links to the parts around it</title>.",
  "No prose before or after the fence, no forbidden elements (script, style, defs, marker, gradients, use, image, a, foreignObject, url(#…), on-… handlers, external URLs).",
].join("\n");

/**
 * Draw one academic figure for a request.
 *
 * The archetype is classified from the request unless the caller pins one; a
 * pictorial ("photo", "watercolour", "no labels") request resolves to a reason
 * immediately instead of wasting a model call, which is how the hub decides to
 * use the raster engine.
 */
export async function drawAcademicFigure(
  request: string,
  options: { kind?: FigureKind; classLevel?: string; chat?: FigureChat } = {},
): Promise<DrawnFigure> {
  const clean = (request ?? "").trim().replace(/\s+/g, " ").slice(0, MAX_FIGURE_REQUEST_CHARS);
  const kind = options.kind ?? classifyFigureKind(clean);
  const caption = captionForFigure(clean, kind);

  if (!clean) {
    return { caption, kind, parts: [], attempts: 0, reason: "no figure request was given" };
  }
  if (!isVectorFigureKind(kind)) {
    return {
      caption,
      kind,
      parts: [],
      attempts: 0,
      reason: "pictorial request — the raster engine draws this",
    };
  }
  if (!figureGenEnabled()) {
    return { caption, kind, parts: [], attempts: 0, reason: "figure drawing is disabled" };
  }

  const chat: FigureChat =
    // "" selects the service's own provider race + fallback, the same call
    // shape the other API routes use (see api/ai-enhance.ts).
    options.chat ?? ((messages) => createAIService().chat("", messages));
  const brief = buildFigureBrief({ request: clean, kind, classLevel: options.classLevel });
  const base: AIChatMessage[] = [
    { role: "system", content: FIGURE_WRITER_SYSTEM },
    { role: "user", content: brief },
  ];

  let attempts = 0;
  try {
    attempts = 1;
    let reply = await chat(base);
    let drawn = extractSvgFigure(reply);
    let parts = drawn ? figureParts(drawn.svg) : [];

    // One repair pass: the usual misses are a truncated drawing and a figure
    // whose parts were never wrapped, and both are cheap to ask for again.
    if (!drawn || parts.length === 0) {
      attempts = 2;
      reply = await chat([
        ...base,
        { role: "assistant", content: reply.slice(0, 3000) },
        { role: "user", content: REPAIR_INSTRUCTION },
      ]);
      const repaired = extractSvgFigure(reply);
      if (repaired) {
        drawn = repaired;
        parts = figureParts(repaired.svg);
      }
    }

    if (!drawn) {
      return {
        caption,
        kind,
        parts: [],
        attempts,
        reason: "the model did not return a complete figure",
      };
    }

    // A drawing with no hoverable part is the "rough picture" the owner
    // refused: report the miss (the hub falls back to the raster chain)
    // instead of shipping an unlabelled figure as if it were exam-grade.
    if (parts.length === 0) {
      return {
        caption,
        kind,
        parts: [],
        attempts,
        reason: "the model did not label any part of the figure",
      };
    }

    return { svg: drawn.svg, caption: drawn.caption || caption, kind, parts, attempts };
  } catch (err) {
    return {
      caption,
      kind,
      parts: [],
      attempts,
      reason: err instanceof Error ? err.message : "figure drawing failed",
    };
  }
}
