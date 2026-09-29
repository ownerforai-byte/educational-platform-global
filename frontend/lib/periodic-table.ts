export interface FilterCharacteristic {
  title: string;
  detail: string;
}

export interface PeriodicFilterCategory {
  id: string;
  name: string;
  classificationType: "nature" | "block" | "special_group" | "family" | "property";
  shortBadge: string;
  accentColor: string;
  oneLineSummary: string;
  generalElectronicConfig: string;
  keyCharacteristics: FilterCharacteristic[];
  examTrapsAndExceptions: string[];
  /** Precise, memorise-ready periodic-trend statements for this classification. */
  periodicTrendFacts?: string[];
  /** High-frequency CEE one-liners (the answer is embedded) for this classification. */
  ceeFrequentFacts?: string[];
  elementSymbols: string[];
  testCondition: (element: PeriodicElement) => boolean;
}

export interface PeriodicElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  period: number;
  group: number; // 1 to 18
  block: "s" | "p" | "d" | "f";
  category: "metal" | "nonmetal" | "metalloid";
  subCategory: string;
  atomicMass: string;
  stateAtSTP: "solid" | "liquid" | "gas";
  electronegativity?: number | null;
  electronConfig: string;
  oxidationStates: string;
  meltingPointC?: number | string | null;
  boilingPointC?: number | string | null;
  density?: string;
  ionizationEnergy?: number | string | null;
  atomicRadiusPm?: number | string | null;
  isCoinageMetal?: boolean;
  isVolatileMetal?: boolean;
  highYieldNote?: string;
  nebGradeLevel?: string;
  pastExamQuestions?: string[];
  futureExamTraps?: string[];
  keyOresAndCompounds?: string[];
  hallmarkReactions?: string[];
  examQuickRule?: string;
  ceeHighYieldNotes?: string;
  ceePastMcqs?: string[];
  ceeSpeedFormulas?: string[];
  ceeTrapAlert?: string;
}

/* ── Block (s / p / d / f) helpers ────────────────────────────────────────── */

/** The four block classifications, in filling order: s → p → d → f. */
export const BLOCK_FILTER_IDS = ["s_block", "p_block", "d_block", "f_block"] as const;
export type BlockFilterId = (typeof BLOCK_FILTER_IDS)[number];

/** Maps an element's `block` field ("s") to its filter id ("s_block"). */
export function blockFilterIdFor(block: string): string {
  return `${block}_block`;
}

export function isBlockFilterId(id: string): id is BlockFilterId {
  return (BLOCK_FILTER_IDS as readonly string[]).includes(id);
}

/**
 * Shared visual identity for each block — one source for the table tiles, the
 * colour legend, the filter chips and the Block Explorer, so a block always
 * looks like itself everywhere on the page.
 */
export const BLOCK_TONES: Record<
  string,
  { bg: string; border: string; text: string; chip: string; hex: string }
> = {
  s: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/40",
    text: "text-rose-500",
    chip: "bg-rose-500/15 text-rose-500 border-rose-500/40",
    hex: "#f43f5e",
  },
  p: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/40",
    text: "text-blue-500",
    chip: "bg-blue-500/15 text-blue-500 border-blue-500/40",
    hex: "#3b82f6",
  },
  d: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/40",
    text: "text-amber-500",
    chip: "bg-amber-500/15 text-amber-500 border-amber-500/40",
    hex: "#f59e0b",
  },
  f: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/40",
    text: "text-purple-500",
    chip: "bg-purple-500/15 text-purple-500 border-purple-500/40",
    hex: "#a855f7",
  },
};

