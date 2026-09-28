import { mk } from "./topic-factory.mjs";

/** Batch 3 — continuity of a function. */
export const CALC_B3 = [
  mk({
    title: "Continuity of Function",
    topicTitle: "Continuity of function",
    topicSlug: "continuity-of-function",
    notes: [
      "**The three conditions:** $f$ is continuous at $x=a$ if (i) $f(a)$ is DEFINED, (ii) $\\lim_{x \\to a} f(x)$ EXISTS, and (iii) the two are EQUAL. All three are required, and naming which one fails is exactly how discontinuity is classified.",
      "**Intuitively:** the graph has no hole, no jump and no break at $a$ — it can be drawn without lifting the pencil. Since this is a limit statement, a function can be continuous everywhere yet fail to be differentiable at a corner (the case $|x|$ at 0).",
      "**Elementary functions:** polynomials are continuous everywhere, so $\\lim_{x\\to a}P(x)=P(a)$ by direct substitution. $\\frac1x$, $\\tan x$, roots and logarithms are continuous only where defined.",
      "**Continuity of a piece:** the test is $\\lim_{x\\to a^-}f(x)=f(a)=\\lim_{x\\to a^+}f(x)$. For piece-wise functions this value-matches-both-sides check is almost always what a question intends.",
      "**Removable discontinuity:** the limit exists but $f(a)$ is undefined or differs from it. Assigning the missing value equal to the limit repairs the function — a strong hint the break is removable.",
      "**Composite and inverse:** $g\\circ f$ is continuous wherever $f$ is continuous and $g$ is continuous at $f(x)$; the inverse of a continuous one-to-one function is continuous on its range, which is why $\\sqrt{\\tan x}$ is continuous exactly where both parts are.",
    ],
    confusions: [
      "Checking only that $f(a)$ is defined and declaring continuity — the limit must exist and match.",
      "Conflating continuity with differentiability — $|x|$ at 0 is continuous but not differentiable.",
      "Using a one-sided limit in place of the two-sided one at a join point.",
    ],
    practice: [
      "Is $f(x)=\\frac{x^2-4}{x-2}$ continuous at 2? No — $f(2)$ is undefined, so condition (i) fails, even though the limit is 4. Defining $f(2)=4$ repairs it.",
      "Is $f(x)=x^2$ continuous at any $x_0$? Yes — polynomials are continuous everywhere and $\\lim x^2 = x_0^2 = f(x_0)$.",
      "For $f(x)=|x|$ at 0: both one-sided limits equal $f(0)=0$, so it is continuous, yet $f'(0)$ does not exist.",
    ],
    universalFacts: [
      "The intermediate value theorem — a continuous function on $[a,b]$ takes every value between $f(a)$ and $f(b)$ — is why a graph with a hole can skip a root but a graph with a jump cannot.",
      "Physical laws are modelled as continuous because the world is, to measurement precision, free of instantaneous jumps; discontinuities in models are usually deliberate idealisations.",
    ],
    formulas: [
      "Continuity at $a$: $f(a)$ defined, $\\lim_{x\\to a}f(x)=L$, and $f(a)=L$",
      "One-sided test: $\\lim_{x\\to a^-}f(x)=f(a)=\\lim_{x\\to a^+}f(x)$",
      "Composite: $g\\circ f$ continuous if $f$ is and $g$ is continuous at $f(x)$",
      "Polynomial: $\\lim_{x\\to a}P(x)=P(a)$",
    ],
    keyPoints: [
      "All three conditions must hold; the failing one names the type of discontinuity.",
      "Continuity does not imply differentiability — $|x|$ at 0 proves it.",
      "Polynomials are continuous everywhere; rational functions except where the denominator vanishes.",
    ],
    summary:
      "Continuity at $a$ requires three things at once: $f(a)$ defined, the two-sided limit existing, and the two being equal. Polynomials and elementary functions are continuous on their domains and composite functions inherit continuity from their parts. Continuity is strictly weaker than differentiability, which is why $|x|$ is continuous but not differentiable at 0.",
    importantStatements: [
      "Statement 1: $f$ is continuous at $a$ only if $f(a)$ is defined, the limit exists, and they are equal.",
      "Statement 2: Every polynomial is continuous everywhere on the real line.",
      "Statement 3: Continuity does not imply differentiability.",
      "Statement 4: A continuous function on $[a,b]$ attains every value between $f(a)$ and $f(b)$.",
      "Statement 5: $g\\circ f$ is continuous wherever both factors are continuous.",
    ],
    examShortTricks: [
      "When asked 'is it continuous at $a$?', name which of the three conditions fails rather than answering only 'no'.",
      "A hole with a well-defined limit is removable — always check for that case first.",
    ],
    examNotes: [
      "Testing continuity of a piece-wise function at a join point is a standard 2–3 mark question.",
    ],
    mcs: [
      {
        question: "At $x=0$, $f(x)=|x|$ is:",
        options: ["continuous and differentiable", "continuous but not differentiable", "discontinuous", "differentiable but not continuous"],
        answer: "B",
        explanation: "Both one-sided limits equal $f(0)=0$ so it is continuous; the left derivative $-1$ and right derivative $+1$ disagree, so no derivative exists.",
      },
      {
        question: "$f(x)=\\frac{x^2-4}{x-2}$ at $x=2$ fails which continuity condition?",
        options: ["the limit does not exist", "$f(2)$ is undefined", "the limit is infinite", "none fails"],
        answer: "B",
        explanation: "The limit exists and equals 4; the failing condition is that $f(2)$ is not defined.",
      },
      {
        question: "If $f$ is continuous on $[a,b]$, which must be true?",
        options: ["it is differentiable", "it is bounded", "it is increasing", "it is linear"],
        answer: "B",
        explanation: "The extreme value theorem guarantees it attains a maximum and minimum, hence boundedness. Differentiability does not follow.",
      },
    ],
    visualType: "continuity",
  }),
];
