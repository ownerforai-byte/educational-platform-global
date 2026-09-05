/**
 * Content Pipeline Orchestrator
 * 
 * Reads syllabus.ts, checks existing content, identifies gaps,
 * and generates missing concept files one at a time.
 * 
 * Run: node orchestrator.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_ROOT = path.join(__dirname, 'content', 'ravikishan');

// ─── Syllabus Data (extracted from syllabus.ts) ─────────────────────────────

const SYLLABUS_ORDER = [
  // ═══════════════════════════════════════════════════════════════════
  // CLASS 11 NOTES
  // ═══════════════════════════════════════════════════════════════════
  { classSlug: 'class-11-notes', subjectSlug: 'mathematics', units: [
    {
      id: 'algebra', title: 'Algebra', hours: 44, topics: [
        { slug: 'logic-and-set', title: 'Logic and Set' },
        { slug: 'real-numbers', title: 'Real Numbers' },
        { slug: 'function-domain-range', title: 'Function: Domain and Range' },
        { slug: 'curve-sketching', title: 'Curve Sketching' },
        { slug: 'sequence-series', title: 'Sequence and Series' },
        { slug: 'matrices-determinants', title: 'Matrices and Determinants' },
        { slug: 'quadratic-equation', title: 'Quadratic Equation' },
        { slug: 'complex-number', title: 'Complex Number' },
      ]
    },
    {
      id: 'trigonometry', title: 'Trigonometry', hours: 12, topics: [
        { slug: 'inverse-circular-functions', title: 'Inverse Circular Functions' },
        { slug: 'trigonometric-equations', title: 'Trigonometric Equations and General Values' },
      ]
    },
    {
      id: 'analytic-geometry', title: 'Analytic Geometry', hours: 20, topics: [
        { slug: 'straight-line', title: 'Straight Line' },
        { slug: 'pair-of-straight-lines', title: 'Pair of Straight Lines' },
        { slug: 'coordinates-in-space', title: 'Coordinates in Space' },
      ]
    },
    {
      id: 'vectors', title: 'Vectors', hours: 12, topics: [
        { slug: 'collinear-non-collinear-vectors', title: 'Collinear and Non-collinear Vectors' },
        { slug: 'linear-combination-vectors', title: 'Linear Combination of Vectors' },
      ]
    },
    {
      id: 'statistics-and-probability', title: 'Statistics and Probability', hours: 12, topics: [
        { slug: 'measure-of-dispersion', title: 'Measure of Dispersion' },
        { slug: 'probability-independent-cases', title: 'Probability' },
      ]
    },
    {
      id: 'calculus', title: 'Calculus', hours: 48, topics: [
        { slug: 'limits-of-function', title: 'Limits of a Function' },
        { slug: 'indeterminate-forms', title: 'Indeterminate Forms' },
        { slug: 'algebraic-properties-of-limits', title: 'Algebraic Properties of Limits' },
        { slug: 'limits-algebraic-trig-exp-log', title: 'Limits of Algebraic, Trig, Exp & Log Functions' },
        { slug: 'continuity-of-function', title: 'Continuity of a Function' },
        { slug: 'types-of-discontinuity', title: 'Types of Discontinuity' },
        { slug: 'graphs-of-discontinuous-function', title: 'Graphs of Discontinuous Function' },
        { slug: 'derivatives-definition', title: 'Derivatives: Definition' },
        { slug: 'derivatives-algebraic-trig', title: 'Derivatives of Algebraic & Trig Functions' },
        { slug: 'derivatives-inverse-trig-exp-log', title: 'Derivatives of Inverse Trig, Exp & Log Functions' },
        { slug: 'rules-of-differentiation', title: 'Rules of Differentiation' },
        { slug: 'parametric-implicit-derivatives', title: 'Parametric and Implicit Functions' },
        { slug: 'higher-order-derivatives', title: 'Higher Order Derivatives' },
        { slug: 'geometric-interpretation-derivative', title: 'Geometric Interpretation of Derivative' },
        { slug: 'monotonicity-extreme-values', title: 'Monotonicity and Extreme Values' },
        { slug: 'concavity-points-of-inflection', title: 'Concavity and Points of Inflection' },
        { slug: 'anti-derivatives-integration', title: 'Anti-derivatives: Integration' },
        { slug: 'integration-substitution-parts', title: 'Integration by Substitution and Parts' },
        { slug: 'definite-integral', title: 'The Definite Integral' },
        { slug: 'area-under-curve', title: 'Area Under Curve' },
        { slug: 'area-between-two-curves', title: 'Area Between Two Curves' },
      ]
    },
    {
      id: 'computational-methods-or-mechanics', title: 'Computational Methods or Mechanics', hours: 12, topics: [
        { slug: 'numerical-computation-roots', title: 'Numerical Computation: Roots of Equations' },
        { slug: 'numerical-integration', title: 'Numerical Integration' },
        { slug: 'mechanics-statics', title: 'Mechanics: Statics' },
        { slug: 'mechanics-dynamics', title: 'Mechanics: Dynamics' },
      ]
    },
  ]},
  // Physics — full syllabus
  { classSlug: 'class-11-notes', subjectSlug: 'physics', units: [
    { id: 'physical-quantities', title: 'Physical Quantities', topics: [
      { slug: 'precision-significant-figures', title: 'Precision and Significant Figures' },
      { slug: 'dimensions-dimensional-analysis', title: 'Dimensions and Dimensional Analysis' },
    ]},
    { id: 'vectors', title: 'Vectors', topics: [
      { slug: 'triangle-parallelogram-polygon-laws', title: 'Triangle, Parallelogram and Polygon Laws' },
      { slug: 'resolution-unit-vectors', title: 'Resolution of Vectors and Unit Vectors' },
      { slug: 'scalar-vector-products', title: 'Scalar and Vector Products' },
    ]},
    { id: 'kinematics', title: 'Kinematics', topics: [
      { slug: 'instantaneous-velocity-acceleration', title: 'Instantaneous Velocity and Acceleration' },
      { slug: 'relative-velocity', title: 'Relative Velocity' },
      { slug: 'equation-of-motion-graphical', title: 'Equation of Motion (Graphical)' },
      { slug: 'freely-falling-body', title: 'Motion of a Freely Falling Body' },
      { slug: 'projectile-motion', title: 'Projectile Motion' },
    ]},
    { id: 'dynamics', title: 'Dynamics', topics: [
      { slug: 'linear-momentum-impulse', title: 'Linear Momentum and Impulse' },
      { slug: 'conservation-linear-momentum', title: 'Conservation of Linear Momentum' },
      { slug: 'newton-laws-application', title: 'Application of Newton\'s Laws' },
      { slug: 'torque-equilibrium', title: 'Moment, Torque and Equilibrium' },
      { slug: 'solid-friction', title: 'Solid Friction' },
    ]},
    { id: 'work-energy-power', title: 'Work, Energy and Power', topics: [
      { slug: 'work-constant-variable-force', title: 'Work Done by Constant and Variable Force' },
      { slug: 'power', title: 'Power' },
      { slug: 'work-energy-theorem', title: 'Work-Energy Theorem' },
      { slug: 'conservation-energy', title: 'Conservation of Energy' },
      { slug: 'collisions', title: 'Elastic and Inelastic Collisions' },
    ]},
    { id: 'circular-motion', title: 'Circular Motion', topics: [
      { slug: 'angular-displacement-velocity', title: 'Angular Displacement, Velocity and Acceleration' },
      { slug: 'centripetal-acceleration-force', title: 'Centripetal Acceleration and Force' },
      { slug: 'conical-pendulum', title: 'Conical Pendulum' },
      { slug: 'vertical-circle', title: 'Motion in a Vertical Circle' },
      { slug: 'banking-applications', title: 'Applications of Banking' },
    ]},
    { id: 'gravitation', title: 'Gravitation', topics: [
      { slug: 'newton-law-gravitation', title: 'Newton\'s Law of Gravitation' },
      { slug: 'gravitational-field-strength', title: 'Gravitational Field Strength' },
      { slug: 'gravitational-potential-energy', title: 'Gravitational Potential and Potential Energy' },
      { slug: 'variation-g-altitude-depth', title: 'Variation in g due to Altitude and Depth' },
      { slug: 'centre-mass-gravity', title: 'Centre of Mass and Centre of Gravity' },
      { slug: 'satellite-motion', title: 'Motion of a Satellite' },
      { slug: 'escape-velocity', title: 'Escape Velocity' },
      { slug: 'geostationary-satellite', title: 'Geostationary Satellite' },
      { slug: 'gps', title: 'GPS' },
    ]},
    { id: 'elasticity', title: 'Elasticity', topics: [
      { slug: 'hooke-law-force-constant', title: 'Hooke\'s Law and Force Constant' },
      { slug: 'stress-strain-elasticity', title: 'Stress, Strain, Elasticity and Plasticity' },
      { slug: 'elastic-modulus', title: 'Elastic Modulus (Young, Bulk, Shear)' },
      { slug: 'poisson-ratio', title: 'Poisson\'s Ratio' },
      { slug: 'elastic-potential-energy', title: 'Elastic Potential Energy' },
    ]},
    { id: 'heat-and-temperature', title: 'Heat and Temperature', topics: [
      { slug: 'thermal-energy-heat-temperature', title: 'Thermal Energy, Heat and Temperature' },
      { slug: 'thermal-equilibrium-zeroth-law', title: 'Thermal Equilibrium and Zeroth Law' },
    ]},
    { id: 'thermal-expansion', title: 'Thermal Expansion', topics: [
      { slug: 'linear-expansion', title: 'Linear Expansion' },
      { slug: 'cubical-superficial-expansion', title: 'Cubical and Superficial Expansion' },
      { slug: 'liquid-expansion', title: 'Liquid Expansion' },
      { slug: 'dulong-petit-method', title: 'Dulong and Petit Method' },
    ]},
    { id: 'quantity-of-heat', title: 'Quantity of Heat', topics: [
      { slug: 'newton-law-cooling', title: 'Newton\'s Law of Cooling' },
      { slug: 'specific-heat-capacity', title: 'Specific Heat Capacity' },
      { slug: 'change-of-phases-latent-heat', title: 'Change of Phases and Latent Heat' },
      { slug: 'triple-point', title: 'Triple Point' },
    ]},
    { id: 'rate-of-heat-flow', title: 'Rate of Heat Flow', topics: [
      { slug: 'conduction-thermal-conductivity', title: 'Conduction and Thermal Conductivity' },
      { slug: 'convection', title: 'Convection' },
      { slug: 'radiation-black-body', title: 'Radiation and Black-body Radiation' },
      { slug: 'stefan-boltzmann-law', title: 'Stefan-Boltzmann Law' },
    ]},
    { id: 'ideal-gas', title: 'Ideal Gas', topics: [
      { slug: 'ideal-gas-equation', title: 'Ideal Gas Equation' },
      { slug: 'kinetic-molecular-model', title: 'Kinetic-Molecular Model' },
      { slug: 'boltzmann-rms-speed', title: 'Boltzmann Constant and RMS Speed' },
      { slug: 'heat-capacities-gases', title: 'Heat Capacities of Gases' },
    ]},
    { id: 'reflection-at-curved-mirror', title: 'Reflection at Curved Mirror', topics: [
      { slug: 'mirror-formula', title: 'Mirror Formula' },
    ]},
    { id: 'refraction-at-plane-surfaces', title: 'Refraction at Plane Surfaces', topics: [
      { slug: 'laws-refraction-refractive-index', title: 'Laws of Refraction' },
      { slug: 'lateral-shift', title: 'Lateral Shift' },
      { slug: 'total-internal-reflection', title: 'Total Internal Reflection' },
    ]},
    { id: 'refraction-through-prisms', title: 'Refraction through Prisms', topics: [
      { slug: 'minimum-deviation', title: 'Minimum Deviation Condition' },
      { slug: 'prism-deviation-formula', title: 'Prism Formula' },
    ]},
    { id: 'lenses', title: 'Lenses', topics: [
      { slug: 'lens-maker-formula', title: 'Lens Maker\'s Formula' },
      { slug: 'power-of-lens', title: 'Power of a Lens' },
    ]},
    { id: 'dispersion', title: 'Dispersion', topics: [
      { slug: 'dispersive-power', title: 'Dispersive Power' },
      { slug: 'chromatic-aberration', title: 'Chromatic and Spherical Aberration' },
      { slug: 'achromatism', title: 'Achromatism' },
    ]},
    { id: 'electric-charges', title: 'Electric Charges', topics: [
      { slug: 'electric-charges-induction', title: 'Electric Charges and Induction' },
      { slug: 'coulomb-law', title: 'Coulomb\'s Law' },
    ]},
    { id: 'electric-field', title: 'Electric Field', topics: [
      { slug: 'electric-field-point-charges', title: 'Electric Field due to Point Charges' },
      { slug: 'gauss-law', title: 'Gauss Law' },
      { slug: 'gauss-law-applications', title: 'Applications of Gauss Law' },
    ]},
    { id: 'potential-potential-difference-and-potential-energy', title: 'Potential, PD and PE', topics: [
      { slug: 'potential-difference-point-charge', title: 'Potential Difference and Point Charge' },
      { slug: 'equipotential-surfaces', title: 'Equipotential Lines and Surfaces' },
      { slug: 'potential-gradient', title: 'Potential Gradient' },
    ]},
    { id: 'capacitor', title: 'Capacitor', topics: [
      { slug: 'capacitance-parallel-plate', title: 'Capacitance and Parallel Plate Capacitor' },
      { slug: 'combination-capacitors', title: 'Combination of Capacitors' },
      { slug: 'energy-charged-capacitor', title: 'Energy of Charged Capacitor' },
      { slug: 'dielectric-effect', title: 'Effect of Dielectric' },
    ]},
    { id: 'dc-circuits', title: 'DC Circuits', topics: [
      { slug: 'electric-current-drift-velocity', title: 'Electric Current and Drift Velocity' },
      { slug: 'ohms-law-resistance', title: 'Ohm\'s Law and Resistance' },
      { slug: 'series-parallel-resistors', title: 'Resistors in Series and Parallel' },
      { slug: 'potential-divider', title: 'Potential Divider' },
      { slug: 'emf-internal-resistance', title: 'EMF and Internal Resistance' },
      { slug: 'work-power-circuits', title: 'Work and Power in Circuits' },
    ]},
    { id: 'nuclear-physics', title: 'Nuclear Physics', topics: [
      { slug: 'nucleus-discovery', title: 'Discovery of Nucleus' },
      { slug: 'mass-energy-binding-energy', title: 'Mass-Energy and Binding Energy' },
      { slug: 'fission-fusion', title: 'Nuclear Fission and Fusion' },
    ]},
    { id: 'solids', title: 'Solids', topics: [
      { slug: 'energy-bands', title: 'Energy Bands in Solids' },
      { slug: 'semiconductors', title: 'Intrinsic and Extrinsic Semiconductors' },
    ]},
    { id: 'recent-trends-in-physics', title: 'Recent Trends in Physics', topics: [
      { slug: 'particle-physics', title: 'Particle Physics' },
      { slug: 'universe-big-bang', title: 'Universe and Big Bang' },
      { slug: 'dark-matter-black-holes', title: 'Dark Matter, Black Holes and Gravitational Waves' },
    ]},
  ]},
  // Chemistry
  { classSlug: 'class-11-notes', subjectSlug: 'chemistry', units: [
    { id: 'foundation-and-fundamentals', title: 'Foundation and Fundamentals', topics: [
      { slug: 'introduction-importance-chemistry', title: 'Introduction and Importance of Chemistry' },
      { slug: 'basic-concepts-atoms-molecules', title: 'Basic Concepts: Atoms, Molecules, Formulas' },
      { slug: 'percentage-composition', title: 'Percentage Composition' },
    ]},
    { id: 'stoichiometry', title: 'Stoichiometry', topics: [
      { slug: 'dalton-atomic-theory', title: 'Dalton\'s Atomic Theory' },
      { slug: 'laws-stoichiometry', title: 'Laws of Stoichiometry' },
      { slug: 'avogadro-law', title: 'Avogadro\'s Law' },
      { slug: 'mole-concept', title: 'Mole Concept' },
      { slug: 'limiting-reactant', title: 'Limiting Reactant' },
      { slug: 'yield-calculations', title: 'Theoretical and % Yield' },
      { slug: 'empirical-molecular-formula', title: 'Empirical and Molecular Formula' },
    ]},
    { id: 'atomic-structure', title: 'Atomic Structure', topics: [
      { slug: 'rutherford-model', title: 'Rutherford\'s Atomic Model' },
      { slug: 'bohr-postulates', title: 'Bohr\'s Postulates' },
      { slug: 'hydrogen-spectrum', title: 'Hydrogen Spectrum' },
      { slug: 'bohr-defects', title: 'Defects of Bohr\'s Theory' },
      { slug: 'de-broglie-waves', title: 'de Broglie Matter Waves' },
      { slug: 'heisenberg-uncertainty', title: 'Heisenberg Uncertainty Principle' },
      { slug: 'quantum-numbers', title: 'Quantum Numbers' },
      { slug: 'orbitals-shapes', title: 'Orbitals and Shapes' },
      { slug: 'aufbau-pauli-hund', title: 'Aufbau, Pauli and Hund\'s Rules' },
    ]},
    { id: 'classification-of-elements', title: 'Classification of Elements', topics: [
      { slug: 'modern-periodic-law', title: 'Modern Periodic Law' },
      { slug: 'periodic-trends', title: 'Periodic Trends' },
    ]},
    { id: 'chemical-bonding', title: 'Chemical Bonding', topics: [
      { slug: 'ionic-covalent-bond', title: 'Ionic and Covalent Bond' },
      { slug: 'vsepr-theory', title: 'VSEPR Theory' },
      { slug: 'hybridization', title: 'Hybridization' },
      { slug: 'molecular-orbital-theory', title: 'Molecular Orbital Theory' },
    ]},
    { id: 'oxidation-reduction', title: 'Oxidation and Reduction', topics: [
      { slug: 'redox-concepts', title: 'Redox Concepts' },
      { slug: 'balancing-redox', title: 'Balancing Redox Reactions' },
      { slug: 'electrolysis', title: 'Electrolysis' },
    ]},
    { id: 'states-of-matter', title: 'States of Matter', topics: [
      { slug: 'gas-laws', title: 'Gas Laws' },
      { slug: 'kinetic-theory-gas', title: 'Kinetic Theory of Gases' },
      { slug: 'real-gas-deviation', title: 'Real Gas Deviation' },
      { slug: 'liquid-state', title: 'Liquid State' },
      { slug: 'solid-state', title: 'Solid State' },
    ]},
    { id: 'chemical-equilibrium', title: 'Chemical Equilibrium', topics: [
      { slug: 'dynamic-equilibrium', title: 'Dynamic Equilibrium' },
      { slug: 'law-mass-action', title: 'Law of Mass Action' },
      { slug: 'le-chateliers-principle', title: 'Le Chatelier\'s Principle' },
    ]},
    { id: 'chemistry-of-non-metals', title: 'Chemistry of Non-metals', topics: [
      { slug: 'hydrogen', title: 'Hydrogen' },
      { slug: 'oxygen', title: 'Oxygen' },
      { slug: 'ozone', title: 'Ozone' },
      { slug: 'nitrogen', title: 'Nitrogen' },
      { slug: 'halogens', title: 'Halogens' },
      { slug: 'carbon', title: 'Carbon' },
      { slug: 'sulphur', title: 'Sulphur' },
    ]},
    { id: 'chemistry-of-metals', title: 'Chemistry of Metals', topics: [
      { slug: 'metallurgical-principles', title: 'Metallurgical Principles' },
      { slug: 'alkali-metals', title: 'Alkali Metals' },
      { slug: 'alkaline-earth-metals', title: 'Alkaline Earth Metals' },
    ]},
    { id: 'bio-inorganic-chemistry', title: 'Bio-inorganic Chemistry', topics: [
      { slug: 'bio-inorganic-intro', title: 'Bio-inorganic Chemistry Introduction' },
      { slug: 'metal-ions-biological-systems', title: 'Metal Ions in Biological Systems' },
    ]},
    { id: 'basic-concept-organic', title: 'Basic Concept of Organic Chemistry', topics: [
      { slug: 'organic-chemistry-intro', title: 'Introduction to Organic Chemistry' },
      { slug: 'classification-organic', title: 'Classification of Organic Compounds' },
    ]},
    { id: 'fundamental-principles-organic', title: 'Fundamental Principles of Organic Chemistry', topics: [
      { slug: 'iupac-nomenclature', title: 'IUPAC Nomenclature' },
      { slug: 'isomerism', title: 'Isomerism' },
      { slug: 'reaction-mechanism', title: 'Reaction Mechanism' },
      { slug: 'inductive-effect', title: 'Inductive Effect' },
      { slug: 'resonance-effect', title: 'Resonance Effect' },
    ]},
    { id: 'hydrocarbons', title: 'Hydrocarbons', topics: [
      { slug: 'alkanes', title: 'Alkanes' },
      { slug: 'alkenes', title: 'Alkenes' },
      { slug: 'alkynes', title: 'Alkynes' },
    ]},
    { id: 'aromatic-hydrocarbons', title: 'Aromatic Hydrocarbons', topics: [
      { slug: 'aromatic-compounds', title: 'Aromatic Compounds' },
      { slug: 'benzene', title: 'Benzene' },
    ]},
    { id: 'applied-chemistry', title: 'Fundamentals of Applied Chemistry', topics: [
      { slug: 'chemical-industry', title: 'Chemical Industry' },
    ]},
    { id: 'modern-manufactures', title: 'Modern Chemical Manufactures', topics: [
      { slug: 'hber-process', title: 'Haber Process' },
      { slug: 'contact-process', title: 'Contact Process' },
      { slug: 'solvay-process', title: 'Solvay Process' },
    ]},
  ]},
  // Biology
  { classSlug: 'class-11-notes', subjectSlug: 'biology', units: [
    { id: 'introduction-to-biology', title: 'Introduction to Biology', topics: [
      { slug: 'scope-fields-biology', title: 'Scope and Fields of Biology' },
      { slug: 'relation-other-sciences', title: 'Relation with Other Sciences' },
    ]},
    { id: 'biomolecules-and-cell-biology', title: 'Biomolecules and Cell Biology', topics: [
      { slug: 'biomolecules-functions', title: 'Biomolecules: Functions' },
      { slug: 'cell-introduction', title: 'Cell: Introduction' },
      { slug: 'eukaryotic-cell-structure', title: 'Eukaryotic Cell Structure' },
      { slug: 'cell-division', title: 'Cell Division' },
    ]},
    { id: 'floral-diversity', title: 'Floral Diversity', topics: [
      { slug: 'life-classification', title: 'Three Domains and Classification' },
      { slug: 'fungi', title: 'Fungi' },
      { slug: 'algae', title: 'Algae' },
      { slug: 'bryophytes', title: 'Bryophytes' },
      { slug: 'pteridophytes', title: 'Pteridophytes' },
      { slug: 'gymnosperms', title: 'Gymnosperms' },
      { slug: 'angiosperms', title: 'Angiosperms' },
    ]},
    { id: 'introductory-microbiology', title: 'Introductory Microbiology', topics: [
      { slug: 'monera-bacteria', title: 'Monera and Bacteria' },
      { slug: 'virus', title: 'Virus' },
      { slug: 'biotech-microbiology', title: 'Biotechnology in Microbiology' },
    ]},
    { id: 'ecology', title: 'Ecology', topics: [
      { slug: 'ecosystem-ecology', title: 'Ecosystem Ecology' },
      { slug: 'food-chain-web', title: 'Food Chain and Food Web' },
      { slug: 'biogeochemical-cycles', title: 'Biogeochemical Cycles' },
      { slug: 'ecological-adaptation', title: 'Ecological Adaptation' },
      { slug: 'ecological-imbalances', title: 'Ecological Imbalances' },
    ]},
    { id: 'vegetation', title: 'Vegetation', topics: [
      { slug: 'vegetation-types', title: 'Types of Vegetation in Nepal' },
      { slug: 'conservation-in-situ-ex-situ', title: 'In-situ and Ex-situ Conservation' },
    ]},
    { id: 'evolutionary-biology', title: 'Evolutionary Biology', topics: [
      { slug: 'origin-life', title: 'Origin of Life' },
      { slug: 'evidences-evolution', title: 'Evidences of Evolution' },
      { slug: 'theories-evolution', title: 'Theories of Evolution' },
      { slug: 'human-evolution', title: 'Human Evolution' },
    ]},
    { id: 'faunal-diversity', title: 'Faunal Diversity', topics: [
      { slug: 'protista-protozoa', title: 'Protista and Protozoa' },
      { slug: 'animalia-phyla', title: 'Animalia: Phyla Classification' },
      { slug: 'earthworm', title: 'Earthworm' },
      { slug: 'frog', title: 'Frog' },
    ]},
    { id: 'biota-and-environment', title: 'Biota and Environment', topics: [
      { slug: 'animal-adaptation', title: 'Animal Adaptation' },
      { slug: 'animal-behavior', title: 'Animal Behavior' },
      { slug: 'environmental-pollution', title: 'Environmental Pollution' },
    ]},
    { id: 'conservation-biology', title: 'Conservation Biology', topics: [
      { slug: 'biodiversity-conservation', title: 'Biodiversity and Conservation' },
      { slug: 'protected-areas', title: 'Protected Areas and Wildlife' },
    ]},
  ]},
  // ═══════════════════════════════════════════════════════════════════
  // CLASS 12 NOTES
  // ═══════════════════════════════════════════════════════════════════
  { classSlug: 'class-12-notes', subjectSlug: 'mathematics', units: [
    { id: 'limits-and-continuity', title: 'Limits and Continuity', topics: [
      { slug: 'concept-limit', title: 'Concept of Limit' },
      { slug: 'standard-limits-evaluation', title: 'Standard Limits and Evaluation' },
      { slug: 'indeterminate-forms-12', title: 'Indeterminate Forms' },
      { slug: 'continuity-functions-12', title: 'Continuity of Functions' },
      { slug: 'differentiability', title: 'Differentiability' },
    ]},
    { id: 'differentiation', title: 'Differentiation', topics: [
      { slug: 'derivatives-algebraic-trig', title: 'Derivatives of Algebraic and Trig Functions' },
      { slug: 'chain-product-quotient-rules', title: 'Chain, Product and Quotient Rules' },
      { slug: 'parametric-implicit-functions', title: 'Parametric and Implicit Functions' },
      { slug: 'higher-order-derivatives-12', title: 'Higher Order Derivatives' },
      { slug: 'logarithmic-differentiation', title: 'Logarithmic Differentiation' },
      { slug: 'leibniz-theorem', title: 'Leibniz\'s Theorem' },
      { slug: 'tangent-normal', title: 'Tangent and Normal' },
      { slug: 'maxima-minima', title: 'Maxima and Minima' },
      { slug: 'applications-derivative', title: 'Applications of Derivatives' },
    ]},
    { id: 'integration', title: 'Integration', topics: [
      { slug: 'integration-inverse-differentiation', title: 'Integration as Inverse of Differentiation' },
      { slug: 'methods-integration', title: 'Methods: Substitution and Parts' },
      { slug: 'definite-integrals', title: 'Definite Integrals' },
      { slug: 'trigonometric-integration', title: 'Integration of Trigonometric Functions' },
      { slug: 'area-under-curve-12', title: 'Area Under Curve' },
      { slug: 'area-between-curves-12', title: 'Area Between Two Curves' },
    ]},
    { id: 'differential-equations', title: 'Differential Equations', topics: [
      { slug: 'formation-differential-equations', title: 'Formation of Differential Equations' },
      { slug: 'variable-separable', title: 'Variable Separable Equations' },
      { slug: 'homogeneous-linear-de', title: 'Homogeneous and Linear DEs' },
      { slug: 'growth-decay-applications', title: 'Growth and Decay Applications' },
    ]},
    { id: 'vector-algebra', title: 'Vector Algebra', topics: [
      { slug: 'vector-quantities-types', title: 'Vector Quantities and Types' },
      { slug: 'vector-addition-subtraction', title: 'Addition and Subtraction' },
      { slug: 'dot-product-applications', title: 'Dot Product Applications' },
      { slug: 'cross-product-applications', title: 'Cross Product Applications' },
      { slug: 'triple-products', title: 'Triple Products' },
    ]},
    { id: 'three-dimensional-geometry', title: 'Three Dimensional Geometry', topics: [
      { slug: 'direction-cosines-ratios', title: 'Direction Cosines and Ratios' },
      { slug: 'equation-line-space', title: 'Equation of a Line in Space' },
      { slug: 'equation-plane', title: 'Equation of a Plane' },
      { slug: 'angle-lines-planes', title: 'Angle Between Lines and Planes' },
      { slug: 'distance-point-plane', title: 'Distance of Point from Plane' },
    ]},
    { id: 'linear-programming', title: 'Linear Programming', topics: [
      { slug: 'lpp-formulation', title: 'LPP Formulation' },
      { slug: 'graphical-method-lpp', title: 'Graphical Method' },
      { slug: 'maximization-minimization', title: 'Maximization and Minimization' },
    ]},
    { id: 'probability-12', title: 'Probability', topics: [
      { slug: 'conditional-probability', title: 'Conditional Probability' },
      { slug: 'bayes-theorem', title: 'Bayes\' Theorem' },
      { slug: 'random-variable-distribution', title: 'Random Variable and Distribution' },
      { slug: 'mean-variance-rv', title: 'Mean, Variance of Random Variable' },
      { slug: 'binomial-distribution', title: 'Binomial Distribution' },
      { slug: 'poisson-distribution', title: 'Poisson Distribution' },
    ]},
  ]},
  { classSlug: 'class-12-notes', subjectSlug: 'physics', units: [
    { id: 'electrostatics', title: 'Electrostatics', topics: [
      { slug: 'coulombs-law', title: 'Coulomb\'s Law' },
      { slug: 'electric-field-intensity', title: 'Electric Field Intensity' },
      { slug: 'electric-potential', title: 'Electric Potential' },
      { slug: 'capacitance', title: 'Capacitance' },
      { slug: 'dielectrics', title: 'Dielectrics' },
    ]},
    { id: 'current-electricity', title: 'Current Electricity', topics: [
      { slug: 'electric-current-drift', title: 'Electric Current and Drift Velocity' },
      { slug: 'ohms-law', title: 'Ohm\'s Law' },
      { slug: 'resistors-combination', title: 'Resistors in Combination' },
      { slug: 'kirchhoffs-laws', title: 'Kirchhoff\'s Laws' },
      { slug: 'wheatstone-meter-bridge', title: 'Wheatstone and Meter Bridge' },
      { slug: 'potentiometer', title: 'Potentiometer' },
    ]},
    { id: 'magnetism', title: 'Magnetism', topics: [
      { slug: 'magnetic-force-charges', title: 'Magnetic Force on Moving Charges' },
      { slug: 'biot-savart-law', title: 'Biot-Savart Law' },
      { slug: 'ampere-circuital-law', title: 'Ampere\'s Circuital Law' },
      { slug: 'moving-coil-galvanometer', title: 'Moving Coil Galvanometer' },
    ]},
    { id: 'emi', title: 'Electromagnetic Induction', topics: [
      { slug: 'faradays-laws', title: 'Faraday\'s Laws' },
      { slug: 'lenzs-law', title: 'Lenz\'s Law' },
      { slug: 'self-mutual-induction', title: 'Self and Mutual Induction' },
      { slug: 'lr-circuits', title: 'LR Circuits' },
    ]},
    { id: 'alternating-current', title: 'Alternating Current', topics: [
      { slug: 'ac-voltage-resistor-inductor-capacitor', title: 'AC through R, L, C' },
      { slug: 'lc-oscillations', title: 'LC Oscillations' },
      { slug: 'lcr-circuit', title: 'LCR Series Circuit' },
      { slug: 'transformer', title: 'Transformer' },
    ]},
    { id: 'ray-optics-12', title: 'Ray Optics', topics: [
      { slug: 'mirrors-lenses', title: 'Mirrors and Lenses' },
      { slug: 'optical-instruments', title: 'Optical Instruments' },
    ]},
    { id: 'wave-optics-12', title: 'Wave Optics', topics: [
      { slug: 'huygens-principle', title: 'Huygens\' Principle' },
      { slug: 'young-double-slit', title: 'Young\'s Double Slit' },
      { slug: 'diffraction-polarization', title: 'Diffraction and Polarization' },
    ]},
    { id: 'modern-physics-12', title: 'Modern Physics', topics: [
      { slug: 'photoelectric-effect', title: 'Photoelectric Effect' },
      { slug: 'de-broglie-waves-12', title: 'de Broglie Waves' },
      { slug: 'bohr-atom', title: 'Bohr\'s Atom' },
      { slug: 'nucleus-binding-energy-12', title: 'Nucleus and Binding Energy' },
      { slug: 'semiconductors-devices', title: 'Semiconductors and Devices' },
      { slug: 'logic-gates', title: 'Logic Gates' },
    ]},
    { id: 'communication-systems', title: 'Communication Systems', topics: [
      { slug: 'communication-elements', title: 'Elements of Communication' },
      { slug: 'modulation', title: 'Modulation' },
    ]},
  ]},
  { classSlug: 'class-12-notes', subjectSlug: 'chemistry', units: [
    { id: 'solutions', title: 'Solutions', topics: [
      { slug: 'solution-concentration', title: 'Types and Concentration of Solutions' },
      { slug: 'raoult-law', title: 'Raoult\'s Law' },
      { slug: 'colligative-properties', title: 'Colligative Properties' },
      { slug: 'vant-hoff-factor', title: 'Van\'t Hoff Factor' },
    ]},
    { id: 'electrochemistry', title: 'Electrochemistry', topics: [
      { slug: 'electrode-reactions', title: 'Electrode Reactions' },
      { slug: 'galvanic-cells', title: 'Galvanic Cells' },
      { slug: 'nernst-equation', title: 'Nernst Equation' },
      { slug: 'conductance', title: 'Conductance of Electrolytic Solutions' },
      { slug: 'batteries-fuel-cells', title: 'Batteries and Fuel Cells' },
    ]},
    { id: 'chemical-kinetics', title: 'Chemical Kinetics', topics: [
      { slug: 'reaction-rate', title: 'Rate of Reaction' },
      { slug: 'rate-law-order', title: 'Rate Law and Order' },
      { slug: 'integrated-rate-equations', title: 'Integrated Rate Equations' },
      { slug: 'arrhenius-equation', title: 'Arrhenius Equation' },
    ]},
    { id: 'organic-fundamentals-12', title: 'Organic Chemistry Fundamentals', topics: [
      { slug: 'purification-analysis', title: 'Purification and Analysis' },
      { slug: 'electronic-effects', title: 'Electronic Effects' },
      { slug: 'organic-reactions', title: 'Important Organic Reactions' },
    ]},
    { id: 'hydrocarbons-12', title: 'Hydrocarbons', topics: [
      { slug: 'alkanes-12', title: 'Alkanes' },
      { slug: 'alkenes-12', title: 'Alkenes' },
      { slug: 'alkynes-12', title: 'Alkynes' },
      { slug: 'aromatic-hydrocarbons-12', title: 'Aromatic Hydrocarbons' },
    ]},
    { id: 'alcohols-phenols-ethers-12', title: 'Alcohols, Phenols and Ethers', topics: [
      { slug: 'alcohols', title: 'Alcohols' },
      { slug: 'phenols', title: 'Phenols' },
      { slug: 'ethers', title: 'Ethers' },
    ]},
    { id: 'aldehydes-ketones-acids-12', title: 'Aldehydes, Ketones and Carboxylic Acids', topics: [
      { slug: 'aldehydes-ketones', title: 'Aldehydes and Ketones' },
      { slug: 'carboxylic-acids', title: 'Carboxylic Acids' },
      { slug: 'name-reactions', title: 'Name Reactions' },
    ]},
    { id: 'amines-12', title: 'Amines', topics: [
      { slug: 'amines-preparation-properties', title: 'Amines: Preparation and Properties' },
      { slug: 'diazotisation-coupling', title: 'Diazotisation and Coupling' },
    ]},
    { id: 'biomolecules-12', title: 'Biomolecules', topics: [
      { slug: 'carbohydrates', title: 'Carbohydrates' },
      { slug: 'proteins-enzymes', title: 'Proteins and Enzymes' },
      { slug: 'vitamins-hormones', title: 'Vitamins and Hormones' },
    ]},
    { id: 'chemistry-everyday-life-12', title: 'Chemistry in Everyday Life', topics: [
      { slug: 'medicinal-chemicals', title: 'Medicinal Chemicals' },
      { slug: 'chemical-cleansers', title: 'Chemical Cleansers' },
      { slug: 'food-additives', title: 'Food Additives' },
    ]},
    { id: 'chemistry-element-12', title: 'Chemistry of Elements', topics: [
      { slug: 'p-block-elements', title: 'p-Block Elements' },
      { slug: 'd-block-elements', title: 'd-Block Elements' },
      { slug: 'coordination-compounds', title: 'Coordination Compounds' },
    ]},
  ]},
  { classSlug: 'class-12-notes', subjectSlug: 'biology', units: [
    { id: 'heredity-evolution', title: 'Heredity and Evolution', topics: [
      { slug: 'mendels-laws', title: 'Mendel\'s Laws of Inheritance' },
      { slug: 'incomplete-codominance', title: 'Incomplete Dominance and Codominance' },
      { slug: 'linkage-crossing-over', title: 'Linkage and Crossing Over' },
      { slug: 'sex-determination', title: 'Sex Determination' },
      { slug: 'molecular-basis-inheritance', title: 'Molecular Basis of Inheritance' },
      { slug: 'human-genome-project', title: 'Human Genome Project' },
      { slug: 'evolution-evidence', title: 'Evidences of Evolution' },
      { slug: 'hardy-weinberg', title: 'Hardy-Weinberg Equilibrium' },
    ]},
    { id: 'human-health-diseases', title: 'Human Health and Diseases', topics: [
      { slug: 'pathogens-diseases', title: 'Pathogens and Diseases' },
      { slug: 'immune-system', title: 'Immune System' },
      { slug: 'vaccination', title: 'Vaccination and Immunization' },
      { slug: 'allergy-autoimmune', title: 'Allergy and Autoimmune Diseases' },
    ]},
    { id: 'food-production', title: 'Strategies for Food Production', topics: [
      { slug: 'plant-breeding', title: 'Plant Breeding' },
      { slug: 'single-cell-protein', title: 'Single Cell Protein' },
      { slug: 'animal-husbandry', title: 'Animal Husbandry' },
    ]},
    { id: 'microbes-welfare', title: 'Microbes in Human Welfare', topics: [
      { slug: 'microbes-household', title: 'Microorganisms in Household Products' },
      { slug: 'microbes-industrial', title: 'Industrial Production' },
      { slug: 'bioremediation-biogas', title: 'Bioremediation and Biogas' },
    ]},
    { id: 'biotech-principles', title: 'Biotechnology — Principles', topics: [
      { slug: 'recombinant-dna', title: 'Recombinant DNA Technology' },
      { slug: 'tools-biotech', title: 'Tools: Restriction Enzymes, Vectors' },
      { slug: 'biotech-processes', title: 'Processes: PCR, Gel Electrophoresis' },
    ]},
    { id: 'biotech-applications', title: 'Biotechnology and Its Applications', topics: [
      { slug: 'biotech-agriculture', title: 'Applications in Agriculture' },
      { slug: 'biotech-medicine', title: 'Applications in Medicine' },
      { slug: 'transgenic-animals', title: 'Transgenic Animals' },
    ]},
    { id: 'organisms-environment-12', title: 'Organisms and Environment', topics: [
      { slug: 'adaptations-organisms', title: 'Adaptations of Organisms' },
      { slug: 'population-ecology', title: 'Population Ecology' },
      { slug: 'ecosystem-function', title: 'Ecosystem Structure and Function' },
      { slug: 'nutrient-cycling', title: 'Nutrient Cycling' },
    ]},
    { id: 'biodiversity-conservation-12', title: 'Biodiversity and Conservation', topics: [
      { slug: 'biodiversity-levels', title: 'Levels of Biodiversity' },
      { slug: 'biodiversity-loss', title: 'Biodiversity Loss' },
      { slug: 'conservation-strategies-12', title: 'Conservation Strategies' },
    ]},
    { id: 'environmental-issues-12', title: 'Environmental Issues', topics: [
      { slug: 'air-water-pollution-12', title: 'Air and Water Pollution' },
      { slug: 'solid-waste', title: 'Solid Waste Management' },
      { slug: 'climate-change-12', title: 'Climate Change and Greenhouse Effect' },
    ]},
  ]},
];

// ─── Content Generation Templates ───────────────────────────────────────────

function buildContent(classSlug, subjectSlug, unitId, unitTitle, topicSlug, topicTitle, topicIndex, totalTopics) {
  const numbering = String(topicIndex + 1).padStart(2, '0');
  const fileSlug = `${numbering}-${topicSlug}`;
  const filePath = path.join(
    CONTENT_ROOT, classSlug, subjectSlug, unitId, 'concepts', `${fileSlug}.json`
  );

  // Generate notes based on topic (simplified knowledge base)
  const notes = generateTopicNotes(subjectSlug, unitId, topicSlug, topicTitle);
  const confusion = generateConfusionPoints(subjectSlug, unitId, topicSlug, topicTitle);
  const practice = generatePracticeQuestions(subjectSlug, unitId, topicSlug, topicTitle);
  const universalFacts = generateUniversalFacts(subjectSlug, unitId, topicSlug, topicTitle);

  const content = {
    title: topicTitle,
    unitSlug: unitId,
    topicSlug: topicSlug,
    topicTitle: topicTitle,
    relevance: 100,
    notes,
    confusion,
    practice,
    universalFacts,
    animation3D: unitId,
    motionGraphics: unitId,
  };

  return { content, filePath, fileSlug, numbering, total: totalTopics };
}

function generateTopicNotes(subject, unit, slug, title) {
  // Knowledge-based notes generation
  const notesMap = {
    // ── Math Class 11 ──
    'logic-and-set': [
      "**Statement:** A declarative sentence that is either true or false, but not both.",
      "**Logical connectives:** AND (∧), OR (∨), NOT (¬), implication (→), biconditional (↔).",
      "**Truth table:** A table showing the truth value of a compound statement for all possible combinations of truth values of component statements.",
      "**Tautology:** A statement that is always true. **Contradiction:** A statement that is always false. **Contingency:** Neither tautology nor contradiction.",
      "**Set operations:** Union (∪), intersection (∩), difference (-), complement ('). De Morgan's laws: (A∪B)' = A'∩B' and (A∩B)' = A'∪B'.",
      "**Types of sets:** Empty set, singleton, finite, infinite, equal, subset, proper subset, power set.",
      "**Interval notation:** (a,b) = {x: a<x<b}, [a,b] = {x: a≤x≤b}, (a,b] = {x: a<x≤b}.",
    ],
    'real-numbers': [
      "**Real numbers (ℝ):** All rational and irrational numbers. Represented on the number line.",
      "**Rational numbers (ℚ):** Numbers of the form p/q where p,q ∈ ℤ, q≠0. Terminating or repeating decimals.",
      "**Irrational numbers:** Non-terminating, non-repeating decimals (√2, π, e).",
      "**Absolute value:** |a| = a if a≥0, -a if a<0. Geometrically, distance from origin.",
      "**Interval notation:** Used to represent subsets of real numbers: open (a,b), closed [a,b], half-open (a,b].",
      "**Density property:** Between any two real numbers, there exists another real number (and infinitely many rationals and irrationals).",
    ],
    'function-domain-range': [
      "**Function:** A relation from set A to set B where each element of A is paired with exactly one element of B. Written f: A → B.",
      "**Domain:** The set of all input values (x-values) for which the function is defined.",
      "**Range:** The set of all output values (y-values) produced by the function.",
      "**Type of function:** One-to-one (injective): different inputs give different outputs. Onto (surjective): every element in codomain is mapped. Bijective: both one-to-one and onto.",
      "**Composite function:** (f∘g)(x) = f(g(x)). Domain is {x: x∈dom(g) and g(x)∈dom(f)}.",
      "**Inverse function:** f⁻¹ exists if f is bijective. f⁻¹(f(x)) = x and f(f⁻¹(y)) = y.",
      "**Common functions:** Linear f(x)=ax+b, quadratic f(x)=ax²+bx+c, cubic f(x)=ax³+bx²+cx+d, exponential f(x)=aˣ, logarithmic f(x)=logₐx, trigonometric functions.",
    ],
    'curve-sketching': [
      "**Even function:** f(-x) = f(x) → symmetric about y-axis (e.g., x², cos x).",
      "**Odd function:** f(-x) = -f(x) → symmetric about origin (e.g., x³, sin x).",
      "**Periodic function:** f(x+T) = f(x) for some T>0 (e.g., sin x has period 2π).",
      "**Monotonicity:** Increasing if x₁<x₂ → f(x₁)≤f(x₂). Strictly increasing if f(x₁)<f(x₂).",
      "**Graph of y=x²:** Parabola opening upward, vertex at origin.",
      "**Graph of y=x³:** Passes through origin, increasing everywhere, inflection at origin.",
      "**Graph of y=1/x:** Hyperbola with asymptotes x=0 and y=0.",
      "**Graph of y=eˣ:** Always positive, increasing, horizontal asymptote y=0 as x→-∞.",
      "**Graph of y=ln x:** Defined for x>0, increasing, vertical asymptote x=0.",
    ],
    'sequence-series': [
      "**Arithmetic Progression (AP):** Sequence with common difference d. nth term: aₙ = a + (n-1)d. Sum: Sₙ = n/2[2a + (n-1)d].",
      "**Geometric Progression (GP):** Sequence with common ratio r. nth term: aₙ = arⁿ⁻¹. Sum: Sₙ = a(rⁿ-1)/(r-1) for r≠1.",
      "**Harmonic Progression (HP):** Reciprocals form an AP. nth term: 1/[a+(n-1)d].",
      "**AM-GM-HM relation:** For positive numbers, AM ≥ GM ≥ HM. Equality holds when all numbers are equal.",
      "**Infinite GP sum:** If |r|<1, S∞ = a/(1-r).",
      "**Arithmetic mean:** A.M. of a,b = (a+b)/2. **Geometric mean:** G.M. = √(ab). **Harmonic mean:** H.M. = 2ab/(a+b).",
    ],
    'matrices-determinants': [
      "**Matrix:** Rectangular array of numbers arranged in rows and columns. Order: m×n.",
      "**Transpose:** Aᵀ swaps rows and columns. (Aᵀ)ᵀ = A, (A+B)ᵀ = Aᵀ+Bᵀ.",
      "**Determinant:** Scalar value computed from square matrix. For 2×2: |a b; c d| = ad-bc.",
      "**Properties of determinants:** det(Aᵀ)=det(A), det(AB)=det(A)·det(B), det(kA)=kⁿdet(A) for n×n matrix.",
      "**Minor:** Mᵢⱼ = determinant obtained by deleting row i and column j.",
      "**Cofactor:** Cᵢⱼ = (-1)ⁱ⁺ʲ · Mᵢⱼ.",
      "**Adjoint:** Adjoint(A) = transpose of cofactor matrix.",
      "**Inverse:** A⁻¹ = Adj(A)/det(A), exists only if det(A)≠0.",
      "**System of equations:** AX=B → X=A⁻¹B if A is invertible.",
    ],
    'quadratic-equation': [
      "**Standard form:** ax²+bx+c=0, a≠0.",
      "**Quadratic formula:** x = (-b±√(b²-4ac))/(2a).",
      "**Discriminant:** D = b²-4ac. If D>0: two distinct real roots. D=0: equal real roots. D<0: complex conjugate roots.",
      "**Nature of roots:** Real and distinct (D>0), real and equal (D=0), complex (D<0).",
      "**Sum of roots:** α+β = -b/a. **Product of roots:** αβ = c/a.",
      "**Formation:** Given roots α,β: x²-(α+β)x+αβ=0.",
      "**Common roots:** If αx²+βx+γ=0 and a'x²+b'x+c'=0 share a root, then (βc'-γb')/(γa'-αc') = (γa'-αc')/(αb'-βa').",
    ],
    'complex-number': [
      "**Imaginary unit:** i = √(-1), so i² = -1.",
      "**Complex number:** z = a + bi, where a,b ∈ ℝ. a = Re(z), b = Im(z).",
      "**Conjugate:** z̄ = a - bi. z·z̄ = a²+b² = |z|².",
      "**Modulus:** |z| = √(a²+b²). Properties: |z₁z₂|=|z₁||z₂|, |z₁/z₂|=|z₁|/|z₂|.",
      "**Polar form:** z = r(cosθ + i sinθ) = re^(iθ), where r=|z|, θ=arg(z).",
      "**Square root of complex number:** √(a+bi) = ±(√((r+a)/2) + i·sgn(b)√((r-a)/2)) where r=|z|.",
      "**Geometric representation:** Complex plane with real axis (x) and imaginary axis (y).",
    ],
    'algebra': [
      "Algebra is the branch of mathematics dealing with symbols and the rules for manipulating them.",
      "Key topics include: logic and set theory, real numbers, functions, sequences, matrices, quadratic equations, and complex numbers.",
      "These form the foundation for all higher mathematics including calculus and linear algebra.",
    ],
  };

  // Fallback: generate based on keywords
  const lowerTitle = title.toLowerCase();
  const lowerSlug = slug.toLowerCase();

  if (lowerTitle.includes('limit') || lowerSlug.includes('limit')) {
    return [
      "**Limit concept:** The limit of f(x) as x approaches a describes the value that f(x) approaches as x gets arbitrarily close to a (but not equal to a).",
      "**Notation:** lim(x→a) f(x) = L means f(x) gets arbitrarily close to L as x approaches a.",
      "**Direct substitution:** If f is continuous at a, then lim(x→a) f(x) = f(a).",
      "**Indeterminate forms:** 0/0, ∞/∞, 0·∞, ∞-∞, 0⁰, 1^∞, ∞⁰ require special techniques.",
      "**Standard limits:** lim(x→0) sin(x)/x = 1, lim(x→0) (1-cos x)/x = 0, lim(x→0) (eˣ-1)/x = 1, lim(x→0) ln(1+x)/x = 1.",
      "**Algebraic properties:** lim[f±g] = lim f ± lim g, lim[f·g] = lim f · lim g, lim[f/g] = lim f / lim g (denominator ≠ 0).",
      "**Continuity connection:** f is continuous at a if lim(x→a) f(x) = f(a).",
    ];
  }

  if (lowerTitle.includes('continuity') || lowerSlug.includes('continuity')) {
    return [
      "**Continuity at a point:** f is continuous at x=a if: (1) f(a) exists, (2) lim(x→a) f(x) exists, (3) lim(x→a) f(x) = f(a).",
      "**Continuous on an interval:** f is continuous on [a,b] if continuous at every point in (a,b), right-continuous at a, left-continuous at b.",
      "**Polynomial functions:** Continuous everywhere on ℝ.",
      "**Rational functions:** Continuous everywhere except where denominator = 0.",
      "**Trigonometric functions:** sin x, cos x continuous everywhere; tan x continuous except at x = (2n+1)π/2.",
      "**Exponential and logarithmic:** eˣ continuous everywhere; ln x continuous for x>0.",
      "**Intermediate Value Theorem:** If f is continuous on [a,b] and k is between f(a) and f(b), then there exists c∈(a,b) such that f(c)=k.",
    ];
  }

  if (lowerTitle.includes('derivative') || lowerSlug.includes('deriv')) {
    return [
      "**Derivative definition:** f'(x) = lim(h→0) [f(x+h)-f(x)]/h = lim(Δx→0) Δy/Δx.",
      "**Geometric meaning:** f'(a) is the slope of the tangent line to y=f(x) at x=a.",
      "**Basic derivatives:** d/dx(xⁿ) = nxⁿ⁻¹, d/dx(sin x) = cos x, d/dx(cos x) = -sin x, d/dx(eˣ) = eˣ, d/dx(ln x) = 1/x.",
      "**Product rule:** (fg)' = f'g + fg'.",
      "**Quotient rule:** (f/g)' = (f'g - fg')/g².",
      "**Chain rule:** d/dx[f(g(x))] = f'(g(x))·g'(x).",
      "**Higher order derivatives:** f''(x) = d/dx[f'(x)], f'''(x) = d/dx[f''(x)], etc.",
    ];
  }

  if (lowerTitle.includes('integrat') || lowerSlug.includes('integrat')) {
    return [
      "**Indefinite integral:** ∫f(x)dx = F(x) + C where F'(x) = f(x). C is the constant of integration.",
      "**Basic integrals:** ∫xⁿdx = xⁿ⁺¹/(n+1)+C (n≠-1), ∫1/x dx = ln|x|+C, ∫eˣdx = eˣ+C, ∫sin x dx = -cos x+C.",
      "**Integration by substitution:** ∫f(g(x))g'(x)dx = ∫f(u)du where u=g(x).",
      "**Integration by parts:** ∫u dv = uv - ∫v du.",
      "**Definite integral:** ∫[a to b] f(x)dx = F(b)-F(a) where F'=f (Fundamental Theorem of Calculus).",
      "**Properties:** ∫[a to b] f(x)dx = -∫[b to a] f(x)dx, ∫[a to a] f(x)dx = 0, ∫[a to b] f(x)dx = ∫[a to c] + ∫[c to b].",
    ];
  }

  if (lowerTitle.includes('probability') || lowerSlug.includes('probability')) {
    return [
      "**Probability definition:** P(E) = n(E)/n(S) for classical probability, where n(E) = favorable outcomes, n(S) = total outcomes.",
      "**Axiomatic definition:** P(E)≥0, P(S)=1, P(A∪B) = P(A)+P(B) for disjoint events.",
      "**Complement rule:** P(E') = 1 - P(E).",
      "**Addition rule:** P(A∪B) = P(A)+P(B)-P(A∩B).",
      "**Conditional probability:** P(A|B) = P(A∩B)/P(B), provided P(B)>0.",
      "**Independent events:** A and B are independent if P(A∩B) = P(A)·P(B).",
      "**Multiplication theorem:** P(A∩B) = P(A)·P(B|A) = P(B)·P(A|B).",
      "**Bayes' theorem:** P(Aᵢ|B) = P(Aᵢ)·P(B|Aᵢ) / ΣP(Aⱼ)·P(B|Aⱼ).",
    ];
  }

  if (lowerTitle.includes('vector') || lowerSlug.includes('vector')) {
    return [
      "**Vector:** A quantity having both magnitude and direction. Represented as arrow or bold letter: **a** or a⃗.",
      "**Scalar:** A quantity with magnitude only (mass, temperature, time).",
      "**Vector addition:** Triangle law: place tail of b at head of a; resultant closes triangle. Parallelogram law: diagonal from common tail.",
      "**Scalar multiplication:** ka has magnitude |k|·|a|. Direction same as a if k>0, opposite if k<0.",
      "**Dot product:** **a**·**b** = |a||b|cosθ = a₁b₁+a₂b₂+a₃b₃. Result is scalar.",
      "**Cross product:** **a**×**b** = |a||b|sinθ · n̂. Result is vector perpendicular to both a and b.",
      "**Unit vector:** â = **a**/|**a**|. Standard unit vectors: î, ĵ, k̂ along x,y,z axes.",
      "**Direction cosines:** cosα=a₁/|a|, cosβ=a₂/|a|, cosγ=a₃/|a|, where α,β,γ are angles with axes.",
    ];
  }

  // Generic fallback
  return [
    `**${title}:** This topic covers the fundamental concepts of ${title.toLowerCase()} in the ${subject} curriculum.`,
    `Understanding ${title.toLowerCase()} is essential for solving problems and building higher-level mathematical skills.`,
    `Key definitions and theorems related to ${title.toLowerCase()} should be memorized and practiced regularly.`,
  ];
}

