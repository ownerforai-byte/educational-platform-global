/**
 * Unit 1 — Algebra: NEB model paper (75 marks, 3 hours).
 * Group A: 11 × 1 (mcq) · Group B: 8 × 5 · Group C: 3 × 8.
 * Item shapes — A: [question, [4 options], answerIndex 1-4, why?]
 *               B/C: [question, worked answer, answer line]
 */

export const PAPERS = [
  {
    unitNo: 1,
    title: "Unit 1 — Algebra",
    note: "Marks are given for method and accuracy: 1-mark items need only the option, 5-mark items need the working, 8-mark items are marked step by step.",
    A: [
      ["Which one of the following is a statement?", ["The fishes are beautiful.", "Study mathematics.", "x is a capital of country y.", "Water is essential for health."], 4, "only (d) has a definite truth value"],
      ["If A ⊆ B, then A ∩ B equals", ["A", "B", "φ", "A ∪ B"], 2, "every element of A is already in B"],
      ["The value of √(−16) · √(−25) is", ["−20", "−20i", "20i", "20"], 1, "(4i)(5i) = 20i² = −20"],
      ["The solution set of |x − 3| = 3 is", ["{0, 6}", "{0}", "{6}", "{3, −3}"], 1, "x − 3 = ±3 ⇒ x = 6 or 0"],
      ["If f(x) = x² + 1, then f(f(1)) is", ["2", "5", "4", "10"], 2, "f(1) = 2 and f(2) = 5"],
      ["The vertex of the parabola y = x² − 6x + 5 is", ["(3, 4)", "(3, −4)", "(−3, 4)", "(6, 5)"], 2, "y = (x − 3)² − 4"],
      ["The 7th term of an AP is 34 and the 13th term is 64. Its common difference is", ["3", "4", "5", "6"], 3, "6d = 30 ⇒ d = 5"],
      ["If A = [[2, 1], [1, 1]], then det A is", ["1", "2", "3", "0"], 1, "2(1) − 1(1) = 1"],
      ["If α and β are the roots of x² − 5x + 6 = 0, then 1/α + 1/β is", ["5/6", "6/5", "5", "1"], 1, "(α + β)/αβ = 5/6"],
      ["The modulus of 3 + 4i is", ["3", "4", "5", "7"], 3, "√(9 + 16) = 5"],
      ["The value of (1 + i)² is", ["2", "2i", "1 + 2i", "−2i"], 2, "1 + 2i + i² = 2i"],
    ],
    B: [
      [
        "Prove that (A ∪ B)′ = A′ ∩ B′ for any two sets A and B of a universal set U.",
        "1. x ∈ (A ∪ B)′ ⇔ x ∉ (A ∪ B)\n2. ⇔ x ∉ A and x ∉ B\n3. ⇔ x ∈ A′ and x ∈ B′\n4. ⇔ x ∈ A′ ∩ B′\n5. each step is reversible, so the two sets contain the same elements",
        "hence (A ∪ B)′ = A′ ∩ B′",
      ],
      [
        "Solve |2x − 3| < 5 and write the answer as an interval.",
        "1. −5 < 2x − 3 < 5\n2. add 3: −2 < 2x < 8\n3. divide by 2: −1 < x < 4",
        "x ∈ (−1, 4)",
      ],
      [
        "Find the domain and range of f(x) = √(x − 2).",
        "1. the square root needs a non-negative argument: x − 2 ≥ 0\n2. domain: x ≥ 2, i.e. [2, ∞)\n3. a square root is never negative, and every y ≥ 0 occurs as x = y² + 2\n4. range: [0, ∞)",
        "domain [2, ∞), range [0, ∞)",
      ],
      [
        "The 5th term of a geometric progression is 48 and the 8th term is 384. Find the first term and the common ratio.",
        "1. ar⁴ = 48 and ar⁷ = 384\n2. divide: r³ = 8 ⇒ r = 2\n3. then a(16) = 48 ⇒ a = 3\n4. check: 3, 6, 12, 24, 48 ✓",
        "a = 3, r = 2",
      ],
      [
        "If A = [[3, 2], [1, 1]], find A⁻¹ and verify that AA⁻¹ = I.",
        "1. det A = 3(1) − 2(1) = 1\n2. A⁻¹ = [[1, −2], [−1, 3]]/1 = [[1, −2], [−1, 3]]\n3. AA⁻¹ = [[3(1) + 2(−1), 3(−2) + 2(3)], [1(1) + 1(−1), 1(−2) + 1(3)]]\n4. = [[1, 0], [0, 1]] = I ✓",
        "A⁻¹ = [[1, −2], [−1, 3]] and AA⁻¹ = I",
      ],
      [
        "One root of x² + kx + 24 = 0 exceeds the other by 2. Find k.",
        "1. let the roots be α and α + 2\n2. product: α(α + 2) = 24 ⇒ α² + 2α − 24 = 0\n3. (α + 6)(α − 4) = 0 ⇒ α = 4 (or −6)\n4. roots 4 and 6, so sum = 10 = −k\n5. k = −10",
        "k = −10",
      ],
      [
        "Express (1 + i)/(1 − i) in the form a + ib and find its modulus.",
        "1. multiply by the conjugate: (1 + i)²/[(1 − i)(1 + i)]\n2. = (1 + 2i + i²)/2 = 2i/2\n3. = i = 0 + 1i\n4. |z| = √(0² + 1²) = 1",
        "z = 0 + i, |z| = 1",
      ],
      [
        "If A = {1, 2, 3} and B = {2, 3, 4}, find n(P(A ∩ B)).",
        "1. A ∩ B = {2, 3}, so it has 2 elements\n2. the power set of a set with n elements has 2ⁿ members\n3. n(P(A ∩ B)) = 2² = 4",
        "n(P(A ∩ B)) = 4",
      ],
    ],
    C: [
      [
        "Solve the system 2x + 3y = 12, x − y = 1 by Cramer's rule and check the answer.",
        "1. D = |2 3; 1 −1| = 2(−1) − 3(1) = −5\n2. Dx = |12 3; 1 −1| = −12 − 3 = −15\n3. Dy = |2 12; 1 1| = 2 − 12 = −10\n4. x = Dx/D = −15/−5 = 3, y = Dy/D = −10/−5 = 2\n5. check: 2(3) + 3(2) = 12 ✓ and 3 − 2 = 1 ✓\n6. D ≠ 0, so the solution is unique",
        "x = 3, y = 2",
      ],
      [
        "For y = x² − 4x + 3, (a) find the vertex, the intercepts and the axis of symmetry, (b) sketch the curve, (c) hence solve x² − 4x + 3 ≤ 0.",
        "1. y = (x − 2)² − 1 ⇒ vertex (2, −1), opening upward\n2. y = (x − 1)(x − 3) ⇒ x-intercepts 1 and 3\n3. x = 0 ⇒ y = 3; axis of symmetry x = 2\n4. the curve dips below the x-axis only between x = 1 and x = 3\n5. y ≤ 0 exactly on that interval",
        "vertex (2, −1); intercepts (1,0), (3,0), (0,3); axis x = 2; x² − 4x + 3 ≤ 0 for x ∈ [1, 3]",
      ],
      [
        "The sum of the first n terms of an arithmetic progression is 3n² + 5n. Find the first term, the common difference and the 10th term.",
        "1. t₁ = S₁ = 3 + 5 = 8\n2. S₂ = 12 + 10 = 22, and S₂ = t₁ + t₂ ⇒ t₂ = 14\n3. d = t₂ − t₁ = 6\n4. tₙ = Sₙ − Sₙ₋₁ = (3n² + 5n) − [3(n − 1)² + 5(n − 1)] = 6n + 2\n5. t₁₀ = 6(10) + 2 = 62\n6. check: S₁₀ = 3(100) + 50 = 350 and 10/2[2(8) + 9(6)] = 5(70) = 350 ✓",
        "a = 8, d = 6, t₁₀ = 62",
      ],
    ],
  },
];
