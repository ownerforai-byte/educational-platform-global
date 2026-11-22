#!/usr/bin/env python
# Targeted enrichment: limits.json (append Q4-Q7) and 07-the-definite-integral (replace generic pq with 7 solved)
import json

BASE = 'content/notes/concepts/class-11/mathematics/calculus/'
MIRROR = 'frontend/public/data/syllabus-notes/mathematics/calculus/'

def load(p):
    return json.loads(open(p, 'rb').read().decode('utf-8-sig'))

def save(p, d):
    with open(p, 'w', encoding='utf-8-sig', newline='\n') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)

LIM_QS = [
"Q4. **NEB-style (5m):** Evaluate $\\lim_{x\\to5}\\frac{x^2-25}{x-5}$ with the four-line rhythm (form, transform, licence, value). **Solution.** Form: $(25-25)/0=0/0$, indeterminate. Transform: $x^2-25=(x-5)(x+5)$, so the expression equals $x+5$ for $x\\ne5$. Licence: the cancellation is valid off the excluded point $x=5$, exactly the punctured neighbourhood the limit reads. Value: $5+5=10$. Cross-check: the star $\\frac{x^n-a^n}{x-a}\\to na^{n-1}$ gives $2\\cdot5=10$. Deep point: the four lines are four theorems - diagnosis, transformation identity, cancellation licence, continuity-licensed substitution.",
"Q5. **NEB-style (6m):** Evaluate the one-sided limits of $f(x)=\\frac{x+2}{x-1}$ at $x=1$ and classify the discontinuity. **Solution.** Numerator at 1 is $3\\ne0$, so a genuine wall. RHL ($x\\to1^+$): denominator small positive, numerator positive, so $f\\to+\\infty$. LHL ($x\\to1^-$): denominator small negative, so $f\\to-\\infty$. Classification: infinite discontinuity - a splitting wall (the denominator's zero is simple, odd parity), the limit does not exist, non-removable. Deep point: the numerator's nonzero value at the root certified the wall before any sign work; the odd parity predicted the split - three facts from one factorisation glance.",
"Q6. **NEB-style (5m):** Evaluate $\\lim_{x\\to0}\\frac{\\sqrt{1+x}-1}{x}$. **Solution.** Form: $0/0$. Transform (conjugate): $(\\sqrt{1+x}-1)(\\sqrt{1+x}+1)=x$, so the expression equals $\\frac{1}{\\sqrt{1+x}+1}$ for $x\\ne0$. Value: $\\frac{1}{1+1}=\\frac12$. Cross-check: the radical star $\\sqrt{1+u}-1\\sim u/2$ gives $1/2$. Deep point: the conjugate converted a radical $0/0$ into a plain substitution - every transformation's job is to hand the problem to continuity; the answer $1/2$ is the square root's slope at 1, the derivative in embryo.",
"Q7. **NEB-style (6m):** For $f(x)=\\frac{x^2-3x+2}{x-1}$ for $x\\ne1$ with $f(1)=0$, run the complete limit-and-continuity audit at $x=1$. **Solution.** Form: $(1-3+2)/0=0/0$; factor: $\\frac{(x-1)(x-2)}{x-1}=x-2$ for $x\\ne1$. Limit: $\\lim=-1$ (both sides agree - the simplified form is continuous). Value: $f(1)=0\\ne-1$. Classification: removable (mismatch) - a detached dot at $(1,0)$ over the hole at $(1,-1)$. Repair: define $f(1)=-1$, making $f$ continuous. Deep point: the audit's order - limit via transformation, then value comparison, then classification and repair - is the universal template; every continuity question is this audit with different algebra feeding step one.",
]

