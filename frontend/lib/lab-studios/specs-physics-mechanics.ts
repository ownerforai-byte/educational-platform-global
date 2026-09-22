/**
 * Lab Studios — Physics: Mechanics, Vectors, Gravitation, Measurement.
 *
 * Each entry is a declarative model for one 3D lab, pictured in its place in
 * the syllabus. View ids: "external" is always the photoreal apparatus view
 * (the shell convention builds on it); the rest are topic views.
 */

import type { StudioSpec } from "./types";

export const PHYSICS_MECHANICS: Record<string, StudioSpec> = {
  /* ── Dynamics: Newton's second law on an inclined plane ── */
  "ph-3d-dynamics": {
    studio: "Dynamics bench — forces on a real body",
    blurb:
      "A block on a rough incline with the pulley, weight and force set out exactly as the experiment is drawn — then the same model with the forces isolated, the energy budget and the motion running.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "box", size: [9, 0.5, 5] },
        at: [0, 0, 0],
        rot: [0, 0, 0.32],
        material: "wood",
        color: 0x8b5a2b,
        views: ["external", "forces", "motion", "energy"],
        label: { text: "Rough inclined plane", sub: "θ = 18°; friction acts up the slope", at: [-2.6, 3.4, 0], color: "#c084fc" },
      },
      {
        shape: { kind: "box", size: [1.5, 1.1, 1.3] },
        at: [-2.6, 1.35, 0],
        rot: [0, 0, 0.32],
        material: "metal",
        color: 0x94a3b8,
        views: ["external", "forces", "motion", "energy"],
        label: { text: "Block", sub: "m = 2 kg; starts from rest", at: [-6.4, 3.9, 0], color: "#e2e8f0" },
      },
      {
        shape: { kind: "cylinder", r1: 0.42, h: 0.5 },
        at: [4.4, 2.6, 0],
        rot: [Math.PI / 2, 0, 0],
        material: "metal",
        color: 0xcbd5e1,
        views: ["external", "forces"],
        label: { text: "Pulley", sub: "changes the direction of the tension", at: [6.6, 4.4, 0], color: "#93c5fd" },
      },
      {
        shape: { kind: "tube", points: [[-3.4, 1.9, 0], [4.4, 2.6, 0], [4.4, -1.2, 0]], radius: 0.035 },
        material: "chitin",
        color: 0x1f2937,
        views: ["external", "forces"],
      },
      {
        shape: { kind: "box", size: [1, 0.9, 0.9] },
        at: [4.4, -1.9, 0],
        material: "metal",
        color: 0x64748b,
        views: ["external", "forces"],
        label: { text: "Suspended mass", sub: "drives the block up the slope", at: [6.9, -1.9, 0], color: "#f59e0b" },
      },
      {
        shape: { kind: "tube", points: [[-2.6, 1.9, 0], [-1.2, 1.5, 0]], radius: 0.055, endRadius: 0.02 },
        material: "emissive",
        color: 0xef4444,
        views: ["forces"],
        label: { text: "F = ma", sub: "net force along the slope", at: [-4.6, -2.2, 0], color: "#f87171" },
      },
      {
        shape: { kind: "tube", points: [[-2.6, 1.4, 0], [-3.6, 0.2, 0]], radius: 0.05, endRadius: 0.02 },
        material: "emissive",
        color: 0x22c55e,
        views: ["forces"],
        label: { text: "mg sin θ", sub: "component along the slope", at: [-1.0, -3.2, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "tube", points: [[-2.6, 1.4, 0], [-2.9, 3.0, 0]], radius: 0.05, endRadius: 0.02 },
        material: "emissive",
        color: 0x38bdf8,
        views: ["forces"],
        label: { text: "Normal reaction N", sub: "perpendicular to the surface", at: [-6.8, 0.4, 0], color: "#7dd3fc" },
      },
      {
        shape: { kind: "tube", points: [[-2.6, 1.4, 0], [-1.4, 1.9, 0]], radius: 0.045, endRadius: 0.02 },
        material: "emissive",
        color: 0xfacc15,
        views: ["forces"],
        label: { text: "Friction f = μN", sub: "opposes the relative sliding", at: [-0.6, 0.8, 0], color: "#fde047" },
      },
    ],
    views: [
      {
        id: "external",
        label: "Apparatus (real)",
        hint: "The bench as set up: incline, block, pulley, hanging mass.",
        rows: [
          { name: "Inclined plane", fn: "Sets the angle θ that fixes mg sin θ and mg cos θ.", why: "Every inclined-plane numerical starts by resolving weight along and across the slope." },
          { name: "Block", fn: "The body whose acceleration Newton's second law predicts.", why: "Its mass and starting state are the given data." },
          { name: "Pulley", fn: "Redirects the driving tension to the block.", why: "Ideal pulley = tension same on both sides; the assumption is examinable." },
          { name: "Suspended mass", fn: "Provides the driving force through its weight.", why: "Links two-body problems into a single system equation." },
        ],
      },
      {
        id: "forces",
        label: "Forces (free body)",
        hint: "Each force drawn on its own, in its true direction along the slope.",
        rows: [
          { name: "mg sin θ", fn: "Component of weight down the slope.", why: "Missing the sine/cosine pairing is the single most common lost mark." },
          { name: "Normal reaction N", fn: "Balances mg cos θ; never appears in the along-slope equation.", why: "Students wrongly add it to the driving force." },
          { name: "Friction f = μN", fn: "Opposes the motion; zero when sliding has not begun.", why: "Static versus kinetic friction is the classic trap." },
          { name: "Net force F = ma", fn: "The vector sum that the block actually responds to.", why: "The equation of motion, stated along the slope." },
        ],
      },
      {
        id: "energy",
        label: "Energy budget",
        hint: "Work done by each force — and where it goes.",
        rows: [
          { name: "Gain in KE", fn: "½mv² − ½mu² over the run.", why: "Work-energy is often quicker than force equations." },
          { name: "Work by friction", fn: "μN × distance, always removed from the system.", why: "Explains why a rough incline gives a smaller v than a smooth one." },
          { name: "Loss in PE", fn: "mg × height dropped, independent of path.", why: "The reason the slope angle cancels in energy problems." },
        ],
      },
      {
        id: "motion",
        label: "Motion (process)",
        hint: "The block running the incline with the v–t behaviour it produces.",
        shell: "ghost",
        rows: [
          { name: "Constant acceleration", fn: "a = (mg sin θ − μmg cos θ)/m — constant, so v = u + at applies.", why: "Justifies using the equations of motion at all." },
          { name: "Limiting case μ = 0", fn: "a = g sin θ, independent of mass.", why: "The standard special case in the syllabus." },
          { name: "Limiting case tan θ = μ", fn: "The block just stays put; a = 0.", why: "Angle of repose — asked as a one-marker." },
        ],
      },
    ],
    theory: {
      look: "A timber incline with a metal block resting on it, a sheave at the top and a hanging weight drawing the block upward. In the force view the same block carries four labelled arrows: weight-component down the slope, normal out of the surface, friction back up the slope, and the net force that actually accelerates it.",
      principle: "Newton's second law is applied along the slope: mg sin θ − f = ma, with f = μN and N = mg cos θ. In energy terms the fall in gravitational potential energy is shared between kinetic energy and the work done against friction, which is why a rough incline delivers a smaller final speed than a smooth one.",
      why: "Resolving weight correctly, keeping the normal reaction out of the along-slope equation, deciding between static and kinetic friction, and naming the angle of repose are the exact marks this model walks through.",
    },
  },

  /* ── Simple pendulum ── */
  "ph-3d-pendulum": {
    studio: "Pendulum — one bob, four ways to read it",
    blurb: "A real bob on an inextensible string: the physical rig, the force resolution at the extreme, the energy exchange across a swing, and the SHM that results.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "box", size: [6, 0.4, 3] },
        at: [0, 5.2, 0],
        material: "wood",
        color: 0x6b4423,
        views: ["external", "forces", "energy", "shm"],
        label: { text: "Rigid support", sub: "pivot assumed frictionless", at: [-4.2, 6.6, 0], color: "#c084fc" },
      },
      {
        shape: { kind: "tube", points: [[0, 5.1, 0], [0, 0.6, 0]], radius: 0.028 },
        material: "chitin",
        color: 0xe5e7eb,
        views: ["external", "forces", "energy", "shm"],
        label: { text: "Inextensible thread", sub: "length L fixed — only θ varies", at: [3.0, 3.0, 0], color: "#e2e8f0" },
      },
      {
        shape: { kind: "sphere", r: 0.56 },
        at: [0, 0.1, 0],
        material: "metal",
        color: 0xb87333,
        views: ["external", "forces", "energy", "shm"],
        label: { text: "Bob", sub: "treated as a point mass m", at: [-3.8, 1.4, 0], color: "#f59e0b" },
      },
      {
        shape: { kind: "torus", r: 2.6, tube: 0.02, arc: Math.PI / 1.6 },
        at: [0, 5.1, 0],
        material: "emissive",
        color: 0x38bdf8,
        views: ["energy", "shm"],
        label: { text: "Arc of swing", sub: "amplitude small ⇒ SHM is valid", at: [4.4, 4.4, 0], color: "#7dd3fc" },
      },
      {
        shape: { kind: "tube", points: [[0, 0.1, 0], [0, -1.9, 0]], radius: 0.05, endRadius: 0.02 },
        material: "emissive",
        color: 0x22c55e,
        views: ["forces"],
        label: { text: "W = mg", sub: "constant, always vertical", at: [2.6, -2.6, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "tube", points: [[0, 0.1, 0], [1.6, 2.4, 0]], radius: 0.05, endRadius: 0.02 },
        material: "emissive",
        color: 0x38bdf8,
        views: ["forces"],
        label: { text: "Tension T", sub: "along the string, never a restoring force", at: [4.2, 2.2, 0], color: "#7dd3fc" },
      },
      {
        shape: { kind: "tube", points: [[0, 0.1, 0], [-1.9, -0.5, 0]], radius: 0.05, endRadius: 0.02 },
        material: "emissive",
        color: 0xef4444,
        views: ["forces"],
        label: { text: "Restoring force mg sin θ", sub: "opposes displacement — the SHM driver", at: [-4.6, -2.2, 0], color: "#f87171" },
      },
    ],
    views: [
      {
        id: "external",
        label: "Pendulum (real)",
        hint: "Bob, string and support exactly as in the lab sketch.",
        rows: [
          { name: "Rigid support", fn: "Provides the fixed pivot the motion is measured from.", why: "The derivation assumes a frictionless, rigid support." },
          { name: "Inextensible thread", fn: "Fixes L so the bob moves on a circular arc.", why: "If L could change, the SHM derivation collapses." },
          { name: "Bob", fn: "Provides the mass whose weight supplies the restoring force.", why: "Its mass cancels out of the period — a favourite trick question." },
        ],
      },
      {
        id: "forces",
        label: "Forces at the extreme",
        hint: "Weight resolved into tension direction and tangent direction.",
        shell: "ghost",
        rows: [
          { name: "W = mg", fn: "Resolved into mg cos θ along the string and mg sin θ along the tangent.", why: "The resolution is the first line of every pendulum derivation." },
          { name: "Tension T", fn: "Balances mg cos θ and supplies the centripetal force.", why: "T is never the restoring force — a standard conceptual question." },
          { name: "Restoring force", fn: "F = −mg sin θ ≈ −mgθ for small θ.", why: "The small-angle step is what makes the motion simple harmonic." },
        ],
      },
      {
        id: "energy",
        label: "Energy exchange",
        hint: "PE at the extreme versus KE at the mean position.",
        rows: [
          { name: "PE at extreme", fn: "mgh with h = L(1 − cos θ₀).", why: "The geometry h = L(1 − cos θ) is where most marks are lost." },
          { name: "KE at mean", fn: "Maximum; all the energy is kinetic here.", why: "Gives v_max = ωA directly." },
          { name: "Total energy", fn: "Constant, so the swing never decays in the ideal model.", why: "Real damping is why the measured period drifts." },
        ],
      },
      {
        id: "shm",
        label: "SHM quantities",
        hint: "What the small-angle approximation buys you.",
        shell: "ghost",
        rows: [
          { name: "T = 2π√(L/g)", fn: "Period depends only on length and g.", why: "Independent of mass and (for small θ) of amplitude — asked constantly." },
          { name: "Second pendulum", fn: "T = 2 s ⇒ L ≈ 0.994 m.", why: "The standard apparatus question." },
          { name: "Large amplitude", fn: "T grows above 2π√(L/g) as θ₀ increases.", why: "Explains why measured periods run long." },
        ],
      },
    ],
    theory: {
      look: "A brass bob hanging on a fine thread from a wooden clamp, with the arc of its swing traced in cyan. In the force view the bob carries three labelled vectors: its weight resolved along and across the string, the tension, and the tangential restoring force that points back toward the lowest point.",
      principle: "For a swing of angle θ the weight resolves into mg cos θ along the string and mg sin θ along the tangent. The tangential component is the restoring force, and for small θ, sin θ ≈ θ, giving a = −(g/L)x — the condition for simple harmonic motion. Energy passes between gravitational potential at the extremes and kinetic at the mean position, with the total constant.",
      why: "The h = L(1 − cos θ) step, the independence of period from mass, the construction of the second pendulum, and the reason a large amplitude lengthens the period are all recurring examination points.",
    },
  },

  /* ── Vector addition ── */
  "ph-3d-vectors": {
    studio: "Vector addition — the same sum, three laws",
    blurb: "Two real vectors on the bench, then the triangle law, the parallelogram law and the resolved components — identical result, three constructions the paper can ask for.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "plane", w: 16, h: 16 },
        at: [0, -0.02, 0],
        rot: [-Math.PI / 2, 0, 0],
        material: "stone",
        color: 0x1e293b,
        views: ["external"],
      },
      {
        shape: { kind: "tube", points: [[-5, 0.05, -3], [0, 0.05, -3]], radius: 0.075 },
        material: "emissive",
        color: 0x3b82f6,
        views: ["external", "triangle", "parallelogram"],
        label: { text: "a⃗", sub: "first vector, magnitude 5", at: [0, 2.2, -3], color: "#60a5fa" },
      },
      {
        shape: { kind: "tube", points: [[0, 0.05, -3], [2, 0.05, 1]], radius: 0.075 },
        material: "emissive",
        color: 0xef4444,
        views: ["external", "triangle", "parallelogram"],
        label: { text: "b⃗", sub: "second vector, magnitude 4.5", at: [3.6, 2.2, 1.6], color: "#f87171" },
      },
      {
        shape: { kind: "tube", points: [[-5, 0.05, -3], [2, 0.05, 1]], radius: 0.085 },
        material: "emissive",
        color: 0x22c55e,
        views: ["external", "triangle", "parallelogram"],
        label: { text: "a⃗ + b⃗", sub: "the resultant, drawn head to tail", at: [-4.6, 3.4, 3.4], color: "#4ade80" },
      },
      {
        shape: { kind: "tube", points: [[0, 0.05, -3], [2, 0.05, 1]], radius: 0.05 },
        material: "emissive",
        color: 0xf59e0b,
        views: ["parallelogram"],
      },
      {
        shape: { kind: "tube", points: [[-5, 0.05, -3], [-3, 0.05, 1]], radius: 0.05 },
        material: "emissive",
        color: 0xf59e0b,
        views: ["parallelogram"],
        label: { text: "Parallel sides", sub: "a parallelogram is completed, diagonal = sum", at: [-6.6, 2.6, 2.2], color: "#fbbf24" },
      },
      {
        shape: { kind: "tube", points: [[-5, 0.05, -3], [2, 0.05, -3]], radius: 0.04 },
        material: "emissive",
        color: 0x22d3ee,
        views: ["components"],
        label: { text: "b cos θ", sub: "component of b along a", at: [-1.4, 1.8, -3.4], color: "#67e8f9" },
      },
      {
        shape: { kind: "tube", points: [[2, 0.05, -3], [2, 0.05, 1]], radius: 0.04 },
        material: "emissive",
        color: 0xa855f7,
        views: ["components"],
        label: { text: "b sin θ", sub: "component of b across a", at: [3.4, 1.8, -1.4], color: "#c084fc" },
      },
    ],
    views: [
      {
        id: "external",
        label: "The two vectors (real)",
        hint: "a⃗ and b⃗ laid on the bench, resultant in green.",
        rows: [
          { name: "a⃗", fn: "First vector with its own magnitude and direction.", why: "Direction is as important as magnitude — a vector is not a scalar." },
          { name: "b⃗", fn: "Second vector, drawn from the head of a⃗ in the triangle view.", why: "Order never changes the sum — vector addition commutes." },
          { name: "a⃗ + b⃗", fn: "Resultant of the two.", why: "The single vector with the same effect as both together." },
        ],
      },
      {
        id: "triangle",
        label: "Triangle law",
        hint: "Head of the first vector joins the tail of the second.",
        rows: [
          { name: "Triangle law", fn: "If two vectors are represented by two sides of a triangle taken in order, the third side taken in reverse gives the resultant.", why: "The statement itself is asked word for word." },
          { name: "Commutative", fn: "a⃗ + b⃗ = b⃗ + a⃗ — the triangle can start with either.", why: "Order-of-addition question." },
        ],
      },
      {
        id: "parallelogram",
        label: "Parallelogram law",
        hint: "Both vectors from a common tail; the diagonal is the sum.",
        rows: [
          { name: "Parallelogram law", fn: "The diagonal through the common origin represents the resultant.", why: "Preferred whenever the two vectors act at a point — the usual physical case." },
          { name: "Resultant magnitude", fn: "R = √(a² + b² + 2ab cos θ).", why: "The formula with the plus sign is the one students drop." },
        ],
      },
      {
        id: "components",
        label: "Resolved components",
        hint: "b split into a part along a⃗ and a part across it.",
        rows: [
          { name: "Component along", fn: "b cos θ contributes fully to the sum's length.", why: "Only the along-component grows the resultant." },
          { name: "Component across", fn: "b sin θ contributes only to the direction.", why: "Explains why the resultant turns away from a⃗." },
          { name: "Special cases", fn: "θ = 0° ⇒ R = a + b; θ = 90° ⇒ R = √(a²+b²); θ = 180° ⇒ R = |a − b|.", why: "The three limiting answers the board likes to ask." },
        ],
      },
    ],
    theory: {
      look: "Two coloured vectors on a bench, blue and red, meeting head-to-tail with the green resultant closing the triangle. Switching to the parallelogram view completes the figure; the component view drops perpendiculars from b⃗ onto a⃗ and across it.",
      principle: "Vectors carry magnitude and direction and add by the triangle or parallelogram law. The parallelogram diagonal gives R = √(a² + b² + 2ab cos θ), and resolving b⃗ into b cos θ along a⃗ and b sin θ across it shows why only the along-part lengthens the resultant.",
      why: "The law statements, the sign inside the resultant formula, and the three limiting cases (same direction, perpendicular, opposite) are the direct examination targets.",
    },
  },

  /* ── Gravitation ── */
  "ph-3d-gravitation": {
    studio: "Gravitation — field, orbit and escape",
    blurb: "A planet with a satellite: the real system, the inverse-square field around it, the orbital mechanics, and the escape condition at the surface.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "sphere", r: 2.6, noise: 0.02, seed: 3 },
        at: [0, 0, 0],
        material: "wetSkin",
        color: 0x2b6cb0,
        views: ["external", "field", "orbit", "escape"],
        label: { text: "Planet", sub: "mass M, radius R", at: [-5.6, 3.6, 0], color: "#60a5fa" },
      },
      {
        shape: { kind: "sphere", r: 0.42 },
        at: [7, 1.4, 0],
        material: "metal",
        color: 0xcbd5e1,
        views: ["external", "field", "orbit", "escape"],
        label: { text: "Satellite", sub: "mass m in circular orbit", at: [9.4, 3.4, 0], color: "#e2e8f0" },
      },
      {
        shape: { kind: "torus", r: 7.05, tube: 0.018 },
        at: [0, 1.4, 0],
        rot: [Math.PI / 2, 0, 0],
        material: "emissive",
        color: 0x38bdf8,
        views: ["orbit"],
        label: { text: "Orbit of radius r", sub: "centripetal force = gravitational force", at: [1.6, 5.6, 0], color: "#7dd3fc" },
      },
      {
        shape: { kind: "tube", points: [[0, 0, 0], [6.6, 1.4, 0]], radius: 0.04 },
        material: "emissive",
        color: 0xf59e0b,
        views: ["field"],
        label: { text: "F = GMm/r²", sub: "inverse-square attraction", at: [2.4, -3.4, 0], color: "#fbbf24" },
      },
      {
        shape: { kind: "sphere", r: 0.22 },
        at: [4, 0, 0],
        material: "emissive",
        color: 0x22c55e,
        views: ["field"],
        repeat: { ring: 14, radius: 4, tilt: 1 },
      },
      {
        shape: { kind: "tube", points: [[2.8, 3.4, 0], [4.4, 6.0, 0]], radius: 0.09, endRadius: 0.03 },
        material: "emissive",
        color: 0xef4444,
        views: ["escape"],
        label: { text: "v_escape = √(2GM/R)", sub: "minimum speed to leave for ever", at: [5.6, 6.4, 0], color: "#f87171" },
      },
    ],
    views: [
      {
        id: "external",
        label: "System (real)",
        hint: "Planet with its satellite — the physical set-up.",
        rows: [
          { name: "Planet", fn: "Source of the gravitational field; mass M sets g at every point.", why: "All gravitational results are written in terms of M and R." },
          { name: "Satellite", fn: "Orbits under gravity alone — no engine, no thrust.", why: "A satellite is in continuous free fall; the misconception is that something holds it up." },
        ],
      },
      {
        id: "field",
        label: "Field lines",
        hint: "Attraction falling off as the inverse square of distance.",
        rows: [
          { name: "Inverse-square law", fn: "F = GMm/r² — doubling r quarters the force.", why: "The exponent and the r measured from centres are both asked." },
          { name: "Field strength g", fn: "g = GM/r² outside the planet, independent of m.", why: "The test mass cancels — a standard conceptual point." },
          { name: "Inside the planet", fn: "g falls linearly to zero at the centre.", why: "The linear-inside law is a common graph question." },
        ],
      },
      {
        id: "orbit",
        label: "Orbital motion",
        hint: "The single force that is also the centripetal requirement.",
        rows: [
          { name: "Orbital speed", fn: "v = √(GM/r) — independent of the satellite's mass.", why: "Two satellites of different mass need the same launch speed." },
          { name: "Period", fn: "T² ∝ r³ (Kepler's third law).", why: "The proportionality is how the law is marked." },
          { name: "Geostationary orbit", fn: "T = 24 h and equatorial ⇒ r ≈ 42 000 km.", why: "The one number students are expected to quote." },
        ],
      },
      {
        id: "escape",
        label: "Escape",
        hint: "Energy condition at the surface.",
        rows: [
          { name: "Escape velocity", fn: "√(2GM/R) = √(2gR) — independent of the mass launched.", why: "Mass-independence is the most-missed property." },
          { name: "Escape energy", fn: "KE = GMm/R exactly cancels the binding energy.", why: "Shows escape as an energy argument, not a force one." },
          { name: "Escape from Earth", fn: "≈ 11.2 km/s.", why: "The standard quoted value." },
        ],
      },
    ],
    theory: {
      look: "A blue planet with a small satellite in a traced orbit, then the same pair threaded by field lines that crowd near the surface and thin outward, and finally a red launch vector leaving the surface.",
      principle: "Two point masses attract with F = GMm/r², so the field strength g = GM/r² is independent of the test mass. For a circular orbit that same force supplies the centripetal requirement, giving v = √(GM/r) and Kepler's T² ∝ r³. Escape follows from energy: the launch kinetic energy must equal the binding energy, so v_escape = √(2GM/R), again independent of the mass launched.",
      why: "The inverse-square statement, the cancellation of the test mass, Kepler's third law, the geostationary condition, and mass-independent escape velocity are the exact points this model separates.",
    },
  },
};
