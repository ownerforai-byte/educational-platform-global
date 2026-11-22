/**
 * Unit 6 — Calculus: timed revision paper (24 questions, 50 marks, 45 minutes).
 * Item shape: [question, answer, marks]
 */

export const REVISION = [
  {
    unitNo: 6,
    title: "Unit 6 — Calculus: revision paper",
    minutes: 45,
    items: [
      ["Evaluate lim(x→2) x².", "4, by direct substitution.", 1],
      ["Differentiate x⁵.", "5x⁴.", 1],
      ["Differentiate sin x.", "cos x.", 1],
      ["Evaluate ∫2x dx.", "x² + C.", 1],
      ["Evaluate ∫₀¹ 1 dx.", "1.", 1],
      ["Differentiate a constant.", "0.", 1],
      ["Evaluate lim(x→0) (sin x)/x.", "1.", 1],
      ["State the slope of y = 3x + 2.", "3.", 1],
      ["Differentiate eˣ.", "eˣ.", 1],
      ["Evaluate ∫eˣ dx.", "eˣ + C.", 1],
      ["Evaluate lim(x→3) (x² − 9)/(x − 3).", "Cancel (x − 3): the limit is x + 3 → 6.", 2],
      ["Differentiate y = x² + 3x.", "2x + 3.", 2],
      ["Differentiate y = (2x + 1)³.", "3(2x + 1)² · 2 = 6(2x + 1)².", 2],
      ["Evaluate ∫(x² + 1) dx.", "x³/3 + x + C.", 2],
      ["Find dy/dx if y = x ln x.", "Product rule: ln x + 1.", 2],
      ["Find the stationary point of f(x) = x² − 4x + 3.", "f′(x) = 2x − 4 = 0 ⇒ x = 2, and f(2) = −1 (a minimum).", 2],
      ["Evaluate ∫₀² x dx.", "[x²/2]₀² = 2.", 2],
      ["Differentiable at a point implies continuous there — is the converse true?", "No. f(x) = |x| is continuous at 0 but has no derivative there, so differentiability is the stronger condition.", 2],
      ["Write the derivatives of tan x and cot x.", "sec²x and −cosec²x.", 2],
      ["Find the area under y = 3 from x = 0 to x = 2.", "∫₀² 3 dx = 6 square units.", 2],
      [
        "Differentiate √x from first principles.",
        "[√(x + h) − √x]/h, rationalised, gives h/[h(√(x + h) + √x)] → 1/(2√x) as h → 0.",
        5,
      ],
      [
        "For f(x) = x³ − 6x² + 9x, find and classify the stationary points.",
        "f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3), so x = 1 and x = 3. f″ = 6x − 12: at x = 1, f″ < 0 gives a maximum f(1) = 4; at x = 3, f″ > 0 gives a minimum f(3) = 0.",
        5,
      ],
      [
        "Evaluate ∫x eˣ dx.",
        "By parts with u = x, dv = eˣdx: x eˣ − ∫eˣ dx = eˣ(x − 1) + C.",
        5,
      ],
      [
        "Find the area enclosed between y = x² and y = 2x.",
        "They meet where x² = 2x, i.e. x = 0 and x = 2. The area is ∫₀²(2x − x²)dx = [x² − x³/3]₀² = 4 − 8/3 = 4/3 square units.",
        5,
      ],
    ],
  },
];
