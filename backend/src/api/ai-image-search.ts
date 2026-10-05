import { Router, Request, Response } from "express";
import { requireAuth, requireOwnerEmail } from "../middleware/auth";
import {
  fetchGoogleDiagrams,
  googleDiagramsEnabled,
  hostOf,
} from "../ai/google-diagrams";

/**
 * GET /api/ai/image-search?q=… — present Google Images results DIRECTLY in
 * the Image Hub (owner request 2026-10-04: "the image produced are too low,
 * so direct presenting from google is best").
 *
 * Reuses the sanctioned Google Programmable Search client that already powers
 * the chat's visual-reference step (`ai/google-diagrams.ts`) — same key gate,
 * same quiet degradation:
 *
 *   · no GOOGLE_CSE_API_KEY + GOOGLE_CSE_CX → `{ configured: false }`, so the
 *     hub can offer the plain Google Images deep link instead of pretending;
 *   · Google answers → `{ configured: true, results }` with everything the
 *     details interface shows: full-size url, source page, host, title,
 *     description snippet and pixel size;
 *   · quota/network failure → 503 (the hub keeps the query and says so).
 *
 * `requireRelevance: false` is deliberate: Google's own query ranking already
 * matched the search, so the strict word filter used by the chat's reference
 * path would only drop good pictures whose titles word it differently.
 *
 * Auth + owner gate + the ai-image rate-limit tier keep the daily CSE quota
 * (100/day free) from being drained by one session.
 */
const router = Router();

/** CSE returns at most 10 items per request (`num` is capped at 10). */
const MAX_RESULTS = 10;

/** Search words (3+ chars) — kept for a relevance sanity filter only. */
function termsOf(query: string): string[] {
  return query.toLowerCase().split(/\s+/).filter((word) => word.length >= 3);
}

router.get("/", requireAuth, requireOwnerEmail, async (req: Request, res: Response) => {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  if (!q) {
    res.status(400).json({ error: "q required" });
    return;
  }

  if (!googleDiagramsEnabled()) {
    // Typed, honest answer — the hub renders the "not configured yet" notice
    // with a direct Google Images link rather than an empty silent grid.
    res.json({ configured: false, results: [] });
    return;
  }

  try {
    const rawLimit = Number(req.query.limit);
    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(Math.trunc(rawLimit), 1), MAX_RESULTS)
      : 8;

    const results = await fetchGoogleDiagrams(q, termsOf(q), limit, {
      requireRelevance: false,
    });

    res.json({
      configured: true,
      results: results.map((image) => ({
        url: image.url,
        page: image.page,
        host: hostOf(image.page || image.url),
        title: image.title,
        snippet: image.snippet ?? "",
        width: image.width,
        height: image.height,
        // Grid thumbnail (the details view always uses the full-size url).
        thumb: image.thumb ?? "",
      })),
    });
  } catch (err) {
    console.warn(
      "[ImageSearch] Google unavailable:",
      err instanceof Error ? err.message : err,
    );
    res.status(503).json({ error: "Google image search is unavailable right now" });
  }
});

export default router;
