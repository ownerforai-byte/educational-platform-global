/**
 * Derivations — Wave 2 Mathematics (Class 12 + Class 11 gaps).
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

const m2: DerivationOrTheorem[] = [
  {
    id: "math-12-rules-of-differentiation",
    slug: "rules-of-differentiation-product-quotient-chain",
    title: "Differentiation: Product, Quotient & Chain Rules from First Principles",
    subject: "mathematics",
    unit: "Differentiation",
    unitId: "differentiation",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Calculus)",
    isExtra: true,
    statement:
      "From the limit definition of the derivative follow the product rule (uv)' = u'v + uv', the quotient rule (u/v)' = (u'v − uv')/v², and the chain rule dy/dx = (dy/du)(du/dx).",
    coreFormula: "(uv)' = u'v + uv', \\quad \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}, \\quad \\frac{dy}{dx} = \\frac{dy}{du}\\cdot\\frac{du}{dx}",
    concernedTerms: [
      { term: "Derivative", symbol: "f'(x)", units: "—", definition: "lim_{h→0} [f(x+h) − f(x)]/h." },
      { term: "Composite function", symbol: "f(g(x))", units: "—", definition: "Function of a function — the chain rule's domain." },
    ],
    assumptions: ["u, v differentiable at x.", "v(x) ≠ 0 for the quotient rule."],
    proofSteps: [
      { stepNumber: 1, title: "Product rule by adding-subtracting", latex: "\\frac{f(x+h)g(x+h)-f(x)g(x)}{h} = \\frac{f(x+h)-f(x)}{h}g(x) + f(x+h)\\frac{g(x+h)-g(x)}{h}", explanation: "The classic ±f(x+h)g(x) split lets both limits pass separately." },
      { stepNumber: 2, title: "Take the limit", latex: "(uv)' = u'v + uv'", explanation: "Using continuity of v and differentiability of both factors." },
      { stepNumber: 3, title: "Quotient rule", latex: "v\\cdot\\left(\\frac{u}{v}\\right)' = u' - \\frac{u}{v}v'", explanation: "Write u/v = u·(1/v) and combine with the product rule; clearing v gives u'v − uv' over v²." },
      { stepNumber: 4, title: "Chain rule", latex: "\\frac{\\Delta y}{\\Delta x} = \\frac{\\Delta y}{\\Delta u}\\cdot\\frac{\\Delta u}{\\Delta x} \\xrightarrow{\\Delta\\to0} \\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx}", explanation: "Rates compose multiplicatively; rigour needs Δu ≠ 0 handling but the result is the working rule." },
    ],
    conclusion:
      "All differentiation of non-trivial functions is assembled from these three rules plus the elementary derivatives.",
    keyTakeaways: [
      "Chain rule reads outside-to-inside, multiply the slopes.",
      "Quotient rule is the product rule applied to u·v⁻¹ — derive it rather than memorise.",
      "Order matters only in the product rule's shape, not in the value (symmetric).",
    ],
    examTraps: [
      "Writing (uv)' = u'v' — the most punished error in NEB.",
      "Dropping the inner derivative in dy/dx = f'(g(x))·g'(x).",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Constant multiple", condition: "v = c", formula: "(cu)' = cu'", meaning: "Constants slide out." },
      { name: "Repeated chain", condition: "f(g(h(x)))", formula: "y' = f'(g(h))g'(h)h'(x)", meaning: "Multiply all layer slopes." },
      { name: "Power rule via chain", condition: "y = [u(x)]ⁿ", formula: "y' = n u^{n-1} u'", meaning: "Generalised power rule — the workhorse." },
    ],
    solvedProblems: [],
  },
  {
    id: "math-12-parametric-implicit-derivatives",
    slug: "derivatives-parametric-implicit-functions",
    title: "Differentiation: Derivatives of Parametric & Implicit Functions",
    subject: "mathematics",
    unit: "Differentiation",
    unitId: "differentiation",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Calculus)",
    isExtra: true,
    statement:
      "For x = f(t), y = g(t) the slope is dy/dx = (dy/dt)/(dx/dt); for an implicit F(x, y) = 0 differentiate through and solve for dy/dx, treating y as a function of x.",
    coreFormula: "\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}, \\qquad \\frac{d}{dx}F(x,y) = 0 \\Rightarrow \\frac{dy}{dx}",
    concernedTerms: [
      { term: "Parameter", symbol: "t", units: "—", definition: "Third variable through which x and y are defined." },
      { term: "Implicit relation", symbol: "F(x,y)=0", units: "—", definition: "Curve defined without solving y explicitly." },
    ],
    assumptions: ["dx/dt ≠ 0 (parametric case).", "y is genuinely differentiable in x (implicit case)."],
    proofSteps: [
      { stepNumber: 1, title: "Chain-rule bridge for parametric", latex: "\\frac{dy}{dx} = \\frac{dy}{dt}\\cdot\\frac{dt}{dx} = \\frac{dy/dt}{dx/dt}", explanation: "Insert the parameter as an intermediate variable." },
      { stepNumber: 2, title: "Implicit differentiation", latex: "\\frac{d}{dx}F(x, y(x)) = 0", explanation: "Differentiate both sides of the identity; every y-term produces a dy/dx factor via the chain rule." },
      { stepNumber: 3, title: "Solve for dy/dx", latex: "\\frac{dy}{dx} = -\\frac{F_x}{F_y}", explanation: "Collect the dy/dx terms and isolate — e.g. x² + y² = a² ⇒ dy/dx = −x/y." },
    ],
    conclusion:
      "Parametric: divide the two rates; implicit: differentiate through and solve — both extend the calculus to curves with no explicit y = f(x).",
    keyTakeaways: [
      "Second derivative of parametric: d²y/dx² = (d/dt)(dy/dx) ÷ dx/dt.",
      "In implicit work, y² differentiates to 2y·y′.",
      "Circle/ellipse tangents almost always use implicit form.",
    ],
    examTraps: [
      "Forgetting the y′ factor on every y-term.",
      "Dividing dy/dt by dx/dt upside down.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Circle tangent", condition: "x² + y² = a²", formula: "\\frac{dy}{dx} = -\\frac{x}{y}", meaning: "Tangent at (x₁,y₁): xx₁ + yy₁ = a²." },
      { name: "Vertical tangents", condition: "dx/dt = 0", formula: "\\frac{dy}{dx} \\to \\infty", meaning: "Check parametric denominators before concluding." },
      { name: "Logarithmic differentiation mix", condition: "y = x^x", formula: "\\ln y = x\\ln x \\Rightarrow y' = x^x(1+\\ln x)", meaning: "Implicit-style trick for variable bases." },
    ],
    solvedProblems: [],
  },
  {
    id: "math-12-integration-methods",
    slug: "integration-substitution-parts-partial-fractions",
    title: "Integration: Substitution, By Parts & Partial Fractions",
    subject: "mathematics",
    unit: "Integration",
    unitId: "integration",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Calculus)",
    isExtra: true,
    statement:
      "Three master methods reduce unfamiliar integrals to standard ones: substitution (reverse chain rule), integration by parts (reverse product rule), and partial fractions (rational functions).",
    coreFormula: "\\int f(g(x))g'(x)dx = \\int f(u)du, \\quad \\int uv\\,dx = u\\int v\\,dx - \\int\\left(u'\\int v\\,dx\\right)dx",
    concernedTerms: [
      { term: "Antiderivative", symbol: "∫f dx", units: "—", definition: "F with F′ = f." },
      { term: "LIATE", units: "—", definition: "Order for choosing u in by-parts: Log, Inverse trig, Algebraic, Trig, Exponential." },
    ],
    assumptions: ["Continuity on the interval.", "Partial fractions only for proper rational functions."],
    proofSteps: [
      { stepNumber: 1, title: "Substitution", latex: "u = g(x) \\Rightarrow du = g'(x)dx", explanation: "The chain rule run backwards: the differential du absorbs g′dx." },
      { stepNumber: 2, title: "By parts from the product rule", latex: "(uv)' = u'v + uv' \\Rightarrow uv = \\int u'v + \\int uv'", explanation: "Integrate both sides and rearrange to isolate ∫uv′dx." },
      { stepNumber: 3, title: "Partial fractions", latex: "\\frac{P(x)}{Q(x)} = \\sum \\frac{A_i}{(x-a_i)^{k_i}} + \\cdots", explanation: "Factor the denominator; split into simpler fractions, each integrable by log or power rules." },
    ],
    conclusion:
      "Substitution untangles composites, parts untangles products, partial fractions untangles quotients — together they cover the NEB integral canon.",
    keyTakeaways: [
      "By-parts needs the LIATE choice; a wrong u makes the integral worse.",
      "∫eˣ(f + f′)dx = eˣf(x) + C — the famous special pattern.",
      "Always + C for indefinite integrals.",
    ],
    examTraps: [
      "Forgetting dx→du conversion (missing g′).",
      "Choosing the exponential as u in by-parts (it should usually be v).",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Cyclic by-parts", condition: "∫e^{ax}sin bx dx", formula: "\\text{returns to itself} \\Rightarrow \\text{solve algebraically}", meaning: "Two rounds of parts circle back — solve for the integral." },
      { name: "Repeated linear factors", condition: "(x−a)² in denominator", formula: "\\frac{A}{x-a} + \\frac{B}{(x-a)^2}", meaning: "Full partial-fraction form required." },
      { name: "Trig substitution", condition: "a² − x², a² + x²", formula: "x = a\\sin\\theta,\\ x = a\\tan\\theta", meaning: "Geometric substitution clears the radical." },
    ],
    solvedProblems: [],
  },
  {
    id: "math-12-definite-integral-properties",
    slug: "definite-integrals-and-properties",
    title: "Definite Integrals & Their Properties",
    subject: "mathematics",
    unit: "Integration",
    unitId: "integration",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Calculus)",
    isExtra: true,
    statement:
      "The definite integral is a limit of Riemann sums evaluated by the fundamental theorem; its symmetry properties halve exam work.",
    coreFormula: "\\int_a^b f = F(b) - F(a), \\quad \\int_a^b f = \\int_a^b f(a+b-x)dx, \\quad \\int_{-a}^{a} f = \\begin{cases} 2\\int_0^a f & f \\text{ even}\\\\ 0 & f \\text{ odd}\\end{cases}",
    concernedTerms: [
      { term: "Antiderivative", symbol: "F", units: "—", definition: "Any function with F′ = f (differ by constants)." },
      { term: "Riemann sum", symbol: "Σf(xᵢ)Δx", units: "—", definition: "Limit of rectangle areas defines the integral." },
    ],
    assumptions: ["f continuous on [a, b]."],
    proofSteps: [
      { stepNumber: 1, title: "Fundamental theorem", latex: "\\int_a^b f(x)dx = F(b) - F(a)", explanation: "FTC part 2: the accumulation function's net change equals the antiderivative difference." },
      { stepNumber: 2, title: "Reversal property", latex: "\\int_b^a f = -\\int_a^b f", explanation: "Swapping limits flips sign — orientation matters." },
      { stepNumber: 3, title: "King property (a+b−x)", latex: "I = \\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx", explanation: "Substitution u = a+b−x mirrors the interval; adding the two forms of I yields 2I and evaluates many trigonometric integrals instantly." },
      { stepNumber: 4, title: "Even/odd symmetry", latex: "f(-x) = \\pm f(x) \\Rightarrow \\int_{-a}^{a} f = 2I \\text{ or } 0", explanation: "Areas cancel or double about the origin." },
    ],
    conclusion:
      "FTC evaluates; symmetry (especially the king property) short-circuits: ∫₀^π x·sin x type integrals collapse in one line.",
    keyTakeaways: [
      "King property: I = ∫f(a+b−x); add the two I's to solve.",
      "∫₀^a f = ∫₀^a f(a−x) for the 0-to-a version.",
      "Absolute-area caveat: ∫|f| accounts for sign changes.",
    ],
    examTraps: [
      "Forgetting to change the limits after substitution.",
      "Applying the king property without adding the original form.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Periodic integrand", condition: "f(T + x) = f(x)", formula: "\\int_0^{nT} f = n\\int_0^T f", meaning: "Repeat periods n times." },
      { name: "King property classic", condition: "∫₀^π (x sinx)/(1+cos²x)", formula: "I = \\frac{\\pi^2}{4}\\int_0^\\pi \\frac{\\sin x}{1+\\cos^2 x}dx", meaning: "x → π−x pulls x out as π/2 average." },
      { name: "Area between curves", condition: "f ≥ g on [a,b]", formula: "A = \\int_a^b (f-g)dx", meaning: "Difference of the antiderivatives." },
    ],
    solvedProblems: [],
  },
  {
    id: "math-12-differential-equations-linear",
    slug: "solving-first-order-differential-equations",
    title: "Differential Equations: Variable Separable & Linear (Integrating Factor)",
    subject: "mathematics",
    unit: "Differential Equations",
    unitId: "differential-equations",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Calculus)",
    isExtra: true,
    statement:
      "First-order first-degree equations solve by separating variables when possible, or by the integrating factor e^∫P dx for the linear form dy/dx + Py = Q.",
    coreFormula: "\\int f(y)dy = \\int g(x)dx, \\qquad y\\,e^{\\int P dx} = \\int Q\\,e^{\\int P dx}dx + C",
    concernedTerms: [
      { term: "Integrating factor", symbol: "IF", units: "—", definition: "e^∫P dx; multiplies the linear ODE into an exact derivative." },
      { term: "General solution", symbol: "—", units: "—", definition: "One-parameter family covering all initial conditions." },
    ],
    assumptions: ["P, Q continuous in x.", "First order, first degree."],
    proofSteps: [
      { stepNumber: 1, title: "Variable separable", latex: "\\frac{dy}{dx} = g(x)h(y) \\Rightarrow \\frac{dy}{h(y)} = g(x)dx", explanation: "Split the variables to opposite sides and integrate both." },
      { stepNumber: 2, title: "Linear form and IF", latex: "\\frac{dy}{dx} + Py = Q \\times e^{\\int P dx}", explanation: "Multiplying by IF makes the left side exactly the derivative of y·IF." },
      { stepNumber: 3, title: "Recognise the derivative", latex: "\\frac{d}{dx}\\left(ye^{\\int P dx}\\right) = Qe^{\\int P dx}", explanation: "Product rule in reverse — the defining trick of the method." },
      { stepNumber: 4, title: "Integrate once", latex: "ye^{\\int P dx} = \\int Qe^{\\int P dx}dx + C", explanation: "The general solution formula applied to any linear ODE." },
    ],
    conclusion:
      "Separable or linear: every first-order NEB equation falls to one of these two moves; the IF formula is the single most reusable result of the unit.",
    keyTakeaways: [
      "Homogeneous ODEs convert to separable via y = vx.",
      "Growth/decay dN/dt = kN is the model separable equation.",
      "Check the solution by differentiating back.",
    ],
    examTraps: [
      "Losing the constant C in either method.",
      "Computing the IF with the wrong sign of P.",
    ],
    visualType: "graph",
    specialCases: [
      { name: "Radioactive decay", condition: "dN/dt = −λN", formula: "N = N_0e^{-\\lambda t}", meaning: "Separable; half-life 0.693/λ." },
      { name: "Newton's cooling", condition: "dT/dt = k(T − T_s)", formula: "T = T_s + (T_0 - T_s)e^{kt}", meaning: "Linear shift makes it separable." },
      { name: " Bernoulli type", condition: "y′ + Py = Qyⁿ", formula: "v = y^{1-n} \\text{ linearises}", meaning: "Substitution reduces to the linear form." },
    ],
    solvedProblems: [],
  },
  {
    id: "math-12-vector-dot-cross",
    slug: "dot-product-cross-product-applications",
    title: "Vector Algebra: Dot & Cross Products with Work and Torque Applications",
    subject: "mathematics",
    unit: "Vector Algebra",
    unitId: "vector-algebra",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Vectors)",
    isExtra: true,
    statement:
      "The dot product a·b = |a||b|cosθ measures projection (work W = F·d); the cross product a×b = |a||b|sinθ n̂ measures rotational tendency (torque τ = r×F).",
    coreFormula: "\\vec a\\cdot\\vec b = ab\\cos\\theta, \\qquad |\\vec a\\times\\vec b| = ab\\sin\\theta",
    concernedTerms: [
      { term: "Scalar (dot) product", symbol: "a·b", units: "—", definition: "Scalar measuring alignment; zero for perpendicular vectors." },
      { term: "Vector (cross) product", symbol: "a×b", units: "—", definition: "Perpendicular vector; zero for parallel vectors." },
    ],
    assumptions: ["Right-handed coordinate system.", "Euclidean 3-space."],
    proofSteps: [
      { stepNumber: 1, title: "Dot product from components", latex: "\\vec a\\cdot\\vec b = a_1b_1 + a_2b_2 + a_3b_3", explanation: "Expand the cosine definition using î·î = 1, î·ĵ = 0." },
      { stepNumber: 2, title: "Angle extraction", latex: "\\cos\\theta = \\frac{\\vec a\\cdot\\vec b}{ab}", explanation: "Immediate use: perpendicularity tests (a·b = 0) and projection a·b̂." },
      { stepNumber: 3, title: "Cross product determinant", latex: "\\vec a\\times\\vec b = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}", explanation: "Component formula encoding right-hand orientation." },
      { stepNumber: 4, title: "Physics applications", latex: "W = \\vec F\\cdot\\vec d, \\quad \\vec\\tau = \\vec r\\times\\vec F", explanation: "Projection physics is dot; rotation physics is cross — the syllabus's two named applications." },
    ],
    conclusion:
      "Dot answers 'how much along', cross answers 'how much around'; together they span vector mechanics.",
    keyTakeaways: [
      "a·b = 0 ⇔ perpendicular; a×b = 0 ⇔ parallel (or zero).",
      "|a×b| = area of the parallelogram spanned.",
      "Cross product is anti-commutative: b×a = −a×b.",
    ],
    examTraps: [
      "Sign errors in the 3×3 determinant expansion (middle term positive).",
      "Using degrees inside cos when the calculator is in radians.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Unit vectors", condition: "î × ĵ = k̂", formula: "\\hat j\\times\\hat i = -\\hat k", meaning: "Cyclic order positive, swaps negative." },
      { name: "Scalar triple product", condition: "[a b c]", formula: "[\\vec a\\,\\vec b\\,\\vec c] = \\vec a\\cdot(\\vec b\\times\\vec c)", meaning: "Volume of the parallelepiped; zero ⇒ coplanar." },
      { name: "Lagrange identity", condition: "Magnitude relation", formula: "|a\\times b|^2 + (a\\cdot b)^2 = a^2b^2", meaning: "Bridge between the two products." },
    ],
    solvedProblems: [],
  },
  {
    id: "math-12-3d-geometry-distance",
    slug: "direction-cosines-distance-point-plane",
    title: "3D Geometry: Direction Cosines & Distance of a Point from a Plane",
    subject: "mathematics",
    unit: "Three Dimensional Geometry",
    unitId: "three-dimensional-geometry",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Geometry)",
    isExtra: true,
    statement:
      "A line's direction cosines satisfy l² + m² + n² = 1; the perpendicular distance from P(x₁,y₁,z₁) to plane ax+by+cz+d = 0 is |ax₁+by₁+cz₁+d|/√(a²+b²+c²).",
    coreFormula: "l^2+m^2+n^2 = 1, \\qquad D = \\frac{|ax_1+by_1+cz_1+d|}{\\sqrt{a^2+b^2+c^2}}",
    concernedTerms: [
      { term: "Direction cosines", symbol: "l, m, n", units: "—", definition: "Cosines of the angles a line makes with the axes." },
      { term: "Normal vector", symbol: "(a,b,c)", units: "—", definition: "Coefficient triple of the plane equation — perpendicular to the plane." },
    ],
    assumptions: ["Cartesian coordinates.", "Non-degenerate plane (a²+b²+c² ≠ 0)."],
    proofSteps: [
      { stepNumber: 1, title: "Cosine identity", latex: "l^2+m^2+n^2 = \\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma = 1", explanation: "A unit vector's components are the direction cosines; unit length forces the sum of squares to one." },
      { stepNumber: 2, title: "Projection onto the normal", latex: "D = \\left|\\text{proj}_{\\hat n}(P - A)\\right|", explanation: "Distance from the plane is the component of any point-to-plane vector along the unit normal." },
      { stepNumber: 3, title: "Compute", latex: "D = \\frac{|(P-A)\\cdot(a,b,c)|}{\\sqrt{a^2+b^2+c^2}} = \\frac{|ax_1+by_1+cz_1+d|}{\\sqrt{a^2+b^2+c^2}}", explanation: "With A a plane point satisfying ax+by+cz+d = 0, the dot product reduces to the familiar numerator." },
    ],
    conclusion:
      "Direction cosines carry the line's orientation (summing in squares to 1); plane distances are just normal-projections of the coefficient vector.",
    keyTakeaways: [
      "Normalise (a,b,c) once — many 3D formulas shrink.",
      "Same-side test: sign of ax₁+by₁+cz₁+d for two points.",
      "Line–plane angle uses sin θ = |n̂·b̂|.",
    ],
    examTraps: [
      "Forgetting |·| — distances are non-negative.",
      "Using direction RATIOS as cosines without normalising.",
    ],
    visualType: "schematic",
    specialCases: [
      { name: "Origin distance", condition: "P = (0,0,0)", formula: "D = \\frac{|d|}{\\sqrt{a^2+b^2+c^2}}", meaning: "Special case of the formula." },
      { name: "Parallel planes", condition: "ax+by+cz+d₁ = 0, d₂", formula: "D = \\frac{|d_1 - d_2|}{\\sqrt{a^2+b^2+c^2}}", meaning: "Distance between planes — difference of constants over norm." },
      { name: "Foot of perpendicular", condition: "Projection of P", formula: "\\left(x_1 - \\frac{aD'}{\\cdot}, \\dots\\right)", meaning: "Parametrise along the normal and solve." },
    ],
    solvedProblems: [],
  },
  {
    id: "math-12-bayes-theorem",
    slug: "bayes-theorem-probability",
    title: "Probability: Bayes' Theorem & Conditional Probability",
    subject: "mathematics",
    unit: "Probability",
    unitId: "probability",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Probability)",
    isExtra: true,
    statement:
      "From P(A|B) = P(A∩B)/P(B) and total probability follows Bayes' theorem P(Eᵢ|A) = P(Eᵢ)P(A|Eᵢ)/Σ P(Eⱼ)P(A|Eⱼ) — inverting conditional probabilities.",
    coreFormula: "P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum_j P(E_j)P(A|E_j)}",
    concernedTerms: [
      { term: "Prior", symbol: "P(Eᵢ)", units: "—", definition: "Probability of cause Eᵢ before evidence." },
      { term: "Posterior", symbol: "P(Eᵢ|A)", units: "—", definition: "Updated probability after observing event A." },
    ],
    assumptions: ["E₁…Eₙ partition the sample space.", "P(A) > 0."],
    proofSteps: [
      { stepNumber: 1, title: "Conditional probability", latex: "P(A|B) = \\frac{P(A\\cap B)}{P(B)}", explanation: "Restrict the sample space to B and renormalise." },
      { stepNumber: 2, title: "Multiplication rule both ways", latex: "P(E_i\\cap A) = P(E_i)P(A|E_i) = P(A)P(E_i|A)", explanation: "Intersection probability expressed in two orders." },
      { stepNumber: 3, title: "Total probability", latex: "P(A) = \\sum_j P(E_j)P(A|E_j)", explanation: "The partition splits A into disjoint pieces Eⱼ∩A." },
      { stepNumber: 4, title: "Bayes' theorem", latex: "P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum_j P(E_j)P(A|E_j)}", explanation: "Divide one piece by the total — the inversion formula behind diagnosis and detection problems." },
    ],
    conclusion:
      "Bayes' theorem flips the conditioning: from effects back to causes, weighted by their priors — the mathematics of medical tests and quality control.",
    keyTakeaways: [
      "Draw the tree: branches = causes, second level = evidence.",
      "Denominator is P(A) computed by total probability.",
      "Rare diseases keep posteriors low even for accurate tests (base-rate trap).",
    ],
    examTraps: [
      "Swapping P(A|B) with P(B|A) — the classic inversion error.",
      "Forgetting to verify the causes partition the space.",
    ],
    visualType: "tree",
    specialCases: [
      { name: "Two causes", condition: "E₁, E₂ only", formula: "P(E_1|A) = \\frac{P(E_1)P(A|E_1)}{P(E_1)P(A|E_1)+P(E_2)P(A|E_2)}", meaning: "The standard exam setup." },
      { name: "Independent events", condition: "P(A∩B) = P(A)P(B)", formula: "P(A|B) = P(A)", meaning: "Evidence doesn't move the probability." },
      { name: "False positives", condition: "Test sensitivity/specificity", formula: "\\text{PPV} = \\frac{s\\cdot p}{s\\cdot p + (1-f)(1-p)}", meaning: "Screening interpretation of Bayes." },
    ],
    solvedProblems: [],
  },
  {
    id: "math-11-trig-equations-general-values",
    slug: "trigonometric-equations-general-values",
    title: "Trigonometry: Trigonometric Equations & General Values",
    subject: "mathematics",
    unit: "Trigonometry",
    unitId: "trigonometry",
    gradeTrack: "grade-11",
    nebCode: "Mat. 007 (Trigonometry)",
    isExtra: false,
    statement:
      "sin θ = k has solutions θ = nπ + (−1)ⁿα, cos θ = k has θ = 2nπ ± α, tan θ = k has θ = nπ + α — infinite solution families expressed with one principal value α.",
    coreFormula: "\\sin\\theta = \\sin\\alpha \\Rightarrow \\theta = n\\pi + (-1)^n\\alpha, \\quad \\cos\\theta = \\cos\\alpha \\Rightarrow \\theta = 2n\\pi \\pm \\alpha, \\quad \\tan\\theta = \\tan\\alpha \\Rightarrow \\theta = n\\pi + \\alpha",
    concernedTerms: [
      { term: "Principal value", symbol: "α", units: "rad", definition: "The solution in the standard range (sin: [−π/2, π/2], cos: [0, π], tan: (−π/2, π/2))." },
      { term: "General value", symbol: "θ(n)", units: "rad", definition: "Full solution family indexed by n ∈ ℤ." },
    ],
    assumptions: ["θ in radians unless stated.", "k within the function's range."],
    proofSteps: [
      { stepNumber: 1, title: "Sine symmetry", latex: "\\sin(\\pi - \\alpha) = \\sin\\alpha,\\ \\sin(\\pi+\\alpha) = -\\sin\\alpha", explanation: "Unit-circle symmetry: sine repeats positively on each π revolution with alternating sign — packed into (−1)ⁿ." },
      { stepNumber: 2, title: "Cosine symmetry", latex: "\\cos(-\\alpha) = \\cos\\alpha,\\ \\cos(2\\pi\\pm\\alpha) = \\cos\\alpha", explanation: "Cosine is even and π-periodic-in-sign ⇒ solutions come in ± pairs every 2π." },
      { stepNumber: 3, title: "Tangent periodicity", latex: "\\tan(\\pi + \\alpha) = \\tan\\alpha", explanation: "Tan repeats every π — the simplest general value nπ + α." },
    ],
    conclusion:
      "Reduce to sin θ = sin α (or cos/tan), then read off the general value; always give α as the principal value first.",
    keyTakeaways: [
      "Find α FIRST, then attach the pattern.",
      "sin²θ forms: sinθ = ±√… → two families.",
      "Check solutions against the given interval before answering.",
    ],
    examTraps: [
      "Giving degrees when the question set radians (or vice versa).",
      "Forgetting the (−1)ⁿ in sine general values.",
    ],
    visualType: "circle",
    specialCases: [
      { name: "sin θ = 0", condition: "k = 0", formula: "\\theta = n\\pi", meaning: "Simplest family." },
      { name: "cos θ = 1", condition: "k = 1", formula: "\\theta = 2n\\pi", meaning: "Only the full-turn solutions." },
      { name: "Squaring trap", condition: "Equation squared to solve", formula: "\\text{verify roots}", meaning: "Squaring introduces extraneous roots — always check." },
    ],
    solvedProblems: [],
  },
  {
    id: "math-11-logic-set-truth-tables",
    slug: "logic-set-statements-truth-tables",
    title: "Logic & Set: Statements, Connectives, Truth Tables & Set-Operation Theorems",
    subject: "mathematics",
    unit: "Algebra",
    unitId: "algebra",
    gradeTrack: "grade-11",
    nebCode: "Mat. 007 (Logic & Sets)",
    isExtra: false,
    statement:
      "Compound statements built from ¬, ∧, ∨, ⇒, ⇔ obey truth-functional rules that mirror set operations: ∧ ↔ ∩, ∨ ↔ ∪, ¬ ↔ complement — De Morgan's laws live in both worlds.",
    coreFormula: "\\neg(p\\wedge q) \\equiv \\neg p \\vee \\neg q \\iff (A\\cap B)^c = A^c \\cup B^c",
    concernedTerms: [
      { term: "Tautology", symbol: "T", units: "—", definition: "Compound statement true for every assignment." },
      { term: "Contingency", symbol: "—", units: "—", definition: "Neither tautology nor contradiction." },
    ],
    assumptions: ["Two-valued (classical) logic.", "p, q, r are well-formed statements."],
    proofSteps: [
      { stepNumber: 1, title: "Truth tables of the connectives", latex: "p\\wedge q,\\ p\\vee q,\\ p\\Rightarrow q,\\ p\\Leftrightarrow q", explanation: "Four rows each; ⇒ is false only for T⇒F — the row students forget." },
      { stepNumber: 2, title: "De Morgan for logic", latex: "\\neg(p\\wedge q) \\equiv \\neg p\\vee\\neg q", explanation: "Tabulate both sides — identical columns ⇒ logical equivalence." },
      { stepNumber: 3, title: "Set correspondence", latex: "x \\in (A\\cap B)^c \\iff x\\notin A \\text{ or } x\\notin B", explanation: "Element-chasing proves the set form; the analogy (∧↔∩, ∨↔∪) is exact — Boolean algebra underlies both." },
      { stepNumber: 4, title: "Implication equivalences", latex: "p\\Rightarrow q \\equiv \\neg p\\vee q \\equiv \\neg q \\Rightarrow \\neg p", explanation: "Material implication and its contrapositive — the basis of proof by contraposition." },
    ],
    conclusion:
      "Truth tables certify logical equivalences; the same algebra governs set operations, with De Morgan as the flagship bridge.",
    keyTakeaways: [
      "¬ distributes ∧↔∨ — flip the operator when negating.",
      "p⇒q ≡ contrapositive, but NOT ≡ converse.",
      "Logic truths transfer to sets word-for-word via the correspondence.",
    ],
    examTraps: [
      "Treating T⇒F as true (it is the ONLY false row).",
      "Confusing converse with contrapositive.",
    ],
    visualType: "table",
    specialCases: [
      { name: "Tautology test", condition: "All rows true", formula: "(p\\wedge(p\\Rightarrow q))\\Rightarrow q", meaning: "Modus ponens — the pattern of all deduction." },
      { name: "Vacuous truth", condition: "p false", formula: "p\\Rightarrow q \\equiv T", meaning: "Why 'if pigs fly, 2+2=5' is TRUE in logic." },
      { name: "Set difference form", condition: "A − B", formula: "A - B = A\\cap B^c", meaning: "Difference as intersection with complement." },
    ],
    solvedProblems: [],
  },
];

export const MATH_WAVE2_DERIVATIONS = m2;
