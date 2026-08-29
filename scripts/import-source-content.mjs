import fs from "fs";
import path from "path";

const SOURCE_ROOT = "C:\\Users\\ASUS\\Desktop\\ravikishan\\backend\\content";
const DEST_ROOT = "C:\\Users\\ASUS\\Desktop\\educational-platform-global\\content\\ravikishan";
const R_EXPORT_MANIFEST = "C:\\Users\\ASUS\\Desktop\\educational-platform-global\\content\\r-export\\manifest.json";
const R_EXPORT_CONTENT = "C:\\Users\\ASUS\\Desktop\\educational-platform-global\\content\\r-export\\content-export.json";

const UNIT_MAP = {
  "class-11/chemistry/unit-2-stoichiometry": { classSlug: "class-11-notes", subjectSlug: "chemistry", unitSlug: "stoichiometry" },
  "class-11/chemistry/unit-3-atomic-structure": { classSlug: "class-11-notes", subjectSlug: "chemistry", unitSlug: "atomic-structure" },
  "class-11/mathematics/analytic-geometry": { classSlug: "class-11-notes", subjectSlug: "mathematics", unitSlug: "analytic-geometry" },
  "class-11/physics/thermodynamics": { classSlug: "class-11-notes", subjectSlug: "physics", unitSlug: "heat-and-temperature" },
  "class-11/physics/unit-11-quantity-of-heat": { classSlug: "class-11-notes", subjectSlug: "physics", unitSlug: "quantity-of-heat" },
  "class-11/physics/unit-2-vectors": { classSlug: "class-11-notes", subjectSlug: "physics", unitSlug: "vectors" },
  "class-11e/biology/unit-8-faunal-diversity": { classSlug: "class-11e", subjectSlug: "biology", unitSlug: "faunal-diversity" },
  "class-11e/mathematics/calculus": { classSlug: "class-11e", subjectSlug: "mathematics", unitSlug: "calculus" },
  "class-11e/physics/unit-01-vectors": { classSlug: "class-11e", subjectSlug: "physics", unitSlug: "vectors" },
  "class-11e/physics/unit-3-kinematics": { classSlug: "class-11e", subjectSlug: "physics", unitSlug: "kinematics" },
};

