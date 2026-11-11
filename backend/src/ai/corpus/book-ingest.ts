/**
 * BOOK INGEST — a local book becomes a first-class platform source.
 *
 * Owner request (2026-09-30): "I have many books PDF locally, which I want to
 * make it as a source, and whenever I ask a question related to them, it should
 * scan and present all those in polished, refined and short grammar with the
 * full concept."
 *
 * Follow-up (2026-09-30): the folder holds `.pdf`, `.md` AND `.docx`, so the
 * three readers below differ on purpose — see the markdown and docx sections
 * for why neither of them can reuse the PDF cleaning pass.
 *
 * The design answer is that nothing new has to exist at RUNTIME. The platform
 * already has a drop-in knowledge contract — `backend/kb/**\/*.json`, read by
 * `curriculum-corpus.ts`, retrieved by `curriculum-retrieval.ts`, and answered
 * from with the "paste the verified knowledge, polish the grammar" rule. So the
 * PDFs are converted ONCE, on the laptop that owns them, into that JSON shape,
 * and every later question is served by the machinery that already works. The
 * books never leave the laptop; only their text does.
 *
 * Why the text has to be cleaned before it is stored (this is the whole quality
 * question — a raw extraction answers badly):
 *
 *   · pdftotext emits VISUAL lines, not sentences: a paragraph arrives as eight
 *     70-character lines with a hyphen where the word wrapped. Stored that way,
 *     "polished grammar" would have to repair the layout before it could teach.
 *     `cleanPage` therefore de-hyphenates and re-joins wrapped lines into real
 *     paragraphs, so the tutor polishes prose and not a column layout.
 *   · every page carries a running head and a page number; repeated on 400
 *     pages, they read as content. `findRunningHeads` finds the lines that sit
 *     at the top/bottom of most pages and drops them, page numbers with them.
 *   · a book is far too large for one prompt, so chapters are split into
 *     chunks that each stay readable in one record — the same rule the README
 *     already states for large sources.
 *
 * Scanned books (photographs of pages) have no text layer at all: pdftotext
 * returns nothing and no amount of cleaning helps. Those pages are DETECTED and
 * reported rather than silently ingested as empty records — see `scanReport`.
 *
 * Which file goes WHERE is decided separately, by `source-classify.ts`: prose
 * into the tutor corpus, MCQ papers to the quiz sink, past papers to reference,
 * and duplicates/junk/slides/syllabi nowhere at all.
 */

/** Smallest chunk worth storing: below this the corpus marks it filler anyway. */
export const MIN_CHUNK_CHARS = 400;

/** Default per-record ceiling. Six records at ~5k is a whole chapter pair. */
export const DEFAULT_MAX_CHUNK_CHARS = 5000;

/** A line shorter than this is never treated as a running head. */
const MIN_HEAD_CHARS = 8;

/**
 * A running head is a short label, never prose. `MAX_HEAD_CHARS` is what keeps
 * a page's first body line — which repeats across a book only when the book is
 * a scan of the same page — out of the furniture list.
 */
const MAX_HEAD_CHARS = 60;

export interface BookRecord {
  /** "class-11" | "class-12" | "unknown" — the corpus' own vocabulary. */
  class: string;
  subject: string;
  /** Chapter title WITHOUT the "(part n)" suffix — retrieval keys on this. */
  unit: string;
  /** Chapter title WITH the suffix, so the tutor can tell the parts apart. */
  title: string;
  /**
   * Provenance. A META key in the corpus (`source`), so this is never injected
   * as knowledge — it exists for the logs, the stats and the human reader.
   */
  source: string;
  /** The knowledge itself: one entry per paragraph. Injected verbatim. */
  textbookText: string[];
}

export interface ParsedBook {
  bookTitle: string;
  subject: string;
  classLevel: string;
  sourceFile: string;
  pages: string[];
}

