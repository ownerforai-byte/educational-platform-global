/**
 * Reply suggestions — the per-reply counterpart to the composer's fixed idea
 * chips (owner 2026-11-09: "not fixed ideas but depending on place").
 *
 * Every Veer reply ends with a box of next moves, and the moves depend on the
 * reply itself and where it was given: a formula answer offers to walk the
 * symbols, a topic answer offers its notes, a subject answer offers its
 * question bank. Pure derivation from (reply text, context) — no I/O.
 */

export interface ReplySuggestion {
  kind: "prompt" | "link";
  /** Short action label for the box. */
  label: string;
  /** One-line explanation under the label. */
  hint: string;
  /** Follow-up message for `prompt` suggestions. */
  prompt?: string;
  /** Destination for `link` suggestions. */
  href?: string;
}

export type ReplySurface = "chat" | "tutor" | "widget" | "ask";

export interface ReplyContext {
  surface: ReplySurface;
  subjectName?: string;
  subjectSlug?: string;
  topicTitle?: string;
  topicHref?: string;
  /** Hard cap on returned suggestions (small surfaces use fewer). */
  max?: number;
}

export interface ReplyAnalysis {
  hasFormulas: boolean;
  hasSteps: boolean;
  mentionsExam: boolean;
  isLong: boolean;
  /** Terms the reply bolded or headed — the study-card vocabulary. */
  keyTerms: string[];
}

/** Structural read of the reply text — drives both boxes and suggestions. */
export function analyzeReply(reply: string): ReplyAnalysis {
  const text = reply ?? "";
  const keyTerms: string[] = [];
  const seen = new Set<string>();
  for (const match of text.matchAll(/\*\*([^*\n]{3,40})\*\*/g)) {
    const term = match[1].trim();
    const key = term.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    keyTerms.push(term);
    if (keyTerms.length >= 6) break;
  }
  return {
    hasFormulas: /\$[^$]+\$|\\frac|\\cdot|equation|formula|[a-z]\s*=\s*/i.test(text),
    hasSteps: /(^|\n)\s*(step\s*\d|first|then|next|finally)[\s:.,-]/i.test(text) || /\n\s*\d+[.)]\s/.test(text),
    mentionsExam: /\bexam\b|NEB|board exam|entrance|marks?\b/i.test(text),
    isLong: text.length > 1200,
    keyTerms,
  };
}

/**
 * The next moves for one reply. Deterministic: same reply + same place → same
 * boxes. Prompt items feed the composer; link items open the matching surface.
 */
export function buildReplySuggestions(reply: string, ctx: ReplyContext): ReplySuggestion[] {
  const analysis = analyzeReply(reply);
  const subject = ctx.subjectName ?? "this subject";
  const topic = ctx.topicTitle ?? "this topic";
  const out: ReplySuggestion[] = [];

  // ── Prompt moves (follow-ups shaped by what the reply actually contains) ──
  // Ordered by how much every student gains: the quiz move always survives
  // the small-surface budget, the analysis-specific ones follow.
  out.push({
    kind: "prompt",
    label: "Quiz me on this",
    hint: "One exam-style question, wait for me",
    prompt: `Quiz me with one exam-style question on ${topic} and wait for my answer before revealing the solution.`,
  });
  if (analysis.hasFormulas) {
    out.push({
      kind: "prompt",
      label: "Walk the formula",
      hint: "What each symbol means and why",
      prompt: "Walk me through each part of the formula above — what every symbol means and where it comes from.",
    });
  }
  if (analysis.hasSteps || analysis.isLong) {
    out.push({
      kind: "prompt",
      label: "Another worked example",
      hint: "Same method, different numbers",
      prompt: "Give me one more worked example like the one above, with different numbers, and solve it slowly.",
    });
  }
  if (analysis.keyTerms.length > 0) {
    out.push({
      kind: "prompt",
      label: "Explain the key terms",
      hint: "Plain language, one line each",
      prompt: `Explain these in plain language, one line each: ${analysis.keyTerms.slice(0, 4).join(", ")}.`,
    });
  }
  if (analysis.mentionsExam || ctx.surface === "tutor") {
    out.push({
      kind: "prompt",
      label: "Exam tip",
      hint: "What examiners actually look for",
      prompt: `Give me the exam tip for ${topic} — what NEB examiners look for and where students lose marks.`,
    });
  }

  // ── Link moves (the matching study surface for this place) ──
  const links: ReplySuggestion[] = [];
  if (ctx.topicHref) {
    links.push({
      kind: "link",
      label: "Open the notes",
      hint: ctx.topicTitle ?? "Topic notes, formulas, checks",
      href: ctx.topicHref,
    });
  }
  if (ctx.subjectSlug) {
    links.push({
      kind: "link",
      label: `Practice ${subject}`,
      hint: "Question bank for this subject",
      href: `/practice/${ctx.subjectSlug}`,
    });
  }
  links.push({
    kind: "link",
    label: "Revise as flashcards",
    hint: "Spaced repetition keeps it",
    href: "/srs",
  });

  // Small surfaces get fewer boxes: widget = one prompt + one link, etc.
  const budget = ctx.max ?? (ctx.surface === "widget" ? 2 : ctx.surface === "ask" ? 4 : 5);
  const outLinks = Math.min(links.length, ctx.surface === "widget" ? 1 : 3);
  return [...out.slice(0, Math.max(1, budget - outLinks)), ...links.slice(0, outLinks)].slice(0, budget);
}

/** The self-check prompts under the reply — small, educational, local. */
export function buildSelfCheck(reply: string, ctx: ReplyContext): string[] {
  const { keyTerms } = analyzeReply(reply);
  const checks: string[] = [];
  if (keyTerms[0]) {
    checks.push(`Define ${keyTerms[0]} without looking back at the reply.`);
  }
  checks.push(
    ctx.topicTitle
      ? `Write the one formula or rule for ${ctx.topicTitle} from memory.`
      : "Write the one rule this answer relies on, from memory.",
  );
  checks.push("Solve the same idea with numbers of your own and check the units.");
  return checks.slice(0, 3);
}
