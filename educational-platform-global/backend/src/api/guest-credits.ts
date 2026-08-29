import { Router, Request, Response } from "express";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

// Guest credits stored in-memory (reset on restart — persistent storage can be added later)
const GUEST_CREDITS_KEY = "guest_credits";
const DEFAULT_GUEST_CREDITS = 50;
const AI_CHAT_COST = 2; // cost per AI chat for guests

function getGuestIp(req: Request): string {
  return (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
    ?? req.socket.remoteAddress ?? "unknown";
}

function getGuestCreditsStore(): Map<string, number> {
  const store = req.app.locals[GUEST_CREDITS_KEY] as Map<string, number> | undefined;
  if (!store) {
    const newStore = new Map<string, number>();
    req.app.locals[GUEST_CREDITS_KEY] = newStore;
    return newStore;
  }
  return store;
}

// GET /api/guest/credits — returns current guest credit balance
router.get("/", rateLimit, (req: Request, res: Response) => {
  const ip = getGuestIp(req);
  const store = getGuestCreditsStore();
  const credits = store.get(ip) ?? DEFAULT_GUEST_CREDITS;
  res.json({ credits, ip_hash: Buffer.from(ip).toString("base64").slice(0, 8) });
});

// POST /api/guest/credits/spend — spend credits (called when guest uses AI)
router.post("/spend", rateLimit, (req: Request, res: Response) => {
  const ip = getGuestIp(req);
  const store = getGuestCreditsStore();
  const current = store.get(ip) ?? DEFAULT_GUEST_CREDITS;
  const cost = req.body?.cost ?? AI_CHAT_COST;

  if (current < cost) {
    res.status(402).json({
      error: "Insufficient guest credits",
      required: cost,
      current,
      message: "Guest credits exhausted. Sign in to get more credits.",
    });
    return;
  }

  store.set(ip, current - cost);
  res.json({ success: true, remaining: current - cost });
});

// POST /api/guest/credits/reset — reset guest credits (for testing)
router.post("/reset", rateLimit, (req: Request, res: Response) => {
  const ip = getGuestIp(req);
  const store = getGuestCreditsStore();
  store.set(ip, DEFAULT_GUEST_CREDITS);
  res.json({ success: true, credits: DEFAULT_GUEST_CREDITS });
});

export default router;
