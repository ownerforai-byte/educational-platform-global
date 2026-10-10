/**
 * merge-related-notes — find the relations between note files across scopes,
 * merge each related group into ONE deeper note, and report what is left thin.
 *
 *   npx tsx scripts/merge-related-notes.ts            # dry run + report
 *   npx tsx scripts/merge-related-notes.ts --apply    # write the merges
 *
 * RELATIONS (how two notes are recognised as the SAME topic)
 * ---------------------------------------------------------
 *  A. same topic identity   — same family dir (concepts|graph|examples|formula),
 *     same class family (class-11 / class-11e / class-11-notes collapse to
 *     `class-11`), same subject, same normalised unit name, and the same topic
 *     key (the `topicSlug` field, or the filename with its numeric prefix and
 *     variant suffixes stripped). This catches both intra-scope generator
 *     duplicates (`02-x.json` + `02-x-2.json` + `03-x.json`) and cross-scope
 *     mirrors (`class-11/physics/unit-3-kinematics/03-relative-velocity.json`
 *     ↔ `class-11-notes/physics/kinematics/02-relative-velocity.json`).
 *  B. identical content     — same fingerprint (sorted set of real note strings
 *     + question prompts) anywhere in the same class family + subject.
 *     Catches copies under different slugs (`limits5-1.json` ≡ `limits5-2.json`).
 *  C. near-duplicate names  — ≥0.6 token overlap between topic keys in the same
 *     scope, accepted as a relation ONLY when one file's real content is a
 *     subset of the other's (a true duplicate); otherwise reported, not merged.
 *  D. stem prefix pairs     — one FILE STEM is exactly a prefix of another in
 *     the same scope+family (`02-fungi` ⊂ `02-fungi-general-introduction-…`):
 *     the generator wrote the same topic under a short and a long name. The
 *     prefix keeps the numeric index identical (far stricter than a token
 *     overlap), and unlike rule A it does not require the topicSlug fields to
 *     agree — they usually don't (short name → short slug, long → long), which
 *     is exactly why these pairs used to slip through every rule.
 *
 * MERGE (how a group becomes one deeper note)
 * -------------------------------------------
 *  - canonical file: `class-*-notes` scope wins (the corpus the build reads),
 *    then the most real notes, then a non-variant name (no `duplicateType`).
 *  - every content list is unioned (notes, keyPoints, formulas, examples,
 *    practice, mcs, questions, …) with junk lines dropped (the generator-frame
 *    rules of `frontend/lib/content/generator-junk.ts` plus the placeholder
 *    markers of `scripts/audit-empty-scopes.mjs` — the build already strips
 *    these at emit time, so they are never knowledge and never preserved).
 *  - nothing real is lost: every non-junk string of every absorbed member must
 *    survive into the merged note, else the group is refused and reported.
 *  - the merged note must pass `ConceptNoteSchema` (gated corpus), must keep
 *    ≥1 note, and a dropped `topicSlug` must not be a syllabus-referenced slug.
 *
 * SAFETY (what can never get worse)
 * --------------------------------
 *  The empty-scope audit's own classification is recomputed on the simulated
 *  post-merge tree: the global placeholder count must not rise and no scope
 *  that was CLEAN may become unclean. Groups that would break either invariant
 *  are dropped from the plan (and listed in the report) before anything is
 *  written. `--apply` then:
 *    1. rewrites the canonical source files (preserving each file's own
 *       line-ending / trailing-newline convention),
 *    2. deletes the absorbed duplicates,
 *    3. syncs both `ravikishan/_index.json` copies and
 *       `frontend/public/data/ravikishan/manifest.json` (byte-stable:
 *       sorted keys, 2-space indent, CRLF, trailing newline),
 *    4. deletes only the runtime-mirror files whose emitted name maps to an
 *       absorbed source (`frontend/public/data/syllabus-notes/...`), leaving
 *       the hand-managed second content family untouched.
 *
 * The relation map and the before/after accounting land in
 * `reports/note-relations.json` on every run.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

import { ConceptNoteSchema } from "../frontend/lib/content/schema/concept";
import { isGeneratorJunkLine } from "../frontend/lib/content/generator-junk";

const ROOT = process.cwd();
const RK = path.join(ROOT, "content", "ravikishan");
const APPLY = process.argv.includes("--apply");
const REPORT = path.join(ROOT, "reports", "note-relations.json");

if (!fs.existsSync(RK)) {
  console.error("merge-related-notes: content/ravikishan not found — run from the repo root");
  process.exit(2);
}

/* ───────────────────────── junk classification ───────────────────────── */

