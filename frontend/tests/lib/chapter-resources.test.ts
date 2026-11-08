import { describe, expect, it } from "vitest";
import { SYLLABUS } from "@/lib/syllabus";
import { isViewableSrc } from "@/lib/pdf-src";
import {
  CLASS_11,
  classifiedUnitIds,
  getChapterDocs,
  getChapterStreamPdfs,
  syllabusUnitIds,
  STREAM_BLOCKS_PER_CHAPTER,
} from "@/lib/chapter-resources";

describe("chapter resource classification", () => {
  it("files every classified document under a real class-11 syllabus unit", () => {
    const known = syllabusUnitIds();
    const unknown = [...new Set(classifiedUnitIds())].filter((id) => !known.has(id));
    expect(unknown).toEqual([]);
  });

  it("shows only this chapter's documents — no other unit's docs leak in", () => {
    const algebra = getChapterDocs(CLASS_11, "mathematics", "algebra");
    expect(algebra.length).toBeGreaterThan(0);
    expect(algebra.every((doc) => doc.subject === "Mathematics")).toBe(true);
    // The trigonometry master guide belongs to a different chapter.
    expect(algebra.map((doc) => doc.id)).not.toContain("math-unit-02-trigonometry");
    expect(getChapterDocs(CLASS_11, "mathematics", "trigonometry").map((d) => d.id)).toContain(
      "math-unit-02-trigonometry",
    );

    // Cross-subject / full-syllabus references never appear inside a chapter.
    const allChapterIds = new Set(
      SYLLABUS.flatMap((track) =>
        track.subjects.flatMap((subject) =>
          subject.units.flatMap((unit) =>
            getChapterDocs(track.slug, subject.slug, unit.id).map((doc) => doc.id),
          ),
        ),
      ),
    );
    expect(allChapterIds.has("study-hub")).toBe(false);
    expect(allChapterIds.has("pioneer-grade11-biology-examcram")).toBe(false);
  });

  it("returns exactly two large direct-stream blocks for EVERY chapter of all six subjects", () => {
    for (const track of SYLLABUS) {
      expect(track.subjects).toHaveLength(6);
      for (const subject of track.subjects) {
        for (const unit of subject.units) {
          const pdfs = getChapterStreamPdfs(track.slug, subject.slug, unit.id);
          expect(
            pdfs,
            `${track.slug}/${subject.slug}/${unit.id}`,
          ).toHaveLength(STREAM_BLOCKS_PER_CHAPTER);
          expect(new Set(pdfs.map((p) => p.id)).size).toBe(STREAM_BLOCKS_PER_CHAPTER);
          for (const pdf of pdfs) {
            expect(isViewableSrc(pdf.src), `${pdf.id} src ${pdf.src}`).toBe(true);
            expect(pdf.title).toBeTruthy();
          }
        }
      }
    }
  });

  it("covers exactly six subjects in EACH class track (11 and 12), two blocks per chapter", () => {
    const sixSubjects = ["biology", "chemistry", "english", "mathematics", "nepali", "physics"];
    expect(SYLLABUS.map((track) => track.slug).sort()).toEqual(
      [CLASS_11, "class-12-notes"].sort(),
    );

    for (const track of SYLLABUS) {
      expect(track.subjects.map((subject) => subject.slug).sort()).toEqual(sixSubjects);
      for (const subject of track.subjects) {
        for (const unit of subject.units) {
          expect(
            getChapterStreamPdfs(track.slug, subject.slug, unit.id),
            `${track.slug}/${subject.slug}/${unit.id}`,
          ).toHaveLength(STREAM_BLOCKS_PER_CHAPTER);
        }
      }
    }
  });

  it("prefers chapter-own streams and badges the rest as subject references", () => {
    const own = getChapterStreamPdfs(CLASS_11, "mathematics", "calculus");
    expect(own.length).toBe(2);
    expect(own.every((p) => p.scope === "chapter")).toBe(true);

    const fallback = getChapterStreamPdfs("class-12-notes", "mathematics", "integration");
    expect(fallback.length).toBe(2);
    expect(fallback.every((p) => p.scope === "subject")).toBe(true);
  });
});
