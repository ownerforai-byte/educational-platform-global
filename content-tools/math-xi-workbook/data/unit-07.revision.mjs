/**
 * Unit 7 — Computational Methods and Mechanics: timed revision paper.
 * Item shape: [question, answer, marks]
 */

export const REVISION = [
  {
    unitNo: 7,
    title: "Unit 7 — Computational Methods and Mechanics: revision paper",
    minutes: 45,
    items: [
      ["State the error bound after n bisection steps.", "(b − a)/2ⁿ.", 1],
      ["Write the Newton–Raphson formula.", "xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ).", 1],
      ["To what power of h is the trapezoidal error proportional?", "h².", 1],
      ["How many strips must Simpson's rule use?", "An even number.", 1],
      ["State Newton's third law.", "Action and reaction are equal in magnitude and opposite in direction.", 1],
      ["State the SI unit of force.", "The newton (N).", 1],
      ["What motion has zero acceleration?", "Uniform velocity — speed and direction do not change.", 1],
      ["Find the weight of a 5 kg mass (g = 10 m/s²).", "W = mg = 50 N.", 1],
      ["By what factor are interior ordinates multiplied in the trapezoidal rule?", "By 2.", 1],
      ["Which weights does Simpson's rule use?", "4 for odd ordinates and 2 for the even interior ones.", 1],
      [
        "For f(x) = x² − 2, evaluate f(1) and f(2) and say what the signs show.",
        "f(1) = −1 and f(2) = 2. The sign change across a continuous function means a root lies in (1, 2).",
        2,
      ],
      ["Apply one bisection step to [1, 2] and state the new bracket.", "Midpoint 1.5; f(1.5) = 0.25 > 0, so the root lies in [1, 1.5].", 2],
      ["Apply one Newton step from x₀ = 1 for x² − 2 = 0.", "x₁ = 1 − (−1)/2 = 1.5.", 2],
      ["Estimate ∫₀² x² dx by the trapezoidal rule with h = 1.", "(1/2)[0 + 4 + 2(1)] = 3.", 2],
      ["Estimate the same integral by Simpson's rule with h = 1.", "(1/3)[0 + 4 + 4(1)] = 8/3 ≈ 2.67, which matches the exact value.", 2],
      ["Find the resultant of 3 N and 4 N acting at right angles.", "√(9 + 16) = 5 N.", 2],
      ["Find the resultant of two 10 N forces at 120°.", "R² = 100 + 100 + 2(100)(−1/2) = 100, so R = 10 N.", 2],
      ["A body starts from rest with a = 4 m/s². Find its speed after 3 s.", "v = 0 + 4(3) = 12 m/s.", 2],
      ["Find the distance it covers in those 3 s.", "s = ½(4)(9) = 18 m.", 2],
      ["State Lami's theorem.", "For three concurrent forces in equilibrium, P/sin α = Q/sin β = R/sin γ, where each angle is opposite its force.", 2],
      [
        "Use the bisection method twice on x³ − 2x − 5 = 0 over [2, 3].",
        "f(2) = −1 and f(3) = 16. x₁ = 2.5 with f = 5.625 > 0, so [2, 2.5]; x₂ = 2.25 with f ≈ 1.89 > 0, so [2, 2.25]. The root is about 2.09.",
        5,
      ],
      [
        "Use two Newton–Raphson steps from x₀ = 2 on x³ − 2x − 5 = 0.",
        "f′(x) = 3x² − 2. x₁ = 2 − (−1)/10 = 2.1; f(2.1) = 0.061 and f′(2.1) = 11.23, so x₂ = 2.1 − 0.0054 ≈ 2.0946.",
        5,
      ],
      [
        "A 20 N weight hangs from two strings each making 45° with the vertical. Find the tension.",
        "2T cos 45° = 20 ⇒ T = 20/(2 × 0.7071) = 10√2 ≈ 14.1 N in each string.",
        5,
      ],
      [
        "A car accelerates from rest at 2.5 m/s² for 8 s, then brakes to rest in 40 m. Find the retardation, the total distance and the total time.",
        "Top speed v = 2.5(8) = 20 m/s. Braking: 0 = 400 + 2a(40) ⇒ a = −5 m/s², taking 4 s. Distances: ½(2.5)(64) = 80 m plus 40 m, so 120 m in 12 s.",
        5,
      ],
    ],
  },
];
