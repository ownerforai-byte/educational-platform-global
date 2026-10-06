/**
 * book-rails — turn the scanned "Old is Gold" question banks into rail cards.
 *
 * The three scanned NEB Class 11 Old is Gold banks (Physics, Mathematics,
 * Chemistry) are already ingested as platform SOURCE records at
 * `backend/kb/books/<subject>/**.json` (produced by
 * `backend/scripts/ocr-scanned-books.py` + `backend/scripts/ingest-scanned-books.ts`).
 * Those records feed the AI tutor's curriculum corpus. This script makes the
 * same source feed the HOME RAILS:
 *
 *   npx tsx frontend/scripts/content/book-rails.ts            # dry-run report
 *   npx tsx frontend/scripts/content/book-rails.ts --write    # emit/refresh cards
 *   npx tsx frontend/scripts/content/book-rails.ts --check    # gate: coverage + provenance
 *
 * It emits, per mapped syllabus unit, one extra rail card:
 *   content/ravikishan/class-11-notes/<subject>/<unit>/rails/<unit>--old-is-gold.rail.json
 * with `source: "book:old-is-gold-<subject>-class-11"` — the sibling of the
 * `web:<host>` provenance `frontend/AGENTS.md` §9 already defines for rows that
 * did not come from the platform corpus.
 *
 * EXACTNESS CONTRACT (the point of this script): every row segment is a
 * verbatim slice of one book record's `textbookText`. Rows are never rewritten,
 * paraphrased or spell-corrected — the emitter only SELECTS. `--check`
 * re-derives the mapping and asserts that every emitted row segment is an exact,
 * word-boundary-aligned substring of the mapped scan records. A row the scan
 * cannot supply leaves the card `draft: true`, so it stays off the rail (the §9
 * rule) instead of showing invented text.
 */
import fs from "node:fs";
import path from "node:path";

import {
  HOME_RAIL_CLASS_SLUG,
  HOME_RAIL_ROWS,
  HOME_RAIL_SCHEMA,
  HOME_RAIL_SUBJECT_ICONS,
  findCorpusRoot,
  homeRailSubjects,
  loadHomeRailCorpus,
  type HomeRailFile,
  type HomeRailFileRow,
} from "../../lib/home-rails-corpus";

const WRITE = process.argv.includes("--write");
/**
 * Publishing rows straight out of the scan needs an explicit acknowledgement:
 * this OCR drops glyphs and fuses words (`strictlythe`, `loosinghed`), which no
 * static filter can catch, so an unreviewed row must never reach the home page.
 * `--check` still validates every row it does see against the scan.
 */
const RAW_OCR = process.argv.includes("--raw-ocr");
const CHECK = process.argv.includes("--check");
const QUIET = process.argv.includes("--quiet");
const SUBJECT_FILTER = argValue("--subject");
const UNIT_FILTER = argValue("--unit");
/** `--show=<subject>/<unitId>`: print one card plus why each empty row is empty. */
const SHOW = argValue("--show");

/** Suffix of the generated card (`<unit>--old-is-gold.rail.json`). */
const CARD_SUFFIX = "--old-is-gold";
/** Only records whose provenance mentions this are Old is Gold scan output. */
const BOOK_SOURCE_MARKER = "old-is-gold";
/** Provenance prefix written into `source` for every generated card. */
const BOOK_SOURCE_PREFIX = "book:";

function argValue(flag: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`${flag}=`));
  return hit ? hit.slice(flag.length + 1) : undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. The mapping: scanned chapter (a record `unit`) → class-11 syllabus unit id.
//    One chapter may back several units; several chapters may back one unit.
//    Chapter keys are the scan's own chapter titles (its table of contents);
//    unit ids come from frontend/lib/syllabus.ts. The pairing is a judgement
//    call, so it lives here in reviewable form — `--check` fails when a key
//    stops existing in the scan (a chapter rename can no longer silently drop
//    a unit off the rail).
// ─────────────────────────────────────────────────────────────────────────────
type ChapterMap = Record<string, string[]>;

