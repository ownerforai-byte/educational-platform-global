/**
 * Physics Derivations — Syllabus Wave 1 (Class 11, Phy. 101)
 *
 * Authored one-by-one in official NEB unit order, each derivation carries
 * its SPECIAL CASES (limiting/edge applications the board and CEE ask).
 * Merged into syllabus position via lib/theorem-topics.ts.
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

export interface SpecialCase {
  /** Name of the special case, e.g. "θ = 0° (force along displacement)". */
  name: string;
  /** The condition / substitution that produces this case. */
  condition: string;
  /** Resulting formula (KaTeX-ready, without $). */
  formula: string;
  /** One-line physical reading of the result. */
  meaning: string;
}

const physicsDerivations: DerivationOrTheorem[] = [
  // ─── KINEMATICS ────────────────────────────────────────────────────────────
  {
    id: "phy-11-eom-three-equations",
    slug: "equations-of-motion",
    title: "Equations of Motion (Graphical Treatment) — v = u + at, s = ut + ½at², v² = u² + 2as",
    subject: "physics",
    unit: "Kinematics",
    unitId: "kinematics",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Kinematics)",
    isExtra: false,
    statement:
      "For uniformly accelerated motion in a straight line, the velocity–time relation, position–time relation, and the time-independent relation follow directly from the v–t graph.",
    coreFormula: "v = u + at,\\quad s = ut + \\tfrac{1}{2}at^2,\\quad v^2 = u^2 + 2as",
    concernedTerms: [
      { term: "Initial velocity", symbol: "u", units: "m s⁻¹", definition: "Velocity of the body when timing starts." },
      { term: "Final velocity", symbol: "v", units: "m s⁻¹", definition: "Velocity after time t of uniform acceleration." },
      { term: "Acceleration", symbol: "a", units: "m s⁻²", definition: "Rate of change of velocity; constant here." },
      { term: "Displacement", symbol: "s", units: "m", definition: "Area under the velocity–time graph." },
    ],
    assumptions: [
      "Motion is along a straight line.",
      "Acceleration a is uniform (constant in magnitude and direction).",
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "First equation — from the slope of the v–t graph",
        latex: "a = \\frac{v - u}{t} \\;\\Rightarrow\\; v = u + at",
        explanation:
          "The v–t graph is a straight line from (0, u) to (t, v). Slope = acceleration = (v − u)/t. Rearranging gives the first equation of motion.",
      },
      {
        stepNumber: 2,
        title: "Second equation — from the area under the v–t graph",
        latex: "s = \\text{area} = ut + \\tfrac{1}{2}(v - u)t = ut + \\tfrac{1}{2}at^2",
        explanation:
          "Displacement = area of the rectangle (ut) plus the triangle (½ × base (v−u) × height t). Substituting v − u = at gives the second equation.",
      },
      {
        stepNumber: 3,
        title: "Third equation — eliminating t",
        latex: "v = u + at \\;\\Rightarrow\\; t = \\frac{v-u}{a}",
        explanation:
          "From the first equation, t = (v − u)/a. Substituting into s = ut + ½at² and simplifying yields the time-independent relation.",
      },
      {
        stepNumber: 4,
        title: "Algebraic completion of the third equation",
        latex: "s = u\\frac{v-u}{a} + \\frac{a}{2}\\left(\\frac{v-u}{a}\\right)^2 = \\frac{v^2 - u^2}{2a} \\;\\Rightarrow\\; v^2 = u^2 + 2as",
        explanation:
          "Expanding and collecting terms: s = (v² − u²)/2a, which rearranges to v² = u² + 2as — the third equation of motion.",
      },
    ],
    conclusion:
      "The three equations of motion are geometric consequences of a straight-line v–t graph: slope → v = u + at, area → s = ut + ½at², and eliminating t → v² = u² + 2as.",
    keyTakeaways: [
      "Slope of v–t graph = acceleration; area under v–t graph = displacement.",
      "The third equation contains no t — ideal for problems where time is neither given nor asked.",
      "All three hold only for uniform acceleration; for variable a, use calculus (v = dx/dt etc.).",
    ],
    examTraps: [
      "Using s = ut + ½at² when a is not constant — must integrate instead.",
      "Sign errors: taking upward as positive but g as +10 m s⁻² in downward-motion problems.",
      "Forgetting that displacement can be negative while distance is not.",
    ],
    visualType: "graph",
    specialCases: [
      {
        name: "Free fall from rest",
        condition: "u = 0, a = g ≈ 9.8 m s⁻² (downward positive)",
        formula: "v = gt,\\quad h = \\tfrac{1}{2}gt^2,\\quad v^2 = 2gh",
        meaning: "Dropped bodies gain 9.8 m s⁻¹ of speed each second; fall distance grows with the square of time.",
      },
      {
        name: "Body thrown upward",
        condition: "a = −g; at the highest point v = 0",
        formula: "0 = u - gt,\\quad h_{max} = \\frac{u^2}{2g},\\quad t_{rise} = \\frac{u}{g}",
        meaning: "Time up equals time down (t_total = 2u/g), and maximum height depends only on launch speed.",
      },
      {
        name: "Zero acceleration",
        condition: "a = 0",
        formula: "v = u,\\quad s = ut",
        meaning: "Degenerates to uniform motion — Newton's first law territory.",
      },
      {
        name: "nth-second distance",
        condition: "Distance in the nth second: sₙ − sₙ₋₁",
        formula: "s_n = u + a\\left(n - \\tfrac{1}{2}\\right)",
        meaning: "CEE favourite: distance covered during a particular second, not after n seconds.",
      },
    ],
    solvedProblems: [],
  },

  // ─── PROJECTILE MOTION ─────────────────────────────────────────────────────
  {
    id: "phy-11-projectile-range-height-time",
    slug: "projectile-range-max-height-time-of-flight",
    title: "Projectile Motion — Maximum Height, Time of Flight & Horizontal Range",
    subject: "physics",
    unit: "Kinematics",
    unitId: "kinematics",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Kinematics)",
    isExtra: false,
    statement:
      "A body projected with speed u at angle θ to the horizontal follows a parabolic path; its height, flight time and range follow from resolving the motion into independent horizontal and vertical parts.",
    coreFormula: "H = \\frac{u^2\\sin^2\\theta}{2g},\\quad T = \\frac{2u\\sin\\theta}{g},\\quad R = \\frac{u^2\\sin 2\\theta}{g}",
    concernedTerms: [
      { term: "Horizontal component", symbol: "u cos θ", units: "m s⁻¹", definition: "Remains constant throughout the flight (no air resistance)." },
      { term: "Vertical component", symbol: "u sin θ", units: "m s⁻¹", definition: "Changes under gravity; governs height and flight time." },
      { term: "Time of flight", symbol: "T", units: "s", definition: "Total time the projectile stays in the air." },
      { term: "Horizontal range", symbol: "R", units: "m", definition: "Horizontal distance covered during the flight." },
    ],
    assumptions: [
      "Air resistance is negligible.",
      "g is constant over the trajectory.",
      "The launch and landing levels are the same (for the standard forms).",
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Resolve the launch velocity",
        latex: "u_x = u\\cos\\theta, \\qquad u_y = u\\sin\\theta",
        explanation:
          "Horizontal motion has zero acceleration; vertical motion is free fall under g. The two are treated independently.",
      },
      {
        stepNumber: 2,
        title: "Time of flight — vertical round trip",
        latex: "0 = u\\sin\\theta \\cdot T - \\tfrac{1}{2}gT^2 \\;\\Rightarrow\\; T = \\frac{2u\\sin\\theta}{g}",
        explanation:
          "Net vertical displacement over the full flight is zero. Solving 0 = u_y T − ½gT² (excluding the trivial T = 0) gives T.",
      },
      {
        stepNumber: 3,
        title: "Maximum height — vertical velocity vanishes at the top",
        latex: "0 = u^2\\sin^2\\theta - 2gH \\;\\Rightarrow\\; H = \\frac{u^2\\sin^2\\theta}{2g}",
        explanation:
          "At the highest point the vertical component is zero. Using v² = u² − 2gs in the vertical direction gives H.",
      },
      {
        stepNumber: 4,
        title: "Horizontal range — uniform velocity × time",
        latex: "R = u_x \\cdot T = u\\cos\\theta \\cdot \\frac{2u\\sin\\theta}{g} = \\frac{u^2\\sin 2\\theta}{g}",
        explanation:
          "Range = constant horizontal velocity × total flight time. Using 2 sinθ cosθ = sin 2θ gives the compact range formula.",
      },
      {
        stepNumber: 5,
        title: "Trajectory equation — the path is a parabola",
        latex: "y = x\\tan\\theta - \\frac{g x^2}{2u^2\\cos^2\\theta}",
        explanation:
          "Eliminating t between x = u cosθ · t and y = u sinθ · t − ½gt² gives y as a quadratic in x — a parabola opening downward.",
      },
    ],
    conclusion:
      "Independence of horizontal and vertical motion yields T = 2u sinθ/g, H = u² sin²θ/2g and R = u² sin 2θ/g; the trajectory itself is the parabola y = x tanθ − gx²/(2u² cos²θ).",
    keyTakeaways: [
      "R is maximum (u²/g) at θ = 45°.",
      "Complementary angles θ and 90° − θ give the same range.",
      "Velocity at any instant: v = √(u² − 2gy); direction tan α = (u sinθ − gt)/(u cosθ).",
    ],
    examTraps: [
      "Applying R = u² sin2θ/g when launch and landing heights differ.",
      "Confusing maximum height with range/4 — they are equal only at θ = 45°.",
      "Forgetting that horizontal velocity never changes (no acceleration horizontally).",
    ],
    visualType: "trajectory",
    specialCases: [
      {
        name: "Horizontal projection from a height",
        condition: "θ = 0° from a tower of height h",
        formula: "T = \\sqrt{\\frac{2h}{g}},\\quad R = u\\sqrt{\\frac{2h}{g}}",
        meaning: "Flight time depends only on the height; range grows linearly with launch speed.",
      },
      {
        name: "Maximum range",
        condition: "θ = 45°",
        formula: "R_{max} = \\frac{u^2}{g},\\quad H = \\frac{R_{max}}{4}",
        meaning: "At 45° the range is four times the maximum height — a quick check in numericals.",
      },
      {
        name: "Complementary angles",
        condition: "θ and 90° − θ",
        formula: "R(\\theta) = R(90^\\circ - \\theta)",
        meaning: "Same range for two different launch angles (e.g. 30° and 60°) but different heights and flight times.",
      },
      {
        name: "Vertical projection",
        condition: "θ = 90°",
        formula: "R = 0,\\quad H = \\frac{u^2}{2g},\\quad T = \\frac{2u}{g}",
        meaning: "Pure vertical throw: the body returns to the launch point.",
      },
    ],
    solvedProblems: [],
  },

  // ─── WORK, ENERGY AND POWER ────────────────────────────────────────────────
  {
    id: "phy-11-work-energy-theorem",
    slug: "work-energy-theorem",
    title: "Work–Energy Theorem — W = ΔKE, Variable Force & Work Done by a Constant Force",
    subject: "physics",
    unit: "Work, Energy and Power",
    unitId: "work-energy-and-power",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Work & Energy)",
    isExtra: false,
    statement:
      "The net work done on a body equals the change in its kinetic energy; for a constant force W = F·s·cosθ and for a variable force W = ∫F dx.",
    coreFormula: "W_{net} = \\Delta KE = \\tfrac{1}{2}mv^2 - \\tfrac{1}{2}mu^2",
    concernedTerms: [
      { term: "Work", symbol: "W", units: "J", definition: "Dot product of force and displacement; scalar." },
      { term: "Kinetic energy", symbol: "KE", units: "J", definition: "Energy of motion, ½mv²." },
      { term: "Power", symbol: "P", units: "W", definition: "Rate of doing work, P = dW/dt = F·v." },
    ],
    assumptions: [
      "Body is treated as a particle (no rotation).",
      "Frame of reference is inertial.",
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Work by a constant force",
        latex: "W = \\vec{F}\\cdot\\vec{s} = Fs\\cos\\theta",
        explanation:
          "Only the component of force along displacement does work; θ is the angle between F and s.",
      },
      {
        stepNumber: 2,
        title: "Work by a variable force",
        latex: "W = \\int_{x_i}^{x_f} F\\,dx",
        explanation:
          "For F varying with position, sum infinitesimal works: the area under the F–x curve.",
      },
      {
        stepNumber: 3,
        title: "Kinematics bridge",
        latex: "v^2 = u^2 + 2as \\;\\Rightarrow\\; a = \\frac{v^2-u^2}{2s}",
        explanation:
          "Using the third equation of motion for constant acceleration links force to velocities.",
      },
      {
        stepNumber: 4,
        title: "Substitute into Newton's second law",
        latex: "W = mas = m\\frac{v^2-u^2}{2s}\\,s = \\tfrac{1}{2}mv^2 - \\tfrac{1}{2}mu^2",
        explanation:
          "With F = ma, the net work collapses to the difference of ½mv² terms — the work–energy theorem.",
      },
    ],
    conclusion:
      "W_net = ΔKE holds for constant and (via integration) variable forces; it is the scalar master-key to mechanics problems where forces vary along the path.",
    keyTakeaways: [
      "Work is a scalar — negative work means the force opposes the motion.",
      "The theorem holds in every inertial frame, but the numerical value of W and KE differ between frames.",
      "Power: P = Fv for force and velocity along the same line.",
    ],
    examTraps: [
      "Adding works of forces that act perpendicular to displacement (they do zero work).",
      "Using ½mv² − ½mu² with mixed units (km/h vs m/s).",
      "Forgetting friction does negative work in energy bookkeeping.",
    ],
    visualType: "graph",
    specialCases: [
      {
        name: "Force along displacement",
        condition: "θ = 0°",
        formula: "W = Fs",
        meaning: "Maximum work — the whole force contributes.",
      },
      {
        name: "Force perpendicular to displacement",
        condition: "θ = 90°",
        formula: "W = 0",
        meaning: "Circular-motion centripetal force and normal force on a slide do no work.",
      },
      {
        name: "Spring force (variable)",
        condition: "F = −kx, from 0 to x",
        formula: "W = -\\tfrac{1}{2}kx^2,\\quad U_{spring} = \\tfrac{1}{2}kx^2",
        meaning: "Work done against the spring is stored as elastic PE — the area of a triangle on the F–x graph.",
      },
      {
        name: "Gravity near Earth",
        condition: "F = mg, drop through h",
        formula: "W = mgh,\\quad U = mgh",
        meaning: "Uniform gravity gives the familiar mgh potential-energy bookkeeping.",
      },
    ],
    solvedProblems: [],
  },

  // ─── CIRCULAR MOTION ───────────────────────────────────────────────────────
  {
    id: "phy-11-conical-pendulum",
    slug: "conical-pendulum",
    title: "Conical Pendulum — Time Period & Angle of the Cone",
    subject: "physics",
    unit: "Circular Motion",
    unitId: "circular-motion",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Circular Motion)",
    isExtra: false,
    statement:
      "A bob revolving in a horizontal circle with the string tracing a cone has its tension resolved into the weight-balancing vertical part and the centripetal horizontal part.",
    coreFormula: "T_{period} = 2\\pi\\sqrt{\\frac{L\\cos\\theta}{g}}",
    concernedTerms: [
      { term: "String length", symbol: "L", units: "m", definition: "Distance from the pivot to the bob." },
      { term: "Semi-vertical angle", symbol: "θ", units: "° or rad", definition: "Angle between string and the vertical." },
      { term: "Tension", symbol: "T", units: "N", definition: "Force along the string; resolved into components." },
    ],
    assumptions: [
      "String is massless and inextensible.",
      "Bob is a point mass; air resistance is neglected.",
      "The bob moves in a horizontal circle with uniform speed.",
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Resolve the tension",
        latex: "T\\cos\\theta = mg \\quad (\\text{vertical}), \\qquad T\\sin\\theta = \\frac{mv^2}{r} \\quad (\\text{horizontal})",
        explanation:
          "Vertical equilibrium fixes the cos component; the sin component supplies the centripetal force for the horizontal circle of radius r = L sinθ.",
      },
      {
        stepNumber: 2,
        title: "Divide to eliminate tension",
        latex: "\\tan\\theta = \\frac{v^2}{rg}",
        explanation:
          "Dividing the centripetal equation by the equilibrium equation removes T, linking speed, radius and cone angle.",
      },
      {
        stepNumber: 3,
        title: "Insert r = L sinθ and solve for v",
        latex: "v^2 = rg\\tan\\theta = L\\sin\\theta \\cdot g\\,\\frac{\\sin\\theta}{\\cos\\theta} \\;\\Rightarrow\\; v^2 = \\frac{L g \\sin^2\\theta}{\\cos\\theta}",
        explanation: "Substituting the geometry of the cone expresses v purely in terms of L, θ and g.",
      },
      {
        stepNumber: 4,
        title: "Time period",
        latex: "T_{period} = \\frac{2\\pi r}{v} = 2\\pi\\sqrt{\\frac{L\\cos\\theta}{g}}",
        explanation:
          "Substituting v and r = L sinθ: the sinθ factors cancel, leaving a simple pendulum of effective length L cosθ (the height of the cone).",
      },
    ],
    conclusion:
      "The conical pendulum behaves like a simple pendulum whose length is the height of the cone, L cosθ: T = 2π√(L cosθ/g); faster spin → wider cone → shorter period.",
    keyTakeaways: [
      "Period is independent of the bob's mass.",
      "Tension T = mg/cosθ — always greater than the weight.",
      "v² = rg·tanθ connects speed to the cone geometry.",
    ],
    examTraps: [
      "Using the full string length L instead of L cosθ in the period formula.",
      "Mixing up sinθ and cosθ components of tension.",
      "Assuming the period depends on speed alone — it also depends on L.",
    ],
    visualType: "schematic",
    specialCases: [
      {
        name: "Very slow revolution",
        condition: "θ → 0",
        formula: "T_{period} \\to 2\\pi\\sqrt{\\frac{L}{g}}",
        meaning: "Becomes an ordinary simple pendulum of length L.",
      },
      {
        name: "String horizontal limit",
        condition: "θ → 90°",
        formula: "T_{period} \\to 0,\\quad T_{tension} \\to \\infty",
        meaning: "Unphysical: no finite tension can keep the string horizontal — the cone can never fully open.",
      },
      {
        name: "Seconds-cone comparison",
        condition: "Period compared with simple pendulum of same L",
        formula: "T_{cone} = T_{simple}\\sqrt{\\cos\\theta}",
        meaning: "The conical period is always shorter than the equivalent simple pendulum.",
      },
    ],
    solvedProblems: [],
  },

  // ─── GRAVITATION ───────────────────────────────────────────────────────────
  {
    id: "phy-11-satellite-orbital-velocity",
    slug: "satellite-orbital-velocity-time-period",
    title: "Satellite — Orbital Velocity, Time Period, Energy & Geostationary Case",
    subject: "physics",
    unit: "Gravitation",
    unitId: "gravitation",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Gravitation)",
    isExtra: false,
    statement:
      "For a satellite in circular orbit, gravity supplies the centripetal force; orbital speed, period, and total energy follow as functions of orbital radius.",
    coreFormula: "v_o = \\sqrt{\\frac{GM}{r}},\\quad T = 2\\pi\\sqrt{\\frac{r^3}{GM}},\\quad E = -\\frac{GMm}{2r}",
    concernedTerms: [
      { term: "Orbital radius", symbol: "r", units: "m", definition: "Distance from Earth's centre to the satellite (= R + h)." },
      { term: "Orbital velocity", symbol: "v_o", units: "m s⁻¹", definition: "Speed for a circular orbit at radius r." },
      { term: "Escape velocity", symbol: "v_e", units: "m s⁻¹", definition: "Minimum launch speed to leave Earth's gravity, √(2GM/R)." },
    ],
    assumptions: [
      "Circular orbit; Earth is a uniform sphere of mass M.",
      "Air resistance is absent (orbit above the atmosphere).",
      "Satellite mass m ≪ M, so the barycentre stays at Earth's centre.",
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Gravity provides centripetal force",
        latex: "\\frac{GMm}{r^2} = \\frac{mv_o^2}{r}",
        explanation: "Equating Newton's gravitational force to m v²/r for circular motion.",
      },
      {
        stepNumber: 2,
        title: "Orbital velocity",
        latex: "v_o = \\sqrt{\\frac{GM}{r}} = \\sqrt{\\frac{gR^2}{R+h}}",
        explanation:
          "Cancelling m and one r. Using GM = gR² gives the form with surface gravity and height above the surface.",
      },
      {
        stepNumber: 3,
        title: "Time period via Kepler's third law",
        latex: "T = \\frac{2\\pi r}{v_o} = 2\\pi\\sqrt{\\frac{r^3}{GM}} \\;\\Rightarrow\\; T^2 \\propto r^3",
        explanation:
          "Circumference divided by orbital speed; the r³ dependence is Kepler's third law for circular orbits.",
      },
      {
        stepNumber: 4,
        title: "Kinetic and potential energy",
        latex: "KE = \\tfrac{1}{2}mv_o^2 = \\frac{GMm}{2r}, \\qquad PE = -\\frac{GMm}{r}",
        explanation:
          "KE from the orbital speed; PE from the gravitational potential at r (negative, zero at infinity).",
      },
      {
        stepNumber: 5,
        title: "Total energy and binding energy",
        latex: "E = KE + PE = -\\frac{GMm}{2r}",
        explanation:
          "Half the magnitude of PE; |E| is the binding energy — the energy that must be supplied to free the satellite.",
      },
    ],
    conclusion:
      "v_o = √(GM/r), T = 2π√(r³/GM) and E = −GMm/2r: closer satellites move faster, orbit quicker, and are more tightly bound.",
    keyTakeaways: [
      "v_e = √2 · v_o at the same radius — escape velocity exceeds orbital velocity by √2.",
      "Total energy is negative for a bound orbit; E = 0 exactly at escape.",
      "Airless circular orbit assumption breaks down for low orbits with drag.",
    ],
    examTraps: [
      "Using h instead of r = R + h in the formulas.",
      "Sign error on total energy (it is negative, not positive).",
      "Assuming orbital speed depends on satellite mass — it does not.",
    ],
    visualType: "schematic",
    specialCases: [
      {
        name: "Surface-grazing satellite",
        condition: "h = 0, r = R",
        formula: "v_o = \\sqrt{gR} \\approx 7.9\\ \\text{km/s},\\quad T \\approx 84.4\\ \\text{min}",
        meaning: "Fastest possible circular orbit; 84.4 minutes is the minimum period for Earth.",
      },
      {
        name: "Geostationary orbit",
        condition: "T = 24 h (sidereal 23 h 56 min)",
        formula: "r = \\left(\\frac{GMT^2}{4\\pi^2}\\right)^{1/3} \\approx 42{,}400\\ \\text{km},\\quad h \\approx 35{,}800\\ \\text{km}",
        meaning: "Unique radius where the satellite hovers over one longitude — only possible over the equator.",
      },
      {
        name: "Escape condition",
        condition: "E = 0",
        formula: "v = \\sqrt{\\frac{2GM}{r}} = v_e",
        meaning: "The satellite barely escapes with zero speed at infinity.",
      },
      {
        name: "Polar orbit",
        condition: "Any inclination 90°, same r",
        formula: "v_o,\\ T \\text{ unchanged}",
        meaning: "Orbital parameters depend on r, not on the orbital plane's orientation — hence sun-synchronous mapping satellites.",
      },
    ],
    solvedProblems: [],
  },

  // ─── SIMPLE PENDULUM (SHM bridge) ─────────────────────────────────────────
  {
    id: "phy-11-simple-pendulum-shm",
    slug: "simple-pendulum-time-period",
    title: "Simple Pendulum — Time Period by SHM Analysis (T = 2π√(L/g))",
    subject: "physics",
    unit: "Circular Motion / Oscillations",
    unitId: "circular-motion",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Circular Motion)",
    isExtra: false,
    statement:
      "For small angular displacements the restoring torque of a pendulum is proportional to θ, producing simple harmonic motion with period 2π√(L/g).",
    coreFormula: "T = 2\\pi\\sqrt{\\frac{L}{g}}",
    concernedTerms: [
      { term: "Effective length", symbol: "L", units: "m", definition: "Pivot-to-centre-of-bob distance." },
      { term: "Restoring torque", symbol: "τ", units: "N·m", definition: "τ = −mgL sinθ ≈ −mgLθ for small θ." },
      { term: "Angular amplitude", symbol: "θ₀", units: "rad", definition: "Maximum swing angle; must be small (≲ 10°) for SHM." },
    ],
    assumptions: [
      "Small-angle approximation: sin θ ≈ θ (θ in radians).",
      "Massless, inextensible string; point bob.",
      "No air resistance or pivot friction.",
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Restoring force on the bob",
        latex: "F = -mg\\sin\\theta \\approx -mg\\,\\theta",
        explanation:
          "The tangential component of weight pulls the bob toward the mean position; for small θ, sinθ ≈ θ makes it linear.",
      },
      {
        stepNumber: 2,
        title: "Equation of motion",
        latex: "mL\\frac{d^2\\theta}{dt^2} = -mg\\theta \\;\\Rightarrow\\; \\frac{d^2\\theta}{dt^2} = -\\frac{g}{L}\\theta",
        explanation:
          "Newton's second law along the arc (a_t = L α). The acceleration is proportional to −θ — the SHM condition.",
      },
      {
        stepNumber: 3,
        title: "Identify angular frequency",
        latex: "\\omega^2 = \\frac{g}{L}",
        explanation: "Comparing with the SHM standard d²θ/dt² = −ω²θ.",
      },
      {
        stepNumber: 4,
        title: "Period",
        latex: "T = \\frac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\frac{L}{g}}",
        explanation: "Standard SHM period from ω; independent of mass and (small) amplitude.",
      },
    ],
    conclusion:
      "Small swings make the pendulum a linear oscillator with T = 2π√(L/g): mass-independent, amplitude-independent (to first order), set only by length and local gravity.",
    keyTakeaways: [
      "Mass never enters the period.",
      "T² ∝ L — a graph of T² vs L is a straight line of slope 4π²/g (a classic practical exam).",
      "The same √(L/g) structure appears in the conical pendulum with L cosθ.",
    ],
    examTraps: [
      "Using degrees in sinθ ≈ θ — the approximation only holds in radians.",
      "Forgetting to add the bob's radius when measuring L from the suspension point.",
      "Applying T = 2π√(L/g) at large amplitudes without correction.",
    ],
    visualType: "schematic",
    specialCases: [
      {
        name: "In a lift accelerating upward",
        condition: "Effective gravity g' = g + a",
        formula: "T = 2\\pi\\sqrt{\\frac{L}{g+a}}",
        meaning: "Period decreases — the pendulum 'feels heavier'.",
      },
      {
        name: "In a lift accelerating downward",
        condition: "g' = g − a (a < g)",
        formula: "T = 2\\pi\\sqrt{\\frac{L}{g-a}}",
        meaning: "Period increases; at free fall (a = g) the pendulum stops oscillating (T → ∞).",
      },
      {
        name: "At height h above the surface",
        condition: "g' = g(R/(R+h))²",
        formula: "T = 2\\pi\\sqrt{\\frac{L}{g}}\\left(1 + \\frac{h}{R}\\right) \\text{ approx.}",
        meaning: "Pendulum slows with altitude — clocks lose time on mountains.",
      },
      {
        name: "In a liquid (buoyancy)",
        condition: "Effective weight reduced by buoyant force",
        formula: "T = 2\\pi\\sqrt{\\frac{L}{g\\left(1 - \\sigma/\\rho\\right)}}",
        meaning: "With fluid density σ and bob density ρ, the swing slows down.",
      },
      {
        name: "Large amplitude (first correction)",
        condition: "Amplitude θ₀ not small",
        formula: "T = T_0\\left(1 + \\frac{\\theta_0^2}{16}\\right)",
        meaning: "The true period grows with amplitude — the source of the ±10° SHM limit.",
      },
    ],
    solvedProblems: [],
  },

  // ─── ELECTROSTATICS: COULOMB + GAUSS ──────────────────────────────────────
  {
    id: "phy-11-coulombs-law-vector-form",
    slug: "coulombs-law-force-between-charges",
    title: "Coulomb's Law — Vector Form, Superposition & Special Media",
    subject: "physics",
    unit: "Electric Charges & Field",
    unitId: "electric-charges",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Electrostatics)",
    isExtra: false,
    statement:
      "The force between two point charges acts along the line joining them, is proportional to the product of charges and inversely proportional to the square of their separation.",
    coreFormula: "\\vec{F} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}\\hat{r}",
    concernedTerms: [
      { term: "Permittivity of free space", symbol: "ε₀", units: "C² N⁻¹ m⁻²", definition: "8.85 × 10⁻¹²; sets the strength of electrostatic coupling." },
      { term: "Dielectric constant", symbol: "K", units: "dimensionless", definition: "Ratio F_vacuum / F_medium; reduces the force in a medium." },
    ],
    assumptions: [
      "Charges are point-like (size ≪ separation).",
      "Charges are at rest (electrostatics).",
      "Medium is homogeneous and isotropic.",
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Scalar statement",
        latex: "F = k\\frac{q_1 q_2}{r^2}, \\qquad k = \\frac{1}{4\\pi\\varepsilon_0} = 9\\times 10^9\\ \\text{N m}^2\\text{C}^{-2}",
        explanation: "Experimental inverse-square law; k is Coulomb's constant.",
      },
      {
        stepNumber: 2,
        title: "Vector form",
        latex: "\\vec{F}_{12} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r_{12}^2}\\hat{r}_{12}",
        explanation:
          "F₁₂ is the force on 1 due to 2; the unit vector points along the line joining them. Equal and opposite pairs satisfy Newton's third law.",
      },
      {
        stepNumber: 3,
        title: "Inside a dielectric medium",
        latex: "F_{med} = \\frac{1}{4\\pi\\varepsilon_0 K}\\frac{q_1 q_2}{r^2}",
        explanation: "The medium polarises and shields the charges, dividing the vacuum force by the dielectric constant K.",
      },
      {
        stepNumber: 4,
        title: "Superposition principle",
        latex: "\\vec{F}_{net} = \\sum_i \\vec{F}_{0i}",
        explanation:
          "With many charges, forces add vectorially pairwise — the basis of all multi-charge field problems.",
      },
    ],
    conclusion:
      "Coulomb's inverse-square law in vector form, plus superposition, lets every electrostatic field problem be built from pairwise forces; media weaken it by the factor 1/K.",
    keyTakeaways: [
      "Force obeys Newton's third law even for unequal charges.",
      "Inverse-square behaviour was verified down to sub-nanometre scales.",
      "In water (K ≈ 80), electrostatic forces are ~80× weaker than in vacuum.",
    ],
    examTraps: [
      "Forgetting the vector direction (attractive vs repulsive signs).",
      "Using cm instead of m in numericals.",
      "Applying the point-charge law to extended conductors touching each other.",
    ],
    visualType: "schematic",
    specialCases: [
      {
        name: "Inside a conductor",
        condition: "Charge placed on a conducting sphere's surface",
        formula: "F_{inside} = 0 \\quad (r < R)",
        meaning: "Electrostatic shielding: no field (hence no self-force) inside a hollow conductor.",
      },
      {
        name: "Behaviour outside a sphere",
        condition: "r ≥ R for a uniformly charged sphere",
        formula: "F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}",
        meaning: "A sphere acts as if all charge sat at its centre (shell theorem).",
      },
      {
        name: "Medium with dielectric K",
        condition: "Whole space filled with dielectric",
        formula: "F \\to F/K",
        meaning: "Slab problems: if a slab of thickness t < r is inserted, effective separation becomes r − t + t/K (CEE favourite).",
      },
      {
        name: "Zero net force point",
        condition: "Two unlike charges q₁, q₂ separated by d",
        formula: "x = \\frac{d\\sqrt{q_1}}{\\sqrt{q_1}+\\sqrt{q_2}} \\text{ from } q_1 \\text{ (outside segment for like charges)}",
        meaning: "Where a test charge feels no force — null-point location questions.",
      },
    ],
    solvedProblems: [],
  },

  // ─── CAPACITOR: ENERGY + COMBINATIONS ─────────────────────────────────────
  {
    id: "phy-11-capacitor-energy-and-combinations",
    slug: "capacitor-energy-series-parallel",
    title: "Capacitor — Energy Stored & Series/Parallel Combinations",
    subject: "physics",
    unit: "Capacitor",
    unitId: "capacitor",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Capacitors)",
    isExtra: false,
    statement:
      "A capacitor stores ½CV² of energy in its electric field; series sharing of charge and parallel sharing of voltage yield the combination rules.",
    coreFormula: "U = \\tfrac{1}{2}CV^2 = \\tfrac{1}{2}QV = \\frac{Q^2}{2C}",
    concernedTerms: [
      { term: "Capacitance", symbol: "C", units: "F", definition: "Charge stored per volt: C = Q/V." },
      { term: "Energy density", symbol: "u", units: "J m⁻³", definition: "Energy per unit volume of field: ½ε₀E²." },
    ],
    assumptions: [
      "Ideal capacitors (no leakage or ESR).",
      "Steady state after charging.",
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Energy from charging work",
        latex: "U = \\int_0^Q \\frac{q}{C}\\,dq = \\frac{Q^2}{2C} = \\tfrac{1}{2}CV^2",
        explanation:
          "At charge q the potential is q/C, so dW = (q/C)dq; integrating gives the stored energy in three equivalent forms.",
      },
      {
        stepNumber: 2,
        title: "Series combination",
        latex: "\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\cdots",
        explanation:
          "Same charge Q on each, voltages add: V = Q/C₁ + Q/C₂ + …, so reciprocals add.",
      },
      {
        stepNumber: 3,
        title: "Parallel combination",
        latex: "C_p = C_1 + C_2 + \\cdots",
        explanation: "Same voltage across each, charges add: Q = C₁V + C₂V + …, so capacitances add.",
      },
      {
        stepNumber: 4,
        title: "Energy density of the field",
        latex: "u = \\tfrac{1}{2}\\varepsilon_0 E^2",
        explanation:
          "For a parallel-plate capacitor U = ½ε₀E²·(Ad); dividing by volume Ad gives the universal field-energy density.",
      },
    ],
    conclusion:
      "U = ½CV² (three equivalent forms) with series reciprocals and parallel addition governs every capacitor network; the energy truly lives in the electric field at density ½ε₀E².",
    keyTakeaways: [
      "Series: smallest C dominates; parallel: largest C dominates.",
      "When a battery stays connected, V is constant; when disconnected, Q is constant — the two classic problem types.",
      "Dielectric insertion changes C by K (full) or partially for slabs.",
    ],
    examTraps: [
      "Using Q = CV after disconnecting the battery while also varying V — Q is the invariant then.",
      "Forgetting that series capacitors carry equal charges, not equal voltages.",
      "Halving factor: energy is ½QV, not QV (the other half is dissipated/radiated while charging).",
    ],
    visualType: "circuit",
    specialCases: [
      {
        name: "Battery connected, slab inserted",
        condition: "V constant, dielectric K fills gap",
        formula: "C \\to KC,\\quad Q \\to KQ,\\quad U \\to KU",
        meaning: "Charge and energy both grow — the battery supplies the difference.",
      },
      {
        name: "Battery disconnected, slab inserted",
        condition: "Q constant",
        formula: "C \\to KC,\\quad V \\to V/K,\\quad U \\to U/K",
        meaning: "Energy drops — the slab is pulled in (field does work on it).",
      },
      {
        name: "Two capacitors sharing charge",
        condition: "C₁ at V₀ connected to uncharged C₂",
        formula: "V_{common} = \\frac{C_1 V_0}{C_1 + C_2},\\quad \\Delta U = \\frac{C_1 C_2 V_0^2}{2(C_1+C_2)}",
        meaning: "Energy always decreases — the loss appears as heat/wire radiation.",
      },
      {
        name: "Spherical capacitor limit",
        condition: "Outer radius b → ∞",
        formula: "C = 4\\pi\\varepsilon_0 a \\;(\\text{isolated sphere})",
        meaning: "An isolated sphere is the b → ∞ limit of the spherical capacitor.",
      },
    ],
    solvedProblems: [],
  },
];

export const PHYSICS_WAVE1_DERIVATIONS = physicsDerivations;
