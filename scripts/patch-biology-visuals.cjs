/**
 * Biology visualType patch script
 * - Fixes miswired visualTypes ( Haber process / Avogadro's law from Physics/Chem)
 * - Adds correct biology-specific visualType values to each concept JSON
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'content', 'ravikishan', 'class-11-notes', 'biology');

// Map: topicSlug → correct visualType
const VISUAL_ASSIGNMENTS = {
  // Biomolecules and Cell Biology
  'biomolecules-introduction-and-functions': 'biomolecule-types-diagram',
  'biomolecules-functions': 'biomolecule-types-diagram',
  'cell-introduction': 'animal-vs-plant-cell',
  'cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells': 'prokaryotic-vs-eukaryotic-cell',
  'eukaryotic-cell-structure': 'organelle-functions',
  'detail-structure-of-eukaryotic-cells': 'organelle-functions',
  'cell-division': 'mitosis-vs-meiosis',
  'cell-division-concept-of-cell-cycle-types-of-cell-division-and-significances': 'mitosis-vs-meiosis',

  // Floral Diversity
  'life-classification': 'five-kingdom-classification',
  'fungi': 'fungi-life-cycles',
  'fungi-general-introduction-and-characteristic-features': 'fungi-life-cycles',
  'algae': 'algae-types-diagram',
  'bryophytes': 'bryophyte-life-cycle',
  'bryophytes-detailed': 'bryophyte-life-cycle',
  'pteridophytes': 'pteridophyte-life-cycle',
  'pteridophytes-detailed': 'pteridophyte-life-cycle',
  'gymnosperms': 'gymnosperm-life-cycle',
  'gymnosperms-detailed': 'gymnosperm-life-cycle',
  'angiosperms': 'flower-anatomy-diagram',
  'angiosperm-morphology-and-taxonomic-study': 'flower-anatomy-diagram',

  // Introductory Microbiology
  'monera-bacteria': 'bacterial-cell-structure',
  'monera-detailed': 'bacterial-cell-structure',
  'virus': 'virion-structure',
  'impacts-of-biotechnology-in-the-field-of-microbiology': 'biotech-microbe-applications',
  'biotech-microbiology': 'biotech-microbe-applications',

  // Ecology
  'ecosystem-ecology': 'ecosystem-structure',
  'ecosystem-ecology-detailed': 'ecosystem-structure',
  'food-chain-web': 'food-chain-web',
  'food-chain-web-productivity': 'ecological-pyramid',
  'biogeochemical-cycles': 'carbon-nitrogen-cycles',
  'biogeochemical-cycles-succession': 'carbon-nitrogen-cycles',
  'ecological-adaptation': 'hydrophyte-xerophyte-adaptations',
  'ecological-adaptation-hydrophytes-xerophytes': 'hydrophyte-xerophyte-adaptations',
  'ecological-imbalances': 'pollution-climate-change',
  'ecological-imbalances-climate-change': 'pollution-climate-change',

  // Evolutionary Biology
  'origin-life': 'origin-of-life-experiment',
  'life-and-its-origin-oparin-haldane-theory-miller-and-urey-s-experiment': 'origin-of-life-experiment',
  'evidences-of-evolution': 'evidences-of-evolution',
  'evidences-evolution': 'evidences-of-evolution',
  'theories-of-evolution': 'evolution-theories-comparison',
  'theories-evolution': 'evolution-theories-comparison',
  'human-evolution': 'human-evolution-tree',

  // Faunal Diversity
  'protista-protozoa': 'protist-diversity',
  'protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples': 'protist-diversity',
  'animalia-phyla': 'animal-phyla-key-features',
  'animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals-diagnostic-features-and-classification-of-phyla-up-to-class': 'animal-phyla-key-features',
  'earthworm': 'earthworm-external-anatomy',
  'earthworm-excretory-nervous-and-reproductive-systems': 'earthworm-internal-systems',
  'frog': 'frog-anatomy-overview',
  'frog-habit-and-habitat-external-features': 'frog-external-anatomy',
  'frog-digestive-system-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respiratory-organs-and-physiology-of-respiration': 'frog-physiological-systems',
  'frog-reproductive-system-male-and-female-reproductive-organs': 'frog-reproductive-systems',

  // Biota and Environment
  'animal-adaptation': 'animal-adaptation-types',
  'animal-adaptation-aquatic-terrestrial-and-volant-adaptation': 'animal-adaptation-types',
  'animal-behavior': 'animal-behavior-reflex-taxis',
  'animal-behavior-reflex-action-taxes-dominance-and-leadership-fish-and-bird-migration': 'animal-behavior-reflex-taxis',
  'environmental-pollution': 'pollution-types-effects',
  'environmental-pollution-sources-effects-and-control-measures-of-air-water-and-soil-pollution-pesticides-and-their-effects': 'pollution-types-effects',

  // Conservation Biology
  'conservation-biology-concept-of-biodiversity-biodiversity-conservation': 'biodiversity-conservation',
  'biodiversity-conservation': 'biodiversity-conservation',
  'protected-areas': 'conservation-strategies-nepal',
  'protected-areas-conservation': 'conservation-strategies-nepal',

  // Introduction to Biology
  'scope-fields-biology': 'biology-scope-branches',
  'introduction-to-biology-scope-and-fields-of-biology': 'biology-scope-branches',
  'relation-other-sciences': 'biology-interdisciplinary',
  'relation-of-biology-with-other-sciences': 'biology-interdisciplinary',

  // Vegetation
  'vegetation-types': 'nepal-vegetation-zones',
  'vegetation-introduction-types-of-vegetation-in-nepal-in-situ-and-ex-situ-conservation-natural-environment-vegetation-and-human-activities': 'nepal-vegetation-zones',
  'conservation-in-situ-ex-situ': 'in-situ-ex-situ-conservation',
};

// Read all concept files
const conceptDir = path.join(ROOT);
const files = [];

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
    } else if (entry.name.endsWith('.json') && !entry.name.startsWith('plan') && !entry.name.startsWith('mindmap')) {
      files.push(full);
    }
  }
}
walkDir(conceptDir);

console.log(`Found ${files.length} biology concept JSON files`);

let fixed = 0;
let added = 0;
let errors = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  try {
    const data = JSON.parse(content);
    const slug = data.topicSlug;

    if (!slug || !VISUAL_ASSIGNMENTS[slug]) {
      console.log(`  ⏭️  ${path.basename(filePath)} — no mapping`);
      continue;
    }

    const correctVisualType = VISUAL_ASSIGNMENTS[slug];
    const currentVisualType = data.visualType || '(none)';

    if (currentVisualType === correctVisualType) {
      console.log(`  ✓  ${path.basename(filePath)} — already ${correctVisualType}`);
      continue;
    }

    // Patch the visualType field
    data.visualType = correctVisualType;

    // Re-stringify
    content = JSON.stringify(data, null, 2);
    fixed++;
    console.log(`  🔧 ${path.basename(filePath)}: ${currentVisualType} → ${correctVisualType}`);
  } catch (e) {
    console.log(`  ❌ Error parsing ${filePath}: ${e.message}`);
    errors++;
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    added++;
  }
}

console.log(`\n✅ Patch complete: ${fixed} files fixed, ${added} written, ${errors} errors`);
