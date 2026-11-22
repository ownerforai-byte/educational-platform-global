import io, re
p = "docs/guides/mathematics-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
note = ("- Session 1 - Trigonometry (rows 1-3, 3/3): ratios and identities (fundamental identity family, addition/double/"
 "half-angle theorems, transformation formulas, conditional r-identity; NEB 2021 verified PYQ standard values, NEB 2020 "
 "verified PYQ cosine-series telescoping proof); equations and general values (general value theorems sin/cos/tan, "
 "principal values, filtering, squaring trap; NEB 2024 verified PYQ 2sin^2-sin-1=0, NEB 2022 verified PYQ cos2th=costh); "
 "inverse circular functions (principal branches, compositions, complement theorems, tan^-1 addition theorem; NEB 2024 "
 "verified PYQ sin^-1(-1/2), NEB 2023 verified PYQ cos^-1+sin^-1). Four verified PYQs assigned. Build 101 entries, "
 "validator 0 broken.\n")
anchor = "- Plan created. No topics enriched yet."
i = s.find(anchor)
assert i > 0
s = s[:i] + note + "\n" + s[i:]
s = s.replace("- Plan created. No topics enriched yet.\n\n", "\n")
ROWS = {
 1: ("Trigonometric ratios and identities", "trigonometry/06-trigonometric-ratios-and-identities.json"),
 2: ("Trigonometric equations and general values", "trigonometry/02-trigonometric-equations-and-general-values.json"),
 3: ("Inverse circular functions", "trigonometry/01-inverse-circular-functions.json"),
}
for r, (title, fn) in ROWS.items():
    pat = re.compile(r"\| %d \| Trigonometry \|.*" % r)
    row = "| %d | Trigonometry | %s | `%s` | Completed |" % (r, title, fn)
    s, n = pat.subn(row, s)
    assert n == 1, r
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("math plan: session 1 note + trigonometry rows completed")
