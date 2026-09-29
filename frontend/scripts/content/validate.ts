/**
 * content:validate — schema gate for the authored corpus.
 *
 *   npx tsx frontend/scripts/content/validate.ts                 # report
 *   npx tsx frontend/scripts/content/validate.ts --strict        # gate
 *   npx tsx frontend/scripts/content/validate.ts --write-baseline
 *
 * Four DISTINCT states are reported, because collapsing them is what makes
 * gates get switched off:
 *
 *   INVALID   schema rejected the file (a real defect — a typo'd key, a
 *             wrong-typed field). These are what `--strict` fails on.
 *   THIN      valid schema, but fewer than MIN_NOTES_FOR_BODY notes — an
 *             unfinished note, not a broken one.
 *   BODY      valid and has a body; still may be filler.
 *   EMPTY     the placeholder marker the generator leaves behind.
 *
 * The baseline ratchet lists known pre-existing INVALID files so Phase 1 can
 * fail on NEW violations from day one instead of being disabled while
 * hundreds of findings are worked through (PLANS.md §10).
 */
import fs from "node:fs";
import path from "node:path";

// Relative import: the schema tree deliberately avoids `@/` so this runs under
// plain tsx from the repo root without path-alias resolution (PLANS.md §3).
import { ConceptNoteSchema, MIN_NOTES_FOR_BODY } from "../../lib/content/schema/concept";
import { MindMapFileSchema } from "../../lib/content/schema/mindmap";
import { ManifestSchema } from "../../lib/content/schema/manifest";

// Resolve the repo root from this file's location so the CLI works no matter
// which directory it is invoked from (repo root via `npm run check:schema`, or
// the frontend workspace via `npm run content:validate`).
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

const REPO = findRepoRoot();
const CORPUS = path.join(REPO, "content", "ravikishan");
const BASELINE = path.join(REPO, "scripts", "content-schema-baseline.json");

const ARGS = process.argv.slice(2);
const STRICT = ARGS.includes("--strict");
const WRITE = ARGS.includes("--write-baseline");

/** Markers left by the content generator. */
const PLACEHOLDER_MARKERS = [
  "class 11 concept",
  "key point 1",
  "key formula 1",
  "[insert",
  "placeholder — run content generation",
  "mindmap placeholder",
];

type State = "INVALID" | "EMPTY" | "THIN" | "BODY";

interface Finding {
  file: string;
  state: State;
  reasons: string[];
}

function isPlaceholder(text: string): boolean {
  const low = text.toLowerCase();
  return PLACEHOLDER_MARKERS.some((m) => low.includes(m));
}

function collect(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) collect(f, out);
    else if (e.name.endsWith(".json") && e.name !== "plan.json" && !e.name.startsWith("_")) out.push(f);
  }
  return out;
}

function formatIssues(err: { issues?: { path: (string | number)[]; message: string }[] }): string[] {
  return (err.issues ?? []).slice(0, 4).map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
}

const findings: Finding[] = [];
/** Files outside the concept/mindmap trees — counted, never reported as violations. */
const other: string[] = [];

