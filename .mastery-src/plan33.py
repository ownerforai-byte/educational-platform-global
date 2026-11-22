import io, re
p = "docs/guides/chemistry-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
note = ("- Session 28 - Fundamental Principles of Organic Chemistry notes (rows 103-111, 9/9): IUPAC nomenclature (roots meth-hex, suffixes, rules; NEB 2024 butan-2-ol + four-name set, NEB 2023 2-ethyl-5-methylhexan-1-ol — three verified PYQs incl. the two from the basic-concept bank); "
 "Lassaigne's test (Na fusion extract, N Prussian blue, S violet/PbS, X AgNO3 colours, NaSCN blood-red complication); isomerism definition + full classification map; structural isomerism five types (chain/position/functional/metamerism/tautomerism with signature pairs); geometrical cis-trans (but-2-ene, pi-lock) + optical (lactic acid, chiral C, d/l, racemate); reaction mechanism + homolytic (radicals, Cl2 light) vs heterolytic (ions, t-BuCl) fission; electrophiles/nucleophiles/free radicals with charged+neutral examples and radical chain; inductive effect -I/+I (acidity ladder CCl3COOH>CH3COOH, carbocation 3>2>1); resonance + R effect (NEB 2023 verified PYQ: ozone + benzene canonical structures, resonance energy 150 kJ/mol, +R/-R groups). Build 255 entries, validator 0 broken.\n")
anchor = "- Session 16 \u2014"
i = s.find(anchor)
assert i > 0
s = s[:i] + note + s[i:]
CANON = {
 103: ("Iupac Nomenclature Of Organic Compounds Up To Chain Having 6 Carbon Atoms", "01-iupac-nomenclature-of-organic-compounds-up-to-chain-having-6-carbon-atoms.json"),
 104: ("Qualitative Analysis Of Organic Compounds Detection Of N S And Halogens By Lassaignes Test", "02-qualitative-analysis-of-organic-compounds-detection-of-n-s-and-halogens-by-lassaigne-s-test.json"),
 105: ("Isomerism In Organic Compounds Definition And Classification Of Isomerism", "03-isomerism-in-organic-compounds-definition-and-classification-of-isomerism.json"),
 106: ("Structural Isomerism And Its Types Chain Isomerism Position Isomerism Functional Isomerism Metamerism And Tautomerism", "04-structural-isomerism-and-its-types-chain-isomerism-position-isomerism-functional-isomerism-metam.json"),
 107: ("Concept Of Geometrical Isomerism Cis And Trans And Optical Isomerism D And L Form", "05-concept-of-geometrical-isomerism-cis-and-trans-and-optical-isomerism-d-and-l-form.json"),
 108: ("Preliminary Idea Of Reaction Mechanism Homolytic And Heterolytic Fission", "06-preliminary-idea-of-reaction-mechanism-homolytic-and-heterolytic-fission.json"),
 109: ("Electrophiles Nucleophiles And Free Radicals", "07-electrophiles-nucleophiles-and-free-radicals.json"),
 110: ("Inductive Effect I And I Effect", "08-inductive-effect-i-and-i-effect.json"),
 111: ("Resonance Effect R And R Effect", "09-resonance-effect-r-and-r-effect.json"),
}
for r, (title, fn) in CANON.items():
    pat = re.compile(r"\| %d \| Fundamental Principles of Organic Chemistry \|.*" % r)
    row = "| %d | Fundamental Principles of Organic Chemistry | %s | `%s` | Completed |" % (r, title, fn)
    s, n = pat.subn(row, s)
    assert n == 1, r
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("session 28 note + rows 103-111 completed")
