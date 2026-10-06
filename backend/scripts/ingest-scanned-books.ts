/**
 * INGEST OCR'd (scanned) BOOKS → `backend/kb/books/**`.
 *
 * The sibling of `ingest-books.ts`, for books that have no text layer.
 *
 *   python scripts/ocr-scanned-books.py --pdf "…Old is Gold Physics.pdf" --subject physics
 *   npx tsx scripts/ingest-scanned-books.ts --ocr backend/kb-ocr/physics-…/….ocr.txt --subject physics --class 11
 *
 * WHY THIS IS A SECOND SCRIPT RATHER THAN A FLAG ON THE FIRST
 * -----------------------------------------------------------
 * `ingest-books.ts` gets its pages from `pdftotext` and hands them straight to
 * `detectChapters`. That works for a born-digital PDF and cannot work for a
 * scan: a photographed page has no text layer, so `pdftotext` returns the page
 * watermark and nothing else, and `book-ingest.ts` reports those pages rather
 * than ingesting them (see its `scanReport` note).
 *
 * The OCR step (`scripts/ocr-scanned-books.py`) produces the text `pdftotext`
 * would have. This script picks up from there and reuses the SAME downstream
 * code — `cleanPage`, `findRunningHeads`, `detectChapters`, `chunkChapter`,
 * `recordsFromChapters` — so an OCR'd book and a digital book produce records of
 * exactly the same shape, read by exactly the same corpus.
 *
 * WHY RUNNING HEADS ARE WIRED IN HERE (AND NOT IN `detectChapters`)
 * -----------------------------------------------------------------
 * `book-ingest.ts` exports `findRunningHeads`, but `detectChapters` calls
 * `cleanPage(page)` with the default empty head set, so in the digital-PDF path
 * a running head is never actually stripped. That is survivable for a textbook,
 * whose running head is a chapter title that merely repeats.
 *
 * It is NOT survivable for these scans. Their running heads are the imprint
 * ("A COMPLETE NEB SOLUTION TO PHYSICS") — all-caps letters and spaces, which is
 * precisely what `CHAPTER_PATTERNS`' uppercase fallback
 * (`/^([A-Z][A-Za-z ,'&-]{6,70})$/`) matches. Left in, the imprint would be
 * detected as a chapter on page after page and the book would shatter into
 * junk units. So the pages are cleaned WITH the measured head set BEFORE
 * chapter detection runs, which is the order `findRunningHeads` was written for.
 *
 * OUTPUT
 * ------
 *   backend/kb/books/<subject>/<chapter>-<n>.json   the tutor's source (verbatim)
 *   <out>/<subject>.chapters.json                   the chapter map (page ranges)
 *
 * The chapter map is not read by the platform. It exists because the mapping
 * from a book's own chapter to a syllabus unit is a HUMAN decision that has to
 * be checkable — and because it is the input the PYQ/rail emitters need.
 */
import fs from "node:fs";
import path from "node:path";

import {
  DEFAULT_MAX_CHUNK_CHARS,
  cleanPage,
  detectChapters,
  findRunningHeads,
  recordFileName,
  recordsFromChapters,
  scanReport,
  splitPdfPages,
  type BookMeta,
  type BookRecord,
  type Chapter,
} from "../src/ai/book-ingest";

interface Options {
  ocr: string | string[];
  out: string;
  chaptersOut: string;
  subject: string;
  classLevel: string;
  bookTitle?: string;
  windowPages: number;
  maxChars: number;
  minPages: number;
  dryRun: boolean;
  force: boolean;
  quiet: boolean;
}

// ── args ────────────────────────────────────────────────────────────────────

function parseArgs(argv: string[]): Options {
  const flags = new Map<string, string | boolean>();
  const repeated = new Map<string, string[]>();
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const [, rawKey, inlineValue] = /^--([^=]+)(?:=(.*))?$/.exec(arg) ?? [];
    const key = String(rawKey ?? "");
    const value =
      inlineValue !== undefined
        ? inlineValue
        : argv[i + 1] && !argv[i + 1].startsWith("--")
          ? argv[++i]
          : true;
    if (key === "ocr" && typeof value === "string") {
      repeated.set(key, [...(repeated.get(key) ?? []), value]);
    }
    flags.set(key, value);
  }

  const usage = [
    "Usage: npx tsx scripts/ingest-scanned-books.ts --ocr <file.ocr.txt> --subject <slug> --class <11|12>",
    "",
    "  --ocr <path>        OCR'd text (repeatable; pages separated by \\f)",
    "  --subject <slug>    physics | chemistry | mathematics | …  (required)",
    "  --class <11|12>     class level (required)",
    "  --title <name>      book title for record provenance",
    "  --out <path>        record output folder (default: kb/books)",
    "  --chapters <path>   chapter-map output folder (default: kb-ocr)",
    "  --window <n>        pages per record when no chapter headings exist (default: 8)",
    "  --max-chars <n>     per-record ceiling (default: " + DEFAULT_MAX_CHUNK_CHARS + ")",
    "  --min-pages <n>     pages for a line to count as a running head (default: 4)",
    "  --dry-run           report what would be written, write nothing",
    "  --force             overwrite records that already exist",
    "  --quiet             only the summary",
    "",
    'Example: npx tsx scripts/ingest-scanned-books.ts --ocr kb-ocr/physics-…/….ocr.txt --subject physics --class 11',
  ].join("\n");

  const ocr = repeated.get("ocr") ?? (typeof flags.get("ocr") === "string" ? [String(flags.get("ocr"))] : []);
  const subject = flags.get("subject");
  const classLevel = flags.get("class");
  if (!ocr.length || typeof subject !== "string" || typeof classLevel !== "string") {
    console.error(usage);
    process.exit(1);
  }

  return {
    ocr,
    out: String(flags.get("out") ?? path.join("kb", "books")),
    chaptersOut: String(flags.get("chapters") ?? "kb-ocr"),
    subject,
    classLevel,
    bookTitle: typeof flags.get("title") === "string" ? String(flags.get("title")) : undefined,
    windowPages: Number(flags.get("window") ?? 8) || 8,
    maxChars: Number(flags.get("max-chars") ?? DEFAULT_MAX_CHUNK_CHARS) || DEFAULT_MAX_CHUNK_CHARS,
    minPages: Number(flags.get("min-pages") ?? 4) || 4,
    dryRun: flags.has("dry-run"),
    force: flags.has("force"),
    quiet: flags.has("quiet"),
  };
}

