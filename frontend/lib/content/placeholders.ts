/**
 * Placeholder detection — one rule, three CLIs (PLANS.md §4.8).
 *
 * The content generator leaves marker sentences in unfinished notes. Those files
 * are "unfinished", NOT "broken": `validate.ts` grades them EMPTY rather than
 * INVALID (so a stub never buries a real schema defect), `repair.ts` skips them,
 * and `build.ts` copies them through without demanding a schema pass.
 */
export const PLACEHOLDER_MARKERS = [
  "class 11 concept",
  "key point 1",
  "key formula 1",
  "[insert",
  "placeholder — run content generation",
  "mindmap placeholder",
];

/** True when the raw file text carries a generator marker. */
export function isPlaceholderContent(text: string): boolean {
  const low = text.toLowerCase();
  return PLACEHOLDER_MARKERS.some((m) => low.includes(m));
}