function generateConfusionPoints(subject, unit, slug, title) {
  const confusionMap = {
    'logic-and-set': [
      'Do not confuse "subset" (⊆) with "proper subset" (⊂). A set IS a subset of itself, but NOT a proper subset.',
      'Remember: ∅ ⊆ A for ALL sets A. The empty set is a subset of every set, including itself.',
      'De Morgan\'s Laws: (A∪B)\' = A\'∩B\' and (A∩B)\' = A\'∪B\'. The complement DISTRIBUTES over the operation, flipping it.',
    ],
    'function-domain-range': [
      'The domain is about INPUTS (x-values), the range is about OUTPUTS (y-values). Don\'t mix them up.',
      'f(x) does NOT mean f times x. It means "the value of function f at input x".',
      'For inverse functions: swap x and y, then solve for y. The domain of f becomes the range of f⁻¹ and vice versa.',
    ],
    'sequence-series': [
      'AP vs GP: In AP, you ADD a constant (d). In GP, you MULTIPLY by a constant (r).',
      'The sum formula Sₙ = n/2[2a+(n-1)d] is for AP. Sₙ = a(rⁿ-1)/(r-1) is for GP. Don\'t mix them!',
      'For infinite GP sum S∞ = a/(1-r), you MUST have |r|<1. If |r|≥1, the series diverges.',
    ],
    'matrices-determinants': [
      'Determinants only exist for SQUARE matrices (n×n). You cannot take the determinant of a 2×3 matrix.',
      'det(A+B) ≠ det(A)+det(B) in general. Matrix operations do not distribute over determinants.',
      'A⁻¹ exists ONLY if det(A) ≠ 0. A singular matrix (det=0) has no inverse.',
    ],
    'quadratic-equation': [
      'The discriminant D=b²-4ac determines the NATURE of roots, not their values. Use the quadratic formula for values.',
      'If D<0, roots are COMPLEX (not "no roots"). They come in conjugate pairs: a+bi and a-bi.',
      '"One root common" is different from "both roots common." Check carefully which case applies.',
    ],
    'complex-number': [
      'i = √(-1), so i² = -1. But √(-4) ≠ 2i — it equals 2i (principal square root). Be careful with √(a)·√(b) = √(ab) — this fails for negative a,b.',
      'The modulus |z| is ALWAYS non-negative. |z| = √(a²+b²), not √(a²-b²).',
      'Conjugate z̄ changes the sign of the IMAGINARY part only: if z=a+bi, then z̄=a-bi.',
    ],
  };

  return confusionMap[slug] || [
    `Carefully distinguish between similar-looking concepts in ${title.toLowerCase()}.`,
    `Pay attention to the conditions under which formulas and theorems apply.`,
    `Practice with multiple examples to solidify your understanding.`,
  ];
}

