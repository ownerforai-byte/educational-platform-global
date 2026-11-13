"use client";

/**
 * "Continue where you left off" — account-scoped local record of opened
 * activities, durable via `user-state` namespace `lab-progress` (T19).
 */

import { key } from "@/lib/scoped-storage";
import {
  LAB_PROGRESS_NAMESPACE,
  scheduleNamespacePush,
} from "@/lib/state/user-state";

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
    const raw = window.localStorage.getItem(key(KEY));
    if (!raw) {
      // One-time adopt of the pre-scoping device key.
      const legacy = window.localStorage.getItem(KEY);
      if (!legacy) return [];
      const parsed: unknown = JSON.parse(legacy);
      if (!Array.isArray(parsed)) return [];
      const visits = parsed.filter(
        (row): row is LabVisit =>
          Boolean(row) &&
          typeof (row as LabVisit).slug === "string" &&
          typeof (row as LabVisit).title === "string" &&
          typeof (row as LabVisit).at === "number",
      );
      safeWrite(visits);
      try {
        window.localStorage.removeItem(KEY);
      } catch {
        /* ignore */
      }
      return visits;
    }
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
    const next = visits.slice(0, LIMIT);
    window.localStorage.setItem(key(KEY), JSON.stringify(next));
    scheduleNamespacePush(LAB_PROGRESS_NAMESPACE, next);
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
    window.localStorage.removeItem(key(KEY));
    scheduleNamespacePush(LAB_PROGRESS_NAMESPACE, []);
  } catch {
    // Nothing to do; the key simply stays.
  }
}
