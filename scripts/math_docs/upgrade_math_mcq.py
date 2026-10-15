import os

def upgrade_math_mcq():
    path = r'c:\Users\ASUS\Desktop\rn\frontend\public\materials\math-mcq-test.md'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update title and subtitle
    old_header = """# MATHEMATICS — Grade 11 (NEB) MCQ Test
### Topics: Matrices and Determinants · Complex Numbers · Analytic Geometry · Calculus
**30 questions per topic (120 total).** Answer key with concept notes at the end."""

    new_header = """# MATHEMATICS — Grade 11 (NEB) Comprehensive Master MCQ Test
### Complete 7-Unit Syllabus: Logic & Sets · Real Numbers · Sequences & Series · Matrices · Quadratics · Complex Numbers · Analytic Geometry · Vectors · Statistics & Probability · Calculus · Computational Methods & Mechanics
**30 questions per topic (300 total).** Comprehensive Answer Key, Exam Shortcuts & Concept Notes at the end."""

    content = content.replace(old_header, new_header)

    additional_questions = """
---

## E. LOGIC, SETS AND REAL NUMBERS — Q121–150

121. A sentence which is either strictly true or strictly false, but not both, is called a:
 A) Statement (Proposition)
 B) Open sentence
 C) Imperative sentence
 D) Paradox

122. The negation of the statement 'Every prime number is odd' is:
 A) There exists at least one prime number that is not odd
 B) Every prime number is even
 C) No prime number is odd
 D) All odd numbers are prime

123. The compound proposition p ∧ q is True if and only if:
 A) Both p and q are True
 B) At least one of p or q is True
 C) Either p is True or q is True, but not both
 D) p is False and q is True

124. The conditional statement p → q is False ONLY when:
 A) p is True and q is False
 B) p is False and q is True
 C) Both p and q are False
 D) Both p and q are True

125. The contrapositive of the implication p → q is logically equivalent to:
 A) ¬q → ¬p
 B) q → p
 C) ¬p → ¬q
 D) p ∧ ¬q

126. A statement that yields True for every possible truth assignment of its components is a:
 A) Tautology
 B) Contradiction
 C) Contingency
 D) Fallacy

127. According to De Morgan's Law of logic, ¬(p ∨ q) is equivalent to:
 A) ¬p ∧ ¬q
 B) ¬p ∨ ¬q
 C) p ∧ q
 D) ¬p → ¬q

128. For two non-empty sets A and B, (A ∪ B)' is equal to:
 A) A' ∩ B'
 B) A' ∪ B'
 C) A ∩ B
 D) (A ∩ B)'

129. If n(A) = 15, n(B) = 20, and n(A ∩ B) = 7, then n(A ∪ B) equals:
 A) 28
 B) 35
 C) 42
 D) 21

130. A relation R on set A is an equivalence relation if and only if it is:
 A) Reflexive, symmetric, and transitive
 B) Reflexive, antisymmetric, and transitive
 C) Symmetric and transitive only
 D) Reflexive and symmetric only

131. The set of all real numbers ℝ is bounded above and has a supremum in ℝ. This property is known as:
 A) Completeness Axiom (Dedekind Completeness)
 B) Archimedean Property
 C) Density of Rationals
 D) Well-Ordering Principle

132. The Archimedean property asserts that for any real numbers x > 0 and y:
 A) There exists a positive integer n such that n·x > y
 B) x is always greater than y
 C) x/y is always a rational number
 D) Every integer is a real number

133. The interval {x ∈ ℝ : -2 < x ≤ 5} is expressed in interval notation as:
 A) (-2, 5]
 B) [-2, 5]
 C) (-2, 5)
 D) [-2, 5)

134. For any real numbers x and y, the Triangle Inequality states:
 A) |x + y| ≤ |x| + |y|
 B) |x + y| ≥ |x| + |y|
 C) |x + y| = |x| + |y|
 D) |x - y| ≤ |x| + |y|

135. The solution set of the inequality |2x - 3| < 5 is:
 A) (-1, 4)
 B) [-1, 4]
 C) (-∞, -1) ∪ (4, ∞)
 D) (1, 4)

136. If S = {1 - 1/n : n ∈ ℕ} = {0, 1/2, 2/3, 3/4, ...}, the supremum sup(S) is:
 A) 1
 B) 0
 C) Does not exist
 D) ∞

137. Which of the following numbers is an irrational number?
 A) √3
 B) 22/7
 C) 3.14159
 D) √9

138. The symmetric difference of two sets A and B, denoted A △ B, is defined as:
 A) (A - B) ∪ (B - A)
 B) (A ∩ B) - (A ∪ B)
 C) A ∩ B'
 D) A' ∪ B'

139. If A has 4 elements, the total number of subsets (power set cardinality) of A is:
 A) 16
 B) 8
 C) 4
 D) 32

140. If f: A → B and g: B → C are both bijections, then the composite function (g ∘ f) is:
 A) A bijection from A to C
 B) Injective only
 C) Surjective only
 D) Not invertible

141. A function f(x) satisfying f(-x) = f(x) for all x in its domain is:
 A) Even function (symmetric about y-axis)
 B) Odd function (symmetric about origin)
 C) Neither even nor odd
 D) A constant function only

142. A function f(x) satisfying f(-x) = -f(x) for all x in its domain is:
 A) Odd function (point symmetry about origin)
 B) Even function
 C) Periodic function with period 1
 D) Strictly increasing

143. The domain of the function f(x) = 1 / √(4 - x²) is:
 A) (-2, 2)
 B) [-2, 2]
 C) (-∞, -2) ∪ (2, ∞)
 D) ℝ - {-2, 2}

144. The range of the function f(x) = x² / (1 + x²) for real x is:
 A) [0, 1)
 B) [0, 1]
 C) (0, 1)
 D) [0, ∞)

145. A curve y = f(x) is symmetric with respect to the y-axis if:
 A) f(-x) = f(x)
 B) f(-x) = -f(x)
 C) f(x) = f(1/x)
 D) f(x + 2) = f(x)

146. A line x = a is called a vertical asymptote of y = f(x) if:
 A) lim x→a f(x) = ±∞
 B) f(a) = 0
 C) f'(a) = 0
 D) lim x→±∞ f(x) = a

147. A line y = L is called a horizontal asymptote of y = f(x) if:
 A) lim x→∞ f(x) = L or lim x→-∞ f(x) = L
 B) f(0) = L
 C) f'(L) = 0
 D) f(L) = 0

148. For the rational function f(x) = (2x + 1)/(x - 3), the horizontal asymptote is:
 A) y = 2
 B) y = 3
 C) x = 3
 D) y = -1/3

149. The oblique (slant) asymptote of f(x) = (x² + 3x + 1)/x is:
 A) y = x + 3
 B) y = x
 C) y = 3x + 1
 D) x = 0

150. If a set S is bounded below, its greatest lower bound is called the:
 A) Infimum
 B) Supremum
 C) Maximum
 D) Minimum

---

## F. SEQUENCES, SERIES & QUADRATIC EQUATIONS — Q151–180

151. If the n-th term of an AP is Tₙ = 3n + 5, its common difference d is:
 A) 3
 B) 5
 C) 8
 D) 2

152. The sum of the first n terms of an AP with first term a and last term l is:
 A) (n/2)(a + l)
 B) n(a + l)
 C) (n/2)(2a + l)
 D) (a + l)/2

153. If a, b, c are in AP, then:
 A) 2b = a + c
 B) b² = ac
 C) b = 2ac/(a + c)
 D) a + b = c

154. If a, b, c are in GP, then:
 A) b² = ac
 B) 2b = a + c
 C) b = (a + c)/2
 D) a² + c² = b²

155. If a, b, c are in HP, then their reciprocals 1/a, 1/b, 1/c are in:
 A) AP
 B) GP
 C) HP
 D) Arithmetic-geometric progression

156. The sum to infinity of a GP with first term a and common ratio r exists if and only if:
 A) |r| < 1
 B) |r| ≤ 1
 C) r > 1
 D) r = 1

157. The sum to infinity of the series 1 + 1/3 + 1/9 + 1/27 + ... is:
 A) 3/2
 B) 2/3
 C) 4/3
 D) 3

158. For any two positive unequal real numbers a and b, the relationship between their AM, GM, and HM is:
 A) AM > GM > HM and GM² = AM · HM
 B) AM < GM < HM and GM² = AM · HM
 C) AM = GM = HM always
 D) AM · GM = HM²

159. The sum of the first n natural numbers ∑ k is:
 A) n(n + 1)/2
 B) n(n + 1)(2n + 1)/6
 C) [n(n + 1)/2]²
 D) n²

160. The sum of the squares of the first n natural numbers ∑ k² is:
 A) n(n + 1)(2n + 1)/6
 B) n(n + 1)/2
 C) [n(n + 1)/2]²
 D) n(n - 1)(2n - 1)/6

161. The sum of the cubes of the first n natural numbers ∑ k³ is equal to:
 A) (∑ k)²
 B) 2 ∑ k
 C) ∑ k²
 D) (∑ k)³

162. The discriminant D of the quadratic equation ax² + bx + c = 0 (a ≠ 0) is:
 A) b² - 4ac
 B) b² + 4ac
 C) 4ac - b²
 D) √(b² - 4ac)

163. The roots of ax² + bx + c = 0 are real and equal if:
 A) b² - 4ac = 0
 B) b² - 4ac > 0
 C) b² - 4ac < 0
 D) b² - 4ac ≥ 1

164. If α and β are the roots of ax² + bx + c = 0, the sum of the roots α + β is:
 A) -b/a
 B) b/a
 C) c/a
 D) -c/a

165. If α and β are the roots of ax² + bx + c = 0, the product of the roots αβ is:
 A) c/a
 B) -c/a
 C) -b/a
 D) a/c

166. A quadratic equation whose roots are α and β is given by:
 A) x² - (α + β)x + αβ = 0
 B) x² + (α + β)x + αβ = 0
 C) x² - (α + β)x - αβ = 0
 D) x² + (α + β)x - αβ = 0

167. If the roots of x² - kx + 9 = 0 are equal, then the value of k is:
 A) ±6
 B) 6 only
 C) ±3
 D) ±9

168. If α and β are the roots of x² - 5x + 6 = 0, the value of α² + β² is:
 A) 13
 B) 25
 C) 12
 D) 37

169. The roots of ax² + bx + c = 0 are complex conjugates of each other if and only if:
 A) b² - 4ac < 0
 B) b² - 4ac = 0
 C) b² - 4ac > 0
 D) a + b + c = 0

170. Two quadratic equations a₁x² + b₁x + c₁ = 0 and a₂x² + b₂x + c₂ = 0 have both roots in common if:
 A) a₁/a₂ = b₁/b₂ = c₁/c₂
 B) a₁a₂ + b₁b₂ = c₁c₂
 C) a₁b₂ - a₂b₁ = 0 only
 D) b₁c₂ - b₂c₁ = 0 only

171. The number of permutations of n distinct objects taken r at a time ⁿPᵣ is:
 A) n! / (n - r)!
 B) n! / [r!(n - r)!]
 C) n! / r!
 D) (n - r)! / n!

172. The number of combinations of n distinct objects taken r at a time ⁿCᵣ is:
 A) n! / [r!(n - r)!]
 B) n! / (n - r)!
 C) n! · r!
 D) (n + r)! / r!

173. The relation between ⁿPᵣ and ⁿCᵣ is:
 A) ⁿPᵣ = r! · ⁿCᵣ
 B) ⁿCᵣ = r! · ⁿPᵣ
 C) ⁿPᵣ = ⁿCᵣ / r!
 D) ⁿPᵣ = n! · ⁿCᵣ

174. According to Pascal's Identity, ⁿCᵣ + ⁿCᵣ₋₁ is equal to:
 A) ⁿ⁺¹Cᵣ
 B) ⁿ⁺¹Cᵣ₋₁
 C) ⁿCᵣ₊₁
 D) ⁿ⁺²Cᵣ

175. The symmetry property of combinations states that ⁿCᵣ equals:
 A) ⁿCₙ₋ᵣ
 B) ⁿ⁻¹Cᵣ
 C) ⁿCᵣ₊₁
 D) ⁿ⁺¹Cₙ₋ᵣ

176. The total number of terms in the binomial expansion of (a + b)ⁿ for n ∈ ℕ is:
 A) n + 1
 B) n
 C) n - 1
 D) 2ⁿ

177. The general term Tᵣ₊₁ in the expansion of (a + b)ⁿ is:
 A) ⁿCᵣ aⁿ⁻ʳ bʳ
 B) ⁿCᵣ aʳ bⁿ⁻ʳ
 C) ⁿCᵣ₊₁ aⁿ⁻ʳ bʳ
 D) ⁿCᵣ aⁿ bʳ

178. If n is an even integer, the number of middle terms in the expansion of (a + b)ⁿ is:
 A) Exactly 1
 B) Exactly 2
 C) n/2
 D) None

179. The sum of all binomial coefficients in (1 + x)ⁿ, i.e., ⁿC₀ + ⁿC₁ + ... + ⁿCₙ, is:
 A) 2ⁿ
 B) 2ⁿ⁻¹
 C) 2ⁿ⁺¹
 D) n²

180. The coefficient of x³ in the expansion of (1 + x)⁵ is:
 A) 10
 B) 5
 C) 20
 D) 1

---

## G. TRIGONOMETRY — Q181–210

181. In any triangle ABC with circumradius R, the Sine Law states:
 A) a / sin A = b / sin B = c / sin C = 2R
 B) a / sin A = b / sin B = c / sin C = R
 C) a sin A = b sin B = c sin C = 2R
 D) sin A / a = 2R

182. In triangle ABC, the Cosine Law for side a is:
 A) a² = b² + c² - 2bc cos A
 B) a² = b² + c² + 2bc cos A
 C) a² = b² - c² - 2bc cos A
 D) a² = bc cos A

183. If in triangle ABC, a² = b² + c², then angle A is:
 A) 90° (Right angle)
 B) 60°
 C) 45°
 D) 120°

184. In triangle ABC, if cos A < 0, then angle A is:
 A) Obtuse (> 90°)
 B) Acute (< 90°)
 C) Right-angled (= 90°)
 D) Reflex (> 180°)

185. The Projection Formula for side a in triangle ABC is:
 A) a = b cos C + c cos B
 B) a = b sin C + c sin B
 C) a = b cos B + c cos C
 D) a = c cos A + b cos C

186. Napier's Analogy (Law of Tangents) states that tan[(B - C)/2] equals:
 A) [(b - c)/(b + c)] cot(A/2)
 B) [(b - c)/(b + c)] tan(A/2)
 C) [(b + c)/(b - c)] cot(A/2)
 D) [(b - c)/(b + c)] sin(A/2)

187. The half-angle formula for sin(A/2) in terms of semi-perimeter s is:
 A) √[ (s - b)(s - c) / (bc) ]
 B) √[ s(s - a) / (bc) ]
 C) √[ (s - b)(s - c) / (s(s - a)) ]
 D) √[ bc / ((s - b)(s - c)) ]

188. The half-angle formula for cos(A/2) in terms of semi-perimeter s is:
 A) √[ s(s - a) / (bc) ]
 B) √[ (s - b)(s - c) / (bc) ]
 C) √[ (s - a)(s - b) / (ab) ]
 D) √[ s(s - b) / (ca) ]

189. Heron's formula for the area Δ of a triangle with sides a, b, c is:
 A) √[ s(s - a)(s - b)(s - c) ]
 B) s(s - a)(s - b)(s - c)
 C) (1/2) s(a + b + c)
 D) √[ (s - a)(s - b)(s - c) ]

190. The inradius r of a triangle with area Δ and semi-perimeter s is:
 A) r = Δ / s
 B) r = s / Δ
 C) r = abc / (4Δ)
 D) r = 4Δ / s

191. The circumradius R of triangle ABC with area Δ is given by:
 A) R = abc / (4Δ)
 B) R = 4Δ / (abc)
 C) R = Δ / s
 D) R = abc / Δ

192. The exradius r₁ opposite to vertex A is given by:
 A) r₁ = Δ / (s - a)
 B) r₁ = Δ / (s - b)
 C) r₁ = (s - a) / Δ
 D) r₁ = s / (s - a)

193. The harmonious relation between inradius r and exradii r₁, r₂, r₃ is:
 A) 1/r₁ + 1/r₂ + 1/r₃ = 1/r
 B) r₁ + r₂ + r₃ = r
 C) r₁ r₂ r₃ = r³
 D) 1/r₁ + 1/r₂ + 1/r₃ = 3/r

194. In the ambiguous case of solving triangles (SSA) with acute angle A, two triangles exist if:
 A) b sin A < a < b
 B) a < b sin A
 C) a = b sin A
 D) a ≥ b

195. The principal value range of y = sin⁻¹x is:
 A) [-π/2, π/2]
 B) [0, π]
 C) (-π/2, π/2)
 D) [0, 2π]

196. The principal value range of y = cos⁻¹x is:
 A) [0, π]
 B) [-π/2, π/2]
 C) (0, π)
 D) [-1, 1]

197. The principal value range of y = tan⁻¹x is:
 A) (-π/2, π/2)
 B) [-π/2, π/2]
 C) [0, π)
 D) (0, π)

198. The value of sin⁻¹(sin(2π/3)) is:
 A) π/3
 B) 2π/3
 C) -π/3
 D) 5π/6

199. For any x ∈ [-1, 1], sin⁻¹(-x) is equal to:
 A) -sin⁻¹x
 B) π - sin⁻¹x
 C) sin⁻¹x
 D) π/2 - sin⁻¹x

200. For any x ∈ [-1, 1], cos⁻¹(-x) is equal to:
 A) π - cos⁻¹x
 B) -cos⁻¹x
 C) cos⁻¹x
 D) π/2 + cos⁻¹x

201. For all x ∈ [-1, 1], sin⁻¹x + cos⁻¹x is identically equal to:
 A) π/2
 B) π
 C) 0
 D) 2π

202. If xy < 1, the formula for tan⁻¹x + tan⁻¹y is:
 A) tan⁻¹[ (x + y)/(1 - xy) ]
 B) tan⁻¹[ (x - y)/(1 + xy) ]
 C) π + tan⁻¹[ (x + y)/(1 - xy) ]
 D) tan⁻¹(xy)

203. The value of tan⁻¹(1) + tan⁻¹(2) + tan⁻¹(3) is:
 A) π
 B) π/2
 C) 3π/4
 D) 2π

204. The general solution of the equation sin θ = 0 is:
 A) θ = nπ, n ∈ ℤ
 B) θ = (2n + 1)π/2, n ∈ ℤ
 C) θ = 2nπ, n ∈ ℤ
 D) θ = nπ/2, n ∈ ℤ

205. The general solution of the equation cos θ = 0 is:
 A) θ = (2n + 1)π/2, n ∈ ℤ
 B) θ = nπ, n ∈ ℤ
 C) θ = 2nπ, n ∈ ℤ
 D) θ = nπ + π/4, n ∈ ℤ

206. The general solution of sin θ = sin α is:
 A) θ = nπ + (-1)ⁿ α, n ∈ ℤ
 B) θ = 2nπ ± α, n ∈ ℤ
 C) θ = nπ + α, n ∈ ℤ
 D) θ = 2nπ + α, n ∈ ℤ

207. The general solution of cos θ = cos α is:
 A) θ = 2nπ ± α, n ∈ ℤ
 B) θ = nπ + (-1)ⁿ α, n ∈ ℤ
 C) θ = nπ + α, n ∈ ℤ
 D) θ = 2nπ + α, n ∈ ℤ

208. The general solution of tan θ = tan α is:
 A) θ = nπ + α, n ∈ ℤ
 B) θ = 2nπ ± α, n ∈ ℤ
 C) θ = nπ + (-1)ⁿ α, n ∈ ℤ
 D) θ = nπ - α, n ∈ ℤ

209. The linear trigonometric equation a cos θ + b sin θ = c has real solutions if and only if:
 A) c² ≤ a² + b²
 B) c² > a² + b²
 C) c = a + b
 D) c² = ab

210. The principal value of cos⁻¹(-1/2) is:
 A) 2π/3
 B) -π/3
 C) π/3
 D) 4π/3

---

## H. VECTORS — Q211–240

211. A vector having magnitude 1 is called a:
 A) Unit vector
 B) Null vector
 C) Position vector
 D) Co-initial vector

212. The unit vector in the direction of vector a is given by:
 A) a / |a|
 B) |a| · a
 C) a · a
 D) 1 / |a|

213. The magnitude of the position vector r = 3i - 4j + 12k is:
 A) 13
 B) 12
 C) 5
 D) 169

214. Two non-zero vectors a and b are collinear (parallel) if and only if:
 A) a = k b for some non-zero scalar k (or a × b = 0)
 B) a · b = 0
 C) |a| = |b|
 D) a + b = 0

215. Three vectors a, b, c are coplanar if and only if:
 A) a · (b × c) = 0
 B) a × (b × c) = 0
 C) a · b = b · c
 D) a + b + c = 0

216. The position vector of the midpoint of line segment joining position vectors a and b is:
 A) (a + b) / 2
 B) a - b
 C) (a + b) / 3
 D) a + b

217. The position vector of the centroid of triangle ABC with vertices a, b, c is:
 A) (a + b + c) / 3
 B) (a + b + c) / 2
 C) a + b + c
 D) (a + b + c) / 4

218. The scalar (dot) product of two vectors a and b is defined as:
 A) |a| |b| cos θ
 B) |a| |b| sin θ
 C) |a| |b| tan θ
 D) a · b sin θ

219. Two non-zero vectors a and b are perpendicular (orthogonal) if and only if:
 A) a · b = 0
 B) a × b = 0
 C) a · b = 1
 D) |a| = |b|

220. The value of i · i = j · j = k · k is:
 A) 1
 B) 0
 C) -1
 D) 3

221. The value of i · j = j · k = k · i is:
 A) 0
 B) 1
 C) -1
 D) k

222. The dot product of a vector with itself, a · a, equals:
 A) |a|²
 B) 2|a|
 C) 0
 D) 1

223. The scalar projection of vector a on vector b is:
 A) (a · b) / |b|
 B) (a · b) / |a|
 C) |a × b| / |b|
 D) a · b

224. The vector projection of vector a on vector b is:
 A) [ (a · b) / |b|² ] b
 B) [ (a · b) / |b| ] b
 C) [ (a · b) / |a|² ] a
 D) (a · b) b

225. If a = 2i + 3j - k and b = i - 2j + 3k, the dot product a · b is:
 A) -7
 B) 7
 C) 5
 D) -1

226. The vector (cross) product of two vectors a and b is defined as:
 A) |a| |b| sin θ n̂
 B) |a| |b| cos θ n̂
 C) |a| |b| sin θ
 D) |a × b| cos θ

227. Two non-zero vectors a and b are parallel if and only if:
 A) a × b = 0
 B) a · b = 0
 C) a × b = 1
 D) a + b = 0

228. The cross product is anti-commutative, meaning:
 A) a × b = -(b × a)
 B) a × b = b × a
 C) a × b = 1/(b × a)
 D) a × b = |b × a|

229. The value of i × j is:
 A) k
 B) -k
 C) 0
 D) 1

230. The value of j × i is:
 A) -k
 B) k
 C) 0
 D) -1

231. The value of i × i = j × j = k × k is:
 A) 0
 B) 1
 C) k
 D) -1

232. The area of a parallelogram with adjacent sides represented by vectors a and b is:
 A) |a × b|
 B) (1/2) |a × b|
 C) a · b
 D) (1/2) a · b

233. The area of a triangle with adjacent sides represented by vectors a and b is:
 A) (1/2) |a × b|
 B) |a × b|
 C) (1/2) (a · b)
 D) |a · b|

234. A unit vector perpendicular to both vectors a and b is given by:
 A) ± (a × b) / |a × b|
 B) (a · b) / |a · b|
 C) (a + b) / |a + b|
 D) (a - b) / |a - b|

235. The scalar triple product of three vectors a, b, c is defined as:
 A) a · (b × c)
 B) a × (b · c)
 C) (a · b) × c
 D) a · b · c

236. The volume of a parallelepiped with coterminous edges a, b, c is:
 A) | [a b c] | = | a · (b × c) |
 B) (1/6) | [a b c] |
 C) (1/2) | [a b c] |
 D) | a × b | · |c|

237. The volume of a tetrahedron with coterminous edges a, b, c is:
 A) (1/6) | [a b c] |
 B) (1/3) | [a b c] |
 C) | [a b c] |
 D) (1/2) | [a b c] |

238. In cyclic order, the scalar triple product satisfies:
 A) [a b c] = [b c a] = [c a b]
 B) [a b c] = -[b c a]
 C) [a b c] = [b a c]
 D) [a b c] = 0 always

239. The work done W by a constant force F causing displacement d is given by:
 A) W = F · d
 B) W = F × d
 C) W = |F| / |d|
 D) W = (1/2) F · d

240. The torque (moment) τ of a force F acting at position r relative to a pivot is:
 A) τ = r × F
 B) τ = r · F
 C) τ = F × r
 D) τ = |r| |F|

---

## I. STATISTICS & PROBABILITY — Q241–270

241. Which of the following is an absolute measure of dispersion?
 A) Standard deviation
 B) Coefficient of variation
 C) Coefficient of quartile deviation
 D) Coefficient of range

242. Which of the following is a relative (dimensionless) measure of dispersion?
 A) Coefficient of variation
 B) Range
 C) Quartile deviation
 D) Variance

243. The formula for the Coefficient of Range is:
 A) (L - S) / (L + S)
 B) (L + S) / (L - S)
 C) L - S
 D) (L - S) / 2

244. The Quartile Deviation (Semi-Interquartile Range) is given by:
 A) (Q₃ - Q₁) / 2
 B) (Q₃ + Q₁) / 2
 C) Q₃ - Q₁
 D) (Q₃ - Q₁) / (Q₃ + Q₁)

245. Which measure of dispersion is completely unaffected by extreme outliers and can be used for open-ended frequency distributions?
 A) Quartile deviation
 B) Range
 C) Standard deviation
 D) Mean deviation

246. The sum of absolute deviations of observations ∑ |x - A| is minimal when A is the:
 A) Median
 B) Mean
 C) Mode
 D) Geometric mean

247. The standard deviation σ is defined as the square root of the mean of:
 A) Squared deviations from the arithmetic mean
 B) Absolute deviations from median
 C) Deviations from origin
 D) Squared deviations from mode

248. The variance is defined as:
 A) σ² (the square of standard deviation)
 B) √σ
 C) σ / x̄
 D) ∑ (x - x̄)

249. If every observation in a dataset is increased by 5, the standard deviation:
 A) Remains unchanged
 B) Increases by 5
 C) Increases by 25
 D) Is multiplied by 5

250. If every observation in a dataset is multiplied by 3, the standard deviation:
 A) Is multiplied by 3
 B) Increases by 3
 C) Is multiplied by 9
 D) Remains unchanged

251. The Coefficient of Variation (CV) was introduced by:
 A) Karl Pearson
 B) Ronald Fisher
 C) Francis Galton
 D) A. L. Bowley

252. The mathematical formula for the Coefficient of Variation is:
 A) (σ / x̄) × 100%
 B) (x̄ / σ) × 100%
 C) (σ² / x̄) × 100%
 D) (σ / Median) × 100%

253. When comparing the consistency of two cricket players, the player who is MORE consistent is the one with:
 A) LOWER Coefficient of Variation
 B) HIGHER Coefficient of Variation
 C) Higher mean score only
 D) Higher maximum score

254. In a symmetrical frequency distribution, the relationship between Mean, Median, and Mode is:
 A) Mean = Median = Mode
 B) Mean > Median > Mode
 C) Mean < Median < Mode
 D) Mean + Mode = 2 Median

255. In a positively skewed (right-tailed) distribution, the correct order is:
 A) Mean > Median > Mode
 B) Mode > Median > Mean
 C) Mean = Median = Mode
 D) Median > Mean > Mode

256. In a negatively skewed (left-tailed) distribution, the correct order is:
 A) Mean < Median < Mode
 B) Mean > Median > Mode
 C) Mean = Median = Mode
 D) Mode < Median < Mean

257. Karl Pearson's coefficient of skewness S_k based on median is:
 A) 3(Mean - Median) / σ
 B) (Mean - Median) / σ
 C) 3(Mean - Mode) / σ
 D) (Mean - Mode) / 3σ

258. Bowley's coefficient of skewness is based on:
 A) Quartiles
 B) Standard deviation and mean
 C) Extreme range values
 D) Moments

259. Bowley's quartile coefficient of skewness is given by:
 A) (Q₃ + Q₁ - 2 M_d) / (Q₃ - Q₁)
 B) (Q₃ - Q₁) / (Q₃ + Q₁ - 2 M_d)
 C) (Q₃ - M_d) / (M_d - Q₁)
 D) (Q₃ + Q₁) / (2 M_d)

260. The theoretical values of Bowley's skewness coefficient lie strictly within:
 A) [-1, +1]
 B) [-3, +3]
 C) [0, 1]
 D) (-∞, ∞)

261. The probability of an impossible event is:
 A) 0
 B) 1
 C) -1
 D) 0.5

262. The probability of a certain (sure) event is:
 A) 1
 B) 0
 C) ∞
 D) 100

263. If A is an event, then 0 ≤ P(A) ≤ 1. The probability of the complement event A' is:
 A) 1 - P(A)
 B) P(A) - 1
 C) 1 / P(A)
 D) -P(A)

264. Two events A and B are mutually exclusive if and only if:
 A) P(A ∩ B) = 0
 B) P(A ∩ B) = P(A)P(B)
 C) P(A ∪ B) = 1
 D) P(A) = P(B)

265. The Addition Theorem of probability for any two events A and B is:
 A) P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
 B) P(A ∪ B) = P(A) + P(B) + P(A ∩ B)
 C) P(A ∪ B) = P(A) · P(B)
 D) P(A ∪ B) = P(A) + P(B)

266. Two events A and B are independent if and only if:
 A) P(A ∩ B) = P(A) · P(B)
 B) P(A ∩ B) = 0
 C) P(A ∪ B) = P(A) + P(B)
 D) P(A|B) = 0

267. The conditional probability of event A given that event B has occurred, P(A|B), is:
 A) P(A ∩ B) / P(B)
 B) P(A ∩ B) / P(A)
 C) P(A) / P(B)
 D) P(A ∪ B) / P(B)

268. If two coins are tossed simultaneously, the probability of getting at least one head is:
 A) 3/4
 B) 1/2
 C) 1/4
 D) 1

269. A card is drawn from a well-shuffled pack of 52 cards. The probability that it is an ace or a king is:
 A) 2/13
 B) 1/13
 C) 4/13
 D) 1/26

270. Bayes' Theorem is primarily used for calculating:
 A) Posterior (inverse) probability given observed evidence
 B) Prior probability only
 C) Simple marginal probability
 D) Joint probability of independent events

---

## J. COMPUTATIONAL METHODS & MECHANICS — Q271–300

271. The Bisection Method for finding a root of f(x) = 0 requires an initial interval [a, b] such that:
 A) f(a) · f(b) < 0
 B) f(a) · f(b) > 0
 C) f(a) = f(b)
 D) f'(a) · f'(b) < 0

272. The rate (order) of convergence of the Bisection Method is:
 A) Linear (Order 1)
 B) Quadratic (Order 2)
 C) Superlinear (Order 1.618)
 D) Cubic (Order 3)

273. After n iterations of the Bisection Method on [a, b], the maximum error is bounded by:
 A) (b - a) / 2ⁿ
 B) (b - a) / n
 C) (b - a) / 2
 D) (b - a)² / 2ⁿ

274. The iterative formula for the Newton-Raphson Method is:
 A) xₙ₊₁ = xₙ - f(xₙ) / f'(xₙ)
 B) xₙ₊₁ = xₙ + f(xₙ) / f'(xₙ)
 C) xₙ₊₁ = xₙ - f'(xₙ) / f(xₙ)
 D) xₙ₊₁ = f(xₙ) / f'(xₙ)

275. The order of convergence of the Newton-Raphson Method for a simple root is:
 A) Quadratic (Order 2)
 B) Linear (Order 1)
 C) Cubic (Order 3)
 D) Exponential

276. The Newton-Raphson method fails or crashes when:
 A) f'(xₙ) = 0 (horizontal tangent)
 B) f(xₙ) = 0
 C) f''(xₙ) > 0
 D) xₙ > 0

277. The Secant Method differs from Newton-Raphson primarily because it:
 A) Does not require evaluation of the derivative f'(x)
 B) Requires bracketing f(a)f(b) < 0
 C) Converges faster than Newton-Raphson
 D) Uses only one initial guess

278. The Trapezoidal Rule approximates the area under a curve in each strip by a:
 A) Trapezoid (straight line chord)
 B) Parabola
 C) Rectangle
 D) Circle

279. The formula for the composite Trapezoidal Rule with n subintervals of width h is:
 A) (h/2) [ y₀ + yₙ + 2(y₁ + y₂ + ... + yₙ₋₁) ]
 B) (h/3) [ y₀ + yₙ + 4∑y_odd + 2∑y_even ]
 C) h [ y₀ + y₁ + ... + yₙ ]
 D) (h/2) [ y₀ + yₙ + ∑y_rest ]

280. The truncation error of the Trapezoidal Rule is of order:
 A) O(h²)
 B) O(h⁴)
 C) O(h)
 D) O(h³)

281. Simpson's 1/3 Rule requires that the number of subintervals n must be:
 A) An EVEN integer
 B) An ODD integer
 C) A multiple of 3
 D) Any positive integer

282. The formula for Simpson's 1/3 Rule is:
 A) (h/3) [ y₀ + yₙ + 4(y₁ + y₃ + ...) + 2(y₂ + y₄ + ...) ]
 B) (h/2) [ y₀ + yₙ + 2∑y_rest ]
 C) (3h/8) [ y₀ + yₙ + 3∑y_rest ]
 D) (h/3) [ y₀ + yₙ + 2(y₁ + y₃ + ...) + 4(y₂ + y₄ + ...) ]

283. The truncation error of Simpson's 1/3 Rule is of order:
 A) O(h⁴)
 B) O(h²)
 C) O(h³)
 D) O(h)

284. Simpson's 1/3 Rule gives the exact value of the integral for polynomials up to degree:
 A) 3 (Cubic)
 B) 2 (Quadratic)
 C) 1 (Linear)
 D) 4 (Quartic)

285. In Simpson's 3/8 Rule, the number of subintervals n must be:
 A) A multiple of 3
 B) An even number
 C) An odd number
 D) A power of 2

286. According to the Parallelogram Law of Forces, two forces P and Q at angle θ have resultant R =:
 A) √[ P² + Q² + 2PQ cos θ ]
 B) √[ P² + Q² - 2PQ cos θ ]
 C) P + Q + 2PQ cos θ
 D) √[ P² + Q² + 2PQ sin θ ]

287. Two forces of 6 N and 8 N act at a point at right angles (90°). Their resultant magnitude is:
 A) 10 N
 B) 14 N
 C) 2 N
 D) 48 N

288. Lami's Theorem states that for three coplanar forces in equilibrium at a point:
 A) P / sin α = Q / sin β = R / sin γ
 B) P / cos α = Q / cos β = R / cos γ
 C) P sin α = Q sin β = R sin γ
 D) P + Q + R = sin(α + β + γ)

289. The necessary and sufficient conditions for the equilibrium of coplanar concurrent forces are:
 A) ∑ F_x = 0 and ∑ F_y = 0
 B) ∑ M = 0 only
 C) ∑ F_x = ∑ F_y
 D) F₁ + F₂ = F₃

290. For a rigid body in static equilibrium under coplanar non-concurrent forces, the conditions are:
 A) ∑ F_x = 0, ∑ F_y = 0, and ∑ M_O = 0
 B) ∑ F_x = 0 and ∑ F_y = 0 only
 C) ∑ M_O = 0 only
 D) Resultant force is constant

291. Limiting friction f_L is directly proportional to:
 A) Normal reaction R (f_L = μ R)
 B) Contact surface area
 C) Speed of the body
 D) Volume of the body

292. The relationship between the angle of friction λ and coefficient of friction μ is:
 A) μ = tan λ
 B) μ = sin λ
 C) μ = cos λ
 D) λ = μ²

293. The angle of repose θ of a rough inclined plane equals:
 A) The angle of friction λ
 B) Half the angle of friction λ/2
 C) 90° - λ
 D) 2λ

294. A particle moving in a straight line with initial velocity u and uniform acceleration a covers distance in the n-th second given by:
 A) s_nth = u + (a/2)(2n - 1)
 B) s_nth = ut + (1/2)at²
 C) s_nth = u + a(n - 1)
 D) s_nth = u + an

295. A body is projected vertically upwards with speed u. The maximum height reached is:
 A) u² / (2g)
 B) u / (2g)
 C) 2u² / g
 D) u² / g

296. A body is projected vertically upwards with speed u. The total time of flight (returning to launch level) is:
 A) 2u / g
 B) u / g
 C) u² / (2g)
 D) √(2u/g)

297. The acceleration of a body sliding down a smooth plane inclined at angle θ to horizontal is:
 A) g sin θ
 B) g cos θ
 C) g tan θ
 D) g

298. The path (trajectory) of a projectile launched obliquely in vacuum under gravity is a:
 A) Parabola
 B) Circle
 C) Hyperbola
 D) Straight line

299. The horizontal range R of an oblique projectile launched with speed u at angle α is:
 A) (u² sin 2α) / g
 B) (u² sin²α) / (2g)
 C) (2u sin α) / g
 D) (u² cos 2α) / g

300. The horizontal range of an oblique projectile is MAXIMUM when the launch angle α is:
 A) 45°
 B) 30°
 C) 60°
 D) 90°
"""

    # Replace the answer key and add answers for Q121–300
    old_answer_key = """## ANSWER KEY WITH CONCEPT NOTES

**Matrices and Determinants:** 1-A, 2-A, 3-A, 4-A, 5-A, 6-A, 7-A, 8-A, 9-A, 10-A, 11-A, 12-A, 13-A, 14-A, 15-A, 16-A, 17-A, 18-A, 19-A, 20-A, 21-A, 22-A, 23-A, 24-A, 25-A, 26-A, 27-A, 28-A, 29-A, 30-A

**Complex Numbers:** 31-A, 32-A, 33-A, 34-A, 35-A, 36-A, 37-A, 38-A, 39-A, 40-A, 41-A, 42-A, 43-A, 44-A, 45-A, 46-A, 47-A, 48-A, 49-A, 50-A, 51-A, 52-A, 53-A, 54-A, 55-A, 56-A, 57-A, 58-A, 59-A, 60-A

**Analytic Geometry:** 61-A, 62-A, 63-A, 64-A, 65-A, 66-A, 67-A, 68-A, 69-A, 70-A, 71-A, 72-A, 73-A, 74-A, 75-A, 76-A, 77-A, 78-A, 79-A, 80-A, 81-A, 82-A, 83-A, 84-A, 85-A, 86-A, 87-A, 88-A, 89-A, 90-A

**Calculus:** 91-A, 92-A, 93-A, 94-A, 95-A, 96-A, 97-A, 98-A, 99-A, 100-A, 101-A, 102-A, 103-A, 104-A, 105-A, 106-A, 107-A, 108-A, 109-A, 110-A, 111-A, 112-A, 113-A, 114-A, 115-A, 116-A, 117-A, 118-A, 119-A, 120-A"""

    new_answer_key = """## ANSWER KEY WITH CONCEPT NOTES

**Matrices and Determinants:** 1-A, 2-A, 3-A, 4-A, 5-A, 6-A, 7-A, 8-A, 9-A, 10-A, 11-A, 12-A, 13-A, 14-A, 15-A, 16-A, 17-A, 18-A, 19-A, 20-A, 21-A, 22-A, 23-A, 24-A, 25-A, 26-A, 27-A, 28-A, 29-A, 30-A

**Complex Numbers:** 31-A, 32-A, 33-A, 34-A, 35-A, 36-A, 37-A, 38-A, 39-A, 40-A, 41-A, 42-A, 43-A, 44-A, 45-A, 46-A, 47-A, 48-A, 49-A, 50-A, 51-A, 52-A, 53-A, 54-A, 55-A, 56-A, 57-A, 58-A, 59-A, 60-A

**Analytic Geometry:** 61-A, 62-A, 63-A, 64-A, 65-A, 66-A, 67-A, 68-A, 69-A, 70-A, 71-A, 72-A, 73-A, 74-A, 75-A, 76-A, 77-A, 78-A, 79-A, 80-A, 81-A, 82-A, 83-A, 84-A, 85-A, 86-A, 87-A, 88-A, 89-A, 90-A

**Calculus:** 91-A, 92-A, 93-A, 94-A, 95-A, 96-A, 97-A, 98-A, 99-A, 100-A, 101-A, 102-A, 103-A, 104-A, 105-A, 106-A, 107-A, 108-A, 109-A, 110-A, 111-A, 112-A, 113-A, 114-A, 115-A, 116-A, 117-A, 118-A, 119-A, 120-A

**Logic, Sets and Real Numbers:** 121-A, 122-A, 123-A, 124-A, 125-A, 126-A, 127-A, 128-A, 129-A, 130-A, 131-A, 132-A, 133-A, 134-A, 135-A, 136-A, 137-A, 138-A, 139-A, 140-A, 141-A, 142-A, 143-A, 144-A, 145-A, 146-A, 147-A, 148-A, 149-A, 150-A

**Sequences, Series & Quadratics:** 151-A, 152-A, 153-A, 154-A, 155-A, 156-A, 157-A, 158-A, 159-A, 160-A, 161-A, 162-A, 163-A, 164-A, 165-A, 166-A, 167-A, 168-A, 169-A, 170-A, 171-A, 172-A, 173-A, 174-A, 175-A, 176-A, 177-A, 178-A, 179-A, 180-A

**Trigonometry:** 181-A, 182-A, 183-A, 184-A, 185-A, 186-A, 187-A, 188-A, 189-A, 190-A, 191-A, 192-A, 193-A, 194-A, 195-A, 196-A, 197-A, 198-A, 199-A, 200-A, 201-A, 202-A, 203-A, 204-A, 205-A, 206-A, 207-A, 208-A, 209-A, 210-A

**Vectors:** 211-A, 212-A, 213-A, 214-A, 215-A, 216-A, 217-A, 218-A, 219-A, 220-A, 221-A, 222-A, 223-A, 224-A, 225-A, 226-A, 227-A, 228-A, 229-A, 230-A, 231-A, 232-A, 233-A, 234-A, 235-A, 236-A, 237-A, 238-A, 239-A, 240-A

**Statistics and Probability:** 241-A, 242-A, 243-A, 244-A, 245-A, 246-A, 247-A, 248-A, 249-A, 250-A, 251-A, 252-A, 253-A, 254-A, 255-A, 256-A, 257-A, 258-A, 259-A, 260-A, 261-A, 262-A, 263-A, 264-A, 265-A, 266-A, 267-A, 268-A, 269-A, 270-A

**Computational Methods & Mechanics:** 271-A, 272-A, 273-A, 274-A, 275-A, 276-A, 277-A, 278-A, 279-A, 280-A, 281-A, 282-A, 283-A, 284-A, 285-A, 286-A, 287-A, 288-A, 289-A, 290-A, 291-A, 292-A, 293-A, 294-A, 295-A, 296-A, 297-A, 298-A, 299-A, 300-A"""

    # Insert additional questions right before the Study Layer
    study_layer_marker = "# 🎯 OPTIMIZED STUDY LAYER — MATHEMATICS"
    idx = content.find(study_layer_marker)
    if idx != -1:
        content = content[:idx] + additional_questions + "\n\n---\n" + content[idx:]
        content = content.replace(old_answer_key, new_answer_key)
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(content)
        print("SUCCESS: Upgraded math-mcq-test.md to 300 MCQs covering all 7 units!")
    else:
        print("Marker not found in math-mcq-test.md")

if __name__ == '__main__':
    upgrade_math_mcq()
