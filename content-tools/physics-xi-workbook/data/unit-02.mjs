/**
 * Physics XI — Unit 2, Vectors.
 * Item shape: [question, working, answer, marks, topicIndex]
 */

export const CHAPTERS = [
  {
    slug: "triangle-and-parallelogram-laws",
    items: [
      ["Two forces of 3 N and 4 N act at right angles. Find the resultant.", "R = √(P² + Q² + 2PQcos 90°) = √(9 + 16).\n= 5 N.", "5 N", "1", 1],
      ["Find the resultant of two equal forces P acting at 120°.", "R = √(P² + P² + 2P²cos 120°) = √(2P² − P²).\n= P.", "R = P, bisecting the angle", "1", 1],
      ["What is the greatest possible resultant of 5 N and 3 N?", "The resultant is largest when the forces act in the same direction.\nRmax = 5 + 3.", "8 N", "1", 0],
      ["What is the least possible resultant of 5 N and 3 N?", "The resultant is smallest when they act in opposite directions.\nRmin = 5 − 3.", "2 N", "1", 0],
      ["Find the resultant of 6 N and 8 N acting at 60°.", "R² = 36 + 64 + 2(6)(8)cos 60° = 100 + 48 = 148.\nR = √148 = 12.2 N.", "12.2 N", "2", 1],
      ["Two equal forces of 10 N give a resultant of 10 N. Find the angle between them.", "100 = 100 + 100 + 200cos θ ⇒ cos θ = −0.5.\nθ = 120°.", "120°", "2", 1],
      ["Forces of 5 N and 12 N act at right angles. Find the resultant and its direction.", "R = √(25 + 144) = 13 N.\ntan α = 12/5 ⇒ α = 67.4° with the 5 N force.", "13 N at 67.4° to the 5 N force", "2", 1],
      ["The resultant of P and Q has the same magnitude as P. Find the angle between them.", "P² = P² + Q² + 2PQcos θ ⇒ cos θ = −Q/(2P).\nSo θ = cos⁻¹(−Q/2P).", "θ = cos⁻¹(−Q/2P)", "3", 3],
      ["Forces of 3 N, 4 N and 5 N act along the sides of a triangle taken in order. Find the resultant.", "The vectors close the triangle head to tail, so the polygon law gives a zero vector.\nNo unbalanced force remains.", "Zero — the body stays in equilibrium", "3", 2],
      ["A body is in equilibrium under three forces, two of which are 6 N and 8 N at right angles. Find the third.", "Their resultant is √(36 + 64) = 10 N.\nThe third force must be the equilibrant: equal and opposite.", "10 N opposite to the resultant", "2", 3],
      ["Forces of 8 N and 6 N have a resultant of 10 N. Find the angle between them.", "100 = 64 + 36 + 96cos θ ⇒ cos θ = 0.\nθ = 90°.", "90°", "3", 1],
      ["State the polygon law and use it to find the resultant of four forces along the sides of a closed quadrilateral.", "If several vectors are represented in magnitude and direction by the sides of a polygon taken in order, their resultant is the closing side.\nFor a closed polygon the closing side is zero.", "Resultant = 0", "2", 2],
    ],
  },
  {
    slug: "resolution-of-vectors",
    items: [
      ["Resolve a 20 N force acting at 30° above the horizontal.", "Fx = 20cos 30° = 17.3 N and Fy = 20sin 30°.\n= 10 N.", "17.3 N horizontal, 10 N vertical", "1", 0],
      ["Write the unit vector along 3i + 4j.", "|A| = √(9 + 16) = 5.\nÂ = A/|A|.", "Â = (3i + 4j)/5", "1", 1],
      ["Find the magnitude of 2i − 3j + 6k.", "|A| = √(4 + 9 + 36) = √49.\n= 7.", "7 units", "1", 1],
      ["Find the angle that A = 3i + 4j makes with the x-axis.", "tan θ = Ay/Ax = 4/3.\nθ = 53.1°.", "53.1°", "1", 3],
      ["Add A = 2i + 3j and B = i − j. Give the magnitude and direction of the resultant.", "R = 3i + 2j, |R| = √(9 + 4) = 3.6.\ntan θ = 2/3 ⇒ θ = 33.7°.", "3.6 units at 33.7° to the x-axis", "2", 2],
      ["A force of 10 N acts at 60° to the horizontal. Find its horizontal component.", "Fx = 10cos 60° = 10 × 0.5.\n= 5 N.", "5 N", "2", 0],
      ["Find the vector of magnitude 10 along 3i + 4j.", "|A| = 5, so the unit vector is (3i + 4j)/5.\nMultiplying by 10 gives 2(3i + 4j).", "6i + 8j", "2", 2],
      ["Forces of 4 N east, 3 N north and 4 N west act on a particle. Find the resultant.", "The east and west forces cancel, leaving only the north component.\nSo R = 3 N north.", "3 N due north", "3", 0],
      ["Find A + B for A = i + j and B = i − j, and state its direction.", "The j components cancel: A + B = 2i.\nA vector along +x has no angle with the x-axis.", "2i, along the x-axis (0°)", "3", 2],
      ["Write the direction cosines of 2i − 2j + k.", "|A| = √(4 + 4 + 1) = 3.\ncos α = 2/3, cos β = −2/3, cos γ = 1/3.", "(2/3, −2/3, 1/3)", "2", 1],
      ["Resolve a 50 N force acting at 37° to the horizontal, taking cos 37° = 0.8.", "Fx = 50 × 0.8 = 40 N and Fy = 50 × 0.6.\n= 30 N.", "40 N horizontal, 30 N vertical", "3", 0],
      ["Can three vectors of magnitudes 3, 4 and 8 units give a zero resultant?", "A zero resultant needs the largest to be no greater than the sum of the others.\nHere 8 > 3 + 4, so no triangle can close.", "No — 8 > 3 + 4", "2", 3],
    ],
  },
  {
    slug: "scalar-and-vector-products",
    items: [
      ["Find A·B for A = 2i + 3j and B = i − j.", "A·B = (2)(1) + (3)(−1) + (0)(0).\n= −1.", "A·B = −1", "1", 0],
      ["Evaluate i × j.", "The cross product of the unit vectors follows the cyclic order i → j → k.\nSo i × j = k.", "k", "1", 1],
      ["State the angle between i and k.", "The coordinate axes are mutually perpendicular.\nSo the angle is 90° and i·k = 0.", "90°", "1", 2],
      ["What does A·B = 0 mean for non-zero vectors?", "A·B = |A||B|cos θ, so cos θ = 0.\nThe vectors are perpendicular.", "They are perpendicular", "1", 0],
      ["Find the angle between A = i + j and B = i − j.", "A·B = 1 − 1 = 0 and both are non-zero.\nSo cos θ = 0 and θ = 90°.", "90°", "2", 2],
      ["Find the work done by F = 3i + 4j in a displacement of 2i metres.", "W = F·d = (3)(2) + (4)(0).\n= 6 J.", "6 J", "2", 0],
      ["Find |A × B| for A = 2i and B = 3j.", "A × B = 6(i × j) = 6k.\n|A × B| = 6.", "6 square units", "2", 1],
      ["Find the torque about the origin of F = 2i + j acting at r = 3i.", "τ = r × F = 3i × (2i + j) = 3(i × j) since i × i = 0.\n= 3k.", "3k N m", "2", 1],
      ["Find the area of the triangle whose two sides from a vertex are A = i + j and B = j + k.", "A × B = (1)(1)i − (1)(1)j + (1)(1)k = i − j + k, of magnitude √3.\nArea = ½√3.", "0.87 square units", "3", 1],
      ["Evaluate A·(B × C) for A = i, B = j and C = k.", "B × C = j × k = i.\nA·i = i·i = 1.", "1", "3", 3],
      ["If |A| = 2, |B| = 3 and the angle between them is 60°, find A·B.", "A·B = |A||B|cos 60° = (2)(3)(0.5).\n= 3.", "A·B = 3", "2", 0],
      ["If |A| = 3, |B| = 4 and |A × B| = 6, find A·B.", "|A × B| = |A||B|sin θ = 12sin θ = 6 ⇒ sin θ = 0.5.\nThen cos θ = ±√3/2 and A·B = 12cos θ.", "A·B = ±6√3 ≈ ±10.4", "3", 2],
    ],
  },
];
