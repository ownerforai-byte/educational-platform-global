/**
 * Unit 6 — Calculus: full-length answers, one per chapter.
 * Item shape: [question, [h1,h2,h3], work, answer, marks, topicIndex, kind, marking, pitfall]
 */

export const LONG = [
  {
    slug: "limits",
    items: [
      [
        "Evaluate with full working:\n(a) lim(x→0) (1 − cos 2x)/x²,\n(b) lim(x→∞) (√(x² + 1) − x),\n(c) lim(x→2) (x³ − 8)/(x² − 4).",
        [
          "For (a) use 1 − cos2x = 2sin²x, then the standard limit sinθ/θ → 1.",
          "For (b) multiply and divide by the conjugate √(x² + 1) + x.",
          "For (c) factor both the difference of cubes and the difference of squares, then cancel x − 2.",
        ],
        "Given: three limits\nRequired: each value with the algebra that removes the indeterminacy\n\n1. (a) 1 − cos2x = 2sin²x, so (1 − cos2x)/x² = 2(sinx/x)² → 2(1)² = 2\n2. (b) (√(x²+1) − x)(√(x²+1) + x)/(√(x²+1) + x) = 1/(√(x²+1) + x)\n3. as x → ∞ the denominator → ∞, so the limit is 0\n4. (c) x³ − 8 = (x − 2)(x² + 2x + 4); x² − 4 = (x − 2)(x + 2)\n5. cancel x − 2: (x² + 2x + 4)/(x + 2) → (4 + 4 + 4)/4\n6. = 12/4 = 3",
        "(a) 2  (b) 0  (c) 3.",
        6,
        2,
        "Standard limits",
        "each part 2",
        "Writing 0/0 = 1, or cancelling x − 2 without stating that x ≠ 2 in the limit process.",
      ],
    ],
  },
  {
    slug: "continuity",
    items: [
      [
        "Let f(x) = (x² − 1)/(x − 1) for x ≠ 1 and f(1) = k.\n(a) Find k so that f is continuous at x = 1.\n(b) With that k, examine the differentiability of g(x) = |x − 2| at x = 2.",
        [
          "Continuity at 1 requires lim(x→1) f(x) = f(1).",
          "Factor x² − 1 and cancel before taking the limit.",
          "At x = 2 compare the left and right derivatives of the modulus.",
        ],
        "Given: f(x) = (x² − 1)/(x − 1) for x ≠ 1, f(1) = k; g(x) = |x − 2|\nRequired: k and the differentiability of g at 2\n\n1. lim(x→1) (x² − 1)/(x − 1) = lim (x + 1) = 2\n2. continuity needs lim = f(1) ⇒ k = 2\n3. g(2) = 0 and lim(x→2) g(x) = 0 ⇒ g is continuous at 2\n4. left derivative: d/dx(2 − x) = −1; right derivative: d/dx(x − 2) = 1\n5. the one-sided derivatives differ, so the derivative at 2 does not exist\n6. geometrically: a corner — continuity does not imply differentiability",
        "(a) k = 2  (b) g is continuous at x = 2 but not differentiable there, because the left and right derivatives are −1 and 1.",
        6,
        3,
        "Continuity and differentiability",
        "limit 1.5 + k 1 + continuity of g 1.5 + one-sided derivatives 2 = 6",
        "Assuming a removable discontinuity is automatically differentiable once repaired — differentiability needs equal one-sided slopes.",
      ],
    ],
  },
  {
    slug: "first-principles",
    items: [
      [
        "Differentiate from first principles:\n(a) y = x³,\n(b) y = sin x.",
        [
          "Write dy/dx = lim(h→0) [f(x + h) − f(x)]/h.",
          "For x³ expand (x + h)³ and keep the terms that do not vanish with h.",
          "For sinx use sin(x + h) = sinx cosh + cosx sinh and the limits sinh/h → 1, (cosh − 1)/h → 0.",
        ],
        "Given: y = x³ and y = sinx\nRequired: each derivative from the definition\n\n1. (a) [(x + h)³ − x³]/h = [3x²h + 3xh² + h³]/h = 3x² + 3xh + h²\n2. as h → 0 this gives 3x²\n3. (b) [sin(x + h) − sinx]/h = [sinx cosh + cosx sinh − sinx]/h\n4. = sinx(cosh − 1)/h + cosx (sinh/h)\n5. limits: (cosh − 1)/h → 0 and sinh/h → 1\n6. dy/dx = cosx",
        "(a) dy/dx = 3x²  (b) dy/dx = cos x.",
        6,
        0,
        "Definition of derivative",
        "expansion 1.5 + limit 1.5 + identity 1.5 + standard limits 1.5 = 6",
        "Cancelling h before letting h → 0 — h may only be removed after the quotient is simplified.",
      ],
    ],
  },
  {
    slug: "differentiation-rules",
    items: [
      [
        "Differentiate\n(a) y = x² sin x,\n(b) y = ln(x² + 1),\n(c) y = e^{3x} cos 2x.",
        [
          "(a) is a product: u = x², v = sinx.",
          "(b) is a chain: the inner function is x² + 1, whose derivative is 2x.",
          "(c) is a product of two exponentials-trig terms — apply the product rule with the chain inside each factor.",
        ],
        "Given: three functions\nRequired: each derivative, simplified\n\n1. (a) y′ = 2x sinx + x² cosx\n2. (b) y = ln u with u = x² + 1 ⇒ y′ = (1/u)(2x) = 2x/(x² + 1)\n3. (c) u = e^{3x}, u′ = 3e^{3x}; v = cos2x, v′ = −2sin2x\n4. y′ = 3e^{3x}cos2x + e^{3x}(−2sin2x)\n5. = e^{3x}(3cos2x − 2sin2x)\n6. each answer is left in factored form, ready for sign analysis",
        "(a) 2x sinx + x² cosx  (b) 2x/(x² + 1)  (c) e^{3x}(3cos2x − 2sin2x).",
        6,
        2,
        "Product, chain",
        "each part 2",
        "Forgetting the inner derivative: ln(x² + 1)′ is not 1/(x² + 1), and cos2x′ is not −sin2x.",
      ],
    ],
  },
  {
    slug: "implicit-parametric-higher",
    items: [
      [
        "The curve x² + xy + y² = 3 passes through (1, 1).\n(a) Find dy/dx by implicit differentiation.\n(b) Evaluate the slope at (1, 1).\n(c) Write the tangent line there.",
        [
          "Differentiate term by term, remembering that y is a function of x (product rule on xy).",
          "Collect the dy/dx terms on one side.",
          "A tangent is y − y₁ = m(x − x₁).",
        ],
        "Given: x² + xy + y² = 3, point (1, 1)\nRequired: dy/dx, the slope, the tangent\n\n1. 2x + (y + x y′) + 2y y′ = 0\n2. y′(x + 2y) = −(2x + y) ⇒ y′ = −(2x + y)/(x + 2y)\n3. at (1, 1): y′ = −(2 + 1)/(1 + 2) = −3/3 = −1\n4. tangent: y − 1 = −1(x − 1)\n5. ⇒ y = −x + 2, i.e. x + y = 2\n6. check (1,1) on both the curve (1 + 1 + 1 = 3 ✓) and the tangent (2 = 2 ✓)",
        "dy/dx = −(2x + y)/(x + 2y); slope −1 at (1, 1); tangent x + y = 2.",
        6,
        0,
        "Implicit differentiation",
        "differentiation 2 + solving for y′ 1.5 + slope 1 + tangent 1.5 = 6",
        "Differentiating xy as y instead of y + x y′ — the product rule is the whole point of the exercise.",
      ],
    ],
  },
  {
    slug: "extrema-tangents",
    items: [
      [
        "For f(x) = x³ − 6x² + 9x + 1 on the closed interval [0, 4],\n(a) find the stationary points and classify them,\n(b) find the absolute maximum and minimum on [0, 4].",
        [
          "f′(x) = 3x² − 12x + 9; set it to zero and factor.",
          "Classify with the sign of f′ or the second derivative.",
          "On a closed interval always compare the stationary values with the endpoint values.",
        ],
        "Given: f(x) = x³ − 6x² + 9x + 1, x ∈ [0, 4]\nRequired: stationary points, their type, and the absolute extremes\n\n1. f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3) ⇒ x = 1, 3\n2. f″(x) = 6x − 12: f″(1) = −6 < 0 ⇒ local max; f″(3) = 6 > 0 ⇒ local min\n3. f(1) = 1 − 6 + 9 + 1 = 5; f(3) = 27 − 54 + 27 + 1 = 1\n4. endpoints: f(0) = 1, f(4) = 64 − 96 + 36 + 1 = 5\n5. values: 1, 5, 1, 5 ⇒ max 5, min 1\n6. both extremes are attained twice — at a stationary point and at an endpoint",
        "local max 5 at x = 1, local min 1 at x = 3; absolute maximum 5 (at x = 1 and x = 4), absolute minimum 1 (at x = 0 and x = 3).",
        6,
        3,
        "Maxima and minima",
        "derivative and roots 1.5 + classification 1.5 + values 1 + endpoints 1 + conclusion 1 = 6",
        "Ignoring the endpoints. On a closed interval the largest or smallest value can occur at an end point.",
      ],
    ],
  },
  {
    slug: "anti-derivatives",
    items: [
      [
        "Evaluate\n(a) ∫ x ln x dx,\n(b) ∫ cos²x dx.",
        [
          "(a) is a product: take u = ln x and dv = x dx.",
          "For (b) replace cos²x by (1 + cos 2x)/2.",
          "Both answers need the constant of integration.",
        ],
        "Given: two indefinite integrals\nRequired: each antiderivative, with + C\n\n1. (a) u = lnx, dv = x dx ⇒ du = dx/x, v = x²/2\n2. ∫x lnx dx = (x²/2)lnx − ∫(x²/2)(1/x)dx\n3. = (x²/2)lnx − ∫(x/2)dx = (x²/2)lnx − x²/4 + C\n4. (b) cos²x = (1 + cos2x)/2\n5. ∫cos²x dx = x/2 + (sin2x)/4 + C\n6. differentiate back: d/dx[x/2 + sin2x/4] = 1/2 + cos2x/2 = cos²x ✓",
        "(a) (x²/2)ln x − x²/4 + C  (b) x/2 + (sin 2x)/4 + C.",
        6,
        2,
        "By parts, half-angle",
        "by-parts setup 2 + completed integral 1.5 + half-angle 1.5 + constant 1 = 6",
        "Dropping + C, or integrating cos²x as sin³x/3 (that would be for sin²x cosx).",
      ],
    ],
  },
  {
    slug: "definite-integrals-area",
    items: [
      [
        "(a) Find the area enclosed by y = 4x − x² and the x-axis.\n(b) Find the area of the region bounded by y = x² and the line y = 4.",
        [
          "The parabola cuts the x-axis at x = 0 and x = 4.",
          "Area under a curve is the definite integral between the two roots.",
          "For (b) the curves meet where x² = 4, so x = ±2; integrate the upper curve minus the lower one.",
        ],
        "Given: y = 4x − x² and the pair y = x², y = 4\nRequired: both enclosed areas\n\n1. (a) roots: x(4 − x) = 0 ⇒ x = 0, 4; the vertex (2, 4) lies above the axis\n2. A = ∫₀⁴(4x − x²)dx = [2x² − x³/3]₀⁴\n3. = 32 − 64/3 = 32/3 square units\n4. (b) x² = 4 ⇒ x = ±2, and y = 4 is the upper boundary\n5. A = ∫₋₂²(4 − x²)dx = [4x − x³/3]₋₂²\n6. = (8 − 8/3) − (−8 + 8/3) = 32/3 ≈ 10.67 square units",
        "(a) 32/3 ≈ 10.67 square units  (b) 32/3 ≈ 10.67 square units.",
        6,
        2,
        "Area by integration",
        "roots and integral 2 + value 1 + intersection points 1 + symmetric integral 2 = 6",
        "Integrating without checking where the curves cross, which silently adds signed areas of opposite sign.",
      ],
    ],
  },
];
