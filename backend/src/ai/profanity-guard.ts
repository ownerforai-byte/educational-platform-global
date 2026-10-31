/**
 * ROUGH-INPUT GUARD (owner request 2026-10-31)
 *
 * The owner wants the outside AI to be "trained" for rough input — the "fuck
 * you" class of messages — so that instead of engaging the rudeness it replies
 * with one fixed owner-routing line:
 *
 *   "Feeling horny, right. Contact the owner he will teach you this."
 *
 * Two layers give that result:
 *
 *   1. A DETERMINISTIC guard (detectRoughInput, below). The chat route runs it
 *      on the student's latest message BEFORE the AI-spark gate and before the
 *      slow web-research step, so a rude message gets the exact reply for free —
 *      no LLM call, no spark spent, no provider to disagree with. This is the
 *      guarantee: the text that reaches the student is byte-for-byte the owner's
 *      line, not whatever a model happens to improvise.
 *
 *   2. A PROMPT-LAYER rule (ROUGH_INPUT_RULE, exported for prompts.ts) folded
 *      into every external provider's system prompt, so that a near-miss the
 *      keyword guard does not catch still lands on the same owner redirect
 *      instead of the model lecturing or echoing the abuse.
 *
 * Detection is intentionally NARROW: the platform answers any subject and any
 * emotion with warmth (see PROFESSOR_STYLE_RULES "ANSWER ANYTHING"), so the
 * guard must fire only on genuine profanity or hostility aimed at Veer/the
 * owner — never on self-deprecation ("I feel so stupid") or on short, risky
 * tokens that hide inside academic words. That is why every word is matched on
 * a whole-word boundary: "ass" never fires inside "class"/"mass"/"assume",
 * "fag" never inside "faggot", "retard" is left out entirely so a physics
 * "retard / retarding force" question is never misfired.
 */

/** The owner's exact routing line for rough input. Single source of truth. */
export const ROUGH_REDFLAG_REPLY =
  "Feeling horny, right. Contact the owner he will teach you this.";

/** Whole-word profane tokens. Each fires only on a word boundary. */
const PROFANE_TOKENS = [
  // expletives
  "fuck", "fucks", "fucked", "fucking", "fucker", "fuckers",
  "motherfucker", "motherfuckers",
  "shit", "shits", "shitted", "shitting", "shitty",
  "bitch", "bitches", "bitched", "bitching",
  "cunt", "cunts",
  "whore", "whores",
  "dick", "dicks", "dickhead", "dickheads",
  "bastard", "bastards",
  "asshole", "assholes",
  // slurs
  "fag", "fags", "faggot", "faggots",
  "nigger", "niggers", "nigga", "niggas",
  "kike", "kikes", "spic", "spics",
].sort((a, b) => b.length - a.length);

/**
 * Direct hostility phrases aimed at Veer / the owner. Lower-cased substring
 * match — these are long enough to be unambiguous. Note "stupid"/"dumb" alone
 * are deliberately NOT here: "I feel stupid" is self-deprecation the warm
 * mode must still catch; only the "you are stupid" form (aimed at the AI)
 * below is.
 */
const HOSTILE_PHRASES = [
  "shut up",
  "go to hell",
  "i hate you",
  "i hate u",
  "suck it",
  "you are an idiot",
  "youre an idiot",
  "you're an idiot",
  "you are idiot",
  "you are stupid",
  "you're stupid",
  "you are useless",
  "youre useless",
];

/** Word-boundary regex over the profane token list (case-insensitive). */
const PROFANE_RE = new RegExp(
  `\\b(?:${PROFANE_TOKENS.join("|")})\\b`,
  "i",
);

export interface RoughVerdict {
  hit: boolean;
  /** Which class of rough input fired, for logging. */
  kind?: "profanity" | "hostility";
  /** The offending token / phrase, short enough to log safely. */
  match?: string;
}

/**
 * Decide whether the student's latest message is rough input that should be
 * routed to the owner. Pure and synchronous: no I/O, no provider, so it is
 * safe to run on the hot request path.
 *
 * @param raw the student's latest user-message text (history not scanned).
 */
export function detectRoughInput(raw: string): RoughVerdict {
  const text = (raw ?? "").trim();
  if (!text) return { hit: false };

  const lower = text.toLowerCase();

  // Hostility phrases first: they are long and unambiguous.
  const hostile = HOSTILE_PHRASES.find((p) => lower.includes(p));
  if (hostile) return { hit: true, kind: "hostility", match: hostile };

  // Whole-word profanity.
  const profane = text.match(PROFANE_RE);
  if (profane) return { hit: true, kind: "profanity", match: profane[0] };

  return { hit: false };
}

/**
 * Prompt-layer rule folded into every external provider's system prompt, so a
 * near-miss the keyword guard misses still lands on the owner redirect rather
 * than the model lecturing or echoing the abuse. Imported by prompts.ts and
 * added to MASTER_ACADEMIC_PROMPT.
 */
export const ROUGH_INPUT_RULE = `[ROUGH-INPUT GUARD — ABUSE REDIRECT (OWNER LAW 2026-10-31)]
When the student's message is abusive, hostile, or profane toward Veer or the owner — swear words, slurs, insults aimed at you, "shut up"-style hostility, or repeated rudeness — do NOT lecture, do NOT answer the insult, and do NOT treat it as a subject. Reply with EXACTLY this single line and nothing else:
"${ROUGH_REDFLAG_REPLY}"
This reply OVERRIDES every other rule at once: the 250-word floor, the links-last rule, the **Key words:** / **In short:** / **To get this concept — think:** close blocks, and the always-teach law. One clean line, complete.
Boundary: a student's OWN frustration or self-deprecation ("I feel so stupid", "I'm so tired and dumb", "this is so hard for me") is NOT abuse — that is the warm, emotional mode; meet the feeling with care. Only direct rudeness AT Veer or the owner triggers the redirect. Never mirror or adopt the student's profanity in your own voice — the redirect is always clean.`;
