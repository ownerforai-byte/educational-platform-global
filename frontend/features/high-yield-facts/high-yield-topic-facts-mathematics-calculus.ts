/**
 * High-Yield Topic Facts — Mathematics: Calculus & Analytic Geometry (Class 11).
 *
 * Two units in the Class 11 mathematics syllabus had NO entry in the
 * mathematics bank, so every topic in them resolved to `null` and the
 * fact-bank sections were hidden:
 *   - calculus (39 topics — the largest unit in the subject)
 *   - analytic-geometry (9 topics)
 *
 * Entries are topic-level because calculus splits into three separately
 * examinable blocks (limits/continuity, differentiation, integration).
 * Matching note: `findHighYieldTopicData` prefers an exact `unitSlugs` match
 * and breaks ties by keyword score, so each entry's `topicKeywords` must
 * contain words that appear in its own topic slug or title.
 */

import type { HighYieldTopicData } from "./high-yield-topic-facts-match";

export const HIGH_YIELD_TOPIC_BANK_MATHEMATICS_CALCULUS: HighYieldTopicData[] = [
  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS — Limits and continuity
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "limits",
      "limit",
      "continuity",
      "discontinuity",
      "indeterminate-forms",
      "limits-and-continuity",
      "continuity-of-function",
      "types-of-discontinuity",
    ],
    subject: "mathematics",
    title: "Limits & Continuity — Standard Limits, Indeterminate Forms & Discontinuity Types",
    unitSlugs: ["calculus", "limits-and-continuity"],
    category: "Calculus",
    governingLaws: [
      {
        name: "Definition of a Limit",
        statement:
          "The limit of f(x) as x tends to a is L if f(x) can be made arbitrarily close to L by taking x sufficiently close to a, without requiring x to equal a.",
        formula: "\\lim_{x \\to a} f(x) = L",
        conditions:
          "The two-sided limit exists only if the left-hand and right-hand limits both exist and are equal. The value f(a) itself is irrelevant.",
      },
      {
        name: "Algebra of Limits",
        statement:
          "The limit of a sum, difference or product equals the corresponding combination of the individual limits, provided each individual limit exists.",
        formula:
          "\\lim (f \\pm g) = \\lim f \\pm \\lim g, \\quad \\lim (fg) = (\\lim f)(\\lim g)",
        conditions:
          "For a quotient the limit of the denominator must be non-zero. If it is zero, the form is indeterminate and needs further work.",
      },
      {
        name: "Condition for Continuity",
        statement:
          "A function is continuous at a point when the function is defined there, the limit exists there, and the two are equal.",
        formula:
          "f(a)\\ \\text{defined},\\quad \\lim_{x \\to a} f(x)\\ \\text{exists},\\quad \\lim_{x \\to a} f(x) = f(a)",
        conditions:
          "All three conditions are required. Failing any one makes the function discontinuous at that point.",
      },
    ],
    speedFormulas: [
      {
        name: "Standard trigonometric limit",
        formula: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1",
        description:
          "The most used limit in the course. Angles must be in radians; in degrees the limit is pi/180 instead.",
        unit: "—",
      },
      {
        name: "Standard exponential and log limits",
        formula:
          "\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{\\log(1+x)}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{a^x-1}{x} = \\log a",
        description:
          "These three cover most exponential and logarithmic limit questions. Recognising them saves a full L'Hopital application.",
        unit: "—",
      },
      {
        name: "L'Hopital's rule",
        formula:
          "\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}",
        description:
          "Valid only for the indeterminate forms 0/0 and infinity/infinity. Applying it to a determinate form gives a wrong answer.",
        unit: "—",
      },
      {
        name: "Limit at infinity for a rational function",
        formula:
          "\\deg p < \\deg q \\Rightarrow 0, \\quad \\deg p = \\deg q \\Rightarrow \\frac{\\text{leading coeff of } p}{\\text{leading coeff of } q}",
        description:
          "Divide numerator and denominator by the highest power of x. If the numerator degree is higher, the limit is infinite.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "7", name: "Number of indeterminate forms", value: "0/0, inf/inf, 0xinf, inf-inf, 1^inf, 0^0, inf^0", unit: "forms" },
      { symbol: "1", name: "Value of lim (sin x)/x as x tends to 0", value: "1", unit: "—" },
      { symbol: "e", name: "Value of lim (1 + 1/x)^x as x tends to infinity", value: "2.71828...", unit: "—" },
      { symbol: "3", name: "Number of conditions required for continuity at a point", value: "3", unit: "conditions" },
    ],
    entranceTraps: [
      {
        trap: "If a function is continuous at a point, it must be differentiable there.",
        truth:
          "The implication runs the other way. Differentiability implies continuity, but continuity does NOT imply differentiability. f(x) = |x| is continuous at 0 yet not differentiable there.",
        examRef: "NEB / CEE — continuity",
      },
      {
        trap: "A limit exists whenever the function is defined at that point.",
        truth:
          "The limit and the function value are independent. A limit can exist where the function is undefined, and can fail to exist where the function is perfectly well defined.",
        examRef: "CEE — limits",
      },
      {
        trap: "L'Hopital's rule can be applied to any limit of a quotient.",
        truth:
          "Only for 0/0 or infinity/infinity. Applying it to a form like 1/0 or 2/3 gives a meaningless result.",
        examRef: "CEE — L'Hopital",
      },
      {
        trap: "f''(x) = 0 guarantees a point of inflection.",
        truth:
          "It is necessary but not sufficient. The concavity must actually change sign. f(x) = x^4 has f''(0) = 0 but no inflection at the origin.",
        examRef: "NEB — concavity",
      },
      {
        trap: "The definite integral always gives the geometric area under a curve.",
        truth:
          "It gives SIGNED area. Regions below the x-axis contribute negatively. For geometric area you must split at the zeros and take absolute values.",
        examRef: "CEE — definite integrals",
      },
    ],
    workedNumericals: [
      {
        problem: "Evaluate lim (x to 2) (x^2 - 4)/(x - 2).",
        given: "Direct substitution gives 0/0, an indeterminate form",
        steps: [
          "Factorise the numerator: x^2 - 4 = (x - 2)(x + 2).",
          "Cancel the common factor (x - 2), valid since x approaches 2 but does not equal 2.",
          "The expression reduces to (x + 2).",
          "Substitute x = 2 to get 4.",
        ],
        answer: "4",
      },
      {
        problem: "Evaluate lim (x to 0) (1 - cos x)/x^2.",
        given: "Direct substitution gives 0/0",
        steps: [
          "Use the identity 1 - cos x = 2 sin^2(x/2).",
          "The limit becomes lim 2 sin^2(x/2) / x^2.",
          "Write x^2 = 4 (x/2)^2, giving (2/4) x [sin(x/2)/(x/2)]^2.",
          "As x tends to 0, sin(x/2)/(x/2) tends to 1, so the limit is (1/2) x 1 = 1/2.",
        ],
        answer: "1/2",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Removable discontinuity",
        definition:
          "A discontinuity where the limit exists but does not equal the function value, or the function is undefined at that point.",
        significance:
          "Can be repaired by redefining the function at that single point; appears as a hole in the graph.",
      },
      {
        term: "Jump discontinuity",
        definition:
          "A discontinuity where both one-sided limits exist but are unequal.",
        significance:
          "Cannot be removed by redefining one point; typical of piecewise functions and step functions.",
      },
      {
        term: "Indeterminate form",
        definition:
          "An expression such as 0/0 or infinity/infinity whose value cannot be determined from the form alone and requires further analysis.",
        significance:
          "Signals that a limit may still exist; each form needs its own technique — factorisation, L'Hopital, or series expansion.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS — Differentiation
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "derivatives",
      "derivative",
      "differentiation",
      "rules-of-differentiation",
      "higher-order-derivatives",
      "parametric-implicit",
      "monotonicity",
      "extreme-values",
      "concavity",
      "geometric-interpretation",
    ],
    subject: "mathematics",
    title: "Differentiation — Rules, Higher Order, Monotonicity & Extrema",
    unitSlugs: ["calculus"],
    category: "Calculus",
    governingLaws: [
      {
        name: "Derivative from First Principles",
        statement:
          "The derivative is the limit of the difference quotient as the increment tends to zero, giving the instantaneous rate of change.",
        formula:
          "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
        conditions:
          "The limit must exist. Corners, cusps and vertical tangents are points where the derivative does not exist.",
      },
      {
        name: "Product Rule",
        statement:
          "The derivative of a product of two functions is the first times the derivative of the second plus the second times the derivative of the first.",
        formula: "\\frac{d}{dx}(uv) = u\\frac{dv}{dx} + v\\frac{du}{dx}",
        conditions:
          "Both u and v must be differentiable at the point in question.",
      },
      {
        name: "Quotient Rule",
        statement:
          "The derivative of a quotient has the denominator times the derivative of the numerator minus the numerator times the derivative of the denominator, all over the denominator squared.",
        formula:
          "\\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}",
        conditions:
          "Requires v non-zero. Reversing the order of the numerator terms is the commonest error.",
      },
      {
        name: "Chain Rule",
        statement:
          "The derivative of a composite function is the derivative of the outer function evaluated at the inner function, multiplied by the derivative of the inner function.",
        formula: "\\frac{d}{dx}f(g(x)) = f'(g(x)) \\cdot g'(x)",
        conditions:
          "The most frequently used rule in the course; essential for parametric, implicit and logarithmic differentiation.",
      },
    ],
    speedFormulas: [
      {
        name: "Power rule",
        formula: "\\frac{d}{dx}(x^n) = n x^{n-1}",
        description:
          "Valid for any real exponent n, including negative and fractional powers. The base case of almost every differentiation question.",
        unit: "—",
      },
      {
        name: "Parametric derivative",
        formula: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}",
        description:
          "For x and y both given in terms of t. Requires dx/dt non-zero. The second derivative is (d/dt of dy/dx) divided by dx/dt.",
        unit: "—",
      },
      {
        name: "Second derivative test",
        formula:
          "f''(a) < 0 \\Rightarrow \\text{local max}, \\quad f''(a) > 0 \\Rightarrow \\text{local min}",
        description:
          "Applied at a critical point where f'(a) = 0. If f''(a) = 0 the test is inconclusive and the first derivative test must be used.",
        unit: "—",
      },
      {
        name: "Standard derivatives",
        formula:
          "\\frac{d}{dx}\\sin x = \\cos x,\\ \\frac{d}{dx}\\tan x = \\sec^2 x,\\ \\frac{d}{dx}e^x = e^x,\\ \\frac{d}{dx}\\log x = \\frac{1}{x}",
        description:
          "The core table. Inverse trig derivatives: sin^-1 x gives 1/sqrt(1-x^2), tan^-1 x gives 1/(1+x^2).",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "0", name: "Derivative of a constant", value: "0", unit: "—" },
      { symbol: "1", name: "Derivative of x with respect to x", value: "1", unit: "—" },
      { symbol: "e", name: "The only function equal to its own derivative", value: "e^x", unit: "—" },
      { symbol: "ILATE", name: "Order for choosing u in integration by parts", value: "Inverse trig, Log, Algebraic, Trig, Exponential", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "d/dx (uv) = (du/dx)(dv/dx).",
        truth:
          "That is the classic error. The product rule is u(dv/dx) + v(du/dx). Test it on x times x: the correct answer is 2x, not 1.",
        examRef: "NEB / CEE — product rule",
      },
      {
        trap: "If f'(a) = 0 then a is definitely an extremum.",
        truth:
          "f'(a) = 0 only makes a a critical point. It could be a point of inflection, as with f(x) = x^3 at 0. Always test the sign change.",
        examRef: "CEE — extrema",
      },
      {
        trap: "A function that is continuous everywhere is differentiable everywhere.",
        truth:
          "False. f(x) = |x| is continuous at 0 but has no derivative there because the left and right slopes disagree.",
        examRef: "NEB — differentiability",
      },
      {
        trap: "For a global maximum on a closed interval, only check where f'(x) = 0.",
        truth:
          "You must also evaluate the function at both ENDPOINTS. The maximum often occurs at an endpoint, not at a stationary point.",
        examRef: "CEE — optimisation",
      },
      {
        trap: "The second derivative tells you whether the function is increasing.",
        truth:
          "The FIRST derivative determines increasing or decreasing. The second derivative determines concavity. These are independent properties.",
        examRef: "NEB — curve sketching",
      },
    ],
    workedNumericals: [
      {
        problem: "Differentiate y = x^2 sin x.",
        given: "A product of an algebraic and a trigonometric function",
        steps: [
          "Apply the product rule with u = x^2 and v = sin x.",
          "du/dx = 2x and dv/dx = cos x.",
          "dy/dx = u(dv/dx) + v(du/dx) = x^2 cos x + (sin x)(2x).",
        ],
        answer: "dy/dx = x^2 cos x + 2x sin x",
      },
      {
        problem:
          "Find the local extrema of f(x) = x^3 - 3x.",
        given: "A cubic polynomial",
        steps: [
          "f'(x) = 3x^2 - 3. Setting f'(x) = 0 gives x^2 = 1, so x = 1 or x = -1.",
          "f''(x) = 6x. At x = 1, f'' = 6 > 0, so local minimum. At x = -1, f'' = -6 < 0, so local maximum.",
          "f(1) = 1 - 3 = -2 and f(-1) = -1 + 3 = 2.",
        ],
        answer: "Local maximum 2 at x = -1; local minimum -2 at x = 1",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Critical point",
        definition:
          "A point where the first derivative is zero or does not exist.",
        significance:
          "The only candidates for local extrema; every extremum is a critical point but not every critical point is an extremum.",
      },
      {
        term: "Point of inflection",
        definition:
          "A point on a curve where the concavity changes sign, so the second derivative changes sign across it.",
        significance:
          "Marks where the curve switches between concave up and concave down; the second derivative is zero or undefined there.",
      },
      {
        term: "Logarithmic differentiation",
        definition:
          "Taking the natural logarithm of both sides before differentiating, used when the function is a variable raised to a variable power.",
        significance:
          "The only practical way to differentiate f(x)^g(x); also simplifies long products and quotients.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS — Integration
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "anti-derivatives",
      "integration",
      "definite-integral",
      "area-under-curve",
      "area-between-two-curves",
      "integration-substitution-parts",
      "indefinite-integral",
    ],
    subject: "mathematics",
    title: "Integration — Antiderivatives, Definite Integrals & Area Under Curves",
    unitSlugs: ["calculus"],
    category: "Calculus",
    governingLaws: [
      {
        name: "Fundamental Theorem of Calculus",
        statement:
          "If F is any antiderivative of a continuous function f on an interval, the definite integral of f from a to b equals F(b) minus F(a).",
        formula:
          "\\int_a^b f(x)\\,dx = F(b) - F(a) \\quad \\text{where } F'(x) = f(x)",
        conditions:
          "f must be continuous on the closed interval. This is the result that links area to anti-differentiation.",
      },
      {
        name: "Integration by Substitution",
        statement:
          "Replacing a function of x by a new variable u converts the integral into one in u, provided the derivative of u also appears in the integrand.",
        formula:
          "\\int f(g(x))g'(x)\\,dx = \\int f(u)\\,du",
        conditions:
          "For a definite integral the limits must also be converted to u values, or the answer converted back before substituting.",
      },
      {
        name: "Integration by Parts",
        statement:
          "The integral of a product equals the product of the parts minus the integral of the other arrangement, derived from the product rule.",
        formula:
          "\\int u\\,dv = uv - \\int v\\,du",
        conditions:
          "Choose u by the ILATE order. Works when the integrand is a product of unlike function types.",
      },
    ],
    speedFormulas: [
      {
        name: "Power rule for integration",
        formula:
          "\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
        description:
          "The n = -1 case is the exception and gives log|x| + C. Forgetting the constant of integration loses marks on every indefinite integral.",
        unit: "—",
      },
      {
        name: "Area under a curve",
        formula:
          "A = \\int_a^b f(x)\\,dx",
        description:
          "Gives SIGNED area. For geometric area where the curve dips below the axis, split at the zeros and integrate the absolute value.",
        unit: "square units",
      },
      {
        name: "Area between two curves",
        formula:
          "A = \\int_a^b (y_{\\text{upper}} - y_{\\text{lower}})\\,dx",
        description:
          "a and b are the x-coordinates of the intersection points. Subtracting handles the case where both curves lie below the axis.",
        unit: "square units",
      },
      {
        name: "Symmetry shortcuts",
        formula:
          "\\int_{-a}^{a} f = 0\\ (f\\ \\text{odd}), \\quad \\int_{-a}^{a} f = 2\\int_0^a f\\ (f\\ \\text{even})",
        description:
          "Always check parity before integrating over a symmetric interval — it frequently turns a long computation into zero.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "C", name: "Constant of integration for indefinite integrals", value: "arbitrary constant", unit: "—" },
      { symbol: "0", name: "Value of the integral from a to a", value: "0", unit: "—" },
      { symbol: "log|x|", name: "Integral of 1/x", value: "log|x| + C", unit: "—" },
      { symbol: "ILATE", name: "Priority order for choosing u in by-parts", value: "Inverse trig, Log, Algebraic, Trig, Exponential", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "The definite integral always equals the geometric area under the curve.",
        truth:
          "It equals the SIGNED area. Portions below the x-axis contribute negatively, so a symmetric curve above and below the axis can integrate to zero.",
        examRef: "NEB / CEE — definite integrals",
      },
      {
        trap: "The constant of integration can be dropped from an indefinite integral.",
        truth:
          "It must be included. Anti-differentiation gives a family of functions differing by a constant; omitting C loses marks.",
        examRef: "NEB — indefinite integrals",
      },
      {
        trap: "In substitution, the limits of a definite integral stay the same.",
        truth:
          "If you change the variable you must also change the limits to the new variable. Alternatively convert back to x before applying the original limits.",
        examRef: "CEE — substitution",
      },
      {
        trap: "For area between curves, any order of subtraction works.",
        truth:
          "It must be upper minus lower. Subtracting the wrong way gives a negative area. Test a point between the intersections to identify which curve is on top.",
        examRef: "CEE — area between curves",
      },
      {
        trap: "Integration by parts can be applied with u and dv chosen arbitrarily.",
        truth:
          "A poor choice makes the new integral harder. Use ILATE: inverse trig, log, algebraic, trig, exponential — u is chosen from the earlier type.",
        examRef: "NEB — by parts",
      },
    ],
    workedNumericals: [
      {
        problem: "Evaluate the integral from 0 to 2 of (3x^2 + 2x) dx.",
        given: "A polynomial integrand with limits 0 and 2",
        steps: [
          "Find the antiderivative: x^3 + x^2.",
          "Apply the fundamental theorem: evaluate at 2 and at 0.",
          "At x = 2: 8 + 4 = 12. At x = 0: 0 + 0 = 0.",
          "Subtract: 12 - 0 = 12.",
        ],
        answer: "12",
      },
      {
        problem:
          "Find the area between y = x^2 and y = x from x = 0 to x = 1.",
        given: "The two curves intersect where x^2 = x, that is at x = 0 and x = 1",
        steps: [
          "On (0, 1), x > x^2, so y = x is the upper curve.",
          "Area = integral from 0 to 1 of (x - x^2) dx.",
          "Antiderivative: x^2/2 - x^3/3.",
          "Evaluate: (1/2 - 1/3) - 0 = 1/6.",
        ],
        answer: "1/6 square units",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Antiderivative",
        definition:
          "A function whose derivative is the given function; also called the indefinite integral.",
        significance:
          "Anti-differentiation reverses differentiation, and the fundamental theorem uses it to compute definite integrals exactly.",
      },
      {
        term: "Definite integral",
        definition:
          "The limit of a sum of areas of thin rectangles under a curve between two limits, giving a number rather than a function.",
        significance:
          "Computes signed area and, through the fundamental theorem, any quantity that accumulates at a varying rate.",
      },
      {
        term: "Signed area",
        definition:
          "Area counted as positive above the x-axis and negative below it, which is what the definite integral returns.",
        significance:
          "Distinguishing signed from geometric area is the single most common source of lost marks in area questions.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS — Analytic geometry
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "analytic-geometry",
      "straight-line",
      "perpendicular-distance",
      "angle-bisector",
      "pair-of-straight-lines",
      "coordinates-in-space",
      "direction-cosines",
    ],
    subject: "mathematics",
    title: "Analytic Geometry — Perpendicular Distance, Angle Bisectors & Pairs of Lines",
    unitSlugs: ["analytic-geometry"],
    category: "Coordinate Geometry",
    governingLaws: [
      {
        name: "Perpendicular Distance Formula",
        statement:
          "The perpendicular distance from a point to a line equals the absolute value of the line expression evaluated at the point, divided by the square root of the sum of the squared coefficients.",
        formula:
          "d = \\frac{|ax_1 + by_1 + c|}{\\sqrt{a^2 + b^2}}",
        conditions:
          "The line must be in the general form ax + by + c = 0. The absolute value ensures a positive distance.",
      },
      {
        name: "Angle Bisector Condition",
        statement:
          "A point lies on an angle bisector when its perpendicular distances to the two lines are equal in magnitude.",
        formula:
          "\\frac{a_1x+b_1y+c_1}{\\sqrt{a_1^2+b_1^2}} = \\pm \\frac{a_2x+b_2y+c_2}{\\sqrt{a_2^2+b_2^2}}",
        conditions:
          "The two signs give the two bisectors, which are mutually perpendicular. The sign rule selects the acute-angle bisector.",
      },
      {
        name: "Condition for a Pair of Straight Lines",
        statement:
          "The general second-degree equation represents a pair of straight lines only when a specific relation among its coefficients holds.",
        formula:
          "abc + 2fgh - af^2 - bg^2 - ch^2 = 0",
        conditions:
          "For the homogeneous form ax^2 + 2hxy + by^2 = 0 the lines always pass through the origin, and the condition is automatically satisfied.",
      },
    ],
    speedFormulas: [
      {
        name: "Distance between parallel lines",
        formula:
          "d = \\frac{|c_1 - c_2|}{\\sqrt{a^2 + b^2}}",
        description:
          "Both lines must be written with identical a and b coefficients. Normalise first if they differ.",
        unit: "units",
      },
      {
        name: "Angle between a pair of lines",
        formula:
          "\\tan\\theta = \\frac{2\\sqrt{h^2 - ab}}{a + b}",
        description:
          "For ax^2 + 2hxy + by^2 = 0. Lines are perpendicular when a + b = 0 and coincident when h^2 = ab.",
        unit: "—",
      },
      {
        name: "Distance in three dimensions",
        formula:
          "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}",
        description:
          "Direct extension of the two-dimensional distance formula to three mutually perpendicular axes.",
        unit: "units",
      },
      {
        name: "Direction cosine identity",
        formula:
          "\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1",
        description:
          "Direction cosines are direction ratios normalised by dividing each by the magnitude of the direction vector.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "0", name: "Value of a + b for perpendicular lines in a pair", value: "0", unit: "—" },
      { symbol: "h^2 = ab", name: "Condition for coincident lines in a pair", value: "h^2 = ab", unit: "—" },
      { symbol: "1", name: "Sum of squares of direction cosines", value: "1", unit: "—" },
      { symbol: "3", name: "Number of coordinate axes in three-dimensional space", value: "3", unit: "axes" },
    ],
    entranceTraps: [
      {
        trap: "The perpendicular distance formula can be applied to a line in slope-intercept form directly.",
        truth:
          "It requires the general form ax + by + c = 0. Convert y = mx + c to mx - y + c = 0 first, or the coefficients will be wrong.",
        examRef: "NEB / CEE — distance formula",
      },
      {
        trap: "Both signs in the bisector formula give the same bisector.",
        truth:
          "The two signs give two DIFFERENT bisectors, and they are perpendicular to each other. Selecting the acute-angle bisector needs the sign rule.",
        examRef: "CEE — angle bisectors",
      },
      {
        trap: "Any second-degree equation in x and y represents a pair of straight lines.",
        truth:
          "Only when abc + 2fgh - af^2 - bg^2 - ch^2 = 0. Otherwise it represents a conic — circle, ellipse, parabola or hyperbola.",
        examRef: "CEE — pair of lines",
      },
      {
        trap: "Direction ratios and direction cosines are the same thing.",
        truth:
          "Direction ratios are any three numbers proportional to the direction. Direction cosines are the normalised version, and only they satisfy the sum-of-squares-equals-one identity.",
        examRef: "NEB — three-dimensional geometry",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Find the perpendicular distance from the point (3, 4) to the line 3x + 4y - 10 = 0.",
        given: "Point (3, 4) and line 3x + 4y - 10 = 0",
        steps: [
          "Substitute the point into the line expression: 3(3) + 4(4) - 10 = 9 + 16 - 10 = 15.",
          "Compute the denominator: sqrt(3^2 + 4^2) = sqrt(9 + 16) = 5.",
          "Distance = |15| / 5 = 3.",
        ],
        answer: "3 units",
      },
      {
        problem:
          "Find the angle between the pair of lines given by x^2 - 5xy + 6y^2 = 0.",
        given: "a = 1, 2h = -5 so h = -2.5, b = 6",
        steps: [
          "Use tan(theta) = 2 sqrt(h^2 - ab) / (a + b).",
          "h^2 - ab = 6.25 - 6 = 0.25, so sqrt = 0.5.",
          "Numerator = 2 x 0.5 = 1. Denominator = 1 + 6 = 7.",
          "tan(theta) = 1/7, so theta = arctan(1/7).",
        ],
        answer: "theta = arctan(1/7), approximately 8.13 degrees",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Angle bisector",
        definition:
          "The locus of points equidistant from two intersecting lines, dividing the angle between them into two equal parts.",
        significance:
          "Used to find the incentre of a triangle and to locate points equidistant from two given lines.",
      },
      {
        term: "Homogeneous equation",
        definition:
          "An equation in which every term has the same total degree, such as ax^2 + 2hxy + by^2 = 0.",
        significance:
          "A homogeneous second-degree equation always represents two straight lines through the origin, with slopes given by a quadratic in y/x.",
      },
      {
        term: "Direction cosine",
        definition:
          "The cosine of the angle a line makes with each coordinate axis, forming a normalised direction vector.",
        significance:
          "The three direction cosines satisfy a sum-of-squares-equals-one identity, which uniquely fixes a direction in space.",
      },
    ],
  },
];
