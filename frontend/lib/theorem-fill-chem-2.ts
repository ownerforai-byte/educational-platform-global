/**
 * Theorem Fill — Chemistry Part B (non-metals, metals, organic, class-12).
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

const C2: DerivationOrTheorem[] = [
  {
    id: "tf-chem-11-oxyacids-nitrogen",
    slug: "oxy-acids-of-nitrogen-name-and-formula",
    title: "Oxy-acids of Nitrogen (Names and Formulas)",
    subject: "chemistry",
    unit: "Chemistry of Non-Metals",
    unitId: "chemistry-of-non-metals",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Non-Metals)",
    isExtra: false,
    statement:
      "Nitrogen forms four oxy-acids: hyponitrous H₂N₂O₂ (N +1), nitrous HNO₂ (N +3), nitric HNO₃ (N +5) and pernitric HNO₄ (N +7). The oxidation number climbs in steps of 2; HNO₃ is the strong, oxidizing bench acid; HNO₂ is unstable and a disproportionator.",
    coreFormula: "HNO_2 (+3), \\quad HNO_3 (+5), \\quad H_2N_2O_2 (+1), \\quad HNO_4 (+7)",
    concernedTerms: [
      { term: "Nitrous acid", symbol: "HNO₂", units: "—", definition: "Weak, pale-blue, unstable acid; oxidizing AND reducing (N +3 middle state)." },
      { term: "Nitric acid", symbol: "HNO₃", units: "—", definition: "Strong oxidizing acid; attacks nearly all metals (passivates Al, Fe, Cr cold-concentrated)." },
      { term: "Hyponitrous acid", symbol: "H₂N₂O₂", units: "—", definition: "Dimeric acid, N(+1); its salts (hyponitrites) are reducing agents." },
    ],
    assumptions: ["O = −2, H = +1 throughout the series.", "Structures are NEB-qualitative (formal N–O/H arrangements)."],
    proofSteps: [
      { stepNumber: 1, title: "Oxidation numbers", latex: "HNO_3: 1 + x + 3(-2) = 0 \\Rightarrow x = +5", explanation: "The sum rule fixes each N state; the series spans +1 → +7 in steps of 2." },
      { stepNumber: 2, title: "Anhydride link", latex: "2HNO_3 \\xrightarrow{-H_2O} N_2O_5; \\quad 2HNO_2 \\to N_2O_3 + H_2O", explanation: "Each oxy-acid dehydrates to the corresponding oxide — N₂O₅ acid anhydride of HNO₃, N₂O₃ of HNO₂." },
      { stepNumber: 3, title: "Strength trend", latex: "\\text{more O on N} \\Rightarrow \\text{stronger acid}", explanation: "Extra oxygens pull electron density, weakening O–H: HNO₃ (strong) ≫ HNO₂ (weak, K_a ≈ 4.5×10⁻⁴)." },
    ],
    conclusion:
      "Four acids, one element, four oxidation states: HNO₂'s middle state makes it ambident (both oxidant and reductant), while HNO₃'s +5 makes it a pure oxidizer.",
    keyTakeaways: [
      "HNO₃ + HCl (1:3) = aqua regia dissolves gold/platinum.",
      "HNO₂ disproportionates: 3HNO₂ → HNO₃ + 2NO + H₂O.",
      "Conc. HNO₃ + non-metals: C → CO₂, S → H₂SO₄ (oxidized fully).",
    ],
    examTraps: [
      "❌ Writing HNO₂ as strong acid — it is weak.",
      "❌ Forgetting pernitric HNO₄ when 'all oxy-acids' are asked.",
    ],
    visualType: "tv-oxyacids-nitrogen",
    specialCases: [
      { name: "Passivation", condition: "Cold conc. HNO₃", formula: "Al, Fe, Cr \\text{ coated}", meaning: "Surface oxide stops further attack — HNO₃ ships in Al tanks." },
      { name: "Xanthoproteic", condition: "HNO₃ + protein", formula: "\\text{yellow stain}", meaning: "Nitration of aromatic rings — the classic skin test." },
      { name: "Nitrite test", condition: "HNO₂ + amine", formula: "\\text{N}_2 \\uparrow", meaning: "Basis of nitrous-acid qualitative tests." },
    ],
    solvedProblems: [],
  },
  {
    id: "tf-chem-11-sodium-thiosulphate",
    slug: "sodium-thiosulphate-formula-and-uses",
    title: "Sodium Thiosulphate (Formula and Uses)",
    subject: "chemistry",
    unit: "Chemistry of Non-Metals",
    unitId: "chemistry-of-non-metals",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Non-Metals)",
    isExtra: false,
    statement:
      "Sodium thiosulphate pentahydrate Na₂S₂O₃·5H₂O ('hypo') carries S₂O₃²⁻ with one +5 and one −1 sulphur (average +2). It is a mild reducing agent and complexing agent: it decolourizes iodine (2S₂O₃²⁻ + I₂ → S₄O₆²⁻ + 2I⁻), dissolves AgBr in photography, and is the antichlor in textile bleaching.",
    coreFormula: "Na_2S_2O_3\\cdot5H_2O, \\qquad 2S_2O_3^{2-} + I_2 \\to S_4O_6^{2-} + 2I^-",
    concernedTerms: [
      { term: "Thiosulphate ion", symbol: "S₂O₃²⁻", units: "—", definition: "Sulphate with one O replaced by S: central S +5, terminal S −1." },
      { term: "Iodometric titration", symbol: "—", units: "—", definition: "Standard volumetric use — hypo is the primary standard for iodine." },
      { term: "Antichlor", symbol: "—", units: "—", definition: "Removes excess chlorine from bleached fabric: S₂O₃²⁻ + 4Cl₂ + 5H₂O → 2SO₄²⁻ + 8Cl⁻ + 10H⁺." },
    ],
    assumptions: ["Average O.N. +2 per S is the bookkeeping value.", "Mild, neutral-to-alkaline conditions."],
    proofSteps: [
      { stepNumber: 1, title: "Formula mass", latex: "M = 2(23) + 2(32) + 3(16) + 5(18) = 248", explanation: "Pentahydrate's 90 g of water matters — weighing crystals must include it." },
      { stepNumber: 2, title: "Iodine reaction", latex: "I_2 + 2S_2O_3^{2-} \\to 2I^- + S_4O_6^{2-}", explanation: "Iodine oxidizes thiosulphate to tetrathionate — the endpoint goes starch-blue → colourless." },
      { stepNumber: 3, title: "Photographic fixer", latex: "AgBr + 2S_2O_3^{2-} \\to [Ag(S_2O_3)_2]^{3-} + Br^-", explanation: "The silver-complex formation dissolves unexposed AgBr, fixing the image." },
    ],
    conclusion:
      "Hypo is the lab's gentle reductant and silver's favourite ligand: iodometry, photography and antichlor action are three faces of the same S₂O₃²⁻ chemistry.",
    keyTakeaways: [
      "Na₂S₂O₃·5H₂O: M = 248, monoclinic crystals, efflorescent.",
      "With dilute HCl it gives colloidal S + SO₂ (not H₂S₂O₃ — the acid is unstable).",
      "Iodometric endpoint: blue starch–iodine disappears at exact equivalence.",
    ],
    examTraps: [
      "❌ Forgetting the 5H₂O when calculating molar mass (248, not 158).",
      "❌ Writing thiosulphate + acid → H₂S₂O₃ — it decomposes instantly to S + SO₂.",
    ],
    visualType: "tv-thiosulphate",
    specialCases: [
      { name: "With Cl₂", condition: "Excess chlorine", formula: "\\to 2H_2SO_4 + 2HCl", meaning: "Strong oxidants push S all the way to +6." },
      { name: "With Ag⁺", condition: "Stoichiometric Ag⁺", formula: "Ag_2S_2O_3 \\downarrow \\text{ (white → yellow → black)}", meaning: "Silver thiosulphate hydrolyses to black Ag₂S." },
      { name: "Cyanide antidote", condition: "Medicine", formula: "CN^- \\to SCN^-", meaning: " rhodanese enzyme uses thiosulphate to detoxify cyanide." },
    ],
    solvedProblems: [
      {
        id: "tf-c-thio-1",
        question: "How many moles of hypo react with 0.1 mol I₂?",
        examBadge: "NEB Board",
        given: "I₂ + 2S₂O₃²⁻ → ...",
        stepByStep: ["1:2 ratio ⇒ 0.1 × 2 = 0.2 mol."],
        finalAnswer: "0.2\\ \\text{mol Na}_2S_2O_3",
        tipOrTrap: "The iodine–thiosulphate ratio is always 1 : 2.",
      },
    ],
  },
  {
    id: "tf-chem-11-metallurgy-def",
    slug: "metals-and-metallurgical-principles-definition-of-metallurgy-and-its-types-hydrometallurgy-pyrom",
    title: "Metallurgy and Its Types (Hydro-, Pyro-, Electro-metallurgy)",
    subject: "chemistry",
    unit: "Chemistry of Metals",
    unitId: "chemistry-of-metals",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Metals)",
    isExtra: false,
    statement:
      "Metallurgy is the science of extracting metals from ores. Branches: hydrometallurgy (aqueous leaching, e.g. gold cyanidation), pyrometallurgy (high-temperature smelting/reduction, e.g. iron in blast furnace), electrometallurgy (electrolytic reduction, e.g. aluminium from Al₂O₃, copper refining). Choice depends on the metal's position in the activity series.",
    coreFormula: "\\text{Al}^{3+} + 3e^- \\xrightarrow{\\text{electrolysis}} \\text{Al}; \\quad \\text{Fe}_2O_3 + 3CO \\xrightarrow{\\Delta} 2\\text{Fe} + 3CO_2",
    concernedTerms: [
      { term: "Ore", symbol: "—", units: "—", definition: "Mineral from which a metal is extracted economically (bauxite, haematite)." },
      { term: "Gangue", symbol: "—", units: "—", definition: "Worthy-rock impurities (SiO₂, Al₂O₃) removed as slag with flux." },
      { term: "Activity series", symbol: "—", units: "—", definition: "Ranks metals by reduction difficulty — determines the extraction branch." },
    ],
    assumptions: ["Economic feasibility defines 'ore'.", "Each branch exemplified by one NEB metal."],
    proofSteps: [
      { stepNumber: 1, title: "Highly reactive metals → electrometallurgy", latex: "Na, K, Al, Mg: \\text{molten salt electrolysis}", explanation: "Chemical reductants can't beat these — electrons supplied directly at cathode." },
      { stepNumber: 2, title: "Mid-series → pyrometallurgy", latex: "Zn, Fe, Pb, Cu: \\text{C/CO reduction at heat}", explanation: "Carbon/coke is cheap and strong enough at furnace temperatures." },
      { stepNumber: 3, title: "Noble metals → hydrometallurgy", latex: "Au: 4Au + 8CN^- + O_2 + 2H_2O \\to 4[Au(CN)_2]^- + 4OH^-", explanation: "Leaching with complexing/cyanide solution dissolves gold selectively; Zn displaces it back." },
    ],
    conclusion:
      "The activity series is the metallurgist's decision tree: the harder the metal resists reduction, the more exotic the branch — electricity for the top, fire for the middle, water for the bottom.",
    keyTakeaways: [
      "General steps: concentration → calcination/roasting → reduction → refining.",
      "Flux + gangue = slag (CaO + SiO₂ → CaSiO₃).",
      "Electro-refining (Cu at 99.99%) is the classic electrolytic purification.",
    ],
    examTraps: [
      "❌ Mixing up roasting (sulphide → oxide, with O₂) and calcination (carbonate → oxide, without air).",
      "❌ Putting Al in pyrometallurgy — only electrolysis reduces it industrially.",
    ],
    visualType: "tv-metallurgy-types",
    specialCases: [
      { name: "Blast furnace", condition: "Fe extraction", formula: "C + O_2 \\to CO_2; \\; CO_2 + C \\to 2CO", meaning: "CO is the true reducing agent inside the stack." },
      { name: "Hall–Héroult", condition: "Al electrolysis", formula: "2Al_2O_3 + 3C \\to 4Al + 3CO_2", meaning: "Cryolite lowers the melt temperature ~1000°C." },
      { name: "Amalgamation", condition: "Ag, Au", formula: "\\text{metal dissolves in Hg}", meaning: "Historic hydrometallurgical cousin." },
    ],
    solvedProblems: [],
  },
  {
    id: "tf-chem-11-extraction-principles",
    slug: "general-principles-of-extraction-of-metals-concentration-calcination-and-roasting-smelting-carbo",
    title: "General Principles of Extraction: Concentration, Calcination, Roasting, Smelting & Reduction",
    subject: "chemistry",
    unit: "Chemistry of Metals",
    unitId: "chemistry-of-metals",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Metals)",
    isExtra: false,
    statement:
      "Extraction proceeds: (1) concentration — gravity/washing, magnetic, froth-floatation, or leaching removes gangue; (2) conversion to oxide — calcination (carbonate/hydroxide, air-limited) or roasting (sulphide, with excess air); (3) reduction — carbon/coke smelting, thermite (Al), or electrolysis; (4) refining — distillation, liquation, poling, electrolysis.",
    coreFormula: "ZnCO_3 \\xrightarrow{\\Delta} ZnO + CO_2 \\ (\\text{calcination}); \\quad 2ZnS + 3O_2 \\xrightarrow{\\Delta} 2ZnO + 2SO_2 \\ (\\text{roasting}); \\quad ZnO + C \\to Zn + CO",
    concernedTerms: [
      { term: "Froth floatation", symbol: "—", units: "—", definition: "Sulphide ores attach to bubbles (pine oil) and float; gangue sinks." },
      { term: "Flux", symbol: "—", units: "—", definition: "Acidic (SiO₂) or basic (CaO) additive that liquefies gangue into removable slag." },
      { term: "Smelting", symbol: "—", units: "—", definition: "Carbon reduction of the roasted ore in a furnace with flux." },
    ],
    assumptions: ["Oxide route is universal — every process aims at the oxide first.", "Choice of reduction depends on reactivity of the metal."],
    proofSteps: [
      { stepNumber: 1, title: "Concentration matches ore property", latex: "\\text{magnetic Fe}_3O_4 \\Rightarrow \\text{magnetic sep.}; \\; \\text{sulphide hydrophobic} \\Rightarrow \\text{froth}", explanation: "Physical differences (density, magnetism, wettability, solubility) separate ore from gangue." },
      { stepNumber: 2, title: "Calcination vs roasting", latex: "MCO_3 \\to MO + CO_2; \\; MS + O_2 \\to MO + SO_2", explanation: "Both yield the oxide; calcination for carbonates in limited air, roasting for sulphides with plenty of it (SO₂ recovered for H₂SO₄)." },
      { stepNumber: 3, title: "Reduction ladder", latex: "\\text{C (mid)} \\to \\text{Al thermite (Cr, Mn)} \\to \\text{electrolysis (Na, Al)}", explanation: "Ellingham-style ranking: the reductant must be cheaper AND stronger than the target metal's oxide bond." },
    ],
    conclusion:
      "Metallurgy funnels every ore to its oxide, then chooses the cheapest reducing agent that can do the job — with refining sweeping purity to the commercial grade.",
    keyTakeaways: [
      "Roasting of ZnS also self-reduces partially (2ZnS + 3O₂ → 2ZnO + 2SO₂).",
      "Thermite: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ + heat (rail welding).",
      "Electrolytic refining sets impure anode, pure cathode, metal-salt electrolyte.",
    ],
    examTraps: [
      "❌ Applying froth floatation to oxide ores — it's for sulphides only.",
      "❌ Saying calcination needs excess air — limited air/absence is the definition.",
    ],
    visualType: "tv-extraction-principles",
    specialCases: [
      { name: "Self-reduction", condition: "Cu₂S partially", formula: "Cu_2S + 2Cu_2O \\to 6Cu + SO_2", meaning: "Copper converter uses its own oxide." },
      { name: "Van Arkel", condition: "Ultra-pure Ti", formula: "I_2 \\text{ transport}", meaning: "Iodide decomposition refining." },
      { name: "Zone refining", condition: "Semiconductor Si", formula: "\\text{impurities follow melt}", meaning: "Repeated molten-zone sweeps." },
    ],
    solvedProblems: [],
  },
  {
    id: "tf-chem-11-industrial-compounds",
    slug: "molecular-formula-and-uses-of-quick-lime-bleaching-powder-magnesia-plaster-of-paris-and-epsom-sa",
    title: "Molecular Formulas and Uses: Quick Lime, Bleaching Powder, Magnesia, Plaster of Paris, Epsom Salt",
    subject: "chemistry",
    unit: "Chemistry of Metals",
    unitId: "chemistry-of-metals",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Metals)",
    isExtra: false,
    statement:
      "Five calcium/magnesium compounds with fixed formulas and uses: quick lime CaO (furnaces, cement, whitewash); bleaching powder Ca(OCl)Cl (disinfectant, bleaching); magnesia MgO (refractory lining, antacid); plaster of Paris CaSO₄·½H₂O (casts, setting to gypsum); Epsom salt MgSO₄·7H₂O (purgative, bath salt).",
    coreFormula: "CaO; \\; Ca(OCl)Cl; \\; MgO; \\; CaSO_4\\cdot\\tfrac{1}{2}H_2O; \\; MgSO_4\\cdot7H_2O",
    concernedTerms: [
      { term: "Quick lime", symbol: "CaO", units: "—", definition: "From limestone calcination; slaking gives slaked lime + heat." },
      { term: "Bleaching powder", symbol: "Ca(OCl)Cl", units: "—", definition: "Cl₂ over dry slaked lime; releases chlorine (available chlorine ~35%)." },
      { term: "Plaster of Paris", symbol: "CaSO₄·½H₂O", units: "—", definition: "Partial dehydration of gypsum; rehydrates and sets expanding slightly — perfect for moulds." },
    ],
    assumptions: ["Standard industrial formulas as taught at NEB level."],
    proofSteps: [
      { stepNumber: 1, title: "Quick lime from limestone", latex: "CaCO_3 \\xrightarrow{1000°C} CaO + CO_2", explanation: "Calcination drives off CO₂; slaking: CaO + H₂O → Ca(OH)₂ + 65 kJ." },
      { stepNumber: 2, title: "Bleaching powder synthesis", latex: "Ca(OH)_2 + Cl_2 \\to Ca(OCl)Cl + H_2O", explanation: "One chlorine as hypochlorite (oxidizer), one as chloride — the mixed salt bleaches by releasing O/Cl₂." },
      { stepNumber: 3, title: "Plaster setting", latex: "CaSO_4\\cdot\\tfrac{1}{2}H_2O + 1\\tfrac{1}{2}H_2O \\to CaSO_4\\cdot2H_2O", explanation: "Rehydration regrows interlocking gypsum crystals — the set is crystallization, not drying." },
    ],
    conclusion:
      "One element, five salts, five industries: construction (CaO), sanitation (bleaching powder), high-temperature linings (MgO), medicine/casting (POP), and health (Epsom salt) — formulas first, uses follow.",
    keyTakeaways: [
      "POP must stay dry — ambient moisture partially sets it (dead-burnt).",
      "Bleaching powder action: Ca(OCl)Cl + CO₂ → Cl₂ (available chlorine test).",
      "MgO melts at 2852°C — the refractory champion.",
    ],
    examTraps: [
      "❌ Writing bleaching powder as CaOCl₂ ambiguously — the structural formula is Ca(OCl)Cl.",
      "❌ Giving POP full gypsum hydration (2H₂O) — it is the HALF hydrate.",
    ],
    visualType: "tv-industrial-compounds",
    specialCases: [
      { name: "Dead plaster", condition: "Old POP", formula: "\\text{partially hydrated}", meaning: "Won't set properly — stored airtight." },
      { name: "Available chlorine", condition: "Quality measure", formula: "35\\text{–}38\\%", meaning: "Iodometric titration of real oxidizing power." },
      { name: "Kieserite route", condition: "MgSO₄·H₂O", formula: "\\text{monohydrate ore}", meaning: "Natural source of Epsom salt." },
    ],
    solvedProblems: [],
  },
  {
    id: "tf-chem-11-structural-formulas",
    slug: "idea-of-structural-formula-contracted-formula-and-bond-line-structural-formula",
    title: "Structural, Contracted and Bond-Line Formulas",
    subject: "chemistry",
    unit: "Basic Concept of Organic Chemistry",
    unitId: "basic-concept-of-organic-chemistry",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Organic)",
    isExtra: false,
    statement:
      "Organic molecules are written at three compression levels: structural formula (every bond shown, e.g. H–C–C–H for ethane), contracted/condensed formula (CH₃–CH₃, bonds to H implied), and bond-line/skeletal formula (only C–C bonds and heteroatoms drawn; carbons implicit at every vertex/line-end, hydrogens implied).",
    coreFormula: "C_6H_{12}O_6 \\text{ (molecular)} \\to CH_3(CH_2)_4CHO \\text{ (contracted)} \\to \\text{skeletal zig-zag}",
    concernedTerms: [
      { term: "Structural formula", symbol: "—", units: "—", definition: "All bonds explicit — unambiguous but bulky." },
      { term: "Condensed formula", symbol: "—", units: "—", definition: "Groups contracted: CH₃, CH₂, parentheses for repeats." },
      { term: "Bond-line", symbol: "—", units: "—", definition: "Carbon skeleton only: vertex = C, ends = C or heteroatom; H count fills valence." },
    ],
    assumptions: ["Carbon valence 4 and hydrogen valence 1 fill implicitly.", "Heteroatoms (O, N, halogens) always drawn explicitly."],
    proofSteps: [
      { stepNumber: 1, title: "Full structure", latex: "\\text{ethane: 6 H + 2 C, 7 bonds drawn}", explanation: "Every C–H and C–C bond visible — the teaching format." },
      { stepNumber: 2, title: "Contract C–H", latex: "H_3C-CH_3 \\equiv CH_3CH_3", explanation: "Hydrogens collapse into group labels; carbon chain remains explicit." },
      { stepNumber: 3, title: "Drop carbons entirely", latex: "\\text{zig-zag lines; each kink = C with H's}", explanation: "Bond-line reading rule: count valence, H's fill to 4 — hexagon plus O line is cyclohexanol instantly." },
    ],
    conclusion:
      "The three formats are compression levels of the same molecule: structural teaches, condensed writes fast, bond-line draws fast — every chemist flips between them freely.",
    keyTakeaways: [
      "In bond-line, each line END and each VERTEX is a carbon (unless labelled otherwise).",
      "Functional groups and multiple bonds are always drawn.",
      "Same molecular formula can hide many structural isomers — the formats differ, the connectivity is the identity.",
    ],
    examTraps: [
      "❌ Forgetting implicit H's when counting C/H in skeletal formulas.",
      "❌ Treating contracted CH₃CH₂ as different from the zig-zag drawing — they are identical.",
    ],
    visualType: "tv-structural-formulas",
    specialCases: [
      { name: "Ring structures", condition: "Hexagon", formula: "\\text{each vertex = CH}", meaning: "C₆H₁₂ cyclohexane reads as bare hexagon." },
      { name: "Triple bonds", condition: "Linear segment", formula: "-C\\equiv C- \\text{ drawn straight}", meaning: "sp carbons make 180° geometry." },
      { name: "Charges/lone pairs", condition: "Always explicit", formula: "R-NH_3^+", meaning: "Never implicit." },
    ],
    solvedProblems: [],
  },
  {
    id: "tf-chem-11-huckel-rule",
    slug: "huckel-s-rule-of-aromaticity",
    title: "Hückel's Rule of Aromaticity",
    subject: "chemistry",
    unit: "Aromatic Hydrocarbons",
    unitId: "aromatic-hydrocarbons",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Aromatic)",
    isExtra: false,
    statement:
      "A planar, cyclic, fully conjugated system is aromatic when it contains (4n + 2) π electrons (n = 0, 1, 2 …): 2, 6, 10, 14 … Benzene's 6 π electrons (n = 1) give exceptional stability; 4n π systems (cyclobutadiene, 4π) are antiaromatic and destabilized.",
    coreFormula: "\\pi \\text{ electrons} = 4n + 2 \\Rightarrow \\text{aromatic}; \\qquad 4n \\Rightarrow \\text{antiaromatic (if planar)}",
    concernedTerms: [
      { term: "Aromatic", symbol: "—", units: "—", definition: "Cyclic conjugated (4n+2)π planar — extra stabilization, substitution over addition." },
      { term: "Antiaromatic", symbol: "—", units: "—", definition: "Cyclic conjugated 4nπ planar — destabilized (cyclobutadiene)." },
      { term: "Non-aromatic", symbol: "—", units: "—", definition: "Fails planarity or conjugation (cyclooctatetraene tub-shape, 8π but non-planar)." },
    ],
    assumptions: ["Hückel MO theory for monocyclic conjugated systems.", "Planarity is a hard requirement."],
    proofSteps: [
      { stepNumber: 1, title: "Hückel MO energies", latex: "E_k = \\alpha + 2\\beta\\cos\\frac{2k\\pi}{N}", explanation: "For an N-membered ring, one non-bonding pair splits bonding levels evenly — closed shells occur at 2, 6, 10, 14 π electrons." },
      { stepNumber: 2, title: "Benzene check", latex: "6 = 4(1) + 2", explanation: "Three occupied bonding MOs, fully filled — aromatic closed shell, 150 kJ/mol extra stability." },
      { stepNumber: 3, title: "Counter-example", latex: "\\text{cyclobutadiene: } 4 = 4n \\Rightarrow \\text{antiaromatic}", explanation: "Open shell with two unpaired electrons — the molecule distorts or dimerizes to escape." },
    ],
    conclusion:
      "Aromaticity = cyclic + planar + conjugated + (4n+2)π. It explains benzene's chemistry (substitution not addition), why pyridine/pyrrole are aromatic, and why forcing 4n rings planar is energetically brutal.",
    keyTakeaways: [
      "Heteroatom rings count lone pairs only if conjugation demands: pyrrole (6π total), pyridine (6π, lone pair NOT counted).",
      "Annulenes: [10] aromatic (slightly non-planar), [14], [18] aromatic.",
      "Aromatic compounds show diamagnetic ring currents (NMR deshielding of outside H).",
    ],
    examTraps: [
      "❌ Counting ALL lone-pair electrons of heteroatoms automatically — pyridine's N lone pair sits outside the π system.",
      "❌ Calling cyclooctatetraene antiaromatic — it escapes by bending (non-planar ⇒ non-aromatic).",
    ],
    visualType: "tv-huckel-rule",
    specialCases: [
      { name: "Cyclopentadienyl anion", condition: "C₅H₅⁻", formula: "6\\pi \\Rightarrow \\text{aromatic}", meaning: "Exceptionally stable — basis of ferrocene." },
      { name: "Tropylium cation", condition: "C₇H₇⁺", formula: "6\\pi \\Rightarrow \\text{aromatic}", meaning: "Explains cycloheptatriene's easy ionization." },
      { name: "Naphthalene", condition: "Fused rings", formula: "10\\pi = 4(2)+2", meaning: "Aromaticity shared over the fused system." },
    ],
    solvedProblems: [
      {
        id: "tf-c-huc-1",
        question: "Is the cyclopropenyl cation C₃H₃⁺ aromatic?",
        examBadge: "CEE Entrance",
        given: "2 π electrons",
        stepByStep: ["2 = 4(0) + 2 ✓; cyclic, planar, conjugated ✓."],
        finalAnswer: "\\text{Yes — aromatic (n = 0)}",
        tipOrTrap: "n = 0 counts — the smallest aromatic ring has just 2 π electrons.",
      },
    ],
  },
  {
    id: "tf-chem-12-solution-types",
    slug: "types-of-solutions-and-expression-of-concentration",
    title: "Types of Solutions and Expressions of Concentration",
    subject: "chemistry",
    unit: "Solutions",
    unitId: "solutions",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Solutions)",
    isExtra: true,
    statement:
      "A solution is a homogeneous mixture of solute in solvent (any two of solid/liquid/gas). Concentration is expressed as molarity M (mol solute/L solution), molality m (mol solute/kg solvent), mole fraction x, mass percent, and ppm. Molality and mole fraction are temperature-independent; molarity is not.",
    coreFormula: "M = \\frac{n_s}{V_L}; \\quad m = \\frac{n_s}{kg_{solv}}; \\quad x_s = \\frac{n_s}{n_{tot}}; \\quad \\% = \\frac{w_s}{w_{sol}}\\times 100",
    concernedTerms: [
      { term: "Molarity", symbol: "M", units: "mol L⁻¹", definition: "Volume-based; changes with temperature (liquids expand)." },
      { term: "Molality", symbol: "m", units: "mol kg⁻¹", definition: "Mass-based; temperature-independent — used in colligative laws." },
      { term: "Mole fraction", symbol: "x", units: "—", definition: "Component moles / total moles; Σx = 1; used for vapour pressure (Raoult)." },
    ],
    assumptions: ["Ideal dilute behaviour for conversions.", "Solute fully dissolved."],
    proofSteps: [
      { stepNumber: 1, title: "Molality ↔ molarity bridge", latex: "m = \\frac{M}{\\rho - \\frac{M\\,M_s}{1000}}", explanation: "Density ρ (g/mL) converts solution volume to mass — the standard exam conversion." },
      { stepNumber: 2, title: "Mole fraction from m", latex: "x_s = \\frac{m}{m + 55.5}", explanation: "1 kg water = 55.5 mol; adding solute moles gives both parts of the fraction." },
      { stepNumber: 3, title: "ppm", latex: "ppm = \\frac{w_s}{w_{sol}}\\times 10^6", explanation: "Trace concentrations (pollutants, minerals) live in ppm/ppb units." },
    ],
    conclusion:
      "Pick the concentration unit to match the physics: reactions and titrations use molarity; colligative properties and anything with temperature change use molality; vapour pressure uses mole fraction.",
    keyTakeaways: [
      "Dilution law: M₁V₁ = M₂V₂ (moles conserved).",
      "9 types of solutions by s/l/g combinations (solid-in-solid alloys, gas-in-gas air, etc.).",
      "Molality never uses solution volume — kilograms of SOLVENT only.",
    ],
    examTraps: [
      "❌ Using solution mass instead of solvent mass in molality.",
      "❌ Ignoring temperature dependence when comparing molarity values across seasons.",
    ],
    visualType: "tv-solution-types",
    specialCases: [
      { name: "Very dilute", condition: "ρ ≈ 1 g/mL", formula: "m \\approx M", meaning: "Dilute aqueous: numerically close (1 M ≈ 1 m)." },
      { name: "Gas in liquid", condition: "Henry's law", formula: "p = k_H x", meaning: "Dissolved gas ∝ pressure — soda fizz." },
      { name: "Solid in solid", condition: "Alloy", formula: "\\% w/w", meaning: "Brass, steel use mass percent." },
    ],
    solvedProblems: [
      {
        id: "tf-c-sol-1",
        question: "58.5 g NaCl in 0.5 kg water. Find molality.",
        examBadge: "NEB 2078",
        given: "n = 58.5/58.5 = 1 mol",
        stepByStep: ["m = 1/0.5 = 2 mol kg⁻¹."],
        finalAnswer: "m = 2\\ \\text{mol kg}^{-1}",
        tipOrTrap: "Molality = moles per kg of WATER, not of solution.",
      },
    ],
  },
  {
    id: "tf-chem-12-faraday-laws",
    slug: "electrolysis-and-faraday-s-laws",
    title: "Electrolysis and Faraday's Laws",
    subject: "chemistry",
    unit: "Electro-Chemistry",
    unitId: "electro-chemistry",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Electrochemistry)",
    isExtra: true,
    statement:
      "First law: mass deposited m ∝ Q. Second law: for the same charge, masses are proportional to equivalent weights (E = M/z). Combined: m = (M Q)/(z F) with F = 96500 C mol⁻¹ — charge per mole of electrons. Electrolysis applies this at each electrode.",
    coreFormula: "m = \\frac{M\\,I\\,t}{z\\,F}, \\qquad F = 96500\\ \\text{C mol}^{-1}",
    concernedTerms: [
      { term: "Faraday constant", symbol: "F", units: "C mol⁻¹", definition: "Charge on one mole of electrons — the electrolysis currency exchange." },
      { term: "Electrochemical equivalent", symbol: "z_e", units: "g C⁻¹", definition: "Mass deposited per coulomb: M/(zF)." },
      { term: "Equivalent weight", symbol: "E = M/z", units: "g", definition: "Molar mass divided by electrons transferred per formula unit." },
    ],
    assumptions: ["100% current efficiency (no side reactions).", "Constant current I over time t."],
    proofSteps: [
      { stepNumber: 1, title: "First law from charge counting", latex: "m \\propto Q = It", explanation: "Each ion needs a fixed number of electrons; more charge, proportionally more ions discharged." },
      { stepNumber: 2, title: "Second law by equal charge", latex: "\\frac{m_1}{m_2} = \\frac{E_1}{E_2}", explanation: "One faraday discharges one equivalent of ANY substance — the universal scale." },
      { stepNumber: 3, title: "Combined working formula", latex: "m = \\frac{Q}{F}\\cdot\\frac{M}{z} = \\frac{MIt}{zF}", explanation: "Moles of electrons = Q/F; each mole deposits M/z grams." },
    ],
    conclusion:
      "Faraday's laws make electroplating quantitative: weigh the current, divide by 96500, multiply by the equivalent — the deposit mass is fully predictable.",
    keyTakeaways: [
      "z values: Ag⁺ 1, Cu²⁺ 2, Al³⁺ 3 — same charge deposits 108 : 63.5/2 : 27/3.",
      "1 F deposits 1 g-equivalent: 108 g Ag, 31.75 g Cu, 9 g Al.",
      "Ampere = C s⁻¹; time in seconds in the formula.",
    ],
    examTraps: [
      "❌ Using molar mass without dividing by z.",
      "❌ Forgetting to square the time units (minutes → seconds).",
    ],
    visualType: "tv-faraday-laws",
    specialCases: [
      { name: "Same current, series cells", condition: "Cu and Ag cells", formula: "\\frac{m_{Cu}}{m_{Ag}} = \\frac{63.5/2}{108}", meaning: "Classic second-law experiment." },
      { name: "Current efficiency", condition: "Side reactions", formula: "m_{real} = m_{ideal}\\times\\eta", meaning: "Chlorine co-evolution steals current in brine." },
      { name: "Gas evolution", condition: "Water electrolysis", formula: "V_{H_2}:V_{O_2} = 2:1", meaning: "Moles from Q/F then Avogadro." },
    ],
    solvedProblems: [
      {
        id: "tf-c-far-1",
        question: "How much Cu deposits by 2 A for 30 min? (M = 63.5, z = 2)",
        examBadge: "NEB 2079",
        given: "I = 2, t = 1800 s",
        stepByStep: ["Q = 3600 C; n(e⁻) = 3600/96500 = 0.0373 mol.", "n(Cu) = 0.0373/2 = 0.01865 mol.", "m = 0.01865 × 63.5 = 1.18 g."],
        finalAnswer: "m \\approx 1.18\\ \\text{g Cu}",
        tipOrTrap: "Halve the electron moles for divalent Cu — z = 2.",
      },
    ],
  },
  {
    id: "tf-chem-12-rate-law",
    slug: "rate-law-and-order-of-reaction",
    title: "Rate Law and Order of Reaction",
    subject: "chemistry",
    unit: "Chemical Kinetics",
    unitId: "chemical-kinetics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Kinetics)",
    isExtra: true,
    statement:
      "The rate law expresses rate as k[A]^m[B]^n where exponents are found EXPERIMENTALLY (not from coefficients). Order = m + n; half-life t½ depends on order: infinite-ish for zero, (ln2)/k for first, 1/(k[A]₀) for second. k's units vary with order: (mol L⁻¹)^(1−n) s⁻¹.",
    coreFormula: "r = k[A]^m[B]^n; \\quad t_{1/2}^{(1)} = \\frac{0.693}{k}; \\quad [A]_t = [A]_0 e^{-kt}",
    concernedTerms: [
      { term: "Order", symbol: "m + n", units: "—", definition: "Sum of concentration exponents — can be 0, fractional, or negative." },
      { term: "Rate constant", symbol: "k", units: "order-dependent", definition: "Temperature-only constant; units encode the order." },
      { term: "Half-life", symbol: "t½", units: "s", definition: "Time to halve concentration; order-independent only for FIRST order." },
    ],
    assumptions: ["Elementary steps justify molecularity ≠ order generally.", "Constant temperature throughout the run."],
    proofSteps: [
      { stepNumber: 1, title: "Initial-rates method", latex: "\\frac{r_2}{r_1} = \\left(\\frac{[A]_2}{[A]_1}\\right)^m", explanation: "Double [A] with [B] fixed: rate ×4 ⇒ m = 2. Repeat per reactant — order found empirically." },
      { stepNumber: 2, title: "Integrated first-order law", latex: "\\ln\\frac{[A]_0}{[A]_t} = kt", explanation: "Separating variables on r = k[A] gives the exponential decay — radioactive-decay mathematics." },
      { stepNumber: 3, title: "Half-life independence", latex: "t_{1/2} = \\frac{\\ln 2}{k} \\; (\\text{no } [A]_0)", explanation: "Halving takes the same time at any concentration — the fingerprint of first-order kinetics." },
    ],
    conclusion:
      "Rate laws are measured, not guessed: initial-rate doubles give the orders, integrated forms give k, and the order's fingerprint shows in the half-life's concentration dependence.",
    keyTakeaways: [
      "Zero order: [A] falls linearly; t½ ∝ [A]₀ (saturation kinetics, enzyme at Vmax).",
      "Second order: 1/[A] rises linearly; t½ doubles as concentration halves.",
      "k units: zero → mol L⁻¹ s⁻¹; first → s⁻¹; second → L mol⁻¹ s⁻¹.",
    ],
    examTraps: [
      "❌ Reading orders from the balanced equation — coefficients are NOT orders (except elementary steps).",
      "❌ Mixing up which integrated plot is linear per order.",
    ],
    visualType: "tv-rate-law",
    specialCases: [
      { name: "Pseudo-first-order", condition: "One reagent in excess", formula: "r = k'[A]", meaning: "Hydrolysis of ester in water — [H₂O] folded into k." },
      { name: "Zero order", condition: "Catalyst-saturated", formula: "[A]_t = [A]_0 - kt", meaning: "Decomposition of NH₃ on hot Pt." },
      { name: "Fractional order", condition: "Chain mechanisms", formula: "H_2 + Br_2: \\text{order 1.5 in } H_2", meaning: "Complex mechanism signature." },
    ],
    solvedProblems: [
      {
        id: "tf-c-rat-1",
        question: "A first-order reaction is 20% complete in 10 min. Find k.",
        examBadge: "NEB 2077",
        given: "[A]/[A]₀ = 0.8, t = 600 s",
        stepByStep: ["k = ln(1/0.8)/600 = 0.223/600."],
        finalAnswer: "k \\approx 3.7\\times 10^{-4}\\ \\text{s}^{-1}",
        tipOrTrap: "'20% complete' means 80% remains — the ln takes the ratio.",
      },
    ],
  },
  {
    id: "tf-chem-12-arrhenius-equation",
    slug: "arrhenius-equation-and-activation-energy",
    title: "Arrhenius Equation and Activation Energy",
    subject: "chemistry",
    unit: "Chemical Kinetics",
    unitId: "chemical-kinetics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Kinetics)",
    isExtra: true,
    statement:
      "Arrhenius: k = A e^(−Ea/RT). The activation energy Ea is the minimum collision energy for reaction; A is the frequency factor. A plot of ln k vs 1/T is a straight line of slope −Ea/R; between two temperatures, ln(k₂/k₁) = −Ea/R (1/T₂ − 1/T₁).",
    coreFormula: "k = Ae^{-E_a/RT}, \\qquad \\ln\\frac{k_2}{k_1} = -\\frac{E_a}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)",
    concernedTerms: [
      { term: "Activation energy", symbol: "Ea", units: "kJ mol⁻¹", definition: "Energy barrier from reactants to the transition state." },
      { term: "Frequency factor", symbol: "A", units: "same as k", definition: "Collision frequency × orientation probability." },
      { term: "Boltzmann factor", symbol: "e^(−Ea/RT)", units: "—", definition: "Fraction of collisions with energy ≥ Ea." },
    ],
    assumptions: ["Ea and A constant over the temperature span.", "Simple collision-based kinetics."],
    proofSteps: [
      { stepNumber: 1, title: "Take the log", latex: "\\ln k = \\ln A - \\frac{E_a}{RT}", explanation: "Arrhenius plot: y = ln k, x = 1/T, slope = −Ea/R, intercept = ln A." },
      { stepNumber: 2, title: "Two-point form", latex: "\\ln\\frac{k_2}{k_1} = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)", explanation: "Subtracting two ln k equations eliminates A — the exam-workhorse formula." },
      { stepNumber: 3, title: "Temperature sensitivity", latex: "\\text{large } E_a \\Rightarrow \\text{steep slope}", explanation: "High-Ea reactions speed up dramatically with heat; doubling rate per 10°C corresponds to Ea ≈ 50 kJ/mol near room temperature." },
    ],
    conclusion:
      "The exponential Boltzmann factor is why chemistry is temperature-sensitive: a modest T rise multiplies the population of energetic collisions enormously — and Ea measures the barrier height that sets the pace.",
    keyTakeaways: [
      "Catalysts lower Ea (not A) — same T, huge rate gain.",
      "k rises with T ALWAYS (Ea > 0): never a decreasing Arrhenius line.",
      "Ea from slope: multiply the fitted slope by −R = −8.314.",
    ],
    examTraps: [
      "❌ Sign slips in the two-point formula — write (1/T₁ − 1/T₂) with T₂ > T₁ to stay positive.",
      "❌ Using °C — only kelvin works inside RT.",
    ],
    visualType: "tv-arrhenius-equation",
    specialCases: [
      { name: "Catalysed path", condition: "Ea lowered", formula: "k_{cat} = Ae^{-E_{a,new}/RT}", meaning: "Enzymes drop barriers by 10⁶–10²⁰." },
      { name: "Ea → 0", condition: "Diffusion-controlled", formula: "k \\approx A", meaning: "Every collision reacts; rate set by mixing." },
      { name: "10° rule", condition: "Near 300 K", formula: "k_{T+10}/k_T \\approx 2\\text{–}3", meaning: "The famous rule of thumb's origin." },
    ],
    solvedProblems: [
      {
        id: "tf-c-arr-1",
        question: "k doubles from 300 K to 310 K. Estimate Ea.",
        examBadge: "NEB 2078",
        given: "k₂/k₁ = 2",
        stepByStep: ["ln2 = (Ea/8.314)(1/300 − 1/310) = (Ea/8.314)(1.075×10⁻⁴).", "Ea = 0.693 × 8.314/1.075×10⁻⁴ ≈ 53.6 kJ/mol."],
        finalAnswer: "E_a \\approx 54\\ \\text{kJ mol}^{-1}",
        tipOrTrap: "The 'rate doubles per 10°' rule corresponds to ~50 kJ/mol.",
      },
    ],
  },
  {
    id: "tf-chem-12-werner-coordination",
    slug: "coordination-compounds-werner-s-theory-iupac-nomenclature-vbt-cft-qualitative-isomerism",
    title: "Coordination Compounds: Werner's Theory, Nomenclature, VBT, CFT & Isomerism",
    subject: "chemistry",
    unit: "Chemistry of Element",
    unitId: "chemistry-of-element",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Inorganic)",
    isExtra: true,
    statement:
      "Werner distinguished primary (ionizable) and secondary (coordinate) valence: central metals bind ligands in fixed geometries. Nomenclature names ligands alphabetically before the metal with its oxidation state. VBT uses hybridized orbitals (d²sp³ inner-orbital, sp³d² outer-orbital); CFT splits d-orbitals in the ligand field (Δoct = t₂g − e_g gap) explaining colour, high/low spin and magnetism. Isomerism spans ionization, hydrate, linkage, coordination, geometrical and optical types.",
    coreFormula: "[Co(NH_3)_6]Cl_3: \\ \\text{6 ligands, octahedral}; \\quad \\Delta_o = E(e_g) - E(t_{2g})",
    concernedTerms: [
      { term: "Ligand", symbol: "L", units: "—", definition: "Lewis base donating a pair to the metal (NH₃, CN⁻, Cl⁻)." },
      { term: "Coordination number", symbol: "CN", units: "—", definition: "Number of donor atoms attached (4 tetrahedral/square planar, 6 octahedral)." },
      { term: "Crystal field splitting", symbol: "Δo", units: "cm⁻¹", definition: "d-orbital energy gap in an octahedral field; strong-field ligands (CN⁻) give large Δ → low spin." },
    ],
    assumptions: ["Qualitative CFT (no Jahn-Teller detail needed).", "Standard IUPAC names for common complexes."],
    proofSteps: [
      { stepNumber: 1, title: "Werner's evidence", latex: "[Co(NH_3)_6]Cl_3: \\ 3\\ \\text{AgCl precipitated}", explanation: "All three chlorides ionize (primary valence); six NH₃ never leave (secondary) — the two-valence distinction." },
      { stepNumber: 2, title: "CFT splitting", latex: "t_{2g} \\downarrow\\downarrow\\downarrow, \\; e_g \\uparrow \\text{ (barycentre fixed)}", explanation: "Ligands approach along axes: e_g (dz², dx²−y²) repelled up; t₂g (dxy, dyz, dxz) between axes, lower." },
      { stepNumber: 3, title: "High vs low spin", latex: "\\Delta_o < P: \\text{high spin}; \\; \\Delta_o > P: \\text{low spin}", explanation: "Pairing energy P versus splitting decides d⁴–d⁷ configurations — colour and magnetism follow." },
    ],
    conclusion:
      "Coordination chemistry is valence beyond the octet: Werner's secondary valence, VBT's hybrids and CFT's split d-levels each explain a layer — structure, bonding geometry, and colour/magnetism.",
    keyTakeaways: [
      "Spectrochemical series: I⁻ < F⁻ < H₂O < NH₃ < en < CN⁻ ≈ CO.",
      "d⁶ strong-field (Co³⁺ low spin): diamagnetic, often intensely coloured.",
      "Optical isomers are non-superimposable mirror images (Δ/Λ for octahedral).",
    ],
    examTraps: [
      "❌ Counting chloride inside the bracket as ionizable — only outside-the-bracket ions precipitate with AgNO₃.",
      "❌ Ignoring that CN⁻ vs H₂O flips d⁶ magnetism (low vs high spin).",
    ],
    visualType: "tv-werner-cft",
    specialCases: [
      { name: "Linkage isomerism", condition: "NO₂⁻ ambidentate", formula: "M-ONO \\text{ vs } M-NO_2", meaning: "Nitrito vs nitro — red/yellow pair." },
      { name: "Ionization isomerism", condition: "[CoBr(NH₃)₅]SO₄", formula: "\\text{vs } [CoSO_4(NH_3)_5]Br", meaning: "Different ions outside give different precipitates." },
      { name: "Geometric (cis/trans)", condition: "MA₄B₂ octahedral", formula: "cis-\\text{mauve} \\ne trans-\\text{green}", meaning: "Classical [Co(NH₃)₄Cl₂]⁺ pair." },
    ],
    solvedProblems: [],
  },
];

export const THEOREM_FILL_CHEM_2 = C2;
