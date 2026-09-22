/**
 * Lab Studios — Physics C: modern physics suite and the four syllabus
 * symbol/simulation suites.
 */

import type { StudioSpec } from "./types";

export const PHYSICS_C: Record<string, StudioSpec> = {
  /* ── Modern physics suite ── */
  "ph-3d-modern-suite": {
    studio: "Modern physics — nucleus, radiation and spectra",
    blurb: "A real nucleus losing an alpha particle, a gamma ray passing through matter, and the hydrogen spectrum lines that reveal the energy levels.",
    defaultView: "radioactive",
    parts: [
      {
        shape: { kind: "sphere", r: 0.9, noise: 0.12 },
        at: [0, 0, 0],
        material: "organ",
        color: 0xdc2626,
        views: ["radioactive", "decay"],
        label: { text: "Unstable nucleus", sub: "too much mass or charge for stability", at: [-3.4, 3.0, 0], color: "#f87171" },
      },
      {
        shape: { kind: "sphere", r: 0.3, noise: 0.08 },
        at: [2.6, 1.0, 0],
        material: "organ",
        color: 0xf97316,
        views: ["radioactive"],
        label: { text: "α particle (He nucleus)", sub: "2 protons + 2 neutrons — heavy, slow, very ionising", at: [4.4, 2.6, 0], color: "#fb923c" },
      },
      {
        shape: { kind: "sphere", r: 0.14 },
        at: [2.2, -1.4, 0],
        material: "emissive",
        color: 0x38bdf8,
        views: ["radioactive"],
        label: { text: "β particle (electron)", sub: "fast, less ionising, more penetrating", at: [4.2, -2.4, 0], color: "#7dd3fc" },
      },
      {
        shape: { kind: "tube", points: [[1.0, 0.2, 0], [4.6, 0.2, 0]], radius: 0.03 },
        material: "emissive",
        color: 0xa855f7,
        views: ["radioactive"],
        repeat: { count: 3, spread: [0, 0.8, 0] },
        label: { text: "γ ray", sub: "no mass, no charge — highest penetration", at: [0.6, -3.2, 0], color: "#c084fc" },
      },
      {
        shape: { kind: "plane", w: 3, h: 4 },
        at: [6.0, 0, 0],
        material: "metal",
        color: 0x475569,
        views: ["radioactive"],
        label: { text: "Absorbers", sub: "paper stops α; aluminium stops β; lead slows γ", at: [6.0, 3.6, 0], color: "#94a3b8" },
      },
      {
        shape: { kind: "sphere", r: 0.7, noise: 0.12 },
        at: [-2.2, 0, 0],
        material: "organ",
        color: 0x7f1d1d,
        views: ["decay"],
        label: { text: "Daughter nucleus", sub: "N = N₀ e^(−λt) — decay is statistical", at: [-4.6, -3.0, 0], color: "#fca5a5" },
      },
      {
        shape: { kind: "plane", w: 8, h: 4 },
        at: [2.0, -2.8, 0],
        material: "emissive",
        color: 0x22c55e,
        views: ["spectrum"],
        label: { text: "Emission lines", sub: "each line is one transition between levels", at: [2.0, 0.6, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "torus", r: 1.0, tube: 0.04 },
        at: [2.0, 0.2, 0],
        rot: [Math.PI / 2, 0, 0],
        material: "emissive",
        color: 0xef4444,
        repeat: { count: 5, spread: [0, 0.4, 0] },
        views: ["spectrum"],
        label: { text: "hf = E₂ − E₁", sub: "Lyman UV, Balmer visible, Paschen IR", at: [-2.4, 3.4, 0], color: "#f87171" },
      },
    ],
    views: [
      {
        id: "radioactive",
        label: "Radioactivity",
        hint: "The three emissions leaving a nucleus.",
        rows: [
          { name: "α decay", fn: "Mass number −4, atomic number −2.", why: "Balancing the nuclear equation is the first mark." },
          { name: "β decay", fn: "Mass number unchanged, atomic number +1 (β⁻).", why: "A neutron becomes a proton plus an electron." },
          { name: "γ emission", fn: "Neither number changes; excess energy is shed.", why: "Follows α or β decay, never alone." },
          { name: "Penetrating power", fn: "α stopped by paper, β by aluminium, γ reduced by lead.", why: "The standard comparison table." },
        ],
      },
      {
        id: "decay",
        label: "Decay law",
        hint: "Half the sample gone every half-life.",
        shell: "ghost",
        rows: [
          { name: "Decay law", fn: "N = N₀e^(−λt).", why: "The exponential form and its log version are both used." },
          { name: "Half-life", fn: "T½ = 0.693/λ.", why: "The conversion between λ and T½ is asked numerically." },
          { name: "Activity", fn: "A = λN, in becquerel.", why: "Activity falls with the same half-life." },
        ],
      },
      {
        id: "spectrum",
        label: "Hydrogen spectrum",
        hint: "Discrete lines from discrete levels.",
        shell: "ghost",
        rows: [
          { name: "Line series", fn: "Transitions ending at n=1 (Lyman), n=2 (Balmer), n=3 (Paschen).", why: "Which series lies in which region is asked." },
          { name: "Photon energy", fn: "hf = 13.6(1/n₁² − 1/n₂²) eV.", why: "The Rydberg form is the working numerical." },
          { name: "Discreteness", fn: "Lines, not a continuum — evidence for quantised levels.", why: "The conceptual point the spectrum proves." },
        ],
      },
    ],
    theory: {
      look: "A red lumpy nucleus shedding an orange α particle, a blue β electron and violet γ rays toward grey absorber plates; a smaller daughter nucleus left behind; and a green emission-line strip with red transition rings above it.",
      principle: "An unstable nucleus reaches stability by emitting an α particle (A−4, Z−2), a β particle (A same, Z+1) or γ rays (no change of A or Z), with penetration increasing in the order α < β < γ. Decay is statistical: N = N₀e^(−λt) with half-life T½ = 0.693/λ and activity A = λN. The hydrogen spectrum's discrete lines are photons of energy hf = 13.6(1/n₁² − 1/n₂²) eV, one per downward transition — Lyman in the ultraviolet, Balmer in the visible, Paschen in the infrared.",
      why: "Nuclear-equation balancing, the penetration comparison, the decay law with half-life conversions, and the series/region mapping are the standard marks.",
    },
  },

  /* ── Symbol & simulation suites ── */
  "ph-symbols-mechanics": {
    studio: "Symbols studio — mechanics formulae in place",
    blurb: "Every core mechanics symbol attached to the object it belongs to: v and a on the moving body, F and μ at the surface, p in the collision.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "box", size: [2.2, 1.2, 1.2] },
        at: [0, 0.6, 0],
        material: "metal",
        color: 0x64748b,
        motion: { kind: "flow", from: [-4, 0.6, 0], to: [4, 0.6, 0], speed: 0.4, count: 2 },
        views: ["external", "symbols"],
        label: { text: "Block: m, v, a, F", sub: "p = mv · F = ma · W = F·d", at: [0, 3.4, 0], color: "#94a3b8" },
      },
      {
        shape: { kind: "plane", w: 12, h: 5 },
        at: [0, -0.6, 0],
        rot: [-Math.PI / 2, 0, 0],
        material: "stone",
        color: 0x1e293b,
        views: ["external", "symbols"],
        label: { text: "Surface: μ, N, f", sub: "f = μN opposes motion", at: [-4.6, -3.2, 0], color: "#475569" },
      },
      {
        shape: { kind: "sphere", r: 0.45 },
        at: [4.4, 0.6, 0],
        material: "organ",
        color: 0xef4444,
        views: ["symbols"],
        label: { text: "Falling body: g, h, t", sub: "v = u + gt · s = ut + ½gt²", at: [6.0, 3.0, 0], color: "#f87171" },
      },
      {
        shape: { kind: "plane", w: 4, h: 2 },
        at: [-4.6, 2.6, 0],
        material: "emissive",
        color: 0x22c55e,
        views: ["symbols"],
        label: { text: "Energy ledger: KE = ½mv² · PE = mgh", sub: "conservation ties the two together", at: [-4.6, 4.6, 0], color: "#4ade80" },
      },
    ],
    views: [
      {
        id: "external",
        label: "The set-up",
        hint: "One block, one surface, one motion.",
        rows: [
          { name: "Choosing symbols", fn: "Every symbol belongs to one object and one instant.", why: "Mixed-up notation is the root of most numerical mistakes." },
          { name: "Sign convention", fn: "Fix a positive direction before writing equations.", why: "Signs carry the physics in every equation." },
        ],
      },
      {
        id: "symbols",
        label: "Formula map",
        hint: "Which symbol enters which equation.",
        shell: "ghost",
        rows: [
          { name: "Kinematics", fn: "v = u + at, s = ut + ½at², v² = u² + 2as.", why: "Pick by what is unknown, not by habit." },
          { name: "Dynamics", fn: "F = ma, f = μN, p = mv, impulse = FΔt = Δp.", why: "Impulse–momentum is the standard derivation route." },
          { name: "Energy", fn: "KE = ½mv², PE = mgh, W = Fd cos θ.", why: "The cos θ factor decides work's sign." },
        ],
      },
    ],
    theory: {
      look: "A grey block sliding on a dark surface, a red falling sphere beyond it, and a green energy panel — each labelled with the exact symbols that live there.",
      principle: "Mechanics numericals are solved by assigning every symbol to one object at one instant, fixing a sign convention, and choosing the equation that contains the unknown: kinematics for motion without cause, Newton's second law with friction for causes, and the energy ledger (KE = ½mv² against PE = mgh) when only endpoints matter.",
      why: "Symbol hygiene, sign conventions, and choosing between the kinematic, dynamic and energy routes are what the marks actually reward.",
    },
  },
};
