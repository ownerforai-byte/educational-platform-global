/**
 * Unit 7 — Computational Methods and Mechanics: two-mark conceptual answers.
 * Item shape: [question, model answer, 2, topicIndex]
 */

export const CONCEPT = [
  {
    slug: "bisection-method",
    items: [
      ["What is the idea of the bisection method?", "If f(a) and f(b) have opposite signs, the continuous curve crosses the axis between them; halving the interval repeatedly traps the root in a smaller and smaller bracket.", 2, 0],
      ["Why must f be continuous for the method to work?", "The intermediate value theorem, which guarantees the crossing, requires continuity on the closed interval.", 2, 0],
      ["How fast does the bisection method converge?", "Linearly: the error is at least halved at every step, so each iteration gains one binary digit of accuracy.", 2, 1],
      ["How do you bound the error after n steps?", "The root lies in an interval of width (b − a)/2ⁿ, so the error is at most that width, or half of it from the midpoint.", 2, 1],
      ["When does the bisection method fail?", "When the function does not change sign across the interval, or when a root has even multiplicity and only touches the axis.", 2, 2],
      ["What does the midpoint of the final bracket estimate?", "The root itself, with an error no larger than half the width of that final bracket.", 2, 3],
    ],
  },
  {
    slug: "newton-raphson-method",
    items: [
      ["What is the geometric idea of the Newton–Raphson method?", "Draw the tangent at the current estimate and take its intersection with the x-axis as the next estimate; repeat until the values stop changing.", 2, 0],
      ["Write the Newton–Raphson iteration formula.", "xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ), which comes from the tangent line at xₙ.", 2, 0],
      ["When does Newton–Raphson fail?", "When f′(xₙ) = 0 (horizontal tangent), or when the starting value is too far from the root so the iterates wander or oscillate.", 2, 1],
      ["How fast does Newton–Raphson converge near a simple root?", "Quadratically: the number of correct decimals roughly doubles each step, which is why two or three steps often suffice.", 2, 1],
      ["What is its advantage over bisection?", "Much faster convergence for the same number of evaluations, and it needs only one starting value rather than a sign-changing bracket.", 2, 2],
      ["Why does the method require f′(x) ≠ 0 near the root?", "The correction divides by the derivative; a small derivative makes the step enormous and throws the next estimate far away.", 2, 3],
    ],
  },
  {
    slug: "trapezoidal-rule",
    items: [
      ["What is the idea behind the trapezoidal rule?", "Replace the curve by straight chords over each strip, so the area is a sum of trapeziums instead of the exact curve area.", 2, 0],
      ["Write the trapezoidal rule formula.", "T = (h/2)[y₀ + yₙ + 2(y₁ + y₂ + … + yₙ₋₁)], with the interior ordinates counted twice and the end ones once.", 2, 1],
      ["When does the trapezoidal rule over-estimate the integral?", "When the curve is concave upward, since the chords then lie above the curve.", 2, 1],
      ["What is the order of the error in the trapezoidal rule?", "It is proportional to h², so halving the strip width cuts the error to roughly one quarter.", 2, 2],
      ["When is the trapezoidal rule exact?", "For linear functions, because a straight line coincides with its chords, so the trapeziums reproduce the area exactly.", 2, 2],
      ["Why must the ordinates be equally spaced?", "The formula uses one common width h; unequal strips would each need their own trapezium area.", 2, 3],
    ],
  },
  {
    slug: "simpson-rule",
    items: [
      ["What is the idea behind Simpson's rule?", "Fit a parabola through every three consecutive ordinates instead of a chord, which follows the curvature of the graph much more closely.", 2, 0],
      ["Write Simpson's rule formula.", "S = (h/3)[y₀ + yₙ + 4(odd ordinates) + 2(even interior ordinates)], with the end ordinates counted once.", 2, 1],
      ["Why does Simpson's rule need an even number of strips?", "Each parabola uses three ordinates, so the strips are consumed two at a time and an odd strip would be left unpaired.", 2, 1],
      ["What is the order of the error in Simpson's rule?", "It is proportional to h⁴, so halving h reduces the error by about sixteen times — far better than the trapezoidal rule.", 2, 2],
      ["When is Simpson's rule exact?", "For polynomials up to degree three, because a cubic agrees with the parabola fit over a symmetric triple of points.", 2, 2],
      ["Why is Simpson's rule usually preferred to the trapezoidal rule?", "For the same number of ordinates it is far more accurate, though it requires an even number of strips.", 2, 3],
    ],
  },
  {
    slug: "statics-forces",
    items: [
      ["What is the resultant of a system of forces?", "The single force that produces the same effect as all the forces acting together, found by vector addition.", 2, 0],
      ["State the condition for a body to be in equilibrium under several forces.", "The vector sum of all the forces must be zero, so the resolved sums along any two perpendicular directions vanish.", 2, 0],
      ["What is the equilibrant?", "The force equal in magnitude and opposite in direction to the resultant; it is what keeps the body in equilibrium.", 2, 1],
      ["State Lami's theorem and its condition.", "For three concurrent forces in equilibrium, P/sin α = Q/sin β = R/sin γ, where each angle is opposite its force. Exactly three forces must act at one point.", 2, 1],
      ["Why do we resolve forces into components?", "Resolving turns one vector equation into two scalar equations along perpendicular directions, which can be solved separately.", 2, 2],
      ["What is the reaction of a smooth plane?", "A single force perpendicular to the surface, since a smooth plane can exert no friction along it.", 2, 3],
    ],
  },
  {
    slug: "dynamics-kinematics",
    items: [
      ["What is uniform acceleration?", "Motion in which the velocity changes by equal amounts in equal times, so a is constant and the three standard equations apply.", 2, 0],
      ["Write the three equations of motion for constant acceleration.", "v = u + at, s = ut + ½at², and v² = u² + 2as.", 2, 0],
      ["What assumption underlies v = u + at?", "That the acceleration is constant; for varying acceleration the relation must be integrated instead.", 2, 1],
      ["What is the difference between distance and displacement?", "Displacement is the straight-line change of position with direction, while distance is the total path length travelled; they differ whenever the body turns back.", 2, 1],
      ["What is special about the highest point of a vertical throw?", "The velocity is momentarily zero while the acceleration is still g downward, and that is why the body cannot stay there.", 2, 2],
      ["Why is g taken as negative when a body moves upward?", "With upward as positive, gravity acts downward, so the acceleration is −g and the equations then give the correct deceleration.", 2, 3],
    ],
  },
];
