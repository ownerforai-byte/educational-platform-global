/**
 * audit-notes.ts — WHERE DOES EACH NOTE FILE ACTUALLY BELONG?
 *
 * Answers three questions for every concept note under content/notes/concepts:
 *
 *   1. Does its topicSlug exist in the syllabus AT ALL?
 *   2. If it exists, is it filed under the RIGHT unit (and right subject)?
 *   3. Is its body real teaching content, or filler?
 *
 * Findings:
 *   ORPHAN        topicSlug matches no syllabus topic in any unit
 *   MISFILED      topicSlug belongs to a different unit than the folder it sits in
 *   WRONG_SUBJECT topicSlug belongs to a different subject entirely
 *   DUPLICATE     the same (unit, topicSlug) is carried by more than one file
 *   PLACEHOLDER   body is filler ("Added new rich content", "lorem", "tbd", ...)
 *   THIN          body is real but under a usable minimum
 *   OK            filed correctly with real content
 *
 * Usage (from frontend/):
 *   npx tsx scripts/audit-notes.ts            # summary
 *   npx tsx scripts/audit-notes.ts --list     # every finding, one line each
 *   npx tsx scripts/audit-notes.ts --json     # machine-readable
 */

import fs from "node:fs";
import path from "node:path";

import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";

const ROOT = path.resolve(process.cwd(), "..");
const CONCEPTS = path.join(ROOT, "content", "notes", "concepts");

const args = process.argv.slice(2);
const LIST = args.includes("--list");
const JSON_OUT = args.includes("--json");

/** Folder names are `class-11`; syllabus class slugs are `class-11-notes`. */
function normalizeClassDir(dir: string): string {
  return dir.replace(/-notes$/, "");
}

/** Minimum characters of real teaching text before a note counts as THIN. */
const MIN_BODY_CHARS = 400;

/** Filler markers left behind by enrichment runs. */
const PLACEHOLDER_PATTERNS: RegExp[] = [
  /added new rich content/i,
  /universal scientific fact/i,
  /\blorem ipsum\b/i,
  /\btbd\b/i,
  /\bto be (added|written|completed)\b/i,
  /^placeholder\b/i,
  /^todo\b/i,
  /^n\/a$/i,
  /^\s*$/,
];

/** Fields that carry the actual teaching prose, in priority order. */
const BODY_FIELDS = [
  "notes",
  "summary",
  "keyPoints",
  "importantConcepts",
  "importantNotes",
  "examNotes",
  "importantStatements",
] as const;

type Finding =
  | "ORPHAN"
  | "MISFILED"
  | "WRONG_SUBJECT"
  | "DUPLICATE"
  | "PLACEHOLDER"
  | "THIN"
  | "OK";

interface NoteRecord {
  file: string;
  rel: string;
  classDir: string;
  subject: string;
  unit: string;
  topicSlug: string;
  topicTitle: string;
  bodyChars: number;
  findings: Finding[];
  detail: string;
  /** Where the topicSlug really lives, when it lives somewhere else. */
  realHome?: string;
}

/* ── syllabus index ─────────────────────────────────────────── */

interface TopicHome {
  classDir: string;
  subject: string;
  unit: string;
  title: string;
}

/** slug -> every syllabus home that claims it (slugs are unique per unit only). */
const HOMES = new Map<string, TopicHome[]>();

for (const klass of SYLLABUS) {
  for (const subject of klass.subjects) {
    for (const unit of subject.units) {
      const used = new Set<string>();
      for (const title of unit.topics) {
        let slug = slugifySyllabusTopic(title);
        let n = 2;
        while (used.has(slug)) slug = `${slugifySyllabusTopic(title)}-${n++}`;
        used.add(slug);
        const home: TopicHome = {
          classDir: klass.slug,
          subject: subject.slug,
          unit: unit.id,
          title,
        };
        const list = HOMES.get(slug);
        if (list) list.push(home);
        else HOMES.set(slug, [home]);
      }
    }
  }
}

/* ── note walk ──────────────────────────────────────────────── */

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name.endsWith(".json")) out.push(p);
  }
  return out;
}

function isPlaceholder(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  return PLACEHOLDER_PATTERNS.some((re) => re.test(t));
}

function bodyText(note: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const field of BODY_FIELDS) {
    const v = note[field];
    if (Array.isArray(v)) {
      for (const item of v) if (typeof item === "string") parts.push(item);
    } else if (typeof v === "string") {
      parts.push(v);
    }
  }
  return parts.join(" ").trim();
}

const records: NoteRecord[] = [];
const seenKeys = new Map<string, string[]>();

