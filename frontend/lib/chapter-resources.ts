/**
 * CHAPTER-SCOPED RESOURCE REGISTRY — build once, render everywhere.
 *
 * `lib/syllabus.ts` is the single source of truth for curriculum order. Every
 * document the platform ships is filed here against the ONE subject + unit it
 * actually belongs to. A chapter's Resources tab therefore shows only its own
 * documents; general / full-syllabus references have no chapter and stay in
 * the global PDF Library and Resource Vault instead of leaking into chapters.
 *
 * The same registry feeds the two large "Direct Stream" blocks: one reusable
 * component renders them on every chapter page and every topic Resources tab
 * for all six subjects in both class tracks.
 *
 * To add a PDF later, add one line to DOC_LOCATIONS or WEBNOTEE_LOCATIONS —
 * no page or tab needs to change.
 */

import { SYLLABUS } from "@/lib/syllabus";
import { DOCS, type Kind, type Subject } from "@/lib/docs-catalog";
import { WEBNOTEE_DOCS } from "@/lib/webnotee-catalog";
import { frameSrcFor } from "@/lib/pdf-src";

export const CLASS_11 = "class-11-notes";
export const CLASS_12 = "class-12-notes";

/** Number of live-stream blocks every chapter renders. */
export const STREAM_BLOCKS_PER_CHAPTER = 2;

/**
 * Platform documents (lib/docs-catalog.ts) → the class-11 unit they belong to.
 * An empty array means a general / full-syllabus reference, which is NOT shown
 * inside any chapter. A document may legitimately span several units.
 */
const DOC_LOCATIONS: Record<string, readonly string[]> = {
  "study-hub": [],
  "pioneer-grade11-biology-examcram": [],
  "bacteria-nutrition-classified-v2": ["introductory-microbiology"],
  "biology-8mark-long-questions": [],
  "biology-8mark-core-outlets": [],
  "intro-microbiology-kingdom-monera": ["introductory-microbiology"],
  "meiosis-cell-division": ["biomolecules-and-cell-biology"],
  "cell-biology-masterclass-slides": ["biomolecules-and-cell-biology"],
  "biology-units-1to5-mindmap-architecture": [],
  "biology-units-1to5-conceptual-notes": [],
  "ideal-and-real-gases-notes": ["ideal-gas"],
  "liquid-state-notes": [],
  "liquid-crystal": [],
  "physics-guide-with-diagrams": [],
  "physics-mcq-test": [],
  "physics-comprehensive-guide": [],
  "physics-conceptual-question-bank": [],
  "neb-physics-all-probable-questions": [],
  "chemistry-mcq-test": [],
  "chemistry-hub": [],
  "chemistry-probable-long-qs": [
    "atomic-structure",
    "chemical-bonding-and-shapes-of-molecules",
    "classification-of-elements-and-periodic-table",
  ],
  "math-mcq-test": [],
  "math-unit-01-algebra": ["algebra"],
  "math-unit-02-trigonometry": ["trigonometry"],
  "math-unit-03-analytic-geometry": ["analytic-geometry"],
  "math-unit-04-vectors": ["vectors"],
  "math-unit-05-statistics-probability": ["statistics-and-probability"],
  "math-unit-06-calculus": ["calculus"],
  "math-unit-07-computational-mechanics": ["computational-methods-or-mechanics"],
  "neb-essays-grade11-12": ["writing-and-composition"],
  "writing-hub": ["writing-and-composition"],
  "nepali-hub": [],
};

/**
 * External WebNotee / Google Drive streams (lib/webnotee-catalog.ts) → unit.
 * `null` = general reference. Exercise numbers follow the official NEB Class
 * 11 Mathematics unit order (Ex 1–7 Algebra, 9–11 Analytic Geometry, 12
 * Vectors, 13–14 Statistics & Probability, 15–18 Calculus, 20 Computational).
 */
