import type { WritingType, WritingCategory } from "./types";
import { ESSAY_TYPES } from "./data-essays";
import { LETTER_TYPES } from "./data-letters";
import { REPORT_TYPES } from "./data-reports";
import { CREATIVE_TYPES } from "./data-creative";
import { TEXTUAL_TYPES } from "./data-textual";
import { WRITING_GRAMMAR_TYPES } from "./data-grammar";
import { VOCABULARY_TYPES } from "./data-vocabulary";
import { IDEA_TYPES } from "./data-ideas";

export type { WritingType, WritingBlock, WritingCategory } from "./types";

/** Every writing format in the NEB English exam, grouped into a single array. */
export const ALL_WRITING_TYPES: WritingType[] = [
  ...ESSAY_TYPES,
  ...LETTER_TYPES,
  ...REPORT_TYPES,
  ...CREATIVE_TYPES,
  ...TEXTUAL_TYPES,
  ...WRITING_GRAMMAR_TYPES,
  ...VOCABULARY_TYPES,
  ...IDEA_TYPES,
];

export const WRITING_CATEGORIES: WritingCategory[] = [
  "Paragraphs & Essays",
  "Letters & Emails",
  "Reports & Articles",
  "Creative Writing",
  "Textual Skills",
  "Grammar for Writing",
  "Pro Vocabulary & Flow",
  "Idea Banks & Flow Plans",
];

export const WRITING_COUNTS: Record<WritingCategory, number> = {
  "Paragraphs & Essays": ESSAY_TYPES.length,
  "Letters & Emails": LETTER_TYPES.length,
  "Reports & Articles": REPORT_TYPES.length,
  "Creative Writing": CREATIVE_TYPES.length,
  "Textual Skills": TEXTUAL_TYPES.length,
  "Grammar for Writing": WRITING_GRAMMAR_TYPES.length,
  "Pro Vocabulary & Flow": VOCABULARY_TYPES.length,
  "Idea Banks & Flow Plans": IDEA_TYPES.length,
};

export function getWritingTypesByCategory(category: WritingCategory): WritingType[] {
  return ALL_WRITING_TYPES.filter((t) => t.category === category);
}