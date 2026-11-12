import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const candidates = [
  path.join(root, "node_modules", "vitest", "vitest.mjs"),
  path.join(root, "..", "node_modules", "vitest", "vitest.mjs"),
];
const bin = candidates.find((p) => fs.existsSync(p));
if (!bin) {
  console.error("vitest.mjs not found", candidates);
  process.exit(2);
}
console.log("using", bin);

const r = spawnSync(
  process.execPath,
  [bin, "run", "tests/_minimal.test.ts", "--pool=threads", "--no-file-parallelism", "--no-cache"],
  { cwd: root, encoding: "utf8" },
);
console.log("status", r.status);
console.log((r.stdout || "").slice(-5000));
console.error((r.stderr || "").slice(-5000));
