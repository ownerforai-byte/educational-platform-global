import { Router, Request, Response } from "express";
import { serverError, ERROR_ID_HEADER } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { requireAuth, requireOwnerEmail } from "../middleware/auth";
// (Owner-policy 2026-10-12: free chat — no auth-email or DB lookups needed
// here any more; requireOwnerEmail already gates the route.)
import { logServerError, newErrorId } from "../middleware/errors";
import { appendConsoleRules, buildProfessorContext, withProfessorContext } from "../ai/prompts";
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

router.post("/", requireAuth, requireOwnerEmail, async (req: Request, res: Response) => {
  // Veer chat is FREE (owner policy 2026-10-12): there is no message fee, so
  // no billed-user bookkeeping and no refund path exist any more. The
  // streamState flag survives only to know whether the student saw anything.
  const streamState: StreamState = { streamedAny: false };
  try {
    const body = req.body;
    let messages: AIChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const provider: string = typeof body?.provider === "string" ? body.provider : "";
    const stream: boolean = body?.stream === true;
    // Optional dedicated console id ("nepali" | "grammar"); unknown ids are
    // ignored by appendConsoleRules.
    const consoleId: string = typeof body?.console === "string" ? body.console : "";

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

    // ── Veer chat is FREE (owner decision 2026-10-12) ──
    // "Veer chat and everything else are free — no AI spark is ever spent."
    // The AI spark shown at the top of the chat is an informational daily
    // counter only; nothing here reads or writes any balance. Content sparks
    // are spent exclusively on actual note/content unlocks (api/user.ts).
    const user = (req as unknown as { user?: { id: string; email?: string; role?: string | null } }).user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    // FREE CHAT: no billing block at all. Veer never deducts a spark, for any
    // account class — students, owners, PRO or guest (owner policy 2026-10-12:
    // "Veer chat and everything else are free — no AI spark is ever spent").
    // The `credits` field stays in the response as undefined so older clients
    // keep parsing; the AI spark badge is informational only.
    const creditsLeft: number | null = null;

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
    // Console rules (pure Nepali / grammar) go LAST — after the figure tool —
    // so they are the final word on language/scope.
    const professorContext = appendConsoleRules(
      withFigureToolInstruction(baseContext),
      consoleId,
    );
    if (consoleId) console.info(`[AI] console=${consoleId} authed`);
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
    // FREE CHAT: nothing to refund — the student was never charged.
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
