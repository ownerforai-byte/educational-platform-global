import sys
sys.path.insert(0, 'c:/Users/ASUS/Desktop/rn/scripts/math_docs')
import docx_styler

def build():
    doc = docx_styler.init_document()
    docx_styler.add_header_block(
        doc,
        unit_no=6,
        unit_name="Calculus",
        area_name="Content area 6 (Mat. 007)"
    )

    # ==========================================
    # 6.1 Limits and Continuity
    # ==========================================
    docx_styler.add_topic_heading(doc, "6.1", "Limits and Continuity")

    docx_styler.add_question(
        doc, 1,
        "Define the limit of a function using intuitive and formal (ε-δ) definitions, and state the condition for existence.",
        "• Intuitive Definition: lim x→a f(x) = L means that as x approaches arbitrarily close to a (from either side, without ever needing to equal a), f(x) gets arbitrarily close to L.\n"
        "• Formal (ε-δ) Definition: For every ε > 0, there exists a δ > 0 such that whenever 0 < |x - a| < δ, we have |f(x) - L| < ε.\n"
        "• Existence Condition: The two-sided limit exists if and only if both one-sided limits exist and are strictly equal:\n"
        "  lim x→a⁻ f(x) = lim x→a⁺ f(x) = L (Left-Hand Limit = Right-Hand Limit).\n"
        "  Crucial distinction: The actual function value f(a) is completely irrelevant to the limit—f(a) may equal L, may differ from L, or may not exist at all!",
        "Limit exists ⇔ LHL = RHL = L. The value f(a) is irrelevant to the existence of the limit."
    )

    docx_styler.add_question(
        doc, 2,
        "List all seven indeterminate forms and explain why they require calculus techniques.",
        "The seven classic indeterminate forms in analysis are:\n"
        "1. Quotient forms: 0 / 0  and  ∞ / ∞\n"
        "2. Product form: 0 × ∞\n"
        "3. Difference form: ∞ - ∞\n"
        "4. Power / Exponential forms: 1^∞,  0⁰,  and  ∞⁰.\n"
        "Why they are indeterminate: The limiting values cannot be determined simply by substituting the limits of the individual components because competing mathematical forces operate simultaneously (e.g., in 0/0, the numerator pulls towards 0 while the denominator pulls towards infinity; in 1^∞, base 1 pulls towards 1 while the infinite exponent magnifies any excess). They require factorization, rationalization, trigonometric identities, logarithms, or L'Hôpital's Rule.",
        "7 forms: 0/0, ∞/∞, 0×∞, ∞-∞, 1^∞, 0⁰, ∞⁰. Never say 0/0 = 1 or 1^∞ = 1!"
    )

    docx_styler.add_question(
        doc, 3,
        "State essential standard limit theorems frequently tested in NEB exams.",
        "1. Algebraic: lim x→a (xⁿ - aⁿ) / (x - a) = n aⁿ⁻¹ (for any real n).\n"
        "2. Trigonometric:\n"
        "   • lim x→0 (sin x / x) = 1 (where x is strictly in RADIANS!).\n"
        "   • lim x→0 (tan x / x) = 1.\n"
        "   • lim x→0 (1 - cos x) / x² = lim x→0 [2 sin²(x/2) / x²] = 1/2.\n"
        "3. Exponential & Logarithmic:\n"
        "   • lim x→0 (eˣ - 1) / x = 1\n"
        "   • lim x→0 (aˣ - 1) / x = ln a (a > 0)\n"
        "   • lim x→0 [ln(1 + x) / x] = 1\n"
        "   • lim x→∞ (1 + 1/x)ˣ = e  and  lim x→0 (1 + x)^(1/x) = e.",
        "Angle must be in radians! lim x→0 sin x / x = 1. lim x→0 (1 - cos x)/x² = 1/2."
    )

    docx_styler.add_question(
        doc, 4,
        "State L'Hôpital's Rule and its strict conditions of applicability.",
        "L'Hôpital's Rule: If lim x→a f(x)/g(x) produces an indeterminate form 0/0 or ±∞/±∞, and f and g are differentiable near a (with g'(x) ≠ 0 near a), then:\n"
        "lim x→a [ f(x) / g(x) ] = lim x→a [ f'(x) / g'(x) ],\n"
        "provided the right-hand limit exists (or is ±∞).\n"
        "Critical Warnings:\n"
        "1. Do NOT use the quotient rule! Differentiate the numerator and denominator independently.\n"
        "2. STOP applying the rule as soon as the expression ceases to be 0/0 or ∞/∞; continuing to differentiate non-indeterminate forms yields completely wrong results!\n"
        "3. Other forms (0 × ∞, 1^∞, 0⁰, ∞ - ∞) must first be algebraically converted to 0/0 or ∞/∞ before applying the rule.",
        "Differentiate numerator and denominator separately. ONLY applicable to 0/0 or ∞/∞!"
    )

    docx_styler.add_question(
        doc, 5,
        "Define continuity of a function at a point and on an interval, and classify types of discontinuity.",
        "• Continuity at x = a: A function f(x) is continuous at x = a if and only if three conditions hold:\n"
        "  1. f(a) is defined (a lies in the domain of f).\n"
        "  2. lim x→a f(x) exists (LHL = RHL).\n"
        "  3. lim x→a f(x) = f(a) (the limit equals the actual function value).\n"
        "• Continuity on [a, b]: Continuous on open (a, b), right-continuous at a (lim x→a⁺ f(x) = f(a)), and left-continuous at b (lim x→b⁻ f(x) = f(b)).\n"
        "• Classification of Discontinuities:\n"
        "  1. Removable Discontinuity: lim x→a f(x) exists, but f(a) is either undefined or f(a) ≠ limit (a 'hole' in the graph; can be fixed by defining f(a) = L).\n"
        "  2. Jump Discontinuity (Essential): LHL and RHL both exist as finite numbers, but LHL ≠ RHL (a vertical gap or step; e.g., floor function ⌊x⌋, sgn(x)).\n"
        "  3. Infinite Discontinuity: One or both one-sided limits blow up to ±∞ (vertical asymptote; e.g., 1/x at x = 0).\n"
        "  4. Oscillating Discontinuity: Function oscillates infinitely fast near the point (e.g., sin(1/x) at x = 0).",
        "Continuous: f(a) exists, limit exists, and Limit = Value. Removable = hole; Jump = step; Infinite = asymptote."
    )

    # ==========================================
    # 6.2 Derivatives & Differentiation
    # ==========================================
    docx_styler.add_topic_heading(doc, "6.2", "Derivatives & Differentiation")

    docx_styler.add_question(
        doc, 6,
        "Define the derivative of a function from first principles and state its geometric and physical meanings.",
        "• First Principles (Definition): The derivative of y = f(x) at x is the limit of the difference quotient:\n"
        "  f'(x) = dy/dx = lim h→0 [ f(x + h) - f(x) ] / h.\n"
        "• Geometric Meaning: The slope of the tangent line (m = tan ψ) to the curve y = f(x) at the point (x, f(x)).\n"
        "• Physical Meaning: The instantaneous rate of change of the dependent variable with respect to the independent variable. If s = f(t) is position, f'(t) = ds/dt is instantaneous velocity; f''(t) = dv/dt is acceleration.",
        "f'(x) = lim h→0 [f(x+h) - f(x)] / h. Geometrically = tangent slope; Physically = instantaneous rate."
    )

    docx_styler.add_question(
        doc, 7,
        "Prove that differentiability implies continuity, and explain why the converse is not true with the counterexample f(x) = |x|.",
        "• Proof (Differentiable ⇒ Continuous):\n"
        "  Suppose f is differentiable at x = a, so f'(a) = lim x→a [f(x) - f(a)] / (x - a) exists.\n"
        "  Consider f(x) - f(a) = [ (f(x) - f(a)) / (x - a) ] · (x - a) for x ≠ a.\n"
        "  Taking limits as x → a:\n"
        "  lim x→a [f(x) - f(a)] = lim x→a [ (f(x) - f(a))/(x - a) ] · lim x→a (x - a) = f'(a) · 0 = 0.\n"
        "  Therefore: lim x→a f(x) = f(a), which proves f is continuous at a.\n"
        "• Converse is FALSE (Continuous does NOT imply Differentiable):\n"
        "  Counterexample: f(x) = |x| at x = 0.\n"
        "  f(0) = 0 and lim x→0 |x| = 0, so f(x) is continuous everywhere.\n"
        "  Left derivative: L f'(0) = lim h→0⁻ [|0 + h| - 0] / h = lim h→0⁻ (-h)/h = -1.\n"
        "  Right derivative: R f'(0) = lim h→0⁺ [|0 + h| - 0] / h = lim h→0⁺ (h)/h = +1.\n"
        "  Since L f'(0) ≠ R f'(0), the derivative DOES NOT EXIST at x = 0! Geometrically, the curve has a sharp 'corner' (cusp) at the origin with no unique tangent.",
        "Differentiable ⇒ Continuous (smooth). Continuous ⇏ Differentiable (sharp corners/cusps like |x|)."
    )

    docx_styler.add_question(
        doc, 8,
        "State the core differentiation rules: Product, Quotient, Chain, and Inverse Trigonometric rules.",
        "1. Product Rule: d/dx (u v) = u (dv/dx) + v (du/dx).\n"
        "2. Quotient Rule: d/dx (u / v) = [ v (du/dx) - u (dv/dx) ] / v².\n"
        "3. Chain Rule: If y = f(u) and u = g(x), then dy/dx = (dy/du) · (du/dx).\n"
        "4. Inverse Trigonometric Derivatives:\n"
        "   • d/dx (sin⁻¹x) = 1 / √(1 - x²)  for |x| < 1\n"
        "   • d/dx (cos⁻¹x) = -1 / √(1 - x²)  for |x| < 1\n"
        "   • d/dx (tan⁻¹x) = 1 / (1 + x²)  for all x ∈ ℝ\n"
        "   • d/dx (cot⁻¹x) = -1 / (1 + x²)\n"
        "   • d/dx (sec⁻¹x) = 1 / [ |x| √(x² - 1) ]  for |x| > 1.",
        "Quotient: (v u' - u v') / v². Chain: differentiate outer keeping inner, multiply by inner's derivative."
    )

    docx_styler.add_question(
        doc, 9,
        "Explain Logarithmic Differentiation and Parametric Differentiation with procedures.",
        "• Logarithmic Differentiation: Used when the function has the form y = [f(x)]^(g(x)) (variable base raised to a variable exponent) or is a complicated product/quotient of many factors.\n"
        "  Procedure: Take natural log of both sides: ln y = g(x) · ln[f(x)]. Differentiate implicitly with respect to x: (1/y)(dy/dx) = d/dx [g(x) ln f(x)], then multiply across by y.\n"
        "• Parametric Differentiation: When x and y are given in terms of parameter t: x = f(t), y = g(t).\n"
        "  - First derivative: dy/dx = (dy/dt) / (dx/dt) = g'(t) / f'(t).\n"
        "  - Second derivative (Trap Warning!): d²y/dx² = d/dx [dy/dx] = { d/dt [dy/dx] } / (dx/dt)!\n"
        "    Never simply divide d²y/dt² by d²x/dt²!",
        "Log diff: ln y first. Parametric 2nd derivative: divide d/dt(dy/dx) by dx/dt! Common exam trap."
    )

    # ==========================================
    # 6.3 Applications of Derivatives
    # ==========================================
    docx_styler.add_topic_heading(doc, "6.3", "Applications of Derivatives")

    docx_styler.add_question(
        doc, 10,
        "State the equations of tangent and normal to a curve y = f(x) at point (x₁, y₁).",
        "Let m = f'(x₁) = dy/dx evaluated at (x₁, y₁) be the slope of the tangent.\n"
        "• Tangent Line Equation: y - y₁ = m (x - x₁).\n"
        "• Normal Line Equation (line perpendicular to tangent at point of contact):\n"
        "  Since m_normal = -1/m (provided m ≠ 0):\n"
        "  y - y₁ = (-1/m) (x - x₁) ⇔ (x - x₁) + m(y - y₁) = 0.\n"
        "Special cases:\n"
        "• If m = 0: Tangent is horizontal (y = y₁); Normal is vertical (x = x₁).\n"
        "• If m = ∞: Tangent is vertical (x = x₁); Normal is horizontal (y = y₁).",
        "Tangent: y - y₁ = m(x - x₁). Normal: y - y₁ = (-1/m)(x - x₁)."
    )

    docx_styler.add_question(
        doc, 11,
        "Define increasing/decreasing functions and state the First and Second Derivative Tests for local extrema.",
        "• Monotonicity on interval (a, b):\n"
        "  - Strictly Increasing if f'(x) > 0 for all x ∈ (a, b).\n"
        "  - Strictly Decreasing if f'(x) < 0 for all x ∈ (a, b).\n"
        "• Critical Points: Values of c in the domain where f'(c) = 0 or f'(c) is undefined.\n"
        "• First Derivative Test: Test the sign of f'(x) as x passes through critical point c:\n"
        "  - If f' changes from + to - : Local Maximum at c.\n"
        "  - If f' changes from - to + : Local Minimum at c.\n"
        "  - If f' does not change sign (+ to + or - to -) : Point of Inflexion (no extremum).\n"
        "• Second Derivative Test (when f''(c) exists):\n"
        "  If f'(c) = 0:\n"
        "  - If f''(c) < 0: Graph is concave down ∩ ⇒ Local Maximum at c.\n"
        "  - If f''(c) > 0: Graph is concave up ∪ ⇒ Local Minimum at c.\n"
        "  - If f''(c) = 0: Test is INCONCLUSIVE (must revert to First Derivative Test!).",
        "f'(x) > 0 increasing, < 0 decreasing. f'=0 & f''<0 ⇒ Max. f'=0 & f''>0 ⇒ Min."
    )

    docx_styler.add_question(
        doc, 12,
        "State Rolle's Theorem and Lagrange's Mean Value Theorem (LMVT) with geometric interpretations.",
        "• Rolle's Theorem: If a function f(x) satisfies three conditions:\n"
        "  1. Continuous on closed interval [a, b],\n"
        "  2. Differentiable on open interval (a, b),\n"
        "  3. f(a) = f(b),\n"
        "  Then there exists at least one point c ∈ (a, b) such that f'(c) = 0 (horizontal tangent exists!).\n"
        "• Lagrange's Mean Value Theorem (LMVT): If f(x) satisfies:\n"
        "  1. Continuous on closed interval [a, b],\n"
        "  2. Differentiable on open interval (a, b),\n"
        "  Then there exists at least one point c ∈ (a, b) such that:\n"
        "  f'(c) = [ f(b) - f(a) ] / (b - a).\n"
        "  Geometric Meaning: There exists at least one point where the tangent to the curve is strictly PARALLEL to the secant line joining endpoints (a, f(a)) and (b, f(b)). (Notice: Rolle's theorem is the special case of LMVT when f(a) = f(b)).",
        "Rolle's: f(a)=f(b) ⇒ tangent is horizontal (f'=0). LMVT: tangent slope = secant slope."
    )

    # ==========================================
    # 6.4 Antiderivatives & Integrals
    # ==========================================
    docx_styler.add_topic_heading(doc, "6.4", "Antiderivatives (Integration)")

    docx_styler.add_question(
        doc, 13,
        "Define the indefinite integral, the role of constant of integration C, and standard algebraic formulas.",
        "An antiderivative of f(x) is a function F(x) such that F'(x) = f(x). The indefinite integral represents the entire family of antiderivatives:\n"
        "∫ f(x) dx = F(x) + C,\n"
        "where C is the arbitrary constant of integration.\n"
        "Geometric Meaning: The curves y = F(x) + C form a family of parallel vertical translations having identical tangent slopes at each x.\n"
        "Fundamental Formulas:\n"
        "• Power rule: ∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C (valid for all n ≠ -1).\n"
        "• Reciprocal rule: ∫ (1/x) dx = ln |x| + C.\n"
        "• Exponential: ∫ eˣ dx = eˣ + C  and  ∫ aˣ dx = aˣ / ln a + C.\n"
        "• Trigonometric: ∫ sin x dx = -cos x + C ; ∫ cos x dx = sin x + C ; ∫ sec²x dx = tan x + C.",
        "∫ xⁿ dx = xⁿ⁺¹/(n+1) for n ≠ -1. ∫ (1/x) dx = ln|x| + C. Don't forget +C in indefinite integrals!"
    )

    docx_styler.add_question(
        doc, 14,
        "Explain Integration by Parts, the LIATE rule, and the special form ∫ eˣ [f(x) + f'(x)] dx.",
        "• Integration by Parts: Derived from the product rule of differentiation:\n"
        "  ∫ u dv = u v - ∫ v du  ⇔  ∫ u(x) v'(x) dx = u(x) v(x) - ∫ u'(x) v(x) dx.\n"
        "• Choice of u (LIATE Rule of Priority):\n"
        "  L: Logarithmic functions (ln x)\n"
        "  I: Inverse trigonometric functions (sin⁻¹x, tan⁻¹x)\n"
        "  A: Algebraic functions (x², x + 1)\n"
        "  T: Trigonometric functions (sin x, cos x)\n"
        "  E: Exponential functions (eˣ, 2ˣ).\n"
        "  (Choose u as the function appearing higher up in LIATE; let dv be the remainder).\n"
        "• Master Shortcut Integral:\n"
        "  ∫ eˣ [ f(x) + f'(x) ] dx = eˣ f(x) + C.\n"
        "  Example: ∫ eˣ (sin x + cos x) dx = eˣ sin x + C; ∫ eˣ (1/x - 1/x²) dx = eˣ (1/x) + C.",
        "∫ u dv = uv - ∫ v du. LIATE decides u. Master shortcut: ∫ eˣ[f(x) + f'(x)] dx = eˣ f(x) + C."
    )

    docx_styler.add_question(
        doc, 15,
        "State the Fundamental Theorem of Calculus and essential properties of definite integrals.",
        "• Fundamental Theorem of Calculus: If f(x) is continuous on [a, b] and F'(x) = f(x):\n"
        "  ∫ₐᵇ f(x) dx = [ F(x) ]ₐᵇ = F(b) - F(a).\n"
        "• Essential Definite Integral Properties:\n"
        "  1. Reversal: ∫ₐᵇ f(x) dx = - ∫ᵦᵃ f(x) dx.\n"
        "  2. Additivity of Interval: ∫ₐᵇ f(x) dx = ∫ₐᶜ f(x) dx + ∫_c^b f(x) dx.\n"
        "  3. King's Property: ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx  (and generally ∫ₐᵇ f(x) dx = ∫ₐᵇ f(a + b - x) dx).\n"
        "  4. Odd / Even Symmetry:\n"
        "     ∫₋ₐᵃ f(x) dx = 0  if f(x) is an ODD function [f(-x) = -f(x)].\n"
        "     ∫₋ₐᵃ f(x) dx = 2 ∫₀ᵃ f(x) dx  if f(x) is an EVEN function [f(-x) = f(x)].",
        "King's property: ∫₀ᵃ f(x)dx = ∫₀ᵃ f(a-x)dx solves hardest exams in seconds! Odd on [-a,a] = 0."
    )

    docx_styler.add_question(
        doc, 16,
        "Explain the calculation of area bounded between curves using definite integrals.",
        "• Area between curve y = f(x) and x-axis from x = a to x = b:\n"
        "  Area = ∫ₐᵇ |f(x)| dx.\n"
        "  (Caution: If the curve crosses below the x-axis, the integral ∫ f dx gives signed net area, cancelling positive and negative lobes. Physical area must split at x-intercepts and take absolute values!).\n"
        "• Area between two curves y = f(x) (top) and y = g(x) (bottom) from x = a to x = b:\n"
        "  Area = ∫ₐᵇ [ f(x) - g(x) ] dx  = ∫ₐᵇ (y_upper - y_lower) dx.",
        "Area between curves = ∫ (y_top - y_bottom) dx. Always determine intersection points first."
    )

    docx_styler.add_compare_section_header(doc, "6.1 — 6.4", "Calculus Analytical Matrices")
    docx_styler.add_compare_table(
        doc, "Continuity vs Differentiability: Comprehensive Comparison",
        ["Attribute", "Continuity at x = a", "Differentiability at x = a"],
        [
            ["Condition", "lim x→a f(x) = f(a)", "lim h→0 [f(a+h) - f(a)]/h exists finitely"],
            ["Geometric Meaning", "Graph has no breaks, jumps, or holes", "Graph is smooth with a unique non-vertical tangent"],
            ["Implication Direction", "Continuous does NOT imply differentiable", "Differentiable STRICTLY IMPLIES continuous"],
            ["Sharp Corners (Cusps)", "PERMITTED (e.g., |x| at 0 is continuous)", "FORBIDDEN (derivative does not exist at corners)"],
            ["Vertical Tangents", "PERMITTED (e.g., x^(1/3) at 0 is continuous)", "NOT differentiable (slope is ±∞)"]
        ]
    )
    docx_styler.add_compare_table(
        doc, "Indefinite Integral vs Definite Integral",
        ["Feature", "Indefinite Integral ∫ f(x) dx", "Definite Integral ∫ₐᵇ f(x) dx"],
        [
            ["Result Nature", "A FAMILY of functions (expression in x + C)", "A unique real SCALAR NUMBER"],
            ["Constant C", "Mandatory (+ C)", "Eliminates: [F(b) + C] - [F(a) + C] = F(b) - F(a)"],
            ["Geometric Meaning", "General antiderivative curve family", "Signed net area between curve and x-axis"],
            ["Limits of Integration", "No limits", "Lower limit a and upper limit b specified"]
        ]
    )

    # ==========================================
    # Professor's Theory & Viva Bank
    # ==========================================
    docx_styler.add_viva_header(doc)

    docx_styler.add_viva_category(doc, "Derive", "deriving formulas & results")
    docx_styler.add_viva_question(
        doc, "Derive", 1,
        "Derive the derivative of f(x) = sin x from first principles.",
        "By definition: f'(x) = lim h→0 [sin(x + h) - sin x] / h.\n"
        "Use trigonometric transformation sin C - sin D = 2 cos[(C + D)/2] sin[(C - D)/2]:\n"
        "sin(x + h) - sin x = 2 cos[ (2x + h)/2 ] sin(h/2) = 2 cos(x + h/2) sin(h/2).\n"
        "Substitute into difference quotient:\n"
        "f'(x) = lim h→0 [ 2 cos(x + h/2) sin(h/2) ] / h = lim h→0 cos(x + h/2) · lim h→0 [ sin(h/2) / (h/2) ].\n"
        "As h → 0, cos(x + h/2) → cos x.\n"
        "Using standard limit lim θ→0 (sin θ / θ) = 1 (where θ = h/2):\n"
        "f'(x) = (cos x) · 1 = cos x. Q.E.D."
    )

    docx_styler.add_viva_question(
        doc, "Derive", 2,
        "Derive the Integration by Parts formula ∫ u dv = uv - ∫ v du from the Product Rule.",
        "Let u and v be differentiable functions of x.\n"
        "By the product rule of differentiation: d/dx (u v) = u (dv/dx) + v (du/dx).\n"
        "In differential notation: d(uv) = u dv + v du.\n"
        "Rearranging: u dv = d(uv) - v du.\n"
        "Integrating both sides with respect to x:\n"
        "∫ u dv = ∫ d(uv) - ∫ v du.\n"
        "Since integration is the inverse of differentiation, ∫ d(uv) = uv.\n"
        "Therefore: ∫ u dv = uv - ∫ v du. Q.E.D."
    )

    docx_styler.add_viva_category(doc, "Explain", "working, principles & viva probing")
    docx_styler.add_viva_question(
        doc, "Explain", 3,
        "Explain why lim x→0 sin(1/x) does NOT exist, while lim x→0 x sin(1/x) = 0.",
        "1. For lim x→0 sin(1/x):\n"
        "   As x → 0, 1/x → ±∞. The sine function oscillates endlessly between -1 and +1 with infinite frequency.\n"
        "   Approaching along sequence xₙ = 1/(nπ) gives values 0; approaching along sequence xₙ = 1/(2nπ + π/2) gives values 1.\n"
        "   Because the function oscillates between different values and does not settle on any single value, the limit DOES NOT EXIST.\n"
        "2. For lim x→0 x sin(1/x):\n"
        "   Since -1 ≤ sin(1/x) ≤ 1 for all x ≠ 0, multiplying by |x| gives:\n"
        "   -|x| ≤ x sin(1/x) ≤ |x|.\n"
        "   As x → 0, lim (-|x|) = 0 and lim (|x|) = 0.\n"
        "   By the Squeeze (Sandwich) Theorem, the middle term is trapped: lim x→0 x sin(1/x) = 0."
    )

    docx_styler.add_viva_question(
        doc, "Viva", 4,
        "Why does a function fail to be differentiable at a point where its graph has a vertical tangent?",
        "By definition, the derivative f'(a) is the numerical slope of the tangent line: m = tan ψ.\n"
        "A vertical tangent line is parallel to the y-axis, making an inclination angle ψ = 90° with the positive x-axis.\n"
        "The slope of a vertical line is m = tan(90°) = undefined (or ±∞).\n"
        "Because differentiability strictly requires the limit of the difference quotient to converge to a FINITE real number, a vertical tangent (such as in f(x) = x^(1/3) at x = 0) means the derivative does not exist finitely."
    )

    docx_styler.add_viva_category(doc, "Numerical", "data & problem-based")
    docx_styler.add_viva_question(
        doc, "Numerical", 5,
        "Find the local maximum and minimum values of f(x) = 2x³ - 9x² + 12x + 5.",
        "1. Differentiate: f'(x) = 6x² - 18x + 12 = 6(x² - 3x + 2) = 6(x - 1)(x - 2).\n"
        "2. Critical points (f'(x) = 0): x = 1 and x = 2.\n"
        "3. Second derivative: f''(x) = 12x - 18.\n"
        "• At x = 1: f''(1) = 12(1) - 18 = -6 < 0 ⇒ Concave down ⇒ Local MAXIMUM at x = 1.\n"
        "  Local maximum value = f(1) = 2(1) - 9(1) + 12(1) + 5 = 10.\n"
        "• At x = 2: f''(2) = 12(2) - 18 = +6 > 0 ⇒ Concave up ⇒ Local MINIMUM at x = 2.\n"
        "  Local minimum value = f(2) = 2(8) - 9(4) + 12(2) + 5 = 16 - 36 + 24 + 5 = 9."
    )

    docx_styler.add_viva_question(
        doc, "Numerical", 6,
        "Find the area enclosed between the parabola y = x² and the line y = x.",
        "1. Intersection points: Set x² = x ⇒ x² - x = 0 ⇒ x(x - 1) = 0 ⇒ x = 0 and x = 1.\n"
        "2. On interval [0, 1], test x = 0.5: y_line = 0.5 > y_parabola = 0.25. Line is upper curve.\n"
        "3. Area = ∫₀¹ (y_upper - y_lower) dx = ∫₀¹ (x - x²) dx\n"
        "= [ x²/2 - x³/3 ]₀¹\n"
        "= (1/2 - 1/3) - (0 - 0) = 1/6 square units."
    )

    # ==========================================
    # Quick-Math Memos
    # ==========================================
    memos = [
        "Limits: Exists ⇔ LHL = RHL. lim x→0 sin x / x = 1 (radians!). lim x→0 (1 - cos x)/x² = 1/2.",
        "L'Hôpital: Apply only to 0/0 or ∞/∞. Differentiate numerator and denominator separately.",
        "Continuity: Limit exists, f(a) exists, and Limit = f(a).",
        "Differentiability: f'(x) = lim h→0 [f(x+h) - f(x)]/h. Differentiable ⇒ Continuous; converse false (|x|).",
        "Inverse Trig derivatives: d/dx(sin⁻¹x) = 1/√(1-x²); d/dx(tan⁻¹x) = 1/(1+x²).",
        "Logarithmic diff: Used for y = f(x)^g(x); take ln first.",
        "Parametric: dy/dx = (dy/dt)/(dx/dt). Second derivative: d/dt(dy/dx) / (dx/dt).",
        "Tangent: y - y₁ = m(x - x₁); Normal: y - y₁ = (-1/m)(x - x₁).",
        "Extrema: f'(c) = 0. f''(c) < 0 ⇒ Max; f''(c) > 0 ⇒ Min.",
        "Rolle's: f(a)=f(b) ⇒ f'(c) = 0. LMVT: f'(c) = [f(b)-f(a)] / (b-a).",
        "Parts: ∫ u dv = uv - ∫ v du (LIATE priority). Shortcut: ∫ eˣ[f(x) + f'(x)] dx = eˣ f(x) + C.",
        "King's Property: ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx. Area between curves = ∫ (y_top - y_bottom) dx."
    ]
    docx_styler.add_quick_memos_section(doc, memos)

    target_path = "C:/Users/ASUS/Math_XI_Unit_Docs/Math_XI_Unit_06_calculus.docx"
    doc.save(target_path)
    print(f"Successfully generated {target_path}")

if __name__ == '__main__':
    build()
