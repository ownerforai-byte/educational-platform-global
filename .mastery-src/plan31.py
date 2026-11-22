import io, re
p = "docs/guides/chemistry-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
FIX = {
 96: ("Introduction To Organic Chemistry And Organic Compounds", "01-introduction-to-organic-chemistry-and-organic-compounds.json"),
 97: ("Reasons For The Separate Study Of Organic Compounds From Inorganic Compounds", "02-reasons-for-the-separate-study-of-organic-compounds-from-inorganic-compounds.json"),
 98: ("Tetra Covalency And Catenation Properties Of Carbon", "03-tetra-covalency-and-catenation-properties-of-carbon.json"),
 99: ("Classification Of Organic Compounds", "04-classification-of-organic-compounds.json"),
 100: ("Alkyl Groups Functional Groups And Homologous Series", "05-alkyl-groups-functional-groups-and-homologous-series.json"),
 101: ("Idea Of Structural Formula Contracted Formula And Bond Line Structural Formula", "06-idea-of-structural-formula-contracted-formula-and-bond-line-structural-formula.json"),
 102: ("Preliminary Idea Of Cracking And Reforming Quality Of Gasoline Octane Number Cetane Number And Gasoline Additive", "07-preliminary-idea-of-cracking-and-reforming-quality-of-gasoline-octane-number-cetane-number-and-g.json"),
}
for r, (title, fn) in FIX.items():
    pat = re.compile(r"\| %d \| Basic Concept of Organic Chemistry \|.*" % r)
    row = "| %d | Basic Concept of Organic Chemistry | %s | `%s` | Completed |" % (r, title, fn)
    s, n = pat.subn(row, s)
    assert n == 1, r
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("rows 96-102 repaired")
