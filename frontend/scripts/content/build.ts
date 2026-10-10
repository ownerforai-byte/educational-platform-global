/**
 * content:build — the single build path (PLANS.md §5.1).
 *
 *   npx tsx frontend/scripts/content/build.ts                # build all subjects
 *   npx tsx frontend/scripts/content/build.ts physics        # one subject
 *   npx tsx frontend/scripts/content/build.ts --check        # CI parity gate
 *
 * Port of content-tools/build-syllabus-notes.js with the plan's additions:
 *   - Zod validation on every input AND on the emitted manifest
 *   - `frontend/content-src/<class>/<subject>/<unit>/` takes precedence over
 *     authored JSON (`_generated.json` fragments from the Phase 5 Python
 *     pipeline land there too)
 *   - `--check` mode: builds to a temp dir and diffs against public/data
 *     (missing files, drifted bytes, and stale extras all fail)
 *
 * Byte parity: the legacy script writes `JSON.stringify(data, null, 2)` with NO
 * trailing newline, and so does this port. PLANS.md suggested adding `\n` and
 * accepting a 637-file whitespace commit; that churn was declined — parity
 * against the current tree means `--check` is green immediately instead of
 * after a mass rewrite. Divergence is deliberate; the code is the contract.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { CLASS_DIR_TO_SLUG, ConceptNoteSchema } from "../../lib/content/schema/concept";
import { ManifestSchema, contentHasMcqs } from "../../lib/content/schema/manifest";
import { isPlaceholderContent } from "../../lib/content/placeholders";
import { stripGeneratorJunk } from "../../lib/content/generator-junk";

/** Works from the repo root AND from the frontend workspace. */
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
const TS_SRC = path.join(ROOT, "frontend", "content-src");
const DEST = path.join(ROOT, "frontend", "public", "data", "syllabus-notes");

const ARGS = process.argv.slice(2);
const CHECK = ARGS.includes("--check");
const STRICT_EXTRAS = ARGS.includes("--strict-extras");
const SUBJECTS = ARGS.filter((a) => !a.startsWith("--"));

/**
 * Class dirs this build reads at all — copied files AND the emitted manifest.
 *
 * The built tree is FLAT per subject (`syllabus-notes/<subject>/<unit>/<file>`)
 * and both class tracks share it: readers (`topic-vertical-notes.tsx`,
 * `topic-content-index.ts`, the prefetcher) key the manifest on the SUBJECT
 * only, because a class-11 page and a class-12 page pass the same subject slug.
 * One manifest per class dir therefore cannot coexist — the second class pass
 * overwrote the first, leaving that class's notes on disk but unreachable
 * (every one of its topic pages rendered "Coming Soon").
 *
 * `class-11-notes` is the source, matching the legacy script this ports
 * (`content-tools/build-syllabus-notes.js`, whose SRC is exactly
 * `content/ravikishan/class-11-notes`). Class-12 notes stay reachable through
 * the inline `public/data/ravikishan/manifest.json` supplementary path that
 * `topic-vertical-notes.tsx` already consults; unioning both classes into the
 * manifest would also expose class-12 topics with no curated high-yield
 * fact-bank entry, which `tests/lib/high-yield-topic-facts.test.ts` guards.
 */
const BUILD_CLASS_DIRS = ["class-11-notes"];

type Note = { file: string; data: Record<string, unknown> };

/** Authored JSON for one unit, schema-validated. Order follows readdir. */
function readConcepts(classDir: string, subject: string, unit: string): Note[] {
  const concepts = path.join(SRC, classDir, subject, unit, "concepts");
  if (!fs.existsSync(concepts)) return [];
  const out: Note[] = [];
  for (const f of fs.readdirSync(concepts).filter((x) => x.endsWith(".json"))) {
    const p = path.join(concepts, f);
    const rawText = fs.readFileSync(p, "utf8");
    let raw: unknown;
    try {
      raw = JSON.parse(rawText);
    } catch (e) {
      throw new Error(`${subject}/${unit}/${f}: invalid JSON — ${String(e).slice(0, 120)}`);
    }
    const parsed = ConceptNoteSchema.safeParse(raw);
    if (!parsed.success) {
      // Generator stubs (placeholder markers) are "unfinished, not broken" —
      // the same carve-out `validate.ts` uses. They still get copied through so
      // the built tree matches the corpus; they just skip schema enforcement.
      if (isPlaceholderContent(rawText)) {
        console.warn(`  ! placeholder copied without schema pass: ${subject}/${unit}/${f}`);
        out.push({ file: f, data: raw as Record<string, unknown> });
        continue;
      }
      const issues = parsed.error.issues
        .slice(0, 4)
        .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("; ");
      throw new Error(`${subject}/${unit}/${f} violates ConceptNoteSchema — ${issues}`);
    }
    out.push({ file: f, data: raw as Record<string, unknown> });
  }
  return out;
}

