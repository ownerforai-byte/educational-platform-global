/**
 * CURRICULUM RETRIEVAL — the "scan the concept first" stage of every reply.
 *
 * Owner requirement (2026-09-30): when a student asks about a concept, the
 * tutor must first SEARCH the platform's own curriculum material for it, lift
 * out the WHOLE matching record — however long — and only then answer, so the
 * reply is built from real syllabus material instead of a shallow memory guess.
 *
 * SOURCE VALIDATION (owner requirement 2026-09-30, second pass): "the source of
 * the search is too shallow and light, so validate it". Auditing the real
 * corpus proved the old scorer wrong in a way users could see:
 *
 *   · Template-bank lines made 170 records "contain" photosynthesis, so a
 *     photosynthesis question was answered from the wrong records. Fixed in
 *     curriculum-corpus.ts (template/placeholder lines are stripped at load),
 *     and here by scoring on IDF instead of raw word presence.
 *   · A record with one incidental body word still cleared the threshold,
 *     because relevance/drop-in bonuses were added BEFORE the cut. Bonuses are
 *     now tie-breakers only: evidence decides first.
 *   · The question's CONTENT words had to be missing before we admitted it.
 *     "state the binomial theorem" used to match "Work-Energy Theorem" (on the
 *     word "theorem") and "explain the photoelectric effect" matched
 *     "Inductive Effect" (on "effect"). Now a question is reduced to its
 *     content-bearing terms and a record must match one of THOSE.
 *   · Filler and 15-character stub records ("Escape Velocity(15)") could win a
 *     slot by luck of the title. They are excluded from grounding.
 *   · Near-duplicate records (the authored corpus and the built notes carry the
 *     same topic) spent the whole record budget on one idea. They are merged.
 *
 * Pipeline position:
 *   question (+ conversation) → retrieveCurriculum() → buildCurriculumContext() → system prompt
 *
 * Design rules:
 *   - NOTHING IS SUMMARISED OR TRUNCATED. The matched record's every section is
 *     injected in full (the retriever bounds how many RECORDS are attached,
 *     never how much of a record is shown) — this is what ends shallow replies.
 *   - BREADTH IS A FEATURE: the best-matching record's TOPIC (its subject+unit)
 *     is then fanned out — every sibling record in that unit is attached, in
 *     author order, so a concept brings its whole unit's treatment with it.
 *     That is "all key roots, ideas and concepts, one by one".
 *   - COVERAGE IS GRADED, never faked. `none` / `weak` / `strong` tells the
 *     caller whether the platform really teaches this concept, so a thin
 *     mention is never dressed up as a grounded answer.
 *   - Scoring is lexical and explainable: position (title > slug > unit > body)
 *     × IDF (a word that half the corpus carries says almost nothing) + the
 *     author-declared `relevance`. No embeddings, no network call, no latency.
 *   - Everything is best-effort: no corpus ⇒ empty context ⇒ the caller keeps
 *     the prompt-only contract.
 */

import { getCorpus, type CorpusEntry } from "./curriculum-corpus";

/** Words that carry no retrieval signal. */
const STOP = new Set([
  "a", "an", "the", "of", "and", "or", "to", "in", "on", "for", "with", "is", "are", "was",
  "were", "be", "been", "what", "which", "who", "whom", "whose", "why", "how", "when", "where",
  "this", "that", "these", "those", "it", "its", "as", "at", "by", "from", "into", "about",
  "do", "does", "did", "can", "could", "should", "would", "will", "shall", "may", "might",
  "must", "have", "has", "had", "not", "no", "yes", "if", "then", "than", "so", "such",
  "me", "my", "our", "your", "you", "we", "i", "he", "she", "they", "them", "his", "her",
  "their", "please", "explain", "tell", "give", "write", "make", "define", "describe",
  "discuss", "state", "list", "mention", "kindly", "sir", "ma", "am", "question", "answer",
  "note", "notes", "topic", "chapter", "concept", "concepts", "class", "grade", "neb",
  "important", "full", "complete", "detail", "details", "deeply", "simple", "easy",
  "also", "more", "some", "any", "all", "each", "very", "just", "again", "then", "there",
  "same", "other", "another", "between", "use", "used", "know", "want", "need", "let",
  "one", "two", "three", "why", "who", "step", "steps", "type", "types", "part", "parts",
]);

