const fs = require('fs');
const path = require('path');

// Topic slug to visualType mapping for Chemistry
const VISUAL_TYPE_MAP = {
  // Atomic Structure
  'bohr-postulates': 'bohr-hydrogen-atom',
  'postulates-of-bohr-s-atomic-model-and-its-application': 'bohr-hydrogen-atom',
  'rutherford-model': 'rutherford-alpha-scattering',
  'rutherford-s-atomic-model': 'rutherford-alpha-scattering',
  'rutherford-s-atomic-model-and-its-limitations': 'rutherford-alpha-scattering',
  'de-broglie-waves': 'de-broglie-matter-waves',
  'elementary-idea-of-quantum-mechanical-model-de-broglie-s-wave-equation': 'de-broglie-matter-waves',
  'heisenberg-uncertainty': 'heisenberg-uncertainty',
  'heisenberg-s-uncertainty-principle-and-concept-of-probability': 'heisenberg-uncertainty',
  'quantum-numbers': 'quantum-numbers',
  'orbitals-shapes': 'orbital-shapes-s-p',
  'orbitals-and-shape-of-s-and-p-orbitals-only': 'orbital-shapes-s-p',
  'aufbau-pauli-hund': 'aufbau-principle',
  'hydrogen-spectrum': 'hydrogen-spectrum',
  'spectrum-of-hydrogen-atom': 'hydrogen-spectrum',
  'bohr-defects': 'defects-of-bohr-model',
  'defects-of-bohr-s-theory': 'defects-of-bohr-model',
  
  // Chemical Bonding
  'ionic-bond-and-its-properties': 'ionic-covalent-bond',
  'covalent-bond-and-coordinate-covalent-bond-and-properties-of-covalent-compounds': 'ionic-covalent-bond',
  'lattice-energy': 'lattice-energy',
  'lewis-dot-structure-of-some-common-compounds-of-s-and-p-block-elements': 'lewis-dot-structures',
  'vsepr-theory': 'vsepr-geometry',
  'vsepr-theory-and-shapes-of-simple-molecules': 'vsepr-geometry',
  'hybridization': 'hybridization-orbitals',
  'hybridization-involving-s-and-p-orbitals-only': 'hybridization-orbitals',
  'elementary-idea-of-valence-bond-theory': 'valence-bond-theory',
  'molecular-orbital-theory': 'molecular-orbital-theory',
  'bond-characteristics-bond-length-ionic-character-dipole-moment': 'bond-properties',
  'resonance': 'resonance',
  'resonance-effect-plus-r-and-minus-r-effect': 'resonance-effect',
  'inductive-effect-plus-i-and-minus-i-effect': 'inductive-effect',
  
  // Stoichiometry & Basic Concepts
  'laws-stoichiometry': 'laws-of-stoichiometry',
  'laws-of-stoichiometry': 'laws-of-stoichiometry',
  'basic-concepts-atoms-molecules': 'basic-concepts-chemistry',
  'basic-concepts-of-chemistry-atoms-molecules-relative-masses-of-atoms-and-molecules-atomic-mass-unit-amu-radicals-molecular-formula-empirical-formula': 'basic-concepts-chemistry',
  'mole-concept': 'mole-concept',
  'percentage-composition': 'percentage-composition',
  'percentage-composition-from-molecular-formula': 'percentage-composition',
  'empirical-molecular-formula': 'empirical-molecular-formula',
  'limiting-reactant': 'limiting-reactant',
  'yield-calculations': 'percent-yield',
  'balancing-redox': 'balancing-equations',
  'balancing-redox-reactions': 'balancing-equations',
  
  // Periodic Table
  'modern-periodic-law': 'periodic-table',
  'modern-periodic-law-and-modern-periodic-table': 'periodic-table',
  'iupac-classification-and-periodic-trends': 'periodic-table',
  'classification-into-groups-periods-and-blocks': 'periodic-table-blocks',
  'iupac-classification-of-elements-and-periodic-trends': 'periodic-table',
  'periodic-trends': 'periodic-trends',
  'classification-of-elements-into-different-groups-periods-and-blocks': 'periodic-table-blocks',
  
  // Organic Chemistry
  'introduction-to-organic-chemistry-and-organic-compounds': 'organic-chemistry-intro',
  'reasons-for-separate-study-of-organic-compounds': 'organic-chemistry-intro',
  'tetra-covalency-and-catenation-properties-of-carbon-classification-of-organic-compounds': 'carbon-catenation',
  'idea-of-structural-formula-contracted-formula-and-bond-line-structural-formula': 'structural-formulas',
  'iupac-nomenclature': 'iupac-nomenclature',
  'iupac-nomenclature-of-organic-compounds-up-to-chain-having-6-carbon-atoms': 'iupac-nomenclature',
  'isomerism': 'isomerism',
  'isomerism-in-organic-compounds-definition-and-classification-of-isomerism-structural-isomerism-and-its-types': 'isomerism',
  'concept-of-geometrical-isomerism-and-optical-isomerism-d-and-l-form': 'stereoisomerism',
  'reaction-mechanism': 'reaction-mechanism',
  'preliminary-idea-of-reaction-mechanism-homolytic-and-heterolytic-fission': 'reaction-mechanism',
  'test-of-unsaturation-and-comparative-study-of-physical-properties-of-alkane-alkene-and-alkyne': 'alkanes-alkenes-alkynes',
  
  // Hydrocarbons
  'alkanes': 'alkanes',
  'alkanes-preparation-and-chemical-properties': 'alkanes',
  'alkenes': 'alkenes',
  'alkenes-preparation-and-chemical-properties': 'alkenes',
  'alkynes': 'alkynes',
  'alkynes-preparation-and-chemical-properties': 'alkynes',
  'aromatic-compounds': 'benzene-aromatic',
  'introduction-and-characteristics-of-aromatic-compounds': 'benzene-aromatic',
  'benzene': 'benzene-aromatic',
  'kekule-structure-of-benzene-resonance-and-isomerism-in-benzene': 'benzene-aromatic',
  'preparation-properties-and-uses-of-benzene': 'benzene-aromatic',
  
  // Equilibrium
  'dynamic-equilibrium': 'chemical-equilibrium',
  'physical-and-chemical-equilibrium-dynamic-nature': 'chemical-equilibrium',
  'law-of-mass-action': 'law-of-mass-action',
  'expression-for-equilibrium-constant-and-its-importance': 'equilibrium-constant',
  'le-chateliers-principle': 'le-chateliers-principle',
  'le-chatlier-s-principle': 'le-chateliers-principle',
  'relationship-between-kp-and-kc': 'kp-kc-relationship',
  
  // Thermochemistry & States
  'gas-laws': 'gas-laws',
  'boyles-law-gas-laws-': 'gas-laws',
  'kinetic-theory-gas': 'kinetic-theory-gases',
  'kinetic-theory-of-gases-and-its-postulates': 'kinetic-theory-gases',
  'real-gas-deviation': 'real-gas-behavior',
  'liquid-state': 'liquid-crystals',
  'solid-state': 'crystal-lattices',
  
  // Redox & Electrochemistry
  'general-and-electronic-concept-of-oxidation-and-reduction': 'redox-reactions',
  'redox-concepts': 'redox-reactions',
  'oxidation-number-and-rules-for-assigning-oxidation-number': 'oxidation-states',
  'electrolysis': 'electrolysis',
  'electrolysis-qualitative-and-quantitative-aspect': 'electrolysis',
  'nernst-equation': 'electrochemical-cell',
  
  // S-Block Elements
  'hydrogen': 'hydrogen',
  'hydrogen-chemistry-of-atomic-and-nascent-hydrogen-isotopes-and-their-uses-application-of-hydrogen-as-fuel-heavy-water-and-its-applications': 'hydrogen',
  'alkali-metals': 'alkali-metals',
  'alkali-metals-general-characteristics': 'alkali-metals',
  'sodium-extraction-from-down-s-process-properties-action-with-oxygen-water-acids-nonmetals-and-ammonia-and-uses': 'sodium-compounds',
  'sodium-hydroxide-properties-precipitation-reaction-and-action-with-carbon-monoxide-and-uses-sodium-carbonate-properties-action-with-co2-so2-water-precipitation-reactions-and-uses': 'sodium-compounds',
  'sodium-thiosulphate-formula-and-uses': 'sodium-compounds',
  'alkaline-earth-metals': 'alkaline-earth-metals',
  'alkaline-earth-metals-general-characteristics': 'alkaline-earth-metals',
  'molecular-formula-and-uses-of-quick-lime-bleaching-powder-magnesia-plaster-of-paris-and-epsom-salt-solubility-of-hydroxides-carbonates-and-sulphates-of-alkaline-earth-metals-stability-of-carbonate-and-nitrate-of-alkaline-earth-metals': 'alkaline-earth-compounds',
  'metals-and-metallurgical-principles-definition-of-metallurgy-and-its-types-ore-gangue-flux-slag-alloy-and-amalgam': 'metallurgy',
  'general-principles-of-extraction-of-metals': 'metallurgy',
  'metallurgical-principles': 'metallurgy',
  'refining-of-metals': 'metal-refining',
  
  // P-Block Elements
  'oxygen': 'oxygen',
  'allotropes-of-oxygen-oxides-applications-of-hydrogen-peroxide-medical-and-industrial-application-of-oxygen': 'oxygen',
  'ozone': 'ozone',
  'ozone-occurrence-preparation-structure-test-for-ozone-uses': 'ozone',
  'ozone-layer-depletion-causes-effects-and-control-measures': 'ozone-layer',
  'nitrogen': 'nitrogen',
  'nitrogen-reason-for-inertness-of-nitrogen-and-active-nitrogen-chemical-properties-of-ammonia-and-its-applications': 'nitrogen',
  'oxy-acids-of-nitrogen-chemical-properties-of-nitric-acid-test-for-nitrate-ion-halogens-preparation-properties-and-uses': 'nitrogen-halogen',
  'halogens': 'halogens',
  'carbon': 'carbon',
  'carbon-allotropes-properties-and-uses-of-carbon-monoxide': 'carbon',
  'sulphur': 'sulphur',
  'phosphorus-allotropes-phosphine-preparation-properties-and-uses-sulphur-allotropes-and-uses-hydrogen-sulphide-preparation-properties-and-uses-sulphur-dioxide-properties-and-uses-sulphuric-acid-properties-and-uses': 'sulphur',
  'phosphorus-sulphur-compounds-detailed': 'sulphur',
  
  // Applied Chemistry
  'introduction-importance-chemistry': 'chemistry-intro',
  'general-introduction-and-importance-of-chemistry': 'chemistry-intro',
  'fundamentals-of-applied-chemistry': 'applied-chemistry',
  'hber-process': 'haber-process',
  'contact-process': 'contact-process',
  'solvay-process': 'solvay-process',
  'modern-chemical-manufactures': 'chemical-industry',
  'stages-in-producing-a-new-product-economics-of-production-running-a-chemical-plant-continuous-and-batch-processing-environmental-impact': 'chemical-industry',
  'qualitative-analysis-of-organic-compounds-detection-of-n-s-and-halogens-by-lassigne-s-test': ' Lassaigne-test',
  
  // Bioinorganic
  'introduction-to-bio-inorganic-chemistry-micro-and-macro-nutrients-importance-of-metal-ions-in-biological-systems': 'bioinorganic-chemistry',
  'bio-inorganic-intro': 'bioinorganic-chemistry',
  'metal-ions-biological-systems': 'metal-ions-biology',
  'ion-pumps-and-metal-toxicity': 'metal-toxicity',
};