/**
 * Typed authoring / generation output for one unit. When this returns notes,
 * they are the SOLE source for that unit (PLANS.md §5.2 precedence rule) and
 * the authored JSON is ignored — but stays on disk until deleted deliberately.
 */
async function fromContentSrc(classSlug: string, subject: string, unit: string): Promise<Note[]> {
  const dir = path.join(TS_SRC, classSlug, subject, unit);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts") || f.endsWith(".json")).sort();
  const out: Note[] = [];
  for (const f of files) {
    const p = path.join(dir, f);
    let data: unknown;
    if (f.endsWith(".json")) {
      try {
        data = JSON.parse(fs.readFileSync(p, "utf8"));
      } catch (e) {
        throw new Error(`content-src ${subject}/${unit}/${f}: invalid JSON — ${String(e).slice(0, 120)}`);
      }
    } else {
      // `import()` of a `.ts` file works under tsx; pathToFileURL keeps Windows
      // drive letters valid as module specifiers.
      const mod = (await import(pathToFileURL(p).href)) as { default?: unknown };
      data = mod.default ?? mod;
    }
    const parsed = ConceptNoteSchema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.issues
        .slice(0, 4)
        .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("; ");
      throw new Error(`content-src ${subject}/${unit}/${f} violates ConceptNoteSchema — ${issues}`);
    }
    out.push({ file: `${f.replace(/\.(ts|json)$/, "")}.json`, data: data as Record<string, unknown> });
  }
  return out;
}


/** Writes one file, or — in `--check` mode — records the expected bytes. */
const expected = new Map<string, string>();
function emit(outRoot: string, rel: string, data: unknown) {
  // Generator frames ("**X:** Class 11 concept.", "Core point for X.") are never
  // knowledge: the backend strips them for the tutor, and the topic workspace
  // must not display them either. Both writers of this tree go through here, so
  // the working write and `--check` stay byte-identical.
  const body = JSON.stringify(stripGeneratorJunk(data), null, 2); // NO trailing newline — legacy parity
  if (CHECK) {
    expected.set(rel.replaceAll(path.sep, "/"), body);
    return;
  }
  const target = path.join(outRoot, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, body);
}

/**
 * Build one subject into `outRoot` and emit its `_manifest.json`.
 *
 * The built tree is FLAT per subject (`syllabus-notes/<subject>/<unit>/<file>`)
 * and both class tracks share it: the reader (`topic-vertical-notes.tsx`,
 * `topic-content-index.ts`) filters the manifest by `unitSlug` only, because a
 * class-11 page and a class-12 page pass the same subject slug. So a second
 * build pass over another class dir would silently overwrite the manifest and
 * strand that class's notes on disk (pages rendered "Coming Soon" over a
 * populated corpus) — hence the single source dir in `BUILD_CLASS_DIRS`.
 */
async function buildSubject(subject: string, outRoot: string): Promise<number> {
  const classDirs = BUILD_CLASS_DIRS.filter((classDir) =>
    fs.existsSync(path.join(SRC, classDir, subject)),
  );

  const manifest: Record<string, unknown>[] = [];
  let copied = 0;

  for (const classDir of classDirs) {
    const classSlug = CLASS_DIR_TO_SLUG[classDir] ?? classDir;
    const subjectDir = path.join(SRC, classDir, subject);
    const units = fs
      .readdirSync(subjectDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const unit of units) {
      const tsNotes = await fromContentSrc(classSlug, subject, unit);
      const notes = tsNotes.length > 0 ? tsNotes : readConcepts(classDir, subject, unit);
      if (notes.length === 0) continue;

      // Group: original = no duplicateType; variant = duplicateType + tabGroup
      const originals = new Map<string, Note>();
      for (const n of notes) if (!n.data.duplicateType) originals.set(String(n.data.topicSlug), n);

      for (const n of notes) {
        const isVariant = Boolean(n.data.duplicateType && n.data.tabGroup);
        const paired = isVariant && originals.has(String(n.data.tabGroup));
        // Variants stay variants even when their tabGroup does not pair with an
        // original in the same unit — the UI still renders them as extra tabs.
        const duplicateType = isVariant ? Number(n.data.duplicateType) : 1;
        const topicSlug = isVariant && paired ? String(n.data.tabGroup) : String(n.data.topicSlug);
        const filename = paired ? n.file.replace(/\.json$/, `-${n.data.duplicateType}.json`) : n.file;

        // Count on the CLEANED payload: the manifest's `noteCount` is shown to
        // students ("N notes"), so counting frame-only lines would keep the
        // exact inflation the stripping exists to end.
        const cleaned = stripGeneratorJunk(n.data);
        emit(outRoot, path.join(subject, unit, filename), cleaned);
        copied++;

        const blocks = Array.isArray(cleaned.blocks) ? cleaned.blocks : [];
        manifest.push({
          unitSlug: unit,
          topicSlug,
          title: cleaned.title || cleaned.topicTitle || topicSlug,
          noteCount: Array.isArray(cleaned.notes) ? cleaned.notes.length : 0,
          source: "ravikishan",
          duplicateType,
          filename,
          ...(cleaned.tabGroup ? { tabGroup: cleaned.tabGroup } : {}),
          hasMcqs: contentHasMcqs(cleaned as { mcs?: { length: number } | null; mcqs?: { length: number } | null }),
          universalFactsCount: Array.isArray(cleaned.universalFacts) ? cleaned.universalFacts.length : 0,
          ...(blocks.length ? { blockCount: blocks.length } : {}),
        });
      }
    }
  }

  if (manifest.length === 0) return 0;

  manifest.sort(
    (a, b) =>
      String(a.unitSlug ?? "").localeCompare(String(b.unitSlug ?? "")) ||
      String(a.topicSlug ?? "").localeCompare(String(b.topicSlug ?? "")) ||
      Number(a.duplicateType ?? 1) - Number(b.duplicateType ?? 1),
  );

  const checked = ManifestSchema.safeParse(manifest);
  if (!checked.success) {
    const issues = checked.error.issues
      .slice(0, 4)
      .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("; ");
    throw new Error(`${subject}/_manifest.json violates ManifestSchema — ${issues}`);
  }

  emit(outRoot, path.join(subject, "_manifest.json"), manifest);
  console.log(
    `${subject}: ${manifest.length} manifest entries, ${copied} files ${CHECK ? "checked" : "copied"} (${classDirs.join(" + ")})`,
  );
  return manifest.length;
}

