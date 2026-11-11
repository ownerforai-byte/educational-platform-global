"use client";

import type { DerivationOrTheorem } from "@/lib/derivations-data";
import { DerivationVisual } from "./derivation-visual";
import { MathMarkdown } from "@/components/content/math-markdown";
import {
  Lightbulb,
  Target,
  Activity,
  ShieldAlert,
} from "lucide-react";

interface ScienceBankColumnsProps {
  derivation: DerivationOrTheorem;
}

const ICON_THEME: Record<string, {
  accent: string;
  badge: string;
  border: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  mathematics: {
    accent: "text-indigo-600 dark:text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    border: "border-indigo-500/20",
    icon: Lightbulb,
  },
  physics: {
    accent: "text-sky-600 dark:text-sky-400",
    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    border: "border-sky-500/20",
    icon: Activity,
  },
  chemistry: {
    accent: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    border: "border-amber-500/20",
    icon: Target,
  },
  biology: {
    accent: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    border: "border-emerald-500/20",
    icon: ShieldAlert,
  },
};

type ColumnSpec = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  rows: string[];
  accent: string;
  badge: string;
};

function columnsFor(derive: DerivationOrTheorem): ColumnSpec[] {
  const theme = ICON_THEME[derive.subject] ?? ICON_THEME.mathematics;

  const gives: string[] = [];

  if (derive.subject === "mathematics") {
    if (derive.visualType === "point-to-line-distance") {
      gives.push("Perpendicular distance from any P(x₁,y₁) to Ax+By+C=0 — read p straight from the formula.");
      gives.push("Shortest Euclidean distance: the normal segment PM on the canvas is the geometric meaning of p.");
      gives.push("Sign of Ax₁+By₁+C tells which side of the line the point sits on relative to the origin.");
      gives.push("Distance between two parallel lines: same A,B means only the constants differ — d = |C₁−C₂|/√(A²+B²).");
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: gives,
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Any analytic-geometry distance problem — point to line, point to plane precursor, parallel-line gaps.",
            "Board questions asking 'find the perpendicular distance' or 'show the point is at distance k'.",
            "Geometry of the normal form x cos α + y sin α = p, where p itself IS the distance.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Slide P parallel to the line: Ax₁+By₁+C stays constant, so p stays constant — distance is constant on a parallel.",
            "Cross the line: the numerator flips sign but the absolute value keeps p non-negative.",
            "Double A and B together: denominator scales up, so the same point is closer to the 'steeper' normal form.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Forget the absolute value on the numerator and you can get a negative 'distance' — distance is a scalar.",
            "A and B both zero is a degenerate 'line' — A²+B² ≠ 0 is required before the formula applies.",
            "Distance from the origin is a 2-second shortcut: p = |C|/√(A²+B²), no x₁,y₁ needed.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "pair-of-lines") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Angle θ between two lines through the origin from the homogeneous equation ax²+2hxy+by²=0.",
            "Perpendicular test: a+b=0 ⟹ θ=90°; coincident test: h²=ab ⟹ θ=0°.",
            "The ± in tan θ picks acute vs obtuse; the acute angle uses |a+b| in the denominator.",
            "Relationship between the coefficients and the slopes: m₁+m₂=-2h/b, m₁m₂=a/b.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Board MCQs: 'find the angle between the pair 2x²+7xy+3y²=0' — the classic clean 45° answer.",
            "Condition questions: given a pair, decide if they're perpendicular, coincident or imaginary.",
            "Joint-equation problems where two known lines through the origin are multiplied into one homogeneous equation.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Increase h toward √(ab): the lines close; at h²=ab they coincide and the angle collapses to 0°.",
            "Flip the sign of a+b: the obtuse-angle branch activates, tan θ changes sign, ± recovers the acute value.",
            "Drop below h²=ab: the discriminant turns negative — no real lines, only an imaginary pair through the origin.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "h is HALF the xy coefficient: in 2x²+7xy+3y²=0, 2h=7 so h=7/2 — take h wrong and the whole answer breaks.",
            "Real distinct lines require h²>ab; equal gives coincident, less gives imaginary — check the discriminant first.",
            "The acute angle is the one you report: take the absolute value of the denominator before arctan.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "limit-sin-x") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "lim_{θ→0} sin θ/θ = 1, proved geometrically on the unit circle via the squeeze theorem.",
            "The sandwich: sin θ < θ < tan θ inside the first quadrant, so cos θ < sin θ/θ < 1.",
            "Consequence for tan: lim_{θ→0} tan θ/θ = 1 follows from the same inequality.",
            "Consequence for cos: lim_{θ→0} (1−cos θ)/θ² = 1/2, using 1−cos θ = 2 sin²(θ/2).",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Every trigonometric derivative from first principles — d/dx(sin x)=cos x depends on this limit, not the other way round.",
            "Limit problems with scaled arguments: lim sin(5x)/tan(3x) = 5/3, by multiplying by the coefficient inside.",
            "Distinguishing radian vs degree limits: in degrees the limit is π/180, not 1.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Squeeze θ toward 0: both the lower bound cos θ and the upper bound 1 converge to 1, so the trapped ratio has to converge too.",
            "Halve the angle inside the limit: sin(5x)/5x and tan(3x)/3x both still go to 1 — the scaling cancels out.",
            "Degrees instead of radians: the same geometric picture rescales by π/180, so the limit is no longer 1.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "L'Hôpital on sin θ/θ is circular — you need this limit to know d/dθ(sin θ)=cos θ in the first place.",
            "Degrees fail silently: sin x°/x → π/180, not 1 — always check the angle measure before quoting 1.",
            "sin θ/θ² diverges: dividing by a faster-vanishing denominator breaks the squeeze — the limit is not finite.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "trapezoidal-rule") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Numerical approximation of ∫ₐᵇ f(x)dx from n strips of width h=(b−a)/n.",
            "The rule: (h/2)[ (y₀+yₙ) + 2(y₁+…+yₙ₋₁) ] — ends once, intermediates doubled.",
            "Exactness for straight lines: degree ≤ 1 polynomials give zero error, since the chord lies on the curve.",
            "Error ordering: truncation error ∝ h², so halving h quarters the error.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Board numerical-integration problems: given a table of ordinates, estimate the definite integral.",
            "Fallback when data points give an odd number of strips and Simpson's 1/3 rule cannot apply (Simpson needs even n).",
            "Quick sanity check on a known integral — if the estimate is far off, recheck the ordinate table and the doubling.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Add more strips (larger n, smaller h): the piecewise-chord picture hugs the curve more closely and the answer improves.",
            "Concave-up f (f″>0): chords sit above the arc, so the estimate over-estimates; concave-down under-estimates.",
            "n→1: the rule degrades to a single trapezoid (b−a)/2[f(a)+f(b)] — the crudest one-strip estimate.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "n = number of strips, not points: n=4 gives 5 ordinates — count the points wrong and the table is off by one.",
            "Intermediate ordinates are doubled — forgetting the factor 2 is the most common arithmetic slip in this problem.",
            "Simpson's superiority is the usual comparison: trapezoidal is the safe fallback when n is odd.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "am-gm-hm") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Chain for two positive numbers: AM ≥ GM ≥ HM, with equality iff a=b.",
            "Key identity G² = AH — the three means form a geometric progression.",
            "Minimum-value tool: split an expression into two positive terms with constant product, apply AM ≥ GM.",
            "N-variable generalisation: AM ≥ GM ≥ HM for n positive numbers, equality only when all equal.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "CEE minimum-value questions: min(x+1/x)=2, min(4x+9/x)=12, found by matching the two terms whose product is constant.",
            "Inequality proofs where you need a bound on a sum from a known product, or vice versa.",
            "Ratio problems: a/b+b/a ≥ 2 by applying AM ≥ GM to the two reciprocal terms.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Push one number large, keep the other fixed: AM and GM both grow, but AM outruns GM — the gap A−G becomes unbounded.",
            "As b→∞ with a fixed: AM→≈b/2, GM grows slower, HM→2a — the harmonic mean locks onto twice the smaller value.",
            "Bring a and b together: all three means converge to the same value at equality a=b.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Positivity is required: GM of a negative number is not real — state a,b>0 before any AM-GM step.",
            "Minimum from AM-GM only holds when the two terms can be equal; if they cannot, the bound may not be attainable.",
            "HM is the least mean, not the greatest — reversing the order is a common exam slip.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "lmvt-rolle" || derive.visualType === "ftc-calculus") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Geometric picture of the Mean Value Theorem: a secant chord and a parallel tangent at some c in (a,b).",
            "Rolle's special case: when f(a)=f(b) the secant is horizontal, so f'(c)=0 — peak or trough match the average slope.",
            "FTC picture: area from a to x builds F(x), and a thin strip of width h adds f(c)·h — differentiating reverses integration.",
            "The bridge between slope and area: differentiation and integration are inverse operations, visualised on one canvas.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Proving existence of a turning point or a horizontal tangent inside an interval (Rolle).",
            "Error-bound and rate-of-change reasoning where an average slope equals an instantaneous slope somewhere.",
            "Justifying that ∫ₐˣ f(t)dt differentiates back to f(x) — the core of the definite-integral machinery.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Slide the interval endpoints: the secant slope changes and the matching tangent point c shifts to keep pace.",
            "At a flat secant (Rolle): the tangent at c is horizontal — f'(c)=0 — identifying a stationary point.",
            "Grow the upper limit a little: the area strip adds f(c)·h, so the rate of area growth IS the function height.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "MVT needs continuity on [a,b] and differentiability on (a,b) — a corner inside the interval breaks the claim.",
            "Rolle requires f(a)=f(b); without equal endpoints the secant is not horizontal and f'(c)=0 does not follow.",
            "FTC applies to the variable upper limit; a constant upper limit differentiates to 0, not f(x).",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "demoivre-roots") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "n-th roots of a complex number as equally spaced points on a circle of radius r^{1/n}.",
            "Cube roots of unity form an equilateral triangle: 1, ω, ω² with sum 0 and product 1.",
            "Argument division: arg(z^{1/n}) = (arg z + 2kπ)/n, so each root is 2π/n apart.",
            "De Moivre's bridge: (cos θ + i sin θ)^n = cos nθ + i sin nθ, powering the whole construction.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Solving z^n = 1 or z^n = w — the roots always lie on a circle and are evenly spaced.",
            "Factorising z^n−1 using the root picture, especially the cube-root identity 1+ω+ω²=0.",
            "Rotation problems: multiplying by ω rotates by 2π/n on the Argand plane.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Increase n: the roots spread into more, tighter points around the circle — the polygon gains more sides.",
            "Scale r: all roots scale by r^{1/n}, so the whole set expands or contracts uniformly.",
            "Add 2π to the argument before dividing: you get the same set of roots, just generated in a different order.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Don't forget the 2kπ term — omitting it gives only one root and misses the rest of the circle.",
            "Cube-root identities only hold for the PRINCIPAL cube roots of unity, not an arbitrary triple.",
            "Principal argument vs general argument: the picture is the same, but the formula needs the full 2kπ family.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "conic-parabola") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "The geometric definition of a parabola: SP = PM, distance to focus equals perpendicular distance to directrix (e=1).",
            "Standard form y²=4ax: focus at (a,0), directrix x=−a, latus rectum = 4a.",
            "Vertex at the origin for the simplest case; the curve opens toward the focus side of the directrix.",
            "The invariant holds for EVERY point P on the curve — it is the defining property, not a coincidence.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Parabola identification questions: given focus and directrix, write the equation and sketch it.",
            "Latus rectum, focal chord and vertex problems — the 4a chord through the focus is a frequent board target.",
            "Real-world parabolic reflectors and projectile paths, where the focus–directrix property shapes the curve.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Move P along the curve: SP and PM stay equal at every position — that equality is what traces the parabola.",
            "Increase a: the focus moves right, the directrix shifts left, and the parabola widens.",
            "Swap the axis orientation: x²=4ay opens upward with focus (0,a) and directrix y=−a.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Sign of a sets the opening direction and which side of the vertex the focus sits on — mix it up and the picture flips.",
            "Latus rectum endpoints are at the focus's y-level, not at the vertex — don't confuse the chord with the axis.",
            "Directrix is perpendicular to the axis and on the opposite side of the vertex from the focus.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "bayes-theorem") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Posterior P(Bᵢ|A) from prior P(Bᵢ) and likelihoods P(A|Bᵢ) via the tree and total-probability denominator.",
            "Total evidence P(A) = Σ P(Bᵢ)P(A|Bᵢ) — the denominator that normalises every posterior.",
            "Reversal of conditionality: P(B|A) is not P(A|B) — the tree makes the difference literal.",
            "Decision framing: which hypothesis Bᵢ best explains the evidence A, updated from prior belief.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Diagnostic-test problems: given test sensitivity/specificity and disease prevalence, find P(disease|positive).",
            "Spam/filter, fault diagnosis, and any 'what caused this evidence' question with disjoint hypotheses.",
            "Board/competition questions where the tree's two branches keep the arithmetic clean.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Raise the prior on B₁: its posterior rises, and the other branch's posterior falls, since they must sum to 1.",
            "Strengthen the likelihood P(A|B₁): the B₁ path carries more of the total evidence weight.",
            "If the two likelihoods are equal, the posterior mirrors the prior — the evidence was uninformative.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Base-rate neglect: a strong likelihood can still leave a small posterior if the prior is tiny — read the whole tree.",
            "P(A|B) ≠ P(B|A): swapping the condition without recomputing is the classic Bayes error.",
            "Hypotheses must be exhaustive and disjoint for the total-probability sum to cover all the evidence weight.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    return [
      {
        icon: theme.icon,
        label: "What it gives",
        rows: derive.keyTakeaways.length ? derive.keyTakeaways.slice(0, 4) : [derive.statement],
        accent: theme.accent,
        badge: theme.badge,
      },
      {
        icon: Target,
        label: "Where it applies",
        rows: derive.solvedProblems.length
          ? derive.solvedProblems.slice(0, 3).map((p) => `${p.examBadge ?? "Board"}: ${p.question}`)
          : ["Syllabus unit work and board-exam practice in this topic."],
        accent: theme.accent,
        badge: theme.badge,
      },
      {
        icon: Activity,
        label: "What happens as you move",
        rows: derive.specialCases?.slice(0, 3).map((sc) => `${sc.name}: ${sc.condition}`)
          ?? ["Behaviour across the standard conditions of this topic."],
        accent: theme.accent,
        badge: theme.badge,
      },
      {
        icon: ShieldAlert,
        label: "Limits & traps",
        rows: derive.examTraps.length ? derive.examTraps : ["Common pitfalls and edge conditions for this topic."],
        accent: theme.accent,
        badge: theme.badge,
      },
    ];
  }

  if (derive.subject === "physics") {
    if (derive.visualType === "projectile-motion") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Full parabolic trajectory y = x tan θ − gx²/(2u² cos²θ) and the three key quantities: T, H, R.",
            "Time of flight T = 2u sin θ/g, maximum height H = u² sin²θ/(2g), range R = u² sin 2θ/g.",
            "Complementary angles θ and 90°−θ give the SAME range — the sin 2θ symmetry.",
            "At the apex only the horizontal velocity remains: v = u cos θ, not zero.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Any ballistic problem launched at an angle under constant g: ball, javelin, water jet, artillery.",
            "Maximum-range question: 45° gives R_max = u²/g, the peak of sin 2θ.",
            "Comparing two launch angles with the same speed — the complementary pair lands in the same spot.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Raise the launch angle toward 90°: range shrinks to zero, height grows to u²/(2g), flight time maxes out.",
            "Tilt toward 45°: range increases to its maximum, balancing height and airtime.",
            "Complementary pair: 30° and 60° with the same speed land at the identical range.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "At the top the velocity is NOT zero — it is u cos θ horizontally. Setting v=0 at the peak loses the kinetic energy there.",
            "Maximum range needs level ground and no air drag; real projectiles fall short and asymmetric.",
            "Range formula R = u² sin 2θ/g is for launch and landing at the same height — lift the launch point and the formula changes.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "banked-road") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Optimum banking angle tan θ = v²/(rg) so the horizontal normal component N sin θ provides all the centripetal force.",
            "Design speed v_opt = √(rg tan θ) — the speed at which no tyre friction is needed.",
            "Mass independence: the banking angle does not depend on vehicle mass — trucks and cars share the same curve design.",
            "Normal resolution: N cos θ = mg, N sin θ = mv²/r — vertical balance plus horizontal centripetal demand.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Road and railway curve design: set the superelevation from the design speed and radius.",
            "Bicycle rider lean: the same tan θ = v²/(rg) governs the rider's inward lean angle.",
            "Comparing banked vs unbanked curves: friction-supplemented safe-speed questions on ordinary bends.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Move faster than v_opt: the car tends to skid outward, friction must act down-slope to hold it.",
            "Move slower than v_opt: the car tends to slide inward, friction acts up-slope.",
            "Stop on the bank (v=0): no centripetal demand, N cos θ = mg alone holds it — banked curves are safe even when empty.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "The frictionless optimum is a design speed, not a speed limit — friction extends the safe window both ways.",
            "Banking angle does NOT depend on mass — any answer that scales with m is wrong.",
            "Unbanked curve safe speed is the friction ceiling v_max = √(μrg); mixing the two formulas is a common slip.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "bernoulli-fluid") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Bernoulli's equation P + ½ρv² + ρgh = constant along a streamline for steady, incompressible, inviscid flow.",
            "Venturi picture: where the pipe narrows, velocity rises and pressure drops — P₁+½ρv₁² = P₂+½ρv₂².",
            "Continuity companion: A₁v₁ = A₂v₂, so the speed change is set by the area change.",
            "Energy-per-volume reading: each term is an energy density — pressure, kinetic, potential.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Venturi meters and carburettors: pressure drop in the constriction is the working principle.",
            "Pitot-static and flow-rate measurements where velocity is inferred from a pressure difference.",
            "qualitative fluid questions: fast jet ⇒ low pressure, explain a spinning ball or a roof lift.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Slide into the constriction: area drops, velocity climbs, and the ½ρv² term grows at the expense of pressure.",
            "Widen back out: velocity recovers, pressure recovers — the trade reverses on the other side.",
            "Add height change: the ρgh term enters, so the same A₁v₁=A₂v₂ speed change now trades against BOTH pressure and height.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Bernoulli assumes steady, incompressible, inviscid, along-a-streamline flow — turbulence and viscosity break it.",
            "Continuity and Bernoulli are paired: using one without the other leaves velocity or pressure unknown.",
            "Pressure is not 'used up' by speed — total head is conserved; the drop in one term is matched by a rise in another.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "lens-makers") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Lens-maker's formula 1/f = (μ−1)(1/R₁ − 1/R₂) linking focal length to surface radii and refractive index.",
            "Sign convention: R₁ positive for a convex first face, R₂ negative for the second convex face — the minus sign in the formula handles it.",
            "Double-convex symmetry: R₁=+R, R₂=−R gives 1/f = (μ−1)(2/R), so f shrinks as μ rises.",
            "For a thin lens in air only — the formula is a limiting case of the two-surface refraction chain.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Designing or identifying a lens from its radii and material — the board's 'find f given R₁,R₂,μ' problem.",
            "Predicting how focal length changes with the surrounding medium (the (μ_rel−1) form).",
            "Qualitative lens behaviour: a plano-convex or meniscus lens, reading the radii signs.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Increase μ: (μ−1) grows, so 1/f grows and f shrinks — a higher-index lens bends light more strongly.",
            "Flatten a face (R→∞): its 1/R term vanishes, weakening the lens toward a plano form.",
            "Reverse the second radius sign convention and the whole formula can flip — keep the sign rule fixed.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Sign convention is the trap: R₁ and R₂ signs depend on the chosen Cartesian convention; copying signs blindly breaks it.",
            "Thin-lens assumption: thickness is neglected — thick lenses need the full two-surface treatment.",
            "In a medium other than air, replace (μ−1) with (μ/μ_medium − 1) or the focal length shifts.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "kinetic-gas-pressure") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Kinetic-theory pressure P = ⅓ ρ c_rms² from the momentum transfer of elastic molecular impacts on the walls.",
            "Microscopic force: one molecule's wall collision changes momentum by 2mv_x, repeated every Δt = 2L/v_x.",
            "Isotropic average: v_x² = v_y² = v_z² = c²/3, turning single-axis collisions into the full mean-square speed.",
            "Bridge to temperature: with PV = nRT the result yields c_rms = √(3k_B T/m) and E_k = 3/2 k_B T.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Deriving the pressure–temperature link from first principles: P = ⅓ρc_rms² → PV = ⅓N m c_rms² = N k_B T.",
            "Explaining why pressure rises with temperature or density in a fixed volume.",
            "Connecting macroscopic gas laws to molecular speeds — c_rms, most-probable, average.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Heat the gas at fixed volume: c_rms rises, so each impact is harder and more frequent — P climbs.",
            "Compress at fixed temperature: density ρ rises, more impacts per area — P climbs even though c_rms is unchanged.",
            "Isotropic spread: even though one molecule moves along x, the average over all molecules shares the energy equally among the three axes.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Ideal-gas assumptions: point molecules, elastic collisions, no intermolecular forces — real gases deviate at high pressure/low temperature.",
            "v_x² = c²/3 is an average over all molecules, not a single molecule's equality — one particle can travel mostly along one axis.",
            "c_rms is a root-mean-square, not the average speed — mean speed and most-probable speed are different numbers.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "lmvt-rolle" || derive.visualType === "ftc-calculus") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Geometric MVT: on [a,b] there is a c where the tangent is parallel to the secant, f'(c) = (f(b)−f(a))/(b−a).",
            "Rolle's corollary: equal endpoints force a horizontal tangent, f'(c)=0 — existence of a stationary point.",
            "FTC picture: F(x)=∫ₐˣ f(t)dt grows by f(c)·h over a thin strip, so dF/dx = f(x) — differentiation undoes integration.",
            "The slope–area bridge: the same curve describes instantaneous rate and accumulated area.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Existence proofs: a stationary point inside an interval with equal ends, or a matched instantaneous rate somewhere.",
            "Speeding/slowing arguments where the average over an interval equals a moment inside it.",
            "Justifying definite-integral evaluation via antiderivatives — the practical heart of integration.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Widen the interval: the secant slope changes and the matching point c shifts to keep f'(c) equal to it.",
            "At equal endpoints (Rolle): the secant flattens, so the tangent at c is horizontal.",
            "Raise the upper limit a little: the added area strip ≈ f(c)·h, so the rate-of-area IS the function height.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "MVT needs continuity on [a,b] and differentiability on (a,b) — a corner inside breaks it.",
            "Rolle needs f(a)=f(b); without that the secant is not horizontal and f'(c)=0 does not follow.",
            "FTC applies at a variable upper limit — differentiating ∫ₐᶜ f with a constant c gives 0, not f(x).",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "bohr-hydrogen-atom") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Quantised Bohr orbits: r_n = n²a₀, E_n = −13.6/n² eV, with angular momentum nh/2π.",
            "Transition energy: ΔE = Eₙ − Eₘ gives the photon wavelength via ΔE = hc/λ.",
            "The hydrogen spectrum series: Lyman, Balmer, Paschen from transitions ending at n=1,2,3.",
            "Radius–energy coupling: higher n means a larger, less-tightly-bound orbit and a smaller |E_n|.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Hydrogen spectral-line problems: given a transition, find the wavelength or the series.",
            "Bohr model limits: it works for hydrogen-like one-electron ions, not many-electron atoms.",
            "Conceptual questions: quantisation of angular momentum, stationary states, no radiation in an orbit.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Jump up a level: the orbit expands as n², the binding energy falls as 1/n², the electron sits farther out.",
            "Fall to a lower level: a photon is emitted with energy equal to the level gap — discrete lines, not a continuum.",
            "At n→∞: E→0, the electron is free — the ionisation threshold is 13.6 eV for hydrogen.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Bohr's model is for one-electron species only — it does not explain multi-electron spectra or intensities.",
            "Sign of E_n: bound states are negative; forgetting the minus sign scramble level-gap calculations.",
            "Transition direction: absorption lifts n, emission drops n — mix them and the photon energy sign flips.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }
  }

  if (derive.subject === "chemistry") {
    if (derive.visualType === "bohr-hydrogen-atom") {
      const theme = ICON_THEME.chemistry;
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Quantised orbits for hydrogen: r_n = n²a₀ and E_n = −13.6/n² eV, angular momentum nh/2π.",
            "Transition energy ΔE between levels gives the spectral-line photon via ΔE = hc/λ.",
            "Series structure: Lyman (to n=1), Balmer (to n=2), Paschen (to n=3) — where the electron lands sets the series.",
            "One-electron scope: the model explains hydrogen-like ions, not multi-electron atoms.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Spectral-line problems: identify the series, compute the wavelength from the level gap, or work backward to the levels.",
            "Ionisation energy: from E_n to 0 gives the per-level ionisation, 13.6 eV total from the ground state.",
            "Conceptual questions on quantisation, stationary states, and why orbiting electrons do not radiate in Bohr's picture.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Climb to higher n: the orbit expands as n², |E_n| falls as 1/n², the electron is less tightly held.",
            "Fall to a lower level: a photon is emitted with energy exactly equal to the gap — discrete lines, not a continuum.",
            "At n→∞: E→0, the electron is free; the 13.6 eV gap from n=1 is hydrogen's ionisation energy.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Bohr is a one-electron model — it fails for multi-electron spectra, intensities and fine structure.",
            "E_n is negative for bound states; dropping the minus sign corrupts level-gap and ionisation-energy arithmetic.",
            "Absorption lifts n, emission drops n — reversing the direction flips the photon-energy sign.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "schematic" && derive.coreFormula.includes("C =")) {
      const theme = ICON_THEME.chemistry;
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "Capacitance from geometry: C = ε₀A/d for a parallel-plate capacitor, rising K-fold with a dielectric.",
            "Field picture: between the plates E = σ/ε₀ = Q/(ε₀A); a dielectric reduces the field to E₀/K.",
            "Potential and charge: V = Ed, so C = Q/V = ε₀A/d; a dielectric drops V at fixed Q and raises C.",
            "Energy storage: U = ½CV² = Q²/(2C), residing in the field with density u = ½ε₀E².",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Parallel-plate capacitor problems: find C from A and d, or find the geometry from a given C.",
            "Dielectric insertion: fixed Q vs fixed V give opposite energy behaviour — the exam tells you which.",
            "Partial-dielectric slabs and series-gap combinations — the CEE favourite.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Increase A or decrease d: C grows — the geometric levers of capacitor design.",
            "Insert a dielectric with the battery connected: V fixed, C rises, so Q and U both rise — the battery supplies the extra.",
            "Insert with the battery disconnected: Q fixed, V drops, U falls — the slab is pulled inward by the field.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Use ε₀ for vacuum; ε only when a dielectric fills the gap — mixing them gives the wrong C.",
            "Fixed-Q and fixed-V reasoning give opposite energy changes; read the battery state before picking a form.",
            "A partially filled slab is a series combination of gaps — treat it as such, not as a single ε change.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }

    if (derive.visualType === "graph") {
      const theme = ICON_THEME.chemistry;
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "The shape of the plotted relationship and what the axes are telling you at every point.",
            "Slope and area reading where they matter — rate of change from the slope, accumulation from the area.",
            "The special-case limits: intercepts, asymptotes, and the conditions where the curve changes character.",
            "The conclusion the graph supports — the one-sentence takeaway the question is really after.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Rate-vs-extent, concentration-vs-time, and kinetic plots where the shape identifies the order or mechanism.",
            "Equilibrium and thermochemistry graphs where the plateau, intercept or slope carries the answer.",
            "Board questions asking 'what does this curve represent?' or 'read the value at this point'.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Drag along the curve: the reading changes smoothly until a special point — a plateau, intercept or bend — changes the interpretation.",
            "Compare two conditions on the same axes: the separation between the curves is the effect of the parameter you changed.",
            "Approach an asymptote: the quantity levels off or shoots, and the graph tells you which bound it meets.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Read the axes first — a graph without labelled quantities is a trap, not an answer.",
            "Slope and area apply only where they have a meaning for that particular plot — not every graph is a rate or accumulation.",
            "Special cases live at the ends and bends, not in the middle — check intercepts, asymptotes and plateaus.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }
  }

  if (derive.subject === "biology") {
    const theme = ICON_THEME.biology;
    if (derive.visualType === "schematic" || derive.visualType === "mechanism") {
      return [
        {
          icon: theme.icon,
          label: "What it gives",
          rows: [
            "The structure, cycle or mechanism shown in the diagram and what each labelled part does.",
            "The sequence or relationships the visual encodes — order of steps, direction of flow, key transitions.",
            "The conditions under which the mechanism holds, and the special cases that change it.",
            "The one-sentence biological takeaway: what the process achieves for the cell, organism or ecosystem.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Target,
          label: "Where it applies",
          rows: [
            "Board diagram questions: label the parts, state the function of each, and describe the sequence.",
            "Comparison questions between two mechanisms or two stages of the same process.",
            "Application questions: what changes if a step is blocked, accelerated or mutated.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: Activity,
          label: "What happens as you move",
          rows: [
            "Follow the flow in the diagram: the state changes step by step, and each transition has a trigger and a result.",
            "Vary a condition — substrate level, energy input, inhibitor presence — and watch which step or outcome shifts.",
            "Compare two scenarios side by side: the differences localise to specific stages or structures.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
        {
          icon: ShieldAlert,
          label: "Limits & traps",
          rows: [
            "Label the diagram against the question — the same structure can mean different things in different contexts.",
            "Sequence matters: an out-of-order step reverses the whole mechanism's logic.",
            "State the conditions: a mechanism described without its conditions is incomplete and easy to misapply.",
          ],
          accent: theme.accent,
          badge: theme.badge,
        },
      ];
    }
  }

  return [
    {
      icon: theme.icon,
      label: "What it gives",
      rows: derive.keyTakeaways.length ? derive.keyTakeaways.slice(0, 4) : [derive.statement],
      accent: theme.accent,
      badge: theme.badge,
    },
    {
      icon: Target,
      label: "Where it applies",
      rows: derive.solvedProblems.length
        ? derive.solvedProblems.slice(0, 3).map((p) => `${p.examBadge ?? "Board"}: ${p.question}`)
        : ["Syllabus unit work and board-exam practice in this topic."],
      accent: theme.accent,
      badge: theme.badge,
    },
    {
      icon: Activity,
      label: "What happens as you move",
      rows: derive.specialCases?.slice(0, 3).map((sc) => `${sc.name}: ${sc.condition}`)
        ?? ["Behaviour across the standard conditions of this topic."],
      accent: theme.accent,
      badge: theme.badge,
    },
    {
      icon: ShieldAlert,
      label: "Limits & traps",
      rows: derive.examTraps.length ? derive.examTraps : ["Common pitfalls and edge conditions for this topic."],
      accent: theme.accent,
      badge: theme.badge,
    },
  ];
}

export function ScienceBankColumns({ derivation }: ScienceBankColumnsProps) {
  const spec = columnsFor(derivation);

  const subjectKey = derivation.subject;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {spec.map((col, idx) => {
        const Icon = col.icon;
        const colKey = `${subjectKey}::${col.label}::${idx}`;
        return (
          <dl key={colKey} className={`rounded-2xl border border-border/70 bg-card p-4 shadow-sm ${col.badge.split(" ")[0]}`}>
            <div className="flex items-center gap-2 pb-2 border-b border-border/40">
              <Icon className={`h-4 w-4 ${col.accent}`} />
              <dt className="text-[11px] font-bold uppercase tracking-wider text-foreground">{col.label}</dt>
            </div>
            <div className="mt-3 space-y-2">
              {col.rows.map((row, i) => (
                <dd key={`${colKey}::${i}`} className="text-[11px] leading-relaxed text-muted-foreground">
                  {row}
                </dd>
              ))}
            </div>
          </dl>
        );
      })}
    </div>
  );
}
