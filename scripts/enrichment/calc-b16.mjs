import { mk } from "./topic-factory.mjs";

/** Batch 16 — standard limits, parametric/implicit, geometric meaning, concavity. */
export const CALC_B16 = [
  mk({
    title: "Limits: Algebraic, Trigonometric, Exponential and Logarithmic",
    topicTitle: "Limits: algebraic, trigonometric, exponential and logarithmic",
    topicSlug: "limits-algebraic-trig-exp-log",
    notes: [
      "**The standard limits that unlock everything else:** $\\lim_{x\\to0}\\frac{\\sin x}{x}=1$, $\\lim_{x\\to0}\\frac{\\tan x}{x}=1$, and $\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac12$. The second follows from the first and the third from the half-angle identity, so only one needs proving.",
      "**All three assume RADIANS.** In degrees each is scaled: $\\lim\\frac{\\sin x}{x}=\\frac{\\pi}{180}$ and $\\lim\\frac{1-\\cos x}{x^2}=\\frac{\\pi^2}{360}$. A calculator left in degree mode produces exactly the wrong value, which is the most practical trap in the topic.",
      "**Rational functions and polynomials substitute directly:** since polynomials are continuous everywhere and rational functions are continuous away from their zeros, $\\lim_{x\\to a}\\frac{P(x)}{Q(x)}=\\frac{P(a)}{Q(a)}$ whenever $Q(a)\\ne0$.",
      "**Exponential and logarithmic limits are continuous functions:** $\\lim_{x\\to a}e^{f(x)}=e^{f(a)}$ and $\\lim_{x\\to a}\\ln f(x)=\\ln f(a)$ for $f(a)>0$. The domain condition on the logarithm is what excludes $f(a)\\le0$.",
      "**The $1^\\infty$ family via logarithms:** for $y=(1+\\frac{1}{x})^x$, take logs to get $\\lim x\\ln(1+\\frac1x)$, a $0/0$ form, and L'Hôpital then gives $\\lim\\frac{\\frac{1}{x}\cdot\frac{1}{1+1/x}}{1}=1$, so the limit is $e$.",
      "**Composition of continuous functions settles most limits:** if $f$ is continuous at $a$ and $g$ is continuous at $f(a)$, then $\\lim_{x\\to a}g(f(x))=g(f(a))$. This is why almost no work is needed for expressions built from polynomials, roots, exponentials and logarithms with well-behaved arguments.",
    ],
    confusions: [
      "Using the standard limits with x in degrees, which changes every value by a factor involving $\\pi$.",
      "Applying $\\lim \\ln f = \\ln(\\lim f)$ when the limit of $f$ is negative, where the logarithm is not defined at all.",
      "Forgetting that the $1^\\infty$ case needs logarithms and cannot be handled by L'Hôpital directly.",
    ],
    practice: [
      "$\\lim_{x\\to0}\\frac{\\sin 3x}{3x}$: put $u=3x$, so the limit is $\\lim_{u\\to0}\\frac{\\sin u}{u}=1$.",
      "$\\lim_{x\\to0}\\frac{2^x-1}{x}$: L'Hôpital gives $\\frac{2^x\\ln2}{1}\\to\\ln2$.",
      "$\\lim_{x\\to\\infty}\\left(\\frac{x+1}{x-1}\\right)^x = e^2$: logs give $\\lim x\\ln\\left(1+\\frac2{x-1}\\right)=2$.",
    ],
    universalFacts: [
      "The limit defining $e$ is exactly the $1^\\infty$ case, which is why $e$ governs continuous compounding rather than discrete interest steps.",
      "In physics, $\\lim_{t\\to0}\\frac{\\sin\\theta}{\\theta}=1$ is why the small-angle approximation $\\sin\\theta\\approx\\theta$ is valid for pendulum and projectile work — and it only holds in radians.",
    ],
    formulas: [
      "$\\lim_{x\\to0}\\frac{\\sin x}{x}=1$, $\\lim_{x\\to0}\\frac{\\tan x}{x}=1$",
      "$\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac12$",
      "Degrees: $\\lim\\frac{\\sin x}{x}=\\frac{\\pi}{180}$",
      "Rational: $\\lim_{x\\to a}\\frac{P}{Q}=\\frac{P(a)}{Q(a)}$ for $Q(a)\\ne0$",
      "$\\lim_{x\\to a}e^{f}=e^{f(a)}$, $\\lim_{x\\to a}\\ln f=\\ln f(a)$ for $f(a)>0$",
    ],
    keyPoints: [
      "All three standard trigonometric limits assume radians.",
      "Continuous functions compose, so most limits need no special technique.",
      "$1^\\infty$ limits are handled by taking logarithms first.",
    ],
    summary:
      "Three standard limits — the sine, tangent and cosine forms — unlock most of the topic, and all assume radians, which is the trap that changes every numerical answer. Rational functions and compositions of continuous functions settle themselves by direct substitution. The remaining family, limits of the form $(1+1/x)^x$, is handled by taking logarithms and reducing to a $0/0$ quotient, which is where the definition of $e$ itself comes from.",
    importantStatements: [
      "Statement 1: $\\lim_{x\\to0}\\frac{\\sin x}{x}=1$ for $x$ in radians.",
      "Statement 2: $\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\frac12$.",
      "Statement 3: For $Q(a)\\ne0$, $\\lim_{x\\to a}\\frac{P(x)}{Q(x)}=\\frac{P(a)}{Q(a)}$.",
      "Statement 4: $\\lim_{x\\to a}\\ln f(x)=\\ln f(a)$ requires $f(a)>0$.",
      "Statement 5: $\\lim_{n\\to\\infty}(1+\\frac1n)^n=e$.",
    ],
    examShortTricks: [
      "Switch the calculator to radians before evaluating anything in this topic.",
      "If the answer involves $\\frac{\\pi}{180}$, the degrees/radians conversion was missed.",
    ],
    examNotes: [
      "Combining a standard limit with a substitution such as $u=3x$ is a reliable 2–3 mark question.",
    ],
    mcs: [
      {
        question: "$\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$ (radians) is:",
        options: ["$0$", "$\\frac12$", "$1$", "$2$"],
        answer: "B",
        explanation: "Using $1-\\cos^2x=\\sin^2x$ and $\\lim\\frac{\\sin x}{x}=1$ with $\\cos0=1$ gives $\\frac12$.",
      },
      {
        question: "The standard limit $\\lim_{x\\to0}\\frac{\\sin x}{x}=1$ holds when $x$ is measured in:",
        options: ["degrees", "radians", "gradians", "any unit"],
        answer: "B",
        explanation: "In degrees the value is $\\frac{\\pi}{180}$, because the radian is defined by this very limit.",
      },
      {
        question: "$\\lim_{x\\to2}\\frac{3x^2+1}{x-2}$ is:",
        options: ["$\\frac{13}{0}$", "does not exist as a finite limit", "$0$", "$6.5$"],
        answer: "B",
        explanation: "The denominator vanishes at 2 while the numerator does not, giving a vertical asymptote rather than a finite limit.",
      },
    ],
    visualType: "limit",
  }),
];
