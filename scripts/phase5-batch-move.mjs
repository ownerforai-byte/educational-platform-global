/**
 * One-shot Phase 5 items 15–21: git mv + lib shims (+ tsconfig paths for large trees).
 * Run from repo root: node scripts/phase5-batch-move.mjs
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const FE = path.join(ROOT, "frontend");

function sh(mkdir, ...cmds) {
  if (mkdir) fs.mkdirSync(mkdir, { recursive: true });
  for (const c of cmds) {
    console.log(c);
    execSync(c, { cwd: ROOT, stdio: "inherit", shell: true });
  }
}

function shimLib(basename, feature, subpath = basename) {
  const libPath = path.join(FE, "lib", basename);
  fs.mkdirSync(path.dirname(libPath), { recursive: true });
  fs.writeFileSync(
    libPath,
    `export * from "@/features/${feature}/${subpath.replace(/\.tsx?$/, "")}";\n`,
  );
}

function shimComponent(rel, feature, sub = rel) {
  const p = path.join(FE, "components", rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const target = sub.replace(/\\/g, "/");
  fs.writeFileSync(p, `export * from "@/features/${feature}/components/${target.replace(/\.tsx?$/, "")}";\n`);
}

// ── 15 derivations ──
const DERIV = [
  "derivations.ts",
  "derivations-data.ts",
  "derivations-data-biology.ts",
  "derivations-data-chemistry.ts",
  "derivations-data-math.ts",
  "derivations-wave1-physics.ts",
  "derivations-wave2-chem-bio.ts",
  "derivations-wave2-math.ts",
  "derivations-wave2-physics-a.ts",
  "derivations-wave2-physics-b.ts",
  "derivations-wave2-physics-c.ts",
];
sh(path.join(FE, "features/derivations/components"));
for (const f of DERIV) {
  sh(null, `git mv "frontend/lib/${f}" "frontend/features/derivations/${f}"`);
  shimLib(f, "derivations", f.replace(/\.tsx?$/, ""));
}
sh(null, `git mv frontend/components/derivations frontend/features/derivations/components_staging`);
// rename staging -> merge into components
execSync('powershell -Command "Move-Item -Force frontend/features/derivations/components_staging/* frontend/features/derivations/components/"', {
  cwd: ROOT,
  shell: true,
});
fs.rmdirSync(path.join(FE, "features/derivations/components_staging"), { recursive: true });
for (const f of fs.readdirSync(path.join(FE, "features/derivations/components"))) {
  if (!f.endsWith(".tsx")) continue;
  shimComponent(`derivations/${f}`, "derivations", f);
}

// Fix PROJECT_ROOT in derivations.ts
const derivMain = path.join(FE, "features/derivations/derivations.ts");
let d = fs.readFileSync(derivMain, "utf8");
if (d.includes('resolve(dirname(__filename), "..", "..")')) {
  d = d.replace(
    'resolve(dirname(__filename), "..", "..")',
    'resolve(dirname(__filename), "..", "..", "..")',
  );
  fs.writeFileSync(derivMain, d);
}

fs.writeFileSync(
  path.join(FE, "features/derivations/index.ts"),
  DERIV.map((f) => `export * from "./${f.replace(/\.tsx?$/, "")}";`).join("\n") + "\n",
);

// ── 16 theorems ──
const THM = [
  "theorems.ts",
  "theorem-topics.ts",
  "theorem-fill-final.ts",
  "theorem-fill-physics-1.ts",
  "theorem-fill-physics-2.ts",
  "theorem-fill-chem-1.ts",
  "theorem-fill-chem-2.ts",
  "theorem-fill-chem-2b.ts",
  "theorem-fill-bio-math.ts",
];
sh(path.join(FE, "features/theorems/components"));
for (const f of THM) {
  sh(null, `git mv "frontend/lib/${f}" "frontend/features/theorems/${f}"`);
  shimLib(f, "theorems", f.replace(/\.tsx?$/, ""));
}
sh(null, `git mv frontend/components/theorems/theorems-explorer.tsx frontend/features/theorems/components/theorems-explorer.tsx`);
shimComponent("theorems/theorems-explorer.tsx", "theorems", "theorems-explorer.tsx");
fs.writeFileSync(
  path.join(FE, "features/theorems/index.ts"),
  THM.map((f) => `export * from "./${f.replace(/\.tsx?$/, "")}";`).join("\n") + "\n",
);

// ── 17 progress ──
sh(path.join(FE, "features/progress/components"));
sh(null, `git mv frontend/lib/progress frontend/features/progress/lib_staging`);
execSync('powershell -Command "Move-Item -Force frontend/features/progress/lib_staging/* frontend/features/progress/"', {
  cwd: ROOT,
  shell: true,
});
fs.rmdirSync(path.join(FE, "features/progress/lib_staging"), { recursive: true });
fs.mkdirSync(path.join(FE, "lib/progress"), { recursive: true });
fs.writeFileSync(path.join(FE, "lib/progress/catalog.ts"), 'export * from "@/features/progress/catalog";\n');
for (const f of ["progress-panel.tsx", "topic-progress-controls.tsx"]) {
  sh(null, `git mv "frontend/components/progress/${f}" "frontend/features/progress/components/${f}"`);
  shimComponent(`progress/${f}`, "progress", f);
}
fs.writeFileSync(path.join(FE, "features/progress/index.ts"), 'export * from "./catalog";\n');

// ── 18 practice ──
sh(path.join(FE, "features/practice/components"));
sh(null, `git mv frontend/lib/practice frontend/features/practice/lib_staging`);
execSync('powershell -Command "Move-Item -Force frontend/features/practice/lib_staging/* frontend/features/practice/"', {
  cwd: ROOT,
  shell: true,
});
fs.rmdirSync(path.join(FE, "features/practice/lib_staging"), { recursive: true });
for (const f of fs.readdirSync(path.join(FE, "features/practice"))) {
  if (!f.endsWith(".ts")) continue;
  fs.mkdirSync(path.join(FE, "lib/practice"), { recursive: true });
  fs.writeFileSync(path.join(FE, "lib/practice", f), `export * from "@/features/practice/${f.replace(/\.ts$/, "")}";\n`);
}
sh(null, `git mv frontend/components/practice frontend/features/practice/components_staging`);
execSync('powershell -Command "Move-Item -Force frontend/features/practice/components_staging/* frontend/features/practice/components/"', {
  cwd: ROOT,
  shell: true,
});
fs.rmdirSync(path.join(FE, "features/practice/components_staging"), { recursive: true });
for (const f of fs.readdirSync(path.join(FE, "features/practice/components"))) {
  if (!f.endsWith(".tsx")) continue;
  shimComponent(`practice/${f}`, "practice", f);
}
fs.writeFileSync(
  path.join(FE, "features/practice/index.ts"),
  fs
    .readdirSync(path.join(FE, "features/practice"))
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => `export * from "./${f.replace(/\.ts$/, "")}";`)
    .join("\n") + "\n",
);

// ── 19 high-yield-facts ──
const HY = fs.readdirSync(path.join(FE, "lib")).filter((f) => f.startsWith("high-yield-topic-facts"));
sh(path.join(FE, "features/high-yield-facts"));
for (const f of HY) {
  sh(null, `git mv "frontend/lib/${f}" "frontend/features/high-yield-facts/${f}"`);
  shimLib(f, "high-yield-facts", f.replace(/\.tsx?$/, ""));
}
fs.writeFileSync(
  path.join(FE, "features/high-yield-facts/index.ts"),
  HY.map((f) => `export * from "./${f.replace(/\.tsx?$/, "")}";`).join("\n") + "\n",
);

// Fix internal @/lib/high-yield imports in feature folder
for (const f of HY) {
  const p = path.join(FE, "features/high-yield-facts", f);
  let s = fs.readFileSync(p, "utf8");
  s = s.replace(/@\/lib\/(high-yield-topic-facts[-\w]*)/g, "./$1");
  fs.writeFileSync(p, s);
}

console.log("\nDone batch 15-19. Run lab/ai moves separately if needed.");
