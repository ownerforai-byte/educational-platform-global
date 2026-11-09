import { afterEach, describe, expect, test, vi } from "vitest";
import {
  appendToDraft,
  attachmentError,
  classifyAttachment,
  formatDocumentContext,
  MAX_TEXT_CHARS,
  MAX_TEXT_FILE_BYTES,
} from "@/lib/chat/attach-files";
import { createSilenceTrigger, VOICE_AUTO_SEND_MS } from "@/lib/chat/silence-trigger";
import { aiStatusLabel, resolveAiStatus } from "@/lib/chat/ai-status";

describe("attach menu logic", () => {
  test("classifies images, text-like files and unsupported types", () => {
    expect(classifyAttachment({ name: "a.png", type: "image/png" })).toBe("image");
    expect(classifyAttachment({ name: "n.md", type: "" })).toBe("text");
    expect(classifyAttachment({ name: "d.csv", type: "text/csv" })).toBe("text");
    expect(classifyAttachment({ name: "d.json", type: "application/json" })).toBe("text");
    expect(classifyAttachment({ name: "b.pdf", type: "application/pdf" })).toBe("unsupported");
  });

  test("gives a clear error for unsupported and oversized files", () => {
    expect(attachmentError({ name: "b.pdf", type: "application/pdf", size: 10 })).toMatch(/can't be read/);
    expect(attachmentError({ name: "big.txt", type: "text/plain", size: MAX_TEXT_FILE_BYTES + 1 })).toMatch(/too large/);
    expect(attachmentError({ name: "ok.txt", type: "text/plain", size: 10 })).toBeNull();
  });

  test("fences document text, trims long files and appends to the draft", () => {
    const block = formatDocumentContext("n.txt", "hello");
    expect(block).toContain("[Attached file: n.txt]");
    expect(block).toContain("hello");
    expect(formatDocumentContext("x.txt", "a".repeat(MAX_TEXT_CHARS + 50))).toContain("trimmed");
    expect(formatDocumentContext("x.txt", "```evil```")).not.toMatch(/```evil/);
    expect(appendToDraft("", "B")).toBe("B");
    expect(appendToDraft("Q", "B")).toBe("Q\n\nB");
  });
});

describe("voice auto-send timing", () => {
  afterEach(() => vi.useRealTimers());

  test("fires once, 3500 ms after the last speech event", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const t = createSilenceTrigger(VOICE_AUTO_SEND_MS, fn);
    expect(VOICE_AUTO_SEND_MS).toBe(3500);
    t.poke();
    vi.advanceTimersByTime(3000);
    t.poke(); // more speech resets the pause
    vi.advanceTimersByTime(3400);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(10_000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("cancel prevents the send", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const t = createSilenceTrigger(3500, fn);
    t.poke();
    t.cancel();
    vi.advanceTimersByTime(5000);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe("status dot", () => {
  test("resolves online, offline and checking", () => {
    expect(resolveAiStatus({ browserOnline: true, serverOnline: true })).toBe("online");
    expect(resolveAiStatus({ browserOnline: true, serverOnline: false })).toBe("offline");
    expect(resolveAiStatus({ browserOnline: true, serverOnline: null })).toBe("checking");
    expect(resolveAiStatus({ browserOnline: false, serverOnline: true })).toBe("offline");
  });

  test("labels describe configuration, not proven availability", () => {
    expect(aiStatusLabel("offline", false)).toMatch(/offline/i);
    expect(aiStatusLabel("offline", true)).toMatch(/not configured/i);
    expect(aiStatusLabel("online", true)).toMatch(/configured/i);
    expect(aiStatusLabel("online", true)).not.toMatch(/online/i);
  });
});
