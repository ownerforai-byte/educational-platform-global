import { describe, expect, it } from "vitest";
import { UNKNOWN_SUBJECT, classifySourceFile, sinkFolder } from "../src/ai/source-classify";

/**
 * ONE FILE, ONE SINK (owner decision 2026-09-30).
 *
 * The download folder holds 111 files, 22 of which are byte-identical copies
 * and four of which are not study material at all. The classifier is what
 * stops a 258 MB solved-PYQ book or an admit card from entering the answer
 * corpus — so these tests pin the boundaries that decide what the tutor is
 * ever allowed to be taught.
 *
 * The file names below are the REAL ones from that folder, not invented ones:
 * a classifier tuned on synthetic names passes and then misroutes the actual
 * files, which is the failure this suite exists to catch.
 */

describe("classifySourceFile — prose goes to the tutor", () => {
  it("sends notes and textbooks to the tutor sink", () => {
    for (const name of [
      "Ideal_and_Real_Gases_Notes.pdf",
      "Stoichiometery Class 11 Chemistry Notes.pdf",
      "Pioneer_Grade11_Biology_ExamCram.pdf",
      "Heat and Temperature Class 11 Physics Notes.pdf",
      "Biology_Units_1to5_Conceptual_Study_Notes.docx",
      "3. Reduced-Biology_grade_11_ck4uozj.pdf",
    ]) {
      expect(classifySourceFile(name).sink, name).toBe("tutor");
    }
  });

  it("reads the subject when the file name never says it", () => {
    // No "chemistry" anywhere in the name — the topic words carry it.
    expect(classifySourceFile("Ideal_and_Real_Gases_Notes.pdf").subject).toBe("chemistry");
    expect(classifySourceFile("LiquidStatenotes_a615d468-0b26_142278_.pdf").subject).toBe("chemistry");
    // "cell.pdf" is biology, not a nameless file dropped in `general`.
    expect(classifySourceFile("cell.pdf").subject).toBe("biology");
    expect(classifySourceFile("plasmodium (1).pdf").subject).toBe("biology");
    expect(classifySourceFile("Mitochondria, Ribosomes, ER, and microbodies.pdf").subject).toBe("biology");
  });

  it("files Limits & Continuity under mathematics, not physics", () => {
    // The trap: it was once matched by a physics topic list, and calculus
    // material silently landed in the physics folder.
    const result = classifySourceFile("Limits & Continuity _ Exercise - 15.1.pdf");
    expect(result.subject).toBe("mathematics");
    expect(result.sink).toBe("tutor");
  });

  it("keeps a file with no subject hint rather than dropping it", () => {
    const result = classifySourceFile("kech101.pdf");
    expect(result.sink).toBe("tutor");
    expect(result.subject).toBe(UNKNOWN_SUBJECT);
  });

  it("reads the class when the name states it, and admits it when it does not", () => {
    expect(classifySourceFile("Physical Quantities Class 11 Physics Notes.pdf").classLevel).toBe("11");
    expect(classifySourceFile("Compulsory-Nepali-Grade-XI.pdf").classLevel).toBe("11");
    expect(classifySourceFile("cell.pdf").classLevel).toBe("?");
  });
});

describe("classifySourceFile — questions are not knowledge", () => {
  it("routes MCQ papers to the quiz sink, never to the tutor", () => {
    for (const name of [
      "Chemistry_MCQ_Test_OPTIMIZED.md",
      "Physics_MCQ_Test.md",
      "Math_MCQ_Test_OPTIMIZED.md",
      "Chemistry MCQs (Class 11) Heritage Publication.pdf",
      "Physics MCQs (Class 11) Asmita Publication - Copy.pdf",
    ]) {
      const result = classifySourceFile(name);
      expect(result.sink, name).toBe("quiz");
      expect(result.subject, name).not.toBe(UNKNOWN_SUBJECT);
    }
  });

  it("routes past papers and solved banks to reference, not quiz", () => {
    for (const name of [
      "NEB Solution of PHYSICS (Class 11) Old is Gold Question Bank Asmita Publication.pdf",
      "Biology OLD is GOLD Question Bank (Class 11 Science) Asmita Publication.pdf",
      "Physics Grade XI Question Paper 2070_merospark_com.pdf",
      "class-11-physics-model-question.pdf",
      "OLD is GOLD Question Bank (Class 11 - Science) Asmita Publication (1).pdf",
    ]) {
      expect(classifySourceFile(name).sink, name).toBe("reference");
    }
  });

  it("keeps a solved PYQ bank and an MCQ paper in different folders", () => {
    // Both are questions; only one of them is exam framing worth citing.
    expect(classifySourceFile("NEB Solution of CHEMISTRY (Class 11) Old is Gold.pdf").sink)
      .not.toBe(classifySourceFile("Chemistry MCQs (Class 11) Heritage Publication.pdf").sink);
  });
});

describe("classifySourceFile — what never reaches the tutor at all", () => {
  it("skips slide decks and mind maps: fragments, not sentences", () => {
    for (const name of [
      "cell-biology-masterclass-slides_OPTIMIZED.md",
      "Biology_Units_1to5_Mindmap_Architecture_StudMaterial.docx",
      "architecture.md",
    ]) {
      const result = classifySourceFile(name);
      expect(result.sink, name).toBe("skip");
      expect(result.reason).toMatch(/slide|diagram/i);
    }
  });

  it("skips a syllabus: it describes the course, it does not teach it", () => {
    for (const name of ["Biology XI syllabus updated.pdf", "Physics XI Syllabus.pdf", "Grade 11 Math curriculum (Mat. 007 )-2078.pdf"]) {
      const result = classifySourceFile(name);
      expect(result.sink, name).toBe("skip");
      expect(result.reason).toMatch(/syllabus/i);
    }
  });

  it("skips junk that is not study material", () => {
    for (const name of ["SCHOLARSHIP ADMIT CARD.pdf", "README.md", "study_vault_export_1784995563661.md"]) {
      expect(classifySourceFile(name).sink, name).toBe("skip");
    }
  });

  it("does not mistake a UUID-looking file for a real one", () => {
    expect(classifySourceFile("641ca6aa-22ec-43e6-af34-a4033faa326c.pdf").sink).toBe("skip");
  });
});

describe("sinkFolder — only the tutor sink lives under kb/", () => {
  it("keeps the tutor records where the corpus already reads them", () => {
    expect(sinkFolder("tutor")).toBe("books");
  });

  it("places quiz and reference OUTSIDE kb/ so they are never taught", () => {
    // The corpus walks backend/kb/**, so these folders are the whole guarantee
    // behind "questions do not enter the answer corpus". The ingest roots them
    // under backend/sources/, which is why only `books` may ever be the
    // folder written inside kb/.
    expect(sinkFolder("quiz")).toBe("quiz");
    expect(sinkFolder("reference")).toBe("reference");
    for (const sink of ["quiz", "reference", "skip"] as const) {
      expect(sinkFolder(sink)).not.toBe(sinkFolder("tutor"));
    }
  });
});
