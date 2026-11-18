import type { LeafDepth } from "./mindmap-depth";

/** Mathematics fallback leaves (math-1 … math-9). */
export const FALLBACK_MATH_A: Record<string, LeafDepth> = {
  "math-1": {
    keyFacts: [
      "A limit describes what a function APPROACHES, not what it equals: $\\frac{x^2-4}{x-2}$ is undefined at 2 yet $\\lim_{x\\to2} = 4$.",
      "$\\lim_{x\\to0}\\frac{\\sin x}{x} = 1$ only when $x$ is in RADIANS; in degrees the value is $\\frac{\\pi}{180}$.",
      "Continuity at $a$ needs three things: $f(a)$ defined, $\\lim_{x\\to a} f(x)$ exists, and the two are equal — check all three, every time.",
      "The algebra of limits ($\\lim(f+g) = \\lim f + \\lim g$) is valid only when both individual limits exist finitely — that premise is exactly what $0/0$ violates.",
    ],
    edgeCases: [
      "$0/0$ and $\\infty/\\infty$ are INDETERMINATE, meaning 'calculation failed' — not zero and not infinite. Algebra must be done first.",
      "$\\lim_{x\\to\\infty}\\frac1x = 0$ while $\\lim_{x\\to0^+}\\frac1x = +\\infty$: the same expression behaves completely differently depending on the approach.",
      "Piecewise functions are the standard vehicle for limit questions: the two branches must AGREE at the join for the function to be continuous there.",
      "$\\lim_{x\\to0}\\frac{\\tan x - \\sin x}{x^3} = \\tfrac12$ needs series expansion — factorising alone still leaves an indeterminate form.",
    ],
    examAsked: [
      "NEB: 'Evaluate $\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$.' — use the conjugate: $\\tfrac12$.",
      "CEE: '$\\lim_{x\\to\\infty}(1+\\frac1x)^x$?' — $e$.",
      "NEB: 'Find $k$ so that $f(x) = \\frac{x^2-4}{x-2}$ ($x\\ne2$), $f(2)=k$ is continuous at 2.' — $k = 4$.",
      "CEE: 'Show $f(x)=|x|$ is continuous but not differentiable at 0.' — the two-sided limit exists; the two-sided derivative does not.",
    ],
    commonMistakes: [
      "Substituting the point and writing 'undefined' — the limit is not the function value.",
      "Using the standard limit with x in degrees, changing the answer by $\\pi/180$.",
      "Cancelling $(x-2)$ and then substituting $x = 2$: after cancelling, the limit exists but the function value still does not.",
      "Checking one-sided limits only at jumps — at an endpoint of a closed interval continuity is also one-sided.",
    ],
  },
  "math-2": {
    keyFacts: [
      "The derivative is defined as a LIMIT OF SECANTS, $f'(a) = \\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}$, so it is a slope, not a fraction you may cancel.",
      "$f'(a)$ exists only if the two-sided limit exists — a one-sided derivative alone is not a derivative.",
      "From first principles, $\\frac{d}{dx}x^n = nx^{n-1}$ is a THEOREM proved by expanding $(x+h)^n$ — quoting it inside a first-principles question earns nothing.",
      "The derivative of a constant is zero because the secant slope of a horizontal line is zero for every $h$ — the definition gives it directly.",
    ],
    edgeCases: [
      "Differentiability IMPLIES continuity but not the reverse: $|x|$ at 0 is continuous yet has left derivative $-1$ and right derivative $+1$.",
      "$\\frac{dy}{dx}$ notation invites illegal cancellation. It is shorthand for a limit process, so $\\frac{dy}{dx} \\neq \\frac{dy}{dx}$ manipulations that treat it as a ratio.",
      "A cusp (e.g. $y = x^{2/3}$ at 0) has both one-sided derivatives infinite: continuous, not differentiable, and not a corner either.",
      "Product and quotient rules must be DERIVED when the question says first principles; using them circularly is the standard zero-mark answer.",
    ],
    examAsked: [
      "NEB: 'Differentiate $y = x^2(3x+1)$ from first principles.' — $9x^2 + 2x$.",
      "CEE: 'Show $f(x)=|x|$ is not differentiable at 0.' — left/right derivatives differ in sign.",
      "NEB: 'Differentiate $\\sin x$ from first principles.' — use $\\lim_{h\\to0}\\frac{\\sin h}{h}=1$ and $\\lim_{h\\to0}\\frac{1-\\cos h}{h}=0$.",
      "CEE: 'Differentiate $\\sqrt{x}$ from first principles.' — rationalise the numerator to get $\\frac{1}{2\\sqrt x}$.",
    ],
    commonMistakes: [
      "Treating $\\frac{dy}{dx}$ as an ordinary fraction and cancelling terms across the derivative sign.",
      "Concluding differentiability from continuity alone.",
      "Dropping the $-f(x)$ term in the difference quotient, turning the definition into a one-sided ratio.",
      "Mis-expanding $(x+h)^n$ with the wrong binomial coefficient, so the $h$ that must cancel does not.",
    ],
  },
  "math-3": {
    keyFacts: [
      "Lagrange's MVT says $\\frac{f(b)-f(a)}{b-a} = f'(c)$ for SOME $c$ in $(a,b)$ — it guarantees existence of a point, never tells you which.",
      "The theorem is equivalent to Rolle's theorem with the endpoint chord subtracted, which is why Rolle's is always proved first.",
      "Rolle's theorem ($f(a)=f(b)$) guarantees $f'(c)=0$ — the workhorse behind 'prove the equation has exactly one root'.",
      "The uniqueness half of that recipe: one root by the IVT, at most one by the strict sign of $f'$ — two marks, two tools.",
    ],
    edgeCases: [
      "MVT's hypotheses (continuous on $[a,b]$, differentiable on $(a,b)$) are ESSENTIAL: a function with a corner fails differentiability, and $f(x) = |x|$ on $[-1,1]$ has no valid $c$ at the corner.",
      "A vertical tangent or an endpoint derivative does not invalidate the theorem, but a discontinuity anywhere in $[a,b]$ does.",
      "The $c$ need not be unique: a wavy function may satisfy the conclusion at several points — the theorem promises at least one.",
      "An infinite derivative at an endpoint is acceptable; only interior differentiability is required.",
    ],
    examAsked: [
      "NEB: 'Apply Lagrange's MVT to $f(x)=\\ln x$ on $[1, e]$.' — find $c$ with $f'(c) = 1$.",
      "CEE: 'Why is MVT invalid for $f(x)=|x|$ on $[-1,1]$?' — not differentiable at 0.",
      "NEB: 'Verify Rolle's theorem for $f(x)=x^2-4x+4$ on $[0,4]$.' — $c = 2$.",
      "CEE: 'Prove $|\\sin a - \\sin b| \\le |a-b|$.' — MVT gives $|f'(c)| = |\\cos c| \\le 1$.",
    ],
    commonMistakes: [
      "Claiming MVT identifies the value of $c$ rather than proving it exists.",
      "Applying the theorem without first checking continuity and differentiability, which are not optional.",
      "Quoting MVT on an open interval without the closed-interval continuity condition.",
      "Swapping $a$ and $b$ in $f'(c) = \\frac{f(b)-f(a)}{b-a}$ and losing the sign of the result.",
    ],
  },
  "math-4": {
    keyFacts: [
      "The Fundamental Theorem of Calculus has two halves, and the second — $\\int_a^b f(x)dx = F(b)-F(a)$ for $F' = f$ — is what lets you evaluate integrals by ANTIDERIVATIVES.",
      "Evaluating a definite integral needs only the ANTIDERIVATIVE and subtraction; the constant of integration disappears because the difference cancels it.",
      "The first half, $\\frac{d}{dx}\\int_a^x f(t)dt = f(x)$, says differentiation and integration are INVERSE operations — quote it by name.",
      "A definite integral is a NUMBER (signed area); an indefinite integral is a FAMILY of functions. Answering with the wrong type is a marking point.",
    ],
    edgeCases: [
      "Leibniz's rule differentiates a variable limit: $\\frac{d}{dx}\\int_a^{g(x)} f(t)dt = f(g(x))g'(x)$ — the upper limit is what moves, not the integrand alone.",
      "A proper Riemann integral needs a CONTINUOUS (or bounded with few discontinuities) integrand; $\\int \\frac{1}{x}$ across 0 diverges as an improper integral, giving a finite principal-value result that is NOT an ordinary integral.",
      "A discontinuity INSIDE $[a,b]$ means the integral must be split at that point — computing through it silently changes the value.",
      "When both limits are functions of $x$, differentiate as $f(g(x))g'(x) - f(h(x))h'(x)$ — the lower limit contributes with a minus sign.",
    ],
    examAsked: [
      "NEB: 'Differentiate $y = \\int_0^{x^2} e^{-t^2}dt$.' — $2x e^{-x^4}$.",
      "CEE: 'Why is $\\frac{d}{dx}\\int_a^x f(t)dt = f(x)$?' — the first half of FTC.",
      "NEB: 'Evaluate $\\int_0^1 \\frac{dx}{1+x^2}$.' — $\\tan^{-1}x\\big|_0^1 = \\tfrac{\\pi}{4}$.",
      "CEE: 'Find $\\frac{d}{dx}\\int_x^{x^2} e^{-t^2}dt$.' — $2x e^{-x^4} - e^{-x^2}$.",
    ],
    commonMistakes: [
      "Differentiating the integrand while ignoring that the LIMIT is a function of $x$.",
      "Forgetting the chain-rule factor $g'(x)$ on $f(g(x))$.",
      "Substituting the lower limit with the wrong sign, adding where subtraction is required.",
      "Writing $\\int \\tfrac1x dx = \\ln x$ without the modulus — correct only for $x > 0$.",
    ],
  },
  "math-5": {
    keyFacts: [
      "A dot product is a SCALAR ($\\mathbb{R}$) and a cross product is an AXIAL VECTOR perpendicular to the plane; in 3D the cross product is not defined, only in $\\mathbb{R}^3$.",
      "The scalar triple product $a\\cdot(b\\times c)$ gives the VOLUME of the parallelepiped, and is zero exactly when the three vectors are coplanar.",
      "$\\vec a \\cdot \\vec b = |a||b|\\cos\\theta$ measures parallel-ness; $|\\vec a \\times \\vec b| = |a||b|\\sin\\theta$ is the PARALLELOGRAM area spanned by the pair.",
      "The vector triple product expands BAC-CAB: $\\vec a \\times (\\vec b \\times \\vec c) = (\\vec a\\cdot\\vec c)\\vec b - (\\vec a\\cdot\\vec b)\\vec c$.",
    ],
    edgeCases: [
      "The cross product vanishes for parallel or antiparallel vectors, so $a\\times b = 0$ does NOT mean $a$ and $b$ are perpendicular — it means they are parallel, which is a classic trap.",
      "In 2D the 'cross product' is a scalar $a_xb_y - a_yb_x$ (the $z$-component), used to test orientation; the vector form needs 3D.",
      "The STP is cyclic — $a\\cdot(b\\times c) = b\\cdot(c\\times a)$ — but swapping any two vectors flips its sign: antisymmetric under exchange.",
      "A zero dot product means PERPENDICULAR (non-zero vectors); a zero cross product means PARALLEL — the two zeros encode opposite geometries.",
    ],
    examAsked: [
      "NEB: 'Find the angle between $\\vec a = \\hat i + 2\\hat j + 3\\hat k$ and $\\vec b = \\hat j - \\hat k$.' — use $\\cos\\theta = \\frac{a\\cdot b}{|a||b|}$.",
      "CEE: 'What does $a\\cdot(b\\times c) = 0$ imply?' — the vectors are coplanar.",
      "NEB: 'Find the area of the triangle with vertices A, B, C.' — half the magnitude of $\\vec{AB} \\times \\vec{AC}$.",
      "CEE: 'For what $\\lambda$ are $\\hat i + \\lambda\\hat j$ and $2\\hat i - \\hat j$ perpendicular?' — $\\lambda = 2$.",
    ],
    commonMistakes: [
      "Saying $a \\times b = 0$ means perpendicular. Parallel vectors give a zero cross product; perpendicular ones give a maximum.",
      "Applying the 2D scalar cross product formula while assuming a 3D vector result.",
      "Treating $|a||b|\\sin\\theta$ as the cross product without its direction — the result is a vector along $\\hat n$.",
      "Writing $a\\times(b\\cdot c)$: the dot product returns a scalar, so the cross is meaningless there.",
    ],
  },
  "math-6": {
    keyFacts: [
      "The shortest distance between two skew lines is measured along a direction PERPENDICULAR to BOTH, so $d = \\frac{|(b-a)\\cdot(d_1\\times d_2)|}{|d_1\\times d_2|}$ — the cross product is essential, not decorative.",
      "If the lines are parallel then $d_1 \\times d_2 = 0$ and the formula degenerates, so the parallel and skew cases must be checked separately.",
      "The vector $d_1 \\times d_2$ lies along the common perpendicular; the distance is the projection of any joining vector onto it.",
      "In 3D, two lines are either parallel, intersecting, or skew — 'skew' simply means non-coplanar.",
    ],
    edgeCases: [
      "If the lines INTERSECT, the shortest distance is 0 and the formula returns 0 automatically — one formula covering both cases, but only if the lines are genuinely not parallel.",
      "The common perpendicular need not lie between the two lines, and the parameter along it may be outside $[0,1]$; the length is still correct but the foot may sit outside the segments.",
      "Direction ratios misread from the symmetric form produce the wrong $d$ vectors — always extract them from the denominators.",
      "For finite SEGMENTS the formula is only a lower bound; the true minimum may be between endpoints.",
    ],
    examAsked: [
      "NEB: 'Find the distance between $\\frac{x}{1} = \\frac{y}{2} = \\frac{z}{3}$ and the line through the origin with direction $(1,1,0)$.' — use the cross-product formula.",
      "CEE: 'What is the distance between two intersecting lines?' — zero.",
      "NEB: 'Show that $\\vec r = (\\hat i+\\hat j) + t(\\hat i-\\hat j)$ and $\\vec r = (2\\hat i-\\hat j) + s(\\hat i+\\hat k)$ are skew.' — non-parallel and non-intersecting.",
      "CEE: 'Find the distance between the $x$-axis and the line $x = y = z+2$.' — take $(b-a) = (0,0,-2)$ in the formula.",
    ],
    commonMistakes: [
      "Dividing by $|d_1 \\times d_2|$ when the directions are parallel, giving division by zero instead of recognising the parallel case.",
      "Using the angle between the lines as the distance — it is a direction property, not a length.",
      "Reporting $|(b-a)\\cdot(d_1\\times d_2)|$ alone — that is a volume; the division by $|d_1\\times d_2|$ is what makes it a distance.",
      "Checking only parallelism and declaring 'skew' without testing for intersection.",
    ],
  },
  "math-7": {
    keyFacts: [
      "L'Hôpital's rule applies ONLY to $0/0$ and $\\infty/\\infty$ forms, and requires differentiability — it is not a general integration shortcut.",
      "The derivative must be taken on the WHOLE quotient ratio, and the limit must exist, otherwise the theorem does not apply.",
      "Simplify BEFORE differentiating: $\\lim_{x\\to0}\\frac{\\sin x}{x(1+\\cos x)}$ needs no L'Hôpital at all.",
      "Repeat only while the indeterminate form persists — re-check the form after EVERY differentiation.",
    ],
    edgeCases: [
      "$\\frac{0}{0}$ and $\\infty/\\infty$ are the ONLY admissible forms. A limit such as $\\lim_{x\\to0} x\\sin\\frac1x$ has an indeterminate PRODUCT form and is not directly a L'Hôpital candidate at all.",
      "L'Hôpital can return a limit that does not exist while the original DOES (or vice versa) if applied where conditions fail; a counterexample is $\\lim_{x\\to\\infty}\\frac{x\\sin x}{x}$ style forms where the quotient limit differs from the value.",
      "Differentiating only the numerator and forgetting to differentiate the denominator, which is a misuse rather than a failure of the theorem.",
      "Forms $0\\cdot\\infty$, $\\infty-\\infty$, $1^\\infty$, $0^0$, $\\infty^0$ must first be REWRITTEN as a quotient (or logged) — only then does the rule apply.",
    ],
    examAsked: [
      "NEB: 'Evaluate $\\lim_{x\\to0}\\frac{e^x - 1}{x}$.' — $1/1 = 1$.",
      "CEE: 'Is L'Hôpital valid for $\\lim_{x\\to0}\\frac{\\sin x}{x^2}$?' — no, the form is $0/0$ but the derivative quotient diverges; direct squeeze gives 0.",
      "NEB: 'Evaluate $\\lim_{x\\to0}\\frac{a^x - b^x}{x}$.' — $\\ln(a/b)$.",
      "CEE: 'Evaluate $\\lim_{x\\to0}(1+3x)^{1/x}$.' — $e^3$ via logarithms.",
    ],
    commonMistakes: [
      "Differentiating the numerator only.",
      "Applying it to forms other than $0/0$ or $\\infty/\\infty$, or to functions that are not differentiable at the point.",
      "Declaring $1^\\infty = 1$; it is indeterminate — $e = \\lim(1+1/n)^n$ is exactly why.",
      "Differentiating with respect to the wrong variable when the limit runs over $n \\to \\infty$; convert first.",
    ],
  },
  "math-8": {
    keyFacts: [
      "King's rule: if $f(x)$ is symmetric about $x = \\frac{a+b}{2}$ then $\\int_a^b f(x)dx = 2\\int_a^{(a+b)/2}f(x)dx$ — a shortcut that halves the work and frequently avoids the integrand entirely.",
      "The rule works for any symmetric integrand, not just polynomials, and the interval must be symmetric about the axis.",
      "The general form is $\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx$; King's rule is its symmetric consequence, proved by the substitution $x = a+b-t$.",
      "Adding the two forms gives $2I = \\int_a^b [f(x) + f(a+b-x)]dx$, often collapsing the integrand to a constant — the standard exam trick.",
    ],
    edgeCases: [
      "The symmetry must be about the MIDPOINT of the interval. A function symmetric about the origin on $[-a,a]$ reduces to $2\\int_0^a$, but on $[0, 2a]$ the same rule is not applicable.",
      "The rule gives a relation between two integrals, not the value. To find the value you still need one of the integrals, so it is a simplification rather than a solution.",
      "The classic corollary $\\int_0^{\\pi} x f(\\sin x)dx = \\frac{\\pi}{2}\\int_0^{\\pi} f(\\sin x)dx$ is King's rule with the factor $x$ averaged — memorise it as a unit.",
      "A discontinuous integrand must be split at the discontinuity BEFORE any symmetry rule is applied.",
    ],
    examAsked: [
      "NEB: 'Evaluate $\\int_{-2}^{2}(x^4+3x)dx$.' — the odd part integrates to 0 over a symmetric interval, leaving 64/5.",
      "CEE: 'Evaluate $\\int_{-a}^{a} e^{-x^2}dx$.' — not elementary; King's rule gives $2\\int_0^a$, which is the point.",
      "NEB: 'Evaluate $\\int_0^{\\pi} \\frac{x\\sin x}{1+\\cos^2 x}dx$.' — the corollary gives $\\frac{\\pi}{2}\\int_0^\\pi\\frac{\\sin x}{1+\\cos^2 x}dx = \\tfrac{\\pi^2}{4}$.",
      "CEE: 'Prove $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$.' — substitute $x = a - t$ and flip the limits.",
    ],
    commonMistakes: [
      "Claiming an odd function always integrates to zero — only over a SYMMETRIC interval; over $[0,2]$ it does not.",
      "Applying King's rule on an interval that is not symmetric about the function's axis.",
      "Forgetting to flip the limits under $x = a+b-t$, which hides the minus sign that makes the rule work.",
      "Assuming the rule needs an even function; the requirement is symmetry about the MIDPOINT, parity is just a special case.",
    ],
  },
  "math-9": {
    keyFacts: [
      "The integrating factor for a linear ODE $\\frac{dy}{dx}+Py = Q$ is $e^{\\int P\\,dx}$, and multiplying through makes the left side an exact derivative — that is WHY it works.",
      "The 'I.F.' $e^{\\int P dx}$ applies only to FIRST-ORDER linear equations; second-order and non-linear equations need other methods entirely.",
      "After multiplying by the I.F. the LHS is $\\frac{d}{dx}\\left(y\\,e^{\\int P dx}\\right)$ — integrate BOTH sides once to reach the general solution.",
      "Bernoulli equations $y' + Py = Qy^n$ become linear on substituting $v = y^{1-n}$ — the standard extension of this method.",
    ],
    edgeCases: [
      "The constant of integration INSIDE the integrating factor cancels in the ratio, so $e^{\\int P dx}$ may be used without a constant — but a coefficient multiplying $P$ must be handled exactly.",
      "The integrating factor is $e^{\\int P dx}$ for the form $y' + Py = Q$. For $y'' + Py' + Qy = R$ the method does not apply; students frequently misapply the first-order formula to a second-order equation.",
      "If the equation gives $x$ as a function of $y$, read $P$ and $Q$ in that role instead — the formula is symmetric under the swap.",
      "Dividing by a coefficient that can vanish creates a singular solution the general form misses — check where the division was legal.",
    ],
    examAsked: [
      "NEB: 'Solve $\\frac{dy}{dx} + 2y = e^x$.' — I.F. $= e^{2x}$, giving $y = \\frac13 e^x + Ce^{-2x}$.",
      "CEE: 'Why does the integrating factor work?' — it converts the LHS into $\\frac{d}{dx}(ye^{\\int P dx})$.",
      "NEB: 'Solve $\\cos x \\frac{dy}{dx} + y\\sin x = 1$.' — divide by $\\cos x$ first: I.F. $= \\sec x$, giving $y = \\sin x + C\\cos x$.",
      "CEE: 'Find the I.F. of $\\frac{dy}{dx} + \\frac{y}{x} = x^2$.' — $e^{\\int dx/x} = x$ for $x > 0$.",
    ],
    commonMistakes: [
      "Using $e^{\\int Pdx}$ on a second-order ODE, where it is not the correct method.",
      "Forgetting the arbitrary constant in the final general solution.",
      "Reading $P$ before making the coefficient of $dy/dx$ exactly 1.",
      "Writing $\\int \\frac1x dx = \\ln x$ without the modulus in a domain that includes negative $x$.",
    ],
  },
};
