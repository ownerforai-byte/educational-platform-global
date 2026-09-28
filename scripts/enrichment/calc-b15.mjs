import { mk } from "./topic-factory.mjs";
import { CALC_B14 } from "./calc-b14.mjs";

/** Batch 15 — area between two curves. */
export const CALC_B15 = [
  mk({
    title: "Area Between Two Curves",
    topicTitle: "Area between two curves",
    topicSlug: "area-between-two-curves",
    notes: [
      "**The rule in one line:** find the intersection points, then integrate (TOP function − BOTTOM function) over the interval between them. The intersections bound the region, and the integrand's sign encodes which curve is on top.",
      "**Intersections come from solving equalities, not from the graph.** For $y=x^2$ and $y=4x^2$ the intersections are where $x^2=4x^2$, giving $x=0$ only, which is why the two parabolas touch at the origin and enclose no bounded region — a quick sanity check that the setup is wrong.",
      "**A worked case, $y^2=4x$ and $x^2=4y$:** solving gives $(0,0)$ and $(4,4)$. Between them $y=\\frac{x^2}{4}$ is the lower boundary and $y=2\\sqrt{x}$ the upper, so the area is $\\int_0^4\\left(2\\sqrt{x}-\\frac{x^2}{4}\\right)dx = \\frac{32}{3}-\\frac{64}{12} = \\frac{32}{3}$ square units.",
      "**When the top curve changes, split the integral.** Regions bounded by three or more curves require a piecewise integrand, and using a single function across the whole span gives a wrong answer that still looks plausible.",
      "**The 'top minus bottom' sign is what guarantees a positive answer.** If an integral over a bounded region returns a negative number, the curves were named in the wrong order — reverse them rather than taking an absolute value at the end.",
      "**Symmetry halves the work:** if the region is symmetric about the $y$-axis or a vertical line, integrate over half and double, then multiply by 2 again if it is symmetric about the $x$-axis as well.",
    ],
    confusions: [
      "Integrating one curve and ignoring the other instead of taking the difference.",
      "Using the same expression over the whole interval when the top curve changes partway.",
      "Failing to find the intersection points, which is what actually bounds the region.",
    ],
    practice: [
      "Between $y=x$ and $y=x^2$ on $[0,1]$: they meet at 0 and 1, $x\\ge x^2$, so $A=\\int_0^1(x-x^2)dx=\\frac12-\\frac13=\\frac16$.",
      "Between $y=2x+1$ and $y=x^2+2$ on $[0,3]$: intersections at $x=1$ and $x=3$, with the line on top for $x<1$ and the parabola for $x>1$.",
      "Between $y^2=4x$ and $y=2x$: intersect at $(0,0)$ and $(4,4)$, and the region is split by the axis so two integrals are needed.",
    ],
    universalFacts: [
      "The area of a circular segment cut by a chord is exactly this integral, and the same computation gives the circular-segment formula in terms of the half-angle.",
      "Hydrostatic pressure force on a curved surface is an area integral of pressure over depth, where the pressure varies with depth — an area computation with a non-constant integrand.",
    ],
    formulas: [
      "$A=\\int_a^b\\big(f_{top}(x)-f_{bottom}(x)\\big)dx$",
      "Intersections: solve $f_{top}(x)=f_{bottom}(x)$",
      "Piecewise: split where the two functions exchange order",
      "Symmetry: $A=2\\int_{half}$ about a vertical axis, $A=4\\int_{quarter}$ about both",
    ],
    keyPoints: [
      "Intersection points bound the region; the graph does not.",
      "Top function minus bottom function, so the answer is automatically positive.",
      "A negative answer means the curves were named in the wrong order.",
    ],
    summary:
      "Area between two curves is a single idea: find where the curves intersect, identify which is on top over each sub-interval, and integrate the difference. The intersections are what bound the region, and where the ordering changes the integral must be split. The top-minus-bottom convention guarantees a positive result, so a negative answer signals the curves were named backwards rather than a need to take an absolute value.",
    importantStatements: [
      "Statement 1: The intersection points of the curves bound the region.",
      "Statement 2: The integrand is the top function minus the bottom function.",
      "Statement 3: The interval must be split wherever the curves exchange order.",
      "Statement 4: A negative computed area indicates the curves were named in reverse.",
      "Statement 5: Symmetry about a vertical axis halves the integration range.",
    ],
    examShortTricks: [
      "Solve for the intersections algebraically before doing any integration — if there are fewer than two, there is no bounded region.",
      "Sketch the two curves; a wrong 'top' function is visible instantly and costs no algebra.",
    ],
    examNotes: [
      "Area between curves with two or three intersection points is a standard 4–5 mark question.",
    ],
    mcs: [
      {
        question: "The area between $y=x$ and $y=x^2$ on $[0,1]$ is:",
        options: ["$\\frac16$", "$\\frac13$", "$\\frac12$", "$1$"],
        answer: "A",
        explanation: "$\\int_0^1(x-x^2)dx=\\frac12-\\frac13=\\frac16$.",
      },
      {
        question: "A computed area between curves comes out negative. This means:",
        options: ["the region is unbounded", "the curves were named in the wrong order", "the integral diverges", "nothing is wrong"],
        answer: "B",
        explanation: "Top minus bottom is non-negative over a bounded region, so a negative value means the subtraction was reversed.",
      },
      {
        question: "The intersection points of two curves are needed to:",
        options: ["find the antiderivatives", "determine the bounds of integration", "check for symmetry", "decide the units"],
        answer: "B",
        explanation: "The region exists only between successive intersections, which supply the limits of integration.",
      },
    ],
    visualType: "integral",
  }),
];
export { CALC_B14 };
