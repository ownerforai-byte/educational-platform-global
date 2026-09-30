/**
 * INGEST LOCAL PDF BOOKS → `backend/kb/books/**` (drop-in knowledge).
 *
 * Run this on the laptop that owns the PDFs. The books stay there; what lands
 * in the repo — and therefore in every deploy — is their TEXT, in the same JSON
 * shape the platform already reads. After that, any related question retrieves
 * the book records whole and answers from them, polished, with the full concept
 * (the existing "paste the verified knowledge, polish the grammar" contract).
 *
 *   npx tsx scripts/ingest-books.ts --dir "D:\\NEB Books" --subject physics --class 12
 *   npx tsx scripts/ingest-books.ts --dir ./books --dry-run
 *
 * Text extraction uses `pdftotext` (poppler/xpdf), which ships with Git for
 * Windows and is a one-line install everywhere else. Scanned books have no text
 * layer: those pages are counted and reported so you know which books to OCR
 * rather than silently ingesting empty records.
 *
 * Nothing here runs in production — it is a build-time converter.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { detectClassLevel } from "../src/ai/curriculum-corpus";
import {
  DEFAULT_MAX_CHUNK_CHARS,
  buildBookRecords,
  recordFileName,
  scanReport,
  splitPdfPages,
  type BookRecord,
} from "../src/ai/book-ingest";

// ── arguments ───────────────────────────────────────────────────────────────

interface Options {
  dir: string;
  out: string;
  subject?: string;
  classLevel?: string;
  maxChars: number;
  layout: boolean;
  dryRun: boolean;
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
        "Usage: npx tsx scripts/ingest-books.ts --dir <folder-with-pdfs> [options]",
        "",
        "  --dir <path>        folder to scan, recursively (required)",
        "  --out <path>        output folder (default: kb/books)",
        "  --subject <name>    force one subject instead of inferring from the path",
        "  --class <11|12>     force one class instead of inferring from the path",
        "  --max-chars <n>     per-record ceiling (default: " + DEFAULT_MAX_CHUNK_CHARS + ")",
        "  --window <n>        pages per record when no chapter headings exist (default: 8)",
        "  --layout            keep the visual layout (use for table-heavy books)",
        "  --force             overwrite records that already exist",
        "  --dry-run           report what would be written, write nothing",
        "",
        'Example: npx tsx scripts/ingest-books.ts --dir "D:\\NEB Books\\Physics" --class 12',
      ].join("\n"),
    );
    process.exit(1);
  }

  const declared = flags.get("class");
  return {
    dir: String(dir),
    out: String(flags.get("out") ?? path.join("kb", "books")),
    subject: typeof flags.get("subject") === "string" ? String(flags.get("subject")) : undefined,
    classLevel:
      typeof declared === "string"
        ? detectedClass(declared) ?? declared
        : undefined,
    maxChars: Number(flags.get("max-chars") ?? DEFAULT_MAX_CHUNK_CHARS) || DEFAULT_MAX_CHUNK_CHARS,
    layout: flags.has("layout"),
    dryRun: flags.has("dry-run"),
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

function collectPdfs(dir: string, out: string[] = [], depth = 0): string[] {
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
    if (stat.isDirectory()) collectPdfs(full, out, depth + 1);
    else if (/\.pdf$/i.test(name)) out.push(full);
  }
  return out;
}

// ── run ─────────────────────────────────────────────────────────────────────

interface BookOutcome {
  file: string;
  book: string;
  subject: string;
  classLevel: string;
  pages: number;
  textlessPages: number;
  chapters: number;
  records: number;
  chars: number;
  written: string[];
  note?: string;
}

function main(): void {
  const opts = parseArgs(process.argv.slice(2));
  if (!pdftotextPath()) {
    console.error(
      "pdftotext was not found on PATH.\n" +
        "  Windows: it ships with Git for Windows (mingw64) — open Git Bash, or install poppler.\n" +
        "  macOS:   brew install poppler\n" +
        "  Linux:   sudo apt install poppler-utils",
    );
    process.exit(1);
  }
  if (!fs.existsSync(opts.dir)) {
    console.error(`Folder not found: ${opts.dir}`);
    process.exit(1);
  }

  const pdfs = collectPdfs(opts.dir).sort();
  if (!pdfs.length) {
    console.error(`No .pdf files under ${opts.dir}`);
    process.exit(1);
  }

  console.log(`Scanning ${pdfs.length} PDF(s) in ${opts.dir}`);
  console.log(`Output: ${path.resolve(opts.out)}${opts.dryRun ? "  (dry run)" : ""}\n`);

  const outcomes: BookOutcome[] = [];
  let totalRecords = 0;
  let totalChars = 0;
  let skipped = 0;

  for (const pdf of pdfs) {
    const book = titleFromFile(pdf);
    const subject = opts.subject ?? subjectFromPath(pdf) ?? "general";
    const classLevel =
      opts.classLevel ?? detectedClass(`${path.basename(pdf)} ${path.dirname(pdf)}`) ?? "unknown";

    const extracted = extractText(pdf, opts.layout);
    if (!extracted.ok) {
      console.warn(`✗ ${book}\n   extraction failed: ${extracted.error}`);
      outcomes.push({
        file: pdf, book, subject, classLevel, pages: 0, textlessPages: 0, chapters: 0,
        records: 0, chars: 0, written: [], note: `extraction failed: ${extracted.error}`,
      });
      continue;
    }

    const pages = splitPdfPages(extracted.text);
    const report = scanReport(pages);
    const records = buildBookRecords({ bookTitle: book, subject, classLevel, sourceFile: path.basename(pdf), pages }, opts.maxChars);

    const written: string[] = [];
    let note: string | undefined;
    if (report.textlessRatio > 0.5) {
      note = `mostly scanned (${Math.round(report.textlessRatio * 100)}% of pages carry no text) — needs OCR`;
    } else if (report.textlessRatio > 0.15) {
      note = `${Math.round(report.textlessRatio * 100)}% of pages carry no text — probably scanned images`;
    }
    if (!records.length) {
      note = note ?? "no teachable text found";
    }

    for (const [index, record] of records.entries()) {
      const rel = recordFileName(record, index);
      const target = path.join(opts.out, rel);
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
      file: pdf, book, subject, classLevel, pages: report.pages,
      textlessPages: report.textlessPages, chapters: new Set(records.map((r) => r.unit)).size,
      records: records.length, chars: report.chars, written, note,
    });
    console.log(
      `✓ ${book}  [${subject}, ${classLevel}]\n` +
        `   ${report.pages} pages · ${report.chars.toLocaleString()} chars · ` +
        `${outcomes[outcomes.length - 1].chapters} chapter(s) · ${records.length} record(s)` +
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
  console.log(
    [
      "",
      "──────────────────────────────────────────────",
      `Books:    ${pdfs.length}`,
      `Records:  ${totalRecords}${opts.dryRun ? " (would be written)" : ` written to ${path.resolve(opts.out)}`}` +
        (skipped ? `, ${skipped} kept as-is (--force to overwrite)` : ""),
      `Text:     ${totalChars.toLocaleString()} characters of the books now readable by the tutor`,
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
    console.log(
      [
        "",
        "Next: commit the new records so the deploy can read them —",
        `  git add ${path.relative(process.cwd(), path.resolve(opts.out)).replace(/\\/g, "/")} && git commit`,
        "Ask a question that the book covers and the tutor answers from the book itself.",
      ].join("\n"),
    );
  }
}

main();
