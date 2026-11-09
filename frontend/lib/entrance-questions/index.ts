/**
 * Entrance Question Bank — resolver.
 *
 * getEntranceQuestions(subjectSlug, unitId) → the authored MCQs for that
 * subject+unit, or the subject's shared bank for subjects without unit
 * granularity (english/nepali). Falls back to [] so non-listed units simply
 * don't render the section.
 */

import type { EntranceBank, EntranceQuestion, EntranceSubject } from "./types";
import { SYLLABUS } from "@/lib/syllabus";
import { PHYSICS_ENTRANCE } from "./physics";
import { PHYSICS_12_ENTRANCE } from "./physics-12";
import { CHEMISTRY_ENTRANCE } from "./chemistry";
import { CHEMISTRY_12_ENTRANCE } from "./chemistry-12";
import { BIOLOGY_ENTRANCE } from "./biology";
import { BIOLOGY_12_ENTRANCE } from "./biology-12";
import { MATHEMATICS_ENTRANCE } from "./mathematics";
import { MATHEMATICS_12_ENTRANCE } from "./mathematics-12";
import { ENGLISH_ENTRANCE, NEPALI_ENTRANCE } from "./languages";

const BANKS: EntranceBank = {
  physics: [...PHYSICS_ENTRANCE, ...PHYSICS_12_ENTRANCE],
  chemistry: [...CHEMISTRY_ENTRANCE, ...CHEMISTRY_12_ENTRANCE],
  biology: [...BIOLOGY_ENTRANCE, ...BIOLOGY_12_ENTRANCE],
  mathematics: [...MATHEMATICS_ENTRANCE, ...MATHEMATICS_12_ENTRANCE],
  english: ENGLISH_ENTRANCE,
  nepali: NEPALI_ENTRANCE,
};

const SUBJECT_ALIASES: Record<string, EntranceSubject> = {
  physics: "physics",
  chemistry: "chemistry",
  biology: "biology",
  mathematics: "mathematics",
  math: "mathematics",
  english: "english",
  nepali: "nepali",
};

export function hasEntranceBank(subjectSlug: string): boolean {
  return subjectSlug.toLowerCase() in SUBJECT_ALIASES;
}

/**
 * Questions for a subject+unit. Unit aliases ("work-energy-power" vs
 * "work-energy-and-power") share their canonical bank; the wildcard "*"
 * bank serves subjects with unit-free papers (english, nepali).
 */
export function getEntranceQuestions(subjectSlug: string, unitId: string): EntranceQuestion[] {
  const subject = SUBJECT_ALIASES[subjectSlug.toLowerCase()];
  if (!subject) return [];
  const banks = BANKS[subject];
  const uid = unitId.toLowerCase();

  for (const bank of banks) {
    if (bank.units.includes(uid)) return bank.questions;
  }
  for (const bank of banks) {
    if (bank.units.includes("*")) return bank.questions;
  }
  return [];
}

/**
 * True when the subject carries one shared paper ("*" bank) instead of
 * per-unit sets — english and nepali.
 */
export function usesSharedBank(subjectSlug: string): boolean {
  const subject = SUBJECT_ALIASES[subjectSlug.toLowerCase()];
  if (!subject) return false;
  return BANKS[subject].some((bank) => bank.units.includes("*"));
}

export interface ModelQuestionUnit {
  classLabel: string;
  unitTitle: string;
  questions: EntranceQuestion[];
}

/**
 * Every non-empty question set for a subject, in syllabus order, labelled with
 * the class and unit it belongs to. Alias units that resolve to the same bank
 * are shown once (the question-set reference is the dedupe key).
 */
export function getModelQuestionUnits(subjectSlug: string): ModelQuestionUnit[] {
  const out: ModelQuestionUnit[] = [];
  const seen = new Set<EntranceQuestion[]>();
  const shared = usesSharedBank(subjectSlug);

  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      if (subject.slug !== subjectSlug) continue;
      for (const unit of subject.units) {
        const questions = getEntranceQuestions(subjectSlug, unit.id);
        if (questions.length === 0 || seen.has(questions)) continue;
        seen.add(questions);
        out.push({
          classLabel: cls.name,
          unitTitle: shared ? `${subject.name} — shared question set` : unit.title,
          questions,
        });
      }
    }
  }
  return out;
}

export type { EntranceQuestion, EntranceSubject } from "./types";
