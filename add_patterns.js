const fs = require('fs');
let c = fs.readFileSync('frontend/components/lab/theory-panel.tsx', 'utf8');

// Step 1: Extend SectionData interface
const oldInterface = 'interface SectionData {\r\n  heading: string;\r\n  content: string;\r\n  formula?: string;\r\n  example?: string;\r\n}';
const newInterface = 'interface SectionData {\r\n  heading: string;\r\n  content: string;\r\n  formula?: string;\r\n  example?: string;\r\n  keyPoints?: string[];\r\n  commonMistakes?: string[];\r\n  practiceQuestions?: string[];\r\n}';
if (!c.includes(newInterface)) {
  c = c.replace(oldInterface, newInterface);
  console.log('Updated SectionData interface');
} else {
  console.log('SectionData already updated');
}

// Helper: escape a string for TypeScript double-quoted context
// - backslash → double backslash
// - double quote → escaped quote
// - no newlines allowed (keep everything on one line)
function tsEscape(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, ' ');
}

// Step 2: Build the 20 exercise patterns with RAW LaTeX (single backslashes)
// tsEscape() will double them for the .tsx output
const patterns = [
  {
    heading: "Exercise Pattern 1: Matrix Determinant Calculation",
    content: "Find the determinant of any 2x2 or 3x3 matrix. Pattern: For 2x2 [[a,b],[c,d]], det = ad - bc. For 3x3, use cofactor expansion along any row or column. Always check if the matrix is singular (det = 0) before proceeding.",
    formula: "\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc",
    example: "Find det(A) where A = [[3,1],[2,4]]. Step 1: a=3, b=1, c=2, d=4. Step 2: det(A) = (3)(4) - (1)(2) = 12 - 2 = 10. Step 3: Since det != 0, the matrix is invertible.",
    keyPoints: ["det(A) = 0 means no inverse exists", "det(AB) = det(A)*det(B)", "det(A^T) = det(A)"],
    commonMistakes: ["Forgetting the minus sign: ad - bc (not ad + bc)", "Swapping rows and columns incorrectly for 3x3"],
    practiceQuestions: ["Find det([[5,2],[1,3]]).", "Find det([[1,0,1],[0,1,0],[1,0,1]]) and interpret.", "If det(A) = 3 and det(B) = -2, find det(AB)."]
  },
  {
    heading: "Exercise Pattern 2: Finding Matrix Inverse",
    content: "Given a 2x2 matrix, find its inverse using A^-1 = (1/det(A))*[[d,-b],[-c,a]]. First check det(A) != 0, then swap diagonal elements, negate off-diagonal elements, and divide by determinant.",
    formula: "A^{-1} = \\dfrac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}",
    example: "Find A^-1 where A = [[2,3],[1,4]]. Step 1: det(A) = (2)(4) - (3)(1) = 5. Step 2: Swap diagonals: [[4,...],[...,2]]. Step 3: Negate off-diagonals: [[4,-3],[-1,2]]. Step 4: A^-1 = (1/5)[[4,-3],[-1,2]].",
    keyPoints: ["Inverse only exists if det != 0", "AA^-1 = I (identity matrix)"],
    commonMistakes: ["Using det = 0 (singularity) to divide", "Forgetting to negate both off-diagonal elements"],
    practiceQuestions: ["Find inverse of [[3,1],[2,5]].", "Show that [[1,2],[2,3]] has no inverse.", "Verify AA^-1 = I for A = [[2,1],[1,3]]."]
  },
  {
    heading: "Exercise Pattern 3: Complex Number Operations",
    content: "Simplify expressions involving complex numbers using i^2 = -1. For division, multiply numerator and denominator by the conjugate. For powers of i, use the cycle: i, i^2=-1, i^3=-i, i^4=1.",
    formula: "(a+bi)(a-bi) = a^2 + b^2, \\qquad i^2 = -1",
    example: "Simplify (3+2i)/(1-i). Step 1: Multiply by conjugate: (3+2i)(1+i)/((1-i)(1+i)). Step 2: Numerator: 3+3i+2i+2i^2 = 1+5i. Step 3: Denominator: 1-i^2 = 2. Result: (1+5i)/2 = 1/2 + (5/2)i.",
    keyPoints: ["Conjugate of a+bi is a-bi", "|z|^2 = z*z_conj = a^2+b^2"],
    commonMistakes: ["Forgetting i^2 = -1 when expanding", "Not rationalizing the denominator"],
    practiceQuestions: ["Simplify (2+3i)^2.", "Find |3-4i|.", "Simplify i^47."]
  },
  {
    heading: "Exercise Pattern 4: Solving Quadratic Equations",
    content: "Solve ax^2+bx+c=0 using the quadratic formula or factoring. Check discriminant D = b^2-4ac first: D>0 (two real roots), D=0 (one repeated root), D<0 (complex roots).",
    formula: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    example: "Solve 2x^2 - 7x + 3 = 0. Step 1: a=2, b=-7, c=3. D = 49-24 = 25 > 0. Step 2: x = (7 +/- 5)/4. Step 3: x1 = 3, x2 = 1/2. Check: 2(9)-21+3=0.",
    keyPoints: ["Always check discriminant first", "Sum of roots = -b/a, product = c/a"],
    commonMistakes: ["Sign errors in -b+-sqrt(D)", "Forgetting to divide by 2a"],
    practiceQuestions: ["Solve x^2-5x+6=0 by factoring.", "Find the nature of roots of 3x^2+2x+1=0.", "If roots of x^2-kx+6=0 differ by 5, find k."]
  },
  {
    heading: "Exercise Pattern 5: Limit by Direct Substitution",
    content: "Evaluate lim(x->a) f(x) by directly substituting x=a. If the result is a finite number, that is the limit. This works for all polynomial, rational (when denominator!=0), trigonometric, and exponential functions.",
    formula: "\\lim_{x \\to a} f(x) = f(a) \\quad \\text{(when f is continuous at } a\\text{)}",
    example: "Evaluate lim(x->2) (x^2+3x-2). Substitute x = 2: (2)^2 + 3(2) - 2 = 4 + 6 - 2 = 8. Since this is a polynomial, it is continuous. Answer: 8.",
    keyPoints: ["Direct substitution works for continuous functions", "Polynomials are continuous everywhere"],
    commonMistakes: ["Substituting into discontinuous functions", "Not checking if denominator is zero"],
    practiceQuestions: ["Evaluate lim(x->1) (x^3-1)/(x-1).", "Find lim(x->pi/2) sin x.", "Evaluate lim(x->0) (e^x-1)/x."]
  },
  {
    heading: "Exercise Pattern 6: Limit by L'Hopital's Rule",
    content: "When lim f(x)/g(x) gives 0/0 or infinity/infinity, differentiate numerator and denominator separately: lim f/g = lim f'/g'. Apply repeatedly until the indeterminate form is resolved.",
    formula: "\\lim_{x \\to a} \\dfrac{f(x)}{g(x)} = \\lim_{x \\to a} \\dfrac{f'(x)}{g'(x)} \\quad \\text{(for 0/0 or } \\infty/\\infty\\text{)}",
    example: "Evaluate lim(x->0) sin(3x)/x. Step 1: Substituting gives 0/0. Step 2: Apply L'Hopital: differentiate num and den. Step 3: lim(x->0) 3cos(3x)/1 = 3. Answer: 3.",
    keyPoints: ["Only use for 0/0 or infinity/infinity forms", "Differentiate numerator and denominator separately"],
    commonMistakes: ["Applying L'Hopital when not indeterminate", "Using quotient rule instead of differentiating top and bottom"],
    practiceQuestions: ["Evaluate lim(x->0) (e^x-1-x)/x^2.", "Find lim(x->infinity) x/e^x.", "Evaluate lim(x->0) tan x/x."]
  },
  {
    heading: "Exercise Pattern 7: Derivative by Power Rule",
    content: "For f(x) = x^n, f'(x) = nx^(n-1). Extend to sums using linearity: d/dx[f+g] = f'+g'. Also use constant multiple: d/dx[c*f] = c*f'.",
    formula: "\\dfrac{d}{dx}[x^n] = nx^{n-1}",
    example: "Find d/dx[3x^4 - 2x^3 + 5x - 7]. d/dx[3x^4] = 12x^3. d/dx[-2x^3] = -6x^2. d/dx[5x] = 5. d/dx[-7] = 0. Answer: f'(x) = 12x^3 - 6x^2 + 5.",
    keyPoints: ["Power rule works for any real n", "Constant term derivative is 0"],
    commonMistakes: ["Writing x^n/n instead of nx^(n-1)", "Forgetting to multiply by the exponent"],
    practiceQuestions: ["Find d/dx[x^(3/2)].", "Differentiate f(x) = 1/x^2 + sqrt(x).", "Find the slope of y=x^3 at x=2."]
  },
  {
    heading: "Exercise Pattern 8: Product and Quotient Rules",
    content: "Product rule: d/dx[fg] = f'g + fg'. Quotient rule: d/dx[f/g] = (f'g - fg')/g^2. Product rule adds, quotient rule subtracts and divides by g^2.",
    formula: "\\dfrac{d}{dx}[fg] = f'g + fg', \\qquad \\dfrac{d}{dx}\\!\\left[\\dfrac{f}{g}\\right] = \\dfrac{f'g - fg'}{g^2}",
    example: "Find d/dx[x^2*sin x]. Let f=x^2, g=sin x. f'=2x, g'=cos x. By product rule: (2x)(sin x) + (x^2)(cos x) = 2x sin x + x^2 cos x.",
    keyPoints: ["Product rule: f'g + fg'", "Quotient rule: (f'g - fg')/g^2"],
    commonMistakes: ["Forgetting the product rule entirely", "Sign error in quotient rule"],
    practiceQuestions: ["Differentiate x^3*e^x.", "Find d/dx[tan x/x].", "Differentiate sqrt(x)*ln x."]
  },
  {
    heading: "Exercise Pattern 9: Chain Rule",
    content: "For composite functions f(g(x)): differentiate the outer function (keeping inner as-is), then multiply by the derivative of the inner function. Work from outside in.",
    formula: "\\dfrac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)",
    example: "Find d/dx[sin(x^2+1)]. Outer: sin(u), inner: u=x^2+1. d/du[sin u] = cos u = cos(x^2+1). du/dx = 2x. Multiply: 2x cos(x^2+1).",
    keyPoints: ["Identify outer and inner functions", "Differentiate outer first, then multiply by inner derivative"],
    commonMistakes: ["Forgetting to multiply by the inner derivative", "Differentiating both outer and inner incorrectly"],
    practiceQuestions: ["Find d/dx[e^(sin x)].", "Differentiate sqrt(x^2+1).", "Find d/dx[ln(x^3+2x)]."]
  },
  {
    heading: "Exercise Pattern 10: Basic Integration",
    content: "Reverse the power rule: integral of x^n dx = x^(n+1)/(n+1) + C (for n!=-1). Standard integrals: integral e^x dx = e^x+C, integral 1/x dx = ln|x|+C, integral cos x dx = sin x+C.",
    formula: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C, \\quad \\int e^x\\,dx = e^x + C",
    example: "Evaluate integral(4x^3 - 6x + 2) dx. integral 4x^3 dx = x^4. integral (-6x) dx = -3x^2. integral 2 dx = 2x. Answer: x^4 - 3x^2 + 2x + C.",
    keyPoints: ["Always add +C for indefinite integrals", "Reverse the power rule: increase exponent by 1, divide by new exponent"],
    commonMistakes: ["Forgetting +C", "Writing x^n/n instead of x^(n+1)/(n+1)"],
    practiceQuestions: ["Evaluate integral(3x^2+2x-1) dx.", "Find integral(1/x + e^x) dx.", "Evaluate integral cos(2x) dx."]
  },
  {
    heading: "Exercise Pattern 11: Integration by Substitution",
    content: "When integrand contains a function and its derivative, substitute u = g(x), du = g'(x)dx. Rewrite in terms of u, integrate, then substitute back.",
    formula: "\\int f(g(x)) \\cdot g'(x)\\,dx = \\int f(u)\\,du \\quad \\text{where } u = g(x)",
    example: "Evaluate integral 2x*e^(x^2) dx. Let u = x^2, du = 2x dx. Integral becomes integral e^u du = e^u + C = e^(x^2) + C.",
    keyPoints: ["Look for g'(x) alongside g(x)", "Don't forget to substitute back to x"],
    commonMistakes: ["Choosing wrong u (must include g'(x))", "Forgetting to substitute back to x"],
    practiceQuestions: ["Evaluate integral x*cos(x^2) dx.", "Find integral (2x+1)^3 dx.", "Evaluate integral x/sqrt(x^2+1) dx."]
  },
  {
    heading: "Exercise Pattern 12: Integration by Parts",
    content: "Use LIATE to choose u: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential. Then integral u dv = uv - integral v du.",
    formula: "\\int u\\,dv = uv - \\int v\\,du",
    example: "Evaluate integral x*e^x dx. By LIATE, u = x, dv = e^x dx. du = dx, v = e^x. Apply: x*e^x - integral e^x dx = x*e^x - e^x + C = e^x(x-1) + C.",
    keyPoints: ["LIATE guides u selection", "Apply formula: uv - integral v du"],
    commonMistakes: ["Choosing u wrong (should be LIATE order)", "Sign errors in -integral v du"],
    practiceQuestions: ["Evaluate integral x*cos x dx.", "Find integral ln x dx.", "Evaluate integral x^2*e^x dx."]
  },
  {
    heading: "Exercise Pattern 13: Dot Product Calculations",
    content: "The dot product a.b = |a||b|cos(theta) = a1*b1 + a2*b2 + a3*b3. Use it to find angles between vectors and check perpendicularity (a.b = 0 means perpendicular).",
    formula: "\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta = a_1b_1 + a_2b_2 + a_3b_3",
    example: "Angle between a=(1,2,3) and b=(4,-1,2). a.b = 4-2+6 = 8. |a|=sqrt(14), |b|=sqrt(21). cos(theta) = 8/sqrt(294) = 0.466. theta = 62.2 degrees.",
    keyPoints: ["a.b = 0 implies vectors are perpendicular", "|a.b| <= |a||b| (Cauchy-Schwarz)"],
    commonMistakes: ["Adding corresponding components wrong", "Forgetting to take arccos"],
    practiceQuestions: ["Find a.b for a=(2,-1,3), b=(1,4,-2).", "Are (1,2) and (4,-2) perpendicular?", "Find theta between (3,0) and (0,5)."]
  },
  {
    heading: "Exercise Pattern 14: Cross Product Calculations",
    content: "For a=(a1,a2,a3) and b=(b1,b2,b3), a x b = (a2*b3-a3*b2, a3*b1-a1*b3, a1*b2-a2*b1). The result is perpendicular to both vectors. Its magnitude equals the area of the parallelogram.",
    formula: "\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}",
    example: "Find a x b for a=(1,2,3), b=(4,0,5). i: (2)(5)-(3)(0)=10. j: -[(1)(5)-(3)(4)]=7. k: (1)(0)-(2)(4)=-8. Answer: (10, 7, -8).",
    keyPoints: ["Cross product gives a perpendicular vector", "a x b = -(b x a) (anti-commutative)"],
    commonMistakes: ["Sign error in j-component", "Confusing cross product with dot product"],
    practiceQuestions: ["Find (1,0,0) x (0,1,0).", "Compute (2,-1,3) x (1,4,-2).", "Find a vector perpendicular to both (1,2,3) and (4,5,6)."]
  },
  {
    heading: "Exercise Pattern 15: Vector Projections",
    content: "The projection of a onto b: proj_b(a) = (a.b/|b|^2)*b. Scalar projection is a.b/|b|. Use these to find components of forces and resolve vectors.",
    formula: "\\text{proj}_{\\vec{b}}\\,\\vec{a} = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|^2}\\,\\vec{b}",
    example: "Projection of a=(3,4) onto b=(1,0). a.b = 3. |b|^2 = 1. proj_b(a) = (3/1)*(1,0) = (3,0).",
    keyPoints: ["Projection is parallel to b", "Scalar projection = |a|cos(theta)"],
    commonMistakes: ["Using |b| instead of |b|^2", "Confusing projection of a on b vs b on a"],
    practiceQuestions: ["Project (2,3) onto (1,1).", "Find scalar projection of (3,4) on (0,5).", "Decompose (5,1) into components parallel and perpendicular to (1,0)."]
  },
  {
    heading: "Exercise Pattern 16: Scalar Triple Product and Volume",
    content: "The scalar triple product a.(bxc) gives the signed volume of the parallelepiped. Absolute value gives actual volume. If [abc]=0, the vectors are coplanar.",
    formula: "[\\vec{a}\\;\\vec{b}\\;\\vec{c}] = \\vec{a} \\cdot (\\vec{b} \\times \\vec{c}) = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}",
    example: "Volume with a=(1,0,1), b=(2,1,0), c=(0,1,1). Det: 1(1-0) - 0 + 1(2-0) = 3. Volume = |3| = 3 cubic units.",
    keyPoints: ["|scalar triple product| = volume", "[abc]=0 means coplanar vectors"],
    commonMistakes: ["Forgetting absolute value for volume", "Expanding determinant incorrectly"],
    practiceQuestions: ["Find volume with edges (1,1,0),(0,1,1),(1,0,1).", "Show (1,2,3),(4,5,6),(7,8,9) are coplanar.", "Find volume of tetrahedron with same edges."]
  },
  {
    heading: "Exercise Pattern 17: Vector Equation of a Line",
    content: "Line through point A with position vector a, direction d: r = a + td where t is a scalar parameter. Convert to Cartesian by eliminating t.",
    formula: "\\vec{r} = \\vec{a} + t\\vec{d}, \\qquad \\dfrac{x-x_1}{a} = \\dfrac{y-y_1}{b} = \\dfrac{z-z_1}{c}",
    example: "Cartesian form of r = (1,2,3) + t(2,-1,4). x=1+2t, y=2-t, z=3+4t. Solve: (x-1)/2 = (y-2)/(-1) = (z-3)/4.",
    keyPoints: ["t is any real number", "Direction ratios come from d = (a,b,c)"],
    commonMistakes: ["Writing direction ratios as denominators wrong", "Confusing parametric and Cartesian forms"],
    practiceQuestions: ["Convert r=(0,1,-1)+t(1,2,3) to Cartesian.", "Find the point on line r=(2,0,1)+t(1,1,0) at t=3.", "Do lines r=(1,0,0)+t(1,1,0) and r=(0,1,0)+s(0,1,1) intersect?"]
  },
  {
    heading: "Exercise Pattern 18: Vector Equation of a Plane",
    content: "Plane through point with position vector a, normal n: (r-a).n = 0, or r.n = a.n. Cartesian form: a(x-x1)+b(y-y1)+c(z-z1)=0.",
    formula: "(\\vec{r} - \\vec{a}) \\cdot \\vec{n} = 0, \\qquad \\text{Cartesian: } ax+by+cz=d",
    example: "Plane through (1,2,3) with normal (2,-1,4). (x-1)(2)+(y-2)(-1)+(z-3)(4)=0. Simplify: 2x-y+4z=12.",
    keyPoints: ["Normal vector coefficients = plane coefficients", "d = a.n (dot product of point and normal)"],
    commonMistakes: ["Sign errors when expanding", "Using position vector incorrectly"],
    practiceQuestions: ["Find plane through (1,-1,2) normal to (3,0,-1).", "Find distance from origin to 2x+3y-z=6.", "Find intersection of line r=(0,0,1)+t(1,1,1) with plane x+y+z=3."]
  },
  {
    heading: "Exercise Pattern 19: Bayes' Theorem Applications",
    content: "Given P(A) and conditional probabilities P(B|A), P(B|A'), find P(A|B) = P(B|A)*P(A) / [P(B|A)*P(A) + P(B|A')*P(A')]. Compute total P(B) first.",
    formula: "P(A|B) = \\dfrac{P(B|A)\\cdot P(A)}{P(B|A)\\cdot P(A) + P(B|A')\\cdot P(A')}",
    example: "Factory: M1=40% (2% defective), M2=30% (3%), M3=30% (1%). P(D) = 0.4(0.02)+0.3(0.03)+0.3(0.01) = 0.020. P(M1|D) = 0.008/0.020 = 0.4 = 40%.",
    keyPoints: ["Bayes' theorem reverses conditional probability", "Compute total P(B) first"],
    commonMistakes: ["Forgetting to compute P(B) first", "Confusing P(A|B) with P(B|A)"],
    practiceQuestions: ["2% from A defective, 5% from B. 60% from A. Find P(A|defective).", "Test 95% accurate, prevalence 1%. Find P(disease|positive).", "P(A)=0.3, P(B|A)=0.5, P(B|A')=0.2. Find P(A|B)."]
  },
  {
    heading: "Exercise Pattern 20: Probability Rules",
    content: "Addition rule: P(A U B) = P(A)+P(B)-P(A n B). Independent: P(A n B) = P(A)*P(B). Mutually exclusive: P(A U B) = P(A)+P(B). Complement: P(A') = 1-P(A).",
    formula: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B), \\qquad P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}",
    example: "P(math)=0.7, P(physics)=0.6, P(both)=0.5. P(M U P) = 0.7+0.6-0.5 = 0.8. P(neither) = 1-0.8 = 0.2.",
    keyPoints: ["Addition rule subtracts intersection", "Independent: P(A n B) = P(A)P(B)", "Mutually exclusive: P(A n B) = 0"],
    commonMistakes: ["Adding without subtracting intersection", "Assuming independence when events are dependent"],
    practiceQuestions: ["P(A)=0.4, P(B)=0.5, P(A n B)=0.2. Find P(A U B).", "Two dice rolled. P(sum>9)?", "P(A)=0.3, P(B)=0.5. If independent, find P(A n B)."]
  },
];

