/**
 * INGEST LOCAL BOOKS → `backend/kb/books/**` (drop-in knowledge).
 *
 * Run this on the laptop that owns the files. The books stay there; what lands
 * in the repo — and therefore in every deploy — is their TEXT, in the same JSON
 * shape the platform already reads. After that, any related question retrieves
 * the book records whole and answers from them, polished, with the full concept
 * (the existing "paste the verified knowledge, polish the grammar" contract).
 *
 *   npx tsx scripts/ingest-books.ts --dir "D:\\NEB Books" --subject physics --class 12
 *   npx tsx scripts/ingest-books.ts --dir ./books --dry-run
 *   npx tsx scripts/ingest-books.ts --dir ~/Downloads --manifest     (plan only)
 *
 * Three formats are read, each with its own reader because their raw shapes
 * differ — see `src/ai/book-ingest.ts`:
 *   .pdf   pdftotext (poppler/xftp), then de-hyphenate, strip running heads
 *   .md    read as-is, chapters taken from `#` headings
 *   .docx  `unzip -p file word/document.xml`, tags stripped to paragraphs
 *
 * Not everything goes to the tutor. `classifySourceFile` routes each file to a
 * sink so a question bank never enters the answer corpus:
 *
 *   kb/books/**        prose → the tutor reads this
 *   sources/quiz/**    MCQ papers → staged for the quiz bank
 *   sources/reference/**  past papers → staged for a PYQ surface
 *   (nothing)          duplicates, junk, slides, syllabi
 *
 * `sources/` is deliberately OUTSIDE `backend/kb/`, which the corpus walks —
 * writing those records under kb would defeat the whole split.
 *
 * Text extraction reports scanned pages (no text layer) rather than silently
 * ingesting empty records. Nothing here runs in production — it is a build-time
 * converter.
 */
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { detectClassLevel } from "../src/ai/curriculum-corpus";
import {
  DEFAULT_MAX_CHUNK_CHARS,
  detectChapters,
  docxXmlToText,
  markdownChapters,
  paragraphsToPages,
  recordFileName,
  recordsFromChapters,
  scanReport,
  splitPdfPages,
  type BookRecord,
} from "../src/ai/book-ingest";
import {
  UNKNOWN_SUBJECT,
  classifySourceFile,
  sinkFolder,
  type SourceSink,
} from "../src/ai/source-classify";

// ── arguments ───────────────────────────────────────────────────────────────

interface Options {
  dir: string;
  out: string;
  sourcesOut: string;
  subject?: string;
  classLevel?: string;
  maxChars: number;
  layout: boolean;
  dryRun: boolean;
  manifest: boolean;
  force: boolean;
  windowPages: number;
}

