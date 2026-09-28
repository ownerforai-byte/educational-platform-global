import { mk } from "./topic-factory.mjs";
import { CALC_B3 } from "./calc-b3.mjs";

/** Batch 4 — the three types of discontinuity. */
export const CALC_B4 = [
  mk({
    title: "Types of Discontinuity",
    topicTitle: "Types of discontinuity",
    topicSlug: "types-of-discontinuity",
    notes: [
      "**Removable (hole):** $\\lim_{x\\to a^-}f=\\lim_{x\\to a^+}f=L\\ne f(a)$, or $f(a)$ undefined. Both one-sided limits AGREE, so only one point is wrong. Examples: $\\frac{x^2-4}{x-2}$ at 2, or $\\frac{\\sin x}{x}$ at 0 if its value is wrongly set to 1.",
      "**Jump (step):** both one-sided limits exist but DIFFER, so the two-sided limit does not exist. $\\frac{x}{|x|}$ at 0 and the floor function at integers are standard. The jump SIZE is $|f(a^+)-f(a^-)|$.",
      "**Infinite (second kind):** at least one one-sided limit is infinite, so a vertical asymptote passes through $x=a$. $\\frac1x$ at 0 and $\\tan x$ at $\\frac{\\pi}{2}$ are the standard examples. Opposite-sign divergence means the asymptote is approached from both sides.",
      "**Classifying from one-sided limits:** equal and equal to $f(a)$ means continuous; equal but not equal to $f(a)$ is removable; both finite but different is a jump; either infinite is an infinite discontinuity. This four-way test settles every classification question.",
      "**Why the type matters:** a removable discontinuity is repairable with a single reassigned value, a jump is not, and an infinite one means the function is unbounded near $a$. The intermediate value theorem fails at all three, but differently.",
      "**Effect on the derivative:** differentiability presupposes continuity, so a discontinuity of ANY type rules out a derivative there — even a removable one, until the hole is filled.",
    ],
    confusions: [
      "Calling $|x|$ at 0 removable — it is a JUMP, because the one-sided limits are governed by different branches rather than one wrong value.",
      "Saying an infinite discontinuity 'has limit infinity' — infinity is not a value, so the real limit does not exist.",
      "Assuming a hole is harmless for differentiation — it blocks the derivative even though both one-sided limits agree.",
    ],
    practice: [
      "$f(x)=\\frac{x^3-1}{x-1}$ at 1: both one-sided limits equal $2$ while $f(1)$ is undefined, so it is REMOVABLE, and $f=x^2+x+1$ for $x\\ne1$ shows why.",
      "$f(x)=\\frac{x}{|x|}$ at 0: $\\lim_{x\\to0^-}=-1$ and $\\lim_{x\\to0^+}=1$, both finite and different, so it is a JUMP.",
      "$f(x)=\\frac1x$ at 0: one-sided limits are $-\\infty$ and $+\\infty$, so it is an INFINITE discontinuity with a vertical asymptote.",
    ],
    universalFacts: [
      "The jump in a sampled digital signal is the physical origin of quantisation noise in audio and image compression.",
      "A removable discontinuity is why a computer's piecewise approximation to a smooth function can be made continuous by assigning the limit at the join.",
    ],
    formulas: [
      "Removable: $f(a^-)=f(a^+)=L\\ne f(a)$, or $f(a)$ undefined",
      "Jump: $f(a^-),f(a^+)$ finite but $f(a^-)\\ne f(a^+)$",
      "Jump size: $|f(a^+)-f(a^-)|$",
      "Infinite: $f(a^-)=\\pm\\infty$ or $f(a^+)=\\pm\\infty$",
    ],
    keyPoints: [
      "Removable: the one-sided limits agree but the function value does not.",
      "Jump: both one-sided limits exist and differ.",
      "Infinite: at least one one-sided limit diverges, giving a vertical asymptote.",
      "Any discontinuity rules out differentiability at that point.",
    ],
    summary:
      "Discontinuities sort into three types, distinguished entirely by the one-sided limits. Removable means they agree but the function value differs, so one reassignment repairs it. Jump means both exist and differ, giving a finite step. Infinite means at least one diverges, producing a vertical asymptote. Differentiability is impossible at all three, because it presupposes continuity.",
    importantStatements: [
      "Statement 1: A removable discontinuity has equal one-sided limits.",
      "Statement 2: A jump discontinuity has two finite but unequal one-sided limits.",
      "Statement 3: An infinite discontinuity has at least one one-sided limit equal to $\\pm\\infty$.",
      "Statement 4: A function cannot be differentiable where it is discontinuous.",
      "Statement 5: The jump magnitude is $|f(a^+)-f(a^-)|$.",
    ],
    examShortTricks: [
      "Compute BOTH one-sided limits first; comparing $(f(a^-), f(a^+), f(a))$ classifies every case.",
      "If one side is infinite, stop — it is an infinite discontinuity regardless of the other side.",
    ],
    examNotes: [
      "Classifying a discontinuity from its one-sided limits is a frequent 3-mark question.",
    ],
    mcs: [
      {
        question: "$f(x)=\\frac{x}{|x|}$ at $x=0$ has a:",
        options: ["removable", "jump", "infinite", "no discontinuity"],
        answer: "B",
        explanation: "The one-sided limits $-1$ and $1$ are both finite but different — the definition of a jump.",
      },
      {
        question: "$f(x)=\\tan x$ at $x=\\frac{\\pi}{2}$ has a:",
        options: ["removable", "jump", "infinite", "no discontinuity"],
        answer: "C",
        explanation: "The one-sided limits diverge to $\\pm\\infty$ because $\\cos x=0$ there, giving a vertical asymptote.",
      },
      {
        question: "For a removable discontinuity at $a$:",
        options: ["redefining $f(a)$ restores continuity", "the limits are infinite", "it is automatically differentiable", "the one-sided limits differ"],
        answer: "A",
        explanation: "Setting $f(a)$ to the common limit repairs continuity; differentiability must still be checked separately.",
      },
    ],
    visualType: "discontinuity",
  }),
];
export { CALC_B3 };