/** Split text into meaningful lowercase tokens (letters, digits, Greek letters). */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/**
 * Light stemmer: strips the suffixes that hide matches (cells/cell,
 * forces/force, laws/law, reactions/reaction).
 *
 * Two rules, both learned from real misses:
 *   · SHORT words are stemmed too — "laws" (4 letters) never reached the old
 *     `length <= 4` early return, so "First Law of Thermodynamics" did not match
 *     the query "laws of thermodynamics" while "reactions" matched "reaction".
 *   · A long suffix must leave a real stem — stripping "ion" from "motion"
 *     produced "mot", which then matched "motor" and "motive" in unrelated
 *     records. "reaction" → "react" is still allowed; "motion" is left alone.
 */
function stem(token: string): string {
  if (token.length <= 3) return token;
  for (const suffix of ["ies", "ing", "ions", "ion", "es", "s", "ed", "al", "ic"]) {
    if (!token.endsWith(suffix)) continue;
    const remainder = token.length - suffix.length;
    const minRemainder = suffix.length >= 3 ? 5 : 3;
    if (remainder >= minRemainder) return token.slice(0, remainder);
  }
  return token;
}

// ── IDF (what a word is worth) ───────────────────────────────────────────────

interface IdfTable {
  total: number;
  df: Map<string, number>;
}

let _idf: IdfTable | null = null;
let _idfForEntries: CorpusEntry[] | null = null;

/**
 * Document frequency per stemmed token, computed once per corpus snapshot.
 * Counted over the VALIDATED records only (template lines already stripped), so
 * a word is only "common" when the platform really repeats it.
 */
function idfTable(entries: CorpusEntry[]): IdfTable {
  if (_idf && _idfForEntries === entries) return _idf;
  const df = new Map<string, number>();
  for (const entry of entries) {
    const seen = new Set<string>();
    for (const raw of tokenize(entry.haystack)) {
      const token = stem(raw);
      if (seen.has(token)) continue;
      seen.add(token);
      df.set(token, (df.get(token) ?? 0) + 1);
    }
  }
  _idf = { total: entries.length, df };
  _idfForEntries = entries;
  return _idf;
}

/**
 * Inverse document frequency: `log(1 + N / (1 + df))`. A token in 1 record of
 * 1354 scores ≈ 6.5; one in half the corpus scores ≈ 0.7 — that ratio is what
 * separates "this record is about the concept" from "this word appears here".
 */
export function idfOf(token: string, table: IdfTable, total = table.total): number {
  const df = table.df.get(token) ?? 0;
  return Math.log(1 + total / (1 + df));
}

/**
 * A question word is CONTENT-BEARING when it narrows the corpus. Words the
 * platform repeats across a large slice of its records ("effect", "theorem",
 * "principle", "structure") describe the shape of a question, not its subject —
 * matching one of those alone is exactly the false positive that made answers
 * shallow. The cut is 6% of the corpus, floored at 30 records so a small
 * drop-in corpus still behaves.
 */
export function isContentToken(token: string, table: IdfTable): boolean {
  const df = table.df.get(token) ?? 0;
  return df <= Math.max(30, Math.round(0.06 * table.total));
}

/** Strength of a token in ranking: rare words count far more than common ones. */
function tokenWeight(token: string, table: IdfTable): number {
  return Math.max(0.25, Math.min(3, idfOf(token, table) / 2));
}

// ── Query building ───────────────────────────────────────────────────────────

interface QueryToken {
  token: string;
  /** 1 for this message, less for conversational context. */
  weight: number;
  content: boolean;
}

/**
 * Build the scored token set for a question, optionally blended with the recent
 * conversation so a follow-up ("and then?", "explain more") still retrieves the
 * topic the student is actually on.
 */
export function buildQueryTokens(question: string, conversation = ""): QueryToken[] {
  const { entries } = getCorpus();
  const table = idfTable(entries);

  const merged = new Map<string, number>();
  for (const raw of tokenize(question)) {
    const token = stem(raw);
    merged.set(token, Math.max(merged.get(token) ?? 0, 1));
  }
  if (conversation) {
    for (const raw of tokenize(conversation)) {
      const token = stem(raw);
      // Earlier turns identify the topic but must never outvote this message.
      merged.set(token, Math.max(merged.get(token) ?? 0, 0.5));
    }
  }

  return Array.from(merged.entries())
    .filter(([token]) => token.length >= MIN_TOKEN_LENGTH)
    .map(([token, weight]) => ({
      token,
      weight,
      content: isContentToken(token, table),
    }));
}

