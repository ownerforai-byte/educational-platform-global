/**
 * content ledger — the registry of every note the site can serve.
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
 * Scope — every note-bearing data source a page can read, not just the one tree
 * the ledger started with:
 *
 *   subjects       the shipped class-11 note tree, derived from `_manifest.json`
 *                  (what the topic pages, pills and tutor believe exists)
 *   orphans        note files under the same tree that NO manifest claims —
 *                  shipped bytes no page loads, registered so they cannot hide
 *   supplementary  `ravikishan/manifest.json`: the second content family, whose
 *                  entries carry their payload INLINE (topic pages, concept
 *                  panels and /notes read `data` directly, never the file path);
 *                  the manifest's own sha256 proves those claims live, and every
 *                  entry gets its own honest authored/template status
 *   sources        every other shipped note payload a page loads by path
 *                  (`ravikishan/_index.json`, `r-export/manifest.json`)
 *
 * Organisation: class → subject → unit → entries. Every level carries its own
 * totals, so "which unit is still template-only?" is one lookup instead of a
 * scan of thousands of rows.
 *
 * `--check` fails on:
 *   · an entry the ledger knows but the tree does not ship (deleted underneath)
 *   · a shipped topic file the ledger does not know (unregistered addition)
 *   · an unclaimed note file the ledger does not know (unregistered orphan)
 *   · a supplementary entry added, removed, or regressed to a template without
 *     the ledger being regenerated (the manifest sha256 also catches any edit)
 *   · a data source removed, resized, or re-classified
 *   · a manifest claim missing from the ledger
 *   · a file whose bytes drifted without the ledger being regenerated
 *   · an entry that regressed from `authored` to `template`
 *   · subject/unit summaries that disagree with their own entries
 *
 * Live presence (`node scripts/content-ledger-live.mjs`) then proves the
 * deployed site serves every registered entry, byte for byte.
 */
import { execFileSync } from "node:child_process";
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

const DATA = path.join(REPO, "frontend", "public", "data");
const ROOT = path.join(DATA, "syllabus-notes");
const LEDGER = path.join(DATA, "content-ledger.json");
const SUPPLEMENTARY = path.join(DATA, "ravikishan", "manifest.json");
const SOURCES = [
  path.join(DATA, "ravikishan", "_index.json"),
  path.join(DATA, "r-export", "manifest.json"),
];

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

/** Problems found while scanning the tree; `--check` turns them into failures. */
const PROBLEMS: string[] = [];

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

interface OrphanNode {
  totals: Totals;
  entries: Entry[];
}

interface Orphans {
  source: string;
  note: string;
  totals: Totals;
  subjects: Record<string, OrphanNode>;
}

interface SupplementaryEntry {
  path: string;
  status: Status;
}

interface SupplementaryGroup {
  totals: { claims: number; authored: number; template: number };
  entries: SupplementaryEntry[];
}

interface Supplementary {
  source: string;
  note: string;
  bytes: number;
  sha256: string;
  totals: { claims: number; authored: number; template: number };
  groups: Record<string, SupplementaryGroup>;
}

interface SourceFile {
  path: string;
  kind: "array" | "map";
  bytes: number;
  sha256: string;
  claims: number;
  authored: number;
  template: number;
}

interface Ledger {
  class: string;
  scope: string;
  source: string;
  legend: Record<Status, string>;
  totals: Totals;
  subjects: Record<string, SubjectNode>;
  orphans: Orphans;
  supplementary: Supplementary;
  sources: SourceFile[];
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

function isStock(line: string): boolean {
  return isGeneratorJunkLine(line) || STOCK_PHRASES.some((r) => r.test(line.trim()));
}

/**
 * Keys that identify a note rather than teach it. Slugs and `source` values
 * would otherwise dilute the stock ratio — a filler record with three stub
 * notes and four slug lines is still a filler record.
 */
const IDENTITY_KEYS = new Set([
  "title",
  "topicTitle",
  "topicSlug",
  "unitSlug",
  "subject",
  "source",
  "slug",
  "id",
  "filename",
  "href",
  "url",
  "generatedAt",
  "tabGroup",
  "duplicateType",
]);

/** Long teaching lines only — identity fields and short labels do not count. */
function contentLines(value: unknown, key = ""): string[] {
  if (typeof value === "string") {
    if (IDENTITY_KEYS.has(key)) return [];
    return value
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 12);
  }
  if (Array.isArray(value)) return value.flatMap((entry) => contentLines(entry, key));
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([childKey, entry]) =>
      contentLines(entry, childKey),
    );
  }
  return [];
}

