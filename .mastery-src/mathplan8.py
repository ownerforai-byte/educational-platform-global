#!/usr/bin/env python
# Session 8 plan update: mark rows 54-82 Completed + insert progress-log entry
import re

P = 'docs/guides/mathematics-xi-mastery-plan.md'
s = open(P, 'rb').read().decode('utf-8-sig')

# 1. Mark rows 54-82 Completed
n = 0
def mark(m):
    global n
    n += 1
    return m.group(0).replace('| Pending |', '| Completed |')

s, n = re.subn(r'^\| (5[4-9]|6[0-9]|7[0-9]|8[0-2]) \|[^\n]*\| Pending \|$', mark, s, flags=re.M)
assert n == 29, n

# 2. Insert Session 8 entry before the Session 6b anchor (entries are newest-first)
entry = ("- Session 8 - Calculus companion canonicals (rows 54-82, 29/29) + continuity.json: all 30 thin "
"companions enriched to the deep-conceptual + heavy-mark pattern (6 note sections incl. 2 Deep Conceptual "
"readings, 4 NEB-style solved heavy-mark questions with full working and cross-checks). Sources mx52-mx80 "
"assembled into 01-limits-of-function, 03-algebraic-properties-of-limits, 04-limits-algebraic-trig-exp-log, "
"06-types-of-discontinuity, 07-graphs-of-discontinuous-function, 07-continuity-of-a-function, "
"indeterminate-forms, limit5-01, limits5-1/2/3, limitc, limits-intro, 08-derivatives-definition through "
"16-concavity-points-of-inflection, 17-anti-derivatives-integration, 18-integration-substitution-parts, "
"19-definite-integral, 20-area-under-curve, 21-area-between-two-curves, continuity.json. limits.json (17 "
"notes) and 07-the-definite-integral (10 notes) kept their richer note sets and gained 4 heavy-mark solved "
"questions each (7 pq total; the latter also got a full summary rewrite). Deep layers: limits as the "
"universal joint, determinate forms as answers, forms as rate-races, diagnosis-table drilling, amplitude "
"non-vanishing verdicts, layered second-order stars; derivative as local linearisation, co-derivative sign "
"pattern, radian nativeness, inverse-engine derivations with branch discipline, rules as rate algebra with "
"triage, parametric two-step second-derivative recipe (cycloid concave-down witness), eigen-equation "
"y''=-m^2y, limit-of-secants tangent definition, sign-table monotonicity via MVT, candidate/verdict split "
"for extrema and inflections, five-layer sketch protocol; integration as reversed differentiation with +C "
"as the family price, substitution as change of variables with Jacobian, parts as strategic regression with "
"LIATE and cyclic closes, Riemann-vs-FTC two doors, dummy variables and live limits, ledger-vs-map signed "
"area, top-minus-bottom as disassembled absolute value, slicing-axis economy. Build 101 entries, validator "
"0 broken.\n\n")

anchor = "- Session 6b -"
i = s.find(anchor)
assert i > 0
s = s[:i] + entry + s[i:]

open(P, 'w', encoding='utf-8-sig', newline='\n').write(s)
print('rows marked:', n, '| entry inserted')
