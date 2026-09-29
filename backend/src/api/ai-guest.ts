import { Router, Request, Response } from "express";
import { serverError, ERROR_ID_HEADER, logServerError, newErrorId } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { rateLimit } from "../middleware/rateLimit";
import { buildProfessorContext, withProfessorContext } from "../ai/prompts";
import { enforceReplyFloor, floorWordsForQuestion } from "../ai/syllabus-anchor";
import {
  GUEST_DAILY_LIMIT,
  consumeGuestSlot,
  getGuestDeviceId,
  issueGuestDeviceCookie,
  rollbackGuestSlot,
  startGuestQuotaCleanup,
} from "../utils/guestQuota";
import { DAILY_CREDIT_POOL } from "../utils/credits";

/**
 * Guest AI chat (no account). Owner policy 2026-09-26:
 *   - 2 messages per guest per day (UTC day rollover at 12:00 AM)
 *   - enforced server-side by utils/guestQuota (DB-backed, hashed IP), so
 *     clearing localStorage, restarting the server, or switching tabs
 *     cannot buy more
 *
 * The response carries `remaining` + `limit` so the UI can display the
 * guest credit pool honestly.
 */

const router = Router();

// Install the hourly quota trim once, at app boot.
startGuestQuotaCleanup();

function getClientId(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? typeof forwarded === "string"
      ? forwarded.split(",")[0]?.trim()
      : forwarded[0]?.trim()
    : req.ip ?? "unknown";
  return ip;
}

let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

router.post("/", rateLimit, async (req: Request, res: Response) => {
  const ip = getClientId(req);
  // Dual identity: the HttpOnly device cookie (minted here on first contact)
  // AND the IP must BOTH have quota left — clearing one never refills the
  // other (see utils/guestQuota for the full threat model).
  const deviceId = getGuestDeviceId(req) ?? issueGuestDeviceCookie(res);
  let consumed = false;
  try {
    const body = req.body;
    const messages: AIChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const provider: string = typeof body?.provider === "string" ? body.provider : "";

    if (!messages.length) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    // ── Guest daily pool: 2 messages/day, resets at 12:00 AM (UTC) ──
    const slot = await consumeGuestSlot(ip, deviceId);
    if (slot.status === "limited") {
      res.status(402).json({
        error: "Daily guest limit reached",
        remaining: 0,
        limit: GUEST_DAILY_LIMIT,
        message:
          `You've used all ${GUEST_DAILY_LIMIT} free guest messages for today. Your pool resets to ${GUEST_DAILY_LIMIT} at 12:00 AM — or sign in to get ${DAILY_CREDIT_POOL} daily credits and saved chat histories.`,
      });
      return;
    }
    if (slot.status === "unavailable") {
      res.status(503).json({
        error: "Guest chat is temporarily unavailable. Please try again in a moment.",
      });
      return;
    }
    consumed = true;
    const remaining = slot.remaining;

    const aiService = getService();

    // Professor mode: plain-text enforcement + live web results (best-effort).
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const professorContext = await buildProfessorContext(lastUser);
    const augmented = withProfessorContext(messages, professorContext) as AIChatMessage[];

    // "" runs the ordered chain (agnes → openrouter → internal).
    const rawResponse = await aiService.chat(provider, augmented);
    // Server-side reply floor (owner requirement 2026-09-29): same guarantee
    // as the authed chat — one expansion retry when a reply lands below the
    // 150-word minimum (scaled up with question depth).
    const floor = floorWordsForQuestion(lastUser);
    const floored = await enforceReplyFloor(rawResponse, floor, async (request) => {
      const convoTail = augmented.slice(-6);
      return aiService.chat(provider, [
        ...convoTail,
        { role: "assistant" as const, content: rawResponse },
        { role: "user" as const, content: request },
      ]);
    });
    res.json({
      response: floored.answer,
      provider: provider || aiService.getLastAnsweredBy(),
      remaining,
      limit: GUEST_DAILY_LIMIT,
      replyFloor: { floor: floored.floor, words: floored.words, expanded: floored.expanded },
    });
  } catch (err: any) {
    console.error("AI guest chat error:", err);
    // The attempt failed → the guest never got an answer, so return the
    // consumed message first (best-effort).
    if (consumed) await rollbackGuestSlot(ip, deviceId).catch(() => {});
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
