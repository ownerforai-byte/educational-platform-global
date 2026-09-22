/**
 * Pro Knowledge — Numerical Chemistry chapters.
 */

import type { KnowledgeChapter } from "@/features/knowledge/types";

export const CHEMISTRY_CHAPTERS: KnowledgeChapter[] = [
  {
    id: "mole-concept-stoichiometry",
    title: "Mole Concept & Stoichiometry",
    classLevel: "class-11",
    blurb:
      "The mole as a bridge between mass, particles and volume; empirical formulas, limiting reagent and solution concentration.",
    theory: [
      {
        heading: "The mole as a counting unit",
        level: "basic",
        body:
          "One mole is 6.022 × 10²³ entities — the number chosen so that the molar mass in grams equals the atomic or molecular mass in u. It is simply a bridge: mass ↔ moles ↔ particles, with 22.4 L/mol as the molar volume of any ideal gas at STP.",
        math: "n = \\frac{m}{M} = \\frac{N}{N_A} = \\frac{V_{STP}}{22.4}",
      },
      {
        heading: "Molarity, molality and normality",
        level: "standard",
        body:
          "Molarity (M) counts moles per litre of solution and changes with temperature as the solution expands. Molality (m) counts moles per kilogram of solvent and is temperature-independent. Normality depends on the equivalent factor, so N = M × n-factor — for H₂SO₄ the n-factor is 2.",
        math: "M = \\frac{n_{solute}}{V_{L}}, \\qquad m = \\frac{n_{solute}}{m_{solvent(kg)}}",
      },
      {
        heading: "Empirical vs molecular formula",
        level: "standard",
        body:
          "Percentage composition gives the simplest whole-number ratio — the empirical formula. Dividing the true molar mass by the empirical formula mass gives the multiplier n, and the molecular formula is n times the empirical formula. Combustion analysis recovers the composition of organic compounds this way.",
        math: "\\text{Molecular formula} = (\\text{Empirical formula})_n, \\qquad n = \\frac{M}{M_{emp}}",
      },
      {
        heading: "Limiting reagent logic",
        level: "pro",
        body:
          "The limiting reagent is the one that runs out first, and it decides the product mass. Compute moles of each reactant, divide by the stoichiometric coefficient from the balanced equation, and the smallest quotient is limiting. Excess reagent left over is the initial amount minus what was consumed.",
        math: "\\text{compare } \\frac{n_A}{a} \\text{ vs } \\frac{n_B}{b}",
      },
      {
        heading: "Stoichiometric calculations across states",
        level: "pro",
        body:
          "Balanced equations are mole ratios, not mass ratios. Convert everything to moles first, apply the ratio, then convert back to the requested unit — mass for solids, volume for gases, molarity × volume for solutions. Gay-Lussac's law of gaseous volumes is just the mole ratio restated.",
      },
    ],
    formulas: [
      {
        name: "Mole relation",
        latex: "n = \\frac{m}{M}",
        symbols: [
          { sym: "n", meaning: "amount in moles", unit: "mol" },
          { sym: "m", meaning: "given mass", unit: "g" },
          { sym: "M", meaning: "molar mass", unit: "g/mol" },
        ],
        when: "Always the first step of any stoichiometry problem.",
      },
      {
        name: "Number of particles",
        latex: "N = nN_A",
        symbols: [
          { sym: "N_A", meaning: "Avogadro's number, 6.022 × 10²³", unit: "mol⁻¹" },
        ],
        when: "Counting atoms, molecules, ions or electrons.",
      },
      {
        name: "Molar volume at STP",
        latex: "V = 22.4\\,n \\ \\text{litres}",
        symbols: [{ sym: "V", meaning: "gas volume at STP (273 K, 1 atm)", unit: "L" }],
        when: "Ideal gases at STP only; use PV = nRT otherwise.",
      },
      {
        name: "Percentage composition",
        latex: "\\%\\text{element} = \\frac{\\text{mass of element in 1 mol}}{\\text{molar mass}} \\times 100",
        symbols: [{ sym: "%", meaning: "mass percentage of the element" }],
        when: "Deriving empirical formulas and checking purity.",
      },
      {
        name: "Dilution equation",
        latex: "M_1V_1 = M_2V_2",
        symbols: [
          { sym: "M₁, V₁", meaning: "before dilution", unit: "M, L" },
          { sym: "M₂, V₂", meaning: "after dilution", unit: "M, L" },
        ],
        when: "Adding solvent only — moles of solute stay constant.",
      },
      {
        name: "Normality",
        latex: "N = M \\times n\\text{-factor}",
        symbols: [{ sym: "n-factor", meaning: "equivalents per mole (acidity, basicity or electrons)" }],
        when: "Volumetric analysis and titration calculations.",
      },
    ],
    specialCases: [
      {
        title: "Same mass, different moles",
        condition: "Equal masses of two gases",
        result: "n \\propto \\frac{1}{M}",
        why: "The lighter gas has more moles and therefore more molecules — the basis of Graham's law comparisons.",
      },
      {
        title: "Limiting reagent with a 1:1 ratio",
        condition: "a = b in the balanced equation",
        result: "\\text{Smaller mole count is limiting}",
        why: "When coefficients are equal, the comparison reduces to raw moles, saving a division step.",
      },
      {
        title: "Combustion of a hydrocarbon",
        condition: "C_xH_y + O₂",
        result: "x\\,CO_2 + \\frac{y}{2}H_2O",
        why: "Carbon balance fixes CO₂ and hydrogen balance fixes water, so the formula can be read backwards from the products.",
        askedIn: "Empirical-formula determination problems.",
      },
      {
        title: "STP vs room conditions",
        condition: "T = 273 K vs 298 K",
        result: "22.4\\ \\text{L at STP}, \\quad 24.0\\ \\text{L at NTP}",
        why: "Molar volume depends on temperature; using the wrong value shifts every gas answer.",
      },
      {
        title: "Percentage yield",
        condition: "Actual < theoretical",
        result: "\\%\\text{yield} = \\frac{\\text{actual}}{\\text{theoretical}} \\times 100",
        why: "Side reactions, incomplete reaction and handling losses all reduce the real output.",
      },
    ],
    tricks: [
      {
        title: "Everything through moles",
        how:
          "Never multiply masses by ratios. Convert to moles, apply the equation ratio, convert back.",
        example: "4 g H₂ reacting with O₂: $n = 2$ mol H₂ → 1 mol O₂ → 32 g O₂.",
        saves: "~40 s",
      },
      {
        title: "22.4 L shortcut",
        how:
          "At STP, volume in litres = moles × 22.4. For a mass problem, get moles first and multiply.",
        example: "8.8 g CO₂ = 0.2 mol = 4.48 L at STP.",
        saves: "~30 s",
      },
      {
        title: "Divide-by-coefficient test",
        how:
          "For limiting reagent, write moles ÷ coefficient for each reactant and pick the smallest.",
        example: "2 mol N₂ and 5 mol H₂ for N₂ + 3H₂: 2/1 = 2 vs 5/3 = 1.67 → H₂ limits.",
        saves: "~35 s",
      },
      {
        title: "Mole ↔ particle in one line",
        how:
          "Multiply by 6.022 × 10²³; for ions remember to multiply by the number of ions per formula unit.",
        example: "0.5 mol H₂SO₄ contains 1 mol H⁺ = 6.022 × 10²³ ions.",
        saves: "~20 s",
      },
    ],
    mistakes: [
      {
        wrong: "Using mass ratios directly from the equation.",
        right: "Convert to moles first; the coefficients are mole ratios.",
        why: "Mass ratios only coincide when the molar masses happen to be equal.",
      },
      {
        wrong: "Telling whether a reagent is limiting by the given mass.",
        right: "Compare moles divided by the stoichiometric coefficient.",
        why: "A heavier reactant can still be limiting if its molar mass is large.",
      },
      {
        wrong: "Applying 22.4 L/mol at any temperature and pressure.",
        right: "Use 22.4 L/mol only at STP, otherwise PV = nRT.",
        why: "Molar volume is not a constant of nature.",
      },
      {
        wrong: "Forgetting the n-factor in normality.",
        right: "N = M × n-factor; H₂SO₄ gives twice the normality of its molarity.",
        why: "Normality is defined on equivalents, not moles.",
      },
    ],
  },

  {
    id: "gas-laws",
    title: "States of Matter & Gas Laws",
    classLevel: "class-11",
    blurb:
      "Boyle, Charles, Avogadro and the combined gas laws, the ideal gas equation, Dalton's partial pressures, kinetic theory and real-gas deviation.",
    theory: [
      {
        heading: "Boyle's and Charles's laws",
        level: "basic",
        body:
          "At constant temperature the pressure and volume of a fixed mass of gas are inversely related, so the product PV is constant. At constant pressure the volume is directly proportional to absolute temperature. Temperature must always be in kelvin — a Celsius value gives nonsensical ratios.",
        math: "P_1V_1 = P_2V_2, \\qquad \\frac{V_1}{T_1} = \\frac{V_2}{T_2}",
      },
      {
        heading: "The ideal gas equation",
        level: "standard",
        body:
          "Combining the three gas laws gives PV = nRT, the single equation that covers all states of an ideal gas. R = 0.0821 L·atm/mol·K or 8.314 J/mol·K depending on the units chosen. Density and molar mass can be substituted to get PM = dRT.",
        math: "PV = nRT, \\qquad PM = dRT",
      },
      {
        heading: "Dalton's law and mole fraction",
        level: "standard",
        body:
          "In a mixture of non-reacting gases, the total pressure is the sum of the partial pressures each gas would exert alone. Partial pressure equals mole fraction times total pressure, which links gas problems directly to mole-conception calculations.",
        math: "P_{total} = \\sum P_i, \\qquad P_i = x_i P_{total}",
      },
      {
        heading: "Kinetic theory of gases",
        level: "pro",
        body:
          "Gas pressure arises from molecular collisions with the walls. Kinetic theory predicts PV = ⅓mNc², giving mean kinetic energy proportional to absolute temperature only — independent of the gas's identity. The most probable speeds follow a Maxwell distribution that flattens and shifts right as temperature rises.",
        math: "KE_{avg} = \\tfrac{3}{2}k_BT, \\qquad v_{rms} = \\sqrt{\\frac{3RT}{M}}",
      },
      {
        heading: "Real gases and van der Waals corrections",
        level: "pro",
        body:
          "Real molecules have finite volume and attract each other, so gases deviate most at high pressure and low temperature. Van der Waals corrected the ideal equation with a volume term (nb) and an attraction term (a/V²). Above the critical temperature a gas cannot be liquefied by pressure alone.",
        math: "\\left(P + \\frac{an^2}{V^2}\\right)(V - nb) = nRT",
      },
    ],
    formulas: [
      {
        name: "Ideal gas equation",
        latex: "PV = nRT",
        symbols: [
          { sym: "P", meaning: "pressure", unit: "atm or Pa" },
          { sym: "V", meaning: "volume", unit: "L or m³" },
          { sym: "n", meaning: "moles", unit: "mol" },
          { sym: "T", meaning: "absolute temperature", unit: "K" },
        ],
        when: "Low pressure, high temperature, non-reacting gas.",
        hook: "R's value follows whatever units you use.",
      },
      {
        name: "Combined gas law",
        latex: "\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}",
        symbols: [{ sym: "1, 2", meaning: "initial and final states" }],
        when: "Fixed mass of gas with none of the three variables held constant.",
      },
      {
        name: "Dalton's law of partial pressures",
        latex: "P_{total} = P_1 + P_2 + P_3 + \\dots",
        symbols: [{ sym: "P_i", meaning: "partial pressure of component i" }],
        when: "Non-reacting mixture of ideal gases.",
      },
      {
        name: "Graham's law of diffusion",
        latex: "\\frac{r_1}{r_2} = \\sqrt{\\frac{M_2}{M_1}}",
        symbols: [{ sym: "r", meaning: "rate of diffusion" }],
        when: "Two gases at the same temperature and pressure.",
        hook: "Lighter gas diffuses faster — the square-root signature.",
      },
      {
        name: "RMS speed",
        latex: "v_{rms} = \\sqrt{\\frac{3RT}{M}}",
        symbols: [
          { sym: "R", meaning: "gas constant, 8.314", unit: "J/mol·K" },
          { sym: "M", meaning: "molar mass in kg/mol", unit: "kg/mol" },
        ],
        when: "Ideal gas; use kg/mol for SI consistency.",
      },
      {
        name: "Van der Waals equation",
        latex: "\\left(P + \\frac{an^2}{V^2}\\right)(V - nb) = nRT",
        symbols: [
          { sym: "a", meaning: "attraction correction" },
          { sym: "b", meaning: "excluded volume per mole" },
        ],
        when: "Real gases, especially at high pressure or near condensation.",
      },
    ],
    specialCases: [
      {
        title: "Doubling absolute temperature at constant volume",
        condition: "V, n fixed, T → 2T",
        result: "P \\to 2P",
        why: "Pressure is directly proportional to kelvin temperature — but only when the temperature is in kelvin.",
      },
      {
        title: "Gas collected over water",
        condition: "Moist gas",
        result: "P_{dry} = P_{total} - P_{water\\ vapour}",
        why: "The collected gas is saturated with water vapour, which contributes to the total pressure.",
        askedIn: "Laboratory gas-preparation numericals.",
      },
      {
        title: "Gas in a closed container, temperature halved",
        condition: "Rigid vessel",
        result: "P\\text{ halves}",
        why: "Volume cannot change, so Gay-Lussac's law applies directly.",
      },
      {
        title: "Molecule with the same KE but different mass",
        condition: "Same T",
        result: "v_{rms} \\propto \\frac{1}{\\sqrt{M}}",
        why: "Equal kinetic energy means the lighter molecule must move faster — no gas is 'hotter' than another at the same temperature.",
      },
      {
        title: "Compressibility factor Z",
        condition: "Z = 1 ideal, Z < 1 attraction dominant, Z > 1 volume dominant",
        result: "Z = \\frac{PV}{nRT}",
        why: "At moderate pressure attraction wins (Z < 1); at high pressure molecular volume wins (Z > 1) — the classic curve with a minimum.",
      },
    ],
    tricks: [
      {
        title: "Always convert to kelvin first",
        how: "Add 273 to Celsius before any ratio; delete this step and every answer is wrong.",
        example: "27 °C → 300 K, 127 °C → 400 K, so V scales by 4/3.",
        saves: "Prevents an entire wrong answer",
      },
      {
        title: "Use ratios, not R",
        how: "If both states are the same gas with the same moles, cancel nR and solve as a ratio.",
        example: "$\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}$ needs no value of R at all.",
        saves: "~30 s",
      },
      {
        title: "Mole fraction shortcut for partial pressure",
        how: "P_i = x_i × P_total, and x_i is just moles of i / total moles.",
        example: "2 mol N₂ + 3 mol O₂ at 5 atm: $P_{N_2} = 0.4 \\times 5 = 2$ atm.",
        saves: "~25 s",
      },
      {
        title: "Density form for molar mass",
        how: "PM = dRT rearranges to M = dRT/P for finding an unknown gas's molar mass.",
        example: "d = 1.25 g/L at 1 atm, 273 K: $M = 1.25 \\times 0.0821 \\times 273 = 28$ g/mol (N₂).",
        saves: "~35 s",
      },
    ],
    mistakes: [
      {
        wrong: "Substituting temperature in degrees Celsius.",
        right: "Convert to kelvin always; ratios of Celsius temperatures are physically meaningless.",
        why: "Gas laws are defined on the absolute scale.",
      },
      {
        wrong: "Matching R to mixed units.",
        right: "Use 0.0821 with atm and litres, or 8.314 with Pa and m³ — never a blend.",
        why: "R's numerical value encodes its units.",
      },
      {
        wrong: "Adding pressures of gases that react.",
        right: "Dalton's law holds only for non-reacting mixtures; reacting gases need stoichiometry first.",
        why: "Reacting gases change mole counts and often condense.",
      },
      {
        wrong: "Assuming a real gas follows PV = nRT exactly at high pressure.",
        right: "Use van der Waals corrections or the compressibility factor.",
        why: "Molecular volume and attraction become significant as molecules crowd.",
      },
    ],
  },

  {
    id: "ionic-equilibrium-ph",
    title: "Ionic Equilibrium, pH & Buffer",
    classLevel: "both",
    blurb:
      "Strong and weak acids, Kw and pH, buffer solutions, hydrolysis of salts, solubility product and common-ion effects.",
    theory: [
      {
        heading: "Arrhenius vs Brønsted–Lowry vs Lewis",
        level: "basic",
        body:
          "Arrhenius acids release H⁺ in water and bases release OH⁻. Brønsted–Lowry widens this to proton donors and acceptors, which explains why water can act as either. Lewis generalises further to electron-pair acceptors and donors, covering reactions with no proton at all.",
      },
      {
        heading: "Ionic product of water and the pH scale",
        level: "standard",
        body:
          "Water self-ionises slightly, giving Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25 °C. pH is the negative logarithm of hydrogen-ion concentration, so neutral water sits at pH 7 and pH + pOH = 14. A change of one pH unit means a tenfold change in acidity.",
        math: "pH = -\\log[H^+], \\qquad pH + pOH = 14",
      },
      {
        heading: "Weak acids and the dissociation constant",
        level: "standard",
        body:
          "Weak acids ionise only partly; Ka measures how far. Taking the negative log gives pKa, and for a weak acid [H⁺] = √(Ka·C) — the square-root dependence is why a hundredfold dilution raises pH by only half a unit. The smaller the Ka, the weaker the acid.",
        math: "K_a = \\frac{[H^+][A^-]}{[HA]}, \\qquad [H^+] = \\sqrt{K_aC}",
      },
      {
        heading: "Buffers and the Henderson equation",
        level: "pro",
        body:
          "A buffer is a weak acid with its conjugate base (or the reverse) and resists pH change on adding small amounts of acid or base. Buffer capacity peaks when the acid and conjugate base concentrations are equal, i.e. pH = pKa. Dilution barely changes buffer pH because the ratio of the pair stays constant.",
        math: "pH = pK_a + \\log\\frac{[salt]}{[acid]}",
      },
      {
        heading: "Salt hydrolysis and solubility product",
        level: "pro",
        body:
          "Salts of weak acids with strong bases give basic solutions, salts of weak bases with strong acids give acidic solutions, and strong–strong salts stay neutral. For sparingly soluble salts the solubility product Ksp fixes the ion concentrations: a precipitate appears once the ionic product exceeds Ksp, and a common ion suppresses solubility by Le Chatelier's principle.",
        math: "K_{sp} = [A^+]^m[B^-]^n",
      },
    ],
    formulas: [
      {
        name: "pH and pOH",
        latex: "pH = -\\log[H^+], \\qquad pOH = -\\log[OH^-]",
        symbols: [
          { sym: "[H⁺]", meaning: "hydrogen-ion concentration", unit: "mol/L" },
        ],
        when: "Dilute aqueous solutions at 25 °C.",
        hook: "pH 2 is ten times more acidic than pH 3.",
      },
      {
        name: "Ionic product of water",
        latex: "K_w = [H^+][OH^-] = 10^{-14}",
        symbols: [{ sym: "Kw", meaning: "water's self-ionisation constant at 25 °C" }],
        when: "All aqueous solutions; Kw rises with temperature.",
      },
      {
        name: "Weak acid — hydrogen ion concentration",
        latex: "[H^+] = \\sqrt{K_aC}",
        symbols: [
          { sym: "Ka", meaning: "acid dissociation constant" },
          { sym: "C", meaning: "formal concentration of the acid", unit: "mol/L" },
        ],
        when: "Weak acid with very little dissociation (α small).",
      },
      {
        name: "Degree of dissociation",
        latex: "\\alpha = \\sqrt{\\frac{K_a}{C}}",
        symbols: [{ sym: "α", meaning: "fraction ionised" }],
        when: "Ostwald's dilution law; α rises as the solution is diluted.",
      },
      {
        name: "Henderson–Hasselbalch equation",
        latex: "pH = pK_a + \\log\\frac{[A^-]}{[HA]}",
        symbols: [
          { sym: "[A⁻]", meaning: "conjugate base concentration" },
          { sym: "[HA]", meaning: "weak acid concentration" },
        ],
        when: "Buffers; best capacity when ratio is near 1.",
      },
      {
        name: "Solubility product",
        latex: "K_{sp} = [A^+]^m[B^-]^n",
        symbols: [{ sym: "m, n", meaning: "stoichiometric coefficients in the dissociation" }],
        when: "Saturated solution of a sparingly soluble salt at a given temperature.",
      },
      {
        name: "Solubility from Ksp (AB type)",
        latex: "s = \\sqrt{K_{sp}}",
        symbols: [{ sym: "s", meaning: "molar solubility", unit: "mol/L" }],
        when: "1:1 salts like AgCl; use s = (Ksp/4)^⅓ for AB₂ types.",
      },
    ],
    specialCases: [
      {
        title: "Very dilute strong acid",
        condition: "C < 10⁻⁶ M",
        result: "pH \\approx 7 \\text{ (never above 7)}",
        why: "Water's own ionisation dominates, so the acid can never make the solution alkaline.",
        askedIn: "Conceptual MCQ on dilution limits.",
      },
      {
        title: "Buffer at equal concentrations",
        condition: "[HA] = [A⁻]",
        result: "pH = pK_a",
        why: "The log term becomes zero, so the buffer sits exactly at its pKa and has maximum capacity.",
      },
      {
        title: "Salt of a weak acid + strong base",
        condition: "e.g. CH₃COONa",
        result: "pH > 7, \\qquad pH = 7 + \\tfrac{1}{2}(pK_a + \\log C)",
        why: "The anion hydrolyses to produce OH⁻, making the solution basic.",
      },
      {
        title: "Salt of a weak base + strong acid",
        condition: "e.g. NH₄Cl",
        result: "pH < 7, \\qquad pH = 7 - \\tfrac{1}{2}(pK_b + \\log C)",
        why: "The cation hydrolyses to give H⁺.",
      },
      {
        title: "Common-ion effect",
        condition: "Adding NaCl to saturated AgCl",
        result: "AgCl\\text{ solubility} \\downarrow",
        why: "The extra Cl⁻ shifts the dissolution equilibrium left, precipitating more AgCl — Le Chatelier in action.",
      },
      {
        title: "Diluting a buffer",
        condition: "Water added",
        result: "pH \\approx \\text{unchanged}",
        why: "Both the acid and its conjugate base dilute by the same factor, so their ratio — and hence pH — survives.",
      },
    ],
    tricks: [
      {
        title: "Log values to memorise",
        how:
          "log 2 = 0.30, log 3 = 0.477, log 5 = 0.70. Then pH = −log(C) needs no calculator.",
        example: "0.002 M HCl: $[H^+] = 2 \\times 10^{-3}$, so pH $= 3 - 0.30 = 2.70$.",
        saves: "~40 s",
      },
      {
        title: "Halving/doubling pH shifts",
        how:
          "Tenfold dilution shifts pH by exactly 1; hundredfold by 2. For weak acids the shift is halved because [H⁺] = √(KaC).",
        example: "Weak acid diluted 100×: pH rises by only 1.",
        saves: "~30 s",
      },
      {
        title: "Buffer shortcut when ratio is a power of ten",
        how:
          "pH = pKa ± n for a ratio of 10^n. Ratio 10:1 → pH = pKa + 1.",
        example: "pKa = 4.76, salt:acid = 10 → pH = 5.76.",
        saves: "~25 s",
      },
      {
        title: "Solubility comparison by Ksp type",
        how:
          "For the same formula type compare Ksp directly; for different types (AB vs AB₂) convert to molar solubility first.",
        example: "AgCl (Ksp 1.8 × 10⁻¹⁰) vs Ag₂CrO₄ (Ksp 1.1 × 10⁻¹²): molar solubilities are 1.3 × 10⁻⁵ vs 6.5 × 10⁻⁵.",
      },
    ],
    mistakes: [
      {
        wrong: "Reporting pH above 7 for a diluted acid.",
        right: "An acid solution can approach 7 from below but never cross into basic.",
        why: "Water autoionisation sets the floor for [H⁺].",
      },
      {
        wrong: "Using [H⁺] = C for a weak acid.",
        right: "Use √(KaC) unless the acid is strong or dissociation is near complete.",
        why: "Weak acids ionise only partially, so [H⁺] ≪ C.",
      },
      {
        wrong: "Assuming every salt solution is neutral.",
        right: "Check which acid and base formed the salt; hydrolysis often changes the pH.",
        why: "Hydrolysis of the weak partner shifts the equilibrium.",
      },
      {
        wrong: "Comparing Ksp values of different formula types directly.",
        right: "Convert Ksp into molar solubility before comparing.",
        why: "Ksp depends on the stoichiometry of dissolution.",
      },
      {
        wrong: "Forgetting that pH + pOH = 14 holds only at 25 °C.",
        right: "At other temperatures Kw differs, so the sum differs too.",
        why: "Kw is temperature-dependent.",
      },
    ],
  },

  {
    id: "thermochemistry",
    title: "Thermochemistry & Energetics",
    classLevel: "class-11",
    blurb:
      "Enthalpy of reaction, formation and combustion, Hess's law, calorimetry, bond energies and Gibbs free energy.",
    theory: [
      {
        heading: "System, surroundings and sign conventions",
        level: "basic",
        body:
          "Thermochemistry tracks energy exchanged between the system and its surroundings as heat or work. Exothermic reactions release heat (ΔH negative) while endothermic ones absorb it (ΔH positive). The sign convention is not bookkeeping trivia — it decides every Hess's-law sum.",
      },
      {
        heading: "Enthalpy of reaction from formation data",
        level: "standard",
        body:
          "Standard enthalpy of reaction equals the sum of formation enthalpies of products minus that of reactants, each multiplied by its coefficient. Elements in their standard states contribute zero by definition, which simplifies combustion calculations enormously.",
        math: "\\Delta H^\\circ = \\sum \\Delta H_f^\\circ(\\text{products}) - \\sum \\Delta H_f^\\circ(\\text{reactants})",
      },
      {
        heading: "Hess's law of constant heat summation",
        level: "standard",
        body:
          "Enthalpy change depends only on the initial and final states, not the route. So reactions can be added, subtracted or reversed algebraically with the enthalpy changes treated the same way — the practical tool for measuring reactions that cannot be performed directly.",
        math: "\\Delta H_{total} = \\Delta H_1 + \\Delta H_2 + \\dots",
      },
      {
        heading: "Calorimetry measurements",
        level: "pro",
        body:
          "In a calorimeter, heat gained by the water and vessel equals heat lost by the reaction (or the reverse). Using q = mcΔT for the solution plus q = CΔT for the apparatus gives the heat of reaction, which divided by moles gives molar enthalpy. Heat losses to the surroundings are the main experimental error.",
        math: "q = mc\\Delta T, \\qquad \\Delta H = -\\frac{q}{n}",
      },
      {
        heading: "Bond energy and spontaneity",
        level: "pro",
        body:
          "Reactions break bonds (energy absorbed) and form new ones (energy released); the net ΔH is the difference. Whether a reaction actually happens is decided by Gibbs free energy: ΔG = ΔH − TΔS. Spontaneous means ΔG negative — not merely exothermic, since an endothermic reaction can proceed if entropy rises enough.",
        math: "\\Delta H = \\sum BE_{reactants} - \\sum BE_{products}, \\qquad \\Delta G = \\Delta H - T\\Delta S",
      },
    ],
    formulas: [
      {
        name: "Heat absorbed or released",
        latex: "q = mc\\Delta T",
        symbols: [
          { sym: "m", meaning: "mass", unit: "g" },
          { sym: "c", meaning: "specific heat capacity", unit: "J/g·K" },
          { sym: "ΔT", meaning: "temperature change", unit: "K" },
        ],
        when: "No phase change occurs in the interval.",
      },
      {
        name: "Molar enthalpy",
        latex: "\\Delta H = \\frac{q}{n}",
        symbols: [{ sym: "n", meaning: "moles reacted", unit: "mol" }],
        when: "Converting measured heat into a per-mole value; watch the sign.",
      },
      {
        name: "Hess's law",
        latex: "\\Delta H_{reaction} = \\sum \\Delta H_{steps}",
        symbols: [{ sym: "ΔH_steps", meaning: "enthalpies of the chosen path" }],
        when: "State functions only; reversing a step flips its sign.",
        hook: "Path does not matter, only the endpoints.",
      },
      {
        name: "Enthalpy from formation values",
        latex: "\\Delta H^\\circ_{rxn} = \\sum n\\Delta H_f^\\circ(\\text{prod}) - \\sum m\\Delta H_f^\\circ(\\text{react})",
        symbols: [{ sym: "n, m", meaning: "stoichiometric coefficients" }],
        when: "Formation data available; elements in standard states count as zero.",
      },
      {
        name: "Enthalpy from bond energies",
        latex: "\\Delta H = \\sum BE(\\text{broken}) - \\sum BE(\\text{formed})",
        symbols: [{ sym: "BE", meaning: "bond dissociation energy", unit: "kJ/mol" }],
        when: "Gaseous species with tabulated bond energies — a real gas-phase approximation.",
      },
      {
        name: "Gibbs free energy",
        latex: "\\Delta G = \\Delta H - T\\Delta S",
        symbols: [
          { sym: "ΔG", meaning: "spontaneity indicator (<0 spontaneous)", unit: "kJ" },
          { sym: "T", meaning: "absolute temperature", unit: "K" },
        ],
        when: "Constant temperature and pressure; equilibrium at ΔG = 0.",
      },
      {
        name: "Calorimeter heat balance",
        latex: "q_{reaction} + q_{water} + q_{calorimeter} = 0",
        symbols: [{ sym: "q", meaning: "heat exchanged by each part" }],
        when: "Closed calorimeter at thermal equilibrium.",
      },
    ],
    specialCases: [
      {
        title: "Elements in standard states",
        condition: "O₂, N₂, H₂, C(graphite)",
        result: "\\Delta H_f^\\circ = 0",
        why: "Formation from itself is no change, so these entries drop out of the sum.",
      },
      {
        title: "Reversing a reaction",
        condition: "A → B becomes B → A",
        result: "\\Delta H \\to -\\Delta H",
        why: "Enthalpy is a state function; going backwards returns exactly the energy absorbed.",
      },
      {
        title: "Multiplying an equation",
        condition: "coefficients × k",
        result: "\\Delta H \\to k\\Delta H",
        why: "Enthalpy is extensive — it scales with the amount of substance.",
      },
      {
        title: "Reaction at equilibrium",
        condition: "ΔG = 0",
        result: "\\Delta H = T\\Delta S, \\qquad K = e^{-\\Delta G^\\circ/RT}",
        why: "The entropy gain exactly pays for the enthalpy cost, and the equilibrium constant is fixed by the standard free-energy change.",
      },
      {
        title: "Exothermic but non-spontaneous",
        condition: "ΔH < 0 but ΔS very negative",
        result: "\\Delta G > 0 \\text{ below a threshold temperature}",
        why: "The TΔS term can dominate at high temperature, so an exothermic reaction may still not proceed.",
        askedIn: "Conceptual spontaneity MCQs.",
      },
    ],
    tricks: [
      {
        title: "Hess by equation juggling",
        how:
          "Reverse and scale the given equations until they add to the target; apply the same operations to their ΔH values.",
        example: "To find ΔH for C + ½O₂ → CO, combine CO₂ formation and CO combustion with a reversal.",
        saves: "~60 s",
      },
      {
        title: "ΔT sign discipline",
        how:
          "Write ΔT = T_final − T_initial. If the temperature rose, ΔT > 0 and the reaction is exothermic, so ΔH is negative.",
        example: "Water warms from 25 to 35 °C → ΔT = +10 K → exothermic.",
        saves: "Avoids sign flips",
      },
      {
        title: "Neutralisation shortcut",
        how:
          "For strong acid + strong base, ΔH is always about −57.1 kJ/mol regardless of which pair, because the net reaction is just H⁺ + OH⁻ → H₂O.",
        example: "HCl + NaOH and HNO₃ + KOH both give ≈ −57 kJ/mol.",
        saves: "~40 s",
      },
      {
        title: "Bond-energy estimate",
        how:
          "Broken minus formed; positive total means endothermic. It gives a quick check on the sign before detailed data.",
        example: "H₂ + Cl₂ → 2HCl: 436 + 243 − 2(431) = −183 kJ.",
      },
    ],
    mistakes: [
      {
        wrong: "Forgetting to multiply ΔH by the stoichiometric coefficient.",
        right: "Scale each ΔH by its coefficient when summing.",
        why: "Enthalpy is extensive, so doubling the reaction doubles the heat.",
      },
      {
        wrong: "Using kJ and J interchangeably in q = mcΔT.",
        right: "Keep c in J/g·K and convert the final answer to kJ if needed.",
        why: "A factor of 1000 error appears in the final molar enthalpy.",
      },
      {
        wrong: "Assuming exothermic automatically means spontaneous.",
        right: "Check ΔG = ΔH − TΔS; entropy can override enthalpy.",
        why: "Spontaneity needs the free-energy sign, not the enthalpy sign.",
      },
      {
        wrong: "Assigning non-zero ΔHf to elements in their standard states.",
        right: "Elements in their standard states have ΔHf = 0 by definition.",
        why: "This convention is the basis of the formation-sum method.",
      },
      {
        wrong: "Ignoring heat absorbed by the calorimeter itself.",
        right: "Include the calorimeter's heat capacity term, not just the water.",
        why: "The vessel absorbs heat too, so the calculated ΔH comes out too small.",
      },
    ],
  },

  {
    id: "electrochemistry",
    title: "Electrochemistry & Voltaic Cells",
    classLevel: "class-12",
    blurb:
      "Oxidation states, redox balancing, electrode potentials, cell emf, electrolysis, Faraday's laws and conductance.",
    theory: [
      {
        heading: "Oxidation and reduction — electron bookkeeping",
        level: "basic",
        body:
          "Oxidation is loss of electrons and reduction is gain; both always happen together. An oxidising agent accepts electrons and is itself reduced, while a reducing agent donates electrons and is oxidised. Assigning oxidation numbers is the systematic way to spot which is which.",
      },
      {
        heading: "Balancing redox equations",
        level: "standard",
        body:
          "Balance atoms other than H and O, then oxygen with water, hydrogen with H⁺, and finally charge with electrons. In basic medium add OH⁻ to both sides to neutralise H⁺. Charge balance is the check: total charge must match on both sides.",
      },
      {
        heading: "Electrode potentials and cell emf",
        level: "standard",
        body:
          "Standard electrode potentials measure a half-cell's tendency to be reduced, using the hydrogen electrode as zero. The cell emf is cathode potential minus anode potential, always positive for a spontaneous cell. A more negative potential means a stronger reducing agent — metals low in the series displace those above them.",
        math: "E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}",
      },
      {
        heading: "Nernst equation and equilibrium",
        level: "pro",
        body:
          "Real cells drift from standard conditions, and the Nernst equation corrects for concentration. At equilibrium the emf falls to zero, which links the standard emf to the equilibrium constant: log K = nE°/0.059 at 25 °C. This is how a cell's voltage predicts how far a reaction goes.",
        math: "E = E^\\circ - \\frac{0.059}{n}\\log Q, \\qquad \\log K = \\frac{nE^\\circ}{0.059}",
      },
      {
        heading: "Electrolysis and Faraday's laws",
        level: "pro",
        body:
          "In electrolysis an external supply forces non-spontaneous chemistry. The mass deposited is proportional to the charge passed and to the equivalent weight. One faraday (96,500 C) deposits one mole of a monovalent element or half a mole of a divalent one.",
        math: "m = \\frac{ZIt}{F} = \\frac{M}{n}\\cdot\\frac{Q}{F}",
      },
      {
        heading: "Conductance and molar conductivity",
        level: "pro",
        body:
          "Conductance depends on geometry, so it is normalised into conductivity (κ) and then into molar conductivity (Λm = κ/C). For strong electrolytes Λm falls gently with concentration; for weak electrolytes it plunges because the degree of ionisation drops. Extrapolating to zero concentration gives Λ°m and the degree of dissociation α = Λm/Λ°m.",
      },
    ],
    formulas: [
      {
        name: "Cell emf",
        latex: "E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}",
        symbols: [
          { sym: "E°", meaning: "standard reduction potential", unit: "V" },
        ],
        when: "Standard conditions (1 M, 1 atm, 25 °C); positive means spontaneous.",
        hook: "Right minus left, reduction potentials both.",
      },
      {
        name: "Gibbs energy from emf",
        latex: "\\Delta G^\\circ = -nFE^\\circ_{cell}",
        symbols: [
          { sym: "n", meaning: "moles of electrons transferred" },
          { sym: "F", meaning: "Faraday constant, 96,500", unit: "C/mol" },
        ],
        when: "Linking thermodynamics to electrochemistry; negative ΔG matches positive emf.",
      },
      {
        name: "Nernst equation",
        latex: "E = E^\\circ - \\frac{0.0591}{n}\\log Q",
        symbols: [
          { sym: "Q", meaning: "reaction quotient (products/reactants)" },
          { sym: "n", meaning: "electrons transferred" },
        ],
        when: "Non-standard concentrations at 25 °C; E = 0 at equilibrium.",
      },
      {
        name: "Equilibrium constant from emf",
        latex: "\\log K = \\frac{nE^\\circ}{0.0591}",
        symbols: [{ sym: "K", meaning: "equilibrium constant of the cell reaction" }],
        when: "Standard emf known; gives a quantitative measure of reaction completeness.",
      },
      {
        name: "Faraday's first law",
        latex: "m = \\frac{M}{n}\\cdot\\frac{It}{F}",
        symbols: [
          { sym: "m", meaning: "mass deposited", unit: "g" },
          { sym: "I", meaning: "current", unit: "A" },
          { sym: "t", meaning: "time", unit: "s" },
        ],
        when: "Electrolysis with 100% current efficiency.",
        hook: "Mass is proportional to charge passed.",
      },
      {
        name: "Molar conductivity",
        latex: "\\Lambda_m = \\frac{1000\\kappa}{C}",
        symbols: [
          { sym: "κ", meaning: "conductivity", unit: "S/cm" },
          { sym: "C", meaning: "molar concentration", unit: "mol/L" },
        ],
        when: "Comparing electrolytes of different concentrations.",
      },
      {
        name: "Degree of dissociation",
        latex: "\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ}",
        symbols: [{ sym: "Λ°m", meaning: "molar conductivity at infinite dilution" }],
        when: "Weak electrolytes; then Ka = Cα²/(1 − α).",
      },
    ],
    specialCases: [
      {
        title: "Cell at equilibrium",
        condition: "Q = K",
        result: "E = 0 \\ \\text{and} \\ \\Delta G = 0",
        why: "A dead battery has no driving force left — the reaction has run to its equilibrium position.",
      },
      {
        title: "Hydrogen electrode as reference",
        condition: "1 M H⁺, 1 atm H₂, 25 °C",
        result: "E^\\circ = 0.00\\ \\text{V}",
        why: "The scale is defined relative to this half-cell, so it is the origin of all potentials.",
      },
      {
        title: "Electrolysis of acidified water",
        condition: "Inert electrodes",
        result: "\\text{H}_2\\text{ at cathode}, \\ \\text{O}_2\\text{ at anode in 2:1 ratio}",
        why: "Water is reduced at the cathode and oxidised at the anode, and the mole ratio follows the electron count.",
      },
      {
        title: "Electrolysis of aqueous NaCl with inert electrodes",
        condition: "Concentrated brine",
        result: "\\text{H}_2\\text{ at cathode}, \\ \\text{Cl}_2\\text{ at anode}",
        why: "Water is reduced preferentially and chloride is oxidised preferentially over water's oxygen evolution.",
      },
      {
        title: "Daniell cell",
        condition: "Zn | Zn²⁺ ‖ Cu²⁺ | Cu",
        result: "E^\\circ = 0.34 - (-0.76) = 1.10\\ \\text{V}",
        why: "Zinc's more negative potential makes it the anode that dissolves while copper plates out.",
        askedIn: "Standard cell-emf numerical.",
      },
      {
        title: "A more reactive metal in a salt solution",
        condition: "e.g. Zn in CuSO₄",
        result: "\\text{Displacement reaction occurs}",
        why: "The metal with the more negative potential reduces the ion of the less reactive metal.",
      },
    ],
    tricks: [
      {
        title: "Emf sign check",
        how:
          "A spontaneous cell must give a positive E°. If your answer is negative, you have swapped anode and cathode.",
        example: "Zn/Cu gives +1.10 V; written the other way it reads −1.10 V.",
        saves: "~20 s and an entire mark",
      },
      {
        title: "0.059 constant",
        how:
          "At 25 °C use 0.0591/n. Then log K = nE°/0.059 is instant.",
        example: "n = 2, E° = 1.10 V → log K = 37.3.",
        saves: "~40 s",
      },
      {
        title: "Equivalent weight in electrolysis",
        how:
          "Charge for 1 g-equivalent is always 96,500 C. For divalent metals, 1 mol needs 2F.",
        example: "Depositing 0.1 mol Al³⁺ needs 0.3 × 96,500 = 28,950 C.",
        saves: "~35 s",
      },
      {
        title: "Conductance dilution behaviour",
        how:
          "Both strong and weak electrolytes show κ falling with dilution, but Λm rises; weak electrolytes rise sharply.",
        example: "Doubling dilution doubles Λm if α stays constant.",
      },
    ],
    mistakes: [
      {
        wrong: "Calling the anode positive for every cell.",
        right: "Anode is negative in a galvanic cell and positive in an electrolytic cell.",
        why: "The polarity depends on whether the cell generates or consumes electricity.",
      },
      {
        wrong: "Adding electrode potentials instead of subtracting.",
        right: "Use E°cell = E°cathode − E°anode; potentials are not reversed like Hess's-law enthalpies.",
        why: "The convention already encodes the direction.",
      },
      {
        wrong: "Ignoring n in ΔG = −nFE°.",
        right: "Count the electrons actually transferred in the balanced overall reaction.",
        why: "n scales the free energy; a wrong n distorts ΔG by that factor.",
      },
      {
        wrong: "Assuming 22.4 L of gas per faraday.",
        right: "One faraday liberates half a mole of H₂ (11.2 L at STP) at a monovalent cathode.",
        why: "Two electrons are needed per H₂ molecule.",
      },
      {
        wrong: "Believing a metal can displace any metal below it from solution regardless of conditions.",
        right: "The prediction is reliable under standard conditions; concentration can override it via the Nernst equation.",
        why: "Emf depends on concentration, not just the standard series.",
      },
    ],
  },
];
