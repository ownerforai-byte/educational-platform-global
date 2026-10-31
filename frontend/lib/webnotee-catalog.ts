import type { Subject } from "./docs-catalog";

/**
 * WebNotee Curriculum Reference Solutions & Exercise PDFs Catalog.
 *
 * WebNotee (webnotee.com) provides exercise-by-exercise solutions and chapter
 * references for NEB Class 11 & 12 students in Nepal.
 *
 * Every document listed here is configured to open directly in the platform's
 * in-app viewer (/pdfs/read?src=...&title=...) using its embeddable Google
 * Drive preview URL or direct viewer endpoint, saving students time and
 * keeping them inside the distraction-free portal experience.
 */

export type WebnoteeDoc = {
  id: string;
  title: string;
  subject: Subject;
  unit: string;
  exercise?: string;
  driveUrl: string;
  description: string;
  source: string;
};

export const WEBNOTEE_DOCS: WebnoteeDoc[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // ── Mathematics (Class 11 Curriculum Exercises) ──────────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "webnotee-math-ex1.1",
    title: "Exercise 1.1 — Logic, Sets and Real Numbers",
    subject: "Mathematics",
    unit: "Algebra",
    exercise: "Ex 1.1",
    driveUrl: "https://drive.google.com/file/d/18dLnNxv2ymykLKsa5Qwr1rQh8LsI_o3r/preview",
    description: "Statements, logical connectives, truth tables, and real number field properties.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex2.1",
    title: "Exercise 2.1 — Functions (Domain, Range & Types)",
    subject: "Mathematics",
    unit: "Functions",
    exercise: "Ex 2.1",
    driveUrl: "https://drive.google.com/file/d/18ynkIlnes7uXUrYMpr0Lct7ynuXAZVwO/preview",
    description: "Domain, range, value of a function, and classification of algebraic functions.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex2.2",
    title: "Exercise 2.2 — Composite and Inverse Functions",
    subject: "Mathematics",
    unit: "Functions",
    exercise: "Ex 2.2",
    driveUrl: "https://drive.google.com/file/d/190PXn0rSfQQ8SRbG3fCYoimvcrhhZHIj/preview",
    description: "Finding inverses, composite mappings f(g(x)), and algebraic properties.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex2.3",
    title: "Exercise 2.3 — Transcendental Functions",
    subject: "Mathematics",
    unit: "Functions",
    exercise: "Ex 2.3",
    driveUrl: "https://drive.google.com/file/d/194eNJqBngCR5o_zbcZ0exFCXJaOso3Ob/preview",
    description: "Trigonometric, logarithmic, and exponential functions with domain analysis.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex3.1",
    title: "Exercise 3.1 — Curve Sketching",
    subject: "Mathematics",
    unit: "Curve Sketching",
    exercise: "Ex 3.1",
    driveUrl: "https://drive.google.com/file/d/15QQAJxSUYiKmcuaLSWS_Ewo5Ps7nzn9w/preview",
    description: "Even/odd functions, symmetry, periodicity, monotonicity, and curve plotting.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex4.1",
    title: "Exercise 4.1 — Sequences (AP, GP, HP)",
    subject: "Mathematics",
    unit: "Sequences & Series",
    exercise: "Ex 4.1",
    driveUrl: "https://drive.google.com/file/d/1IHGvx_rmJ7vgsWns1bqGTyL_IMdQ7RUG/preview",
    description: "Arithmetic, geometric, and harmonic sequences; finding general nth terms.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex4.2",
    title: "Exercise 4.2 — Series & Means",
    subject: "Mathematics",
    unit: "Sequences & Series",
    exercise: "Ex 4.2",
    driveUrl: "https://drive.google.com/file/d/1N9HP7ZfGL4vPCIEv_5xFYHZyIQ_x3JAv/preview",
    description: "Summation of series, A.M., G.M., H.M. relations, and infinite geometric series.",
    source: "WebNotee.com",
  },
  
  
  
  {
    id: "webnotee-math-ex6.1",
    title: "Exercise 6.1 — Quadratic Equations (Roots & Discriminant)",
    subject: "Mathematics",
    unit: "Quadratic Equations",
    exercise: "Ex 6.1",
    driveUrl: "https://drive.google.com/file/d/1f_c0UjCEB2k6ibaIOKKQhiSvXfJAmLaO/preview",
    description: "Nature of roots, discriminant analysis, and relations between roots and coefficients.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex6.2",
    title: "Exercise 6.2 — Quadratic Equations (Formation & Symmetric Roots)",
    subject: "Mathematics",
    unit: "Quadratic Equations",
    exercise: "Ex 6.2",
    driveUrl: "https://drive.google.com/file/d/1flIIoFOv5jlGQdu-Fzfs6Gf4HRCrh6VA/preview",
    description: "Equation formation from specified roots and symmetric expressions of roots.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex6.3",
    title: "Exercise 6.3 — Quadratic Equations (Inequalities)",
    subject: "Mathematics",
    unit: "Quadratic Equations",
    exercise: "Ex 6.3",
    driveUrl: "https://drive.google.com/file/d/1fpcYpvdGjs1XznNjLfQwQ8ZIDIZvahHN/preview",
    description: "Quadratic inequalities, sign charts, and location of roots on the real line.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex7.1",
    title: "Exercise 7.1 — Complex Numbers (Algebra & Modulus)",
    subject: "Mathematics",
    unit: "Complex Numbers",
    exercise: "Ex 7.1",
    driveUrl: "https://drive.google.com/file/d/1lHI5f50Nh0j5XABla38VqSa9tOPG9-uG/preview",
    description: "Imaginary unit, algebraic operations, conjugate, and modulus of complex numbers.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex7.2",
    title: "Exercise 7.2 — Complex Numbers (Geometric Representation)",
    subject: "Mathematics",
    unit: "Complex Numbers",
    exercise: "Ex 7.2",
    driveUrl: "https://drive.google.com/file/d/1lItRW2_216i39rItR1MNFaixJOsb-Q_n/preview",
    description: "Argand plane, polar representation, and calculating square roots of complex numbers.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex9.1",
    title: "Exercise 9.1 — Analytical Geometry (Straight Lines)",
    subject: "Mathematics",
    unit: "Analytic Geometry",
    exercise: "Ex 9.1",
    driveUrl: "https://drive.google.com/file/d/1D-kZXzO-LbPL9jZkPIAXCV6zjhJknlzt/preview",
    description: "Equations of straight lines, slope-intercept, double-intercept, normal form, concurrency.",
    source: "WebNotee.com",
  },
  
  
  
  {
    id: "webnotee-math-ex15.1",
    title: "Exercise 15.1 — Function & Limits Review",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 15.1",
    driveUrl: "https://drive.google.com/file/d/1AzJClQ9yS-1cbHLjgU5HEO4DrlyEdh6x/preview",
    description: "Review of functions, domain, range, and foundational limit evaluations.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex15.2",
    title: "Exercise 15.2 — Trigonometric Limits",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 15.2",
    driveUrl: "https://drive.google.com/file/d/1BHRefOfe4aUssh4OdLDf4SvciIuxRgyr/preview",
    description: "Limits of sin, cos, tan functions, squeeze theorem, and standard limit formulas.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex15.3",
    title: "Exercise 15.3 — Continuity",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 15.3",
    driveUrl: "https://drive.google.com/file/d/1BNiGWmNx2Br1hJf9bL0fsrXmAs8a6ctW/preview",
    description: "Right-hand limit, left-hand limit, continuity tests, and types of discontinuity.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex16.1",
    title: "Exercise 16.1 — Derivative by First Principles",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 16.1",
    driveUrl: "https://drive.google.com/file/d/1FGWhIJhsNnPSKHHsb2DGnIdN-0fU1HiZ/preview",
    description: "First principles limit definition of derivative and worked step-by-step proofs.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex16.2",
    title: "Exercise 16.2 — Rules of Differentiation",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 16.2",
    driveUrl: "https://drive.google.com/file/d/1G0SVNMbjGcN-JYQSMwt2kgcigfbnyqSJ/preview",
    description: "Power rule, product rule, quotient rule, and chain rule differentiation.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex16.3",
    title: "Exercise 16.3 — Trigonometric, Exponential & Logarithmic Derivatives",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 16.3",
    driveUrl: "https://drive.google.com/file/d/1-TdxCLUdfCGzqvklQyNoRICAObWhMJjE/preview",
    description: "Derivatives of trigonometric, exponential (eˣ), and logarithmic (ln x) functions.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex17",
    title: "Exercise 17 — Application of Derivatives",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 17",
    driveUrl: "https://drive.google.com/file/d/18H5WZC7V3TJck4nFUz3R7mlcQJcTNHEk/preview",
    description: "Tangent and normal equations, increasing/decreasing functions, local maxima and minima, rate of change.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex18.1",
    title: "Exercise 18.1 — Introduction to Antiderivatives",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 18.1",
    driveUrl: "https://drive.google.com/file/d/159Tkm10QwCAz5ph3f97Eem8-4i_sbzXU/preview",
    description: "Concept of antiderivatives, indefinite integration notation, and fundamental rules.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex18.2",
    title: "Exercise 18.2 — Standard Antiderivatives",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 18.2",
    driveUrl: "https://drive.google.com/file/d/15OsIsDIeTHyReGJalzNdoJyIF8eD1uIs/preview",
    description: "Power rule for integration, reciprocal integration (1/x), exponential and trigonometric antiderivatives.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex18.3",
    title: "Exercise 18.3 — Simple Integration Techniques",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 18.3",
    driveUrl: "https://drive.google.com/file/d/15YVrgYOnWAfqkt9oAtXIn33_px80lKXj/preview",
    description: "Integration by substitution, polynomial integration, and algebraic simplifications.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex18.4",
    title: "Exercise 18.4 — Definite Integrals",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 18.4",
    driveUrl: "https://drive.google.com/file/d/15bSLTd8jMvbTD4B1Satk7Hp-NRuRZDjl/preview",
    description: "Fundamental Theorem of Calculus, evaluating limits of integration, geometric area.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex18.5",
    title: "Exercise 18.5 — Area Under Curve",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 18.5",
    driveUrl: "https://drive.google.com/file/d/15eivB-jnJX7TmCObRyQ7m0r9QDRQSMO3/preview",
    description: "Computing area between curves and axes using definite integrals.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex18.6",
    title: "Exercise 18.6 — Mixed Antiderivatives Problems",
    subject: "Mathematics",
    unit: "Calculus",
    exercise: "Ex 18.6",
    driveUrl: "https://drive.google.com/file/d/1IAXReeR_rY3UfUASOiE6fskH_KeBV1JK/preview",
    description: "Comprehensive mixed problem sets combining all antiderivative and integral methods.",
    source: "WebNotee.com",
  },
  {
    id: "webnotee-math-ex20.1",
    title: "Exercise 20.1 — Numerical Integration",
    subject: "Mathematics",
    unit: "Computational Methods",
    exercise: "Ex 20.1",
    driveUrl: "https://drive.google.com/file/d/1FQDiw_IgwErLheuBYmUTTsTMKkAzRhSZ/preview",
    description: "Trapezoidal rule and Simpson's 1/3 rule numerical approximation.",
    source: "WebNotee.com",
  },
];