// ── one book ────────────────────────────────────────────────────────────────

interface ChapterRow {
  title: string;
  /** 1-based PDF page range, as a reader sees it. */
  startPage: number;
  endPage: number;
  chars: number;
}

// ── furniture + headings ────────────────────────────────────────────────────

/**
 * Page furniture that VARIES page to page, so `findRunningHeads` cannot see it.
 *
 * `findRunningHeads` works by exact-string frequency, which is the right test
 * for a textbook whose every page says the same thing. These scans fail it: the
 * imprint carries the printed page number and the OCR mangles it differently
 * each time — measured across one book: "A COMPLETE NEB SOLUTION TO PHYSICS",
 * "16 / A COMPLETE NEB SOLUTION TO PHYSICS", "74 1 A COMPLETE NEB SOLUTION TO P",
 * "IO / A COMPLETE NEB SOLUTION TO PHYSIC", "4 t A COMPLETE N". Five spellings,
 * no single one reaching the frequency threshold, so `findRunningHeads` returns
 * an empty set and every imprint line survives into the records.
 *
 * A pattern is the right tool: these are the SAME line with different damage.
 * `O`/`0` and `I`/`1` are folded because that is what the OCR actually confuses.
 */
const FURNITURE_PATTERNS: RegExp[] = [
  // The imprint, with or without a leading printed page number, truncated or not.
  /^(?:\d{1,3}\s*[/|1l]\s*)?A\s*C[O0]MPLETE\s*\b.*$/i,
  /^(?:\d{1,3}\s*[/|1l]\s*)?[A-Z]{0,3}\/?\s*A\s*S[O0]MPLETE\b.*$/i,
  /^(?:\d{1,3}\s*[/|1l]\s*)?A\s*C[O0]MPLET.*$/i,
  // The section running head.
  /^M[O0]DEL\s+QUESTI[O0]NS?\s*[-–—]?\s*S[O0]LUTI[O0]N.*$/i,
  // A bare printed page number, optionally with a stray symbol.
  /^[\s'"~.,:;-]*\d{1,3}[\s'"~.,:;-]*$/,
  /^[oO0\s]{1,3}$/,
  // Watermark.
  /^puspas\.com\.np$/i,
  /^www\.\S+$/i,
];

function isFurniture(line: string): boolean {
  const t = line.trim();
  if (!t) return true;
  if (PAGE_NUMBER_ONLY.test(t)) return true;
  return FURNITURE_PATTERNS.some((re) => re.test(t));
}

const PAGE_NUMBER_ONLY = /^(?:page\s*)?\d{1,4}$/i;

/**
 * A page that is the book's own table of contents.
 *
 * The ToC is the one page that names EVERY chapter, so a line-anchored heading
 * scan finds more openers on it than on any body page — and every one of them
 * is a lie about where a chapter starts. Left in, it corrupts segmentation in
 * two measured ways. Its rows consume the per-page heading budget and become
 * chapters of their own ("Vectors", "Kinematics" and "Laws of Motion" all
 * landed on the ToC page; the one whose page range came out long enough to
 * clear the size floor was then handed the front matter). And its `UNIT n:`
 * rows sit on this page and nowhere else, so they collapse to a single unit
 * that then labels every record in the book.
 *
 * The ToC is therefore excluded from BOUNDARY detection — but still read: its
 * lines are the spelling vocabulary `snapTitle` repairs OCR damage against.
 */
/**
 * `Table of Contents`, `Contents` — and the middle word is not required to be
 * spelled correctly. `of` is two letters of word-shaped nothing, which is
 * exactly what the OCR makes of it: measured on the Mathematics scan, `fable of
 * Contents` came back as `fable cf Contents`. The heading is the ONE line that
 * tells this book's chapter names to the whole ingest — its vocabulary, its
 * openers and its head filter all hang off it — so a two-letter misread there
 * costs the book its segmentation entirely (measured: Mathematics lost its 10
 * chapters and fell back to 156 windows). Any two letter/digit token is
 * accepted in that slot; nothing else about the test is loosened.
 */
const TOC_HEADING = /^\s*(?:\S{0,10}\s+[a-z0-9]{2}\s+)?contents\s*$/i;

/** A title-less `Chapter 7:` row, which is the shape of a contents entry. */
const TOC_ROW = /^\s*chapter\s*\d{1,2}\s*[:.\-–—]?\s*$/i;

function isTocPage(page: string): boolean {
  const lines = page.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.some((line) => TOC_HEADING.test(line))) return true;
  return lines.filter((line) => TOC_ROW.test(line)).length >= 3;
}

