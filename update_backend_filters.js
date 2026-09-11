import fs from 'fs';

const elements = JSON.parse(fs.readFileSync('all_elements.json', 'utf-8'));

const tsCode = `/**
 * Complete 118 Periodic Table Elements & High-Yield Classification Filters
 * Engineered for NEB Class 11 & 12 Chemistry Syllabus
 */

export interface FilterCharacteristic {
  title: string;
  detail: string;
}

export interface PeriodicFilterCategory {
  id: string;
  name: string;
  classificationType: "nature" | "block" | "special_group" | "family";
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
  highYieldNote: string;
}

export const PERIODIC_ELEMENTS: PeriodicElement[] = ${JSON.stringify(elements, null, 2)};

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
    elementSymbols: ${JSON.stringify(elements.filter(e => e.category === 'metal').map(e => e.symbol))},
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
    elementSymbols: ${JSON.stringify(elements.filter(e => e.category === 'nonmetal').map(e => e.symbol))},
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
    name: "s-Block Elements (Groups 1 & 2)",
    classificationType: "block",
    shortBadge: "Alkali & Alkaline Earth",
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
    elementSymbols: ${JSON.stringify(elements.filter(e => e.block === 's').map(e => e.symbol))},
    testCondition: (el) => el.block === "s"
  },

  p_block: {
    id: "p_block",
    name: "p-Block Elements (Groups 13–18)",
    classificationType: "block",
    shortBadge: "Main Group 13–18",
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
    elementSymbols: ${JSON.stringify(elements.filter(e => e.block === 'p').map(e => e.symbol))},
    testCondition: (el) => el.block === "p"
  },

  d_block: {
    id: "d_block",
    name: "d-Block Elements (Transition Metals)",
    classificationType: "block",
    shortBadge: "Groups 3–12",
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
    elementSymbols: ${JSON.stringify(elements.filter(e => e.block === 'd').map(e => e.symbol))},
    testCondition: (el) => el.block === "d"
  },

  f_block: {
    id: "f_block",
    name: "f-Block Elements (Inner Transition Metals)",
    classificationType: "block",
    shortBadge: "Lanthanides & Actinides",
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
    elementSymbols: ${JSON.stringify(elements.filter(e => e.block === 'f').map(e => e.symbol))},
    testCondition: (el) => el.block === "f"
  },

  alkali_metals: {
    id: "alkali_metals",
    name: "Alkali Metals (Group 1 / IA)",
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
    name: "Alkaline Earth Metals (Group 2 / IIA)",
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
    name: "Halogens (Group 17 / VIIA)",
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
      "Bond dissociation enthalpy anomaly: Cl-Cl (242 kJ/mol) > Br-Br (192) > F-F (158) > I-I (151 kJ/mol) due to lone-pair repulsion in compact F₂."
    ],
    elementSymbols: ["F", "Cl", "Br", "I", "At", "Ts"],
    testCondition: (el) => el.group === 17
  },

  noble_gases: {
    id: "noble_gases",
    name: "Noble Gases (Group 18 / VIIIA)",
    classificationType: "family",
    shortBadge: "Group 18 (He–Og)",
    accentColor: "#8b5cf6",
    oneLineSummary: "Monatomic inert gases with completed valence octets (1s² for He, ns² np⁶ for others), possessing highest ionization energies in each period.",
    generalElectronicConfig: "ns² np⁶ (He: 1s²)",
    keyCharacteristics: [
      { title: "Chemical Inertness", detail: "Extremely high ionization energies and positive electron gain enthalpies create near-complete unreactivity under ambient conditions." },
      { title: "Monatomic Gases", detail: "Exist as individual isolated atoms; lowest boiling points in their periods held together only by weak London dispersion forces." }
    ],
    examTrapsAndExceptions: [
      "Helium (He) has an s² configuration but is placed in Group 18 p-block column due to noble gas chemical inertness.",
      "Neil Bartlett synthesized the first noble gas compound in 1962: XePtF₆, taking advantage of Xenon's first ionization energy matching that of molecular Oxygen (O₂)."
    ],
    elementSymbols: ["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"],
    testCondition: (el) => el.group === 18
  }
};

export function getFilterById(filterKey: string): PeriodicFilterCategory | undefined {
  return PERIODIC_FILTERS[filterKey] || Object.values(PERIODIC_FILTERS).find((f) => f.id === filterKey);
}

export function matchesPeriodicFilter(element: PeriodicElement, filterKey: string): boolean {
  const filter = getFilterById(filterKey);
  if (!filter) return true;
  return filter.testCondition(element);
}

export function getElementsByFilter(filterKey: string): PeriodicElement[] {
  const filter = getFilterById(filterKey);
  if (!filter) return PERIODIC_ELEMENTS;
  return PERIODIC_ELEMENTS.filter(filter.testCondition);
}
`;

fs.writeFileSync('backend/src/data/periodicTableFilters.ts', tsCode, 'utf-8');
console.log("Successfully updated backend/src/data/periodicTableFilters.ts with 118 elements and full filters!");
