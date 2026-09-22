/**
 * Syllabus-Ordered Theorem / Proof / Derivation Topic Registry
 *
 * Walks the official NEB SYLLABUS (lib/syllabus.ts) for physics, chemistry
 * and biology across both class tracks and produces ONE ordered list of
 * theorem/derivation/proof candidate topics per subject — in official
 * curriculum order — regardless of whether content exists yet.
 *
 * Curated rich derivations (lib/derivations-data.ts) are merged into their
 * matching syllabus topic so contentful items sit exactly where the
 * syllabus puts them. Every other item is a routable page that renders the
 * universal "Coming Soon" state until content is authored.
 */

import { SYLLABUS, slugifySyllabusTopic, getSubjectSyllabus } from "@/lib/syllabus";
import { DERIVATIONS_AND_THEOREMS } from "@/lib/derivations-data";
import type { DerivationOrTheorem } from "@/lib/derivations-data";

export const THEOREM_PROOF_SUBJECTS = ["physics", "chemistry", "biology", "mathematics"] as const;

/** Topics whose title matches any of these become theorem/proof/derivation pages. */
const TOPIC_KEYWORDS = [
  "law",
  "theorem",
  "principle",
  "rule",
  "theory",
  "derive",
  "derivation",
  "proof",
  "prove",
  "formula",
  "expression",
  "show that",
  "equation",
  "relation",
  "equilibrium",
  "model",
  "verification",
  "variation",
];

const STOPWORDS = new Set([
  "the", "and", "for", "with", "its", "their", "this", "that", "from",
  "between", "some", "only", "using", "based", "related", "which",
  "into", "onto", "upon", "per", "via",
]);

function tokenize(title: string): string[] {
  return title
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
}

function isTheoremCandidateTopic(title: string): boolean {
  const lower = title.toLowerCase();
  return TOPIC_KEYWORDS.some((kw) => lower.includes(kw));
}

export interface SyllabusTheoremItem {
  /** Unique key: `${classSlug}/${subjectSlug}/${topicSlug}` */
  key: string;
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  unitTitle: string;
  topicSlug: string;
  topicTitle: string;
  /** Curated rich derivation/theorem attached to this syllabus topic (if any). */
  curated?: DerivationOrTheorem;
  /** True when rich curated content exists for this page. */
  hasCuratedContent: boolean;
}

function overlapTokens(a: string, b: string): number {
  const ta = new Set(tokenize(a));
  let count = 0;
  for (const t of tokenize(b)) {
    if (ta.has(t)) count++;
  }
  return count;
}

/**
 * Match a curated derivation to the best syllabus candidate topic.
 * Requires a meaningful title overlap (>=2 shared words, or 1 shared word
 * of length >= 5, e.g. "banking", "avogadro", "hardy-weinberg" tokens).
 */
function matchCuratedToTopic(
  curated: DerivationOrTheorem,
  candidates: SyllabusTheoremItem[],
): SyllabusTheoremItem | undefined {
  let best: SyllabusTheoremItem | undefined;
  let bestScore = 0;
  for (const c of candidates) {
    const score = overlapTokens(curated.title, c.topicTitle);
    const longWord = tokenize(curated.title).find(
      (t) => t.length >= 5 && c.topicTitle.toLowerCase().includes(t),
    );
    const effective = score >= 2 ? score : longWord ? 1.5 : 0;
    if (effective > bestScore) {
      bestScore = effective;
      best = c;
    }
  }
  return bestScore > 0 ? best : undefined;
}

const registryCache = new Map<string, SyllabusTheoremItem[]>();

/**
 * Get the full syllabus-ordered theorem/proof/derivation topic list for a
 * class + subject (physics, chemistry, biology). Topics are grouped by unit
 * in official curriculum order; curated content is merged in-place.
 */
