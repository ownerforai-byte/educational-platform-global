/**
 * STREAM PIPELINE — proves the answer actually STREAMS to the student, which is
 * the whole owner requirement: "reply like Claude/ChatGPT — it keeps typing and
 * finishes the whole answer, never one complete block at once."
 *
 *   openSseChannel        → headers go out immediately + a heartbeat keeps the
 *                           connection alive through the slow research step
 *   streamAnswerToStudent → a progress phase first, one event per provider
 *                           delta (typing), a `continuing` event when a cut
 *                           reply is repaired ON THE SAME stream, and a generic
 *                           error frame (never a raw provider message)
 *
 * No network: the provider is a fake async generator.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Response } from "express";
import type { AIChatMessage, AIService } from "../../src/ai/service";
import {
  openSseChannel,
  streamAnswerToStudent,
  type StreamState,
} from "../../src/api/ai-stream";

function fakeRes() {
  const written: string[] = [];
  const headers: Record<string, unknown> = {};
  const res = {
    headersSent: false,
    writableEnded: false,
    setHeader: (k: string, v: unknown) => {
      headers[k] = v;
    },
    flushHeaders: () => {
      res.headersSent = true;
    },
    write: (payload: string) => {
      written.push(payload);
      return true;
    },
    end: () => {
      res.writableEnded = true;
    },
  };
  return { res: res as unknown as Response, written, headers };
}

/** Every JSON event in the raw SSE frames, in arrival order (comments skipped). */
function events(written: string[]): Array<Record<string, unknown>> {
  return written
    .join("")
    .split("\n\n")
    .map((frame) => frame.split("\n").find((line) => line.startsWith("data:")))
    .filter((line): line is string => typeof line === "string")
    .map((line) => JSON.parse(line.slice(5).trim()));
}

function fakeService(
  rounds: Array<{ deltas: string[]; finishReason?: string; throwAfter?: number }>,
) {
  let call = 0;
  let finishReason = "";
  const seen: AIChatMessage[][] = [];
  const service = {
    chatStream: async function* (_provider: string, messages: AIChatMessage[]) {
      const round = rounds[Math.min(call, rounds.length - 1)];
      call += 1;
      seen.push(messages);
      if (!round) return;
      // throwAfter: 0 = the provider dies before a single token exists.
      if (round.throwAfter === 0) throw new Error("provider exploded");
      let sent = 0;
      for (const delta of round.deltas) {
        yield delta;
        sent += 1;
        if (round.throwAfter !== undefined && sent >= round.throwAfter) {
          throw new Error("provider exploded");
        }
      }
      finishReason = round.finishReason ?? "stop";
    },
    getLastFinishReason: () => finishReason,
  };
  return {
    service: service as unknown as AIService,
    calls: () => call,
    seen: () => seen,
  };
}

function newState(): StreamState {
  return { streamedAny: false };
}

afterEach(() => {
  vi.useRealTimers();
});

describe("openSseChannel", () => {
  it("flushes streaming headers immediately and keeps the socket warm", () => {
    vi.useFakeTimers();
    const { res, written, headers } = fakeRes();
    const channel = openSseChannel(res);

    expect(headers["Content-Type"]).toBe("text/event-stream; charset=utf-8");
    expect(headers["Cache-Control"]).toBe("no-cache, no-transform");
    // Proxies must not buffer: buffering is exactly what made a streamed answer
    // arrive as one block.
    expect(headers["X-Accel-Buffering"]).toBe("no");
    expect(res.headersSent).toBe(true);

    // The research step can take ~20s with no content: the heartbeat is what
    // keeps Render/Vercel from treating the stream as dead.
    vi.advanceTimersByTime(15_000);
    expect(written.join("")).toContain(": ping");

    channel.send({ content: "hi" });
    expect(written.join("")).toContain('data: {"content":"hi"}');

    channel.end();
    expect(res.writableEnded).toBe(true);
    const framesAfterEnd = written.length;
    vi.advanceTimersByTime(60_000);
    expect(written.length).toBe(framesAfterEnd);
  });
});

