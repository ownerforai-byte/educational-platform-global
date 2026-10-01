/**
 * SSE PARSER CONTRACT — the browser's half of live streaming.
 *
 * A reply only types itself out if this reader hands each event to the UI the
 * moment it arrives. The tests pin:
 *   - content deltas are yielded one by one (never joined into one lump),
 *   - progress events (phase / continuing) survive the trip,
 *   - the terminal done event carries the pool numbers,
 *   - a failed request throws with its HTTP STATUS attached, so the chat
 *     surfaces can show the honest 402/504 message instead of a fake
 *     "connection difficulty" bubble.
 */
import { afterEach, describe, expect, it, vi } from "vitest";

import { streamChat } from "@/lib/api/ai";

function sseResponse(frames: string[]) {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(encoder.encode(frame));
      controller.close();
    },
  });
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

async function collect(frames: string[]) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => sseResponse(frames)),
  );
  const out = [];
  for await (const chunk of streamChat([{ role: "user", content: "hi" }], undefined, {
    isGuest: true,
  })) {
    out.push(chunk);
  }
  return out;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("streamChat", () => {
  it("yields each delta as it arrives, in order, with progress events", async () => {
    const chunks = await collect([
      'data: {"phase":"searching","label":"Researching the topic…"}\n\n',
      'data: {"content":"Hel"}\n\n',
      'data: {"content":"lo"}\n\n',
      'data: {"continuing":1,"label":"Continuing the answer…"}\n\n',
      'data: {"content":" world"}\n\n',
      'data: {"done":true,"remaining":1,"limit":2}\n\n',
    ]);

    expect(chunks).toEqual([
      { phase: "searching", label: "Researching the topic…" },
      "Hel",
      "lo",
      { continuing: 1, label: "Continuing the answer…" },
      " world",
      { done: true, credits: undefined, remaining: 1, limit: 2, continued: undefined },
    ]);
  });

  it("reassembles events split across network reads", async () => {
    const chunks = await collect([
      'data: {"cont',
      'ent":"split"}\n\n',
      'data: {"cont',
      'ent":" works"}\n\n',
      'data: {"done":true}\n\n',
    ]);
    expect(chunks).toEqual(["split", " works", { done: true, credits: undefined, remaining: undefined, limit: undefined, continued: undefined }]);
  });

  it("surfaces an imageStart/imageSuccess pair for a live figure", async () => {
    const chunks = await collect([
      'data: {"imageStart":1,"prompt":"draw a cell","caption":"cell"}\n\n',
      'data: {"imageSuccess":1,"url":"https://example.test/cell.png"}\n\n',
      'data: {"done":true}\n\n',
    ]);
    expect(chunks[0]).toEqual({ imageStart: 1, prompt: "draw a cell", caption: "cell" });
    expect(chunks[1]).toEqual({ imageSuccess: 1, url: "https://example.test/cell.png" });
  });

  it("throws with the HTTP status so 402/504 get their real message", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ error: "Sign in required" }), {
            status: 402,
            headers: { "Content-Type": "application/json" },
          }),
      ),
    );

    await expect(
      (async () => {
        for await (const _chunk of streamChat([{ role: "user", content: "hi" }], undefined, {
          isGuest: true,
        })) {
          // no chunks on a failed request
        }
      })(),
    ).rejects.toMatchObject({ message: "Sign in required", status: 402 });
  });
});
