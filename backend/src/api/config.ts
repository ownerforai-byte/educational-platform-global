import { Router, Request, Response } from "express";
import { AI_MESSAGE_COST, DAILY_CREDIT_POOL, isCoinGateEnabled } from "../utils/credits";

/**
 * Public runtime config — the platform flags the UI must mirror, with no auth.
 *
 * Why this exists (owner report 2026-10-03: "coin gate on/off not working"):
 * the coin gate is an owner-only setting (`settings.coin_gate_enabled`).
 * Turning it OFF makes AI chat free for owner emails (students still pay),
 * and the server honors it — but the chat surfaces only ever looked at the
 * user's credit balance, so owners at 0 credits stayed locked out no matter
 * what the toggle said. This endpoint publishes the flag (plus the pool
 * constants the copy already quotes) so owner clients lock only when the
 * gate is actually ON.
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
    });
  } catch (err) {
    console.error("[config] public config error:", err);
    res.status(500).json({ error: "Failed to load config" });
  }
});

export default router;
