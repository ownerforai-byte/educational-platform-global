import { Router, Request, Response } from "express";
import { AI_MESSAGE_COST, DAILY_CREDIT_POOL, isCoinGateEnabled } from "../utils/credits";
import { readSectionMinTiers } from "../utils/sectionTiers";

/**
 * Public runtime config — the platform flags the UI must mirror, with no auth.
 *
 * Publishes the owner content-spark toggle (`settings.coin_gate_enabled`) plus
 * pool constants. AI chat is metered by AI sparks separately (see aiSpark.ts).
 *
 * Exposes nothing user-specific and nothing the billing behaviour does not
 * already reveal.
 */
const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    res.setHeader("Cache-Control", "no-store");
    res.json({
      coinGateEnabled: await isCoinGateEnabled(),
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
