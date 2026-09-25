/**
 * Graph Bank — detail layer, Mathematics 2 (trig, conics, special).
 */

import type { GraphDetailInfo } from "@/lib/graphs";

export const DETAIL_MATH_2: Record<string, GraphDetailInfo> = {
  "math-sine": {
    gives: [
      "y = sin x: smooth oscillation between −1 and 1 with period 2π.",
      "Amplitude, period and phase read from y = A sin(Bx + C) transforms.",
      "Slope = cos x — the derivative story visible as horizontal tangents at the peaks.",
    ],
    applies: [
      "Waves, sound, AC circuits, tides, SHM projections.",
      "Fourier's idea: every periodic signal is a sum of sines.",
      "Modelling anything that repeats: seasons, heartbeats, orbits (roughly).",
    ],
    happens: [
      "Drag through zero-crossing: steepest climb — velocity (slope) is maximum at mean position.",
      "Drag to the crest: tangent flattens — momentarily no change, like SHM's turning point.",
      "Stretch B in your head: the wave compresses; period shortens, amplitude unchanged.",
    ],
    limits: [
      "Perfectly periodic and unbounded in time — real oscillations damp out.",
      "Bounded output only (±A); it can't model growth.",
    ],
  },
  "math-cosine": {
    gives: [
      "y = cos x: the sine wave shifted left by π/2 — starts at maximum.",
      "Phase relationship made visual: cos x = sin(x + π/2).",
      "Slope = −sin x: descending through zero-crossings, ascending nowhere.",
    ],
    applies: [
      "Circular motion projection starting from the x-axis.",
      "AC voltage/current phase discussions (cos φ power factor).",
      "Any oscillation specified by its initial maximum rather than zero.",
    ],
    happens: [
      "Drag from x = 0: the curve starts at the top — the wave's 'identity' is its starting phase.",
      "Drag to π: trough — mirror of the start; half a period flips sign.",
      "Compare with sine side-by-side: same everything, quarter-period head start.",
    ],
    limits: [
      "Same boundedness as sine — no growth, no decay.",
      "Zero-crossings at odd multiples of π/2 — domain care for division-based uses.",
    ],
  },
  "math-tangent": {
    gives: [
      "y = tan x: repeating branches with vertical asymptotes at π/2 + kπ.",
      "Period π — half of sine's — because the pattern repeats every half-turn.",
      "Slope ≥ 1 everywhere on each branch: tangent only gets steeper.",
    ],
    applies: [
      "Angle-of-elevation problems where opposite/adjacent ratios blow up near 90°.",
      "Slope-angle and gradient computations in surveying.",
      "Calculus: the classic example of a derivative existing but the function exploding.",
    ],
    happens: [
      "Drag toward π/2 from the left: y climbs to +∞ — the asymptote in action.",
      "Cross the asymptote: y restarts from −∞ on the next branch — the discontinuity jump.",
      "Drag through zero: slope is exactly 1 — the gentlest tangent gets.",
    ],
    limits: [
      "Undefined at π/2 + kπ — every such line must be drawn dashed.",
      "Unbounded both ways; useless for bounded quantities.",
    ],
  },
  "math-cotangent": {
    gives: [
      "y = cot x: falling branches with vertical asymptotes at x = nπ.",
      "Zeros exactly at π/2 + nπ — the mirror of tan's zero set.",
      "Slope ≤ −1 on every branch: cot only gets steeper as it falls.",
    ],
    applies: [
      "Complementary-angle identities: cot x = tan(π/2 − x) — one curve is the other reflected.",
      "Navigation and surveying where the adjacent/opposite ratio is the natural measure.",
      "Calculus: d/dx(cot x) = −cosec²x — a derivative that never changes sign.",
    ],
    happens: [
      "Drag just right of 0: y plunges from +∞ — sin x is tiny and positive, so cos/sin is huge.",
      "Drag through π/2: the branch crosses zero exactly there — the gentlest slope (−1) cot ever has.",
      "Approach π from the left: y dives to −∞; cross and the next branch restarts from +∞.",
    ],
    limits: [
      "Undefined at every multiple of π — the dashed asymptote lines are part of the graph.",
      "Unbounded like tan; useless for quantities that must stay within a band.",
    ],
  },
  "math-secant": {
    gives: [
      "y = sec x: U-cups whose arms are the cosine wave turned inside-out.",
      "Range (−∞, −1] ∪ [1, ∞) — the band between −1 and 1 is forbidden territory.",
      "Slope sign flips only at extrema of cosine — the cups' minima/maxima sit exactly there.",
    ],
    applies: [
      "Optics and trig substitution in calculus: ∫sec x dx = ln|sec x + tan x| + C.",
      "Amplitude-tier reasoning in AC circuits where impedance ratios exceed 1.",
      "The classic 'which values are impossible?' exam trap — the graph answers instantly.",
    ],
    happens: [
      "Drag through x = 0: y = 1 — the cup's bottom, cosine at its own maximum.",
      "Drag toward π/2: y rockets to +∞ as cosine shrinks — the asymptote wall.",
      "Cross π/2: reappear at −∞ below the axis, the inverted cup hugging y = −1 around cosine's trough.",
    ],
    limits: [
      "Undefined at π/2 + nπ — every such vertical line must be drawn dashed.",
      "Nowhere between −1 and 1 — sec can never model a quantity in that band (that's cosine's job).",
    ],
  },
  "math-cosecant": {
    gives: [
      "y = cosec x: secant's twin shifted half a period right — cups around sine's crests.",
      "Asymptotes at x = nπ (sine's zeros) — where the function dies.",
      "Range (−∞, −1] ∪ [1, ∞) — same forbidden band as secant.",
    ],
    applies: [
      "Calculus: d/dx(csc x) = −csc x·cot x — the product rule's trig showpiece.",
      "Triangle work with the opposite/hypotenuse ratio inverted — rare but examinable.",
      "Reciprocal-pair identity checks: sin·csc = 1 wherever both are defined.",
    ],
    happens: [
      "Drag through π/2: y = 1 — global minimum, sitting exactly on sine's crest.",
      "Drag toward π: y dives to −∞ — sin x stays positive shrinking to 0⁺, so 1/sin x climbs without bound.",
      "Compare mentally with secant: identical cups, everything shifted π/2 right — sine vs cosine is the only difference.",
    ],
    limits: [
      "Undefined at every multiple of π.",
      "Never between −1 and 1 — same forbidden band; reciprocal graphs can't shrink.",
    ],
  },
  "math-step": {
    gives: [
      "The staircase y = ⌊x⌋: each unit interval holds one constant value.",
      "Jump discontinuities at every integer — the function's whole personality.",
      "Floor-function behaviour: inputs grouped into bins.",
    ],
    applies: [
      "Pricing tiers, postage by weight, tax brackets.",
      "Digital sampling and quantisation error pictures.",
      "Discrete mathematics: counting and greatest-integer arguments.",
    ],
    happens: [
      "Drag within one step: output frozen despite the input moving — quantisation.",
      "Cross an integer: output leaps instantly — continuity breaks.",
      "Halve the step size in your head: the staircase doubles its resolution.",
    ],
    limits: [
      "Nowhere differentiable at the jumps; constant elsewhere (derivative 0).",
      "Loses information: many inputs map to one output.",
    ],
  },
  "math-circle": {
    gives: [
      "x² + y² = r²: the perfect round locus — every point equidistant from the centre.",
      "Parametric thinking: (r cos θ, r sin θ) traces it — the graph behind trig.",
      "Vertical-line failure: one x gives two y's — a relation, not a function.",
    ],
    applies: [
      "Orbit idealisations, wheels, wavefronts from a point source.",
      "Unit-circle trigonometry — where sine/cosine are *defined*.",
      "Distance-based geometry: circle equations from Pythagoras.",
    ],
    happens: [
      "Drag around the top arc: y rises to the topmost point then falls — the gradient flips.",
      "At the far left/right the tangent turns vertical — implicit differentiation blows up (dy/dx infinite).",
      "Grow r in your head: same shape, bigger everything — pure scaling.",
    ],
    limits: [
      "Not a function (fails vertical line test) — needs ± branches or parametrisation.",
      "Perfect symmetry that real orbits (ellipses) don't have.",
    ],
  },
  "math-ellipse": {
    gives: [
      "x²/a² + y²/b² = 1: the circle stretched — semi-axes a and b visible.",
      "Eccentricity's geometry: how far from circular, from the axis ratio.",
      "Kepler's orbit shape: the sun at a focus, not the centre.",
    ],
    applies: [
      "Planetary orbits (Kepler's first law), whispering galleries, elliptical trainers.",
      "Conic-section completeness between parabola and hyperbola.",
      "Area computations via integration or the πab shortcut.",
    ],
    happens: [
      "Drag around the curve: steepest where the ellipse is narrowest (ends of the major axis).",
      "Set a = b in your head: the ellipse collapses back to a circle.",
      "Separate the foci: flatter and more eccentric — the orbit extreme.",
    ],
    limits: [
      "Also fails the vertical line test — needs parametric or branch form.",
      "Area simple; arc length famously hard (elliptic integrals).",
    ],
  },
  "math-hyperbola-conic": {
    gives: [
      "x²/a² − y²/b² = 1: two mirrored branches with slant asymptotes y = ±(b/a)x.",
      "The asymptotes themselves: the branches approach them forever.",
      "Eccentricity e > 1 — the conic signature separating it from the ellipse.",
    ],
    applies: [
      "Navigation hyperbolas (LORAN), cooling-tower profiles, comet escape trajectories.",
      "Inverse-proportion geometry after rotating axes.",
      "Relativity: Minkowski 'circles' are hyperbolas.",
    ],
    happens: [
      "Drag along a branch: the curve straightens toward the asymptote — slope approaches ±b/a.",
      "Recoiling from the vertex: the two branches never meet; the gap is the conic's identity.",
      "Steepen b/a: the asymptotes open like scissors; the branch hugs them differently.",
    ],
    limits: [
      "Two-branch structure makes single-formula modelling awkward.",
      "Asymptote values are limits — evaluations 'at' infinity must be phrased carefully.",
    ],
  },
  "math-inverse-trig": {
    gives: [
      "y = arcsin x: defined only on [−1, 1], values in [−π/2, π/2] — the principal branch.",
      "Domain/range discipline: inverse trig is where restrictions become visible curves.",
      "Slopes: arcsin gets vertical near ±1; arctan flattens toward ±π/2 asymptotes.",
    ],
    applies: [
      "Recovering angles from ratios in every triangle problem.",
      "Calculus: ∫dx/√(1−x²) = arcsin x — the graph is the antiderivative's shape.",
      "arctan in signal processing (phase) and the arctan growth curve.",
    ],
    happens: [
      "Drag toward x = 1 on arcsin: the curve turns vertical — infinite slope at the domain edge.",
      "Drag along arctan: the climb relaxes to the π/2 asymptote — bounded output from unbounded input.",
      "Reflect sine/cosine/tangent mentally across y = x: these are their tame, restricted mirrors.",
    ],
    limits: [
      "Principal branches hide the periodicity — arcsin(sin x) ≠ x outside the branch.",
      "Domains are the closed interval (or all reals for arctan) — respect them or break the function.",
    ],
  },
};