// Content expansion data for key chemistry topics
const CONTENT_DATA = {
  'bohr-hydrogen-atom': {
    notes: [
      'Bohr model: electron orbits nucleus in fixed energy levels.',
      'Energy is quantized: E_n = -13.6/n² eV for hydrogen.',
      'Electrons jump between orbits by absorbing/emitting photons (E = hν).',
      'Angular momentum is quantized: mvr = nh/2π.'
    ],
    confusion: [
      '? Bohr model explains all atoms. ? Only hydrogen and hydrogen-like species (He+, Li2+).',
      '? Electrons orbit like planets. ? Electrons exist in probability clouds (orbitals), not fixed paths.',
      '? Energy levels are continuous. ? Energy levels are discrete (quantized).',
      '? Bohr radius = size of atom. ? Bohr radius (0.529 Å) is just the ground state radius of hydrogen.'
    ],
    examples: [
      'Calculate wavelength of photon emitted when electron jumps from n=3 to n=2 (Balmer series): λ = 656 nm (red light)'
    ],
    universalFacts: [
      'Bohr model won him the 1922 Nobel Prize in Physics.'
    ]
  },
  'rutherford-alpha-scattering': {
    notes: [
      'Rutherford\'s gold foil experiment discovered the nucleus.',
      'Most alpha particles passed through; some deflected at large angles.',
      'Nucleus is tiny, dense, positively charged center of atom.',
      'Atom is mostly empty space.'
    ],
    confusion: [
      '? Atom is solid sphere. ? Atom is mostly empty space with dense nucleus.',
      '? All alpha particles hit nucleus. ? Most pass through; only ~1 in 8000 deflect significantly.'
    ],
    examples: [
      'If nucleus were the size of a marble, atom would be the size of a football stadium.'
    ],
    universalFacts: [
      'Nucleus contains 99.9% of atom mass but <0.01% of its volume.'
    ]
  },
  'orbital-shapes-s-p': {
    notes: [
      's-orbitals are spherical; p-orbitals are dumbbell-shaped.',
      'Each p-subshell has 3 orbitals (px, py, pz) oriented along axes.',
      'd-orbitals have cloverleaf shapes (5 orbitals).',
      'f-orbitals have complex shapes (7 orbitals).'
    ],
    confusion: [
      '? Orbit and orbital are same. ? Orbit = circular path (Bohr); Orbital = 3D region of electron probability.',
      '? s-orbital has only 1 electron. ? s-orbital can hold 2 electrons (Pauli exclusion).'
    ],
    examples: [
      'Carbon (1s² 2s² 2p²): two unpaired electrons in separate p-orbitals (Hund\'s rule).'
    ]
  },
  'quantum-numbers': {
    notes: [
      'Four quantum numbers describe each electron: n, l, ml, ms.',
      'n (principal): energy level/shell (1, 2, 3...).',
      'l (azimuthal): subshell shape (0=s, 1=p, 2=d, 3=f).',
      'ml (magnetic): orbital orientation (-l to +l).',
      'ms (spin): electron spin (+½ or -½).'
    ],
    confusion: [
      '? Quantum numbers are arbitrary. ? They define unique electron states; no two electrons share all four.',
      '? l can equal n. ? l ranges from 0 to n-1 only.'
    ],
    examples: [
      'For n=3: l=0,1,2; ml=-2,-1,0,+1,+2; total 9 orbitals, 18 electrons.'
    ]
  },
  'lewis-dot-structures': {
    notes: [
      'Lewis structures show valence electrons as dots around element symbols.',
      'Octet rule: atoms tend to gain/lose/share 8 electrons.',
      'Dots represent valence electrons; lines represent bonds.',
      'Exception: H needs 2, B sometimes needs 6.'
    ],
    confusion: [
      '? All atoms follow octet rule. ? Exceptions: H (duet), B (6e-), expanded octets (P, S, Xe).',
      '? Lewis structures show 3D geometry. ? They show connectivity only; VSEPR predicts shape.'
    ],
    examples: [
      'CO₂: O=C=O (each O has 2 lone pairs, C has none)'
    ]
  },
  'vsepr-geometry': {
    notes: [
      'VSEPR: Valence Shell Electron Pair Repulsion theory.',
      'Electron pairs repel; geometry minimizes repulsion.',
      'AXE notation: A=central, X=bonding, E=lone pair.',
      'Common geometries: linear (180°), trigonal planar (120°), tetrahedral (109.5°), trigonal bipyramidal, octahedral.'
    ],
    confusion: [
      '? Lone pairs don\'t affect shape. ? Lone pairs repel more than bonding pairs, compressing bond angles.',
      '? Same number of bonds = same shape. ? NH₃ (trigonal pyramidal) vs BF₃ (trigonal planar) - different lone pairs!'
    ],
    examples: [
      'H₂O: AX₂E₂ → bent shape (104.5°), not linear!'
    ]
  },
  'hybridization-orbitals': {
    notes: [
      'Hybridization mixes atomic orbitals to form new equivalent orbitals.',
      'sp: 2 orbitals, linear (180°) - BeCl₂, CO₂',
      'sp²: 3 orbitals, trigonal planar (120°) - BF₃, C₂H₄',
      'sp³: 4 orbitals, tetrahedral (109.5°) - CH₄, NH₃, H₂O'
    ],
    confusion: [
      '? Hybridization causes bonding. ? It explains observed geometries AFTER bonding.',
      '? Hybridization is physical mixing. ? It\'s a mathematical model for prediction.'
    ],
    examples: [
      'C in CH₄: one 2s + three 2p → four sp³ hybrids (tetrahedral)'
    ]
  },
  'molecular-orbital-theory': {
    notes: [
      'MO theory: electrons occupy molecular orbitals spanning entire molecule.',
      'Bonding MO: lower energy, stabilizing; Antibonding MO: higher energy, destabilizing.',
      'Bond order = (bonding e⁻ - antibonding e⁻)/2.',
      'Explains paramagnetism of O₂ (unpaired electrons in π* orbitals).'
    ],
    confusion: [
      '? Bond order > 0 means stable molecule. ? Yes, but also need to consider other factors.',
      '? More electrons = stronger bond. ? No; antibonding electrons weaken bonds.'
    ],
    examples: [
      'O₂: bond order = 2, paramagnetic (2 unpaired e⁻ in π* orbitals)'
    ]
  },
  'mole-concept': {
    notes: [
      'Mole: 6.022×10²³ particles (Avogadro\'s number).',
      'Molar mass: mass of 1 mole in grams (= atomic/molecular mass in amu).',
      'n = mass/Molar mass = molecules/Na = volume( gas at STP)/22.4L.',
      'STP: 0°C, 1 atm; 1 mol gas = 22.4 L.'
    ],
    confusion: [
      '? Mole = mass. ? No; mole counts particles; mass depends on substance.',
      '? 1 mol anything = same mass. ? No; 1 mol Fe ≠ 1 mol H₂O in mass, but same number of particles.',
      '? STP = room temperature. ? STP = 0°C, 1 atm; RTP ≈ 25°C, 1 atm.'
    ],
    examples: [
      '18g H₂O = 1 mol = 6.022×10²³ molecules = 2×6.022×10²³ H atoms + 6.022×10²³ O atoms'
    ]
  },
  'periodic-trends': {
    notes: [
      'Atomic radius: decreases across period (more protons pull e⁻ closer); increases down group (more shells).',
      'Ionization energy: increases across period; decreases down group.',
      'Electronegativity: increases across period; decreases down group.',
      'Metallic character: opposite of electronegativity trend.'
    ],
    confusion: [
      '? Larger atoms have higher ionization energy. ? No; harder to remove e⁻ from small atoms (closer to nucleus).',
      '? Ion and atom have same size. ? Cations smaller; anions larger than parent atom.'
    ],
    examples: [
      'F > O > N > C (electronegativity); K > Na > Li (atomic radius)'
    ]
  },
  'redox-reactions': {
    notes: [
      'Redox: Reduction + Oxidation occur together.',
      'Oxidation: loss of electrons (OIL); Reduction: gain of electrons (RIG).',
      'Oxidizing agent: gets reduced; Reducing agent: gets oxidized.',
      'Balance redox by half-reaction method in acidic/basic medium.'
    ],
    confusion: [
      '? Oxidation = adding oxygen only. ? No; it\'s electron loss (can involve H loss too).',
      '? Agent causes the change. ? Agent undergoes the opposite: oxidizing agent gets reduced.'
    ],
    examples: [
      'Zn + Cu²⁺ → Zn²⁺ + Cu: Zn oxidized (reducing agent); Cu²⁺ reduced (oxidizing agent)'
    ]
  },
  'le-chateliers-principle': {
    notes: [
      'Le Chatelier: system at equilibrium shifts to counteract disturbance.',
      'Increase concentration → shift away from added substance.',
      'Increase pressure (gas) → shift to fewer moles of gas.',
      'Increase temperature → shift endothermic direction.'
    ],
    confusion: [
      '? Catalyst shifts equilibrium. ? No; catalyst speeds both directions equally; only changes rate.',
      '? Adding inert gas shifts equilibrium. ? No; partial pressures unchanged at constant volume.'
    ],
    examples: [
      'N₂ + 3H₂ ⇌ 2NH₃ (exothermic): high pressure, low temp favor NH₃ (Haber process)'
    ]
  },
  'alkanes': {
    notes: [
      'Alkanes: CnH2n+2, single bonds only, saturated hydrocarbons.',
      'General formula: CnH2n+2 (n≥1).',
      'Homologous series: each member differs by CH₂.',
      'Reactions: combustion, halogenation (free radical substitution), cracking.'
    ],
    confusion: [
      '? All C-C bonds are rigid. ? Single bonds allow rotation (conformations).',
      '? Alkanes are very reactive. ? Relatively unreactive (except combustion).'
    ],
    examples: [
      'CH₄ + 2O₂ → CO₂ + 2H₂O (combustion); CH₄ + Cl₂ → CH₃Cl + HCl (UV light)'
    ]
  },
  'alkenes': {
    notes: [
      'Alkenes: CnH2n, at least one C=C double bond, unsaturated.',
      'Double bond: one σ + one π bond; π bond is reactive site.',
      'Geometric isomerism: cis/trans (E/Z) due to restricted C=C rotation.',
      'Reactions: addition (H₂, X₂, HX, H₂O), polymerization.'
    ],
    confusion: [
      '? Double bond = two identical bonds. ? σ bond + weaker π bond; π breaks first in reactions.',
      '? All C=C compounds show cis-trans. ? Need 2 different groups on EACH carbon.'
    ],
    examples: [
      'C₂H₄ + HBr → C₂H₅Br (Markovnikov: H adds to C with more H)'
    ]
  },
  'benzene-aromatic': {
    notes: [
      'Benzene: C₆H₆, hexagonal ring, delocalized π electrons.',
      'Resonance: two equivalent Kekulé structures; actual bond lengths equal.',
      'Aromaticity: planar, cyclic, conjugated, 4n+2 π electrons (Hückel\'s rule).',
      'Reactions: electrophilic substitution (not addition) - preserves aromaticity.'
    ],
    confusion: [
      '? Benzene has alternating single/double bonds. ? All C-C bonds equal (1.39 Å); delocalized electrons.',
      '? Benzene undergoes addition like alkenes. ? No; substitution preserves stable aromatic ring.'
    ],
    examples: [
      'Benzene + Br₂/FeBr₃ → bromobenzene + HBr (electrophilic substitution)'
    ]
  },
  'isomerism': {
    notes: [
      'Isomers: same molecular formula, different structure/arrangement.',
      'Structural isomerism: chain, position, functional group.',
      'Stereoisomerism: geometric (cis-trans), optical (enantiomers).',
      'Constitutional vs configurational isomers.'
    ],
    confusion: [
      '? Isomers have different molecular formulas. ? Same formula, different structure!',
      '? All isomers have same properties. ? Physical/chemical properties often differ significantly.'
    ],
    examples: [
      'C₄H₁₀: n-butane (straight chain) vs isobutane (branched)'
    ]
  },
  'empirical-molecular-formula': {
    notes: [
      'Empirical formula: simplest whole-number ratio of elements.',
      'Molecular formula: actual number of atoms; = n × empirical formula.',
      'n = molar mass / empirical formula mass.',
      'Example: glucose - empirical CH₂O, molecular C₆H₁₂O₆ (n=6).'
    ],
    confusion: [
      '? Empirical = molecular. ? Only true if n=1 (e.g., H₂O, CO₂).',
      '? Can find molecular formula without molar mass. ? No; need both ratios AND molar mass.'
    ],
    examples: [
      'Compound: 40% C, 6.7% H, 53.3% O; molar mass 180 g/mol → empirical CH₂O (30), n=6 → C₆H₁₂O₆'
    ]
  }
};

