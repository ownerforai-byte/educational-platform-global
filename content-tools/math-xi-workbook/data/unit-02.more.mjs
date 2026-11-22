/**
 * Unit 2 — Trigonometry, second sheet: 12 questions per chapter in other formats.
 * Item shape: [question, working, answer, topicIndex, marks, typeLabel]
 */

export const EXTENSIONS = [
  {
    slug: "inverse-circular-functions",
    items: [
      ["sin⁻¹(−√3/2) = (A) −π/3 (B) 4π/3 (C) −π/6 (D) 5π/3.", "The principal range is [−π/2, π/2].", "A — −π/3", 0, 1, "MCQ"],
      ["cos⁻¹ 0 = (A) 0 (B) π/2 (C) π (D) undefined.", "cos(π/2) = 0 and π/2 ∈ [0, π]", "B — π/2", 0, 1, "MCQ"],
      ["tan⁻¹1 + tan⁻¹2 + tan⁻¹3 = (A) π/2 (B) π (C) 3π/4 (D) 2π.", "tan⁻¹2 + tan⁻¹3 = 3π/4, then + π/4", "B — π", 1, 1, "MCQ"],
      ["True or false: sin⁻¹x + cos⁻¹x = π/2 for −1 ≤ x ≤ 1.", "Both angles are complementary.", "True", 1, 1, "True/False"],
      ["True or false: sin⁻¹(sin θ) = θ for every real θ.", "Try θ = 5π/6.", "False — it holds only when θ lies in the principal range", 2, 1, "True/False"],
      ["The principal range of cos⁻¹ is ______.", "Chosen so that cosine is one-one there.", "[0, π]", 0, 1, "Fill in"],
      ["tan⁻¹x + cot⁻¹x = ______ for every real x.", "The two angles are complementary.", "π/2", 1, 1, "Fill in"],
      ["A student writes sin⁻¹(sin 5π/6) = 5π/6. Correct it.", "sin 5π/6 = 1/2; the principal value must lie in [−π/2, π/2].", "sin⁻¹(sin 5π/6) = π/6", 2, 2, "Spot the error"],
      ["Assertion: tan⁻¹(1/x) = π/2 − tan⁻¹x for x > 0. Reason: the two angles are complementary.", "tan θ·tan(π/2 − θ) = 1.", "Both true, and the reason proves it", 1, 2, "Assertion–reason"],
      ["Why must the domain of sin be restricted before sin⁻¹ is defined?", "An inverse needs a one-one function.", "Because sine repeats, so only a restricted branch can be inverted", 3, 2, "Explain"],
      ["Match (i) tan⁻¹1, (ii) cos⁻¹(−1) with (a) π, (b) π/4.", "Use the principal ranges.", "(i) → (b), (ii) → (a)", 0, 2, "Match"],
      ["A ladder angle satisfies θ = sin⁻¹(3/5). Find cos θ.", "The angle is acute, so cos θ = √(1 − 9/25)", "4/5", 3, 3, "Word problem"],
    ],
  },
  {
    slug: "combination-formulae",
    items: [
      ["cos 2A equals (A) 2cos²A − 1 (B) 1 − 2cos²A (C) 2sin²A − 1 (D) 1 + 2sin²A.", "Put B = A in cos(A + B).", "A — 2cos²A − 1", 1, 1, "MCQ"],
      ["sin(A + B) + sin(A − B) = (A) 2sinAcosB (B) 2cosAsinB (C) 2sinAsinB (D) 2cosAcosB.", "Add the two expansions.", "A — 2 sinA cosB", 0, 1, "MCQ"],
      ["tan(A − B) = (A) (tanA − tanB)/(1 + tanAtanB) (B) (tanA + tanB)/(1 − tanAtanB) (C) tanA − tanB (D) 1 + tanAtanB.", "The minus sign flips the denominator sign.", "A", 0, 1, "MCQ"],
      ["True or false: sin 3A = 3sinA − 4sin³A.", "Expand sin(2A + A).", "True", 1, 1, "True/False"],
      ["True or false: cos C + cos D = 2cos((C + D)/2)cos((C − D)/2).", "Standard sum-to-product form.", "True", 2, 1, "True/False"],
      ["1 − cos 2A = ______.", "Use cos2A = 1 − 2sin²A.", "2sin²A", 1, 1, "Fill in"],
      ["cos(A + B)cos(A − B) = ______.", "Multiply the two expansions and collect.", "cos²A − sin²B", 0, 1, "Fill in"],
      ["A student writes cos 2A = 2cosA. Correct it.", "Doubling the angle is not doubling the value.", "cos 2A = 2cos²A − 1", 1, 2, "Spot the error"],
      ["Assertion: sin2A/(1 + cos2A) = tanA. Reason: the numerator is 2sinAcosA and the denominator 2cos²A.", "Cancel 2cosA.", "Both true, and the reason gives the identity", 1, 2, "Assertion–reason"],
      ["Why do we convert products of sines and cosines into sums?", "Products are hard to integrate or sum; sums are easy.", "Because a sum can be handled term by term, a product cannot", 2, 2, "Explain"],
      ["Match (i) sin 2A, (ii) cos 2A with (a) 2cos²A − 1, (b) 2sinAcosA.", "Both come from the addition formulae with A = B.", "(i) → (b), (ii) → (a)", 1, 2, "Match"],
      ["A 10 m ladder makes 60° with the ground. How high does it reach?", "h = 10 sin 60° = 10(√3/2)", "5√3 ≈ 8.66 m", 0, 3, "Word problem"],
    ],
  },
  {
    slug: "general-values",
    items: [
      ["The general solution of sinθ = 1/2 is (A) nπ ± π/6 (B) nπ + (−1)ⁿπ/6 (C) 2nπ ± π/6 (D) nπ/6.", "Sine repeats with period 2π and has two branches.", "B — nπ + (−1)ⁿπ/6", 0, 1, "MCQ"],
      ["The general solution of tanθ = 0 is (A) nπ (B) 2nπ (C) (2n + 1)π/2 (D) nπ/2.", "tan vanishes at every multiple of π.", "A — nπ", 2, 1, "MCQ"],
      ["The general solution of cosθ = −1 is (A) nπ (B) 2nπ (C) (2n + 1)π (D) nπ/2.", "Only the negative x-axis point.", "C — (2n + 1)π", 1, 1, "MCQ"],
      ["True or false: sinθ = 2 has a solution.", "Sine never exceeds 1.", "False — no solution", 3, 1, "True/False"],
      ["True or false: sinθ = 0 gives θ = nπ.", "Zeros of sine are the multiples of π.", "True", 0, 1, "True/False"],
      ["cosθ = cosα gives θ = ______.", "Two symmetric positions per revolution.", "2nπ ± α", 1, 1, "Fill in"],
      ["tanθ = tanα gives θ = ______.", "Tangent repeats every π.", "nπ + α", 2, 1, "Fill in"],
      ["Solving sin²θ = 1/4, a student writes only θ = nπ + (−1)ⁿπ/6. What is missing?", "sinθ = ±1/2 gives two families.", "The other family θ = nπ − (−1)ⁿπ/6, i.e. θ = nπ ± π/6", 3, 2, "Spot the error"],
      ["Assertion: 2cos²θ − 3cosθ + 1 = 0 has the solutions θ = 2nπ ± π/3 and θ = 2nπ. Reason: the equation factorises as (2cosθ − 1)(cosθ − 1) = 0.", "Each factor gives one family.", "Both true, and the reason produces both families", 3, 2, "Assertion–reason"],
      ["Why is the general solution an infinite family rather than a few numbers?", "Trigonometric functions are periodic.", "Because every value repeats with the period, so each basic solution spawns infinitely many", 0, 2, "Explain"],
      ["Match (i) sinθ = 0, (ii) cosθ = 0 with (a) (2n + 1)π/2, (b) nπ.", "Zeros of sine are multiples of π; zeros of cosine are odd half-multiples.", "(i) → (b), (ii) → (a)", 3, 2, "Match"],
      ["Solve 4sin²θ = 3 completely.", "sinθ = ±√3/2", "θ = nπ ± π/3, n ∈ ℤ", 3, 3, "Case study"],
    ],
  },
  {
    slug: "interval-equations",
    items: [
      ["The number of solutions of sinx = 1/2 in [0, 2π] is (A) 1 (B) 2 (C) 3 (D) 4.", "Quadrants I and II.", "B — 2", 0, 1, "MCQ"],
      ["Solve tan2x = 0 for x ∈ [0, π].", "2x = 0, π, 2π ⇒ x = 0, π/2, π", "x = 0, π/2, π", 2, 2, "MCQ"],
      ["Solve cosx = −1 for x ∈ [0, 2π].", "Only the left-most point of the circle.", "x = π", 1, 1, "MCQ"],
      ["True or false: sinx = 3 has no solution in [0, 2π].", "Sine is bounded by 1.", "True", 1, 1, "True/False"],
      ["True or false: an answer may include a solution lying outside the stated interval.", "Only solutions inside the stated interval count.", "False", 3, 1, "True/False"],
      ["sin3x = 0 on [0, π] has ______ solutions.", "3x = 0, π, 2π, 3π", "4", 2, 1, "Fill in"],
      ["2sinx = −1 on [0, 2π] gives x = ______.", "Sine is negative in quadrants III and IV.", "7π/6 and 11π/6", 0, 1, "Fill in"],
      ["Solving tan2x = 1 on [0, π] a student gives only x = π/8. What is missing?", "2x = π/4 and 5π/4 both lie in range.", "x = 5π/8 also", 2, 2, "Spot the error"],
      ["Assertion: sinx = cosx has the solutions x = π/4 and 5π/4 in [0, 2π]. Reason: it is equivalent to tanx = 1 on that interval.", "Dividing by cosx is safe except at cosx = 0, where the equation fails anyway.", "Both true, and the reason gives both solutions", 3, 2, "Assertion–reason"],
      ["Why must every member of a general family be tested against the interval?", "The family is infinite; the interval is finite.", "Only the members that fall inside the interval are answers", 3, 2, "Explain"],
      ["Match (i) cos2x = 1/2, (ii) sinx = 0 on [0, 2π] with (a) 3 solutions, (b) 4 solutions.", "Count the family members inside the interval.", "(i) → (b), (ii) → (a)", 1, 2, "Match"],
      ["Solve 2cos²x − 3cosx + 1 = 0 for x ∈ [0, 2π].", "(2cosx − 1)(cosx − 1) = 0 ⇒ cosx = 1/2 or 1", "x = 0, π/3, 5π/3, 2π", 1, 4, "Case study"],
    ],
  },
];
