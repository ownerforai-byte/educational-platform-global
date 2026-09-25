/**
 * Entrance Question Bank — Mathematics.
 * Unit slugs mirror public/data/syllabus-notes/mathematics/_manifest.json.
 */

import type { EntranceUnitBank } from "./types";

export const MATHEMATICS_ENTRANCE: EntranceUnitBank[] = [
  {
    units: ["algebra"],
    questions: [
      { q: "If the roots of x² − 5x + 6 = 0 are α and β, then α² + β² equals:", options: ["13", "5", "25", "12"], answer: 0, why: "α² + β² = (α+β)² − 2αβ = 25 − 12 = 13.", exam: "CEE 2080" },
      { q: "The sum of the first n terms of the AP 2, 5, 8, … is:", options: ["n(3n + 1)/2", "3n²/2", "n(n+1)/2", "n(2n+1)"], answer: 0, why: "Sₙ = n/2[2a + (n−1)d] = n/2[4 + 3n − 3] = n(3n+1)/2.", exam: "IOE 2079" },
      { q: "The value of log₂32 + log₃(1/27) is:", options: ["2", "5", "0", "−2"], answer: 0, why: "5 + (−3) = 2 — base splits.", exam: "CEE 2079" },
      { q: "If A is a 3×3 matrix with |A| = 2, then |adj A| equals:", options: ["4", "2", "8", "1/2"], answer: 0, why: "|adj A| = |A|ⁿ⁻¹ = 2² = 4.", exam: "CEE 2081" },
      { q: "The remainder when x³ − 3x + 2 is divided by (x − 1) is:", options: ["0", "2", "−2", "1"], answer: 0, why: "Remainder theorem: p(1) = 1 − 3 + 2 = 0 — (x−1) is a factor.", exam: "IOE 2078" },
    ],
  },
  {
    units: ["trigonometry"],
    questions: [
      { q: "The value of sin 15° is:", options: ["(√6 − √2)/4", "(√6 + √2)/4", "(√3 − 1)/2", "1/2"], answer: 0, why: "sin(45° − 30°) expansion gives the (√6 − √2)/4 form.", exam: "CEE 2080" },
      { q: "If sin θ = 3/5 and θ in Q2, then tan θ equals:", options: ["−3/4", "3/4", "−4/3", "4/3"], answer: 0, why: "cos θ = −4/5 in Q2 → tan = sin/cos = −3/4.", exam: "CEE 2079" },
      { q: "The general solution of sin θ = 0 is:", options: ["θ = nπ", "θ = 2nπ", "θ = nπ/2", "θ = (2n+1)π/2"], answer: 0, why: "Sine dies at every integer multiple of π.", exam: "IOE 2079" },
      { q: "sin²θ + cos²θ equals:", options: ["1", "0", "2", "sec²θ"], answer: 0, why: "The Pythagorean identity — but watch distractors like 1 + tan² = sec².", exam: "NEB Board" },
      { q: "The maximum value of 3 sin x + 4 cos x is:", options: ["5", "7", "1", "12"], answer: 0, why: "√(3² + 4²) = 5 — the a·sin + b·cos amplitude rule.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["limits-and-continuity", "calculus"],
    questions: [
      { q: "lim(x→0) sin x / x equals:", options: ["1", "0", "∞", "Does not exist"], answer: 0, why: "The standard limit — everything in trig-limit questions hangs on it.", exam: "CEE 2080" },
      { q: "d/dx (x ln x) equals:", options: ["ln x + 1", "ln x", "1/x", "1 + 1/x"], answer: 0, why: "Product rule: 1·ln x + x·(1/x) = ln x + 1.", exam: "CEE 2079" },
      { q: "∫ 1/x dx equals:", options: ["ln|x| + C", "x²/2 + C", "−1/x² + C", "ln x² + C"], answer: 0, why: "Only the logarithm differentiates back to 1/x — absolute value required.", exam: "IOE 2079" },
      { q: "If y = e^(2x), dy/dx equals:", options: ["2e^(2x)", "e^(2x)", "e^(2x)/2", "2xe^(2x−1)"], answer: 0, why: "Chain rule: derivative of exponent 2 comes down.", exam: "CEE 2078" },
      { q: "The derivative of sin⁻¹x is:", options: ["1/√(1 − x²)", "−1/√(1 − x²)", "1/(1 + x²)", "−1/(1 + x²)"], answer: 0, why: "arcsin's derivative is positive; arccos carries the minus.", exam: "CEE 2081" },
      { q: "The function f(x) = |x| is:", options: ["Continuous everywhere but not differentiable at 0", "Differentiable everywhere", "Discontinuous at 0", "Neither continuous nor differentiable"], answer: 0, why: "Left slope −1, right slope +1 — the corner kills differentiability only.", exam: "IOE 2080" },
      { q: "Area under y = x² from 0 to 3 is:", options: ["9", "3", "6", "27"], answer: 0, why: "∫x²dx = x³/3 → 27/3 = 9.", exam: "CEE 2079" },
    ],
  },
  {
    units: ["analytic-geometry"],
    questions: [
      { q: "The distance between points (3, 4) and (0, 0) is:", options: ["5", "7", "25", "1"], answer: 0, why: "√(9 + 16) = 5 — the 3-4-5 triangle.", exam: "CEE 2079" },
      { q: "The slope of a line perpendicular to 2x + 3y = 6 is:", options: ["3/2", "−2/3", "−3/2", "2/3"], answer: 0, why: "Given slope −2/3; perpendicular is the negative reciprocal 3/2.", exam: "CEE 2080" },
      { q: "The eccentricity of the ellipse x²/25 + y²/16 = 1 is:", options: ["3/5", "4/5", "5/4", "1/5"], answer: 0, why: "e = √(1 − b²/a²) = √(1 − 16/25) = 3/5.", exam: "IOE 2079" },
      { q: "The focus of the parabola y² = 8x is:", options: ["(2, 0)", "(8, 0)", "(4, 0)", "(0, 2)"], answer: 0, why: "4a = 8 → a = 2; focus (a, 0) = (2, 0).", exam: "CEE 2081" },
    ],
  },
  {
    units: ["vectors"],
    questions: [
      { q: "If A·B = |A||B|, the angle between A and B is:", options: ["0°", "90°", "180°", "45°"], answer: 0, why: "cos θ = 1 only at θ = 0 — parallel vectors.", exam: "CEE 2080" },
      { q: "The projection of A = 2î + 3ĵ on B = î is:", options: ["2", "3", "√13", "5"], answer: 0, why: "A·B̂ = (2î + 3ĵ)·î = 2.", exam: "IOE 2079" },
      { q: "|A × B| equals |A||B| when the vectors are:", options: ["Perpendicular", "Parallel", "Equal", "Anti-parallel"], answer: 0, why: "sin θ = 1 at 90°.", exam: "CEE 2078" },
      { q: "A unit vector along A = 3î + 4ĵ is:", options: ["(3î + 4ĵ)/5", "(3î + 4ĵ)/7", "3î + 4ĵ", "(4î + 3ĵ)/5"], answer: 0, why: "Divide by |A| = √(9+16) = 5.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["statistics-and-probability"],
    questions: [
      { q: "The probability of getting a sum of 7 with two dice is:", options: ["1/6", "1/12", "7/36", "1/9"], answer: 0, why: "6 favourable pairs out of 36 → 1/6 — the most likely sum.", exam: "CEE 2080" },
      { q: "The mean of 2, 4, 6, 8, 10 is:", options: ["6", "5", "8", "7"], answer: 0, why: "Sum 30 / 5 = 6; median also 6 here.", exam: "NEB Board" },
      { q: "Standard deviation is independent of:", options: ["Change of origin", "Change of scale", "Both", "Neither"], answer: 0, why: "Shifting all data by a constant leaves spread unchanged.", exam: "IOE 2079" },
      { q: "Two events are independent if:", options: ["P(A∩B) = P(A)·P(B)", "P(A∩B) = 0", "P(A) + P(B) = 1", "P(A|B) = 0"], answer: 0, why: "Multiplication rule is the definition; P(A∩B)=0 means mutually exclusive, a different idea.", exam: "CEE 2079" },
      { q: "Binomial distribution's mean is:", options: ["np", "√(npq)", "npq", "n/p"], answer: 0, why: "Mean np, variance npq — memorise the pair.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["computational-methods-or-mechanics"],
    questions: [
      { q: "In the bisection method, each iteration halves:", options: ["The interval containing the root", "The error exactly", "The function value", "The derivative"], answer: 0, why: "Bracket halves each step — error bound shrinks geometrically.", exam: "IOE 2079" },
      { q: "Newton–Raphson formula for root of f(x) = 0 is:", options: ["xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ)", "xₙ₊₁ = f(xₙ)/f′(xₙ)", "xₙ₊₁ = xₙ + f′(xₙ)", "xₙ₊₁ = xₙ·f(xₙ)"], answer: 0, why: "Tangent-line root projection — remember the minus sign.", exam: "CEE 2080" },
      { q: "Trapezoidal rule error compared to Simpson's rule is:", options: ["Larger", "Smaller", "Equal", "Zero"], answer: 0, why: "Simpson fits parabolas — third-order accurate vs trapezoid's second.", exam: "CEE 2079" },
    ],
  },
];
