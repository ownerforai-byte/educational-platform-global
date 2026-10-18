/**
 * Shared chat quick-action contract (widget + tutor console).
 * Both surfaces share the action wording and concise-answer detection.
 */

/** Ask for more depth on the previous answer. */
export const GO_DEEPER_INSTRUCTION =
  "Go deeper on your last answer: add the underlying intuition, the full step-by-step working, the derivation where it applies, a worked example, and the exam angle — keep everything you already said correct.";

/** Ask for a tighter version of the previous answer. */
export const KEEP_IT_SHORT_INSTRUCTION =
  "Keep it concise: answer the same question correctly in the shortest form that preserves the essential definition, formula, or reasoning. Do not add padding or repeat points.";

/** Ask for revision notes across the whole thread. */
export const SUMMARIZE_INSTRUCTION =
  "Summarize our conversation so far as concise revision notes: short headings, tight bullets, key formulas and terms in bold — ready to screenshot before an exam.";

/** Text used when a student sends a photo with no typed question. */
export const PHOTO_ONLY_PROMPT =
  "Read this photo carefully, tell me in one line what the question or diagram is, then teach it fully step by step.";


/** Greetings, acknowledgments, and self-introductions do not need a copy affordance. */
export function isBriefChatMessage(content: string): boolean {
  const text = content.trim().replace(/^[*_`#\s]+|[*_`#\s]+$/g, "");
  if (!text) return true;
  return /^(?:hi|hello|hey|good morning|good afternoon|good evening)[!. ,]*(?:how can i help\??)?$/i.test(text)
    || /^(?:thanks|thank you|you're welcome|you are welcome|no problem|sure|okay|ok|happy to help|glad to help)[!. ]*$/i.test(text)
    || /^(?:i'?m|i am) veer\b.{0,90}$/i.test(text)
    || /^(?:i'?m|i am) your (?:study )?(?:mentor|tutor)\b.{0,70}$/i.test(text);
}

/** Where the practice-quiz handoff stores its seed. */
export const QUIZ_SEED_KEY = "neb_quiz_seed";

export interface QuizSeed {
  subjectSlug?: string;
  topic?: string;
}

/**
 * Persist the practice-quiz seed (current subject + last question) so
 * /ai-quiz opens already focused on this conversation's topic. Storage
 * failures (private mode) are swallowed — the quiz still opens.
 */
export function writeQuizSeed(seed: QuizSeed): void {
  try {
    sessionStorage.setItem(QUIZ_SEED_KEY, JSON.stringify(seed));
  } catch {
    /* storage blocked — the quiz opens with its defaults */
  }
}
