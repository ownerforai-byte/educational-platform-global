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
      { title: "Higher Hardness", detail: "Harder, denser, and higher melting points than alkali metals due to two bonding electrons per atom in the metallic lattice." }
    ],
    examTrapsAndExceptions: [
      "Be and Mg show NO Bunsen flame coloration because electrons are held too tightly to be excited in Bunsen burner temperatures.",
      "Beryllium chloride (BeCl₂) exists as a chloro-bridged polymer in the solid state and a linear dimer in vapor phase."
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
      { title: "Oxidizing Power", detail: "Decreases down the group: F₂ > Cl₂ > Br₂ > I₂. Fluorine oxidizes water to Oxygen (2F₂ + 2H₂O → 4HF + O₂)." }
    ],
    examTrapsAndExceptions: [
      "Electron affinity anomaly: Cl (-349 kJ/mol) > F (-328 kJ/mol) > Br (-325 kJ/mol) > I (-295 kJ/mol).",
      "Bond dissociation enthalpy order: Cl₂ > Br₂ > F₂ > I₂. F₂ has weaker bond energy than Cl₂ and Br₂ due to lone pair-lone pair repulsion."
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
    elementSymbols: ["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"],
    testCondition: (el) => el.group === 18
  },

  chalcogens: {
    id: "chalcogens",
    name: "Chalcogens (Group 16)",
    classificationType: "family",
    shortBadge: "Group 16 (O–Lv)",
    accentColor: "#059669",
    oneLineSummary: "",
    generalElectronicConfig: "ns² np⁴",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["O", "S", "Se", "Te", "Po", "Lv"],
    testCondition: (el) => el.group === 16
  },

  pnictogens: {
    id: "pnictogens",
    name: "Pnictogens (Group 15)",
    classificationType: "family",
    shortBadge: "Group 15 (N–Mc)",
    accentColor: "#7c3aed",
    oneLineSummary: "",
    generalElectronicConfig: "ns² np³",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["N", "P", "As", "Sb", "Bi", "Mc"],
    testCondition: (el) => el.group === 15
  },

  carbon_group: {
    id: "carbon_group",
    name: "Carbon / Tetrel Group (Group 14)",
    classificationType: "family",
    shortBadge: "Group 14 (C–Fl)",
    accentColor: "#475569",
    oneLineSummary: "",
    generalElectronicConfig: "ns² np²",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["C", "Si", "Ge", "Sn", "Pb", "Fl"],
    testCondition: (el) => el.group === 14
  },

  boron_group: {
    id: "boron_group",
    name: "Boron / Icosagen Group (Group 13)",
    classificationType: "family",
    shortBadge: "Group 13 (B–Nh)",
    accentColor: "#b45309",
    oneLineSummary: "",
    generalElectronicConfig: "ns² np¹",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["B", "Al", "Ga", "In", "Tl", "Nh"],
    testCondition: (el) => el.group === 13
  },

  alkaline_metals_cee: {
    id: "alkaline_metals_cee",
    name: "CEE Alkaline + Alkali Combined Reference Block",
    classificationType: "family",
    shortBadge: "CEE s-Block Families",
    accentColor: "#b91c1c",
    oneLineSummary: "",
    generalElectronicConfig: "ns¹ + ns²",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
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
    oneLineSummary: "",
    generalElectronicConfig: "ns² np¹⁻³ · (n-1)d¹⁰",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
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
    oneLineSummary: "",
    generalElectronicConfig: "1s¹ / ns² np¹⁻⁵",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
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
    oneLineSummary: "",
    generalElectronicConfig: "1s² / ns² np⁶",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"],
    testCondition: (el) => el.group === 18
  },

  radioactive_elements: {
    id: "radioactive_elements",
    name: "Radioactive Element Block",
    classificationType: "special_group",
    shortBadge: "Radioactive Z ≥ 84 + Tc, Pm",
    accentColor: "#dc2626",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
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
    oneLineSummary: "",
    generalElectronicConfig: "[Xe] 4f¹⁻¹⁴ 5d⁰⁻¹ 6s²",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu"],
    testCondition: (el) => el.atomicNumber >= 58 && el.atomicNumber <= 71
  },

  actinide_block: {
    id: "actinide_block",
    name: "Actinide Series Block",
    classificationType: "family",
    shortBadge: "5f Series (Z 90–103)",
    accentColor: "#be123c",
    oneLineSummary: "",
    generalElectronicConfig: "[Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s²",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr"],
    testCondition: (el) => el.atomicNumber >= 90 && el.atomicNumber <= 103
  },

  transition_metals_3d: {
    id: "transition_metals_3d",
    name: "3d Transition Series (First Row)",
    classificationType: "family",
    shortBadge: "3d (Z 21–30)",
    accentColor: "#ea580c",
    oneLineSummary: "",
    generalElectronicConfig: "[Ar] 3d¹⁻¹⁰ 4s¹⁻²",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn"],
    testCondition: (el) => el.atomicNumber >= 21 && el.atomicNumber <= 30
  },

  transition_metals_4d: {
    id: "transition_metals_4d",
    name: "4d Transition Series (Second Row)",
    classificationType: "family",
    shortBadge: "4d (Z 39–48)",
    accentColor: "#c2410c",
    oneLineSummary: "",
    generalElectronicConfig: "[Kr] 4d¹⁻¹⁰ 5s⁰⁻²",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd"],
    testCondition: (el) => el.atomicNumber >= 39 && el.atomicNumber <= 48
  },

  transition_metals_5d: {
    id: "transition_metals_5d",
    name: "5d Transition Series (Third Row)",
    classificationType: "family",
    shortBadge: "5d (Z 72–80 + La)",
    accentColor: "#9a3412",
    oneLineSummary: "",
    generalElectronicConfig: "[Xe] 4f¹⁴ 5d¹⁻¹⁰ 6s²",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["La", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg"],
    testCondition: (el) => el.atomicNumber === 57 || (el.atomicNumber >= 72 && el.atomicNumber <= 80)
  },

  platinum_group_metals: {
    id: "platinum_group_metals",
    name: "Platinum-Group Metals (PGMs)",
    classificationType: "special_group",
    shortBadge: "Ru, Rh, Pd, Os, Ir, Pt",
    accentColor: "#64748b",
    oneLineSummary: "",
    generalElectronicConfig: "4d⁷⁻¹⁰ 5s⁰⁻¹ / 5d⁶⁻⁹ 6s¹⁻²",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Ru", "Rh", "Pd", "Os", "Ir", "Pt"],
    testCondition: (el) => ["Ru", "Rh", "Pd", "Os", "Ir", "Pt"].includes(el.symbol)
  },

  precious_metals: {
    id: "precious_metals",
    name: "Precious / Noble Metal Block",
    classificationType: "special_group",
    shortBadge: "Au, Ag, PGMs",
    accentColor: "#a16207",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Ru", "Rh", "Pd", "Ag", "Os", "Ir", "Pt", "Au"],
    testCondition: (el) => ["Ru", "Rh", "Pd", "Ag", "Os", "Ir", "Pt", "Au"].includes(el.symbol)
  },

  refractory_metals: {
    id: "refractory_metals",
    name: "Refractory Metal Block",
    classificationType: "special_group",
    shortBadge: "Ti, Zr, Hf, V, Nb, Ta, Cr, Mo, W, Re",
    accentColor: "#78716c",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Ti", "Zr", "Hf", "V", "Nb", "Ta", "Cr", "Mo", "W", "Re"],
    testCondition: (el) => ["Ti", "Zr", "Hf", "V", "Nb", "Ta", "Cr", "Mo", "W", "Re"].includes(el.symbol)
  },

  ferromagnetics: {
    id: "ferromagnetics",
    name: "Ferromagnetic Metal Block",
    classificationType: "special_group",
    shortBadge: "Fe, Co, Ni, Gd, Dy",
    accentColor: "#1f2937",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Fe", "Co", "Ni", "Gd", "Dy"],
    testCondition: (el) => ["Fe", "Co", "Ni", "Gd", "Dy"].includes(el.symbol)
  },

  diamagnetic_metals: {
    id: "diamagnetic_metals",
    name: "Diamagnetic Element Block (Common Metallic)",
    classificationType: "property",
    shortBadge: "Zn, Cd, Hg, Cu, Ag, Au, Pb…",
    accentColor: "#334155",
    oneLineSummary: "",
    generalElectronicConfig: "d¹⁰ / full valence shell",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Cu", "Ag", "Au", "Zn", "Cd", "Hg", "Pb"],
    testCondition: (el) => ["Cu", "Ag", "Au", "Zn", "Cd", "Hg", "Pb"].includes(el.symbol)
  },

  liquid_at_stp: {
    id: "liquid_at_stp",
    name: "Liquid-State Block (STP)",
    classificationType: "property",
    shortBadge: "Hg, Br₂ (near-mp: Cs, Ga, Fr, Rb)",
    accentColor: "#0369a1",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Hg", "Br"],
    testCondition: (el) => el.stateAtSTP === "liquid"
  },

  gas_at_stp: {
    id: "gas_at_stp",
    name: "Gaseous-State Block (STP)",
    classificationType: "property",
    shortBadge: "H, N, O, F, Cl + Noble Gases",
    accentColor: "#0891b2",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["H", "He", "N", "O", "F", "Ne", "Cl", "Ar", "Kr", "Xe", "Rn", "Og"],
    testCondition: (el) => el.stateAtSTP === "gas"
  },

  solid_at_stp: {
    id: "solid_at_stp",
    name: "Solid-State Block (STP)",
    classificationType: "property",
    shortBadge: "Metals + Non-Metal Solids",
    accentColor: "#3f6212",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: [],
    testCondition: (el) => el.stateAtSTP === "solid"
  },

  diatomic_elements: {
    id: "diatomic_elements",
    name: "Diatomic Molecular Element Block",
    classificationType: "property",
    shortBadge: "H₂ N₂ O₂ F₂ Cl₂ Br₂ I₂ (At₂)",
    accentColor: "#4338ca",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["H", "N", "O", "F", "Cl", "Br", "I"],
    testCondition: (el) => ["H", "N", "O", "F", "Cl", "Br", "I"].includes(el.symbol)
  },

  allotropes_block: {
    id: "allotropes_block",
    name: "Allotrope-Rich Element Block",
    classificationType: "property",
    shortBadge: "C, P, S, O, Sn, As, Se, B, Sb, Bi",
    accentColor: "#65a30d",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["C", "P", "S", "O", "Sn", "As", "Se", "B", "Sb", "Bi"],
    testCondition: (el) => ["C", "P", "S", "O", "Sn", "As", "Se", "B", "Sb", "Bi"].includes(el.symbol)
  },

  amphoteric_block: {
    id: "amphoteric_block",
    name: "Amphoteric Oxide / Hydroxide Block",
    classificationType: "property",
    shortBadge: "Be, Al, Ga, Sn, Pb, Zn, As, Sb, Bi oxides/hydroxides",
    accentColor: "#be185d",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Be", "Al", "Ga", "Sn", "Pb", "Zn", "As", "Sb", "Bi"],
    testCondition: (el) => ["Be", "Al", "Ga", "Sn", "Pb", "Zn", "As", "Sb", "Bi"].includes(el.symbol)
  },

  cee_high_yield_block: {
    id: "cee_high_yield_block",
    name: "CEE High-Yield Core Reference Block",
    classificationType: "special_group",
    shortBadge: "CEE Must-Know (H–Rn)",
    accentColor: "#d97706",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["H", "Li", "Be", "B", "C", "N", "O", "F", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ca", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Br", "Ag", "Sn", "I", "Ba", "Au", "Hg", "Pb", "U"],
    testCondition: (el) => ["H", "Li", "Be", "B", "C", "N", "O", "F", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ca", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Br", "Ag", "Sn", "I", "Ba", "Au", "Hg", "Pb", "U"].includes(el.symbol)
  },

  cee_ore_and_industry_block: {
    id: "cee_ore_and_industry_block",
    name: "CEE Ore-Metallurgy / Industrial Metal Block",
    classificationType: "special_group",
    shortBadge: "Fe, Cu, Zn, Al, Ag, Au, Pb, Cr, Ni, Sn, Mg, Na, K, Ca, Ti, W, Pt, U",
    accentColor: "#92400e",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Fe", "Cu", "Zn", "Al", "Ag", "Au", "Pb", "Cr", "Ni", "Sn", "Mg", "Na", "K", "Ca", "Ti", "W", "Pt", "U"],
    testCondition: (el) => ["Fe", "Cu", "Zn", "Al", "Ag", "Au", "Pb", "Cr", "Ni", "Sn", "Mg", "Na", "K", "Ca", "Ti", "W", "Pt", "U"].includes(el.symbol)
  },

  cee_exam_exception_block: {
    id: "cee_exam_exception_block",
    name: "CEE Exam Exception / Trap Element Block",
    classificationType: "special_group",
    shortBadge: "Cr, Cu, Mo, Ag, Au, Hg, Zn, N, O, Cl, Br, Pb, Bi",
    accentColor: "#7f1d1d",
    oneLineSummary: "",
    generalElectronicConfig: "",
    keyCharacteristics: [],
    examTrapsAndExceptions: [],
    elementSymbols: ["Cr", "Cu", "Mo", "Ag", "Au", "Hg", "Zn", "N", "O", "Cl", "Br", "Pb", "Bi"],
    testCondition: (el) => ["Cr", "Cu", "Mo", "Ag", "Au", "Hg", "Zn", "N", "O", "Cl", "Br", "Pb", "Bi"].includes(el.symbol)
  }
};