const WEBNOTEE_LOCATIONS: Record<string, string | null> = {
  "webnotee-bio-biomolecules": "biomolecules-and-cell-biology",
  "webnotee-bio-cell": "biomolecules-and-cell-biology",
  "webnotee-bio-cell-division": "biomolecules-and-cell-biology",
  "webnotee-bio-biodiversity": "floral-diversity",
  "webnotee-bio-fungi": "floral-diversity",
  "webnotee-bio-lichens": "floral-diversity",
  "webnotee-bio-algae": "floral-diversity",
  "webnotee-bio-bryophyta": "floral-diversity",
  "webnotee-bio-pteridophyta": "floral-diversity",
  "webnotee-bio-gymnosperms": "floral-diversity",
  "webnotee-bio-angiosperms": "floral-diversity",
  "webnotee-bio-zoology-intro": "faunal-diversity",
  "webnotee-chem-foundations": "foundation-and-fundamentals",
  "webnotee-chem-atomic-structure": "atomic-structure",
  "webnotee-chem-bonding": "chemical-bonding-and-shapes-of-molecules",
  "webnotee-chem-stoichiometry": "stoichiometry",
  "webnotee-chem-states-of-matter": "states-of-matter",
  "webnotee-chem-oxidation-reduction": "oxidation-and-reduction",
  "webnotee-chem-equilibrium": "chemical-equilibrium",
  "webnotee-chem-non-metals": "chemistry-of-non-metals",
  "webnotee-chem-metals": "chemistry-of-metals",
  "webnotee-chem-practical": "fundamentals-of-applied-chemistry",
  "webnotee-math-ex1.1": "algebra",
  "webnotee-math-ex2.1": "algebra",
  "webnotee-math-ex2.2": "algebra",
  "webnotee-math-ex2.3": "algebra",
  "webnotee-math-ex3.1": "algebra",
  "webnotee-math-ex4.1": "algebra",
  "webnotee-math-ex4.2": "algebra",
  "webnotee-math-ex5.2": "algebra",
  "webnotee-math-ex6.1": "algebra",
  "webnotee-math-ex6.2": "algebra",
  "webnotee-math-ex6.3": "algebra",
  "webnotee-math-ex7.1": "algebra",
  "webnotee-math-ex7.2": "algebra",
  "webnotee-math-ex9.1": "analytic-geometry",
  "webnotee-math-ex10.1": "analytic-geometry",
  "webnotee-math-ex11.1": "analytic-geometry",
  "webnotee-math-ex12.1": "vectors",
  "webnotee-math-ex13.1": "statistics-and-probability",
  "webnotee-math-ex14.1": "statistics-and-probability",
  "webnotee-math-ex15.1": "calculus",
  "webnotee-math-ex15.2": "calculus",
  "webnotee-math-ex15.3": "calculus",
  "webnotee-math-ex16.1": "calculus",
  "webnotee-math-ex16.2": "calculus",
  "webnotee-math-ex16.3": "calculus",
  "webnotee-math-ex17": "calculus",
  "webnotee-math-ex18.1": "calculus",
  "webnotee-math-ex18.2": "calculus",
  "webnotee-math-ex18.3": "calculus",
  "webnotee-math-ex18.4": "calculus",
  "webnotee-math-ex18.5": "calculus",
  "webnotee-math-ex18.6": "calculus",
  "webnotee-math-ex20.1": "computational-methods-or-mechanics",
  "webnotee-eng-model-2083": null,
  "webnotee-nep-bir-purkha": "sahitya-adhyayan",
  "webnotee-nep-gauko-maya": "sahitya-adhyayan",
  "webnotee-nep-guide": null,
  "webnotee-nep-model-2079": null,
  "webnotee-phy-physical-quantities": "physical-quantities",
  "webnotee-phy-vectors": "vectors",
  "webnotee-phy-dynamics": "dynamics",
  "webnotee-phy-gravitation": "gravitation",
  "webnotee-phy-heat-temp": "heat-and-temperature",
  "webnotee-phy-thermal-expansion": "thermal-expansion",
  "webnotee-phy-ideal-gas": "ideal-gas",
  "webnotee-phy-lenses": "lenses",
  "webnotee-phy-practical": null,
};

export type ChapterDoc = {
  id: string;
  title: string;
  subject: Subject;
  topic: string;
  description: string;
  href: string;
  kind: Kind;
  origin: "platform" | "webnotee";
};

export type ChapterStreamPdf = {
  id: string;
  title: string;
  /** Ready-to-frame source: Drive /preview, a local PDF/HTML path, or an article URL. */
  src: string;
  sourceLabel: string;
  scope: "chapter" | "subject";
};

function subjectMatches(subject: Subject, subjectSlug: string): boolean {
  return subject.toLowerCase() === subjectSlug.toLowerCase();
}

