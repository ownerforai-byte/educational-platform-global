import type { ImportedNote, NotesTrack } from "@/lib/imported-notes";

/**
 * Imported-note deep-link routing.
 *
 * The old standalone routes `/r-notes/*` and `/ravikishan-notes/*` were
 * removed (only `_disabled` migration pages remain), but several surfaces
 * still deep-linked into them, producing 404s. This module maps every
 * imported note to a route that actually exists today:
 *
 * - ravikishan notes with a resolvable syllabus unit →
 *     /{track}/chapters/{unit}
 * - ravikishan notes without a unit (e.g. pyqs/, theory/, legacy roots) →
 *     /{track}/{subject} hub (which renders the note inline)
 * - r-export chapter notes → /{track}/{subject} hub
 *
 * Keep this in sync if the note routes are ever reintroduced.
 */

const TRACKS = new Set(["class-11-notes", "class-12-notes"]);

function isSafeSegment(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= 160 &&
    /^[a-z0-9-]+$/i.test(value)
  );
}

/**
 * Resolve the notes track ("class-11-notes" | "class-12-notes") for a note.
 * The manifest path root is ground truth (target is derived from it), with
 * target as fallback; defaults to class-11-notes.
 */
function resolveTrack(note: ImportedNote): NotesTrack {
  const first = note.path.split(/[\\/]/)[0];
  if (first === "class-12" || first === "class-12-notes") return "class-12-notes";
  if (TRACKS.has(note.target)) return note.target;
  return "class-11-notes";
}

/**
 * Route for a single imported note. Always returns an app-relative URL for a
 * page that exists in the current route tree.
 */
export function noteRoute(note: ImportedNote): string {
  const track = resolveTrack(note);

  if (note.source === "ravikishan" && note.unit && isSafeSegment(note.unit)) {
    // Chapter page: /class-11-notes/physics/chapters/ideal-gas
    return `/${track}/${encodeURIComponent(note.subject)}/chapters/${encodeURIComponent(note.unit)}`;
  }

  // Subject hub: renders theory/PYQ banks (incl. r-export chapter notes)
  return `/${track}/${encodeURIComponent(note.subject)}`;
}

/** Grouped variant used by listing pages that show one link per note group. */
export function noteRoutes(notes: ImportedNote[]): Array<{ note: ImportedNote; href: string }> {
  return notes.map((note) => ({ note, href: noteRoute(note) }));
}
