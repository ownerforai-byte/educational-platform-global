/**
 * Context-aware depth control for Veer (Agnes + internal chain).
 * Classifies each turn as generic, academic/technical, or advisory (advice-
 * giving) and switches reply shape — concise summaries, multidimensional
 * pedagogical deep-dives, and option-trade-off recommendations.
 */

export type InquiryMode = "generic" | "academic" | "advisory";

const IDENTITY_RE =
  /\b(who (are|made|built|created|trained) you|what are you|where (do|did) you come from|who is ravikisan|who owns this platform)\b/i;

const GENERIC_RE =
  /^(hi+|hello+|hey+|thanks?|thank you|ok(?:ay)?|bye|good\s*(morning|evening|night)|how are you)\b/i;

const STRONG_ACADEMIC_RE =
  /\b(derive|prove|proof|show that|calculate|solve|formula|equation|theorem|derivation|numerical)\b/i;

const WEAK_ACADEMIC_NOUNS_RE =
  /\b(syllabus|neb|cee|ioe|ioe\s*entrance|past\s*paper|pyq|mcq|marks?)\b/i;

const SUBJECT_RE =
  /\b(physics|chemistry|biology|mathematics|maths|calculus|organic|inorganic|genetics|ecology|thermodynamics|electrostatics|optics|mechanics|trigonometry|coordinate|vector|cell|atom|molecule|enzyme|evolution|grammar|literature|nepali|english)\b/i;

const DEPTH_QUESTION_RE =
  /\b(what is|what are|why does|why do|how does|how do|explain|define|describe|compare|difference between|vs\.?|teach me|everything about|complete notes|deep dive|in detail)\b/i;

const ADVISORY_RE =
  /\b(should i|should we|should you|should (i|we|you) (focus|pick|choose|start|continue|skip|take)|which (is|are) (best|better|good|right|easy|simple)|which should i|which one should|which option|which to (pick|choose|prefer)|recommend|advice|suggestion|what do you (think|suggest|advise)|your (opinion|honest (thought|advice|take))|is it worth|is it (a) (good|bad|worth) idea|how should i|what would you (do|suggest|pick|do)|first (step|thing) to|where should i start|better (option|choice|path|topic|subject)|prioriti[sz]e|prioriti[sz]ation|career (choice|decision|path|advice)|study (plan|order)|exam (plan|strategy))\b/i;

/** Heuristic mode for server-side directives (floor, retrieval weight). */
export function classifyInquiryMode(message: string): InquiryMode {
  const q = message.trim();
  if (!q || q.length < 3) return "generic";
  if (IDENTITY_RE.test(q)) return "generic";
  if (GENERIC_RE.test(q) && q.length < 80 && !STRONG_ACADEMIC_RE.test(q) && !SUBJECT_RE.test(q)) {
    return "generic";
  }
  // Strong academic verbs OR genuine study questions ("what is / explain /
  // derive / compare …") make the turn academic first, even when it also
  // sounds advisory ("which model is better for the derivation?").
  if (STRONG_ACADEMIC_RE.test(q) || DEPTH_QUESTION_RE.test(q)) {
    return "academic";
  }
  // Advice-seeking turns (choices, plans, "should I / which is better") get
  // the ADVISORY shape — options, trade-offs, recommendation. Checked BEFORE
  // the weaker academic nouns / subject mentions, so "which should I study
  // first, physics or chemistry?" is advice, while a strong-verb or study
  // question already returned above.
  if (ADVISORY_RE.test(q)) return "advisory";
  // Plain subject or exam-noun mentions ("Explain thermodynamics for NEB
  // class 11" without a study verb still lands here via SUBJECT_RE) → academic.
  if (SUBJECT_RE.test(q) || WEAK_ACADEMIC_NOUNS_RE.test(q)) {
    return "academic";
  }
  // No loose "any question" catch-all: casual questions ("do I have time for
  // lunch?") that match no depth/subject/academic signal stay generic. The
  // DEPTH_QUESTION_RE test above already handled genuine study questions.
  return "generic";
}