/** Every document filed under exactly one chapter, in catalog order. */
function streamPool(): (ChapterStreamPdf & { subject: Subject; unitId: string | null })[] {
  const platform = DOCS.filter(
    (doc) => doc.kind === "pdf" || doc.kind === "html",
  ).map((doc) => ({
    id: doc.key,
    title: doc.title,
    src: frameSrcFor(doc.href),
    sourceLabel: "Platform document",
    scope: "chapter" as const,
    subject: doc.subject,
    unitId: DOC_LOCATIONS[doc.key]?.[0] ?? null,
  }));

  const external = WEBNOTEE_DOCS.map((doc) => ({
    id: doc.id,
    title: doc.title,
    src: frameSrcFor(doc.driveUrl),
    sourceLabel: doc.kind === "html" ? "WebNotee · live article" : "WebNotee · Google Drive",
    scope: "chapter" as const,
    subject: doc.subject,
    unitId: WEBNOTEE_LOCATIONS[doc.id] ?? null,
  }));

  return [...platform, ...external];
}

/**
 * Documents that belong to THIS chapter only. General references and docs
 * filed under a different unit never appear here.
 */
export function getChapterDocs(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): ChapterDoc[] {
  if (classSlug !== CLASS_11) return [];

  const platform: ChapterDoc[] = DOCS.filter(
    (doc) =>
      subjectMatches(doc.subject, subjectSlug) &&
      (DOC_LOCATIONS[doc.key] ?? []).includes(unitId),
  ).map((doc) => ({
    id: doc.key,
    title: doc.title,
    subject: doc.subject,
    topic: doc.topic,
    description: doc.description,
    href: doc.href,
    kind: doc.kind,
    origin: "platform" as const,
  }));

  const external: ChapterDoc[] = WEBNOTEE_DOCS.filter(
    (doc) =>
      subjectMatches(doc.subject, subjectSlug) &&
      WEBNOTEE_LOCATIONS[doc.id] === unitId,
  ).map((doc) => ({
    id: doc.id,
    title: doc.title,
    subject: doc.subject,
    topic: doc.unit + (doc.exercise ? ` · ${doc.exercise}` : ""),
    description: doc.description,
    href: doc.driveUrl,
    kind: doc.kind ?? ("pdf" as Kind),
    origin: "webnotee" as const,
  }));

  return [...platform, ...external];
}

/**
 * Exactly TWO live direct-stream blocks for any chapter of any of the six
 * subjects. Chapter-own streams come first; general subject references fill
 * the remaining slots and are badged as such in the UI.
 */
export function getChapterStreamPdfs(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): ChapterStreamPdf[] {
  const pool = streamPool().filter((entry) =>
    subjectMatches(entry.subject, subjectSlug),
  );
  if (pool.length === 0) return [];

  const own = pool.filter(
    (entry) => classSlug === CLASS_11 && entry.unitId === unitId,
  );
  const picked: ChapterStreamPdf[] = own
    .slice(0, STREAM_BLOCKS_PER_CHAPTER)
    .map(({ id, title, src, sourceLabel }) => ({
      id,
      title,
      src,
      sourceLabel,
      scope: "chapter",
    }));

  if (picked.length < STREAM_BLOCKS_PER_CHAPTER) {
    const used = new Set(picked.map((entry) => entry.id));
    // General references first, then other units of the same subject.
    const references = [
      ...pool.filter((entry) => entry.unitId === null),
      ...pool.filter((entry) => entry.unitId !== null && entry.unitId !== unitId),
    ];
    for (const entry of references) {
      if (picked.length >= STREAM_BLOCKS_PER_CHAPTER) break;
      if (used.has(entry.id)) continue;
      used.add(entry.id);
      picked.push({
        id: entry.id,
        title: entry.title,
        src: entry.src,
        sourceLabel: entry.sourceLabel,
        scope: "subject",
      });
    }
  }

  return picked;
}

/** All unit ids used by the classification, for validation in tests. */
export function classifiedUnitIds(): string[] {
  return [
    ...Object.values(DOC_LOCATIONS).flat(),
    ...Object.values(WEBNOTEE_LOCATIONS).filter((id): id is string => !!id),
  ];
}

/** All class-11 unit ids from the syllabus — the allowed classification keys. */
export function syllabusUnitIds(): Set<string> {
  const ids = new Set<string>();
  for (const track of SYLLABUS) {
    if (track.slug !== CLASS_11) continue;
    for (const subject of track.subjects) {
      for (const unit of subject.units) ids.add(unit.id);
    }
  }
  return ids;
}