// Generate new sections with proper TypeScript escaping
let newSections = '';
for (const p of patterns) {
  const kp = p.keyPoints
    ? '\r\n          keyPoints: [' + p.keyPoints.map(k => '\r\n            "' + tsEscape(k) + '",').join('') + '\r\n          ],'
    : '';
  const cm = p.commonMistakes
    ? '\r\n          commonMistakes: [' + p.commonMistakes.map(m => '\r\n            "' + tsEscape(m) + '",').join('') + '\r\n          ],'
    : '';
  const pq = p.practiceQuestions
    ? '\r\n          practiceQuestions: [' + p.practiceQuestions.map(q => '\r\n            "' + tsEscape(q) + '",').join('') + '\r\n          ],'
    : '';
  newSections +=
    '\r\n        {\r\n' +
    '          heading: "' + tsEscape(p.heading) + '",\r\n' +
    '          content: "' + tsEscape(p.content) + '",\r\n' +
    '          formula: "' + tsEscape(p.formula) + '",\r\n' +
    '          example: "' + tsEscape(p.example) + '",' +
    kp + cm + pq + '\r\n' +
    '        },\r\n';
}

// Step 3: Insert patterns BEFORE the closing ] of sections array
// The sections array ends with: \r\n      ],\r\n      keyPoints:
// We insert our new sections just before that ],
const searchMarker = '\r\n      ],\r\n      keyPoints: [\r\n        "All proofs follow NEB Class 11 & 12 Mathematics syllabus"';
const insertIdx = c.indexOf(searchMarker);
if (insertIdx === -1) {
  console.log('ERROR: Could not find insertion marker');
  process.exit(1);
}

