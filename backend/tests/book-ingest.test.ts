import { describe, expect, it } from "vitest";
import {
  DEFAULT_MAX_CHUNK_CHARS,
  buildBookRecords,
  chapterHeading,
  chunkChapter,
  cleanPage,
  detectChapters,
  findRunningHeads,
  recordFileName,
  scanReport,
  slugify,
  splitPdfPages,
  type ParsedBook,
} from "../src/ai/book-ingest";

/**
 * pdftotext output is a COLUMN of visual lines: a paragraph arrives as several
 * short lines, a wrapped word is split by a hyphen, and every page carries a
 * running head and a page number. These fixtures reproduce that shape, because
 * the whole quality question is whether the stored text reads like prose or
 * like a printout.
 */
const page = (heading: string, body: string, pageNo: number) =>
  [`Physics Grade 12`, heading, ``, body, ``, `                                       ${pageNo}`, ``].join("\n");

/**
 * Body text that DIFFERS per page, as a real book's does. A fixture that
 * repeats one paragraph verbatim makes the paragraph look like a running head —
 * which is the trap the real fixture must not fall into.
 */
const BODY = (tag: string) => `Motion is one of the most common phenomena we observe in ${tag}. A body is said to be in
motion if its position changes with respect to its surroundings and time. The study
of motion without considering its cause is called kinematics, and when we con-
sider the cause of motion the study is called dynamics.`;

/** Six pages: two chapters, a repeated running head, one scanned page. */
const book: ParsedBook = {
  bookTitle: "Physics Grade 12",
  subject: "physics",
  classLevel: "class-12",
  sourceFile: "Physics_Grade-12.pdf",
  pages: [
    page("Chapter 3  Motion in a Straight Line", BODY("this chapter"), 1),
    page("3.1 Introduction", BODY("the opening section"), 2),
    page("Chapter 4  Laws of Motion", BODY("the next chapter"), 3),
    page("4.1 Newton's First Law", BODY("inertia"), 4),
    page("4.2 Momentum", BODY("collisions"), 5),
    `\f`,
  ],
};

describe("splitPdfPages / scanReport — what the file actually contains", () => {
  it("splits on the form feed pdftotext uses between pages", () => {
    expect(splitPdfPages("one\ftwo\fthree")).toHaveLength(3);
  });

  it("counts the pages that carry no text, which are the scanned ones", () => {
    const report = scanReport(["text ".repeat(10), "", "   \n  ", "more text ".repeat(10)]);
    expect(report.pages).toBe(4);
    expect(report.textlessPages).toBe(2);
    expect(report.textlessRatio).toBe(0.5);
  });

  it("reports a fully scanned book as entirely textless", () => {
    const report = scanReport(["", "", ""]);
    expect(report.textlessRatio).toBe(1);
  });
});

describe("findRunningHeads — the line that is furniture, not knowledge", () => {
  const pages = [
    page("Chapter 3  Motion", BODY("one"), 1),
    page("3.1 Introduction", BODY("two"), 2),
    page("3.2 Speed", BODY("three"), 3),
    page("3.3 Velocity", BODY("four"), 4),
    page("3.4 Acceleration", BODY("five"), 5),
  ];

  it("finds a head that repeats at the edge of most pages", () => {
    expect([...findRunningHeads(pages)]).toContain("Physics Grade 12");
  });

  it("never treats body text as furniture, however long the book", () => {
    for (const head of findRunningHeads(pages)) {
      expect(head.length).toBeLessThanOrEqual(60);
      expect(head).not.toContain("kinematics");
    }
  });

  it("needs several pages before it will call anything a head", () => {
    expect(findRunningHeads(pages.slice(0, 2)).size).toBe(0);
  });
});

describe("cleanPage — visual lines become the prose a teacher would type", () => {
  const cleaned = cleanPage(book.pages[0], findRunningHeads(book.pages));

  it("keeps the whole body — furniture detection must not eat paragraphs", () => {
    expect(cleaned.length).toBeGreaterThan(300);
  });

  it("drops the running head and the page number", () => {
    expect(cleaned).not.toContain("Physics Grade 12");
    expect(cleaned).not.toMatch(/\n\s*1\s*\n/);
  });

  it("re-joins wrapped lines into one paragraph", () => {
    expect(cleaned).toContain("A body is said to be in motion if its position changes");
    // No line should still end mid-sentence with a raw newline.
    for (const line of cleaned.split("\n")) {
      if (line.trim()) expect(line.length > 12 || line.startsWith("Chapter")).toBe(true);
    }
  });

  it("heals a word split by a hyphen at the line break", () => {
    expect(cleaned).toContain("consider the cause");
    expect(cleaned).not.toContain("con-");
    expect(cleaned).not.toContain("consider -. the");
  });

  it("keeps the chapter heading as its own paragraph", () => {
    expect(cleaned.split("\n\n")[0]).toContain("Chapter 3");
  });
});

