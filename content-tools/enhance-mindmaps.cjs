
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'content', 'ravikishan', 'class-11-notes');

const HINTS = {
  biology: { cats: ['Cell Biology','Genetics','Evolution','Ecology','Anatomy','Physiology','Microbiology','Botany','Zoology','Biochemistry'] },
  chemistry: { cats: ['Atomic Structure','Bonding','States of Matter','Thermodynamics','Equilibrium','Organic','Inorganic','Electrochemistry','Kinetics','Stoichiometry'] },
  mathematics: { cats: ['Algebra','Calculus','Geometry','Trigonometry','Statistics','Probability','Analysis','Linear Algebra'] },
  physics: { cats: ['Mechanics','Thermodynamics','Electromagnetism','Optics','Modern Physics','Waves','Fluid Mechanics','Atomic Physics'] }
};

function getTopics(unitDir) {
  const cd = path.join(unitDir, 'concepts');
  if (!fs.existsSync(cd)) return [];
  return fs.readdirSync(cd).filter(f => f.endsWith('.json')).map(f => {
    try { const c = JSON.parse(fs.readFileSync(path.join(cd, f), 'utf8')); return { title: c.title || c.topicTitle || '', slug: c.topicSlug || f.replace('.json','') }; } catch(e) { return null; }
  }).filter(Boolean);
}

function buildMindmap(unitSlug, subject, topics) {
  const cats = HINTS[subject]?.cats || [];
  const name = unitSlug.split('-').map(w => w[0].toUpperCase()+w.slice(1)).join(' ');
  const grouped = {}, other = [];
  for (const t of topics) {
    const tl = t.title.toLowerCase();
    const match = cats.find(c => tl.includes(c.toLowerCase()));
    if (match) (grouped[match] = grouped[match] || []).push(t);
    else other.push(t);
  }
  const branches = Object.entries(grouped).map(([cat, items]) => ({
    topic: cat, subtopics: items.slice(0,5).map(i => ({
      name: i.title.length>45 ? i.title.slice(0,42)+'...' : i.title,
      points: [`Key concept in ${subject}`, `Related to ${name}`]
    }))
  }));
  if (other.length) branches.push({ topic: 'Other', subtopics: other.slice(0,5).map(i => ({
    name: i.title.length>45 ? i.title.slice(0,42)+'...' : i.title, points: [`Related to ${name}`]
  }))});
  return { centralConcept: name, branches };
}

function enhance(mp, subject) {
  const unitDir = path.dirname(path.dirname(mp));
  const unitSlug = path.basename(unitDir);
  let m = {};
  try { m = JSON.parse(fs.readFileSync(mp, 'utf8')); } catch(e) {}
  m.title = m.title || `${unitSlug} Mindmap`;
  m.unitSlug = unitSlug;
  m.topicSlug = `${unitSlug}-mindmap`;
  m.topicTitle = m.topicTitle || `${unitSlug.replace(/-/g,' ')} — interactive concept map`;
  m.relevance = 0;
  const topics = getTopics(unitDir);
  m.mindmap = buildMindmap(unitSlug, subject, topics);
  m.notes = [`Study of ${unitSlug.replace(/-/g,' ')}.`, `${topics.length} concepts available.`];
  fs.writeFileSync(mp, JSON.stringify(m, null, 2));
  return { unit: unitSlug, topics: topics.length, branches: m.mindmap.branches.length };
}

function main() {
  console.log('Enhancing mindmaps...\n');
  let total = 0;
  for (const sub of ['biology','chemistry','mathematics','physics']) {
    const sd = path.join(ROOT, sub);
    if (!fs.existsSync(sd)) continue;
    for (const unit of fs.readdirSync(sd)) {
      const mp = path.join(sd, unit, 'mindmap', 'mindmap.json');
      if (!fs.existsSync(mp)) continue;
      try { const r = enhance(mp, sub); total++; console.log(`✓ ${sub}/${unit}: ${r.topics}→${r.branches} branches`); }
      catch(e) { console.log(`✗ ${sub}/${unit}: ${e.message}`); }
    }
  }
  console.log(`\nDone: ${total} mindmaps enhanced.`);
}

if (require.main === module) main();
module.exports = { enhance, getTopics, buildMindmap };


const HINTS = {
  biology: { cats: ['Cell Biology','Genetics','Evolution','Ecology','Anatomy','Physiology','Microbiology','Botany','Zoology','Biochemistry'] },
  chemistry: { cats: ['Atomic Structure','Bonding','States of Matter','Thermodynamics','Equilibrium','Organic','Inorganic','Electrochemistry','Kinetics','Stoichiometry'] },
  mathematics: { cats: ['Algebra','Calculus','Geometry','Trigonometry','Statistics','Probability','Analysis','Linear Algebra'] },
  physics: { cats: ['Mechanics','Thermodynamics','Electromagnetism','Optics','Modern Physics','Waves','Fluid Mechanics','Atomic Physics'] }
};