// ── Scoring ─────────────────────────────────────────────────────────────────

export type CoverageGrade = "strong" | "weak" | "none";

export interface CurriculumHit {
  entry: CorpusEntry;
  score: number;
  /** Which fields produced the score — used by tests and the owner console. */
  matched: string[];
  /** Content terms found in the record's title, slug or unit. */
  positionTokens: string[];
  /** How the record matched: title/slug/unit outranks a passing body mention. */
  strength: "strong" | "weak";
  /** True when the record is a sibling pulled in from the matched topic unit. */
  related?: boolean;
}

/** A token shorter than this cannot be searched meaningfully ("le", "of"). */
const MIN_TOKEN_LENGTH = 3;

/**
 * WORD-START match on an already-lowercased haystack.
 *
 * Tokens are stemmed ("photosynthesis" → "photosynthesi"), so a full word
 * boundary can never match them again — the old `includes()` worked only
 * because it matched substrings anywhere, which is also how the two-letter
 * token "le" matched inside "principle" ("Le Chatelier's principle" retrieved
 * Heisenberg's uncertainty principle). Requiring a word START keeps the
 * stemmer useful ("cell" → cells/cellular, "ion" → ionic/ionisation) while
 * refusing matches that begin mid-word.
 */
export function containsToken(haystack: string, token: string): boolean {
  const wordChar = /[a-z0-9\u0900-\u097f]/i;
  let from = 0;
  for (;;) {
    const at = haystack.indexOf(token, from);
    if (at === -1) return false;
    if (at === 0 || !wordChar.test(haystack[at - 1])) return true;
    from = at + 1;
  }
}

export interface RetrievalResult {
  hits: CurriculumHit[];
  coverage: CoverageGrade;
  /** Content-bearing terms of the question (what the platform had to match). */
  contentTerms: string[];
  /** Content terms that matched at least one record. */
  matchedTerms: string[];
}

/** How many RECORDS a reply may be grounded in (env-overridable). */
export const DEFAULT_RECORD_LIMIT = Number(process.env.AI_CURRICULUM_RECORDS) || 6;

/**
 * Score every validated record against the question's tokens. Pure ranking — no
 * threshold, no bonuses; `retrieve()` applies the coverage rules on top.
 */
function scoreRecords(tokens: QueryToken[]): CurriculumHit[] {
  const { entries } = getCorpus();
  const table = idfTable(entries);
  const hits: CurriculumHit[] = [];

  for (const entry of entries) {
    // A filler record (too little validated content) can never ground an answer.
    if (entry.filler) continue;

    const title = entry.title.toLowerCase();
    const titleTokens = new Set(tokenize(entry.title).map(stem));
    const unitTokens = new Set(tokenize(entry.unit.replace(/-/g, " ")).map(stem));
    const slugTokens = new Set(tokenize(entry.topicSlug.replace(/-/g, " ")).map(stem));
    const body = entry.haystack;

    let score = 0;
    const positionTokens: string[] = [];
    const matched: string[] = [];

    for (const { token, weight } of tokens) {
      const w = weight * tokenWeight(token, table);
      if (titleTokens.has(token)) {
        score += 6 * w;
        positionTokens.push(token);
        matched.push(token);
      } else if (slugTokens.has(token)) {
        score += 5 * w;
        positionTokens.push(token);
        matched.push(token);
      } else if (unitTokens.has(token)) {
        score += 4 * w;
        positionTokens.push(token);
        matched.push(token);
      } else if (containsToken(body, token)) {
        score += 2 * w;
        matched.push(token);
      }
    }

    if (!matched.length) continue;

    // Term centrality: a record that keeps saying the word is about it.
    const tf = matched.reduce((n, token) => n + Math.min(6, body.split(token).length - 1), 0);
    score += Math.min(6, tf * 0.35);

    // Phrase bonus — reward an exact multi-word phrase from the question.
    const lower = entry.title.toLowerCase();
    if (title.length > 6 && lower.includes(title)) score += 8;

    // Author-declared relevance and owner drop-ins break TIES only: they can
    // lift an equally-matched record, never qualify an unmatched one.
    score += Math.min(3, entry.relevance / 34);
    if (entry.dropIn) score += 0.5;

    hits.push({
      entry,
      score,
      // Kept complete: the coverage ratio and the all-content-terms test depend
      // on every match, not on the first eight.
      matched,
      positionTokens,
      strength: positionTokens.length > 0 ? "strong" : "weak",
    });
  }

  hits.sort(
    (a, b) =>
      b.score - a.score ||
      b.entry.contentChars - a.entry.contentChars ||
      b.entry.relevance - a.entry.relevance ||
      a.entry.title.localeCompare(b.entry.title),
  );
  return hits;
}

