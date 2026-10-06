/**
 * home-rails — scaffold + check the agent-authored rail cards (Class 11 + 12).
 *
 *   npx tsx frontend/scripts/content/home-rails.ts            # scaffold: write every missing rails skeleton (never overwrites)
 *   npx tsx frontend/scripts/content/home-rails.ts --check   # gate: every syllabus unit has a rails file; all files parse; readiness report
 *
 * Cards live at:
 *   content/ravikishan/<class-11-notes|class-12-notes>/<subject>/<unit>/rails/<unit>.rail.json
 * one canonical (draft) skeleton per syllabus unit. Agents fill the rows, flip
 * `draft` to false, and the home rail streams the card on the next build.
 * Full contract: frontend/AGENTS.md §9.
 */
import fs from "node:fs";
import path from "node:path";

// Relative imports: this CLI runs under plain tsx from the repo root without
// path-alias resolution (same rule as validate.ts / registry.ts).
import {
  HOME_RAIL_CLASS_SLUGS,
  RAIL_DIR_NAME,
  RAIL_FILE_SUFFIX,
  buildRailSkeleton,
  findCorpusRoot,
  homeRailSubjects,
  loadHomeRailCorpus,
  resolveUnitContentDir,
} from "../../lib/home-rails-corpus";

const CHECK = process.argv.includes("--check");

for (const classSlug of HOME_RAIL_CLASS_SLUGS) {
  if (homeRailSubjects(classSlug).length === 0) {
    console.error(`class "${classSlug}" not found in frontend/lib/syllabus.ts`);
    process.exit(2);
  }
}

const corpusRoot = findCorpusRoot(process.cwd());
let failures = 0;

if (!CHECK) {
  // ── scaffold: write missing skeletons, never touch authored cards ──
  let created = 0;
  let kept = 0;
  for (const classSlug of HOME_RAIL_CLASS_SLUGS) {
    for (const subject of homeRailSubjects(classSlug)) {
      for (const unit of subject.units) {
        let unitDir = resolveUnitContentDir(
          corpusRoot,
          classSlug,
          subject.slug,
          unit.id,
        );
        if (!unitDir) {
          unitDir = path.join(
            corpusRoot,
            "content",
            "ravikishan",
            classSlug,
            subject.slug,
            unit.id,
          );
        }
        fs.mkdirSync(path.join(unitDir, RAIL_DIR_NAME), { recursive: true });
        const file = path.join(unitDir, RAIL_DIR_NAME, `${unit.id}${RAIL_FILE_SUFFIX}`);
        if (fs.existsSync(file)) {
          kept++;
          continue;
        }
        const skeleton = buildRailSkeleton(
          classSlug,
          subject.slug,
          subject.name,
          unit,
        );
        fs.writeFileSync(file, `${JSON.stringify(skeleton, null, 2)}\n`, "utf8");
        created++;
      }
    }
  }
  console.log(`home-rails scaffold: ${created} skeletons created, ${kept} authored cards kept.`);
  process.exit(0);
}

// ── --check: coverage + parse + readiness report ──
const entries = loadHomeRailCorpus(corpusRoot);
const byUnit = new Map<string, typeof entries>();
for (const e of entries) {
  const key = `${e.classSlug}/${e.subjectSlug}/${e.unitId}`;
  byUnit.set(key, [...(byUnit.get(key) ?? []), e]);
}

console.log("unit                                     rails file                    status");
console.log("--------------------------------------------------------------------------------");
let totalUnits = 0;
for (const classSlug of HOME_RAIL_CLASS_SLUGS) {
  for (const subject of homeRailSubjects(classSlug)) {
    for (const unit of subject.units) {
      totalUnits++;
      const unitDir = resolveUnitContentDir(
        corpusRoot,
        classSlug,
        subject.slug,
        unit.id,
      );
      const key = `${classSlug}/${subject.slug}/${unit.id}`;
      const files = byUnit.get(key) ?? [];
      if (!unitDir) {
        failures++;
        console.log(`${key.padEnd(40)} ${"—".padEnd(30)} MISSING unit dir`);
        continue;
      }
      if (files.length === 0) {
        failures++;
        console.log(`${key.padEnd(40)} ${"—".padEnd(30)} MISSING rails file`);
        continue;
      }
      for (const e of files) {
        const name = e.file.split("/").slice(-1)[0];
        // Shape defects fail the gate; draft/TODO skeletons are unfinished
        // work, never violations (same EMPTY-vs-INVALID split as validate.ts).
        // NOTE: `missing row "X"` / `"X" is unwritten` are draft reasons — only
        // `missing "key"` (with quotes) is a shape defect.
        const broken = e.reasons.some(
          (r) =>
            r.startsWith("unparseable") ||
            r.startsWith("schema must") ||
            r.startsWith('missing "') ||
            r.startsWith('"rows"') ||
            r.includes("must be a non-empty string"),
        );
        const status = broken ? "BROKEN" : e.ready ? "ready" : "draft";
        if (broken) failures++;
        console.log(
          `${key.padEnd(40)} ${name.padEnd(30)} ${status}${e.ready ? "" : ` (${e.reasons[0] ?? ""})`}`,
        );
      }
    }
  }
}

const ready = entries.filter((e) => e.ready).length;
console.log("--------------------------------------------------------------------------------");
console.log(
  `${entries.length} rail files across ${totalUnits} syllabus units: ${ready} ready, ${entries.length - ready} draft.`,
);
if (failures > 0) {
  console.error(`home-rails --check FAILED — ${failures} missing/broken rail file(s).`);
  process.exit(1);
}
console.log("home-rails --check passed.");
