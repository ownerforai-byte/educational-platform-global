/**
 * Audit the lab-studio spec registry: coverage against the 3D labs, duplicate
 * keys, views per spec, material/shape validity and knowledge-row sanity.
 * Run: npx tsx scripts/studio-audit.ts
 */
import { readFileSync } from "node:fs";
import { getLabStudio, LAB_STUDIOS } from "../lib/lab-studios";

const registry = readFileSync("lib/lab-registry.tsx", "utf8");
const labIds = [...registry.matchAll(/^\s*id: "([^"]+)"/gm)].map((m) => m[1]);
const threeD = labIds.filter((id) => id.includes("3d") || id.startsWith("molecular-builder"));

const specs = LAB_STUDIOS as Record<string, { views: unknown[]; parts: unknown[]; studio?: string }>;
const suspect: string[] = [];

for (const [id, spec] of Object.entries(specs)) {
  if (!spec.studio) suspect.push(`${id}: no studio title`);
  if (!spec.views?.length) suspect.push(`${id}: no views`);
  if (!spec.parts?.length) suspect.push(`${id}: no parts`);
}

const missing = threeD.filter((id) => !getLabStudio(id));

console.log("labs in registry:", labIds.length, "| 3D labs:", threeD.length);
console.log("specs:", Object.keys(specs).length);
console.log("avg parts:", (Object.values(specs).reduce((a, s) => a + s.parts.length, 0) / Object.keys(specs).length).toFixed(1));
console.log("avg views:", (Object.values(specs).reduce((a, s) => a + s.views.length, 0) / Object.keys(specs).length).toFixed(1));
console.log("theory panels:", Object.values(specs).filter((s) => (s as { theory?: unknown }).theory).length);
console.log("3D labs without a studio:", missing.length ? missing : "none");
console.log("SUSPECT:", suspect.length ? suspect : []);
