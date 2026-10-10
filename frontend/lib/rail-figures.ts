// Relative on purpose: the rail corpus is also read by tsx scripts run from the
// repo root (scripts/content/home-rails.ts), where the "@/" alias is not set up.
import { extractVisual } from "./content/visuals";

/**
 * rail-figures — the picture half of a rail row.
 *
 * Owner request 2026-10-06: "insert the diagrams, in a rectangular box at
 * conceptual place based on their need". A rail card row may therefore carry a
 * `figure` (see `SubjectSlideRow.figure`) and the renderer draws it in the
 * rectangular box `.rail-figure` underneath that row's text — so a drawing
 * lands exactly where the concept needs it instead of in a separate gallery.
 *
 * The drawing is NOT rendered raw: it goes through the very same guard the
 * tutor's note figures use (`lib/content/visuals.ts`) — one `<svg>…</svg>`
 * block, size-capped, with scripting, styling, external fetches and any
 * `url(#…)`/`id` reference refused. A drawing that fails the guard is dropped
 * (the row still shows its text), never half-stripped. Because this runs on
 * both sides of the server→client boundary, the string that reaches
 * `dangerouslySetInnerHTML` has already been through the allowlist twice.
 *
 * Client-safe on purpose: `content/visuals.ts` imports its mdast/unified types
 * with `import type`, so nothing but plain string work is bundled here.
 */

export interface RailFigureInput {
  svg?: unknown;
  caption?: unknown;
}

export interface RailFigure {
  /** Guarded `<svg>…</svg>` markup, ready for the raw-HTML pass. */
  svg: string;
  /** Caption under the drawing ("" when the card gave none). */
  caption: string;
}

/**
 * Guard one card figure. Returns null when the card has no usable drawing, so
 * callers simply skip the box — a broken figure is never a card failure.
 */
export function prepareRailFigure(
  figure: RailFigureInput | null | undefined,
): RailFigure | null {
  if (!figure || typeof figure.svg !== "string") return null;
  const caption = typeof figure.caption === "string" ? figure.caption : "";
  const visual = extractVisual(figure.svg, caption);
  if (!visual) return null;
  return { svg: visual.svg, caption: visual.caption };
}