DEF_QS = [
"Q1. **NEB-style (5m):** Evaluate $\\int_1^3(2x+1)\\,dx$ and verify geometrically. **Solution.** FTC Part 2: $F(x)=x^2+x$, so $F(3)-F(1)=12-2=10$. Geometry: the region under $y=2x+1$ from 1 to 3 is a trapezoid with parallel sides $f(1)=3$ and $f(3)=7$, width 2: area $=\\frac12(3+7)(2)=10$. Deep point: for linear integrands the Riemann limit is finite geometry - the trapezoid check is the FTC made visible.",
"Q2. **NEB-style (6m):** Evaluate $\\lim_{n\\to\\infty}\\sum_{i=1}^{n}\\left(\\frac{i}{n}\\right)^2\\cdot\\frac1n$ by recognising it as a definite integral. **Solution.** Anatomy: $\\Delta x=1/n$ gives $b-a=1$ with $a=0$; $x_i=i/n$ are the right endpoints of $[0,1]$; $f(x_i)=(i/n)^2=x_i^2$. The sum is the right-endpoint Riemann sum of $f(x)=x^2$ on $[0,1]$, so the limit is $\\int_0^1x^2dx=\\frac13$. Cross-check: $\\sum i^2=\\frac{n(n+1)(2n+1)}{6}$ gives $\\frac{1}{n^3}\\cdot\\frac{n(n+1)(2n+1)}{6}\\to\\frac26=\\frac13$. Deep point: recognising $\\Delta x$ and the sample points is the entire translation skill from sum to integral.",
"Q3. **NEB-style (6m):** Find $\\frac{d}{dx}\\int_1^{x^2}e^t\\,dt$ and $\\frac{d}{dx}\\int_x^5\\cos(t^2)\\,dt$. **Solution.** First (upper limit is a function): FTC Part 1 plus the chain rule gives $f(g(x))g'(x)=e^{x^2}\\cdot2x=2xe^{x^2}$. Second (lower limit is live): reversal gives $-\\int_5^x\\cos(t^2)dt$, so the derivative is $-\\cos(x^2)$. Verification of the first by Part 2: $\\int_1^{x^2}e^tdt=e^{x^2}-e$, derivative $2xe^{x^2}$. Deep point: $\\cos(t^2)$ has no elementary anti-derivative, yet Part 1 differentiates its accumulation anyway - the theorem outruns the table.",
"Q4. **NEB-style (6m):** Find the area between $y=x^2$ and $y=x$. **Solution.** Intersections: $x^2=x$ gives $x=0,1$. Order test at $x=1/2$: the line ($1/2$) is above the parabola ($1/4$), and with no interior crossing one test settles the strip. Area $=\\int_0^1(x-x^2)dx=\\frac12-\\frac13=\\frac16$. Deep point: the order cannot change without a crossing, so one sample point per strip is a proof, not a guess.",
"Q5. **NEB-style (6m):** Find the geometric area between $y=x^2-4$ and the $x$-axis on $[0,5]$. **Solution.** Root in $[0,5]$: $x=2$; the curve is below on $[0,2)$ and above on $(2,5]$. Piece 1: $\\int_0^2(4-x^2)dx=\\frac{16}{3}$. Piece 2: $\\int_2^5(x^2-4)dx=27$. Geometric area $=\\frac{16}{3}+27=\\frac{97}{3}$. The raw signed integral is $\\frac{65}{3}$ - smaller by exactly $2\\cdot\\frac{16}{3}$, the double-counted dip. Deep point: skipping the split understates the map by twice the below-axis region.",
"Q6. **NEB-style (5m):** Given $\\int_1^4f=5$ and $\\int_4^6f=-2$, find $\\int_6^1f$ and $\\int_1^6f$. **Solution.** Additivity: $\\int_1^6f=5+(-2)=3$. Reversal: $\\int_6^1f=-3$. Deep point: additivity concatenates journeys along the $x$-axis and reversal walks one backwards - every integral property has a picture that verifies it.",
"Q7. **NEB-style (6m):** Find the area enclosed by $y=\\sqrt{9-x^2}$ and the $x$-axis, verifying by geometry. **Solution.** The integrand is the upper semicircle of $x^2+y^2=9$; it is nonnegative on $[-3,3]$, so no split. Even symmetry: area $=2\\int_0^3\\sqrt{9-x^2}dx=2\\cdot\\frac{\\pi\\cdot9}{4}=\\frac{9\\pi}{2}$. Geometry: semicircle area $\\frac{\\pi r^2}{2}=\\frac{9\\pi}{2}$. Deep point: $\\sqrt{a^2-x^2}$ is the circle's signature - recognising it converts calculus to $\\pi a^2/4$ per quarter, and symmetry halving stacks a second saving.",
]

DEF_SUMMARY = ("The definite integral and its area readings: Riemann's limit defines the integral (chop, sample, sum, refine - valid even where no anti-derivative exists) while the Fundamental Theorem computes it as F(b) - F(a). The accumulation function bridges the two, the dummy variable separates numbers from functions, and live limits bring the chain rule and the reversal minus. Geometric area is the signed integral split at the axis crossings; area between curves is |f - g| resolved by the intersection analysis into top-minus-bottom, with the slicing axis chosen to minimise splits.")

def main():
    # 1. limits.json - append Q4-Q7
    for base in (BASE, MIRROR):
        p = base + 'limits.json'
        d = load(p)
        ec = d.get('enrichedContent', d)
        pq = ec['practiceQuestions']
        assert len(pq) == 3, (p, len(pq))
        assert not any('NEB-style' in q for q in pq), p
        ec['practiceQuestions'] = pq + LIM_QS
        save(p, d)
        print('limits.json ->', len(ec['practiceQuestions']), 'pq @', p)

    # 2. 07-the-definite-integral - replace generic pq, upgrade summary
    name = '07-the-definite-integral-the-definite-integral-as-an-area-under-the-given-curve-area-between-two-cu.json'
    for base in (BASE, MIRROR):
        p = base + name
        d = load(p)
        ec = d.get('enrichedContent', d)
        old = ec['practiceQuestions']
        assert len(old) == 3 and all('NEB-style' not in q for q in old), p
        ec['practiceQuestions'] = DEF_QS
        ec['summary'] = DEF_SUMMARY
        save(p, d)
        print(name[:30], '->', len(DEF_QS), 'pq, summary', len(DEF_SUMMARY), 'chars @', p)

if __name__ == '__main__':
    main()
