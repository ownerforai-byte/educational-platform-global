/**
 * plan-notes.ts — map every off-syllabus note to its best syllabus home.
 *
 * For each note whose topicSlug is not a syllabus topic, score every topic in
 * the note's OWN unit by title-token overlap and report the best candidate.
 * That separates two very different cases:
 *
 *   REHOME   the note is a finer-grained fragment of a real syllabus topic
 *            (e.g. "specific-heat-capacity" inside a unit whose syllabus topic
 *            is "Measurement of specific heat capacity of solids and liquids")
 *   NO_HOME  nothing in the unit is close; the note is genuinely off-syllabus
 *
 * Usage (from frontend/):
 *   npx tsx scripts/plan-notes.ts            # summary
 *   npx tsx scripts/plan-notes.ts --list     # every note with its candidate
 *   npx tsx scripts/plan-notes.ts --json     # machine-readable plan
 */

import fs from "node:fs";
import path from "node:path";

import { SYLLABUS, slugifySyllabusTopic } from "@/lib/core/syllabus";

const ROOT = path.resolve(process.cwd(), "..");
const CONCEPTS = path.join(ROOT, "content", "notes", "concepts");

const args = process.argv.slice(2);
const LIST = args.includes("--list");
const JSON_OUT = args.includes("--json");

/** Token overlap at or above this re-homes the note; below it, no home. */
const REHOME_THRESHOLD = 0.34;

const STOP = new Set([
  "the", "and", "of", "in", "a", "an", "to", "for", "with", "its", "their",
  "concept", "concepts", "introduction", "general", "basic", "definition",
  "meaning", "types", "type", "study", "detail", "details", "some", "only",
  "related", "using", "from", "into", "between", "other", "etc",
]);

function tokens(text: string): Set<string> {
  const out = new Set<string>();
  for (const raw of text.toLowerCase().split(/[^a-z0-9\u0900-\u097f]+/)) {
    if (raw.length < 4) continue;
    if (STOP.has(raw)) continue;
    out.add(raw);
  }
  return out;
}

function overlap(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let hit = 0;
  for (const t of a) if (b.has(t)) hit += 1;
  return hit / Math.min(a.size, b.size);
}

function normalizeClassDir(dir: string): string {
  return dir.replace(/-notes$/, "");
}

/* ── syllabus index ─────────────────────────────────────────── */

interface Home {
  classDir: string;
  subject: string;
  unit: string;
  slug: string;
  title: string;
  tokens: Set<string>;
}

const BY_SLUG = new Map<string, Home[]>();
const BY_UNIT = new Map<string, Home[]>();

for (const klass of SYLLABUS) {
  for (const subject of klass.subjects) {
    for (const unit of subject.units) {
      const used = new Set<string>();
      for (const title of unit.topics) {
        let slug = slugifySyllabusTopic(title);
        let n = 2;
        while (used.has(slug)) slug = `${slugifySyllabusTopic(title)}-${n++}`;
        used.add(slug);
        const home: Home = {
          classDir: klass.slug,
          subject: subject.slug,
          unit: unit.id,
          slug,
          title,
          tokens: tokens(title),
        };
        const bySlug = BY_SLUG.get(slug);
        if (bySlug) bySlug.push(home);
        else BY_SLUG.set(slug, [home]);

        const unitKey = `${normalizeClassDir(klass.slug)}/${subject.slug}/${unit.id}`;
        const byUnit = BY_UNIT.get(unitKey);
        if (byUnit) byUnit.push(home);
        else BY_UNIT.set(unitKey, [home]);
      }
    }
  }
}

/* ── walk notes ─────────────────────────────────────────────── */

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (entry.name.endsWith(".json")) out.push(p);
  }
  return out;
}

interface PlanRow {
  rel: string;
  unitKey: string;
  topicSlug: string;
  topicTitle: string;
  verdict: "REHOME" | "NO_HOME";
  score: number;
  candidateSlug?: string;
  candidateTitle?: string;
  candidateUnit?: string;
}

const rows: PlanRow[] = [];

