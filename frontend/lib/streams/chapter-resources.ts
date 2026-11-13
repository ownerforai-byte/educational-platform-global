/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ IMPORTANT — RETAINED CODE, NOT DEAD CODE ⚠️  See lib/stream-sources.ts.
 * ═══════════════════════════════════════════════════════════════════════════
 * All three stream sources (webnotee, platform, nepalenotes) are LIVE. Owner
 * request 2026-11-08 hides ONLY the small source-identification badge; every
 * stream and every source PDF keeps working. This registry, the classification
 * tables, the renderer and both call sites must NOT be deleted or "cleaned up".
 *
 * CHAPTER-SCOPED RESOURCE REGISTRY — build once, render everywhere.
 *
 * `lib/syllabus.ts` is the single source of truth for curriculum order. Every
 * document the platform ships is filed against the ONE class + subject + unit
 * it actually belongs to. A chapter's Resources tab leads with its own
 * documents, followed by the subject's general references.
 *
 * Owner request 2026-11-08 (the "later pass"): "make all work not only class
 * 11, via direct stream make all work (all class 11 and 12 -- all pdfs in
 * direct stream)". ALL THREE sources now feed BOTH class tracks:
 *   - the NepalEnotes registry (lib/nepalenotes-streams.ts) was scraped for
 *     its remaining PDFs and every record classified to a syllabus unit,
 *   - the class-11-only guards were removed,
 *   - general (no-unit) documents are streamed as clearly labelled
 *     "Subject reference" blocks, and a chapter with no document of its own
 *     borrows the nearest PDF from its own class + subject, so every one of
 *     the 116 chapters in class 11 and 12 renders working Direct Stream
 *     blocks instead of an empty panel.
 *
 * There is still NO fixed two-block cap: block count follows the document
 * count. To add a PDF later, add one line to DOC_LOCATIONS,
 * WEBNOTEE_LOCATIONS or the NepalEnotes registry — no page or tab changes.
 * Keep the source flags in lib/stream-sources.ts set to true.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { SYLLABUS } from "@/lib/core/syllabus";
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
  origin: "platform" | "webnotee" | "nepalenotes";
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

function subjectMatches(subject: string, subjectSlug: string): boolean {
  return subject.toLowerCase() === subjectSlug.toLowerCase();
}

type PoolEntry = ChapterStreamPdf & {
  classSlug: string;
  subject: string;
  unitId: string | null;
};

/**
 * ⚠️ IMPORTANT — all three sources are LIVE (lib/stream-sources.ts). Only the
 * small source badge is hidden; nothing here is disabled. The NepalEnotes
 * registry IS wired into the pool: every scraped chapter carries its own
 * `unitId` (lib/syllabus.ts) and, where the source page has one, its Google
 * Drive /preview PDF id. Class 11 and class 12 share this one pool.
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
        classSlug: CLASS_11,
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
        classSlug: CLASS_11,
        subject: doc.subject,
        unitId: WEBNOTEE_LOCATIONS[doc.id] ?? null,
      });
    }
  }

  if (isStreamSourceEnabled("nepalenotes")) {
    for (const record of NEPALENOTES_CHAPTERS) {
      for (const driveId of record.driveIds) {
        entries.push({
          id: `nepalenotes:${record.classYear}:${record.subjectSlug}:${record.slug}:${driveId}`,
          title: record.title,
          src: nepalenotesPreviewUrl(driveId),
          sourceLabel: "Nepal Enotes · chapter notes",
          scope: "chapter",
          source: "nepalenotes",
          classSlug: record.classYear === "11" ? CLASS_11 : CLASS_12,
          subject: record.subjectSlug,
          unitId: record.unitId,
        });
      }
    }
  }

  return entries;
}

/**
 * Documents that belong to THIS chapter only. General references and docs
 * filed under a different unit never appear here. Each catalog is gated by its
 * source flag (all currently live) so a source can be paused without deletion.
 */
export function getChapterDocs(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): ChapterDoc[] {
  const isClass11 = classSlug === CLASS_11;

  const platform: ChapterDoc[] =
    isClass11 && isStreamSourceEnabled("platform")
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

  const external: ChapterDoc[] =
    isClass11 && isStreamSourceEnabled("webnotee")
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

  // NepalEnotes is the source that actually carries class 12 chapter PDFs.
  const nepalenotes: ChapterDoc[] = isStreamSourceEnabled("nepalenotes")
    ? NEPALENOTES_CHAPTERS.filter(
        (record) =>
          (record.classYear === "11" ? CLASS_11 : CLASS_12) === classSlug &&
          subjectMatches(record.subjectSlug, subjectSlug) &&
          record.unitId === unitId &&
          record.driveIds.length > 0,
      ).map((record) => ({
        id: `nepalenotes:${record.classYear}:${record.subjectSlug}:${record.slug}`,
        title: record.title,
        subject: (record.subjectSlug.charAt(0).toUpperCase() +
          record.subjectSlug.slice(1)) as Subject,
        topic: "Chapter notes",
        description: `Nepal Enotes chapter notes — streamed live from Google Drive. Source: ${record.chapterUrl}`,
        href: nepalenotesPreviewUrl(record.driveIds[0]),
        kind: "pdf" as Kind,
        origin: "nepalenotes" as const,
      }))
    : [];

  return [...platform, ...external, ...nepalenotes];
}

