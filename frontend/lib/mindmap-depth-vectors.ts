import type { UnitDepth } from "./mindmap-depth";

/** Vectors — addition, resolution, products. */
export const VECTORS_DEPTH: Record<string, UnitDepth> = {
  vectors: {
    unitFacts: [
      "A quantity is a vector only if BOTH magnitude AND direction matter AND it obeys the parallelogram law of addition. Conventional current is deliberately defined as the flow of positive charge, i.e. opposite to electron flow.",
      "Vectors are independent of the coordinate system: $\\sqrt{A_x^2+A_y^2+A_z^2}$ is rotation-invariant, which is why its square is the true 'length squared'.",
    ],
    unitEdgeCases: [
      "A zero vector has NO defined direction, so it is neither parallel nor perpendicular to anything — yet $\\vec 0 \\times \\vec B = \\vec 0$ always, a favourite trick question.",
      "Displacement is the only path-independent 'vector' in mechanics, so it is the one that survives a closed loop: the net displacement around a circuit is exactly zero.",
    ],
    unitExamAsked: [
      "NEB: 'Two forces of 10 N and 15 N act at 60°; find the resultant.' — $R = \\sqrt{100+225+150} = 21.8$ N.",
      "CEE: 'A vector of magnitude 3 and another of 4 — can their sum be zero?' — no, since $|4-3| \\le R \\le 4+3$ forbids 0.",
    ],
    unitCommonMistakes: [
      "Adding magnitudes: $10 + 15 = 25$ N is wrong unless the forces are collinear and codirectional. Vectors add as arrows, not as numbers.",
      "Losing the direction that makes a quantity a vector, e.g. writing 'displacement is 5 m' with no reference direction.",
    ],
    leaves: {
      "uc-vec-1": {
        keyFacts: [
          "The resultant is bounded: $|P - Q| \\le R \\le P + Q$. The lower bound reaches 0 only when the vectors are exactly antiparallel AND equal in magnitude.",
          "Three equal forces at mutual $120^\\circ$ give zero resultant — the standard 'three forces in equilibrium' MCQ.",
        ],
        edgeCases: [
          "When $P = Q$ and $\\theta = 180^\\circ$, $R = 0$ and the direction of the resultant is UNDEFINED; asking for its angle is meaningless.",
          "$R$ is maximum at $\\theta = 0^\\circ$ and minimum at $\\theta = 180^\\circ$; the squared term $2PQ\\cos\\theta$ is the only thing that varies.",
        ],
        examAsked: [
          "NEB: 'Find the maximum and minimum resultant of 12 N and 5 N.' — 17 N and 7 N.",
          "CEE: 'Two forces are in equilibrium at 90°; one is 6 N. Find the other.' — also 6 N.",
        ],
        commonMistakes: [
          "Using a minus sign: $R = \\sqrt{P^2+Q^2+2PQ\\cos\\theta}$ has a PLUS. The minus version is the law of cosines for the third side of the triangle, which is the vector DIFFERENCE.",
          "Measuring $\\theta$ as the triangle's interior angle rather than the angle between the two arrows drawn from a common tail.",
        ],
      },
      "uc-vec-2": {
        keyFacts: [
          "Subtraction IS addition: $\\vec A - \\vec B = \\vec A + (-\\vec B)$. Reversing a vector rotates its arrow 180° and preserves its magnitude.",
          "$\\vec A - \\vec B$ is the displacement from the head of $\\vec B$ to the head of $\\vec A$ when both share a tail.",
        ],
        edgeCases: [
          "$\\vec A - \\vec A = \\vec 0$ exactly, whereas $\\vec A + (-\\vec A) = \\vec 0$ only after an explicit 180° reversal — same result, but students who picture them differently mis-read the diagram.",
          "$\\vec A - \\vec B = -(\\vec B - \\vec A)$: equal magnitude, opposite direction. Use this as a sanity check when an answer 'looks right but points the wrong way'.",
        ],
        examAsked: [
          "NEB: 'Given $\\vec A = 3\\hat i + 4\\hat j$, $\\vec B = \\hat i - 2\\hat j$, find $\\vec A - \\vec B$ and its magnitude.' — $(2,6)$, $|\\cdot| = 6.32$.",
          "CEE: 'Is vector subtraction commutative?' — no, $A - B \\neq B - A$.",
        ],
        commonMistakes: [
          "Subtracting magnitudes instead of vectors. Here $|A| = 5$ and $|B| = 2.24$ but $|A - B| = 6.32$ — subtract the vectors FIRST, then take the magnitude.",
          "Negating only some components of the second vector.",
        ],
      },
      "uc-vec-3": {
        keyFacts: [
          "Resolution reuses the SOH-CAH-TOA triangle: adjacent is cosine, opposite is sine, with $\\theta$ measured from the chosen axis.",
          "Direction follows from $\\tan\\theta = A_y/A_x$, plus a quadrant correction of $180^\\circ$ when $A_x < 0$.",
        ],
        edgeCases: [
          "If $A_x = 0$ the vector lies along the y-axis and $\\tan\\theta$ is undefined (division by zero) even though the vector itself is perfectly well defined.",
          "In 3D the same formula holds componentwise, and the direction cosines obey $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$.",
        ],
        examAsked: [
          "NEB: 'Resolve a 20 N force into perpendicular components, one axis making 30°.' — $F_x = 17.3$ N, $F_y = 10$ N.",
          "CEE: 'Direction cosines are 0.6, 0.8 and x. Find x.' — $x = 0$.",
        ],
        commonMistakes: [
          "Swapping sine and cosine — if $\\theta$ is measured from the y-axis the roles reverse. Always re-read which axis the angle is taken from.",
          "Using $\\tan\\theta = A_y/A_x$ with no quadrant check, reporting $63.4^\\circ$ for a second-quadrant vector that should read $116.6^\\circ$.",
        ],
      },
      "uc-vec-4": {
        keyFacts: [
          "A unit vector has magnitude exactly 1 and direction only; every vector can be written $\\vec A = A\\hat A$, so $\\hat A$ is just the direction dressed up.",
          "In 3D, $\\hat i + \\hat j + \\hat k$ has magnitude $\\sqrt 3$, NOT 1 — unit vectors are not orthogonal sums of themselves.",
        ],
        edgeCases: [
          "The right-hand rule fixes $\\hat i \\times \\hat j = \\hat k$ and cyclicly, but $\\hat j \\times \\hat i = -\\hat k$: the cross product is anti-commutative, $\\vec A \\times \\vec B = -(\\vec B \\times \\vec A)$.",
          "There is no 'zero unit vector'; $\\hat 0$ cannot be defined because a zero vector has no direction to normalise.",
        ],
        examAsked: [
          "CEE: 'Magnitude of $\\hat i + \\hat j + \\hat k$?' — $\\sqrt 3$.",
          "NEB: 'Write $\\vec A = 3\\hat i + 4\\hat j$ in unit-vector form and find its unit vector.' — $\\hat A = (3\\hat i + 4\\hat j)/5$.",
        ],
        commonMistakes: [
          "Asserting $\\hat i + \\hat j + \\hat k$ is a unit vector because each term is a unit vector. Orthogonality must be squared: $1^2+1^2+1^2 = 3$.",
          "Forgetting the sign when cycling the right-hand rule; $\\hat k \\times \\hat i = \\hat j$ but $\\hat i \\times \\hat k = -\\hat j$.",
        ],
      },
      "uc-vec-5": {
        keyFacts: [
          "The dot product is commutative ($\\vec A\\cdot\\vec B = \\vec B\\cdot\\vec A$) but the cross product is not — the difference is the whole reason physics keeps both.",
          "A dot product of 0 between two non-zero vectors PROVES perpendicularity; that is the standard exam test.",
        ],
        edgeCases: [
          "$\\vec A \\cdot \\vec A = |A|^2 \\ge 0$ for every vector — the dot product of a vector with itself can never be negative, even though $A_x^2+A_y^2+A_z^2$ has negative terms inside the sum.",
          "The dot product is a SCALAR with units: $\\text{N} \\cdot \\text{m}$ for work, $\\text{W}$ for power, $\\text{J}$ for $\\vec F\\cdot\\vec d$.",
        ],
        examAsked: [
          "NEB: 'Show that $(\\vec A+\\vec B)\\cdot(\\vec A-\\vec B) = A^2 - B^2$.' — the cross terms cancel because the dot product is commutative.",
          "CEE: 'For what angle is the dot product equal to the product of magnitudes?' — only $\\theta = 0^\\circ$.",
        ],
        commonMistakes: [
          "Believing the dot product of two non-zero vectors is never zero. Orthogonal vectors give zero, and the dot product of a vector with itself is strictly positive — both are exam favourites.",
          "Treating the dot product as a vector. It is a scalar; giving it a direction loses the mark.",
        ],
      },
      "uc-vec-6": {
        keyFacts: [
          "Only the MAGNITUDE of a cross product is physically meaningful in most curricula, so $\\vec A \\times \\vec B$ and $\\vec B \\times \\vec A$ are equally 'valid' answers differing only in the sense of rotation.",
          "The cross product vanishes for parallel or antiparallel vectors ($|\\vec A\\times\\vec B| = AB\\sin\\theta = 0$), and is maximal at $90^\\circ$.",
        ],
        edgeCases: [
          "The cross product is not defined in 2D — in the plane $\\hat i\\times\\hat j = \\hat k$ points out of the page, so a planar cross product is a formal embedding into 3D.",
          "Unlike the dot product, $\\vec A\\times\\vec A = \\vec 0$: a vector has no torque on itself, which is why a body in pure rotation feels no 'spin torque' from its own momentum.",
        ],
        examAsked: [
          "NEB: 'A charge q moves with velocity $\\vec v$ in field $\\vec B$; write the magnetic force and its direction.' — $\\vec F = q\\vec v\\times\\vec B$, direction by the right-hand rule, and the force does NO work since $\\vec F \\perp \\vec v$.",
          "CEE: '$\\vec A \\times \\vec B$ for $\\vec A = \\hat i$, $\\vec B = \\hat j$?' — $\\hat k$, out of the page.",
        ],
        commonMistakes: [
          "Getting the sense wrong: use the right-hand rule with fingers along the FIRST vector curling toward the SECOND; the thumb gives $\\vec A\\times\\vec B$.",
          "Using the cross product where the dot product belongs, or vice versa. Memory aid: dot = scalar projection (work, power), cross = oriented area (torque, force on a moving charge).",
        ],
      },
    },
  },
};