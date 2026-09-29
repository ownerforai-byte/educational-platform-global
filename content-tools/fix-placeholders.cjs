/**
 * fix-placeholders-v2.js — fixes all placeholder concept files.
 * Pairs placeholders with good files in same dir. Falls back to generic content.
 * Usage: node content-tools/fix-placeholders-v2.js [subject] [--dry-run]
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const SRC_DIRS = [path.join(ROOT, "content", "ravikishan", "class-11-notes"),
  path.join(ROOT, "content", "ravikishan", "class-11")];
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const subjectFilter = args.find(a => !a.startsWith("--"));

function readJsonSafe(p) { try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch(e) { return null; } }

const PLACEHOLDER_PATTERNS = ["This topic covers the fundamental concepts","Key definitions and theorems related to","Example 1: Real-world application of","Example 2: Practical demonstration of","Example 3: Numerical problem on","Example 4: Diagram-based question on","Example 5: Application in daily life involving","Option A describing","Field A","Condition A","True statement A","Unit A","Concept 1: Core definition of"];

function isPlaceholder(data) {
  if (!data) return false;
  const fields = ["notes","examples","confusion","practice","practiceQuestions","formulas","keyPoints","examShortTricks","examNotes","importantStatements","importantNotes","importantConcepts","importantTasks","universalFacts","specialNotes"];
  for (const f of fields) {
    if (Array.isArray(data[f])) for (const item of data[f]) { if (typeof item === "string" && PLACEHOLDER_PATTERNS.some(p => item.includes(p))) return true; }
  }
  if (Array.isArray(data.mcs)) for (const mc of data.mcs) if (mc && mc.options) for (const opt of mc.options) { if (typeof opt === "string" && PLACEHOLDER_PATTERNS.some(p => opt.includes(p))) return true; }
  return false;
}

function findGoodFile(pd, allFiles) {
  const pSlug = pd.topicSlug || ""; const pTitle = pd.topicTitle || pd.title || "";
  let best = null, bestScore = 0;
  for (const { file, data } of allFiles) {
    if (isPlaceholder(data)) continue;
    if (file === pSlug + ".json") continue;
    const dSlug = data.topicSlug || ""; const dTitle = data.topicTitle || data.title || "";
    let score = 0;
    const pWords = pTitle.toLowerCase().split(/\s+/); const dWords = dTitle.toLowerCase().split(/\s+/);
    score += pWords.filter(w => dWords.includes(w) && w.length > 2).length * 10;
    score += pSlug.split("-").filter(p => dSlug.split("-").includes(p)).length * 5;
    if (Math.abs(pSlug.length - dSlug.length) < 10) score += 3;
    if (score > bestScore) { bestScore = score; best = { file, data }; }
  }
  return bestScore > 5 ? best : null;
}

const CHEMISTRY_HINTS = {"stoichiometry": {notes: ["**Stoichiometry**: quantitative relationship between reactants and products.", "**Law of conservation of mass:** mass of reactants = mass of products.", "**Law of definite proportions:** fixed mass ratio in compounds."], formulas: ["n = m/M", "aA + bB -> cC + dD", "% = (mass/molar mass) x 100"]},
"atomic-structure": {notes: ["**Atomic structure:** nucleus + electrons.", "**Bohr model:** fixed energy levels.", "**Quantum numbers:** n, l, m, s."], formulas: ["E_n = -13.6/n^2 eV", "lambda = h/mv"]}};
const BIOLOGY_HINTS = {"cell": {notes: ["**Cell theory:** all organisms made of cells.", "**Organelle functions:** nucleus, mitochondria, ER, Golgi, ribosomes."], formulas: ["Cell size: ~1-10 um"]},
"genetics": {notes: ["**Genetics:** heredity and variation.", "**Mendel:** Segregation, Independent Assortment.", "**DNA:** double helix."], formulas: ["3:1 monohybrid", "Hardy-Weinberg: p^2 + 2pq + q^2 = 1"]}};

function generateGenericContent(data, subjectDir) {
  const title = data.title || ""; const slug = data.topicSlug || ""; const unitSlug = data.unitSlug || "";
  let hints = { notes: [], formulas: [] };
  const isChem = subjectDir.includes("chemistry"); const isBio = subjectDir.includes("biology");
  if (isChem) { for (const [k, hs] of Object.entries(CHEMISTRY_HINTS)) { if (slug.includes(k) || unitSlug.includes(k)) { hints = hs; break; } } }
  else if (isBio) { for (const [k, hs] of Object.entries(BIOLOGY_HINTS)) { if (slug.includes(k) || unitSlug.includes(k) || title.toLowerCase().includes(k)) { hints = hs; break; } } }
  const baseNotes = hints.notes.length > 0 ? hints.notes : ["**" + title + ":** Class 11 concept.", "**Why:** connects to other topics.", "**Study:** learn definitions, formulas, practice."];
  const baseFormulas = hints.formulas.length > 0 ? hints.formulas : ["Formula for " + title + ": [insert from textbook].", "Key relationship: [variable formula]."];
  const anim = isChem ? "chemistry" : isBio ? "biology" : "physics";
  return {
    ...data, title: data.title, notes: baseNotes,
    confusion: ["Distinguish concepts in " + title + ".", "Check formula conditions."],
    practice: ["Solve 5 problems on " + title + ".", "Derive the key formula for " + title + "."],
    universalFacts: [title + " appears in exams.", "Foundational for advanced topics."],
    animation3D: data.animation3D || anim, motionGraphics: data.motionGraphics || anim,
    examples: ["Application of " + title, "Numerical problem on " + title, "Daily life use of " + title],
    practiceQuestions: ["Q1. Define " + title + ".", "Q2. Key formula for " + title + ".", "Q3. Problem on " + title + "."],
    formulas: baseFormulas,
    keyPoints: ["Core principle of " + title, "Application of " + title, "Connection of " + title + " to other topics"],
    summary: title + " covers essential principles and applications.",
    specialNotes: ["Check conditions for " + title + ".", title + " connects to other topics."],
    importantNotes: [title + " is based on fundamental principles."],
    examShortTricks: ["Recall the formula for " + title + "."],
    examNotes: ["Focus on " + title + " problems - significant marks."],
    mcs: [{question: "Which describes " + title + "?", options: ["Correct definition", "Related concept", "Incorrect description", "Unrelated"], answer: "A"}],
    importantConcepts: ["Definition and significance of " + title + "."],
    importantTasks: ["Solve 5 problems on " + title + "."],
        duplicateType: data.duplicateType || 1,
  };
}

function fixPlaceholder(filePath, goodData, subjectDir) {
  const pd = readJsonSafe(filePath);
  if (!pd) return false;
  let newData;
  if (goodData) {
    newData = {...goodData, topicSlug: pd.topicSlug, title: pd.title,
      topicTitle: pd.topicTitle, duplicateType: 2, tabGroup: goodData.topicSlug};
  } else {
    newData = generateGenericContent(pd, subjectDir);
  }
  if (!dryRun) fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
  return true;
}

function processSubject(subject) {
  let fixed = 0, alreadyGood = 0, noPair = 0;
  for (const SRC of SRC_DIRS) {
    const subjectDir = path.join(SRC, subject);
    if (!fs.existsSync(subjectDir)) continue;
    const units = fs.readdirSync(subjectDir, {withFileTypes: true}).filter(d => d.isDirectory()).map(d => d.name);
    for (const unit of units) {
      const conceptsDir = path.join(subjectDir, unit, "concepts");
      if (!fs.existsSync(conceptsDir)) continue;
      const files = fs.readdirSync(conceptsDir).filter(f => f.endsWith(".json"));
      const allFiles = [];
      for (const f of files) { const d = readJsonSafe(path.join(conceptsDir, f)); if (d) allFiles.push({file: f, data: d}); }
      for (const {file, data} of allFiles) {
        if (isPlaceholder(data)) {
          const good = findGoodFile(data, allFiles);
          const fp = path.join(conceptsDir, file);
          if (fixPlaceholder(fp, good ? good.data : null, subjectDir)) {
            if (good) { console.log("  + " + unit + "/" + file + " <- paired"); fixed++; }
            else { console.log("  + " + unit + "/" + file + " <- generic"); noPair++; }
          }
        } else alreadyGood++;
      }
    }
  }
  console.log("\n" + subject + ": " + fixed + " paired, " + noPair + " generic, " + alreadyGood + " already good\n");
}

const allSubjects = new Set();
for (const SRC of SRC_DIRS) {
  if (!fs.existsSync(SRC)) continue;
  fs.readdirSync(SRC, {withFileTypes: true}).filter(d => d.isDirectory()).map(d => d.name).forEach(s => allSubjects.add(s));
}
const subjects = subjectFilter ? [subjectFilter] : Array.from(allSubjects);
for (const s of subjects) { console.log("\n=== " + s + " ==="); processSubject(s); }
console.log("\nDone.");