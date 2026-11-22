/**
 * Unit 4 — Vectors: NEB model paper, Set B (75 marks, 3 hours).
 */

export const PAPERS = [
  {
    unitNo: 4,
    title: "Unit 4 — Vectors",
    set: "B",
    note: "Set B is heavier on proofs: state the product you are using, then write the steps in order — an unsupported 'hence proved' earns only the first mark.",
    A: [
      ["Two non-zero vectors are parallel when", ["a·b = 0", "a × b = 0", "|a| = |b|", "a·b = 1"], 2, "a zero cross product means the same direction line"],
      ["The value of |i + j + k| is", ["1", "√2", "√3", "3"], 3, "√(1 + 1 + 1)"],
      ["If a·b = |a||b|, the angle between a and b is", ["0°", "45°", "90°", "180°"], 1, "cosθ = 1"],
      ["The value of j × i is", ["k", "−k", "0", "j"], 2, "reversing the order reverses the sense"],
      ["The scalar triple product gives the", ["area of a triangle", "volume of a parallelepiped", "angle between vectors", "unit vector"], 2, "volume = |[a b c]|"],
      ["The unit vector along k is", ["i", "j", "k", "0"], 3, "k already has unit length"],
      ["If a = i + j and b = i − j, then a·b is", ["0", "1", "2", "−2"], 1, "1 − 1 = 0"],
      ["|a × b| equals", ["|a||b|", "|a||b|cosθ", "|a||b|sinθ", "a·b"], 3, "the magnitude of the cross product"],
      ["The vectors 2i and 3i are", ["parallel", "perpendicular", "equal", "coplanar but skew"], 1, "one is a scalar multiple of the other"],
      ["The projection of i + j on i is", ["0", "1", "√2", "2"], 2, "(1)/1 = 1"],
      ["If a ⊥ b with |a| = 2, |b| = 3, then |a + b| is", ["√5", "√13", "5", "√7"], 2, "√(4 + 9) because a·b = 0"],
    ],
    B: [
      [
        "Find a unit vector in the direction of 2i − j + 2k.",
        "1. |2i − j + 2k| = √(4 + 1 + 4) = 3\n2. divide each component by 3",
        "(2i − j + 2k)/3",
      ],
      [
        "Find the angle between i and i + j.",
        "1. a·b = 1(1) + 0(1) + 0 = 1\n2. |a| = 1, |b| = √2\n3. cosθ = 1/√2",
        "θ = 45°",
      ],
      [
        "Find λ so that a = 2i + λj + k and b = i − 2j + 3k are perpendicular.",
        "1. a·b = 0\n2. 2(1) + λ(−2) + 1(3) = 0\n3. 5 − 2λ = 0",
        "λ = 5/2",
      ],
      [
        "Find the area of the triangle with vertices (1, 0, 0), (0, 1, 0) and (0, 0, 2).",
        "1. AB = (−1, 1, 0), AC = (−1, 0, 2)\n2. AB × AC = (1(2) − 0, 0(−1) − (−1)(2), 0 + 1) = (2, 2, 1)\n3. |AB × AC| = √9 = 3\n4. area = half of that",
        "area = 3/2 square units",
      ],
      [
        "Show that i + j and i − j are perpendicular.",
        "1. (i + j)·(i − j) = 1 − 1 + 0\n2. = 0\n3. a zero dot product with non-zero vectors means a right angle",
        "(i + j)·(i − j) = 0, so they are perpendicular",
      ],
      [
        "Find the scalar triple product of i, j and k and interpret it.",
        "1. [i j k] = i·(j × k) = i·i\n2. = 1\n3. it is the volume of the unit cube",
        "[i j k] = 1 cubic unit",
      ],
      [
        "If |a| = |b|, prove that (a + b)·(a − b) = 0.",
        "1. (a + b)·(a − b) = a·a − a·b + b·a − b·b\n2. = |a|² − |b|²\n3. since |a| = |b|, this is 0",
        "(a + b)·(a − b) = |a|² − |b|² = 0",
      ],
      [
        "Find the component of 3i + 4j along i.",
        "1. component = (a·b)/|b| with b = i\n2. = 3/1",
        "component = 3 units along i",
      ],
    ],
    C: [
      [
        "Using vectors, prove that the diagonals of a rhombus are perpendicular.",
        "1. let the rhombus be OACB with OA = a and OB = b, where |a| = |b|\n2. the diagonals are OC = a + b and AB = b − a\n3. (a + b)·(b − a) = a·b − |a|² + |b|² − a·b\n4. = |b|² − |a|²\n5. since the sides are equal, this is 0\n6. so the diagonals meet at a right angle",
        "the diagonals of a rhombus are perpendicular",
      ],
      [
        "Find the volume of the tetrahedron with vertices (0, 0, 0), (1, 2, 3), (2, 1, 1) and (3, 2, 1).",
        "1. the three edge vectors from the origin are (1, 2, 3), (2, 1, 1), (3, 2, 1)\n2. determinant = 1(1 − 2) − 2(2 − 3) + 3(4 − 3)\n3. = −1 + 2 + 3 = 4\n4. tetrahedron volume = |determinant|/6\n5. = 4/6\n6. = 2/3",
        "volume = 2/3 cubic units",
      ],
      [
        "Prove that |a + b| ≤ |a| + |b|, and state when equality holds.",
        "1. |a + b|² = |a|² + 2a·b + |b|²\n2. a·b ≤ |a||b|, so |a + b|² ≤ |a|² + 2|a||b| + |b|²\n3. the right side is (|a| + |b|)²\n4. taking square roots gives the inequality\n5. equality needs a·b = |a||b|\n6. that happens exactly when a and b point the same way",
        "|a + b| ≤ |a| + |b|, with equality when a and b are parallel and in the same sense",
      ],
    ],
  },
];
