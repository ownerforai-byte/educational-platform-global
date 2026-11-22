/**
 * Unit 3 — Analytic Geometry: two-mark conceptual answers, six per A4 sheet.
 * Item shape: [question, model answer, 2, topicIndex]
 */

export const CONCEPT = [
  {
    slug: "distance-and-bisectors",
    items: [
      ["What is the perpendicular distance of a point from a line?", "For Ax + By + C = 0 and the point (x₁, y₁) it is |Ax₁ + By₁ + C| / √(A² + B²), measured along the normal.", 2, 0],
      ["Why does the distance formula carry an absolute value?", "Distance is never negative, while Ax₁ + By₁ + C may be negative depending on which side of the line the point lies.", 2, 0],
      ["What is the locus of points equidistant from two intersecting lines?", "The two angle bisectors of the lines, each carrying the points that are equally far from both.", 2, 1],
      ["Why must the coefficients match before using the distance between parallel lines?", "The formula |C₁ − C₂|/√(A² + B²) assumes both lines share the same normal, which requires identical A and B.", 2, 2],
      ["What is the distance of the origin from Ax + By + C = 0?", "It is |C|/√(A² + B²), which is just the point-distance formula with (0, 0) substituted.", 2, 2],
      ["What does an angle bisector do?", "It divides an angle into two equal parts, so every point on it is at the same perpendicular distance from both arms.", 2, 3],
    ],
  },
  {
    slug: "pair-of-straight-lines",
    items: [
      ["What does ax² + 2hxy + by² = 0 represent?", "A pair of straight lines through the origin. Being homogeneous and of degree two, it factors into two linear equations with zero constant terms.", 2, 0],
      ["When are the two lines of ax² + 2hxy + by² = 0 perpendicular?", "When a + b = 0, i.e. the sum of the coefficients of x² and y² vanishes.", 2, 1],
      ["When do the two lines coincide?", "When h² = ab, because then the quadratic in the slope has equal roots and both lines have the same slope.", 2, 1],
      ["Why does the pair of lines pass through the origin?", "Putting x = 0 gives by² = 0, so y = 0; the point (0, 0) satisfies both factors.", 2, 2],
      ["What is the angle between the lines ax² + 2hxy + by² = 0?", "tan θ = 2√(h² − ab)/(a + b), which comes from the difference of the two slopes.", 2, 2],
      ["What is the sum of the slopes of the pair ax² + 2hxy + by² = 0?", "The slopes satisfy bm² + 2hm + a = 0, so their sum is −2h/b.", 2, 3],
    ],
  },
  {
    slug: "coordinates-in-space",
    items: [
      ["What do the three coordinates of a point give?", "Its position in space: distances measured along the x, y and z axes, so three numbers are needed where the plane needs two.", 2, 0],
      ["What is the equation of the yz-plane?", "x = 0: every point on that plane has zero x-coordinate, just as the xy-plane is z = 0.", 2, 0],
      ["How does the section formula work in space?", "It is applied coordinate by coordinate, exactly as in the plane, giving the same ratio in all three coordinates.", 2, 1],
      ["What are direction ratios of a line?", "Any three numbers proportional to the differences of the coordinates of two points on the line; they fix its direction, not its position.", 2, 1],
      ["Why do the squares of the direction cosines add up to 1?", "They are the components of a unit vector along the line, and a unit vector has length 1: l² + m² + n² = 1.", 2, 2],
      ["What is the distance between two points in space?", "√((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²), the three-dimensional form of Pythagoras.", 2, 3],
    ],
  },
];
