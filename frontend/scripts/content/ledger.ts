/**
 * content ledger — the registry of every note the site CLAIMS to have.
 *
 *   npx tsx frontend/scripts/content/ledger.ts            # report (no write)
 *   npx tsx frontend/scripts/content/ledger.ts --write    # (re)write the ledger
 *   npx tsx frontend/scripts/content/ledger.ts --check    # CI gate, fails on drift
 *
 * Why it exists: the topic workspace, the "topics with notes" pills and the AI
 * tutor all learn what exists from the built manifests. When a manifest entry
 * points at a file that was deleted, renamed or regenerated as a template, every
 * page keeps promising notes that are not there — the exact "deceiving" this
 * ledger ends. Each entry records the file's size, its sha256 and an honest
 * status, so a regression is a diff instead of a surprise on a live page.
 *
 * Organisation: class → subject → unit → entries. Every level carries its own
 * totals, so "which unit is still template-only?" is one lookup instead of a
 * scan of 867 rows.
 *
 * `--check` fails on:
 *   · an entry the ledger knows but the tree does not ship (deleted underneath)
 *   · a shipped topic file the ledger does not know (unregistered addition)
 *   · a manifest claim missing from the ledger
 *   · a file whose bytes drifted without the ledger being regenerated
 *   · an entry that regressed from `authored` to `template`
 *   · subject/unit summaries that disagree with their own entries
 *
 * Live presence (`node scripts/content-ledger-live.mjs`) then proves the
 * deployed site serves every registered entry, byte for byte.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { isGeneratorJunkLine } from "../../lib/content/generator-junk";

const REPO = (() => {
  const starts = [
    process.argv[1] ? path.resolve(path.dirname(process.argv[1]), "..", "..", "..") : "",
    process.cwd(),
  ];
  for (const start of starts) {
    if (!start) continue;
    let dir = path.resolve(start);
    for (let i = 0; i < 4 && dir !== path.parse(dir).root; i++) {
      if (fs.existsSync(path.join(dir, "frontend", "public", "data"))) return dir;
      dir = path.dirname(dir);
    }
  }
  console.error("frontend/public/data not found — run this from inside the repository");
  process.exit(2);
})();

const ROOT = path.join(REPO, "frontend", "public", "data", "syllabus-notes");
const LEDGER = path.join(REPO, "frontend", "public", "data", "content-ledger.json");
const CHECK = process.argv.includes("--check");
const WRITE = process.argv.includes("--write");

/**
 * Stock sentences the generators emit regardless of topic. They carry no
 * knowledge, so a payload made of them is a template, not a note.
 */
const STOCK_PHRASES = [
  /covers essential principles and applications/i,
  /other topics/i,
  /based on fundamental principles/i,
  /definition and significance of/i,
  /check (the )?(formula )?conditions/i,
  /check conditions for/i,
  /focus on .* problems - significant marks/i,
  /recall the formula for/i,
  /^statement \d+:/i,
  /learn definitions, formulas, practice/i,
  /foundational for advanced topics/i,
  /key relationship:/i,
  /\[variable formula\]/i,
  /which describes /i,
  /correct definition|incorrect description/i,
  /should be memorized and practiced/i,
  /fundamental concepts of/i,
  /essential for solving problems/i,
  /significant marks/i,
];

type Status = "authored" | "template";

interface Entry {
  topicSlug: string;
  filename: string;
  bytes: number;
  sha256: string;
  status: Status;
}

interface Totals {
  entries: number;
  authored: number;
  template: number;
  bytes: number;
}

interface UnitNode {
  totals: Totals;
  entries: Entry[];
}

interface SubjectNode {
  totals: Totals;
  units: Record<string, UnitNode>;
}

interface Ledger {
  class: string;
  source: string;
  legend: Record<Status, string>;
  totals: Totals;
  subjects: Record<string, SubjectNode>;
}

interface ManifestEntry {
  unitSlug: string;
  topicSlug: string;
  filename: string;
}

function manifestFor(subject: string): ManifestEntry[] {
  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(path.join(ROOT, subject, "_manifest.json"), "utf-8"),
    );
    return Array.isArray(parsed) ? (parsed as ManifestEntry[]) : [];
  } catch {
    return [];
  }
}

