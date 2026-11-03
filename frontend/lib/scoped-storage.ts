/**
 * Account-scoped localStorage keys for every study-page writer.
 *
 * Two students on one browser must never share goals, streaks, notes or SRS
 * state. key("neb-study-goals:v1") returns "neb-study-goals:v1:u:<userId>" for a
 * signed-in student (id from the cached validated session) and
 * "...:anon:<stableId>" when logged out. The anonymous id is generated once and
 * kept on the device, so logged-out use stays stable across reloads.
 *
 * Legacy unscoped keys are deliberately NOT migrated: we cannot know which
 * account owned them, and copying them would reproduce the leak.
 */

import { readCachedSession } from "@/lib/auth/session-store";

export const ANON_ID_KEY = "neb-anon-id:v1";

function anonymousId(): string {
  try {
    const existing = window.localStorage.getItem(ANON_ID_KEY);
    if (existing) return existing;
    const fresh =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(ANON_ID_KEY, fresh);
    return fresh;
  } catch {
    return "anon";
  }
}

/** Scope suffix for the current account: `u:<id>` or `anon:<id>`. */
export function storageScope(): string {
  if (typeof window === "undefined") return "anon:ssr";
  const userId = readCachedSession()?.user.id;
  return userId ? `u:${userId}` : `anon:${anonymousId()}`;
}

/** The ONE helper: namespace a feature key by the signed-in account. */
export function key(base: string): string {
  return `${base}:${storageScope()}`;
}
