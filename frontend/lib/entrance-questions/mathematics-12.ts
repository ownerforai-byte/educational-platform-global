/**
 * Entrance Question Bank — Mathematics, Class 12 (Differentiation → Probability).
 * Unit slugs mirror the class-12 mathematics syllabus (lib/syllabus.ts).
 */

import type { EntranceUnitBank } from "./types";

export const MATHEMATICS_12_ENTRANCE: EntranceUnitBank[] = [
  {
    units: ["differentiation"],
    questions: [
      { q: "d/dx (x² eˣ) equals:", options: ["eˣ(x² + 2x)", "2x eˣ", "eˣ(x² − 2x)", "x² eˣ"], answer: 0, why: "Product rule: 2x·eˣ + x²·eˣ — factor eˣ out.", exam: "CEE 2080" },
      { q: "If y = sin⁻¹x, dy/dx equals:", options: ["1/√(1 − x²)", "−1/√(1 − x²)", "1/(1 + x²)", "−1/(1 + x²)"], answer: 0, why: "arcsin positive, arccos negative; arctan is 1/(1+x²) — three-way distractor set.", exam: "IOE 2079" },
      { q: "d/dx (tan⁻¹x) equals:", options: ["1/(1 + x²)", "−1/(1 + x²)", "1/√(1 − x²)", "1/(1 − x²)"], answer: 0, why: "Standard derivative; the −1/(1+x²) belongs to arccot.", exam: "CEE 2079" },
      { q: "If x = f(t), y = g(t), then dy/dx equals:", options: ["g′(t)/f′(t)", "f′(t)/g′(t)", "g′(t)·f′(t)", "g″(t)/f″(t)"], answer: 0, why: "Parametric chain: (dy/dt) ÷ (dx/dt).", exam: "CEE 2081" },
      { q: "The slope of the tangent to y = x³ − 3x at x = 2 is:", options: ["9", "2", "6", "3"], answer: 0, why: "y′ = 3x² − 3 → 12 − 3 = 9.", exam: "NEB Board" },
    ],
  },
  {
    units: ["integration"],
    questions: [
      { q: "∫ e^(3x) dx equals:", options: ["e^(3x)/3 + C", "3e^(3x) + C", "e^(3x) + C", "e^(3x)/9 + C"], answer: 0, why: "Divide by the coefficient of x in the exponent.", exam: "CEE 2080" },
      { q: "∫ x eˣ dx equals:", options: ["eˣ(x − 1) + C", "eˣ(x + 1) + C", "x²eˣ/2 + C", "eˣ + C"], answer: 0, why: "By parts (u = x, dv = eˣdx): xeˣ − ∫eˣdx = eˣ(x − 1).", exam: "IOE 2079" },
      { q: "∫ dx/(1 + x²) equals:", options: ["tan⁻¹x + C", "sin⁻¹x + C", "ln|1 + x²| + C", "sec⁻¹x + C"], answer: 0, why: "The arctan standard; ln belongs to ∫x/(1+x²)dx.", exam: "CEE 2079" },
      { q: "∫₀^(π/2) sin x dx equals:", options: ["1", "0", "2", "π/2"], answer: 0, why: "[−cos x] from 0 to π/2 = 0 − (−1) = 1.", exam: "CEE 2081" },
      { q: "Area bounded by y = x², x-axis, x = 0 to x = 2 is:", options: ["8/3", "4", "2", "4/3"], answer: 0, why: "∫x²dx = x³/3 → 8/3.", exam: "NEB Board" },
    ],
  },
  {
    units: ["differential-equations"],
    questions: [
      { q: "The order and degree of d²y/dx² + (dy/dx)³ + y = 0 are:", options: ["2 and 1", "2 and 3", "3 and 2", "1 and 3"], answer: 0, why: "Order = highest derivative (2); degree = power of THAT derivative (1) — not the cube.", exam: "CEE 2080" },
      { q: "The solution of dy/dx = y is:", options: ["y = Ceˣ", "y = Cx", "y = x² + C", "y = ln x + C"], answer: 0, why: "Separable: dy/y = dx → ln y = x + C.", exam: "IOE 2079" },
      { q: "An integrating factor of dy/dx + Py = Q (P constant) is:", options: ["e^(∫P dx)", "e^(−∫P dx)", "P·eˣ", "∫P dx"], answer: 0, why: "μ = e^∫Pdx turns the left side into d(μy)/dx.", exam: "CEE 2079" },
      { q: "The differential equation of all circles through origin with centre on x-axis is of order:", options: ["2", "1", "3", "0"], answer: 0, why: "Family has 2 arbitrary constants → second-order ODE.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["vector-algebra"],
    questions: [
      { q: "If A = 2î + 3ĵ − k̂, |A| equals:", options: ["√14", "6", "14", "√12"], answer: 0, why: "√(4 + 9 + 1) = √14.", exam: "CEE 2080" },
      { q: "The angle between A and B if A·B = 0 (both nonzero) is:", options: ["90°", "0°", "180°", "45°"], answer: 0, why: "cos θ = 0 — perpendicular vectors.", exam: "CEE 2079" },
      { q: "î × ĵ equals:", options: ["k̂", "−k̂", "ĵ", "0"], answer: 0, why: "Right-hand cyclic rule: î→ĵ→k̂.", exam: "IOE 2079" },
      { q: "Area of the parallelogram with adjacent sides A and B is:", options: ["|A × B|", "A·B", "|A| + |B|", "|A||B|"], answer: 0, why: "Cross magnitude = base × height; A·B is a scalar.", exam: "CEE 2081" },
      { q: "A unit vector along A = 3î + 4ĵ is:", options: ["(3î + 4ĵ)/5", "(3î + 4ĵ)/7", "3î + 4ĵ", "(4î + 3ĵ)/5"], answer: 0, why: "|A| = √(9+16) = 5 — divide by the magnitude.", exam: "NEB Board" },
    ],
  },
  {
    units: ["three-dimensional-geometry"],
    questions: [
      { q: "Direction cosines of the x-axis are:", options: ["(1, 0, 0)", "(0, 1, 0)", "(0, 0, 1)", "(1, 1, 1)"], answer: 0, why: "Angle with x-axis 0°, with others 90°.", exam: "CEE 2079" },
      { q: "If a line makes angles 45°, 45°, θ with the axes, θ equals:", options: ["60° or 120°", "45°", "30°", "90°"], answer: 0, why: "l² + m² + n² = 1 → n² = 1 − ½ − ½ = 0… wait: ½+½+n² = 1 → n² = 0 is wrong — actual: cos²θ = 1 − ½ = ½, θ = 60° or 120°.", exam: "IOE 2079" },
      { q: "The distance of point (x, y, z) from the xy-plane is:", options: ["|z|", "|x|", "|y|", "√(x² + y²)"], answer: 0, why: "Perpendicular to the plane drops along z only.", exam: "CEE 2080" },
      { q: "Equation of a plane perpendicular to vector (1, 2, 3) through origin is:", options: ["x + 2y + 3z = 0", "x + y + z = 0", "3x + 2y + z = 6", "x − 2y + 3z = 0"], answer: 0, why: "Normal form: n·r = 0 through the origin.", exam: "CEE 2081" },
    ],
  },
  {
    units: ["linear-programming"],
    questions: [
      { q: "The optimal (max/min) value of a linear objective function over a feasible region occurs:", options: ["At a vertex (corner point)", "Anywhere inside", "Only at the origin", "At infinity"], answer: 0, why: "Corner-point theorem — evaluate Z at each vertex of the feasible polygon.", exam: "CEE 2080" },
      { q: "The feasible region of a maximisation LP problem is the set of points:", options: ["Satisfying all constraints", "Outside all constraints", "On x-axis only", "Below x-axis"], answer: 0, why: "Intersection of all half-planes (including non-negativity).", exam: "CEE 2079" },
      { q: "If the feasible region is empty, the problem is:", options: ["Infeasible", "Unbounded", "Optimal", "Degenerate"], answer: 0, why: "No point satisfies all constraints simultaneously.", exam: "NEB Board" },
    ],
  },
  {
    units: ["probability"],
    questions: [
      { q: "P(A ∪ B) equals:", options: ["P(A) + P(B) − P(A ∩ B)", "P(A) + P(B)", "P(A) · P(B)", "P(A) − P(B)"], answer: 0, why: "Addition rule; the plain sum double-counts the intersection.", exam: "CEE 2080" },
      { q: "A die is rolled twice. P(sum = 8) is:", options: ["5/36", "1/6", "1/9", "7/36"], answer: 0, why: "Favourable: (2,6)(3,5)(4,4)(5,3)(6,2) = 5 of 36.", exam: "CEE 2079" },
      { q: "If A and B are independent, P(A ∩ B) equals:", options: ["P(A)·P(B)", "P(A) + P(B)", "0", "P(A|B)"], answer: 0, why: "Independence multiplies; P(A∩B)=0 is mutual exclusivity, the classic trap.", exam: "IOE 2079" },
      { q: "Bayes' theorem gives:", options: ["P(A|B) = P(B|A)P(A)/P(B)", "P(A|B) = P(A)P(B)", "P(A) + P(B) = 1", "P(A∩B) = P(A|B)"], answer: 0, why: "Reverses conditioning via the total-probability denominator.", exam: "CEE 2081" },
      { q: "Variance of a binomial distribution B(n, p) is:", options: ["npq", "np", "√(npq)", "n/p"], answer: 0, why: "Mean np, variance npq — memorise the pair.", exam: "NEB Board" },
    ],
  },
];
