/**
 * Unit 4 — Vectors: NEB model paper (75 marks, 3 hours).
 * A: [question, [4 options], answerIndex, why?] · B/C: [question, worked answer, answer line]
 */

export const PAPERS = [
  {
    unitNo: 4,
    title: "Unit 4 — Vectors",
    note: "Write vectors with an arrow or in component form throughout; a proof in Group C must state which product (dot, cross, scalar triple) each step uses.",
    A: [
      ["If a·b = 0 with a ≠ 0 and b ≠ 0, then a and b are", ["parallel", "perpendicular", "equal", "opposite"], 2, "a zero dot product means a right angle"],
      ["The value of |i × j| is", ["0", "1", "−1", "√2"], 2, "i × j = k, and |k| = 1"],
      ["If a = 2i + j and b = i − j, then a·b is", ["1", "3", "−1", "0"], 1, "2 − 1 = 1"],
      ["The value of i·(j × k) is", ["0", "1", "−1", "3"], 2, "j × k = i and i·i = 1"],
      ["The unit vector along 3i + 4j is", ["(3i + 4j)/7", "(3i + 4j)/5", "(3i + 4j)/25", "(i + j)/5"], 2, "|3i + 4j| = 5"],
      ["If |a| = 3, |b| = 4 and a·b = 12, the angle between them is", ["0°", "30°", "60°", "90°"], 1, "cosθ = 12/12 = 1"],
      ["If [a b c] = 0, then a, b, c are", ["coplanar", "mutually perpendicular", "unit vectors", "collinear"], 1, "a zero scalar triple product means zero volume"],
      ["The area of the parallelogram with sides i and j is", ["0", "1", "2", "√2"], 2, "|i × j| = 1"],
      ["The value of a × a is", ["a²", "0", "2a", "|a|"], 2, "the cross product of a vector with itself vanishes"],
      ["If a = i + j + k, then |a| is", ["1", "√3", "3", "√2"], 2, "√(1 + 1 + 1) = √3"],
      ["The projection of a on b is", ["(a·b)/|a|", "(a·b)/|b|", "(a×b)/|b|", "|a||b|"], 2, "component length = (a·b)/|b|"],
    ],
    B: [
      [
        "Find the angle between a = i + j and b = j + k.",
        "1. a·b = (1)(0) + (1)(1) + (0)(1) = 1\n2. |a| = √2 and |b| = √2\n3. cosθ = 1/2\n4. θ = 60°",
        "θ = 60°",
      ],
      [
        "Show that the points A(1, 2, 3), B(2, 4, 5) and C(3, 6, 7) are collinear.",
        "1. AB = (1, 2, 2)\n2. AC = (2, 4, 4)\n3. AC = 2AB, so the two vectors are parallel\n4. they share the point A, hence the three points lie on one line",
        "AB ∥ AC, so A, B, C are collinear (B is the midpoint of AC)",
      ],
      [
        "Find λ so that i + λj + k and 2i + j + k are perpendicular.",
        "1. perpendicular ⇒ dot product zero\n2. (1)(2) + (λ)(1) + (1)(1) = 0\n3. 3 + λ = 0",
        "λ = −3",
      ],
      [
        "Find the area of the triangle with vertices (1, 0, 0), (0, 1, 0) and (0, 0, 1).",
        "1. AB = (−1, 1, 0), AC = (−1, 0, 1)\n2. AB × AC = (1(1) − 0(0), 0(−1) − (−1)(1), 0 + 1) = (1, 1, 1)\n3. |AB × AC| = √3\n4. area = ½√3",
        "area = √3/2 square units",
      ],
      [
        "Resolve a = 2i + 3j along and perpendicular to b = i + j.",
        "1. a·b = 2 + 3 = 5, |b|² = 2\n2. component along b = (5/2)(i + j) = (5/2)i + (5/2)j\n3. perpendicular part = a − that = (2 − 2.5)i + (3 − 2.5)j\n4. = −0.5i + 0.5j",
        "along b: (5/2)(i + j); perpendicular: −½i + ½j",
      ],
      [
        "Prove that |a + b|² + |a − b|² = 2(|a|² + |b|²).",
        "1. |a + b|² = (a + b)·(a + b) = |a|² + 2a·b + |b|²\n2. |a − b|² = |a|² − 2a·b + |b|²\n3. add: the ±2a·b cancels\n4. = 2|a|² + 2|b|²",
        "|a + b|² + |a − b|² = 2(|a|² + |b|²)",
      ],
      [
        "Find the volume of the parallelepiped with edges a = i + 2j + 3k, b = j + 2k and c = k.",
        "1. compute [a b c] = |1 2 3; 0 1 2; 0 0 1|\n2. expand along the first column: 1(1·1 − 2·0) = 1\n3. volume = |[a b c]|",
        "volume = 1 cubic unit",
      ],
      [
        "Find λ so that the points (0, 0, 0), (1, 1, 1), (1, 2, 3) and (λ, 3, 4) are coplanar.",
        "1. AB = (1, 1, 1), AC = (1, 2, 3), AD = (λ, 3, 4)\n2. coplanar ⇒ [AB AC AD] = 0\n3. determinant = 1(8 − 9) − 1(4 − 3λ) + 1(3 − 2λ)\n4. = −1 − 4 + 3λ + 3 − 2λ = λ − 2\n5. λ − 2 = 0",
        "λ = 2",
      ],
    ],
    C: [
      [
        "If a + b + c = 0 with |a| = 3, |b| = 5 and |c| = 7, find the angle between a and b.",
        "1. c = −(a + b), so |c|² = |a + b|²\n2. 49 = |a|² + 2a·b + |b|²\n3. 49 = 9 + 25 + 2a·b ⇒ a·b = 7.5\n4. cosθ = a·b/(|a||b|) = 7.5/15\n5. = 1/2\n6. θ = 60°",
        "the angle between a and b is 60°",
      ],
      [
        "Using vectors, prove that the diagonals of a parallelogram bisect each other.",
        "1. take the parallelogram OACB with OA = a and OB = b, so OC = a + b\n2. diagonal AB joins A(a) to B(b): its midpoint is (a + b)/2\n3. diagonal OC joins O(0) to C(a + b): its midpoint is (a + b)/2\n4. the two midpoints are the same vector, so the diagonals meet at that point\n5. each diagonal is bisected there",
        "both diagonals have midpoint ½(a + b), so they bisect each other",
      ],
      [
        "For a = i + 2j − k, b = 2i − j + 3k and c = 3i + j + 2k, find [a b c] and state what the result means geometrically.",
        "1. [a b c] = |1 2 −1; 2 −1 3; 3 1 2|\n2. = 1(−2 − 3) − 2(4 − 9) + (−1)(2 + 3)\n3. = −5 + 10 − 5\n4. = 0\n5. the parallelepiped has zero volume\n6. so the three vectors are coplanar and linearly dependent",
        "[a b c] = 0, so a, b, c are coplanar — they span only a plane, not space",
      ],
    ],
  },
];