const SYLLABUS_TOPICS = {
  "stoichiometry": [
    "Dalton's atomic theory and its postulates",
    "Laws of stoichiometry",
    "Avogadro's law and some deductions: molecular mass and vapour density, molecular mass and volume of gas, molecular mass and number of particles",
    "Mole and its relation with mass, volume and number of particles",
    "Calculations based on mole concept",
    "Limiting reactant and excess reactant",
    "Theoretical yield, experimental yield and % yield",
    "Calculation of empirical and molecular formula from % composition (solving related numerical problems)",
  ],
  "atomic-structure": [
    "Rutherford's atomic model and its limitations",
    "Postulates of Bohr's atomic model and its application",
    "Spectrum of hydrogen atom",
    "Defects of Bohr's theory",
    "Elementary idea of quantum mechanical model: de Broglie's wave equation",
    "Heisenberg's Uncertainty Principle and concept of probability",
    "Quantum numbers",
    "Orbitals and shape of s and p orbitals only",
    "Aufbau principle, Pauli's exclusion principle, Hund's rule and electronic configurations of atoms and ions (up to atomic no. 30)",
  ],
  "analytic-geometry": [
    "Straight line: length of perpendicular from a given point to a given line, bisectors of the angles between two straight lines",
    "Pair of straight lines: general equation of second degree in x and y, condition for representing a pair of lines, homogenous second-degree equation in x and y, angle between pair of lines, bisectors of the angles between pair of lines",
    "Coordinates in space: points in space, distance between two points, direction cosines and ratios of a line",
  ],
  "heat-and-temperature": [
    "Molecular concept of thermal energy, heat and temperature; cause and direction of heat flow",
    "Meaning of thermal equilibrium and Zeroth law of thermodynamics",
    "Thermal equilibrium as a working principle of a mercury thermometer",
  ],
  "quantity-of-heat": [
    "Newton's law of cooling",
    "Measurement of specific heat capacity of solids and liquids",
    "Change of phases: latent heat",
    "Specific latent heat of fusion and vaporization",
    "Measurement of specific latent heat of fusion and vaporization",
    "Triple point",
  ],
  "vectors": [
    "Collinear and non-collinear vectors, coplanar and non-coplanar vectors",
    "Linear combination of vectors, linearly dependent and independent vectors",
    "Triangle, parallelogram and polygon laws of vectors",
    "Resolution of vectors; unit vectors",
    "Scalar and vector products",
  ],
  "faunal-diversity": [
    "Protista: outline classification. Protozoa: diagnostic features and classification up to class with examples",
    "Paramecium caudatum, Plasmodium vivax: habits and habitat, structure, reproduction, life-cycle",
    "Economic importance of P. falciparum",
    "Animalia: level of organization, body plan, body symmetry, body cavity and segmentation in animals",
    "Diagnostic features and classification of phyla (up to class) with examples: Porifera, Coelenterata (Cnidaria), Platyhelminthes, Aschelminthes (Nemathelminthes), Annelida, Arthropoda, Mollusca, Echinodermata and Chordata",
    "Earthworm (Pheretima posthuma): habit and habitat, external features; digestive system (alimentary canal and physiology of digestion)",
    "Earthworm: excretory system (types of nephridia, structure and arrangement of septal nephridia); nervous system (central and peripheral nervous system, working mechanism); reproductive systems (male and female reproductive organs), copulation, cocoon formation and economic importance",
    "Frog (Rana tigrina): habit and habitat, external features; digestive system (alimentary canal, digestive glands and physiology of digestion); blood vascular system (structure and working mechanism of heart); respiratory system (respiratory organs and physiology of respiration); reproductive system (male and female reproductive organs)",
  ],
  "calculus": [
    "Limits: definition, standard limits, evaluation of limits",
    "Continuity: definition, types of discontinuity, continuity of algebraic, trigonometric, exponential and logarithmic functions",
    "Differentiation: definition, geometric interpretation, derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions",
    "Rules of differentiation: product rule, quotient rule, chain rule",
    "Derivatives of parametric and implicit functions",
    "Higher order derivatives",
    "Applications of derivatives: rate of change, maxima and minima, monotonicity",
    "Integration: indefinite integral, standard integrals, integration by substitution and by parts",
    "Definite integral and its properties",
    "Applications of integration: area under curve, area between two curves",
  ],
  "kinematics": [
    "Instantaneous velocity and acceleration",
    "Relative velocity",
    "Equation of motion (graphical treatment)",
    "Motion of a freely falling body",
    "Projectile motion and its applications",
  ],
};

function getSourceKey(relPath) {
  const parts = relPath.split(path.sep);
  if (parts[0] === "class-11" || parts[0] === "class-11e") {
    if (parts.length >= 3) {
      return `${parts[0]}/${parts[1]}/${parts[2]}`;
    }
  }
  return null;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function findBestTopic(unitSlug, fileName, title, notes) {
  const topics = SYLLABUS_TOPICS[unitSlug] || [];
  if (topics.length === 0) return { topicSlug: unitSlug, topicTitle: title, relevance: 70 };

  const fileTokens = new Set([...tokenize(fileName), ...tokenize(title)]);
  let bestScore = 0;
  let bestTopic = topics[0];

  for (const topic of topics) {
    const topicTokens = tokenize(topic);
    let matchCount = 0;
    for (const t of topicTokens) {
      if (fileTokens.has(t)) matchCount++;
    }
    const score = topicTokens.length > 0 ? matchCount / topicTokens.length : 0;
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  const relevance = Math.min(100, Math.round(70 + bestScore * 30));
  const topicSlug = slugify(bestTopic);
  const topicTitle = bestTopic;

  return { topicSlug, topicTitle, relevance };
}

function walkSourceFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkSourceFiles(full));
    } else if (entry.name.endsWith(".json")) {
      results.push(full);
    }
  }
  return results;
}

const sourceFiles = walkSourceFiles(SOURCE_ROOT);
console.log(`Found ${sourceFiles.length} source files`);

const manifestEntries = [];
const contentExport = {};
let createdCount = 0;
let skippedCount = 0;

