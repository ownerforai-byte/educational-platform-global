import { Router, Request, Response } from "express";
import { createAIService, type AIChatMessage } from "../ai/service";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

// Track guest chat counts by IP (in-memory, resets on restart)
const guestChats = new Map<string, number>();
const GUEST_MAX = 7;
const GUEST_AI_COST = 2; // credits per AI chat

function getGuestIp(req: Request): string {
  return (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
    ?? req.socket.remoteAddress ?? "unknown";
}

function getGuestCount(ip: string): number {
  return guestChats.get(ip) ?? 0;
}

function incGuestCount(ip: string): void {
  guestChats.set(ip, (getGuestCount(ip) ?? 0) + 1);
}

function getGuestCredits(ip: string): number {
  const store = (req.app.locals.guest_credits as Map<string, number>) ?? new Map();
  return store.get(ip) ?? 50; // default 50 guest credits
}

function setGuestCredits(ip: string, credits: number): void {
  if (!req.app.locals.guest_credits) {
    req.app.locals.guest_credits = new Map();
  }
  req.app.locals.guest_credits.set(ip, credits);
}

// Lazy init: create service on first request so .env is already loaded
let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

// GET /api/guest/credits/status — check guest credit balance
router.get("/credits", rateLimit, (req: Request, res: Response) => {
  const ip = getGuestIp(req);
  const credits = getGuestCredits(ip);
  const count = getGuestCount(ip);
  res.json({ credits, messagesUsed: count, messagesRemaining: GUEST_MAX - count });
});

router.post("/", rateLimit, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const messages: AIChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const provider: string = typeof body?.provider === "string" ? body.provider : "";

    if (!messages.length) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    const ip = getGuestIp(req);
    const count = getGuestCount(ip);
    const credits = getGuestCredits(ip);

    if (count >= GUEST_MAX) {
      res.status(429).json({
        error: "Message limit reached",
        limit: GUEST_MAX,
        messagesUsed: count,
        message: "You've used all guest messages. Sign in or create an account to continue chatting with the AI assistant.",
      });
      return;
    }

    if (credits < GUEST_AI_COST) {
      res.status(402).json({
        error: "Insufficient guest credits",
        required: GUEST_AI_COST,
        current: credits,
        message: "Guest credits exhausted. Sign in to get more credits.",
      });
      return;
    }

    incGuestCount(ip);
    setGuestCredits(ip, credits - GUEST_AI_COST);
    const aiService = getService();

    const response = await aiService.chat(provider || aiService.getDefaultProvider(), messages);
    res.json({
      response,
      provider: provider || aiService.getDefaultProvider(),
      remaining: GUEST_MAX - count - 1,
      creditsRemaining: credits - GUEST_AI_COST,
    });
  } catch (err: any) {
    console.error("AI guest chat error:", err);
    res.status(500).json({ error: err.message || "AI request failed" });
  }
});

export default router;
