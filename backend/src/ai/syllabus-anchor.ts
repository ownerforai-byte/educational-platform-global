/**
 * SYLLABUS ANCHOR + REPLY FLOOR — the anti-random-answer engine.
 *
 * Owner requirement (2026-09-29): chat replies must never be random. Every
 * reply must (a) be anchored in the NEB syllabus — find where the asked thing
 * lives in the syllabus, or, when it lives outside it, find WHERE IT
 * ORIGINATES inside the syllabus and build from that origin up to the asked
 * thing; and (b) match reply length to the question, keeping conversational
 * and direct fact turns concise while scaling depth for substantive asks.
 *
 * Two halves:
 *   1. SYLLABUS ANCHOR — buildSyllabusAnchorBlock(): DB-backed match of the
 *      question against subjects/chapters/topics, producing a directive block
 *      injected into the system prompt of every chat request.
 *   2. QUESTION-SIZED DEPTH — floorWordsForQuestion() and enforceReplyFloor():
 *      bounded server-side expansion for substantive asks; conversational and
 *      concise direct questions have no minimum, while depth requests scale up.
 */

import { supabaseAdmin } from "../db/supabase";

// ── 1. Syllabus anchor ───────────────────────────────────────────────────────

/** One syllabus hit: subject → chapter(unit) → topics. */
export interface SyllabusHit {
  subject: string;
  unit: string;
  topics: string[];
}

/** Minimal DB row shapes needed for matching. */
interface AnchorSubject {
  id: string;
  name: string;
}
interface AnchorChapter {
  id: string;
  subject_id: string;
  title: string;
}
interface AnchorTopic {
  id: string;
  chapter_id: string;
  title: string;
}

/** Depth signal of a question — used to select expansion guidance. */
export type QuestionDepth = "shallow" | "medium" | "deep";

/** Length floor for full-topic answers; brief and direct asks are exempt. */
export const REPLY_FLOOR_WORDS = 250;

