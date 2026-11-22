/**
 * Unit 6 — Calculus: NEB model paper (75 marks, 3 hours).
 * A: [question, [4 options], answerIndex, why?] · B/C: [question, worked answer, answer line]
 */

export const PAPERS = [
  {
    unitNo: 6,
    title: "Unit 6 — Calculus",
    note: "Group B items are marked on the final simplified derivative or integral; indefinite integrals without + C lose a mark, and every limit answer should show what removed the indeterminacy.",
    A: [
      ["lim(x→0) sin 3x/x equals", ["0", "1", "3", "1/3"], 3, "sin3x/x = 3(sin3x/3x) → 3"],
      ["lim(x→2) (x² − 4)/(x − 2) equals", ["0", "2", "4", "∞"], 3, "cancel x − 2 to get x + 2"],
      ["The derivative of x⁵ is", ["5x⁴", "x⁴", "5x⁶", "4x⁵"], 1, "power rule"],
      ["The derivative of sin x is", ["−cos x", "cos x", "−sin x", "tan x"], 2, "standard derivative"],
      ["The function f(x) = |x| at x = 0 is", ["continuous and differentiable", "continuous but not differentiable", "discontinuous", "not defined"], 2, "left and right slopes are −1 and 1"],
      ["The derivative of e^{2x} is", ["e^{2x}", "2e^{2x}", "e^{2x}/2", "2xe^{2x}"], 2, "chain rule with inner derivative 2"],
      ["∫x² dx equals", ["x³ + C", "x³/3 + C", "2x + C", "x²/2 + C"], 2, "reverse the power rule"],
      ["∫₀¹ x dx equals", ["1", "1/2", "0", "2"], 2, "[x²/2]₀¹ = 1/2"],
      ["The slope of the tangent to y = x² at (1, 1) is", ["0", "1", "2", "1/2"], 3, "dy/dx = 2x = 2"],
      ["∫cos x dx equals", ["sin x + C", "−sin x + C", "cos x + C", "−cos x + C"], 1, "the derivative of sin x is cos x"],
      ["If f″(x) > 0 on an interval, the curve there is", ["concave up", "concave down", "a straight line", "decreasing"], 1, "a positive second derivative bends the graph upward"],
    ],
    B: [
      [
        "Evaluate lim(x→0) (√(1 + x) − 1)/x.",
        "1. multiply by the conjugate: [(1 + x) − 1]/[x(√(1 + x) + 1)]\n2. = x/[x(√(1 + x) + 1)]\n3. cancel x: 1/(√(1 + x) + 1)\n4. as x → 0 this tends to 1/2",
        "the limit is 1/2",
      ],
      [
        "Differentiate y = x²e^x.",
        "1. product rule with u = x², v = e^x\n2. y′ = 2x e^x + x² e^x\n3. take e^x out as a factor",
        "y′ = e^x(x² + 2x)",
      ],
      [
        "Find dy/dx for x² + y² = 25 at the point (3, 4).",
        "1. 2x + 2y y′ = 0\n2. y′ = −x/y\n3. at (3, 4): y′ = −3/4",
        "dy/dx = −3/4",
      ],
      [
        "Evaluate ∫(2x + 3)² dx.",
        "1. substitute u = 2x + 3, du = 2 dx\n2. ∫u²(du/2) = u³/6 + C\n3. back-substitute u = 2x + 3",
        "∫(2x + 3)² dx = (2x + 3)³/6 + C",
      ],
      [
        "Find the maximum value of f(x) = 12 + 4x − x².",
        "1. f′(x) = 4 − 2x = 0 ⇒ x = 2\n2. f″(x) = −2 < 0, so it is a maximum\n3. f(2) = 12 + 8 − 4",
        "maximum value 16 at x = 2",
      ],
      [
        "Evaluate ∫₀^{π/2} cos x dx.",
        "1. antiderivative is sin x\n2. [sin x]₀^{π/2}\n3. = sin(π/2) − sin 0",
        "the value is 1",
      ],
      [
        "Find the equation of the tangent to y = x³ − 2x at x = 1.",
        "1. point: y = 1 − 2 = −1, so (1, −1)\n2. slope: y′ = 3x² − 2 = 1 at x = 1\n3. y + 1 = 1(x − 1)",
        "y = x − 2",
      ],
      [
        "Evaluate ∫x e^x dx.",
        "1. by parts with u = x, dv = e^x dx ⇒ du = dx, v = e^x\n2. = x e^x − ∫e^x dx\n3. = x e^x − e^x + C",
        "∫x e^x dx = e^x(x − 1) + C",
      ],
    ],
    C: [
      [
        "If f(x) = x² for x ≤ 1 and f(x) = ax + b for x > 1, find a and b so that f is continuous and differentiable at x = 1.",
        "1. continuity: lim(x→1⁻) = 1 and lim(x→1⁺) = a + b\n2. so a + b = 1\n3. differentiability: left slope 2x → 2 at x = 1\n4. right slope of ax + b is a, so a = 2\n5. then b = 1 − 2 = −1\n6. check: f is 2x − 1 just right of 1, matching value 1 and slope 2",
        "a = 2, b = −1",
      ],
      [
        "For f(x) = 2x³ − 15x² + 36x − 10, find the stationary points and classify them.",
        "1. f′(x) = 6x² − 30x + 36 = 6(x² − 5x + 6)\n2. = 6(x − 2)(x − 3) ⇒ stationary at x = 2, 3\n3. f″(x) = 12x − 30: f″(2) = −6 < 0 ⇒ local maximum\n4. f″(3) = 6 > 0 ⇒ local minimum\n5. f(2) = 16 − 60 + 72 − 10 = 18\n6. f(3) = 54 − 135 + 108 − 10 = 17",
        "local maximum 18 at x = 2, local minimum 17 at x = 3",
      ],
      [
        "Find the area of the region bounded by the curves y = 6x − x² and y = x² − 2x.",
        "1. intersection: 6x − x² = x² − 2x ⇒ 2x² − 8x = 0 ⇒ x = 0, 4\n2. between them the upper curve is 6x − x²\n3. integrand: (6x − x²) − (x² − 2x) = 8x − 2x²\n4. A = ∫₀⁴(8x − 2x²)dx = [4x² − 2x³/3]₀⁴\n5. = 64 − 128/3\n6. = 64/3 ≈ 21.33 square units",
        "area = 64/3 ≈ 21.33 square units",
      ],
    ],
  },
];
