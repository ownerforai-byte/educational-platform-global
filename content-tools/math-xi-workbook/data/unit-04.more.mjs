/**
 * Unit 4 — Vectors, second sheet: 12 questions per chapter in other formats.
 * Item shape: [question, working, answer, topicIndex, marks, typeLabel]
 */

export const EXTENSIONS = [
  {
    slug: "vector-algebra-products",
    items: [
      ["|(1, 2, 2)| = (A) 5 (B) 3 (C) √5 (D) 9.", "√(1 + 4 + 4)", "B — 3", 0, 1, "MCQ"],
      ["a·b = 0 means the vectors are (A) parallel (B) equal (C) perpendicular (D) opposite.", "The dot product measures the cosine factor.", "C — perpendicular", 1, 1, "MCQ"],
      ["|a × b| equals (A) |a||b| (B) |a||b|cosθ (C) |a||b|sinθ (D) a·b.", "That is the magnitude of the cross product.", "C — |a||b|sinθ", 2, 1, "MCQ"],
      ["True or false: a·b = b·a.", "The dot product is commutative.", "True", 1, 1, "True/False"],
      ["True or false: a × b = b × a.", "Swapping reverses the right-hand rule.", "False — a × b = −(b × a)", 2, 1, "True/False"],
      ["The unit vector along a is ______.", "Divide the vector by its own length.", "a/|a|", 0, 1, "Fill in"],
      ["The projection of a on b is ______.", "Dot with the unit vector along b.", "(a·b)/|b|", 3, 1, "Fill in"],
      ["A student writes |a × b| = |a||b|. Correct it.", "That would only be true for perpendicular vectors.", "|a × b| = |a||b|sinθ", 2, 2, "Spot the error"],
      ["Assertion: (1, 0)·(0, 1) = 0. Reason: vectors with zero dot product are perpendicular.", "The zero value is exactly the test.", "Both true, and the reason explains the value", 1, 2, "Assertion–reason"],
      ["Why is the cross product perpendicular to both of its factors?", "It is built from the normals of the plane spanned by them.", "Its direction is defined by the right-hand rule normal to the plane of a and b", 3, 2, "Explain"],
      ["Match the dot and cross products with (a) a vector, (b) a scalar.", "One measures alignment, the other measures turning.", "Dot → (b), cross → (a)", 3, 2, "Match"],
      ["A force (3, 4) N acts through a displacement (2, 1) m. Find the work done.", "W = F·d = 6 + 4", "10 J", 3, 3, "Word problem"],
    ],
  },
  {
    slug: "collinear-coplanar",
    items: [
      ["A zero triple product [a b c] means the vectors are (A) perpendicular (B) coplanar (C) equal (D) unit.", "The volume of their parallelepiped vanishes.", "B — coplanar", 1, 1, "MCQ"],
      ["Three points are collinear when their displacement vectors are (A) equal (B) perpendicular (C) proportional (D) unit.", "Parallel displacements along one line.", "C — proportional", 0, 1, "MCQ"],
      ["The volume of the parallelepiped with edges a, b, c is (A) [a b c] (B) |[a b c]| (C) a·b·c (D) |a × b|.", "Volume is a magnitude, so it cannot be negative.", "B — |[a b c]|", 3, 1, "MCQ"],
      ["True or false: if a·b = 0 and |a| = |b| = 1, then a + b is perpendicular to a − b.", "(a + b)·(a − b) = 1 − 1 = 0", "True", 2, 1, "True/False"],
      ["True or false: three collinear points are always coplanar.", "Any line lies in infinitely many planes.", "True", 0, 1, "True/False"],
      ["[a b c] = ______.", "Scalar triple product.", "a·(b × c)", 1, 1, "Fill in"],
      ["The volume of the tetrahedron with edges a, b, c is ______.", "A tetrahedron is one sixth of the parallelepiped.", "(1/6)|[a b c]|", 3, 1, "Fill in"],
      ["A student writes: since [a b c] = 0, the vectors are independent. Correct it.", "Zero volume means they lie in one plane.", "A zero triple product means they are coplanar, hence dependent", 1, 2, "Spot the error"],
      ["Assertion: (1, 2, 3), (2, 4, 6), (3, 6, 9) are collinear. Reason: each displacement vector is a multiple of the first.", "All three lie on one line through the origin.", "Both true, and the reason proves collinearity", 0, 2, "Assertion–reason"],
      ["Why does a zero triple product force the three vectors into one plane?", "The triple product is the volume they would enclose.", "Zero volume means they span no solid, so they must be coplanar", 2, 2, "Explain"],
      ["Match [a b c] = 0 and |a × b| with (a) area of the parallelogram, (b) coplanar vectors.", "One is a volume condition, the other an area.", "[a b c] = 0 → (b), |a × b| → (a)", 3, 2, "Match"],
      ["Show that (1, 1, 1), (1, 2, 3), (2, 3, 4) are coplanar.", "b × c = (1, −2, 1)\na·(b × c) = 1 − 4 + 3", "Triple product = 0 ⇒ coplanar", 1, 4, "Case study"],
    ],
  },
  {
    slug: "linear-combination",
    items: [
      ["Two vectors in a plane form a basis exactly when they are (A) unit (B) perpendicular (C) non-parallel (D) equal.", "Only independence is required.", "C — non-parallel", 2, 1, "MCQ"],
      ["A basis of three-dimensional space needs (A) 2 (B) 3 (C) 4 (D) any number of vectors.", "The dimension is 3.", "B — 3", 2, 1, "MCQ"],
      ["(3, 4) written with i and j is (A) 3i + 4j (B) 4i + 3j (C) 3i − 4j (D) i + j.", "Coordinates are the coefficients.", "A — 3i + 4j", 0, 1, "MCQ"],
      ["True or false: any three vectors lying in one plane are dependent.", "A plane has dimension 2, so three vectors cannot all be independent.", "True", 1, 1, "True/False"],
      ["True or false: (1, 0, 0), (0, 1, 0), (1, 1, 0) form a basis of space.", "The third lies in the plane of the first two.", "False — they are dependent", 2, 1, "True/False"],
      ["A vector is a linear combination of others when it can be written ______.", "Combine scalar multiples.", "as a sum of scalar multiples of those vectors", 0, 1, "Fill in"],
      ["Three non-coplanar vectors form a ______ of space.", "They span everything and are independent.", "basis", 2, 1, "Fill in"],
      ["A student claims that in a dependent set some vector must be a multiple of another. Correct it.", "e.g. (1,0), (0,1), (1,1): the third is a sum, not a multiple.", "Dependence only needs some linear relation, not a simple multiple", 1, 2, "Spot the error"],
      ["Assertion: (1, 0) and (2, 0) are dependent. Reason: one is a scalar multiple of the other.", "2(1, 0) = (2, 0).", "Both true, and the reason proves dependence", 1, 2, "Assertion–reason"],
      ["Why must a basis be independent as well as spanning?", "Otherwise the same vector would have several coordinate descriptions.", "Independence makes the coordinates of every vector unique", 0, 2, "Explain"],
      ["Match two independent vectors and three independent vectors with (a) space, (b) a plane.", "Count the dimensions spanned.", "2 vectors → (b), 3 vectors → (a)", 2, 2, "Match"],
      ["Find x, y if x(1, 1) + y(1, −1) = (3, 1).", "x + y = 3 and x − y = 1", "x = 2, y = 1", 0, 4, "Case study"],
    ],
  },
];
