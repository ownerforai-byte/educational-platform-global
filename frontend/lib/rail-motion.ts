/**
 * rail-motion — pure math for hand-scrubbing the continuous subject rails.
 *
 * A rail track holds its slide set TWICE and animates `translateX(0 → -50%)`,
 * so one set width (`track.scrollWidth / 2`) is exactly one loop. Dragging
 * moves the track by pixels; these helpers wrap the offset into a single loop
 * and compute the negative CSS animation-delay that resumes the keyframes in
 * phase, so release never snaps. No DOM, no React — unit-tested.
 *
 * Owner request 2026-10-06 added two behaviours that live here too:
 *   · "make it swipable like i can see the previous and next by swiping" — a
 *     quick flick steps exactly one card forward/back from the nearest card
 *     boundary (a slow drag still scrubs freely);
 *   · "if untouched for 3s and clicked outside its area then it continues its
 *     cycle" — the rail is HELD after a swipe while the reader looks at it, and
 *     only continues its loop when BOTH halves of that rule are met: at least
 *     RAIL_IDLE_RESUME_MS with no interaction, and a click outside the rail.
 */

/** Idle time (ms) a hand-held rail waits before it may resume its cycle. */
export const RAIL_IDLE_RESUME_MS = 3000;

/** Shortest gesture (px) that counts as a deliberate flick rather than a nudge. */
export const RAIL_FLICK_MIN_PX = 28;

/** Longest gesture (ms) that still counts as a flick rather than a slow drag. */
export const RAIL_FLICK_MAX_MS = 400;

/**
 * The release offset for a flick: step exactly one card from the nearest card
 * boundary so a swipe reliably shows the previous (`dx > 0`) or next (`dx < 0`)
 * card. Falls back to plain wrapping when the card step is unknown.
 */
export function railFlickTarget(
  offsetPx: number,
  stepPx: number,
  dx: number,
  setWidthPx: number,
): number {
  if (!Number.isFinite(offsetPx) || !(stepPx > 0)) {
    return normalizeRailOffset(offsetPx, setWidthPx);
  }
  const boundary = Math.round(offsetPx / stepPx);
  const target = (boundary + (dx < 0 ? -1 : 1)) * stepPx;
  return normalizeRailOffset(target, setWidthPx);
}

/** True when a gesture was quick enough (and long enough) to mean "one card". */
export function isRailFlick(dx: number, elapsedMs: number): boolean {
  return Math.abs(dx) >= RAIL_FLICK_MIN_PX && elapsedMs <= RAIL_FLICK_MAX_MS;
}

/** Wrap any pixel offset into one loop: (-setWidth, 0]. */
export function normalizeRailOffset(
  offsetPx: number,
  setWidthPx: number,
): number {
  if (!Number.isFinite(offsetPx) || !(setWidthPx > 0)) return 0;
  const travelled = ((-offsetPx % setWidthPx) + setWidthPx) % setWidthPx;
  return travelled === 0 ? 0 : -travelled;
}

/**
 * Negative animation-delay (seconds) that restarts a `0 → -50%` loop of
 * `durationSecs` exactly at `offsetPx`, so the rail resumes drifting from the
 * dropped position with no jump.
 */
export function railResumeDelaySecs(
  offsetPx: number,
  setWidthPx: number,
  durationSecs: number,
): number {
  if (!Number.isFinite(offsetPx) || !(setWidthPx > 0) || !(durationSecs > 0)) {
    return 0;
  }
  const travelled = ((-offsetPx % setWidthPx) + setWidthPx) % setWidthPx;
  return (travelled / setWidthPx) * durationSecs;
}

/** Parse a CSS duration ("58s", "1200ms", 58) into seconds. */
export function parseDurationSecs(input: string | number | undefined): number {
  if (typeof input === "number") return Number.isFinite(input) ? input : 0;
  if (typeof input !== "string") return 0;
  const value = Number.parseFloat(input);
  if (!Number.isFinite(value)) return 0;
  return input.trim().endsWith("ms") ? value / 1000 : value;
}

/**
 * Freeze a rail track at a pixel offset by hand.
 *
 * Only `animation-name` is switched off, never the `animation` shorthand: the
 * shorthand also clears `animation-duration` (which React sets inline per rail)
 * and `animation-delay` (which carries the resume phase), so using it would
 * drop both and restart the rail at the stylesheet's default speed.
 */
export function freezeTrack(track: HTMLElement, offsetPx: number): void {
  track.style.animationName = "none";
  track.style.transform = `translate3d(${offsetPx}px, 0, 0)`;
}

/** Offset a track was frozen at by `freezeTrack`, or 0 when it is not frozen. */
export function frozenTrackOffset(track: HTMLElement): number {
  const match = /translate3d\(\s*(-?\d+(?:\.\d+)?)px/.exec(track.style.transform);
  return match ? Number.parseFloat(match[1]) : 0;
}

/**
 * Release a drag-frozen track back to the CSS loop in phase. Reads the frozen
 * pixel offset from the inline transform, arms the matching negative delay, and
 * hands control back to the stylesheet animation. No-op unless the track is
 * currently frozen by `freezeTrack`.
 */
export function resumeTrackFromFreeze(track: HTMLElement): void {
  if (track.style.animationName !== "none") return;
  const frozen = frozenTrackOffset(track);
  const setWidth = track.scrollWidth / 2;
  const duration = parseDurationSecs(
    track.style.animationDuration ||
      getComputedStyle(track).animationDuration,
  );
  track.style.animationDelay = `-${railResumeDelaySecs(frozen, setWidth, duration)}s`;
  track.style.animationName = "";
}
