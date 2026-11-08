import { describe, expect, it } from "vitest";
import { SYLLABUS } from "@/lib/syllabus";
import { DOCS } from "@/lib/docs-catalog";
import { WEBNOTEE_DOCS } from "@/lib/webnotee-catalog";
import {
  DIRECT_STREAM_ENABLED,
  SHOW_SOURCE_BADGE,
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
   * IMPORTANT GUARD — owner request 2026-11-08: only the small source badge is
   * hidden. All three sources must stay LIVE. If an agent disables a source or
   * "cleans up dead code" and deletes a registry, this test must fail loudly.
   */
  it("keeps all three sources live while hiding only the source badge", () => {
    expect(STREAM_SOURCE_IDS).toEqual(["webnotee", "platform", "nepalenotes"]);
    expect(DIRECT_STREAM_ENABLED).toBe(true);
    expect(SHOW_SOURCE_BADGE).toBe(false);
    for (const id of STREAM_SOURCE_IDS) {
      expect(STREAM_SOURCES[id].enabled, `${id} must stay enabled`).toBe(true);
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

  it("streams real chapter PDFs from the live sources, not empty arrays", () => {
    const algebra = getChapterStreamPdfs(CLASS_11, "mathematics", "algebra");
    expect(algebra.length).toBeGreaterThan(0);
    expect(algebra.every((pdf) => pdf.src.length > 0)).toBe(true);
    expect(getChapterDocs(CLASS_11, "mathematics", "algebra").length).toBeGreaterThan(0);

    // No cross-chapter leakage: the trigonometry guide is not in algebra.
    expect(getChapterDocs(CLASS_11, "mathematics", "algebra").map((d) => d.id)).not.toContain(
      "math-unit-02-trigonometry",
    );
  });

  it("has NO fixed two-block cap — block count follows the chapter's doc count", () => {
    expect(STREAM_BLOCK_LIMIT).toBeNull();
    // Algebra has many classified WebNotee exercise PDFs; a two-block cap
    // would truncate this.
    expect(getChapterStreamPdfs(CLASS_11, "mathematics", "algebra").length).toBeGreaterThan(2);
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

  it("keeps the WebNotee and platform classification tables", () => {
    expect(DOCS.find((doc) => doc.key === "math-unit-02-trigonometry")).toBeDefined();
    expect(WEBNOTEE_DOCS.find((doc) => doc.id === "webnotee-math-ex1.1")).toBeDefined();
    expect(classifiedUnitIds()).toContain("trigonometry");
    expect(classifiedUnitIds()).toContain("algebra");
  });
});
