import { mk } from "./topic-factory.mjs";
import { CALC_B5 } from "./calc-b5.mjs";

/** Batch 6 — algebraic & trigonometric rules. */
export const CALC_B6 = [
  mk({
    title: "Derivatives: Algebraic and Trigonometric Functions",
    topicTitle: "Derivatives: algebraic and trigonometric functions",
    topicSlug: "derivatives-algebraic-trig",
    notes: [
      "**The algebraic core:** constant ($\\frac{d}{dx}c=0$), sum/difference, product $\\frac{d}{dx}uv = u'v+uv'$, quotient $\\frac{d}{dx}\\frac{u}{v}=\\frac{u'v-uv'}{v^2}$, and power $\\frac{d}{dx}x^n = nx^{n-1}$.",
      "**The power rule generalises to any real exponent** for $x>0$: $\\frac{d}{dx}x^a = ax^{a-1}$, so $x^{-1/2}$ gives $-\\frac12x^{-3/2}$ and $x^{1/3}$ gives $\\frac13x^{-2/3}$. The domain restriction $x>0$ is what makes negative bases illegal in general.",
      "**The quotient rule's order is the whole difficulty:** the denominator's own derivative multiplies the second term with a MINUS sign, $\\frac{u'v - uv'}{v^2}$. A mnemonic that works is 'low d-high minus high d-low, over low squared'.",
      "**Trigonometric derivatives are ratios of the next function:** $\\frac{d}{dx}\\sin x = \\cos x$, $\\frac{d}{dx}\\cos x = -\\sin x$, $\\frac{d}{dx}\\tan x = \\sec^2x$, and the cotangent and secant forms follow the same 'derivative over itself squared' pattern. All assume $x$ in RADIANS.",
      "**The sine and cosine derivatives swap and change sign,** and every other trigonometric derivative is built from them: $\\frac{d}{dx}\\sec x = \\sec x\\tan x$ and $\\frac{d}{dx}\\csc x = -\\csc x\\cot x$. Forgetting the minus on cosine is the single most common slip in this table.",
      "**Derivatives of nested forms need the chain rule:** $\\frac{d}{dx}\\sin^2x = 2\\sin x\\cos x = \\sin 2x$ and $\\frac{d}{dx}(3x+1)^5 = 15(3x+1)^4$. Treating $\\sin^2x$ as $\\sin(x^2)$ is a misreading, since the exponent applies to the VALUE.",
    ],
    confusions: [
      "Forgetting the negative sign on $\\frac{d}{dx}\\cos x$ and on $\\frac{d}{dx}\\csc x$.",
      "Reversing the quotient rule to $\\frac{uv'-u'v}{v^2}$.",
      "Writing $\\sin^2x$ as $\\sin(x^2)$ — the exponent squares the value, not the argument.",
      "Applying these rules in degrees; the standard derivatives assume radians.",
    ],
    practice: [
      "$y=x^2(3x+1)$: $y' = 2x(3x+1) + x^2(3) = 9x^2+2x$.",
      "$y=\\frac{2x+1}{x-3}$: $y' = \\frac{2(x-3)-(2x+1)(1)}{(x-3)^2} = \\frac{-7}{(x-3)^2}$.",
      "$y=\\sin^2x$: write as $(\\sin x)^2$, so $y' = 2\\sin x\\cos x = \\sin 2x$.",
    ],
    universalFacts: [
      "The derivatives of sine and cosine are only these simple values in radians; in degrees a factor of $\\frac{\\pi}{180}$ is required, which is why physics and calculus always work in radians.",
      "The quotient rule is genuinely the derivative of a reciprocal: $\\frac{d}{dx}\\frac1{u}=-\\frac{u'}{u^2}$ follows by setting $v=1$, a check worth using to verify signs.",
    ],
    formulas: [
      "Power: $\\frac{d}{dx}x^n = nx^{n-1}$",
      "Product: $\\frac{d}{dx}uv = u'v + uv'$",
      "Quotient: $\\frac{d}{dx}\\frac{u}{v} = \\frac{u'v - uv'}{v^2}$",
      "Reciprocal check: $\\frac{d}{dx}\\frac1u = -\\frac{u'}{u^2}$",
      "Trig: $(\\sin x)'=\\cos x$, $(\\cos x)'=-\\sin x$, $(\\tan x)'=\\sec^2x$, $(\\cot x)'=-\\csc^2x$",
      "Chain cases: $(\\sin^2x)'=2\\sin x\\cos x$, $((3x+1)^5)'=15(3x+1)^4$",
    ],
    keyPoints: [
      "Product rule ADDS; quotient rule subtracts with the order $u'v - uv'$.",
      "The cosine derivative carries a minus sign, and so does csc.",
      "All standard derivatives assume x in radians.",
    ],
    summary:
      "The rule table is built from the power, product and quotient rules, with trigonometric derivatives following the 'derivative over itself squared' pattern. The order of the two terms in the quotient rule, and the minus sign on the cosine derivative, are the two details that most often cost marks. Nested expressions such as $\\sin^2x$ require the chain rule, and the exponent applies to the value rather than the argument.",
    importantStatements: [
      "Statement 1: $\\frac{d}{dx}x^n = nx^{n-1}$ for $x>0$.",
      "Statement 2: The quotient rule gives $\\frac{u'v - uv'}{v^2}$.",
      "Statement 3: $\\frac{d}{dx}\\cos x = -\\sin x$.",
      "Statement 4: $\\frac{d}{dx}\\tan x = \\sec^2x$.",
      "Statement 5: These derivatives are valid for arguments measured in radians.",
    ],
    examShortTricks: [
      "Check the quotient rule with the reciprocal case: differentiate $1/u$ and it should give $-u'/u^2$.",
      "Write $\\sin^2x$ as $(\\sin x)^2$ on paper — it removes the argument/value confusion instantly.",
    ],
    examNotes: [
      "Differentiating a product, quotient or nested trigonometric form is the most common 3-mark derivative question.",
    ],
    mcs: [
      {
        question: "$\\frac{d}{dx}\\cos x$ is:",
        options: ["$\\sin x$", "$-\\sin x$", "$\\sec x\\tan x$", "$-\\cos x$"],
        answer: "B",
        explanation: "The sine and cosine derivatives swap and the cosine derivative takes a negative sign.",
      },
      {
        question: "If $y=\\frac{u}{v}$, then $y'$ is:",
        options: ["$\\frac{u'v'}{v^2}$", "$\\frac{u'v+uv'}{v^2}$", "$\\frac{u'v-uv'}{v^2}$", "$\\frac{v'}{u'v}$"],
        answer: "C",
        explanation: "The quotient rule gives low-d-high minus high-d-low, all over low squared.",
      },
      {
        question: "$\\frac{d}{dx}(\\sin x)^2$ is:",
        options: ["$2\\cos x$", "$2\\sin x\\cos x$", "$\\cos^2x$", "$2x\\cos x$"],
        answer: "B",
        explanation: "Chain rule with outer $u^2$ gives $2\\sin x\\cdot\\cos x$, which equals $\\sin 2x$.",
      },
    ],
    visualType: "derivative",
  }),
];
export { CALC_B5 };
