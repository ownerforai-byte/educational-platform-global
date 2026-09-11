/**
 * ═══════════════════════════════════════════════════════════════════════════
 * REVISION KIT — TYPES
 * ═══════════════════════════════════════════════════════════════════════════
 * The revision kit is a fast-revision companion per syllabus unit / topic.
 * It gathers the "conceptualize faster" aids a student needs before an exam.
 *
 * Units and topics MUST stay aligned with lib/syllabus.ts (single source of
 * truth for curriculum ordering). Never add a unit or topic here that does
 * not exist in the SYLLABUS for that class + subject.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type KitSectionKey =
  | "formulas"
  | "constants"
  | "shortcuts"
  | "examTricks"
  | "memoryAids"
  | "confusion"
  | "clarification"
  | "importantNotes"
  | "bulletPoints"
  | "specialNotes"
  | "conceptExplanation"
  | "mistakesToAvoid";

export const KIT_SECTION_ORDER: KitSectionKey[] = [
  "formulas",
  "constants",
  "shortcuts",
  "examTricks",
  "memoryAids",
  "confusion",
  "clarification",
  "importantNotes",
  "bulletPoints",
  "specialNotes",
  "conceptExplanation",
  "mistakesToAvoid",
];

export const KIT_SECTION_META: Record<
  KitSectionKey,
  { label: string; description: string; emoji: string }
> = {
  formulas: {
    label: "Formulas",
    description: "Key equations with names, units and limits to remember.",
    emoji: "📐",
  },
  constants: {
    label: "Constants",
    description: "Physical and chemical constants worth memorising for quick use.",
    emoji: "🔢",
  },
  shortcuts: {
    label: "Shortcuts",
    description: "Unit shortcuts and 10-second routes to the answer.",
    emoji: "⚡",
  },
  examTricks: {
    label: "Exam Tricks",
    description: "NEB traps, high-yield facts and safe exam wording.",
    emoji: "🎯",
  },
  memoryAids: {
    label: "Memory Aids",
    description: "Mnemonics and analogies to lock the concept in memory.",
    emoji: "🧠",
  },
  confusion: {
    label: "Common Confusion",
    description: "Areas where students often get mixed up.",
    emoji: "❓",
  },
  clarification: {
    label: "Clarification",
    description: "Clear explanations to resolve common doubts.",
    emoji: "💡",
  },
  importantNotes: {
    label: "Important Notes",
    description: "Crucial points to remember for exams.",
    emoji: "📌",
  },
  bulletPoints: {
    label: "Quick Summary",
    description: "Fast-track bullet point summary.",
    emoji: "📝",
  },
  specialNotes: {
    label: "Special Notes",
    description: "Advanced or nuanced insights.",
    emoji: "⭐",
  },
  conceptExplanation: {
    label: "Concept Explanation",
    description: "Deep dive into core principles.",
    emoji: "🔍",
  },
  mistakesToAvoid: {
    label: "Mistakes to Avoid",
    description: "Common pitfalls and how to avoid them.",
    emoji: "⚠️",
  },
};

export interface KitSections {
  formulas: string[];
  constants: string[];
  shortcuts: string[];
  examTricks: string[];
  memoryAids: string[];
  confusion?: string[];
  clarification?: string[];
  importantNotes?: string[];
  bulletPoints?: string[];
  specialNotes?: string[];
  conceptExplanation?: string[];
  mistakesToAvoid?: string[];
}

export function emptyKitSections(): KitSections {
  return {
    formulas: [],
    constants: [],
    shortcuts: [],
    examTricks: [],
    memoryAids: [],
    confusion: [],
    clarification: [],
    importantNotes: [],
    bulletPoints: [],
    specialNotes: [],
    conceptExplanation: [],
    mistakesToAvoid: [],
  };
}

export interface UnitKit extends KitSections {
  /** One-line description of what this unit covers — exam flavour. */
  summary: string;
  /** Optional per-topic overrides keyed by the SYLLABUS topic slug. */
  topics?: Record<string, Partial<KitSections>>;
}

export type RevisionKitMap = Record<
  string /* classSlug */,
  Record<string /* subjectSlug */, Record<string /* unitId */, UnitKit>>
>;

/** Human labels used across the UI. */
export const SUBJECT_LABELS: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  mathematics: "Mathematics",
  english: "English",
  nepali: "Nepali",
};

export const SUBJECT_EMOJI: Record<string, string> = {
  physics: "⚡",
  chemistry: "🧪",
  biology: "🌿",
  mathematics: "🔢",
  english: "📖",
  nepali: "🇳🇵",
};
