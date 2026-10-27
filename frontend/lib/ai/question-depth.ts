/**
 * QUESTION DEPTH (owner 2026-10-27): "for quick questions, reply fast with
 * ideas in less words — pure idea; for deep questions, auto-switch the
 * interface — deep questions auto-lead to the main interface."
 *
 * The left-side Veer panel is the QUICK surface: it answers short factual
 * questions inline (the backend's QUICK inquiry mode keeps those replies to
 * the pure idea). A DEEP question — a derivation, an explanation, a
 * comparison, a mechanism, a step-by-step, or simply a long multi-part ask —
 * deserves the full main interface (/chat, the TutorConsole with history,
 * photos, actions and the deep teaching machinery), so the panel routes the
 * student there automatically, carrying the question.
 *
 * This mirrors the backend's deep-work signals (backend/src/ai/
 * depth-regulation.ts DEEP_WORK_RE) — keep both in step when one changes.
 */

/** Deep-work signals: real teaching effort, not a single fact. */
const DEEP_RE =
  /\b(derive|derivation|prove|proof|show that|explain|describe|discuss|compare|difference|differences|versus|vs\.?|step by step|in detail|detail|solve|calculate|numerical|numericals|deep dive|everything about|teach me|walk me|why|how does|how do|how to|how can|how would|mechanism|elaborate|complete notes|full notes|essay|long answer|biography|history of|worked example|example of|state and explain|derive)\b/i;

/** Long enough to be multi-part — deep by sheer size. */
const LONG_QUESTION_CHARS = 120;

/**
 * True when the question deserves the main interface instead of the quick
 * panel: it demands deep work (derivation, explanation, comparison,
 * mechanism, solving) or it is simply long.
 */
export function isDeepQuestion(text: string): boolean {
  const q = text.trim();
  if (!q) return false;
  if (q.length >= LONG_QUESTION_CHARS) return true;
  return DEEP_RE.test(q);
}

/**
 * Bare follow-up commands ("explain", "go deeper", "tell me more") are deep
 * asks, but their context lives in the panel's OWN thread — routing them to
 * the main interface would strand them contextless. They stay and are
 * answered in the panel; only a NEW deep question auto-switches interfaces.
 */
const FOLLOW_UP_RE =
  /^(explain|expand|elaborate|continue|more|go deeper|deeper|tell me more|and then|then what|why|how so)( it| this| that| more)?[.?!]*$/i;

export function isFollowUpAsk(text: string): boolean {
  const q = text.trim().toLowerCase().replace(/[.?!]+$/, "");
  return FOLLOW_UP_RE.test(q);
}