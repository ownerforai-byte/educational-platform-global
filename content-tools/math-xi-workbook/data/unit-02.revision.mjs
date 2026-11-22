/**
 * Unit 2 — Trigonometry: timed revision paper (24 questions, 50 marks, 45 minutes).
 * Item shape: [question, answer, marks]
 */

export const REVISION = [
  {
    unitNo: 2,
    title: "Unit 2 — Trigonometry: revision paper",
    minutes: 45,
    items: [
      ["Find sin(π/6).", "1/2.", 1],
      ["Find the principal value of sin⁻¹(1/2).", "π/6, the only value in [−π/2, π/2].", 1],
      ["Simplify sin²A + cos²A.", "1, for every angle A.", 1],
      ["Evaluate tan(π/4).", "1.", 1],
      ["State the range of cos⁻¹x.", "[0, π].", 1],
      ["Express sin 2A in terms of sin A and cos A.", "sin 2A = 2 sin A cos A.", 1],
      ["Is sin x one-one on [0, π]?", "No: sin(π/6) = sin(5π/6), so two angles share one value.", 1],
      ["Evaluate cos(2π/3).", "−1/2, in the second quadrant.", 1],
      ["State the period of tan x.", "π.", 1],
      ["Write the general solution of cos θ = cos α.", "θ = 2nπ ± α, n ∈ ℤ.", 1],
      [
        "Show that sin⁻¹x + cos⁻¹x = π/2.",
        "Let sin⁻¹x = θ, so sin θ = x and cos(π/2 − θ) = x. Both angles lie in [0, π/2], hence cos⁻¹x = π/2 − θ and the sum is π/2.",
        2,
      ],
      [
        "Evaluate tan⁻¹1 + tan⁻¹2 + tan⁻¹3.",
        "tan⁻¹2 + tan⁻¹3 = π + tan⁻¹((2 + 3)/(1 − 6)) = π − π/4 = 3π/4, since xy = 6 > 1. Adding tan⁻¹1 = π/4 gives π.",
        2,
      ],
      ["Express sin 5A − sin 3A as a product.", "2 cos 4A sin A.", 2],
      ["If sin A = 3/5 with A in the first quadrant, find sin 2A.", "cos A = 4/5, so sin 2A = 2(3/5)(4/5) = 24/25.", 2],
      ["Evaluate cos 75° using a compound angle.", "cos(45° + 30°) = (√6 − √2)/4 ≈ 0.2588.", 2],
      ["Solve sin θ = 1/2 in [0, 2π].", "θ = π/6 and θ = 5π/6.", 2],
      ["Without a calculator, find tan 15°.", "tan(45° − 30°) = (1 − 1/√3)/(1 + 1/√3) = 2 − √3.", 2],
      [
        "Show that tan⁻¹(1/2) + tan⁻¹(1/3) = π/4.",
        "The tangent of the sum is (1/2 + 1/3)/(1 − 1/6) = (5/6)/(5/6) = 1. Each angle is less than π/4, so their sum is exactly π/4.",
        2,
      ],
      ["If tan A = 3/4, find sin 2A.", "sin 2A = 2tanA/(1 + tan²A) = (3/2)/(25/16) = 24/25.", 2],
      ["Find the value of sin 18°.", "From 4sin²18° + 2sin18° − 1 = 0, sin 18° = (√5 − 1)/4 ≈ 0.309.", 2],
      [
        "Prove that sin 3A = 3 sin A − 4 sin³A.",
        "sin 3A = sin(2A + A) = sin2A cosA + cos2A sinA = 2sinA cos²A + sinA(1 − 2sin²A). Replacing cos²A by 1 − sin²A gives 2sinA − 2sin³A + sinA − 2sin³A = 3sinA − 4sin³A.",
        5,
      ],
      [
        "Solve 2sin²θ − 3sinθ + 1 = 0 in [0, 2π].",
        "(2sinθ − 1)(sinθ − 1) = 0, so sinθ = 1/2 gives θ = π/6, 5π/6 and sinθ = 1 gives θ = π/2. Three solutions.",
        5,
      ],
      [
        "Solve tan²θ = 3 in [0, 2π].",
        "tanθ = ±√3, so θ = π/3, 4π/3 (positive) and θ = 2π/3, 5π/3 (negative). Four solutions.",
        5,
      ],
      [
        "Find the general solution of sin 2θ = sin θ.",
        "sin2θ − sinθ = 2cos(3θ/2)sin(θ/2) = 0. So sin(θ/2) = 0 ⇒ θ = 2nπ, or cos(3θ/2) = 0 ⇒ θ = (2n + 1)π/3. Hence θ = 2nπ or (2n + 1)π/3, n ∈ ℤ.",
        5,
      ],
    ],
  },
];
