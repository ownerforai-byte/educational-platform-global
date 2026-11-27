import { Router, type Request, type Response } from "express";
import { requireAuth, type AuthedRequest } from "../../middleware/auth.js";
import { reserveCommunityAiReply } from "../../middleware/rateLimit.js";
import { curateNotes, type CuratePlace } from "../../ai/curate-notes.js";

/**
 * POST /api/ai/curate-notes — the AI behind the one-tap "Curate my notes"
 * block (owner 2026-11-09). Place in, 20–80 Agnes-curated bullet points out.
 *
 * SECURITY: Agnes is reached server-side with AGNES_API_KEY (see
 * `ai/config.ts` — presence is never logged beyond booleans and the key is
 * never echoed). This endpoint returns NOTES TEXT ONLY — no key, no provider
 * config, no upstream detail beyond the provider name.
 */
const router = Router();

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

router.post("/", requireAuth, async (req: Request, res: Response) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const raw = (body.place ?? {}) as Record<string, unknown>;

  const place: CuratePlace = {
    surface: clean(raw.surface, 40) || "veer-chat",
    classLevel: clean(raw.classLevel, 40) || undefined,
    subject: clean(raw.subject, 60) || undefined,
    chapter: clean(raw.chapter, 80) || undefined,
    topic: clean(raw.topic, 100) || undefined,
  };

  try {
    const user = (req as AuthedRequest).user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (!(await reserveCommunityAiReply(user.id))) {
      res.setHeader("Cache-Control", "no-store");
      res.status(429).json({ error: "AI budget exhausted. Try again later." });
      return;
    }
    const notes = await curateNotes(place);
    res.setHeader("Cache-Control", "no-store");
    res.json(notes);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // Agnes-not-configured is a deployment state, not an outage — say so.
    if (message.includes("AGNES_API_KEY")) {
      res.status(503).json({
        error: "Curated notes are not set up on this deployment yet (Agnes key missing).",
      });
      return;
    }
    console.error("[curate-notes] Agnes call failed:", message);
    res.status(502).json({ error: "Agnes could not curate notes right now. Try again." });
  }
});

export default router;
