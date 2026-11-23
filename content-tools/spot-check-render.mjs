/**
 * Spot-check: replicate the loader's corpus branch (ranked pick) for a topic
 * and print which file a real class page would render now.
 */
import { readFileSync } from "node:fs";

const corpus = JSON.parse(
  readFileSync("frontend/public/data/content/manifest.json", "utf-8"),
);

function compact(v) {
  return String(v).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "");
}
function quality(entrySlug, filename, wanted) {
  if (entrySlug && entrySlug === wanted) return 3;
  if (filename && filename.includes(wanted)) return 2;
  const w = compact(wanted);
  if (w.length < 6) return 0;
  for (const c of [entrySlug, (filename ?? "").replace(/\.[a-z0-9]+$/i, "").replace(/^\d+[-_. ]+/, "")]) {
    const k = compact(c ?? "");
    if (k.length >= 6 && (k.startsWith(w) || w.startsWith(k))) return 1;
  }
  return 0;
}

function pick(topicSlug, classDir, unitId) {
  const cands = [];
  corpus.forEach((item, index) => {
    if (!item.path.startsWith("notes/concepts/")) return;
    const parts = item.path.split("/");
    if (parts[2] !== classDir || parts[4] !== unitId) return;
    const filename = parts.pop();
    const q = quality(item.data?.topicSlug, filename, topicSlug);
    if (!q) return;
    const chars = (item.data?.notes ?? []).reduce((s, n) => s + (typeof n === "string" ? n.length : 0), 0);
    cands.push({ path: item.path, q, chars, index, notes: item.data?.notes ?? [] });
  });
  cands.sort((a, b) => b.q - a.q || b.chars - a.chars || a.index - b.index);
  return cands;
}

const cases = [
  ["cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells", "class-11", "biomolecules-and-cell-biology"],
  ["monera-general-introduction-structure-of-bacterial-cell-mode-of-nutrition-bacterial-growth-cyanobacteria-blue-green-algae", "class-11", "introductory-microbiology"],
  ["mendel-s-laws-of-inheritance-monohybrid-and-dihybrid-cross", "class-12", "heredity-and-evolution"],
  ["immune-system-innate-and-adaptive-immunity", "class-12", "human-health-and-diseases"],
];

for (const [slug, cls, unit] of cases) {
  const cands = pick(slug, cls, unit);
  const win = cands[0];
  console.log("\n== " + slug.slice(0, 60) + " (" + cls + "/" + unit + ")");
  for (const c of cands.slice(0, 3)) {
    console.log("   q=" + c.q + " chars=" + c.chars + " " + c.path.split("/").pop());
  }
  if (win) {
    console.log("   WINNER: " + win.path.split("/").pop() + " - " + win.notes.length + " blocks");
    console.log("   block[1]: " + String(win.notes[1] ?? "").slice(0, 100).replace(/\n/g, " "));
  } else {
    console.log("   WINNER: none (falls to flat manifest)");
  }
}
