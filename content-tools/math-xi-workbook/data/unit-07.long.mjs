/**
 * Unit 7 — Computational Methods and Mechanics: full-length answers, one per chapter.
 * Item shape: [question, [h1,h2,h3], work, answer, marks, topicIndex, kind, marking, pitfall]
 */

export const LONG = [
  {
    slug: "bisection-method",
    items: [
      [
        "The equation x³ − 2x − 5 = 0 has a root in [2, 3].\n(a) Perform three bisection steps.\n(b) State the bracket after each step and the maximum error after the third step.",
        [
          "f(2) = −1 and f(3) = 16, so the sign change is confirmed.",
          "Take the midpoint, evaluate f, and keep the half where the sign change survives.",
          "After n steps the error is at most width/2ⁿ.",
        ],
        "Given: f(x) = x³ − 2x − 5, bracket [2, 3]\nRequired: three bisection steps, the final bracket, the error bound\n\n1. f(2) = 8 − 4 − 5 = −1, f(3) = 27 − 6 − 5 = 16 ⇒ root in (2, 3)\n2. x₁ = 2.5, f = 15.625 − 5 − 5 = 5.625 > 0 ⇒ [2, 2.5]\n3. x₂ = 2.25, f = 11.3906 − 4.5 − 5 = 1.8906 > 0 ⇒ [2, 2.25]\n4. x₃ = 2.125, f = 9.5957 − 4.25 − 5 = 0.3457 > 0 ⇒ [2, 2.125]\n5. error bound after 3 steps: 1/2³ = 0.125\n6. estimate of the root: x₄ ≈ 2.0625, close to the true root 2.0946",
        "brackets [2, 2.5] → [2, 2.25] → [2, 2.125]; maximum error 0.125 and root ≈ 2.06 (true value 2.0946).",
        6,
        1,
        "Iteration",
        "sign check 1 + three steps 4.5 + error bound 0.5 = 6",
        "Keeping the half with the same sign at both ends. The bracket must always straddle the sign change.",
      ],
    ],
  },
  {
    slug: "newton-raphson-method",
    items: [
      [
        "Use the Newton–Raphson method with x₀ = 2 to find the root of x³ − 2x − 5 = 0 correct to three decimal places.\n(a) State the iteration formula.\n(b) Perform two iterations and comment on the speed of convergence.",
        [
          "f′(x) = 3x² − 2, and x₁ = x₀ − f(x₀)/f′(x₀).",
          "f(2) = −1 and f′(2) = 10.",
          "Compare with the three bisection steps needed for the same accuracy.",
        ],
        "Given: f(x) = x³ − 2x − 5, x₀ = 2\nRequired: the iteration formula, two steps, and a note on convergence\n\n1. xₙ₊₁ = xₙ − (xₙ³ − 2xₙ − 5)/(3xₙ² − 2)\n2. x₁ = 2 − (−1)/10 = 2.1\n3. f(2.1) = 9.261 − 4.2 − 5 = 0.061; f′(2.1) = 13.23 − 2 = 11.23\n4. x₂ = 2.1 − 0.061/11.23 = 2.1 − 0.00543 = 2.09457\n5. x₂ = 2.095 to three decimals, matching the true root 2.09455\n6. two steps beat three bisection steps, and each further step roughly doubles the correct digits",
        "xₙ₊₁ = xₙ − (xₙ³ − 2xₙ − 5)/(3xₙ² − 2); x₁ = 2.1, x₂ ≈ 2.0946, so the root is 2.095 (three decimals) after two steps — quadratic convergence.",
        6,
        1,
        "Iteration",
        "formula 1.5 + x₁ 1 + x₂ 2 + comment 1.5 = 6",
        "Starting where f′ is small. Newton's method fails or wanders when the tangent is nearly horizontal.",
      ],
    ],
  },
  {
    slug: "trapezoidal-rule",
    items: [
      [
        "Estimate ∫₀¹ dx/(1 + x²) with the trapezoidal rule using (a) h = 0.5 and (b) h = 0.25, and compare both with the exact value π/4.",
        [
          "Ordinates for h = 0.5: 1, 0.8, 0.5.",
          "For h = 0.25 you need five ordinates; the middle three are doubled.",
          "Compare each error with the exact 0.785398.",
        ],
        "Given: ∫₀¹ dx/(1 + x²), exact π/4 = 0.785398\nRequired: both trapezoidal estimates and their errors\n\n1. h = 0.5: y = 1, 0.8, 0.5 ⇒ T = 0.25[1 + 0.5 + 2(0.8)] = 0.25(3.1)\n2. T₁ = 0.7750, error = 0.01040\n3. h = 0.25: y = 1, 0.94118, 0.8, 0.64, 0.5\n4. middle sum = 0.94118 + 0.8 + 0.64 = 2.38118\n5. T₂ = 0.125[1.5 + 4.76236] = 0.125(6.26236) = 0.78280, error = 0.00260\n6. halving h cut the error by a factor of 4 — the h² behaviour of the rule",
        "(a) 0.7750 (error 0.0104)  (b) 0.7828 (error 0.0026); the error falls by a factor of 4 when h is halved.",
        6,
        1,
        "Two values of h",
        "h = 0.5 estimate 1.5 + h = 0.25 estimate 2.5 + error comparison 2 = 6",
        "Doubling the first and last ordinates. Only the interior ordinates carry the factor 2.",
      ],
    ],
  },
  {
    slug: "simpson-rule",
    items: [
      [
        "Estimate ∫₀¹ dx/(1 + x) by Simpson's rule with h = 0.5 and h = 0.25, and compare with ln 2 = 0.693147.",
        [
          "Simpson needs an even number of strips: h = 0.5 gives 2 strips and h = 0.25 gives 4.",
          "Weights go 1, 4, 2, 4, 1 and the multiplier is h/3.",
          "For h = 0.5 the ordinates are 1, 0.66667, 0.5.",
        ],
        "Given: ∫₀¹ dx/(1 + x) = ln 2 = 0.693147\nRequired: two Simpson estimates and their errors\n\n1. h = 0.5: S = (0.5/3)[1 + 0.5 + 4(0.66667)]\n2. = 0.16667 × 4.16667 = 0.69444, error 0.00130\n3. h = 0.25: y = 1, 0.8, 0.66667, 0.57143, 0.5\n4. S = (0.25/3)[1 + 0.5 + 4(0.8 + 0.57143) + 2(0.66667)]\n5. = 0.08333 × 8.31905 = 0.69326, error 0.00011\n6. the same h = 0.5 gives error 0.0013 for Simpson against 0.0026 for the trapezoidal rule, and the halving factor is about 12",
        "(a) 0.69444 (error 0.0013)  (b) 0.69326 (error 0.0001); Simpson is far more accurate than the trapezoidal rule for the same h.",
        6,
        1,
        "Two values of h",
        "each estimate 2 + comparison 2 = 6",
        "Using an odd number of strips. Simpson's rule is undefined there — always pair the strips.",
      ],
    ],
  },
  {
    slug: "statics-forces",
    items: [
      [
        "Two forces of 8 N and 6 N act at right angles at a point.\n(a) Find the magnitude and direction of the resultant.\n(b) Find the force that keeps the system in equilibrium.\n(c) Resolve the 8 N force along and perpendicular to the 6 N force.",
        [
          "For perpendicular forces R = √(P² + Q²).",
          "The direction is tan α = Q/P measured from the larger force.",
          "The equilibrant equals the resultant in magnitude but opposite in direction.",
        ],
        "Given: P = 8 N, Q = 6 N, angle 90°\nRequired: resultant, its direction, the equilibrant, and a resolution\n\n1. R = √(64 + 36) = √100 = 10 N\n2. tan α = 6/8 = 0.75 ⇒ α = 36.87° from the 8 N force\n3. the resultant bisects nothing here — it is 36.87° from 8 N and 53.13° from 6 N\n4. equilibrant: 10 N at 180° + 36.87° = 216.87° from the 8 N force\n5. resolution along the 6 N force: 8cos90° = 0; perpendicular: 8sin90° = 8 N\n6. so the 8 N force has no component along the 6 N force at all",
        "(a) R = 10 N at 36.87° to the 8 N force  (b) the equilibrant is 10 N opposite to the resultant  (c) 0 along and 8 N perpendicular to the 6 N force.",
        6,
        1,
        "Resultant and equilibrant",
        "magnitude 1.5 + direction 1.5 + equilibrant 1.5 + resolution 1.5 = 6",
        "Giving the equilibrant the same direction as the resultant — equilibrium requires the opposite sense.",
      ],
    ],
  },
  {
    slug: "dynamics-kinematics",
    items: [
      [
        "A car accelerates uniformly from 10 m/s to 30 m/s in 8 s, then brakes to rest in a further 40 m.\n(a) Find the acceleration in the first stage and the distance covered.\n(b) Find the retardation in the second stage.\n(c) Find the total time taken.",
        [
          "Use v = u + at for the acceleration, then s = ut + ½at² for the distance.",
          "For braking, v = 0 and v² = u² + 2as with u = 30, s = 40.",
          "The braking time follows from v = u + at with the new acceleration.",
        ],
        "Given: stage 1 u = 10, v = 30, t = 8; stage 2 u = 30, v = 0, s = 40\nRequired: a₁, s₁, a₂ (retardation), total time\n\n1. a₁ = (30 − 10)/8 = 2.5 m/s²\n2. s₁ = 10(8) + ½(2.5)(64) = 80 + 80 = 160 m\n3. stage 2: 0 = 900 + 2a₂(40) ⇒ a₂ = −900/80 = −11.25 m/s²\n4. retardation 11.25 m/s²\n5. braking time: 0 = 30 − 11.25t ⇒ t = 30/11.25 = 2.67 s\n6. total time = 8 + 2.67 ≈ 10.67 s over 200 m",
        "(a) a₁ = 2.5 m/s², s₁ = 160 m  (b) retardation 11.25 m/s²  (c) total time ≈ 10.7 s.",
        6,
        2,
        "Two stages",
        "a₁ 1 + s₁ 1.5 + retardation 1.5 + braking time 1 + total 1 = 6",
        "Using the first stage's acceleration in the second stage, or treating braking distance as if the car still sped up.",
      ],
    ],
  },
];
