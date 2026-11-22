/**
 * Unit 4 — Vectors: timed revision paper (24 questions, 50 marks, 45 minutes).
 * Item shape: [question, answer, marks]
 */

export const REVISION = [
  {
    unitNo: 4,
    title: "Unit 4 — Vectors: revision paper",
    minutes: 45,
    items: [
      ["Find |3i − 4j|.", "√(9 + 16) = 5.", 1],
      ["Evaluate i·j.", "0, since the axes are perpendicular.", 1],
      ["Evaluate i × j.", "k.", 1],
      ["Write a unit vector along i + j.", "(i + j)/√2.", 1],
      ["If a·b = 0 with both vectors non-zero, what is the angle?", "90°.", 1],
      ["Find the component of 3i + 4j along j.", "4.", 1],
      ["What is |a × b| when a is parallel to b?", "0, because sin θ = 0.", 1],
      ["Evaluate (i + j)·(i − j).", "1 − 1 = 0.", 1],
      ["How many independent vectors are needed for a basis of space?", "Three.", 1],
      ["What is the scalar triple product [i j k]?", "1, the volume of the unit cube.", 1],
      [
        "Find λ so that 2i + λj + k is perpendicular to i − 2j + 3k.",
        "Setting the dot product to zero: 2 − 2λ + 3 = 0 ⇒ λ = 5/2.",
        2,
      ],
      [
        "Find the angle between i + j and j + k.",
        "(i + j)·(j + k) = 1 and both lengths are √2, so cos θ = 1/2 and θ = 60°.",
        2,
      ],
      [
        "If |a| = 3, |b| = 4 and a·b = 6, find the angle between them.",
        "cos θ = 6/12 = 1/2, so θ = 60°.",
        2,
      ],
      [
        "Find the area of the triangle whose two sides from a vertex are i and j.",
        "Area = ½|i × j| = ½ square unit.",
        2,
      ],
      ["Find the projection of i + 2j on i.", "(1)/1 = 1 unit along i.", 2],
      [
        "Show that the points with position vectors i + 2j + 3k and 2i + 4j + 6k are collinear with the origin.",
        "The second vector is exactly twice the first, so they are parallel and both start at the origin; the three points lie on one line.",
        2,
      ],
      ["Evaluate a·(b × c) for a = i, b = j, c = k.", "1, the volume of the unit cube.", 2],
      [
        "If a + b + c = 0 with |a| = |b| = |c| = 1, find a·b.",
        "a + b = −c gives 1 + 1 + 2a·b = 1, so a·b = −1/2.",
        2,
      ],
      ["Write the direction cosines of 2i + j − 2k.", "±(2/3, 1/3, −2/3), since the length is 3.", 2],
      ["Find a vector of magnitude 5 along i.", "5i.", 2],
      [
        "Prove that [a + b, b + c, c + a] = 2[a b c].",
        "Expanding by linearity gives six triple products. Those containing a repeated vector vanish, leaving (a, b, c), (b, c, a) and (c, a, b); each equals [a b c], so the sum is 2[a b c].",
        5,
      ],
      [
        "Find the volume of the parallelepiped with edges (1, 2, 3), (0, 1, 2), (0, 0, 1).",
        "The determinant is 1(1·1 − 2·0) − 2(0 − 0) + 3(0 − 0) = 1, so the volume is 1 cubic unit.",
        5,
      ],
      [
        "Find λ so that (1, 2, 3), (2, 3, 4) and (λ, 4, 5) are collinear.",
        "AB = (1, 1, 1) and AC = (λ − 1, 2, 2). Collinearity needs AC = kAB, so k = 2 and λ − 1 = 2; hence λ = 3.",
        5,
      ],
      [
        "Using vectors, prove that the diagonals of a parallelogram bisect each other.",
        "Let OA = a and OB = b. The diagonal OC has midpoint ½(a + b), and the diagonal AB has midpoint ½(a + b) as well. The two midpoints coincide, so the diagonals bisect each other.",
        5,
      ],
    ],
  },
];
