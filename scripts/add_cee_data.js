import fs from "fs";
import path from "path";

// Detailed CEE Entrance data for high-yield elements
const ceeSpecificData = {
  H: {
    ceeHighYieldNotes: "CEE High-Yield: Nascent hydrogen is more reactive than molecular H₂ due to its atomic state & high internal energy. Ortho-hydrogen (parallel nuclear spins, 75% at room temp) vs Para-hydrogen (antiparallel spins, 25%). Heavy water (D₂O) used as neutron moderator in nuclear reactors. H₂O₂ acts as both oxidizing and reducing agent; volume strength 10V = 3.03% = 0.89 M.",
    ceePastMcqs: [
      "[CEE 2021 / IOM Past] Nascent hydrogen is chemically more active than ordinary molecular hydrogen because: (A) It is in atomic state with higher energy (B) It has higher mass (C) It has negative electron gain enthalpy (D) It is an isotope -> Ans: (A). Nascent hydrogen is freshly generated in the reaction mixture in atomic form with excess internal energy.",
      "[CEE 2022 / KU Past] The volume strength of 1.5 N H₂O₂ solution is: (A) 5.6 V (B) 8.4 V (C) 11.2 V (D) 16.8 V -> Ans: (B). Volume Strength = Normality × 5.6 = 1.5 × 5.6 = 8.4 V.",
      "[CEE 2020 / MOE] Heavy water (D₂O) is used in nuclear reactors as: (A) Fuel (B) Coolant only (C) Moderator to slow down fast neutrons (D) Control rod -> Ans: (C). D₂O slows down fast neutrons without capturing them."
    ],
    ceeSpeedFormulas: [
      "Volume Strength = Normality × 5.6 = Molarity × 11.2",
      "Mass of 1 mole H₂ = 2.016 g, D₂ = 4.028 g, T₂ = 6.032 g (Tritium is β⁻ radioactive, t₁/₂ = 12.3 yrs)",
      "Ortho-H₂ (spins ↑↑, stable at high T) vs Para-H₂ (spins ↑↓, 100% at absolute zero)"
    ],
    ceeTrapAlert: "TRAP: H forms -1 hydride ion (H⁻) with alkali metals (NaH, CaH₂ / Hydrolith), but +1 with halogens. Do NOT calculate H as +1 in metal hydrides!"
  },
  He: {
    ceeHighYieldNotes: "CEE High-Yield: Diver's gas mixture is 80% He + 20% O₂ (Heliox) to prevent decompression sickness (the 'bends') due to helium's extremely low solubility in blood under hyperbaric pressure. Highest first ionization energy (2372 kJ/mol) of all elements.",
    ceePastMcqs: [
      "[CEE 2021] Deep-sea divers use a mixture of oxygen and which gas to prevent the painful 'bends'? (A) Nitrogen (B) Argon (C) Helium (D) Carbon dioxide -> Ans: (C). Helium is used because of its extremely low blood lipid solubility compared to N₂.",
      "[CEE 2019 / IOM] Which of the following elements has the highest first ionization energy? (A) Ne (B) He (C) F (D) H -> Ans: (B). He (2372 kJ/mol) has the smallest atomic radius and high effective nuclear charge without shielding."
    ],
    ceeSpeedFormulas: [
      "Heliox = 80% He + 20% O₂ (Deep diving & asthma nebulization)",
      "α-particle = He²⁺ nucleus (charge +2e, mass 4 u)"
    ],
    ceeTrapAlert: "TRAP: Although He has 2 valence electrons (1s²), it belongs to Group 18 (noble gases), NOT Group 2 (alkaline earth metals) because its valence shell is fully saturated."
  },
  Li: {
    ceeHighYieldNotes: "CEE High-Yield: Anomalous alkali metal with highest hydration enthalpy and lowest standard reduction potential (E° = -3.05 V, strongest reducing agent in aqueous solution). Only alkali metal that forms nitride (Li₃N) directly with atmospheric N₂. Diagonal relationship with Mg. Used clinically as Li₂CO₃ for manic-depressive disorder.",
    ceePastMcqs: [
      "[CEE 2022 / MBBS] Which alkali metal is the strongest reducing agent in aqueous solution? (A) Cs (B) Na (C) K (D) Li -> Ans: (D). Li has the most negative E° (-3.05 V) because its immense hydration enthalpy (-506 kJ/mol) compensates for its high ionization energy.",
      "[CEE 2020] Lithium resembles Magnesium due to similarity in: (A) Atomic number (B) Polarizing power / ionic potential (q/r) (C) Valency (D) Electron affinity -> Ans: (B). Charge-to-size ratio (ionic potential) is nearly identical."
    ],
    ceeSpeedFormulas: [
      "E° (Li⁺/Li) = -3.05 V (Strongest reducing agent in H₂O due to high hydration energy ΔH_hyd)",
      "Medicine: Li₂CO₃ (Lithium carbonate) = drug of choice for Bipolar Affective Disorder"
    ],
    ceeTrapAlert: "TRAP: Cs has lowest ionization energy in gas phase, but Li is the strongest reducing agent in AQUEOUS solution. Always check if the question specifies gas vs aqueous!"
  },
  Be: {
    ceeHighYieldNotes: "CEE High-Yield: Amphoteric element. BeO and Be(OH)₂ dissolve in acids and excess NaOH forming beryllate [Be(OH)₄]²⁻. Forms covalent compounds with coordination number max 4 (absence of d-orbitals). BeCl₂ is a polymeric chain in solid state and chloro-bridged dimer in vapor phase. Diagonal relationship with Al.",
    ceePastMcqs: [
      "[CEE 2021] Beryllium oxide (BeO) is: (A) Acidic (B) Basic (C) Amphoteric (D) Neutral -> Ans: (C). BeO dissolves in both acids (yielding Be²⁺) and bases (yielding beryllate [Be(OH)₄]²⁻).",
      "[CEE 2018 / IOM] Beryllium shows diagonal relationship with: (A) Na (B) Al (C) Mg (D) B -> Ans: (B). Be resembles Al (both passivate in conc. HNO₃, have amphoteric oxides, bridge halides)."
    ],
    ceeSpeedFormulas: [
      "Amphoteric rule: Be, Al, Zn, Sn, Pb form amphoteric oxides/hydroxides",
      "BeCl₂: Solid = polymeric chain (sp³ Be); Vapor (500-1200 K) = planar dimer (sp² Be); High T (>1200 K) = linear monomer (sp Be)"
    ],
    ceeTrapAlert: "TRAP: Be does not react with cold water or produce flame in Bunsen burner because of a refractory, impervious oxide film."
  },
  B: {
    ceeHighYieldNotes: "CEE High-Yield: Non-metal forming electron-deficient compounds. Boron exhibits 3c-2e (three-center-two-electron) banana bonds in diborane B₂H₆ (2 bridging B-H-B bonds, 4 terminal B-H bonds). Boric acid H₃BO₃ is NOT a protonic acid; it is a monobasic Lewis acid that accepts OH⁻ from water: B(OH)₃ + H₂O ⇌ [B(OH)₄]⁻ + H⁺.",
    ceePastMcqs: [
      "[CEE 2022 / MOE] In Diborane (B₂H₆), the number of 3-center-2-electron bonds is: (A) 2 (B) 4 (C) 6 (D) 0 -> Ans: (A). Two bridging B-H-B banana bonds are 3c-2e bonds, while the 4 terminal B-H bonds are normal 2c-2e bonds.",
      "[CEE 2020 / KU] Boric acid (H₃BO₃) is: (A) Tribasic Arrhenius acid (B) Monobasic Lewis acid (C) Dibasic acid (D) Neutral -> Ans: (B). H₃BO₃ acts as a Lewis acid by accepting OH⁻ from H₂O, releasing a hydronium ion."
    ],
    ceeSpeedFormulas: [
      "B₂H₆ banana bonds: 2 × [3c-2e] + 4 × [2c-2e]",
      "Borax bead test: Na₂B₄O₇·10H₂O --[Δ]--> 2NaBO₂ + B₂O₃ (metaborate colored bead)"
    ],
    ceeTrapAlert: "TRAP: Boric acid formula looks like H₃BO₃, but it is NOT tribasic! It only ionizes one H⁺ by adducting OH⁻, so n-factor = 1. Equivalent weight = Molecular weight!"
  },
  C: {
    ceeHighYieldNotes: "CEE High-Yield: Maximum catenation property. Allotropes: Diamond (sp³, 3D tetrahedral network, hardest insulator), Graphite (sp², hexagonal planar sheets with delocalized π-electrons, lubricant and electrical conductor), Fullerene C₆₀ (sp², soccer-ball geodesic dome, aromatic). CO binds with hemoglobin 250× tighter than O₂ forming carboxyhemoglobin.",
    ceePastMcqs: [
      "[CEE 2021] The hybridization of carbon in Diamond, Graphite, and Buckminsterfullerene respectively is: (A) sp³, sp², sp² (B) sp², sp³, sp² (C) sp³, sp, sp² (D) sp³, sp³, sp² -> Ans: (A). Diamond is sp³, while Graphite and C₆₀ contain sp² carbons.",
      "[CEE 2019 / IOM] Carbon monoxide is lethal because: (A) It destroys RBCs (B) It forms stable carboxyhemoglobin preventing O₂ transport (C) It damages kidney nephrons (D) It precipitates proteins -> Ans: (B). Affinity of CO for Hb is ~250 times greater than O₂."
    ],
    ceeSpeedFormulas: [
      "Catenation power order: C >> Si > Ge ≈ Sn >> Pb",
      "Gas mixtures: Producer gas = CO + N₂; Water gas (Synthesis gas) = CO + H₂"
    ],
    ceeTrapAlert: "TRAP: Carbon monoxide (CO) is a NEUTRAL oxide, not acidic! Do not confuse with CO₂ (acidic)."
  },
  N: {
    ceeHighYieldNotes: "CEE High-Yield: Inert at room temperature due to high N≡N triple bond dissociation energy (941.4 kJ/mol). Nitrogen oxides: N₂O (neutral, laughing gas, anaesthetic), NO (neutral, odd-electron paramagnetic molecule), NO₂ (brown paramagnetic gas that dimerizes to colorless diamagnetic N₂O₄).",
    ceePastMcqs: [
      "[CEE 2022] Which of the following oxides of nitrogen is neutral to litmus? (A) NO₂ (B) N₂O₅ (C) N₂O (D) N₂O₃ -> Ans: (C). Both N₂O (nitrous oxide) and NO (nitric oxide) are neutral oxides.",
      "[CEE 2020 / MBBS] In the brown ring test for nitrate, the brown colored coordination complex formed is: (A) [Fe(H₂O)₅(NO)]SO₄ (B) [Fe(CN)₆]³⁻ (C) Fe₄[Fe(CN)₆]₃ (D) [Fe(H₂O)₆]SO₄ -> Ans: (A). Iron is in +1 oxidation state with NO⁺ ligand."
    ],
    ceeSpeedFormulas: [
      "Brown ring complex: [Fe(H₂O)₅(NO)]²⁺ (Fe is +1, 3 unpaired electrons, μ = 3.87 BM)",
      "Baber catalyst: Fe promoter Mo; temperature 450-500°C, 200 atm"
    ],
    ceeTrapAlert: "TRAP: Nitrogen has NO vacant d-orbitals in its valence shell (n=2), hence NCl₅ does NOT exist, whereas PCl₅ readily exists!"
  },
  O: {
    ceeHighYieldNotes: "CEE High-Yield: Second most electronegative element (3.44 Pauling). According to Molecular Orbital Theory (MOT), O₂ has two unpaired electrons in degenerate antibonding π*2p orbitals, explaining its paramagnetism (μ = 2.83 BM). Ozone (O₃) is an allotrope with bond angle 116.8°, used as a bactericide and purifier.",
    ceePastMcqs: [
      "[CEE 2021] Paramagnetism of oxygen molecule (O₂) is explained by: (A) Valence Bond Theory (B) Molecular Orbital Theory (C) Resonance (D) VSEPR Theory -> Ans: (B). MOT reveals two unpaired electrons in π*2px and π*2py orbitals.",
      "[CEE 2018 / IOM] Oxidation state of oxygen in OF₂ and H₂O₂ respectively is: (A) -2, -1 (B) +2, -1 (C) +2, +1 (D) -1, +2 -> Ans: (B). In OF₂, F is more electronegative so O is +2. In peroxides (H₂O₂), O is -1."
    ],
    ceeSpeedFormulas: [
      "Oxidation states of Oxygen: Normal oxide = -2; Peroxide (O₂²⁻) = -1; Superoxide (O₂⁻) = -1/2; OF₂ = +2; O₂F₂ = +1",
      "Bond order of O₂ = 2.0 (paramagnetic, 2 unpaired e⁻); O₂⁺ = 2.5; O₂⁻ = 1.5; O₂²⁻ = 1.0 (diamagnetic)"
    ],
    ceeTrapAlert: "TRAP: Oxygen is NOT always -2! In OF₂ it is +2, in O₂F₂ it is +1, in KO₂ it is -1/2, and in H₂O₂ it is -1."
  },
  F: {
    ceeHighYieldNotes: "CEE High-Yield: Most electronegative element on the periodic table (4.0 Pauling). Strongest chemical oxidizing agent (E° = +2.87 V). Shows ONLY -1 oxidation state in its compounds (no positive oxidation states due to absence of d-orbitals and extreme electronegativity). F-F bond dissociation energy is abnormally low due to 2p-2p electron repulsion.",
    ceePastMcqs: [
      "[CEE 2022] Why does Fluorine have lower electron gain enthalpy than Chlorine? (A) Small size and high interelectronic repulsions in compact 2p subshell (B) Lower electronegativity (C) High ionization energy (D) Presence of d-orbitals -> Ans: (A). Incoming electron experiences strong repulsion in F's dense 2p orbital.",
      "[CEE 2020] Which halogen does NOT show variable or positive oxidation states? (A) Cl (B) Br (C) I (D) F -> Ans: (D). F is the most electronegative element and has no d-orbitals, exhibiting strictly -1 (and 0 in F₂)."
    ],
    ceeSpeedFormulas: [
      "Electron gain enthalpy order: Cl > F > Br > I (Cl has highest electron affinity: -349 kJ/mol)",
      "Bond dissociation energy: Cl₂ > Br₂ > F₂ > I₂ (F₂ is weaker than Cl₂ and Br₂ due to lone pair repulsion!)"
    ],
    ceeTrapAlert: "TRAP: F has HIGHER electronegativity than Cl, but LOWER electron affinity than Cl! Examiners love testing this distinction."
  },
  Na: {
    ceeHighYieldNotes: "CEE High-Yield: Extracted by electrolysis of fused NaCl + CaCl₂ in Down's Cell (CaCl₂ added to lower melting point from 801°C to 600°C). Gives golden yellow flame test (589.0 and 589.6 nm). Chief cation of extracellular fluid. Reacts with O₂ to form peroxide Na₂O₂.",
    ceePastMcqs: [
      "[CEE 2021] In Down's process for extraction of Sodium, CaCl₂ is added to NaCl in order to: (A) Act as a flux (B) Lower the melting point of NaCl from 801°C to 600°C (C) Prevent oxidation of Na (D) Increase density of the electrolyte -> Ans: (B). Lowers operational temperature, reducing volatility of molten Na.",
      "[CEE 2019 / IOM] What is the flame color of Sodium vapor? (A) Crimson (B) Golden yellow (C) Lilac (D) Brick red -> Ans: (B). Characteristic yellow D-lines."
    ],
    ceeSpeedFormulas: [
      "Caustic soda = NaOH; Baking soda = NaHCO₃; Washing soda = Na₂CO₃·10H₂O; Soda ash = anhydrous Na₂CO₃",
      "Biological role: Major extracellular cation; maintains osmotic pressure and action potential conduction"
    ],
    ceeTrapAlert: "TRAP: Na cannot be extracted by aqueous electrolysis of NaCl because H⁺ discharges at cathode instead of Na⁺ due to higher reduction potential! Fused/molten salt must be used."
  },
  Mg: {
    ceeHighYieldNotes: "CEE High-Yield: Extracted from Carnallite (KCl·MgCl₂·6H₂O) or sea water (Dow's process). Forms Grignard reagent R-Mg-X in anhydrous ether. Central coordinating metal in chlorophyll porphyrin ring. Milk of magnesia Mg(OH)₂ is an antacid and osmotic laxative. Epsom salt is MgSO₄·7H₂O.",
    ceePastMcqs: [
      "[CEE 2022 / MBBS] The metallic element present in the green pigment Chlorophyll is: (A) Fe (B) Mg (C) Co (D) Cu -> Ans: (B). Mg²⁺ ion is coordinated to the 4 pyrrole nitrogen atoms of the porphyrin ring.",
      "[CEE 2020] Milk of Magnesia is chemically: (A) MgCO₃ (B) Mg(OH)₂ suspension (C) MgSO₄ (D) MgCl₂ -> Ans: (B). Aqueous suspension of magnesium hydroxide, antacid."
    ],
    ceeSpeedFormulas: [
      "Epsom salt = MgSO₄·7H₂O; Magnesite = MgCO₃; Dolomite = CaCO₃·MgCO₃; Carnallite = KCl·MgCl₂·6H₂O",
      "Sorel cement = MgO + MgCl₂ + H₂O"
    ],
    ceeTrapAlert: "TRAP: Mg burns in both air and CO₂! Burning Mg continues to burn in a jar of CO₂: 2Mg + CO₂ → 2MgO + C. Never use CO₂ fire extinguishers on burning magnesium!"
  },
  Al: {
    ceeHighYieldNotes: "CEE High-Yield: Most abundant metal in Earth's crust (8.1%). Extracted from Bauxite (Al₂O₃·2H₂O) by Baeyer's process (leaching with NaOH) followed by Hall-Héroult electrolytic reduction in molten Cryolite (Na₃AlF₆) and Fluorspar (CaF₂). Anhydrous AlCl₃ acts as a Lewis acid catalyst in Friedel-Crafts reaction.",
    ceePastMcqs: [
      "[CEE 2021] In Hall-Héroult electrolytic process for Aluminum, Cryolite (Na₃AlF₆) is added to: (A) Lower melting point and increase electrical conductivity (B) Act as reducing agent (C) Prevent anode corrosion (D) Dissolve gangue -> Ans: (A). Al₂O₃ melts at 2050°C; cryolite brings it down to ~950°C.",
      "[CEE 2019 / IOM] Which metal becomes chemically passive in concentrated Nitric Acid (HNO₃)? (A) Cu (B) Zn (C) Al (D) Mg -> Ans: (C). Al and Fe form a protective, impervious thin film of oxide (Al₂O₃)."
    ],
    ceeSpeedFormulas: [
      "Thermite mixture = 3 parts Fe₂O₃ + 1 part Al powder (Goldschmidt thermite welding, highly exothermic)",
      "Potash Alum = K₂SO₄·Al₂(SO₄)₃·24H₂O (coagulant for water purification and styptic)"
    ],
    ceeTrapAlert: "TRAP: Anhydrous AlCl₃ is covalent and sublimes at 180°C (dimer Al₂Cl₆), but AlCl₃·6H₂O in water is completely ionic ([Al(H₂O)₆]³⁺ and 3Cl⁻)!"
  },
  Si: {
    ceeHighYieldNotes: "CEE High-Yield: Second most abundant element in crust (28%). Silicones are organosilicon polymers containing repeated [-R₂Si-O-SiR₂-] linkages, hydrophobic and thermally stable. Silica gel is an amorphous, porous desiccant. Glass is etched by Hydrofluoric acid (HF): SiO₂ + 4HF → SiF₄ + 2H₂O.",
    ceePastMcqs: [
      "[CEE 2022] Glass is etched by which acid? (A) HCl (B) H₂SO₄ (C) HNO₃ (D) HF -> Ans: (D). HF dissolves silica forming gaseous SiF₄ or fluorosilicic acid H₂SiF₆.",
      "[CEE 2020] Silicones are water repellent polymers because of the presence of: (A) Si-O bonds (B) Hydrophobic alkyl groups (R) on the exterior (C) High molecular weight (D) Network structure -> Ans: (B). Non-polar alkyl/aryl groups point outward."
    ],
    ceeSpeedFormulas: [
      "Carborundum = Silicon Carbide (SiC), diamond-like covalent network abrasive",
      "Silica etching: SiO₂ + 4HF → SiF₄ + 2H₂O; SiF₄ + 2HF → H₂SiF₆"
    ],
    ceeTrapAlert: "TRAP: CO₂ is a gas (discrete linear O=C=O molecules), but SiO₂ is a giant 3D network solid with high melting point (1710°C) because Si cannot form stable pπ-pπ double bonds with O!"
  },
  P: {
    ceeHighYieldNotes: "CEE High-Yield: White/Yellow P (discrete P₄ tetrahedron, 60° bond angle, severe angle strain, glows in dark by chemiluminescence, stored in water, poisonous) vs Red P (polymeric chain of P₄ tetrahedra, non-toxic, odorless, does not catch fire spontaneously). PH₃ (Phosphine) smells of rotten fish and forms smoke rings in sea signals (Holme's signal).",
    ceePastMcqs: [
      "[CEE 2021] White phosphorus is stored under: (A) Kerosene (B) Water (C) Alcohol (D) Liquid ammonia -> Ans: (B). Water protects it from atmospheric oxidation; it has low ignition temperature (30°C).",
      "[CEE 2018 / IOM] Holme's signals used in sea navigation contain a mixture of: (A) CaC₂ and Ca₃P₂ (B) CaC₂ and CaO (C) Ca₃P₂ and Ca(OH)₂ (D) CaSO₄ and Ca₃P₂ -> Ans: (A). Water reacts to form C₂H₂ and PH₃; impure PH₃ contains P₂H₄ which catches fire spontaneously and ignites acetylene."
    ],
    ceeSpeedFormulas: [
      "White P₄: 6 P-P single bonds, bond angle 60° (high strain); insoluble in H₂O, soluble in CS₂",
      "Oxoacids: H₃PO₂ (monoprotic, n=1), H₃PO₃ (diprotic, n=2), H₃PO₄ (triprotic, n=3)"
    ],
    ceeTrapAlert: "TRAP: Hypophosphorous acid (H₃PO₂) has 3 hydrogens in formula, but ONLY ONE is bonded to oxygen! It is MONOBASIC (monoprotic), with 2 P-H reducing bonds!"
  },
  S: {
    ceeHighYieldNotes: "CEE High-Yield: Allotropes: Rhombic (α-S, crown-shaped S₈, stable below 95.6°C) and Monoclinic (β-S, stable above 95.6°C). Transition temperature = 95.6°C. H₂SO₄ manufactured by Contact Process (V₂O₅ catalyst, 450°C, 2 atm). SO₂ bleaches by reduction (temporary); Cl₂ bleaches by oxidation (permanent).",
    ceePastMcqs: [
      "[CEE 2022] The catalyst used in the Contact process for manufacture of Sulphuric acid is: (A) Platinized asbestos (B) V₂O₅ (C) Fe-Mo (D) Ni -> Ans: (B). Vanadium pentoxide (V₂O₅) is preferred because it is cheaper and not poisoned by arsenic impurities.",
      "[CEE 2020 / MBBS] Bleaching action of Sulphur dioxide (SO₂) is due to: (A) Oxidation (B) Reduction (C) Hydrolysis (D) Chlorination -> Ans: (B). SO₂ bleaches by reduction in presence of moisture, which is temporary as atmospheric oxygen re-oxidizes the substrate."
    ],
    ceeSpeedFormulas: [
      "Oleum = Pyrosulphuric acid (H₂S₂O₇ = H₂SO₄ + SO₃)",
      "Caro's acid = Peroxomonosulphuric acid (H₂SO₅); Marshall's acid = Peroxodisulphuric acid (H₂S₂O₈, contains -O-O- peroxide bond)"
    ],
    ceeTrapAlert: "TRAP: In Marshall's acid (H₂S₂O₈), calculating S oxidation state normally gives +7, which is IMPOSSIBLE (S max is +6). S is +6 because of a peroxy linkage [-O-O-]!"
  },
  Cl: {
    ceeHighYieldNotes: "CEE High-Yield: Halogen with highest electron affinity (-349 kJ/mol). Bleaching powder Ca(OCl)Cl prepared by passing Cl₂ over dry slaked lime Ca(OH)₂ in Hasenclever plant. Available chlorine in good bleaching powder is 35-38%. Cl₂ gas dissolves in water to form Chlorine water (HCl + HOCl); on exposure to sunlight, HOCl decomposes yielding nascent oxygen: 2HOCl → 2HCl + 2[O].",
    ceePastMcqs: [
      "[CEE 2021] The bleaching action of Chlorine is due to: (A) Reduction (B) Oxidation by nascent oxygen (C) Dehydration (D) Hydrolysis -> Ans: (B). Cl₂ + H₂O → HCl + HOCl; HOCl → HCl + [O]. Nascent oxygen oxidizes colored matter to colorless.",
      "[CEE 2019 / IOM] Available chlorine in good commercial bleaching powder is approximately: (A) 10-15% (B) 35-38% (C) 60-70% (D) 90-100% -> Ans: (B). Evaluated by iodometric titration against hypo."
    ],
    ceeSpeedFormulas: [
      "Deacon's Process: 4HCl + O₂ --[CuCl₂, 450°C]--> 2Cl₂ + 2H₂O",
      "Available chlorine: % Available Cl₂ = (3.55 × V × N) / W"
    ],
    ceeTrapAlert: "TRAP: In bleaching powder Ca(OCl)Cl, the two chlorine atoms have DIFFERENT oxidation states: one is -1 (chloride Cl⁻) and the other is +1 (hypochlorite OCl⁻)!"
  },
  Cr: {
    ceeHighYieldNotes: "CEE High-Yield: Anomalous configuration [Ar] 3d⁵ 4s¹ (half-filled subshell stability). Oxidation states: +2 to +6. In acidic medium, yellow chromate (CrO₄²⁻) turns into orange dichromate (Cr₂O₇²⁻): 2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O. K₂Cr₂O₇ is a primary standard titrant (unlike KMnO₄). Blue perchromate (CrO₅) has butterfly structure with two peroxy bonds and Cr in +6 state.",
    ceePastMcqs: [
      "[CEE 2022] The oxidation state of Chromium in butterfly-shaped blue perchromate (CrO₅) is: (A) +10 (B) +6 (C) +4 (D) +3 -> Ans: (B). Two peroxide rings [-O-O-] contribute -4, one oxo =O contributes -2, so Cr = +6.",
      "[CEE 2020 / MOE] Chromyl chloride test is used for detection of which radical? (A) SO₄²⁻ (B) NO₃⁻ (C) Cl⁻ (D) Br⁻ -> Ans: (C). Salt + K₂Cr₂O₇ + conc. H₂SO₄ gives red vapors of Chromyl Chloride (CrO₂Cl₂)."
    ],
    ceeSpeedFormulas: [
      "Equivalent weight of K₂Cr₂O₇ in acid medium = Molecular Weight / 6 = 294.18 / 6 = 49.03 (Cr⁺⁶ + 6e⁻ → 2Cr³⁺)",
      "Chromyl chloride: CrO₂Cl₂ (deep red vapor, turns NaOH yellow forming Na₂CrO₄)"
    ],
    ceeTrapAlert: "TRAP: Chlorides of Hg, Ag, Pb, Sn do NOT give the Chromyl Chloride test due to their highly covalent nature!"
  },
  Mn: {
    ceeHighYieldNotes: "CEE High-Yield: Exhibits highest number of oxidation states among 3d transition metals (+2 to +7). KMnO₄ (Potassium Permanganate) is dark purple due to Charge Transfer Spectra (L→M ligand-to-metal charge transfer), NOT d-d transition (Mn⁷⁺ is 3d⁰!). Acts as self-indicator in redox titrations.",
    ceePastMcqs: [
      "[CEE 2021] The equivalent weight of KMnO₄ in acidic medium is: (A) M/5 (B) M/3 (C) M/1 (D) M/6 -> Ans: (A). In acidic medium: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (n-factor = 5, Eq Wt = 158/5 = 31.6).",
      "[CEE 2019 / IOM] The intense purple color of KMnO₄ is due to: (A) d-d transition (B) Charge transfer spectrum (L→M) (C) Paramagnetism (D) Polar bonds -> Ans: (B). Mn⁷⁺ has no d-electrons (3d⁰); color arises from ligand-to-metal charge transfer from O²⁻ to Mn⁷⁺."
    ],
    ceeSpeedFormulas: [
      "KMnO₄ Equivalent Weight rules: Acidic medium = M/5 (change = 5); Alkaline medium = M/1 (change = 1 to MnO₄²⁻); Neutral/Faintly alkaline = M/3 (change = 3 to MnO₂)",
      "Baeyer's reagent: 1% alkaline KMnO₄ solution for unsaturation test (alkenes/alkynes)"
    ],
    ceeTrapAlert: "TRAP: In neutral medium, KMnO₄ changes from +7 to +4 (MnO₂), so change = 3 (n-factor = 3). Do not use 5 unless acid medium is explicitly stated!"
  },
  Fe: {
    ceeHighYieldNotes: "CEE High-Yield: Purest commercial iron is Wrought Iron (<0.2% C); most brittle is Pig/Cast Iron (3-4% C). Slag in blast furnace is CaSiO₃ (molten calcium silicate). Rust is hydrated ferric oxide Fe₂O₃·xH₂O. Brown ring test complex is [Fe(H₂O)₅(NO)]SO₄ where Fe is in +1 state. Mohr's salt is FeSO₄·(NH₄)₂SO₄·6H₂O (primary standard).",
    ceePastMcqs: [
      "[CEE 2022 / MBBS] Which of the following is the purest commercial form of iron? (A) Cast iron (B) Pig iron (C) Wrought iron (D) Stainless steel -> Ans: (C). Wrought iron contains less than 0.2% carbon and is tough, malleable, and ductile.",
      "[CEE 2020 / KU] What is the magnetic moment of Fe³⁺ (3d⁵) ion? (A) 1.73 BM (B) 2.83 BM (C) 4.90 BM (D) 5.92 BM -> Ans: (D). Fe³⁺ has 5 unpaired electrons. μ = √[5(5+2)] = √35 ≈ 5.92 BM."
    ],
    ceeSpeedFormulas: [
      "Magnetic moment formula: μ = √[n(n+2)] BM (n = number of unpaired electrons)",
      "Blast furnace zones: Combustion (1800 K), Slag formation (1300 K: CaO + SiO₂ → CaSiO₃), Reduction (800 K: Fe₂O₃ + 3CO → 2Fe + 3CO₂)",
      "Mohr's salt = FeSO₄·(NH₄)₂SO₄·6H₂O (primary standard resistant to aerial oxidation)"
    ],
    ceeTrapAlert: "TRAP: Stainless steel contains Fe (74%), Cr (18%), Ni (8%), and C (0.1-1%). It does NOT rust because Chromium forms an invisible, self-healing oxide film!"
  },
  Cu: {
    ceeHighYieldNotes: "CEE High-Yield: Coinage metal (Group 11). Anomalous [Ar] 3d¹⁰ 4s¹. Extracted by self-reduction (auto-reduction) of copper glance (Cu₂S) in Bessemer converter yielding Blister Copper (98% pure; blistered by escaping SO₂). Matte is Cu₂S + FeS. Blue vitriol is [Cu(H₂O)₄]SO₄·H₂O (5th water molecule is hydrogen bonded). Cu²⁺ is blue in water; Cu⁺ is colorless.",
    ceePastMcqs: [
      "[CEE 2021] Blister copper is produced during extraction by: (A) Carbon reduction (B) Auto-reduction in Bessemer converter (C) Cyanide leaching (D) Electrolytic reduction -> Ans: (B). 2Cu₂O + Cu₂S → 6Cu + SO₂↑. Escaping bubbles of SO₂ cause blistered appearance.",
      "[CEE 2019 / IOM] Why is Cu²⁺(aq) more stable than Cu⁺(aq) in water despite Cu⁺ having 3d¹⁰ configuration? (A) Lower ionization energy (B) Much higher hydration enthalpy of Cu²⁺ compensating for IE₂ (C) Higher electronegativity (D) Smaller atomic mass -> Ans: (B). Immense hydration enthalpy of smaller Cu²⁺ (-2121 kJ/mol) outweighs the second ionization enthalpy."
    ],
    ceeSpeedFormulas: [
      "Copper Matte = Cu₂S + FeS (molten sulphide intermediate)",
      "Blue Vitriol structure: [Cu(H₂O)₄]SO₄·H₂O (4 coordinate bonds with Cu²⁺, 1 H-bonded to SO₄²⁻)",
      "Fehling's solution: Alkaline Cu²⁺ tartrate complex reduced by aldehydes to red Cu₂O↓"
    ],
    ceeTrapAlert: "TRAP: Cu does NOT displace hydrogen from dilute HCl or dilute H₂SO₄ because its reduction potential is POSITIVE (E° Cu²⁺/Cu = +0.34 V, lower than H₂ on oxidation scale)!"
  },
  Zn: {
    ceeHighYieldNotes: "CEE High-Yield: Volatile metal (Group 12, b.p. 907°C). Not a true transition element because it has completely filled 3d¹⁰ subshell in both elemental and ionic (Zn²⁺) states. Zn²⁺ compounds are diamagnetic and colorless. Philosopher's wool is ZnO (Chinese white). White vitriol is ZnSO₄·7H₂O. Galvanization protects iron sacrificially.",
    ceePastMcqs: [
      "[CEE 2022] Why is Zinc NOT considered a typical transition element? (A) High melting point (B) Fully filled d-subshell (3d¹⁰) in elemental state and +2 oxidation state (C) It is a liquid (D) It is radioactive -> Ans: (B). Transition metals require partially filled (n-1)d subshells.",
      "[CEE 2020 / MOE] Philosopher's wool is chemically: (A) ZnSO₄ (B) ZnO (C) ZnCl₂ (D) ZnCO₃ -> Ans: (B). Zinc oxide formed when zinc burns in air with a greenish-white flame."
    ],
    ceeSpeedFormulas: [
      "Galvanization: Sacrificial anode coating (E° Zn²⁺/Zn = -0.76 V vs Fe²⁺/Fe = -0.44 V)",
      "Lithopone = ZnS + BaSO₄ (white paint pigment that does not blacken in H₂S atmosphere)"
    ],
    ceeTrapAlert: "TRAP: Both Zn and Al dissolve in conc. NaOH releasing H₂ gas, forming sodium zincate (Na₂ZnO₂) and sodium aluminate (NaAlO₂). Zinc is AMPHOTERIC!"
  },
  Ag: {
    ceeHighYieldNotes: "CEE High-Yield: Coinage metal. Lunar caustic is AgNO₃ (stains organic skin black due to reduction to finely divided metallic silver). Photography: AgBr emulsion is used; fixer is hypo (Na₂S₂O₃) forming soluble complex Na₃[Ag(S₂O₃)₂]. Tollen's reagent is ammoniacal silver nitrate [Ag(NH₃)₂]OH, used to test aldehydes via silver mirror.",
    ceePastMcqs: [
      "[CEE 2021] Lunar caustic is: (A) AgCl (B) AgNO₃ (C) Ag₂S (D) Ag₂O -> Ans: (B). Silver nitrate cauterizes tissue and leaves black stain.",
      "[CEE 2018 / IOM] In black-and-white photography, unexposed AgBr is removed by: (A) Water (B) Hypo (Sodium thiosulfate) (C) Alcohol (D) Ammonia -> Ans: (B). AgBr + 2Na₂S₂O₃ → Na₃[Ag(S₂O₃)₂] + NaBr."
    ],
    ceeSpeedFormulas: [
      "Tollen's Test: R-CHO + 2[Ag(NH₃)₂]⁺ + 3OH⁻ → R-COO⁻ + 2Ag↓ (Silver mirror) + 4NH₃ + 2H₂O",
      "Horn silver = AgCl; Argentite = Ag₂S; German silver = Cu (50%) + Zn (30%) + Ni (20%) (contains 0% Silver!)"
    ],
    ceeTrapAlert: "TRAP: German Silver contains ZERO percent silver! It is an alloy of Copper, Zinc, and Nickel!"
  },
  Hg: {
    ceeHighYieldNotes: "CEE High-Yield: Only liquid metal at STP (freezing point -38.8°C). Calomel is Hg₂Cl₂ (non-toxic, purgative); Corrosive Sublimate is HgCl₂ (highly toxic, violent poison). Nessler's reagent is alkaline K₂[HgI₄], gives brown precipitate of Millon's base with NH₃. Minamata disease is organic mercury poisoning.",
    ceePastMcqs: [
      "[CEE 2022 / MBBS] Calomel is chemically: (A) HgCl₂ (B) Hg₂Cl₂ (C) HgS (D) HgO -> Ans: (B). Mercurous chloride Hg₂Cl₂ (contains diatomic Hg₂²⁺ cation).",
      "[CEE 2020] Nessler's reagent used to detect Ammonia is: (A) K₂[HgI₄] in alkaline solution (B) Hg(NO₃)₂ (C) K₂[PtCl₆] (D) [Cu(NH₃)₄]SO₄ -> Ans: (A). Forms brown precipitate of Iodide of Millon's base (H₂N-Hg-O-Hg-I)."
    ],
    ceeSpeedFormulas: [
      "Calomel (Hg₂Cl₂) = non-poisonous vs Corrosive Sublimate (HgCl₂) = extremely poisonous",
      "Cinnabar = HgS (red vermilion, principal ore of mercury)"
    ],
    ceeTrapAlert: "TRAP: Amalgam: Iron, Platinum, and Cobalt do NOT form amalgams with Mercury. Mercury is shipped in IRON flasks!"
  },
  Pb: {
    ceeHighYieldNotes: "CEE High-Yield: Inert pair effect makes Pb²⁺ much more stable than Pb⁴⁺. Consequently, PbO₂ is a powerful oxidizing agent. Red lead (Sindoor) is Pb₃O₄ (trilead tetroxide = 2PbO·PbO₂). Chrome yellow is PbCrO₄. Plumbism is chronic lead poisoning (causes wrist drop, anemia, basophilic stippling).",
    ceePastMcqs: [
      "[CEE 2021] Red lead (Sindoor) is: (A) PbO (B) PbO₂ (C) Pb₃O₄ (D) Pb(NO₃)₂ -> Ans: (C). Mixed oxide 2PbO·PbO₂.",
      "[CEE 2019 / IOM] Why is PbCl₂ stable but PbCl₄ decomposes on heating? (A) High lattice energy (B) Inert pair effect makes Pb²⁺ more stable than Pb⁴⁺ (C) Volatility (D) Hydration energy -> Ans: (B). The 6s² electron pair resists unpairing due to poor shielding of 4f and 5d subshells."
    ],
    ceeSpeedFormulas: [
      "Litharge = PbO (yellow/buff); Sindoor = Pb₃O₄; White lead = 2PbCO₃·Pb(OH)₂ (basic lead carbonate)",
      "Lead storage battery: Pb (anode) + PbO₂ (cathode) + 38% H₂SO₄ (electrolyte, sp gr 1.28)"
    ],
    ceeTrapAlert: "TRAP: PbI₄ does NOT exist because Pb⁴⁺ oxidizes I⁻ to I₂: Pb⁴⁺ + 2I⁻ → Pb²⁺ + I₂!"
  },
  Xe: {
    ceeHighYieldNotes: "CEE High-Yield: First noble gas compound prepared by Neil Bartlett in 1962: Xe⁺[PtF₆]⁻. Fluorides: XeF₂ (linear, sp³d, 3 lone pairs), XeF₄ (square planar, sp³d², 2 lone pairs), XeF₆ (distorted octahedral, sp³d³, 1 lone pair). XeO₃ is pyramidal (sp³). Hydrolysis of XeF₆ gives explosive XeO₃.",
    ceePastMcqs: [
      "[CEE 2022] The shape and hybridization of Xenon Tetrafluoride (XeF₄) is: (A) Tetrahedral, sp³ (B) Square planar, sp³d² (C) Octahedral, sp³d² (D) Trigonal bipyramidal, sp³d -> Ans: (B). 4 bond pairs and 2 axial lone pairs give square planar geometry with sp³d² hybridization.",
      "[CEE 2020 / MBBS] The first noble gas compound prepared by Neil Bartlett was based on the realization that Xe has almost the same ionization energy as: (A) N₂ (B) O₂ (C) Cl₂ (D) He -> Ans: (B). Bartlett prepared O₂⁺[PtF₆]⁻ and realized IE of Xe (1170 kJ/mol) is nearly identical to O₂ (1175 kJ/mol)."
    ],
    ceeSpeedFormulas: [
      "XeF₂ = Linear (sp³d, 3 equatorial lone pairs); XeF₄ = Square planar (sp³d², 2 axial lone pairs)",
      "XeF₆ = Distorted octahedral (sp³d³, 1 lone pair); XeO₃ = Pyramidal (sp³, 1 lone pair, explosive)"
    ],
    ceeTrapAlert: "TRAP: Complete hydrolysis of XeF₆: XeF₆ + 3H₂O → XeO₃ + 6HF. Note that Xe oxidation state remains +6 (NOT a redox reaction)!"
  }
};

