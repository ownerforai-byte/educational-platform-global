/**
 * Knowledge Hub — Pro-level data model shared by all six sections.
 *
 * Hierarchy (each level gets its own page):
 *   Section  →  /knowledge/<section>
 *   Chapter  →  /knowledge/<section>/<chapter>          (contents page: all 5 knowledge kinds)
 *   Kind     →  /knowledge/<section>/<chapter>/<kind>   (theory | formulas | special-cases | tricks | mistakes)
 *
 * Knowledge kinds, one page each per chapter:
 *  - theory       — full concept explanations, all levels (basic → pro)
 *  - formulas     — every formula with meaning of each symbol + when it works
 *  - specialCases — limiting/edge cases the board and entrance exams ask
 *  - tricks       — short hacks, shortcuts, speed techniques
 *  - mistakes     — classic traps and how to dodge them
 */

export const KNOWLEDGE_KINDS = [
  { slug: "theory", label: "Theory", icon: "📖", tint: "#3b82f6" },
  { slug: "formulas", label: "Formula Vault", icon: "🧮", tint: "#8b5cf6" },
  { slug: "special-cases", label: "Special Cases", icon: "⚡", tint: "#f59e0b" },
  { slug: "tricks", label: "Tricks & Shortcuts", icon: "🚀", tint: "#22c55e" },
  { slug: "mistakes", label: "Common Mistakes", icon: "🛡️", tint: "#ef4444" },
] as const;

export type KnowledgeKindSlug = (typeof KNOWLEDGE_KINDS)[number]["slug"];

export function isKnowledgeKindSlug(v: string): v is KnowledgeKindSlug {
  return KNOWLEDGE_KINDS.some((k) => k.slug === v);
}

export function knowledgeKindMeta(slug: string) {
  return KNOWLEDGE_KINDS.find((k) => k.slug === slug);
}

/** A formula with full symbol meaning + validity conditions. */
export type FormulaEntry = {
  name: string;
  latex: string;
  /** What each symbol means. */
  symbols: { sym: string; meaning: string; unit?: string }[];
  /** When the formula is valid (its working domain). */
  when: string;
  /** Optional one-line memory hook. */
  hook?: string;
};

/** A special/limiting case with the condition and what happens. */
export type SpecialCaseEntry = {
  title: string;
  condition: string;
  result: string;
  why: string;
  /** Where exams ask exactly this. */
  askedIn?: string;
};

/** A short trick/hack. */
export type TrickEntry = {
  title: string;
  /** The trick in 1–2 lines. */
  how: string;
  /** A micro example showing it work. */
  example: string;
  /** Seconds saved (approx). */
  saves?: string;
};

/** A classic exam mistake. */
export type MistakeEntry = {
  wrong: string;
  right: string;
  why: string;
};

/** Theory block — one idea per block, level-tagged. */
export type TheoryBlock = {
  heading: string;
  level: "basic" | "standard" | "pro";
  body: string;
  /** Optional KaTeX display line. */
  math?: string;
};

export type KnowledgeChapter = {
  id: string;
  title: string;
  /** Which NEB class this belongs to. */
  classLevel: "class-11" | "class-12" | "both";
  /** Short summary for cards. */
  blurb: string;
  theory: TheoryBlock[];
  formulas: FormulaEntry[];
  specialCases: SpecialCaseEntry[];
  tricks: TrickEntry[];
  mistakes: MistakeEntry[];
};

export type KnowledgeSection = {
  id: string;
  title: string;
  subtitle: string;
  chapters: KnowledgeChapter[];
};

/* ------------------------------ helpers ------------------------------ */

export function getChapter(
  section: KnowledgeSection,
  chapterId: string,
): KnowledgeChapter | undefined {
  return section.chapters.find((c) => c.id === chapterId);
}

export function chapterStats(c: KnowledgeChapter) {
  return {
    theory: c.theory.length,
    formulas: c.formulas.length,
    specialCases: c.specialCases.length,
    tricks: c.tricks.length,
    mistakes: c.mistakes.length,
  };
}
