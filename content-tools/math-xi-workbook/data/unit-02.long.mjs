/**
 * Unit 2 — Trigonometry: full-length answers, one per chapter.
 * Item shape: [question, [h1,h2,h3], work, answer, marks, topicIndex, kind, marking, pitfall]
 */

export const LONG = [
  {
    slug: "inverse-circular-functions",
    items: [
      [
        "Solve tan⁻¹(2x) + tan⁻¹(3x) = π/4, stating clearly which roots are acceptable and why.",
        [
          "Apply the addition formula: tan(sum) = (2x + 3x)/(1 − 6x²).",
          "Set it equal to tan(π/4) = 1 and clear the denominator.",
          "For the formula to hold with a positive sum we need 6x² < 1 — test each root.",
        ],
        "Given: tan⁻¹(2x) + tan⁻¹(3x) = π/4\nRequired: all admissible x, with justification\n\n1. tan(sum) = (2x + 3x)/(1 − 6x²) = 5x/(1 − 6x²)\n2. 5x/(1 − 6x²) = 1 ⇒ 5x = 1 − 6x² ⇒ 6x² + 5x − 1 = 0\n3. (6x − 1)(x + 1) = 0 ⇒ x = 1/6 or x = −1\n4. condition: the formula needs 1 − 6x² > 0, i.e. |x| < 1/√6\n5. x = 1/6: 6x² = 1/6 < 1 ✓ ; x = −1: 1 − 6 = −5 < 0 ✗ (the sum would be negative)\n6. verify x = 1/6: tan⁻¹(1/3) + tan⁻¹(1/2) = π/4 ✓",
        "x = 1/6 only; x = −1 is rejected because it makes 1 − 6x² negative, so the sum lies outside (0, π/2).",
        6,
        3,
        "Inverse equation",
        "formula and quadratic 2.5 + both roots 1.5 + admissibility test 1.5 + check 0.5 = 6",
        "Keeping both roots. The addition formula only holds on the branch where 1 − xy > 0; always test it.",
      ],
    ],
  },
  {
    slug: "combination-formulae",
    items: [
      [
        "If sin A + cos A = 1/2, find (a) sin 2A and (b) sin³A + cos³A.",
        [
          "Square the given equation: sin²A + 2sinAcosA + cos²A = 1/4.",
          "sin²A + cos²A = 1, so 2sinAcosA = sin 2A is immediate.",
          "For the cubes use x³ + y³ = (x + y)(x² − xy + y²) with xy = sinAcosA.",
        ],
        "Given: sinA + cosA = 1/2\nRequired: sin2A and sin³A + cos³A\n\n1. square: (sinA + cosA)² = 1 + sin2A = 1/4\n2. sin2A = 1/4 − 1 = −3/4\n3. sinAcosA = (sin2A)/2 = −3/8\n4. sin³A + cos³A = (sinA + cosA)(sin²A − sinAcosA + cos²A)\n5. = (1/2)(1 − (−3/8)) = (1/2)(11/8)\n6. = 11/16",
        "(a) sin 2A = −3/4  (b) sin³A + cos³A = 11/16.",
        6,
        1,
        "Double angle",
        "squaring step 1.5 + sin2A 1.5 + identity for cubes 1.5 + substitution 1.5 = 6",
        "Writing sin²A + cos²A = 2, or losing the negative sign of sin2A after squaring.",
      ],
    ],
  },
  {
    slug: "general-values",
    items: [
      [
        "Solve cos 2θ + 3 cos θ + 2 = 0 completely, and list the solutions that lie in [0, 2π].",
        [
          "Replace cos2θ by 2cos²θ − 1 so the equation involves only cosθ.",
          "The result 2cos²θ + 3cosθ + 1 = 0 factorises as (2cosθ + 1)(cosθ + 1).",
          "Write each family, then pick the members inside one revolution.",
        ],
        "Given: cos2θ + 3cosθ + 2 = 0\nRequired: the general solution and the members in [0, 2π]\n\n1. 2cos²θ − 1 + 3cosθ + 2 = 0 ⇒ 2cos²θ + 3cosθ + 1 = 0\n2. (2cosθ + 1)(cosθ + 1) = 0 ⇒ cosθ = −1/2 or cosθ = −1\n3. cosθ = −1/2 = cos(2π/3) ⇒ θ = 2nπ ± 2π/3\n4. cosθ = −1 = cos π ⇒ θ = (2n + 1)π\n5. in [0, 2π]: 2π/3, 4π/3 from the first family and π from the second\n6. check θ = 2π/3: cos(4π/3) + 3cos(2π/3) + 2 = −1/2 − 3/2 + 2 = 0 ✓",
        "θ = 2nπ ± 2π/3 or θ = (2n + 1)π, n ∈ ℤ; in [0, 2π] the solutions are 2π/3, π, 4π/3.",
        6,
        3,
        "Reducible to quadratic",
        "reduction 1.5 + factorisation 1.5 + two families 2 + interval list 1 = 6",
        "Writing cosθ = −1/2 ⇒ θ = 2nπ + 2π/3 and dropping the second branch 2nπ − 2π/3.",
      ],
    ],
  },
  {
    slug: "interval-equations",
    items: [
      [
        "Solve 2sin²x − 3sin x + 1 = 0 for x ∈ [0, 2π], and explain how the number of solutions matches the oscillation of the graph.",
        [
          "Treat the equation as a quadratic in sin x and factor it.",
          "sin x = 1 and sin x = 1/2 give different numbers of solutions in one revolution.",
          "Count how many times each horizontal level is crossed in [0, 2π].",
        ],
        "Given: 2sin²x − 3sinx + 1 = 0, x ∈ [0, 2π]\nRequired: all solutions and a graph-based check\n\n1. (2sinx − 1)(sinx − 1) = 0 ⇒ sinx = 1/2 or sinx = 1\n2. sinx = 1/2 ⇒ x = π/6, 5π/6\n3. sinx = 1 ⇒ x = π/2 (a single point of the wave)\n4. the line y = 1/2 cuts the sine wave twice per revolution; y = 1 touches it once\n5. so 2 + 1 = 3 solutions\n6. check x = 5π/6: 2(1/4) − 3(1/2) + 1 = 1/2 − 3/2 + 1 = 0 ✓",
        "x = π/6, π/2, 5π/6 — three solutions, matching two crossings for sinx = 1/2 and one touch for sinx = 1.",
        6,
        1,
        "Quadratic in range",
        "factorisation 2 + solutions from 1/2 2 + solution from 1 1 + graph reasoning 1 = 6",
        "Writing x = π/6 only for sinx = 1/2, or inventing a second solution for sinx = 1.",
      ],
    ],
  },
];
