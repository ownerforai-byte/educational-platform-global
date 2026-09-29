/**
 * content:doctor — read-only hygiene report for the authored corpus (PLANS.md §5.2).
 *
 *   npx tsx frontend/scripts/content/doctor.ts
 *
 * Exits 1 when it finds anything. `--fix` is intentionally scoped: this phase
 * only reports; repairs go through `content/repair.ts` (mechanical, proven) or a
 * deliberate edit, then `content:build --check` proves nothing drifted.
 *
 * Sections:
 *   crlf          files with CRLF line endings (POSIX tooling chokes)
 *   missingRequired  unparseable files or missing Required-tier fields
 *   legacyKeys    `mcqs` present without the primary `mcs` convention
 *   dupes         two + un-marked (duplicateType-less) files for one topicSlug
 *   offSyllabus   files whose unit/topic is not in frontend/lib/syllabus.ts
 *   orphanUnits   unit directories that are not syllabus units at all
 */
import fs from "node:fs";
import path from "node:path";

import { CLASS_DIR_TO_SLUG } from "../../lib/content/schema/concept";
import { checkSyllabusRef, checkSyllabusUnit } from "../../lib/content/schema/syllabus-ref";
import { isPlaceholderContent } from "../../lib/content/placeholders";

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
const SRC = path.join(ROOT, "content", "ravikishan");
const FIX = process.argv.includes("--fix");

const REQUIRED = ["title", "unitSlug", "topicSlug", "topicTitle", "notes"];
const MAX_SAMPLES = 25;

interface Report {
  crlf: string[];
  missingRequired: string[];
  legacyKeys: string[];
  dupes: string[];
  offSyllabus: string[];
  orphanUnits: string[];
}

const report: Report = { crlf: [], missingRequired: [], legacyKeys: [], dupes: [], offSyllabus: [], orphanUnits: [] };

const rel = (p: string) => path.relative(ROOT, p).replaceAll(path.sep, "/");

for (const classDir of fs.readdirSync(SRC).sort()) {
  const classSlug = CLASS_DIR_TO_SLUG[classDir];
  const classPath = path.join(SRC, classDir);
  if (!classSlug || !fs.statSync(classPath).isDirectory()) continue;

  for (const subject of fs.readdirSync(classPath).sort()) {
    const subjectPath = path.join(classPath, subject);
    if (!fs.statSync(subjectPath).isDirectory()) continue;

    for (const unit of fs.readdirSync(subjectPath).sort()) {
      const unitPath = path.join(subjectPath, unit);
      if (!fs.statSync(unitPath).isDirectory()) continue;

      const unitRef = checkSyllabusUnit(classSlug, subject, unit);
      const conceptsDir = path.join(unitPath, "concepts");
      if (!unitRef.ok && fs.existsSync(conceptsDir)) {
        report.orphanUnits.push(`${subject}/${unit} — ${unitRef.reason}`);
      }

      if (!fs.existsSync(conceptsDir)) continue;
      const files = fs.readdirSync(conceptsDir).filter((f) => f.endsWith(".json"));
      if (files.length === 0) continue;

      const byTopic = new Map<string, string[]>();

      for (const f of files) {
        const p = path.join(conceptsDir, f);
        const text = fs.readFileSync(p, "utf8");
        if (text.includes("\r\n")) report.crlf.push(rel(p));

        let data: Record<string, unknown>;
        try {
          data = JSON.parse(text) as Record<string, unknown>;
        } catch {
          report.missingRequired.push(`${rel(p)} (unparseable)`);
          continue;
        }

        const placeholder = isPlaceholderContent(text);
        for (const k of REQUIRED) {
          if (data[k] === undefined && !placeholder) report.missingRequired.push(`${rel(p)} (${k})`);
        }
        if (Array.isArray(data.mcqs) && !Array.isArray(data.mcs)) {
          report.legacyKeys.push(`${rel(p)} (mcqs→mcs)`);
        }

        const topic = typeof data.topicSlug === "string" ? data.topicSlug : unit;
        const ref = placeholder ? { ok: true } : checkSyllabusRef(classSlug, subject, unit, topic);
        if (!ref.ok) report.offSyllabus.push(`${rel(p)} — ${ref.reason}`);

        const key = String(data.topicSlug ?? f);
        byTopic.set(key, [...(byTopic.get(key) ?? []), f]);
      }

      for (const [topic, fs_] of byTopic) {
        const originals: string[] = [];
        for (const f of fs_) {
          try {
            const d = JSON.parse(fs.readFileSync(path.join(conceptsDir, f), "utf8")) as { duplicateType?: unknown };
            if (!d.duplicateType) originals.push(f);
          } catch {
            /* already reported above */
          }
        }
        if (originals.length > 1) report.dupes.push(`${subject}/${unit}/${topic}: ${originals.join(", ")}`);
      }
    }
  }
}

let findings = 0;
for (const [section, list] of Object.entries(report) as [keyof Report, string[]][]) {
  findings += list.length;
  console.log(`${section}: ${list.length}`);
  for (const x of list.slice(0, MAX_SAMPLES)) console.log(`  ${x}`);
  if (list.length > MAX_SAMPLES) console.log(`  … and ${list.length - MAX_SAMPLES} more`);
}

if (FIX) {
  console.log(
    "\n--fix is intentionally scoped in Phase 2: use `content/repair.ts` for the four mechanical\n" +
      "defect classes, edit the rest by hand, then prove it with `content:build --check`.",
  );
}
process.exit(findings > 0 ? 1 : 0);
