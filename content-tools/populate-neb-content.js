#!/usr/bin/env node
/**
 * NEB Content Enhancer
 * Fetches syllabus data and populates chemistry/biology concept files with real NEB XI content.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..', 'content', 'ravikishan', 'class-11-notes');

// NEB Chemistry Class 11 Syllabus Data (based on CDC Nepal)
const CHEMISTRY_SYLLABUS = {
  "atomic-structure": {
    title: "Atomic Structure",
    notes: [
      "Rutherford's model explained the atom's structure but failed to account for atomic stability.",
      "Bohr's model introduced quantized orbits and explained the hydrogen spectrum.",
      "de Broglie proposed that matter has wave-like properties.",
      "Heisenberg's uncertainty principle states that position and momentum cannot be simultaneously determined with absolute accuracy."
    ],
    examples: [
      "Calculation of de Broglie wavelength for an electron.",
      "Determining the energy levels in a hydrogen atom.",
      "Calculating uncertainty in position of a moving electron."
    ],
    formulas: [
      "E = hν",
      "λ = h/mv",
      "mvr = nh/2π",
      "Δx · Δp ≥ h/4π"
    ],
    keyPoints: [
      "α-particle scattering experiment proved the existence of a dense, positively charged nucleus.",
      "Electrons move in fixed energy orbits without radiating energy.",
      "Quantum numbers define the energy, shape, orientation, and spin of an orbital."
    ],
    summary: "The atomic structure evolved from Thomson's plum pudding model to Bohr's quantized model and finally to the quantum mechanical model, explaining spectral lines and stability.",
    mcqs: [
      { question: "Who proposed the dual nature of matter?", options: ["Planck", "de Broglie", "Bohr", "Heisenberg"], answer: "B" },
      { question: "The radius of the nth orbit of hydrogen atom is proportional to:", options: ["n", "n²", "n³", "n⁴"], answer: "B" }
    ],
    importantConcepts: ["Quantum numbers", "Heisenberg uncertainty principle", "Bohr's postulates"]
  },
  "stoichiometry": {
    title: "Stoichiometry",
    notes: [
      "Stoichiometry is based on the law of conservation of mass.",
      "Mole concept relates mass to the number of particles.",
      "Limiting reagent determines the amount of product formed.",
      "Concentration terms include molarity, molality, and normality."
    ],
    examples: [
      "Calculating the mass of product formed from a given mass of reactant.",
      "Finding the limiting reagent in a reaction.",
      "Calculating the molarity of a solution."
    ],
    formulas: [
      "n = m/M",
      "n = V/22.4 (at STP)",
      "Molarity (M) = n/V(L)",
      "Molality (m) = n/solvent(kg)"
    ],
    keyPoints: [
      "One mole contains 6.022 × 10²³ particles (Avogadro's number).",
      "STP: 0°C and 1 atm.",
      "The stoichiometric coefficients give the mole ratio of reactants and products."
    ],
    summary: "Stoichiometry deals with quantitative relationships between reactants and products in chemical reactions.",
    mcqs: [
      { question: "What is the molar mass of water?", options: ["18 g/mol", "32 g/mol", "44 g/mol", "16 g/mol"], answer: "A" },
      { question: "One mole of any gas occupies what volume at STP?", options: ["22.4 L", "2.24 L", "224 L", "2240 L"], answer: "A" }
    ],
    importantConcepts: ["Mole concept", "Limiting reagent", "Concentration terms"]
  },
  "chemical-equilibrium": {
    title: "Chemical Equilibrium",
    notes: [
      "In a reversible reaction, equilibrium is reached when forward and backward rates are equal.",
      "Le Chatelier's principle predicts the shift in equilibrium upon changing conditions.",
      "The equilibrium constant Kc/Kp relates concentrations/partial pressures of products and reactants.",
      "Acid-base equilibrium involves pH, pOH, and dissociation constants Ka/Kb."
    ],
    examples: [
      "Calculating Kc for a given reaction at equilibrium.",
      "Predicting the direction of reaction using Q vs K.",
      "Calculating pH of a weak acid solution."
    ],
    formulas: [
      "Kc = [Products]/[Reactants]",
      "Kp = Kc(RT)^Δn",
      "pH = -log[H⁺]",
      "Ka × Kb = Kw"
    ],
    keyPoints: [
      "At equilibrium, concentrations of reactants and products remain constant.",
      "Temperature affects K; concentration/pressure changes shift position but not K.",
      "For endothermic reactions, K increases with temperature."
    ],
    summary: "Chemical equilibrium describes the state where opposing reactions occur at equal rates, maintaining constant concentrations.",
    mcqs: [
      { question: "What happens to K when temperature increases for an exothermic reaction?", options: ["Increases", "Decreases", "Remains same", "Becomes zero"], answer: "B" },
      { question: "Which principle explains the effect of concentration on equilibrium?", options: ["Le Chatelier's", "Boyle's", "Charles's", "Avogadro's"], answer: "A" }
    ],
    importantConcepts: ["Le Chatelier's principle", "Equilibrium constant", "pH calculations"]
  },
  "thermodynamics": {
    title: "Thermodynamics",
    notes: [
      "First law: Energy cannot be created or destroyed, only transformed.",
      "Enthalpy (ΔH) measures heat change at constant pressure.",
      "Entropy (ΔS) measures disorder of a system.",
      "Gibbs free energy (ΔG) determines spontaneity: ΔG = ΔH - TΔS."
    ],
    examples: [
      "Calculating ΔH for a reaction using Hess's law.",
      "Determining spontaneity from ΔG.",
      "Calculating work done in gas expansion."
    ],
    formulas: [
      "ΔU = q + w",
      "ΔH = ΔU + PΔV",
      "ΔG = ΔH - TΔS",
      "q = mcΔT"
    ],
    keyPoints: [
      "Exothermic reactions have ΔH < 0.",
      "Spontaneous processes have ΔG < 0.",
      "Standard state: 298 K, 1 atm, 1 M concentration."
    ],
    summary: "Thermodynamics studies energy transformations and the direction of chemical processes.",
    mcqs: [
      { question: "For a spontaneous process, ΔG must be:", options: ["Positive", "Negative", "Zero", "Undefined"], answer: "B" },
      { question: "ΔH is positive for which type of reaction?", options: ["Exothermic", "Endothermic", "Isothermal", "Adiabatic"], answer: "B" }
    ],
    importantConcepts: ["First law of thermodynamics", "Enthalpy", "Gibbs free energy"]
  },
  "oxidation-and-reduction": {
    title: "Oxidation and Reduction",
    notes: [
      "Oxidation is loss of electrons; reduction is gain of electrons.",
      "Oxidation number helps identify redox reactions.",
      "Electrochemical cells convert chemical energy to electrical energy.",
      "Faraday's laws quantify electrolysis."
    ],
    examples: [
      "Balancing redox reactions using half-reaction method.",
      "Calculating cell potential using standard reduction potentials.",
      "Determining the mass deposited during electrolysis."
    ],
    formulas: [
      "E°cell = E°cathode - E°anode",
      "Q = It",
      "m = ZIt (Faraday's first law)"
    ],
    keyPoints: [
      "Oxidizing agent gets reduced; reducing agent gets oxidized.",
      "Standard hydrogen electrode (SHE) has E° = 0 V.",
      "More positive E° indicates stronger oxidizing agent."
    ],
    summary: "Redox reactions involve electron transfer and are fundamental to electrochemistry and energy production.",
    mcqs: [
      { question: "In the reaction Zn → Zn²⁺ + 2e⁻, zinc is:", options: ["Oxidized", "Reduced", "Neither", "Both"], answer: "A" },
      { question: "Which is a strong oxidizing agent?", options: ["Li", "Na", "F₂", "K"], answer: "C" }
    ],
    importantConcepts: ["Oxidation number", "Galvanic cells", "Faraday's laws"]
  },
  "states-of-matter": {
    title: "States of Matter",
    notes: [
      "Gas laws describe behavior of ideal gases.",
      "Kinetic molecular theory explains gas properties.",
      "Liquids exhibit surface tension, viscosity, and vapor pressure.",
      "Solids have crystalline and amorphous structures."
    ],
    examples: [
      "Using ideal gas law to calculate pressure or volume.",
      "Calculating root mean square speed of gas molecules.",
      "Determining vapor pressure lowering by Raoult's law."
    ],
    formulas: [
      "PV = nRT",
      "PV = (m/M)RT",
      "vrms = √(3RT/M)",
      "P = P° × χ(solvent)"
    ],
    keyPoints: [
      "Boyle's law: P ∝ 1/V (constant T).",
      "Charles's law: V ∝ T (constant P).",
      "Dalton's law: total pressure equals sum of partial pressures."
    ],
    summary: "Matter exists in three states: solid, liquid, and gas, each with distinct properties governed by intermolecular forces.",
    mcqs: [
      { question: "Which gas has the highest rms speed at same temperature?", options: ["O₂", "N₂", "H₂", "CO₂"], answer: "C" },
      { question: "Surface tension decreases with:", options: ["Increase in temperature", "Decrease in temperature", "Constant temperature", "None"], answer: "A" }
    ],
    importantConcepts: ["Ideal gas law", "Kinetic theory", "Intermolecular forces"]
  },
  "solutions": {
    title: "Solutions",
    notes: [
      "Solution is a homogeneous mixture of solute and solvent.",
      "Concentration can be expressed as molarity, molality, mole fraction, or percentage.",
      "Colligative properties depend on the number of solute particles.",
      "Raoult's law relates vapor pressure to mole fraction."
    ],
    examples: [
      "Calculating molality from mass of solute and solvent.",
      "Determining molecular mass using osmotic pressure.",
      "Calculating vapor pressure of solution."
    ],
    formulas: [
      "χ(solute) = n/(n + N)",
      "ΔP = P° × χ(solute)",
      "π = CRT",
      "ΔTb = Kb × m",
      "ΔTf = Kf × m"
    ],
    keyPoints: [
      "Molarity changes with temperature; molality does not.",
      "Colligative properties include relative lowering of vapor pressure, elevation of boiling point, depression of freezing point, and osmotic pressure.",
      "Strong electrolytes show abnormal colligative properties due to dissociation."
    ],
    summary: "Solutions are homogeneous mixtures whose properties depend on concentration and solute-solvent interactions.",
    mcqs: [
      { question: "Which property is colligative?", options: ["Viscosity", "Osmotic pressure", "Surface tension", "Density"], answer: "B" },
      { question: "Molality is defined as:", options: ["moles solute/kg solvent", "moles solute/L solution", "g solute/L solution", "moles solute/mL solvent"], answer: "A" }
    ],
    importantConcepts: ["Colligative properties", "Raoult's law", "Concentration terms"]
  }
};

// NEB Biology Class 11 Syllabus Data
const BIOLOGY_SYLLABUS = {
  "biomolecules": {
    title: "Biomolecules",
    notes: [
      "Carbohydrates provide energy and structural support.",
      "Proteins are polymers of amino acids with diverse functions.",
      "Lipids include fats, oils, and phospholipids.",
      "Nucleic acids (DNA and RNA) store and transmit genetic information."
    ],
    examples: [
      "Glucose as a primary energy source.",
      "Enzymes as biological catalysts.",
      "Cell membrane structure (phospholipid bilayer)."
    ],
    formulas: [
      "Carbohydrate: Cₙ(H₂O)ₙ",
      "Peptide bond: -CO-NH-"
    ],
    keyPoints: [
      "Carbohydrates are classified as mono-, di-, and polysaccharides.",
      "Proteins have four levels of structure: primary, secondary, tertiary, quaternary.",
      "DNA double helix model was proposed by Watson and Crick."
    ],
    summary: "Biomolecules are essential organic compounds that form the basis of life.",
    mcqs: [
      { question: "Which carbohydrate is used for energy storage in animals?", options: ["Starch", "Glycogen", "Cellulose", "Chitin"], answer: "B" },
      { question: "Proteins are made up of:", options: ["Fatty acids", "Amino acids", "Monosaccharides", "Nucleotides"], answer: "B" }
    ],
    importantConcepts: ["Macromolecules", "Peptide bond", "Enzyme structure"]
  },
  "cell-structure": {
    title: "Cell Structure",
    notes: [
      "Cell is the basic structural and functional unit of life.",
      "Prokaryotic cells lack a true nucleus.",
      "Eukaryotic cells have membrane-bound organelles.",
      "Plant cells have cell walls and chloroplasts; animal cells do not."
    ],
    examples: [
      "Mitochondria as the powerhouse of the cell.",
      "Ribosomes synthesizing proteins.",
      "Nucleus controlling cell activities."
    ],
    formulas: [],
    keyPoints: [
      "Fluid mosaic model describes cell membrane structure.",
      "Organelles perform specialized functions.",
      "Cell wall provides rigidity and protection."
    ],
    summary: "Cells contain organelles that work together to maintain life processes.",
    mcqs: [
      { question: "Which organelle is known as the powerhouse of the cell?", options: ["Ribosome", "Golgi body", "Mitochondria", "Lysosome"], answer: "C" },
      { question: "Cell wall is made of:", options: ["Protein", "Lipid", "Cellulose", "Chitin"], answer: "C" }
    ],
    importantConcepts: ["Fluid mosaic model", "Organelles", "Prokaryotic vs eukaryotic"]
  },
  "cell-division": {
    title: "Cell Division",
    notes: [
      "Mitosis produces two identical diploid daughter cells.",
      "Meiosis produces four genetically different haploid gametes.",
      "The cell cycle includes interphase (G₁, S, G₂) and M phase.",
      "Cancer results from uncontrolled cell division."
    ],
    examples: [
      "Mitosis in root tip cells.",
      "Meiosis in testis/ovary producing gametes.",
      "Cancer cell proliferation."
    ],
    formulas: [],
    keyPoints: [
      "Mitosis phases: prophase, metaphase, anaphase, telophase.",
      "Crossing over occurs in meiosis I prophase.",
      "Checkpoint controls ensure proper cell division."
    ],
    summary: "Cell division is essential for growth, repair, and reproduction.",
    mcqs: [
      { question: "Crossing over occurs during:", options: ["Prophase I", "Metaphase I", "Anaphase II", "Telophase"], answer: "A" },
      { question: "How many chromosomes does a human gamete have?", options: ["23", "46", "92", "44"], answer: "A" }
    ],
    importantConcepts: ["Mitosis", "Meiosis", "Cell cycle regulation"]
  },
  "genetics": {
    title: "Genetics",
    notes: [
      "Mendel's laws explain inheritance patterns.",
      "Genotype is genetic makeup; phenotype is physical expression.",
      "Punnett square predicts offspring genotypes.",
      "Linkage and crossing over affect inheritance."
    ],
    examples: [
      "Monohybrid cross: 3:1 phenotypic ratio.",
      "Dihybrid cross: 9:3:3:1 ratio.",
      "Sex-linked inheritance (color blindness)."
    ],
    formulas: [],
    keyPoints: [
      "Law of segregation: alleles separate during gamete formation.",
      "Law of independent assortment: genes assort independently.",
      "Incomplete dominance: blending of traits."
    ],
    summary: "Genetics studies how traits are passed from parents to offspring.",
    mcqs: [
      { question: "A heterozygous tall plant crossed with a homozygous short plant gives what ratio?", options: ["1:1", "3:1", "1:2:1", "All tall"], answer: "A" },
      { question: "Color blindness is inherited as:", options: [" Autosomal dominant", "X-linked recessive", "Y-linked", "Mitochondrial"], answer: "B" }
    ],
    importantConcepts: ["Mendel's laws", "Punnett square", "Linkage"]
  },
  "ecology": {
    title: "Ecology",
    notes: [
      "Ecosystem includes biotic and abiotic components.",
      "Food chains show energy transfer between trophic levels.",
      "Biogeochemical cycles recycle nutrients.",
      "Biodiversity refers to variety of life forms."
    ],
    examples: [
      "Grass → Grasshopper → Frog → Snake → Hawk.",
      "Carbon cycle: photosynthesis and respiration.",
      "Nitrogen cycle: fixation, nitrification, denitrification."
    ],
    formulas: [],
    keyPoints: [
      "Energy flow is unidirectional.",
      "10% energy transfer rule between trophic levels.",
      "Nepal has diverse ecosystems from subtropical to alpine."
    ],
    summary: "Ecology studies interactions between organisms and their environment.",
    mcqs: [
      { question: "How much energy is transferred between trophic levels?", options: ["10%", "50%", "90%", "1%"], answer: "A" },
      { question: "Which is a biotic component?", options: ["Sunlight", "Water", "Plants", "Soil"], answer: "C" }
    ],
    importantConcepts: ["Food web", "Energy pyramid", "Biogeochemical cycles"]
  },
  "evolution": {
    title: "Evolution",
    notes: [
      "Darwin proposed natural selection as mechanism of evolution.",
      "Fossil records provide evidence of evolution.",
      "Homologous structures indicate common ancestry.",
      "Human evolution involved several hominid species."
    ],
    examples: [
      "Finch beak adaptation on Galapagos islands.",
      "Archaeopteryx: link between reptiles and birds.",
      "Homo habilis → Homo erectus → Homo sapiens."
    ],
    formulas: [],
    keyPoints: [
      "Variation is essential for natural selection.",
      "Survival of the fittest determines adaptation.",
      "Genetic drift and gene flow also cause evolution."
    ],
    summary: "Evolution explains the diversity and unity of life through descent with modification.",
    mcqs: [
      { question: "Who proposed natural selection?", options: ["Lamarck", "Darwin", "Mendel", "Pasteur"], answer: "B" },
      { question: "Homologous organs indicate:", options: ["Convergent evolution", "Divergent evolution", "Parallel evolution", "No relationship"], answer: "B" }
    ],
    importantConcepts: ["Natural selection", "Evidence of evolution", "Human evolution"]
  }
};

function populateContent(unitSlug, subject) {
  const conceptDir = path.join(ROOT, subject, unitSlug, 'concepts');
  if (!fs.existsSync(conceptDir)) return;
  
  const syllabus = subject === 'chemistry' ? CHEMISTRY_SYLLABUS : BIOLOGY_SYLLABUS;
  const data = syllabus[unitSlug];
  
  if (!data) return;
  
  const files = fs.readdirSync(conceptDir).filter(f => f.endsWith('.json'));
  
  files.forEach(file => {
    const filePath = path.join(conceptDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const obj = JSON.parse(content);
      
      // Populate fields if empty
      if (!obj.notes || obj.notes.length === 0 || obj.notes[0].includes('Detailed analysis')) {
        obj.notes = data.notes.slice();
      }
      
      if (!obj.examples || obj.examples.length === 0) {
        obj.examples = data.examples.slice();
      }
      
      if (!obj.formulas || obj.formulas.length === 0 || obj.formulas[0].includes('relevant formula')) {
        obj.formulas = data.formulas ? data.formulas.slice() : [];
      }
      
      if (!obj.keyPoints || obj.keyPoints.length === 0) {
        obj.keyPoints = data.keyPoints.slice();
      }
      
      if (!obj.summary || obj.summary.includes('Summary of')) {
        obj.summary = data.summary;
      }
      
      if (!obj.mcqs || obj.mcqs.length === 0 || obj.mcqs[0].question.includes('Question about')) {
        obj.mcqs = data.mcqs ? JSON.parse(JSON.stringify(data.mcqs)) : [];
      }
      
      if (!obj.importantConcepts || obj.importantConcepts.length === 0) {
        obj.importantConcepts = data.importantConcepts ? data.importantConcepts.slice() : [];
      }
      
      fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf8');
    } catch(e) {
      console.error(`Error processing ${file}: ${e.message}`);
    }
  });
  
  console.log(`✓ ${subject}/${unitSlug}: ${files.length} files updated`);
}

function main() {
  // Chemistry units
  const chemUnits = Object.keys(CHEMISTRY_SYLLABUS);
  chemUnits.forEach(unit => populateContent(unit, 'chemistry'));
  
  // Biology units
  const bioUnits = Object.keys(BIOLOGY_SYLLABUS);
  bioUnits.forEach(unit => populateContent(unit, 'biology'));
  
  console.log('\nDone! Content populated for NEB XI Chemistry and Biology.');
}

main();
