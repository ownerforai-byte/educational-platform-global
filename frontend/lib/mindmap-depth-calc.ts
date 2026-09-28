import type { UnitDepth } from "./mindmap-depth";

/** Limits, continuity, derivatives & applications. */
export const CALC_DEPTH: Record<string, UnitDepth> = {
  calculus: {
    unitFacts: [
      "A limit describes the value a function APPROACHES, not the value it takes: $f(x) = \\frac{x^2-4}{x-2}$ is undefined at $x=2$ yet $\\lim_{x\\to2} f(x) = 4$.",
      "The derivative is a rate of change AND a gradient of the tangent, while the integral is an accumulation and an AREA — those two meanings are the whole of the topic.",
    ],
    unitEdgeCases: [
      "Continuity requires ALL THREE conditions (defined, limit exists, equal). A removable discontinuity like $\\frac{x^2-4}{x-2}$ at 2 fails the first condition alone.",
      "Differentiability implies continuity, but continuity does NOT imply differentiability — $|x|$ at 0 is the standard counter-example, continuous but with a left and right derivative of opposite sign.",
    ],
    unitExamAsked: [
      "NEB: 'Evaluate $\\lim_{x\\to\\infty}\\left(1 + \\frac{a}{x}\\right)^x = e^a$.' — the standard exponential limit.",
      "CEE: 'Is $f(x) = |x|$ differentiable at $x=0$?' — no; left derivative $-1$, right derivative $+1$.",
    ],
    unitCommonMistakes: [
      "Substituting $x=2$ into $\\frac{x^2-4}{x-2}$ and writing 'undefined' as the limit. The limit asks what the function approaches, not what it equals at the point.",
      "Treating $\\frac{dy}{dx}$ as a fraction you can cancel. It is a limit-based definition, not an algebraic quotient.",
    ],
    leaves: {
      "uc-calc-1a": {
        keyFacts: [
          "The indeterminate form $0/0$ never means zero — it means the calculation failed and algebra must be done first, e.g. factorising $x^2-4 = (x-2)(x+2)$.",
          "$\\lim_{x\\to0}\\frac{\\sin x}{x} = 1$ requires $x$ in RADIANS. In degrees the value is $\\frac{\\pi}{180}$.",
        ],
        edgeCases: [
          "$\\lim_{x\\to\\infty}\\frac{1}{x} = 0$ yet $\\lim_{x\\to0^+}\\frac{1}{x} = +\\infty$ — the same algebraic expression has completely different one-sided behaviour depending on the approach.",
          "At $x=0$ the function $\\frac{\\sin x}{x}$ is undefined but the limit exists, which is the cleanest example of a removable discontinuity.",
        ],
        examAsked: [
          "NEB: 'Evaluate $\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$.' — multiply by the conjugate: $\\frac{\\sin^2x}{x^2(1+\\cos x)} \\to \\frac12$.",
          "CEE: '$\\lim_{x\\to\\infty}(1 + \\frac{1}{x})^x$?' — $e$.",
        ],
        commonMistakes: [
          "Writing $0/0 = 0$ or 'undefined' instead of simplifying first.",
          "Applying the standard limit with x in degrees, changing the answer by a factor of $\\pi/180$.",
        ],
      },
      "uc-calc-1b": {
        keyFacts: [
          "Three conditions must all hold at $x=a$: $f(a)$ is DEFINED, $\\lim_{x\\to a} f(x)$ EXISTS, and the two are EQUAL.",
          "A polynomial is continuous everywhere; a rational function is continuous everywhere except at its denominator's zeros, and $\\sqrt{u}$ is continuous for $u \\ge 0$.",
        ],
        edgeCases: [
          "A jump discontinuity has a limit that exists but differs on the two sides (like the floor function at an integer), so continuity fails at the second condition, not the first.",
          "$f(x) = \\frac{\\sin x}{x}$ with $f(0)$ DEFINED as 1 is continuous everywhere — the only discontinuity is a removable one, fillable by redefining a single point.",
        ],
        examAsked: [
          "NEB: 'Find the point(s) of discontinuity of $f(x) = \\frac{x^3-1}{x-1}$.' — none, because $f(x) = x^2+x+1$ for $x \\ne 1$ and the limit at 1 is 3.",
          "CEE: 'Why is $\\tan x$ discontinuous at $x = 90^\\circ$?' — $\\cos x = 0$ there, so the function is undefined there while the limit diverges.",
        ],
        commonMistakes: [
          "Checking only whether $f(a)$ is defined and concluding continuity without comparing with the limit.",
          "Claiming a rational function is discontinuous everywhere because some denominators can be zero; it is continuous at every point where the denominator is non-zero.",
        ],
      },
      "uc-calc-2a": {
        keyFacts: [
          "The product rule is $d(uv)/dx = u dv + v du$ and the quotient rule is $d(u/v)/dx = \\frac{v du - u dv}{v^2}$ — the order of the two terms in the quotient rule is the whole difficulty.",
          "The derivative of a CONSTANT is zero, and a constant factor may always be pulled outside: $\\frac{d}{dx}[3\\sin x] = 3\\cos x$.",
        ],
        edgeCases: [
          "$\\frac{d}{dx}\\left(\\frac{1}{x}\\right) = -\\frac{1}{x^2}$, and since $\\frac{dx}{dt}$ can be negative, the chain rule may bring a sign reversal that students forget to carry.",
          "Differentiating a function of a function without the chain rule, e.g. giving $1/\\sqrt{u}$ instead of $-\\frac{1}{2}u^{-3/2}\\frac{du}{dx}$.",
        ],
        examAsked: [
          "NEB: 'Differentiate $y = x^2(3x+1)$.' — $y' = 2x(3x+1) + 3x^2 = 9x^2 + 2x$.",
          "CEE: 'Find $\\frac{dy}{dx}$ for $y = \\frac{2x+1}{x-3}$.' — $\\frac{2(x-3) - (2x+1)}{(x-3)^2} = \\frac{-7}{(x-3)^2}$.",
        ],
        commonMistakes: [
          "Reversing the quotient-rule order to give $\\frac{u\\,dv - v\\,du}{v^2}$ and getting the sign wrong.",
          "Using $\\frac{d}{dx}(uv) = \\frac{du}{dx}\\frac{dv}{dx}$, i.e. multiplying derivatives — the product rule ADDS, it never multiplies.",
        ],
      },
      "uc-calc-2b": {
        keyFacts: [
          "The chain rule multiplies by the inner derivative: $\\frac{d}{dx}f(u) = f'(u)\\cdot\\frac{du}{dx}$. In physics this is why acceleration becomes $\\frac{d^2x}{dt^2}$ rather than the first derivative.",
          "Recognise the standard outer functions first ($x^n$, $\\sin$, $e^x$, $\\ln$), then differentiate the inside, then multiply — always in that order.",
        ],
        edgeCases: [
          "$\\frac{d}{dx}\\sin(ax) = a\\cos(ax)$, not $\\cos(ax)$: the inner derivative $a$ is easy to drop.",
          "$\\frac{d}{dx}\\left[(3x+1)^{1/2}\\right] = \\frac{3}{2\\sqrt{3x+1}}$, and a slip in the numerator cost exactly 3 here.",
        ],
        examAsked: [
          "NEB: 'Differentiate $y = \\sin^2 x$.' — treat as $[\\sin x]^2$: $y' = 2\\sin x\\cos x = \\sin 2x$.",
          "CEE: 'Find $\\frac{dy}{dx}$ when $y = e^{2x+1}$.' — $2e^{2x+1}$.",
        ],
        commonMistakes: [
          "Differentiating only the outer function and forgetting to multiply by the inner derivative — the single most common calculus error in both pure and applied papers.",
          "Forgetting that a composite such as $e^{x^2}$ has the inner derivative $2x$, so the answer is $2xe^{x^2}$ not $e^{x^2}$.",
        ],
      },
      "uc-calc-3a": {
        keyFacts: [
          "If $y' > 0$ the function is INCREASING and if $y' < 0$ it is DECREASING; $y' = 0$ marks a STATIONARY point, which is a necessary but not sufficient condition for an extremum.",
          "Monotonicity is determined by the SIGN of the derivative over an INTERVAL, not at a single point — one negative value inside an increasing interval changes nothing.",
        ],
        edgeCases: [
          "A stationary inflection point such as $y = x^3$ at $x = 0$ has $y' = 0$ with no maximum or minimum at all, which is why the zero-derivative test must be supplemented by the second-derivative test.",
          "$y' = 0$ can hold over an entire INTERVAL (for a constant function), so 'infinitely many stationary points' is a real possibility.",
        ],
        examAsked: [
          "NEB: 'Find the interval in which $y = x^3 - 3x$ is increasing.' — $y' = 3(x^2-1) > 0$, so $x < -1$ or $x > 1$.",
          "CEE: 'Why is $y'=0$ not sufficient for a maximum or minimum?' — counter-example $y = x^3$ at $x=0$.",
        ],
        commonMistakes: [
          "Solving $y' = 0$ and calling each root a maximum or minimum without testing the sign change.",
          "Testing the sign of $y'$ at a single point instead of across the whole interval when asked for an interval of monotonicity.",
        ],
      },
      "uc-calc-3b": {
        keyFacts: [
          "Second-derivative test: $y'' > 0$ gives a MINIMUM, $y'' < 0$ a MAXIMUM, and $y'' = 0$ is INCONCLUSIVE — you must then fall back to the first-derivative sign test.",
          "An inflection point is where the CONCAVITY changes, i.e. where $y''$ changes sign, and it is NOT necessarily an extremum.",
        ],
        edgeCases: [
          "$y = x^4$ at $x=0$ has $y'' = 0$ yet a genuine minimum, proving that $y''=0$ decides nothing on its own.",
          "A point can be an extremum AND an inflection point simultaneously (e.g. $x^3$ at 0 has $y''=0$ and is an inflection point while being monotonically increasing) — so 'inflection means not an extremum' is too strong.",
        ],
        examAsked: [
          "NEB: 'Find the stationary points of $y = x^3 - 6x^2 + 9x$ and classify them.' — $y' = 3(x-1)(x-3)$; $y'' = 6(x-3)$ gives a maximum at $x=1$ and a minimum at $x=3$.",
          "CEE: 'When does the second-derivative test fail?' — when $y'' = 0$ at the stationary point, as for $y = x^3$ or $x^4$ at the origin.",
        ],
        commonMistakes: [
          "Saying $y'' = 0$ means a maximum or minimum. It means the test is inconclusive, nothing more.",
          "Conflating an inflection point with a maximum or minimum — they are different properties governed by different sign changes.",
        ],
      },
    },
  },
};