const CHAPTER_UNITS: Record<string, ChapterMap> = {
  physics: {
    "Physical Quantities": ["physical-quantities"],
    Vectors: ["vectors"],
    Kinematics: ["kinematics"],
    "Laws of Motion": ["dynamics"],
    Equilibrium: ["dynamics"],
    "Rotational Dynamics": ["dynamics"],
    Elasticity: ["elasticity"],
    "Work and Energy": ["work-energy-and-power"],
    "Circular Motion": ["circular-motion"],
    Gravitation: ["gravitation"],
    "Heat and Temperature": ["heat-and-temperature"],
    "Thermal Properties of Matter": ["thermal-expansion"],
    "Transfer of Heat": ["rate-of-heat-flow"],
    "First Law of Thermodynamics": ["quantity-of-heat"],
    "Second Law of Thermodynamics": ["quantity-of-heat"],
    "Reflection at Curved Mirrors": ["reflection-at-curved-mirror"],
    "Refraction at Plane Surfaces": ["refraction-at-plane-surfaces"],
    "Refraction through Prisms": ["refraction-through-prisms"],
    Lenses: ["lenses"],
    Dispersion: ["dispersion"],
    Electrostatics: ["electric-charges"],
    "Capacitance and Dielectrics": ["capacitor"],
  },
  chemistry: {
    "2.4. Avogadro's Hypothesis & Its Applications": ["stoichiometry"],
    "2.5. Equivalent Masse": ["stoichiometry"],
    "State of Matter": ["states-of-matter"],
    "Atomic Structure": ["atomic-structure"],
    "Electronic Theory of Valency and Bonding": [
      "chemical-bonding-and-shapes-of-molecules",
    ],
    "Periodic Classification of Elements": [
      "classification-of-elements-and-periodic-table",
    ],
    "Oxidation and Réduction": ["oxidation-and-reduction"],
    Equilibria: ["chemical-equilibrium"],
    "Non-Metals I": ["chemistry-of-non-metals"],
    "Metal and Metallurgical Principles": ["chemistry-of-metals"],
    "Alkali and Alkaline Earth Metals": ["chemistry-of-metals"],
  },
  mathematics: {
    "Sets, Real Number System and Logic": ["algebra"],
    "Curve Sketching": ["algebra"],
    "Sequence, Series and Mathematical Induction": ["algebra"],
    "Matrices and Determinants": ["algebra"],
    "System of Linear Equations": ["algebra"],
    "Complex Numbers": ["algebra"],
    "Polynomial Equations": ["algebra"],
    Trigonometry: ["trigonometry"],
    "Co-ordinate Geometry": ["analytic-geometry"],
  },
};

/**
 * Scanned chapters that map to NO class-11 syllabus unit, with the reason.
 * Documented so the coverage gap is reported instead of silently dropped.
 */
