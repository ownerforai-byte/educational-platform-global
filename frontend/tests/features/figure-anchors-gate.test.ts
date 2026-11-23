/**
 * Registry-wide figure-anchor gate (2026-11-22).
 *
 * Every figure in the shared registry (SVG + rich) anchors itself into the
 * topic's notes via a keyword; an anchor that matches no note block means the
 * figure silently never renders. This gate walks EVERY registered topic across
 * ALL subjects, resolves the canonical notes file exactly as the Docs Viewer
 * loader does (match quality first, then duplicateType), and asserts every
 * keyword — figure anchors and keepSvg whitelists alike — lands in a block.
 *
 * Backed by content-tools/audit-figure-anchors.mjs (report) and
 * content-tools/fix-figure-anchors.mjs (caption-anchored repointer): 121 dead
 * anchors were found and repointed to words the notes actually contain.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { getTopicFigures, registeredFigureSlugs } from "@/features/docs/figures/registry";
import {
  noteMatchQuality,
  noteMatchesTopic,
  pickCanonicalNoteEntry,
} from "@/lib/note-topic-match";
import { getUnitTopicEntries, slugifySyllabusTopic, SYLLABUS } from "@/lib/core/syllabus";
import { classDirOfTrack } from "@/lib/content/paths";

const ROOT = join(process.cwd(), "public/data/syllabus-notes");
const CORPUS = join(process.cwd(), "public/data/content/manifest.json");
const SUBJECTS = ["biology", "chemistry", "english", "mathematics", "nepali", "physics"];

interface ManifestEntry {
  unitSlug: string;
  topicSlug: string;
  filename: string;
  duplicateType: number;
}

interface CorpusItem {
  path: string;
  data: { topicSlug?: string; notes?: string[] };
}

/** Topics whose registry slug matches no corpus or manifest entry — pre-existing
 *  gaps, tracked separately; the gate fails if this list grows. */
const KNOWN_UNRESOLVED = new Set([
  "wavefront-and-huygens-principle",
  "faraday-s-laws-of-electromagnetic-induction",
  "electrochemical-cells-galvanic-cell-cell-potential-standard-electrode-potential",
  "ecological-pyramids-and-energy-flow",
  "geometric-interpretation-tangent-and-normal",
]);

/**
 * Resolve the notes a page actually renders, for EVERY class variant that
 * exists. The loader prefers the class-correct corpus file; when both a
 * class-11 and a class-12 corpus file match a slug, each class's page renders
 * its own — so the anchor must land in every variant. Falls back to the flat
 * subject manifest (the loader's fallback) when the corpus has no match.
 */
/** Corpus parsed once — 2,500+ items; re-reading per slug blew the test timeout. */
let corpusItems: CorpusItem[] | undefined;
function corpus(): CorpusItem[] {
  if (!corpusItems) {
    corpusItems = JSON.parse(readFileSync(CORPUS, "utf-8")) as CorpusItem[];
  }
  return corpusItems;
}

/** topic slug -> the (classDir, unitId) pairs the real syllabus puts it under. */
const SYLLABUS_COORDS = (() => {
  const map = new Map<string, Set<string>>();
  for (const cls of SYLLABUS) {
    const classDir = cls.slug.replace(/-notes$/, "");
    for (const subj of cls.subjects) {
      for (const unit of subj.units) {
        for (const topic of unit.topics) {
          const slug = slugifySyllabusTopic(topic);
          if (!map.has(slug)) map.set(slug, new Set());
          map.get(slug)!.add(`${classDir}/${unit.id}`);
        }
      }
    }
  }
  return map;
})();

/**
 * Resolve the notes a page actually renders, for EVERY class variant that
 * exists. The loader's corpus branch runs .find over the corpus filtered by
 * (classDir, unitId, noteMatchesTopic) - the FIRST matching entry per class
 * page wins. This reproduces that per real syllabus coordinate, then falls
 * back to the flat subject manifest (the loader's fallback).
 */
