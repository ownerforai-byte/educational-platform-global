import io, re
p = "docs/guides/mathematics-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
anchor = "- Session 2 - Vectors"
i = s.find(anchor)
assert i > 0
note = ("- Session 3 - Statistics and Probability (rows 11-12, 2/2): dispersion (range, mean deviation, variance via "
 "computational identity sigma^2 = sum xi^2/n - xbar^2, SD, shift invariance, C.V., Karl Pearson skewness; NEB 2024 "
 "verified PYQ mean 25 / SD 9.41 of 10 marks, NEB 2023 verified PYQ variance of first 10 naturals 8.25) and probability "
 "(classical definition, axioms, addition law, conditional probability, multiplication law, independence, total "
 "probability, Bayes; NEB 2022 verified PYQ P(A u B) = 0.8). Build 101 entries, validator 0 broken.\n")
s = s[:i] + note + "\n" + s[i:]
ROWS = {
 11: ("Measure of dispersion: SD, variance, C.V., skewness", "statistics-and-probability/01-measure-of-dispersion-standard-deviation-variance-coefficient-of-variation-skewness-karl-pearson.json"),
 12: ("Probability: definitions and basic laws", "statistics-and-probability/02-probability-independent-cases-mathematical-and-empirical-definition-of-probability-two-basic-law.json"),
}
for r, (title, fn) in ROWS.items():
    pat = re.compile(r"\| %d \| Statistics and probability \|.*" % r)
    row = "| %d | Statistics and probability | %s | `%s` | Completed |" % (r, title, fn)
    s, n = pat.subn(row, s)
    assert n == 1, r
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("math plan: session 3 note + stats rows completed")
