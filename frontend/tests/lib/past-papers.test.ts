import { describe, expect, it } from "vitest";
import { getPastPaperCounts, getSubjectPastPapers } from "@/lib/practice/past-papers";

/**
 * The Practice past-paper reader reads the authored NEB year files directly
 * (the manifest carries no question bodies and the private index is no longer
 * published), so these tests run against the real corpus.
 */
describe("practice past papers", () => {
  it("returns every authored year for a subject, newest first", async () => {
    const papers = await getSubjectPastPapers("class-11-notes", "physics");

    expect(papers.length).toBeGreaterThanOrEqual(10);
    const years = papers.map((paper) => paper.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
    expect(new Set(years).size).toBe(years.length);
    expect(years).toContain(2024);
    expect(years).toContain(2014);
  });

  it("keeps the worked solution for every question", async () => {
    const papers = await getSubjectPastPapers("class-11-notes", "physics");
    const questions = papers.flatMap((paper) => paper.questions);

    expect(questions.length).toBeGreaterThan(0);
    for (const question of questions) {
      expect(question.question.length).toBeGreaterThan(10);
      expect(question.solution, `missing solution: ${question.question.slice(0, 60)}`).toBeTruthy();
    }
    // NEB papers mix 2- and 3-mark questions; both must survive.
    expect(new Set(questions.map((q) => q.marks))).toEqual(new Set([2, 3]));
  });

  it("labels each card with its paper title and exam source", async () => {
    const [newest] = await getSubjectPastPapers("class-11-notes", "mathematics");

    expect(newest.title).toContain("NEB Class 11");
    expect(newest.title).toContain(String(newest.year));
    expect(newest.examSource).toBe("NEB");
  });

  it("counts years and solved questions per subject", async () => {
    const counts = await getPastPaperCounts("class-11-notes", [
      "physics",
      "english",
      "not-a-subject",
    ]);

    expect(counts.physics.years).toBeGreaterThanOrEqual(10);
    expect(counts.physics.questions).toBe(counts.physics.years * 4);
    expect(counts.english.years).toBe(2);
    expect(counts["not-a-subject"]).toEqual({ years: 0, questions: 0 });
  });

  it("never invents papers for a class with no authored files", async () => {
    expect(await getSubjectPastPapers("class-12-notes", "physics")).toEqual([]);
  });
});
