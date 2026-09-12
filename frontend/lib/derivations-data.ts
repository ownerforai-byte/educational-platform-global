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
];
