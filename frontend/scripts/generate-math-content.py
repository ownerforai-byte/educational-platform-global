#!/usr/bin/env python3
"""Generate Mathematics content for NEB Class 11 entrance exam focus."""
import json
import re
from pathlib import Path

MATH_CONTENT = {
    "algebra": {
        "Function: domain and range of a function, inverse function": {
            "notes": [
                "### 1. Function Definition",
                "A function f from set A to set B is a rule that assigns to each element of A exactly one element of B. Written as f: A -> B, where A is the domain and B is the codomain.",
                "### 2. Domain and Range",
                "- Domain: All possible input values (x-values) for which f is defined",
                "- Range: All possible output values (y-values) that f produces",
                "- Example: f(x) = sqrt(x-2) -> Domain: x >= 2, Range: y >= 0",
                "### 3. Types of Functions",
                "- One-to-one (Injective): Each output has exactly one input",
                "- Onto (Surjective): Every element of codomain is mapped",
                "- Bijective: Both one-to-one and onto",
                "### 4. Inverse Function",
                "If f: A -> B is bijective, the inverse f^-1: B -> A satisfies f^-1(f(x)) = x and f(f^-1(y)) = y.",
                "To find f^-1: (1) Replace f(x) with y, (2) Solve for x, (3) interchange x and y.",
                "### 5. Condition for Inverse to Exist",
                "f must be one-to-one (horizontal line test) AND onto (range = codomain).",
                "### 6. Graphical Property",
                "The graph of f^-1 is the reflection of f across the line y = x.",
                "### 7. Composite Function",
                "(f o g)(x) = f(g(x)). Note: f o g != g o f in general.",
                "### 8. Entrance Exam Formulas",
                "- f(x) = ax + b -> f^-1(x) = (x-b)/a",
                "- f(x) = x^2 (x>=0) -> f^-1(x) = sqrt(x)",
                "- (f o f^-1)(x) = x and (f^-1 o f)(x) = x",
            ],
            "confusion": [
                "x Every function has an inverse. x Only bijective functions have inverses.",
                "x f^-1(x) = 1/f(x). x f^-1 is the inverse function, not reciprocal.",
                "x Domain = Range always. x They can be different sets.",
            ],
            "practice": [
                "Find the domain and range of f(x) = 1/(x-3).",
                "If f(x) = 2x + 5, find f^-1(x).",
                "Show that f(x) = x^3 is one-to-one and find its inverse.",
                "If f(x) = (x+1)/(x-1), find f o f.",
            ],
            "formulas": [
                "f^-1(f(x)) = x and f(f^-1(x)) = x",
                "(f o g)(x) = f(g(x))",
            ],
        },
        "Sequence and series: arithmetic, geometric, harmonic sequences": {
            "notes": [
                "### 1. Sequence Definition",
                "An ordered list of numbers following a pattern: a1, a2, a3, ..., an, ...",
                "### 2. Arithmetic Progression (AP)",
                "- Common difference: d = an - a(n-1)",
                "- nth term: an = a + (n-1)d",
                "- Sum of n terms: Sn = n/2[2a + (n-1)d] = n/2(a + l)",
                "- Arithmetic Mean: A = (a+b)/2",
                "### 3. Geometric Progression (GP)",
                "- Common ratio: r = an/a(n-1)",
                "- nth term: an = ar^(n-1)",
                "- Sum of n terms: Sn = a(r^n - 1)/(r-1) for r != 1",
                "- Infinite GP (|r| < 1): S_infinity = a/(1-r)",
                "- Geometric Mean: G = sqrt(ab)",
                "### 4. Harmonic Progression (HP)",
                "Reciprocals of an AP: 1/a, 1/(a+d), 1/(a+2d), ...",
                "- Harmonic Mean: H = 2ab/(a+b)",
                "- Relation: A x H = G^2 (AM x HM = GM^2)",
                "### 5. Important Relations",
                "- For AP: an - a(n-1) = d (constant)",
                "- For GP: an/a(n-1) = r (constant)",
                "- AM >= GM >= HM for positive numbers",
                "### 6. Entrance Exam Focus",
                "MCQs: Find nth term, sum, GM/HM; Word problems on AP/GP; relation between AM, GM, HM.",
            ],
            "confusion": [
                "x HP has a direct sum formula. x Take reciprocals, use AP sum.",
                "x r can be any value in infinite GP. x Must have |r| < 1 for convergence.",
                "x AM = GM always. x AM >= GM, equality only when all terms equal.",
            ],
            "practice": [
                "Find the 20th term and sum of first 20 terms of AP: 3, 7, 11, ...",
                "Find the GP: 2, 6, 18, ... and its 8th term.",
                "If AM = 13 and GM = 12, find the two numbers.",
                "Sum of infinite GP: 1 + 1/3 + 1/9 + ...",
            ],
            "formulas": [
                "an = a + (n-1)d (AP)",
                "Sn = n/2[2a + (n-1)d] (AP)",
                "an = ar^(n-1) (GP)",
                "Sn = a(r^n - 1)/(r-1) (GP)",
                "S_infinity = a/(1-r), |r| < 1 (GP)",
                "G = sqrt(ab), H = 2ab/(a+b)",
            ],
        },
        "Matrices and determinants: transpose, properties, inverse": {
            "notes": [
                "### 1. Matrix Definition",
                "A rectangular array of numbers arranged in rows and columns. Order: m x n (m rows, n columns).",
                "### 2. Types of Matrices",
                "- Square: m = n",
                "- Diagonal: All non-diagonal elements are zero",
                "- Identity (I): Diagonal elements = 1, others = 0",
                "- Zero matrix: All elements = 0",
                "- Symmetric: A = A^T",
                "- Skew-symmetric: A = -A^T (diagonal elements = 0)",
                "### 3. Transpose",
                "Interchanging rows and columns: (A^T)_ij = A_ji",
                "- Properties: (A^T)^T = A, (A+B)^T = A^T + B^T, (AB)^T = B^T A^T",
                "### 4. Determinant (2x2 and 3x3)",
                "- |A| = ad - bc for A = [[a,b],[c,d]]",
                "- |A| = 0 -> singular matrix (no inverse)",
                "- |A| != 0 -> non-singular (inverse exists)",
                "### 5. Inverse of a Matrix",
                "A^-1 = (1/|A|) x adj(A) where adj(A) is the adjoint (transpose of cofactor matrix).",
                "### 6. Cramer's Rule",
                "For system ax + by = e, cx + dy = f:",
                "x = Dx/D, y = Dy/D where D = |A|, Dx replaces column 1 with constants, Dy replaces column 2.",
                "### 7. Entrance Exam Formulas",
                "- |AB| = |A| x |B|",
                "- |A^T| = |A|",
                "- A x adj(A) = |A| x I",
                "- (A^-1)^T = (A^T)^-1",
            ],
            "confusion": [
                "x (AB)^T = A^T B^T. x (AB)^T = B^T A^T (order reverses!).",
                "x Every matrix has an inverse. x Only square, non-singular matrices.",
                "x AB = BA always. x Matrix multiplication is NOT commutative.",
            ],
            "practice": [
                "Find the transpose and determinant of A = [[2,3],[1,4]].",
                "Find the inverse of A = [[1,2],[3,5]].",
                "Solve using Cramer's rule: 2x + 3y = 8, x - y = 1.",
                "If |A| = 5, find |adj(A)| for a 3x3 matrix.",
            ],
            "formulas": [
                "A^-1 = (1/|A|) adj(A)",
                "Dx = det(replace col1 with constants), Dy = det(replace col2 with constants)",
            ],
        },
    },
    "calculus": {
        "Derivatives: derivative of a function, derivatives of algebraic and trigonometric functions": {
            "notes": [
                "### 1. Derivative Definition",
                "The derivative of f(x) at x is: f'(x) = lim(h->0) [f(x+h) - f(x)]/h",
                "Represents the instantaneous rate of change or slope of the tangent line.",
                "### 2. Basic Derivative Rules",
                "- Constant: d/dx(c) = 0",
                "- Power rule: d/dx(x^n) = nx^(n-1)",
                "- Constant multiple: d/dx[cf(x)] = cf'(x)",
                "- Sum/Difference: d/dx[f +/- g] = f' +/- g'",
                "### 3. Trigonometric Derivatives",
                "- d/dx(sin x) = cos x",
                "- d/dx(cos x) = -sin x",
                "- d/dx(tan x) = sec^2 x",
                "- d/dx(cot x) = -csc^2 x",
                "- d/dx(sec x) = sec x tan x",
                "- d/dx(csc x) = -csc x cot x",
                "### 4. Key Algebraic Derivatives",
                "- d/dx(x^n) = nx^(n-1)",
                "- d/dx(e^x) = e^x",
                "- d/dx(a^x) = a^x ln a",
                "- d/dx(ln x) = 1/x",
                "- d/dx(sqrt(x)) = 1/(2sqrt(x))",
                "### 5. Product and Quotient Rules",
                "- Product: (fg)' = f'g + fg'",
                "- Quotient: (f/g)' = (f'g - fg')/g^2",
                "### 6. Chain Rule",
                "d/dx[f(g(x))] = f'(g(x)) x g'(x)",
                "### 7. Entrance Exam Focus",
                "Find derivative using first principle; Differentiate trigonometric functions; Apply chain rule.",
            ],
            "confusion": [
                "x d/dx(sin x) = cos x means slope is always positive. x Slope varies with x.",
                "x d/dx(f.g) = f'.g. x Must use product rule: f'g + fg'.",
                "x Derivative = slope of secant. x Derivative = slope of TANGENT line.",
            ],
            "practice": [
                "Find dy/dx if y = 3x^4 - 2x^3 + 5x - 1.",
                "Differentiate y = sin^2 x using chain rule.",
                "Find dy/dx if y = x^2 x cos x.",
                "Find the derivative of y = e^(3x) x ln x.",
            ],
            "formulas": [
                "f'(x) = lim(h->0) [f(x+h) - f(x)]/h",
                "(fg)' = f'g + fg'",
                "d/dx[f(g(x))] = f'(g(x)) x g'(x)",
            ],
        },
        "The definite integral as an area under a curve": {
            "notes": [
                "### 1. Definite Integral Definition",
                "int_a^b f(x)dx = lim(n->inf) sum[i=1 to n] f(xi*) Dx",
                "Represents the net area between f(x) and the x-axis from x = a to x = b.",
                "### 2. Fundamental Theorem of Calculus",
                "If F is an antiderivative of f, then: int_a^b f(x)dx = F(b) - F(a)",
                "Connects differentiation and integration -- they are inverse operations.",
                "### 3. Area Under Curve",
                "- Area above x-axis: positive contribution",
                "- Area below x-axis: negative contribution",
                "- Total area = int_a^b |f(x)|dx",
                "### 4. Properties of Definite Integrals",
                "- int_a^a f(x)dx = 0",
                "- int_a^b f(x)dx = -int_b^a f(x)dx",
                "- int_a^b [f(x) +/- g(x)]dx = int_a^b f(x)dx +/- int_a^b g(x)dx",
                "### 5. Standard Integrals",
                "- int x^n dx = x^(n+1)/(n+1) + C (n != -1)",
                "- int 1/x dx = ln|x| + C",
                "- int e^x dx = e^x + C",
                "- int sin x dx = -cos x + C",
                "- int cos x dx = sin x + C",
                "### 6. Entrance Exam Focus",
                "Evaluate definite integrals; Find area between curves; Use properties to simplify.",
            ],
            "confusion": [
                "x Definite integral always positive. x Can be negative if curve is below x-axis.",
                "x int f(x)dx = F(x) + C (definite). x C cancels in definite integrals.",
                "x Area = int f(x)dx always. x Use |f(x)| for total geometric area.",
            ],
            "practice": [
                "Evaluate int_0^pi sin x dx.",
                "Find the area under y = x^2 from x = 0 to x = 3.",
                "Evaluate int_1^e (1/x) dx.",
                "Find the area bounded by y = x and y = x^2.",
            ],
            "formulas": [
                "int_a^b f(x)dx = F(b) - F(a)",
                "Area = int_a^b |f(x)|dx",
            ],
        },
    },
    "trigonometry": {
        "Trigonometric ratios and identities": {
            "notes": [
                "### 1. Basic Trigonometric Ratios",
                "In a right triangle with angle theta:",
                "- sin theta = opposite/hypotenuse",
                "- cos theta = adjacent/hypotenuse",
                "- tan theta = opposite/adjacent = sin theta/cos theta",
                "- cosec theta = 1/sin theta, sec theta = 1/cos theta, cot theta = 1/tan theta",
                "### 2. Key Values",
                "| theta | 0 | 30 | 45 | 60 | 90 |",
                "| sin theta | 0 | 1/2 | 1/sqrt(2) | sqrt(3)/2 | 1 |",
                "| cos theta | 1 | sqrt(3)/2 | 1/sqrt(2) | 1/2 | 0 |",
                "| tan theta | 0 | 1/sqrt(3) | 1 | sqrt(3) | undefined |",
                "### 3. Fundamental Identities",
                "- sin^2 theta + cos^2 theta = 1",
                "- 1 + tan^2 theta = sec^2 theta",
                "- 1 + cot^2 theta = cosec^2 theta",
                "### 4. Compound Angle Formulas",
                "- sin(A +/- B) = sin A cos B +/- cos A sin B",
                "- cos(A +/- B) = cos A cos B ∓ sin A sin B",
                "- tan(A +/- B) = (tan A +/- tan B)/(1 ∓ tan A tan B)",
                "### 5. Double Angle Formulas",
                "- sin 2A = 2 sin A cos A",
                "- cos 2A = cos^2 A - sin^2 A = 2cos^2 A - 1 = 1 - 2sin^2 A",
                "- tan 2A = 2tan A/(1 - tan^2 A)",
                "### 6. Entrance Exam Focus",
                "Prove identities; Solve trig equations; Use compound/double angle formulas.",
            ],
            "confusion": [
                "x sin(A+B) = sin A + sin B. x Must use compound angle formula.",
                "x tan 2A = 2 tan A. x tan 2A = 2tan A/(1-tan^2 A).",
            ],
            "practice": [
                "Prove: sin^2 theta + cos^2 theta = 1",
                "If sin theta = 3/5, find all other trig ratios.",
                "Prove: sin(A+B)sin(A-B) = sin^2 A - sin^2 B",
                "Solve: 2sin^2 x - sin x - 1 = 0 for 0 <= x <= 360 degrees",
            ],
            "formulas": [
                "sin^2 theta + cos^2 theta = 1",
                "sin(A +/- B) = sin A cos B +/- cos A sin B",
                "cos 2A = cos^2 A - sin^2 A",
            ],
        },
    },
}

def generate_slug(title):
    slug = title.lower().strip()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    return slug.rstrip('-')

def main():
    base = Path('public/data/syllabus-notes/mathematics')
    count = 0

    for unit_slug, units in MATH_CONTENT.items():
        unit_dir = base / unit_slug
        unit_dir.mkdir(parents=True, exist_ok=True)

        for topic_title, content in units.items():
            slug = generate_slug(topic_title)
            note = {
                "title": topic_title,
                "unitSlug": unit_slug,
                "topicSlug": slug,
                "topicTitle": topic_title,
                "relevance": 100,
                "notes": content["notes"],
                "confusion": content.get("confusion", []),
                "practice": content.get("practice", []),
                "formulas": content.get("formulas", []),
            }
            path = unit_dir / f"{count+1:02d}-{slug}.json"
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(note, f, indent=2, ensure_ascii=False)
            count += 1
            print(f"Created: {path}")

    print(f"\nTotal Math files generated: {count}")

if __name__ == "__main__":
    main()