/** Template when most of the teaching payload is generator stock. */
function statusOf(json: unknown): Status {
  const lines = contentLines(json);
  if (!lines.length) return "template";
  const stock = lines.filter(isStock).length;
  return stock / lines.length >= 0.6 ? "template" : "authored";
}

const emptyTotals = (): Totals => ({ entries: 0, authored: 0, template: 0, bytes: 0 });
const emptyClaimTotals = () => ({ claims: 0, authored: 0, template: 0 });

function addTo(totals: Totals, entry: Entry): void {
  totals.entries++;
  totals[entry.status]++;
  totals.bytes += entry.bytes;
}

const rel = (file: string) => path.relative(REPO, file).split(path.sep).join("/");

/**
 * Content view of a file: CRLF folded to LF before it is measured or hashed.
 * The registry records knowledge, not the host OS's newlines — this repo is
 * authored on Windows and gated on Linux, where the same committed file checks
 * out with different line endings. LF-only content hashes identically either way.
 */
function contentOf(raw: Buffer): { text: string; bytes: number } {
  const text = raw.toString("utf-8").replace(/\r\n/g, "\n");
  return { text, bytes: Buffer.byteLength(text, "utf-8") };
}

const shaOf = (text: string) => createHash("sha256").update(text, "utf-8").digest("hex");

/**
 * Data sources are read from HEAD: they are shipped artifacts, and the working
 * copy may legitimately hold another agent's uncommitted regeneration. The
 * registry must describe what the commit and the deploy actually serve. Falls
 * back to the working file when git or the commit entry is unavailable.
 */
