/**
 * Which corpus JSON surfaces render as paper vs interactive app chrome.
 * Graph payloads and the dedicated graphs/derivations routes stay off paper.
 */

/** App routes that are never wrapped as paper documents. */
export const A4_EXCLUDED_ROUTE_PREFIXES = [
  "/graphs",
  "/science-graph-bank",
  "/derivations",
] as const;

export function isA4ExcludedAppRoute(pathname: string): boolean {
  const path = pathname.split("?")[0] ?? "";
  return A4_EXCLUDED_ROUTE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

/** Supplemental manifest kinds that stay off the paper sheet (graph bank data). */
export const A4_EXCLUDED_SUPPLEMENTAL_KINDS = new Set<string>(["graph"]);

export function supplementalKindOnPaper(kind: string): boolean {
  return !A4_EXCLUDED_SUPPLEMENTAL_KINDS.has(kind);
}