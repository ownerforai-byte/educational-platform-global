/**
 * Mathematics XI — chapter workbook registry.
 *
 * GENERATED FILE — do not edit by hand.
 * Rebuild with: node content-tools/math-xi-workbook/build.mjs
 *
 * One entry per chapter document under
 * `frontend/public/resources/mathematics-xi/chapters/<slug>.html`.
 * Every question count below is emitted from the source data, and
 * `frontend/tests/lib/math-xi-workbook.test.ts` re-checks each count against
 * the rendered HTML.
 */

export const MATH_XI_WORKBOOK_BASE = "/resources/mathematics-xi/chapters";
export const MATH_XI_QUESTIONS_PER_SHEET = 12;
export const MATH_XI_HARD_PER_SHEET = 6;
export const MATH_XI_LONG_PER_SHEET = 1;
export const MATH_XI_PAPER_MARKS = 75;

/** Shape of the NEB paper — 11 × 1, 8 × 5, 3 × 8 marks. */
export const MATH_XI_PAPER_GROUPS = [
  { key: "A", label: "Group A — Tick the correct option", per: 1, count: 11 },
  { key: "B", label: "Group B — Short answer questions", per: 5, count: 8 },
  { key: "C", label: "Group C — Long answer questions", per: 8, count: 3 },
] as const;

/** One NEB model paper per unit. */
export const MATH_XI_PAPERS = [
  { unitNo: 1, title: "Unit 1 — Algebra", unitName: "Algebra", questionCount: 22, marks: 75 },
  { unitNo: 2, title: "Unit 2 — Trigonometry", unitName: "Trigonometry", questionCount: 22, marks: 75 },
  { unitNo: 3, title: "Unit 3 — Analytic Geometry", unitName: "Analytic Geometry", questionCount: 22, marks: 75 },
  { unitNo: 4, title: "Unit 4 — Vectors", unitName: "Vectors", questionCount: 22, marks: 75 },
  { unitNo: 5, title: "Unit 5 — Statistics and Probability", unitName: "Statistics and Probability", questionCount: 22, marks: 75 },
  { unitNo: 6, title: "Unit 6 — Calculus", unitName: "Calculus", questionCount: 22, marks: 75 },
  { unitNo: 7, title: "Unit 7 — Computational Methods and Mechanics", unitName: "Computational Methods or Mechanics", questionCount: 22, marks: 75 },
] as const;

export interface MathXiChapter {
  /** URL and file slug. */
  slug: string;
  /** Curriculum code, e.g. `3.2`. */
  code: string;
  /** Syllabus unit id — matches `frontend/lib/core/syllabus.ts`. */
  unitId: string;
  unitNo: number;
  unitName: string;
  title: string;
  /** Sub-topics covered by the chapter sheet, in teaching order. */
  topics: string[];
  /** Solved questions with NEB-style answers. */
  questionCount: number;
  /** A4 sheets (12 questions each) produced for the chapter. */
  sheetCount: number;
  /** Hardest-question problems (hint ladder + full solution). 0 when unauthored. */
  hardCount: number;
  /** A4 hard sheets (6 problems each). */
  hardSheetCount: number;
  /** Full-length NEB answers (one per A4 page). 0 when unauthored. */
  longCount: number;
  longSheetCount: number;
}

