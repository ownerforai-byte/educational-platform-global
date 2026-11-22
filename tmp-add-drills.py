#!/usr/bin/env python3
"""Insert a three-per-row NEB solved drill into each Mathematics XI unit."""
import io
import os
import re

DIR = "frontend/public/resources/mathematics-xi"

HEAD = """<h2>Rapid drill — three solved questions in one row</h2>
<p class="lede">The three most common NEB question shapes for this unit, solved side by side. Each cell is a complete answer: the working is worth the marks, the answer line is only the check.</p>
"""

FOOT = """<p class="note">Marking note: the middle cell of each row is a full 4-mark question — set up, substitute, evaluate, answer. In the exam the working block earns 3 of those 4 marks, so never write only the final value.</p>

"""

BLOCKS = {
    "unit-01-algebra.html": """<div class="qgrid">
<div class="cell">
<span class="tag">Set · inequality</span>
<p class="q"><span class="n">1.</span>Solve |2x − 3| ≤ 5 and write the solution set.<span class="mk">2 marks</span></p>
<div class="work">−5 ≤ 2x − 3 ≤ 5
−2 ≤ 2x ≤ 8
−1 ≤ x ≤ 4</div>
<p class="ans">x ∈ [−1, 4]</p>
</div>
<div class="cell">
<span class="tag">Matrix · inverse</span>
<p class="q"><span class="n">2.</span>If A = [[1, 2], [3, 4]], find A⁻¹.<span class="mk">4 marks</span></p>
<div class="work">det A = 1·4 − 2·3 = −2 ≠ 0
A⁻¹ = (1/det A)·[[4, −2], [−3, 1]]
     = (−1/2)[[4, −2], [−3, 1]]</div>
<p class="ans">A⁻¹ = [[−2, 1], [3/2, −1/2]]</p>
</div>
<div class="cell">
<span class="tag">Function · inverse</span>
<p class="q"><span class="n">3.</span>For f(x) = 2x + 1, find f⁻¹ and verify with f⁻¹(7).<span class="mk">2 marks</span></p>
<div class="work">y = 2x + 1 ⇒ x = (y − 1)/2
f⁻¹(x) = (x − 1)/2
f⁻¹(7) = 3, and f(3) = 7 ✔</div>
<p class="ans">f⁻¹(x) = (x − 1)/2</p>
</div>
</div>

""",
    "unit-02-trigonometry.html": """<div class="qgrid">
<div class="cell">
<span class="tag">Identity · compound angle</span>
<p class="q"><span class="n">1.</span>Evaluate sin 75° without tables.<span class="mk">2 marks</span></p>
<div class="work">sin 75° = sin(45° + 30°)
= sin45 cos30 + cos45 sin30
= (√2/2)(√3/2) + (√2/2)(1/2)</div>
<p class="ans">(√6 + √2)/4 ≈ 0.966</p>
</div>
<div class="cell">
<span class="tag">Equation · general solution</span>
<p class="q"><span class="n">2.</span>Solve 2sin²θ − 1 = 0 for 0° ≤ θ ≤ 360°.<span class="mk">4 marks</span></p>
<div class="work">sin²θ = 1/2 ⇒ sinθ = ±1/√2
θ = 45°, 135° (sinθ = +1/√2)
θ = 225°, 315° (sinθ = −1/√2)</div>
<p class="ans">θ = 45°, 135°, 225°, 315°</p>
</div>
<div class="cell">
<span class="tag">Proof · half angle</span>
<p class="q"><span class="n">3.</span>Prove (1 − cos 2θ)/sin 2θ = tan θ.<span class="mk">3 marks</span></p>
<div class="work">1 − cos 2θ = 2sin²θ
sin 2θ = 2 sinθ cosθ
ratio = 2sin²θ / 2sinθcosθ = sinθ/cosθ</div>
<p class="ans">= tan θ ✔</p>
</div>
</div>

""",
    "unit-03-analytic-geometry.html": """<div class="qgrid">
<div class="cell">
<span class="tag">Distance formula</span>
<p class="q"><span class="n">1.</span>Find the distance between (2, −3) and (−1, 1).<span class="mk">2 marks</span></p>
<div class="work">d = √[(−1 − 2)² + (1 + 3)²]
= √(9 + 16) = √25</div>
<p class="ans">d = 5 units</p>
</div>
<div class="cell">
<span class="tag">Straight line</span>
<p class="q"><span class="n">2.</span>Find the equation of the line through (1, 2) with slope −3.<span class="mk">4 marks</span></p>
<div class="work">y − y₁ = m(x − x₁)
y − 2 = −3(x − 1)
y − 2 = −3x + 3</div>
<p class="ans">3x + y − 5 = 0</p>
</div>
<div class="cell">
<span class="tag">Circle · centre and radius</span>
<p class="q"><span class="n">3.</span>For x² + y² − 4x + 6y − 12 = 0, find centre and radius.<span class="mk">3 marks</span></p>
<div class="work">centre (−g, −f) = (2, −3)
r = √(g² + f² − c) = √(4 + 9 + 12)</div>
<p class="ans">centre (2, −3), r = 5</p>
</div>
</div>

""",
    "unit-04-vectors.html": """<div class="qgrid">
<div class="cell">
<span class="tag">Magnitude</span>
<p class="q"><span class="n">1.</span>If a = 2i + 3j − k, find |a|.<span class="mk">2 marks</span></p>
<div class="work">|a| = √(2² + 3² + (−1)²)
= √(4 + 9 + 1)</div>
<p class="ans">|a| = √14 ≈ 3.74</p>
</div>
<div class="cell">
<span class="tag">Dot product · angle</span>
<p class="q"><span class="n">2.</span>Find the angle between a = i + j and b = i − j.<span class="mk">4 marks</span></p>
<div class="work">a·b = 1·1 + 1·(−1) = 0
|a| = |b| = √2
cos θ = 0 / 2 = 0</div>
<p class="ans">θ = 90°</p>
</div>
<div class="cell">
<span class="tag">Cross product</span>
<p class="q"><span class="n">3.</span>If a = 3i − j + 2k, b = i + 2j − k, find a × b.<span class="mk">3 marks</span></p>
<div class="work">i(−1·−1 − 2·2) − j(3·−1 − 2·1) + k(3·2 + 1·1)
= i(1 − 4) − j(−3 − 2) + k(6 + 1)</div>
<p class="ans">−3i + 5j + 7k</p>
</div>
</div>

""",
    "unit-05-statistics-probability.html": """<div class="qgrid">
<div class="cell">
<span class="tag">Mean</span>
<p class="q"><span class="n">1.</span>Find the mean of 4, 7, 9, 11, 14.<span class="mk">2 marks</span></p>
<div class="work">Σx = 4 + 7 + 9 + 11 + 14 = 45
n = 5, x̄ = 45/5</div>
<p class="ans">x̄ = 9</p>
</div>
<div class="cell">
<span class="tag">Probability · two dice</span>
<p class="q"><span class="n">2.</span>Two fair dice are thrown. Find P(sum = 8).<span class="mk">4 marks</span></p>
<div class="work">n(S) = 36
sum 8: (2,6) (3,5) (4,4) (5,3) (6,2) → 5
P = n(E)/n(S) = 5/36</div>
<p class="ans">P = 5/36 ≈ 0.139</p>
</div>
<div class="cell">
<span class="tag">Standard deviation</span>
<p class="q"><span class="n">3.</span>Find the standard deviation of 2, 4, 6, 8, 10.<span class="mk">3 marks</span></p>
<div class="work">x̄ = 6; deviations −4, −2, 0, 2, 4
Σd² = 16 + 4 + 0 + 4 + 16 = 40
σ² = 40/5 = 8</div>
<p class="ans">σ = 2√2 ≈ 2.83</p>
</div>
</div>

""",
    "unit-06-calculus.html": """<div class="qgrid">
<div class="cell">
<span class="tag">Differentiation</span>
<p class="q"><span class="n">1.</span>Differentiate y = x³ − 3x² + 5x − 7.<span class="mk">2 marks</span></p>
<div class="work">dy/dx = 3x² − 6x + 5
(each term by the power rule)</div>
<p class="ans">dy/dx = 3x² − 6x + 5</p>
</div>
<div class="cell">
<span class="tag">Definite integral</span>
<p class="q"><span class="n">2.</span>Evaluate ∫₀² (3x² + 2x) dx.<span class="mk">4 marks</span></p>
<div class="work">= [x³ + x²]₀²
= (8 + 4) − (0 + 0)
= 12</div>
<p class="ans">12</p>
</div>
<div class="cell">
<span class="tag">Quotient rule</span>
<p class="q"><span class="n">3.</span>Differentiate y = (x² + 1)/(x − 1).<span class="mk">3 marks</span></p>
<div class="work">dy/dx = [2x(x − 1) − (x² + 1)·1]/(x − 1)²
= (2x² − 2x − x² − 1)/(x − 1)²</div>
<p class="ans">(x² − 2x − 1)/(x − 1)², x ≠ 1</p>
</div>
</div>

""",
    "unit-07-computational-methods.html": """<div class="qgrid">
<div class="cell">
<span class="tag">Bisection</span>
<p class="q"><span class="n">1.</span>Locate the root of x² − 2 = 0 on [1, 2] after one bisection step.<span class="mk">2 marks</span></p>
<div class="work">f(1) = −1, f(2) = +2 ⇒ root in (1, 2)
x₁ = (1 + 2)/2 = 1.5
f(1.5) = 0.25 &gt; 0 ⇒ root in (1, 1.5)</div>
<p class="ans">root ∈ (1, 1.5), error ≤ 0.5</p>
</div>
<div class="cell">
<span class="tag">Newton–Raphson</span>
<p class="q"><span class="n">2.</span>Find √5 by one Newton–Raphson step from x₀ = 2.<span class="mk">4 marks</span></p>
<div class="work">f(x) = x² − 5, f′(x) = 2x
x₁ = x₀ − f(x₀)/f′(x₀)
   = 2 − (4 − 5)/4 = 2 + 0.25</div>
<p class="ans">x₁ = 2.25 (√5 = 2.2360…)</p>
</div>
<div class="cell">
<span class="tag">Simpson's rule</span>
<p class="q"><span class="n">3.</span>Evaluate ∫₀² x² dx by Simpson's rule with n = 2.<span class="mk">3 marks</span></p>
<div class="work">h = (2 − 0)/2 = 1; f = 0, 1, 4
I ≈ (h/3)[f₀ + 4f₁ + f₂]
  = (1/3)(0 + 4 + 4)</div>
<p class="ans">I = 8/3 ≈ 2.667 (exact)</p>
</div>
</div>

""",
}

for name, block in BLOCKS.items():
    path = os.path.join(DIR, name)
    html = io.open(path, encoding="utf8").read()
    if "Rapid drill — three solved questions in one row" in html:
        print("already", name)
        continue
    payload = HEAD + block + FOOT
    m = re.search(r"<h2>Formula sheet", html)
    if m:
        html = html[: m.start()] + payload + html[m.start() :]
    else:
        m = re.search(r'<p class="note">', html)
        html = html[: m.start()] + payload + html[m.start() :]
    io.open(path, "w", encoding="utf8", newline="\n").write(html)
    print("inserted", name, len(block.splitlines()), "lines")