function subjectsOnDisk(): string[] {
  if (!fs.existsSync(ROOT)) {
    console.error(`missing built tree: ${ROOT}`);
    process.exit(2);
  }
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

function isStock(line: string): boolean {
  return isGeneratorJunkLine(line) || STOCK_PHRASES.some((r) => r.test(line.trim()));
}

/** Template when most of the teaching payload is generator stock. */
function statusOf(json: unknown): Status {
  const lines = strings(json)
    .flatMap((s) => s.split(/\r?\n/))
    .map((l) => l.trim())
    .filter((l) => l.length > 12);
  if (!lines.length) return "template";
  const stock = lines.filter(isStock).length;
  return stock / lines.length >= 0.6 ? "template" : "authored";
}

const emptyTotals = (): Totals => ({ entries: 0, authored: 0, template: 0, bytes: 0 });

function addTo(totals: Totals, entry: Entry): void {
  totals.entries++;
  totals[entry.status]++;
  totals.bytes += entry.bytes;
}

/** Every shipped entry, derived from the manifests — the site's own claim set. */
function scan(): Ledger {
  const subjects: Record<string, SubjectNode> = {};
  const problems: string[] = [];

  for (const subject of subjectsOnDisk()) {
    const manifest = manifestFor(subject);
    if (!manifest.length) {
      problems.push(`${subject}: no _manifest.json (nothing is registered for this subject)`);
      continue;
    }
    const subjectNode: SubjectNode = { totals: emptyTotals(), units: {} };
    for (const claim of manifest) {
      const file = path.join(ROOT, subject, claim.unitSlug, claim.filename);
      if (!fs.existsSync(file)) {
        problems.push(`${subject}/${claim.unitSlug}/${claim.filename}: registered but NOT shipped`);
        continue;
      }
      const raw = fs.readFileSync(file);
      let json: unknown;
      try {
        json = JSON.parse(raw.toString("utf-8"));
      } catch {
        problems.push(`${subject}/${claim.unitSlug}/${claim.filename}: unparsable JSON`);
        continue;
      }
      const unit: UnitNode = (subjectNode.units[claim.unitSlug] ??= {
        totals: emptyTotals(),
        entries: [],
      });
      const entry: Entry = {
        topicSlug: claim.topicSlug,
        filename: claim.filename,
        bytes: raw.length,
        sha256: createHash("sha256").update(raw).digest("hex"),
        status: statusOf(json),
      };
      unit.entries.push(entry);
      addTo(unit.totals, entry);
      addTo(subjectNode.totals, entry);
    }
    for (const unit of Object.values(subjectNode.units)) {
      unit.entries.sort((a, b) => a.filename.localeCompare(b.filename));
    }
    subjects[subject] = {
      totals: subjectNode.totals,
      units: Object.fromEntries(
        Object.entries(subjectNode.units).sort(([a], [b]) => a.localeCompare(b)),
      ),
    };
  }

  const totals = emptyTotals();
  for (const subject of Object.values(subjects)) {
    totals.entries += subject.totals.entries;
    totals.authored += subject.totals.authored;
    totals.template += subject.totals.template;
    totals.bytes += subject.totals.bytes;
  }

  for (const p of problems) console.error(`  × ${p}`);
  if (problems.length && CHECK) {
    console.error(`ledger:check FAILED — ${problems.length} registered entr(ies) are not shipped.`);
    process.exit(1);
  }

  return {
    class: "class-11-notes",
    source: "frontend/public/data/syllabus-notes",
    legend: {
      authored: "most of the payload is topic-specific content",
      template: "most of the payload is generator stock (\"Core point for X.\", \"X covers essential principles and applications.\")",
    },
    totals,
    subjects,
  };
}

/** Flatten an organised ledger back to comparable rows. */
function flatten(ledger: Ledger): Map<string, Entry & { subject: string; unitSlug: string }> {
  const rows = new Map<string, Entry & { subject: string; unitSlug: string }>();
  for (const [subject, subjectNode] of Object.entries(ledger.subjects ?? {})) {
    for (const [unitSlug, unit] of Object.entries(subjectNode.units ?? {})) {
      for (const entry of unit.entries ?? []) {
        rows.set(`${subject}/${unitSlug}/${entry.filename}`, { ...entry, subject, unitSlug });
      }
    }
  }
  return rows;
}

const actual = scan();

if (CHECK) {
  if (!fs.existsSync(LEDGER)) {
    console.error(`ledger:check FAILED — ${path.relative(REPO, LEDGER)} does not exist (run --write).`);
    process.exit(1);
  }
  const ledger = JSON.parse(fs.readFileSync(LEDGER, "utf-8")) as Ledger;
  const known = flatten(ledger);
  const shipped = flatten(actual);
  const failures: string[] = [];

  for (const [k, expected] of known) {
    const found = shipped.get(k);
    if (!found) {
      failures.push(`missing from the shipped tree: ${k}`);
      continue;
    }
    if (found.sha256 !== expected.sha256) {
      failures.push(
        `bytes drifted (regenerate the ledger): ${k} [${expected.status} → ${found.status}]`,
      );
    } else if (expected.status === "authored" && found.status === "template") {
      failures.push(`regressed to a template: ${k}`);
    }
  }
  for (const k of shipped.keys()) {
    if (!known.has(k)) failures.push(`UNREGISTERED addition (not in the ledger): ${k}`);
  }
  for (const [subject, subjectNode] of Object.entries(actual.subjects)) {
    for (const claim of manifestFor(subject)) {
      if (!known.has(`${subject}/${claim.unitSlug}/${claim.filename}`)) {
        failures.push(`manifest claims an entry the ledger does not know: ${subject}/${claim.unitSlug}/${claim.filename}`);
      }
    }
    const ledgerSubject = ledger.subjects?.[subject];
    if (!ledgerSubject || ledgerSubject.totals.entries !== subjectNode.totals.entries) {
      failures.push(`subject summary disagrees with its entries: ${subject}`);
    }
  }

  if (failures.length) {
    for (const f of failures) console.error(`  × ${f}`);
    console.error(
      `ledger:check FAILED — ${failures.length} problem(s) across ${actual.totals.entries} shipped entries.`,
    );
    process.exit(1);
  }
  console.log(
    `ledger:check passed — ${ledger.totals.entries} entries all registered and shipped ` +
      `(${ledger.totals.authored} authored, ${ledger.totals.template} template; ` +
      `${(ledger.totals.bytes / 1024).toFixed(0)} KiB).`,
  );
  process.exit(0);
}

if (WRITE) {
  fs.writeFileSync(LEDGER, `${JSON.stringify(actual, null, 2)}\n`, "utf-8");
  console.log(
    `ledger:write — ${path.relative(REPO, LEDGER)}: ${actual.totals.entries} entries ` +
      `(${actual.totals.authored} authored, ${actual.totals.template} template) ` +
      `in ${Object.keys(actual.subjects).length} subjects / ` +
      `${Object.values(actual.subjects).reduce((n, s) => n + Object.keys(s.units).length, 0)} units.`,
  );
  process.exit(0);
}

console.log(
  `ledger:status — ${actual.totals.entries} shipped entries ` +
    `(${actual.totals.authored} authored, ${actual.totals.template} template, ` +
    `${(actual.totals.bytes / 1024).toFixed(0)} KiB)`,
);
for (const [subject, subjectNode] of Object.entries(actual.subjects)) {
  const units = Object.keys(subjectNode.units).length;
  console.log(
    `  ${subject.padEnd(12)} entries=${String(subjectNode.totals.entries).padStart(4)} ` +
      `authored=${String(subjectNode.totals.authored).padStart(4)} ` +
      `template=${String(subjectNode.totals.template).padStart(3)}  units=${units}`,
  );
  for (const [unitSlug, unit] of Object.entries(subjectNode.units)) {
    if (unit.totals.template === 0) continue;
    console.log(
      `      · ${unitSlug.padEnd(46)} template=${unit.totals.template}/${unit.totals.entries}`,
    );
  }
}
console.log("run with --write to (re)write the ledger, --check to gate a build");