/** Placeholder markers, kept in sync with scripts/audit-empty-scopes.mjs. */
const MARKERS = [
  "class 11 concept", "key point 1", "key formula 1", "option a describing",
  "[insert", "[variable formula]", "placeholder", "run content generation",
  "connects to other topics", "distinguish concepts in", "check formula conditions",
  "solve 5 problems on", "derive the key formula for", "appears in exams",
  "foundational for advanced topics", "daily life use of", "core principle of",
  "check conditions for", "significant marks", "correct definition",
  "related concept", "incorrect description", "numerical problem on",
  "key formula for", "learn definitions, formulas, practice",
];

/** A content line is junk when either rule set recognises a generator frame. */
function isJunkLine(line: string): boolean {
  const low = line.toLowerCase();
  if (MARKERS.some((m) => low.includes(m))) return true;
  return isGeneratorJunkLine(line);
}

const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();
function realStrings(data: Record<string, unknown>): string[] {
  const out: string[] = [];
  const walk = (v: unknown): void => {
    if (typeof v === "string") {
      const n = norm(v);
      if (n && !isJunkLine(v)) out.push(n);
    } else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(data);
  return out;
}
/**
 * Knowledge-bearing strings only. Identity/metadata strings (title, topicTitle,
 * topicSlug, unitSlug, tabGroup, visualType, …) are labels, not knowledge — two
 * scopes may legitimately spell a title differently — so the "nothing real is
 * lost" guarantee is measured on CONTENT keys alone.
 */
const CONTENT_KEYS = new Set<string>([
  "notes", "keyPoints", "formulas", "examples", "practice", "practiceQuestions",
  "universalFacts", "specialNotes", "importantStatements", "importantNotes",
  "examShortTricks", "examNotes", "importantConcepts", "importantTasks", "numericals",
  "confusion", "summary", "mcs", "mcqs", "questions", "blocks", "formulaSpecs",
]);
function contentStrings(data: Record<string, unknown>): string[] {
  const out: string[] = [];
  for (const [k, v] of Object.entries(data)) {
    if (!CONTENT_KEYS.has(k)) continue;
    const walk = (x: unknown): void => {
      if (typeof x === "string") { const n = norm(x); if (n && !isJunkLine(x)) out.push(n); }
      else if (Array.isArray(x)) x.forEach(walk);
      else if (x && typeof x === "object") Object.values(x).forEach(walk);
    };
    walk(v);
  }
  return out;
}
function junkCount(data: Record<string, unknown>): number {
  let n = 0;
  const walk = (v: unknown): void => {
    if (typeof v === "string") { if (norm(v) && isJunkLine(v)) n++; }
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(data);
  return n;
}

/* ───────────────────────── file inventory ───────────────────────── */

type Rec = {
  rel: string;              // corpus-relative, forward slashes
  abs: string;
  cls: string;
  subject: string;
  unit: string;
  family: string;           // concepts | graph | examples | formula
  data: Record<string, unknown>;
  hadCrlf: boolean;
  hadTrailingNl: boolean;
};

const FAMILIES = new Set(["concepts", "graph", "examples", "formula"]);
const recs: Rec[] = [];

(function walk(dir: string) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) { walk(abs); continue; }
    if (!e.name.endsWith(".json") || e.name.startsWith("_") || e.name === "plan.json") continue;
    const rel = path.relative(RK, abs).split(path.sep).join("/");
    const parts = rel.split("/");
    if (parts.length !== 5) continue; // cls/subject/unit/family/file
    const [cls, subject, unit, family] = parts;
    if (!FAMILIES.has(family)) continue;
    let data: Record<string, unknown>;
    try { data = JSON.parse(fs.readFileSync(abs, "utf8")); } catch { continue; }
    const raw = fs.readFileSync(abs);
    recs.push({
      rel, abs, cls, subject, unit, family, data,
      hadCrlf: raw.includes(0x0d),
      hadTrailingNl: raw.length > 1 && (raw[raw.length - 1] === 0x0a),
    });
  }
})(RK);

/* ───────────────────────── identity keys ───────────────────────── */

const normUnit = (u: string) =>
  u.toLowerCase().replace(/^unit-\d+-/, "").replace(/^\d+-/, "").replace(/-12$/, "").replace(/-\d+$/, "").replace(/_/g, "-");
const clsFam = (c: string) => c.replace(/-notes$/, "").replace(/e$/, ""); // class-11e → class-11