/**
 * `UNIT 1: MECHANICS`, `UNIT Z: HEAT AND THERMODYNAMICS`, `UNIT-4: ELECTROSTATICS`.
 *
 * `Z` is accepted as a unit number because the OCR reads `2` as `Z` on this
 * book's unit opener — measured, and the alternative is losing a whole unit.
 */
const UNIT_HEADING = /^\s*(?:UNIT|UNIT\s*[-–:])\s*([0-9IZⅧ]{1,2}|[IVX]{1,3})\s*[:.\-–—]?\s*(.*)$/i;

/** `Chapter 1: Physical Quantities`, `Chapters 5 Work and Energy`, `Chapter 12:` */
const CHAPTER_HEADING = /^\s*CHAPTERS?\s*([0-9]{1,2})\s*[:.\-–—]?\s*(.*)$/i;

/** A heading's title must look like a title, not like a question or a sentence. */
function looksLikeTitle(value: string): boolean {
  const t = value.replace(/[-_—.·]{2,}/g, " ").trim();
  if (t.length < 3 || t.length > 60) return false;
  if (/\?$/.test(t)) return false;
  if (/^(?:short|long|very short|numerical|answer)\b/i.test(t)) return false;
  if (/\d{3,}/.test(t)) return false;
  return /[A-Za-z]{3}/.test(t);
}

interface Heading {
  kind: "unit" | "chapter";
  label: string;
  title: string;
  page: number;
}

/**
 * Every unit/chapter opener in page order, with a title pulled from the same
 * line or (when the opener is title-less, which the scans do a lot) the next
 * line that is neither furniture nor a question.
 */
function findHeadings(pages: string[], limitPerPage = 4): Heading[] {
  const found: Heading[] = [];
  pages.forEach((page, pageIndex) => {
    if (isTocPage(page)) return;
    const lines = page.split("\n");
    let taken = 0;
    for (let i = 0; i < lines.length && taken < limitPerPage; i += 1) {
      const line = lines[i];
      if (isFurniture(line)) continue;

      let kind: "unit" | "chapter" | null = null;
      let label = "";
      let rest = "";
      const unit = UNIT_HEADING.exec(line);
      const chapter = CHAPTER_HEADING.exec(line);
      if (unit && chapter) {
        // "Chapter" wins only if it starts first in the line.
        const pick = line.search(/chapter/i) >= 0 && line.search(/chapter/i) < line.search(/unit/i) ? "chapter" : "unit";
        if (pick === "unit") {
          kind = "unit";
          label = `UNIT ${unit[1].toUpperCase()}`;
          rest = unit[2];
        } else {
          kind = "chapter";
          label = `Chapter ${chapter[1]}`;
          rest = chapter[2];
        }
      } else if (unit) {
        kind = "unit";
        label = `UNIT ${unit[1].toUpperCase()}`;
        rest = unit[2];
      } else if (chapter) {
        kind = "chapter";
        label = `Chapter ${chapter[1]}`;
        rest = chapter[2];
      }
      if (!kind) continue;

      // A heading line must be SHORT — otherwise it is a sentence that happens
      // to open with the word "chapter" ("Chapter 3 explains …").
      if (line.trim().length > 46) continue;

      let title = rest.replace(/[\s:–—-]+$/, "").trim();
      if (!looksLikeTitle(title)) {
        title = "";
        for (let j = i + 1; j < Math.min(i + 4, lines.length); j += 1) {
          const next = lines[j].trim();
          if (isFurniture(next)) continue;
          if (looksLikeTitle(next)) title = next;
          break;
        }
      }
      if (!title) continue;

      found.push({ kind, label, title, page: pageIndex });
      taken += 1;
    }
  });
  return found;
}

// ── reading heads, and the names they spell ─────────────────────────────────

