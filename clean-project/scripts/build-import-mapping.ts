import fs from "fs";
import path from "path";

const RAVIKISHAN_MANIFEST = path.join(process.cwd(), "content", "ravikishan", "manifest.json");
const R_EXPORT_PATH = path.join(process.cwd(), "content", "r-export", "manifest.json");

function readRavikishanManifest() {
  if (!fs.existsSync(RAVIKISHAN_MANIFEST)) return [];
  return JSON.parse(fs.readFileSync(RAVIKISHAN_MANIFEST, "utf-8"));
}

function readRExportManifest() {
  if (!fs.existsSync(R_EXPORT_PATH)) return [];
  return JSON.parse(fs.readFileSync(R_EXPORT_PATH, "utf-8"));
}

const rav = readRavikishanManifest();
const rexp = readRExportManifest();

function ravSubject(item: { path: string }) {
  const parts = item.path.split(/[\\/]/);
  return parts[1] || "unknown";
}

function ravClass(item: { path: string }) {
  const parts = item.path.split(/[\\/]/);
  return parts[0] || "unknown";
}

function ravUnit(item: { path: string }) {
  const parts = item.path.split(/[\\/]/);
  return parts[2] || undefined;
}

function mapRavUnitToSyllabus(subject: string, unit: string): string | undefined {
  const key = `${subject}/${unit}`.toLowerCase();
  const map: Record<string, string> = {
    "chemistry/unit-2-stoichiometry": "stoichiometry",
    "chemistry/unit-3-atomic-structure": "atomic-structure",
    "chemistry/classification-of-elements-and-periodic-table": "classification-of-elements-and-periodic-table",
    "chemistry/chemical-bonding-and-shapes-of-molecules": "chemical-bonding-and-shapes-of-molecules",
    "chemistry/oxidation-and-reduction": "oxidation-and-reduction",
    "chemistry/states-of-matter": "states-of-matter",
    "chemistry/chemical-equilibrium": "chemical-equilibrium",
    "chemistry/chemistry-of-non-metals": "chemistry-of-non-metals",
    "chemistry/chemistry-of-metals": "chemistry-of-metals",
    "chemistry/bio-inorganic-chemistry": "bio-inorganic-chemistry",
    "chemistry/basic-concept-of-organic-chemistry": "basic-concept-of-organic-chemistry",
    "chemistry/fundamental-principles-of-organic-chemistry": "fundamental-principles-of-organic-chemistry",
    "chemistry/hydrocarbons": "hydrocarbons",
    "chemistry/aromatic-hydrocarbons": "aromatic-hydrocarbons",
    "chemistry/fundamentals-of-applied-chemistry": "fundamentals-of-applied-chemistry",
    "chemistry/modern-chemical-manufactures": "modern-chemical-manufactures",
    "physics/thermodynamics": "heat-and-temperature",
    "physics/unit-2-vectors": "vectors",
    "physics/unit-11-quantity-of-heat": "quantity-of-heat",
    "physics/heat": "heat-and-temperature",
    "physics/mechanics": "mechanics",
    "physics/optics": "optics",
    "mathematics/analytic-geometry": "analytic-geometry",
    "mathematics/calculus": "calculus",
    "mathematics/matrix-(algebra)": "algebra",
    "biology/botany": "floral-diversity",
    "biology/unit-8-faunal-diversity": "faunal-diversity",
    "english/short-stories": "reading-and-comprehension",
    "nepali/bhashatattva": "bhasha-ra-vyakarana",
    "nepali/poems": "sahitya-adhyayan",
  };
  return map[key] || undefined;
}

const IMPORTED_NOTES_BY_SUBJECT: Record<string, any[]> = {
  chemistry: [],
  physics: [],
  mathematics: [],
  biology: [],
  english: [],
  nepali: [],
};

for (const item of rav) {
  const cls = ravClass(item);
  const subject = ravSubject(item);
  const unitPath = ravUnit(item);
  const unit = unitPath ? mapRavUnitToSyllabus(subject, unitPath) : undefined;
  
  let target: "class-11-notes" | "class-11e" | "class-11-more";
  if (cls === "class-11e") {
    target = "class-11e";
  } else if (unit) {
    target = "class-11-notes";
  } else {
    target = "class-11-more";
  }
  
  if (!IMPORTED_NOTES_BY_SUBJECT[subject]) {
    IMPORTED_NOTES_BY_SUBJECT[subject] = [];
  }
  
  IMPORTED_NOTES_BY_SUBJECT[subject].push({
    title: item.data?.title ?? path.basename(item.path, ".json"),
    path: item.path,
    subject,
    unit,
    target,
    source: "ravikishan" as const,
  });
}

for (const item of rexp) {
  const subject = item.subject;
  if (!IMPORTED_NOTES_BY_SUBJECT[subject]) {
    IMPORTED_NOTES_BY_SUBJECT[subject] = [];
  }
  
  const unit = mapRavUnitToSyllabus(subject, item.chapter);
  const target = unit ? "class-11-notes" : "class-11-more";
  
  IMPORTED_NOTES_BY_SUBJECT[subject].push({
    title: item.title,
    path: `${subject}/${item.chapter}/${item.id}`,
    subject,
    unit,
    target: target as any,
    source: "r-export" as const,
  });
}

console.log("=== MAPPING SUMMARY ===");
for (const [subj, notes] of Object.entries(IMPORTED_NOTES_BY_SUBJECT)) {
  const byTarget: Record<string, number> = {};
  for (const n of notes) {
    byTarget[n.target] = (byTarget[n.target] || 0) + 1;
  }
  console.log(`${subj}: ${notes.length} notes -> ${JSON.stringify(byTarget)}`);
}
