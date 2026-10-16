/**
 * LOW DATA (lite mode) runtime helpers.
 *
 * Lite mode is decided by the bootstrap in app/layout.tsx BEFORE React runs
 * (localStorage `neb-lite-mode`, falling back to the browser's connection
 * hints: Save-Data / 2g / slow-2g) and mirrored on `<html data-lite="true">`.
 *
 * The stylesheet already strips animations, blurs and background art; this
 * module covers the other half of what low data must save — BACKGROUND NETWORK
 * CHATTER. Every recurring poll (coin-gate config, spark balance, AI spark
 * usage) routes through `setLitePoll`, which re-reads the flag each time it
 * schedules, so toggling low data mid-session changes the following delays
 * without a reload (a delay already in flight completes at its old cadence).
 */

/** True while the document is currently in lite (low data) mode. */
export function isLiteMode(): boolean {
  return (
    typeof document !== "undefined" &&
    document.documentElement.dataset.lite === "true"
  );
}

/** Background polls run this many times slower while lite mode is on. */
export const LITE_POLL_SLOWDOWN = 4;

/** The delay a background poll should use right now. */
export function pollDelayMs(baseMs: number): number {
  return isLiteMode() ? baseMs * LITE_POLL_SLOWDOWN : baseMs;
}

/**
 * `setInterval` that honours lite mode on EVERY tick.
 *
 * The first run happens after the (possibly slowed) delay, exactly like
 * setInterval — callers keep their own immediate first fetch. Returns a stop
 * function, so call sites swap `clearInterval(id)` for `stop()`.
 */
export function setLitePoll(task: () => void, baseMs: number): () => void {
  if (typeof window === "undefined") return () => {};
  let timer: number | undefined;
  let stopped = false;

  const schedule = () => {
    if (stopped) return;
    timer = window.setTimeout(() => {
      if (stopped) return;
      task();
      schedule();
    }, pollDelayMs(baseMs));
  };
  schedule();

  return () => {
    stopped = true;
    if (timer !== undefined) window.clearTimeout(timer);
  };
}
