/**
 * Unit 3 — Analytic Geometry: timed revision paper (24 questions, 50 marks).
 * Item shape: [question, answer, marks]
 */

export const REVISION = [
  {
    unitNo: 3,
    title: "Unit 3 — Analytic Geometry: revision paper",
    minutes: 45,
    items: [
      ["Find the distance of (3, 4) from the origin.", "√(9 + 16) = 5.", 1],
      ["State the slope of 2x + 3y = 6.", "m = −A/B = −2/3.", 1],
      ["Write the equation of the x-axis.", "y = 0.", 1],
      ["When are y = m₁x and y = m₂x perpendicular?", "When m₁m₂ = −1.", 1],
      ["Find the distance between (1, 1, 1) and (2, 2, 2).", "√(1 + 1 + 1) = √3.", 1],
      ["Which plane has the equation x = 0?", "The yz-plane.", 1],
      ["Give the direction cosines of the z-axis.", "(0, 0, 1).", 1],
      ["Find the centre of x² + y² − 4x + 6y − 3 = 0.", "(2, −3), from halving the coefficients with signs reversed.", 1],
      ["Find the radius of that circle.", "√(4 + 9 + 3) = 4.", 1],
      ["How many linearly independent vectors span space?", "Three.", 1],
      [
        "Find the equation of the line through (2, 3) with slope −1.",
        "y − 3 = −1(x − 2), so y = −x + 5, i.e. x + y = 5.",
        2,
      ],
      [
        "Find the distance between the parallel lines 3x + 4y = 7 and 3x + 4y = 12.",
        "|C₁ − C₂|/√(A² + B²) = 5/5 = 1 unit.",
        2,
      ],
      [
        "Show that 2x − 3y + 4 = 0 and 6x − 9y = 1 are parallel.",
        "Both have slope 2/3 (the coefficients of the second are three times those of the first), so the lines are parallel and not coincident.",
        2,
      ],
      [
        "Find the angle between y = x and y = √3x.",
        "tan θ = |(√3 − 1)/(1 + √3)| = 2 − √3, so θ = 15°.",
        2,
      ],
      [
        "Find the distance of (2, −3) from 4x + 3y − 5 = 0.",
        "|8 − 9 − 5|/5 = 6/5 = 1.2 units.",
        2,
      ],
      [
        "Find the point dividing (1, 2, 3) and (4, 5, 6) internally in the ratio 1 : 2.",
        "((1·2 + 4·1)/3, (2·2 + 5)/3, (3·2 + 6)/3) = (2, 3, 4).",
        2,
      ],
      ["Write the circle with centre (0, 0) and radius 5.", "x² + y² = 25.", 2],
      [
        "Find the perpendicular distance of the origin from x + y = 2√2.",
        "|−2√2|/√2 = 2 units.",
        2,
      ],
      ["Are (1, 0, 0), (0, 1, 0) and (0, 0, 1) collinear?", "No: no single direction contains all three, since the ratios of their coordinates differ.", 2],
      ["Find the slope of the line joining (2, 3) and (5, 9).", "(9 − 3)/(5 − 2) = 2.", 2],
      [
        "Find the equation of the circle through (0, 0), (a, 0) and (0, b).",
        "A circle through the origin has the form x² + y² + Dx + Ey = 0. Substituting (a, 0) gives D = −a, and (0, b) gives E = −b, so x² + y² − ax − by = 0.",
        5,
      ],
      [
        "Find the acute angle between 3x + y − 5 = 0 and x + 2y + 1 = 0.",
        "The slopes are −3 and −1/2, so tan θ = |(−3 + 1/2)/(1 + 3/2)| = 2.5/2.5 = 1 and θ = 45°.",
        5,
      ],
      [
        "Find the image of (3, 8) in the line x + 3y = 7.",
        "Here ax₁ + by₁ + c = 3 + 24 − 7 = 20 and a² + b² = 10. So x′ = 3 − 2(1)(20)/10 = −1 and y′ = 8 − 2(3)(20)/10 = −4. The image is (−1, −4); its midpoint (1, 2) lies on the line ✓.",
        5,
      ],
      [
        "Find the pair of lines through the origin perpendicular to 6x² − 5xy + y² = 0.",
        "The given pair has slopes 2 and 3. The perpendicular slopes are −1/2 and −1/3, giving 6m² + 5m + 1 = 0, i.e. x² + 5xy + 6y² = 0.",
        5,
      ],
    ],
  },
];
