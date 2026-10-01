/**
 * LIVE ANSWER STREAMING — the one place every chat surface streams from.
 *
 * Owner requirement (2026-10-01): "the AI must reply like Claude/ChatGPT —
 * it keeps typing and finishes the whole answer, never one complete block at
 * once." Three things make that true, and all three live here:
 *
 *   1. HEADERS FIRST. The SSE response opens (and a heartbeat starts) before
 *      the slow pre-work (web research for grounding), so the browser is
 *      connected and the UI can show live status instead of staring at a
 *      pending fetch for 15+ seconds and then receiving a burst.
 *   2. TOKEN-LEVEL DELTAS. FigureStreamFilter forwards every delta that cannot
 *      start a figure fence immediately, so prose types itself out.
 *   3. CONTINUATION. A cut answer (finish_reason=length) is repaired by
 *      streaming a continuation onto the same bubble, so "complete knowledge"
 *      keeps arriving past the model's single-response limit.
 *
 * The route keeps ownership of billing (credits / guest slot) and rolls the
 * charge back only when `state.streamedAny` is still false — a partial answer
 * the student actually watched arrive is the service being paid for.
 */
import type { Response } from "express";
import type { AIService, AIChatMessage } from "../ai/service";
import { FigureStreamFilter, generateVeerImage, type FigureSpec } from "../ai/image-gen";
import {
  MAX_CONTINUATIONS,
  continuationRequest,
  describeVerdict,
  detectTruncation,
  joinContinued,
} from "../ai/truncation";
import { logServerError, newErrorId } from "../middleware/errors";

/** Keep Render/Vercel from closing a stream that is quiet during research. */
const HEARTBEAT_MS = 15_000;

/** A live SSE channel: `send` writes one JSON event, `end` closes cleanly. */
export interface SseChannel {
  send(obj: unknown): void;
  end(): void;
}

/**
 * Open the SSE response immediately — headers, no body yet — and keep it alive
 * with comment heartbeats until `end()`. Safe to call once per response.
 */
export function openSseChannel(res: Response): SseChannel {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  if (typeof res.flushHeaders === "function") res.flushHeaders();

  const write = (payload: string) => {
    if (res.writableEnded) return;
    res.write(payload);
    // express-compression-style flush when a proxy adds it; harmless otherwise.
    const flushable = res as unknown as { flush?: () => void };
    if (typeof flushable.flush === "function") flushable.flush();
  };

  const heartbeat = setInterval(() => write(": ping\n\n"), HEARTBEAT_MS);

  return {
    send: (obj: unknown) => write(`data: ${JSON.stringify(obj)}\n\n`),
    end: () => {
      clearInterval(heartbeat);
      if (!res.writableEnded) res.end();
    },
  };
}

/** Mutable per-request state the route reads after the stream settles. */
export interface StreamState {
  /** True as soon as ANY character or image placeholder reached the student. */
  streamedAny: boolean;
}

export type StreamOutcome =
  | { status: "done" }
  | { status: "failed"; errorId: string };

export interface StreamAnswerArgs {
  channel: SseChannel;
  service: AIService;
  /** "" = run the ordered provider chain (agnes → internal). */
  provider: string;
  messages: AIChatMessage[];
  /** Log prefix, e.g. "[AI stream]" / "[AI guest stream]". */
  logLabel: string;
  /** Extra fields merged into the terminal `done` event (credits/remaining). */
  doneExtras: Record<string, unknown>;
  state: StreamState;
}

/**
 * Stream the provider's answer to the student, draw any requested figures, and
 * repair a truncated reply with streamed continuations. Never throws for a
 * provider failure: the student gets a generic `event: error` frame (with a
 * correlation id) and the caller decides what to refund.
 */
