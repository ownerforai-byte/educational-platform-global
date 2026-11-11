/**
 * Theorem Fill — Physics Class 11, Part A (vectors → gas pressure).
 *
 * Fills the remaining "coming soon" syllabus theorem topics with full
 * statements, step-by-step proofs, special cases and exam problems.
 * slugs equal the official syllabus topic slugs so routes merge 1:1.
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

const P1: DerivationOrTheorem[] = [
  {
    id: "tf-phy-11-vector-laws",
    slug: "triangle-parallelogram-and-polygon-laws-of-vectors",
    title: "Triangle, Parallelogram and Polygon Laws of Vectors",
    subject: "physics",
    unit: "Vectors",
    unitId: "vectors",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Vectors)",
    isExtra: false,
    statement:
      "If two vectors acting at a point are represented in magnitude and direction by the two sides of a triangle taken in order, their resultant is represented by the third side taken in the reverse order (triangle law). Equivalently, if they are the adjacent sides of a parallelogram, the diagonal through their common point gives the resultant (parallelogram law); extended to any number of vectors this is the polygon law.",
    coreFormula: "R = \\sqrt{A^2 + B^2 + 2AB\\cos\\theta}, \\qquad \\tan\\alpha = \\frac{B\\sin\\theta}{A + B\\cos\\theta}",
    concernedTerms: [
      { term: "Resultant", symbol: "R", units: "N, m s⁻¹ …", definition: "Single vector producing the same effect as all component vectors together." },
      { term: "Angle between vectors", symbol: "θ", units: "°", definition: "Angle formed when the two vectors are drawn tail-to-tail." },
      { term: "Direction of resultant", symbol: "α", units: "°", definition: "Angle the resultant makes with vector A." },
    ],
    assumptions: ["Vectors are coplanar for the triangle/parallelogram form.", "All vectors act at (or can be shifted to) one common point."],
    proofSteps: [
      { stepNumber: 1, title: "Parallelogram construction", latex: "\\vec A + \\vec B = \\text{diagonal } \\vec R", explanation: "Draw A and B tail-to-tail; complete the parallelogram. Opposite sides carry equal, parallel vectors, so walking A then B lands exactly where the diagonal does." },
      { stepNumber: 2, title: "Resolve B along and perpendicular to A", latex: "B_\\parallel = B\\cos\\theta, \\quad B_\\perp = B\\sin\\theta", explanation: "Drop the perpendicular from the tip of B onto the line of A: the components split the parallelogram into a rectangle plus a right triangle." },
      { stepNumber: 3, title: "Magnitude by Pythagoras", latex: "R^2 = (A + B\\cos\\theta)^2 + (B\\sin\\theta)^2 = A^2 + B^2 + 2AB\\cos\\theta", explanation: "This is also the cosine rule of the triangle — the geometric and algebraic derivations agree." },
      { stepNumber: 4, title: "Direction", latex: "\\tan\\alpha = \\frac{B_\\perp}{A + B_\\parallel} = \\frac{B\\sin\\theta}{A + B\\cos\\theta}", explanation: "The resultant leans toward the larger vector; α = 45° only when the perpendicular and parallel contributions match." },
    ],
    conclusion:
      "The three laws are one law at different scales: triangle (2 vectors), parallelogram (same 2, drawn tail-to-tail), polygon (n vectors chained head-to-tail, resultant = closing side reversed).",
    keyTakeaways: [
      "R is maximum at θ = 0° and minimum at θ = 180°.",
      "The polygon law is the triangle law applied repeatedly — order of addition is irrelevant (commutative).",
      "Subtraction A − B = A + (−B): reverse B, then add.",
    ],
    examTraps: [
      "❌ θ is the angle between the vectors tail-to-tail, NOT the angle inside the triangle (which is 180° − θ).",
      "❌ Forgetting that the triangle's third side runs OPPOSITE to the resultant direction.",
    ],
    visualType: "tv-vector-laws",
    specialCases: [
      { name: "θ = 0° (parallel)", condition: "Same direction", formula: "R = A + B", meaning: "Maximum resultant — vectors reinforce." },
      { name: "θ = 90° (perpendicular)", condition: "Right angle", formula: "R = \\sqrt{A^2+B^2}, \\; \\tan\\alpha = B/A", meaning: "Classic x–y component resolution." },
      { name: "θ = 180° (antiparallel)", condition: "Opposite directions", formula: "R = |A - B|", meaning: "Minimum resultant — direction of the larger vector; R = 0 for equal magnitudes." },
    ],
    solvedProblems: [
      {
        id: "tf-p-vec-1",
        question: "Two forces of 3 N and 4 N act at 90°. Find the resultant.",
        examBadge: "NEB Board",
        given: "A = 3 N, B = 4 N, θ = 90°",
        stepByStep: ["R = √(3² + 4² + 2·3·4·cos90°) = √(9 + 16 + 0) = √25.", "tan α = 4·sin90° / (3 + 0) = 4/3."],
        finalAnswer: "R = 5\\ \\text{N at } 53° \\text{ from the 3 N force}",
        tipOrTrap: "The 3-4-5 triangle is the most reused result in vector problems.",
      },
    ],
  },
  {
    id: "tf-phy-11-newton-applications",
    slug: "application-of-newton-s-laws",
    title: "Application of Newton's Laws of Motion",
    subject: "physics",
    unit: "Dynamics",
    unitId: "dynamics",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Dynamics)",
    isExtra: false,
    statement:
      "Free-body diagrams plus Newton's second law applied to each body of a system solve connected-body problems: for an Atwood machine with masses m₁ < m₂ over a frictionless pulley, the acceleration is a = (m₂ − m₁)g/(m₁ + m₂) and the string tension T = 2m₁m₂g/(m₁ + m₂).",
    coreFormula: "a = \\frac{(m_2 - m_1)g}{m_1 + m_2}, \\qquad T = \\frac{2m_1 m_2\\, g}{m_1 + m_2}",
    concernedTerms: [
      { term: "Free-body diagram", symbol: "FBD", units: "—", definition: "Sketch of one body with ALL forces acting on it, isolated from the system." },
      { term: "Tension", symbol: "T", units: "N", definition: "Pull transmitted through a light, inextensible string — same throughout when pulley is frictionless." },
      { term: "Normal reaction", symbol: "N", units: "N", definition: "Perpendicular contact force balancing the component of weight into the surface." },
    ],
    assumptions: ["String is light and inextensible.", "Pulley is frictionless and massless.", "Air resistance neglected."],
    proofSteps: [
      { stepNumber: 1, title: "FBD of each mass", latex: "m_1: \\; T - m_1 g = m_1 a \\;\\; (up), \\qquad m_2: \\; m_2 g - T = m_2 a \\;\\; (down)", explanation: "Choose positive along each body's acceleration: m₁ accelerates up, m₂ accelerates down." },
      { stepNumber: 2, title: "Add the equations", latex: "(m_2 - m_1)g = (m_1 + m_2)a", explanation: "Tension is internal to the system and cancels — the system moves as one unit of mass m₁ + m₂." },
      { stepNumber: 3, title: "Solve for a, back-substitute for T", latex: "a = \\frac{(m_2-m_1)g}{m_1+m_2}; \\quad T = m_1(a + g) = \\frac{2m_1 m_2 g}{m_1 + m_2}", explanation: "Substituting a into m₁'s equation gives the tension — always less than m₂g and more than m₁g." },
    ],
    conclusion:
      "Every connected-body problem reduces to: one FBD per body, one N2 equation per body, shared kinematic links (same |a| along the string), then solve the simultaneous set.",
    keyTakeaways: [
      "Tension in an Atwood string always lies between m₁g and m₂g.",
      "Incline variant (frictionless): a = g(m₂ − m₁ sinθ)/(m₁ + m₂).",
      "Apparent weight in a lift: N = m(g + a) moving up, m(g − a) moving down; free-fall ⇒ N = 0 (weightlessness).",
    ],
    examTraps: [
      "❌ Using one FBD for the whole system when tension is asked — internal forces cancel only in the summed equation.",
      "❌ Sign errors: define a consistent positive direction BEFORE writing equations.",
    ],
    visualType: "tv-atwood-machine",
    specialCases: [
      { name: "m₁ = m₂", condition: "Equal masses", formula: "a = 0, \\; T = m_1 g", meaning: "Balanced system — either mass can rest or move uniformly." },
      { name: "m₂ ≫ m₁", condition: "One mass dominates", formula: "a \\to g, \\; T \\to 2m_1 g", meaning: "Falling-mass limit; tension stays finite." },
      { name: "Body on smooth incline", condition: "Angle θ", formula: "a = g\\sin\\theta, \\; N = mg\\cos\\theta", meaning: "Acceleration is gravity's along-slope component." },
    ],
    solvedProblems: [
      {
        id: "tf-p-ntw-1",
        question: "In an Atwood machine m₁ = 2 kg, m₂ = 3 kg. Find a and T (g = 10 m s⁻²).",
        examBadge: "NEB 2078",
        given: "m₁ = 2 kg, m₂ = 3 kg",
        stepByStep: ["a = (3−2)(10)/(3+2) = 10/5 = 2 m s⁻².", "T = 2·2·3·10/5 = 120/5 = 24 N."],
        finalAnswer: "a = 2\\ \\text{m s}^{-2}, \\; T = 24\\ \\text{N}",
        tipOrTrap: "Check: T(24 N) lies between m₁g = 20 N and m₂g = 30 N. ✓",
      },
    ],
  },
  {
    id: "tf-phy-11-moment-torque",
    slug: "moment-torque-and-equilibrium",
    title: "Moment, Torque and Conditions of Equilibrium",
    subject: "physics",
    unit: "Dynamics",
    unitId: "dynamics",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Dynamics)",
    isExtra: false,
    statement:
      "The turning effect (moment/torque) of a force about an axis is τ = rF sinθ = force × perpendicular distance (moment arm). A rigid body is in complete equilibrium when the vector sum of forces AND the vector sum of torques both vanish: ΣF = 0 and Στ = 0.",
    coreFormula: "\\tau = rF\\sin\\theta, \\qquad \\sum \\vec F = 0, \\quad \\sum \\vec \\tau = 0",
    concernedTerms: [
      { term: "Moment arm", symbol: "r⊥", units: "m", definition: "Perpendicular distance from the axis to the line of action of the force." },
      { term: "Couple", symbol: "C", units: "N m", definition: "Two equal, opposite, non-collinear forces: net force zero but net torque Fd." },
      { term: "Centre of gravity", symbol: "G", units: "—", definition: "Point where the resultant weight acts; the balance point for Στ = 0." },
    ],
    assumptions: ["Rigid body (no deformation).", "Forces are coplanar unless vector form is used."],
    proofSteps: [
      { stepNumber: 1, title: "Moment of a force about an axis", latex: "\\tau = r_{\\perp} F = rF\\sin\\theta", explanation: "Only the perpendicular component turns the body; a force along the line through the axis has zero arm and zero torque." },
      { stepNumber: 2, title: "Principle of moments (lever rule)", latex: "F_1 d_1 = F_2 d_2", explanation: "A balanced beam demands equal clockwise and anticlockwise moments about the pivot — the law of the lever." },
      { stepNumber: 3, title: "Two conditions of equilibrium", latex: "\\sum F_x = 0, \\; \\sum F_y = 0, \\quad \\sum \\tau = 0", explanation: "ΣF = 0 prevents translation; Στ = 0 prevents rotation. Both are needed (a couple satisfies ΣF = 0 yet rotates)." },
    ],
    conclusion:
      "Statics is exactly two equations: no net force, no net torque about ANY point — choosing the pivot through an unknown force removes it and simplifies the algebra.",
    keyTakeaways: [
      "Torque about any point of a body in equilibrium is zero — pick the clever pivot.",
      "A couple cannot be balanced by a single force; it needs another couple.",
      "Units: N m (never joules — torque is not energy).",
    ],
    examTraps: [
      "❌ Using distance along the beam instead of the PERPENDICULAR distance (moment arm).",
      "❌ Confusing the first condition (ΣF = 0) with complete equilibrium — a couple rotates with ΣF = 0.",
    ],
    visualType: "tv-moment-torque",
    specialCases: [
      { name: "Force through the pivot", condition: "θ = 0° along r", formula: "\\tau = 0", meaning: "Hinge forces exert no torque about the hinge." },
      { name: "Couple", condition: "F, −F separated by d", formula: "\\tau = Fd \\; (\\text{same about every point})", meaning: "Pure rotation without translation — steering wheel, tap." },
      { name: "Leaning-ladder problem", condition: "Wall smooth", formula: "N_w h = \\mu N_f \\,\\times\\, \\text{geometry}", meaning: "Friction at the floor is what stops the ladder sliding." },
    ],
    solvedProblems: [
      {
        id: "tf-p-trq-1",
        question: "A 60 N weight hangs 30 cm from a pivot. Where must a 90 N force act to balance it?",
        examBadge: "CEE Entrance",
        given: "F₁ = 60 N, d₁ = 0.30 m, F₂ = 90 N",
        stepByStep: ["Principle of moments: 60 × 0.30 = 90 × d₂.", "d₂ = 18/90 = 0.2 m."],
        finalAnswer: "d_2 = 0.20\\ \\text{m on the opposite side}",
        tipOrTrap: "Always verify ΣF = 0 too — the pivot here supplies the missing 150 N reaction.",
      },
    ],
  },
  {
    id: "tf-phy-11-solid-friction",
    slug: "solid-friction-laws-of-solid-friction-and-their-verifications",
    title: "Solid Friction: Laws of Friction and Their Verifications",
    subject: "physics",
    unit: "Dynamics",
    unitId: "dynamics",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Dynamics)",
    isExtra: false,
    statement:
      "Friction opposes relative sliding. The laws: (1) it acts parallel to the contact surface against motion; (2) limiting static friction f_s ≤ μ_s N and kinetic friction f_k = μ_k N; (3) friction is proportional to the normal reaction; (4) it is independent of the apparent contact area; (5) μ depends only on the nature of the surfaces.",
    coreFormula: "f_s \\le \\mu_s N, \\qquad f_k = \\mu_k N, \\qquad \\mu_s > \\mu_k, \\qquad \\tan\\theta_{rep} = \\mu_s",
    concernedTerms: [
      { term: "Limiting friction", symbol: "f_max", units: "N", definition: "Maximum static friction just before sliding starts." },
      { term: "Coefficient of friction", symbol: "μ", units: "dimensionless", definition: "Ratio f/N; depends on surface pair only." },
      { term: "Angle of repose", symbol: "θ_rep", units: "°", definition: "Incline angle at which the block just slides: tan θ = μ_s." },
    ],
    assumptions: ["Dry, unlubricated surfaces (Coulomb regime).", "Moderate speeds — kinetic μ roughly speed-independent."],
    proofSteps: [
      { stepNumber: 1, title: "Law of proportionality to N", latex: "f \\propto N \\;\\Rightarrow\\; f = \\mu N", explanation: "Stacking identical blocks doubles the pull needed to slide — doubling N doubles friction (spring-balance experiment)." },
      { stepNumber: 2, title: "Area independence", latex: "f = \\mu N \\; (\\text{no } A \\text{ term})", explanation: "A brick slid on its face or edge needs the same pull: real contact area is the microscopic junction area, roughly proportional to N, not to the apparent area." },
      { stepNumber: 3, title: "Angle of repose verification", latex: "mg\\sin\\theta = \\mu\\, mg\\cos\\theta \\;\\Rightarrow\\; \\tan\\theta = \\mu", explanation: "Tilting a plank until the block slides reads μ directly from the protractor — the classic classroom verification." },
    ],
    conclusion:
      "The five laws are experimental truths of dry friction; they follow from real (microscopic) contact area growing with load, which is why area-independence and proportionality to N appear together.",
    keyTakeaways: [
      "μs > μk — it is harder to START sliding than to keep sliding.",
      "Rolling friction ≪ sliding friction: the whole point of wheels and ball bearings.",
      "Friction can accelerate (walking, driving) — it opposes relative slipping, not motion per se.",
    ],
    examTraps: [
      "❌ 'Friction always opposes motion' — it opposes RELATIVE motion of the surfaces (it drives the walking foot forward).",
      "❌ Assuming friction always equals μN — static friction is an ADAPTIVE force up to its limit.",
    ],
    visualType: "tv-friction-laws",
    specialCases: [
      { name: "Block on incline", condition: "Angle θ", formula: "f = mg\\sin\\theta \\le \\mu mg\\cos\\theta", meaning: "Slides when tanθ > μ." },
      { name: "Angle of repose", condition: "Just sliding", formula: "\\tan\\theta_{rep} = \\mu_s", meaning: "Experimental route to μ without a spring balance." },
      { name: "Rolling", condition: "Wheel/bearing", formula: "f_r = \\mu_r N, \\; \\mu_r \\ll \\mu_k", meaning: "Why carts beat sledges." },
    ],
    solvedProblems: [
      {
        id: "tf-p-fri-1",
        question: "A plank tilts to 30° when a block starts sliding. Find μs.",
        examBadge: "NEB 2077",
        given: "θ = 30°",
        stepByStep: ["μs = tan θ = tan 30°."],
        finalAnswer: "\\mu_s = 0.577",
        tipOrTrap: "One protractor reading replaces the whole spring-balance experiment.",
      },
    ],
  },
  {
    id: "tf-phy-11-angular-linear",
    slug: "relation-between-angular-and-linear-velocity-and-acceleration",
    title: "Relation between Angular and Linear Velocity and Acceleration",
    subject: "physics",
    unit: "Circular Motion",
    unitId: "circular-motion",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Circular Motion)",
    isExtra: false,
    statement:
      "For a particle at radius r from a rotation axis: linear speed v = rω; tangential acceleration a_t = rα; and the inward centripetal acceleration a_c = v²/r = ω²r, directed towards the centre. Total acceleration is the vector sum of tangential and centripetal parts.",
    coreFormula: "v = r\\omega, \\qquad a_t = r\\alpha, \\qquad a_c = \\frac{v^2}{r} = \\omega^2 r",
    concernedTerms: [
      { term: "Angular velocity", symbol: "ω", units: "rad s⁻¹", definition: "Rate of sweep of angle: ω = dθ/dt (2π rad = 1 rev)." },
      { term: "Centripetal acceleration", symbol: "a_c", units: "m s⁻²", definition: "Inward acceleration changing the DIRECTION of velocity in uniform circular motion." },
      { term: "Tangential acceleration", symbol: "a_t", units: "m s⁻²", definition: "Component changing the SPEED along the circle." },
    ],
    assumptions: ["Rigid rotation (same ω for every point of the body).", "Planar circular path."],
    proofSteps: [
      { stepNumber: 1, title: "Arc length relation", latex: "s = r\\theta \\;\\Rightarrow\\; \\frac{ds}{dt} = r\\frac{d\\theta}{dt} \\;\\Rightarrow\\; v = r\\omega", explanation: "Differentiating arc length = radius × angle gives the velocity link — the radian makes this exact." },
      { stepNumber: 2, title: "Tangential acceleration", latex: "a_t = \\frac{dv}{dt} = r\\frac{d\\omega}{dt} = r\\alpha", explanation: "Same differentiation applied to a changing speed: angular acceleration times radius." },
      { stepNumber: 3, title: "Centripetal acceleration", latex: "a_c = \\frac{v^2}{r} = \\frac{(r\\omega)^2}{r} = \\omega^2 r", explanation: "Over one small interval the velocity vector rotates; the inward component needed to turn it is v²/r — pure geometry of the direction change." },
    ],
    conclusion:
      "Angular quantities describe the whole rotating body; linear quantities describe one point. They are chained by the radius: v = rω and a_t = rα, with a_c supplied by whatever force holds the circle.",
    keyTakeaways: [
      "Uniform circular motion (ω constant) still has acceleration — a_c, always inward.",
      "ω is the same for every point of a rigid body; v is not (v ∝ r).",
      "1 revolution = 2π rad, so ω = 2π/T = 2πf.",
    ],
    examTraps: [
      "❌ Writing a = rα for uniform circular motion — with ω constant, α = 0 and the ONLY acceleration is v²/r inward.",
      "❌ Mixing degrees and radians — v = rω requires ω in rad s⁻¹.",
    ],
    visualType: "tv-angular-linear",
    specialCases: [
      { name: "Uniform circular motion", condition: "ω = const", formula: "a_t = 0, \\; a = v^2/r", meaning: "Speed constant, direction changing — centripetal only." },
      { name: "Rolling without slipping", condition: "Contact point at rest", formula: "v_{cm} = r\\omega", meaning: "Links translational and rotational motion." },
      { name: "r → ∞", condition: "Nearly straight path", formula: "a_c \\to 0", meaning: "Straight-line motion is the infinite-radius limit." },
    ],
    solvedProblems: [
      {
        id: "tf-p-ang-1",
        question: "A stone on a 0.5 m string whirls at 2 rev s⁻¹. Find v and a_c.",
        examBadge: "NEB Board",
        given: "r = 0.5 m, f = 2 Hz",
        stepByStep: ["ω = 2πf = 4π rad s⁻¹ ≈ 12.57 rad s⁻¹.", "v = rω = 0.5 × 12.57 ≈ 6.28 m s⁻¹.", "a_c = ω²r = (12.57)² × 0.5 ≈ 79 m s⁻²."],
        finalAnswer: "v \\approx 6.3\\ \\text{m s}^{-1}, \\; a_c \\approx 79\\ \\text{m s}^{-2} \\approx 8g",
        tipOrTrap: "Spin frequency in rev/s must be converted to rad/s before using v = rω.",
      },
    ],
  },
  {
    id: "tf-phy-11-gravitation-law",
    slug: "newton-s-law-of-gravitation",
    title: "Newton's Law of Gravitation",
    subject: "physics",
    unit: "Gravitation",
    unitId: "gravitation",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Gravitation)",
    isExtra: false,
    statement:
      "Every pair of particles attracts along their line of joining with force F = Gm₁m₂/r², where G = 6.67 × 10⁻¹¹ N m² kg⁻². For a uniform sphere the attraction is as if its whole mass sat at its centre (shell theorem), giving surface gravity g = GM/R².",
    coreFormula: "F = \\frac{G m_1 m_2}{r^2}, \\qquad g = \\frac{GM}{R^2}",
    concernedTerms: [
      { term: "Universal constant", symbol: "G", units: "N m² kg⁻²", definition: "Same for every pair of masses everywhere — measured by Cavendish." },
      { term: "Shell theorem", symbol: "—", units: "—", definition: "A uniform spherical shell attracts an external particle as a point mass at its centre; inside, net force is zero." },
      { term: "Surface gravity", symbol: "g", units: "m s⁻²", definition: "Free-fall acceleration at the surface produced by the planet's own mass." },
    ],
    assumptions: ["Point masses (or uniform spheres, via the shell theorem).", "Weak-field regime (no relativity)."],
    proofSteps: [
      { stepNumber: 1, title: "Kepler's third law as input", latex: "T^2 \\propto r^3", explanation: "Planets obey T² = kr³ — an empirical fact Newton set out to explain." },
      { stepNumber: 2, title: "Centripetal force of an orbiting planet", latex: "F = m\\frac{4\\pi^2 r}{T^2} = \\frac{4\\pi^2 m}{kr^2} \\;\\propto\\; \\frac{m}{r^2}", explanation: "Substituting T² = kr³ shows the required inward force falls as 1/r²." },
      { stepNumber: 3, title: "Symmetry demands F ∝ m₁m₂", latex: "F = G\\frac{m_1 m_2}{r^2}", explanation: "By Newton's third law the force on planet and Sun is mutual, so it must carry BOTH masses — proportionality constant G." },
      { stepNumber: 4, title: "Weighing the Earth: g = GM/R²", latex: "mg = \\frac{GMm}{R^2} \\;\\Rightarrow\\; g = \\frac{GM}{R^2}", explanation: "Equating the local weight with universal attraction gives surface gravity from the planet's mass and radius." },
    ],
    conclusion:
      "One inverse-square law unifies falling apples and orbiting moons; G is the same constant that weighs the Earth, predicts tides and steers spacecraft.",
    keyTakeaways: [
      "G ≠ g: G is universal, g is local (g = GM/R²).",
      "Cavendish 'weighed the Earth' by measuring G.",
      "Gravity obeys superposition: net force = vector sum over all masses.",
    ],
    examTraps: [
      "❌ Using diameter instead of radius in g = GM/R².",
      "❌ Forgetting the shell theorem lets you treat Earth as a point mass at its centre for EXTERNAL points only.",
    ],
    visualType: "tv-gravitation-law",
    specialCases: [
      { name: "Inside a shell", condition: "r < R of shell", formula: "F = 0", meaning: "Field contributions cancel — basis of the depth result for g." },
      { name: "Uniform sphere, external point", condition: "r ≥ R", formula: "F = GMm/r^2", meaning: "Sphere acts as a point mass at its centre." },
      { name: "Two equal masses", condition: "m₁ = m₂ = m, separation d", formula: "F = Gm^2/d^2", meaning: "Basis of the Cavendish experiment measuring G." },
    ],
    solvedProblems: [
      {
        id: "tf-p-grv-1",
        question: "Show Earth's mean density ρ = 3g/(4πGR).",
        examBadge: "NEB 2079",
        given: "g = GM/R², M = (4/3)πR³ρ",
        stepByStep: ["M = (4/3)πR³ρ from the volume of a sphere.", "g = G(4/3)πR³ρ/R² = (4/3)πGRρ.", "ρ = 3g/(4πGR)."],
        finalAnswer: "\\rho = \\frac{3g}{4\\pi G R} \\approx 5500\\ \\text{kg m}^{-3}",
        tipOrTrap: "This is exactly how the first decent estimate of Earth's density was made.",
      },
    ],
  },
  {
    id: "tf-phy-11-variation-g",
    slug: "variation-in-value-of-g-due-to-altitude-and-depth",
    title: "Variation in the Value of g with Altitude and Depth",
    subject: "physics",
    unit: "Gravitation",
    unitId: "gravitation",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Gravitation)",
    isExtra: false,
    statement:
      "Gravity weakens with height as g_h = gR²/(R+h)² ≈ g(1 − 2h/R) for h ≪ R, and weakens linearly with depth as g_d = g(1 − d/R), because only the mass inside radius (R − d) attracts the particle. Both vanish the effect: g falls to zero at Earth's centre.",
    coreFormula: "g_h = g\\left(\\frac{R}{R+h}\\right)^2 \\approx g\\left(1 - \\frac{2h}{R}\\right), \\qquad g_d = g\\left(1 - \\frac{d}{R}\\right)",
    concernedTerms: [
      { term: "Altitude effect", symbol: "g_h", units: "m s⁻²", definition: "Gravity at height h above the surface — inverse-square falloff." },
      { term: "Depth effect", symbol: "g_d", units: "m s⁻²", definition: "Gravity at depth d — linear falloff because outer shells contribute nothing." },
      { term: "Fractional change", symbol: "Δg/g", units: "—", definition: "−2h/R at height, −d/R at depth: height is twice as effective per metre." },
    ],
    assumptions: ["Earth is a uniform sphere of radius R.", "h ≪ R for the binomial approximations.", "No rotation effects (otherwise effective g also varies with latitude)."],
    proofSteps: [
      { stepNumber: 1, title: "At height h", latex: "g_h = \\frac{GM}{(R+h)^2} = \\frac{GM}{R^2}\\left(1+\\frac{h}{R}\\right)^{-2} \\approx g\\left(1-\\frac{2h}{R}\\right)", explanation: "Inverse-square law plus binomial expansion for h ≪ R." },
      { stepNumber: 2, title: "At depth d — shell theorem", latex: "M_{inside} = \\frac{4}{3}\\pi (R-d)^3 \\rho \\;\\propto\\; (R-d)^3", explanation: "Shells outside the particle exert zero net force, so only the sphere of radius R − d counts." },
      { stepNumber: 3, title: "Depth result", latex: "g_d = \\frac{GM_{inside}}{(R-d)^2} = g\\,\\frac{(R-d)^3/R^3}{(R-d)^2/R^2} = g\\left(1-\\frac{d}{R}\\right)", explanation: "One power of (R−d) cancels, leaving a linear decrease — g is maximum at the surface." },
    ],
    conclusion:
      "g is maximal at the surface, falls quadratically upward and linearly downward; comparing the two tells you whether a mine or a mountain changes your weight more.",
    keyTakeaways: [
      "Per metre, altitude halves gravity twice as fast as depth (2h/R vs d/R).",
      "At the centre g = 0 — no preferred direction.",
      "The equal-value condition: g_h = g_d when d = 2h.",
    ],
    examTraps: [
      "❌ Using the exact formula gR²/(R+h)² for depth — depth uses the LINEAR law from the shell theorem.",
      "❌ Forgetting the factor 2 in the altitude approximation.",
    ],
    visualType: "tv-variation-g",
    specialCases: [
      { name: "h ≪ R (mountain top)", condition: "Binomial regime", formula: "\\frac{\\Delta g}{g} \\approx -\\frac{2h}{R}", meaning: "Everest top loses ~0.3% of g." },
      { name: "d = 2h", condition: "Equal g", formula: "g_h = g_d", meaning: "Standard NEB comparison question." },
      { name: "Centre of Earth", condition: "d = R", formula: "g_d = 0", meaning: "All shell contributions cancel." },
    ],
    solvedProblems: [
      {
        id: "tf-p-var-1",
        question: "At what depth does g become 1% less than at the surface? (R = 6400 km)",
        examBadge: "NEB 2076",
        given: "Δg/g = 0.01 = d/R",
        stepByStep: ["d/R = 0.01 ⇒ d = 0.01 × 6400 km."],
        finalAnswer: "d = 64\\ \\text{km}",
        tipOrTrap: "The same 1% drop needs only 32 km of altitude — height wins.",
      },
    ],
  },
  {
    id: "tf-phy-11-hookes-law",
    slug: "hooke-s-law-force-constant",
    title: "Hooke's Law and the Force Constant",
    subject: "physics",
    unit: "Elasticity",
    unitId: "elasticity",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Elasticity)",
    isExtra: false,
    statement:
      "Within the elastic limit, the extension of a spring is proportional to the applied load: F = kx. The force constant k (N m⁻¹) measures stiffness. Springs combine like capacitors: parallel k_p = k₁ + k₂, series 1/k_s = 1/k₁ + 1/k₂, and stored energy U = ½kx².",
    coreFormula: "F = kx, \\qquad U = \\tfrac{1}{2}kx^2, \\qquad k_p = k_1 + k_2, \\quad \\frac{1}{k_s} = \\frac{1}{k_1} + \\frac{1}{k_2}",
    concernedTerms: [
      { term: "Force constant", symbol: "k", units: "N m⁻¹", definition: "Load per unit extension; the spring's stiffness." },
      { term: "Elastic limit", symbol: "—", units: "—", definition: "Maximum stress within which deformation is fully reversible." },
      { term: "Elastic potential energy", symbol: "U", units: "J", definition: "Area under the F–x graph = ½kx² for a linear spring." },
    ],
    assumptions: ["Within the elastic limit (linear region).", "Spring mass negligible compared with the load."],
    proofSteps: [
      { stepNumber: 1, title: "Hooke's law from the F–x graph", latex: "F \\propto x \\;\\Rightarrow\\; F = kx", explanation: "Suspended loads versus extensions give a straight line through the origin; the gradient is k." },
      { stepNumber: 2, title: "Energy stored", latex: "W = \\int_0^x kx\\,dx = \\tfrac{1}{2}kx^2", explanation: "Average force kx/2 over extension x — the triangular area under the graph." },
      { stepNumber: 3, title: "Series combination", latex: "\\text{same } F: \\; x_s = \\frac{F}{k_1} + \\frac{F}{k_2} = F\\left(\\frac{1}{k_1}+\\frac{1}{k_2}\\right) \\;\\Rightarrow\\; \\frac{1}{k_s} = \\frac{1}{k_1}+\\frac{1}{k_2}", explanation: "Series springs share force, add extensions — so stiffnesses add reciprocally." },
      { stepNumber: 4, title: "Parallel combination", latex: "\\text{same } x: \\; F = k_1 x + k_2 x \\;\\Rightarrow\\; k_p = k_1 + k_2", explanation: "Parallel springs share extension, add forces — stiffnesses add directly." },
    ],
    conclusion:
      "k is the spring's fingerprint: it sets the oscillation period T = 2π√(m/k), the stored energy and how springs combine — stiff in parallel, soft in series.",
    keyTakeaways: [
      "Series behaves like capacitors; parallel like resistors — do not mix the two patterns.",
      "Beyond the elastic limit the F–x curve bends: permanent (plastic) deformation.",
      "Young's modulus Y = stress/strain is the material-level version of Hooke's law.",
    ],
    examTraps: [
      "❌ Using ½kx for energy — it is ½kx².",
      "❌ Adding k directly for series springs — series adds reciprocals.",
    ],
    visualType: "tv-hooke-const",
    specialCases: [
      { name: "Rigid material", condition: "k → ∞", formula: "x = F/k \\to 0", meaning: "Ideal rigid body — no extension under any finite load." },
      { name: "Two identical springs", condition: "k₁ = k₂ = k", formula: "k_p = 2k, \\; k_s = k/2", meaning: "Parallel doubles, series halves the stiffness." },
      { name: "Elastic limit crossed", condition: "Large x", formula: "F \\ne kx \\; (\\text{plastic})", meaning: "Permanent set remains after unloading." },
    ],
    solvedProblems: [
      {
        id: "tf-p-hok-1",
        question: "A 0.5 kg load stretches a spring 2 cm. Find k and the energy stored.",
        examBadge: "NEB Board",
        given: "m = 0.5 kg, x = 0.02 m, g = 10",
        stepByStep: ["F = mg = 5 N.", "k = F/x = 5/0.02 = 250 N m⁻¹.", "U = ½kx² = ½·250·(0.02)² = 0.05 J."],
        finalAnswer: "k = 250\\ \\text{N m}^{-1}, \\; U = 0.05\\ \\text{J}",
        tipOrTrap: "Always convert cm to m before k = F/x.",
      },
    ],
  },
  {
    id: "tf-phy-11-zeroth-law",
    slug: "meaning-of-thermal-equilibrium-and-zeroth-law-of-thermodynamics",
    title: "Thermal Equilibrium and the Zeroth Law of Thermodynamics",
    subject: "physics",
    unit: "Heat and Temperature",
    unitId: "heat-and-temperature",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Heat & Temperature)",
    isExtra: false,
    statement:
      "Two systems in contact that exchange no net heat are in thermal equilibrium. The Zeroth law: if systems A and B are each in thermal equilibrium with a third system C, then A and B are in thermal equilibrium with each other — which makes temperature a well-defined, measurable property.",
    coreFormula: "(A \\sim C) \\wedge (B \\sim C) \\;\\Rightarrow\\; A \\sim B",
    concernedTerms: [
      { term: "Thermal equilibrium", symbol: "∼", units: "—", definition: "No net heat flow between systems in thermal contact — equal temperature." },
      { term: "Diathermic wall", symbol: "—", units: "—", definition: "Wall allowing heat exchange (metal); the opposite, adiabatic, blocks it." },
      { term: "Temperature", symbol: "T", units: "K / °C", definition: "The property that equality of which guarantees thermal equilibrium." },
    ],
    assumptions: ["Systems are in thermal contact through diathermic walls.", "No other energy transfer (work) is involved."],
    proofSteps: [
      { stepNumber: 1, title: "Hot meets cold", latex: "T_A > T_C \\;\\Rightarrow\\; \\text{heat } A \\to C", explanation: "Contact at unequal temperatures drives net energy flow from hot to cold until flow stops." },
      { stepNumber: 2, title: "Equilibrium reached", latex: "T_A = T_C \\; (\\text{net flow } = 0)", explanation: "Microscopically exchanges continue but balance — the definition of thermal equilibrium." },
      { stepNumber: 3, title: "Zeroth law (transitivity)", latex: "A \\sim C, \\; B \\sim C \\;\\Rightarrow\\; T_A = T_C = T_B \\;\\Rightarrow\\; A \\sim B", explanation: "Equality of temperature is transitive; this logical closure is the Zeroth law and the licence for thermometers." },
    ],
    conclusion:
      "The Zeroth law is why a thermometer works: body C (the thermometer) equilibrating with A and B certifies that A and B share one temperature — temperature becomes measurable without comparing bodies directly.",
    keyTakeaways: [
      "Heat flows because of temperature difference; temperature is the equilibrium property.",
      "The law was named 'Zeroth' because it logically precedes the First and Second laws.",
      "Equilibrium of a composite system: energy conservation (calorimetry) picks the final temperature.",
    ],
    examTraps: [
      "❌ Confusing heat (energy in transit) with temperature (equilibrium state variable).",
      "❌ Claiming bodies must TOUCH for the Zeroth law — it only requires each to be in equilibrium with C.",
    ],
    visualType: "tv-zeroth-law",
    specialCases: [
      { name: "Thermometer as body C", condition: "Small heat capacity", formula: "T_C \\to T_A \\text{ without disturbing } T_A", meaning: "Good thermometers barely perturb what they measure." },
      { name: "Adiabatic wall between A and B", condition: "No exchange", formula: "T_A \\ne T_B \\text{ allowed}", meaning: "Equilibrium is bypassed, not reached." },
      { name: "Calorimetry mixture", condition: "Isolated system", formula: "\\sum m c \\,\\Delta T = 0", meaning: "Heat lost = heat gained — the Zeroth law in arithmetic." },
    ],
    solvedProblems: [
      {
        id: "tf-p-zro-1",
        question: "0.2 kg water at 80°C mixes with 0.3 kg at 20°C. Final temperature? (c same)",
        examBadge: "NEB Board",
        given: "m₁c(80−T) = m₂c(T−20)",
        stepByStep: ["0.2(80 − T) = 0.3(T − 20).", "16 − 0.2T = 0.3T − 6 ⇒ 0.5T = 22."],
        finalAnswer: "T = 44°C",
        tipOrTrap: "The same c cancels — heavier water pulls the answer toward 20°C.",
      },
    ],
  },
  {
    id: "tf-phy-11-mercury-thermometer",
    slug: "thermal-equilibrium-as-a-working-principle-of-a-mercury-thermometer",
    title: "Thermal Equilibrium as the Working Principle of a Mercury Thermometer",
    subject: "physics",
    unit: "Heat and Temperature",
    unitId: "heat-and-temperature",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Heat & Temperature)",
    isExtra: false,
    statement:
      "A mercury thermometer reads temperature by being placed in thermal equilibrium with the body: mercury's volume expands linearly with temperature, ΔV = γVΔT, so the thread length in a uniform capillary is a direct temperature scale calibrated at the ice point (0°C) and steam point (100°C).",
    coreFormula: "\\Delta V = \\gamma V \\Delta T, \\qquad t = \\frac{l - l_0}{l_{100} - l_0}\\times 100°C",
    concernedTerms: [
      { term: "Volume expansivity", symbol: "γ", units: "°C⁻¹", definition: "Fractional volume change per degree (mercury ≈ 1.8 × 10⁻⁴)." },
      { term: "Ice/steam points", symbol: "0/100", units: "°C", definition: "Fixed calibration points of melting ice and steam at 1 atm." },
      { term: "Sensitivity", symbol: "—", units: "—", definition: "Rise of thread per degree — improved by a large bulb and a fine bore." },
    ],
    assumptions: ["Mercury's expansion is linear over the working range.", "Glass expansion is negligible (or corrected)."],
    proofSteps: [
      { stepNumber: 1, title: "Equilibrium condition", latex: "T_{Hg} = T_{body}", explanation: "Left long enough, mercury and body reach the Zeroth-law equilibrium — the reading is meaningful because temperatures are equal." },
      { stepNumber: 2, title: "Linear expansion", latex: "V = V_0(1 + \\gamma\\Delta T)", explanation: "Mercury's near-linear γ makes equal temperature steps occupy equal volumes — a uniform scale." },
      { stepNumber: 3, title: "Thread height in a capillary", latex: "h = \\frac{\\Delta V}{A_{bore}} = \\frac{\\gamma V_0 \\Delta T}{A}", explanation: "Volume change pushed into a fine tube converts a tiny ΔV into a long, readable column — large bulb, fine bore = sensitive." },
      { stepNumber: 4, title: "Calibration", latex: "t = \\frac{l_t - l_0}{l_{100} - l_0}\\times 100", explanation: "Marking the two fixed points and dividing the interval into 100 equal degrees." },
    ],
    conclusion:
      "The mercury thermometer is the Zeroth law made physical: equilibrium guarantees the reading, linear expansion guarantees the scale, and the capillary geometry guarantees visibility.",
    keyTakeaways: [
      "A thermometer must have a small heat capacity so it does not alter the measured body.",
      "Mercury is chosen because it does not wet glass, conducts well and stays liquid −39°C to 357°C.",
      "Alcohol thermometers work to −112°C but need dye and wet glass.",
    ],
    examTraps: [
      "❌ Reading a thermometer instantly — equilibrium takes time (thermal lag).",
      "❌ Ignoring stem/glass correction in precise work — the glass bulb also expands.",
    ],
    visualType: "tv-mercury-thermometer",
    specialCases: [
      { name: "Above 357°C", condition: "Mercury boils", formula: "\\text{Hg fails}", meaning: "Gas or platinum-resistance thermometers take over." },
      { name: "Clinical thermometer", condition: "Kink in bore", formula: "\\text{reading held}", meaning: "Kink breaks the column so the reading persists after removal." },
      { name: "Bore non-uniformity", condition: "Variable A", formula: "\\text{non-linear scale}", meaning: "Calibration marks must then be spaced individually." },
    ],
    solvedProblems: [
      {
        id: "tf-p-thm-1",
        question: "A thermometer reads 3 cm at 0°C and 23 cm at 100°C. What is the temperature at 11 cm?",
        examBadge: "NEB 2077",
        given: "l₀ = 3 cm, l₁₀₀ = 23 cm, l = 11 cm",
        stepByStep: ["t = (11 − 3)/(23 − 3) × 100 = 8/20 × 100."],
        finalAnswer: "t = 40°C",
        tipOrTrap: "This length-ratio formula is the standard calibration question pattern.",
      },
    ],
  },
  {
    id: "tf-phy-11-expansion-relations",
    slug: "cubical-expansion-superficial-expansion-and-their-relation-with-linear-expansion",
    title: "Cubical and Superficial Expansion and Their Relation with Linear Expansion",
    subject: "physics",
    unit: "Thermal Expansion",
    unitId: "thermal-expansion",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Thermal Expansion)",
    isExtra: false,
    statement:
      "For isotropic solids the three expansivities are locked together: β = 2α (superficial/area) and γ = 3α (cubical/volume). Areal and volume changes follow ΔA = βAΔT and ΔV = γVΔT, both derived by expanding the length in two and three dimensions.",
    coreFormula: "\\beta = 2\\alpha, \\qquad \\gamma = 3\\alpha, \\qquad \\Delta V = \\gamma V \\Delta T",
    concernedTerms: [
      { term: "Linear expansivity", symbol: "α", units: "°C⁻¹", definition: "Fractional length change per degree." },
      { term: "Superficial expansivity", symbol: "β", units: "°C⁻¹", definition: "Fractional area change per degree." },
      { term: "Cubical expansivity", symbol: "γ", units: "°C⁻¹", definition: "Fractional volume change per degree; the only one that matters for liquids/gases." },
    ],
    assumptions: ["Isotropic material (α same in every direction).", "Small ΔT so (αΔT)² terms are negligible."],
    proofSteps: [
      { stepNumber: 1, title: "Area of a heated plate", latex: "A' = l^2(1+\\alpha\\Delta T)^2 = A\\left(1 + 2\\alpha\\Delta T + \\alpha^2\\Delta T^2\\right) \\approx A(1 + 2\\alpha\\Delta T)", explanation: "Both side lengths expand; dropping the tiny squared term gives β = 2α." },
      { stepNumber: 2, title: "Volume of a heated cube", latex: "V' = l^3(1+\\alpha\\Delta T)^3 \\approx V(1 + 3\\alpha\\Delta T)", explanation: "Same expansion in three dimensions gives γ = 3α." },
      { stepNumber: 3, title: "Chain of relations", latex: "\\alpha : \\beta : \\gamma = 1 : 2 : 3", explanation: "One linear expansivity fixes them all — measure any one, know the rest." },
    ],
    conclusion:
      "Area expands twice as fast, volume three times as fast, as length per degree — the 1 : 2 : 3 rule, valid for isotropic solids.",
    keyTakeaways: [
      "Holes and cavities expand as if they were made of the surrounding material.",
      "Liquids have only real cubical expansion (no fixed shape); apparent expansion subtracts the vessel's.",
      "For anisotropic crystals α differs per axis: γ = α_x + α_y + α_z.",
    ],
    examTraps: [
      "❌ Applying β = 2α to liquids — liquids have no meaningful linear expansivity.",
      "❌ Forgetting the hole rule: a heated hole gets BIGGER, not smaller.",
    ],
    visualType: "tv-expansion-relations",
    specialCases: [
      { name: "Isotropic solid", condition: "α uniform", formula: "\\beta = 2\\alpha, \\; \\gamma = 3\\alpha", meaning: "The standard 1:2:3 result." },
      { name: "Anisotropic crystal", condition: "αx, αy, αz", formula: "\\gamma = \\alpha_x + \\alpha_y + \\alpha_z", meaning: "Direction-dependent expansion." },
      { name: "Water 0–4°C", condition: "Anomaly", formula: "\\gamma < 0", meaning: "Water contracts on warming to 4°C — lakes freeze from the top." },
    ],
    solvedProblems: [
      {
        id: "tf-p-exp-1",
        question: "A brass rod has α = 1.8 × 10⁻⁵ °C⁻¹. Find γ.",
        examBadge: "CEE Entrance",
        given: "α = 1.8 × 10⁻⁵",
        stepByStep: ["γ = 3α = 3 × 1.8 × 10⁻⁵."],
        finalAnswer: "\\gamma = 5.4\\times 10^{-5}\\ °C^{-1}",
        tipOrTrap: "1 : 2 : 3 — three seconds, full marks.",
      },
    ],
  },
  {
    id: "tf-phy-11-stefan-boltzmann",
    slug: "stefan-boltzmann-law",
    title: "Stefan–Boltzmann Law",
    subject: "physics",
    unit: "Rate of Heat Flow",
    unitId: "rate-of-heat-flow",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Rate of Heat Flow)",
    isExtra: false,
    statement:
      "The total energy radiated per second by a surface at absolute temperature T is P = eσAT⁴, where σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴ and e is the emissivity (e = 1 for a black body). Net exchange with surroundings at T₀ is P = eσA(T⁴ − T₀⁴).",
    coreFormula: "P = e\\sigma A T^4, \\qquad P_{net} = e\\sigma A\\left(T^4 - T_0^4\\right), \\qquad \\sigma = 5.67\\times 10^{-8}",
    concernedTerms: [
      { term: "Black body", symbol: "e = 1", units: "—", definition: "Perfect absorber/emitter of all radiation — the reference standard." },
      { term: "Emissivity", symbol: "e", units: "—", definition: "Ratio of a surface's emission to that of a black body at the same T (0 < e ≤ 1)." },
      { term: "Stefan constant", symbol: "σ", units: "W m⁻² K⁻⁴", definition: "Universal constant of thermal radiation." },
    ],
    assumptions: ["Surface radiates into open surroundings treated as a black body at T₀.", "T in KELVIN — the law is meaningless in °C."],
    proofSteps: [
      { stepNumber: 1, title: "Experimental law (Stefan)", latex: "P/A \\propto T^4", explanation: "Stefan fitted existing radiation data (1879); Boltzmann derived the fourth power thermodynamically (1884)." },
      { stepNumber: 2, title: "Emissivity generalization", latex: "P = e\\sigma A T^4, \\; 0 < e \\le 1", explanation: "Real surfaces emit a fraction e of the black-body value at every wavelength." },
      { stepNumber: 3, title: "Net radiative exchange", latex: "P_{net} = e\\sigma A T^4 - e\\sigma A T_0^4 = e\\sigma A(T^4 - T_0^4)", explanation: "Surroundings radiate back; the body's net loss is the difference — this is what a cooling object actually experiences." },
    ],
    conclusion:
      "Radiation scales with the FOURTH power of Kelvin temperature — doubling T multiplies emission by 16, which is why radiative cooling dominates for hot bodies and why the Sun's surface at 5800 K pours out energy.",
    keyTakeaways: [
      "T must be absolute: 300 K ≈ 27°C, not 300°C.",
      "Near T₀ the law linearizes into Newton's law of cooling.",
      "Wien's law λmT = 2.9 × 10⁻³ m K pairs with it to describe the spectrum's peak.",
    ],
    examTraps: [
      "❌ Using Celsius temperatures — (273+t) must appear inside the fourth power.",
      "❌ Forgetting the (T⁴ − T₀⁴) subtraction when surroundings are at room temperature.",
    ],
    visualType: "tv-stefan-boltzmann",
    specialCases: [
      { name: "Black body", condition: "e = 1", formula: "P = \\sigma A T^4", meaning: "Maximum possible emission at that temperature." },
      { name: "T ≈ T₀ (cooling coffee)", condition: "Small difference", formula: "T^4 - T_0^4 \\approx 4T_0^3\\Delta T \\;\\Rightarrow\\; P \\approx 4e\\sigma AT_0^3\\,\\Delta T", meaning: "Reduces to Newton's law of cooling — exponential decay of temperature." },
      { name: "Doubling T", condition: "Same A, e", formula: "P \\to 16P", meaning: "The fourth power in action." },
    ],
    solvedProblems: [
      {
        id: "tf-p-stb-1",
        question: "A black sphere of area 0.1 m² at 727°C radiates into a 27°C room. Find the net power.",
        examBadge: "NEB 2078",
        given: "T = 1000 K, T₀ = 300 K, A = 0.1 m², e = 1",
        stepByStep: ["P = σA(T⁴ − T₀⁴) = 5.67×10⁻⁸ × 0.1 × (10¹² − 8.1×10⁹).", "≈ 5.67×10⁻⁹ × 9.92×10¹¹ ≈ 5624 W."],
        finalAnswer: "P \\approx 5.6\\ \\text{kW}",
        tipOrTrap: "Convert to Kelvin FIRST; the 10⁸ constant then does the scaling.",
      },
    ],
  },
  {
    id: "tf-phy-11-gas-pressure",
    slug: "derivation-of-pressure-exerted-by-gas",
    title: "Derivation of the Pressure Exerted by a Gas",
    subject: "physics",
    unit: "Ideal Gas",
    unitId: "ideal-gas",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Ideal Gas)",
    isExtra: false,
    statement:
      "Gas pressure is the average rate of molecular momentum transfer per unit wall area. For N molecules of mass m in a cubical box with rms speed c: P = ⅓ Nm c²/V = ⅓ ρ c², connecting the macroscopic pressure to molecular motion.",
    coreFormula: "P = \\frac{1}{3}\\rho \\bar{c}^2 = \\frac{1}{3}\\frac{Nm\\bar{c}^2}{V}",
    concernedTerms: [
      { term: "rms speed", symbol: "c (or v_rms)", units: "m s⁻¹", definition: "Square root of the mean square molecular speed: √⟨v²⟩." },
      { term: "Momentum transfer", symbol: "2mv_x", units: "kg m s⁻¹", definition: "Elastic reversal at a wall reverses one velocity component, transferring 2mv_x per collision." },
      { term: "Mass density", symbol: "ρ = Nm/V", units: "kg m⁻³", definition: "Total molecular mass per container volume." },
    ],
    assumptions: ["Elastic molecular collisions (walls and intermolecular).", "Molecular size negligible; random isotropic velocities.", "No intermolecular forces except during collisions."],
    proofSteps: [
      { stepNumber: 1, title: "One molecule's cycle along x", latex: "\\Delta p = 2mv_x, \\quad \\Delta t = \\frac{2l}{v_x}", explanation: "Crossing the box and back covers 2l; each wall strike reverses v_x, transferring 2mv_x." },
      { stepNumber: 2, title: "Average force from one molecule", latex: "F_1 = \\frac{\\Delta p}{\\Delta t} = \\frac{mv_x^2}{l}", explanation: "Rate of momentum delivery to the wall pair equals momentum per hit over the round-trip time." },
      { stepNumber: 3, title: "Sum over all molecules, use isotropy", latex: "P = \\frac{m}{l^3}\\sum v_{ix}^2 = \\frac{Nm\\langle v_x^2\\rangle}{V} = \\frac{Nm\\langle c^2\\rangle}{3V}", explanation: "Random directions share the speed equally: ⟨v_x²⟩ = ⟨v_y²⟩ = ⟨v_z²⟩ = ⟨c²⟩/3 — the famous factor ⅓." },
    ],
    conclusion:
      "Pressure is molecular bombardment: P = ⅓ρc². Combined with PV = nRT it yields ⟨½mc²⟩ = (3/2)kT — temperature IS molecular kinetic energy.",
    keyTakeaways: [
      "c = √(3P/ρ): rms speed from measurable quantities.",
      "Halving V at constant T doubles P (Boyle's law re-derived).",
      "The derivation is the kinetic-theory template: momentum rate per collision × collision rate.",
    ],
    examTraps: [
      "❌ Using average SPEED instead of rms speed — the derivation needs ⟨v²⟩.",
      "❌ Forgetting the factor ⅓ from the three dimensions.",
    ],
    visualType: "tv-gas-pressure",
    specialCases: [
      { name: "rms speed", condition: "Ideal gas", formula: "c = \\sqrt{3RT/M}", meaning: "Lighter gas molecules move faster at the same T." },
      { name: "Isothermal compression", condition: "T fixed", formula: "P_1V_1 = P_2V_2", meaning: "Faster wall-hit rate, same hit strength." },
      { name: "Kinetic temperature", condition: "Equilibrium", formula: "\\tfrac{1}{2}m\\langle c^2\\rangle = \\tfrac{3}{2}kT", meaning: "Temperature as mean kinetic energy per molecule." },
    ],
    solvedProblems: [
      {
        id: "tf-p-gas-1",
        question: "Find the rms speed of O₂ molecules at STP (ρ = 1.43 kg m⁻³, P = 1.01×10⁵ Pa).",
        examBadge: "NEB 2077",
        given: "P = 1.01×10⁵, ρ = 1.43",
        stepByStep: ["c = √(3P/ρ) = √(3 × 1.01×10⁵/1.43).", "= √(2.12×10⁵) ≈ 460 m s⁻¹."],
        finalAnswer: "c \\approx 460\\ \\text{m s}^{-1}",
        tipOrTrap: "Same result as √(3RT/M) with M = 0.032 kg — cross-check both.",
      },
    ],
  },
];

export const THEOREM_FILL_PHYSICS_1 = P1;
