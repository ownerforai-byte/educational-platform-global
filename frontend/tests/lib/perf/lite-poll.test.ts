import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  isLiteMode,
  pollDelayMs,
  setLitePoll,
  LITE_POLL_SLOWDOWN,
} from "@/lib/perf/lite";

/**
 * LOW DATA (lite mode) background polls.
 *
 * Every recurring background request (coin-gate config 15s, credit balance
 * 30s, AI spark usage 30s) runs through setLitePoll: the cadence stretches
 * LITE_POLL_SLOWDOWN× while <html data-lite="true"> and the next tick
 * re-reads the flag, so toggling low data mid-session takes effect without a
 * reload.
 */
describe("lite poll (low data)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    delete document.documentElement.dataset.lite;
  });

  it("reports the flag from the document", () => {
    expect(isLiteMode()).toBe(false);
    document.documentElement.dataset.lite = "true";
    expect(isLiteMode()).toBe(true);
  });

  it("stretches delays only while lite is on", () => {
    expect(pollDelayMs(1_000)).toBe(1_000);
    document.documentElement.dataset.lite = "true";
    expect(pollDelayMs(1_000)).toBe(1_000 * LITE_POLL_SLOWDOWN);
  });

  it("keeps the base cadence when not constrained", () => {
    const task = vi.fn();
    setLitePoll(task, 1_000);
    vi.advanceTimersByTime(3_500);
    expect(task).toHaveBeenCalledTimes(3);
  });

  it("runs LITE_POLL_SLOWDOWN× slower under low data", () => {
    document.documentElement.dataset.lite = "true";
    const task = vi.fn();
    setLitePoll(task, 1_000);

    vi.advanceTimersByTime(1_000 * LITE_POLL_SLOWDOWN * 3 - 1);
    expect(task).toHaveBeenCalledTimes(2); // ticks at 4s and 8s; 12s not yet
    vi.advanceTimersByTime(1);
    expect(task).toHaveBeenCalledTimes(3);
  });

  it("reacts to toggling low data mid-run — no reload needed", () => {
    const task = vi.fn();
    setLitePoll(task, 1_000);

    vi.advanceTimersByTime(1_000); // normal tick (t=1s)
    expect(task).toHaveBeenCalledTimes(1);

    document.documentElement.dataset.lite = "true";
    vi.advanceTimersByTime(1_000); // the tick scheduled before the flip still lands (t=2s)
    expect(task).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(1_000); // …but the delay IT scheduled is now stretched
    expect(task).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(3_000); // stretched tick lands at 2s + 4s
    expect(task).toHaveBeenCalledTimes(3);
  });

  it("stops scheduling once the returned stop function runs", () => {
    const task = vi.fn();
    const stop = setLitePoll(task, 1_000);
    stop();
    vi.advanceTimersByTime(10_000);
    expect(task).not.toHaveBeenCalled();
  });
});
