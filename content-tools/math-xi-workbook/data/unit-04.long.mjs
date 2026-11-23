/**
 * Unit 4 — Vectors: full-length answers, one per chapter.
 * Item shape: [question, [h1,h2,h3], work, answer, marks, topicIndex, kind, marking, pitfall]
 */

export const LONG = [
  {
    slug: "vector-algebra-products",
    items: [
      [
        "For a = 2i − j + 3k and b = i + 2j − k, find\n(a) a·b and a×b,\n(b) the angle between a and b,\n(c) the area of the parallelogram with adjacent sides a and b.",
        [
          "Dot product: multiply matching components and add.",
          "Cross product: expand the 3×3 determinant with i, j, k in the first row.",
          "cosθ = (a·b)/(|a||b|); the parallelogram area is |a×b|.",
        ],
        "Given: a = (2, −1, 3), b = (1, 2, −1)\nRequired: dot and cross products, the angle, the parallelogram area\n\n1. a·b = 2(1) + (−1)(2) + 3(−1) = 2 − 2 − 3 = −3\n2. a×b = i[(−1)(−1) − 3(2)] − j[2(−1) − 3(1)] + k[2(2) − (−1)(1)]\n3. a×b = i(1 − 6) − j(−2 − 3) + k(4 + 1) = −5i + 5j + 5k\n4. |a| = √14, |b| = √6, |a×b| = 5√3\n5. cosθ = −3/√84 = −3/(2√21) ⇒ θ ≈ 109.1°\n6. area = |a×b| = 5√3 ≈ 8.66 square units",
        "a·b = −3, a×b = −5i + 5j + 5k; θ ≈ 109.1°; parallelogram area 5√3 ≈ 8.66.",
        6,
        0,
        "Dot and cross",
        "dot 1 + cross 2 + angle 2 + area 1 = 6",
        "Losing the sign of the j-component: the determinant gives −j(...), so the middle term flips.",
      ],
    ],
  },
  {
    slug: "collinear-coplanar",
    items: [
      [
        "Show that the points A(0, 0, 0), B(1, 2, 3), C(2, 1, 4) and D(3, 3, 7) are coplanar, and state what the vanishing scalar triple product means geometrically.",
        [
          "Form the three vectors AB, AC, AD from the given points.",
          "The points are coplanar exactly when the scalar triple product is zero.",
          "Evaluate the 3×3 determinant with those vectors as rows.",
        ],
        "Given: A(0,0,0), B(1,2,3), C(2,1,4), D(3,3,7)\nRequired: coplanarity proof and its geometric meaning\n\n1. AB = (1, 2, 3), AC = (2, 1, 4), AD = (3, 3, 7)\n2. [AB AC AD] = 1(1·7 − 4·3) − 2(2·7 − 4·3) + 3(2·3 − 1·3)\n3. = 1(7 − 12) − 2(14 − 12) + 3(6 − 3)\n4. = −5 − 4 + 9 = 0\n5. the scalar triple product is the volume of the parallelepiped; volume zero\n6. so the three vectors are linearly dependent and all four points lie in one plane",
        "[AB AC AD] = 0, so A, B, C, D are coplanar — the parallelepiped has zero volume and one vector is a combination of the other two.",
        6,
        1,
        "Scalar triple product",
        "vectors formed 1.5 + determinant 2.5 + conclusion 2 = 6",
        "Forming vectors between the wrong pairs of points, which mixes up the determinant rows.",
      ],
    ],
  },
  {
    slug: "linear-combination",
    items: [
      [
        "The vectors a = i + j, b = j + k, c = k + i are given.\n(a) Show that they form a basis of three-dimensional space.\n(b) Express 2i + 3j + 4k as a linear combination of a, b and c.",
        [
          "A basis needs a non-zero scalar triple product.",
          "Write xa + yb + zc = (x + z, x + y, y + z) and match components.",
          "Solve the three small equations by adding them first.",
        ],
        "Given: a = (1,1,0), b = (0,1,1), c = (1,0,1)\nRequired: proof of basis, then the combination for (2,3,4)\n\n1. [a b c] = 1(1·1 − 1·0) − 1(0·1 − 1·1) + 0 = 1 + 1 = 2 ≠ 0\n2. non-zero ⇒ linearly independent ⇒ a basis for 3-D\n3. xa + yb + zc = (x + z, x + y, y + z) = (2, 3, 4)\n4. adding all three: 2(x + y + z) = 9 ⇒ x + y + z = 9/2\n5. x = 9/2 − 4 = 1/2, y = 9/2 − 2 = 5/2, z = 9/2 − 3 = 3/2\n6. check: (1/2)(1,1,0) + (5/2)(0,1,1) + (3/2)(1,0,1) = (2, 3, 4) ✓",
        "[a b c] = 2 ≠ 0 so they form a basis; 2i + 3j + 4k = ½a + (5/2)b + (3/2)c.",
        6,
        2,
        "Basis and combination",
        "triple product 2 + independence conclusion 1 + system 2 + coefficients 1 = 6",
        "Claiming a basis from three vectors without checking independence — three vectors may still be coplanar.",
      ],
    ],
  },
];
