import { mk } from "./topic-factory.mjs";
import { CALC_B17 } from "./calc-b17.mjs";

/** Batch 18 — geometric interpretation of the derivative, and concavity. */
export const CALC_B18 = [
  mk({
    title: "Geometric Interpretation of the Derivative",
    topicTitle: "Geometric interpretation of the derivative",
    topicSlug: "geometric-interpretation-derivative",
    notes: [
      "**The derivative is the tangent slope.** $f'(a)$ is the slope of the tangent to $y=f(x)$ at $x=a$, obtained as the limit of chord slopes, so the tangent is the limiting position of secants as the second point approaches $a$.",
      "**The tangent touches but does not cross.** Since $f(a+h)=f(a)+f'(a)h+o(h)$, the curve and its tangent agree to first order and differ only at second order. This is why the tangent line is a first-order approximation and why it may lie above or below the curve.",
      "**A horizontal tangent means a stationary point,** $f'(a)=0$, where the graph neither rises nor falls. This is the condition for a maximum or a minimum, but not a guarantee of one — $y=x^3$ has a horizontal tangent at the origin with no extremum.",
      "**The angle of inclination satisfies $\\tan\\theta = f'(a)$**, so a negative derivative corresponds to an obtuse angle when measured counterclockwise from the positive $x$-axis. Questions often ask for the angle, requiring this extra step.",
      "**Parallel curves have equal derivatives at equal $x$:** if $f'(a)=g'(a)$ the tangents are parallel, and the vertical gap between the curves is stationary there. This is used to compare solutions of competing processes.",
      "**Normal lines are perpendicular to the tangent,** so their slope is $-\\frac1{f'(a)}$, undefined when $f'(a)=0$ — precisely the case that gives a horizontal tangent and hence a VERTICAL normal.",
    ],
    confusions: [
      "Computing $f'(a)$ and reporting it as the angle of inclination, forgetting to apply $\\theta=\\tan^{-1}(f'(a))$.",
      "Saying a horizontal tangent guarantees a maximum; it marks a candidate only.",
      "Computing the normal's slope as $-\\frac1{f'(a)}$ when $f'(a)=0$, which is division by zero — the normal is vertical instead.",
    ],
    practice: [
      "For $y=x^2$ at $x=2$: $f'(2)=4$, so the tangent is $y-4=4(x-2)$ and the angle is $\\tan^{-1}4\\approx76^\\circ$.",
      "For $y=x^3$ at the origin: $f'(0)=0$ gives a horizontal tangent, yet $x^3$ is increasing throughout, so there is no extremum.",
      "For $y=\\frac1x$ at $x=1$: $f'(1)=-1$, so the normal's slope is $1$.",
    ],
    universalFacts: [
      "The tangent to a curve is the local linear model: an error of order $h^2$ in $x$ gives an error of order $h^2$ in the approximation, which is why linearising motion equations is the first step of most numerical simulation.",
      "Refraction can be derived by demanding the path length be stationary, which is Fermat's condition and a direct application of the horizontal-tangent principle.",
    ],
    formulas: [
      "Tangent at $a$: $y - f(a) = f'(a)(x-a)$",
      "Angle of inclination: $\\tan\\theta = f'(a)$",
      "Stationary point: $f'(a)=0$",
      "Normal slope: $-\\frac{1}{f'(a)}$ for $f'(a)\\ne0$",
      "Expansion: $f(a+h)=f(a)+f'(a)h+o(h)$",
    ],
    keyPoints: [
      "The derivative is the tangent slope, obtained as a limit of chord slopes.",
      "A horizontal tangent marks a candidate extremum, not a guaranteed one.",
      "Report an ANGLE, not a slope, when the question asks for the angle of inclination.",
    ],
    summary:
      "Geometrically the derivative is the slope of the tangent, obtained as the limiting position of secants. The tangent is a first-order approximation, so it matches the curve to first order and may lie above or below it. A zero derivative gives a horizontal tangent, which is a candidate extremum but not a certainty, and the angle of inclination is $\\tan^{-1}$ of the slope rather than the slope itself.",
    importantStatements: [
      "Statement 1: $f'(a)$ is the slope of the tangent to the curve at $x=a$.",
      "Statement 2: $f'(a)=0$ indicates a horizontal tangent.",
      "Statement 3: The angle of inclination satisfies $\\tan\\theta=f'(a)$.",
      "Statement 4: A horizontal tangent makes the normal vertical, so the normal has no finite slope.",
      "Statement 5: The tangent line agrees with the curve to first order near the point of contact.",
    ],
    examShortTricks: [
      "If the question says 'angle of inclination', finish with $\\tan^{-1}$ — reporting the raw slope loses the mark.",
      "Sketch the curve and mark the tangent; a picture settles sign and quadrant questions faster than algebra.",
    ],
    examNotes: [
      "Finding the equation of a tangent or normal at a point is a standard 3-mark question.",
    ],
    mcs: [
      {
        question: "The angle of inclination of the tangent to $y=x^2$ at $x=2$ satisfies:",
        options: ["$\\tan\\theta=2$", "$\\tan\\theta=4$", "$\\theta=4$", "$\\tan\\theta=8$"],
        answer: "B",
        explanation: "$f'(2)=2x\\big|_{x=2}=4$, and the angle of inclination satisfies $\\tan\\theta=f'(a)$.",
      },
      {
        question: "A horizontal tangent at a point means:",
        options: ["a maximum", "a minimum", "$f'=0$ there", "$f''=0$ there"],
        answer: "C",
        explanation: "Horizontal tangent means zero slope, i.e. $f'=0$ there. Whether that is an extremum needs a further test.",
      },
      {
        question: "The normal to $y=x^3$ at the origin is:",
        options: ["$y=0$", "$x=0$", "$y=x$", "$y=-x$"],
        answer: "B",
        explanation: "The tangent is horizontal, so the normal is vertical, i.e. $x=0$; the formula $-\\frac1{f'}=-\\frac10$ is undefined, which is exactly why.",
      },
    ],
    visualType: "derivative",
  }),
];
export { CALC_B17 };
