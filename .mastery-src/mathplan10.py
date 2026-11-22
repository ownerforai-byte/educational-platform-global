#!/usr/bin/env python
# Session 10 plan update: mark rows 92-96 Completed + insert progress-log entry
import re

P = 'docs/guides/mathematics-xi-mastery-plan.md'
s = open(P, 'rb').read().decode('utf-8-sig')

n = 0
def mark(m):
    global n
    n += 1
    return m.group(0).replace('| Pending |', '| Completed |')

s, c1 = re.subn(r'^\| 9[2-4] \|[^\n]*\| Pending \|$', mark, s, flags=re.M)
s, c2 = re.subn(r'^\| 9[5-6] \|[^\n]*\| Pending \|$', mark, s, flags=re.M)
assert (c1, c2) == (3, 2), (c1, c2)

entry = ("- Session 10 - Computational methods and mechanics canonicals (rows 92-96, 5/5) - MATH CAMPAIGN "
"COMPLETE (96/96 rows). Four rich doc-style files kept their note sets and gained real solved questions "
"(3 placeholders replaced by 7 solved each, via mx90.py): 01-numerical-computation (bisection two iterations "
"on x^3-4, Newton-Raphson for sqrt5 and cube-root-7 with quadratic-convergence narration, IVT licence for "
"x=cos x, tangent-line derivation, error-bound halving arithmetic, repeated-root linear convergence "
"diagnosis); 02-numerical-integration (trapezoidal vs Simpson on x^2 with Simpson exact-for-quadratics "
"explanation, e^x and 1/x estimates with convexity bias readings, error orders O(h^2) vs O(h^4), even-n "
"pairing condition, single-strip derivation, dx/(1+x^2) landing on pi/4 to five decimals under Simpson); "
"03-mechanics-statics (3-4-5 perpendicular resultant, parallelogram law with rhombus symmetry, 7N/5N at "
"120 degrees with direction check, rectangular resolution, Lami's theorem as the sine rule inside the "
"triangle law, resultant limits [2,8] with the backwards cos-theta solve, direction-formula derivation "
"from components); 04-mechanics-dynamics (equation-selection discipline, braking with declared sign "
"convention, three-equation cross-checks, dropped stone, upward throw with roots-read-as-events symmetry, "
"smooth incline g sin theta, successive-seconds AP pattern with total-distance verification). One thin "
"file fully enriched to the deep-conceptual + heavy-mark pattern (mx89.md, 6 note sections incl. 2 Deep "
"Conceptual readings, 4 NEB-style solved questions): 02-mechanics-statics-and-dynamics - statics as the "
"a=0 degenerate case of the second law, third-law pairs never cancelling within one body's ledger, the "
"three kinematic equations as a complete system with omit-the-unknown selection and sign discipline. "
"Build 101 entries, validator 0 broken.\n\n")

anchor = "- Session 9 -"
i = s.find(anchor)
assert i > 0
s = s[:i] + entry + s[i:]

open(P, 'w', encoding='utf-8-sig', newline='\n').write(s)
print('rows marked:', c1 + c2, '| entry inserted')
