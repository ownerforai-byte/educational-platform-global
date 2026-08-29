/**
 * Content lifecycle code words — shared vocabulary so authors, agents and
 * the UI can tell apart "missing" from "broken" from "empty".
 *
 *  NOT_ADDED — no content is attached to this syllabus slot at all.
 *              Fix: create the JSON under content/ravikishan/... then run
 *              `npm run content:build`.
 *  EMPTY     — the content entry exists and loads, but has no usable text
 *              (missing/blank `notes`).
 *              Fix: fill in the `notes` array, re-run content:build.
 *  BROKEN    — the entry exists but failed to load or render (index out of
 *              sync, malformed JSON, renderer threw).
 *              Fix: check the file parses, re-run `npm run content:build`.
 *  OK        — loaded and rendered successfully. Never shown as a badge;
 *              absence of a badge means OK.
 */
export const NOTE_STATUS = {
  NOT_ADDED: "NOT_ADDED",
  EMPTY: "EMPTY",
  BROKEN: "BROKEN",
  OK: "OK",
} as const;

export type NoteStatus = (typeof NOTE_STATUS)[keyof typeof NOTE_STATUS];

export const NOTE_STATUS_HINTS: Record<NoteStatus, string> = {
  [NOTE_STATUS.NOT_ADDED]: "No note is attached here yet — add one under content/ravikishan/, then run npm run content:build.",
  [NOTE_STATUS.EMPTY]: "Note exists but its notes array is missing or blank.",
  [NOTE_STATUS.BROKEN]: "Note failed to load/render — verify the JSON parses and re-run npm run content:build.",
  [NOTE_STATUS.OK]: "Loaded and rendered successfully.",
};

export type NoteBody = {
  title?: string;
  notes?: string[] | string;
};

/**
 * Classifies a loaded note body. Anything that cannot yield readable text
 * is EMPTY; load failures never reach this function and surface as BROKEN.
 */
export function getNoteStatus(body: NoteBody | null | undefined): NoteStatus {
  if (!body) return NOTE_STATUS.BROKEN;

  const { notes } = body;
  if (typeof notes === "string") {
    return notes.trim().length > 0 ? NOTE_STATUS.OK : NOTE_STATUS.EMPTY;
  }
  if (!Array.isArray(notes) || notes.length === 0) return NOTE_STATUS.EMPTY;
  return notes.some((line) => typeof line === "string" && line.trim().length > 0)
    ? NOTE_STATUS.OK
    : NOTE_STATUS.EMPTY;
}
