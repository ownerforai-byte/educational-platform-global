import { mk } from "./topic-factory.mjs";

/** Batch 1 — indeterminate forms. */
export const CALC_B1 = [
  mk({
    title: "Indeterminate Forms",
    topicTitle: "Indeterminate forms",
    topicSlug: "indeterminate-forms",
    notes: [
      "**What 'indeterminate' means:** a form like $0/0$ describes the SHAPE the expression takes as $x$ approaches the point, never its value. The same form can give $0$, $1$, $7$, $\\infty$, or no limit at all. $\\frac{x^2}{x}\\to0$, $\\frac{x^2}{x^2}\\to1$ and $\\frac{x}{x^2}\\to\\infty$ are all $0/0$.",
      "**The seven forms:** $0/0$, $\\infty/\\infty$, $0\\cdot\\infty$, $\\infty-\\infty$, $\\infty^0$, $0^0$, $1^\\infty$. Everything else is determinate — $\\frac{0}{5}=0$ and $\\frac{5}{0}=\\infty$ need no further work. $0\\cdot\\infty$ is the classic trap because each factor is a LIMIT rather than a value.",
      "**Technique 1 — factorise and cancel:** find the common vanishing factor. $\\lim_{x\\to2}\\frac{x^2-4}{x-2}=\\lim\\frac{(x-2)(x+2)}{x-2}=4$. For powers use $a^n-b^n=(a-b)(a^{n-1}+\\dots+b^{n-1})$.",
      "**Technique 2 — rationalise with the conjugate:** $\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\lim\\frac{1-\\cos^2x}{x^2(1+\\cos x)}=\\lim\\frac{\\sin^2x}{x^2(1+\\cos x)}=\\frac12$. The conjugate is chosen so a difference of squares appears.",
      "**Technique 3 — L'Hôpital:** for $0/0$ or $\\infty/\\infty$, differentiate numerator and denominator SEPARATELY and take the limit of the ratio, provided that limit exists. $\\frac{x^2-4}{x-2}$ becomes $\\frac{2x}{1}\\to4$.",
      "**Technique 4 — logs for $1^\\infty$:** with $y=(1+f)^{g}$ and $f\\to0$, take logs and use $\\lim\\frac{\\ln(1+f)}{f}=1$, giving $\\lim y = e^{\\lim g\\ln(1+f)}$. Hence $\\lim_{n\\to\\infty}(1+\\frac1n)^n=e$.",
    ],
    confusions: [
      "Reading $0/0$ as the answer — it means substitution failed, and the limit may be anything.",
      "Applying L'Hôpital to $0\\cdot\\infty$ or $\\infty-\\infty$ without first rewriting as a quotient.",
      "Differentiating only the numerator and forgetting the denominator.",
    ],
    practice: [
      "$\\lim_{x\\to3}\\frac{x^2-9}{x-3}$: factorise to $(x-3)(x+3)$, cancel, substitute, get $6$.",
      "$\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$: conjugate gives $\\frac{\\sin^2x}{x^2(1+\\cos x)}$, then $\\frac12$.",
      "$\\lim_{n\\to\\infty}(1+\\frac2n)^n = e^2$: logs give $\\lim\\frac{\\ln(1+2/n)}{1/n}=2$ by L'Hôpital.",
    ],
    universalFacts: [
      "Euler's number is defined as a limit, $e=\\lim_{n\\to\\infty}(1+\\frac1n)^n$ — the compound-interest form of the $1^\\infty$ case.",
      "Numerical differentiation avoids $f(x+h)-f(x)$ over $h$ precisely because at tiny $h$ this $0/0$ suffers catastrophic cancellation.",
    ],
    formulas: [
      "Forms: $0/0$, $\\infty/\\infty$, $0\\cdot\\infty$, $\\infty-\\infty$, $1^\\infty$, $0^0$, $\\infty^0$",
      "$a^n-b^n = (a-b)(a^{n-1}+a^{n-2}b+\\dots+b^{n-1})$",
      "Conjugate: $\\frac{1-\\cos x}{1+\\cos x}=\\frac{\\sin^2x}{1+\\cos x}$",
      "L'Hôpital: $\\lim\\frac{f}{g}=\\lim\\frac{f'}{g'}$ for $0/0$ or $\\infty/\\infty$",
      "$\\lim_{n\\to\\infty}(1+\\frac{k}{n})^n = e^k$",
    ],
    keyPoints: [
      "An indeterminate form is a shape, not a value.",
      "Factorise, rationalise, or use L'Hôpital — never substitute and stop.",
      "L'Hôpital applies only to $0/0$ and $\\infty/\\infty$.",
      "For $1^\\infty$, take logarithms to reduce to a $0/0$ quotient.",
    ],
    summary:
      "An indeterminate form describes the shape an expression takes near a point, never its value — the same $0/0$ may resolve to $0$, $1$, or nothing at all. Four techniques cover essentially every case: factorise and cancel, rationalise with a conjugate, apply L'Hôpital to $0/0$ and $\\infty/\\infty$, and take logarithms for $1^\\infty$.",
    specialNotes: [
      "L'Hôpital requires the derivative quotient's limit to EXIST; if it does not, the rule is silent and another technique is needed.",
      "Some $1^\\infty$ forms have no limit, so writing the form down never licenses the exponential answer.",
    ],
    importantStatements: [
      "Statement 1: $0/0$ and $\\infty/\\infty$ are indeterminate, but $5/0$ and $0/5$ are determinate.",
      "Statement 2: L'Hôpital's rule may be applied only to $0/0$ and $\\infty/\\infty$ forms.",
      "Statement 3: Differentiating both parts is only part of L'Hôpital — the resulting limit must exist.",
      "Statement 4: $0\\cdot\\infty$ and $\\infty-\\infty$ must be rewritten as a quotient first.",
      "Statement 5: $\\lim_{n\\to\\infty}(1+\\frac{k}{n})^n = e^k$.",
    ],
    examShortTricks: [
      "Match technique to form: $0/0$ → factorise, rationalise or L'Hôpital; $1^\\infty$ → logs; $0\\cdot\\infty$ and $\\infty-\\infty$ → rewrite as a quotient.",
      "If the expression contains a root, reach for the conjugate first.",
    ],
    examNotes: [
      "Naming the correct technique for a given form is a frequent 2-mark question in the limits block.",
    ],
    mcs: [
      {
        question: "$\\lim_{x\\to0}\\frac{\\sin x}{x^2}$ is $0/0$. After one L'Hôpital step the quotient:",
        options: ["equals 1", "diverges", "equals 0", "stays indeterminate"],
        answer: "B",
        explanation: "Differentiating gives $\\frac{\\cos x}{2x}$, which diverges. L'Hôpital is uninformative and the squeeze theorem gives the true limit $0$.",
      },
      {
        question: "Which of these is NOT an indeterminate form?",
        options: ["$0/0$", "$0\\cdot\\infty$", "$\\infty/0$", "$1^\\infty$"],
        answer: "C",
        explanation: "A non-zero number over zero gives $\\infty$ (or $-\\infty$), a determinate divergence.",
      },
      {
        question: "$\\lim_{n\\to\\infty}(1+\\frac3n)^n$ equals:",
        options: ["1", "3", "$e^3$", "$e$"],
        answer: "C",
        explanation: "The general form is $e^k$ with $k=3$.",
      },
    ],
    visualType: "indeterminate",
  }),
];