export interface ScanReport {
  pages: number;
  /** Pages with no extractable text: photographed pages needing OCR. */
  textlessPages: number;
  chars: number;
  /** 0–1 share of pages that carry no text. */
  textlessRatio: number;
}

// ── pages ───────────────────────────────────────────────────────────────────

/** pdftotext separates pages with a form feed. */
export function splitPdfPages(raw: string): string[] {
  return String(raw ?? "")
    .split("\f")
    .map((page) => page.replace(/\r\n?/g, "\n"));
}

export function scanReport(pages: string[]): ScanReport {
  const textless = pages.filter((page) => page.replace(/\s/g, "").length < 20).length;
  const chars = pages.reduce((sum, page) => sum + page.replace(/\s/g, "").length, 0);
  return {
    pages: pages.length,
    textlessPages: textless,
    chars,
    textlessRatio: pages.length ? textless / pages.length : 0,
  };
}

// ── cleaning ────────────────────────────────────────────────────────────────

const PAGE_NUMBER_RE =
  /^(?:[-–—([{|]*\s*)?(?:page\s*)?(?:\d{1,4}|[ivxlcdm]{1,7})(?:\s*[-–—)\]}|]*)?$/i;

/** A line that is only a URL, an email or a bare © notice is footer furniture. */
const FURNITURE_RE = /^(?:https?:\/\/\S+|www\.\S+|\S+@\S+\.\S+|©.*)$/i;

function normaliseLine(line: string): string {
  return line.replace(/\s+/g, " ").trim();
}

/**
 * The lines that sit at the top or bottom of most pages of this book: a running
 * head ("Physics Grade 12", "Chapter 3 • Motion"), a footer, a watermark. Found
 * by position (first/last three non-empty lines) AND frequency (at least half
 * the pages), because either test alone misfires — a phrase repeated in the
 * body is not a head, and a genre of line that appears once is not furniture.
 */
export function findRunningHeads(pages: string[], minPages = 4): Set<string> {
  const counts = new Map<string, number>();
  const signif = pages.filter((page) => page.replace(/\s/g, "").length >= 20);
  if (signif.length < minPages) return new Set();

  for (const page of signif) {
    const lines = page.split("\n").map(normaliseLine).filter(Boolean);
    // Top two and bottom two lines: where a head, a footer or a watermark sits.
    // Widening this window starts eating body text on pages that open with a
    // heading, which is exactly how a book loses its first paragraph.
    const edges = [...lines.slice(0, 2), ...lines.slice(-2)];
    for (const line of new Set(edges)) {
      if (line.length < MIN_HEAD_CHARS || line.length > MAX_HEAD_CHARS) continue;
      if (PAGE_NUMBER_RE.test(line)) continue;
      // Furniture is a LABEL: a running head, a footer, a URL, a copyright
      // line. None of them ends a sentence, so a period (or a comma) is the
      // signal that this line is prose sitting at the bottom of a short page.
      if (/[.,;:]$/.test(line)) continue;
      if (/\.\s+\S/.test(line)) continue;
      counts.set(line, (counts.get(line) ?? 0) + 1);
    }
  }

  const threshold = Math.max(3, Math.ceil(signif.length / 2));
  const heads = new Set<string>();
  for (const [line, count] of counts) {
    if (count >= threshold) heads.add(line);
  }
  return heads;
}

/** True when the line ends with terminal punctuation — the sentence is complete. */
function endsSentence(line: string): boolean {
  return /[.!?:"'”’)\]}\]]$/.test(line);
}

/** A bullet, a numbered item or a list letter — starts its own paragraph. */
const LIST_START_RE = /^(?:[-•*·▪–—]\s+|\d{1,2}[.)]\s+|[a-h][.)]\s+)/;

/** `\d.\s+Text` / `(a)\s+Text` inside a figure caption or table row. */
function isStandaloneHeading(line: string): boolean {
  return line.length <= 70 && line === line.toUpperCase() && /[A-Z]{3}/.test(line);
}