export async function streamAnswerToStudent(
  args: StreamAnswerArgs,
): Promise<StreamOutcome> {
  const { channel, service, provider, messages, logLabel, doneExtras, state } = args;

  // Visible progress from the very first moment the answer work begins.
  channel.send({ phase: "writing", label: "Writing the answer…" });

  const figFilter = new FigureStreamFilter();
  const pendingFigures: Array<{ id: number; prompt: string }> = [];
  let figureSeq = 0;
  let acc = "";
  let continued = 0;

  const emitFigures = (specs: FigureSpec[]) => {
    for (const spec of specs) {
      figureSeq += 1;
      pendingFigures.push({ id: figureSeq, prompt: spec.prompt });
      channel.send({ imageStart: figureSeq, prompt: spec.prompt, caption: spec.caption });
    }
  };

  /**
   * Push one provider delta through the fence filter into SSE events and
   * return the text that reached the student — the caller owns accumulation so
   * a continuation round can be appended to `acc` exactly once.
   */
  const forward = (delta: string): string => {
    const { chunks, figureStarts } = figFilter.push(delta);
    emitFigures(figureStarts);
    let out = "";
    for (const chunk of chunks) {
      out += chunk;
      state.streamedAny = true;
      channel.send({ content: chunk });
    }
    return out;
  };

  /** End of the provider stream: emit the held tail + any dangling figure. */
  const flushTail = (): string => {
    const { tail, figureStarts } = figFilter.flush();
    emitFigures(figureStarts);
    if (tail) {
      state.streamedAny = true;
      channel.send({ content: tail });
    }
    return tail;
  };

  try {
    for await (const delta of service.chatStream(provider, messages)) {
      acc += forward(delta);
    }
    acc += flushTail();

    // Truncation repair, streamed: the continuation is appended to the SAME
    // bubble chunk-by-chunk, so a long "complete knowledge" answer keeps
    // arriving instead of stopping mid-sentence at the model's token limit.
    for (let i = 0; i < MAX_CONTINUATIONS; i += 1) {
      const verdict = detectTruncation(acc, service.getLastFinishReason());
      if (!verdict.truncated) break;
      console.info(`${logLabel} reply repair: ${describeVerdict(verdict)}`);
      channel.send({ continuing: continued + 1, label: "Continuing the answer…" });
      try {
        let nextAcc = "";
        const continuationMessages: AIChatMessage[] = [
          ...messages.slice(-6),
          { role: "assistant", content: acc },
          { role: "user", content: continuationRequest(verdict.detail) },
        ];
        for await (const delta of service.chatStream(provider, continuationMessages)) {
          nextAcc += forward(delta);
        }
        nextAcc += flushTail();
        if (nextAcc.trim()) {
          acc = joinContinued(acc, nextAcc);
          continued += 1;
          continue;
        }
      } catch (contErr) {
        console.warn(`${logLabel} continuation ${i + 1} failed:`, contErr);
      }
      break;
    }

    // Draw the figure(s) the model requested (Agnes image models first; the
    // client falls back to browser-side puter.js on an imageFailed event).
    for (const fig of pendingFigures) {
      const t0 = Date.now();
      const result = await generateVeerImage(fig.prompt);
      const ok = !!result.url;
      console.info(
        ok
          ? `[image-gen] stream fig ${fig.id} ready in ${Date.now() - t0}ms`
          : `[image-gen] stream fig ${fig.id} failed: ${result.reason}`,
      );
      channel.send({
        [ok ? "imageSuccess" : "imageFailed"]: fig.id,
        url: ok ? result.url : undefined,
        reason: ok ? undefined : result.reason,
      });
    }

    channel.send({
      done: true,
      continued: continued > 0,
      continuations: continued,
      ...doneExtras,
    });
    return { status: "done" };
  } catch (err) {
    // Headers are long gone — the raw provider error must not reach the
    // client. Log it under a correlation id and send only that id.
    const errorId = newErrorId();
    logServerError(err, errorId, `${logLabel.replace(/[[\]]/g, "")} stream`);
    channel.send({ error: "AI request failed", errorId });
    return { status: "failed", errorId };
  }
}
