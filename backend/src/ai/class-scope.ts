/**
 * CLASS SCOPE — the strict NEB Class 11 / Class 12 boundary.
 *
 * Owner requirement (2026-09-30): "source it to strictly class 11, 12 … and
 * tell me for rest". Two halves:
 *
 *   1. SCOPE LOCK — the tutor's PRIMARY scope is NEB +2 Science Class 11 and
 *      Class 12. Every academic answer is written at that level and grounded in
 *      Class 11/12 material first.
 *   2. THE REST, EXPLICITLY HANDLED — four zones get a deliberate, visible
 *      rule instead of a vague refusal:
 *        · prerequisite   → reach DOWN to a lower-grade idea when Class 11/12
 *                           material assumes it (fractions, algebra, basic
 *                           chemistry); teach it briefly, then return.
 *        · beyond-12      → reach UP to undergraduate material ONLY when the
 *                           student asks or the Class 11/12 rule needs it;
 *                           LABEL it as beyond-syllabus and never exam-credit it.
 *        · outside-boards → other boards/countries are answered for comparison
 *                           but always mapped back to NEB Class 11/12.
 *        · non-academic   → emotional, career and casual questions are NOT
 *                           clamped to the syllabus; answer warmly as a mentor.
 *
 * Nothing here refuses a student. The scope lock changes LEVEL and CITATION,
 * never willingness to help.
 */

import { detectClassLevel, type ClassLevel } from "./curriculum-corpus";

/** The four zones a question can fall into. */
export type ScopeZone =
  | "class-11"
  | "class-12"
  | "prerequisite"
  | "beyond-12"
  | "outside-boards"
  | "non-academic";

export interface ScopeClassification {
  zone: ScopeZone;
  classLevel: ClassLevel;
  /** The directive that must be appended to the system prompt. */
  directive: string;
}

/** Signals that a question leaves the science curriculum entirely. */
const NON_ACADEMIC = [
  "i am sad", "i'm sad", "i feel", "feelings", "breakup", "crush", "anxious", "anxiety",
  "depressed", "stress", "parents", "relationship", "friendship", "lonely", "motivation",
  "career advice", "jobs", "salary", "startup", "bored", "tired", "cant sleep", "can't sleep",
];

/** Signals that the question is asking about another board / country syllabus. */
const OTHER_BOARDS = [
  "cbse", "icse", "isc", "hsc", "ssc", "state board", "andhra", "karnataka", "kerala",
  "tamil nadu", "maharashtra", "gujarat", "west bengal", "uttar pradesh", "bihar",
  "indian syllabus", "india board", "pakistan", "bangladesh", "sri lanka",
  "a level", "as level", "sat", "ap class", "common core", "cambridge", "ib board", "igcse",
];

/** Signals that the material is above Class 12. */
const BEYOND_12 = [
  "undergraduate", "bachelor", "b.sc", "bsc", "first year graduation", "postgraduate",
  "m.sc", "masters", "phd", "research paper", "post-doc", "engineering college level",
  "graduate", "university level", "ramanujan", "abel", "stokes theorem", "gauss theorem",
  "lagrangian", "hamiltonian", "quantum mechanics", "thermodynamics of", "entropy change",
  "fourier", "laplace transform", "differential equations", "topology", "tensor",
];

/** Signals that the question assumes a lower-grade prerequisite. */
const PREREQUISITE = [
  "from scratch", "i forgot", "i don't understand basics", "basics first", "start simple",
  "what is fraction", "what is algebra", "what is ratio", "basic maths", "simple arithmetic",
  "starting point", "i am weak in", "i'm weak in", "remedial",
];

function mentions(text: string, bank: string[]): boolean {
  return bank.some((phrase) => text.includes(phrase));
}

/**
 * The per-zone directives appended to every system prompt. Each one tells the
 * model WHAT TO DO rather than what to avoid, and each is explicit about the
 * label the student should see — this is what makes "tell me for rest" true.
 */
