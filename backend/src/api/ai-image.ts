import { Router, Request, Response } from "express";
import { requireAuth, requireOwnerEmail } from "../middleware/auth";
import { generateVeerImage } from "../ai/image-gen";
import { saveImageHistoryRow } from "./ai-image-history";
import { asyncHandler } from "../middleware/asyncHandler";

/**
 * POST /api/ai/image — the Image Hub's drawing endpoint (owner request
 * 2026-10-02: "replace the mind console with agnes 2.1 flash and js to
 * generate image means it is image hub").
 *
 * Runs the ordered Agnes image chain (agnes-image-2.1-flash →
 * agnes-image-2.0-flash) through generateVeerImage and returns the picture
 * URL plus the model that drew it.
 *
 * OWNER EMAILS ONLY (owner request 2026-10-05: "make the image hub under
 * owner emails only"): `requireAuth` + `requireOwnerEmail` — any signed-in
 * non-owner email gets a 403 and never burns the platform AGNES key. The
 * ai-image rate-limit tier stays as the second layer, and when the chain
 * fails the endpoint answers 503 + reason so the browser retries the same
 * prompt through puter.js (User-Pays — the platform pays nothing for that
 * attempt).
 *
 * Every successful draw is SAVED to the user's image history on the server
 * (hardcoded) — best-effort, so a history failure can never cost the owner
 * their picture.
 */
const router = Router();

router.post("/", requireAuth, requireOwnerEmail, asyncHandler(async (req: Request, res: Response) => {
  const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";
  if (!prompt) {
    res.status(400).json({ error: "Prompt required" });
    return;
  }

  // Best-effort by contract: every failure path resolves to { reason }.
  const result = await generateVeerImage(prompt);

  if (result.url) {
    const user = (req as Request & { user: { id: string } }).user;
    await saveImageHistoryRow(user.id, {
      kind: "picture",
      prompt,
      url: result.url,
      engine: result.model ?? "agnes-image-2.1-flash",
    });
    res.json({ url: result.url, model: result.model ?? null });
    return;
  }

  res.status(503).json({
    error: "Image engines unavailable",
    reason: result.reason ?? "all image models failed",
  });
}));

export default router;