for (const file of walk(CONCEPTS)) {
  const rel = path.relative(CONCEPTS, file).split(path.sep).join("/");
  const parts = rel.split("/");
  if (parts.length !== 4) continue;
  const [classDir, subject, unit] = parts;

  let note: Record<string, unknown>;
  try {
    note = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    continue;
  }

  const topicSlug = String(note.topicSlug ?? "").trim();
  if (!topicSlug) continue;

  // Already correct? Skip.
  const homes = BY_SLUG.get(topicSlug) ?? [];
  const isHome = homes.some(
    (h) =>
      normalizeClassDir(h.classDir) === normalizeClassDir(classDir) &&
      h.subject === subject &&
      h.unit === unit,
  );
  if (isHome) continue;

  const topicTitle = String(note.topicTitle ?? note.title ?? "").trim();
  const noteTokens = tokens(`${topicSlug} ${topicTitle}`);

  const unitKey = `${normalizeClassDir(classDir)}/${subject}/${unit}`;
  const candidates = BY_UNIT.get(unitKey) ?? [];

  let best: { home: Home; score: number } | null = null;
  for (const home of candidates) {
    const score = overlap(noteTokens, home.tokens);
    if (!best || score > best.score) best = { home, score };
  }

  // A slug that is a prefix of a real slug, or vice versa, is a strong signal
  // even when the token overlap is diluted by long syllabus titles.
  let prefixHit: Home | undefined;
  for (const home of candidates) {
    const a = topicSlug.replace(/^\d+-/, "");
    const b = home.slug;
    if (a.startsWith(b.slice(0, 20)) || b.startsWith(a.slice(0, 20))) {
      prefixHit = home;
      break;
    }
  }

  const score = best?.score ?? 0;
  const rehome = score >= REHOME_THRESHOLD || Boolean(prefixHit);
  const chosen = prefixHit ?? best?.home;

  rows.push({
    rel,
    unitKey,
    topicSlug,
    topicTitle,
    verdict: rehome ? "REHOME" : "NO_HOME",
    score: Math.round(score * 100) / 100,
    candidateSlug: chosen?.slug,
    candidateTitle: chosen?.title,
    candidateUnit: chosen ? `${chosen.classDir}/${chosen.subject}/${chosen.unit}` : undefined,
  });
}

/* ── report ─────────────────────────────────────────────────── */

const rehome = rows.filter((r) => r.verdict === "REHOME");
const noHome = rows.filter((r) => r.verdict === "NO_HOME");

if (JSON_OUT) {
  console.log(JSON.stringify({ total: rows.length, rehome: rehome.length, noHome: noHome.length, rows }, null, 2));
} else {
  console.log("=== OFF-SYLLABUS NOTE PLAN ===\n");
  console.log(`notes off-syllabus : ${rows.length}`);
  console.log(`  REHOME (fragment) : ${rehome.length}`);
  console.log(`  NO_HOME (orphan)  : ${noHome.length}`);

  const byUnit = new Map<string, { re: number; no: number }>();
  for (const r of rows) {
    const cur = byUnit.get(r.unitKey) ?? { re: 0, no: 0 };
    if (r.verdict === "REHOME") cur.re += 1;
    else cur.no += 1;
    byUnit.set(r.unitKey, cur);
  }
  console.log("\n-- by unit (rehome / no-home) --");
  for (const [k, v] of [...byUnit.entries()].sort((a, b) => b[1].re + b[1].no - (a[1].re + a[1].no)).slice(0, 25)) {
    console.log(`  ${k.padEnd(52)} ${String(v.re).padStart(3)} / ${String(v.no).padStart(3)}`);
  }

  if (LIST) {
    console.log(`\n-- REHOME (${rehome.length}) --`);
    for (const r of rehome) {
      console.log(`  ${r.rel}`);
      console.log(`      -> ${r.candidateSlug}  (score ${r.score})`);
    }
    console.log(`\n-- NO_HOME (${noHome.length}) --`);
    for (const r of noHome) {
      console.log(`  ${r.rel}  [${r.topicSlug}]`);
    }
  }
}
