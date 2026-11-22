#!/usr/bin/env python
# Session 9 plan update: mark rows 83-91 Completed + insert progress-log entry
import re

P = 'docs/guides/mathematics-xi-mastery-plan.md'
s = open(P, 'rb').read().decode('utf-8-sig')

n = 0
def mark(m):
    global n
    n += 1
    return m.group(0).replace('| Pending |', '| Completed |')

s, c1 = re.subn(r'^\| 8[3-9] \|[^\n]*\| Pending \|$', mark, s, flags=re.M)
s, c2 = re.subn(r'^\| 9[0-1] \|[^\n]*\| Pending \|$', mark, s, flags=re.M)
assert (c1, c2) == (7, 2), (c1, c2, n)

entry = ("- Session 9 - Analytic geometry canonicals (rows 83-91, 9/9): six thin companions fully enriched "
"to the deep-conceptual + heavy-mark pattern (6 note sections incl. 2 Deep Conceptual readings, 4 NEB-style "
"solved heavy-mark questions with full working and cross-checks): 03-coordinates-in-space (direction cosines "
"as the unit vector read componentwise, distance as Pythagoras iterated via the box picture), "
"01-angle-bisector-a1a2-plus-b1b2-rule (equal-distance locus, sign convention as the rule's licence, "
"perpendicularity as an identity with a general proof), 02-angle-bisector-worked-example (pipeline on "
"x+2y-5=0 / 4x+2y+9=0 with the lcm factor discipline and dual-channel checks), "
"03-angle-bisector-tan-theta-verification (45-degree threshold in fractions, reciprocal half-angle tangents), "
"02-angle-bisector-worked-example--2 (fresh pair 2x+y-7=0 / 2x-y+1=0 with axis-parallel bisectors, "
"three-channel audit: perpendicularity + equidistance + intersection anchor), "
"03-angle-bisector-tan-theta-verification--2 (axis-angle fallback for the vertical bisector, doubling "
"closure). Three richer files kept their note sets and gained real solved questions: 01-straight-line "
"(14 notes, placeholder pq replaced by 7 solved: perpendicular distance, bisector pair with labels, "
"distance-k locus, direction cosines, foot of perpendicular, parallel-lines distance, origin-side bisector); "
"02-pair-of-straight-lines (16 notes, 7 solved: h^2-ab condition, coincidence boundary, perpendicular pair "
"a+b=0, slope relations, pair bisectors, point-on-pair, homogeneous-vs-determinant conditions); "
"geometry-9-1 (40-note exercise gallery, 2 generic pq replaced by 7 solved bisector questions + full "
"summary rewrite). Build 101 entries, validator 0 broken.\n\n")

anchor = "- Session 8 -"
i = s.find(anchor)
assert i > 0
s = s[:i] + entry + s[i:]

open(P, 'w', encoding='utf-8-sig', newline='\n').write(s)
print('rows marked:', c1 + c2, '| entry inserted')
