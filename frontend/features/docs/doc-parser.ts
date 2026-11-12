/**
 * Doc parser — turns the concept JSON's `notes` array (markdown-ish strings
 * with "**Term:**" lead-ins and $...$/$$...$$ LaTeX) into structured document
 * segments the DocView can typeset as a real page instead of a word list.
 */

export type DocSegment =
  | { kind: "definition"; term: string; body: string }
  | { kind: "paragraph"; body: string }
  | { kind: "displayMath"; tex: string }
  | { kind: "list"; items: string[] };

export interface DocBlock {
  /** Original note index (for figure anchoring). */
  index: number;
  /** Heading derived from the first definition term, if any. */
  heading?: string;
  segments: DocSegment[];
}

const BOLD_LEAD = /^\*\*(.+?)\*\*[:：]?\s*/;
const DISPLAY_MATH = /^\$\$(.+)\$\$$/;

/**
 * Parse one note string into segments. A leading "**Term:**" becomes a
 * definition block; inline $$...$$ on its own line becomes display math;
 * "- " lines group into lists; everything else is a paragraph.
 */
export function parseNote(raw: string): DocBlock {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  const segments: DocSegment[] = [];
  let heading: string | undefined;
  let pendingList: string[] | undefined;

  const flushList = () => {
    if (pendingList && pendingList.length > 0) {
      segments.push({ kind: "list", items: pendingList });
    }
    pendingList = undefined;
  };

  for (const line of lines) {
    const display = line.match(DISPLAY_MATH);
    if (display) {
      flushList();
      segments.push({ kind: "displayMath", tex: display[1].trim() });
      continue;
    }

    if (/^[-*•]\s+/.test(line)) {
      const item = line.replace(/^[-*•]\s+/, "");
      if (!pendingList) pendingList = [];
      pendingList.push(item);
      continue;
    }
    flushList();

    const lead = line.match(BOLD_LEAD);
    if (lead) {
      const term = lead[1].replace(/[:：]\s*$/, "");
      if (!heading) heading = term;
      segments.push({ kind: "definition", term, body: line.slice(lead[0].length).trim() });
      continue;
    }
    segments.push({ kind: "paragraph", body: line });
  }
  flushList();

  return { index: 0, heading, segments };
}

/** Parse the full notes array, keeping original indices for figure anchoring. */
export function parseNotes(notes: string[]): DocBlock[] {
  return notes.map((note, index) => ({ ...parseNote(note), index }));
}

/** Approximate reading time for the whole doc (words / 180 wpm, min 1). */
export function readingMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}
