/**
 * Unit 7 — Computational Methods and Mechanics: NEB model paper, Set B (75 marks, 3 hours).
 */

export const PAPERS = [
  {
    unitNo: 7,
    title: "Unit 7 — Computational Methods and Mechanics",
    set: "B",
    note: "Set B checks the formulae rather than long tables: write the iteration, the rule or the equation of motion before substituting numbers.",
    A: [
      ["After n bisection steps the error is at most", ["(b − a)/n", "(b − a)/2ⁿ", "(b − a)²", "2ⁿ(b − a)"], 2, "the bracket halves each step"],
      ["Newton–Raphson fails at x₀ if", ["f(x₀) = 0", "f′(x₀) = 0", "f″(x₀) = 0", "x₀ = 0"], 2, "the tangent would be horizontal"],
      ["The error of Simpson's rule is proportional to", ["h", "h²", "h³", "h⁴"], 4, "error ≈ h⁴(b − a)f⁗/180"],
      ["In the trapezoidal rule the interior ordinates are multiplied by", ["1", "2", "3", "4"], 2, "only the end ordinates carry weight 1"],
      ["If forces P and Q act at angle θ, then R² equals", ["P² + Q²", "P² + Q² + 2PQcosθ", "P² + Q² − 2PQcosθ", "(P + Q)²"], 2, "the cosine-rule form"],
      ["Lami's theorem states that P/sin α equals", ["Q/sin β only", "Q/sin β = R/sin γ", "R cos γ", "PQ/R"], 2, "each force over the sine of the opposite angle"],
      ["A body moving with uniform velocity has acceleration", ["equal to v", "zero", "constant but non-zero", "equal to v²"], 2, "velocity does not change"],
      ["v² = u² + 2as holds for", ["uniform acceleration", "any motion", "circular motion only", "zero velocity"], 1, "it is derived for constant a"],
      ["The weight of a 10 kg mass (g = 10 m/s²) is", ["1 N", "10 N", "100 N", "1000 N"], 3, "W = mg"],
      ["The equilibrant is", ["equal and opposite to the resultant", "the same as the resultant", "always zero", "perpendicular to the resultant"], 1, "it cancels the resultant"],
      ["For x³ − 2 = 0 with x₀ = 1, one Newton step gives", ["1", "4/3", "3/2", "2"], 2, "1 − (−1)/3"],
    ],
    B: [
      [
        "Show that x³ + x − 1 = 0 has a root between 0 and 1.",
        "1. f(0) = −1\n2. f(1) = 1 + 1 − 1 = 1\n3. the signs differ and f is continuous",
        "a root lies in (0, 1)",
      ],
      [
        "Apply one Newton–Raphson step to x² − 3 = 0 from x₀ = 2.",
        "1. x₁ = (x₀ + 3/x₀)/2\n2. = (2 + 1.5)/2",
        "x₁ = 1.75",
      ],
      [
        "Estimate ∫₀¹ x dx by the trapezoidal rule with h = 0.5 and comment.",
        "1. ordinates 0, 0.5, 1\n2. T = (0.5/2)[0 + 1 + 2(0.5)]\n3. = 0.5, which is the exact value",
        "T = 0.5, exact — the rule is exact for linear functions",
      ],
      [
        "Estimate ∫₀² x³ dx by Simpson's rule with h = 1 and compare with the exact value.",
        "1. ordinates 0, 1, 8 with weights 1, 4, 1\n2. S = (1/3)[0 + 8 + 4(1)] = 4\n3. exact = [x⁴/4]₀² = 4",
        "S = 4, exactly the true value",
      ],
      [
        "Find the resultant of 8 N and 6 N acting at 60°.",
        "1. R² = 64 + 36 + 2(48)(0.5)\n2. = 100 + 48 = 148\n3. R = √148",
        "R = 2√37 ≈ 12.17 N",
      ],
      [
        "A body starts from rest with acceleration 2 m/s². Find the distance covered in the third second.",
        "1. s₃ = ½(2)(3)² = 9 m, s₂ = ½(2)(2)² = 4 m\n2. distance in the third second = 9 − 4\n3. = 5 m (also ½a(2n − 1) = 5)",
        "5 m",
      ],
      [
        "A ball is thrown vertically upward at 30 m/s (g = 10 m/s²). Find the greatest height.",
        "1. at the top v = 0: 0 = u² − 2gh\n2. h = u²/2g = 900/20",
        "h = 45 m",
      ],
      [
        "Two forces keep a body in equilibrium. What must be true of them?",
        "1. the resultant must be zero\n2. a zero resultant needs equal magnitudes in opposite directions\n3. they must act along the same line",
        "equal in magnitude, opposite in direction, same line of action",
      ],
    ],
    C: [
      [
        "Use Newton–Raphson twice, starting at x₀ = 2, to solve x³ − 2x − 3 = 0.",
        "1. f(x) = x³ − 2x − 3, f′(x) = 3x² − 2\n2. f(2) = 1, f′(2) = 10 ⇒ x₁ = 2 − 0.1 = 1.9\n3. f(1.9) = 6.859 − 3.8 − 3 = 0.059\n4. f′(1.9) = 10.83 − 2 = 8.83\n5. x₂ = 1.9 − 0.059/8.83 = 1.8933\n6. the root is 1.893 to three decimals",
        "x₂ ≈ 1.893 (root 1.8933…)",
      ],
      [
        "Estimate ∫₀¹ x³ dx with h = 0.5 by both rules and compare with the exact value.",
        "1. ordinates 0, 0.125, 1\n2. trapezoidal: (0.5/2)[0 + 1 + 2(0.125)] = 0.25(1.25) = 0.3125\n3. Simpson: (0.5/3)[0 + 1 + 4(0.125)] = (1/6)(1.5) = 0.25\n4. exact = [x⁴/4]₀¹ = 0.25\n5. the trapezoidal rule overshoots by 0.0625\n6. Simpson reproduces the cubic exactly",
        "trapezoidal 0.3125, Simpson 0.25, exact 0.25",
      ],
      [
        "(a) A weight of 60 N hangs from two strings that each make 30° with the vertical. Find the tension in each string.\n(b) A car accelerates from rest at 3 m/s² for 6 s, then brakes to rest in 27 m. Find the maximum speed, the retardation and the total time.",
        "1. (a) 2T cos30° = 60 ⇒ T = 60/(√3)\n2. T = 20√3 ≈ 34.6 N\n3. (b) v = 0 + 3(6) = 18 m/s\n4. braking: 0 = 324 + 2a(27) ⇒ a = −6 m/s²\n5. braking time: 0 = 18 − 6t ⇒ t = 3 s\n6. total time = 6 + 3 = 9 s",
        "(a) T = 20√3 ≈ 34.6 N in each string  (b) v = 18 m/s, retardation 6 m/s², total time 9 s",
      ],
    ],
  },
];
