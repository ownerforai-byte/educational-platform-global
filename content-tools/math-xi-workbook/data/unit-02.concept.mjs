/**
 * Unit 2 — Trigonometry: two-mark conceptual answers, six per A4 sheet.
 * Item shape: [question, model answer, 2, topicIndex]
 */

export const CONCEPT = [
  {
    slug: "inverse-circular-functions",
    items: [
      ["Why must the domain of sin x be restricted before defining sin⁻¹?", "Sine is not one-one on ℝ, so it cannot be inverted there. On [−π/2, π/2] it is one-one and onto [−1, 1], which makes the inverse single-valued.", 2, 0],
      ["What is the principal value range of sin⁻¹ x?", "sin⁻¹ x lies in [−π/2, π/2]; this is the branch chosen so that the answer is unique for each x in [−1, 1].", 2, 0],
      ["Why is tan⁻¹ x + tan⁻¹ (1/x) = π/2 for x > 0?", "The two angles are complementary: if tan α = x then tan(π/2 − α) = 1/x, and both angles lie in the principal range.", 2, 1],
      ["Express cos⁻¹ (−x) in terms of cos⁻¹ x.", "cos⁻¹(−x) = π − cos⁻¹ x, because the cosine of the supplementary angle is the negative of the cosine.", 2, 2],
      ["Why can the formula tan⁻¹x + tan⁻¹y = tan⁻¹((x + y)/(1 − xy)) fail?", "It holds only when xy < 1. If xy > 1 the sum lies outside (−π/2, π/2), so a ±π correction must be added.", 2, 2],
      ["What is the range of cos⁻¹ x, and why?", "It is [0, π], the interval on which cos x decreases steadily from 1 to −1 and so is one-one.", 2, 3],
    ],
  },
  {
    slug: "combination-formulae",
    items: [
      ["Write cos 2A in its three useful forms.", "cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A. The last two are the ones that convert an expression into a single trigonometric ratio.", 2, 0],
      ["Why do we convert sums into products?", "The product form shows the zeros and the amplitude directly, and it is far easier to solve sin A + sin B = 0 when it is written as a product.", 2, 1],
      ["What is the maximum value of a sin x + b cos x?", "It is √(a² + b²), reached when the angle equals tan⁻¹(b/a) in the right sense.", 2, 2],
      ["What is the formula for tan 2A?", "tan 2A = 2tan A / (1 − tan²A), valid where all three tangents are defined.", 2, 2],
      ["Why is the triple-angle formula useful?", "It reduces sin 3A, cos 3A and tan 3A to powers of the single angle, which turns many equations into polynomial equations in sin A or tan A.", 2, 3],
      ["Write sin A + sin B as a product.", "sin A + sin B = 2 sin((A + B)/2) cos((A − B)/2).", 2, 1],
    ],
  },
  {
    slug: "general-values",
    items: [
      ["Why do trigonometric equations have a general solution?", "Trigonometric functions are periodic, so once one solution is found every angle differing by a whole period is also a solution.", 2, 0],
      ["What is the general solution of sin θ = k, with k = sin α?", "θ = nπ + (−1)ⁿα, n ∈ ℤ. The (−1)ⁿ switches between the two symmetric positions.", 2, 0],
      ["What is the general solution of cos θ = k, with k = cos α?", "θ = 2nπ ± α, n ∈ ℤ, because cosine is symmetric about 0 and repeats every 2π.", 2, 1],
      ["What does the statement n ∈ ℤ mean in a general solution?", "n is any integer; each value of n produces one member of the infinite family of solutions.", 2, 1],
      ["What is the general solution of tan θ = k, with k = tan α?", "θ = nπ + α, n ∈ ℤ, since tangent repeats with period π.", 2, 2],
      ["How do you obtain the solutions lying in [0, 2π] from a general solution?", "Substitute successive integers for n and keep only the values that fall inside the interval; usually two or three values survive.", 2, 3],
    ],
  },
  {
    slug: "interval-equations",
    items: [
      ["Why can a quadratic in sin x give up to four solutions in [0, 2π]?", "Each factor gives a value of sin x, and each value inside (−1, 1) produces two angles in one full revolution.", 2, 0],
      ["Why must you reject sin x = 2 when solving in [0, 2π]?", "The sine of a real angle never exceeds 1, so that factor has no solution and contributes nothing to the answer.", 2, 0],
      ["Why does sin x = 1 give only one solution in [0, 2π]?", "The line y = 1 touches the sine curve only at x = π/2; the second branch would fall outside the interval.", 2, 1],
      ["What does a sketch of both graphs tell you about an interval equation?", "The number of intersections is exactly the number of solutions, which shows at once whether a root has been missed.", 2, 1],
      ["Why must the end points 0 and 2π be checked?", "The interval is closed, so a solution equal to 0 or 2π counts as valid, and both give the same angle.", 2, 2],
      ["How do you handle an equation such as 2sin²x − 3sin x + 1 = 0?", "Treat sin x as a single unknown, factor or use the quadratic formula, then keep only values between −1 and 1 and solve for x in the given interval.", 2, 3],
    ],
  },
];
