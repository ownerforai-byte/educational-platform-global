import io, re
p = "docs/guides/mathematics-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
note = ("- Session 2 - Vectors (rows 4-10, 7/7): vector algebra (triangle/parallelogram laws, scalar multiplication, section "
 "formula; NEB 2024 verified PYQ unit vector, NEB 2022 verified PYQ internal division 2:3); linear combination and "
 "dependence (determinant test, zero-vector lemma); collinear/coplanar (cross and triple-product tests, connecting-vector "
 "rule for points); dot product (perpendicularity criterion, angle theorem, projections; NEB 2024 verified PYQs a.b=-3, "
 "projection 4/sqrt5, angle 60 deg; NEB 2023 verified PYQ -8/3 MCQ); cross product (anticommutativity, parallel criterion, "
 "area theorems, Lagrange identity; NEB 2024 verified PYQs |a x b|=5sqrt3 + parallelogram area 5, NEB 2020 verified PYQ "
 "unit perpendicular (i-j)/sqrt2, NEB 2021 verified PYQ 2sqrt42 via Lagrange); scalar/vector triple products (volume "
 "theorem, cyclic invariance, BAC-CAB; NEB 2024 verified PYQ definition+significance); applications (work F.d, torque "
 "r x F, angular momentum conservation). Nine verified PYQs assigned. Build 101 entries, validator 0 broken.\n")
anchor = "- Session 1 - Trigonometry"
i = s.find(anchor)
assert i > 0
s = s[:i] + note + "\n" + s[i:]
ROWS = {
 4: ("Vector algebra: types, addition, scalar multiplication", "vectors/01-vector-algebra-types-addition-and-scalar-multiplication.json"),
 5: ("Linear combination, dependent and independent vectors", "vectors/02-linear-combination-of-vectors-linearly-dependent-and-independent-vectors.json"),
 6: ("Collinear and coplanar vectors", "vectors/01-collinear-and-non-collinear-vectors-coplanar-and-non-coplanar-vectors.json"),
 7: ("Dot product and its applications", "vectors/02-dot-product-and-its-applications.json"),
 8: ("Cross product and its applications", "vectors/03-cross-product-and-its-applications.json"),
 9: ("Scalar and vector triple products", "vectors/04-scalar-and-vector-triple-products.json"),
 10: ("Applications: work, torque, angular momentum", "vectors/05-applications-work-torque-angular-momentum.json"),
}
for r, (title, fn) in ROWS.items():
    pat = re.compile(r"\| %d \| Vectors \|.*" % r)
    row = "| %d | Vectors | %s | `%s` | Completed |" % (r, title, fn)
    s, n = pat.subn(row, s)
    assert n == 1, r
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("math plan: session 2 note + vectors rows completed")