describe("chapterHeading / detectChapters — where one unit ends and the next begins", () => {
  it("reads a chapter heading off the top of a page", () => {
    expect(chapterHeading(book.pages[0])).toContain("Chapter 3");
    expect(chapterHeading(book.pages[1])).toBeNull();
  });

  it("groups the pages between two headings", () => {
    const chapters = detectChapters(book.pages, book.bookTitle);
    expect(chapters).toHaveLength(2);
    expect(chapters[0].title).toContain("Motion in a Straight Line");
    expect(chapters[0].startPage).toBe(0);
    expect(chapters[1].title).toContain("Laws of Motion");
    expect(chapters[1].text).toContain("Newton");
  });

  it("falls back to page windows when a book has no headings at all", () => {
    const flat = Array.from({ length: 12 }, (_, i) => `Page body number ${i}. ${BODY}`);
    const chapters = detectChapters(flat, "Untitled Book", 4);
    expect(chapters.length).toBeGreaterThan(1);
    expect(chapters[0].title).toContain("Untitled Book — pages 1–4");
  });
});

describe("chunkChapter — every record fits in one prompt", () => {
  const long = Array.from({ length: 40 }, (_, i) => `Paragraph ${i}. ${"word ".repeat(60)}`).join("\n\n");

  it("respects the ceiling", () => {
    for (const chunk of chunkChapter(long, 1200)) {
      expect(chunk.length).toBeLessThanOrEqual(1400);
    }
  });

  it("never cuts a paragraph in half", () => {
    const chunks = chunkChapter(long, 1200);
    expect(chunks.join("\n\n").replace(/\s+/g, " ")).toContain("Paragraph 39.");
  });

  it("splits a single oversized paragraph on sentence boundaries", () => {
    const monster = Array.from({ length: 60 }, (_, i) => `Sentence number ${i} carries a fact.`).join(" ");
    const chunks = chunkChapter(monster, 600);
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) expect(chunk.endsWith(".")).toBe(true);
  });

  it("merges a too-short tail instead of leaving filler behind", () => {
    // One full record plus a 3-character remainder: the remainder must ride
    // along, because on its own it would be marked filler and its one fact lost.
    const chunks = chunkChapter(`${"long ".repeat(400)}Ok.`, 2000);
    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toContain("Ok.");
  });
});

describe("buildBookRecords — the drop-in record the corpus expects", () => {
  const records = buildBookRecords(book);

  it("writes one record per chunk, indexed for retrieval", () => {
    expect(records.length).toBeGreaterThan(0);
    const first = records[0];
    expect(first.class).toBe("class-12");
    expect(first.subject).toBe("physics");
    expect(first.unit).toContain("Motion in a Straight Line");
    expect(first.textbookText.length).toBeGreaterThan(0);
  });

  it("records where the text came from without repeating the book twice", () => {
    const windowed: ParsedBook = {
      ...book,
      pages: Array.from({ length: 12 }, (_, i) => BODY(`page ${i}`)),
    };
    const records = buildBookRecords(windowed);
    expect(records.length).toBeGreaterThan(0);
    for (const record of records) {
      expect(record.source.startsWith(record.unit)).toBe(true);
      expect(record.source.match(/Physics Grade 12/g)?.length).toBe(1);
      // The page range appears once, not once in the title and again after it.
      expect(record.source.match(/pages/gi)?.length).toBe(1);
    }
    expect(records[0].source).toMatch(/pages 1[–-]8/);
  });

  it("keeps provenance in a META key so it is never taught as knowledge", () => {
    // `source` is skipped by the corpus when it builds sections; the book and
    // page range must not appear as a "section" in the prompt.
    for (const record of records) {
      expect(record.source).toContain("Physics Grade 12");
      expect(Object.keys(record)).not.toContain("book");
      expect(Object.keys(record)).not.toContain("pages");
    }
  });

  it("marks the parts of a split chapter", () => {
    const big: ParsedBook = {
      ...book,
      pages: [
        page("Chapter 1  Long Chapter", Array.from({ length: 20 }, () => BODY).join("\n\n"), 1),
        page("Chapter 2  Next", BODY, 2),
      ],
    };
    const split = buildBookRecords(big, 1500);
    const parts = split.filter((r) => r.unit.includes("Long Chapter"));
    if (parts.length > 1) expect(parts[1].title).toContain("(part 2)");
    for (const record of parts) expect(record.unit).not.toContain("(part");
  });

  it("drops anything too short to teach from", () => {
    const stubs: ParsedBook = { ...book, pages: ["Chapter 9  Stub\n\nToo short.", "", ""] };
    expect(buildBookRecords(stubs)).toEqual([]);
  });

  it("uses a readable default ceiling", () => {
    const record = buildBookRecords(book)[0];
    expect(record.textbookText.join(" ").length).toBeLessThanOrEqual(DEFAULT_MAX_CHUNK_CHARS * 1.3);
  });
});

describe("slugify / recordFileName — predictable files in kb/books", () => {
  it("makes a filesystem-safe slug", () => {
    expect(slugify("Newton's Laws of Motion (Part 2)")).toBe("newtons-laws-of-motion-part-2");
    expect(slugify("  ")).toBe("record");
  });

  it("files a record under its subject", () => {
    const record = buildBookRecords(book)[0];
    const name = recordFileName(record, 0);
    expect(name).toMatch(/^physics\//);
    expect(name.endsWith(".json")).toBe(true);
    expect(name).not.toMatch(/[\\:?*"<>|]/);
  });

  it("gives two records of one chapter different file names", () => {
    const record = buildBookRecords(book)[0];
    expect(recordFileName(record, 0)).not.toBe(recordFileName(record, 1));
  });
});
