import { Router, Request, Response } from "express";
import { serverError, ERROR_ID_HEADER, logServerError, newErrorId } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { rateLimit } from "../middleware/rateLimit";
import { buildProfessorContext, withProfessorContext } from "../ai/prompts";
import { completeAnswer } from "../ai/complete-answer";
import { imageInstruction, sanitizeChatImages } from "../ai/image-input";
import { withFigureToolInstruction, resolveFiguresInText } from "../ai/image-gen";
import { openSseChannel, streamAnswerToStudent, type StreamState } from "./ai-stream";
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
  // Shared with the SSE pipeline: true as soon as ANY character or figure
  // placeholder reached the guest, which decides rollback-vs-keep on failure.
  const streamState: StreamState = { streamedAny: false };
  try {
    const body = req.body;
    const messages: AIChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const provider: string = typeof body?.provider === "string" ? body.provider : "";
    const stream: boolean = body?.stream === true;

    if (!messages.length) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    // Photo input (camera / gallery) — same validation as the authed route.
    const { images, rejected: rejectedImages } = sanitizeChatImages(body?.images);
    if (images.length) {
      const lastUserIdx = messages.map((m) => m.role).lastIndexOf("user");
      if (lastUserIdx >= 0) {
        messages[lastUserIdx] = { ...messages[lastUserIdx], images };
      }
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

    // ── The live channel opens BEFORE the slow research step ──
    // Grounding runs multi-engine web search (~15-20s). Opening the SSE
    // response here keeps the guest connected — and shows live status —
    // instead of leaving a pending request that then dumps the whole answer.
    const channel = stream ? openSseChannel(res) : null;
    channel?.send({ phase: "searching", label: "Researching the topic…" });

    // Professor mode: plain-text enforcement + live web results (best-effort).
    // The recent thread rides along so a follow-up is grounded on the topic the
    // guest is actually on, exactly as in the authed chat.
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const conversationTail = messages
      .slice(-6)
      .filter((m) => m.content && m.content !== lastUser)
      .map((m) => m.content.slice(0, 600))
      .join(" \n ");
    let baseContext = await buildProfessorContext(lastUser, conversationTail);
    if (images.length) baseContext += `\n\n${imageInstruction(images.length)}`;
    const professorContext = withFigureToolInstruction(baseContext);
    const augmented = withProfessorContext(messages, professorContext) as AIChatMessage[];

    // Live streaming: the connection is already open (above); the pipeline is
    // shared with the signed-in route so a guest gets the identical stream.
    if (stream && channel) {
      const outcome = await streamAnswerToStudent({
        channel,
        service: aiService,
        provider,
        messages: augmented,
        logLabel: "[AI guest stream]",
        doneExtras: { remaining, limit: GUEST_DAILY_LIMIT },
        state: streamState,
      });
      if (outcome.status === "failed" && consumed && !streamState.streamedAny) {
        // Nothing reached the guest → return the consumed message slot.
        await rollbackGuestSlot(ip, deviceId).catch(() => {});
      }
      channel.end();
      return;
    }

    // "" runs the ordered chain (agnes → internal).
    //
    // Server-side answer completion (owner 2026-09-29/30): the guest path gets
    // the EXACT same repair the authed path gets — truncation repair first (a
    // cut answer used to ship silently), then the 150-word depth-scaled floor.
    // Guests must not receive a weaker answer than signed-in students.
    const completed = await completeAnswer({
      chat: (turn) => aiService.chat(provider, turn),
      finishReason: () => aiService.getLastFinishReason(),
      messages: augmented,
      tail: augmented.slice(-6),
      question: lastUser,
    });
    if (completed.notes.length) {
      console.info(`[AI] guest reply repair: ${completed.notes.join("; ")}`);
    }
    // Guest answers draw figures too (the server engine is free for the app;
    // the browser puter.js fallback covers a dead Agnes key on their side).
    const { text: guestResponse, figures: guestFigures } = await resolveFiguresInText(completed.text);
    res.json({
      response: guestResponse,
      generatedFigures: guestFigures.map((f) => ({ prompt: f.prompt, url: f.url, reason: f.reason })),
      provider: provider || aiService.getLastAnsweredBy(),
      remaining,
      limit: GUEST_DAILY_LIMIT,
      replyFloor: {
        floor: completed.floor,
        words: completed.words,
        expanded: completed.expanded,
        continued: completed.continued,
        continuations: completed.continuations,
      },
      images: { accepted: images.length, rejected: rejectedImages },
    });
  } catch (err: any) {
    console.error("AI guest chat error:", err);
    // The attempt failed → the guest never got an answer, so return the
    // consumed message first (best-effort). A stream that already painted
    // partial text did deliver, so its slot stays consumed.
    if (consumed && !streamState.streamedAny) {
      await rollbackGuestSlot(ip, deviceId).catch(() => {});
    }
    // The SSE channel opens before the research step, so the response may
    // already be mid-stream: an error frame + close is all that is left (a
    // JSON status would throw ERR_HTTP_HEADERS_SENT), and the guest must not
    // be left waiting on a silent connection.
    if (res.headersSent) {
      const errorId = newErrorId();
      logServerError(err, errorId, "POST /api/ai/guest");
      if (!res.writableEnded) {
        res.write(
          `event: error\ndata: ${JSON.stringify({ error: "AI request failed", errorId })}\n\n`,
        );
        res.end();
      }
      return;
    }
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
