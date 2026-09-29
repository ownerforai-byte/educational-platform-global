/**
 * rebuild-legacy-mindmaps — re-create the `content/ravikishan/**\/mindmap/mindmap.json`
 * branch files from their own unit's concept notes.
 *
 * The whole 59-file legacy corpus was scaffolded by an old generator: the
 * branches were generic ("Core Concepts → Fundamentals → Key Definitions,
 * Basic Theories, Historical Context", "Properties → Physical → State,
 * Melting/Boiling Points") and several files literally said
 * "Mindmap placeholder — run content generation to create actual mindmap data."
 * None of it named the unit it belonged to, and 27 files had no branches at all.
 *
 * Every unit already carries its own real content next to those files, in
 * `<unit>/concepts/*.json`. This tool rebuilds each mindmap from THAT: the
 * branches are the unit's own concept notes, the points are those notes' own
 * key points / formulas / exam pointers, and the summary lines are taken from
 * the notes instead of the placeholder sentence.
 *
 * Usage (from the repo root):
 *   node scripts/enrichment/rebuild-legacy-mindmaps.mjs           # rewrite
 *   node scripts/enrichment/rebuild-legacy-mindmaps.mjs --check   # fail if any file is still placeholder/empty
 *   node scripts/enrichment/rebuild-legacy-mindmaps.mjs --dry     # report only
 *
 * Deterministic and idempotent: running it twice produces byte-identical files.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const CORPUS = path.join(ROOT, "content", "ravikishan");

const CHECK = process.argv.includes("--check");
const DRY = process.argv.includes("--dry");

const MAX_BRANCHES = 5;
const MAX_POINTS = 5;

/**
 * Literal placeholder text. Kept narrow on purpose: the old scaffold's branch
 * labels ("Periodic Trends", "Environmental Impact", "Manufacturing
 * Processes") are ALSO real syllabus topics in their own units, so flagging
 * those words would reject genuine content.
 */
const PLACEHOLDER_RE =
  /\b(mindmap placeholder|run content generation|lorem ipsum|\btbd\b|to be added|coming soon|placeholder data)\b/i;

/** The old scaffolder's signature branch vocabulary, reported (not enforced). */
const SCAFFOLD_VOCAB = [
  "Key Definitions",
  "Basic Theories",
  "Historical Context",
  "Melting/Boiling Points",
];

const clip = (s, n) => {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  return t.length <= n ? t : `${t.slice(0, n - 1).replace(/\s+\S*$/, "")}…`;
};

const titleCase = (slug) =>
  String(slug || "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function listMindmaps(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) listMindmaps(p, out);
    else if (entry.name === "mindmap.json" && path.basename(path.dirname(p)) === "mindmap") out.push(p);
  }
  return out;
}

/** The unit's own concept notes, de-duplicated like the app does (lowest duplicateType). */
function loadUnitConcepts(unitDir) {
  const dir = path.join(unitDir, "concepts");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
  const byGroup = new Map();
  for (const f of files) {
    const data = readJson(path.join(dir, f));
    if (!data) continue;
    const key = data.tabGroup || data.topicSlug || f;
    const existing = byGroup.get(key);
    const dup = Number(data.duplicateType ?? 1);
    if (!existing || dup < Number(existing.data.duplicateType ?? 1)) byGroup.set(key, { file: f, data });
  }
  return [...byGroup.values()].map((v) => v.data);
}

/**
 * Unfilled slots in the source notes — "[insert from textbook]",
 * "[variable formula]". 14 units carry these in their formula arrays. The
 * mindmap must never inherit filler, so such points are dropped and counted.
 */
// Deliberately narrow: chemistry writes real bracketed notation ("[+ Envelope]")
// and must not be mistaken for an unfilled slot.
const UNFILLED_RE =
  /\[\s*(insert|variable|formula|add|to be|tbd|placeholder|from textbook|fill)[^\]]*\]|\binsert from\b|\bvariable formula\b|\bformula here\b/i;
