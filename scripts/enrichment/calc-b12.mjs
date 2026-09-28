import { mk } from "./topic-factory.mjs";
import { CALC_B11 } from "./calc-b11.mjs";

/** Batch 12 — substitution, by parts, definite integrals and areas. */
export const CALC_B12 = [
  mk({
    title: "Integration: Substitution and By Parts",
    topicTitle: "Integration: substitution and by parts",
    topicSlug: "integration-substitution-parts",
    notes: [
      "**Substitution reverses the chain rule.** Look for an inner expression whose derivative appears as a factor: $\\int 2x\\cos(x^2)\\,dx$ with $u=x^2$, $du=2x\\,dx$, gives $\\sin(x^2)+C$. Every inner derivative must be accounted for, or a constant factor is left behind.",
      "**By parts reverses the product rule:** $\\int u\\,dv=uv-\\int v\\,du$. Choose $u$ by LIATE — Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential — so the two remaining integrals get progressively simpler. Choosing $u=x$ and $dv=e^x dx$ in $\\int xe^x dx$ makes things worse rather than better.",
      "**Repeated integration by parts terminates** when a term eventually becomes $0$: for $\\int x^2e^x dx$ the three applications give $e^x(x^2-2x+2)+C$, and the constant of integration is added once at the end.",
      "**Definite integrals after substitution need care.** Either change the LIMITS as well, or keep the original limits and back-substitute. Mixing the two — new limits with an un-substituted integrand — is the commonest error in the topic.",
      "**The definite integral is a number, not a function,** so it has no constant of integration: the two boundary values cancel it. $\\int_1^2 x\\,dx = \\left[\\frac{x^2}{2}\right]_1^2 = 2 - \\frac12 = \\frac32$.",
      "**Both methods fail on the same hard cases.** $\\int e^{-x^2}\\,dx$ and $\\int\\frac{\\sin x}{x}\\,dx$ are integrable numerically but not by elementary substitution or parts; recognising them saves time that would otherwise be lost to a doomed algebraic search.",
    ],
    confusions: [
      "Applying substitution without using the new limits in a definite integral, or changing limits without substituting the integrand.",
      "Choosing $u$ as the exponential or trigonometric factor in by parts, which makes the integral harder rather than easier.",
      "Leaving a $+C$ on a definite integral — the bounds absorb it.",
    ],
    practice: [
      "$\\int 2x(x^2+1)^3dx$: $u=x^2+1$, $du=2x\\,dx$, giving $\\frac{(x^2+1)^4}{8}+C$.",
      "$\\int xe^x dx$: by parts with $u=x$, $dv=e^xdx$ gives $xe^x-e^x+C=e^x(x-1)+C$.",
      "$\\int_0^1 2x e^{x^2}dx$: $u=x^2$, limits $0\\to1$, so the integral is $\\int_0^1 e^u du=e-1$.",
    ],
    universalFacts: [
      "The error-function identity $\\int_0^\\infty e^{-x^2}dx=\\frac{\\sqrt\\pi}{2}$ is the standard link between the Gaussian curve and statistics, and it has no elementary antiderivative to fall back on.",
      "The probability of a continuous random variable is an area under its density curve, so the entire cumulative distribution concept rests on definite integration of a positive function.",
    ],
    formulas: [
      "Substitution: $\\int f'(g(x))g'(x)dx=f(g(x))+C$",
      "By parts: $\\int u\\,dv=uv-\\int v\\,du$",
      "LIATE order for choosing $u$",
      "Definite: $\\int_a^b f(x)dx=F(b)-F(a)$ (no $+C$)",
      "Back-substitution for bounds: $\\int_a^b f(g(x))g'(x)dx=\\int_{g(a)}^{g(b)} f(u)du$",
    ],
    keyPoints: [
      "Substitution must account for the inner derivative or leave a constant factor.",
      "Choose $u$ by LIATE so by-parts integrals get simpler, and stop before reaching 0.",
      "In a definite integral, change the limits or back-substitute — never mix the two.",
    ],
    summary:
      "Substitution reverses the chain rule and by parts reverses the product rule, so together they handle everything an elementary course expects. The choice of $u$ by LIATE is what makes by parts terminate, and the boundary-value treatment differs crucially between indefinite and definite integrals. A handful of functions, notably the Gaussian, resist both methods and are integrable only numerically.",
    importantStatements: [
      "Statement 1: Substitution sets $u=g(x)$ and replaces $g'(x)dx$ by $du$.",
      "Statement 2: By parts gives $\\int u\\,dv=uv-\\int v\\,du$.",
      "Statement 3: In a definite integral the constant of integration cancels and is omitted.",
      "Statement 4: With changed limits, $\\int_a^b f(g(x))g'(x)dx=\\int_{g(a)}^{g(b)}f(u)du$.",
      "Statement 5: $e^{-x^2}$ and $\\frac{\\sin x}{x}$ have no elementary antiderivative.",
    ],
    examShortTricks: [
      "Write $du$ under the integral, then check the whole integrand has been consumed before integrating.",
      "For by-parts, apply LIATE to pick $u$ and stop the moment a term reaches 0.",
    ],
    examNotes: [
      "A substitution followed by a definite integral is a standard 4-mark question; the limits handling is where marks are lost.",
    ],
    mcs: [
      {
        question: "$\\int_0^1 2x e^{x^2}dx$ equals:",
        options: ["$\\frac12(e-1)$", "$e-1$", "$\\frac{e-1}{2}$", "$e$"],
        answer: "B",
        explanation: "Substituting $u=x^2$ sends the limits to $0$ and $1$, giving $\\int_0^1 e^u du=e-1$.",
      },
      {
        question: "$\\int xe^x dx$ simplifies to:",
        options: ["$\\frac{x^2}{2}e^x$", "$e^x(x-1)$", "$xe^x$", "$\\frac{e^x}{x}$"],
        answer: "B",
        explanation: "By parts with $u=x$, $dv=e^xdx$ gives $xe^x-\\int e^x dx=xe^x-e^x=e^x(x-1)$, to which $+C$ is then added.",
      },
      {
        question: "A definite integral $:",
        options: ["has an arbitrary constant", "is a number", "must be positive", "requires substitution"],
        answer: "B",
        explanation: "The constant of integration cancels between the two boundary values, so the result is a definite number.",
      },
    ],
    visualType: "integration",
  }),
];
export { CALC_B11 };
