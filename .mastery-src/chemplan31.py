#!/usr/bin/env python
# Chemistry plan update: rows 135-140 TBD -> Completed + Session 31 log entry
import re

P = 'docs/guides/chemistry-xi-mastery-plan.md'
s = open(P, 'rb').read().decode('utf-8-sig')

n = 0
def mark(m):
    global n
    n += 1
    return m.group(0).replace('| TBD |', '| Completed |')

s, c1 = re.subn(r'^\| 13[5-9] \|[^\n]*\| TBD \|$', mark, s, flags=re.M)
s, c2 = re.subn(r'^\| 140 \|[^\n]*\| TBD \|$', mark, s, flags=re.M)
assert (c1, c2) == (5, 1), (c1, c2)

entry = ("- Session 31 - Modern Chemical Manufactures notes (rows 135-140, 6/6) at the deep-conceptual + "
"heavy-mark grade (6 note sections incl. 2 Deep Conceptual readings, 4 NEB-style solved heavy-mark "
"questions each), completing the chemistry plan: cx135 Haber process (three-layer pressure answer - "
"equilibrium/rate/condensation; 450-500 C profit optimum; 15% per-pass -> ~97% overall via recycle; "
"steam reforming + shift feed chemistry; NEB 2024 5m verified); cx136 Ostwald process (three "
"temperature regimes with the quench as the signature; Pt-Rh gauze selection; Haber->Ostwald->"
"ammonium nitrate chain; NEB 2024 3m verified); cx137 Contact process (four stages; oleum-not-water "
"fog argument; ~99% conversion at 1-2 atm vs Haber's bought pressure; catalyst-poisoning purification "
"train; NEB 2024 4m verified); cx138 diaphragm cell (three products and a separation problem; "
"discharge competitions; percolation as tuned variable; chlor-alkali co-product economics; membrane "
"cell contrast); cx139 Solvay process (ammonia stoichiometric en route, catalytic overall; "
"solubility-as-selectivity in the cold carbonating tower; CaCl2 by-product weakness vs Leblanc "
"lesson; NEB 2024 3m verified); cx140 fertilizers and urea (N-density ranking 46/35/21; carbamate "
"route with recycle; oldest-leaves-first mobility diagnostic; NPK grade equivalence; NEB 2024 2m "
"verified). Cross-unit assignment: the NEB 2024 cement question (3m) appended to the chemical-industry "
"canonical (row 129) - cement is its heavy-chemical exemplar and no cement row exists; applied-chemistry "
"file now carries 5 practice questions. Build 255 entries, validator 0 broken. CHEMISTRY PLAN COMPLETE: "
"114 Completed, 0 TBD.")

anchor = "- Session 30 -"
i = s.find(anchor)
assert i > 0
s = s[:i] + entry + "\n\n" + s[i:]

open(P, 'w', encoding='utf-8-sig', newline='\n').write(s)
print('rows marked:', c1 + c2, '| entry inserted')