for (const file of walk(CONCEPTS)) {
  const rel = path.relative(CONCEPTS, file).split(path.sep).join("/");
  const parts = rel.split("/");
  if (parts.length !== 4) continue; // class/subject/unit/file.json

  const [classDir, subject, unit] = parts;

  let note: Record<string, unknown>;
  try {
    note = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    continue;
  }

  const topicSlug = String(note.topicSlug ?? "").trim();
  if (!topicSlug) continue;

  const topicTitle = String(note.topicTitle ?? note.title ?? "").trim();
  const body = bodyText(note);
  const findings: Finding[] = [];
  let detail = "";
  let realHome: string | undefined;

  const homes = HOMES.get(topicSlug) ?? [];

  if (homes.length === 0) {
    findings.push("ORPHAN");
    detail = `topicSlug "${topicSlug}" is not a syllabus topic in any unit`;
  } else {
    const exact = homes.find(
      (h) =>
        normalizeClassDir(h.classDir) === normalizeClassDir(classDir) &&
        h.subject === subject &&
        h.unit === unit,
    );
    if (exact) {
      // filed correctly
    } else {
      const sameSubject = homes.find((h) => h.subject === subject);
      const pick = sameSubject ?? homes[0];
      realHome = `${pick.classDir}/${pick.subject}/${pick.unit}`;
      findings.push(sameSubject ? "MISFILED" : "WRONG_SUBJECT");
      detail = `belongs to ${realHome} (topic: ${pick.title.slice(0, 70)})`;
    }
  }

  const key = `${classDir}/${subject}/${unit}/${topicSlug}`;
  const prior = seenKeys.get(key);
  if (prior) {
    prior.push(rel);
    findings.push("DUPLICATE");
    detail = detail
      ? `${detail}; also carried by ${prior.length} files`
      : `same (unit, topicSlug) carried by ${prior.length} files`;
  } else {
    seenKeys.set(key, [rel]);
  }

  if (isPlaceholder(body)) {
    findings.push("PLACEHOLDER");
    detail = detail ? `${detail}; body is filler` : "body is filler";
  } else if (body.length < MIN_BODY_CHARS) {
    findings.push("THIN");
    detail = detail
      ? `${detail}; only ${body.length} chars`
      : `only ${body.length} chars of body`;
  }

  if (findings.length === 0) findings.push("OK");

  records.push({
    file,
    rel,
    classDir,
    subject,
    unit,
    topicSlug,
    topicTitle,
    bodyChars: body.length,
    findings,
    detail,
    realHome,
  });
}

/* ── report ─────────────────────────────────────────────────── */

const counts = new Map<Finding, number>();
for (const r of records) {
  for (const f of r.findings) counts.set(f, (counts.get(f) ?? 0) + 1);
}

const bySubject = new Map<string, { total: number; bad: number }>();
for (const r of records) {
  const k = `${r.classDir}/${r.subject}`;
  const cur = bySubject.get(k) ?? { total: 0, bad: 0 };
  cur.total += 1;
  if (r.findings.some((f) => f !== "OK")) cur.bad += 1;
  bySubject.set(k, cur);
}

if (JSON_OUT) {
  console.log(
    JSON.stringify(
      {
        total: records.length,
        counts: Object.fromEntries(counts),
        bySubject: Object.fromEntries(bySubject),
        records: records.map((r) => ({
          rel: r.rel,
          topicSlug: r.topicSlug,
          findings: r.findings,
          detail: r.detail,
          bodyChars: r.bodyChars,
          realHome: r.realHome,
        })),
      },
      null,
      2,
    ),
  );
} else {
  console.log("=== NOTE PLACEMENT AUDIT ===\n");
  console.log(`note files scanned: ${records.length}`);
  const order: Finding[] = [
    "OK",
    "MISFILED",
    "ORPHAN",
    "WRONG_SUBJECT",
    "DUPLICATE",
    "PLACEHOLDER",
    "THIN",
  ];
  for (const f of order) {
    const n = counts.get(f) ?? 0;
    if (n) console.log(`  ${f.padEnd(14)} ${n}`);
  }

  console.log("\n-- by subject --");
  for (const [k, v] of [...bySubject.entries()].sort()) {
    const pct = v.total ? Math.round((v.bad / v.total) * 100) : 0;
    console.log(
      `  ${k.padEnd(26)} ${String(v.bad).padStart(4)}/${String(v.total).padStart(4)} need work (${pct}%)`,
    );
  }

  if (LIST) {
    for (const f of order) {
      if (f === "OK") continue;
      const rows = records.filter((r) => r.findings.includes(f));
      if (!rows.length) continue;
      console.log(`\n-- ${f} (${rows.length}) --`);
      for (const r of rows) {
        console.log(`  ${r.rel}`);
        if (r.detail) console.log(`      ${r.detail}`);
      }
    }
  } else {
    console.log("\n(run with --list for every finding, --json for machine-readable)");
  }
}