function parseArgs(argv: string[]): Options {
  const flags = new Map<string, string | boolean>();
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const [, rawKey, inlineValue] = /^--([^=]+)(?:=(.*))?$/.exec(arg) ?? [];
    const key = String(rawKey ?? "").replace(/^--/, "");
    if (inlineValue !== undefined) flags.set(key, inlineValue);
    else if (argv[i + 1] && !argv[i + 1].startsWith("--")) flags.set(key, argv[++i]);
    else flags.set(key, true);
  }

  const dir = flags.get("dir");
  if (typeof dir !== "string" || !dir) {
    console.error(
      [
        "Usage: npx tsx scripts/ingest-books.ts --dir <folder-of-books> [options]",
        "",
        "  --dir <path>        folder to scan, recursively (required)",
        "  --out <path>        tutor-sink output folder (default: kb/books)",
        "  --sources-out <path> quiz/reference sink root (default: sources)",
        "  --subject <name>    force one subject instead of inferring from the path",
        "  --class <11|12>     force one class instead of inferring from the path",
        "  --max-chars <n>     per-record ceiling (default: " + DEFAULT_MAX_CHUNK_CHARS + ")",
        "  --window <n>        pages per record when no chapter headings exist (default: 8)",
        "  --layout            keep the visual layout (use for table-heavy books)",
        "  --manifest          print the full per-file plan, write nothing",
        "  --force             overwrite records that already exist",
        "  --dry-run           report what would be written, write nothing",
        "",
        'Example: npx tsx scripts/ingest-books.ts --dir "D:\\NEB Books\\Physics" --class 12',
      ].join("\n"),
    );
    process.exit(1);
  }

  const declared = flags.get("class");
  const manifest = flags.has("manifest");
  return {
    dir: String(dir),
    out: String(flags.get("out") ?? path.join("kb", "books")),
    sourcesOut: String(flags.get("sources-out") ?? "sources"),
    subject: typeof flags.get("subject") === "string" ? String(flags.get("subject")) : undefined,
    classLevel:
      typeof declared === "string"
        ? detectedClass(declared) ?? declared
        : undefined,
    maxChars: Number(flags.get("max-chars") ?? DEFAULT_MAX_CHUNK_CHARS) || DEFAULT_MAX_CHUNK_CHARS,
    layout: flags.has("layout"),
    dryRun: flags.has("dry-run") || manifest,
    manifest,
    force: flags.has("force"),
    windowPages: Number(flags.get("window") ?? 8) || 8,
  };
}

function detectedClass(value: string): string | undefined {
  const level = detectClassLevel(String(value));
  return level === "unknown" ? undefined : level;
}

// ── inference from the path ─────────────────────────────────────────────────

const SUBJECTS: Array<[RegExp, string]> = [
  [/\bphysics\b|भौतिक/i, "physics"],
  [/\bchemistry\b|रसायन/i, "chemistry"],
  [/\bbiology\b|जीवशास्त्र|जीवविज्ञान/i, "biology"],
  [/\bmaths?\b|\bmathematics\b|गणित/i, "mathematics"],
  [/\benglish\b|अंग्रेजी|अङ्ग्रेजी/i, "english"],
  [/\bnepali\b|नेपाली/i, "nepali"],
  [/\bcomputer\b|\bscience[- ]?it\b|\bict\b/i, "computer-science"],
  [/\baccount/i, "accountancy"],
  [/\beconomics\b|अर्थशास्त्र/i, "economics"],
  [/\bhealth\b|\benvironment\b|\bsocial\b/i, "health-environment"],
];

/** Subject from the file's own path; a folder name is a strong and useful hint. */
export function subjectFromPath(filePath: string): string | undefined {
  const hay = filePath.replace(/\\/g, "/");
  for (const [re, subject] of SUBJECTS) {
    if (re.test(hay)) return subject;
  }
  return undefined;
}

/** Readable book title from a filename: "Physics_Grade-12_(New).pdf" → "Physics Grade 12". */
export function titleFromFile(filePath: string): string {
  return path
    .basename(filePath)
    .replace(/\.[a-z0-9]{2,4}$/i, "")
    .replace(/[_]+/g, " ")
    .replace(/\b(new|final|copy|pdf|scan(ned)?|ocr|book|textbook|edition|press)\b/gi, " ")
    .replace(/\(\s*\)/g, " ")
    .replace(/[\s-]{2,}/g, " ")
    .trim()
    .slice(0, 90) || path.basename(filePath);
}

// ── extraction ──────────────────────────────────────────────────────────────

function pdftotextPath(): string | null {
  const probe = spawnSync("pdftotext", ["-v"], { encoding: "utf8" });
  if (probe.error) return null;
  return "pdftotext";
}

function extractText(pdf: string, layout: boolean): { ok: boolean; text: string; error?: string } {
  const args = ["-enc", "UTF-8", ...(layout ? ["-layout"] : []), pdf, "-"];
  const result = spawnSync("pdftotext", args, {
    encoding: "utf8",
    maxBuffer: 512 * 1024 * 1024,
  });
  if (result.error) return { ok: false, text: "", error: result.error.message };
  if (result.status !== 0) {
    return { ok: false, text: "", error: (result.stderr || `exit ${result.status}`).trim().slice(0, 200) };
  }
  return { ok: true, text: String(result.stdout ?? "") };
}

