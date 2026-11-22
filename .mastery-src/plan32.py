import io
p = "docs/guides/chemistry-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
note = ("- Session 27 - Basic Concept of Organic Chemistry figures (rows 96-102): 49 theme-aware SVG figures (7 per topic x 7) via .mastery-src/figorg_b1-b3.py + figreg_org.py. "
 "Highlights: Wohler urea experiment, sources map, organic-vs-inorganic property table, exclusion panel, vital-force timeline, six-property grid, C2H6O isomer pair; separate-study reasons, count gap, molecule-vs-lattice, toolkit, reaction-speed contrast, border compounds, Wohler verdict; carbon excited-state orbital diagram (2s2 2p2 -> 2s1 2p3, ~406 kJ/mol), energy ledger, methane tetrahedral, chain types, C-C vs Si-Si ladder, isomer explosion chart, allotrope trio; full classification tree, saturation ladder, alicyclic-vs-aromatic rings, heterocycle trio (pyridine/furan/pyrrole), functional-family table, aromatic stability, classification drill; alkyl derivation, functional-group gallery, alkanol ladder (65/78/97 C), CH2 14-u rule, gradation-vs-uniformity, NEB 2022 panel, R+X anatomy; notation ladder, C2H6O isomer test, bond-line conventions, ethanol three ways, zig-zag pentane drill, condensed examples, single/double/triple bond lines; cracking-vs-reforming, catalytic cracking flow (zeolite), platforming (Pt, n-hexane -> benzene), octane scale (iso-octane 100/n-heptane 0), cetane scale (n-cetane 100/alpha-methylnaphthalene 0), knocking mechanism, additive timeline (TEL -> MTBE/ethanol). All 49 keywords verified against first-entry canonical JSONs; two TSX syntax/type fixes (template-literal path, cx cast) before tsc clean; topic-doc-view 14/14.\n")
anchor = "- Session 16 \u2014"
i = s.find(anchor)
assert i > 0
s = s[:i] + note + s[i:]
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("session 27 note inserted")