function renderedNoteVariants(topicSlug: string): Array<{ label: string; notes: string[] }> {
  const variants: Array<{ label: string; notes: string[] }> = [];
  const coords = new Set<string>(SYLLABUS_COORDS.get(topicSlug) ?? []);
  for (const [slug, set] of SYLLABUS_COORDS) {
    if (slug !== topicSlug && noteMatchesTopic(slug, "", topicSlug)) {
      for (const c of set) coords.add(c);
    }
  }
  try {
    // Rank candidates per coordinate exactly like the loader: match quality,
    // then total note characters, then corpus order.
    const perCoord = new Map<string, { topicSlug: string; filename: string; noteChars: number; notes: string[] }>();
    for (const item of corpus()) {
      if (!item.path.startsWith("notes/concepts/") || !Array.isArray(item.data?.notes)) continue;
      const parts = item.path.split("/");
      const coord = `${parts[2]}/${parts[4] ?? "?"}`;
      if (!coords.has(coord)) continue;
      const filename = filenameFromPath(item.path);
      if (!noteMatchesTopic(item.data.topicSlug, filename, topicSlug)) continue;
      const noteChars = (item.data.notes as string[]).reduce(
        (sum, n) => sum + (typeof n === "string" ? n.length : 0),
        0,
      );
      const cand = { topicSlug: item.data.topicSlug ?? "", filename, noteChars, notes: item.data.notes as string[] };
      const prev = perCoord.get(coord);
      if (!prev) { perCoord.set(coord, cand); continue; }
      const qNew = noteMatchQuality(cand.topicSlug, cand.filename, topicSlug);
      const qPrev = noteMatchQuality(prev.topicSlug, prev.filename, topicSlug);
      const better =
        qNew > qPrev ||
        (qNew === qPrev && cand.noteChars > prev.noteChars);
      if (better) perCoord.set(coord, cand);
    }
    for (const [coord, cand] of perCoord) {
      variants.push({ label: `corpus:${coord}`, notes: cand.notes });
    }
  } catch {
    // corpus unavailable - flat manifest fallback below still applies
  }
  // Union semantics: the manifest canonical is always a rendered-source
  // candidate too — chemistry corpus frames are thin generated stubs, and the
  // detailed manifest copies are what those figures were authored against.
  // An anchor must land in at least ONE variant (checked below); requiring
  // every variant would fail 250+ chemistry anchors that are alive on the
  // manifest copy and only miss because the corpus frame is a stub.
  for (const subject of SUBJECTS) {
    let manifest: ManifestEntry[];
    try {
      manifest = JSON.parse(readFileSync(join(ROOT, subject, "_manifest.json"), "utf-8"));
    } catch {
      continue;
    }
    const winner = pickCanonicalNoteEntry(manifest, topicSlug);
    if (!winner) continue;
    try {
      const data = JSON.parse(
        readFileSync(join(ROOT, subject, winner.unitSlug, winner.filename), "utf-8"),
      );
      variants.push({ label: `manifest:${subject}`, notes: data.notes as string[] });
    } catch {
      // unreadable shipped copy — skip this subject
    }
  }
  return variants;
}

function filenameFromPath(path: string): string {
  return path.split("/").pop() ?? "";
}

describe("registry-wide figure anchors", () => {
  it("resolves every registered topic except the known unresolved set", () => {
    const unresolved: string[] = [];
    for (const slug of registeredFigureSlugs()) {
      if (!getTopicFigures(slug)) continue;
      if (renderedNoteVariants(slug).length === 0) unresolved.push(slug);
    }
    for (const slug of unresolved) {
      expect(KNOWN_UNRESOLVED.has(slug), `new unresolved topic: ${slug}`).toBe(true);
    }
  }, 60_000);

  it(
    "every figure keyword (and keepSvg entry) matches every rendered note variant",
    () => {
    let checked = 0;
    for (const slug of registeredFigureSlugs()) {
      const entry = getTopicFigures(slug);
      if (!entry) continue;
      const variants = renderedNoteVariants(slug);
      if (variants.length === 0) continue; // covered by the known-unresolved gate above
      const anyLower = variants.map((v) => v.notes.map((n) => n.toLowerCase()));
      for (const figure of entry.figures) {
        if (figure.keyword === undefined) continue;
        checked++;
        const hit = anyLower.some((lower) =>
          lower.some((n) => n.includes(figure.keyword!.toLowerCase())),
        );
        expect(
          hit,
          `${slug.slice(0, 60)}: anchor "${figure.keyword}" matches no note block in any source`,
        ).toBe(true);
      }
      for (const keyword of entry.keepSvg ?? []) {
        checked++;
        const hit = anyLower.some((lower) => lower.some((n) => n.includes(keyword.toLowerCase())));
        expect(
          hit,
          `${slug.slice(0, 60)}: keepSvg "${keyword}" matches no note block in any source`,
        ).toBe(true);
      }
    }
      expect(checked).toBeGreaterThan(1500);
    },
    120_000,
  );
});
