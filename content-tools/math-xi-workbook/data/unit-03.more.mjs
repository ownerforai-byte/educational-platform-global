/**
 * Unit 3 — Analytic Geometry, second sheet: 12 questions per chapter in other formats.
 * Item shape: [question, working, answer, topicIndex, marks, typeLabel]
 */

export const EXTENSIONS = [
  {
    slug: "distance-and-bisectors",
    items: [
      ["The distance of the origin from 3x − 4y + 5 = 0 is (A) 1 (B) 5 (C) 5/4 (D) 0.", "|5|/√(9 + 16) = 5/5", "A — 1", 0, 1, "MCQ"],
      ["The distance between x + y = 2 and x + y = 6 is (A) 4 (B) 2√2 (C) 4/√2 (D) 8.", "|6 − 2|/√2 = 4/√2 = 2√2", "B — 2√2", 1, 1, "MCQ"],
      ["The two angle bisectors of a pair of lines are always (A) parallel (B) perpendicular (C) coincident (D) at 45°.", "Their equations differ only by the ± sign, which flips the slope product to −1.", "B — perpendicular", 2, 1, "MCQ"],
      ["True or false: two parallel lines are everywhere the same distance apart.", "That is what parallel means in the distance sense.", "True", 1, 1, "True/False"],
      ["True or false: every point on an angle bisector is equidistant from the two lines.", "That property is the definition of the bisector.", "True", 2, 1, "True/False"],
      ["The distance from (x₁, y₁) to ax + by + c = 0 is ______.", "Divide the substituted value by the length of the normal.", "|ax₁ + by₁ + c|/√(a² + b²)", 0, 1, "Fill in"],
      ["The distance between ax + by + c₁ = 0 and ax + by + c₂ = 0 is ______.", "Only the constants differ.", "|c₁ − c₂|/√(a² + b²)", 1, 1, "Fill in"],
      ["A student finds the distance between 3x + 4y = 2 and 6x + 8y = 9 as |9 − 2|/5. Correct it.", "The coefficients must be made equal first: divide the second by 2 to get 3x + 4y = 4.5", "Distance = |4.5 − 2|/5 = 0.5", 1, 2, "Spot the error"],
      ["Assertion: the bisectors of 3x + 4y − 5 = 0 and 5x − 12y + 7 = 0 meet at right angles. Reason: the two bisectors of any pair of lines are perpendicular.", "The perpendicularity is a general property, not special to this pair.", "Both true, and the reason explains the assertion", 2, 2, "Assertion–reason"],
      ["Why is the perpendicular distance used rather than a horizontal one?", "The perpendicular is the shortest route to the line.", "Because the shortest distance from a point to a line is measured along the perpendicular", 0, 2, "Explain"],
      ["Match: distance formula and bisector formula with (a) |ax₁ + by₁ + c|/√(a² + b²), (b) (a₁x + b₁y + c₁)/√(a₁² + b₁²) = ±(a₂x + b₂y + c₂)/√(a₂² + b₂²).", "One gives a number, the other an equation.", "Distance → (a), bisector → (b)", 2, 2, "Match"],
      ["Find the point(s) on the x-axis whose distance from 4x + 3y − 6 = 0 is 3.", "|4a − 6|/5 = 3 ⇒ 4a − 6 = ±15", "a = 21/4 or a = −9/4", 0, 4, "Word problem"],
    ],
  },
  {
    slug: "pair-of-straight-lines",
    items: [
      ["The angle between the lines of x² − y² = 0 is (A) 45° (B) 60° (C) 90° (D) 0°.", "a + b = 1 − 1 = 0 ⇒ perpendicular", "C — 90°", 1, 1, "MCQ"],
      ["x² − 4y² = 0 separates into (A) x = ±2y (B) x = ±y/2 (C) y = ±2x (D) x = ±4y.", "x² = 4y² ⇒ x = ±2y", "A — x = ±2y", 0, 1, "MCQ"],
      ["ax² + 2hxy + by² = 0 gives two real lines when (A) h² > ab (B) h² ≥ ab (C) h² < ab (D) a = b.", "The quadratic in the slope must have real roots.", "B — h² ≥ ab", 2, 1, "MCQ"],
      ["True or false: ax² + 2hxy + by² = 0 always passes through the origin.", "Every term is at least quadratic.", "True", 0, 1, "True/False"],
      ["True or false: if a + b = 0 the pair of lines is perpendicular.", "Then tanθ is infinite.", "True", 3, 1, "True/False"],
      ["For a pair of lines, tanθ = ______.", "Half-angle form written with a, h, b.", "2√(h² − ab)/(a + b)", 1, 1, "Fill in"],
      ["The sum of the slopes of ax² + 2hxy + by² = 0 is ______.", "Compare the quadratic in m.", "−2h/b", 3, 1, "Fill in"],
      ["A student separates x² + xy − 6y² = 0 as x = 3y and x = −2y. Correct it.", "Factorise: (x + 3y)(x − 2y) = 0", "x = −3y and x = 2y", 0, 2, "Spot the error"],
      ["Assertion: x² + 2xy + y² = 0 represents a single line. Reason: the expression is a perfect square.", "(x + y)² = 0 gives x + y = 0 twice.", "Both true, and the reason explains it", 2, 2, "Assertion–reason"],
      ["Why does the angle formula not need the individual slopes?", "It is written in the coefficients, which already encode both slopes.", "Because a, h, b determine the pair, so the angle can be read from them directly", 1, 2, "Explain"],
      ["Match h² > ab, h² = ab, h² < ab with (a) coincident lines, (b) two real lines, (c) no real pair.", "The sign of h² − ab decides the split.", "h² > ab → (b), h² = ab → (a), h² < ab → (c)", 3, 2, "Match"],
      ["Find the angle between the pair x² − 3xy + y² = 0.", "a = 1, b = 1, h = 1.5\ntanθ = 2√(2.25 − 1)/2 = √1.25", "θ = tan⁻¹(1.118) ≈ 48.2°", 1, 4, "Case study"],
    ],
  },
  {
    slug: "coordinates-in-space",
    items: [
      ["The distance of (a, b, c) from the origin is (A) a + b + c (B) √(a² + b² + c²) (C) √(a + b + c) (D) a² + b² + c².", "Extend Pythagoras to three dimensions.", "B — √(a² + b² + c²)", 0, 1, "MCQ"],
      ["The angle between (1, 0, 0) and (0, 1, 0) is (A) 0° (B) 45° (C) 90° (D) 180°.", "Their dot product is 0.", "C — 90°", 2, 1, "MCQ"],
      ["Direction cosines always satisfy (A) l + m + n = 1 (B) l² + m² + n² = 1 (C) lmn = 1 (D) l² + m² + n² = 0.", "They are the components of a unit vector.", "B — l² + m² + n² = 1", 1, 1, "MCQ"],
      ["True or false: if a₁a₂ + b₁b₂ + c₁c₂ = 0 the two lines are perpendicular.", "A zero dot product of the direction vectors means a right angle.", "True", 3, 1, "True/False"],
      ["True or false: the internal section formula also works when the ratio is written as m : n with m + n ≠ 0.", "Dividing by m + n is valid there.", "True", 0, 1, "True/False"],
      ["The midpoint of (x₁, y₁, z₁) and (x₂, y₂, z₂) is ______.", "Average each coordinate.", "((x₁ + x₂)/2, (y₁ + y₂)/2, (z₁ + z₂)/2)", 0, 1, "Fill in"],
      ["Direction ratios are proportional to the ______ of the line.", "One is a scaled version of the other.", "direction cosines", 1, 1, "Fill in"],
      ["A student states that the direction cosines of (2, 2, 1) are (2, 2, 1). Correct it.", "Direction cosines must have unit total length; divide by √9 = 3.", "(2/3, 2/3, 1/3)", 1, 2, "Spot the error"],
      ["Assertion: (1, 0, 0) and (0, 1, 0) are perpendicular. Reason: their dot product is zero.", "The zero dot product is the perpendicularity test.", "Both true, and the reason is the test", 3, 2, "Assertion–reason"],
      ["Why are direction ratios not unique for a line?", "Only the ratios matter, not the actual lengths.", "Any non-zero multiple of a direction ratio describes the same direction", 1, 2, "Explain"],
      ["Match the x-axis and the z-axis with (a) (0, 0, 1), (b) (1, 0, 0).", "Each axis points along one coordinate.", "x-axis → (b), z-axis → (a)", 1, 2, "Match"],
      ["Find the point that divides A(2, 1, 0) and B(4, 3, 2) internally in the ratio 1 : 2.", "((1·4 + 2·2)/3, (1·3 + 2·1)/3, (1·2 + 2·0)/3)", "(8/3, 5/3, 2/3)", 0, 4, "Case study"],
    ],
  },
];
