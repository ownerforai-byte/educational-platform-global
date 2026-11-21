const QUOTE_MARKER_RE = /^<!--\s*quote-post:([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\s*-->\s*/i;

export function quotePostIdFromBody(body: string): string | null {
  const match = QUOTE_MARKER_RE.exec(body);
  return match?.[1]?.toLowerCase() ?? null;
}

export function stripQuoteMarker(body: string): string {
  return body.replace(QUOTE_MARKER_RE, "").trimStart();
}

export function embedQuoteMarker(body: string, quotedPostId: string): string {
  const stripped = stripQuoteMarker(body);
  return `<!-- quote-post:${quotedPostId} -->\n${stripped}`;
}

export const QUOTE_POST_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;