/**
 * TRUNCATION GUARD — a reply must never stop mid-sentence.
 *
 * Owner report (2026-09-30): "why it just stops". Two independent causes, both
 * fixed elsewhere, and this module is the safety net that makes the guarantee
 * enforceable in code rather than hoped for in a prompt:
 *
 *   1. the provider hit its output ceiling (`finish_reason: "length"`) and
 *      returned a half-sentence, and
 *   2. the model chose to wrap up early on a question that needed more.
 *
 * Neither was ever detected: `enforceReplyFloor` only checks whether a reply is
 * TOO SHORT, so a long reply cut off mid-clause sailed through the gate and
 * shipped to the student as if it were complete.
 *
 * So we detect the cut and CONTINUE the same answer, stitching the halves
 * together, a bounded number of times. The detection is deliberately
 * CONSERVATIVE: a false positive costs one extra short call, while a false
 * negative ships a broken answer — so only high-confidence signals count.
 */

/** Bounded continuation attempts. Each one streams the next section until complete. */
export const MAX_CONTINUATIONS = 4;

export interface TruncationVerdict {
  truncated: boolean;
  /** Machine-readable cause, for logging. */
  reason: "finish-reason" | "unclosed-fence" | "unclosed-math" | "no-terminator" | "dangling-join";
  /** Human-readable detail for the continuation instruction. */
  detail: string;
}

/** Terminal punctuation that a finished sentence may legitimately end on. */
const TERMINATORS = /[.!?)\]}>"'\u2019\u201d*:;]$/;

/**
 * A reply that ends on one of these was interrupted before the thought
 * finished — a completed sentence never stops here.
 */
const DANGLING_JOINERS = [
  "and", "or", "but", "the", "a", "an", "of", "in", "on", "to", "for", "with",
  "is", "are", "was", "were", "be", "been", "which", "that", "because", "so",
  "such", "where", "when", "while", "than", "as", "by", "from", "into", "also",
  "then", "however", "therefore", "thus", "hence", "between", "about", "without",
  "using", "given", "if", "its", "their", "this", "these", "each", "any",
];

/** Strip trailing markdown/emphasis noise so the last REAL character is judged. */
function lastMeaningfulChar(text: string): string {
  return text
    .replace(/[*_`~\s]+$/g, "")
    .replace(/[:\-–—]+$/g, "")
    .trimEnd()
    .slice(-1);
}

/** The final word of the reply, lowercased and stripped of punctuation. */
function lastWord(text: string): string {
  const tail = text.replace(/[*_`~\s]+$/g, "").trimEnd();
  const m = tail.match(/([A-Za-z]+)[^A-Za-z]*$/);
  return m ? m[1].toLowerCase() : "";
}

/**
 * Decide whether a reply was cut off.
 *
 * @param text         the reply as produced
 * @param finishReason the provider's `finish_reason`, when the transport can
 *                     report it — "length" is conclusive and needs no guessing
 */
export function detectTruncation(text: string, finishReason?: string): TruncationVerdict {
  const clean = (text ?? "").replace(/\s+$/, "");
  if (!clean) {
    return { truncated: false, reason: "no-terminator", detail: "" };
  }

  // 1. Conclusive: the provider itself said it ran out of output room.
  if (finishReason === "length" || finishReason === "max_tokens" || finishReason === "MAX_TOKENS") {
    return {
      truncated: true,
      reason: "finish-reason",
      detail: "the provider reported it hit its output ceiling (finish_reason=length)",
    };
  }

  // 2. An unclosed code fence means the answer was cut inside a code block.
  const fences = (clean.match(/```/g) ?? []).length;
  if (fences % 2 !== 0) {
    return { truncated: true, reason: "unclosed-fence", detail: "a fenced code block was left open" };
  }

  // 3. An unclosed display-math delimiter means it stopped mid-equation.
  const dollars = (clean.match(/\$\$/g) ?? []).length;
  if (dollars % 2 !== 0) {
    return { truncated: true, reason: "unclosed-math", detail: "a $$ display-math block was left open" };
  }

  // 4. No sentence terminator at the very end. Skipped for replies that
  //    legitimately end on a bare list item or a table row.
  const lastLine = clean.slice(clean.lastIndexOf("\n") + 1);
  const endsWithListOrTable = /(?:^|\s)([-*+]\s|\d+[.)]\s|\|)/.test(lastLine);

  // A reply may also legitimately END on a standalone emphasis or heading line —
  // "**In short:** it is a race between charge and leakage" has no sentence
  // terminator and is nonetheless complete. Judging those as cut would trigger a
  // pointless continuation call and splice a duplicate onto a finished answer.
  const startsWithEmphasis = /^\s*(\*\*[^*]|#{1,6}\s|>\s|>\[)/.test(lastLine);

  if (!endsWithListOrTable && !startsWithEmphasis && !TERMINATORS.test(lastMeaningfulChar(clean))) {
    // 5. It also stops on a joining word — an even stronger signal.
    const word = lastWord(clean);
    if (DANGLING_JOINERS.includes(word)) {
      return {
        truncated: true,
        reason: "dangling-join",
        detail: `the reply stops on the unfinished word "${word}"`,
      };
    }
    return {
      truncated: true,
      reason: "no-terminator",
      detail: "the reply ends mid-sentence with no closing punctuation",
    };
  }

  return { truncated: false, reason: "no-terminator", detail: "" };
}

/**
 * The instruction sent back to the model when its answer was cut off. It asks
 * for a continuation ONLY — never a rewrite, never a summary, never a restart —
 * so the two halves join without repetition.
 */
export function continuationRequest(detail: string): string {
  return `Your previous answer was CUT OFF before it finished (${detail}). Continue it from exactly where it stopped.

Rules for this continuation:
- Begin with the very next words, mid-thought. Do NOT repeat, rephrase or summarise anything you already wrote.
- Do NOT add a greeting, a title, or a "continued" heading.
- Do NOT stop early again: finish every remaining part, then close every open code fence, table and $$ block properly.
- If the answer was already complete, say only the missing closing lines.

Return ONLY the continuation text.`;
}

/**
 * Join a continuation onto the partial answer, healing the seam so the joined
 * reply does not end up with a doubled space or a broken sentence boundary.
 */
export function joinContinued(previous: string, next: string): string {
  const head = previous.replace(/\s+$/, "");
  const tail = (next ?? "").replace(/^\s+/, "");
  if (!tail) return head;
  // A seam needs a space whenever the head could legally end a word or a
  // sentence and the tail could legally start one — otherwise the halves fuse
  // into "charge.It" / "dependson".
  const headEndsWordish = /[A-Za-z0-9,;:!?)\]}"'`.—–-]$/.test(head);
  const tailStartsWordish = /^[A-Za-z0-9]/.test(tail);
  return headEndsWordish && tailStartsWordish ? `${head} ${tail}` : `${head}${tail}`;
}

/** Compact log line for the truncation guard. */
export function describeVerdict(v: TruncationVerdict): string {
  return v.truncated ? `truncated(${v.reason}: ${v.detail})` : "complete";
}

