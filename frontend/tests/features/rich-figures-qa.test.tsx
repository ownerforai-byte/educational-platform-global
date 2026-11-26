/**
 * Rich-figure QA (owner request 2026-11-22) — beyond the registry tests:
 *  1. every rich plate's keyword anchor must actually match a note block in
 *     the shipped canonical notes (otherwise the figure silently never lands);
 *  2. every rich plate must render as an <img> inside the Docs Viewer.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { getTopicFigures } from "@/features/docs/figures/registry";
import { RICH_FIGURES } from "@/features/docs/figures/rich-biology";
import { noteMatchesTopic, pickCanonicalNoteEntry } from "@/lib/note-topic-match";
import { TopicDocView } from "@/features/docs/doc-view";

const BIOLOGY_MANIFEST = join(
  process.cwd(),
  "public/data/syllabus-notes/biology/_manifest.json",
);
const BIOLOGY_NOTES_DIR = join(process.cwd(), "public/data/syllabus-notes/biology");

interface ManifestEntry {
  unitSlug: string;
  topicSlug: string;
  filename: string;
  duplicateType: number;
  noteCount: number;
}

function canonicalNotesFor(topicSlug: string): string[] {
  // The loader prefers the class-correct corpus source (content/manifest.json),
  // then falls back to the flat subject manifest — mirror that order here.
  const corpusPath = join(process.cwd(), "public/data/content/manifest.json");
  try {
    const corpus = JSON.parse(readFileSync(corpusPath, "utf-8")) as Array<{
      path: string;
      data: { topicSlug?: string; notes?: string[] };
    }>;
    const corpusCands = corpus
      .filter(
        (it) =>
          typeof it.path === "string" &&
          it.path.startsWith("notes/concepts/") &&
          typeof it.data?.topicSlug === "string" &&
          Array.isArray(it.data.notes),
      )
      .map((it) => ({
        topicSlug: it.data.topicSlug!,
        filename: it.path.split("/").pop() ?? "",
        notes: it.data.notes!,
      }))
      .filter((c) => noteMatchesTopic(c.topicSlug, c.filename, topicSlug));
    const corpusWinner = pickCanonicalNoteEntry(corpusCands, topicSlug);
    if (corpusWinner) return corpusWinner.notes;
  } catch {
    // corpus unavailable — fall through to the flat manifest
  }
  const manifest = JSON.parse(readFileSync(BIOLOGY_MANIFEST, "utf-8")) as ManifestEntry[];
  const cands = manifest.filter((e) => noteMatchesTopic(e.topicSlug, e.filename, topicSlug));
  expect(cands.length).toBeGreaterThan(0);
  const winner = pickCanonicalNoteEntry(manifest, topicSlug) ?? cands[0];
  const file = join(BIOLOGY_NOTES_DIR, winner.unitSlug, winner.filename);
  const data = JSON.parse(readFileSync(file, "utf-8")) as { notes: string[] };
  return data.notes;
}

describe("rich figure QA — anchors and rendering", () => {
  it(
    "every rich plate's keyword anchor matches a shipped canonical note block",
    // the corpus now ships classified tables in every topic file, so this
    // scan reads far more note blocks than before; 5s default is too tight
    { timeout: 60_000 },
    () => {
    for (const [slug, entry] of Object.entries(RICH_FIGURES)) {
      const notes = canonicalNotesFor(slug);
      for (const figure of entry.figures) {
        if (figure.keyword === undefined) continue;
        const hit = notes.findIndex((n) => n.toLowerCase().includes(figure.keyword!.toLowerCase()));
        expect(
          hit,
          `${slug}: keyword "${figure.keyword}" matches no note block`,
        ).toBeGreaterThanOrEqual(0);
      }
      // kept SVG keywords must also land
      for (const keyword of entry.keepSvg ?? []) {
        const hit = notes.findIndex((n) => n.toLowerCase().includes(keyword.toLowerCase()));
        expect(hit, `${slug}: keepSvg "${keyword}" matches no note block`).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("every rich plate renders as an <img> inside the Docs Viewer", () => {
    for (const [slug, entry] of Object.entries(RICH_FIGURES)) {
      const rasters = entry.figures.filter((f) => f.src !== undefined);
      expect(rasters.length, slug).toBeGreaterThan(0);
      const keyword = rasters[0].keyword ?? entry.figures[0].keyword ?? "";
      const { container } = render(
        <TopicDocView
          classSlug="class-11-notes"
          subjectSlug="biology"
          unitId="qa"
          topicSlug={slug}
          topicTitle={entry.title}
          data={{
            summary: entry.title,
            notes: [
              `Intro block for ${slug}.`,
              `Anchor block containing the keyword ${keyword} so the figure lands here.`,
            ],
            keyPoints: [],
          }}
        />,
      );
      for (const raster of rasters) {
        const img = container.querySelector(`img[src='${raster.src}']`);
        expect(img, `${slug}: ${raster.src} not rendered`).toBeTruthy();
        expect(img?.getAttribute("alt")).toBe(raster.alt);
      }
    }
  });
});