function generatePracticeQuestions(subject, unit, slug, title) {
  const practiceMap = {
    'logic-and-set': [
      'Construct the truth table for (p∧q)→¬r and identify whether it is a tautology, contradiction, or contingency.',
      'If A = {1,2,3,4,5} and B = {3,4,5,6,7}, find (i) A∪B, (ii) A∩B, (iii) A-B, (iv) B-A, (v) A\'∩B\' where U={1,2,...,7}.',
      'Prove De Morgan\'s law: (A∪B)\' = A\'∩B\'.',
      'If n(A)=25, n(B)=40, n(A∪B)=55, find n(A∩B).',
    ],
    'function-domain-range': [
      'Find the domain and range of f(x) = √(4-x²).',
      'If f(x) = 2x+3 and g(x) = x², find (f∘g)(x) and (g∘f)(x). Are they equal?',
      'Find the inverse of f(x) = (2x+1)/(x-3) and state its domain.',
      'Determine whether f(x) = x³ is one-to-one and onto from ℝ to ℝ.',
    ],
    'sequence-series': [
      'Find the 15th term and sum of first 15 terms of the AP: 3, 7, 11, 15, ...',
      'The 3rd term of a GP is 12 and 6th term is 96. Find the GP and the sum of its first 6 terms.',
      'Insert 3 geometric means between 3 and 48.',
      'Find the sum to n terms of the series: 1·2·3 + 2·3·4 + 3·4·5 + ...',
    ],
    'matrices-determinants': [
      'If A = [[1,2],[3,4]], find det(A), adj(A), and A⁻¹.',
      'Solve the system: 2x+3y=8, 4x-y=2 using matrix method.',
      'If A = [[1,0,2],[0,1,1],[2,1,0]], find det(A) using cofactor expansion along first row.',
      'Verify that (AB)ᵀ = BᵀAᵀ for A=[[1,2],[3,4]], B=[[0,1],[1,0]].',
    ],
    'quadratic-equation': [
      'Find the nature of roots of 2x²-3x+5=0. Also find the roots.',
      'If α,β are roots of x²-5x+6=0, form a quadratic equation whose roots are α² and β².',
      'Find k if the equations x²-kx+12=0 and x²-kx+Kx-12=0 have a common root.',
      'Solve: x²-7x+12≤0.',
    ],
    'complex-number': [
      'Express z = 3+4i in polar form.',
      'Find the modulus and argument of z = -1+i√3.',
      'Solve: z² + (1+i)z + i = 0.',
      'If z = 2(cos π/6 + i sin π/6), find z³ using De Moivre\'s theorem.',
    ],
  };

  return practiceMap[slug] || [
    `Solve at least 5 problems on ${title.toLowerCase()} from your textbook.`,
    `Try to derive the key formulas from first principles.`,
    `Create a summary sheet with all important formulas and theorems.`,
    `Practice identifying which method/formula to apply in each problem type.`,
  ];
}

