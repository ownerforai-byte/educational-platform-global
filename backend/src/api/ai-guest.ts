import { Router, Request, Response } from "express";
import { serverError, ERROR_ID_HEADER, logServerError, newErrorId } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { rateLimit } from "../middleware/rateLimit";
import { buildProfessorContext, withProfessorContext } from "../ai/prompts";

/**
 * Guest AI chat (no account). Owner policy 2026-09-26:
 *   - 5 messages per guest per day (UTC day rollover at 12:00 AM)
 *   - tracked server-side per IP so clearing localStorage cannot buy more
 *
 * The response carries `remaining` + `limit` so the UI can display the
 * guest credit pool honestly.
 */

const router = Router();

/** Daily guest message allowance (the guest "credit pool"). */
export const GUEST_DAILY_LIMIT = Number(process.env.GUEST_DAILY_LIMIT) || 5;

interface GuestUsage {
  count: number;
  date: string; // UTC YYYY-MM-DD watermark
}

// IP → usage. Long-lived process guard trims stale days.
const guestUsage = new Map<string, GuestUsage>();

function todayUtc(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

function getClientId(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? typeof forwarded === "string"
      ? forwarded.split(",")[0]?.trim()
      : forwarded[0]?.trim()
    : req.ip ?? "unknown";
  return ip;
}

/**
 * Give back the message a failed attempt consumed: the student was never
 * answered, so charging the pool for it would be dishonest (timeouts and
 * 5xx both roll back; a 402/400 happens before the increment anyway).
 */
function rollbackGuestUsage(req: Request): void {
  const entry = guestUsage.get(getClientId(req));
  if (entry && entry.date === todayUtc() && entry.count > 0) entry.count -= 1;
}

function getGuestUsage(req: Request): GuestUsage {
  const id = getClientId(req);
  const today = todayUtc();
  const entry = guestUsage.get(id);
  if (!entry || entry.date !== today) {
    const fresh: GuestUsage = { count: 0, date: today };
    guestUsage.set(id, fresh);
    return fresh;
  }
  return entry;
}

// Keep the map bounded: drop yesterday's entries once it grows.
setInterval(() => {
  if (guestUsage.size > 5000) {
    const today = todayUtc();
    for (const [key, entry] of guestUsage) {
      if (entry.date !== today) guestUsage.delete(key);
    }
  }
}, 60 * 60 * 1000).unref();

let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

router.post("/", rateLimit, async (req: Request, res: Response) => {
  let counted = false;
  try {
    const body = req.body;
    const messages: AIChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const provider: string = typeof body?.provider === "string" ? body.provider : "";

    if (!messages.length) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    // ── Guest daily pool: 5 messages/day, resets at 12:00 AM (UTC) ──
    const usage = getGuestUsage(req);
    if (usage.count >= GUEST_DAILY_LIMIT) {
      res.status(402).json({
        error: "Daily guest limit reached",
        remaining: 0,
        limit: GUEST_DAILY_LIMIT,
        message:
          "You've used all 5 free guest messages for today. Your pool resets to 5 at 12:00 AM — or sign in to get 8 daily credits and saved chat histories.",
      });
      return;
    }
    usage.count += 1;
    counted = true;
    const remaining = Math.max(0, GUEST_DAILY_LIMIT - usage.count);

    const aiService = getService();

    // Professor mode: plain-text enforcement + live web results (best-effort).
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const professorContext = await buildProfessorContext(lastUser);
    const augmented = withProfessorContext(messages, professorContext) as AIChatMessage[];

    // "" runs the ordered chain (agnes → openrouter → internal).
    const response = await aiService.chat(provider, augmented);
    res.json({
      response,
      provider: provider || aiService.getLastAnsweredBy(),
      remaining,
      limit: GUEST_DAILY_LIMIT,
    });
  } catch (err: any) {
    console.error("AI guest chat error:", err);
    // The attempt failed → the guest didn't get an answer, so return the
    // consumed message first.
    if (counted) rollbackGuestUsage(req);
    // Slow-provider timeout → retryable 504 with a human message, not a
    // generic 500 (the "Internal Server Error" console report 2026-09-26).
    const message = String(err?.message ?? "");
    if (/timeout|timed out|deadline/i.test(message)) {
      const errorId = newErrorId();
      logServerError(err, errorId, "POST /api/ai/guest");
      res.setHeader(ERROR_ID_HEADER, errorId);
      res.status(504).json({
        error: "The AI took too long to answer. Please try again in a moment.",
        errorId,
      });
      return;
    }
    serverError(res, err);
  }
});

export default router;