// insertIdx points to the \r\n before ], — insert there
c = c.substring(0, insertIdx) + newSections + c.substring(insertIdx);
console.log('Inserted', patterns.length, 'exercise patterns');

// Step 4: Update topic-level keyPoints
const oldKP = '      keyPoints: [\r\n        "All proofs follow NEB Class 11 & 12 Mathematics syllabus",\r\n        "Each theorem includes statement, proof, and example",\r\n        "Organized by syllabus unit for easy navigation",\r\n        "Formulas use KaTeX for proper rendering",\r\n      ]';
const newKP = '      keyPoints: [\r\n        "All proofs follow NEB Class 11 & 12 Mathematics syllabus",\r\n        "Each theorem includes statement, proof, and example",\r\n        "Organized by syllabus unit for easy navigation",\r\n        "Formulas use KaTeX for proper rendering",\r\n        "20 exercise patterns cover Algebra, Calculus, Vectors, and Probability",\r\n        "Each pattern shows the standard approach with worked solutions",\r\n      ]';
c = c.replace(oldKP, newKP);

// Step 5: Update topic-level commonMistakes
const oldCM = '      commonMistakes: [\r\n        "Confusing sin(A+B) with sin A + sin B",\r\n        "Forgetting chain rule for composite functions",\r\n        "Using degrees instead of radians in calculus",\r\n        "Confusing population variance with sample variance",\r\n      ]';
const newCM = '      commonMistakes: [\r\n        "Confusing sin(A+B) with sin A + sin B",\r\n        "Forgetting chain rule for composite functions",\r\n        "Using degrees instead of radians in calculus",\r\n        "Confusing population variance with sample variance",\r\n        "Applying L\'Hopital\'s rule when not indeterminate (0/0 or inf/inf)",\r\n        "Forgetting +C in indefinite integrals",\r\n        "Using AB = BA for matrices (not true in general)",\r\n      ]';
c = c.replace(oldCM, newCM);