function generateUniversalFacts(subject, unit, slug, title) {
  const factsMap = {
    'logic-and-set': [
      'George Boole (1815-1864) developed Boolean algebra, the foundation of all digital computing.',
      'Georg Cantor (1845-1918) founded set theory and discovered that some infinities are larger than others.',
      'The concept of a function was formalized by Euler in the 18th century and is fundamental to all of mathematics.',
    ],
    'function-domain-range': [
      'The concept of a function is one of the most fundamental ideas in all of mathematics.',
      'Functions model real-world relationships: distance vs time, cost vs quantity, temperature vs altitude.',
      'The vertical line test determines whether a graph represents a function: if any vertical line crosses the graph more than once, it\'s not a function.',
    ],
    'sequence-series': [
      'The story of young Gauss summing 1+2+3+...+100 in seconds is a famous anecdote in mathematics.',
      'Geometric series appear in compound interest calculations, population growth models, and computer science (binary search analysis).',
      'The harmonic series 1+1/2+1/3+... diverges (goes to infinity) even though its terms approach zero — a counterintuitive result.',
    ],
    'matrices-determinants': [
      'Matrices were independently discovered by Japanese mathematician Seki Kōwa (1683) and German mathematician Leibniz (1693).',
      'Determinants are used to find areas of triangles, solve systems of equations, and in computer graphics for transformations.',
      'The Cayley-Hamilton theorem states that every square matrix satisfies its own characteristic equation — a profound result.',
    ],
    'quadratic-equation': [
      'The quadratic formula was known to Babylonian mathematicians over 4000 years ago.',
      'The discriminant concept connects algebra to geometry: D>0 means the parabola crosses the x-axis twice, D=0 means it touches once, D<0 means it never touches.',
      'Quadratic equations model projectile motion, area optimization, and many real-world situations.',
    ],
    'complex-number': [
      'Cardano first encountered complex numbers while solving cubic equations in 1545, though he didn\'t understand them fully.',
      'Gauss gave the first rigorous treatment of complex numbers and proved the Fundamental Theorem of Algebra.',
      'Complex numbers are essential in electrical engineering (AC circuits), quantum mechanics, and signal processing.',
    ],
  };

  return factsMap[slug] || [
    `This topic is a cornerstone of the ${subject} curriculum and appears consistently in examinations.`,
    `Understanding ${title.toLowerCase()} builds the foundation for more advanced topics in mathematics.`,
    `Real-world applications of ${title.toLowerCase()} span engineering, physics, economics, and computer science.`,
  ];
}

