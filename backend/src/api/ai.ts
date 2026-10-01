import { Router, Request, Response } from "express";
import { serverError, ERROR_ID_HEADER } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { requireAuth } from "../middleware/auth";
import { hasFullAccess } from "../middleware/auth";
import { ensureDailyCredits, spendCredits, refundCredits, AI_MESSAGE_COST, DAILY_CREDIT_POOL } from "../utils/credits";
import { supabaseAdmin } from "../db/supabase";
import { logServerError, newErrorId } from "../middleware/errors";
import { buildProfessorContext, withProfessorContext } from "../ai/prompts";
import { completeAnswer } from "../ai/complete-answer";
import { imageInstruction, sanitizeChatImages } from "../ai/image-input";
import { withFigureToolInstruction, resolveFiguresInText } from "../ai/image-gen";
import { openSseChannel, streamAnswerToStudent, type StreamState } from "./ai-stream";

const router = Router();

// Lazy init: create service on first request so dotenv has already loaded
// env vars (AGNES_API_KEY, etc.).
let _service: ReturnType<typeof createAIService> | null = null;
function getService() {
  if (!_service) _service = createAIService();
  return _service;
}

// List available providers (no auth required)
router.get("/providers", (_req: Request, res: Response) => {
  const aiService = getService();
  const providers = aiService.getProviders();
  const defaultProvider = aiService.getDefaultProvider();
  res.json({ providers, defaultProvider });
});