const UNMAPPED_CHAPTERS: Record<string, string> = {
  "Model Questions — Solution": "front-matter mixed-question section, not a unit",
  "Periodic Motion": "oscillations have no class-11 syllabus unit in this corpus",
  "Fluid Mechanics": "no fluid statics/dynamics unit in this corpus",
  Hygrometry: "humidity sits inside Heat and Temperature, not its own unit",
  Photometry: "no photometry unit in this corpus",
  "Optical Instruments": "the syllabus folds optical instruments into Lenses",
  "SECTION B - INORGANIC CHEMISTRY": "section divider, not a chapter",
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Book records
// ─────────────────────────────────────────────────────────────────────────────
interface BookChapter {
  subject: string;
  chapter: string;
  texts: string[];
  /** Combined record text — the verbatim haystack rows are checked against. */
  text: string;
  files: string[];
  pageRange: string;
}

/** `findCorpusRoot` already returns the repo root (the dir holding `content/`). */
function repoRoot(): string {
  return findCorpusRoot(process.cwd());
}

function loadChapters(subject: string): BookChapter[] {
  const dir = path.join(repoRoot(), "backend", "kb", "books", subject);
  if (!fs.existsSync(dir)) return [];
  const byChapter = new Map<
    string,
    { texts: string[]; files: string[]; lastPages: number[] }
  >();
  for (const file of fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()) {
    let record: Record<string, unknown>;
    try {
      record = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    } catch {
      continue;
    }
    const source = String(record.source ?? "");
    if (!source.includes(BOOK_SOURCE_MARKER)) continue;
    const chapter = String(record.unit ?? "").trim();
    if (!chapter) continue;
    const text = (Array.isArray(record.textbookText) ? record.textbookText : [])
      .map((t) => String(t))
      .join("\n")
      .trim();
    if (!text) continue;
    const bucket = byChapter.get(chapter) ?? { texts: [], files: [], lastPages: [] };
    bucket.texts.push(text);
    bucket.files.push(`backend/kb/books/${subject}/${file}`);
    const m = source.match(/pages (\d+)-(\d+)/);
    if (m) bucket.lastPages.push(Number(m[1]));
    byChapter.set(chapter, bucket);
  }
  return [...byChapter.entries()]
    .map(([chapter, b]) => ({
      subject,
      chapter,
      texts: b.texts,
      text: b.texts.join("\n"),
      files: b.files,
      pageRange: b.lastPages.length ? `p. ${Math.min(...b.lastPages)}` : "",
    }))
    .sort((a, b) => a.chapter.localeCompare(b.chapter));
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Row extraction — SELECT verbatim sentences, never rewrite them
// ─────────────────────────────────────────────────────────────────────────────
interface RowRule {
  /** Every entry must match (AND of ORs). */
  require: RegExp[];
  /** A sentence matching any of these is skipped outright. */
  reject?: RegExp[];
  /** More matches = higher score; ties break toward earlier text. */
  prefer?: RegExp[];
  minLen: number;
  maxLen: number;
  /** How many sentences to quote (joined with " · "). */
  take: number;
}

const YEAR = /\b(?:207\d|20[0-2]\d)\b/;
const MATH_SYMBOL = /[=√πθΔλμρωΣ²³]|\b(?:cos|sin|tan)\b/i;

const RULES: Record<string, RowRule> = {
  Concept: {
    require: [/is defined as|is called|is a |is the |refers to|means/i],
    reject: [/\bFind\b|\bCalculate\b|\bDefine\b|\bDerive\b/],
    prefer: [/\bis defined as\b/, /\bis called\b/],
    minLen: 70,
    maxLen: 320,
    take: 1,
  },
  Formula: {
    require: [/=/, /[A-Za-z]/],
    reject: [/\bGiven\b/],
    prefer: [/^or,/, /\bwhere\b/i, /\bformula\b/i, MATH_SYMBOL],
    minLen: 35,
    maxLen: 190,
    take: 1,
  },
  Conditions: {
    /* The scans state a condition far more often as "valid only for", "is true
       only when" or "provided that" than as the bare noun — quoting those is
       still verbatim, so they count. */
    require: [
      /condition|provided|only when|as long as|valid (?:only )?(?:for|when|if)|is true only|holds only/i,
    ],
    prefer: [/\bconditions?\b/i, /provided that/i, /\bonly when\b/i],
    minLen: 60,
    maxLen: 320,
    take: 1,
  },
  "Special cases": {
    require: [/special case|in the case of|maximum|minimum|equal to zero|is zero/i],
    reject: [/\bGiven\b/],
    prefer: [/\bspecial case\b/i, /\bmaximum\b/i, /\bminimum\b/i],
    minLen: 60,
    maxLen: 320,
    take: 1,
  },
  Solved: {
    /* A worked answer opens with "Given", "Here", "We have" or a numbered
       "Ans." — all four appear in the scans. */
    require: [/^Given\b|Given,|\bSolution\b|^Here\b|We have|\bAns\./],
    prefer: [/^Given\b/, /We know that/, /=/],
    minLen: 60,
    maxLen: 320,
    take: 1,
  },
  Limitation: {
    require: [
      /limitation|cannot|not possible|is not valid|assumption|neglect|not applicable|fails (?:when|to)|ideal(?:ised)? assumption/i,
    ],
    prefer: [/\blimitations?\b/i, /\bcannot be\b/, /\bnot applicable\b/i],
    minLen: 60,
    maxLen: 320,
    take: 1,
  },
  Derivation: {
    /* Proofs in these question banks announce themselves as "Prove that",
       "Show that", "Let us consider" or "Hence proved" — and they run longer
       than an ordinary sentence, so the cap is wider than the other rows
       (still a single verbatim, self-contained sentence). */
    require: [
      /deriv|prove that|proof|let us (?:consider|assume|take)|show that|hence proved/i,
    ],
    prefer: [/\bderiv/i, /\bprove\b/i, /\bshow that\b/i, /\bhence proved\b/i],
    minLen: 60,
    maxLen: 420,
    take: 1,
  },
  Shortcut: {
    require: [/\bnote\b|remember|in short|shortcut|short cut|trick/i],
    prefer: [/\bnote that\b/i, /remember(?: that)?/i],
    minLen: 55,
    maxLen: 300,
    take: 1,
  },
  "Board question": {
    /* Past-board questions carry a year, a "Q.No." tag or a question mark, and
       a long-answer question is longer than the other rows' cap. */
    require: [/\bOld Q\.?\s*No|\bQ\.?\s*No|\b(?:207\d|20[0-2]\d)\b|\?/],
    prefer: [/\b(?:207\d|20[0-2]\d)\b/, /\bOld Q\.?\s*No/, /\bFind\b|\bCalculate\b|\bDefine\b|\bState\b|\bDerive\b|\bShow that\b/],
    minLen: 45,
    maxLen: 380,
    take: 1,
  },
};

/**
 * Sentences the two-column scan mangled. A rail row quotes exactly, so a
 * fragment that lost its subject, swallowed a bullet or was cut mid-equation is
 * not usable — it must be skipped, not repaired.
 */
const MUTILATED: { re: RegExp; why: string }[] = [
  { re: /[•\u2022|„]/, why: "bullet/column artifact" },
  { re: /\s{2,}/, why: "double space" },
  { re: /\.\s*[a-z]/, why: "lowercase after stop" },
  { re: /\b(?:Please|refer to)\b/i, why: "cross-reference furniture" },
  { re: /,\s*$|[;,]$/, why: "cut mid-clause" },
  { re: /\b(?:and|or|the|of|to|in|is|are)\.$/, why: "cut on a function word" },
  { re: /\d\s*=\s*\d*\s*=/, why: "run-together equations" },
  // Letter/digit mash — this scan's tell for a misread glyph run
  // (`N0.4`, `V1stant`, `kg-l`, `PVs`).
  { re: /[A-Za-z][0-9][A-Za-z]|[0-9][A-Za-z][0-9]|\b[A-Za-z]+[0-9][A-Za-z]*\b/, why: "letter/digit mash" },
  // A bracket inside a word: a lost space or a lost glyph (`c(V1stant`).
  { re: /[A-Za-z][([][A-Za-z]|[A-Za-z][)\]][A-Za-z]/, why: "bracket inside word" },
  // Two questions fused into one sentence (`… mixture 068 Old Q.No.5 Define …`).
  { re: /\b\d{2,3}\s+(?:Old|Q\.)\b/, why: "page marker fused into the text" },
  { re: /\?[^?]*$[^?]*\?/, why: "two questions fused" },
  // Capitalised word in the middle of a clause: a lost sentence break.
  { re: /[a-z],\s+[A-Z][a-z]+\s+[a-z]/, why: "lost sentence break" },
];

/** Scan noise no row may quote. */
const GARBAGE: RegExp[] = [
  /puspas|www\.|https?:/i,
  /\uFFFD/,
  /[|]{2,}/,
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/,
];

function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Paragraph split first, then sentence split inside each paragraph. */
function toSentences(text: string): string[] {
  const out: string[] = [];
  for (const paragraph of text.split("\n")) {
    const flat = normalize(paragraph);
    if (!flat) continue;
    let start = 0;
    const re = /(?<=[.?!])\s+(?=[A-Z0-9"“(])/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(flat)) !== null) {
      out.push(flat.slice(start, m.index + 1).trim());
      start = m.index + m[0].length;
    }
    out.push(flat.slice(start).trim());
  }
  return out.filter((s) => s.length > 0);
}

/** Why a sentence did not become a quote (empty string = it did). */
function rejectReason(sentence: string, rule: RowRule): string {
  if (sentence.length < rule.minLen) return `shorter than ${rule.minLen}`;
  if (sentence.length > rule.maxLen) return `longer than ${rule.maxLen}`;
  if (!rule.require.every((r) => r.test(sentence))) return "missing keyword";
  if (rule.reject?.some((r) => r.test(sentence))) return "rejected phrase";
  if (GARBAGE.some((r) => r.test(sentence))) return "scan noise";
  const letters = sentence.replace(/[^A-Za-z]/g, "").length;
  if (letters / sentence.length < 0.55) return "too little prose";
  // A quote must be a whole, self-contained sentence.
  if (!/^[A-Z0-9"“(]/.test(sentence)) return "starts mid-sentence";
  if (!/[.?!]"?$/.test(sentence)) return "does not end a sentence";
  for (const { re, why } of MUTILATED) {
    if (re.test(sentence)) return why;
  }
  return "";
}

function isQuotable(sentence: string, rule: RowRule): boolean {
  return rejectReason(sentence, rule) === "";
}

/** SELECT up to `rule.take` sentences; empty when the scan cannot supply it. */
function selectRow(chapter: BookChapter, rule: RowRule): string[] {
  const scored: { sentence: string; score: number; index: number }[] = [];
  toSentences(chapter.text).forEach((sentence, index) => {
    if (!isQuotable(sentence, rule)) return;
    scored.push({
      sentence,
      score: (rule.prefer ?? []).reduce((n, r) => n + (r.test(sentence) ? 1 : 0), 0),
      index,
    });
  });
  if (scored.length === 0) return [];
  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  const picked = scored.slice(0, rule.take).sort((a, b) => a.index - b.index);
  const seen = new Set<string>();
  const segments: string[] = [];
  for (const { sentence } of picked) {
    if (seen.has(sentence)) continue;
    seen.add(sentence);
    segments.push(sentence);
  }
  return segments;
}

/** A segment counts as exact only when it is a verbatim, whole-word slice. */
function verbatimSegment(haystack: string, segment: string): boolean {
  let from = 0;
  for (;;) {
    const at = haystack.indexOf(segment, from);
    if (at === -1) return false;
    const before = haystack.at(at - 1);
    const after = haystack.at(at + segment.length);
    const isWord = (c: string | undefined) => !!c && /[A-Za-z0-9]/.test(c);
    if (!isWord(before) && !isWord(after)) return true;
    from = at + 1;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Card construction
// ─────────────────────────────────────────────────────────────────────────────
interface BuiltCard {
  unitId: string;
  subject: string;
  record: HomeRailFile;
  gaps: string[];
  ready: boolean;
}

/** `--show` diagnostics: rows that came up empty, with their source text. */
const nearMisses = new Map<string, { chapter: BookChapter; rule: RowRule }>();

function buildCard(
  subject: string,
  unit: { id: string; title: string; hours?: number; topics: string[] },
  chapters: BookChapter[],
): BuiltCard {
  const merged: BookChapter = {
    subject,
    chapter: chapters.map((c) => c.chapter).join(" + "),
    texts: chapters.flatMap((c) => c.texts),
    text: chapters.map((c) => c.text).join("\n"),
    files: chapters.flatMap((c) => c.files),
    pageRange: chapters
      .filter((c) => c.pageRange)
      .map((c) => c.pageRange)
      .join(", "),
  };

  const rows: HomeRailFileRow[] = [];
  const gaps: string[] = [];
  for (const want of HOME_RAIL_ROWS) {
    const rule = RULES[want.label];
    const segments = rule
      ? selectRow(merged, rule).filter((s) => verbatimSegment(merged.text, s))
      : [];
    if (segments.length === 0) {
      gaps.push(`the scan supplies no quotable ${want.label}`);
      if (SHOW && rule) {
        nearMisses.set(`${subject}/${unit.id}/${want.label}`, { chapter: merged, rule });
      }
      rows.push({
        label: want.label,
        ...(want.kind === "formula" ? { kind: want.kind } : {}),
        text: `TODO: the scan supplies no verbatim ${want.label} for "${unit.title}".`,
      });
      continue;
    }
    rows.push({
      label: want.label,
      ...(want.kind === "formula" ? { kind: want.kind } : {}),
      text: segments.join(" · "),
    });
  }

  const ready = gaps.length === 0;
  const record: HomeRailFile = {
    schema: HOME_RAIL_SCHEMA,
    draft: !ready,
    classSlug: HOME_RAIL_CLASS_SLUG,
    subjectSlug: subject,
    unitSlug: unit.id,
    unitTitle: unit.title,
    ...(unit.hours !== undefined ? { unitHours: unit.hours } : {}),
    syllabusTopics: [...unit.topics],
    source: `${BOOK_SOURCE_PREFIX}${BOOK_SOURCE_MARKER}-${subject}-class-11`,
    agentNotes:
      `Old is Gold rails — every row is SELECTED VERBATIM from the scanned question bank (${merged.chapter}${merged.pageRange ? `, ${merged.pageRange}` : ""}; OCR, not retyped). ` +
      `Source records: ${merged.files.join(", ")}. Regenerate: npx tsx frontend/scripts/content/book-rails.ts --write --subject=${subject}`,
    card: {
      tag: "Old is Gold",
      title: unit.title,
      href: `/${HOME_RAIL_CLASS_SLUG}/${subject}`,
      icon: HOME_RAIL_SUBJECT_ICONS[subject] ?? "BookOpen",
      statKey: `pyq:${subject}`,
    },
    rows,
  };
  return { unitId: unit.id, subject, record, gaps, ready };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Run
// ─────────────────────────────────────────────────────────────────────────────
const corpusRoot = findCorpusRoot(process.cwd());
const subjects = homeRailSubjects(HOME_RAIL_CLASS_SLUG).filter(
  (s) => CHAPTER_UNITS[s.slug] && (!SUBJECT_FILTER || s.slug === SUBJECT_FILTER),
);

if (subjects.length === 0) {
  console.error("book-rails: no mapped subject — check CHAPTER_UNITS / --subject");
  process.exit(2);
}

interface Outcome {
  card: BuiltCard;
  file: string;
  status:
    | "written"
    | "unchanged"
    | "would-write"
    | "skipped-authored"
    | "review-only"
    | "draft";
}

const outcomes: Outcome[] = [];
const mappingProblems: string[] = [];

for (const subject of subjects) {
  const chapters = loadChapters(subject.slug);
  const map = CHAPTER_UNITS[subject.slug];
  const byChapter = new Map(chapters.map((c) => [c.chapter, c]));

  for (const chapter of Object.keys(map)) {
    if (!byChapter.has(chapter)) {
      mappingProblems.push(
        `${subject.slug}: mapped chapter "${chapter}" is not in the scan`,
      );
    }
  }
  for (const chapter of chapters) {
    if (!map[chapter.chapter] && !UNMAPPED_CHAPTERS[chapter.chapter]) {
      mappingProblems.push(
        `${subject.slug}: scanned chapter "${chapter.chapter}" has no unit mapping`,
      );
    }
  }
  for (const chapter of Object.keys(map)) {
    for (const unitId of map[chapter]) {
      if (!subject.units.some((u) => u.id === unitId)) {
        mappingProblems.push(
          `${subject.slug}: mapping "${chapter}" → "${unitId}" names no syllabus unit`,
        );
      }
    }
  }

  const perUnit = new Map<string, BookChapter[]>();
  for (const chapter of chapters) {
    for (const unitId of map[chapter.chapter] ?? []) {
      perUnit.set(unitId, [...(perUnit.get(unitId) ?? []), chapter]);
    }
  }

  for (const unit of subject.units) {
    const backing = perUnit.get(unit.id);
    if (!backing || backing.length === 0) continue;
    if (UNIT_FILTER && unit.id !== UNIT_FILTER) continue;

    const card = buildCard(subject.slug, unit, backing);
    const railsDir = path.join(
      corpusRoot,
      "content",
      "ravikishan",
      HOME_RAIL_CLASS_SLUG,
      subject.slug,
      unit.id,
      "rails",
    );
    const file = path.join(railsDir, `${unit.id}${CARD_SUFFIX}.rail.json`);

    if (!card.ready) {
      outcomes.push({ card, file, status: "draft" });
      continue;
    }

    const next = `${JSON.stringify(card.record, null, 2)}\n`;
    const previous = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : undefined;
    if (previous === next) {
      outcomes.push({ card, file, status: "unchanged" });
      continue;
    }
    if (previous !== undefined) {
      // Never clobber an agent-authored card — only regenerate our own output.
      let owner: unknown;
      try {
        owner = (JSON.parse(previous) as { source?: unknown }).source;
      } catch {
        owner = undefined;
      }
      if (typeof owner !== "string" || !owner.startsWith(BOOK_SOURCE_PREFIX)) {
        outcomes.push({ card, file, status: "skipped-authored" });
        continue;
      }
    }
    if (!WRITE) {
      outcomes.push({ card, file, status: "would-write" });
      continue;
    }
    if (!RAW_OCR) {
      outcomes.push({ card, file, status: "review-only" });
      continue;
    }
    fs.mkdirSync(railsDir, { recursive: true });
    fs.writeFileSync(file, next, "utf8");
    outcomes.push({ card, file, status: "written" });
  }
}

if (!QUIET) {
  console.log("unit                                          rows  status");
  console.log("-".repeat(84));
  for (const o of outcomes) {
    const key = `${o.card.subject}/${o.card.unitId}`;
    const filled = o.card.record.rows.filter((r) => !r.text.startsWith("TODO")).length;
    const gap = o.card.gaps[0] ?? "";
    console.log(
      `${key.padEnd(56)} ${String(filled).padStart(2)}/9  ${o.status}${
        o.card.ready ? "" : ` — ${gap}`
      }`,
    );
  }
  console.log("-".repeat(84));
  const ready = outcomes.filter((o) => o.card.ready).length;
  console.log(
    `${outcomes.length} syllabus units backed by the scan: ${ready} ready, ${
      outcomes.length - ready
    } draft.`,
  );
  if (WRITE) {
    const written = outcomes.filter((o) => o.status === "written").length;
    const held = outcomes.filter((o) => o.status === "review-only").length;
    console.log(`${written} card file(s) written, ${held} held for review.`);
    if (held > 0) {
      console.log(
        `\nHOLDING ${held} card(s): these rows are raw scan text and have not been\n` +
          `reviewed. Fused words and dropped glyphs survive every static check, so\n` +
          `publishing needs the explicit \`--raw-ocr\` acknowledgement — or curate the\n` +
          `rows first (see agentNotes for the source records of each card).`,
      );
    }
  }

  const mapped = new Set(
    subjects.flatMap((s) => Object.keys(CHAPTER_UNITS[s.slug])),
  );
  const unmapped = new Set(
    subjects.flatMap((s) =>
      loadChapters(s.slug)
        .map((c) => c.chapter)
        .filter((c) => !mapped.has(c)),
    ),
  );
  console.log(`\nscan chapters with no syllabus unit (${unmapped.size}):`);
  for (const chapter of [...unmapped].sort()) {
    console.log(`  · ${chapter} — ${UNMAPPED_CHAPTERS[chapter] ?? "UNMAPPED"}`);
  }
}

if (SHOW) {
  const [showSubject, showUnit] = SHOW.split("/");
  const outcome = outcomes.find(
    (o) => o.card.subject === showSubject && o.card.unitId === showUnit,
  );
  if (!outcome) {
    console.error(`book-rails --show: no card for "${SHOW}"`);
    process.exit(2);
  }
  console.log(`\n${JSON.stringify(outcome.card.record, null, 2)}`);
  for (const [key, { chapter, rule }] of nearMisses) {
    if (!key.startsWith(`${showSubject}/${showUnit}/`)) continue;
    const label = key.slice(`${showSubject}/${showUnit}/`.length);
    const candidates = toSentences(chapter.text)
      .map((s) => ({ s, why: rejectReason(s, rule) }))
      .filter((c) => c.why !== "missing keyword");
    console.log(`\n=== "${label}" near misses (${candidates.length}) ===`);
    for (const c of candidates.slice(0, 6)) {
      console.log(`  [${c.why}] ${c.s.slice(0, 150)}`);
    }
  }
}

if (mappingProblems.length > 0) {
  console.error(`\nmapping problems (${mappingProblems.length}):`);
  for (const p of mappingProblems) console.error(`  · ${p}`);
}

if (CHECK) {
  // The rail reader must see every generated card ready, and every row segment
  // must be verbatim book text.
  const entries = loadHomeRailCorpus(corpusRoot).filter((e) =>
    e.file.includes(`${CARD_SUFFIX}${".rail.json"}`),
  );
  let failures = mappingProblems.length;
  const chapterCache = new Map<string, string>();
  for (const entry of entries) {
    if (!entry.ready) {
      console.error(`FAIL ${entry.file}: not ready — ${entry.reasons.join("; ")}`);
      failures++;
      continue;
    }
    const source = String(entry.record.source ?? "");
    if (!source.startsWith(BOOK_SOURCE_PREFIX)) {
      console.error(`FAIL ${entry.file}: source must start with "${BOOK_SOURCE_PREFIX}"`);
      failures++;
      continue;
    }
    if (entry.record.draft !== false) {
      console.error(`FAIL ${entry.file}: ready card must set draft: false`);
      failures++;
    }
    if (!chapterCache.has(entry.subjectSlug)) {
      chapterCache.set(
        entry.subjectSlug,
        loadChapters(entry.subjectSlug)
          .map((c) => c.text)
          .join("\n"),
      );
    }
    const haystack = chapterCache.get(entry.subjectSlug) ?? "";
    for (const row of entry.record.rows) {
      for (const segment of row.text.split(" · ")) {
        if (!verbatimSegment(haystack, segment)) {
          console.error(
            `FAIL ${entry.file}: "${row.label}" row is not verbatim in the scan — ${segment.slice(0, 90)}…`,
          );
          failures++;
        }
      }
    }
  }
  console.log(
    `\nprovenance: ${entries.length} generated card(s) checked, ${failures} failure(s).`,
  );
  if (failures > 0) {
    console.error("book-rails --check FAILED");
    process.exit(1);
  }
  console.log("book-rails --check passed.");
}
