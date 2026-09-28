import type { LeafDepth } from "./mindmap-depth";

/** Mathematics fallback leaves (math-1 … math-5). */
export const FALLBACK_MATH_A: Record<string, LeafDepth> = {
  "math-1": {
    keyFacts: [
      "A limit describes what a function APPROACHES, not what it equals: $\\frac{x^2-4}{x-2}$ is undefined at 2 yet $\\lim_{x\\to2} = 4$.",
      "$\\lim_{x\\to0}\\frac{\\sin x}{x} = 1$ only when $x$ is in RADIANS; in degrees the value is $\\frac{\\pi}{180}$.",
    ],
    edgeCases: [
      "$0/0$ and $\\infty/\\infty$ are INDETERMINATE, meaning 'calculation failed' — not zero and not infinite. Algebra must be done first.",
      "$\\lim_{x\\to\\infty}\\frac1x = 0$ while $\\lim_{x\\to0^+}\\frac1x = +\\infty$: the same expression behaves completely differently depending on the approach.",
    ],
    examAsked: [
      "NEB: 'Evaluate $\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$.' — use the conjugate: $\\tfrac12$.",
      "CEE: '$\\lim_{x\\to\\infty}(1+\\frac1x)^x$?' — $e$.",
    ],
    commonMistakes: [
      "Substituting the point and writing 'undefined' — the limit is not the function value.",
      "Using the standard limit with x in degrees, changing the answer by $\\pi/180$.",
    ],
  },
  "math-2": {
    keyFacts: [
      "The derivative is defined as a LIMIT OF SECANTS, $f'(a) = \\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}$, so it is a slope, not a fraction you may cancel.",
      "$f'(a)$ exists only if the two-sided limit exists — a one-sided derivative alone is not a derivative.",
    ],
    edgeCases: [
      "Differentiability IMPLIES continuity but not the reverse: $|x|$ at 0 is continuous yet has left derivative $-1$ and right derivative $+1$.",
      "$\\frac{dy}{dx}$ notation invites illegal cancellation. It is shorthand for a limit process, so $\\frac{dy}{dx} \\neq \\frac{dy}{dx}$ manipulations that treat it as a ratio.",
    ],
    examAsked: [
      "NEB: 'Differentiate $y = x^2(3x+1)$ from first principles.' — $9x^2 + 2x$.",
      "CEE: 'Show $f(x)=|x|$ is not differentiable at 0.' — left/right derivatives differ in sign.",
    ],
    commonMistakes: [
      "Treating $\\frac{dy}{dx}$ as an ordinary fraction and cancelling terms across the derivative sign.",
      "Concluding differentiability from continuity alone.",
    ],
  },
  "math-3": {
    keyFacts: [
      "Lagrange's MVT says $\\frac{f(b)-f(a)}{b-a} = f'(c)$ for SOME $c$ in $(a,b)$ — it guarantees existence of a point, never tells you which.",
      "The theorem is equivalent to Rolle's theorem with the endpoint chord subtracted, which is why Rolle's is always proved first.",
    ],
    edgeCases: [
      "MVT's hypotheses (continuous on $[a,b]$, differentiable on $(a,b)$) are ESSENTIAL: a function with a corner fails differentiability, and $f(x) = |x|$ on $[-1,1]$ has no valid $c$ at the corner.",
      "A vertical tangent or an endpoint derivative does not invalidate the theorem, but a discontinuity anywhere in $[a,b]$ does.",
    ],
    examAsked: [
      "NEB: 'Apply Lagrange's MVT to $f(x)=\\ln x$ on $[1, e]$.' — find $c$ with $f'(c) = 1$.",
      "CEE: 'Why is MVT invalid for $f(x)=|x|$ on $[-1,1]$?' — not differentiable at 0.",
    ],
    commonMistakes: [
      "Claiming MVT identifies the value of $c$ rather than proving it exists.",
      "Applying the theorem without first checking continuity and differentiability, which are not optional.",
    ],
  },
  "math-4": {
    keyFacts: [
      "The Fundamental Theorem of Calculus has two halves, and the second — $\\int_a^b f(x)dx = F(b)-F(a)$ for $F' = f$ — is what lets you evaluate integrals by ANTIDERIVATIVES.",
      "Evaluating a definite integral needs only the ANTIDERIVATIVE and subtraction; the constant of integration disappears because the difference cancels it.",
    ],
    edgeCases: [
      "Leibniz's rule differentiates a variable limit: $\\frac{d}{dx}\\int_a^{g(x)} f(t)dt = f(g(x))g'(x)$ — the upper limit is what moves, not the integrand alone.",
      "A proper Riemann integral needs a CONTINUOUS (or bounded with few discontinuities) integrand; $\\int \\frac{1}{x}$ across 0 diverges as an improper integral, giving a finite principal-value result that is NOT an ordinary integral.",
    ],
    examAsked: [
      "NEB: 'Differentiate $y = \\int_0^{x^2} e^{-t^2}dt$.' — $2x e^{-x^4}$.",
      "CEE: 'Why is $\\frac{d}{dx}\\int_a^x f(t)dt = f(x)$?' — the first half of FTC.",
    ],
    commonMistakes: [
      "Differentiating the integrand while ignoring that the LIMIT is a function of $x$.",
      "Forgetting the chain-rule factor $g'(x)$ on $f(g(x))$.",
    ],
  },
  "math-5": {
    keyFacts: [
      "A dot product is a SCALAR ($\\mathbb{R}$) and a cross product is an AXIAL VECTOR perpendicular to the plane; in 3D the cross product is not defined, only in $\\mathbb{R}^3$.",
      "The scalar triple product $a\\cdot(b\\times c)$ gives the VOLUME of the parallelepiped, and is zero exactly when the three vectors are coplanar.",
    ],
    edgeCases: [
      "The cross product vanishes for parallel or antiparallel vectors, so $a\\times b = 0$ does NOT mean $a$ and $b$ are perpendicular — it means they are parallel, which is a classic trap.",
      "In 2D the 'cross product' is a scalar $a_xb_y - a_yb_x$ (the $z$-component), used to test orientation; the vector form needs 3D.",
    ],
    examAsked: [
      "NEB: 'Find the angle between $\\vec a = \\hat i + 2\\hat j + 3\\hat k$ and $\\vec b = \\hat j - \\hat k$.' — use $\\cos\\theta = \\frac{a\\cdot b}{|a||b|}$.",
      "CEE: 'What does $a\\cdot(b\\times c) = 0$ imply?' — the vectors are coplanar.",
    ],
    commonMistakes: [
      "Saying $a \\times b = 0$ means perpendicular. Parallel vectors give a zero cross product; perpendicular ones give a maximum.",
      "Applying the 2D scalar cross product formula while assuming a 3D vector result.",
    ],
  },
  "math-6": {
    keyFacts: [
      "The shortest distance between two skew lines is measured along a direction PERPENDICULAR to BOTH, so $d = \\frac{|(b-a)\\cdot(d_1\\times d_2)|}{|d_1\\times d_2|}$ — the cross product is essential, not decorative.",
      "If the lines are parallel then $d_1 \\times d_2 = 0$ and the formula degenerates, so the parallel and skew cases must be checked separately.",
    ],
    edgeCases: [
      "If the lines INTERSECT, the shortest distance is 0 and the formula returns 0 automatically — one formula covering both cases, but only if the lines are genuinely not parallel.",
      "The common perpendicular need not lie between the two lines, and the parameter along it may be outside $[0,1]$; the length is still correct but the foot may sit outside the segments.",
    ],
    examAsked: [
      "NEB: 'Find the distance between $\\frac{x}{1} = \\frac{y}{2} = \\frac{z}{3}$ and the line through the origin with direction $(1,1,0)$.' — use the cross-product formula.",
      "CEE: 'What is the distance between two intersecting lines?' — zero.",
    ],
    commonMistakes: [
      "Dividing by $|d_1 \\times d_2|$ when the directions are parallel, giving division by zero instead of recognising the parallel case.",
      "Using the angle between the lines as the distance — it is a direction property, not a length.",
    ],
  },
  "math-7": {
    keyFacts: [
      "L'Hôpital's rule applies ONLY to $0/0$ and $\\infty/\\infty$ forms, and requires differentiability — it is not a general integration shortcut.",
      "The derivative must be taken on the WHOLE quotient ratio, and the limit must exist, otherwise the theorem does not apply.",
    ],
    edgeCases: [
      "$\\frac{0}{0}$ and $\\infty/\\infty$ are the ONLY admissible forms. A limit such as $\\lim_{x\\to0} x\\sin\\frac1x$ has an indeterminate PRODUCT form and is not directly a L'Hôpital candidate at all.",
      "L'Hôpital can return a limit that does not exist while the original DOES (or vice versa) if applied where conditions fail; a counterexample is $\\lim_{x\\to\\infty}\\frac{x\\sin x}{x}$ style forms where the quotient limit differs from the value.",
      "Differentiating only the numerator and forgetting to differentiate the denominator, which is a misuse rather than a failure of the theorem.",
    ],
    examAsked: [
      "NEB: 'Evaluate $\\lim_{x\\to0}\\frac{e^x - 1}{x}$.' — $1/1 = 1$.",
      "CEE: 'Is L'Hôpital valid for $\\lim_{x\\to0}\\frac{\\sin x}{x^2}$?' — no, the form is $0/0$ but the derivative quotient diverges; direct squeeze gives 0.",
    ],
    commonMistakes: [
      "Differentiating the numerator only.",
      "Applying it to forms other than $0/0$ or $\\infty/\\infty$, or to functions that are not differentiable at the point.",
    ],
  },
  "math-8": {
    keyFacts: [
      "King's rule: if $f(x)$ is symmetric about $x = \\frac{a+b}{2}$ then $\\int_a^b f(x)dx = 2\\int_a^{(a+b)/2}f(x)dx$ — a shortcut that halves the work and frequently avoids the integrand entirely.",
      "The rule works for any symmetric integrand, not just polynomials, and the interval must be symmetric about the axis.",
    ],
    edgeCases: [
      "The symmetry must be about the MIDPOINT of the interval. A function symmetric about the origin on $[-a,a]$ reduces to $2\\int_0^a$, but on $[0, 2a]$ the same rule is not applicable.",
      "The rule gives a relation between two integrals, not the value. To find the value you still need one of the integrals, so it is a simplification rather than a solution.",
    ],
    examAsked: [
      "NEB: 'Evaluate $\\int_{-2}^{2}(x^4+3x)dx$.' — the odd part integrates to 0 over a symmetric interval, leaving 64/5.",
      "CEE: 'Evaluate $\\int_{-a}^{a} e^{-x^2}dx$.' — not elementary; King's rule gives $2\\int_0^a$, which is the point.",
    ],
    commonMistakes: [
      "Claiming an odd function always integrates to zero — only over a SYMMETRIC interval; over $[0,2]$ it does not.",
      "Applying King's rule on an interval that is not symmetric about the function's axis.",
    ],
  },
  "math-9": {
    keyFacts: [
      "The integrating factor for a linear ODE $\\frac{dy}{dx}+Py = Q$ is $e^{\\int P\\,dx}$, and multiplying through makes the left side an exact derivative — that is WHY it works.",
      "The 'I.F.' $e^{\\int P dx}$ applies only to FIRST-ORDER linear equations; second-order and non-linear equations need other methods entirely.",
    ],
    edgeCases: [
      "The constant of integration INSIDE the integrating factor cancels in the ratio, so $e^{\\int P dx}$ may be used without a constant — but a coefficient multiplying $P$ must be handled exactly.",
      "The integrating factor is $e^{\\int P dx}$ for the form $y' + Py = Q$. For $y'' + Py' + Qy = R$ the method does not apply; students frequently misapply the first-order formula to a second-order equation.",
    ],
    examAsked: [
      "NEB: 'Solve $\\frac{dy}{dx} + 2y = e^x$.' — I.F. $= e^{2x}$, giving $y = \\frac13 e^x + Ce^{-2x}$.",
      "CEE: 'Why does the integrating factor work?' — it converts the LHS into $\\frac{d}{dx}(ye^{\\int P dx})$.",
    ],
    commonMistakes: [
      "Using $e^{\\int Pdx}$ on a second-order ODE, where it is not the correct method.",
      "Forgetting the arbitrary constant in the final general solution.",
    ],
  },
};
