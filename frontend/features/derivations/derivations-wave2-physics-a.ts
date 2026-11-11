/**
 * Physics Derivations — Wave 2A (Class 12: Electrostatics → EMI).
 * Fills the empty class-12 slots in NEB unit order, each with special cases.
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

const p2a: DerivationOrTheorem[] = [
  {
    id: "phy-12-parallel-plate-capacitor",
    slug: "parallel-plate-capacitor-dielectric",
    title: "Capacitance: Parallel Plate Capacitor & Dielectric Effects",
    subject: "physics",
    unit: "Electrostatics",
    unitId: "electrostatics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Electrostatics)",
    isExtra: true,
    statement:
      "A parallel-plate capacitor of plate area A and separation d stores charge proportional to the potential difference; the proportionality constant is C = ε₀A/d, increased K-fold by a dielectric filling.",
    coreFormula: "C = \\frac{\\varepsilon_0 A}{d}, \\qquad C_{K} = \\frac{K\\varepsilon_0 A}{d}",
    concernedTerms: [
      { term: "Plate area", symbol: "A", units: "m²", definition: "Overlapping area of the two plates." },
      { term: "Separation", symbol: "d", units: "m", definition: "Gap between plates (d ≪ plate dimensions)." },
      { term: "Dielectric constant", symbol: "K", units: "—", definition: "Factor by which the medium reduces the field: E = E₀/K." },
    ],
    assumptions: [
      "Plate size ≫ separation (edge fields neglected).",
      "Vacuum (or uniform dielectric) between plates.",
    ],
    proofSteps: [
      { stepNumber: 1, title: "Field of one infinite charged sheet", latex: "E_1 = \\frac{\\sigma}{2\\varepsilon_0}", explanation: "Gauss's law on a pillbox straddling the sheet gives σ/2ε₀ on each side." },
      { stepNumber: 2, title: "Superposition between the plates", latex: "E = E_1(+) + E_1(-) = \\frac{\\sigma}{\\varepsilon_0}", explanation: "Between oppositely charged plates the two fields add; outside they cancel — all field is confined between the plates." },
      { stepNumber: 3, title: "Potential difference", latex: "V = Ed = \\frac{\\sigma d}{\\varepsilon_0} = \\frac{Qd}{\\varepsilon_0 A}", explanation: "Uniform field ⇒ V = Ed, with σ = Q/A." },
      { stepNumber: 4, title: "Capacitance", latex: "C = \\frac{Q}{V} = \\frac{\\varepsilon_0 A}{d}", explanation: "Definition C = Q/V gives the capacitance; inside a dielectric E → E/K, so V drops K-fold and C rises to Kε₀A/d." },
    ],
    conclusion:
      "C = ε₀A/d (Kε₀A/d with dielectric): capacitance grows with area, shrinks with gap, and multiplies by K when an insulator fills the gap.",
    keyTakeaways: [
      "Halving d doubles C — the geometric lever of capacitor design.",
      "Dielectric insertion: field, potential and energy density each fall by K at fixed charge.",
      "Real capacitors add a dielectric strength limit (breakdown field).",
    ],
    examTraps: [
      "Using ε (not ε₀) when the gap is vacuum.",
      "Forgetting that a partially filled slab gives series combination of gaps.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Partial dielectric slab (thickness t < d)", condition: "Slab of constant K inside the gap", formula: "C = \\frac{\\varepsilon_0 A}{d - t + t/K}", meaning: "Equivalent to vacuum gap (d − t) in series with dielectric gap t/K — a CEE favourite." },
      { name: "Force pulling a slab in (Q fixed)", condition: "Battery disconnected", formula: "F \\propto \\frac{Q^2}{A}\\left(1-\\frac{1}{K}\\right)", meaning: "The slab is always pulled inward; stored energy falls, so work is done on the slab." },
      { name: "d → 0 limit", condition: "Separation shrinks", formula: "C \\to \\infty", meaning: "Ideal limit; real limits come from breakdown and mechanical support." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-capacitor-energy-stored",
    slug: "energy-stored-in-capacitor-grade12",
    title: "Electrostatics: Energy Stored in a Capacitor & Energy Density",
    subject: "physics",
    unit: "Electrostatics",
    unitId: "electrostatics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Electrostatics)",
    isExtra: true,
    statement:
      "Charging a capacitor against its own potential stores U = ½CV² = ½QV = Q²/2C, residing in the field with density ½ε₀E².",
    coreFormula: "U = \\tfrac{1}{2}CV^2 = \\tfrac{1}{2}QV = \\frac{Q^2}{2C}, \\qquad u = \\tfrac{1}{2}\\varepsilon_0 E^2",
    concernedTerms: [
      { term: "Stored energy", symbol: "U", units: "J", definition: "Work done to charge the capacitor from 0 to Q." },
      { term: "Energy density", symbol: "u", units: "J m⁻³", definition: "Energy per unit volume of the electric field." },
    ],
    assumptions: ["Ideal capacitor (no resistance/radiation).", "Quasi-static charging."],
    proofSteps: [
      { stepNumber: 1, title: "Work to move charge dq", latex: "dW = v\\,dq = \\frac{q}{C}\\,dq", explanation: "At intermediate charge q the potential is v = q/C; the battery does dq·v of work." },
      { stepNumber: 2, title: "Integrate over the charge", latex: "U = \\int_0^Q \\frac{q}{C}dq = \\frac{Q^2}{2C}", explanation: "Gives the first form; substituting Q = CV yields ½CV² and ½QV." },
      { stepNumber: 3, title: "Energy density", latex: "U = \\tfrac{1}{2}CV^2 = \\tfrac{1}{2}(\\varepsilon_0 A/d)(Ed)^2 \\Rightarrow u = \\frac{U}{Ad} = \\tfrac{1}{2}\\varepsilon_0 E^2", explanation: "Inserting the parallel-plate C and V = Ed, dividing by the volume Ad gives the universal field-energy density." },
    ],
    conclusion:
      "Three equivalent energy forms plus u = ½ε₀E² show the energy physically resides in the electric field itself.",
    keyTakeaways: [
      "Which form to use: fixed V → ½CV², fixed Q → Q²/2C.",
      "The charging source spends QV; half is stored, half is lost in the circuit.",
      "Energy density applies to ANY field, not just capacitors.",
    ],
    examTraps: [
      "Writing U = QV (missing the ½).",
      "Mixing fixed-Q and fixed-V reasoning when a dielectric is inserted.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Battery connected, dielectric in", condition: "V fixed", formula: "U \\to KU", meaning: "Energy grows — battery supplies the extra." },
      { name: "Battery removed, dielectric in", condition: "Q fixed", formula: "U \\to U/K", meaning: "Energy falls; the slab is pulled in." },
      { name: "Sharing between two capacitors", condition: "C₁(V₀) joined to uncharged C₂", formula: "\\Delta U = \\frac{C_1 C_2 V_0^2}{2(C_1+C_2)} > 0", meaning: "Energy always decreases in charge sharing." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-drift-velocity-relaxation",
    slug: "drift-velocity-relaxation-time",
    title: "Current Electricity: Drift Velocity & Relaxation Time (I = neAv_d)",
    subject: "physics",
    unit: "Current Electricity",
    unitId: "current-electricity",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Current Electricity)",
    isExtra: true,
    statement:
      "Electrons in a conductor acquire a small average drift velocity under an applied field; the resulting current is I = neAv_d, and Ohm's law follows from the relaxation-time picture.",
    coreFormula: "I = neAv_d, \\qquad v_d = \\frac{eE\\tau}{m}, \\qquad \\rho = \\frac{m}{ne^2\\tau}",
    concernedTerms: [
      { term: "Number density", symbol: "n", units: "m⁻³", definition: "Free electrons per unit volume of the metal." },
      { term: "Drift velocity", symbol: "v_d", units: "m s⁻¹", definition: "Average electron velocity along the wire (~mm s⁻¹)." },
      { term: "Relaxation time", symbol: "τ", units: "s", definition: "Mean time between electron–lattice collisions (~10⁻¹⁴ s)." },
    ],
    assumptions: ["Uniform conductor, steady current.", "Classical free-electron gas."],
    proofSteps: [
      { stepNumber: 1, title: "Charge crossing a section in Δt", latex: "\\Delta Q = neA(v_d\\,\\Delta t)", explanation: "All electrons within a cylinder of length v_dΔt pass the section." },
      { stepNumber: 2, title: "Current", latex: "I = \\frac{\\Delta Q}{\\Delta t} = neAv_d", explanation: "Current is charge flux through the section." },
      { stepNumber: 3, title: "Drift velocity from collisions", latex: "v_d = \\frac{eE}{m}\\tau", explanation: "Between collisions the field accelerates the electron; the average over random resets gives v_d ∝ Eτ." },
      { stepNumber: 4, title: "Ohm's law emerges", latex: "J = \\frac{I}{A} = \\frac{ne^2\\tau}{m}E = \\sigma E", explanation: "J ∝ E with constant σ = ne²τ/m — the microscopic statement of Ohm's law; ρ = m/ne²τ." },
    ],
    conclusion:
      "I = neAv_d with v_d = eEτ/m yields Ohm's law microscopically: resistivity is set by electron density and collision time.",
    keyTakeaways: [
      "Drift speeds are ~mm/s, yet lights flip instantly because the FIELD propagates.",
      "Current is the same in a series loop even as A and v_d vary (I = neAv_d adjusts).",
      "Raising T lowers τ → resistivity of metals rises.",
    ],
    examTraps: [
      "Confusing drift velocity with thermal speed (~10⁶ m/s).",
      "Forgetting e in the numerator of σ.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Same current, thicker wire", condition: "A doubles at fixed I", formula: "v_d \\to v_d/2", meaning: "Electrons drift slower in thicker wires." },
      { name: "Wire stretched to double length", condition: "Volume constant, l' = 2l", formula: "R' = 4R", meaning: "A halves and l doubles ⇒ R quadruples (R ∝ l² when stretching)." },
      { name: "Semiconductors on heating", condition: "n grows faster than τ falls", formula: "\\rho \\text{ decreases}", meaning: "Opposite sign to metals — identification question." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-kirchhoff-wheatstone",
    slug: "kirchhoffs-laws-wheatstone-bridge",
    title: "Current Electricity: Kirchhoff's Laws & the Wheatstone Bridge",
    subject: "physics",
    unit: "Current Electricity",
    unitId: "current-electricity",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Current Electricity)",
    isExtra: true,
    statement:
      "Junction conservation of charge and loop conservation of energy solve any resistive network; applied to a Wheatstone bridge they yield the balance condition P/Q = R/S.",
    coreFormula: "\\sum I_{in} = \\sum I_{out}, \\qquad \\sum \\varepsilon = \\sum IR, \\qquad \\frac{P}{Q} = \\frac{R}{S}",
    concernedTerms: [
      { term: "Junction rule (KCL)", symbol: "—", units: "—", definition: "Charge conservation at a node." },
      { term: "Loop rule (KVL)", symbol: "—", units: "—", definition: "Energy conservation around a closed loop." },
      { term: "Balanced bridge", symbol: "—", units: "—", definition: "No potential difference across the galvanometer branch." },
    ],
    assumptions: ["Steady currents (no charging of stray capacitance).", "Linear resistive elements."],
    proofSteps: [
      { stepNumber: 1, title: "Junction rule", latex: "I_1 + I_2 = I_3", explanation: "Charge entering a node per second equals charge leaving — no accumulation." },
      { stepNumber: 2, title: "Loop rule", latex: "\\varepsilon - IR_1 - IR_2 = 0", explanation: "Around any closed loop, emf rises equal IR drops — potential is single-valued." },
      { stepNumber: 3, title: "Apply to the bridge at balance", latex: "I_P = I_R,\\ I_Q = I_S,\\ V_{AB}=V_{AD}", explanation: "Balanced bridge: no galvanometer current; the P–R and Q–S branches carry equal currents and share the same end-to-end potential." },
      { stepNumber: 4, title: "Balance condition", latex: "I_P P = I_R R \\text{ and } I_Q Q = I_S S \\Rightarrow \\frac{P}{Q} = \\frac{R}{S}", explanation: "Dividing the two drop equations eliminates the currents — the working equation of the meter bridge." },
    ],
    conclusion:
      "KCL + KVL reduce any circuit to simultaneous equations; the Wheatstone balance P/Q = R/S is their most celebrated corollary.",
    keyTakeaways: [
      "At balance, exchanging the galvanometer and battery positions does NOT disturb the balance.",
      "Meter bridge is a Wheatstone bridge with a uniform wire as the ratio arms.",
      "Sign discipline: pick a loop direction and keep it.",
    ],
    examTraps: [
      "Forgetting the internal resistance of the driving cell in loop equations.",
      "Assuming bridge balance before proving it.",
    ],
    visualType: "circuit",
    specialCases: [
      { name: "Balanced bridge", condition: "P/Q = R/S", formula: "I_g = 0", meaning: "Galvanometer branch may be removed or shorted without effect." },
      { name: "Meter bridge null point", condition: "Balancing length l", formula: "\\frac{R}{S} = \\frac{l}{100 - l}", meaning: "Resistance ratio from wire lengths only — no meter errors." },
      { name: "Small unbalance", condition: "R → R + δR", formula: "I_g \\propto \\delta R", meaning: "Sensitivity questions: galvanometer response near balance." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-emf-internal-resistance-cells",
    slug: "emf-internal-resistance-cells-combination",
    title: "Current Electricity: EMF, Internal Resistance & Cells in Combination",
    subject: "physics",
    unit: "Current Electricity",
    unitId: "current-electricity",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Current Electricity)",
    isExtra: true,
    statement:
      "A real cell behaves as an ideal EMF ε in series with internal resistance r; terminal voltage V = ε − Ir (discharging), and series/parallel cell combinations follow.",
    coreFormula: "V = \\varepsilon - Ir, \\qquad \\varepsilon_{eq} = N\\varepsilon \\ (\\text{series}), \\qquad \\varepsilon_{eq} = \\varepsilon,\\ r_{eq} = \\frac{r}{N} \\ (\\text{identical parallel})",
    concernedTerms: [
      { term: "EMF", symbol: "ε", units: "V", definition: "Open-circuit potential difference of the cell." },
      { term: "Terminal voltage", symbol: "V", units: "V", definition: "Actual voltage across the cell while delivering current." },
      { term: "Internal resistance", symbol: "r", units: "Ω", definition: "Electrolyte resistance inside the cell." },
    ],
    assumptions: ["Constant ε and r over the current range.", "Linear (ohmic) internal drop."],
    proofSteps: [
      { stepNumber: 1, title: "Energy bookkeeping in the loop", latex: "\\varepsilon = IR + Ir", explanation: "The EMF does work against both the external R and the internal r." },
      { stepNumber: 2, title: "Terminal voltage", latex: "V = IR = \\varepsilon - Ir", explanation: "The external circuit sees ε minus the internal drop; V = ε only when I = 0." },
      { stepNumber: 3, title: "Series cells", latex: "\\varepsilon_{eq} = \\varepsilon_1+\\varepsilon_2+\\cdots,\\quad r_{eq} = r_1 + r_2 + \\cdots", explanation: "Same current through every cell: EMFs add, resistances add." },
      { stepNumber: 4, title: "Parallel cells (identical)", latex: "\\varepsilon_{eq} = \\varepsilon,\\quad r_{eq} = \\frac{r}{N}", explanation: "Same EMF in each branch; the N internal resistances share the current, so the effective internal resistance divides by N — current capacity rises." },
    ],
    conclusion:
      "V = ε − Ir explains why a battery sags under load; series boosts voltage, parallel boosts current capacity.",
    keyTakeaways: [
      "While CHARGING, V = ε + Ir (terminal voltage exceeds EMF).",
      "Maximum power transfer when R = r.",
      "A cell combination obeys the same series/parallel algebra as resistors for r.",
    ],
    examTraps: [
      "Using V = ε − Ir while the cell is being charged.",
      "Adding EMFs for parallel identical cells (they don't add).",
    ],
    visualType: "circuit",
    specialCases: [
      { name: "Open circuit", condition: "I = 0", formula: "V = \\varepsilon", meaning: "Voltmeter reads the EMF directly." },
      { name: "Short circuit", condition: "R = 0", formula: "I_{sc} = \\varepsilon/r", meaning: "Current limited only by internal resistance — why shorts are dangerous." },
      { name: "Maximum power transfer", condition: "R = r", formula: "P_{max} = \\frac{\\varepsilon^2}{4r}", meaning: "Efficiency is then only 50% — the design trade-off." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-biot-savart-applications",
    slug: "biot-savart-law-applications",
    title: "Magnetism: Biot–Savart Law — Straight Wire, Circular Loop & Solenoid",
    subject: "physics",
    unit: "Magnetism & Magnetic Effect",
    unitId: "magnetism-and-magnetic-effect",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Magnetism)",
    isExtra: true,
    statement:
      "A current element Idl contributes dB = (μ₀/4π)(Idl sinθ)/r² to the magnetic field; integrating gives the fields of wires, loops and solenoids.",
    coreFormula: "dB = \\frac{\\mu_0}{4\\pi}\\frac{I\\,dl\\sin\\theta}{r^2}, \\quad B_{wire} = \\frac{\\mu_0 I}{2\\pi a}, \\quad B_{center} = \\frac{\\mu_0 I}{2a}, \\quad B_{solenoid} = \\mu_0 n I",
    concernedTerms: [
      { term: "Permeability of vacuum", symbol: "μ₀", units: "T m A⁻¹", definition: "4π × 10⁻⁷; sets the strength of magnetic coupling." },
      { term: "Turn density", symbol: "n", units: "m⁻¹", definition: "Turns per unit length of a solenoid." },
    ],
    assumptions: ["Steady currents.", "Thin conductors; vacuum surroundings."],
    proofSteps: [
      { stepNumber: 1, title: "Straight wire by integration", latex: "B = \\frac{\\mu_0 I}{4\\pi a}(\\cos\\theta_1 - \\cos\\theta_2)", explanation: "Integrating the element law along the wire; for an infinite wire θ₁→0, θ₂→π gives μ₀I/2πa." },
      { stepNumber: 2, title: "Circular loop centre", latex: "B = \\frac{\\mu_0 I}{2a}", explanation: "Every element is perpendicular to r (θ = 90°) and equidistant: sum of N such elements gives μ₀NI/2a." },
      { stepNumber: 3, title: "Solenoid field", latex: "B = \\mu_0 n I", explanation: "Treating the solenoid as stacked loops and integrating along its axis (long-solenoid limit) — uniform inside, ~zero outside." },
    ],
    conclusion:
      "One element law plus geometry yields every standard magnetostatic field: μ₀I/2πa (wire), μ₀NI/2a (loop), μ₀nI (solenoid).",
    keyTakeaways: [
      "Field lines of a wire are concentric circles (right-hand rule).",
      "Loop field at centre is μ₀π... times stronger per turn than a distant wire — use the direct formula.",
      "Solenoid interior is the magnetic analogue of a parallel-plate capacitor's interior.",
    ],
    examTraps: [
      "Using diameter instead of radius in the loop formula.",
      "Mixing n (per metre) with N (total turns).",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Semi-infinite wire at its end line", condition: "θ₁ = 0, θ₂ = 90°", formula: "B = \\frac{\\mu_0 I}{4\\pi a}", meaning: "Half the infinite-wire value." },
      { name: "Loop centre for N turns", condition: "N turns of radius a", formula: "B = \\frac{\\mu_0 N I}{2a}", meaning: "Scales linearly with turns." },
      { name: "On the axis of a loop", condition: "Distance x from centre", formula: "B = \\frac{\\mu_0 I a^2}{2(a^2+x^2)^{3/2}}", meaning: "Falls off as the classic dipole pattern; B(0) = μ₀I/2a." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-amperes-circuital-law",
    slug: "amperes-circuital-law-solenoid-toroid",
    title: "Magnetism: Ampere's Circuital Law & Its Applications",
    subject: "physics",
    unit: "Magnetism & Magnetic Effect",
    unitId: "magnetism-and-magnetic-effect",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Magnetism)",
    isExtra: true,
    statement:
      "The line integral of B around any closed loop equals μ₀ times the enclosed current: ∮B·dl = μ₀I_enc; applied to solenoids and toroids it gives their interior fields instantly.",
    coreFormula: "\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I_{enc} \\;\\Rightarrow\\; B_{sol} = \\mu_0 n I,\\quad B_{tor} = \\frac{\\mu_0 N I}{2\\pi r}",
    concernedTerms: [
      { term: "Amperian loop", symbol: "—", units: "—", definition: "Chosen closed path exploiting symmetry so B·dl is constant." },
      { term: "Enclosed current", symbol: "I_enc", units: "A", definition: "Net current piercing the surface bounded by the loop." },
    ],
    assumptions: ["Magnetostatics (no displacement current).", "High symmetry (solenoid, toroid, wire)."],
    proofSteps: [
      { stepNumber: 1, title: "Statement of the law", latex: "\\oint \\vec B\\cdot d\\vec l = \\mu_0 I_{enc}", explanation: "Ampère's law — the magnetostatic counterpart of Gauss's law." },
      { stepNumber: 2, title: "Long solenoid", latex: "Bl = \\mu_0 (n l) I \\Rightarrow B = \\mu_0 n I", explanation: "Rectangular loop with one side inside (field B, uniform) and one outside (≈0): enclosed turns nl each carry I." },
      { stepNumber: 3, title: "Toroid", latex: "B(2\\pi r) = \\mu_0 N I \\Rightarrow B = \\frac{\\mu_0 N I}{2\\pi r}", explanation: "Circular Amperian loop of radius r inside the ring; N total turns enclosed — field varies with r, confined to the core." },
    ],
    conclusion:
      "Where symmetry permits, Ampère's law produces the field in one line — the workhorse for solenoids, toroids and cylindrical currents.",
    keyTakeaways: [
      "Ampère ≠ Biot–Savart: same physics, different toolkit (integral vs element).",
      "Outside an ideal solenoid B ≈ 0; inside it is uniform.",
      "Toroid has no end effects — the field lives entirely in the ring.",
    ],
    examTraps: [
      "Counting enclosed current with the wrong sign (direction matters).",
      "Applying μ₀nI to a short solenoid (end effects dominate).",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Inside a thick wire", condition: "r < R, uniform current", formula: "B = \\frac{\\mu_0 I r}{2\\pi R^2}", meaning: "Grows linearly from the axis — classic exam case." },
      { name: "Outside the wire", condition: "r > R", formula: "B = \\frac{\\mu_0 I}{2\\pi r}", meaning: "Behaves as a thin wire at the centre." },
      { name: "Toroid r → mean radius with tight winding", condition: "R ≫ core thickness", formula: "B \\approx \\mu_0 n I", meaning: "Toroid becomes an ideal solenoid bent into a circle." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-lorentz-force-cyclotron",
    slug: "lorentz-force-charged-particle-motion",
    title: "Magnetism: Lorentz Force & Motion of Charged Particles in Magnetic Fields",
    subject: "physics",
    unit: "Magnetism & Magnetic Effect",
    unitId: "magnetism-and-magnetic-effect",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Magnetism)",
    isExtra: true,
    statement:
      "A charge q moving with velocity v in fields E and B feels F = q(E + v×B); the magnetic part does no work, producing circular/helical motion of radius r = mv/qB and period T = 2πm/qB.",
    coreFormula: "\\vec F = q(\\vec E + \\vec v \\times \\vec B), \\quad r = \\frac{mv}{qB}, \\quad T = \\frac{2\\pi m}{qB}",
    concernedTerms: [
      { term: "Cyclotron radius", symbol: "r", units: "m", definition: "Radius of the circular path in a uniform B (v ⊥ B)." },
      { term: "Cyclotron period", symbol: "T", units: "s", definition: "One revolution time — mass/charge dependent, speed independent." },
    ],
    assumptions: ["Uniform, static fields.", "Non-relativistic speeds (v ≪ c)."],
    proofSteps: [
      { stepNumber: 1, title: "Magnetic force geometry", latex: "F = qvB\\sin\\theta", explanation: "v×B is perpendicular to both v and B — a deflecting, never accelerating-along-v force." },
      { stepNumber: 2, title: "No work done", latex: "W = \\vec F\\cdot \\vec v = 0", explanation: "Speed and kinetic energy are constant in a pure magnetic field — only direction changes." },
      { stepNumber: 3, title: "Circle radius (v ⊥ B)", latex: "qvB = \\frac{mv^2}{r} \\Rightarrow r = \\frac{mv}{qB}", explanation: "Centripetal requirement with F = qvB gives the radius." },
      { stepNumber: 4, title: "Period independence", latex: "T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{qB}", explanation: "The v cancels — all particles of the same q/m cycle at the same rate, the principle of the cyclotron." },
    ],
    conclusion:
      "Magnetic fields bend charges into circles/helices of radius mv/qB with speed-independent period; electric fields change their energy, magnetic fields do not.",
    keyTakeaways: [
      "Parallel velocity component is untouched → helix with pitch v∥T.",
      "Velocity selector: E = vB passes undeflected charges.",
      "Heavier or faster ⇒ larger circle; stronger field ⇒ tighter circle.",
    ],
    examTraps: [
      "Using F = qvB when v ∥ B (force is then zero).",
      "Thinking B changes kinetic energy — it never does.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "v parallel to B", condition: "θ = 0", formula: "F = 0", meaning: "Particle sails straight through." },
      { name: "Helical path", condition: "v at angle θ", formula: "r = \\frac{mv\\sin\\theta}{qB},\\ \\text{pitch} = \\frac{2\\pi m v\\cos\\theta}{qB}", meaning: "Circle plus drift — the geometry of aurorae and traps." },
      { name: "Velocity selector", condition: "E and B crossed, qE = qvB", formula: "v = E/B", meaning: "Only one speed passes straight — feeds mass spectrometers." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-faraday-lenz-motional-emf",
    slug: "faradays-laws-lenz-motional-emf",
    title: "EMI: Faraday's Laws, Lenz's Law & Motional EMF",
    subject: "physics",
    unit: "Electromagnetic Induction",
    unitId: "electromagnetic-induction",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (EMI)",
    isExtra: true,
    statement:
      "A changing magnetic flux induces an EMF ε = −N dΦ/dt whose direction opposes the change (Lenz); a rod moving across a field gives the motional EMF Blv.",
    coreFormula: "\\varepsilon = -N\\frac{d\\Phi_B}{dt}, \\quad \\varepsilon = Blv, \\quad F_{opp} = \\frac{B^2l^2v}{R}",
    concernedTerms: [
      { term: "Magnetic flux", symbol: "Φ_B", units: "Wb", definition: "Φ = BA cosθ through the circuit." },
      { term: "Motional EMF", symbol: "ε", units: "V", definition: "EMF from a conductor moving through a field." },
    ],
    assumptions: ["Uniform B over the circuit area.", "Rods/rails of negligible resistance where stated."],
    proofSteps: [
      { stepNumber: 1, title: "Faraday's flux rule", latex: "\\varepsilon = -N\\frac{d\\Phi}{dt}", explanation: "Experiment: induced EMF equals the rate of flux change; the minus sign encodes Lenz's law." },
      { stepNumber: 2, title: "Lenz's law as energy conservation", latex: "I_{ind} \\text{ opposes } \\Delta\\Phi", explanation: "The induced current must oppose the change — otherwise perpetual motion would follow from nothing." },
      { stepNumber: 3, title: "Motional EMF derivation", latex: "\\varepsilon = \\int (\\vec v\\times\\vec B)\\cdot d\\vec l = Blv", explanation: "Charges in a rod moving perpendicular to B feel qvB along the rod; the accumulated potential is Blv. Equivalent to Φ = Blx changing at dx/dt = v." },
      { stepNumber: 4, title: "Magnetic drag force", latex: "I = \\frac{Blv}{R},\\quad F = BIl = \\frac{B^2l^2v}{R}", explanation: "The induced current in the rail loop experiences a force opposing the motion — the mechanical energy converts to Joule heat." },
    ],
    conclusion:
      "Faraday quantifies induction (ε = −NdΦ/dt), Lenz gives its direction, and the rod-and-rails case reduces both to Blv with a B²l²v/R drag.",
    keyTakeaways: [
      "Flux can change via B, A, or θ — all three produce EMF.",
      "Lenz's sign is energy conservation in disguise.",
      "Faster rod → larger EMF AND larger drag — terminal behaviour questions.",
    ],
    examTraps: [
      "Forgetting the number of turns N.",
      "Computing flux with the wrong angle (θ between B and the NORMAL).",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Rotating rod (disc induction)", condition: "Length l, angular speed ω", formula: "\\varepsilon = \\tfrac{1}{2}B\\omega l^2", meaning: "The Lees-disc/metal-disc generator case — integrate v = ωx along the rod." },
      { name: "Rotating coil (generator)", condition: "N turns, area A, ω", formula: "\\varepsilon = NBA\\omega\\sin\\omega t", meaning: "Sinusoidal AC — the starting point of the AC unit." },
      { name: "Rod on inclined rails", condition: "Rails tilted at θ, gravity drives", formula: "v_{term} = \\frac{mgR\\sin\\theta}{B^2l^2}", meaning: "Drag balances gravity — classic terminal-velocity problem." },
    ],
    solvedProblems: [],
  },
  {
    id: "phy-12-lr-circuits-growing-decaying",
    slug: "growing-decaying-current-lr-circuit",
    title: "EMI: Growing & Decaying Current in LR Circuits (Time Constant L/R)",
    subject: "physics",
    unit: "Electromagnetic Induction",
    unitId: "electromagnetic-induction",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (EMI)",
    isExtra: true,
    statement:
      "Self-induction makes current in an LR circuit grow and decay exponentially with time constant τ = L/R: I = I₀(1 − e^{−t/τ}) on rise and I = I₀e^{−t/τ} on decay.",
    coreFormula: "I_{grow} = I_0(1-e^{-t/\\tau}), \\quad I_{decay} = I_0 e^{-t/\\tau}, \\quad \\tau = \\frac{L}{R}",
    concernedTerms: [
      { term: "Self-inductance", symbol: "L", units: "H", definition: "Flux linkage per ampere of the coil's own current: ε = −L dI/dt." },
      { term: "Time constant", symbol: "τ", units: "s", definition: "Time for ~63% rise (or 37% remaining on decay)." },
    ],
    assumptions: ["Constant L and R.", "Ideal switch (no arcing)."],
    proofSteps: [
      { stepNumber: 1, title: "Loop equation on growth", latex: "\\varepsilon - IR - L\\frac{dI}{dt} = 0", explanation: "KVL with the back-EMF of the inductor opposing the change." },
      { stepNumber: 2, title: "Separate and integrate", latex: "\\int_0^I \\frac{dI}{\\varepsilon/R - I} = \\frac{R}{L}\\int_0^t dt", explanation: "Standard variable-separable ODE from the mathematics course." },
      { stepNumber: 3, title: "Growth solution", latex: "I = I_0(1-e^{-tR/L}),\\ I_0 = \\varepsilon/R", explanation: "Current approaches ε/R exponentially; inductor behaves as an open switch at t=0 and a wire at t→∞." },
      { stepNumber: 4, title: "Decay solution", latex: "0 - IR - L\\frac{dI}{dt} = 0 \\Rightarrow I = I_0 e^{-t/\\tau}", explanation: "Removing the source, the stored energy ½LI² dissipates through R with the same τ." },
    ],
    conclusion:
      "Inductors resist change: currents approach their final values over τ = L/R, storing energy ½LI² and releasing it exponentially.",
    keyTakeaways: [
      "Large L or small R ⇒ sluggish circuit.",
      "At t = τ: 63.2% growth / 36.8% decay — memorise both.",
      "Energy stored ½LI²; power decay is −dU/dt = I²R.",
    ],
    examTraps: [
      "Confusing τ = L/R with the RC τ = RC.",
      "Using the growth formula for decay (opposite signs).",
    ],
    visualType: "graph",
    specialCases: [
      { name: "t = τ", condition: "One time constant", formula: "I = 0.632\\,I_0 \\ (\\text{growth}),\\ 0.368\\,I_0\\ (\\text{decay})", meaning: "The standard reading of oscilloscope traces." },
      { name: "t = 5τ", condition: "Steady state", formula: "I \\approx 0.993\\,I_0", meaning: "After five constants the transient is effectively over." },
      { name: "Open-circuit spike", condition: "Forcing I to zero instantly", formula: "L\\frac{dI}{dt} \\to -\\infty", meaning: "Why switch arcs occur — inductors hate sudden change." },
    ],
    solvedProblems: [],
  },
];

export const PHYSICS_WAVE2A_DERIVATIONS = p2a;
