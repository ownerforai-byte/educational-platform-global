import { mk } from "./topic-factory.mjs";

/** Batch 9 — higher order derivatives. */
export const CALC_B9 = [
  mk({
    title: "Higher Order Derivatives",
    topicTitle: "Higher order derivatives",
    topicSlug: "higher-order-derivatives",
    notes: [
      "**Repeated differentiation:** $f''(x)=\\frac{d}{dx}\\left(\\frac{df}{dx}\\right)$ and so on. Each derivative lowers the degree by one, so the $n$-th derivative of a degree-$n$ polynomial is a constant and the $(n+1)$-th is zero — a clean statement that polynomial growth cannot be exceeded by repeated differentiation.",
      "**Second derivative as change of slope:** $f''$ is not a rate in a new direction; it is how fast the FIRST derivative changes. That is what gives concavity its meaning — $f''>0$ means the slope is increasing, so the curve bends upward.",
      "**Newton–Raphson iteration:** $x_{n+1}=x_n-\\frac{f(x_n)}{f'(x_n)}$. This is the tangent-line approximation, so it converges quadratically near a simple root but overshoots or diverges if started badly or if $f'=0$ at the starting point.",
      "**Inflection points:** where $f''$ changes SIGN. The point need not be where the curve crosses an axis, and $f''=0$ alone is not sufficient — $x^4$ has $f''(0)=0$ yet no inflection, because the sign never changes.",
      "**Repeated application raises chain-rule layers:** $\\frac{d^2}{dx^2}(2x+1)^3 = 12(2x+1)$, multiplying the inner derivative each time: $3\\cdot2=6$, then $2\\cdot6=12$.",
      "**Leibniz's rule for products:** $\\frac{d^n}{dx^n}(uv)=\\sum_{k=0}^{n}\\binom{n}{k}u^{(k)}v^{(n-k)}$, generalising the product rule so products can be differentiated repeatedly without expansion.",
    ],
    confusions: [
      "Believing $f''=0$ implies an inflection — $x^4$ at 0 disproves it; a sign CHANGE is required.",
      "Omitting the inner derivative when differentiating a composite twice.",
      "Reading $f''$ as 'the rate of speed' rather than the rate of change of slope.",
    ],
    practice: [
      "$f=x^4-3x$: $f''=12x^2$, so $f''(0)=0$ but concavity does not change — no inflection at 0.",
      "$f=x^3-6x^2+9x$: $f''=6x-12$ vanishes at $x=2$ and changes sign, so $(2,2)$ is an inflection point.",
      "$f=\\sin x$: $f''=-\\sin x$, so every stationary point of $\\sin x$ is also an inflection.",
    ],
    universalFacts: [
      "Newton–Raphson underpins root-finding in spacecraft trajectory correction and in nonlinear circuit and chemical-equilibrium solving.",
      "The second derivative of a position–time graph is jerk, a quantity engineers bound deliberately because passengers feel it when a lift starts and stops.",
    ],
    formulas: [
      "$f^{(n)}=\\frac{d}{dx}f^{(n-1)}$",
      "Newton–Raphson: $x_{n+1}=x_n-\\frac{f(x_n)}{f'(x_n)}$",
      "Inflection: $f''$ changes sign at $x$",
      "Repeated chain: $\\frac{d^2}{dx^2}(ax+b)^n=a^2n(n-1)(ax+b)^{n-2}$",
      "Leibniz: $\\frac{d^n}{dx^n}(uv)=\\sum_{k=0}^{n}\\binom{n}{k}u^{(k)}v^{(n-k)}$",
    ],
    keyPoints: [
      "An inflection needs a sign change in $f''$, not merely $f''=0$.",
      "The n-th derivative of a degree-n polynomial is a nonzero constant.",
      "Newton–Raphson is the tangent method and requires $f'(x_n)\\ne0$.",
    ],
    summary:
      "Higher derivatives are differentiation repeated, and the second derivative has a precise meaning: it measures how quickly the slope changes, which is exactly what concavity records. Because each differentiation lowers a polynomial's degree, an n-th derivative of a degree-n polynomial is constant. Newton's method reuses the first derivative to refine roots, and Leibniz's rule generalises the product rule for repeated differentiation.",
    importantStatements: [
      "Statement 1: The $n$-th derivative of a degree-$n$ polynomial is a nonzero constant.",
      "Statement 2: $f''>0$ means the slope is increasing (concave up).",
      "Statement 3: An inflection point requires $f''$ to change sign, not merely vanish.",
      "Statement 4: Newton's method is $x_{n+1}=x_n-\\frac{f(x_n)}{f'(x_n)}$.",
      "Statement 5: Repeated differentiation of a composite multiplies the inner derivative each time.",
    ],
    examShortTricks: [
      "To test for an inflection, evaluate $f''$ on BOTH sides — the sign change is the whole test.",
      "For $(ax+b)^n$ twice, multiply the inner derivative twice: $a\\cdot2$, then $a\\cdot6$.",
    ],
    examNotes: [
      "Using the second derivative to classify stationary points and locate inflections is a standard 3–4 mark question.",
    ],
    mcs: [
      {
        question: "For $f(x)=x^4$, at $x=0$:",
        options: ["there is an inflection", "there is no inflection", "$f$ is undefined", "there are two inflections"],
        answer: "B",
        explanation: "$f''=12x^2\\ge0$ on both sides, so no sign change and no inflection, even though $f''(0)=0$.",
      },
      {
        question: "The second derivative of a degree-5 polynomial has degree:",
        options: ["5", "3", "2", "0"],
        answer: "B",
        explanation: "Each differentiation lowers the degree by one, so two differentiations leave degree 3.",
      },
      {
        question: "$f''>0$ on an interval means $f$ is:",
        options: ["increasing", "decreasing", "concave up", "linear"],
        answer: "C",
        explanation: "A positive second derivative means the slope is increasing — concavity upwards — and says nothing about whether $f$ itself rises.",
      },
    ],
    visualType: "derivative",
  }),
];