// Generic CEE generator for other elements
function generateGenericCeeData(el) {
  const z = el.atomicNumber;
  const sym = el.symbol;
  const name = el.name;
  const blk = el.block;
  const grp = el.group;

  const ceeHighYieldNotes = `CEE High-Yield Entrance Fact: ${name} (${sym}, Z=${z}) belongs to ${blk}-block, Group ${grp}. In entrance exams, questions test periodic trends (electronegativity = ${el.electronegativity ?? "N/A"}, ionization energy = ${el.ionizationEnergy ?? "N/A"} kJ/mol), valence subshell configuration (${el.electronConfig}), and oxidation state stability (${el.oxidationStates}).`;

  const ceePastMcqs = [
    `[CEE / Medical & Engineering Entrance Pattern] What is the total number of valence electrons and primary group location of ${name} (${sym}, Z=${z})? (A) Group ${grp}, ${blk}-block (B) Group ${grp === 18 ? 1 : grp + 1} (C) Period ${el.period + 1} (D) None -> Ans: (A). Ground configuration is ${el.electronConfig} in Period ${el.period}.`,
    `[CEE Periodic Property Question] Which property strictly governs the chemical reactivity of ${name} in Group ${grp}? (A) Effective nuclear charge (Z_eff) and atomic radius (${el.atomicRadiusPm ?? "N/A"} pm) (B) Isotopic neutron count (C) Nuclear mass (D) Room temperature state -> Ans: (A). Chemical behavior and bond strength are governed by Z_eff and valence electron configuration.`
  ];

  const ceeSpeedFormulas = [
    `Valence Configuration: ${el.electronConfig} in ${blk}-block Period ${el.period}`,
    `CEE Rapid Check: Oxidation States = ${el.oxidationStates}; Electronegativity = ${el.electronegativity ?? "N/A"}`
  ];

  const ceeTrapAlert = `TRAP: In multiple-choice questions, verify whether ${sym} is asked in atomic ground state or gaseous ionic state; watch for half-filled/filled stability rules.`;

  return {
    ceeHighYieldNotes,
    ceePastMcqs,
    ceeSpeedFormulas,
    ceeTrapAlert
  };
}

// Load existing all_elements.json and merge CEE data
const jsonPath = path.resolve("public/all_elements.json");
if (!fs.existsSync(jsonPath)) {
  console.error("public/all_elements.json not found!");
  process.exit(1);
}

const elements = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

const updatedElements = elements.map(el => {
  const ceeData = ceeSpecificData[el.symbol] || generateGenericCeeData(el);
  return {
    ...el,
    ...ceeData
  };
});

fs.writeFileSync(jsonPath, JSON.stringify(updatedElements, null, 2), "utf-8");
console.log("Successfully updated public/all_elements.json with CEE Medical & Engineering Entrance Data!");

// Also copy to backend/all_elements.json if needed or verify
