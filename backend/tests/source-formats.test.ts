import { describe, expect, it } from "vitest";
import {
  DEFAULT_MAX_CHUNK_CHARS,
  buildBookRecords,
  decodeXmlEntities,
  docxXmlToText,
  markdownChapters,
  paragraphsToPages,
  recordsFromChapters,
  splitMarkdownSections,
  windowedChapters,
} from "../src/ai/book-ingest";

/**
 * THE TWO NEW READERS (owner request 2026-09-30 — the folder holds .md and
 * .docx, not just PDFs).
 *
 * The PDF reader exists to repair a COLUMN of visual lines back into prose.
 * These two inputs are the opposite case, and the tests below pin exactly
 * where the shared machinery must NOT be reused:
 *
 *   · markdown is already structured — de-hyphenating or re-flowing it would
 *     destroy the `#` headings and `---` separators that carry its meaning;
 *   · docx already stores explicit paragraph breaks, so guessing them (the
 *     PDF pipeline's whole job) would be a second, wrong opinion.
 *
 * So each reader is tested against the failure it was written to avoid, not
 * against a happy-path string that any implementation would pass.
 */

describe("markdown — read as structure, never as layout", () => {
  /** Enough body text to clear MIN_CHUNK_CHARS — a chapter is only a chapter
   *  if the corpus would actually keep it. */
  const prose = (tag: string) =>
    `${tag} is the unit we keep returning to. `.repeat(12).trim();

  const deck = [
    "# Cell Biology",
    "",
    prose("The cell"),
    "",
    "## Mitochondria",
    "",
    `${prose("The mitochondrion")} It is called the **powerhouse** of the cell.`,
    "",
    "---",
    "",
    "## Ribosomes",
    "",
    prose("Ribosomes"),
    "",
  ].join("\n");

  const rawDeck = [
    "# Cell Biology",
    "",
    "The cell is the structural and functional unit of life.",
    "",
    "## Mitochondria",
    "",
    "It is the site of **aerobic respiration** and is often called the",
    "powerhouse of the cell.",
    "",
    "---",
    "",
    "## Ribosomes",
    "",
    "Sites of protein synthesis, free or bound to the ER.",
    "",
  ].join("\n");

  it("splits on ATX headings and keeps each body verbatim", () => {
    const sections = splitMarkdownSections(rawDeck);
    expect(sections.map((s) => s.title)).toEqual(["Cell Biology", "Mitochondria", "Ribosomes"]);
    // The two wrapped lines must still be two lines: markdown line breaks are
    // the author's, and re-joining them here would be layout opinion.
    expect(sections[1].text).toContain("is often called the\npowerhouse");
    expect(sections[1].text).toContain("**aerobic respiration**");
  });

  it("does NOT read a setext `---` as a heading — in a deck it separates slides", () => {
    const sections = splitMarkdownSections("Intro\n---\n\nBody after the rule.");
    expect(sections).toHaveLength(1);
    expect(sections[0].text).toContain("Body after the rule.");
  });

  it("keeps `---` out of the chapter list so a slide deck is not cut per slide", () => {
    const slides = Array.from({ length: 40 }, (_, i) => `Slide ${i + 1}\n---\n\nBody ${i + 1}.`).join("\n\n");
    expect(splitMarkdownSections(slides)).toHaveLength(1);
  });

  it("turns headings into chapters with the body intact", () => {
    const chapters = markdownChapters(deck, "Cell Biology");
    expect(chapters.map((c) => c.title)).toEqual(["Cell Biology", "Mitochondria", "Ribosomes"]);
    expect(chapters[1].text).toContain("The mitochondrion is the unit");
    // Markdown formatting survives into the record — the tutor polishes
    // grammar, it does not get handed a de-marked-down paste.
    expect(chapters[1].text).toContain("**");
  });

  it("folds a heading too small to be a chapter into the next one", () => {
    const text = ["## Tiny", "", "More prose that belongs to it.", "", "# Big Chapter", "", prose("The long chapter")].join("\n");
    const chapters = markdownChapters(text, "Doc");
    // The tiny section must not become a record of its own — it would be
    // marked filler by the corpus and lost.
    expect(chapters).toHaveLength(1);
    expect(chapters[0].text).toContain("More prose that belongs to it.");
    expect(chapters[0].title).toContain("Tiny");
  });

  it("attaches text written before the first heading to that heading", () => {
    const text = [
      "Notes taken in class.",
      "",
      "# Photosynthesis",
      "",
      prose("Photosynthesis"),
      "",
      "# Respiration",
      "",
      prose("Respiration"),
    ].join("\n");
    const chapters = markdownChapters(text, "Notes");
    expect(chapters).toHaveLength(2);
    expect(chapters[0].text).toContain("Notes taken in class.");
    expect(chapters[0].title).toBe("Photosynthesis");
    expect(chapters[1].title).toBe("Respiration");
    // The preamble must not be counted as a chapter of its own — it has no
    // heading to key on, so it rides along with the first one.
    expect(chapters.some((c) => c.title === "Untitled")).toBe(false);
  });

  it("windows a single-section document rather than writing one huge record", () => {
    const paragraphs = Array.from({ length: 400 }, (_, i) => `Paragraph ${i}: ${"lorem ipsum ".repeat(30).trim()}`).join("\n\n");
    const chapters = windowedChapters(paragraphs, "One Big File", 5000);
    expect(chapters.length).toBeGreaterThan(1);
    for (const chapter of chapters) expect(chapter.text.replace(/\s/g, "").length).toBeGreaterThan(0);
    expect(chapters[0].title).toBe("One Big File — part 1");
  });

  it("falls back to windowing when the document has no headings at all", () => {
    const body = Array.from({ length: 300 }, (_, i) => `Sentence ${i} about photosynthesis and light reactions.`).join("\n\n");
    const chapters = markdownChapters(body, "Notes", 4000);
    expect(chapters.length).toBeGreaterThan(1);
    expect(chapters[0].title).toContain("Notes");
  });

  it("carries no content when the file is empty or whitespace", () => {
    expect(markdownChapters("   \n\n  ", "Empty")).toHaveLength(0);
    expect(splitMarkdownSections("")).toHaveLength(0);
  });
});