for (const srcFile of sourceFiles) {
  const relPath = path.relative(SOURCE_ROOT, srcFile);
  const sourceKey = getSourceKey(relPath);
  if (!sourceKey) {
    console.warn(`Skipping unmapped file: ${relPath}`);
    skippedCount++;
    continue;
  }

  const mapping = UNIT_MAP[sourceKey];
  if (!mapping) {
    console.warn(`Skipping unmapped unit: ${relPath}`);
    skippedCount++;
    continue;
  }

  const raw = fs.readFileSync(srcFile, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error(`Invalid JSON in ${relPath}: ${e.message}`);
    skippedCount++;
    continue;
  }

  const parts = relPath.split(path.sep);
  const subDir = parts[parts.length - 2];
  const fileName = path.basename(srcFile, ".json");

  const { topicSlug, topicTitle, relevance } = findBestTopic(mapping.unitSlug, fileName, data.title || "", (data.notes || []).join(" "));

  const destDir = path.join(DEST_ROOT, mapping.classSlug, mapping.subjectSlug, mapping.unitSlug, subDir);
  fs.mkdirSync(destDir, { recursive: true });

  const transformed = {
    title: data.title,
    unitSlug: mapping.unitSlug,
    topicSlug: topicSlug,
    topicTitle: topicTitle,
    relevance: relevance,
    notes: data.notes || [],
  };

  for (const key of Object.keys(data)) {
    if (!["title", "notes", "unitSlug", "topicSlug", "topicTitle", "relevance"].includes(key)) {
      transformed[key] = data[key];
    }
  }

  const destPath = path.join(destDir, `${fileName}.json`);
  fs.writeFileSync(destPath, JSON.stringify(transformed, null, 2) + "\n");
  createdCount++;

  const subject = mapping.subjectSlug;
  const chapter = mapping.unitSlug;
  const id = fileName;

  if (!contentExport[subject]) contentExport[subject] = {};
  if (!contentExport[subject][chapter]) contentExport[subject][chapter] = {};
  contentExport[subject][chapter][id] = {
    title: transformed.title,
    notes: transformed.notes,
  };

  manifestEntries.push({
    subject,
    chapter,
    id,
    title: transformed.title,
    notes: transformed.notes,
  });
}

// Update content/ravikishan/manifest.json
const manifestPath = path.join(DEST_ROOT, "manifest.json");
let manifestData = [];
if (fs.existsSync(manifestPath)) {
  try {
    manifestData = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (e) {}
}
const existingIds = new Set(manifestData.map(e => `${e.subject}/${e.chapter}/${e.id}`));
for (const entry of manifestEntries) {
  const key = `${entry.subject}/${entry.chapter}/${entry.id}`;
  if (!existingIds.has(key)) {
    manifestData.push(entry);
  }
}
fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2) + "\n");

// Update content/r-export/content-export.json
const exportPath = R_EXPORT_CONTENT;
let exportData = {};
if (fs.existsSync(exportPath)) {
  try {
    exportData = JSON.parse(fs.readFileSync(exportPath, "utf8"));
  } catch (e) {}
}
for (const subject of Object.keys(contentExport)) {
  if (!exportData[subject]) exportData[subject] = {};
  for (const chapter of Object.keys(contentExport[subject])) {
    if (!exportData[subject][chapter]) exportData[subject][chapter] = {};
    for (const id of Object.keys(contentExport[subject][chapter])) {
      exportData[subject][chapter][id] = contentExport[subject][chapter][id];
    }
  }
}
fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2) + "\n");

// Update content/r-export/manifest.json
const rexpManifestPath = R_EXPORT_MANIFEST;
let rexpManifestData = [];
if (fs.existsSync(rexpManifestPath)) {
  try {
    rexpManifestData = JSON.parse(fs.readFileSync(rexpManifestPath, "utf8"));
  } catch (e) {}
}
const rexpExistingIds = new Set(rexpManifestData.map(e => `${e.subject}/${e.chapter}/${e.id}`));
for (const entry of manifestEntries) {
  const key = `${entry.subject}/${entry.chapter}/${entry.id}`;
  if (!rexpExistingIds.has(key)) {
    rexpManifestData.push(entry);
  }
}
fs.writeFileSync(rexpManifestPath, JSON.stringify(rexpManifestData, null, 2) + "\n");

console.log(`\nCreated: ${createdCount} files`);
console.log(`Skipped: ${skippedCount} files`);
console.log(`Total entries in manifest: ${manifestData.length}`);
console.log(`Total entries in content-export subjects: ${Object.keys(exportData).length}`);