if (fs.existsSync(CORPUS)) {
  for (const file of collect(CORPUS)) {
    const rel = path.relative(REPO, file).replaceAll(path.sep, "/");

    // `content/ravikishan/` holds MORE THAN ONE tree:
    //
    //   class-11-notes/{subject}/{unit}/concepts/NN-slug.json  <- concept notes
    //   class-11-notes/{subject}/{unit}/mindmap/mindmap.json    <- mindmaps
    //   class-11/{subject}/pyqs/, /theory/                      <- DIFFERENT
    //                                                      shapes (exam banks)
    //
    // Applying ConceptNoteSchema to the third kind manufactures hundreds of
    // false positives — a schema error that isn't one. Scope is chosen by
    // path; anything else is counted as OUT-OF-SCOPE, not as a violation.
    const isConceptPath = /\/(class-\d+-notes)\/[^/]+\/[^/]+\/concepts\//.test(rel);
    const isMindmapPath = /\/(class-\d+-notes)\/[^/]+\/[^/]+\/mindmap\//.test(rel);

    if (!isConceptPath && !isMindmapPath) {
      other.push(rel);
      continue;
    }

    const raw = fs.readFileSync(file, "utf8");

    // Placeholder check FIRST: a generator-stub file is legitimately
    // incomplete, so reporting it as a schema violation would bury the real
    // finding under an "unrecognized key" entry. Only genuinely malformed
    // content should reach the schema.
    if (isPlaceholder(raw)) {
      findings.push({ file: rel, state: "EMPTY", reasons: ["generator placeholder markers present"] });
      continue;
    }

    const schema = isMindmapPath ? MindMapFileSchema : ConceptNoteSchema;

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      findings.push({ file: rel, state: "INVALID", reasons: [`JSON.parse: ${String(e).slice(0, 120)}`] });
      continue;
    }

    // A mindmap file with no `mindmap` core is UNFINISHED, not malformed: the
    // content may sit in `enrichedContent.notes` while the top-level
    // `notes`/`mindmap` the reader wants were never written. Measured: 28 such
    // files. Classifying them INVALID would mask an authoring gap as a schema
    // bug, and they would then be "fixed" by relaxing the schema.
    if (isMindmapPath) {
      const mm = parsed as { mindmap?: unknown; notes?: unknown };
      const hasCore =
        mm && typeof mm.mindmap === "object" && mm.mindmap !== null;
      const hasNotes = Array.isArray(mm?.notes) && (mm.notes as unknown[]).length > 0;
      if (!hasCore || !hasNotes) {
        findings.push({
          file: rel,
          state: "EMPTY",
          reasons: [
            !hasCore ? "no `mindmap` core block" : "",
            !hasNotes ? "no top-level `notes`" : "",
          ].filter(Boolean),
        });
        continue;
      }
    }

    const result = schema.safeParse(parsed);
    if (!result.success) {
      findings.push({ file: rel, state: "INVALID", reasons: formatIssues(result.error) });
      continue;
    }

    const note = parsed as { notes?: unknown[] };
    if (!Array.isArray(note.notes) || note.notes.length < MIN_NOTES_FOR_BODY) {
      findings.push({ file: rel, state: "THIN", reasons: [`notes: ${(note.notes ?? []).length} < ${MIN_NOTES_FOR_BODY}`] });
      continue;
    }
    // valid, placeholder-free, full body — recorded too, so `files scanned`
    // counts every file rather than only the ones that failed
    findings.push({ file: rel, state: "BODY", reasons: [] });
  }
}

// ── built manifests ──────────────────────────────────────────────────────
// The build writes these and nothing else validated them until now
// (PLANS.md §4.5): a manifest that drifts from ManifestEntrySchema silently
// breaks discovery (hasMcqs / noteCount / tab pairing) — exactly how the
// `mcs`/`mcqs` bug shipped. Gated alongside the corpus under --strict.
interface ManifestFinding {
  file: string;
  reasons: string[];
}
const manifestFindings: ManifestFinding[] = [];
let manifestCount = 0;
let manifestEntries = 0;
const builtRoot = path.join(REPO, "frontend", "public", "data", "syllabus-notes");
if (fs.existsSync(builtRoot)) {
  for (const subject of fs.readdirSync(builtRoot).sort()) {
    const mp = path.join(builtRoot, subject, "_manifest.json");
    if (!fs.existsSync(mp)) continue;
    manifestCount++;
    const rel = path.relative(REPO, mp).replaceAll(path.sep, "/");
    let parsedManifest: unknown;
    try {
      parsedManifest = JSON.parse(fs.readFileSync(mp, "utf8"));
    } catch (e) {
      manifestFindings.push({ file: rel, reasons: [`JSON.parse: ${String(e).slice(0, 120)}`] });
      continue;
    }
    if (Array.isArray(parsedManifest)) manifestEntries += parsedManifest.length;
    const res = ManifestSchema.safeParse(parsedManifest);
    if (!res.success) manifestFindings.push({ file: rel, reasons: formatIssues(res.error) });
  }
}