router.post("/", requireAuth, async (req: Request, res: Response) => {
  // Set once the 1-credit message fee has been captured — refunded on any
  // failure path below so the student never pays for an answer they never
  // received (the "charged but got a 500" weak point).
  let billedUserId: string | null = null;
  // Shared with the SSE pipeline: true as soon as ANY character or figure
  // placeholder reached the student, which decides refund-vs-keep on failure.
  const streamState: StreamState = { streamedAny: false };
  try {
    const body = req.body;
    let messages: AIChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const provider: string = typeof body?.provider === "string" ? body.provider : "";
    const stream: boolean = body?.stream === true;

    if (!messages.length) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    // Photo input (camera / gallery): validated and capped, attached to the
    // latest user turn. Invalid or oversized photos are dropped (counted in
    // the response) rather than failing the whole request.
    const { images, rejected: rejectedImages } = sanitizeChatImages(body?.images);
    if (images.length) {
      const lastUserIdx = messages.map((m) => m.role).lastIndexOf("user");
      if (lastUserIdx >= 0) {
        messages[lastUserIdx] = { ...messages[lastUserIdx], images };
      }
    }

    // ── Daily pool + 1-credit-per-message billing (owner policy) ──
    const user = (req as unknown as { user?: { id: string; email?: string; role?: string | null } }).user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { data: prof } = await supabaseAdmin
      .from("profiles")
      .select("role, premium_status")
      .eq("id", user.id)
      .maybeSingle();
    const privileged = hasFullAccess(
      ((prof?.role as string | undefined) ?? user.role ?? "").toUpperCase() || null,
      prof?.premium_status ?? false,
    );

    let creditsLeft: number | null = null;
    if (!privileged) {
      // Lazy midnight reset: first AI call of the day refills the pool.
      const ensured = await ensureDailyCredits(user.id, user.email, prof?.role as string | null, prof?.premium_status);
      const remaining = await spendCredits(
        user.id,
        AI_MESSAGE_COST,
        "Veer tutor message",
      );
      if (remaining === null) {
        res.status(402).json({
          error: "Insufficient credits",
          required: AI_MESSAGE_COST,
          current: ensured.credits === Infinity ? 0 : ensured.credits,
          message: `You've used all ${DAILY_CREDIT_POOL} credits of today's daily pool. It resets to ${DAILY_CREDIT_POOL} credits at 12:00 AM — or go PRO with no daily cap.`,
        });
        return;
      }
      billedUserId = user.id;
      creditsLeft = remaining;
    }

    const aiService = getService();

    // ── The live channel opens BEFORE the slow research step ──
    // Grounding runs multi-engine web search and takes ~15-20s. Opening the
    // SSE response here means the browser is already connected and can show
    // live status during that wait; previously the headers waited for the
    // research to finish, so the student stared at a frozen spinner and then
    // the answer appeared to land all at once.
    const channel = stream ? openSseChannel(res) : null;
    channel?.send({ phase: "searching", label: "Researching the topic…" });

    // Professor mode: enforce plain-text style + inject live web results
    // for the student's latest question (Google CSE, timeout-protected).
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    // The recent thread (minus the current message) identifies the topic for
    // retrieval and grounding, so a follow-up gets the same depth as the
    // question that opened it instead of a from-memory answer.
    const conversationTail = messages
      .slice(-6)
      .filter((m) => m.content && m.content !== lastUser)
      .map((m) => m.content.slice(0, 600))
      .join(" \n ");
    let baseContext = await buildProfessorContext(lastUser, conversationTail);
    if (images.length) baseContext += `\n\n${imageInstruction(images.length)}`;
    // Figure tool: when enabled the model may draw one live figure at the end
    // of its answer (see image-gen.ts) — the instruction explains the fence.
    const professorContext = withFigureToolInstruction(baseContext);
    messages = withProfessorContext(messages, professorContext) as AIChatMessage[];

    // Live streaming: the connection is already open (above); the pipeline —
    // token-level fence filtering, streamed truncation repair, figure drawing —
    // lives in ai-stream.ts so the guest route streams byte-identically.
    if (stream && channel) {
      const outcome = await streamAnswerToStudent({
        channel,
        service: aiService,
        provider,
        messages,
        logLabel: "[AI stream]",
        doneExtras: { credits: creditsLeft ?? undefined },
        state: streamState,
      });
      if (outcome.status === "failed" && billedUserId && !streamState.streamedAny) {
        // Nothing reached the student → the 1-credit fee goes back.
        await refundCredits(
          billedUserId,
          AI_MESSAGE_COST,
          "Refund: AI reply failed (stream)",
        ).catch(() => {});
      }
      channel.end();
      return;
    }

    // Server-side answer completion (owner requirements 2026-09-29/30): the
    // reply is repaired for TRUNCATION first — a sentence that stops mid-clause
    // is the worst failure mode and used to ship silently — and only then
    // raised to the 150-word depth-scaled floor. Enforced in code, not prompted.
    const completed = await completeAnswer({
      chat: (turn) => aiService.chat(provider, turn),
      finishReason: () => aiService.getLastFinishReason(),
      messages,
      tail: messages.slice(-6),
      question: lastUser,
    });
    if (completed.notes.length) {
      console.info(`[AI] reply repair: ${completed.notes.join("; ")}`);
    }
    // Figure fences -> drawn pictures (or an honest inline note on failure).
    const { text: response, figures } = await resolveFiguresInText(completed.text);
    res.json({
      response,
      generatedFigures: figures.map((f) => ({ prompt: f.prompt, url: f.url, reason: f.reason })),
      provider: provider || aiService.getLastAnsweredBy(),
      credits: creditsLeft ?? undefined,
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
    console.error("AI chat error:", err);
    // The answer never reached the student → give the 1-credit fee back before
    // answering with an error status. A stream that already painted partial
    // text is the service being paid for, so it keeps the fee.
    if (billedUserId && !streamState.streamedAny) {
      await refundCredits(billedUserId, AI_MESSAGE_COST, "Refund: AI reply failed").catch(() => {});
    }
    // The SSE channel opens before the research step, so the response may
    // already be mid-stream: send an error frame (a JSON status would throw
    // ERR_HTTP_HEADERS_SENT) and close, or the student waits on a silent
    // connection forever.
    if (res.headersSent) {
      const errorId = newErrorId();
      logServerError(err, errorId, "POST /api/ai");
      if (!res.writableEnded) {
        res.write(
          `event: error\ndata: ${JSON.stringify({ error: "AI request failed", errorId })}\n\n`,
        );
        res.end();
      }
      return;
    }
    // Budget-exhaustion/timeouts are a slow-provider condition, not a server
    // bug — answer with a retryable 504 + a human message instead of the
    // generic "Internal server error" (the 2026-09-26 console report).
    const message = String(err?.message ?? "");
    if (/timeout|timed out|deadline/i.test(message)) {
      const errorId = newErrorId();
      logServerError(err, errorId, "POST /api/ai");
      res.setHeader(ERROR_ID_HEADER, errorId);
      res
        .status(504)
        .json({
          error: "The AI took too long to answer. Please try again in a moment.",
          errorId,
        });
      return;
    }
    serverError(res, err);
  }
});

export default router;
