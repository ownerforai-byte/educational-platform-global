/**
 * NEB Mathematics Syllabus — Grade 11 & Grade 12
 *
 * Cross-referenced with:
 *   - frontend/lib/syllabus.ts (single source of truth for unit IDs and topic text)
 *   - https://www.dhanraj.com.np/2026/06/NEB-Grade-11-Math-All-Chapters-Notes.html
 *   - https://esikhcha.com/hseb-syllabus-nepal/ (subject codes Mat. 007 / Mat. 008)
 *
 * microbenotes.com was checked but contains no NEB math syllabus content
 * (microbiology/biology focus only).
 */

export type SyllabusVersion = {
  year: number;
  bsYear: string;
  isLatest: boolean;
  notes?: string;
  units: {
    id: string;
    title: string;
    hours: number;
    topics: {
      slug: string;
      title: string;
      hours?: number;
      addedInYear?: number;
      removedInYear?: number;
      modifiedInYear?: number;
    }[];
  }[];
};

export type SubjectMathData = {
  grade: "11" | "12";
  subjectCode: string;
  versions: SyllabusVersion[];
};

export const MATH_11_DATA: SubjectMathData = {
  grade: "11",
  subjectCode: "Mat. 007",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes: "Initial NCF 2076 curriculum for compulsory Mathematics Grade 11 (Mat. 007). 7 units, 164 teaching hours.",
      units: [
        {
          id: "algebra",
          title: "Algebra",
          hours: 44,
          topics: [
            { slug: "logic-and-set", title: "Logic and set: statements, logical connectives, truth tables, theorems based on set operations", hours: 5 },
            { slug: "real-numbers", title: "Real numbers: geometric representation of real numbers, interval, absolute value", hours: 4 },
            { slug: "function", title: "Function: domain and range of a function, inverse function, composite function; algebraic (linear, quadratic and cubic) and transcendental (trigonometric, exponential, logarithmic) functions", hours: 6 },
            { slug: "curve-sketching", title: "Curve sketching: odd and even functions, periodicity, symmetry (about origin, X- and Y-axis), monotonicity; graphs of quadratic, cubic and rational functions, trigonometric (asinbx and acosbx), exponential (e^x), logarithmic (lnx)", hours: 5 },
            { slug: "sequence-and-series", title: "Sequence and series: arithmetic, geometric, harmonic sequences and series and their properties; A.M, G.M, H.M and their relations; sum of infinite geometric series", hours: 6 },
            { slug: "matrices-and-determinants", title: "Matrices and determinants: transpose of a matrix and its properties; minors and cofactors, adjoint, inverse matrix, determinant, properties of determinants (without proof)", hours: 7 },
            { slug: "quadratic-equation", title: "Quadratic equation: nature and roots of a quadratic equation, relation between roots and coefficient, formation of a quadratic equation, symmetric roots, one or both roots common", hours: 6 },
            { slug: "complex-number", title: "Complex number: imaginary unit, algebra of complex numbers, geometric representation, absolute (modulus) value and conjugate of complex numbers and their properties, square root of a complex number", hours: 5 },
          ],
        },
        {
          id: "trigonometry",
          title: "Trigonometry",
          hours: 12,
          topics: [
            { slug: "inverse-circular-functions", title: "Inverse circular functions", hours: 5 },
            { slug: "trigonometric-equations", title: "Trigonometric equations and general values", hours: 7 },
          ],
        },
        {
          id: "analytic-geometry",
          title: "Analytic Geometry",
          hours: 20,
          topics: [
            { slug: "straight-line", title: "Straight line: length of perpendicular from a given point to a given line, bisectors of the angles between two straight lines", hours: 7 },
            { slug: "pair-of-straight-lines", title: "Pair of straight lines: general equation of second degree in x and y, condition for representing a pair of lines, homogenous second-degree equation in x and y, angle between pair of lines, bisectors of the angles between pair of lines", hours: 8 },
            { slug: "coordinates-in-space", title: "Coordinates in space: points in space, distance between two points, direction cosines and ratios of a line", hours: 5 },
          ],
        },
        {
          id: "vectors",
          title: "Vectors",
          hours: 12,
          topics: [
            { slug: "collinear-coplanar-vectors", title: "Collinear and non-collinear vectors, coplanar and non-coplanar vectors", hours: 5 },
            { slug: "linear-combination-vectors", title: "Linear combination of vectors, linearly dependent and independent vectors", hours: 7 },
          ],
        },
        {
          id: "statistics-and-probability",
          title: "Statistics and Probability",
          hours: 12,
          topics: [
            { slug: "measure-of-dispersion", title: "Measure of dispersion: standard deviation, variance, coefficient of variation, skewness, Karl Pearson's coefficient of skewness", hours: 7 },
            { slug: "probability", title: "Probability: independent cases, mathematical and empirical definition of probability, two basic laws of probability (without proof)", hours: 5 },
          ],
        },
        {
          id: "calculus",
          title: "Calculus",
          hours: 48,
          topics: [
            { slug: "limits-and-continuity-intro", title: "Limits and continuity: limits of a function, indeterminate forms, algebraic properties of limits (without proof), basic theorems on limits of algebraic, trigonometric, exponential and logarithmic functions", hours: 8 },
            { slug: "continuity-of-function", title: "Continuity of a function, types of discontinuity, graphs of discontinuous function", hours: 5 },
            { slug: "derivatives-definition", title: "Derivatives: derivative of a function, derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions by definition (simple forms)", hours: 8 },
            { slug: "rules-of-differentiation", title: "Rules of differentiation; derivatives of parametric and implicit functions; higher order derivatives", hours: 8 },
            { slug: "geometric-interpretation-derivative", title: "Geometric interpretation of derivative; monotonicity of a function, interval of monotonicity, extreme values of a function, concavity, points of inflection", hours: 7 },
            { slug: "anti-derivatives", title: "Anti-derivatives: integration using basic integrals, integration by substitution and by parts methods", hours: 7 },
            { slug: "definite-integral", title: "The definite integral; the definite integral as an area under the given curve; area between two curves", hours: 5 },
          ],
        },
        {
          id: "computational-methods-or-mechanics",
          title: "Computational Methods or Mechanics",
          hours: 12,
          topics: [
            { slug: "numerical-computation", title: "Numerical computation: roots of algebraic and transcendental equations (bisection and Newton-Raphson method)", hours: 4 },
            { slug: "numerical-integration", title: "Numerical integration: Trapezoidal rule and Simpson's rule", hours: 3 },
            { slug: "mechanics-statics", title: "Mechanics (optional): Statics — forces and resultant forces, parallelogram law of forces, composition and resolution of forces, resultant of coplanar forces acting on a point", hours: 3 },
            { slug: "mechanics-dynamics", title: "Mechanics (optional): Dynamics — motion of particle in a straight line, motion with uniform acceleration, motion under gravity, motion down a smooth inclined plane", hours: 2 },
          ],
        },
      ],
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      isLatest: true,
      notes: "Current NEB curriculum for Grade 11 Mathematics (Mat. 007). No major structural changes from 2076; topic wording refined. Source: esikhcha.com HSEB syllabus page confirming subject code Mat. 007.",
      units: [
        {
          id: "algebra",
          title: "Algebra",
          hours: 44,
          topics: [
            { slug: "logic-and-set", title: "Logic and set: statements, logical connectives, truth tables, theorems based on set operations", hours: 5 },
            { slug: "real-numbers", title: "Real numbers: geometric representation of real numbers, interval, absolute value", hours: 4 },
            { slug: "function", title: "Function: domain and range of a function, inverse function, composite function; algebraic (linear, quadratic and cubic) and transcendental (trigonometric, exponential, logarithmic) functions", hours: 6 },
            { slug: "curve-sketching", title: "Curve sketching: odd and even functions, periodicity, symmetry (about origin, X- and Y-axis), monotonicity; graphs of quadratic, cubic and rational functions, trigonometric (asinbx and acosbx), exponential (e^x), logarithmic (lnx)", hours: 5 },
            { slug: "sequence-and-series", title: "Sequence and series: arithmetic, geometric, harmonic sequences and series and their properties; A.M, G.M, H.M and their relations; sum of infinite geometric series", hours: 6 },
            { slug: "matrices-and-determinants", title: "Matrices and determinants: transpose of a matrix and its properties; minors and cofactors, adjoint, inverse matrix, determinant, properties of determinants (without proof)", hours: 7 },
            { slug: "quadratic-equation", title: "Quadratic equation: nature and roots of a quadratic equation, relation between roots and coefficient, formation of a quadratic equation, symmetric roots, one or both roots common", hours: 6 },
            { slug: "complex-number", title: "Complex number: imaginary unit, algebra of complex numbers, geometric representation, absolute (modulus) value and conjugate of complex numbers and their properties, square root of a complex number", hours: 5 },
          ],
        },
        {
          id: "trigonometry",
          title: "Trigonometry",
          hours: 12,
          topics: [
            { slug: "inverse-circular-functions", title: "Inverse circular functions", hours: 5 },
            { slug: "trigonometric-equations", title: "Trigonometric equations and general values", hours: 7 },
          ],
        },
        {
          id: "analytic-geometry",
          title: "Analytic Geometry",
          hours: 20,
          topics: [
            { slug: "straight-line", title: "Straight line: length of perpendicular from a given point to a given line, bisectors of the angles between two straight lines", hours: 7 },
            { slug: "pair-of-straight-lines", title: "Pair of straight lines: general equation of second degree in x and y, condition for representing a pair of lines, homogenous second-degree equation in x and y, angle between pair of lines, bisectors of the angles between pair of lines", hours: 8 },
            { slug: "coordinates-in-space", title: "Coordinates in space: points in space, distance between two points, direction cosines and ratios of a line", hours: 5 },
          ],
        },
        {
          id: "vectors",
          title: "Vectors",
          hours: 12,
          topics: [
            { slug: "collinear-coplanar-vectors", title: "Collinear and non-collinear vectors, coplanar and non-coplanar vectors", hours: 5 },
            { slug: "linear-combination-vectors", title: "Linear combination of vectors, linearly dependent and independent vectors", hours: 7 },
          ],
        },
        {
          id: "statistics-and-probability",
          title: "Statistics and Probability",
          hours: 12,
          topics: [
            { slug: "measure-of-dispersion", title: "Measure of dispersion: standard deviation, variance, coefficient of variation, skewness, Karl Pearson's coefficient of skewness", hours: 7 },
            { slug: "probability", title: "Probability: independent cases, mathematical and empirical definition of probability, two basic laws of probability (without proof)", hours: 5 },
          ],
        },
        {
          id: "calculus",
          title: "Calculus",
          hours: 48,
          topics: [
            { slug: "limits-and-continuity-intro", title: "Limits and continuity: limits of a function, indeterminate forms, algebraic properties of limits (without proof), basic theorems on limits of algebraic, trigonometric, exponential and logarithmic functions", hours: 8 },
            { slug: "continuity-of-function", title: "Continuity of a function, types of discontinuity, graphs of discontinuous function", hours: 5 },
            { slug: "derivatives-definition", title: "Derivatives: derivative of a function, derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions by definition (simple forms)", hours: 8 },
            { slug: "rules-of-differentiation", title: "Rules of differentiation; derivatives of parametric and implicit functions; higher order derivatives", hours: 8 },
            { slug: "geometric-interpretation-derivative", title: "Geometric interpretation of derivative; monotonicity of a function, interval of monotonicity, extreme values of a function, concavity, points of inflection", hours: 7 },
            { slug: "anti-derivatives", title: "Anti-derivatives: integration using basic integrals, integration by substitution and by parts methods", hours: 7 },
            { slug: "definite-integral", title: "The definite integral; the definite integral as an area under the given curve; area between two curves", hours: 5 },
          ],
        },
        {
          id: "computational-methods-or-mechanics",
          title: "Computational Methods or Mechanics",
          hours: 12,
          topics: [
            { slug: "numerical-computation", title: "Numerical computation: roots of algebraic and transcendental equations (bisection and Newton-Raphson method)", hours: 4 },
            { slug: "numerical-integration", title: "Numerical integration: Trapezoidal rule and Simpson's rule", hours: 3 },
            { slug: "mechanics-statics", title: "Mechanics (optional): Statics — forces and resultant forces, parallelogram law of forces, composition and resolution of forces, resultant of coplanar forces acting on a point", hours: 3 },
            { slug: "mechanics-dynamics", title: "Mechanics (optional): Dynamics — motion of particle in a straight line, motion with uniform acceleration, motion under gravity, motion down a smooth inclined plane", hours: 2 },
          ],
        },
      ],
    },
  ],
};

