/**
 * Derivations & Mathematical Theorems Data Bank
 *
 * Meticulously organized according to official NEB Grade 11 Syllabus (2076/2078):
 * - Mathematics: Mat. 007
 * - Physics: Phy. 101
 * - Chemistry: Che. 201
 * - Biology: Bio. 201
 *
 * Any topics belonging to Grade 12 or Entrance are designated as:
 * gradeTrack: "extra-grade-12", isExtra: true
 */

import { BIOLOGY_THEOREMS } from "@/lib/derivations-data-biology";
import { CHEMISTRY_THEOREMS } from "@/lib/derivations-data-chemistry";
import { MATH_THEOREMS } from "@/lib/derivations-data-math";
import { PHYSICS_WAVE1_DERIVATIONS, type SpecialCase } from "@/lib/derivations-wave1-physics";
import { PHYSICS_WAVE2A_DERIVATIONS } from "@/lib/derivations-wave2-physics-a";
import { PHYSICS_WAVE2B_DERIVATIONS } from "@/lib/derivations-wave2-physics-b";
import { PHYSICS_WAVE2C_DERIVATIONS } from "@/lib/derivations-wave2-physics-c";
import { CHEM_BIO_WAVE2_DERIVATIONS } from "@/lib/derivations-wave2-chem-bio";
import { MATH_WAVE2_DERIVATIONS } from "@/lib/derivations-wave2-math";
import { THEOREM_FILL_PHYSICS_1 } from "@/lib/theorem-fill-physics-1";
import { THEOREM_FILL_PHYSICS_2 } from "@/lib/theorem-fill-physics-2";
import { THEOREM_FILL_CHEM_1 } from "@/lib/theorem-fill-chem-1";
import { THEOREM_FILL_CHEM_1B } from "@/lib/theorem-fill-chem-2b";
import { THEOREM_FILL_CHEM_2 } from "@/lib/theorem-fill-chem-2";;
import { THEOREM_FILL_BIO_MATH } from "@/lib/theorem-fill-bio-math";
import { THEOREM_FILL_FINAL } from "@/lib/theorem-fill-final";

export type { SpecialCase };

export interface SolvedProblem {
  id: string;
  question: string;
  examBadge?: string; // e.g. "NEB 2080 Board", "NEB 2079", "CEE Entrance"
  given: string;
  stepByStep: string[];
  finalAnswer: string;
  visualType?: string;
  visualDescription?: string;
  tipOrTrap?: string;
}

export interface DerivationStep {
  stepNumber: number;
  title: string;
  latex: string;
  explanation: string;
}

export interface ConcernedTerm {
  term: string;
  symbol?: string;
  units?: string;
  definition: string;
}

export interface DerivationOrTheorem {
  id: string;
  slug: string;
  title: string;
  subject: "mathematics" | "physics" | "chemistry" | "biology";
  unit: string;
  unitId: string;
  gradeTrack: "grade-11" | "extra-grade-12";
  nebCode: string; // e.g. "Mat. 007", "Phy. 101", "Che. 201", "Bio. 201", "NEB Grade 12 Extra"
  isExtra: boolean;
  statement: string;
  coreFormula: string;
  concernedTerms: ConcernedTerm[];
  assumptions?: string[];
  proofSteps: DerivationStep[];
  conclusion: string;
  keyTakeaways: string[];
  examTraps: string[];
  visualType: string;
  solvedProblems: SolvedProblem[];
  /** Limiting/edge cases the board and CEE ask — rendered under Special Cases. */
  specialCases?: SpecialCase[];
}