export const MATH_XI_CHAPTERS: MathXiChapter[] = [
  {
    slug: "logic-and-sets",
    code: "1.1",
    unitId: "algebra",
    unitNo: 1,
    unitName: "Algebra",
    title: "Logic and Sets",
    topics: ["Statements and connectives","Truth values","Sets and Venn diagrams","Cardinality"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "real-numbers-modulus",
    code: "1.2",
    unitId: "algebra",
    unitNo: 1,
    unitName: "Algebra",
    title: "Real Numbers, Intervals and Modulus",
    topics: ["Modulus and distance","Intervals","Surds and rationalisation","Inequalities"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "functions",
    code: "1.3",
    unitId: "algebra",
    unitNo: 1,
    unitName: "Algebra",
    title: "Functions: Domain, Range, Composite and Inverse",
    topics: ["Domain and range","Composite functions","Inverse functions","Graphs and extrema"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "curve-sketching",
    code: "1.4",
    unitId: "algebra",
    unitNo: 1,
    unitName: "Algebra",
    title: "Curve Sketching, Odd/Even and Periodicity",
    topics: ["Odd and even functions","Periodicity","Standard curves","Transformations"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "sequence-and-series",
    code: "1.5",
    unitId: "algebra",
    unitNo: 1,
    unitName: "Algebra",
    title: "Sequence and Series",
    topics: ["Arithmetic progression","Geometric progression","Sums to n and to infinity","Means"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "matrices-and-determinants",
    code: "1.6",
    unitId: "algebra",
    unitNo: 1,
    unitName: "Algebra",
    title: "Matrices and Determinants",
    topics: ["Algebra of matrices","Determinants","Inverse of a matrix","Solving systems"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "quadratic-equations",
    code: "1.7",
    unitId: "algebra",
    unitNo: 1,
    unitName: "Algebra",
    title: "Quadratic Equations",
    topics: ["Roots and coefficients","Nature of roots","Forming equations","Applications"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "complex-numbers",
    code: "1.8",
    unitId: "algebra",
    unitNo: 1,
    unitName: "Algebra",
    title: "Complex Numbers",
    topics: ["Algebra of complex numbers","Modulus and argument","Polar form","Roots and equations"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "inverse-circular-functions",
    code: "2.1",
    unitId: "trigonometry",
    unitNo: 2,
    unitName: "Trigonometry",
    title: "Inverse Circular Functions",
    topics: ["Principal values","Inverse identities","Composition with trig functions","Simple equations"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "combination-formulae",
    code: "2.2",
    unitId: "trigonometry",
    unitNo: 2,
    unitName: "Trigonometry",
    title: "Trigonometric Combination Formulae",
    topics: ["Addition and subtraction","Double and half angles","Product-to-sum","Conditional identities"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "general-values",
    code: "2.3",
    unitId: "trigonometry",
    unitNo: 2,
    unitName: "Trigonometry",
    title: "General Values of Trigonometric Equations",
    topics: ["sin θ = k","cos θ = k","tan θ = k","Equations reducible to quadratics"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "interval-equations",
    code: "2.4",
    unitId: "trigonometry",
    unitNo: 2,
    unitName: "Trigonometry",
    title: "Equations Restricted to an Interval",
    topics: ["Linear equations","Quadratic equations","Multiple angles","Mixed equations"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "distance-and-bisectors",
    code: "3.1",
    unitId: "analytic-geometry",
    unitNo: 3,
    unitName: "Analytic Geometry",
    title: "Perpendicular Distance and Angle Bisectors",
    topics: ["Perpendicular distance","Distance between parallel lines","Angle bisectors","Bisector of a given region"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "pair-of-straight-lines",
    code: "3.2",
    unitId: "analytic-geometry",
    unitNo: 3,
    unitName: "Analytic Geometry",
    title: "Pair of Straight Lines",
    topics: ["Homogeneous pairs","Angle between a pair","Condition for a real pair","Slopes and special cases"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "coordinates-in-space",
    code: "3.3",
    unitId: "analytic-geometry",
    unitNo: 3,
    unitName: "Analytic Geometry",
    title: "Coordinates in Space",
    topics: ["Distance and section formulae","Direction cosines and ratios","Angle between lines","Parallel and perpendicular tests"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "vector-algebra-products",
    code: "4.1",
    unitId: "vectors",
    unitNo: 4,
    unitName: "Vectors",
    title: "Vector Algebra, Dot and Cross Products",
    topics: ["Magnitude and unit vector","Dot product","Cross product","Area, angle and projection"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "collinear-coplanar",
    code: "4.2",
    unitId: "vectors",
    unitNo: 4,
    unitName: "Vectors",
    title: "Collinear and Coplanar Vectors",
    topics: ["Collinearity","Coplanarity by triple product","Perpendicular and unit vectors","Volume applications"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "linear-combination",
    code: "4.3",
    unitId: "vectors",
    unitNo: 4,
    unitName: "Vectors",
    title: "Linear Combination, Dependence and Independence",
    topics: ["Linear combination","Dependence and independence","Basis in the plane and in space","Vector proofs"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "dispersion-cv-skewness",
    code: "5.1",
    unitId: "statistics-and-probability",
    unitNo: 5,
    unitName: "Statistics and Probability",
    title: "Dispersion, Variation and Skewness",
    topics: ["Range and mean deviation","Variance and standard deviation","Coefficient of variation","Skewness"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "probability-basics",
    code: "5.2",
    unitId: "statistics-and-probability",
    unitNo: 5,
    unitName: "Statistics and Probability",
    title: "Mathematical and Empirical Probability",
    topics: ["Sample space","Classical probability","Complementary events","Empirical probability"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "addition-multiplication-laws",
    code: "5.3",
    unitId: "statistics-and-probability",
    unitNo: 5,
    unitName: "Statistics and Probability",
    title: "Addition, Multiplication and Independence",
    topics: ["Addition law","Multiplication law","Independence","Conditional probability"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "limits",
    code: "6.1",
    unitId: "calculus",
    unitNo: 6,
    unitName: "Calculus",
    title: "Limits and Indeterminate Forms",
    topics: ["Direct substitution","Indeterminate forms","Standard limits","Limits at infinity"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "continuity",
    code: "6.2",
    unitId: "calculus",
    unitNo: 6,
    unitName: "Calculus",
    title: "Continuity and Discontinuity",
    topics: ["Continuity at a point","Types of discontinuity","Finding constants","Continuity and differentiability"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "first-principles",
    code: "6.3",
    unitId: "calculus",
    unitNo: 6,
    unitName: "Calculus",
    title: "Derivatives from First Principles",
    topics: ["The definition","Polynomials","Rational and root functions","Trigonometric functions"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "differentiation-rules",
    code: "6.4",
    unitId: "calculus",
    unitNo: 6,
    unitName: "Calculus",
    title: "Rules of Differentiation",
    topics: ["Power and sum","Product and quotient","Chain rule","Exponential, log and trig"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "implicit-parametric-higher",
    code: "6.5",
    unitId: "calculus",
    unitNo: 6,
    unitName: "Calculus",
    title: "Implicit, Parametric and Higher-Order Derivatives",
    topics: ["Implicit differentiation","Parametric differentiation","Second derivatives","Motion and rates"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "extrema-tangents",
    code: "6.6",
    unitId: "calculus",
    unitNo: 6,
    unitName: "Calculus",
    title: "Monotonicity, Extrema, Tangents and Concavity",
    topics: ["Increasing and decreasing","Maxima and minima","Tangents and normals","Concavity and absolute extrema"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "anti-derivatives",
    code: "6.7",
    unitId: "calculus",
    unitNo: 6,
    unitName: "Calculus",
    title: "Anti-derivatives",
    topics: ["Standard integrals","Substitution","By parts","Trigonometric integrals"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "definite-integrals-area",
    code: "6.8",
    unitId: "calculus",
    unitNo: 6,
    unitName: "Calculus",
    title: "Definite Integrals and Area",
    topics: ["Evaluation","Properties","Area under a curve","Area between curves"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "bisection-method",
    code: "7.1",
    unitId: "computational-methods-or-mechanics",
    unitNo: 7,
    unitName: "Computational Methods or Mechanics",
    title: "Bisection Method",
    topics: ["Sign-change test","Bisection steps","Iteration tables","Accuracy and error"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "newton-raphson-method",
    code: "7.2",
    unitId: "computational-methods-or-mechanics",
    unitNo: 7,
    unitName: "Computational Methods or Mechanics",
    title: "Newton–Raphson Method",
    topics: ["The formula","Iteration steps","Convergence","Comparison with bisection"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "trapezoidal-rule",
    code: "7.3",
    unitId: "computational-methods-or-mechanics",
    unitNo: 7,
    unitName: "Computational Methods or Mechanics",
    title: "Trapezoidal Rule",
    topics: ["The formula","Building the table","Error behaviour","Comparing with the exact value"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "simpson-rule",
    code: "7.4",
    unitId: "computational-methods-or-mechanics",
    unitNo: 7,
    unitName: "Computational Methods or Mechanics",
    title: "Simpson's One-Third Rule",
    topics: ["The formula","Odd/even strip requirement","Error order","Comparing with the trapezoidal rule"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "statics-forces",
    code: "7.5",
    unitId: "computational-methods-or-mechanics",
    unitNo: 7,
    unitName: "Computational Methods or Mechanics",
    title: "Statics: Resultant and Resolution of Forces",
    topics: ["Resolution of a force","Resultant of two forces","Equilibrium","Applied problems"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
  {
    slug: "dynamics-kinematics",
    code: "7.6",
    unitId: "computational-methods-or-mechanics",
    unitNo: 7,
    unitName: "Computational Methods or Mechanics",
    title: "Dynamics: Uniform Acceleration",
    topics: ["The three equations","Free fall","Retardation","Multi-stage motion"],
    questionCount: 24,
    sheetCount: 2,
    hardCount: 6,
    hardSheetCount: 1,
    longCount: 1,
    longSheetCount: 1,
  },
];

export const MATH_XI_WORKBOOK_TOTALS = {
  chapters: MATH_XI_CHAPTERS.length,
  units: new Set(MATH_XI_CHAPTERS.map((chapter) => chapter.unitId)).size,
  questions: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.questionCount, 0),
  sheets: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.sheetCount, 0),
  perSheet: MATH_XI_QUESTIONS_PER_SHEET,
  hardChapters: MATH_XI_CHAPTERS.filter((chapter) => chapter.hardCount > 0).length,
  hardQuestions: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.hardCount, 0),
  hardSheets: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.hardSheetCount, 0),
  hardPerSheet: MATH_XI_HARD_PER_SHEET,
  longChapters: MATH_XI_CHAPTERS.filter((chapter) => chapter.longCount > 0).length,
  longQuestions: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.longCount, 0),
  longSheets: MATH_XI_CHAPTERS.reduce((sum, chapter) => sum + chapter.longSheetCount, 0),
  longPerSheet: MATH_XI_LONG_PER_SHEET,
};

export function mathXiHardUrl(chapter: Pick<MathXiChapter, "slug">): string {
  return `${MATH_XI_WORKBOOK_BASE}/hard/${chapter.slug}.html`;
}

export function mathXiHardPath(chapter: Pick<MathXiChapter, "slug">): string {
  return `public/resources/mathematics-xi/chapters/hard/${chapter.slug}.html`;
}

export function mathXiHardChapters(): MathXiChapter[] {
  return MATH_XI_CHAPTERS.filter((chapter) => chapter.hardCount > 0);
}

export function mathXiLongUrl(chapter: Pick<MathXiChapter, "slug">): string {
  return `${MATH_XI_WORKBOOK_BASE}/long/${chapter.slug}.html`;
}

export function mathXiLongPath(chapter: Pick<MathXiChapter, "slug">): string {
  return `public/resources/mathematics-xi/chapters/long/${chapter.slug}.html`;
}

export function mathXiLongChapters(): MathXiChapter[] {
  return MATH_XI_CHAPTERS.filter((chapter) => chapter.longCount > 0);
}

export function mathXiPaperUrl(unitNo: number): string {
  return `${MATH_XI_WORKBOOK_BASE}/papers/unit-${String(unitNo).padStart(2, "0")}.html`;
}

export function mathXiPaperPath(unitNo: number): string {
  return `public/resources/mathematics-xi/chapters/papers/unit-${String(unitNo).padStart(2, "0")}.html`;
}

export function mathXiChapterUrl(chapter: Pick<MathXiChapter, "slug">): string {
  return `${MATH_XI_WORKBOOK_BASE}/${chapter.slug}.html`;
}

export function mathXiChapterPath(chapter: Pick<MathXiChapter, "slug">): string {
  return `public/resources/mathematics-xi/chapters/${chapter.slug}.html`;
}

export function getMathXiChapter(slug: string): MathXiChapter | undefined {
  return MATH_XI_CHAPTERS.find((chapter) => chapter.slug === slug);
}

export function mathXiChaptersByUnit(unitNo: number): MathXiChapter[] {
  return MATH_XI_CHAPTERS.filter((chapter) => chapter.unitNo === unitNo);
}

