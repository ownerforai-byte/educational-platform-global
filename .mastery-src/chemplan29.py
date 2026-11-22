#!/usr/bin/env python
# Chemistry plan update: rows 121-128 TBD -> Completed + Session log entry
import re

P = 'docs/guides/chemistry-xi-mastery-plan.md'
s = open(P, 'rb').read().decode('utf-8-sig')

n = 0
def mark(m):
    global n
    n += 1
    return m.group(0).replace('| TBD |', '| Completed |')

s, c1 = re.subn(r'^\| 12[1-4] \|[^\n]*\| TBD \|$', mark, s, flags=re.M)
s, c2 = re.subn(r'^\| 12[5-8] \|[^\n]*\| TBD \|$', mark, s, flags=re.M)
assert (c1, c2) == (4, 4), (c1, c2)

entry = ("- Session 29 - Aromatic Hydrocarbons notes (rows 121-128, 8/8) at the deep-conceptual + heavy-mark "
"grade (6 note sections incl. 2 Deep Conceptual readings, 4+ NEB-style solved heavy-mark questions with "
"full working): cx121 introduction/characteristics (aromatic = electronic verdict not smell; hydrogenation "
"ladder 120/232/208 vs 360 = 152 kJ/mol resonance energy measured; cyclobutadiene antiaromatic vs "
"cyclooctatetraene tub-escape non-aromatic; sooty flame from 92.3% C); cx122 Huckel's rule (NEB 2024 3m "
"PYQ; count electrons in the cyclic p system not double bonds - lone pair in (pyrrole) vs out (pyridine) "
"vs vacancy (tropylium) vs donation (C5H5-); 4n+2 closed-shell MO origin; C5H5- acidity pKa 16 as "
"experimental receipt); cx123 Kekule structure (NEB 2024 2m PYQ; three failures as three experiments - "
"139 pm single length, 208 vs 360 hydrogenation, substitution vs addition; ring survived even where "
"alternation failed - isomer counts 1 and 3); cx124 resonance and isomerism (NEB 2021 3m PYQ; resonance "
"as bookkeeping not flickering; equal contributors maximise stabilisation; o/m/p isomerism lives in the "
"sigma skeleton; corrected the 208-120=88 resonance-energy mis-computation to 360-208=152); cx125 "
"preparation (soda-lime decarboxylation with CaO's two jobs, Zn-dust reduction, Berthelot 3C2H2 red-hot "
"Fe 873 K; conditions are diagnostic; decarboxylation generalises to substituted benzoates -> toluene); "
"cx126 physical properties (bp 80.5/mp 5.5/density 0.879 each with structural reason; hexane -95 C "
"comparison proves planarity via packing; hydrophobic-effect immiscibility; I2 distribution violet in "
"benzene); cx127 chemical properties (6 verified PYQs: NEB 2022 nitration+sulphonation, NEB 2020 "
"substitution-vs-addition, NEB 2024 nitration mechanism 4m + Friedel-Crafts 3m + directors 3m + toluene "
"oxidation 2m; one three-act mechanism - sigma-complex, resonance-stabilised, deprotonation driven by "
"regained aromaticity; orientation as sigma-complex bookkeeping; halogen paradox = reactivity and "
"regiochemistry are independent axes; FC limitations polyalkylation/rearrangement/deactivated rings); "
"cx128 combustion and uses (2C6H6+15O2->12CO2+6H2O; sooty flame as local stoichiometry deficit; H:C "
"ratio ladder benzene->cyclohexane; uses grouped by property exploited - solvent/precursor web "
"(styrene, phenol, aniline, adipic acid)/restricted fuel; carcinogenicity -> toluene substitute; "
"1634 kJ per 78 g enthalpy scaling). Legacy duplicate-slug files (01-aromatic-compounds, 02-benzene, "
"02-kekule-structure-of-benzene-resonance-and-isomerism, 03-preparation-properties-and-uses) untouched. "
"Build 255 entries, validator 0 broken. Next unit: Fundamentals of Applied Chemistry (rows 129-134).")

anchor = "- Session 26 -"
i = s.find(anchor)
assert i > 0
s = s[:i] + entry + "\n\n" + s[i:]

open(P, 'w', encoding='utf-8-sig', newline='\n').write(s)
print('rows marked:', c1 + c2, '| entry inserted')
