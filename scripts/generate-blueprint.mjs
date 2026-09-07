#!/usr/bin/env node
/**
 * Regenerates docs/ARCHITECTURE_BLUEPRINT.md by scanning the real filesystem.
 * The section between <!-- BLUEPRINT:START --> and <!-- BLUEPRINT:END --> is
 * fully machine-generated; run manually with `npm run blueprint`, or rely on
 * the pre-commit hook (see scripts/hooks/pre-commit + scripts/install-hooks.mjs).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "docs", "ARCHITECTURE_BLUEPRINT.md");

/** Hand-maintained overview tree (kept in sync with the repo's top level). */
const CURATED_TREE = `ravikishan/
├── frontend/                        # Next.js (App Router)  -> the running app
│   ├── app/                         # routes (URL-transparent route groups)
│   │   ├── (marketing)/             # public landing pages (no AppShell)
│   │   ├── (app)/                   # authenticated app shell (<AppShell>)
│   │   ├── admin/                   # separate auth gate (OWNER/ADMIN)
│   │   ├── login/  signup/          # public auth pages
│   │   └── layout.tsx               # root: html/body + providers only
│   ├── components/                  # ui/ design-system (pure) + feature components
│   ├── features/                    # feature modules (auth, knowledge, mindmap, syllabus)
│   ├── lib/                         # api/, auth/, content/, schemas/, types/
│   ├── providers/  hooks/  public/  tests/  types/
├── backend/                         # Express API (Supabase)
│   └── src/                         # api/ auth/ db/ ai/ middleware/
├── content/                         # shared curriculum content (data, not code)
├── content-tools/                   # migration/validation scripts for content/
├── scripts/                         # build/deploy + blueprint tooling
├── docs/                            # ARCHITECTURE.md, DECISIONS.md, API_CONTRACT.md ...
├── .github/workflows/ci.yml         # lint + typecheck + test + build
├── AGENT_RULES.md  PROJECT_STATUS.md
└── package.json                     # npm workspaces root`;

const IGNORE_DIRS = new Set([
  "node_modules", ".git", ".next", "dist", "build", "coverage",
  ".vercel", ".turbo", ".cache", ".nuxt", "tmp", "temp", ".idea", ".vscode",
]);

/** Short annotations for notable directories (best-effort, cosmetic only). */
const DIR_COMMENTS = {
  "frontend": "Next.js app",
  "frontend/app/(app)": "authenticated app shell (wraps pages in <AppShell>)",
  "frontend/app/(marketing)": "public landing routes (no AppShell)",
  "frontend/app/admin": "separate auth gate (OWNER/ADMIN)",
  "frontend/app/knowledge": "grammar (EN), byakaran (NE), numerical-*, biology-diagrams",
  "frontend/app/notes": "the ONE note viewer (r-notes + ravikishan-notes consolidated)",
  "frontend/components": "ui/ design-system + feature components",
  "frontend/features": "feature modules (auth, knowledge, mindmap, syllabus)",
  "frontend/lib": "api/, auth/, content/, schemas/, types/",
  "backend": "Express API (Supabase)",
  "backend/src": "api/ auth/ db/ ai/ middleware/",
  "content": "shared curriculum content (data, not code)",
  "content/ravikishan": "imported curriculum JSON (concepts, mindmaps, exams)",
  "content-tools": "migration/validation scripts for content/",
  "scripts": "build/deploy + blueprint tooling",
  "docs": "architecture & process docs",
  ".github/workflows": "CI/CD pipelines",
  "supabase": "Supabase project config & SQL",
};

const MAX_DEPTH = 5; // directories at this depth collapse to "…"
const MAX_ENTRIES = 60; // safety cap per directory

/** @returns {string[]} rendered lines for this directory */
function walk(dir, rel, depth, prefix, lines) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  const dirNames = entries
    .filter((e) => e.isDirectory() && !IGNORE_DIRS.has(e.name) && (!e.name.startsWith(".") || e.name === ".github"))
    .map((e) => e.name)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const fileNames = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  const show = [...dirNames, ...fileNames];
  const overflow = show.length - MAX_ENTRIES;
  const visible = overflow > 0 ? show.slice(0, MAX_ENTRIES) : show;

  visible.forEach((name, i) => {
    const last = i === visible.length - 1 && overflow <= 0;
    const branch = last ? "└── " : "├── ";
    const childPrefix = prefix + (last ? "    " : "│   ");
    const abs = path.join(dir, name);
    const relName = rel ? `${rel}/${name}` : name;

    if (dirNames.includes(name)) {
      const comment = DIR_COMMENTS[relName] ? `   # ${DIR_COMMENTS[relName]}` : "";
      lines.push(`${prefix}${branch}${name}/${comment}`);
      if (depth + 1 >= MAX_DEPTH) {
        lines.push(`${childPrefix}└── …`);
      } else {
        walk(abs, relName, depth + 1, childPrefix, lines);
      }
    } else {
      lines.push(`${prefix}${branch}${name}`);
    }
  });
  if (overflow > 0) {
    lines.push(`${prefix}└── … (${overflow} more entries)`);
  }
}

function buildLiveTree() {
  const lines = ["ravikishan/"];
  walk(ROOT, "", 0, "", lines);
  return lines.join("\n");
}

function render() {
  const today = new Date().toISOString().slice(0, 10);
  return `# 🧭 Architecture Blueprint — ravikishan (educational-platform-global)

> **Auto-generated** — do not edit by hand. Regenerate with \`npm run blueprint\` (runs automatically on every commit via the pre-commit hook).
> Generated: ${today}

<!-- BLUEPRINT:START -->
\`\`\`text
${CURATED_TREE}
\`\`\`

## 📁 Live structure (scanned from disk)

\`\`\`text
${buildLiveTree()}
\`\`\`

## 🔁 Keeping this up to date

- Run manually after any change:  \`npm run blueprint\`
- A **pre-commit git hook** regenerates it automatically before every commit;
  if the tree changed, the new version is included in that commit.
- The tree above is generated by scanning the real filesystem — it cannot drift.

<!-- BLUEPRINT:END -->
`;
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, render(), "utf8");
console.log(`Blueprint regenerated -> ${path.relative(ROOT, OUT)}`);