export const DERIVATIONS_AND_THEOREMS: DerivationOrTheorem[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. NEB GRADE 11 MATHEMATICS (MAT. 007) - THEOREMS WITH VISUALS FIRST
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "math-perpendicular-distance",
    slug: "perpendicular-distance-point-to-line",
    title: "Length of Perpendicular from a Point to a Straight Line",
    subject: "mathematics",
    unit: "Analytic Geometry",
    unitId: "analytic-geometry",
    gradeTrack: "grade-11",
    nebCode: "Mat. 007 (Analytic Geometry)",
    isExtra: false,
    statement:
      "The length of the perpendicular segment p dropped from any point P(x₁, y₁) to the straight line L: Ax + By + C = 0 is given by p = |Ax₁ + By₁ + C| / √(A² + B²).",
    coreFormula: "p = \\frac{|Ax_1 + By_1 + C|}{\\sqrt{A^2 + B^2}}",
    concernedTerms: [
      {
        term: "Perpendicular Distance",
        symbol: "p",
        definition: "The shortest Euclidean distance from a point to a line along the normal direction.",
      },
      {
        term: "Intercepts on Axes",
        symbol: "a = -C/A, \\; b = -C/B",
        definition: "Points where line Ax + By + C = 0 intersects the X-axis at (-C/A, 0) and Y-axis at (0, -C/B).",
      },
      {
        term: "Area of Triangle Formula",
        symbol: "\\Delta",
        definition: "Area evaluated via vertex coordinates: ½ |x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)| = ½ × Base × Altitude.",
      },
    ],
    assumptions: ["A and B are not both zero (A² + B² ≠ 0). Line does not pass through P."],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Find the Coordinate Intercepts of the Line",
        latex: "Ax + By + C = 0 \\implies x\\text{-intercept } Q = \\left(-\\frac{C}{A}, 0\\right), \\quad y\\text{-intercept } R = \\left(0, -\\frac{C}{B}\\right)",
        explanation: "Set y = 0 to get point Q on the X-axis, and x = 0 to get point R on the Y-axis.",
      },
      {
        stepNumber: 2,
        title: "Calculate Base Length QR via the Distance Formula",
        latex: "QR = \\sqrt{\\left(0 - \\left(-\\frac{C}{A}\\right)\\right)^2 + \\left(-\\frac{C}{B} - 0\\right)^2} = \\sqrt{\\frac{C^2}{A^2} + \\frac{C^2}{B^2}} = \\frac{|C|\\sqrt{A^2 + B^2}}{|AB|}",
        explanation: "The line segment QR forms the base of triangle PQR.",
      },
      {
        stepNumber: 3,
        title: "Express Area of Triangle PQR in Terms of Base and Altitude",
        latex: "\\text{Area}(\\triangle PQR) = \\frac{1}{2} \\times \\text{Base } QR \\times \\text{Altitude } p = \\frac{1}{2} \\left(\\frac{|C|\\sqrt{A^2 + B^2}}{|AB|}\\right) p",
        explanation: "Here p is the perpendicular distance from point P(x₁, y₁) to base QR.",
      },
      {
        stepNumber: 4,
        title: "Calculate Area of Triangle PQR Using Coordinates",
        latex: "\\text{Area}(\\triangle PQR) = \\frac{1}{2}\\left| x_1\\left(0 - \\left(-\\frac{C}{B}\\right)\\right) + \\left(-\\frac{C}{A}\\right)\\left(-\\frac{C}{B} - y_1\\right) + 0\\left(y_1 - 0\\right) \\right| = \\frac{1}{2}\\frac{|C|}{|AB|}|Ax_1 + By_1 + C|",
        explanation: "Using the standard determinant formula for triangle area with vertices P(x₁, y₁), Q(-C/A, 0), and R(0, -C/B).",
      },
      {
        stepNumber: 5,
        title: "Equate Both Area Expressions and Solve for p (Q.E.D.)",
        latex: "\\frac{1}{2}\\frac{|C|\\sqrt{A^2 + B^2}}{|AB|} \\cdot p = \\frac{1}{2}\\frac{|C|}{|AB|}|Ax_1 + By_1 + C| \\implies p = \\frac{|Ax_1 + By_1 + C|}{\\sqrt{A^2 + B^2}}",
        explanation: "Canceling common factor ½ |C| / |AB| yields the canonical perpendicular distance theorem.",
      },
    ],
    conclusion: "The distance from origin (0, 0) is simply p = |C| / √(A² + B²).",
    keyTakeaways: [
      "Distance between two parallel lines Ax + By + C₁ = 0 and Ax + By + C₂ = 0 is d = |C₁ - C₂| / √(A² + B²).",
      "Sign of Ax₁ + By₁ + C indicates which side of the line point P lies on relative to the origin.",
    ],
    examTraps: [
      "❌ Forgetting to take the absolute value of the numerator. Distance is always a non-negative scalar quantity.",
    ],
    specialCases: [
      {
        name: "Distance between two parallel lines",
        condition: "Ax + By + C₁ = 0 and Ax + By + C₂ = 0 have identical A and B, so they are parallel",
        formula: "d = \\frac{|C_1 - C_2|}{\\sqrt{A^2 + B^2}}",
        meaning: "The x₁, y₁ terms cancel because the two lines share a common normal, leaving only the difference of constants over the same denominator.",
      },
      {
        name: "Distance from the origin to the line",
        condition: "The point is the origin, so x₁ = y₁ = 0",
        formula: "p = \\frac{|C|}{\\sqrt{A^2 + B^2}}",
        meaning: "This is the perpendicular form of the line ax + by = p in which p is itself the distance, and it is the quickest route for lines like 3x − 4y − 6 = 0.",
      },
      {
        name: "Point lying on the line",
        condition: "Substituting the point into the equation gives Ax₁ + By₁ + C = 0",
        formula: "p = 0",
        meaning: "Distance is a non-negative scalar, so a point on the line is zero units away — worth checking first, since it eliminates the whole calculation.",
      },
      {
        name: "Normalised equation makes p the distance directly",
        condition: "The equation is first divided through by √(A² + B²) so that A² + B² = 1",
        formula: "x\\cos\\alpha + y\\sin\\alpha = p \\quad \\text{with } p = |C|",
        meaning: "A unit normal vector turns the general form into normal form, where the right-hand side is the perpendicular distance itself with no square root left to evaluate.",
      },
      {
        name: "Distance from a point to a line through the origin",
        condition: "C = 0 because the line passes through the origin, e.g. y = 2x written as 2x − y = 0",
        formula: "p = \\frac{|2x_1 - y_1|}{\\sqrt{2^2 + (-1)^2}} = \\frac{|2x_1 - y_1|}{\\sqrt{5}}",
        meaning: "With the constant term gone the numerator is just the signed value of the linear form at the point, and the denominator reduces to √(1 + m²) for slope m.",
      },
      {
        name: "Midpoint of two parallel lines is an equidistant line",
        condition: "A third line is drawn halfway between Ax + By + C₁ = 0 and Ax + By + C₂ = 0",
        formula: "Ax + By + \\frac{C_1 + C_2}{2} = 0",
        meaning: "Equidistance from the two parallels is the definition of an angle bisector between them, and averaging the constants is the algebraic way to find it.",
      },
    ],

    visualType: "point-to-line-distance",
    solvedProblems: [
      {
        id: "p-dist-1",
        question: "Find the perpendicular distance from the point (2, 3) to the line 3x - 4y + 1 = 0.",
        examBadge: "NEB 2080 Board Exam",
        given: "(x₁, y₁) = (2, 3), A = 3, B = -4, C = 1",
        stepByStep: [
          "Identify parameters: A = 3, B = -4, C = 1, x₁ = 2, y₁ = 3.",
          "Compute numerator: |Ax₁ + By₁ + C| = |3(2) + (-4)(3) + 1| = |6 - 12 + 1| = |-5| = 5.",
          "Compute denominator: √(A² + B²) = √(3² + (-4)²) = √(9 + 16) = √25 = 5.",
          "Divide: p = 5 / 5 = 1 unit.",
        ],
        finalAnswer: "p = 1 \\text{ unit}",
        visualType: "point-to-line-distance",
        visualDescription: "Line 3x - 4y + 1 = 0 on Cartesian plane with normal line dropped from (2, 3) meeting at right angle at length 1.",
        tipOrTrap: "Always calculate denominator √(A² + B²) first to spot Pythagorean triples (3, 4, 5).",
      },
    ],
  },
  {
    id: "math-angle-pair-of-lines",
    slug: "angle-between-pair-of-lines-homogeneous",
    title: "Angle Between Pair of Straight Lines (Homogeneous Second Degree)",
    subject: "mathematics",
    unit: "Analytic Geometry",
    unitId: "analytic-geometry",
    gradeTrack: "grade-11",
    nebCode: "Mat. 007 (Analytic Geometry)",
    isExtra: false,
    statement:
      "The homogeneous second-degree equation ax² + 2hxy + by² = 0 represents a pair of straight lines passing through the origin. The acute angle θ between them is given by tan θ = 2√(h² - ab) / |a + b|. Lines are perpendicular if a + b = 0, and coincident if h² = ab.",
    coreFormula: "\\tan\\theta = \\pm\\frac{2\\sqrt{h^2 - ab}}{a + b}, \\quad \\text{Perpendicular: } a + b = 0, \\quad \\text{Coincident: } h^2 = ab",
    concernedTerms: [
      {
        term: "Homogeneous Equation",
        symbol: "ax^2 + 2hxy + by^2 = 0",
        definition: "An equation where every term has identical total degree (degree 2 in x and y).",
      },
      {
        term: "Sum & Product of Slopes",
        symbol: "m_1 + m_2 = -2h/b, \\; m_1 m_2 = a/b",
        definition: "Relations derived from the auxiliary quadratic equation in m: bm² + 2hm + a = 0.",
      },
      {
        term: "Condition for Perpendicularity",
        symbol: "a + b = 0",
        definition: "When lines are orthogonal (θ = 90°), tan 90° = ∞ ⟹ denominator a + b = 0.",
      },
    ],
    assumptions: ["b ≠ 0; h² ≥ ab for real distinct or coincident lines."],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Assume Two Lines Passing Through the Origin",
        latex: "y - m_1 x = 0 \\quad \\text{and} \\quad y - m_2 x = 0",
        explanation: "Any straight line passing through the origin has the form y = mx.",
      },
      {
        stepNumber: 2,
        title: "Combine Lines into a Single Joint Equation",
        latex: "(y - m_1 x)(y - m_2 x) = 0 \\implies m_1 m_2 x^2 - (m_1 + m_2)xy + y^2 = 0",
        explanation: "Multiplying the two linear factors together.",
      },
      {
        stepNumber: 3,
        title: "Divide Given Equation by b and Compare Coefficients",
        latex: "ax^2 + 2hxy + by^2 = 0 \\implies \\frac{a}{b}x^2 + \\frac{2h}{b}xy + y^2 = 0",
        explanation: "Dividing through by coefficient of y² (b ≠ 0).",
      },
      {
        stepNumber: 4,
        title: "Relate Slopes to Coefficients",
        latex: "m_1 + m_2 = -\\frac{2h}{b}, \\quad m_1 m_2 = \\frac{a}{b}",
        explanation: "Comparing with the expansion in Step 2.",
      },
      {
        stepNumber: 5,
        title: "Evaluate Difference of Slopes |m₁ - m₂|",
        latex: "(m_1 - m_2)^2 = (m_1 + m_2)^2 - 4m_1 m_2 = \\left(-\\frac{2h}{b}\\right)^2 - 4\\left(\\frac{a}{b}\\right) = \\frac{4h^2 - 4ab}{b^2} = \\frac{4(h^2 - ab)}{b^2}",
        explanation: "Algebraic identity relating difference of roots to sum and product.",
      },
      {
        stepNumber: 6,
        title: "Substitute into Tangent Angle Formula (Q.E.D.)",
        latex: "\\tan\\theta = \\pm\\frac{m_1 - m_2}{1 + m_1 m_2} = \\pm\\frac{\\frac{2\\sqrt{h^2 - ab}}{b}}{1 + \\frac{a}{b}} = \\pm\\frac{2\\sqrt{h^2 - ab}}{a + b}",
        explanation: "Multiplying numerator and denominator by b gives the canonical angle formula.",
      },
    ],
    conclusion: "Perpendicular lines condition: a + b = 0. Coincident lines condition: h² - ab = 0.",
    keyTakeaways: [
      "If a + b = 0, the sum of coefficients of x² and y² is zero, meaning lines are at 90°.",
      "If h² < ab, lines are imaginary with only real intersection point (0, 0).",
    ],
    examTraps: [
      "❌ Remember that h is HALF the coefficient of xy. In 2x² + 7xy + 3y² = 0, 2h = 7, so h = 7/2!",
    ],
    specialCases: [
      {
        name: "A real angle needs h² > ab",
        condition: "The pair is claimed to be two distinct real straight lines through the origin",
        formula: "h^2 - ab > 0",
        meaning: "This is the discriminant of the auxiliary quadratic bm² + 2hm + a = 0, so it decides whether the two lines are real and distinct, coincident, or imaginary.",
      },
      {
        name: "h² = ab gives a single repeated line",
        condition: "The discriminant of the auxiliary quadratic vanishes",
        formula: "h^2 = ab \\Rightarrow \\left(y - m_1 x\\right)^2 = 0",
        meaning: "The pair degenerates into one line of multiplicity two, so the 'angle between' is 0° and the tan θ expression is 0/0 rather than a real angle.",
      },
      {
        name: "h² < ab gives an imaginary pair",
        condition: "The discriminant of the auxiliary quadratic is negative",
        formula: "h^2 - ab < 0 \\Rightarrow \\tan\\theta \\text{ is not real}",
        meaning: "No real lines pass through the origin, and the algebra describes conjugate imaginary lines intersecting only at the origin.",
      },
      {
        name: "The 45° special case",
        condition: "The coefficients are such that 2√(h² − ab) equals a + b in magnitude",
        formula: "\\tan\\theta = 1 \\Rightarrow \\theta = 45^\\circ",
        meaning: "For 2x² + 7xy + 3y² = 0 the ratio works out to exactly 1, so the two lines through the origin are inclined at 45° — the board's favourite clean answer.",
      },
      {
        name: "Sign of a + b picks the supplementary angle",
        condition: "a + b is negative while h² > ab, so the tangent comes out negative",
        formula: "a + b < 0 \\Rightarrow \\tan\\theta < 0 \\Rightarrow \\theta > 90^\\circ",
        meaning: "The ± in the formula covers this: tan θ is negative for an obtuse pair, and the acute angle is recovered by taking the absolute value of the denominator.",
      },
    ],

    visualType: "pair-of-lines",
    solvedProblems: [
      {
        id: "p-pair-1",
        question: "Find the angle between the pair of straight lines given by 2x² + 7xy + 3y² = 0.",
        examBadge: "NEB 2079",
        given: "a = 2, 2h = 7 ⟹ h = 7/2, b = 3",
        stepByStep: [
          "Identify: a = 2, h = 7/2 = 3.5, b = 3.",
          "Compute h² - ab = (7/2)² - (2)(3) = 49/4 - 6 = (49 - 24) / 4 = 25/4.",
          "√(h² - ab) = √(25/4) = 5/2.",
          "Compute denominator: a + b = 2 + 3 = 5.",
          "tan θ = 2 × (5/2) / 5 = 5 / 5 = 1.",
          "θ = arctan(1) = 45° or π/4 radians.",
        ],
        finalAnswer: "\\theta = 45^\\circ \\; (\\pi/4)",
        visualType: "pair-of-lines",
        visualDescription: "Two distinct lines passing through origin at 45° angular separation.",
        tipOrTrap: "Always specify the acute angle by taking positive value of tan θ.",
      },
    ],
  },
  {
    id: "math-limit-sin-theta",
    slug: "limit-sin-theta-over-theta-squeeze-theorem",
    title: "Fundamental Trigonometric Limit: lim (sin θ / θ) = 1",
    subject: "mathematics",
    unit: "Calculus",
    unitId: "calculus",
    gradeTrack: "grade-11",
    nebCode: "Mat. 007 (Calculus)",
    isExtra: false,
    statement:
      "For angle θ measured strictly in radians, lim_{θ → 0} (sin θ / θ) = 1. Proved geometrically on the unit circle using the Squeeze / Sandwich Theorem.",
    coreFormula: "\\lim_{\\theta \\to 0} \\frac{\\sin\\theta}{\\theta} = 1, \\quad \\lim_{\\theta \\to 0} \\frac{\\tan\\theta}{\\theta} = 1",
    concernedTerms: [
      {
        term: "Radian Measure",
        symbol: "\\theta",
        definition: "Ratio of arc length to radius (s / r); required for limit to equal 1 (fails in degrees!).",
      },
      {
        term: "Squeeze / Sandwich Theorem",
        definition: "If g(θ) ≤ f(θ) ≤ h(θ) in an open interval around 0 and lim g(θ) = lim h(θ) = L, then lim f(θ) = L.",
      },
      {
        term: "Unit Circle Sectors",
        definition: "Comparison of Area(ΔOAC) < Area(Sector OAC) < Area(ΔOAT).",
      },
    ],
    assumptions: ["0 < θ < π/2 (radians); unit circle of radius r = 1."],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Construct Geometric Sector on Unit Circle (r = 1)",
        latex: "OA = OC = 1, \\quad \\angle AOC = \\theta \\text{ (radians)}",
        explanation: "Draw radius OA along x-axis and radius OC at angle θ. Draw tangent AT perpendicular to OA.",
      },
      {
        stepNumber: 2,
        title: "Express Areas of Three Enclosed Geometric Figures",
        latex: "\\text{Area}(\\triangle OAC) = \\frac{1}{2}r^2\\sin\\theta = \\frac{1}{2}\\sin\\theta",
        explanation: "Triangle inside the sector with base r = 1 and height sin θ.",
      },
      {
        stepNumber: 3,
        title: "Express Area of Circular Sector OAC",
        latex: "\\text{Area}(\\text{Sector } OAC) = \\frac{1}{2}r^2\\theta = \\frac{1}{2}\\theta",
        explanation: "Sector area formula where θ is measured strictly in radians.",
      },
      {
        stepNumber: 4,
        title: "Express Area of Outer Right Triangle OAT",
        latex: "\\text{Area}(\\triangle OAT) = \\frac{1}{2}(OA)(AT) = \\frac{1}{2}(1)(\\tan\\theta) = \\frac{1}{2}\\tan\\theta",
        explanation: "In right triangle OAT, AT = OA tan θ = tan θ.",
      },
      {
        stepNumber: 5,
        title: "Establish Geometric Area Inequality",
        latex: "\\text{Area}(\\triangle OAC) < \\text{Area}(\\text{Sector } OAC) < \\text{Area}(\\triangle OAT) \\implies \\frac{1}{2}\\sin\\theta < \\frac{1}{2}\\theta < \\frac{1}{2}\\tan\\theta",
        explanation: "The triangle is strictly contained within the sector, which is contained within the outer triangle.",
      },
      {
        stepNumber: 6,
        title: "Multiply by 2 and Divide by sin θ",
        latex: "\\sin\\theta < \\theta < \\frac{\\sin\\theta}{\\cos\\theta} \\implies 1 < \\frac{\\theta}{\\sin\\theta} < \\frac{1}{\\cos\\theta} \\implies 1 > \\frac{\\sin\\theta}{\\theta} > \\cos\\theta",
        explanation: "Taking reciprocals reverses the inequality signs.",
      },
      {
        stepNumber: 7,
        title: "Apply the Squeeze Theorem as θ → 0 (Q.E.D.)",
        latex: "\\lim_{\\theta \\to 0} 1 = 1, \\quad \\lim_{\\theta \\to 0} \\cos\\theta = 1 \\implies \\lim_{\\theta \\to 0} \\frac{\\sin\\theta}{\\theta} = 1",
        explanation: "Since sin θ / θ is trapped between 1 and cos θ (which approaches 1), its limit is identically 1.",
      },
    ],
    conclusion: "Essential prerequisite for deriving all trigonometric derivatives from first principles.",
    keyTakeaways: [
      "If angle is in degrees x°, limit is: lim_{x→0} (sin x° / x) = π/180.",
      "Consequence: lim_{θ→0} (1 - cos θ) / θ² = 1/2.",
    ],
    examTraps: [
      "❌ Applying L'Hôpital's rule to prove this theorem. That is circular reasoning because d/dx(sin x) = cos x relies ON this limit!",
    ],
    specialCases: [
      {
        name: "Degrees give π/180 instead of 1",
        condition: "The same limit is taken with the angle measured in degrees, sin x° / x",
        formula: "\\lim_{x \\to 0}\\frac{\\sin x^\\circ}{x} = \\frac{\\pi}{180} \\approx 0.01745",
        meaning: "The theorem only yields 1 in radians; in degrees the constant is π/180, which is the single most common error in this topic.",
      },
      {
        name: "The tangent limit follows from the same squeeze",
        condition: "Divide the inequality sin θ < θ < tan θ by sin θ and let θ → 0",
        formula: "\\lim_{\\theta\\to 0}\\frac{\\tan\\theta}{\\theta} = 1",
        meaning: "Because cos θ → 1, the ratio θ/sin θ is squeezed between 1 and sec θ, giving the tangent limit with no extra work — and hence d/dx(tan x) = sec²x.",
      },
      {
        name: "Deriving the (1 − cos θ)/θ² limit",
        condition: "Rewrite 1 − cos θ as 2 sin²(θ/2) and use the fundamental limit once",
        formula: "\\lim_{\\theta\\to 0}\\frac{1-\\cos\\theta}{\\theta^2} = \\frac{2\\cdot(\\theta/2)^2}{\\theta^2} = \\frac{1}{2}",
        meaning: "The famous 1/2 is not a new result but the basic limit applied at half the angle, which is how d/dx(cos x) = −sin x is obtained from first principles.",
      },
      {
        name: "The squeeze fails for sin θ/θ²",
        condition: "A function that is not squeezed between two finite bounds is chosen, e.g. sin θ/θ²",
        formula: "\\lim_{\\theta\\to 0}\\frac{\\sin\\theta}{\\theta^2} = \\infty",
        meaning: "Dividing by a quantity vanishing faster makes the limit diverge, so the sandwich theorem cannot produce a finite answer here — a good check on whether a manipulation is legitimate.",
      },
      {
        name: "Scaling inside the limit is free",
        condition: "A constant multiple ka is inserted in the numerator and denominator, e.g. sin 5x / tan 3x",
        formula: "\\lim_{x\\to 0}\\frac{\\sin 5x}{\\tan 3x} = \\frac{5}{3}\\lim_{x\\to 0}\\frac{\\sin 5x}{5x}\\cdot\\frac{3x}{\\tan 3x} = \\frac{5}{3}",
        meaning: "Every linear function of x has the same unit limit, so the answer is always the ratio of the coefficients — the standard first-derivative MCQ pattern.",
      },
    ],

    visualType: "limit-sin-x",
    solvedProblems: [
      {
        id: "p-lim-1",
        question: "Evaluate lim_{x → 0} (sin 5x) / (tan 3x).",
        examBadge: "NEB 2078",
        given: "lim_{x → 0} (sin 5x) / (tan 3x)",
        stepByStep: [
          "Rewrite as ratio: [ (sin 5x) / 5x × 5x ] / [ (tan 3x) / 3x × 3x ].",
          "Cancel x: [ (sin 5x / 5x) × 5 ] / [ (tan 3x / 3x) × 3 ].",
          "Apply limit theorems: (1 × 5) / (1 × 3) = 5/3.",
        ],
        finalAnswer: "5/3",
        visualType: "limit-sin-x",
        visualDescription: "Unit circle geometric squeeze showing area inequality bounding sin θ < θ < tan θ.",
        tipOrTrap: "Always multiply and divide by the respective coefficient arguments.",
      },
    ],
  },
  {
    id: "math-trapezoidal-rule",
    slug: "trapezoidal-rule-numerical-integration",
    title: "Numerical Integration: Trapezoidal Rule",
    subject: "mathematics",
    unit: "Computational Methods",
    unitId: "computational-methods-or-mechanics",
    gradeTrack: "grade-11",
    nebCode: "Mat. 007 (Computational Methods)",
    isExtra: false,
    statement:
      "Approximates the definite integral ∫ₐᵇ f(x) dx by dividing the interval [a, b] into n equal subintervals of width h = (b - a)/n and replacing the curve across each subinterval with straight chords forming trapezoids.",
    coreFormula: "\\int_{a}^{b} f(x)\\,dx \\approx \\frac{h}{2} \\left[ y_0 + 2(y_1 + y_2 + \\dots + y_{n-1}) + y_n \\right], \\quad h = \\frac{b - a}{n}",
    concernedTerms: [
      {
        term: "Step Size / Strip Width",
        symbol: "h = (b - a)/n",
        definition: "Uniform width of each trapezoidal segment along the horizontal interval.",
      },
      {
        term: "Ordinates",
        symbol: "y_i = f(x_i)",
        definition: "Function values evaluated at grid nodes x_i = a + i·h.",
      },
      {
        term: "Trapezoid Area",
        definition: "Area of a single strip: ½ h (y_i + y_{i+1}).",
      },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Partition the Interval [a, b] into n Subintervals",
        latex: "x_0 = a, \\; x_1 = a + h, \\; x_2 = a + 2h, \\; \\dots, \\; x_n = b, \\quad h = \\frac{b - a}{n}",
        explanation: "Creating n strips with (n + 1) ordinate heights y₀, y₁, ..., yₙ.",
      },
      {
        stepNumber: 2,
        title: "Approximate Area of the First Strip [x₀, x₁]",
        latex: "A_1 = \\int_{x_0}^{x_1} f(x)\\,dx \\approx \\frac{h}{2}(y_0 + y_1)",
        explanation: "Area of trapezoid = average of parallel sides times width.",
      },
      {
        stepNumber: 3,
        title: "Approximate Area of Remaining Strips",
        latex: "A_2 = \\frac{h}{2}(y_1 + y_2), \\quad A_3 = \\frac{h}{2}(y_2 + y_3), \\quad \\dots, \\quad A_n = \\frac{h}{2}(y_{n-1} + y_n)",
        explanation: "Applying the trapezoidal formula across each adjacent pair of ordinates.",
      },
      {
        stepNumber: 4,
        title: "Sum All Subinterval Areas (Q.E.D.)",
        latex: "\\int_{a}^{b} f(x)\\,dx = \\sum_{i=1}^n A_i \\approx \\frac{h}{2} [ (y_0 + y_1) + (y_1 + y_2) + \\dots + (y_{n-1} + y_n) ] = \\frac{h}{2} [ y_0 + 2(y_1 + y_2 + \\dots + y_{n-1}) + y_n ]",
        explanation: "End ordinates y₀ and yₙ appear once; every intermediate ordinate belongs to two adjacent trapezoids and is doubled.",
      },
    ],
    conclusion: "Trapezoidal rule is exact for linear functions (degree ≤ 1). Truncation error is proportional to h².",
    keyTakeaways: [
      "Rule: h/2 × [(First + Last) + 2 × (Sum of all intermediate ordinates)].",
      "Simpson's 1/3 rule fits parabolas instead of chords: h/3 × [(First + Last) + 4(Odd) + 2(Even)].",
    ],
    examTraps: [
      "❌ Confusing n (number of subintervals) with number of points (which is n + 1). If n = 4, there are 5 ordinates!",
    ],
    specialCases: [
      {
        name: "Exact for any straight line",
        condition: "f(x) is linear, so f″ = 0 identically on [a, b]",
        formula: "\\int_a^b f(x)\\,dx = \\frac{h}{2}\\left[y_0 + 2\\sum_{i=1}^{n-1} y_i + y_n\\right] \\quad \\text{exactly}",
        meaning: "A chord joining two points on a straight line lies along the line itself, so no area error arises — the trapezoidal rule is not merely an approximation for degree ≤ 1 polynomials.",
      },
      {
        name: "Concave-up curve gives a slight over-estimate",
        condition: "f″ > 0 on [a, b], e.g. f(x) = x² on [0, 1]",
        formula: "\\int_0^1 x^2 dx = \\tfrac{1}{3} \\quad < \\quad \\frac{1}{2}\\left[0 + 2\\left(\\tfrac{1}{4}\\right) + 1\\right] = \\tfrac{3}{4}",
        meaning: "For a bowl-shaped curve the chords sit above the arc, so the rule over-estimates; for a cap-shaped curve (f″ < 0) it under-estimates instead.",
      },
      {
        name: "Halving the step size quarters the error",
        condition: "The number of subintervals is doubled from n to 2n",
        formula: "h \\to \\frac{h}{2} \\Rightarrow |E| \\to \\frac{1}{4}|E|",
        meaning: "The error is proportional to h², so adding a few more ordinates buys a lot of accuracy — four times the work buys sixteen times the precision.",
      },
      {
        name: "One sub-interval is a single straight chord",
        condition: "n = 1, so h = b − a and no intermediate ordinates exist",
        formula: "\\int_a^b f(x)\\,dx \\approx \\frac{b-a}{2}\\left[f(a) + f(b)\\right]",
        meaning: "The formula degenerates to a one-strip trapezoid requiring only the two endpoint values, which is the crudest possible estimate.",
      },
      {
        name: "Simpson's rule needs an even n",
        condition: "A comparison with Simpson's 1/3 rule, which fits parabolas instead of chords",
        formula: "\\frac{h}{3}\\left[(y_0+y_n) + 4(y_1+y_3+\\cdots) + 2(y_2+y_4+\\cdots)\\right], \\quad n \\text{ even}",
        meaning: "Simpson is exact for cubics and needs an even number of strips, so the trapezoidal rule is the fallback when the data points give an odd count.",
      },
    ],

    visualType: "trapezoidal-rule",
    solvedProblems: [
      {
        id: "p-trap-1",
        question: "Evaluate ∫₁⁵ (1 / x) dx using the Trapezoidal rule with n = 4.",
        examBadge: "NEB 2080 Model",
        given: "f(x) = 1/x, a = 1, b = 5, n = 4",
        stepByStep: [
          "Compute step size: h = (5 - 1) / 4 = 4 / 4 = 1.",
          "Table of values: x₀ = 1 (y₀ = 1.000); x₁ = 2 (y₁ = 0.500); x₂ = 3 (y₂ = 0.333); x₃ = 4 (y₃ = 0.250); x₄ = 5 (y₄ = 0.200).",
          "Sum endpoints: y₀ + y₄ = 1.000 + 0.200 = 1.200.",
          "Sum intermediates: 2(y₁ + y₂ + y₃) = 2(0.500 + 0.333 + 0.250) = 2(1.083) = 2.166.",
          "Apply formula: (h / 2) [ (y₀ + y₄) + 2(y₁ + y₂ + y₃) ] = (1 / 2) [ 1.200 + 2.166 ] = 0.5 × 3.366 = 1.683.",
          "Exact value: ln(5) - ln(1) = ln(5) ≈ 1.609.",
        ],
        finalAnswer: "\\approx 1.683",
        visualType: "trapezoidal-rule",
        visualDescription: "Curve y = 1/x partitioned into 4 trapezoids with straight chord tops from x = 1 to 5.",
        tipOrTrap: "Keep at least 3-4 decimal places during intermediate ordinate calculations.",
      },
    ],
  },
  {
    id: "math-am-gm-hm",
    slug: "relation-between-am-gm-hm",
    title: "Inequality & Relation Between Arithmetic, Geometric & Harmonic Means",
    subject: "mathematics",
    unit: "Algebra",
    unitId: "algebra",
    gradeTrack: "grade-11",
    nebCode: "Mat. 007 (Algebra)",
    isExtra: false,
    statement:
      "For any two positive real numbers a and b: AM ≥ GM ≥ HM, and G² = AH. Equality holds if and only if a = b.",
    coreFormula: "AM \\ge GM \\ge HM, \\quad G^2 = A \\cdot H, \\quad A = \\frac{a+b}{2}, \\; G = \\sqrt{ab}, \\; H = \\frac{2ab}{a+b}",
    concernedTerms: [
      {
        term: "Arithmetic Mean",
        symbol: "A",
        definition: "A = (a + b) / 2.",
      },
      {
        term: "Geometric Mean",
        symbol: "G",
        definition: "G = √(ab).",
      },
      {
        term: "Harmonic Mean",
        symbol: "H",
        definition: "H = 2 / (1/a + 1/b) = 2ab / (a + b).",
      },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Prove G² = AH",
        latex: "A \\cdot H = \\left(\\frac{a + b}{2}\\right) \\left(\\frac{2ab}{a + b}\\right) = ab = (\\sqrt{ab})^2 = G^2",
        explanation: "Direct algebraic product confirms geometric mean squared equals product of arithmetic and harmonic means.",
      },
      {
        stepNumber: 2,
        title: "Prove AM - GM ≥ 0",
        latex: "A - G = \\frac{a + b}{2} - \\sqrt{ab} = \\frac{a - 2\\sqrt{ab} + b}{2} = \\frac{(\\sqrt{a} - \\sqrt{b})^2}{2}",
        explanation: "Expressing A - G as a perfect square.",
      },
      {
        stepNumber: 3,
        title: "Conclude AM ≥ GM",
        latex: "(\\sqrt{a} - \\sqrt{b})^2 \\ge 0 \\implies A - G \\ge 0 \\implies A \\ge G",
        explanation: "Square of any real quantity is non-negative.",
      },
      {
        stepNumber: 4,
        title: "Prove GM ≥ HM (Q.E.D.)",
        latex: "G - H = G - \\frac{G^2}{A} = G\\left(1 - \\frac{G}{A}\\right) = G\\left(\\frac{A - G}{A}\\right)",
        explanation: "Since A ≥ G and both A, G > 0, (A - G)/A ≥ 0. Hence G ≥ H, proving A ≥ G ≥ H.",
      },
    ],
    conclusion: "Arithmetic mean is greatest; harmonic mean is least. All three coincide when a = b.",
    keyTakeaways: [
      "A, G, H form a geometric progression with common ratio r = √(H/A).",
      "Useful in CEE minimum value optimizations: min(x + 1/x) = 2 by AM ≥ GM.",
    ],
    examTraps: [
      "❌ AM ≥ GM ≥ HM requires numbers to be POSITIVE. For negative numbers, geometric mean involves imaginary roots.",
    ],
    specialCases: [
      {
        name: "Minimum of x + 1/x from AM ≥ GM",
        condition: "The expression x + 1/x is minimised for x > 0",
        formula: "x + \\frac{1}{x} \\ge 2\\sqrt{x \\cdot \\frac{1}{x}} = 2",
        meaning: "The general trick behind most CEE minimum-value questions: split the expression into two positive terms whose product is constant, then apply AM ≥ GM.",
      },
      {
        name: "A, G, H are themselves in geometric progression",
        condition: "The three means of the same two numbers a, b > 0 are listed in order",
        formula: "\\frac{G}{A} = \\frac{H}{G} = \\sqrt{\\frac{H}{A}}",
        meaning: "Since G² = AH, the means form a GP with common ratio √(H/A), so AM and HM are the extreme terms of a geometric progression.",
      },
      {
        name: "Generalisation to n positive numbers",
        condition: "The inequality is extended from two numbers to a₁, a₂, …, aₙ > 0",
        formula: "\\frac{a_1 + a_2 + \\cdots + a_n}{n} \\ge (a_1 a_2 \\cdots a_n)^{1/n} \\ge \\frac{n}{\\frac{1}{a_1} + \\cdots + \\frac{1}{a_n}}",
        meaning: "The n-variable statement is the direct generalisation, with equality holding only when every aᵢ is identical.",
      },
      {
        name: "Ratios of successive means for extreme inputs",
        condition: "One of the two numbers becomes very large compared with the other, e.g. b → ∞",
        formula: "A \\to \\frac{b}{2}, \\quad G \\to \\sqrt{ab} \\to \\infty \\text{ more slowly}, \\quad H \\to 2a",
        meaning: "As the numbers separate the harmonic mean locks onto twice the smaller value while the geometric mean lags far behind the arithmetic mean, so the gap A − G becomes unbounded.",
      },
      {
        name: "Inequality between a sum and its reciprocal sum",
        condition: "A, G and H are combined to bound expressions such as a/b + b/a",
        formula: "\\frac{a}{b} + \\frac{b}{a} \\ge 2 \\quad \\text{(AM ≥ GM on } \\tfrac{a}{b}, \\tfrac{b}{a}\\text{)}",
        meaning: "The chain AM ≥ GM ≥ HM is used constantly in algebraic inequality proofs, always with the positivity of a and b stated first.",
      },
    ],

    visualType: "am-gm-hm",
    solvedProblems: [
      {
        id: "p-am-1",
        question: "Find the minimum value of 4x + 9/x for x > 0.",
        examBadge: "CEE Past MCQ",
        given: "4x and 9/x, x > 0",
        stepByStep: [
          "Apply AM ≥ GM to the two positive terms 4x and 9/x.",
          "AM = (4x + 9/x) / 2.",
          "GM = √(4x · 9/x) = √36 = 6.",
          "AM ≥ GM ⟹ (4x + 9/x) / 2 ≥ 6 ⟹ 4x + 9/x ≥ 12.",
        ],
        finalAnswer: "\\text{Minimum value} = 12 \\; (\\text{at } x = 1.5)",
        visualType: "am-gm-hm",
        visualDescription: "Semicircle construction showing diameter a+b with radius (AM), perpendicular chord (GM), and projection (HM).",
        tipOrTrap: "Minimum occurs when both terms are equal: 4x = 9/x ⟹ x² = 9/4 ⟹ x = 3/2.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. NEB GRADE 11 PHYSICS (PHY. 101) - OFFICIAL SYLLABUS DERIVATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "phys-projectile-motion",
    slug: "projectile-motion-kinematics",
    title: "Kinematics: Projectile Motion Trajectory, Time of Flight & Range",
    subject: "physics",
    unit: "Kinematics",
    unitId: "kinematics",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Kinematics)",
    isExtra: false,
    statement:
      "When a body is projected with initial velocity u at angle θ with the horizontal, its path is a parabolic trajectory: y = x tan θ - gx² / (2u² cos² θ).",
    coreFormula: "T = \\frac{2u\\sin\\theta}{g}, \\quad H = \\frac{u^2\\sin^2\\theta}{2g}, \\quad R = \\frac{u^2\\sin 2\\theta}{g}",
    concernedTerms: [
      { term: "Time of Flight", symbol: "T", units: "s", definition: "Duration projectile remains airborne: 2u sin θ / g." },
      { term: "Maximum Height", symbol: "H", units: "m", definition: "Highest elevation reached where v_y = 0: u² sin² θ / 2g." },
      { term: "Horizontal Range", symbol: "R", units: "m", definition: "Horizontal displacement on launch level: u² sin 2θ / g (max at θ = 45°)." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Resolve Initial Velocity",
        latex: "u_x = u\\cos\\theta, \\quad u_y = u\\sin\\theta, \\quad a_x = 0, \\quad a_y = -g",
        explanation: "Horizontal motion has uniform speed; vertical motion has uniform downward gravitational acceleration.",
      },
      {
        stepNumber: 2,
        title: "Derive Time of Flight",
        latex: "y = u_y t - \\frac{1}{2}gt^2 = 0 \\implies t\\left(u\\sin\\theta - \\frac{1}{2}gt\\right) = 0 \\implies T = \\frac{2u\\sin\\theta}{g}",
        explanation: "Total time until vertical displacement y returns to zero.",
      },
      {
        stepNumber: 3,
        title: "Derive Maximum Height",
        latex: "v_y^2 = u_y^2 - 2gH \\implies 0 = (u\\sin\\theta)^2 - 2gH \\implies H = \\frac{u^2\\sin^2\\theta}{2g}",
        explanation: "At highest point, instantaneous vertical velocity v_y = 0.",
      },
      {
        stepNumber: 4,
        title: "Derive Range and Trajectory Equation (Q.E.D.)",
        latex: "R = u_x T = \\frac{u^2\\sin 2\\theta}{g}, \\quad y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}",
        explanation: "Substituting t = x / (u cos θ) into y equation produces canonical inverted parabola.",
      },
    ],
    conclusion: "Trajectory is strictly parabolic; complementary angles θ and (90° - θ) give identical horizontal range.",
    keyTakeaways: [
      "At maximum height, total velocity is NOT zero; it is horizontal velocity v = u cos θ.",
      "Maximum range occurs at launch angle θ = 45°, where R_max = u² / g.",
    ],
    examTraps: [
      "❌ Setting velocity to zero at the peak. Kinetic energy at top is ½ m (u cos θ)² ≠ 0.",
    ],
    specialCases: [
      {
        name: "Straight-up throw at 90°",
        condition: "θ = 90°, so the launch is entirely vertical and uₓ = 0",
        formula: "R = 0, \\quad H = \\frac{u^2}{2g}, \\quad T = \\frac{2u}{g}",
        meaning: "The range collapses to zero because there is no horizontal component at all — the projectile simply rises and retraces its own path.",
      },
      {
        name: "Horizontal throw at 0°",
        condition: "θ = 0°, so u_y = 0 and the fall begins immediately",
        formula: "H = 0, \\quad T = 0, \\quad R = \\frac{u^2 \\sin 0^\\circ}{g} = 0",
        meaning: "Launched from ground level a horizontal throw has no airborne time at all; the same formulas only give a non-zero T when the launch is from a height h.",
      },
      {
        name: "Free fall is the same parabola at 90°",
        condition: "A body is dropped from rest, equivalent to u = 0 with any θ",
        formula: "T = \\sqrt{\\frac{2h}{g}}, \\quad H = h = \\frac{1}{2}gT^2",
        meaning: "Setting u = 0 collapses T and R to zero while H reproduces the standard kinematic result — the parabolic trajectory of a dropped body has a degenerate vertex.",
      },
      {
        name: "Three mutually perpendicular throws",
        condition: "The same speed u is launched at θ, then θ + 120° and θ + 240° from the same point",
        formula: "\\text{Sum of ranges} = \\frac{u^2}{g}\\left[\\sin 2\\theta + \\sin(2\\theta + 240^\\circ) + \\sin(2\\theta + 480^\\circ)\\right] = 0",
        meaning: "The three sin 2θ values are 120° apart and sum to zero, so the three landing points form an equilateral triangle — a favourite CEE projectile question.",
      },
      {
        name: "Projectile landing at the foot of a cliff",
        condition: "Launch and landing levels differ by h, e.g. a ball thrown from a cliff top",
        formula: "y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta} - h",
        meaning: "Replacing the launch point by the origin in the trajectory equation adds a constant offset −h; time of flight grows beyond 2u sin θ/g.",
      },
    ],

    visualType: "projectile-motion",
    solvedProblems: [
      {
        id: "p-proj-neb-1",
        question: "A ball is thrown with a speed of 20 m/s at an angle of 30° with the horizontal. Find its time of flight and horizontal range. (g = 10 m/s²)",
        examBadge: "NEB 2079",
        given: "u = 20 m/s, θ = 30°, g = 10 m/s²",
        stepByStep: [
          "Time of flight: T = 2u sin θ / g = 2(20)(sin 30°) / 10 = 40(0.5) / 10 = 2 s.",
          "Range: R = u² sin 2θ / g = (20)² sin(60°) / 10 = 400(0.866) / 10 = 34.64 m.",
        ],
        finalAnswer: "T = 2 \\text{ s}, \\quad R = 34.64 \\text{ m}",
        visualType: "projectile-motion",
        visualDescription: "Parabolic trajectory showing 2 second duration and 34.64 m landing distance.",
        tipOrTrap: "Remember sin 60° = √3/2 ≈ 0.866.",
      },
    ],
  },
  {
    id: "phys-banking-of-roads",
    slug: "banking-of-roads-circular-motion",
    title: "Circular Motion: Banking of Roads & Safe Speeds",
    subject: "physics",
    unit: "Circular Motion",
    unitId: "circular-motion",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Circular Motion)",
    isExtra: false,
    statement:
      "Raising the outer edge of a curved track at angle θ ensures that the horizontal component of normal reaction N sin θ provides the necessary centripetal force mv²/r, preventing reliance on tire friction.",
    coreFormula: "\\tan\\theta = \\frac{v^2}{rg}, \\quad v_{\\text{opt}} = \\sqrt{rg\\tan\\theta}",
    concernedTerms: [
      { term: "Banking Angle", symbol: "\\theta", definition: "Inclination angle of outer edge above horizontal." },
      { term: "Optimum Speed", symbol: "v_{opt}", units: "m/s", definition: "Speed where normal reaction alone prevents skidding with zero friction." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Resolve Normal Reaction into Orthogonal Components",
        latex: "N\\cos\\theta = mg \\quad (1), \\quad N\\sin\\theta = \\frac{mv^2}{r} \\quad (2)",
        explanation: "Vertical balance prevents sinking; horizontal component drives centripetal acceleration.",
      },
      {
        stepNumber: 2,
        title: "Divide (2) by (1) to eliminate N (Q.E.D.)",
        latex: "\\frac{N\\sin\\theta}{N\\cos\\theta} = \\frac{mv^2/r}{mg} \\implies \\tan\\theta = \\frac{v^2}{rg} \\implies v = \\sqrt{rg\\tan\\theta}",
        explanation: "Relates curvature radius r, gravity g, and vehicle velocity to required tilt angle.",
      },
    ],
    conclusion: "Angle of banking depends on design velocity and turn radius, completely independent of vehicle mass.",
    keyTakeaways: ["Bicycle rider leans inward at angle tan θ = v² / (rg) to create identical torque balance."],
    examTraps: ["❌ Banking angle does NOT depend on vehicle mass; heavy trucks and light cars share the same design angle."],
    specialCases: [
      {
        name: "Vehicle at rest on the banked curve",
        condition: "v = 0, so no centripetal force is needed",
        formula: "\\tan\\theta = \\frac{0}{rg} = 0 \\Rightarrow \\theta = 0",
        meaning: "A parked car on a banked track needs no friction to stay put; N cos θ = mg alone holds it, which is why banked curves are safe even when empty.",
      },
      {
        name: "Friction on an unbanked curve",
        condition: "A level road is traversed at speed v with no banking, θ = 0",
        formula: "f = \\frac{mv^2}{r} \\le \\mu mg \\Rightarrow v_{\\max} = \\sqrt{\\mu rg}",
        meaning: "Setting θ = 0 in the friction-inclusive equation gives the everyday limit for an ordinary road bend, and shows the √(μrg) speed scaling.",
      },
      {
        name: "Maximum safe speed with friction on a banked curve",
        condition: "The car tends to skid up the slope, so friction acts down the bank at its limiting value",
        formula: "v_{\\max} = \\sqrt{rg\\left(\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\right)}",
        meaning: "Friction extends the safe speed above the frictionless design value; the expression fails for μ tan θ ≥ 1, where no finite limit exists.",
      },
      {
        name: "Minimum safe speed with friction on a banked curve",
        condition: "The car tends to slide down the bank, so friction acts up the slope at its limiting value",
        formula: "v_{\\min} = \\sqrt{rg\\left(\\frac{\\tan\\theta - \\mu}{1 + \\mu\\tan\\theta}\\right)}",
        meaning: "Between v_min and v_max a stationary car will not roll down the bank; the safe resting window is what the bank angle is designed around.",
      },
      {
        name: "A raised outer edge on a level curve is unphysical",
        condition: "The banking is attempted with zero speed on a perfectly horizontal curve",
        formula: "\\theta > 0, \\ v = 0 \\Rightarrow N\\sin\\theta \\neq 0",
        meaning: "With no centripetal demand the horizontal component of N has nothing to balance, so a banked curve always needs a minimum design speed to be stable.",
      },
    ],

    visualType: "banked-road",
    solvedProblems: [
      {
        id: "p-bank-neb-1",
        question: "Find the angle of banking of a railway track of radius 600 m for a train moving at 54 km/h. (g = 10 m/s²)",
        examBadge: "NEB 2078",
        given: "r = 600 m, v = 54 km/h = 15 m/s, g = 10 m/s²",
        stepByStep: [
          "Convert speed: v = 54 × (5/18) = 15 m/s.",
          "Apply formula: tan θ = v² / (rg) = 15² / (600 × 10) = 225 / 6000 = 0.0375.",
          "θ = arctan(0.0375) ≈ 2.15°.",
        ],
        finalAnswer: "\\theta \\approx 2.15^\\circ",
        visualType: "banked-road",
        visualDescription: "Inclined track cross-section showing normal reaction resolving into weight and centripetal components.",
        tipOrTrap: "Always convert speed to m/s first.",
      },
    ],
  },
  {
    id: "phys-kinetic-gas-pressure",
    slug: "kinetic-gas-theory-pressure-derivation",
    title: "Ideal Gas: Kinetic Theory Pressure Derivation (P = ⅓ ρ c_rms²)",
    subject: "physics",
    unit: "Ideal Gas",
    unitId: "ideal-gas",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Ideal Gas)",
    isExtra: false,
    statement:
      "Pressure exerted by an ideal gas on container walls arises from elastic molecular collisions: P = ⅓ (mN/V) c_rms² = ⅓ ρ c_rms².",
    coreFormula: "P = \\frac{1}{3}\\rho c_{\\text{rms}}^2 = \\frac{1}{3}\\frac{mN}{V}c_{\\text{rms}}^2, \\quad E_k = \\frac{3}{2}k_B T",
    concernedTerms: [
      { term: "Root Mean Square Speed", symbol: "c_{rms}", units: "m/s", definition: "Square root of the average of squared molecular velocities: √(3k_B T / m)." },
      { term: "Number Density", symbol: "N / V", units: "m⁻³", definition: "Total gas molecules N per unit volume V." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Consider Elastic Collision of Single Molecule of Mass m",
        latex: "\\Delta p_x = m(-c_{1x}) - m(c_{1x}) = -2m c_{1x}",
        explanation: "Momentum delivered to right-hand wall upon each elastic impact is +2m c_1x.",
      },
      {
        stepNumber: 2,
        title: "Calculate Time Between Successive Collisions on Same Wall",
        latex: "\\Delta t = \\frac{2L}{c_{1x}} \\implies \\text{Force } F_1 = \\frac{\\Delta p_x}{\\Delta t} = \\frac{2m c_{1x}}{2L / c_{1x}} = \\frac{m c_{1x}^2}{L}",
        explanation: "Molecule travels distance 2L between impacts on the wall of a cubical box of side L.",
      },
      {
        stepNumber: 3,
        title: "Sum Over All N Molecules and Average Velocity Components",
        latex: "F_x = \\frac{m}{L}\\sum_{i=1}^N c_{ix}^2 = \\frac{mN}{L}\\overline{c_x^2}",
        explanation: "Total force is sum of forces exerted by all N molecules.",
      },
      {
        stepNumber: 4,
        title: "Apply Isotropic Velocity Distribution",
        latex: "\\overline{c^2} = \\overline{c_x^2} + \\overline{c_y^2} + \\overline{c_z^2} = 3\\overline{c_x^2} \\implies \\overline{c_x^2} = \\frac{1}{3}\\overline{c^2} = \\frac{1}{3}c_{\\text{rms}}^2",
        explanation: "Due to random motion, average velocities in x, y, z directions are identical.",
      },
      {
        stepNumber: 5,
        title: "Compute Pressure on Wall Area A = L² (Q.E.D.)",
        latex: "P = \\frac{F_x}{L^2} = \\frac{mN \\cdot \\frac{1}{3}c_{\\text{rms}}^2}{L \\cdot L^2} = \\frac{1}{3}\\frac{mN}{V}c_{\\text{rms}}^2 = \\frac{1}{3}\\rho c_{\\text{rms}}^2",
        explanation: "Volume of cube is V = L³. Proves kinetic gas pressure formula.",
      },
    ],
    conclusion: "Translational kinetic energy of gas molecules is directly proportional to absolute temperature: E_k = 3/2 k_B T.",
    keyTakeaways: [
      "c_rms = √(3RT / M); doubling absolute temperature increases rms speed by √2 ≈ 1.414.",
    ],
    examTraps: ["❌ Forgetting the 1/3 factor. It arises strictly because motion is distributed across three spatial dimensions."],
    specialCases: [
      {
        name: "Heavier molecules move slower at the same temperature",
        condition: "Two gases at one temperature are compared, e.g. O₂ (32 g/mol) and H₂ (2 g/mol)",
        formula: "\\frac{c_{\\text{rms,O}_2}}{c_{\\text{rms,H}_2}} = \\sqrt{\\frac{2}{32}} = \\frac{1}{4}",
        meaning: "Because c_rms ∝ 1/√M, oxygen molecules travel four times slower than hydrogen at 27 °C — the reason heavy gases effuse more slowly than light ones.",
      },
      {
        name: "Halving the number density halves the pressure",
        condition: "The same gas is expanded to twice the volume at constant T",
        formula: "\\frac{N}{V} \\to \\frac{1}{2}\\frac{N}{V} \\Rightarrow P \\to \\frac{1}{2}P",
        meaning: "Since c_rms² is unchanged at constant temperature, the pressure tracks the number density directly — pressure is nothing more than collision rate per unit area.",
      },
      {
        name: "Monatomic gas has only translational energy",
        condition: "Helium or argon, with no rotation or vibration in the molecule",
        formula: "E = \\frac{3}{2}RT \\; \\text{per mole}",
        meaning: "The 3/2 arises purely from three translational degrees of freedom; monatomic gases have C_V = 3R/2 and γ = 5/3, the largest γ of any gas.",
      },
      {
        name: "Diatomic and polyatomic gases add internal modes",
        condition: "Rotational and vibrational degrees of freedom become active at ordinary temperatures",
        formula: "\\text{O}_2:\\ E = \\frac{5}{2}RT, \\qquad \\text{CO}_2:\\ E = \\frac{7}{2}RT",
        meaning: "The pressure formula P = ⅓ρc_rms² is unaffected, but the total molar heat capacity is not 3R/2 once rotation and vibration contribute.",
      },
      {
        name: "The same pressure at higher temperature needs fewer molecules",
        condition: "P and V are held fixed while T is raised",
        formula: "P = \\frac{1}{3}\\frac{mN}{V}\\cdot\\frac{3RT}{M} = \\frac{N}{V}RT \\Rightarrow \\frac{N}{V} \\propto \\frac{1}{T}",
        meaning: "This substitution recovers the ideal gas law PV = nRT, proving the kinetic derivation and the thermodynamic one describe the same physics.",
      },
    ],

    visualType: "kinetic-gas-pressure",
    solvedProblems: [
      {
        id: "p-gas-1",
        question: "Calculate the rms speed of oxygen molecules at 27°C (molar mass of O₂ = 32 g/mol, R = 8.314 J/mol·K).",
        examBadge: "NEB 2080",
        given: "T = 27°C = 300 K, M = 0.032 kg/mol",
        stepByStep: [
          "Formula: c_rms = √(3RT / M).",
          "Substitute: c_rms = √[ (3 × 8.314 × 300) / 0.032 ] = √[ 7482.6 / 0.032 ] = √233831.25 ≈ 483.56 m/s.",
        ],
        finalAnswer: "c_{\\text{rms}} \\approx 483.6 \\text{ m/s}",
        visualType: "kinetic-gas-pressure",
        visualDescription: "Cubical chamber showing random molecular velocities and elastic collisions on boundary walls.",
        tipOrTrap: "Convert molar mass to kg/mol (32 g/mol = 0.032 kg/mol) to get velocity in m/s.",
      },
    ],
  },
  {
    id: "phys-lens-makers",
    slug: "lens-makers-formula-refraction",
    title: "Lenses: Lens Maker's Formula & Thin Lens Law",
    subject: "physics",
    unit: "Lenses",
    unitId: "lenses",
    gradeTrack: "grade-11",
    nebCode: "Phy. 101 (Lenses)",
    isExtra: false,
    statement:
      "Relates the focal length f of a thin lens to the refractive index μ of its material and radii of curvature R₁ and R₂ of its two spherical refracting interfaces: 1/f = (μ - 1)(1/R₁ - 1/R₂).",
    coreFormula: "\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
    concernedTerms: [
      { term: "Refractive Index", symbol: "\\mu", definition: "Ratio of lens material refractive index to surrounding medium." },
      { term: "Radii of Curvature", symbol: "R_1, R_2", units: "m", definition: "Curvature radii of first and second refracting surfaces." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Refraction at First Spherical Surface (Radius R₁)",
        latex: "\\frac{\\mu}{v_1} - \\frac{1}{u} = \\frac{\\mu - 1}{R_1} \\quad (1)",
        explanation: "Object at u refracts into lens forming intermediate image at v₁.",
      },
      {
        stepNumber: 2,
        title: "Refraction at Second Spherical Surface (Radius R₂)",
        latex: "\\frac{1}{v} - \\frac{\\mu}{v_1} = \\frac{1 - \\mu}{R_2} = -\\frac{\\mu - 1}{R_2} \\quad (2)",
        explanation: "Intermediate image acts as virtual object refracting out of lens.",
      },
      {
        stepNumber: 3,
        title: "Add Equations (1) and (2) (Q.E.D.)",
        latex: "\\frac{1}{v} - \\frac{1}{u} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right) \\implies \\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
        explanation: "Intermediate term μ/v₁ cancels, and 1/v - 1/u = 1/f by definition.",
      },
    ],
    conclusion: "Immersing a glass lens in water quadruples its focal length.",
    keyTakeaways: ["For equiconvex lens: R₁ = +R, R₂ = -R ⟹ 1/f = 2(μ - 1)/R."],
    examTraps: ["❌ Sign convention: R₂ is NEGATIVE for convex lens; subtracting negative gives positive addition!"],
    specialCases: [
      {
        name: "Plano-convex lens has one flat surface",
        condition: "R₂ → ∞, so the term 1/R₂ vanishes from the lens-maker equation",
        formula: "\\frac{1}{f} = (\\mu - 1)\\frac{1}{R_1}",
        meaning: "A flat face contributes no refraction, so the power is exactly half that of an equiconvex lens of the same radius — the plano-convex lens is the usual achromat component.",
      },
      {
        name: "Lens power is quoted in dioptres",
        condition: "The focal length from the lens-maker formula is expressed in metres",
        formula: "P = \\frac{1}{f(\\text{m})} \\quad \\text{dioptre} \\; (D)",
        meaning: "A +20 cm convex lens has P = +5 D and a −50 cm concave lens P = −2 D; the sign convention of the optometrist's prescription is the sign of f itself.",
      },
      {
        name: "Immersing the lens in water lengthens f",
        condition: "The lens sits in water of refractive index 1.33 instead of air",
        formula: "\\frac{1}{f_w} = \\left(\\frac{1.5}{1.33} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
        meaning: "Only the relative index μ_rel matters, so the power drops by roughly a quarter and the focal length becomes about four times longer — a swimming-pool lens looks weak for this reason.",
      },
      {
        name: "A lens of refractive index 1 has no power at all",
        condition: "μ is exactly 1, so the factor (μ − 1) vanishes",
        formula: "\\mu = 1 \\Rightarrow \\frac{1}{f} = 0 \\Rightarrow f = \\infty",
        meaning: "A medium optically identical to the surroundings cannot bend light at all; the lens formula degenerates gracefully rather than failing.",
      },
      {
        name: "Equal radii of crown glass give f = R",
        condition: "Equiconvex lens of crown glass with μ = 1.5 and R₁ = +R, R₂ = −R",
        formula: "\\frac{1}{f} = (1.5-1)\\left(\\frac{1}{R} + \\frac{1}{R}\\right) = \\frac{2(0.5)}{R} = \\frac{1}{R} \\Rightarrow f = R",
        meaning: "Since 2(μ − 1) = 1 for ordinary glass, an equiconvex lens has a focal length numerically equal to its radius of curvature — 20 cm radius gives a 20 cm lens.",
      },
    ],

    visualType: "lens-makers",
    solvedProblems: [
      {
        id: "p-lens-neb-1",
        question: "An equiconvex glass lens (μ = 1.5) has radius of curvature 20 cm. Find its focal length in air.",
        examBadge: "NEB 2079",
        given: "μ = 1.5, R₁ = +20 cm, R₂ = -20 cm",
        stepByStep: [
          "1/f = (1.5 - 1)(1/20 - (-1/20)) = 0.5 × (2/20) = 0.5 / 10 = 1/20.",
          "f = +20 cm.",
        ],
        finalAnswer: "f = +20 \\text{ cm}",
        visualType: "lens-makers",
        visualDescription: "Biconvex lens ray trace showing focus at 20 cm.",
        tipOrTrap: "Equiconvex glass lens has focal length equal to its radius of curvature in air.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. NEB GRADE 11 CHEMISTRY (CHE. 201) - OFFICIAL SYLLABUS DERIVATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "chem-bohr-hydrogen",
    slug: "bohr-atomic-model-radius-energy",
    title: "Atomic Structure: Bohr's Model Radius & Energy of Hydrogen Electron",
    subject: "chemistry",
    unit: "Atomic Structure",
    unitId: "atomic-structure",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Atomic Structure)",
    isExtra: false,
    statement:
      "Bohr quantized angular momentum mvr = nh / (2π). The orbital radius of the n-th electron orbit in hydrogen is r_n = 0.529 n² / Z Å, and its total energy is E_n = -13.6 Z² / n² eV.",
    coreFormula: "r_n = \\frac{n^2 h^2 \\varepsilon_0}{\\pi m e^2 Z} = 0.529 \\frac{n^2}{Z} \\text{ \\AA}, \\quad E_n = -\\frac{13.6 Z^2}{n^2} \\text{ eV}",
    concernedTerms: [
      { term: "Quantized Angular Momentum", symbol: "mvr = \\frac{nh}{2\\pi}", definition: "Electrons orbit only in stationary non-radiating states." },
      { term: "Electrostatic Centripetal Force", symbol: "\\frac{Z e^2}{4\\pi\\varepsilon_0 r^2}", definition: "Coulomb attraction between nucleus (+Ze) and electron (-e) provides centripetal acceleration mv²/r." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Equate Electrostatic Attraction to Centripetal Force",
        latex: "\\frac{m v^2}{r} = \\frac{Z e^2}{4\\pi\\varepsilon_0 r^2} \\implies m v^2 r = \\frac{Z e^2}{4\\pi\\varepsilon_0} \\quad (1)",
        explanation: "Newtonian mechanical equilibrium of orbiting electron.",
      },
      {
        stepNumber: 2,
        title: "Apply Bohr's Angular Momentum Quantization Postulate",
        latex: "m v r = \\frac{n h}{2\\pi} \\implies v = \\frac{n h}{2\\pi m r} \\quad (2)",
        explanation: "n is the principal quantum number (n = 1, 2, 3...).",
      },
      {
        stepNumber: 3,
        title: "Substitute v into Force Balance to solve for Radius r_n",
        latex: "m\\left(\\frac{n h}{2\\pi m r}\\right)^2 r = \\frac{Z e^2}{4\\pi\\varepsilon_0} \\implies r_n = \\frac{n^2 h^2 \\varepsilon_0}{\\pi m e^2 Z}",
        explanation: "For n = 1, Z = 1 (Bohr radius): r₁ = 0.529 × 10⁻¹⁰ m = 0.529 Å.",
      },
      {
        stepNumber: 4,
        title: "Calculate Total Orbital Energy E = K + U (Q.E.D.)",
        latex: "K = \\frac{1}{2}m v^2 = \\frac{Z e^2}{8\\pi\\varepsilon_0 r}, \\quad U = -\\frac{Z e^2}{4\\pi\\varepsilon_0 r} \\implies E_n = K + U = -\\frac{Z e^2}{8\\pi\\varepsilon_0 r_n} = -\\frac{13.6 Z^2}{n^2} \\text{ eV}",
        explanation: "Negative sign indicates bound electron state requiring energy input for ionization.",
      },
    ],
    conclusion: "Energy levels are discrete and negative; as n increases, energy approaches 0 (ionization limit).",
    keyTakeaways: [
      "Rydberg formula: 1/λ = R_H Z² (1/n₁² - 1/n₂²), where R_H = 1.097 × 10⁷ m⁻¹.",
      "Lyman series (n₁ = 1) falls in UV; Balmer (n₁ = 2) falls in Visible; Paschen (n₁ = 3) in IR.",
    ],
    examTraps: ["❌ Radius is proportional to n²; energy is proportional to 1/n²!"],
    specialCases: [
      {
        name: "n = 1, Z = 1 is the Bohr atom",
        condition: "A hydrogen atom in its ground state",
        formula: "r_1 = 0.529\\ \\text{\\AA}, \\quad E_1 = -13.6\\ \\text{eV}",
        meaning: "This single pair of numbers fixes the size and ionisation energy of the simplest atom, and both are pure experimental constants.",
      },
      {
        name: "Hydrogen-like ions scale with Z",
        condition: "He⁺, Li²⁺ or any one-electron ion with nuclear charge +Ze",
        formula: "r_n = 0.529\\frac{n^2}{Z}\\ \\text{\\AA}, \\quad E_n = -13.6\\frac{Z^2}{n^2}\\ \\text{eV}",
        meaning: "The radius shrinks as 1/Z while the energy deepens as Z², so He⁺ has half the radius of hydrogen but four times the binding energy at the same n.",
      },
      {
        name: "The ionisation limit is n going to infinity",
        condition: "The electron is given enough energy to escape the nucleus entirely",
        formula: "\\lim_{n \\to \\infty} r_n = \\infty, \\quad \\lim_{n \\to \\infty} E_n = 0",
        meaning: "Energy accumulates at 0 eV, which is why the visible Balmer lines crowd together near the series limit instead of running off to infinity.",
      },
      {
        name: "Level spacing shrinks as n grows",
        condition: "Successive levels near the top of the orbit ladder are compared, e.g. n = 5 and n = 6",
        formula: "\\Delta E = 13.6\\left(\\frac{1}{n^2} - \\frac{1}{(n+1)^2}\\right) \\approx \\frac{27.2}{n^3}\\ \\text{eV}",
        meaning: "The gap falls off as 1/n³, which is exactly why a hot dense gas produces a continuous spectrum instead of resolved hydrogen lines.",
      },
      {
        name: "Rydberg frequency for a given transition",
        condition: "An electron falls from n₂ to n₁, emitting one photon",
        formula: "\\frac{1}{\\lambda} = R_H Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right), \\quad R_H = 1.097\\times10^7\\ \\text{m}^{-1}",
        meaning: "Every spectral line of hydrogen-like species is fixed by this one expression; only the region of the spectrum changes with n₁.",
      },
      {
        name: "Zero radius and infinite energy are both impossible",
        condition: "The limit n → 0 is examined, which has no physical meaning",
        formula: "n = 0 \\text{ has no meaning; } n \\text{ starts at } 1",
        meaning: "The n² and 1/n² laws are only meaningful for positive integer n; the ground state is n = 1 and the electron never collapses into the nucleus.",
      },
    ],

    visualType: "bohr-hydrogen-atom",
    solvedProblems: [
      {
        id: "p-bohr-1",
        question: "Calculate the energy required to excite an electron from ground state (n=1) to first excited state (n=2) in hydrogen.",
        examBadge: "NEB 2080 / CEE",
        given: "E_n = -13.6 / n² eV",
        stepByStep: [
          "E₁ = -13.6 / 1² = -13.6 eV.",
          "E₂ = -13.6 / 2² = -3.4 eV.",
          "ΔE = E₂ - E₁ = -3.4 - (-13.6) = +10.2 eV.",
        ],
        finalAnswer: "\\Delta E = 10.2 \\text{ eV}",
        visualType: "bohr-hydrogen-atom",
        visualDescription: "Bohr orbital diagram showing electronic jump from n=1 to n=2 absorbing 10.2 eV photon.",
        tipOrTrap: "Remember 'first excited state' means n = 2, not n = 1!",
      },
    ],
  },
  {
    id: "chem-kp-kc-relation",
    slug: "relation-between-kp-and-kc",
    title: "Chemical Equilibrium: Relationship Between K_p and K_c",
    subject: "chemistry",
    unit: "Chemical Equilibrium",
    unitId: "chemical-equilibrium",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Chemical Equilibrium)",
    isExtra: false,
    statement:
      "For a general reversible gaseous reaction aA + bB ⇌ cC + dD, the equilibrium constant in terms of partial pressures K_p is related to that in molar concentrations K_c by K_p = K_c (RT)^(Δn_g).",
    coreFormula: "K_p = K_c (RT)^{\\Delta n_g}, \\quad \\Delta n_g = (c + d) - (a + b)",
    concernedTerms: [
      { term: "Change in Gas Moles", symbol: "\\Delta n_g", definition: "Total moles of gaseous products minus total moles of gaseous reactants." },
      { term: "Gas Partial Pressure", symbol: "p_i = [C_i] R T", definition: "Ideal gas law relation connecting pressure to molarity [C_i] = n_i / V." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Write Expressions for K_c and K_p",
        latex: "K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}, \\quad K_p = \\frac{p_C^c p_D^d}{p_A^a p_B^b}",
        explanation: "K_c uses molar concentrations in mol/L; K_p uses partial pressures in atmospheres.",
      },
      {
        stepNumber: 2,
        title: "Express Partial Pressure using Ideal Gas Equation",
        latex: "p_i V = n_i R T \\implies p_i = \\left(\\frac{n_i}{V}\\right) R T = [C_i] R T",
        explanation: "n_i / V represents molar concentration [C_i].",
      },
      {
        stepNumber: 3,
        title: "Substitute Partial Pressures into K_p Expression",
        latex: "K_p = \\frac{([C]RT)^c ([D]RT)^d}{([A]RT)^a ([B]RT)^b} = \\frac{[C]^c [D]^d}{[A]^a [B]^b} \\cdot \\frac{(RT)^{c+d}}{(RT)^{a+b}}",
        explanation: "Factoring out concentration terms and temperature terms.",
      },
      {
        stepNumber: 4,
        title: "Substitute K_c and Combine Powers (Q.E.D.)",
        latex: "K_p = K_c (RT)^{(c+d) - (a+b)} = K_c (RT)^{\\Delta n_g}",
        explanation: "Establishes canonical thermodynamic link.",
      },
    ],
    conclusion: "If Δn_g = 0 (e.g. H₂ + I₂ ⇌ 2HI), K_p = K_c.",
    keyTakeaways: [
      "If Δn_g > 0: K_p > K_c (assuming RT > 1).",
      "If Δn_g < 0: K_p < K_c (e.g. N₂ + 3H₂ ⇌ 2NH₃, Δn_g = -2 ⟹ K_p = K_c(RT)⁻²).",
    ],
    examTraps: ["❌ Count ONLY GASEOUS species when calculating Δn_g! Solids and liquids have activity 1 and Δn = 0."],
    specialCases: [
      {
        name: "Equal gas moles on both sides",
        condition: "a + b = c + d for a gaseous equilibrium, e.g. H₂(g) + I₂(g) ⇌ 2HI(g)",
        formula: "\\Delta n_g = 0 \\Rightarrow K_p = K_c",
        meaning: "The (RT) factor disappears entirely, so the two constants are numerically identical — the quick check to run before any substitution.",
      },
      {
        name: "More gas moles on the product side",
        condition: "A dissociation such as N₂O₄(g) ⇌ 2NO₂(g) with Δn_g = +1",
        formula: "K_p = K_c (RT)^{+1} = K_c \\times 24.47 \\text{ at } 298\\ \\text{K}",
        meaning: "Because RT exceeds 1 at ordinary temperatures, K_p comes out numerically larger than K_c whenever Δn_g is positive.",
      },
      {
        name: "Fewer gas moles on the product side",
        condition: "A synthesis such as N₂(g) + 3H₂(g) ⇌ 2NH₃(g) with Δn_g = −2",
        formula: "K_p = K_c (RT)^{-2} = \\frac{K_c}{(RT)^2}",
        meaning: "Raising the pressure raises K_p for this reaction because the product side holds fewer gas moles, matching Le Châtelier's principle.",
      },
      {
        name: "Only the gas phase counts toward Δn_g",
        condition: "A heterogeneous equilibrium with a solid, e.g. CaCO₃(s) ⇌ CaO(s) + CO₂(g)",
        formula: "\\Delta n_g = 1 - 0 = 1 \\Rightarrow K_p = K_c (RT)",
        meaning: "Solids and pure liquids have unit activity and are omitted entirely, so only the gaseous coefficients enter the difference.",
      },
      {
        name: "The units of K_c and K_p differ",
        condition: "Δn_g is non-zero and the dimensions of both constants are compared",
        formula: "[K_c] = (\\text{mol L}^{-1})^{\\Delta n_g}, \\quad [K_p] = \\text{atm}^{\\Delta n_g}",
        meaning: "Only when Δn_g = 0 is K dimensionless and numerically equal to K_p; otherwise each carries its own power of a concentration or pressure unit.",
      },
      {
        name: "K_p and K_c both change with temperature",
        condition: "The system is heated or cooled away from the temperature at which the constants were quoted",
        formula: "\\frac{K_{p,2}}{K_{p,1}} = \\frac{K_{c,2}}{K_{c,1}} = \\text{a new value at } T_2",
        meaning: "The K_p = K_c(RT)^{Δn} link holds at one temperature only; both constants must be recomputed from fresh thermodynamic data at the new T.",
      },
    ],

    visualType: "kp-kc-equilibrium",
    solvedProblems: [
      {
        id: "p-eq-1",
        question: "For N₂O₄(g) ⇌ 2NO₂(g), K_c = 4.6 × 10⁻³ at 298 K. Calculate K_p (R = 0.0821 L·atm/mol·K).",
        examBadge: "NEB 2079",
        given: "Δn_g = 2 - 1 = 1, T = 298 K, R = 0.0821",
        stepByStep: [
          "Δn_g = 2 - 1 = +1.",
          "K_p = K_c (RT)¹ = (4.6 × 10⁻³) × (0.0821 × 298) = (4.6 × 10⁻³) × 24.466 = 0.1125 atm.",
        ],
        finalAnswer: "K_p \\approx 0.113 \\text{ atm}",
        visualType: "kp-kc-equilibrium",
        visualDescription: "Equilibrium chamber showing dissociation of 1 N2O4 into 2 NO2 molecules scaling with RT.",
        tipOrTrap: "Always use R = 0.0821 L·atm/(mol·K) when pressure is in atmospheres.",
      },
    ],
  },
  {
    id: "chem-molecular-mass-vapour-density",
    slug: "molecular-mass-and-vapour-density-avogadro",
    title: "Stoichiometry: Avogadro's Deduction (Molecular Mass = 2 × Vapour Density)",
    subject: "chemistry",
    unit: "Stoichiometry",
    unitId: "stoichiometry",
    gradeTrack: "grade-11",
    nebCode: "Che. 201 (Stoichiometry)",
    isExtra: false,
    statement:
      "Vapour density (V.D.) of a gas is the ratio of the mass of a certain volume of gas to the mass of the same volume of hydrogen at identical temperature and pressure. Molecular Mass = 2 × V.D.",
    coreFormula: "\\text{Molecular Mass } (M) = 2 \\times \\text{Vapour Density } (V.D.)",
    concernedTerms: [
      { term: "Vapour Density", symbol: "V.D.", definition: "Mass of V volume of gas / Mass of V volume of H₂ at STP." },
      { term: "Avogadro's Hypothesis", definition: "Equal volumes of all gases under similar conditions of T and P contain equal number of molecules." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Define Vapour Density by Volume Ratio",
        latex: "\\text{V.D.} = \\frac{\\text{Mass of } V \\text{ volume of gas}}{\\text{Mass of } V \\text{ volume of } H_2}",
        explanation: "Both measured at same temperature and pressure.",
      },
      {
        stepNumber: 2,
        title: "Apply Avogadro's Hypothesis",
        latex: "\\text{V.D.} = \\frac{\\text{Mass of } n \\text{ molecules of gas}}{\\text{Mass of } n \\text{ molecules of } H_2} = \\frac{\\text{Mass of 1 molecule of gas}}{\\text{Mass of 1 molecule of } H_2}",
        explanation: "Equal volumes contain n molecules.",
      },
      {
        stepNumber: 3,
        title: "Substitute Diatomic Atomicity of Hydrogen (H₂ = 2 atoms)",
        latex: "\\text{V.D.} = \\frac{\\text{Mass of 1 molecule of gas}}{\\text{Mass of 2 atoms of } H} = \\frac{1}{2} \\times \\frac{\\text{Mass of 1 molecule of gas}}{\\text{Mass of 1 atom of } H}",
        explanation: "Since hydrogen is diatomic, 1 molecule of H₂ = 2 atoms of H.",
      },
      {
        stepNumber: 4,
        title: "Relate to Molecular Mass Definition (Q.E.D.)",
        latex: "\\text{By definition, Molecular Mass } M = \\frac{\\text{Mass of 1 molecule of gas}}{\\text{Mass of 1 atom of } H} \\implies \\text{V.D.} = \\frac{M}{2} \\implies M = 2 \\times \\text{V.D.}",
        explanation: "Fundamental stoichiometric relationship for gas density.",
      },
    ],
    conclusion: "Allows determining molecular weight directly from gas density.",
    keyTakeaways: ["Molar volume at STP: 1 mole of any ideal gas occupies 22.4 L."],
    examTraps: ["❌ Forgetting that hydrogen is diatomic; neglecting the factor 2 causes a 50% error!"],
    specialCases: [
      {
        name: "Mixtures have a mean molecular mass",
        condition: "A gas mixture of components with mole fractions xᵢ is measured against hydrogen",
        formula: "M_{\\text{mix}} = \\sum_i x_i M_i = 2 \\times \\text{V.D.}_{\\text{mix}}",
        meaning: "Vapour density of a mixture such as air is an average weighted by mole fraction, which is why the relative density of air against H₂ is close to 14.5.",
      },
      {
        name: "The factor two assumes hydrogen is diatomic",
        condition: "The reference gas is taken as one atom of hydrogen rather than one H₂ molecule",
        formula: "\\text{V.D.} = \\frac{M}{2} \\quad \\text{only because } H_2 = 2H",
        meaning: "If the standard were a monatomic gas the multiplier would be 1; the factor 2 is purely the diatomicity of the reference gas.",
      },
      {
        name: "Isomers share the same vapour density",
        condition: "Two compounds of identical molecular formula, e.g. ethanol and dimethyl ether",
        formula: "M = 46 \\Rightarrow \\text{V.D.} = 23 \\text{ for both}",
        meaning: "Vapour density measures mass and not structure, so it cannot distinguish structural isomers — only a chemical test can.",
      },
      {
        name: "Elemental gases follow the same rule",
        condition: "A monatomic or diatomic element such as He, O₂ or Cl₂ is evaluated",
        formula: "\\text{He: } \\text{V.D.} = 2, \\quad \\text{O}_2: \\text{V.D.} = 16, \\quad \\text{SO}_2: \\text{V.D.} = 32",
        meaning: "The relation is general for any gas, not only compounds; the molar masses are 4, 32 and 64 g/mol respectively.",
      },
      {
        name: "Mixtures that dissociate give a non-integer result",
        condition: "A gas such as N₂O₄ partially dissociates to NO₂ in the measuring bulb",
        formula: "\\text{Observed } \\text{V.D.} < \\frac{M_{\\text{N}_2\\text{O}_4}}{2} = 46",
        meaning: "Dissociation lowers the average molar mass, so the measured vapour density is smaller than that of the pure undissociated gas.",
      },
    ],

    visualType: "molecular-mass-vd",
    solvedProblems: [
      {
        id: "p-vd-1",
        question: "A gas has vapour density 32. Find its molecular weight and identify a possible atmospheric gas.",
        examBadge: "NEB 2078",
        given: "V.D. = 32",
        stepByStep: [
          "Molecular mass: M = 2 × V.D. = 2 × 32 = 64 g/mol.",
          "Possible gas: Sulphur dioxide (SO₂: S = 32, O₂ = 32 ⟹ 64 g/mol).",
        ],
        finalAnswer: "M = 64 \\text{ g/mol} \\; (\\text{e.g. } SO_2)",
        visualType: "molecular-mass-vd",
        visualDescription: "Avogadro equal volume bulbs comparing gas mass against hydrogen gas mass.",
        tipOrTrap: "Oxygen has V.D. = 16 (M = 32); ozone has V.D. = 24 (M = 48).",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. NEB GRADE 11 BIOLOGY (BIO. 201) - OFFICIAL SYLLABUS MECHANISMS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "bio-dna-watson-crick",
    slug: "watson-crick-dna-double-helix-chargaff",
    title: "Biomolecules: Watson & Crick B-DNA Double Helix Architecture & Chargaff's Rules",
    subject: "biology",
    unit: "Biomolecules and Cell Biology",
    unitId: "biomolecules-and-cell-biology",
    gradeTrack: "grade-11",
    nebCode: "Bio. 201 (Biomolecules and Cell Biology)",
    isExtra: false,
    statement:
      "DNA consists of two antiparallel polynucleotide strands coiled into a right-handed double helix with pitch 3.4 nm and diameter 2.0 nm, stabilized by Chargaff's base pairing: [A] = [T] (2 H-bonds) and [G] ≡ [C] (3 H-bonds).",
    coreFormula: "[A] = [T], \\quad [G] = [C], \\quad \\frac{[A] + [G]}{[T] + [C]} = 1.0, \\quad \\text{Pitch} = 3.4\\text{ nm (10 bp/turn)}",
    concernedTerms: [
      { term: "Phosphodiester Bond", definition: "Covalent 3'-to-5' linkage connecting deoxyribose sugars along the phosphate backbone." },
      { term: "Antiparallel Strands", definition: "One strand runs in 5' → 3' direction, while complementary strand runs in 3' → 5' direction." },
      { term: "Hydrogen Bonding", definition: "A pairs with T via 2 hydrogen bonds; G pairs with C via 3 hydrogen bonds (higher thermal stability)." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Antiparallel Backbone Geometry",
        latex: "5'\\text{-End (Free Phosphate)} \\longleftrightarrow 3'\\text{-End (Free } -\\text{OH})",
        explanation: "Two strands run in opposite directions to enable Watson-Crick hydrogen bonding.",
      },
      {
        stepNumber: 2,
        title: "Helical Dimensions of Canonical B-DNA",
        latex: "\\text{Diameter} = 2.0\\text{ nm}, \\quad \\text{Helical Pitch} = 3.4\\text{ nm}, \\quad \\text{Distance between bp} = 0.34\\text{ nm}",
        explanation: "Contains 10 base pairs per complete 360° turn with major and minor grooves.",
      },
      {
        stepNumber: 3,
        title: "Chargaff's Equimolar Rules (Q.E.D.)",
        latex: "\\%A = \\%T, \\quad \\%G = \\%C \\implies A + G = T + C \\implies \\frac{\\text{Purines}}{\\text{Pyrimidines}} = 1.0",
        explanation: "Proves strict 1:1 purine-to-pyrimidine ratio in all double-stranded genomic DNA.",
      },
    ],
    conclusion: "Complementary base pairing provides the physical mechanism for semi-conservative DNA replication.",
    keyTakeaways: [
      "Higher G+C content increases DNA melting temperature (T_m) due to 3 hydrogen bonds.",
    ],
    examTraps: ["❌ Chargaff's rules do NOT hold for single-stranded RNA or single-stranded viral DNA (e.g. φX174)."],
    specialCases: [
      {
        name: "AT-rich DNA melts at a lower temperature than GC-rich DNA",
        condition: "Two samples of equal length but different base composition are heated",
        formula: "T_m \\uparrow \\text{ as } (G+C)\\% \\uparrow",
        meaning: "Because G≡C carries three hydrogen bonds against two for A=T, GC-rich DNA needs more heat to separate; this is why bacterial GC content is linked to growth temperature.",
      },
      {
        name: "One turn of the helix covers ten base pairs",
        condition: "The helix pitch of 3.4 nm is divided by the rise of a single base pair",
        formula: "\\frac{3.4\\ \\text{nm}}{10} = 0.34\\ \\text{nm per bp}",
        meaning: "Ten base pairs make one full 360° revolution, so the sugar-phosphate helix completes a turn every 3.4 nm along its axis.",
      },
      {
        name: "Single-stranded DNA has no equimolar base ratio",
        condition: "A circular single-stranded viral genome such as φX174 is analysed for base composition",
        formula: "[A] \\neq [T] \\quad \\text{and} \\quad [G] \\neq [C]",
        meaning: "Chargaff's rules follow from double-strandedness alone, so a single-stranded genome has free bases and no fixed 1:1 pairing ratio.",
      },
      {
        name: "A–T pairs are wider than G≡C pairs",
        condition: "The two base pairs are compared in the major groove of B-DNA",
        formula: "A-T \\approx 0.34\\ \\text{nm wide}, \\quad G\\equiv C \\approx 0.33\\ \\text{nm wide}",
        meaning: "The two purine–pyrimidine pairs are almost the same width, which is what allows a uniform 2.0 nm diameter helix with no distortion of the backbone.",
      },
      {
        name: "X-ray diffraction spacing gives the helix dimensions",
        condition: "The 3.4 nm repeat along the helix axis is measured from a diffraction pattern",
        formula: "d = 3.4\\ \\text{nm}, \\quad D = 2.0\\ \\text{nm}",
        meaning: "The pitch came from the X-ray repeat distance and the diameter from the equatorial spacing — the two numbers that fixed B-DNA's geometry.",
      },
    ],

    visualType: "dna-double-helix",
    solvedProblems: [
      {
        id: "p-dna-1",
        question: "A double-stranded DNA sample contains 18% Guanine. Calculate the percentages of Adenine, Thymine, and Cytosine.",
        examBadge: "CEE 2023 / NEB",
        given: "%G = 18%",
        stepByStep: [
          "By Chargaff's rule: %C = %G = 18%.",
          "Total G + C = 18% + 18% = 36%.",
          "Total A + T = 100% - 36% = 64%.",
          "Since A = T: %A = 64% / 2 = 32%; %T = 32%.",
        ],
        finalAnswer: "A = 32\\%, \\quad T = 32\\%, \\quad C = 18\\%",
        visualType: "dna-double-helix",
        visualDescription: "B-DNA double helix showing 18% G-C triplets and 32% A-T doublets with 3.4 nm pitch.",
        tipOrTrap: "Always sum G+C first, subtract from 100%, and divide remainder equally for A and T.",
      },
    ],
  },
  {
    id: "bio-mitosis-meiosis",
    slug: "cell-division-mitosis-vs-meiosis-crossing-over",
    title: "Cell Division: Mitosis vs Meiosis Chromosome Dynamics & Crossing Over",
    subject: "biology",
    unit: "Biomolecules and Cell Biology",
    unitId: "biomolecules-and-cell-biology",
    gradeTrack: "grade-11",
    nebCode: "Bio. 201 (Biomolecules and Cell Biology)",
    isExtra: false,
    statement:
      "Mitosis produces 2 genetically identical diploid (2n) somatic daughter cells. Meiosis produces 4 genetically recombinant haploid (n) gametes through two rounds of division with crossing over during Pachytene of Prophase I.",
    coreFormula: "\\text{Mitosis: } 2n \\longrightarrow 2 \\times 2n, \\quad \\text{Meiosis: } 2n \\longrightarrow 4 \\times n \\; (\\text{Recombinant})",
    concernedTerms: [
      { term: "Synaptonemal Complex", definition: "Protein lattice formed during Zygotene zipper-pairing homologous maternal and paternal chromosomes." },
      { term: "Crossing Over / Chiasma", definition: "Recombinase-mediated non-sister chromatid reciprocal exchange during Pachytene, visible at Diplotene." },
      { term: "Reductional vs Equational", definition: "Meiosis I is reductional (2n → n); Meiosis II is equational (similar to mitosis)." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Prophase I Sub-stages Mnemonic (LZPDD)",
        latex: "\\text{Leptotene} \\to \\text{Zygotene} \\to \\text{Pachytene} \\to \\text{Diplotene} \\to \\text{Diakinesis}",
        explanation: "Chromatin condenses (Lep), synapsis forms bivalents (Zyg), crossing over occurs (Pach), chiasmata appear (Dip), terminalization finishes (Diak).",
      },
      {
        stepNumber: 2,
        title: "Anaphase I Segregation (Reductional)",
        latex: "\\text{Homologous Chromosome Pairs Separate } (2n \\to n)",
        explanation: "Centromeres do NOT divide in Anaphase I; whole chromosomes move to opposite poles.",
      },
      {
        stepNumber: 3,
        title: "Anaphase II Chromatid Separation (Equational)",
        latex: "\\text{Sister Chromatids Separate } (n \\to 4n \\text{ gametic nuclei})",
        explanation: "Centromeres split, distributing recombinant haploid genomes into 4 daughter cells.",
      },
    ],
    conclusion: "Crossing over and independent assortment provide the cellular basis for biological variation.",
    keyTakeaways: ["Colchicine arrests cell division at Metaphase by inhibiting microtubule spindle formation."],
    examTraps: ["❌ Centromeres do NOT split in Anaphase I; they split ONLY in Anaphase II and Mitotic Anaphase!"],
    specialCases: [
      {
        name: "Anaphase I is reductional, not equational",
        condition: "A cell with 2n = 24 enters anaphase I of meiosis",
        formula: "\\underbrace{24}_{2n} \\xrightarrow{\\text{anaphase I}} \\underbrace{12}_{n} \\text{ per pole}",
        meaning: "Centromeres do not divide in anaphase I, so whole duplicated chromosomes move apart and the chromosome number is already halved at this stage.",
      },
      {
        name: "Chromatid doubling in anaphase II",
        condition: "A secondary spermatocyte with n = 12 chromosomes divides in anaphase II",
        formula: "\\underbrace{12}_{n,\\ 24\\ \\text{chromatids}} \\to \\underbrace{24}_{2n\\ \\text{temporarily}} \\text{ chromatids total}",
        meaning: "Splitting centromeres doubles the chromatid count within the cell even though the ploidy of each future gamete stays at n — the classic exam trap.",
      },
      {
        name: "Mitosis in a haploid cell keeps the ploidy unchanged",
        condition: "A gametophyte or haploid fungus cell divides mitotically, e.g. 2n = 2n = n",
        formula: "n \\to 2 \\times n \\quad (\\text{no reduction})",
        meaning: "Mitosis is equational and simply copies whatever ploidy it is given; the 2n → 2 × 2n notation only holds when the parent cell is diploid.",
      },
      {
        name: "Crossing over needs a homologous pair to be present",
        condition: "A haploid cell, or a male grasshopper with no pairing, enters meiosis I",
        formula: "\\text{No synapsis} \\Rightarrow \\text{no chiasma} \\Rightarrow \\text{no recombination}",
        meaning: "Without homologues to zip together there is nothing to exchange, so segregation is random and independent assortment still applies.",
      },
      {
        name: "Colchicine turns mitosis into polyploidy",
        condition: "Colchicine blocks spindle formation so the chromosomes never reach the poles",
        formula: "\\text{Mitosis arrested} \\Rightarrow 2n \\to 4n",
        meaning: "Failure of cytokinesis after a blocked metaphase duplicates the whole genome, which is how tetraploid plants and colchicine-treated karyotypes are produced.",
      },
    ],

    visualType: "mitosis-meiosis-stages",
    solvedProblems: [
      {
        id: "p-cell-1",
        question: "A plant has 2n = 24 chromosomes. What are the chromosome and chromatid counts in Metaphase I and Anaphase II?",
        examBadge: "CEE Past MCQ",
        given: "2n = 24",
        stepByStep: [
          "In Metaphase I: Chromosomes = 24 (12 bivalents); Chromatids = 24 × 2 = 48.",
          "In Anaphase II: Each haploid cell has centromeres split, so Chromosomes = 24; Chromatids = 24.",
        ],
        finalAnswer: "\\text{Metaphase I: 24 chrom / 48 chromatids; Anaphase II: 24 chrom / 24 chromatids}",
        visualType: "mitosis-meiosis-stages",
        visualDescription: "Bivalent pairing in pachytene with non-sister chromatid crossover point and spindle alignment.",
        tipOrTrap: "When centromeres split, each former sister chromatid becomes an individual daughter chromosome.",
      },
    ],
  },
  {
    id: "bio-lindeman-energy-pyramid",
    slug: "lindeman-ten-percent-energy-efficiency-law",
    title: "Ecology: Lindeman's 10% Trophic Energy Transfer Efficiency Law",
    subject: "biology",
    unit: "Ecology",
    unitId: "ecology",
    gradeTrack: "grade-11",
    nebCode: "Bio. 201 (Ecology)",
    isExtra: false,
    statement:
      "Only approximately 10% of the net energy entering one trophic level is transferred and stored in organic biomass at the next successive trophic level; the remaining 90% is dissipated as metabolic respiration heat and unassimilated waste.",
    coreFormula: "\\text{Trophic Efficiency } = \\frac{\\text{Energy at Trophic Level } n+1}{\\text{Energy at Trophic Level } n} \\times 100\\% \\approx 10\\%",
    concernedTerms: [
      { term: "Primary Producers", definition: "Autotrophs fixing solar photons into chemical bond enthalpy." },
      { term: "Trophic Level", definition: "Position occupied by an organism in a food chain (T₁, T₂, T₃, T₄)." },
      { term: "Pyramid of Energy", definition: "ALWAYS strictly upright because energy is dissipated as heat at each step (Second Law of Thermodynamics)." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Photosynthetic Conversion (1% of Incident Solar Flux)",
        latex: "1{,}000{,}000\\text{ J Solar Energy} \\longrightarrow 10{,}000\\text{ J GPP in Producers (T₁)}",
        explanation: "Plants capture only 1–2% of Photosynthetically Active Radiation (PAR).",
      },
      {
        stepNumber: 2,
        title: "Herbivore Consumption & Assimilation (T₂)",
        latex: "10{,}000\\text{ J (T₁)} \\times 10\\% = 1{,}000\\text{ J in Primary Consumers (T₂)}",
        explanation: "90% is consumed in respiration, excretion, and unharvested plant matter.",
      },
      {
        stepNumber: 3,
        title: "Carnivore Transfer to Apex Predators (Q.E.D.)",
        latex: "1{,}000\\text{ J (T₂)} \\to 100\\text{ J (T₃: Carnivore)} \\to 10\\text{ J (T₄: Top Predator)}",
        explanation: "Limits terrestrial food chain lengths to 4 or 5 trophic levels due to thermodynamic exhaustion.",
      },
    ],
    conclusion: "Pyramid of energy is universally upright with zero exceptions in all known biomes.",
    keyTakeaways: [
      "Pyramid of biomass can be inverted in aquatic ecosystems (phytoplankton < zooplankton), but energy pyramid NEVER inverts.",
    ],
    examTraps: ["❌ Confusing pyramid of numbers (can be inverted in tree ecosystem) with pyramid of energy (always upright)."],
    specialCases: [
      {
        name: "Secondary consumers sit two transfers above the producers",
        condition: "Producers fix E₁ joules and each trophic step passes on 10 %",
        formula: "E_{T_3} = E_1 \\times (0.1)^2 = 0.01\\,E_1",
        meaning: "Counting transfers, not organisms, is the whole skill: a secondary consumer receives only 1 % of the producer energy, so 20 000 J becomes 200 J.",
      },
      {
        name: "Only 1–2 % of sunlight ever enters the chain",
        condition: "Gross primary productivity is compared with the incident solar flux",
        formula: "\\text{GPP} \\approx 0.01\\text{–}0.02 \\times \\text{Solar flux}",
        meaning: "The 10 % law starts from GPP, not from total incoming sunlight, so the true figure for a sunlit grassland is far below 10 % of incident radiation.",
      },
      {
        name: "90 % is dissipated, not stored",
        condition: "The untransferred fraction of a trophic level is apportioned",
        formula: "R + E + U = 0.9\\,E_n",
        meaning: "The lost 90 % is respiration heat plus egestion and undigested material; it leaves the system and can never be reused by the next level.",
      },
      {
        name: "Food chains stop at four or five levels",
        condition: "Successive 10 % steps are continued until the residual energy becomes negligible",
        formula: "10^4 \\to 10^3 \\to 10^2 \\to 10^1 \\to 10^0\\ \\text{J}",
        meaning: "Halving the energy ten times already costs a factor of ten billion, which is why no real food chain extends beyond about five trophic levels.",
      },
      {
        name: "Warm-water ecosystems run a longer chain than cold ones",
        condition: "Two systems of equal producer productivity are compared",
        formula: "E_\\text{transfer, warm} > E_\\text{transfer, cold}",
        meaning: "Cold-water phytoplankton has poor thermal efficiency, so polar food chains are typically only three or four links long while tropical ones reach five or six.",
      },
    ],

    visualType: "lindeman-energy-pyramid",
    solvedProblems: [
      {
        id: "p-eco-1",
        question: "If 20,000 J of energy is trapped by producers, how much energy is available to secondary consumers in the food chain?",
        examBadge: "NEB 2079 / CEE",
        given: "Producers (T₁) = 20,000 J",
        stepByStep: [
          "T₁ (Producers): 20,000 J.",
          "T₂ (Primary Consumers / Herbivores): 20,000 × 10% = 2,000 J.",
          "T₃ (Secondary Consumers / Primary Carnivores): 2,000 × 10% = 200 J.",
        ],
        finalAnswer: "200 \\text{ J}",
        visualType: "lindeman-energy-pyramid",
        visualDescription: "Upright energy pyramid step blocks: 20000 J -> 2000 J -> 200 J.",
        tipOrTrap: "Count carefully: Secondary consumer is at trophic level T₃, not T₂.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. EXTRA: GRADE 12 & CEE ENTRANCE ADVANCED DERIVATIONS & THEOREMS
  // (RENAMED "EXTRA" AS REQUESTED BY USER)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "extra-math-lmvt-rolle",
    slug: "extra-lagrange-mean-value-theorem-rolle",
    title: "[EXTRA] Lagrange's Mean Value Theorem & Rolle's Theorem",
    subject: "mathematics",
    unit: "Calculus (Grade 12 & CEE Advanced)",
    unitId: "calculus",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Calculus)",
    isExtra: true,
    statement:
      "[EXTRA / Grade 12] If f: [a, b] → ℝ is continuous on [a, b] and differentiable on (a, b), then there exists c ∈ (a, b) such that f'(c) = [f(b) - f(a)] / (b - a). If f(a) = f(b), then f'(c) = 0 (Rolle's Theorem).",
    coreFormula: "f'(c) = \\frac{f(b) - f(a)}{b - a}, \\quad c \\in (a, b)",
    concernedTerms: [
      { term: "Secant Slope", definition: "[f(b) - f(a)] / (b - a)." },
      { term: "Tangent Slope", definition: "Instantaneous derivative f'(c) parallel to secant chord." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Construct Auxiliary Function",
        latex: "\\phi(x) = f(x) - f(a) - \\frac{f(b) - f(a)}{b - a}(x - a)",
        explanation: "Satisfies φ(a) = φ(b) = 0 and continuity on [a, b].",
      },
      {
        stepNumber: 2,
        title: "Apply Rolle's Theorem and Differentiate (Q.E.D.)",
        latex: "\\phi'(c) = 0 \\implies f'(c) - \\frac{f(b) - f(a)}{b - a} = 0 \\implies f'(c) = \\frac{f(b) - f(a)}{b - a}",
        explanation: "Tangent line at c is strictly parallel to endpoint chord.",
      },
    ],
    conclusion: "Guarantees existence of parallel tangent for any smooth continuous curve.",
    keyTakeaways: ["Foundation for proving Taylor's series, L'Hôpital's rule, and monotonicity criteria."],
    examTraps: ["❌ Checking differentiability at closed endpoints [a, b]. Only open interval (a, b) is required."],
    specialCases: [
      {
        name: "Rolle's theorem is the f(a) = f(b) corollary",
        condition: "The endpoint values coincide, e.g. f(1) = f(3) for f(x) = x² − 4x + 3",
        formula: "f(b) - f(a) = 0 \\;\\Rightarrow\\; f'(c) = 0",
        meaning: "A continuous curve that starts and ends at the same height must flatten out somewhere in between, which is the geometric heart of the theorem.",
      },
      {
        name: "Every c works for a linear function",
        condition: "f is itself linear, so f' is constant on (a, b)",
        formula: "f'(c) = \\frac{f(b)-f(a)}{b-a} \\; \\text{holds for all } c \\in (a,b)",
        meaning: "LMVT does not single out a unique c for a straight line; the tangent is parallel to the secant everywhere, so uniqueness must not be assumed in general either.",
      },
      {
        name: "Trigonometric functions satisfy Rolle over a full period",
        condition: "f(x) = sin x on [0, 2π], where f(0) = f(2π) = 0",
        formula: "\\cos c = 0 \\;\\Rightarrow\\; c = \\frac{\\pi}{2},\\ \\frac{3\\pi}{2}",
        meaning: "Rolle's conclusion is existential, not unique: two different values of c can satisfy f'(c) = 0 in the same interval.",
      },
      {
        name: "A vertical tangent still admits a valid secant slope",
        condition: "f(x) = √x is differentiable on (0, 4) though f' is unbounded at 0",
        formula: "\\frac{1}{2\\sqrt{c}} = \\frac{2-0}{4-0} = \\frac{1}{2} \\;\\Rightarrow\\; c = 1",
        meaning: "The theorem only needs the derivative to exist at the interior point c; it need not be bounded or continuous on the whole open interval.",
      },
      {
        name: "The hypotheses cannot be weakened",
        condition: "f is continuous on [a, b] but fails to be differentiable at one interior point",
        formula: "f(x) = |x| \\text{ on } [-1,1] \\;\\Rightarrow\\; \\text{no } c \\text{ with } f'(c) = 0",
        meaning: "Rolle's theorem genuinely requires differentiability everywhere in (a, b); the cusp at x = 0 is the standard counterexample showing both conditions are needed.",
      },
    ],

    visualType: "lmvt-rolle",
    solvedProblems: [
      {
        id: "p-lmvt-ex",
        question: "Find c for f(x) = x² - 4x + 3 on [1, 3] under Rolle's Theorem.",
        examBadge: "CEE Past MCQ",
        given: "f(1) = 0, f(3) = 0",
        stepByStep: ["f'(x) = 2x - 4.", "Set f'(c) = 0 ⟹ 2c - 4 = 0 ⟹ c = 2 ∈ (1, 3)."],
        finalAnswer: "c = 2",
        visualType: "lmvt-rolle",
        visualDescription: "Parabola vertex at x = 2 with horizontal tangent line parallel to x-axis.",
        tipOrTrap: "Ensure c is strictly inside open interval (1, 3).",
      },
    ],
  },
  {
    id: "extra-phys-bernoulli",
    slug: "extra-bernoullis-principle-fluid-dynamics",
    title: "[EXTRA] Fluid Dynamics: Bernoulli's Equation & Torricelli's Law",
    subject: "physics",
    unit: "Fluid Dynamics (Grade 12 & CEE Advanced)",
    unitId: "dynamics",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Mechanics)",
    isExtra: true,
    statement:
      "[EXTRA / Grade 12] For an incompressible, non-viscous fluid in steady streamline flow, total mechanical energy per unit volume is constant: P + ½ ρv² + ρgh = constant.",
    coreFormula: "P + \\frac{1}{2}\\rho v^2 + \\rho gh = \\text{constant}, \\quad v_{\\text{efflux}} = \\sqrt{2gh}",
    concernedTerms: [
      { term: "Static Pressure", symbol: "P", definition: "Normal force per unit area on fluid walls." },
      { term: "Dynamic Pressure", symbol: "\\frac{1}{2}\\rho v^2", definition: "Kinetic energy per unit fluid volume." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Work-Energy Theorem on Moving Fluid Element (Q.E.D.)",
        latex: "(P_1 - P_2)\\Delta V = \\frac{1}{2}\\rho\\Delta V (v_2^2 - v_1^2) + \\rho\\Delta V g(h_2 - h_1) \\implies P + \\frac{1}{2}\\rho v^2 + \\rho gh = \\text{const}",
        explanation: "Pressure work done equals total mechanical energy gained by fluid element.",
      },
    ],
    conclusion: "Constriction increases velocity and decreases fluid pressure (Venturi effect).",
    keyTakeaways: ["Torricelli efflux velocity from orifice at depth h equals free fall velocity √(2gh)."],
    examTraps: ["❌ Misconception that fast fluid has high pressure; high velocity means LOW static pressure."],
    specialCases: [
      {
        name: "Torricelli efflux from a small orifice",
        condition: "A large open tank is pierced at depth h below the free surface",
        formula: "v = \\sqrt{2gh}",
        meaning: "Applying Bernoulli between the free surface and the jet, both points being at atmospheric pressure, gives the jet the same speed as a body in free fall from height h.",
      },
      {
        name: "Horizontal pipe of varying cross-section",
        condition: "Steady flow along a level pipe, so h₁ = h₂ and the pressure term alone balances the kinetic term",
        formula: "P_1 + \\tfrac{1}{2}\\rho v_1^2 = P_2 + \\tfrac{1}{2}\\rho v_2^2",
        meaning: "A constriction raises speed and lowers static pressure — the Venturi effect that makes a Venturimeter a working flow meter.",
      },
      {
        name: "Continuity fixes the area–velocity trade",
        condition: "An incompressible fluid passes a narrow throat of area A₂",
        formula: "A_1 v_1 = A_2 v_2 \\quad \\Rightarrow \\quad v_2 = v_1 \\frac{A_1}{A_2}",
        meaning: "Bernoulli's speed-up is only possible because the volume flow rate stays constant; squeezing the pipe is what converts pressure into kinetic energy.",
      },
      {
        name: "Stagnation point at the tip of a body",
        condition: "The flow is brought to rest, v = 0, against the oncoming stream",
        formula: "P_0 = P + \\tfrac{1}{2}\\rho v^2",
        meaning: "The entire dynamic head converts to pressure at a stagnation point, which is exactly the Pitot-tube measurement used to find the speed of a fluid.",
      },
      {
        name: "Blood pressure at the top of the body",
        condition: "Blood climbs a height h through a column whose speed change is negligible",
        formula: "\\Delta P = -\\rho g h \\;\\; (v_1 \\approx v_2)",
        meaning: "With the velocity term cancelling, Bernoulli reduces to a simple hydrostatic column — the reason a sphygmometer cuff must be at heart level for a correct reading.",
      },
    ],

    visualType: "bernoulli-fluid",
    solvedProblems: [
      {
        id: "p-bern-ex",
        question: "Find efflux velocity from an open water tank through a hole 5 m below water level. (g = 9.8 m/s²)",
        examBadge: "CEE Entrance",
        given: "h = 5 m",
        stepByStep: ["v = √(2gh) = √(2 × 9.8 × 5) = √98 ≈ 9.9 m/s."],
        finalAnswer: "v = 9.9 \\text{ m/s}",
        visualType: "bernoulli-fluid",
        visualDescription: "Water tank with orifice emitting jet at √(2gh).",
        tipOrTrap: "Torricelli formula holds when hole area is much smaller than tank surface area.",
      },
    ],
  },
  {
    id: "extra-chem-arrhenius",
    slug: "extra-arrhenius-equation-chemical-kinetics",
    title: "[EXTRA] Chemical Kinetics: Arrhenius Equation & Integrated Rate Laws",
    subject: "chemistry",
    unit: "Chemical Kinetics (Grade 12 & CEE Advanced)",
    unitId: "chemical-equilibrium",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Physical Chemistry)",
    isExtra: true,
    statement:
      "[EXTRA / Grade 12] Rate constant k depends exponentially on temperature: k = A e^(-E_a / RT). First-order integrated rate law: ln([A]₀/[A]_t) = kt, with half-life t₁/₂ = 0.693 / k.",
    coreFormula: "\\log_{10}\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right), \\quad t_{1/2} = \\frac{0.693}{k}",
    concernedTerms: [
      { term: "Activation Energy", symbol: "E_a", units: "J/mol", definition: "Minimum energy colliding reactants require to form transition complex." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Integrate Rate Law and Differentiate Arrhenius Equation (Q.E.D.)",
        latex: "-\\frac{d[A]}{dt} = k[A] \\implies \\ln\\left(\\frac{[A]_0}{[A]_t}\\right) = kt, \\quad \\ln k = \\ln A - \\frac{E_a}{RT}",
        explanation: "Gives linear Arrhenius plot ln k vs 1/T with slope = -E_a/R.",
      },
    ],
    conclusion: "Reaction rates double approximately every 10°C increase in temperature near 298 K.",
    keyTakeaways: ["Catalysts provide alternative low-activation barrier pathway without altering equilibrium ΔG°."],
    examTraps: ["❌ Temperature must always be in Kelvin (T = °C + 273.15)."],
    specialCases: [
      {
        name: "Arrhenius plot is a straight line",
        condition: "ln k is plotted against 1/T for rate constants measured at several temperatures",
        formula: "\\ln k = \\ln A - \\frac{E_a}{R}\\left(\\frac{1}{T}\\right)",
        meaning: "A linear ln k vs 1/T graph has slope −E_a/R and intercept ln A, which is how E_a is obtained graphically in board questions.",
      },
      {
        name: "E_a = 0 removes all temperature sensitivity",
        condition: "The reaction proceeds without an activation barrier, so k becomes temperature independent",
        formula: "k = A e^{0} = A = \\text{constant}",
        meaning: "A zero activation energy means the rate constant no longer responds to temperature; real reactions never have E_a exactly zero.",
      },
      {
        name: "Catalyst lowers E_a but leaves A and ΔG° unchanged",
        condition: "A catalysed and an uncatalysed pathway exist for the same reaction",
        formula: "E_{a,\\text{cat}} < E_{a,\\text{uncat}} \\;\\Rightarrow\\; k_{\\text{cat}} > k_{\\text{uncat}}",
        meaning: "The catalyst offers a lower-barrier route only; it speeds up both forward and reverse reactions equally and leaves K and the equilibrium position untouched.",
      },
      {
        name: "The familiar doubling of rate near 300 K",
        condition: "T rises by 10 K around 300 K, giving the empirical Q₁₀ ≈ 2",
        formula: "\\frac{k_{T+10}}{k_T} \\approx 2 \\;\\Rightarrow\\; E_a \\approx 50\\text{–}60\\ \\mathrm{kJ\\,mol^{-1}}",
        meaning: "The rule of thumb that a reaction doubles for every 10 °C holds only for activation energies near 50 kJ/mol; enzymatic reactions are far more temperature sensitive.",
      },
      {
        name: "Half-life formula is first-order only",
        condition: "The rate law is zero order or second order rather than first order in the reactant",
        formula: "t_{1/2} = \\frac{0.693}{k} \\;\\text{(first order)} \\quad \\text{vs} \\quad t_{1/2} = \\frac{[A]_0}{2k} \\;\\text{(zero order)}",
        meaning: "Only for first order is the half-life independent of the starting concentration; for zero order it doubles when the initial amount doubles.",
      },
    ],

    visualType: "arrhenius-kinetics",
    solvedProblems: [
      {
        id: "p-kin-ex",
        question: "A first-order reaction has k = 0.0693 min⁻¹. Find its half-life.",
        examBadge: "CEE 2022",
        given: "k = 0.0693 min⁻¹",
        stepByStep: ["t₁/₂ = 0.693 / k = 0.693 / 0.0693 = 10 minutes."],
        finalAnswer: "t_{1/2} = 10 \\text{ minutes}",
        visualType: "arrhenius-kinetics",
        visualDescription: "Exponential decay curve dropping to 50% at 10 min.",
        tipOrTrap: "First-order half-life is strictly independent of starting concentration.",
      },
    ],
  },
  {
    id: "extra-chem-nernst",
    slug: "extra-nernst-equation-electrochemistry",
    title: "[EXTRA] Electrochemistry: Nernst Equation & Cell Potential",
    subject: "chemistry",
    unit: "Electrochemistry (Grade 12 & CEE Advanced)",
    unitId: "oxidation-and-reduction",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Physical Chemistry)",
    isExtra: true,
    statement:
      "[EXTRA / Grade 12] Relates non-standard EMF E_cell to standard potential E° and reaction quotient Q: E_cell = E° - (0.0591 / n) log Q at 298 K.",
    coreFormula: "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log_{10} Q",
    concernedTerms: [
      { term: "Standard Potential", symbol: "E^\\circ", units: "V", definition: "E°_cathode - E°_anode at 1 M, 1 atm, 298 K." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Relate Electrical Work to Gibbs Free Energy (Q.E.D.)",
        latex: "\\Delta G = \\Delta G^\\circ + RT\\ln Q \\implies -nFE_{\\text{cell}} = -nFE^\\circ + RT\\ln Q \\implies E_{\\text{cell}} = E^\\circ - \\frac{0.0591}{n}\\log Q",
        explanation: "Yields standard electrochemical cell equation at 25°C.",
      },
    ],
    conclusion: "At equilibrium, E_cell = 0 and Q = K_c ⟹ log K_c = n E° / 0.0591.",
    keyTakeaways: ["Adding products lowers cell voltage; adding reactants increases cell voltage."],
    examTraps: ["❌ Don't forget stoichiometric exponents in Q = [Products]^p / [Reactants]^r."],
    specialCases: [
      {
        name: "All species at unit activity collapses the log term",
        condition: "Every solute is 1 M, every gas 1 atm, T = 298 K, so Q = 1",
        formula: "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log 1 = E^\\circ_{\\text{cell}}",
        meaning: "Under standard conditions the Nernst correction vanishes identically, which is exactly why E° is quoted at 1 M and 1 atm.",
      },
      {
        name: "At equilibrium the cell potential is zero",
        condition: "The cell has run to completion and Q = K_c",
        formula: "0 = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log K_c \\;\\Rightarrow\\; \\log K_c = \\frac{nE^\\circ_{\\text{cell}}}{0.0591}",
        meaning: "This converts a standard potential into an equilibrium constant; it is the standard way to find K of a redox reaction from a table of E° values.",
      },
      {
        name: "Diluting both compartments equally changes nothing",
        condition: "Both ion concentrations are divided by the same factor, e.g. both cut tenfold",
        formula: "Q' = \\frac{[C]^{2}/10}{[A]^{2}/10} = Q",
        meaning: "Scaling every concentration by the same factor cancels in the quotient, so the EMF is unchanged — dilution only matters when one side is diluted.",
      },
      {
        name: "Adding product suppresses the EMF",
        condition: "Q > 1 because extra product is added to the cathode compartment",
        formula: "E_{\\text{cell}} < E^\\circ_{\\text{cell}} \\quad (\\log Q > 0)",
        meaning: "Le Châtelier works at the electrochemical level: driving the reaction backwards lowers the driving force; adding reactant raises it above E°.",
      },
      {
        name: "Doubling the cell reaction halves the potential",
        condition: "All coefficients in the balanced cell reaction are multiplied by an integer k",
        formula: "Q \\to Q^{k}, \\quad n \\to kn \\;\\Rightarrow\\; E^\\circ_{\\text{cell}} \\text{ is unchanged}",
        meaning: "E° is an intensive property and must never be multiplied; only n and Q change. Multiplying E° by the stoichiometric factor is a classic wrong answer.",
      },
      {
        name: "Nernst coefficient varies with temperature",
        condition: "The cell is operated at T other than 298 K",
        formula: "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{2.303 RT}{nF}\\log Q",
        meaning: "The constant 0.0591 is just (2.303 RT/F) evaluated at 25 °C; the general form is required whenever T ≠ 298 K.",
      },
    ],

    visualType: "nernst-equation",
    solvedProblems: [
      {
        id: "p-ner-ex",
        question: "Find EMF of cell Zn | Zn²⁺(0.1M) || Cu²⁺(1.0M) | Cu (E° = 1.10 V).",
        examBadge: "CEE 2021",
        given: "Q = 0.1 / 1.0 = 0.1, n = 2",
        stepByStep: ["E = 1.10 - (0.0591 / 2) log(0.1) = 1.10 - (0.02955)(-1) = 1.10 + 0.02955 ≈ 1.13 V."],
        finalAnswer: "E \\approx 1.13 \\text{ V}",
        visualType: "nernst-equation",
        visualDescription: "Daniell cell schematic with log Q vs E curve.",
        tipOrTrap: "When [Reactants] > [Products], EMF exceeds E°.",
      },
    ],
  },
  {
    id: "extra-bio-hardy-weinberg",
    slug: "extra-hardy-weinberg-population-genetics",
    title: "[EXTRA] Population Genetics: Hardy-Weinberg Principle & Allele Frequencies",
    subject: "biology",
    unit: "Genetics & Evolution (Grade 12 & CEE Advanced)",
    unitId: "evolutionary-biology",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Genetics)",
    isExtra: true,
    statement:
      "[EXTRA / Grade 12] In a large panmictic population with no mutation, migration, or selection: p + q = 1 and p² + 2pq + q² = 1.",
    coreFormula: "p^2 + 2pq + q^2 = 1, \\quad p + q = 1",
    concernedTerms: [
      { term: "Allele Frequencies", symbol: "p, q", definition: "p = dominant allele freq; q = recessive allele freq." },
      { term: "Heterozygote Frequency", symbol: "2pq", definition: "Carrier proportion in population." },
    ],
    proofSteps: [
      {
        stepNumber: 1,
        title: "Gametic Union Binomial Expansion (Q.E.D.)",
        latex: "(p A + q a) \\times (p A + q a) = p^2 AA + 2pq Aa + q^2 aa = 1",
        explanation: "Frequencies remain invariant across non-overlapping generations.",
      },
    ],
    conclusion: "Evolution occurs whenever allele frequencies deviate from Hardy-Weinberg equilibrium.",
    keyTakeaways: ["Maximum carrier frequency (2pq) is 50% when p = q = 0.50."],
    examTraps: ["❌ Frequency of affected individuals with recessive trait is q², NOT q!"],
    specialCases: [
      {
        name: "Maximum heterozygote frequency at p = q = 0.5",
        condition: "Two alleles are equally common, so p = q = 0.5",
        formula: "2pq = 2(0.5)(0.5) = 0.50",
        meaning: "The carrier class can never exceed 50 % of the population. Asking for 'the maximum possible carrier frequency' is a standard CEE one-mark question.",
      },
      {
        name: "Recovering q from a recessive trait frequency",
        condition: "A fully recessive autosomal phenotype is reported as a percentage of the population",
        formula: "q = \\sqrt{q^2}, \\quad \\text{so } q = \\sqrt{0.16} = 0.40",
        meaning: "Because only homozygotes aa are visibly affected, the recessive allele frequency is the square root of the phenotype percentage, not the percentage itself.",
      },
      {
        name: "Two-gene extension gives the 9 : 3 : 3 : 1 ratio",
        condition: "Two independently assorting loci are each in Hardy-Weinberg equilibrium",
        formula: "(p^2 + 2pq + q^2)(P^2 + 2PQ + Q^2) = 1",
        meaning: "Multiplying the two binomial expansions reproduces the dihybrid ratio 9 : 3 : 3 : 1, which is why a monohybrid cross always shows 3 : 1 in F₂.",
      },
      {
        name: "X-linked recessive trait breaks the q² rule",
        condition: "The recessive allele lies on the X chromosome, so males (XY) are hemizygous",
        formula: "\\text{Affected males} = q, \\quad \\text{Carrier females} = 2pq",
        meaning: "A son needs only one copy of the allele to be affected, so for X-linked traits the affected male frequency is q, not q² — colour blindness and haemophilia are the classic examples.",
      },
      {
        name: "Any departure from p + q = 1 means evolution has occurred",
        condition: "Mutation, migration (gene flow) or natural selection acts on the population",
        formula: "p + q \\neq 1 \\; \\Longrightarrow \\; \\text{allele frequencies have shifted}",
        meaning: "Evolution is defined precisely as a change in allele frequency, so the moment any of the assumptions breaks, the population leaves equilibrium.",
      },
    ],

    visualType: "hardy-weinberg",
    solvedProblems: [
      {
        id: "p-hw-ex",
        question: "If 16% of a population has blue eyes (autosomal recessive), find the carrier frequency.",
        examBadge: "CEE 2023",
        given: "q² = 0.16",
        stepByStep: ["q = √0.16 = 0.40.", "p = 1 - 0.40 = 0.60.", "Carriers = 2pq = 2(0.60)(0.40) = 0.48 = 48%."],
        finalAnswer: "2pq = 48\\%",
        visualType: "hardy-weinberg",
        visualDescription: "Punnett area split: 36% AA, 48% Aa, 16% aa.",
        tipOrTrap: "Extract q first, then p, then calculate 2pq.",
      },
    ],
  },
  ...BIOLOGY_THEOREMS,
  ...CHEMISTRY_THEOREMS,
  ...MATH_THEOREMS,
  ...PHYSICS_WAVE1_DERIVATIONS,
  ...PHYSICS_WAVE2A_DERIVATIONS,
  ...PHYSICS_WAVE2B_DERIVATIONS,
  ...PHYSICS_WAVE2C_DERIVATIONS,
  ...CHEM_BIO_WAVE2_DERIVATIONS,
  ...MATH_WAVE2_DERIVATIONS,
  ...THEOREM_FILL_PHYSICS_1,
  ...THEOREM_FILL_PHYSICS_2,
  ...THEOREM_FILL_CHEM_1,
  ...THEOREM_FILL_CHEM_1B,
  ...THEOREM_FILL_CHEM_2,
  ...THEOREM_FILL_BIO_MATH,
  ...THEOREM_FILL_FINAL,
];
