/**
 * Unit 4 — Vectors: two-mark conceptual answers, six per A4 sheet.
 * Item shape: [question, model answer, 2, topicIndex]
 */

export const CONCEPT = [
  {
    slug: "vector-algebra-products",
    items: [
      ["What is the difference between the dot and the cross product?", "The dot product gives a scalar |a||b|cos θ and measures how much the vectors agree in direction; the cross product gives a vector |a||b|sin θ perpendicular to both and measures the area they span.", 2, 0],
      ["When is a·b largest for fixed magnitudes?", "When the angle between them is 0, since cos 0 = 1; the dot product is then |a||b|.", 2, 0],
      ["What does a × b = 0 tell you?", "Either one vector is zero or the vectors are parallel, because sin θ = 0.", 2, 1],
      ["Why is a·(b × c) called the scalar triple product?", "It is a scalar formed from three vectors, and its magnitude equals the volume of the parallelepiped built on them.", 2, 1],
      ["What is the geometric meaning of |a × b|?", "The area of the parallelogram whose adjacent sides are a and b; half of it is the area of the triangle on the same two sides.", 2, 2],
      ["Why is a·a = |a|²?", "The angle of a vector with itself is 0, so a·a = |a||a|cos 0 = |a|².", 2, 3],
    ],
  },
  {
    slug: "collinear-coplanar",
    items: [
      ["When are three points A, B, C collinear?", "When AB and AC are parallel, i.e. AB = λAC for some scalar λ, or equivalently AB × AC = 0.", 2, 0],
      ["When are three vectors coplanar?", "When their scalar triple product is zero, [a b c] = 0, because the parallelepiped they build has no volume.", 2, 1],
      ["Are any two vectors always coplanar?", "Yes. Two vectors always lie in some plane through the origin, so only three or more vectors can fail to be coplanar.", 2, 1],
      ["Why does linear dependence imply coplanarity?", "If one vector is a combination of the other two, it lies in the plane those two span, so all three lie in one plane.", 2, 2],
      ["What is the condition for four points to be coplanar?", "With A as base, the triple product AB · (AC × AD) must be zero, so the three edge vectors are coplanar.", 2, 2],
      ["What does [a b c] = 0 mean for the volume of the parallelepiped?", "The volume is zero, so the parallelepiped flattens into a plane — the three vectors are coplanar.", 2, 3],
    ],
  },
  {
    slug: "linear-combination",
    items: [
      ["What is a linear combination of vectors?", "Any sum of the form xa + yb + zc with scalar coefficients; it is the set of all vectors the given ones can build.", 2, 0],
      ["When do three vectors form a basis of space?", "When they are linearly independent, i.e. [a b c] ≠ 0, so they span all of three-dimensional space.", 2, 1],
      ["Why can three coplanar vectors not form a basis?", "Every combination of them stays in that one plane, so no vector off the plane can ever be produced.", 2, 1],
      ["What is the dimension of ordinary space, and why?", "Three, because three independent directions are needed and any three independent vectors already span everything.", 2, 2],
      ["How do you find the coefficients in a linear combination?", "Write the combination as a single vector and equate the i, j and k components, which gives three linear equations in the unknowns.", 2, 3],
      ["Why is the representation in a basis unique?", "If two different sets of coefficients gave the same vector, their difference would be a non-trivial relation of dependence, contradicting independence.", 2, 3],
    ],
  },
];
