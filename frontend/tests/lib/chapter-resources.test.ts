import { describe, expect, it } from "vitest";
import { SYLLABUS } from "@/lib/syllabus";
import { DOCS } from "@/lib/docs-catalog";
import { WEBNOTEE_DOCS } from "@/lib/webnotee-catalog";
import {
  DIRECT_STREAM_ENABLED,
  STREAM_SOURCES,
  STREAM_SOURCE_IDS,
} from "@/lib/stream-sources";
import { NEPALENOTES_CHAPTERS } from "@/lib/nepalenotes-streams";
import {
  CLASS_11,
  STREAM_BLOCK_LIMIT,
  classifiedUnitIds,
  getChapterDocs,
  getChapterStreamPdfs,
  nepalenotesPreviewUrlsFor,
  nepalenotesRecordsFor,
  syllabusUnitIds,
} from "@/lib/chapter-resources";

describe("chapter resource classification", () => {
  it("files every classified document under a real class-11 syllabus unit", () => {
    const known = syllabusUnitIds();
    const unknown = [...new Set(classifiedUnitIds())].filter((id) => !known.has(id));
    expect(unknown).toEqual([]);
  });

  /**
   * IMPORTANT GUARD — owner request 2026-11-08: all three sources are only
   * DISABLED, not removed. If an agent "cleans up dead code" and deletes a
   * registry, this test must fail loudly.
   */
  it("keeps all three intentionally-disabled source registries intact", () => {
    expect(STREAM_SOURCE_IDS).toEqual(["webnotee", "platform", "nepalenotes"]);
    expect(DIRECT_STREAM_ENABLED).toBe(false);
    for (const id of STREAM_SOURCE_IDS) {
      expect(STREAM_SOURCES[id].enabled, `${id} must stay disabled for now`).toBe(false);
      expect(STREAM_SOURCES[id].registry).toBeTruthy();
      expect(STREAM_SOURCES[id].note).toBeTruthy();
    }
    expect(DOCS.length).toBeGreaterThan(0);
    expect(WEBNOTEE_DOCS.length).toBeGreaterThan(0);
    expect(NEPALENOTES_CHAPTERS.length).toBeGreaterThan(0);
    expect(STREAM_SOURCES.nepalenotes.registry).toContain("nepalenotes-streams");
  });

  it("retains the NepalEnotes crawl across all six subjects of both classes", () => {
    for (const track of SYLLABUS) {
      expect(track.subjects).toHaveLength(6);
      for (const subject of track.subjects) {
        expect(
          nepalenotesRecordsFor(track.slug, subject.slug).length,
          `${track.slug}/${subject.slug}`,
        ).toBeGreaterThan(0);
      }
    }
    expect(NEPALENOTES_CHAPTERS.filter((r) => r.driveIds.length > 0).length).toBeGreaterThan(0);
    expect(nepalenotesPreviewUrlsFor(CLASS_11, "biology")[0]).toMatch(
      /^https:\/\/drive\.google\.com\/file\/d\/[A-Za-z0-9_-]+\/preview$/,
    );
  });

  it("hides every stream and chapter doc while all sources are disabled", () => {
    for (const track of SYLLABUS) {
      for (const subject of track.subjects) {
        for (const unit of subject.units) {
          expect(getChapterStreamPdfs(track.slug, subject.slug, unit.id)).toEqual([]);
          expect(getChapterDocs(track.slug, subject.slug, unit.id)).toEqual([]);
        }
      }
    }
  });

  it("covers exactly six subjects in EACH class track (11 and 12)", () => {
    const sixSubjects = ["biology", "chemistry", "english", "mathematics", "nepali", "physics"];
    expect(SYLLABUS.map((track) => track.slug).sort()).toEqual(
      [CLASS_11, "class-12-notes"].sort(),
    );
    for (const track of SYLLABUS) {
      expect(track.subjects.map((subject) => subject.slug).sort()).toEqual(sixSubjects);
    }
  });

  it("has NO fixed two-block cap — block count follows the chapter's doc count", () => {
    expect(STREAM_BLOCK_LIMIT).toBeNull();
  });

  it("keeps the WebNotee and platform classification tables even while hidden", () => {
    expect(DOCS.find((doc) => doc.key === "math-unit-02-trigonometry")).toBeDefined();
    expect(WEBNOTEE_DOCS.find((doc) => doc.id === "webnotee-math-ex1.1")).toBeDefined();
    expect(classifiedUnitIds()).toContain("trigonometry");
    expect(classifiedUnitIds()).toContain("algebra");
  });
});
