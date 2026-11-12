/**
 * Learning packs for the chemistry labs that had none — previously
 * "Under progress". Same `LabLearningPack` shape as `lab-learning.ts`,
 * merged by `getLabLearning`.
 */

import type { LabLearningPack } from "./lab-learning";

export const EXTRA_LEARNING_CHEMISTRY: Record<string, LabLearningPack> = {
  "ch-3d-periodic": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Predicting calcium (Z = 20) and chlorine (Z = 17) from position alone",
      steps: [
        { text: "Write the configurations from position:", math: "Ca: [Ar]4s² (group 2, s-block);  Cl: [Ne]3s²3p⁵ (group 17, p-block)" },
        { text: "Ion formation follows the octet pull:", math: "Ca → Ca²⁺ + 2e⁻ (metal, basic oxide CaO);  Cl + e⁻ → Cl⁻ (non-metal, acidic oxide Cl₂O₇ → HClO₄)" },
        { text: "Radius trend across period 3 — Z_eff rises, shells do not:", math: "Na 186 pm > Mg 160 > Al 143 > Si 118 > P 110 > S 104 > Cl 99 pm" },
        { text: "First ionisation energy across period 3 — rises with two famous dips:", math: "Na 496 < Mg 738 > Al 578 < Si 786 < P 1012 > S 1000 < Cl 1251 < Ar 1521 kJ/mol" },
        { text: "The dips explained by sublevel filling:", math: "Al: 3p¹ easier to lose than Mg's 3s²;  S: paired 3p⁴ electrons repel ✓" },
      ],
      takeaway: "Position ⇒ configuration ⇒ chemistry: the table is not a list to memorise but a machine for predicting radius, ionisation energy and reactivity — including exactly WHERE the trends dip and why.",
    },
    theory: [
      {
        heading: "Blocks, configurations, and the shape of the table",
        body: "The table is the aufbau principle drawn in stone: s-block (groups 1–2), p-block (13–18), d-block (3–12), f-block (lanthanides/actinides). Element chemistry follows the outermost electrons: ns¹ metals give away one electron, np⁵ halogens grab one, nd¹⁻¹⁰ transition metals juggle variable oxidation states because (n−1)d and ns sit nearly level.",
      },
      {
        heading: "The five working trends",
        body: "Across a period: radius SHRINKS (Z_eff up), ionisation energy and electronegativity RISE, metallic character FALLS. Down a group: radius grows (new shells), ionisation energy falls, metallic character rises. Electron affinity peaks near the halogens. Every anomaly has a substructure reason: Be–B and N–O dips in IE, the noble-gas ceiling, hydrogen sitting alone.",
      },
    ],
    confusions: [
      {
        wrong: "Atomic radius increases across a period because mass increases.",
        right: "It DECREASES: more protons pull the same shell tighter (Z_eff up), and no new shell is added until the next period.",
        why: "'More stuff = bigger' is the everyday default.",
      },
      {
        wrong: "Ionisation energy always increases left-to-right.",
        right: "Mostly, with dips at group 13 (Al) and group 16 (S) — sublevel boundaries and electron pairing break the monotony.",
        why: "Trends are taught as smooth lines; the exceptions carry the real physics.",
      },
      {
        wrong: "Noble gases are completely inert.",
        right: "Xe and Kr form stable fluorides and oxides (XeF₂, XeF₄, XeO₃) — 'noble', not 'untouchable'; the chemistry exploits Xe's relatively low ionisation energy.",
        why: "The old textbook line 'group 18 never reacts' outlived its evidence.",
      },
    ],
    questions: [
      { q: "Order Na, Mg, Al by atomic radius.", a: "Na > Mg > Al (186 > 160 > 143 pm): Z_eff rises across the period.", hint: "Same shell, more protons." },
      { q: "Why is the second ionisation energy of Na enormous?", a: "The second electron must come from the stable Ne core ([Ne] → Na⁺ has 3s¹ gone; 2p next) — breaking a noble-gas configuration.", hint: "Na⁺ is isoelectronic with Ne." },
      { q: "Which block is iron in, and what signature follows?", a: "d-block (3d⁶4s²): variable oxidation states (+2, +3) and coloured compounds.", hint: "d-electrons participate." },
    ],
  },

  "ch-3d-micro": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Why a light microscope sees cells but not atoms — resolution arithmetic",
      steps: [
        { text: "Diffraction sets the floor — two points closer than ~λ/2 blur into one:", math: "d_min ≈ 0.61λ/NA; with λ = 550 nm, NA = 1.25 (oil immersion): d ≈ 0.27 µm" },
        { text: "Compare targets:", math: "bacterium 1–2 µm ✓ visible; virus 0.1 µm ✗; atom 0.1–0.3 nm ✗✗" },
        { text: "Magnification without resolution is EMPTY zoom:", math: "×1000 on a 0.27 µm limit shows a big blur, not detail" },
        { text: "Electrons fix it by shrinking the wavelength:", math: "electron λ ≈ 0.004 nm at 100 kV → atomic-scale d ✓" },
        { text: "Oil immersion pays because oil (n = 1.51) raises NA above the 1.0 air ceiling:", math: "NA = n·sinθ → 1.51·sin61° ≈ 1.32 vs air's 1.0 max" },
      ],
      takeaway: "Resolution is a wavelength problem, not a lens problem: light cannot resolve below ~λ/2, so seeing smaller means finding a smaller 'light' — which is exactly what the electron microscope is.",
    },
    theory: [
      {
        heading: "Magnification vs resolution",
        body: "Magnification is how big; resolution is how CLOSELY two points can sit and still be told apart. A compound microscope magnifies via objective × eyepiece (e.g. 40× × 10× = 400×), but its resolving power is locked by NA = n·sinθ and the illumination wavelength. Blue light (450 nm) resolves ~20% finer than red (650 nm) — the reason microscopists prefer blue filters.",
      },
      {
        heading: "Contrast: the other half of seeing",
        body: "Unstained cells are nearly transparent — contrast techniques make structure visible: brightfield staining (iodine, methylene blue), phase contrast (converts phase shifts to brightness, for live cells), dark-field (side illumination), fluorescence (specific molecules tagged and lit at one wavelength). Electron microscopy needs staining or freezing because electrons pass through light atoms almost uniformly.",
      },
    ],
    confusions: [
      {
        wrong: "A bigger magnification always reveals more.",
        right: "Beyond the resolution limit you get 'empty magnification' — a larger blur. Detail is capped by λ and NA, not by eyepiece power.",
        why: "Zoom feels like the definition of seeing more.",
      },
      {
        wrong: "Electron microscopes show colour.",
        right: "Colour is a property of visible wavelengths; EM images are greyscale intensity maps. The colours in famous EM pictures were added afterwards to encode information.",
        why: "Published micrographs are usually colourised, so the colour is taken as recorded.",
      },
      {
        wrong: "A light microscope can see viruses with a strong enough lens.",
        right: "Viruses (20–300 nm) sit far below the ~250 nm light limit. No glass lens system crosses that line — physics, not engineering, blocks it.",
        why: "'Technology will get there' assumes the limit is practical, not fundamental.",
      },
    ],
    questions: [
      { q: "Total magnification of 10× eyepiece + 40× objective?", a: "400×.", hint: "Objective × eyepiece." },
      { q: "Why resolve better with blue than red light?", a: "d_min ∝ λ — shorter wavelength, smaller resolvable detail.", hint: "λ is in the numerator." },
      { q: "What does oil immersion actually change?", a: "NA = n·sinθ: oil's n = 1.51 raises the numerical aperture beyond air's 1.0 ceiling, tightening resolution.", hint: "NA has an n in it." },
    ],
  },

  "ch-calc-ph": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Same 0.01 M concentration: HCl (strong) vs acetic acid (weak, Ka = 1.8×10⁻⁵)",
      steps: [
        { text: "Strong acid — full dissociation:", math: "[H⁺] = 0.01 M → pH = −log(10⁻²) = 2.0" },
        { text: "Weak acid — only part dissociates; solve Ka = x²/(C − x) with x ≪ C:", math: "x = √(Ka·C) = √(1.8×10⁻⁷) = 4.24×10⁻⁴ M" },
        { text: "Its pH:", math: "pH = −log(4.24×10⁻⁴) = 3.37" },
        { text: "Same bottle concentration, 100× fewer free protons:", math: "degree of dissociation α = 4.24×10⁻⁴/0.01 = 4.24%" },
        { text: "The 14 lock: at 25 °C, pH + pOH = pKw = 14 always.", math: "so 0.01 M NaOH has pH = 12" },
      ],
      takeaway: "Concentration sets the ceiling; the dissociation constant sets how close you get to it — pH 2 vs pH 3.37 for identical molarity is the strong/weak distinction made numeric.",
    },
    theory: [
      {
        heading: "pH, Kw, and the water ceiling",
        body: "pH = −log[H⁺(aq)]; water itself contributes [H⁺] = [OH⁻] = 10⁻⁷ at 25 °C (pH 7). Kw = [H⁺][OH⁻] rises with temperature (neutral point drifts to ~6.14 at 100 °C — still neutral, just not 7). Extreme concentrations can give negative pH (>1 M HCl) — the scale is not a 0–14 cage.",
      },
      {
        heading: "Weak acids, buffers, and indicators",
        body: "Weak acids sit in equilibrium: Ka, pKa = −log Ka. Buffers (weak acid + its salt) resist pH change via Henderson–Hasselbalch: pH = pKa + log([salt]/[acid]) — maximal buffering when the ratio is 1 (pH = pKa). Indicators are themselves weak acids whose HIn/In⁻ forms differ in colour; choose one whose transition range brackets the equivalence pH.",
      },
    ],
    confusions: [
      {
        wrong: "Diluting an acid keeps raising pH without limit.",
        right: "Approaching the water contribution: 10⁻⁸ M HCl has pH ≈ 6.98, not 8 — autoionisation dominates and pH never crosses 7 from the acid side.",
        why: "Each ×10 dilution adds 1.0 pH unit UNTIL the water's own 10⁻⁷ takes over.",
      },
      {
        wrong: "A weak acid is safe; a strong acid is dangerous.",
        right: "Strength is about dissociation, not corrosiveness. HF is weak (Ka = 6.6×10⁻⁴) and penetrates skin to kill bone tissue; concentrated weak acids still burn.",
        why: "'Weak' is heard as 'harmless'.",
      },
      {
        wrong: "pH 7 is neutral at any temperature.",
        right: "Neutrality means [H⁺] = [OH⁻], which sits at pH 6.14 at 100 °C because Kw itself grows with T.",
        why: "The 25 °C value is drilled as universal.",
      },
    ],
    questions: [
      { q: "pH of 0.001 M NaOH (strong base)?", a: "pOH = 3 → pH = 11.", hint: "pH + pOH = 14." },
      { q: "Dilute 0.1 M HCl by 100×. New pH?", a: "0.001 M → pH 3 (from 1): each ×10 adds one unit, for a STRONG acid at these concentrations.", hint: "Log scale." },
      { q: "Buffer with equal acid and salt: what is its pH?", a: "pH = pKa (ratio = 1, log 0 = 0) — maximum buffer capacity point.", hint: "Henderson–Hasselbalch." },
    ],
  },

  "ch-calc-titration": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "25.0 mL HCl titrated with 0.10 M NaOH; phenolphthalein turns at 20.0 mL",
      steps: [
        { text: "Moles of base delivered at the endpoint:", math: "n = 0.10 × 0.0200 = 2.0×10⁻³ mol" },
        { text: "1:1 stoichiometry (HCl + NaOH → NaCl + H₂O) gives the acid:", math: "n(HCl) = 2.0×10⁻³ mol → [HCl] = 2.0×10⁻³/0.0250 = 0.080 M" },
        { text: "Why phenolphthalein works here — the pH jump is enormous:", math: "at 19.9 mL pH = 3.7; at 20.1 mL pH = 10.3 — any indicator in 4–10 range reads the same endpoint" },
        { text: "Weak acid variant (0.1 M CH₃COOH vs NaOH): equivalence pH > 7 because:", math: "the conjugate base CH₃COO⁻ hydrolyses: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻" },
        { text: "For the weak case the indicator MUST be in the basic range (phenolphthalein), and half-equivalence gives pKa directly:", math: "at V/2, pH = pKa = 4.76" },
      ],
      takeaway: "Titration maths is one line (M₁V₁ = M₂V₂ × ratio) — the real skill is matching the indicator to the equivalence pH and reading the steep jump, which is where all the precision lives.",
    },
    theory: [
      {
        heading: "Equivalence point vs endpoint",
        body: "The equivalence point is where moles of H⁺ = moles of OH⁻ (stoichiometric); the endpoint is where YOUR indicator changes colour. A good titration aligns the two within a drop. Strong–strong equivalence sits at pH 7; weak acid–strong base above 7 (conjugate base hydrolysis); strong acid–weak base below 7 — and weak–weak pairs make such a shallow curve that no indicator works cleanly.",
      },
      {
        heading: "Technique that makes the numbers honest",
        body: "Rinse the burette with the titrant (water residue dilutes it); remove the air bubble below the tap; read the meniscus at eye level; swirl continuously and add dropwise near the endpoint; do the rough run fast, then triplicate and average within ±0.05 mL. A funnel left in the burette top during delivery, or a partially clotted indicator excess, are the classic precision killers.",
      },
    ],
    confusions: [
      {
        wrong: "Endpoint and equivalence point are the same thing.",
        right: "Equivalence is stoichiometric; endpoint is the indicator's signal. They coincide only when the indicator's range brackets the jump.",
        why: "In strong–strong titrations they coincide so well the distinction hides.",
      },
      {
        wrong: "More indicator gives a clearer, more accurate endpoint.",
        right: "Indicators are themselves acids/bases — excess consumes titrant and shifts the endpoint. Two to three drops only.",
        why: "Stronger colour looks like better visibility.",
      },
      {
        wrong: "Universal indicator is the best choice for titrations.",
        right: "You want a SHARP single transition (phenolphthalein, methyl orange), not a rainbow of partial colour changes — precision dies with a fuzzy endpoint.",
        why: "'Universal' sounds superior.",
      },
    ],
    questions: [
      { q: "20.0 mL of 0.10 M H₂SO₄ needs how much 0.20 M NaOH (full neutralisation)?", a: "n(H⁺) = 2×0.002 = 0.004 → V = 0.004/0.20 = 20.0 mL — note the ×2 for diprotic acid.", hint: "Stoichiometric ratio 1:2." },
      { q: "Which indicator for NH₃ vs HCl titration, and why?", a: "Methyl orange (transition 3.1–4.4): equivalence sits BELOW 7 because NH₄⁺ hydrolyses acidic.", hint: "Equation pH drives indicator choice." },
      { q: "Why do a rough titration first?", a: "To locate the jump fast, then run precisely ±0.05 mL of it — saves 10 minutes per accurate trial.", hint: "Coarse-to-fine." },
    ],
  },

  "ch-calc-gas": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "2.0 L of gas at 1 atm and 27 °C — what volume at STP (1 atm, 273 K)?",
      steps: [
        { text: "Combined gas law (n fixed):", math: "V₂ = V₁·(P₁/P₂)·(T₂/T₁) = 2.0 × 1 × (273/300) = 1.82 L" },
        { text: "Moles from the original state (R = 0.0821 L·atm/mol·K):", math: "n = PV/RT = (1·2.0)/(0.0821·300) = 0.0812 mol" },
        { text: "Cross-check via STP molar volume (22.4 L/mol):", math: "0.0812 × 22.4 = 1.82 L ✓ — two routes agree" },
        { text: "Temperature MUST be kelvin: 27 °C = 300 K. Using 27 would give:", math: "V₂ = 2·(273/27) = 20.2 L — a 1000% error, the classic Celsius trap" },
        { text: "Constant-volume heating doubling T (300→600 K) doubles P:", math: "Gay-Lussac: P₁/T₁ = P₂/T₂ → P₂ = 2 atm" },
      ],
      takeaway: "One law (PV = nRT), four special cases, and one trap: kelvin is not optional. Convert T first, then let the ratios do the arithmetic.",
    },
    theory: [
      {
        heading: "The gas laws as pieces of one equation",
        body: "Boyle (P ∝ 1/V at const T), Charles (V ∝ T), Gay-Lussac (P ∝ T), Avogadro (V ∝ n) assemble into PV = nRT. Standard R values: 0.0821 L·atm/mol·K or 8.314 J/mol·K — pick per unit system. STP: 273.15 K, 1 atm (molar volume 22.4 L); newer IUPAC STP is 273.15 K, 1 bar (22.7 L) — know which your exam uses.",
      },
      {
        heading: "Kinetic theory: why temperature is motion",
        body: "Pressure is molecular bombardment; temperature sets average KE = (3/2)kT per molecule. Root-mean-square speed u = √(3RT/M): at 300 K, helium runs at 1.36 km/s, oxygen 482 m/s — same temperature, different speeds because M differs. Graham's law (effusion ∝ 1/√M) follows directly: helium leaks through a pinhole 2.7× faster than oxygen.",
      },
    ],
    confusions: [
      {
        wrong: "Celsius works in the gas formulas.",
        right: "The laws are proportional to absolute temperature: 0 °C is 273 K of thermal energy. Charles' law plotted in °C hits V = 0 at −273 °C — the kelvin scale's origin.",
        why: "Laboratory thermometers read °C, so the units carry over by inertia.",
      },
      {
        wrong: "A gas has a fixed volume.",
        right: "It HAS the container: 1 mol of gas is 22.4 L at STP, but the same molecules spread to any volume offered — unlike liquids/solids, volume is a variable you choose.",
        why: "Solids and liquids train 'volume is a property of the stuff'.",
      },
      {
        wrong: "Real gases always deviate badly from PV = nRT.",
        right: "Near STP most common gases follow it within ~1%; deviations blow up only at high pressure or near condensation (then van der Waals corrections matter).",
        why: "The 'ideal gas is fiction' framing is remembered without its range of validity.",
      },
    ],
    questions: [
      { q: "A sealed balloon rises; outside P drops and T drops. Which dominates?", a: "Depends on rates, but near the surface P falls faster than T: balloon expands slightly then stabilises — full analysis needs both ratios.", hint: "Combined law: two ratios compete." },
      { q: "Tyre reads 30 psi (gauge) in summer, cools 20 °C overnight. What happens?", a: "Absolute T falls ~7%, so absolute pressure falls ~7% — gauge reads proportionally lower; winter tyres go visibly soft.", hint: "P ∝ T at constant V." },
      { q: "u_rms of O₂ at 300 K (M = 0.032 kg/mol)?", a: "u = √(3·8.314·300/0.032) = 483 m/s.", hint: "SI units: R = 8.314, M in kg." },
    ],
  },

  "ch-calc-molarmass": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "0.50 g of a gas occupies 250 mL at 27 °C and 750 mmHg — find its molar mass",
      steps: [
        { text: "Convert to the equation's units:", math: "P = 750/760 = 0.987 atm; V = 0.250 L; T = 300 K" },
        { text: "Moles from PV = nRT:", math: "n = (0.987 × 0.250)/(0.0821 × 300) = 0.0100 mol" },
        { text: "Molar mass is mass per mole:", math: "M = 0.50/0.0100 = 50 g/mol" },
        { text: "Identity check: 50 g/mol suggests NO (30) no, C₂H₆ no — closest real gases: ~48–51 is odd, so likely a mixture or a measurement artefact — which is the point: M is a FINGERPRINT you compare against the table.", math: "compare with known M values" },
        { text: "Formula-mass route for compounds:", math: "H₂SO₄ = 2(1) + 32 + 4(16) = 98 g/mol → 9.8 g = 0.100 mol = 6.02×10²² molecules" },
      ],
      takeaway: "Molar mass is the bridge between grams you can weigh and moles you can react: gas-data route (PV = nRT then m/n) or formula route (sum atomic masses) — both end at g/mol.",
    },
    theory: [
      {
        heading: "The mole concept",
        body: "A mole is 6.022×10²³ particles — chemists' dozen. Molar mass M (g/mol) carries the SAME number as the atomic/molecular mass in u, which is why carbon-12's definition makes both scales line up. Moles convert: grams ↔ moles (via M), moles ↔ particles (via N_A), moles ↔ gas volume at STP (via 22.4 L/mol).",
      },
      {
        heading: "Percentage composition and empirical formulas",
        body: "From % composition: divide each element's mass % by its atomic mass, divide through by the smallest → empirical formula (simplest ratio). Compare empirical formula mass with measured molar mass → molecular formula is a whole-number multiple. Example: 40% C, 6.7% H, 53.3% O → CH₂O (30 g/mol); if M = 180, the molecule is C₆H₁₂O₆ — glucose.",
      },
    ],
    confusions: [
      {
        wrong: "A mole is a mass.",
        right: "It is a COUNT (6.022×10²³ particles). Mass only enters via molar mass: 1 mol of H₂ weighs 2 g, 1 mol of O₂ weighs 32 g — same count, different masses.",
        why: "Both are measured on balances, so the count/mass distinction blurs.",
      },
      {
        wrong: "Atomic mass and molar mass are different numbers.",
        right: "Numerically identical (12 for carbon), different units: u per atom, g per mole. The unity is deliberate (carbon-12 definition).",
        why: "Different words suggest different values.",
      },
      {
        wrong: "22.4 L works for any gas at any condition.",
        right: "Only at STP (273 K, 1 atm) and only for ideal behaviour. At 25 °C the molar volume is already 24.5 L.",
        why: "The number is memorised without its conditions.",
      },
    ],
    questions: [
      { q: "Molecules in 4.4 g of CO₂ (M = 44)?", a: "0.10 mol → 6.02×10²² molecules.", hint: "Divide by M, multiply by N_A." },
      { q: "Mass of ONE water molecule?", a: "18 g/mol ÷ 6.022×10²³ = 3.0×10⁻²³ g.", hint: "Per-molecule = M/N_A." },
      { q: "Empirical formula: 40% C, 6.7% H, 53.3% O?", a: "3.33 : 6.7 : 3.33 → 1 : 2 : 1 → CH₂O.", hint: "Divide by atomic masses, then by the smallest." },
    ],
  },

  "ch-calc-stoich": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Burn 8 g methane (CH₄) with only 20 g oxygen: CH₄ + 2O₂ → CO₂ + 2H₂O",
      steps: [
        { text: "Convert both to moles (M: CH₄ 16, O₂ 32):", math: "n(CH₄) = 8/16 = 0.50 mol;  n(O₂) = 20/32 = 0.625 mol" },
        { text: "Stoichiometry demands 2 mol O₂ per 1 mol CH₄:", math: "0.50 mol CH₄ needs 1.0 mol O₂ — but only 0.625 available → O₂ is LIMITING" },
        { text: "Everything is measured against the limiting reagent:", math: "CH₄ burned = 0.625/2 = 0.3125 mol (5 g); CH₄ left over = 3 g" },
        { text: "Products:", math: "CO₂ = 0.3125 mol = 13.75 g;  H₂O = 0.625 mol = 11.25 g" },
        { text: "Mass conservation audit:", math: "in: 8 + 20 = 28 g;  out: 13.75 + 11.25 + 3.0 (leftover) = 28 g ✓" },
      ],
      takeaway: "Balanced equations are mole recipes: convert everything to moles, find the limiting reagent by dividing by coefficients, and let the mass audit (28 = 28) prove you dropped nothing.",
    },
    theory: [
      {
        heading: "The limiting reagent algorithm",
        body: "Four steps, always: (1) balance the equation; (2) convert all given masses to moles; (3) divide each reactant's moles by its coefficient — the SMALLEST result is limiting; (4) compute all products from the limiting reagent's mole budget. Percent yield = actual/theoretical × 100; real labs lose product in transfers and side reactions, so 100% is theoretical, not typical.",
      },
      {
        heading: "Solution stoichiometry",
        body: "For solutions the mole count comes from concentration: n = M·V (mol/L × L). Titration maths is exactly this: M₁V₁·(ratio) = M₂V₂. For gases at STP, volume converts via 22.4 L/mol. The unit-conversion chain is the whole subject — mass ⇄ moles ⇄ particles/volume/solution — and every exam question is a link in that chain.",
      },
    ],
    confusions: [
      {
        wrong: "The reactant you have LESS MASS of is limiting.",
        right: "The MOLE RATIO decides: 1 g of H₂ limits a 32 g O₂ reaction even though O₂ weighs 32× more.",
        why: "Grams are what the balance shows; moles are what the recipe speaks.",
      },
      {
        wrong: "Reactants must be in exact stoichiometric ratio.",
        right: "Real reactions run with one reagent in excess — deliberately (cheap reagent drives expensive one) — and the excess is simply left over.",
        why: "Textbook problems give exact ratios, so excess feels abnormal.",
      },
      {
        wrong: "A 100% yield is the normal expectation.",
        right: "Theoretical yield assumes zero loss; transfers, side reactions and equilibrium caps make 70–90% typical, and 'why is my yield low' is standard lab thinking.",
        why: "Classroom arithmetic always balances perfectly.",
      },
    ],
    questions: [
      { q: "Fe + S → FeS: 11.2 g Fe (M 56) with 4.8 g S (M 32). Limiting reagent and FeS mass?", a: "0.2 mol Fe vs 0.15 mol S → S limiting; FeS = 0.15 × 88 = 13.2 g.", hint: "Divide by coefficients (1:1 here)." },
      { q: "Neutralise 25 mL of 0.1 M HCl with 0.05 M NaOH: volume?", a: "M₁V₁ = M₂V₂ → V₂ = (0.1×25)/0.05 = 50 mL.", hint: "1:1 ratio." },
      { q: "2.0 g H₂ burned in 100 g O₂: water formed?", a: "H₂ limiting (1 mol vs 3.125 needed? no: needs 0.5 mol O₂ per 1 mol H₂ → 0.5 mol O₂ needed, 3.125 available) → H₂O = 1 mol = 18 g.", hint: "2H₂ + O₂ → 2H₂O." },
    ],
  },

  "molecular-builder": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "One centre, three shapes: CH₄, NH₃, H₂O all have 4 electron groups",
      steps: [
        { text: "Count electron groups around each central atom (VSEPR):", math: "C: 4 bonds + 0 lone pairs;  N: 3 bonds + 1 LP;  O: 2 bonds + 2 LP" },
        { text: "Electron geometry is tetrahedral for all three — but the MOLECULAR shape collapses as lone pairs squeeze:", math: "CH₄ 109.5° → NH₃ 107° → H₂O 104.5°" },
        { text: "Why the squeeze: lone pair density spreads wider than bonding pairs:", math: "LP–LP > LP–BP > BP–BP repulsion ✓" },
        { text: "No-lone-pair neighbours for contrast:", math: "CO₂ (2 groups) linear 180°;  BF₃ (3 groups) trigonal planar 120°;  SF₆ (6 groups) octahedral 90°" },
        { text: "Polarity check on the trio:", math: "CH₄ symmetric → μ = 0;  NH₃ asymmetric → μ = 1.47 D;  H₂O bent → μ = 1.85 D (the reason water dissolves salts)" },
      ],
      takeaway: "Count electron groups, place them maximally apart, then subtract lone pairs to get the molecular shape — one algorithm predicts every geometry from methane to SF₆, and symmetry decides the dipole.",
    },
    theory: [
      {
        heading: "VSEPR and hybridisation",
        body: "Electron groups (bonds or lone pairs) repel and settle at maximum separation: 2 → linear, 3 → trigonal planar, 4 → tetrahedral, 5 → trigonal bipyramidal, 6 → octahedral. Hybridisation vocabulary maps onto it: sp³ (tetrahedral C in CH₄), sp² (trigonal planar, the double-bond C in ethene), sp (linear, the triple-bond C in ethyne). Lone pairs demand more angular room — every degree drop from 109.5° is a lone pair at work.",
      },
      {
        heading: "Bond parameters and polarity",
        body: "Bond length shrinks as order rises (C–C 154 pm > C=C 134 > C≡C 120); bond energy rises the same way. Polarity is a tug-of-war of electronegativities (ΔEN > ~0.5 is 'polar'), but the MOLECULE is polar only if the dipoles do not cancel by symmetry — CCl₄ has four polar bonds and zero dipole; H₂O has two and a large dipole.",
      },
    ],
    confusions: [
      {
        wrong: "Molecular shape equals electron-group shape.",
        right: "Electron geometry includes lone pairs; molecular shape looks only at ATOM positions. NH₃'s electron geometry is tetrahedral; its shape is pyramidal.",
        why: "Both derive from the same count, so the two-layer distinction hides.",
      },
      {
        wrong: "A double bond is two independent single bonds.",
        right: "It is one σ bond plus one π bond — a single structural unit counting as ONE electron group in VSEPR, shorter and stronger overall.",
        why: "'Double = two' is the everyday reading of the word.",
      },
      {
        wrong: "Polar bonds always make a polar molecule.",
        right: "Symmetry can cancel them exactly: CO₂ and CCl₄ have polar bonds but zero net dipole.",
        why: "Bond-level intuition is applied directly at molecule level.",
      },
    ],
    questions: [
      { q: "Shape of SF₆ and its bond angle?", a: "Octahedral, 90° — six electron groups, no lone pairs.", hint: "Count groups." },
      { q: "Why is water bent rather than linear?", a: "Two lone pairs on O repel the bonding pairs, collapsing 109.5° to 104.5° and the shape to 'bent'.", hint: "LP–BP repulsion." },
      { q: "Dipole of CCl₄ despite polar C–Cl bonds?", a: "Zero — four identical dipoles in tetrahedral symmetry cancel exactly.", hint: "Vector sum." },
    ],
  },

  "ch-3d-molecules": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Four substances, one question — why do their properties differ? NaCl, H₂O, CH₄, diamond",
      steps: [
        { text: "NaCl — ionic: the numbers that matter:", math: "lattice energy 787 kJ/mol → mp 801 °C; conducts only when MOLTEN or dissolved (ions must move)" },
        { text: "H₂O — polar covalent with hydrogen bonding:", math: "O–H ΔEN = 1.24; H-bonds need ~20 kJ/mol each → bp 100 °C vs H₂S's −60 °C (no H-bonding, similar mass)" },
        { text: "CH₄ — nonpolar covalent, only dispersion forces:", math: "bp −161 °C — the weakest intermolecular force of the four" },
        { text: "Diamond — giant covalent NETWORK (sp³ throughout):", math: "mp ≈ 3550 °C, hardest natural solid — but no ions, no charge carriers" },
        { text: "The sorting rule: properties report the STRONGEST force present:", math: "ionic/network > H-bond > dipole–dipole > dispersion" },
      ],
      takeaway: "Bonding type is not a label but a prediction machine: lattice energy, hydrogen bonding or network covalency — whoever is strongest at the table sets melting point, conductivity and solubility.",
    },
    theory: [
      {
        heading: "The bonding spectrum",
        body: "Ionic (metal + non-metal, ΔEN > ~1.7, electrons transferred) to nonpolar covalent (identical atoms, shared evenly) with polar covalent between — one spectrum, not three boxes. Metallic bonding is a lattice of cations in a delocalised electron sea: that sea is why metals conduct, bend and shine. Intermolecular forces (dispersion, dipole, H-bond) hold MOLECULES together and are typically 10–40 kJ/mol — far weaker than the covalent bonds inside them (150–1000 kJ/mol).",
      },
      {
        heading: "Reading properties as evidence",
        body: "Conducts as solid? Metallic or graphite. Conducts molten/aqueous only? Ionic. High mp, hard, insoluble, non-conducting? Network covalent (diamond, SiO₂). Low mp/bp molecular? Dispersion-dominated (symmetry decides polarity). Soluble in water? Ionic or H-bonding capable. 'Like dissolves like' is the solvent-side echo of the same rule.",
      },
    ],
    confusions: [
      {
        wrong: "Ionic solids conduct electricity.",
        right: "Only when molten or dissolved — the ions must be FREE to move. In the crystal they are locked in place (the electrons are not free either).",
        why: "Metals conduct as solids, and 'conductive' transfers to all 'strong' bonds.",
      },
      {
        wrong: "Covalent bonds are weak.",
        right: "INTRAMOLECULAR covalent bonds are the strongest forces in chemistry (O–H 463 kJ/mol); it is the INTERMOLECULAR attractions that are weak (1–40 kJ/mol). Water boiling breaks H-bonds, not O–H bonds.",
        why: "Low boiling points of molecular substances are read as 'weak covalent bonds'.",
      },
      {
        wrong: "All hard, high-melting solids are ionic.",
        right: "Diamond, SiO₂, SiC are giant covalent networks — harder and higher-melting than most ionic solids, with no ions at all.",
        why: "The mp-ionic correlation holds for the common salts met first.",
      },
    ],
    questions: [
      { q: "Why does NaCl dissolve in water?", a: "Water's dipoles hydrate Na⁺ and Cl⁻, paying the lattice energy back in hydration energy (ΔH_soln ≈ +3.9 kJ/mol, driven by entropy).", hint: "Ion–dipole vs lattice." },
      { q: "Why is H₂O's boiling point 160 ° above H₂S's?", a: "Hydrogen bonding in water — O's high electronegativity creates strong O–H···O attractions S cannot make.", hint: "Compare ΔEN." },
      { q: "Bond order of O₂ and its consequence?", a: "2 (double bond, MO theory) — strong but paramagnetic (two unpaired electrons in π*).", hint: "MO theory." },
    ],
  },

  "ch-3d-syllabus-suite": {
    proof: {
      title: "Proof on a specific case — the syllabus in one reaction",
      case: "Born–Haber cycle for NaCl: from electron configurations to −412 kJ/mol",
      steps: [
        { text: "Configurations decide the players:", math: "Na [Ne]3s¹ (gives 1 e⁻),  Cl [Ne]3s²3p⁵ (takes 1 e⁻) — an octet handshake" },
        { text: "Energy to CREATE the ions:", math: "sublime Na: +107; ionise Na: +496; dissociate ½Cl₂: +121; add e⁻ to Cl: −349 → subtotal +375 kJ/mol" },
        { text: "The ions alone cost energy — the lattice must pay it back:", math: "lattice energy U = −787 kJ/mol (gas ions → crystal)" },
        { text: "Total formation enthalpy:", math: "ΔH_f = 107 + 496 + 121 − 349 − 787 = −412 kJ/mol ✓ (measured: −411)" },
        { text: "Reading the ledger: without the 787 kJ/mol lattice, NaCl could never form spontaneously:", math: "+375 kJ/mol is ENDOTHERMIC — the crystal is what makes it exothermic" },
      ],
      takeaway: "One reaction connects atomic structure (configurations), periodicity (IE, EA), bonding (lattice energy) and energetics (Hess) — and the audit shows the lattice, not the octet, is what pays the bill.",
    },
    theory: [
      {
        heading: "The chain: structure → periodicity → bonding → energetics",
        body: "Electron configuration explains the periodic table; the periodic table predicts ion formation; ion formation plus lattice energy decides ionic compounds; Hess's law books the energies. Every NEB chemistry unit is a station on this line, and a Born–Haber cycle is the whole line walked once with real numbers.",
      },
      {
        heading: "Reaction types and the energy profile",
        body: "Classify by what moves: electrons (redox), protons (acid–base), ions (precipitation), or atoms rearranging (decomposition, synthesis). Every reaction sits on an energy profile with an activation barrier — exothermic means the PRODUCTS are lower, not that the reaction starts easily (paper needs a match). Catalysts lower the barrier; they never move the ΔH.",
      },
    ],
    confusions: [
      {
        wrong: "Atoms react to 'complete their octet' because octets are special.",
        right: "The octet rule DESCRIBES the outcome; the CAUSE is energy bookkeeping — ionisation cost, electron affinity gain, and lattice/hydration energy. NaCl forms because −412 < 0, not because of a rule.",
        why: "The rule is taught as the reason instead of the pattern.",
      },
      {
        wrong: "Exothermic reactions need no energy to start.",
        right: "Activation energy exists for both exo and endo — even burning paper needs a spark; ΔH is about the products' level, not the barrier.",
        why: "Spontaneous-feeling reactions (burning) hide the barrier behind the match.",
      },
      {
        wrong: "Entropy must increase in every reaction.",
        right: "Only for the UNIVERSE: the system's entropy may fall (ice forming) if the surroundings gain more. ΔG = ΔH − TΔS is the arbiter.",
        why: "The second law is compressed to 'disorder always wins'.",
      },
    ],
    questions: [
      { q: "Why does Na react with Cl₂ but not with N₂ under normal conditions?", a: "N₂'s triple bond (941 kJ/mol) is a huge activation barrier; Cl₂ dissociates easily (243 kJ/mol) and Cl⁻ formation is favourable.", hint: "Bond dissociation energies." },
      { q: "Born–Haber for MgO: why is the lattice energy even bigger (~−3800 kJ/mol)?", a: "2+ and 2− charges and smaller ions: U ∝ |q₁q₂|/r — four times the charge product of NaCl, twice the lattice energy per term.", hint: "Coulomb scaling." },
      { q: "Classify: Zn + CuSO₄ → ZnSO₄ + Cu", a: "Single displacement redox (Zn oxidised, Cu²⁺ reduced) — electron transfer is the event.", hint: "Follow the electrons." },
    ],
  },
};
