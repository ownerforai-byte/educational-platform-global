import io
p = "docs/guides/chemistry-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
note = ("- Session 26 - Basic Concept of Organic Chemistry notes (rows 96-102, 7/7): introduction (definition, exclusions, Wohler 1828 NH4OCN -> urea, vital force theory, sources, properties); "
 "reasons for separate study (numbers via catenation+isomerism, properties table, methods, Wohler comment); tetra-covalency (excited state 2s1 2p3, ~406 kJ/mol repaid by 2 extra bonds) and catenation (C-C 348 vs Si-Si 226 kJ/mol, isomer ladder C4H10=2/C10H22=75); classification tree (open chain alkanes/alkenes/alkynes; cyclic homocyclic alicyclic+aromatic, heterocyclic pyridine/furan/pyrrole); alkyl groups CnH2n+1, functional groups table, homologous series characteristics + alkanol CnH2n+1OH ladder (NEB 2022 verified PYQ); structural/condensed/bond-line formulas (C2H6O isomer test CH3CH2OH vs CH3OCH3); cracking (C10H22 -> C8H18 + C2H4, zeolite ~450-500 C), reforming (Pt ~500 C, n-hexane -> benzene), octane number (iso-octane 100/n-heptane 0), cetane number (n-cetane 100/alpha-methylnaphthalene 0), TEL -> MTBE/ethanol. NEB 2024 + 2023 IUPAC PYQs in this unit's bank assigned to row 103 nomenclature. Build 255 entries, validator 0 broken.\n")
anchor = "- Session 16 \u2014"
i = s.find(anchor)
assert i > 0
s = s[:i] + note + s[i:]
for r in range(96, 103):
    old = "| %d | Basic Concept of Organic Chemistry" % r
    j = s.find(old)
    assert j > 0, r
    k = s.find("|", s.find("|", s.find("|", j + 1) + 1) + 1)
    s = s[:k] + " Completed |" + s[s.find("\n", k):]
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("session 26 note + rows 96-102 completed")