function topicKey(r: Rec): string {
  const slug = r.data.topicSlug;
  if (typeof slug === "string" && slug.trim()) return slug.trim().toLowerCase();
  return r.rel.split("/").pop()!.replace(/\.json$/, "").replace(/^\d+-/, "").replace(/-(\d+)(-\d+)*$/, "").toLowerCase();
}
const clusterKey = (r: Rec) => `${r.family}|${clsFam(r.cls)}|${r.subject}|${normUnit(r.unit)}|${topicKey(r)}`;
const tokenSet = (s: string) => new Set(s.split(/[^a-z0-9]+/).filter(Boolean));
function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}
/**
 * Content-only fingerprint: identity strings (title, topicSlug, …) are labels,
 * so two copies of the same note filed under different names hash equal —
 * exactly relation B's job ("limits5-1 ≡ limits5-2"). Empty content hashes to
 * "" and never matches anything. Scoped to one unit (see the key below): two
 * thin scaffolds in different units may share generic text and must never merge.
 */
const fingerprint = (r: Rec) => {
  const cs = contentStrings(r.data);
  if (!cs.length) return "";
  return crypto.createHash("sha1").update(cs.sort().join("\u0000")).digest("hex");
};

/* ───────────────────────── relation groups (union-find) ───────────────────────── */

/**
 * build.ts's pairing rule, verbatim: a variant tab is paired with an original
 * only when the SAME unit holds a non-variant file whose topicSlug equals the
 * variant's tabGroup. A tabGroup that names no original in its unit is an inert
 * label ("Atomic-Structure-Learner-Notes") and never refuses a merge.
 */
const originalSlugsByUnit = new Map<string, Set<string>>();
for (const r of recs) {
  if (r.data.duplicateType) continue;
  const k = `${r.cls}/${r.subject}/${r.unit}`;
  if (!originalSlugsByUnit.has(k)) originalSlugsByUnit.set(k, new Set());
  const s = r.data.topicSlug;
  if (typeof s === "string" && s.trim()) originalSlugsByUnit.get(k)!.add(s.trim().toLowerCase());
}

const parent = new Map<string, string>();
const find = (x: string): string => { let p = x; while (parent.get(p) !== p) p = parent.get(p)!; return p; };
const union = (a: string, b: string) => { const ra = find(a), rb = find(b); if (ra !== rb) parent.set(ra, rb); };
for (const r of recs) parent.set(r.rel, r.rel);

// A. same topic identity
const byCluster = new Map<string, Rec[]>();
for (const r of recs) {
  const k = clusterKey(r);
  if (!byCluster.has(k)) byCluster.set(k, []);
  byCluster.get(k)!.push(r);
}
for (const group of byCluster.values())
  for (let i = 1; i < group.length; i++) union(group[0].rel, group[i].rel);

// B. identical content fingerprint (same class family + subject + unit + family)
const byPrint = new Map<string, Rec[]>();
for (const r of recs) {
  const fp = fingerprint(r);
  if (!fp) continue;
  const k = `${r.family}|${clsFam(r.cls)}|${r.subject}|${normUnit(r.unit)}|${fp}`;
  if (!byPrint.has(k)) byPrint.set(k, []);
  byPrint.get(k)!.push(r);
}
for (const group of byPrint.values())
  for (let i = 1; i < group.length; i++) union(group[0].rel, group[i].rel);

// C. near-duplicate names — related only when one side's real content is a subset
const fuzzyReported: { a: string; b: string; score: number; merged: boolean }[] = [];
for (const [k, group] of byCluster) {
  // compare across neighbouring keys inside the same scope+family
  const [family, fam, subject, unit] = k.split("|");
  const neighbours = recs.filter(
    (r) => r.family === family && clsFam(r.cls) === fam && r.subject === subject && normUnit(r.unit) === unit,
  );
  for (let i = 0; i < group.length; i++) {
    for (const other of neighbours) {
      if (group.includes(other)) continue;
      const score = jaccard(tokenSet(topicKey(group[i])), tokenSet(topicKey(other)));
      if (score < 0.6) continue;
      const a = realStrings(group[i].data), b = new Set(realStrings(other.data));
      const subset = a.length > 0 && a.every((s) => b.has(s)) ? "a⊆b"
        : b.size > 0 && [...b].every((s) => new Set(a).has(s)) ? "b⊆a" : null;
      if (subset) {
        union(group[i].rel, other.rel);
        fuzzyReported.push({ a: group[i].rel, b: other.rel, score: Math.round(score * 100) / 100, merged: true });
      } else {
        fuzzyReported.push({ a: group[i].rel, b: other.rel, score: Math.round(score * 100) / 100, merged: false });
      }
    }
  }
}

