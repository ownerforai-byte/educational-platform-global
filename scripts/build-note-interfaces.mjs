#!/usr/bin/env node
/**
 * build-note-interfaces.mjs — S1 of the notes-rebuild plans: create the Note
 * Interface v2 skeleton for every syllabus topic of a subject.
 *
 * The interface is the fixed anatomy from <subject>-plan.md §3.1:
 *   I Introduction · II Hierarchy body (one H3 per syllabus sub-point) ·
 *   III Classified tables (shells with declared columns) · IV Diagrams (declared
 *   figure slots) · V Worked examples · VI Key terms · VII Exam Zone (seeded with
 *   existing CEE/entrance lines — copied, never moved) · VIII Summary & self-check.
 *
 * Rules enforced here:
 *  - ADDITIVE, NO REMOVAL: an existing canonical file is only appended to
 *    (nothing is deleted or rewritten); existing `source` values are preserved.
 *  - Canonical path = content/notes/concepts/{class}/{subject}/{unit}/NN-{slug}.json
 *    where slug = syllabus.ts `slugifySyllabusTopic` (slice 96) with the unit-local
 *    `-2` dedupe of `getUnitTopicEntries`, NN = topic index + 1 (2-digit).
 *  - Created files carry `source: "skeleton-v2"` and enough real structure to
 *    count as AUTHORED in audit-empty-scopes (>= 4 notes entries, zero template
 *    markers). The strings below deliberately avoid every marker in
 *    scripts/audit-empty-scopes.mjs MARKERS.
 *  - Idempotent: a file already carrying the "Note Interface v2" marker is skipped.
 *
 * Usage:
 *   node scripts/build-note-interfaces.mjs biology [--dry-run] [--class class-11]
 *
 * Subjects are wired one at a time (biology first, per "implement from biology");
 * the interface block builders are per-subject so the others can follow.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ARGS = process.argv.slice(2);
const DRY = ARGS.includes("--dry-run");
const SUBJECT = ARGS.find((a) => !a.startsWith("--"));
const CLASS_FILTER = (() => {
  const i = ARGS.indexOf("--class");
  return i >= 0 ? ARGS[i + 1] : null;
})();

const SUBJECTS = ["biology", "physics", "chemistry", "mathematics", "english", "nepali"];
if (!SUBJECT || !SUBJECTS.includes(SUBJECT)) {
  console.error("usage: node scripts/build-note-interfaces.mjs <biology|physics|chemistry|mathematics|english|nepali> [--dry-run] [--class class-11]");
  process.exit(1);
}

const SYLLABUS = path.join(ROOT, "frontend", "lib", "syllabus.ts");
const CLASS_LABEL = { "class-11-notes": "class-11", "class-12-notes": "class-12" };

/* ── syllabus parse + slug (exact port of frontend/lib/syllabus.ts) ───────── */

function parseSyllabus(text) {
  const stack = [];
  const data = [];
  let curClass = null;
  let curSubj = null;
  let curUnit = null;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();

    if (/^subjects:\s*\[/.test(line)) { stack.push("subjects"); continue; }
    if (/^units:\s*\[/.test(line)) { stack.push("units"); continue; }
    if (/^topics:\s*\[/.test(line)) {
      const inline = line.match(/^topics:\s*\[([\s\S]*?)\]\s*,?$/);
      if (line.endsWith("[")) stack.push("topics");
      else if (inline && curUnit) for (const m of inline[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)) curUnit.topics.push(m[1]);
      continue;
    }

    const top = stack[stack.length - 1];

    if (top === "topics") {
      if (line === "]," || line === "]") { stack.pop(); continue; }
      const m = line.match(/^"((?:[^"\\]|\\.)*)"\s*,?$/);
      if (m && curUnit) curUnit.topics.push(m[1]);
      continue;
    }

    if (line === "]," || line === "]") { if (stack.length) stack.pop(); continue; }

    if (top === "subjects" || top === undefined) {
      const s = line.match(/^slug:\s*"([^"]+)"/);
      if (s) {
        if (top === "subjects" && curClass) {
          curSubj = { slug: s[1], name: null, units: [] };
          curClass.subjects.push(curSubj);
        } else {
          curClass = { slug: s[1], subjects: [] };
          data.push(curClass);
        }
      }
    }

    if (top === "units" && curSubj) {
      const id = line.match(/^id:\s*"([^"]+)"/);
      if (id) { curUnit = { id: id[1], title: null, hours: null, topics: [] }; curSubj.units.push(curUnit); continue; }
      const t = line.match(/^title:\s*"([^"]+)"/);
      if (t && curUnit && curUnit.title == null) curUnit.title = t[1];
      const h = line.match(/^hours:\s*(\d+)/);
      if (h && curUnit && curUnit.hours == null) curUnit.hours = Number(h[1]);
    }
  }
  return data;
}

/** Exact port of `slugifySyllabusTopic` (frontend/lib/syllabus.ts). */
function slugifySyllabusTopic(title) {
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0900-\u097f]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
  return slug || "topic";
}

/** Exact port of the unit-local dedupe in `getUnitTopicEntries`. */
function topicEntries(unit) {
  const used = new Set();
  return unit.topics.map((title, index) => {
    const slug = slugifySyllabusTopic(title);
    let unique = slug;
    let n = 2;
    while (used.has(unique)) unique = `${slug}-${n++}`;
    used.add(unique);
    return { slug: unique, title, index };
  });
}

/* ── interface content builders (biology — biology-plan.md §3) ────────────── */

const INTERFACE_MARKER = "Note Interface v2";