// ── Coverage grading ────────────────────────────────────────────────────────

/**
 * How many slots in one answer are reserved for the owner's OWN sources.
 *
 * OWNER REPORT (2026-09-30): "I have many books PDF locally, which I want to
 * make it as a source, and whenever I ask a question related to them, it should
 * scan and present all those in polished, refined and short grammar with full
 * concept." Ingestion worked, but the books still lost the race: their text
 * matches only inside the BODY (2 × weight) while a curated note matches in its
 * TITLE (6 × weight), so a chapter that teaches the concept end to end was
 * outranked by a note merely named after it and never reached the answer.
 *
 * A quota is the honest fix. It reserves slots — it does not lower the bar: a
 * reserved record must still pass `gradeStrength`, i.e. it must contain every
 * content term of the question. Junk cannot enter through this door; an owner's
 * textbook can.
 */
export const OWNER_SLOT_QUOTA = (() => {
  const declared = Number(process.env.AI_OWNER_RECORD_SLOTS);
  if (!Number.isFinite(declared) || declared < 0) return 2;
  return Math.min(4, Math.floor(declared));
})();

/**
 * STRONG means the record actually answers the whole question:
 *   · every content term of the question is present;
 *   · at least one of them sits in the record's own title, slug or unit (the
 *     record NAMES the concept) — otherwise a question about "simple harmonic
 *     motion" would be "covered" by a series chapter that merely contains the
 *     words harmonic mean;
 *   · the record matches most of the question, or its UNIT is the concept
 *     itself ("capacitor", "vectors", "limits-and-continuity" — the platform
 *     organises those units by topic, so the unit name matching IS coverage).
 *
 * OWNER MATERIAL IS GRADED DIFFERENTLY, on purpose. A book chapter is named
 * after the CHAPTER, not the concept ("Chapter 3 Motion in a Straight Line")),
 * so demanding a title match would grade every book record as a passing mention
 * and tell the tutor to answer from its own knowledge while the owner's own
 * textbook sat attached. An owner drop-in that contains EVERY content term of
 * the question, at length enough to survive the filler filter, is coverage.
 */
export function gradeStrength(
  hit: CurriculumHit,
  target: string[],
  questionTokenCount: number,
): "strong" | "weak" {
  const allContent = target.every((term) => hit.matched.includes(term));
  if (!allContent) return "weak";

  const questionRatio = hit.matched.length / Math.max(1, questionTokenCount);
  if (hit.entry.dropIn && (questionRatio >= 0.5 || hit.matched.length >= 2)) return "strong";

  const namesConcept = hit.positionTokens.some((t) => target.includes(t));
  const unitTokens = new Set(tokenize(hit.entry.unit.replace(/-/g, " ")).map(stem));
  const unitIsConcept = target.some((t) => unitTokens.has(t));
  return namesConcept && (questionRatio >= 0.6 || hit.matched.length >= 2 || unitIsConcept)
    ? "strong"
    : "weak";
}

/**
 * Choose the records that actually get attached: the owner's own strong
 * matches FIRST, then the ranked hits, up to `limit`.
 *
 * Front placement is not cosmetic. The context builder attaches records in
 * order until the character ceiling is reached (curated records run 15k
 * characters apiece, so the ceiling is reached long before the ranking is), and
 * a record appended last is a record that never arrives. Measured on a real
 * question — "state Newton's first law of motion" — the owner's ingested book
 * ranked sixth and was cut every single time: exactly the "I ask about my books
 * and nothing comes" failure the quota exists to prevent. It also matches the
 * documented source hierarchy, where an owner drop-in outranks the authored
 * corpus.
 *
 * The gate stays strict: only a STRONG owner match is promoted, i.e. a record
 * carrying every content term of the question. Per the hierarchy, curated hits
 * keep their places behind it — nothing is discarded that could have fitted.
 */
