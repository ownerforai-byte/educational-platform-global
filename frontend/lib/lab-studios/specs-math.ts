/**
 * Lab Studios — Mathematics: 3D geometry, surfaces, Fourier, decay and
 * the syllabus/theory suites.
 */

import type { StudioSpec } from "./types";

export const MATHEMATICS: Record<string, StudioSpec> = {
  /* ── 3D geometry ── */
  "math-3d-geometry": {
    studio: "3D geometry — points, lines and planes",
    blurb: "The coordinate frame made real: two skew lines that never meet, a plane cutting the axes at its intercepts, and the distance formula that runs through all of it.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "tube", points: [[-5, 0, 0], [5, 0, 0]], radius: 0.05 },
        material: "emissive",
        color: 0xef4444,
        views: ["external", "skew"],
        label: { text: "x-axis", sub: "the frame everything is measured in", at: [4.2, 1.6, 0], color: "#f87171" },
      },
      {
        shape: { kind: "tube", points: [[0, -4, 0], [0, 4, 0]], radius: 0.05 },
        material: "emissive",
        color: 0x22c55e,
        views: ["external", "skew"],
        label: { text: "y-axis", sub: "ordered triple (x, y, z) fixes a point", at: [-2.6, 4.2, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "tube", points: [[0, 0, -4], [0, 0, 4]], radius: 0.05 },
        material: "emissive",
        color: 0x3b82f6,
        views: ["external", "skew"],
        label: { text: "z-axis", sub: "3D adds this third direction", at: [2.6, -2.4, 3.2], color: "#60a5fa" },
      },
      {
        shape: { kind: "plane", w: 6, h: 5 },
        at: [2.4, 2.0, 0],
        material: "glass",
        color: 0x8b5cf6,
        opacity: 0.3,
        views: ["external", "plane"],
        label: { text: "Plane ax + by + cz = d", sub: "normal vector (a, b, c) sets its tilt", at: [2.4, 5.2, 0], color: "#c084fc" },
      },
      {
        shape: { kind: "sphere", r: 0.18 },
        at: [0, 0, 0],
        material: "emissive",
        color: 0xfacc15,
        views: ["external", "skew"],
        label: { text: "Origin (0, 0, 0)", sub: "the reference point", at: [-2.6, -1.8, 0], color: "#fde047" },
      },
      {
        shape: { kind: "tube", points: [[-4.5, 0.8, -1.5], [-2.5, 0.3, -0.5], [-0.5, -0.8, 0.5], [1.5, -1.2, 1.5]], radius: 0.07 },
        material: "emissive",
        color: 0xf97316,
        views: ["skew"],
        label: { text: "Line 1", sub: "r = a + λb — a point plus a direction", at: [-3.4, 2.8, -1.5], color: "#fb923c" },
      },
      {
        shape: { kind: "tube", points: [[-1.0, -2.4, -2.0], [0.5, -1.0, -0.8], [2.0, 0.2, 0.4], [3.5, 1.4, 1.6]], radius: 0.07 },
        material: "emissive",
        color: 0x22d3ee,
        views: ["skew"],
        label: { text: "Line 2 — skew", sub: "not parallel, yet never meeting: 3D's new idea", at: [3.0, 3.0, 1.6], color: "#67e8f9" },
      },
      {
        shape: { kind: "tube", points: [[2.4, 2.0, 0], [2.4, -0.4, 0]], radius: 0.04 },
        material: "emissive",
        color: 0xfacc15,
        views: ["plane"],
        label: { text: "Perpendicular distance", sub: "d = |ax₁+by₁+cz₁−d| / √(a²+b²+c²)", at: [-1.4, 1.2, 0], color: "#fde047" },
      },
    ],
    views: [
      {
        id: "external",
        label: "Coordinate frame",
        hint: "Axes, origin and a plane.",
        rows: [
          { name: "Ordered triple", fn: "Every point is exactly (x, y, z).", why: "The foundation of every distance and angle question." },
          { name: "Octants", fn: "Eight regions, first octant has all positive coordinates.", why: "Sign work depends on knowing the octant." },
          { name: "Distance formula", fn: "√((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²).", why: "Extends the 2D version — asked directly." },
        ],
      },
      {
        id: "skew",
        label: "Lines in space",
        hint: "Parallel, intersecting — or skew.",
        shell: "ghost",
        rows: [
          { name: "Skew lines", fn: "Non-parallel lines that never meet.", why: "The genuinely 3D case that has no 2D counterpart." },
          { name: "Vector form", fn: "r = a + λb for each line.", why: "Direction vector b is what gets compared." },
          { name: "Shortest distance", fn: "d = |(a₂−a₁)·(b₁×b₂)| / |b₁×b₂|.", why: "The cross-product formula is the standard numerical." },
        ],
      },
      {
        id: "plane",
        label: "Planes",
        hint: "Normal vectors and distances.",
        shell: "ghost",
        rows: [
          { name: "Normal vector", fn: "(a, b, c) is perpendicular to the plane ax + by + cz = d.", why: "The angle between planes is the angle between normals." },
          { name: "Intercepts", fn: "Set two variables to zero to find where the plane cuts each axis.", why: "The fastest sketching method." },
          { name: "Point-plane distance", fn: "Substitute the point into the plane equation, divided by the normal's length.", why: "A one-line formula that is examined repeatedly." },
        ],
      },
    ],
    theory: {
      look: "Three glowing coordinate axes in red, green and blue meeting at a yellow origin, a translucent violet plane tilted above them, and in a second view an orange and a cyan line passing each other without touching.",
      principle: "Points in space are ordered triples measured along three perpendicular axes. A line is written in vector form r = a + λb — a fixed point plus a variable multiple of a direction vector; two lines may be parallel, intersecting or skew (neither parallel nor meeting, a purely 3D possibility). A plane ax + by + cz = d has normal vector (a, b, c), and the distance from a point to it is the absolute substituted value divided by the normal's magnitude.",
      why: "The distance formula, the vector equation of a line, skew lines and their shortest distance, and the normal-vector geometry of planes are the recurring marks.",
    },
  },

  /* ── Surfaces ── */
  "math-3d-surfaces": {
    studio: "Quadric surfaces — the standard shapes",
    blurb: "Sphere, cylinder, cone and saddle generated by rotating and curving real geometry, each tied to its equation.",
    defaultView: "sphere",
    parts: [
      {
        shape: { kind: "sphere", r: 2.0, noise: 0.015 },
        at: [0, 0, 0],
        material: "glass",
        color: 0x38bdf8,
        opacity: 0.55,
        views: ["sphere"],
        label: { text: "Sphere x² + y² + z² = r²", sub: "every point at distance r from the centre", at: [-4.2, 3.4, 0], color: "#7dd3fc" },
      },
      {
        shape: { kind: "cylinder", r1: 1.5, h: 5.0 },
        at: [0, 0, 0],
        material: "glass",
        color: 0x22c55e,
        opacity: 0.5,
        views: ["cylinder"],
        label: { text: "Cylinder x² + y² = r²", sub: "one variable missing — the shape repeats along that axis", at: [-4.2, 3.4, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "cone", r: 2.0, h: 4.4 },
        at: [0, 0, 0],
        material: "metal",
        color: 0xf59e0b,
        views: ["cone"],
        label: { text: "Cone z² = x² + y²", sub: "double cone meeting at the apex", at: [-4.2, 3.8, 0], color: "#fbbf24" },
      },
      {
        shape: { kind: "sphere", r: 1.8, scale: [1, 0.45, 1], noise: 0.015 },
        at: [0, 0, 0],
        material: "metal",
        color: 0xf472b6,
        views: ["saddle"],
        label: { text: "Ellipsoid z² = x²/a² + y²/b²", sub: "stretched sphere — axes scaled by a and b", at: [-4.6, 3.0, 0], color: "#f9a8d4" },
      },
      {
        shape: { kind: "plane", w: 5.5, h: 2.6 },
        at: [0, 2.2, 0],
        rot: [-0.5, 0, 0],
        material: "glass",
        color: 0xa855f7,
        opacity: 0.35,
        views: ["sections"],
        label: { text: "Slicing plane", sub: "cross-sections tell you the surface", at: [0, 4.6, 0], color: "#c084fc" },
      },
      {
        shape: { kind: "torus", r: 1.4, tube: 0.05 },
        at: [0, 0.6, 0],
        rot: [Math.PI / 2, 0, 0],
        material: "emissive",
        color: 0xfacc15,
        views: ["sections"],
        label: { text: "Horizontal section = circle", sub: "trace z = constant in the equation", at: [2.8, 1.8, 0], color: "#fde047" },
      },
    ],
    views: [
      {
        id: "sphere",
        label: "Sphere",
        hint: "The set of points equidistant from a centre.",
        rows: [
          { name: "Equation", fn: "(x−a)² + (y−b)² + (z−c)² = r².", why: "Reading the centre and radius off an equation is asked." },
          { name: "Generating circle", fn: "Rotate a circle about its diameter.", why: "Links 2D curves to their 3D solids." },
        ],
      },
      {
        id: "cylinder",
        label: "Cylinder",
        hint: "A curve repeated along a missing axis.",
        shell: "ghost",
        rows: [
          { name: "Missing variable", fn: "An equation in x and y only describes a cylinder along z.", why: "The identification rule for exam equations." },
          { name: "Right circular", fn: "x² + y² = r² gives the standard circular cylinder.", why: "Volume and surface area follow." },
        ],
      },
      {
        id: "cone",
        label: "Cone",
        hint: "Straight lines through a common apex.",
        shell: "ghost",
        rows: [
          { name: "Equation", fn: "z² = x² + y² (homogeneous — every term same degree).", why: "Homogeneity identifies cones instantly." },
          { name: "Sections", fn: "Plane cuts give circle, ellipse, parabola, hyperbola.", why: "The conic-section connection is the standard extension." },
        ],
      },
      {
        id: "saddle",
        label: "Ellipsoid & quadrics",
        hint: "Scaling a sphere along its axes.",
        shell: "ghost",
        rows: [
          { name: "Ellipsoid", fn: "x²/a² + y²/b² + z²/c² = 1 — semi-axes a, b, c.", why: "Read the axes straight off the denominators." },
          { name: "Sections", fn: "Plane z = k cuts an ellipse shrinking toward the pole.", why: "The tracing method used for every quadric." },
        ],
      },
      {
        id: "sections",
        label: "Sections",
        hint: "Reading a surface from its cross-sections.",
        shell: "ghost",
        rows: [
          { name: "Tracing", fn: "Fix one variable and plot the resulting 2D curve.", why: "The universal technique for sketching quadrics." },
          { name: "Symmetry", fn: "Only even powers means mirror symmetry about the planes.", why: "A quick check before detailed plotting." },
        ],
      },
    ],
    theory: {
      look: "Four glassy and metallic surfaces in one frame — a blue sphere, a green cylinder, an amber double cone and a pink flattened ellipsoid — with a violet slicing plane and a yellow circular section ring.",
      principle: "Quadric surfaces are the 3D analogues of conic sections. A sphere is the locus of points at a fixed distance from its centre; a cylinder arises when the equation is missing a variable and the curve repeats along that axis; a cone is a homogeneous equation whose straight generators pass through the apex; an ellipsoid scales the sphere by different semi-axes. Every quadric is identified and sketched by slicing: fix one variable and read the 2D curve that remains.",
      why: "Reading centre/radius/axes from equations, the missing-variable rule for cylinders, homogeneity for cones, and the slicing technique are the standard marks.",
    },
  },

  /* ── Fourier ── */
  "math-3d-fourier": {
    studio: "Fourier series — building any wave from sines",
    blurb: "A square wave assembled from pure sine harmonics: the fundamental, the overtones that sharpen the corners, and the ring-shaped spectrum of their amplitudes.",
    defaultView: "sum",
    parts: [
      {
        shape: { kind: "tube", points: [[-6, 0, 0], [-4, 0.8, 0], [-2, 0, 0], [0, -0.8, 0], [2, 0, 0], [4, 0.8, 0], [6, 0, 0]], radius: 0.05 },
        material: "emissive",
        color: 0x38bdf8,
        views: ["sum", "harmonics"],
        motion: { kind: "wave", amplitude: 0.3, speed: 1.4 },
        label: { text: "Fundamental: sin x", sub: "the slowest pure tone — one hump per period", at: [-4.4, 3.0, 0], color: "#7dd3fc" },
      },
      {
        shape: { kind: "tube", points: [[-6, 0, 0], [-5.3, 0.7, 0], [-4.6, 0, 0], [-3.9, -0.7, 0], [-3.2, 0, 0], [-2.5, 0.7, 0], [-1.8, 0, 0], [-1.1, -0.7, 0], [-0.4, 0, 0], [0.3, 0.7, 0], [1.0, 0, 0], [1.7, -0.7, 0], [2.4, 0, 0], [3.1, 0.7, 0], [3.8, 0, 0], [4.5, -0.7, 0], [5.2, 0, 0], [5.9, 0.7, 0]], radius: 0.04 },
        material: "emissive",
        color: 0x22c55e,
        views: ["harmonics"],
        motion: { kind: "wave", amplitude: 0.25, speed: 2.8 },
        label: { text: "3rd harmonic: sin 3x / 3", sub: "odd multiples only for a square wave", at: [0.6, 3.0, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "tube", points: [[-6, -1.1, 0], [-5.7, -1.6, 0], [-5.4, -1.1, 0], [-5.1, -0.6, 0], [-4.8, -1.1, 0], [-4.5, -1.6, 0], [-4.2, -1.1, 0], [-3.9, -0.6, 0], [-3.6, -1.1, 0], [-3.3, -1.6, 0], [-3.0, -1.1, 0], [-2.7, -0.6, 0], [-2.4, -1.1, 0], [-2.1, -1.6, 0], [-1.8, -1.1, 0], [-1.5, -0.6, 0], [-1.2, -1.1, 0], [-0.9, -1.6, 0], [-0.6, -1.1, 0], [-0.3, -0.6, 0], [0, -1.1, 0], [0.3, -1.6, 0], [0.6, -1.1, 0], [0.9, -0.6, 0], [1.2, -1.1, 0], [1.5, -1.6, 0], [1.8, -1.1, 0], [2.1, -0.6, 0], [2.4, -1.1, 0], [2.7, -1.6, 0], [3.0, -1.1, 0], [3.3, -0.6, 0], [3.6, -1.1, 0], [3.9, -1.6, 0], [4.2, -1.1, 0], [4.5, -0.6, 0], [4.8, -1.1, 0], [5.1, -1.6, 0], [5.4, -1.1, 0], [5.7, -0.6, 0]], radius: 0.035 },
        material: "emissive",
        color: 0xf59e0b,
        views: ["harmonics"],
        motion: { kind: "wave", amplitude: 0.2, speed: 4.2 },
        label: { text: "5th, 7th, 9th…", sub: "each term shrinks — amplitudes fall as 1/n", at: [0.6, -3.2, 0], color: "#fbbf24" },
      },
      {
        shape: { kind: "torus", r: 1.6, tube: 0.06 },
        at: [0, 2.6, 0],
        rot: [Math.PI / 2, 0, 0],
        material: "emissive",
        color: 0xa855f7,
        views: ["spectrum"],
        repeat: { ring: 1, radius: 1.6 },
        label: { text: "Spectrum (n vs amplitude)", sub: "spikes at odd n only, heights ∝ 1/n", at: [-3.6, 4.6, 0], color: "#c084fc" },
      },
      {
        shape: { kind: "plane", w: 12, h: 0.3 },
        at: [0, -2.0, 0],
        material: "metal",
        color: 0x475569,
        views: ["sum", "harmonics", "spectrum"],
        label: { text: "Adding them up → the square wave", sub: "infinite series, exact reconstruction", at: [-0.4, -3.8, 0], color: "#94a3b8" },
      },
    ],
    views: [
      {
        id: "sum",
        label: "The idea",
        hint: "Any periodic wave is a sum of sines.",
        rows: [
          { name: "Fourier series", fn: "f(x) = a₀/2 + Σ(aₙ cos nx + bₙ sin nx).", why: "Stating the form with its coefficients is the opening mark." },
          { name: "Periodic functions", fn: "Works for any repeating f, even one with corners.", why: "The surprise that corners are buildable from smooth curves." },
          { name: "Convergence", fn: "More terms = sharper corners, never quite exact at a jump.", why: "Gibbs phenomenon is the extension." },
        ],
      },
      {
        id: "harmonics",
        label: "Harmonics",
        hint: "Which terms actually appear.",
        shell: "ghost",
        rows: [
          { name: "Odd symmetry", fn: "An odd function uses only sine terms (bₙ).", why: "Symmetry inspection halves the work — always asked." },
          { name: "Square wave", fn: "Only odd harmonics, amplitude falling as 1/n.", why: "The classic worked series f(x) = 4/π Σ sin(2n−1)x/(2n−1)." },
          { name: "Coefficients", fn: "aₙ and bₙ from integrals over one period.", why: "The orthogonality of sines makes them independent." },
        ],
      },
      {
        id: "spectrum",
        label: "Spectrum",
        hint: "The series as a bar chart.",
        shell: "ghost",
        rows: [
          { name: "Frequency content", fn: "Each spike is one harmonic's amplitude.", why: "The bridge to signal processing." },
          { name: "Odd-only spikes", fn: "For the square wave, even harmonics vanish.", why: "Reading the symmetry off the spectrum." },
          { name: "Applications", fn: "Sound timbre, image compression, solving PDEs.", why: "One named application earns the final mark." },
        ],
      },
    ],
    theory: {
      look: "A blue single-hump fundamental, a green faster third harmonic, a thin amber buzz of higher harmonics, a violet ring standing for the spectrum's spikes, all over a grey baseline that carries their square-wave sum.",
      principle: "Fourier's theorem states that any periodic function is expressible as a sum of sines and cosines whose frequencies are multiples of the fundamental. Symmetry decides the terms: odd functions carry only sines. The square wave, the canonical example, is built from odd harmonics with amplitudes falling as 1/n — 4/π (sin x + sin 3x/3 + sin 5x/5 + …). Each added term sharpens the corners, and the amplitudes plotted against harmonic number form the spectrum.",
      why: "The general form, the symmetry rule, the square-wave series with its 1/n amplitudes, and one real application are the exact marks.",
    },
  },

  /* ── Decay ── */
  "math-3d-decay": {
    studio: "Exponential growth & decay — the eˣ family",
    blurb: "Real curves of eˣ, e⁻ˣ and logistic growth: doubling time against half-life, and why the derivative of eˣ is itself.",
    defaultView: "curves",
    parts: [
      {
        shape: { kind: "tube", points: [[-4, -2.6, 0], [-2, -2.0, 0], [0, -1.2, 0], [2, 0.6, 0], [4, 2.8, 0]], radius: 0.07 },
        material: "emissive",
        color: 0x22c55e,
        views: ["curves"],
        label: { text: "eˣ — exponential growth", sub: "slope always equals its own height", at: [-3.0, 3.6, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "tube", points: [[-4, 2.8, 0], [-2, 0.6, 0], [0, -1.2, 0], [2, -2.0, 0], [4, -2.5, 0]], radius: 0.07 },
        material: "emissive",
        color: 0xef4444,
        views: ["curves"],
        label: { text: "e⁻ˣ — exponential decay", sub: "falls by the same fraction each step", at: [3.4, 3.4, 0], color: "#f87171" },
      },
      {
        shape: { kind: "tube", points: [[-4, -2.4, 0], [-2, -1.6, 0], [0, 0, 0], [2, 1.6, 0], [4, 2.4, 0]], radius: 0.05 },
        material: "emissive",
        color: 0x3b82f6,
        views: ["curves"],
        label: { text: "log x — the inverse", sub: "undoes what eˣ does", at: [-2.4, -3.6, 0], color: "#60a5fa" },
      },
      {
        shape: { kind: "sphere", r: 0.16 },
        at: [0, 0, 0],
        material: "emissive",
        color: 0xfacc15,
        views: ["curves"],
        label: { text: "(0, 1) — where eˣ crosses", sub: "e⁰ = 1: the anchor point", at: [2.2, 0.8, 0], color: "#fde047" },
      },
      {
        shape: { kind: "tube", points: [[-4, -2.2, 0], [-2.6, -1.6, 0], [-1.6, -0.8, 0], [-1.0, 0.2, 0], [-0.7, 1.4, 0], [-0.55, 2.2, 0]], radius: 0.07 },
        material: "emissive",
        color: 0xa855f7,
        views: ["logistic"],
        label: { text: "Logistic curve", sub: "early growth, then limited by the ceiling", at: [-3.8, 3.4, 0], color: "#c084fc" },
      },
      {
        shape: { kind: "plane", w: 9, h: 0.3 },
        at: [0, 2.6, 0],
        material: "metal",
        color: 0x475569,
        views: ["logistic"],
        label: { text: "Carrying capacity L", sub: "the level the curve approaches but never crosses", at: [2.0, 3.6, 0], color: "#94a3b8" },
      },
      {
        shape: { kind: "plane", w: 12, h: 8 },
        at: [0, -3.4, -1.5],
        rot: [-Math.PI / 2, 0, 0],
        material: "stone",
        color: 0x1e293b,
        views: ["curves", "logistic"],
        label: { text: "dy/dx = ky", sub: "proportional growth — the differential equation behind it all", at: [-3.6, -2.6, -1.5], color: "#a3e635" },
      },
    ],
    views: [
      {
        id: "curves",
        label: "The curves",
        hint: "Growth, decay and their inverse.",
        rows: [
          { name: "eˣ", fn: "Its derivative equals itself — the defining property.", why: "Why it appears everywhere change is proportional to amount." },
          { name: "Growth & decay", fn: "A = A₀e^(kt) with k > 0 growth, k < 0 decay.", why: "The general model every applied question reduces to." },
          { name: "Inverse pair", fn: "ln x undoes eˣ; their graphs mirror in y = x.", why: "Solving exponential equations uses this pair." },
        ],
      },
      {
        id: "logistic",
        label: "Limited growth",
        hint: "The realistic curve for populations.",
        shell: "ghost",
        rows: [
          { name: "Logistic", fn: "Growth slows as the quantity approaches its limit L.", why: "The standard correction to pure exponential growth." },
          { name: "Doubling / half-life", fn: "t = ln2/k in both directions.", why: "The same constant, two names — a favourite question." },
          { name: "Modelling", fn: "Newton's cooling, RC circuits, populations.", why: "One real model named in the answer." },
        ],
      },
    ],
    theory: {
      look: "A green rising curve and its red falling mirror image crossing at a yellow point, a blue log curve rising slowly through the origin, and a violet logistic S-curve flattening against a grey ceiling.",
      principle: "The exponential family models any process whose rate is proportional to its current amount: y′ = ky gives y = A₀e^(kt), growth when k is positive and decay when negative. eˣ is unique in being its own derivative, which is why it anchors the family, while its inverse ln x solves the resulting equations. When growth is limited by a ceiling, the logistic curve replaces pure exponential growth, and the characteristic times are the doubling time and half-life, both ln2/k.",
      why: "The defining derivative, the A₀e^(kt) model, the inverse relationship, half-life and doubling time, and one applied model are the standard marks.",
    },
  },
};
