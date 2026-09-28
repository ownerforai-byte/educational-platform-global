import { mk } from "./topic-factory.mjs";
import { CALC_B9 } from "./calc-b9.mjs";

/** Batch 10 — monotonicity and extreme values. */
export const CALC_B10 = [
  mk({
    title: "Monotonicity and Extreme Values",
    topicTitle: "Monotonicity and extreme values",
    topicSlug: "monotonicity-extreme-values",
    notes: [
      "**Sign of $f'$ decides direction:** $f'>0$ means strictly increasing and $f'<0$ strictly decreasing over an INTERVAL. One negative value inside an increasing interval changes nothing, so the sign must be tested across the whole interval.",
      "**Stationary points are only candidates:** they are where $f'=0$, and a turning point is the subset where $f'$ actually CHANGES SIGN. $y=x^3$ has a stationary point at 0 with no extremum, because the sign of $3x^2$ is positive both sides — declaring a maximum straight from $f'=0$ is the commonest error here.",
      "**Fermat's theorem:** if $f$ is differentiable at an interior point $c$ and $f'(c)=0$, then $f(c)$ is a local extreme. The contrapositive is equally useful — an interior local extremum of a differentiable function must have vanishing derivative.",
      "**Absolute extrema on a closed interval:** a continuous function on $[a,b]$ attains both. Check interior critical points FIRST, then the two ENDPOINTS — endpoints are frequently the true answer and are the most commonly forgotten candidates.",
      "**Local versus absolute:** a local maximum only beats its immediate neighbours, so a point can be a local minimum yet lie far above the absolute maximum elsewhere. Reading 'maximum' as 'absolute maximum' without a global check is a frequent conceptual slip.",
      "**Sign-change signature:** increasing then decreasing gives a maximum, decreasing then increasing gives a minimum. This is the first-derivative test, and it is why the sign chart rather than the equation $f'=0$ decides the answer.",
    ],
    confusions: [
      "Treating every solution of $f'=0$ as a maximum or a minimum.",
      "Forgetting the two endpoints when finding absolute extrema on a closed interval.",
      "Checking $f'$ at a single point instead of across the interval when deciding monotonicity.",
    ],
    practice: [
      "$f=x^3-3x$: $f'=3(x^2-1)$ is positive for $x<-1$ and $x>1$, negative between, so $x=-1$ is a local maximum and $x=1$ a local minimum.",
      "$f=x^3$ at 0: $f'=3x^2\\ge0$ both sides, so $f$ increases throughout and the stationary point is not an extremum.",
      "$f=x^2$ on $[-1,3]$: critical value $f(0)=0$, endpoints $f(-1)=1$ and $f(3)=9$, so the absolute maximum is 9 at $x=3$ and the minimum 0 at $x=0$.",
    ],
    universalFacts: [
      "Fermat's principle of least time — light bending at an interface — follows directly from the stationary condition on travel time, tying this topic to optics.",
      "Any closed loop over hilly ground must have both a highest and a lowest point, which is the stationary-point condition in ordinary clothes.",
    ],
    formulas: [
      "Increasing: $f'(x)>0$; decreasing: $f'(x)<0$",
      "Stationary: $f'(c)=0$",
      "First-derivative test: $+\\to-$ maximum, $-\\to+$ minimum",
      "Absolute extrema on $[a,b]$: compare critical values with $f(a)$ and $f(b)$",
      "Fermat: $f'(c)=0$ at an interior local extremum, if differentiable",
    ],
    keyPoints: [
      "$f'=0$ gives candidates only; the SIGN CHANGE decides the extremum.",
      "Endpoints must be included when hunting absolute extrema on a closed interval.",
      "Local and absolute extrema are different questions and both may be asked.",
    ],
    summary:
      "Monotonicity is read from the sign of the derivative across an interval, and extreme values come from where that sign changes. Solving $f'=0$ alone yields only candidates, as $x^3$ demonstrates. On a closed interval the endpoints are also candidates, and omitting them is the most common loss of marks in this topic.",
    importantStatements: [
      "Statement 1: $f$ is strictly increasing on an interval where $f'>0$ throughout.",
      "Statement 2: $f'(c)=0$ is necessary but not sufficient for a local extremum.",
      "Statement 3: A sign change in $f'$ is required to classify a stationary point.",
      "Statement 4: A continuous function on $[a,b]$ attains an absolute maximum and minimum.",
      "Statement 5: Fermat's theorem applies only to interior points of the domain.",
    ],
    examShortTricks: [
      "Build a sign chart for $f'$ across the critical points — the arrows give every classification at once.",
      "Write the endpoint values down explicitly before concluding on a closed interval.",
    ],
    examNotes: [
      "Absolute extrema of a continuous function on a stated closed interval is a very frequent 4-mark question.",
    ],
    mcs: [
      {
        question: "A stationary point of $f$ is necessarily:",
        options: ["a local maximum", "a local minimum", "a turning point", "only a candidate extremum"],
        answer: "D",
        explanation: "$f'(c)=0$ is necessary but not sufficient; $y=x^3$ at 0 is stationary with no extremum.",
      },
      {
        question: "For the absolute maximum of a continuous $f$ on $[a,b]$, consider:",
        options: ["only critical points", "only the endpoints", "critical points AND both endpoints", "the midpoint"],
        answer: "C",
        explanation: "A maximum can sit at an endpoint, so critical values must be compared with $f(a)$ and $f(b)$.",
      },
      {
        question: "If $f'(x)<0$ throughout $(a,b)$ then $f$ is:",
        options: ["increasing", "decreasing", "concave", "constant"],
        answer: "B",
        explanation: "A negative derivative over the whole interval means strictly decreasing there.",
      },
    ],
    visualType: "extrema",
  }),
];
export { CALC_B9 };
