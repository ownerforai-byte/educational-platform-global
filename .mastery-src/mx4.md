@@notes@@
## 1. Topic Introduction — Quantities With Direction

A **vector** carries magnitude *and* direction; a **scalar** carries only magnitude. The theorems of this topic: the **triangle law** of addition, the **parallelogram law**, and the **section formula** for position vectors — the grammar that every later vector result builds on.

%%%
## 2. Fundamental Concepts

### 2.1 Representation and magnitude

- Vector **AB** = position of B minus position of A; written **a** or **AB** with arrow.
- **Magnitude (modulus):** |a| = √(a₁² + a₂² + a₃²) for a = a₁î + a₂ĵ + a₃k̂.
- **Unit vector:** â = a/|a| — same direction, length 1. **Zero vector 0** has magnitude 0 and no defined direction.
- **Theorem (unit vector):** every non-zero vector a has exactly one unit vector in its direction, â = a/|a|; the opposite direction gives −â.

### 2.2 Triangle law of addition

- **Theorem:** placing b's tail at a's head, the sum a + b runs from a's tail to b's head (triangle law). Equivalent **parallelogram law**: from a common tail, a + b is the diagonal of the parallelogram formed by a and b.
- Properties proved from the law: **commutativity** a + b = b + a, **associativity** (a + b) + c = a + (b + c), **a + 0 = a**, **a + (−a) = 0**.

### 2.3 Scalar multiplication

- **λa** stretches a by |λ| and keeps its direction if λ > 0, reverses it if λ < 0; λ = 0 gives 0.
- Distributive laws: **λ(a + b) = λa + λb**, **(λ + μ)a = λa + μa**; **|λa| = |λ||a|**.

### 2.4 Position vector and the section formula

- Point P has position vector **p** = OP (O the origin). Then **AB = b − a** for position vectors a, b.
- **Theorem (internal division):** the point dividing AB internally in ratio m : n has position vector **(n a + m b)/(m + n)**.
- **Theorem (external division):** ratio m : n externally gives **(m b − n a)/(m − n)**.
- **Midpoint:** (a + b)/2 — the m = n special case of the internal formula.
- Proof idea (internal): write AP = (m/(m+n))AB and expand AP = p − a, AB = b − a; solve for p.

%%%
## 3. Scientific Definitions

| Term | Scientific meaning | Example |
|---|---|---|
| **Position vector** | Vector from the origin to the point | P(2, −1, 3) ↔ 2î − ĵ + 3k̂ |
| **Unit vector** | Vector of magnitude 1 giving pure direction | â = a/|a| |
| **Section formula** | Position vector of a point dividing a segment in a ratio | internal m:n: (n a + m b)/(m+n) |
| **Free vector** | A vector identified with all its translates | AB = CD if same magnitude and direction |

%%%
## 4. Detailed Explanation

### 4.1 Why vectors add head-to-tail

- Displacements compose: walking a then b lands you at a + b. The triangle law is bookkeeping for displacements; the parallelogram law is the same fact seen from a shared tail.

### 4.2 Subtraction as reverse addition

