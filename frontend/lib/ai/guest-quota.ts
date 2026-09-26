/**
 * Shared display-side helpers for the guest chat daily pool (5/day, resets
 * at 12:00 AM). The server is the source of truth (backend
 * utils/guestQuota.ts — DB-backed, per hashed IP); localStorage only mirrors
 * it so the UI can render honestly before the first reply of the session.
 *
 * Day-keyed and shared: the /chat page and the floating widget used to keep
 * separate, diverging copies (the widget never applied the midnight reset,
 * so it could stay locked out all day). Both now read through this module.
 */

/** Mirrors the backend's GUEST_DAILY_LIMIT (owner policy: 5/day). */
export const GUEST_DAILY_LIMIT = 5;

const DAY_KEY = "neb_ai_guest_day";
const COUNT_KEY = "neb_ai_guest_count";

function dayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Messages used today (0 on the server, in SSR, or when storage is blocked). */
export function readGuestCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const day = localStorage.getItem(DAY_KEY);
    const count = parseInt(localStorage.getItem(COUNT_KEY) || "0", 10) || 0;
    // Past 12:00 AM → yesterday's count must not lock today's composer.
    if (day !== dayKey()) return 0;
    return Math.min(Math.max(count, 0), GUEST_DAILY_LIMIT);
  } catch {
    // Storage blocked (private mode, SSR) → rely on the server's `remaining`.
    return 0;
  }
}

/** Mirror a server-attested count (never the source of truth). */
export function writeGuestCount(count: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DAY_KEY, dayKey());
    localStorage.setItem(COUNT_KEY, String(Math.min(Math.max(count, 0), GUEST_DAILY_LIMIT)));
  } catch {
    /* storage blocked — the server still enforces the real limit */
  }
}
