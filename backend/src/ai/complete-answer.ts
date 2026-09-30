/**
 * COMPLETE ANSWER — chat + truncation repair, shared by /api/ai and /api/ai/guest.
 *
 * Owner requirement (2026-09-30): a reply must never stop mid-sentence, and a
 * deep answer must never be downgraded to a terse one just for being slow.
 * Two distinct guards live here:
 *
 *   · TRUNCATION REPAIR — if the answer was cut (provider finish_reason=length,
 *     an unclosed code fence or $$ block, or a reply that simply ends
 *     mid-sentence), the SAME conversation is continued and the halves are
 *     stitched. Bounded, best-effort: if a continuation fails, the partial
 *     answer still ships rather than the student getting nothing.
 *
 *   · DEPTH REPAIR — if the answer is still too short for the question's depth,
 *     the existing expansion retry runs, and its result is re-checked for
 *     truncation so an expanded answer is never itself shipped half-finished.
 *
 * The two are ordered deliberately: repair the cut first (it is the more severe
 * defect), then the length floor (which is a minimum, not a target).
 */

import { detectTruncation, describeVerdict, continuationRequest, joinContinued, MAX_CONTINUATIONS } from "./truncation";
import { enforceReplyFloor, floorWordsForQuestion, type QuestionDepth } from "./syllabus-anchor";
import type { AIChatMessage } from "./service";

export interface CompleteAnswerOptions {
  /** Runs one chat turn and resolves with the reply text. */
  chat: (messages: AIChatMessage[]) => Promise<string>;
  /** The provider's finish_reason for the most recent turn, when available. */
  finishReason?: () => string;
  /** The full message list already carrying the professor context. */
  messages: AIChatMessage[];
  /** The student's question — drives the depth floor. */
  question: string;
  /** Convo tail used for the expansion/continuation follow-ups. */
  tail?: AIChatMessage[];
  /** Expansion retry budget for the length floor. */
  maxFloorRetries?: number;
}

export interface CompleteAnswerResult {
  text: string;
  /** True when at least one continuation was stitched on. */
  continued: boolean;
  /** How many continuations were appended. */
  continuations: number;
  /** True when the length-floor expansion changed the reply. */
  expanded: boolean;
  floor: number;
  words: number;
  /** Diagnostics for the log — never shipped to the student. */
  notes: string[];
}

/**
 * Produce a reply the student can actually read: whole sentences, then at least
 * the depth floor, in that order.
 */
export async function completeAnswer(opts: CompleteAnswerOptions): Promise<CompleteAnswerResult> {
  const notes: string[] = [];
  const tail = opts.tail ?? opts.messages.slice(-6);

  // ── 1. First turn ────────────────────────────────────────────────────────
  let text = await opts.chat(opts.messages);
  let continuations = 0;

  // ── 2. Truncation repair (before the length floor: a cut answer is worse) ─
  for (let i = 0; i < MAX_CONTINUATIONS; i++) {
    const verdict = detectTruncation(text, opts.finishReason?.());
    if (!verdict.truncated) break;
    notes.push(describeVerdict(verdict));
    try {
      const next = await opts.chat([
        ...tail,
        { role: "assistant", content: text },
        { role: "user", content: continuationRequest(verdict.detail) },
      ]);
      if (next && next.trim()) {
        text = joinContinued(text, next);
        continuations++;
        continue;
      }
    } catch (err) {
      // A failed continuation must not cost the student their answer: ship the
      // partial text we already have rather than failing the request.
      notes.push(`continuation failed: ${err instanceof Error ? err.message : String(err)}`);
      break;
    }
  }

  // ── 3. Length floor (a minimum, not a target) ───────────────────────────
  const floor = floorWordsForQuestion(opts.question);
  const floored = await enforceReplyFloor(
    text,
    floor,
    async (request) =>
      opts.chat([
        ...tail,
        { role: "assistant", content: text },
        { role: "user", content: request },
      ]),
    opts.maxFloorRetries,
  );
  let out = floored.answer;

  // An expanded answer can itself arrive cut — check once more, cheaply.
  if (continuations === 0) {
    const verdict = detectTruncation(out, "");
    if (verdict.truncated) {
      notes.push(`post-expansion ${describeVerdict(verdict)}`);
    }
  }

  return {
    text: out,
    continued: continuations > 0,
    continuations,
    expanded: floored.expanded,
    floor: floored.floor,
    words: floored.words,
    notes,
  };
}

export type { QuestionDepth };
