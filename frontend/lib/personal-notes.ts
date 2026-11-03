/**
 * Personal notes and annotations: the student's OWN writing, kept apart from
 * the curriculum corpus. An annotation is a note with an optional `quote` (the
 * curriculum passage being commented on).
 *
 * Device-local only (localStorage, same pattern as lib/srs and lib/study-goals);
 * there is no server write because the platform has no notes backend.
 */

import { isCurrentScope, key, keyForScope, storageScope } from "@/lib/scoped-storage";

export const MY_NOTES_KEY = "neb-my-notes:v1";
export const MAX_NOTE_TITLE = 120;
export const MAX_NOTE_BODY = 5000;
export const MAX_NOTE_QUOTE = 600;

export interface PersonalNote {
  id: string;
  title: string;
  body: string;
  /** Curriculum passage this note annotates (empty for a free note). */
  quote: string;
  /** `classSlug/subjectSlug` or "" when not tied to a subject. */
  subjectKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteDraft {
  title: string;
  body: string;
  quote: string;
  subjectKey: string;
}

export const EMPTY_DRAFT: NoteDraft = { title: "", body: "", quote: "", subjectKey: "" };

/** Null when valid, otherwise a user-facing message. */
export function validateNote(draft: NoteDraft): string | null {
  if (draft.title.trim().length === 0) return "Give the note a title.";
  if (draft.title.trim().length > MAX_NOTE_TITLE) return `Title must be ${MAX_NOTE_TITLE} characters or fewer.`;
  if (draft.body.trim().length === 0 && draft.quote.trim().length === 0) return "Write something in the note.";
  if (draft.body.length > MAX_NOTE_BODY) return `Note must be ${MAX_NOTE_BODY} characters or fewer.`;
  if (draft.quote.length > MAX_NOTE_QUOTE) return `Quoted passage must be ${MAX_NOTE_QUOTE} characters or fewer.`;
  return null;
}

/** Pure: add a note from a valid draft. `id` and `now` are injected for testability. */
export function addNote(notes: PersonalNote[], draft: NoteDraft, id: string, now: string): PersonalNote[] {
  const note: PersonalNote = {
    id,
    title: draft.title.trim(),
    body: draft.body.trim(),
    quote: draft.quote.trim(),
    subjectKey: draft.subjectKey,
    createdAt: now,
    updatedAt: now,
  };
  return [note, ...notes];
}

export function updateNote(notes: PersonalNote[], id: string, draft: NoteDraft, now: string): PersonalNote[] {
  return notes.map((n) =>
    n.id === id
      ? { ...n, title: draft.title.trim(), body: draft.body.trim(), quote: draft.quote.trim(), subjectKey: draft.subjectKey, updatedAt: now }
      : n,
  );
}

export function removeNote(notes: PersonalNote[], id: string): PersonalNote[] {
  return notes.filter((n) => n.id !== id);
}

/** Newest edit first; optional subject filter and case-insensitive text search. */
export function filterNotes(notes: PersonalNote[], query: string, subjectKey: string): PersonalNote[] {
  const q = query.trim().toLowerCase();
  return notes
    .filter((n) => !subjectKey || n.subjectKey === subjectKey)
    .filter((n) => !q || `${n.title} ${n.body} ${n.quote}`.toLowerCase().includes(q))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

function isNote(v: unknown): v is PersonalNote {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.title === "string" &&
    typeof o.body === "string" &&
    typeof o.quote === "string" &&
    typeof o.subjectKey === "string" &&
    typeof o.createdAt === "string" &&
    typeof o.updatedAt === "string"
  );
}

export function normalizeNotes(input: unknown): PersonalNote[] {
  return Array.isArray(input) ? input.filter(isNote) : [];
}

export function readNotes(): PersonalNote[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key(MY_NOTES_KEY));
    return raw ? normalizeNotes(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

/** The scope notes were loaded under; pass it back to writeNotes. */
export function notesScope(): string {
  return storageScope();
}

/**
 * Persist notes. When `loadedScope` is given and the account/browser identity
 * has changed since (another tab signed in as someone else), the write is
 * REJECTED (returns false) so A's notes never land under B's key; the caller
 * must reload. Returns true once written (or when storage is unavailable).
 */
export function writeNotes(notes: PersonalNote[], loadedScope?: string): boolean {
  if (typeof window === "undefined") return true;
  if (loadedScope !== undefined && !isCurrentScope(loadedScope)) return false;
  try {
    const target = loadedScope !== undefined ? keyForScope(MY_NOTES_KEY, loadedScope) : key(MY_NOTES_KEY);
    window.localStorage.setItem(target, JSON.stringify(notes));
  } catch {
    /* storage full or blocked: keep working in memory */
  }
  return true;
}