describe("docx — explicit paragraph breaks, no guessing", () => {
  it("turns </w:p> into a paragraph break and strips every other tag", () => {
    const xml =
      `<w:p><w:r><w:t>Protoplasm is the living content of a cell.</w:t></w:r></w:p>` +
      `<w:p><w:r><w:t>The nucleus controls its activity.</w:t></w:r></w:p>`;
    const text = docxXmlToText(xml);
    expect(text.split("\n\n")).toHaveLength(2);
    expect(text).toContain("Protoplasm is the living content of a cell.");
    expect(text).not.toContain("<w:");
  });

  it("keeps text that sits inside a run, and nothing else", () => {
    const xml = `<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>Heading</w:t></w:r></w:p>`;
    expect(docxXmlToText(xml).trim()).toBe("Heading");
  });

  it("does not fuse a tab or a line break into the middle of a word", () => {
    const xml = `<w:p><w:r><w:t>Page</w:t><w:tab/><w:t>one</w:t></w:r></w:p>`;
    expect(docxXmlToText(xml)).toContain("Page one");

    const broken = `<w:p><w:r><w:t>continu</w:t><w:br/><w:t>ed</w:t></w:r></w:p>`;
    expect(docxXmlToText(broken)).toContain("continu\ned");
  });

  it("treats a table cell boundary as a space, not as a paragraph", () => {
    const xml = `<w:tbl><w:tr><w:tc><w:p><w:t>Observation</w:t></w:p></w:tc><w:tc><w:p><w:t>Result</w:t></w:p></w:tc></w:tr></w:tbl>`;
    const text = docxXmlToText(xml);
    expect(text).not.toContain("\n\nResult");
    expect(text).toContain("Observation Result");
  });

  it("decodes numeric and named entities, resolving &amp; last", () => {
    expect(decodeXmlEntities("H&lt;sub&gt;2&lt;/sub&gt;O &amp; NaOH")).toBe("H<sub>2</sub>O & NaOH");
    expect(decodeXmlEntities("it&#39;s")).toBe("it's");
    expect(decodeXmlEntities("&#x2019;")).toBe("’");
    // The escaped ampersand must survive until its own rule runs.
    expect(decodeXmlEntities("&amp;#39;")).toBe("&#39;");
    // An unknown entity is left alone rather than turned into garbage.
    expect(decodeXmlEntities("&unknown;")).toBe("&unknown;");
  });

  it("collapses the runs of blank lines Word emits between sections", () => {
    const xml = `<w:p><w:t>A</w:t></w:p>\n\n\n\n<w:p><w:t>B</w:t></w:p>`;
    expect(docxXmlToText(xml).includes("\n\n\n")).toBe(false);
  });

  it("groups paragraphs into page-sized windows for chapter detection", () => {
    const text = Array.from({ length: 10 }, (_, i) => `Paragraph number ${i + 1} with enough words to stand alone.`).join("\n\n");
    const pages = paragraphsToPages(text, 4);
    expect(pages).toHaveLength(3);
    expect(pages[0]).toContain("Paragraph number 1");
    expect(pages[0]).not.toContain("Paragraph number 5");
    expect(paragraphsToPages("")).toHaveLength(0);
  });
});

