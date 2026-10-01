import { Router, Request, Response } from "express";
import { requireAuth, requireOwner } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";
import { generateVeerImage } from "../ai/image-gen";

/**
 * POST /api/ai/image — the Image Hub's drawing endpoint (owner request
 * 2026-10-02: "replace the mind console with agnes 2.1 flash and js to
 * generate image means it is image hub").
 *
 * Runs the ordered Agnes image chain (agnes-image-2.1-flash →
 * agnes-image-2.0-flash) through generateVeerImage and returns the picture
 * URL plus the model that drew it.
 *
 * OWNER-ONLY: the /mind-studio page is owner-gated client-side, and this
 * endpoint is the real boundary — the platform AGNES key must never be
 * burnable by the public. When the chain fails it answers 503 + reason so
 * the browser can retry the same prompt through puter.js (User-Pays).
 */
const router = Router();

router.post("/", rateLimit, requireAuth, requireOwner, async (req: Request, res: Response) => {
  const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";
  if (!prompt) {
    res.status(400).json({ error: "Prompt required" });
    return;
  }

  // Best-effort by contract: every failure path resolves to { reason }.
  const result = await generateVeerImage(prompt);

  if (result.url) {
    res.json({ url: result.url, model: result.model ?? null });
    return;
  }

  res.status(503).json({
    error: "Image engines unavailable",
    reason: result.reason ?? "all image models failed",
  });
});

export default router;