const dropped = [];

const pickStrings = (value, limit) => {
  const out = [];
  for (const raw of Array.isArray(value) ? value : []) {
    const text = clip(typeof raw === "string" ? raw : JSON.stringify(raw), 110);
    if (!text) continue;
    if (UNFILLED_RE.test(text)) {
      dropped.push(text);
      continue;
    }
    out.push(text);
    if (out.length >= limit) break;
  }
  return out;
};

/** Build one branch per concept note, from that note's own content. */
function branchesFromConcepts(concepts, unitSlug) {
  const branches = [];
  // The corpus repeats the same sentences across a unit's tab variants, so
  // points are de-duplicated across the WHOLE file, not per branch.
  const seenPoints = new Set();
  const dedupe = (points) =>
    points.filter((p) => {
      const key = p.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      if (!key || seenPoints.has(key)) return false;
      seenPoints.add(key);
      return true;
    });

  for (const note of concepts) {
    if (branches.length >= MAX_BRANCHES) break;
    const title =
      clip(note.title || note.topicTitle || titleCase(note.topicSlug || unitSlug), 54) ||
      `Concept ${branches.length + 1}`;

    const subtopics = [];

    const keyPoints = dedupe(
      [
        ...pickStrings(note.keyPoints, MAX_POINTS),
        ...pickStrings(note.notes, MAX_POINTS),
        ...pickStrings(note.importantConcepts, MAX_POINTS),
      ].slice(0, MAX_POINTS * 2),
    ).slice(0, MAX_POINTS);
    if (keyPoints.length) subtopics.push({ name: "Key points", points: keyPoints });

    const formulas = dedupe(pickStrings(note.formulas, MAX_POINTS * 2)).slice(0, MAX_POINTS);
    if (formulas.length) subtopics.push({ name: "Formulas & relations", points: formulas });

    const statements = dedupe(pickStrings(note.importantStatements, 6)).slice(0, 3);
    if (statements.length) subtopics.push({ name: "Statements to quote", points: statements });

    const exam = dedupe(
      [
        ...pickStrings(note.examNotes, 3),
        ...pickStrings(note.examShortTricks, 3),
        ...pickStrings(note.importantNotes, 3),
      ].slice(0, MAX_POINTS * 2),
    ).slice(0, MAX_POINTS);
    if (exam.length) subtopics.push({ name: "Exam focus", points: exam });

    const traps = dedupe(pickStrings(note.confusion, 6)).slice(0, 3);
    if (traps.length) subtopics.push({ name: "Common misconceptions", points: traps });

    if (subtopics.length) branches.push({ topic: title, subtopics });
  }
  return branches;
}

/** Real summary lines from the unit's own notes — never the placeholder sentence. */
function summariesFromConcepts(concepts) {
  const out = [];
  for (const note of concepts) {
    for (const raw of [
      ...(Array.isArray(note.summary) ? note.summary : note.summary ? [note.summary] : []),
      ...(Array.isArray(note.notes) ? note.notes : []),
      ...(Array.isArray(note.keyPoints) ? note.keyPoints : []),
    ]) {
      const text = clip(raw, 160);
      if (!text || PLACEHOLDER_RE.test(text)) continue;
      if (!out.includes(text)) out.push(text);
      if (out.length >= 3) return out;
    }
  }
  return out;
}

