const QUOTE_MARKER_RE = /^<!--\s*quote-post:([0-9a-f-]{36})\s*-->\s*/i;

export function quotePostIdFromBody(body: string): string | null {
  const match = QUOTE_MARKER_RE.exec(body);
  return match?.[1]?.toLowerCase() ?? null;
}

export function stripQuoteMarker(body: string): string {
  return body.replace(QUOTE_MARKER_RE, "").trimStart();
}