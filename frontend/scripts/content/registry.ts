/**
 * registry:build — validates the topic registry and emits its JSON index.
 *
 *   npm run registry:build            # validate + write public/data/topic-registry.json
 *   npm run registry:build -- --check # validate only (CI gate, no write)
 *
 * Checks:
 *   1. canonical slug is globally unique
 *   2. no alias collides with a canonical slug or another alias
 *   3. no legacy unit targets a non-syllabus unit, and two legacy units
 *      never map to different canonical units
 *   4. every (classSlug, subjectSlug, unitSlug) place exists in
 *      frontend/lib/syllabus.ts — the single source of truth
 *   5. every payload dir of the "json" kind exists on disk (warn, not fail —
 *      empty shells are a known corpus problem, tracked separately)
 *
 * Emits frontend/public/data/topic-registry.json (byte-stable: sorted).
 */
import fs from "node:fs";
import path from "node:path";

import {
  buildRegistryIndex,
  findSyllabusUnit,
  TOPIC_REGISTRY,
  type TopicEntry,
} from "../../lib/topic-registry";

function findRepoRoot(): string {
  const starts = [
    process.argv[1] ? path.resolve(path.dirname(process.argv[1]), "..", "..", "..") : "",
    process.cwd(),
  ];
  for (const start of starts) {
    if (!start) continue;
    let dir = path.resolve(start);
    for (let i = 0; i < 4 && dir !== path.parse(dir).root; i++) {
      if (fs.existsSync(path.join(dir, "content", "ravikishan"))) return dir;
      dir = path.dirname(dir);
    }
  }
  console.error("content/ravikishan corpus not found — run this from inside the repository");
  process.exit(2);
}

const ROOT = findRepoRoot();
const CHECK = process.argv.includes("--check");
const DEST = path.join(ROOT, "frontend", "public", "data", "topic-registry.json");

type Issue = { level: "error" | "warn"; entry: string; message: string };
const issues: Issue[] = [];

// ── 1. unique canonical slugs ───────────────────────────────────────────────
const slugOwners = new Map<string, string>();
for (const e of TOPIC_REGISTRY) {
  const prev = slugOwners.get(e.slug);
  if (prev) {
    issues.push({
      level: "error",
      entry: e.slug,
      message: `canonical slug claimed by both "${prev}" and "${e.title}"`,
    });
  }
  slugOwners.set(e.slug, e.title);
}

// ── 2. alias integrity ──────────────────────────────────────────────────────
const aliasOwners = new Map<string, string>();
for (const e of TOPIC_REGISTRY) {
  for (const alias of e.aliases ?? []) {
    if (slugOwners.has(alias)) {
      issues.push({
        level: "error",
        entry: e.slug,
        message: `alias "${alias}" collides with canonical slug of ${slugOwners.get(alias)}`,
      });
    }
    const prev = aliasOwners.get(alias);
    if (prev && prev !== e.slug) {
      issues.push({
        level: "error",
        entry: e.slug,
        message: `alias "${alias}" claimed by both "${prev}" and "${e.slug}"`,
      });
    }
    aliasOwners.set(alias, e.slug);
  }
}

// ── 3. legacy-unit consistency ─────────────────────────────────────────────
const legacyTargets = new Map<string, string>();
for (const e of TOPIC_REGISTRY) {
  for (const legacy of e.legacyUnits ?? []) {
    const prev = legacyTargets.get(legacy);
    if (prev && prev !== e.unitSlug) {
      issues.push({
        level: "error",
        entry: e.slug,
        message: `legacy unit "${legacy}" maps to both "${prev}" and "${e.unitSlug}"`,
      });
    }
    legacyTargets.set(legacy, e.unitSlug);
  }
}

// ── 4. places must exist in the syllabus ───────────────────────────────────
for (const e of TOPIC_REGISTRY) {
  const place = findSyllabusUnit(e.classSlug, e.subjectSlug, e.unitSlug);
  if (!place) {
    issues.push({
      level: "error",
      entry: e.slug,
      message: `place "${e.classSlug}/${e.subjectSlug}/${e.unitSlug}" not found in syllabus.ts`,
    });
  } else if (place.classDef.slug !== e.classSlug) {
    issues.push({
      level: "error",
      entry: e.slug,
      message: `class slug mismatch: "${e.classSlug}" vs syllabus "${place.classDef.slug}"`,
    });
  }
  // Legacy targets must themselves be valid syllabus units or unknown-but-allowed
  // corpus units (the manifest's legacy slugs). Warn when they are not syllabus units.
  for (const legacy of e.legacyUnits ?? []) {
    if (!findSyllabusUnit(e.classSlug, e.subjectSlug, legacy)) {
      issues.push({
        level: "warn",
        entry: e.slug,
        message: `legacy unit "${legacy}" is not a syllabus unit (corpus-only slug) — expected for content-side slugs, confirm intentional`,
      });
    }
  }
}

// ── 5. payload dir existence (warn only) ───────────────────────────────────
for (const e of TOPIC_REGISTRY) {
  if ((e.payload ?? "json") !== "json") continue;
  const dir = path.join(
    ROOT,
    "content",
    "ravikishan",
    e.classSlug,
    e.subjectSlug,
    e.unitSlug,
  );
  if (!fs.existsSync(dir)) {
    issues.push({
      level: "warn",
      entry: e.slug,
      message: `payload dir content/ravikishan/${e.classSlug}/${e.subjectSlug}/${e.unitSlug}/ does not exist yet (corpus shell)`,
    });
  }
}

// ── report ───────────────────────────────────────────────────────────────────
for (const i of issues.filter((i) => i.level === "warn")) {
  console.warn(`  ! ${i.entry}: ${i.message}`);
}
const errors = issues.filter((i) => i.level === "error");
for (const i of errors) {
  console.error(`  × ${i.entry}: ${i.message}`);
}

if (errors.length > 0) {
  console.error(`registry:build FAILED — ${errors.length} error(s) in ${TOPIC_REGISTRY.length} entries.`);
  process.exit(1);
}

if (CHECK) {
  console.log(`registry:build --check passed (${TOPIC_REGISTRY.length} topics, 0 errors).`);
  process.exit(0);
}

const payload = buildRegistryIndex();
// byte-stable emission: topics sorted by class/subject/unit/slug
payload.topics.sort(
  (a, b) =>
    a.class.localeCompare(b.class) ||
    a.subject.localeCompare(b.subject) ||
    a.unit.localeCompare(b.unit) ||
    a.slug.localeCompare(b.slug),
);
fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.writeFileSync(DEST, JSON.stringify(payload, null, 2), "utf8");
console.log(
  `registry:build wrote ${path.relative(ROOT, DEST)} — ${payload.topics.length} topics, ${Object.keys(payload.aliasMap).length} aliases, ${Object.keys(payload.legacyUnitMap).length} legacy units.`,
);