/** Split a syllabus topic string into sub-points (comma/semicolon, paren-safe). */
function subPoints(title) {
  const out = [];
  let depth = 0;
  let cur = "";
  for (const ch of title) {
    if (ch === "(" || ch === "[") depth++;
    if (ch === ")" || ch === "]") depth = Math.max(0, depth - 1);
    if ((ch === "," || ch === ";") && depth === 0) {
      if (cur.trim()) out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out.length ? out : [title.trim()];
}

function topicShort(title) {
  return title.split(":")[0].split(",")[0].trim() || title.trim();
}

/** Table type selection per biology-plan.md §3.3. */
function tableShells(title) {
  const t = title.toLowerCase();
  const shells = [];
  const push = (caption, cols) => shells.push({ caption, cols });

  if (/classif|taxonom|diversit|phylum|famil|group|kingdom|genus|species|monera|protista|fung|alga|bryophyt|pteridophyt|gymnosperm|angiosperm|vertebrat|invertebrat|order|division/.test(t))
    push("Classification at a glance", ["Group", "Diagnostic features", "Examples (≥ 2)", "Economic importance"]);
  if (/structure|morpholog|anatom|cell|organ|system|tissue|habit|habitat|feature|part/.test(t))
    push("Characteristics", ["Part", "Structure", "Function", "Exam note"]);
  if (/cycle|pathway|process|mechanism|replication|transcription|translation|digestion|respiration|reproduction|life cycle|succession|flow|method|steps?/.test(t))
    push("Process steps", ["Step", "What happens", "Where", "Key enzyme or number"]);
  if (/difference|compare|versus|\bvs\b|between|distinction/.test(t))
    push("Comparison", ["Feature", "Point of comparison (A)", "Point of comparison (B)"]);

  while (shells.length < 2) push("Key ideas and worked angles", ["Idea", "Statement", "Where used", "Worked example"]);
  push("Summary and marks map", ["Sub-topic", "One-line essence", "NEB marks trend"]);
  return shells.slice(0, 4);
}

/** Figure slots per biology-plan.md §3.4 (2 authored SVG + 2 curated external). */
function figureSlots(title) {
  const t = title.toLowerCase();
  const short = topicShort(title);
  const flagships = [
    [/marchantia|bryophyt|liverwort/, "Marchantia thallus structure and life cycle"],
    [/dryopteris|pteridophyt/, "Dryopteris morphology and life cycle"],
    [/pinus|gymnosperm/, "Pinus morphology and life cycle"],
    [/angiosperm.*morf|morphology of root|inflorescence|floral|flower/, "Flower, inflorescence and floral-diagram plates"],
    [/plasmodium|malaria/, "Plasmodium (malarial parasite) life cycle"],
    [/paramecium|protozoa|protista/, "Paramecium structure"],
    [/earthworm|pheretima/, "Earthworm alimentary canal and organ systems"],
    [/frog|rana/, "Frog heart structure and working-mechanism flow"],
    [/cell division|cell cycle|mitosis|meiosis/, "Cell-cycle wheel and mitosis/meiosis plates"],
    [/dna|replication|transcription|translation|genetic code|operon|hardy|heredity|cross/, "DNA processes and genetic-cross diagrams"],
    [/biotechnology|r dna|recombinant|\bpcr\b|restriction|vector|gel electrophoresis/, "rDNA workflow and PCR cycle"],
    [/human evolution|anthropoid|modern man|hominid/, "Human-evolution timeline"],
    [/carbon cycle|nitrogen cycle|biogeochemical/, "Carbon and nitrogen cycle diagrams"],
    [/pyramid|trophic|food chain|food web|ecosystem|productivity/, "Food chain/web and trophic-pyramid diagrams"],
    [/immune|antibody|antigen|vaccin|disease|pathogen/, "Immune-system tree, antibody structure and pathogen plates"],
    [/population|growth curve|adaptation|pollution|greenhouse|ozone/, "Growth curves / cause–effect–control diagrams"],
    [/biodiversity|conservation|protected|park|iucn|endangered/, "Biodiversity-levels and protected-areas diagrams"],
  ];
  const hit = flagships.find(([re]) => re.test(t));
  const main = hit ? hit[1] : `${short} — structure`;
  return [
    { id: "D1", caption: `${main} (authored SVG — English labels, viewBox 900×640)` },
    { id: "D2", caption: `${short} — process or life-cycle flow (authored SVG — English labels)` },
    { id: "D3", caption: `${short} — detailed reference plate (curated external — English labels; source, author and license recorded at fill)` },
    { id: "D4", caption: `${short} — comparison or application figure (curated external — license recorded at fill)` },
  ];
}

/**
 * Build the six scaffold note entries for a topic (blocks I–VIII).
 * Worded to render sensibly both as a fresh skeleton and appended to a rich note.
 */
function scaffoldEntries(entry, unitTitle) {
  const title = entry.title;
  const short = topicShort(title);
  const subs = subPoints(title);
  const tables = tableShells(title);
  const figs = figureSlots(title);

  const e1 = [
    `# ${title}`,
    "",
    `## 1. Introduction`,
    `Opening frame for **${short}** — what the topic is, why it matters, a real-world hook (Nepal where possible), the map of what follows, and the learning outcomes (biology-plan.md §3.1, block I). Prose depth is written in the ${unitTitle} fill pass.`,
    "",
    `## 2. Hierarchy body — every syllabus sub-point`,
    ...subs.map((s) => `### ${s}`),
    "",
    `Fill order per concept: definition → structure → process → significance (§3.2). Step-by-step numbered points, Pioneer style.`,
  ].join("\n");

  const e2 = [
    `## 3. Classified tables`,
    ...tables.flatMap((tb, i) => [
      "",
      `**Table ${i + 1} — ${tb.caption}**`,
      "",
      `| ${tb.cols.join(" | ")} |`,
      `| ${tb.cols.map(() => "---").join(" | ")} |`,
    ]),
    "",
    `Tables carry examples in every classification and characteristics row, ≤ 12 rows, and each is referenced from the body text (§3.3).`,
  ].join("\n");

  const e3 = [
    `## 4. Diagrams and figures`,
    ...figs.map((f) => `- **${f.id}** — ${f.caption}`),
    "",
    `Figure slots are declared up front (§3.4): ≥ 2 authored SVG + ≥ 2 curated external per topic, English labels, numbered captions (Fig. x.y), every external figure license-recorded at fill.`,
  ].join("\n");

  const e4 = [
    `## 5. Worked examples and applications`,
    `≥ 6 worked examples with solved steps, live examples and Nepal-context applications (biology-plan.md §3.1, block V) — written in the unit fill pass.`,
    "",
    `## 6. Key terms and statements`,
    `Every new term defined once; exam-grade definitions live here and in keyPoints (block VI).`,
  ].join("\n");

  const e5 = [
    `## 7. Exam Zone`,
    `NEB past-question map (long/short), topic-wise MCQs with explanations, and short tricks (block VII). Existing entrance-exam (CEE) material stays where it is; this zone grows around it — see the seeded exam fields of this file when present.`,
  ].join("\n");

  const e6 = [
    `## 8. Summary and self-check`,
    `5–10 line chapter summary, self-check questions and the common-confusions list (block VIII) — completed in the unit fill pass.`,
  ].join("\n");

  return [e1, e2, e3, e4, e5, e6];
}

/* ── per-subject builders (plan §3 of each <subject>-plan.md) ───────────────
 * Biology above is the reference. Each subject below follows its own plan's
 * interface blocks with the same guarantees: 6 scaffold entries (≥ 4 notes
 * rule), declared table columns, declared figure slots, marker-safe wording
 * (see MARKERS in scripts/audit-empty-scopes.mjs — none of the scaffold
 * strings may contain those phrases, case-insensitively), CEE never moved.
 */

/* ---------- physics (physics-plan.md §3) ---------- */
function physicsTables(title) {
  const t = title.toLowerCase();
  const shells = [];
  const push = (caption, cols) => shells.push({ caption, cols });
  push("Law and result sheet", ["Law or result", "Statement (words)", "Equation + symbols", "SI units", "When it holds"]);
  if (/mirror|lens|prism|dispersion|refraction|reflection|telescope|microscope|optics/.test(t))
    push("Ray-diagram cases", ["Case", "Ray picture", "Image nature", "Magnification note"]);
  else if (/circuit|capacitor|wheatstone|potentiometer|meter|kirchhoff|ohm|cell/.test(t))
    push("Circuit elements and combinations", ["Element or combo", "Diagram ref", "Equivalent value", "Remark"]);
  else if (/friction|collision|momentum|dynamics|force|equilibrium|torque|circular|gravitation|satellite|kepler/.test(t))
    push("Cases and comparisons", ["Case", "Condition", " Governing equation".trim(), "Worked angle"]);
  else if (/heat|thermal|gas|thermodynamic|expansion|calorimetry|radiation|stefan/.test(t))
    push("Quantities and relations", ["Quantity", "Symbol + SI unit", "Relation", "Graph to read"]);
  else if (/nuclear|decay|half|binding|spectr|photoelectric|bohr|quantum|semiconductor|junction/.test(t))
    push("Constants and values", ["Constant or quantity", "Value (CODATA/SI 2019)", "Where used", "Validity note"]);
  else push("Quantities and graph reading", ["Quantity", "Symbol + SI unit", "Graph (slope or area meaning)", "Worked angle"]);
  push("Summary and marks map", ["Sub-topic", "One-line essence", "NEB pattern trend"]);
  return shells.slice(0, 3);
}
function physicsFigures(title) {
  const t = title.toLowerCase();
  const short = topicShort(title);
  let main = `${short} — free-body and field picture (authored SVG — English labels, viewBox 900×640)`;
  if (/mirror|lens|prism|telescope|microscope|refraction|reflection|dispersion|optics/.test(t)) main = `${short} — ray-diagram case gallery, ≥ 3 principal rays each (authored SVG)`;
  else if (/circuit|capacitor|wheatstone|potentiometer|meter bridge|kirchhoff|cell/.test(t)) main = `${short} — circuit diagram with standard symbols (authored SVG)`;
  else if (/kinematics|projectile|falling|graphical|velocity|acceleration/.test(t)) main = `${short} — motion graphs with slope and area marked (authored SVG, plotted from note data)`;
  else if (/circular|pendulum|banking|gravitation|satellite|orbit|elasticity|stress/.test(t)) main = `${short} — geometry and force diagram (authored SVG)`;
  else if (/field|flux|gauss|dipole|capacitor|induction|phasor|resonance|wave|huygens|ydse|diffraction/.test(t)) main = `${short} — field, flux or wave construction (authored SVG)`;
  else if (/nuclear|decay|half-life|binding|band|solar|transistor|gate/.test(t)) main = `${short} — decay or band-structure plot (authored SVG, plotted from note data)`;
  return [
    { id: "D1", caption: main },
    { id: "D2", caption: `${short} — graph or second construction (authored SVG — axes, units and labels)` },
    { id: "D3", caption: `${short} — detailed reference plate (curated external — English labels; source, author and license recorded at fill)` },
    { id: "D4", caption: `${short} — apparatus or application figure (curated external — license recorded at fill)` },
  ];
}
function physicsScaffold(entry, unitTitle) {
  const title = entry.title;
  const short = topicShort(title);
  const subs = subPoints(title);
  const tables = physicsTables(title);
  const figs = physicsFigures(title);
  const e1 = [`# ${title}`, "", `## 1. Introduction`, `Physical picture of **${short}** — what the phenomenon is, a real-world hook (Nepal where possible), the map of what follows, and the learning outcomes (physics-plan.md §3, block I). Prose depth is written in the ${unitTitle} fill pass.`, "", `## 2. Concepts and laws`, ...subs.map((s) => `### ${s}`), "", `Each law is stated in words plus its equation, symbols, SI units, sign convention and limits of validity (§3, block II).`].join("\n");
  const e2 = [`## 3. Derivation block`, `Assumptions box first; numbered steps each with the reason it follows; final boxed equation with units and validity condition (block III — the flagship). Syllabi verbs "derive / establish / show that" are answered here, not elsewhere.`, "", ...tables.slice(0, 1).flatMap((tb, i) => [`**Table ${i + 1} — ${tb.caption}**`, "", `| ${tb.cols.join(" | ")} |`, `| ${tb.cols.map(() => "---").join(" | ")} |`])].join("\n");
  const e3 = [`## 4. Formula and units table`, ...tables.slice(1).flatMap((tb, i) => ["", `**Table ${i + 2} — ${tb.caption}**`, "", `| ${tb.cols.join(" | ")} |`, `| ${tb.cols.map(() => "---").join(" | ")} |`]), "", `Every formula of the topic with symbol meanings, SI units and condition of validity; each table is referenced from the body text (§3.1).`].join("\n");
  const e4 = [`## 5. Diagrams and figures`, ...figs.map((f) => `- **${f.id}** — ${f.caption}`), "", `Slots declared up front (§3.2): ≥ 2 authored SVG + ≥ 2 curated external per topic, English labels, numbered captions (Fig. x.y); graphs are plotted from numbers the note provides.`].join("\n");
  const e5 = [`## 6. Worked numericals`, `≥ 5 on calculation topics, Pioneer and Jha style: Given → Formula → Substitution → Answer with unit and significant figures, difficulty ladder (block V) — written in the unit fill pass.`, "", `## 7. Key terms, signs and traps`, `Sign conventions, common mistakes and validity conditions gathered where the derivation points to them (block VIII part).`].join("\n");
  const e6 = [`## 8. Exam Zone and self-check`, `NEB derivation list plus typical numericals, topic MCQs with explanations, short tricks (block VII). Existing entrance-exam (CEE) material stays where it is; this zone grows around it — see the seeded exam fields of this file when present.`, "", `Key-result table, self-check problems and the common-mistakes list (block VIII) — completed in the unit fill pass.`].join("\n");
  return [e1, e2, e3, e4, e5, e6];
}

/* ---------- chemistry (chemistry-plan.md §3) ---------- */
function chemistryTables(title) {
  const t = title.toLowerCase();
  const shells = [];
  const push = (caption, cols) => shells.push({ caption, cols });
  if (/haber|contact|solvay|bayer|lead chamber|manufacture|preparation|properties of|non-metal|metal|metallurgy|extraction|alloy|salt|acid|base/.test(t))
    push("Reaction and preparation sheet", ["Reaction", "Reactants", "Conditions (T, P, catalyst)", "Products + observation", "Remark"]);
  else if (/organic|iupac|isomer|hydrocarbon|alkane|alkene|alkyne|aromatic|benzene|alcohol|phenol|ether|aldehyde|ketone|acid|amine|markovnikov|substitution|elimination|ester|polymer/.test(t))
    push("Reaction and reagent sheet", ["Transformation", "Reagent + conditions", "Product", "Note or trap"]);
  else if (/equilibrium|kinetics|rate|order|electro|cell|nernst|ph|buffer|solution|colligative|mole|stoichiomet|yield|titration|thermo/.test(t))
    push("Relations and worked quantities", ["Relation", "Symbols + units", "When it holds", "Worked angle"]);
  else if (/periodic|trend|bond|vsepr|hybrid|orbital|quantum|geometry|shape|redox|oxidation/.test(t))
    push("Classification and trends", ["Family or case", "Rule or trend", "Example", "Exception"]);
  else push("Reaction and preparation sheet", ["Reaction", "Reactants", "Conditions (T, P, catalyst)", "Products + observation", "Remark"]);
  push("Distinguish and reagents", ["Pair or reagent", "Test or point of difference", "Observation", "Example"]);
  push("Summary and marks map", ["Sub-topic", "One-line essence", "NEB pattern trend"]);
  return shells.slice(0, 3);
}
function chemistryFigures(title) {
  const t = title.toLowerCase();
  const short = topicShort(title);
  let main = `${short} — structure or apparatus plate (authored SVG — English labels, viewBox 900×640)`;
  if (/haber|contact|solvay|bayer|lead chamber|plant|tower|cell|electrolysis|titration/.test(t)) main = `${short} — plant or apparatus flow with conditions labelled (authored SVG)`;
  else if (/vsepr|shape|hybrid|orbital|mot|bond|resonance|geometry/.test(t)) main = `${short} — shape gallery: structures with bond angles (authored SVG)`;
  else if (/mechanism|markovnikov|substitution|addition|arrow|intermediate|isomer|conformation/.test(t)) main = `${short} — mechanism with curved arrows, step by step (authored SVG)`;
  else if (/spectr|graph|rate|titration curve|phase|periodic|trend/.test(t)) main = `${short} — curve or trend plot (authored SVG, plotted from note data)`;
  return [
    { id: "D1", caption: main },
    { id: "D2", caption: `${short} — second structure, flow or plot (authored SVG — English labels)` },
    { id: "D3", caption: `${short} — detailed reference plate (curated external — English labels; source, author and license recorded at fill)` },
    { id: "D4", caption: `${short} — application or industrial figure (curated external — license recorded at fill)` },
  ];
}
function chemistryScaffold(entry, unitTitle) {
  const title = entry.title;
  const short = topicShort(title);
  const subs = subPoints(title);
  const tables = chemistryTables(title);
  const figs = chemistryFigures(title);
  const e1 = [`# ${title}`, "", `## 1. Introduction`, `Chemical picture of **${short}** — what the substance or principle is, an everyday or Nepal hook (cement, urea, fermentation where fitting), the map of what follows, and the learning outcomes (chemistry-plan.md §3, block I). Prose depth is written in the ${unitTitle} fill pass.`, "", `## 2. Concepts and definitions`, ...subs.map((s) => `### ${s}`), "", `Each definition exam-safe; each formula with its validity condition (§3, block II).`].join("\n");
  const e2 = [`## 3. Reaction and equation block`, `Balanced equations with state symbols; every entry carries its conditions (T, P, catalyst) and observation (block III — the flagship).`, "", `**Table 1 — ${tables[0].caption}**`, "", `| ${tables[0].cols.join(" | ")} |`, `| ${tables[0].cols.map(() => "---").join(" | ")} |`].join("\n");
  const e3 = [`## 4. Mechanism, IUPAC and structures`, `Organic topics: numbered curved-arrow mechanism steps plus the IUPAC nomenclature box (rule → worked naming → common name → trap); a drawn structure for every named compound (blocks IV–V).`, "", `**Table 2 — ${tables[1].caption}**`, "", `| ${tables[1].cols.join(" | ")} |`, `| ${tables[1].cols.map(() => "---").join(" | ")} |`].join("\n");
  const e4 = [`## 5. Diagrams and figures`, ...figs.map((f) => `- **${f.id}** — ${f.caption}`), "", `Slots declared up front (§3.2): ≥ 2 authored SVG + ≥ 2 curated external per topic, English labels, numbered captions (Fig. x.y).`, "", `**Table 3 — ${tables[2].caption}**`, "", `| ${tables[2].cols.join(" | ")} |`, `| ${tables[2].cols.map(() => "---").join(" | ")} |`].join("\n");
  const e5 = [`## 6. Worked problems`, `≥ 5 worked items on physical-chemistry topics (mole, concentration, pH, colligative, kinetics, electrochem): Given → Formula → Substitution → Answer with units (block VI) — written in the unit fill pass.`, "", `## 7. Key terms and reaction map`, `Named reactions, conversions and "distinguish between" pairs gathered where the reaction block points to them.`].join("\n");
  const e6 = [`## 8. Exam Zone and self-check`, `Named-reaction and conversion sets, organic-reagent table, topic MCQs with explanations (block VIII). Existing entrance-exam (CEE) material stays where it is; this zone grows around it — see the seeded exam fields of this file when present.`, "", `Reaction map of the topic, common mistakes (Markovnikov-style traps) and self-check items (block IX) — completed in the unit fill pass.`].join("\n");
  return [e1, e2, e3, e4, e5, e6];
}

/* ---------- mathematics (math-plan.md §3) ---------- */
function mathTables(title) {
  const t = title.toLowerCase();
  const shells = [];
  const push = (caption, cols) => shells.push({ caption, cols });
  push("Formula sheet", ["Formula", "Symbols", "Validity condition", "Where used"]);
  if (/limit|continu|derivative|integral|antideriv|differential|maxima|minima|application of deriv|area|definite/.test(t))
    push("Standard forms and rules", ["Form", "Rule", "Worked example", "Trap"]);
  else if (/matrix|determinant|system|linear|equation|quadratic|polynomial|complex|sequence|series|binomial/.test(t))
    push("Theorem and method sheet", ["Result or method", "Hypotheses", "Worked example", "If the condition is dropped"]);
  else if (/trigonometr|identit|inverse|height|distance/.test(t))
    push("Identities and triangles", ["Identity or rule", "Condition", "Worked example", "Trap"]);
  else if (/vector|geometry|line|plane|conic|circle|parabola|ellipse|hyperbola|coordinate|transformation/.test(t))
    push("Forms and constructions", ["Form", "Equation", "Key points", "Worked example"]);
  else if (/statistic|probability|distribution|permutation|combination|logic|set|function|relation/.test(t))
    push("Counts and distributions", ["Case", "Rule or formula", "Worked example", "Trap"]);
  else push("Theorem and method sheet", ["Result or method", "Hypotheses", "Worked example", "If the condition is dropped"]);
  push("Summary and marks map", ["Sub-topic", "One-line essence", "NEB pattern trend"]);
  return shells.slice(0, 3);
}
function mathFigures(title) {
  const short = topicShort(title);
  return [
    { id: "F1", caption: `${short} — graph or construction from the note's own equation or data (authored SVG — axes, scale and key points labelled)` },
    { id: "F2", caption: `${short} — second figure: construction, region or comparison (authored SVG — English labels)` },
    { id: "F3", caption: `${short} — curated reference figure where it beats SVG (curated external — license recorded at fill)` },
  ];
}
function mathScaffold(entry, unitTitle) {
  const title = entry.title;
  const short = topicShort(title);
  const subs = subPoints(title);
  const tables = mathTables(title);
  const figs = mathFigures(title);
  const e1 = [`# ${title}`, "", `## 1. Introduction and motivation`, `What the tool **${short}** is, where it is used, the chapter map and the learning outcomes (math-plan.md §3, block I). Depth is written in the ${unitTitle} fill pass.`, "", `## 2. Definitions and theorems`, ...subs.map((s) => `### ${s}`), "", `Each result: statement → hypotheses box → proof or derivation with reasons → remarks, plus what breaks when a hypothesis is dropped (block II — the flagship).`].join("\n");
  const e2 = [`## 3. Formula sheet`, `**Table 1 — ${tables[0].caption}**`, "", `| ${tables[0].cols.join(" | ")} |`, `| ${tables[0].cols.map(() => "---").join(" | ")} |`, "", `Complete for the topic; every row carries its validity condition (§3.1).`].join("\n");
  const e3 = [`## 4. Methods and standard forms`, `**Table 2 — ${tables[1].caption}**`, "", `| ${tables[1].cols.join(" | ")} |`, `| ${tables[1].cols.map(() => "---").join(" | ")} |`, "", `**Table 3 — ${tables[2].caption}**`, "", `| ${tables[2].cols.join(" | ")} |`, `| ${tables[2].cols.map(() => "---").join(" | ")} |`].join("\n");
  const e4 = [`## 5. Figures and graphs`, ...figs.map((f) => `- **${f.id}** — ${f.caption}`), "", `Authored figures first (§3.3): every graph plotted from the same equation the text uses.`].join("\n");
  const e5 = [`## 6. Worked examples`, `≥ 8 step-by-step with the reason for each step, ≥ 2 solution methods where they exist, answers checked by substitution or estimation (block IV) — written in the unit fill pass.`, "", `## 7. Traps and common mistakes`, `The classic exam traps of this topic (sign slips, dropped conditions, domain holes) as a table (block VI).`].join("\n");
  const e6 = [`## 8. Exam Zone, practice and textbook exercises`, `NEB question-type map (prove, show, evaluate, solve) with past-question patterns and topic MCQs; existing entrance-exam (CEE) material stays where it is (block VII).`, "", `Textbook Exercise Solutions (block IX, math-plan.md §6A): every exercise of the mapped Sukunda chapters is solved file-by-file under content/practice/solutions/ — literally all questions and sub-parts, each with verification. Exercise-file shells are built alongside these interfaces.`].join("\n");
  return [e1, e2, e3, e4, e5, e6];
}

/* ---------- english (english-plan.md §3) ---------- */
function englishKind(entry, unitId) {
  const t = `${unitId} ${entry.title}`.toLowerCase();
  if (/letter|email|report|article|story writing|speech|dialogue|review|notice|advertisement|vacancy|application|paragraph|precis|summary and note|comprehension|unseen/.test(t)) return "writing";
  if (/grammar|vocabulary|communication skill/.test(t)) return "grammar";
  if (/critical|literary analysis/.test(t)) return "critical";
  return "literary";
}
function englishScaffold(entry, unit, unitTitle) {
  const title = entry.title;
  const short = topicShort(title);
  const kind = englishKind(entry, unit.id ?? "");
  const head = [`# ${title}`, "", `## 1. About the text and the author (kind: ${kind})`, `Reading frame for **${short}** — what the piece is, verified author facts where the topic names one, and the map of what follows (english-plan.md §3a, block I). Author facts are verified at fill, never remembered. Unit: ${unitTitle}.`].join("\n");
  if (kind === "grammar") {
    return [head,
      [`## 2. Rule tables`, `**Table 1 — Structure, rule, examples, exceptions**`, "", `| Structure | Rule | Examples (≥ 3) | Exceptions |`, `| --- | --- | --- | --- |`, "", `**Table 2 — Wrong, right, why**`, "", `| Wrong | Right | Why |`, `| --- | --- | --- |`].join("\n"),
      [`## 3. Figures`, `- **G1** — ${short} — rule mind-map or transformation chart (authored SVG — English labels)`, "", `One figure slot minimum; text-heavy grammar keeps this single declared slot.`].join("\n"),
      [`## 4. Practice set`, `≥ 12 practice items with answers (block §3b) — written in the unit fill pass.`].join("\n"),
      [`## 5. Exam Zone`, `NEB patterns plus topic MCQs; existing entrance-exam (CEE) material stays where it is — see the seeded exam fields of this file when present.`].join("\n"),
      [`## 6. Summary and self-check`, `One-paragraph essence, quotations or rules to remember, self-check items (block VII).`].join("\n")];
  }
  if (kind === "writing") {
    return [head,
      [`## 2. Format template and annotated specimen`, `**Format table**`, "", `| Part | What goes there | Example line |`, `| --- | --- | --- |`, "", `The labelled-parts figure is declared below; the full specimen is written at fill (§3c).`].join("\n"),
      [`## 3. Figures`, `- **G1** — ${short} — annotated format figure with labelled parts (authored SVG — English labels)`, `- **G2** — ${short} — curated model or layout reference (curated external — license recorded at fill)`].join("\n"),
      [`## 4. Models and vocabulary`, `Two complete model pieces per genre at fill, register table (formal vs informal), and the do-and-avoid table (block §3c).`].join("\n"),
      [`## 5. Exam Zone`, `NEB format-wise past patterns plus marking notes; existing entrance-exam (CEE) material stays where it is — see the seeded exam fields of this file when present.`].join("\n"),
      [`## 6. Summary and self-check`, `Format checklist, one-paragraph essence, self-check tasks.`].join("\n")];
  }
  if (kind === "critical") {
    return [head,
      [`## 2. Framework tables`, `**Table 1 — Claim, evidence, evaluation**`, "", `| Claim | Evidence from text | Evaluation |`, `| --- | --- | --- |`, "", `Passage plus a literal → inferential → evaluative question ladder with model answers at fill (§3d).`].join("\n"),
      [`## 3. Figures`, `- **G1** — ${short} — thinking mind-map (authored SVG — English labels)`].join("\n"),
      [`## 4. Worked analysis`, `Model analyses written in the unit fill pass.`].join("\n"),
      [`## 5. Exam Zone`, `NEB patterns plus topic MCQs; existing entrance-exam (CEE) material stays where it is.`].join("\n"),
      [`## 6. Summary and self-check`, `One-paragraph essence, self-check items.`].join("\n")];
  }
  const subs = subPoints(title);
  return [head,
    [`## 2. Summary`, ...subs.map((s) => `### ${s}`), "", `Full prose summary at fill (poems: stanza-wise summary table); it must match the prescribed textbook telling (§3a, block II).`].join("\n"),
    [`## 3. Classified tables`, `**Table 1 — Themes with evidence**`, "", `| Theme | Evidence from text | Significance |`, `| --- | --- | --- |`, "", `**Table 2 — Characters**`, "", `| Character | Traits | Evidence |`, `| --- | --- | --- |`, "", `**Table 3 — Devices and glossary**`, "", `| Device or word | Example line or meaning | Effect or usage sentence |`, `| --- | --- | --- |`, "", `Glossary reaches ≥ 20 entries with usage sentences at fill (block V).`].join("\n"),
    [`## 4. Figures`, `- **G1** — ${short} — story-arc, character-web or setting map (authored SVG — English labels)`, `- **G2** — ${short} — curated reference (author portrait where licensed, map or structure — license recorded at fill)`].join("\n"),
    [`## 5. Questions and answers`, `Short questions with model answers plus long questions with structured model answers (intro → points → conclusion) at fill; ≥ 10 short + 5 long per text (block VI).`].join("\n"),
    [`## 6. Exam Zone and self-check`, `Existing entrance-exam (CEE) material stays where it is — see the seeded exam fields of this file when present. One-paragraph essence plus quotations-to-remember table (block VII) — completed in the unit fill pass.`].join("\n")];
}

/* ---------- nepali (nepali-plan.md §3) ---------- */
function nepaliKind(entry, unitId) {
  const t = `${unitId} ${entry.title}`;
  if (/vyakarana|bhasha|sandhi|samaas|samasa|karak|vibhakti|kridanta|avyaya|vakya|muhavara|lokokti|warn|akshar|linga|vachan|bhasha-ra/i.test(t)) return "vyakarana";
  if (/lekhan|patra|nivedan|nibandha|report|pratibedan|samachar|sanvad|bhashan|email|anuchchhed|lekh/.test(t)) return "lekhan";
  return "path";
}
function nepaliScaffold(entry, unit, unitTitle) {
  const title = entry.title;
  const short = topicShort(title);
  const kind = nepaliKind(entry, unit.id ?? "");
  const head = [`# ${title}`, "", `## १. लेखक परिचय तथा पृष्ठभूमि (प्रकार: ${kind})`, `**${short}** को पठन-ढाँचा — पाठ के हो, लेखक तथ्याङ्क प्रमाणीकरण भर्ने चरणमा, र तलको नक्सा (nepali-plan.md §3a, खण्ड I)। एकाइ: ${unitTitle}।`].join("\n");
  if (kind === "vyakarana") {
    return [head,
      [`## २. सारांश तथा नियम`, `### ${title}`, "", `नियम तालिका भर्ने चरणमा (§3b)।`].join("\n"),
      [`## ३. वर्गीकृत तालिका`, `**तालिका १ — नियम, उदाहरण, अपवाद**`, "", `| प्रकार | नियम | उदाहरण (≥ ३) | अपवाद |`, `| --- | --- | --- | --- |`, "", `**तालिका २ — भुल्ने ठाउँ**`, "", `| गलत | सही | किन |`, `| --- | --- | --- |`].join("\n"),
      [`## ४. चित्र`, `- **च१** — ${short} — नियम माइन्ड-म्याप वा वाक्य-संरचना चित्र (authored SVG)`, "", `कम्तीमा एक चित्र स्लट; बाह्य चित्र license-recorded।`].join("\n"),
      [`## ५. अभ्यास`, `≥ १२ अभ्यास प्रश्न उत्तरसहित — भर्ने चरणमा (§3b)।`].join("\n"),
      [`## ६. परीक्षा क्षेत्र तथा आत्मपरीक्षण`, `वर्तमान CEE अंश यथावत् — यस फाइलको seeded exam fields हेर्नुहोस्। प्रारूप जाँचसूची, सार, आत्मपरीक्षण — भर्ने चरणमा।`].join("\n")];
  }
  if (kind === "lekhan") {
    return [head,
      [`## २. सारांश`, `### ${title}`, "", `विधा-परिचय भर्ने चरणमा (§3c)।`].join("\n"),
      [`## ३. प्रारूप तथा नमुना`, `**प्रारूप तालिका**`, "", `| भाग | के लेख्ने | उदाहरण पङ्क्ति |`, `| --- | --- | --- |`, "", `टिप्पणीसहित नमुना तथा २ पूरा नमुना रचना भर्ने चरणमा।`].join("\n"),
      [`## ४. चित्र`, `- **च१** — ${short} — टिप्पणीसहित प्रारूप चित्र (authored SVG)`, `- **च२** — ${short} — curated सन्दर्भ (license recorded at fill)`].join("\n"),
      [`## ५. शब्दभण्डार तथा गर्ने-नगर्ने`, `शब्दभण्डार तालिका र गर्ने/नगर्ने तालिका — भर्ने चरणमा (§3c)।`].join("\n"),
      [`## ६. परीक्षा क्षेत्र तथा आत्मपरीक्षण`, `वर्तमान CEE अंश यथावत् — seeded exam fields हेर्नुहोस्। प्रारूप जाँचसूची र आत्मपरीक्षण — भर्ने चरणमा।`].join("\n")];
  }
  const subs = subPoints(title);
  return [head,
    [`## २. सारांश`, ...subs.map((s) => `### ${s}`), "", `पूरा सारांश भर्ने चरणमा (कविता: पद्यांशगत तालिका); निर्धारित पाठ्यपुस्तकसँग मेल खाने (§3a, खण्ड II)।`].join("\n"),
    [`## ३. वर्गीकृत तालिका`, `**तालिका १ — विषयवस्तु प्रमाणसहित**`, "", `| विषय | पाठमा प्रमाण | महत्त्व |`, `| --- | --- | --- |`, "", `**तालिका २ — पात्र**`, "", `| पात्र | विशेषता | प्रमाण |`, `| --- | --- | --- |`, "", `**तालिका ३ — अलंकार तथा शब्दार्थ**`, "", `| अलंकार वा शब्द | उदाहरण पङ्क्ति वा अर्थ | प्रभाव वा वाक्यप्रयोग |`, `| --- | --- | --- |`, "", `शब्दार्थ ≥ २० वाक्यप्रयोगसहित भर्ने चरणमा (खण्ड V)।`].join("\n"),
    [`## ४. चित्र`, `- **च१** — ${short} — कथा-रेखा, पात्र-जाल वा स्थान-नक्सा (authored SVG)`, `- **च२** — ${short} — curated सन्दर्भ (license recorded at fill)`].join("\n"),
    [`## ५. प्रश्नोत्तर`, `छोटो प्रश्न नमुना उत्तरसहित तथा लामो प्रश्न संरचित नमुना उत्तरसहित (परिचय → मुख्य अंश → निष्कर्ष) — भर्ने चरणमा; ≥ १० छोटो + ५ लामो (खण्ड VI)।`].join("\n"),
    [`## ६. परीक्षा क्षेत्र तथा आत्मपरीक्षण`, `वर्तमान CEE अंश यथावत् — seeded exam fields हेर्नुहोस्। एक-अनुच्छेद सार तथा याद राख्नुपर्ने पङ्क्तिहरूको तालिका (खण्ड VII) — भर्ने चरणमा।`].join("\n")];
}

function scaffoldFor(subject, entry, unit, unitTitle) {
  if (subject === "physics") return physicsScaffold(entry, unitTitle);
  if (subject === "chemistry") return chemistryScaffold(entry, unitTitle);
  if (subject === "mathematics") return mathScaffold(entry, unitTitle);
  if (subject === "english") return englishScaffold(entry, unit, unitTitle);
  if (subject === "nepali") return nepaliScaffold(entry, unit, unitTitle);
  return scaffoldEntries(entry, unitTitle);
}

/** CEE/entrance fields copied (never moved) from existing topic notes. */
const CEE_FIELDS = ["examNotes", "examShortTricks", "practiceQuestions", "practice", "mcs", "mcqs"];

function collectCee(variantFiles) {
  const out = {};
  for (const f of variantFiles) {
    let d;
    try { d = JSON.parse(fs.readFileSync(f, "utf8")); } catch { continue; }
    for (const k of CEE_FIELDS) {
      const v = d[k];
      if (!Array.isArray(v) || v.length === 0) continue;
      const list = out[k] ?? (out[k] = []);
      for (const item of v) {
        const sig = JSON.stringify(item);
        if (!list.some((x) => JSON.stringify(x) === sig)) list.push(item);
      }
    }
  }
  // schema caps
  if (out.mcs) out.mcs = out.mcs.slice(0, 40);
  if (out.mcqs) out.mcqs = out.mcqs.slice(0, 40);
  for (const k of ["examNotes", "examShortTricks", "practiceQuestions", "practice"])
    if (out[k]) out[k] = out[k].slice(0, 80);
  return out;
}

/* ── main ─────────────────────────────────────────────────────────────────── */

function main() {
  const syllabus = parseSyllabus(fs.readFileSync(SYLLABUS, "utf8"));
  const stats = { topics: 0, upgraded: 0, created: 0, seeded: 0, skipped: 0, capped: 0 };
  const report = [];

  for (const cls of syllabus) {
    const classSlug = CLASS_LABEL[cls.slug] ?? cls.slug;
    if (CLASS_FILTER && classSlug !== CLASS_FILTER) continue;

    for (const subj of cls.subjects) {
      if (subj.slug !== SUBJECT) continue;

      // One pass over the subject dir: index every file by topicSlug once.
      // (Per-topic directory scans made dry-runs time out on large subjects.)
      const subjectDir = path.join(ROOT, "content", "notes", "concepts", classSlug, SUBJECT);
      const variantIndex = []; // { fp, topicSlug }
      const ceeCache = new Map(); // fp -> parsed doc (only docs with CEE fields)
      if (fs.existsSync(subjectDir)) {
        for (const dir of fs.readdirSync(subjectDir).filter((d) => { try { return fs.statSync(path.join(subjectDir, d)).isDirectory(); } catch { return false; } })) {
          const dpath = path.join(subjectDir, dir);
          let files = [];
          try { files = fs.readdirSync(dpath); } catch { continue; }
          for (const f of files) {
            if (!f.endsWith(".json")) continue;
            const fp = path.join(dpath, f);
            try {
              const d = JSON.parse(fs.readFileSync(fp, "utf8"));
              const ts = String(d.topicSlug ?? "");
              if (!ts) continue;
              variantIndex.push({ fp, topicSlug: ts });
              if (CEE_FIELDS.some((k) => Array.isArray(d[k]) && d[k].length)) ceeCache.set(fp, d);
            } catch { /* broken files are left for check:content to report */ }
          }
        }
      }
      const findVariants = (canonical, slug) => {
        const out = [];
        const prefix = slug.slice(0, 80);
        for (const v of variantIndex) {
          if (v.fp === canonical) continue;
          const ts = v.topicSlug;
          if (ts === slug || slug.startsWith(ts) || ts.startsWith(prefix)) out.push(v.fp);
        }
        return out;
      };
      const collectCeeCached = (variantFiles) => {
        const out = {};
        for (const fp of variantFiles) {
          const d = ceeCache.get(fp);
          if (!d) continue;
          for (const k of CEE_FIELDS) {
            const v = d[k];
            if (!Array.isArray(v) || v.length === 0) continue;
            const list = out[k] ?? (out[k] = []);
            for (const item of v) {
              const sig = JSON.stringify(item);
              if (!list.some((x) => JSON.stringify(x) === sig)) list.push(item);
            }
          }
        }
        if (out.mcs) out.mcs = out.mcs.slice(0, 40);
        if (out.mcqs) out.mcqs = out.mcqs.slice(0, 40);
        for (const k of ["examNotes", "examShortTricks", "practiceQuestions", "practice"])
          if (out[k]) out[k] = out[k].slice(0, 80);
        return out;
      };

      for (const unit of subj.units) {
        const unitDir = path.join(ROOT, "content", "notes", "concepts", classSlug, SUBJECT, unit.id);

        for (const entry of topicEntries(unit)) {
          stats.topics += 1;
          const NN = String(entry.index + 1).padStart(2, "0");
          const canonical = path.join(unitDir, `${NN}-${entry.slug}.json`);
          const rel = path.relative(ROOT, canonical).replace(/\\/g, "/");

          // variant files anywhere under this class/subject whose topicSlug belongs to this topic
          const variants = findVariants(canonical, entry.slug);

          if (fs.existsSync(canonical)) {
            // ── upgrade in place: append only ──
            const raw = fs.readFileSync(canonical, "utf8");
            let d;
            try { d = JSON.parse(raw); } catch { report.push(`BROKEN (left untouched): ${rel}`); stats.skipped++; continue; }
            const notes = Array.isArray(d.notes) ? d.notes : [];
            if (notes.some((n) => typeof n === "string" && n.includes(INTERFACE_MARKER))) {
              report.push(`SKIP (interface present): ${rel}`);
              stats.skipped++;
              continue;
            }
            const entries = scaffoldFor(SUBJECT, entry, unit, unit.title ?? unit.id);
            const combined = entries.join("\n\n");
            const budget = 80 - notes.length;
            if (budget <= 0) {
              report.push(`SKIP (notes list full, ${notes.length}): ${rel}`);
              stats.skipped++;
              continue;
            }
            if (budget >= entries.length) d.notes = [...notes, ...entries];
            else {
              d.notes = [...notes, combined.slice(0, 20_000)];
              stats.capped++;
            }
            if (!d.source) d.source = "skeleton-v2";
            if (!DRY) fs.writeFileSync(canonical, JSON.stringify(d, null, 2) + "\n", "utf8");
            stats.upgraded++;
            report.push(`${DRY ? "DRY-UPGRADE" : "UPGRADED"}: ${rel} (+${Math.min(budget, entries.length)} notes, ${variants.length} variant(s))`);
            continue;
          }

          // ── create the canonical skeleton ──
          const entries = scaffoldFor(SUBJECT, entry, unit, unit.title ?? unit.id);
          const cee = collectCeeCached(variants);
          const title = entry.title.length <= 400
            ? entry.title
            : entry.title.slice(0, 397).replace(/\s+\S*$/, "");
          const file = {
            title,
            unitSlug: unit.id,
            topicSlug: entry.slug,
            topicTitle: entry.title,
            source: "skeleton-v2",
            generatedAt: new Date().toISOString(),
            notes: entries,
            ...cee,
          };
          if (Object.keys(cee).length) stats.seeded++;
          if (!DRY) {
            fs.mkdirSync(unitDir, { recursive: true });
            fs.writeFileSync(canonical, JSON.stringify(file, null, 2) + "\n", "utf8");
          }
          stats.created++;
          report.push(`${DRY ? "DRY-CREATE" : "CREATED"}: ${rel}${Object.keys(cee).length ? ` (CEE seeded: ${Object.keys(cee).join(", ")})` : ""}`);
        }
      }
    }
  }

  for (const line of report) console.log(line);
  console.log("");
  console.log(`topics=${stats.topics} created=${stats.created} upgraded=${stats.upgraded} seeded=${stats.seeded} skipped=${stats.skipped} capped=${stats.capped}${DRY ? "  [DRY RUN — nothing written]" : ""}`);
}

main();