// ─── Main Pipeline ──────────────────────────────────────────────────────────

function main() {
  console.log('═'.repeat(70));
  console.log('  CONTENT PIPELINE ORCHESTRATOR');
  console.log('  Subject: All 6 subjects · Class 11 & 12 · NEB Curriculum');
  console.log('═'.repeat(70));

  let stats = {
    totalTopics: 0,
    generated: 0,
    skipped: 0,
    errors: 0,
    subjectsCovered: new Set(),
    nextTarget: null,
  };

  for (const classData of SYLLABUS_ORDER) {
    const { classSlug, subjectSlug, units } = classData;
    const subjectPath = path.join(CONTENT_ROOT, classSlug, subjectSlug);

    if (!fs.existsSync(subjectPath)) {
      fs.mkdirSync(subjectPath, { recursive: true });
      console.log(`\n  📁 Created: ${classSlug}/${subjectSlug}/`);
    }

    for (const unit of units) {
      const unitPath = path.join(subjectPath, unit.id);
      const conceptsPath = path.join(unitPath, 'concepts');
      const planPath = path.join(unitPath, 'plan.json');

      if (!fs.existsSync(conceptsPath)) {
        fs.mkdirSync(conceptsPath, { recursive: true });
      }

      // Load or create plan
      let plan = { metadata: { subject: unit.title, classSlug, subjectSlug, generated_at: new Date().toISOString() }, topics: [] };
      if (fs.existsSync(planPath)) {
        try { plan = JSON.parse(fs.readFileSync(planPath, 'utf8')); } catch(e) {}
      }

      const existingSlugs = new Set(plan.topics.map(t => t.slug));
      const existingFiles = fs.readdirSync(conceptsPath).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));

      let unitGenerated = 0;
      let unitSkipped = 0;

      for (let i = 0; i < unit.topics.length; i++) {
        const topic = unit.topics[i];
        stats.totalTopics++;

        // Check if already generated
        if (existingSlugs.has(topic.slug)) {
          unitSkipped++;
          continue;
        }

        // Check if file exists
        const fileSlug = `${String(i + 1).padStart(2, '0')}-${topic.slug}`;
        if (existingFiles.includes(fileSlug)) {
          unitSkipped++;
          continue;
        }

        // Generate content
        try {
          const { content, filePath } = buildContent(
            classSlug, subjectSlug, unit.id, unit.title,
            topic.slug, topic.title, i, unit.topics.length
          );

          fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');

          // Update plan
          plan.topics.push({
            id: `${unit.id}-topic${String(i + 1).padStart(2, '0')}`,
            title: topic.title,
            slug: topic.slug,
            status: 'committed',
            file: `${fileSlug}.json`,
          });

          fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), 'utf8');

          stats.generated++;
          stats.subjectsCovered.add(`${classSlug}/${subjectSlug}`);
          unitGenerated++;
          stats.nextTarget = `${classSlug}/${subjectSlug}/${unit.id}/${topic.title}`;

          console.log(`  ✅ [${stats.generated}] ${classSlug}/${subjectSlug}/${unit.id} → ${topic.title}`);
        } catch (err) {
          stats.errors++;
          console.error(`  ❌ ERROR generating ${topic.title}: ${err.message}`);
        }
      }

      if (unitGenerated > 0 || unitSkipped > 0) {
        console.log(`     Unit "${unit.title}": +${unitGenerated} generated, ${unitSkipped} skipped`);
      }
    }
  }

  console.log('\n' + '═'.repeat(70));
  console.log(`  SUMMARY: Generated ${stats.generated} topics, skipped ${stats.skipped}, errors: ${stats.errors}`);
  console.log(`  Total pipeline: ${stats.totalTopics} topics`);
  console.log(`  Progress: ${stats.totalTopics > 0 ? Math.round(stats.generated / stats.totalTopics * 100) : 0}%`);
  if (stats.nextTarget) {
    console.log(`  Next target: ${stats.nextTarget}`);
  }
  console.log('═'.repeat(70));
}

main();
