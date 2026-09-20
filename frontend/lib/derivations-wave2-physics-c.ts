/**
 * Physics Derivations — Wave 2C (Class 11: the remaining high-yield slots).
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

const p2c: DerivationOrTheorem[] = [
  {
    id: "phy-11-gauss-law-applications",
    slug: "gauss-law-and-applications",
    title: "Gauss Law: Electric Flux & Field of Sphere, Line Charge, Sheet",
    subject: "physics",
    unit: "Electric Field",
    unitId: "electric-field",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Electrostatics)",
    isExtra: false,
    statement:
      "Total electric flux through a closed surface equals the enclosed charge over ε₀; symmetry turns this one line into the fields of spheres, wires and sheets.",
    coreFormula: "\\oint \\vec E \\cdot d\\vec A = \\frac{q_{enc}}{\\varepsilon_0}",
    concernedTerms: [
      { term: "Electric flux", symbol: "Φ", units: "N m² C⁻¹", definition: "E·A count of field lines through a surface." },
      { term: "Gaussian surface", symbol: "—", units: "—", definition: "Imaginary closed surface chosen to match the symmetry." },
    ],
    assumptions: ["Static charges.", "Symmetric charge distributions for the applications."],
    proofSteps: [
      { stepNumber: 1, title: "Solid angle argument", latex: "\\oint d\\Omega = 4\\pi \\Rightarrow \\oint \\vec E\\cdot d\\vec A = \\frac{q}{4\\pi\\varepsilon_0}\\,4\\pi = \\frac{q}{\\varepsilon_0}", explanation: "Coulomb field lines subtend total solid angle 4π from any enclosing surface — flux counts only enclosed charge." },
      { stepNumber: 2, title: "Uniformly charged sphere", latex: "E_{out} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2}, \\quad E_{in} = \\frac{qr}{4\\pi\\varepsilon_0 R^3}", explanation: "Spherical Gaussian surface: outside acts as a point charge; inside (uniform volume charge) grows linearly with r." },
      { stepNumber: 3, title: "Infinite line charge", latex: "E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}", explanation: "Cylindrical Gaussian surface of radius r, length L: E·2πrL = λL/ε₀ — the end caps contribute nothing." },
      { stepNumber: 4, title: "Infinite plane sheet", latex: "E = \\frac{\\sigma}{2\\varepsilon_0}", explanation: "Pillbox crossing the sheet: E·2A = σA/ε₀; field is uniform and independent of distance." },
    ],
    conclusion:
      "Gauss's law converts symmetry into fields: sphere (1/r²), line (1/r), sheet (constant) — no integration needed.",
    keyTakeaways: [
      "Choose the Gaussian surface so E is constant or zero over it.",
      "Charge outside contributes zero NET flux (lines enter and leave).",
      "Conductors: all excess charge sits on the surface; E = 0 inside.",
    ],
    examTraps: [
      "Applying the sphere's inside formula to a conducting shell (E = 0 inside a conductor).",
      "Forgetting the factor 2 in the sheet's field.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Conducting shell", condition: "All charge on surface", formula: "E_{inside} = 0,\\ E_{out} = \\frac{kq}{r^2}", meaning: "Electrostatic shielding — the Faraday cage principle." },
      { name: "Two parallel sheets (+σ, −σ)", condition: "Capacitor geometry", formula: "E_{between} = \\frac{\\sigma}{\\varepsilon_0},\\ E_{out} = 0", meaning: "Fields add between, cancel outside — the parallel-plate result." },
      { name: "Spherical shell inside", condition: "r < R, shell charge", formula: "E = 0", meaning: "Shell theorem: no field inside an empty shell." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-11-mirror-formula-11",
    slug: "mirror-formula",
    title: "Mirror Formula — 1/v + 1/u = 1/f (Concave & Convex Mirrors)",
    subject: "physics",
    unit: "Reflection at Curved Mirror",
    unitId: "reflection-at-curved-mirror",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Optics)",
    isExtra: false,
    statement:
      "For paraxial rays on a spherical mirror, object and image distances obey 1/v + 1/u = 1/f = 2/R; magnification m = −v/u.",
    coreFormula: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f} = \\frac{2}{R}, \\qquad m = -\\frac{v}{u}",
    concernedTerms: [
      { term: "Pole", symbol: "P", units: "—", definition: "Centre of the mirror surface — origin for all distances." },
      { term: "Focal length", symbol: "f", units: "m", definition: "f = R/2; concave positive, convex negative (Cartesian)." },
    ],
    assumptions: ["Paraxial rays.", "Spherical mirror with small aperture."],
    proofSteps: [
      { stepNumber: 1, title: "Ray through the pole", latex: "\\tan\\theta = \\frac{h}{-u} = \\frac{h'}{v}", explanation: "Incidence = reflection at the pole gives similar triangles in object and image space." },
      { stepNumber: 2, title: "Ray through the focus", latex: "\\frac{h}{-u - f} = \\frac{h'}{-f}", explanation: "A ray towards F reflects parallel to the axis; small-angle geometry relates heights and distances." },
      { stepNumber: 3, title: "Eliminate the heights", latex: "\\frac{v}{-u} = \\frac{v - f}{f} \\;\\Rightarrow\\; \\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}", explanation: "Rearranging with the Cartesian sign convention produces the mirror formula, valid for both mirror types." },
      { stepNumber: 4, title: "Magnification", latex: "m = \\frac{h'}{h} = -\\frac{v}{u}", explanation: "From the pole-ray similar triangles; the minus sign handles inversion automatically." },
    ],
    conclusion:
      "One sign-consistent equation serves every spherical mirror; f = R/2 and m = −v/u complete the toolkit.",
    keyTakeaways: [
      "Sign discipline is everything — draw, assign, then compute.",
      "Real image ⇔ light actually converges (v negative for concave setups).",
      "Convex always: virtual, erect, diminished (|m| < 1).",
    ],
    examTraps: [
      "Mixing 'real-is-positive' and Cartesian conventions in one solution.",
      "Forgetting f = R/2 when R is given.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Object at infinity", condition: "u → ∞", formula: "v = f", meaning: "Image at the focus — how f is measured." },
      { name: "Object at C", condition: "u = 2f", formula: "v = 2f,\\ m = -1", meaning: "Same-size inverted image." },
      { name: "Object inside F", condition: "u < f (concave)", formula: "v > 0,\\ m > 1", meaning: "Virtual, erect, magnified — the shaving-mirror case." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-11-vertical-circle-minimum-speed",
    slug: "motion-in-vertical-circle",
    title: "Circular Motion: Motion in a Vertical Circle & Minimum Speeds",
    subject: "physics",
    unit: "Circular Motion",
    unitId: "circular-motion",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Circular Motion)",
    isExtra: false,
    statement:
      "For a mass whirled in a vertical circle, tension varies with position; completing the loop requires v_top ≥ √(gL) and hence v_bottom ≥ √(5gL).",
    coreFormula: "v_{top,min} = \\sqrt{gL}, \\qquad v_{bottom,min} = \\sqrt{5gL}",
    concernedTerms: [
      { term: "Tension at top", symbol: "T_top", units: "N", definition: "T = mv²/L − mg; can reach zero (string slack)." },
      { term: "Tension at bottom", symbol: "T_bot", units: "N", definition: "T = mv²/L + mg — largest point of the loop." },
    ],
    assumptions: ["String massless, taut.", "No friction or air drag."],
    proofSteps: [
      { stepNumber: 1, title: "Radial equation at the top", latex: "T_{top} + mg = \\frac{mv_{top}^2}{L}", explanation: "Both weight and tension point towards the centre at the highest point." },
      { stepNumber: 2, title: "Critical condition", latex: "T_{top} = 0 \\Rightarrow v_{top,min} = \\sqrt{gL}", explanation: "The loop survives only if the string stays taut; the minimum speed makes tension just vanish." },
      { stepNumber: 3, title: "Energy conservation to the bottom", latex: "\\tfrac{1}{2}mv_{bot}^2 = \\tfrac{1}{2}mv_{top}^2 + mg(2L)", explanation: "The bottom is 2L below the top; mechanical energy is conserved." },
      { stepNumber: 4, title: "Minimum bottom speed", latex: "v_{bot}^2 = gL + 4gL = 5gL \\Rightarrow v_{bot,min} = \\sqrt{5gL}", explanation: "Substituting the critical top speed — the famous √(5gL) launch condition." },
    ],
    conclusion:
      "Gravity's varying radial component makes the bottom speed ~2.24× the top's minimum: √(5gL) at the bottom keeps the loop taut.",
    keyTakeaways: [
      "At the side points the radial force is pure tension (weight is tangential).",
      "T_top = mv²/L − mg; T_bot = mv²/L + mg — difference is always 6mg at critical speeds.",
      "Speed is maximum at the bottom, minimum at the top.",
    ],
    examTraps: [
      "Using v = √(gL) at the bottom (that's the TOP minimum).",
      "Forgetting the 2L height difference in the energy step.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Condition at horizontal point", condition: "θ from top = 90°", formula: "v^2 = 3gL", meaning: "From energy conservation between top and side." },
      { name: "Rod instead of string", condition: "Rigid support", formula: "v_{top,min} = 0", meaning: "A rod can push — the loop completes even slowly." },
      { name: "Buckets of water / loops", condition: "Contact force N ≥ 0", formula: "N_{top} + mg = mv^2/L", meaning: "Same mathematics as the string for track contacts." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-11-ohms-law-drift",
    slug: "ohms-law-resistance-drift-velocity",
    title: "DC Circuits: Ohm's Law, Resistance & Drift Velocity Relation",
    subject: "physics",
    unit: "DC Circuits",
    unitId: "dc-circuits",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Electricity)",
    isExtra: false,
    statement:
      "Current through a conductor is proportional to potential difference (V = IR); microscopically I = neAv_d with v_d = eEτ/m gives the resistivity ρ = m/ne²τ.",
    coreFormula: "V = IR, \\qquad I = neAv_d, \\qquad R = \\rho\\frac{l}{A}",
    concernedTerms: [
      { term: "Resistance", symbol: "R", units: "Ω", definition: "Opposition to current; geometry (l/A) times material resistivity." },
      { term: "Resistivity", symbol: "ρ", units: "Ω·m", definition: "Material property; copper ~1.7 × 10⁻⁸." },
    ],
    assumptions: ["Ohmic conductor at constant temperature.", "Uniform cross-section."],
    proofSteps: [
      { stepNumber: 1, title: "Ohm's law statement", latex: "V \\propto I \\Rightarrow V = IR", explanation: "Experimental linear V–I characteristic for metals at constant temperature." },
      { stepNumber: 2, title: "Microscopic current", latex: "I = neAv_d", explanation: "Charge density n·e in a cylinder of length v_d·Δt crosses per unit time." },
      { stepNumber: 3, title: "Connect to field", latex: "v_d = \\frac{eE\\tau}{m} = \\frac{eV\\tau}{ml}", explanation: "Relaxation-time model with E = V/l along the wire." },
      { stepNumber: 4, title: "Derive resistivity", latex: "R = \\frac{V}{I} = \\frac{m}{ne^2\\tau}\\cdot\\frac{l}{A} = \\rho\\frac{l}{A}", explanation: "Equating both expressions of R identifies ρ = m/ne²τ — geometry separate from material." },
    ],
    conclusion:
      "Ohm's law and the drift picture meet at ρ = m/ne²τ: resistance is geometry (l/A) times material physics (τ, n).",
    keyTakeaways: [
      "R ∝ l, R ∝ 1/A — stretch a wire and R grows as l².",
      "Ohmic vs non-ohmic: only linearity through the origin counts.",
      "Conductivity σ = 1/ρ = ne²τ/m.",
    ],
    examTraps: [
      "Assuming V ∝ I for all materials (diodes, electrolytes fail).",
      "Using diameter where area belongs in R = ρl/A.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Series resistors", condition: "Same current", formula: "R_s = R_1 + R_2 + \\cdots", meaning: "Drops add; equivalent resistance grows." },
      { name: "Parallel resistors", condition: "Same voltage", formula: "\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots", meaning: "Currents add; equivalent resistance is smaller than the smallest." },
      { name: "n equal resistors in parallel", condition: "R each", formula: "R_p = R/n", meaning: "Instant result for symmetric networks." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-11-newtons-law-of-cooling",
    slug: "newtons-law-of-cooling",
    title: "Quantity of Heat: Newton's Law of Cooling & Its Verification",
    subject: "physics",
    unit: "Quantity of Heat",
    unitId: "quantity-of-heat",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Heat)",
    isExtra: false,
    statement:
      "For small temperature excess, the rate of cooling is proportional to the excess over surroundings: dT/dt = −k(T − T_s), giving exponential decay of temperature.",
    coreFormula: "\\frac{dT}{dt} = -k(T - T_s) \\;\\Rightarrow\\; T = T_s + (T_0 - T_s)e^{-kt}",
    concernedTerms: [
      { term: "Excess temperature", symbol: "T − T_s", units: "K", definition: "Difference between body and surroundings." },
      { term: "Cooling constant", symbol: "k", units: "s⁻¹", definition: "Depends on surface area, emissivity and heat capacity." },
    ],
    assumptions: [
      "Temperature excess is small (radiation ≈ linearised).",
      "Surroundings at constant T_s; body uniform temperature.",
    ],
    proofSteps: [
      { stepNumber: 1, title: "Statement of the law", latex: "-\\frac{dQ}{dt} \\propto (T - T_s)", explanation: "Empirical: cooling rate grows with excess temperature for small excess." },
      { stepNumber: 2, title: "Heat content link", latex: "dQ = mc\\,dT \\Rightarrow \\frac{dT}{dt} = -\\frac{k}{mc}(T - T_s)", explanation: "Body loses heat at the cooling rate; its temperature falls accordingly." },
      { stepNumber: 3, title: "Integrate", latex: "\\int_{T_0}^{T}\\frac{dT}{T - T_s} = -K\\int_0^t dt", explanation: "Separable first-order ODE — the same mathematics as radioactive decay." },
      { stepNumber: 4, title: "Solution", latex: "T - T_s = (T_0 - T_s)e^{-Kt}", explanation: "Excess temperature decays exponentially; a plot of log(T−T_s) vs t is a straight line — the verification experiment." },
    ],
    conclusion:
      "Newton's cooling gives exponential approach to ambient temperature, valid for small excesses — verified by the straight-line log plot.",
    keyTakeaways: [
      "Applies well below ~30–40 K excess (linearised radiation).",
      "The slope of log(T−T_s) vs t gives k directly.",
      "Same structure as RL decay, discharge, and half-life — one maths, many units.",
    ],
    examTraps: [
      "Applying the law to large excesses (radiation is T⁴ then).",
      "Reading T_s from a thermometer near the apparatus (radiation shield needed).",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Rate vs excess graph", condition: "Verification experiment", formula: "\\frac{dT}{dt} \\text{ vs } (T - T_s) \\text{ is linear}", meaning: "Slope gives k/c-m — the practical exam output." },
      { name: "Calorimetry use", condition: "Specific heat measurement", formula: "k_1c_1m_1 = k_2c_2m_2", meaning: "Equal rates ⇒ equal cooling capacities — comparison method." },
      { name: "Time to reach a target", condition: "T(t) = target", formula: "t = \\frac{1}{K}\\ln\\frac{T_0 - T_s}{T - T_s}", meaning: "Invert the solution for cooling-time questions." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-11-ideal-gas-equation",
    slug: "ideal-gas-equation-derivation",
    title: "Ideal Gas: Derivation of the Ideal Gas Equation (PV = nRT)",
    subject: "physics",
    unit: "Ideal Gas",
    unitId: "ideal-gas",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Thermodynamics)",
    isExtra: false,
    statement:
      "Combining Boyle's, Charles' and Avogadro's laws for one mole yields PV = RT; for n moles PV = nRT with the universal constant R.",
    coreFormula: "pV = nRT, \\qquad R = 8.314\\ \\text{J mol}^{-1}\\text{K}^{-1}",
    concernedTerms: [
      { term: "Universal gas constant", symbol: "R", units: "J K⁻¹ mol⁻¹", definition: "Same for all gases — the per-mole work coefficient." },
      { term: "Boltzmann constant", symbol: "k_B", units: "J K⁻¹", definition: "R/N_A = 1.38 × 10⁻²³; per-molecule version." },
    ],
    assumptions: [
      "Molecules are point masses (no volume).",
      "No intermolecular forces (except elastic collisions).",
    ],
    proofSteps: [
      { stepNumber: 1, title: "Boyle's law", latex: "pV = \\text{const} \\ (T, n)", explanation: "Isothermal: p doubles when V halves." },
      { stepNumber: 2, title: "Charles' law", latex: "V/T = \\text{const} \\ (p, n)", explanation: "Isobaric: V scales with absolute T." },
      { stepNumber: 3, title: "Combine + Avogadro", latex: "\\frac{pV}{T} = \\text{const} = nR", explanation: "For one mole the constant is R (fixed by STP conditions); n moles scale linearly." },
      { stepNumber: 4, title: "Kinetic theory cross-check", latex: "pV = \\tfrac{1}{3}Nm\\bar{c^2} = \\tfrac{2}{3}N\\bar{KE} = Nk_BT", explanation: "The microscopic derivation gives the same law with k_B — temperature IS mean kinetic energy." },
    ],
    conclusion:
      "pV = nRT (or pV = Nk_BT) unifies the gas laws and ties temperature to molecular motion.",
    keyTakeaways: [
      "R has many unit faces: 8.314 J, 0.0821 L·atm, 2 cal.",
      "k_B = R/N_A bridges macro and micro.",
      "Real gases deviate near condensation (van der Waals corrects).",
    ],
    examTraps: [
      "Mixing gauge pressure with absolute pressure.",
      "Celsius temperatures inside the equation.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Isothermal process", condition: "T fixed", formula: "p_1V_1 = p_2V_2", meaning: "Hyperbolic p–V curve." },
      { name: "Adiabatic comparison", condition: "Q = 0", formula: "pV^{\\gamma} = \\text{const}", meaning: "Steeper than isothermal — the comparison question." },
      { name: "Density form", condition: "n = m/M", formula: "p = \\frac{\\rho RT}{M}", meaning: "Air-density and altitude problems." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-11-mass-energy-relation",
    slug: "einsteins-mass-energy-relation",
    title: "Nuclear Physics: Einstein's Mass–Energy Relation (E = mc²)",
    subject: "physics",
    unit: "Nuclear Physics",
    unitId: "nuclear-physics",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Modern Physics)",
    isExtra: false,
    statement:
      "Mass and energy are interconvertible: E = mc²; nuclear mass defects convert to binding energy at 1 u ↔ 931.5 MeV.",
    coreFormula: "E = mc^2, \\qquad 1\\ \\text{u} = 931.5\\ \\text{MeV}/c^2",
    concernedTerms: [
      { term: "Rest mass energy", symbol: "E₀", units: "J / MeV", definition: "Energy equivalent of a particle's rest mass." },
      { term: "Mass defect", symbol: "Δm", units: "u", definition: "Nucleon-sum minus nuclear mass." },
    ],
    assumptions: ["Isolated system (energy conserved globally).", "c invariant (special relativity)."],
    proofSteps: [
      { stepNumber: 1, title: "Relativistic energy", latex: "E = \\frac{m_0c^2}{\\sqrt{1 - v^2/c^2}}", explanation: "Total energy grows with speed from the rest value." },
      { stepNumber: 2, title: "Expand for small v", latex: "E \\approx m_0c^2 + \\tfrac{1}{2}m_0v^2", explanation: "The kinetic term emerges naturally — the first term is rest energy, the content of E = mc²." },
      { stepNumber: 3, title: "Mass–energy bookkeeping", latex: "\\Delta E = \\Delta m\\,c^2", explanation: "Any energy change corresponds to a mass change; in nuclei the defect is measurable, hence binding energy." },
      { stepNumber: 4, title: "Conversion constant", latex: "1\\ \\text{u} = 1.6605\\times10^{-27}\\text{kg} \\Rightarrow \\Delta m = 1\\text{u} \\leftrightarrow 931.5\\ \\text{MeV}", explanation: "Multiplying u by c² and converting to MeV gives the nuclear-numerical constant." },
    ],
    conclusion:
      "E = mc² converts mass changes into energy: chemical reactions barely touch mass, nuclear reactions convert percent-level mass into enormous energy.",
    keyTakeaways: [
      "1 u ↔ 931.5 MeV — memorise for binding-energy numericals.",
      "Sun's output: ~4 million tonnes of mass converted per second.",
      "Energy conservation becomes mass–energy conservation.",
    ],
    examTraps: [
      "Forgetting to square c in SI conversions.",
      "Using electron mass inconsistently with atomic masses.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Electron rest energy", condition: "m_e c²", formula: "0.511\\ \\text{MeV}", meaning: "Pair-production threshold." },
      { name: "Annihilation", condition: "e⁺ + e⁻ → 2γ", formula: "E_\\gamma = 0.511\\ \\text{MeV each}", meaning: "Mass fully converted to photons." },
      { name: "Nuclear power", condition: "Fission of 1 g U-235", formula: "E \\approx 8\\times10^{10}\\ \\text{J}", meaning: "≈ 3 tonnes of coal — why reactors work." },
    ],
    solvedProblems: [],
  },
];

export const PHYSICS_WAVE2C_DERIVATIONS = p2c;
