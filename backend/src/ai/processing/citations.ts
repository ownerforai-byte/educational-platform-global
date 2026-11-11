import { retrieveCurriculum, type CurriculumHit } from "../curriculum-retrieval";

/**
 * Citations for Veer answers — the exact curriculum records retrieval used.
 *
 * Until now the answer could cite web research papers but never named the
 * platform's own note/PYQ it was grounded in. This module turns the ranked
 * curriculum hits into a compact structured list (`sources` on /api/ai) and a
 * markdown "From your notes" block appended to the answer.
 *
 * Deliberately NO generated deep links for records that cannot prove one:
 * corpus records include drop-in KB and legacy paths whose
 * (class, subject, unit, topicSlug) do not always map to a routable topic page.
 * A 404 link is worse than an honest source id, so every citation still carries
 * its repo-relative source path. Where the coordinates ARE routable the path is
 * hidden behind the title as a link instead of being printed (owner 2026-11-11:
 * "instead of showing path, make them work as links to that path directly
 * saving space").
 */
export type CitationKind = "note" | "pyq";

export interface AnswerCitation {
  kind: CitationKind;
  id: string;
  title: string;
  classLevel: string;
  subject: string;
  unit: string;
  topicSlug: string;
  /** Repo-relative path of the exact record used — the durable citation. */
  source: string;
  /** App route for the record, when its coordinates are routable. */
  href?: string;
  strength: "strong" | "weak";
}

/** A URL path segment the chapter route can actually serve. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slug(value: string | undefined): string | null {
  const s = (value ?? "").trim().toLowerCase();
  return s.length > 0 && s.length <= 80 && SLUG.test(s) ? s : null;
}

/**
 * Route for a citation, or undefined when nothing routable can be proven.
 *
 * Drop-in `backend/kb` records are excluded: their unit is a KB folder name,
 * not a syllabus unit id, so the chapter page's `dynamicParams = false` would
 * 404. Anything else with a safe class + subject gets at least the subject hub.
 */
function citationHref(entry: {
  classLevel?: string;
  subject?: string;
  unit?: string;
  dropIn?: boolean;
}): string | undefined {
  if (entry.dropIn) return undefined;
  const track =
    entry.classLevel === "class-11"
      ? "class-11-notes"
      : entry.classLevel === "class-12"
        ? "class-12-notes"
        : null;
  if (!track) return undefined;
  const subject = slug(entry.subject);
  if (!subject) return undefined;
  const unit = slug(entry.unit);
  return unit
    ? `/${track}/${subject}/chapters/${unit}`
    : `/${track}/${subject}`;
}

function kindOf(source: string): CitationKind {
  const s = source.toLowerCase();
  return s.includes("practice/questions") || s.includes("pyq") || s.includes("past-paper")
    ? "pyq"
    : "note";
}

export function toCitation(hit: CurriculumHit): AnswerCitation | null {
  const entry = hit?.entry;
  if (!entry?.title || !entry?.id) return null;
  return {
    kind: kindOf(String(entry.source ?? entry.id)),
    id: String(entry.id),
    title: String(entry.title).slice(0, 160),
    classLevel: String(entry.classLevel ?? ""),
    subject: String(entry.subject ?? ""),
    unit: String(entry.unit ?? ""),
    topicSlug: String(entry.topicSlug ?? ""),
    source: String(entry.source ?? entry.id),
    href: citationHref(entry),
    strength: hit.strength === "weak" ? "weak" : "strong",
  };
}

/** Ranked, de-duplicated citations for one question. Never throws.
 *  `retriever` is injectable so the policy (kind, dedupe, limit) is testable
 *  without loading the real corpus; production defaults to live retrieval. */
export function buildCitations(
  question: string,
  limit = 3,
  retriever: (q: string, n: number) => CurriculumHit[] = retrieveCurriculum,
): AnswerCitation[] {
  if (!question || !question.trim()) return [];
  try {
    const seen = new Set<string>();
    const out: AnswerCitation[] = [];
    for (const hit of retriever(question, limit)) {
      const citation = toCitation(hit);
      if (!citation || seen.has(citation.id)) continue;
      seen.add(citation.id);
      out.push(citation);
    }
    return out;
  } catch {
    // Retrieval is an enhancement; a corpus problem must never break an answer.
    return [];
  }
}

export function formatCitations(citations: AnswerCitation[]): string {
  if (!citations.length) return "";
  const lines = citations.map((c, i) => {
    const place = [c.classLevel, c.subject, c.unit].filter(Boolean).join(" · ");
    const label = c.kind === "pyq" ? "Past paper" : "Note";
    // A routable record is linked by its title and the long repo path is
    // dropped; an unroutable one keeps the path, which is its only pointer.
    const name = c.href
      ? `[${c.title}](${c.href})`
      : `**${c.title}** · \`${c.source}\``;
    return `${i + 1}. ${name} — ${label}${place ? ` · ${place}` : ""}`;
  });
  return [
    "",
    "",
    "---",
    "**From your notes** — tap a record to open it:",
    ...lines,
    "",
    "Open the [Notes archive](/notes) to read any source in full. AI answers are study aids; check the textbook and official syllabus before quoting them.",
  ].join("\n");
}
