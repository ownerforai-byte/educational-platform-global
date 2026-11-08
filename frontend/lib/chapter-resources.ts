/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ IMPORTANT — RETAINED CODE, NOT DEAD CODE ⚠️  See lib/stream-sources.ts.
 * ═══════════════════════════════════════════════════════════════════════════
 * All three stream sources (webnotee, platform, nepalenotes) are currently
 * DISABLED by owner request 2026-11-08. This registry, the classification
 * tables below, the renderer and both call sites are deliberately kept intact
 * and will be switched back on later. DO NOT delete or "clean up" any of it.
 *
 * CHAPTER-SCOPED RESOURCE REGISTRY — build once, render everywhere.
 *
 * `lib/syllabus.ts` is the single source of truth for curriculum order. Every
 * document the platform ships is filed here against the ONE subject + unit it
 * actually belongs to. A chapter's Resources tab therefore shows only its own
 * documents; general / full-syllabus references have no chapter and stay in
 * the global PDF Library and Resource Vault instead of leaking into chapters.
 *
 * Owner request 2026-11-08: the number of Direct Stream blocks is driven by the
 * actual document/PDF count for that chapter — there is NO fixed two-block cap
 * and no subject-reference padding. A chapter with 5 docs renders 5 blocks;
 * a chapter with 0 renders none.
 *
 * To add a PDF later, add one line to DOC_LOCATIONS, WEBNOTEE_LOCATIONS or the
 * NepalEnotes registry — no page or tab needs to change. Then flip the source
 * flag in lib/stream-sources.ts.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { SYLLABUS } from "@/lib/syllabus";
import { DOCS, type Kind, type Subject } from "@/lib/docs-catalog";
import { WEBNOTEE_DOCS } from "@/lib/webnotee-catalog";
import { frameSrcFor } from "@/lib/pdf-src";
import {
  DIRECT_STREAM_ENABLED,
  isStreamSourceEnabled,
  type StreamSourceId,
} from "@/lib/stream-sources";
import { NEPALENOTES_CHAPTERS, nepalenotesPreviewUrl } from "@/lib/nepalenotes-streams";

export const CLASS_11 = "class-11-notes";
export const CLASS_12 = "class-12-notes";

/**
 * Direct Stream block count is NOT capped. Kept as a named constant only so
 * callers/tests can state the rule explicitly; it must stay `null` (unlimited).
 */
export const STREAM_BLOCK_LIMIT: number | null = null;

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
  /** Which of the three (currently disabled) catalogs this stream came from. */
  source: StreamSourceId;
};

function subjectMatches(subject: Subject, subjectSlug: string): boolean {
  return subject.toLowerCase() === subjectSlug.toLowerCase();
}

type PoolEntry = ChapterStreamPdf & { subject: Subject; unitId: string | null };

/**
 * ⚠️ IMPORTANT — all three sources are currently DISABLED (lib/stream-sources.ts).
 * When a source is re-enabled its documents flow through here again. The
 * NepalEnotes registry is intentionally NOT wired into the pool yet: mapping
 * its 298 chapter slugs to syllabus unit ids is the "later pass" the owner
 * asked for. Its data is preserved and exposed via nepalenotesRecordsFor().
 */
function streamPool(): PoolEntry[] {
  const entries: PoolEntry[] = [];

  if (isStreamSourceEnabled("platform")) {
    for (const doc of DOCS) {
      if (doc.kind !== "pdf" && doc.kind !== "html") continue;
      entries.push({
        id: doc.key,
        title: doc.title,
        src: frameSrcFor(doc.href),
        sourceLabel: "Platform document",
        scope: "chapter",
        source: "platform",
        subject: doc.subject,
        unitId: DOC_LOCATIONS[doc.key]?.[0] ?? null,
      });
    }
  }

  if (isStreamSourceEnabled("webnotee")) {
    for (const doc of WEBNOTEE_DOCS) {
      entries.push({
        id: doc.id,
        title: doc.title,
        src: frameSrcFor(doc.driveUrl),
        sourceLabel: doc.kind === "html" ? "WebNotee · live article" : "WebNotee · Google Drive",
        scope: "chapter",
        source: "webnotee",
        subject: doc.subject,
        unitId: WEBNOTEE_LOCATIONS[doc.id] ?? null,
      });
    }
  }

  return entries;
}

/**
 * Documents that belong to THIS chapter only. General references and docs
 * filed under a different unit never appear here. Each catalog is gated by its
 * (currently disabled) source flag so the data is retained but not shown.
 */
export function getChapterDocs(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): ChapterDoc[] {
  if (classSlug !== CLASS_11) return [];

  const platform: ChapterDoc[] = isStreamSourceEnabled("platform")
    ? DOCS.filter(
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
      }))
    : [];

  const external: ChapterDoc[] = isStreamSourceEnabled("webnotee")
    ? WEBNOTEE_DOCS.filter(
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
      }))
    : [];

  return [...platform, ...external];
}

/**
 * DOC-COUNT-DRIVEN: one Direct Stream block per document filed under this
 * chapter, with NO fixed two-block cap and NO subject-reference padding.
 * A chapter with 5 PDFs renders 5 blocks; a chapter with 0 renders none.
 *
 * While all three sources are disabled this returns [] everywhere, which is
 * the owner's requested "not showing" state — the renderer and both call
 * sites stay in place for the later re-enable pass.
 */
export function getChapterStreamPdfs(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): ChapterStreamPdf[] {
  if (!DIRECT_STREAM_ENABLED) return [];

  const own = streamPool().filter(
    (entry) =>
      subjectMatches(entry.subject, subjectSlug) &&
      classSlug === CLASS_11 &&
      entry.unitId === unitId,
  );

  const picked = own.map(({ id, title, src, sourceLabel, source }) => ({
    id,
    title,
    src,
    sourceLabel,
    source,
    scope: "chapter" as const,
  }));

  return STREAM_BLOCK_LIMIT === null ? picked : picked.slice(0, STREAM_BLOCK_LIMIT);
}

/**
 * ⚠️ IMPORTANT — retained NepalEnotes crawl data for the later re-enable pass.
 * Returns every scraped chapter page for one class + subject. Entries with an
 * empty driveIds array still need their PDF collected; do not prune them.
 */
export function nepalenotesRecordsFor(classSlug: string, subjectSlug: string) {
  const year = classSlug === CLASS_11 ? "11" : classSlug === CLASS_12 ? "12" : null;
  if (!year) return [];
  return NEPALENOTES_CHAPTERS.filter(
    (record) => record.classYear === year && record.subjectSlug === subjectSlug,
  );
}

/** Convenience for the later pass: the already-verified /preview URLs. */
export function nepalenotesPreviewUrlsFor(classSlug: string, subjectSlug: string): string[] {
  return nepalenotesRecordsFor(classSlug, subjectSlug).flatMap((record) =>
    record.driveIds.map(nepalenotesPreviewUrl),
  );
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
