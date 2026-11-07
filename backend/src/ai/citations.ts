import { retrieveCurriculum, type CurriculumHit } from "./curriculum-retrieval";

/**
 * Citations for Veer answers — the exact curriculum records retrieval used.
 *
 * Until now the answer could cite web research papers but never named the
 * platform's own note/PYQ it was grounded in. This module turns the ranked
 * curriculum hits into a compact structured list (`sources` on /api/ai) and a
 * markdown "From your notes" block appended to the answer.
 *
 * Deliberately NO generated deep links: corpus records include drop-in KB and
 * legacy paths whose (class, subject, unit, topicSlug) do not always map to a
 * routable topic page. A 404 link is worse than an honest source id, so each
 * citation carries its repo-relative source path plus a single link to the
 * canonical /notes archive.
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
  strength: "strong" | "weak";
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
    return `${i + 1}. **${c.title}** — ${label}${place ? ` · ${place}` : ""} · \`${c.source}\``;
  });
  return [
    "",
    "",
    "---",
    "**From your notes** — records retrieved for this answer:",
    ...lines,
    "",
    "Open the [Notes archive](/notes) to read any source in full. AI answers are study aids; check the textbook and official syllabus before quoting them.",
  ].join("\n");
}
