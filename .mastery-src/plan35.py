import io, re
p = "docs/guides/chemistry-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
note = ("- Session 30 - Hydrocarbons notes (rows 112-120, 9/9): alkane prep (Wurtz - NEB 2024 verified PYQ ethane equation; "
 "reduction, decarboxylation, hydrogenation); alkane properties (halogenation - NEB 2020 verified PYQ radical chlorination "
 "mechanism + product mixture; nitration 400C vapour, sulphonation, controlled oxidation of ethane); alkene prep (dehydration "
 "170C vs 140C, alc. KOH + Saytzeff, Lindlar; NEB 2023 + NEB 2024 verified PYQs - ethane from ethene surface mechanism); "
 "alkene properties (Markovnikov - NEB 2024 verified PYQ applied to propene; peroxide effect HBr-only; ozonolysis - NEB 2024 "
 "ethene + NEB 2022 but-2-ene verified PYQs); alkyne prep (CaC2 two-step, vicinal dihalide, haloform/Ag); alkyne properties "
 "(acidity - NEB 2024 verified PYQ s-character + Ag2C2/Cu2C2 tests; hydration enol->CH3CHO); unsaturation tests (bromine "
 "water - NEB 2024 verified PYQ ethane/ethene/ethyne; Baeyer's test); comparative physical properties; Kolbe electrolysis "
 "(acetate->ethane, succinate->ethyne). Seven verified PYQs assigned. Build 255 entries, validator 0 broken.\n")
anchor = "- Session 16 \u2014"
i = s.find(anchor)
assert i > 0
s = s[:i] + note + s[i:]
CANON = {
 112: ("Saturated Hydrocarbons Alkanes Preparation From Haloalkanes Reduction And Wurtz Reaction Decarboxylation Catalytic Hydrogenation Of Alkene And Alkyne", "01-saturated-hydrocarbons-alkanes-preparation-from-haloalkanes-reduction-and-wurtz-reaction-decarbo.json"),
 113: ("Chemical Properties Of Alkanes Substitution Reactions Halogenation Nitration And Sulphonation Only Oxidation Of Ethane", "02-chemical-properties-of-alkanes-substitution-reactions-halogenation-nitration-and-sulphonation-on.json"),
 114: ("Unsaturated Hydrocarbons Alkenes Preparation By Dehydration Of Alcohol Dehydrohalogenation Catalytic Hydrogenation Of Alkyne", "03-unsaturated-hydrocarbons-alkenes-preparation-by-dehydration-of-alcohol-dehydrohalogenation-catal.json"),
 115: ("Chemical Properties Of Alkenes Addition Reaction With Hx Markovnikovs Addition And Peroxide Effect H2O O3 H2So4 Only", "04-chemical-properties-of-alkenes-addition-reaction-with-hx-markovnikov-s-addition-and-peroxide-eff.json"),
 116: ("Alkynes Preparation From Carbon And Hydrogen 1 2 Dibromoethane Chloroform Iodoform Only", "05-alkynes-preparation-from-carbon-and-hydrogen-1-2-dibromoethane-chloroform-iodoform-only.json"),
 117: ("Chemical Properties Of Alkynes Addition Reaction With H2 Hx H2O Acidic Nature Action With Sodium Ammoniacal Agno3 And Ammoniacal Cu2Cl2", "06-chemical-properties-of-alkynes-addition-reaction-with-h2-hx-h2o-acidic-nature-action-with-sodium.json"),
 118: ("Test Of Unsaturation Ethene And Ethyne Bromine Water Test And Baeyers Test", "07-test-of-unsaturation-ethene-and-ethyne-bromine-water-test-and-baeyer-s-test.json"),
 119: ("Comparative Studies Of Physical Properties Of Alkane Alkene And Alkyne", "08-comparative-studies-of-physical-properties-of-alkane-alkene-and-alkyne.json"),
 120: ("Kolbes Electrolysis Methods For The Preparation Of Alkanes Alkenes And Alkynes", "09-kolbe-s-electrolysis-methods-for-the-preparation-of-alkanes-alkenes-and-alkynes.json"),
}
for r, (title, fn) in CANON.items():
    pat = re.compile(r"\| %d \| Hydrocarbons \|.*" % r)
    row = "| %d | Hydrocarbons | %s | `%s` | Completed |" % (r, title, fn)
    s, n = pat.subn(row, s)
    assert n == 1, r
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("session 30 note + rows 112-120 completed")