- **a − b = a + (−b)**: place −b at a's head; the result runs from b's tail (placed at a's tail) to a's head. Geometrically the other diagonal of the parallelogram.

### 4.3 Direction ratios and direction cosines

- For a = a₁î + a₂ĵ + a₃k̂: direction ratios (a₁, a₂, a₃); direction cosines (a₁/|a|, a₂/|a|, a₃/|a|) satisfy **l² + m² + n² = 1**.

%%%
## 5. Comparison Tables

**Scalars vs vectors**

| Basis | Scalar | Vector |
|---|---|---|
| carries | magnitude only | magnitude + direction |
| examples | mass, speed, work | force, velocity, displacement |
| addition | ordinary | triangle/parallelogram law |
| multiplication by scalar | — | stretches/reverses |

%%%
## 6. Common Confusions

**AB = b − a, not a − b:** the head minus the tail — reversing the order flips the vector.
%%%
**λa reverses only for negative λ:** magnitude scales by |λ|, direction by sign.
%%%
**Section formula weights:** internal m:n gives (n a + m b)/(m+n) — the weights are crossed, not parallel.

%%%
## 7. Exam Application

**NEB 2024 (verified PYQ): Find the unit vector in the direction of a = 2î − 3ĵ + 6k̂. (3m)** — **Magnitude:** |a| = √(2² + (−3)² + 6²) = √(4 + 9 + 36) = √49 = **7**. **Unit vector:** â = a/|a| = **(2î − 3ĵ + 6k̂)/7**. Check: |â| = √(4 + 9 + 36)/7 = 7/7 = 1 ✓ and its components keep the sign pattern of a (same direction).
%%%
**NEB 2022 (verified PYQ): The position vectors of A and B are a = 2î + ĵ − k̂ and b = î − 3ĵ + 2k̂. Find the position vector of the point dividing AB internally in the ratio 2:3. (3m)** — Internal division in ratio m : n = 2 : 3 uses **p = (n a + m b)/(m + n)**: p = (3a + 2b)/5 = [3(2î + ĵ − k̂) + 2(î − 3ĵ + 2k̂)]/5 = [(6î + 3ĵ − 3k̂) + (2î − 6ĵ + 4k̂)]/5 = (8î − 3ĵ + k̂)/5. **Position vector: (8/5)î − (3/5)ĵ + (1/5)k̂.** (Weights crossed: the ratio member 2 multiplies b, the far endpoint.)

@@keyPoints@@
Vector: magnitude + direction; |a| = sqrt(a1^2+a2^2+a3^2); unit vector a-hat = a/|a|; zero vector has no direction. Triangle law: a + b runs from a's tail to b's head; parallelogram law: diagonal from common tail. Addition is commutative and associative; a + (-a) = 0. Scalar multiplication: |la| = |l||a|, reverses direction for negative l; distributive over vector and scalar sums. AB = b - a (head minus tail). Section formula: internal m:n => (n a + m b)/(m+n); external => (m b - n a)/(m-n); midpoint = (a+b)/2. Direction cosines l,m,n satisfy l^2 + m^2 + n^2 = 1.
@@importantConcepts@@
Vectors add like displacements: head-to-tail bookkeeping is the triangle law, and every algebraic property of addition is a consequence of it.
@@examples@@
***The crossed weights*** — internal division 2:3 gives (3a + 2b)/5: the ratio member multiplies the opposite endpoint, and the midpoint case m = n collapses the formula to (a+b)/2.
@@universalFacts@@
The section formula is coordinate geometry in disguise: the same crossed-weights rule works for plain coordinates (x, y, z) because position vectors are coordinates wearing arrows.
@@importantStatements@@
"The point dividing AB internally in ratio m:n has position vector (n a + m b)/(m+n); externally (m b - n a)/(m-n)."
@@importantNotes@@
Verified PYQs: NEB 2024 (unit vector of 2i - 3j + 6k), NEB 2022 (internal division 2:3) — assigned to this row. Other items are NEB-style practice.
@@examShortTricks@@
|a| from Pythagoras in 3D; divide by it for the unit vector. AB = b - a. Internal m:n: cross the weights. External division: same crossing with a minus.
@@examNotes@@
For section-formula answers, state the formula before substituting — the crossed-weights step carries the method mark.
@@formulas@@
- |a| = √(a₁² + a₂² + a₃²); â = a/|a|; |λa| = |λ||a|
- a + b: triangle law (head-to-tail); parallelogram diagonal from common tail
- AB = b − a; internal division m:n: (n a + m b)/(m+n); external: (m b − n a)/(m−n); midpoint (a+b)/2
- l² + m² + n² = 1 for direction cosines
@@practice@@
Find the unit vector in the direction of a = 2î − 3ĵ + 6k̂.
%%%
Find the position vector of the point dividing AB in ratio 2:3 internally, with a = 2î + ĵ − k̂, b = î − 3ĵ + 2k̂.
%%%
State the triangle and parallelogram laws and prove commutativity of vector addition.
@@practiceQuestions@@
**NEB 2024 (verified PYQ): Find the unit vector in the direction of a = 2î − 3ĵ + 6k̂. (3m)** — **Step 1 — magnitude:** |a| = √(2² + (−3)² + 6²) = √(4 + 9 + 36) = **√49 = 7**. **Step 2 — unit vector:** â = a/|a| = **(2î − 3ĵ + 6k̂)/7**, i.e. (2/7)î − (3/7)ĵ + (6/7)k̂. **Check:** |â| = √((2/7)² + (3/7)² + (6/7)²) = √49/7 = 1 ✓ — the components (2/7, −3/7, 6/7) are also the direction cosines of a, and they satisfy l² + m² + n² = 1.
%%%
**NEB 2022 (verified PYQ): The position vectors of A and B are a = 2î + ĵ − k̂ and b = î − 3ĵ + 2k̂. Find the position vector of the point which divides AB internally in the ratio 2:3. (3m)** — **Section formula (internal, m:n = 2:3):** p = **(n a + m b)/(m + n)** = (3a + 2b)/5 — note the crossed weights. **Substitute:** 3a = 6î + 3ĵ − 3k̂; 2b = 2î − 6ĵ + 4k̂; sum = 8î − 3ĵ + k̂. **Result: p = (8/5)î − (3/5)ĵ + (1/5)k̂.** Sanity check: the point must lie between A and B; indeed p = a + (2/5)(b − a), matching the ratio 2:3 measured from A.
%%%
**NEB-style (2m): Show that vector addition is commutative using the parallelogram law.** — Draw vectors **a** and **b** from a common tail O. The **parallelogram law** says a + b is the diagonal from O of the parallelogram with sides a and b. The same parallelogram, read with b as the first side, has the **same diagonal** from O: b + a. One diagonal, two readings — hence **a + b = b + a**. (Equivalently, walking a-then-b or b-then-a along the triangle's two paths lands at the same third vertex.)
@@summary@@
A vector is magnitude **with** direction; its length is √(a₁² + a₂² + a₃²) and its direction is captured by the unit vector **â = a/|a|** (NEB 2024: (2î − 3ĵ + 6k̂)/7). **Addition** obeys the triangle law — head-to-tail — equivalently the parallelogram diagonal, and inherits commutativity, associativity, and inverses from it. **Scalar multiplication** scales by |λ| and reverses for negative λ. With position vectors, **AB = b − a** and the **section formula** locates dividing points: internal m:n gives **(n a + m b)/(m+n)** (weights crossed — NEB 2022's 2:3 division yields (8î − 3ĵ + k̂)/5), external division flips to (m b − n a)/(m−n), and the midpoint is the m = n collapse (a + b)/2. Direction cosines l, m, n satisfy l² + m² + n² = 1 — the vector grammar on which every later vector theorem stands.
