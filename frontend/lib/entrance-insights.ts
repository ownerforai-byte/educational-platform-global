/**
 * Entrance-exam knowledge layer for the 3D / topic labs.
 *
 * A curated, keyword-matched bank of what actually gets asked in NEB, IoE,
 * CMAT, NUAA, KU and Pulchowk entrance papers: exam weightage, must-know
 * formulas, conceptual points, the traps candidates fall into, and a typical
 * question pattern. Injected under every topic lab via lib/topic-3d-map.tsx.
 *
 * Matching is first-hit-wins, so entries are ordered SPECIFIC → GENERAL to
 * avoid cross-subject false positives (e.g. "circular motion" before the broad
 * mechanics entry, "power of a lens" before "power").
 */

export interface EntranceInsightData {
  /** Display title for the panel. */
  title: string;
  /** Lowercase title substrings that route a topic lab to this entry. */
  match: string[];
  /** Which exams lean on this topic and how often. */
  weightage: string;
  /** Must-know formulas (KaTeX, no surrounding $). */
  formulas: { tex: string; note?: string }[];
  /** Conceptual points that decide MCQs. */
  keyPoints: string[];
  /** Mistakes candidates repeatedly make. */
  traps: string[];
  /** A representative past-paper style prompt. */
  pyq?: string;
}