describe("streamAnswerToStudent", () => {
  it("announces the writing phase, then forwards every delta as its own event", async () => {
    const { res, written } = fakeRes();
    const channel = openSseChannel(res);
    const { service } = fakeService([
      { deltas: ["The ", "cell ", "is ", "alive."], finishReason: "stop" },
    ]);
    const state = newState();

    const outcome = await streamAnswerToStudent({
      channel,
      service,
      provider: "",
      messages: [{ role: "user", content: "what is a cell" }],
      logLabel: "[AI test stream]",
      doneExtras: { credits: 3 },
      state,
    });

    expect(outcome.status).toBe("done");
    const sent = events(written);
    expect(sent[0]).toEqual({ phase: "writing", label: "Writing the answer…" });
    // Token-level: four deltas in, four content events out — not one lump.
    expect(sent.filter((e) => typeof e.content === "string").map((e) => e.content)).toEqual([
      "The ",
      "cell ",
      "is ",
      "alive.",
    ]);
    expect(sent[sent.length - 1]).toMatchObject({
      done: true,
      continued: false,
      continuations: 0,
      credits: 3,
    });
    expect(state.streamedAny).toBe(true);
  });

  it("continues a truncated answer on the SAME stream and says so", async () => {
    const { res, written } = fakeRes();
    const channel = openSseChannel(res);
    const { service, calls, seen } = fakeService([
      { deltas: ["The cell is "], finishReason: "length" },
      { deltas: ["a ", "unit ", "of life."], finishReason: "stop" },
    ]);
    const state = newState();

    const outcome = await streamAnswerToStudent({
      channel,
      service,
      provider: "",
      messages: [{ role: "user", content: "describe the cell" }],
      logLabel: "[AI test stream]",
      doneExtras: {},
      state,
    });

    expect(outcome.status).toBe("done");
    expect(calls()).toBe(2);
    const sent = events(written);
    // The repair is visible: the student is told the answer continues.
    expect(sent.some((e) => typeof e.continuing === "number")).toBe(true);
    // The continuation is stitched on, so the whole answer arrives as one
    // growing reply instead of stopping at the provider's output ceiling.
    const text = sent
      .filter((e) => typeof e.content === "string")
      .map((e) => e.content as string)
      .join("");
    expect(text).toBe("The cell is a unit of life.");
    expect(sent[sent.length - 1]).toMatchObject({ done: true, continued: true, continuations: 1 });
    // The continuation call carries the partial answer + the continuation rule.
    const continuation = seen()[1];
    expect(continuation.some((m) => m.role === "assistant" && m.content === "The cell is ")).toBe(
      true,
    );
    expect(continuation.some((m) => m.content.includes("Continue it from exactly where it stopped"))).toBe(
      true,
    );
  });

  it("keeps the partial answer when the provider dies mid-stream, and leaks nothing", async () => {
    const { res, written } = fakeRes();
    const channel = openSseChannel(res);
    const { service } = fakeService([{ deltas: ["Partial thought "], throwAfter: 1 }]);
    const state = newState();

    const outcome = await streamAnswerToStudent({
      channel,
      service,
      provider: "",
      messages: [{ role: "user", content: "long question" }],
      logLabel: "[AI test stream]",
      doneExtras: {},
      state,
    });

    expect(outcome.status).toBe("failed");
    expect(state.streamedAny).toBe(true); // the student watched text arrive
    const sent = events(written);
    expect(sent.some((e) => e.content === "Partial thought ")).toBe(true);
    const failure = sent.find((e) => typeof e.error === "string");
    expect(failure).toMatchObject({ error: "AI request failed" });
    expect(typeof failure?.errorId).toBe("string");
    // No done event, and never the raw provider/environment detail.
    expect(sent.some((e) => e.done === true)).toBe(false);
    expect(written.join("")).not.toContain("provider exploded");
  });

  it("reports a clean failure when nothing was streamed at all", async () => {
    const { res, written } = fakeRes();
    const channel = openSseChannel(res);
    const { service } = fakeService([{ deltas: [], throwAfter: 0 }]);
    const state = newState();

    const outcome = await streamAnswerToStudent({
      channel,
      service,
      provider: "",
      messages: [{ role: "user", content: "hi" }],
      logLabel: "[AI test stream]",
      doneExtras: {},
      state,
    });

    expect(outcome.status).toBe("failed");
    // Nothing reached the student → the route refunds the credit / guest slot.
    expect(state.streamedAny).toBe(false);
    expect(events(written).some((e) => typeof e.error === "string")).toBe(true);
  });
});