/**
 * One page of visual lines → the paragraph prose a teacher would type.
 *
 * Rules, in order: drop furniture (running heads, page numbers, bare URLs),
 * repair hyphenated wraps, then re-join the remaining lines into paragraphs —
 * a new paragraph begins at a blank line, after a sentence-ending line that the
 * next line clearly starts again, or at a bullet/number/heading.
 */
export function cleanPage(page: string, runningHeads: Set<string> = new Set()): string {
  const rawLines = page
    .split("\n")
    .map(normaliseLine)
    .filter((line) => {
      if (!line) return true; // keep blank lines: they mark paragraph breaks
      if (runningHeads.has(line)) return false;
      if (FURNITURE_RE.test(line)) return false;
      // A bare number is a page number only when it sits alone on the line.
      if (PAGE_NUMBER_RE.test(line)) return false;
      return true;
    });

  const paragraphs: string[] = [];
  let buffer = "";

  const flush = () => {
    if (buffer.trim()) paragraphs.push(buffer.trim());
    buffer = "";
  };

  for (let i = 0; i < rawLines.length; i += 1) {
    const line = rawLines[i];

    if (!line) {
      flush();
      continue;
    }
    // Heading lines are their own paragraph, whatever came before.
    if (isStandaloneHeading(line) || LIST_START_RE.test(line)) {
      flush();
      paragraphs.push(line);
      continue;
    }
    if (!buffer) {
      buffer = line;
      continue;
    }
    // The previous line ended a sentence and this one starts a new one.
    if (endsSentence(buffer) && /^[A-Z(“"']/.test(line) && buffer.length > 40) {
      flush();
      buffer = line;
      continue;
    }
    // Otherwise the line wrapped: join it, healing a hyphenated split word.
    buffer = /[A-Za-z]-$/.test(buffer) && /^[a-z]/.test(line)
      ? `${buffer.slice(0, -1)}${line}`
      : `${buffer} ${line}`;
  }
  flush();

  return paragraphs.join("\n\n");
}

// ── chapters ────────────────────────────────────────────────────────────────

/** "Chapter 3 · Motion in a Straight Line", "UNIT 4", "3. Matrices", "अध्याय २". */
const CHAPTER_PATTERNS: Array<{ re: RegExp; titleGroup: number }> = [
  {
    re: /^(?:chapter|unit|lesson|module|part|अध्याय|पाठ|एकाइ)\s*[-–:.]?\s*(?:\d{1,2}|[ivxlcdm]{1,6})\b\s*[-–:.]?\s*(.{0,70})$/i,
    titleGroup: 1,
  },
  { re: /^(\d{1,2})[.)]\s+([A-Z][^\n]{3,70})$/, titleGroup: 2 },
  { re: /^([A-Z][A-Za-z ,'&-]{6,70})$/, titleGroup: 1 },
];

export interface Chapter {
  title: string;
  startPage: number;
  endPage: number;
  text: string;
}

/** The heading at the top of a page, if the page opens a chapter. */
export function chapterHeading(page: string): string | null {
  const lines = page.split("\n").map(normaliseLine).filter(Boolean).slice(0, 4);
  for (const line of lines) {
    for (const { re, titleGroup } of CHAPTER_PATTERNS) {
      const match = re.exec(line);
      if (!match) continue;
      const title = (match[titleGroup] ?? "").replace(/[.:;\s]+$/, "").trim();
      // "Chapter 3" with no title, or a numbered list item misread as a heading,
      // is worse than no chapter at all.
      if (!title || title.length < 3) continue;
      if (/^(?:the|a|an|of|and|in|on|to)$/i.test(title)) continue;
      // The matched line already contains the title. Splitting on a separator
      // only makes sense when one was there ("Chapter 3. Motion" → "Chapter 3"
      // + "Motion"); with "Chapter 3  Motion" the split returns the whole line
      // and re-appending the title would store every chapter twice — in the
      // record title AND in its filename slug.
      const raw = match[0];
      const head = raw.split(/[.:]/)[0].trim();
      const heading = head === raw.trim() ? normaliseLine(raw) : normaliseLine(`${head} ${title}`);
      if (heading.length > 90) return heading.slice(0, 90).trim();
      return heading;
    }
  }
  return null;
}

/**
 * Group cleaned pages into chapters. A book whose headings cannot be found is
 * NOT left as one giant record — it is split into fixed windows, so every part
 * still fits in a prompt.
 */
export function detectChapters(pages: string[], bookTitle: string, windowPages = 8): Chapter[] {
  const cleaned = pages.map((page) => cleanPage(page));
  const found: Array<{ title: string; start: number }> = [];

  cleaned.forEach((text, index) => {
    if (text.replace(/\s/g, "").length < 120) return; // a cover or a blank page
    const heading = chapterHeading(pages[index]);
    if (!heading) return;
    if (found.length && found[found.length - 1].title === heading) return;
    found.push({ title: heading, start: index });
  });

  if (found.length < 2) {
    const chapters: Chapter[] = [];
    for (let start = 0; start < cleaned.length; start += windowPages) {
      const end = Math.min(start + windowPages, cleaned.length) - 1;
      const text = cleaned.slice(start, end + 1).filter(Boolean).join("\n\n");
      if (text.replace(/\s/g, "").length < MIN_CHUNK_CHARS) continue;
      chapters.push({
        title: `${bookTitle} — pages ${start + 1}–${end + 1}`,
        startPage: start,
        endPage: end,
        text,
      });
    }
    return chapters;
  }

  return found
    .map((entry, index) => {
      const end = (index + 1 < found.length ? found[index + 1].start : cleaned.length) - 1;
      return {
        title: entry.title,
        startPage: entry.start,
        endPage: Math.max(entry.start, end),
        text: cleaned.slice(entry.start, end + 1).filter(Boolean).join("\n\n"),
      };
    })
    .filter((chapter) => chapter.text.replace(/\s/g, "").length >= MIN_CHUNK_CHARS);
}

// ── chunking ────────────────────────────────────────────────────────────────

/**
 * Split a chapter into records that each fit in one prompt. Paragraphs are
 * never cut in half; a single paragraph larger than the ceiling is split on
 * sentence boundaries. A trailing fragment below `MIN_CHUNK_CHARS` is merged
 * back into its predecessor — a 90-character tail would be marked filler and
 * its last paragraph silently lost.
 */
export function chunkChapter(text: string, maxChars = DEFAULT_MAX_CHUNK_CHARS): string[] {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => normaliseLine(p))
    .filter((p) => p.length > 0);
  if (!paragraphs.length) return [];

  const chunks: string[] = [];
  let current: string[] = [];
  let size = 0;

  const push = () => {
    if (current.length) chunks.push(current.join("\n\n"));
    current = [];
    size = 0;
  };

  for (const paragraph of paragraphs) {
    if (paragraph.length > maxChars) {
      push();
      for (let at = 0; at < paragraph.length; at += maxChars) {
        let slice = paragraph.slice(at, at + maxChars);
        if (at + maxChars < paragraph.length) {
          const lastStop = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("? "), slice.lastIndexOf("! "));
          if (lastStop > maxChars * 0.5) slice = slice.slice(0, lastStop + 1);
        }
        chunks.push(slice.trim());
      }
      continue;
    }
    if (size + paragraph.length + 2 > maxChars && current.length) push();
    current.push(paragraph);
    size += paragraph.length + 2;
  }
  push();

  // Merge a too-short tail back into its predecessor rather than losing it.
  const merged: string[] = [];
  for (const chunk of chunks) {
    const previous = merged[merged.length - 1];
    if (previous && chunk.replace(/\s/g, "").length < MIN_CHUNK_CHARS) {
      merged[merged.length - 1] = `${previous}\n\n${chunk}`;
    } else {
      merged.push(chunk);
    }
  }
  return merged.map((chunk) => chunk.trim()).filter(Boolean);
}

// ── records ─────────────────────────────────────────────────────────────────

export function slugify(value: string, maxLength = 70): string {
  const slug = String(value ?? "")
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-");
  return (slug || "record").slice(0, maxLength).replace(/-+$/, "");
}

/**
 * One PDF → the records that will be dropped into `backend/kb/`.
 *
 * `textbookText` is the section key on purpose: the corpus humanises it to
 * "Textbook text" and injects every paragraph VERBATIM, which is what the
 * answer contract turns into polished prose with the full concept intact.
 * `class`/`subject`/`unit`/`title` are indexing keys; `source` is a META key, so
 * the provenance is recorded without being taught as knowledge.
 */
export function buildBookRecords(book: ParsedBook, maxChars = DEFAULT_MAX_CHUNK_CHARS): BookRecord[] {
  return recordsFromChapters(detectChapters(book.pages, book.bookTitle), book, maxChars);
}

/** The file-level facts every record of one book carries. */
export interface BookMeta {
  /** "class-11" | "class-12" | "unknown" — the corpus' own vocabulary. */
  classLevel: string;
  subject: string;
  bookTitle: string;
  sourceFile: string;
}

/**
 * Chapters → records, shared by all three readers (`.pdf` finds its chapters
 * from layout, `.md` from `#` headings, `.docx` from paragraph windows).
 *
 * The chunking and provenance rules are format-independent, so they live here
 * once — a reader that had to re-implement them would drift on the part that
 * decides whether a book's text actually survives into a record.
 */
export function recordsFromChapters(chapters: Chapter[], book: BookMeta, maxChars = DEFAULT_MAX_CHUNK_CHARS): BookRecord[] {
  const records: BookRecord[] = [];

  for (const chapter of chapters) {
    const chunks = chunkChapter(chapter.text, maxChars);
    chunks.forEach((chunk, index) => {
      const paragraphs = chunk
        .split(/\n{2,}/)
        .map((p) => normaliseLine(p))
        .filter((p) => p.length >= 2);
      if (paragraphs.join(" ").replace(/\s/g, "").length < MIN_CHUNK_CHARS) return;

      const part = chunks.length > 1 ? ` (part ${index + 1})` : "";
      // A windowed chapter ("Book — pages 1–8") already names the book, so the
      // provenance line must not repeat it twice.
      const provenance = chapter.title.startsWith(book.bookTitle)
        ? chapter.title
        : `${book.bookTitle} — ${chapter.title}`;
      const range = `pages ${chapter.startPage + 1}-${chapter.endPage + 1}`;
      records.push({
        class: book.classLevel,
        subject: book.subject,
        unit: chapter.title,
        title: `${chapter.title}${part}`,
        source: `${/pages\s/i.test(provenance) ? provenance : `${provenance}, ${range}`} [${book.sourceFile}]`,
        textbookText: paragraphs,
      });
    });
  }
  return records;
}

/**
 * Relative output path for a record: `<subject>/<slug>-<n>.json`.
 *
 * The TITLE alone names the file. It already carries the chapter and its
 * `(part n)` suffix, so `unit` — which is the same chapter without that
 * suffix — adds nothing but repetition: joining the two produced names like
 * `1-cocci-sing-coccus-1-cocci-sing-coccus-part-1-78.json` on every chunked
 * chapter, which is most of them.
 *
 * The counter is appended AFTER slug truncation. Inside the slug it was cut
 * off by long chapter titles, so two parts of one chapter produced one name
 * and the second silently overwrote the first.
 */
export function recordFileName(record: BookRecord, index: number): string {
  const base = slugify(record.title || record.unit, 60);
  return `${slugify(record.subject)}/${base || "record"}-${index + 1}.json`;
}

// ── markdown ────────────────────────────────────────────────────────────────

/**
 * Markdown is the OPPOSITE of pdftotext output: it is already prose, already
 * paragraphed, and its formatting is meaningful. So the PDF pipeline is
 * deliberately NOT run over it — `cleanPage` would treat a `---` slide
 * separator as a blank line, strip `#` headings as furniture, and re-flow a
 * bullet list into one paragraph. Every one of those would destroy the very
 * structure the file was optimised for.
 *
 * Setext underlines (`===` / `---`) are NOT headings here. In an exported slide
 * deck `---` separates slides, and reading each of those as a chapter would cut
 * a 40-slide deck into 40 records of one paragraph each.
 */
const ATX_HEADING_RE = /^(#{1,6})\s+(.+?)\s*#*\s*$/;

export interface MarkdownSection {
  /** Heading text with the `#` marks removed; `"Untitled"` before any heading. */
  title: string;
  /** Heading depth, 1–6 — used only to tell a chapter from a sub-heading. */
  level: number;
  /** The section body, VERBATIM. */
  text: string;
}

/** Split a markdown document into one entry per ATX heading. */
export function splitMarkdownSections(markdown: string): MarkdownSection[] {
  const lines = String(markdown ?? "").replace(/\r\n?/g, "\n").split("\n");
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection = { title: "Untitled", level: 0, text: "" };
  const buffer: string[] = [];

  const flush = () => {
    const text = buffer.join("\n").trim();
    if (current.title !== "Untitled" || text) sections.push({ ...current, text });
    buffer.length = 0;
  };

  for (const line of lines) {
    const match = ATX_HEADING_RE.exec(line);
    if (!match) {
      buffer.push(line);
      continue;
    }
    flush();
    current = { title: match[2].trim() || "Untitled", level: match[1].length, text: "" };
  }
  flush();
  return sections.filter((s) => s.title !== "Untitled" || s.text);
}

/**
 * Markdown → chapters, one per heading, body untouched.
 *
 * A document with fewer than two headings has no structure to follow, so it is
 * windowed by paragraphs exactly like a PDF whose headings could not be found —
 * a 40k-char single-section `.md` must not become one 40k record either.
 *
 * `startPage` / `endPage` carry the SECTION INDEX (not a PDF page) because the
 * caller only uses them for the `pages N-M` provenance line.
 */
export function markdownChapters(markdown: string, bookTitle: string, windowChars = DEFAULT_MAX_CHUNK_CHARS): Chapter[] {
  const sections = splitMarkdownSections(markdown);
  const headed = sections.filter((s) => s.level > 0);

  // Under two headings there is no structure to follow, so the document is
  // windowed by paragraphs exactly like a PDF whose headings could not be
  // found — a 40k-char single-section `.md` must not become one 40k record.
  if (headed.length < 2) {
    const text = sections.map((s) => s.text).join("\n\n").trim();
    return windowedChapters(text, bookTitle, windowChars);
  }

  const chapters: Chapter[] = [];
  // Text before the first heading rides along with the first chapter rather
  // than being dropped — it is usually the introduction.
  let carry = sections.filter((s) => s.level === 0).map((s) => s.text).join("\n\n").trim();
  let carryTitle = "";
  let index = 0;

  // NO size test before the fold: a 300-char `##` section is a sub-heading,
  // and rejecting it up front would throw away the prose it is about to be
  // merged into. Only the finished chapter is measured.
  for (const section of headed) {
    const body = carry ? `${carry}\n\n${section.text}` : section.text;
    if (body.replace(/\s/g, "").length < MIN_CHUNK_CHARS) {
      carry = body;
      carryTitle = carryTitle || section.title;
      continue;
    }
    chapters.push({
      title: carryTitle ? `${carryTitle} — ${section.title}` : section.title,
      startPage: index,
      endPage: index,
      text: body,
    });
    index += 1;
    carry = "";
    carryTitle = "";
  }
  if (carry.replace(/\s/g, "").length >= MIN_CHUNK_CHARS) {
    chapters.push({ title: carryTitle || bookTitle, startPage: index, endPage: index, text: carry });
  }
  return chapters;
}

/** Fixed-size paragraph windows for a text with no headings of its own. */
export function windowedChapters(text: string, bookTitle: string, windowChars = DEFAULT_MAX_CHUNK_CHARS): Chapter[] {
  const paragraphs = String(text ?? "")
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const chapters: Chapter[] = [];
  let current: string[] = [];
  let size = 0;
  let index = 0;

  const push = () => {
    if (!current.length) return;
    const body = current.join("\n\n");
    if (body.replace(/\s/g, "").length >= MIN_CHUNK_CHARS) {
      chapters.push({
        title: `${bookTitle} — part ${chapters.length + 1}`,
        startPage: index,
        endPage: index,
        text: body,
      });
    }
    index += 1;
    current = [];
    size = 0;
  };

  for (const paragraph of paragraphs) {
    if (size + paragraph.length + 2 > windowChars) push();
    current.push(paragraph);
    size += paragraph.length + 2;
  }
  push();
  return chapters;
}

// ── docx ────────────────────────────────────────────────────────────────────

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

/**
 * Decode XML entities. Numeric forms are decoded FIRST and `&amp;` LAST, so
 * `&amp;#39;` becomes `&#39;` and not `'` — the escaped form must survive
 * until the ampersand it belongs to has been resolved.
 */
export function decodeXmlEntities(value: string): string {
  return String(value ?? "")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => codePointToChar(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => codePointToChar(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (entity, name) => NAMED_ENTITIES[name.toLowerCase()] ?? entity)
    .replace(/&amp;/g, "&");
}

function codePointToChar(code: number): string {
  if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return "";
  try {
    return String.fromCodePoint(code);
  } catch {
    return "";
  }
}

/**
 * `word/document.xml` → the paragraphs it holds.
 *
 * The replacements run BEFORE the generic tag strip, in the order the markup
 * nests: a cell separator becomes a space (table cells are not paragraphs), a
 * paragraph close becomes a blank line (the paragraph break the PDF pipeline
 * has to guess at is explicit here), and a tab or line break inside a run
 * becomes whitespace rather than being fused into the middle of a word.
 *
 * Text inside `<w:t>` survives because it is text, not a tag; anything the
 * strip removes carried no visible characters to begin with.
 */
export function docxXmlToText(xml: string): string {
  const text = String(xml ?? "")
    .replace(/<w:tab\b[^>]*\/>/g, " ")
    .replace(/<w:(?:br|cr)\b[^>]*\/>/g, "\n")
    // A cell's own paragraph must NOT become a document paragraph: the table
    // is one structure, so the cell ends as a space and the ROW ends the line.
    .replace(/<\/w:p>(?=\s*<\/w:tc>)/g, "")
    .replace(/<\/w:tc>/g, " ")
    .replace(/<\/w:tr>/g, "\n\n")
    .replace(/<\/w:p>/g, "\n\n")
    .replace(/<[^>]+>/g, "");

  return decodeXmlEntities(text)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * A `.docx` has no pages — Word computes them at render time, and the file
 * stores none. So the text is grouped into fixed paragraph windows that behave
 * like pages for `detectChapters`, which reads the first four lines of each
 * one looking for a chapter heading.
 */
export function paragraphsToPages(text: string, paragraphsPerPage = 12): string[] {
  const paragraphs = String(text ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (!paragraphs.length) return [];

  const pages: string[] = [];
  for (let at = 0; at < paragraphs.length; at += paragraphsPerPage) {
    pages.push(paragraphs.slice(at, at + paragraphsPerPage).join("\n\n"));
  }
  return pages;
}