export function selectHits(
  candidates: CurriculumHit[],
  limit: number,
  quota = OWNER_SLOT_QUOTA,
): CurriculumHit[] {
  const chosen = candidates.slice(0, limit);
  if (quota <= 0) return chosen;

  // A quota, not a nudge: at most `quota` owner records are attached. Beyond
  // that the owner's book has to earn its place like anything else — one long
  // chapter that mentions every term must not crowd out the curated notes.
  const ownerStrong = candidates.filter((h) => h.entry.dropIn && h.strength === "strong");
  if (!ownerStrong.length) return chosen;

  const promote = ownerStrong.slice(0, quota);
  const rest = chosen.filter((hit) => !ownerStrong.includes(hit));
  return [...promote, ...rest.slice(0, Math.max(0, limit - promote.length))];
}

// ── Duplicate suppression ───────────────────────────────────────────────────

/**
 * Two records teach the same idea when their titles agree after dropping the
 * "— General Characteristics" / ": Part 2" tails the corpora add.
 */
export function titleKey(title: string): string {
  return title
    .toLowerCase()
    .replace(/[—–:·|].*$/, "")
    .replace(/\(.*?\)/g, " ")
    .replace(/\b(notes?|introduction|and its|general|characteristics|part|chapter|unit)\b/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Deduplicate overlapping copies of one topic, keeping the richest. */
function dedupe(hits: CurriculumHit[]): CurriculumHit[] {
  const byKey = new Map<string, CurriculumHit>();
  const order: string[] = [];
  for (const hit of hits) {
    const e = hit.entry;
    const key = `${
      titleKey(e.title) || (e.topicSlug || `${e.unit}|${e.title}`).toLowerCase()
    }|${e.subject}`;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, hit);
      order.push(key);
      continue;
    }
    // Same topic from two roots: keep the better match, then the denser record.
    const better =
      hit.score > existing.score + 1 ||
      (Math.abs(hit.score - existing.score) <= 1 &&
        hit.entry.contentChars > existing.entry.contentChars * 1.2)
        ? hit
        : existing;
    byKey.set(key, better);
  }
  return order.map((key) => byKey.get(key)!);
}

// ── Retrieval ───────────────────────────────────────────────────────────────

/**
 * Score, dedupe and grade the question against the platform corpus.
 *
 * Coverage is graded honestly:
 *   strong — the question's content terms matched a record's title/slug/unit.
 *   weak   — they matched only inside a record's body (a passing mention).
 *   none   — the platform has nothing; the caller must answer from knowledge
 *            and live web results instead of dressing up a thin record.
 *
 * `strong` hits are then fanned out across their own topic unit (subject+unit),
 * so a single well-matched concept brings its unit's whole treatment with it.
 */