const chemistryPath = 'content/ravikishan/class-11-notes/chemistry';

function processFiles() {
  const stats = { updated: 0, errors: 0, skipped: 0 };
  
  function walkDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        walkDir(fullPath);
      } else if (item.name.endsWith('.json') && 
                 !item.name.includes('mindmap') &&
                 !item.name.includes('plan.json') &&
                 !fullPath.includes('/notes/')) {
        
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const data = JSON.parse(content);
          
          if (!data.topicSlug) continue;
          
          const slug = data.topicSlug.toLowerCase();
          let visualType = null;
          
          // Try exact match first
          if (VISUAL_TYPE_MAP[slug]) {
            visualType = VISUAL_TYPE_MAP[slug];
          } else {
            // Try partial matching
            for (const [key, value] of Object.entries(VISUAL_TYPE_MAP)) {
              if (slug.includes(key) || key.includes(slug)) {
                visualType = value;
                break;
              }
            }
          }
          
          if (visualType && data.visualType !== visualType) {
            data.visualType = visualType;
            
            // Expand content if needed
            if (CONTENT_DATA[visualType]) {
              const expData = CONTENT_DATA[visualType];
              
              if (data.notes && data.notes.length < 3) {
                data.notes = expData.notes;
              }
              
              if (data.confusion && data.confusion.length < 3) {
                data.confusion = expData.confusion;
              }
              
              if (data.examples && data.examples.length < 2) {
                data.examples = expData.examples;
              }
              
              if (data.universalFacts && data.universalFacts.length < 2) {
                data.universalFacts = expData.universalFacts;
              }
            }
            
            fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
            stats.updated++;
            console.log(`✓ ${path.basename(fullPath)} → ${visualType}`);
          } else if (!data.visualType) {
            stats.skipped++;
            console.log(`✗ ${path.basename(fullPath)} - no visual type found`);
          } else {
            stats.skipped++;
          }
        } catch (e) {
          stats.errors++;
          console.error(`Error processing ${item.name}: ${e.message}`);
        }
      }
    }
  }
  
  walkDir(chemistryPath);
  
  console.log(`\nPatch complete: ${stats.updated} files fixed, ${stats.skipped} skipped, ${stats.errors} errors`);
}

processFiles();
