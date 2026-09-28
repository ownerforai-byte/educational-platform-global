import { mk } from "./topic-factory.mjs";

/** Batch 5 — derivative definition and algebraic/trig differentiation. */
export const CALC_B5 = [
  mk({
    title: "Derivatives: Definition",
    topicTitle: "Derivatives: definition",
    topicSlug: "derivatives-definition",
    notes: [
      "**The definition is a limit of secants:** $f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}=\\lim_{t\\to x}\\frac{f(t)-f(x)}{t-x}$. Geometrically this is the limit of slopes of chords of the graph, hence the slope of the tangent at $x$.",
      "**Domain matters:** $f'(x)$ can exist even where $f(x)$ does not, and the reverse is false — a discontinuity anywhere in $[x,x+h]$ blocks the limit. Since the quotient needs both values, a removable hole in $f$ removes the derivative there too.",
      "**Left and right derivatives:** $f'(x^-)$ and $f'(x^+)$ must BOTH exist and be equal. $|x|$ at 0 has left derivative $-1$ and right derivative $+1$, so no derivative exists, even though the function is continuous there.",
      "**A derivative need not be continuous:** $f(x)=x^2\\sin\\frac1x$ (with $f(0)=0$) is differentiable everywhere including 0, yet $f'$ is discontinuous at 0. Differentiability implies continuity of $f$, never of $f'$.",
      "**Infinite derivative — vertical tangent:** for $f(x)=x^{1/3}$ at 0 the quotient diverges while both one-sided limits have the same sign, giving a vertical tangent and a derivative that does not exist as a finite number.",
      "**Two practical routes:** for a familiar function use the rule table, but for an unfamiliar one use first principles. Computing $\\frac{d}{dx}(x^2)$ from first principles gives $2x$, which is what the power rule asserts — deriving it once removes the need to repeat it.",
    ],
    confusions: [
      "Treating $\\frac{dy}{dx}$ as an ordinary fraction and cancelling terms across the derivative.",
      "Concluding a derivative exists because $f$ is continuous — continuity is necessary, not sufficient.",
      "Assuming $f'$ must be continuous wherever $f'$ exists.",
    ],
    practice: [
      "$f(x)=x^2$ at $x=3$ from first principles: $\\lim_{h\\to0}\\frac{(3+h)^2-9}{h}=\\lim\\frac{6h+h^2}{h}=6$.",
      "$f(x)=x^{1/3}$ at 0: $\\lim_{h\\to0}\\frac{h^{1/3}}{h}=h^{-2/3}\\to\\infty$, a vertical tangent with no finite derivative.",
      "$f(x)=|x|$ at 0: left quotient is $-1$, right is $+1$, so $f'(0)$ does not exist.",
    ],
    universalFacts: [
      "The derivative is defined by a limit, which is why numerical differentiation suffers catastrophic cancellation: for tiny $h$ the numerator is the difference of two nearly equal quantities.",
      "A vertical tangent is exactly where a curve's rate of change is momentarily infinite — the cusp of a gear tooth and the tip of a raindrop both have one.",
    ],
    formulas: [
      "First principles: $f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$",
      "Alternative form: $f'(x)=\\lim_{t\\to x}\\frac{f(t)-f(x)}{t-x}$",
      "Exists only if $f'(x^-)=f'(x^+)$",
      "Power rule (from first principles): $f'(x)=nx^{n-1}$",
    ],
    keyPoints: [
      "The derivative is a limit of secant slopes, giving the tangent slope.",
      "Differentiability implies continuity of $f$, but not of $f'$.",
      "Both one-sided derivatives must exist and agree.",
    ],
    summary:
      "The derivative is defined as the limit of difference quotients, which is the limit of chord slopes and hence the tangent slope. It exists only when the left and right derivatives both exist and agree, and differentiability presupposes continuity of the function itself — though the derivative itself need not be continuous. First principles handles any function, and applying it to $x^2$ is what produces the power rule.",
    importantStatements: [
      "Statement 1: $f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$.",
      "Statement 2: Differentiability at a point implies continuity at that point.",
      "Statement 3: A differentiable function need not have a continuous derivative.",
      "Statement 4: $f'(x)$ exists only if $f'(x^-)=f'(x^+)$.",
      "Statement 5: A vertical tangent corresponds to an infinite derivative, not to a finite one.",
    ],
    examShortTricks: [
      "When in doubt, compute from first principles — it is always valid and earns full marks.",
      "Check both one-sided derivatives before declaring a derivative exists.",
    ],
    examNotes: [
      "Deriving $f'(x)$ from first principles for a simple polynomial is a guaranteed 3–4 mark question.",
    ],
    mcs: [
      {
        question: "At $x=0$, $f(x)=|x|$:",
        options: ["$f'(0)=0$", "$f'(0)=1$", "$f'(0)$ does not exist", "$f'(0)=-1$"],
        answer: "C",
        explanation: "The left derivative is $-1$ and the right is $+1$; because they disagree, the derivative does not exist.",
      },
      {
        question: "Differentiability implies:",
        options: ["continuity", "a continuous derivative", "linearity", "a bounded derivative"],
        answer: "A",
        explanation: "A discontinuity blocks the limit, so differentiability forces continuity of the function — but says nothing about continuity of the derivative.",
      },
      {
        question: "For $f(x)=x^2$, first principles at $x=2$ gives:",
        options: ["2", "4", "8", "0"],
        answer: "B",
        explanation: "$\\lim_{h\\to0}\\frac{(2+h)^2-4}{h}=\\lim(4+h)=4$.",
      },
    ],
    visualType: "derivative",
  }),
];
