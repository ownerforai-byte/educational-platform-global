/**
 * rail-knowledge-trees — the tree DATA behind every card's hierarchical
 * "Knowledge map" figure (owner request 2026-11-24). Keyed by the exact card
 * title in `home-subject-slides.ts`; `knowledgeTreeSvg` (rail-knowledge-tree.ts)
 * lays each one out as a guard-safe SVG. Three levels on purpose: the concept
 * at the root, its branches in the middle, the examinable facts as leaves.
 */

import type { KnowledgeTreeNode } from "./rail-knowledge-tree";

export const RAIL_KNOWLEDGE_TREES: Record<string, KnowledgeTreeNode> = {
  /* ── PHYSICS ── */
  "Newton's second law — F = ma, and why it holds": {
    label: "F = ma (Newton II)",
    children: [
      {
        label: "Core idea",
        children: [
          { label: "F = dp/dt" },
          { label: "Mass = inertia" },
          { label: "Inertial frame" },
        ],
      },
      {
        label: "Force family",
        children: [
          { label: "Weight mg" },
          { label: "Normal R" },
          { label: "Friction μR" },
          { label: "Tension" },
        ],
      },
      {
        label: "Special cases",
        children: [
          { label: "F = 0 → a = 0" },
          { label: "Circular: mv²/r" },
          { label: "Lift pseudo-force" },
        ],
      },
      {
        label: "Exam route",
        children: [
          { label: "Draw FBD first" },
          { label: "a = (Fcosθ−μR)/m" },
          { label: "v–t slope/area" },
        ],
      },
    ],
  },
  "Work–energy theorem and the stopping-distance family": {
    label: "Work–energy theorem",
    children: [
      {
        label: "Statement",
        children: [
          { label: "W_net = ΔKE" },
          { label: "½mv² − ½mu²" },
        ],
      },
      {
        label: "Energy forms",
        children: [
          { label: "PE = mgh" },
          { label: "Spring ½kx²" },
          { label: "Heat via friction" },
        ],
      },
      {
        label: "Stopping family",
        children: [
          { label: "d = v²/2μg" },
          { label: "d ∝ v²" },
          { label: "Slope term ±sinθ" },
        ],
      },
      {
        label: "Power",
        children: [
          { label: "P = W/t = F·v" },
          { label: "1 hp = 746 W" },
        ],
      },
    ],
  },
  "Universal gravitation, orbital and escape speed": {
    label: "Gravitation",
    children: [
      {
        label: "Newton's law",
        children: [
          { label: "F = Gm₁m₂/r²" },
          { label: "G = 6.67×10⁻¹¹" },
        ],
      },
      {
        label: "Field & g",
        children: [
          { label: "g = GM/R²" },
          { label: "gh: g(1−2h/R)" },
          { label: "gd: g(1−d/R)" },
        ],
      },
      {
        label: "Orbits",
        children: [
          { label: "v_c = √(GM/r)" },
          { label: "T² ∝ r³" },
          { label: "KE = −PE/2" },
        ],
      },
      {
        label: "Escape",
        children: [
          { label: "v_e = √(2GM/R)" },
          { label: "11.2 km/s Earth" },
          { label: "E_total = 0" },
        ],
      },
    ],
  },
  "Ohm's law, drift velocity and network reduction": {
    label: "Current electricity",
    children: [
      {
        label: "Microscopic",
        children: [
          { label: "I = nAev_d" },
          { label: "J = σE" },
        ],
      },
      {
        label: "Ohm's law",
        children: [
          { label: "V = IR" },
          { label: "R = ρL/A" },
          { label: "ρ ∝ temperature" },
        ],
      },
      {
        label: "Networks",
        children: [
          { label: "Series Rₛ = ΣR" },
          { label: "Parallel 1/Rₚ" },
          { label: "Divider rule" },
        ],
      },
      {
        label: "EMF & power",
        children: [
          { label: "ε = I(r+R)" },
          { label: "P = VI = I²R" },
          { label: "Cells: n/m mixes" },
        ],
      },
    ],
  },
  "Lens maker's formula and thin-lens image formation": {
    label: "Thin lenses",
    children: [
      {
        label: "Lens maker",
        children: [
          { label: "1/f = (μ−1)(1/R₁−1/R₂)" },
          { label: "Power P = 1/f" },
        ],
      },
      {
        label: "Thin lens",
        children: [
          { label: "1/v − 1/u = 1/f" },
          { label: "m = v/u" },
        ],
      },
      {
        label: "Image cases",
        children: [
          { label: "u > f: real, inverted" },
          { label: "u < f: virtual, erect" },
          { label: "Combination adds P" },
        ],
      },
      {
        label: "Defects",
        children: [
          { label: "Myopia − lens" },
          { label: "Hypermetropia +" },
        ],
      },
    ],
  },

  /* ── CHEMISTRY ── */
  "The mole concept — the bridge between mass and particles": {
    label: "Mole concept",
    children: [
      {
        label: "The mole",
        children: [
          { label: "6.022×10²³" },
          { label: "Molar mass M" },
        ],
      },
      {
        label: "Conversions",
        children: [
          { label: "n = m/M" },
          { label: "N = nN_A" },
          { label: "V = 22.4n (STP)" },
        ],
      },
      {
        label: "Solutions",
        children: [
          { label: "C = n/V" },
          { label: "Dilution C₁V₁" },
          { label: "Molality vs molarity" },
        ],
      },
      {
        label: "Stoichiometry",
        children: [
          { label: "Balance first" },
          { label: "Limiting reagent" },
          { label: "% yield" },
        ],
      },
    ],
  },
  "Bohr energy levels, line spectra and de Broglie": {
    label: "Bohr model",
    children: [
      {
        label: "Postulates",
        children: [
          { label: "mvr = nh/2π" },
          { label: "ΔE = hν" },
        ],
      },
      {
        label: "Radii & energy",
        children: [
          { label: "r ∝ n²" },
          { label: "E = −13.6/n² eV" },
        ],
      },
      {
        label: "Spectra",
        children: [
          { label: "Lyman → UV" },
          { label: "Balmer → visible" },
          { label: "1/λ = R(1/n₁²−1/n₂²)" },
        ],
      },
      {
        label: "Beyond Bohr",
        children: [
          { label: "de Broglie λ = h/mv" },
          { label: "Heisenberg ΔxΔp" },
        ],
      },
    ],
  },
  "VSEPR shapes and hybridisation — predicting geometry": {
    label: "VSEPR & hybridisation",
    children: [
      {
        label: "VSEPR rule",
        children: [
          { label: "Pairs repel" },
          { label: "LP repels more" },
        ],
      },
      {
        label: "Shapes",
        children: [
          { label: "2 lp-free: linear" },
          { label: "3: trigonal planar" },
          { label: "4: tetrahedral" },
          { label: "H₂O bent, NH₃ pyramidal" },
        ],
      },
      {
        label: "Hybridisation",
        children: [
          { label: "sp: 180°" },
          { label: "sp²: 120°" },
          { label: "sp³: 109.5°" },
        ],
      },
      {
        label: "Polarity",
        children: [
          { label: "Symmetric ⇒ zero dipole" },
          { label: "CO₂ vs H₂O" },
        ],
      },
    ],
  },
  "Kp, Kc and Le Chatelier's principle": {
    label: "Chemical equilibrium",
    children: [
      {
        label: "Kc / Kp",
        children: [
          { label: "Kc = [P]^ν/[R]^ν" },
          { label: "Kp = Kc(RT)^Δn" },
        ],
      },
      {
        label: "Properties",
        children: [
          { label: "Catalyst: no shift" },
          { label: "Only T changes K" },
        ],
      },
      {
        label: "Le Chatelier",
        children: [
          { label: "↑conc → uses it" },
          { label: "↑P → fewer moles" },
          { label: "↑T → endo side" },
        ],
      },
      {
        label: "Industrial",
        children: [
          { label: "Haber: 450 °C, 200 atm" },
          { label: "Contact process" },
        ],
      },
    ],
  },
  "Inductive effect, acidity order and IUPAC naming": {
    label: "Inductive effect & nomenclature",
    children: [
      {
        label: "Polarisation",
        children: [
          { label: "−I: Cl, NO₂, COOH" },
          { label: "+I: alkyl" },
          { label: "Dies in 3–4 bonds" },
        ],
      },
      {
        label: "Acidity",
        children: [
          { label: "More −I ⇒ stronger acid" },
          { label: "CCl₃COOH > CH₃COOH" },
        ],
      },
      {
        label: "IUPAC rules",
        children: [
          { label: "Longest chain" },
          { label: "Lowest locants" },
          { label: "Alphabetical prefixes" },
        ],
      },
      {
        label: "Functional groups",
        children: [
          { label: "−ol, −al, −one, −oic acid" },
          { label: "Priority order" },
        ],
      },
    ],
  },

  /* ── BIOLOGY ── */
  "Cell structure — the labelled diagram every paper asks": {
    label: "Cell structure",
    children: [
      {
        label: "Boundary",
        children: [
          { label: "Cell membrane" },
          { label: "Fluid mosaic" },
          { label: "Cell wall (plant)" },
        ],
      },
      {
        label: "Control centre",
        children: [
          { label: "Nucleus, chromatin" },
          { label: "Nucleolus" },
        ],
      },
      {
        label: "Organelles",
        children: [
          { label: "Mitochondria" },
          { label: "ER + Golgi" },
          { label: "Lysosome, ribosome" },
          { label: "Chloroplast (plant)" },
        ],
      },
      {
        label: "Exam musts",
        children: [
          { label: "Label 8+ parts" },
          { label: "One function each" },
          { label: "Plant vs animal" },
        ],
      },
    ],
  },
  "Mendel's laws — monohybrid, dihybrid and test cross": {
    label: "Mendelian genetics",
    children: [
      {
        label: "Laws",
        children: [
          { label: "Dominance" },
          { label: "Segregation" },
          { label: "Independent assortment" },
        ],
      },
      {
        label: "Ratios",
        children: [
          { label: "Mono: 3:1 / 1:1" },
          { label: "Di: 9:3:3:1" },
        ],
      },
      {
        label: "Crosses",
        children: [
          { label: "Test cross" },
          { label: "Back cross" },
          { label: "Punnett square" },
        ],
      },
      {
        label: "Extensions",
        children: [
          { label: "Incomplete dominance" },
          { label: "Linkage (exception)" },
        ],
      },
    ],
  },
  "Energy flow, Lindeman's 10 % law and ecological pyramids": {
    label: "Ecosystem energetics",
    children: [
      {
        label: "Trophic levels",
        children: [
          { label: "Producers" },
          { label: "Herbivores" },
          { label: "Carnivores" },
        ],
      },
      {
        label: "10 % law",
        children: [
          { label: "Energy ↓ each level" },
          { label: "4–5 levels max" },
        ],
      },
      {
        label: "Pyramids",
        children: [
          { label: "Number: may invert" },
          { label: "Biomass: may invert" },
          { label: "Energy: always upright" },
        ],
      },
      {
        label: "Cycles",
        children: [
          { label: "C, N, water cycles" },
          { label: "Decomposers return" },
        ],
      },
    ],
  },
  "rDNA technology — insulin, PCR and the five steps": {
    label: "rDNA technology",
    children: [
      {
        label: "Tools",
        children: [
          { label: "Restriction enzymes" },
          { label: "Vector (plasmid)" },
          { label: "DNA ligase" },
        ],
      },
      {
        label: "Five steps",
        children: [
          { label: "Isolate DNA" },
          { label: "Cut with EcoRI" },
          { label: "Insert + ligate" },
          { label: "Transfer to host" },
          { label: "Screen marker" },
        ],
      },
      {
        label: "PCR",
        children: [
          { label: "94 °C denature" },
          { label: "60 °C anneal" },
          { label: "72 °C Taq extend" },
        ],
      },
      {
        label: "Applications",
        children: [
          { label: "Human insulin" },
          { label: "Gene therapy" },
          { label: "Golden rice" },
        ],
      },
    ],
  },
  "Hardy–Weinberg equilibrium and carrier frequency": {
    label: "Population genetics",
    children: [
      {
        label: "Alleles",
        children: [
          { label: "p + q = 1" },
          { label: "p = freq (A)" },
        ],
      },
      {
        label: "Genotypes",
        children: [
          { label: "p² = AA" },
          { label: "2pq = Aa" },
          { label: "q² = aa" },
        ],
      },
      {
        label: "Conditions",
        children: [
          { label: "Random mating" },
          { label: "No selection/mutation" },
          { label: "Large population" },
        ],
      },
      {
        label: "Uses",
        children: [
          { label: "q = √(affected)" },
          { label: "Carrier = 2pq" },
          { label: "Evolution = shift" },
        ],
      },
    ],
  },

  /* ── MATHEMATICS ── */
  "Differentiation — first principles to maxima and minima": {
    label: "Differentiation",
    children: [
      {
        label: "Definition",
        children: [
          { label: "f′(x) = lim Δy/Δx" },
          { label: "Slope of tangent" },
        ],
      },
      {
        label: "Rules",
        children: [
          { label: "Product rule" },
          { label: "Quotient rule" },
          { label: "Chain rule" },
        ],
      },
      {
        label: "Standard forms",
        children: [
          { label: "xⁿ → nxⁿ⁻¹" },
          { label: "sin, cos, eˣ, ln x" },
        ],
      },
      {
        label: "Applications",
        children: [
          { label: "Max/min: f′=0" },
          { label: "f″ test" },
          { label: "Rate of change" },
        ],
      },
    ],
  },
  "Compound and multiple angles — the identity toolkit": {
    label: "Compound angles",
    children: [
      {
        label: "sin / cos sums",
        children: [
          { label: "sin(A±B)" },
          { label: "cos(A±B)" },
        ],
      },
      {
        label: "tan forms",
        children: [
          { label: "tan(A±B)" },
          { label: "tan 2A = 2t/(1−t²)" },
        ],
      },
      {
        label: "Multiple angle",
        children: [
          { label: "sin 2A = 2 sinA cosA" },
          { label: "cos 2A: 3 forms" },
          { label: "sin 3A expansion" },
        ],
      },
      {
        label: "Transformation",
        children: [
          { label: "C→D formulas" },
          { label: "Product ⇄ sum" },
        ],
      },
    ],
  },
  "Straight line — slope, angle and distance forms": {
    label: "Straight line",
    children: [
      {
        label: "Slope",
        children: [
          { label: "m = tan θ" },
          { label: "m = (y₂−y₁)/(x₂−x₁)" },
        ],
      },
      {
        label: "Equations",
        children: [
          { label: "y − y₁ = m(x−x₁)" },
          { label: "x/a + y/b = 1" },
          { label: "ax + by + c = 0" },
        ],
      },
      {
        label: "Position",
        children: [
          { label: "Parallel: m₁ = m₂" },
          { label: "⊥: m₁m₂ = −1" },
          { label: "Point-line distance" },
        ],
      },
      {
        label: "Pairs",
        children: [
          { label: "Angle between lines" },
          { label: "Concurrency" },
        ],
      },
    ],
  },
  "Dot and cross product — projection, angle, area": {
    label: "Vector products",
    children: [
      {
        label: "Dot product",
        children: [
          { label: "a·b = |a||b|cosθ" },
          { label: "⊥ ⇔ a·b = 0" },
          { label: "Work = F·d" },
        ],
      },
      {
        label: "Cross product",
        children: [
          { label: "|a×b| = |a||b|sinθ" },
          { label: "∥ ⇔ a×b = 0" },
          { label: "Right-hand rule" },
        ],
      },
      {
        label: "Geometry",
        children: [
          { label: "Parallelogram area" },
          { label: "Triangle = ½|a×b|" },
          { label: "Projection a·b̂" },
        ],
      },
      {
        label: "Components",
        children: [
          { label: "Determinant form" },
          { label: "Unit vector n̂" },
        ],
      },
    ],
  },
  "Probability — addition rule, independence, Bayes": {
    label: "Probability",
    children: [
      {
        label: "Basics",
        children: [
          { label: "0 ≤ P ≤ 1" },
          { label: "P(A′) = 1 − P(A)" },
        ],
      },
      {
        label: "Combining",
        children: [
          { label: "Addition (incl-excl)" },
          { label: "Multiplication" },
          { label: "Independent events" },
        ],
      },
      {
        label: "Conditional",
        children: [
          { label: "P(A|B) = P(A∩B)/P(B)" },
          { label: "Tree diagrams" },
        ],
      },
      {
        label: "Bayes",
        children: [
          { label: "P(A|B) = prior·likeli/ evidence" },
          { label: "Total probability" },
        ],
      },
    ],
  },

  /* ── ENGLISH ── */
  "The twelve tenses — structure, use and time markers": {
    label: "Twelve tenses",
    children: [
      {
        label: "Times",
        children: [
          { label: "Past" },
          { label: "Present" },
          { label: "Future" },
        ],
      },
      {
        label: "Aspects",
        children: [
          { label: "Simple" },
          { label: "Continuous" },
          { label: "Perfect" },
          { label: "Perfect continuous" },
        ],
      },
      {
        label: "Markers",
        children: [
          { label: "ago / yesterday" },
          { label: "now / just / yet" },
          { label: "tomorrow / by" },
        ],
      },
      {
        label: "Exam traps",
        children: [
          { label: "since + point / for + period" },
          { label: "Stative verbs no -ing" },
        ],
      },
    ],
  },
  "Passive voice and indirect speech without losing marks": {
    label: "Voice & speech",
    children: [
      {
        label: "Passive",
        children: [
          { label: "O → S" },
          { label: "be + V3" },
          { label: "by-phrase optional" },
        ],
      },
      {
        label: "Reported speech",
        children: [
          { label: "Backshift tense" },
          { label: "Pronoun shift" },
          { label: "Time-word shift" },
        ],
      },
      {
        label: "Sentence types",
        children: [
          { label: "Statement → that" },
          { label: "Question → if / wh" },
          { label: "Order → to + V1" },
        ],
      },
      {
        label: "Exceptions",
        children: [
          { label: "Universal truth: no shift" },
          { label: "Intransitive: no passive" },
        ],
      },
    ],
  },
  "Essay and paragraph structure that earns full marks": {
    label: "Essay craft",
    children: [
      {
        label: "Introduction",
        children: [
          { label: "Hook" },
          { label: "Context" },
          { label: "Thesis" },
        ],
      },
      {
        label: "Body (PEEL)",
        children: [
          { label: "Point" },
          { label: "Evidence" },
          { label: "Explain" },
          { label: "Link" },
        ],
      },
      {
        label: "Cohesion",
        children: [
          { label: "however / moreover" },
          { label: "One idea per ¶" },
        ],
      },
      {
        label: "Conclusion",
        children: [
          { label: "Restate thesis" },
          { label: "No new facts" },
        ],
      },
    ],
  },
  "Claims, evidence and the fallacies they ask you to spot": {
    label: "Argument & fallacy",
    children: [
      {
        label: "Anatomy",
        children: [
          { label: "Claim" },
          { label: "Evidence" },
          { label: "Warrant" },
        ],
      },
      {
        label: "Attack fallacies",
        children: [
          { label: "Ad hominem" },
          { label: "Straw man" },
        ],
      },
      {
        label: "Logic fallacies",
        children: [
          { label: "Hasty generalisation" },
          { label: "False dilemma" },
          { label: "Post hoc" },
        ],
      },
      {
        label: "Distractions",
        children: [
          { label: "Red herring" },
          { label: "Appeal to popularity" },
        ],
      },
    ],
  },
  "Word formation, idioms and the pairs that trap everyone": {
    label: "Vocabulary building",
    children: [
      {
        label: "Morphology",
        children: [
          { label: "Root: port, spect" },
          { label: "Prefix: un-, re-" },
          { label: "Suffix: -tion, -able" },
        ],
      },
      {
        label: "Idioms",
        children: [
          { label: "Non-literal meaning" },
          { label: "Fixed form" },
        ],
      },
      {
        label: "Collocation",
        children: [
          { label: "heavy rain" },
          { label: "take a decision" },
        ],
      },
      {
        label: "Confusables",
        children: [
          { label: "affect / effect" },
          { label: "principal / principle" },
          { label: "Spelling rules" },
        ],
      },
    ],
  },

  /* ── NEPALI ── */
  "कारक — छ वटै कारक र चिन्ने उपाय": {
    label: "कारक",
    children: [
      {
        label: "परिभाषा",
        children: [
          { label: "क्रियासँग सम्बन्ध" },
          { label: "विभक्ति चिन्ह" },
        ],
      },
      {
        label: "छ भेद",
        children: [
          { label: "कर्ता — ले/ने" },
          { label: "कर्म — लाई" },
          { label: "करण — द्वारा" },
          { label: "सम्प्रदान/अपादान/सम्बन्ध" },
        ],
      },
      {
        label: "विशेष",
        children: [
          { label: "-इ क्रियामा 'ले' नहुने" },
          { label: "शून्य सम्बन्ध" },
        ],
      },
      {
        label: "पहिचान",
        children: [
          { label: "के? कसलाई? सोध्ने" },
          { label: "चिन्ह बेचिन्ने" },
        ],
      },
    ],
  },
  "सन्धि — स्वर र व्यंजनको मेल, विच्छेद र नियम": {
    label: "सन्धि",
    children: [
      {
        label: "अर्थ",
        children: [
          { label: "दुई वर्णको मेल" },
          { label: "विच्छेद = उल्टो" },
        ],
      },
      {
        label: "स्वर सन्धि",
        children: [
          { label: "गुण / दीर्घ" },
          { label: "यण् / वृद्धि" },
        ],
      },
      {
        label: "व्यंजन सन्धि",
        children: [
          { label: "प्रथम / तृतीय" },
          { label: "म् → ङ् / ञ्" },
        ],
      },
      {
        label: "अभ्यास",
        children: [
          { label: "नियम बताई विच्छेद" },
          { label: "उदाहरण देवेश, विद्या" },
        ],
      },
    ],
  },
  "अलंकार — उपमा, रूपक, यमक, अनुप्रास चिन्ने तरिका": {
    label: "अलंकार",
    children: [
      {
        label: "अर्थसूचक",
        children: [
          { label: "उपमा — 'जस्तै'" },
          { label: "रूपक — आरोप" },
        ],
      },
      {
        label: "शब्दसूचक",
        children: [
          { label: "यमक — धेरै अर्थ" },
          { label: "अनुप्रास — वर्ण दोहोरो" },
        ],
      },
      {
        label: "अरू भेद",
        children: [
          { label: "अतिशयोक्ति" },
          { label: "श्लेष" },
        ],
      },
      {
        label: "छेक",
        children: [
          { label: "उपमवाचक देखिए उपमा" },
          { label: "नदेखिए रूपक" },
        ],
      },
    ],
  },
  "निबन्ध लेखन — ढाँचा, शब्दसीमा र गल्तीहरू": {
    label: "निबन्ध लेखन",
    children: [
      {
        label: "भूमिका",
        children: [
          { label: "आकर्षक सुरुवात" },
          { label: "विषय परिचय" },
        ],
      },
      {
        label: "विषयवस्तु",
        children: [
          { label: "एक अनुच्छेद = एक भाव" },
          { label: "उदाहरण + तर्क" },
        ],
      },
      {
        label: "निष्कर्ष",
        children: [
          { label: "सार सङ्कलन" },
          { label: "नयाँ तथ्य हुँदैन" },
        ],
      },
      {
        label: "गल्तीहरू",
        children: [
          { label: "शीर्षकबाट भट्टिने" },
          { label: "शब्दसीमा नहेर्ने" },
        ],
      },
    ],
  },
  "कविता, गीत, कथा, उपन्यास र निबन्धको भेद": {
    label: "साहित्यिक विधा",
    children: [
      {
        label: "पद्य",
        children: [
          { label: "कविता — छन्द" },
          { label: "गीत — सुर/ताल" },
        ],
      },
      {
        label: "गद्य कथा",
        children: [
          { label: "कथा — छोटो, एक मोड" },
          { label: "उपन्यास — लामो कथानक" },
        ],
      },
      {
        label: "निबन्ध",
        children: [
          { label: "तर्क + प्रमाण" },
          { label: "व्यक्तित्व" },
        ],
      },
      {
        label: "पहिचान",
        children: [
          { label: "छन्द → कविता" },
          { label: "कथानक लम्बाइले भेद" },
        ],
      },
    ],
  },
};
