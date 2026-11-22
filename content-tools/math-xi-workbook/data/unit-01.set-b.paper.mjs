/**
 * Unit 1 — Algebra: NEB model paper, Set B (75 marks, 3 hours).
 */

export const PAPERS = [
  {
    unitNo: 1,
    title: "Unit 1 — Algebra",
    set: "B",
    note: "Set B covers the same unit with different items; the marking split is identical to Set A, so a second attempt can be compared paper for paper.",
    A: [
      ["The number of subsets of a set with 3 elements is", ["3", "6", "8", "9"], 3, "2³ = 8"],
      ["If n(U) = 40 and n(A) = 25, then n(A′) is", ["5", "15", "25", "65"], 2, "40 − 25 = 15"],
      ["The value of i⁴ is", ["1", "−1", "i", "−i"], 1, "i² = −1, so i⁴ = 1"],
      ["If |x| < 3, then x lies in", ["[−3, 3]", "(−3, 3)", "(−∞, 3)", "(3, ∞)"], 2, "the strict inequality excludes both ends"],
      ["If f(x) = 3x − 2, then f⁻¹(x) is", ["(x + 2)/3", "3x + 2", "1/(3x − 2)", "(x − 2)/3"], 1, "y = 3x − 2 ⇒ x = (y + 2)/3"],
      ["The roots of x² − 4 = 0 are", ["±4", "±2", "2 only", "0, 4"], 2, "x = ±√4"],
      ["The 10th term of the AP 3, 7, 11, … is", ["35", "39", "43", "47"], 2, "3 + 9(4) = 39"],
      ["If A is the 2 × 2 identity matrix, then A² equals", ["A", "0", "2A", "I + A"], 1, "I·I = I"],
      ["The conjugate of 2 − 3i is", ["2 + 3i", "−2 + 3i", "−2 − 3i", "3 − 2i"], 1, "change the sign of the imaginary part"],
      ["The sum to infinity of 1 + ½ + ¼ + … is", ["1", "1.5", "2", "∞"], 3, "a/(1 − r) = 1/(1/2)"],
      ["If α + β = 7 and αβ = 12, the quadratic with roots α, β is", ["x² + 7x + 12", "x² − 7x + 12", "x² − 12x + 7", "x² + 12x − 7"], 2, "x² − (sum)x + product"],
    ],
    B: [
      [
        "Prove that A − B = A ∩ B′ for any two sets A and B.",
        "1. x ∈ A − B ⇔ x ∈ A and x ∉ B\n2. ⇔ x ∈ A and x ∈ B′\n3. ⇔ x ∈ A ∩ B′\n4. each step is reversible, so the sets are equal",
        "A − B = A ∩ B′",
      ],
      [
        "Solve 3x − 2 ≤ 7 together with x + 1 > 0 and write the answer as an interval.",
        "1. 3x − 2 ≤ 7 ⇒ 3x ≤ 9 ⇒ x ≤ 3\n2. x + 1 > 0 ⇒ x > −1\n3. the common values satisfy both conditions",
        "x ∈ (−1, 3]",
      ],
      [
        "If f(x) = x² − 3x + 2, find f(2) and f(−1).",
        "1. f(2) = 4 − 6 + 2 = 0\n2. f(−1) = 1 + 3 + 2 = 6\n3. so 2 is a zero of the function",
        "f(2) = 0, f(−1) = 6",
      ],
      [
        "The 3rd term of an AP is 5 and the 7th term is 13. Find the 15th term.",
        "1. a + 2d = 5 and a + 6d = 13\n2. subtract: 4d = 8 ⇒ d = 2, a = 1\n3. t₁₅ = a + 14d = 1 + 28",
        "t₁₅ = 29",
      ],
      [
        "For A = [[2, 5], [1, 3]], find det A and A⁻¹.",
        "1. det A = 6 − 5 = 1\n2. adj A = [[3, −5], [−1, 2]]\n3. A⁻¹ = adj A/det A",
        "det A = 1, A⁻¹ = [[3, −5], [−1, 2]]",
      ],
      [
        "Find k if the roots of x² − 6x + k = 0 are equal.",
        "1. equal roots ⇒ discriminant zero\n2. Δ = 36 − 4k = 0\n3. k = 9",
        "k = 9",
      ],
      [
        "Find the modulus and argument of z = −1 + i.",
        "1. |z| = √(1 + 1) = √2\n2. the point (−1, 1) is in the second quadrant, so arg z = π − tan⁻¹(1/1)\n3. = π − π/4 = 3π/4",
        "|z| = √2, arg z = 3π/4",
      ],
      [
        "If z = 3 + 4i, find z z̄ and state what it equals.",
        "1. z̄ = 3 − 4i\n2. z z̄ = (3 + 4i)(3 − 4i) = 9 + 16\n3. = 25 = |z|²",
        "z z̄ = 25 = |z|²",
      ],
    ],
    C: [
      [
        "Solve 3x + 2y = 12 and x + y = 5 using the inverse of the coefficient matrix.",
        "1. the system is AX = B with A = [[3, 2], [1, 1]]\n2. det A = 3 − 2 = 1, adj A = [[1, −2], [−1, 3]]\n3. A⁻¹ = [[1, −2], [−1, 3]]\n4. X = A⁻¹B = [[12 − 10], [−12 + 15]] = [[2], [3]]\n5. check: 3(2) + 2(3) = 12 ✓ and 2 + 3 = 5 ✓\n6. the solution is unique because det A ≠ 0",
        "x = 2, y = 3",
      ],
      [
        "The sum of the first n terms of an AP is n² + 2n. Find the first term, the common difference and the 8th term.",
        "1. t₁ = S₁ = 1 + 2 = 3\n2. S₂ = 4 + 4 = 8 ⇒ t₂ = 5\n3. d = 5 − 3 = 2\n4. tₙ = Sₙ − Sₙ₋₁ = (n² + 2n) − [(n − 1)² + 2(n − 1)] = 2n + 1\n5. t₈ = 2(8) + 1 = 17\n6. check: S₈ = 64 + 16 = 80 and 8/2[2(3) + 7(2)] = 4(20) = 80 ✓",
        "a = 3, d = 2, t₈ = 17",
      ],
      [
        "(a) Express (2 − i)/(1 + i) in the form a + ib.\n(b) Form the quadratic equation whose roots are 1 + i and 1 − i.",
        "1. (a) multiply by the conjugate: (2 − i)(1 − i)/[(1 + i)(1 − i)]\n2. = (2 − 2i − i + i²)/2 = (1 − 3i)/2\n3. = 1/2 − (3/2)i\n4. (b) sum of roots = 2, product = (1 + i)(1 − i) = 2\n5. x² − (sum)x + product = 0\n6. x² − 2x + 2 = 0",
        "(a) 1/2 − (3/2)i  (b) x² − 2x + 2 = 0",
      ],
    ],
  },
];