export const ENTRANCE_INSIGHTS: EntranceInsightData[] = [
  /* Placed first: bio-specific keywords must win before the broad math "vector" entry
     can grab titles like "Restriction Enzymes & Vectors". */
  {
    title: "Biotechnology & Molecular Biology",
    match: ["biotechnology", "biotech", "pcr", "restriction enzyme", "recombinant", "cloning", "plasmid", "gel electrophoresis", "genetic engineering", "bioreactor", "dna fingerprint", "gene therapy", "transgenic", "ligase", "cdna", "gene transfer"],
    weightage:
      "Moderate–high — recombinant DNA technology, PCR and restriction enzymes feature in modern medical and NEB biology syllabi.",
    formulas: [
      { tex: "\\text{PCR: denature}\\to\\text{anneal}\\to\\text{extend}", note: "thermal cycling" },
    ],
    keyPoints: [
      "Restriction enzymes cut DNA at specific palindromic sequences; ligase joins fragments.",
      "PCR amplifies DNA through repeated denaturation, annealing and extension cycles.",
      "A vector (plasmid) carries foreign DNA into a host for cloning/expression.",
      "Gel electrophoresis separates DNA fragments by size.",
    ],
    traps: [
      "Confusing the roles of restriction enzyme (cut) and ligase (join).",
      "Misordering the PCR steps.",
      "Assuming cDNA contains introns (it does not — it is made from mRNA).",
    ],
    pyq: "Outline the steps of recombinant DNA technology and explain the role of restriction enzymes and vectors.",
  },

  /* ===================== MATHEMATICS ===================== */
  {
    title: "Statistics & Probability",
    match: ["measure of dispersion", "standard deviation", "coefficient of variation", "skewness", "karl pearson", "statistics", "probability", "mean deviation", "mean & variance", "mean and variance", "variance", "quartile", "percentile", "random variable", "binomial distribution", "poisson distribution", "bayes", "conditional probability", "independent event"],
    weightage:
      "High — a mean/variance/standard-deviation numerical plus probability and Bayes' theorem MCQs appear in IoE, CMAT, NUAA and KU entrance sets every year.",
    formulas: [
      { tex: "\\sigma=\\sqrt{\\frac{\\sum (x_i-\\bar x)^2}{n}},\\quad CV=\\frac{\\sigma}{\\bar x}\\times100\\%", note: "std deviation & CV" },
      { tex: "P(A|B)=\\frac{P(A\\cap B)}{P(B)}", note: "conditional probability" },
      { tex: "P(A)=\\frac{n(A)}{n(S)}", note: "classical probability" },
      { tex: "P(X=r)=\\binom nr p^r q^{n-r}", note: "binomial distribution" },
    ],
    keyPoints: [
      "Variance is additive for independent variables; standard deviation is in the data's own units.",
      "Bayes' theorem reverses conditional probability — from cause→effect to effect→cause.",
      "For independent events P(A∩B) = P(A)·P(B); for mutually exclusive events P(A∩B) = 0.",
      "The coefficient of variation compares the spread of data sets with different means/units.",
    ],
    traps: [
      "Confusing mutually exclusive with independent events.",
      "Forgetting to square the deviations when computing variance.",
      "Applying the addition rule P(A∪B)=P(A)+P(B) without subtracting P(A∩B).",
    ],
    pyq: "A die is thrown twice. Find the probability that the sum is 9, and the probability of at least one six.",
  },
  {
    title: "Calculus — Limits, Continuity & Differentiation",
    match: ["calculus", "limits", "limit of a function", "concept of limit", "continuity", "derivative", "differentiation", "anti-derivative", "differentiability", "slope of tangent", "tangent", "rate of change", "maxima", "minima", "max/min", "increasing and decreasing", "indeterminate", "leibniz", "parametric", "implicit"],
    weightage:
      "Very high — limits, derivatives and maxima/minima are the backbone of every engineering and science entrance mathematics paper.",
    formulas: [
      { tex: "\\lim_{x\\to0}\\frac{\\sin x}{x}=1,\\quad \\lim_{x\\to0}\\frac{e^x-1}{x}=1", note: "standard limits" },
      { tex: "\\frac{d}{dx}(x^n)=nx^{n-1},\\quad (uv)'=u'v+uv'", note: "power & product rules" },
      { tex: "\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}", note: "parametric differentiation" },
      { tex: "f'(c)=0\\ \\text{at extrema}", note: "critical points" },
    ],
    keyPoints: [
      "Continuity at a point needs limit to exist and equal the function value.",
      "Differentiability implies continuity, but the reverse is false (e.g. |x| at 0).",
      "The derivative is the slope of the tangent / instantaneous rate of change.",
      "Use the second-derivative test to classify maxima (f''<0) and minima (f''>0).",
    ],
    traps: [
      "Applying L'Hôpital's rule to a form that is not 0/0 or ∞/∞.",
      "Forgetting the chain rule on composite functions.",
      "Assuming a critical point is always an extremum (it may be an inflection).",
    ],
    pyq: "Evaluate lim(x→0) (1 − cos x)/x² and find the points where f(x) = x³ − 3x has a maximum or minimum.",
  },
  {
    title: "Integration",
    match: ["integral", "integration", "definite integral", "area under", "area between", "area applications", "integration by parts", "partial fraction"],
    weightage:
      "High — definite integrals, area under curves and integration techniques are guaranteed in engineering entrance mathematics.",
    formulas: [
      { tex: "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C\\ (n\\neq-1)", note: "power rule" },
      { tex: "\\int u\\,dv=uv-\\int v\\,du", note: "integration by parts" },
      { tex: "A=\\int_a^b y\\,dx", note: "area under a curve" },
      { tex: "\\int_a^b f(x)\\,dx=F(b)-F(a)", note: "fundamental theorem" },
    ],
    keyPoints: [
      "Integration is the reverse of differentiation; the constant C matters for indefinite integrals.",
      "A definite integral gives a signed area — below the axis counts negative.",
      "Choose ILATE to pick u for integration by parts.",
    ],
    traps: [
      "Dropping the constant of integration.",
      "Forgetting to split the area where the curve crosses the axis.",
      "Sign errors when swapping the limits of integration.",
    ],
    pyq: "Find the area bounded by y = x² and y = x.",
  },
  {
    title: "Vectors & 3D Geometry",
    match: ["vector", "scalar & vector", "dot product", "cross product", "coplanar", "collinear", "coordinates in space", "direction cosine", "direction ratio", "position vector", "unit vector", "scalar triple", "vector triple", "triple product", "linear combination", "line in space", "plane equation", "3d geometry", "parallelogram law", "triangle law", "polygon law"],
    weightage:
      "High — dot/cross products, collinearity/coplanarity and direction cosines are frequent in IoE, CMAT and NEB mathematics.",
    formulas: [
      { tex: "\\vec a\\cdot\\vec b=|a||b|\\cos\\theta", note: "dot (scalar) product" },
      { tex: "|\\vec a\\times\\vec b|=|a||b|\\sin\\theta", note: "cross product magnitude" },
      { tex: "[\\vec a\\ \\vec b\\ \\vec c]=\\vec a\\cdot(\\vec b\\times\\vec c)", note: "scalar triple product = volume" },
    ],
    keyPoints: [
      "The dot product is zero for perpendicular vectors; the cross product is zero for parallel ones.",
      "Three vectors are coplanar when their scalar triple product is zero.",
      "The cross product is anti-commutative: a×b = −(b×a).",
    ],
    traps: [
      "Treating the cross product as commutative.",
      "Forgetting direction cosines satisfy l² + m² + n² = 1.",
      "Mixing up the scalar and vector triple products.",
    ],
    pyq: "Show that the vectors a, b, c are coplanar and find the angle between two given vectors using the dot product.",
  },
  {
    title: "Coordinate Geometry",
    match: ["straight line", "pair of straight lines", "coordinate geometry", "analytic geometry", "conic section", "conics", "parabola", "ellipse", "hyperbola", "curve sketching", "asymptote", "locus", "equation of circle"],
    weightage:
      "High — straight lines, circles and conics (parabola/ellipse/hyperbola) are staples of engineering entrance mathematics.",
    formulas: [
      { tex: "y-y_1=m(x-x_1),\\quad m=\\tan\\theta", note: "line & slope" },
      { tex: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1", note: "ellipse" },
      { tex: "y^2=4ax,\\quad e=1", note: "parabola" },
      { tex: "c^2=a^2(1+e^2)\\ (\\text{hyperbola}),\\ b^2=a^2(1-e^2)\\ (\\text{ellipse})", note: "eccentricity relations" },
    ],
    keyPoints: [
      "Parallel lines share slope; perpendicular lines have m₁·m₂ = −1.",
      "Eccentricity classifies conics: e = 0 circle, <1 ellipse, = 1 parabola, > 1 hyperbola.",
      "The general second-degree equation's discriminant tells you which conic it is.",
    ],
    traps: [
      "Sign of the slope for perpendicular lines.",
      "Confusing the standard forms of the conics.",
      "Forgetting distance formula uses squared differences.",
    ],
    pyq: "Find the equation of the line through two points and the eccentricity and foci of a given ellipse.",
  },
  {
    title: "Complex Numbers & Quadratic Equations",
    match: ["complex number", "quadratic", "roots of equation", "modulus of a complex", "complex modulus", "argument of a complex", "cube root of unity", "de moivre"],
    weightage:
      "High — complex-number arithmetic, modulus/argument and quadratic roots recur in IoE, CMAT and NU mathematics.",
    formulas: [
      { tex: "z=a+bi,\\quad |z|=\\sqrt{a^2+b^2}", note: "modulus" },
      { tex: "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}", note: "quadratic formula" },
      { tex: "z=r(\\cos\\theta+i\\sin\\theta)", note: "polar form" },
    ],
    keyPoints: [
      "The discriminant b²−4ac decides the nature of the roots (real/distinct, equal, complex).",
      "For real-coefficient quadratics complex roots occur in conjugate pairs.",
      "Multiplying complex numbers adds their arguments and multiplies their moduli.",
    ],
    traps: [
      "Sign errors in the quadratic formula.",
      "Forgetting i² = −1 when simplifying.",
      "Confusing modulus with the real part.",
    ],
    pyq: "Solve z² + 4z + 13 = 0 and express the roots in modulus–argument form.",
  },
  {
    title: "Matrices & Determinants",
    match: ["matrix", "matrices", "determinant", "adjoint", "inverse of a matrix", "cramer", "linear equation", "rank of a matrix"],
    weightage:
      "High — determinants, matrix inverses and solving linear systems (Cramer's rule) are common entrance questions.",
    formulas: [
      { tex: "A^{-1}=\\frac{1}{|A|}\\,\\text{adj}(A)", note: "inverse" },
      { tex: "|AB|=|A||B|", note: "determinant of a product" },
      { tex: "x=\\frac{D_x}{D}", note: "Cramer's rule" },
    ],
    keyPoints: [
      "A matrix is invertible only when its determinant is non-zero.",
      "For a singular system, Cramer's rule fails (division by zero determinant).",
      "The determinant of a triangular matrix is the product of its diagonal entries.",
    ],
    traps: [
      "Forgetting to check |A| ≠ 0 before inverting.",
      "Sign errors in cofactor expansion.",
      "Assuming (A+B)² = A² + 2AB + B² — matrix multiplication is not commutative.",
    ],
    pyq: "Find the inverse of a 2×2 or 3×3 matrix and use Cramer's rule to solve a system of equations.",
  },
  {
    title: "Trigonometry",
    match: ["trigonometr", "inverse circular function", "trigonometric equation", "sine rule", "cosine rule", "compound angle", "multiple angle", "height and distance"],
    weightage:
      "High — identities, trigonometric equations and heights/distances are core to engineering and science entrance mathematics.",
    formulas: [
      { tex: "\\sin^2\\theta+\\cos^2\\theta=1", note: "Pythagorean identity" },
      { tex: "\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B", note: "compound angle" },
      { tex: "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}", note: "sine rule" },
      { tex: "a^2=b^2+c^2-2bc\\cos A", note: "cosine rule" },
    ],
    keyPoints: [
      "Trigonometric equations have general (periodic) solutions, not a single value.",
      "Inverse trig functions have restricted principal ranges.",
      "Heights-and-distances problems rely on tan θ = opposite/adjacent.",
    ],
    traps: [
      "Missing the general solution / extra roots.",
      "Confusing degrees with radians.",
      "Principal-value range errors in inverse trig.",
    ],
    pyq: "Solve 2 sin²θ − sin θ − 1 = 0 for 0 ≤ θ < 2π.",
  },
  {
    title: "Sequences, Series & Binomial Theorem",
    match: ["sequence", "sequence and series", "arithmetic series", "geometric series", "series expansion", "sum of series", "arithmetic progression", "geometric progression", "arithmetic mean", "geometric mean", "binomial theorem", "sum of n terms"],
    weightage:
      "High — AP/GP sums, means and binomial expansions appear regularly in engineering entrance mathematics.",
    formulas: [
      { tex: "S_n=\\frac{n}{2}[2a+(n-1)d]", note: "AP sum" },
      { tex: "S_n=\\frac{a(r^n-1)}{r-1},\\ S_\\infty=\\frac{a}{1-r}\\ (|r|<1)", note: "GP sum" },
      { tex: "(a+b)^n=\\sum_{r=0}^{n}\\binom nr a^{n-r}b^r", note: "binomial theorem" },
    ],
    keyPoints: [
      "An infinite GP converges only when |r| < 1.",
      "The binomial coefficient C(n,r) counts the term positions and appears in probability too.",
      "AM ≥ GM ≥ HM for positive numbers.",
    ],
    traps: [
      "Using the infinite-sum formula when |r| ≥ 1.",
      "Off-by-one errors in the number of terms.",
      "Sign errors in the binomial expansion when b is negative.",
    ],
    pyq: "Find the sum of the first 20 terms of an AP and the coefficient of x³ in (1 + 2x)⁵.",
  },
  {
    title: "Logic, Sets & Numerical Methods",
    match: ["mathematical logic", "logic & set", "logic and set", "proposition", "set theory", "sets", "union", "intersection", "boolean", "computational method", "numerical method", "numerical integration", "root finding", "newton raphson", "interpolation", "trapezoidal", "simpson", "linear programming", "lpp", "graphical method"],
    weightage:
      "Moderate — set operations, logic gates and numerical root-finding feature in computer-oriented and IoE entrance sets.",
    formulas: [
      { tex: "n(A\\cup B)=n(A)+n(B)-n(A\\cap B)", note: "inclusion–exclusion" },
      { tex: "x_{n+1}=x_n-\\frac{f(x_n)}{f'(x_n)}", note: "Newton–Raphson" },
      { tex: "\\int_a^b f\\,dx\\approx\\frac{h}{2}[y_0+2\\sum y_i+y_n]", note: "trapezoidal rule" },
    ],
    keyPoints: [
      "De Morgan's laws relate unions and intersections through complements.",
      "Newton–Raphson converges fast but needs a good initial guess and f'(x) ≠ 0.",
      "Numerical integration approximates area when an analytic integral is hard.",
    ],
    traps: [
      "Forgetting to subtract the intersection in inclusion–exclusion.",
      "Newton–Raphson diverging near a turning point.",
      "Miscounting intervals vs points in the trapezoidal rule.",
    ],
    pyq: "Use the Newton–Raphson method to approximate a root of x³ − x − 2 = 0.",
  },
  {
    title: "Differential Equations",
    match: ["differential equation", "variable separable", "growth & decay", "growth and decay", "solving de", "order and degree", "homogeneous equation", "formation of de", "integrating factor", "linear differential"],
    weightage:
      "Moderate–high — first-order DEs (separable, linear) and growth/decay models appear in IoE, CMAT and NU engineering mathematics.",
    formulas: [
      { tex: "\\frac{dy}{dx}=f(x)g(y)\\Rightarrow\\int\\frac{dy}{g(y)}=\\int f(x)\\,dx", note: "variable separable" },
      { tex: "\\frac{dy}{dx}+Py=Q,\\quad \\text{IF}=e^{\\int P\\,dx}", note: "linear first-order" },
      { tex: "N=N_0e^{kt}", note: "exponential growth/decay" },
    ],
    keyPoints: [
      "Order is the highest derivative present; degree is its power (when polynomial in derivatives).",
      "Separable equations are solved by integrating each variable side.",
      "A linear first-order DE is solved with an integrating factor.",
      "Growth uses k > 0 and decay uses k < 0 in N = N₀e^{kt}.",
    ],
    traps: [
      "Confusing order with degree.",
      "Forgetting the constant of integration / particular solution from the initial condition.",
      "Sign of k in decay problems.",
    ],
    pyq: "Solve dy/dx + y = eˣ using an integrating factor, and model a population that doubles in 10 years.",
  },
  {
    title: "Functions, Algebra & Real Numbers",
    match: ["functions", "domain", "range", "real numbers", "polynomial", "inequality", "logarithm", "exponent", "algebra", "surjective", "injective", "bijective", "composite function", "absolute value"],
    weightage:
      "High — domain/range, function types and algebraic manipulation underpin nearly every entrance mathematics paper.",
    formulas: [
      { tex: "(f\\circ g)(x)=f(g(x))", note: "composition" },
      { tex: "\\log_a(xy)=\\log_a x+\\log_a y", note: "logarithm laws" },
      { tex: "f^{-1}\\ \\text{exists iff}\\ f\\ \\text{is bijective}", note: "invertibility" },
    ],
    keyPoints: [
      "Injective (one-one), surjective (onto), bijective (both) — only bijective functions are invertible.",
      "The domain is the set of valid inputs; the range is the set of outputs.",
      "Composition of functions is generally not commutative.",
    ],
    traps: [
      "Dividing by an expression that could be zero when solving inequalities.",
      "Flipping the inequality sign when multiplying/dividing by a negative.",
      "Confusing the domain of f∘g with the domain of f.",
    ],
    pyq: "Find the domain and range of f(x) = √(x − 2) and determine whether it is one-one and onto.",
  },

  /* ===================== CHEMISTRY ===================== */
  {
    title: "Chemical Bonding & Molecular Structure",
    match: ["chemical bonding", "ionic bond", "covalent bond", "coordinate covalent", "lewis dot", "vsepr", "valence bond", "hybridization", "bond characteristics", "dipole moment", "octet", "metallic bonding", "vander waals", "hydrogen bond", "molecular orbital", "resonance", "bond length", "bond order"],
    weightage:
      "Very high — hybridization, VSEPR shapes, dipole moment and hydrogen bonding are guaranteed MCQs in NEB chemistry and every medical/engineering entrance.",
    formulas: [
      { tex: "\\mu=q\\times d", note: "dipole moment (Debye)" },
      { tex: "\\text{Bond order}=\\frac{N_b-N_a}{2}", note: "MO theory" },
      { tex: "\\%\\ \\text{ionic}=16|\\Delta\\chi|+3.5(\\Delta\\chi)^2", note: "Hannay–Smith" },
    ],
    keyPoints: [
      "Hybridization decides shape: sp linear, sp² trigonal planar, sp³ tetrahedral.",
      "VSEPR: lone pairs repel more than bond pairs, distorting ideal geometry.",
      "Resonance delocalises electrons, lowering energy and equalising bond lengths (benzene).",
      "Hydrogen bonding needs H bonded to F, O or N — it explains water's high boiling point.",
    ],
    traps: [
      "Counting lone pairs wrong in VSEPR shape prediction.",
      "Confusing bond order with bond length trends.",
      "Assuming all covalent molecules are non-polar.",
    ],
    pyq: "Predict the shape and hybridization of NH₃, H₂O and BF₃, and explain which has the larger dipole moment.",
  },
  {
    title: "Periodic Classification & Trends",
    match: ["periodic", "modern periodic", "groups periods", "iupac classification", "electronegativity", "ionization energy", "electron affinity", "atomic radius", "ionic radius", "metallic character", "periodic trend", "effective nuclear charge", "nuclear charge", "block"],
    weightage:
      "Very high — periodic-trend reasoning MCQs (radius, ionization energy, electronegativity) appear in every NEB and medical/engineering paper.",
    formulas: [
      { tex: "Z_{eff}=Z-S", note: "effective nuclear charge (S = shielding)" },
    ],
    keyPoints: [
      "Across a period: atomic radius decreases, ionization energy and electronegativity increase.",
      "Down a group: radius increases, ionization energy decreases, metallic character increases.",
      "Noble gases have the highest ionization energies; halogens the highest electron affinity/electronegativity (after noble gases).",
    ],
    traps: [
      "Exceptions: ionization energy of Be > B and N > O due to stable configurations.",
      "Confusing atomic and ionic radius trends for cations vs anions.",
      "Electronegativity has no units and is not the same as electron affinity.",
    ],
    pyq: "Arrange Na, Mg, Al and Si in order of increasing atomic radius and first ionization energy, with reasons.",
  },
  {
    title: "Chemical Equilibrium",
    match: ["chemical equilibrium", "physical equilibrium", "dynamic equilibrium", "law of mass action", "equilibrium constant", "kp and kc", "le chatelier", "ionic equilibrium", "solubility product", "buffer", "common ion", "degree of dissociation", "ph scale", "ostwald"],
    weightage:
      "Very high — Le Chatelier reasoning, Kp/Kc relations and pH/solubility numericals are NEB and medical-entrance favourites.",
    formulas: [
      { tex: "K_p=K_c(RT)^{\\Delta n}", note: "relation between Kp and Kc" },
      { tex: "\\text{pH}=-\\log[H^+],\\quad \\text{pH}+\\text{pOH}=14", note: "pH scale" },
      { tex: "K_a\\times K_b=K_w=10^{-14}", note: "conjugate pairs" },
      { tex: "K_{sp}=\\text{product of ion concentrations}", note: "solubility product" },
    ],
    keyPoints: [
      "Le Chatelier: a system at equilibrium shifts to oppose the change (concentration, pressure, temperature).",
      "A catalyst speeds both directions equally — it does not change K.",
      "K depends only on temperature; increasing T favours the endothermic direction.",
      "A buffer resists pH change; common-ion effect suppresses dissociation.",
    ],
    traps: [
      "Assuming pressure changes shift equilibria with Δn = 0 (they don't).",
      "Confusing K (constant at fixed T) with the reaction quotient Q.",
      "Sign/log errors in pH and pOH conversions.",
    ],
    pyq: "For N₂ + 3H₂ ⇌ 2NH₃, predict the effect of increasing pressure and temperature, and relate Kp to Kc.",
  },
  {
    title: "Chemical Thermodynamics & Thermochemistry",
    match: ["thermodynamic", "thermochem", "enthalpy", "entropy", "gibbs", "hess", "heat of reaction", "calorimetr", "exothermic", "endothermic", "bond energy", "first law", "second law", "third law", "spontane", "internal energy"],
    weightage:
      "High — ΔG spontaneity, Hess's law and enthalpy numericals are common in NEB chemistry and medical entrances.",
    formulas: [
      { tex: "\\Delta G=\\Delta H-T\\Delta S", note: "Gibbs free energy" },
      { tex: "\\Delta G^\\circ=-RT\\ln K", note: "Gibbs and equilibrium" },
      { tex: "\\Delta H=\\sum BE_{reactants}-\\sum BE_{products}", note: "from bond energies" },
      { tex: "q=mc\\Delta T", note: "calorimetry" },
    ],
    keyPoints: [
      "A process is spontaneous when ΔG < 0; at equilibrium ΔG = 0.",
      "Enthalpy is a state function — Hess's law lets you add reaction steps.",
      "Exothermic reactions release heat (ΔH < 0); entropy measures disorder.",
    ],
    traps: [
      "Sign errors on ΔH and ΔS.",
      "Forgetting the temperature dependence in ΔG = ΔH − TΔS.",
      "Reversing the bond-energy subtraction order.",
    ],
    pyq: "Using given enthalpies of formation, find ΔH for a reaction and predict its spontaneity at a given T.",
  },
  {
    title: "Electrochemistry",
    match: ["electrochemistry", "electrolysis", "galvanic cell", "nernst", "electrode potential", "electrochemical cell", "faraday's laws", "daniell", "standard reduction potential", "battery", "corrosion", "emf of a cell", "electrochemical series", "conductance"],
    weightage:
      "High — Nernst equation, cell EMF and Faraday's laws of electrolysis numericals appear in NEB and engineering entrances.",
    formulas: [
      { tex: "E=E^\\circ-\\frac{0.0591}{n}\\log Q", note: "Nernst equation (298 K)" },
      { tex: "E^\\circ_{cell}=E^\\circ_{cathode}-E^\\circ_{anode}", note: "cell EMF" },
      { tex: "w=\\frac{M\\,I\\,t}{nF},\\quad F=96500\\ \\text{C}", note: "Faraday's first law" },
      { tex: "\\Delta G^\\circ=-nFE^\\circ", note: "Gibbs and EMF" },
    ],
    keyPoints: [
      "Oxidation at the anode, reduction at the cathode (in both galvanic and electrolytic cells).",
      "A positive E°cell means a spontaneous (galvanic) reaction.",
      "The electrochemical series orders elements by reduction potential.",
      "Faraday's laws relate the mass deposited to charge passed.",
    ],
    traps: [
      "Sign of the anode/cathode differs between galvanic and electrolytic cells.",
      "Using ln instead of log (or the wrong constant) in the Nernst equation.",
      "Forgetting n (electrons transferred) in ΔG = −nFE.",
    ],
    pyq: "Calculate the EMF of a Daniell cell under non-standard conditions using the Nernst equation.",
  },
  {
    title: "Chemical Kinetics",
    match: ["chemical kinetics", "rate of reaction", "rate law", "rate constant", "order of reaction", "integrated rate", "factors affecting rate", "arrhenius", "activation energy", "collision theory", "molecularity", "temperature coefficient"],
    weightage:
      "High — rate laws, order determination and the Arrhenius equation are frequent NEB and engineering-entrance questions.",
    formulas: [
      { tex: "k=Ae^{-E_a/RT}", note: "Arrhenius equation" },
      { tex: "\\ln\\frac{k_2}{k_1}=\\frac{E_a}{R}\\left(\\frac1{T_1}-\\frac1{T_2}\\right)", note: "two-temperature form" },
      { tex: "t_{1/2}=\\frac{0.693}{k}\\ (\\text{first order})", note: "first-order half-life" },
      { tex: "\\text{rate}=k[A]^m[B]^n", note: "rate law" },
    ],
    keyPoints: [
      "Order is experimental; molecularity is theoretical (for elementary steps).",
      "A first-order half-life is independent of the initial concentration.",
      "A catalyst lowers the activation energy, increasing k without being consumed.",
      "Rate roughly doubles for every 10 °C rise (temperature coefficient ≈ 2).",
    ],
    traps: [
      "Confusing order with molecularity.",
      "Units of k depend on the order of the reaction.",
      "Using the wrong integrated rate-law form for the order.",
    ],
    pyq: "Given concentration–time data, determine the order of reaction and calculate the rate constant.",
  },
  {
    title: "Solutions & Colligative Properties",
    match: ["solution", "colligative", "raoult", "van't hoff", "elevation of boiling", "depression of freezing", "osmotic", "molarity", "molality", "concentration", "solubility", "mole fraction", "normality", "dilution"],
    weightage:
      "High — colligative-property and concentration numericals are standard in NEB chemistry and medical entrances.",
    formulas: [
      { tex: "\\Delta T_b=K_b m,\\quad \\Delta T_f=K_f m", note: "boiling/freezing changes" },
      { tex: "\\pi=CRT", note: "osmotic pressure" },
      { tex: "i=\\frac{\\text{observed}}{\\text{calculated}}", note: "van't Hoff factor" },
      { tex: "M=\\frac{n}{V(\\text{L})},\\quad m=\\frac{n}{\\text{kg solvent}}", note: "molarity & molality" },
    ],
    keyPoints: [
      "Colligative properties depend only on the number of solute particles, not their identity.",
      "The van't Hoff factor i accounts for dissociation/association of the solute.",
      "Molality (not molarity) is temperature-independent because it uses mass.",
    ],
    traps: [
      "Forgetting the van't Hoff factor for electrolytes.",
      "Confusing molarity and molality units.",
      "Sign of ΔT for boiling-point elevation vs freezing-point depression.",
    ],
    pyq: "Calculate the freezing-point depression of a solution and use it to find the molar mass of the solute.",
  },
  {
    title: "Solid State & Crystal Structure",
    match: ["crystal lattice", "unit cell", "amorphous", "crystalline", "crystallization", "bravais", "packing efficiency", "solid state", "coordination number", "voids", "density of unit cell", "crystal defects", "point defects", "schottky", "frenkel"],
    weightage:
      "Moderate–high — unit-cell packing, coordination number and density numericals appear in NEB and engineering entrances.",
    formulas: [
      { tex: "\\rho=\\frac{Z\\,M}{a^3 N_A}", note: "density of a unit cell" },
      { tex: "\\text{Packing: sc }52.4\\%,\\ \\text{bcc }68\\%,\\ \\text{ccp/fcc }74\\%", note: "packing efficiency" },
    ],
    keyPoints: [
      "Atoms contribute fractionally to a unit cell (corner 1/8, edge 1/4, face 1/2, body 1).",
      "Coordination number is 6 (sc), 8 (bcc), 12 (ccp/fcc).",
      "Crystal defects (Schottky, Frenkel) affect density and conductivity.",
    ],
    traps: [
      "Miscounting the effective number of atoms Z per unit cell.",
      "Confusing the radius–edge relations for sc, bcc and fcc.",
      "Unit errors when converting a in pm to cm for density.",
    ],
    pyq: "An element crystallises in fcc with edge length a; calculate its density and atomic radius.",
  },
  {
    title: "Organic Chemistry & Hydrocarbons",
    match: ["organic", "hydrocarbon", "alkane", "alkene", "alkyne", "aromatic", "benzene", "iupac", "isomerism", "functional group", "nomenclature", "electrophilic", "markovnikov", "huckel", "kekule", "homologous", "substitution reaction", "addition reaction", "elimination", "geometrical isomer", "optical isomer", "chiral", "alcohol", "phenol", "ether", "aldehyde", "ketone", "carboxylic acid", "amine", "haloalkane", "ester", "amide"],
    weightage:
      "Very high — reaction mechanisms, isomerism, IUPAC naming and benzene chemistry are core to NEB and medical entrances.",
    formulas: [
      { tex: "C_nH_{2n+2}\\ (\\text{alkane}),\\ C_nH_{2n}\\ (\\text{alkene})", note: "homologous series" },
      { tex: "(4n+2)\\ \\pi\\ e^-\\ \\Rightarrow\\ \\text{aromatic}", note: "Hückel's rule" },
    ],
    keyPoints: [
      "Alkanes undergo substitution; alkenes/alkynes undergo addition.",
      "Markovnikov's rule: H adds to the carbon with more hydrogens.",
      "Benzene favours electrophilic substitution over addition (retains aromaticity).",
      "Isomerism: structural, geometrical (cis/trans) and optical (chirality).",
    ],
    traps: [
      "Applying Markovnikov's rule to anti-Markovnikov (peroxide) conditions.",
      "Miscounting π electrons for aromaticity.",
      "IUPAC numbering direction errors.",
    ],
    pyq: "Predict the major product of HBr addition to propene, with and without peroxide.",
  },
  {
    title: "Inorganic Chemistry — s, p, d & f Blocks",
    match: ["s-block", "p-block", "d-block", "f-block", "alkali metal", "alkaline earth", "halogen", "noble gas", "transition element", "transition metal", "coordination compound", "complex compound", "ligand", "metallurgy", "extraction of metal", "concentration of ore", "mineral", "lanthanide", "actinide", "colour of ion", "magnetic moment", "sodium carbonate"],
    weightage:
      "High — transition-metal properties, coordination compounds and metallurgy feature heavily in NEB and engineering entrances.",
    formulas: [
      { tex: "\\mu=\\sqrt{n(n+2)}\\ \\text{BM}", note: "magnetic moment (n = unpaired e⁻)" },
    ],
    keyPoints: [
      "Transition metals show variable oxidation states, coloured ions and catalytic behaviour due to partially filled d orbitals.",
      "Coordination number and ligand denticity determine complex geometry.",
      "Metallurgy: concentration → roasting/calcination → reduction → refining.",
    ],
    traps: [
      "Confusing oxidation state with coordination number.",
      "Forgetting that d⁰ and d¹⁰ ions are colourless.",
      "Misassigning ligand strength in the spectrochemical series.",
    ],
    pyq: "Determine the oxidation state, coordination number and magnetic behaviour of [Fe(CN)₆]³⁻.",
  },
  {
    title: "Stoichiometry, Mole Concept & Redox",
    match: ["stoichiometr", "mole concept", "mole calculation", "limiting reactant", "empirical formula", "molecular formula", "avogadro", "dalton", "percentage composition", "equivalent weight", "normality", "theoretical yield", "yield", "oxidation", "reduction", "redox", "oxidation number", "balancing redox", "oxidizing agent", "reducing agent", "titration"],
    weightage:
      "High — mole-concept numericals, limiting reagents and redox balancing are foundational NEB and entrance questions.",
    formulas: [
      { tex: "n=\\frac{m}{M}=\\frac{N}{N_A}=\\frac{V}{22.4\\ \\text{L}}", note: "mole relations (STP)" },
      { tex: "M_1V_1=M_2V_2", note: "dilution / titration" },
      { tex: "\\text{Eq. wt}=\\frac{M}{\\text{n-factor}}", note: "equivalent weight" },
    ],
    keyPoints: [
      "The limiting reactant is fully consumed and determines the maximum product.",
      "Oxidation is loss of electrons (increase in oxidation number); reduction is gain.",
      "Empirical formula is the simplest ratio; molecular formula is a whole-number multiple.",
    ],
    traps: [
      "Using the wrong reactant as limiting.",
      "Sign/errors assigning oxidation numbers.",
      "Forgetting the n-factor when converting molarity to normality.",
    ],
    pyq: "Given masses of two reactants, identify the limiting reagent and calculate the mass of product formed.",
  },
  {
    title: "Descriptive & Applied Chemistry",
    match: ["in everyday life", "applied chemistry", "chemistry of elements", "scope of chemistry", "foundation", "general introduction", "basic concepts", "manufacture", "haber process", "contact process", "polymers", "plaster of paris", "cement", "glass", "soap", "detergent", "fertilizer", "pesticide", "drug", "water treatment", "introduction of chemistry"],
    weightage:
      "Moderate — descriptive and applied chemistry (industrial processes, everyday chemicals) yields easy factual MCQs in NEB and entrance general-science sections.",
    formulas: [
      { tex: "N_2+3H_2\\rightleftharpoons 2NH_3", note: "Haber process" },
      { tex: "2SO_2+O_2\\rightleftharpoons 2SO_3", note: "Contact process" },
    ],
    keyPoints: [
      "Haber process makes ammonia (high pressure, moderate temperature, Fe catalyst); Contact process makes sulphuric acid.",
      "Polymers are long chains of monomers — addition (polythene) or condensation (nylon, bakelite).",
      "Soaps are sodium salts of fatty acids; detergents work in hard water where soaps fail.",
      "Cement, glass and plaster of Paris are important industrial/silicate materials.",
    ],
    traps: [
      "Confusing the conditions/catalysts of the Haber and Contact processes.",
      "Mixing up addition and condensation polymerisation.",
      "Forgetting why detergents outperform soaps in hard water.",
    ],
    pyq: "Describe the Haber process for ammonia with its optimum conditions, and name the catalyst used.",
  },

  /* ===================== BIOLOGY ===================== */
  {
    title: "Cell Biology & Biomolecules",
    match: ["cell biology", "biomolecule", "eukaryotic cell", "prokaryotic", "cell introduction", "introduction to biology", "organelle", "cell membrane", "mitochondri", "ribosome", "endoplasmic", "golgi", "lysosome", "chloroplast", "cell nucleus", "chromosome", "carbohydrate", "protein", "lipid", "nucleic acid", "enzyme", "cell wall"],
    weightage:
      "High — cell organelle functions and biomolecule structure/function are guaranteed MCQs in medical (CMAT/NUAA) and NEB biology entrances.",
    formulas: [
      { tex: "E=mc^2", note: "(not used — biology relies on structural facts)" },
    ],
    keyPoints: [
      "Mitochondria are the powerhouse (ATP via respiration); ribosomes synthesise proteins.",
      "Prokaryotes lack membrane-bound organelles; eukaryotes have a true nucleus.",
      "Enzymes lower activation energy and are specific to their substrate; they denature at high temperature.",
      "DNA is double-stranded with A–T and G–C pairing; RNA is usually single-stranded with uracil.",
    ],
    traps: [
      "Confusing rough ER (protein) with smooth ER (lipid/detox).",
      "Mixing up the sites of glycolysis (cytoplasm) and the Krebs cycle (mitochondria).",
      "Assuming all cells have a cell wall (animal cells do not).",
    ],
    pyq: "Differentiate prokaryotic and eukaryotic cells, and state the function of the Golgi apparatus and lysosome.",
  },
  {
    title: "Cell Division — Mitosis & Meiosis",
    match: ["cell division", "mitosis", "meiosis", "karyokinesis", "cytokinesis", "spindle", "crossing over", "synapsis", "cell cycle", "interphase", "prophase", "metaphase", "anaphase", "telophase"],
    weightage:
      "High — mitosis/meiosis stages and their significance are frequently tested in medical and NEB biology entrances.",
    formulas: [
      { tex: "2n\\to2n\\ (\\text{mitosis}),\\quad 2n\\to n\\ (\\text{meiosis})", note: "chromosome number" },
    ],
    keyPoints: [
      "Mitosis: one division, two identical diploid daughters — growth and repair.",
      "Meiosis: two divisions, four haploid gametes with genetic variation.",
      "Crossing over occurs in prophase I (pachytene) — the source of recombination.",
      "Chromosomes align at the equator in metaphase and separate at anaphase.",
    ],
    traps: [
      "Confusing anaphase of mitosis (sister chromatids) with anaphase I (homologous chromosomes).",
      "Crossing over happens in meiosis I, not meiosis II.",
      "Mixing up the order of substages in prophase I.",
    ],
    pyq: "Describe the events of prophase I of meiosis and explain its significance in variation.",
  },
  {
    title: "Genetics & Inheritance",
    match: ["mendel", "genetics", "genetic", "genes", "gene pool", "gene expression", "inheritance", "allele", "genotype", "phenotype", "dominant", "recessive", "linkage", "sex determination", "pedigree", "punnett", "mutation", "dna", "mrna", "trna", "replication", "transcription", "protein synthesis", "genetic code", "chromosomal disorder", "blood group", "molecular basis"],
    weightage:
      "Very high — Mendelian crosses, Punnett squares, linkage and molecular genetics are core to medical and NEB biology entrances.",
    formulas: [
      { tex: "3:1\\ (\\text{monohybrid F}_2),\\quad 9:3:3:1\\ (\\text{dihybrid F}_2)", note: "phenotypic ratios" },
    ],
    keyPoints: [
      "Law of segregation: alleles separate during gamete formation.",
      "Law of independent assortment applies to genes on different chromosomes.",
      "DNA replicates semi-conservatively; the genetic code is triplet, degenerate and universal.",
      "Sex is determined by X/Y chromosomes in humans; some traits are sex-linked.",
    ],
    traps: [
      "Confusing genotype with phenotype ratios.",
      "Linkage violates independent assortment for genes close together.",
      "Reading codons vs anticodons in the wrong direction.",
    ],
    pyq: "Work out a dihybrid cross and give the F₂ phenotypic ratio; explain a sex-linked inheritance example.",
  },
  {
    title: "Ecology & Ecosystem",
    match: ["ecology", "ecosystem", "food chain", "food web", "biogeochemical", "energy flow", "ecological pyramid", "succession", "biodiversity", "habitat", "niche", "adaptation", "population", "community", "trophic", "carbon cycle", "nitrogen cycle", "nutrient cycling", "environment", "conservation of biodiversity", "wildlife conservation", "ecological conservation", "vegetation"],
    weightage:
      "High — food chains, energy flow, biogeochemical cycles and biodiversity are common in NEB and medical biology.",
    formulas: [
      { tex: "\\text{10\\% law}", note: "~10% of energy transfers to the next trophic level" },
    ],
    keyPoints: [
      "Energy flow is one-directional and follows the 10% law; nutrients cycle.",
      "Producers → primary consumers → secondary consumers; pyramids of energy are always upright.",
      "Biogeochemical cycles (carbon, nitrogen, water) recycle elements through biotic and abiotic components.",
      "Ecological succession is the gradual change in community composition over time.",
    ],
    traps: [
      "Pyramid of biomass can be inverted (e.g. pond) but energy pyramids never are.",
      "Confusing habitat (address) with niche (role).",
      "Misplacing decomposers in the food chain.",
    ],
    pyq: "Draw a food chain and explain why energy pyramids are always upright, referring to the 10% law.",
  },
  {
    title: "Evolution & Human Evolution",
    match: ["evolution", "darwin", "natural selection", "lamarck", "speciation", "homologous", "analogous", "vestigial", "fossil", "human evolution", "origin of life", "adaptive radiation", "mutation", "evidence of evolution", "hardy weinberg"],
    weightage:
      "Moderate–high — evidences of evolution, natural selection and human evolution appear in NEB and medical biology.",
    formulas: [
      { tex: "p^2+2pq+q^2=1", note: "Hardy–Weinberg equilibrium" },
    ],
    keyPoints: [
      "Natural selection acts on heritable variation; the fittest leave more offspring.",
      "Homologous organs show common ancestry (divergent evolution); analogous organs show convergent evolution.",
      "Hardy–Weinberg: allele frequencies stay constant without evolutionary forces.",
      "Human evolution traces Australopithecus → Homo habilis → erectus → sapiens.",
    ],
    traps: [
      "Confusing homologous with analogous structures.",
      "Lamarckism (inheritance of acquired traits) is not accepted.",
      "Misapplying the Hardy–Weinberg conditions.",
    ],
    pyq: "Distinguish homologous and analogous organs with examples, and state two evidences of evolution.",
  },
  {
    title: "Human Physiology",
    match: ["neuron", "nervous system", "synapse", "brain", "reflex", "digestion", "respiratory system", "breathing", "circulation", "heart", "blood", "excretory", "kidney", "nephron", "endocrine", "hormone", "reproduction", "immune system", "antibody", "antigen", "homeostasis", "health", "disease", "immunity"],
    weightage:
      "Very high — human physiology (nervous, circulatory, excretory, endocrine, immune) dominates medical entrance biology.",
    formulas: [
      { tex: "\\text{Nephron = filtration + reabsorption + secretion}", note: "urine formation" },
    ],
    keyPoints: [
      "A neuron transmits impulses via action potentials; synapses use neurotransmitters.",
      "The nephron filters blood, reabsorbs useful substances and secretes wastes.",
      "Hormones are chemical messengers from endocrine glands; feedback maintains homeostasis.",
      "The immune system uses antibodies (B cells) and cell-mediated responses (T cells).",
    ],
    traps: [
      "Confusing arteries (away, thick) with veins (toward, valves).",
      "Mixing up the hormones of the pituitary, thyroid and adrenal glands.",
      "Neuron impulse direction: dendrite → cell body → axon → terminal.",
    ],
    pyq: "Describe urine formation in the nephron and the role of ADH in water balance.",
  },
  {
    title: "Plant Diversity & Classification",
    match: ["five kingdom", "monera", "protista", "protozoa", "fungi", "algae", "bryophyta", "pteridophyta", "gymnosperm", "angiosperm", "mucor", "yeast", "floral", "faunal", "plant diversity", "animal diversity", "kingdom classification", "biological classification", "taxonomy", "virus", "bacteriophage", "lichen", "moss", "fern", "conifer", "microbiology", "earthworm", "frog", "porifera", "coelenterata", "platyhelminthes", "aschelminthes", "annelida", "arthropoda", "mollusca", "echinodermata", "chordata"],
    weightage:
      "High — classification of kingdoms and plant groups (bryophytes to angiosperms) is a NEB and medical biology fixture.",
    formulas: [
      { tex: "\\text{Angiosperms: flower + fruit + seeds}", note: "defining feature" },
    ],
    keyPoints: [
      "Five kingdoms: Monera (prokaryotes), Protista, Fungi, Plantae, Animalia.",
      "Cryptogams (bryophytes, pteridophytes) reproduce by spores; phanerogams (gymnosperms, angiosperms) by seeds.",
      "Gymnosperms have naked seeds; angiosperms enclose seeds in fruit.",
      "Fungi are heterotrophic, chitinous-walled absorbers; lichens are fungus–alga symbioses.",
    ],
    traps: [
      "Confusing bryophytes (non-vascular) with pteridophytes (vascular, spore-bearing).",
      "Viruses are not placed in any kingdom — they are acellular.",
      "Mixing up monocot and dicot features.",
    ],
    pyq: "Differentiate gymnosperms and angiosperms, and give the basis of the five-kingdom classification.",
  },

  /* ===================== PHYSICS ===================== */
  {
    title: "Units, Dimensions & Measurement",
    match: ["dimensional analysis", "dimensions and", "physical quantities", "significant figures", "precision", "least count", "units and measurement", "system of units", "error analysis", "measurement and error", "vernier", "screw gauge"],
    weightage:
      "High — dimensional analysis and error/significant-figure questions are near-guaranteed MCQs in NEB, IoE, CMAT and every engineering entrance.",
    formulas: [
      { tex: "[F]=[MLT^{-2}],\\quad [E]=[ML^2T^{-2}]", note: "dimensional formulae" },
      { tex: "\\text{relative error}=\\frac{\\Delta a_{mean}}{a_{mean}}", note: "error analysis" },
      { tex: "\\text{Result}=\\text{value}\\pm\\text{uncertainty}", note: "significant figures" },
    ],
    keyPoints: [
      "Dimensional analysis checks equation consistency and derives relations, but cannot find dimensionless constants.",
      "Only quantities with the same dimensions can be added or subtracted.",
      "Significant figures reflect the precision of a measurement; zeros rules decide counting.",
      "Errors combine: for products/quotients add relative errors, for sums add absolute errors.",
    ],
    traps: [
      "Assuming a dimensionally correct equation is physically correct.",
      "Miscounting significant figures with leading/trailing zeros.",
      "Confusing absolute, relative and percentage error.",
    ],
    pyq: "Check the dimensional consistency of v = u + at and find the dimensions of the gravitational constant G.",
  },
  {
    title: "Modern Physics, Cosmology & Communication",
    match: ["modern physics", "particle physics", "quark", "lepton", "big bang", "hubble", "dark matter", "black hole", "cosmolog", "universe", "galaxy", "stars", "stellar", "recent trends", "communication system", "modulation", "antenna", "radar", "optical fibre", "microwave", "radio wave", "satellite communication"],
    weightage:
      "Moderate — modern-physics and cosmology MCQs (particles, Big Bang, communication) appear in NEB and engineering entrance general-science sets.",
    formulas: [
      { tex: "v=H_0 d", note: "Hubble's law (recession velocity)" },
      { tex: "E=mc^2,\\quad \\lambda=\\frac{h}{p}", note: "mass-energy & de Broglie" },
      { tex: "f_{mod}=f_c\\pm f_m", note: "modulation sidebands" },
    ],
    keyPoints: [
      "Matter is made of quarks (hadrons) and leptons (e.g. electrons); four fundamental forces govern interactions.",
      "The Big Bang model plus Hubble's redshift explains an expanding universe.",
      "Communication uses modulation (AM/FM) to carry signals; optical fibres rely on total internal reflection.",
      "Black holes are regions where escape velocity exceeds c; dark matter is inferred from gravitational effects.",
    ],
    traps: [
      "Confusing hadrons (quark composites) with leptons (fundamental).",
      "Mixing up AM and FM modulation properties.",
      "Assuming redshift means objects move through space rather than space expanding.",
    ],
    pyq: "State Hubble's law and use it to estimate the distance of a galaxy from its recession velocity.",
  },
  {
    title: "Photoelectric Effect",
    match: ["photoelectric"],
    weightage:
      "Very high — a numerical on Einstein's equation plus 1–2 MCQs every year (NEB, IoE, CMAT). Einstein's Nobel topic.",
    formulas: [
      { tex: "E = hf = \\frac{hc}{\\lambda}", note: "photon energy" },
      { tex: "hf = \\phi + \\tfrac{1}{2}mv_{max}^2", note: "Einstein's equation" },
      { tex: "\\phi = h f_0", note: "work function at threshold f₀" },
      { tex: "eV_s = \\tfrac{1}{2}mv_{max}^2", note: "stopping potential" },
    ],
    keyPoints: [
      "Emission is instantaneous — no time lag, which the wave theory could not explain.",
      "Maximum kinetic energy depends only on frequency, never on intensity.",
      "Photoelectric current is directly proportional to intensity (more photons → more electrons).",
      "Below the threshold frequency f₀ nothing is emitted however bright the light.",
    ],
    traps: [
      "Confusing intensity (controls current) with frequency (controls energy).",
      "Forgetting the stopping potential is negative and independent of intensity.",
      "Using wavelength where frequency is needed — convert with c = fλ.",
    ],
    pyq: "Light of frequency 2f₀ falls on a surface of work function φ = hf₀. Find the maximum kinetic energy and the stopping potential.",
  },
  {
    title: "Atomic Structure & Bohr's Model",
    match: ["bohr", "hydrogen spectrum", "de broglie", "uncertainty", "quantum number", "atomic structure", "quantum mechanical", "aufbau", "rutherford", "orbital", "heisenberg"],
    weightage:
      "High across NEB physics & chemistry and every medical/engineering entrance — energy levels, spectra and quantum numbers are guaranteed MCQs.",
    formulas: [
      { tex: "E_n = -\\frac{13.6}{n^2}\\ \\text{eV}", note: "hydrogen energy level" },
      { tex: "r_n = 0.529\\,n^2\\ \\text{Å}", note: "orbit radius" },
      { tex: "mvr = \\frac{nh}{2\\pi}", note: "angular momentum is quantised" },
      { tex: "\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_1^2}-\\frac{1}{n_2^2}\\right)", note: "Rydberg, R = 1.097×10⁷ m⁻¹" },
    ],
    keyPoints: [
      "Lyman series → ultraviolet, Balmer → visible, Paschen/Brackett/Pfund → infrared.",
      "Radius grows as n², energy as 1/n²; energy is negative because the electron is bound.",
      "de Broglie wavelength λ = h/p links particles and waves; it is negligible for macroscopic objects.",
      "Heisenberg: position and momentum cannot both be known exactly (Δx·Δp ≥ h/4π).",
    ],
    traps: [
      "Dropping the negative sign on energy levels.",
      "Mixing up which series falls in which spectral region.",
      "Using n = 0 for the ground state — it is n = 1.",
    ],
    pyq: "Calculate the wavelength of the Hα line (Balmer, n = 3 → 2) and state which region it lies in.",
  },
  {
    title: "Nuclear Physics",
    match: ["nuclear physics", "nuclear fission", "nuclear fusion", "nuclear density", "nuclear energy", "nuclear reaction", "nuclear radius", "nuclear force", "nuclear chemistry", "nuclear model", "nucleus", "fission", "fusion", "binding energy", "radioactiv", "decay", "mass-energy", "mass defect", "isotope", "half-life", "packing factor", "einstein's mass", "creation and annihilation", "creation & annihilation", "pair production"],
    weightage:
      "High — binding-energy curve, half-life numericals and fission/fusion reasoning appear in NEB, IoE and medical entrances every year.",
    formulas: [
      { tex: "E = mc^2", note: "1 amu = 931.5 MeV" },
      { tex: "BE = \\Delta m\\,c^2,\\quad \\frac{BE}{A}", note: "binding energy per nucleon" },
      { tex: "R = R_0 A^{1/3}", note: "R₀ ≈ 1.2 fm; nuclear density is ~constant" },
      { tex: "N = N_0 e^{-\\lambda t},\\quad t_{1/2}=\\frac{0.693}{\\lambda}", note: "radioactive decay" },
    ],
    keyPoints: [
      "BE/nucleon peaks near iron-56 (~8.8 MeV) — the most stable nucleus.",
      "Energy is released by fusion for light nuclei and fission for heavy ones, both moving toward the peak.",
      "Half-life is constant and independent of the amount of substance.",
      "Nuclear density is enormous and nearly the same for all nuclei.",
    ],
    traps: [
      "Forgetting the 931.5 MeV/amu conversion in mass-defect problems.",
      "Confusing decay constant λ with half-life.",
      "Assuming fission and fusion both need the same conditions.",
    ],
    pyq: "Given BE/nucleon for U-235 and Ba/Kr fragments, estimate the energy released per fission.",
  },
  {
    title: "Semiconductors & Solids",
    match: ["semiconductor", "energy band", "bands in solids", "band theory", "solids", "diode", "transistor", "logic gate", "doping", "intrinsic", "extrinsic", "insulators and semiconductors", "metals-insulators"],
    weightage:
      "High in NEB class 12 and IoE/computer-related sets — diode behaviour, doping and logic gates are reliable MCQs.",
    formulas: [
      { tex: "n_i^2 = n_e\\,n_h", note: "mass-action law" },
      { tex: "I = I_0\\left(e^{eV/kT}-1\\right)", note: "diode current" },
      { tex: "\\sigma = ne\\mu", note: "conductivity" },
    ],
    keyPoints: [
      "n-type uses donor (pentavalent) impurities; p-type uses acceptor (trivalent) impurities.",
      "Forward bias narrows the depletion layer and lowers resistance; reverse bias widens it.",
      "A diode rectifies AC; a transistor amplifies or switches; band gap decides conductor/semiconductor/insulator.",
      "Conductivity of a semiconductor rises with temperature (opposite of a metal).",
    ],
    traps: [
      "Swapping majority/minority carriers between n- and p-type.",
      "Assuming a diode obeys Ohm's law — it is non-ohmic.",
      "Misreading logic-gate truth tables (NAND/NOR as universal gates).",
    ],
    pyq: "Identify the gate from its truth table and show how to build an AND gate using only NAND gates.",
  },
  {
    title: "Kirchhoff's Laws",
    match: ["kirchhoff"],
    weightage:
      "High — a Wheatstone-bridge or two-loop numerical is a staple of NEB and IoE, plus conceptual MCQs on the conservation laws behind them.",
    formulas: [
      { tex: "\\sum I_{in} = \\sum I_{out}", note: "KCL — charge conserved" },
      { tex: "\\sum IR + \\sum \\varepsilon = 0", note: "KVL — energy conserved" },
      { tex: "\\frac{P}{Q} = \\frac{R}{S}", note: "balanced Wheatstone bridge" },
    ],
    keyPoints: [
      "KCL is conservation of charge at a junction; KVL is conservation of energy around a loop.",
      "In a balanced Wheatstone bridge no current flows through the galvanometer.",
      "Sign convention: pick a loop direction and stay consistent for EMFs and IR drops.",
    ],
    traps: [
      "Sign errors on EMF depending on traversal direction.",
      "Applying the balance condition to an unbalanced bridge.",
      "Forgetting the potentiometer/metre-bridge is a null method (draws no current at balance).",
    ],
    pyq: "Find the current through a 2 Ω resistor in a two-loop network using KCL and KVL.",
  },
  {
    title: "Magnetism & Biot–Savart Law",
    match: ["biot-savart", "biot savart", "magnetism", "magnetic field", "magnetic effect", "ampere", "lorentz", "solenoid", "galvanometer", "cyclotron", "moving coil"],
    weightage:
      "High — field of a wire/loop/solenoid and the Lorentz force are frequent numericals in NEB and engineering entrances.",
    formulas: [
      { tex: "dB = \\frac{\\mu_0}{4\\pi}\\frac{I\\,dl\\sin\\theta}{r^2}", note: "Biot–Savart" },
      { tex: "B = \\frac{\\mu_0 I}{2\\pi r}", note: "long straight wire" },
      { tex: "B = \\mu_0 n I", note: "solenoid" },
      { tex: "\\vec F = q\\vec v\\times\\vec B,\\quad F = BIl\\sin\\theta", note: "Lorentz force" },
    ],
    keyPoints: [
      "Use the right-hand grip rule for field direction around a current.",
      "The magnetic force is always perpendicular to velocity, so it does no work and only changes direction.",
      "A current-carrying solenoid behaves like a bar magnet; a moving charge in B follows a circle (cyclotron).",
    ],
    traps: [
      "Wrong direction from Fleming's left-hand rule.",
      "Forgetting sinθ — force is zero when v is parallel to B.",
      "Confusing μ₀/2πr (wire) with μ₀nI (solenoid).",
    ],
    pyq: "An electron enters a uniform B field at right angles with speed v. Find the radius and period of its circular path.",
  },
  {
    title: "Electromagnetic Induction",
    match: ["electromagnetic induction", "faraday's laws of electromagnetic", "lenz", "mutual induct", "self-induct", "eddy current", "motional emf"],
    weightage:
      "High — Faraday's law numericals and Lenz's-law direction questions appear in almost every NEB and IoE paper.",
    formulas: [
      { tex: "\\varepsilon = -\\frac{d\\Phi}{dt},\\quad \\Phi = BA\\cos\\theta", note: "Faraday / flux" },
      { tex: "\\varepsilon = Blv", note: "motional EMF" },
      { tex: "U = \\tfrac{1}{2}LI^2,\\quad L = \\mu_0 n^2 Al", note: "stored energy / solenoid inductance" },
    ],
    keyPoints: [
      "Lenz's law is conservation of energy — the induced current opposes the change that caused it.",
      "EMF appears only when flux changes (vary B, A or θ).",
      "Self-inductance opposes change in the coil's own current; mutual inductance couples two coils (transformer).",
    ],
    traps: [
      "Ignoring the minus sign / getting the induced-current direction wrong.",
      "Assuming a static field induces EMF — flux must change.",
      "Mixing up which quantity (B, A, θ) is changing.",
    ],
    pyq: "A rod of length l slides on rails in a field B with speed v. Find the induced EMF and the current.",
  },
  {
    title: "Current Electricity & Ohm's Law",
    match: ["ohm", "current electricity", "drift velocity", "resistance", "resistivity", "electrical conductivity", "internal resistance", "emf", "potential divider", "ohmic", "dc circuit", "circuit", "series & parallel", "wheatstone", "potentiometer", "metre bridge"],
    weightage:
      "Very high — Ohm's law, drift velocity, internal resistance and DC-circuit numericals are guaranteed in NEB, IoE and every engineering entrance.",
    formulas: [
      { tex: "V=IR,\\quad R=\\rho\\frac{L}{A}", note: "Ohm's law & resistance" },
      { tex: "P=VI=I^2R=\\frac{V^2}{R}", note: "electrical power" },
      { tex: "I=neAv_d", note: "current & drift velocity" },
      { tex: "V=\\varepsilon-Ir,\\quad R_{series}=\\sum R_i,\\quad \\frac1{R_{parallel}}=\\sum\\frac1{R_i}", note: "terminal voltage & combinations" },
    ],
    keyPoints: [
      "Ohm's law holds only for ohmic conductors at constant temperature; a diode/filament is non-ohmic.",
      "Drift velocity is very small and opposite to the field for electrons; current density J = I/A = nevd.",
      "Resistivity is a material property; resistance depends on geometry (R ∝ L/A).",
      "EMF is the open-circuit potential difference; terminal voltage drops under load due to internal resistance.",
    ],
    traps: [
      "Confusing EMF with terminal voltage (V = ε − Ir).",
      "Series/parallel resistance rules are the reverse of capacitance.",
      "Assuming resistance is independent of temperature.",
    ],
    pyq: "A cell of EMF 6 V and internal resistance 1 Ω is connected to a 5 Ω load. Find the current and terminal voltage.",
  },
  {
    title: "Alternating Current",
    match: ["alternating current", "ac voltage", "series resonance", "ac resonance", "resonance in ac", "resonant frequency", "impedance", "transformer", "reactance", "lcr", "rms value", "rms current", "rms voltage"],
    weightage:
      "High — LCR resonance, impedance and transformer ratios are core NEB class-12 and IoE numericals.",
    formulas: [
      { tex: "V_{rms}=\\frac{V_0}{\\sqrt2},\\quad I_{rms}=\\frac{I_0}{\\sqrt2}", note: "rms values" },
      { tex: "X_L=\\omega L,\\quad X_C=\\frac{1}{\\omega C}", note: "reactances" },
      { tex: "Z=\\sqrt{R^2+(X_L-X_C)^2}", note: "impedance" },
      { tex: "f_0=\\frac{1}{2\\pi\\sqrt{LC}},\\quad \\frac{V_s}{V_p}=\\frac{N_s}{N_p}", note: "resonance / transformer" },
    ],
    keyPoints: [
      "At resonance X_L = X_C, impedance is minimum (= R) and current is maximum.",
      "In an inductor current lags voltage by 90°; in a capacitor current leads by 90°.",
      "A transformer works on AC only and (ideally) conserves power: V_s I_s = V_p I_p.",
      "Power factor = cos φ; pure L or C circuits dissipate zero average power.",
    ],
    traps: [
      "Using peak instead of rms values.",
      "Reversing the lead/lag relationships for L and C.",
      "Assuming a transformer can step up power — it steps up voltage at the cost of current.",
    ],
    pyq: "A series LCR circuit is at resonance with L = 0.1 H, C = 10 μF. Find the resonant frequency and the current.",
  },
  {
    title: "Capacitance",
    match: ["capacitor", "capacitance", "dielectric", "parallel plate"],
    weightage:
      "High — parallel-plate capacitance, series/parallel combinations and stored energy are standard NEB and CMAT numericals.",
    formulas: [
      { tex: "C=\\frac{Q}{V},\\quad C=\\frac{\\varepsilon_0 A}{d}", note: "definition / parallel plate" },
      { tex: "C_{series}:\\ \\frac1C=\\sum\\frac1{C_i},\\quad C_{parallel}:\\ C=\\sum C_i", note: "combinations" },
      { tex: "U=\\tfrac12 CV^2=\\frac{Q^2}{2C}", note: "stored energy" },
    ],
    keyPoints: [
      "Capacitance depends only on geometry and the dielectric — not on Q or V.",
      "In series the charge is the same on each; in parallel the voltage is the same.",
      "Inserting a dielectric (K) increases capacitance by factor K.",
    ],
    traps: [
      "Series/parallel formulas are the reverse of resistors — students swap them.",
      "Forgetting whether the battery stays connected when a dielectric is inserted.",
      "Energy is lost as heat/EM radiation when two charged capacitors are connected.",
    ],
    pyq: "Three capacitors 2, 3 and 6 μF — find the equivalent capacitance in series and in parallel.",
  },
  {
    title: "Electric Field & Gauss's Law",
    match: ["electric field", "gauss", "electric flux", "field line", "equipotential", "electric potential", "potential difference", "potential gradient"],
    weightage:
      "High — Gauss's-law applications (wire, plane, shell) and field/potential relations are frequent in NEB and IoE.",
    formulas: [
      { tex: "E=\\frac{F}{q}=\\frac{kQ}{r^2},\\quad V=\\frac{kQ}{r}", note: "point charge" },
      { tex: "\\Phi_E=\\oint\\vec E\\cdot d\\vec A=\\frac{Q_{enc}}{\\varepsilon_0}", note: "Gauss's law" },
      { tex: "E=\\frac{\\sigma}{\\varepsilon_0}\\ (\\text{plane}),\\quad E=\\frac{\\lambda}{2\\pi\\varepsilon_0 r}\\ (\\text{wire})", note: "symmetry results" },
      { tex: "E=-\\frac{dV}{dr}", note: "field is the potential gradient" },
    ],
    keyPoints: [
      "Field lines go from + to −, never cross, and are denser where the field is stronger.",
      "Inside a charged conductor/hollow shell the field is zero.",
      "Gauss's law only simplifies things when there is spherical, cylindrical or planar symmetry.",
    ],
    traps: [
      "Flux depends only on enclosed charge, not on the surface shape or outside charges.",
      "Field inside a uniformly charged solid sphere grows linearly (not zero) — only a hollow shell gives zero.",
      "Sign of potential vs field direction.",
    ],
    pyq: "Use Gauss's law to find the field just outside a charged conducting sphere and inside it.",
  },
  {
    title: "Electrostatics & Coulomb's Law",
    match: ["coulomb", "electric charge", "charging by induction", "electrostatics", "force between charges", "force between multiple"],
    weightage:
      "High — Coulomb's-law and superposition numericals are a NEB fixture and appear in every engineering entrance.",
    formulas: [
      { tex: "F=\\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2},\\quad k=9\\times10^9\\ \\text{N·m}^2\\text{/C}^2", note: "Coulomb's law" },
      { tex: "\\vec F_{net}=\\sum \\vec F_i", note: "superposition (vector sum)" },
    ],
    keyPoints: [
      "Inverse-square, central force along the line joining charges; like charges repel.",
      "In a medium the force is reduced by the relative permittivity εᵣ.",
      "Charge is quantised (q = ne) and conserved.",
    ],
    traps: [
      "Using distance in cm without converting to metres.",
      "Adding forces as scalars instead of vectors in multi-charge problems.",
      "Ignoring the sign/direction of the charges.",
    ],
    pyq: "Three charges sit at the corners of an equilateral triangle. Find the net force on one charge.",
  },
  {
    title: "Wave Optics",
    match: ["wave optics", "interference", "diffraction", "huygens", "young", "double slit", "dispersion", "wave motion", "wavefront", "matter wave", "polariz"],
    weightage:
      "High — Young's double-slit fringe-width numericals and interference/diffraction concepts are common in NEB and IoE.",
    formulas: [
      { tex: "\\beta=\\frac{\\lambda D}{d}", note: "fringe width" },
      { tex: "\\Delta x = n\\lambda\\ (\\text{bright}),\\ (n+\\tfrac12)\\lambda\\ (\\text{dark})", note: "path difference" },
      { tex: "a\\sin\\theta=n\\lambda", note: "single-slit minima" },
      { tex: "\\lambda=\\frac{h}{mv}", note: "de Broglie" },
    ],
    keyPoints: [
      "Interference redistributes light energy — bright fringes gain what dark fringes lose.",
      "Fringe width ∝ λ, so red light gives wider fringes than blue.",
      "Diffraction is interference from a single aperture; the central maximum is twice as wide.",
    ],
    traps: [
      "Confusing fringe width with fringe order/position.",
      "Mixing the double-slit (interference) and single-slit (diffraction) conditions.",
      "Forgetting that coherent sources are required for a stable pattern.",
    ],
    pyq: "In a YDSE, λ = 600 nm, D = 1 m, d = 1 mm. Find the fringe width and the position of the 3rd bright fringe.",
  },
  {
    title: "Ray Optics — Lenses, Prisms & Instruments",
    match: ["refraction", "lens", "prism", "angle of deviation", "prism deviation", "deviation of light", "total internal", "tir", "power of", "ray optics", "telescope", "microscope", "optical instrument", "refractive", "thin lens", "lens maker", "minimum deviation", "spectrum", "aberration", "achromatism", "lateral shift"],
    weightage:
      "Very high — lens/mirror numericals, prism minimum deviation and TIR are guaranteed in NEB and every medical/engineering entrance.",
    formulas: [
      { tex: "n=\\frac{c}{v}=\\frac{\\sin i}{\\sin r}", note: "Snell's law" },
      { tex: "\\frac1f=\\frac1v-\\frac1u,\\quad P=\\frac1f\\ (\\text{m})=\\text{dioptre}", note: "lens formula & power" },
      { tex: "\\frac1f=(n-1)\\left(\\frac1{R_1}-\\frac1{R_2}\\right)", note: "lens maker" },
      { tex: "n=\\frac{\\sin\\frac{A+\\delta_m}{2}}{\\sin\\frac A2},\\quad \\sin c=\\frac1n", note: "prism / critical angle" },
    ],
    keyPoints: [
      "Convex lens power is positive, concave negative; thin lenses in contact add powers (P = P₁ + P₂).",
      "TIR needs light going dense → rarer with incidence above the critical angle — the basis of optical fibres.",
      "Dispersion: violet deviates most, red least; a prism splits white light.",
      "Magnification of a telescope (normal) = f₀/f_e; a microscope magnifies in two stages.",
    ],
    traps: [
      "Sign conventions differ between the lens formula and the mirror formula.",
      "Confusing critical angle with the angle of incidence.",
      "Forgetting focal length must be in metres when computing dioptres.",
    ],
    pyq: "A convex lens of f = 20 cm forms an image of an object 30 cm away. Find the image position, nature and magnification.",
  },
  {
    title: "Ray Optics — Mirrors & Reflection",
    match: ["mirror", "reflection", "real & virtual image", "real and virtual image", "image"],
    weightage:
      "High — mirror-formula numericals and image-nature MCQs are regular in NEB and CMAT.",
    formulas: [
      { tex: "\\frac1f=\\frac1v+\\frac1u,\\quad f=\\frac R2", note: "mirror formula" },
      { tex: "m=-\\frac vu=\\frac{h_i}{h_0}", note: "magnification" },
    ],
    keyPoints: [
      "Concave mirrors give real, inverted images (except when the object is inside f — then virtual, erect, magnified).",
      "Convex mirrors always give virtual, erect, diminished images — used as rear-view mirrors.",
      "A virtual image cannot be caught on a screen; a real image can.",
    ],
    traps: [
      "Cartesian sign convention errors (distances against incident light are negative).",
      "Forgetting f = R/2.",
      "Magnification sign telling you the image orientation.",
    ],
    pyq: "An object 10 cm in front of a concave mirror of f = 15 cm — locate the image and describe it.",
  },
  {
    title: "Simple Harmonic Motion",
    match: ["shm", "simple harmonic", "hooke", "oscillat", "simple pendulum", "elastic potential energy"],
    weightage:
      "High — pendulum/spring period numericals and energy-in-SHM MCQs recur in NEB and IoE.",
    formulas: [
      { tex: "F=-kx,\\quad a=-\\omega^2 x", note: "restoring force" },
      { tex: "T=2\\pi\\sqrt{\\frac mk},\\quad T=2\\pi\\sqrt{\\frac lg}", note: "spring / pendulum period" },
      { tex: "E=\\tfrac12 kA^2,\\quad v=\\omega\\sqrt{A^2-x^2}", note: "energy & speed" },
    ],
    keyPoints: [
      "At the mean position velocity is maximum and acceleration is zero; at the extremes the reverse.",
      "Total energy is constant and swaps between kinetic and potential.",
      "For small amplitudes the pendulum period is independent of amplitude and mass.",
    ],
    traps: [
      "The pendulum formula holds only for small angles (sin θ ≈ θ).",
      "Springs in series/parallel combine with an effective k (opposite rules to resistors).",
      "Confusing frequency f with angular frequency ω = 2πf.",
    ],
    pyq: "A 0.5 kg mass on a spring of k = 200 N/m — find the period and the maximum speed for A = 0.1 m.",
  },
  {
    title: "Gravitation & Satellites",
    match: ["gravitation", "gravitational", "satellite", "orbit", "escape velocity", "kepler", "geostationary", "gps", "centre of mass", "center of mass", "variation of g", "altitude", "potential and kinetic energy of the satellite"],
    weightage:
      "Very high — variation of g, orbital/escape velocity and satellite energy numericals are NEB and IoE favourites.",
    formulas: [
      { tex: "F=\\frac{GMm}{r^2},\\quad g=\\frac{GM}{R^2}", note: "law of gravitation" },
      { tex: "v_o=\\sqrt{\\frac{GM}{r}},\\quad T=2\\pi\\sqrt{\\frac{r^3}{GM}}", note: "orbital velocity & period" },
      { tex: "v_e=\\sqrt{2gR}=\\sqrt2\\,v_o\\approx 11.2\\ \\text{km/s}", note: "escape velocity" },
      { tex: "U=-\\frac{GMm}{r}", note: "gravitational PE (negative)" },
    ],
    keyPoints: [
      "g decreases both with height and with depth (maximum at the surface).",
      "Orbital velocity is independent of the satellite's mass.",
      "A geostationary satellite has a 24-hour period and orbits above the equator.",
      "Kepler: orbits are ellipses; equal areas in equal times; T² ∝ r³.",
    ],
    traps: [
      "Gravitational potential energy is negative — bound system.",
      "At depth only the enclosed mass contributes to g.",
      "Escape velocity is √2 times orbital velocity, and independent of launch angle and mass.",
    ],
    pyq: "Find the orbital velocity and period of a satellite 600 km above Earth's surface.",
  },
  {
    title: "Circular Motion",
    match: ["circular motion", "centripetal", "conical", "banking", "vertical circle", "angular motion", "angular vs", "angular displacement", "relation between angular"],
    weightage:
      "High — centripetal force, banking of roads and vertical-circle conditions are standard NEB and IoE numericals.",
    formulas: [
      { tex: "a_c=\\frac{v^2}{r}=\\omega^2 r,\\quad F_c=\\frac{mv^2}{r}", note: "centripetal" },
      { tex: "v=r\\omega,\\quad T=\\frac{2\\pi}{\\omega}", note: "linear–angular link" },
      { tex: "\\tan\\theta=\\frac{v^2}{rg}", note: "banking angle" },
      { tex: "v_{top}=\\sqrt{gr}", note: "minimum speed at top of vertical circle" },
    ],
    keyPoints: [
      "Centripetal force is the net inward force — not an extra force of its own.",
      "It is always perpendicular to velocity, so it does zero work and only bends the path.",
      "In a vertical circle tension is greatest at the bottom and least at the top.",
    ],
    traps: [
      "Confusing centripetal (real, inward) with centrifugal (pseudo, outward).",
      "At the top of a vertical circle, weight supplies part of the centripetal force.",
      "Forgetting that speed changes in a vertical circle (energy conservation).",
    ],
    pyq: "A car rounds a curve of radius r banked at θ. Find the speed at which no friction is needed.",
  },
  {
    title: "Projectile Motion",
    match: ["projectile"],
    weightage:
      "Very high — at least one numerical plus MCQs on range/height/time appear in NEB, IoE and CMAT every year.",
    formulas: [
      { tex: "R=\\frac{u^2\\sin2\\theta}{g},\\quad H=\\frac{u^2\\sin^2\\theta}{2g},\\quad T=\\frac{2u\\sin\\theta}{g}", note: "range, height, time" },
      { tex: "y=x\\tan\\theta-\\frac{gx^2}{2u^2\\cos^2\\theta}", note: "trajectory (parabola)" },
    ],
    keyPoints: [
      "Range is maximum at 45° when launch and landing heights are equal and drag is ignored.",
      "Complementary angles (θ and 90°−θ) give the same range.",
      "Horizontal velocity is constant; vertical velocity changes at g — the two motions are independent.",
      "At the apex the vertical velocity is zero but acceleration is still g downward.",
    ],
    traps: [
      "45° is only maximum range in a vacuum with equal heights.",
      "Speed is minimum (not zero) at the apex — the horizontal component remains.",
      "Forgetting to resolve u into u cosθ and u sinθ.",
    ],
    pyq: "A ball is thrown at 20 m/s at 30°. Find its range, maximum height and time of flight (g = 10 m/s²).",
  },
  {
    title: "Heat & Thermometry",
    match: ["heat and temperature", "thermal expansion", "linear expansion", "cubical expansion", "superficial expansion", "liquid expansion", "dulong", "specific heat", "latent heat", "stefan", "black-body", "black body", "newton's law of cooling", "triple point", "rate of heat flow", "thermal conductivity", "zeroth law", "change of phase", "quantity of heat", "conduction", "convection", "radiation", "mercury thermometer", "thermal energy"],
    weightage:
      "High — specific/latent heat calorimetry, thermal expansion and Newton's cooling numericals are NEB staples.",
    formulas: [
      { tex: "Q=mc\\Delta\\theta,\\quad Q=mL", note: "sensible & latent heat" },
      { tex: "L_t=L_0(1+\\alpha T),\\quad \\gamma\\approx3\\alpha", note: "linear & cubic expansion" },
      { tex: "\\frac{dQ}{dt}=\\frac{KA\\Delta\\theta}{l},\\quad E=\\sigma T^4", note: "conduction & Stefan–Boltzmann" },
    ],
    keyPoints: [
      "Heat flows from hot to cold until thermal equilibrium (zeroth law).",
      "Latent heat changes phase at constant temperature; specific heat changes temperature.",
      "Newton's cooling: rate of cooling ∝ excess temperature over the surroundings.",
      "A black body is the best absorber and the best radiator.",
    ],
    traps: [
      "Mixing up specific heat capacity and latent heat.",
      "γ = 3α and β = 2α relations for expansion.",
      "Newton's cooling is valid only for small temperature excess.",
    ],
    pyq: "Steam at 100 °C is passed into water; using latent heat, find the final temperature of the mixture.",
  },
  {
    title: "Kinetic Theory & Gases",
    match: ["ideal gas", "kinetic theory", "kinetic-molecular", "boltzmann", "root-mean-square", "gas equation", "heat capacities", "molecular properties", "translational ke", "pressure derivation", "states of matter", "gas laws", "real gas", "van der waals", "liquid state", "liquid properties", "liquid crystals"],
    weightage:
      "High — rms speed, gas laws and kinetic-theory MCQs appear in both physics and chemistry entrance sets.",
    formulas: [
      { tex: "PV=nRT,\\quad PV=NkT", note: "ideal gas equation" },
      { tex: "v_{rms}=\\sqrt{\\frac{3RT}{M}}=\\sqrt{\\frac{3kT}{m}}", note: "rms speed" },
      { tex: "P=\\frac13\\rho v_{rms}^2,\\quad KE=\\tfrac32 kT", note: "pressure & mean KE" },
    ],
    keyPoints: [
      "Mean kinetic energy depends only on absolute temperature.",
      "rms speed ∝ √T and ∝ 1/√M — lighter gases move faster.",
      "Real gases deviate from ideality at high pressure and low temperature (van der Waals).",
    ],
    traps: [
      "Using Celsius instead of kelvin in gas equations.",
      "Confusing rms, average and most-probable speeds (rms > average > most probable).",
      "Molar mass must be in kg/mol for SI speed results.",
    ],
    pyq: "At what temperature does the rms speed of a gas molecule double its value at 27 °C?",
  },
  {
    title: "Elasticity",
    match: ["elasticity", "elastic limit", "young", "stress", "strain", "poisson", "bulk modulus", "shear modulus", "elastic modulus"],
    weightage:
      "Moderate–high — Young's modulus and stress/strain numericals appear in NEB and IoE.",
    formulas: [
      { tex: "\\text{stress}=\\frac FA,\\quad \\text{strain}=\\frac{\\Delta l}{l}", note: "definitions" },
      { tex: "Y=\\frac{\\text{stress}}{\\text{strain}}", note: "Young's modulus" },
      { tex: "U=\\tfrac12\\times\\text{stress}\\times\\text{strain}\\times V", note: "elastic energy density" },
    ],
    keyPoints: [
      "Hooke's law holds only up to the elastic limit (proportional limit).",
      "Young's modulus is a material property, independent of shape and size.",
      "Steel is more elastic than rubber (higher Y) — it resists deformation more.",
    ],
    traps: [
      "Assuming the law holds beyond the elastic limit.",
      "Confusing the different moduli (Young, bulk, shear).",
      "Units of stress (N/m² = Pa).",
    ],
    pyq: "A wire of length l and area A stretches by Δl under load F. Find Young's modulus and the stored energy.",
  },
  {
    title: "Fluid Mechanics",
    match: ["fluid", "bernoulli", "viscosity", "surface tension", "capillar", "pascal", "archimedes", "buoyan", "pressure"],
    weightage:
      "Moderate–high — Bernoulli, buoyancy and surface-tension MCQs feature in NEB and medical entrances.",
    formulas: [
      { tex: "P=\\rho g h,\\quad F_b=\\rho V g", note: "hydrostatic & buoyancy" },
      { tex: "P+\\tfrac12\\rho v^2+\\rho g h=\\text{const}", note: "Bernoulli" },
      { tex: "S=\\frac Fl,\\quad P=\\frac{2S}{r}", note: "surface tension & excess pressure" },
    ],
    keyPoints: [
      "Bernoulli's principle is conservation of energy for a flowing fluid — faster flow, lower pressure.",
      "A body floats when its weight equals the weight of displaced fluid (Archimedes).",
      "Surface tension makes drops spherical and drives capillary rise.",
    ],
    traps: [
      "Bernoulli applies only to steady, incompressible, non-viscous flow.",
      "Confusing gauge and absolute pressure.",
      "Sign of the excess-pressure formula for bubbles vs drops.",
    ],
    pyq: "Water flows through a horizontal pipe that narrows; using Bernoulli and continuity, find the pressure difference.",
  },
  {
    title: "Mechanics — Motion, Force & Energy",
    match: ["kinematic", "dynamics", "newton", "friction", "momentum", "impulse", "work", "energy", "power", "collision", "torque", "relative velocity", "freely falling", "conservation", "inertia", "force", "acceleration", "velocity", "moment", "linear motion", "statics", "motion of a particle", "equation of motion"],
    weightage:
      "Very high — the backbone of NEB physics and every engineering/medical entrance: laws of motion, work–energy and momentum numericals appear in bulk.",
    formulas: [
      { tex: "v=u+at,\\quad s=ut+\\tfrac12 at^2,\\quad v^2=u^2+2as", note: "equations of motion" },
      { tex: "F=ma,\\quad p=mv,\\quad J=F\\Delta t=\\Delta p", note: "Newton & impulse" },
      { tex: "W=\\vec F\\cdot\\vec s,\\quad KE=\\tfrac12 mv^2,\\quad PE=mgh,\\quad P=\\frac Wt", note: "work, energy, power" },
      { tex: "\\vec\\tau=\\vec r\\times\\vec F", note: "torque" },
    ],
    keyPoints: [
      "Newton's second law in momentum form (F = dp/dt) is the most general.",
      "Momentum is conserved in collisions; kinetic energy is conserved only in elastic ones.",
      "Work–energy theorem: net work done equals the change in kinetic energy.",
      "Friction is self-adjusting up to its limiting value (μR).",
    ],
    traps: [
      "Sign conventions for direction of motion and acceleration.",
      "Applying energy conservation while ignoring work done against friction.",
      "Impulse equals change in momentum, not force alone.",
    ],
    pyq: "A body of mass m moving at u collides and sticks to an equal mass at rest. Find the common velocity and the energy lost.",
  },
];

/** First entry whose keywords appear in the topic title (first-hit-wins). */
export function getEntranceInsight(title: string): EntranceInsightData | null {
  const t = (title || "").toLowerCase();
  if (!t) return null;
  for (const entry of ENTRANCE_INSIGHTS) {
    if (entry.match.some((m) => t.includes(m))) return entry;
  }
  return null;
}
