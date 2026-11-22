@@notes@@
## 1. Topic Introduction — Building Vectors From a Basis

Any vector in a plane can be rebuilt from **two** independent directions; in space, from **three**. The theorems: **linear combination**, and the tests for **linear dependence and independence** — the algebra that decides when a set of vectors genuinely spans a space.

%%%
## 2. Fundamental Concepts

### 2.1 Linear combination

- **Definition:** v is a linear combination of a₁, a₂, …, aₙ if **v = c₁a₁ + c₂a₂ + ⋯ + cₙaₙ** for scalars cᵢ.
- The standard basis î, ĵ, k̂ rebuilds any vector: a = a₁î + a₂ĵ + a₃k̂ — the coefficients *are* the components.

### 2.2 Linear dependence and independence

- **Definition:** vectors are **linearly dependent** if some non-trivial combination c₁a₁ + ⋯ + cₙaₙ = **0** exists (some cᵢ ≠ 0); otherwise **linearly independent**.
- **Theorem:** two vectors are dependent ⟺ one is a scalar multiple of the other ⟺ they are parallel (collinear as free vectors).
- **Theorem:** three vectors are dependent ⟺ they are **coplanar**.
- **Theorem:** any set containing the zero vector is dependent (take the zero's coefficient non-zero, others zero).

### 2.3 The determinant test

- For three vectors a, b, c in components: they are independent ⟺ the determinant of the 3×3 matrix of components is **non-zero**; dependent ⟺ the determinant is zero (equivalently the scalar triple product [a b c] = 0).

### 2.4 Why independence matters

- Independent vectors give **unique** coordinates: if a, b, c are independent and x = αa + βb + γc, the coefficients α, β, γ are forced. Dependent sets admit many representations — ambiguity.

%%%
## 3. Scientific Definitions

| Term | Scientific meaning | Example |
|---|---|---|
| **Linear combination** | c₁a₁ + ⋯ + cₙaₙ with scalars cᵢ | 3î + ĵ from î, ĵ |
| **Linearly dependent** | A non-trivial combination equals 0 | a and 2a |
| **Linearly independent** | Only the trivial combination gives 0 | î, ĵ, k̂ |
| **Basis** | An independent set that spans the space | {î, ĵ, k̂} for 3D |

%%%
## 4. Detailed Explanation

### 4.1 Dependence = redundancy

- A dependent vector adds no new direction: it already lives in the span of the others. Independence is the precise statement of "every vector pulls its own weight".

### 4.2 Counting directions

- In 2D, at most 2 independent vectors; in 3D, at most 3. Any fourth vector is automatically a combination of a spanning independent trio — that is what "dimension" means.

### 4.3 The determinant as a volume

- |[a b c]| is the volume of the parallelepiped spanned by a, b, c. Dependence (det = 0) means the box is flattened — the vectors share a plane (or line).

%%%
## 5. Comparison Tables

**Dependence tests**

| Vectors | Test | Dependent when |
|---|---|---|
| two, a and b | b = λa? | parallel |
| three, a b c | [a b c] = 0? | coplanar |
| any set | contains 0? | always |

%%%
## 6. Common Confusions

**Dependence needs a non-trivial combination:** c₁ = c₂ = 0 always works — the definition demands some cᵢ ≠ 0.
%%%
**Parallel ≠ dependent for two vectors? No — they are the same thing:** parallel (non-zero) vectors are exactly the dependent pairs.
%%%
**Coplanar is dependence for three, not for two:** two vectors are always coplanar (any two directions define a plane); dependence for pairs is parallelism.

%%%
## 7. Exam Application

**NEB-style (3m): Show that the vectors 2î + ĵ − k̂, î − 3ĵ + 2k̂ and 7î − ĵ − k̂ are linearly dependent or independent.** — Compute the determinant of components: | 2 1 −1; 1 −3 2; 7 −1 −1 | = 2[(−3)(−1) − (2)(−1)] − 1[(1)(−1) − (2)(7)] + (−1)[(1)(−1) − (−3)(7)] = 2[3 + 2] − 1[−1 − 14] − 1[−1 + 21] = 10 + 15 − 20 = **5 ≠ 0**. The determinant is non-zero, so the vectors are **linearly independent** — they span space, and no one of them is a combination of the other two.
%%%
**NEB-style (2m): For what value of k are the vectors î + ĵ + k̂, 2î + ĵ + 3k̂ and î + k̂ + k k̂...** — generic determinant-equals-zero exercise: set the component determinant to zero and solve for the parameter; the resulting k makes the third vector a combination of the first two (coplanar family).
%%%
**NEB-style (2m): Prove that any three vectors including the zero vector are linearly dependent.** — Let the set be {0, b, c}. Choose coefficients c₁ = 1 (on 0), c₂ = 0, c₃ = 0: the combination **1·0 + 0·b + 0·c = 0** is non-trivial (c₁ ≠ 0), so dependence is witnessed immediately — no geometry needed.

@@keyPoints@@
Linear combination: v = c1 a1 + ... + cn an. Dependent: some non-trivial combination equals 0; independent: only the trivial one. Two vectors dependent <=> parallel (one is a scalar multiple). Three vectors dependent <=> coplanar. Any set containing the zero vector is dependent. Determinant test: three vectors in components are independent iff the 3x3 determinant of components is non-zero (equivalently scalar triple product non-zero). Independent sets give unique coefficients; the standard basis i, j, k rebuilds every vector as a1 i + a2 j + a3 k.
@@importantConcepts@@
Dependence is redundancy: a dependent vector adds no new direction, and the determinant/volume test detects the flattening geometrically.
@@examples@@
***The flattened box*** — three vectors span a parallelepiped of volume |[a b c]|; dependence (det = 0) is exactly the box collapsing into a plane.
@@universalFacts@@
In 3D no set of four vectors can be independent — the fourth is always a combination of an independent trio; that is the meaning of dimension three.
@@importantStatements@@
"Vectors are linearly dependent iff a non-trivial combination equals the zero vector; for three space vectors this is equivalent to coplanarity."
@@importantNotes@@
No verified PYQ on this row exists in the bank; all items here are NEB-style practice.
@@examShortTricks@@
Two vectors: check one = multiple of the other. Three: compute the component determinant. Zero vector in the set: dependent, done. Parameter questions: set det = 0 and solve.
@@examNotes@@
Show the determinant expansion line by line — the sign errors live in the cofactor signs, and the method mark needs the working.
@@formulas@@
- v = c₁a₁ + c₂a₂ + ⋯ + cₙaₙ
- a, b dependent ⟺ b = λa; a, b, c dependent ⟺ [a b c] = 0
- Independence ⟺ det(a₁ a₂ a₃; b₁ b₂ b₃; c₁ c₂ c₃) ≠ 0
@@practice@@
Test {2î+ĵ−k̂, î−3ĵ+2k̂, 7î−ĵ−k̂} for independence.
%%%
Prove that any set containing the zero vector is dependent.
%%%
Explain why three coplanar vectors cannot span space.
@@practiceQuestions@@
**NEB-style (3m): Show whether the vectors a = 2î + ĵ − k̂, b = î − 3ĵ + 2k̂, c = 7î − ĵ − k̂ are linearly dependent or independent.** — **Test:** three space vectors are independent iff the determinant of their components is non-zero. det = |2 1 −1; 1 −3 2; 7 −1 −1| = 2[(−3)(−1) − (2)(−1)] − 1[(1)(−1) − (2)(7)] + (−1)[(1)(−1) − (−3)(7)] = 2(3 + 2) − 1(−1 − 14) − 1(−1 + 21) = 10 + 15 − 20 = **5 ≠ 0**. **Conclusion:** the vectors are **linearly independent** — none is a combination of the other two, they are not coplanar, and they span all of 3D space (every vector has unique coordinates in this basis).
%%%
**NEB-style (2m): Prove that any set of vectors containing the zero vector is linearly dependent.** — Let the set contain **0** together with any other vectors a₁, …, aₙ. Form the combination with coefficient **1 on the zero vector and 0 on every other vector**: 1·0 + 0·a₁ + ⋯ + 0·aₙ = **0**. This combination is **non-trivial** (the zero's coefficient is 1 ≠ 0), which is precisely the definition of linear dependence. Hence any set containing 0 is dependent — no geometric argument is needed, the definition does all the work.
%%%
**NEB-style (2m): Show that the vectors î + ĵ, ĵ + k̂ and k̂ + î are linearly independent.** — Determinant of components: det = |1 1 0; 0 1 1; 1 0 1| = 1[(1)(1) − (1)(0)] − 1[(0)(1) − (1)(1)] + 0[(0)(0) − (1)(1)] = 1(1) − 1(−1) + 0 = **2 ≠ 0**. Non-zero determinant ⟹ **linearly independent**. Geometric reading: each pair spans a coordinate plane and the trio points out of every plane — they form a (non-orthogonal) basis of space with volume |[a b c]| = 2.
@@summary@@
A **linear combination** rebuilds vectors from chosen directions: v = c₁a₁ + ⋯ + cₙaₙ, with the standard basis î, ĵ, k̂ returning the components themselves. Vectors are **linearly dependent** when a non-trivial combination vanishes — for two vectors that means parallelism (one is a multiple of the other), for three it means **coplanarity**, and any set containing **0** is dependent outright. The working test for three space vectors is the **component determinant**: non-zero ⟹ independent (the parallelepiped has genuine volume), zero ⟹ dependent (the box is flattened). Independence buys uniqueness of coordinates; that is why {î, ĵ, k̂} — and any independent trio — can serve as a basis of space.
