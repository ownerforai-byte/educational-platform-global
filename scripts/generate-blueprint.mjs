#!/usr/bin/env node
/**
 * ARCHITECTURE BLUEPRINT GENERATOR
 * ---------------------------------
 * Scans the actual filesystem and regenerates `docs/ARCHITECTURE_BLUEPRINT.md`
 * (the single source of truth for the project's structure/tree).
 *
 * Why it exists:
 *   - The blueprint is generated, never hand-maintained, so it can never
 *     drift from the real codebase.
 *   - Run it manually (`npm run blueprint`) or automatically on every commit
 *     via the pre-commit hook in `.husky/pre-commit` (or `.git/hooks`).
 *
 * Usage:
 *   npm run blueprint
 */

import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const OUTPUT_FILE = join(ROOT, "docs", "ARCHITECTURE_BLUEPRINT.md");

// Directories that should never appear in the blueprint (build/lint output, VCS, deps).
const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "out",
  ".vercel",
  "coverage",
  "__pycache__",
  ".cache",
  "drizzle",
  "_stale",
]);

// Specific file patterns to exclude.
const IGNORE_FILES = new Set([
  "package-lock.json",
  "next-env.d.ts",
  "tsconfig.tsbuildinfo",
  "Dockerfile",
  ".DS_Store",
]);

// Modules we map to a compact "…" listing when they have many files.
const COLLAPSE_DIRS = new Set([
  "lab",
]);

// Top-level order we want to render (unlisted appear alphabetically at end).
const TOP_ORDER = [
  "frontend",
  "backend",
  "content",
  "content-tools",
  "scripts",
  "docs",
  ".github",
  "AGENT_RULES.md",
  "PROJECT_STATUS.md",
  "package.json",
];

const MAX_LAB_FILES = 24; // if a collapsed dir has more, show first N + "… (N more)"

function shouldSkip(name, isDir) {
  if (IGNORE_FILES.has(name)) return true;
  if (isDir && IGNORE_DIRS.has(name)) return true;
  return false;
}

// Recursively gather entries, returning { dirs, files } respecting ignore rules.
function list(dir) {
  const dirs = [];
  const files = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return { dirs, files };
  }
  for (const name of entries.sort((a, b) => a.localeCompare(b))) {
    const p = join(dir, name);
    let isDir;
    try {
      isDir = statSync(p).isDirectory();
    } catch {
      continue;
    }
    if (shouldSkip(name, isDir)) continue;
    if (isDir) dirs.push({ name, path: p });
    else files.push(name);
  }
  return { dirs, files };
}

// Build a nested structure with counts.
function build(dir, name) {
  const { dirs, files } = list(dir);
  const children = [];
  for (const d of dirs) {
    children.push(build(d.path, d.name));
  }
  return {
    name,
    path: dir,
    isDir: true,
    dirs,
    files,
    children,
  };
}

const COMMENT_FOR = {
  "(marketing)": "public landing routes (no AppShell)",
  "(app)": "authenticated app shell (wraps pages in <AppShell>)",
  "admin": "separate auth gate (OWNER/ADMIN)",
  "notes": "the ONE note viewer (r-notes + ravikishan-notes consolidated)",
  "knowledge": "grammar (EN), byakaran (NE), numerical-*, biology-diagrams",
};

function renderChildren(node, prefix, lines, maxDepth) {
  // Collapse high-cardinality leaf dirs (like lab/) to keep the tree readable.
  if (COLLAPSE_DIRS.has(node.name) && node.children.every((c) => c.files.length === 0)) {
    const fileCount = node.files.length;
    const shown = node.files.slice(0, MAX_LAB_FILES);
    for (const f of shown) lines.push(`${prefix}├── ${f}`);
    if (fileCount > MAX_LAB_FILES) {
      lines.push(`${prefix}├── … (${fileCount - MAX_LAB_FILES} more)`);
    }
    return;
  }

  if (maxDepth === 0) {
    lines.push(`${prefix}└── …`);
    return;
  }

  const kids = [...node.children];
  const files = [...node.files];
  const total = kids.length + files.length;

  for (let i = 0; i < total; i++) {
    const isLast = i === total - 1;
    const branch = isLast ? "└──" : "├──";
    const childPrefix = prefix + (isLast ? "    " : "│   ");

    if (i < kids.length) {
      const item = kids[i];
      const comment = COMMENT_FOR[item.name] ? `   # ${COMMENT_FOR[item.name]}` : "";
      lines.push(`${prefix}${branch} ${item.name}/${comment}`);
      renderChildren(item, childPrefix, lines, maxDepth - 1);
    } else {
      const fname = files[i - kids.length];
      lines.push(`${prefix}${branch} ${fname}`);
    }
  }
}

