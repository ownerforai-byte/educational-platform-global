/**
 * Nepali Educate (nepalieducate.com) — class 11 pages with embedded Drive solution PDFs.
 *
 *   node content-tools/streams/scrape-nepalieducate-catalog.mjs
 */
import https from "node:https";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const SUBJECTS = new Set(["mathematics", "physics", "chemistry", "biology", "english", "nepali"]);

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

const UNIT_RULES = [
  { subject: "mathematics", re: /complex|quadratic|matrix|determinant|sequence|logic|set|function|curve-sketching/i, unitId: "algebra" },
  { subject: "mathematics", re: /trigonometry|inverse-circular/i, unitId: "trigonometry" },
  { subject: "mathematics", re: /circle|analytic|analytical|conic|straight-line|coordinate/i, unitId: "analytic-geometry" },
  { subject: "mathematics", re: /vector/i, unitId: "vectors" },
  { subject: "mathematics", re: /probability|statistics|dispersion/i, unitId: "statistics-and-probability" },
  { subject: "mathematics", re: /derivative|anti-derivative|antiderivative|integral|limit|calculus/i, unitId: "calculus" },
  { subject: "mathematics", re: /numeric|static|dynamic|mechanic|kinematic/i, unitId: "computational-methods-or-mechanics" },
  { subject: "physics", re: /kinematic/i, unitId: "kinematics" },
  { subject: "physics", re: /vector/i, unitId: "vectors" },
  { subject: "physics", re: /dynamic|newton|friction/i, unitId: "dynamics" },
  { subject: "physics", re: /electric|dc-circuit|capacitor/i, unitId: "electric-charges" },
  { subject: "chemistry", re: /aromatic|hydrocarbon/i, unitId: "hydrocarbon" },
  { subject: "chemistry", re: /oxidation|redox/i, unitId: "oxidation-and-reduction" },
  { subject: "physics", re: /gravitation/i, unitId: "gravitation" },
  { subject: "physics", re: /heat|temperature|calorimetry/i, unitId: "heat-and-temperature" },
  { subject: "physics", re: /optic|lens|refraction/i, unitId: "lenses" },
  { subject: "chemistry", re: /atomic/i, unitId: "atomic-structure" },
  { subject: "chemistry", re: /stoichiometry|mole/i, unitId: "stoichiometry" },
  { subject: "chemistry", re: /state-of-matter|states-of-matter/i, unitId: "states-of-matter" },
  { subject: "chemistry", re: /equilibrium/i, unitId: "chemical-equilibrium" },
  { subject: "chemistry", re: /metal|inorganic/i, unitId: "chemistry-of-metals" },
  { subject: "chemistry", re: /organic|hydrocarbon|aromatic/i, unitId: "hydrocarbon" },
  {
    subject: "chemistry",
    re: /chemistry-complete-solution|inorganic/i,
    unitId: "foundation-and-fundamentals",
  },
  { subject: "biology", re: /cell|biomolecule/i, unitId: "biomolecules-and-cell-biology" },
  { subject: "biology", re: /ecolog/i, unitId: "ecology" },
];

function guessSubject(url) {
  const s = url.toLowerCase();
  if (/download-|social-book|english-book|nepali-book/i.test(s)) return null;
  if (
    /chemistry|hydrocarbon|inorganic|oxidation|states-of-matter|metal-class-11|aromatic/i.test(s)
  ) {
    return "chemistry";
  }
  if (
    /mathematics|probability|complex-number|curve-sketching|derivative|anti-derivative|circle-exercise|the-circle/i.test(
      s,
    )
  ) {
    return "mathematics";
  }
  if (/physics|kinematic|vector|electric|capacitor/i.test(s)) return "physics";
  if (/biology/i.test(s)) return "biology";
  if (/english|sunny-morning/i.test(s)) return "english";
  if (/nepali|bir-purkha|gaun-ko-maya/i.test(s)) return "nepali";
  return null;
}

function classifyUnit(subjectSlug, url) {
  const norm = url.toLowerCase();
  for (const rule of UNIT_RULES) {
    if (rule.subject === subjectSlug && rule.re.test(norm)) return rule.unitId;
  }
  return null;
}

function parseSlug(url) {
  const m = url.match(/\/(\d{4})\/(\d{2})\/([^/.]+)\.html/);
  return m ? m[3] : url;
}

function isSolutionPage(url) {
  const s = url.toLowerCase();
  if (/download-|model-paper|theory-note|important-question|paper-class|complete-notes/i.test(s)) {
    return false;
  }
  if (
    /exercise-\d|complete-solution|anti-derivative|derivative-exercise|the-circle-exercise/i.test(s)
  ) {
    return true;
  }
  if (
    /vectors-class-11|kinematics-class-11|electric-charges|states-of-matter-class-11-chemistry/i.test(
      s,
    )
  ) {
    return true;
  }
  return false;
}

async function extractDriveIds(pageUrl) {
  try {
    const html = await get(pageUrl);
    const ids = [
      ...new Set(
        [...html.matchAll(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/g)].map((x) => x[1]),
      ),
    ];
    return { html, ids };
  } catch {
    return { html: "", ids: [] };
  }
}

async function main() {
  const xml = await get("https://www.nepalieducate.com/sitemap.xml");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const class11 = locs.filter((u) => /class[\s_-]*11|grade[\s_-]*11/i.test(u));

  const entries = [];
  for (const articleUrl of class11) {
    const { html, ids } = await extractDriveIds(articleUrl);
    if (ids.length === 0) continue;
    const subjectSlug = guessSubject(articleUrl);
    if (!subjectSlug || !SUBJECTS.has(subjectSlug)) continue;
    if (!isSolutionPage(articleUrl)) continue;

    const slug = parseSlug(articleUrl);
    const unitId = classifyUnit(subjectSlug, `${articleUrl} ${slug}`);
    const title = `Nepali Educate · ${slugToTitle(slug)}`;

    entries.push({
      id: `nepalieducate-11-${subjectSlug}-${slug}`.replace(/[^a-z0-9]+/gi, "-").toLowerCase(),
      title,
      articleUrl,
      classYear: "11",
      subjectSlug,
      unitId,
      pathTail: slug,
      driveIds: ids,
    });
    process.stderr.write(".");
  }
  process.stderr.write("\n");

  const outPath = path.join(ROOT, "frontend/lib/streams/nepalieducate-catalog.generated.json");
  writeFileSync(
    outPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), provider: "nepalieducate.com", entries }, null, 2),
  );
  console.log(`Wrote ${entries.length} class-11 solution entries → ${outPath}`);
  const bySubj = {};
  for (const e of entries) bySubj[e.subjectSlug] = (bySubj[e.subjectSlug] || 0) + e.driveIds.length;
  console.log("pdfs by subject", bySubj);
  console.log(
    "classified units",
    entries.filter((e) => e.unitId).length,
    "unclassified",
    entries.filter((e) => !e.unitId).length,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});