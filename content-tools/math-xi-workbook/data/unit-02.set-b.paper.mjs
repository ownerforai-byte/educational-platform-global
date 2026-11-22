/**
 * Unit 2 — Trigonometry: NEB model paper, Set B (75 marks, 3 hours).
 */

export const PAPERS = [
  {
    unitNo: 2,
    title: "Unit 2 — Trigonometry",
    set: "B",
    note: "Set B asks for more conversion into a single sine or cosine before solving; the general-solution questions still expect n ∈ ℤ.",
    A: [
      ["The value of cos⁻¹(0) is", ["0", "π/4", "π/2", "π"], 3, "cos(π/2) = 0"],
      ["tan⁻¹1 + tan⁻¹1 equals", ["π/4", "π/2", "π", "0"], 2, "π/4 + π/4"],
      ["The value of cos 75° is", ["(√6 + √2)/4", "(√6 − √2)/4", "(√3 + 1)/2", "(√3 − 1)/2"], 2, "cos(45° + 30°)"],
      ["If sin θ = 3/5 and θ is acute, then cos 2θ is", ["7/25", "−7/25", "24/25", "1/5"], 1, "1 − 2(9/25) = 7/25"],
      ["The general solution of cos θ = 0 is", ["θ = nπ", "θ = (2n + 1)π/2", "θ = 2nπ", "θ = nπ/2"], 2, "zeros of cosine sit at odd multiples of π/2"],
      ["The value of sin(−30°) is", ["1/2", "−1/2", "√3/2", "−√3/2"], 2, "sine is odd"],
      ["The maximum value of sin x + cos x is", ["1", "√2", "2", "2√2"], 2, "write it as √2 sin(x + 45°)"],
      ["tan(A − B) equals", ["(tanA − tanB)/(1 + tanAtanB)", "(tanA + tanB)/(1 − tanAtanB)", "(tanA − tanB)/(1 − tanAtanB)", "tanA − tanB"], 1, "replace B by −B in the addition formula"],
      ["cos²A − sin²A equals", ["1", "cos 2A", "sin 2A", "2cos 2A"], 2, "the double-angle identity"],
      ["The value of sin 90° is", ["0", "1/2", "1", "√3/2"], 3, "the maximum of sine"],
      ["The number of solutions of tan x = 1 in [0, 2π] is", ["1", "2", "3", "4"], 2, "x = π/4 and 5π/4"],
    ],
    B: [
      [
        "Using sin(A + B) = sinAcosB + cosAsinB, prove that sin 2A = 2sinAcosA.",
        "1. put B = A: sin(A + A) = sinAcosA + cosAsinA\n2. the two terms are equal\n3. = 2sinAcosA",
        "sin 2A = 2sinAcosA",
      ],
      [
        "Find the general solution of tan 2θ = √3.",
        "1. tan 2θ = √3 ⇒ 2θ = nπ + π/3\n2. divide by 2",
        "θ = nπ/2 + π/6, n ∈ ℤ",
      ],
      [
        "Prove that (1 − cos 2A)/sin 2A = tan A.",
        "1. 1 − cos2A = 2sin²A\n2. sin2A = 2sinAcosA\n3. the quotient = 2sin²A/(2sinAcosA)\n4. cancel 2sinA (A not a multiple of π)",
        "(1 − cos2A)/sin2A = tanA",
      ],
      [
        "If tan A = 1/2 and tan B = 1/3 with A, B acute, find A + B.",
        "1. tan(A + B) = (1/2 + 1/3)/(1 − 1/6)\n2. = (5/6)/(5/6) = 1\n3. both angles are acute, so A + B lies in (0, π)\n4. tan = 1 there only at π/4",
        "A + B = π/4",
      ],
      [
        "Prove that 2cos A cos B = cos(A + B) + cos(A − B), and evaluate 2cos 45° cos 15°.",
        "1. add cos(A + B) = cosAcosB − sinAsinB\n2. and cos(A − B) = cosAcosB + sinAsinB\n3. the sine terms cancel, giving 2cosAcosB\n4. 2cos45°cos15° = cos60° + cos30° = 1/2 + √3/2",
        "2cos45°cos15° = (1 + √3)/2",
      ],
      [
        "Find the value of sin 18°.",
        "1. let θ = 18°, so 5θ = 90° and 2θ = 90° − 3θ\n2. sin2θ = cos3θ\n3. 2sinθcosθ = 4cos³θ − 3cosθ\n4. divide by cosθ: 2sinθ = 4cos²θ − 3 = 4(1 − sin²θ) − 3\n5. 2sinθ = 1 − 4sin²θ ⇒ 4s² + 2s − 1 = 0, so s = (−2 + 2√5)/8\n6. sinθ is positive",
        "sin 18° = (√5 − 1)/4 ≈ 0.309",
      ],
      [
        "Solve sin θ + cos θ = √2 for θ ∈ [0, 2π].",
        "1. divide by √2: (1/√2)sinθ + (1/√2)cosθ = 1\n2. the left side is sin(θ + 45°)\n3. sin(θ + 45°) = 1 ⇒ θ + 45° = 90°\n4. θ = 45° in the given interval",
        "θ = π/4",
      ],
      [
        "Prove that tan⁻¹x + tan⁻¹(1/x) = π/2 for x > 0.",
        "1. let A = tan⁻¹x and B = tan⁻¹(1/x)\n2. tanA tanB = x(1/x) = 1\n3. tan(A + B) = (x + 1/x)/(1 − 1), which is undefined\n4. so A + B = π/2 (both angles lie in (0, π/2))",
        "tan⁻¹x + tan⁻¹(1/x) = π/2 for x > 0",
      ],
    ],
    C: [
      [
        "(a) Prove that sin 3A = 3sin A − 4sin³A.\n(b) If sin A = 1/3, find sin 3A.",
        "1. sin3A = sin(2A + A) = sin2AcosA + cos2AsinA\n2. = 2sinAcos²A + (1 − 2sin²A)sinA\n3. = 2sinA(1 − sin²A) + sinA − 2sin³A\n4. = 3sinA − 4sin³A\n5. sinA = 1/3 ⇒ sin3A = 3(1/3) − 4(1/27)\n6. = 1 − 4/27 = 23/27",
        "(a) sin3A = 3sinA − 4sin³A  (b) sin3A = 23/27",
      ],
      [
        "Solve 3tan²x − 1 = 0 for x ∈ [0, 2π].",
        "1. tan²x = 1/3 ⇒ tanx = ±1/√3\n2. tanx = 1/√3 ⇒ x = π/6, 7π/6\n3. tanx = −1/√3 ⇒ x = 5π/6, 11π/6\n4. all four lie in [0, 2π]\n5. check x = π/6: 3(1/3) − 1 = 0 ✓\n6. the four values are one per quadrant",
        "x = π/6, 5π/6, 7π/6, 11π/6",
      ],
      [
        "Prove that cos(A + B)cos(A − B) = cos²A − sin²B, and check the identity with A = 60°, B = 30°.",
        "1. cos(A + B) = cosAcosB − sinAsinB\n2. cos(A − B) = cosAcosB + sinAsinB\n3. product = cos²Acos²B − sin²Asin²B\n4. = cos²A(1 − sin²B) − (1 − cos²A)sin²B\n5. = cos²A − cos²A sin²B − sin²B + cos²A sin²B = cos²A − sin²B\n6. check: cos90°cos30° = 0 and cos²60° − sin²30° = 1/4 − 1/4 = 0 ✓",
        "cos(A + B)cos(A − B) = cos²A − sin²B, verified at A = 60°, B = 30°",
      ],
    ],
  },
];
