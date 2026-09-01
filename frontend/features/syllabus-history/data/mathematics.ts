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
      meaning?: string;
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
            { slug: "logic-and-set", title: "Logic and set: statements, logical connectives, truth tables, theorems based on set operations", hours: 5, meaning: "Builds the language of mathematics — how to write precise statements, combine them with 'and/or/not', and prove set identities. Essential for rigorous reasoning in every higher math course." },
            { slug: "real-numbers", title: "Real numbers: geometric representation of real numbers, interval, absolute value", hours: 4, meaning: "Places every real number on a number line and introduces intervals and absolute value as tools for measuring distance and solving inequalities used throughout calculus and physics." },
            { slug: "function", title: "Function: domain and range of a function, inverse function, composite function; algebraic (linear, quadratic and cubic) and transcendental (trigonometric, exponential, logarithmic) functions", hours: 6, meaning: "Introduces the core idea that one quantity depends on another. Students learn to analyse domains, ranges, compositions and inverses — the foundation all of calculus is built on." },
            { slug: "curve-sketching", title: "Curve sketching: odd and even functions, periodicity, symmetry (about origin, X- and Y-axis), monotonicity; graphs of quadratic, cubic and rational functions, trigonometric (asinbx and acosbx), exponential (e^x), logarithmic (lnx)", hours: 5, meaning: "Teaches students to draw accurate function graphs by spotting symmetry, period and monotonic behaviour — a visual skill heavily tested in NEB exams and used in engineering model analysis." },
            { slug: "sequence-and-series", title: "Sequence and series: arithmetic, geometric, harmonic sequences and series and their properties; A.M, G.M, H.M and their relations; sum of infinite geometric series", hours: 6, meaning: "Students learn patterns that repeat — from simple savings growth (A.P.) to compound interest (G.P.) to the sum of infinite terms, which directly connects to calculus convergence theory." },
            { slug: "matrices-and-determinants", title: "Matrices and determinants: transpose of a matrix and its properties; minors and cofactors, adjoint, inverse matrix, determinant, properties of determinants (without proof)", hours: 7, meaning: "Introduces the compact language of matrices used to solve systems of equations — a skill critical for engineering, computer graphics and physics vector analysis." },
            { slug: "quadratic-equation", title: "Quadratic equation: nature and roots of a quadratic equation, relation between roots and coefficient, formation of a quadratic equation, symmetric roots, one or both roots common", hours: 6, meaning: "Equations of the form ax²+bx+c=0. Students learn to classify roots using the discriminant and use root-coefficient relationships — foundational for conics, optimisation and physics projectile problems." },
            { slug: "complex-number", title: "Complex number: imaginary unit, algebra of complex numbers, geometric representation, absolute (modulus) value and conjugate of complex numbers and their properties, square root of a complex number", hours: 5, meaning: "Extends the number system so every polynomial has a solution. Students learn to plot complex numbers and extract roots — indispensable in electrical engineering and wave mechanics." },
          ],
        },
        {
          id: "trigonometry",
          title: "Trigonometry",
          hours: 12,
          topics: [
            { slug: "inverse-circular-functions", title: "Inverse circular functions", hours: 5, meaning: "Students learn to reverse trigonometric ratios — finding angles from sine, cosine or tangent values. This is essential for solving triangle problems and for calculus integration results." },
            { slug: "trigonometric-equations", title: "Trigonometric equations and general values", hours: 7, meaning: "Teaches how to find all possible angle solutions to equations like sin θ = ½, not just the principal value. Crucial for physics waves and oscillations and a high-weightage NEB exam topic." },
          ],
        },
        {
          id: "analytic-geometry",
          title: "Analytic Geometry",
          hours: 20,
          topics: [
            { slug: "straight-line", title: "Straight line: length of perpendicular from a given point to a given line, bisectors of the angles between two straight lines", hours: 7, meaning: "Students learn to measure shortest distances and find angle bisectors between lines — practical skills used in surveying, coordinate geometry proofs and competitive engineering entrance exams." },
            { slug: "pair-of-straight-lines", title: "Pair of straight lines: general equation of second degree in x and y, condition for representing a pair of lines, homogenous second-degree equation in x and y, angle between pair of lines, bisectors of the angles between pair of lines", hours: 8, meaning: "Generalises the line concept to two lines represented by one equation. Students find angles and bisectors between them — directly linked to conic-section theory in Grade 12." },
            { slug: "coordinates-in-space", title: "Coordinates in space: points in space, distance between two points, direction cosines and ratios of a line", hours: 5, meaning: "Extends 2D coordinates into 3D, introducing direction cosines to describe line orientation. This is the geometric language needed for vector algebra and solid mechanics." },
          ],
        },
        {
          id: "vectors",
          title: "Vectors",
          hours: 12,
          topics: [
            { slug: "collinear-coplanar-vectors", title: "Collinear and non-collinear vectors, coplanar and non-coplanar vectors", hours: 5, meaning: "Teaches when vectors lie on the same line or in the same plane — a geometric intuition needed to understand force systems in physics and 3D geometry." },
            { slug: "linear-combination-vectors", title: "Linear combination of vectors, linearly dependent and independent vectors", hours: 7, meaning: "Students learn to express vectors as combinations of others and to test independence — the gateway concept to vector spaces, used in computer science and engineering." },
          ],
        },
        {
          id: "statistics-and-probability",
          title: "Statistics and Probability",
          hours: 12,
          topics: [
            { slug: "measure-of-dispersion", title: "Measure of dispersion: standard deviation, variance, coefficient of variation, skewness, Karl Pearson's coefficient of skewness", hours: 7, meaning: "Students learn to quantify how spread out data is — variance and standard deviation are used in quality control, economics and research. Skewness tells you whether a distribution is lopsided." },
            { slug: "probability", title: "Probability: independent cases, mathematical and empirical definition of probability, two basic laws of probability (without proof)", hours: 5, meaning: "Introduces chance and uncertainty with both theoretical and experimental approaches. These two basic laws of probability are used in genetics, risk analysis and machine learning." },
          ],
        },
        {
          id: "calculus",
          title: "Calculus",
          hours: 48,
          topics: [
            { slug: "limits-and-continuity-intro", title: "Limits and continuity: limits of a function, indeterminate forms, algebraic properties of limits (without proof), basic theorems on limits of algebraic, trigonometric, exponential and logarithmic functions", hours: 8, meaning: "Limits describe what a function approaches — the single most important idea in all of calculus. Students learn standard limit results used in every derivative and integral formula." },
            { slug: "continuity-of-function", title: "Continuity of a function, types of discontinuity, graphs of discontinuous function", hours: 5, meaning: "A function is continuous if you can draw it without lifting your pen. Students classify jump, removable and infinite discontinuities — a concept required before any differentiation or integration." },
            { slug: "derivatives-definition", title: "Derivatives: derivative of a function, derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions by definition (simple forms)", hours: 8, meaning: "The derivative measures instantaneous rate of change. Students derive formulas from first principles — building the intuition needed for physics velocity/acceleration and optimisation problems." },
            { slug: "rules-of-differentiation", title: "Rules of differentiation; derivatives of parametric and implicit functions; higher order derivatives", hours: 8, meaning: "Teaches shortcut rules (product, quotient, chain) and techniques for functions given parametrically or implicitly — skills students use daily in Grade 12 calculus and engineering entrance exams." },
            { slug: "geometric-interpretation-derivative", title: "Geometric interpretation of derivative; monotonicity of a function, interval of monotonicity, extreme values of a function, concavity, points of inflection", hours: 7, meaning: "Connects the algebraic derivative to graph behaviour — where functions rise, fall, peak or flatten. Students use this for curve sketching and optimisation problems common in NEB exams." },
            { slug: "anti-derivatives", title: "Anti-derivatives: integration using basic integrals, integration by substitution and by parts methods", hours: 7, meaning: "Integration reverses differentiation. Students learn substitution and integration by parts — the two core techniques needed for every area calculation, physics work problems and differential equations." },
            { slug: "definite-integral", title: "The definite integral; the definite integral as an area under the given curve; area between two curves", hours: 5, meaning: "Turns the integral into a precise area-measuring tool. Students calculate regions between curves — a standard NEB exam question and a direct application in physics and geometry." },
          ],
        },
        {
          id: "computational-methods-or-mechanics",
          title: "Computational Methods or Mechanics",
          hours: 12,
          topics: [
            { slug: "numerical-computation", title: "Numerical computation: roots of algebraic and transcendental equations (bisection and Newton-Raphson method)", hours: 4, meaning: "Students learn iterative numerical methods to approximate roots when algebra fails — algorithms widely used in engineering software and scientific computing." },
            { slug: "numerical-integration", title: "Numerical integration: Trapezoidal rule and Simpson's rule", hours: 3, meaning: "Approximates areas under curves when exact integration is impossible. These rules are used in surveying, physics and numerical analysis courses at the university level." },
            { slug: "mechanics-statics", title: "Mechanics (optional): Statics — forces and resultant forces, parallelogram law of forces, composition and resolution of forces, resultant of coplanar forces acting on a point", hours: 3, meaning: "Studies forces in equilibrium — how multiple forces combine into a single resultant. Directly applicable to civil and mechanical engineering statics problems." },
            { slug: "mechanics-dynamics", title: "Mechanics (optional): Dynamics — motion of particle in a straight line, motion with uniform acceleration, motion under gravity, motion down a smooth inclined plane", hours: 2, meaning: "Applies mathematical equations to predict motion under gravity and on slopes — the kinematics students need for physics and engineering entrance examinations." },
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
            { slug: "logic-and-set", title: "Logic and set: statements, logical connectives, truth tables, theorems based on set operations", hours: 5, meaning: "Builds the language of mathematics — how to write precise statements, combine them with 'and/or/not', and prove set identities. Essential for rigorous reasoning in every higher math course." },
            { slug: "real-numbers", title: "Real numbers: geometric representation of real numbers, interval, absolute value", hours: 4, meaning: "Places every real number on a number line and introduces intervals and absolute value as tools for measuring distance and solving inequalities used throughout calculus and physics." },
            { slug: "function", title: "Function: domain and range of a function, inverse function, composite function; algebraic (linear, quadratic and cubic) and transcendental (trigonometric, exponential, logarithmic) functions", hours: 6, meaning: "Introduces the core idea that one quantity depends on another. Students learn to analyse domains, ranges, compositions and inverses — the foundation all of calculus is built on." },
            { slug: "curve-sketching", title: "Curve sketching: odd and even functions, periodicity, symmetry (about origin, X- and Y-axis), monotonicity; graphs of quadratic, cubic and rational functions, trigonometric (asinbx and acosbx), exponential (e^x), logarithmic (lnx)", hours: 5, meaning: "Teaches students to draw accurate function graphs by spotting symmetry, period and monotonic behaviour — a visual skill heavily tested in NEB exams and used in engineering model analysis." },
            { slug: "sequence-and-series", title: "Sequence and series: arithmetic, geometric, harmonic sequences and series and their properties; A.M, G.M, H.M and their relations; sum of infinite geometric series", hours: 6, meaning: "Students learn patterns that repeat — from simple savings growth (A.P.) to compound interest (G.P.) to the sum of infinite terms, which directly connects to calculus convergence theory." },
            { slug: "matrices-and-determinants", title: "Matrices and determinants: transpose of a matrix and its properties; minors and cofactors, adjoint, inverse matrix, determinant, properties of determinants (without proof)", hours: 7, meaning: "Introduces the compact language of matrices used to solve systems of equations — a skill critical for engineering, computer graphics and physics vector analysis." },
            { slug: "quadratic-equation", title: "Quadratic equation: nature and roots of a quadratic equation, relation between roots and coefficient, formation of a quadratic equation, symmetric roots, one or both roots common", hours: 6, meaning: "Equations of the form ax²+bx+c=0. Students learn to classify roots using the discriminant and use root-coefficient relationships — foundational for conics, optimisation and physics projectile problems." },
            { slug: "complex-number", title: "Complex number: imaginary unit, algebra of complex numbers, geometric representation, absolute (modulus) value and conjugate of complex numbers and their properties, square root of a complex number", hours: 5, meaning: "Extends the number system so every polynomial has a solution. Students learn to plot complex numbers and extract roots — indispensable in electrical engineering and wave mechanics." },
          ],
        },
        {
          id: "trigonometry",
          title: "Trigonometry",
          hours: 12,
          topics: [
            { slug: "inverse-circular-functions", title: "Inverse circular functions", hours: 5, meaning: "Students learn to reverse trigonometric ratios — finding angles from sine, cosine or tangent values. This is essential for solving triangle problems and for calculus integration results." },
            { slug: "trigonometric-equations", title: "Trigonometric equations and general values", hours: 7, meaning: "Teaches how to find all possible angle solutions to equations like sin θ = ½, not just the principal value. Crucial for physics waves and oscillations and a high-weightage NEB exam topic." },
          ],
        },
        {
          id: "analytic-geometry",
          title: "Analytic Geometry",
          hours: 20,
          topics: [
            { slug: "straight-line", title: "Straight line: length of perpendicular from a given point to a given line, bisectors of the angles between two straight lines", hours: 7, meaning: "Students learn to measure shortest distances and find angle bisectors between lines — practical skills used in surveying, coordinate geometry proofs and competitive engineering entrance exams." },
            { slug: "pair-of-straight-lines", title: "Pair of straight lines: general equation of second degree in x and y, condition for representing a pair of lines, homogenous second-degree equation in x and y, angle between pair of lines, bisectors of the angles between pair of lines", hours: 8, meaning: "Generalises the line concept to two lines represented by one equation. Students find angles and bisectors between them — directly linked to conic-section theory in Grade 12." },
            { slug: "coordinates-in-space", title: "Coordinates in space: points in space, distance between two points, direction cosines and ratios of a line", hours: 5, meaning: "Extends 2D coordinates into 3D, introducing direction cosines to describe line orientation. This is the geometric language needed for vector algebra and solid mechanics." },
          ],
        },
        {
          id: "vectors",
          title: "Vectors",
          hours: 12,
          topics: [
            { slug: "collinear-coplanar-vectors", title: "Collinear and non-collinear vectors, coplanar and non-coplanar vectors", hours: 5, meaning: "Teaches when vectors lie on the same line or in the same plane — a geometric intuition needed to understand force systems in physics and 3D geometry." },
            { slug: "linear-combination-vectors", title: "Linear combination of vectors, linearly dependent and independent vectors", hours: 7, meaning: "Students learn to express vectors as combinations of others and to test independence — the gateway concept to vector spaces, used in computer science and engineering." },
          ],
        },
        {
          id: "statistics-and-probability",
          title: "Statistics and Probability",
          hours: 12,
          topics: [
            { slug: "measure-of-dispersion", title: "Measure of dispersion: standard deviation, variance, coefficient of variation, skewness, Karl Pearson's coefficient of skewness", hours: 7, meaning: "Students learn to quantify how spread out data is — variance and standard deviation are used in quality control, economics and research. Skewness tells you whether a distribution is lopsided." },
            { slug: "probability", title: "Probability: independent cases, mathematical and empirical definition of probability, two basic laws of probability (without proof)", hours: 5, meaning: "Introduces chance and uncertainty with both theoretical and experimental approaches. These two basic laws of probability are used in genetics, risk analysis and machine learning." },
          ],
        },
        {
          id: "calculus",
          title: "Calculus",
          hours: 48,
          topics: [
            { slug: "limits-and-continuity-intro", title: "Limits and continuity: limits of a function, indeterminate forms, algebraic properties of limits (without proof), basic theorems on limits of algebraic, trigonometric, exponential and logarithmic functions", hours: 8, meaning: "Limits describe what a function approaches — the single most important idea in all of calculus. Students learn standard limit results used in every derivative and integral formula." },
            { slug: "continuity-of-function", title: "Continuity of a function, types of discontinuity, graphs of discontinuous function", hours: 5, meaning: "A function is continuous if you can draw it without lifting your pen. Students classify jump, removable and infinite discontinuities — a concept required before any differentiation or integration." },
            { slug: "derivatives-definition", title: "Derivatives: derivative of a function, derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions by definition (simple forms)", hours: 8, meaning: "The derivative measures instantaneous rate of change. Students derive formulas from first principles — building the intuition needed for physics velocity/acceleration and optimisation problems." },
            { slug: "rules-of-differentiation", title: "Rules of differentiation; derivatives of parametric and implicit functions; higher order derivatives", hours: 8, meaning: "Teaches shortcut rules (product, quotient, chain) and techniques for functions given parametrically or implicitly — skills students use daily in Grade 12 calculus and engineering entrance exams." },
            { slug: "geometric-interpretation-derivative", title: "Geometric interpretation of derivative; monotonicity of a function, interval of monotonicity, extreme values of a function, concavity, points of inflection", hours: 7, meaning: "Connects the algebraic derivative to graph behaviour — where functions rise, fall, peak or flatten. Students use this for curve sketching and optimisation problems common in NEB exams." },
            { slug: "anti-derivatives", title: "Anti-derivatives: integration using basic integrals, integration by substitution and by parts methods", hours: 7, meaning: "Integration reverses differentiation. Students learn substitution and integration by parts — the two core techniques needed for every area calculation, physics work problems and differential equations." },
            { slug: "definite-integral", title: "The definite integral; the definite integral as an area under the given curve; area between two curves", hours: 5, meaning: "Turns the integral into a precise area-measuring tool. Students calculate regions between curves — a standard NEB exam question and a direct application in physics and geometry." },
          ],
        },
        {
          id: "computational-methods-or-mechanics",
          title: "Computational Methods or Mechanics",
          hours: 12,
          topics: [
            { slug: "numerical-computation", title: "Numerical computation: roots of algebraic and transcendental equations (bisection and Newton-Raphson method)", hours: 4, meaning: "Students learn iterative numerical methods to approximate roots when algebra fails — algorithms widely used in engineering software and scientific computing." },
            { slug: "numerical-integration", title: "Numerical integration: Trapezoidal rule and Simpson's rule", hours: 3, meaning: "Approximates areas under curves when exact integration is impossible. These rules are used in surveying, physics and numerical analysis courses at the university level." },
            { slug: "mechanics-statics", title: "Mechanics (optional): Statics — forces and resultant forces, parallelogram law of forces, composition and resolution of forces, resultant of coplanar forces acting on a point", hours: 3, meaning: "Studies forces in equilibrium — how multiple forces combine into a single resultant. Directly applicable to civil and mechanical engineering statics problems." },
            { slug: "mechanics-dynamics", title: "Mechanics (optional): Dynamics — motion of particle in a straight line, motion with uniform acceleration, motion under gravity, motion down a smooth inclined plane", hours: 2, meaning: "Applies mathematical equations to predict motion under gravity and on slopes — the kinematics students need for physics and engineering entrance examinations." },
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
            { slug: "concept-of-limit", title: "Concept of limit — geometric and physical interpretation", hours: 2, meaning: "Students understand what a function approaches as the input nears a value — the conceptual bedrock of all calculus and the starting point for defining derivatives rigorously." },
            { slug: "standard-limits", title: "Standard limits and evaluation (algebraic, trigonometric, exponential, logarithmic)", hours: 2, meaning: "Covers the canonical limits sinx/x, (1-cosx)/x, (e^x-1)/x and logarithmic limits. These are used as building blocks to evaluate every complex limit in NEB exams." },
            { slug: "indeterminate-forms", title: "Indeterminate forms: 0/0, ∞/∞, 0·∞, ∞−∞, 1^∞, 0^0, ∞^0", hours: 1, meaning: "Teaches how to resolve expressions like 0/0 and ∞/∞ using L'Hôpital's rule and algebraic manipulation — a staple of Grade 12 calculus papers and engineering entrance tests." },
            { slug: "continuity-functions", title: "Continuity of algebraic, trigonometric, exponential, logarithmic functions", hours: 2, meaning: "Reinforces that algebraic, trig, exponential and logarithmic functions are continuous on their domains — a property students use to evaluate limits by direct substitution." },
            { slug: "differentiability", title: "Differentiability and its relation with continuity", hours: 1, meaning: "Students learn that differentiability implies continuity but not vice versa. The connection between the two is a frequent short-answer question in NEB exams." },
          ],
        },
        {
          id: "differentiation",
          title: "Differentiation",
          hours: 16,
          topics: [
            { slug: "derivatives-algebraic-trig", title: "Derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions", hours: 4, meaning: "Students differentiate polynomials, trig functions, inverse trig functions, exponentials and logarithms — the complete toolkit needed for every applications problem in the syllabus." },
            { slug: "rules-differentiation", title: "Rules of differentiation: product rule, quotient rule, chain rule", hours: 3, meaning: "Teaches product, quotient and chain rules — the three indispensable techniques that let students differentiate any composite or combined function they will meet in exams." },
            { slug: "parametric-implicit", title: "Derivatives of parametric and implicit functions", hours: 2, meaning: "Students find derivatives when x and y are given by a parameter or an implicit equation — skills directly used in physics-related curve problems and higher-level calculus." },
            { slug: "higher-order-derivatives", title: "Higher order derivatives", hours: 2, meaning: "Students compute second, third and nth derivatives, building the notation needed for Taylor series, error estimation and Leibniz's theorem later in the course." },
            { slug: "logarithmic-differentiation", title: "Logarithmic differentiation", hours: 1, meaning: "Students learn to differentiate products and powers by taking logs first — a powerful trick for complicated expressions that frequently appears in NEB board exams." },
            { slug: "leibniz-theorem", title: "Leibniz's theorem for nth derivative", hours: 1, meaning: "Students learn the generalised product rule for nth derivatives of a product — a theoretical result often asked in board exams and useful in differential equations." },
            { slug: "geometric-interpretation", title: "Geometric interpretation — tangent and normal", hours: 1, meaning: "Students connect the derivative to the slope of the tangent and the perpendicular normal line at a point on a curve — a visual interpretation tested in every NEB paper." },
            { slug: "monotonicity-maxima-minima", title: "Monotonicity, maxima and minima (first and second derivative tests)", hours: 1, meaning: "Students use first and second derivative tests to locate peaks, troughs and intervals of increase/decrease — a key skill for optimisation problems in exams and engineering." },
            { slug: "applications-differentiation", title: "Applications: rate of change, approximation, error estimation", hours: 1, meaning: "Students apply derivatives to real-world rates of change, linear approximation and error bounds — concepts used in physics, economics and surveying." },
          ],
        },
        {
          id: "integration",
          title: "Integration",
          hours: 14,
          topics: [
            { slug: "integration-inverse", title: "Integration as inverse of differentiation", hours: 2, meaning: "Students understand integration as undoing differentiation, establishing the fundamental link between the two operations that underpins all of calculus." },
            { slug: "standard-integrals", title: "Standard integrals and methods: substitution, parts, partial fractions", hours: 4, meaning: "Students learn standard antiderivatives and three core techniques — substitution, parts and partial fractions — that allow them to integrate any function in the NEB syllabus." },
            { slug: "definite-integrals", title: "Definite integrals and properties", hours: 3, meaning: "Students evaluate definite integrals using the fundamental theorem of calculus and learn its properties, including symmetry and substitution rules tested in board exams." },
            { slug: "trigonometric-integrals", title: "Integration of trigonometric functions", hours: 2, meaning: "Students integrate powers and products of sine, cosine and other trig functions using reduction formulas — a routine exam requirement and a prerequisite for Fourier analysis." },
            { slug: "area-under-curve", title: "Applications: area under curve, area between two curves", hours: 3, meaning: "Students use definite integrals to compute areas bounded by curves and coordinate axes — a classic NEB exam question and a direct application in physics and geometry." },
          ],
        },
        {
          id: "differential-equations",
          title: "Differential Equations",
          hours: 8,
          topics: [
            { slug: "formation-differential-equations", title: "Formation of differential equations", hours: 2, meaning: "Students eliminate arbitrary constants by differentiation to form a differential equation — the first step in every DE problem and a standard board-exam question type." },
            { slug: "first-order-first-degree", title: "Solving first order, first degree equations: variable separable, homogeneous, linear", hours: 4, meaning: "Students solve separable, homogeneous and linear first-order first-degree equations — the three standard methods tested in NEB and used throughout engineering courses." },
            { slug: "applications-de", title: "Applications: growth and decay, population dynamics", hours: 2, meaning: "Students apply differential equations to exponential growth/decay and population models — real-world applications that connect pure maths to biology, economics and physics." },
          ],
        },
        {
          id: "vector-algebra",
          title: "Vector Algebra",
          hours: 8,
          topics: [
            { slug: "scalar-vector-quantities", title: "Scalar and vector quantities, types of vectors", hours: 2, meaning: "Students distinguish quantities with magnitude only from those with direction, and classify unit, zero, equal and like vectors — foundational terminology used in every vector problem." },
            { slug: "vector-operations", title: "Addition, subtraction and scalar multiplication of vectors", hours: 2, meaning: "Students learn to add, subtract and scale vectors geometrically and algebraically — the basic arithmetic that underpins all of vector mechanics and 3D geometry." },
            { slug: "dot-product", title: "Dot product (scalar product) and its applications", hours: 2, meaning: "Students compute the scalar (dot) product to find angles between vectors and project one vector onto another — a tool used constantly in physics work and force problems." },
            { slug: "cross-product", title: "Cross product (vector product) and its applications", hours: 1, meaning: "Students compute the vector (cross) product to find a perpendicular vector and the sine of the angle — essential for torque, angular momentum and area calculations." },
            { slug: "triple-products", title: "Scalar and vector triple products", hours: 1, meaning: "Students work with scalar triple product (volume of parallelepiped) and vector triple product identities — theoretical results frequently asked in NEB board exams." },
          ],
        },
        {
          id: "three-dimensional-geometry",
          title: "Three Dimensional Geometry",
          hours: 8,
          topics: [
            { slug: "direction-cosines-ratios", title: "Direction cosines and direction ratios of a line", hours: 2, meaning: "Students learn to describe the orientation of a line in 3D using direction cosines and ratios — language needed for all 3D geometry and vector calculations." },
            { slug: "equation-of-line", title: "Equation of a line in space — standard and general form", hours: 2, meaning: "Students write and convert the equation of a line in space between standard (symmetric) and general forms — a core skill tested in NEB solid geometry questions." },
            { slug: "equation-of-plane", title: "Equation of a plane — normal form, general form", hours: 2, meaning: "Students derive the normal and general equations of a plane — the 3D analogue of the straight line and a prerequisite for finding angles and distances in space." },
            { slug: "angles-lines-planes", title: "Angle between two lines, two planes, and a line and a plane", hours: 1, meaning: "Students find angles between lines, between planes and between a line and a plane using direction ratios — standard NEB exam problems with direct 3D geometry applications." },
            { slug: "distance-point-plane-line", title: "Distance of a point from a plane and line", hours: 1, meaning: "Students compute the perpendicular distance from a point to a plane or line in 3D — a frequently tested formula with applications in engineering and surveying." },
          ],
        },
        {
          id: "linear-programming",
          title: "Linear Programming",
          hours: 6,
          topics: [
            { slug: "lpp-formulation", title: "Linear programming — formulation of LPP", hours: 2, meaning: "Students translate real-world resource-allocation problems into mathematical inequalities and an objective function — the first step in every linear programming application." },
            { slug: "graphical-method", title: "Graphical method for solving LPP with two variables", hours: 3, meaning: "Students solve two-variable LPP problems by shading feasible regions and testing corner points — the most visual and exam-friendly method in the NEB syllabus." },
            { slug: "max-minimization", title: "Maximization and minimization problems", hours: 1, meaning: "Students identify whether an LPP asks for a maximum or minimum and interpret the optimal value in context — a standard board-exam question type with direct business applications." },
          ],
        },
        {
          id: "probability",
          title: "Probability",
          hours: 10,
          topics: [
            { slug: "conditional-probability", title: "Conditional probability and multiplication theorem", hours: 2, meaning: "Students compute the probability of an event given that another has occurred, using P(A|B) = P(A∩B)/P(B) — a fundamental concept used in medical testing and data science." },
            { slug: "independent-events", title: "Independent events", hours: 1, meaning: "Students recognise when events do not influence each other and apply P(A∩B) = P(A)P(B) — a simplifying assumption used throughout statistics and probability modelling." },
            { slug: "bayes-theorem", title: "Bayes' theorem and its applications", hours: 2, meaning: "Students reverse conditional probabilities to find P(A|B) from P(B|A) — a powerful theorem used in diagnostics, machine learning and decision-making under uncertainty." },
            { slug: "random-variable", title: "Random variable and its probability distribution", hours: 2, meaning: "Students learn to assign numerical values to outcomes of random experiments and describe their probability distributions — the bridge between raw probability and statistical analysis." },
            { slug: "mean-variance", title: "Mean, variance and standard deviation of a random variable", hours: 1, meaning: "Students compute the expected value, variance and standard deviation of a random variable — summary statistics used to characterise every probability distribution in the syllabus." },
            { slug: "binomial-distribution", title: "Binomial distribution — definition, mean, variance", hours: 1, meaning: "Students model repeated independent trials with two outcomes using the binomial formula — a distribution central to quality control, genetics and engineering reliability analysis." },
            { slug: "poisson-distribution", title: "Poisson distribution — definition, mean, variance", hours: 1, meaning: "Students model rare events occurring over fixed intervals using the Poisson distribution — widely used in traffic engineering, queuing theory and defect analysis." },
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
            { slug: "concept-of-limit", title: "Concept of limit — geometric and physical interpretation", hours: 2, meaning: "Students understand what a function approaches as the input nears a value — the conceptual bedrock of all calculus and the starting point for defining derivatives rigorously." },
            { slug: "standard-limits", title: "Standard limits and evaluation (algebraic, trigonometric, exponential, logarithmic)", hours: 2, meaning: "Covers the canonical limits sinx/x, (1-cosx)/x, (e^x-1)/x and logarithmic limits. These are used as building blocks to evaluate every complex limit in NEB exams." },
            { slug: "indeterminate-forms", title: "Indeterminate forms: 0/0, ∞/∞, 0·∞, ∞−∞, 1^∞, 0^0, ∞^0", hours: 1, meaning: "Teaches how to resolve expressions like 0/0 and ∞/∞ using L'Hôpital's rule and algebraic manipulation — a staple of Grade 12 calculus papers and engineering entrance tests." },
            { slug: "continuity-functions", title: "Continuity of algebraic, trigonometric, exponential, logarithmic functions", hours: 2, meaning: "Reinforces that algebraic, trig, exponential and logarithmic functions are continuous on their domains — a property students use to evaluate limits by direct substitution." },
            { slug: "differentiability", title: "Differentiability and its relation with continuity", hours: 1, meaning: "Students learn that differentiability implies continuity but not vice versa. The connection between the two is a frequent short-answer question in NEB exams." },
          ],
        },
        {
          id: "differentiation",
          title: "Differentiation",
          hours: 16,
          topics: [
            { slug: "derivatives-algebraic-trig", title: "Derivatives of algebraic, trigonometric, inverse trigonometric, exponential and logarithmic functions", hours: 4, meaning: "Students differentiate polynomials, trig functions, inverse trig functions, exponentials and logarithms — the complete toolkit needed for every applications problem in the syllabus." },
            { slug: "rules-differentiation", title: "Rules of differentiation: product rule, quotient rule, chain rule", hours: 3, meaning: "Teaches product, quotient and chain rules — the three indispensable techniques that let students differentiate any composite or combined function they will meet in exams." },
            { slug: "parametric-implicit", title: "Derivatives of parametric and implicit functions", hours: 2, meaning: "Students find derivatives when x and y are given by a parameter or an implicit equation — skills directly used in physics-related curve problems and higher-level calculus." },
            { slug: "higher-order-derivatives", title: "Higher order derivatives", hours: 2, meaning: "Students compute second, third and nth derivatives, building the notation needed for Taylor series, error estimation and Leibniz's theorem later in the course." },
            { slug: "logarithmic-differentiation", title: "Logarithmic differentiation", hours: 1, meaning: "Students learn to differentiate products and powers by taking logs first — a powerful trick for complicated expressions that frequently appears in NEB board exams." },
            { slug: "leibniz-theorem", title: "Leibniz's theorem for nth derivative", hours: 1, meaning: "Students learn the generalised product rule for nth derivatives of a product — a theoretical result often asked in board exams and useful in differential equations." },
            { slug: "geometric-interpretation", title: "Geometric interpretation — tangent and normal", hours: 1, meaning: "Students connect the derivative to the slope of the tangent and the perpendicular normal line at a point on a curve — a visual interpretation tested in every NEB paper." },
            { slug: "monotonicity-maxima-minima", title: "Monotonicity, maxima and minima (first and second derivative tests)", hours: 1, meaning: "Students use first and second derivative tests to locate peaks, troughs and intervals of increase/decrease — a key skill for optimisation problems in exams and engineering." },
            { slug: "applications-differentiation", title: "Applications: rate of change, approximation, error estimation", hours: 1, meaning: "Students apply derivatives to real-world rates of change, linear approximation and error bounds — concepts used in physics, economics and surveying." },
          ],
        },
        {
          id: "integration",
          title: "Integration",
          hours: 14,
          topics: [
            { slug: "integration-inverse", title: "Integration as inverse of differentiation", hours: 2, meaning: "Students understand integration as undoing differentiation, establishing the fundamental link between the two operations that underpins all of calculus." },
            { slug: "standard-integrals", title: "Standard integrals and methods: substitution, parts, partial fractions", hours: 4, meaning: "Students learn standard antiderivatives and three core techniques — substitution, parts and partial fractions — that allow them to integrate any function in the NEB syllabus." },
            { slug: "definite-integrals", title: "Definite integrals and properties", hours: 3, meaning: "Students evaluate definite integrals using the fundamental theorem of calculus and learn its properties, including symmetry and substitution rules tested in board exams." },
            { slug: "trigonometric-integrals", title: "Integration of trigonometric functions", hours: 2, meaning: "Students integrate powers and products of sine, cosine and other trig functions using reduction formulas — a routine exam requirement and a prerequisite for Fourier analysis." },
            { slug: "area-under-curve", title: "Applications: area under curve, area between two curves", hours: 3, meaning: "Students use definite integrals to compute areas bounded by curves and coordinate axes — a classic NEB exam question and a direct application in physics and geometry." },
          ],
        },
        {
          id: "differential-equations",
          title: "Differential Equations",
          hours: 8,
          topics: [
            { slug: "formation-differential-equations", title: "Formation of differential equations", hours: 2, meaning: "Students eliminate arbitrary constants by differentiation to form a differential equation — the first step in every DE problem and a standard board-exam question type." },
            { slug: "first-order-first-degree", title: "Solving first order, first degree equations: variable separable, homogeneous, linear", hours: 4, meaning: "Students solve separable, homogeneous and linear first-order first-degree equations — the three standard methods tested in NEB and used throughout engineering courses." },
            { slug: "applications-de", title: "Applications: growth and decay, population dynamics", hours: 2, meaning: "Students apply differential equations to exponential growth/decay and population models — real-world applications that connect pure maths to biology, economics and physics." },
          ],
        },
        {
          id: "vector-algebra",
          title: "Vector Algebra",
          hours: 8,
          topics: [
            { slug: "scalar-vector-quantities", title: "Scalar and vector quantities, types of vectors", hours: 2, meaning: "Students distinguish quantities with magnitude only from those with direction, and classify unit, zero, equal and like vectors — foundational terminology used in every vector problem." },
            { slug: "vector-operations", title: "Addition, subtraction and scalar multiplication of vectors", hours: 2, meaning: "Students learn to add, subtract and scale vectors geometrically and algebraically — the basic arithmetic that underpins all of vector mechanics and 3D geometry." },
            { slug: "dot-product", title: "Dot product (scalar product) and its applications", hours: 2, meaning: "Students compute the scalar (dot) product to find angles between vectors and project one vector onto another — a tool used constantly in physics work and force problems." },
            { slug: "cross-product", title: "Cross product (vector product) and its applications", hours: 1, meaning: "Students compute the vector (cross) product to find a perpendicular vector and the sine of the angle — essential for torque, angular momentum and area calculations." },
            { slug: "triple-products", title: "Scalar and vector triple products", hours: 1, meaning: "Students work with scalar triple product (volume of parallelepiped) and vector triple product identities — theoretical results frequently asked in NEB board exams." },
          ],
        },
        {
          id: "three-dimensional-geometry",
          title: "Three Dimensional Geometry",
          hours: 8,
          topics: [
            { slug: "direction-cosines-ratios", title: "Direction cosines and direction ratios of a line", hours: 2, meaning: "Students learn to describe the orientation of a line in 3D using direction cosines and ratios — language needed for all 3D geometry and vector calculations." },
            { slug: "equation-of-line", title: "Equation of a line in space — standard and general form", hours: 2, meaning: "Students write and convert the equation of a line in space between standard (symmetric) and general forms — a core skill tested in NEB solid geometry questions." },
            { slug: "equation-of-plane", title: "Equation of a plane — normal form, general form", hours: 2, meaning: "Students derive the normal and general equations of a plane — the 3D analogue of the straight line and a prerequisite for finding angles and distances in space." },
            { slug: "angles-lines-planes", title: "Angle between two lines, two planes, and a line and a plane", hours: 1, meaning: "Students find angles between lines, between planes and between a line and a plane using direction ratios — standard NEB exam problems with direct 3D geometry applications." },
            { slug: "distance-point-plane-line", title: "Distance of a point from a plane and line", hours: 1, meaning: "Students compute the perpendicular distance from a point to a plane or line in 3D — a frequently tested formula with applications in engineering and surveying." },
          ],
        },
        {
          id: "linear-programming",
          title: "Linear Programming",
          hours: 6,
          topics: [
            { slug: "lpp-formulation", title: "Linear programming — formulation of LPP", hours: 2, meaning: "Students translate real-world resource-allocation problems into mathematical inequalities and an objective function — the first step in every linear programming application." },
            { slug: "graphical-method", title: "Graphical method for solving LPP with two variables", hours: 3, meaning: "Students solve two-variable LPP problems by shading feasible regions and testing corner points — the most visual and exam-friendly method in the NEB syllabus." },
            { slug: "max-minimization", title: "Maximization and minimization problems", hours: 1, meaning: "Students identify whether an LPP asks for a maximum or minimum and interpret the optimal value in context — a standard board-exam question type with direct business applications." },
          ],
        },
        {
          id: "probability",
          title: "Probability",
          hours: 10,
          topics: [
            { slug: "conditional-probability", title: "Conditional probability and multiplication theorem", hours: 2, meaning: "Students compute the probability of an event given that another has occurred, using P(A|B) = P(A∩B)/P(B) — a fundamental concept used in medical testing and data science." },
            { slug: "independent-events", title: "Independent events", hours: 1, meaning: "Students recognise when events do not influence each other and apply P(A∩B) = P(A)P(B) — a simplifying assumption used throughout statistics and probability modelling." },
            { slug: "bayes-theorem", title: "Bayes' theorem and its applications", hours: 2, meaning: "Students reverse conditional probabilities to find P(A|B) from P(B|A) — a powerful theorem used in diagnostics, machine learning and decision-making under uncertainty." },
            { slug: "random-variable", title: "Random variable and its probability distribution", hours: 2, meaning: "Students learn to assign numerical values to outcomes of random experiments and describe their probability distributions — the bridge between raw probability and statistical analysis." },
            { slug: "mean-variance", title: "Mean, variance and standard deviation of a random variable", hours: 1, meaning: "Students compute the expected value, variance and standard deviation of a random variable — summary statistics used to characterise every probability distribution in the syllabus." },
            { slug: "binomial-distribution", title: "Binomial distribution — definition, mean, variance", hours: 1, meaning: "Students model repeated independent trials with two outcomes using the binomial formula — a distribution central to quality control, genetics and engineering reliability analysis." },
            { slug: "poisson-distribution", title: "Poisson distribution — definition, mean, variance", hours: 1, meaning: "Students model rare events occurring over fixed intervals using the Poisson distribution — widely used in traffic engineering, queuing theory and defect analysis." },
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
