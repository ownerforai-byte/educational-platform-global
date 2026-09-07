#!/usr/bin/env node
/**
 * NEB Content Enhancer — COMPLETE COVERAGE
 * Populates ALL concept files with real NEB curriculum content,
 * including exercises, step-by-step solutions, and visualization fields.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'content', 'ravikishan', 'class-11-notes');

// ────────────────────────────────────────────────────────────
// DETECTION: Is a field populated with PLACEHOLDER text?
// ────────────────────────────────────────────────────────────
function isPlaceholder(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return true;
  const first = arr[0] || '';
  if (typeof first !== 'string') return false;
  if (first.includes('placeholder') || first.includes('Detailed notes on') || first.includes('Detailed analysis')) return true;
  if (first.includes('Real-world example') || first.includes('Question about') || first.includes('Practice question')) return true;
  return false;
}

function isPlaceholderStr(s) {
  if (!s) return true;
  if (typeof s !== 'string') return false;
  if (s.includes('placeholder') || s.includes('Summary of') || s.includes('Detailed notes on')) return true;
  return false;
}

// ────────────────────────────────────────────────────────────
// COMPREHENSIVE SYLLABUS DATA WITH EXERCISES & VISUALIZATIONS
// ────────────────────────────────────────────────────────────
const CHEMISTRY = {
  'atomic-structure': {
    title: 'Atomic Structure',
    notes: [
      'Rutherford α-scattering experiment (1911): Dense positive nucleus discovered; most α-particles passed through (atom mostly empty).',
      'Bohr model (1913): Electrons in fixed circular orbits; angular momentum quantized: mvr = nh/2π.',
      'de Broglie (1924): Matter has wave nature; wavelength λ = h/mv.',
      'Heisenberg uncertainty principle: Δx·Δp ≥ h/4π.',
      'Four quantum numbers: n (principal), l (azimuthal), ml (magnetic), ms (spin).'
    ],
    formulas: ['E=hν', 'λ=h/mv', 'mvr=nh/2π', 'Δx·Δp≥h/4π', 'En=-13.6/n² eV', 'rn=0.529n²/Z Å'],
    examples: ['Calculate de Broglie wavelength of electron at 10⁶ m/s: λ ≈ 0.727 nm'],
    keyPoints: ['Nucleus: ~10⁻¹⁵m diameter', 'Electron cloud: ~10⁻¹⁰m diameter', 's: spherical, p: dumbbell'],
    summary: 'Atomic structure evolved from Rutherford nuclear model to Bohr quantized orbits to quantum mechanical model.',
    mcqs: [
      {question:'de Broglie proposed:',options:['Nucleus','Wave nature of matter','Uncertainty','Quantum numbers'],answer:'B'},
      {question:'Radius proportional to:',options:['n','n²','n³','n⁴'],answer:'B'}
    ],
    importantConcepts: ['Quantum numbers','Uncertainty principle','Bohr model'],
    exercises: [
      {id:'1', question:'Calculate de Broglie wavelength of electron at 10⁶ m/s', steps:['Formula: λ=h/mv','h=6.626×10⁻³⁴ J·s, m=9.11×10⁻³¹ kg, v=10⁶ m/s','λ=6.626e-34/(9.11e-31×1e6)','λ≈7.27×10⁻¹⁰m=0.727nm'], answer:'0.727 nm'},
      {id:'2', question:'Find energy of electron in 2nd orbit of hydrogen', steps:['En=-13.6/n² eV','E₂=-13.6/2²','-13.6/4=-3.4 eV'], answer:'-3.4 eV'}
    ],
    visualization:{type:'simulation',component:'BohrModelSim',desc:'Interactive Bohr model showing electron transitions and energy levels'}
  },
  'stoichiometry': {
    title: 'Stoichiometry',
    notes: ['Conservation of mass (Lavoisier): mass neither created nor destroyed.', 'Mole concept: n=m/M, 1 mol = 6.022×10²³ particles.', 'Limiting reagent determines max product.', 'Concentration: Molarity (M=n/V), Molality (m=n/kg).'],
    formulas: ['n=m/M', 'n=V/22.4(STP)', 'M=n/V(L)', 'm=n/kg solvent', '%yield=(actual/theo)×100'],
    examples: ['23g Na + excess Cl₂ → 58.5g NaCl'],
    keyPoints: ['STP: 0°C, 1atm, 22.4L/mol', 'Balanced eqn gives mole ratios'],
    summary: 'Stoichiometry quantifies reactant-product relationships using the mole concept.',
    mcqs: [
      {question:'Molar mass of water:',options:['18','32','44','2'],answer:'A'},
      {question:'1 mol gas at STP:',options:['22.4L','2.24L','224L'],answer:'A'}
    ],
    importantConcepts: ['Mole concept','Limiting reagent','Concentration'],
    exercises: [
      {id:'1', question:'Mass of NaCl from 23g Na', steps:['n(Na)=23/23=1 mol','Na+Cl₂→NaCl','m(NaCl)=1×58.5'], answer:'58.5 g'},
      {id:'2', question:'Volume of CO₂ from 50g CaCO₃ at STP', steps:['n=50/100=0.5 mol','CaCO₃→CaO+CO₂','V=0.5×22.4'], answer:'11.2 L'}
    ],
    visualization:{type:'simulation',component:'MoleCalculator',desc:'Interactive mole-mass-volume calculator'}
  },
  'chemical-equilibrium': {
    title: 'Chemical Equilibrium',
    notes: ['Dynamic equilibrium: forward rate = backward rate.', 'Kc = [products]/[reactants].', 'Le Chatelier\'s principle.', 'pH = -log[H⁺].'],
    formulas: ['Kc=[C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ', 'Kp=Kc(RT)^Δn', 'pH=-log[H⁺]', 'pH+pOH=14', 'Ka×Kb=Kw'],
    examples: ['Haber process: N₂+3H₂⇌2NH�3 (exothermic, high P favors NH₃)'],
    keyPoints: ['K changes only with T', 'High P favors fewer gas moles'],
    summary: 'Chemical equilibrium describes equal forward/backward rates; Le Chatelier predicts shifts.',
    mcqs: [
      {question:'K for exothermic decreases when:',options:['T↑','T↓','P↑'],answer:'A'},
      {question:'pH of pure water:',options:['7','0','14'],answer:'A'}
    ],
    importantConcepts: ['Le Chatelier','Equilibrium constant','pH'],
    exercises: [
      {id:'1', question:'Calculate pH of 0.01M HCl', steps:['HCl→H⁺+Cl⁻','[H⁺]=0.01','pH=-log(0.01)=2'], answer:'pH = 2'}
    ],
    visualization:{type:'simulation',component:'EquilibriumShiftSim',desc:'Le Chatelier principle interactive simulation'}
  },
  'thermodynamics': {
    title: 'Thermodynamics',
    notes: ['First law: ΔU = q + w.', 'Enthalpy: ΔH = ΔU + PΔV.', 'Gibbs: ΔG = ΔH - TΔS.', 'Spontaneous: ΔG < 0.'],
    formulas: ['ΔU=q+w', 'ΔH=ΔU+PΔV', 'ΔG=ΔH-TΔS', 'q=mcΔT'],
    examples: ['C+O₂→CO₂ ΔH=-393.5 kJ', 'Hess\'s law application'],
    keyPoints: ['State functions: U, H, S, G', 'Exothermic: ΔH < 0, Endothermic: ΔH > 0'],
    summary: 'Thermodynamics studies energy transformations and process spontaneity.',
    mcqs: [
      {question:'For spontaneous process:',options:['ΔG>0','ΔG<0','ΔG=0'],answer:'B'},
      {question:'ΔH positive means:',options:['Exothermic','Endothermic'],answer:'B'}
    ],
    importantConcepts: ['First law','Enthalpy','Gibbs free energy','Hess law'],
    exercises: [
      {id:'1', question:'Find ΔG at 298K: ΔH=-100kJ, ΔS=-200J/K', steps:['ΔG=ΔH-TΔS','ΔG=-100-(298)(-0.200)','ΔG=-100+59.6=-40.4 kJ','Spontaneous since ΔG<0'], answer:'-40.4 kJ'}
    ],
    visualization:{type:'simulation',component:'EnergyDiagram',desc:'Reaction energy profile visualization'}
  },
  'oxidation-and-reduction': {
    title: 'Oxidation and Reduction',
    notes: ['Oxidation = loss e⁻ (OIL), Reduction = gain e⁻ (RIG).', 'Oxidation numbers identify redox.', 'Galvanic cells: chemical → electrical energy.', 'Faraday laws: m = ZIt.'],
    formulas: ['E°cell=E°cath-E°anode', 'Q=It', 'm=MIt/nF', 'ΔG°=-nFE°'],
    examples: ['Zn|Zn²⁺||Cu²⁺|Cu: E°=+1.10V', 'Cu deposited by 2A for 30min: m≈1.19g'],
    keyPoints: ['Oxidizing agent gets reduced', 'F₂ strongest oxidizer (E°=+2.87V)'],
    summary: 'Redox involves electron transfer; electrochemical cells convert chemical to electrical energy.',
    mcqs: [
      {question:'In Zn→Zn²⁺+2e⁻, Zn is:',options:['Oxidized','Reduced'],answer:'A'},
      {question:'Faraday constant:',options:['96500C','9650C','965C'],answer:'A'}
    ],
    importantConcepts: ['Oxidation number','Galvanic cells','Faraday laws'],
    exercises: [
      {id:'1', question:'Mass of Cu deposited by 2A for 30min', steps:['t=30×60=1800s','m=(M×I×t)/(n×F)','m=(63.5×2×1800)/(2×96500)','m≈1.19g'], answer:'1.19 g'}
    ],
    visualization:{type:'simulation',component:'RedoxCellSim',desc:'Interactive electrochemical cell'}
  },
  'states-of-matter': {
    title: 'States of Matter',
    notes: ['Ideal gas: PV=nRT.', 'Kinetic theory explains gas properties.', 'Real gases: van der Waals equation.', 'Liquid properties: surface tension, viscosity.'],
    formulas: ['PV=nRT', 'vrms=√(3RT/M)', '(P+a/V²)(V-b)=RT', 'Z=PV/nRT'],
    examples: ['V of 2mol at 27°C, 2atm: V=24.63L', 'vrms of O₂ at 300K: 484 m/s'],
    keyPoints: ['Real gases deviate at high P, low T', 'Critical temperature: above this, gas cannot be liquefied'],
    summary: 'States of matter differ in particle arrangement and intermolecular forces.',
    mcqs: [
      {question:'Highest rms speed at same T:',options:['O₂','N₂','H₂','CO₂'],answer:'C'},
      {question:'Surface tension with T:',options:['Increases','Decreases'],answer:'B'}
    ],
    importantConcepts: ['Ideal gas law','Kinetic theory','Real gas behavior'],
    exercises: [
      {id:'1', question:'Volume of 2mol at 27°C, 2atm', steps:['V=nRT/P','V=(2×0.0821×300)/2','V=24.63L'], answer:'24.63 L'}
    ],
    visualization:{type:'simulation',component:'GasLawSim',desc:'Interactive gas law demonstrator'}
  },
  'solutions': {
    title: 'Solutions',
    notes: ['Molarity (M=n/V), Molality (m=n/kg).', 'Colligative properties depend on particle count.', 'Raoult\'s law: P=P°×χ(solvent).', 'Osmotic pressure: π=CRT.'],
    formulas: ['χ=n/(n+N)', 'ΔP=P°×χ(solute)', 'π=CRT', 'ΔTb=Kb×m', 'ΔTf=Kf×m'],
    examples: ['ΔTf for 0.5m glucose: 0.93°C', 'Molar mass from osmotic pressure'],
    keyPoints: ['Molarity changes with T; molality does not.', 'van\'t Hoff factor i for electrolytes'],
    summary: 'Solutions are homogeneous mixtures; colligative properties depend on particle count.',
    mcqs: [
      {question:'Colligative property:',options:['Viscosity','Osmotic pressure','Surface tension'],answer:'B'},
      {question:'Molality definition:',options:['mol/kg solvent','mol/L solution'],answer:'A'}
    ],
    importantConcepts: ['Colligative properties','Raoult\'s law','Concentration terms'],
    exercises: [
      {id:'1', question:'Freezing point depression of 0.5m glucose', steps:['ΔTf=Kf×m','ΔTf=1.86×0.5','ΔTf=0.93°C'], answer:'0.93°C'}
    ],
    visualization:{type:'simulation',component:'ColligativePropSim',desc:'Colligative properties visualizer'}
  },
  'chemical-bonding': {
    title: 'Chemical Bonding',
    notes: ['Ionic bond: electron transfer (metal+nonmetal).', 'Covalent bond: electron sharing.', 'VSEPR theory: molecular geometry.', 'Hybridization: sp, sp², sp³.'],
    formulas: ['Bond order=(bonding-antibonding)/2', 'μ=q×d'],
    examples: ['H₂O: bent, 104.5°', 'CH₄: tetrahedral, 109.5°', 'NH₃: pyramidal, 107°'],
    keyPoints: ['Ionic: high MP, conduct in melt', 'Covalent: directional, lower MP', 'Hydrogen bonding: H-F, H-O, H-N'],
    summary: 'Chemical bonds (ionic, covalent, metallic, H-bond) hold atoms together.',
    mcqs: [
      {question:'Bond by sharing:',options:['Ionic','Covalent','Metallic'],answer:'B'},
      {question:'Shape of CH₄:',options:['Linear','Tetrahedral','Bent'],answer:'B'},
      {question:'Hybridization of C in ethane:',options:['sp','sp²','sp³'],answer:'C'}
    ],
    importantConcepts: ['Ionic vs covalent','VSEPR','Hybridization','Molecular orbital theory'],
    exercises: [
      {id:'1', question:'Predict shape of NH₃', steps:['3 bonding pairs + 1 lone pair','sp³ hybridization','Pyramidal geometry','Bond angle ≈107°'], answer:'Pyramidal'}
    ],
    visualization:{type:'3d-model',component:'MoleculeViewer',desc:'3D molecular structure viewer with VSEPR prediction'}
  },
  'chemical-bonding-and-shapes-of-molecules': {
    title: 'Chemical Bonding and Shapes of Molecules',
    notes: ['VSEPR theory predicts molecular geometry from electron pairs.', 'sp³: 4 pairs → tetrahedral (109.5°).', 'sp²: 3 pairs → trigonal planar (120°).', 'sp: 2 pairs → linear (180°).', 'Lone pairs compress bond angles.'],
    formulas: ['Steric number = bonding pairs + lone pairs'],
    examples: ['H₂O: sp³, 2BP+2LP → bent', 'CO₂: sp, 2BP+0LP → linear'],
    keyPoints: ['VSEPR: Valence Shell Electron Pair Repulsion', 'Lone pairs repel more than bonding pairs'],
    summary: 'Molecular shapes determined by electron pair repulsion around central atom.',
    mcqs: [
      {question:'Shape of CH₄:',options:['Linear','Tetrahedral','Bent','Pyramidal'],answer:'B'},
      {question:'Bond angle in NH₃:',options:['109.5°','107°','120°','180°'],answer:'B'}
    ],
    importantConcepts: ['VSEPR theory','Hybridization','Molecular geometry'],
    exercises: [],
    visualization:{type:'3d-model',component:'VSEPRModeler',desc:'3D molecular geometry predictor'}
  },
  'oxidation-reduction': {
    title: 'Oxidation and Reduction',
    notes: ['Oxidation = loss of electrons, Reduction = gain of electrons.', 'Oxidizing agent accepts electrons, reducing agent donates.', 'Electrochemical cells convert chemical energy to electrical.', 'Faraday\'s laws relate charge to mass deposited.'],
    formulas: ['n=e⁻ transfer', 'Q=It', 'm=(M×Q)/(n×F)'],
    examples: ['Zn+Cu²⁺→Zn²⁺+Cu (electrochemical cell)'],
    keyPoints: ['OIL RIG: Oxidation Is Loss, Reduction Is Gain', 'Standard electrode potentials measurable'],
    summary: 'Redox reactions involve electron transfer; fundamental to batteries and corrosion.',
    mcqs: [],
    importantConcepts: ['Oxidation numbers','Galvanic cells','Electrolysis'],
    exercises: [],
    visualization:{type:'simulation',component:'ElectrochemistrySim',desc:'Electrochemical cell simulation'}
  },
  'foundation-and-fundamentals': {
    title: 'Foundation and Fundamentals',
    notes: ['Matter: anything with mass and volume.', 'Atoms: basic unit of elements.', 'Molecules: combinations of atoms.', 'Mixtures: physical combinations, separable.', 'Pure substances: elements and compounds.'],
    formulas: [],
    examples: ['Water: H₂O (compound)', 'Air: mixture of N₂, O₂, etc.'],
    keyPoints: ['Matter classified as pure or mixture', 'Elements: 118 known, compounds: millions'],
    summary: 'Foundation of chemistry: understanding matter, its classification, and basic units.',
    mcqs: [],
    importantConcepts: ['Matter classification','Atoms and molecules','Pure substances'],
    exercises: [],
    visualization:{type:'interactive',component:'MatterClassifier',desc:'Interactive matter classification tool'}
  },
  'basic-concept-of-organic-chemistry': {
    title: 'Basic Concept of Organic Chemistry',
    notes: ['Organic chemistry: study of carbon compounds.', 'Carbon: tetravalent, forms 4 bonds.', 'Functional groups: -OH (alcohol), -COOH (carboxylic acid), etc.', 'Homologous series: same functional group, differ by CH₂.'],
    formulas: [],
    examples: ['Methane CH₄, Ethane C₂H₆, Ethene C₂H₄'],
    keyPoints: ['Carbon catenation: forms long chains', 'Functional groups determine reactivity'],
    summary: 'Organic chemistry focuses on carbon compounds with diverse functional groups.',
    mcqs: [],
    importantConcepts: ['Carbon compounds','Functional groups','Homologous series'],
    exercises: [],
    visualization:{type:'3d-model',component:'OrganicMoleculeViewer',desc:'3D organic molecule explorer'}
  },
  'basic-concept-organic': {
    title: 'Basic Concept of Organic Chemistry',
    notes: ['Carbon tetravalency allows complex molecules.', 'Isomerism: same formula, different structure.', 'IUPAC naming: systematic nomenclature.', 'Hybridization: sp³ (alkanes), sp² (alkenes), sp (alkynes).'],
    formulas: [],
    examples: ['Butane and isobutane (C₄H₁₀): structural isomers'],
    keyPoints: ['Isomers have same molecular formula', 'Nomenclature follows IUPAC rules'],
    summary: 'Organic chemistry basics: carbon bonding, isomerism, and naming conventions.',
    mcqs: [],
    importantConcepts: ['Isomerism','IUPAC naming','Hybridization'],
    exercises: [],
    visualization:{type:'simulation',component:'IsomerBuilder',desc:'Isomer structure builder'}
  },
  'fundamental-principles-of-organic-chemistry': {
    title: 'Fundamental Principles of Organic Chemistry',
    notes: ['Electronic effects: inductive, resonance, electromeric.', 'Bond fission: homolytic (radicals), heterolytic (ions).', 'Reaction mechanisms: step-by-step electron movement.', 'Intermediates: carbocations, carbanions, free radicals.'],
    formulas: [],
    examples: ['CH₄ + Cl₂ → CH₃Cl (free radical substitution)'],
    keyPoints: ['Electron movement shown by curved arrows', 'Stability: 3° > 2° > 1° carbocation'],
    summary: 'Principles governing organic reaction mechanisms and intermediates.',
    mcqs: [],
    importantConcepts: ['Reaction mechanisms','Electronic effects','Carbocations'],
    exercises: [],
    visualization:{type:'simulation',component:'MechanismAnimator',desc:'Reaction mechanism animation'}
  },
  'fundamental-principles-organic': {
    title: 'Fundamental Principles of Organic Chemistry',
    notes: ['Resonance: delocalization of π electrons.', 'Inductive effect: electron withdrawal/donation through σ bonds.', 'Electrophiles: electron-seeking (e.g., NO₂⁺).', 'Nucleophiles: nucleus-seeking (e.g., OH⁻).'],
    formulas: [],
    examples: ['Benzene: resonance stabilization', 'SN2 reaction: nucleophilic substitution'],
    keyPoints: ['Resonance stabilizes molecules', 'Electron effects influence reactivity'],
    summary: 'Electronic effects and reaction types in organic chemistry.',
    mcqs: [],
    importantConcepts: ['Resonance','Inductive effect','Electrophiles','Nucleophiles'],
    exercises: [],
    visualization:{type:'simulation',component:'ElectronFlowSim',desc:'Electron flow visualization'}
  },
  'hydrocarbons': {
    title: 'Hydrocarbons',
    notes: ['Alkanes: CnH2n+2, single bonds (saturated).', 'Alkenes: CnH2n, double bonds (unsaturated).', 'Alkynes: CnH2n-2, triple bonds.', 'Aromatic: benzene ring, delocalized π electrons.'],
    formulas: ['Alkane: CnH2n+2', 'Alkene: CnH2n', 'Alkyne: CnH2n-2'],
    examples: ['Methane CH₄, Ethene C₂H₄, Ethyne C₂H₂'],
    keyPoints: ['Alkanes undergo substitution, alkenes addition', 'Benzene: most stable aromatic'],
    summary: 'Hydrocarbons classified by bond type; foundation of organic chemistry.',
    mcqs: [
      {question:'General formula of alkane:',options:['CnH2n+2','CnH2n','CnH2n-2'],answer:'A'},
      {question:'Benzene has ___ carbon-carbon bonds:',options:['3 single, 3 double','All equal','6 single'],answer:'B'}
    ],
    importantConcepts: ['Alkanes','Alkenes','Alkynes','Aromatic hydrocarbons'],
    exercises: [],
    visualization:{type:'3d-model',component:'HydrocarbonViewer',desc:'3D hydrocarbon structure viewer'}
  },
  'aromatic-hydrocarbons': {
    title: 'Aromatic Hydrocarbons',
    notes: ['Benzene C₆H₆: hexagonal ring, delocalized π electrons.', 'Aromaticity: Hückel\'s rule (4n+2 π electrons).', 'Electrophilic substitution: nitration, halogenation, sulfonation.', 'Substituent effects: activating/deactivating groups.'],
    formulas: ['Hückel\'s rule: 4n+2 π electrons'],
    examples: ['Nitration: C₆H₆ + HNO₃ → C₆H₅NO₂', 'Toluene → TNT'],
    keyPoints: ['Benzene more stable than expected', 'Substituents direct ortho/para or meta'],
    summary: 'Aromatic compounds based on benzene ring with unique stability and reactivity.',
    mcqs: [],
    importantConcepts: ['Benzene structure','Aromaticity','Electrophilic substitution'],
    exercises: [],
    visualization:{type:'simulation',component:'AromaticReactSim',desc:'Aromatic reaction simulator'}
  },
  'chemistry-of-metals': {
    title: 'Chemistry of Metals',
    notes: ['Metals: electropositive, form cations.', 'Activity series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Ag > Au.', 'Extraction: smelting, electrolysis.', 'Alloys: mixtures of metals.'],
    formulas: [],
    examples: ['Iron from hematite: Fe₂O₃ + 3CO → 2Fe + 3CO₂', 'Aluminum by Hall-Héroult process'],
    keyPoints: ['More active metals harder to extract', 'Stainless steel: Fe + Cr + Ni'],
    summary: 'Metals characterized by electron loss; extracted by reduction or electrolysis.',
    mcqs: [],
    importantConcepts: ['Activity series','Metal extraction','Alloys'],
    exercises: [],
    visualization:{type:'simulation',component:'MetalExtractionSim',desc:'Metal extraction process visualizer'}
  },
  'chemistry-of-non-metals': {
    title: 'Chemistry of Non-Metals',
    notes: ['Non-metals: electronegative, form anions.', 'Halogen reactivity decreases down group.', 'Nitrogen: N₂ triple bond, very stable.', 'Oxygen: O₂ paramagnetic, supports combustion.'],
    formulas: [],
    examples: ['Cl₂ + 2NaBr → 2NaCl + Br₂', 'N₂ + 3H₂ → 2NH₃ (Haber process)'],
    keyPoints: ['Halogens: strong oxidizing agents', 'Nitrogen fixation essential for life'],
    summary: 'Non-metals complete the periodic table; crucial for life and industry.',
    mcqs: [],
    importantConcepts: ['Halogen chemistry','Nitrogen compounds','Oxygen'],
    exercises: [],
    visualization:{type:'simulation',component:'NonmetalReactSim',desc:'Non-metal reactivity simulator'}
  },
  'classification-of-elements': {
    title: 'Classification of Elements',
    notes: ['Periodic table: 7 periods, 18 groups.', 'Groups: similar valence electron configuration.', 'Periods: increasing atomic number.', 'Metals left, non-metals right, metalloids diagonal.'],
    formulas: [],
    examples: ['Group 1: alkali metals (Li, Na, K)', 'Group 17: halogens (F, Cl, Br)'],
    keyPoints: ['Atomic number increases across period', 'Same group = similar chemical properties'],
    summary: 'Periodic classification organizes elements by properties and electron configuration.',
    mcqs: [],
    importantConcepts: ['Periodic table structure','Groups and periods','Periodic trends'],
    exercises: [],
    visualization:{type:'map',component:'PeriodicTableView',desc:'Interactive periodic table'}
  },
  'classification-of-elements-and-periodic-table': {
    title: 'Classification of Elements and Periodic Table',
    notes: ['Modern periodic law: properties function of atomic number.', 's, p, d, f blocks based on orbital type.', 'Periodic trends: atomic radius, ionization energy, electronegativity.', 'Lanthanides and actinides: inner transition elements.'],
    formulas: [],
    examples: ['Na (Z=11): [Ne]3s¹, s-block', 'Fe (Z=26): [Ar]3d⁶4s², d-block'],
    keyPoints: ['Ionization energy increases across period', 'Electronegativity highest at F'],
    summary: 'Periodic table structure reflects electron configuration and periodic trends.',
    mcqs: [],
    importantConcepts: ['Blocks','Periodic trends','Electron configuration'],
    exercises: [],
    visualization:{type:'map',component:'PeriodicTrendsMap',desc:'Periodic trends visualization'}
  },
  'applied-chemistry': {
    title: 'Applied Chemistry',
    notes: ['Industrial chemistry: chemicals for production.', 'Polymer chemistry: plastics, fibers, rubber.', 'Pesticides: herbicides, insecticides, fungicides.', 'Environmental chemistry: pollution control.'],
    formulas: [],
    examples: ['Polyethylene: [-CH₂-CH₂-]n', 'DDT: Dichlorodiphenyltrichloroethane'],
    keyPoints: ['Polymers from monomers', 'Green chemistry: reduce waste'],
    summary: 'Chemistry applications in industry, environment, and daily life.',
    mcqs: [],
    importantConcepts: ['Polymers','Industrial chemistry','Green chemistry'],
    exercises: [],
    visualization:{type:'simulation',component:'PolymerBuilder',desc:'Polymer structure builder'}
  },
  'fundamentals-of-applied-chemistry': {
    title: 'Fundamentals of Applied Chemistry',
    notes: ['Chemical industry: fertilizers, pharmaceuticals, dyes.', 'Fuel chemistry: combustion, engines.', 'Water treatment: purification, desalination.', 'Materials science: ceramics, composites.'],
    formulas: [],
    examples: ['Urea: NH₂CONH₂ (fertilizer)', 'Aspirin: C₉H₈O₄ (pharmaceutical)'],
    keyPoints: ['Chemical industry impacts economy', 'Sustainable processes are goal'],
    summary: 'Applied chemistry connects laboratory science to industrial applications.',
    mcqs: [],
    importantConcepts: ['Industrial applications','Chemical manufacturing','Sustainability'],
    exercises: [],
    visualization:{type:'simulation',component:'IndustrySim',desc:'Industrial chemistry processes'}
  },
  'bio-inorganic-chemistry': {
    title: 'Bio-Inorganic Chemistry',
    notes: ['Biological inorganic chemistry: metals in biology.', 'Hemoglobin: Fe²⁺ transports O₂.', 'Chlorophyll: Mg²⁺ in photosynthesis.', 'Enzymes: metal ion cofactors (Zn, Fe, Cu).'],
    formulas: [],
    examples: ['Hemoglobin: heme group with Fe', 'Vitamin B₁₂: Co-containing'],
    keyPoints: ['Transition metals essential for life', 'Metal ions in enzyme active sites'],
    summary: 'Role of metals and minerals in biological systems.',
    mcqs: [],
    importantConcepts: ['Biological metals','Metalloproteins','Enzyme cofactors'],
    exercises: [],
    visualization:{type:'3d-model',component:'BioinorganicViewer',desc:'Metal-centered biomolecule viewer'}
  },
  'modern-chemical-manufactures': {
    title: 'Modern Chemical Manufactures',
    notes: ['Petrochemical industry: feeds from crude oil.', 'Pharmaceutical manufacturing: GMP standards.', 'Agrochemicals: fertilizers, pesticides.', 'Green chemistry: atom economy, waste reduction.'],
    formulas: [],
    examples: ['Ammonia: Haber process (150-300 atm)', 'Sulfuric acid: Contact process'],
    keyPoints: ['Large-scale chemical production', 'Safety and environmental regulations'],
    summary: 'Modern chemical manufacturing processes and industry.',
    mcqs: [],
    importantConcepts: ['Chemical industry','Process engineering','Green chemistry'],
    exercises: [],
    visualization:{type:'simulation',component:'ManufacturingSim',desc:'Chemical plant simulation'}
  },
  'modern-manufactures': {
    title: 'Modern Manufactures',
    notes: ['Cement: limestone + clay, kiln process.', 'Glass: sand + soda ash + limestone.', 'Paper: cellulose from wood pulp.', 'Steel: iron + carbon + alloying elements.'],
    formulas: [],
    examples: ['Portland cement: Ca₃SiO₅, Ca₂SiO₄', 'Soda-lime glass: SiO₂, Na₂O, CaO'],
    keyPoints: ['Raw materials determine product properties', 'Energy-intensive processes'],
    summary: 'Major manufactured products from chemical processing.',
    mcqs: [],
    importantConcepts: ['Material science','Industrial processes','Manufacturing'],
    exercises: [],
    visualization:{type:'simulation',component:'ManufacturingProcSim',desc:'Manufacturing process flow'}
  }
};

// ────────────────────────────────────────────────────────────
// BIOLOGY — ALL UNITS
// ────────────────────────────────────────────────────────────
const BIOLOGY = {
  'biomolecules-and-cell-biology': {
    title: 'Biomolecules and Cell Biology',
    notes: [
      'Carbohydrates: (CH₂O)n; monosaccharides (glucose, fructose), disaccharides (sucrose, lactose), polysaccharides (starch, glycogen, cellulose).',
      'Proteins: polymers of 20 amino acids linked by peptide bonds (-CO-NH-); 4 structural levels.',
      'Lipids: hydrophobic; triglycerides, phospholipids (membrane bilayer), steroids.',
      'Nucleic acids: DNA (double helix, A=T, G≡C, deoxyribose) stores genetic info; RNA (single strand, A=U) for protein synthesis.',
      'Cell theory: all organisms made of cells; cell is basic unit; all cells from pre-existing cells.'
    ],
    formulas: ['Peptide bond: -CO-NH-', 'DNA: A=T (2 H-bonds), G≡C (3 H-bonds)'],
    examples: ['Glucose → 38 ATP via cellular respiration', 'Insulin: 51 amino acids, protein hormone'],
    keyPoints: ['Mitochondria: aerobic respiration → ATP', 'Chloroplast: photosynthesis', 'Fluid mosaic model (Singer & Nicolson, 1972)'],
    summary: 'Biomolecules (carbs, proteins, lipids, nucleic acids) form cellular structure and drive all life processes.',
    mcqs: [
      {question:'Energy storage in animals:',options:['Starch','Glycogen','Cellulose'],answer:'B'},
      {question:'Proteins made of:',options:['Fatty acids','Amino acids','Monosaccharides'],answer:'B'},
      {question:'Powerhouse of cell:',options:['Ribosome','Golgi','Mitochondria'],answer:'C'}
    ],
    importantConcepts: ['Macromolecules','Peptide bond','Fluid mosaic model','Organelles'],
    exercises: [
      {id:'1', question:'Identify the bond linking amino acids', steps:['Amino acids are monomers','Link between -COOH and -NH₂','Peptide bond formed'], answer:'Peptide bond'}
    ],
    visualization:{type:'3d-model',component:'ProteinStructureViewer',desc:'Interactive 3D protein structure showing primary to quaternary levels'}
  },
  'cell-division': {
    title: 'Cell Division',
    notes: ['Cell cycle: G₁ (growth) → S (DNA replication) → G₂ → M (mitosis).', 'Mitosis: 1 division → 2 identical diploid cells.', 'Meiosis: 2 divisions → 4 haploid gametes.', 'Crossing over in Prophase I creates variation.'],
    formulas: [],
    examples: ['Mitosis in onion root tip', 'Spermatogenesis: 1 primary → 4 sperm'],
    keyPoints: ['Mitosis maintains chromosome number', 'Meiosis halves it for gametes', 'Checkpoint controls prevent errors'],
    summary: 'Cell division essential for growth, repair, reproduction; mitosis maintains, meiosis creates diversity.',
    mcqs: [
      {question:'Crossing over occurs in:',options:['Prophase I','Metaphase I','Anaphase II'],answer:'A'},
      {question:'Human gamete chromosomes:',options:['23','46','92'],answer:'A'},
      {question:'Mitosis produces ___ cells:',options:['1','2','4'],answer:'B'}
    ],
    importantConcepts: ['Mitosis phases','Meiosis stages','Cell cycle regulation','Crossing over','Cancer'],
    exercises: [],
    visualization:{type:'simulation',component:'MitosisSim',desc:'Animated cell division showing all phases'}
  },
  'ecology': {
    title: 'Ecology',
    notes: ['Ecosystem: biotic + abiotic components.', 'Food chain: linear energy transfer (grass→rabbit→fox).', 'Food web: interconnected chains.', '10% energy transfer rule.', 'Biogeochemical cycles: carbon, nitrogen.'],
    formulas: ['dN/dt=rN((K-N)/K) (logistic growth)'],
    examples: ['Pond: phytoplankton→zooplankton→fish→birds', 'Nepal: terai→hills→mountains ecosystems'],
    keyPoints: ['Energy unidirectional, nutrients cyclic', 'Nepal has 5 biosphere reserves'],
    summary: 'Ecology studies organism-environment interactions; energy flows, nutrients cycle.',
    mcqs: [
      {question:'Energy transfer %:',options:['1%','10%','50%'],answer:'B'},
      {question:'Biotic component:',options:['Sunlight','Water','Plants'],answer:'C'},
      {question:'First trophic level:',options:['Consumers','Producers','Decomposers'],answer:'B'}
    ],
    importantConcepts: ['Food web','Energy pyramid','Biogeochemical cycles','Succession'],
    exercises: [],
    visualization:{type:'simulation',component:'EcosystemSim',desc:'Interactive ecosystem energy flow simulation'}
  },
  'evolutionary-biology': {
    title: 'Evolutionary Biology',
    notes: ['Darwin: natural selection.', 'Miller-Urey experiment: amino acids from inorganic precursors.', 'Fossil evidence: progressive complexity.', 'Homologous organs: common ancestry (divergent).', 'Analogous organs: convergent evolution.'],
    formulas: [],
    examples: ['Darwin\'s finches: beak adaptation', 'Archaeopteryx: reptile-bird link', 'Human: Australopithecus→H.erectus→H.sapiens'],
    keyPoints: ['Variation + selection = evolution', 'Genetic drift in small populations'],
    summary: 'Evolution explains biodiversity through descent with modification; natural selection is primary mechanism.',
    mcqs: [
      {question:'Proposed natural selection:',options:['Lamarck','Darwin','Mendel'],answer:'B'},
      {question:'Homologous organs indicate:',options:['Convergent','Divergent evolution'],answer:'B'},
      {question:'Miller-Urey produced:',options:['DNA','Amino acids','Proteins'],answer:'B'}
    ],
    importantConcepts: ['Natural selection','Evidence of evolution','Human evolution','Origin of life'],
    exercises: [],
    visualization:{type:'simulation',component:'EvolutionSim',desc:'Evolutionary tree builder and natural selection simulator'}
  },
  'floral-diversity': {
    title: 'Floral Diversity',
    notes: ['Five kingdom classification (Whittaker, 1969).', 'Binomial nomenclature: Genus species.', 'Plant evolution: algae→bryophytes→pteridophytes→gymnosperms→angiosperms.', 'Double fertilization: zygote + endosperm.'],
    formulas: [],
    examples: ['Rhododendron arboreum: Nepal national flower', 'Pinus: gymnosperm, timber industry'],
    keyPoints: ['Alternation of generations', 'Double fertilization unique to angiosperms'],
    summary: 'Floral diversity shows evolutionary progression from simple algae to complex flowering plants.',
    mcqs: [
      {question:'Bryophytes called:',options:['Aquatic plants','Amphibians of plant kingdom'],answer:'B'},
      {question:'Gymnosperms have:',options:['Covered seeds','Naked seeds','Flowers'],answer:'B'},
      {question:'Double fertilization in:',options:['Gymnosperms','Angiosperms','Both'],answer:'B'}
    ],
    importantConcepts: ['Five kingdom classification','Plant groups','Alternation of generations','Double fertilization'],
    exercises: [],
    visualization:{type:'3d-model',component:'PlantKingdomViewer',desc:'Interactive plant classification explorer'}
  },
  'faunal-diversity': {
    title: 'Faunal Diversity',
    notes: ['Protista: single-celled eukaryotes (Amoeba, Paramecium, Plasmodium).', 'Animal phyla: Porifera→Cnidaria→Platyhelminthes→Annelida→Arthropoda→Mollusca→Chordata.', 'Earthworm: Pheretima posthuma, closed circulatory system.', 'Frog: Rana tigrina, 3-chambered heart, amphibian.'],
    formulas: [],
    examples: ['Paramecium: cilia movement, contractile vacuole', 'Earthworm: nephridia excretion, clitellum reproduction'],
    keyPoints: ['Vertebrates have backbone; 95% animals are invertebrates', 'Segmentation allows specialization'],
    summary: 'Faunal diversity spans unicellular protists to complex chordates with diverse adaptations.',
    mcqs: [
      {question:'Paramecium moves by:',options:['Flagella','Cilia','Pseudopodia'],answer:'B'},
      {question:'Plasmodium causes:',options:['Typhoid','Malaria','Cholera'],answer:'B'},
      {question:'Earthworm excretion via:',options:['Nephridia','Kidneys','Contractile vacuole'],answer:'A'}
    ],
    importantConcepts: ['Protozoa classification','Animal phyla','Earthworm systems','Frog anatomy'],
    exercises: [],
    visualization:{type:'3d-model',component:'AnimalPhylaViewer',desc:'Interactive animal body plan explorer'}
  },
  'biota-and-environment': {
    title: 'Biota and Environment',
    notes: ['Aquatic adaptations: streamlined body, gills, lateral line.', 'Terrestrial adaptations: waterproof skin, lungs, internal fertilization.', 'Volant adaptations: wings, hollow bones, air sacs.', 'Reflex action: automatic response via spinal cord.', 'Pollution: air (SO₂, NOx, PM2.5), water, soil.'],
    formulas: [],
    examples: ['Fish gills: countercurrent exchange', 'Kathmandu Valley: PM2.5 exceeds WHO 10× in winter'],
    keyPoints: ['Adaptations increase survival', 'Nepal vulnerable to climate change'],
    summary: 'Biota show remarkable adaptations to aquatic, terrestrial, aerial environments; pollution threatens ecosystems.',
    mcqs: [
      {question:'Streamlined body adapts for:',options:['Flying','Swimming','Running'],answer:'B'},
      {question:'Main Kathmandu pollutant:',options:['Ozone','PM2.5','Lead'],answer:'B'},
      {question:'Reflex arc involves:',options:['Brain','Spinal cord','Heart'],answer:'B'}
    ],
    importantConcepts: ['Aquatic adaptations','Terrestrial adaptations','Pollution','Reflex action'],
    exercises: [],
    visualization:{type:'simulation',component:'PollutionSim',desc:'Air quality monitor and pollution impact visualizer'}
  },
  'conservation-biology': {
    title: 'Conservation Biology',
    notes: ['Biodiversity: genetic, species, ecosystem levels.', 'Nepal national parks: Chitwan (1973), Sagarmatha (1976), etc. (10 total).', 'IUCN Red List: CR, EN, VU, NT, LC.', 'In-situ: protected areas, community forests.', 'Ex-situ: zoos, seed banks, botanical gardens.'],
    formulas: [],
    examples: ['Chitwan: Bengal tiger, one-horned rhino', 'Community forestry: 22,000+ groups manage 36% of forests'],
    keyPoints: ['Nepal has 5 biosphere reserves', 'Endangered: tiger (EN), rhino (VU), snow leopard (VU)'],
    summary: 'Conservation biology protects biodiversity through in-situ and ex-situ strategies; Nepal is a global leader in community forestry.',
    mcqs: [
      {question:'Chitwan famous for:',options:['Snow leopard','Bengal tiger','Red panda'],answer:'B'},
      {question:'IUCN "CR" means:',options:['Vulnerable','Endangered','Critically Endangered'],answer:'C'},
      {question:'Community forestry manages ___% forests:',options:['10%','25%','36%'],answer:'C'}
    ],
    importantConcepts: ['Biodiversity','National parks','IUCN categories','Conservation strategies','Community forestry'],
    exercises: [],
    visualization:{type:'map',component:'NepalConservationMap',desc:'Interactive map of Nepal\'s protected areas and biodiversity hotspots'}
  },
  'introduction-to-biology': {
    title: 'Introduction to Biology',
    notes: ['Biology: study of life (Greek: bios + logos).', 'Branches: botany, zoology, microbiology, genetics, ecology.', 'Characteristics of life: organization, metabolism, homeostasis, growth, reproduction, response, evolution.', 'Scientific method: observation → hypothesis → experiment → conclusion.'],
    formulas: [],
    examples: ['Nepal: 10% world plants, 1% mammals in 0.1% Earth land'],
    keyPoints: ['Biology integrates across molecular to ecosystem scales'],
    summary: 'Biology is the fundamental science of life, integrating with other disciplines.',
    mcqs: [
      {question:'Biology means:',options:['Study of rocks','Study of life','Study of cells'],answer:'B'},
      {question:'Branch studying plants:',options:['Zoology','Botany','Microbiology'],answer:'B'}
    ],
    importantConcepts: ['Definition of biology','Branches','Scientific method','Life characteristics'],
    exercises: [],
    visualization:{type:'interactive',component:'BiologyIntro',desc:'Biology branches explorer and scientific method simulator'}
  },
  'introductory-microbiology': {
    title: 'Introductory Microbiology',
    notes: ['Monera: prokaryotes (bacteria, cyanobacteria).', 'Bacteria: cell wall (peptidoglycan), 70S ribosomes, binary fission.', 'Virus: acellular, protein coat + nucleic acid, obligate parasite.', 'Gram stain: positive (purple) vs negative (pink).', 'Biotechnology: insulin, vaccines, GMOs.'],
    formulas: [],
    examples: ['E. coli: model organism', 'T4 bacteriophage: lytic cycle in 20 min', 'Recombinant insulin from E. coli'],
    keyPoints: ['Bacteria reproduce by binary fission (~20 min)', 'Viruses not living: no metabolism'],
    summary: 'Microbiology studies bacteria, viruses, microscopic life; foundational to medicine and industry.',
    mcqs: [
      {question:'Bacteria reproduce by:',options:['Mitosis','Binary fission','Meiosis'],answer:'B'},
      {question:'Gram-positive stain:',options:['Pink','Purple','Green'],answer:'B'},
      {question:'Virus consists of:',options:['Cell wall','Protein+nucleic acid','Cytoplasm'],answer:'B'}
    ],
    importantConcepts: ['Bacterial structure','Virus structure','Gram staining','Biotechnology'],
    exercises: [],
    visualization:{type:'simulation',component:'MicrobeViewer',desc:'Interactive microorganism explorer with Gram stain simulation'}
  },
  'vegetation': {
    title: 'Vegetation',
    notes: ['Nepal vegetation zones by altitude:', 'Terai (100-500m): sal forest, grasslands.', 'Subtropical (500-1000m): chir pine, semal.', 'Temperate (1000-2000m): oak, rhododendron.', 'Sub-alpine (2000-3000m): rhododendron, juniper.', 'Alpine (3000-4000m): shrubs, meadows.', 'Nival (>4000m): snow, lichens, mosses.'],
    formulas: [],
    examples: ['Chitwan sal forest: tiger, rhino habitat', 'Everest: alpine meadows in summer'],
    keyPoints: ['Vegetation varies with altitude and rainfall', 'Community forests manage 36% of Nepal'],
    summary: 'Nepal vegetation zones reflect altitude, climate, and human management.',
    mcqs: [
      {question:'Dominant Terai tree:',options:['Chir pine','Sal','Oak'],answer:'B'},
      {question:'In-situ conservation:',options:['Zoos','Protected areas','Seed banks'],answer:'B'},
      {question:'Rhododendron altitude:',options:['100-500m','1000-3000m','>4000m'],answer:'B'}
    ],
    importantConcepts: ['Vegetation zones','In-situ conservation','Ex-situ conservation','Community forestry'],
    exercises: [],
    visualization:{type:'map',component:'NepalVegetationMap',desc:'Interactive vegetation zone map of Nepal by altitude'}
  }
};

// ────────────────────────────────────────────────────────────
// UPDATE LOGIC
// ────────────────────────────────────────────────────────────
function updateFile(filePath, data) {
  let obj;
  try { obj = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch(e) { return false; }

  const fields = ['notes','examples','formulas','keyPoints','summary','mcqs','importantConcepts','exercises','visualization'];
  let changed = false;

  for (const f of fields) {
    const src = data[f];
    if (!src) continue;
    const cur = obj[f];
    if (!cur || cur.length === 0 || (Array.isArray(cur) && isPlaceholder(cur))) {
      obj[f] = Array.isArray(src) ? [...src] : src;
      changed = true;
    }
  }

  if (data.title && (!obj.title || isPlaceholderStr(obj.title))) {
    obj.title = data.title;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf8');
  }
  return changed;
}

function processUnit(unitSlug, dataMap, subject) {
  const conceptDir = path.join(ROOT, subject, unitSlug, 'concepts');
  if (!fs.existsSync(conceptDir)) return 0;
  const data = dataMap[unitSlug];
  if (!data) return 0;

  const files = fs.readdirSync(conceptDir).filter(f => f.endsWith('.json'));
  let updated = 0;
  for (const file of files) {
    if (updateFile(path.join(conceptDir, file), data)) {
      updated++;
      console.log('  ✓', file);
    }
  }
  return updated;
}

function main() {
  console.log('=== NEB Class 11 Content Population — COMPLETE ===\n');

  console.log('--- Chemistry ---');
  let chemTotal = 0;
  for (const unit of Object.keys(CHEMISTRY)) {
    const u = processUnit(unit, CHEMISTRY, 'chemistry');
    chemTotal += u;
    if (u > 0) console.log(`  ${unit}: ${u} files`);
  }
  console.log(`\n  Total chemistry: ${chemTotal}\n`);

  console.log('--- Biology ---');
  let bioTotal = 0;
  for (const unit of Object.keys(BIOLOGY)) {
    const u = processUnit(unit, BIOLOGY, 'biology');
    bioTotal += u;
    if (u > 0) console.log(`  ${unit}: ${u} files`);
  }
  console.log(`\n  Total biology: ${bioTotal}\n`);

  console.log('=== Done! ===');
}

main();
