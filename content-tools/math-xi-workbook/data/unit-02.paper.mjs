/**
 * Unit 2 — Trigonometry: NEB model paper (75 marks, 3 hours).
 * A: [question, [4 options], answerIndex, why?] · B/C: [question, worked answer, answer line]
 */

export const PAPERS = [
  {
    unitNo: 2,
    title: "Unit 2 — Trigonometry",
    note: "Group B rewards the identity or the general solution in one clean line; Group C needs the proof written out step by step, with n ∈ ℤ stated for every general solution.",
    A: [
      ["The value of sin⁻¹(1) is", ["π/6", "π/4", "π/2", "π"], 3, "sin(π/2) = 1"],
      ["tan⁻¹(½) + tan⁻¹(⅓) equals", ["π/6", "π/4", "π/3", "π/2"], 2, "tan sum = (1/2 + 1/3)/(1 − 1/6) = 1"],
      ["The value of sin 75° is", ["(√6 − √2)/4", "(√6 + √2)/4", "(√3 + 1)/2", "(√3 − 1)/2"], 2, "sin(45° + 30°)"],
      ["If cos θ = 3/5, then sin 2θ is", ["7/25", "24/25", "12/25", "6/5"], 2, "sinθ = 4/5, so 2(4/5)(3/5) = 24/25"],
      ["The general solution of sin θ = 0 is", ["θ = nπ/2", "θ = nπ", "θ = 2nπ", "θ = (2n + 1)π"], 2, "sin θ vanishes at every multiple of π"],
      ["The value of cos 120° is", ["1/2", "−1/2", "√3/2", "−√3/2"], 2, "cos(180° − 60°) = −cos 60°"],
      ["The period of sin 3x is", ["2π", "π", "2π/3", "3π"], 3, "period = 2π/3"],
      ["The value of tan 60° · tan 30° is", ["1", "√3", "1/√3", "3"], 1, "√3 · (1/√3) = 1"],
      ["The number of solutions of sin x = 1/2 in [0, 2π] is", ["1", "2", "3", "4"], 2, "x = π/6 and 5π/6"],
      ["sin²A − sin²B equals", ["sin(A + B)sin(A − B)", "cos(A + B)cos(A − B)", "sin(A + B)cos(A − B)", "cos(A + B)sin(A − B)"], 1, "factorise as (sinA + sinB)(sinA − sinB)"],
      ["The value of tan⁻¹(√3) is", ["π/6", "π/4", "π/3", "2π/3"], 3, "tan(π/3) = √3"],
    ],
    B: [
      [
        "Prove that cos 2A = 2cos²A − 1 and use it to find cos 120° from cos 60°.",
        "1. cos2A = cos(A + A) = cosAcosA − sinAsinA\n2. = cos²A − sin²A = cos²A − (1 − cos²A)\n3. = 2cos²A − 1\n4. cos60° = 1/2 ⇒ cos120° = 2(1/4) − 1",
        "cos 2A = 2cos²A − 1 and cos 120° = −1/2",
      ],
      [
        "Solve sin 2θ = sin θ for 0 ≤ θ ≤ π.",
        "1. 2sinθcosθ − sinθ = 0\n2. sinθ(2cosθ − 1) = 0\n3. sinθ = 0 ⇒ θ = 0, π\n4. cosθ = 1/2 ⇒ θ = π/3\n5. all three lie in [0, π]",
        "θ = 0, π/3, π",
      ],
      [
        "Prove that tan(A + B) = (tan A + tan B)/(1 − tan A tan B) and hence find tan 75°.",
        "1. tan(A + B) = sin(A + B)/cos(A + B)\n2. = (sinAcosB + cosAsinB)/(cosAcosB − sinAsinB)\n3. divide every term by cosAcosB\n4. = (tanA + tanB)/(1 − tanAtanB)\n5. tan75° = tan(45° + 30°) = (1 + 1/√3)/(1 − 1/√3)\n6. = (√3 + 1)/(√3 − 1) = 2 + √3",
        "tan(A + B) = (tanA + tanB)/(1 − tanAtanB); tan 75° = 2 + √3",
      ],
      [
        "Find the general solution of 2cos²θ + sin θ − 2 = 0.",
        "1. 2(1 − sin²θ) + sinθ − 2 = 0\n2. −2sin²θ + sinθ = 0 ⇒ sinθ(1 − 2sinθ) = 0\n3. sinθ = 0 ⇒ θ = nπ\n4. sinθ = 1/2 ⇒ θ = nπ + (−1)ⁿ π/6",
        "θ = nπ or θ = nπ + (−1)ⁿ π/6, n ∈ ℤ",
      ],
      [
        "Prove that (1 + cos A)/sin A = cot(A/2).",
        "1. 1 + cosA = 2cos²(A/2) and sinA = 2sin(A/2)cos(A/2)\n2. the quotient is [2cos²(A/2)]/[2sin(A/2)cos(A/2)]\n3. cancel 2cos(A/2)\n4. = cos(A/2)/sin(A/2) = cot(A/2)",
        "(1 + cos A)/sin A = cot(A/2)",
      ],
      [
        "If sin x = 2/3 with x acute, find tan(x/2).",
        "1. cosx = √(1 − 4/9) = √5/3\n2. tan(x/2) = sinx/(1 + cosx)\n3. = (2/3)/(1 + √5/3) = 2/(3 + √5)\n4. rationalise: 2(3 − √5)/(9 − 5) = (3 − √5)/2",
        "tan(x/2) = (3 − √5)/2 ≈ 0.382",
      ],
      [
        "Solve tan⁻¹(3x) = π/4.",
        "1. take tan of both sides: 3x = tan(π/4) = 1\n2. x = 1/3\n3. 3x = 1 lies in the principal range, so the solution is admissible",
        "x = 1/3",
      ],
      [
        "Prove that sin 20° sin 40° sin 80° = √3/8.",
        "1. 2sin20°sin40° = cos20° − cos60° = cos20° − 1/2\n2. multiply sin80°: (cos20° − 1/2)sin80°/2\n3. 2sin80°cos20° = sin100° + sin60° = sin80° + √3/2\n4. so the value is [sin80° + √3/2 − sin80°]/4\n5. = (√3/2)/4",
        "sin 20° sin 40° sin 80° = √3/8",
      ],
    ],
    C: [
      [
        "Prove that (1 + sin A − cos A)/(1 + sin A + cos A) = tan(A/2).",
        "1. write 1 − cosA = 2sin²(A/2) and 1 + cosA = 2cos²(A/2), sinA = 2sin(A/2)cos(A/2)\n2. numerator = 2sin²(A/2) + 2sin(A/2)cos(A/2)\n3. = 2sin(A/2)[sin(A/2) + cos(A/2)]\n4. denominator = 2cos²(A/2) + 2sin(A/2)cos(A/2)\n5. = 2cos(A/2)[cos(A/2) + sin(A/2)]\n6. the bracket cancels, leaving sin(A/2)/cos(A/2) = tan(A/2)",
        "(1 + sinA − cosA)/(1 + sinA + cosA) = tan(A/2)",
      ],
      [
        "Solve 2sin²x − 3cos x = 0 for x ∈ [0, 2π], showing every solution.",
        "1. replace sin²x by 1 − cos²x: 2 − 2cos²x − 3cosx = 0\n2. 2cos²x + 3cosx − 2 = 0\n3. (2cosx − 1)(cosx + 2) = 0\n4. cosx = 1/2 or cosx = −2\n5. the second is impossible since |cosx| ≤ 1\n6. cosx = 1/2 ⇒ x = π/3, 5π/3 in [0, 2π]",
        "x = π/3 and x = 5π/3",
      ],
      [
        "(a) Prove that tan 2A = 2tan A/(1 − tan²A).\n(b) If tan A = 3/4, find tan 2A and state its quadrant.",
        "1. tan2A = tan(A + A) = (tanA + tanA)/(1 − tanA·tanA)\n2. = 2tanA/(1 − tan²A)\n3. tanA = 3/4 ⇒ tan2A = (3/2)/(1 − 9/16)\n4. = (3/2)/(7/16) = 24/7\n5. tan2A > 0 with A acute gives 2A in the first quadrant\n6. check: A ≈ 36.87° ⇒ 2A ≈ 73.74°, and tan 73.74° ≈ 3.43 = 24/7 ✓",
        "tan 2A = 2tanA/(1 − tan²A); with tanA = 3/4, tan2A = 24/7 (first quadrant)",
      ],
    ],
  },
];
