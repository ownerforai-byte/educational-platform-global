/**
 * Unit 1 — Algebra: two-mark conceptual answers, six per A4 sheet.
 * Item shape: [question, model answer, 2, topicIndex]
 */

export const CONCEPT = [
  {
    slug: "logic-and-sets",
    items: [
      ["What is a statement in logic?", "A sentence that is either true or false, but never both. A command or a question, such as “Study mathematics”, is not a statement.", 2, 0],
      ["When are two sets A and B equal?", "When they contain exactly the same elements, i.e. A ⊆ B and B ⊆ A. Order and repetition do not matter.", 2, 1],
      ["Why is the empty set a subset of every set?", "A ⊆ B means every element of A lies in B; the empty set has no element that could fail the test, so the condition holds vacuously.", 2, 2],
      ["What is the power set of a set with n elements?", "The set of all its subsets, written P(A). It has 2ⁿ members, because each element is either chosen or not.", 2, 2],
      ["State De Morgan's laws for sets.", "(A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′: complementing reverses union and intersection.", 2, 3],
      ["What is the difference between A − B and B − A?", "A − B holds the elements of A that are not in B; B − A holds the elements of B that are not in A. They are equal only when both are empty.", 2, 3],
    ],
  },
  {
    slug: "real-numbers-modulus",
    items: [
      ["What does |x| mean?", "The distance of x from 0 on the number line: |x| = x for x ≥ 0 and |x| = −x for x < 0. It is never negative.", 2, 0],
      ["Why does |x| = a, with a > 0, give two solutions?", "Exactly two points lie at distance a from 0, namely x = a and x = −a. For a = 0 there is one solution and for a < 0 none.", 2, 1],
      ["What does |x − 3| < 2 describe?", "All points whose distance from 3 is less than 2, i.e. 1 < x < 5, or x ∈ (1, 5).", 2, 1],
      ["Is |x + y| = |x| + |y| always true?", "No. The triangle inequality gives |x + y| ≤ |x| + |y|, with equality only when x and y have the same sign or one of them is zero.", 2, 2],
      ["What is the geometric meaning of |x − a|?", "The distance between the point x and the fixed point a on the number line; that is why modulus equations describe distances.", 2, 2],
      ["Why do we split at critical points when solving a modulus equation?", "The sign of the expression inside each modulus changes there, so the equation takes a different algebraic form on each piece of the number line.", 2, 3],
    ],
  },
  {
    slug: "functions",
    items: [
      ["What are the domain and the range of a function?", "The domain is the set of all inputs the function accepts; the range is the set of all outputs it actually produces.", 2, 0],
      ["When is a function one-one?", "When different inputs always give different outputs, i.e. f(a) = f(b) forces a = b. Its graph then meets every horizontal line at most once.", 2, 0],
      ["When is a function onto?", "When its range equals its codomain, so every element of the codomain is the image of at least one input.", 2, 1],
      ["Why is f⁻¹ not the same as 1/f?", "f⁻¹ undoes the operation of f, so f(f⁻¹(x)) = x. The reciprocal 1/f(x) is a different function altogether.", 2, 2],
      ["When does the inverse of a function exist?", "Exactly when the function is both one-one and onto (bijective), because only then can each output be traced back to one input.", 2, 2],
      ["What does the graph of f⁻¹ look like compared with f?", "It is the reflection of the graph of f in the line y = x, since the roles of x and y are interchanged.", 2, 3],
    ],
  },
  {
    slug: "curve-sketching",
    items: [
      ["Why is the vertex of a parabola important?", "It is the turning point: the lowest point when the curve opens upward and the highest when it opens downward, and the axis of symmetry passes through it.", 2, 0],
      ["What does the sign of the x² coefficient decide?", "A positive coefficient makes the parabola open upward and a negative one makes it open downward.", 2, 0],
      ["How do you find the y-intercept of a curve?", "Put x = 0 and evaluate y. For y = ax² + bx + c the y-intercept is c.", 2, 1],
      ["What does the discriminant tell you about the graph?", "Δ > 0 gives two x-intercepts, Δ = 0 gives one (the vertex touches the axis), and Δ < 0 means the curve never meets the x-axis.", 2, 2],
      ["What is the axis of symmetry of y = ax² + bx + c?", "The vertical line x = −b/2a, which passes through the vertex and splits the parabola into two mirror halves.", 2, 2],
      ["Why does y = |f(x)| have a corner where f changes sign?", "The part below the axis is reflected upward, so the slope changes from negative to positive there and the curve has no unique tangent.", 2, 3],
    ],
  },
  {
    slug: "sequence-and-series",
    items: [
      ["What is the difference between a sequence and a series?", "A sequence is an ordered list of terms, while a series is the sum of those terms.", 2, 0],
      ["When is a sequence an arithmetic progression?", "When the difference between consecutive terms is the same constant d, so tₙ = a + (n − 1)d.", 2, 0],
      ["Why must |r| < 1 for a geometric series to have a sum to infinity?", "Only then do the terms shrink towards zero fast enough for the partial sums to settle; the sum is a/(1 − r).", 2, 1],
      ["What is the arithmetic mean of a and b?", "The single number (a + b)/2, which lies midway between them so that a, (a + b)/2, b form an AP.", 2, 2],
      ["Why is tₙ = Sₙ − Sₙ₋₁?", "The sum of the first n terms is the sum of the first n − 1 terms plus the nth term, so subtracting removes everything except tₙ.", 2, 2],
      ["What is the geometric mean of two positive numbers a and b?", "√(ab), the middle term that makes a, √(ab), b a geometric progression.", 2, 3],
    ],
  },
  {
    slug: "matrices-and-determinants",
    items: [
      ["When can two matrices be multiplied?", "When the number of columns of the first equals the number of rows of the second; the product then has the outer dimensions.", 2, 0],
      ["What does det A = 0 mean?", "The matrix is singular: it has no inverse, and the corresponding system either has no solution or infinitely many.", 2, 0],
      ["What is the identity matrix?", "The square matrix with 1s on the main diagonal and 0 elsewhere; it satisfies AI = IA = A for every compatible A.", 2, 1],
      ["Why is AB usually not equal to BA?", "Matrix multiplication is not commutative: the product depends on the order of the factors, and one order may not even be defined.", 2, 2],
      ["What is the adjugate used for?", "It gives the inverse: A⁻¹ = adj A / det A, which exists only when det A ≠ 0.", 2, 2],
      ["When does a linear system have a unique solution?", "When the determinant of the coefficient matrix is non-zero, so the matrix is invertible.", 2, 3],
    ],
  },
  {
    slug: "quadratic-equations",
    items: [
      ["For ax² + bx + c = 0, what are the sum and the product of the roots?", "α + β = −b/a and αβ = c/a, which follow from comparing x² − (α + β)x + αβ with the equation divided by a.", 2, 0],
      ["What does the discriminant decide?", "Δ = b² − 4ac: positive gives two real roots, zero gives equal real roots, negative gives a pair of complex conjugate roots.", 2, 1],
      ["How do you form the quadratic whose roots are α and β?", "Use x² − (α + β)x + αβ = 0, so the sum and product of the roots determine the equation up to a constant multiple.", 2, 1],
      ["Why do complex roots of a real quadratic come in conjugate pairs?", "The coefficients are real, so taking conjugates of the whole equation leaves it unchanged; if a + ib is a root, so is a − ib.", 2, 2],
      ["How is the vertex related to the roots?", "The axis of symmetry x = −b/2a lies exactly midway between the roots, so the vertex x-coordinate is their average.", 2, 2],
      ["When does a quadratic have equal roots?", "When Δ = 0, i.e. b² = 4ac; the parabola then just touches the x-axis at its vertex.", 2, 3],
    ],
  },
  {
    slug: "complex-numbers",
    items: [
      ["What is i?", "The imaginary unit, defined by i² = −1. It lets every negative number have a square root, e.g. √−4 = 2i.", 2, 0],
      ["Why is the conjugate useful?", "Multiplying by the conjugate removes i from a denominator and gives the modulus: z z̄ = a² + b² = |z|².", 2, 0],
      ["What is the geometric meaning of |z|?", "It is the distance of the point representing z from the origin in the Argand plane, |z| = √(a² + b²) for z = a + ib.", 2, 1],
      ["What is arg z?", "The angle the line from the origin to z makes with the positive real axis, taken in the correct quadrant from the signs of a and b.", 2, 2],
      ["Why is |z₁z₂| = |z₁||z₂|?", "Moduli multiply while arguments add when complex numbers are multiplied, so the resulting distance is the product of the two distances.", 2, 2],
      ["What does the Argand plane represent?", "The complex number a + ib as the point (a, b): the real part along the horizontal axis and the imaginary part along the vertical axis.", 2, 3],
    ],
  },
];