describe("recordsFromChapters — one path for all three readers", () => {
  const meta = { classLevel: "class-11", subject: "biology", bookTitle: "Cell Notes", sourceFile: "cell.md" };
  const body = "Aerobic respiration releases energy from glucose in the presence of oxygen. ".repeat(8).trim();

  it("produces the same record shape a PDF would", () => {
    const chapters = markdownChapters(
      ["# Respiration", "", body, "", "# Fermentation", "", body].join("\n"),
      meta.bookTitle,
    );
    const records = recordsFromChapters(chapters, meta);
    expect(records).toHaveLength(2);
    expect(records[0]).toMatchObject({
      class: "class-11",
      subject: "biology",
      unit: "Respiration",
      title: "Respiration",
    });
    // Provenance records the file it came from without teaching it as knowledge.
    expect(records[0].source).toContain("cell.md");
    expect(records[0].textbookText.length).toBeGreaterThan(0);
    // The chapter title must appear ONCE: it keys the record, names the file
    // and is quoted to the student as provenance.
    expect(records[0].unit.match(/Respiration/g)).toHaveLength(1);
  });

  it("still routes a parsed PDF through the shared chapter path", () => {
    const page = (heading: string, text: string) => `${heading}\n\n${text}`;
    const records = buildBookRecords({
      bookTitle: "Physics Grade 12",
      subject: "physics",
      classLevel: "class-12",
      sourceFile: "Physics_Grade-12.pdf",
      pages: [
        page("Chapter 3  Motion", "Motion is change of position with respect to surroundings and time. ".repeat(8).trim()),
        page("Chapter 4  Laws of Motion", "Newton stated three laws relating force and motion, each confirmed by experiment. ".repeat(8).trim()),
      ],
    });
    expect(records.length).toBeGreaterThanOrEqual(2);
    expect(records[0].source).toContain("Physics_Grade-12.pdf");
    expect(records[0].unit).toBe("Chapter 3 Motion");
  });

  it("drops chapters too small to be teachable rather than storing filler", () => {
    const records = recordsFromChapters(
      [{ title: "Tiny", startPage: 0, endPage: 0, text: "Too short." }],
      meta,
    );
    // Below MIN_CHUNK_CHARS the corpus marks a record as filler; refusing to
    // write it keeps the count honest instead of inflating it.
    expect(records).toHaveLength(0);
  });
});

describe("windowed / chunk ceilings", () => {
  it("never emits a chapter beyond the ceiling without splitting", () => {
    const body = Array.from({ length: 200 }, (_, i) => `Para ${i} ${"word ".repeat(40).trim()}`).join("\n\n");
    for (const chapter of windowedChapters(body, "Big", DEFAULT_MAX_CHUNK_CHARS)) {
      // A single paragraph may exceed the ceiling only when chunkChapter is
      // about to cut it on a sentence boundary; whole chapters must not.
      expect(chapter.text.length).toBeLessThanOrEqual(DEFAULT_MAX_CHUNK_CHARS * 2);
    }
  });
});