export const PERIODIC_FILTERS: Record<string, PeriodicFilterCategory> = {
  metals: {
    id: "metals",
    name: "Metals",
    classificationType: "nature",
    shortBadge: "Electropositive",
    accentColor: "#2563eb",
    oneLineSummary: "Electropositive elements that readily lose valence electrons to form cations, generating basic or amphoteric oxides.",
    generalElectronicConfig: "ns¹⁻², (n-1)d¹⁻¹⁰ ns¹⁻², or (n-2)f¹⁻¹⁴",
    keyCharacteristics: [
      { title: "Bonding & Structure", detail: "Giant metallic lattice with positive metal ions surrounded by a mobile delocalized electron sea." },
      { title: "Physical Properties", detail: "High electrical and thermal conductivity, lustrous sheen, malleability (hammered into sheets), and ductility (drawn into wires)." },
      { title: "Chemical Nature", detail: "Strong reducing agents. Oxides and hydroxides are generally basic (Na₂O, CaO) or amphoteric (Al₂O₃, ZnO)." },
      { title: "Position in Table", detail: "Comprises ~78% of all elements: all s-block (except H), all d-block, all f-block, and lower-left p-block elements." }
    ],
    examTrapsAndExceptions: [
      "Mercury (Hg) is the ONLY liquid metal at standard room temperature; Gallium and Cesium melt at ~30°C.",
      "Alkali metals (Li, Na, K) are soft enough to be sliced with a scalpel and have densities lighter than water.",
      "Tungsten (W) possesses the highest melting point of all metals (3422°C).",
      "Hydrogen has an s¹ configuration but is chemically an electronegative non-metal."
    ],
    periodicTrendFacts: [
      "Metallic character falls left to right across a period and rises down a group: the most metallic elements are caesium and francium, the least metallic are the upper-right non-metals.",
      "Metallic radius falls across a period and rises down a group, while ionization enthalpy does the opposite — the two together decide reactivity.",
      "Oxide character follows the same gradient: basic on the left (Na₂O, MgO), amphoteric in the middle (Al₂O₃, ZnO), acidic on the right (SO₃, CO₂).",
      "Melting point peaks in the middle of the d-block (tungsten, 3422 °C) and falls toward both the s-block and the p-block metals."
    ],
    ceeFrequentFacts: [
      "Metals conduct through delocalised electrons; conductivity order is Ag > Cu > Au > Al, and it falls as temperature rises (positive temperature coefficient of resistance).",
      "Metal + dilute acid gives H₂ for every metal above hydrogen in the electrochemical series; Cu, Ag and Au do not displace hydrogen.",
      "Reactivity series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > Cu > Ag > Au — the ordering behind every displacement question.",
      "Alloys to name: brass (Cu–Zn), bronze (Cu–Sn), steel (Fe–C), stainless steel (Fe–Cr–Ni), solder (Sn–Pb) and duralumin (Al–Cu–Mg–Mn)."
    ],
    elementSymbols: ["Li","Be","Na","Mg","Al","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv"],
    testCondition: (el) => el.category === "metal"
  },

  nonmetals: {
    id: "nonmetals",
    name: "Non-Metals",
    classificationType: "nature",
    shortBadge: "Electronegative",
    accentColor: "#059669",
    oneLineSummary: "Electronegative elements that gain or share electrons, forming acidic oxides and molecular covalent structures.",
    generalElectronicConfig: "ns² np¹⁻⁶ (plus Hydrogen 1s¹)",
    keyCharacteristics: [
      { title: "Bonding Tendency", detail: "Forms covalent bonds by electron sharing or ionic bonds with electropositive metals by gaining electrons." },
      { title: "Physical States", detail: "Exist in all three physical states at STP: gases (H₂, N₂, O₂, F₂, Cl₂, noble gases), liquid (Bromine Br₂), and solids (C, P₄, S₈, I₂)." },
      { title: "Insulators", detail: "Poor electrical and thermal conductors (exception: Graphite, an sp² allotrope of carbon with delocalized π-electrons)." },
      { title: "Acidic Oxides", detail: "Oxides dissolve in water to form acids (SO₃ + H₂O → H₂SO₄; CO₂ + H₂O → H₂CO₃). Neutral oxides include CO, NO, and N₂O." }
    ],
    examTrapsAndExceptions: [
      "Bromine (Br₂) is the ONLY liquid non-metal at standard room temperature.",
      "Graphite conducts electricity due to mobile π-electrons between hexagonal graphene sheets.",
      "Diamond is a non-metal yet has the highest thermal conductivity and hardness of any natural material.",
      "Chlorine has a higher electron affinity (-349 kJ/mol) than Fluorine (-328 kJ/mol) due to lower inter-electronic repulsion in its larger 3p orbital."
    ],
    periodicTrendFacts: [
      "Non-metallic character increases left to right and bottom to top, making fluorine and oxygen the most non-metallic elements in the table.",
      "Electronegativity, ionization enthalpy and electron gain enthalpy all peak at the top-right, which is why F, O and Cl form the strongest acids and the most stable anions.",
      "Oxides of non-metals are acidic (SO₃, CO₂) or neutral (CO, NO); no non-metal oxide is basic, in direct contrast to the metals."
    ],
    ceeFrequentFacts: [
      "Non-metal + O₂ gives an acidic oxide; non-metal + H₂ gives a covalent hydride whose acid strength rises down the group (HF < HCl < HBr < HI).",
      "Carbon, phosphorus, sulfur, oxygen and iodine show allotropy, and graphite is the only non-metal that conducts electricity.",
      "Halogens are the strongest oxidising non-metals (F₂ > Cl₂ > Br₂ > I₂), and each one displaces the heavier halide ion from solution.",
      "Non-metal molecules are held by dispersion forces, so boiling point rises with molar mass: I₂ (solid) > Br₂ (liquid) > Cl₂, O₂, N₂, H₂ (gases)."
    ],
    elementSymbols: ["H","He","C","N","O","F","Ne","P","S","Cl","Ar","Se","Br","Kr","I","Xe","At","Rn","Ts","Og"],
    testCondition: (el) => el.category === "nonmetal"
  },

  metalloids: {
    id: "metalloids",
    name: "Metalloids (Semimetals)",
    classificationType: "nature",
    shortBadge: "Semiconductors",
    accentColor: "#0d9488",
    oneLineSummary: "Borderline elements (B, Si, Ge, As, Sb, Te, Po) exhibiting intermediate electronegativity and intrinsic semiconductivity.",
    generalElectronicConfig: "ns² np¹⁻⁴ (intermediate valence configurations)",
    keyCharacteristics: [
      { title: "Electronic Behavior", detail: "Semiconductors with a moderate bandgap; electrical conductivity INCREASES with temperature (negative temperature coefficient of resistance)." },
      { title: "Doping Capability", detail: "Conductivity can be engineered by orders of magnitude by doping with Group 13 (p-type, holes) or Group 15 (n-type, free electrons)." },
      { title: "Chemical Reactivity", detail: "Form amphoteric or weakly acidic oxides (e.g., As₂O₃, Sb₂O₃) and react with strong bases to yield oxo-anions." },
      { title: "Diagonal Stepped Line", detail: "Form the classic staircase boundary dividing electropositive metals from electronegative non-metals in the p-block." }
    ],
    examTrapsAndExceptions: [
      "Silicon and Germanium are the foundational semiconductors for all modern diodes, transistors, and microprocessors.",
      "Arsenic and Antimony exist in distinct metallic and non-metallic allotropic forms.",
      "Boron forms multicenter electron-deficient bonds (3-center 2-electron banana bonds in B₂H₆)."
    ],
    periodicTrendFacts: [
      "Metalloids sit on the diagonal staircase (B, Si, Ge, As, Sb, Te, Po) that marks the boundary where metallic character changes to non-metallic across the p-block.",
      "Melting point and band gap fall down the group (B 2076 °C → Po 254 °C) as the elements become progressively more metallic.",
      "Conductivity RISES with temperature in metalloids, exactly the opposite of metals — the signature behaviour of a semiconductor."
    ],
    ceeFrequentFacts: [
      "Silicon and germanium are the semiconductor workhorses: doping with a Group 13 element gives p-type and with a Group 15 element n-type material.",
      "Boron is the metalloid that never behaves like a metal and forms electron-deficient multicenter bonds (B₂H₆, BF₃ Lewis acid).",
      "Arsenic and antimony exist in both metallic and non-metallic allotropes; tellurium is used in alloys and thermoelectric devices; polonium is intensely radioactive.",
      "Metalloid oxides are amphoteric or weakly acidic (As₂O₃, Sb₂O₃, TeO₂), so they dissolve in both acid and alkali."
    ],
    elementSymbols: ["B", "Si", "Ge", "As", "Sb", "Te", "Po"],
    testCondition: (el) => el.category === "metalloid"
  },

  coinage_metals: {
    id: "coinage_metals",
    name: "Coinage Metals (Group 11 / IB)",
    classificationType: "special_group",
    shortBadge: "Cu, Ag, Au (IB)",
    accentColor: "#eab308",
    oneLineSummary: "Group 11 elements (Copper, Silver, Gold) characterized by (n-1)d¹⁰ ns¹ configurations, peerless conductivity, and high nobility.",
    generalElectronicConfig: "(n-1)d¹⁰ ns¹ (n = 4 for Cu, 5 for Ag, 6 for Au)",
    keyCharacteristics: [
      { title: "Peerless Conductivity", detail: "Silver (Ag) exhibits the highest electrical and thermal conductivity of all known elements, closely followed by Copper (Cu) and Gold (Au)." },
      { title: "Relativistic Stability", detail: "Relativistic contraction of the 6s orbital brings outer s-electrons closer to the nucleus, giving Gold its characteristic yellow luster and extreme chemical inertness." },
      { title: "True Transition Character", detail: "Considered transition elements because their common oxidation states have incompletely filled d-orbitals: Cu²⁺ is 3d⁹ (blue), Au³⁺ is 5d⁸." },
      { title: "Aqua Regia & Complexes", detail: "Gold dissolves in Aqua Regia (3:1 HCl:HNO₃) to yield soluble chloroauric acid H[AuCl₄]; Silver forms Tollens' reagent [Ag(NH₃)₂]⁺." }
    ],
    examTrapsAndExceptions: [
      "Anomalous electron configuration: Cu is [Ar] 3d¹⁰ 4s¹ (NOT 3d⁹ 4s²) due to the exceptional exchange energy stability of the completely filled 3d¹⁰ subshell.",
      "Cu²⁺ (3d⁹) is more stable in aqueous solution than Cu⁺ (3d¹⁰) because the hydration enthalpy of Cu²⁺ outweighs the second ionization enthalpy.",
      "Tollens' reagent: [Ag(NH₃)₂]⁺ is reduced by aldehydes to metallic silver, coating the tube interior in the 'silver mirror' test.",
      "Gold and Platinum are immune to single mineral acids and require nascent chlorine generated by Aqua Regia."
    ],
    periodicTrendFacts: [
      "Nobility increases Cu < Ag < Au: gold alone resists attack by air and by single mineral acids, a direct result of relativistic contraction in the 6s orbital.",
      "Group 11 splits cleanly: copper prefers +2 (d⁹) while silver and gold prefer +1 (d¹⁰), so filled-shell stabilisation strengthens down the group.",
      "Atomic radius and density rise Cu → Ag → Au, and relativistic effects make gold's colour and chemistry unique among the three."
    ],
    ceeFrequentFacts: [
      "Anomalous configurations: Cu [Ar]3d¹⁰4s¹ and Ag [Kr]4d¹⁰5s¹ — the reason both differ from the pattern their group position predicts.",
      "Tollens' test: [Ag(NH₃)₂]⁺ is reduced by aldehydes to metallic silver (the silver mirror), while Fehling's solution uses Cu²⁺ to give red Cu₂O.",
      "Aqua regia (3 HCl : 1 HNO₃) gives H[AuCl₄] from gold, and the cyanide process leaches gold as [Au(CN)₂]⁻ before zinc displacement.",
      "Silver halides are light-sensitive (2AgBr → 2Ag + Br₂), the basis of photographic film and a standard photochemical decomposition question."
    ],
    elementSymbols: ["Cu", "Ag", "Au"],
    testCondition: (el) => el.isCoinageMetal === true || [29, 47, 79].includes(el.atomicNumber)
  },

  volatile_metals: {
    id: "volatile_metals",
    name: "Volatile Metals (Group 12 / IIB)",
    classificationType: "special_group",
    shortBadge: "Zn, Cd, Hg (IIB)",
    accentColor: "#9333ea",
    oneLineSummary: "Group 12 elements (Zinc, Cadmium, Mercury) with completely filled (n-1)d¹⁰ ns² shells, weak metallic bonds, and low boiling points.",
    generalElectronicConfig: "(n-1)d¹⁰ ns² (n = 4 for Zn, 5 for Cd, 6 for Hg)",
    keyCharacteristics: [
      { title: "Pseudo-Transition Character", detail: "Not typical transition metals because both elemental atoms and +2 ions possess completely filled d¹⁰ shells (Zn²⁺ is 3d¹⁰, Cd²⁺ is 4d¹⁰, Hg²⁺ is 5d¹⁰)." },
      { title: "Low Melting & Boiling Points", detail: "All d and s electrons are paired; lack of d-electron metallic bonding makes them soft and volatile. Mercury is liquid at room temperature (BP 356.7°C)." },
      { title: "Diamagnetic & Colorless", detail: "All +2 salts (ZnSO₄, CdCl₂, HgCl₂) are colorless in solution and diamagnetic because they have zero unpaired d-electrons (no d-d transitions)." },
      { title: "Amalgam Formation", detail: "Mercury readily alloys with almost all metals to form liquid or pasty amalgams, with the notable exceptions of Iron (Fe), Platinum (Pt), and Tungsten (W)." }
    ],
    examTrapsAndExceptions: [
      "Why Zn²⁺ is colorless while Cu²⁺ is blue: Zn²⁺ has a completely filled 3d¹⁰ shell (no vacant d-orbitals for d-d electronic transitions), whereas Cu²⁺ has a 3d⁹ configuration.",
      "Why Mercury is liquid: Relativistic 6s contraction tightly binds the 6s² electron pair to the nucleus, virtually preventing inter-atomic metallic orbital overlap.",
      "Iron containers are used to store and transport liquid Mercury because Fe does not form an amalgam.",
      "Zinc oxide (ZnO) is yellow when hot and white when cold due to reversible oxygen loss and metal-excess crystal lattice defects."
    ],
    periodicTrendFacts: [
      "Melting and boiling points fall Zn → Cd → Hg (Zn 420 °C, Cd 321 °C, Hg −38.8 °C) as the filled d¹⁰s² shells contribute less metallic bonding.",
      "Reactivity with acids increases from Cd to Zn: zinc is the most reactive member because its 4s² pair is lost most easily.",
      "Group 12 shows no variable valency beyond +2 (except the dimeric Hg₂²⁺ ion), unlike the true transition metals immediately to its left."
    ],
    ceeFrequentFacts: [
      "Zn²⁺, Cd²⁺ and Hg²⁺ are colourless and diamagnetic (d¹⁰) — with no d-d transitions available their salts never absorb visible light.",
      "Zinc is extracted from zinc blende ZnS (roasted to ZnO, then reduced with coke) and is used to galvanise iron by sacrificial protection.",
      "Mercury(I) exists as the dimeric Hg₂²⁺ ion with an Hg–Hg bond, giving calomel Hg₂Cl₂; mercury(II) gives the corrosive sublimate HgCl₂.",
      "Mercury forms amalgams with almost every metal except Fe, Pt and W, which is why mercury is stored and shipped in iron vessels."
    ],
    elementSymbols: ["Zn", "Cd", "Hg"],
    testCondition: (el) => el.isVolatileMetal === true || [30, 48, 80].includes(el.atomicNumber)
  },

  s_block: {
    id: "s_block",
    name: "s-Block Elements",
    classificationType: "block",
    shortBadge: "ns¹⁻² Alkali & Alkaline",
    accentColor: "#ef4444",
    oneLineSummary: "Highly electropositive metals with outermost electrons entering the s-orbital; powerful reducing agents with low ionization enthalpies.",
    generalElectronicConfig: "ns¹ (Group 1) and ns² (Group 2)",
    keyCharacteristics: [
      { title: "Low Ionization Enthalpy", detail: "Possess the lowest ionization energies in their respective periods, decreasing down the group as atomic radius expands." },
      { title: "Flame Coloration", detail: "Excited valence electrons return to ground state emitting visible wavelengths: Li (crimson), Na (yellow), K (lilac), Ca (brick red), Sr (crimson), Ba (apple green)." },
      { title: "Diagonal Relationships", detail: "Li resembles Mg, and Be resembles Al in polarizing power (charge-to-radius ratio), giving similar covalent fluoride/chloride behaviors." },
      { title: "Reactivity with Water", detail: "React vigorously or explosively with water to liberate H₂ gas and form strongly alkaline hydroxides." }
    ],
    examTrapsAndExceptions: [
      "Beryllium (Be) and Magnesium (Mg) do NOT impart color to Bunsen flames due to high ionization energy holding electrons tightly.",
      "Lithium forms normal monoxide (Li₂O), Sodium forms peroxide (Na₂O₂), and Potassium forms superoxide (KO₂) due to relative cation-anion lattice stabilization.",
      "BeO and Be(OH)₂ are amphoteric, reacting with both acids and strong bases."
    ],
    periodicTrendFacts: [
      "Atomic radius increases down every group; ionization energy falls with it — Cesium (376 kJ/mol) has the lowest IE of the stable elements.",
      "Electronegativity is the lowest of its period in each group: Na 0.93, K 0.82, Rb 0.82, Cs 0.79 (Pauling scale).",
      "Hydration enthalpy falls down the group (Li⁺ > Na⁺ > K⁺) because the tiny Li⁺ ion packs the most water molecules around itself.",
      "The 2nd ionization energy of Group 1 elements jumps several-fold (breaking a noble-gas core), which is why Group 1 is strictly +1."
    ],
    ceeFrequentFacts: [
      "Flame colours: Li crimson, Na golden yellow, K lilac, Ca brick red, Sr crimson red, Ba apple green — Be and Mg give NO flame colour.",
      "Oxide type shifts with cation size: Li₂O (normal oxide), Na₂O₂ (peroxide), KO₂ (superoxide).",
      "Solubility of hydroxides increases down Group 2 (Ba(OH)₂ most soluble) while sulphates decrease — BaSO₄ is insoluble, the classic SO₄²⁻ test.",
      "Carbonate and nitrate thermal stability increases down the group: Li₂CO₃ and LiNO₃ decompose on heating, KNO₃ only melts.",
      "Diagonal relationships to remember: Li ~ Mg, Be ~ Al, B ~ Si (similar charge/radius ratio)."
    ],
    elementSymbols: ["H","He","Li","Be","Na","Mg","K","Ca","Rb","Sr","Cs","Ba","Fr","Ra"],
    testCondition: (el) => el.block === "s"
  },

  p_block: {
    id: "p_block",
    name: "p-Block Elements",
    classificationType: "block",
    shortBadge: "ns² np¹⁻⁶ Main Group",
    accentColor: "#3b82f6",
    oneLineSummary: "The only block encompassing all three states of matter and containing metals, metalloids, halogens, and noble gases.",
    generalElectronicConfig: "ns² np¹⁻⁶",
    keyCharacteristics: [
      { title: "Diverse States & Classes", detail: "Contains non-metals (C, N, O, halogens), metalloids (Si, Ge, As, Sb), post-transition metals (Al, Sn, Pb, Bi), and inert noble gases." },
      { title: "Inert Pair Effect", detail: "Down groups 13-15, heavier elements prefer oxidation states 2 units lower than group valency (Tl⁺ > Tl³⁺, Pb²⁺ > Pb⁴⁺, Bi³⁺ > Bi⁵⁺) because 6s² electrons remain unshared." },
      { title: "Multiple Bonding (pπ-pπ)", detail: "Second-row elements (C, N, O) form strong pπ-pπ multiple bonds (C=C, C≡C, N≡N, C=O), whereas heavier elements prefer single sigma networks." },
      { title: "Maximum Covalency", detail: "Second-period elements cannot expand their valence octet (max covalency 4) due to absence of vacant d-orbitals; 3rd period onwards expand to 5 or 6 (e.g., SF₆, PCl₅)." }
    ],
    examTrapsAndExceptions: [
      "Inert Pair Effect causes Lead dioxide (PbO₂) and Bismuth pentafluoride (BiF₅) to act as aggressive oxidizing agents.",
      "NF₃ is stable and neutral to water, but NCl₃ hydrolyzes rapidly because chlorine possesses vacant d-orbitals.",
      "CCl₄ cannot be hydrolyzed by water, whereas SiCl₄ hydrolyzes violently to Si(OH)₄ due to vacant 3d-orbitals in Silicon."
    ],
    periodicTrendFacts: [
      "Electronegativity rises across a period and falls down a group — Fluorine (3.98) is the most electronegative element known.",
      "Metallic character increases down and to the left; non-metallic character increases up and to the right.",
      "Oxide acidity tracks oxidation state: MnO is basic, MnO₂ amphoteric, Mn₂O₇ acidic — never memorise oxides without their state.",
      "Hydrates and acidity of oxyacids rise with the oxidation number: HClO < HClO₂ < HClO₃ < HClO₄."
    ],
    ceeFrequentFacts: [
      "Second-period elements never exceed an octet: NCl₃ exists but NCl₅ does not, while PCl₅ does (vacant 3d orbitals).",
      "Catenation strength: C > Si > Ge; the C–C bond (347 kJ/mol) is far stronger than Si–Si, which is why organic chemistry is carbon's alone.",
      "N₂ is inert because of N≡N (941 kJ/mol), yet NCl₃ hydrolyses instantly — bond strength and reactivity are different questions.",
      "Allotropes to name in answers: O₂/O₃, red-white-grey phosphorus, diamond/graphite/C₆₀, grey tin/tin(II) tin.",
      "Noble-gas compounds (XeF₂, XeF₄, XeF₆) involve ONLY fluorine and oxygen, because only they are electronegative enough."
    ],
    elementSymbols: ["B","C","N","O","F","Ne","Al","Si","P","S","Cl","Ar","Ga","Ge","As","Se","Br","Kr","In","Sn","Sb","Te","I","Xe","Tl","Pb","Bi","Po","At","Rn","Nh","Fl","Mc","Lv","Ts","Og"],
    testCondition: (el) => el.block === "p"
  },

  d_block: {
    id: "d_block",
    name: "d-Block Elements (Transition Metals)",
    classificationType: "block",
    shortBadge: "(n-1)d¹⁻¹⁰ Transition",
    accentColor: "#f97316",
    oneLineSummary: "Bridge elements with progressively filled (n-1)d orbitals; famous for variable valency, colored complexes, paramagnetism, and catalysts.",
    generalElectronicConfig: "(n-1)d¹⁻¹⁰ ns¹⁻²",
    keyCharacteristics: [
      { title: "Variable Oxidation States", detail: "Close energy spacing between (n-1)d and ns electrons allows multiple oxidation states (e.g., Manganese shows all states from +2 to +7)." },
      { title: "Origin of Color", detail: "Crystal field splitting of degenerate d-orbitals in complex ions permits d-d electronic absorption of visible light, transmitting complementary colors." },
      { title: "Magnetic Properties", detail: "Paramagnetism proportional to unpaired electrons via spin-only formula: μ = √(n(n+2)) Bohr Magnetons (BM)." },
      { title: "Catalytic Action", detail: "Provide active surface area and variable oxidation pathways (Fe in Haber process, V₂O₅ in Contact process, Ni in hydrogenation)." }
    ],
    examTrapsAndExceptions: [
      "Scandium (Sc) is a transition element, but Sc³⁺ (3d⁰) is completely colorless and diamagnetic.",
      "Zinc, Cadmium, and Mercury are d-block elements but NOT typical transition metals because their d-orbitals are full in ground and ionic states.",
      "Permanganate (MnO₄⁻) is intense purple despite having Mn(VII) with a 3d⁰ configuration; its color arises from Ligand-to-Metal Charge Transfer (LMCT), not d-d transition.",
      "Osmium (Os) and Ruthenium (Ru) exhibit the maximum known oxidation state of +8 (in OsO₄ and RuO₄)."
    ],
    periodicTrendFacts: [
      "Melting points peak mid-series: Tungsten (3422 °C) is the highest of all metals, while Zn/Cd/Hg stay low because their d-shell is full.",
      "Atomic radii barely change across a series (added d electrons shield poorly), then drop sharply at the start of each new period.",
      "Ionization energy rises across a series with dips at d⁵ (Mn) and d¹⁰ (Zn) — half-filled and fully-filled shells resist removal.",
      "5d elements are the same size as their 4d congeners because lanthanide contraction cancels the expected increase: Zr 160 pm vs Hf 159 pm."
    ],
    ceeFrequentFacts: [
      "Colour and magnetism come from unpaired d-electrons; spin-only moment μ = √(n(n+2)) Bohr magnetons.",
      "Catalysts you must name: Fe (Haber), V₂O₅ (Contact), Ni (hydrogenation), Pt/Rh (NH₃ oxidation).",
      "Highest oxidation states: Os/Ru +8, Mn +7 (MnO₄⁻), Cr +6 (Cr₂O₇²⁻) — all with oxygen, never with fluorine alone.",
      "Sc³⁺ (3d⁰), Zn²⁺ (3d¹⁰) and Cu⁺ (3d¹⁰) are colourless and diamagnetic — d-electron count decides, not d-block membership.",
      "Interstitial compounds and alloys: steel is carbon trapped in Fe lattice; WC tools and stainless steel are the usual CEE examples."
    ],
    elementSymbols: ["Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","La","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Ac","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn"],
    testCondition: (el) => el.block === "d"
  },

  f_block: {
    id: "f_block",
    name: "f-Block (Inner Transition Metals)",
    classificationType: "block",
    shortBadge: "(n-2)f¹⁻¹⁴ Lanthanide/Actinide",
    accentColor: "#ec4899",
    oneLineSummary: "Anti-penultimate (n-2)f subshell filling in two series: 4f Lanthanides (58-71) and 5f Actinides (90-103).",
    generalElectronicConfig: "(n-2)f¹⁻¹⁴ (n-1)d⁰⁻¹ ns²",
    keyCharacteristics: [
      { title: "Two Series", detail: "4f series (Lanthanides, ₅₈Ce to ₇₁Lu) and 5f series (Actinides, ₉₀Th to ₁₀₃Lr)." },
      { title: "Predominant +3 State", detail: "+3 is the universal stable oxidation state for all lanthanides. Ce⁴⁺ (f⁰) and Eu²⁺ (f⁷) are stabilized by empty and half-filled f-shells." },
      { title: "Lanthanide Contraction", detail: "Poor shielding by 14 diffuse 4f electrons causes a steady, cumulative contraction in atomic and ionic radii from La³⁺ to Lu³⁺." },
      { title: "Chemical Similarity", detail: "Lanthanide contraction makes 4d and 5d transition pairs (Zr/Hf, Nb/Ta, Mo/W) almost identical in atomic radius and chemical behavior." }
    ],
    examTrapsAndExceptions: [
      "Separation of Lanthanides is famously difficult due to near-identical chemical properties, achieved via ion-exchange chromatography.",
      "Basicity of lanthanide hydroxides DECREASES from La(OH)₃ to Lu(OH)₃ because smaller ionic radius increases covalent character (Fajans' rule).",
      "Promethium (₆₁Pm) is the ONLY lanthanide with no stable isotopes; all actinides are radioactive."
    ],
    periodicTrendFacts: [
      "Radii contract steadily across the lanthanides (lanthanide contraction) — unlike the d-block there is no size break at the series end.",
      "Basicity of Ln(OH)₃ falls from La(OH)₃ to Lu(OH)₃: a smaller Ln³⁺ polarises OH⁻ more (Fajans), so it is less basic.",
      "Density and melting point generally climb across the actinides, and actinide contraction is steeper than lanthanide contraction.",
      "4f electrons are buried and screen poorly, so ionization energies and colours change very little across the lanthanides."
    ],
    ceeFrequentFacts: [
      "Lanthanides are separated by ion-exchange chromatography or fractional precipitation, not by ordinary crystallisation — the +3 chemistry is nearly identical.",
      "Anomalous states are explained by electron configuration: Ce⁴⁺ (f⁰), Eu²⁺ (f⁷), Yb²⁺ (f¹⁴), Tb⁴⁺ (f⁸).",
      "Actinides show more oxidation states than lanthanides (+3 to +7 for Np, Pu, Am) because 5f and 6d are close in energy.",
      "Uranium is 99.3% ²³⁸U; the fissile ²³⁵U is under 1%, which is why natural uranium must be enriched.",
      "Only Th, U (and traces of Pa) occur naturally in useful amounts; every actinide beyond uranium is synthetic — all radioactive."
    ],
    elementSymbols: ["Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr"],
    testCondition: (el) => el.block === "f"
  },

  alkali_metals: {
    id: "alkali_metals",
    name: "Alkali Metals (Group 1)",
    classificationType: "family",
    shortBadge: "Group 1 (Li–Fr)",
    accentColor: "#dc2626",
    oneLineSummary: "Most electropositive metals; single ns¹ valence electron, low melting points, stored under oil, vivid flame test emissions.",
    generalElectronicConfig: "ns¹ (n = 2 to 7)",
    keyCharacteristics: [
      { title: "High Reactivity", detail: "Readily lose single ns¹ valence electron to form stable M⁺ cations with noble gas configurations." },
      { title: "Low Density", detail: "Li, Na, and K float on water (densities < 1 g/cm³); softness allows cutting with a butter knife." },
      { title: "Liquid Ammonia Solutions", detail: "Dissolve in liquid ammonia to form deep blue, conducting solutions containing ammoniated electrons." }
    ],
    examTrapsAndExceptions: [
      "Potassium (0.86 g/cm³) is less dense than Sodium (0.97 g/cm³) due to anomalous 3d-orbital spacing causing larger atomic volume.",
      "Lithium carbonate (Li₂CO₃) decomposes on heating to Li₂O and CO₂, unlike other alkali carbonates which are thermally stable."
    ],
    periodicTrendFacts: [
      "Reactivity increases down the group (Li < Na < K < Rb < Cs) because ionization enthalpy falls faster than the hydration enthalpy of M⁺ can compensate.",
      "Melting point, boiling point and hardness fall from Li to Cs as the metallic lattice weakens with the rising atomic radius.",
      "Flame colours shift crimson (Li) → golden yellow (Na) → lilac (K) → red-violet (Rb) → blue (Cs) as the excitation energy falls.",
      "Basicity of the hydroxides strengthens down the group: LiOH is the weakest and CsOH the strongest alkali in the set."
    ],
    ceeFrequentFacts: [
      "Flame-test table: Li crimson, Na golden yellow, K lilac, Rb red-violet, Cs blue — the standard identification sequence.",
      "Alkali metals are stored under kerosene because they attack moisture and oxygen, and they are never handled with bare hands.",
      "Lithium, sodium and potassium are all less dense than water, so they float and skitter as they react to give the hydroxide plus H₂.",
      "Lithium is the anomaly of the group: it forms Li₃N directly from the elements, its carbonate decomposes to Li₂O, and LiF is only sparingly soluble."
    ],
    elementSymbols: ["Li", "Na", "K", "Rb", "Cs", "Fr"],
    testCondition: (el) => el.group === 1 && el.atomicNumber !== 1
  },

  alkaline_earth: {
    id: "alkaline_earth",
    name: "Alkaline Earth Metals (Group 2)",
    classificationType: "family",
    shortBadge: "Group 2 (Be–Ra)",
    accentColor: "#ea580c",
    oneLineSummary: "Divalent electropositive metals with ns² valence shells; form basic oxides (earths) and divalent salts.",
    generalElectronicConfig: "ns² (n = 2 to 7)",
    keyCharacteristics: [
      { title: "Fixed +2 State", detail: "Consistently exhibit +2 oxidation state; higher hydration enthalpies stabilize M²⁺ over M⁺ in solution." },
      { title: "Higher Hardness", detail: "Harder, denser, and higher melting points than alkali metals due to two bonding electrons per atom in the metallic lattice." },
      { title: "Basic Oxides", detail: "Their oxides are strongly basic (BeO excepted, which is amphoteric) and hydrate to the corresponding hydroxides, M(OH)₂." }
    ],
    examTrapsAndExceptions: [
      "Be and Mg show NO Bunsen flame coloration because electrons are held too tightly to be excited in Bunsen burner temperatures.",
      "Beryllium chloride (BeCl₂) exists as a chloro-bridged polymer in the solid state and a linear dimer in vapor phase."
    ],
    periodicTrendFacts: [
      "Reactivity with water increases down the group: Be does not react, Mg needs steam, Ca reacts steadily and Ba reacts vigorously.",
      "Hydroxide solubility and basicity rise Mg(OH)₂ < Ca(OH)₂ < Sr(OH)₂ < Ba(OH)₂ because lattice enthalpy falls faster than hydration enthalpy.",
      "Atomic and ionic radii increase Be → Ra while ionization enthalpy falls, so the heavier members begin to resemble the alkali metals.",
      "Thermal stability of the carbonates rises down the group: BeCO₃ is unstable, MgCO₃ decomposes near 540 °C and BaCO₃ needs over 1300 °C."
    ],
    ceeFrequentFacts: [
      "Flame colours: Ca brick-red, Sr crimson, Ba apple-green; Be and Mg give no colour because their ionization enthalpies are too high.",
      "Lime chemistry: CaCO₃ → CaO + CO₂ (about 900 °C), CaO + H₂O → Ca(OH)₂, and the limewater test Ca(OH)₂ + CO₂ → CaCO₃ + H₂O.",
      "Solubility contrast: BeSO₄ and MgSO₄ are soluble while BaSO₄ is insoluble — the reason BaSO₄ is used as a radiocontrast agent.",
      "Diagonal relationships: Be with Al (amphoteric oxide, covalent halides) and Mg with Li (nitride formation, carbonate decomposition)."
    ],
    elementSymbols: ["Be", "Mg", "Ca", "Sr", "Ba", "Ra"],
    testCondition: (el) => el.group === 2
  },

  halogens: {
    id: "halogens",
    name: "Halogens (Group 17)",
    classificationType: "family",
    shortBadge: "Group 17 (F–Ts)",
    accentColor: "#0284c7",
    oneLineSummary: "Salt-forming non-metals (ns² np⁵) with high electronegativity and electron affinity, existing as colored diatomic molecules.",
    generalElectronicConfig: "ns² np⁵ (n = 2 to 7)",
    keyCharacteristics: [
      { title: "Colors & States", detail: "F₂ (pale yellow gas), Cl₂ (greenish-yellow gas), Br₂ (red-brown liquid), I₂ (purple-black solid)." },
      { title: "Oxidizing Power", detail: "Decreases down the group: F₂ > Cl₂ > Br₂ > I₂. Fluorine oxidizes water to Oxygen (2F₂ + 2H₂O → 4HF + O₂)." },
      { title: "Diatomic Molecules", detail: "All halogens exist as diatomic X₂ molecules held by dispersion forces, spanning all three states: F₂ and Cl₂ gases, Br₂ liquid, I₂ and At₂ solids." }
    ],
    examTrapsAndExceptions: [
      "Electron affinity anomaly: Cl (-349 kJ/mol) > F (-328 kJ/mol) > Br (-325 kJ/mol) > I (-295 kJ/mol).",
      "Bond dissociation enthalpy order: Cl₂ > Br₂ > F₂ > I₂. F₂ has weaker bond energy than Cl₂ and Br₂ due to lone pair-lone pair repulsion."
    ],
    periodicTrendFacts: [
      "Oxidising power falls F₂ > Cl₂ > Br₂ > I₂ as both electron gain enthalpy and bond enthalpy decrease down the group.",
      "Melting and boiling points rise F₂ < Cl₂ < Br₂ < I₂ because dispersion forces grow with molecular mass, carrying the set from gas to solid.",
      "Bond dissociation enthalpy is not monotonic: Cl₂ (243 kJ/mol) > Br₂ (193) > F₂ (155) > I₂ (151).",
      "Acid strength of the hydrogen halides rises HF < HCl < HBr < HI even though bond polarity falls, because bond enthalpy dominates the trend."
    ],
    ceeFrequentFacts: [
      "Displacement series: Cl₂ displaces Br⁻ and I⁻, Br₂ displaces I⁻, and F₂ displaces all of them — the standard halogen displacement order.",
      "States and colours: F₂ pale yellow gas, Cl₂ greenish-yellow gas, Br₂ red-brown liquid, I₂ violet-black solid with a violet vapour.",
      "Bleaching powder Ca(OCl)Cl is made by passing Cl₂ over dry slaked lime; chlorine bleaches by oxidation while SO₂ bleaches by reduction.",
      "Silver halides: AgCl white and soluble in NH₄OH, AgBr cream and sparingly soluble, AgI yellow and insoluble — the qualitative-analysis sequence."
    ],
    elementSymbols: ["F", "Cl", "Br", "I", "At", "Ts"],
    testCondition: (el) => el.group === 17
  },

  noble_gases: {
    id: "noble_gases",
    name: "Noble Gases (Group 18 / Zero Group)",
    classificationType: "family",
    shortBadge: "Group 18 (He–Og)",
    accentColor: "#8b5cf6",
    oneLineSummary: "Completely filled valence shells (ns² np⁶, He 1s²); chemically unreactive monoatomic gases with high ionization enthalpies.",
    generalElectronicConfig: "ns² np⁶ (He 1s²)",
    keyCharacteristics: [
      { title: "Monoatomic Nature", detail: "High ionization potential and positive electron gain enthalpy make them chemically inert monoatomic gases." },
      { title: "Low Boiling Points", detail: "Bound purely by weak London dispersion forces, increasing smoothly with atomic size from Helium (-269°C) to Radon (-62°C)." },
      { title: "Xenon Compounds", detail: "Neil Bartlett synthesized the first noble gas compound XePtF₆ in 1962; Xenon forms fluorides (XeF₂, XeF₄, XeF₆) and oxides (XeO₃, XeOF₄)." }
    ],
    examTrapsAndExceptions: [
      "Helium cannot be solidified at atmospheric pressure even at 0 K; requires ~25 atm pressure.",
      "Liquid Helium-II exhibits superfluidity with zero viscosity and creeps up container walls.",
      "XeF₂ has a linear molecular geometry (sp³d hybridization with 3 equatorial lone pairs)."
    ],
    periodicTrendFacts: [
      "Boiling points rise He < Ne < Ar < Kr < Xe < Rn as the electron count and dispersion forces grow — the smoothest trend in the periodic table.",
      "Ionization enthalpy falls He → Rn, which is why only the heavy, easily ionized members (Kr and Xe) form real compounds.",
      "Atomic radius increases down the group because the ns² np⁶ shell screens the rising nuclear charge poorly.",
      "Density, polarisability and water solubility all rise with atomic number, making radon the most soluble and most hazardous member."
    ],
    ceeFrequentFacts: [
      "Neil Bartlett's XePtF₆ (1962) ended the 'inert gas' era; the xenon fluorides XeF₂, XeF₄ and XeF₆ followed.",
      "Helium serves balloons, diving mixtures and cryogenics; neon fills discharge lamps; argon is the inert welding shield and bulb gas.",
      "Xenon compounds hydrolyse to oxidising oxides (XeO₃ is explosively unstable), while helium, neon and argon form no stable compounds.",
      "Radon is radioactive (produced in the radium decay chain) and is the leading environmental radiation hazard in uranium-bearing regions."
    ],
    elementSymbols: ["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"],
    testCondition: (el) => el.group === 18
  },

  chalcogens: {
    id: "chalcogens",
    name: "Chalcogens (Group 16)",
    classificationType: "family",
    shortBadge: "Group 16 (O–Lv)",
    accentColor: "#059669",
    oneLineSummary:
      "Oxygen-group non-metals of configuration ns² np⁴ — two electrons short of a noble-gas shell, so they gain two electrons or form two bonds; metallic character rises down to polonium.",
    generalElectronicConfig: "ns² np⁴ (n = 2 to 7)",
    keyCharacteristics: [
      { title: "Two-Electron Deficit", detail: "ns² np⁴ leaves a two-electron gap, giving the −2 state and the dihydride formula H₂A (H₂O, H₂S, H₂Se) plus the many oxoacids of S and Se." },
      { title: "Full Allotropy Ladder", detail: "O₂/O₃, S₈ (rhombic and monoclinic), grey and red selenium, silvery metalloid Te, and radioactive metal Po — one element, several structures." },
      { title: "Bonding Split", detail: "O and S form strong π bonds (O₂, S₂); the heavier members use σ-only catenation and slip to the lower +4 state as the inert pair takes over." },
      { title: "Anomalous Oxygen", detail: "Small size and no d-orbitals in the valence shell limit oxygen to −2 and −1 (peroxide); only S, Se, Te and Po reach +4 and +6." }
    ],
    examTrapsAndExceptions: [
      "Electron gain enthalpy order is S (−200 kJ/mol) > Se > Te > O (−141 kJ/mol): oxygen is anomalously low because the incoming electron meets strong repulsion in a compact 2p subshell.",
      "Bond angle of the hydrides collapses down the group: H₂O 104.5° → H₂S 92° → H₂Se 91° → H₂Te 90° as sp³ hybridisation gives way to pure p-orbital bonding.",
      "Te is a METALLOID and Po is a METAL (the only chalcogen without a stable isotope) — classifying all Group 16 elements as non-metals is wrong.",
      "Acid strength of the hydrides increases down the group: H₂O neutral < H₂S < H₂Se < H₂Te, because the H–A bond enthalpy falls faster than the polarity does."
    ],
    periodicTrendFacts: [
      "Metallic character rises down Group 16: non-metal (O, S, Se) → metalloid (Te) → metal (Po), and the oxides swing from acidic to amphoteric.",
      "Ionization enthalpy falls O → Po, but oxygen sits BELOW sulfur in electron gain enthalpy, so the two trends do not run together.",
      "Boiling point of the hydrides falls H₂O (100 °C) → H₂S (−60 °C) then rises slightly to H₂Te (−2 °C) as dispersion forces take over from hydrogen bonding.",
      "Catenation weakens down the group: S forms long Sₙ chains but oxygen forms only O₂/O₃, and Te/Polonium show essentially no chain chemistry."
    ],
    ceeFrequentFacts: [
      "Electron gain enthalpy in kJ/mol: S −200 > Se −195 > Te −190 > O −141 — the classic CEE inversion.",
      "Ozone O₃ is bent (117°) and diamagnetic; its oxidising power exceeds O₂ and it is produced by silent electric discharge in oxygen.",
      "SO₂ bleaches by reduction while Cl₂ bleaches by oxidation — the standard distinguishing question.",
      "H₂SO₄ (Contact process, V₂O₅ catalyst at 400–450 °C) is the highest-tonnage industrial chemical of the group; SO₂ is the intermediate.",
      "H₂O is the only liquid hydride of the group (hydrogen bonding) and has the highest specific heat capacity of any common liquid."
    ],
    elementSymbols: ["O", "S", "Se", "Te", "Po", "Lv"],
    testCondition: (el) => el.group === 16
  },

  pnictogens: {
    id: "pnictogens",
    name: "Pnictogens (Group 15)",
    classificationType: "family",
    shortBadge: "Group 15 (N–Mc)",
    accentColor: "#7c3aed",
    oneLineSummary:
      "Nitrogen family (ns² np³) with a half-filled p-subshell: it shows −3, +3 and +5 states, the inert-pair effect grows down the group, and the set runs non-metal → metalloid → metal.",
    generalElectronicConfig: "ns² np³ (n = 2 to 6)",
    keyCharacteristics: [
      { title: "Half-Filled Shell Stability", detail: "The np³ configuration gives N₂ a 945 kJ/mol triple bond and makes the −3 state (NH₃, PH₃) easy for the lighter members." },
      { title: "Inert-Pair Effect", detail: "The +5 state becomes progressively less stable down the group: P and As keep +5, while Bi(V) (NaBiO₃, Bi₂O₅) survives only as a strong oxidant." },
      { title: "Rich Allotropy", detail: "N (N₂), P (white, red, black), As (grey, yellow), Sb (grey, yellow) and Bi (one metallic form) — white phosphorus is the most reactive and most toxic form." },
      { title: "Pyramidal Hydrides", detail: "EH₃ molecules are all pyramidal with a lone pair (NH₃ 107°), giving the family its Brønsted basicity and coordination chemistry (NH₃, PR₃ ligands)." }
    ],
    examTrapsAndExceptions: [
      "Nitrogen has no d-orbitals available, so NF₅ does NOT exist while PF₅ does — nitrogen caps at +5 only in oxoacids (HNO₃).",
      "Basicity and boiling point fall NH₃ > PH₃ > AsH₃ > SbH₃ > BiH₃ despite the rising molar mass, because only NH₃ hydrogen-bonds.",
      "Bi(V) is a powerful oxidising agent: NaBiO₃ oxidises Mn²⁺ to the violet MnO₄⁻ (the bismuthate test), the reverse of the normal +5 stability.",
      "Nitrogen cannot catenate: the N–N single bond is weak (159 kJ/mol) even though N≡N is the strongest bond in the family."
    ],
    periodicTrendFacts: [
      "Metallic character increases N → Bi: N and P are non-metals, As and Sb metalloids, Bi a metal with a basic oxide (Bi₂O₃).",
      "Oxide character swings from acidic (N₂O₅, P₄O₁₀) to amphoteric (As₂O₃, Sb₂O₃) to basic (Bi₂O₃) down the group.",
      "Thermal stability of EH₃ collapses down the group: NH₃ endures 1000 °C while BiH₃ decomposes at room temperature.",
      "Ionization enthalpy dips from N to P (N is the second-highest of all elements) then rises again to Bi as the 4f/5d screens the nucleus."
    ],
    ceeFrequentFacts: [
      "N₂ bond enthalpy 945 kJ/mol is the reason for nitrogen's inertness and for Haber's 200 atm/Fe catalyst conditions.",
      "P₄O₆ forms in limited air and P₄O₁₀ in excess O₂; P₄O₁₀ is the strongest common dehydrating agent (dries HCl gas).",
      "HNO₃ oxidation states: N₂O (+1), NO (+2), N₂O₃ (+3), NO₂ (+4), N₂O₅ (+5); dilute acid gives NO with Cu, concentrated gives NO₂.",
      "Ammonia is made by the Haber process (N₂ + 3H₂ ⇌ 2NH₃, Fe catalyst, 400–500 °C, 200 atm) — the standard Le Chatelier application.",
      "White phosphorus is stored under water because it ignites in air at about 30 °C; red phosphorus is stable and non-toxic."
    ],
    elementSymbols: ["N", "P", "As", "Sb", "Bi", "Mc"],
    testCondition: (el) => el.group === 15
  },

  carbon_group: {
    id: "carbon_group",
    name: "Carbon / Tetrel Group (Group 14)",
    classificationType: "family",
    shortBadge: "Group 14 (C–Fl)",
    accentColor: "#475569",
    oneLineSummary:
      "Carbon group (ns² np²) — carbon a non-metal, silicon and germanium metalloids, tin and lead metals; the +2 state gains stability down the group while catenation vanishes.",
    generalElectronicConfig: "ns² np² (n = 2 to 6)",
    keyCharacteristics: [
      { title: "Two Oxidation States", detail: "All members show +4, and +2 becomes progressively more stable from germanium onward (GeO, Sn²⁺, Pb²⁺), the classic inert-pair drift." },
      { title: "Carbon's Unique Catenation", detail: "Only carbon builds endless chains and rings (diamond, graphite, fullerenes, graphene and all of organic chemistry); Si–Si bonds are far too weak." },
      { title: "Covalent Preference", detail: "The elements prefer covalent bonding; genuine ionic M²⁺ salts appear only with the heavier tin and lead (PbCl₂, SnCl₂)." },
      { title: "Allotropy and Network Solids", detail: "C (diamond, graphite, fullerene), Si (crystalline and amorphous), Sn (white and grey), while SiO₂ is an infinite covalent network rather than a molecule." }
    ],
    examTrapsAndExceptions: [
      "Inert-pair effect flips the redox role: CO₂ is inert but PbO₂ is a powerful oxidant (Pb⁴⁺ + 2e⁻ → Pb²⁺, E° = +1.46 V).",
      "Graphite, not diamond, is the thermodynamically stable allotrope at 298 K — ΔH°f (diamond) = +1.9 kJ/mol, so diamond is kinetically trapped.",
      "CO is a neutral but strongly reducing gas while CO₂ is acidic; CO binds haemoglobin about 250 times more strongly than O₂, which is why it is lethal.",
      "SnCl₂ is a reducing agent (decolorises Fe³⁺ and KMnO₄) but SnCl₄ is a stable covalent liquid that fumes in moist air — tin's two faces in one question."
    ],
    periodicTrendFacts: [
      "Oxide character goes from acidic (CO₂) → weakly acidic (SiO₂) → amphoteric (SnO₂, PbO₂) → basic (PbO, GeO) down the group.",
      "Stability of the +4 state falls and that of the +2 state rises as you descend, the cleanest inert-pair illustration in the p-block.",
      "Atomic radius and metallic character both increase C → Pb, and melting points rise from CO₂'s molecular solid to the giant covalent network of SiO₂.",
      "π-bond strength falls with size: CO₂ is a stable linear molecule, but SiO₂ is a network solid because Si cannot form strong pπ–pπ double bonds to O."
    ],
    ceeFrequentFacts: [
      "Diamond is sp³, the hardest natural substance and an electrical insulator; graphite is sp² with delocalised electrons and conducts in-plane.",
      "Graphite reduces acidified KMnO₄/dichromate (the standard distinguishing test); CO₂ turns limewater milky, excess gas dissolving the precipitate.",
      "CaCO₃ → CaO + CO₂ (calcination, ~900 °C) and CaO + H₂O → Ca(OH)₂ (slaking) are the Lime-cycle equations asked every year.",
      "Lead-acid battery: PbO₂/Pb in H₂SO₄ gives about 2 V per cell, the highest-yield practical application of Group 14.",
      "SiO₂ + 2NaOH → Na₂SiO₃ + H₂O and SiO₂ + CaCO₃ → CaSiO₃ + CO₂ prove silica is an acidic (network) oxide."
    ],
    elementSymbols: ["C", "Si", "Ge", "Sn", "Pb", "Fl"],
    testCondition: (el) => el.group === 14
  },

  boron_group: {
    id: "boron_group",
    name: "Boron / Icosagen Group (Group 13)",
    classificationType: "family",
    shortBadge: "Group 13 (B–Nh)",
    accentColor: "#b45309",
    oneLineSummary:
      "Boron group (ns² np¹) with an electron-deficient +3 state that narrows to covalent character, plus a +1 inert-pair state that grows more stable from gallium down to thallium.",
    generalElectronicConfig: "ns² np¹ (n = 2 to 6)",
    keyCharacteristics: [
      { title: "Electron-Deficient Boron", detail: "B has only six valence electrons around it in BF₃/BCl₃, making it the textbook Lewis acid that accepts a lone pair from NH₃, ether or F⁻." },
      { title: "+1 versus +3 States", detail: "The +3 state dominates for B and Al but loses ground down the group while the +1 state strengthens — Tl(I) is more stable than Tl(III)." },
      { title: "Amphoteric Hydroxides", detail: "Al(OH)₃ and Ga(OH)₃ dissolve in both acid and alkali, while B(OH)₃ is only a weak monobasic acid." },
      { title: "Metallic Ladder", detail: "B is a metalloid, Al a metal, and Ga/In/Tl become increasingly metallic — gallium even melts at 29.8 °C in the hand." }
    ],
    examTrapsAndExceptions: [
      "Boron is a METALLOID that does not react with acids; B₂O₃ is acidic while Al₂O₃ is amphoteric — the group is not uniform.",
      "The inert-pair drift is opposite to the +3 preference: Tl(I) is the stable thallium state and Tl(III) is a strong oxidant (E° = +1.26 V).",
      "BCl₃ is a monomer, but AlCl₃ dimerises to Al₂Cl₆ in the vapour phase and in non-polar solvents through chlorine bridges.",
      "Aluminium does not release H₂ with dilute acids? It does with HCl but not with HNO₃ — concentrated HNO₃ passivates Al with a dense oxide film."
    ],
    periodicTrendFacts: [
      "Ionization enthalpy falls B → Al, rises slightly at Ga (poor 3d shielding) and drops again In → Tl as the inert pair weakens the last electron's binding.",
      "Atomic radius rises down the group with a slight contraction at Ga because the filled 3d¹⁰ shell screens badly.",
      "Melting point collapses B (2076 °C) → Ga (29.8 °C) as the three-dimensional covalent lattice gives way to weak metallic bonding.",
      "Reducing power increases down the group: Tl(I) is easily oxidised back to Tl(III) only in strong oxidants, whereas Al stays +3 in every ordinary reaction."
    ],
    ceeFrequentFacts: [
      "Aluminium is won by the Hall–Héroult process: purified Al₂O₃ dissolved in molten cryolite (Na₃AlF₆) and electrolysed with consumable carbon anodes.",
      "Cryolite lowers the working temperature from 2072 °C to about 1000 °C and increases the conductivity of the melt — the standard CEE reason.",
      "Thermite reaction: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (highly exothermic, used to weld rails).",
      "Aluminium is passivated by an adherent Al₂O₃ film yet still dissolves in both HCl and NaOH: 2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂.",
      "Borax Na₂B₄O₇·10H₂O gives the borax-bead flame test and is the standard boron compound; boron's +3 state never forms B³⁺ ions in water."
    ],
    elementSymbols: ["B", "Al", "Ga", "In", "Tl", "Nh"],
    testCondition: (el) => el.group === 13
  },

  alkaline_metals_cee: {
    id: "alkaline_metals_cee",
    name: "CEE Alkaline + Alkali Combined Reference Block",
    classificationType: "family",
    shortBadge: "CEE s-Block Families",
    accentColor: "#b91c1c",
    oneLineSummary:
      "Combined s-block reference: the six alkali metals (ns¹) plus the six alkaline earths (ns²) that together display the sharpest group trends and the flame-test colours.",
    generalElectronicConfig: "ns¹ (Group 1) and ns² (Group 2), n = 2 to 7",
    keyCharacteristics: [
      { title: "Fixed Valency", detail: "Group 1 is always +1 (M⁺) and Group 2 always +2 (M²⁺) — no variable oxidation states anywhere in the s-block." },
      { title: "Reactivity Ladder", detail: "Both columns become more reactive downward (Li < Na < K < Rb < Cs; Be < Mg < Ca < Sr < Ba) as ionization enthalpy falls." },
      { title: "Hydride and Oxide Character", detail: "Both groups give largely ionic hydrides and basic oxides, except Be (covalent, amphoteric) and Li (anomalously stable Li₃N and Li₂O)." },
      { title: "Flame Colours", detail: "Li crimson, Na golden yellow, K lilac, Rb red-violet, Cs blue, Ca brick-red, Sr crimson, Ba apple-green — the flame-test group of the periodic table." }
    ],
    examTrapsAndExceptions: [
      "Lithium shows the diagonal relationship with MAGNESIUM, not sodium: Li₃N forms directly from the elements, Li₂CO₃ decomposes to Li₂O + CO₂, and LiF/Li₂CO₃ are sparingly soluble.",
      "Beryllium is anomalous too: BeO and Be(OH)₂ are amphoteric, BeCl₂ is covalent and polymeric, and Be shows no Bunsen flame colour.",
      "Group 1 nitrates give nitrites plus O₂ on heating EXCEPT LiNO₃, which gives Li₂O; all Group 2 nitrates give oxides.",
      "Both groups must be stored under oil or kerosene; caesium and francium are too reactive to keep in the open at all (Fr has a 22-minute half-life)."
    ],
    periodicTrendFacts: [
      "Reactivity rises down both columns because ionization enthalpy and hydration enthalpy fall faster than lattice enthalpy rises.",
      "Group 2 metals are harder, denser and higher melting than their Group 1 neighbours in the same period because two valence electrons per atom strengthen the metallic lattice.",
      "Solubility and basicity of the hydroxides increase down Group 2 (Mg(OH)₂ is sparingly soluble, Ba(OH)₂ is freely soluble), while all Group 1 hydroxides are strong bases.",
      "Diagonal relationships cross the two columns: Li–Mg and Be–Al share anomalous sizes, covalent character and amphoteric or nitride chemistry."
    ],
    ceeFrequentFacts: [
      "Flame-test colours plus the Mg/Ca/Ba hydroxide titration are the two most repeated s-block practicals in CEE.",
      "Diagonal pairs you must be able to justify: Li–Mg and Be–Al (charge/radius ratio and hydration arguments).",
      "MgCl₂·6H₂O on heating hydrolyses to MgO + 2HCl + 5H₂O, so anhydrous MgCl₂ needs dry HCl gas — a classic CEE trap.",
      "Plaster of Paris: CaSO₄·2H₂O → CaSO₄·½H₂O at 393 K; overheating to the anhydrous salt destroys its setting power.",
      "Sodium reacts with water and alcohol to give H₂ (2Na + 2H₂O → 2NaOH + H₂); lithium reacts the slowest and caesium explosively."
    ],
    elementSymbols: ["Li", "Be", "Na", "Mg", "K", "Ca", "Rb", "Sr", "Cs", "Ba", "Fr", "Ra"],
    testCondition: (el) =>
      (el.group === 1 && el.atomicNumber !== 1) || el.group === 2
  },

  post_transition_metals: {
    id: "post_transition_metals",
    name: "Post-Transition / Poor Metals",
    classificationType: "family",
    shortBadge: "Lower p-block Metals",
    accentColor: "#92400e",
    oneLineSummary:
      "The soft, low-melting p-block metals of Groups 13–16 (Al, Ga, In, Sn, Tl, Pb, Bi and their heavy congeners) that sit after the transition series with weak bonding and clear +1/+3 or +2/+4 duality.",
    generalElectronicConfig: "ns² np¹⁻³ with a filled (n-1)d¹⁰ shell",
    keyCharacteristics: [
      { title: "Low-Melting Soft Metals", detail: "Weak metallic bonding and a filled d-shell make these metals soft and low melting (Ga 29.8 °C, Bi 271 °C, Pb 327 °C) compared with the transition metals." },
      { title: "Inert-Pair Duality", detail: "Both a lower and a higher state exist — Tl⁺/Tl³⁺, Sn²⁺/Sn⁴⁺, Pb²⁺/Pb⁴⁺, Bi³⁺/Bi⁵⁺ — and the LOWER state stabilises down the group." },
      { title: "Amphoteric Oxides", detail: "Al₂O₃, Ga₂O₃, SnO, SnO₂, PbO and PbO₂ all dissolve to some degree in both acid and alkali, the metalloid-to-metal transition made visible." },
      { title: "Alloy Chemistry", detail: "Low melting points make them the basis of solders (Sn–Pb), type metal (Pb–Sb–Sn), fusible alloys (Wood's metal) and bearing metals." }
    ],
    examTrapsAndExceptions: [
      "PbO₂ is a strong OXIDISING agent, not a basic oxide like PbO; for tin the +2 state is the reducing one (SnCl₂) and for lead the +4 state oxidises.",
      "Al and Ga are amphoteric metals, but basicity grows along Groups 13 → 16: In/Sn/Pb oxides are mostly amphoteric while Bi₂O₃ is essentially basic.",
      "Mercury is a LIQUID metal and belongs with the volatile metals — it is not a post-transition p-block metal, even though its neighbours are.",
      "Grey tin (α-Sn, semiconducting diamond lattice) converts to brittle white tin below 13.2 °C, crumbling to powder — the 'tin pest' phenomenon."
    ],
    periodicTrendFacts: [
      "Ionization enthalpy falls and metallic character rises down each p-block group, so the heavier members behave much more like true metals.",
      "Melting points are far below those of the neighbouring transition metals because the d-shell is full and contributes little to bonding.",
      "Basicity of the oxides increases left to right across the p-block columns: Al₂O₃ (amphoteric) → SiO₂ (acidic) → P₄O₁₀ (acidic) versus Bi₂O₃ (basic).",
      "Stability of the higher oxidation state falls down every group (inert-pair effect), which is why Pb(IV) and Bi(V) are strong oxidants."
    ],
    ceeFrequentFacts: [
      "Solder is Sn–Pb, type metal is Pb–Sb–Sn and Wood's metal (Bi–Pb–Sn–Cd) melts near 70 °C — the standard low-melting alloy questions.",
      "PbCl₂ (ionic, stable) versus PbCl₄ (covalent, unstable) is the usual lead oxidation-state comparison; lead dissolves only in HNO₃ among dilute acids.",
      "Bismuth is the most diamagnetic of all metals and a strong neutron absorber, so it is used in reactor shielding and in low-melting alloys.",
      "Tin plating protects iron from corrosion but cracks expose the iron, which then rusts faster — the classic electrochemical reason."
    ],
    elementSymbols: ["Al", "Ga", "In", "Sn", "Tl", "Pb", "Bi", "Nh", "Fl", "Mc", "Lv"],
    testCondition: (el) =>
      el.category === "metal" &&
      el.block === "p" &&
      [13, 14, 15, 16].includes(el.group)
  },

  reactive_nonmetals: {
    id: "reactive_nonmetals",
    name: "Reactive Non-Metals (Excluding Noble Gases)",
    classificationType: "family",
    shortBadge: "Reactive p + H",
    accentColor: "#047857",
    oneLineSummary:
      "The reactive non-metals — hydrogen plus the p-block non-metals of Groups 14–17, excluding the unreactive noble gases.",
    generalElectronicConfig: "1s¹ (H) and ns² np¹⁻⁵ (n = 2 to 6)",
    keyCharacteristics: [
      { title: "Electron Hungry", detail: "High electronegativity and electron gain enthalpy drive these elements to gain electrons or share pairs, producing acidic oxides and covalent hydrides." },
      { title: "Molecular Forms", detail: "Seven are diatomic (H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂); the rest form simple molecular solids (S₈, P₄, I₂) or network solids (C, Si, B)." },
      { title: "Bond-Strength Extremes", detail: "They own the strongest bonds in the table (N≡N 945 kJ/mol, H–F 570 kJ/mol) as well as the weakest molecular lattices held by dispersion forces alone (I₂)." },
      { title: "Acidic Oxide Chemistry", detail: "Their oxides are acidic or neutral (CO, NO) and their hydrides are acidic (HCl, H₂S, H₂O neutral) — the opposite of metal oxides." }
    ],
    examTrapsAndExceptions: [
      "Hydrogen is a non-metal placed in Group 1 for electronic reasons; it also forms the hydride ion H⁻ like a halogen (its diagonal partners are F and Cl).",
      "Iodine is a solid and astatine (Ts) is a metalloid-like radioactive halogen, so treating all halogens as gases is wrong.",
      "Carbon as diamond conducts heat but not electricity, while graphite conducts both — same element, opposite electrical behaviour.",
      "White phosphorus ignites in air near 30 °C, but nitrogen and the noble gases will not react at all: reactivity across this set is not a smooth trend."
    ],
    periodicTrendFacts: [
      "Non-metal reactivity and electronegativity increase toward the top-right (F, O, Cl, N); metallic character grows left and downward.",
      "Acidity of the oxides strengthens with the oxidation state: SO₃ > SO₂ > CO₂ > B₂O₃, while CO and NO are neutral.",
      "Hydride acid strength rises down each group (HF < HCl < HBr < HI; H₂O < H₂S < H₂Se < H₂Te) because bond enthalpy falls faster than polarity.",
      "Physical state follows molar mass: H₂/N₂/O₂/F₂/Cl₂ gases → Br₂ liquid → I₂ solid, and boiling points rise with dispersion forces."
    ],
    ceeFrequentFacts: [
      "One mole of any of these gases occupies 22.4 L at STP and holds 6.02 × 10²³ molecules — the single most used mole fact in CEE.",
      "Fluorine has the highest electronegativity (4.0) and is the strongest oxidising agent; it oxidises water to O₂ and is made by electrolysis of KF·2HF.",
      "Iodine gives a blue-black complex with starch and a violet vapour, and sublimes on gentle heating — the standard identification trio.",
      "Sulfur dioxide bleaches by reduction and chlorine by oxidation; both are tested with moist litmus and with dyes."
    ],
    elementSymbols: ["H", "C", "N", "O", "F", "P", "S", "Cl", "Se", "Br", "I", "At", "Ts"],
    testCondition: (el) =>
      el.category === "nonmetal" && el.group !== 18
  },

  noble_gases_cee: {
    id: "noble_gases_cee",
    name: "CEE Noble / Aerogen Reference Block",
    classificationType: "family",
    shortBadge: "CEE Inert Gases",
    accentColor: "#6d28d9",
    oneLineSummary:
      "CEE reference set for the noble (aerogen) gases: monoatomic Group 18 elements with complete shells, maximum ionization enthalpies and the lowest boiling points of all elements.",
    generalElectronicConfig: "1s² (He) and ns² np⁶ (n = 2 to 6)",
    keyCharacteristics: [
      { title: "Complete Shells", detail: "He 1s² and Ne–Og ns² np⁶ give the group its maximum ionization enthalpy and its refusal to gain or lose electrons in ordinary chemistry." },
      { title: "Monoatomic Gases", detail: "Only weak London dispersion forces act between atoms, so the group has the lowest melting and boiling points of any period." },
      { title: "Xenon Chemistry", detail: "Only the large, easily ionized Xe (and Kr slightly) form real compounds: XeF₂ (linear), XeF₄ (square planar), XeF₆ (distorted octahedral), XeO₃ and XeOF₄." },
      { title: "Industrial Uses", detail: "He for cryogenics and balloons, Ne for discharge lamps, Ar as a welding shield, Kr for flash lamps, Rn in radiotherapy research." }
    ],
    examTrapsAndExceptions: [
      "Radon is the only radioactive noble gas and its health hazard (from uranium/radium bearing rocks) is the reason for home radon monitoring.",
      "Helium has the lowest boiling point of any substance (−268.9 °C) and cannot be solidified at atmospheric pressure even at absolute zero.",
      "XeF₂ hydrolyses to XeO₃, a dangerously explosive powerful oxidant; the lighter gases (He, Ne, Ar) form no stable compounds at all.",
      "Argon is the most abundant noble gas in air (0.93%), but helium is scarce on Earth despite being the second most abundant element in the universe."
    ],
    periodicTrendFacts: [
      "Boiling points rise smoothly He → Rn as the number of electrons and the dispersion forces increase — the least interrupted trend in the periodic table.",
      "Ionization enthalpy falls down the group (He 2372 → Rn 1037 kJ/mol), which is exactly why only Xe can be oxidised into fluoride chemistry.",
      "Atomic radius grows down the group because the ns² np⁶ shell screens the rising nuclear charge poorly.",
      "Helium is anomalous: the 1s² shell gives the highest ionization enthalpy and the lowest boiling point, far outside the smooth group trend."
    ],
    ceeFrequentFacts: [
      "Neil Bartlett's XePtF₆ (1962) destroyed the 'inert gas' label; the group is now called the noble gases.",
      "XeF₂ is linear (sp³d), XeF₄ square planar (sp³d²) and XeF₆ distorted octahedral — the hydration/geometry questions appear almost every year.",
      "Helium was detected in the solar spectrum in 1868 before being found on Earth — the famous 'discovered in a spectrum' fact.",
      "Neon discharge lamps glow orange-red and argon-filled tubes blue-violet; both are industrial consequences of the low ionization enthalpy order.",
      "Noble gases have positive (endothermic) electron gain enthalpy values, which is why they are used as the zero reference in group-trend questions."
    ],
    elementSymbols: ["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"],
    testCondition: (el) => el.group === 18
  },

  radioactive_elements: {
    id: "radioactive_elements",
    name: "Radioactive Element Block",
    classificationType: "special_group",
    shortBadge: "Radioactive Z ≥ 84 + Tc, Pm",
    accentColor: "#dc2626",
    oneLineSummary:
      "Every element with Z ≥ 84 plus technetium (43) and promethium (61) — the only two light elements with no stable isotopes.",
    generalElectronicConfig: "Tc [Kr] 4d⁵ 5s² · Pm [Xe] 4f⁵ 6s² · heavy nuclei (Z ≥ 84)",
    keyCharacteristics: [
      { title: "Two Anomalous Light Members", detail: "Technetium (43) and promethium (61) are radioactive with no stable isotopes, yet they are far lighter than the Z ≥ 84 natural decay series." },
      { title: "Decay Modes", detail: "Heavy nuclei (Z > 82) decay mainly by α-emission; neutron-rich fission products decay by β⁻ with accompanying γ-radiation." },
      { title: "Nuclear Applications", detail: "Tc-99m is the workhorse of medical imaging, U-235 is fissile, U-238 is fertile and Pu-239 is bred in reactors." },
      { title: "Health Hazard", detail: "Radon, radium, polonium and plutonium are the CEE-favourite examples of radioactive substances that cause cancer on internal exposure." }
    ],
    examTrapsAndExceptions: [
      "'Radioactive means Z ≥ 84' is wrong: Tc (43) and Pm (61) are the two light elements with no stable isotopes.",
      "Bi-209 was long held to be the heaviest stable isotope; it is actually weakly radioactive (α, half-life about 2 × 10¹⁹ years).",
      "All actinides are radioactive, but thorium and uranium occur naturally in useful amounts; every element beyond uranium is synthetic.",
      "Half-life is a purely nuclear property — temperature, pressure and chemical state do not change the decay constant in ordinary conditions."
    ],
    periodicTrendFacts: [
      "Nuclear stability fails beyond Z = 83 because proton–proton repulsion outgrows the strong force, so α-emission becomes the relief valve.",
      "The neutron/proton ratio required for stability rises with Z (about 1:1 for light nuclei, 1.5:1 for heavy ones), which is why heavy fission products decay by β⁻.",
      "Half-lives span an enormous range — Po-214 about 10⁻⁴ s versus U-238 4.5 × 10⁹ years — so nuclear decay trends are statistical, not monotonic."
    ],
    ceeFrequentFacts: [
      "Half-life relation: t½ = 0.693 / λ, and after n half-lives the fraction remaining is (1/2)ⁿ — the standard model calculation.",
      "U-235 is only 0.72% of natural uranium, so enrichment is essential for reactor fuel and weapons.",
      "Po-210 is a powerful α-emitter used as the classic poisoning example; Ra-226 decays to the radioactive gas Rn-222, a lung-cancer hazard in mines.",
      "Carbon-14 (t½ 5730 years) dates archaeological material and K-40 dates rocks; both are β-emitters used in radiometric dating."
    ],
    elementSymbols: ["Tc", "Pm", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"],
    testCondition: (el) => {
      const radioactiveZ = new Set([43, 61, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118]);
      return radioactiveZ.has(el.atomicNumber);
    }
  },

  lanthanide_block: {
    id: "lanthanide_block",
    name: "Lanthanide Series Block",
    classificationType: "family",
    shortBadge: "4f Series (Z 58–71)",
    accentColor: "#db2777",
    oneLineSummary:
      "The fourteen 4f-series elements Ce–Lu (Z 58–71): an inner transition set with nearly identical chemistry, the universal +3 state and the lanthanide contraction.",
    generalElectronicConfig: "[Xe] 4f¹⁻¹⁴ 5d⁰⁻¹ 6s² (Ce–Lu)",
    keyCharacteristics: [
      { title: "Series Start After Lanthanum", detail: "The 4f series begins at cerium (58) after lanthanum (57), which is a d-block element in this table, and runs to lutetium (71)." },
      { title: "Stable +3 State", detail: "All lanthanides show +3; Ce⁴⁺ (f⁰), Eu²⁺ (f⁷), Yb²⁺ (f¹⁴) and Tb⁴⁺ (f⁸) are the anomalous states explained by empty/half-filled/fully-filled shells." },
      { title: "Lanthanide Contraction", detail: "The 4f shell screens the nucleus poorly, so ionic radii shrink steadily from Ce³⁺ to Lu³⁺ (about 1.5 pm per element) and the later members become unexpectedly small." },
      { title: "Colour and Magnetism", detail: "Most Ln³⁺ ions are coloured (4f transitions) and strongly paramagnetic, while La³⁺ (f⁰) and Lu³⁺ (f¹⁴) are colourless and diamagnetic." }
    ],
    examTrapsAndExceptions: [
      "Lanthanum (57) is a d-block element and lutetium (71) is often assigned to Group 3, so the 4f series here runs Ce → Lu — a common labelling trap.",
      "Promethium (61) is the only lanthanide with no stable isotope and the only one essentially absent from monazite sand.",
      "Basicity of the hydroxides DECREASES from La(OH)₃ to Lu(OH)₃ because the smaller Ln³⁺ polarises OH⁻ more (Fajans' rule) — the opposite of the usual group trend.",
      "Atomic and ionic radii fall across the series, so density and melting point generally RISE, again contradicting the normal period trend.",
      "Europium and ytterbium are the density/melting anomalies because their +2 states change the metallic bonding."
    ],
    periodicTrendFacts: [
      "Lanthanide contraction: La³⁺ (103 pm) → Lu³⁺ (86 pm), about 1.5 pm per element, because 14 diffuse 4f electrons shield the nuclear charge very poorly.",
      "Metallic radius and atomic volume decrease across the series, so density and hardness mostly increase from Ce to Lu.",
      "Ionization enthalpy and electrode potential change only slightly, so all lanthanides are reactive metals (E° ≈ −2.3 V) with nearly identical solution chemistry.",
      "The contraction explains why 5d elements match their 4d congeners in size (Zr ≈ Hf, Nb ≈ Ta, Mo ≈ W) and why Y resembles Ho."
    ],
    ceeFrequentFacts: [
      "Lanthanides are separated by ion-exchange chromatography or fractional precipitation, because the +3 chemistry is almost identical.",
      "Cerium(IV) — ceric ammonium nitrate or CeO₂ in acid — is a strong one-electron oxidant, while Ce³⁺ is colourless.",
      "Misch metal (La/Ce/Pr/Nd alloy) is used in lighter flints and in magnesium alloys.",
      "You should be able to name Ce(58) through Lu(71) in order — direct symbol/name questions come up regularly."
    ],
    elementSymbols: ["Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu"],
    testCondition: (el) => el.atomicNumber >= 58 && el.atomicNumber <= 71
  },

  actinide_block: {
    id: "actinide_block",
    name: "Actinide Series Block",
    classificationType: "family",
    shortBadge: "5f Series (Z 90–103)",
    accentColor: "#be123c",
    oneLineSummary:
      "The 5f-series elements Th–Lr (Z 90–103): all radioactive, with a much richer oxidation chemistry than the lanthanides because the 5f, 6d and 7s orbitals lie close in energy.",
    generalElectronicConfig: "[Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s² (Th–Lr)",
    keyCharacteristics: [
      { title: "Wide Oxidation Range", detail: "+3 to +7 is possible (Th +4, U +6, Np/Pu up to +7), far more varied than the lanthanides' almost exclusive +3." },
      { title: "Synthetic and Radioactive", detail: "Only thorium, uranium and traces of protactinium occur naturally; neptunium, plutonium and everything beyond are made by neutron capture or in accelerators." },
      { title: "Actinide Contraction", detail: "A parallel to the lanthanide contraction makes An³⁺ and An⁴⁺ ions resemble their lanthanide counterparts in size and behaviour." },
      { title: "Fissile and Fertile Members", detail: "U-235 and Pu-239 are fissile, while Th-232 is fertile and breeds U-233 in a breeder reactor." }
    ],
    examTrapsAndExceptions: [
      "Thorium has no 5f electrons ([Rn] 6d² 7s²) yet is placed with the actinides, and its chemistry is dominated by Th(IV).",
      "Actinides show MORE oxidation states than lanthanides (Np, Pu and Am reach +7, +6, +6) because the 5f, 6d and 7s energies are comparable.",
      "Uranium's stable state is +6, the uranyl ion UO₂²⁺; U(III) and U(V) disproportionate in aqueous solution.",
      "All actinides are radioactive and most are extremely toxic, so they are handled only in gloveboxes and shielded facilities."
    ],
    periodicTrendFacts: [
      "The 5f orbitals contract and lose their bonding role across the series, so the heavier actinides from curium onward become lanthanide-like in size and chemistry.",
      "The maximum oxidation state falls after americium and +3 becomes dominant, mirroring the lanthanides at the end of their series.",
      "Actinide contraction is steeper than lanthanide contraction because 5f electrons shield the nuclear charge even less effectively."
    ],
    ceeFrequentFacts: [
      "U-235 is 0.72% of natural uranium; enrichment raises it to about 3–5% for reactor fuel.",
      "UO₂²⁺ (uranyl) is the characteristic uranium(VI) species and gives yellow-green solutions.",
      "Plutonium was the first synthetic element, identified in 1940 from the decay of neptunium-239 produced by neutron bombardment of uranium.",
      "Thorium is about three times more abundant than uranium (monazite sand) and is a fertile nuclear fuel; all actinides are radioactive."
    ],
    elementSymbols: ["Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr"],
    testCondition: (el) => el.atomicNumber >= 90 && el.atomicNumber <= 103
  },

  transition_metals_3d: {
    id: "transition_metals_3d",
    name: "3d Transition Series (First Row)",
    classificationType: "family",
    shortBadge: "3d (Z 21–30)",
    accentColor: "#ea580c",
    oneLineSummary:
      "First transition series Sc → Zn: the compact 3d subshell fills and delivers the textbook transition behaviour — variable valency, colour, paramagnetism, catalysis and alloys.",
    generalElectronicConfig: "[Ar] 3d¹⁻¹⁰ 4s¹⁻² (Sc–Zn)",
    keyCharacteristics: [
      { title: "3d Filling", detail: "Sc 3d¹4s² through Zn 3d¹⁰4s²; the small 3d orbitals overlap ligands strongly, so 3d complexes are high-spin and less stable than their 4d/5d analogues." },
      { title: "Variable Valency", detail: "Mn spans +2 to +7 and Cr +2 to +6, while Fe works in +2/+3; the maximum state rises to Mn (+7) then falls to Zn (+2)." },
      { title: "Colour and Magnetism", detail: "Most 3d ions are coloured and paramagnetic from d¹ to d⁹ unpaired electrons; Sc³⁺ (d⁰) and Zn²⁺ (d¹⁰) are colourless and diamagnetic." },
      { title: "Industrial Backbone", detail: "Fe, Cr, Ni, Cu and Zn underpin steel, stainless steel, brass, bronze and galvanising — the most examined metals of the block." }
    ],
    examTrapsAndExceptions: [
      "Sc is a transition element (d¹) but Sc³⁺ is d⁰, hence colourless and diamagnetic; Zn is d-block but not a transition metal because Zn²⁺ is d¹⁰.",
      "Cr and Cu have anomalous ground-state configurations — [Ar] 3d⁵ 4s¹ and [Ar] 3d¹⁰ 4s¹ — because half-filled and filled shells gain exchange stability.",
      "Fe³⁺ (d⁵) is more stable than Fe²⁺ (d⁶) in aqueous acid, which is why Fe²⁺ acts as a reducing agent and Fe³⁺ as an oxidising agent.",
      "3d complexes are mostly high-spin because Δ₀ is small; the square-planar, diamagnetic Ni(CN)₄²⁻ is the famous inner-orbital exception."
    ],
    periodicTrendFacts: [
      "Atomic radius falls only slightly across the series (added 3d electrons shield badly) with the compact minimum around chromium and iron.",
      "Melting point rises to a mid-series maximum at vanadium (about 1910 °C) then falls to zinc (420 °C) as the number of bonding d-electrons drops.",
      "Ionization enthalpy generally rises across the series with dips at d⁵ (Mn) and d¹⁰ (Zn), where half- and fully-filled shells resist electron loss.",
      "The maximum oxidation state climbs Sc(+3) → Mn(+7) then falls back to Zn(+2) because the d-electrons become progressively less available."
    ],
    ceeFrequentFacts: [
      "Spin-only magnetic moment μ = √(n(n+2)) BM; for Fe³⁺ (d⁵, n = 5) it is 5.92 BM.",
      "Catalysts: Fe (Haber), V₂O₅ (Contact), Ni (hydrogenation) and TiCl₄/Et₃Al (Ziegler–Natta polymerisation).",
      "KMnO₄ in acid is the standard oxidant: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O; dichromate is the six-electron alternative.",
      "Aqua-ion colours: Ti³⁺ purple, V²⁺ violet, Cr³⁺ green, Mn²⁺ pink, Fe²⁺ pale green, Fe³⁺ yellow-brown, Co²⁺ pink, Ni²⁺ green, Cu²⁺ blue and Zn²⁺ colourless.",
      "Alloy names: brass (Cu–Zn), bronze (Cu–Sn), steel (Fe–C), stainless steel (Fe–Cr–Ni)."
    ],
    elementSymbols: ["Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn"],
    testCondition: (el) => el.atomicNumber >= 21 && el.atomicNumber <= 30
  },

  transition_metals_4d: {
    id: "transition_metals_4d",
    name: "4d Transition Series (Second Row)",
    classificationType: "family",
    shortBadge: "4d (Z 39–48)",
    accentColor: "#c2410c",
    oneLineSummary:
      "Second transition series Y → Cd: the more diffuse 4d orbitals give stronger ligand overlap, low-spin complexes, higher coordination numbers and easier high oxidation states.",
    generalElectronicConfig: "[Kr] 4d¹⁻¹⁰ 5s⁰⁻² (Y–Cd)",
    keyCharacteristics: [
      { title: "4d Filling", detail: "Y 5s²4d¹ through Cd 4d¹⁰5s²; the larger, more penetrating 4d orbitals split more in a ligand field, so these complexes are typically low-spin and 6-coordinate." },
      { title: "Higher Oxidation States", detail: "Zr(+4), Nb(+5), Mo(+6), Tc(+7) and Ru(+8) — the 4d series reaches a higher maximum state than the 3d series." },
      { title: "Kinetic Slowness", detail: "4d complexes exchange ligands slowly, which is why they make durable catalysts and robust coordination frameworks." },
      { title: "Platinum-Group Overlap", detail: "Ru, Rh and Pd belong to both the 4d series and the platinum-group metals, so 4d chemistry carries directly into the catalyst questions." }
    ],
    examTrapsAndExceptions: [
      "Mo and Ag both have anomalous ground-state configurations — [Kr] 4d⁵ 5s¹ and [Kr] 4d¹⁰ 5s¹ — for exactly the same reason as Cr and Cu in 3d.",
      "Zr and Hf are almost identical in radius and chemistry because the lanthanide contraction cancels the expected size increase, making their separation very difficult.",
      "Technetium (43) has no stable isotope and is recovered from uranium fission products, so it is the odd member of the series.",
      "Ru and Os reach +8 (RuO₄, OsO₄) whereas iron never exceeds +6 — heavier congeners stabilise high oxidation states more readily."
    ],
    periodicTrendFacts: [
      "4d radii sit close to the 3d values early in the series but pull ahead later, while the 4d/5d pair (Zr/Hf, Nb/Ta, Mo/W) stays almost identical thanks to lanthanide contraction.",
      "Melting points peak in the middle of the series (Nb 2477 °C, Mo 2623 °C) and drop to Cd (321 °C) as the d-shell fills.",
      "High oxidation states are more accessible than in 3d (Mo +6, Ru +8) because the diffuse 4d electrons are held less tightly by the nucleus."
    ],
    ceeFrequentFacts: [
      "Molybdenum is used in Mo-steel, as a catalyst in hydrogenation and Haber-type processes, and as the MoS₂ solid lubricant.",
      "RuO₄ and OsO₄ are volatile covalent tetroxides; OsO₄ is a toxic oxidant used in organic synthesis and histology.",
      "Palladium absorbs the largest volume of hydrogen of any metal and is the basis of Pd/C and Lindlar catalysts.",
      "Silver has the highest electrical conductivity of all metals despite its 4d¹⁰5s¹ configuration, and its +1 state dominates in all ordinary compounds."
    ],
    elementSymbols: ["Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd"],
    testCondition: (el) => el.atomicNumber >= 39 && el.atomicNumber <= 48
  },

  transition_metals_5d: {
    id: "transition_metals_5d",
    name: "5d Transition Series (Third Row)",
    classificationType: "family",
    shortBadge: "5d (Z 72–80 + La)",
    accentColor: "#9a3412",
    oneLineSummary:
      "Third transition series (La plus Hf → Hg): the densest, highest-melting and most inert transition metals, made compact by the filled 4f shell that precedes them.",
    generalElectronicConfig: "[Xe] 4f¹⁴ 5d¹⁻¹⁰ 6s² (La, Hf–Hg)",
    keyCharacteristics: [
      { title: "5d Filling After 4f¹⁴", detail: "The completed 4f shell screens badly, so these atoms are unusually small, dense and high-melting compared with their 4d congeners." },
      { title: "Superlative Physical Properties", detail: "W melts at 3422 °C (highest of all metals), Re at 3186 °C, and Os/Ir are the densest elements known (about 22.6 g/cm³)." },
      { title: "Best High-State Stability", detail: "W(+6), Re(+7), Os(+8) and Ir(+4) — 5d metals stabilise their maximum oxidation states better than any other series." },
      { title: "Noble Character", detail: "Au, Pt, Ir and Os resist attack by ordinary acids and are used as inert electrodes and catalysts; Hg is the only metal liquid at STP." }
    ],
    examTrapsAndExceptions: [
      "Lanthanum (57) is listed at the head of the 5d series even though it has no 5d electron in its ground state — a standard CEE convention trap.",
      "Gold's colour is caused by relativistic contraction of the 6s orbital (a visible 5d → 6s absorption), not by d–d transitions, and Au is the most malleable metal.",
      "Mercury's +1 state is the dimeric Hg₂²⁺ (mercurous) ion, not a simple Hg⁺ ion — an exception to the simple monatomic cation pattern.",
      "Pt and Au dissolve in aqua regia (3 HCl : 1 HNO₃), and gold alone also dissolves in aerated cyanide solution (the cyanide process)."
    ],
    periodicTrendFacts: [
      "Density climbs sharply across the series (Hf 13.3 → Os 22.6 g/cm³) as filled f-shells and small radii pack the atoms tightly.",
      "Melting point peaks at tungsten (3422 °C, the maximum for any metal) and collapses at mercury (−38.8 °C), the only liquid metal.",
      "Atomic radii stay close to the 4d congeners (Zr ≈ Hf, Nb ≈ Ta) because the lanthanide contraction cancels the period increase.",
      "Ionization enthalpy is higher than in the 4d series because 5d orbitals penetrate the nucleus better, which is why these metals are more noble."
    ],
    ceeFrequentFacts: [
      "Tungsten has the highest melting point of any metal (used for filaments) and rhenium the second; WC is used for cutting tools.",
      "Gold purity: 24-carat is 100% Au; the MacArthur–Forrest cyanide process leaches gold as [Au(CN)₂]⁻ and displaces it with zinc.",
      "Mercury compounds to know: Hg₂Cl₂ (calomel, reference electrode) and HgCl₂ (corrosive sublimate, a deadly poison).",
      "Platinum is the standard inert electrode (hydrogen electrode) and the key catalytic metal in converters (Pt/Pd/Rh) and in Adams' catalyst (PtO₂)."
    ],
    elementSymbols: ["La", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg"],
    testCondition: (el) => el.atomicNumber === 57 || (el.atomicNumber >= 72 && el.atomicNumber <= 80)
  },

  platinum_group_metals: {
    id: "platinum_group_metals",
    name: "Platinum-Group Metals (PGMs)",
    classificationType: "special_group",
    shortBadge: "Ru, Rh, Pd, Os, Ir, Pt",
    accentColor: "#64748b",
    oneLineSummary:
      "The six platinum-group metals Ru, Rh, Pd, Os, Ir and Pt — chemically inert, extremely dense metals that are found together in platinum ores and dominate industrial catalysis.",
    generalElectronicConfig: "4d⁷⁻¹⁰ 5s⁰⁻¹ (Ru, Rh, Pd) / 5d⁶⁻⁹ 6s¹⁻² (Os, Ir, Pt)",
    keyCharacteristics: [
      { title: "Extreme Inertness", detail: "High atomization enthalpy and high ionization enthalpy mean ordinary acids leave them untouched; most need aqua regia or fusion with Na₂O₂." },
      { title: "Champion Catalysts", detail: "Their surfaces adsorb H₂, O₂ and CO strongly, making Pt, Pd and Rh the best heterogeneous catalysts (converters, hydrogenation, reforming)." },
      { title: "Densest Metals", detail: "Os and Ir are the densest elements known (about 22.6 g/cm³); all six melt above 1500 °C (Pt 1768 °C, Os 3033 °C)." },
      { title: "Hydrogen Sponge", detail: "Palladium absorbs up to 900 times its own volume of hydrogen to form PdHₓ, the standard CEE palladium fact." }
    ],
    examTrapsAndExceptions: [
      "The PGMs are not all in one period: Ru, Rh, Pd are 4d while Os, Ir, Pt are 5d — CEE asks for the vertical pairs (Ru/Os, Rh/Ir, Pd/Pt).",
      "Rhodium is the most expensive of the six and the best NOₓ converter; palladium is cheaper and dominates petrol-engine converters.",
      "Osmium tetroxide OsO₄ is volatile, extremely toxic and has a pungent smell — the least 'inert' compound in the set.",
      "Aqua regia dissolves Au, Pt and Pd but not Ir or Ru completely; Ir is attacked only by fused oxidising fluxes."
    ],
    periodicTrendFacts: [
      "Each group pairs across the periods (Ru/Os, Rh/Ir, Pd/Pt) with almost identical chemistry, a direct consequence of the lanthanide contraction.",
      "Melting point and density rise from the 4d to the 5d member of each pair (Pd 1555 °C → Pt 1768 °C) as the metallic lattice strengthens.",
      "Ionization enthalpy is highest for Ir and Pt, which explains their exceptional inertness and resistance to oxidation."
    ],
    ceeFrequentFacts: [
      "Catalytic converter equations: 2CO + O₂ → 2CO₂ and 2NO → N₂ + O₂ over Pt/Pd/Rh.",
      "Palladium is the best hydrogen-storage metal and the basis of Pd/C and Lindlar's catalyst (Pd/CaCO₃).",
      "Platinum is the standard inert electrode and forms the Pt/Pt-Rh thermocouple used as a temperature reference.",
      "Ores and recovery: platinum occurs native and as sperrylite PtAs₂, and PGMs are extracted from copper–nickel sulfide ores."
    ],
    elementSymbols: ["Ru", "Rh", "Pd", "Os", "Ir", "Pt"],
    testCondition: (el) => ["Ru", "Rh", "Pd", "Os", "Ir", "Pt"].includes(el.symbol)
  },

  precious_metals: {
    id: "precious_metals",
    name: "Precious / Noble Metal Block",
    classificationType: "special_group",
    shortBadge: "Au, Ag, PGMs",
    accentColor: "#a16207",
    oneLineSummary:
      "Silver, gold and the six platinum-group metals — the eight metals prized for rarity, chemical resistance and use in jewellery, coinage, catalysis and electronics.",
    generalElectronicConfig: "Ag/Au 4d¹⁰5s¹ / 5d¹⁰6s¹; PGMs 4d⁷⁻¹⁰ and 5d⁶⁻⁹",
    keyCharacteristics: [
      { title: "Corrosion Resistance", detail: "High atomization energy and high ionization enthalpy keep most acids off them; silver is the exception that tarnishes through sulfur compounds (Ag₂S)." },
      { title: "Best Conductors", detail: "Conductivity order Ag > Cu > Au; gold is chosen where corrosion resistance matters more than cost (contacts, connectors)." },
      { title: "Catalytic and Medical Use", detail: "Ag as an antiseptic and in AgNO₃/photography, Au in chloroauric acid and nanomedicine, Pt in the anticancer drug cisplatin." },
      { title: "Coinage and Reserve", detail: "Ag and Au are the classic coinage and reserve metals; copper is a coinage metal but takes second place because it oxidises readily." }
    ],
    examTrapsAndExceptions: [
      "Silver tarnishes to black Ag₂S and its AgCl precipitate dissolves in NH₄OH — the classic qualitative-analysis distinction.",
      "Gold does not dissolve in HNO₃ or HCl alone; it needs aqua regia, giving [AuCl₄]⁻ — the most frequently asked precious-metal exception.",
      "Cu is a coinage metal but NOT a noble/precious metal: it oxidises to CuO/Cu₂O and dissolves in dilute HNO₃.",
      "Silver's dominant state is +1 even though its configuration is 4d¹⁰5s¹; the single 5s electron is lost easily, unlike copper which prefers +2."
    ],
    periodicTrendFacts: [
      "Nobility increases Pd < Rh < Pt < Au along the sequence, matching the rise in atomization enthalpy and ionization enthalpy.",
      "The 5d congeners are more inert than the 4d ones: silver tarnishes but gold does not, and nickel dissolves in acid while platinum resists it.",
      "Resistance to oxidation rises across each period from Group 8 to Group 11, peaking at platinum and gold."
    ],
    ceeFrequentFacts: [
      "Cyanide process: 4Au + 8NaCN + O₂ + 2H₂O → 4Na[Au(CN)₂] + 4NaOH, followed by zinc displacement (Zn + 2[Au(CN)₂]⁻ → 2Au + Zn(CN)₄²⁻).",
      "Photographic chemistry: 2AgBr → 2Ag + Br₂ on exposure/development, and AgNO₃ + NaCl → AgCl (white, soluble in NH₄OH).",
      "Aqua regia is 3 volumes of HCl to 1 of HNO₃; it dissolves Au, Pt and Pd but leaves Nb, Ta, Ir and Ru largely untouched.",
      "Cisplatin, [Pt(NH₃)₂Cl₂], is the square-planar Pt(II) anticancer drug — the standard example of coordination chemistry in medicine."
    ],
    elementSymbols: ["Ru", "Rh", "Pd", "Ag", "Os", "Ir", "Pt", "Au"],
    testCondition: (el) => ["Ru", "Rh", "Pd", "Ag", "Os", "Ir", "Pt", "Au"].includes(el.symbol)
  },

  refractory_metals: {
    id: "refractory_metals",
    name: "Refractory Metal Block",
    classificationType: "special_group",
    shortBadge: "Ti, Zr, Hf, V, Nb, Ta, Cr, Mo, W, Re",
    accentColor: "#78716c",
    oneLineSummary:
      "The high-melting, hard metals Ti, Zr, Hf, V, Nb, Ta, Cr, Mo, W and Re that resist heat, wear and corrosion and form the superalloys and hard carbides.",
    generalElectronicConfig: "(n-1)d³⁻⁵ ns¹⁻² (d³–d⁵ bonding maximum)",
    keyCharacteristics: [
      { title: "Extreme Melting Points", detail: "W 3422 °C, Re 3186 °C, Ta 3017 °C and Mo 2623 °C — they keep their strength at temperatures where steel would soften." },
      { title: "Hard Carbides and Nitrides", detail: "WC, TiC, TiN and TaC are used for cutting tools and wear-resistant coatings; tungsten carbide approaches diamond in hardness." },
      { title: "Passivating Oxide Films", detail: "Ti, Zr, Hf, Cr and Ta form dense adherent oxide layers that seal the metal off (TiO₂, Cr₂O₃, Ta₂O₅) and give outstanding corrosion resistance." },
      { title: "Superalloy Ingredients", detail: "Nickel- and cobalt-based superalloys use Cr, Mo, W and Re additions for jet engines, gas turbines and high-temperature tooling." }
    ],
    examTrapsAndExceptions: [
      "Chromium resists corrosion only through its self-healing Cr₂O₃ film; film-free chromium metal reacts readily, and Cr dissolves in dilute HCl as Cr²⁺/Cr³⁺.",
      "Titanium survives aqua regia but dissolves in HF because TiF₆²⁻ formation drives the reaction — the CEE-favourite titanium exception.",
      "Zirconium and hafnium are chemically almost identical (lanthanide contraction) and are the hardest commercial pair to separate.",
      "Refractory metals are not all alike in oxide character: MoO₃ and WO₃ are acidic, TiO₂ is amphoteric, while CaO-type basic oxides are irrelevant here."
    ],
    periodicTrendFacts: [
      "Melting point and hardness peak in the middle of each transition series (V, Nb, Ta, W, Re) because metallic bonding is strongest around d³–d⁵.",
      "Atomic radii shrink from 3d to 4d then stay nearly constant from 4d to 5d because of the lanthanide contraction.",
      "Resistance to acid attack rises from Ti to Ta and from Cr to W, following the increase in atomization enthalpy."
    ],
    ceeFrequentFacts: [
      "Tungsten has the highest melting point of any metal (used for incandescent filaments and WC tools); rhenium is second.",
      "Titanium is won by the Kroll process: TiO₂ + C + Cl₂ → TiCl₄, then reduction with magnesium; TiO₂ itself is the white pigment titanium white.",
      "K₂Cr₂O₇ in acid is the standard six-electron oxidant: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O.",
      "Zirconium is used for nuclear fuel cladding and hafnium for control rods because Zr has a very low neutron-absorption cross-section."
    ],
    elementSymbols: ["Ti", "Zr", "Hf", "V", "Nb", "Ta", "Cr", "Mo", "W", "Re"],
    testCondition: (el) => ["Ti", "Zr", "Hf", "V", "Nb", "Ta", "Cr", "Mo", "W", "Re"].includes(el.symbol)
  },

  ferromagnetics: {
    id: "ferromagnetics",
    name: "Ferromagnetic Metal Block",
    classificationType: "special_group",
    shortBadge: "Fe, Co, Ni, Gd, Dy",
    accentColor: "#1f2937",
    oneLineSummary:
      "The five elements ferromagnetic in bulk — Fe, Co and Ni at room temperature, with Gd and Dy joining them below their Curie points — where unpaired spins align spontaneously into domains.",
    generalElectronicConfig: "3d⁶⁻⁸ (Fe, Co, Ni) and 4f⁷/4f¹⁰ (Gd, Dy) with exchange-coupled spins",
    keyCharacteristics: [
      { title: "Spontaneous Domain Alignment", detail: "Exchange forces align whole domains of spins so that a small applied field locks them into strong net magnetisation." },
      { title: "Three Room-Temperature Metals", detail: "Only Fe (Curie 770 °C), Co (1121 °C) and Ni (354 °C) are ferromagnetic at ordinary temperature; Gd and Dy must be cooled." },
      { title: "Hysteresis and Remanence", detail: "Ferromagnets retain magnetism after the field is removed (remanence) and lose it only on heating above the Curie point or by demagnetising fields." },
      { title: "Engineered Magnets", detail: "Alnico, ferrites (Fe₂O₃ with NiO/ZnO) and rare-earth magnets (Nd₂Fe₁₄B) are built on these five elements." }
    ],
    examTrapsAndExceptions: [
      "Ferromagnetism is a bulk cooperative property, not just a spin count: iron metal is ferromagnetic but Fe³⁺ in solution is merely paramagnetic, and manganese is not ferromagnetic at all.",
      "Gd and Dy are ferromagnetic only BELOW their Curie points (Gd about 19 °C), so listing them as ordinary room-temperature ferromagnets is wrong.",
      "Above the Curie temperature the material becomes paramagnetic and follows the Curie–Weiss law χ ∝ 1/(T − θ).",
      "Copper, zinc and aluminium are never ferromagnetic even though Cu²⁺ has an unpaired electron — delocalised metallic electrons behave differently from localised ions."
    ],
    periodicTrendFacts: [
      "Curie temperature tracks the strength of the exchange interaction: Fe 770 °C, Ni 354 °C and Co 1121 °C — cobalt couples most strongly.",
      "Saturation magnetisation follows the number of unpaired 3d spins: Fe (n = 4) > Co (n = 3) > Ni (n = 2).",
      "Ferromagnetic ordering vanishes above the Curie point and the susceptibility then falls as a paramagnet with rising temperature."
    ],
    ceeFrequentFacts: [
      "Relative permeability classifies magnetism: ferromagnetic ≫ 1, paramagnetic slightly > 1, diamagnetic < 1 with negative susceptibility.",
      "Fe₃O₄ (magnetite, lodestone) is the naturally magnetic ore, while Fe₂O₃ is the basis of ferrite magnets.",
      "Soft iron is used for electromagnet cores (high permeability, low remanence) and steel for permanent magnets (high remanence).",
      "Curie point of iron (770 °C) is the standard crossover fact between chemistry and electromagnetism in CEE physics."
    ],
    elementSymbols: ["Fe", "Co", "Ni", "Gd", "Dy"],
    testCondition: (el) => ["Fe", "Co", "Ni", "Gd", "Dy"].includes(el.symbol)
  },

  diamagnetic_metals: {
    id: "diamagnetic_metals",
    name: "Diamagnetic Element Block (Common Metallic)",
    classificationType: "property",
    shortBadge: "Zn, Cd, Hg, Cu, Ag, Au, Pb…",
    accentColor: "#334155",
    oneLineSummary:
      "Cu, Ag, Au, Zn, Cd, Hg and Pb: metals whose common ions carry no unpaired electrons (d¹⁰ or closed shells), so they are weakly repelled by magnets and give colourless or white salts.",
    generalElectronicConfig: "(n-1)d¹⁰ (Cu⁺, Ag⁺, Au⁺, Zn²⁺, Cd²⁺, Hg²⁺) and 6s² closed shell (Pb²⁺)",
    keyCharacteristics: [
      { title: "No Unpaired Electrons", detail: "Every common ion — Cu⁺, Ag⁺, Au⁺, Zn²⁺, Cd²⁺, Hg²⁺ and Pb²⁺ — has a full d-shell or closed shell, giving a zero spin-only moment." },
      { title: "Repelled by Fields", detail: "Susceptibility is small and negative, so the material is pushed toward the weaker field region instead of being attracted." },
      { title: "Colourless Salts", detail: "With no d–d transitions available, Zn²⁺, Cd²⁺, Hg²⁺ and Cu⁺ salts are white or colourless; only Ag(I) darkens on light exposure." },
      { title: "Still Good Conductors", detail: "The filled d-shell does not stop metallic bonding — Cu, Ag and Au remain the three best electrical conductors." }
    ],
    examTrapsAndExceptions: [
      "Copper is diamagnetic as Cu(I) (d¹⁰) but paramagnetic as Cu(II) (d⁹, one unpaired electron) — the same element, opposite magnetism.",
      "Gold(III) is d⁸ and therefore PARAMAGNETIC and coloured (AuCl₄⁻ is yellow); the d¹⁰ rule applies only to Au(I).",
      "Mercury's +1 state is the diamagnetic dimeric Hg₂²⁺ ion with an Hg–Hg bond, not a simple Hg⁺ ion.",
      "Lead's diamagnetism refers to Pb²⁺ (6s²); Pb(IV) is also closed-shell but it is a strong oxidant, not a colourless benign ion."
    ],
    periodicTrendFacts: [
      "Diamagnetic susceptibility stays negative across the whole set and grows only slightly with atomic size — there is no cooperative ordering effect here.",
      "Within Group 11, +1 dominates for Ag and Au (both d¹⁰) while Cu prefers +2 (d⁹), a direct consequence of filled-shell stabilisation.",
      "Melting point falls from Group 11 to Group 12 (Cu 1085 °C → Zn 420 °C) as the d¹⁰s¹ configuration gives way to d¹⁰s², which bonds less strongly."
    ],
    ceeFrequentFacts: [
      "Magnetic-moment order to memorise: ferromagnetic > paramagnetic ≈ √(n(n+2)) BM > diamagnetic (negative χ, repelled).",
      "Zn²⁺ and Cd²⁺ salts are colourless, Cu²⁺ salts blue or green, and Cu⁺ salts white — the d¹⁰ versus d⁹ distinction.",
      "Ag(I) is diamagnetic and gives the white AgCl precipitate that dissolves in NH₄OH and Na₂S₂O₃.",
      "Hg₂Cl₂ (calomel) is diamagnetic and forms the calomel reference electrode (Hg₂Cl₂/Hg in KCl)."
    ],
    elementSymbols: ["Cu", "Ag", "Au", "Zn", "Cd", "Hg", "Pb"],
    testCondition: (el) => ["Cu", "Ag", "Au", "Zn", "Cd", "Hg", "Pb"].includes(el.symbol)
  },

  liquid_at_stp: {
    id: "liquid_at_stp",
    name: "Liquid-State Block (STP)",
    classificationType: "property",
    shortBadge: "Hg, Br₂ (near-mp: Cs, Ga, Fr, Rb)",
    accentColor: "#0369a1",
    oneLineSummary:
      "Mercury and bromine: the only two naturally occurring elements liquid at STP, with caesium, gallium and rubidium only a few degrees above melting.",
    generalElectronicConfig: "Hg 5d¹⁰6s² (metallic) · Br [Ar] 3d¹⁰4s²4p⁵ (molecular Br₂)",
    keyCharacteristics: [
      { title: "Mercury, the Liquid Metal", detail: "5d¹⁰6s² with weak metallic bonding: melts at −38.8 °C, boils at 356.7 °C, density 13.6 g/cm³, and forms amalgams with most metals." },
      { title: "Bromine, the Liquid Non-Metal", detail: "Red-brown volatile diatomic Br₂ whose strong dispersion forces keep it liquid between −7.2 °C and 58.8 °C; its vapour is corrosive to eyes and lungs." },
      { title: "Weak Bonding at Both Extremes", detail: "Mercury's 6s² pair is reluctant to delocalise and Br₂ has only dispersion forces, so both melt far below their neighbours." },
      { title: "Examination Value", detail: "The liquid pair is the deciding fact in 'state at STP' questions and in the 104 solids / 2 liquids / 11 gases summary of the table." }
    ],
    examTrapsAndExceptions: [
      "Caesium (28.5 °C), gallium (29.8 °C), rubidium (39 °C) and francium (about 27 °C) melt close to room temperature but are SOLIDS at STP — a favourite trick.",
      "Francium is far too radioactive (22-minute half-life) and rare ever to be seen as a bulk liquid, despite its low predicted melting point.",
      "Copernicium (Z 112) is predicted to be a liquid or even a gas at STP, but only atoms have ever been produced, so it is not a confirmed STP liquid.",
      "Mercury forms amalgams with gold, silver, tin, sodium and potassium but not with iron, which is why mercury is stored and transported in iron vessels."
    ],
    periodicTrendFacts: [
      "Group 12 metals melt lower down the group (Zn 420 → Cd 321 → Hg −38.8 °C) as the filled d¹⁰s² shells bond more poorly.",
      "Halogen melting points rise down the group (F₂ −220, Cl₂ −101, Br₂ −7.2, I₂ 114 °C) because dispersion forces grow with molecular mass.",
      "Mercury's low melting point stems from relativistic contraction of the 6s orbital, which makes the 6s² pair unusually inert."
    ],
    ceeFrequentFacts: [
      "Mercury is used in thermometers, manometers and the calomel electrode; 1 atmosphere = 760 mm Hg because of its density of 13.6 g/cm³.",
      "Bromine is obtained from seawater and bitterns by displacement with chlorine: 2Br⁻ + Cl₂ → Br₂ + 2Cl⁻.",
      "Bromine water decolourises with alkenes and is the standard test for unsaturation; bromine also displaces iodine from KI (2KI + Br₂ → 2KBr + I₂).",
      "Hg₂Cl₂ is used in the calomel reference electrode, while HgCl₂ (corrosive sublimate) is a deadly poison and a preservative in older laboratories."
    ],
    elementSymbols: ["Hg", "Br", "Cn"],
    testCondition: (el) => el.stateAtSTP === "liquid"
  },

  gas_at_stp: {
    id: "gas_at_stp",
    name: "Gaseous-State Block (STP)",
    classificationType: "property",
    shortBadge: "H, N, O, F, Cl + Noble Gases",
    accentColor: "#0891b2",
    oneLineSummary:
      "The eleven elements that are gases at STP: the diatomic H₂, N₂, O₂, F₂, Cl₂ and the monoatomic noble gases He, Ne, Ar, Kr, Xe and Rn.",
    generalElectronicConfig: "Diatomic molecules (H₂, N₂, O₂, F₂, Cl₂) and monoatomic noble gases (He–Rn)",
    keyCharacteristics: [
      { title: "Two Structural Families", detail: "Five covalently bonded diatomics plus six monoatomic noble gases — the whole set is held together only by weak intermolecular forces." },
      { title: "Why They Are Gases", detail: "Low molar mass with negligible or purely dispersion intermolecular attraction keeps their boiling points far below room temperature." },
      { title: "State Ladder", detail: "Boiling point rises with mass both within a family and across the halogens: F₂ < Cl₂ (gases) → Br₂ (liquid) → I₂ (solid), and He < Ne < Ar < Kr < Xe < Rn." },
      { title: "Chemistry Contrast", detail: "The five diatomics are chemically active (except N₂), while the noble gases are inert until xenon fluoride chemistry begins." }
    ],
    examTrapsAndExceptions: [
      "Bromine is a LIQUID and iodine a SOLID at STP; only F₂ and Cl₂ are gaseous halogens — the commonest state trap.",
      "Ozone O₃ is a gas at STP but is an allotrope of oxygen, not a separate element, so it does not appear in the element list.",
      "Hydrogen has the lowest density of any element (0.0899 g/L at STP) and the lowest boiling point of all substances except helium.",
      "Argon is the most abundant noble gas in air (0.93%), yet helium, which is rare on Earth, is second only to hydrogen in cosmic abundance.",
      "Oganesson (Z 118) is treated as a solid in the live element data, so 'superheavy means gas' is not a safe assumption."
    ],
    periodicTrendFacts: [
      "Down any group, molar mass and dispersion forces rise, so boiling point rises and the heavier members become liquids and solids.",
      "Noble gases have the lowest boiling points in their periods because they are monoatomic with dispersion forces only.",
      "Diatomic gases boil higher than noble gases of comparable mass (O₂ versus Ar) because bonding electrons are more polarisable."
    ],
    ceeFrequentFacts: [
      "Molar volume at STP = 22.4 L, so one mole of any of these gases contains 6.022 × 10²³ molecules.",
      "Ideal-gas equation PV = nRT with R = 0.0821 L·atm·mol⁻¹·K⁻¹ is the standard CEE gas calculation.",
      "Air composition by volume: N₂ 78%, O₂ 21%, Ar 0.93%, CO₂ 0.04% — the reference figures for gas questions.",
      "Noble-gas uses: He for balloons and cryogenics, Ne in discharge lamps, Ar for welding and bulbs, Kr for flashes, Xe for high-intensity lamps."
    ],
    elementSymbols: ["H", "He", "N", "O", "F", "Ne", "Cl", "Ar", "Kr", "Xe", "Rn"],
    testCondition: (el) => el.stateAtSTP === "gas"
  },

  solid_at_stp: {
    id: "solid_at_stp",
    name: "Solid-State Block (STP)",
    classificationType: "property",
    shortBadge: "Metals + Non-Metal Solids",
    accentColor: "#3f6212",
    oneLineSummary:
      "The 104 elements that are solids at STP — everything in the table except the 11 gases and the 2 liquids Hg and Br₂ (with superheavy Cn predicted liquid).",
    generalElectronicConfig: "Metallic, covalent-network or molecular lattices",
    keyCharacteristics: [
      { title: "Three Lattice Types", detail: "Metallic (most metals), covalent network (B, C, Si and SiO₂-type structures) and simple molecular (I₂, S₈, P₄, white phosphorus)." },
      { title: "Bonding Decides Properties", detail: "Metallic solids conduct and are malleable, network solids are hard and insulating, molecular solids are soft with low melting points." },
      { title: "Huge Melting-Point Range", detail: "From the softness of caesium and gallium near room temperature to tungsten at 3422 °C — the widest property span of any state." },
      { title: "Giant versus Simple", detail: "C, Si, B and the heavy metals build giant structures, while I₂, S₈ and P₄ are simple molecular solids held by dispersion forces alone." }
    ],
    examTrapsAndExceptions: [
      "Mercury (metal) and bromine (non-metal) are the two classic STP liquids; caesium (28.5 °C), gallium (29.8 °C) and rubidium (39 °C) are only just above their melting points.",
      "Iodine sublimes rather than showing a normal melt at 1 atm because its vapour pressure is appreciable well below its melting point — the standard 'sublimation' example.",
      "Tin has two solid forms with a transition at 13.2 °C: white tin crumbles to grey tin powder ('tin pest') on prolonged cold storage.",
      "Solid at STP does not mean one crystal form: sulfur, phosphorus, carbon and tin all demonstrate how allotropes change the physical properties of a solid."
    ],
    periodicTrendFacts: [
      "Melting point rises along the d-block to a mid-series maximum then falls, rises down the s-block, and peaks at the network non-metal solids (C, Si, B).",
      "Atomic radius increases down a group while melting point usually falls, except where mid-transition metallic bonding is strongest.",
      "Electrical conduction follows the lattice type: delocalised metallic/covalent-network electrons conduct while localised molecular solids such as I₂ and S₈ do not."
    ],
    ceeFrequentFacts: [
      "State summary of the periodic table: 104 solids, 2 liquids (Hg and Br₂) and 11 gases at STP — a standard one-mark question.",
      "Density order in metals: Os ≈ Ir (22.6) > Pt > Au > W, while lithium (0.53 g/cm³) is the lightest solid element.",
      "Three superlatives asked together: hardest natural solid = diamond, best conductor = silver, highest melting point = tungsten.",
      "Amorphous solids (glass, rubber, plastics) lack a sharp melting point and are cut out of this list because the elements themselves are crystalline."
    ],
    elementSymbols: ["Li", "Be", "B", "C", "Na", "Mg", "Al", "Si", "P", "S", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Tl", "Pb", "Bi", "Po", "At", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"],
    testCondition: (el) => el.stateAtSTP === "solid"
  },

  diatomic_elements: {
    id: "diatomic_elements",
    name: "Diatomic Molecular Element Block",
    classificationType: "property",
    shortBadge: "H₂ N₂ O₂ F₂ Cl₂ Br₂ I₂ (At₂)",
    accentColor: "#4338ca",
    oneLineSummary:
      "The seven diatomic elements — H₂, N₂, O₂, F₂, Cl₂, Br₂ and I₂ — which exist as two-atom molecules because an even electron count is best satisfied by a shared covalent pair.",
    generalElectronicConfig: "Molecular σ/π bonded pairs: H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂",
    keyCharacteristics: [
      { title: "The Seven Members", detail: "H₂, N₂, O₂, F₂, Cl₂, Br₂ and I₂ (with the predicted, extremely short-lived At₂) — no other element occurs naturally as a diatomic molecule." },
      { title: "Bond Orders 1 to 3", detail: "H₂ (single, 436 kJ/mol), O₂ (double, 498 kJ/mol) and N₂ (triple, 945 kJ/mol) show the full range of multiple bonding." },
      { title: "Paramagnetic Oxygen", detail: "O₂ has two unpaired electrons in π* antibonding orbitals, which is why liquid oxygen is attracted to a magnet." },
      { title: "All Three States", detail: "They span the physical states: gases (H₂, N₂, O₂, F₂, Cl₂), liquid (Br₂) and solid (I₂)." }
    ],
    examTrapsAndExceptions: [
      "Ozone O₃ and phosphorus P₄ are NOT diatomic despite being common molecular allotropes — only the seven listed elements qualify.",
      "Oxygen is paramagnetic even with an even number of electrons, a result that valence-bond theory cannot explain and molecular-orbital theory can.",
      "Iodine is a solid but still molecular (I₂); its lattice is held by dispersion forces, not a covalent network.",
      "The F₂ bond is anomalously weak (155 kJ/mol) because of strong lone-pair–lone-pair repulsion in the short molecule, breaking the downward group trend."
    ],
    periodicTrendFacts: [
      "Bond dissociation enthalpy follows bond order and orbital overlap: N₂ (945) > O₂ (498) > H₂ (436) > Cl₂ (243) > Br₂ (193) > F₂ (155) > I₂ (151 kJ/mol).",
      "Bond length increases with atomic size: H₂ 74 pm < N₂ 110 < O₂ 121 < F₂ 142 < Cl₂ 199 < Br₂ 228 < I₂ 267 pm.",
      "Melting and boiling points rise with molar mass, so H₂ and N₂ are the hardest to liquefy and I₂ is the only solid member."
    ],
    ceeFrequentFacts: [
      "Avogadro's law: equal volumes of any of these gases at STP contain equal numbers of molecules, so 22.4 L is one mole.",
      "Bromine is the only liquid diatomic and the only liquid non-metal; iodine sublimes to a violet vapour and gives the starch test.",
      "Hydrogen has the lowest molar mass (2 g/mol), the fastest diffusion (Graham's law) and the highest calorific value per gram of any fuel.",
      "Metal + acid gives H₂, and the classic laboratory preparations are Zn + H₂SO₄ (H₂), MnO₂ + HCl (Cl₂) and KMnO₄ + HCl (Cl₂)."
    ],
    elementSymbols: ["H", "N", "O", "F", "Cl", "Br", "I"],
    testCondition: (el) => ["H", "N", "O", "F", "Cl", "Br", "I"].includes(el.symbol)
  },

  allotropes_block: {
    id: "allotropes_block",
    name: "Allotrope-Rich Element Block",
    classificationType: "property",
    shortBadge: "C, P, S, O, Sn, As, Se, B, Sb, Bi",
    accentColor: "#65a30d",
    oneLineSummary:
      "Allotrope-rich elements — C, P, S, O, Sn, As, Se, B, Sb and Bi — whose atoms can exist in two or more structurally different forms with sharply different physical properties.",
    generalElectronicConfig: "Same atoms, different bonding networks: sp²/sp³ carbon, S₈ rings, P₄ tetrahedra, O₂/O₃",
    keyCharacteristics: [
      { title: "Structural Origin", detail: "The same atoms bond differently: diamond versus graphite, white versus red phosphorus, rhombic versus monoclinic sulfur, O₂ versus O₃." },
      { title: "Property Swing", detail: "Diamond is the hardest insulator while graphite is a soft conductor; white phosphorus ignites near 30 °C while red phosphorus is stable to about 260 °C." },
      { title: "Stable versus Metastable", detail: "Usually one form is thermodynamically stable at 298 K (graphite, rhombic sulfur, grey arsenic) while the other is the reactive metastable form." },
      { title: "Switching Conditions", detail: "Specific temperatures and pressures change the form: rhombic sulfur becomes monoclinic above 95.6 °C and white phosphorus becomes red on heating in an inert atmosphere." }
    ],
    examTrapsAndExceptions: [
      "Graphite is more stable than diamond at 298 K (ΔH°f of diamond = +1.9 kJ/mol); the conversion is simply too slow to observe in practice.",
      "Ozone is an allotrope of oxygen, not a separate element, and its bent 117° structure and stronger oxidising power must be treated as oxygen chemistry.",
      "Grey tin (α-Sn) is semiconducting and only stable below 13.2 °C, where white tin converts to brittle powder — the tin-pest example.",
      "Rhombic sulfur melts at 112.8 °C, but above about 160 °C the yellow liquid darkens and becomes viscous as the S₈ rings polymerise into long chains."
    ],
    periodicTrendFacts: [
      "High pressure and temperature favour the denser allotrope — graphite converts to diamond only near 1500 °C and about 50 kbar.",
      "Metals in this set (Sn, Sb, Bi) show metallic forms that gain semiconducting or amorphous character when cooled or rapidly solidified.",
      "Within each element the most symmetric, densely bonded allotrope is the most inert and the least ordered form the most reactive."
    ],
    ceeFrequentFacts: [
      "White phosphorus is a tetrahedral P₄ molecule with 60° bond angles and is extremely reactive and toxic; red phosphorus is a polymer and non-toxic.",
      "Rhombic sulfur (S₈ puckered rings, stable below 95.6 °C) versus monoclinic sulfur (needles, stable above) is the standard NEB/CEE allotrope pair.",
      "Ozone is made in the laboratory by silent electric discharge in oxygen and both filters UV radiation and disinfects water in industry.",
      "Carbon allotropes at a glance: diamond (insulator, hardest), graphite (in-plane conductor, lubricant), graphene and nanotubes (excellent conductors)."
    ],
    elementSymbols: ["C", "P", "S", "O", "Sn", "As", "Se", "B", "Sb", "Bi"],
    testCondition: (el) => ["C", "P", "S", "O", "Sn", "As", "Se", "B", "Sb", "Bi"].includes(el.symbol)
  },

  amphoteric_block: {
    id: "amphoteric_block",
    name: "Amphoteric Oxide / Hydroxide Block",
    classificationType: "property",
    shortBadge: "Be, Al, Ga, Sn, Pb, Zn, As, Sb, Bi oxides/hydroxides",
    accentColor: "#be185d",
    oneLineSummary:
      "Elements whose oxides or hydroxides react with BOTH acids and alkalis — Be, Al, Ga, Sn, Pb, Zn, As, Sb and Bi, the classic amphoteric exam set.",
    generalElectronicConfig: "Oxides BeO, Al₂O₃, Ga₂O₃, ZnO, SnO, SnO₂, PbO, PbO₂, As₂O₃, Sb₂O₃, Bi₂O₃",
    keyCharacteristics: [
      { title: "Two-Way Reaction", detail: "ZnO + 2HCl → ZnCl₂ + H₂O (as a base) and ZnO + 2NaOH → Na₂ZnO₂ + H₂O (as an acid) — the same oxide behaving both ways." },
      { title: "Where Amphoterism Appears", detail: "It clusters at the metal/non-metal boundary: small covalent-potential metals (Be, Al), the filled d¹⁰ ion Zn²⁺, and the heavier p-block metals." },
      { title: "Hydroxide Forms", detail: "Zn(OH)₂, Al(OH)₃, Be(OH)₂ and Sn(OH)₂ dissolve in excess NaOH to give zincate, aluminate, beryllate and stannite ions." },
      { title: "Industrial Consequence", detail: "Al₂O₃ serves as both an acidic and a basic catalyst support, and ZnO is used in ointments, paints and semiconductor devices." }
    ],
    examTrapsAndExceptions: [
      "Be(OH)₂ is amphoteric but Mg(OH)₂ is purely basic — the beryllium/magnesium break is the classic Group 2 trap.",
      "Aluminium dissolves in NaOH with hydrogen evolution (2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂) while iron and copper do not, which is used as the amphoteric-metal test.",
      "PbO₂ is not simply amphoteric: it is a strong OXIDISING agent, whereas PbO is the amphoteric and basic oxide.",
      "B(OH)₃ is a weak monobasic Lewis acid (it accepts OH⁻) and is not amphoteric even though boron sits directly above aluminium."
    ],
    periodicTrendFacts: [
      "Amphoterism peaks at the metalloid boundary: acidic oxides on the right (CO₂, SO₂) become amphoteric (Al₂O₃, ZnO, SnO) then basic (Na₂O, MgO, Bi₂O₃) to the left.",
      "Down Groups 13 to 15 the oxides swing from acidic (B₂O₃, CO₂, N₂O₅) to amphoteric (Al₂O₃, SnO₂, Sb₂O₃) to basic (Tl₂O, PbO, Bi₂O₃).",
      "Solubility in excess alkali falls from Zn and Al to Bi as the basic character of the oxide takes over."
    ],
    ceeFrequentFacts: [
      "The two equations CEE asks most are ZnO + 2NaOH → Na₂ZnO₂ + H₂O and Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O.",
      "Amphoteric metals evolve H₂ with BOTH acid and alkali, unlike the s-block metals which react only with water or acid.",
      "Aluminium cookware must never be cleaned with strong alkali because the amphoteric reaction corrodes the metal.",
      "ZnO is white when cold and yellow when hot, a reversible colour change caused by a small change in the oxide's defect/band structure."
    ],
    elementSymbols: ["Be", "Al", "Ga", "Sn", "Pb", "Zn", "As", "Sb", "Bi"],
    testCondition: (el) => ["Be", "Al", "Ga", "Sn", "Pb", "Zn", "As", "Sb", "Bi"].includes(el.symbol)
  },

  cee_high_yield_block: {
    id: "cee_high_yield_block",
    name: "CEE High-Yield Core Reference Block",
    classificationType: "special_group",
    shortBadge: "CEE Must-Know (H–Rn)",
    accentColor: "#d97706",
    oneLineSummary:
      "The 33 elements that carry the overwhelming majority of CEE/NEB chemistry questions — the H-to-Rn core non-metals plus the workhorse s-, d- and heavy metals.",
    generalElectronicConfig: "Mixed: 1s¹ to 7s² across the core course (H–U)",
    keyCharacteristics: [
      { title: "What Is Inside", detail: "Every core non-metal (H, B, C, N, O, F, P, S, Cl, Br, I) plus the exam-critical metals Na, Mg, Al, K, Ca, Cr, Mn, Fe, Co, Ni, Cu, Zn, Ag, Sn, Ba, Au, Hg, Pb and U." },
      { title: "Why These Elements", detail: "They supply the standard equations (Haber, Contact, thermite, redox titrations), the named reactions and nearly all numerical calculations in CEE chemistry." },
      { title: "Coverage Strategy", detail: "Master this set together with the s/p/d/f block definitions and classification questions from recent papers are fully covered." },
      { title: "Dossier-Backed", detail: "These are the elements that carry full CEE dossiers (ores, hallmark reactions, past MCQs) in the app, so the block doubles as the revision spine." }
    ],
    examTrapsAndExceptions: [
      "Uranium appears only as the radioactive representative — do not over-invest in it at the cost of the Cr/Mn/Fe redox equations that dominate the paper.",
      "Silver and gold are included for coinage and noble-metal questions, but copper is the metal you must know most deeply (redox, complexes, alloys).",
      "Tin is present for alloy, amphoteric and solder questions, not for a full metallurgy treatment — treating all 33 as equally weighted is a mistake.",
      "B, Si and Be are the small-size anomalies in the list, each with distinctive chemistry: covalent boron, network silicon and amphoteric beryllium."
    ],
    periodicTrendFacts: [
      "CEE weighting follows periodic position: the s-block, the 3d metals and the halogens dominate, while the f-block is limited to a handful of facts.",
      "Most questions are set exactly where trends break, so each element in this block should be learned together with its own anomaly.",
      "Oxidation-state questions cluster where the maximum state stops rising, that is at Mn (+7), Cr (+6) and the halogen oxoacids."
    ],
    ceeFrequentFacts: [
      "Haber: N₂ + 3H₂ ⇌ 2NH₃ (Fe, 400–500 °C, 200 atm); Contact: 2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅, 400–450 °C, 1–2 atm).",
      "Redox titrants: KMnO₄ in acid (MnO₄⁻/Mn²⁺, 5 electrons) and K₂Cr₂O₇ in acid (Cr₂O₇²⁻/Cr³⁺, 6 electrons).",
      "Thermite: Fe₂O₃ + 2Al → 2Fe + Al₂O₃; named compounds to know include alum, washing soda, bleaching powder and Plaster of Paris.",
      "Qualitative analysis: Na golden-yellow flame, K lilac, Cu²⁺ blue, Fe²⁺ pale green, Fe³⁺ yellow-brown, NH₄⁺ gives NH₃ with NaOH.",
      "Periodic superlatives: smallest atom H, highest electronegativity F (4.0), highest melting metal W, best conductor Ag, densest metal Os/Ir."
    ],
    elementSymbols: ["H", "Li", "Be", "B", "C", "N", "O", "F", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ca", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Br", "Ag", "Sn", "I", "Ba", "Au", "Hg", "Pb", "U"],
    testCondition: (el) => ["H", "Li", "Be", "B", "C", "N", "O", "F", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ca", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Br", "Ag", "Sn", "I", "Ba", "Au", "Hg", "Pb", "U"].includes(el.symbol)
  },

  cee_ore_and_industry_block: {
    id: "cee_ore_and_industry_block",
    name: "CEE Ore-Metallurgy / Industrial Metal Block",
    classificationType: "special_group",
    shortBadge: "Fe, Cu, Zn, Al, Ag, Au, Pb, Cr, Ni, Sn, Mg, Na, K, Ca, Ti, W, Pt, U",
    accentColor: "#92400e",
    oneLineSummary:
      "The 18 metals with named ores, extraction processes and industrial uses that CEE examines — from Bayer/Hall–Héroult aluminium to the cyanide gold process.",
    generalElectronicConfig: "s-block (Na, K, Ca, Mg), d-block (Fe, Cu, Zn, Cr, Ni, Ti, W, Pt) and p-block (Al, Sn, Pb), plus Ag, Au and U",
    keyCharacteristics: [
      { title: "Named Ores", detail: "Fe: haematite Fe₂O₃ and magnetite Fe₃O₄; Al: bauxite Al₂O₃·2H₂O; Cu: copper pyrites CuFeS₂ and cuprite Cu₂O; Zn: zinc blende ZnS and calamine ZnCO₃." },
      { title: "Extraction Routes", detail: "Al by electrolysis in molten cryolite, Fe in the blast furnace, Cu by roasting and self-reduction, Ti by the Kroll process, Na by the Downs cell." },
      { title: "Metallurgy Vocabulary", detail: "Calcination (carbonate to oxide), roasting (sulfide to oxide), reduction by C, CO, H₂, Al or electrolysis, and refining by electrolysis or poling." },
      { title: "Industrial Compounds", detail: "NaOH and Na₂CO₃ by Solvay, K in fertilisers, Ca in lime and cement, Mg for Grignard reagents and alloys, W for filaments, Pt for catalysts." }
    ],
    examTrapsAndExceptions: [
      "Bauxite is purified by the Bayer process (NaOH digestion) FIRST, and only then is pure Al₂O₃ dissolved in molten cryolite — the two stages are routinely confused.",
      "Copper matte is finished by self-reduction (Cu₂S + 2Cu₂O → 6Cu + SO₂); iron is not used to reduce the final copper.",
      "In the blast furnace CO reduces the ore in the upper stack while carbon acts directly in the hotter zone, and limestone removes silica as CaSiO₃ slag.",
      "Sodium is extracted from MOLTEN NaCl (Downs cell); electrolysis of aqueous brine would liberate hydrogen at the cathode instead of sodium."
    ],
    periodicTrendFacts: [
      "The more electropositive the metal, the harder it is to win: K/Na/Ca by molten electrolysis, Al by electrolysis in flux, Fe/Zn by carbon reduction, Cu/Hg by roasting and Ag/Au native or by cyanide.",
      "The electrochemical series decides the reducing agent: metals above carbon need electrolysis, those below can be reduced by carbon or carbon monoxide.",
      "Ore type follows chemistry: sulfide ores dominate Cu, Zn, Pb and Ni, oxide ores Fe and Al, and the precious metals occur native because they resist oxidation."
    ],
    ceeFrequentFacts: [
      "Iron: haematite (Fe₂O₃, 60–70% Fe) is the main ore; the blast-furnace charge is ore + coke + limestone with hot air blast.",
      "Aluminium: the Hall–Héroult cell uses cryolite to lower the working temperature from 2072 °C to about 1000 °C, and the carbon anodes are consumed.",
      "Copper: the Bessemer converter turns matte into blister copper, and 99.9% pure copper for electrical use comes from electrolytic refining.",
      "Zinc: zinc blende ZnS is roasted to ZnO then reduced with coke, or extracted by electrolysis of ZnSO₄; zinc is used for galvanising.",
      "Silver and gold: cyanide leaching with zinc displacement (MacArthur–Forrest process), then refining by the Miller or Wohlwill method."
    ],
    elementSymbols: ["Fe", "Cu", "Zn", "Al", "Ag", "Au", "Pb", "Cr", "Ni", "Sn", "Mg", "Na", "K", "Ca", "Ti", "W", "Pt", "U"],
    testCondition: (el) => ["Fe", "Cu", "Zn", "Al", "Ag", "Au", "Pb", "Cr", "Ni", "Sn", "Mg", "Na", "K", "Ca", "Ti", "W", "Pt", "U"].includes(el.symbol)
  },

  cee_exam_exception_block: {
    id: "cee_exam_exception_block",
    name: "CEE Exam Exception / Trap Element Block",
    classificationType: "special_group",
    shortBadge: "Cr, Cu, Mo, Ag, Au, Hg, Zn, N, O, Cl, Br, Pb, Bi",
    accentColor: "#7f1d1d",
    oneLineSummary:
      "The 13 anomaly carriers — elements whose textbook exceptions supply a disproportionate share of CEE trick questions, from half-filled shells to inert pairs and odd-electron molecules.",
    generalElectronicConfig: "Cr 3d⁵4s¹, Cu 3d¹⁰4s¹, Mo 4d⁵5s¹, Ag 4d¹⁰5s¹, Au 5d¹⁰6s¹ with inert-pair N, O, Cl, Br, Pb, Bi and d¹⁰ Zn/Hg",
    keyCharacteristics: [
      { title: "Configuration Anomalies", detail: "Cr [Ar]3d⁵4s¹, Cu [Ar]3d¹⁰4s¹, Mo [Kr]4d⁵5s¹ and Ag [Kr]4d¹⁰5s¹ all borrow from the ns orbital, driven by half-filled/fully-filled d-shell stabilisation." },
      { title: "Inert-Pair Carriers", detail: "Hg (6s²), Pb (Pb²⁺ versus Pb⁴⁺) and Bi (Bi³⁺ versus Bi⁵⁺) show the lower oxidation state strengthening down the group." },
      { title: "Odd and Unusual Molecules", detail: "N gives NO, NO₂ and N₂O; O gives paramagnetic O₂ and bent O₃; F₂ breaks the halogen bond-energy trend and Cl breaks the electron-gain trend." },
      { title: "Redox Oddities", detail: "Zn²⁺ is colourless and diamagnetic despite d-block membership, and Cu⁺ disproportionates in water while Ag⁺ is the stable closed-shell ion." }
    ],
    examTrapsAndExceptions: [
      "Cr²⁺ (3d⁴) is a strong reducing agent that is easily oxidised to Cr³⁺ (3d³): the relative stability of the two chromium states is a favourite MCQ.",
      "2Cu⁺ → Cu + Cu²⁺ in water because the hydration energy of Cu²⁺ favours the +2 state, yet CuI and Cu₂S keep copper as stable Cu(I) in the solid state.",
      "Zn, Cd and Hg form (n-1)d¹⁰ns² ions that are colourless and diamagnetic, which is exactly why they are not 'typical' transition metals.",
      "Sodium bismuthate oxidises Mn²⁺ to the violet MnO₄⁻ and PbO₂ is likewise strongly oxidising — the high states of Bi and Pb are oxidants, not passive ions."
    ],
    periodicTrendFacts: [
      "Half-filled (d⁵) and fully-filled (d¹⁰) configurations explain almost every anomaly here, so checking the configuration first usually names the exception.",
      "The inert-pair effect strengthens down each p-block group, pushing the stable state from +3/+5 (N, P, As) toward +3 (Bi) and +2 (Pb).",
      "The anomalies cluster where the electrochemical series and the periodic trend disagree, which is precisely where examiners set their trick questions."
    ],
    ceeFrequentFacts: [
      "Write the anomalous configurations on sight: Cr [Ar]3d⁵4s¹, Cu [Ar]3d¹⁰4s¹, Mo [Kr]4d⁵5s¹, Ag [Kr]4d¹⁰5s¹.",
      "Copper potentials: E°(Cu²⁺/Cu) = +0.34 V and E°(Cu⁺/Cu) = +0.52 V, giving E°(Cu²⁺/Cu⁺) = +0.15 V, which is why Cu(I) disproportionates.",
      "NO₂ is the brown paramagnetic gas while N₂O₄ is the colourless dimer; N₂O is colourless and supports combustion like O₂.",
      "Silver nitrate darkens in sunlight to silver metal; gold needs aqua regia; mercury with chlorine gives HgCl₂, the corrosive sublimate."
    ],
    elementSymbols: ["Cr", "Cu", "Mo", "Ag", "Au", "Hg", "Zn", "N", "O", "Cl", "Br", "Pb", "Bi"],
    testCondition: (el) => ["Cr", "Cu", "Mo", "Ag", "Au", "Hg", "Zn", "N", "O", "Cl", "Br", "Pb", "Bi"].includes(el.symbol)
  }
};
