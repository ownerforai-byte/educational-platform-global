import type { UnitDepth } from "./mindmap-depth";

/** Stoichiometry — mole, limiting reagent, concentration. */
export const STOICH_DEPTH: Record<string, UnitDepth> = {
  stoichiometry: {
    unitFacts: [
      "The mole is a COUNTING unit like a dozen, not a mass: it counts 6.02214076 × 10²³ entities exactly, and that number is now fixed by SI rather than measured.",
      "Stoichiometry is nothing but bookkeeping — the coefficients in a balanced equation are the ONLY conversion factors permitted, and they are exact integers, never rounded.",
    ],
    unitEdgeCases: [
      "Molar volume is 22.4 L mol⁻¹ ONLY at STP (0 °C, 1 atm). At room conditions it is about 24 L mol⁻¹, and quoting 22.4 without the condition is a frequent mark loss.",
      "Molarity changes with temperature (a solution expands) but MOLALITY does not, because molality depends on solvent MASS. This is exactly why boiling-point and freezing-point work is done in molality.",
    ],
    unitExamAsked: [
      "NEB: 'Find the mass of NaCl needed to make 5 L of 0.2 M solution.' — $5 \\times 0.2 = 1$ mol, so $58.5$ g.",
      "CEE: 'Why is the stoichiometric ratio $\\tfrac{3}{2}$ valid only if the reactants are actually mixed in that ratio?' — otherwise one is in excess and limits the yield.",
    ],
    unitCommonMistakes: [
      "Balancing the equation only on carbon, forgetting H and O. Every element must balance, and an unbalanced equation makes every downstream number meaningless.",
      "Converting grams to moles at the wrong step. Convert to moles FIRST, use the ratio, then convert back — never mix grams with moles in the same line.",
    ],
    leaves: {
      "uc-st-1": {
        keyFacts: [
          "One mole is defined as exactly $6.02214076\\times10^{23}$ entities — the 2019 SI redefinition made this exact, like the metre and the mole itself.",
          "The molar mass numerically equals the atomic/molecular mass in unified atomic mass units: $M(\\text{H}_2\\text{O}) = 18\\,\\text{g mol}^{-1}$ because $M_r = 18$.",
        ],
        edgeCases: [
          "The mole applies to ANY countable entity — atoms, molecules, ions, electrons, formula units — and '1 mol of atoms' and '1 mol of molecules' are different amounts of mass for different substances.",
          "Moles of electrons matter too: 1 mol of electrons carries 96 485 C, and that is the Faraday, which links all of electrochemistry back to this unit.",
        ],
        examAsked: [
          "NEB: 'Calculate the number of molecules in 4.4 g of CO₂.' — $4.4/44 = 0.1$ mol, so $0.1 \\times 6.022\\times10^{23} = 6.022\\times10^{22}$ molecules.",
          "CEE: 'Define the mole in terms of Avogadro number.' — the amount containing exactly $6.02214076\\times10^{23}$ elementary entities.",
        ],
        commonMistakes: [
          "Using the atomic mass for a molecular substance: 18 g of water is 1 mol of molecules (18 g mol⁻¹) but contains 2 mol of H atoms and about 1.1 mol of H₂O molecules' worth of H₂O units. Match the entity to the formula.",
          "Writing 'mole = 6.022 × 10²³' without 'entities' or 'particles', which loses the defining word.",
        ],
      },
      "uc-st-2": {
        keyFacts: [
          "At STP, 1 mol of ANY ideal gas occupies 22.4 L — the volume is independent of the gas identity, which is Avogadro's law in volume form.",
          "For an ideal gas $V_m = \\frac{RT}{P}$, so volume scales with absolute temperature and inversely with pressure.",
        ],
        edgeCases: [
          "22.4 L mol⁻¹ holds at 273.15 K and 1 atm only. At 298 K and 1 atm it is 24.0 L mol⁻¹ — using 22.4 at room temperature is the classic STP trap.",
          "For REAL gases the volume depends on the gas (van der Waals corrections). Only at low pressure and high temperature is 22.4 L a good approximation, which is why gases must be cooled before 'measuring' their moles by volume.",
        ],
        examAsked: [
          "NEB: 'What volume does 5.6 g of N₂ occupy at STP?' — $5.6/28 = 0.2$ mol, so $0.2 \\times 22.4 = 4.48$ L.",
          "CEE: 'At 300 K and 1 atm, find the molar volume of an ideal gas.' — $V_m = RT/P \\approx 24.6$ L mol⁻¹.",
        ],
        commonMistakes: [
          "Quoting 22.4 L without stating STP. Write 'at STP, $V_m = 22.4$ L mol⁻¹' so the condition travels with the number.",
          "Using 22.4 for a gas at 25 °C, producing an answer about 7% too small.",
        ],
      },
      "uc-st-3": {
        keyFacts: [
          "The limiting reagent is the one with the SMALLEST value of $\\frac{n}{\\text{coefficient}}$ — divide moles by the stoichiometric coefficient, never compare moles alone.",
          "The other reagent is in EXCESS, and the amount in excess is found by back-substitution from the product, not by subtracting moles directly.",
        ],
        edgeCases: [
          "When two reagents tie exactly, neither is limiting; the mixture is stoichiometric and both are consumed completely — an 'exact' case that breaks the usual single-answer habit.",
          "Adding extra of an already non-limiting reagent changes nothing about the yield, so a reaction can be 'excess-loaded' indefinitely with no effect on product.",
        ],
        examAsked: [
          "NEB: 'For 10 g Na and 10 g S, which is limiting and what mass of Na₂S forms?' — $n(\\text{Na}) = 0.435$, $n(\\text{S}) = 0.312$; with $2\\text{Na} + \\text{S}$, compare $0.435/2 = 0.217$ against $0.312$, so Na limits and $\\approx 15.5$ g Na₂S forms.",
          "CEE: 'Why does the limiting reagent determine the yield, not the excess one?' — because the reaction stops when it is consumed.",
        ],
        commonMistakes: [
          "Comparing raw moles: 10 g Na is 0.435 mol against 10 g S at 0.312 mol, yet Na limits because 2 mol Na is needed per mol S. Always divide by the coefficient.",
          "Subtracting moles to find the excess: $0.435 - 2(0.312)$ is meaningless because different moles of different substances cannot be subtracted.",
        ],
      },
      "uc-st-4": {
        keyFacts: [
          "Percent yield can never exceed 100% for a genuinely irreversible reaction; anything above 100% signals either a side product, an impure product weighed wet, or an arithmetic error.",
          "Yield depends on the limiting reagent, and independent yields for two different reactions can be multiplied (e.g. 80% and 90% give 72%) — a standard two-step examination question.",
        ],
        edgeCases: [
          "Apparent yields over 100% occur legitimately in some school problems when 'yield' is defined against a different reference than the examiner expects, so always state the theoretical basis explicitly.",
          "A reaction at equilibrium never reaches the theoretical yield, so percent yield quietly becomes percent conversion — the two must not be confused.",
        ],
        examAsked: [
          "NEB: 'The theoretical yield is 22.4 g and the actual is 18.5 g. Find percent yield.' — $\\frac{18.5}{22.4}\\times100 = 82.6\\%$.",
          "CEE: 'Two consecutive steps have 80% and 90% yields. What is the overall yield?' — 72%.",
        ],
        commonMistakes: [
          "Dividing by the actual instead of the theoretical yield, inverting the answer.",
          "Adding yields for consecutive steps (80% + 90%) instead of multiplying, since the second step acts on the first step's product.",
        ],
      },
      "uc-st-5": {
        keyFacts: [
          "Molarity is moles of solute per LITRE OF SOLUTION, not of solvent — a distinction that has no numerical effect on its own but reappears the moment molarity is converted to molality.",
          "Dilution preserves moles: $M_1V_1 = M_2V_2$, so diluting tenfold cuts the molarity tenfold and never changes the number of solute particles.",
        ],
        edgeCases: [
          "Molarity VARIES with temperature because volume does, while molality does not. A solution prepared to 0.1 M at 20 °C is slightly below 0.1 M at 25 °C.",
          "Strongly hydrated salts (e.g. Na₂SO₄) give non-ideal behaviour, so the van't Hoff factor $i$ falls below the ideal $\\nu$ and colligative calculations need it.",
        ],
        examAsked: [
          "NEB: 'What volume of 2 M H₂SO₄ is needed to make 250 mL of 0.5 M?' — $V_1 = \\frac{0.5\\times250}{2} = 62.5$ mL.",
          "CEE: 'How many grams of NaOH in 500 mL of 0.2 M solution?' — $0.1 \\times 40 = 4$ g.",
        ],
        commonMistakes: [
          "Using 1000 mL as the volume when the question already gives litres (or vice versa) — a factor of 1000 error that is the most frequent numerical slip in this topic.",
          "Reading 'per litre of solvent' for molarity. That phrase belongs to molality only.",
        ],
      },
      "uc-st-6": {
        keyFacts: [
          "Molality $m = \\frac{\\text{moles solute}}{\\text{kg solvent}}$ is used for ALL colligative properties because they depend on particle CONCENTRATION, which molality expresses independently of volume change.",
          "Since the denominator is solvent mass, adding more solute does not change the denominator — molality rises exactly in proportion to moles of solute.",
        ],
        edgeCases: [
          "Molality CANNOT be computed for a gaseous solution, since there is no obvious 'kg of gas solvent' — another reason colligative work is restricted to liquids.",
          "For a dilute aqueous solution, molarity and molality are numerically very close, which is precisely why students fail to distinguish them in a 1-mark question despite them being different definitions.",
        ],
        examAsked: [
          "NEB: 'Calculate the molality of a solution containing 4.6 g NaOH in 500 g water.' — $\\frac{0.115}{0.5} = 0.23\\,\\text{mol kg}^{-1}$.",
          "CEE: 'Why is molality preferred over molarity for $\\Delta T_b$ calculations?' — it is independent of temperature and of volume change on dilution.",
        ],
        commonMistakes: [
          "Using grams of SOLUTION instead of grams of SOLVENT in the denominator — the classic molality error.",
          "Forgetting to convert the solute mass to MOLES first, so the unit ends up as g kg⁻¹ rather than mol kg⁻¹.",
        ],
      },
    },
  },
};