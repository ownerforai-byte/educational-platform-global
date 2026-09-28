import { mk } from "./topic-factory.mjs";
import { CALC_B13 } from "./calc-b13.mjs";

/** Batch 14 — area under a curve, area between two curves. */
export const CALC_B14 = [
  mk({
    title: "Area Under a Curve",
    topicTitle: "Area under a curve",
    topicSlug: "area-under-curve",
    notes: [
      "**Geometric area is an ABSOLUTE accumulation,** so it is $\\int_a^b |f(x)|dx$, not $\\int_a^b f(x)dx$. Whenever the curve crosses the axis inside the interval the signed integral cancels and understates the area — the most important distinction in the topic.",
      "**Split at the roots.** Find where $f(x)=0$, split the interval at those points, and negate the negative pieces. For $f=x^2-4$ on $[-3,3]$ the roots are $\\pm2$, and the area is $\\int_{-3}^{-2}-f + \\int_{-2}^{2}f + \\int_{2}^{3}-f = \\frac{32}{3}$.",
      "**Split also at any change in which curve is on top** when the region is bounded by more than one function, since otherwise the integrand switches sign mid-interval.",
      "**The area is a definite integral, so no constant of integration appears** and the answer is a pure number with units of (function units) × (x-units).",
      "**An infinite interval needs an improper limit:** $\\int_0^\\infty e^{-x}dx = \\lim_{b\\to\\infty}[-e^{-x}]_0^b = 1$. The limit must actually exist; the graph may rise to infinity while the area stays finite.",
      "**Worked example, $y=x^2$ on $[0,3]$:** since $x^2\\ge0$ there is no split, and the area is $\\left[\\frac{x^3}{3}\\right]_0^3 = 9$ square units.",
    ],
    confusions: [
      "Reporting the signed integral as the area when the curve dips below the axis.",
      "Forgetting to split at the roots before integrating.",
      "Writing $+C$ on an area calculation.",
    ],
    practice: [
      "Area under $y=x^2$ on $[-2,2]$: the curve is non-negative, so $\\left[\\frac{x^3}{3}\\right]_{-2}^{2}=\\frac{16}{3}$.",
      "Area between $y=x^2$ and the axis on $[-2,2]$ needs no split because $x^2\\ge0$ throughout.",
      "Area of $y=x-2$ below the axis on $[0,4]$: the curve is negative on $[0,2]$, so the area is $-\\int_0^2(x-2)dx = 2$ square units.",
    ],
    universalFacts: [
      "The area under a velocity–time graph equals the distance travelled, and the area under an acceleration–time graph equals the change in velocity — the same integral doing physical work in two different units.",
      "The finite area under $e^{-x}$ despite infinite height is the reason probability densities can be normalised: a curve may grow unbounded while the probability it represents stays at 1.",
    ],
    formulas: [
      "Area: $A=\\int_a^b |f(x)|dx$",
      "Signed: $\\int_a^b f(x)dx = F(b)-F(a)$",
      "Split at roots: $A=\\int_a^{r_1}|f|+\\int_{r_1}^{r_2}|f|+\\dots$",
      "Improper: $A=\\lim_{b\\to\\infty}\\int_a^b f(x)dx$",
    ],
    keyPoints: [
      "Area uses the ABSOLUTE value of the function; the signed integral can be smaller or zero.",
      "Split the interval at every root of the integrand.",
      "An infinite interval needs an improper limit, which may converge.",
    ],
    summary:
      "Geometric area is an absolute accumulation, so it is written with $|f|$ rather than $f$. Whenever the curve crosses the axis the signed integral partially cancels and understates the true area, which is why the interval must be split at the roots and the negative pieces negated. Infinite intervals are handled with an improper limit, and convergence is not guaranteed by the height of the graph.",
    importantStatements: [
      "Statement 1: Area $A=\\int_a^b|f(x)|dx$ is an absolute accumulation.",
      "Statement 2: The integral must be split at the zeros of the integrand.",
      "Statement 3: No constant of integration appears in an area calculation.",
      "Statement 4: On an infinite interval the integral is defined by an improper limit.",
      "Statement 5: An unbounded integrand may still have a finite integral.",
    ],
    examShortTricks: [
      "Sketch or sign-check first: if $f$ changes sign inside the interval, split before integrating.",
      "For $f$ symmetric about an axis with $f\\ge0$, integrate from 0 and double.",
    ],
    examNotes: [
      "Area under a curve that crosses the axis is a frequent 4-mark question, and the split is where the marks are.",
    ],
    mcs: [
      {
        question: "The area between $y=x-2$ and the axis on $[0,4]$ is:",
        options: ["0", "2", "4", "-2"],
        answer: "B",
        explanation: "The curve is below the axis on $[0,2]$, so the area is $-\\int_0^2(x-2)dx=2$ square units; the signed integral alone would be $-2$.",
      },
      {
        question: "An area calculation includes $+C$:",
        options: ["always", "never", "only for improper integrals", "only above the axis"],
        answer: "B",
        explanation: "Area is a definite integral, so the constant of integration cancels and must not appear.",
      },
      {
        question: "$\\int_0^\\infty e^{-x}dx$ is:",
        options: ["infinite", "1", "0", "undefined"],
        answer: "B",
        explanation: "$\\lim_{b\\to\\infty}[-e^{-x}]_0^b=0-(-1)=1$: the function is unbounded but the area converges.",
      },
    ],
    visualType: "integral",
  }),
];
export { CALC_B13 };
