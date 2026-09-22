/**
 * Theorem Fill — Final wave (physics dc-circuits & Gauss, Aufbau, statics).
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

const FF: DerivationOrTheorem[] = [
  {
    id: "tf-phy-11-gauss-flux",
    slug: "gauss-law-electric-flux",
    title: "Gauss Law: Electric Flux",
    subject: "physics",
    unit: "Electric Field",
    unitId: "electric-field",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Electric Field)",
    isExtra: false,
    statement:
      "Electric flux through a surface counts field lines crossing it: Φ = E·A cosθ. Gauss's law: total flux through any CLOSED surface equals the enclosed charge divided by ε₀, Φ = q/ε₀ — independent of the surface's shape and of charges outside.",
    coreFormula: "\\oint \\vec E \\cdot d\\vec A = \\frac{q_{enc}}{\\varepsilon_0}",
    concernedTerms: [
      { term: "Electric flux", symbol: "Φ", units: "N m² C⁻¹", definition: "Number of field lines piercing a surface (times area weighting)." },
      { term: "Gaussian surface", symbol: "—", units: "—", definition: "Imaginary closed surface chosen to make E constant over it." },
      { term: "Enclosed charge", symbol: "q_enc", units: "C", definition: "Only interior charges count; exterior charges contribute zero NET flux." },
    ],
    assumptions: ["Static charges (electrostatics).", "Surface closed for the flux law."],
    proofSteps: [
      { stepNumber: 1, title: "Flux from a point charge through a sphere", latex: "\\Phi = E \\cdot 4\\pi r^2 = \\frac{q}{4\\pi\\varepsilon_0 r^2}\\cdot 4\\pi r^2 = \\frac{q}{\\varepsilon_0}", explanation: "On a concentric sphere E is constant and radial; the r² cancels — flux is radius-independent." },
      { stepNumber: 2, title: "Solid-angle argument", latex: "d\\Omega = \\frac{dA\\cos\\theta}{r^2} \\Rightarrow \\oint d\\Omega = 4\\pi", explanation: "Any closed surface seen from inside subtends 4π steradians — every field line exits exactly once." },
      { stepNumber: 3, title: "Superposition finishes it", latex: "\\oint \\vec E \\cdot d\\vec A = \\sum_i \\frac{q_i}{\\varepsilon_0} = \\frac{q_{enc}}{\\varepsilon_0}", explanation: "Fields add; fluxes add; exterior charges enter and leave equally (net zero)." },
    ],
    conclusion:
      "Gauss's law converts symmetry into answers: sphere, cylinder, plane each collapse Coulomb integration into one multiplication — the gateway to every standard field formula.",
    keyTakeaways: [
      "Gauss finds E only when symmetry makes E constant on the Gaussian surface.",
      "Flux is zero through any closed surface enclosing zero net charge.",
      "Exterior charges shift the field pattern but contribute zero net flux.",
    ],
    examTraps: [
      "❌ Using Gauss's law for a dipole field point — no symmetry, no simple E.",
      "❌ Counting exterior charges in q_enc — they contribute nothing to net flux.",
    ],
    visualType: "tv-gauss-flux",
    specialCases: [
      { name: "Uniformly charged sphere", condition: "Gaussian sphere", formula: "E_{out} = \\frac{kq}{r^2}, \\; E_{in} = \\frac{kqr}{R^3}", meaning: "Point-mass behaviour outside, linear growth inside." },
      { name: "Infinite line", condition: "Cylindrical surface", formula: "E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}", meaning: "Field falls as 1/r." },
      { name: "Infinite sheet", condition: "Pillbox", formula: "E = \\frac{\\sigma}{2\\varepsilon_0}", meaning: "Field is uniform — independent of distance." },
    ],
    solvedProblems: [
      {
        id: "tf-p-gau-1",
        question: "Find the flux through a cube enclosing a 2 μC charge at its centre.",
        examBadge: "NEB Board",
        given: "q = 2×10⁻⁶ C",
        stepByStep: ["Φ = q/ε₀ = 2×10⁻⁶/8.85×10⁻¹² ≈ 2.26×10⁵ N m² C⁻¹."],
        finalAnswer: "\\Phi \\approx 2.26\\times 10^5\\ \\text{N m}^2\\text{C}^{-1}",
        tipOrTrap: "Shape doesn't matter — the charge and ε₀ decide.",
      },
    ],
  },
  {
    id: "tf-phy-11-ohm-law-c11",
    slug: "ohm-s-law-electrical-resistance-resistivity-conductivity",
    title: "Ohm's Law, Electrical Resistance, Resistivity and Conductivity",
    subject: "physics",
    unit: "DC Circuits",
    unitId: "dc-circuits",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (DC Circuits)",
    isExtra: false,
    statement:
      "Ohm's law: V = IR at constant physical conditions. Resistance depends on geometry and material: R = ρl/A, where resistivity ρ (Ω m) is material-specific and conductivity σ = 1/ρ. ρ varies with temperature (ρ = ρ₀(1 + αΔT) for metals).",
    coreFormula: "V = IR, \\qquad R = \\frac{\\rho l}{A}, \\qquad \\sigma = \\frac{1}{\\rho}",
    concernedTerms: [
      { term: "Resistance", symbol: "R", units: "Ω", definition: "Opposition to current; depends on length, area and material." },
      { term: "Resistivity", symbol: "ρ", units: "Ω m", definition: "Material property — copper 1.7×10⁻⁸, glass ~10¹² Ω m." },
      { term: "Conductivity", symbol: "σ", units: "S m⁻¹", definition: "Inverse of resistivity; measures charge-carrying ease." },
    ],
    assumptions: ["Constant temperature (otherwise ρ drifts).", "Ohmic conductor (metal at moderate conditions)."],
    proofSteps: [
      { stepNumber: 1, title: "Resistance from geometry", latex: "R \\propto l, \\; R \\propto \\frac{1}{A} \\Rightarrow R = \\frac{\\rho l}{A}", explanation: "Doubling the wire's length doubles collisions per path; doubling area halves congestion — ρ is the material's constant." },
      { stepNumber: 2, title: "Ohm's law from drift", latex: "I = neAv_d = neA\\frac{eE\\tau}{m} = \\frac{ne^2\\tau A}{ml}V", explanation: "Drift velocity ∝ E gives I ∝ V; the constant of proportionality embeds ρ = m/(ne²τ)." },
      { stepNumber: 3, title: "Temperature coefficient", latex: "\\rho = \\rho_0(1+\\alpha\\Delta T)", explanation: "Hotter lattices scatter electrons more (smaller τ) — metals' α > 0; semiconductors' n grows faster, giving α < 0." },
    ],
    conclusion:
      "Resistance is geometry times material: stretch the wire and it resists more, thicken it and less — while resistivity ρ is the unchangeable material fingerprint, itself temperature-tuned.",
    keyTakeaways: [
      "ρ defines material classes: conductors 10⁻⁸, semiconductors 10⁻⁵–10², insulators >10⁸ Ω m.",
      "Series: R = R₁ + R₂ + …; parallel: 1/R = Σ1/Rᵢ.",
      "Wire stretching to n× length keeps volume: A drops n×, so R grows n².",
    ],
    examTraps: [
      "❌ Confusing resistance (geometry-dependent) with resistivity (material-only).",
      "❌ Stretch problems: volume conservation means BOTH l and A change.",
    ],
    visualType: "tv-ohm-resistivity",
    specialCases: [
      { name: "Stretched wire", condition: "l → nl", formula: "R' = n^2 R", meaning: "Area shrinks n-fold as length grows n-fold." },
      { name: "Series/parallel", condition: "Circuit reduction", formula: "R_s = \\sum R_i, \\; R_p^{-1} = \\sum R_i^{-1}", meaning: "Basic network grammar." },
      { name: "NTC thermistor", condition: "Semiconductor", formula: "\\rho \\downarrow \\text{ with } T", meaning: "Carrier population beats scattering." },
    ],
    solvedProblems: [
      {
        id: "tf-p-ohm2-1",
        question: "A wire of resistance 4 Ω is stretched to twice its length. New resistance?",
        examBadge: "CEE Entrance",
        given: "l' = 2l, A' = A/2",
        stepByStep: ["R' = ρ(2l)/(A/2) = 4ρl/A = 4R."],
        finalAnswer: "R' = 16\\ \\Omega \\ (n^2 = 4\\times 4)",
        tipOrTrap: "n = 2 ⇒ n² = 4× the original 4 Ω = 16 Ω.",
      },
    ],
  },
  {
    id: "tf-phy-11-ohmic-nonohmic",
    slug: "current-voltage-relations-ohmic-and-non-ohmic-resistance",
    title: "Current–Voltage Relations: Ohmic and Non-ohmic Resistance",
    subject: "physics",
    unit: "DC Circuits",
    unitId: "dc-circuits",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (DC Circuits)",
    isExtra: false,
    statement:
      "Ohmic conductors give a straight I–V line through the origin (R constant); non-ohmic devices bend it: filament lamps (heating raises R), diodes (one-way conduction above ~0.7 V), thermistors (R falls with T), electrolytes (polarization). For non-ohmic elements resistance is defined point-wise: R = V/I (static) vs dV/dI (dynamic).",
    coreFormula: "\\text{ohmic: } I \\propto V; \\quad \\text{diode: } I = I_0\\left(e^{eV/kT} - 1\\right)",
    concernedTerms: [
      { term: "Static resistance", symbol: "V/I", units: "Ω", definition: "Slope of the line from origin to the operating point." },
      { term: "Dynamic resistance", symbol: "dV/dI", units: "Ω", definition: "Slope of the I–V curve at the point — what AC signals feel." },
      { term: "Knee voltage", symbol: "—", units: "V", definition: "Forward voltage where a diode's current turns on steeply (0.7 V Si)." },
    ],
    assumptions: ["Graphs read at fixed temperature unless the device self-heats (that's the point)."],
    proofSteps: [
      { stepNumber: 1, title: "Ohmic signature", latex: "\\text{I–V line through origin; } R = \\text{slope}^{-1} \\text{ everywhere}", explanation: "Metal at constant temperature: drift dynamics keep τ, n fixed — straight line." },
      { stepNumber: 2, title: "Filament's curve", latex: "T \\uparrow \\Rightarrow \\rho \\uparrow \\Rightarrow I \\text{ grows slower than } V", explanation: "Self-heating bends the curve toward the V-axis (downward concavity)." },
      { stepNumber: 3, title: "Diode's asymmetry", latex: "V > 0: \\ I \\sim e^{eV/kT}; \\; V < 0: I \\approx -I_0", explanation: "The p-n barrier rectifies: near-zero reverse current, exponential forward current — the extreme non-ohmic device." },
    ],
    conclusion:
      "The I–V graph is the device's fingerprint: straight-through-origin means ohmic; every bend, knee or asymmetry tells the story of a mechanism (heat, barrier, carriers) fighting linearity.",
    keyTakeaways: [
      "Identify the device from the curve's shape alone in graph questions.",
      "Diode reverse saturation current is tiny (~nA) but not zero.",
      "Gauge experiments: ammeter in series, voltmeter in parallel; rheostat sweeps V.",
    ],
    examTraps: [
      "❌ Computing one R for a curved I–V and calling it constant.",
      "❌ Saying a diode 'blocks' reverse current completely — leakage exists.",
    ],
    visualType: "tv-ohmic-nonohmic",
    specialCases: [
      { name: "Filament", condition: "Self-heating", formula: "R(T) = R_0(1+\\alpha\\Delta T)", meaning: "Curve concave down." },
      { name: "Thermistor", condition: "NTC semiconductor", formula: "I \\text{ curve concave up}", meaning: "R falls as current heats it — thermal runaway risk." },
      { name: "p-n diode", condition: "Forward/reverse", formula: "I = I_0(e^{eV/kT}-1)", meaning: "Shockley relation; knee ≈ 0.7 V." },
    ],
    solvedProblems: [],
  },
  {
    id: "tf-chem-11-aufbau-pauli-hund",
    slug: "aufbau-principle-pauli-s-exclusion-principle-hund-s-rule-and-electronic-configurations-of-atoms-",
    title: "Aufbau Principle, Pauli's Exclusion Principle, Hund's Rule & Electronic Configurations",
    subject: "chemistry",
    unit: "Atomic Structure",
    unitId: "atomic-structure",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Atomic Structure)",
    isExtra: false,
    statement:
      "Three rules fill orbitals: Aufbau — electrons occupy lowest-energy orbitals first (n+l rule: 4s before 3d); Pauli — an orbital holds at most 2 electrons of opposite spin (no two electrons share all four quantum numbers); Hund — degenerate orbitals fill singly with parallel spins before pairing. Together they give every element's configuration up to Z = 30.",
    coreFormula: "\\text{order: } 1s\\,2s\\,2p\\,3s\\,3p\\,4s\\,3d\\,4p; \\quad \\text{Cr: } [Ar]3d^54s^1 \\ (\\text{exception})",
    concernedTerms: [
      { term: "Aufbau (n+l rule)", symbol: "—", units: "—", definition: "Lower (n+l) fills first; ties broken by lower n." },
      { term: "Pauli exclusion", symbol: "—", units: "—", definition: "Maximum 2 e⁻ per orbital, spins opposed — why shells cap at 2n²." },
      { term: "Hund's rule", symbol: "—", units: "—", definition: "Maximize unpaired spins in degenerate orbitals — explains N's 2p³ stability and paramagnetism." },
    ],
    assumptions: ["Neutral ground-state atoms.", "Slight exceptions (Cr, Cu) from extra half/full-shell stability."],
    proofSteps: [
      { stepNumber: 1, title: "Energy ordering", latex: "E_{ns} < E_{(n-2)f} < E_{(n-1)d} < E_{np}", explanation: "Penetration and shielding reorder subshells — the (n+l) sequence 1s,2s,2p,3s,3p,4s,3d,4p." },
      { stepNumber: 2, title: "Capacity limits", latex: "s^2, p^6, d^{10}, f^{14} \\Rightarrow \\text{shell } 2n^2", explanation: "Pauli's cap per orbital times the orbital count per subshell." },
      { stepNumber: 3, title: "Nitrogen's 2p³", latex: "\\uparrow\\;\\uparrow\\;\\uparrow \\ (\\text{not } \\uparrow\\downarrow\\uparrow)", explanation: "Hund: three singly-occupied p orbitals with parallel spins minimize repulsion — N is paramagnetic with 3 unpaired electrons." },
      { stepNumber: 4, title: "Half-filled stability exceptions", latex: "Cr: 3d^54s^1; \\; Cu: 3d^{10}4s^1", explanation: "Symmetric charge clouds gain extra exchange energy — the two famous Z ≤ 30 exceptions." },
    ],
    conclusion:
      "Three rules, one algorithm: sort orbitals by energy, respect Pauli's two-per-orbital cap, obey Hund's spread-first directive — and every ground-state configuration writes itself.",
    keyTakeaways: [
      "4s fills before 3d but IONIZES first (4s electrons leave first in transition metals).",
      "Unpaired electron count ⇒ magnetic behaviour (Fe: 4 unpaired ⇒ ferromagnetic).",
      "Configurations of ions: remove from the outermost n shell first.",
    ],
    examTraps: [
      "❌ Writing Fe as [Ar]4s²3d⁶ and calling it fine (it is) but ionizing 3d first — Fe²⁺ is [Ar]3d⁶ (4s goes).",
      "❌ Forgetting Cr/Cu exceptions in 'write the configuration' questions.",
    ],
    visualType: "tv-aufbau-pauli-hund",
    specialCases: [
      { name: "Cr exception", condition: "Z = 24", formula: "[Ar]3d^54s^1", meaning: "Half-filled d-shell exchange stability." },
      { name: "Cu exception", condition: "Z = 29", formula: "[Ar]3d^{10}4s^1", meaning: "Full d-shell bonus." },
      { name: "Paramagnetism", condition: "Unpaired e⁻", formula: "\\mu = \\sqrt{n(n+2)}\\ \\mu_B", meaning: "Spin-only magnetic moment from n unpaired." },
    ],
    solvedProblems: [
      {
        id: "tf-c-auf-1",
        question: "Write the configuration of Fe (Z = 26) and find unpaired electrons.",
        examBadge: "NEB 2077",
        given: "Z = 26",
        stepByStep: ["[Ar] = 18; remaining 8: 4s² 3d⁶.", "d⁶: five single + one pair ⇒ 4 unpaired."],
        finalAnswer: "[Ar]4s^23d^6, \\; 4 \\text{ unpaired}",
        tipOrTrap: "Hund fills the five d orbitals singly before the sixth pairs.",
      },
    ],
  },
  {
    id: "tf-math-11-statics-parallelogram",
    slug: "mechanics-optional-statics-forces-and-resultant-forces-parallelogram-law-of-forces-composition-a",
    title: "Statics: Forces, Resultant, Parallelogram Law, Composition and Resolution",
    subject: "mathematics",
    unit: "Computational Methods or Mechanics",
    unitId: "computational-methods-or-mechanics",
    gradeTrack: "grade-11",
    nebCode: "Mat. 007 (Mechanics)",
    isExtra: false,
    statement:
      "Statics of a particle: forces are vectors; the resultant of two forces follows the parallelogram law R = √(P² + Q² + 2PQ cos α), acting along the diagonal. Composition finds the resultant; resolution splits a force into perpendicular components (F cos θ, F sin θ). Equilibrium requires ΣF = 0 — Lami's theorem: three concurrent forces balance when P/sin α = Q/sin β = R/sin γ.",
    coreFormula: "R = \\sqrt{P^2+Q^2+2PQ\\cos\\alpha}, \\qquad \\frac{P}{\\sin\\alpha} = \\frac{Q}{\\sin\\beta} = \\frac{R}{\\sin\\gamma}",
    concernedTerms: [
      { term: "Resultant", symbol: "R", units: "N", definition: "Single force equivalent to the system (parallelogram diagonal)." },
      { term: "Equilibrant", symbol: "−R", units: "N", definition: "Force that balances the resultant — equal magnitude, opposite direction." },
      { term: "Lami's theorem", symbol: "—", units: "—", definition: "Three-force equilibrium: each force over the sine of the angle between the OTHER two." },
    ],
    assumptions: ["Forces concurrent (through one point) and coplanar.", "Rigid-body rotation excluded (particle statics)."],
    proofSteps: [
      { stepNumber: 1, title: "Parallelogram law", latex: "R^2 = (P+Q\\cos\\alpha)^2 + (Q\\sin\\alpha)^2", explanation: "Resolve Q along/perpendicular to P; Pythagoras on the components gives R and its direction tan θ = Q sin α/(P + Q cos α)." },
      { stepNumber: 2, title: "Resolution", latex: "F_x = F\\cos\\theta, \\; F_y = F\\sin\\theta", explanation: "Any force = its rectangular components; summing components of ALL forces reduces equilibrium to two scalar equations." },
      { stepNumber: 3, title: "Lami's theorem via sine rule", latex: "\\text{triangle of forces } \\sim \\text{ sine rule}", explanation: "Three balanced forces close a triangle; the sine rule maps side lengths (forces) to angles between the others." },
    ],
    conclusion:
      "Statics is vector algebra with physical labels: add by parallelogram, split by resolution, balance by ΣF = 0 — and for three-force problems Lami's sine-rule shortcut finishes instantly.",
    keyTakeaways: [
      "R is maximum when forces align (P + Q), minimum when opposed (|P − Q|).",
      "Perpendicular forces: R = √(P² + Q²) with tan θ = Q/P.",
      "Like perpendicular vectors: equilibrium of three forces needs none of them zero and none parallel.",
    ],
    examTraps: [
      "❌ Applying Lami's theorem when forces are NOT concurrent.",
      "❌ Using the angle between forces in Lami — it wants the angle between the OTHER two forces.",
    ],
    visualType: "tv-statics-parallelogram",
    specialCases: [
      { name: "α = 90°", condition: "Perpendicular forces", formula: "R = \\sqrt{P^2+Q^2}", meaning: "Pure component addition." },
      { name: "α = 180°", condition: "Opposite forces", formula: "R = |P-Q|", meaning: "Balanced when equal." },
      { name: "Three equal forces", condition: "120° apart", formula: "P = Q = R \\Rightarrow \\text{equilibrium}", meaning: "Symmetric equilibrium — every Lami ratio equals." },
    ],
    solvedProblems: [
      {
        id: "tf-m-sta-1",
        question: "Forces 5 N and 12 N act at right angles. Find the resultant and its direction.",
        examBadge: "NEB Board",
        given: "P = 5, Q = 12, α = 90°",
        stepByStep: ["R = √(25+144) = 13 N.", "tan θ = 12/5 ⇒ θ ≈ 67.4° from the 5 N force."],
        finalAnswer: "R = 13\\ \\text{N at } 67.4°",
        tipOrTrap: "5-12-13 is the second Pythagorean favourite after 3-4-5.",
      },
    ],
  },
  {
    id: "tf-chem-11-mole-relation",
    slug: "mole-and-its-relation-with-mass-volume-and-number-of-particles",
    title: "Mole and Its Relation with Mass, Volume and Number of Particles",
    subject: "chemistry",
    unit: "Stoichiometry",
    unitId: "stoichiometry",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Stoichiometry)",
    isExtra: false,
    statement:
      "One mole is 6.022 × 10²³ particles (Avogadro's number), the amount of substance whose mass in grams equals its molecular/atomic mass, and which occupies 22.4 L at STP as a gas. The three faces of a mole — mass, volume, number — are interconvertible.",
    coreFormula: "n = \frac{m}{M} = \frac{V}{22.4,	ext{L (STP)}} = \frac{N}{N_A}",
    concernedTerms: [
      { term: "Mole", symbol: "n", units: "mol", definition: "Amount of substance containing 6.022 × 10²³ elementary entities." },
      { term: "Molar mass", symbol: "M", units: "g/mol", definition: "Mass of one mole; numerically equal to the relative molecular mass." },
      { term: "Molar volume", symbol: "V_m", units: "L/mol", definition: "22.4 L per mole for ANY ideal gas at STP (0 °C, 1 atm)." },
    ],
    assumptions: ["Gases behave ideally at STP (real gases deviate slightly).", "Particles counted are formula units as written."],
    proofSteps: [
      { stepNumber: 1, title: "Mass ↔ mole", latex: "n = \frac{m}{M}", explanation: "Divide the weighed mass by the molar mass read from the periodic table." },
      { stepNumber: 2, title: "Volume ↔ mole (gas)", latex: "n = \frac{V_{STP}}{22.4}",
        explanation: "Avogadro's law: equal volumes hold equal moles, so one mole of any gas fills 22.4 L at STP." },
      { stepNumber: 3, title: "Number ↔ mole", latex: "N = nN_A = n \times 6.022	imes10^{23}",
        explanation: "The mole is a counting unit — multiply by Avogadro's number for actual particles." },
      { stepNumber: 4, title: "Chain conversion", latex: "m ↔ n ↔ N  (÷ M, × N_A)", explanation: "Any two of mass, volume, number connect through the mole as the central hub — never jump two steps directly." },
    ],
    conclusion:
      "The mole is the single hub converting mass ↔ volume ↔ particle count: n = m/M = V/22.4 = N/N_A. Master this triangle and every stoichiometric calculation reduces to it.",
    keyTakeaways: [
      "Mole bridges the invisible (atoms) to the weighable (grams) and measurable (litres).",
      "22.4 L mol⁻¹ applies ONLY to gases at STP — liquids/solids have their own densities.",
      "Particles ≠ molecules always: for ionic compounds count formula units.",
      "Stoichiometric coefficients are mole ratios — the working currency of every reaction equation.",
    ],
    examTraps: [
      "Using 22.4 L at temperatures other than STP (must use PV = nRT otherwise).",
      "Confusing atomic mass (H = 1) with molecular mass (H₂ = 2) when dividing.",
      "Forgetting diatomic/triatomic nature: O₂ is 32, O₃ is 48 g/mol.",
      "Dropping Avogadro's exponent: 6.022 × 10²³, not 10²⁶ or 10²¹.",
    ],
    visualType: "mole-concept",
    solvedProblems: [
      {
        id: "tf-mole-1",
        question: "How many molecules are in 4.4 g of CO₂, and what volume does it occupy at STP?",
        examBadge: "NEB Board",
        given: "m = 4.4 g, M(CO₂) = 44 g/mol, N_A = 6.022 × 10²³",
        stepByStep: [
          "Moles: n = m/M = 4.4/44 = 0.1 mol.",
          "Molecules: N = nN_A = 0.1 × 6.022 × 10²³ = 6.022 × 10²².",
          "Volume at STP: V = n × 22.4 = 2.24 L.",
        ],
        finalAnswer: "N = 6.022\times10^{22} \text{molecules}, \; V = 2.24 \text{L}",
        tipOrTrap: "0.1 mol is the classic friendly number — spot it to check your arithmetic.",
      },
    ],
  },
  {
    id: "tf-math-11-diff-rules",
    slug: "rules-of-differentiation-product-quotient-chain-parametric-implicit",
    title: "Rules of Differentiation: Product, Quotient, Chain, Parametric, Implicit & Higher-Order Derivatives",
    subject: "mathematics",
    unit: "Calculus",
    unitId: "calculus",
    gradeTrack: "grade-11",
    nebCode: "Mat. 007 (Calculus)",
    isExtra: false,
    statement:
      "Beyond first-principle derivatives, combinations of functions obey structural rules: products split additively, quotients carry a minus-over-square pattern, composites chain, parametric curves divide velocity components, implicit curves differentiate in x with y-prime collected, and each rule re-applies for higher orders.",
    coreFormula: "(uv)' = u'v + uv', \quad (u/v)' = \frac{u'v - uv'}{v^2}, \quad \frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}",
    concernedTerms: [
      { term: "Product rule", symbol: "(uv)'", units: "", definition: "Derivative of a product: each factor differentiates while the other stands." },
      { term: "Chain rule", symbol: "dy/dx", units: "", definition: "Derivative through an intermediate variable — outer then inner." },
      { term: "Second derivative", symbol: "y''", units: "", definition: "Derivative of the derivative — concavity and acceleration." },
    ],
    assumptions: ["Component functions are differentiable on the domain of interest.", "For implicit curves y is locally a differentiable function of x."],
    proofSteps: [
      { stepNumber: 1, title: "Product rule from a limit trick", latex: "\frac{\Delta(uv)}{\Delta x} = u\frac{\Delta v}{\Delta x} + v\frac{\Delta u}{\Delta x} + \Delta u\frac{\Delta v}{\Delta x}",
        explanation: "Add and subtract uv in the numerator; the cross term vanishes in the limit." },
      { stepNumber: 2, title: "Quotient as product", latex: "(u/v)' = (u v^{-1})' = u'v^{-1} - uv^{-2}v'",
        explanation: "Apply the product rule to u times v inverse and simplify to the familiar single fraction." },
      { stepNumber: 3, title: "Chain rule via intermediates", latex: "\frac{\Delta y}{\Delta x} = \frac{\Delta y}{\Delta u} \cdot \frac{\Delta u}{\Delta x}",
        explanation: "Rates multiply along the dependency chain; limits make it exact." },
      { stepNumber: 4, title: "Parametric and implicit", latex: "\frac{dy}{dx} = \frac{dy/dt}{dx/dt}; \quad x^2 + y^2 = 25 \Rightarrow y' = -\frac{x}{y}",
        explanation: "Parametric: divide the two rate components. Implicit: differentiate every term in x, then solve for y'." },
    ],
    conclusion:
      "The structural rules turn any composite of elementary functions into a mechanical differentiation exercise: products add, quotients subtract-over-square, chains multiply, parametrics divide, implicits collect — and higher orders simply re-apply the machinery.",
    keyTakeaways: [
      "Chain rule is the master rule — quotient and implicit rules are bookkeeping around it.",
      "Never differentiate a product as product of derivatives; the +uv' cross term is essential.",
      "Parametric second derivatives: y'' = d(dy/dx)/dt divided by dx/dt — not direct d²y/dt² ÷ d²x/dt².",
      "Implicit results may contain y — that is legitimate; the slope lives on the curve.",
    ],
    examTraps: [
      "Forgetting the inner derivative in chain rule (sin(x²) ≠ cos(x²)).",
      "Sign slip in the quotient rule numerator: it is u'v − uv', in that order.",
      "Treating y as a constant when differentiating implicitly — it carries a y'.",
      "Parametric y'' needs the division by dx/dt again, not just one quotient.",
    ],
    visualType: "tv-diff-rules",
    solvedProblems: [
      {
        id: "tf-diff-1",
        question: "If x = at², y = 2at, find dy/dx; then find y' for x² + y² = 25 at (3, 4).",
        examBadge: "NEB Board",
        given: "Parametric x = at², y = 2at; implicit x² + y² = 25 at (3, 4)",
        stepByStep: [
          "Parametric: dx/dt = 2at, dy/dt = 2a ⇒ dy/dx = 2a/2at = 1/t.",
          "Implicit: 2x + 2y y' = 0 ⇒ y' = −x/y.",
          "At (3, 4): y' = −3/4.",
        ],
        finalAnswer: "\frac{dy}{dx} = \frac{1}{t}; \quad y'(3,4) = -\frac{3}{4}",
        tipOrTrap: "The parabola parametric pair (at², 2at) is the standard NEB favourite — memorise the 1/t slope.",
      },
    ],
  },
];

export const THEOREM_FILL_FINAL = FF;