/** Depth-based guidance expands only explicit or substantive depth requests. */
export const DEPTH_FLOOR_WORDS: Record<QuestionDepth, number> = {
  shallow: REPLY_FLOOR_WORDS,
  medium: 350,
  deep: 500,
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Classify the depth signal of a question.
 * "deep" = explicit requests for thorough coverage, derivations or proofs;
 * "medium" = mechanisms, explanations and comparisons;
 * "shallow" = direct facts, definitions and conversational chat.
 */
export function classifyQuestionDepth(question: string): QuestionDepth {
  const q = question.toLowerCase();
  const has = (...words: string[]) => words.some((w) => q.includes(w));

  if (
    has(
      "derive",
      "prove",
      "show that",
      "obtain",
      "complete knowledge",
      "teach me",
      "everything about",
      "all concepts",
      "full chapter",
      "deeply explain",
      "make notes",
      "complete notes",
      "from basic to advanced",
      "in detail",
      "detailed explanation",
      "past events",
      "history of",
      "historical events",
      "timeline",
    )
  ) {
    return "deep";
  }
  if (
    has(
      "why",
      "how does",
      "how and why",
      "how it works",
      "why it works",
      "explain",
      "difference between",
      "compare",
      "mechanism",
      "process",
      "life cycle",
      "application",
      "importance",
      "significance",
      "feature",
      "features",
      "property",
      "properties",
      "factor",
      "factors",
      "what factors",
      "date",
      "dates",
      "when was",
      "when did",
      "origin",
      "discovery",
      "discoveries",
      "ideas",
    )
  ) {
    return "medium";
  }
  return "shallow";
}

/** Floor for a question: direct and brief asks stay concise; explicit depth requests scale. */
export function floorWordsForQuestion(question: string): number {
  if (isBriefQuestion(question) || isShortQuestion(question)) return 0;
  return DEPTH_FLOOR_WORDS[classifyQuestionDepth(question)];
}

const LONG_QUESTION_CUES = /\b(explain|derive|prove|compare|difference|mechanism|process|life cycle|teach me|make notes|complete notes|full chapter|in detail|detailed|step by step|what factors|features and properties|applications of)\b/i;

/** Concise conversational/direct questions remain short; explicit depth requests do not. */
export function isShortQuestion(question: string): boolean {
  const q = question.trim();
  return !!q && wordCount(q) <= 12 && !LONG_QUESTION_CUES.test(q) && classifyQuestionDepth(q) !== "deep";
}

/** Short conversational turns: greetings, thanks, small talk, and self-intros. */
const BRIEF_PATTERNS: RegExp[] = [
  /^(hi|hii+|hello|hey|namaste|namaskar|yo|hola)\b/,
  /^good (morning|afternoon|evening|night)\b/,
  /^(thanks|thank you|thx|ty|ok|okay|cool|nice|bye|goodbye)\b/,
  /^(how are you|how r u|what'?s up|whats up)\b/,
  /\bwho (are|r) (you|u)\b/,
  /\bwhat (are|r) (you|u)\b/,
  /\bwho (is|are) (this|veer)\b/,
  /\bwhat('?s| is) your name\b/,
  /\bintroduce yourself\b/,
  /\btell me about (yourself|you)\b/,
  /\bare you (an? )?(ai|bot|robot|human|chatgpt|gpt)\b/,
  /^what can you do\b/,
];

/** Identifies conversational requests needing no academic context or length expansion. */
export function isBriefQuestion(question: string): boolean {
  const q = question.trim().toLowerCase();
  return !!q && wordCount(q) <= 12 && BRIEF_PATTERNS.some((re) => re.test(q)) && !LONG_QUESTION_CUES.test(q);
}

/** Whitespace-token word count of a reply. */
export function wordCount(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** True when a reply meets the given floor. */
export function meetsReplyFloor(text: string, floor: number): boolean {
  return wordCount(text) >= floor;
}

/**
 * Build the syllabus anchor block for the chat system prompt. Best-effort:
 * any DB failure yields the origin-rule-only block, never an exception.
 */
export async function buildSyllabusAnchorBlock(
  question: string,
): Promise<string> {
  let hits: SyllabusHit[] = [];
  try {
    hits = await findSyllabusMatches(question);
  } catch {
    hits = [];
  }

  if (!hits.length) {
    return [
      "SYLLABUS ANCHOR: no direct syllabus entry matched this question.",
      "Apply the OFF-SYLLABUS ORIGIN RULE: trace the question to its origin inside the NEB syllabus",
      "(subject → unit → topic where the idea is first taught), teach that origin fully first,",
      "then build upward to the asked thing as its extension. Never answer from nowhere.",
    ].join(" ");
  }

  const lines = [
    "SYLLABUS ANCHOR (authoritative scope — the reply MUST be built on this):",
  ];
  for (const h of hits.slice(0, 3)) {
    lines.push(`- ${h.subject} / ${h.unit} / ${h.topics.slice(0, 3).join(", ")}`);
  }
  lines.push(
    "Answer within this scope. If the question also reaches beyond it, first complete the syllabus core, then extend.",
  );
  return lines.join("\n");
}

/**
 * DB-backed syllabus matching. Word-boundary aware (a substring matcher would
 * match "heat" inside "cheat"). Ranking: full topic-title match > chapter
 * match > token overlap (≥ half the topic's words shared with the question).
 */
export async function findSyllabusMatches(
  question: string,
): Promise<SyllabusHit[]> {
  const lower = question.toLowerCase().trim();
  if (!lower) return [];

  const [{ data: sData }, { data: cData }, { data: tData }] = await Promise.all([
    supabaseAdmin.from("subjects").select("id, name").eq("is_active", true),
    supabaseAdmin.from("chapters").select("id, subject_id, title").eq("is_active", true),
    supabaseAdmin.from("topics").select("id, chapter_id, title").eq("is_active", true),
  ]);

  const subjects = (sData ?? []) as unknown as AnchorSubject[];
  const chapters = (cData ?? []) as unknown as AnchorChapter[];
  const topics = (tData ?? []) as unknown as AnchorTopic[];
  if (!subjects.length) return [];

  const subjectById = new Map(subjects.map((s) => [s.id, s.name]));
  const chapterMap = new Map(
    chapters.map((c) => [c.id, { chapter: c, subject: subjectById.get(c.subject_id) }]),
  );

  const qTokens = new Set(
    lower
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 3),
  );

  const hits = new Map<string, { hit: SyllabusHit; best: number }>();

  for (const topic of topics) {
    const chapter = chapterMap.get(topic.chapter_id);
    if (!chapter?.subject) continue;

    const tLower = topic.title.toLowerCase().trim();
    const cLower = chapter.chapter.title.toLowerCase().trim();

    let score = 0;
    // Topic in question: word-boundary match only — a raw substring test
    // would match "heat" inside "cheating".
    if (tLower.length >= 4 && new RegExp(`\\b${escapeRegExp(tLower)}\\b`).test(lower)) {
      score = 80;
    }
    if (score === 0 && cLower.length >= 4 && lower.includes(cLower)) {
      score = 50;
    }
    if (score === 0) {
      const topicTokens = tLower
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((t) => t.length > 3);
      if (topicTokens.length > 0) {
        const overlap = topicTokens.filter((t) => qTokens.has(t)).length;
        if (overlap / topicTokens.length >= 0.5) score = 30 + overlap;
      }
    }
    if (score === 0) continue;

    const key = `${chapter.subject}||${chapter.chapter.title}`;
    const entry = hits.get(key) ?? {
      hit: { subject: chapter.subject, unit: chapter.chapter.title, topics: [] },
      best: 0,
    };
    if (!entry.hit.topics.includes(topic.title)) entry.hit.topics.push(topic.title);
    entry.best = Math.max(entry.best, score);
    hits.set(key, entry);
  }

  return Array.from(hits.values())
    .sort((a, b) => b.best - a.best)
    .slice(0, 6)
    .map((e) => e.hit);
}

// ── 2. Reply floor (server-side enforcement) ────────────────────────────────

/**
 * Retry instructions used when a substantive reply lands under its question's
 * applicable floor. They demand expansion with substance, never padding.
 */
export const EXPANSION_REQUEST = `Your previous reply is below the question's requested depth. Expand it before the student sees it.

Meet the applicable minimum length supplied with this request, if one is present. A concise factual answer or conversational reply does not need expansion.

Add only useful substance that answers the question: define core ideas, explain necessary mechanisms or reasoning, include relevant formulas and a worked example where useful, and address important limits or common errors.

Keep every fact already stated correct; invent NOTHING new; do not pad with repetition, filler, or restatement. Preserve clean markdown/LaTeX formatting. Return ONLY the complete revised reply, starting from the beginning of the answer — not a diff or commentary.`;

/** The final-chance variant: a last attempt at meaningful depth without padding. */
export const EXPANSION_REQUEST_STRICT = `${EXPANSION_REQUEST}

THIS IS THE FINAL CHANCE. Add the remaining relevant explanation and reasoning the question needs. Do not stop at a bare conclusion when the student asked for depth, but do not add filler or force an irrelevant minimum.`;

export interface FloorEnforcementResult {
  answer: string;
  floor: number;
  words: number;
  /** True when a retry produced the shipped reply. */
  expanded: boolean;
}

/**
 * Enforce the applicable reply floor server-side. A floor of zero passes
 * conversational/direct answers through untouched. Otherwise `retry` gets up to `maxRetries` chances
 * (default 2, override with AI_REPLY_FLOOR_RETRIES); the strict variant of
 * the expansion request is sent for the final attempt. The LONGEST acceptable
 * attempt wins: the floor never turns into a 500, and a closer-to-floor reply
 * always beats a shorter one — but a bounded loop, because a short answer
 * still beats no answer.
 */
export async function enforceReplyFloor(
  answer: string,
  floor: number,
  retry: (request: string) => Promise<string>,
  maxRetries?: number,
): Promise<FloorEnforcementResult> {
  const originalWords = wordCount(answer);
  if (originalWords >= floor) {
    return { answer, floor, words: originalWords, expanded: false };
  }

  const attempts = Math.max(
    1,
    maxRetries ?? (Number(process.env.AI_REPLY_FLOOR_RETRIES) || 2),
  );
  let best = answer;
  let bestWords = originalWords;

  for (let i = 0; i < attempts && bestWords < floor; i++) {
    const request = i === attempts - 1 ? EXPANSION_REQUEST_STRICT : EXPANSION_REQUEST;
    try {
      const expanded = await retry(request);
      if (expanded && expanded.trim()) {
        const expandedWords = wordCount(expanded);
        if (expandedWords > bestWords) {
          best = expanded;
          bestWords = expandedWords;
        }
      }
    } catch {
      // Retry is best-effort — stop expanding, ship the best so far.
      break;
    }
  }

  return { answer: best, floor, words: bestWords, expanded: best !== answer };
}
