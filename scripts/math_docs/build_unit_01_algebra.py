import sys
sys.path.insert(0, 'c:/Users/ASUS/Desktop/rn/scripts/math_docs')
import docx_styler

def build():
    doc = docx_styler.init_document()
    docx_styler.add_header_block(
        doc,
        unit_no=1,
        unit_name="Algebra",
        area_name="Content area 1 (Mat. 007)"
    )

    # ==========================================
    # 1.1 Logic and Set
    # ==========================================
    docx_styler.add_topic_heading(doc, "1.1", "Logic and Set")
    
    docx_styler.add_question(
        doc, 1,
        "Define a mathematical statement and distinguish between simple and compound statements.",
        "A statement (or proposition) is an assertive declarative sentence that is either strictly true (T) or strictly false (F), but not both simultaneously. Sentences expressing commands, exclamations, questions, or paradoxes (e.g., 'This statement is false') are not statements. A simple statement contains a single assertion without logical connectives (e.g., '7 is a prime number'). A compound statement is formed by combining two or more simple statements using logical connectives such as conjunction (AND), disjunction (OR), implication (IF...THEN), or biconditional (IF AND ONLY IF).",
        "Declarative with definite truth value (T or F, never both or ambiguous). Commands and questions are never statements."
    )

    docx_styler.add_question(
        doc, 2,
        "Define the core logical connectives (AND, OR, NOT, Conditional, Biconditional) with their truth conditions.",
        "1. Conjunction (p ∧ q): True ONLY when both p and q are True; False otherwise.\n"
        "2. Disjunction (p ∨ q): False ONLY when both p and q are False; True if at least one component is True.\n"
        "3. Negation (¬p or ~p): Reverses truth value (T becomes F, F becomes T).\n"
        "4. Conditional / Implication (p → q): False ONLY when the hypothesis p is True and the conclusion q is False ('Broken Promise'); True in all other cases (including when p is False, known as vacuously true).\n"
        "5. Biconditional (p ↔ q): True when both p and q share identical truth values (both T or both F); False when they differ.",
        "p ∧ q: T only if TT. p ∨ q: F only if FF. p → q: F only if T → F. p ↔ q: T only if both agree."
    )

    docx_styler.add_question(
        doc, 3,
        "What are tautology, contradiction, and contingency? Provide standard examples.",
        "A tautology is a compound statement that yields True for every possible truth assignment of its constituent variables (e.g., the law of excluded middle: p ∨ ¬p). A contradiction (or absurdity) yields False under all truth assignments (e.g., p ∧ ¬p). A contingency is a compound statement whose truth value depends on the assignments—it is True in at least one case and False in at least one case (e.g., p ∧ q or p → q).",
        "Always T = Tautology (symbol t). Always F = Contradiction (symbol c). Mixed = Contingency."
    )

    docx_styler.add_question(
        doc, 4,
        "State and explain De Morgan's Laws in mathematical logic and set theory.",
        "In logic: ¬(p ∧ q) ≡ ¬p ∨ ¬q and ¬(p ∨ q) ≡ ¬p ∧ ¬q. Conceptually: negating that 'both occur' means at least one fails; negating that 'at least one occurs' means both fail.\n"
        "In set theory: (A ∪ B)' = A' ∩ B' and (A ∩ B)' = A' ∪ B'. The complement of a union is the intersection of complements, and the complement of an intersection is the union of complements.",
        "Distribute the negation/complement and flip the operator: ∧ becomes ∨, ∪ becomes ∩."
    )

    docx_styler.add_question(
        doc, 5,
        "For the conditional statement p → q, define its converse, inverse, and contrapositive. Which are logically equivalent?",
        "Given the implication p → q (If p then q):\n"
        "• Converse: q → p (If q then p)\n"
        "• Inverse: ¬p → ¬q (If not p then not q)\n"
        "• Contrapositive: ¬q → ¬p (If not q then not p)\n"
        "Crucial equivalence theorem: The original implication p → q is logically equivalent to its contrapositive (p → q ≡ ¬q → ¬p). The converse and inverse are also logically equivalent to each other (q → p ≡ ¬p → ¬q), but neither is equivalent to the original conditional.",
        "Original ≡ Contrapositive (p → q ≡ ¬q → ¬p). Proving the contrapositive is an indispensable proof technique."
    )

    docx_styler.add_question(
        doc, 6,
        "Explain universal and existential quantifiers with negations.",
        "The universal quantifier ∀ ('for all' / 'for every') asserts that an open sentence P(x) holds for every element in the domain. The existential quantifier ∃ ('there exists') asserts that P(x) holds for at least one element.\n"
        "Negation rule: ¬(∀x P(x)) ≡ ∃x ¬P(x) (to disprove a universal claim, a single counterexample suffices). ¬(∃x P(x)) ≡ ∀x ¬P(x) (denying existence means the property fails for every single element).",
        "Negating ∀ gives ∃ with negated predicate; negating ∃ gives ∀ with negated predicate."
    )

    docx_styler.add_question(
        doc, 7,
        "State fundamental set identities and the principle of inclusion-exclusion for three sets.",
        "Key identities:\n"
        "1. Idempotent: A ∪ A = A, A ∩ A = A.\n"
        "2. Distributive: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C); A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C).\n"
        "3. Difference: A - B = A ∩ B'.\n"
        "Principle of Inclusion-Exclusion:\n"
        "• Two sets: n(A ∪ B) = n(A) + n(B) - n(A ∩ B).\n"
        "• Three sets: n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - [n(A ∩ B) + n(B ∩ C) + n(C ∩ A)] + n(A ∩ B ∩ C).",
        "Add singletons, subtract pairwise intersections, add back triple intersection."
    )

    docx_styler.add_question(
        doc, 8,
        "Define an equivalence relation on a set and provide a standard mathematical example.",
        "A relation R on a set A is an equivalence relation if and only if it satisfies three axioms:\n"
        "1. Reflexive: (a, a) ∈ R for all a ∈ A.\n"
        "2. Symmetric: (a, b) ∈ R ⇒ (b, a) ∈ R for all a, b ∈ A.\n"
        "3. Transitive: (a, b) ∈ R and (b, c) ∈ R ⇒ (a, c) ∈ R for all a, b, c ∈ A.\n"
        "Standard Example: Congruence modulo m on integers ℤ: a ≡ b (mod m) iff m divides (a - b). An equivalence relation partitions the set into disjoint equivalence classes.",
        "R-S-T: Reflexive (a~a), Symmetric (a~b ⇒ b~a), Transitive (a~b & b~c ⇒ a~c)."
    )

    docx_styler.add_compare_section_header(doc, "1.1", "Logic and Set")
    docx_styler.add_compare_table(
        doc, "Truth Table Analysis of Core Logical Connectives",
        ["p", "q", "¬p", "p ∧ q", "p ∨ q", "p → q", "p ↔ q"],
        [
            ["T", "T", "F", "T", "T", "T", "T"],
            ["T", "F", "F", "F", "T", "F", "F"],
            ["F", "T", "T", "F", "T", "T", "F"],
            ["F", "F", "T", "F", "F", "T", "T"]
        ]
    )
    docx_styler.add_compare_table(
        doc, "Comparison of Implication Variations",
        ["Statement Form", "Symbolic Form", "Truth Value relative to p → q", "Status"],
        [
            ["Conditional", "p → q", "Baseline truth profile", "Original"],
            ["Contrapositive", "¬q → ¬p", "Identical in every case", "Logically Equivalent to Conditional"],
            ["Converse", "q → p", "Differs in TF and FT rows", "NOT Equivalent to Conditional"],
            ["Inverse", "¬p → ¬q", "Differs in TF and FT rows", "Logically Equivalent to Converse"]
        ]
    )

    # ==========================================
    # 1.2 Real Numbers
    # ==========================================
    docx_styler.add_topic_heading(doc, "1.2", "Real Numbers")

    docx_styler.add_question(
        doc, 9,
        "Classify real numbers and explain the completeness axiom of the real number system.",
        "The set of real numbers ℝ consists of rational numbers ℚ (quotients p/q with p,q ∈ ℤ, q ≠ 0, having terminating or repeating decimals) and irrational numbers ℚ' (non-terminating, non-repeating decimals such as √2, π, e). The Completeness Axiom (Dedekind completeness): Every non-empty subset of ℝ that is bounded above has a least upper bound (supremum) in ℝ. This property separates ℝ from ℚ (for example, the set {x ∈ ℚ : x² < 2} is bounded above in ℚ, but has no supremum in ℚ because √2 ∉ ℚ).",
        "ℝ = Rationals (periodic decimals) ∪ Irrationals. Completeness guarantees no holes on the real line."
    )

    docx_styler.add_question(
        doc, 10,
        "Define bounded sets, supremum (least upper bound), and infimum (greatest lower bound).",
        "Let S ⊆ ℝ. A number M is an upper bound of S if x ≤ M for all x ∈ S. If the set of all upper bounds has a smallest element, that element is the supremum: sup(S) = M.\n"
        "Formally: M = sup(S) iff (i) x ≤ M for all x ∈ S, and (ii) for every ε > 0, there exists x ∈ S such that x > M - ε.\n"
        "Similarly, m is a lower bound if m ≤ x for all x ∈ S. The greatest lower bound is the infimum: inf(S) = m. If m = inf(S), then for any ε > 0, there exists x ∈ S such that x < m + ε.",
        "Supremum = smallest ceiling; Infimum = greatest floor. They need not belong to the set (e.g., for (0, 1), inf=0, sup=1)."
    )

    docx_styler.add_question(
        doc, 11,
        "State the Archimedean property of real numbers and explain its significance.",
        "Archimedean Property: If x and y are positive real numbers, there exists a natural number n ∈ ℕ such that n·x > y.\n"
        "Equivalent formulation: For every real number x, there exists an integer n such that n > x; and for every ε > 0, there exists n ∈ ℕ such that 1/n < ε. Significance: There are no infinitely large or infinitely small (non-zero) real numbers in ℝ.",
        "No matter how small x > 0 is, adding it enough times exceeds any bound y; 1/n can be made arbitrarily close to 0."
    )

    docx_styler.add_question(
        doc, 12,
        "Define absolute value and prove the Triangle Inequality |x + y| ≤ |x| + |y|.",
        "Definition: |x| = x if x ≥ 0, and -x if x < 0. Key properties: |x| ≥ 0; |x|² = x²; -|x| ≤ x ≤ |x|.\n"
        "Proof of Triangle Inequality:\n"
        "-|x| ≤ x ≤ |x| and -|y| ≤ y ≤ |y|.\n"
        "Adding inequalities: -(|x| + |y|) ≤ x + y ≤ (|x| + |y|).\n"
        "By the property -k ≤ z ≤ k ⇔ |z| ≤ k, setting z = x + y and k = |x| + |y| yields |x + y| ≤ |x| + |y|.\n"
        "Corollary (Reverse Triangle Inequality): ||x| - |y|| ≤ |x - y|.",
        "|x+y| ≤ |x| + |y|. Equality holds if and only if x and y have the same sign (xy ≥ 0)."
    )

    docx_styler.add_question(
        doc, 13,
        "Solve the inequality |2x - 5| ≤ 7 and represent the solution on the real line and in interval notation.",
        "Using the fundamental equivalence |u| ≤ k ⇔ -k ≤ u ≤ k (for k ≥ 0):\n"
        "-7 ≤ 2x - 5 ≤ 7\n"
        "Add 5 across all three parts: -2 ≤ 2x ≤ 12\n"
        "Divide by 2: -1 ≤ x ≤ 6.\n"
        "Interval notation: x ∈ [-1, 6]. Geometrically: a solid closed line segment between -1 and 6 inclusive.",
        "|u| ≤ k ⇔ -k ≤ u ≤ k. For |u| ≥ k ⇔ u ≤ -k or u ≥ k."
    )

    docx_styler.add_compare_section_header(doc, "1.2", "Real Numbers")
    docx_styler.add_compare_table(
        doc, "Classification of Real Intervals and Their Notations",
        ["Interval Type", "Set-Builder Notation", "Interval Notation", "Boundedness", "Endpoints Inclusion"],
        [
            ["Open Interval", "{x ∈ ℝ : a < x < b}", "(a, b)", "Bounded", "Neither a nor b included"],
            ["Closed Interval", "{x ∈ ℝ : a ≤ x ≤ b}", "[a, b]", "Bounded", "Both a and b included"],
            ["Half-Open (Left)", "{x ∈ ℝ : a < x ≤ b}", "(a, b]", "Bounded", "b included, a excluded"],
            ["Half-Open (Right)", "{x ∈ ℝ : a ≤ x < b}", "[a, b)", "Bounded", "a included, b excluded"],
            ["Unbounded Ray", "{x ∈ ℝ : x ≥ a}", "[a, ∞)", "Unbounded above", "a included"],
            ["Full Real Line", "{x ∈ ℝ : -∞ < x < ∞}", "(-∞, ∞) or ℝ", "Unbounded", "No endpoints"]
        ]
    )

    # ==========================================
    # 1.3 Functions
    # ==========================================
    docx_styler.add_topic_heading(doc, "1.3", "Functions")

    docx_styler.add_question(
        doc, 14,
        "Define a function and explain the vertical line test.",
        "A function f: A → B is a relation that associates each element x ∈ A with a UNIQUE element y ∈ B, written y = f(x). A is the domain, B is the codomain, and the set of actual outputs {f(x) : x ∈ A} is the range (range ⊆ codomain).\n"
        "Vertical Line Test: A curve in the xy-plane represents the graph of a function y = f(x) if and only if no vertical line intersects the curve at more than one point. If any vertical line intersects more than once, a single x-value maps to multiple y-values, violating single-valuedness.",
        "Every input has exactly one output. Vertical line cuts at most once ⇒ valid function."
    )

    docx_styler.add_question(
        doc, 15,
        "Distinguish between injective (one-to-one), surjective (onto), and bijective functions.",
        "1. Injective (One-to-One): Different inputs produce different outputs: f(x₁) = f(x₂) ⇒ x₁ = x₂. Geometrically, it passes the Horizontal Line Test (no horizontal line intersects the graph more than once).\n"
        "2. Surjective (Onto): Every element in the codomain is mapped to: Range(f) = Codomain B. For every y ∈ B, there exists x ∈ A with f(x) = y.\n"
        "3. Bijective (One-to-One & Onto): Both injective and surjective. A bijective function establishes a perfect 1-to-1 correspondence between sets A and B, which is the necessary and sufficient condition for the inverse function f⁻¹ to exist.",
        "Injective: no two x share a y. Surjective: no y is left out. Bijective: invertible."
    )

    docx_styler.add_question(
        doc, 16,
        "Explain composite functions and state the condition for (f ∘ g)(x) to be defined.",
        "Given g: A → B and f: B → C, the composite function f ∘ g: A → C is defined by (f ∘ g)(x) = f(g(x)).\n"
        "Crucial existence condition: (f ∘ g)(x) is defined if and only if the Range of g is a subset of the Domain of f (Range(g) ⊆ Domain(f)).\n"
        "Properties:\n"
        "• Composition is associative: f ∘ (g ∘ h) = (f ∘ g) ∘ h.\n"
        "• Composition is generally NOT commutative: f ∘ g ≠ g ∘ f.",
        "(f ∘ g)(x) = f(g(x)). Work inside-out: g acts first, f acts second."
    )

    docx_styler.add_question(
        doc, 17,
        "Define odd and even functions with algebraic tests and geometric symmetries.",
        "• Even Function: f(-x) = f(x) for all x in the domain. The graph is symmetric with respect to the y-axis (e.g., f(x) = x², cos x, |x|).\n"
        "• Odd Function: f(-x) = -f(x) for all x in the domain. The graph has rotational point symmetry about the origin (e.g., f(x) = x³, sin x, 1/x).\n"
        "Note: Many functions are neither even nor odd (e.g., eˣ, x + 1). Every function f(x) on a symmetric domain can be decomposed uniquely into an even and odd part: f(x) = [f(x) + f(-x)]/2 + [f(x) - f(-x)]/2.",
        "Even: f(-x) = f(x) (reflection in y-axis). Odd: f(-x) = -f(x) (180° rotation about origin)."
    )

    docx_styler.add_question(
        doc, 18,
        "Find the domain and range of f(x) = √(9 - x²).",
        "Domain: The radicand must be non-negative: 9 - x² ≥ 0 ⇒ x² ≤ 9 ⇒ -3 ≤ x ≤ 3. Thus, Domain = [-3, 3].\n"
        "Range: For x ∈ [-3, 3], x² ranges from 0 to 9. Therefore, 9 - x² ranges from 9 down to 0, and √(9 - x²) ranges from √0 = 0 up to √9 = 3. Thus, Range = [0, 3]. Geometrically, this is the upper semi-circle of radius 3 centered at the origin.",
        "Inside square root ≥ 0. Principal square root is always non-negative: [0, 3]."
    )

    docx_styler.add_compare_section_header(doc, "1.3", "Functions")
    docx_styler.add_compare_table(
        doc, "Comparison of Function Mappings",
        ["Classification", "Formal Condition", "Geometric Test", "Range vs Codomain", "Invertibility"],
        [
            ["Injective (1-to-1)", "f(x₁)=f(x₂) ⇒ x₁=x₂", "Horizontal line test: ≤ 1 cut", "Range ⊆ Codomain", "Has left inverse only"],
            ["Surjective (Onto)", "∀y∈B, ∃x∈A : f(x)=y", "Every horizontal line y∈B cuts ≥ 1", "Range = Codomain", "Has right inverse only"],
            ["Bijective", "Both 1-to-1 and onto", "Every horizontal line y∈B cuts exactly once", "Range = Codomain", "Strictly Invertible (f⁻¹ exists)"]
        ]
    )

    # ==========================================
    # 1.4 Curve Sketching
    # ==========================================
    docx_styler.add_topic_heading(doc, "1.4", "Curve Sketching")

    docx_styler.add_question(
        doc, 19,
        "Explain the systematic checklist for sketching algebraic and rational curves.",
        "A rigorous curve sketching procedure includes:\n"
        "1. Domain: Find valid x-values (avoid division by 0, negative radicands).\n"
        "2. Intercepts: x-intercepts (set y = 0), y-intercept (set x = 0).\n"
        "3. Symmetry: f(-x) = f(x) (symmetric about y-axis); f(-x) = -f(x) (symmetric about origin); x = f(y) symmetries.\n"
        "4. Asymptotes: Vertical asymptotes (zeros of denominator), Horizontal asymptotes (lim x→±∞ f(x)), Oblique asymptotes.\n"
        "5. First Derivative f'(x): Critical points, intervals of increase (f' > 0) and decrease (f' < 0), local extrema.\n"
        "6. Second Derivative f''(x): Concavity (f'' > 0 concave up, f'' < 0 concave down) and points of inflection.\n"
        "7. Behavior at boundaries / sign chart.",
        "DISCA: Domain, Intercepts, Symmetry, Asymptotes, Calculus (extrema & inflection)."
    )

    docx_styler.add_question(
        doc, 20,
        "Define horizontal, vertical, and oblique (slant) asymptotes with analytic tests.",
        "• Vertical Asymptote: Line x = a is a vertical asymptote if lim x→a⁺ f(x) = ±∞ or lim x→a⁻ f(x) = ±∞ (typically where the reduced denominator equals zero).\n"
        "• Horizontal Asymptote: Line y = L is a horizontal asymptote if lim x→∞ f(x) = L or lim x→-∞ f(x) = L (occurs for rational functions when deg(numerator) ≤ deg(denominator)).\n"
        "• Oblique (Slant) Asymptote: Line y = mx + c is an oblique asymptote if lim x→±∞ [f(x) - (mx + c)] = 0. Occurs in rational functions when deg(numerator) = deg(denominator) + 1; found by polynomial long division.",
        "Vertical: denominator zeros. Horizontal: limits at ±∞. Slant: quotient from long division when top degree is 1 higher."
    )

    docx_styler.add_compare_section_header(doc, "1.4", "Curve Sketching")
    docx_styler.add_compare_table(
        doc, "Types of Asymptotes for Rational Functions P(x)/Q(x)",
        ["Asymptote Type", "Condition on Degrees", "Equation / Finding Method", "Can Curve Cross It?"],
        [
            ["Vertical", "Q(a) = 0 and P(a) ≠ 0", "x = a", "NEVER (function undefined at x=a)"],
            ["Horizontal", "deg(P) < deg(Q)", "y = 0 (x-axis)", "YES, at finite points"],
            ["Horizontal", "deg(P) = deg(Q)", "y = (leading coeff P) / (leading coeff Q)", "YES, at finite points"],
            ["Oblique (Slant)", "deg(P) = deg(Q) + 1", "y = quotient mx + c from P(x)/Q(x)", "YES, at finite points"]
        ]
    )

    # ==========================================
    # 1.5 Sequence and Series
    # ==========================================
    docx_styler.add_topic_heading(doc, "1.5", "Sequence and Series")

    docx_styler.add_question(
        doc, 21,
        "Define Arithmetic Progression (AP), its nth term, sum of n terms, and arithmetic mean.",
        "An AP is a sequence where each term after the first is formed by adding a constant common difference d: aₙ = aₙ₋₁ + d.\n"
        "• nth term: Tₙ = a + (n - 1)d.\n"
        "• Sum of first n terms: Sₙ = n/2 [2a + (n - 1)d] = n/2 [a + l], where l = Tₙ is the last term.\n"
        "• Arithmetic Mean (AM): Between two numbers a and b, AM = (a + b)/2. If n AMs (A₁, A₂, ..., Aₙ) are inserted between a and b, the common difference is d = (b - a)/(n + 1), and the k-th mean is Aₖ = a + k(b - a)/(n + 1).",
        "Constant difference d. Sₙ = n/2 (first + last). Sum of n inserted AMs = n × (a + b)/2."
    )

    docx_styler.add_question(
        doc, 22,
        "Define Geometric Progression (GP), its nth term, finite sum, infinite sum, and geometric mean.",
        "A GP has a constant common ratio r: aₙ = r · aₙ₋₁.\n"
        "• nth term: Tₙ = a · rⁿ⁻¹.\n"
        "• Sum of first n terms: Sₙ = a(1 - rⁿ)/(1 - r) = a(rⁿ - 1)/(r - 1) for r ≠ 1. If r = 1, Sₙ = na.\n"
        "• Sum to infinity (S∞): If and only if |r| < 1, the term rⁿ → 0 as n → ∞. Therefore, S∞ = lim n→∞ Sₙ = a/(1 - r). If |r| ≥ 1, the series diverges.\n"
        "• Geometric Mean (GM): Between positive numbers a and b, GM = √(ab). For n inserted GMs, r = (b/a)^(1/(n+1)).",
        "Constant ratio r. S∞ = a/(1 - r) requires |r| < 1 strictly. If |r| ≥ 1, no finite sum to infinity."
    )

    docx_styler.add_question(
        doc, 23,
        "Define Harmonic Progression (HP) and state the relationship between AM, GM, and HM.",
        "A sequence {aₙ} is a Harmonic Progression if the sequence of its reciprocals {1/aₙ} forms an Arithmetic Progression. An HP has no general simple sum formula.\n"
        "Harmonic Mean (HM) between two positive numbers a and b:\n"
        "1/H = (1/a + 1/b)/2 = (a + b)/(2ab) ⇒ H = 2ab/(a + b).\n"
        "Fundamental Relations for two positive unequal real numbers a and b:\n"
        "1. G² = A · H (The geometric mean is the geometric mean of AM and HM!)\n"
        "2. A > G > H (AM is strictly greater than GM, which is strictly greater than HM; equality A = G = H holds if and only if a = b).",
        "G² = A · H and A ≥ G ≥ H. Equality holds iff all terms are equal."
    )

    docx_styler.add_question(
        doc, 24,
        "State and derive the sums of the first n natural numbers, their squares, and their cubes.",
        "1. Sum of first n natural numbers: ∑ k = 1 + 2 + ... + n = n(n + 1)/2.\n"
        "2. Sum of squares: ∑ k² = 1² + 2² + ... + n² = n(n + 1)(2n + 1)/6.\n"
        "   Derivation idea: Use the telescoping identity (k + 1)³ - k³ = 3k² + 3k + 1 and sum from k = 1 to n.\n"
        "3. Sum of cubes: ∑ k³ = 1³ + 2³ + ... + n³ = [n(n + 1)/2]² = (∑ k)².\n"
        "Fascinating relation: The sum of the first n cubes is the exact square of the sum of the first n natural numbers!",
        "∑ k = n(n+1)/2. ∑ k² = n(n+1)(2n+1)/6. ∑ k³ = [n(n+1)/2]² = (∑ k)²."
    )

    docx_styler.add_compare_section_header(doc, "1.5", "Sequence and Series")
    docx_styler.add_compare_table(
        doc, "Comparison of Progressions: AP vs GP vs HP",
        ["Feature", "Arithmetic (AP)", "Geometric (GP)", "Harmonic (HP)"],
        [
            ["Defining Rule", "Difference: aₙ - aₙ₋₁ = d", "Ratio: aₙ / aₙ₋₁ = r", "Reciprocals 1/aₙ are in AP"],
            ["nth Term (Tₙ)", "a + (n - 1)d", "a · rⁿ⁻¹", "1 / [1/a + (n - 1)d']"],
            ["Mean between a & b", "A = (a + b)/2", "G = √(ab)", "H = 2ab/(a + b)"],
            ["Sum of n Terms", "n/2 [2a + (n-1)d]", "a(rⁿ - 1)/(r - 1)", "No simple closed algebraic form"],
            ["Infinite Sum", "Diverges (unless all 0)", "S∞ = a/(1 - r) for |r| < 1", "Diverges"]
        ]
    )

    # ==========================================
    # 1.6 Matrices and Determinants
    # ==========================================
    docx_styler.add_topic_heading(doc, "1.6", "Matrices and Determinants")

    docx_styler.add_question(
        doc, 25,
        "Define transpose of a matrix, symmetric matrix, skew-symmetric matrix, and orthogonal matrix.",
        "• Transpose (Aᵀ): Formed by interchanging rows and columns: (Aᵀ)ᵢⱼ = Aⱼᵢ. Properties: (Aᵀ)ᵀ = A, (A + B)ᵀ = Aᵀ + Bᵀ, (AB)ᵀ = BᵀAᵀ (reversal law!).\n"
        "• Symmetric: A square matrix where Aᵀ = A (aᵢⱼ = aⱼᵢ).\n"
        "• Skew-Symmetric: A square matrix where Aᵀ = -A (aᵢⱼ = -aⱼᵢ). Notice that for diagonal elements, aᵢᵢ = -aᵢᵢ ⇒ 2aᵢᵢ = 0 ⇒ aᵢᵢ = 0. All main diagonal entries MUST be zero!\n"
        "• Orthogonal Matrix: A square matrix satisfying A · Aᵀ = Aᵀ · A = I, meaning A⁻¹ = Aᵀ.",
        "(AB)ᵀ = BᵀAᵀ. Skew-symmetric: Aᵀ = -A and all diagonal elements are 0. Orthogonal: A⁻¹ = Aᵀ."
    )

    docx_styler.add_question(
        doc, 26,
        "Define minor, cofactor, and adjoint of a square matrix.",
        "• Minor (Mᵢⱼ): The determinant of the submatrix of order (n - 1) obtained by deleting the i-th row and j-th column of A.\n"
        "• Cofactor (Cᵢⱼ): The signed minor: Cᵢⱼ = (-1)ᶦ⁺ʲ · Mᵢⱼ. The sign follows the checkerboard pattern (+ - +; - + -; ...).\n"
        "• Adjoint (adj A): The transpose of the matrix of cofactors: adj(A) = [Cᵢⱼ]ᵀ. Crucial property: A · adj(A) = adj(A) · A = |A| · I.",
        "Cofactor = (-1)ᶦ⁺ʲ × Minor. Adjoint is the TRANSPOSE of the cofactor matrix. A · adj(A) = |A| I."
    )

    docx_styler.add_question(
        doc, 27,
        "Explain matrix inversion and the necessary and sufficient condition for invertibility.",
        "The inverse of a square matrix A is a matrix A⁻¹ such that A · A⁻¹ = A⁻¹ · A = I.\n"
        "Formula: A⁻¹ = (1/|A|) · adj(A).\n"
        "Condition: A⁻¹ exists if and only if |A| ≠ 0 (i.e., A is a non-singular matrix). If |A| = 0, the matrix is singular and has no multiplicative inverse.\n"
        "Properties:\n"
        "1. (A⁻¹)⁻¹ = A\n"
        "2. (AB)⁻¹ = B⁻¹ A⁻¹ (reversal law)\n"
        "3. (Aᵀ)⁻¹ = (A⁻¹)ᵀ\n"
        "4. |A⁻¹| = 1/|A|.",
        "A⁻¹ = (1/|A|) adj(A). Requires |A| ≠ 0. Non-singular = invertible. Reversal law: (AB)⁻¹ = B⁻¹A⁻¹."
    )

    docx_styler.add_question(
        doc, 28,
        "State essential properties of determinants that simplify evaluation.",
        "1. Reflection: |Aᵀ| = |A| (rows and columns are interchangeable without changing the value).\n"
        "2. Row/Column Swap: Interchanging any two rows (or two columns) changes the sign of the determinant: |A'| = -|A|.\n"
        "3. Identical/Proportional: If two rows (or columns) are identical or proportional, |A| = 0.\n"
        "4. Zero Line: If all elements of any row or column are 0, |A| = 0.\n"
        "5. Scalar Multiplication: Multiplying a single row by k multiplies the determinant by k. (For an n×n matrix, |k A| = kⁿ |A|!).\n"
        "6. Invariance: Adding a scalar multiple of one row to another row leaves the determinant unchanged: Rᵢ → Rᵢ + k Rⱼ does not alter |A|.\n"
        "7. Multiplicative: |AB| = |A| · |B|.",
        "|kA| = kⁿ |A| for n×n matrix! Row operations Rᵢ → Rᵢ + k Rⱼ preserve the determinant value."
    )

    docx_styler.add_question(
        doc, 29,
        "Explain Cramer's Rule for solving a 3×3 system of linear equations and state conditions for consistency.",
        "Consider the system:\n"
        "a₁x + b₁y + c₁z = d₁\n"
        "a₂x + b₂y + c₂z = d₂\n"
        "a₃x + b₃y + c₃z = d₃\n"
        "Let D = det[coefficients], Dₓ = det[replace x-column with constants d], Dᵧ = det[replace y-column], D_z = det[replace z-column].\n"
        "By Cramer's Rule: x = Dₓ/D, y = Dᵧ/D, z = D_z/D.\n"
        "Consistency conditions:\n"
        "• Case 1: D ≠ 0 ⇒ Unique solution (consistent and independent).\n"
        "• Case 2: D = 0 and at least one of Dₓ, Dᵧ, D_z ≠ 0 ⇒ No solution (inconsistent).\n"
        "• Case 3: D = Dₓ = Dᵧ = D_z = 0 ⇒ Infinitely many solutions (consistent and dependent) or no solution.",
        "x = Dₓ/D, y = Dᵧ/D, z = D_z/D. D ≠ 0 guarantees unique solution."
    )

    docx_styler.add_compare_section_header(doc, "1.6", "Matrices and Determinants")
    docx_styler.add_compare_table(
        doc, "Matrix vs Determinant: Core Conceptual Differences",
        ["Attribute", "Matrix", "Determinant"],
        [
            ["Nature", "A rectangular array of numbers / linear transformation", "A single scalar value computed from a square matrix"],
            ["Dimensions", "Can be m × n (any rectangular dimensions)", "Must be n × n (strictly square)"],
            ["Enclosure", "Enclosed in brackets [ ] or ( )", "Enclosed in vertical bars | |"],
            ["Scalar Multiple", "k · A multiplies EVERY entry in the matrix", "k · |A| multiplies entries of only ONE row or column"],
            ["Value", "Has no single numerical value", "Evaluates to a specific real or complex number"]
        ]
    )

    # ==========================================
    # 1.7 Quadratic Equations
    # ==========================================
    docx_styler.add_topic_heading(doc, "1.7", "Quadratic Equations")

    docx_styler.add_question(
        doc, 30,
        "State the quadratic formula and explain how the discriminant determines the nature of roots.",
        "For ax² + bx + c = 0 (a ≠ 0), the roots are given by x = [-b ± √(b² - 4ac)] / (2a).\n"
        "The discriminant D = b² - 4ac governs the nature of the roots:\n"
        "1. D > 0: Two distinct real roots. (If a, b, c ∈ ℚ and D is a perfect square, roots are rational; if D is not a perfect square, roots are irrational conjugate surds p ± √q).\n"
        "2. D = 0: Two real and equal (coincident) roots: x = -b/(2a). The quadratic expression is a perfect square: ax² + bx + c = a[x + b/(2a)]².\n"
        "3. D < 0: No real roots; two distinct complex conjugate roots: p ± i q.",
        "D > 0: real & unequal. D = 0: real & equal. D < 0: imaginary conjugate pairs."
    )

    docx_styler.add_question(
        doc, 31,
        "State the relations between roots and coefficients and construct equations from transformed roots.",
        "If α and β are the roots of ax² + bx + c = 0:\n"
        "• Sum of roots: S = α + β = -b/a\n"
        "• Product of roots: P = αβ = c/a\n"
        "• Quadratic equation form: x² - (α + β)x + αβ = 0 ⇔ x² - S x + P = 0.\n"
        "Useful Symmetric Expressions:\n"
        "• α² + β² = (α + β)² - 2αβ = S² - 2P\n"
        "• (α - β)² = (α + β)² - 4αβ = S² - 4P ⇒ |α - β| = √(D)/|a|\n"
        "• α³ + β³ = (α + β)³ - 3αβ(α + β) = S³ - 3PS.",
        "x² - (Sum)x + (Product) = 0. |α - β| = √(b² - 4ac) / |a|."
    )

    docx_styler.add_question(
        doc, 32,
        "Derive the condition for two quadratic equations to have a common root.",
        "Let the two equations be a₁x² + b₁x + c₁ = 0 and a₂x² + b₂x + c₂ = 0. Let α be the common root.\n"
        "Then: a₁α² + b₁α + c₁ = 0 and a₂α² + b₂α + c₂ = 0.\n"
        "By cross-multiplication:\n"
        "α² / (b₁c₂ - b₂c₁) = α / (c₁a₂ - c₂a₁) = 1 / (a₁b₂ - a₂b₁).\n"
        "Equating α: α = (c₁a₂ - c₂a₁) / (a₁b₂ - a₂b₁) and α² = (b₁c₂ - b₂c₁) / (a₁b₂ - a₂b₁).\n"
        "Eliminating α by equating α² = (α)²:\n"
        "(c₁a₂ - c₂a₁)² = (a₁b₂ - a₂b₁)(b₁c₂ - b₂c₁).\n"
        "Condition for BOTH roots to be common: a₁/a₂ = b₁/b₂ = c₁/c₂.",
        "One common root: (c₁a₂ - c₂a₁)² = (a₁b₂ - a₂b₁)(b₁c₂ - b₂c₁). Both roots common: proportional coefficients."
    )

    docx_styler.add_compare_section_header(doc, "1.7", "Quadratic Equations")
    docx_styler.add_compare_table(
        doc, "Nature of Roots of ax² + bx + c = 0 based on Discriminant D = b² - 4ac",
        ["Discriminant D", "Nature of Roots", "Geometry (y = ax² + bx + c)", "Rationality (if a,b,c ∈ ℚ)"],
        [
            ["D > 0, perfect square", "Real, unequal, rational", "Crosses x-axis at 2 distinct points", "Rational"],
            ["D > 0, not perfect square", "Real, unequal, irrational", "Crosses x-axis at 2 distinct points", "Conjugate surds p ± √q"],
            ["D = 0", "Real and equal (repeated)", "Touches x-axis at exactly 1 vertex point", "Rational"],
            ["D < 0", "Complex conjugate pair", "Does not intersect x-axis (entirely above or below)", "Conjugate complex p ± i q"]
        ]
    )

    # ==========================================
    # 1.8 Complex Numbers
    # ==========================================
    docx_styler.add_topic_heading(doc, "1.8", "Complex Numbers")

    docx_styler.add_question(
        doc, 33,
        "Define the imaginary unit i, its integral powers, and the algebra of complex numbers.",
        "The imaginary unit i satisfies i² = -1. Integral powers cycle modulo 4: i¹ = i, i² = -1, i³ = -i, i⁴ = 1; generally i⁴ᵏ⁺ʳ = iʳ.\n"
        "A complex number is written z = a + ib where a, b ∈ ℝ; a = Re(z) (real part), b = Im(z) (imaginary part).\n"
        "Operations:\n"
        "• Addition: (a + ib) + (c + id) = (a + c) + i(b + d)\n"
        "• Multiplication: (a + ib)(c + id) = (ac - bd) + i(ad + bc)\n"
        "• Division: Multiply numerator and denominator by conjugate (c - id): (a + ib)/(c + id) = [(ac + bd) + i(bc - ad)] / (c² + d²).",
        "i⁴ⁿ = 1, i⁴ⁿ⁺¹ = i, i⁴ⁿ⁺² = -1, i⁴ⁿ⁺³ = -i. Realize division by multiplying by conjugate."
    )

    docx_styler.add_question(
        doc, 34,
        "Define the complex conjugate, modulus, and principal argument with their properties.",
        "For z = a + ib:\n"
        "• Complex Conjugate: z̄ = a - ib. Key property: z · z̄ = a² + b² = |z|².\n"
        "• Modulus: |z| = √(a² + b²), representing the Euclidean distance from the origin in the Argand plane. Properties: |z₁z₂| = |z₁||z₂|; |z₁/z₂| = |z₁|/|z₂|; |z| = |z̄| = |-z|.\n"
        "• Argument (Amplitude): θ = arg(z), the directed angle from the positive real axis. Principal argument Arg(z) ∈ (-π, π]. Computed via reference angle α = arctan(|b|/|a|):\n"
        "  - Quad I: θ = α\n"
        "  - Quad II: θ = π - α\n"
        "  - Quad III: θ = -(π - α) = α - π\n"
        "  - Quad IV: θ = -α.",
        "z · z̄ = |z|². |z₁z₂| = |z₁||z₂|. Principal argument strictly in (-π, π]."
    )

    docx_styler.add_question(
        doc, 35,
        "State polar form, Euler's formula, and De Moivre's Theorem.",
        "• Polar Form: z = r(cos θ + i sin θ), where r = |z| and θ = arg(z).\n"
        "• Euler's Formula: e^(iθ) = cos θ + i sin θ. Hence z = r e^(iθ).\n"
        "• De Moivre's Theorem: For any integer n:\n"
        "  [r(cos θ + i sin θ)]ⁿ = rⁿ (cos nθ + i sin nθ).\n"
        "  For rational index p/q, the q values of z^(1/q) are given by r^(1/q) [cos((θ + 2kπ)/q) + i sin((θ + 2kπ)/q)] for k = 0, 1, ..., q - 1.",
        "Multiplying complex numbers: multiply moduli, add arguments! De Moivre: angle multiplies by power n."
    )

    docx_styler.add_question(
        doc, 36,
        "Find the cube roots of unity and state their algebraic properties.",
        "Solve z³ = 1 = cos 0 + i sin 0. By De Moivre's Theorem, z = cos(2kπ/3) + i sin(2kπ/3) for k = 0, 1, 2:\n"
        "• k = 0: 1\n"
        "• k = 1: ω = cos(2π/3) + i sin(2π/3) = -1/2 + i √3/2\n"
        "• k = 2: ω² = cos(4π/3) + i sin(4π/3) = -1/2 - i √3/2.\n"
        "Fundamental Properties:\n"
        "1. 1 + ω + ω² = 0 (sum of roots is zero)\n"
        "2. ω³ = 1 (cyclic with period 3: ω³ⁿ = 1, ω³ⁿ⁺¹ = ω, ω³ⁿ⁺² = ω²)\n"
        "3. (ω)̄ = ω² and (ω²)̄ = ω\n"
        "4. In the Argand diagram, 1, ω, ω² form an equilateral triangle inscribed in the unit circle.",
        "Cube roots of unity: 1, ω, ω². Master identities: 1 + ω + ω² = 0 and ω³ = 1."
    )

    docx_styler.add_question(
        doc, 37,
        "Find the square roots of the complex number z = -1 + i √3 accurately.",
        "Method 1 (Polar Form - Fastest & Error-Free):\n"
        "r = |z| = √((-1)² + (√3)²) = √(1 + 3) = √4 = 2.\n"
        "Since x = -1 < 0 and y = √3 > 0, z lies in Quadrant II.\n"
        "Reference angle α = arctan(√3/1) = π/3 (60°). Arg(z) θ = π - π/3 = 2π/3 (120°).\n"
        "Polar form: z = 2 [cos(2π/3) + i sin(2π/3)].\n"
        "By De Moivre's Theorem, the square roots are w = ±√2 [cos((2π/3)/2) + i sin((2π/3)/2)]\n"
        "= ±√2 [cos(π/3) + i sin(π/3)] = ±√2 [1/2 + i √3/2] = ±(1/√2 + i √(3/2)).\n"
        "Verification: [1/√2 + i √(3/2)]² = 1/2 - 3/2 + 2i(√3/2) = -1 + i √3. Exactly correct!",
        "Square roots of r e^(iθ) are ±√r e^(iθ/2). For -1 + i√3: r=2, θ=120° ⇒ ±√2 ∠60° = ±(1/√2 + i √(3/2))."
    )

    docx_styler.add_compare_section_header(doc, "1.8", "Complex Numbers")
    docx_styler.add_compare_table(
        doc, "Forms of a Complex Number: Cartesian vs Polar vs Exponential",
        ["Feature", "Cartesian (Rectangular)", "Polar (Trigonometric)", "Exponential (Euler)"],
        [
            ["Notation", "z = x + iy", "z = r(cos θ + i sin θ)", "z = r e^(iθ)"],
            ["Components", "x = Re(z), y = Im(z)", "r = √(x²+y²), θ = Arg(z)", "r = modulus, θ = argument in radians"],
            ["Best Used For", "Addition and subtraction", "Geometric visualization and roots", "Multiplication, division, and powers"],
            ["Multiplication", "(x₁+iy₁)(x₂+iy₂) expands algebraically", "r₁r₂ [cos(θ₁+θ₂) + i sin(θ₁+θ₂)]", "r₁r₂ e^(i(θ₁+θ₂))"],
            ["Power zⁿ", "Tedious binomial expansion", "rⁿ (cos nθ + i sin nθ)", "rⁿ e^(i nθ)"]
        ]
    )

    # ==========================================
    # 1.9 Permutations, Combinations & Binomial Theorem
    # ==========================================
    docx_styler.add_topic_heading(doc, "1.9", "Permutations, Combinations & Binomial Theorem")

    docx_styler.add_question(
        doc, 38,
        "Distinguish between Permutations and Combinations with formulas and properties.",
        "• Permutation (Arrangement): An ordered selection where sequence matters. The number of permutations of n distinct objects taken r at a time is:\n"
        "  ⁿPᵣ = n! / (n - r)! = n(n - 1)...(n - r + 1).\n"
        "• Combination (Selection): An unordered selection where sequence does not matter (a group or committee). The number of combinations of n objects taken r at a time is:\n"
        "  ⁿCᵣ = n! / [r! (n - r)!] = ⁿPᵣ / r!.\n"
        "Key Properties of Combinations:\n"
        "1. Symmetry: ⁿCᵣ = ⁿCₙ₋ᵣ\n"
        "2. Pascal's Identity: ⁿCᵣ + ⁿCᵣ₋₁ = ⁿ⁺¹Cᵣ\n"
        "3. If ⁿCₓ = ⁿCᵧ, then either x = y or x + y = n.",
        "Permutation = Order matters (words, ranks). Combination = Grouping (committees, teams). ⁿCᵣ = ⁿCₙ₋ᵣ."
    )

    docx_styler.add_question(
        doc, 39,
        "State the Binomial Theorem for a positive integral index, general term, and middle term formula.",
        "Binomial Theorem: For any n ∈ ℕ:\n"
        "(a + b)ⁿ = ⁿC₀ aⁿ + ⁿC₁ aⁿ⁻¹b + ⁿC₂ aⁿ⁻²b² + ... + ⁿCᵣ aⁿ⁻ʳbʳ + ... + ⁿCₙ bⁿ = ∑ᵣ₌₀ⁿ ⁿCᵣ aⁿ⁻ʳbʳ.\n"
        "• Number of terms: Exactly (n + 1) terms.\n"
        "• General Term: Tᵣ₊₁ = ⁿCᵣ aⁿ⁻ʳ bʳ (Notice the index is r for the (r + 1)-th term!).\n"
        "• Middle Term:\n"
        "  - If n is even: There is exactly ONE middle term, which is the (n/2 + 1)-th term: T_{n/2 + 1} = ⁿC_{n/2} a^(n/2) b^(n/2).\n"
        "  - If n is odd: There are TWO middle terms: the ((n + 1)/2)-th term and the ((n + 3)/2)-th term.",
        "General term is Tᵣ₊₁ = ⁿCᵣ aⁿ⁻ʳ bʳ. n even ⇒ 1 middle term. n odd ⇒ 2 middle terms."
    )

    docx_styler.add_compare_section_header(doc, "1.9", "Permutations & Combinations")
    docx_styler.add_compare_table(
        doc, "Permutation vs Combination: Decision Guide",
        ["Criteria", "Permutation (ⁿPᵣ)", "Combination (ⁿCᵣ)"],
        [
            ["Order Significance", "ORDER MATTERS strictly (AB ≠ BA)", "ORDER DOES NOT MATTER (AB = BA)"],
            ["Formula", "n! / (n - r)!", "n! / [r! (n - r)!]"],
            ["Standard Real-World Models", "Forming words, telephone numbers, seating in a row, awards (1st, 2nd)", "Selecting committees, hands of cards, lottery numbers, choosing subsets"],
            ["Relationship", "ⁿPᵣ = r! · ⁿCᵣ (always ≥ ⁿCᵣ)", "ⁿCᵣ = ⁿPᵣ / r!"]
        ]
    )

    # ==========================================
    # Professor's Theory & Viva Bank
    # ==========================================
    docx_styler.add_viva_header(doc)

    docx_styler.add_viva_category(doc, "Prove", "proofs & theorems")
    docx_styler.add_viva_question(
        doc, "Prove", 1,
        "Prove that if two positive numbers a and b have arithmetic mean A, geometric mean G, and harmonic mean H, then G² = A · H and A ≥ G ≥ H.",
        "Definitions: A = (a + b)/2, G = √(ab), H = 2ab/(a + b).\n"
        "1. Product A · H = [(a + b)/2] · [2ab/(a + b)] = ab. Since G = √(ab), G² = ab. Hence G² = A · H identically.\n"
        "2. Inequality: A - G = (a + b)/2 - √(ab) = (a - 2√(ab) + b)/2 = (√a - √b)² / 2. Since any real square is ≥ 0, A - G ≥ 0 ⇒ A ≥ G, with equality iff √a = √b ⇔ a = b.\n"
        "3. Since G² = AH and A ≥ G > 0, dividing by A gives H = G²/A ≤ G²/G = G ⇒ G ≥ H.\n"
        "Combining both yields A ≥ G ≥ H, with equality iff a = b."
    )

    docx_styler.add_viva_question(
        doc, "Prove", 2,
        "Prove De Morgan's Law ¬(p ∧ q) ≡ ¬p ∨ ¬q using truth table equivalence.",
        "Construct the 4-case truth table:\n"
        "Case 1 (T, T): p ∧ q is T ⇒ ¬(p ∧ q) is F. ¬p is F, ¬q is F ⇒ ¬p ∨ ¬q is F.\n"
        "Case 2 (T, F): p ∧ q is F ⇒ ¬(p ∧ q) is T. ¬p is F, ¬q is T ⇒ ¬p ∨ ¬q is T.\n"
        "Case 3 (F, T): p ∧ q is F ⇒ ¬(p ∧ q) is T. ¬p is T, ¬q is F ⇒ ¬p ∨ ¬q is T.\n"
        "Case 4 (F, F): p ∧ q is F ⇒ ¬(p ∧ q) is T. ¬p is T, ¬q is T ⇒ ¬p ∨ ¬q is T.\n"
        "Columns for ¬(p ∧ q) and ¬p ∨ ¬q are identical in all 4 cases (F, T, T, T), proving logical equivalence."
    )

    docx_styler.add_viva_question(
        doc, "Prove", 3,
        "Prove Pascal's Identity for combinations: ⁿCᵣ + ⁿCᵣ₋₁ = ⁿ⁺¹Cᵣ.",
        "LHS = n! / [r! (n - r)!] + n! / [(r - 1)! (n - r + 1)!].\n"
        "Factor out common terms n! / [r! (n - r + 1)!]:\n"
        "Notice r! = r · (r - 1)! and (n - r + 1)! = (n - r + 1) · (n - r)!.\n"
        "LHS = {n! / [(r - 1)! (n - r)!]} · [1/r + 1/(n - r + 1)]\n"
        "= {n! / [(r - 1)! (n - r)!]} · [(n - r + 1 + r) / (r(n - r + 1))]\n"
        "= {n! / [(r - 1)! (n - r)!]} · [(n + 1) / (r(n - r + 1))]\n"
        "= (n + 1)! / [r! (n + 1 - r)!] = ⁿ⁺¹Cᵣ = RHS. Q.E.D."
    )

    docx_styler.add_viva_category(doc, "Derive", "deriving formulas & results")
    docx_styler.add_viva_question(
        doc, "Derive", 4,
        "Derive the formula for the sum of an infinite geometric series S∞ = a/(1 - r) when |r| < 1.",
        "Consider finite sum Sₙ = a + ar + ar² + ... + arⁿ⁻¹.\n"
        "Multiplying by r: r Sₙ = ar + ar² + ... + arⁿ.\n"
        "Subtracting: Sₙ(1 - r) = a - arⁿ = a(1 - rⁿ) ⇒ Sₙ = a(1 - rⁿ)/(1 - r).\n"
        "For infinite sum: S∞ = lim n→∞ Sₙ = lim n→∞ [a/(1 - r) - a rⁿ/(1 - r)].\n"
        "When |r| < 1, lim n→∞ rⁿ = 0. Therefore, the second term vanishes, leaving S∞ = a/(1 - r)."
    )

    docx_styler.add_viva_category(doc, "State", "definitions, conditions & identities")
    docx_styler.add_viva_question(
        doc, "State", 5,
        "State the necessary and sufficient condition for a square matrix to be invertible and state the reversal laws.",
        "A square matrix A is invertible if and only if |A| ≠ 0 (A is non-singular).\n"
        "Reversal laws:\n"
        "1. Transpose of product: (AB)ᵀ = Bᵀ Aᵀ\n"
        "2. Inverse of product: (AB)⁻¹ = B⁻¹ A⁻¹ (when both A and B are invertible of the same order)."
    )

    docx_styler.add_viva_category(doc, "Explain", "conceptual principles & viva probing")
    docx_styler.add_viva_question(
        doc, "Explain", 6,
        "Explain why a conditional statement p → q is considered True when its antecedent p is False (vacuous truth).",
        "A conditional p → q is an obligation/promise: 'If condition p happens, I guarantee consequence q.'\n"
        "The contract is broken (False) ONLY when the condition p is met, yet q fails to occur (T → F).\n"
        "If condition p is never satisfied (p is False), the promise has never been violated! By convention in mathematical logic (the law of excluded middle), every proposition must have a truth value, so an unviolated contract is deemed True. This is called vacuous truth (e.g., 'If it rains elephants, I will fly to Mars' is logically True because it never rains elephants)."
    )

    docx_styler.add_viva_question(
        doc, "Viva", 7,
        "Why must all diagonal entries of a skew-symmetric matrix be strictly zero?",
        "By definition, a matrix A is skew-symmetric if Aᵀ = -A.\n"
        "Looking at the elements on the main diagonal where row index equals column index (i = j):\n"
        "(Aᵀ)ᵢᵢ = aᵢᵢ and (-A)ᵢᵢ = -aᵢᵢ.\n"
        "Thus, aᵢᵢ = -aᵢᵢ ⇒ aᵢᵢ + aᵢᵢ = 0 ⇒ 2aᵢᵢ = 0 ⇒ aᵢᵢ = 0 for every diagonal entry. They cannot be anything other than zero."
    )

    docx_styler.add_viva_question(
        doc, "Viva", 8,
        "Why does an equilateral triangle appear when the cube roots of unity are plotted on the Argand plane?",
        "The cube roots of unity are z₁ = 1 = e^(i·0), z₂ = ω = e^(i·2π/3), z₃ = ω² = e^(i·4π/3).\n"
        "All three roots have identical modulus |z| = 1, so they all lie on the unit circle centered at the origin.\n"
        "Furthermore, their arguments differ by exactly 2π/3 radians (120°), partitioning the circle of 360° into three equal sectors. The chords connecting these points are of equal length: |1 - ω| = |ω - ω²| = |ω² - 1| = √3. Hence, they form a perfect equilateral triangle."
    )

    docx_styler.add_viva_category(doc, "Numerical", "viva numerical problems")
    docx_styler.add_viva_question(
        doc, "Numerical", 9,
        "If α and β are the roots of x² - 5x + 6 = 0, form the quadratic equation whose roots are 2α and 2β.",
        "For x² - 5x + 6 = 0: sum α + β = 5, product αβ = 6.\n"
        "New roots are α' = 2α and β' = 2β.\n"
        "New sum S' = 2α + 2β = 2(α + β) = 2(5) = 10.\n"
        "New product P' = (2α)(2β) = 4αβ = 4(6) = 24.\n"
        "The required equation is x² - S' x + P' = 0 ⇒ x² - 10x + 24 = 0."
    )

    docx_styler.add_viva_question(
        doc, "Numerical", 10,
        "Find the value of (1 + ω - ω²)(1 - ω + ω²) using cube roots of unity.",
        "Recall identity: 1 + ω + ω² = 0 ⇒ 1 + ω = -ω² and 1 + ω² = -ω.\n"
        "Substitute into factors:\n"
        "First factor: (1 + ω) - ω² = (-ω²) - ω² = -2ω².\n"
        "Second factor: (1 + ω²) - ω = (-ω) - ω = -2ω.\n"
        "Product = (-2ω²) · (-2ω) = 4 ω³.\n"
        "Since ω³ = 1, Product = 4(1) = 4."
    )

    # ==========================================
    # Quick-Math Memos
    # ==========================================
    memos = [
        "Logic: p → q ≡ ¬p ∨ q ≡ ¬q → ¬p (Contrapositive). Vacuous truth: F → anything is T.",
        "Real Numbers: Completeness axiom: Bounded above set in ℝ has supremum in ℝ. Triangle ineq: |x+y| ≤ |x| + |y|.",
        "Functions: Invertible ⇔ Bijective. Composition associative: f ∘ (g ∘ h) = (f ∘ g) ∘ h, but f ∘ g ≠ g ∘ f.",
        "Progressions: AM ≥ GM ≥ HM and G² = A · H. Sum to infinity GP: S∞ = a/(1 - r) strictly for |r| < 1.",
        "Sum Identities: ∑ k = n(n+1)/2, ∑ k² = n(n+1)(2n+1)/6, ∑ k³ = [n(n+1)/2]² = (∑ k)².",
        "Matrices: (AB)ᵀ = BᵀAᵀ, (AB)⁻¹ = B⁻¹A⁻¹. A⁻¹ = (1/|A|) adj(A) iff |A| ≠ 0. |kA| = kⁿ|A|.",
        "Skew-symmetric matrix: Aᵀ = -A, all diagonal entries must be 0.",
        "Quadratic equations: Roots α, β ⇒ Sum = -b/a, Product = c/a. |α - β| = √(b² - 4ac)/|a|.",
        "Complex Numbers: z · z̄ = |z|². Polar form: r(cos θ + i sin θ) = r e^(iθ). Moduli multiply, arguments add.",
        "Cube Roots of Unity: 1 + ω + ω² = 0, ω³ = 1. Geometrically forms an equilateral triangle on |z| = 1.",
        "Combinatorics: ⁿPᵣ = n!/(n-r)!, ⁿCᵣ = n!/[r!(n-r)!]. Pascal's: ⁿCᵣ + ⁿCᵣ₋₁ = ⁿ⁺¹Cᵣ.",
        "Binomial General Term: Tᵣ₊₁ = ⁿCᵣ aⁿ⁻ʳ bʳ. Middle term: n even ⇒ 1 term; n odd ⇒ 2 terms."
    ]
    docx_styler.add_quick_memos_section(doc, memos)

    target_path = "C:/Users/ASUS/Math_XI_Unit_Docs/Math_XI_Unit_01_algebra.docx"
    doc.save(target_path)
    print(f"Successfully generated {target_path}")

if __name__ == '__main__':
    build()