/**
 * The page's running head, as an all-caps line ending in the printed page
 * number: `PHYSICAL QUANTITIES 1 19`, `CIRCULAR MOTION 81`.
 *
 * This is the book's own statement of which chapter a page belongs to, and it
 * covers chapters whose decorative opener the OCR dropped outright. Measured on
 * the Physics scan, 49 of 186 pages carry one, and between them they name
 * VECTORS, LAWS OF MOTION, EQUILIBRIUM, ROTATIONAL DYNAMICS, PERIODIC MOTION,
 * THERMAL PROPERTIES OF MATTER, SECOND LAW OF THERMODYNAMICS and LENSES —
 * chapters no `Chapter n:` opener anywhere in the text mentions.
 *
 * The trailing printed page number is part of the test, and carries most of
 * its weight: without it every formula the OCR set in caps that happens to
 * begin a line is a candidate head, and measured on this scan MLT-2, P2, TIS-TO
 * and PIVI all became chapter names covering real chapters.
 *
 * The book PRINTS the head as `NAME / page` — a separator between the name and
 * the folio — and the scan renders that separator as `/` or `|`, either of
 * which the OCR keeps about half the time and drops the rest. Both spellings
 * are the same head, so both are accepted. On this scan that is what names
 * LAWS OF MOTION, ELASTICITY and SECOND LAW OF THERMODYNAMICS, none of which
 * exists in any other form.
 *
 * The separator is what keeps the relaxation honest, and it cannot be optional:
 * with the folio allowed to touch the name, the caps formulas that begin a line
 * qualify — `PIVI P2V2` is `PIVI P2V` + `2` — and since `runningHead` takes the
 * page's FIRST candidate, such a line shadows the real head printed further
 * down the spread. Measured on this scan, `PIVI P2V2` did exactly that on the
 * THERMAL PROPERTIES OF MATTER chapter's opening page and swallowed the chapter.
 * So the folio must be set off by whitespace or a `/`/`|`; that is the whole
 * test, and it is what rejects `PIVI P2V2` (no such separator) while accepting
 * `SECOND LAW OF THERMYDYNAMICS-/.1 265`, whose name carries the separator's
 * own damage and still ends on a clean folio.
 */
const RUNNING_HEAD = /^[A-Z][A-Z0-9 '&,.'\-/|]{4,50}(?:\s*[/|]\s*|\s+)\d{1,4}$/;

/** The same head with the OCR having dropped the folio and its separator. */
const RUNNING_HEAD_NO_FOLIO = /^[A-Z][A-Z0-9 '&,.'\-/|]{4,50}[\s/|]$/;

/**
 * The page's running head, or null when the page carries none.
 *
 * `vocabulary` is passed only when the book's contents page was read, and it
 * buys back the heads the OCR left the folio off (`EQUILIBRIUM / 107` arriving
 * as `EQUILIBRIUM/`). The folio is normally what separates a head from a caps
 * formula, so without one the line is only believed when the book's OWN list of
 * chapter names vouches for it — a stricter test than the folio, not a looser
 * one, which is why it is safe to apply in exactly this case.
 */