// ── report ───────────────────────────────────────────────────────────────
const relPath = (f: string) => path.relative(REPO, f).replaceAll(path.sep, "/");
const byState: Record<State, Finding[]> = { INVALID: [], EMPTY: [], THIN: [], BODY: [] };
for (const f of findings) byState[f.state].push(f);

console.log("=== content:validate ===");
console.log(
  `in-scope files: ${findings.length}   INVALID: ${byState.INVALID.length}   EMPTY: ${byState.EMPTY.length}   THIN: ${byState.THIN.length}   BODY: ${byState.BODY.length}`
);
console.log(`out-of-scope (other trees, not assessed): ${other.length}`);
console.log(
  `manifests: ${manifestCount}   entries: ${manifestEntries}   manifest violations: ${manifestFindings.length}`
);
const incomplete = byState.EMPTY.length + byState.THIN.length;
console.log(`schema violations: ${byState.INVALID.length}   incomplete notes (EMPTY+THIN): ${incomplete}`);

if (byState.INVALID.length) {
  console.log("\n-- INVALID (schema rejected) --");
  for (const f of byState.INVALID.slice(0, 40)) console.log(`  ${f.file}\n     ${f.reasons.join("\n     ")}`);
  if (byState.INVALID.length > 40) console.log(`  … and ${byState.INVALID.length - 40} more`);
}

if (manifestFindings.length) {
  console.log("\n-- INVALID manifests (built _manifest.json) --");
  for (const m of manifestFindings.slice(0, 10))
    console.log(`  ${m.file}\n     ${m.reasons.join("\n     ")}`);
}

const currentInvalid = byState.INVALID.map((f) => f.file).sort();

if (WRITE) {
  const baseline = {
    generatedAt: new Date().toISOString(),
    note: "Pre-existing INVALID files, baselined so `--strict` fails only on NEW violations.",
    invalid: currentInvalid,
    counts: { invalid: currentInvalid.length, empty: byState.EMPTY.length, thin: byState.THIN.length },
  };
  fs.mkdirSync(path.dirname(BASELINE), { recursive: true });
  fs.writeFileSync(BASELINE, JSON.stringify(baseline, null, 2) + "\n", "utf8");
  console.log(`\nbaseline written -> ${relPath(BASELINE)} (${currentInvalid.length} known invalid)`);
  process.exit(0);
}

if (!STRICT) process.exit(0);

// ── gate ─────────────────────────────────────────────────────────────────
if (!fs.existsSync(BASELINE)) {
  console.log("\nGATE: no baseline. Run `--write-baseline` once first.");
  process.exit(1);
}
const base = JSON.parse(fs.readFileSync(BASELINE, "utf8")) as { invalid?: string[] };
const known = new Set(base.invalid ?? []);
const newInvalid = currentInvalid.filter((f) => !known.has(f));

if (newInvalid.length) {
  console.log(`\nGATE: FAIL — ${newInvalid.length} new schema violation(s):`);
  for (const f of newInvalid.slice(0, 30)) console.log("  + " + f);
  process.exit(1);
}
if (manifestFindings.length) {
  console.log(`\nGATE: FAIL — ${manifestFindings.length} manifest(s) violate ManifestEntrySchema:`);
  for (const m of manifestFindings.slice(0, 10))
    console.log(`  ${m.file}\n     ${m.reasons.join("\n     ")}`);
  process.exit(1);
}
const fixed = [...known].filter((f) => !currentInvalid.includes(f)).length;
console.log(
  `\nGATE: PASS — no new violations (${currentInvalid.length} known, ${fixed} since baseline; ` +
    `EMPTY ${byState.EMPTY.length} / THIN ${byState.THIN.length} tracked separately; ` +
    `manifests ${manifestCount} clean, ${manifestEntries} entries)`
);
process.exit(0);

