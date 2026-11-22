/**
 * Unit 6 — Calculus: NEB model paper, Set B (75 marks, 3 hours).
 */

export const PAPERS = [
  {
    unitNo: 6,
    title: "Unit 6 — Calculus",
    set: "B",
    note: "Set B mixes limits, derivatives and integrals in one paper; write the rule you use at each step, and never drop + C from an indefinite integral.",
    A: [
      ["lim(x→0) (1 − cos x)/x equals", ["0", "1", "1/2", "∞"], 1, "(1 − cosx)/x = x·[(1 − cosx)/x²] → 0"],
      ["lim(x→∞) 1/x equals", ["0", "1", "∞", "−1"], 1, "the reciprocal shrinks to zero"],
      ["The derivative of cos x is", ["sin x", "−sin x", "−cos x", "tan x"], 2, "standard derivative"],
      ["The derivative of ln x is", ["x", "1/x", "ln x", "e^x"], 2, "standard derivative"],
      ["∫(1/x) dx equals", ["ln|x| + C", "x²/2 + C", "1/x + C", "e^x + C"], 1, "the antiderivative of 1/x"],
      ["∫₀^{π} sin x dx equals", ["0", "1", "2", "π"], 3, "[−cos x]₀^{π} = 1 + 1"],
      ["If f(x) = x³, then f′(2) is", ["3", "6", "8", "12"], 4, "3x² = 12"],
      ["The derivative of a constant is", ["1", "0", "the constant", "undefined"], 2, "a constant has no rate of change"],
      ["The derivative of tan x is", ["sec²x", "secx tanx", "−cosec²x", "cos²x"], 1, "standard derivative"],
      ["∫e^x dx equals", ["e^x + C", "xe^x + C", "e^x/x + C", "ln x + C"], 1, "e^x is its own antiderivative"],
      ["f(x) = x² is increasing on", ["(−∞, 0)", "(0, ∞)", "(−∞, ∞)", "no interval"], 2, "the slope 2x is positive for x > 0"],
    ],
    B: [
      [
        "Evaluate lim(x→0) (tan x)/x.",
        "1. write tanx = sinx/cosx\n2. (tanx)/x = (sinx/x)(1/cosx)\n3. the first factor → 1 and the second → 1\n4. so the limit is 1",
        "the limit is 1",
      ],
      [
        "Differentiate y = x sin x.",
        "1. product rule with u = x, v = sinx\n2. y′ = 1·sinx + x·cosx",
        "y′ = sin x + x cos x",
      ],
      [
        "Differentiate y = (x² + 1)^5.",
        "1. chain rule: outer power 5, inner x² + 1\n2. y′ = 5(x² + 1)⁴ · 2x",
        "y′ = 10x(x² + 1)⁴",
      ],
      [
        "Evaluate ∫(3x² + 2x) dx.",
        "1. integrate term by term\n2. = x³ + x² + C",
        "x³ + x² + C",
      ],
      [
        "Find the minimum value of f(x) = x² − 6x + 5.",
        "1. f′(x) = 2x − 6 = 0 ⇒ x = 3\n2. f″ = 2 > 0, so it is a minimum\n3. f(3) = 9 − 18 + 5",
        "minimum value −4 at x = 3",
      ],
      [
        "Evaluate ∫₁² (2x + 1) dx.",
        "1. antiderivative x² + x\n2. = (4 + 2) − (1 + 1)",
        "the value is 4",
      ],
      [
        "Find the slope of the normal to y = x² at (2, 4).",
        "1. dy/dx = 2x = 4 at x = 2\n2. normal slope = −1/(tangent slope)",
        "normal slope = −1/4",
      ],
      [
        "Evaluate ∫ln x dx.",
        "1. by parts with u = lnx, dv = dx\n2. = x lnx − ∫x(1/x)dx\n3. = x lnx − x + C",
        "∫ln x dx = x ln x − x + C",
      ],
    ],
    C: [
      [
        "Differentiate y = cos x from first principles.",
        "1. dy/dx = lim(h→0) [cos(x + h) − cosx]/h\n2. cos(x + h) = cosx cosh − sinx sinh\n3. the quotient = cosx(cosh − 1)/h − sinx(sinh/h)\n4. limits: (cosh − 1)/h → 0 and sinh/h → 1\n5. dy/dx = −sinx\n6. this matches the standard derivative and the slope of the cosine wave at 0",
        "dy/dx = −sin x",
      ],
      [
        "For f(x) = x³ − 3x + 2 on [0, 2], find the stationary points, classify them and give the absolute maximum and minimum.",
        "1. f′(x) = 3x² − 3 = 3(x − 1)(x + 1) ⇒ x = 1 inside [0, 2]\n2. f″(x) = 6x: f″(1) = 6 > 0 ⇒ local minimum\n3. f(1) = 1 − 3 + 2 = 0\n4. endpoints: f(0) = 2, f(2) = 8 − 6 + 2 = 4\n5. values on the interval: 2, 0, 4\n6. absolute maximum 4 at x = 2, absolute minimum 0 at x = 1",
        "local (and absolute) minimum 0 at x = 1; absolute maximum 4 at x = 2",
      ],
      [
        "Find the area of the region bounded by y = 4 − x² and the x-axis.",
        "1. the curve meets the axis where 4 − x² = 0 ⇒ x = ±2\n2. A = ∫₋₂²(4 − x²)dx\n3. = [4x − x³/3]₋₂²\n4. = (8 − 8/3) − (−8 + 8/3)\n5. = 32/3\n6. ≈ 10.67 square units",
        "area = 32/3 ≈ 10.67 square units",
      ],
    ],
  },
];
