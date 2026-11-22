import re, io

P = 'docs/guides/mathematics-xi-mastery-plan.md'
s = io.open(P, 'r', encoding='utf-8').read()

rows = {
 27: ("Limits", "Introduction to limits and continuity", "limits-and-continuity/01-introduction-to-limits-and-continuity.json",
      "mx25-mx30 session 6a: limit idea, notation, value at a point, RHL, LHL, existence; NEB-style practice"),
 28: ("Limits", "Function: definition and notation", "limits-and-continuity/02-function-definition-and-notation.json",
      "mx26: function definition, notation, domain/range recap as limit stage-setting; NEB-style practice"),
 29: ("Limits", "Value of a function at a point", "limits-and-continuity/03-value-of-function-at-a-point.json",
      "mx27: f(a) vs limit distinction, evaluation drills; NEB-style practice"),
 30: ("Limits", "Right-hand limit", "limits-and-continuity/04-right-hand-limit.json",
      "mx28: RHL definition, piecewise branch reading, worked items; NEB-style practice"),
 31: ("Limits", "Left-hand limit", "limits-and-continuity/05-left-hand-limit.json",
      "mx29: LHL definition, symmetric drills; NEB-style practice"),
 32: ("Limits", "Existence of limit", "limits-and-continuity/06-existence-of-limit.json",
      "mx30: LHL = RHL theorem, DNE taxonomy (jump, blow-up, oscillation); NEB-style practice"),
 33: ("Limits", "Standard limits", "limits-and-continuity/07-standard-limits.json",
      "mx31: standard-limit shelf (sin x/x, e-limits, x^n-a^n, (1+x)^(1/x)); PYQs NEB 2022 (e^x-1)/x MCQ, NEB 2024 sin x - x cos x and x - sin x over x^3, NEB 2021 sqrt(7+x)-3 over x-2"),
 34: ("Limits", "Continuity (intuitive)", "limits-and-continuity/08-continuity-intuitive.json",
      "mx32: pen test, three-part theorem, closure theorems, composition, squeeze rescue x^2 sin(1/x); NEB-style practice"),
 35: ("Limits", "Continuity (formal)", "limits-and-continuity/09-continuity-formal.json",
      "mx33: epsilon-delta statement, sequential characterisation, IVT and EVT with counterexamples; NEB-style practice"),
 36: ("Limits", "Removable discontinuity", "limits-and-continuity/10-removable-discontinuity.json",
      "mx34: hole vs mismatch, repair theorem, factor-and-cancel, per-point triage; NEB-style practice"),
 37: ("Limits", "Jump discontinuity", "limits-and-continuity/11-jump-discontinuity.json",
      "mx35: finite unequal sides, jump size, Heaviside, floor staircase, one-sided continuity; NEB-style practice"),
 38: ("Limits", "Infinite discontinuity", "limits-and-continuity/12-infinite-discontinuity.json",
      "mx36: blow-ups, vertical asymptotes, multiplicity rule, ln x and e^(1/x) walls; NEB-style practice"),
 39: ("Limits", "Trigonometric limits", "limits-and-continuity/13-trigonometric-limits.json",
      "mx37: rescaling sin(kx)/x -> k, half-angle family, compound-angle steering, cubic refinements; NEB-style practice"),
 40: ("Limits", "Logarithmic and exponential limits", "limits-and-continuity/14-log-exp-limits.json",
      "mx38: e-limits, 1^inf bridge e^(lim uv), growth ladder; NEB-style practice"),
 41: ("Limits", "Exercise 15.1", "limits-and-continuity/15-exercise-15-1.json",
      "mx39: method types A-D (substitution, factoring, conjugate, degree comparison); NEB-style practice"),
 42: ("Limits", "Exercise 15.2", "limits-and-continuity/16-exercise-15-2.json",
      "mx40: standard-limit reduction patterns, x-bridge, legal splitting; NEB-style practice"),
 43: ("Limits", "Exercise 15.3", "limits-and-continuity/17-exercise-15-3.json",
      "mx41b: continuity workflow (domain, closure, triage), piecewise seams, full reports; NEB-style practice"),
}

n_total = 0
for num, (unit, topic, path, note) in rows.items():
    new = "| %d | %s | %s | `%s` | Done \u2014 %s |" % (num, unit, topic, path, note)
    pat = r"\| %d \|.*" % num
    s2, n = re.subn(pat, new.replace('\\', '\\\\'), s, count=1)
    assert n == 1, "row %d not found" % num
    s = s2
    n_total += n

io.open(P, 'w', encoding='utf-8', newline='\n').write(s)
print("updated rows:", n_total)
