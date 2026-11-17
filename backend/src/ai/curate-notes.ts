/**
 * CURATED NOTES — the AI behind the one-tap "Curate my notes" block.
 *
 * Owner 2026-11-09: "wire it only with agnes api key without exposing
 * anywhere … simply the ai behind 'curate my notes' is agnes working with
 * agnes api key" — and "make it conscious like it knows the place and make
 * notes according to place like 20-80 bullet points".
 *
 * So this module:
 *   · talks to Agnes ONLY (the AGNES_API_KEY lives in the backend env and is
 *     read through `config.readKey` — never logged, never sent to a client,
 *     never part of any response);
 *   · is PLACE-AWARE: every request carries where the student is (surface,
 *     class, subject, chapter, topic) and the notes are written for that
 *     place — a Physics chapter gets physics-shaped notes, a whole-subject
 *     home gets subject-shaped ones;
 *   · returns 20–80 bullet points (the model is asked for 20–80; the parse
 *     hard-clamps to that band so one tap can never flood the block).
 */

import { agnesComplete, type AIChatMessage } from "./service.js";

export interface CuratePlace {
  /** Where the block stands: "veer-chat" | "tutor-console" | "widget" | … */
  surface: string;
  classLevel?: string;
  subject?: string;
  chapter?: string;
  topic?: string;
}

export interface CuratedSection {
  heading: string;
  bullets: string[];
}

export interface CuratedNotes {
  title: string;
  sections: CuratedSection[];
  bulletCount: number;
  /** The AI behind the block — always Agnes. */
  provider: "agnes";
}

/** Human label for where the student is standing. */
export function placeLabel(place: CuratePlace): string {
  return [place.topic, place.chapter, place.subject, place.classLevel]
    .filter(Boolean)
    .join(" · ") || "your syllabus";
}

const SURFACE_HINTS: Record<string, string> = {
  "chapter-tab": "a chapter's Curated Notes tab (one chapter of one subject — write notes for THAT chapter's grain)",
  "veer-chat": "the main Veer chat (a mixed, cross-subject study session)",
  "tutor-console": "the tutor console (a focused teaching session)",
  widget: "the floating professor widget (quick help while working)",
  "subject-classroom": "a subject classroom (one subject, own history)",
};

/** Place-aware system prompt — the "conscious like it knows the place" part. */
export function buildCurateNotesMessages(place: CuratePlace): AIChatMessage[] {
  const where = placeLabel(place);
  const surface =
    SURFACE_HINTS[place.surface] ?? `the ${place.surface} surface of the app`;

  return [
    {
      role: "system",
      content: [
        "You are Agnes, the revision-notes curator of an NEB + entrance exam platform for Nepali students.",
        `The student pressed one button while standing at: ${where}.`,
        `That place is ${surface}.`,
        "",
        "Write revision notes FOR THAT PLACE — not generic notes. Honour the grain of the place: a single topic gets topic-deep notes; a chapter gets its key ideas; a subject or class level gets its highest-yield map. If a class level or subject is named, keep every fact correct for that syllabus; never mix in another level's content.",
        "",
        "OUTPUT CONTRACT — follow exactly:",
        "- 20 to 80 bullet points in total. Count them. Fewer than 20 or more than 80 is a failed answer.",
        "- Group the bullets under 2 to 6 short sections. Each section starts with a line '## <section heading>'.",
        "- Every bullet starts with '- ' and is ONE exam-useful line: a key term, a formula or rule, a fact, a common mistake to avoid, or a quick check question.",
        "- No preamble, no closing remarks, no numbering, no nested bullets. Markdown math ($...$ or plain text) is fine inside a bullet.",
      ].join("\n"),
    },
    {
      role: "user",
      content: `Curate my revision notes for this place: ${where}.`,
    },
  ];
}

/**
 * Parse Agnes's reply into sections + bullets, clamped to the 20–80 band.
 * Tolerates the model drifting to plain bullets (no sections) or bold
 * headings instead of `##`.
 */
export function parseCuratedNotes(
  raw: string,
  place: CuratePlace,
): CuratedNotes {
  const sections: CuratedSection[] = [];
  let current: CuratedSection = { heading: "Key points", bullets: [] };

  for (const line of (raw ?? "").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const heading = trimmed.match(/^(?:#{1,3}\s*|\*\*|__)([^*_#]{2,60})(?:\*\*|__)?$/);
    if (heading && !trimmed.startsWith("-")) {
      if (current.bullets.length > 0) sections.push(current);
      current = { heading: heading[1].replace(/[:：]\s*$/, "").trim(), bullets: [] };
      continue;
    }

    const bullet = trimmed.match(/^(?:[-*•–]|\d+[.)])\s+(.{2,})$/);
    if (bullet) {
      // One line per bullet — long prose paragraphs get split at sentence
      // boundaries so no "bullet" is a wall of text.
      for (const piece of bullet[1].split(/(?<=[.?!])\s+(?=[A-Z$])/)) {
        if (piece.trim().length >= 2) current.bullets.push(piece.trim());
      }
    }
  }
  if (current.bullets.length > 0) sections.push(current);

  // Clamp to the promised band: keep the first 80 bullets in order.
  let count = 0;
  const clamped: CuratedSection[] = [];
  for (const section of sections) {
    const room = 80 - count;
    if (room <= 0) break;
    const bullets = section.bullets.slice(0, room);
    count += bullets.length;
    clamped.push({ heading: section.heading, bullets });
  }

  return {
    title: `Curated notes — ${placeLabel(place)}`,
    sections: clamped,
    bulletCount: count,
    provider: "agnes",
  };
}

/**
 * Curate notes for one place through Agnes. Throws when Agnes is not
 * configured or fails — the caller shows the honest error; there is NO
 * fallback provider on purpose (owner: the AI behind this button IS Agnes).
 */
export async function curateNotes(place: CuratePlace): Promise<CuratedNotes> {
  const raw = await agnesComplete(buildCurateNotesMessages(place));
  return parseCuratedNotes(raw, place);
}
