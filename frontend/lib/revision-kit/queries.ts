/**
 * ═══════════════════════════════════════════════════════════════════════════
 * REVISION KIT — QUERIES
 * ═══════════════════════════════════════════════════════════════════════════
 * Reads the SYLLABUS (lib/syllabus.ts — single source of truth for unit/order)
 * and merges it with the authored revision-kit content per unit.
 * Topic-level kits are scoped from the unit kit by keyword overlap with the
 * official topic title, plus optional curated per-topic overrides.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import {
  getSubjectSyllabus,
  getUnitSyllabus,
  getUnitTopicEntries,
  getTopicEntryBySlug,
  type SyllabusUnit,
  type SyllabusTopicEntry,
} from "@/lib/syllabus";
import { KITS } from "./index";
import {
  emptyKitSections,
  KIT_SECTION_ORDER,
  type KitSectionKey,
  type KitSections,
  type UnitKit,
} from "./types";

const STOPWORDS = new Set([
  "and", "the", "for", "with", "its", "them", "are", "was", "has",
  "have", "into", "from", "that", "this", "their", "concept", "concepts",
  "introduction", "meaning", "general", "basic", "detail", "structure",
  "significances", "significance", "types",
]);

type KitResult = {
  hasKit: boolean;
  kit?: UnitKit;
};

/** Subjects that currently ship a revision kit. */
export const KIT_SUBJECTS = ["physics", "chemistry", "biology"] as const;

export function listRevisionSubjects() {
  return KIT_SUBJECTS.map((subjectSlug) => {
    let units = 0;
    let topics = 0;
    for (const classSlug of ["class-11-notes", "class-12-notes"]) {
      const subject = getSubjectSyllabus(classSlug, subjectSlug);
      if (!subject) continue;
      units += subject.units.length;
      topics += subject.units.reduce((a, u) => a + u.topics.length, 0);
    }
    return { subjectSlug, units, topics };
  });
}

function getKitFor(classSlug: string, subjectSlug: string, unitId: string): KitResult {
  const byClass = KITS[classSlug];
  if (!byClass) return { hasKit: false };
  const bySubject = byClass[subjectSlug];
  if (!bySubject) return { hasKit: false };
  const kit = bySubject[unitId];
  if (!kit) return { hasKit: false };
  return { hasKit: true, kit };
}

/** Unit view model: syllabus unit + (optional) authored kit. */
export type UnitKitVM = SyllabusUnit & {
  topicEntries: SyllabusTopicEntry[];
  hasKit: boolean;
  kitSummary?: string;
  itemCounts?: Record<KitSectionKey, number>;
};

export function listUnitKits(
  classSlug: string,
  subjectSlug: string,
): { subjectName: string; units: UnitKitVM[] } {
  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  if (!subject) return { subjectName: subjectSlug, units: [] };
  const units: UnitKitVM[] = subject.units.map((u) => {
    const { hasKit, kit } = getKitFor(classSlug, subjectSlug, u.id);
    return {
      ...u,
export function getUnitKitVM(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): { unit: UnitKitVM; kit?: UnitKit; subjectName: string } | null {
  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  if (!subject) return null;
  const unit = getUnitSyllabus(subject, unitId);
  if (!unit) return null;
  const { hasKit, kit } = getKitFor(classSlug, subjectSlug, unitId);
  return {
    subjectName: subject.name,
    unit: {
      ...unit,
      topicEntries: getUnitTopicEntries(unit),
      hasKit,
      kitSummary: kit?.summary,
      itemCounts: countKitItems(kit),
    },
    kit,
  };
}

export type TopicKitResult = {
  topic: SyllabusTopicEntry;
  unit: UnitKitVM;
  subjectName: string;
  picks: KitSections;
  fromCurated: boolean;
  full: UnitKit | null;
};

export function getTopicKit(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
  topicSlug: string,
): TopicKitResult | null {
  const base = getUnitKitVM(classSlug, subjectSlug, unitId);
  if (!base) return null;
  const topic = getTopicEntryBySlug(base.unit, topicSlug);
  if (!topic) return null;

  const unitKit = base.kit;
  if (!unitKit) {
    return {
      topic,
      unit: base.unit,
      subjectName: base.subjectName,
      picks: emptyKitSections(),
      fromCurated: false,
      full: null,
    };
  }

  const curated = unitKit.topics?.[topic.slug];
  const picks = buildScopedPicks(unitKit, curated, topic.title);

  return {
    topic,
    unit: base.unit,
    subjectName: base.subjectName,
    picks,
    fromCurated: Boolean(curated),
    full: unitKit,
  };
}

/* ------------------------------------------------------------------ */
/* Topic scoping — keeps the unit-kit items most relevant to the       */
/* official topic title (keywords + two-word phrases + curated).       */
/* ------------------------------------------------------------------ */

function getTokens(title: string): string[] {
  return title
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 3)
    .filter((w) => !STOPWORDS.has(w));
}

function extractPhrases(title: string): string[] {
  const patches: string[] = [];
  const words = title.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2);
  for (let i = 0; i < words.length - 1; i++) patches.push(`${words[i]} ${words[i + 1]}`);
  return patches;
}

function scoreItem(text: string, tokens: string[], phrases: string[]): number {
  const lower = text.toLowerCase();
  let score = 0;
  for (const p of phrases) if (lower.includes(p)) score += 3;
  for (const t of tokens) if (lower.includes(t)) score += 1;
  return score;
}

function pickSection(
  items: string[],
  tokens: string[],
  phrases: string[],
): { picks: string[]; matched: number } {
  const scored = items
    .map((item) => ({ item, score: scoreItem(item, tokens, phrases) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  const matched = scored.length;
  if (matched >= 2) return { picks: scored.map((x) => x.item).slice(0, 6), matched };
  // Too few topic-level hits — keep the first two unit items so the page stays useful.
  return { picks: items.slice(0, 2), matched };
}

function buildScopedPicks(
  unitKit: UnitKit,
  curated: Partial<KitSections> | undefined,
  topicTitle: string,
): KitSections {
  const tokens = getTokens(topicTitle);
  const phrases = extractPhrases(topicTitle);
  const picks = emptyKitSections();

  for (const key of KIT_SECTION_ORDER) {
    const curatedItems = curated?.[key];
    if (curatedItems && curatedItems.length > 0) {
      picks[key] = curatedItems;
    } else {
      picks[key] = pickSection(unitKit[key], tokens, phrases).picks;
    }
  }
  return picks;
}

/** True when at least one section has curated/matched items. */
export function hasTopicPicks(picks: KitSections): boolean {
  return KIT_SECTION_ORDER.some((k) => picks[k].length > 0);
}

/** True when a section fell back to plain unit items (no topic match). */
export function usesUnitFallback(picks: KitSections, unitKit: UnitKit): boolean {
  return KIT_SECTION_ORDER.some((k) => {
    if (picks[k].length === 0) return false;
    return (
      picks[k].every((x) => unitKit[k].includes(x)) &&
      picks[k].length <= Math.min(2, unitKit[k].length)
    );
  });
}
function countKitItems(kit?: UnitKit): Record<KitSectionKey, number> | undefined {
  if (!kit) return undefined;
  const counts = {} as Record<KitSectionKey, number>;
  for (const key of KIT_SECTION_ORDER) counts[key] = kit[key].length;
  return counts;
}
      topicEntries: getUnitTopicEntries(u),
      hasKit,
      kitSummary: kit?.summary,
      itemCounts: countKitItems(kit),
    };
  });
  return { subjectName: subject.name, units };
}