function committedBytes(file: string): Buffer {
  try {
    return execFileSync("git", ["show", `HEAD:${rel(file)}`], {
      cwd: REPO,
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch {
    return fs.readFileSync(file);
  }
}

/** Every shipped entry, derived from the manifests — the site's own claim set. */
function subjectsScan(): Record<string, SubjectNode> {
  const subjects: Record<string, SubjectNode> = {};

  for (const subject of subjectsOnDisk()) {
    const manifest = manifestFor(subject);
    if (!manifest.length) {
      PROBLEMS.push(`${subject}: no _manifest.json (nothing is registered for this subject)`);
      continue;
    }
    const subjectNode: SubjectNode = { totals: emptyTotals(), units: {} };
    for (const claim of manifest) {
      const file = path.join(ROOT, subject, claim.unitSlug, claim.filename);
      if (!fs.existsSync(file)) {
        PROBLEMS.push(`${subject}/${claim.unitSlug}/${claim.filename}: registered but NOT shipped`);
        continue;
      }
      const raw = fs.readFileSync(file);
      const { text, bytes } = contentOf(raw);
      let json: unknown;
      try {
        json = JSON.parse(text);
      } catch {
        PROBLEMS.push(`${subject}/${claim.unitSlug}/${claim.filename}: unparsable JSON`);
        continue;
      }
      const unit: UnitNode = (subjectNode.units[claim.unitSlug] ??= {
        totals: emptyTotals(),
        entries: [],
      });
      const entry: Entry = {
        topicSlug: claim.topicSlug,
        filename: claim.filename,
        bytes,
        sha256: shaOf(text),
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

  return subjects;
}

/**
 * Note files shipped under the same tree that no `_manifest.json` claims. No
 * page loads them (the readers only follow manifest rows), so they are bytes
 * the platform pays for but never serves — registered here so that stays known
 * instead of silently growing.
 */
function orphansScan(): Orphans {
  const subjects: Record<string, OrphanNode> = {};

  for (const subject of subjectsOnDisk()) {
    const dir = path.join(ROOT, subject);
    const claimed = new Set(
      manifestFor(subject).map((c) => path.posix.join(c.unitSlug, c.filename)),
    );
    const entries: Entry[] = [];
    const walk = (current: string, prefix: string): void => {
      for (const dirent of fs.readdirSync(current, { withFileTypes: true })) {
        const key = prefix ? path.posix.join(prefix, dirent.name) : dirent.name;
        if (dirent.isDirectory()) {
          walk(path.join(current, dirent.name), key);
          continue;
        }
        if (!prefix && dirent.name === "_manifest.json") continue;
        if (!dirent.name.endsWith(".json")) {
          PROBLEMS.push(`${subject}/${key}: non-JSON file in the notes tree`);
          continue;
        }
        if (claimed.has(key)) continue;
        const raw = fs.readFileSync(path.join(current, dirent.name));
        const { text, bytes } = contentOf(raw);
        let json: unknown;
        try {
          json = JSON.parse(text);
        } catch {
          PROBLEMS.push(`${subject}/${key}: unparsable JSON`);
          continue;
        }
        const data = json as { topicSlug?: unknown };
        entries.push({
          topicSlug: typeof data.topicSlug === "string" ? data.topicSlug : "",
          filename: key,
          bytes,
          sha256: shaOf(text),
          status: statusOf(json),
        });
      }
    };
    walk(dir, "");
    if (!entries.length) continue;
    entries.sort((a, b) => a.filename.localeCompare(b.filename));
    const totals = emptyTotals();
    for (const entry of entries) addTo(totals, entry);
    subjects[subject] = { totals, entries };
  }

  const totals = emptyTotals();
  for (const node of Object.values(subjects)) {
    totals.entries += node.totals.entries;
    totals.authored += node.totals.authored;
    totals.template += node.totals.template;
    totals.bytes += node.totals.bytes;
  }

  return {
    source: "frontend/public/data/syllabus-notes",
    note: "note files no _manifest.json claims — shipped bytes no page loads",
    totals,
    subjects: Object.fromEntries(
      Object.entries(subjects).sort(([a], [b]) => a.localeCompare(b)),
    ),
  };
}

/**
 * The second content family: `ravikishan/manifest.json`. Its entries carry the
 * payload INLINE, so the file's own sha256 is what must go live; the ledger also
 * records each claim's status, which is how the class-12 stubs stay visible as
 * stubs instead of blending into a 2,467-row index.
 */
function supplementaryScan(): Supplementary {
  const raw = fs.readFileSync(SUPPLEMENTARY);
  const { text, bytes } = contentOf(raw);
  const groups: Record<string, SupplementaryGroup> = {};
  const totals = emptyClaimTotals();

  const parsed: unknown = JSON.parse(text);
  if (!Array.isArray(parsed)) {
    PROBLEMS.push(`${rel(SUPPLEMENTARY)}: expected an array of { path, data } entries`);
  } else {
    for (const item of parsed as Array<Record<string, unknown>>) {
      const claimPath = item.path;
      if (typeof claimPath !== "string") {
        PROBLEMS.push(`${rel(SUPPLEMENTARY)}: entry without a path`);
        continue;
      }
      const segments = claimPath.split("/");
      const groupKey = segments.length > 1 ? `${segments[0]}/${segments[1]}` : segments[0] || "root";
      const group: SupplementaryGroup = (groups[groupKey] ??= {
        totals: emptyClaimTotals(),
        entries: [],
      });
      const status = statusOf(item.data);
      group.entries.push({ path: claimPath, status });
      group.totals.claims++;
      group.totals[status]++;
      totals.claims++;
      totals[status]++;
    }
  }

  for (const group of Object.values(groups)) {
    group.entries.sort((a, b) => a.path.localeCompare(b.path));
  }

  return {
    source: "frontend/public/data/ravikishan/manifest.json",
    note: "second content family; entries carry their payload inline (readers use data, not the path)",
    bytes,
    sha256: shaOf(text),
    totals,
    groups: Object.fromEntries(Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))),
  };
}

/** Every other shipped note payload a page loads by path. */
function sourcesScan(): SourceFile[] {
  const out: SourceFile[] = [];

  for (const file of SOURCES) {
    if (!fs.existsSync(file)) {
      PROBLEMS.push(`${rel(file)}: registered data source is NOT shipped`);
      continue;
    }
    const raw = committedBytes(file);
    const { text, bytes } = contentOf(raw);
    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      PROBLEMS.push(`${rel(file)}: unparsable JSON`);
      continue;
    }
    const isArray = Array.isArray(json);
    const claims = isArray
      ? (json as unknown[])
      : json && typeof json === "object"
        ? Object.values(json as Record<string, unknown>)
        : [];
    let authored = 0;
    let template = 0;
    for (const claim of claims) {
      if (statusOf(claim) === "authored") authored++;
      else template++;
    }
    out.push({
      path: rel(file),
      kind: isArray ? "array" : "map",
      bytes,
      sha256: shaOf(text),
      claims: claims.length,
      authored,
      template,
    });
  }

  return out;
}

function scan(): Ledger {
  const subjects = subjectsScan();
  const orphans = orphansScan();
  const supplementary = supplementaryScan();
  const sources = sourcesScan();

  const totals = emptyTotals();
  for (const subject of Object.values(subjects)) {
    totals.entries += subject.totals.entries;
    totals.authored += subject.totals.authored;
    totals.template += subject.totals.template;
    totals.bytes += subject.totals.bytes;
  }

  for (const p of PROBLEMS) console.error(`  × ${p}`);
  if (PROBLEMS.length && CHECK) {
    console.error(`ledger:check FAILED — ${PROBLEMS.length} registered entr(ies) are not shipped.`);
    process.exit(1);
  }

  return {
    class: "class-11-notes",
    scope:
      "every note-bearing data source under frontend/public/data that a page can read: " +
      "syllabus-notes manifests, unclaimed note files, the supplementary ravikishan manifest, " +
      "and the remaining note payloads loaded by path",
    source: "frontend/public/data/syllabus-notes",
    legend: {
      authored: "most of the payload is topic-specific content",
      template:
        'most of the payload is generator stock ("Core point for X.", "X covers essential principles and applications.")',
    },
    totals,
    subjects,
    orphans,
    supplementary,
    sources,
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

function flattenOrphans(ledger: Ledger): Map<string, Entry & { subject: string }> {
  const rows = new Map<string, Entry & { subject: string }>();
  for (const [subject, node] of Object.entries(ledger.orphans?.subjects ?? {})) {
    for (const entry of node.entries ?? []) {
      rows.set(`orphans/${subject}/${entry.filename}`, { ...entry, subject });
    }
  }
  return rows;
}

function flattenSupplementary(ledger: Ledger): Map<string, SupplementaryEntry> {
  const rows = new Map<string, SupplementaryEntry>();
  for (const group of Object.values(ledger.supplementary?.groups ?? {})) {
    for (const entry of group.entries ?? []) rows.set(entry.path, entry);
  }
  return rows;
}

const actual = scan();

if (CHECK) {
  if (!fs.existsSync(LEDGER)) {
    console.error(`ledger:check FAILED — ${rel(LEDGER)} does not exist (run --write).`);
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
        failures.push(
          `manifest claims an entry the ledger does not know: ${subject}/${claim.unitSlug}/${claim.filename}`,
        );
      }
    }
    const ledgerSubject = ledger.subjects?.[subject];
    if (!ledgerSubject || ledgerSubject.totals.entries !== subjectNode.totals.entries) {
      failures.push(`subject summary disagrees with its entries: ${subject}`);
    }
  }

  // Unclaimed note files: a new one is an unregistered addition too.
  const knownOrphans = flattenOrphans(ledger);
  const shippedOrphans = flattenOrphans(actual);
  for (const [k, expected] of knownOrphans) {
    const found = shippedOrphans.get(k);
    if (!found) {
      const bare = k.replace(/^orphans\//, "");
      const nowClaimed = [...shipped.keys()].some((key) => key.endsWith(`/${bare}`));
      failures.push(
        nowClaimed
          ? `was unclaimed, now a manifest claims it (regenerate the ledger): ${k}`
          : `missing from the shipped tree (unclaimed note): ${k}`,
      );
      continue;
    }
    if (found.sha256 !== expected.sha256) {
      failures.push(
        `bytes drifted (regenerate the ledger): ${k} [${expected.status} → ${found.status}]`,
      );
    } else if (expected.status === "authored" && found.status === "template") {
      failures.push(`unclaimed note regressed to a template: ${k}`);
    }
  }
  for (const k of shippedOrphans.keys()) {
    if (!knownOrphans.has(k)) failures.push(`UNREGISTERED unclaimed note (no manifest claims it): ${k}`);
  }

  // Supplementary ravikishan manifest: sha256 over the whole claim set, plus
  // per-entry status so a stub cannot quietly become (or stop being) a stub.
  if (actual.supplementary.sha256 !== ledger.supplementary?.sha256) {
    failures.push(
      `${rel(SUPPLEMENTARY)} bytes drifted (regenerate the ledger): ` +
        `${ledger.supplementary?.bytes ?? 0} → ${actual.supplementary.bytes} bytes`,
    );
  }
  const knownSupplementary = flattenSupplementary(ledger);
  const shippedSupplementary = flattenSupplementary(actual);
  for (const [p, expected] of knownSupplementary) {
    const found = shippedSupplementary.get(p);
    if (!found) {
      failures.push(`supplementary claim disappeared from the manifest: ${p}`);
    } else if (expected.status === "authored" && found.status === "template") {
      failures.push(`supplementary entry regressed to a template: ${p}`);
    }
  }
  for (const p of shippedSupplementary.keys()) {
    if (!knownSupplementary.has(p)) failures.push(`UNREGISTERED supplementary claim: ${p}`);
  }
  if (
    ledger.supplementary &&
    ledger.supplementary.totals?.claims !== actual.supplementary.totals.claims
  ) {
    failures.push(
      `supplementary summary disagrees with its entries: ` +
        `${ledger.supplementary.totals.claims} registered vs ${actual.supplementary.totals.claims} shipped`,
    );
  }

  // Remaining note payloads loaded by path.
  const knownSources = new Map((ledger.sources ?? []).map((s) => [s.path, s]));
  for (const source of actual.sources) {
    const expected = knownSources.get(source.path);
    if (!expected) {
      failures.push(`UNREGISTERED data source: ${source.path}`);
      continue;
    }
    if (expected.sha256 !== source.sha256) {
      failures.push(
        `data source bytes drifted (regenerate the ledger): ${source.path} [${expected.claims} → ${source.claims} claims]`,
      );
    } else if (expected.claims !== source.claims) {
      failures.push(`data source claim count changed: ${source.path}`);
    }
  }
  for (const p of knownSources.keys()) {
    if (!actual.sources.some((s) => s.path === p)) failures.push(`data source no longer shipped: ${p}`);
  }

  if (failures.length) {
    for (const f of failures) console.error(`  × ${f}`);
    console.error(
      `ledger:check FAILED — ${failures.length} problem(s) across ${actual.totals.entries} shipped entries.`,
    );
    process.exit(1);
  }
  console.log(
    `ledger:check passed — ${actual.totals.entries} entries all registered and shipped ` +
      `(${actual.totals.authored} authored, ${actual.totals.template} template; ` +
      `${(actual.totals.bytes / 1024).toFixed(0)} KiB) + ` +
      `${actual.orphans.totals.entries} unclaimed note files + ` +
      `${actual.supplementary.totals.claims} supplementary claims ` +
      `(${actual.supplementary.totals.authored} authored, ${actual.supplementary.totals.template} template) + ` +
      `${actual.sources.length} data sources.`,
  );
  process.exit(0);
}

if (WRITE) {
  fs.writeFileSync(LEDGER, `${JSON.stringify(actual, null, 2)}\n`, "utf-8");
  console.log(
    `ledger:write — ${rel(LEDGER)}: ${actual.totals.entries} entries ` +
      `(${actual.totals.authored} authored, ${actual.totals.template} template) ` +
      `in ${Object.keys(actual.subjects).length} subjects / ` +
      `${Object.values(actual.subjects).reduce((n, s) => n + Object.keys(s.units).length, 0)} units; ` +
      `${actual.orphans.totals.entries} unclaimed note files; ` +
      `${actual.supplementary.totals.claims} supplementary claims ` +
      `(${actual.supplementary.totals.template} template); ` +
      `${actual.sources.length} data sources.`,
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

console.log(
  `unclaimed notes — ${actual.orphans.totals.entries} file(s) no manifest claims ` +
    `(${actual.orphans.totals.authored} authored, ${actual.orphans.totals.template} template, ` +
    `${(actual.orphans.totals.bytes / 1024).toFixed(0)} KiB):`,
);
for (const [subject, node] of Object.entries(actual.orphans.subjects)) {
  console.log(
    `  ${subject.padEnd(12)} ${node.totals.entries} file(s), ` +
      `${node.totals.template} template`,
  );
}

console.log(
  `supplementary — ${rel(SUPPLEMENTARY)}: ${actual.supplementary.totals.claims} claims ` +
    `(${actual.supplementary.totals.authored} authored, ${actual.supplementary.totals.template} template):`,
);
for (const [group, node] of Object.entries(actual.supplementary.groups)) {
  console.log(
    `  ${group.padEnd(24)} claims=${String(node.totals.claims).padStart(4)} ` +
      `template=${String(node.totals.template).padStart(4)}`,
  );
}

for (const source of actual.sources) {
  console.log(
    `source — ${source.path}: ${source.claims} claims ` +
      `(${source.authored} authored, ${source.template} template, ${(source.bytes / 1024).toFixed(0)} KiB)`,
  );
}

console.log("run with --write to (re)write the ledger, --check to gate a build");