/**
 * A `.docx` is a ZIP; its prose is the `word/document.xml` member. `unzip -p`
 * writes that member to stdout and is present wherever Git for Windows is,
 * which is the same condition `pdftotext` already imposes on this script.
 */
function extractDocx(file: string): { ok: boolean; text: string; error?: string } {
  const result = spawnSync("unzip", ["-p", file, "word/document.xml"], {
    encoding: "utf8",
    maxBuffer: 512 * 1024 * 1024,
  });
  if (result.error) return { ok: false, text: "", error: result.error.message };
  if (result.status !== 0) {
    return { ok: false, text: "", error: (result.stderr || `exit ${result.status}`).trim().slice(0, 200) };
  }
  return { ok: true, text: String(result.stdout ?? "") };
}

/** Markdown needs no extraction — it is already the text we store. */
function readMarkdown(file: string): { ok: boolean; text: string; error?: string } {
  try {
    return { ok: true, text: fs.readFileSync(file, "utf8") };
  } catch (err) {
    return { ok: false, text: "", error: err instanceof Error ? err.message : String(err) };
  }
}

/** Content hash — the only reliable de-dup: names lie, bytes do not. */
function fileHash(file: string): string {
  return crypto.createHash("sha1").update(fs.readFileSync(file)).digest("hex");
}

function collectFiles(dir: string, out: string[] = [], depth = 0): string[] {
  if (depth > 6) return out;
  let names: string[];
  try {
    names = fs.readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of names) {
    if (name.startsWith(".")) continue;
    const full = path.join(dir, name);
    let stat: fs.Stats;
    try {
      stat = fs.statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) collectFiles(full, out, depth + 1);
    else if (/\.(pdf|md|docx)$/i.test(name)) out.push(full);
  }
  return out;
}

// ── run ─────────────────────────────────────────────────────────────────────

interface BookOutcome {
  file: string;
  book: string;
  subject: string;
  classLevel: string;
  sink: SourceSink;
  reason: string;
  pages: number;
  textlessPages: number;
  chapters: number;
  records: number;
  chars: number;
  written: string[];
  note?: string;
}

/** A file that produced nothing, recorded anyway so the report is complete. */
function emptyOutcome(
  file: string,
  book: string,
  subject: string,
  classLevel: string,
  note: string,
): BookOutcome {
  return {
    file, book, subject, classLevel, sink: "skip", reason: note,
    pages: 0, textlessPages: 0, chapters: 0, records: 0, chars: 0, written: [], note,
  };
}

/**
 * Where a sink's records land. Only `tutor` is inside `backend/kb/` — the
 * corpus walks that folder, so every other sink must be rooted elsewhere.
 */
function sinkRootFor(sink: SourceSink, opts: Options): string {
  if (sink === "tutor") return opts.out;
  return path.join(opts.sourcesOut, sinkFolder(sink));
}

/**
 * Format → raw text, in one place so the loop below does not branch three
 * times. A failure is reported per file, never as a reason to stop the run:
 * one unreadable PDF in 111 must not cost the other 110.
 */
function extractSource(file: string, layout: boolean): { ok: boolean; text: string; error?: string } {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".md") return readMarkdown(file);
  if (ext === ".docx") return extractDocx(file);
  return extractText(file, layout);
}

/**
 * Format → chapters, in one place so the report below can state pages/chars
 * for every format. Markdown and docx report their paragraph count as "pages"
 * because they have no page concept at all.
 */
