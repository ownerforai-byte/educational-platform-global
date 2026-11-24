import { describe, expect, it } from "vitest";
import { SYLLABUS } from "@/lib/core/syllabus";
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
  CLASS_12,
  STREAM_BLOCK_LIMIT,
  classifiedUnitIds,
  getChapterDocs,
  getChapterNepalieducateStreamPdfs,
  getChapterNoteswiftStreamPdfs,
  getChapterStreamPdfs,
  nepalenotesPreviewUrlsFor,
  nepalenotesRecordsFor,
  syllabusUnitIds,
} from "@/lib/chapter-resources";

describe("chapter resource classification", () => {
  it("files every classified document under a real syllabus unit (both classes)", () => {
    const known = syllabusUnitIds();
    const unknown = [...new Set(classifiedUnitIds())].filter((id) => !known.has(id));
    expect(unknown).toEqual([]);
  });

  /**
   * OWNER REQUEST 2026-11-08 — "make all work not only class 11, via direct
   * stream make all work (all class 11 and 12 -- all pdfs in direct stream)".
   * Every chapter of every subject in BOTH class tracks must render at least
   * one working Direct Stream block. If a future change reintroduces the old
   * `classSlug !== CLASS_11` guard or unwires the NepalEnotes pool, this test
   * fails loudly.
   */
  it("streams PDFs in EVERY chapter of every subject of class 11 AND class 12", () => {
    const empty: string[] = [];
    let class12Chapters = 0;
    let class12Blocks = 0;

    for (const track of SYLLABUS) {
      for (const subject of track.subjects) {
        for (const unit of subject.units) {
          const key = `${track.slug}/${subject.slug}/${unit.id}`;
          const streams = getChapterStreamPdfs(track.slug, subject.slug, unit.id);
          if (streams.length === 0) empty.push(key);
          expect(streams.every((pdf) => pdf.src.length > 0), key).toBe(true);
          expect(new Set(streams.map((pdf) => pdf.src)).size, key).toBe(streams.length);
          if (track.slug === CLASS_12) {
            class12Chapters += 1;
            class12Blocks += streams.length;
          }
        }
      }
    }

    expect(empty).toEqual([]);
    expect(class12Chapters).toBeGreaterThan(0);
    expect(class12Blocks).toBeGreaterThan(class12Chapters);
  });

  it("wires the scraped NepalEnotes PDFs into BOTH class tracks", () => {
    const withPdfs = NEPALENOTES_CHAPTERS.filter((r) => r.driveIds.length > 0);
    expect(withPdfs.length).toBeGreaterThan(100);
    expect(withPdfs.some((r) => r.classYear === "11")).toBe(true);
    expect(withPdfs.some((r) => r.classYear === "12")).toBe(true);
    expect(NEPALENOTES_CHAPTERS.every((r) => r.unitId.length > 0)).toBe(true);
    expect(NEPALENOTES_CHAPTERS.every((r) => r.title.length > 0)).toBe(true);
    expect(getChapterDocs(CLASS_12, "chemistry", "solutions").length).toBeGreaterThan(0);
  });

  /**
   * IMPORTANT GUARD — owner request 2026-11-08: only the small source badge is
   * hidden. All three sources must stay LIVE. If an agent disables a source or
   * "cleans up dead code" and deletes a registry, this test must fail loudly.
   */
  it("keeps all stream sources live while hiding only the source badge", () => {
    expect(STREAM_SOURCE_IDS).toEqual([
      "webnotee",
      "platform",
      "nepalenotes",
      "noteswift",
      "nepalieducate",
    ]);
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

  it("streams Nepali Educate class 11 exercise PDFs on the matching syllabus unit", () => {
    const algebra = getChapterNepalieducateStreamPdfs(CLASS_11, "mathematics", "algebra");
    expect(algebra.length).toBeGreaterThan(0);
    expect(algebra.every((p) => p.articleUrl.includes("nepalieducate.com"))).toBe(true);
    expect(getChapterNepalieducateStreamPdfs(CLASS_12, "mathematics", "algebra")).toEqual([]);
  });

  it("streams NoteSwift solution PDFs only on the matching syllabus unit", () => {
    const algebra = getChapterNoteswiftStreamPdfs(CLASS_11, "mathematics", "algebra");
    expect(algebra.length).toBeGreaterThan(0);
    const complex = algebra.find((b) => b.id.includes("complex-number"));
    expect(complex?.articleUrl).toContain("noteswift.in/class-11-mathematics-complex-number");
    expect(complex?.src).toContain("17D5T2_bJqv9FD-rGaXk8U0YKDQZpgh2m");
    expect(algebra.every((p) => p.src.includes("drive.google.com"))).toBe(true);
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

  /**
   * OWNER REQUEST 2026-11-23 — wire the authored class-12 English unit
   * deep-dives into their unit's Resources tab. Every generated unit doc
   * must exist in the catalog, be filed under the class-12
   * language-development unit, and surface on that chapter's tab — while
   * class-11 chapters stay untouched by them.
   */
  it("wires the authored English XII unit deep-dives into their chapter tab", () => {
    const unitDocs = DOCS.filter((doc) => doc.key.startsWith("english-xii-"));
    expect(unitDocs.length).toBe(12);
    for (const doc of unitDocs) {
      expect(doc.classSlug).toBe(CLASS_12);
      expect(doc.subject).toBe("English");
      expect(doc.kind).toBe("html");
      expect(doc.href.startsWith("/materials/english/")).toBe(true);
    }
    const class12Tab = getChapterDocs(CLASS_12, "english", "language-development");
    const wired = class12Tab.filter((doc) => doc.id.startsWith("english-xii-"));
    expect(wired.length).toBe(12);
    // and they must NOT leak into class 11 or into other class-12 units
    expect(
      getChapterDocs(CLASS_11, "english", "writing-and-composition").filter((d) =>
        d.id.startsWith("english-xii-"),
      ).length,
    ).toBe(0);
    expect(
      getChapterDocs(CLASS_12, "english", "literary-analysis").filter((d) =>
        d.id.startsWith("english-xii-"),
      ).length,
    ).toBe(0);
    // the stream pool serves them on the class-12 chapter page too
    const streams = getChapterStreamPdfs(CLASS_12, "english", "language-development");
    expect(streams.some((pdf) => pdf.id.startsWith("english-xii-"))).toBe(true);
  });

  /**
   * OWNER REPORT 2026-11-22: "some of the docs in stream are not working".
   * Every Drive id in the registry must still be a live, embeddable file —
   * a revoked file renders an endless blank iframe. The one dead id found by
   * the live audit (Nepali Gauko Maya, 403 at source) was emptied; its
   * chapter keeps streaming via the live WebNotee exercise article.
   */
  it("streams a working document for the chapter whose Drive PDF died at source", () => {
    const gauko = NEPALENOTES_CHAPTERS.find((r) => r.slug === "class-11-nepali-gauko-maya-notes.html");
    expect(gauko).toBeDefined();
    expect(gauko!.driveIds).toEqual([]); // the dead id must never come back
    const streams = getChapterStreamPdfs(CLASS_11, "nepali", "sahitya-adhyayan");
    expect(streams.length).toBeGreaterThan(0);
    expect(streams.every((pdf) => pdf.src.length > 0)).toBe(true);
    expect(streams.some((pdf) => pdf.src.includes("gauko-maya-class-11-nepali-exercise"))).toBe(true);
  });
});
