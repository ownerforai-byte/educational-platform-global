import { mk } from "./topic-factory.mjs";
import { CALC_B1 } from "./calc-b1.mjs";

/** Batch 2 — algebraic limit properties. */
export const CALC_B2 = [
  mk({
    title: "Algebraic Properties of Limits",
    topicTitle: "Algebraic properties of limits",
    topicSlug: "algebraic-properties-of-limits",
    notes: [
      "**Sum and difference:** if $\\lim f = L$ and $\\lim g = M$ then $\\lim(f\\pm g)=L\\pm M$. Limits commute with addition because they preserve the arithmetic structure of the reals.",
      "**Product and quotient:** $\\lim(fg)=LM$ and, provided $M\\ne0$, $\\lim\\frac{f}{g}=\\frac{L}{M}$. The condition $M\\ne0$ is the whole reason $0/0$ is indeterminate — the product law guarantees $0$ while the quotient law is unavailable.",
      "**Constant multiple and power:** $\\lim(cf)=cL$ and $\\lim f^n=L^n$. An even root additionally needs a non-negative limit, while an odd root does not, so sign information about $L$ decides whether $\\lim\\sqrt[n]{f}$ exists.",
      "**Composition:** if $\\lim f=L$ and $g$ is continuous at $L$ then $\\lim g(f(x))=g(L)$. This licenses substituting into a continuous outer function, and it is why a discontinuous $g$ such as $\\tan$ at $\\pi/2$ breaks the rule.",
      "**Squeeze (sandwich) theorem:** if $g(x)\\le f(x)\\le h(x)$ near $a$ and $\\lim g=\\lim h=L$ then $\\lim f=L$. This is the only reliable tool for a vanishing factor times an oscillating one, and it proves $\\lim_{x\\to0}x\\sin\\frac1x=0$ from $-|x|\\le x\\sin\\frac1x\\le|x|$.",
      "**Why the laws survive discontinuity:** none of these need $f$ defined at $a$, only the limits to exist. That is exactly why a removable discontinuity does not spoil a limit, while a jump does — unequal one-sided limits mean the laws cannot be applied at all.",
    ],
    confusions: [
      "Using the quotient law when the denominator's limit is 0 — the law does not apply and the form is indeterminate.",
      "Taking $\\lim\\sqrt{f(x)}=\\sqrt{\\lim f}$ without checking the sign; an even root needs a non-negative limit.",
      "Applying the composition rule through a discontinuous outer function such as $\\tan$.",
    ],
    practice: [
      "$\\lim_{x\\to1}\\frac{3x^2+2x}{x^2+4}$: the denominator limit is 5, not 0, so the quotient law gives $\\frac{5}{5}=1$ directly.",
      "$\\lim_{x\\to0}x\\sin\\frac1x$: the product is $0\\cdot$undefined, so squeeze with $-|x|\\le x\\sin\\frac1x\\le|x|$ gives $0$.",
      "$\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$: neither law applies since both parts go to 0; the conjugate gives $\\frac12$.",
    ],
    universalFacts: [
      "The squeeze theorem is the bridge used to prove almost every standard limit, including $\\lim_{x\\to0}\\frac{\\sin x}{x}=1$.",
      "Audio codecs rely on a jump discontinuity: the mapping from continuous voltage to a discrete level is a jump, and the discontinuity is audible as a click.",
    ],
    formulas: [
      "Sum/difference: $\\lim(f\\pm g)=L\\pm M$",
      "Product: $\\lim(fg)=LM$",
      "Quotient: $\\lim\\frac{f}{g}=\\frac{L}{M}$ for $M\\ne0$",
      "Power: $\\lim f^n=L^n$",
      "Composition: $\\lim g(f(x))=g(L)$ when $g$ is continuous at $L$",
      "Squeeze: $g\\le f\\le h$ and $\\lim g=\\lim h=L \\Rightarrow \\lim f=L$",
    ],
    keyPoints: [
      "The laws need only the LIMITS to exist, not the function to be defined at the point.",
      "The quotient law is void when the denominator's limit is 0 — the root of $0/0$.",
      "Squeeze is the only general method for a vanishing factor times an oscillating term.",
    ],
    summary:
      "The algebraic limit laws cover sums, products, quotients, powers and composition, and each requires only that the individual limits exist — never that the functions be defined at the point. The quotient law fails precisely when the denominator tends to 0, which is why $0/0$ is indeterminate. When neither substitution nor the laws apply, the squeeze theorem settles a vanishing factor times an oscillating one.",
    importantStatements: [
      "Statement 1: $\\lim(f\\pm g)=L\\pm M$ whenever both limits exist.",
      "Statement 2: $\\lim\\frac{f}{g}=\\frac{L}{M}$ is valid only when $M\\ne0$.",
      "Statement 3: $\\lim f^n=L^n$ holds for positive integers; an even root also needs a non-negative limit.",
      "Statement 4: $\\lim g(f(x))=g(L)$ requires $g$ continuous at $L$.",
      "Statement 5: If $g\\le f\\le h$ near $a$ and $\\lim g=\\lim h=L$ then $\\lim f=L$.",
    ],
    examShortTricks: [
      "Check the denominator's limit FIRST — if it is 0 no law applies and the expression must be rewritten.",
      "Small factor times a trigonometric or oscillating term means squeeze, immediately.",
    ],
    examNotes: [
      "Stating the limit laws with the $M\\ne0$ condition attached is a common 2-mark question.",
    ],
    mcs: [
      {
        question: "The quotient limit law requires:",
        options: ["$L\\ne0$", "$M\\ne0$", "$L=M$", "no condition"],
        answer: "B",
        explanation: "The law needs the DENOMINATOR's limit $M$ to be non-zero; the numerator may tend to 0.",
      },
      {
        question: "$\\lim_{x\\to0}x\\sin\\frac1x$ is best evaluated using:",
        options: ["L'Hôpital", "the squeeze theorem", "the quotient law", "the product law"],
        answer: "B",
        explanation: "$\\sin\\frac1x$ has no limit, so the product law cannot apply. Bounding by $\\pm|x|\\to0$ settles it.",
      },
      {
        question: "$\\lim_{x\\to0}\\cos(\\sin x)$ is found with the:",
        options: ["sum law", "product law", "composition law", "quotient law"],
        answer: "C",
        explanation: "$\\cos$ is continuous at $0$, so the composition law gives $\\cos(\\lim\\sin x)=\\cos0=1$.",
      },
    ],
    visualType: "limit",
  }),
];
export { CALC_B1 };
