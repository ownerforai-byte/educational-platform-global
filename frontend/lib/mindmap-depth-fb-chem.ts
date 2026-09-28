import type { LeafDepth } from "./mindmap-depth";

/** Chemistry fallback leaves (ch-1 … ch-5). */
export const FALLBACK_CHEM_A: Record<string, LeafDepth> = {
  "ch-1": {
    keyFacts: [
      "Bohr's quantisation is a POSTULATE, not a deduction, and it does not survive for multi-electron atoms — which is why quantum numbers replaced it.",
      "Angular-momentum quantisation $mvr = \\frac{nh}{2\\pi}$ implies the orbit's circumference is an integer multiple of the de Broglie wavelength, so the orbit is literally a standing wave.",
    ],
    edgeCases: [
      "Bohr's model handles ONLY one-electron species. It is wrong for He, borderline for Li⁺, and fails for all multi-electron atoms because it ignores electron–electron repulsion.",
      "At $n \\to \\infty$ the energy tends to 0 and the atom ionises — that limit IS the definition of ionisation energy.",
    ],
    examAsked: [
      "NEB: 'For which species is the Bohr model valid?' — one-electron species only (H, He⁺, Li²⁺).",
      "CEE: 'Why does Bohr's model fail for He?' — it ignores inter-electronic repulsion.",
    ],
    commonMistakes: [
      "Applying Bohr's model to He or Li and getting plausible but wrong answers — check the electron count first.",
      "Writing $r_n \\propto n$ when it is $r_n \\propto n^2$, and $E_n \\propto -\\frac{1}{n^2}$.",
    ],
  },
  "ch-2": {
    keyFacts: [
      "Effective nuclear charge $Z_{eff} = Z - \\sigma$ explains the whole of periodic trends: radius, ionisation energy and electronegativity all follow from how strongly the outer electrons are felt.",
      "Down a group $Z_{eff}$ rises only slightly while SHELL COUNT rises, so radius increases — shell count, not nuclear charge, dominates.",
    ],
    edgeCases: [
      "Noble gases are the exception to electronegativity trends: often left UNDEFINED rather than assigned, so 'most electronegative noble gas' is a trap.",
      "Atomic radius is not directly measurable — it is defined operationally (covalent, metallic or van der Waals), and the three give different orders, especially for noble gases.",
    ],
    examAsked: [
      "NEB: 'Explain why atomic radius increases down a group.' — each period adds a shell and shielding makes the extra nuclear charge insufficient to pull it in.",
      "CEE: 'Why is $Z_{eff}$ nearly constant down a group?' — added protons are almost exactly cancelled by added shielding.",
    ],
    commonMistakes: [
      "Saying radius decreases down a group because nuclear charge increases — shells are added too, and that effect wins.",
      "Treating electronegativity as a property of a lone atom. It is defined only for BONDS, which is why noble gases have no value.",
    ],
  },
  "ch-3": {
    keyFacts: [
      "Steric number = bonded atoms + lone pairs on the CENTRAL atom. Every VSEPR shape and hybridisation follows from that single number.",
      "Repulsion order LP–LP > LP–BP > BP–BP is why CH₄ 109.5° > NH₃ 107° > H₂O 104.5°.",
    ],
    edgeCases: [
      "Electron geometry and molecular shape differ whenever lone pairs are present: XeF₄ has an octahedral electron arrangement but a SQUARE PLANAR shape.",
      "Two electron groups always give a LINEAR shape no matter how many lone pairs exist, so XeF₂ is linear, not bent.",
    ],
    examAsked: [
      "NEB: 'Shape and hybridisation of XeF₄.' — square planar, $sp^3d^2$.",
      "CEE: 'Steric number and shape of SF₄?' — 5, seesaw.",
    ],
    commonMistakes: [
      "Counting lone pairs on all atoms rather than only the central atom.",
      "Naming the shape after the number of ATOMS instead of after the electron groups.",
    ],
  },
  "ch-4": {
    keyFacts: [
      "Hydrogen bonding is the only intermolecular force that is genuinely DIRECTIONAL, which is why it raises boiling point so sharply and can even build a network.",
      "Ice is LESS DENSE than liquid water because hydrogen bonds lock molecules into an open hexagonal lattice — the anomaly that lets lakes freeze top-down.",
    ],
    edgeCases: [
      "Hydrogen bonding needs H bonded to N, O or F AND a lone pair on the acceptor. C–H is too weakly polar, so hydrocarbons do not show the effect.",
      "One hydrogen bond is only 5–10% of a covalent bond, but thousands acting cooperatively in water produce the very high observed boiling point.",
    ],
    examAsked: [
      "NEB: 'Why does H₂O boil higher than H₂S despite a lower molar mass?' — hydrogen bonding beats H₂S's weaker dipole–dipole forces.",
      "CEE: 'Why is ice less dense than water?' — the open hydrogen-bonded lattice.",
    ],
    commonMistakes: [
      "Calling hydrogen bonding a strong covalent bond; it is an intermolecular force, 5–10% as strong.",
      "Assuming every compound with a hydrogen hydrogen-bonds — it needs H on N, O or F.",
    ],
  },
  "ch-5": {
    keyFacts: [
      "$\\Delta G = \\Delta H - T\\Delta S$ decides spontaneity; the sign of $\\Delta G$ says nothing about SPEED, only about whether the reaction proceeds on its own.",
      "At $\\Delta G = 0$ the system is at equilibrium, giving $T = \\frac{\\Delta H}{\\Delta S}$ — a favourite short question.",
    ],
    edgeCases: [
      "$\\Delta G < 0$ does NOT mean fast: a large activation energy makes a thermodynamically favoured reaction kinetically inert, as with diamond → graphite.",
      "A reaction non-spontaneous at 25 °C can become spontaneous above $T = \\frac{\\Delta H}{\\Delta S}$, so 'spontaneous' is not a fixed property.",
    ],
    examAsked: [
      "NEB: 'At what temperature does a reaction with $\\Delta H = 100$ kJ, $\\Delta S = 100$ J K⁻¹ change character?' — 1000 K.",
      "CEE: 'Is a reaction with negative $\\Delta G$ necessarily fast?' — no, kinetics is separate.",
    ],
    commonMistakes: [
      "Saying spontaneity means the reaction is instantaneous.",
      "Mixing kJ with J K⁻¹ without converting, which makes $T$ wrong by a factor of 1000.",
    ],
  },
  "ch-6": {
    keyFacts: [
      "Le Chatelier's principle is QUALITATIVE: it predicts the direction of shift but never the size of the effect.",
      "$K_p = K_c (RT)^{\\Delta n_g}$, where $\\Delta n_g$ counts only GASEOUS moles — a distinction that decides the whole answer.",
    ],
    edgeCases: [
      "Pressure shifts equilibrium only when $\\Delta n_g \\ne 0$. In $\\ce{H2 + I2 <=> 2HI}$ compression has NO effect.",
      "Adding an INERT gas at constant volume does nothing; at constant pressure it shifts toward the side with more gas moles. The same addition can do opposite things depending on the constraint.",
      "A catalyst changes NEITHER the equilibrium position NOR $\\Delta G^\\circ$; it only lowers the activation energy.",
    ],
    examAsked: [
      "NEB: 'For $\\ce{N2 + 3H2 <=> 2NH3}$, what happens on increasing pressure and on adding a catalyst?' — shifts right; catalyst has no effect on position.",
      "CEE: 'Does a catalyst change the equilibrium constant?' — no.",
    ],
    commonMistakes: [
      "Saying a catalyst shifts equilibrium forward by speeding the forward reaction. It speeds BOTH equally.",
      "Applying the pressure rule without checking $\\Delta n_g$.",
    ],
  },
  "ch-7": {
    keyFacts: [
      "The inert pair effect is a RELAY of the $ns^2$ pair in heavy p-block elements, so the lower oxidation state (+1, +2) stabilises while the higher (+3, +5) becomes unstable.",
      "Down groups 13–15 the stability of the +3, +4, +5 states DECREASES — the single trend behind $\\ce{PbO2}$ being a strong oxidant while $\\ce{SnO2}$ is not.",
    ],
    edgeCases: [
      "The effect is only significant for HEAVY elements; in the first members of each group the higher oxidation state is perfectly stable, so 'inert pair always applies' is wrong.",
      "It is a p-block phenomenon. d-block and s-block show no such general trend.",
    ],
    examAsked: [
      "NEB: 'Why is $\\ce{PbO2}$ a strong oxidising agent but $\\ce{SnO2}$ not?' — the +2 state is stabilised, so +2 → +4 oxidation is easy for Pb.",
      "CEE: 'Give the stable oxidation state of Tl.' — +1.",
    ],
    commonMistakes: [
      "Applying the inert pair effect to the first three members of a group where it is negligible.",
      "Generalising it to transition metals.",
    ],
  },
  "ch-8": {
    keyFacts: [
      "Amphoterism means a species reacts with BOTH acid and base, and the product depends on which reagent is in excess.",
      "$\\ce{Al2O3}$ and $\\ce{ZnO}$ are the classic amphoteric oxides; $\\ce{Na2O}$ is basic and $\\ce{CO2}$ acidic.",
    ],
    edgeCases: [
      "Amphoteric behaviour is CONDITION-dependent: $\\ce{AlCl3}$ is acidic in water but gives $\\ce{[Al(OH)4]^-}$ in excess alkali.",
      "An amphoteric hydroxide dissolves in BOTH NaOH and HCl, giving a salt in each case — dual solubility is the definition test.",
    ],
    examAsked: [
      "NEB: 'Write the reactions of ZnO with acid and with alkali.' — $\\ce{ZnO + 2HCl -> ZnCl2 + H2O}$ and $\\ce{ZnO + 2NaOH -> Na2ZnO2 + H2O}$.",
      "CEE: 'Which is amphoteric: MgO, Al2O3, Na2O, CO2?' — Al₂O₃ only.",
    ],
    commonMistakes: [
      "Classifying $\\ce{BeO}$ as basic; it is amphoteric, and MORE strongly so than $\\ce{Al2O3}$.",
      "Forgetting that excess reagent changes the product.",
    ],
  },
  "ch-9": {
    keyFacts: [
      "In the blast furnace iron is reduced in STAGES through FeO and $\\ce{Fe3O4}$ before reaching metal, and the stage reached determines the iron's quality.",
      "Slag is $\\ce{CaSiO3}$ from the deliberately added limestone flux, whose job is to REMOVE silica as a molten, easily floated slag — fluxing, not heating.",
    ],
    edgeCases: [
      "Carbon is a stronger reducing agent than iron above about 700 °C, which is why carbon can reduce FeO directly at all.",
      "Wrought iron (low carbon) and pig iron (high carbon) come from the same ore; steel is an intermediate carbon content.",
    ],
    examAsked: [
      "NEB: 'Why is limestone added in a blast furnace?' — as a flux to convert silica impurity into fusible slag.",
      "CEE: 'Write the reaction of FeO with CO.' — $\\ce{FeO + CO -> Fe + CO2}$.",
    ],
    commonMistakes: [
      "Saying slag IS the impurity. Slag is the fluxed, purified product floated off.",
      "Confusing cast iron, wrought iron and steel by carbon content.",
    ],
  },
  "ch-o1": {
    keyFacts: [
      "Inductive effect works through the σ framework; hyperconjugation works through σ(C–H) orbitals overlapping a π system — two mechanisms, same direction of effect.",
      "Both explain why a donating group stabilises a POSITIVE charge and destabilises a NEGATIVE one, so carbocation and carbanion stability orderings are mirror images.",
    ],
    edgeCases: [
      "The $-I$ effect weakens down a group as bond length grows, so Cl is a stronger $-I$ than I despite iodine being larger and more polarisable.",
      "Hyperconjugation needs at least one α-C–H bond, so $tert$-butyl (nine) is strongest and a carbon with no α-H shows none.",
    ],
    examAsked: [
      "NEB: 'Arrange $\\ce{CH3+}$, $\\ce{CH3CH2+}$, $\\ce{(CH3)3C+}$ in order of stability.' — $tert$-butyl > ethyl > methyl.",
      "CEE: 'Why does $\\ce{-NO2}$ stabilise an anion while $\\ce{-CH3}$ destabilises it?' — $-I$ versus $+I$.",
    ],
    commonMistakes: [
      "Claiming a larger halogen has a stronger $-I$ effect; it weakens down the group.",
      "Saying hyperconjugation involves π bonds — it involves σ(C–H) bonds and the vacant p orbital.",
    ],
  },
  "ch-o2": {
    keyFacts: [
      "The IUPAC longest-chain rule is absolute: the parent is the chain with the MOST carbons, even if that means fewer visible substituents.",
      "Isomers must differ in connectivity or spatial arrangement; two drawings differing only in paper layout are the SAME compound.",
    ],
    edgeCases: [
      "Numbering gives the LOWEST LOCANT SET, not the lowest single locant: 2,3,4 beats 3,4,5 even though 3 < 4 first.",
      "C₄H₁₀ has only 2 isomers, not 4, because a 4-carbon and a 3-carbon chain are the only options and each has one unique numbering.",
    ],
    examAsked: [
      "NEB: 'Draw and name all isomers of C₅H₁₂.' — pentane, 2-methylbutane, 2,2-dimethylpropane.",
      "CEE: 'Why are the isomers of C₄H₁₀ only two?' — only 4- and 3-carbon chains exist.",
    ],
    commonMistakes: [
      "Choosing the shortest chain carrying the most substituents instead of the longest chain.",
      "Renumbering the same molecule from the other end and reporting it as a new name.",
    ],
  },
};