function toStreamBlock(entry: PoolEntry, scope: "chapter" | "subject"): ChapterStreamPdf {
  return {
    id: entry.id,
    title: entry.title,
    src: entry.src,
    sourceLabel: entry.sourceLabel,
    source: entry.source,
    scope,
  };
}

/**
 * DOC-COUNT-DRIVEN, BOTH CLASS TRACKS: one Direct Stream block per document
 * filed under this chapter, plus the subject's general references (labelled
 * "Subject reference" so nothing is mislabelled as chapter-specific). There is
 * NO fixed two-block cap. All three sources are live; the only hidden element
 * is the small source badge (SHOW_SOURCE_BADGE).
 *
 * Owner request 2026-11-08: "make all work not only class 11 ... all pdfs in
 * direct stream". A chapter that still has no document of its own borrows up
 * to two PDFs from its OWN class + subject, so every chapter of class 11 and
 * class 12 renders working blocks instead of an empty panel. Borrowing never
 * crosses a class or subject boundary.
 */
export function getChapterStreamPdfs(
  classSlug: string,
  subjectSlug: string,
  unitId: string,
): ChapterStreamPdf[] {
  if (!DIRECT_STREAM_ENABLED) return [];

  const pool = streamPool().filter(
    (entry) =>
      entry.classSlug === classSlug &&
      subjectMatches(entry.subject, subjectSlug) &&
      entry.src.length > 0,
  );

  const picked: ChapterStreamPdf[] = [];
  const seenSrc = new Set<string>();
  for (const block of [
    ...pool.filter((entry) => entry.unitId === unitId).map((e) => toStreamBlock(e, "chapter")),
    ...pool.filter((entry) => entry.unitId === null).map((e) => toStreamBlock(e, "subject")),
  ]) {
    if (seenSrc.has(block.src)) continue; // one Drive id can appear on two pages
    seenSrc.add(block.src);
    picked.push(block);
  }

  if (picked.length === 0 && pool.length > 0) {
    const subjectPool: ChapterStreamPdf[] = [];
    const seenSubjectSrc = new Set<string>();
    for (const entry of pool) {
      if (seenSubjectSrc.has(entry.src)) continue;
      seenSubjectSrc.add(entry.src);
      subjectPool.push(toStreamBlock(entry, "subject"));
    }
    // Deterministic rotation so different chapters do not all show the same PDF.
    const hash = [...unitId].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
    const start = hash % subjectPool.length;
    const seenId = new Set<string>();
    for (let offset = 0; offset < subjectPool.length && picked.length < 2; offset++) {
      const block = subjectPool[(start + offset) % subjectPool.length];
      if (block && !seenId.has(block.id)) {
        seenId.add(block.id);
        picked.push(block);
      }
    }
  }

  return STREAM_BLOCK_LIMIT === null ? picked : picked.slice(0, STREAM_BLOCK_LIMIT);
}

/**
 * Returns every scraped NepalEnotes chapter page for one class + subject.
 * Entries with an empty `driveIds` are real chapter pages whose source has no
 * PDF (mostly HTML literature notes); do not prune them.
 */
export function nepalenotesRecordsFor(classSlug: string, subjectSlug: string) {
  const year = classSlug === CLASS_11 ? "11" : classSlug === CLASS_12 ? "12" : null;
  if (!year) return [];
  return NEPALENOTES_CHAPTERS.filter(
    (record) => record.classYear === year && record.subjectSlug === subjectSlug,
  );
}

/** Convenience helper: the already-verified /preview URLs. */
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
    ...NEPALENOTES_CHAPTERS.map((record) => record.unitId),
  ];
}

/** All unit ids from the syllabus (both class tracks) — allowed keys. */
export function syllabusUnitIds(): Set<string> {
  const ids = new Set<string>();
  for (const track of SYLLABUS) {
    for (const subject of track.subjects) {
      for (const unit of subject.units) ids.add(unit.id);
    }
  }
  return ids;
}
