#!/usr/bin/env node
/**
 * platform-ledger — the register of record for every file in the platform.
 *
 * Why it exists: the repo grew by accretion (content corpus, runtime mirror,
 * labs, backend, one-off tooling, stray dumps), and nothing recorded WHAT each
 * file is, WHERE it belongs, which area branch owns it, or how it links to the
 * rest. This ledger answers those four questions for every file and refuses to
 * let new randomness in unnoticed (`--check`).
 *
 * Usage:
 *   node scripts/platform-ledger.mjs            # regenerate reports/platform-ledger.{json,md}
 *   node scripts/platform-ledger.mjs --check    # drift gate: fails on new strays / secrets
 *
 * Sections of the emitted ledger:
 *   totals          file counts by class and git state
 *   secrets         credential-looking files (names only, contents never read)
 *                   + `git grep` scan per AGENTS.md Rule 2
 *   externals       self-contained projects embedded in the repo
 *   strays          files not in a known home, each with a routing action
 *   content         corpus + runtime-mirror diversity: thin/empty, duplicate
 *                   families, variant tabs, legacy random names
 *   links           unit-level: source dir ↔ runtime dir ↔ manifest
 *   completionOrder the order remaining work should be completed in
 *
 * Classification is by path (fast, deterministic); content JSON is parsed only
 * for the two content trees where note counts decide the completion order.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CHECK = process.argv.includes("--check");
const OUT_JSON = path.join("reports", "platform-ledger.json");
const OUT_MD = path.join("reports", "platform-ledger.md");

const git = (args) =>
  execFileSync("git", args, { cwd: ROOT, maxBuffer: 64 * 1024 * 1024, encoding: "utf8" });

/* ───────────────────────── 1. gather file inventory ───────────────────── */

/** Tracked files (raw -z names, so unicode paths are not quoted). */
const tracked = git(["ls-files", "-z"]).split("\0").filter(Boolean);

/** Untracked, not ignored (`??` entries, all files not just dirs). */
const statusZ = git(["status", "--porcelain=v1", "-uall", "-z"]).split("\0").filter(Boolean);
const untracked = [];
const modified = [];
for (let i = 0; i < statusZ.length; i++) {
  const entry = statusZ[i];
  const x = entry[0];
  const p = entry.slice(3);
  if (x === "R" || x === "C") i++; // skip the old-path half of a rename/copy
  if (x === "?" && !p.startsWith(".freebuff/")) untracked.push(p);
  else if (x !== "?" && x !== "!") modified.push(p);
}

/** Ignored files at the repo root only (credentials live here; node_modules excluded). */
const rootIgnored = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => {
    if (e.name === "node_modules" || e.name === ".git") return false;
    try {
      git(["check-ignore", "-q", e.name]);
      return true;
    } catch {
      return false;
    }
  })
  .map((e) => e.name);

/* ───────────────────────── 2. classification rules ────────────────────── */

const FEATURE_ROUTES = {
  home: "feature/home",
  "ai-chat": "feature/ai-chat",
  "ai-quiz": "feature/ai-quiz",
  notes: "feature/notes",
  quiz: "feature/quiz",
  lab: "feature/lab",
  credits: "feature/credits",
  progress: "feature/progress",
  bookmarks: "feature/bookmarks",
  search: "feature/search",
  "admin-owner": "feature/admin-owner",
  auth: "feature/auth",
  "mind-studio": "feature/visuals-mindmap",
  theorems: "feature/derivations-theorems",
  levels: "feature/syllabus-levels",
  syllabus: "feature/syllabus-levels",
  loksewa: "feature/loksewa",
  resources: "feature/resources",
  "world-knowledge": "feature/world-knowledge",
  "periodic-table": "feature/periodic-table",
  lessons: "feature/lessons-subjects",
  "exam-countdown": "feature/exam-countdown",
};

