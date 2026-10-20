#!/usr/bin/env node
/**
 * Verify every link in the Physics XI companion's nextSteps layer.
 *
 * Two kinds of link, two sources of truth:
 *   • /class-11-notes/physics/chapters/<unitId> — the unit id must exist in
 *     the NEB physics syllabus (frontend/lib/syllabus.ts), otherwise the
 *     chapter page renders nothing.
 *   • /lab/<labId> — the lab id must exist in the lab registry
 *     (frontend/lib/lab-registry.tsx), otherwise the hub 404s.
 *
 * Usage:
 *   node node_modules/tsx/dist/cli.mjs scripts/verify-physics-xi-links.mts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getSubjectSyllabus } from "../frontend/lib/syllabus";
import { PHYSICS_XI_ENRICHMENT_01_13 } from "./physics-xi-academic-content-01-13";
import { PHYSICS_XI_ENRICHMENT_14_26 } from "./physics-xi-academic-content-14-26";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const enrichment = {
  ...PHYSICS_XI_ENRICHMENT_01_13,
  ...PHYSICS_XI_ENRICHMENT_14_26,
};

const syllabus = getSubjectSyllabus("class-11-notes", "physics");
if (!syllabus) throw new Error("No class-11 physics syllabus");

const unitIds = new Set(syllabus.units.map((unit) => unit.id));

// The lab registry is a React module that imports every lab component, so it
// is read as source here: the ids are a flat, stable list of `id: "…"` keys.
const registrySource = fs.readFileSync(
  path.join(ROOT, "frontend", "lib", "lab-registry.tsx"),
  "utf8",
);
const labIds = new Set(
  [...registrySource.matchAll(/^\s{4}id: "([^"]+)",$/gm)].map((match) => match[1]),
);

const problems: string[] = [];
let checked = 0;

for (const [unitId, content] of Object.entries(enrichment)) {
  if (!unitIds.has(unitId)) {
    problems.push(`unit "${unitId}" has no physics syllabus entry`);
  }
  for (const step of content.nextSteps) {
    checked += 1;
    const chapter = /^\/class-11-notes\/physics\/chapters\/(.+)$/.exec(step.href);
    if (chapter) {
      if (!unitIds.has(chapter[1])) {
        problems.push(`${unitId}: chapter link "${step.href}" has no syllabus unit`);
      }
      continue;
    }
    const lab = /^\/lab\/(.+)$/.exec(step.href);
    if (lab) {
      if (!labIds.has(lab[1])) {
        problems.push(`${unitId}: lab link "${step.href}" has no registry entry`);
      }
      continue;
    }
    problems.push(`${unitId}: unrecognised link shape "${step.href}"`);
  }
}

console.log(`Checked ${checked} next-step links across ${Object.keys(enrichment).length} units.`);
if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("All next-step links resolve.");