// Step 6: Update topic-level practiceQuestions
const oldPQ = '      practiceQuestions: [\r\n        "Prove det(AB) = det(A)*det(B) for 2x2 matrices.",\r\n        "Prove the quadratic formula by completing the square.",\r\n        "Prove sin(A+B) = sin A cos B + cos A sin B using Euler\'s formula.",\r\n        "Prove the product rule using the definition of derivative.",\r\n        "Prove the Fundamental Theorem of Calculus.",\r\n        "Prove integration by parts from the product rule.",\r\n        "Prove the distance formula using the Pythagorean theorem.",\r\n        "Prove Bayes\' theorem from the definition of conditional probability.",\r\n        "Prove the addition rule of probability using Venn diagrams.",\r\n        "Prove that the mean of Bin(n,p) is np using linearity of expectation.",\r\n      ]';
const newPQ = '      practiceQuestions: [\r\n        "Prove det(AB) = det(A)*det(B) for 2x2 matrices.",\r\n        "Prove the quadratic formula by completing the square.",\r\n        "Prove sin(A+B) = sin A cos B + cos A sin B using Euler\'s formula.",\r\n        "Prove the product rule using the definition of derivative.",\r\n        "Prove the Fundamental Theorem of Calculus.",\r\n        "Prove integration by parts from the product rule.",\r\n        "Prove the distance formula using the Pythagorean theorem.",\r\n        "Prove Bayes\' theorem from the definition of conditional probability.",\r\n        "Prove the addition rule of probability using Venn diagrams.",\r\n        "Prove that the mean of Bin(n,p) is np using linearity of expectation.",\r\n        "Solve: Find det([[5,2],[1,3]]) using pattern 1.",\r\n        "Find d/dx[x^2*sin x] using pattern 8.",\r\n        "Evaluate integral x*e^x dx using pattern 12.",\r\n        "Find the angle between (1,2,3) and (4,0,5) using pattern 13.",\r\n        "Apply Bayes\' theorem: P(A)=0.4, P(B|A)=0.7, P(B|A\')=0.2.",\r\n      ]';
c = c.replace(oldPQ, newPQ);

fs.writeFileSync('frontend/components/lab/theory-panel.tsx', c, 'utf8');
console.log('File written successfully');
console.log('Final file size:', c.length, 'bytes');
console.log('Has exercise pattern 20:', c.includes('Exercise Pattern 20'));
console.log('Has exercise pattern 1:', c.includes('Exercise Pattern 1'));
console.log('Has keyPoints in SectionData:', c.includes('keyPoints?: string[]'));
console.log('Has commonMistakes in SectionData:', c.includes('commonMistakes?: string[]'));
console.log('Has practiceQuestions in SectionData:', c.includes('practiceQuestions?: string[]'));
