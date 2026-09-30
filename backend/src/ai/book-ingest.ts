/**
 * BOOK INGEST — a local PDF becomes a first-class platform source.
 *
 * Owner request (2026-09-30): "I have many books PDF locally, which I want to
 * make it as a source, and whenever I ask a question related to them, it should
 * scan and present all those in polished, refined and short grammar with the
 * full concept."
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
      return normaliseLine(`${match[0].split(/[.:]/)[0].trim()} ${title}`.slice(0, 90));
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
  const chapters = detectChapters(book.pages, book.bookTitle);
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
 * Relative output path for a record: `books/<subject>/<slug>-<n>.json`.
 * The counter is appended AFTER slug truncation — inside the slug it was cut
 * off by long chapter titles, so two parts of one chapter produced one name and
 * the second silently overwrote the first.
 */
export function recordFileName(record: BookRecord, index: number): string {
  // Where a chunk has no part suffix the two are identical; slug it once, or
  // the same long title fills the whole filename twice over.
  const base = slugify(record.unit === record.title ? record.title : `${record.unit}-${record.title}`, 60);
  return `${slugify(record.subject)}/${base || "record"}-${index + 1}.json`;
}