export function retrieve(question: string, limit = DEFAULT_RECORD_LIMIT, conversation = ""): RetrievalResult {
  const q = question.trim();
  const tokens = buildQueryTokens(q, conversation);
  const contentTerms = tokens.filter((t) => t.content).map((t) => t.token);
  const matchedTerms = new Set<string>();

  if (q.length < 3 || !tokens.length) {
    return { hits: [], coverage: "none", contentTerms, matchedTerms: [] };
  }

  const { entries } = getCorpus();
  const table = idfTable(entries);
  // A question of only ordinary words still has to retrieve something; fall
  // back to its least-common terms rather than abandoning the search.
  const target = contentTerms.length
    ? contentTerms
    : [...tokens]
        .sort((a, b) => idfOf(b.token, table) - idfOf(a.token, table))
        .slice(0, 2)
        .map((t) => t.token);

  const scored = scoreRecords(tokens);
  const candidates: CurriculumHit[] = [];
  for (const hit of scored) {
    // The record must match at least one CONTENT term of the question — this is
    // what stops "state the binomial theorem" being answered by "Work-Energy
    // Theorem" because both contain the word "theorem".
    const contentHits = hit.matched.filter((m) => target.includes(m));
    if (!contentHits.length) continue;

    const strength = gradeStrength(hit, target, tokens.length);
    if (strength === "strong") contentHits.forEach((m) => matchedTerms.add(m));
    candidates.push({ ...hit, strength });
  }

  const deduped = dedupe(candidates);
  const strong = deduped.filter((h) => h.strength === "strong");
  const coverage: CoverageGrade = strong.length ? "strong" : deduped.length ? "weak" : "none";

  // Topic fan-out, deliberately narrow: only when the record's POSITION match is
  // the topic UNIT itself ("capacitor", "limits-and-continuity") is every
  // record in that unit about the asked concept by construction. Fanning out
  // from a merely strong record once dragged the whole algebra unit into a
  // simple-harmonic-motion question, which is worse than no grounding at all.
  let siblings: CurriculumHit[] = [];
  if (coverage === "strong") {
    const top = strong[0];
    const unitTokens = new Set(tokenize(top.entry.unit.replace(/-/g, " ")).map(stem));
    const unitNamed = target.some((t) => unitTokens.has(t));
    if (unitNamed) {
      const seenIds = new Set(deduped.map((h) => h.entry.id));
      siblings = entries
        .filter((e) => !e.filler && e.subject === top.entry.subject && e.unit === top.entry.unit && !seenIds.has(e.id))
        .sort((a, b) => b.relevance - a.relevance || b.contentChars - a.contentChars)
        .map<CurriculumHit>((entry) => ({
          entry,
          score: 0,
          matched: [],
          positionTokens: [],
          strength: "strong" as const,
          related: true,
        }));
    }
  }

  // Whole-record budget. Siblings carry score 0 and stay after the ranked hits,
  // so the returned ordering is always non-increasing.
  const hits = [...selectHits(deduped, Math.max(1, limit)), ...siblings].slice(
    0,
    Math.max(1, limit),
  );
  return { hits, coverage, contentTerms: target, matchedTerms: Array.from(matchedTerms) };
}

/**
 * Backwards-compatible ranked hits for the owner console and the test suite.
 * Same rule set as `retrieve()`; sibling records a strong match pulls in are
 * appended after the ranked hits.
 */
export function retrieveCurriculum(question: string, limit = 3): CurriculumHit[] {
  return retrieve(question, limit).hits;
}

// ── Context block (what the model actually receives) ─────────────────────────

/** Safety ceiling on total injected characters (a pathological record must not
 *  blow the prompt). Records are never silently trimmed — the LAST whole
 *  record is dropped instead, so a reader only ever sees complete records. */
const MAX_CONTEXT_CHARS = Number(process.env.AI_CURRICULUM_MAX_CHARS) || 48_000;

/** Format one record as a complete, untruncated knowledge block. */
export function formatRecord(entry: CorpusEntry): string {
  const classLabel =
    entry.classLevel === "class-11"
      ? "Class 11"
      : entry.classLevel === "class-12"
        ? "Class 12"
        : "Class 11/12";

  const lines: string[] = [
    `■ ${entry.title}  (${classLabel} · ${entry.subject} · ${entry.unit})`,
  ];
  if (entry.topicSlug) lines.push(`  topic slug: ${entry.topicSlug}`);
  lines.push(`  source: ${entry.source}`);

  for (const section of entry.sections) {
    lines.push(`  ▸ ${section.label}:`);
    for (const line of section.lines) lines.push(`    - ${line}`);
  }

  return lines.join("\n");
}

/** What the model is told to DO with the records it was handed. */
function directiveFor(coverage: CoverageGrade, recordCount: number): string[] {
  if (coverage === "strong") {
    return [
      `The records below are the platform's OWN Class 11/12 material matched to this`,
      `question, and they were retrieved verbatim and in full — nothing was summarised or cut.`,
      `These ${recordCount} record(s) are the VERIFIED SPINE of the answer:`,
      `- Cover EVERY record, one idea at a time, in CONCEPTUAL ORDER — the roots and`,
      `  definitions first, then the ideas built on them, then the derived results,`,
      `  applications, confusions and exam traps. Do not skip a record, do not skip a`,
      `  section inside a record, and do not compress several ideas into one line.`,
      `- Where a record is already well written, carry its own sentences across with only`,
      `  light grammar and flow polish — a faithful, polished restatement is wanted here,`,
      `  not a shorter retelling from memory.`,
      `- Deepen with your own established knowledge where a record stops, but never`,
      `  contradict it and never invent an extra record or a source name.`,
    ];
  }
  if (coverage === "weak") {
    return [
      `The platform has NO record dedicated to this concept — the records below only`,
      `MENTION it in passing (they matched on the concept's own words, not on a topic`,
      `that teaches it). Say nothing that implies the platform covers it.`,
      `- Answer the concept COMPLETELY from your own established Class 11/12 knowledge,`,
      `  in conceptual order (roots → ideas → concepts → results → applications → exam`,
      `  traps), using the attached live web results where they add verified facts.`,
      `- Use a record below ONLY for a fact it genuinely carries, and never present a`,
      `  passing mention as the syllabus treatment of the concept.`,
    ];
  }
  return [];
}

