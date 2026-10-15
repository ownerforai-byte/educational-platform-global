import sys
sys.path.insert(0, 'c:/Users/ASUS/Desktop/rn/scripts/math_docs')
import docx_styler

def build():
    doc = docx_styler.init_document()
    docx_styler.add_header_block(
        doc,
        unit_no=4,
        unit_name="Vectors",
        area_name="Content area 4 (Mat. 007)"
    )

    # ==========================================
    # 4.1 Vector Algebra & Foundations
    # ==========================================
    docx_styler.add_topic_heading(doc, "4.1", "Vector Algebra & Foundations")

    docx_styler.add_question(
        doc, 1,
        "Define scalar and vector quantities, position vector, and unit vector.",
        "• Scalar: A physical quantity completely specified by magnitude and unit only (e.g., mass, time, speed, temperature, work, energy).\n"
        "• Vector: A quantity possessing both magnitude and direction, obeying the laws of vector addition (e.g., displacement, velocity, acceleration, force, momentum).\n"
        "• Position Vector: The vector r = OP representing the displacement of a point P(x, y, z) relative to a fixed origin O(0, 0, 0): r = x i + y j + z k, with magnitude |r| = √(x² + y² + z²).\n"
        "• Unit Vector: A vector having magnitude unity (1). The unit vector along vector a is â = a / |a|.",
        "Unit vector: â = a / |a|. Position vector of P(x, y, z) is r = xi + yj + zk."
    )

    docx_styler.add_question(
        doc, 2,
        "Define collinear and coplanar vectors with algebraic and geometric conditions.",
        "• Collinear (Parallel) Vectors: Vectors whose lines of action are parallel to the same straight line, regardless of magnitude or sense. Two non-zero vectors a and b are collinear if and only if one is a scalar multiple of the other: a = k b, or equivalently a × b = 0.\n"
        "• Coplanar Vectors: Vectors whose lines of action lie in or are parallel to the same geometric plane. Any two vectors are always coplanar. Three vectors a, b, c are coplanar if and only if their scalar triple product vanishes: [a b c] = a · (b × c) = 0.",
        "Collinear: a = k b ⇔ a × b = 0. Coplanar (3 vectors): a · (b × c) = 0."
    )

    docx_styler.add_question(
        doc, 3,
        "Explain linear combinations, linear dependence, and linear independence of vectors.",
        "• Linear Combination: A vector v is a linear combination of vectors a, b, c if v = α a + β b + γ c for scalars α, β, γ.\n"
        "• Linear Dependence: Vectors a, b, c are linearly dependent if there exist scalars α, β, γ (NOT all zero) such that:\n"
        "  α a + β b + γ c = 0.\n"
        "  Geometrically in 3D: Three vectors are linearly dependent if and only if they are COPLANAR (one can be expressed as a combination of the other two).\n"
        "• Linear Independence: Vectors are linearly independent if α a + β b + γ c = 0 implies ONLY the trivial solution α = β = γ = 0. In 3D space, any three non-coplanar vectors form a linearly independent basis.",
        "Independent: αa + βb + γc = 0 ⇒ all scalars are 0. In 3D: 3 vectors independent ⇔ Non-coplanar."
    )

    docx_styler.add_question(
        doc, 4,
        "State the section formula for vectors dividing a line segment in a given ratio.",
        "Let points A and B have position vectors a and b relative to origin O.\n"
        "• Internal division: The position vector r of point P dividing segment AB internally in ratio m : n is:\n"
        "  r = (m b + n a) / (m + n).\n"
        "• External division: Dividing externally in ratio m : n:\n"
        "  r = (m b - n a) / (m - n).\n"
        "• Midpoint formula: r = (a + b) / 2.\n"
        "• Centroid of a triangle ABC: G = (a + b + c) / 3.",
        "Internal: (mb + na)/(m + n). Centroid: (a + b + c)/3."
    )

    # ==========================================
    # 4.2 Scalar (Dot) Product
    # ==========================================
    docx_styler.add_topic_heading(doc, "4.2", "Scalar (Dot) Product")

    docx_styler.add_question(
        doc, 5,
        "Define the scalar (dot) product and state its algebraic and geometric properties.",
        "The scalar product of two vectors a and b is a real number defined by:\n"
        "a · b = |a| |b| cos θ,\n"
        "where θ is the angle between them (0 ≤ θ ≤ π).\n"
        "Component form: (a₁i + a₂j + a₃k) · (b₁i + b₂j + b₃k) = a₁b₁ + a₂b₂ + a₃b₃.\n"
        "Key Properties:\n"
        "1. Commutative: a · b = b · a.\n"
        "2. Distributive: a · (b + c) = a · b + a · c.\n"
        "3. Self-product: a · a = |a|² (magnitude squared!).\n"
        "4. Orthogonality: For non-zero vectors, a ⊥ b ⇔ a · b = 0.\n"
        "5. Unit vectors: i · i = j · j = k · k = 1 and i · j = j · k = k · i = 0.",
        "a · b = a₁b₁ + a₂b₂ + a₃b₃. Perpendicular ⇔ a · b = 0. Self dot: a · a = |a|²."
    )

    docx_styler.add_question(
        doc, 6,
        "Define scalar projection and vector projection of one vector onto another.",
        "• Scalar Projection of vector a on vector b: The signed orthogonal shadow of a along the direction of b:\n"
        "  proj_b(a) = |a| cos θ = (a · b) / |b| = a · b̂.\n"
        "• Vector Projection of a on b: The vector having magnitude equal to the scalar projection and directed along b̂:\n"
        "  v_proj = [ (a · b) / |b| ] b̂ = [ (a · b) / |b|² ] b.\n"
        "Similarly, scalar projection of b on a is (a · b) / |a|.",
        "Scalar projection of a on b = (a · b) / |b|. Vector projection = [(a · b)/|b|²] b."
    )

    docx_styler.add_question(
        doc, 7,
        "Prove vectorially that the angle in a semicircle is a right angle.",
        "Let AB be the diameter of a circle centered at origin O. Let the radius be r.\n"
        "Position vector of A is -a and position vector of B is a (so |a| = r).\n"
        "Let P be any point on the semicircle with position vector p. Since P lies on the circle, |p| = r ⇒ |p|² = |a|².\n"
        "Vector PA = a_A - p = -a - p = -(p + a).\n"
        "Vector PB = a_B - p = a - p = -(p - a).\n"
        "Take the dot product of PA and PB:\n"
        "PA · PB = [-(p + a)] · [-(p - a)] = (p + a) · (p - a) = |p|² - |a|².\n"
        "Since |p|² = |a|² = r²: PA · PB = r² - r² = 0.\n"
        "Since PA · PB = 0 and neither is zero, PA ⊥ PB. Thus, ∠APB = 90°. Q.E.D.",
        "(p + a) · (p - a) = |p|² - |a|² = r² - r² = 0. Proves angle is 90° in two lines!"
    )

    # ==========================================
    # 4.3 Vector (Cross) Product
    # ==========================================
    docx_styler.add_topic_heading(doc, "4.3", "Vector (Cross) Product")

    docx_styler.add_question(
        doc, 8,
        "Define the vector (cross) product, right-hand rule, and determinant calculation.",
        "The vector product of two vectors a and b is a VECTOR defined by:\n"
        "a × b = |a| |b| sin θ n̂,\n"
        "where θ is the angle between them (0 ≤ θ ≤ π), and n̂ is a unit vector perpendicular to both a and b, directed by the Right-Hand Rule.\n"
        "Determinant component form:\n"
        "a × b = | i   j   k  |\n"
        "        | a₁  a₂  a₃ |\n"
        "        | b₁  b₂  b₃ | = (a₂b₃ - a₃b₂)i - (a₁b₃ - a₃b₁)j + (a₁b₂ - a₂b₁)k.\n"
        "Key Properties:\n"
        "1. Anti-commutative: a × b = -(b × a).\n"
        "2. Parallel condition: For non-zero vectors, a ∥ b ⇔ a × b = 0.\n"
        "3. Self-cross: a × a = 0.\n"
        "4. Unit vectors: i × j = k, j × k = i, k × i = j; and i × i = j × j = k × k = 0.",
        "Cross product produces a vector orthogonal to both! a × b = -(b × a). Parallel ⇔ a × b = 0."
    )

    docx_styler.add_question(
        doc, 9,
        "State geometric applications of the cross product: area of triangle, parallelogram, and unit normal.",
        "1. Area of Parallelogram with adjacent sides a and b:\n"
        "   Area = |a × b| = |a| |b| sin θ.\n"
        "2. Area of Parallelogram with diagonals d₁ and d₂:\n"
        "   Area = (1/2) |d₁ × d₂|.\n"
        "3. Area of Triangle with adjacent sides a and b:\n"
        "   Area = (1/2) |a × b|.\n"
        "   (For vertices with position vectors a, b, c: Area = (1/2) |a × b + b × c + c × a|).\n"
        "4. Unit vector perpendicular to both a and b:\n"
        "   n̂ = ± (a × b) / |a × b|.",
        "Parallelogram area = |a × b|. Triangle area = (1/2)|a × b|. Unit normal = ±(a × b)/|a × b|."
    )

    docx_styler.add_question(
        doc, 10,
        "Explain torque (moment of a force) as a physical application of the cross product.",
        "The moment (or torque) τ of a force F acting at a point P with position vector r relative to a pivot point O is:\n"
        "τ = r × F.\n"
        "Magnitude: |τ| = |r| |F| sin θ = F · (r sin θ) = Force × Perpendicular distance to the line of action.\n"
        "Direction: By the right-hand rule, perpendicular to the plane containing r and F, indicating the axis of rotation.",
        "Torque τ = r × F. Cross product naturally encodes rotational tendency and direction."
    )

    # ==========================================
    # 4.4 Scalar Triple Product
    # ==========================================
    docx_styler.add_topic_heading(doc, "4.4", "Scalar Triple Product")

    docx_styler.add_question(
        doc, 11,
        "Define the scalar triple product, its determinant evaluation, and cyclic symmetry.",
        "The scalar triple product (or box product) of three vectors a, b, c is defined as:\n"
        "[a b c] = a · (b × c).\n"
        "Determinant Form:\n"
        "[a b c] = | a₁  a₂  a₃ |\n"
        "          | b₁  b₂  b₃ |\n"
        "          | c₁  c₂  c₃ |\n"
        "Properties:\n"
        "1. Cyclic Permutations: The value remains unchanged under cyclic shifts:\n"
        "   [a b c] = [b c a] = [c a b].\n"
        "2. Anti-cyclic Swaps: Swapping any two vectors changes the sign:\n"
        "   [a b c] = -[b a c] = -[a c b] = -[c b a].\n"
        "3. Dot and Cross Interchange: a · (b × c) = (a × b) · c.\n"
        "4. Repeated Vectors: If any two vectors are identical (or collinear), the product is zero: [a a b] = 0.",
        "[a b c] = det[a, b, c]. Cyclic shifts preserve value; swapping any two flips sign."
    )

    docx_styler.add_question(
        doc, 12,
        "Explain the geometric interpretations of the scalar triple product: volume of parallelepiped and tetrahedron.",
        "1. Volume of Parallelepiped: Formed by coterminous vectors a, b, c:\n"
        "   Base area = |b × c|; Height h = |a| |cos φ| where φ is angle between a and normal n̂ = (b × c)/|b × c|.\n"
        "   Volume = Base × Height = |b × c| · [ |a · (b × c)| / |b × c| ] = |a · (b × c)| = |[a b c]|.\n"
        "2. Volume of Tetrahedron: Formed by coterminous edges a, b, c:\n"
        "   Volume = (1/6) |[a b c]|.\n"
        "3. Coplanarity Test: Three vectors a, b, c are coplanar if and only if [a b c] = 0 (the volume of the parallelepiped collapses to zero!).",
        "Volume of parallelepiped = |[a b c]|. Volume of tetrahedron = (1/6)|[a b c]|. Coplanar ⇔ [a b c] = 0."
    )

    docx_styler.add_question(
        doc, 13,
        "Define work done by a constant force as a physical application of the dot product.",
        "When a constant force F acts on a body causing a displacement d = AB (from initial position A to final position B), the work done W is the scalar product:\n"
        "W = F · d = |F| |d| cos θ.\n"
        "Physical cases:\n"
        "• θ < 90° (acute): W > 0 (force accelerates or assists motion).\n"
        "• θ = 90° (perpendicular): W = 0 (no work done, e.g., centripetal force in circular motion).\n"
        "• θ > 90° (obtuse): W < 0 (force opposes motion, e.g., friction).",
        "W = F · d. Perpendicular forces do ZERO work (cos 90° = 0)."
    )

    docx_styler.add_compare_section_header(doc, "4.1 — 4.4", "Vector Matrices")
    docx_styler.add_compare_table(
        doc, "Scalar (Dot) Product vs Vector (Cross) Product",
        ["Feature", "Scalar Product (a · b)", "Vector Product (a × b)"],
        [
            ["Result Nature", "Scalar (real number)", "Vector (has direction via right-hand rule)"],
            ["Formula", "|a| |b| cos θ", "|a| |b| sin θ n̂"],
            ["Commutativity", "Commutative: a · b = b · a", "Anti-commutative: a × b = -(b × a)"],
            ["Zero Condition", "a ⊥ b (orthogonal, cos 90° = 0)", "a ∥ b (parallel, sin 0° = 0)"],
            ["Self Operation", "a · a = |a|²", "a × a = 0"],
            ["Geometric Meaning", "Length of projection / shadow", "Area of spanned parallelogram"],
            ["Physical Analog", "Work done W = F · d", "Torque τ = r × F"]
        ]
    )
    docx_styler.add_compare_table(
        doc, "Linear Dependence vs Independence in Vectors",
        ["Property", "Linearly Dependent", "Linearly Independent"],
        [
            ["Algebraic Definition", "αa + βb + γc = 0 with NOT all scalars zero", "αa + βb + γc = 0 ONLY when α = β = γ = 0"],
            ["Geometric Status (3D)", "All vectors are COPLANAR", "Vectors are NON-COPLANAR"],
            ["Scalar Triple Product", "[a b c] = 0", "[a b c] ≠ 0"],
            ["Redundancy", "At least one vector is redundant", "No vector can be formed by the others (forms a basis)"]
        ]
    )

    # ==========================================
    # Professor's Theory & Viva Bank
    # ==========================================
    docx_styler.add_viva_header(doc)

    docx_styler.add_viva_category(doc, "Prove", "proofs & theorems")
    docx_styler.add_viva_question(
        doc, "Prove", 1,
        "Prove Apollonius' Theorem using vector algebra: AB² + AC² = 2(AD² + BD²) where D is the midpoint of BC.",
        "Let vertex A be the origin. Let position vector of B be b and C be c.\n"
        "Since D is the midpoint of BC, its position vector is d = (b + c) / 2.\n"
        "Now evaluate terms:\n"
        "1. AB² = |b|² and AC² = |c|² ⇒ AB² + AC² = |b|² + |c|².\n"
        "2. AD² = |d|² = |(b + c)/2|² = (1/4) |b + c|² = (1/4) [|b|² + |c|² + 2(b · c)].\n"
        "3. BD = d - b = (b + c)/2 - b = (c - b)/2.\n"
        "   BD² = |(c - b)/2|² = (1/4) |c - b|² = (1/4) [|b|² + |c|² - 2(b · c)].\n"
        "Adding AD² and BD²:\n"
        "AD² + BD² = (1/4) [2 |b|² + 2 |c|²] = (1/2) (|b|² + |c|²).\n"
        "Multiplying by 2:\n"
        "2(AD² + BD²) = |b|² + |c|² = AB² + AC². Q.E.D."
    )

    docx_styler.add_viva_question(
        doc, "Prove", 2,
        "Prove vectorially that the diagonals of a rhombus are perpendicular to each other.",
        "Let ABCD be a rhombus. Let vector AB = a and AD = b.\n"
        "Since ABCD is a rhombus, all sides are equal in length: |a| = |b|.\n"
        "The two diagonals are:\n"
        "• Diagonal AC = AB + BC = a + b (since BC = AD = b).\n"
        "• Diagonal BD = AD - AB = b - a.\n"
        "Take the scalar product of the diagonals AC and BD:\n"
        "AC · BD = (a + b) · (b - a) = (b + a) · (b - a) = |b|² - |a|².\n"
        "Since |a| = |b| in a rhombus: AC · BD = |b|² - |b|² = 0.\n"
        "Since AC · BD = 0, diagonal AC is perpendicular to diagonal BD. Q.E.D."
    )

    docx_styler.add_viva_category(doc, "Derive", "deriving formulas & results")
    docx_styler.add_viva_question(
        doc, "Derive", 3,
        "Derive the Sine Law of triangles using the vector cross product.",
        "In triangle ABC, let vector BC = a, CA = b, AB = c.\n"
        "Since the vectors form a closed triangle: a + b + c = 0.\n"
        "Take cross product with a:\n"
        "a × (a + b + c) = a × 0 ⇒ a × a + a × b + a × c = 0.\n"
        "Since a × a = 0 and a × c = -(c × a): a × b = c × a.\n"
        "Next, take cross product of (a + b + c = 0) with b:\n"
        "b × a + b × b + b × c = 0 ⇒ b × c = -(b × a) = a × b.\n"
        "Combining both yields: a × b = b × c = c × a.\n"
        "Taking magnitudes:\n"
        "|a × b| = |b × c| = |c × a|.\n"
        "Notice the angle between vectors BC(a) and CA(b) is (180° - C):\n"
        "|a × b| = ab sin(180° - C) = ab sin C.\n"
        "Similarly: |b × c| = bc sin A and |c × a| = ca sin B.\n"
        "Thus: bc sin A = ca sin B = ab sin C.\n"
        "Dividing across by abc:\n"
        "(sin A)/a = (sin B)/b = (sin C)/c ⇔ a / sin A = b / sin B = c / sin C. Q.E.D."
    )

    docx_styler.add_viva_category(doc, "Explain", "working, principles & viva probing")
    docx_styler.add_viva_question(
        doc, "Explain", 4,
        "Explain why a · (b × c) = 0 is both the necessary and sufficient condition for vectors a, b, c to be coplanar.",
        "The cross product b × c produces a vector perpendicular to the plane spanned by b and c.\n"
        "The scalar product a · (b × c) projects vector a onto this normal vector.\n"
        "If a · (b × c) = 0, the projection of a along the normal is zero, which means vector a has no component outside the plane of b and c. Thus, a must lie entirely in that same plane, meaning a, b, c are coplanar.\n"
        "Conversely, if they are coplanar, the parallelepiped they form has zero height, so its volume |[a b c]| = 0."
    )

    docx_styler.add_viva_question(
        doc, "Viva", 5,
        "Why is the cross product anti-commutative (a × b = - b × a) rather than commutative?",
        "The direction of a × b is determined by the right-hand rule: curling fingers from a to b points the thumb along +n̂.\n"
        "When reversing the order to b × a, curling fingers from b to a points the thumb in the exact opposite direction (-n̂).\n"
        "Since the magnitude |a||b|sin θ remains unchanged but the unit direction vector reverses sign, we have b × a = - (a × b)."
    )

    docx_styler.add_viva_category(doc, "Numerical", "data & problem-based")
    docx_styler.add_viva_question(
        doc, "Numerical", 6,
        "Find the volume of the parallelepiped whose coterminous edges are a = (2, -3, 4), b = (1, 2, -1), and c = (3, -1, 2).",
        "Volume V = |[a b c]| = |det M| where:\n"
        "det M = | 2  -3   4 |\n"
        "        | 1   2  -1 |\n"
        "        | 3  -1   2 |\n"
        "Expand along Row 1:\n"
        "= 2 [2(2) - (-1)(-1)] - (-3) [1(2) - (-1)(3)] + 4 [1(-1) - 2(3)]\n"
        "= 2 [4 - 1] + 3 [2 + 3] + 4 [-1 - 6]\n"
        "= 2(3) + 3(5) + 4(-7) = 6 + 15 - 28 = -7.\n"
        "Volume = |-7| = 7 cubic units."
    )

    docx_styler.add_viva_question(
        doc, "Numerical", 7,
        "A force F = 3i + 2j - 4k moves a particle from A(1, -1, 2) to B(3, 2, -1). Calculate the work done.",
        "Displacement vector d = AB = r_B - r_A = (3 - 1)i + (2 - (-1))j + (-1 - 2)k = 2i + 3j - 3k.\n"
        "Work done W = F · d = (3i + 2j - 4k) · (2i + 3j - 3k)\n"
        "= (3)(2) + (2)(3) + (-4)(-3)\n"
        "= 6 + 6 + 12 = 24 units of work."
    )

    # ==========================================
    # Quick-Math Memos
    # ==========================================
    memos = [
        "Unit vector: â = a / |a|. Collinear: a = k b ⇔ a × b = 0.",
        "Dot Product: a · b = |a||b|cos θ = a₁b₁ + a₂b₂ + a₃b₃. Perpendicular ⇔ a · b = 0.",
        "Self dot product: a · a = |a|². Scalar projection of a on b = (a · b) / |b|.",
        "Vector projection of a on b = [(a · b) / |b|²] b.",
        "Cross Product: a × b = |a||b|sin θ n̂ = -(b × a). Parallel ⇔ a × b = 0.",
        "Area of parallelogram = |a × b|. Area of triangle = (1/2)|a × b|.",
        "Scalar Triple Product: [a b c] = a · (b × c) = det[a, b, c].",
        "Volume of parallelepiped = |[a b c]|. Volume of tetrahedron = (1/6)|[a b c]|.",
        "Coplanar vectors: [a b c] = 0 (linearly dependent in 3D).",
        "Physical Applications: Work done W = F · d (scalar). Torque τ = r × F (vector)."
    ]
    docx_styler.add_quick_memos_section(doc, memos)

    target_path = "C:/Users/ASUS/Math_XI_Unit_Docs/Math_XI_Unit_04_vectors.docx"
    doc.save(target_path)
    print(f"Successfully generated {target_path}")

if __name__ == '__main__':
    build()
