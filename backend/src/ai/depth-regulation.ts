/**
 * Context-aware depth control for Veer (Agnes + internal chain).
 * Classifies each turn as generic vs academic/technical and switches reply
 * shape — concise summaries vs multidimensional pedagogical deep-dives.
 */

export type InquiryMode = "generic" | "academic";

const IDENTITY_RE =
  /\b(who (are|made|built|created|trained) you|what are you|where (do|did) you come from|who is ravikisan|who owns this platform)\b/i;

const GENERIC_RE =
  /^(hi+|hello+|hey+|thanks?|thank you|ok(?:ay)?|bye|good\s*(morning|evening|night)|how are you)\b/i;

const ACADEMIC_RE =
  /\b(derive|prove|show that|calculate|solve|formula|equation|theorem|derivation|numerical|syllabus|neb|cee|ioe|ioe\s*entrance|past\s*paper|pyq|mcq|marks?)\b/i;

const SUBJECT_RE =
  /\b(physics|chemistry|biology|mathematics|maths|calculus|organic|inorganic|genetics|ecology|thermodynamics|electrostatics|optics|mechanics|trigonometry|coordinate|vector|cell|atom|molecule|enzyme|evolution|grammar|literature|nepali|english)\b/i;

const DEPTH_QUESTION_RE =
  /\b(what is|what are|why does|why do|how does|how do|explain|define|describe|compare|difference between|vs\.?|teach me|everything about|complete notes|deep dive|in detail)\b/i;

/** Heuristic mode for server-side directives (floor, retrieval weight). */
export function classifyInquiryMode(message: string): InquiryMode {
  const q = message.trim();
  if (!q || q.length < 3) return "generic";
  if (IDENTITY_RE.test(q)) return "generic";
  if (GENERIC_RE.test(q) && q.length < 80 && !ACADEMIC_RE.test(q) && !SUBJECT_RE.test(q)) {
    return "generic";
  }
  if (ACADEMIC_RE.test(q) || SUBJECT_RE.test(q) || DEPTH_QUESTION_RE.test(q)) {
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

  return `[INQUIRY MODE — ACADEMIC / TECHNICAL (ACTIVE)
This turn is classified ACADEMIC. Execute the EXPERT FRAMEWORK below in addition to syllabus grounding and the reply floor.
- Chronological evolution: trace the idea from historical roots and named discoverers/formulators to the present formulation (dates where known).
- Process & methodology: spell out steps, mechanisms, governing logic, and assumptions; use LaTeX for relations.
- Visual representation: include at least one structural view — a \`steps\` fence for procedures, an \`svg\` schematic for structures/processes, or a Mermaid flowchart in a \`\`\`mermaid\`\`\` fence when a flow/timeline fits (keep diagrams readable on mobile).
- Linguistic & semantic analysis: bold essential terms; add brief etymology or root meaning for 2–4 keywords when it aids memory.
- Scholarly synthesis: inspiring, instructional prose — rigorous grammar, no telegraphic shorthand.
- Extended learning: end with "Explore further:" — 1–3 internal platform links first; if the platform lacks coverage, one labelled external authoritative link is allowed (same LINK POLICY as house rules).
The 250-word minimum per topic and full syllabus depth rules APPLY in this mode.]`;
}

export const DEPTH_REGULATION_RULES = `[CONTEXT-AWARE DEPTH — EXPERT SYSTEM (NOT PROMPT-REACTIVE)

Before writing, classify the latest student message into exactly one mode:

GENERIC — greetings, thanks, logistics, quick factual lookups, mood check-ins, identity-only questions, or any request that does not need a syllabus-grade treatment.
ACADEMIC / TECHNICAL — NEB Class 11/12 subjects, derivations, proofs, numerics, definitions, comparisons, exam prep, lab concepts, or any specialized topic that benefits from teaching.

GENERIC MODE (when active):
- Concise, high-level, efficient: direct answer first, minimal scaffolding.
- No mandatory historical survey, no multi-section textbook layout, no forced diagrams.
- Exempt from the 250-word floor and from "one surface at a time" expansion unless the student asks to go deeper in the same message.

ACADEMIC MODE (when active) — multidimensional framework ( weave naturally; never print these as numbered section titles ):
1) Chronological evolution — origins → key milestones (names, dates) → modern form.
2) Process & methodology — how it works step by step; causal chain; limits and conditions.
3) Visual representation — Mermaid flowchart/timeline, \`steps\` block, or \`svg\` figure when the concept is structural or sequential.
4) Linguistic & semantic analysis — essential keywords, plain gloss, etymology or root hints where useful.
5) Scholarly synthesis — clear, motivating academic prose suitable for a bright +2 student.
6) Extended learning — "Explore further:" with curated internal links; one external authority only when the platform has no page (label "(external source)").

Mode choice is silent — never tell the student which mode you picked. If the message mixes generic and academic parts, treat the academic part as primary.]`;
