/**
 * Entrance Question Bank — Chemistry, Class 12 (Solutions → Element Chemistry).
 * Unit slugs mirror the class-12 chemistry syllabus (lib/syllabus.ts).
 */

import type { EntranceUnitBank } from "./types";

export const CHEMISTRY_12_ENTRANCE: EntranceUnitBank[] = [
  {
    units: ["solutions"],
    questions: [
      { q: "Which shows NEGATIVE deviation from Raoult's law?", options: ["Chloroform + acetone", "Ethanol + acetone", "Benzene + toluene", "Hexane + heptane"], answer: 0, why: "H-bonding between the two (C–H···O=C) lowers vapour pressure below ideal.", exam: "CEE 2080" },
      { q: "Elevation of boiling point is a:", options: ["Colligative property", "Additive property", "Constitutive property", "Optical property"], answer: 0, why: "ΔT_b = K_b·m depends only on the NUMBER of solute particles.", exam: "IOE 2079" },
      { q: "Osmotic pressure of 1 M glucose equals that of:", options: ["1 M urea", "1 M NaCl", "1 M CaCl₂", "1 M sucrose at 2T"], answer: 0, why: "π = iCRT — glucose and urea both give i = 1; NaCl gives 2, CaCl₂ gives 3.", exam: "CEE 2079" },
      { q: "Henri's law (Henry's law) states solubility of a gas is:", options: ["Proportional to its partial pressure", "Inversely proportional to pressure", "Independent of pressure", "Proportional to volume"], answer: 0, why: "p = K_H·x — why sodas fizz more when sealed under CO₂ pressure.", exam: "NEB Board" },
      { q: "0.1 M solutions of glucose, NaCl and CaCl₂ freeze at (lowest first):", options: ["CaCl₂, NaCl, glucose", "glucose, NaCl, CaCl₂", "NaCl, CaCl₂, glucose", "All equal"], answer: 0, why: "More particles (i = 3, 2, 1) → greater depression → lowest freezing point first.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["electro-chemistry"],
    questions: [
      { q: "Standard EMF of a cell with E°(cathode) = 0.34 V and E°(anode) = −0.76 V is:", options: ["1.10 V", "0.42 V", "−1.10 V", "−0.42 V"], answer: 0, why: "E°cell = E°cathode − E°anode = 0.34 − (−0.76) — subtract, never add.", exam: "CEE 2080" },
      { q: "During electrolysis of molten NaCl, the product at the cathode is:", options: ["Na metal", "Cl₂ gas", "NaOH", "H₂ gas"], answer: 0, why: "Na⁺ + e⁻ → Na (reduction); no water present, so no H₂.", exam: "IOE 2079" },
      { q: "Faraday's constant is about:", options: ["96500 C/mol", "9650 C/mol", "1.6×10⁻¹⁹ C", "6.022×10²³ C"], answer: 0, why: "F = N_A·e — charge on one mole of electrons.", exam: "CEE 2079" },
      { q: "Molar conductivity of a strong electrolyte with dilution:", options: ["Increases", "Decreases", "Stays constant", "First increases then decreases"], answer: 0, why: "Λ_m = κ/c — κ falls slower than c, so Λ_m rises toward limiting value.", exam: "CEE 2081" },
      { q: "Corrosion of iron is electrochemically the metal acting as:", options: ["Anode (oxidation)", "Cathode (reduction)", "Salt bridge", "Inert electrode"], answer: 0, why: "Fe → Fe²⁺ + 2e⁻ at anodic spots; O₂ reduction elsewhere.", exam: "NEB Board" },
    ],
  },
  {
    units: ["chemical-kinetics"],
    questions: [
      { q: "Half-life of a first-order reaction is:", options: ["0.693/k", "k/0.693", "1/[A]₀k", "2[A]₀/k"], answer: 0, why: "Independent of initial concentration — the first-order signature.", exam: "CEE 2080" },
      { q: "Unit of rate constant for a zero-order reaction is:", options: ["mol L⁻¹ s⁻¹", "s⁻¹", "L mol⁻¹ s⁻¹", "L² mol⁻² s⁻¹"], answer: 0, why: "rate = k[A]⁰ → k has rate's own units; each order shifts the unit.", exam: "CEE 2079" },
      { q: "A catalyst increases rate by:", options: ["Lowering activation energy", "Raising temperature", "Shifting equilibrium", "Increasing ΔH"], answer: 0, why: "Alternate pathway with smaller E_a; equilibrium position unchanged.", exam: "IOE 2079" },
      { q: "For a first-order reaction, 75% completion takes (relative to t½):", options: ["2 half-lives", "1 half-life", "4 half-lives", "½ half-life"], answer: 0, why: "100% → 50% → 25% left: two halvings.", exam: "CEE 2081" },
      { q: "The order of the reaction rate = k[A][B]¹ᐟ² is:", options: ["1.5", "1", "2", "0.5"], answer: 0, why: "Add exponents: 1 + ½ — order can be fractional.", exam: "NEB Board" },
    ],
  },
  {
    units: ["general-and-organic-fundamentals"],
    questions: [
      { q: "SN1 reactions proceed fastest with:", options: ["Tertiary alkyl halides", "Primary alkyl halides", "Methyl halides", "Vinyl halides"], answer: 0, why: "Carbocation stability: 3° > 2° > 1° — the rate-determining ionisation.", exam: "CEE 2080" },
      { q: "The most stable carbocation is:", options: ["(CH₃)₃C⁺", "CH₃CH₂⁺", "CH₃⁺", "CH₂=CH⁺"], answer: 0, why: "Nine hyperconjugative C–H bonds + inductive donation stabilise 3°.", exam: "CEE 2079" },
      { q: "Which group is electron-withdrawing by resonance (−M)?", options: ["–NO₂", "–CH₃", "–OC H₃", "–NH₂"], answer: 0, why: "Nitro pulls π-electron density; alkyl/oxygen/nitrogen groups donate here.", exam: "IOE 2079" },
      { q: "Chirality requires a carbon with:", options: ["Four different groups", "Two identical groups", "A double bond", "One group only"], answer: 0, why: "Asymmetric carbon → non-superimposable mirror images (optical isomers).", exam: "CEE 2081" },
      { q: "Electrophile among the following is:", options: ["NO₂⁺", "OH⁻", "CN⁻", "NH₃"], answer: 0, why: "Positive species seek electron pairs; the rest are nucleophiles.", exam: "NEB Board" },
    ],
  },
  {
    units: ["alcohols-phenols-ethers"],
    questions: [
      { q: "Lucas reagent (anhyd. ZnCl₂ + conc. HCl) gives immediate turbidity with:", options: ["Tertiary alcohols", "Primary alcohols", "Phenol", "Methanol"], answer: 0, why: "3° carbocations form instantly; 1° needs heating — the classic distinction.", exam: "CEE 2080" },
      { q: "Phenol is more acidic than ethanol because:", options: ["Phenoxide ion is resonance-stabilised", "Phenol has more carbons", "Ethanol is aromatic", "Phenol is non-polar"], answer: 0, why: "Negative charge delocalises over the ring in C₆H₅O⁻.", exam: "CEE 2079" },
      { q: "Reimer–Tiemann reaction converts phenol to:", options: ["Salicylaldehyde", "Benzoic acid", "Anisole", "Cyclohexanol"], answer: 0, why: "CHCl₃/NaOH inserts –CHO ortho; Kolbe–Schmidt inserts –COOH.", exam: "IOE 2079" },
      { q: "Dehydration of alcohols to alkenes is easiest for:", options: ["Tertiary", "Primary", "Methyl", "All equal"], answer: 0, why: "E1 via stable carbocation — 3° > 2° > 1°.", exam: "CEE 2081" },
      { q: "Aspirin is chemically:", options: ["Acetylsalicylic acid", "Salicylic acid", "Benzoic acid", "Phenyl acetate"], answer: 0, why: "Phenol's –OH acetylated on the salicylic acid skeleton.", exam: "NEB Board" },
    ],
  },
  {
    units: ["aldehydes-ketones-carboxylic-acids"],
    questions: [
      { q: "Which gives a positive Tollens' test?", options: ["Aldehydes", "Ketones", "Ethers", "Alkanes"], answer: 0, why: "Ag⁺ reduced to silver mirror by the –CHO group only.", exam: "CEE 2080" },
      { q: "Cannizzaro reaction is shown by aldehydes with:", options: ["No α-hydrogen", "Two α-hydrogens", "Aromatic rings only", "No carbonyl"], answer: 0, why: "Disproportionation (HCHO, benzaldehyde) needs no α-H for enolisation.", exam: "CEE 2079" },
      { q: "Aldol condensation requires aldehydes to have:", options: ["α-hydrogen", "β-hydrogen", "No hydrogen", "A phenyl ring"], answer: 0, why: "Enolate formation needs the α-H — acetaldehyde yes, benzaldehyde (alone) no.", exam: "IOE 2079" },
      { q: "Order of acid strength is:", options: ["RCOOH > phenol > water > alcohol", "alcohol > phenol > RCOOH", "phenol > RCOOH", "water > phenol"], answer: 0, why: "Carboxylate stabilised by two equivalent O's; phenoxide by ring only.", exam: "CEE 2081" },
      { q: "HVZ reaction brominates carboxylic acids at:", options: ["The α-carbon", "The β-carbon", "The ring", "The –OH oxygen"], answer: 0, why: "Br₂/PX₃ gives α-bromo acids — Hell–Volhard–Zelinsky.", exam: "NEB Board" },
    ],
  },
  {
    units: ["amines"],
    questions: [
      { q: "Order of basicity in aqueous solution is:", options: ["(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃", "(CH₃)₃N > (CH₃)₂NH", "NH₃ highest", "All equal"], answer: 0, why: "Solvation + inductive effects peak at secondary amines for methyl series.", exam: "CEE 2080" },
      { q: "Hinsberg's reagent is:", options: ["Benzenesulphonyl chloride", "Benzoyl chloride", "Acetyl chloride", "Tosyl acid"], answer: 0, why: "C₆H₅SO₂Cl distinguishes 1°/2°/3° amines by solubility of products.", exam: "CEE 2079" },
      { q: "Carbylamine test (foul smell) is given by:", options: ["Primary amines", "Secondary amines", "Tertiary amines", "Quaternary salts"], answer: 0, why: "RNH₂ + CHCl₃ + KOH → RNC (isocyanide) — only 1° amines respond.", exam: "IOE 2079" },
      { q: "Aniline is less basic than ammonia because:", options: ["Lone pair delocalises into the ring", "It is lighter", "The ring repels H⁺", "It has no hydrogen"], answer: 0, why: "Resonance ties up the N lone pair — anilinium loses that stabilisation on protonation.", exam: "CEE 2081" },
      { q: "Diazonium salts couple with phenol in alkaline medium to form:", options: ["Azo dyes", "Anilines", "Benzyl alcohols", "Nitro compounds"], answer: 0, why: "p-hydroxyazobenzene — the orange dye step of azo chemistry.", exam: "NEB Board" },
    ],
  },
  {
    units: ["biomolecules"],
    questions: [
      { q: "The sugar in RNA is:", options: ["Ribose", "Deoxyribose", "Glucose", "Fructose"], answer: 0, why: "RNA = ribose; DNA = 2′-deoxyribose (no 2′-OH).", exam: "CEE 2080" },
      { q: "Proteins are polymers of:", options: ["α-amino acids", "Nucleotides", "Monosaccharides", "Fatty acids"], answer: 0, why: "Peptide (amide) bonds join α-amino acids; 20 common types.", exam: "CEE 2079" },
      { q: "Vitamin C's chemical name is:", options: ["Ascorbic acid", "Retinol", "Thiamine", "Calciferol"], answer: 0, why: "Water-soluble; deficiency causes scurvy.", exam: "IOE 2079" },
      { q: "The non-reducing sugar among these is:", options: ["Sucrose", "Glucose", "Maltose", "Lactose"], answer: 0, why: "Both anomeric carbons locked in the glycosidic bond → no free –CHO.", exam: "CEE 2081" },
      { q: "Enzymes are mostly:", options: ["Globular proteins", "Lipids", "Nucleic acids", "Steroids"], answer: 0, why: "Folded globular proteins with an active site; ribozymes are the exception.", exam: "NEB Board" },
    ],
  },
  {
    units: ["chemistry-in-everyday-life"],
    questions: [
      { q: "Aspirin relieves pain by:", options: ["Inhibiting prostaglandin synthesis", "Killing bacteria", "Binding receptors irreversibly", "Raising pH"], answer: 0, why: "Blocks COX enzymes — antipyretic + analgesic + anti-inflammatory.", exam: "CEE 2080" },
      { q: "Chloramphenicol is a:", options: ["Broad-spectrum antibiotic", "Analgesic", "Antacid", "Detergent"], answer: 0, why: "Typhoid and meningitis drug — bacteriostatic protein-synthesis inhibitor.", exam: "CEE 2079" },
      { q: "Cationic detergents are:", options: ["Quaternary ammonium salts", "Sodium soaps", "Sulphonic acid salts", "Esters"], answer: 0, why: "e.g. cetyltrimethylammonium bromide — positively charged head.", exam: "IOE 2079" },
      { q: "Tranquilisers like diazepam act on:", options: ["The central nervous system", "Bacterial ribosomes", "Cell membranes of fungi", "Blood clotting"], answer: 0, why: "Neurotransmitter modulation for anxiety/insomnia.", exam: "CEE 2081" },
      { q: "Antacids like ranitidine work by:", options: ["Blocking histamine H₂ receptors", "Neutralising like NaHCO₃ only", "Coating the stomach", "Killing H. pylori"], answer: 0, why: "H₂-antagonists cut acid secretion at the source, not just neutralise.", exam: "NEB Board" },
    ],
  },
  {
    units: ["chemistry-of-element"],
    questions: [
      { q: "Lanthanoid contraction is due to:", options: ["Poor shielding by 4f electrons", "Rising nuclear charge alone", "d-orbital filling", "Relativistic H expansion"], answer: 0, why: "f-electrons shield poorly → Z_eff rises → steady radius drop along the series.", exam: "CEE 2080" },
      { q: "Transition metals show variable oxidation states because:", options: ["(n−1)d and ns energies are close", "They are heavy", "They lose protons", "d-orbitals are empty"], answer: 0, why: "Small ns–(n−1)d gap lets different numbers of electrons ionise.", exam: "CEE 2079" },
      { q: "The colour of [Cu(H₂O)₄]²⁺ is due to:", options: ["d–d transition", "Charge transfer only", "s–p transition", "No transition"], answer: 0, why: "Split d-orbitals absorb visible light; Cu²⁺ is d⁹.", exam: "IOE 2079" },
      { q: "KMnO₄ in acidic medium oxidises Fe²⁺ to Fe³⁺; the Mn product is:", options: ["Mn²⁺", "MnO₂", "MnO₄²⁻", "Mn"], answer: 0, why: "MnO₄⁻ + 5e⁻ + 8H⁺ → Mn²⁺ + 4H₂O (5-electron change).", exam: "CEE 2081" },
      { q: "Highest oxidation state is shown by:", options: ["Mn (+7)", "Na (+1)", "Mg (+2)", "Zn (+2)"], answer: 0, why: "d⁵s² can lose all 7; Zn (d¹⁰) stops at +2 — no d-electrons to lose.", exam: "NEB Board" },
    ],
  },
];
