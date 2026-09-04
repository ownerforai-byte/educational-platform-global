/**
 * Study Streak — localStorage-backed daily check-in tracker.
 *
 * A streak is the number of consecutive calendar days the user has visited
 * or checked in. It resets to 0 if a day is missed.
 *
 * Stored keys (all under the "neb-streak" prefix):
 *   neb-streak:last-check-in  — ISO date string of last check-in
 *   neb-streak:count          — current streak integer
 *
 * Call markCheckIn() once per session (e.g. on page load) to keep the
 * streak alive. The component reads the stored values client-side only.
 */

const LAST_CHECK_IN_KEY = "neb-streak:last-check-in";
const COUNT_KEY = "neb-streak:count";

function getToday(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 86_400_000;
  return Math.round(Math.abs(new Date(b).getTime() - new Date(a).getTime()) / msPerDay);
}

export interface StreakState {
  count: number;
  lastCheckIn: string | null;
  isStreakActive: boolean;
}

/**
 * Read current streak from localStorage. Must be called client-side.
 */
export function getStreak(): StreakState {
  if (typeof window === "undefined") {
    return { count: 0, lastCheckIn: null, isStreakActive: false };
  }
  const last = localStorage.getItem(LAST_CHECK_IN_KEY);
  const raw = localStorage.getItem(COUNT_KEY);
  const count = raw ? parseInt(raw, 10) : 0;
  const today = getToday();

  // If last check-in was yesterday, streak is still active (just need today's check-in)
  // If last check-in was today, streak is active and already counted
  // Otherwise, streak is broken
  const isStreakActive = last !== null && daysBetween(last, today) <= 1;

  return { count, lastCheckIn: last, isStreakActive };
}

/**
 * Record a check-in for today. Increments streak if it's a new day,
 * resets to 1 if streak was broken.
 */
export function markCheckIn(): StreakState {
  if (typeof window === "undefined") return getStreak();
  const today = getToday();
  const prev = localStorage.getItem(LAST_CHECK_IN_KEY);
  let newCount = 1;

  if (prev === today) {
    // Already checked in today — no change
    newCount = parseInt(localStorage.getItem(COUNT_KEY) ?? "0", 10);
  } else if (prev !== null && daysBetween(prev, today) === 1) {
    // Consecutive day — increment
    newCount = (parseInt(localStorage.getItem(COUNT_KEY) ?? "0", 10) + 1);
  } else {
    // Streak broken or first visit — reset to 1
    newCount = 1;
  }

  localStorage.setItem(LAST_CHECK_IN_KEY, today);
  localStorage.setItem(COUNT_KEY, String(newCount));
  return getStreak();
}

/**
 * Returns a human-readable badge label for the streak count.
 */
export function streakLabel(count: number): string {
  if (count === 0) return "Start your streak!";
  if (count === 1) return "🔥 Day 1";
  if (count < 7) return `🔥 ${count} days`;
  if (count < 30) return `🔥 ${count} days`;
  return `🔥 ${count} days — Amazing!`;
}