export function depthDirectiveForMode(mode: InquiryMode): string {
  if (mode === "generic") {
    return `[INQUIRY MODE — GENERIC (ACTIVE)
This turn is classified GENERIC, not a syllabus deep-dive. OVERRIDE the 250-word floor and the long concept-walk for THIS reply only.
- Answer in 2–6 short paragraphs or tight bullets (roughly 60–180 words unless the student explicitly asked for more).
- Lead with the direct answer; one clarifying example at most.
- Skip chronological surveys, etymology essays, and "Explore further" unless the student asked for resources.
- Keep Veer's warm tone; still teach 1 new word if it fits naturally.
- Do NOT refuse or pad — be efficient and complete for what was asked.]`;
  }

  if (mode === "advisory") {
    return `[INQUIRY MODE — ADVISORY (ACTIVE)
This turn is classified ADVISORY — the student is asking for a choice, plan, opinion or advice ("should I…", "which is better…", "give me advice…"). OVERRIDE the 250-word floor and the concept biography for THIS reply only.
- Shape: (1) one line naming the decision the student is facing; (2) 2–4 realistic options as tight bullets, each with its main trade-off in the same bullet; (3) a clear, honest recommendation with its 1–2 reasons; (4) one concrete next step.
- Length 100–220 words unless the student asked for a full plan; no 250-word floor, no chronological survey, no etymology, no forced diagrams, no "Explore further" unless resources genuinely help.
- Warm mentor tone; meet a worried student's feeling in one line before the options if a feeling is present.
- Say each point ONCE — never restate an option, trade-off or reason already stated above.]`;
  }

  return `[INQUIRY MODE — ACADEMIC / TECHNICAL (ACTIVE)
This turn is classified ACADEMIC. Execute the EXPERT FRAMEWORK below in addition to syllabus grounding and the reply floor.
- Concept biography: state what the concept IS in one crisp line, then trace its whole journey as ONE continuous narrative — who framed it, when and from which earlier ideas, how it evolved into its present form (dates where known). Tell this biography ONCE; never re-introduce or re-express it later in the reply (No-Repeat Law).
- Process & methodology: spell out steps, mechanisms, governing logic, and assumptions; use LaTeX for relations.
- Units & symbols: name every quantity with its SI unit — reply in ms and s, mm and m (and A, V, N, J…) as the work requires; every formula carries its units beside it.
- Visual representation: include at least one structural view — a \`steps\` fence for procedures, an \`svg\` schematic for structures/processes, or a Mermaid flowchart in a \`\`\`mermaid\`\`\` fence when a flow/timeline fits (keep diagrams readable on mobile).
- Linguistic & semantic analysis: bold essential terms; add brief etymology or root meaning for 2–4 keywords when it aids memory.
- Scholarly synthesis: inspiring, instructional prose — rigorous grammar, no telegraphic shorthand.
- Extended learning: end with "Explore further:" — 1–3 internal platform links first; if the platform lacks coverage, one labelled external authoritative link is allowed (same LINK POLICY as house rules).
The 250-word minimum per topic and full syllabus depth rules APPLY in this mode. NO-REPEAT LAW: a fact, definition, analogy or example stated earlier in the SAME reply must never be restated or re-anchored later — each new passage must ADD something new.]`;
}

export const DEPTH_REGULATION_RULES = `[CONTEXT-AWARE DEPTH — EXPERT SYSTEM (NOT PROMPT-REACTIVE)

Before writing, classify the latest student message into exactly one mode:

GENERIC — greetings, thanks, logistics, quick factual lookups, mood check-ins, identity-only questions, or any request that does not need a syllabus-grade treatment.
ACADEMIC / TECHNICAL — NEB Class 11/12 subjects, derivations, proofs, numerics, definitions, comparisons, exam prep, lab concepts, or any specialized topic that benefits from teaching.
ADVISORY — the student asks for a choice, plan, opinion or advice ("should I…", "which is better…", "give me advice…", "which should I pick first…").

GENERIC MODE (when active):
- Concise, high-level, efficient: direct answer first, minimal scaffolding.
- No mandatory historical survey, no multi-section textbook layout, no forced diagrams.
- Exempt from the 250-word floor and from "one surface at a time" expansion unless the student asks to go deeper in the same message.

ACADEMIC MODE (when active) — multidimensional framework ( weave naturally; never print these as numbered section titles ):
1) Concept biography — what it is in one crisp line, then its whole journey told ONCE as a continuous narrative: who framed it, when and from which earlier ideas, how it evolved into its present form (names, dates).
2) Process & methodology — how it works step by step; causal chain; limits and conditions; every quantity carries its SI unit (ms & s, mm & m, A, V, N, J as the work requires).
3) Visual representation — Mermaid flowchart/timeline, \`steps\` block, or \`svg\` figure when the concept is structural or sequential.
4) Linguistic & semantic analysis — essential keywords, plain gloss, etymology or root hints where useful.
5) Scholarly synthesis — clear, motivating academic prose suitable for a bright +2 student.
6) Extended learning — "Explore further:" with curated internal links; one external authority only when the platform has no page (label "(external source)").
The 250-word floor APPLIES ONLY IN THIS MODE — it is the concept-treatment minimum, not a universal one.

ADVISORY MODE (when active):
- Shape: name the decision in one line; 2–4 options as tight bullets, each with its main trade-off in the same bullet; a clear, honest recommendation with its 1–2 reasons; one concrete next step.
- 100–220 words unless a full plan is asked; warm mentor tone; meet a present feeling in one line first.
- No 250-word floor, no history/etymology, no forced diagrams.

NO-REPEAT LAW (every mode): a fact, definition, analogy or example stated earlier in the SAME reply must never be restated, paraphrased or re-anchored later in it. An introduction is stated ONCE; every later passage adds new content. Repetition is the fastest way to read "stupid".

Mode choice is silent — never tell the student which mode you picked. If the message mixes modes, treat academic as primary over advisory over generic.]`;
