/**
 * Fetch noteswift.in post sitemaps and emit a classified catalog for the app.
 *
 *   node content-tools/streams/scrape-noteswift-catalog.mjs
 */
import https from "node:https";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "user-agent": "RavikisanPlatformCatalogBot/1.0" } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function slugToTitle(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Map the tail of a noteswift URL to our syllabus unitId (per subject). */
const MATH_XI = {
  algebra: /^(algebra|set|logic|function|curve|sequence|matrix|matrices|determinant|quadratic|complex)/,
  trigonometry: /^(trigonometry|inverse-circular|trigonometric)/,
  "analytic-geometry": /^(analytic-geometry|pair-of-straight|straight-line|circle|conic|coordinates-in-space|parabola|ellipse|hyperbola)/,
  vectors: /^vector/,
  "statistics-and-probability": /^(statistics|probability|measure-of-dispersion|dispersion)/,
  calculus: /^(limit|continuity|derivative|differentiation|application-of-derivative|antiderivative|integration)/,
  "computational-methods-or-mechanics": /^(numerical|statics|dynamics|mechanics)/,
};

const MATH_XII = {
  "functions-and-equations": /^(function|relation|curve|polynomial)/,
  "limits-and-continuity": /^(limit|continuity|complex)/,
  differentiation: /^differentiation|derivative/,
  "application-of-derivatives": /^application/,
  antiderivatives: /^antiderivative|integration/,
  "application-of-antiderivatives": /^application-of-antiderivative|area/,
  "vectors-and-three-dimensional-geometry": /^vector|3d|three-dimensional/,
  "linear-programming": /^linear-programming/,
  probability: /^probability/,
  "mechanics-or-computational-methods": /^(numerical|statics|dynamics|mechanics|computational)/,
};

const PHYS_XI = {
  "physical-quantities": /^(physical-quantities|measurement|dimension)/,
  vectors: /^vector/,
  dynamics: /^dynamics|newton|friction|work|energy|power/,
  gravitation: /^gravitation/,
  "heat-and-temperature": /^heat|temperature|calorimetry/,
  "thermal-expansion": /^thermal-expansion/,
  "ideal-gas": /^ideal-gas|kinetic/,
  lenses: /^lens|optics|refraction/,
};

const CHEM_XI = {
  "foundation-and-fundamentals": /^(foundation|fundamental|basic)/,
  "atomic-structure": /^atomic/,
  "chemical-bonding-and-shapes-of-molecules": /^(chemical-bonding|bonding|vsepr|shapes)/,
  stoichiometry: /^stoichiometry|mole/,
  "states-of-matter": /^state/,
  "oxidation-and-reduction": /^(oxidation|redox)/,
  "chemical-equilibrium": /^equilibrium/,
  "chemistry-of-non-metals": /^non-metal|hydrogen|halogen|oxygen|nitrogen|sulphur|phosphorus/,
  "chemistry-of-metals": /^metal|s-block|p-block-metal|transition/,
  "fundamentals-of-applied-chemistry": /^applied|practical|industrial/,
};

const BIO_XI = {
  "biomolecules-and-cell-biology": /^(biomolecule|cell|division|meiosis|mitosis)/,
  "floral-diversity": /^(flora|plant|biodiversity|fungi|algae|bryophyte|pteridophyte|gymnosperm|angiosperm)/,
  "faunal-diversity": /^(fauna|animal|zoology)/,
  "introductory-microbiology": /^(microbiology|bacteria|virus)/,
};

const SUBJECT_RULES = {
  mathematics: { 11: MATH_XI, 12: MATH_XII },
  physics: { 11: PHYS_XI, 12: {} },
  chemistry: { 11: CHEM_XI, 12: {} },
  biology: { 11: BIO_XI, 12: {} },
};

function classifyUnit(subject, classYear, pathTail) {
  const rules = SUBJECT_RULES[subject]?.[classYear];
  if (!rules) return null;
  const norm = pathTail.toLowerCase();
  for (const [unitId, re] of Object.entries(rules)) {
    if (re.test(norm)) return unitId;
  }
  return null;
}

function parseEntry(url) {
  const m = url.match(
    /noteswift\.in\/class-(11|12)-([a-z]+)-(.+?)\/?$/i,
  );
  if (!m) return null;
  const classYear = m[1];
  const subject = m[2].toLowerCase();
  const tail = m[3].replace(/\/$/, "");
  if (!["mathematics", "physics", "chemistry", "biology", "english", "nepali"].includes(subject)) {
    return null;
  }
  const unitId = classifyUnit(subject, classYear, tail);
  return {
    id: `noteswift-${classYear}-${subject}-${tail.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
    title: `NoteSwift · ${slugToTitle(tail)}`,
    articleUrl: url.endsWith("/") ? url : `${url}/`,
    classYear,
    subjectSlug: subject,
    unitId,
    pathTail: tail,
  };
}

async function extractDriveId(pageUrl) {
  try {
    const html = await get(pageUrl);
    const ids = [...new Set([...html.matchAll(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/g)].map((x) => x[1]))];
    return ids;
  } catch {
    return [];
  }
}

async function main() {
  // WordPress index sometimes returns an empty body to Node — post sitemaps are stable.
  const sitemaps = [
    "https://noteswift.in/post-sitemap1.xml",
    "https://noteswift.in/post-sitemap2.xml",
    "https://noteswift.in/post-sitemap3.xml",
  ];
  const urls = [];
  for (const sm of sitemaps) {
    const xml = await get(sm);
    for (const loc of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const u = loc[1];
      if (/class-(11|12)-/i.test(u)) urls.push(u);
    }
  }

  const entries = [];
  for (const url of urls) {
    const parsed = parseEntry(url);
    if (parsed) entries.push(parsed);
  }

  const withDrive = entries.filter((e) =>
    ["mathematics", "physics", "chemistry", "biology"].includes(e.subjectSlug),
  );
  for (const entry of withDrive) {
    entry.driveIds = await extractDriveId(entry.articleUrl);
    process.stderr.write(`.`);
  }
  process.stderr.write("\n");
  for (const entry of entries.filter((e) => !withDrive.includes(e))) {
    entry.driveIds = [];
  }

  // Owner-provided complex number PDF (not always embedded in the article HTML).
  const complex = entries.find((e) => e.pathTail.includes("complex-number"));
  if (complex && !complex.driveIds.includes("17D5T2_bJqv9FD-rGaXk8U0YKDQZpgh2m")) {
    complex.driveIds.unshift("17D5T2_bJqv9FD-rGaXk8U0YKDQZpgh2m");
  }
  if (complex) complex.unitId = complex.unitId ?? "algebra";

  const outPath = path.join(ROOT, "frontend/lib/streams/noteswift-catalog.generated.json");
  writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), entries }, null, 2));
  console.log(`Wrote ${entries.length} entries → ${outPath}`);
  console.log(
    "classified",
    entries.filter((e) => e.unitId).length,
    "unclassified",
    entries.filter((e) => !e.unitId).length,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});