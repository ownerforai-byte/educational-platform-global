import { mk } from "./topic-factory.mjs";
import { CALC_B18 } from "./calc-b18.mjs";

/** Batch 19 — concavity and points of inflection. */
export const CALC_B19 = [
  mk({
    title: "Concavity and Points of Inflection",
    topicTitle: "Concavity and points of inflection",
    topicSlug: "concavity-points-of-inflection",
    notes: [
      "**Concavity is a property of an INTERVAL, not a point.** $f''>0$ on an interval means concave up, $f''<0$ concave down. Saying 'the curve is concave up at $x=2$' is loose; the correct statement is about a neighbourhood of 2.",
      "**Concave up means the tangent lies BELOW the curve, and concave down means it lies above.** This tangent-versus-curve picture is the most reliable way to fix the direction in memory, and it is what the inequality $f(a+h)=f(a)+f'(a)h+\\tfrac12f''(a)h^2$ encodes.",
      "**An inflection point needs a SIGN CHANGE in $f''$.** Vanishing at a point is not enough: $f=x^4$ has $f''(0)=0$ with no sign change and therefore no inflection, while $y=x^3$ at 0 is a genuine inflection with $f''$ also zero.",
      "**An inflection point does not have to be a stationary point.** $y=x^3$ is increasing straight through 0 yet concave down before and concave up after, so 0 is an inflection with no extremum at all.",
      "**An inflection can occur where $f''$ does not exist.** A cusp such as $y=x^{1/3}$ has infinite second derivative at 0 and an inflection there. So 'find where $f''=0$' is incomplete — also test where $f''$ is undefined.",
      "**Use the second-derivative test to classify stationary points, not the first-derivative test's sign chart:** $f''(a)>0$ local minimum, $f''(a)<0$ local maximum, and $f''(a)=0$ inconclusive, requiring a return to the first-derivative test or a higher derivative.",
    ],
    confusions: [
      "Declaring an inflection wherever $f''=0$, which incorrectly includes $x^4$ at 0.",
      "Assuming every inflection point is also a maximum or minimum; $x^3$ at 0 refutes this.",
      "Testing only whether $f''=0$ and forgetting points where $f''$ is undefined but the concavity changes.",
    ],
    practice: [
      "$f=x^3-6x^2+9x$: $f''=6x-12$, negative for $x<2$ and positive for $x>2$, so the sign changes at $x=2$ and $(2,2)$ is an inflection.",
      "$f=x^4$: $f''=12x^2\\ge0$ everywhere, no sign change, so $x=0$ is a minimum but not an inflection.",
      "$f=x^{1/3}$: $f''=-\\frac19x^{-5/3}$, undefined at 0, and the concavity switches there, so 0 is an inflection.",
    ],
    universalFacts: [
      "Sensors are designed to work near the linear region of a calibration curve, where the second derivative vanishes and the response is least sensitive to drift.",
      "Inverted pendulums rely on the change of concavity: a pendulum is stable only while the potential is concave up, and a vertical rod is stable because the concavity reverses there.",
    ],
    formulas: [
      "Concave up: $f''(x)>0$; concave down: $f''(x)<0$",
      "Inflection: $f''$ changes sign at $x$",
      "2nd-derivative test: $f''(a)>0$ min, $f''(a)<0$ max, $=0$ inconclusive",
      "Taylor leading term: $f(a+h)=f(a)+f'(a)h+\\tfrac12f''(a)h^2+o(h^2)$",
    ],
    keyPoints: [
      "Concavity is an interval property, described by the sign of $f''$.",
      "An inflection requires a SIGN CHANGE in $f''$, not merely $f''=0$.",
      "An inflection point need not be a stationary point, and $f''$ may be undefined there.",
    ],
    summary:
      "Concavity records how the slope itself changes, and is read from the sign of $f''$ over an interval rather than at a point. Concave up places the tangent below the curve and concave down places it above, which is the quickest way to fix the direction. An inflection point requires a genuine sign change in $f''$ — not merely its vanishing, and not necessarily at a stationary point — and may occur where the second derivative does not exist at all.",
    importantStatements: [
      "Statement 1: $f''>0$ on an interval means the curve is concave up there.",
      "Statement 2: An inflection point requires $f''$ to change sign.",
      "Statement 3: $f''(a)=0$ makes the second-derivative test inconclusive.",
      "Statement 4: An inflection point need not be a stationary point.",
      "Statement 5: A point where $f''$ is undefined may still be an inflection.",
    ],
    examShortTricks: [
      "Write the sign of $f''$ on a number line and look only for a CHANGE of sign, not a zero.",
      "When classifying a stationary point with $f''=0$, go straight to the first-derivative sign chart rather than the third derivative.",
    ],
    examNotes: [
      "Finding points of inflection and classifying stationary points is a standard 4-mark question.",
    ],
    mcs: [
      {
        question: "$f''(a)=0$ at a stationary point implies:",
        options: ["a local maximum", "a local minimum", "an inflection point", "nothing definite"],
        answer: "D",
        explanation: "The second-derivative test is inconclusive when $f''(a)=0$; $x^4$ gives a minimum and $x^3$ gives an inflection, so no conclusion follows.",
      },
      {
        question: "For $f(x)=x^4$, the point $x=0$ is:",
        options: ["a maximum", "a minimum and an inflection", "a minimum but not an inflection", "an inflection but not a minimum"],
        answer: "C",
        explanation: "$f''=12x^2\\ge0$ on both sides, so there is no sign change and therefore no inflection, even though $0$ is a minimum.",
      },
      {
        question: "A curve is concave up on an interval when:",
        options: ["$f'>0$", "$f''>0$", "$f''=0$", "$f'<0$"],
        answer: "B",
        explanation: "Concavity is governed by the second derivative; the first derivative governs increasing or decreasing, a different question.",
      },
    ],
    visualType: "derivative",
  }),
];
export { CALC_B18 };
