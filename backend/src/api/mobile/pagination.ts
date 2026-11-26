import type { Request } from "express";
import { cursorPaginationQuerySchema } from "../contracts/public-schemas.js";

/**
 * Cursor pagination convention for every /api/mobile list endpoint
 * (community-style feeds, notes lists, etc.).
 *
 * Request:  ?limit=20&cursor=<opaque>
 * Response: { "items": [...], "nextCursor": "<opaque>" | null }
 *
 * Rules:
 * - `cursor` is opaque to clients (base64url of a JSON anchor). Clients must
 *   never parse it; they echo `nextCursor` back verbatim.
 * - `nextCursor: null` means end of list.
 * - `limit` is clamped to 50 so a misbehaving native client cannot pull the
 *   whole table in one call.
 *
 * Usage in a route:
 *   const { limit, cursor } = parseCursorPagination(req);
 *   // ...fetch limit+1 rows, then:
 *   res.json(cursorPage(rows, nextAnchor, (row) => ({ id: row.id, at: row.created_at })));
 */
export interface CursorPagination {
  limit: number;
  cursor: { anchor: string } | null;
}

export function parseCursorPagination(req: Request): CursorPagination {
  const parsed = cursorPaginationQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return { limit: 20, cursor: null };
  }
  // Cap is a clamp, not a rejection: a native client asking for 500 rows
  // still gets a valid page (50) instead of a 400.
  const limit = Math.min(parsed.data.limit, 50);
  const { cursor } = parsed.data;
  let anchor: string | null = null;
  if (cursor) {
    try {
      const decoded = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as {
        anchor?: unknown;
      };
      anchor = typeof decoded.anchor === "string" ? decoded.anchor : null;
    } catch {
      anchor = null;
    }
  }
  return { limit, cursor: anchor ? { anchor } : null };
}

/** Build the page envelope from raw rows + the anchor for the next page. */
export function cursorPage<T>(
  items: T[],
  nextAnchor: string | null,
): { items: T[]; nextCursor: string | null } {
  return {
    items,
    nextCursor: nextAnchor
      ? Buffer.from(JSON.stringify({ anchor: nextAnchor }), "utf8").toString("base64url")
      : null,
  };
}