function commentFor(node) {
  return COMMENT_FOR[node.name] || "";
}

function buildMarkdown() {
  const lines = [];
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);

  lines.push(`# 🧭 Architecture Blueprint — ravikishan (educational-platform-global)`);
  lines.push("");
  lines.push(
    `> **Auto-generated** — do not edit by hand. Regenerate with \`npm run blueprint\` ` +
      `(runs automatically on every commit via the pre-commit hook).`
  );
  lines.push(`> Generated: ${dateStr}`);
  lines.push("");
  lines.push("<!-- BLUEPRINT:START -->");
  lines.push("```text");
  lines.push("ravikishan/");
  lines.push("├── frontend/                        # Next.js (App Router)  -> the running app");
  lines.push("│   ├── app/                         # routes (URL-transparent route groups)");
  lines.push("│   │   ├── (marketing)/             # public landing pages (no AppShell)");
  lines.push("│   │   ├── (app)/                   # authenticated app shell (<AppShell>)");
  lines.push("│   │   ├── admin/                   # separate auth gate (OWNER/ADMIN)");
  lines.push("│   │   ├── login/  signup/          # public auth pages");
  lines.push("│   │   └── layout.tsx               # root: html/body + providers only");
  lines.push("│   ├── components/                  # ui/ design-system (pure) + feature components");
  lines.push("│   ├── features/                    # feature modules (auth, knowledge, mindmap, syllabus)");
  lines.push("│   ├── lib/                         # api/, auth/, content/, schemas/, types/");
  lines.push("│   ├── providers/  hooks/  public/  tests/  types/");
  lines.push("├── backend/                         # Express API (Supabase)");
  lines.push("│   └── src/                         # api/ auth/ db/ ai/ middleware/");
  lines.push("├── content/                         # shared curriculum content (data, not code)");
  lines.push("├── content-tools/                   # migration/validation scripts for content/");
  lines.push("├── scripts/                         # build/deploy + blueprint tooling");
  lines.push("├── docs/                            # ARCHITECTURE.md, DECISIONS.md, API_CONTRACT.md ...");
  lines.push("├── .github/workflows/ci.yml         # lint + typecheck + test + build");
  lines.push("├── AGENT_RULES.md  PROJECT_STATUS.md");
  lines.push("└── package.json                     # npm workspaces root");
  lines.push("```");
  lines.push("");
  lines.push("## 📁 Live structure (scanned from disk)");
  lines.push("");
  lines.push("```text");

  const rootNode = build(ROOT, "ravikishan");
  lines.push("ravikishan/");

  // Order top-level children: TOP_ORDER first, then remaining sorted.
  const orderedKids = [...rootNode.children].sort((a, b) => {
    const ia = TOP_ORDER.indexOf(a.name);
    const ib = TOP_ORDER.indexOf(b.name);
    const va = ia === -1 ? 999 : ia;
    const vb = ib === -1 ? 999 : ib;
    return va - vb || a.name.localeCompare(b.name);
  });
  const files = rootNode.files.filter((f) => !f.startsWith("."));

  const total = orderedKids.length + files.length;
  for (let i = 0; i < total; i++) {
    const isLast = i === total - 1;
    const branch = isLast ? "└──" : "├──";
    const childPrefix = (isLast ? "    " : "│   ");

    if (i < orderedKids.length) {
      const kid = orderedKids[i];
      const comment = COMMENT_FOR[kid.name] ? `   # ${COMMENT_FOR[kid.name]}` : "";
      lines.push(`${branch} ${kid.name}/${comment}`);
      renderChildren(kid, childPrefix, lines, 3);
    } else {
      const fname = files[i - orderedKids.length];
      lines.push(`${branch} ${fname}`);
    }
  }

  lines.push("```");
  lines.push("");
  lines.push("## 🔁 Keeping this up to date");
  lines.push("");
  lines.push("- Run manually after any change:  `npm run blueprint`");
  lines.push("- A **pre-commit git hook** regenerates it automatically before every commit;");
  lines.push("  if the tree changed, the new version is included in that commit.");
  lines.push("- The tree above is generated by scanning the real filesystem — it cannot drift.");
  lines.push("");
  lines.push("<!-- BLUEPRINT:END -->");

  return lines.join("\n") + "\n";
}

// Ensure docs/ exists.
if (!existsSync(join(ROOT, "docs"))) {
  mkdirSync(join(ROOT, "docs"), { recursive: true });
}

const md = buildMarkdown();
writeFileSync(OUTPUT_FILE, md, "utf8");
console.log(`✅ Blueprint updated: ${relative(ROOT, OUTPUT_FILE)}`);
console.log(`   ${(md.match(/\n/g) || []).length + 1} lines, ${Buffer.byteLength(md, "utf8")} bytes`);
