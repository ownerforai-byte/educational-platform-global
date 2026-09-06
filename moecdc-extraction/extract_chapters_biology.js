/**
 * extract_chapters_biology.js
 * Extracts the text of one or more chapters from the CDC "Biology Grade 11"
 * textbook PDF and writes each chapter to a Markdown file in ./out-biology/.
 *
 * Prerequisites (run once, inside moecdc-extraction/):
 *    npm install
 *
 * Usage:
 *    node extract_chapters_biology.js                 -> extracts ALL chapters
 *    node extract_chapters_biology.js 2               -> extracts only chapter 2
 *    node extract_chapters_biology.js 1 5 7           -> extracts chapters 1, 5 and 7
 *
 * Output naming:  out-biology/chapter-01-biomolecules-and-cell-biology.md
 */
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const DATA = require('./chapters-biology.json');
const PDF_FILE = path.join(__dirname, 'biology-grade-11.pdf');
const OUT_DIR = path.join(__dirname, 'out-biology');

/** "1. Biomolecules And Cell Biology"-style heading detection */
const CHAPTER_HEADING = /^\s*(\d{1,2})\.\s+(.*)/i;

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function cleanPageArtifacts(text) {
  // The PDF repeats a running footer like "Biology, Grade 11 | 1" on each page.
  return text.replace(/Biology,\s*Grade\s*11\s*\|\s*\d+/g, '').replace(/[ \t]+\n/g, '\n');
}

/** Split the raw book text into per-chapter text blocks keyed by chapter number. */
function splitIntoChapters(fullText) {
  const lines = fullText.split('\n');
  const chapters = new Map(); // chapter no -> string[]
  let current = null;

  for (const line of lines) {
    const m = line.match(CHAPTER_HEADING);
    if (m) {
      const no = parseInt(m[1], 10);
      if (DATA.chapters.some((c) => c.no === no)) {
        current = no;
        if (!chapters.has(current)) chapters.set(current, []);
      }
    }
    if (current !== null) chapters.get(current).push(line);
  }
  return chapters;
}

(async () => {
  const args = process.argv.slice(2).map(Number).filter((n) => !Number.isNaN(n));
  const wanted = args.length ? DATA.chapters.filter((c) => args.includes(c.no)) : DATA.chapters;

  if (wanted.length === 0) {
    console.error('No matching chapters. Valid numbers: 1 -', DATA.chapters.length);
    process.exit(1);
  }
  if (!fs.existsSync(PDF_FILE)) {
    console.error('PDF not found. Run "node download_biology_pdf.js" first.');
    process.exit(1);
  }

  console.log('Parsing PDF (this can take a minute)...');
  const buf = fs.readFileSync(PDF_FILE);
  const pdf = await pdfParse(buf);
  console.log(`Parsed ${pdf.numpages} pages, ${pdf.text.length.toLocaleString()} characters.`);

  const raw = cleanPageArtifacts(pdf.text);
  const chapters = splitIntoChapters(raw);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const ch of wanted) {
    const parts = chapters.get(ch.no);
    if (!parts || parts.length === 0) {
      console.warn(`Chapter ${ch.no} ("${ch.title}") heading not found in PDF text - skipped.`);
      continue;
    }
    let text = parts.join('\n').trim();
    // Trim the next chapter's spill-over: cut at the very next heading occurrence.
    const nextHeading = new RegExp(`\\n\\s*${ch.no + 1}\\.`, 'i');
    const nextMatch = text.match(nextHeading);
    if (nextMatch) text = text.slice(0, nextMatch.index).trim();

    const fileName = `chapter-${String(ch.no).padStart(2, '0')}-${slugify(ch.title)}.md`;
    const outPath = path.join(OUT_DIR, fileName);
    const md = `# Chapter ${ch.no}: ${ch.title}\n\n> Source: ${DATA.book} — ${DATA.publisher}\n> PDF: ${DATA.pdfUrl}\n\n${text}\n`;
    fs.writeFileSync(outPath, md, 'utf8');
    console.log(`Wrote ${outPath} (${text.length.toLocaleString()} chars)`);
  }

  console.log('Done.');
})().catch((e) => {
  console.error('FAILED:', e);
  process.exit(1);
});
