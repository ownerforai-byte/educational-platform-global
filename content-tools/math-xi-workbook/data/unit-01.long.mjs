/**
 * Unit 1 — Algebra: full-length answers, one per chapter (one A4 page each).
 * Item shape: [question, [h1,h2,h3], work, answer, marks, topicIndex, kind, marking, pitfall]
 */

export const LONG = [
  {
    slug: "logic-and-sets",
    items: [
      [
        "In a survey of 120 students, 65 read Nepali, 55 read English and 30 read both.\n(a) Write the exclusive regions of the Venn diagram.\n(b) Find how many read at least one language and how many read neither.\n(c) Verify the result with the inclusion–exclusion formula.",
        [
          "Start from the overlap: 30 read both, so subtract 30 from each single count.",
          "\"At least one\" is the union — the sum of the three regions inside the circles.",
          "\"Neither\" is the whole class minus the union.",
        ],
        "Given: n(U) = 120, n(N) = 65, n(E) = 55, n(N ∩ E) = 30\nRequired: exclusive regions, n(N ∪ E), n((N ∪ E)′)\n\n1. only Nepali     = 65 − 30 = 35\n2. only English    = 55 − 30 = 25\n3. both            = 30\n4. n(N ∪ E)        = 35 + 30 + 25 = 90\n5. n((N ∪ E)′)     = 120 − 90 = 30\n6. check: n(N) + n(E) − n(N ∩ E) = 65 + 55 − 30 = 90 ✓",
        "90 students read at least one language; 30 read neither.",
        6,
        3,
        "Venn diagram",
        "regions 2 + 3 (b) + 1 + 1 (formula check) = 6",
        "Counting the 30 in both circles twice — the union is 65 + 55 − 30, never 65 + 55.",
      ],
    ],
  },
  {
    slug: "real-numbers-modulus",
    items: [
      [
        "Solve |x − 1| + |x + 2| = 5 by the critical-point method, and hence state the least possible value of |x − 1| + |x + 2|.",
        [
          "The moduli change behaviour at x = −2 and x = 1; split the number line there.",
          "On the middle piece the two distances add to exactly 3, independent of x.",
          "The least value is the distance between the two critical points.",
        ],
        "Given: |x − 1| + |x + 2| = 5, critical points −2 and 1\nRequired: the solution set and the minimum of the expression\n\n1. x < −2: −(x − 1) − (x + 2) = 5 ⇒ −2x − 1 = 5 ⇒ x = −3 ✓\n2. −2 ≤ x < 1: (1 − x) + (x + 2) = 3 ≠ 5 ⇒ no solution\n3. x ≥ 1: (x − 1) + (x + 2) = 5 ⇒ 2x + 1 = 5 ⇒ x = 2 ✓\n4. on [−2, 1] the expression is constantly 3 = |1 − (−2)|\n5. so the least value is 3, attained for every x in [−2, 1]",
        "x = −3 or x = 2; the least value of the expression is 3.",
        6,
        0,
        "Modulus equation",
        "case split 2 + two valid roots 2 + minimum argument 2 = 6",
        "Squaring both sides at once — it creates extraneous roots and hides the constant middle piece.",
      ],
    ],
  },
  {
    slug: "functions",
    items: [
      [
        "If f(x) = 2x + 1 and g(x) = x², then\n(a) find (g∘f)(x) and (f∘g)(x),\n(b) show that the two are not the same function,\n(c) find f⁻¹ and verify that f(f⁻¹(x)) = x.",
        [
          "(g∘f)(x) means g(f(x)) — substitute f into the squaring function.",
          "(f∘g)(x) means f(g(x)) — substitute x² into 2x + 1.",
          "For the inverse, write y = 2x + 1 and make x the subject.",
        ],
        "Given: f(x) = 2x + 1, g(x) = x²\nRequired: both compositions, their difference, f⁻¹ and its check\n\n1. (g∘f)(x) = g(2x + 1) = (2x + 1)² = 4x² + 4x + 1\n2. (f∘g)(x) = f(x²) = 2x² + 1\n3. at x = 1: 9 vs 3 ⇒ the functions differ\n4. y = 2x + 1 ⇒ x = (y − 1)/2 ⇒ f⁻¹(x) = (x − 1)/2\n5. f(f⁻¹(x)) = 2·(x − 1)/2 + 1 = x − 1 + 1 = x ✓\n6. domain and range of f are both ℝ, so f⁻¹ is defined on ℝ",
        "(g∘f)(x) = 4x² + 4x + 1, (f∘g)(x) = 2x² + 1 (not equal); f⁻¹(x) = (x − 1)/2 and f(f⁻¹(x)) = x.",
        6,
        1,
        "Composite and inverse",
        "each composition 1.5 + comparison 1 + inverse 1.5 + verification 1 = 6",
        "Writing f⁻¹(x) = 1/f(x). The inverse undoes the operation; it is never a reciprocal.",
      ],
    ],
  },
  {
    slug: "curve-sketching",
    items: [
      [
        "For y = x² − 2x − 3,\n(a) write the vertex form and state the vertex,\n(b) find all intercepts and the axis of symmetry,\n(c) describe the graph of y = |x² − 2x − 3| and say where it is not differentiable.",
        [
          "Complete the square for the x-terms: x² − 2x = (x − 1)² − 1.",
          "Factor the quadratic for the x-intercepts.",
          "The modulus reflects the part below the axis upward, creating corners at the roots.",
        ],
        "Given: y = x² − 2x − 3\nRequired: vertex form, intercepts, axis, the modulus graph and its corners\n\n1. y = (x − 1)² − 4 ⇒ vertex (1, −4), opening upward\n2. y = (x − 3)(x + 1) ⇒ x-intercepts −1 and 3\n3. x = 0 ⇒ y = −3, so the y-intercept is −3; axis of symmetry x = 1\n4. |y| keeps the branches outside [−1, 3] and folds the dip upward\n5. the folded graph has corners at x = −1 and x = 3 with different one-sided slopes\n6. hence |y| is continuous everywhere but not differentiable at x = −1, 3",
        "vertex (1, −4); intercepts (−1, 0), (3, 0), (0, −3); axis x = 1; the modulus graph has corners at x = −1 and x = 3 where it is not differentiable.",
        6,
        2,
        "Sketching",
        "vertex form 1.5 + intercepts 1.5 + axis and y-intercept 1 + modulus description 1 + corners 1 = 6",
        "Reflecting about the x-axis instead of folding the negative part up — |y| never goes below the axis.",
      ],
    ],
  },
  {
    slug: "sequence-and-series",
    items: [
      [
        "Three consecutive terms of a geometric progression have sum 26 and product 216.\n(a) Find the three terms, taking the common ratio to be less than 1.\n(b) Find the sum to infinity of the progression.",
        [
          "Symmetry pays: write the terms as a/r, a, ar so the product is simply a³.",
          "a³ = 216 gives a = 6; the sum then gives a quadratic in r.",
          "Divide by the larger root and use S∞ = a/(1 − r) for |r| < 1.",
        ],
        "Given: a/r + a + ar = 26, (a/r)(a)(ar) = 216\nRequired: the three terms with r < 1, then S∞\n\n1. product: a³ = 216 ⇒ a = 6\n2. sum: 6(1/r + 1 + r) = 26 ⇒ 6r² − 20r + 6 = 0 ⇒ 3r² − 10r + 3 = 0\n3. (3r − 1)(r − 3) = 0 ⇒ r = 1/3 or r = 3\n4. r < 1 ⇒ r = 1/3 ⇒ terms 18, 6, 2 (sum 26 ✓, product 216 ✓)\n5. first term a₁ = 18, so S∞ = a₁/(1 − r) = 18/(2/3) = 27",
        "the terms are 18, 6, 2 and the sum to infinity is 27.",
        6,
        1,
        "Geometric progression",
        "a from the product 1.5 + quadratic 2 + correct root and terms 1.5 + S∞ 1 = 6",
        "Using a, ar, ar² instead of a/r, a, ar — the product then needs an extra division and the algebra doubles.",
      ],
    ],
  },
  {
    slug: "matrices-and-determinants",
    items: [
      [
        "Let A = [[1, 2], [3, 5]].\n(a) Find A⁻¹.\n(b) Use it to solve x + 2y = 4, 3x + 5y = 11.\n(c) Verify that A² − 6A − I = 0.",
        [
          "det A = 1·5 − 2·3 = −1; the adjugate swaps 1 and 5 and negates 2 and 3.",
          "Write the system as AX = B and multiply by A⁻¹ on the left.",
          "For the verification, compute A² and 6A and subtract I.",
        ],
        "Given: A = [[1,2],[3,5]], system x + 2y = 4, 3x + 5y = 11\nRequired: A⁻¹, the solution, and the Cayley–Hamilton check\n\n1. det A = 5 − 6 = −1, adj A = [[5, −2], [−3, 1]]\n2. A⁻¹ = −[[5, −2], [−3, 1]] = [[−5, 2], [3, −1]]\n3. X = A⁻¹B = [[−5, 2], [3, −1]]·[[4], [11]] = [[−20 + 22], [12 − 11]] = [[2], [1]]\n4. check in the original: 2 + 2 = 4 ✓ and 6 + 5 = 11 ✓\n5. A² = [[7, 12], [18, 31]], 6A = [[6, 12], [18, 30]]\n6. A² − 6A = [[1, 0], [0, 1]] = I ⇒ A² − 6A − I = 0 ✓",
        "A⁻¹ = [[−5, 2], [3, −1]]; x = 2, y = 1; and A² − 6A − I = 0 is verified.",
        6,
        2,
        "Inverse and system",
        "inverse 2 + solution 2 + verification 2 = 6",
        "Forgetting the minus sign of det A = −1, which flips every entry of the adjugate.",
      ],
    ],
  },
  {
    slug: "quadratic-equations",
    items: [
      [
        "If α and β are the roots of 3x² − 6x + 4 = 0, then\n(a) form the equation whose roots are 1/α and 1/β,\n(b) find the value of α² + β²,\n(c) state the nature of the roots.",
        [
          "Read off α + β = 2 and αβ = 4/3 from the coefficients.",
          "For the new roots, build the new sum and product from the old ones, then clear fractions.",
          "α² + β² = (α + β)² − 2αβ; nature comes from the discriminant.",
        ],
        "Given: 3x² − 6x + 4 = 0 with roots α, β\nRequired: equation with roots 1/α, 1/β; α² + β²; nature of the roots\n\n1. α + β = 6/3 = 2, αβ = 4/3\n2. new sum = 1/α + 1/β = (α + β)/αβ = 2/(4/3) = 3/2\n3. new product = 1/(αβ) = 3/4\n4. equation: x² − (3/2)x + 3/4 = 0 ⇒ 4x² − 6x + 3 = 0\n5. α² + β² = (α + β)² − 2αβ = 4 − 8/3 = 4/3\n6. Δ = 36 − 4(3)(4) = −12 < 0 ⇒ two complex conjugate roots",
        "(a) 4x² − 6x + 3 = 0  (b) α² + β² = 4/3  (c) Δ = −12 < 0, so the roots are complex conjugates.",
        6,
        0,
        "Roots and coefficients",
        "new equation 2 + α² + β² 2 + nature 2 = 6",
        "Applying the quadratic formula to the new roots instead of using the symmetric sums — slower and error-prone.",
      ],
    ],
  },
  {
    slug: "complex-numbers",
    items: [
      [
        "For z = (2 + i)/(1 − i),\n(a) write z in the form a + ib,\n(b) find |z| and arg z,\n(c) verify that z·z̄ = |z|².",
        [
          "Multiply numerator and denominator by the conjugate 1 + i.",
          "The denominator becomes 1² + 1² = 2.",
          "|z| = √(a² + b²) and z z̄ = a² + b² identically.",
        ],
        "Given: z = (2 + i)/(1 − i)\nRequired: a + ib form, modulus, argument, and the identity z z̄ = |z|²\n\n1. z = (2 + i)(1 + i)/[(1 − i)(1 + i)] = (2 + 2i + i + i²)/2\n2. = (2 + 3i − 1)/2 = (1 + 3i)/2 = 1/2 + (3/2)i\n3. |z| = √((1/2)² + (3/2)²) = √(10/4) = √10/2\n4. a, b > 0 ⇒ first quadrant; arg z = tan⁻¹(3) ≈ 71.6°\n5. z z̄ = (1/2)² + (3/2)² = 10/4 = 5/2\n6. |z|² = (√10/2)² = 10/4 = 5/2 ✓",
        "z = 1/2 + (3/2)i; |z| = √10/2, arg z = tan⁻¹3 ≈ 71.6°; z z̄ = |z|² = 5/2.",
        6,
        0,
        "Modulus and argument",
        "a + ib form 2 + modulus 1.5 + argument 1 + identity 1.5 = 6",
        "Using arg z = tan⁻¹(−3/2) without checking the quadrant — the signs of a and b fix the quadrant.",
      ],
    ],
  },
];
