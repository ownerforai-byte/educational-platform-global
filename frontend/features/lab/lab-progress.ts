"use client";

/**
 * "Continue where you left off" — device-local record of opened activities.
 *
 * Deliberately local-only (like the other study stores: `personal-notes`,
 * `srs`, `study-goals`): there is no server write here, no account coupling and
 * no network call, so it works signed-out and cannot fail closed. Storage
 * failures (private mode, quota) are swallowed — progress is a convenience, not
 * a source of truth.
 */

const KEY = "ravikishan:lab-progress:v1";
const LIMIT = 12;

export type LabVisit = {
  slug: string;
  title: string;
  subject: string;
  /** Epoch milliseconds. */
  at: number;
};

function safeRead(): LabVisit[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row): row is LabVisit =>
        Boolean(row) &&
        typeof (row as LabVisit).slug === "string" &&
        typeof (row as LabVisit).title === "string" &&
        typeof (row as LabVisit).at === "number",
    );
  } catch {
    return [];
  }
}

function safeWrite(visits: LabVisit[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(visits.slice(0, LIMIT)));
  } catch {
    // Quota or private mode: dropping the write is correct behaviour.
  }
}

/** Record an opened activity, de-duplicated by slug, newest first. */
export function recordLabVisit(visit: Omit<LabVisit, "at">): LabVisit[] {
  const existing = safeRead().filter((row) => row.slug !== visit.slug);
  const next = [{ ...visit, at: Date.now() }, ...existing].slice(0, LIMIT);
  safeWrite(next);
  return next;
}

export function readLabProgress(): LabVisit[] {
  return safeRead();
}

export function clearLabProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Nothing to do; the key simply stays.
  }
}
