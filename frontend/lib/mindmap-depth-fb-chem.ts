import type { LeafDepth } from "./mindmap-depth";

/** Chemistry fallback leaves (ch-1 … ch-9, ch-o1, ch-o2). */
export const FALLBACK_CHEM_A: Record<string, LeafDepth> = {
  "ch-1": {
    keyFacts: [
      "Bohr's quantisation is a POSTULATE, not a deduction, and it does not survive for multi-electron atoms — which is why quantum numbers replaced it.",
      "Angular-momentum quantisation $mvr = \\frac{nh}{2\\pi}$ implies the orbit's circumference is an integer multiple of the de Broglie wavelength, so the orbit is literally a standing wave.",
      "Electron speed in the $n$-th hydrogen orbit is $v_n = \\frac{c}{137n}$ — the fine-structure constant sets the scale of atomic motion.",
      "Level energies go as $E_n = -13.6\\frac{Z^2}{n^2}$ eV, so every hydrogen line follows from $\\Delta E = 13.6Z^2\\left(\\frac{1}{n_1^2}-\\frac{1}{n_2^2}\\right)$ — the Rydberg formula in one line.",
    ],
    edgeCases: [
      "Bohr's model handles ONLY one-electron species. It is wrong for He, borderline for Li⁺, and fails for all multi-electron atoms because it ignores electron–electron repulsion.",
      "At $n \\to \\infty$ the energy tends to 0 and the atom ionises — that limit IS the definition of ionisation energy.",
      "De Broglie's standing-wave condition applies to CLOSED orbits; a free electron needs no integer quantisation at all.",
      "$a_0 = 0.529$ Å coincides with the quantum model's most probable 1s distance, but the electron is not a tiny planet — the orbital is a probability cloud.",
    ],
    examAsked: [
      "NEB: 'For which species is the Bohr model valid?' — one-electron species only (H, He⁺, Li²⁺).",
      "CEE: 'Why does Bohr's model fail for He?' — it ignores inter-electronic repulsion.",
      "NEB: 'Find the radius and energy of the He⁺ first orbit.' — $a_0/2 = 0.2645$ Å and $-54.4$ eV ($Z = 2$).",
      "CEE: 'Which Balmer line has the longest wavelength?' — the smallest jump, $n = 3 \\to 2$.",
    ],
    commonMistakes: [
      "Applying Bohr's model to He or Li and getting plausible but wrong answers — check the electron count first.",
      "Writing $r_n \\propto n$ when it is $r_n \\propto n^2$, and $E_n \\propto -\\frac{1}{n^2}$.",
      "Using $E_n = -13.6/n^2$ eV for multi-electron atoms; the $Z^2$ factor and shielding change everything.",
      "Confusing absorption (electron climbs) with emission (electron falls): the photon energy is always the level DIFFERENCE, positive either way.",
    ],
  },
  "ch-2": {
    keyFacts: [
      "Effective nuclear charge $Z_{eff} = Z - \\sigma$ explains the whole of periodic trends: radius, ionisation energy and electronegativity all follow from how strongly the outer electrons are felt.",
      "Down a group $Z_{eff}$ rises only slightly while SHELL COUNT rises, so radius increases — shell count, not nuclear charge, dominates.",
      "Across a period $Z_{eff}$ RISES with shells fixed, so radius shrinks, ionisation energy climbs and electronegativity grows — one cause, three trends.",
      "Anomalous IE dips (N > O, Al > Ga) mark half-filled or filled subshell stability beating $Z_{eff}$ — quote the subshell, not the trend line.",
    ],
    edgeCases: [
      "Noble gases are the exception to electronegativity trends: often left UNDEFINED rather than assigned, so 'most electronegative noble gas' is a trap.",
      "Atomic radius is not directly measurable — it is defined operationally (covalent, metallic or van der Waals), and the three give different orders, especially for noble gases.",
      "Lanthanoid contraction cancels the expected radius jump from 4d to 5d, making Zr and Hf nearly identical in size — the classic consequence question.",
      "Electron gain enthalpy is most negative for Cl, NOT F: fluorine's tiny size concentrates electron density and resists the extra electron.",
    ],
    examAsked: [
      "NEB: 'Explain why atomic radius increases down a group.' — each period adds a shell and shielding makes the extra nuclear charge insufficient to pull it in.",
      "CEE: 'Why is $Z_{eff}$ nearly constant down a group?' — added protons are almost exactly cancelled by added shielding.",
      "NEB: 'Why is the first ionisation energy of N greater than O?' — half-filled $2p^3$ is extra stable; O's $2p^4$ electron is easier to remove.",
      "CEE: 'Why are the radii of Zr and Hf almost equal?' — lanthanoid contraction.",
    ],
    commonMistakes: [
      "Saying radius decreases down a group because nuclear charge increases — shells are added too, and that effect wins.",
      "Treating electronegativity as a property of a lone atom. It is defined only for BONDS, which is why noble gases have no value.",
      "Predicting IE from $Z_{eff}$ alone and ignoring subshell anomalies.",
      "Ranking fluorine as the most electron-affine halogen; among halogens it is chlorine.",
    ],
  },
  "ch-3": {
    keyFacts: [
      "Steric number = bonded atoms + lone pairs on the CENTRAL atom. Every VSEPR shape and hybridisation follows from that single number.",
      "Repulsion order LP–LP > LP–BP > BP–BP is why CH₄ 109.5° > NH₃ 107° > H₂O 104.5°.",
      "Hybridisation follows the steric ladder exactly: 2 → sp, 3 → sp², 4 → sp³, 5 → sp³d, 6 → sp³d².",
      "Lone pairs take EQUATORIAL sites in trigonal bipyramidal geometry to minimise 90° repulsions — why SF₄ is seesaw and ClF₃ is T-shaped.",
    ],
    edgeCases: [
      "Electron geometry and molecular shape differ whenever lone pairs are present: XeF₄ has an octahedral electron arrangement but a SQUARE PLANAR shape.",
      "Two electron groups always give a LINEAR shape no matter how many lone pairs exist, so XeF₂ is linear, not bent.",
      "Both SO₂ (steric 3, one lone pair) and H₂O (steric 4, two lone pairs) are called 'bent' yet bond angles differ (~120° vs 104.5°) — same name, different geometry.",
      "Odd-electron species like NO₂ break the octet framing; VSEPR still applies on the steric number.",
    ],
    examAsked: [
      "NEB: 'Shape and hybridisation of XeF₄.' — square planar, $sp^3d^2$.",
      "CEE: 'Steric number and shape of SF₄?' — 5, seesaw.",
      "NEB: 'Give the shape and bond angle of ClF₃.' — T-shaped, slightly under 90° from lone-pair compression.",
      "CEE: 'Why is NH₃'s bond angle 107° but CH₄'s 109.5°?' — the lone pair squeezes the bond pairs.",
    ],
    commonMistakes: [
      "Counting lone pairs on all atoms rather than only the central atom.",
      "Naming the shape after the number of ATOMS instead of after the electron groups.",
      "Counting lone pairs for the shape but forgetting them for hybridisation (or the reverse).",
      "Applying VSEPR to delocalised π systems where the localised-pair assumption breaks.",
    ],
  },
  "ch-4": {
    keyFacts: [
      "Hydrogen bonding is the only intermolecular force that is genuinely DIRECTIONAL, which is why it raises boiling point so sharply and can even build a network.",
      "Ice is LESS DENSE than liquid water because hydrogen bonds lock molecules into an open hexagonal lattice — the anomaly that lets lakes freeze top-down.",
      "Dipole moment $\\mu = q \\times d$ is a VECTOR: molecular symmetry decides whether bond dipoles cancel (CO₂ nonpolar, H₂O polar).",
      "Ortho-nitrophenol is steam-volatile because it H-bonds INTRAmolecularly; the para form intermolecularly — the classic separation application.",
    ],
    edgeCases: [
      "Hydrogen bonding needs H bonded to N, O or F AND a lone pair on the acceptor. C–H is too weakly polar, so hydrocarbons do not show the effect.",
      "One hydrogen bond is only 5–10% of a covalent bond, but thousands acting cooperatively in water produce the very high observed boiling point.",
      "HF makes the strongest individual H-bonds yet boils BELOW water: each HF donates one bond while water averages two per molecule in its network.",
      "Second-period hydrides break the mass trend (H₂O > HF > NH₃ > CH₄) — that anomaly IS the hydrogen-bond signature.",
    ],
    examAsked: [
      "NEB: 'Why does H₂O boil higher than H₂S despite a lower molar mass?' — hydrogen bonding beats H₂S's weaker dipole–dipole forces.",
      "CEE: 'Why is ice less dense than water?' — the open hydrogen-bonded lattice.",
      "NEB: 'Why is HF a liquid but HCl a gas at room temperature?' — hydrogen bonding in HF.",
      "CEE: 'Why is CO₂ nonpolar despite polar C=O bonds?' — the dipoles cancel by linearity.",
    ],
    commonMistakes: [
      "Calling hydrogen bonding a strong covalent bond; it is an intermolecular force, 5–10% as strong.",
      "Assuming every compound with a hydrogen hydrogen-bonds — it needs H on N, O or F.",
      "Comparing nonpolar boiling points by polarity; for them London forces and molar mass dominate.",
      "Drawing the H-bond as a covalent bond: the covalent O–H comes first, the dotted bond goes to the acceptor's lone pair.",
    ],
  },
  "ch-5": {
    keyFacts: [
      "$\\Delta G = \\Delta H - T\\Delta S$ decides spontaneity; the sign of $\\Delta G$ says nothing about SPEED, only about whether the reaction proceeds on its own.",
      "At $\\Delta G = 0$ the system is at equilibrium, giving $T = \\frac{\\Delta H}{\\Delta S}$ — a favourite short question.",
      "$\\Delta G^\\circ = -RT\\ln K$ links standard free energy to the equilibrium constant: negative $\\Delta G^\\circ$ means $K > 1$.",
      "In electrochemistry the same quantity wears another hat: $\\Delta G^\\circ = -nFE^\\circ_{cell}$.",
    ],
    edgeCases: [
      "$\\Delta G < 0$ does NOT mean fast: a large activation energy makes a thermodynamically favoured reaction kinetically inert, as with diamond → graphite.",
      "A reaction non-spontaneous at 25 °C can become spontaneous above $T = \\frac{\\Delta H}{\\Delta S}$, so 'spontaneous' is not a fixed property.",
      "Endothermic reactions with $\\Delta S > 0$ run only ABOVE their crossover temperature — the sign of $\\Delta S$ sets which side works.",
      "Standard $\\Delta G^\\circ$ fixes the state; the actual direction follows $\\Delta G = \\Delta G^\\circ + RT\\ln Q$.",
    ],
    examAsked: [
      "NEB: 'At what temperature does a reaction with $\\Delta H = 100$ kJ, $\\Delta S = 100$ J K⁻¹ change character?' — 1000 K.",
      "CEE: 'Is a reaction with negative $\\Delta G$ necessarily fast?' — no, kinetics is separate.",
      "NEB: 'Relate standard free energy to the equilibrium constant.' — $\\Delta G^\\circ = -RT\\ln K$.",
      "CEE: 'Why does ice melt above 0 °C?' — $T\\Delta S$ overtakes $\\Delta H$ and $\\Delta G$ turns negative.",
    ],
    commonMistakes: [
      "Saying spontaneity means the reaction is instantaneous.",
      "Mixing kJ with J K⁻¹ without converting, which makes $T$ wrong by a factor of 1000.",
      "Putting $T$ in °C into $\\Delta H - T\\Delta S$ instead of kelvin.",
      "Reading $\\Delta G^\\circ < 0$ as 'the reaction always goes'; a large $Q$ can still make actual $\\Delta G$ positive.",
    ],
  },
  "ch-6": {
    keyFacts: [
      "Le Chatelier's principle is QUALITATIVE: it predicts the direction of shift but never the size of the effect.",
      "$K_p = K_c (RT)^{\\Delta n_g}$, where $\\Delta n_g$ counts only GASEOUS moles — a distinction that decides the whole answer.",
      "Temperature is the ONLY stress that changes K itself; concentration, pressure and catalysts shift or speed the system without touching K.",
      "For an exothermic reaction K DECREASES on heating — the Van 't Hoff relation gives both direction and size.",
    ],
    edgeCases: [
      "Pressure shifts equilibrium only when $\\Delta n_g \\ne 0$. In $\\ce{H2 + I2 <=> 2HI}$ compression has NO effect.",
      "Adding an INERT gas at constant volume does nothing; at constant pressure it shifts toward the side with more gas moles. The same addition can do opposite things depending on the constraint.",
      "A catalyst changes NEITHER the equilibrium position NOR $\\Delta G^\\circ$; it only lowers the activation energy.",
      "Continuously removing a product (condensing water, precipitating a salt) drives the reaction to completion — the industrial lever of Le Chatelier.",
    ],
    examAsked: [
      "NEB: 'For $\\ce{N2 + 3H2 <=> 2NH3}$, what happens on increasing pressure and on adding a catalyst?' — shifts right; catalyst has no effect on position.",
      "CEE: 'Does a catalyst change the equilibrium constant?' — no.",
      "NEB: 'What happens to K when an exothermic equilibrium is heated?' — it decreases.",
      "CEE: 'Why does compressing $\\ce{H2 + I2 <=> 2HI}$ not shift it?' — $\\Delta n_g = 0$.",
    ],
    commonMistakes: [
      "Saying a catalyst shifts equilibrium forward by speeding the forward reaction. It speeds BOTH equally.",
      "Applying the pressure rule without checking $\\Delta n_g$.",
      "Counting solids or pure liquids in $\\Delta n_g$ — gases only.",
      "Writing $K_p = K_c(RT)^{\\Delta n}$ with $\\Delta n$ taken over all phases instead of gaseous moles.",
    ],
  },
  "ch-7": {
    keyFacts: [
      "The inert pair effect is a RELAY of the $ns^2$ pair in heavy p-block elements, so the lower oxidation state (+1, +2) stabilises while the higher (+3, +5) becomes unstable.",
      "Down groups 13–15 the stability of the +3, +4, +5 states DECREASES — the single trend behind $\\ce{PbO2}$ being a strong oxidant while $\\ce{SnO2}$ is not.",
      "The stability ladder $\\ce{Tl+ > Tl3+}$, $\\ce{Pb2+ > Pb4+}$, $\\ce{Bi3+ > Bi5+}$ is the effect written as a rule — quote it directly in trend questions.",
      "Lower states grow stronger as reducing agents up the group: $\\ce{Sn2+}$ reduces mildly, while $\\ce{Pb2+}$ and $\\ce{Tl+}$ are quite stable.",
    ],
    edgeCases: [
      "The effect is only significant for HEAVY elements; in the first members of each group the higher oxidation state is perfectly stable, so 'inert pair always applies' is wrong.",
      "It is a p-block phenomenon. d-block and s-block show no such general trend.",
      "$\\ce{Pb3O4}$ (red lead) is a mixed oxide $2\\ce{PbO}\\cdot\\ce{PbO2}$ — the inert pair hiding inside a stoichiometry question.",
      "The underlying cause is relativistic stabilisation of the 6s² pair, not electronegativity.",
    ],
    examAsked: [
      "NEB: 'Why is $\\ce{PbO2}$ a strong oxidising agent but $\\ce{SnO2}$ not?' — the +2 state is stabilised, so +2 → +4 oxidation is easy for Pb.",
      "CEE: 'Give the stable oxidation state of Tl.' — +1.",
      "NEB: 'Why does $\\ce{BiCl5}$ not exist while $\\ce{BiCl3}$ does?' — the +5 state is inert-pair unstable.",
      "CEE: 'Oxidation states of Pb in $\\ce{Pb3O4}$?' — +2 and +4 in a 2:1 ratio.",
    ],
    commonMistakes: [
      "Applying the inert pair effect to the first three members of a group where it is negligible.",
      "Generalising it to transition metals.",
      "Explaining it by electronegativity instead of relativistic 6s stabilisation.",
      "Writing $\\ce{PbO2}$ as basic; it is acidic and strongly oxidising.",
    ],
  },
  "ch-8": {
    keyFacts: [
      "Amphoterism means a species reacts with BOTH acid and base, and the product depends on which reagent is in excess.",
      "$\\ce{Al2O3}$ and $\\ce{ZnO}$ are the classic amphoteric oxides; $\\ce{Na2O}$ is basic and $\\ce{CO2}$ acidic.",
      "BeO is amphoteric though beryllium is s-block — the diagonal relationship with aluminium, the classic 'exception to block trends' question.",
      "Cr₂O₃, PbO and SnO widen the example list; knowing three beyond Al₂O₃/ZnO wins the 'give examples' marks.",
    ],
    edgeCases: [
      "Amphoteric behaviour is CONDITION-dependent: $\\ce{AlCl3}$ is acidic in water but gives $\\ce{[Al(OH)4]^-}$ in excess alkali.",
      "An amphoteric hydroxide dissolves in BOTH NaOH and HCl, giving a salt in each case — dual solubility is the definition test.",
      "The two products differ: with acid, the aqua ion $\\ce{[Al(H2O)6]^3+}$; with alkali, the aluminate $\\ce{[Al(OH)4]^-}$ — different complex ions, not one 'salt'.",
      "Amphoteric hydroxides show minimum solubility at a characteristic pH — the basis of selective precipitation in salt analysis.",
    ],
    examAsked: [
      "NEB: 'Write the reactions of ZnO with acid and with alkali.' — $\\ce{ZnO + 2HCl -> ZnCl2 + H2O}$ and $\\ce{ZnO + 2NaOH -> Na2ZnO2 + H2O}$.",
      "CEE: 'Which is amphoteric: MgO, Al2O3, Na2O, CO2?' — Al₂O₃ only.",
      "NEB: 'Show the amphoteric nature of $\\ce{Al(OH)3}$ with equations.' — with HCl → $\\ce{AlCl3}$; with NaOH → $\\ce{Na[Al(OH)4]}$.",
      "CEE: 'Which hydroxides dissolve in both acid and alkali?' — amphoteric: Al, Zn, Pb, Sn, Be, Cr.",
    ],
    commonMistakes: [
      "Classifying $\\ce{BeO}$ as basic; it is amphoteric, and MORE strongly so than $\\ce{Al2O3}$.",
      "Forgetting that excess reagent changes the product.",
      "Calling the aluminium METAL amphoteric — the term belongs to its oxide/hydroxide.",
      "Balancing the alkali reaction without forming the aluminate ion $\\ce{[Al(OH)4]^-}$.",
    ],
  },
  "ch-9": {
    keyFacts: [
      "In the blast furnace iron is reduced in STAGES through FeO and $\\ce{Fe3O4}$ before reaching metal, and the stage reached determines the iron's quality.",
      "Slag is $\\ce{CaSiO3}$ from the deliberately added limestone flux, whose job is to REMOVE silica as a molten, easily floated slag — fluxing, not heating.",
      "The furnace runs COUNTERCURRENT: hot gases rise as the charge descends, so reduction stages map onto temperature zones — the zone answer wins full marks.",
      "Haematite is $\\ce{Fe2O3}$, magnetite $\\ce{Fe3O4}$; carbonate/hydrated ores are calcined, sulphide ores roasted.",
    ],
    edgeCases: [
      "Carbon is a stronger reducing agent than iron above about 700 °C, which is why carbon can reduce FeO directly at all.",
      "Wrought iron (low carbon) and pig iron (high carbon) come from the same ore; steel is an intermediate carbon content.",
      "Above ~700 °C the Boudouard reaction $\\ce{C + CO2 -> 2CO}$ makes CO the actual reducing agent in the upper zones — carbon's role is indirect.",
      "Slag does double duty: it removes impurities AND shields the molten iron from re-oxidation.",
    ],
    examAsked: [
      "NEB: 'Why is limestone added in a blast furnace?' — as a flux to convert silica impurity into fusible slag.",
      "CEE: 'Write the reaction of FeO with CO.' — $\\ce{FeO + CO -> Fe + CO2}$.",
      "NEB: 'Which zone produces the iron?' — the fusion zone (~1100–1200 °C) where FeO is reduced by CO.",
      "CEE: 'Distinguish calcination and roasting.' — calcination: carbonate/hydrated ore, limited air; roasting: sulphide ore, excess air.",
    ],
    commonMistakes: [
      "Saying slag IS the impurity. Slag is the fluxed, purified product floated off.",
      "Confusing cast iron, wrought iron and steel by carbon content.",
      "Writing Fe₂O₃'s reduction by carbon at every zone; the upper zones use CO.",
      "Mixing up the flux (limestone) and the reducing agent (coke).",
    ],
  },
  "ch-o1": {
    keyFacts: [
      "Inductive effect works through the σ framework; hyperconjugation works through σ(C–H) orbitals overlapping a π system — two mechanisms, same direction of effect.",
      "Both explain why a donating group stabilises a POSITIVE charge and destabilises a NEGATIVE one, so carbocation and carbanion stability orderings are mirror images.",
      "Where resonance ($\\pm M$) is available it BEATS induction: a $-M$ group overrides a $+I$ donor in anion-stability questions.",
      "Hyperconjugation also drives alkene stability: more α-H → more stable alkene — the engine behind Zaitsev's rule.",
    ],
    edgeCases: [
      "The $-I$ effect weakens down a group as bond length grows, so Cl is a stronger $-I$ than I despite iodine being larger and more polarisable.",
      "Hyperconjugation needs at least one α-C–H bond, so $tert$-butyl (nine) is strongest and a carbon with no α-H shows none.",
      "The inductive effect fades fast with distance — by the third carbon away it is nearly gone (2-chlorobutanoic acid ≫ 4-chlorobutanoic in strength).",
      "On benzene rings $-I$ groups direct meta while $-M$ groups direct ortho/para — the director table falls out of these two effects.",
    ],
    examAsked: [
      "NEB: 'Arrange $\\ce{CH3+}$, $\\ce{CH3CH2+}$, $\\ce{(CH3)3C+}$ in order of stability.' — $tert$-butyl > ethyl > methyl.",
      "CEE: 'Why does $\\ce{-NO2}$ stabilise an anion while $\\ce{-CH3}$ destabilises it?' — $-I$ versus $+I$.",
      "NEB: 'Why is chloroacetic acid stronger than acetic acid?' — the $-I$ of Cl stabilises the carboxylate anion.",
      "CEE: 'Arrange but-1-ene, cis- and trans-but-2-ene by stability.' — trans > cis > terminal (hyperconjugation + sterics).",
    ],
    commonMistakes: [
      "Claiming a larger halogen has a stronger $-I$ effect; it weakens down the group.",
      "Saying hyperconjugation involves π bonds — it involves σ(C–H) bonds and the vacant p orbital.",
      "Assigning hyperconjugation to $\\ce{+CH3}$ — with no α-H there is nothing to donate.",
      "Ranking acid strength by H–A bond polarity alone; anion stability decides.",
    ],
  },
  "ch-o2": {
    keyFacts: [
      "The IUPAC longest-chain rule is absolute: the parent is the chain with the MOST carbons, even if that means fewer visible substituents.",
      "Isomers must differ in connectivity or spatial arrangement; two drawings differing only in paper layout are the SAME compound.",
      "Tie-break order for equal-length chains: more substituents → lowest locant set → alphabetical naming.",
      "Common groups (isopropyl, tert-butyl) are allowed in PARENTHESES beside systematic names — the accepted hybrid nomenclature.",
    ],
    edgeCases: [
      "Numbering gives the LOWEST LOCANT SET, not the lowest single locant: 2,3,4 beats 3,4,5 even though 3 < 4 first.",
      "C₄H₁₀ has only 2 isomers, not 4, because a 4-carbon and a 3-carbon chain are the only options and each has one unique numbering.",
      "Ring vs chain: the larger unit is the parent — cyclohexane parent under butylcyclohexane, but hexylcyclopentane when the chain wins.",
      "Functional-group priority outranks chain length: the suffix follows the highest-priority group even if the parent chain shortens.",
    ],
    examAsked: [
      "NEB: 'Draw and name all isomers of C₅H₁₂.' — pentane, 2-methylbutane, 2,2-dimethylpropane.",
      "CEE: 'Why are the isomers of C₄H₁₀ only two?' — only 4- and 3-carbon chains exist.",
      "NEB: 'Name $\\ce{CH3-CH(CH3)-CH2-CH3}$.' — 2-methylbutane.",
      "CEE: 'Name a chain bearing both –OH and –COOH.' — the acid wins: suffix -oic acid, the OH named as hydroxy-.",
    ],
    commonMistakes: [
      "Choosing the shortest chain carrying the most substituents instead of the longest chain.",
      "Renumbering the same molecule from the other end and reporting it as a new name.",
      "Numbering toward the nearest substituent rather than minimising the whole locant SET.",
      "Listing substituents in order of appearance instead of alphabetically.",
    ],
  },
};
