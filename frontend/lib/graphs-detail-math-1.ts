/**
 * Graph Bank — detail layer, Mathematics 1 (core functions).
 */

import type { GraphDetailInfo } from "@/lib/graphs";

export const DETAIL_MATH_1: Record<string, GraphDetailInfo> = {
  "math-constant": {
    gives: [
      "A horizontal line y = c: the output never changes, whatever the input.",
      "Zero slope everywhere — the rate of change is identically zero.",
      "A baseline picture: constancy itself, the reference other curves deviate from.",
    ],
    applies: [
      "Modelling fixed quantities: a parked car's displacement, a fixed fee, a held temperature.",
      "Calculus warm-up: the simplest derivative (0) and integral (cx) in one image.",
      "Piecewise functions' flat segments and equilibrium lines in physics.",
    ],
    happens: [
      "Drag along the line: y never budges; the point slides sideways with zero rise.",
      "The tangent at every point IS the line — nothing to localise.",
      "Vary c in your head: the line lifts or drops but stays perfectly flat.",
    ],
    limits: [
      "No information about cause or time — it's a snapshot of a frozen quantity.",
      "One-to-many trap: as a relation it's fine, but 'y = c' solved for x is meaningless (every x works).",
    ],
  },
  "math-linear": {
    gives: [
      "A straight line y = mx + c: slope m and intercept c read in one glance.",
      "Constant rate of change — the steepness never varies.",
      "Root of the equation where the line crosses the x-axis (x = −c/m).",
    ],
    applies: [
      "Uniform motion, pricing with fixed fees, Ohm's law V = IR, Hooke's law.",
      "Linear approximation of any smooth function locally (tangents everywhere).",
      "Coordinate geometry's building block: two points determine everything.",
    ],
    happens: [
      "Drag along the line: equal x-steps give equal y-steps — proportionality you can feel.",
      "Vary m in your head: the line pivots about the intercept; steeper m, faster rise.",
      "Vary c: the line slides up/down without changing its angle.",
    ],
    limits: [
      "Perfect proportionality only — real systems bend eventually.",
      "Vertical lines have undefined slope (x = k isn't a function of x at all).",
    ],
  },
  "math-quadratic": {
    gives: [
      "The parabola y = ax² + bx + c: vertex, axis of symmetry, and roots in one shape.",
      "Discriminant geometry: two roots = axis crosses, one root = vertex touches, none = floats clear.",
      "Minimum or maximum value directly at the vertex (a > 0 min, a < 0 max).",
    ],
    applies: [
      "Projectile paths, bridge cables (inverted), profit-maximising output, antenna dish cross-sections.",
      "Completing the square visualised: shift the vertex form y = a(x−h)² + k.",
      "Optimisation problems where area/perimeter trade-offs peak.",
    ],
    happens: [
      "Drag to the vertex: the tangent goes flat — the turning point where slope changes sign.",
      "Drag outward: the curve steepens symmetrically — equal steps from the vertex, equal heights.",
      "Flip a's sign: the whole bowl inverts from valley to dome.",
    ],
    limits: [
      "Always symmetric — asymmetric real data needs higher terms.",
      "Grows without bound; real quadratic models saturate or fail at extremes.",
    ],
  },
  "math-cubic": {
    gives: [
      "The S-bend y = ax³: one inflection where curvature flips sign.",
      "Up to three real roots (or one) depending on the vertical shift.",
      "A preview of derivative structure: slope is a parabola (always ≥ 0 here).",
    ],
    applies: [
      "Volume scaling (V ∝ r³), drag forces, cubic bezier segments in design.",
      "Modelling growth-then-saturation-then-change regimes in one function.",
      "Introducing inflection points before calculus formalises them.",
    ],
    happens: [
      "Drag through the centre: the curve eases flat exactly at the inflection — slope is momentarily at its smallest.",
      "Drag outward: steepness grows without limit in both directions — no plateau ever.",
      "Shift vertically in your head: one root becomes three (a local max and min appear).",
    ],
    limits: [
      "Monotone for y = x³; adding quadratic/linear terms is needed for wiggles.",
      "Rarely a good physical model far from the fit range (runaway growth).",
    ],
  },
  "math-modulus": {
    gives: [
      "The V-shape y = |x|: distance-from-zero made visible.",
      "A sharp corner at the origin — slope jumps from −1 to +1 with no tangent in between.",
      "Even symmetry: f(−x) = f(x), the left mirrors the right.",
    ],
    applies: [
      "Absolute-error and distance calculations (|x − a| distances).",
      "Piecewise-defined functions and the cost of the corner for calculus.",
      "Signal rectification in electronics (|V| waveforms).",
    ],
    happens: [
      "Drag across the corner: slope is −1 on the left, +1 on the right — no derivative at x = 0.",
      "Shift the vertex: the V slides; the slopes never change, only the hinge does.",
      "Compose with a vertical stretch: the V narrows — steeper arms, same hinge.",
    ],
    limits: [
      "Non-differentiable at the corner — optimisation methods stumble there.",
      "Always non-negative output; signed quantities need signed functions.",
    ],
  },
  "math-sqrt": {
    gives: [
      "The root curve y = √x: fast early growth that decelerates forever.",
      "Domain discipline: defined only for x ≥ 0 — the graph stops at the origin.",
      "The inverse of y = x² (restricted) mirrored across y = x.",
    ],
    applies: [
      "Free-fall distance vs time's second half intuition (t ∝ √d), pendulum periods (T ∝ √L).",
      "Diminishing-returns modelling: effort vs benefit with a steep early phase.",
      "Standard-deviation scaling and root-mean-square reasoning.",
    ],
    happens: [
      "Drag near zero: the curve climbs almost vertically — huge relative gains early.",
      "Drag right: the climb flattens — doubling the input gives only ~1.41× the output.",
      "Approach x = 0 from the right: the tangent turns vertical (infinite slope) — a soft cliff.",
    ],
    limits: [
      "No negative domain (until complex numbers).",
      "Always concave — can't model accelerating processes.",
    ],
  },
  "math-reciprocal": {
    gives: [
      "The hyperbola y = 1/x: two branches, asymptotes on both axes.",
      "Inverse proportionality made visual: double x, halve y.",
      "No intercepts and no crossing of the axes — the asymptotes are never touched.",
    ],
    applies: [
      "Boyle's law (p ∝ 1/V), intensity vs distance, gear ratios, shared-work problems.",
      "Rates and densities: anything 'per unit' with a fixed total.",
      "Rational-function analysis: every y = k/x discussion starts here.",
    ],
    happens: [
      "Drag near zero from the right: y rockets to infinity — the vertical asymptote in action.",
      "Drag right: y hugs the x-axis — the horizontal asymptote, approached but never reached.",
      "Cross to negative x: the second branch mirrors through the origin (odd symmetry).",
    ],
    limits: [
      "x = 0 is excluded — the function doesn't exist there; graphs must show the gap.",
      "Sign flips across the asymptote — careless algebra crosses branches wrongly.",
    ],
  },
  "math-exponential": {
    gives: [
      "y = aˣ (a > 1): slow start, then explosive climb — compound growth's face.",
      "Horizontal asymptote y = 0 on the left; no vertical asymptote; range strictly positive.",
      "Slope proportional to value — the bigger it is, the faster it grows.",
    ],
    applies: [
      "Compound interest, population growth, radioactive decay (0 < a < 1 flips it), RC charging.",
      "Doubling-time reasoning: equal time steps multiply by the same factor.",
      "The base for eˣ — the function that is its own derivative.",
    ],
    happens: [
      "Drag early: the climb looks tame — the deception of every exponential.",
      "Drag later: each equal x-step now lifts more than the whole past rise combined.",
      "Flip to 0 < a < 1: the mirror-image decay — halving every fixed interval.",
    ],
    limits: [
      "Never zero, never negative — can't model quantities that hit floors or signs.",
      "Unbounded growth is physically impossible; every real exponential ends.",
    ],
  },
  "math-logarithm": {
    gives: [
      "y = log x: defined only for x > 0, climbing through (1, 0), flattening forever.",
      "The inverse of the exponential, mirrored across y = x.",
      "Slope 1/x — steep at first, gentle later: early differences matter, later ones don't.",
    ],
    applies: [
      "pH, Richter magnitude, decibels — compressing huge ranges into small numbers.",
      "Algorithm complexity (binary search: log n steps).",
      "Log-linear plots turning exponentials into straight lines.",
    ],
    happens: [
      "Drag toward zero from the right: y plunges to −∞ — the vertical asymptote at x = 0.",
      "Drag right: growth continues but ever more lazily — ten times the input adds the same small step.",
      "Compare with √x: both flatten, but the log flattens far harder.",
    ],
    limits: [
      "Domain x > 0 only — logs of zero or negatives don't exist (real numbers).",
      "Units of the base matter: ln vs log₁₀ rescale the axis, not the story.",
    ],
  },
};
