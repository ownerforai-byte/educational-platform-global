/**
 * Unit 3 — Analytic Geometry: NEB model paper, Set B (75 marks, 3 hours).
 */

export const PAPERS = [
  {
    unitNo: 3,
    title: "Unit 3 — Analytic Geometry",
    set: "B",
    note: "Set B leans on the distance formula and on lines through a given point; Group C items are marked 2 marks for the method, 4 for the algebra and 2 for the final statement.",
    A: [
      ["The distance of (5, 12) from the origin is", ["12", "13", "17", "25"], 2, "√(25 + 144) = 13"],
      ["The line x/2 + y/3 = 1 has intercepts", ["(3, 0) and (0, 2)", "(2, 0) and (0, 3)", "(2, 3) only", "(0, 0) and (2, 3)"], 2, "put y = 0 and x = 0"],
      ["A line perpendicular to y = 3x + 1 has slope", ["3", "−3", "1/3", "−1/3"], 4, "the product of the slopes must be −1"],
      ["The lines x + y = 1 and x − y = 1 meet at", ["(1, 0)", "(0, 1)", "(1, 1)", "(0, 0)"], 1, "adding gives 2x = 2"],
      ["The distance between (2, 3, 4) and (2, 3, 1) is", ["1", "3", "√3", "5"], 2, "only z changes, by 3"],
      ["The midpoint of (0, 0, 0) and (2, 4, 6) is", ["(1, 2, 3)", "(2, 4, 6)", "(1, 1, 1)", "(0, 0, 0)"], 1, "average the coordinates"],
      ["The angle between the coordinate axes is", ["0°", "45°", "90°", "180°"], 3, "the axes are perpendicular"],
      ["The x-intercept of 2x + 3y = 6 is", ["2", "3", "6", "−2"], 2, "put y = 0 ⇒ x = 3"],
      ["The point (1, 2) lies on", ["x + y = 3", "x − y = 3", "2x + y = 1", "x + 2y = 1"], 1, "1 + 2 = 3"],
      ["The distance of (1, 1) from x − y = 0 is", ["0", "1/√2", "√2", "2"], 1, "|1 − 1|/√2 = 0"],
      ["For two perpendicular lines, the product of their slopes is", ["1", "0", "−1", "undefined"], 3, "m₁m₂ = −1"],
    ],
    B: [
      [
        "Find the equation of the line through (3, −2) parallel to 2x + 5y = 7.",
        "1. the parallel line has the form 2x + 5y = k\n2. substitute (3, −2): 6 − 10 = k\n3. k = −4",
        "2x + 5y = −4",
      ],
      [
        "Find the distance between the parallel lines 2x − 3y = 4 and 2x − 3y = 10.",
        "1. rewrite: 2x − 3y − 4 = 0 and 2x − 3y − 10 = 0\n2. d = |−4 + 10|/√(4 + 9)\n3. = 6/√13",
        "d = 6/√13 ≈ 1.66 units",
      ],
      [
        "Find the angle between the lines x + y = 0 and x − y = 0.",
        "1. m₁ = −1 and m₂ = 1\n2. m₁m₂ = −1\n3. the lines are perpendicular",
        "θ = 90°",
      ],
      [
        "Find y if the point (2, y, 3) is at a distance of 5 units from (2, 1, 3).",
        "1. d² = 0 + (y − 1)² + 0 = 25\n2. |y − 1| = 5\n3. y = 6 or y = −4",
        "y = 6 or y = −4",
      ],
      [
        "Find k if the line kx + 3y = 6 passes through (2, 0).",
        "1. substitute x = 2, y = 0\n2. 2k + 0 = 6\n3. k = 3",
        "k = 3",
      ],
      [
        "Find the equation of the right bisector of the segment joining (1, 2) and (3, 6).",
        "1. midpoint = (2, 4)\n2. slope of the segment = 4/2 = 2\n3. perpendicular slope = −1/2\n4. y − 4 = −(1/2)(x − 2)", 
        "x + 2y = 10",
      ],
      [
        "Write the direction cosines of the x-axis.",
        "1. the x-axis has direction ratios (1, 0, 0)\n2. its magnitude is 1\n3. divide the ratios by the magnitude",
        "(1, 0, 0)",
      ],
      [
        "Find the foot of the perpendicular from (1, 1) to the line x + y = 4.",
        "1. the perpendicular through (1, 1) has slope 1: y = x\n2. solve with x + y = 4\n3. 2x = 4 ⇒ x = 2, y = 2\n4. check: (2, 2) lies on x + y = 4 ✓",
        "the foot is (2, 2)",
      ],
    ],
    C: [
      [
        "Find the equation of the line through the intersection of x + y = 4 and 2x − y = 5 that is perpendicular to x − 2y = 3.",
        "1. solve the pair: adding 3x = 9 ⇒ x = 3, then y = 1\n2. point of intersection (3, 1)\n3. slope of x − 2y = 3 is 1/2\n4. perpendicular slope = −2\n5. y − 1 = −2(x − 3)\n6. 2x + y = 7",
        "2x + y = 7",
      ],
      [
        "Show that 2x² − 5xy + 2y² = 0 represents two straight lines through the origin, find them and the angle between them.",
        "1. factor: (2x − y)(x − 2y) = 2x² − 4xy − xy + 2y² ✓\n2. the lines are 2x − y = 0 and x − 2y = 0, with slopes 2 and 1/2\n3. tanθ = |(m₁ − m₂)/(1 + m₁m₂)|\n4. = |(2 − 1/2)/(1 + 1)| = 1.5/2 = 3/4\n5. both lines pass through (0, 0)\n6. θ = tan⁻¹(3/4) ≈ 36.87°",
        "the lines are y = 2x and y = x/2; the angle between them is tan⁻¹(3/4) ≈ 36.87°",
      ],
      [
        "Find the ratio in which the xy-plane divides the join of P(1, 3, 4) and Q(2, 1, −2), and find the point of division.",
        "1. on the xy-plane, z = 0\n2. let the ratio be m : n (internal)\n3. z = (m(−2) + n(4))/(m + n) = 0\n4. −2m + 4n = 0 ⇒ m = 2n, so m : n = 2 : 1\n5. x = (2·2 + 1·1)/3 = 5/3, y = (2·1 + 1·3)/3 = 5/3\n6. the point is (5/3, 5/3, 0)",
        "the ratio is 2 : 1 and the point of division is (5/3, 5/3, 0)",
      ],
    ],
  },
];