function backendBranch(p) {
  const f = path.basename(p);
  if (/^ai[-.]/.test(f) || p.startsWith("backend/src/ai/")) return "backend/ai-api";
  if (f.startsWith("auth") || p.startsWith("backend/src/middleware/") || p.startsWith("backend/src/auth/"))
    return "backend/auth-api";
  if (/(notes|chapters|topics|subjects|classes|exams|controller)/.test(f)) return "backend/notes-api";
  if (/(progress|bookmarks|chat-history|user|credits)/.test(f)) return "backend/progress-api";
  if (/(admin|owner|storage)/.test(f)) return "backend/admin-api";
  if (/(search|resources)/.test(f)) return "backend/search-api";
  return "backend/* (decide)";
}

/** content/ravikishan/<class>/<subject>/<unit>/<layer>/<file> */
const CONTENT_RE = /^content\/ravikishan\/(class-(?:11|12)-notes)\/([^/]+)\/([^/]+)\//;

function classify(p) {
  // — secrets (by NAME only; contents are never read or recorded). Source
  // files whose name merely mentions "token" (statusToken.ts) are code, not
  // credentials: only credential-shaped FILE TYPES count here. —
  const SECRET_EXT = /\.(txt|env|pem|key|p12|pfx|ppk|json|yml|yaml)$/i;
  if (SECRET_EXT.test(p) && /(^|\/)([^/]*(token|secret|credential|id_rsa)[^/]*|\.env[^/]*)$/i.test(p))
    return { cls: "secret", area: "n/a — never commit", branch: "n/a", action: "keep ignored; rotate if exposed" };

  // — embedded self-contained projects —
  for (const ext of ["agnes-bridge", "cell-architecture-studio", "visuals-py"])
    if (p === ext || p.startsWith(ext + "/"))
      return { cls: "external-project", area: ext, branch: "chore/tooling", action: "keep as embedded project; do not mix into app code" };

  // — content corpus (source of truth) —
  const cm = CONTENT_RE.exec(p);
  if (cm) {
    const [, cls, subject, unit] = cm;
    const branch =
      cls === "class-11-notes" && ["physics", "chemistry", "biology", "english", "mathematics", "nepali"].includes(subject)
        ? `content/${subject}`
        : cls === "class-12-notes"
          ? "content/class-12"
          : "content/class-11";
    return { cls: "content-source", area: `${cls}/${subject}/${unit}`, branch, action: "canonical corpus — edit here only" };
  }
  if (p.startsWith("content-tools/"))
    return { cls: "content-tooling", area: "content pipeline", branch: "chore/tooling", action: "one-off generator scripts; archive when superseded" };
  if (p.startsWith("content/"))
    return { cls: "content-source", area: "content (other)", branch: "content/* (decide)", action: "classify with corpus" };

  // — runtime mirror + content assets —
  if (p.startsWith("frontend/public/data/syllabus-notes/"))
    return { cls: "content-runtime", area: p.split("/").slice(4, 6).join("/"), branch: "generated — commit via content/*", action: "never hand-edit; regenerate with npm run content:build" };
  if (/^frontend\/public\/(materials|pdfs)\//.test(p))
    return { cls: "content-assets", area: "study materials", branch: "content/exams-lessons", action: "keep; register in ledger links" };

  // — frontend —
  if (p.startsWith("frontend/components/lab/")) return { cls: "frontend-lab", area: "3D/sim layer", branch: "feature/lab", action: "owned by feature/lab per BRANCHES.md" };
  let m = /^frontend\/app\/(?:\(app\)\/|\(marketing\)\/)?([^/]+)/.exec(p);
  if (m) {
    const b = FEATURE_ROUTES[m[1]];
    return { cls: "frontend-app", area: `route /${m[1]}`, branch: b ?? "feature/* (decide)", action: "route file — keep with its feature" };
  }
  if (p.startsWith("frontend/features/")) {
    const m2 = /^frontend\/features\/([^/]+)/.exec(p);
    return { cls: "frontend-features", area: `feature ${m2[1]}`, branch: "feature/* (decide)", action: "feature module" };
  }
  if (p.startsWith("frontend/components/")) return { cls: "frontend-components", area: "shared UI", branch: "feature/* (decide)", action: "shared component — link from consumers" };
  if (p.startsWith("frontend/lib/")) return { cls: "frontend-lib", area: "shared lib", branch: "chore/tooling", action: "shared lib — link from consumers" };
  if (p.startsWith("frontend/tests/")) return { cls: "frontend-tests", area: "tests", branch: "test/frontend-unit", action: "test suite" };
  if (p.startsWith("frontend/public/data/")) return { cls: "content-runtime", area: "runtime data", branch: "generated", action: "generated data" };
  if (p.startsWith("frontend/")) return { cls: "frontend-config", area: "frontend root", branch: "ci/lint-typecheck", action: "config/tooling" };

  // — backend —
  if (p.startsWith("backend/tests/")) return { cls: "backend-tests", area: "tests", branch: "test/backend-unit", action: "test suite" };
  if (p.startsWith("backend/src/")) return { cls: "backend-core", area: "backend", branch: backendBranch(p), action: "API/core code" };
  if (p.startsWith("backend/")) return { cls: "backend-tooling", area: "backend tooling", branch: "chore/tooling", action: "scripts/OCR/scratch — keep out of src" };

  // — tooling, docs, reports, ci —
  if (p.startsWith("scripts/")) return { cls: "tooling-scripts", area: "repo tooling", branch: "chore/tooling", action: "repo script" };
  if (p.startsWith(".github/")) return { cls: "ci", area: "CI", branch: "ci/* (decide)", action: "workflow config" };
  if (p.startsWith("reports/")) return { cls: "reports", area: "reports", branch: "chore/tooling", action: "generated report — regenerate, don't hand-edit" };
  if (/^[^/]+\.md$/.test(p)) return { cls: "docs", area: "docs", branch: "docs/agents-guides", action: "documentation" };
  if (p.startsWith("docs/")) return { cls: "docs", area: "docs", branch: "docs/agents-guides", action: "documentation" };
  if (/^\.[^/]+$/.test(p) || /^(package(-lock)?\.json|components\.json|metadata\.json|greptile\.json|LICENSE)$/.test(p))
    return { cls: "config", area: "root config", branch: "chore/tooling", action: "tool config — keep at root" };

  // — other agents' tool scratch dirs (like .freebuff): registered, left alone —
  if (/^\.(trae|frontbuff|backend)\//.test(p))
    return { cls: "tool-scratch", area: "other-tool scratch", branch: "(leave in place)", action: "belongs to another tool/session — register, never re-route" };

  // — data consumed by backend/scripts (public/all_elements.json etc.) and the
  //   root-level fallback copies behind them —
  if (p === "public" || p.startsWith("public/") || p === "all_elements.json")
    return { cls: "data", area: "periodic-table data", branch: "feature/periodic-table", action: "consumed by backend/src/data/periodicTableFilters.ts + scripts/*; root copy is a fallback duplicate (dedupe in order 6)" };
  if (p === "note-preview.html")
    return { cls: "routed-moved", area: "reports/", branch: "chore/tooling", action: "renamed to reports/note-preview.html in worktree — stage the rename at commit time" };
  if (p.startsWith("reports/note-preview.html"))
    return { cls: "reports", area: "reports", branch: "chore/tooling", action: "scratch preview, routed here 2026-10-10" };

  // — everything else is a stray until routed —
  return { cls: "stray", area: "(unclassified)", branch: "(unassigned)", action: "decide: move, delete, or register a home" };
}

/* ───────────────────────── 3. content diversity scan ──────────────────── */

function notesOf(file) {
  try {
    const d = JSON.parse(fs.readFileSync(file, "utf8"));
    return {
      notes: Array.isArray(d.notes) ? d.notes.length : 0,
      questions: Array.isArray(d.questions) ? d.questions.filter((q) => q && q.question).length : 0,
      topicSlug: String(d.topicSlug ?? ""),
      // duplicateType + tabGroup mark the platform's DESIGNED variant-tab
      // structure (build.ts emits them as X-N and the UI renders them as tabs
      // of the tabGroup original). Files carrying them are not duplication.
      isTab: Boolean(d.duplicateType && d.tabGroup),
    };
  } catch {
    return { notes: -1, questions: 0, topicSlug: "", isTab: false };
  }
}

const LEGACY_NAME = /^(n\d+|on\d+|opticsn\d+|matrix[\w-]*|dimensions|errors|vector|physical-quantity|l-s-a-q-and-n|m-p-errors|s-f-rules|quantity-of-heat)$/;

/** Diversity findings per content unit across BOTH trees. */
const contentStats = new Map(); // key: subject/unit → { thin, empty, duplicates, variants, legacy }
function bump(key, field) {
  if (!contentStats.has(key)) contentStats.set(key, { thin: 0, empty: 0, duplicates: 0, variants: 0, legacy: 0, files: 0 });
  contentStats.get(key)[field]++;
}

function scanContentTree(root, tree) {
  if (!fs.existsSync(root)) return;
  for (const subject of fs.readdirSync(root)) {
    const sDir = path.join(root, subject);
    if (!fs.statSync(sDir).isDirectory()) continue;
    for (const unit of fs.readdirSync(sDir)) {
      const uDir = path.join(sDir, unit);
      if (!fs.statSync(uDir).isDirectory()) continue;
      const key = `${tree}:${subject}/${unit}`;
      const stems = new Set();
      const files = [];
      const walk = (d) => {
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
          const f = path.join(d, e.name);
          if (e.isDirectory()) {
            if (e.name !== "mindmap" && e.name !== "rails") walk(f);
            continue;
          }
          if (!e.name.endsWith(".json") || e.name === "plan.json" || e.name.startsWith("_")) continue;
          files.push([e.name.slice(0, -5), f]);
        }
      };
      walk(uDir);
      for (const [stem] of files) stems.add(stem);
      const infos = new Map(files.map(([stem, f]) => [stem, notesOf(f)]));
      for (const [stem] of files) {
        const info = infos.get(stem);
        bump(key, "files");
        if (info.notes < 0) continue;
        if (info.notes === 0 && info.questions === 0) bump(key, "empty");
        else if (info.notes > 0 && info.notes < 4 && info.questions === 0) bump(key, "thin");
        if (LEGACY_NAME.test(stem)) bump(key, "legacy");
        // variant tab: NN-slug-2.json paired with NN-slug.json — counted only
        // when the suffixed file is NOT an authored tab (designed tabs carry
        // duplicateType+tabGroup and are structure, not duplication).
        if (/-\d+$/.test(stem) && stems.has(stem.replace(/-\d+$/, ""))) {
          if (!info.isTab) bump(key, "variants");
        } else if (
          !info.isTab &&
          [...stems].some((s) => s !== stem && s.startsWith(stem) && !infos.get(s)?.isTab)
        ) {
          // duplicate family: one NON-tab stem is a prefix of another non-tab
          // stem in the same subject — the shape the merge pass consolidates.
          bump(key, "duplicates");
        }
      }
    }
  }
}
scanContentTree(path.join("content", "ravikishan"), "source");
scanContentTree(path.join("frontend", "public", "data", "syllabus-notes"), "runtime");

/* ───────────────────────── 4. secrets scan (AGENTS.md Rule 2) ─────────── */

const SECRET_PATTERN = "vcp_|sbp_|AIza|sk-|KEY=|TOKEN=";
let rawHits = [];
try {
  const out = git([
    "grep", "-n", "-I", "-E", SECRET_PATTERN,
    "--", ".", ":!node_modules", ":!*.md", ":!package-lock.json", ":!reports/*", ":!scripts/platform-ledger.mjs",
  ]);
  rawHits = out.split("\n").filter(Boolean).map((l) => {
    const i1 = l.indexOf(":");
    const i2 = l.indexOf(":", i1 + 1);
    return { file: l.slice(0, i1), line: Number(l.slice(i1 + 1, i2)) || 0, text: l.slice(i2 + 1).trim().slice(0, 120) };
  });
} catch {
  /* exit 1 = no hits = clean */
}

// The AGENTS.md Rule 2 pattern is intentionally broad, so it also matches
// words like "flask-shaped" (sk-) and doc-comment examples (KEY=...). A REAL
// leak assigns a key-shaped literal; a mention does not. Classify, don't hide.
const REAL_SECRET =
  /(vcp_|sbp_|AIza)[A-Za-z0-9_-]{8,}|sk-[A-Za-z0-9]{16,}|(KEY|TOKEN|SECRET)["']?\s*[:=]\s*["']?[A-Za-z0-9_/+-]{16,}/;
const PLACEHOLDER = /(example|your-|xxx|re_\.{3}|<|\$\{|\bnull\b|\bundefined\b|\*{3})/i;
const secretHits = rawHits
  .filter((h) => REAL_SECRET.test(h.text) && !PLACEHOLDER.test(h.text))
  .map(({ file, line }) => ({ file, line }));
const secretNoise = rawHits.length - secretHits.length;

/* ───────────────────────── 5. build the ledger ────────────────────────── */

const entries = [];
const seen = new Set();
for (const p of tracked) {
  seen.add(p);
  entries.push({ path: p, git: "tracked", ...classify(p) });
}
for (const p of untracked) {
  seen.add(p);
  entries.push({ path: p, git: "untracked", ...classify(p) });
}
for (const p of rootIgnored) {
  seen.add(p);
  entries.push({ path: p, git: "ignored", ...classify(p) });
}

const byClass = {};
for (const e of entries) byClass[e.cls] = (byClass[e.cls] ?? 0) + 1;

const strays = entries.filter((e) => e.cls === "stray");
const secrets = entries.filter((e) => e.cls === "secret");
const externals = entries.filter((e) => e.cls === "external-project");

// unit-level links: source dir ↔ runtime dir ↔ manifest
const links = [];
for (const [key, s] of [...contentStats.entries()].sort()) {
  const [tree, unitKey] = key.split(":");
  if (tree !== "source") continue;
  const rt = contentStats.get(`runtime:${unitKey}`);
  links.push({
    unit: unitKey,
    source: `content/ravikishan/**/${unitKey}/`,
    runtime: `frontend/public/data/syllabus-notes/${unitKey}/`,
    manifest: `frontend/public/data/syllabus-notes/${unitKey.split("/")[0]}/_manifest.json`,
    sourceFiles: s.files,
    runtimeFiles: rt?.files ?? 0,
  });
}

// completion order — computed counts, fixed priority
const gateScopes = [
  "biology/floral-diversity", "chemistry/atomic-structure", "chemistry/basic-concept-of-organic-chemistry",
  "chemistry/classification-of-elements-and-periodic-table", "chemistry/stoichiometry",
  "english/reading-and-comprehension", "english/writing-and-composition", "physics/capacitor",
  "physics/elasticity", "physics/electric-charges", "physics/electric-field",
  "physics/potential-potential-difference-and-potential-energy",
];
const completionOrder = [
  { step: 1, task: "Worktree/branch consolidation", status: "done 2026-10-10 (49 worktrees removed, 0 loss; 54 branches kept)" },
  { step: 2, task: `Deepen gate-blocking thin files in ${gateScopes.length} empty-scope-gate scopes`, detail: gateScopes, status: "done 2026-10-10 (38 files deepened via scripts/deepen-thin-notes.mjs; empty-scope gate PASS)" },
  { step: 3, task: "Deepen the 8 residual thin merge survivors", detail: "reports/note-relations.json → residualThin", status: "done 2026-10-10 (covered by the same deepening pass)" },
  { step: 4, task: "Fix cross-topic contamination (wrong-topic Fact. notes, e.g. calculus facts in the Rutherford file)", status: "done 2026-10-10 (replaced by topic-correct notes in the deepening pass)" },
  { step: 5, task: "Route strays (see strays[]) into registered homes or delete", detail: strays.map((s) => s.path), status: strays.length ? "pending" : "done 2026-10-10 (0 strays left; drift gate green)" },
  {
    step: 6,
    task: "Consolidate legacy/duplicate/variant content files (see content.diversity)",
    status:
      "done 2026-10-10 (merge-related-notes rules D prefix-pairs + content-only fingerprints; 3 apply passes: 204 files absorbed; 51 wrong-topic biology recaps stripped from chemistry; 14 pure-mould legacy files deleted, 3 renamed/re-slugged; 131 second-family files imported into the corpus; superseded runtime extras pruned; 14 regressed thin files deepened). Classification pass: 16 imported same-slug twins absorbed into their variant-tab bases (fixing a build emit-collision), 6 empty variant tabs deleted after moving their real specificConditions into the tab originals, 23 numeric-prefixed topicSlugs renamed numberless (slug + tabGroup + index sync), diversity scan made metadata-aware (authored duplicateType+tabGroup tabs are structure, not duplication) — variants 90→0, legacy 34→0, duplicates 257→18. Residual: 18 duplicate-stem files = the 8 by-design merge refusals (variant-tab pairing, notes>80, empty-scope invariants) + 1 un-importable extra physics/heat-and-temperature/heat-and-temperature.json (159 notes > schema cap)",
  },
  { step: 7, task: "Commit untracked content batches (pyqs/, rails/, materials/, pdfs/, new tests) on their area branches", status: "pending" },
  { step: 8, task: "Bulk-deepen remaining thin corpus below the gate threshold", status: "pending" },
];

const diversity = [...contentStats.entries()]
  .map(([key, s]) => ({ key, ...s }))
  .filter((d) => d.thin || d.empty || d.duplicates || d.variants || d.legacy)
  .sort((a, b) => b.thin + b.empty + b.duplicates - (a.thin + a.empty + a.duplicates));

const ledger = {
  generatedBy: "scripts/platform-ledger.mjs",
  generatedAt: new Date().toISOString(),
  totals: {
    files: entries.length,
    tracked: tracked.length,
    untracked: untracked.length,
    modifiedTracked: modified.length,
    rootIgnored: rootIgnored.length,
    byClass,
  },
  secrets: { files: secrets, grepHits: secretHits, patternNoise: secretNoise },
  externals: externals.map((e) => e.path.split("/")[0]).filter((v, i, a) => a.indexOf(v) === i),
  strays: strays.map(({ path: p, git: g, action }) => ({ path: p, git: g, action })),
  content: {
    gateScopes,
    diversity,
    totals: {
      thin: [...contentStats.values()].reduce((n, s) => n + s.thin, 0),
      empty: [...contentStats.values()].reduce((n, s) => n + s.empty, 0),
      duplicates: [...contentStats.values()].reduce((n, s) => n + s.duplicates, 0),
      variants: [...contentStats.values()].reduce((n, s) => n + s.variants, 0),
      legacy: [...contentStats.values()].reduce((n, s) => n + s.legacy, 0),
    },
  },
  links,
  completionOrder,
};

/* ───────────────────────── 6. drift gate (--check) ────────────────────── */

if (CHECK) {
  const failures = [];
  if (secrets.some((s) => s.git !== "ignored"))
    failures.push("credential-looking file is tracked or unignored: " + secrets.filter((s) => s.git !== "ignored").map((s) => s.path).join(", "));
  if (secretHits.length)
    failures.push(`REAL secret-assignment hits in tracked code: ${secretHits.length} (see ledger.secrets.grepHits)`);
  if (!fs.existsSync(OUT_JSON)) {
    failures.push(`no ledger on disk — run \`node scripts/platform-ledger.mjs\` and commit ${OUT_JSON}`);
  } else {
    const prev = JSON.parse(fs.readFileSync(OUT_JSON, "utf8"));
    const prevStrays = new Set((prev.strays ?? []).map((s) => s.path));
    const newStrays = strays.filter((s) => !prevStrays.has(s.path));
    if (newStrays.length)
      failures.push(`new unclassified strays appeared: ${newStrays.map((s) => s.path).join(", ")} — route them and regenerate the ledger`);
    const prevTotals = prev.totals ?? {};
    if ((prevTotals.tracked ?? 0) > tracked.length)
      failures.push(`tracked file count dropped (${prevTotals.tracked} → ${tracked.length}) — deletions must be deliberate and recorded`);
  }
  if (failures.length) {
    console.log("PLATFORM LEDGER — CHECK: FAIL");
    for (const f of failures) console.log("  - " + f);
    process.exit(1);
  }
  console.log("PLATFORM LEDGER — CHECK: PASS (no new strays, no secrets, ledger current)");
  process.exit(0);
}

/* ───────────────────────── 7. write JSON + markdown ───────────────────── */

fs.mkdirSync("reports", { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(ledger, null, 2) + "\n", "utf8");

const md = [];
md.push("# Platform Ledger");
md.push("");
md.push("> Generated by `node scripts/platform-ledger.mjs` — regenerate, never hand-edit.");
md.push("> Drift gate: `node scripts/platform-ledger.mjs --check` (fails on new strays or secrets).");
md.push("");
md.push(`Generated: ${ledger.generatedAt}`);
md.push("");
md.push("## Totals");
md.push("");
md.push(`| metric | count |`);
md.push(`|---|---|`);
md.push(`| files registered | ${ledger.totals.files} |`);
md.push(`| tracked | ${ledger.totals.tracked} |`);
md.push(`| untracked (unignored) | ${ledger.totals.untracked} |`);
md.push(`| tracked but modified | ${ledger.totals.modifiedTracked} |`);
md.push("");
md.push("### By class");
md.push("");
md.push("| class | count | meaning |");
md.push("|---|---|---|");
const CLASS_MEANING = {
  secret: "credential files — names only, contents never recorded",
  "external-project": "self-contained embedded projects (agnes-bridge, cell-architecture-studio, visuals-py)",
  "content-source": "canonical corpus under content/ravikishan (edit here only)",
  "content-runtime": "generated runtime mirror under frontend/public/data (never hand-edit)",
  "content-tooling": "one-off content generator scripts",
  "content-assets": "study materials / pdfs",
  "frontend-app": "Next.js route files",
  "frontend-features": "feature modules",
  "frontend-components": "shared UI components",
  "frontend-lab": "3D/simulation layer (feature/lab owns)",
  "frontend-lib": "shared frontend libs",
  "frontend-tests": "frontend test suites",
  "frontend-config": "frontend root config",
  "backend-core": "backend API/core",
  "backend-tests": "backend test suites",
  "backend-tooling": "backend scratch/tooling (OCR etc.)",
  "tooling-scripts": "repo scripts",
  ci: "CI workflows",
  reports: "generated reports",
  docs: "documentation",
  config: "root tool config",
  stray: "UNCLASSIFIED — needs a routing decision",
  "routed-moved": "routed to its home; rename pending staging at commit",
  "tool-scratch": "other tools'/sessions' scratch dirs — registered, left in place",
  data: "data files consumed by backend/scripts (periodic-table dataset)",
};
for (const [c, n] of Object.entries(byClass).sort((a, b) => b[1] - a[1]))
  md.push(`| ${c} | ${n} | ${CLASS_MEANING[c] ?? ""} |`);
md.push("");
md.push("## Secrets hygiene (AGENTS.md Rule 2)");
md.push("");
md.push(`Credential-named files: ${secrets.length} — ${secrets.every((s) => s.git === "ignored") ? "all ignored/untracked ✅" : "⚠️ TRACKED — remove immediately"}`);
for (const s of secrets) md.push(`- \`${s.path}\` (${s.git})`);
md.push("");
md.push(`\`git grep\` (AGENTS.md Rule 2 pattern) raw hits: ${rawHits.length} — classified: **${secretHits.length} real leaks** ${secretHits.length ? "⚠️" : "✅"}, ${secretNoise} pattern noise (words like \`flask-shaped\`, doc-comment \`KEY=…\` examples)`);
for (const h of secretHits.slice(0, 20)) md.push(`- \`${h.file}:${h.line}\``);
md.push("");
md.push("## Embedded external projects");
md.push("");
for (const e of ledger.externals) md.push(`- \`${e}/\` — self-contained; keep isolated from app code`);
md.push("");
md.push("## Strays — files needing a routing decision");
md.push("");
if (!strays.length) md.push("(none — everything has a home)");
for (const s of ledger.strays) md.push(`- \`${s.path}\` (${s.git}) → ${s.action}`);
md.push("");
md.push("## Content diversity (thin / empty / duplicate / legacy per unit)");
md.push("");
md.push(`Totals: **${ledger.content.totals.thin} thin**, **${ledger.content.totals.empty} empty**, **${ledger.content.totals.duplicates} duplicate-family files**, **${ledger.content.totals.variants} tab variants**, **${ledger.content.totals.legacy} legacy names**.`);
md.push("");
md.push("| unit (tree) | files | thin | empty | dup | variants | legacy |");
md.push("|---|---|---|---|---|---|---|");
for (const d of diversity.slice(0, 60))
  md.push(`| ${d.key} | ${d.files} | ${d.thin} | ${d.empty} | ${d.duplicates} | ${d.variants} | ${d.legacy} |`);
if (diversity.length > 60) md.push(`| … ${diversity.length - 60} more units in ledger JSON | | | | | | |`);
md.push("");
md.push("## Links (unit ↔ runtime mirror ↔ manifest)");
md.push("");
md.push("| unit | source | runtime | source files | runtime files |");
md.push("|---|---|---|---|---|");
for (const l of links.slice(0, 40))
  md.push(`| ${l.unit} | \`${l.source}\` | \`${l.runtime}\` | ${l.sourceFiles} | ${l.runtimeFiles} |`);
if (links.length > 40) md.push(`| … ${links.length - 40} more in ledger JSON | | | |`);
md.push("");
md.push("## Completion order");
md.push("");
for (const c of completionOrder) {
  md.push(`${c.step}. ${c.task} — **${c.status}**`);
  if (Array.isArray(c.detail)) for (const d of c.detail) md.push(`   - \`${d}\``);
  else if (c.detail) md.push(`   - ${c.detail}`);
}
md.push("");
md.push("## Area → branch routing (from BRANCHES.md)");
md.push("");
md.push("Every content-source entry above carries its owning area branch (`content/<subject>`,");
md.push("`content/class-12`, …); backend entries carry `backend/<api-area>` per BRANCHES.md §2;");
md.push("tests route to `test/*`, scripts/config to `chore/tooling`, docs to `docs/agents-guides`.");
md.push("When a branch reads `* (decide)`, pick the area branch with BRANCHES.md §2 before editing.");
md.push("");

fs.writeFileSync(OUT_MD, md.join("\n"), "utf8");
console.log(`platform ledger written: ${OUT_JSON} + ${OUT_MD}`);
console.log(`  files=${entries.length} tracked=${tracked.length} untracked=${untracked.length} strays=${strays.length} secrets=${secrets.length} realSecretHits=${secretHits.length} (noise ${secretNoise})`);
console.log(`  content: ${ledger.content.totals.thin} thin, ${ledger.content.totals.empty} empty, ${ledger.content.totals.duplicates} dup-family, ${ledger.content.totals.variants} variants, ${ledger.content.totals.legacy} legacy`);
