import { mk } from "./topic-factory.mjs";
import { CALC_B12 } from "./calc-b12.mjs";

/** Batch 13 — definite integral, area under a curve, area between curves. */
export const CALC_B13 = [
  mk({
    title: "Definite Integral",
    topicTitle: "Definite integral",
    topicSlug: "definite-integral",
    notes: [
      "**Definition as a limit of sums:** $\\int_a^b f = \\lim_{n\\to\\infty}\\sum_{i=1}^n f(x_i^*)\\Delta x$. The value depends only on the function and the interval, not on where the sample points are taken — this insensitivity is what makes the integral well defined.",
      "**The Fundamental Theorem connects the two halves:** if $F'=f$ then $\\int_a^b f(x)dx = F(b)-F(a)$. It converts an apparently infinite limiting process into a pair of function evaluations, which is the single most powerful idea in the topic.",
      "**Signed, not absolute:** the value is an algebraic accumulation, so negative regions subtract. $\\int_{-1}^1 x^2 dx = \\frac23$, while $\\int_{-1}^1 x\\,dx = 0$ because the odd part cancels.",
      "**Reversing the limits negates the result:** $\\int_b^a f = -\\int_a^b f$, a direct consequence of how the limit of sums is oriented. Adding an integral over $[a,b]$ and $[b,a]$ therefore gives exactly zero, a useful consistency check.",
      "**Splitting at a point of discontinuity is still valid:** $\\int_a^b f = \\int_a^c f + \\int_c^b f$ even when $f$ is unbounded or undefined at $c$, provided the improper integrals converge. The graph of $\\frac1{\\sqrt{x}}$ from 0 to 1 has infinite height at 0 yet a finite area.",
      "**Positivity and comparison follow from the definition:** if $f\\le g$ on $[a,b]$ then $\\int_a^b f \\le \\int_a^b g$, which is what makes integral comparison tests possible.",
    ],
    confusions: [
      "Adding a constant of integration to a definite integral — it cancels.",
      "Treating the value as a positive area when part of the region lies below the axis.",
      "Forgetting to flip the sign when the limits are given in the order $b$ to $a$.",
    ],
    practice: [
      "$\\int_1^3 x\\,dx = [\\frac{x^2}{2}]_1^3 = \\frac92 - \\frac12 = 4$.",
      "$\\int_{-2}^{2}(x^2+1)dx = [\\frac{x^3}{3}+x]_{-2}^{2} = \\frac{16}{3}$, since the odd term cancels.",
      "$\\int_0^1 \\frac{1}{\\sqrt{x}}dx = [2\\sqrt{x}]_0^1 = 2$: an improper integral with a divergent integrand at the endpoint but a finite value.",
    ],
    universalFacts: [
      "A lightning bolt's total charge is an integral of current over time, and a pacemaker's delivered energy is an integral of power — both are signed accumulations over a measured interval.",
      "The Gaussian area $\\int_{-\\infty}^{\\infty} e^{-x^2}dx=\\sqrt\\pi$ is the normalisation that makes the normal distribution a probability density, and it is why the most common distribution in nature has that constant.",
    ],
    formulas: [
      "Riemann sum: $\\int_a^b f=\\lim_{n\\to\\infty}\\sum f(x_i^*)\\Delta x$",
      "FTC: $\\int_a^b f(x)dx=F(b)-F(a)$ when $F'=f$",
      "Reversal: $\\int_b^a f=-\\int_a^b f$",
      "Additivity: $\\int_a^b f=\\int_a^c f+\\int_c^b f$",
      "Comparison: $f\\le g$ on $[a,b]\\Rightarrow\\int_a^b f\\le\\int_a^b g$",
    ],
    keyPoints: [
      "The value is a signed accumulation, not a positive area.",
      "Reversing the limits negates the result.",
      "The Fundamental Theorem turns an infinite limit into two evaluations.",
    ],
    summary:
      "The definite integral is a limit of sums and is independent of how the interval is sampled, which is what makes it well defined. The Fundamental Theorem is its decisive property: if $F'=f$ then the integral is simply $F(b)-F(a)$. Values are signed, reversing the limits negates the result, and additivity holds even across a point of discontinuity, which is how divergent-looking integrands can still have finite integrals.",
    importantStatements: [
      "Statement 1: $\\int_a^b f=F(b)-F(a)$ when $F'=f$.",
      "Statement 2: A definite integral carries no constant of integration.",
      "Statement 3: $\\int_b^a f=-\\int_a^b f$.",
      "Statement 4: A definite integral is a signed accumulation.",
      "Statement 5: If $f\\le g$ on $[a,b]$ then $\\int_a^b f\\le\\int_a^b g$.",
    ],
    examShortTricks: [
      "Always evaluate $F$ at the upper limit first, then subtract the lower — reversing the order is the easy slip.",
      "For odd integrands on symmetric intervals, write 0 before attempting any calculation.",
    ],
    examNotes: [
      "Evaluating definite integrals by the Fundamental Theorem, with attention to sign, is a guaranteed 3-mark question.",
    ],
    mcs: [
      {
        question: "$\\int_{-1}^{1}x\\,dx$ equals:",
        options: ["$\\frac23$", "$0$", "$2$", "$1$"],
        answer: "B",
        explanation: "The integrand is odd and the interval symmetric, so the signed contributions cancel exactly.",
      },
      {
        question: "$\\int_2^5 f$ compared with $\\int_5^2 f$ is:",
        options: ["equal", "the negative", "twice", "undefined"],
        answer: "B",
        explanation: "Reversing the limits negates the value, a direct consequence of the orientation of the limit of sums.",
      },
      {
        question: "A definite integral always has:",
        options: ["a constant of integration", "a positive value", "a fixed value once limits are given", "an elementary antiderivative"],
        answer: "C",
        explanation: "Once the function and both limits are fixed the value is a specific number, and the constant of integration has cancelled.",
      },
    ],
    visualType: "integral",
  }),
];
export { CALC_B12 };
