#!/usr/bin/env node
/**
 * Biology content populator — NEB Class 11.
 * Maps every concept file to a topic and writes high-quality, exam-based
 * content into enrichedContent + originalContent + top-level mcqs.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'content', 'ravikishan', 'class-11-notes', 'biology');

// ── Load all content modules into one map ──────────────────────────
const MODULES = [
  'bio-cell', 'bio-flora', 'bio-micro', 'bio-evolution', 'bio-fauna',
  'bio-intro', 'bio-ecology', 'bio-biota', 'bio-conservation',
  'bio-vegetation', 'bio-detailed-1'
];
const TOPICS = {};
for (const m of MODULES) {
  Object.assign(TOPICS, require(path.join(__dirname, m + '.cjs')));
}
console.log('Loaded topics:', Object.keys(TOPICS).length);

// ── filename (relative to unit) -> topic key ────────────────────────
const FILE_MAP = {
  // biomolecules-and-cell-biology
  'biomolecules-and-cell-biology/01-biomolecules-functions.json': 'bio-cell-biomolecules',
  'biomolecules-and-cell-biology/01-biomolecules-introduction-and-functions.json': 'bio-cell-biomolecules',
  'biomolecules-and-cell-biology/02-cell-introduction-prokaryotic-and-eukaryotic.json': 'bio-cell-intro',
  'biomolecules-and-cell-biology/02-cell-introduction.json': 'bio-cell-intro',
  'biomolecules-and-cell-biology/03-detail-structure-of-eukaryotic-cells.json': 'det-cell-structure',
  'biomolecules-and-cell-biology/03-eukaryotic-cell-structure.json': 'bio-cell-structure',
  'biomolecules-and-cell-biology/04-cell-division-concept-of-cell-cycle-types-of-cell-division-and-significances.json': 'det-cell-division',
  'biomolecules-and-cell-biology/04-cell-division.json': 'bio-cell-division',
  // biota-and-environment
  'biota-and-environment/01-animal-adaptation-aquatic-terrestrial-and-volant-adaptation.json': 'biota-adaptation',
  'biota-and-environment/01-animal-adaptation.json': 'biota-adaptation',
  'biota-and-environment/02-animal-behavior-reflex-action-taxes-dominance-and-leadership-fish-and-bird-migration.json': 'biota-behavior',
  'biota-and-environment/02-animal-behavior.json': 'biota-behavior',
  'biota-and-environment/03-environmental-pollution-sources-effects-and-control-measures-of-air-water-and-soil-pollution-pesticides-and-their-effects.json': 'biota-pollution',
  'biota-and-environment/03-environmental-pollution.json': 'biota-pollution',
  // conservation-biology
  'conservation-biology/01-biodiversity-conservation.json': 'conservation-biodiversity',
  'conservation-biology/01-conservation-biology-concept-of-biodiversity-biodiversity-conservation.json': 'conservation-biodiversity',
  'conservation-biology/02-protected-areas-conservation.json': 'conservation-protected-areas',
  'conservation-biology/02-protected-areas.json': 'conservation-protected-areas',
  // ecology
  'ecology/01-ecosystem-ecology-detailed.json': 'eco-ecosystem',
  'ecology/01-ecosystem-ecology.json': 'eco-ecosystem',
  'ecology/02-food-chain-web-productivity.json': 'eco-food-chain',
  'ecology/02-food-chain-web.json': 'eco-food-chain',
  'ecology/03-biogeochemical-cycles-succession.json': 'eco-cycles',
  'ecology/03-biogeochemical-cycles.json': 'eco-cycles',
  'ecology/04-ecological-adaptation-hydrophytes-xerophytes.json': 'eco-adaptation',
  'ecology/04-ecological-adaptation.json': 'eco-adaptation',
  'ecology/05-ecological-imbalances-climate-change.json': 'eco-imbalance',
  'ecology/05-ecological-imbalances.json': 'eco-imbalance',
  // evolutionary-biology
  'evolutionary-biology/01-life-and-its-origin-oparin-haldane-theory-miller-and-urey-s-experiment.json': 'evo-origin-life',
  'evolutionary-biology/01-origin-life.json': 'evo-origin-life',
  'evolutionary-biology/02-evidences-evolution.json': 'evo-evidence',
  'evolutionary-biology/02-evidences-of-evolution-morphological-anatomical-paleontological-embryological-and-biochemical.json': 'evo-evidence',
  'evolutionary-biology/03-theories-evolution.json': 'evo-theories',
  'evolutionary-biology/03-theories-of-evolution-lamarckism-darwinism-and-concept-of-neo-darwinism.json': 'evo-theories',
  'evolutionary-biology/04-human-evolution.json': 'evo-human',
  // faunal-diversity
  'faunal-diversity/01-protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples.json': 'fauna-protista',
  'faunal-diversity/01-protista-protozoa.json': 'fauna-protista',
  'faunal-diversity/02-animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class.json': 'fauna-phyla',
  'faunal-diversity/02-animalia-phyla.json': 'fauna-phyla',
  'faunal-diversity/03-earthworm.json': 'fauna-earthworm-basic',
  'faunal-diversity/04-earthworm-excretory-nervous-and-reproductive-systems.json': 'fauna-earthworm-systems',
  'faunal-diversity/04-frog.json': 'fauna-frog-general',
  'faunal-diversity/05-frog-habit-and-habitat-external-features.json': 'fauna-frog-basic',
  'faunal-diversity/06-frog-digestive-system-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respiratory-organs-and-physiology-of-respiration.json': 'fauna-frog-digestive-circ-resp',
  'faunal-diversity/07-frog-reproductive-system-male-and-female-reproductive-organs.json': 'fauna-frog-reproductive',
  // floral-diversity
  'floral-diversity/01-life-classification.json': 'flora-classification',
  'floral-diversity/02-fungi-general-introduction-and-characteristic-features.json': 'flora-fungi',
  'floral-diversity/02-fungi.json': 'flora-fungi',
  'floral-diversity/03-algae.json': 'flora-algae',
  'floral-diversity/04-bryophytes-detailed.json': 'det-bryophytes',
  'floral-diversity/04-bryophytes.json': 'flora-bryophytes',
  'floral-diversity/05-pteridophytes-detailed.json': 'det-pteridophytes',
  'floral-diversity/05-pteridophytes.json': 'flora-pteridophytes',
  'floral-diversity/06-gymnosperms-detailed.json': 'det-gymnosperms',
  'floral-diversity/06-gymnosperms.json': 'flora-gymnosperms',
  'floral-diversity/07-angiosperm-morphology-and-taxonomic-study.json': 'flora-angiosperms',
  'floral-diversity/07-angiosperms.json': 'flora-angiosperms',
  // introduction-to-biology
  'introduction-to-biology/01-introduction-to-biology-scope-and-fields-of-biology.json': 'intro-scope',
  'introduction-to-biology/01-scope-fields-biology.json': 'intro-scope',
  'introduction-to-biology/02-relation-of-biology-with-other-sciences.json': 'intro-relation',
  'introduction-to-biology/02-relation-other-sciences.json': 'intro-relation',
  // introductory-microbiology
  'introductory-microbiology/01-monera-bacteria.json': 'micro-monera',
  'introductory-microbiology/01-monera-detailed.json': 'det-micro-monera',
  'introductory-microbiology/02-impacts-of-biotechnology-in-the-field-of-microbiology.json': 'det-micro-biotech',
  'introductory-microbiology/02-virus.json': 'micro-virus',
  'introductory-microbiology/03-biotech-microbiology.json': 'det-micro-biotech',
  // vegetation
  'vegetation/01-vegetation-introduction-types-of-vegetation-in-nepal-in-situ-and-ex-situ-conservation-natural-environment-vegetation-and-human-activities.json': 'veg-intro-human',
  'vegetation/01-vegetation-types.json': 'veg-types',
  'vegetation/02-conservation-in-situ-ex-situ.json': 'veg-conservation'
};

const FIELDS = [
  'notes', 'confusion', 'practice', 'universalFacts', 'examples',
  'practiceQuestions', 'formulas', 'keyPoints', 'summary', 'specialNotes',
  'importantStatements', 'importantNotes', 'examShortTricks', 'examNotes',
  'mcs', 'importantConcepts', 'importantTasks', 'exercises', 'visualization'
];

function deepCopy(v) { return JSON.parse(JSON.stringify(v)); }

function buildBlock(topic) {
  const b = {};
  for (const f of FIELDS) b[f] = deepCopy(topic[f]);
  return b;
}

let processed = 0, missing = 0;
for (const [rel, key] of Object.entries(FILE_MAP)) {
  const topic = TOPICS[key];
  const unit = path.dirname(rel);
  const realPath = path.join(ROOT, unit, 'concepts', path.basename(rel));
  if (!fs.existsSync(realPath)) { console.log('MISSING FILE:', rel); missing++; continue; }
  if (!topic) { console.log('NO TOPIC:', rel, '->', key); missing++; continue; }

  let obj = JSON.parse(fs.readFileSync(realPath, 'utf8'));
  // Normalise malformed files where metadata lives under a numeric key
  if (obj['0'] && typeof obj['0'] === 'object' && obj['0'].unitSlug !== undefined) {
    for (const k of Object.keys(obj['0'])) {
      if (k !== 'enrichedContent' && k !== 'originalContent' && k !== 'mcqs') obj[k] = obj['0'][k];
    }
    delete obj['0'];
    delete obj['1'];
  }
  obj.mcqs = deepCopy(topic.mcs);
  obj.enrichedContent = buildBlock(topic);
  obj.originalContent = buildBlock(topic);
  fs.writeFileSync(realPath, JSON.stringify(obj, null, 2), 'utf8');
  processed++;
  console.log('OK  ', rel, '->', key);
}
console.log('\nDone. processed=' + processed + ' missing=' + missing + ' totalMapped=' + Object.keys(FILE_MAP).length);
