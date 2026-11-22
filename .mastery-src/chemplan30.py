#!/usr/bin/env python
# Chemistry plan update: rows 129-134 TBD -> Completed + Session log entry
import re

P = 'docs/guides/chemistry-xi-mastery-plan.md'
s = open(P, 'rb').read().decode('utf-8-sig')

n = 0
def mark(m):
    global n
    n += 1
    return m.group(0).replace('| TBD |', '| Completed |')

s, c1 = re.subn(r'^\| 129 \|[^\n]*\| TBD \|$', mark, s, flags=re.M)
s, c2 = re.subn(r'^\| 13[0-2] \|[^\n]*\| TBD \|$', mark, s, flags=re.M)
s, c3 = re.subn(r'^\| 13[3-4] \|[^\n]*\| TBD \|$', mark, s, flags=re.M)
assert (c1, c2, c3) == (1, 3, 2), (c1, c2, c3)

entry = ("- Session 30 - Fundamentals of Applied Chemistry notes (rows 129-134, 6/6) at the deep-conceptual + "
"heavy-mark grade (6 note sections incl. 2 Deep Conceptual readings, 4 NEB-style solved heavy-mark "
"questions each; no verified PYQs in this unit's bank rows - the NEB 2024 six-question file belongs to "
"Modern Chemical Manufactures, assigned next session): cx129 chemical industry and importance (heavy vs "
"fine vs consumer split as economics not chemistry; sulphuric acid as the industrial barometer; value "
"ladder; heavy-first industrialisation argument); cx130 stages in producing a new product (idea -> "
"research -> feasibility -> development -> pilot plant -> full production + feedback loop; cost ladder "
"~10x per stage; L^3/L^2 scale-up heat trap 1L->10000L gives 21x heat per cooling surface; pilot plant's "
"product is design data; feasibility exists to kill projects); cx131 economics of production (cash-flow "
"cycle with time lags, working capital; fixed vs variable with stoichiometric giveaway; break-even "
"12,000,000/(14,000-8,000) = 2,000 t with unit-cost cross-check; raw materials dominate variable cost - "
"yield as economic lever; high-fixed/low-variable -> big-and-few continuous plants, fine-chemical "
"counterexample); cx132 running/designing a plant (design sequence flowsheet->balances->equipment->"
"materials->safety->siting; unit operations vs unit processes; separations occupy most of the plant; "
"inherent-safety hierarchy; 100 kg/h 20%->50% salt evaporator balance 40 kg/h product, 60 kg/h water; "
"siting transport-vs-population conflict); cx133 continuous and batch processing (recipe-in-time vs "
"equilibrium-in-space; comparison table; pharma five-product validation case vs ammonia 350-day run; "
"semi-batch slow feed as the L^3/L^2 answer + selectivity bonus); cx134 environmental impact "
"(gas/liquid/solid wastes with mobility gradient; atom economy vs yield independence - ethanol "
"dehydration 60.9% vs dodecane cracking 16.5% with saleable co-product nuance; SO2 + 2NaOH scrubbing "
"transfers not destroys; Minamata bioaccumulation fate chain; life-cycle assessment against "
"burden-shifting). Build 255 entries, validator 0 broken. Final chemistry unit: Modern Chemical "
"Manufactures (rows 135-140).")

anchor = "- Session 29 -"
i = s.find(anchor)
assert i > 0
s = s[:i] + entry + "\n\n" + s[i:]

open(P, 'w', encoding='utf-8-sig', newline='\n').write(s)
print('rows marked:', c1 + c2 + c3, '| entry inserted')
