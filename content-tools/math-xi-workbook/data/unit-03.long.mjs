/**
 * Unit 3 — Analytic Geometry: full-length answers, one per chapter.
 * Item shape: [question, [h1,h2,h3], work, answer, marks, topicIndex, kind, marking, pitfall]
 */

export const LONG = [
  {
    slug: "distance-and-bisectors",
    items: [
      [
        "The parallel lines are 3x + 4y = 12 and 3x + 4y = 2.\n(a) Find the distance between them.\n(b) Find the equation of the line midway between them.\n(c) Verify that any point of that middle line is equidistant from both.",
        [
          "Bring both equations to the form 3x + 4y + c = 0 with the same A and B.",
          "The gap between parallel lines is |c₁ − c₂|/√(A² + B²).",
          "The middle line has c equal to the average of the two constants.",
        ],
        "Given: L₁: 3x + 4y − 12 = 0, L₂: 3x + 4y − 2 = 0\nRequired: the gap, the midline, and the equidistance check\n\n1. √(A² + B²) = √(9 + 16) = 5\n2. d = |−12 − (−2)|/5 = 10/5 = 2\n3. midline: 3x + 4y = (12 + 2)/2 = 7 ⇒ 3x + 4y − 7 = 0\n4. take P(1, 1) on the midline: |3 + 4 − 12|/5 = 1 and |3 + 4 − 2|/5 = 1\n5. both distances equal 1 = d/2 ✓\n6. any point of the midline lies exactly halfway across",
        "distance = 2 units; midline 3x + 4y = 7, and every point of it is 1 unit from each line.",
        6,
        0,
        "Parallel lines",
        "distance formula 2 + midline 2 + equidistance verification 2 = 6",
        "Using c₁ − c₂ without first making the A and B coefficients identical in both equations.",
      ],
    ],
  },
  {
    slug: "pair-of-straight-lines",
    items: [
      [
        "Show that 6x² + 5xy − 6y² = 0 represents a pair of straight lines.\n(a) Find the separate equations.\n(b) Find the angle between them and state whether they are perpendicular.",
        [
          "Treat the expression as a quadratic in x and factor it.",
          "Each linear factor equal to zero is one line through the origin.",
          "For ax² + 2hxy + by² = 0, tanθ = 2√(h² − ab)/(a + b).",
        ],
        "Given: 6x² + 5xy − 6y² = 0\nRequired: the two lines, the angle, and perpendicularity\n\n1. factor: (2x + 3y)(3x − 2y) = 6x² − 4xy + 9xy − 6y² ✓\n2. the lines are 2x + 3y = 0 and 3x − 2y = 0\n3. here a = 6, 2h = 5, b = −6 ⇒ h = 5/2\n4. a + b = 0 ⇒ tanθ is infinite ⇒ θ = 90°\n5. slopes: −2/3 and 3/2, whose product is −1\n6. both lines pass through the origin, so the pair is a right-angled cross",
        "the lines are 2x + 3y = 0 and 3x − 2y = 0; the angle between them is 90° (m₁m₂ = −1).",
        6,
        0,
        "Homogeneous pair",
        "factorisation 2 + separate lines 2 + angle 2 = 6",
        "Reading b as +6. The sign of b comes from the y² coefficient −6, and it decides perpendicularity.",
      ],
    ],
  },
  {
    slug: "coordinates-in-space",
    items: [
      [
        "The points A(1, −2, 3) and B(3, 4, −5) are given.\n(a) Find the point that divides AB externally in the ratio 2 : 3.\n(b) Find the midpoint of AB and check your external point against it.",
        [
          "External division uses (mx₂ − nx₁)/(m − n) with m = 2, n = 3.",
          "Apply the same formula to each coordinate separately.",
          "The midpoint uses the ordinary averages of the coordinates.",
        ],
        "Given: A(1, −2, 3), B(3, 4, −5), ratio 2 : 3 external\nRequired: the external point and the midpoint\n\n1. x = (2·3 − 3·1)/(2 − 3) = (6 − 3)/(−1) = −3\n2. y = (2·4 − 3(−2))/(−1) = (8 + 6)/(−1) = −14\n3. z = (2(−5) − 3·3)/(−1) = (−10 − 9)/(−1) = 19\n4. external point P(−3, −14, 19)\n5. midpoint M = ((1 + 3)/2, (−2 + 4)/2, (3 − 5)/2) = (2, 1, −1)\n6. P, M, B all lie on AB with M between A and B; the external point lies beyond A",
        "P(−3, −14, 19) divides AB externally in 2 : 3; the midpoint of AB is M(2, 1, −1).",
        6,
        1,
        "Section formula",
        "each coordinate 1.5 + point 1 + midpoint 1.5 = 6",
        "Adding instead of subtracting in external division — external means the difference of the products.",
      ],
    ],
  },
];
