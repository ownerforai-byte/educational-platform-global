/**
 * Spaced repetition: SM-2 scheduler, card builder and device-local store.
 *
 * Cards are DERIVED from the existing pyq-bank reader (theory/concept notes,
 * PYQ questions and concept drills); nothing is authored here. Review state
 * lives in localStorage only (same pattern as lib/study-goals), no server write.
 */

import type { SubjectPyqBank } from "@/lib/pyq-bank";
import { key } from "@/lib/scoped-storage";

export const SRS_KEY = "neb-srs:v1";

export interface SrsCard {
  id: string;
  subjectKey: string;
  kind: "concept" | "pyq" | "drill";
  front: string;
  back: string;
}

export interface SrsState {
  /** SM-2 easiness factor (>= 1.3). */
  ease: number;
  /** Current interval in days. */
  interval: number;
  /** Consecutive successful reviews. */
  reps: number;
  lapses: number;
  /** ISO date (YYYY-MM-DD) the card is next due. */
  due: string;
}

export type SrsStore = Record<string, SrsState>;

/** Self-grade 0-5 as in SM-2; < 3 is a lapse. */
export type SrsQuality = 0 | 1 | 2 | 3 | 4 | 5;

export const NEW_CARD_STATE: Omit<SrsState, "due"> = { ease: 2.5, interval: 0, reps: 0, lapses: 0 };

export function isoDay(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  return isoDay(new Date(y, m - 1, d + days));
}

/** One SM-2 step. Pure: returns the next state for a review done on `today`. */
export function sm2(prev: SrsState | undefined, quality: SrsQuality, today: string): SrsState {
  const base = prev ?? { ...NEW_CARD_STATE, due: today };
  const ease = Math.max(1.3, base.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  if (quality < 3) {
    return { ease, interval: 1, reps: 0, lapses: base.lapses + 1, due: addDays(today, 1) };
  }
  const reps = base.reps + 1;
  const interval = reps === 1 ? 1 : reps === 2 ? 6 : Math.max(1, Math.round(base.interval * ease));
  return { ease, interval, reps, lapses: base.lapses, due: addDays(today, interval) };
}

function hash(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

/** Build the card deck for one subject from its pyq-bank. Stable ids, deduped. */
export function buildCards(subjectKey: string, bank: SubjectPyqBank): SrsCard[] {
  const cards: SrsCard[] = [];
  const seen = new Set<string>();
  const add = (kind: SrsCard["kind"], front: string, back: string) => {
    const f = front.trim();
    const b = back.trim();
    if (!f || !b) return;
    const id = `${subjectKey}:${kind}:${hash(f)}`;
    if (seen.has(id)) return;
    seen.add(id);
    cards.push({ id, subjectKey, kind, front: f, back: b });
  };
  for (const block of bank.theory) {
    add("concept", block.title, [...block.notes, block.detail ?? ""].filter(Boolean).join("\n"));
  }
  for (const year of bank.pyqs) {
    for (const q of year.questions) add("pyq", q.question, q.solution ?? "");
  }
  for (const drill of bank.drills) add("drill", drill.question, drill.solution ?? "");
  return cards;
}

export interface DueQueue {
  due: SrsCard[];
  fresh: SrsCard[];
}

/** Cards due today or earlier (oldest first), plus up to `newLimit` unseen cards. */
export function dueQueue(cards: SrsCard[], store: SrsStore, today: string, newLimit = 10): DueQueue {
  const due = cards
    .filter((c) => store[c.id] && store[c.id].due <= today)
    .sort((a, b) => store[a.id].due.localeCompare(store[b.id].due));
  const fresh = cards.filter((c) => !store[c.id]).slice(0, Math.max(0, newLimit));
  return { due, fresh };
}

function isState(v: unknown): v is SrsState {
  if (!v || typeof v !== "object") return false;
  const s = v as Record<string, unknown>;
  return (
    typeof s.ease === "number" &&
    typeof s.interval === "number" &&
    typeof s.reps === "number" &&
    typeof s.lapses === "number" &&
    typeof s.due === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(s.due)
  );
}

export function normalizeStore(input: unknown): SrsStore {
  const out: SrsStore = {};
  if (input && typeof input === "object") {
    for (const [id, v] of Object.entries(input as Record<string, unknown>)) if (isState(v)) out[id] = v;
  }
  return out;
}

export function readSrsStore(): SrsStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key(SRS_KEY));
    return raw ? normalizeStore(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

export function writeSrsStore(store: SrsStore): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key(SRS_KEY), JSON.stringify(store));
  } catch {
    /* storage full or blocked: keep working in memory */
  }
}
