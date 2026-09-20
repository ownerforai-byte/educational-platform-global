import type { HighYieldTopicData } from "@/lib/high-yield-topic-facts";

/**
 * Chemistry high-yield bank — physical and inorganic units.
 *
 * Organic chemistry, applied chemistry and chemical manufactures live in
 * `high-yield-topic-facts-chemistry-organic.ts`. Every entry lists the
 * `unitSlugs` it serves (ids from `frontend/lib/syllabus.ts`); unit-aware
 * callers resolve only through that list.
 */
export const HIGH_YIELD_TOPIC_BANK_CHEMISTRY: HighYieldTopicData[] = [
  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Foundation and Fundamentals
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "foundation-and-fundamentals",
      "mole-concept",
      "atomic-mass",
      "molecular-mass",
      "percentage-composition",
      "empirical-formula",
      "avogadro",
    ],
    subject: "chemistry",
    title: "Foundation and Fundamentals — Mole Concept & Formula Determination",
    unitSlugs: ["foundation-and-fundamentals"],
    category: "Physical Chemistry",
    governingLaws: [
      {
        name: "Law of Conservation of Mass (Lavoisier)",
        statement:
          "Mass can neither be created nor destroyed in a chemical reaction; the total mass of the reactants equals the total mass of the products.",
        formula: "\\sum m_{reactants} = \\sum m_{products}",
        conditions:
          "Holds for ordinary chemical reactions. In nuclear reactions a measurable mass defect appears as energy, so it does not apply.",
      },
      {
        name: "Law of Multiple Proportions (Dalton)",
        statement:
          "When two elements combine to form more than one compound, the masses of one element that combine with a fixed mass of the other are in a ratio of small whole numbers.",
        formula: "\\text{e.g. } CO: C{:}O = 12{:}16, \\quad CO_2: C{:}O = 12{:}32 \\implies 1{:}2",
        conditions:
          "Applies to compounds of the SAME two elements, and follows from the atomic theory of matter.",
      },
      {
        name: "Avogadro's Law",
        statement:
          "Equal volumes of all gases under the same conditions of temperature and pressure contain an equal number of molecules.",
        formula: "V \\propto n \\quad (P, T \\text{ constant})",
        conditions:
          "Applies to ideal gases. At STP one mole of any gas occupies 22.4 litres — only at 273.15 K and 1 atm.",
      },
    ],
    speedFormulas: [
      {
        name: "The Three Faces of a Mole",
        formula: "n = \\frac{m}{M} = \\frac{N}{N_A} = \\frac{V}{22.4} \\text{ (at STP, litres)}",
        description:
          "Any mole problem is solved by picking whichever of the three ratios matches the data given. The 22.4 L figure applies ONLY at STP.",
        unit: "mol",
      },
      {
        name: "Percentage Composition",
        formula: "\\%\\ \\text{of element} = \\frac{\\text{mass of element in 1 mol}}{\\text{molar mass}} \\times 100",
        description:
          "In H2O, the percentage of hydrogen is 2/18 times 100, i.e. 11.1 percent.",
        unit: "%",
      },
      {
        name: "Empirical to Molecular Formula",
        formula: "\\text{Molecular formula} = \\text{Empirical formula} \\times n, \\quad n = \\frac{M_{molecular}}{M_{empirical}}",
        description:
          "The empirical formula comes from the simplest whole-number ratio of moles of each element, obtained by dividing each percentage by the atomic mass.",
        unit: "dimensionless",
      },
      {
        name: "Average Atomic Mass",
        formula: "A_{avg} = \\frac{a_1 M_1 + a_2 M_2 + \\dots}{100}",
        description:
          "Chlorine's average atomic mass of 35.5 comes from 75 percent Cl-35 and 25 percent Cl-37.",
        unit: "u",
      },
    ],
    constantsAndValues: [
      { symbol: "N_A", name: "Avogadro's number", value: "6.022 x 10^23", unit: "mol^-1" },
      { symbol: "V_m", name: "Molar volume of an ideal gas at STP", value: "22.4", unit: "L mol^-1" },
      { symbol: "1 u", name: "One atomic mass unit", value: "1.66 x 10^-24", unit: "g" },
      { symbol: "1 u", name: "One atomic mass unit in energy", value: "931.5", unit: "MeV" },
      { symbol: "A(H)", name: "Atomic mass of hydrogen", value: "1", unit: "u" },
      { symbol: "A(C)", name: "Atomic mass of carbon", value: "12", unit: "u" },
      { symbol: "A(N)", name: "Atomic mass of nitrogen", value: "14", unit: "u" },
      { symbol: "A(O)", name: "Atomic mass of oxygen", value: "16", unit: "u" },
      { symbol: "A(Na)", name: "Atomic mass of sodium", value: "23", unit: "u" },
      { symbol: "A(Cl)", name: "Average atomic mass of chlorine", value: "35.5", unit: "u" },
    ],
    entranceTraps: [
      {
        trap: "One mole of any gas occupies 22.4 litres.",
        truth:
          "Only at STP, which is 273.15 K and 1 atm. At room temperature the molar volume is about 24.5 litres, so the number changes with conditions.",
        examRef: "NEB / IOE — mole concept",
      },
      {
        trap: "The empirical formula and the molecular formula are the same thing.",
        truth:
          "They coincide only when n = 1. Acetic acid has the empirical formula CH2O but the molecular formula C2H4O2; benzene has CH and C6H6.",
        examRef: "IOE/CEE — formula determination",
      },
      {
        trap: "One mole of a gas always means a mass of 22.4 g.",
        truth:
          "22.4 is a VOLUME in litres at STP, not a mass. The mass of one mole in grams equals the molar mass, which is 2 g for H2 and 44 g for CO2.",
        examRef: "NEB — mole concept",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Find the percentage composition by mass of hydrogen and oxygen in water, and the mass of oxygen in 90 g of water.",
        given: "M(H_2O) = 18\\ g\\ mol^{-1}, \\text{ mass of water } = 90\\ g",
        steps: [
          "\\%H = \\frac{2}{18} \\times 100 = 11.11\\%",
          "\\%O = \\frac{16}{18} \\times 100 = 88.89\\%",
          "Moles of water: n = \\frac{90}{18} = 5\\ mol",
          "Mass of oxygen = 5 \\times 16 = 80\\ g",
        ],
        answer: "H = 11.1\\%,\\ O = 88.9\\%; \\quad \\text{oxygen in 90 g water} = 80\\ g",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Mole",
        definition:
          "The amount of substance that contains as many elementary entities as there are atoms in exactly 12 g of carbon-12, that number being Avogadro's number.",
        significance:
          "The bridge between the atomic scale and the laboratory balance — every stoichiometric calculation starts from moles.",
      },
      {
        term: "Empirical Formula",
        definition:
          "The formula showing the simplest whole-number ratio of the atoms of different elements present in a compound.",
        significance:
          "Obtained directly from percentage composition data, and multiplied by a whole number n to give the molecular formula.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Stoichiometry
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "stoichiometry",
      "limiting-reagent",
      "percentage-yield",
      "molarity",
      "molality",
      "normality",
      "equivalent-mass",
      "volumetric-analysis",
    ],
    subject: "chemistry",
    title: "Stoichiometry — Limiting Reagent, Yield & Solution Concentration",
    unitSlugs: ["stoichiometry"],
    category: "Physical Chemistry",
    governingLaws: [
      {
        name: "Stoichiometric (Mole) Relationship",
        statement:
          "In a balanced chemical equation the coefficients give the ratio in which the amounts of the reacting species are consumed, and therefore the ratio of the moles of products formed.",
        formula: "aA + bB \\rightarrow cC + dD \\implies \\frac{n_A}{a} = \\frac{n_B}{b}",
        conditions:
          "The equation must be balanced first; the ratio is by moles, not by mass.",
      },
      {
        name: "Law of Equivalence",
        statement:
          "One gram equivalent of a substance reacts exactly with one gram equivalent of any other substance — the basis of all titration calculations.",
        formula: "N_1 V_1 = N_2 V_2, \\quad E = \\frac{M}{\\text{n-factor}}",
        conditions:
          "Requires the correct n-factor for each species in the given medium; the n-factor of KMnO4 depends on whether the medium is acidic, neutral or basic.",
      },
    ],
    speedFormulas: [
      {
        name: "Molarity, Molality and Normality",
        formula:
          "M = \\frac{\\text{moles of solute}}{\\text{litres of solution}}, \\quad m = \\frac{\\text{moles of solute}}{\\text{kg of solvent}}, \\quad N = M \\times \\text{n-factor}",
        description:
          "Molarity uses the volume of SOLUTION and so changes with temperature; molality uses the mass of SOLVENT and is therefore temperature independent.",
        unit: "M, m, N",
      },
      {
        name: "Percentage Yield",
        formula: "\\%\\ \\text{yield} = \\frac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100",
        description:
          "The theoretical yield is always computed from the LIMITING reagent, never from the excess reagent.",
        unit: "%",
      },
      {
        name: "Identifying the Limiting Reagent",
        formula: "\\text{Compare } \\frac{n_A}{a} \\text{ with } \\frac{n_B}{b}; \\text{ the smaller quotient is limiting}",
        description:
          "Divide the available moles of each reactant by its coefficient — the smallest result runs out first and controls the yield.",
        unit: "mol",
      },
      {
        name: "Dilution and Mixing",
        formula: "M_1 V_1 = M_2 V_2, \\quad M_{mix} = \\frac{M_1 V_1 + M_2 V_2}{V_1 + V_2}",
        description:
          "Dilution changes the volume and the molarity but keeps the number of moles of solute constant.",
        unit: "mol L^-1",
      },
    ],
    constantsAndValues: [
      { symbol: "E(H_2SO_4)", name: "Equivalent mass of sulphuric acid", value: "49", unit: "g eq^-1" },
      { symbol: "E(KMnO_4)", name: "Equivalent mass of KMnO4 in acidic medium", value: "31.6", unit: "g eq^-1" },
      { symbol: "n(KMnO_4)", name: "n-factor of KMnO4 in acidic medium", value: "5", unit: "dimensionless" },
      { symbol: "n(K_2Cr_2O_7)", name: "n-factor of potassium dichromate in acid", value: "6", unit: "dimensionless" },
      { symbol: "1 M", name: "One molar solution", value: "1", unit: "mol L^-1" },
      { symbol: "d_{water}", name: "Density of water at 4 deg C", value: "1", unit: "g mL^-1" },
    ],
    entranceTraps: [
      {
        trap: "Molarity is independent of temperature.",
        truth:
          "Molarity is moles per litre of SOLUTION, and the volume of a solution changes with temperature, so molarity changes too. MOLALITY is the temperature-independent measure.",
        examRef: "IOE/CEE — concentration terms",
      },
      {
        trap: "Normality and molarity are the same for every solution.",
        truth:
          "They are equal only when the n-factor is 1. For KMnO4 in acidic medium normality is five times the molarity.",
        examRef: "NEB — equivalent concept",
      },
      {
        trap: "The excess reagent determines the amount of product formed.",
        truth:
          "The LIMITING reagent does. The excess reagent is left over unreacted and plays no part in fixing the theoretical yield.",
        examRef: "IOE — limiting reagent",
      },
    ],
    workedNumericals: [
      {
        problem:
          "4 g of NaOH is dissolved in water to make 250 mL of solution. Find the molarity. Take M(NaOH) = 40 g/mol.",
        given: "m = 4\\ g, M = 40\\ g\\ mol^{-1}, V = 250\\ mL = 0.25\\ L",
        steps: [
          "Moles of NaOH: n = \\frac{4}{40} = 0.1\\ mol",
          "Molarity: M = \\frac{n}{V} = \\frac{0.1}{0.25}",
          "M = 0.4\\ mol\\ L^{-1}",
        ],
        answer: "M = 0.4\\ M",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Limiting Reagent",
        definition:
          "The reactant that is completely consumed first and therefore limits the amount of product that can be formed.",
        significance:
          "Every yield calculation must begin by identifying it, which is done by dividing available moles by the balanced-equation coefficient.",
      },
      {
        term: "Gram Equivalent Mass",
        definition:
          "The mass of a substance that supplies or accepts one mole of electrons, protons or charge, equal to the molar mass divided by the n-factor.",
        significance:
          "Allows the law of equivalence to be used, which makes titration calculations a single multiplication.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Atomic Structure
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "atomic-structure",
      "bohr",
      "quantum-number",
      "de-broglie",
      "heisenberg",
      "rydberg",
      "orbital",
      "electronic-configuration",
    ],
    subject: "chemistry",
    title: "Atomic Structure — Bohr Model, Quantum Numbers & Dual Nature",
    unitSlugs: ["atomic-structure"],
    category: "Physical Chemistry",
    governingLaws: [
      {
        name: "Bohr's Postulates",
        statement:
          "An electron revolves in certain permitted orbits without radiating energy; energy is radiated or absorbed only when it jumps between two orbits, as a single photon of energy equal to the difference.",
        formula: "mvr = \\frac{nh}{2\\pi}, \\quad h\\nu = E_2 - E_1",
        conditions:
          "Valid only for one-electron species such as H, He+, Li2+. It fails for multi-electron atoms and cannot explain the fine structure or the Zeeman effect.",
      },
      {
        name: "Heisenberg's Uncertainty Principle",
        statement:
          "It is impossible to determine simultaneously and exactly both the position and the momentum of a microscopic particle.",
        formula: "\\Delta x \\cdot \\Delta p \\geq \\frac{h}{4\\pi}, \\quad \\Delta E \\cdot \\Delta t \\geq \\frac{h}{4\\pi}",
        conditions:
          "A fundamental limit of nature, not an instrument limitation. It is why the fixed orbits of Bohr's model had to be replaced by probability orbitals.",
      },
      {
        name: "de Broglie Relation (Dual Nature of Matter)",
        statement:
          "Every moving particle has an associated wave whose wavelength is inversely proportional to its momentum.",
        formula: "\\lambda = \\frac{h}{mv} = \\frac{h}{\\sqrt{2m\\,KE}}",
        conditions:
          "For a charged particle accelerated through V volts: lambda = h / sqrt(2 m e V) = 12.27 / sqrt(V) angstrom.",
      },
    ],
    speedFormulas: [
      {
        name: "Bohr Energy, Radius and Velocity",
        formula:
          "E_n = -\\frac{13.6}{n^2}\\ eV\\ (Z=1), \\quad r_n = 0.529\\,n^2\\ \\AA, \\quad v_n = \\frac{2.18 \\times 10^6}{n}\\ m\\ s^{-1}",
        description:
          "For a one-electron ion of atomic number Z multiply the energy by Z squared, divide the radius by Z and multiply the velocity by Z.",
        unit: "eV, angstrom, m s^-1",
      },
      {
        name: "Rydberg Equation",
        formula: "\\frac{1}{\\lambda} = R Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right), \\quad n_2 > n_1",
        description:
          "Lyman series (n1 = 1) lies in the ultraviolet, Balmer (n1 = 2) in the visible, and Paschen, Brackett and Pfund in the infrared.",
        unit: "m^-1",
      },
      {
        name: "Quantum Numbers",
        formula: "n = 1, 2, 3, \\dots; \\quad l = 0 \\dots n-1; \\quad m_l = -l \\dots +l; \\quad m_s = \\pm\\frac{1}{2}",
        description:
          "Orbitals per shell = n squared, electrons per shell = 2 n squared. An f subshell holds 14 electrons, a d subshell 10, a p subshell 6 and an s subshell 2.",
        unit: "dimensionless",
      },
      {
        name: "Photon Energy",
        formula: "E = h\\nu = \\frac{hc}{\\lambda}",
        description:
          "In electron volts, E = 1240 / lambda, where lambda is in nanometres. Useful for checking whether a photon can ionise a given atom.",
        unit: "J or eV",
      },
    ],
    constantsAndValues: [
      { symbol: "h", name: "Planck's constant", value: "6.626 x 10^-34", unit: "J s" },
      { symbol: "R", name: "Rydberg constant", value: "1.097 x 10^7", unit: "m^-1" },
      { symbol: "a_0", name: "Bohr radius", value: "0.529", unit: "angstrom" },
      { symbol: "1 eV", name: "One electron volt in joules", value: "1.602 x 10^-19", unit: "J" },
      { symbol: "m_e", name: "Mass of an electron", value: "9.1 x 10^-31", unit: "kg" },
      { symbol: "E_{1}", name: "Energy of the ground state of hydrogen", value: "-13.6", unit: "eV" },
      { symbol: "I.E.(H)", name: "Ionisation enthalpy of hydrogen", value: "13.6", unit: "eV" },
    ],
    entranceTraps: [
      {
        trap: "Bohr's model works equally well for multi-electron atoms.",
        truth:
          "It is exact only for one-electron species (H, He+, Li2+). For multi-electron atoms the observed line spectra could not be explained — that required the quantum mechanical model.",
        examRef: "NEB / IOE — atomic structure",
      },
      {
        trap: "The uncertainty principle arises because our instruments are imperfect.",
        truth:
          "It is a fundamental property of matter, independent of instrument quality. Determining position precisely necessarily makes momentum completely uncertain.",
        examRef: "IOE — quantum mechanics",
      },
      {
        trap: "The energy of an electron in a Bohr orbit is positive.",
        truth:
          "It is NEGATIVE and increases towards zero as n increases. The zero is set at complete separation (n = infinity), so bound electrons always have negative energy.",
        examRef: "CEE — Bohr model",
      },
      {
        trap: "The Balmer series lies in the ultraviolet region.",
        truth:
          "Balmer (n1 = 2) is the only series in the VISIBLE region; Lyman (n1 = 1) is ultraviolet, and Paschen and beyond are infrared. H-alpha at 656 nm is the red line of hydrogen.",
        examRef: "NEB — hydrogen spectrum",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Calculate the wavelength of the first line of the Lyman series of hydrogen. Take R = 1.097 x 10^7 m^-1.",
        given: "n_1 = 1, n_2 = 2, R = 1.097 \\times 10^7\\ m^{-1}",
        steps: [
          "Rydberg equation: \\frac{1}{\\lambda} = R\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
          "\\frac{1}{\\lambda} = 1.097 \\times 10^7 \\left(\\frac{1}{1} - \\frac{1}{4}\\right) = 1.097 \\times 10^7 \\times 0.75",
          "\\frac{1}{\\lambda} = 8.23 \\times 10^6\\ m^{-1}",
          "\\lambda = 1.215 \\times 10^{-7}\\ m",
        ],
        answer: "\\lambda = 121.5\\ nm \\quad (\\text{ultraviolet})",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Orbital",
        definition:
          "The region of space around the nucleus where the probability of finding an electron is maximum, described by a set of quantum numbers.",
        significance:
          "Replaces Bohr's fixed circular path. An orbital holds at most two electrons of opposite spin, as required by the Pauli exclusion principle.",
      },
      {
        term: "Aufbau Principle",
        definition:
          "Electrons fill the available orbitals in order of increasing energy, following the (n + l) rule and Hund's rule for degenerate orbitals.",
        significance:
          "Predicts the ground state electronic configuration and therefore the position of an element in the periodic table.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Oxidation and Reduction
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "oxidation-and-reduction",
      "oxidation-number",
      "redox",
      "n-factor",
      "oxidising-agent",
      "reducing-agent",
      "electrode-potential",
    ],
    subject: "chemistry",
    title: "Oxidation and Reduction — Oxidation Number & n-Factor",
    unitSlugs: ["oxidation-and-reduction", "oxidation-reduction"],
    category: "Physical Chemistry",
    governingLaws: [
      {
        name: "Electronic Definition of Redox",
        statement:
          "Oxidation is loss of electrons and reduction is gain of electrons; the two always occur together, so no oxidation is possible without a simultaneous reduction.",
        formula: "\\text{Oxidation: } M \\rightarrow M^{n+} + ne^-, \\quad \\text{Reduction: } X + ne^- \\rightarrow X^{n-}",
        conditions:
          "Oxygen is NOT required — for example sodium burning in chlorine is a redox reaction with no oxygen present.",
      },
      {
        name: "Rules for Assigning Oxidation Number",
        statement:
          "The oxidation number of an element in its free state is zero, of a monatomic ion equals its charge, hydrogen is normally +1 and oxygen normally -2, and the algebraic sum over a neutral compound is zero.",
        formula: "\\sum (\\text{oxidation number} \\times \\text{number of atoms}) = \\text{net charge}",
        conditions:
          "Exceptions matter: hydrogen is -1 in metal hydrides such as NaH, and oxygen is -1 in peroxides such as H2O2 and +2 in OF2.",
      },
    ],
    speedFormulas: [
      {
        name: "n-Factor of Common Oxidising Agents",
        formula:
          "KMnO_4: 5\\ (\\text{acidic}),\\ 3\\ (\\text{neutral}),\\ 1\\ (\\text{basic}); \\quad K_2Cr_2O_7: 6",
        description:
          "The n-factor equals the number of electrons gained or lost PER FORMULA UNIT, so it changes with the medium and therefore changes the equivalent mass.",
        unit: "dimensionless",
      },
      {
        name: "Equivalent Mass from n-Factor",
        formula: "E = \\frac{M}{\\text{n-factor}}",
        description:
          "For KMnO4 in acidic medium E = 158/5 = 31.6, which is why permanganate titrations use that value.",
        unit: "g eq^-1",
      },
      {
        name: "Balancing by the Ion–Electron Method",
        formula: "\\text{balance atoms} \\rightarrow \\text{balance O with } H_2O \\rightarrow \\text{balance H with } H^+ \\rightarrow \\text{balance charge with } e^-",
        description:
          "In acidic medium use H2O and H+; in basic medium use OH minus and H2O. Then equalise the electrons and add the half reactions.",
        unit: "dimensionless",
      },
      {
        name: "Electrochemical Series",
        formula: "E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}",
        description:
          "A positive cell potential means the reaction is spontaneous. The lower the reduction potential, the stronger the reducing agent.",
        unit: "V",
      },
    ],
    constantsAndValues: [
      { symbol: "E(KMnO_4)", name: "Equivalent mass of KMnO4 in acidic medium", value: "31.6", unit: "g eq^-1" },
      { symbol: "M(KMnO_4)", name: "Molar mass of potassium permanganate", value: "158", unit: "g mol^-1" },
      { symbol: "E(K_2Cr_2O_7)", name: "Equivalent mass of K2Cr2O7", value: "49", unit: "g eq^-1" },
      { symbol: "E^\\circ(Zn)", name: "Standard reduction potential of zinc", value: "-0.76", unit: "V" },
      { symbol: "E^\\circ(Cu)", name: "Standard reduction potential of copper", value: "+0.34", unit: "V" },
      { symbol: "E^\\circ(H)", name: "Standard hydrogen electrode potential", value: "0.00", unit: "V" },
    ],
    entranceTraps: [
      {
        trap: "Oxygen must be involved for a reaction to be called oxidation.",
        truth:
          "Oxidation is defined by the LOSS OF ELECTRONS, not by oxygen. Sodium reacting with chlorine, and hydrogen reacting with fluorine, are both redox reactions with no oxygen at all.",
        examRef: "NEB / IOE — redox basics",
      },
      {
        trap: "Hydrogen always has an oxidation number of +1.",
        truth:
          "In metal hydrides such as NaH, CaH2 and LiAlH4 hydrogen is -1, because the metal is less electronegative than hydrogen.",
        examRef: "IOE — oxidation number rules",
      },
      {
        trap: "An oxidising agent is itself oxidised.",
        truth:
          "An oxidising agent is itself REDUCED, and a reducing agent is itself oxidised. In KMnO4 acting on an acidified Fe2+ solution, manganese goes from +7 to +2 and is reduced.",
        examRef: "CEE — oxidising and reducing agents",
      },
      {
        trap: "The n-factor of KMnO4 is always 5.",
        truth:
          "It is 5 in acidic medium, 3 in neutral medium and 1 in strongly basic medium, because manganese goes to Mn2+, MnO2 and MnO4^2- respectively.",
        examRef: "IOE — equivalent mass",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Find the oxidation number of manganese in KMnO4 and of chromium in K2Cr2O7.",
        given: "K = +1, O = -2, H = +1 \\text{ (where present)}",
        steps: [
          "For KMnO_4: (+1) + x + 4(-2) = 0",
          "x - 7 = 0 \\implies x = +7",
          "For K_2Cr_2O_7: 2(+1) + 2x + 7(-2) = 0",
          "2x - 12 = 0 \\implies x = +6",
        ],
        answer: "Mn = +7 \\text{ in } KMnO_4, \\quad Cr = +6 \\text{ in } K_2Cr_2O_7",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Oxidation Number",
        definition:
          "The charge that an atom would carry if the compound were completely ionic, assigned by an agreed set of rules.",
        significance:
          "Lets you track electron transfer in any redox reaction, and identifies disproportionation, where one element is simultaneously oxidised and reduced.",
      },
      {
        term: "Disproportionation",
        definition:
          "A redox reaction in which the same element is simultaneously oxidised and reduced, as in the decomposition of hydrogen peroxide.",
        significance:
          "A frequent exam question: 2 H2O2 gives 2 H2O + O2, where oxygen goes from -1 to both -2 and 0.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — States of Matter
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "states-of-matter",
      "gas-laws",
      "van-der-waals",
      "critical-temperature",
      "liquefaction",
      "compressibility-factor",
      "kinetic-molecular-theory",
    ],
    subject: "chemistry",
    title: "States of Matter — Gas Laws & Real Gas Behaviour",
    unitSlugs: ["states-of-matter"],
    category: "Physical Chemistry",
    governingLaws: [
      {
        name: "Ideal Gas Equation",
        statement:
          "The product of the pressure and volume of a given amount of gas is directly proportional to its absolute temperature.",
        formula: "PV = nRT, \\quad \\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}",
        conditions:
          "Assumes negligible molecular volume and no intermolecular forces. Real gases approach ideality at low pressure and high temperature.",
      },
      {
        name: "van der Waals Equation",
        statement:
          "Real gases deviate from the ideal equation because molecules have finite volume and attract one another, requiring a volume correction and a pressure correction.",
        formula:
          "\\left(P + \\frac{an^2}{V^2}\\right)(V - nb) = nRT",
        conditions:
          "The constant a measures attractive forces and b the effective molecular volume. At high pressure the b term dominates and the compressibility factor exceeds 1.",
      },
      {
        name: "Critical Temperature and Liquefaction",
        statement:
          "Every gas has a critical temperature above which it cannot be liquefied however great the pressure applied.",
        formula:
          "T_c = \\frac{8a}{27Rb}, \\quad P_c = \\frac{a}{27b^2}, \\quad V_c = 3b, \\quad \\frac{RT_c}{P_c V_c} = \\frac{8}{3}",
        conditions:
          "Gases with weak intermolecular forces such as helium have very low critical temperatures (5.2 K), so they are the hardest to liquefy.",
      },
    ],
    speedFormulas: [
      {
        name: "The Four Individual Gas Laws",
        formula:
          "Boyle: PV = k; \\quad Charles: \\frac{V}{T} = k; \\quad Gay\\text{-}Lussac: \\frac{P}{T} = k; \\quad Avogadro: \\frac{V}{n} = k",
        description:
          "Each law holds the other two variables constant. The combined gas law takes the product of all four.",
        unit: "varies",
      },
      {
        name: "Compressibility Factor",
        formula: "Z = \\frac{PV}{nRT}",
        description:
          "Z = 1 for an ideal gas. At moderate pressure Z is less than 1 because attraction dominates; at very high pressure Z exceeds 1 because molecular volume dominates.",
        unit: "dimensionless",
      },
      {
        name: "Dalton's Law of Partial Pressures",
        formula: "P_{total} = P_1 + P_2 + \\dots, \\quad P_i = x_i P_{total}",
        description:
          "The partial pressure of a gas in a mixture equals its mole fraction times the total pressure. Used for gases collected over water.",
        unit: "atm or bar",
      },
      {
        name: "Density and Molar Mass of a Gas",
        formula: "d = \\frac{PM}{RT}, \\quad M = \\frac{dRT}{P}",
        description:
          "The fastest way to find a molar mass from a measured gas density, and the basis of Victor Meyer's method.",
        unit: "g L^-1 and g mol^-1",
      },
    ],
    constantsAndValues: [
      { symbol: "R", name: "Universal gas constant", value: "0.0821", unit: "L atm mol^-1 K^-1" },
      { symbol: "R", name: "Universal gas constant in SI", value: "8.314", unit: "J mol^-1 K^-1" },
      { symbol: "V_m", name: "Molar volume at STP", value: "22.4", unit: "L mol^-1" },
      { symbol: "T_c(CO_2)", name: "Critical temperature of carbon dioxide", value: "304", unit: "K" },
      { symbol: "T_c(H_2O)", name: "Critical temperature of water", value: "647", unit: "K" },
      { symbol: "T_c(He)", name: "Critical temperature of helium", value: "5.2", unit: "K" },
      { symbol: "a(CO_2)", name: "van der Waals constant a for CO2", value: "3.59", unit: "L^2 atm mol^-2" },
      { symbol: "b(CO_2)", name: "van der Waals constant b for CO2", value: "0.0427", unit: "L mol^-1" },
    ],
    entranceTraps: [
      {
        trap: "Real gases obey PV = nRT most closely at high pressure and low temperature.",
        truth:
          "The opposite is true. Gases behave most ideally at LOW pressure and HIGH temperature, where molecules are far apart and moving fast, so attraction and molecular volume matter least.",
        examRef: "NEB / IOE — real gases",
      },
      {
        trap: "Any gas can be liquefied by applying enough pressure.",
        truth:
          "Only below its critical temperature. Above Tc the distinction between liquid and gas disappears and no amount of pressure will liquefy it.",
        examRef: "IOE — liquefaction of gases",
      },
      {
        trap: "The compressibility factor Z is greater than 1 for every real gas.",
        truth:
          "At moderate pressures Z is LESS than 1 because attractive forces pull molecules together and reduce the effective pressure. Above the Boyle temperature Z stays above 1 throughout.",
        examRef: "IOE — deviation from ideality",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Calculate the volume occupied by 2 moles of an ideal gas at STP, and the pressure if the same gas is compressed into 22.4 L at 273 K.",
        given: "n = 2\\ mol, STP: T = 273.15\\ K,\\ P = 1\\ atm, \\ R = 0.0821\\ L\\ atm\\ mol^{-1} K^{-1}",
        steps: [
          "At STP: V = n \\times 22.4 = 2 \\times 22.4 = 44.8\\ L",
          "Compressed to 22.4 L at the same temperature, apply Boyle's law: P_1 V_1 = P_2 V_2",
          "1 \\times 44.8 = P_2 \\times 22.4",
          "P_2 = 2\\ atm",
        ],
        answer: "V_{STP} = 44.8\\ L; \\quad \\text{compressed pressure} = 2\\ atm",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Critical Temperature",
        definition:
          "The temperature above which a gas cannot be liquefied by pressure alone, however high the pressure.",
        significance:
          "Gases with strong intermolecular forces such as ammonia have high critical temperatures and are easy to liquefy; helium, with almost none, is the hardest.",
      },
      {
        term: "Compressibility Factor",
        definition:
          "The ratio Z = PV/nRT, which measures the extent of deviation of a real gas from ideal behaviour.",
        significance:
          "For hydrogen and helium Z is greater than 1 even at low pressure because their attractive forces are exceptionally weak.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Chemical Equilibrium
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "chemical-equilibrium",
      "ionic-equilibrium",
      "law-of-mass-action",
      "le-chatelier",
      "kp-kc",
      "ph",
      "buffer",
      "solubility-product",
      "degree-of-dissociation",
    ],
    subject: "chemistry",
    title: "Chemical and Ionic Equilibrium — Kc, Kp, pH & Buffers",
    unitSlugs: ["chemical-equilibrium"],
    category: "Physical Chemistry",
    governingLaws: [
      {
        name: "Law of Mass Action",
        statement:
          "At a given temperature, the rate of a chemical reaction is proportional to the product of the active masses of the reactants, each raised to its stoichiometric coefficient.",
        formula:
          "K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}, \\quad K_p = \\frac{p_C^c\\, p_D^d}{p_A^a\\, p_B^b}",
        conditions:
          "Equilibrium constants depend only on temperature. Pure solids and pure liquids are omitted, since their activity is taken as one.",
      },
      {
        name: "Le Chatelier's Principle",
        statement:
          "If a system at equilibrium is disturbed by a change in concentration, pressure or temperature, the system shifts in the direction that opposes the change.",
        formula:
          "N_2 + 3H_2 \\rightleftharpoons 2NH_3, \\quad \\Delta H = -92\\ kJ",
        conditions:
          "A catalyst does NOT shift the position of equilibrium — it only shortens the time taken to reach it.",
      },
    ],
    speedFormulas: [
      {
        name: "Relation between Kp and Kc",
        formula: "K_p = K_c (RT)^{\\Delta n}, \\quad \\Delta n = \\text{moles of gaseous products} - \\text{reactants}",
        description:
          "The two are equal when the number of gaseous moles is unchanged, as in H2 + I2 giving 2 HI. Using the wrong R or temperature is the usual mistake.",
        unit: "dimensionless or atm^delta-n",
      },
      {
        name: "Degree of Dissociation",
        formula: "\\alpha = \\frac{\\text{moles dissociated}}{\\text{initial moles}}, \\quad K_p = \\frac{4\\alpha^2 P}{1 - \\alpha^2}",
        description:
          "For a dimerisation such as 2 NO2 giving N2O4 the relation becomes Kp = (1 - alpha) P / (4 alpha^2), so always derive it for the reaction given.",
        unit: "dimensionless",
      },
      {
        name: "pH, pOH and Kw",
        formula: "pH = -\\log[H^+], \\quad pH + pOH = 14, \\quad K_w = [H^+][OH^-] = 10^{-14}",
        description:
          "Kw is 10 to the power minus 14 only at 25 degrees C, and it increases with temperature. A neutral solution has pH 7 only at that temperature.",
        unit: "dimensionless",
      },
      {
        name: "Buffer and Solubility Product",
        formula:
          "pH = pK_a + \\log\\frac{[salt]}{[acid]}, \\quad K_{sp} = [A^+]^a [B^-]^b, \\quad S = \\sqrt{K_{sp}} \\text{ (1:1 salt)}",
        description:
          "Precipitation occurs when the ionic product exceeds Ksp. A buffer resists pH change because it contains both a weak acid and its conjugate base.",
        unit: "mol L^-1",
      },
    ],
    constantsAndValues: [
      { symbol: "K_w", name: "Ionic product of water at 25 deg C", value: "1 x 10^-14", unit: "mol^2 L^-2" },
      { symbol: "pH", name: "pH of a neutral solution at 25 deg C", value: "7", unit: "dimensionless" },
      { symbol: "K_a", name: "Dissociation constant of acetic acid", value: "1.8 x 10^-5", unit: "mol L^-1" },
      { symbol: "K_{sp}", name: "Solubility product of silver chloride", value: "1.8 x 10^-10", unit: "mol^2 L^-2" },
      { symbol: "pK_a", name: "pKa of acetic acid", value: "4.74", unit: "dimensionless" },
      { symbol: "\\Delta H", name: "Enthalpy change for ammonia synthesis", value: "-92", unit: "kJ" },
    ],
    entranceTraps: [
      {
        trap: "A catalyst increases the yield of the product at equilibrium.",
        truth:
          "A catalyst speeds up both the forward and backward reactions equally, so it helps the system reach equilibrium sooner but leaves the equilibrium position and yield unchanged.",
        examRef: "NEB / IOE — catalysis",
      },
      {
        trap: "At equilibrium the forward reaction has stopped.",
        truth:
          "Equilibrium is DYNAMIC: both reactions continue at equal rates. The concentrations stay constant, not the molecular activity.",
        examRef: "IOE — equilibrium nature",
      },
      {
        trap: "Kp always equals Kc.",
        truth:
          "They are equal only when the change in gaseous moles is zero. For N2 + 3H2 giving 2 NH3 the change is -2, so Kp = Kc times RT to the power minus 2.",
        examRef: "IOE — equilibrium constants",
      },
      {
        trap: "A neutral solution always has pH 7.",
        truth:
          "Only at 25 degrees C. Since Kw rises with temperature, the neutral pH of boiling water is about 6.1, yet the solution is still neutral because H+ and OH- remain equal.",
        examRef: "CEE — ionic equilibrium",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Calculate the pH of a 0.001 M solution of hydrochloric acid and of a 0.001 M solution of sodium hydroxide.",
        given: "[HCl] = 1 \\times 10^{-3} M, \\quad [NaOH] = 1 \\times 10^{-3} M",
        steps: [
          "HCl is a strong acid, so [H^+] = 10^{-3}\\ M",
          "pH = -\\log(10^{-3}) = 3",
          "NaOH gives [OH^-] = 10^{-3}\\ M, so pOH = 3",
          "pH = 14 - pOH = 14 - 3 = 11",
        ],
        answer: "pH = 3 \\text{ (acid)}, \\quad pH = 11 \\text{ (base)}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Le Chatelier's Principle",
        definition:
          "The rule that a system at equilibrium shifts to counteract any imposed change in concentration, pressure or temperature.",
        significance:
          "It is the design principle behind industrial processes: ammonia synthesis uses high pressure and low temperature to push the yield towards NH3.",
      },
      {
        term: "Buffer Solution",
        definition:
          "A solution that resists a change in pH when a small amount of acid or base is added, typically a weak acid with its conjugate base, or a weak base with its conjugate acid.",
        significance:
          "Blood is buffered near pH 7.4 by the carbonic acid–bicarbonate system; even a shift of 0.4 units is dangerous.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Chemistry of Non-metals
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "chemistry-of-non-metals",
      "non-metal",
      "allotropy",
      "hydrogen-bonding",
      "oxidising-acid",
      "bleaching",
      "aqua-regia",
    ],
    subject: "chemistry",
    title: "Chemistry of Non-metals — Key Reactions, Oxidising Acids & Allotropy",
    unitSlugs: ["chemistry-of-non-metals"],
    category: "Inorganic Chemistry",
    governingLaws: [
      {
        name: "Diagonal Relationship",
        statement:
          "Certain elements of the second period resemble the elements diagonally below them in the third period, because their charge-to-radius ratios are similar.",
        formula: "Li \\leftrightarrow Mg, \\quad Be \\leftrightarrow Al, \\quad B \\leftrightarrow Si",
        conditions:
          "Explains why lithium forms a nitride (like magnesium), why beryllium and aluminium hydroxides are amphoteric, and why boron and silicon form volatile hydrides.",
      },
      {
        name: "Relative Strength of Oxyacids",
        statement:
          "For oxyacids of the same central atom the acid strength increases with the oxidation number of the central atom, and for the same oxidation number it increases with electronegativity.",
        formula:
          "HClO < HClO_2 < HClO_3 < HClO_4; \\quad HNO_3 > H_3PO_4 > H_3AsO_4",
        conditions:
          "Stronger acids have more electronegative central atoms withdrawing electrons from the O-H bond, making the proton easier to release.",
      },
    ],
    speedFormulas: [
      {
        name: "Concentrated Sulphuric Acid as an Oxidising Agent",
        formula:
          "Cu + 2H_2SO_4(\\text{conc}) \\rightarrow CuSO_4 + SO_2 + 2H_2O",
        description:
          "Hot concentrated sulphuric acid oxidises copper, carbon and sulphur, being itself reduced to SO2. Dilute H2SO4 does NOT oxidise copper; it only reacts with metals above hydrogen in the series.",
        unit: "reaction",
      },
      {
        name: "Aqua Regia",
        formula: "3\\ HCl : 1\\ HNO_3 \\text{ (3:1 by volume)}",
        description:
          "The most powerful oxidising mixture, generating nascent chlorine, which dissolves gold and platinum — the only acid mixture that can attack them.",
        unit: "volume ratio",
      },
      {
        name: "Industrial Processes for Non-metals",
        formula:
          "N_2 + 3H_2 \\rightleftharpoons 2NH_3; \\quad 4NH_3 + 5O_2 \\rightarrow 4NO + 6H_2O; \\quad 2SO_2 + O_2 \\rightarrow 2SO_3",
        description:
          "Haber process for ammonia: Fe catalyst, 400-500 degrees C, 200-300 atm. Ostwald process for nitric acid: Pt-Rh gauze at about 500 K. Contact process for sulphuric acid: V2O5 at 400-450 degrees C.",
        unit: "reaction",
      },
      {
        name: "Allotropes and Structures",
        formula: "\\text{C: diamond (sp}^3\\text{), graphite (sp}^2\\text{), fullerene; } P_4 \\text{ vs polymeric P}",
        description:
          "Diamond is the hardest natural substance and a bad conductor; graphite is soft, slippery and a good conductor because of delocalised electrons between its layers.",
        unit: "structure",
      },
    ],
    constantsAndValues: [
      { symbol: "n(O)", name: "Oxidation number of oxygen in H2O", value: "-2", unit: "dimensionless" },
      { symbol: "n(O)", name: "Oxidation number of oxygen in H2O2", value: "-1", unit: "dimensionless" },
      { symbol: "n(O)", name: "Oxidation number of oxygen in OF2", value: "+2", unit: "dimensionless" },
      { symbol: "n(S)", name: "Oxidation number of sulphur in H2SO4", value: "+6", unit: "dimensionless" },
      { symbol: "n(N)", name: "Oxidation number of nitrogen in HNO3", value: "+5", unit: "dimensionless" },
      { symbol: "\\Delta H_f(NH_3)", name: "Heat of formation of ammonia", value: "-46", unit: "kJ mol^-1" },
      { symbol: "P_{Haber}", name: "Pressure used in the Haber process", value: "200 - 300", unit: "atm" },
    ],
    entranceTraps: [
      {
        trap: "Concentrated sulphuric acid is a reducing agent.",
        truth:
          "Concentrated H2SO4 is a strong OXIDISING agent, especially when hot, being itself reduced to SO2. Only dilute H2SO4 behaves as an ordinary acid.",
        examRef: "NEB / IOE — non-metals",
      },
      {
        trap: "Diamond conducts electricity because it is a form of carbon.",
        truth:
          "Diamond does NOT conduct — all four valence electrons are locked in sigma bonds with no delocalised electrons. Graphite conducts because one electron per carbon is delocalised across each layer.",
        examRef: "IOE — allotropes of carbon",
      },
      {
        trap: "Graphite is soft because its covalent bonds are weak.",
        truth:
          "The covalent bonds WITHIN each layer are actually stronger than those in diamond. Graphite is soft because the LAYERS are held only by weak van der Waals forces and slide over one another.",
        examRef: "IOE — structure and properties",
      },
      {
        trap: "Oxygen always shows an oxidation number of -2.",
        truth:
          "Oxygen is -1 in peroxides such as H2O2 and Na2O2, -1/2 in superoxides such as KO2, and +2 in OF2 where fluorine is more electronegative than oxygen.",
        examRef: "CEE — oxidation numbers",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Find the oxidation number of sulphur in H2SO4 and of oxygen in H2O2.",
        given: "H = +1, O = -2 \\text{ (except in peroxides)}",
        steps: [
          "For H_2SO_4: 2(+1) + x + 4(-2) = 0",
          "x - 6 = 0 \\implies x = +6",
          "For H_2O_2 the two oxygen atoms are bonded to each other with an O-O peroxide linkage",
          "2(+1) + 2x = 0 \\implies x = -1",
        ],
        answer: "S = +6 \\text{ in } H_2SO_4, \\quad O = -1 \\text{ in } H_2O_2",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Allotropy",
        definition:
          "The existence of an element in two or more different structural forms in the same physical state, which differ in physical properties but give the same chemical reactions.",
        significance:
          "Explains carbon as diamond, graphite and fullerene, and phosphorus as white, red and black — the structure alone changes hardness, conductivity and reactivity.",
      },
      {
        term: "Hydrogen Bonding",
        definition:
          "A strong dipole–dipole attraction between a hydrogen atom bonded to a highly electronegative atom (F, O or N) and a lone pair on another electronegative atom.",
        significance:
          "Arises why water is a liquid at room temperature, why ice floats, and why HF and water have anomalously high boiling points.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Chemistry of Metals
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "chemistry-of-metals",
      "metallurgy",
      "ores",
      "roasting",
      "calcination",
      "smelting",
      "refining",
      "alloys",
    ],
    subject: "chemistry",
    title: "Chemistry of Metals — Ores, Metallurgy & Alloys",
    unitSlugs: ["chemistry-of-metals"],
    category: "Inorganic Chemistry",
    governingLaws: [
      {
        name: "Principles of Metallurgy",
        statement:
          "Extraction of a metal from its ore follows four stages: concentration of the ore, conversion to the oxide, reduction to the metal, and finally refining to high purity.",
        formula: "\\text{ore} \\rightarrow \\text{concentrate} \\rightarrow \\text{oxide} \\rightarrow \\text{crude metal} \\rightarrow \\text{pure metal}",
        conditions:
          "The choice of reducing agent follows the reactivity series: reactive metals need electrolysis, moderately reactive metals use carbon or CO, and unreactive metals are found native.",
      },
      {
        name: "Roasting versus Calcination",
        statement:
          "Roasting heats a sulphide ore strongly in a plentiful supply of air to give the oxide and sulphur dioxide; calcination heats a carbonate or hydrated oxide in a limited supply of air to drive off carbon dioxide or water.",
        formula:
          "2ZnS + 3O_2 \\xrightarrow{\\Delta} 2ZnO + 2SO_2; \\quad CaCO_3 \\xrightarrow{\\Delta} CaO + CO_2",
        conditions:
          "Roasting is for sulphide ores and is always oxidising; calcination is for carbonate and hydroxide ores and is carried out in the absence of, or with limited, air.",
      },
    ],
    speedFormulas: [
      {
        name: "Reduction Methods by Reactivity",
        formula:
          "\\text{Al: electrolysis}; \\quad \\text{Fe: } Fe_2O_3 + 3CO \\rightarrow 2Fe + 3CO_2; \\quad \\text{Zn: } ZnO + C \\rightarrow Zn + CO",
        description:
          "Aluminium cannot be obtained by carbon reduction because aluminium is more reactive than carbon — it is extracted by the Hall-Heroult electrolysis of molten alumina in cryolite.",
        unit: "reaction",
      },
      {
        name: "Percentage of Metal in an Ore",
        formula: "\\%\\ \\text{metal} = \\frac{\\text{mass of metal in 1 mol of ore}}{\\text{molar mass of ore}} \\times 100",
        description:
          "Haematite Fe2O3 is 112/160, that is 70 percent iron. This calculation is the standard first step in extraction numericals.",
        unit: "%",
      },
      {
        name: "Zone Refining and Electrolytic Refining",
        formula: "\\text{Anode: } M \\rightarrow M^{n+} + ne^-; \\quad \\text{Cathode: } M^{n+} + ne^- \\rightarrow M",
        description:
          "The impure metal forms the anode and dissolves, while pure metal deposits on the cathode. The impurities either dissolve in the electrolyte or fall as anode mud.",
        unit: "reaction",
      },
      {
        name: "Important Alloys",
        formula:
          "\\text{Brass} = Cu + Zn; \\quad \\text{Bronze} = Cu + Sn; \\quad \\text{Steel} = Fe + C; \\quad \\text{Duralumin} = Al + Cu + Mg + Mn",
        description:
          "Stainless steel adds chromium and nickel. Solder is lead and tin, and is used because of its low melting point.",
        unit: "composition",
      },
    ],
    constantsAndValues: [
      { symbol: "Fe_2O_3", name: "Haematite — main ore of iron", value: "70% Fe", unit: "mass fraction" },
      { symbol: "Al_2O_3 \\cdot 2H_2O", name: "Bauxite — main ore of aluminium", value: "about 60% Al2O3", unit: "mass fraction" },
      { symbol: "ZnS", name: "Zinc blende — main ore of zinc", value: "67% Zn", unit: "mass fraction" },
      { symbol: "PbS", name: "Galena — main ore of lead", value: "86.6% Pb", unit: "mass fraction" },
      { symbol: "FeS_2", name: "Iron pyrites — ore of iron and source of sulphur", value: "46.5% Fe", unit: "mass fraction" },
      { symbol: "M(Fe_2O_3)", name: "Molar mass of haematite", value: "160", unit: "g mol^-1" },
    ],
    entranceTraps: [
      {
        trap: "Roasting and calcination are the same process.",
        truth:
          "Roasting is heating a SULPHIDE ore in excess air (an oxidising process producing SO2); calcination is heating a CARBONATE or HYDROXIDE ore in limited air (producing CO2 or water vapour).",
        examRef: "NEB / IOE — metallurgy",
      },
      {
        trap: "Aluminium is extracted by reducing alumina with carbon.",
        truth:
          "Aluminium is more reactive than carbon, so carbon cannot reduce it. Aluminium is obtained by electrolysis of molten alumina dissolved in cryolite, which lowers the melting point from about 2323 K to roughly 1140 K.",
        examRef: "IOE/CEE — extraction of aluminium",
      },
      {
        trap: "Alloys always have a lower melting point than their parent metals.",
        truth:
          "Solder and brass do melt lower than their components, but alloying can also increase hardness, tensile strength and corrosion resistance. The melting point may rise too.",
        examRef: "NEB — alloys",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Calculate the percentage of iron by mass in haematite, Fe2O3. Take Fe = 56 and O = 16.",
        given: "M(Fe_2O_3) = 2(56) + 3(16) = 160\\ g\\ mol^{-1}",
        steps: [
          "Mass of iron in one mole of the ore = 2 \\times 56 = 112\\ g",
          "\\%\\ Fe = \\frac{112}{160} \\times 100",
          "\\%\\ Fe = 70\\%",
        ],
        answer: "70\\% \\text{ iron by mass}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Roasting",
        definition:
          "The process of heating a sulphide ore strongly in the presence of excess air to convert it into its oxide, releasing sulphur dioxide.",
        significance:
          "The sulphur dioxide released is the raw material for the Contact process, which is why metal smelters are also sulphuric acid plants.",
      },
      {
        term: "Anode Mud",
        definition:
          "The insoluble impurities left beneath the anode during electrolytic refining, which may contain valuable metals such as silver, gold and platinum.",
        significance:
          "Electrolytic refining of copper recovers enough silver and gold from the anode mud to make the process economical.",
      },
    ],
  },
];