// D. stem prefix pairs — same scope+family, one stem exactly prefixes another
const byStemScope = new Map<string, Rec[]>();
for (const r of recs) {
  const k = `${r.family}|${clsFam(r.cls)}|${r.subject}|${normUnit(r.unit)}`;
  if (!byStemScope.has(k)) byStemScope.set(k, []);
  byStemScope.get(k)!.push(r);
}
for (const group of byStemScope.values()) {
  for (const a of group) {
    const sa = a.rel.split("/").pop()!.replace(/\.json$/, "");
    if (sa.length < 5) continue; // guards tiny stems like `n1` from swallowing neighbours
    for (const b of group) {
      if (a === b) continue;
      const sb = b.rel.split("/").pop()!.replace(/\.json$/, "");
      if (sb.startsWith(sa)) union(a.rel, b.rel);
    }
  }
}

const groups = new Map<string, Rec[]>();
for (const r of recs) {
  const root = find(r.rel);
  if (!groups.has(root)) groups.set(root, []);
  groups.get(root)!.push(r);
}
const mergeGroups = [...groups.values()].filter((g) => g.length > 1);

/* ───────────────────────── audit classification (before/after) ───────────────────────── */

const MIN_NOTES = 4;
type State = "NO_FILES" | "BROKEN" | "PLACEHOLDER_ONLY" | "MIXED" | "THIN" | "CLEAN";
const ORDER: Record<State, number> = { NO_FILES: 0, BROKEN: 1, PLACEHOLDER_ONLY: 2, MIXED: 3, THIN: 4, CLEAN: 5 };

function classify(files: Record<string, unknown>[]): { state: State; placeholder: number; thin: number } {
  if (!files.length) return { state: "NO_FILES", placeholder: 0, thin: 0 };
  let placeholder = 0, thin = 0, authored = 0;
  for (const d of files) {
    const raw = JSON.stringify(d);
    const notes = Array.isArray(d.notes) ? d.notes.length : 0;
    const questions = Array.isArray(d.questions)
      ? d.questions.filter((q: unknown) => q && typeof (q as { question?: string }).question === "string" && (q as { question: string }).question.trim()).length
      : 0;
    const isBank = questions > 0 && !Array.isArray(d.notes);
    if (MARKERS.some((m) => raw.toLowerCase().includes(m))) placeholder++;
    else if (isBank) authored++;
    else if (notes < MIN_NOTES) thin++;
    else authored++;
  }
  if (placeholder && placeholder === files.length) return { state: "PLACEHOLDER_ONLY", placeholder, thin };
  if (placeholder) return { state: "MIXED", placeholder, thin };
  if (thin) return { state: "THIN", placeholder, thin };
  return { state: "CLEAN", placeholder, thin };
}

/** scope dir (cls/subject/unit) → its file records */
const scopes = new Map<string, Rec[]>();
for (const r of recs) {
  const k = `${r.cls}/${r.subject}/${r.unit}`;
  if (!scopes.has(k)) scopes.set(k, []);
  scopes.get(k)!.push(r);
}

/* ───────────────────────── merge construction ───────────────────────── */

/** Syllabus-referenced topic slugs must never disappear (they are routes). */
const syllabusSrc = fs.existsSync(path.join(ROOT, "frontend", "lib", "syllabus.ts"))
  ? fs.readFileSync(path.join(ROOT, "frontend", "lib", "syllabus.ts"), "utf8")
  : "";
const referencedSlug = (slug: string) => syllabusSrc.includes(`"${slug}"`);

type PlanEntry = {
  key: string;
  canonical: string;
  absorbed: string[];
  mergedNotes: number;
  junkDropped: number;
  slugsDropped: string[];
  status: "merged" | "refused";
  reason?: string;
  before?: string;
  after?: string;
};

const LIST_KEYS = new Set([
  "notes", "keyPoints", "formulas", "examples", "practice", "practiceQuestions",
  "universalFacts", "specialNotes", "importantStatements", "importantNotes",
  "examShortTricks", "examNotes", "importantConcepts", "importantTasks", "numericals",
  "confusion",
]);
const OBJ_LIST_KEYS = new Set(["mcs", "mcqs", "questions", "blocks", "formulaSpecs"]);