function chapterise(
  file: string,
  text: string,
  bookTitle: string,
  opts: Options,
): { pages: string[]; report: ReturnType<typeof scanReport>; chapters: ReturnType<typeof detectChapters> } {
  const ext = path.extname(file).toLowerCase();

  if (ext === ".md") {
    // No cleaning pass: the markdown IS the structure. Chapters come from `#`.
    const chapters = markdownChapters(text, bookTitle, opts.maxChars);
    const chars = text.replace(/\s/g, "").length;
    return {
      pages: [text],
      report: { pages: 1, textlessPages: chars < 20 ? 1 : 0, chars, textlessRatio: chars < 20 ? 1 : 0 },
      chapters,
    };
  }

  if (ext === ".docx") {
    const body = docxXmlToText(text);
    const pages = paragraphsToPages(body, 12);
    return { pages, report: scanReport(pages), chapters: detectChapters(pages, bookTitle, opts.windowPages) };
  }

  const pages = splitPdfPages(text);
  return { pages, report: scanReport(pages), chapters: detectChapters(pages, bookTitle, opts.windowPages) };
}

function main(): void {
  const opts = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(opts.dir)) {
    console.error(`Folder not found: ${opts.dir}`);
    process.exit(1);
  }

  const files = collectFiles(opts.dir).sort();
  if (!files.length) {
    console.error(`No .pdf / .md / .docx files under ${opts.dir}`);
    process.exit(1);
  }

  // `X.md` and `X_OPTIMIZED.md` are the same questions before and after a
  // cleanup pass. Different bytes, so the hash de-dup cannot see them — and
  // keeping both would put every question into the quiz sink twice.
  const optimised = new Set(
    files
      .filter((f) => /_optimized\.(md|pdf|docx)$/i.test(f))
      .map((f) => f.replace(/_optimized\.(md|pdf|docx)$/i, "").toLowerCase()),
  );
  const superseded = (file: string) => {
    const stem = file.replace(/\.(md|pdf|docx)$/i, "");
    return optimised.has(stem.toLowerCase())
      ? `${path.basename(stem)}_OPTIMIZED${path.extname(file)}`
      : undefined;
  };
  if (files.some((f) => /\.pdf$/i.test(f)) && !pdftotextPath()) {
    console.error(
      "pdftotext was not found on PATH, so the PDFs in this folder cannot be read.\n" +
        "  Windows: it ships with Git for Windows (mingw64) — open Git Bash, or install poppler.\n" +
        "  macOS:   brew install poppler\n" +
        "  Linux:   sudo apt install poppler-utils",
    );
    process.exit(1);
  }

  console.log(`Scanning ${files.length} file(s) in ${opts.dir}`);
  console.log(`Tutor sink:  ${path.resolve(opts.out)}`);
  console.log(`Quiz/reference sinks: ${path.resolve(opts.sourcesOut)}  (outside kb/ — the corpus never reads these)`);
  console.log(`${opts.manifest ? "MANIFEST ONLY — nothing will be written" : opts.dryRun ? "dry run" : "writing"}\n`);

  const outcomes: BookOutcome[] = [];
  const seenHash = new Map<string, string>();
  let totalRecords = 0;
  let totalChars = 0;
  let skipped = 0;
  let duplicates = 0;

  for (const file of files) {
    const book = titleFromFile(file);
    const cls = classifySourceFile(path.basename(file));
    const subject = opts.subject ?? subjectFromPath(file) ?? cls.subject ?? UNKNOWN_SUBJECT;
    const classLevel =
      opts.classLevel ?? detectedClass(`${path.basename(file)} ${path.dirname(file)}`) ??
      (cls.classLevel === "?" ? "unknown" : `class-${cls.classLevel}`);

    // De-dup BEFORE extraction: hashing is free, pdftotext on a 250 MB book
    // is not, and a download folder routinely holds the same file four times.
    let hash = "";
    try {
      hash = fileHash(file);
    } catch (err) {
      const note = `unreadable: ${err instanceof Error ? err.message : String(err)}`;
      console.warn(`✗ ${book}\n   ${note}`);
      outcomes.push(emptyOutcome(file, book, subject, classLevel, note));
      continue;
    }
    const earlier = seenHash.get(hash);
    if (earlier) {
      duplicates += 1;
      console.log(`· ${book}\n   duplicate of ${earlier} (same bytes) — skipped`);
      outcomes.push(emptyOutcome(file, book, subject, classLevel, `duplicate of ${earlier}`));
      continue;
    }
    seenHash.set(hash, path.basename(file));

    if (cls.sink === "skip") {
      console.log(`· ${book}\n   skip: ${cls.reason}`);
      outcomes.push(emptyOutcome(file, book, subject, classLevel, `skip: ${cls.reason}`));
      continue;
    }

    const replaced = superseded(file);
    if (replaced) {
      const reason = `superseded by ${replaced}`;
      console.log(`· ${book}\n   ${reason}`);
      outcomes.push(emptyOutcome(file, book, subject, classLevel, reason));
      continue;
    }

    // --manifest classifies only: no extraction, so a 258 MB scanned book is
    // not read just to be told which folder it belongs in. Record counts come
    // from --dry-run when they are wanted.
    if (opts.manifest) {
      console.log(`· ${book}  [${subject}, ${classLevel}, sink=${cls.sink}]  ${cls.reason}`);
      outcomes.push({
        ...emptyOutcome(file, book, subject, classLevel, cls.reason),
        sink: cls.sink,
        reason: cls.reason,
      });
      continue;
    }

    const extracted = extractSource(file, opts.layout);
    if (!extracted.ok) {
      console.warn(`✗ ${book}\n   extraction failed: ${extracted.error}`);
      outcomes.push(emptyOutcome(file, book, subject, classLevel, `extraction failed: ${extracted.error}`));
      continue;
    }

    const { pages, report, chapters } = chapterise(file, extracted.text, book, opts);
    const records = recordsFromChapters(chapters, {
      classLevel,
      subject,
      bookTitle: book,
      sourceFile: path.basename(file),
    }, opts.maxChars);

    const sinkRoot = sinkRootFor(cls.sink, opts);
    const written: string[] = [];
    let note: string | undefined;
    if (report.textlessRatio > 0.5) {
      note = `mostly scanned (${Math.round(report.textlessRatio * 100)}% of pages carry no text) — needs OCR`;
    } else if (report.textlessRatio > 0.15) {
      note = `${Math.round(report.textlessRatio * 100)}% of pages carry no text — probably scanned images`;
    }
    if (!records.length) note = note ?? "no teachable text found";
    if (cls.sink !== "tutor") note = `${cls.reason}${note ? ` · ${note}` : ""}`;

    for (const [index, record] of records.entries()) {
      const rel = recordFileName(record, index);
      const target = path.join(sinkRoot, rel);
      const exists = fs.existsSync(target);
      if (exists && !opts.force) {
        skipped += 1;
        written.push(`${rel} (kept)`);
        continue;
      }
      written.push(rel);
      if (!opts.dryRun) {
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, `${JSON.stringify(record, null, 2)}\n`, "utf8");
      }
    }

    totalRecords += records.length;
    totalChars += report.chars;
    outcomes.push({
      file, book, subject, classLevel, sink: cls.sink, reason: cls.reason,
      pages: report.pages, textlessPages: report.textlessPages,
      chapters: new Set(records.map((r) => r.unit)).size,
      records: records.length, chars: report.chars, written, note,
    });
    console.log(
      `✓ ${book}  [${subject}, ${classLevel}, sink=${cls.sink}]\n` +
        `   ${report.pages} page(s) · ${report.chars.toLocaleString()} chars · ` +
        `${outcomes[outcomes.length - 1].chapters} chapter(s) · ${records.length} record(s) → ${sinkRoot}` +
        (note ? `\n   ⚠ ${note}` : ""),
    );
  }

  // The manifest is named `_…` on purpose: the corpus skips such files, so the
  // report can live beside the records without ever being taught as knowledge.
  if (!opts.dryRun) {
    fs.mkdirSync(opts.out, { recursive: true });
    fs.writeFileSync(
      path.join(opts.out, "_ingest-report.json"),
      `${JSON.stringify({ sourceDir: path.resolve(opts.dir), books: outcomes }, null, 2)}\n`,
      "utf8",
    );
  }

  const needsOcr = outcomes.filter((o) => o.textlessPages > 0 && o.pages > 0);
  const bySink = (sink: SourceSink) => outcomes.filter((o) => o.sink === sink);
  const sinkLine = (label: string, sink: SourceSink) => {
    const list = bySink(sink);
    const records = list.reduce((sum, o) => sum + o.records, 0);
    return `  ${label.padEnd(10)} ${String(list.length).padStart(3)} file(s), ${String(records).padStart(4)} record(s) → ${sinkRootFor(sink, opts).replace(/\\/g, "/")}`;
  };
  const skippedOut = outcomes.filter(
    (o) => o.sink === "skip" && !o.note?.startsWith("duplicate of"),
  );

  if (opts.manifest) {
    console.log("\n══ MANIFEST (classification only — nothing written) ══");
    const order: SourceSink[] = ["tutor", "quiz", "reference", "skip"];
    for (const sink of order) {
      const list = outcomes.filter((o) => o.sink === sink);
      if (!list.length) continue;
      console.log(`\n── ${sink.toUpperCase()} (${list.length} file(s)) ──`);
      for (const o of list) {
        console.log(`  ${o.subject.padEnd(15)} ${o.classLevel.padEnd(9)} ${o.book}`);
        console.log(`      ${o.reason}`);
      }
    }
    console.log("\nRecord counts come from --dry-run; --manifest reads no files.");
  }

  console.log(
    [
      "",
      "──────────────────────────────────────────────",
      `Files:    ${files.length} scanned${duplicates ? `, ${duplicates} duplicate(s) dropped` : ""}${skippedOut.length ? `, ${skippedOut.length} skipped (junk, slides, syllabi, superseded drafts)` : ""}`,
      sinkLine("TUTOR", "tutor"),
      sinkLine("QUIZ", "quiz"),
      sinkLine("REFERENCE", "reference"),
      `Records:  ${totalRecords}${opts.dryRun ? " (would be written)" : " written"}` +
        (skipped ? `, ${skipped} kept as-is (--force to overwrite)` : ""),
      `Text:     ${totalChars.toLocaleString()} characters read`,
      "Note:     the tutor reads kb/ only — quiz/reference records are staged",
      "          under sources/ for their own consumers and are NOT taught.",
    ].join("\n"),
  );

  if (needsOcr.length) {
    console.log(
      [
        "",
        "Pages with no text layer (these will answer NOTHING until OCR'd):",
        ...needsOcr.map(
          (o) => `  • ${o.book}: ${o.textlessPages}/${o.pages} pages (${Math.round((o.textlessPages / o.pages) * 100)}%)`,
        ),
        "  OCR route: install Tesseract, run `ocrmypdf <in.pdf> <out.pdf>` (adds a text layer),",
        "  then re-run this script with --force. Everything else needs no extra step.",
      ].join("\n"),
    );
  }

  if (!opts.dryRun && totalRecords) {
    const staged = [opts.out, ...(["quiz", "reference"] as const).map((s) => sinkRootFor(s, opts))]
      .map((dir) => path.relative(process.cwd(), path.resolve(dir)).replace(/\\/g, "/"))
      .join(" ");
    console.log(
      [
        "",
        "Next: commit the new records so the deploy can read them —",
        `  git add ${staged} && git commit`,
        "Ask a question that the book covers and the tutor answers from the book itself.",
      ].join("\n"),
    );
  }
}

main();
