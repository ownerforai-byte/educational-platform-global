/**
 * Theorem Fill — Biology (class 12) & Mathematics (class 12).
 */

import type { DerivationOrTheorem } from "@/lib/derivations-data";

const BM: DerivationOrTheorem[] = [
  // ═══════════ BIOLOGY · CLASS 12 ═══════════
  {
    id: "tf-bio-12-mendel-laws",
    slug: "mendel-s-laws-of-inheritance-monohybrid-and-dihybrid-cross",
    title: "Mendel's Laws of Inheritance — Monohybrid and Dihybrid Cross",
    subject: "biology",
    unit: "Heredity and Evolution",
    unitId: "heredity-and-evolution",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Genetics)",
    isExtra: true,
    statement:
      "From monohybrid crosses, the Law of Segregation: allele pairs separate during gamete formation, each gamete carrying one allele (F₂ phenotypic ratio 3:1). From dihybrid crosses, the Law of Independent Assortment: allele pairs for different characters segregate independently (F₂ ratio 9:3:3:1). The Law of Dominance: in a heterozygote one allele masks the other.",
    coreFormula: "Aa \\times Aa \\to 3:1; \\qquad AaBb \\times AaBb \\to 9:3:3:1",
    concernedTerms: [
      { term: "Allele", symbol: "A/a", units: "—", definition: "Alternative form of a gene at the same locus." },
      { term: "Test cross", symbol: "×aa", units: "—", definition: "Cross with homozygous recessive revealing unknown genotype (1:1 vs all dominant)." },
      { term: "Punnett square", symbol: "—", units: "—", definition: "Grid of gamete combinations computing offspring probabilities." },
    ],
    assumptions: ["Genes on different chromosomes assort independently (linked genes break Law 3).", "Complete dominance for the 3:1 ratio."],
    proofSteps: [
      { stepNumber: 1, title: "Monohybrid F₁ and F₂", latex: "AA \\times aa \\to Aa; \\; Aa \\times Aa \\to \\frac{1}{4}AA + \\frac{1}{2}Aa + \\frac{1}{4}aa", explanation: "Segregation gives a 1:2:1 genotype ratio; dominance converts it to 3:1 phenotype." },
      { stepNumber: 2, title: "Dihybrid gamete independence", latex: "AaBb \\to AB, Ab, aB, ab \\; (1:1:1:1)", explanation: "Each allele pair segregates independently during meiosis I (metaphase orientation random)." },
      { stepNumber: 3, title: "16-cell Punnett grid", latex: "4 \\times 4 \\to 9AB + 3Abb + 3aaB + 1aabb", explanation: "Multiplying probabilities: (3:1) × (3:1) = 9:3:3:1 — independence in numbers." },
      { stepNumber: 4, title: "Verification by test cross", latex: "AaBb \\times aabb \\to 1:1:1:1", explanation: "Mendel's own confirmation: the heterozygote's gamete ratios become visible in offspring." },
    ],
    conclusion:
      "Three laws from pea counts: dominance hides, segregation separates, independent assortment shuffles — the statistical foundation genetics still stands on.",
    keyTakeaways: [
      "Exceptions: incomplete dominance (1:2:1 pink), codominance (AB blood), linkage breaks 9:3:3:1.",
      "Chi-square (χ²) tests whether observed ratios fit Mendelian expectations.",
      "Mendel's laws apply at meiosis I: segregation = anaphase I, assortment = metaphase I orientation.",
    ],
    examTraps: [
      "❌ Forgetting that 9:3:3:1 assumes NO linkage — linked genes distort toward parental classes.",
      "❌ Saying F₂ genotype ratio is 3:1 — that's the PHENOTYPE; genotypes are 1:2:1.",
    ],
    visualType: "tv-mendel-laws",
    specialCases: [
      { name: "Incomplete dominance", condition: "Snapdragon", formula: "1:2:1 \\text{ phenotypic}", meaning: "Heterozygote intermediate — both laws intact, dominance absent." },
      { name: "Codominance", condition: "Blood group AB", formula: "I^AI^B \\text{ expressed both}", meaning: "No masking — both alleles visible." },
      { name: "Linked genes", condition: "Same chromosome", formula: "\\text{recombination } < 50\\%", meaning: "Independent assortment fails; mapping via crossover frequency." },
    ],
    solvedProblems: [
      {
        id: "tf-b-men-1",
        question: "Two heterozygous tall peas cross. What fraction is short (tt)?",
        examBadge: "NEB Board",
        given: "Tt × Tt",
        stepByStep: ["Punnett: TT, Tt, Tt, tt."],
        finalAnswer: "\\frac{1}{4} = 25\\% \\text{ short}",
        tipOrTrap: "3 tall : 1 short every time the trait is simply dominant.",
      },
    ],
  },
  {
    id: "tf-bio-12-chromosome-theory",
    slug: "chromosome-theory-of-inheritance",
    title: "Chromosome Theory of Inheritance (Sutton–Boveri)",
    subject: "biology",
    unit: "Heredity and Evolution",
    unitId: "heredity-and-evolution",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Genetics)",
    isExtra: true,
    statement:
      "Sutton and Boveri (1902) united Mendel with cytology: genes occupy specific sites (loci) on chromosomes; the parallel behaviour of chromosomes in meiosis (separation of homologues, random orientation) is exactly Mendel's segregation and independent assortment, making chromosomes the physical carriers of heredity.",
    coreFormula: "2n \\to \\text{gametes } n \\text{ (meiosis)} \\Leftrightarrow \\text{alleles segregate}",
    concernedTerms: [
      { term: "Locus", symbol: "—", units: "—", definition: "Gene's physical position on a chromosome." },
      { term: "Homologous pair", symbol: "—", units: "—", definition: "One maternal + one paternal chromosome carrying the same gene sequence." },
      { term: "Synapsis", symbol: "—", units: "—", definition: "Homologue pairing in prophase I — the cytological scene of segregation." },
    ],
    assumptions: ["Diploid sexual organisms.", "Genes are linearly arranged (later confirmed by linkage maps)."],
    proofSteps: [
      { stepNumber: 1, title: "The parallels", latex: "\\text{gene pairs} \\Leftrightarrow \\text{homologue pairs}", explanation: "Diploid cells carry two alleles per gene as two homologues; meiosis separates both — Sutton's table of correspondences." },
      { stepNumber: 2, title: "Independent assortment mechanism", latex: "2^n \\text{ gamete combinations}", explanation: "Random metaphase-I orientation gives humans 2²³ = 8.4 million chromosome combinations — assortment's physical engine." },
      { stepNumber: 3, title: "Proof by linkage", latex: "\\text{same-chromosome genes co-segregate}", explanation: "Where assortment failed, genes shared a chromosome — confirming the theory by its boundary conditions." },
    ],
    conclusion:
      "The chromosome theory gave Mendel's abstract factors a physical address: alleles are loci, meiosis is segregation, and the microscope validated the statistics.",
    keyTakeaways: [
      "Sex determination (XX/XY) was the theory's first triumph (Stevens, Wilson).",
      "Crossing over in prophase I adds recombination on top of assortment.",
      "Non-disjunction (Down syndrome) demonstrates chromosomes' causal role.",
    ],
    examTraps: [
      "❌ Attributing the theory to Mendel — he never saw chromosomes; Sutton–Boveri made the connection.",
      "❌ Confusing independent assortment (different chromosomes) with crossing over (same chromosome).",
    ],
    visualType: "tv-chromosome-theory",
    specialCases: [
      { name: "Non-disjunction", condition: "Meiotic error", formula: "n+1 / n-1 \\text{ gametes}", meaning: "Trisomy 21 — chromosomes as causal agents proven." },
      { name: "Sex linkage", condition: "X chromosome genes", formula: "\\text{criss-cross inheritance}", meaning: "Haemophilia, colour blindness patterns." },
      { name: "Linked inheritance", condition: "Drosophila map", formula: "\\text{map unit} = 1\\% \\text{ recombination}", meaning: "Sturtevant's linear gene order." },
    ],
    solvedProblems: [],
  },
  {
    id: "tf-bio-12-rdna-technology",
    slug: "principles-of-biotechnology-recombinant-dna-technology",
    title: "Principles of Biotechnology — Recombinant DNA Technology",
    subject: "biology",
    unit: "Biotechnology: Principles and Processes",
    unitId: "biotechnology-principles",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Biotechnology)",
    isExtra: true,
    statement:
      "rDNA technology stitches a foreign gene into a vector with restriction endonucleases (molecular scissors) and DNA ligase, then amplifies it inside a host. Core tools: restriction enzymes at palindromic sites (e.g. EcoRI at GAATTC), plasmid/viral vectors with origin + marker genes, competent host cells, and PCR for in-vitro amplification.",
    coreFormula: "\\text{vector} + \\text{insert} \\xrightarrow{\\text{EcoRI + ligase}} \\text{rDNA} \\xrightarrow{\\text{transform}} \\text{clone}",
    concernedTerms: [
      { term: "Restriction endonuclease", symbol: "EcoRI", units: "—", definition: "Cuts palindromic sequences staggered, leaving sticky ends." },
      { term: "Vector", symbol: "—", units: "—", definition: "Self-replicating DNA (plasmid, λ phage) carrying ori, selectable marker, cloning site." },
      { term: "Competent cell", symbol: "—", units: "—", definition: "Host (E. coli) made permeable (Ca²⁺, electroporation) to take up rDNA." },
    ],
    assumptions: ["Sticky ends match between insert and vector.", "Selectable marker distinguishes recombinants."],
    proofSteps: [
      { stepNumber: 1, title: "Cut insert and vector with the same enzyme", latex: "GAATTC \\xrightarrow{EcoRI} -G \\;|\\; AATTC-", explanation: "Identical staggered cuts give complementary sticky ends on both molecules." },
      { stepNumber: 2, title: "Ligate", latex: "\\text{DNA ligase seals } 3'\\text{-}5' \\text{ phosphodiester bonds}", explanation: "Annealed sticky ends are stitched covalently — recombinant plasmid complete." },
      { stepNumber: 3, title: "Transform and select", latex: "\\text{blue-white screening on lacZ}", explanation: "Insertion disrupts the marker: white colonies carry inserts; antibiotic plates confirm the plasmid." },
      { stepNumber: 4, title: "Amplify", latex: "PCR: 94°C \\to 55°C \\to 72°C \\times n", explanation: "Denaturation, primer annealing, Taq extension — a billion copies in hours." },
    ],
    conclusion:
      "rDNA technology is molecular cut-and-paste: scissors with sequence specificity, glue, a vehicle with an address label, and a host factory — the platform behind insulin, vaccines and GMO crops.",
    keyTakeaways: [
      "EcoRI names its source: E = genus, co = species, R = strain, I = order of discovery.",
      "Ti-plasmid of Agrobacterium is the plant vector; retroviruses serve animals.",
      "Bioreactors scale clones to litres: growth → product → downstream purification.",
    ],
    examTraps: [
      "❌ Saying restriction enzymes cut randomly — they cut ONLY their palindromic recognition site.",
      "❌ Forgetting ori — without it the vector can't replicate and the clone is lost.",
    ],
    visualType: "tv-rdna-technology",
    specialCases: [
      { name: "Sticky vs blunt ends", condition: "Enzyme type", formula: "SmaI \\text{ (blunt)} \\ne EcoRI", meaning: "Sticky ends ligate efficiently; blunt need adapters." },
      { name: "Human insulin", condition: "Chain A + B", formula: "\\text{two plasmids} \\to \\text{disulphide join}", meaning: "Humulin — first rDNA drug (1982)." },
      { name: "Gene therapy vector", condition: "Retrovirus", formula: "\\text{disarmed} \\ \\gamma\\text{-retroviral}", meaning: "Therapeutic genes delivered to human cells." },
    ],
    solvedProblems: [],
  },

  // ═══════════ MATHEMATICS · CLASS 12 ═══════════
  {
    id: "tf-math-12-differentiability",
    slug: "differentiability-and-its-relation-with-continuity",
    title: "Differentiability and Its Relation with Continuity",
    subject: "mathematics",
    unit: "Limits and Continuity",
    unitId: "limits-and-continuity",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Calculus)",
    isExtra: true,
    statement:
      "f is differentiable at x = a when lim(h→0) [f(a+h) − f(a)]/h exists (both sides agree). Differentiability implies continuity, but continuity does NOT imply differentiability: |x| is continuous everywhere yet has no derivative at 0 (corner).",
    coreFormula: "f'(a) = \\lim_{h \\to 0}\\frac{f(a+h)-f(a)}{h}, \\qquad \\text{differentiable} \\Rightarrow \\text{continuous}",
    concernedTerms: [
      { term: "Derivative", symbol: "f'(a)", units: "—", definition: "Instantaneous rate — the slope of the tangent line." },
      { term: "Corner/cusp", symbol: "—", units: "—", definition: "Point where one-sided slopes disagree ⇒ not differentiable despite continuity." },
      { term: "Vertical tangent", symbol: "—", units: "—", definition: "Slope → ∞ (x^(1/3) at 0): continuous, not differentiable." },
    ],
    assumptions: ["Two-sided limit must exist and be finite."],
    proofSteps: [
      { stepNumber: 1, title: "Differentiability ⇒ continuity", latex: "\\lim_{h\\to0}[f(a+h)-f(a)] = \\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}\\cdot h = f'(a)\\cdot 0 = 0", explanation: "Write the difference as slope × h; the slope is finite and h → 0, so the difference dies — f(a+h) → f(a)." },
      { stepNumber: 2, title: "Continuity ⇏ differentiability", latex: "f(x)=|x|: \\; \\lim_{h\\to0^+}\\frac{h}{h}=1 \\ne -1=\\lim_{h\\to0^-}\\frac{-h}{h}", explanation: "One-sided derivatives disagree at the corner — the limit fails to exist while f stays continuous." },
      { stepNumber: 3, title: "Hierarchy", latex: "\\text{differentiable} \\subset \\text{continuous} \\subset \\text{bounded (on } [a,b]\\text{)}", explanation: "Each condition is strictly weaker: Weierstrass even built continuous-everywhere, differentiable-nowhere functions." },
    ],
    conclusion:
      "Smoothness is stronger than continuity: differentiability demands ONE well-defined slope, which forces the curve to be continuous — but a mere absence of jumps guarantees nothing about slope.",
    keyTakeaways: [
      "Standard non-differentiable points: corners (|x|), cusps (x^(2/3)), vertical tangents, jumps.",
      "Converse fails — the single most-tested logic point in this chapter.",
      "If f is differentiable at a, f is automatically continuous at a — cite the h·f'(a) argument.",
    ],
    examTraps: [
      "❌ Proving the converse — continuity does NOT give differentiability.",
      "❌ Forgetting to check BOTH one-sided derivatives at suspected corners.",
    ],
    visualType: "tv-differentiability",
    specialCases: [
      { name: "Corner", condition: "|x| at 0", formula: "LHD = -1, RHD = 1", meaning: "Continuous, not differentiable." },
      { name: "Cusp", condition: "x^{2/3} at 0", formula: "\\text{both one-sided} \\to \\pm\\infty", meaning: "Sharp point with vertical behaviour." },
      { name: "Polynomials", condition: "Everywhere smooth", formula: "d/dx(x^n) = nx^{n-1}", meaning: "Differentiable on all of ℝ." },
    ],
    solvedProblems: [
      {
        id: "tf-m-dif-1",
        question: "Is f(x) = |x| differentiable at x = 0?",
        examBadge: "NEB 2078",
        given: "f(x) = |x|",
        stepByStep: ["RHD = lim(h→0⁺)(h−0)/h = 1.", "LHD = lim(h→0⁻)(−h−0)/h = −1.", "1 ≠ −1."],
        finalAnswer: "\\text{Not differentiable (but continuous)}",
        tipOrTrap: "The canonical counter-example for 'continuous ⇒ differentiable'.",
      },
    ],
  },
  {
    id: "tf-math-12-leibniz-theorem",
    slug: "leibniz-s-theorem-for-nth-derivative",
    title: "Leibniz's Theorem for the nth Derivative of a Product",
    subject: "mathematics",
    unit: "Differentiation",
    unitId: "differentiation",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Calculus)",
    isExtra: true,
    statement:
      "For u(x) and v(x) with n derivatives, (uv)^(n) = Σ C(n,k) u^(k) v^(n−k) — the product rule generalized: binomial coefficients weight all ways of distributing k derivatives to u and the rest to v. Proved by induction from the ordinary product rule.",
    coreFormula: "(uv)^{(n)} = \\sum_{k=0}^{n}\\binom{n}{k}u^{(k)}v^{(n-k)}",
    concernedTerms: [
      { term: "Binomial coefficient", symbol: "C(n,k)", units: "—", definition: "Number of ways to choose which k derivatives hit u." },
      { term: "Pascal's verification", symbol: "—", units: "—", definition: "n = 1 recovers the ordinary product rule; n = 2 gives u″v + 2u′v′ + uv″." },
    ],
    assumptions: ["u, v both n-times differentiable."],
    proofSteps: [
      { stepNumber: 1, title: "Base case", latex: "n=1: \\ (uv)' = u'v + uv'", explanation: "The theorem's first line is the product rule itself — induction's seed." },
      { stepNumber: 2, title: "Inductive step", latex: "(uv)^{(n+1)} = \\sum_k \\binom{n}{k}\\left[u^{(k+1)}v^{(n-k)} + u^{(k)}v^{(n-k+1)}\\right]", explanation: "Differentiate the assumed nth formula term by term." },
      { stepNumber: 3, title: "Pascal identity closes it", latex: "\\binom{n}{k-1} + \\binom{n}{k} = \\binom{n+1}{k}", explanation: "Adjacent terms merge exactly as Pascal's triangle dictates — the (n+1)th formula emerges." },
    ],
    conclusion:
      "Leibniz's theorem is the product rule raised to the nth power: differentiation distributes over products exactly as exponents distribute over binomials.",
    keyTakeaways: [
      "Strategy for (x²eˣ)⁽ⁿ⁾-type problems: differentiate the polynomial (dies after few terms), keep the exponential.",
      "Row of Pascal's triangle supplies the coefficients instantly.",
      "Also handles implicit products like x·sin x at high orders.",
    ],
    examTraps: [
      "❌ Reversing the derivative split — Σ C(n,k)u^(k)v^(n−k), k must sum to n everywhere.",
      "❌ Forgetting the 2 in 2u′v′ at n = 2.",
    ],
    visualType: "tv-leibniz-theorem",
    specialCases: [
      { name: "n = 1", condition: "Ordinary rule", formula: "u'v + uv'", meaning: "Sanity check." },
      { name: "n = 2", condition: "Second derivative", formula: "u''v + 2u'v' + uv''", meaning: "Middle coefficient 2 = C(2,1)." },
      { name: "Polynomial × e^x", condition: "u = x²", formula: "u''' = 0 \\text{ truncates the sum}", meaning: "Only first three terms survive." },
    ],
    solvedProblems: [
      {
        id: "tf-m-lei-1",
        question: "Find the nth derivative of x²eˣ.",
        examBadge: "NEB 2079",
        given: "u = x², v = eˣ",
        stepByStep: ["u' = 2x, u'' = 2, u^(k≥3) = 0; v^(n−k) = eˣ.", "y⁽ⁿ⁾ = eˣ(x² + 2nx + n(n−1))."],
        finalAnswer: "y^{(n)} = e^x\\left[x^2 + 2nx + n(n-1)\\right]",
        tipOrTrap: "The polynomial's derivatives die — sum only k = 0,1,2.",
      },
    ],
  },
  {
    id: "tf-math-12-ode-formation",
    slug: "formation-of-differential-equations",
    title: "Formation of Differential Equations",
    subject: "mathematics",
    unit: "Differential Equations",
    unitId: "differential-equations",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Calculus)",
    isExtra: true,
    statement:
      "To form the differential equation of a family with n arbitrary constants: differentiate n times and ELIMINATE the constants. The resulting ODE's order equals the number of arbitrary constants — the inverse of solving.",
    coreFormula: "y = Ae^{kx}: \\; y' = kAe^{kx} = ky \\;\\Rightarrow\\; y' - ky = 0 \\ (\\text{order } 1, \\text{one constant})",
    concernedTerms: [
      { term: "Arbitrary constant", symbol: "A, B", units: "—", definition: "Family parameter; each costs one differentiation to remove." },
      { term: "Order of ODE", symbol: "n", units: "—", definition: "Highest derivative present = number of constants eliminated." },
    ],
    assumptions: ["Constants are genuinely independent (no over-parameterization)."],
    proofSteps: [
      { stepNumber: 1, title: "Differentiate as many times as constants", latex: "y = A\\cos x + B\\sin x \\Rightarrow y' = -A\\sin x + B\\cos x \\Rightarrow y'' = -y", explanation: "Second differentiation reproduces −y — constants vanish automatically." },
      { stepNumber: 2, title: "Eliminate systematically", latex: "\\text{solve linear system in } A, B", explanation: "When constants don't vanish directly, use the equations to solve for them, then substitute back." },
      { stepNumber: 3, title: "State the ODE", latex: "y'' + y = 0", explanation: "Order 2, matching the two constants A, B — the order theorem verified." },
    ],
    conclusion:
      "Formation is solving run backwards: n constants ⇒ n differentiations ⇒ an ODE whose order counts the family's degrees of freedom.",
    keyTakeaways: [
      "Order = number of arbitrary constants (the exam's favourite one-liner).",
      "Families of curves: y² = 4a(x + a) needs TWO differentiations (a appears twice).",
      "Physical models: growth dN/dt = kN, cooling dT/dt = −k(T − T₀).",
    ],
    examTraps: [
      "❌ Differentiating fewer times than there are constants — under-determined system.",
      "❌ Treating k in y = Ae^(kx) as arbitrary when only A varies (k fixed ⇒ order 1).",
    ],
    visualType: "tv-ode-formation",
    specialCases: [
      { name: "One-constant family", condition: "y = Ax", formula: "x\\,dy - y\\,dx = 0", meaning: "First order — all lines through origin." },
      { name: "Circle family", condition: "(x−a)² + y² = r²", formula: "\\text{a, r free} \\Rightarrow \\text{order 2}", meaning: "Differentiate twice, solve for a, r." },
      { name: "Exponential family", condition: "y = Ce^{kx}, C free", formula: "y' = ky", meaning: "k is a PARAMETER, not arbitrary constant — order 1." },
    ],
    solvedProblems: [],
  },
  {
    id: "tf-math-12-line-in-space",
    slug: "equation-of-a-line-in-space-standard-and-general-form",
    title: "Equation of a Line in Space — Standard and General Forms",
    subject: "mathematics",
    unit: "Three-Dimensional Geometry",
    unitId: "three-dimensional-geometry",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Geometry)",
    isExtra: true,
    statement:
      "A line through point r₀ with direction vector b: vector form r = r₀ + λb; Cartesian form (x−x₁)/l = (y−y₁)/m = (z−z₁)/n where (l, m, n) are direction ratios. Two planes intersect in a line — the 'general form'; converting needs a point (set one coordinate) and a direction (b = n₁ × n₂).",
    coreFormula: "\\vec r = \\vec r_0 + \\lambda\\vec b; \\qquad \\frac{x-x_1}{l} = \\frac{y-y_1}{m} = \\frac{z-z_1}{n}",
    concernedTerms: [
      { term: "Direction vector", symbol: "b", units: "—", definition: "Any non-zero vector parallel to the line — the line's 'slope' in 3D." },
      { term: "Direction cosines", symbol: "(l, m, n)", units: "—", definition: "Cosines of angles with axes; l² + m² + n² = 1 (or use unnormalized ratios)." },
      { term: "Cross product direction", symbol: "n₁×n₂", units: "—", definition: "Normal to both plane normals = direction of their intersection line." },
    ],
    assumptions: ["b ≠ 0.", "Cartesian form requires the line not be parallel to a coordinate plane where a denominator vanishes (write 0 for that denominator)."],
    proofSteps: [
      { stepNumber: 1, title: "Point + direction characterization", latex: "P \\text{ on line} \\Leftrightarrow \\overrightarrow{AP} \\parallel \\vec b", explanation: "A line is fixed by where it starts and which way it runs — r − r₀ = λb." },
      { stepNumber: 2, title: "Component form", latex: "(x,y,z) = (x_1 + \\lambda l,\\ y_1 + \\lambda m,\\ z_1 + \\lambda n)", explanation: "Eliminating λ gives the symmetric Cartesian equation — all three ratios equal." },
      { stepNumber: 3, title: "From two planes", latex: "\\vec b = \\vec n_1 \\times \\vec n_2", explanation: "The line lies in both planes, so its direction is perpendicular to both normals — the cross product." },
    ],
    conclusion:
      "3D lines are 'point plus direction': symmetric ratios generalize 2D's slope, and plane-pairs hide lines that a cross product reveals.",
    keyTakeaways: [
      "Angle between two lines = angle between direction vectors (cos θ = b₁·b₂/|b₁||b₂|).",
      "Skew lines: neither intersecting nor parallel — pure 3D phenomenon.",
      "Shortest distance between skew lines uses the common perpendicular: |(r₂−r₁)·(b₁×b₂)|/|b₁×b₂|.",
    ],
    examTraps: [
      "❌ Writing zero denominators as errors — a 0 in the ratio means the coordinate is CONSTANT.",
      "❌ Using n₁ + n₂ for the line direction — it must be the CROSS product.",
    ],
    visualType: "tv-line-in-space",
    specialCases: [
      { name: "Line through two points", condition: "A, B given", formula: "\\vec b = \\overrightarrow{AB}", meaning: "Direction from the point difference." },
      { name: "Parallel to an axis", condition: "z-axis direction", formula: "(0,0,1) \\text{ ratios}", meaning: "x, y constant; two zero denominators." },
      { name: "Intersection of planes", condition: "2x+y−z=1, x−y+2z=3", formula: "b = n_1\\times n_2 = (1,-5,-3)", meaning: "Pick z = 0 for the point, cross for direction." },
    ],
    solvedProblems: [
      {
        id: "tf-m-lin-1",
        question: "Find the line of intersection of x + y + z = 6 and 2x − y + z = 3.",
        examBadge: "NEB 2077",
        given: "n₁ = (1,1,1), n₂ = (2,−1,1)",
        stepByStep: ["b = n₁×n₂ = (1·1−1·(−1), 1·2−1·1, 1·(−1)−1·2) = (2, 1, −3).", "Set z = 0: x + y = 6, 2x − y = 3 ⇒ x = 3, y = 3."],
        finalAnswer: "r = (3,3,0) + \\lambda(2,1,-3)",
        tipOrTrap: "z = 0 was free to choose — any convenient value works.",
      },
    ],
  },
  {
    id: "tf-math-12-lpp-formulation",
    slug: "linear-programming-formulation-of-lpp",
    title: "Linear Programming — Formulation of LPP",
    subject: "mathematics",
    unit: "Linear Programming",
    unitId: "linear-programming",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Optimization)",
    isExtra: true,
    statement:
      "An LPP optimizes (max/min) a linear objective function Z = ax + by subject to linear constraints (inequalities) and non-negativity x, y ≥ 0. Formulation: define variables, write Z, translate each resource restriction into an inequality, solve graphically — the optimum lies at a CORNER (vertex) of the feasible region.",
    coreFormula: "\\max Z = ax + by \\; \\text{s.t.} \\; a_i x + b_i y \\le c_i, \\; x, y \\ge 0",
    concernedTerms: [
      { term: "Objective function", symbol: "Z", units: "—", definition: "The linear quantity to maximize (profit) or minimize (cost)." },
      { term: "Feasible region", symbol: "—", units: "—", definition: "Intersection of all constraint half-planes — always a convex polygon." },
      { term: "Corner point theorem", symbol: "—", units: "—", definition: "Optimum of a linear function over a convex polygon occurs at a vertex." },
    ],
    assumptions: ["Linearity (no ×, ÷ between variables).", "Divisibility and certainty of resources (deterministic data)."],
    proofSteps: [
      { stepNumber: 1, title: "Define the variables", latex: "x = \\text{units of A}, \\; y = \\text{units of B}", explanation: "Clear definitions decide everything downstream — state units." },
      { stepNumber: 2, title: "Translate constraints", latex: "2x + y \\le 100 \\ (\\text{machine hours})", explanation: "Each resource: (rate per product) × (units) ≤ available — one inequality per resource." },
      { stepNumber: 3, title: "Graph and find vertices", latex: "\\text{solve pairs of boundary equations}", explanation: "Feasible region's corners come from intersecting constraint lines pairwise (plus axes)." },
      { stepNumber: 4, title: "Evaluate Z at every vertex", latex: "Z(\\text{vertex}_{max}) = \\text{answer}", explanation: "By the corner-point theorem, no interior point can beat the best vertex." },
    ],
    conclusion:
      "LPP turns business language into algebra: variables, one linear goal, linear limits — then convexity guarantees the answer hides at a corner, not in the middle.",
    keyTakeaways: [
      "Bounded feasible region ⇒ max AND min both exist at vertices.",
      "Unbounded region: max may not exist — check Z's behaviour outward.",
      "Integer answers may need rounding scrutiny (e.g. 3.7 buses).",
    ],
    examTraps: [
      "❌ Forgetting non-negativity — the first quadrant constraints are part of the region.",
      "❌ Testing Z only at 'obvious' vertices — test ALL of them.",
    ],
    visualType: "tv-lpp-formulation",
    specialCases: [
      { name: "Multiple optima", condition: "Z parallel to a constraint edge", formula: "\\text{whole edge optimal}", meaning: "Infinitely many solutions along that side." },
      { name: "Infeasible", condition: "Contradictory constraints", formula: "\\text{empty region}", meaning: "No point satisfies all — no solution exists." },
      { name: "Unbounded", condition: "Open region", formula: "Z \\to \\infty", meaning: "Check with a test point — max doesn't exist." },
    ],
    solvedProblems: [
      {
        id: "tf-m-lpp-1",
        question: "Max Z = 3x + 4y s.t. x + y ≤ 4, x, y ≥ 0. Find the optimum.",
        examBadge: "NEB Board",
        given: "corners (0,0), (4,0), (0,4)",
        stepByStep: ["Z(4,0) = 12; Z(0,4) = 16; Z(0,0) = 0."],
        finalAnswer: "Z_{max} = 16 \\text{ at } (0,4)",
        tipOrTrap: "With only one constraint, the axes' endpoints are the corners.",
      },
    ],
  },
  {
    id: "tf-math-12-bayes-theorem",
    slug: "bayes-theorem-and-its-applications",
    title: "Bayes' Theorem and Its Applications",
    subject: "mathematics",
    unit: "Probability",
    unitId: "probability",
    gradeTrack: "extra-grade-12",
    nebCode: "NEB Grade 12 (Probability)",
    isExtra: true,
    statement:
      "For a partition {E₁,…,Eₙ} of the sample space and event A with P(A) > 0: P(Eᵢ|A) = P(Eᵢ)P(A|Eᵢ) / Σ P(Eⱼ)P(A|Eⱼ). The denominator (total probability) spreads event A over all causes; the theorem reallocates belief among causes AFTER observing A.",
    coreFormula: "P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum_j P(E_j)P(A|E_j)}",
    concernedTerms: [
      { term: "Prior", symbol: "P(Eᵢ)", units: "—", definition: "Belief in cause Eᵢ before evidence." },
      { term: "Likelihood", symbol: "P(A|Eᵢ)", units: "—", definition: "Chance of the evidence if cause Eᵢ holds." },
      { term: "Posterior", symbol: "P(Eᵢ|A)", units: "—", definition: "Updated belief after seeing evidence — Bayes' output." },
    ],
    assumptions: ["The Eᵢ partition the space (mutually exclusive, exhaustive).", "P(A) > 0."],
    proofSteps: [
      { stepNumber: 1, title: "Definition of conditional probability", latex: "P(E_i|A) = \\frac{P(E_i \\cap A)}{P(A)}", explanation: "Restrict the world to A and ask which slice is Eᵢ." },
      { stepNumber: 2, title: "Expand numerator and denominator", latex: "P(E_i \\cap A) = P(E_i)P(A|E_i); \\; P(A) = \\sum_j P(E_j)P(A|E_j)", explanation: "Multiplication rule on top; total probability law below." },
      { stepNumber: 3, title: "Assemble", latex: "P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum_j P(E_j)P(A|E_j)}", explanation: "Bayes' theorem — the inversion formula from effects back to causes." },
    ],
    conclusion:
      "Bayes turns 'probability of evidence given cause' into 'probability of cause given evidence' — the mathematical engine of diagnosis, spam filters and every rational update of belief.",
    keyTakeaways: [
      "The denominator is P(A) — the total probability of the evidence over ALL causes.",
      "Posteriors sum to 1 across the partition.",
      "Sequential updating: yesterday's posterior is today's prior.",
    ],
    examTraps: [
      "❌ Swapping P(A|B) and P(B|A) — the prosecutor's fallacy.",
      "❌ Forgetting to normalize: posterior probabilities must total 1.",
    ],
    visualType: "tv-bayes-theorem",
    specialCases: [
      { name: "Two causes", condition: "Machine I/II production", formula: "\\text{classic 60/40 box problem}", meaning: "Defective item found — which machine?" },
      { name: "Medical test", condition: "Sensitivity/specificity", formula: "P(D|+) = \\frac{se\\cdot p}{se\\cdot p + f(1-p)}", meaning: "Low prevalence makes even good tests produce mostly false positives." },
      { name: "Base-rate neglect", condition: "Ignoring priors", formula: "\\text{posterior wrong without } P(E_i)", meaning: "The most common real-world error." },
    ],
    solvedProblems: [
      {
        id: "tf-m-bay-1",
        question: "Bag I (3 red, 4 black), Bag II (5 red, 6 black). A red ball is drawn from a random bag. P(Bag I|red)?",
        examBadge: "NEB 2078",
        given: "P(I) = P(II) = ½",
        stepByStep: ["P(red|I) = 3/7; P(red|II) = 5/11.", "P(red) = ½·3/7 + ½·5/11 = 3/14 + 5/22 = (33 + 35)/154 = 68/154 = 34/77.", "P(I|red) = (3/14)/(34/77) = (3/14)(77/34) = 231/476."],
        finalAnswer: "P(\\text{Bag I}\\mid\\text{red}) = \\frac{33}{68}",
        tipOrTrap: "Simplify carefully: 231/476 = 33/68 — always reduce.",
      },
    ],
  },
];

export const THEOREM_FILL_BIO_MATH = BM;
