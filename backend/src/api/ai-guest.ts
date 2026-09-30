import { Router, Request, Response } from "express";
import { serverError, ERROR_ID_HEADER, logServerError, newErrorId } from "../middleware/errors";
import { createAIService, type AIChatMessage } from "../ai/service";
import { rateLimit } from "../middleware/rateLimit";
import { buildProfessorContext, withProfessorContext } from "../ai/prompts";
import { completeAnswer } from "../ai/complete-answer";
import { imageInstruction, sanitizeChatImages } from "../ai/image-input";
import { withFigureToolInstruction, resolveFiguresInText, FigureStreamFilter, generateVeerImage } from "../ai/image-gen";
import {
  detectTruncation,
  describeVerdict,
  continuationRequest,
  joinContinued,
  MAX_CONTINUATIONS,
} from "../ai/truncation";
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

    // Handle streaming for guests
    if (stream) {
      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      if (typeof res.flushHeaders === "function") res.flushHeaders();

      let streamedAny = false;
      let figureSeq = 0;
      const sendSSE = (obj: any) => {
        res.write(`data: ${JSON.stringify(obj)}\n\n`);
        if (typeof (res as any).flush === "function") (res as any).flush();
      };

      try {
        let acc = "";
        let continued = 0;
        const figFilter = new FigureStreamFilter();
        const pendingFigures: Array<{ id: number; prompt: string }> = [];

        for await (const delta of aiService.chatStream(provider, augmented)) {
          const { chunks, figureStarts } = figFilter.push(delta);
          for (const spec of figureStarts) {
            figureSeq += 1;
            pendingFigures.push({ id: figureSeq, prompt: spec.prompt });
            sendSSE({ imageStart: figureSeq, prompt: spec.prompt, caption: spec.caption });
          }
          for (const chunk of chunks) {
            acc += chunk;
            streamedAny = true;
            sendSSE({ content: chunk });
          }
        }
        const tail = figFilter.flush();
        if (tail.tail) {
          acc += tail.tail;
          streamedAny = true;
          sendSSE({ content: tail.tail });
        }
        for (const spec of tail.figureStarts) {
          figureSeq += 1;
          pendingFigures.push({ id: figureSeq, prompt: spec.prompt });
          sendSSE({ imageStart: figureSeq, prompt: spec.prompt, caption: spec.caption });
        }

        // Multi-turn truncation repair and continuous streaming
        for (let i = 0; i < MAX_CONTINUATIONS; i += 1) {
          const verdict = detectTruncation(acc, aiService.getLastFinishReason());
          if (!verdict.truncated) break;
          console.info(`[AI guest stream] reply repair: ${describeVerdict(verdict)}`);
          try {
            let nextAcc = "";
            const continuationMessages: AIChatMessage[] = [
              ...augmented.slice(-6),
              { role: "assistant", content: acc },
              { role: "user", content: continuationRequest(verdict.detail) },
            ];
            for await (const delta of aiService.chatStream(provider, continuationMessages)) {
              const { chunks, figureStarts } = figFilter.push(delta);
              for (const spec of figureStarts) {
                figureSeq += 1;
                pendingFigures.push({ id: figureSeq, prompt: spec.prompt });
                sendSSE({ imageStart: figureSeq, prompt: spec.prompt, caption: spec.caption });
              }
              for (const chunk of chunks) {
                nextAcc += chunk;
                streamedAny = true;
                sendSSE({ content: chunk });
              }
            }
            const continuationTail = figFilter.flush();
            if (continuationTail.tail) {
              nextAcc += continuationTail.tail;
              streamedAny = true;
              sendSSE({ content: continuationTail.tail });
            }
            for (const spec of continuationTail.figureStarts) {
              figureSeq += 1;
              pendingFigures.push({ id: figureSeq, prompt: spec.prompt });
              sendSSE({ imageStart: figureSeq, prompt: spec.prompt, caption: spec.caption });
            }
            if (nextAcc.trim()) {
              acc = joinContinued(acc, nextAcc);
              continued += 1;
              continue;
            }
          } catch (contErr) {
            console.warn(`[AI guest stream] continuation ${i + 1} failed:`, contErr);
          }
          break;
        }

        // Draw figures if requested
        for (const fig of pendingFigures) {
          const result = await generateVeerImage(fig.prompt);
          const ok = !!result.url;
          sendSSE({ [ok ? "imageSuccess" : "imageFailed"]: fig.id, url: ok ? result.url : undefined, reason: ok ? undefined : result.reason });
        }

        sendSSE({ done: true, remaining, limit: GUEST_DAILY_LIMIT, continued: continued > 0, continuations: continued });
      } catch (err) {
        if (consumed && !streamedAny) {
          await rollbackGuestSlot(ip, deviceId).catch(() => {});
        }
        const errorId = newErrorId();
        logServerError(err, errorId, "POST /api/ai/guest (stream)");
        res.write(
          `event: error\ndata: ${JSON.stringify({ error: "AI request failed", errorId })}\n\n`,
        );
      }
      res.end();
      return;
    }

    // "" runs the ordered chain (agnes → openrouter → internal).
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