function mergeGroup(group: Rec[]): { merged: Record<string, unknown> | null; junkDropped: number; slugsDropped: string[]; reason?: string } {
  // canonical: -notes scope first, then a clean (non-variant) name, then most
  // real content, then shortest path — content is unioned anyway, so the
  // survivor should read like a normal note file.
  const score = (r: Rec) => [
    r.cls.endsWith("-notes") ? 1 : 0,
    r.data.duplicateType ? 0 : 1,
    realStrings(r.data).length,
    -r.rel.length,
  ];
  const sorted = [...group].sort((a, b) => {
    const sa = score(a), sb = score(b);
    for (let i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return sb[i] - sa[i];
    return a.rel.localeCompare(b.rel);
  });
  const canon = sorted[0];

  // A variant whose tabGroup pairs with a DIFFERENT original in its own unit
  // (build.ts's rule) is that topic's tab and may not be absorbed here. An
  // unpaired tabGroup is an inert label and merges freely.
  const key = topicKey(canon);
  const groupKeys = new Set(group.map((r) => topicKey(r)));
  for (const r of group) {
    const tg = typeof r.data.tabGroup === "string" ? r.data.tabGroup.trim().toLowerCase() : "";
    if (!r.data.duplicateType || !tg) continue;
    const unitOriginals = originalSlugsByUnit.get(`${r.cls}/${r.subject}/${r.unit}`) ?? new Set<string>();
    if (unitOriginals.has(tg) && !groupKeys.has(tg)) {
      return { merged: null, junkDropped: 0, slugsDropped: [], reason: `variant ${r.rel} tabGroup→"${r.data.tabGroup}" pairs with another topic's original in its unit` };
    }
  }

  const merged: Record<string, unknown> = { ...canon.data };
  let junkDropped = junkCount(canon.data);
  const slugsDropped: string[] = [];

  // content lists: union — strings junk-filtered + deduped on normalised text,
  // non-string items (legacy objects inside a list) kept on JSON identity so
  // nothing real is ever dropped. A scalar string is treated as a 1-item list.
  const listKeys = new Set<string>(LIST_KEYS);
  for (const r of group) for (const k of Object.keys(r.data)) if (LIST_KEYS.has(k)) listKeys.add(k);
  for (const k of listKeys) {
    const seen = new Set<string>();
    const out: unknown[] = [];
    for (const r of sorted) {
      const raw = r.data[k];
      if (raw === undefined || raw === null) continue;
      const items = Array.isArray(raw) ? raw : [raw];
      for (const item of items) {
        if (item === undefined || item === null) continue;
        if (typeof item === "string") {
          if (isJunkLine(item)) { junkDropped++; continue; }
          const n = norm(item);
          if (!n || seen.has(n)) continue;
          seen.add(n);
          out.push(item);
        } else {
          const id = JSON.stringify(item);
          if (seen.has(id)) continue;
          seen.add(id);
          out.push(item);
        }
      }
    }
    if (out.length) merged[k] = out;
    else delete merged[k];
  }

  // question/object lists: union on question prompt, else JSON identity
  for (const k of OBJ_LIST_KEYS) {
    const seen = new Set<string>();
    const out: unknown[] = [];
    for (const r of sorted) {
      const raw = r.data[k];
      if (raw === undefined || raw === null) continue;
      const items = Array.isArray(raw) ? raw : [raw];
      for (const item of items) {
        const prompt = (item as { question?: string })?.question;
        const id = typeof prompt === "string" && prompt.trim() ? norm(prompt) : JSON.stringify(item);
        if (!id || seen.has(id)) continue;
        seen.add(id);
        out.push(item);
      }
    }
    if (out.length) merged[k] = out;
    else delete merged[k];
  }

  // scalars: canonical wins, fill gaps from members
  for (const r of sorted.slice(1)) {
    for (const [k, v] of Object.entries(r.data)) {
      const cur = merged[k];
      const empty = cur === undefined || cur === null || (typeof cur === "string" && !cur.trim()) || (Array.isArray(cur) && !cur.length);
      if (empty && v !== undefined && v !== null) merged[k] = v;
    }
  }
  if (typeof merged.relevance === "number") {
    for (const r of group) if (typeof r.data.relevance === "number") merged.relevance = Math.max(merged.relevance as number, r.data.relevance);
  }
  // summaries: a recap is knowledge too — keep every distinct one, longest
  // first, concatenated while the schema cap (4000) allows.
  {
    const seen = new Set<string>();
    const parts: string[] = [];
    for (const r of sorted) {
      const s = r.data.summary;
      if (typeof s !== "string" || !s.trim() || isJunkLine(s)) continue;
      const n = norm(s);
      if (seen.has(n)) continue;
      seen.add(n);
      parts.push(s.trim());
    }
    if (parts.length) {
      const joined = parts.join(" ");
      merged.summary = joined.length <= 4_000 ? joined : parts.reduce((a, b) => (a.length >= b.length ? a : b));
    } else delete merged.summary;
  }

  // the merged note is one original now — variant markers go
  delete merged.duplicateType;
  delete merged.tabGroup;

  // a syllabus-referenced slug is a live route: the merged note keeps it as its
  // topicSlug, whatever the canonical file was called — routes outrank naming.
  const refd = group
    .map((r) => (typeof r.data.topicSlug === "string" ? r.data.topicSlug.trim().toLowerCase() : ""))
    .filter((s) => s && referencedSlug(s));
  const finalSlug = refd.includes(key) || !refd.length ? key : refd[0];
  if (finalSlug !== key) merged.topicSlug = finalSlug;

  // dropped slugs must not be live routes
  for (const r of group) {
    const s = r.data.topicSlug;
    if (typeof s === "string" && s.trim() && s.trim().toLowerCase() !== finalSlug && referencedSlug(s.trim())) {
      return { merged: null, junkDropped: 0, slugsDropped: [], reason: `dropped slug "${s}" is referenced by frontend/lib/syllabus.ts` };
    }
    if (typeof s === "string" && s.trim() && s.trim().toLowerCase() !== finalSlug) slugsDropped.push(s.trim());
  }

  // nothing real may be lost (knowledge keys only — see contentStrings).
  // Containment, not equality: summaries are deliberately concatenated into one
  // recap string, so a part must be found inside a merged string to count kept.
  const mergedStrings = contentStrings(merged);
  const mergedSet = new Set(mergedStrings);
  for (const r of group) {
    for (const s of contentStrings(r.data)) {
      if (mergedSet.has(s)) continue;
      if (mergedStrings.some((m) => m.includes(s))) continue;
      const where = Object.entries(r.data)
        .filter(([k]) => CONTENT_KEYS.has(k))
        .find(([, v]) => JSON.stringify(v).toLowerCase().includes(s))?.[0] ?? "?";
      return { merged: null, junkDropped: 0, slugsDropped: [], reason: `real content of ${r.rel} would be lost — ${where}: ${s.slice(0, 140)}` };
    }
  }

  // schema + minimum depth for the gated corpus
  const notesLen = Array.isArray(merged.notes) ? merged.notes.length : 0;
  if (!notesLen && !contentStrings(merged).length) {
    return { merged: null, junkDropped, slugsDropped, reason: "nothing real survives the merge" };
  }
  if (!Array.isArray(merged.notes) || !merged.notes.length) merged.notes = []; // required by the schema
  if (canon.cls.endsWith("-notes") && canon.family === "concepts") {
    const parsed = ConceptNoteSchema.safeParse(merged);
    if (!parsed.success) {
      return { merged: null, junkDropped, slugsDropped, reason: `schema: ${parsed.error.issues[0]?.path.join(".")} ${parsed.error.issues[0]?.message}` };
    }
  }
  return { merged, junkDropped, slugsDropped };
}

/* ───────────────────────── plan + invariant check ───────────────────────── */

const planned: PlanEntry[] = [];
const overrides = new Map<string, Record<string, unknown> | null>(); // rel → merged data, null = deleted

for (const group of mergeGroups) {
  const { merged, junkDropped, slugsDropped, reason } = mergeGroup(group);
  const sortedRel = group.map((r) => r.rel).sort();
  if (!merged) {
    planned.push({ key: clusterKey(group[0]), canonical: sortedRel[0], absorbed: [], mergedNotes: 0, junkDropped: 0, slugsDropped: [], status: "refused", reason });
    continue;
  }
  // re-derive canonical exactly as mergeGroup scored it
  const scoreOf = (r: Rec) => [r.cls.endsWith("-notes") ? 1 : 0, r.data.duplicateType ? 0 : 1, realStrings(r.data).length, -r.rel.length];
  const canonRec = [...group].sort((a, b) => {
    const sa = scoreOf(a), sb = scoreOf(b);
    for (let i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return sb[i] - sa[i];
    return a.rel.localeCompare(b.rel);
  })[0];
  for (const r of group) overrides.set(r.rel, r.rel === canonRec.rel ? merged : null);
  planned.push({
    key: clusterKey(group[0]),
    canonical: canonRec.rel,
    absorbed: group.filter((r) => r.rel !== canonRec.rel).map((r) => r.rel).sort(),
    mergedNotes: Array.isArray(merged.notes) ? merged.notes.length : 0,
    junkDropped,
    slugsDropped,
    status: "merged",
    before: `${group.length} files, ${group.reduce((n, r) => n + (Array.isArray(r.data.notes) ? r.data.notes.length : 0), 0)} notes`,
    after: `1 file, ${Array.isArray(merged.notes) ? merged.notes.length : 0} notes`,
  });
}

// invariants on the simulated tree: placeholder must not rise, CLEAN scopes stay CLEAN
function simulate(): { placeholder: number; broken: number; cleanScopes: Set<string> } {
  let placeholder = 0, thin = 0;
  const clean = new Set<string>();
  for (const [scopeKey, files] of scopes) {
    const sim = files.map((r) => (overrides.has(r.rel) ? overrides.get(r.rel) : r.data)).filter((d): d is Record<string, unknown> => d !== null);
    const c = classify(sim);
    placeholder += c.placeholder;
    thin += c.thin;
    if (c.state === "CLEAN") clean.add(scopeKey);
  }
  return { placeholder, broken: 0, cleanScopes: clean };
}
const beforeState = (() => {
  let placeholder = 0;
  const clean = new Set<string>();
  for (const [scopeKey, files] of scopes) {
    const c = classify(files.map((r) => r.data));
    placeholder += c.placeholder;
    if (c.state === "CLEAN") clean.add(scopeKey);
  }
  return { placeholder, cleanScopes: clean };
})();

// drop offending groups until the invariants hold (largest groups first so the
// fewest merges are sacrificed)
let order = planned.filter((p) => p.status === "merged").sort((a, b) => b.absorbed.length - a.absorbed.length);
function rebuildOverrides(entries: PlanEntry[]) {
  overrides.clear();
  for (const p of entries) {
    const group = mergeGroups.find((g) => g.some((r) => r.rel === p.canonical))!;
    const { merged } = mergeGroup(group);
    if (!merged) continue;
    for (const r of group) overrides.set(r.rel, r.rel === p.canonical ? merged : null);
  }
}
for (let guard = 0; guard < 200; guard++) {
  const sim = simulate();
  const newDirty = [...beforeState.cleanScopes].filter((s) => !sim.cleanScopes.has(s));
  if (sim.placeholder <= beforeState.placeholder && !newDirty.length) break;
  // sacrifice the newest group touching a newly-dirty scope, else the largest
  const culprit = order.find((p) => {
    const scopeOf = (rel: string) => rel.split("/").slice(0, 3).join("/");
    const scopes_touched = new Set([p.canonical, ...p.absorbed].map(scopeOf));
    return newDirty.some((s) => scopes_touched.has(s));
  }) ?? order[0];
  if (!culprit) break;
  culprit.status = "refused";
  culprit.reason = (culprit.reason ? culprit.reason + "; " : "") + "would worsen the empty-scope invariants";
  order = order.filter((p) => p !== culprit);
  rebuildOverrides(order);
}

/* ───────────────────────── write phase ───────────────────────── */

function serialiseIndex(index: Record<string, unknown>): string {
  const sorted: Record<string, unknown> = {};
  for (const k of Object.keys(index).sort()) sorted[k] = index[k];
  return `${JSON.stringify(sorted, null, 2).replace(/\n/g, "\r\n")}\r\n`; // pyq-register byte-stability
}
function writePreserving(rec: Rec, data: Record<string, unknown>) {
  let body = JSON.stringify(data, null, 2);
  if (rec.hadCrlf) body = body.replace(/\n/g, "\r\n");
  if (rec.hadTrailingNl && !body.endsWith("\n")) body += rec.hadCrlf ? "\r\n" : "\n";
  fs.writeFileSync(rec.abs, body);
}

const deletions: string[] = [];
if (APPLY) {
  const byRel = new Map(recs.map((r) => [r.rel, r]));
  for (const [rel, merged] of overrides) {
    const rec = byRel.get(rel)!;
    if (merged) writePreserving(rec, merged);
    else { fs.unlinkSync(rec.abs); deletions.push(rel); }
  }

  // both _index.json copies + the imported-notes manifest
  const idxPaths = [path.join(RK, "_index.json"), path.join(ROOT, "frontend", "public", "data", "ravikishan", "_index.json")];
  for (const p of idxPaths) {
    if (!fs.existsSync(p)) continue;
    const index = JSON.parse(fs.readFileSync(p, "utf8")) as Record<string, unknown>;
    for (const [rel, merged] of overrides) {
      if (!merged) { delete index[rel]; continue; }
      const old = (index[rel] ?? {}) as Record<string, unknown>;
      index[rel] = { ...old, ...merged };
    }
    fs.writeFileSync(p, serialiseIndex(index));
  }
  const manifestPath = path.join(ROOT, "frontend", "public", "data", "ravikishan", "manifest.json");
  if (fs.existsSync(manifestPath)) {
    const items = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as { path: string; data: Record<string, unknown> }[];
    const next = items
      .filter((it) => !overrides.has(it.path) || overrides.get(it.path))
      .map((it) => {
        const merged = overrides.get(it.path);
        return merged ? { ...it, data: { ...it.data, ...merged } } : it;
      });
    const body = `${JSON.stringify(next, null, 2).replace(/\n/g, "\r\n")}\r\n`;
    fs.writeFileSync(manifestPath, body);
  }

  // runtime mirror (built tree): delete only emitted names that map to absorbed sources
  const PUB = path.join(ROOT, "frontend", "public", "data", "syllabus-notes");
  if (fs.existsSync(PUB)) {
    // replicate build.ts's pairing (pre-merge state) to know which emitted name
    // each source produced; delete the name only when its source is absorbed.
    const emitted = new Map<string, string>(); // emitted rel → source rel
    for (const [scopeKey, files] of scopes) {
      const [cls, subject, unit] = scopeKey.split("/");
      if (cls !== "class-11-notes") continue; // BUILD_CLASS_DIRS
      const originals = new Map<string, Rec>();
      for (const r of files) if (!r.data.duplicateType) originals.set(String(r.data.topicSlug), r);
      for (const r of files) {
        const isVariant = Boolean(r.data.duplicateType && r.data.tabGroup);
        const paired = isVariant && originals.has(String(r.data.tabGroup));
        const file = paired
          ? r.rel.split("/").pop()!.replace(/\.json$/, `-${r.data.duplicateType}.json`)
          : r.rel.split("/").pop()!;
        emitted.set(`${subject}/${unit}/${file}`, r.rel);
      }
    }
    for (const [emittedRel, srcRel] of emitted) {
      if (overrides.get(srcRel) !== null) continue; // not absorbed
      const p = path.join(PUB, ...emittedRel.split("/"));
      if (fs.existsSync(p)) { fs.unlinkSync(p); deletions.push(`(runtime) ${emittedRel}`); }
    }
  }
}

/* ───────────────────────── report ───────────────────────── */

const residualThin = planned
  .filter((p) => p.status === "merged" && p.mergedNotes < MIN_NOTES)
  .map((p) => ({ canonical: p.canonical, mergedNotes: p.mergedNotes }));
const afterState = simulate();

const report = {
  generatedBy: "scripts/merge-related-notes.ts",
  mode: APPLY ? "apply" : "dry-run (no files written)",
  rule: "A. same topic identity (family+class family+subject+normalized unit+topic key) · B. identical content fingerprint · C. near-duplicate names only when content is a subset · D. stem prefix pairs (short name ⊂ long name in the same scope)",
  totals: {
    filesConsidered: recs.length,
    relationGroups: mergeGroups.length,
    filesAbsorbed: planned.filter((p) => p.status === "merged").reduce((n, p) => n + p.absorbed.length, 0),
    groupsRefused: planned.filter((p) => p.status === "refused").length,
    junkLinesDropped: planned.reduce((n, p) => n + p.junkDropped, 0),
    placeholderBefore: beforeState.placeholder,
    placeholderAfter: afterState.placeholder,
    deletedFiles: deletions.length,
    residualThinMergedNotes: residualThin.length,
  },
  fuzzyRelations: fuzzyReported,
  residualThin,
  groups: planned,
};
fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("=".repeat(90));
console.log(`MERGE RELATED NOTES — ${report.mode}`);
console.log("=".repeat(90));
console.log(`files considered      : ${report.totals.filesConsidered}`);
console.log(`relation groups (≥2)  : ${report.totals.relationGroups}`);
console.log(`groups merged         : ${planned.filter((p) => p.status === "merged").length}`);
console.log(`groups refused        : ${report.totals.groupsRefused}`);
console.log(`files absorbed        : ${report.totals.filesAbsorbed}`);
console.log(`junk lines dropped    : ${report.totals.junkLinesDropped}`);
console.log(`placeholder ${beforeState.placeholder} → ${afterState.placeholder}`);
console.log(`residual thin merges  : ${residualThin.length}`);
console.log(`fuzzy relations       : ${fuzzyReported.length} (${fuzzyReported.filter((f) => f.merged).length} merged)`);
if (APPLY) console.log(`files deleted         : ${deletions.length}`);
console.log(`report → ${path.relative(ROOT, REPORT)}`);
const refused = planned.filter((p) => p.status === "refused");
if (refused.length) {
  console.log("-".repeat(90));
  for (const r of refused.slice(0, 15)) console.log(`  REFUSED ${r.canonical} — ${r.reason}`);
  if (refused.length > 15) console.log(`  … and ${refused.length - 15} more (see the report)`);
}
console.log("=".repeat(90));
