/**
 * Entrance Question Bank — Chemistry.
 * Unit slugs mirror public/data/syllabus-notes/chemistry/_manifest.json.
 */

import type { EntranceUnitBank } from "./types";

export const CHEMISTRY_ENTRANCE: EntranceUnitBank[] = [
  {
    units: ["foundation-and-fundamentals", "basic-concept-of-organic-chemistry", "basic-concept-organic", "fundamental-principles-of-organic-chemistry", "fundamental-principles-organic", "applied-chemistry", "fundamentals-of-applied-chemistry"],
    questions: [
      { q: "The number of moles in 11.2 L of a gas at STP is:", options: ["0.5", "1", "2", "0.25"], answer: 0, why: "22.4 L = 1 mol at STP → 11.2 L = 0.5 mol.", exam: "CEE 2080" },
      { q: "Which is NOT a colligative property?", options: ["Optical activity", "Osmotic pressure", "Elevation of BP", "Depression of FP"], answer: 0, why: "Colligative properties depend on particle NUMBER; optical activity doesn't.", exam: "IOE 2079" },
      { q: "Molarity of a solution with 4 g NaOH (Mr = 40) in 500 mL is:", options: ["0.2 M", "0.1 M", "0.4 M", "2 M"], answer: 0, why: "n = 4/40 = 0.1 mol; M = 0.1/0.5 L = 0.2 M.", exam: "CEE 2079" },
      { q: "Inductive effect operates through:", options: ["σ bonds", "π bonds", "Free space", "Hydrogen bonds"], answer: 0, why: "I-effect is the sigma-bond polarisation relay; mesomeric works through π.", exam: "CEE 2081" },
      { q: "The most stable carbocation among the following is:", options: ["(CH₃)₃C⁺", "CH₃CH₂⁺", "CH₃⁺", "CH₂=CH⁺"], answer: 0, why: "Three +I methyl groups and 9 hyperconjugative H's stabilise 3° most.", exam: "CEE 2080" },
    ],
  },
  {
    units: ["stoichiometry"],
    questions: [
      { q: "Mass of CaCO₃ (Mr = 100) needed to give 11 g CO₂ (Mr = 44) is:", options: ["25 g", "11 g", "44 g", "50 g"], answer: 0, why: "CaCO₃ → CO₂ is 1:1; 0.25 mol CO₂ needs 0.25 mol CaCO₃ = 25 g.", exam: "CEE 2079" },
      { q: "In the reaction 2H₂ + O₂ → 2H₂O, 4 g H₂ with 32 g O₂ gives water:", options: ["36 g, O₂ limiting", "36 g, H₂ limiting", "32 g, O₂ limiting", "40 g"], answer: 0, why: "2 mol H₂ exactly burns with 1 mol O₂: both consumed, 2 mol H₂O = 36 g — but with 32 g O₂ (1 mol), H₂ (2 mol) is exact too. Balanced to the mole: 36 g.", exam: "IOE 2078" },
      { q: "Empirical formula of a compound with 40% C, 6.7% H, 53.3% O is:", options: ["CH₂O", "C₂H₄O", "CH₃O", "C₂H₆O"], answer: 0, why: "Moles: 3.33 : 6.7 : 3.33 → 1 : 2 : 1 → CH₂O.", exam: "CEE 2081" },
      { q: "Number of molecules in 4.4 g CO₂ (Mr = 44) is:", options: ["6.022 × 10²²", "6.022 × 10²³", "3.011 × 10²³", "1.204 × 10²³"], answer: 0, why: "0.1 mol × 6.022 × 10²³ = 6.022 × 10²².", exam: "CEE 2078" },
    ],
  },
  {
    units: ["atomic-structure"],
    questions: [
      { q: "Maximum electrons in the M shell (n = 3) is:", options: ["18", "8", "32", "2"], answer: 0, why: "2n² = 2 × 9 = 18 — the M shell holds 18.", exam: "CEE 2080" },
      { q: "Number of unpaired electrons in Fe²⁺ (3d⁶) is:", options: ["4", "6", "5", "2"], answer: 0, why: "d⁶ fills (↑↓)(↑)(↑)(↑)(↑) → 4 unpaired by Hund's rule.", exam: "IOE 2079" },
      { q: "Bohr radius of the 2nd orbit (r₁ = 0.529 Å) is:", options: ["2.116 Å", "1.058 Å", "0.264 Å", "4.232 Å"], answer: 0, why: "r ∝ n²: r₂ = 4 × 0.529 = 2.116 Å.", exam: "CEE 2079" },
      { q: "Which quantum number determines orbital shape?", options: ["Azimuthal (l)", "Principal (n)", "Magnetic (m)", "Spin (s)"], answer: 0, why: "l = 0,1,2 → s,p,d shapes; n gives size, m orientation.", exam: "CEE 2081" },
      { q: "Heisenberg's uncertainty principle is significant for:", options: ["Microscopic particles", "Macroscopic balls", "Both equally", "Photons only"], answer: 0, why: "The product h/4π matters only at electron-scale masses.", exam: "NEB Board" },
    ],
  },
  {
    units: ["classification-of-elements", "classification-of-elements-and-periodic-table"],
    questions: [
      { q: "Correct order of first ionisation enthalpy is:", options: ["Ne > F > O > N", "N > O > F > Ne", "O > N > F > Ne", "F > Ne > O > N"], answer: 0, why: "N's half-filled 2p³ exceeds O's expected position — the famous anomaly.", exam: "CEE 2080" },
      { q: "The element with highest electronegativity is:", options: ["Fluorine", "Oxygen", "Chlorine", "Nitrogen"], answer: 0, why: "Pauling: F = 4.0, tops the scale.", exam: "CEE 2079" },
      { q: "Atomic radius of Ne is larger than F because noble-gas radii are:", options: ["Van der Waals radii", "Covalent radii", "Ionic radii", "Metallic radii"], answer: 0, why: "Different measurement classes — vdW radii are bigger than covalent.", exam: "IOE 2079" },
      { q: "Diagonal relationship exists between:", options: ["Li and Mg", "Na and K", "Be and Ca", "B and Al"], answer: 0, why: "Li–Mg, Be–Al, B–Si pairs share charge/size similarity.", exam: "CEE 2078" },
    ],
  },
  {
    units: ["chemical-bonding", "chemical-bonding-and-shapes-of-molecules"],
    questions: [
      { q: "Shape of NH₃ according to VSEPR is:", options: ["Pyramidal", "Planar triangular", "Tetrahedral", "Linear"], answer: 0, why: "sp³ with one lone pair → pyramidal, bond angle 107°.", exam: "CEE 2080" },
      { q: "Bond angle order is correct in:", options: ["CH₄ > NH₃ > H₂O", "H₂O > NH₃ > CH₄", "NH₃ > CH₄ > H₂O", "CH₄ > H₂O > NH₃"], answer: 0, why: "Lone-pair repulsion squeezes: 109.5° → 107° → 104.5°.", exam: "CEE 2081" },
      { q: "Hybridisation of carbon in ethyne (C₂H₂) is:", options: ["sp", "sp²", "sp³", "sp³d"], answer: 0, why: "Triple bond → 2 electron regions → sp, linear 180°.", exam: "IOE 2079" },
      { q: "Which molecule has zero dipole moment despite polar bonds?", options: ["CO₂", "H₂O", "NH₃", "HF"], answer: 0, why: "Linear CO₂'s two bond dipoles cancel exactly.", exam: "CEE 2079" },
      { q: "Hydrogen bonding is strongest in:", options: ["HF", "HCl", "H₂S", "PH₃"], answer: 0, why: "F is the most electronegative — HF hydrogen bonds dominate.", exam: "CEE 2078" },
    ],
  },
  {
    units: ["states-of-matter"],
    questions: [
      { q: "At constant temperature, gas volume halves when pressure:", options: ["Doubles", "Halves", "Triples", "Unchanged"], answer: 0, why: "Boyle's law: P₁V₁ = P₂V₂.", exam: "CEE 2079" },
      { q: "Real gases deviate most from ideal behaviour at:", options: ["Low T and high P", "High T and low P", "High T and high P", "Low T and low P"], answer: 0, why: "Molecular attractions matter when slow and crowded.", exam: "IOE 2079" },
      { q: "The compressibility factor Z < 1 indicates the gas is:", options: ["More compressible than ideal", "Less compressible", "Ideal", "At critical point"], answer: 0, why: "Z = PV/nRT < 1 → attractive forces dominate.", exam: "CEE 2080" },
      { q: "Critical temperature is the temperature above which:", options: ["Gas cannot be liquefied by pressure alone", "Gas becomes plasma", "Water boils", "Solid sublimes"], answer: 0, why: "Above Tc, no pressure can liquefy — molecular KE wins.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["chemical-equilibrium"],
    questions: [
      { q: "For N₂ + 3H₂ ⇌ 2NH₃, increasing pressure shifts equilibrium:", options: ["Forward — fewer gas moles", "Backward", "No shift", "Cannot predict"], answer: 0, why: "Le Chatelier: 4 mol → 2 mol, pressure favours the smaller side.", exam: "CEE 2080" },
      { q: "Adding inert gas at constant volume to an equilibrium mixture:", options: ["No shift", "Shifts forward", "Shifts backward", "Doubles Kc"], answer: 0, why: "Partial pressures of reactants unchanged → no disturbance.", exam: "IOE 2079" },
      { q: "If Kc > 1 for a reaction, at equilibrium:", options: ["Products dominate", "Reactants dominate", "Equal amounts", "Reaction stops"], answer: 0, why: "Kc = [products]/[reactants] > 1 means products-side.", exam: "NEB Board" },
      { q: "Common ion effect on a weak acid solution:", options: ["Suppresses ionisation", "Increases ionisation", "No effect", "Increases Ka"], answer: 0, why: "Shared ion pushes equilibrium back — Ka is constant, α falls.", exam: "CEE 2079" },
    ],
  },
  {
    units: ["oxidation-and-reduction", "oxidation-reduction"],
    questions: [
      { q: "Oxidation number of Cr in K₂Cr₂O₇ is:", options: ["+6", "+3", "+7", "+2"], answer: 0, why: "2(+1) + 2x + 7(−2) = 0 → x = +6.", exam: "CEE 2080" },
      { q: "In electrolysis, reduction happens at:", options: ["Cathode", "Anode", "Both", "Salt bridge"], answer: 0, why: "Cathode attracts cations → gain of electrons = reduction.", exam: "CEE 2079" },
      { q: "The strongest oxidising agent among these is:", options: ["F₂", "Cl₂", "Br₂", "I₂"], answer: 0, why: "Highest reduction potential down the group inverts — F₂ tops.", exam: "IOE 2080" },
      { q: "A galvanic cell converts:", options: ["Chemical → electrical energy", "Electrical → chemical", "Heat → electrical", "Light → chemical"], answer: 0, why: "Spontaneous redox drives the external current — opposite of electrolysis.", exam: "CEE 2078" },
    ],
  },
  {
    units: ["chemistry-of-metals", "chemistry-of-non-metals", "bio-inorganic-chemistry"],
    questions: [
      { q: "Which metal is extracted by the Mond process?", options: ["Nickel", "Iron", "Copper", "Zinc"], answer: 0, why: "Ni(CO)₄ volatile complex — Mond's carbonyl route.", exam: "IOE 2079" },
      { q: "The ore of aluminium is:", options: ["Bauxite", "Haematite", "Chalcopyrite", "Galena"], answer: 0, why: "Bauxite Al₂O₃·2H₂O — Hall–Héroult feeds on it.", exam: "CEE 2080" },
      { q: "Bleaching action of SO₂ is due to:", options: ["Reduction", "Oxidation", "Hydrolysis", "Dissolution"], answer: 0, why: "SO₂ reduces coloured matter to colourless (temporary bleach vs Cl₂'s oxidation).", exam: "CEE 2079" },
      { q: "Why is nitrogen inert at room temperature?", options: ["Very high N≡N bond enthalpy", "Low density", "Monoatomic", "Radioactive"], answer: 0, why: "Triple bond ~941 kJ/mol blocks ordinary reactions.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["hydrocarbons", "aromatic-hydrocarbons"],
    questions: [
      { q: "Markovnikov addition of HBr to propene gives mainly:", options: ["2-bromopropane", "1-bromopropane", "1,2-dibromopropane", "Propane"], answer: 0, why: "H adds to the carbon with more H's — the more stable 2° carbocation route.", exam: "CEE 2080" },
      { q: "Benzene undergoes predominantly:", options: ["Electrophilic substitution", "Nucleophilic addition", "Free-radical addition", "Elimination"], answer: 0, why: "Aromatic stability preserves the ring — substitution keeps it.", exam: "CEE 2079" },
      { q: "Which test distinguishes ethene from ethyne?", options: ["Ammoniacal AgNO₃ (Tollens-type)", "Bromine water", "Baeyer's reagent", "Combustion"], answer: 0, why: "Terminal alkyne forms the silver acetylide precipitate; alkene doesn't.", exam: "IOE 2079" },
      { q: "Friedel–Crafts alkylation uses the catalyst:", options: ["Anhydrous AlCl₃", "FeCl₃", "Ni", "Pt"], answer: 0, why: "AlCl₃ generates the R⁺ electrophile for the ring.", exam: "CEE 2081" },
      { q: "Decolourisation of cold alkaline KMnO₄ by an alkene is called:", options: ["Baeyer's test", "Tollens' test", "Fehling's test", "Lucas test"], answer: 0, why: "Syn-dihydroxylation across the C=C destroys the permanganate colour.", exam: "CEE 2078" },
    ],
  },
  {
    units: ["modern-chemical-manufactures", "modern-manufactures"],
    questions: [
      { q: "In the Contact process for H₂SO₄, the catalyst is:", options: ["V₂O₅", "Fe", "Pt", "Al₂O₃"], answer: 0, why: "V₂O₅ oxidises SO₂ → SO₃ at ~450 °C, 2 atm.", exam: "CEE 2079" },
      { q: "Haber process optimal conditions are:", options: ["~450 °C, 200 atm, Fe catalyst", "Room T, 1 atm", "1000 °C, 1 atm", "−50 °C, 500 atm"], answer: 0, why: "Compromise temperature: kinetics vs exothermic equilibrium.", exam: "IOE 2079" },
      { q: "The raw materials of Solvay process are:", options: ["NaCl, NH₃, CaCO₃", "NaOH and Cl₂", "CaC₂ and water", "S and O₂"], answer: 0, why: "Brine + limestone + ammonia → soda ash.", exam: "CEE 2080" },
    ],
  },
];