function getTopics(unitDir) {
  const cd = path.join(unitDir, 'concepts');
  if (!fs.existsSync(cd)) return [];
  return fs.readdirSync(cd).filter(f => f.endsWith('.json')).map(f => {
    try { const c = JSON.parse(fs.readFileSync(path.join(cd, f), 'utf8')); return { title: c.title || c.topicTitle || '', slug: c.topicSlug || f.replace('.json','') }; } catch(e) { return null; }
  }).filter(Boolean);
}

function buildMindmap(unitSlug, subject, topics) {
  const cats = HINTS[subject]?.cats || [];
  const name = unitSlug.split('-').map(w => w[0].toUpperCase()+w.slice(1)).join(' ');
  const grouped = {}, other = [];
  for (const t of topics) {
    const tl = t.title.toLowerCase();
    const match = cats.find(c => tl.includes(c.toLowerCase()));
    if (match) (grouped[match] = grouped[match] || []).push(t);
    else other.push(t);
  }
  const branches = Object.entries(grouped).map(([cat, items]) => ({
    topic: cat, subtopics: items.slice(0,5).map(i => ({
      name: i.title.length>45 ? i.title.slice(0,42)+'...' : i.title,
      points: [`Key concept in ${subject}`, `Related to ${name}`]
    }))
  }));
  if (other.length) branches.push({ topic: 'Other', subtopics: other.slice(0,5).map(i => ({
    name: i.title.length>45 ? i.title.slice(0,42)+'...' : i.title, points: [`Related to ${name}`]
  }))});
  return { centralConcept: name, branches };
}

function enhance(mp, subject) {
  const unitDir = path.dirname(path.dirname(mp));
  const unitSlug = path.basename(unitDir);
  let m = {};
  try { m = JSON.parse(fs.readFileSync(mp, 'utf8')); } catch(e) {}
  m.title = m.title || `${unitSlug} Mindmap`;
  m.unitSlug = unitSlug;
  m.topicSlug = `${unitSlug}-mindmap`;
  m.topicTitle = m.topicTitle || `${unitSlug.replace(/-/g,' ')} — interactive concept map`;
  m.relevance = 0;
  const topics = getTopics(unitDir);
  m.mindmap = buildMindmap(unitSlug, subject, topics);
  m.notes = [`Study of ${unitSlug.replace(/-/g,' ')}.`, `${topics.length} concepts available.`];
  fs.writeFileSync(mp, JSON.stringify(m, null, 2));
  return { unit: unitSlug, topics: topics.length, branches: m.mindmap.branches.length };
}

function main() {
  console.log('Enhancing mindmaps...\n');
  let total = 0;
  for (const sub of ['biology','chemistry','mathematics','physics']) {
    const sd = path.join(ROOT, sub);
    if (!fs.existsSync(sd)) continue;
    for (const unit of fs.readdirSync(sd)) {
      const mp = path.join(sd, unit, 'mindmap', 'mindmap.json');
      if (!fs.existsSync(mp)) continue;
      try { const r = enhance(mp, sub); total++; console.log(`✓ ${sub}/${unit}: ${r.topics}→${r.branches} branches`); }
      catch(e) { console.log(`✗ ${sub}/${unit}: ${e.message}`); }
    }
  }
  console.log(`\nDone: ${total} mindmaps enhanced.`);
}

if (require.main === module) main();
module.exports = { enhance, getTopics, buildMindmap };


const HINTS = {
  biology: { cats: ['Cell Biology','Genetics','Evolution','Ecology','Anatomy','Physiology','Microbiology','Botany','Zoology','Biochemistry'] },
  chemistry: { cats: ['Atomic Structure','Bonding','States of Matter','Thermodynamics','Equilibrium','Organic','Inorganic','Electrochemistry','Kinetics','Stoichiometry'] },
  mathematics: { cats: ['Algebra','Calculus','Geometry','Trigonometry','Statistics','Probability','Analysis','Linear Algebra'] },
  physics: { cats: ['Mechanics','Thermodynamics','Electromagnetism','Optics','Modern Physics','Waves','Fluid Mechanics','Atomic Physics'] }
};

function getTopics(unitDir) {
  const cd = path.join(unitDir, 'concepts');
  if (!fs.existsSync(cd)) return [];
  return fs.readdirSync(cd).filter(f => f.endsWith('.json')).map(f => {
    try { const c = JSON.parse(fs.readFileSync(path.join(cd, f), 'utf8')); return { title: c.title || c.topicTitle || '', slug: c.topicSlug || f.replace('.json','') }; } catch(e) { return null; }
  }).filter(Boolean);
}

