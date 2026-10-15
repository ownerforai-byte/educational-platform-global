import sys
sys.path.insert(0, 'c:/Users/ASUS/Desktop/rn/scripts/math_docs')
import docx_styler

def build():
    doc = docx_styler.init_document()
    docx_styler.add_header_block(
        doc,
        unit_no=2,
        unit_name="Trigonometry",
        area_name="Content area 2 (Mat. 007)"
    )

    # ==========================================
    # 2.1 Properties of Triangle
    # ==========================================
    docx_styler.add_topic_heading(doc, "2.1", "Properties of Triangle")

    docx_styler.add_question(
        doc, 1,
        "State the Sine Law and explain its geometric interpretation with the circumradius R.",
        "In any triangle ABC with sides a, b, c opposite to angles A, B, C, the lengths of the sides are proportional to the sines of the opposite angles:\n"
        "a / sin A = b / sin B = c / sin C = 2R,\n"
        "where R is the radius of the circumcircle (circumradius) of the triangle.\n"
        "Geometric insight: The chord length of any side of a circle subtending angle A at the opposite circumference is given by 2R sin A. Thus, the common ratio a/sin A is precisely the diameter of the circumcircle.",
        "a / sin A = b / sin B = c / sin C = 2R. Always use to relate sides and opposite angles."
    )

    docx_styler.add_question(
        doc, 2,
        "State the Cosine Law and its forms for calculating angles and sides.",
        "In triangle ABC:\n"
        "• Side forms: a² = b² + c² - 2bc cos A ; b² = c² + a² - 2ca cos B ; c² = a² + b² - 2ab cos C.\n"
        "• Angle forms:\n"
        "  cos A = (b² + c² - a²) / (2bc)\n"
        "  cos B = (c² + a² - b²) / (2ca)\n"
        "  cos C = (a² + b² - c²) / (2ab).\n"
        "Nature of angles: cos A > 0 iff A is acute; cos A = 0 iff A is right-angled (reducing to Pythagoras' Theorem a² = b² + c²); cos A < 0 iff A is obtuse.",
        "Pythagoras plus adjustment: a² = b² + c² - 2bc cos A. Negative cos A signals an obtuse angle."
    )

    docx_styler.add_question(
        doc, 3,
        "State the Projection Formulae and explain their geometric meaning.",
        "In any triangle ABC:\n"
        "• a = b cos C + c cos B\n"
        "• b = c cos A + a cos C\n"
        "• c = a cos B + b cos A.\n"
        "Geometric meaning: Dropping an altitude AD from vertex A to the base BC divides side a into two segments: BD = c cos B and CD = b cos C. The total side length a is simply the sum of these orthogonal projections: a = BD + CD = c cos B + b cos C.",
        "Base = sum of projections of the other two sides on it."
    )

    docx_styler.add_question(
        doc, 4,
        "State Napier's Analogy (Law of Tangents) and explain when it is preferred in computation.",
        "In any triangle ABC:\n"
        "• tan[(B - C)/2] = [(b - c)/(b + c)] cot(A/2)\n"
        "• tan[(C - A)/2] = [(c - a)/(c + a)] cot(B/2)\n"
        "• tan[(A - B)/2] = [(a - b)/(a + b)] cot(C/2).\n"
        "Conceptual importance: In numerical work and logarithmic calculation, the Law of Tangents is much faster and less prone to round-off error than the Law of Cosines when two sides and the included angle (SAS) are given.",
        "tan[(B - C)/2] = [(b - c)/(b + c)] cot(A/2). Ideal for solving SAS triangles."
    )

    docx_styler.add_question(
        doc, 5,
        "State the half-angle formulae for sin(A/2), cos(A/2), and tan(A/2) in terms of semi-perimeter s.",
        "Let s = (a + b + c)/2 be the semi-perimeter. In triangle ABC:\n"
        "• sin(A/2) = √[ (s - b)(s - c) / (bc) ]\n"
        "• cos(A/2) = √[ s(s - a) / (bc) ]\n"
        "• tan(A/2) = sin(A/2)/cos(A/2) = √[ (s - b)(s - c) / (s(s - a)) ].\n"
        "Note: In any triangle, 0 < A < 180° ⇒ 0 < A/2 < 90°, so all half-angle trigonometric ratios are strictly positive.",
        "sin(A/2) uses opposite factors (s-b)(s-c); cos(A/2) uses adjacent factor s(s-a)."
    )

    docx_styler.add_question(
        doc, 6,
        "State the various expressions for the area of a triangle Δ.",
        "The area Δ of triangle ABC can be computed via:\n"
        "1. Two sides & included angle: Δ = (1/2)bc sin A = (1/2)ca sin B = (1/2)ab sin C.\n"
        "2. Heron's Formula (3 sides): Δ = √[s(s - a)(s - b)(s - c)].\n"
        "3. Circumradius form: Δ = abc / (4R).\n"
        "4. Inradius form: Δ = r · s (sum of areas of three internal triangles formed with incenter).\n"
        "5. Angle form: Δ = 2 R² sin A sin B sin C.",
        "Δ = (1/2)bc sin A = √[s(s-a)(s-b)(s-c)] = r s = abc / (4R)."
    )

    docx_styler.add_question(
        doc, 7,
        "Define circumradius (R), inradius (r), and exradii (r₁, r₂, r₃) with their standard formulas.",
        "• Circumradius (R): Radius of circle passing through all three vertices: R = a/(2 sin A) = abc/(4Δ).\n"
        "• Inradius (r): Radius of incircle tangent to all three sides internally: r = Δ/s = (s - a)tan(A/2) = 4R sin(A/2) sin(B/2) sin(C/2).\n"
        "• Exradii (r₁, r₂, r₃): Radii of excircles tangent to one side externally and the extensions of the other two sides:\n"
        "  r₁ = Δ / (s - a) = s tan(A/2) = 4R sin(A/2) cos(B/2) cos(C/2)\n"
        "  r₂ = Δ / (s - b) = s tan(B/2)\n"
        "  r₃ = Δ / (s - c) = s tan(C/2).\n"
        "Harmonic relation: 1/r₁ + 1/r₂ + 1/r₃ = (s-a)/Δ + (s-b)/Δ + (s-c)/Δ = (3s - 2s)/Δ = s/Δ = 1/r!",
        "R = abc/(4Δ), r = Δ/s, r₁ = Δ/(s-a). Beautiful relation: 1/r₁ + 1/r₂ + 1/r₃ = 1/r."
    )

    # ==========================================
    # 2.2 Solution of Triangles
    # ==========================================
    docx_styler.add_topic_heading(doc, "2.2", "Solution of Triangles")

    docx_styler.add_question(
        doc, 8,
        "Explain the standard cases in solving triangles and the Ambiguous Case (SSA).",
        "A triangle is completely determined by 3 independent parts (at least one must be a side):\n"
        "1. SSS (Three sides): Use Cosine Law or Half-angle formulas.\n"
        "2. SAS (Two sides & included angle): Use Napier's analogy or Cosine Law.\n"
        "3. ASA or AAS (Two angles & one side): Find 3rd angle (180° - sum), then use Sine Law.\n"
        "4. SSA (Ambiguous Case: two sides a, b and non-included angle A):\n"
        "   Compute altitude h = b sin A:\n"
        "   • If A is acute (A < 90°):\n"
        "     - If a < b sin A: NO TRIANGLE exists (side a is too short to reach the base).\n"
        "     - If a = b sin A: Exactly ONE right triangle (B = 90°).\n"
        "     - If b sin A < a < b: TWO DISTINCT TRIANGLES exist (one with B acute, one with B obtuse = 180° - B₁).\n"
        "     - If a ≥ b: Exactly ONE triangle exists.\n"
        "   • If A is obtuse (A ≥ 90°):\n"
        "     - If a ≤ b: NO triangle exists.\n"
        "     - If a > b: Exactly ONE triangle exists.",
        "SSA is the ONLY ambiguous case! Compare side a with altitude h = b sin A. 2 triangles possible iff b sin A < a < b."
    )

    docx_styler.add_compare_section_header(doc, "2.1 & 2.2", "Properties & Solution of Triangles")
    docx_styler.add_compare_table(
        doc, "Comparison of Triangle Laws and Methods",
        ["Law / Formula", "Mathematical Expression", "Required Given Data", "Primary Role / Use Case"],
        [
            ["Sine Law", "a/sin A = b/sin B = c/sin C = 2R", "Two angles + 1 side (ASA/AAS) or SSA", "Relating sides to opposite angles & circumcircle"],
            ["Cosine Law", "cos A = (b² + c² - a²) / (2bc)", "Three sides (SSS) or two sides + angle (SAS)", "Finding third side or angles; detects obtuse angles"],
            ["Napier's Analogy", "tan[(B-C)/2] = [(b-c)/(b+c)] cot(A/2)", "Two sides + included angle (SAS)", "Logarithmic computation of angles"],
            ["Projection Law", "a = b cos C + c cos B", "Sides and angles", "Verifying side lengths and theoretical proofs"]
        ]
    )

    # ==========================================
    # 2.3 Inverse Circular Functions
    # ==========================================
    docx_styler.add_topic_heading(doc, "2.3", "Inverse Circular Functions")

    docx_styler.add_question(
        doc, 9,
        "Why must the domains of trigonometric functions be restricted to define their inverses?",
        "Standard trigonometric functions are periodic (e.g., sin(x + 2π) = sin x), meaning they are many-to-one functions and fail the Horizontal Line Test.\n"
        "A function possesses an inverse if and only if it is strictly bijective (one-to-one and onto). Therefore, to define inverse trigonometric functions, the domains of trigonometric functions are restricted to standard intervals (called Principal Value Branches) where the functions are strictly monotonic.",
        "Trig functions are periodic (many-to-one). Domain restriction makes them bijective so inverses exist."
    )

    docx_styler.add_question(
        doc, 10,
        "State the domain and principal value branch (range) of all six inverse trigonometric functions.",
        "1. y = arcsin x (sin⁻¹x): Domain = [-1, 1], Principal Range = [-π/2, π/2]\n"
        "2. y = arccos x (cos⁻¹x): Domain = [-1, 1], Principal Range = [0, π]\n"
        "3. y = arctan x (tan⁻¹x): Domain = ℝ, Principal Range = (-π/2, π/2)\n"
        "4. y = arccot x (cot⁻¹x): Domain = ℝ, Principal Range = (0, π)\n"
        "5. y = arcsec x (sec⁻¹x): Domain = (-∞, -1] ∪ [1, ∞), Principal Range = [0, π] - {π/2}\n"
        "6. y = arccsc x (csc⁻¹x): Domain = (-∞, -1] ∪ [1, ∞), Principal Range = [-π/2, π/2] - {0}.",
        "sin⁻¹, tan⁻¹ use [-π/2, π/2]; cos⁻¹, cot⁻¹ use [0, π]. Watch open vs closed brackets!"
    )

    docx_styler.add_question(
        doc, 11,
        "Explain why sin⁻¹(sin x) = x is not true for all real numbers x, and evaluate sin⁻¹(sin(2π/3)).",
        "The identity sin⁻¹(sin x) = x holds IF AND ONLY IF x lies in the principal value range [-π/2, π/2].\n"
        "If x falls outside this interval, sin⁻¹(sin x) returns the unique angle θ ∈ [-π/2, π/2] that shares the identical sine value.\n"
        "Evaluating sin⁻¹(sin(2π/3)):\n"
        "2π/3 (120°) ∉ [-π/2, π/2].\n"
        "Since sin(2π/3) = sin(π - π/3) = sin(π/3), and π/3 ∈ [-π/2, π/2]:\n"
        "sin⁻¹(sin(2π/3)) = sin⁻¹(sin(π/3)) = π/3.",
        "sin⁻¹(sin x) ≠ x when x is outside [-π/2, π/2]! Reduce using quadrant identities."
    )

    docx_styler.add_question(
        doc, 12,
        "Prove the co-function identities: sin⁻¹x + cos⁻¹x = π/2 and tan⁻¹x + cot⁻¹x = π/2.",
        "Proof for sin⁻¹x + cos⁻¹x = π/2 (for x ∈ [-1, 1]):\n"
        "Let θ = sin⁻¹x. Then sin θ = x, with θ ∈ [-π/2, π/2].\n"
        "Using co-function identity: cos(π/2 - θ) = sin θ = x.\n"
        "Since -π/2 ≤ θ ≤ π/2 ⇒ -π/2 ≤ -θ ≤ π/2 ⇒ 0 ≤ π/2 - θ ≤ π, the angle (π/2 - θ) falls legitimately in the principal range of arccos!\n"
        "Therefore: arccos x = π/2 - θ = π/2 - sin⁻¹x.\n"
        "Rearranging: sin⁻¹x + cos⁻¹x = π/2. Q.E.D.\n"
        "Identical logic gives tan⁻¹x + cot⁻¹x = π/2 and sec⁻¹x + csc⁻¹x = π/2.",
        "sin⁻¹x + cos⁻¹x = π/2. The sum of complementary inverse ratios always equals 90° (π/2)."
    )

    docx_styler.add_question(
        doc, 13,
        "State the addition and subtraction formulas for tan⁻¹x and state their boundary conditions.",
        "For x, y ∈ ℝ:\n"
        "1. tan⁻¹x + tan⁻¹y = tan⁻¹[ (x + y) / (1 - xy) ], strictly valid when xy < 1.\n"
        "   (If xy > 1 and x, y > 0: sum = π + tan⁻¹[ (x + y) / (1 - xy) ]).\n"
        "2. tan⁻¹x - tan⁻¹y = tan⁻¹[ (x - y) / (1 + xy) ], strictly valid when xy > -1.\n"
        "Double angle formula: 2 tan⁻¹x = tan⁻¹[ 2x / (1 - x²) ] for |x| < 1\n"
        "= sin⁻¹[ 2x / (1 + x²) ] for |x| ≤ 1\n"
        "= cos⁻¹[ (1 - x²) / (1 + x²) ] for x ≥ 0.",
        "tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1-xy)] if xy < 1. If xy > 1 with positive arguments, add π!"
    )

    # ==========================================
    # 2.4 Trigonometric Equations
    # ==========================================
    docx_styler.add_topic_heading(doc, "2.4", "Trigonometric Equations")

    docx_styler.add_question(
        doc, 14,
        "State the general solutions for fundamental trigonometric equations.",
        "For n ∈ ℤ:\n"
        "1. Zero equations:\n"
        "   • sin θ = 0 ⇒ θ = nπ\n"
        "   • cos θ = 0 ⇒ θ = (2n + 1)π/2\n"
        "   • tan θ = 0 ⇒ θ = nπ\n"
        "2. Value equations (where α is the principal angle):\n"
        "   • sin θ = sin α ⇒ θ = nπ + (-1)ⁿ α\n"
        "   • cos θ = cos α ⇒ θ = 2nπ ± α\n"
        "   • tan θ = tan α ⇒ θ = nπ + α\n"
        "3. Squared equations:\n"
        "   • sin² θ = sin² α, cos² θ = cos² α, or tan² θ = tan² α ⇒ θ = nπ ± α.",
        "sin uses nπ + (-1)ⁿα; cos uses 2nπ ± α; tan uses nπ + α. Squared forms always use nπ ± α."
    )

    docx_styler.add_question(
        doc, 15,
        "Explain the method to solve the linear combination equation a cos θ + b sin θ = c.",
        "Procedure:\n"
        "1. Divide the entire equation by r = √(a² + b²):\n"
        "   (a / √(a² + b²)) cos θ + (b / √(a² + b²)) sin θ = c / √(a² + b²).\n"
        "2. Let cos α = a / √(a² + b²) and sin α = b / √(a² + b²), where α = arctan(b/a).\n"
        "3. The equation condenses via compound angle: cos(θ - α) = c / √(a² + b²).\n"
        "4. Solvability condition: Since |cos(θ - α)| ≤ 1, a real solution exists IF AND ONLY IF:\n"
        "   |c| ≤ √(a² + b²) ⇔ c² ≤ a² + b².\n"
        "   If c² > a² + b², no real solution exists!\n"
        "5. General solution: θ - α = 2nπ ± arccos(c / √(a² + b²)).",
        "Divide by √(a² + b²). Condenses to cos(θ - α) = c/√(a²+b²). Requires c² ≤ a² + b²."
    )

    docx_styler.add_question(
        doc, 16,
        "Why does squaring a trigonometric equation introduce extraneous roots, and how must they be avoided?",
        "Squaring both sides of an equation (A = B ⇒ A² = B²) is NOT a reversible step because A² = B² is satisfied when A = B AND when A = -B.\n"
        "This introduces false solutions (extraneous roots) where the original signs differed.\n"
        "How to avoid / handle:\n"
        "1. Prefer linear combination methods (dividing by √(a² + b²)) or factoring over squaring whenever possible.\n"
        "2. If squaring is unavoidable, EVERY candidate solution must be plugged back into the original un-squared equation to verify its validity.",
        "Squaring introduces extraneous roots because (-k)² = k². Always test solutions in original equation."
    )

    docx_styler.add_compare_section_header(doc, "2.3 & 2.4", "Inverse Trig & Equations")
    docx_styler.add_compare_table(
        doc, "Principal Value Branches of Inverse Trigonometric Functions",
        ["Function", "Domain", "Principal Range", "Quadrant Coverage", "Sign Rule for Negative Inputs"],
        [
            ["sin⁻¹x", "[-1, 1]", "[-π/2, π/2]", "Quad I (positive) & Quad IV (negative)", "sin⁻¹(-x) = -sin⁻¹x"],
            ["cos⁻¹x", "[-1, 1]", "[0, π]", "Quad I (positive) & Quad II (negative)", "cos⁻¹(-x) = π - cos⁻¹x"],
            ["tan⁻¹x", "(-∞, ∞)", "(-π/2, π/2)", "Quad I (positive) & Quad IV (negative)", "tan⁻¹(-x) = -tan⁻¹x"],
            ["cot⁻¹x", "(-∞, ∞)", "(0, π)", "Quad I (positive) & Quad II (negative)", "cot⁻¹(-x) = π - cot⁻¹x"],
            ["sec⁻¹x", "(-∞, -1] ∪ [1, ∞)", "[0, π] - {π/2}", "Quad I & Quad II", "sec⁻¹(-x) = π - sec⁻¹x"],
            ["csc⁻¹x", "(-∞, -1] ∪ [1, ∞)", "[-π/2, π/2] - {0}", "Quad I & Quad IV", "csc⁻¹(-x) = -csc⁻¹x"]
        ]
    )

    # ==========================================
    # Professor's Theory & Viva Bank
    # ==========================================
    docx_styler.add_viva_header(doc)

    docx_styler.add_viva_category(doc, "Prove", "proofs & theorems")
    docx_styler.add_viva_question(
        doc, "Prove", 1,
        "Prove the Sine Law a / sin A = b / sin B = c / sin C = 2R using the circumcircle of triangle ABC.",
        "Let O be the center and R be the radius of the circumcircle of triangle ABC.\n"
        "Draw diameter BD = 2R through vertex B, and connect D to vertex C.\n"
        "In triangle BCD:\n"
        "1. Angle ∠BCD = 90° (angle in a semicircle is a right angle).\n"
        "2. Angle ∠BDC = ∠BAC = A (angles subtended by the same arc BC are equal).\n"
        "In right triangle BCD: sin(∠BDC) = Opposite / Hypotenuse = BC / BD.\n"
        "Since BC = a and BD = 2R, we have sin A = a / (2R) ⇒ a / sin A = 2R.\n"
        "By identical construction for vertices A and C:\n"
        "b / sin B = 2R and c / sin C = 2R.\n"
        "Therefore: a / sin A = b / sin B = c / sin C = 2R. Q.E.D."
    )

    docx_styler.add_viva_question(
        doc, "Prove", 2,
        "Prove the Cosine Law a² = b² + c² - 2bc cos A using coordinate geometry or vector projection.",
        "Proof via vectors:\n"
        "Let vertex A be the origin. Let vector AB = c and AC = b. Then vector BC = AC - AB = b - c.\n"
        "The side length a = |BC|.\n"
        "Taking the dot product of vector BC with itself:\n"
        "a² = |BC|² = (b - c) · (b - c) = |b|² + |c|² - 2(b · c).\n"
        "By definition of dot product: b · c = |b||c| cos A = bc cos A.\n"
        "Substituting: a² = b² + c² - 2bc cos A. Q.E.D."
    )

    docx_styler.add_viva_category(doc, "Derive", "deriving formulas & results")
    docx_styler.add_viva_question(
        doc, "Derive", 3,
        "Derive Napier's Analogy: tan[(B - C)/2] = [(b - c)/(b + c)] cot(A/2).",
        "By Sine Law: b = 2R sin B and c = 2R sin C.\n"
        "Consider (b - c) / (b + c) = (2R sin B - 2R sin C) / (2R sin B + 2R sin C) = (sin B - sin C) / (sin B + sin C).\n"
        "Apply factorisation formulas:\n"
        "Numerator: 2 cos[(B + C)/2] sin[(B - C)/2]\n"
        "Denominator: 2 sin[(B + C)/2] cos[(B - C)/2]\n"
        "Ratio = cot[(B + C)/2] · tan[(B - C)/2].\n"
        "In any triangle, A + B + C = 180° ⇒ (B + C)/2 = 90° - A/2.\n"
        "Therefore: cot[(B + C)/2] = cot(90° - A/2) = tan(A/2).\n"
        "Substitute back: (b - c)/(b + c) = tan(A/2) · tan[(B - C)/2].\n"
        "Multiplying by cot(A/2): tan[(B - C)/2] = [(b - c)/(b + c)] cot(A/2). Q.E.D."
    )

    docx_styler.add_viva_category(doc, "State", "definitions, identities & classifications")
    docx_styler.add_viva_question(
        doc, "State", 4,
        "State the inradius formula r = (s - a)tan(A/2) and the exradius formula r₁ = s tan(A/2).",
        "In triangle ABC, the contact points of the incircle divide side a into segments (s - b) and (s - c), side b into (s - c) and (s - a), and side c into (s - a) and (s - b).\n"
        "From the right triangle formed by incenter I, vertex A, and point of contact: tan(A/2) = r / (s - a) ⇒ r = (s - a) tan(A/2).\n"
        "Similarly, for the excircle opposite to A with center I₁ and radius r₁: the tangent from A to the excircle has length s. Hence tan(A/2) = r₁ / s ⇒ r₁ = s tan(A/2)."
    )

    docx_styler.add_viva_category(doc, "Explain", "working, principles & viva probing")
    docx_styler.add_viva_question(
        doc, "Explain", 5,
        "Explain geometrically why the SSA case can produce two distinct triangles.",
        "Given side b, angle A, and side a: draw angle A with side AC = b along one arm. Side a must connect from C to the other arm (line through A).\n"
        "The perpendicular distance from C to that arm is altitude h = b sin A.\n"
        "When the length of a is strictly between h and b (b sin A < a < b), a circle of radius a centered at C intersects the base line at TWO distinct points B₁ and B₂ (both on the same side of A because a < b).\n"
        "This creates two valid triangles: ΔAB₁C (where angle B₁ is acute) and ΔAB₂C (where angle B₂ is obtuse, and B₂ = 180° - B₁)."
    )

    docx_styler.add_viva_question(
        doc, "Viva", 6,
        "Why is cos⁻¹(-x) = π - cos⁻¹x rather than -cos⁻¹x?",
        "The principal range of arccos is [0, π] (Quadrants I and II), which contains only non-negative angles.\n"
        "If x > 0, -x is negative, so cos⁻¹(-x) MUST lie in Quadrant II [π/2, π].\n"
        "Let θ = cos⁻¹x ∈ [0, π/2]. Then cos(π - θ) = -cos θ = -x.\n"
        "Since 0 ≤ θ ≤ π/2 ⇒ π/2 ≤ π - θ ≤ π, the angle (π - θ) lies in the required principal range of arccos.\n"
        "Therefore: cos⁻¹(-x) = π - θ = π - cos⁻¹x. (If it were -cos⁻¹x, it would be negative, which is completely outside [0, π])."
    )

    docx_styler.add_viva_category(doc, "Numerical", "data & problem-based")
    docx_styler.add_viva_question(
        doc, "Numerical", 7,
        "Solve the trigonometric equation √3 cos θ + sin θ = √2 for its general solution.",
        "Given: √3 cos θ + sin θ = √2.\n"
        "Divide by r = √( (√3)² + 1² ) = √(3 + 1) = √4 = 2:\n"
        "(√3/2) cos θ + (1/2) sin θ = √2 / 2 = 1/√2.\n"
        "Recall: cos(π/6) = √3/2 and sin(π/6) = 1/2.\n"
        "Equation becomes: cos θ cos(π/6) + sin θ sin(π/6) = 1/√2\n"
        "⇒ cos(θ - π/6) = cos(π/4).\n"
        "General solution for cos:\n"
        "θ - π/6 = 2nπ ± π/4\n"
        "θ = 2nπ + π/6 ± π/4 for n ∈ ℤ."
    )

    # ==========================================
    # Quick-Math Memos
    # ==========================================
    memos = [
        "Sine Law: a/sin A = b/sin B = c/sin C = 2R (circumradius R = abc / 4Δ).",
        "Cosine Law: cos A = (b² + c² - a²) / (2bc). Obtuse angle ⇔ cos A < 0.",
        "Projection: a = b cos C + c cos B. Napier: tan[(B-C)/2] = [(b-c)/(b+c)] cot(A/2).",
        "Half-angles: sin(A/2) = √[(s-b)(s-c)/bc], cos(A/2) = √[s(s-a)/bc], tan(A/2) = √[(s-b)(s-c)/s(s-a)].",
        "Area of Triangle: Δ = (1/2)bc sin A = √[s(s-a)(s-b)(s-c)] = r s = abc / 4R.",
        "Radii: r = Δ/s, r₁ = Δ/(s-a). Harmonious sum: 1/r₁ + 1/r₂ + 1/r₃ = 1/r.",
        "Ambiguous Case (SSA): Two triangles possible iff A < 90° and b sin A < a < b.",
        "Inverse Trig Ranges: sin⁻¹x ∈ [-π/2, π/2], cos⁻¹x ∈ [0, π], tan⁻¹x ∈ (-π/2, π/2).",
        "Negative Inputs: sin⁻¹(-x) = -sin⁻¹x, but cos⁻¹(-x) = π - cos⁻¹x.",
        "Complementary sums: sin⁻¹x + cos⁻¹x = π/2 ; tan⁻¹x + cot⁻¹x = π/2.",
        "Addition: tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1-xy)] if xy < 1.",
        "General Solutions: sin θ = sin α ⇒ θ = nπ + (-1)ⁿα ; cos θ = cos α ⇒ θ = 2nπ ± α ; tan θ = tan α ⇒ θ = nπ + α.",
        "Linear Form: a cos θ + b sin θ = c has solutions iff c² ≤ a² + b²; divide by √(a² + b²)."
    ]
    docx_styler.add_quick_memos_section(doc, memos)

    target_path = "C:/Users/ASUS/Math_XI_Unit_Docs/Math_XI_Unit_02_trigonometry.docx"
    doc.save(target_path)
    print(f"Successfully generated {target_path}")

if __name__ == '__main__':
    build()
