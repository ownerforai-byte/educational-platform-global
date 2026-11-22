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
import { pickCanonicalNoteEntry } from "@/lib/note-topic-match";

const ROOT = join(process.cwd(), "public/data/syllabus-notes");
const SUBJECTS = ["biology", "chemistry", "english", "mathematics", "nepali", "physics"];

interface ManifestEntry {
  unitSlug: string;
  topicSlug: string;
  filename: string;
  duplicateType: number;
}

/** Topics whose registry slug matches no manifest entry — pre-existing gaps,
 *  tracked separately; the gate fails if this list grows. */
const KNOWN_UNRESOLVED = new Set([
  "wavefront-and-huygens-principle",
  "faraday-s-laws-of-electromagnetic-induction",
  "electrochemical-cells-galvanic-cell-cell-potential-standard-electrode-potential",
  "ecological-pyramids-and-energy-flow",
  "geometric-interpretation-tangent-and-normal",
]);

function canonicalNotesFor(topicSlug: string): { subject: string; notes: string[] } | undefined {
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
      return { subject, notes: data.notes as string[] };
    } catch {
      return undefined;
    }
  }
  return undefined;
}

describe("registry-wide figure anchors", () => {
  it("resolves every registered topic except the known unresolved set", () => {
    const unresolved: string[] = [];
    for (const slug of registeredFigureSlugs()) {
      if (!getTopicFigures(slug)) continue;
      if (!canonicalNotesFor(slug)) unresolved.push(slug);
    }
    for (const slug of unresolved) {
      expect(KNOWN_UNRESOLVED.has(slug), `new unresolved topic: ${slug}`).toBe(true);
    }
  });

  it("every figure keyword (and keepSvg entry) matches a canonical note block", () => {
    let checked = 0;
    for (const slug of registeredFigureSlugs()) {
      const entry = getTopicFigures(slug);
      if (!entry) continue;
      const resolved = canonicalNotesFor(slug);
      if (!resolved) continue; // covered by the known-unresolved gate above
      const lower = resolved.notes.map((n) => n.toLowerCase());
      for (const figure of entry.figures) {
        if (figure.keyword === undefined) continue;
        checked++;
        const hit = lower.findIndex((n) => n.includes(figure.keyword!.toLowerCase()));
        expect(
          hit,
          `${resolved.subject}/${slug.slice(0, 60)}: anchor "${figure.keyword}" matches no note block`,
        ).toBeGreaterThanOrEqual(0);
      }
      for (const keyword of entry.keepSvg ?? []) {
        checked++;
        const hit = lower.findIndex((n) => n.includes(keyword.toLowerCase()));
        expect(
          hit,
          `${resolved.subject}/${slug.slice(0, 60)}: keepSvg "${keyword}" matches no note block`,
        ).toBeGreaterThanOrEqual(0);
      }
    }
    expect(checked).toBeGreaterThan(1500);
  });
});
