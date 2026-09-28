import { mk } from "./topic-factory.mjs";

/** Batch 7 — inverse trig, exponential and logarithmic derivatives. */
export const CALC_B7 = [
  mk({
    title: "Derivatives: Inverse Trigonometric, Exponential and Logarithmic",
    topicTitle: "Derivatives: inverse trig, exponential and logarithmic",
    topicSlug: "derivatives-inverse-trig-exp-log",
    notes: [
      "**Inverse trigonometric derivatives all carry a denominator:** $\\frac{d}{dx}\\arcsin x = \\frac1{\\sqrt{1-x^2}}$, $\\frac{d}{dx}\\arccos x = -\\frac1{\\sqrt{1-x^2}}$, $\\frac{d}{dx}\\arctan x = \\frac1{1+x^2}$. Arccos carries a minus sign, which is the detail most often lost.",
      "**The remaining three follow the same shape:** $\\frac{d}{dx}\\operatorname{arccot}x = -\\frac1{1+x^2}$, $\\frac{d}{dx}\\operatorname{arcsec}x = \\frac1{|x|\\sqrt{x^2-1}}$, $\\frac{d}{dx}\\operatorname{arccsc}x = -\\frac1{|x|\\sqrt{x^2-1}}$. The absolute value on $x$ is required, not optional.",
      "**Exponential:** $\\frac{d}{dx}e^x = e^x$ is unique in being its own derivative. For $a^x$ use $\\frac{d}{dx}a^x = a^x\\ln a$, so $a^x$ is its own derivative only when $a=e$.",
      "**Logarithms:** $\\frac{d}{dx}\\ln x = \\frac1x$ and $\\frac{d}{dx}\\log_a x = \\frac1{x\\ln a}$. The identity $\\frac{d}{dx}\\log_a u = \\frac{u'}{u\\ln a}$ is what makes $\\log$ a natural tool for exponential-growth problems, since $\\frac{d}{dx}a^x$ contains exactly the factor $\\ln a$ that $\\log$ removes.",
      "**Log of a product splits into a sum:** $\\ln(xy)=\\ln x+\\ln y$, so $\\frac{d}{dx}\\ln(xy)=\\frac1y+\\frac1x$ — the chain rule applied to a product, which is a classic exam step.",
      "**The derivative of $\\ln$ inverts the exponent:** since $e^x$ is its own derivative, $\\frac{d}{dx}\\ln x = \\frac1x$ follows by inverse-function differentiation. The same logic gives $\\frac{d}{dx}\\arctan x$ once $\\frac{d}{dx}\\tan x=\\sec^2x$ is known.",
    ],
    confusions: [
      "Omitting the minus sign on the arccos derivative — it is the one inverse trig derivative that is negative among the three principal ones.",
      "Writing $\\frac{d}{dx}a^x = a^x$ instead of $a^x\\ln a$; only the natural exponential is self-derivative.",
      "Dropping the absolute value in the arcsec and arccsc derivatives.",
    ],
    practice: [
      "$y=\\ln(x^2+1)$: $y' = \\frac{2x}{x^2+1}$ by the chain rule.",
      "$y=e^{3x}$: $y' = 3e^{3x}$ — the coefficient from the inner derivative must be carried.",
      "$y=\\arccos(2x)$: $y' = -\\frac{2}{\\sqrt{1-4x^2}}$, valid only for $|x|<\\frac12$.",
    ],
    universalFacts: [
      "Compound interest is the reason $e$ matters: continuous growth is $e^{rt}$, and the derivative of the exponential is what makes that growth self-similar in time.",
      "The curve $y=\\ln x$ is the inverse of $y=e^x$ and shares its steepness there, because a function and its inverse are reflections in $y=x$ and have reciprocal slopes.",
    ],
    formulas: [
      "$(\\arcsin x)' = \\frac1{\\sqrt{1-x^2}}$, $(\\arccos x)' = -\\frac1{\\sqrt{1-x^2}}$",
      "$(\\arctan x)' = \\frac1{1+x^2}$, $(\\operatorname{arccot}x)' = -\\frac1{1+x^2}$",
      "$(\\operatorname{arcsec}x)' = \\frac1{|x|\\sqrt{x^2-1}}$, $(\\operatorname{arccsc}x)' = -\\frac1{|x|\\sqrt{x^2-1}}$",
      "$(e^x)' = e^x$, $(a^x)' = a^x\\ln a$",
      "$(\\ln x)' = \\frac1x$, $(\\log_a x)' = \\frac1{x\\ln a}$",
    ],
    keyPoints: [
      "Arccos and arccot derivatives are negative; the others are positive.",
      "Only $e^x$ is its own derivative — $a^x$ needs the $\\ln a$ factor.",
      "The arcsec and arccsc derivatives require an absolute value on $x$.",
    ],
    summary:
      "Every inverse trigonometric derivative takes the form 'one over the derivative of its partner', with a sign that is negative for arccos and arccot. The exponential $e^x$ is uniquely self-derivative, while $a^x$ carries an extra $\\ln a$ factor — the same factor that differentiating a logarithm removes, which is why logs and exponentials are paired. Domains and absolute values are part of these formulas, not decorations.",
    importantStatements: [
      "Statement 1: $\\frac{d}{dx}\\arccos x = -\\frac1{\\sqrt{1-x^2}}$.",
      "Statement 2: $\\frac{d}{dx}\\arctan x = \\frac1{1+x^2}$.",
      "Statement 3: $\\frac{d}{dx}e^x = e^x$ but $\\frac{d}{dx}a^x = a^x\\ln a$.",
      "Statement 4: $\\frac{d}{dx}\\ln x = \\frac1x$.",
      "Statement 5: The arcsec and arccsc derivatives involve $|x|$ in the denominator.",
    ],
    examShortTricks: [
      "Inverse trig derivative = 1 over the partner's derivative, then adjust the sign for the 'co' functions (cos, cot, csc, sec).",
      "For $a^x$, always write $a^x\\ln a$ — omitting $\\ln a$ is the common slip.",
    ],
    examNotes: [
      "Differentiating inverse trig and logarithmic expressions with the chain rule is a reliable 3-mark question.",
    ],
    mcs: [
      {
        question: "$\\frac{d}{dx}\\arccos x$ is:",
        options: ["$\\frac1{\\sqrt{1-x^2}}$", "$-\\frac1{\\sqrt{1-x^2}}$", "$\\frac1{1+x^2}$", "$-\\frac1{1+x^2}$"],
        answer: "B",
        explanation: "Arccos is the one principal inverse trig function with a negative derivative.",
      },
      {
        question: "$\\frac{d}{dx}2^x$ is:",
        options: ["$2^x$", "$2^x\\ln2$", "$\\frac{2^x}{\\ln2}$", "$x2^{x-1}$"],
        answer: "B",
        explanation: "Only the natural exponential is self-derivative; $a^x$ needs the $\\ln a$ factor.",
      },
      {
        question: "If $y=\\ln(3x)$, then $y'$ simplifies to:",
        options: ["$\\frac{1}{3x}$", "$\\frac{3}{x}$", "$\\frac{1}{x}$", "$\\frac{x}{3}$"],
        answer: "C",
        explanation: "By the chain rule, $y'=\\frac{1}{3x}\\times 3 = \\frac{3}{3x} = \\frac{1}{x}$. The inner derivative 3 must be multiplied in, then cancelled against the 3 in the denominator.",
      },
    ],
    visualType: "derivative",
  }),
];
