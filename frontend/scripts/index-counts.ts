/**
 * Counts everything the site index will route — used to size the head page.
 * Run from frontend/:  npx tsx scripts/index-counts.ts
 */
import { LAB_REGISTRY } from "../lib/lab-registry";
import { ALL_GRAPHS } from "../lib/graphs";
import { PRO_SECTIONS } from "../features/knowledge/pro";
import { getTheoremProofRoutes, getSyllabusTheoremItems } from "../lib/theorem-topics";

let chapters = 0;
for (const s of PRO_SECTIONS) chapters += s.chapters.length;

const routes = getTheoremProofRoutes();
let topics = 0;
for (const r of routes) topics += getSyllabusTheoremItems(r.classSlug, r.subjectSlug).length;

console.log("labs          :", LAB_REGISTRY.length);
console.log("graphs        :", ALL_GRAPHS.length);
console.log("pro sections  :", PRO_SECTIONS.length);
console.log("pro chapters  :", chapters);
console.log("proof tracks  :", routes.length);
console.log("proof topics  :", topics);
console.log("routes:", routes.map((r) => `${r.classSlug}/${r.subjectSlug}`).join(", "));
