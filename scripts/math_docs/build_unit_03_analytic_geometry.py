import sys
sys.path.insert(0, 'c:/Users/ASUS/Desktop/rn/scripts/math_docs')
import docx_styler

def build():
    doc = docx_styler.init_document()
    docx_styler.add_header_block(
        doc,
        unit_no=3,
        unit_name="Analytic Geometry",
        area_name="Content area 3 (Mat. 007)"
    )

    # ==========================================
    # 3.1 Straight Line
    # ==========================================
    docx_styler.add_topic_heading(doc, "3.1", "Straight Line")

    docx_styler.add_question(
        doc, 1,
        "Summarize the various standard forms of a straight line equation in 2D.",
        "1. Slope-Intercept form: y = mx + c (slope m = tan θ, y-intercept c).\n"
        "2. Point-Slope form: y - y₁ = m(x - x₁).\n"
        "3. Two-Point form: y - y₁ = [(y₂ - y₁)/(x₂ - x₁)] (x - x₁).\n"
        "4. Intercept form: x/a + y/b = 1 (x-intercept a, y-intercept b).\n"
        "5. Normal / Perpendicular form: x cos α + y sin α = p (p is length of normal from origin, α is angle made by normal with positive x-axis; p ≥ 0, 0 ≤ α < 360°).\n"
        "6. General form: Ax + By + C = 0 (slope m = -A/B, x-intercept = -C/A, y-intercept = -C/B).",
        "Normal form: x cos α + y sin α = p (p ≥ 0 always). General slope: m = -A/B."
    )

    docx_styler.add_question(
        doc, 2,
        "State the formula for the angle between two straight lines and conditions for parallelism and perpendicularity.",
        "For lines with slopes m₁ and m₂:\n"
        "tan θ = | (m₁ - m₂) / (1 + m₁ m₂) | (taking absolute value yields the acute angle θ).\n"
        "• Parallel lines: m₁ = m₂ (or for A₁x + B₁y + C₁ = 0 and A₂x + B₂y + C₂ = 0: A₁/A₂ = B₁/B₂).\n"
        "• Perpendicular lines: m₁ · m₂ = -1 (or A₁A₂ + B₁B₂ = 0).\n"
        "Special note: If 1 + m₁ m₂ = 0, tan θ is undefined, meaning the lines are perpendicular (θ = 90°).",
        "Parallel: m₁ = m₂. Perpendicular: m₁ m₂ = -1 ⇔ A₁A₂ + B₁B₂ = 0."
    )

    docx_styler.add_question(
        doc, 3,
        "State and explain the formula for the perpendicular distance from a point to a line.",
        "The perpendicular (shortest) distance d from a given point P(x₁, y₁) to the line Ax + By + C = 0 is:\n"
        "d = | A x₁ + B y₁ + C | / √(A² + B²).\n"
        "Geometric rationale: The numerator represents the evaluation of the line equation at point P (proportional to the signed height above/below the line), and the denominator √(A² + B²) normalizes by the length of the gradient/normal vector (A, B).\n"
        "Distance of origin (0, 0) from the line: d = |C| / √(A² + B²).",
        "Plug the point into Ax+By+C, take absolute value, divide by √(A² + B²)."
    )

    docx_styler.add_question(
        doc, 4,
        "State the formula for the distance between two parallel lines.",
        "For two parallel lines Ax + By + C₁ = 0 and Ax + By + C₂ = 0 (with identical x and y coefficients):\n"
        "d = | C₁ - C₂ | / √(A² + B²).\n"
        "Cautionary tip: Always make the coefficients of x and y identical in both equations before taking the difference of the constants (e.g., if one line is 2x + 4y + 5 = 0 and the other is x + 2y - 3 = 0, multiply the second by 2 to get 2x + 4y - 6 = 0, giving d = |5 - (-6)| / √(2² + 4²) = 11/√20).",
        "d = |C₁ - C₂| / √(A² + B²). Match coefficients of x and y first!"
    )

    docx_styler.add_question(
        doc, 5,
        "Explain the concept of a family of lines passing through the intersection of two lines.",
        "Let L₁: A₁x + B₁y + C₁ = 0 and L₂: A₂x + B₂y + C₂ = 0 be two intersecting straight lines.\n"
        "The equation:\n"
        "L₁ + λ L₂ = 0 ⇔ (A₁x + B₁y + C₁) + λ(A₂x + B₂y + C₂) = 0\n"
        "represents a family of lines all passing through the unique point of intersection of L₁ and L₂ for any real parameter λ.\n"
        "Advantage: Allows solving intersection problems in a single step without explicitly computing the intersection coordinates.",
        "L₁ + λ L₂ = 0. Bypasses finding the intersection point directly."
    )

    docx_styler.add_question(
        doc, 6,
        "State the equations of the bisectors of the angles between two intersecting lines.",
        "For lines a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0, the angle bisectors are the loci of points equidistant from both lines:\n"
        "(a₁x + b₁y + c₁) / √(a₁² + b₁²) = ± (a₂x + b₂y + c₂) / √(a₂² + b₂²).\n"
        "Discrimination between acute and obtuse bisectors (with c₁, c₂ made positive):\n"
        "• If a₁a₂ + b₁b₂ > 0: '+' sign gives the OBTUSE angle bisector, '-' sign gives the ACUTE angle bisector.\n"
        "• If a₁a₂ + b₁b₂ < 0: '+' sign gives the ACUTE angle bisector, '-' sign gives the OBTUSE angle bisector.\n"
        "• Notice that the two bisectors are always perpendicular to each other!",
        "Distance equality gives (L₁)/√(a₁²+b₁²) = ±(L₂)/√(a₂²+b₂²). Bisectors are mutually perpendicular."
    )

    # ==========================================
    # 3.2 Pair of Straight Lines
    # ==========================================
    docx_styler.add_topic_heading(doc, "3.2", "Pair of Straight Lines")

    docx_styler.add_question(
        doc, 7,
        "Explain the homogeneous second-degree equation ax² + 2hxy + by² = 0 and its nature.",
        "A homogeneous equation of degree 2 represents a pair of straight lines passing through the origin (0, 0).\n"
        "Let the two lines be y = m₁x and y = m₂x. Then (y - m₁x)(y - m₂x) = 0 ⇒ m₁m₂ x² - (m₁ + m₂)xy + y² = 0.\n"
        "Dividing ax² + 2hxy + by² = 0 by b gives y² + (2h/b)xy + (a/b)x² = 0.\n"
        "Comparing coefficients:\n"
        "• Sum of slopes: m₁ + m₂ = -2h / b\n"
        "• Product of slopes: m₁ m₂ = a / b\n"
        "Nature of the lines (governed by h² - ab):\n"
        "1. h² > ab: Two real and distinct lines.\n"
        "2. h² = ab: Two coincident (identical) lines.\n"
        "3. h² < ab: Two imaginary lines intersecting at the real origin (0, 0).",
        "m₁ + m₂ = -2h/b, m₁m₂ = a/b. Nature: h² > ab (distinct), h² = ab (coincident), h² < ab (imaginary)."
    )

    docx_styler.add_question(
        doc, 8,
        "State the angle between the pair of lines ax² + 2hxy + by² = 0 and conditions for perpendicularity and coincidence.",
        "The angle θ between the lines is given by:\n"
        "tan θ = | (m₁ - m₂) / (1 + m₁ m₂) | = | √[(m₁ + m₂)² - 4m₁m₂] / (1 + m₁ m₂) | = | √[(-2h/b)² - 4(a/b)] / (1 + a/b) |\n"
        "⇒ tan θ = | 2 √(h² - ab) / (a + b) |.\n"
        "Crucial Conditions:\n"
        "1. Perpendicular lines (θ = 90° ⇒ tan θ = ∞ ⇒ denominator is zero):\n"
        "   a + b = 0  ⇔  Coefficient of x² + Coefficient of y² = 0!\n"
        "2. Coincident / Parallel lines (θ = 0° ⇒ numerator is zero):\n"
        "   h² - ab = 0  ⇔  h² = ab.\n"
        "(Examiner trap warning: h² = ab indicates coincident lines, NEVER perpendicularity!)",
        "Perpendicular: a + b = 0 (sum of x² and y² coeffs is 0). Coincident: h² = ab. Angle: tan θ = 2√(h²-ab)/(a+b)."
    )

    docx_styler.add_question(
        doc, 9,
        "State the equation of the bisectors of the angles between the lines ax² + 2hxy + by² = 0.",
        "The combined equation of the pair of angle bisectors is:\n"
        "(x² - y²) / (a - b) = xy / h  ⇔  h(x² - y²) - (a - b)xy = 0.\n"
        "Observations:\n"
        "1. The sum of coefficients of x² and y² in the bisector equation is h + (-h) = 0. Therefore, the angle bisectors are ALWAYS mutually perpendicular!\n"
        "2. If a = b, the equation simplifies to xy = 0 (the coordinate axes x = 0 and y = 0 are the bisectors).\n"
        "3. If h = 0, the bisectors are x² - y² = 0 ⇒ y = ±x.",
        "(x² - y²)/(a - b) = xy/h. Coeff of x² + Coeff of y² = 0, proving bisectors are always at 90°."
    )

    docx_styler.add_question(
        doc, 10,
        "State the condition for the general second-degree equation ax² + 2hxy + by² + 2gx + 2fy + c = 0 to represent a pair of lines.",
        "The general equation represents a pair of straight lines if and only if the discriminant determinant Δ vanishes:\n"
        "Δ = | a  h  g |\n"
        "    | h  b  f |\n"
        "    | g  f  c | = abc + 2fgh - af² - bg² - ch² = 0.\n"
        "Mnemonic to remember the expansion: 'All Hostels Give High Class Food Ground Floor Clean' → a, h, g, b, f, c.\n"
        "If Δ = 0 and h² ≥ ab, the equation factors into two linear equations representing two lines.",
        "Δ = abc + 2fgh - af² - bg² - ch² = 0. Must equal 0 to factor into two lines."
    )

    # ==========================================
    # 3.3 Circle
    # ==========================================
    docx_styler.add_topic_heading(doc, "3.3", "Circle")

    docx_styler.add_question(
        doc, 11,
        "Define a circle and derive the standard and general equations.",
        "A circle is the locus of a point moving in a plane such that its distance from a fixed point (center) is constant (radius r).\n"
        "• Standard form: With center (h, k) and radius r:\n"
        "  (x - h)² + (y - k)² = r².\n"
        "• General form: x² + y² + 2gx + 2fy + c = 0.\n"
        "  Completing squares: (x + g)² + (y + f)² = g² + f² - c.\n"
        "  - Center: (-g, -f) [half negative coefficient of x, half negative coefficient of y]\n"
        "  - Radius: r = √(g² + f² - c).\n"
        "  - Nature: Real circle if g² + f² - c > 0; Point circle if g² + f² - c = 0; Virtual (imaginary) circle if g² + f² - c < 0.",
        "Center = (-g, -f), radius = √(g² + f² - c). Real circle requires g² + f² > c."
    )

    docx_styler.add_question(
        doc, 12,
        "State the diameter form of a circle and formulas for intercepts made on coordinate axes.",
        "• Diameter form: Circle described on the line segment joining (x₁, y₁) and (x₂, y₂) as diameter:\n"
        "  (x - x₁)(x - x₂) + (y - y₁)(y - y₂) = 0.\n"
        "  (Derived because the angle subtended by a diameter at any circumference point is 90°: product of slopes = -1).\n"
        "• Intercepts made by general circle x² + y² + 2gx + 2fy + c = 0 on axes:\n"
        "  - Length of x-intercept = 2 √(g² - c) (touches x-axis if g² = c).\n"
        "  - Length of y-intercept = 2 √(f² - c) (touches y-axis if f² = c).",
        "Diameter form: (x - x₁)(x - x₂) + (y - y₁)(y - y₂) = 0. Intercepts: 2√(g² - c) and 2√(f² - c)."
    )

    docx_styler.add_question(
        doc, 13,
        "State the equation of tangent to a circle and length of tangent from an external point.",
        "For circle x² + y² + 2gx + 2fy + c = 0:\n"
        "• Tangent at point P(x₁, y₁) on the circle (T = 0):\n"
        "  x x₁ + y y₁ + g(x + x₁) + f(y + y₁) + c = 0.\n"
        "  (For x² + y² = a²: tangent is x x₁ + y y₁ = a²).\n"
        "• Length of tangent from external point P(x₁, y₁):\n"
        "  L = √(x₁² + y₁² + 2gx₁ + 2fy₁ + c) = √(S₁).\n"
        "• Condition of tangency for line y = mx + c to circle x² + y² = a²:\n"
        "  c² = a² (1 + m²) ⇔ c = ± a √(1 + m²).",
        "Tangent at point: T = 0. Tangent length from external point = √(S₁). Tangency condition: c = ±a√(1+m²)."
    )

    # ==========================================
    # 3.4 Coordinates in Space
    # ==========================================
    docx_styler.add_topic_heading(doc, "3.4", "Coordinates in Space")

    docx_styler.add_question(
        doc, 14,
        "Define 3D coordinates, distance formula, and section formula.",
        "In 3D Cartesian space ℝ³ with orthogonal axes X, Y, Z intersecting at origin (0, 0, 0):\n"
        "• Distance between P(x₁, y₁, z₁) and Q(x₂, y₂, z₂):\n"
        "  |PQ| = √[ (x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)² ].\n"
        "• Section formula (dividing segment PQ in ratio m : n):\n"
        "  - Internal: [(m x₂ + n x₁)/(m + n), (m y₂ + n y₁)/(m + n), (m z₂ + n z₁)/(m + n)]\n"
        "  - External: [(m x₂ - n x₁)/(m - n), (m y₂ - n y₁)/(m - n), (m z₂ - n z₁)/(m - n)].\n"
        "  - Midpoint: [(x₁ + x₂)/2, (y₁ + y₂)/2, (z₁ + z₂)/2].",
        "3D distance = √(Δx² + Δy² + Δz²). Midpoint = average of corresponding coordinates."
    )

    docx_styler.add_question(
        doc, 15,
        "Define Direction Cosines and Direction Ratios, and prove l² + m² + n² = 1.",
        "• Direction Angles: Angles α, β, γ made by a directed ray with positive x, y, z axes.\n"
        "• Direction Cosines (DC): l = cos α, m = cos β, n = cos γ.\n"
        "  Consider a unit vector along the line: u = (cos α)i + (cos β)j + (cos γ)k = li + mj + nk.\n"
        "  Since |u| = 1: |u|² = l² + m² + n² = 1! Always identically 1.\n"
        "• Direction Ratios (DR): Any three numbers a, b, c proportional to direction cosines: l/a = m/b = n/c = 1 / √(a² + b² + c²).\n"
        "  Hence: l = a / √(a² + b² + c²), m = b / √(a² + b² + c²), n = c / √(a² + b² + c²).",
        "Direction cosines are components of a unit vector: l² + m² + n² = 1. Ratios a, b, c are proportional numbers."
    )

    docx_styler.add_question(
        doc, 16,
        "State the angle between two lines in space and conditions for parallelism and perpendicularity.",
        "For two lines with direction cosines (l₁, m₁, n₁) and (l₂, m₂, n₂):\n"
        "cos θ = l₁ l₂ + m₁ m₂ + n₁ n₂.\n"
        "If direction ratios (a₁, b₁, c₁) and (a₂, b₂, c₂) are given:\n"
        "cos θ = (a₁ a₂ + b₁ b₂ + c₁ c₂) / [ √(a₁² + b₁² + c₁²) · √(a₂² + b₂² + c₂²) ].\n"
        "• Perpendicular lines (θ = 90° ⇒ cos θ = 0):\n"
        "  l₁ l₂ + m₁ m₂ + n₁ n₂ = 0  ⇔  a₁ a₂ + b₁ b₂ + c₁ c₂ = 0.\n"
        "• Parallel lines (θ = 0° or 180°):\n"
        "  l₁/l₂ = m₁/m₂ = n₁/n₂  ⇔  a₁/a₂ = b₁/b₂ = c₁/c₂.",
        "Perpendicular: a₁a₂ + b₁b₂ + c₁c₂ = 0. Parallel: a₁/a₂ = b₁/b₂ = c₁/c₂."
    )

    docx_styler.add_question(
        doc, 17,
        "State the general equation of a plane in 3D and the perpendicular distance from a point to a plane.",
        "• General equation of a plane: Ax + By + Cz + D = 0.\n"
        "  Geometric meaning: The coefficients (A, B, C) are the direction ratios of the NORMAL vector to the plane!\n"
        "• Intercept form: x/a + y/b + z/c = 1 (a, b, c are intercepts on x, y, z axes).\n"
        "• Perpendicular distance from point P(x₁, y₁, z₁) to the plane Ax + By + Cz + D = 0:\n"
        "  d = | A x₁ + B y₁ + C z₁ + D | / √(A² + B² + C²).\n"
        "• Distance between parallel planes Ax + By + Cz + D₁ = 0 and Ax + By + Cz + D₂ = 0:\n"
        "  d = | D₁ - D₂ | / √(A² + B² + C²).",
        "(A, B, C) are normal direction ratios. Perpendicular distance = |Ax₁+By₁+Cz₁+D| / √(A²+B²+C²)."
    )

    docx_styler.add_compare_section_header(doc, "3.1 — 3.4", "Analytic Geometry Matrices")
    docx_styler.add_compare_table(
        doc, "2D Geometry vs 3D Geometry Core Analogies",
        ["Geometric Object", "2D Plane", "3D Space"],
        [
            ["Point", "(x, y)", "(x, y, z)"],
            ["Distance", "√[(x₂ - x₁)² + (y₂ - y₁)²]", "√[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]"],
            ["Linear Equation", "Ax + By + C = 0 represents a LINE", "Ax + By + Cz + D = 0 represents a PLANE"],
            ["Normal Vector", "(A, B) perpendicular to the line", "(A, B, C) perpendicular to the plane"],
            ["Perpendicularity", "A₁A₂ + B₁B₂ = 0", "a₁a₂ + b₁b₂ + c₁c₂ = 0"],
            ["Distance to Plane/Line", "|Ax₁+By₁+C| / √(A²+B²)", "|Ax₁+By₁+Cz₁+D| / √(A²+B²+C²)"]
        ]
    )
    docx_styler.add_compare_table(
        doc, "Conditions for Pair of Lines ax² + 2hxy + by² = 0",
        ["Geometric Relationship", "Condition on Coefficients", "Angle θ", "Consequence"],
        [
            ["Perpendicular lines", "a + b = 0", "θ = 90°", "Lines are mutually orthogonal"],
            ["Coincident lines", "h² - ab = 0 (h² = ab)", "θ = 0°", "Both lines merge into one"],
            ["Distinct real lines", "h² - ab > 0", "0° < θ < 90°", "Two intersecting lines at origin"],
            ["Imaginary lines", "h² - ab < 0", "Undefined", "Only real intersection is (0, 0)"]
        ]
    )

    # ==========================================
    # Professor's Theory & Viva Bank
    # ==========================================
    docx_styler.add_viva_header(doc)

    docx_styler.add_viva_category(doc, "Derive", "deriving formulas & results")
    docx_styler.add_viva_question(
        doc, "Derive", 1,
        "Derive the formula for the perpendicular distance from point P(x₁, y₁) to the line Ax + By + C = 0.",
        "Let the line Ax + By + C = 0 intersect x-axis at Q(-C/A, 0) and y-axis at R(0, -C/B).\n"
        "Consider triangle PQR:\n"
        "Base QR = √[ (-C/A - 0)² + (0 - (-C/B))² ] = √[ C²/A² + C²/B² ] = (|C| / |AB|) √(A² + B²).\n"
        "Area of triangle PQR with vertices P(x₁, y₁), Q(-C/A, 0), R(0, -C/B):\n"
        "Area = (1/2) | x₁(0 - (-C/B)) + (-C/A)(-C/B - y₁) + 0(y₁ - 0) |\n"
        "= (1/2) | x₁(C/B) + C²/(AB) + (C/A)y₁ |\n"
        "= (1/2) (|C| / |AB|) | A x₁ + B y₁ + C |.\n"
        "On the other hand, Area = (1/2) · Base · Height = (1/2) · QR · d.\n"
        "Equating both expressions:\n"
        "(1/2) · (|C| / |AB|) √(A² + B²) · d = (1/2) · (|C| / |AB|) | A x₁ + B y₁ + C |.\n"
        "Cancelling common factors yields: d = | A x₁ + B y₁ + C | / √(A² + B²). Q.E.D."
    )

    docx_styler.add_viva_question(
        doc, "Derive", 2,
        "Derive the formula for the angle between the pair of straight lines ax² + 2hxy + by² = 0.",
        "Dividing by b x²: (y/x)² + (2h/b)(y/x) + (a/b) = 0.\n"
        "Let the lines be y = m₁x and y = m₂x. Then m₁ and m₂ are the roots of this quadratic:\n"
        "m₁ + m₂ = -2h/b and m₁ m₂ = a/b.\n"
        "We know tan θ = | (m₁ - m₂) / (1 + m₁ m₂) |.\n"
        "Now: (m₁ - m₂)² = (m₁ + m₂)² - 4 m₁ m₂ = (-2h/b)² - 4(a/b) = (4h² - 4ab)/b² = 4(h² - ab)/b².\n"
        "Taking square root: m₁ - m₂ = [2 √(h² - ab)] / b.\n"
        "Also: 1 + m₁ m₂ = 1 + a/b = (a + b)/b.\n"
        "Therefore: tan θ = | { [2 √(h² - ab)] / b } / { (a + b) / b } | = | 2 √(h² - ab) / (a + b) |. Q.E.D."
    )

    docx_styler.add_viva_category(doc, "State", "definitions, conditions & identities")
    docx_styler.add_viva_question(
        doc, "State", 3,
        "State the exact algebraic conditions under which ax² + 2hxy + by² = 0 represents perpendicular lines and coincident lines.",
        "1. Perpendicular lines: a + b = 0 (Coefficient of x² + Coefficient of y² = 0).\n"
        "2. Coincident lines: h² - ab = 0 ⇔ h² = ab."
    )

    docx_styler.add_viva_category(doc, "Explain", "working, principles & viva probing")
    docx_styler.add_viva_question(
        doc, "Explain", 4,
        "Explain why every pair of lines represented by a homogeneous equation ax² + 2hxy + by² = 0 must pass through the origin.",
        "In a homogeneous equation of degree 2, every single term has degree 2 (x², xy, y²). There are NO linear terms (x, y) and NO constant term.\n"
        "When coordinates of the origin (0, 0) are substituted into the LHS:\n"
        "a(0)² + 2h(0)(0) + b(0)² = 0 + 0 + 0 = 0 = RHS.\n"
        "The origin identically satisfies the equation regardless of the values of a, h, and b. Hence, both lines represented must pass through the origin."
    )

    docx_styler.add_viva_question(
        doc, "Viva", 5,
        "Why is l² + m² + n² = 1 for direction cosines, while a² + b² + c² is not necessarily 1 for direction ratios?",
        "Direction cosines (l, m, n) are the components of a UNIT vector: u = li + mj + nk, which has magnitude 1 by construction: |u|² = l² + m² + n² = 1.\n"
        "Direction ratios (a, b, c) are merely proportional scalars (a = k l, b = k m, c = k n for any non-zero scalar k).\n"
        "Then a² + b² + c² = k² (l² + m² + n²) = k². Unless k = ±1, a² + b² + c² will not equal 1."
    )

    docx_styler.add_viva_category(doc, "Numerical", "data & problem-based")
    docx_styler.add_viva_question(
        doc, "Numerical", 6,
        "Find the acute angle between the pair of straight lines x² - 5xy + 6y² = 0.",
        "Here a = 1, 2h = -5 ⇒ h = -5/2, b = 6.\n"
        "h² - ab = (-5/2)² - (1)(6) = 25/4 - 24/4 = 1/4.\n"
        "a + b = 1 + 6 = 7.\n"
        "tan θ = | 2 √(h² - ab) / (a + b) | = | 2 √(1/4) / 7 | = (2 · 1/2) / 7 = 1/7.\n"
        "Therefore, acute angle θ = arctan(1/7) ≈ 8.13°."
    )

    docx_styler.add_viva_question(
        doc, "Numerical", 7,
        "Find the perpendicular distance from the point P(2, -3, 4) to the plane 2x - 3y + 6z + 5 = 0.",
        "Using d = | A x₁ + B y₁ + C z₁ + D | / √(A² + B² + C²):\n"
        "Numerator = | 2(2) - 3(-3) + 6(4) + 5 | = | 4 + 9 + 24 + 5 | = |42| = 42.\n"
        "Denominator = √[ 2² + (-3)² + 6² ] = √[ 4 + 9 + 36 ] = √49 = 7.\n"
        "Distance d = 42 / 7 = 6 units."
    )

    # ==========================================
    # Quick-Math Memos
    # ==========================================
    memos = [
        "Normal form of line: x cos α + y sin α = p (p ≥ 0). Distance from (x₁,y₁) to line: |Ax₁+By₁+C| / √(A²+B²).",
        "Distance between parallel lines: |C₁ - C₂| / √(A² + B²).",
        "Family of lines: L₁ + λ L₂ = 0 passes through intersection of L₁ and L₂.",
        "Angle between pair of lines: tan θ = 2√(h² - ab) / (a + b).",
        "Perpendicular pair of lines: a + b = 0. Coincident pair: h² = ab.",
        "Bisectors of pair of lines: (x² - y²) / (a - b) = xy / h. Always mutually perpendicular.",
        "General 2nd degree represents pair of lines iff: Δ = abc + 2fgh - af² - bg² - ch² = 0.",
        "Circle: x² + y² + 2gx + 2fy + c = 0 has Center (-g, -f), Radius √(g² + f² - c).",
        "Diameter form of circle: (x - x₁)(x - x₂) + (y - y₁)(y - y₂) = 0.",
        "Tangent to circle at point: T = 0. Length of tangent from external point = √(S₁).",
        "Direction cosines: l² + m² + n² = 1. Relation to ratios: l = a/√(a²+b²+c²).",
        "3D Perpendicular lines: a₁a₂ + b₁b₂ + c₁c₂ = 0. Parallel lines: a₁/a₂ = b₁/b₂ = c₁/c₂.",
        "Plane: Ax + By + Cz + D = 0. Normal vector = (A, B, C). Distance = |Ax₁+By₁+Cz₁+D| / √(A²+B²+C²)."
    ]
    docx_styler.add_quick_memos_section(doc, memos)

    target_path = "C:/Users/ASUS/Math_XI_Unit_Docs/Math_XI_Unit_03_analytic-geometry.docx"
    doc.save(target_path)
    print(f"Successfully generated {target_path}")

if __name__ == '__main__':
    build()