/**
 * Build the `[CURRICULUM SOURCE]` block for one question.
 *
 * Returns "" when the platform has no matching material — the caller then
 * simply ships the prompt-only contract, never a failed request.
 *
 * Count is bounded; length is bounded only by the record-whole ceiling above.
 */
export function buildCurriculumContext(
  question: string,
  limit = DEFAULT_RECORD_LIMIT,
  conversation = "",
): string {
  try {
    const { hits, coverage } = retrieve(question, limit, conversation);
    if (!hits.length) return "";

    const { stats } = getCorpus();
    const statsLine =
      `Indexed sources: ${stats.entries} records` +
      ` (Class 11: ${stats.byClass["class-11"] ?? 0}, Class 12: ${stats.byClass["class-12"] ?? 0},` +
      ` unknown level: ${stats.byClass["unknown"] ?? 0},` +
      ` owner drop-ins: ${stats.dropIn},` +
      ` template-bank lines stripped: ${stats.boilerplateLines},` +
      ` records without enough real content: ${stats.fillerRecords})` +
      ` from ${stats.roots.length} source folder(s).`;

    const blocks: string[] = [];
    let used = 0;
    for (const hit of hits) {
      const block = formatRecord(hit.entry);
      if (used + block.length > MAX_CONTEXT_CHARS && blocks.length) break; // keep records whole
      blocks.push(block);
      used += block.length + 2;
    }    return [
      `[CURRICULUM SOURCE — PLATFORM-OWNED MATERIAL, READ IT FIRST]`,
      statsLine,
      ``,
      `Coverage for this question: ${coverage.toUpperCase()}.`,
      // Always true, whatever the grade: the records themselves are whole. What
      // the grade changes is how much they may be relied on.
      `Every attached record was retrieved verbatim and in full — nothing was summarised or cut.`,
      ...directiveFor(coverage, blocks.length),
      ``,
      ...blocks,
    ].join("\n");
  } catch {
    // Grounding is best-effort: never block a chat on it.
    return "";
  }
}

/** Context block that also knows the recent conversation (follow-up support). */
export function buildCurriculumContextFor(
  messages: Array<{ role: string; content: string }>,
  limit = DEFAULT_RECORD_LIMIT,
): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const tail = messages
    .slice(-6)
    .filter((m) => m.content && m.content !== lastUser)
    .map((m) => m.content.slice(0, 600))
    .join(" \n ");
  return buildCurriculumContext(lastUser, limit, tail);
}

/** Compact corpus summary — used by the owner console / diagnostics. */
export function curriculumSummary(): {
  entries: number;
  byClass: Record<string, number>;
  bySubject: Record<string, number>;
  dropIn: number;
  filler: number;
  contentChars: number;
} {
  const { stats } = getCorpus();
  return {
    entries: stats.entries,
    byClass: stats.byClass,
    bySubject: stats.bySubject,
    dropIn: stats.dropIn,
    filler: stats.fillerRecords,
    contentChars: stats.contentChars,
  };
}

/** True when the platform's own curriculum material covers this question. */
export function hasCurriculumCoverage(question: string): boolean {
  return retrieve(question, 1).hits.length > 0;
}

/**
 * Coverage audit — where the platform's source is strong and where it is thin,
 * per subject. This is the "validate it" report: the owner can see which
 * grade-11/12 concepts have real material and which are answered from the
 * model's own knowledge instead of pretending a record exists.
 */
export function auditCurriculumCoverage(questions: string[]): Array<{
  question: string;
  coverage: CoverageGrade;
  topTitles: string[];
}> {
  return questions.map((question) => {
    const { hits, coverage } = retrieve(question, 3);
    return { question, coverage, topTitles: hits.map((h) => h.entry.title) };
  });
}
