/**
 * SYLLABUS ANCHOR + REPLY FLOOR — the anti-random-answer engine.
 *
 * Owner requirement (2026-09-29): chat replies must never be random. Every
 * reply must (a) be anchored in the NEB syllabus — find where the asked thing
 * lives in the syllabus, or, when it lives outside it, find WHERE IT
 * ORIGINATES inside the syllabus and build from that origin up to the asked
 * thing; and (b) never be shorter than 150 words, scaling up with the depth
 * of the question — no matter how long a complete answer takes to produce.
 *
 * Two halves:
 *   1. SYLLABUS ANCHOR — buildSyllabusAnchorBlock(): DB-backed match of the
 *      question against subjects/chapters/topics, producing a directive block
 *      injected into the system prompt of every chat request.
 *   2. REPLY FLOOR — REPLY_FLOOR_WORDS + wordCount() + enforceReplyFloor():
 *      a hard server-side floor on reply length with one expansion retry, so
 *      a too-short reply is never shipped even if the model ignores the
 *      prompt. The floor is a MINIMUM, never a target: derivations, proofs
 *      and full-topic answers run as long as the work requires.
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

/** Depth signal of a question — used only to SCALE the floor upward. */
export type QuestionDepth = "shallow" | "medium" | "deep";

/** The hard floor: no chat reply may ship below this word count. */
export const REPLY_FLOOR_WORDS = 150;

/** Per-depth floors: the 150-word minimum scales with question depth. */
export const DEPTH_FLOOR_WORDS: Record<QuestionDepth, number> = {
  shallow: REPLY_FLOOR_WORDS,
  medium: 220,
  deep: 300,
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Classify the depth signal of a question. "deep" = derivation/proof/complete
 * knowledge requests; "medium" = explanation/comparison/process questions;
 * "shallow" = everything else (definitions, facts, casual chat).
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
    )
  ) {
    return "deep";
  }
  if (
    has(
      "why",
      "how does",
      "explain",
      "difference between",
      "compare",
      "mechanism",
      "process",
      "life cycle",
      "application",
      "importance",
      "significance",
    )
  ) {
    return "medium";
  }
  return "shallow";
}

/** Floor for a question: 150 minimum, scaled up by the depth signal. */
export function floorWordsForQuestion(question: string): number {
  return DEPTH_FLOOR_WORDS[classifyQuestionDepth(question)];
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
 * The retry instruction sent back to the model when a reply lands under the
 * floor. It demands expansion with substance — never padding — and repeats
 * the two hard constraints (syllabus core, no new facts invented).
 */
export const EXPANSION_REQUEST = `Your previous reply is BELOW the platform's minimum length and must be expanded before the student sees it.

Expand it to AT LEAST the required minimum words by adding real teaching substance, in this order of preference:
1. the syllabus core the topic belongs to (definition → mechanism → formula in $LaTeX$ → worked example);
2. the origin of the idea (who formulated/discovered it, from which earlier idea it grew);
3. where the topic sits in its unit and which common misconception it clears;
4. one concrete exam-relevant application.

Hard constraints: keep every fact already stated correct; invent NOTHING new; do not pad with repetition, filler or restatement of the same sentence; keep markdown/LaTeX formatting. Return ONLY the complete expanded reply, starting from the beginning of the answer — not a diff, not a commentary.`;

/** The final-chance variant: sterner, sent when the first retry was still short. */
export const EXPANSION_REQUEST_STRICT = `${EXPANSION_REQUEST}

THIS IS THE FINAL CHANCE. The previous attempt was STILL below the minimum. Count your words as you write and do not stop before the minimum is reached: add the full mechanism step by step, the complete derivation or a second worked example — real content, never filler.`;

export interface FloorEnforcementResult {
  answer: string;
  floor: number;
  words: number;
  /** True when a retry produced the shipped reply. */
  expanded: boolean;
}

/**
 * Enforce the reply floor server-side. If `answer` meets the floor it is
 * returned untouched. Otherwise `retry` gets up to `maxRetries` chances
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
