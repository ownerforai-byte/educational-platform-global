import { mk } from "./topic-factory.mjs";

/** Batch 11 — anti-derivatives and integration techniques. */
export const CALC_B11 = [
  mk({
    title: "Anti-derivatives: Integration",
    topicTitle: "Anti-derivatives: integration",
    topicSlug: "anti-derivatives-integration",
    notes: [
      "**An anti-derivative reverses differentiation:** if $F'(x)=f(x)$ then $F$ is an antiderivative of $f$. Every antiderivative of $f$ has the form $F+C$, because differentiating a constant gives zero — so $C$ is arbitrary and this is not a defect of the method but the reason the constant of integration must always appear.",
      "**Integration reads the rule table backwards:** from $\\frac{d}{dx}x^n=nx^{n-1}$ we get $\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ for $n\\ne-1$. The case $n=-1$ is the exception and gives $\\ln|x|+C$, which is why $\\frac1x$ behaves differently from every other power.",
      "**Reversing the trigonometric derivatives:** $\\int\\sin x\\,dx=-\\cos x+C$ and $\\int\\cos x\\,dx=\\sin x+C$, with the minus sign on the first coming from the negative derivative of cosine. From $\\int\\sec x\\tan x\\,dx=\\sec x+C$ and $\\int\\csc x\\cot x\\,dx=-\\csc x+C$ come the standard $\\sec$ and $\\csc$ integrals.",
      "**The integral is a signed area, not a sum of positive pieces:** $\\int$ accumulates over an INTERVAL with orientation, so a function below the axis contributes negatively. This is why $\\int_{-2}^{2}x\\,dx=0$ — the two halves cancel exactly rather than summing to a positive area.",
      "**The sum rule extends to any finite number of terms,** and constants of integration combine into a single $+C$ at the end. Writing a separate $C$ on every line is harmless but unnecessary.",
      "**Some functions have no elementary antiderivative:** $\\int e^{-x^2}\\,dx$ has no expression in elementary functions and is written as $\\frac{\\sqrt\\pi}{2}\\operatorname{erf}(x)$. A question expecting an elementary answer always uses an integrable function, so recognising the un-integrable case prevents wasted effort.",
    ],
    confusions: [
      "Omitting the constant of integration on a definite integral, where it must be absent because the bounds cancel it.",
      "Forgetting that $\\int x^{-1}\\,dx = \\ln|x|$, which breaks the power rule's pattern.",
      "Sign error when reversing $\\frac{d}{dx}\\cos x=-\\sin x$.",
    ],
    practice: [
      "$\\int x^3\\,dx = \\frac{x^4}{4}+C$, by reversing the power rule.",
      "$\\int\\frac1x\\,dx = \\ln|x|+C$ — the logarithmic case, with the absolute value required.",
      "$\\int(\\sin x + 3x^2)\\,dx = -\\cos x + x^3 + C$.",
    ],
    universalFacts: [
      "Accumulated radiation dose in radiotherapy is a definite integral of a rate, and the same structure gives total charge from current.",
      "The normalisation of the Gaussian error function exists precisely because $\\int e^{-x^2}dx$ has no elementary closed form — the need to evaluate it anyway is what motivated the special function.",
    ],
    formulas: [
      "Power: $\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ for $n\\ne-1$",
      "Logarithmic: $\\int\\frac1x\\,dx=\\ln|x|+C$",
      "Trig: $\\int\\sin x\\,dx=-\\cos x+C$, $\\int\\cos x\\,dx=\\sin x+C$",
      "Exponential: $\\int e^x\\,dx=e^x+C$",
      "Sum rule: $\\int(u\\pm v)\\,dx=\\int u\\,dx\\pm\\int v\\,dx$",
    ],
    keyPoints: [
      "Every antiderivative is $F+C$; the constant of integration is mandatory.",
      "$n=-1$ is the exception to the power rule and gives $\\ln|x|$.",
      "Integration is a signed accumulation, so parts below the axis subtract.",
    ],
    summary:
      "Integration is differentiation run backwards, so the rule table is read in reverse and $\\frac{x^{n+1}}{n+1}$ replaces $nx^{n-1}$. The exponent $n=-1$ is the one exception, giving a logarithm. Constants of integration must be carried on indefinite integrals and cancel from definite ones. Crucially the integral is a SIGNED accumulation over an interval, which is why an odd function integrates to zero over a symmetric interval.",
    importantStatements: [
      "Statement 1: If $F'=f$ then $F$ is an antiderivative of $f$.",
      "Statement 2: Every antiderivative of $f$ is of the form $F+C$.",
      "Statement 3: $\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ for $n\\ne-1$.",
      "Statement 4: $\\int\\frac1x\\,dx=\\ln|x|+C$.",
      "Statement 5: The definite integral is a signed accumulation, so odd functions integrate to zero on symmetric intervals.",
    ],
    examShortTricks: [
      "Differentiate your answer to check it — the fastest possible verification of an indefinite integral.",
      "Memorise $\\int\\frac{dx}{x}=\\ln|x|$ as the exception, so the power rule can be applied without hesitation everywhere else.",
    ],
    examNotes: [
      "Finding indefinite integrals of powers, trig and exponential functions is a guaranteed 3–4 mark question.",
    ],
    mcs: [
      {
        question: "$\\int\\frac{1}{x}\\,dx$ is:",
        options: ["$\\frac{x^2}{2}+C$", "$\\ln|x|+C$", "$\\frac1{x^2}+C$", "$\\ln x^2+C$"],
        answer: "B",
        explanation: "The power rule fails at $n=-1$ and the antiderivative is the natural logarithm of the absolute value.",
      },
      {
        question: "$\\int_{-1}^{1}x\\,dx$ equals:",
        options: ["1", "0", "2", "$\\frac12$"],
        answer: "B",
        explanation: "$x$ is odd and the interval is symmetric, so the signed contributions on the two halves cancel exactly.",
      },
      {
        question: "$\\int\\sin x\\,dx$ is:",
        options: ["$\\cos x+C$", "$-\\cos x+C$", "$\\sin x+C$", "$-\\frac{\\cos x}{x}+C$"],
        answer: "B",
        explanation: "Reversing $\\frac{d}{dx}\\cos x=-\\sin x$ gives $-\\cos x$; the minus sign is the detail most often lost.",
      },
    ],
    visualType: "integration",
  }),
];
