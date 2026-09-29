/**
 * content-repair — apply `lib/content/repair.ts` rules to files the schema gate
 * rejects, after proving the result parses.
 *
 *   npx tsx frontend/scripts/content/repair.ts --dry     # default: report only
 *   npx tsx frontend/scripts/content/repair.ts --write   # rewrite fixed files
 *
 * Scope mirrors `validate.ts`: only concept notes (the mindmap tree is state-
 * classified, not repaired). A file is touched only when ALL of these hold:
 *   - it currently fails `ConceptNoteSchema`,
 *   - some repair rule changes it,
 *   - the repaired object parses clean.
 * Files that stay invalid are left untouched and reported — no partial writes.
 */
import fs from "node:fs";
import path from "node:path";
import { ConceptNoteSchema } from "../../lib/content/schema/concept";
import { repairNote } from "../../lib/content/repair";
import { isPlaceholderContent } from "../../lib/content/placeholders";

const WRITE = process.argv.includes("--write");
const QUIET = process.argv.includes("--quiet");

/** Works from the repo root AND from the frontend workspace. */
function findRepoRoot(): string {
  const starts = [process.argv[1] ? path.resolve(path.dirname(process.argv[1]), "..", "..", "..") : "", process.cwd()];
  for (const start of starts) {
    if (!start) continue;
    let dir = path.resolve(start);
    for (let i = 0; i < 4 && dir !== path.parse(dir).root; i++) {
      if (fs.existsSync(path.join(dir, "content", "ravikishan"))) return dir;
      dir = path.dirname(dir);
    }
  }
  console.error("repo root containing content/ravikishan not found");
  process.exit(2);
}

const REPO = findRepoRoot();
const CORPUS = path.join(REPO, "content", "ravikishan");

const isPlaceholder = isPlaceholderContent;

function collect(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) collect(f, out);
    else if (e.name.endsWith(".json") && e.name !== "plan.json" && !e.name.startsWith("_")) out.push(f);
  }
  return out;
}

const issuesOf = (err: { issues?: { path: (string | number)[]; message: string }[] }) =>
  (err.issues ?? []).slice(0, 4).map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);

const scanned = { files: 0, valid: 0, stillInvalid: 0, repaired: 0 };
const perRule = new Map<string, number>();
const problems: string[] = [];

for (const file of collect(CORPUS)) {
  const rel = path.relative(REPO, file).replaceAll(path.sep, "/");
  if (!/\/(class-\d+-notes)\/[^/]+\/[^/]+\/concepts\//.test(rel)) continue; // concepts only
  scanned.files++;

  const raw = fs.readFileSync(file, "utf8");
  if (isPlaceholder(raw)) continue; // generator stub, not repairable

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    continue; // not parseable JSON — the validator already reports it
  }
  if (ConceptNoteSchema.safeParse(parsed).success) {
    scanned.valid++;
    continue;
  }

  const { note, changes } = repairNote(parsed);
  const after = ConceptNoteSchema.safeParse(note);
  if (!changes.length || !after.success) {
    scanned.stillInvalid++;
    problems.push(`${rel}${changes.length ? "" : " (no rule applied)"}`);
    continue;
  }

  if (WRITE) fs.writeFileSync(file, JSON.stringify(note, null, 2) + "\n");
  scanned.repaired++;
  for (const c of changes) {
    perRule.set(c.rule, (perRule.get(c.rule) ?? 0) + 1);
    if (!QUIET) console.log(`${WRITE ? "fixed" : "WOULD FIX"} ${rel}\n  [${c.rule}] ${c.detail}`);
  }
}

console.log(`\nscanned ${scanned.files} concept files; ${scanned.repaired} ${WRITE ? "repaired" : "would be repaired"}, ${scanned.stillInvalid} still invalid`);
for (const [rule, n] of [...perRule].sort()) console.log(`  ${rule}: ${n}`);
if (scanned.stillInvalid) {
  console.log(`\nSTILL INVALID (${scanned.stillInvalid}) — manual fixes needed:`);
  for (const p of problems) console.log(`  ${p}`);
}
if (!WRITE) console.log(`\ndry run — re-run with --write to apply`);
process.exitCode = WRITE && scanned.stillInvalid ? 1 : 0;