export function getSyllabusTheoremItems(
  classSlug: string,
  subjectSlug: string,
): SyllabusTheoremItem[] {
  const cacheKey = `${classSlug}/${subjectSlug}`;
  const cached = registryCache.get(cacheKey);
  if (cached) return cached;

  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  if (!subject) {
    registryCache.set(cacheKey, []);
    return [];
  }

  const items: SyllabusTheoremItem[] = [];
  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      if (!isTheoremCandidateTopic(topic)) continue;
      items.push({
        key: `${classSlug}/${subjectSlug}/${slugifySyllabusTopic(topic)}`,
        classSlug,
        subjectSlug,
        unitId: unit.id,
        unitTitle: unit.title,
        topicSlug: slugifySyllabusTopic(topic),
        topicTitle: topic,
        hasCuratedContent: false,
      });
    }
  }

  // Merge curated derivations/theorems for this subject into their best-matching
  // topic. Subject slugs in the data files are identical to syllabus slugs.
  const curatedForSubject = DERIVATIONS_AND_THEOREMS.filter(
    (d) =>
      d.subject === subjectSlug &&
      subject.units.some((u) => u.id === d.unitId),
  );
  const consumed = new Set<string>();
  for (const curated of curatedForSubject) {
    const unitCandidates = items.filter((i) => i.unitId === curated.unitId);
    const match = matchCuratedToTopic(curated, unitCandidates);
    if (match && !match.hasCuratedContent) {
      match.curated = curated;
      match.hasCuratedContent = true;
      consumed.add(curated.id);
    }
  }
  // Curated items that did not match any syllabus topic are inserted as
  // standalone entries inside their unit, right after that unit's topics.
  for (const curated of curatedForSubject) {
    if (consumed.has(curated.id)) continue;
    const insertAt = items.findIndex((i) => i.unitId === curated.unitId);
    const item: SyllabusTheoremItem = {
      key: `${classSlug}/${subjectSlug}/${curated.slug}`,
      classSlug,
      subjectSlug,
      unitId: curated.unitId,
      unitTitle: curated.unit,
      topicSlug: curated.slug,
      topicTitle: curated.title,
      curated,
      hasCuratedContent: true,
    };
    if (insertAt === -1) items.push(item);
    else {
      let end = insertAt;
      while (end < items.length && items[end].unitId === curated.unitId) end++;
      items.splice(end, 0, item);
    }
  }

  // Dedupe by topicSlug: merged syllabus sources can list the same official
  // topic more than once. Keep the first covered entry if any is covered,
  // otherwise keep the first occurrence - a topic must never render twice
  // (or appear as an empty duplicate next to its covered twin).
  const seenTopic = new Map<string, number>();
  const deduped: SyllabusTheoremItem[] = [];
  for (const item of items) {
    const prev = seenTopic.get(item.topicSlug);
    if (prev === undefined) {
      seenTopic.set(item.topicSlug, deduped.length);
      deduped.push(item);
      continue;
    }
    const existing = deduped[prev];
    if (!existing.hasCuratedContent && item.hasCuratedContent) {
      deduped[prev] = item;
    }
  }
  items.length = 0;
  items.push(...deduped);

  registryCache.set(cacheKey, items);
  return items;
}

/**
 * Look up a single syllabus theorem item by its route slugs.
 * Falls back to ANY official syllabus topic (not just keyword candidates)
 * so every routed syllabus topic renders the rich scaffold instead of a
 * "not found" state.
 */
export function findSyllabusTheoremItem(
  classSlug: string,
  subjectSlug: string,
  topicSlug: string,
): SyllabusTheoremItem | undefined {
  const listed = getSyllabusTheoremItems(classSlug, subjectSlug).find(
    (i) => i.topicSlug === topicSlug,
  );
  if (listed) return listed;

  const subject = getSubjectSyllabus(classSlug, subjectSlug);
  if (!subject) return undefined;
  for (const unit of subject.units) {
    for (const topic of unit.topics) {
      const slug = slugifySyllabusTopic(topic);
      if (slug === topicSlug) {
        return {
          key: `${classSlug}/${subjectSlug}/${slug}`,
          classSlug,
          subjectSlug,
          unitId: unit.id,
          unitTitle: unit.title,
          topicSlug: slug,
          topicTitle: topic,
          hasCuratedContent: false,
        };
      }
    }
  }
  return undefined;
}

/** All class tracks × PCB subjects that must always have routed pages. */
export function getTheoremProofRoutes(): {
  classSlug: string;
  subjectSlug: string;
}[] {
  const routes: { classSlug: string; subjectSlug: string }[] = [];
  for (const cls of SYLLABUS) {
    for (const subjectSlug of THEOREM_PROOF_SUBJECTS) {
      if (cls.subjects.some((s) => s.slug === subjectSlug)) {
        routes.push({ classSlug: cls.slug, subjectSlug });
      }
    }
  }
  return routes;
}