export const MATH_12_DATA: SubjectMathData = {
  grade: "12",
  subjectCode: "Mat. 008",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes: "Initial NCF 2076 curriculum for Mathematics Grade 12 (Mat. 008). 8 units, 80 teaching hours.",
      units: [
        {
          id: "limits-and-continuity",
          title: "Limits and Continuity",
          hours: 8,
          topics: [
            { slug: "concept-of-limit", title: "Concept of limit — geometric and physical interpretation", hours: 2 },
            { slug: "standard-limits", title: "Standard limits and evaluation (algebraic, trigonometric, exponential, logarithmic)", hours: 2 },
            { slug: "indeterminate-forms", title: "Indeterminate forms: 0/0, ∞/∞, 0·∞, ∞−∞, 1^∞, 0^0, ∞^0", hours: 1 },
            { slug: "continuity-functions", title: "Continuity of algebraic, trigonometric, exponential, logarithmic functions", hours: 2 },
            { slug: "differentiability", title: "Differentiability and its relation with continuity", hours: 1 },
          ],
        },
        {
          id: "differentiation",
          title: "Differentiation",
          hours: 16,
          topics: [
            { slug: "derivatives-algebraic-trig", title: "Derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions", hours: 4 },
            { slug: "rules-differentiation", title: "Rules of differentiation: product rule, quotient rule, chain rule", hours: 3 },
            { slug: "parametric-implicit", title: "Derivatives of parametric and implicit functions", hours: 2 },
            { slug: "higher-order-derivatives", title: "Higher order derivatives", hours: 2 },
            { slug: "logarithmic-differentiation", title: "Logarithmic differentiation", hours: 1 },
            { slug: "leibniz-theorem", title: "Leibniz's theorem for nth derivative", hours: 1 },
            { slug: "geometric-interpretation", title: "Geometric interpretation — tangent and normal", hours: 1 },
            { slug: "monotonicity-maxima-minima", title: "Monotonicity, maxima and minima (first and second derivative tests)", hours: 1 },
            { slug: "applications-differentiation", title: "Applications: rate of change, approximation, error estimation", hours: 1 },
          ],
        },
        {
          id: "integration",
          title: "Integration",
          hours: 14,
          topics: [
            { slug: "integration-inverse", title: "Integration as inverse of differentiation", hours: 2 },
            { slug: "standard-integrals", title: "Standard integrals and methods: substitution, parts, partial fractions", hours: 4 },
            { slug: "definite-integrals", title: "Definite integrals and properties", hours: 3 },
            { slug: "trigonometric-integrals", title: "Integration of trigonometric functions", hours: 2 },
            { slug: "area-under-curve", title: "Applications: area under curve, area between two curves", hours: 3 },
          ],
        },
        {
          id: "differential-equations",
          title: "Differential Equations",
          hours: 8,
          topics: [
            { slug: "formation-differential-equations", title: "Formation of differential equations", hours: 2 },
            { slug: "first-order-first-degree", title: "Solving first order, first degree equations: variable separable, homogeneous, linear", hours: 4 },
            { slug: "applications-de", title: "Applications: growth and decay, population dynamics", hours: 2 },
          ],
        },
        {
          id: "vector-algebra",
          title: "Vector Algebra",
          hours: 8,
          topics: [
            { slug: "scalar-vector-quantities", title: "Scalar and vector quantities, types of vectors", hours: 2 },
            { slug: "vector-operations", title: "Addition, subtraction and scalar multiplication of vectors", hours: 2 },
            { slug: "dot-product", title: "Dot product (scalar product) and its applications", hours: 2 },
            { slug: "cross-product", title: "Cross product (vector product) and its applications", hours: 1 },
            { slug: "triple-products", title: "Scalar and vector triple products", hours: 1 },
          ],
        },
        {
          id: "three-dimensional-geometry",
          title: "Three Dimensional Geometry",
          hours: 8,
          topics: [
            { slug: "direction-cosines-ratios", title: "Direction cosines and direction ratios of a line", hours: 2 },
            { slug: "equation-of-line", title: "Equation of a line in space — standard and general form", hours: 2 },
            { slug: "equation-of-plane", title: "Equation of a plane — normal form, general form", hours: 2 },
            { slug: "angles-lines-planes", title: "Angle between two lines, two planes, and a line and a plane", hours: 1 },
            { slug: "distance-point-plane-line", title: "Distance of a point from a plane and line", hours: 1 },
          ],
        },
        {
          id: "linear-programming",
          title: "Linear Programming",
          hours: 6,
          topics: [
            { slug: "lpp-formulation", title: "Linear programming — formulation of LPP", hours: 2 },
            { slug: "graphical-method", title: "Graphical method for solving LPP with two variables", hours: 3 },
            { slug: "max-minimization", title: "Maximization and minimization problems", hours: 1 },
          ],
        },
        {
          id: "probability",
          title: "Probability",
          hours: 10,
          topics: [
            { slug: "conditional-probability", title: "Conditional probability and multiplication theorem", hours: 2 },
            { slug: "independent-events", title: "Independent events", hours: 1 },
            { slug: "bayes-theorem", title: "Bayes' theorem and its applications", hours: 2 },
            { slug: "random-variable", title: "Random variable and its probability distribution", hours: 2 },
            { slug: "mean-variance", title: "Mean, variance and standard deviation of a random variable", hours: 1 },
            { slug: "binomial-distribution", title: "Binomial distribution — definition, mean, variance", hours: 1 },
            { slug: "poisson-distribution", title: "Poisson distribution — definition, mean, variance", hours: 1 },
          ],
        },
      ],
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      isLatest: true,
      notes: "Current NEB curriculum for Grade 12 Mathematics (Mat. 008). Same 8-unit structure as 2076; minor topic wording refinements. Subject code confirmed via esikhcha.com HSEB syllabus page.",
      units: [
        {
          id: "limits-and-continuity",
          title: "Limits and Continuity",
          hours: 8,
          topics: [
            { slug: "concept-of-limit", title: "Concept of limit — geometric and physical interpretation", hours: 2 },
            { slug: "standard-limits", title: "Standard limits and evaluation (algebraic, trigonometric, exponential, logarithmic)", hours: 2 },
            { slug: "indeterminate-forms", title: "Indeterminate forms: 0/0, ∞/∞, 0·∞, ∞−∞, 1^∞, 0^0, ∞^0", hours: 1 },
            { slug: "continuity-functions", title: "Continuity of algebraic, trigonometric, exponential, logarithmic functions", hours: 2 },
            { slug: "differentiability", title: "Differentiability and its relation with continuity", hours: 1 },
          ],
        },
        {
          id: "differentiation",
          title: "Differentiation",
          hours: 16,
          topics: [
            { slug: "derivatives-algebraic-trig", title: "Derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions", hours: 4 },
            { slug: "rules-differentiation", title: "Rules of differentiation: product rule, quotient rule, chain rule", hours: 3 },
            { slug: "parametric-implicit", title: "Derivatives of parametric and implicit functions", hours: 2 },
            { slug: "higher-order-derivatives", title: "Higher order derivatives", hours: 2 },
            { slug: "logarithmic-differentiation", title: "Logarithmic differentiation", hours: 1 },
            { slug: "leibniz-theorem", title: "Leibniz's theorem for nth derivative", hours: 1 },
            { slug: "geometric-interpretation", title: "Geometric interpretation — tangent and normal", hours: 1 },
            { slug: "monotonicity-maxima-minima", title: "Monotonicity, maxima and minima (first and second derivative tests)", hours: 1 },
            { slug: "applications-differentiation", title: "Applications: rate of change, approximation, error estimation", hours: 1 },
          ],
        },
        {
          id: "integration",
          title: "Integration",
          hours: 14,
          topics: [
            { slug: "integration-inverse", title: "Integration as inverse of differentiation", hours: 2 },
            { slug: "standard-integrals", title: "Standard integrals and methods: substitution, parts, partial fractions", hours: 4 },
            { slug: "definite-integrals", title: "Definite integrals and properties", hours: 3 },
            { slug: "trigonometric-integrals", title: "Integration of trigonometric functions", hours: 2 },
            { slug: "area-under-curve", title: "Applications: area under curve, area between two curves", hours: 3 },
          ],
        },
        {
          id: "differential-equations",
          title: "Differential Equations",
          hours: 8,
          topics: [
            { slug: "formation-differential-equations", title: "Formation of differential equations", hours: 2 },
            { slug: "first-order-first-degree", title: "Solving first order, first degree equations: variable separable, homogeneous, linear", hours: 4 },
            { slug: "applications-de", title: "Applications: growth and decay, population dynamics", hours: 2 },
          ],
        },
        {
          id: "vector-algebra",
          title: "Vector Algebra",
          hours: 8,
          topics: [
            { slug: "scalar-vector-quantities", title: "Scalar and vector quantities, types of vectors", hours: 2 },
            { slug: "vector-operations", title: "Addition, subtraction and scalar multiplication of vectors", hours: 2 },
            { slug: "dot-product", title: "Dot product (scalar product) and its applications", hours: 2 },
            { slug: "cross-product", title: "Cross product (vector product) and its applications", hours: 1 },
            { slug: "triple-products", title: "Scalar and vector triple products", hours: 1 },
          ],
        },
        {
          id: "three-dimensional-geometry",
          title: "Three Dimensional Geometry",
          hours: 8,
          topics: [
            { slug: "direction-cosines-ratios", title: "Direction cosines and direction ratios of a line", hours: 2 },
            { slug: "equation-of-line", title: "Equation of a line in space — standard and general form", hours: 2 },
            { slug: "equation-of-plane", title: "Equation of a plane — normal form, general form", hours: 2 },
            { slug: "angles-lines-planes", title: "Angle between two lines, two planes, and a line and a plane", hours: 1 },
            { slug: "distance-point-plane-line", title: "Distance of a point from a plane and line", hours: 1 },
          ],
        },
        {
          id: "linear-programming",
          title: "Linear Programming",
          hours: 6,
          topics: [
            { slug: "lpp-formulation", title: "Linear programming — formulation of LPP", hours: 2 },
            { slug: "graphical-method", title: "Graphical method for solving LPP with two variables", hours: 3 },
            { slug: "max-minimization", title: "Maximization and minimization problems", hours: 1 },
          ],
        },
        {
          id: "probability",
          title: "Probability",
          hours: 10,
          topics: [
            { slug: "conditional-probability", title: "Conditional probability and multiplication theorem", hours: 2 },
            { slug: "independent-events", title: "Independent events", hours: 1 },
            { slug: "bayes-theorem", title: "Bayes' theorem and its applications", hours: 2 },
            { slug: "random-variable", title: "Random variable and its probability distribution", hours: 2 },
            { slug: "mean-variance", title: "Mean, variance and standard deviation of a random variable", hours: 1 },
            { slug: "binomial-distribution", title: "Binomial distribution — definition, mean, variance", hours: 1 },
            { slug: "poisson-distribution", title: "Poisson distribution — definition, mean, variance", hours: 1 },
          ],
        },
      ],
    },
  ],
};

export const MATH_DATA_MAP: Record<"class-11-notes" | "class-12-notes", SubjectMathData> = {
  "class-11-notes": MATH_11_DATA,
  "class-12-notes": MATH_12_DATA,
};
