/**
 * Graph Bank — comparison layer for multi-condition graphs (Physics).
 *
 * For every graph whose series are alternative CONDITIONS (uniform vs
 * accelerated, isothermal vs adiabatic…): what each condition means on its
 * own, the visible differences between them, and how to identify which curve
 * is which at a glance. Merged into lib/graphs.ts → getGraphDetail().compare
 */

import type { GraphCompareNote } from "@/lib/graphs";

export const COMPARE_PHYSICS: Record<string, GraphCompareNote> = {
  "phy-displacement-time": {
    series: [
      { label: "at rest", meaning: "Horizontal line — position never changes, however long time runs. Slope (velocity) is exactly zero." },
      { label: "uniform velocity", meaning: "Straight tilted line — equal distances in equal times. Slope is constant and nonzero." },
      { label: "accelerated", meaning: "Upward-bending curve — each equal time step covers MORE distance than the last. Slope keeps growing." },
    ],
    differences: [
      "The three slopes tell the whole story: zero (rest) vs constant (uniform) vs increasing (accelerated).",
      "Equal time intervals: rest covers nothing, uniform covers equal steps, accelerated covers ever-bigger steps.",
      "A curved s–t graph does NOT mean a curved path — all three curves are straight-line motion.",
    ],
    identify: [
      "Flat line → at rest. Straight tilt → uniform velocity. Bending upward → accelerated.",
      "A peak or dip means the body turned around — only the accelerated curve can do that here.",
    ],
  },
  "phy-velocity-time": {
    series: [
      { label: "uniform acceleration", meaning: "Tilted straight line — slope = acceleration a, constant throughout. Starts at u and climbs (or falls) steadily." },
      { label: "uniform velocity", meaning: "Horizontal line — slope = zero. The body holds the same speed forever; acceleration is zero." },
    ],
    differences: [
      "Area under EITHER line gives displacement — but the tilted line traps a triangle (extra ½at²) that the flat one doesn't.",
      "Only the tilted line has nonzero slope: it is the only one accelerating.",
      "Same starting u: after any time t, the accelerated body is faster by exactly a·t.",
    ],
    identify: [
      "Horizontal = zero acceleration (uniform velocity). Tilted = uniform acceleration.",
      "Steeper tilt → larger a. Line falling below the t-axis → the body has reversed direction.",
    ],
  },
  "phy-shm-graphs": {
    series: [
      { label: "x", meaning: "Displacement sinusoid — the body's position oscillating between +A and −A." },
      { label: "v", meaning: "Velocity sinusoid — the SAME period, shifted a quarter-period ahead of displacement." },
    ],
    differences: [
      "Velocity is maximum exactly where displacement is zero (fastest through the centre).",
      "Displacement is maximum exactly where velocity is zero (momentarily at rest at the extremes).",
      "Same amplitude story, different quantity: x peaks at ±A, v peaks at ±Aω.",
    ],
    identify: [
      "The v-curve crosses zero where the x-curve peaks — a clean quarter-period (π/2) shift.",
      "Energy check: where x is extreme, kinetic energy (v) is zero — potential is max. Where x = 0, v is max.",
    ],
  },
  "phy-isothermal-adiabatic": {
    series: [
      { label: "isothermal", meaning: "Gentler hyperbola (pV = constant) — temperature pinned, heat flows in/out to keep it there." },
      { label: "adiabatic (γ > 1)", meaning: "Steeper curve (pV^γ = constant) — no heat exchange; the gas pays for expansion from its own internal energy." },
    ],
    differences: [
      "Through any common point the adiabat is ALWAYS steeper than the isotherm — that geometry is the exam favourite.",
      "Same volume change: the isotherm encloses more area → more work extracted at constant temperature.",
      "Adiabatic expansion ends COOLER; isothermal ends at the same temperature it started.",
    ],
    identify: [
      "At the crossing region, the steeper curve is the adiabat, the flatter one the isotherm.",
      "Reason it out: γ > 1 makes p fall faster on the adiabat as V grows.",
    ],
  },
  "phy-isobaric-isochoric": {
    series: [
      { label: "isobaric (p const)", meaning: "Horizontal line — pressure fixed while volume changes. Work = p·ΔV is the rectangle under it." },
      { label: "isochoric (V const)", meaning: "Vertical line — volume locked, pressure changes. Zero work by construction: no area is trapped." },
    ],
    differences: [
      "The isobar encloses area (work done); the isochore encloses none (piston never moves).",
      "Heat added isochorically goes ENTIRELY into internal energy; isobarically some leaves as work.",
      "A cycle's net work = the area between its isobars and isochores — how engine loops are read.",
    ],
    identify: [
      "Horizontal segment = constant pressure. Vertical segment = constant volume.",
      "Any vertical line on a p–V diagram does zero work — instantly readable.",
    ],
  },
  "phy-g-variation": {
    series: [
      { label: "upward (height)", meaning: "Outside the Earth: g falls as 1/r² — curved, gradual, never quite zero." },
      { label: "downward (depth)", meaning: "Inside a uniform Earth: g falls LINEARLY with depth, reaching exactly zero at the centre." },
    ],
    differences: [
      "The two branches meet at the surface — the single maximum of the whole graph.",
      "Outside is an inverse-square curve; inside is a straight line — different physics (shell theorem).",
      "Only the downward branch reaches zero (weightless at the centre); the upward branch never does.",
    ],
    identify: [
      "The peak sits at r = R (surface). Left of it = inside (straight fall). Right = outside (curved fall).",
      "Double the height → ¼ of surface g; but half the depth → exactly ½ of surface g.",
    ],
  },
  "phy-vi-ohmic-nonohmic": {
    series: [
      { label: "ohmic (metal at const T)", meaning: "Straight line through the origin — resistance R = V/I is the same at every point." },
      { label: "non-ohmic (filament/diode)", meaning: "Curved characteristic — resistance changes with voltage (heating filament flattens it; a diode wakes at its knee)." },
    ],
    differences: [
      "Doubling V doubles I only for the ohmic line — the test of ohmic behaviour.",
      "The filament curve flattens because heat raises R; the diode curve explodes after the knee voltage.",
      "Only the straight line through the ORIGIN qualifies — a straight line with an offset is still non-ohmic.",
    ],
    identify: [
      "Perfectly straight and through (0,0) → ohmic. Any bend or threshold → non-ohmic.",
      "Local slope of a curved characteristic gives the dynamic resistance at that point.",
    ],
  },
  "phy-resistivity-temperature": {
    series: [
      { label: "metal", meaning: "Rising, near-linear line — hotter lattice scatters electrons more, resistivity climbs." },
      { label: "semiconductor", meaning: "Steeply FALLING curve — heat frees far more charge carriers than the extra scattering can spoil." },
    ],
    differences: [
      "Opposite slopes on one graph: the whole conductor-vs-semiconductor distinction in one look.",
      "Metals: conduction worsens with heat. Semiconductors: conduction improves dramatically — the thermistor effect.",
      "Semiconductors can change resistivity by orders of magnitude; metals only slightly.",
    ],
    identify: [
      "Line going UP with T → metallic behaviour. Curve diving DOWN → semiconductor.",
      "Steepness of the fall ≈ sensitivity — a steeper semiconductor makes a better thermometer.",
    ],
  },
  "phy-capacitor-charging": {
    series: [
      { label: "charging", meaning: "Rises from empty toward full charge: q = Q₀(1 − e^(−t/RC)) — fast start, asymptotic finish." },
      { label: "discharging", meaning: "Falls from full toward empty: q = Q₀·e^(−t/RC) — the mirror image of charging." },
    ],
    differences: [
      "Both curves are governed by the SAME time constant τ = RC — both hit 63%/37% marks at the same tick marks.",
      "Charging current flows one way and dies to zero; discharging current reverses direction and dies the same way.",
      "Neither curve ever truly 'finishes' — both approach their limits asymptotically.",
    ],
    identify: [
      "Curve climbing toward Q₀ → charging. Curve decaying toward zero → discharging.",
      "Read τ on either: the value has covered 63% of its remaining journey after one τ.",
    ],
  },
  "phy-lr-circuit-graph": {
    series: [
      { label: "growth", meaning: "Current builds from zero toward E/R as the inductor's back-emf fades — i = I₀(1 − e^(−Rt/L))." },
      { label: "decay", meaning: "Current collapses from maximum when the source is removed — i = I₀·e^(−Rt/L), the mirror image." },
    ],
    differences: [
      "Same time constant τ = L/R in both — bigger L means slower growth AND slower decay.",
      "Growth starts at zero (inductor blocks sudden change); decay starts at maximum (inductor keeps it flowing).",
      "During decay the collapsing field DRIVES the current — that's why switch-off sparks fly.",
    ],
    identify: [
      "Rising toward E/R → growth. Falling toward zero → decay.",
      "Read τ = L/R at 63% of the remaining journey on either curve.",
    ],
  },
  "phy-photoelectric-current-voltage": {
    series: [
      { label: "higher intensity", meaning: "Taller saturation plateau — more photons per second free more electrons per second." },
      { label: "lower intensity", meaning: "Lower plateau — fewer electrons collected, but everything else identical." },
    ],
    differences: [
      "The plateaus differ in HEIGHT — intensity sets how many electrons, hence the saturation current.",
      "The stopping potential −V₀ is IDENTICAL for both: intensity never changes electron energy, only frequency does.",
      "Double the intensity → double the plateau; move −V₀ → nothing.",
    ],
    identify: [
      "Same cut-off, different plateaus → the two curves differ only in light intensity.",
      "If instead the cut-off moved, the frequency (or metal) changed — a different experiment.",
    ],
  },
  "phy-resonance-curve": {
    series: [
      { label: "low R (sharp)", meaning: "Tall, narrow peak at ω₀ — high Q, selective: responds strongly only near resonance." },
      { label: "high R (flat)", meaning: "Low, broad hump — heavily damped: responds mildly across a wide band." },
    ],
    differences: [
      "Both peak at the SAME natural frequency ω₀ — resistance changes the shape, not the location.",
      "Bandwidth ∝ R: the broad curve accepts a wide band; the sharp one discriminates.",
      "Height trade-off: less damping → taller peak but narrower acceptance (the radio-tuning compromise).",
    ],
    identify: [
      "Tall and narrow = low R (high Q). Low and wide = high R.",
      "Half-power width Δω = ω₀/Q — read the width at 1/√2 of the peak.",
    ],
  },
};
