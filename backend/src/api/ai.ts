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
import {
  detectTruncation,
  describeVerdict,
  continuationRequest,
  joinContinued,
  MAX_CONTINUATIONS,
} from "../ai/truncation";
import { imageInstruction, sanitizeChatImages } from "../ai/image-input";
import {
  FigureStreamFilter,
  generateVeerImage,
  withFigureToolInstruction,
  resolveFiguresInText,
} from "../ai/image-gen";

const router = Router();

// Lazy init: create service on first request so dotenv has already loaded
// env vars (AGNES_API_KEY, OPENROUTER_API_KEY, etc.).
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

    // Handle streaming
    if (stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      // Declared before the `try` so the `catch` below can tell "nothing
      // reached the student" (refund) from "a partial answer already showed"
      // (keep the credit) after a mid-stream failure.
      let streamedAny = false;
      let figureSeq = 0;
      try {
        // LIVE streaming (owner 2026-09-30): deltas reach the student as the
        // provider generates them — the agent-working feel, and long answers
        // no longer sit behind a single response. Provider selection follows
        // the ordered chain exactly like the non-stream path.
        let acc = "";
        let continued = 0;
        // Figure fences are filtered OUT of the content the student sees;
        // each one becomes an imageStart -> imageSuccess/imageFailed event
        // pair, and the answer continues after the picture (owner 2026-09-30:
        // "write -> generate -> continue").
        const figFilter = new FigureStreamFilter();
        const pendingFigures: Array<{ id: number; prompt: string }> = [];
        for await (const delta of aiService.chatStream(provider, messages)) {
          const { chunks, figureStarts } = figFilter.push(delta);
          for (const spec of figureStarts) {
            figureSeq += 1;
            pendingFigures.push({ id: figureSeq, prompt: spec.prompt });
            res.write(`data: ${JSON.stringify({ imageStart: figureSeq, prompt: spec.prompt, caption: spec.caption })}\n\n`);
          }
          for (const chunk of chunks) {
            acc += chunk;
            streamedAny = true;
            res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
          }
        }
        const tail = figFilter.flush();
        if (tail.tail) {
          acc += tail.tail;
          streamedAny = true;
          res.write(`data: ${JSON.stringify({ content: tail.tail })}\n\n`);
        }
        for (const spec of tail.figureStarts) {
          figureSeq += 1;
          pendingFigures.push({ id: figureSeq, prompt: spec.prompt });
          res.write(`data: ${JSON.stringify({ imageStart: figureSeq, prompt: spec.prompt, caption: spec.caption })}\n\n`);
        }

        // A cut answer is the worse defect, so truncation repair still runs:
        // one follow-up turn is stitched on as its own chunk. The length
        // floor stays on the non-stream path — a streamed reply is deep by
        // construction, and a floor retry would double the cost.
        for (let i = 0; i < MAX_CONTINUATIONS; i += 1) {
          const verdict = detectTruncation(acc, aiService.getLastFinishReason());
          if (!verdict.truncated) break;
          console.info(`[AI stream] reply repair: ${describeVerdict(verdict)}`);
          try {
            const next = await aiService.chat(provider, [
              ...messages.slice(-6),
              { role: "assistant", content: acc },
              { role: "user", content: continuationRequest(verdict.detail) },
            ]);
            if (next && next.trim()) {
              acc = joinContinued(acc, next);
              continued += 1;
              res.write(`data: ${JSON.stringify({ content: next })}\n\n`);
              continue;
            }
          } catch {
            // A failed continuation must not cost the student the partial
            // answer they are already watching: ship what we have.
          }
          break;
        }

        // Draw the figure(s) the model requested (Agnes 2.1 first, auto-
        // fallback to 2.0). Each event carries the image id; on failure the
        // client falls back to browser-side puter.js for the same prompt.
        for (const fig of pendingFigures) {
          const t0 = Date.now();
          const result = await generateVeerImage(fig.prompt);
          const ok = !!result.url;
          console.info(
            ok
              ? `[image-gen] stream fig ${fig.id} ready in ${Date.now() - t0}ms`
              : `[image-gen] stream fig ${fig.id} failed: ${result.reason}`,
          );
          res.write(`data: ${JSON.stringify({ [ok ? "imageSuccess" : "imageFailed"]: fig.id, url: ok ? result.url : undefined, reason: ok ? undefined : result.reason })}\n\n`);
        }
        res.write(`data: ${JSON.stringify({ done: true, credits: creditsLeft ?? undefined, continued: continued > 0, continuations: continued })}\n\n`);
      } catch (err) {
        // SSE headers are already sent, so serverError() cannot be used — but
        // the raw provider error still must not reach the client. Log it under
        // a correlation id and send only the generic message + that id.
        // Refund only when NOTHING reached the student: a mid-stream failure
        // delivered a partial answer, which is the service being paid for.
        if (billedUserId && !streamedAny) {
          await refundCredits(billedUserId, AI_MESSAGE_COST, "Refund: AI reply failed (stream)").catch(
            () => {},
          );
        }
        const errorId = newErrorId();
        logServerError(err, errorId, "POST /api/ai (stream)");
        res.write(
          `event: error\ndata: ${JSON.stringify({ error: "AI request failed", errorId })}\n\n`,
        );
      }
      res.end();
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
    // The answer never reached the student → give the 1-credit fee back
    // before answering with an error status.
    if (billedUserId) {
      await refundCredits(billedUserId, AI_MESSAGE_COST, "Refund: AI reply failed").catch(() => {});
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