export const DIRECTIVES: Record<ScopeZone, string> = {
  "class-11": `[CLASS SCOPE — NEB CLASS 11] This question sits in the Class 11 (+2) curriculum. Answer at Class 11 level first: the Class 11 formulation, notation and exam framing. Ground it in the Class 11 material attached above when present.`,

  "class-12": `[CLASS SCOPE — NEB CLASS 12] This question sits in the Class 12 (+2) curriculum. Answer at Class 12 level first: the Class 12 formulation, notation and exam framing. Ground it in the Class 12 material attached above when present. Where Class 11 supplied the foundation, name that link in one line rather than re-teaching it.`,

  prerequisite: `[CLASS SCOPE — REACHING DOWN] The student is missing a Class 11/12 prerequisite. Give the prerequisite FIRST, briefly and concretely (1 short paragraph or a 3-line worked step, Class 6–10 level), name it clearly as the foundation ("this is Class 10 algebra — we only need it for two lines"), then RETURN to the Class 11/12 answer and finish there. Never answer the whole question at the lower level, and never make the prerequisite feel like a separate topic they must go away and study.`,

  "beyond-12": `[CLASS SCOPE — BEYOND CLASS 12] The student asked for material ABOVE the NEB syllabus. Give it properly — do not water it down or refuse — but LABEL it explicitly (one clear line, e.g. "Beyond Class 12 — not examined by NEB, but this is why the rule works"), then tie it back to the Class 12 statement of the same idea and say which of the two the exam actually asks for. Never present graduate-level material as examinable Class 11/12 content.`,

  "outside-boards": `[CLASS SCOPE — OTHER BOARD] The student named a board other than NEB. Answer their question accurately for THAT board, then map it back in two lines to the equivalent NEB Class 11/12 topic (same idea, NEB's name for it, NEB's exam framing). If the two differ in content, say so plainly rather than blending them. Your primary source material is still the NEB Class 11/12 corpus.`,

  "non-academic": `[CLASS SCOPE — NOT A SYLLABUS QUESTION] This is a human, career, emotional or casual question. The Class 11/12 scope lock does NOT apply here: do not shoehorn a syllabus answer into it, do not bolt exam notes or keyword blocks onto a feeling. Be a warm, real mentor first; only teach when the student actually asks a teaching question.`,
};

/**
 * Classify where a question sits relative to the Class 11/12 curriculum.
 * Pure function — no I/O, no corpus access — so it is trivially testable.
 *
 * Order matters: non-academic FIRST (never clamp a human moment to a syllabus),
 * then other-board, then level. A question can be both CBSE and prerequisite;
 * the board wins because it changes which source is cited.
 */
export function classifyScope(
  question: string,
  corpusSays: "covered" | "not-covered" = "not-covered",
): ScopeClassification {
  const q = question.trim().toLowerCase();

  if (!q || mentions(q, NON_ACADEMIC)) {
    return { zone: "non-academic", classLevel: detectClassLevel(q), directive: DIRECTIVES["non-academic"] };
  }

  if (mentions(q, OTHER_BOARDS)) {
    return { zone: "outside-boards", classLevel: detectClassLevel(q), directive: DIRECTIVES["outside-boards"] };
  }

  const classLevel = detectClassLevel(q);

  if (mentions(q, PREREQUISITE)) {
    return { zone: "prerequisite", classLevel, directive: DIRECTIVES["prerequisite"] };
  }

  if (mentions(q, BEYOND_12)) {
    return { zone: "beyond-12", classLevel, directive: DIRECTIVES["beyond-12"] };
  }

  if (classLevel === "class-12") return { zone: "class-12", classLevel, directive: DIRECTIVES["class-12"] };
  if (classLevel === "class-11") return { zone: "class-11", classLevel, directive: DIRECTIVES["class-11"] };

  // No explicit level named: default to the platform's frame, both grades.
  return { zone: "class-11", classLevel, directive: DIRECTIVES["class-11"] };
}

/**
 * The always-on scope contract appended to every chat request — the general
 * rule, independent of which zone the current question fell into.
 */
export const CLASS_SCOPE_RULES = `[CLASS SCOPE — STRICTLY NEB +2 SCIENCE, CLASS 11 AND CLASS 12]

Your PRIMARY curriculum scope is NEB Class 11 and Class 12 (+2 Science) — Physics, Chemistry, Biology, Mathematics, English, Nepali. Write every academic answer at that level, cite that material first, and NEVER claim a topic belongs to the syllabus unless the attached curriculum source or the syllabus anchor actually contains it.

WHERE A QUESTION SITS, AND WHAT TO DO — apply the one that matches, always visibly:
- Class 11 / Class 12 question → answer at that grade's level and framing; the attached curriculum source is the spine of the answer.
- Missing prerequisite (the Class 11/12 answer assumes an earlier-grade idea) → teach the prerequisite briefly FIRST, then RETURN and finish at Class 11/12 level. One paragraph, not a whole lesson, and say in one line which earlier grade it comes from.
- Above Class 12 (undergraduate, research, university) → answer it properly and LABEL it "beyond Class 12 — not NEB examinable", then tie it back to the Class 12 statement of the same idea and name which one the exam asks for.
- Another board or country (CBSE, ICSE, IGCSE, HSC, A level, …) → answer for that board accurately, then map it to the NEB Class 11/12 equivalent in two lines. Say plainly where they differ — never blend two boards into one answer.
- Not a syllabus question (emotions, career, life, casual talk) → the scope lock does not apply. Be a human mentor; do not bolt exam material or keyword blocks onto a feeling.

You NEVER refuse a student for sitting outside Class 11/12. The scope changes your LEVEL, your citation and your label — never your willingness to help.`;


