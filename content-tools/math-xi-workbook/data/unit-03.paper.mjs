/**
 * Unit 3 — Analytic Geometry: NEB model paper (75 marks, 3 hours).
 * A: [question, [4 options], answerIndex, why?] · B/C: [question, worked answer, answer line]
 */

export const PAPERS = [
  {
    unitNo: 3,
    title: "Unit 3 — Analytic Geometry",
    note: "Distance and section formulae carry the marks in Group B; in Group C a labelled diagram or a stated vertex/centre earns the first mark of the eight.",
    A: [
      ["The distance of the point (3, 4) from the origin is", ["3", "4", "5", "7"], 3, "√(9 + 16) = 5"],
      ["The slope of the line 2x + 3y = 6 is", ["2/3", "−2/3", "3/2", "−3/2"], 2, "y = −(2/3)x + 2"],
      ["The angle between the axes is", ["0°", "45°", "90°", "180°"], 3, "the coordinate axes are perpendicular"],
      ["The lines 3x + 4y = 7 and 6x + 8y = 9 are", ["parallel", "perpendicular", "coincident", "intersecting at the origin"], 1, "equal slopes 3/4 and 3/4, different constants"],
      ["The distance between (1, 2, 3) and (1, 2, 5) is", ["2", "√2", "4", "1"], 1, "only z changes by 2"],
      ["The equation of the xy-plane is", ["x = 0", "y = 0", "z = 0", "x + y + z = 0"], 3, "every point of the xy-plane has z = 0"],
      ["The equation x² − y² = 0 represents", ["a circle", "two parallel lines", "two perpendicular lines", "a parabola"], 3, "x = ±y, slopes 1 and −1"],
      ["The midpoint of (−1, 3, 2) and (3, −1, 4) is", ["(1, 1, 3)", "(2, 2, 6)", "(0, 2, 3)", "(1, 2, 3)"], 1, "average each coordinate"],
      ["The foot of the perpendicular from (1, 2) to the x-axis is", ["(0, 0)", "(1, 0)", "(0, 2)", "(1, 2)"], 2, "drop the y-coordinate"],
      ["The line of slope 2 through (1, 3) is", ["y = 2x + 1", "y = 2x − 1", "y = x + 2", "y = 3x + 1"], 1, "y − 3 = 2(x − 1)"],
      ["The distance of the origin from 3x + 4y = 10 is", ["1", "2", "5", "10"], 2, "10/√25 = 2"],
    ],
    B: [
      [
        "Find the distance of the point (2, −3) from the line 4x − 3y + 5 = 0.",
        "1. d = |4(2) − 3(−3) + 5|/√(16 + 9)\n2. = |8 + 9 + 5|/5\n3. = 22/5",
        "d = 22/5 = 4.4 units",
      ],
      [
        "Find the equation of the line through (2, 1) perpendicular to 3x − 4y = 7.",
        "1. slope of the given line: m₁ = 3/4\n2. perpendicular slope m₂ = −4/3\n3. y − 1 = (−4/3)(x − 2)\n4. 3y − 3 = −4x + 8",
        "4x + 3y = 11",
      ],
      [
        "Find the acute angle between 2x − y = 3 and x + 3y = 5.",
        "1. m₁ = 2, m₂ = −1/3\n2. tanθ = |(m₁ − m₂)/(1 + m₁m₂)|\n3. = |(2 + 1/3)/(1 − 2/3)| = (7/3)/(1/3)\n4. = 7",
        "θ = tan⁻¹7 ≈ 81.87°",
      ],
      [
        "Find the point dividing the join of (2, −1, 4) and (6, 3, 0) internally in the ratio 1 : 3.",
        "1. x = (1·6 + 3·2)/4 = 3\n2. y = (1·3 + 3(−1))/4 = 0\n3. z = (1·0 + 3·4)/4 = 3",
        "the point is (3, 0, 3)",
      ],
      [
        "Find k so that the line 2x + 3y + k = 0 is at a distance of 2 units from (1, 1).",
        "1. |2 + 3 + k|/√13 = 2\n2. |5 + k| = 2√13\n3. 5 + k = ±2√13",
        "k = −5 + 2√13 or k = −5 − 2√13",
      ],
      [
        "Find the direction cosines of the line joining (1, 0, −1) and (3, 2, 1).",
        "1. direction ratios: (3 − 1, 2 − 0, 1 + 1) = (2, 2, 2)\n2. magnitude = √(4 + 4 + 4) = 2√3\n3. divide each ratio by 2√3",
        "direction cosines (1/√3, 1/√3, 1/√3)",
      ],
      [
        "Find the angle between the pair of lines x² − 5xy + 6y² = 0.",
        "1. factor: (x − 2y)(x − 3y) = 0\n2. slopes 1/2 and 1/3\n3. tanθ = |(1/2 − 1/3)/(1 + 1/6)| = (1/6)/(7/6)",
        "θ = tan⁻¹(1/7) ≈ 8.13°",
      ],
      [
        "Find the distance between the parallel lines 5x + 12y = 13 and 5x + 12y = 26.",
        "1. write both with the same coefficients: 5x + 12y − 13 = 0, 5x + 12y − 26 = 0\n2. d = |−13 + 26|/√(25 + 144)\n3. = 13/13",
        "d = 1 unit",
      ],
    ],
    C: [
      [
        "Find the equations of the straight lines through (2, 3) whose intercepts on the axes are equal in magnitude.",
        "1. equal intercept a on both axes: x/a + y/a = 1 ⇒ x + y = a\n2. through (2, 3): 2 + 3 = a ⇒ a = 5 ⇒ x + y = 5\n3. equal in magnitude with opposite signs: x/a − y/a = 1 ⇒ x − y = b\n4. through (2, 3): 2 − 3 = b ⇒ b = −1 ⇒ x − y = −1\n5. check (2, 3): 2 + 3 = 5 ✓ and 2 − 3 = −1 ✓\n6. both lines pass through the given point",
        "x + y = 5 and x − y = −1",
      ],
      [
        "Find the circumcentre and the circumradius of the triangle with vertices (0, 0), (4, 0) and (0, 3).",
        "1. the sides along the axes are perpendicular, so the angle at (0, 0) is 90°\n2. for a right triangle the circumcentre is the midpoint of the hypotenuse\n3. hypotenuse joins (4, 0) and (0, 3): midpoint (2, 3/2)\n4. circumradius = half the hypotenuse = ½√(16 + 9) = 2.5\n5. check distances: from (2, 1.5) to (0,0) = √(4 + 2.25) = 2.5 ✓\n6. and to (4,0) = √(4 + 2.25) = 2.5 ✓",
        "circumcentre (2, 3/2), circumradius 2.5 units",
      ],
      [
        "Find the ratio in which the yz-plane divides the line joining P(2, 4, 5) and Q(−3, 1, 2).",
        "1. on the yz-plane the x-coordinate is 0\n2. let the plane divide PQ in the ratio m : n (internal)\n3. x = (m(−3) + n(2))/(m + n) = 0\n4. −3m + 2n = 0 ⇒ 3m = 2n\n5. m : n = 2 : 3\n6. the point of division is ((0), (2·1 + 3·4)/5, (2·2 + 3·5)/5) = (0, 14/5, 19/5)",
        "the yz-plane divides PQ in the ratio 2 : 3 at (0, 14/5, 19/5)",
      ],
    ],
  },
];
