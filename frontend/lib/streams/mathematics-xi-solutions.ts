/**
 * Mathematics XI — Exercise Solutions & Conceptual Bank registry.
 *
 * The published documents live as self-contained HTML files in
 * `frontend/public/resources/mathematics-xi/` and are served straight from
 * the `public/` root (no build step). This module is the single source of
 * truth for the reading surface at `/resources/mathematics-xi`.
 *
 * Content rule: every unit of the official NEB Mathematics XI (Mat. 007)
 * syllabus has exactly one document, in curriculum order. The question
 * counts below are the published totals per document (exercises solved,
 * conceptual 2-mark items, long-answer 4–6-mark items) and are kept in sync
 * with the files by `frontend/tests/lib/mathematics-xi-solutions.test.ts`.
 */

export interface MathXiSolutionUnit {
  /** Syllabus unit id — matches `frontend/lib/core/syllabus.ts`. */
  unitId: string;
  /** Unit number in curriculum order. */
  unitNo: number;
  /** Official NEB unit title. */
  unitName: string;
  /** Teaching hours allocated by the curriculum. */
  hours: number;
  /** File name inside `public/resources/mathematics-xi/`. */
  file: string;
  /** One-sentence statement of what the document covers. */
  summary: string;
  /** Exercise groups worked in the document, in order. */
  sections: string[];
  /** Solved exercise items. */
  exerciseCount: number;
  /** Conceptual 2-mark questions with model answers. */
  conceptualCount: number;
  /** Fully worked 4–6 mark long answers. */
  longAnswerCount: number;
  /** Reasoning drills (why / what / where) — not routine exercise work. */
  drillCount: number;
}

export const MATHEMATICS_XI_BASE = "/resources/mathematics-xi";

export const MATHEMATICS_XI_SOLUTIONS = {
  title: "Mathematics XI — Exercise Solutions & Conceptual Bank",
  course: "NEB Grade 11 · Mathematics (Mat. 007)",
  subtitle:
    "Every exercise worked out in NEB answer style, plus the short conceptual questions the paper actually asks — one document per syllabus unit, in curriculum order.",
  totalItems: 964,
} as const;

