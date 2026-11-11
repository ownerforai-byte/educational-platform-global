/**
 * Derivations — Wave 2 Chemistry (Class 11 + 12) & Biology (Class 12).
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

const cb: DerivationOrTheorem[] = [
  // ═══ CLASS 12 CHEMISTRY ═══
  {
    id: "chem-12-raoults-law-vapour-pressure",
    slug: "raoults-law-vapour-pressure",
    title: "Solutions: Raoult's Law & Relative Lowering of Vapour Pressure",
    subject: "chemistry",
    unit: "Solutions",
    unitId: "solutions",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Solutions)",
    isExtra: true,
    statement:
      "In an ideal solution each component's vapour pressure equals its mole fraction times its pure vapour pressure; a non-volatile solute therefore lowers the solvent vapour pressure in proportion to its mole fraction.",
    coreFormula: "p_A = x_A p_A^0, \\qquad \\frac{p_A^0 - p_A}{p_A^0} = x_B",
    concernedTerms: [
      { term: "Mole fraction", symbol: "x", units: "—", definition: "Component moles divided by total moles." },
      { term: "Relative lowering", symbol: "(p⁰−p)/p⁰", units: "—", definition: "Colligative property equal to solute mole fraction." },
    ],
    assumptions: ["Ideal solution (A–B interactions ≈ A–A, B–B).", "Solute is non-volatile."],
    proofSteps: [
      { stepNumber: 1, title: "Raoult's law for both components", latex: "p_A = x_A p_A^0, \\quad p_B = x_B p_B^0", explanation: "Equilibrium vapour pressure proportional to surface mole fraction." },
      { stepNumber: 2, title: "Non-volatile solute", latex: "p_B \\approx 0 \\Rightarrow p_{total} = p_A = x_A p_A^0 = (1-x_B)p_A^0", explanation: "Only the solvent contributes; total pressure drops by x_B p_A^0." },
      { stepNumber: 3, title: "Relative lowering", latex: "\\frac{p_A^0 - p_A}{p_A^0} = x_B", explanation: "Dividing the lowering by the pure value yields the solute mole fraction — the measurable colligative form." },
    ],
    conclusion:
      "Raoult's law makes vapour pressure a linear function of composition; the relative lowering directly counts solute particles.",
    keyTakeaways: [
      "Colligative ⇒ depends on NUMBER of particles, not identity.",
      "x_B needs moles — this is how molar masses of unknown solutes are measured.",
      "Ideal Raoult behaviour breaks for associating/ dissociating solutes (van't Hoff factor).",
    ],
    examTraps: [
      "Using weight fractions instead of mole fractions.",
      "Forgetting that p⁰ must be the PURE solvent pressure at the same temperature.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Dissociating solute (NaCl)", condition: "van't Hoff factor i", formula: "x_B \\to i\\,x_B", meaning: "Particles multiply; lowering exceeds the formula-value." },
      { name: "Associating solute (acetic acid in benzene)", condition: "i < 1", formula: "\\text{lowering} < x_B", meaning: "Dimers halve the particle count." },
      { name: "Two volatile liquids", condition: "Both obey Raoult", formula: "p_T = x_Ap_A^0 + x_Bp_B^0", meaning: "Basis of distillation and the total-pressure line." },
    ],
    solvedProblems: [],
  },
  {
    id: "chem-12-colligative-properties",
    slug: "colligative-properties-elevation-depression-osmosis",
    title: "Solutions: Colligative Properties — Elevation, Depression & Osmotic Pressure",
    subject: "chemistry",
    unit: "Solutions",
    unitId: "solutions",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Solutions)",
    isExtra: true,
    statement:
      "Dissolved particles raise boiling point, depress freezing point and create osmotic pressure — each proportional to molality/molarity: ΔT_b = K_b·m, ΔT_f = K_f·m, π = cRT.",
    coreFormula: "\\Delta T_b = K_b m, \\quad \\Delta T_f = K_f m, \\quad \\pi = cRT",
    concernedTerms: [
      { term: "Molality", symbol: "m", units: "mol kg⁻¹", definition: "Moles of solute per kg of solvent (temperature-independent)." },
      { term: "Cryoscopic constant", symbol: "K_f", units: "K kg mol⁻¹", definition: "Freezing-point depression per unit molality (water: 1.86)." },
      { term: "Osmotic pressure", symbol: "π", units: "atm", definition: "Pressure needed to stop solvent flow through a semipermeable membrane." },
    ],
    assumptions: ["Dilute solutions.", "Non-volatile, non-electrolyte solute unless i is included."],
    proofSteps: [
      { stepNumber: 1, title: "Vapour-pressure lowering shifts the curves", latex: "p < p^0 \\text{ at every T}", explanation: "The solution's vapour-pressure curve sits below the pure solvent's, moving the boiling point up and freezing point down." },
      { stepNumber: 2, title: "Linear dilute limit", latex: "\\Delta T_b = K_b m,\\ \\Delta T_f = K_f m", explanation: "Clapeyron + Raoult integration gives proportionality to molality — the ebullioscopic/cryoscopic constants." },
      { stepNumber: 3, title: "Osmotic pressure", latex: "\\pi = \\frac{n_B RT}{V} = cRT", explanation: "Van't Hoff: solute particles exert pressure exactly like an ideal gas at the same concentration." },
      { stepNumber: 4, title: "Molar-mass determination", latex: "M_B = \\frac{K_f\\,w_B\\,1000}{\\Delta T_f\\,w_A}", explanation: "Rearranged for molarity/mass problems — the practical payoff of the laws." },
    ],
    conclusion:
      "All three colligative laws count particles; combined with the van't Hoff factor they measure molar masses and degrees of dissociation.",
    keyTakeaways: [
      "Osmotic pressure is the most sensitive — used for macromolecule masses.",
      "K_b/K_f are solvent properties, not solute properties.",
      "Depression helps salt melt ice; elevation helps pressure cooking logic.",
    ],
    examTraps: [
      "Mixing molarity with molality in ΔT formulas.",
      "Forgetting i for electrolytes (ΔT scales with i).",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Electrolyte", condition: "van't Hoff factor i", formula: "\\Delta T = iKm", meaning: "NaCl gives i≈2; CaCl₂ i≈3." },
      { name: "Isotonic solutions", condition: "π₁ = π₂", formula: "c_1 = c_2 \\ (\\text{same }T)", meaning: "Basis of IV-fluid design (0.9% saline)." },
      { name: "Reverse osmosis", condition: "P > π", formula: "\\text{solvent forced out}", meaning: "Desalination principle." },
    ],
    solvedProblems: [],
  },
  {
    id: "chem-12-nernst-equation",
    slug: "nernst-equation-applications",
    title: "Electrochemistry: Nernst Equation & Its Applications",
    subject: "chemistry",
    unit: "Electrochemistry",
    unitId: "electro-chemistry",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Electrochemistry)",
    isExtra: true,
    statement:
      "Cell potential falls with concentration according to E = E° − (RT/nF)ln Q; at equilibrium Q = K and E = 0, linking electrochemistry to equilibrium constants.",
    coreFormula: "E = E^\\circ - \\frac{0.0592}{n}\\log Q, \\qquad E^\\circ = \\frac{0.0592}{n}\\log K",
    concernedTerms: [
      { term: "Reaction quotient", symbol: "Q", units: "—", definition: "Product/reactant concentration ratio at any instant." },
      { term: "Standard potential", symbol: "E°", units: "V", definition: "Cell potential at 1 M, 1 atm, 298 K." },
    ],
    assumptions: ["298 K for the 0.0592 form.", "Reversible cell operation."],
    proofSteps: [
      { stepNumber: 1, title: "Gibbs energy and EMF", latex: "\\Delta G = -nFE", explanation: "Electrical work equals the free-energy change of the cell reaction." },
      { stepNumber: 2, title: "Thermodynamics link", latex: "\\Delta G = \\Delta G^\\circ + RT\\ln Q", explanation: "General free-energy dependence on composition." },
      { stepNumber: 3, title: "Combine", latex: "E = E^\\circ - \\frac{RT}{nF}\\ln Q", explanation: "Substituting ΔG = −nFE into the thermodynamic equation gives the Nernst equation." },
      { stepNumber: 4, title: "Equilibrium limit", latex: "E = 0 \\Rightarrow E^\\circ = \\frac{0.0592}{n}\\log K", explanation: "A dead battery is a cell at equilibrium; this equation measures K electrochemically." },
    ],
    conclusion:
      "The Nernst equation turns concentrations into voltages: E = E° − (0.0592/n)log Q, and at equilibrium hands over log K = nE°/0.0592.",
    keyTakeaways: [
      "Pure solids/liquids and water (solvent) don't appear in Q.",
      "Ten-fold change in Q shifts E by 0.0592/n volts.",
      "pH meters are Nernst devices for H⁺.",
    ],
    examTraps: [
      "Writing log Q with solids included.",
      "Sign errors when the cell is written reversed (anode/cathode swap).",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Standard conditions", condition: "Q = 1", formula: "E = E^\\circ", meaning: "All activities unity." },
      { name: "Concentration cell", condition: "Same electrode, different concentrations", formula: "E = \\frac{0.0592}{n}\\log\\frac{c_2}{c_1}", meaning: "E° cancels — potential from concentration difference alone." },
      { name: "pH measurement (H electrode)", condition: "[H⁺] variable", formula: "E = E^\\circ - 0.0592\\,pH", meaning: "Every pH unit swings the hydrogen electrode 59.2 mV." },
    ],
    solvedProblems: [],
  },
  {
    id: "chem-12-first-order-kinetics-half-life",
    slug: "first-order-kinetics-half-life",
    title: "Chemical Kinetics: First-Order Rate Law & Half-Life",
    subject: "chemistry",
    unit: "Chemical Kinetics",
    unitId: "chemical-kinetics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Kinetics)",
    isExtra: true,
    statement:
      "For a first-order reaction −d[A]/dt = k[A], integration gives ln([A]₀/[A]) = kt with concentration-independent half-life t½ = 0.693/k.",
    coreFormula: "k = \\frac{2.303}{t}\\log\\frac{[A]_0}{[A]}, \\qquad t_{1/2} = \\frac{0.693}{k}",
    concernedTerms: [
      { term: "Rate constant", symbol: "k", units: "s⁻¹ (1st order)", definition: "Proportionality constant of the rate law." },
      { term: "Half-life", symbol: "t½", units: "s", definition: "Time for concentration to fall by half — constant for 1st order." },
    ],
    assumptions: ["First-order dependence on a single reactant.", "Isothermal conditions."],
    proofSteps: [
      { stepNumber: 1, title: "Rate law", latex: "-\\frac{d[A]}{dt} = k[A]", explanation: "First-order definition: rate proportional to concentration." },
      { stepNumber: 2, title: "Separate variables and integrate", latex: "\\int_{[A]_0}^{[A]}\\frac{d[A]}{[A]} = -k\\int_0^t dt \\Rightarrow \\ln\\frac{[A]_0}{[A]} = kt", explanation: "Straightforward separation gives the integrated rate law (log-10 form after multiplying by 2.303)." },
      { stepNumber: 3, title: "Half-life", latex: "t = t_{1/2} \\text{ when } [A] = [A]_0/2 \\Rightarrow t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{k}", explanation: "Substituting [A]₀/2 — the initial concentration cancels, the hallmark of first-order kinetics." },
    ],
    conclusion:
      "First-order reactions decay exponentially with an invariable half-life 0.693/k — the mathematics of radioactive decay and pharmacokinetics alike.",
    keyTakeaways: [
      "Constant t½ is the diagnostic test of first order (graph: log[A] vs t linear).",
      "Successive half-lives cut concentration 100→50→25→12.5%.",
      "k's unit s⁻¹ identifies the order directly.",
    ],
    examTraps: [
      "Using the second-order t½ = 1/k[A]₀ form here.",
      "Natural-log/ten-log mixing without the 2.303 factor.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Zero order", condition: "rate = k", formula: "[A] = [A]_0 - kt,\\ t_{1/2} = \\frac{[A]_0}{2k}", meaning: "Linear concentration fall; t½ depends on [A]₀." },
      { name: "Second order", condition: "rate = k[A]²", formula: "\\frac{1}{[A]} = \\frac{1}{[A]_0} + kt,\\ t_{1/2} = \\frac{1}{k[A]_0}", meaning: "1/[A] vs t linear — the other exam favourite." },
      { name: "Pseudo-first order", condition: "One reactant in vast excess", formula: "k' = k[\\text{excess}]", meaning: "Hydrolysis of ester in water behaves first-order." },
    ],
    solvedProblems: [],
  },
  // ═══ CLASS 11 CHEMISTRY ═══
  {
    id: "chem-11-gas-laws-combined-equation",
    slug: "gas-laws-boyle-charles-combined",
    title: "Gas Laws: Boyle's Law, Charles' Law & the Combined Gas Equation",
    subject: "chemistry",
    unit: "States of Matter",
    unitId: "states-of-matter",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (States of Matter)",
    isExtra: false,
    statement:
      "Boyle (pV ∝ 1 at fixed T), Charles (V ∝ T at fixed p) and Avogadro combine into PV = nRT, the ideal gas equation.",
    coreFormula: "pV = nRT, \\qquad \\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2}",
    concernedTerms: [
      { term: "Universal gas constant", symbol: "R", units: "J K⁻¹ mol⁻¹", definition: "8.314; same for every ideal gas." },
      { term: "STP", symbol: "—", units: "—", definition: "273.15 K, 1 bar (≈22.7 L mol⁻¹) or 1 atm (22.4 L mol⁻¹)." },
    ],
    assumptions: ["Ideal gas: negligible molecular volume, no intermolecular forces.", "Equilibrium states."],
    proofSteps: [
      { stepNumber: 1, title: "Boyle's law", latex: "pV = \\text{const} \\ (T, n \\text{ fixed})", explanation: "Isothermal compression experiment — pressure inversely proportional to volume." },
      { stepNumber: 2, title: "Charles' law", latex: "\\frac{V}{T} = \\text{const} \\ (p, n \\text{ fixed})", explanation: "Volume extrapolates to zero at T = 0 K — the origin of the absolute scale." },
      { stepNumber: 3, title: "Combine into one equation", latex: "\\frac{pV}{T} = \\text{const} = nR \\Rightarrow pV = nRT", explanation: "State functions multiply; the constant is made universal by Avogadro's equal-molecules-equal-volume law (R = p₀V₀/T₀ per mole)." },
    ],
    conclusion:
      "pV = nRT fuses the three gas laws; every gas numerical is a before/after application of p₁V₁/T₁ = p₂V₂/T₂ (n fixed) or the full equation.",
    keyTakeaways: [
      "Temperatures MUST be kelvin in every gas law.",
      "R = 8.314 J, 0.0821 L·atm, 2 cal — pick units to match the data.",
      "Molar volume at STP: 22.4 L (1 atm) or 22.7 L (1 bar).",
    ],
    examTraps: [
      "Using °C instead of K.",
      "Confusing STP definitions (1 atm vs 1 bar molar volumes).",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Isothermal process", condition: "T constant", formula: "p_1V_1 = p_2V_2", meaning: "Boyle's law directly." },
      { name: "Isobaric heating", condition: "p constant", formula: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}", meaning: "Charles' law directly." },
      { name: "Isochoric cooling", condition: "V constant", formula: "\\frac{p_1}{T_1} = \\frac{p_2}{T_2}", meaning: "Gay-Lussac's pressure law — the sealed-container case." },
      { name: "Density form", condition: "n = m/M", formula: "pM = dRT", meaning: "Molar mass from vapour density measurements." },
    ],
    solvedProblems: [],
  },
  {
    id: "chem-11-kp-kc-relation",
    slug: "relationship-between-kp-and-kc",
    title: "Equilibrium: Relationship Between Kp and Kc",
    subject: "chemistry",
    unit: "Chemical Equilibrium",
    unitId: "chemical-equilibrium",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Equilibrium)",
    isExtra: false,
    statement:
      "For gas-phase equilibria Kp = Kc(RT)^Δn, where Δn is the change in gaseous moles between products and reactants.",
    coreFormula: "K_p = K_c (RT)^{\\Delta n}, \\qquad \\Delta n = n_{g,prod} - n_{g,react}",
    concernedTerms: [
      { term: "Kp", units: "(pressure units)^Δn", definition: "Equilibrium constant in partial pressures." },
      { term: "Kc", units: "(conc. units)^Δn", definition: "Equilibrium constant in molar concentrations." },
    ],
    assumptions: ["Ideal gas behaviour.", "Fixed temperature."],
    proofSteps: [
      { stepNumber: 1, title: "Ideal gas concentration", latex: "p_i = \\frac{n_iRT}{V} = c_iRT", explanation: "Partial pressure is just concentration times RT." },
      { stepNumber: 2, title: "Substitute into Kp", latex: "K_p = \\prod p_i^{\\nu_i} = \\prod (c_iRT)^{\\nu_i}", explanation: "Replace every pressure in the Kp expression with c_iRT." },
      { stepNumber: 3, title: "Collect the RT factors", latex: "K_p = K_c (RT)^{\\sum\\nu_i} = K_c(RT)^{\\Delta n}", explanation: "Exponents add to Δn — products minus reactants (gases only)." },
    ],
    conclusion:
      "Kp = Kc(RT)^Δn: equal when Δn = 0 (e.g. H₂ + I₂ ⇌ 2HI), larger than Kc when gas moles grow (N₂O₄ → 2NO₂).",
    keyTakeaways: [
      "Δn counts only GASEOUS species; solids/liquids never enter.",
      "Δn = 0 ⇒ Kp = Kc at every temperature.",
      "Both constants change only with temperature.",
    ],
    examTraps: [
      "Using °C instead of K with R = 0.0821.",
      "Counting non-gas moles in Δn.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Δn = 0", condition: "Moles unchanged", formula: "K_p = K_c", meaning: "H₂ + I₂ ⇌ 2HI." },
      { name: "Δn > 0", condition: "More gas on product side", formula: "K_p > K_c (T > 121 K-ish)", meaning: "NH₄Cl decomposition, N₂O₄ dissociation." },
      { name: "Δn < 0", condition: "Fewer gas moles formed", formula: "K_p < K_c", meaning: "N₂ + 3H₂ ⇌ 2NH₃ — the Haber case." },
    ],
    solvedProblems: [],
  },
  {
    id: "chem-11-faradays-laws-electrolysis",
    slug: "faradays-laws-of-electrolysis",
    title: "Electrolysis: Faraday's Laws of Electrolysis (Quantitative Aspect)",
    subject: "chemistry",
    unit: "Oxidation & Reduction",
    unitId: "oxidation-and-reduction",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Redox/Electrolysis)",
    isExtra: false,
    statement:
      "Mass deposited is proportional to charge passed (first law) and, for the same charge, to the equivalent weight (second law): m = ZIt = (E/F)It with F = 96500 C mol⁻¹.",
    coreFormula: "m = \\frac{E\\,I\\,t}{96500}, \\qquad \\frac{m_1}{m_2} = \\frac{E_1}{E_2}",
    concernedTerms: [
      { term: "Faraday constant", symbol: "F", units: "C mol⁻¹", definition: "Charge on one mole of electrons, 96485 ≈ 96500 C." },
      { term: "Equivalent weight", symbol: "E", units: "g equiv⁻¹", definition: "Molar mass ÷ electrons transferred per formula unit." },
    ],
    assumptions: ["100% current efficiency.", "Constant current."],
    proofSteps: [
      { stepNumber: 1, title: "First law", latex: "m \\propto Q = It", explanation: "Every electron delivers the same chemical change at the electrode." },
      { stepNumber: 2, title: "Moles of electrons", latex: "n_e = \\frac{It}{F}", explanation: "One mole of electrons carries F coulombs." },
      { stepNumber: 3, title: "Mass deposited", latex: "m = \\frac{It}{F}\\cdot\\frac{M}{z} = \\frac{EIt}{96500}", explanation: "z electrons per ion ⇒ E = M/z; combining gives the working formula." },
      { stepNumber: 4, title: "Second law", latex: "\\frac{m_1}{m_2} = \\frac{E_1}{E_2}", explanation: "Same charge through cells in series deposits masses in the ratio of equivalent weights." },
    ],
    conclusion:
      "m = EIt/96500 turns ammeters into chemistry: charge in, equivalent mass out, and series cells deposit in E-ratio.",
    keyTakeaways: [
      "E for Cu²⁺ is 63.5/2; for Al³⁺ it is 27/3 — divide by charge, always.",
      "1 F deposits 1 gram-equivalent of any substance.",
      "Time in seconds in numericals.",
    ],
    examTraps: [
      "Forgetting the valence divisor z.",
      "Using minutes instead of seconds for t.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Same current, series cells", condition: "Cu & Ag cells", formula: "\\frac{m_{Cu}}{m_{Ag}} = \\frac{63.5/2}{108}", meaning: "Classic numerical setup." },
      { name: "Gas evolution", condition: "H₂ at cathode", formula: "V = \\frac{It}{2F}\\times 22.4\\ \\text{L}", meaning: "Volume form via molar volume." },
      { name: "Current efficiency", condition: "< 100%", formula: "m_{actual} = \\eta\\, m_{theory}", meaning: "Industrial electrolysis correction." },
    ],
    solvedProblems: [],
  },
  // ═══ CLASS 12 BIOLOGY ═══
  {
    id: "bio-12-hardy-weinberg-class12",
    slug: "hardy-weinberg-equilibrium-population-genetics",
    title: "Hardy–Weinberg Equilibrium & Population Genetics",
    subject: "biology",
    unit: "Heredity & Evolution",
    unitId: "heredity-and-evolution",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Evolution)",
    isExtra: true,
    statement:
      "In a large, randomly mating population free of evolutionary forces, allele frequencies stay constant: p² + 2pq + q² = 1 with p + q = 1.",
    coreFormula: "p + q = 1, \\qquad p^2 + 2pq + q^2 = 1",
    concernedTerms: [
      { term: "Allele frequency", symbol: "p, q", units: "—", definition: "Fraction of each allele among all alleles in the population." },
      { term: "Heterozygote frequency", symbol: "2pq", units: "—", definition: "Carrier fraction — maximised when p = q = 0.5." },
    ],
    assumptions: [
      "No mutation, migration, or selection.",
      "Random mating, infinite population size.",
    ],
    proofSteps: [
      { stepNumber: 1, title: "Allele sum", latex: "p + q = 1", explanation: "Only two alleles exist at the locus; their frequencies must total 1." },
      { stepNumber: 2, title: "Random mating multiplies probabilities", latex: "(p + q)^2 = p^2 + 2pq + q^2", explanation: "Egg allele × sperm allele combinations give the zygote genotype frequencies." },
      { stepNumber: 3, title: "Equilibrium persistence", latex: "p' = p^2 + pq = p", explanation: "Allele frequencies computed from the next generation reproduce the originals — the proof of constancy." },
      { stepNumber: 4, title: "Application: carrier frequency", latex: "q = \\sqrt{q^2},\\quad 2pq", explanation: "Given a disease frequency q², recover the allele frequency q and carrier rate 2pq — the standard exam task." },
    ],
    conclusion:
      "p² + 2pq + q² = 1 is the null model of population genetics; deviations measure evolution in action.",
    keyTakeaways: [
      "Take square roots BEFORE computing 2pq.",
      "2pq is always ≥ q² for rare alleles — carriers outnumber sufferers.",
      "Five conditions break equilibrium; each maps to a force of evolution.",
    ],
    examTraps: [
      "Treating q² (frequency) as q (allele frequency).",
      "Forgetting p = 1 − q when p is not given.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Fixation", condition: "p = 1 or q = 1", formula: "2pq = 0", meaning: "No variation — one allele lost." },
      { name: "Maximum heterozygosity", condition: "p = q = 0.5", formula: "2pq = 0.5", meaning: "Carriers at their peak." },
      { name: "Sex-linked recessive", condition: "Males hemizygous", formula: "q_{males} = q,\\ q^2_{females}", meaning: "Male incidence equals allele frequency — colour-blindness maths." },
    ],
    solvedProblems: [],
  },
  {
    id: "bio-12-population-growth-equations",
    slug: "population-growth-exponential-logistic",
    title: "Population Ecology: Exponential & Logistic Growth Equations",
    subject: "biology",
    unit: "Organisms & Environment",
    unitId: "organisms-and-environment",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Ecology)",
    isExtra: true,
    statement:
      "Unlimited resources give exponential growth dN/dt = rN; with a carrying capacity K the logistic model dN/dt = rN(K−N)/K produces the S-shaped (sigmoid) curve.",
    coreFormula: "\\frac{dN}{dt} = rN, \\qquad \\frac{dN}{dt} = rN\\frac{K-N}{K}",
    concernedTerms: [
      { term: "Intrinsic rate (biotic potential)", symbol: "r", units: "time⁻¹", definition: "Per-capita growth rate under ideal conditions." },
      { term: "Carrying capacity", symbol: "K", units: "individuals", definition: "Maximum sustainable population for the habitat." },
    ],
    assumptions: ["Continuous reproduction (no seasons).", "Constant r and K over the interval."],
    proofSteps: [
      { stepNumber: 1, title: "Exponential model", latex: "\\frac{dN}{dt} = rN \\Rightarrow N_t = N_0e^{rt}", explanation: "Per-capita birth minus death drives a proportional increase — J-shaped curve." },
      { stepNumber: 2, title: "Resource limitation term", latex: "\\frac{K-N}{K}", explanation: "Unused fraction of the carrying capacity — environmental resistance." },
      { stepNumber: 3, title: "Logistic model", latex: "\\frac{dN}{dt} = rN\\left(\\frac{K-N}{K}\\right) \\Rightarrow N_t = \\frac{K}{1+e^{r(\\tau-t)}}", explanation: "Growth is fastest at K/2, decelerating to zero as N → K — the sigmoid curve." },
    ],
    conclusion:
      "rN gives the J-curve of colonising populations; multiplying by (K−N)/K bends it into the S-curve every real, resource-limited population follows.",
    keyTakeaways: [
      "Maximum sustainable yield occurs at N = K/2.",
      "r-selected species → J-curve boom-bust; K-selected → sigmoid near K.",
      "The exponential form underlies the doubling-time rule t_d = 0.693/r.",
    ],
    examTraps: [
      "Confusing r (rate) with R (reproductive value) notation across textbooks.",
      "Assuming exponential growth continues indefinitely.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "N ≪ K", condition: "Sparse population", formula: "\\frac{K-N}{K} \\approx 1", meaning: "Logistic behaves exponentially at first." },
      { name: "N = K", condition: "At capacity", formula: "\\frac{dN}{dt} = 0", meaning: "Growth stops; births balance deaths." },
      { name: "Doubling time", condition: "Exponential phase", formula: "t_{double} = \\frac{0.693}{r}", meaning: "Handy numerical shortcut." },
    ],
    solvedProblems: [],
  },
  {
    id: "bio-12-ecological-pyramids-energy-flow",
    slug: "ecological-pyramids-ten-percent-law",
    title: "Ecological Pyramids & the 10 Per Cent Law of Energy Flow",
    subject: "biology",
    unit: "Organisms & Environment",
    unitId: "organisms-and-environment",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Ecology)",
    isExtra: true,
    statement:
      "Lindeman's 10% law: each trophic level receives about one-tenth of the energy of the level below, producing upright pyramids of energy and biomass.",
    coreFormula: "E_{n+1} \\approx 0.1\\,E_n \\;\\Rightarrow\\; \\text{4–5 trophic levels maximum}",
    concernedTerms: [
      { term: "Trophic level", symbol: "T₁…Tₙ", units: "—", definition: "Position in the food chain (producers = T₁)." },
      { term: "Net primary productivity", symbol: "NPP", units: "kJ m⁻² yr⁻¹", definition: "GPP minus respiration — energy available to herbivores." },
    ],
    assumptions: ["Steady-state ecosystem.", "Average transfer efficiencies (~10%)."],
    proofSteps: [
      { stepNumber: 1, title: "Energy budget of a level", latex: "E_{in} = R + E_{stored} + E_{egested}", explanation: "Ingested energy splits into respiration heat, growth (to the next level) and waste." },
      { stepNumber: 2, title: "Transfer efficiency", latex: "\\frac{E_{next}}{E_{now}} \\approx 0.1", explanation: "Respiration and waste consume ~90% — Lindeman's trophic-dynamic law." },
      { stepNumber: 3, title: "Pyramid consequence", latex: "T_1:10000 \\to T_2:1000 \\to T_3:100 \\to T_4:10\\ \\text{(kJ)}", explanation: "Geometric shrinkage forces upright energy pyramids and caps chain length." },
    ],
    conclusion:
      "The 10% law quantifies why big predators are rare, why food chains are short, and why energy pyramids can never invert.",
    keyTakeaways: [
      "Energy pyramids are ALWAYS upright; biomass/number pyramids can invert.",
      "Only ~1% of sunlight becomes NPP.",
      "Decomposers recycle matter, not energy — energy flows one way.",
    ],
    examTraps: [
      "Applying 10% to a number pyramid of insects vs trees (numbers can invert).",
      "Forgetting respiration loss when computing the next level.",
    ],
    visualType: "pyramid",
    specialCases: [
      { name: "Inverted biomass pyramid", condition: "Aquatic systems", formula: "phytoplankton < zooplankton\\ \\text{biomass}", meaning: "Fast turnover hides a still-upright ENERGY pyramid." },
      { name: "Parasitic chains", condition: "Many parasites per host", formula: "\\text{number pyramid inverts}", meaning: "Numbers rise with each level." },
      { name: "20% efficient chains", condition: "Aquatic food webs", formula: "5\\text{–}6\\ \\text{levels}", meaning: "Water transfers energy better than land." },
    ],
    solvedProblems: [],
  },
];

export const CHEM_BIO_WAVE2_DERIVATIONS = cb;