function main() {
  const files = listMindmaps(CORPUS);
  let rewritten = 0;
  let alreadyOk = 0;
  const problems = [];

  // Census BEFORE touching anything, so the report shows what the corpus
  // looked like rather than describing its own output.
  let scaffolded = 0;
  let emptyBranches = 0;
  for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    if (SCAFFOLD_VOCAB.some((v) => original.includes(v))) scaffolded += 1;
    const parsed = readJson(file);
    const pts = (parsed?.mindmap?.branches ?? []).reduce(
      (n, b) => n + (b.subtopics ?? []).reduce((m, s) => m + (s.points ?? []).length, 0),
      0,
    );
    if (pts === 0) emptyBranches += 1;
  }

  for (const file of files) {
    const rel = path.relative(ROOT, file).replaceAll(path.sep, "/");
    const unitDir = path.dirname(path.dirname(file));
    const unitSlug = path.basename(unitDir);
    const existing = readJson(file);
    if (!existing) {
      problems.push(`${rel} — unparseable JSON`);
      continue;
    }

    const concepts = loadUnitConcepts(unitDir);
    const branches = branchesFromConcepts(concepts, unitSlug);
    const summaries = summariesFromConcepts(concepts);

    const pointCount = branches.reduce(
      (n, b) => n + b.subtopics.reduce((m, s) => m + s.points.length, 0),
      0,
    );
    const blob = JSON.stringify({ branches, summaries });

    if (!branches.length || pointCount === 0) {
      problems.push(`${rel} — unit has no concept notes to build branches from`);
      continue;
    }
    if (PLACEHOLDER_RE.test(blob)) {
      problems.push(`${rel} — generated branches still contain scaffold phrasing`);
      continue;
    }

    const next = {
      title: existing.title || `${unitSlug} Mindmap`,
      unitSlug: existing.unitSlug || unitSlug,
      topicSlug: existing.topicSlug || `${unitSlug}-mindmap`,
      topicTitle:
        existing.topicTitle && !/placeholder/i.test(existing.topicTitle)
          ? existing.topicTitle
          : `${titleCase(unitSlug)} — interactive concept map`,
      relevance:
        typeof existing.relevance === "number" && existing.relevance > 0
          ? existing.relevance
          : 100,
      notes: summaries.length ? summaries : [`${titleCase(unitSlug)}: see the unit's concept notes.`],
      uiConfig: existing.uiConfig ?? { allowZoom: true, showRefresh: true },
      mindmap: {
        centralConcept: String(unitSlug.replace(/[-_]+/g, " ")).toUpperCase(),
        branches,
      },
    };

    const before = fs.readFileSync(file, "utf8");
    const after = `${JSON.stringify(next, null, 2)}\n`;
    const same = before.replace(/\r\n/g, "\n") === after;
    const ok = pointCount > 0 && !PLACEHOLDER_RE.test(after);

    if (ok && same) {
      alreadyOk += 1;
      continue;
    }
    if (ok) {
      if (!DRY) fs.writeFileSync(file, after, "utf8");
      rewritten += 1;
    }
  }

  console.log("=== legacy mindmap rebuild ===");
  console.log(`files found:      ${files.length}`);
  console.log(`had scaffold branches: ${scaffolded}`);
  console.log(`had NO branch points:  ${emptyBranches}`);
  console.log(`already rebuilt:  ${alreadyOk}`);
  console.log(DRY ? `would rewrite:    ${rewritten}` : `rewritten:        ${rewritten}`);
  console.log(`unbuildable:      ${problems.length}`);
  for (const p of problems) console.log(`   ! ${p}`);
  if (dropped.length) {
    const units = new Set(
      files.filter((f) => {
        const unit = path.basename(path.dirname(path.dirname(f)));
        return dropped.some((d) => d.toLowerCase().includes(unit.slice(0, 6)));
      }),
    ).size;
    console.log(`\nfiller points dropped from the mindmaps: ${dropped.length}`);
    console.log(
      "  These come from unfilled slots in the source concept notes (e.g. " +
        `"${dropped[0].slice(0, 60)}"), which still need real content in the notes themselves.`,
    );
    void units;
  }

  if (CHECK && problems.length) {
    console.error(`\nFAIL: ${problems.length} legacy mindmap file(s) are still placeholder or empty.`);
    process.exit(1);
  }
  if (CHECK) console.log("\nOK: every legacy mindmap carries its own unit's branch content.");
}

main();
