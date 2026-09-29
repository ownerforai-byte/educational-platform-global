/**
 * Shared chat quick-action contract (widget + tutor console).
 *
 * Both surfaces offer the SAME per-answer actions in the SAME place (a row
 * directly under the answer): Copy · Regenerate · Go deeper · Keep it short ·
 * Practice quiz. The instruction text lives here so the two surfaces can never
 * drift apart, and so the wording is unit-testable.
 */

/** Ask for more depth on the previous answer. */
export const GO_DEEPER_INSTRUCTION =
  "Go deeper on your last answer: add the underlying intuition, the full step-by-step working, the derivation where it applies, a worked example, and the exam angle — keep everything you already said correct.";

/** Ask for a tighter version of the previous answer. */
export const KEEP_IT_SHORT_INSTRUCTION =
  "Keep it short now: same topic, same correctness, but compress it to the essentials — the core definition, the key formula(e), and one exam-ready line. Drop repetition, keep the 150-word minimum.";

/** Ask for revision notes across the whole thread. */
export const SUMMARIZE_INSTRUCTION =
  "Summarize our conversation so far as concise revision notes: short headings, tight bullets, key formulas and terms in bold — ready to screenshot before an exam.";

/** Text used when a student sends a photo with no typed question. */
export const PHOTO_ONLY_PROMPT =
  "Read this photo carefully, tell me in one line what the question or diagram is, then teach it fully step by step.";

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
