/**
 * Unit 6 — Calculus: two-mark conceptual answers, six per A4 sheet.
 * Item shape: [question, model answer, 2, topicIndex]
 */

export const CONCEPT = [
  {
    slug: "limits",
    items: [
      ["What does lim(x→a) f(x) = L mean?", "As x gets arbitrarily close to a — without necessarily reaching it — f(x) gets arbitrarily close to L. The value f(a) itself is irrelevant.", 2, 0],
      ["When is a limit called indeterminate?", "When direct substitution gives 0/0, ∞/∞, ∞ − ∞ or 0 × ∞. The form hides the true limit, so the expression must be simplified first.", 2, 0],
      ["Why do we cancel factors before substituting?", "The cancellation removes the factor that made both numerator and denominator zero at the point, leaving a function that is defined there.", 2, 1],
      ["What does lim(x→a⁻) mean?", "The left-hand limit: x approaches a through values smaller than a. The limit exists only when the right-hand limit agrees with it.", 2, 1],
      ["What is the standard limit (sin x)/x as x → 0?", "It equals 1, measured in radians. It is the basis of the derivative of sine.", 2, 2],
      ["Why is lim(n→∞)(1 + 1/n)ⁿ equal to e?", "The sequence increases and is bounded above, and its limit is the definition of e ≈ 2.71828.", 2, 3],
    ],
  },
  {
    slug: "continuity",
    items: [
      ["What are the three conditions for continuity at x = a?", "f(a) must be defined, lim(x→a) f(x) must exist, and the two must be equal.", 2, 0],
      ["Does continuity imply differentiability?", "No. f(x) = |x| is continuous at 0 but has no derivative there, because the slope is −1 on the left and +1 on the right.", 2, 1],
      ["Does differentiability imply continuity?", "Yes. If the derivative exists the difference quotient has a limit, and that forces f(x) → f(a), which is exactly continuity.", 2, 1],
      ["What is a removable discontinuity?", "One where the limit exists but differs from f(a), or f(a) is undefined; redefining the value at that single point makes the function continuous.", 2, 2],
      ["What does a jump discontinuity look like?", "The left-hand and right-hand limits both exist but are different, so the graph breaks with a vertical gap at that point.", 2, 2],
      ["Why must we test continuity at a piecewise point separately?", "The formula changes there, so the value and the two one-sided limits must be checked individually against the definition.", 2, 3],
    ],
  },
  {
    slug: "first-principles",
    items: [
      ["State the definition of the derivative from first principles.", "f′(x) = lim(h→0) [f(x + h) − f(x)]/h, provided the limit exists.", 2, 0],
      ["What does the difference quotient represent?", "It is the slope of the secant line through (x, f(x)) and (x + h, f(x + h)) — the average rate of change over that interval.", 2, 0],
      ["Why do we let h → 0?", "The secant then becomes the tangent, so the limit of the average rate gives the instantaneous rate of change.", 2, 1],
      ["What does the sign of f′(x) tell you?", "A positive derivative means the function is increasing there, a negative one means it is decreasing, and zero marks a stationary point.", 2, 1],
      ["What is the derivative of xⁿ?", "nxⁿ⁻¹ for any real n where the power is defined, obtained by expanding (x + h)ⁿ in the difference quotient.", 2, 2],
      ["Why is f′(a) the slope of the tangent at x = a?", "It is the limit of the slopes of the secant lines through that point, and that limit is by definition the tangent slope.", 2, 3],
    ],
  },
  {
    slug: "differentiation-rules",
    items: [
      ["When do you use the product rule?", "When the function is a product of two differentiable factors; then (uv)′ = u′v + uv′.", 2, 0],
      ["State the chain rule.", "dy/dx = dy/du · du/dx when y depends on u and u depends on x: differentiate the outer function and multiply by the inner derivative.", 2, 0],
      ["State the quotient rule.", "(u/v)′ = (u′v − uv′)/v², valid wherever v ≠ 0.", 2, 1],
      ["Why must the inner derivative be multiplied in a composite function?", "The inner change is measured with respect to u, not x; the extra factor converts the rate per unit u into a rate per unit x.", 2, 1],
      ["What is the derivative of ln x?", "1/x for x > 0. The natural logarithm is defined precisely so that its derivative is the simplest possible.", 2, 2],
      ["What is the derivative of e^{kx}?", "k e^{kx}: the exponential reproduces itself and the constant rate appears as a factor.", 2, 2],
    ],
  },
  {
    slug: "implicit-parametric-higher",
    items: [
      ["What is implicit differentiation?", "Differentiating both sides of a relation in x and y with respect to x, treating y as a function of x and applying the chain rule to every y term.", 2, 0],
      ["When is implicit differentiation necessary?", "When y cannot be isolated as an explicit formula in x, for example in x³ + y³ = 3xy.", 2, 1],
      ["What does d²y/dx² measure?", "The rate of change of the slope — the concavity of the curve. Positive means concave up, negative concave down.", 2, 1],
      ["What is the formula for dy/dx when x and y are given parametrically?", "dy/dx = (dy/dt)/(dx/dt), provided dx/dt ≠ 0.", 2, 2],
      ["Why do we differentiate the first derivative again implicitly for the second?", "The first derivative still contains y, which depends on x, so another chain-rule step is needed to eliminate it in favour of dy/dx.", 2, 2],
      ["When is the tangent to a curve horizontal?", "When dy/dx = 0 at that point; the tangent is then parallel to the x-axis.", 2, 3],
    ],
  },
  {
    slug: "extrema-tangents",
    items: [
      ["What is a stationary point?", "A point where f′(x) = 0, so the tangent is horizontal; it may be a maximum, a minimum or a point of inflection.", 2, 0],
      ["Describe the first derivative test.", "If f′ changes from + to − at a critical point it is a maximum, and from − to + it is a minimum; no sign change means neither.", 2, 0],
      ["Describe the second derivative test.", "At a stationary point, f″ < 0 gives a maximum, f″ > 0 gives a minimum, and f″ = 0 is inconclusive, so the first test must be used.", 2, 1],
      ["Why must the end points be checked when finding an absolute extremum?", "On a closed interval the largest or smallest value may occur at an end point even though the derivative is not zero there.", 2, 1],
      ["What is the normal to a curve at a point?", "The line perpendicular to the tangent there; its slope is −1/(dy/dx).", 2, 2],
      ["When is a function increasing on an interval?", "When f′(x) > 0 throughout that interval, so the graph rises from left to right.", 2, 3],
    ],
  },
  {
    slug: "anti-derivatives",
    items: [
      ["What is an antiderivative of f(x)?", "A function F(x) whose derivative is f(x). Every such F differs from any other by a constant.", 2, 0],
      ["Why is the constant of integration necessary?", "All functions F(x) + C have the same derivative, so the antiderivative is a family of curves and dropping C loses every member but one.", 2, 1],
      ["When should you use substitution?", "When the integrand contains a function together with (a multiple of) its derivative, so that the integral collapses into a standard power form.", 2, 1],
      ["When should you integrate by parts?", "When the integrand is a product of two different kinds of function, such as x ln x or x e^x, using ∫u dv = uv − ∫v du.", 2, 2],
      ["What is ∫(1/x) dx?", "ln|x| + C. The modulus is needed because the derivative formula holds for negative x as well.", 2, 2],
      ["Why is ∫x² dx = x³/3 + C?", "Because d/dx(x³/3) = x², which is exactly the power rule nn⁻¹ run backwards.", 2, 3],
    ],
  },
  {
    slug: "definite-integrals-area",
    items: [
      ["What does a definite integral represent geometrically?", "The signed area between the curve and the x-axis, from the lower limit to the upper limit.", 2, 0],
      ["Why is the area described as signed?", "Parts of the curve below the x-axis contribute negative values, because the function takes negative values there.", 2, 0],
      ["Why do we subtract the lower curve from the upper one?", "The integrand must be the height of the region above each point, and that height is the difference of the two y-values.", 2, 1],
      ["What happens to a definite integral if the limits are interchanged?", "Its sign changes: ∫ᵇₐ f = −∫ₐᵇ f, because the step dx reverses direction.", 2, 1],
      ["Why must the points of intersection be found first?", "They are the boundaries of the enclosed region, so without them the correct limits of integration are unknown.", 2, 2],
      ["What if the curve crosses the x-axis inside the interval?", "Integrate each piece separately and take absolute values before adding, otherwise positive and negative areas cancel.", 2, 3],
    ],
  },
];