/**
 * `--check`: every file this build produces must exist byte-identical. Files in
 * `public/data/syllabus-notes/` that this build does NOT produce are reported
 * separately and do not fail the gate by default: the tree may carry files with
 * no source in `content/ravikishan`. The 2026-10-10 consolidation imported the
 * old hand-managed second family (131 files) into the corpus and pruned the
 * superseded copies, so exactly ONE extra remains today:
 * `physics/heat-and-temperature/heat-and-temperature.json` (159 notes, over
 * the schema 80-note cap — it needs its own splitting pass before import).
 * Pass `--strict-extras` to fail on extras too.
 */
function diffTree(): { problems: string[]; extras: string[] } {
  const problems: string[] = [];
  const walk = (dir: string, out: string[] = []): string[] => {
    if (!fs.existsSync(dir)) return out;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) walk(f, out);
      else if (e.name.endsWith(".json")) out.push(path.relative(DEST, f).replaceAll(path.sep, "/"));
    }
    return out;
  };
  const actual = new Set(walk(DEST));
  for (const [rel, body] of expected) {
    if (!actual.has(rel)) {
      problems.push(`missing: ${rel}`);
      continue;
    }
    actual.delete(rel);
    const onDisk = fs.readFileSync(path.join(DEST, rel), "utf8");
    if (onDisk !== body) problems.push(`drift: ${rel}`);
  }
  return { problems, extras: [...actual].sort() };
}

async function main() {
  const staging = CHECK ? fs.mkdtempSync(path.join(ROOT, ".content-build-check-")) : DEST;
  try {
    let total = 0;
    const subjects = new Set<string>();
    for (const classDir of BUILD_CLASS_DIRS) {
      const classPath = path.join(SRC, classDir);
      if (!fs.existsSync(classPath)) continue;
      for (const subject of fs.readdirSync(classPath).sort()) {
        if (!fs.statSync(path.join(classPath, subject)).isDirectory()) continue;
        subjects.add(subject);
      }
    }
    for (const subject of [...subjects].sort()) {
      if (SUBJECTS.length && !SUBJECTS.includes(subject)) continue;
      total += await buildSubject(subject, staging);
    }
    if (CHECK) {
      const { problems, extras } = diffTree();
      if (STRICT_EXTRAS) for (const e of extras) problems.push(`stale (not produced by this build): ${e}`);
      if (problems.length) {
        console.error(`\nbuild parity FAILED — ${problems.length} difference(s):`);
        for (const p of problems.slice(0, 40)) console.error(`  ${p}`);
        process.exit(1);
      }
      if (extras.length) {
        console.log(`${extras.length} file(s) in public/data are not produced by this build (second content family; not gated):`);
        for (const e of extras.slice(0, 10)) console.log(`  ${e}`);
        if (extras.length > 10) console.log(`  … and ${extras.length - 10} more`);
      }
      console.log("build parity OK — public/data matches the corpus byte-for-byte");
    } else {
      console.log(`Done. ${total} manifest entries across all subjects.`);
    }
  } finally {
    if (CHECK) fs.rmSync(staging, { recursive: true, force: true });
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
