import type { UnitDepth } from "./mindmap-depth";

/** Trigonometric ratios, identities & equations. */
export const TRIG_DEPTH: Record<string, UnitDepth> = {
  trigonometry: {
    unitFacts: [
      "The unit circle makes the trig ratios GEOMETRIC rather than decorative: as the terminal arm rotates, $\\sin$ and $\\cos$ are literally y- and x-coordinates, so every quadrant sign follows from the sign of the coordinate.",
      "Identities are always TRUE for every value of the angle, whereas equations are true only for particular values — a transcendental function of a non-zero angle could never satisfy an identity.",
    ],
    unitEdgeCases: [
      "$\\sin^{-1}x$ means ARCSIN (the inverse function), NOT $1/\\sin x = \\csc x$. The confusion between reciprocal and inverse is the single biggest error in this unit.",
      "A calculator in DEGREE mode will give a wrong answer for every physics or calculus question, because the standard limits and derivatives of $\\sin$ assume RADIANS.",
    ],
    unitExamAsked: [
      "NEB: 'Solve $\\sin 2x = \\frac{\sqrt3}{2}$ for $0^\\circ \\le x \\le 180^\\circ$.' — $\\tan x = \\frac{\\sqrt3}{3}$, so $x = 30^\\circ$ (or $150^\\circ$ for the second angle branch).",
      "CEE: 'Prove $\\frac{1-\\cos 2x}{\\sin 2x} = \\tan x$.' — divide numerator and denominator by $2\\sin x\\cos x$.",
    ],
    unitCommonMistakes: [
      "Using $\\sin^{-1}x$ to mean a reciprocal. Write $\\csc x$ for the reciprocal and $\\arcsin x$ for the inverse, always.",
      "Dropping the general solution and giving only the principal value, so a question asking for all values between 0° and 360° loses half the marks.",
    ],
    leaves: {
      "uc-trig-1a": {
        keyFacts: [
          "The unit circle gives the sign pattern for free: $\\sin$ follows y, $\\cos$ follows x, and $\\tan$ follows the ratio — so every ratio is positive only in quadrant I.",
          "$\\tan\\theta$ is undefined at $90^\\circ$ and $270^\\circ$ because $\\cos\\theta = 0$ there, so the ratio diverges even though $\\sin$ and $\\cos$ are perfectly defined.",
        ],
        edgeCases: [
          "$\\sin 0 = \\cos 90 = \\tan 0 = 0$, and the corresponding cofunction identities mean the exact values at the quadrant boundaries are always 0, 1 or undefined.",
          "A negative angle in standard position rotates CLOCKWISE, which is why $\\sin(-60^\\circ) = -\\sin 60^\\circ$ while the reference angle is still $60^\\circ$.",
        ],
        examAsked: [
          "NEB: 'Find the exact values of $\\sin 240^\\circ$, $\\cos 300^\\circ$ and $\\tan 150^\\circ$.' — $-\\frac{\\sqrt3}{2}$, $\\frac12$, $-\\frac{1}{\\sqrt3}$.",
          "CEE: 'Which quadrants is $\\tan\\theta$ negative in?' — II and IV.",
        ],
        commonMistakes: [
          "Taking the reference angle and ignoring the quadrant sign, giving $\\sin 240^\\circ = \\frac{\\sqrt3}{2}$ instead of $-\\frac{\\sqrt3}{2}$.",
          "Treating $\\tan 90^\\circ$ as 0 or infinite in a numeric sense; it is simply undefined, so it cannot appear in any triangle.",
        ],
      },
      "uc-trig-1b": {
        keyFacts: [
          "The reciprocals are $\\csc = 1/\\sin$, $\\sec = 1/\\cos$, $\\cot = 1/\\tan$ — all defined wherever the primary ratio is non-zero.",
          "$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$, so $\\cot = 1/\\tan$ breaks down at $0^\\circ$ and $180^\\circ$ where $\\sin = 0$ and $\\tan = 0$.",
        ],
        edgeCases: [
          "The INVERSE functions (arcsin, arccos, arctan) are entirely different from the reciprocals; $\\csc x \\ne \\arcsin x$ and neither is a 'power'.",
          "$\\sec$ and $\\csc$ are undefined where $\\cos$ and $\\sin$ are zero, which is why they appear in no right-triangle ratio and are used mainly in identities.",
        ],
        examAsked: [
          "NEB: 'Simplify $\\frac{1}{\\tan x} - \\frac{\\cos x}{\\sin x}$.' — both terms are $\\cot x$, so the difference is 0.",
          "CEE: 'Express $\\sec x$ in terms of $\\sin x$ given $\\cos x > 0$.' — $\\frac{1}{\\sqrt{1-\\sin^2 x}}$.",
        ],
        commonMistakes: [
          "Reading $\\sin^{-1}x$ as $1/\\sin x$ in an identity, producing a wrong answer where the reciprocal is $\\csc x$.",
          "Losing the sign when taking $\\sqrt{\\cos^2 x} = \\cos x$; it is $|\\cos x|$ in general, and only equals $\\cos x$ where $\\cos x \\ge 0$.",
        ],
      },
      "uc-trig-2a": {
        keyFacts: [
          "The Pythagorean identities are $\\sin^2 + \\cos^2 = 1$, $1 + \\tan^2 = \\sec^2$ and $1 + \\cot^2 = \\csc^2$ — the last two are DERIVED from the first, not independent.",
          "Squaring an identity doubles the angle, so $\\cos 2x = 1 - 2\\sin^2 x = 2\\cos^2 x - 1$ — three forms of the same fact, useful whichever the question gives you.",
        ],
        edgeCases: [
          "$\\sin^2 x + \\cos^2 x = 1$ holds for EVERY $x$, whereas $\\sin^2 x + \\cos^2 x = 1$ is also trivially true at a single value — this is why identities are verified by right-hand-side substitution, not by a numerical check.",
          "$\\sec^2 x - \\tan^2 x = 1$ and $\\csc^2 x - \\cot^2 x = 1$ follow immediately, so memorising one identity and deriving the rest is faster than memorising all six.",
        ],
        examAsked: [
          "NEB: 'Prove $\\frac{1}{1-\\cos^2 x} = \\sec^2 x$.' — substitute the identity for the denominator.",
          "CEE: 'Show that $\\sec^2 x - \\tan^2 x = 1$.' — expand $\\sec^2 = 1+\\tan^2$.",
        ],
        commonMistakes: [
          "Confusing $\\sin^2 x$ with $(\\sin x)^2 \\cdot 2$ or with $\\sin(x^2)$; the superscript squares the VALUE, not the argument.",
          "Proving an identity by plugging in one convenient angle — a single numerical check proves nothing about all x.",
        ],
      },
      "uc-trig-2b": {
        keyFacts: [
          "$\\sin 2x = 2\\sin x\\cos x$ and $\\cos 2x = \\cos^2 x - \\sin^2 x$ are the two double-angle identities, and dividing one by the other gives $\\tan 2x = \\frac{2\\tan x}{1-\\tan^2 x}$.",
          "Compound angles add inside the bracket: $\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B$ — every sign in the four identities follows this pattern.",
        ],
        edgeCases: [
          "$\\sin 2x = 2\\sin x$ is FALSE; the factor of 2 must multiply the PRODUCT $\\sin x\\cos x$. This is the most common double-angle error.",
          "$\\cos 2x = 2\\cos x$ is similarly false — the correct forms are $1-2\\sin^2 x$ or $2\\cos^2 x - 1$, never a bare doubling.",
        ],
        examAsked: [
          "NEB: 'Express $\\cos 2x$ in terms of $\\tan x$.' — $\\frac{1-\\tan^2 x}{1+\\tan^2 x}$.",
          "CEE: 'Evaluate $\\sin 30^\\circ \\cos 30^\\circ$.' — $\\tfrac12\\sin 60^\\circ = \\frac{\\sqrt3}{4}$.",
        ],
        commonMistakes: [
          "Writing $\\cos 2x = 2\\cos x$ or $\\sin 2x = 2\\sin x$ — a doubling mistake that appears in almost every paper on this topic.",
          "Forgetting that the angle must be a NUMBER: $\\sin(2) \\ne 2\\sin$ anything, since the 2 multiplies the angle, not the sine.",
        ],
      },
      "uc-trig-3a": {
        keyFacts: [
          "The principal value of $\\arcsin$ lies in $[-90^\\circ, 90^\\circ]$, of $\\arccos$ in $[0^\\circ, 180^\\circ]$ and of $\\arctan$ in $(-90^\\circ, 90^\\circ)$.",
          "Solving $\\sin\\theta = a$ needs a reference angle $\\alpha$ and then TWO branches in 0–360°: $\\theta = \\alpha$ and $\\theta = 180^\\circ - \\alpha$, where $\\alpha = \\arcsin a$.",
        ],
        edgeCases: [
          "$\\arcsin$ has a restricted range while $\\sin$ does not, so $\\arcsin(\\sin\\theta) = \\theta$ only when $\\theta$ is already a PRINCIPAL value — otherwise it returns a different, reduced angle.",
          "$\\tan\\theta = a$ has solutions $180^\\circ$ apart, so in 0–360° there are exactly two: $\\arctan a$ and $180^\\circ + \\arctan a$.",
        ],
        examAsked: [
          "NEB: 'Find all values of $\\theta$ in 0–360° with $\\cos\\theta = \\frac{\\sqrt2}{2}$.' — $45^\\circ$ and $315^\\circ$.",
          "CEE: 'Evaluate $\\arcsin(\\sin 200^\\circ)$.' — $-20^\\circ$, because the principal range forces it back into $[-90^\\circ,90^\\circ]$.",
        ],
        commonMistakes: [
          "Assuming the answer to a trig equation is the principal value only, so a question covering 0–360° receives one of two required answers.",
          "Giving quadrant II as the second solution for sine (it is quadrant I and II) or quadrant IV for cosine (it is I and IV).",
        ],
      },
      "uc-trig-3b": {
        keyFacts: [
          "The general solution is $x = n\\pi + (-1)^n\\alpha$ with $n \\in \\mathbb{Z}$ in radians, which compactly produces BOTH branches of every sine equation.",
          "In degrees the same set is written $x = n\\times 180^\\circ + (-1)^n \\alpha$, and for cosine or tangent simply $x = n\\times 180^\\circ \\pm \\alpha$ or $x = n\\times 180^\\circ + \\alpha$.",
        ],
        edgeCases: [
          "Because the period of sine and cosine is $2\\pi$ but that of tangent is $\\pi$, the tangent equation has TWICE as many solutions in any given interval as sine — a frequent counting error.",
          "$n = 0$ must be included; students who start from $n = 1$ silently discard the principal solution.",
        ],
        examAsked: [
          "NEB: 'Solve $\\tan 3x = 1$ for $0^\\circ \\le x \\le 90^\\circ$.' — $3x = 45^\\circ$, so $x = 15^\\circ$.",
          "CEE: 'State the general solution of $\\cos x = \\frac12$.' — $x = 2n\\pi \\pm \\frac{\\pi}{3}$, $n\\in\\mathbb{Z}$.",
        ],
        commonMistakes: [
          "Writing the general solution with $2n\\pi$ for a tangent equation, which silently discards half the solutions.",
          "Dropping the $(-1)^n$ factor and giving only $n\\pi + \\alpha$, missing every alternate solution.",
        ],
      },
    },
  },
};