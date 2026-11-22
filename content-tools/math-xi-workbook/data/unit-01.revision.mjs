/**
 * Unit 1 — Algebra: timed revision paper (24 questions, 50 marks, 45 minutes).
 * Item shape: [question, answer, marks]
 */

export const REVISION = [
  {
    unitNo: 1,
    title: "Unit 1 — Algebra: revision paper",
    minutes: 45,
    items: [
      ["Is “Close the door” a statement?", "No — a command has no truth value.", 1],
      ["If A = {1, 2, 3} and B = {3, 4}, find A ∩ B.", "{3}", 1],
      ["How many subsets has a set with five elements?", "2⁵ = 32.", 1],
      ["Solve |x| = 7.", "x = 7 or x = −7.", 1],
      ["Solve |x − 1| ≤ 2.", "−1 ≤ x ≤ 3.", 1],
      ["State the domain of f(x) = √(x − 3).", "x ≥ 3, i.e. [3, ∞).", 1],
      ["Which term of 5, 9, 13, … equals 41?", "5 + 4(n − 1) = 41 ⇒ n = 10, the 10th term.", 1],
      ["Evaluate det [[2, 3], [1, 4]].", "8 − 3 = 5.", 1],
      ["Find the sum of the roots of 2x² − 5x + 3 = 0.", "−b/a = 5/2.", 1],
      ["Simplify i²¹.", "i²¹ = (i⁴)⁵ · i = i.", 1],
      [
        "Write the contrapositive of “If a number is divisible by 4 then it is even”.",
        "“If a number is not even, then it is not divisible by 4.” The contrapositive is logically equivalent to the original.",
        2,
      ],
      [
        "Show that |x − 3| < 1 means 2 < x < 4.",
        "The inequality says the distance of x from 3 is less than 1, so x lies between 3 − 1 = 2 and 3 + 1 = 4.",
        2,
      ],
      ["If f(x) = 2x + 3, find f⁻¹(x).", "y = 2x + 3 ⇒ x = (y − 3)/2, so f⁻¹(x) = (x − 3)/2.", 2],
      [
        "Find the vertex of y = x² − 4x + 1.",
        "x = −b/2a = 2 and y = 4 − 8 + 1 = −3, so the vertex is (2, −3), a minimum.",
        2,
      ],
      ["Find the sum of the first 20 natural numbers.", "S = 20 · 21/2 = 210.", 2],
      ["Find the sum to infinity of 1 + 1/3 + 1/9 + …", "a = 1, r = 1/3, so S = 1/(1 − 1/3) = 3/2.", 2],
      [
        "If A = [[1, 2], [3, 4]], find A² − 5A.",
        "A² = [[7, 10], [15, 22]] and 5A = [[5, 10], [15, 20]], so the answer is [[2, 0], [0, 2]] = 2I.",
        2,
      ],
      ["Solve x² + 4 = 0.", "x² = −4 ⇒ x = ±2i.", 2],
      [
        "If α, β are the roots of x² − 6x + 8 = 0, find α² + β².",
        "α² + β² = (α + β)² − 2αβ = 36 − 16 = 20 (roots 2 and 4).",
        2,
      ],
      [
        "Express (1 + i)² in the form a + ib and state its modulus.",
        "(1 + i)² = 1 + 2i + i² = 2i, so |z| = 2.",
        2,
      ],
      [
        "Solve |2x − 1| = |x + 4|.",
        "Either 2x − 1 = x + 4 ⇒ x = 5, or 2x − 1 = −(x + 4) ⇒ 3x = −3 ⇒ x = −1. Both check, so x = 5, −1.",
        5,
      ],
      [
        "Sketch y = x² − 2x − 3: give the intercepts, the vertex and the axis of symmetry.",
        "y = (x − 3)(x + 1) gives x-intercepts −1 and 3 and y-intercept −3; the vertex is (1, −4) and the axis is x = 1. The parabola opens upward.",
        5,
      ],
      [
        "If the roots of x² − px + q = 0 are consecutive integers, show that p² − 4q = 1.",
        "Let the roots be m and m + 1. Then p = 2m + 1 and q = m(m + 1), so p² − 4q = 4m² + 4m + 1 − 4m² − 4m = 1.",
        5,
      ],
      [
        "Solve x + y = 5, 2x − y = 1 by the determinant method.",
        "D = −1 − 2 = −3, Dx = −5 − 1 = −6, Dy = 1 − 10 = −9, so x = 2 and y = 3. Check: 2 + 3 = 5 ✓, 4 − 3 = 1 ✓.",
        5,
      ],
    ],
  },
];
