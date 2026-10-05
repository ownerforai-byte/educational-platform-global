/**
 * rail-motion — pure math for hand-scrubbing the continuous subject rails.
 *
 * A rail track holds its slide set TWICE and animates `translateX(0 → -50%)`,
 * so one set width (`track.scrollWidth / 2`) is exactly one loop. Dragging
 * moves the track by pixels; these helpers wrap the offset into a single loop
 * and compute the negative CSS animation-delay that resumes the keyframes in
 * phase, so release never snaps. No DOM, no React — unit-tested.
 */

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
 * Release a drag-frozen track back to the CSS loop in phase. Reads the frozen
 * pixel offset from the inline transform, arms the matching negative delay,
 * and hands control back to the stylesheet animation. No-op unless the track
 * carries an inline `animation: none` freeze.
 */
export function resumeTrackFromFreeze(track: HTMLElement): void {
  if (track.style.animation !== "none") return;
  const match = /translate3d\(\s*(-?\d+(?:\.\d+)?)px/.exec(
    track.style.transform,
  );
  const frozen = match ? Number.parseFloat(match[1]) : 0;
  const setWidth = track.scrollWidth / 2;
  const duration = parseDurationSecs(
    track.style.animationDuration ||
      getComputedStyle(track).animationDuration,
  );
  track.style.animationDelay = `-${railResumeDelaySecs(frozen, setWidth, duration)}s`;
  track.style.animation = "";
}