export const MATHEMATICS_XI_UNITS: MathXiSolutionUnit[] = [
  {
    unitId: "algebra",
    unitNo: 1,
    unitName: "Algebra",
    hours: 44,
    file: "unit-01-algebra.html",
    summary:
      "Logic and sets, real numbers and modulus, functions and inverses, curve sketching, sequences and series, matrices and determinants, quadratic equations and complex numbers.",
    sections: [
      "Logic and sets",
      "Real numbers, intervals and absolute value",
      "Functions: domain, range, composite, inverse",
      "Curve sketching, odd/even and periodicity",
      "Sequence and series",
      "Matrices and determinants",
      "Quadratic equations",
      "Complex numbers",
      "Topic-by-topic extension",
      "Concept drills: why, what, where",
      "Mixed question types",
    ],
    exerciseCount: 130,
    conceptualCount: 50,
    longAnswerCount: 9,
    drillCount: 12,
  },
  {
    unitId: "trigonometry",
    unitNo: 2,
    unitName: "Trigonometry",
    hours: 12,
    file: "unit-02-trigonometry.html",
    summary:
      "Principal values of the inverse circular functions, combination formulae, and trigonometric equations with general values and interval restrictions.",
    sections: [
      "Principal values",
      "Combination formulae",
      "General values of equations",
      "Equations restricted to an interval",
      "Topic-by-topic extension",
      "Concept drills: why, what, where",
      "Mixed question types",
    ],
    exerciseCount: 66,
    conceptualCount: 46,
    longAnswerCount: 7,
    drillCount: 12,
  },
  {
    unitId: "analytic-geometry",
    unitNo: 3,
    unitName: "Analytic Geometry",
    hours: 20,
    file: "unit-03-analytic-geometry.html",
    summary:
      "Perpendicular distance from a point to a line, the two angle bisectors, pairs of straight lines through the origin, and 3-D coordinates with direction cosines and ratios.",
    sections: [
      "Distance and angle bisectors",
      "Pair of straight lines",
      "Coordinates in space",
      "Topic-by-topic extension",
      "Concept drills: why, what, where",
      "Mixed question types",
    ],
    exerciseCount: 54,
    conceptualCount: 33,
    longAnswerCount: 6,
    drillCount: 12,
  },
  {
    unitId: "vectors",
    unitNo: 4,
    unitName: "Vectors",
    hours: 12,
    file: "unit-04-vectors.html",
    summary:
      "Vector algebra with dot and cross products, collinear and coplanar tests, and linear combination, dependence and independence questions solved by component equations.",
    sections: [
      "Vector algebra and products",
      "Collinear and coplanar vectors",
      "Linear combination and independence",
      "Topic-by-topic extension",
      "Concept drills: why, what, where",
      "Mixed question types",
    ],
    exerciseCount: 56,
    conceptualCount: 36,
    longAnswerCount: 5,
    drillCount: 12,
  },
  {
    unitId: "statistics-and-probability",
    unitNo: 5,
    unitName: "Statistics and Probability",
    hours: 12,
    file: "unit-05-statistics-probability.html",
    summary:
      "Range, variance and standard deviation, coefficient of variation, Karl Pearson's skewness, and probability by the addition, multiplication and independence laws.",
    sections: [
      "Dispersion, CV and skewness",
      "Mathematical and empirical probability",
      "Addition, multiplication and independence",
      "Topic-by-topic extension",
      "Concept drills: why, what, where",
      "Mixed question types",
    ],
    exerciseCount: 58,
    conceptualCount: 40,
    longAnswerCount: 6,
    drillCount: 12,
  },
  {
    unitId: "calculus",
    unitNo: 6,
    unitName: "Calculus",
    hours: 48,
    file: "unit-06-calculus.html",
    summary:
      "Limits and indeterminate forms, continuity, first-principles and rule-based differentiation, implicit, parametric and higher-order derivatives, extrema and tangents, then integration, definite integrals and area.",
    sections: [
      "Limits and indeterminate forms",
      "Continuity and discontinuity",
      "First principles",
      "Rules of differentiation",
      "Implicit, parametric, higher order",
      "Monotonicity, extrema, tangents, concavity",
      "Anti-derivatives",
      "Definite integrals and area",
      "Topic-by-topic extension",
      "Concept drills: why, what, where",
      "Mixed question types",
    ],
    exerciseCount: 126,
    conceptualCount: 42,
    longAnswerCount: 8,
    drillCount: 12,
  },
  {
    unitId: "computational-methods-or-mechanics",
    unitNo: 7,
    unitName: "Computational Methods or Mechanics",
    hours: 12,
    file: "unit-07-computational-methods.html",
    summary:
      "Bisection and Newton-Raphson root finding, trapezoidal and Simpson's rules with full tables, plus statics (resultant and resolution of forces) and uniform-acceleration dynamics.",
    sections: [
      "Bisection method",
      "Newton-Raphson method",
      "Trapezoidal rule",
      "Simpson's one-third rule",
      "Statics: forces",
      "Dynamics: kinematics",
      "Topic-by-topic extension",
      "Concept drills: why, what, where",
      "Mixed question types",
    ],
    exerciseCount: 60,
    conceptualCount: 36,
    longAnswerCount: 6,
    drillCount: 12,
  },
];

/** Public URL of a unit document (served from `public/`). */
export function mathXiSolutionUrl(unit: Pick<MathXiSolutionUnit, "file">): string {
  return `/resources/mathematics-xi/${unit.file}`;
}

/** Physical path used by tests to verify the published document exists. */
export function mathXiSolutionPath(unit: Pick<MathXiSolutionUnit, "file">): string {
  return `public/resources/mathematics-xi/${unit.file}`;
}

export function getMathXiUnit(unitId: string): MathXiSolutionUnit | undefined {
  return MATHEMATICS_XI_UNITS.find((unit) => unit.unitId === unitId);
}

export const MATHEMATICS_XI_TOTALS = {
  units: MATHEMATICS_XI_UNITS.length,
  hours: MATHEMATICS_XI_UNITS.reduce((sum, unit) => sum + unit.hours, 0),
  exercises: MATHEMATICS_XI_UNITS.reduce((sum, unit) => sum + unit.exerciseCount, 0),
  conceptual: MATHEMATICS_XI_UNITS.reduce((sum, unit) => sum + unit.conceptualCount, 0),
  longAnswers: MATHEMATICS_XI_UNITS.reduce((sum, unit) => sum + unit.longAnswerCount, 0),
  drills: MATHEMATICS_XI_UNITS.reduce((sum, unit) => sum + unit.drillCount, 0),
};
