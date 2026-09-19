import type { HighYieldTopicData } from "@/lib/high-yield-topic-facts";

/**
 * Mathematics high-yield bank.
 *
 * The original curated bank covered calculus and conic sections only. Every
 * entry lists the `unitSlugs` it serves (ids from `frontend/lib/syllabus.ts`);
 * unit-aware callers resolve only through that list.
 */
export const HIGH_YIELD_TOPIC_BANK_MATHEMATICS: HighYieldTopicData[] = [
  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS — Algebra
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "algebra",
      "quadratic-equation",
      "sequence-series",
      "matrices",
      "determinants",
      "permutation",
      "combination",
      "binomial-theorem",
      "complex-number",
      "induction",
    ],
    subject: "mathematics",
    title: "Algebra — Quadratic, Sequences, Matrices, Permutations & Binomial",
    unitSlugs: ["algebra"],
    category: "Algebra",
    governingLaws: [
      {
        name: "Quadratic Formula and Nature of Roots",
        statement:
          "The roots of ax^2 + bx + c = 0 are given by the quadratic formula, and the sign of the discriminant decides whether the roots are real, equal or complex.",
        formula:
          "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\Delta = b^2 - 4ac",
        conditions:
          "Delta greater than 0 gives two distinct real roots, Delta = 0 gives equal real roots, and Delta less than 0 gives a conjugate complex pair.",
      },
      {
        name: "Binomial Theorem",
        statement:
          "For a positive integral index n, the expansion of (x + y)^n has n + 1 terms with binomial coefficients given by the combinations nCr.",
        formula:
          "(x + y)^n = \\sum_{r=0}^{n} {}^{n}C_{r}\\, x^{n-r} y^{r}, \\quad T_{r+1} = {}^{n}C_{r}\\, x^{n-r} y^{r}",
        conditions:
          "The general term T_(r+1) is the fastest route to a specific term, its coefficient or the term independent of x — set the exponent of x to zero for the last of these.",
      },
      {
        name: "Principle of Mathematical Induction",
        statement:
          "A statement is true for all natural numbers if it is true for n = 1, and its truth for n = k implies its truth for n = k + 1.",
        formula: "P(1) \\wedge \\big(P(k) \\implies P(k+1)\\big) \\implies P(n)\\ \\forall n \\in \\mathbb{N}",
        conditions:
          "Both steps are needed. Omitting the base case or the inductive step invalidates the whole proof.",
      },
    ],
    speedFormulas: [
      {
        name: "Sum and Product of Roots",
        formula: "\\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}, \\quad \\text{equation} = a(x - \\alpha)(x - \\beta)",
        description:
          "A huge time-saver: many questions never need the individual roots, only their sum and product.",
        unit: "—",
      },
      {
        name: "Progressions",
        formula:
          "AP: t_n = a + (n-1)d, \\ S_n = \\frac{n}{2}[2a + (n-1)d]; \\quad GP: t_n = ar^{n-1}, \\ S_n = \\frac{a(r^n - 1)}{r - 1}, \\ S_\\infty = \\frac{a}{1 - r}\\ (|r| < 1)",
        description:
          "The infinite GP sum converges only when the common ratio is numerically less than 1, which is where most errors arise.",
        unit: "—",
      },
      {
        name: "AM–GM–HM Inequality",
        formula: "AM \\geq GM \\geq HM, \\quad AM \\times HM = GM^2",
        description:
          "Equality holds only when all the numbers are equal, which is exactly the condition needed in maximum-minimum problems.",
        unit: "—",
      },
      {
        name: "Permutations and Combinations",
        formula:
          "{}^{n}P_{r} = \\frac{n!}{(n-r)!}, \\quad {}^{n}C_{r} = \\frac{n!}{r!(n-r)!}, \\quad {}^{n}C_{r} = {}^{n}C_{n-r}, \\quad {}^{n}C_{0} = {}^{n}C_{n} = 1",
        description:
          "Remember 0! = 1, not 0. Arrangement questions use permutations, selection questions use combinations.",
        unit: "—",
      },
      {
        name: "Matrices, Determinants and Cramer's Rule",
        formula:
          "A^{-1} = \\frac{adj\\,A}{|A|}, \\quad x = \\frac{D_1}{D}, \\ y = \\frac{D_2}{D}",
        description:
          "A square matrix has an inverse only when its determinant is non-zero. For a 2x2 matrix, adj A is found by swapping the leading diagonal and changing the signs of the other two entries.",
        unit: "—",
      },
      {
        name: "Complex Numbers",
        formula: "i^2 = -1, \\quad |z| = \\sqrt{a^2 + b^2}, \\quad z\\bar{z} = |z|^2, \\quad (\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta",
        description:
          "De Moivre's theorem turns powers and roots of complex numbers into simple operations on angles.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "0!", name: "Factorial of zero", value: "1", unit: "—" },
      { symbol: "i^2", name: "Square of the imaginary unit", value: "-1", unit: "—" },
      { symbol: "e", name: "Base of natural logarithms", value: "2.71828", unit: "—" },
      { symbol: "\\pi", name: "Ratio of circumference to diameter", value: "3.14159", unit: "—" },
      { symbol: "\\sqrt{2}", name: "Square root of two", value: "1.41421", unit: "—" },
      { symbol: "e^{i\\pi}", name: "Euler's identity", value: "-1", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "The factorial of zero is zero.",
        truth:
          "0! = 1 by definition, which is what makes the combination formula work for nCr when r = 0 or r = n. Confusing it with 0 breaks every counting problem.",
        examRef: "IOE/CEE — permutations and combinations",
      },
      {
        trap: "If the discriminant is zero the equation has no real roots.",
        truth:
          "Delta = 0 gives two EQUAL real roots, x = -b/2a. It is only when Delta is less than 0 that the roots are non-real and form a conjugate pair.",
        examRef: "NEB / IOE — quadratic equations",
      },
      {
        trap: "The sum of an infinite geometric series always exists.",
        truth:
          "It exists only when the common ratio is numerically less than 1. For |r| >= 1 the series diverges and no finite sum exists.",
        examRef: "IOE — sequence and series",
      },
      {
        trap: "Every square matrix has an inverse.",
        truth:
          "Only a NON-SINGULAR matrix does, that is, one whose determinant is not zero. A singular matrix has no inverse and the associated system either has no solution or infinitely many.",
        examRef: "IOE — matrices",
      },
    ],
    workedNumericals: [
      {
        problem:
          "For the equation 2x^2 - 5x + 3 = 0, find the discriminant, the nature of the roots, and their sum and product.",
        given: "a = 2, b = -5, c = 3",
        steps: [
          "\\Delta = b^2 - 4ac = 25 - 4(2)(3) = 25 - 24 = 1",
          "Since \\Delta > 0, the roots are real and distinct",
          "Sum of roots = -\\frac{b}{a} = \\frac{5}{2}",
          "Product of roots = \\frac{c}{a} = \\frac{3}{2}",
        ],
        answer: "\\Delta = 1, \\quad \\text{real and distinct}, \\quad \\alpha + \\beta = \\frac{5}{2}, \\quad \\alpha\\beta = \\frac{3}{2}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Discriminant",
        definition:
          "The quantity b squared minus 4ac, whose sign determines whether the roots of a quadratic equation are real and distinct, equal, or complex conjugates.",
        significance:
          "It answers \"nature of roots\" questions without solving the equation, which is exactly what board and entrance questions ask.",
      },
      {
        term: "Binomial Coefficient",
        definition:
          "The coefficient nCr appearing in the expansion of (x + y)^n, equal to the number of ways of choosing r objects from n.",
        significance:
          "Connects the binomial theorem to counting, and its symmetry property nCr = nC(n-r) is the fastest way to simplify many expansions.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS — Trigonometry
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "trigonometry",
      "trigonometric-identity",
      "inverse-trig",
      "trigonometric-equation",
      "sine-rule",
      "cosine-rule",
      "solution-of-triangle",
      "heights-and-distances",
    ],
    subject: "mathematics",
    title: "Trigonometry — Identities, Equations & Solution of Triangles",
    unitSlugs: ["trigonometry"],
    category: "Trigonometry",
    governingLaws: [
      {
        name: "Fundamental Trigonometric Identities",
        statement:
          "For every angle, the squares of the sine and cosine sum to one, and dividing by the square of the cosine or sine gives the corresponding secant–tangent and cosecant–cotangent identities.",
        formula:
          "\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta",
        conditions:
          "Valid for all angles for which both sides are defined; the tangent and secant forms fail at 90 degrees and the cotangent forms at 0 degrees.",
      },
      {
        name: "General Solution of Trigonometric Equations",
        statement:
          "A trigonometric equation has infinitely many solutions, given by a general expression involving an integer n, because the trigonometric functions are periodic.",
        formula:
          "\\sin\\theta = \\sin\\alpha \\implies \\theta = n\\pi + (-1)^n\\alpha; \\quad \\cos\\theta = \\cos\\alpha \\implies \\theta = 2n\\pi \\pm \\alpha; \\quad \\tan\\theta = \\tan\\alpha \\implies \\theta = n\\pi + \\alpha",
        conditions:
          "n is any integer. The sine form needs the (-1)^n factor; forgetting it loses half the solutions.",
      },
      {
        name: "Sine and Cosine Rules",
        statement:
          "In any triangle, the sides are proportional to the sines of the opposite angles, and the square of any side is given by the cosine rule in terms of the other two sides and the included angle.",
        formula:
          "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R; \\quad a^2 = b^2 + c^2 - 2bc\\cos A",
        conditions:
          "The sine rule needs a matching side-angle pair. The cosine rule is used when three sides are known, or two sides and the included angle.",
      },
    ],
    speedFormulas: [
      {
        name: "Compound and Multiple Angle Formulae",
        formula:
          "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B; \\quad \\cos 2A = 1 - 2\\sin^2 A = 2\\cos^2 A - 1",
        description:
          "The three forms of cos 2A are all needed: choose whichever turns the expression into a single function of the angle.",
        unit: "—",
      },
      {
        name: "Triple Angle Formulae",
        formula:
          "\\sin 3A = 3\\sin A - 4\\sin^3 A, \\quad \\cos 3A = 4\\cos^3 A - 3\\cos A, \\quad \\tan 3A = \\frac{3\\tan A - \\tan^3 A}{1 - 3\\tan^2 A}",
        description:
          "The sine form rearranges into the standard factorisation sin 3A = 4 sin A sin(60 - A) sin(60 + A), a frequent entrance shortcut.",
        unit: "—",
      },
      {
        name: "Sum-to-Product (Transformation) Formulae",
        formula:
          "\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C - \\cos D = -2\\sin\\frac{C+D}{2}\\sin\\frac{C-D}{2}",
        description:
          "The fastest route whenever a sum or difference of two sines or cosines appears — far quicker than expanding both terms.",
        unit: "—",
      },
      {
        name: "Area of a Triangle",
        formula:
          "\\Delta = \\frac{1}{2}ab\\sin C = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad s = \\frac{a+b+c}{2}",
        description:
          "Heron's formula needs only the three sides. Also remember the inradius r = Delta/s and circumradius R = abc/(4 Delta).",
        unit: "square units",
      },
      {
        name: "Radians and Principal Values",
        formula:
          "\\pi\\ rad = 180^\\circ, \\quad 1\\ rad = 57.2958^\\circ; \\quad \\sin^{-1}x \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]",
        description:
          "Inverse trigonometric functions return principal values only, which is the key to solving inverse trigonometric equations.",
        unit: "radians",
      },
    ],
    constantsAndValues: [
      { symbol: "\\sin 30^\\circ", name: "Sine of thirty degrees", value: "1/2", unit: "—" },
      { symbol: "\\cos 60^\\circ", name: "Cosine of sixty degrees", value: "1/2", unit: "—" },
      { symbol: "\\sin 45^\\circ", name: "Sine of forty-five degrees", value: "1/\\sqrt{2}", unit: "—" },
      { symbol: "\\tan 45^\\circ", name: "Tangent of forty-five degrees", value: "1", unit: "—" },
      { symbol: "\\sin 90^\\circ", name: "Sine of ninety degrees", value: "1", unit: "—" },
      { symbol: "1\\ rad", name: "One radian in degrees", value: "57.2958", unit: "degrees" },
      { symbol: "\\pi", name: "Pi in radians", value: "3.14159", unit: "radians" },
    ],
    entranceTraps: [
      {
        trap: "sin^{-1}(sin theta) equals theta for every theta.",
        truth:
          "It equals theta only when theta lies in the principal range from -90 to +90 degrees. Outside it, the result must be reduced to the principal value — for example sin^-1(sin 150 degrees) = 30 degrees.",
        examRef: "IOE/CEE — inverse trigonometry",
      },
      {
        trap: "The general solution of sin theta = 0 is theta = 2n pi.",
        truth:
          "It is theta = n pi. The sine vanishes at every multiple of pi, including the odd ones, because sin pi = 0 as well.",
        examRef: "NEB — trigonometric equations",
      },
      {
        trap: "sin 2A equals 2 sin A.",
        truth:
          "sin 2A = 2 sin A cos A. Setting 2 sin A instead drops the cos A factor, which is why A = 90 degrees would wrongly appear to satisfy sin 2A = 2 sin A.",
        examRef: "IOE — multiple angles",
      },
      {
        trap: "The cosine rule is only for right-angled triangles.",
        truth:
          "The cosine rule works for EVERY triangle; for a right angle it reduces to Pythagoras' theorem because cos 90 degrees is zero. It is the sine rule that needs a matching side and angle.",
        examRef: "IOE — solution of triangles",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Find the general solution of sin theta = 1/2, and all solutions lying between 0 and 2 pi.",
        given: "\\sin\\theta = \\frac{1}{2} = \\sin\\frac{\\pi}{6}",
        steps: [
          "General solution: \\theta = n\\pi + (-1)^n\\frac{\\pi}{6}",
          "For n = 0: \\theta = \\frac{\\pi}{6} = 30^\\circ",
          "For n = 1: \\theta = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6} = 150^\\circ",
          "These are the only two solutions in the interval from 0 to 2 pi",
        ],
        answer: "\\theta = n\\pi + (-1)^n\\frac{\\pi}{6}; \\quad \\text{in } [0, 2\\pi]: \\frac{\\pi}{6}, \\frac{5\\pi}{6}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "General Solution",
        definition:
          "The expression containing an arbitrary integer n that gives every solution of a trigonometric equation, because trigonometric functions repeat with a fixed period.",
        significance:
          "Sine and cosine repeat every 2 pi and tangent every pi, so a trigonometric equation always has infinitely many solutions rather than one.",
      },
      {
        term: "Sine Rule",
        definition:
          "The statement that in any triangle the ratio of each side to the sine of its opposite angle is constant, equal to twice the circumradius.",
        significance:
          "The standard method for solving a triangle when a side and its opposite angle are known, and also the link between a triangle and its circumcircle.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS — Vectors
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "vectors",
      "dot-product",
      "cross-product",
      "scalar-triple-product",
      "direction-cosine",
      "coplanar",
      "projection",
    ],
    subject: "mathematics",
    title: "Vector Algebra — Dot, Cross & Triple Products",
    unitSlugs: ["vectors", "vector-algebra"],
    category: "Vectors & 3D Geometry",
    governingLaws: [
      {
        name: "Scalar (Dot) Product",
        statement:
          "The dot product of two vectors is the product of their magnitudes and the cosine of the angle between them, and it is zero exactly when the vectors are perpendicular.",
        formula:
          "\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta = a_1b_1 + a_2b_2 + a_3b_3",
        conditions:
          "A dot product gives a scalar, and it is commutative so the order of the vectors does not matter.",
      },
      {
        name: "Vector (Cross) Product",
        statement:
          "The cross product of two vectors is a vector perpendicular to both, whose magnitude equals the area of the parallelogram they span.",
        formula:
          "\\vec{a}\\times\\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}, \\quad \\vec{a}\\times\\vec{b} = -\\vec{b}\\times\\vec{a}",
        conditions:
          "The cross product is ANTI-commutative, unlike the dot product, so the order matters. It is zero for parallel vectors.",
      },
      {
        name: "Scalar Triple Product and Coplanarity",
        statement:
          "The scalar triple product of three vectors is zero exactly when the three vectors are coplanar, and otherwise its absolute value gives the volume of the parallelepiped they define.",
        formula:
          "V = \\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}",
        conditions:
          "Coplanarity test: a dot (b cross c) = 0. A cyclic permutation of the vectors leaves the value unchanged.",
      },
    ],
    speedFormulas: [
      {
        name: "Areas and Volumes from Vector Products",
        formula:
          "\\text{parallelogram} = |\\vec{a}\\times\\vec{b}|, \\quad \\text{triangle} = \\frac{1}{2}|\\vec{a}\\times\\vec{b}|, \\quad \\text{parallelepiped} = |[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|",
        description:
          "The single most examinable group of formulae — the half factor for the triangle is the most commonly forgotten.",
        unit: "square or cubic units",
      },
      {
        name: "Projection and Angle Between Vectors",
        formula:
          "\\text{projection of } \\vec{a} \\text{ on } \\vec{b} = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}, \\quad \\cos\\theta = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}",
        description:
          "Note the projection uses the MAGNITUDE of the vector being projected onto, and gives a scalar that can be negative.",
        unit: "—",
      },
      {
        name: "Unit Vectors and Direction Cosines",
        formula:
          "\\hat{a} = \\frac{\\vec{a}}{|\\vec{a}|}, \\quad l = \\cos\\alpha, m = \\cos\\beta, n = \\cos\\gamma, \\quad l^2 + m^2 + n^2 = 1",
        description:
          "The identity l squared plus m squared plus n squared equals 1 is the quickest check on any direction-cosine answer.",
        unit: "—",
      },
      {
        name: "Base Vector Operations",
        formula:
          "\\hat{i}\\cdot\\hat{i} = \\hat{j}\\cdot\\hat{j} = \\hat{k}\\cdot\\hat{k} = 1; \\quad \\hat{i}\\cdot\\hat{j} = 0; \\quad \\hat{i}\\times\\hat{j} = \\hat{k}, \\ \\hat{j}\\times\\hat{k} = \\hat{i}, \\ \\hat{k}\\times\\hat{i} = \\hat{j}",
        description:
          "The cross-product cycle runs i then j then k in order; reversing the order changes the sign.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "\\hat{i}\\cdot\\hat{j}", name: "Dot product of the base vectors", value: "0", unit: "—" },
      { symbol: "\\hat{i}\\times\\hat{j}", name: "Cross product of the base vectors", value: "\\hat{k}", unit: "—" },
      { symbol: "|[\\hat{i}\\ \\hat{j}\\ \\hat{k}]|", name: "Scalar triple product of the base vectors", value: "1", unit: "—" },
      { symbol: "l^2+m^2+n^2", name: "Sum of squares of direction cosines", value: "1", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "The cross product is commutative, like the dot product.",
        truth:
          "The dot product is commutative but the cross product is ANTI-commutative: a cross b equals minus (b cross a). Swapping the order flips the direction of the normal.",
        examRef: "IOE/CEE — vector products",
      },
      {
        trap: "The magnitude of the cross product equals the product of the magnitudes.",
        truth:
          "It is |a||b| sin theta, which equals the product only when theta is 90 degrees. For parallel vectors the cross product is the zero vector.",
        examRef: "IOE — cross product",
      },
      {
        trap: "If the dot product of two non-zero vectors is zero, they are parallel.",
        truth:
          "A zero dot product means they are PERPENDICULAR, since cos 90 degrees is zero. A zero CROSS product means they are parallel, since sin 0 is zero.",
        examRef: "NEB — vector algebra",
      },
      {
        trap: "The scalar triple product proves three vectors are collinear.",
        truth:
          "A zero scalar triple product proves they are COPLANAR, not collinear. Collinearity of vectors is tested by a zero cross product instead.",
        examRef: "IOE — triple products",
      },
    ],
    workedNumericals: [
      {
        problem:
          "For a = i + 2j + 3k and b = 4i - 5j + 6k, find the dot product, the cross product and the angle between them.",
        given: "\\vec{a} = \\hat{i} + 2\\hat{j} + 3\\hat{k}, \\quad \\vec{b} = 4\\hat{i} - 5\\hat{j} + 6\\hat{k}",
        steps: [
          "\\vec{a}\\cdot\\vec{b} = (1)(4) + (2)(-5) + (3)(6) = 4 - 10 + 18 = 12",
          "|\\vec{a}| = \\sqrt{1 + 4 + 9} = \\sqrt{14}, \\quad |\\vec{b}| = \\sqrt{16 + 25 + 36} = \\sqrt{77}",
          "\\cos\\theta = \\frac{12}{\\sqrt{14}\\sqrt{77}} = 0.3655 \\implies \\theta = 68.6^\\circ",
          "\\vec{a}\\times\\vec{b} = \\hat{i}(12 + 15) - \\hat{j}(6 - 12) + \\hat{k}(-5 - 8) = 27\\hat{i} + 6\\hat{j} - 13\\hat{k}",
        ],
        answer: "\\vec{a}\\cdot\\vec{b} = 12, \\quad \\theta = 68.6^\\circ, \\quad \\vec{a}\\times\\vec{b} = 27\\hat{i} + 6\\hat{j} - 13\\hat{k}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Scalar Triple Product",
        definition:
          "The dot product of one vector with the cross product of the other two, giving a scalar whose absolute value is the volume of the parallelepiped formed by the three vectors.",
        significance:
          "Its vanishing is the standard test for four points being coplanar, a very common entrance question.",
      },
      {
        term: "Direction Cosines",
        definition:
          "The cosines of the angles a vector makes with the positive coordinate axes, usually written l, m and n.",
        significance:
          "They satisfy l squared plus m squared plus n squared equals 1, which links vector algebra to the equations of lines in three-dimensional geometry.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS — Statistics and Probability
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "statistics-and-probability",
      "mean-deviation",
      "standard-deviation",
      "variance",
      "dispersion",
      "probability",
      "conditional-probability",
      "bayes",
    ],
    subject: "mathematics",
    title: "Statistics and Probability — Dispersion, Probability & Bayes",
    unitSlugs: ["statistics-and-probability"],
    category: "Statistics & Probability",
    governingLaws: [
      {
        name: "Measures of Dispersion",
        statement:
          "The variance of a set of observations is the mean of the squared deviations from the arithmetic mean, and the standard deviation is its positive square root.",
        formula:
          "\\sigma^2 = \\frac{1}{n}\\sum (x_i - \\bar{x})^2 = \\frac{\\sum x_i^2}{n} - \\bar{x}^2, \\quad \\sigma = \\sqrt{\\sigma^2}",
        conditions:
          "The computational form using the sum of squares is faster and avoids rounding errors. Mean deviation is minimum when measured about the MEDIAN.",
      },
      {
        name: "Addition Theorem of Probability",
        statement:
          "The probability that at least one of two events occurs equals the sum of their individual probabilities minus the probability that both occur.",
        formula: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
        conditions:
          "For mutually exclusive events the intersection term is zero. For independent events use P(A intersect B) = P(A) times P(B).",
      },
      {
        name: "Conditional Probability and Bayes' Theorem",
        statement:
          "The conditional probability of A given B is the probability of both divided by the probability of B, and Bayes' theorem reverses the conditioning.",
        formula:
          "P(A|B) = \\frac{P(A \\cap B)}{P(B)}; \\quad P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum_j P(E_j)P(A|E_j)}",
        conditions:
          "Requires P(B) to be non-zero. Bayes' theorem is used when the causes are known and the effect is observed, to find the most likely cause.",
      },
    ],
    speedFormulas: [
      {
        name: "Mean and Variance for Frequency Distribution",
        formula:
          "\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}, \\quad \\sigma^2 = \\frac{\\sum f_i x_i^2}{\\sum f_i} - \\bar{x}^2",
        description:
          "Using the direct form with the squares of the values avoids computing every individual deviation.",
        unit: "—",
      },
      {
        name: "Coefficient of Variation",
        formula: "CV = \\frac{\\sigma}{\\bar{x}} \\times 100",
        description:
          "A relative measure of dispersion, so it is the statistic to use when comparing the consistency of two data sets with different units or means. LOWER CV means MORE consistent.",
        unit: "%",
      },
      {
        name: "Classical Definition of Probability",
        formula: "P(A) = \\frac{\\text{number of favourable outcomes}}{\\text{total number of equally likely outcomes}}",
        description:
          "Requires equally likely and mutually exclusive outcomes. For drawing cards, remember 52 cards in 4 suits of 13, with 12 face cards.",
        unit: "—",
      },
      {
        name: "Independent Events and Complements",
        formula: "P(A \\cap B) = P(A)P(B), \\quad P(A') = 1 - P(A)",
        description:
          "\"At least one\" questions are almost always quickest through the complement: 1 minus the probability of none.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "CV", name: "Coefficient of variation of a highly consistent data set", value: "low", unit: "%" },
      { symbol: "\\sigma", name: "Standard deviation unit", value: "same as the data", unit: "—" },
      { symbol: "\\sigma^2", name: "Variance unit", value: "square of the data unit", unit: "—" },
      { symbol: "P(A')", name: "Probability of the complement of A", value: "1 - P(A)", unit: "—" },
      { symbol: "\\sum P", name: "Sum of all probabilities in a distribution", value: "1", unit: "—" },
      { symbol: "P(\\text{face card})", name: "Probability of drawing a face card from a deck", value: "12/52 = 3/13", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "The variance is in the same unit as the observations.",
        truth:
          "Variance is in SQUARED units. That is precisely why the standard deviation — its square root — is preferred for reporting, since it returns to the original unit.",
        examRef: "NEB / IOE — dispersion",
      },
      {
        trap: "P(A union B) equals P(A) + P(B) for every pair of events.",
        truth:
          "That holds only for MUTUALLY EXCLUSIVE events. In general the intersection probability must be subtracted, otherwise it is double-counted.",
        examRef: "IOE — probability",
      },
      {
        trap: "Mean deviation is minimum about the arithmetic mean.",
        truth:
          "It is minimum about the MEDIAN. The quantity that is minimum about the mean is the sum of SQUARED deviations, which is the basis of the variance.",
        examRef: "IOE — measures of dispersion",
      },
      {
        trap: "A larger standard deviation means a more consistent data set.",
        truth:
          "The opposite: a smaller standard deviation means more consistency and less variability. When the means differ, compare the coefficient of variation instead.",
        examRef: "CEE — comparative statistics",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Find the mean, variance and standard deviation of the observations 2, 4, 6, 8, 10.",
        given: "x = 2, 4, 6, 8, 10; \\quad n = 5",
        steps: [
          "Mean: \\bar{x} = \\frac{2+4+6+8+10}{5} = \\frac{30}{5} = 6",
          "Squared deviations: 16, 4, 0, 4, 16 \\implies \\sum (x-\\bar{x})^2 = 40",
          "Variance: \\sigma^2 = \\frac{40}{5} = 8",
          "Standard deviation: \\sigma = \\sqrt{8} = 2.83",
          "Coefficient of variation: CV = \\frac{2.83}{6} \\times 100 = 47.1\\%",
        ],
        answer: "\\bar{x} = 6, \\quad \\sigma^2 = 8, \\quad \\sigma = 2.83",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Standard Deviation",
        definition:
          "The positive square root of the arithmetic mean of the squared deviations of the observations from their arithmetic mean.",
        significance:
          "The most widely used absolute measure of dispersion because it is expressed in the same unit as the observations, and it is the basis of the normal distribution.",
      },
      {
        term: "Conditional Probability",
        definition:
          "The probability of an event A given that another event B has already occurred, equal to P(A intersect B) divided by P(B).",
        significance:
          "The foundation of Bayes' theorem and of all inference when part of the information is already known.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS — Computational Methods or Mechanics
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "computational-methods",
      "numerical-computation",
      "numerical-integration",
      "trapezoidal",
      "simpson",
      "newton-raphson",
      "statics",
      "dynamics",
      "lami",
    ],
    subject: "mathematics",
    title: "Computational Methods and Mechanics — Numerical Methods & Statics",
    unitSlugs: ["computational-methods-or-mechanics"],
    category: "Applied Mathematics",
    governingLaws: [
      {
        name: "Trapezoidal Rule",
        statement:
          "The definite integral is approximated by summing the areas of trapezia formed by joining successive ordinates with straight lines.",
        formula: "\\int_a^b y\\,dx \\approx \\frac{h}{2}\\left[(y_0 + y_n) + 2(y_1 + y_2 + \\dots + y_{n-1})\\right]",
        conditions:
          "Works for any number of intervals. For a curve that is concave upward it OVERestimates the true integral, which is a favourite exam question.",
      },
      {
        name: "Simpson's One-Third Rule",
        statement:
          "The integrand is approximated by a parabola through each pair of consecutive strips, giving a more accurate result than the trapezoidal rule.",
        formula:
          "\\int_a^b y\\,dx \\approx \\frac{h}{3}\\left[(y_0 + y_n) + 4(\\text{sum of odd ordinates}) + 2(\\text{sum of even ordinates})\\right]",
        conditions:
          "The number of intervals n MUST be even, so the total number of ordinates must be odd. Applying it otherwise is invalid.",
      },
      {
        name: "Conditions of Equilibrium (Statics)",
        statement:
          "A body remains in equilibrium when the vector sum of all the forces acting on it is zero and the sum of the moments of all the forces about any point is zero.",
        formula: "\\sum F_x = 0, \\quad \\sum F_y = 0, \\quad \\sum M = 0",
        conditions:
          "For three concurrent forces in equilibrium, Lami's theorem applies: each force is proportional to the sine of the angle between the other two.",
      },
      {
        name: "Lami's Theorem",
        statement:
          "If three forces acting at a point are in equilibrium, each force is proportional to the sine of the angle between the other two.",
        formula: "\\frac{P}{\\sin\\alpha} = \\frac{Q}{\\sin\\beta} = \\frac{R}{\\sin\\gamma}",
        conditions:
          "Valid only for exactly THREE forces that are CONCURRENT and in equilibrium. It does not apply to non-concurrent forces or to more than three forces.",
      },
    ],
    speedFormulas: [
      {
        name: "Newton–Raphson Iteration",
        formula: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
        description:
          "The fastest of the standard root-finding methods, converging quadratically, but it fails if the derivative is zero or the initial guess is poor.",
        unit: "—",
      },
      {
        name: "Euler's Method for Differential Equations",
        formula: "y_{n+1} = y_n + h\\,f(x_n, y_n), \\quad h = \\frac{b - a}{n}",
        description:
          "A first-order step-by-step method; accuracy improves as h gets smaller but more steps are needed.",
        unit: "—",
      },
      {
        name: "Bisection Method",
        formula: "c = \\frac{a + b}{2}, \\quad f(a)f(b) < 0",
        description:
          "Requires a sign change between the endpoints. It always converges but slowly, halving the interval each time.",
        unit: "—",
      },
      {
        name: "Dynamics — Newton's Second Law",
        formula: "F = ma, \\quad v = u + at, \\quad s = ut + \\frac{1}{2}at^2, \\quad v^2 = u^2 + 2as",
        description:
          "For motion under gravity along an incline of angle theta, the acceleration is g sin theta when friction is absent.",
        unit: "N, m s^-1, m",
      },
    ],
    constantsAndValues: [
      { symbol: "g", name: "Acceleration due to gravity", value: "9.8", unit: "m s^-2" },
      { symbol: "h", name: "Strip width for n intervals on [a, b]", value: "(b-a)/n", unit: "—" },
      { symbol: "n", name: "Required number of intervals for Simpson's rule", value: "even", unit: "—" },
      { symbol: "\\sin 30^\\circ", name: "Sine of thirty degrees, used in Lami problems", value: "0.5", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "Simpson's one-third rule can be used with any number of intervals.",
        truth:
          "The number of intervals must be EVEN, because each parabola spans two strips. With an odd number of intervals the rule cannot be applied and the trapezoidal rule must be used.",
        examRef: "IOE/CEE — numerical integration",
      },
      {
        trap: "Lami's theorem applies to any three forces acting on a body.",
        truth:
          "The three forces must be CONCURRENT and the body must be in equilibrium. For non-concurrent or non-equilibrium systems, resolve forces or take moments instead.",
        examRef: "IOE — statics",
      },
      {
        trap: "The trapezoidal rule always underestimates the value of an integral.",
        truth:
          "For a curve that is concave upward the trapezia lie ABOVE the curve, so it OVERestimates. The opposite happens for a concave-downward curve.",
        examRef: "IOE — numerical methods",
      },
      {
        trap: "The Newton–Raphson method converges for every starting value.",
        truth:
          "It can diverge or oscillate if the initial guess is far from the root or if the derivative is near zero at any iteration. Convergence is fast only when the initial guess is good.",
        examRef: "CEE — numerical methods",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Use the trapezoidal rule with h = 1 to estimate the integral of y = x^2 from x = 0 to x = 3, given ordinates y = 0, 1, 4, 9.",
        given: "h = 1, \\quad y_0 = 0, y_1 = 1, y_2 = 4, y_3 = 9, \\quad n = 3",
        steps: [
          "Trapezoidal rule: \\int y\\,dx \\approx \\frac{h}{2}\\left[(y_0 + y_n) + 2(y_1 + y_2)\\right]",
          "= \\frac{1}{2}\\left[(0 + 9) + 2(1 + 4)\\right]",
          "= \\frac{1}{2}\\left[9 + 10\\right] = \\frac{19}{2}",
          "Exact value: \\frac{3^3}{3} = 9, \\text{ so the rule overestimates by } 0.5",
        ],
        answer: "\\int_0^3 x^2\\,dx \\approx 9.5 \\quad (\\text{exact } 9, \\text{ overestimate as expected for a concave-up curve})",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Trapezoidal Rule",
        definition:
          "A numerical integration formula that approximates the area under a curve by summing the areas of a series of trapezia formed between successive ordinates.",
        significance:
          "The simplest numerical integration method, and the only one that works for an odd number of intervals.",
      },
      {
        term: "Lami's Theorem",
        definition:
          "The equilibrium condition for three concurrent forces, stating that each force is proportional to the sine of the angle between the other two.",
        significance:
          "Converts equilibrium problems on strings, rods and inclined planes into a simple ratio of sines, avoiding resolution of forces.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MATHEMATICS — Limits and Continuity
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "limits-and-continuity",
      "limit",
      "continuity",
      "discontinuity",
      "left-hand-limit",
      "right-hand-limit",
      "indeterminate",
      "standard-limits",
    ],
    subject: "mathematics",
    title: "Limits and Continuity — Existence, Standard Limits & Discontinuity",
    unitSlugs: ["limits-and-continuity"],
    category: "Calculus",
    governingLaws: [
      {
        name: "Existence of a Limit",
        statement:
          "The limit of a function as x tends to a exists if and only if the left-hand limit and the right-hand limit both exist and are equal. The value of the function at a itself is irrelevant to the limit.",
        formula: "\lim_{x \to a} f(x) = L \iff \lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L",
        conditions:
          "When the two one-sided limits differ, the limit does not exist, even if f(a) is defined — this is a jump discontinuity.",
      },
      {
        name: "Continuity at a Point",
        statement:
          "A function is continuous at x = a when the limit as x tends to a exists, the function is defined at a, and the two are equal.",
        formula: "\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = f(a)",
        conditions:
          "All three requirements must hold. A function defined at a but with a different limit there is discontinuous but the discontinuity is removable by redefining f(a).",
      },
    ],
    speedFormulas: [
      {
        name: "Standard Limits",
        formula:
          "\lim_{x \to 0}\frac{\sin x}{x} = 1, \quad \lim_{x \to 0}\frac{\tan x}{x} = 1, \quad \lim_{x \to 0}\frac{1 - \cos x}{x^2} = \frac{1}{2}",
        description:
          "The single most used set in examination questions: nearly every trigonometric limit reduces to one of these after rearrangement.",
        unit: "—",
      },
      {
        name: "Exponential and Logarithmic Limits",
        formula:
          "\lim_{x \to 0}\frac{e^x - 1}{x} = 1, \quad \lim_{x \to 0}\frac{a^x - 1}{x} = \ln a, \quad \lim_{x \to 0}(1 + x)^{1/x} = e",
        description:
          "The last one is the definition of e and resolves every limit of the indeterminate form 1 raised to infinity.",
        unit: "—",
      },
      {
        name: "L'Hopital's Rule and Indeterminate Forms",
        formula:
          "\lim_{x \to a}\frac{f(x)}{g(x)} = \lim_{x \to a}\frac{f'(x)}{g'(x)} \quad \text{for } \frac{0}{0} \text{ or } \frac{\infty}{\infty}",
        description:
          "The seven indeterminate forms are 0/0, infinity/infinity, 0 times infinity, infinity minus infinity, 1^infinity, 0^0 and infinity^0. Any other form can be evaluated by direct substitution.",
        unit: "—",
      },
      {
        name: "Types of Discontinuity",
        formula:
          "removable: \lim f(x) \text{ exists but } \neq f(a); \quad jump: \lim_{x \to a^-} f \neq \lim_{x \to a^+} f",
        description:
          "A removable discontinuity leaves a hole that can be filled by redefining the value at that single point. A jump or infinite discontinuity cannot be removed.",
        unit: "—",
      },
    ],
    constantsAndValues: [
      { symbol: "e", name: "Base of natural logarithms, equal to lim (1 + x)^(1/x)", value: "2.71828", unit: "—" },
      { symbol: "\ln 2", name: "Natural logarithm of two", value: "0.693", unit: "—" },
      { symbol: "\sin x / x", name: "Limit as x tends to zero (x in radians)", value: "1", unit: "—" },
      { symbol: "(1-\cos x)/x^2", name: "Limit as x tends to zero", value: "1/2", unit: "—" },
      { symbol: "f(a)", name: "Role of the function value in the existence of a limit", value: "irrelevant", unit: "—" },
    ],
    entranceTraps: [
      {
        trap: "A function is continuous at a point if it is defined there.",
        truth:
          "Being defined is not enough. The limit must also EXIST and equal the function value. A function can be defined at a point yet discontinuous there.",
        examRef: "NEB / IOE — continuity",
      },
      {
        trap: "L'Hopital's rule can be applied to any limit.",
        truth:
          "It applies only to the indeterminate forms 0/0 or infinity/infinity. Applying it to a limit of the form 1/0 gives a wrong answer, since that limit is simply infinite.",
        examRef: "IOE/CEE — limits",
      },
      {
        trap: "1 raised to the power infinity equals 1.",
        truth:
          "1^infinity is INDETERMINATE. Its value depends on how the base approaches 1 and the exponent approaches infinity, and it is often e — as in lim (1 + 1/n)^n as n tends to infinity.",
        examRef: "IOE — indeterminate forms",
      },
      {
        trap: "The limit of sin(1/x) as x tends to 0 is 0.",
        truth:
          "That limit does not exist: sin(1/x) oscillates between -1 and +1 infinitely often as x approaches 0, so neither the left-hand nor the right-hand limit exists.",
        examRef: "CEE — limits",
      },
    ],
    workedNumericals: [
      {
        problem: "Evaluate the limit of (1 - cos 2x)/x^2 as x tends to 0.",
        given: "\lim_{x \to 0}\frac{1 - \cos 2x}{x^2}",
        steps: [
          "Substituting x = 0 gives 0/0, an indeterminate form",
          "Use the identity 1 - \cos 2x = 2\sin^2 x",
          "So the expression becomes \frac{2\sin^2 x}{x^2} = 2\left(\frac{\sin x}{x}\right)^2",
          "Since \lim_{x \to 0}\frac{\sin x}{x} = 1, the limit is 2 \times 1^2",
        ],
        answer: "\lim_{x \to 0}\frac{1 - \cos 2x}{x^2} = 2",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Left-Hand and Right-Hand Limit",
        definition:
          "The value the function approaches as x comes towards a from values smaller than a (left) or larger than a (right).",
        significance:
          "The limit exists only when the two agree. Their disagreement is exactly what creates a jump discontinuity.",
      },
      {
        term: "Removable Discontinuity",
        definition:
          "A discontinuity at a point where the limit exists but differs from the function value, so the graph has a hole that can be filled by redefining the function at that single point.",
        significance:
          "Distinguishes the mildest type of discontinuity from jump and infinite discontinuities, which cannot be removed by redefinition.",
      },
    ],
  },
];