function buildMindmap(unitSlug, subject, topics) {
  const cats = HINTS[subject]?.cats || [];
  const name = unitSlug.split('-').map(w => w[0].toUpperCase()+w.slice(1)).join(' ');
  const grouped = {}, other = [];
  for (const t of topics) {
    const tl = t.title.toLowerCase();
    const match = cats.find(c => tl.includes(c.toLowerCase()));
    if (match) (grouped[match] = grouped[match] || []).push(t);
    else other.push(t);
  }
  const branches = Object.entries(grouped).map(([cat, items]) => ({
    topic: cat, subtopics: items.slice(0,5).map(i => ({
      name: i.title.length>45 ? i.title.slice(0,42)+'...' : i.title,
      points: [`Key concept in ${subject}`, `Related to ${name}`]
    }))
  }));
  if (other.length) branches.push({ topic: 'Other', subtopics: other.slice(0,5).map(i => ({
    name: i.title.length>45 ? i.title.slice(0,42)+'...' : i.title, points: [`Related to ${name}`]
  }))});
  return { centralConcept: name, branches };
}

function enhance(mp, subject) {
  const unitDir = path.dirname(path.dirname(mp));
  const unitSlug = path.basename(unitDir);
  let m = {};
  try { m = JSON.parse(fs.readFileSync(mp, 'utf8')); } catch(e) {}
  m.title = m.title || `${unitSlug} Mindmap`;
  m.unitSlug = unitSlug;
  m.topicSlug = `${unitSlug}-mindmap`;
  m.topicTitle = m.topicTitle || `${unitSlug.replace(/-/g,' ')} — interactive concept map`;
  m.relevance = 0;
  const topics = getTopics(unitDir);
  m.mindmap = buildMindmap(unitSlug, subject, topics);
  m.notes = [`Study of ${unitSlug.replace(/-/g,' ')}.`, `${topics.length} concepts available.`];
  fs.writeFileSync(mp, JSON.stringify(m, null, 2));
  return { unit: unitSlug, topics: topics.length, branches: m.mindmap.branches.length };
}

function main() {
  console.log('Enhancing mindmaps...\n');
  let total = 0;
  for (const sub of ['biology','chemistry','mathematics','physics']) {
    const sd = path.join(ROOT, sub);
    if (!fs.existsSync(sd)) continue;
    for (const unit of fs.readdirSync(sd)) {
      const mp = path.join(sd, unit, 'mindmap', 'mindmap.json');
      if (!fs.existsSync(mp)) continue;
      try { const r = enhance(mp, sub); total++; console.log(`✓ ${sub}/${unit}: ${r.topics}→${r.branches} branches`); }
      catch(e) { console.log(`✗ ${sub}/${unit}: ${e.message}`); }
    }
  }
  console.log(`\nDone: ${total} mindmaps enhanced.`);
}