function runningHead(page: string, vocabulary?: Map<string, string>): string | null {
  // Never on the contents page: "MECHANICS" sits there on a line of its own,
  // and taken as a head it opens a chapter at the front of the book.
  if (isTocPage(page)) return null;
  for (const raw of page.split("\n")) {
    const line = raw.trim();
    if (!RUNNING_HEAD.test(line)) {
      if (!vocabulary || !RUNNING_HEAD_NO_FOLIO.test(line)) continue;
      const bare = line.replace(/[\s.'"|/,;:_\-–—]+$/, "").trim();
      if (bare.length < 4 || !/[A-Z]{3}/.test(bare) || isFurniture(bare)) continue;
      if (!matchVocabulary(titleKey(bare), vocabulary)) continue;
      return bare;
    }

    // Peel the printed page number off the end, repeatedly: the OCR writes it
    // as "9", "1 79" or "1 239" for the same head on different pages, and it
    // leaves the punctuation that separated it behind.
    let name = line;
    for (;;) {
      const next = name
        .replace(/[\s.'"|/,;:_\-–—]*\d{1,4}\s*$/, "")
        .replace(/[\s.'"|/,;:_\-–—]+$/, "")
        .trim();
      if (next === name) break;
      name = next;
    }

    // A formula the OCR set in caps is not a page name ("F 13600. V . 10"),
    // and the imprint is furniture, already known to vary page to page.
    if (name.length < 4 || !/[A-Z]{3}/.test(name)) continue;
    if (isFurniture(name)) continue;
    return name;
  }
  return null;
}

/** Normalised form two spellings of the same chapter name share. */
function titleKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Levenshtein distance, for telling a damaged name from a different one. */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const row = [i];
    for (let j = 1; j <= b.length; j += 1) {
      row[j] = Math.min(
        previous[j] + 1,
        row[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = row;
  }
  return previous[b.length];
}

/** 1 for identical, 0 for sharing nothing — distance as a proportion. */
function similarity(a: string, b: string): number {
  const longest = Math.max(a.length, b.length);
  return longest === 0 ? 1 : 1 - editDistance(a, b) / longest;
}

const SMALL_WORDS = new Set(["of", "and", "the", "at", "in", "on", "for", "to", "a", "an"]);
const isAllCaps = (value: string) => /[A-Z]/.test(value) && value === value.toUpperCase();

/** `TRANSFER OF HEAT` → `Transfer of Heat`: a running head is set in caps. */
function titleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) =>
      index > 0 && SMALL_WORDS.has(word) ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

/**
 * The book's own chapter names, for repairing OCR damage to them.
 *
 * Taken from the table of contents ALONE. It is the only page that lists every
 * chapter, and the only one typeset so that a name can be read off it whole.
 *
 * The running heads are deliberately NOT taken as spellings, tempting as it is
 * — that is where the damage lives. Fed in, they become entries in their own
 * right (measured: the vocabulary grew from 28 names to 39, gaining "Laws of
 * Motioni", "Thermal 'properties of Matteri", "Second Law of Thermydynamics"
 * and "Lenses T" alongside the correct spellings), and a damaged entry then
 * competes with the good one it should have been repaired TO.
 *
 * The ToC is read as a BAG of names, never as a sequence: the OCR interleaves
 * the two columns of a spread, so which chapter number a title belongs to
 * cannot be recovered from this scan reliably. Which SPELLING is canonical does
 * not depend on that, and that is all this is used for.
 */
function bookVocabulary(pages: string[]): { names: Map<string, string>; fromToc: boolean } {
  const vocabulary = new Map<string, string>();
  const add = (value: string) => {
    const title = value.replace(/^[\s.'"|,;:•·\-–—_]+|[\s.'"|,;:•·\-–—_]+$/g, "").trim();
    if (!looksLikeTitle(title)) return;
    if (TOC_HEADING.test(title) || UNIT_HEADING.test(title) || CHAPTER_HEADING.test(title)) return;
    const key = titleKey(title);
    if (key.length < 4) return;
    const existing = vocabulary.get(key);
    // Prefer a spelling the typesetter saw fit to capitalise: the ToC is title
    // case, the running heads are all caps, and the first source wins ties so
    // that one book cannot flip its own spellings back and forth.
    if (!existing || (isAllCaps(existing) && !isAllCaps(title))) vocabulary.set(key, title);
  };

  let fromToc = false;
  for (const page of pages) {
    if (!isTocPage(page)) continue;
    fromToc = true;
    for (const line of page.split("\n")) add(line);
  }
  return { names: vocabulary, fromToc };
}

/**
 * Replace a heading with the book's own spelling of it when the two are the
 * same name, and leave it alone when they are not.
 *
 * The OCR damages chapter names in a way a human reads straight through but a
 * retriever cannot: measured on these scans, "Circular Motion" came out as
 * "Circular Monon", "Transfer of Heat" as "Trans er of Heat", and "First Law
 * of Thermodynamics" as "FIRST LAW OF THERMYDYNAMICS". A chapter name is the
 * record's `unit` AND its `title` — the two fields lexical retrieval matches a
 * question against — so an unrepaired one silently removes the chapter from the
 * index it was just added to.
 *
 * The test is proportional, because a fixed budget is wrong at both ends: at
 * 0.78, "circulmonon"→"circularmotion" (0.79) and "transferofheat" →
 * "transferofheat" (1.00) both land, while two names that really are different
 * chapters of the same book ("reflectionatcurvedmirrors" vs
 * "refractionthroughprisms") stay far apart. A name that matches nothing in
 * the book's own vocabulary is kept exactly as it was printed.
 */
const SNAP_SIMILARITY = 0.78;

/** The book's own spelling of `key`, or null when the book never names it. */
function matchVocabulary(key: string, vocabulary: Map<string, string>): string | null {
  const exact = vocabulary.get(key);
  if (exact) return exact;
  if (key.length < 4) return null;

  let best: { title: string; score: number } | null = null;
  for (const [candidateKey, candidateTitle] of vocabulary) {
    if (Math.abs(candidateKey.length - key.length) > Math.max(4, key.length * 0.3)) continue;
    const score = similarity(key, candidateKey);
    if (score < SNAP_SIMILARITY) continue;
    if (!best || score > best.score) best = { title: candidateTitle, score };
  }
  return best?.title ?? null;
}

function snapTitle(title: string, vocabulary: Map<string, string>): string {
  const matched = matchVocabulary(titleKey(title), vocabulary);
  if (matched) return matched;
  return isAllCaps(title) ? titleCase(title) : title;
}

// ── chapter boundaries ──────────────────────────────────────────────────────

interface Boundary {
  page: number;
  title: string;
  /** True when the book printed `Chapter n: Title` at this page. */
  opener: boolean;
}

/**
 * Chapter starts announced by the page itself.
 *
 * The third place a book says where a chapter begins, and the one that carries
 * the two books the other two sources miss. Neither of those books prints a
 * `Chapter n:` opener or an all-caps running head:
 *
 *   · Mathematics prints `UNIT` alone and then the name, in caps, over the
 *     next line or two (`CURVE SKETCHING`, `SEQUENCE AND SERIES AND` +
 *     `MATHEMATICAL INDUCTION`).
 *   · Chemistry prints the name by itself as the page's first line of body text
 *     (`Chemical Arithmetic`, `Electronic Theory of Valency and Bonding`).
 *
 * Both are recoverable for one reason: the contents page already said what this
 * book's chapters are called. So a page opener is only believed when what it
 * spells matches one of those names — which is what keeps a page that merely
 * begins with a sentence from opening a chapter. Without a contents page there
 * is nothing to check against, `matchVocabulary` matches nothing, and this
 * source contributes nothing; the other two carry the book as before.
 */
const UNIT_MARKER = /^UNIT\s*[0-9OIZ.]*\s*$/i;
const CAPS_LINE = /^[A-Z0-9 ,'&.\-]+$/;

function titleOpeners(
  pages: string[],
  vocabulary: Map<string, string>,
  threshold = 0.9,
): Boundary[] {
  const found: Boundary[] = [];
  const claimed = new Set<string>();

  pages.forEach((page, index) => {
    if (isTocPage(page)) return;
    const lines = page
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !isFurniture(line));
    if (!lines.length) return;

    // The names this page could be opening with: whatever follows a `UNIT`
    // marker, accumulated line by line because a long name is set over two or
    // three of them.
    const candidates: string[] = [];
    if (UNIT_MARKER.test(lines[0])) {
      let joined = "";
      for (let i = 1; i < Math.min(lines.length, 4); i += 1) {
        const line = lines[i];
        if (line.length > 60 || !CAPS_LINE.test(line)) break;
        joined = joined ? `${joined} ${line}` : line;
        candidates.push(joined);
      }
    }
    // ...and, for a book that sets the name plainly, the opening line itself.
    if (lines[0].length <= 60) candidates.push(lines[0]);

    for (const candidate of candidates) {
      const key = titleKey(candidate);
      if (key.length < 4) continue;
      const matched = matchVocabulary(key, vocabulary);
      if (!matched || similarity(key, titleKey(matched)) < threshold) continue;
      const id = titleKey(matched);
      // A chapter opens once; the same name recurring further in is its own
      // running text, not a second chapter.
      if (claimed.has(id)) return;
      claimed.add(id);
      found.push({ page: index, title: matched, opener: true });
      return;
    }
  });
  return found;
}

/**
 * Chapter starts, merged from the book's three independent statements about
 * where a chapter begins.
 *
 * No one of them is complete alone. The `Chapter n:` opener is printed as
 * decorative display type, and on the Physics scan the OCR loses it outright
 * for 10 of the book's chapters; the running head survives and names seven
 * chapters no opener mentions; on the Mathematics and Chemistry scans neither
 * of those exists at all and only the page's own printed opener can be read.
 * Merged, they cover all three books.
 *
 * Where two disagree about a page the printed opener wins — it is the book's
 * own name for the chapter, whereas a running head on a transition spread names
 * whichever half of the spread the OCR read first (measured: `PLANE SURFACES`
 * for `Chapter 2: Refraction at Plane Surfaces`).
 */
/**
 * Rescue a `Chapter n:` opener whose TITLE the scan mangled.
 *
 * The label is trustworthy — the page really does say a chapter opens here —
 * but the display type it is set in is the decorative face the OCR drops
 * letters from: measured on the Physics scan, `Chapter 7: Gravitation` reaches
 * the text as `Chapter 7: ravuail`. That name matches nothing on the contents
 * page, so the boundary would otherwise be created under a name the book never
 * uses, splitting a real chapter in two.
 *
 * When the contents page WAS read it is the book's complete chapter list, which
 * makes the running head printed on this page the right name for the boundary —
 * or the head on the page after it, a scan page being a two-page spread.
 *
 * With no head to borrow the opener is kept as the scan spelled it: a
 * questionable name still beats dropping the page and handing the chapter's
 * text to the chapter before it.
 */
function repairOpeners(
  openers: Boundary[],
  heads: Boundary[],
  vocabulary: Map<string, string>,
  vocabularyIsAuthoritative: boolean,
): Boundary[] {
  if (!vocabularyIsAuthoritative) return openers;
  return openers.map((opener) => {
    if (matchVocabulary(titleKey(opener.title), vocabulary)) return opener;
    const head = heads.find((h) => h.page === opener.page || h.page === opener.page + 1);
    return head ? { ...opener, title: head.title } : opener;
  });
}

function chapterBoundaries(
  pages: string[],
  vocabulary: Map<string, string>,
  vocabularyIsAuthoritative: boolean,
): Boundary[] {
  // The heads are read FIRST because an opener whose printed name the scan
  // mangled borrows the head's spelling of it (`repairOpeners`), so the heads
  // have to exist before the openers are resolved.
  const heads: Boundary[] = [];
  let previous: string | null = null;
  pages.forEach((page, index) => {
    const head = runningHead(page, vocabularyIsAuthoritative ? vocabulary : undefined);
    if (!head) return; // a page with no head says nothing either way
    const key = titleKey(head);
    if (key === previous) return; // the same chapter, still running
    previous = key;

    // When the book's own contents page was read, it is the complete list of
    // this book's chapters — so a head that names nothing on it is not a
    // chapter, it is an OCR artefact of a formula or a table. Requiring the
    // match is what keeps `Mlt-2.l`, `Tis-to` and `Linit` out of the chapter
    // list; without a contents page there is nothing to check against and the
    // head has to be taken at its word.
    const matched = matchVocabulary(key, vocabulary);
    if (vocabularyIsAuthoritative && !matched) return;
    heads.push({ page: index, title: matched ?? snapTitle(head, vocabulary), opener: false });
  });

  const openers: Boundary[] = [
    ...repairOpeners(
      findHeadings(pages)
        .filter((heading) => heading.kind === "chapter")
        .map((heading) => ({
          page: heading.page,
          title: snapTitle(heading.title, vocabulary),
          opener: true,
        })),
      heads,
      vocabulary,
      vocabularyIsAuthoritative,
    ),
    ...titleOpeners(pages, vocabulary),
  ];

  const ordered = [...openers, ...heads].sort(
    (a, b) => a.page - b.page || Number(b.opener) - Number(a.opener),
  );

  const merged: Boundary[] = [];
  for (const boundary of ordered) {
    const here = titleKey(boundary.title);
    // The same chapter announced twice — by its opener and then by its first
    // running head, or by two heads the OCR spelled differently. Also covers a
    // name the OCR truncated out of a longer one, which it does a lot on a
    // spread: "MECHANICS" is printed inside the FLUID MECHANICS chapter, and
    // without this it becomes a five-page chapter of its own.
    const same = merged.some((seen) => {
      const there = titleKey(seen.title);
      if (there.length < 5) return false;
      if (here === there || here.includes(there) || there.includes(here)) return true;
      return similarity(here, there) >= 0.9;
    });
    if (same) {
      const last = merged[merged.length - 1];
      // ...unless both sources put a boundary on the same page and only the
      // head got there first; the opener is the better name for it.
      if (last && last.page === boundary.page && !last.opener && boundary.opener) {
        merged[merged.length - 1] = boundary;
      }
      continue;
    }
    merged.push(boundary);
  }
  return merged;
}

/**
 * The front matter of these books: a "Model Questions — Solution" run that
 * works through the model question set of every unit before the chapters begin.
 */
const MODEL_QUESTIONS = /model\s+questions?\s*[-–—]?\s*solution/i;

/**
 * What to call the pages before the book's first chapter.
 *
 * They must be their OWN segment. Leading them into the first chapter is what
 * the previous version did, and it mislabelled the model-question solutions of
 * every unit with the name of the one chapter that happened to follow them.
 *
 * The RAW pages are read, not the stripped ones: the section announces itself
 * with a running head, and a running head is furniture — it has been removed
 * from the pages this is called on by the time it gets here.
 */
function leadingTitle(rawPages: string[], endPage: number): string {
  const hits = rawPages.slice(0, endPage + 1).filter((page) => MODEL_QUESTIONS.test(page)).length;
  return hits >= 2 ? "Model Questions — Solution" : "Front Matter";
}

/**
 * Split a book into one segment per chapter.
 *
 * A chapter runs from its own boundary to the page before the next one, so a
 * source omitted by both the openers and the heads is absorbed by the chapter
 * it follows instead of inventing an edge of its own. A segment too short to
 * be a chapter (a stray heading that survived the merge) is dropped rather than
 * emitted, and its pages go with the chapter before it because the boundary
 * that claimed them is simply not there.
 */
function segmentByHeadings(pages: string[], rawPages: string[], limit = 60): ChapterRow[] | null {
  const { names, fromToc } = bookVocabulary(pages);
  const boundaries = chapterBoundaries(pages, names, fromToc);
  if (boundaries.length < 2) return null;

  const starts: Array<{ page: number; title: string }> = [];
  if (boundaries[0].page > 0) {
    starts.push({ page: 0, title: leadingTitle(rawPages, boundaries[0].page - 1) });
  }
  for (const boundary of boundaries) starts.push({ page: boundary.page, title: boundary.title });

  const rows: ChapterRow[] = [];
  for (let i = 0; i < starts.length && rows.length < limit; i += 1) {
    const from = starts[i].page;
    const to = i + 1 < starts.length ? starts[i + 1].page - 1 : pages.length - 1;
    if (to < from) continue;
    const text = pages.slice(from, to + 1).join("\n");
    const chars = text.replace(/\s/g, "").length;
    if (chars < MIN_SEGMENT_CHARS) continue;
    rows.push({ title: starts[i].title, startPage: from + 1, endPage: to + 1, chars });
  }
  return rows.length >= 2 ? rows : null;
}

/** Below this a segment is front matter or a fragment, not a chapter. */
const MIN_SEGMENT_CHARS = 400;

interface BookOutcome {
  sourceFile: string;
  pages: number;
  textless: number;
  runningHeads: string[];
  chapters: ChapterRow[];
  records: BookRecord[];
  written: string[];
  skipped: string[];
}

function titleFromFile(file: string): string {
  const stem = path.basename(file).replace(/\.ocr\.txt$/i, "");
  return stem
    .replace(/^[a-z0-9-]+?-neb-solution-of-/, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Drop furniture lines before anything else reads the page.
 *
 * Runs on the RAW page (each imprint is still its own line); once `cleanPage`
 * has joined lines into paragraphs, an imprint that was a line is a phrase in
 * the middle of a sentence and cannot be removed without cutting prose. That
 * ordering — strip, then repair — is the whole reason this is a separate pass.
 */
function stripFurniture(pages: string[]): { pages: string[]; removed: number } {
  let removed = 0;
  const out = pages.map((page) =>
    page
      .split("\n")
      .filter((line) => {
        if (isFurniture(line)) {
          if (line.trim()) removed += 1;
          return false;
        }
        return true;
      })
      .join("\n"),
  );
  return { pages: out, removed };
}

function ingestBook(file: string, opts: Options): BookOutcome {
  if (!fs.existsSync(file)) {
    throw new Error(`OCR text not found: ${file}`);
  }
  const raw = fs.readFileSync(file, "utf8");
  const rawPages = splitPdfPages(raw);
  const report = scanReport(rawPages);

  const bookTitle = opts.bookTitle ?? titleFromFile(file);

  const { pages, removed } = stripFurniture(rawPages);

  // Running heads are measured on the furniture-stripped pages and applied
  // BEFORE segmentation — see the header note on why an all-caps imprint must
  // never reach a chapter detector.
  const heads = findRunningHeads(pages, opts.minPages);
  const cleaned = pages.map((page) => cleanPage(page, heads));

  // The book's OWN chapter openers first, merged with the running heads —
  // neither alone covers the book (see `chapterBoundaries`). `detectChapters`
  // is the fallback for a book with no such marker, and windows by page count
  // as it always did.
  //
  // Headings are found on the STRIPPED RAW pages, not on `cleaned`: `cleanPage`
  // joins consecutive lines into paragraphs, so by then "Chapter 3: Kinematics"
  // is no longer a line of its own and a line-anchored heading regex can never
  // match it. The page RANGES it returns are then used to slice the cleaned
  // prose, which is why the two views are needed rather than one.
  const segments = segmentByHeadings(pages, rawPages);
  const chapters: Chapter[] = segments
    ? segments.map((s) => ({
        title: s.title,
        startPage: s.startPage - 1,
        endPage: s.endPage - 1,
        text: cleaned.slice(s.startPage - 1, s.endPage).filter(Boolean).join("\n\n"),
      }))
    : detectChapters(cleaned, bookTitle, opts.windowPages);

  const meta: BookMeta = {
    classLevel: opts.classLevel,
    subject: opts.subject,
    bookTitle,
    sourceFile: path.basename(file),
  };
  const records = recordsFromChapters(chapters, meta, opts.maxChars);

  const chapterRows: ChapterRow[] = chapters.map((chapter) => ({
    title: chapter.title,
    startPage: chapter.startPage + 1,
    endPage: chapter.endPage + 1,
    chars: chapter.text.replace(/\s/g, "").length,
  }));
  if (!opts.quiet) {
    console.log(
      `   furniture lines removed: ${removed}; segmentation: ` +
        `${segments ? "chapter openers + running heads" : "windowed fallback"}`,
    );
  }

  const written: string[] = [];
  const skipped: string[] = [];
  records.forEach((record, index) => {
    const rel = recordFileName(record, index);
    const target = path.join(opts.out, rel);
    if (fs.existsSync(target) && !opts.force) {
      skipped.push(rel);
      return;
    }
    if (opts.dryRun) {
      written.push(rel);
      return;
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${JSON.stringify(record, null, 2)}\n`, "utf8");
    written.push(rel);
  });

  return {
    sourceFile: path.basename(file),
    pages: report.pages,
    textless: report.textlessPages,
    runningHeads: [...heads].sort(),
    chapters: chapterRows,
    records,
    written,
    skipped,
  };
}

// ── main ────────────────────────────────────────────────────────────────────

const opts = parseArgs(process.argv.slice(2));

if (!opts.quiet) {
  console.log("=== ingest-scanned-books ===");
  console.log(
    `${opts.ocr.length} file(s) | subject ${opts.subject} | class ${opts.classLevel} | ` +
      `out ${opts.out}${opts.dryRun ? " | DRY RUN" : ""}`,
  );
}

let totalRecords = 0;
let totalChars = 0;
for (const file of opts.ocr) {
  const out = ingestBook(file, opts);
  totalRecords += out.records.length;
  totalChars += out.records.reduce(
    (n, r) => n + r.textbookText.reduce((m, p) => m + p.length, 0),
    0,
  );

  if (!opts.quiet) {
    console.log("");
    console.log(`── ${out.sourceFile}`);
    console.log(
      `   ${out.pages} pages, ${out.textless} without text ` +
        `(${(100 * out.textless / Math.max(1, out.pages)).toFixed(1)}%)`,
    );
    if (out.runningHeads.length) {
      console.log(`   running heads stripped (${out.runningHeads.length}):`);
      for (const head of out.runningHeads.slice(0, 8)) console.log(`     · ${head}`);
      if (out.runningHeads.length > 8) console.log(`     … and ${out.runningHeads.length - 8} more`);
    } else {
      console.log("   running heads stripped: none detected");
    }
    console.log(`   chapters: ${out.chapters.length}`);
    for (const chapter of out.chapters) {
      console.log(
        `     ${String(chapter.startPage).padStart(4)}-${String(chapter.endPage).padEnd(4)} ` +
          `${String(chapter.chars).padStart(7)} ch  ${chapter.title}`,
      );
    }
    console.log(
      `   records: ${out.written.length} written` +
        (out.skipped.length ? `, ${out.skipped.length} already present (use --force)` : ""),
    );
  }

  if (!opts.dryRun) {
    const mapFile = path.join(opts.chaptersOut, `${opts.subject}.chapters.json`);
    const payload = {
      sourceFile: out.sourceFile,
      subject: opts.subject,
      class: opts.classLevel,
      pages: out.pages,
      textlessPages: out.textless,
      runningHeads: out.runningHeads,
      chapters: out.chapters,
    };
    fs.mkdirSync(path.dirname(mapFile), { recursive: true });
    const existing = fs.existsSync(mapFile)
      ? (JSON.parse(fs.readFileSync(mapFile, "utf8")) as { books?: unknown[] })
      : undefined;
    const books = existing?.books ? [...existing.books, payload] : [payload];
    fs.writeFileSync(mapFile, `${JSON.stringify({ subject: opts.subject, books }, null, 2)}\n`, "utf8");
    if (!opts.quiet) console.log(`   chapter map -> ${mapFile}`);
  }
}

console.log("");
console.log(
  `done: ${totalRecords} record(s), ${(totalChars / 1024).toFixed(0)} KiB of verbatim text ` +
    `${opts.dryRun ? "(nothing written — dry run)" : `-> ${opts.out}`}`,
);
