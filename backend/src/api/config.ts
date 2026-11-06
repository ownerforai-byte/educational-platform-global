import { Router, Request, Response } from "express";
import { AI_MESSAGE_COST, DAILY_CREDIT_POOL } from "../utils/credits";
import { readSectionMinTiers } from "../utils/sectionTiers";

/**
 * Public runtime config — the platform flags the UI must mirror, with no auth.
 *
 * Publishes the pool constants plus owner-set section minimums. AI chat is
 * metered by AI sparks separately (see aiSpark.ts). The owner coin-gate flag is
 * gone: content access is decided by the tier section registry and SparkGate.
 *
 * Exposes nothing user-specific and nothing the billing behaviour does not
 * already reveal.
 */
const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    res.setHeader("Cache-Control", "no-store");
    res.json({
      dailyCreditPool: DAILY_CREDIT_POOL,
      aiMessageCost: AI_MESSAGE_COST,
      // Owner-set section minimums (sectionId → rung) — empty when the code
      // defaults rule. Public like the ladder itself; nothing user-specific.
      sectionMinTiers: await readSectionMinTiers(),
    });
  } catch (err) {
    console.error("[config] public config error:", err);
    res.status(500).json({ error: "Failed to load config" });
  }
});

export default router;