equire.main === module) main();
module.exports = { enhance, getTopics, buildMindmap };
equire.main === module) main();
module.exports = { enhance, getTopics, buildMindmap };
equire.main === module) main();
module.exports = { enhance, getTopics, buildMindmap };

        { topic: 'Carbohydrates', subtopics: [
          { name: 'Monosaccharides', points: ['Glucose: C₆H₁₂O₆ — primary energy source', 'Fructose: fruit sugar, sweetest natural sugar', 'Galactose: component of lactose', 'Ribose/Deoxyribose: sugar in RNA/DNA'] },
          { name: 'Disaccharides', points: ['Sucrose = Glucose + Fructose (cane sugar)', 'Maltose = Glucose + Glucose (malt sugar)', 'Lactose = Glucose + Galactose (milk sugar)', 'Formation: condensation; Breakdown: hydrolysis'] },
          { name: 'Polysaccharides', points: ['Starch: plant storage (amylose + amylopectin)', 'Glycogen: animal storage (liver & muscle)', 'Cellulose: plant cell wall (β-1,4 linkages)', 'Chitin: fungal cell walls, arthropod exoskeleton'] }
        ]},
        { topic: 'Proteins', subtopics: [
          { name: 'Amino Acids', points: ['General structure: NH₂-CHR-COOH', '20 standard amino acids', 'Essential vs non-essential', 'Peptide bond: -CO-NH- (dehydration synthesis)'] },
          { name: 'Protein Structure', points: ['Primary: linear sequence of amino acids', 'Secondary: α-helix and β-pleated sheet (H-bonds)', 'Tertiary: 3D folding (disulfide, ionic, hydrophobic)', 'Quaternary: multiple polypeptide chains (haemoglobin)'] },
          { name: 'Functions', points: ['Enzymes: biological catalysts (amylase, lipase)', 'Structural: collagen, keratin, elastin', 'Transport: haemoglobin (O₂), albumin', 'Defence: antibodies (immunoglobulins)', 'Hormones: insulin, glucagon', 'Contractile: actin, myosin in muscles'] }
        ]},
        { topic: 'Cell Biology', subtopics: [
          { name: 'Cell Theory', points: ['All living organisms composed of cells', 'Cell is basic unit of life', 'All cells from pre-existing cells (Virchow)', 'Exception: viruses (acellular)'] },
          { name: 'Prokaryotic', points: ['No nucleus (nucleoid region)', 'No membrane-bound organelles', '70S ribosomes', 'Cell wall: peptidoglycan', 'Examples: bacteria, archaea'] },
          { name: 'Eukaryotic', points: ['True nucleus with envelope', 'Membrane-bound organelles', '80S ribosomes', 'Size: 10-100 μm', 'Examples: plants, animals, fungi'] },
          { name: 'Cell Division', points: ['Mitosis: 2 identical diploid cells', 'Meiosis: 4 haploid genetically different cells', 'Cell cycle: G₁, S, G₂, M phases', 'Cancer: uncontrolled division'] }
        ]}
      ]
    },
    'ecology': {
      centralConcept: 'Ecology',
      branches: [
        { topic: 'Ecosystem', subtopics: [
          { name: 'Biotic', points: ['Producers: autotrophs', 'Consumers: herbivores, carnivores', 'Decomposers: bacteria, fungi'] },
          { name: 'Abiotic', points: ['Light, temperature, water', 'Soil, atmosphere', 'Pond and forest ecosystems'] }
        ]},
        { topic: 'Food Relations', subtopics: [
          { name: 'Food Chain', points: ['Linear energy transfer', 'Trophic levels: 1°→2°→3°', 'Grazing and detritus chains'] },
          { name: 'Food Web', points: ['Interconnected chains', 'More stable', 'Complex relationships'] },
          { name: 'Pyramids', points: ['Numbers, biomass, energy', '10% energy transfer', 'Energy pyramid always upright'] }
        ]},
        { topic: 'Cycles', subtopics: [
          { name: 'Carbon', points: ['Photosynthesis', 'Respiration', 'Combustion', 'Ocean absorption'] },
          { name: 'Nitrogen', points: ['Fixation: N₂→NH₃', 'Nitrification', 'Assimilation', 'Denitrification'] }
        ]},
        { topic: 'Interactions', subtopics: [
          { name: 'Types', points: ['Competition', 'Predation', 'Mutualism', 'Parasitism'] },
          { name: 'Succession', points: ['Primary: bare rock', 'Secondary: soil exists', 'Climax community'] }
        ]}
      ]
    },
    'evolutionary-biology': {
      centralConcept: 'Evolutionary Biology',
      branches: [
        { topic: 'Origin of Life', subtopics: [
          { name: 'Oparin-Haldane', points: ['Reducing atmosphere', 'UV/lightning energy', 'Coacercels formed', 'RNA world'] },
          { name: 'Miller-Urey', points: ['1953 experiment', 'CH₄, NH₃, H₂, H₂O', 'Sparks = lightning', 'Amino acids formed'] }
        ]},
        { topic: 'Evidences', subtopics: [
          { name: 'Morphological', points: ['Homologous organs', 'Analogous organs', 'Vestigial organs'] },
          { name: 'Paleontological', points: ['Fossil record', 'Archaeopteryx', 'Radioactive dating'] },
          { name: 'Biochemical', points: ['DNA similarity', 'Universal code', 'Molecular clock'] }
        ]},
        { topic: 'Theories', subtopics: [
          { name: 'Lamarckism', points: ['Use/disuse', 'Acquired characters', 'Rejected'] },
          { name: 'Darwinism', points: ['Natural selection', 'Variation', 'Survival of fittest'] },
          { name: 'Neo-Darwinism', points: ['Modern synthesis', 'Mutations', 'Speciation'] }
        ]}
      ]
    },
    'floral-diversity': {
      centralConcept: 'Floral Diversity',
      branches: [
        { topic: 'Plant Groups', subtopics: [
          { name: 'Algae', points: ['Green, brown, red', 'Photosynthetic', 'Aquatic'] },
          { name: 'Fungi', points: ['Heterotrophic', 'Chitin wall', 'Spores'] },
          { name: 'Bryophytes', points: ['No vascular', 'Mosses', 'Water needed'] },
          { name: 'Pteridophytes', points: ['Vascular', 'Ferns', 'Spores'] },
          { name: 'Gymnosperms', points: ['Naked seeds', 'Cones', 'Pinus'] },
          { name: 'Angiosperms', points: ['Flowers', 'Fruits', 'Double fertilization'] }
        ]}
      ]
    },
if (require.main === module) main();
module.exports = { enhance, getTopics, buildMindmap };
