import sys
sys.path.insert(0, 'c:/Users/ASUS/Desktop/rn/scripts/math_docs')
import docx_styler

def build():
    doc = docx_styler.init_document()
    docx_styler.add_header_block(
        doc,
        unit_no=7,
        unit_name="Computational Methods & Mechanics",
        area_name="Content area 7 (Mat. 007)"
    )

    # ==========================================
    # 7.1 Numerical Computation (Roots of Non-linear Equations)
    # ==========================================
    docx_styler.add_topic_heading(doc, "7.1", "Numerical Computation (Roots of Equations)")

    docx_styler.add_question(
        doc, 1,
        "Explain the Intermediate Value Property for root location and the concept of bracketing an interval [a, b].",
        "• Intermediate Value Property (Bolzano's Theorem): If a real-valued function f(x) is continuous on a closed interval [a, b] and the function values at the endpoints have opposite signs (i.e., f(a) · f(b) < 0), then there exists at least one real root α ∈ (a, b) such that f(α) = 0.\n"
        "• Bracketing: The initial phase in numerical computation where an interval [a, b] containing a root is identified by evaluating signs of f(x) at incremental points.",
        "Continuous f(x) with f(a)·f(b) < 0 guarantees at least one real root in (a, b)."
    )

    docx_styler.add_question(
        doc, 2,
        "Explain the Bisection Method, its convergence condition, and the theoretical error bound after n iterations.",
        "• Algorithm: Start with [a, b] where f(a)·f(b) < 0. Compute midpoint c = (a + b)/2.\n"
        "  - If f(c) = 0, c is the exact root.\n"
        "  - If f(a)·f(c) < 0, the root lies in [a, c]; set b = c.\n"
        "  - If f(c)·f(b) < 0, the root lies in [c, b]; set a = c.\n"
        "  Repeat until interval width |b - a| < tolerance ε.\n"
        "• Theoretical Error Bound: Each step halves the interval width: |bₙ - aₙ| = (b₀ - a₀)/2ⁿ.\n"
        "  The maximum error at step n is:\n"
        "  |xₙ - α| ≤ (b - a) / 2ⁿ.\n"
        "  To achieve accuracy ε, the minimum iterations needed is n ≥ log₂[(b - a)/ε].\n"
        "• Rate of Convergence: Linear (rate 1), slow but 100% unconditionally guaranteed to converge.",
        "Halves interval each step: Error ≤ (b - a)/2ⁿ. Guaranteed convergence, but slow (linear)."
    )

    docx_styler.add_question(
        doc, 3,
        "Explain the Newton-Raphson Method, its iterative formula, and its rate of convergence.",
        "• Geometric Idea: Approximate the curve y = f(x) near guess xₙ by its tangent line at (xₙ, f(xₙ)). The x-intercept of this tangent line serves as the next approximation xₙ₊₁.\n"
        "• Iterative Formula: Tangent equation is y - f(xₙ) = f'(xₙ)(x - xₙ). Setting y = 0 yields:\n"
        "  xₙ₊₁ = xₙ - [ f(xₙ) / f'(xₙ) ].\n"
        "• Rate of Convergence: Quadratic (order p = 2) near a simple root (f'(α) ≠ 0).\n"
        "  This means the error at step (n + 1) is proportional to the SQUARE of the error at step n: |εₙ₊₁| ≈ k |εₙ|².\n"
        "  The number of correct decimal places approximately DOUBLES with every single iteration!",
        "xₙ₊₁ = xₙ - f(xₙ)/f'(xₙ). Quadratic convergence (order 2): precision doubles each step."
    )

    docx_styler.add_question(
        doc, 4,
        "State the failure conditions and limitations of the Newton-Raphson Method.",
        "The Newton-Raphson iteration may fail or diverge under the following conditions:\n"
        "1. Horizontal Tangent (f'(xₙ) = 0): Division by zero occurs; iteration crashes or jumps to infinity.\n"
        "2. Inflection Points: If f''(x) = 0 near the root, tangent lines can cause the iterates to oscillate wildly.\n"
        "3. Cycle / Infinite Loop: Iterates can alternate indefinitely between two points without ever reaching the root.\n"
        "4. Bad Initial Guess: If x₀ is far from the intended root, the method may diverge or jump to an entirely different, unwanted root.\n"
        "5. Multiple Roots: If root α has multiplicity m > 1 (so f(α) = f'(α) = 0), convergence drops from quadratic to slow linear.",
        "Fails when f'(xₙ) = 0, oscillates near inflection points, or diverges with poor initial guess."
    )

    docx_styler.add_compare_section_header(doc, "7.1", "Numerical Methods for Roots")
    docx_styler.add_compare_table(
        doc, "Comparison of Root-Finding Algorithms",
        ["Attribute", "Bisection Method", "Newton-Raphson Method", "Secant Method"],
        [
            ["Bracketing Required?", "YES, strictly requires f(a)f(b) < 0", "NO, open method (needs 1 guess x₀)", "NO, open method (needs 2 guesses)"],
            ["Derivative f'(x) Needed?", "NO (evaluates f only)", "YES, must evaluate f'(x) at each step", "NO, approximates f' by secant slope"],
            ["Order of Convergence", "Linear (Order = 1)", "Quadratic (Order = 2)", "Superlinear (Order ≈ 1.618)"],
            ["Speed", "Slowest (halves error each step)", "Extremely Fast near simple root", "Faster than Bisection, no derivatives"],
            ["Convergence Guarantee", "100% Guaranteed if f continuous", "Not guaranteed (can diverge or cycle)", "Not guaranteed (can diverge)"]
        ]
    )

    # ==========================================
    # 7.2 Numerical Integration
    # ==========================================
    docx_styler.add_topic_heading(doc, "7.2", "Numerical Integration")

    docx_styler.add_question(
        doc, 5,
        "Explain the principle of numerical quadrature and state the Trapezoidal Rule with its error order.",
        "• Numerical Quadrature: Approximating the definite integral I = ∫ₐᵇ f(x) dx when an analytic antiderivative cannot be expressed in elementary terms (e.g., e^(-x²), sin(x)/x) or when data is given as discrete experimental points.\n"
        "• Trapezoidal Rule: Divides [a, b] into n equal subintervals of width h = (b - a)/n. Approximates the curve in each strip by a straight line (chord), forming trapezoids:\n"
        "  ∫ₐᵇ f(x) dx ≈ (h/2) [ y₀ + yₙ + 2 (y₁ + y₂ + ... + yₙ₋₁) ].\n"
        "• Geometric Basis: Sum of areas of n trapezoids.\n"
        "• Truncation Error: E = - [ (b - a) h² / 12 ] f''(ξ) = O(h²).\n"
        "  The error is of order 2. The rule is EXACT for polynomials of degree ≤ 1 (straight lines, where f'' = 0).",
        "Trapezoidal: (h/2) [First + Last + 2(Sum of Remaining)]. Error is O(h²). Any n allowed."
    )

    docx_styler.add_question(
        doc, 6,
        "State Simpson's 1/3 Rule, its restriction on the number of subintervals, and explain why it is exact for cubic polynomials.",
        "• Simpson's 1/3 Rule: Fits a second-degree polynomial (parabola) through consecutive groups of THREE points (two strips):\n"
        "  ∫ₐᵇ f(x) dx ≈ (h/3) [ y₀ + yₙ + 4 (y₁ + y₃ + y₅ + ...) + 2 (y₂ + y₄ + y₆ + ...) ].\n"
        "  Mnemonic: (h/3) [ Ends + 4(Odd ordinates) + 2(Even ordinates) ].\n"
        "• Mandatory Restriction: The number of subintervals n MUST BE EVEN (meaning an ODD number of points/ordinates: n + 1).\n"
        "• Truncation Error: E = - [ (b - a) h⁴ / 180 ] f⁴(ξ) = O(h⁴).\n"
        "• Cubic Exactness Phenomenon: Although derived by fitting parabolas (degree 2), the symmetric placement of the midpoint causes the cubic error term in the Taylor expansion to cancel out completely! Consequently, Simpson's 1/3 rule is EXACT for all polynomials up to degree 3 (cubic), even though it uses quadratic arcs!",
        "Simpson's 1/3: (h/3)[Ends + 4(Odd) + 2(Even)]. Requires n EVEN! Exact up to DEGREE 3 (cubics)!"
    )

    docx_styler.add_compare_section_header(doc, "7.2", "Numerical Integration Matrices")
    docx_styler.add_compare_table(
        doc, "Comparison of Numerical Integration Rules",
        ["Attribute", "Trapezoidal Rule", "Simpson's 1/3 Rule", "Simpson's 3/8 Rule"],
        [
            ["Curve Fitting", "Linear (straight line chord)", "Quadratic (parabola through 3 points)", "Cubic polynomial through 4 points"],
            ["Subintervals (n) Restriction", "Any integer n ≥ 1", "n MUST BE EVEN (n = 2, 4, 6, ...)", "n MUST BE A MULTIPLE OF 3 (n = 3, 6, 9, ...)"],
            ["Formula", "(h/2)[y₀ + yₙ + 2∑y_rest]", "(h/3)[y₀ + yₙ + 4∑y_odd + 2∑y_even]", "(3h/8)[y₀ + yₙ + 3(y₁+y₂+y₄+...) + 2(y₃+y₆+...)]"],
            ["Truncation Error", "O(h²)", "O(h⁴)", "O(h⁴)"],
            ["Degree Exactness", "Exact up to degree 1", "Exact up to degree 3 (cubics!)", "Exact up to degree 3"]
        ]
    )

    # ==========================================
    # 7.3 Statics (Mechanics Option)
    # ==========================================
    docx_styler.add_topic_heading(doc, "7.3", "Statics (Mechanics Option)")

    docx_styler.add_question(
        doc, 7,
        "State the Parallelogram Law of Forces and write the formulas for the magnitude and direction of the resultant.",
        "• Parallelogram Law: If two forces P and Q acting at a point are represented in magnitude and direction by two adjacent sides of a parallelogram drawn from that point, their resultant R is represented in magnitude and direction by the diagonal passing through that point.\n"
        "• Resultant Magnitude: R = √[ P² + Q² + 2 P Q cos θ ], where θ is the angle between P and Q.\n"
        "• Direction (angle α made by resultant R with force P):\n"
        "  tan α = (Q sin θ) / (P + Q cos θ).\n"
        "Special Cases:\n"
        "• θ = 0° (same direction): R_max = P + Q (α = 0°).\n"
        "• θ = 90° (perpendicular): R = √(P² + Q²), tan α = Q/P.\n"
        "• θ = 180° (opposite direction): R_min = |P - Q|.",
        "R = √(P² + Q² + 2PQ cos θ). tan α = (Q sin θ) / (P + Q cos θ). Max = P+Q, Min = |P-Q|."
    )

    docx_styler.add_question(
        doc, 8,
        "State and explain Lami's Theorem with its equilibrium conditions.",
        "• Lami's Theorem: If three coplanar forces acting at a point are in static equilibrium, each force is directly proportional to the sine of the angle between the other two forces:\n"
        "  P / sin α = Q / sin β = R / sin γ,\n"
        "  where α is the angle between Q and R, β is the angle between P and R, and γ is the angle between P and Q.\n"
        "• Strict Prerequisites for Lami's Theorem:\n"
        "  1. Exactly THREE forces.\n"
        "  2. Forces must be COPLANAR and CONCURRENT (acting at a single point).\n"
        "  3. The system must be in complete STATIC EQUILIBRIUM.",
        "P / sin α = Q / sin β = R / sin γ. Applies strictly to 3 concurrent coplanar forces in equilibrium."
    )

    docx_styler.add_question(
        doc, 9,
        "State the conditions of equilibrium for concurrent forces and non-concurrent coplanar forces.",
        "• Concurrent Forces (lines of action meet at a single point):\n"
        "  Resultant force must be zero: ∑ F = 0.\n"
        "  Resolving along rectangular axes:\n"
        "  1. ∑ F_x = 0 (Algebraic sum of horizontal components is zero).\n"
        "  2. ∑ F_y = 0 (Algebraic sum of vertical components is zero).\n"
        "• Non-Concurrent Coplanar Forces (acting on an extended rigid body):\n"
        "  Requires both translational and rotational equilibrium:\n"
        "  1. ∑ F_x = 0 (No horizontal translation)\n"
        "  2. ∑ F_y = 0 (No vertical translation)\n"
        "  3. ∑ M_O = 0 (Algebraic sum of moments of all forces about ANY point O in the plane is zero; no rotation!).",
        "Concurrent: ∑F_x = 0, ∑F_y = 0. Rigid body: ∑F_x = 0, ∑F_y = 0, AND ∑M = 0 (no rotation)."
    )

    docx_styler.add_question(
        doc, 10,
        "Explain friction, laws of friction, coefficient of friction, angle of friction, and angle of repose.",
        "• Friction: Tangential resisting force that opposes the relative sliding tendency between two contact surfaces.\n"
        "• Types: Static friction (f_s ≤ f_max, self-adjusting), Limiting friction (f_L, maximum static friction just before sliding begins), Kinetic/Dynamic friction (f_k, during relative motion; f_k < f_L).\n"
        "• Laws of Limiting Friction:\n"
        "  1. Limiting friction is directly proportional to Normal Reaction R: f_L ∝ R ⇒ f_L = μ R.\n"
        "  2. Direction of friction opposes the motion tendency.\n"
        "  3. Independent of the apparent contact surface area (for given normal load).\n"
        "  4. Depends solely on the nature and roughness of the contacting materials.\n"
        "• Coefficient of Friction (μ): Pure ratio μ = f_L / R.\n"
        "• Angle of Friction (λ): The angle between the resultant contact reaction S and the normal reaction R: tan λ = f_L / R = μ.\n"
        "• Angle of Repose (θ): The maximum inclination of a rough plane at which a body placed on it remains at rest without sliding down:\n"
        "  At limiting equilibrium: mg sin θ = f_L = μ mg cos θ ⇒ tan θ = μ.\n"
        "  Fundamental identity: Angle of Repose = Angle of Friction (θ = λ).",
        "f_L = μ R. tan λ = μ. Angle of Repose θ = Angle of Friction λ (tan θ = μ)."
    )

    docx_styler.add_compare_section_header(doc, "7.3", "Statics Matrices")
    docx_styler.add_compare_table(
        doc, "Static Friction vs Limiting Friction vs Kinetic Friction",
        ["Property", "Static Friction (f_s)", "Limiting Friction (f_L)", "Kinetic Friction (f_k)"],
        [
            ["State of Body", "At rest (stationary)", "At verge of impending motion", "In relative sliding motion"],
            ["Value", "Self-adjusting: 0 ≤ f_s < f_L", "Maximum possible static value: f_L = μ_s R", "Constant: f_k = μ_k R (where μ_k < μ_s)"],
            ["Dependence on Applied Force", "Exactly EQUALS applied tangential force", "Independent of applied force once threshold is reached", "Independent of applied force and speed"],
            ["Coefficient Involved", "None (variable)", "μ_s (coefficient of static friction)", "μ_k (coefficient of kinetic friction)"]
        ]
    )

    # ==========================================
    # 7.4 Dynamics (Mechanics Option)
    # ==========================================
    docx_styler.add_topic_heading(doc, "7.4", "Dynamics (Mechanics Option)")

    docx_styler.add_question(
        doc, 11,
        "State the equations of uniformly accelerated rectilinear motion and motion under gravity.",
        "• Uniform Linear Acceleration (a = constant):\n"
        "  1. v = u + at\n"
        "  2. s = ut + (1/2) a t²\n"
        "  3. v² = u² + 2as\n"
        "  4. Distance in n-th second: s_nth = u + (a/2)(2n - 1).\n"
        "• Vertical Motion Under Gravity (upward positive: a = -g; downward positive: a = +g):\n"
        "  For body projected vertically upward with speed u:\n"
        "  - Maximum height reached: H = u² / (2g)\n"
        "  - Time to reach highest point: t_up = u / g\n"
        "  - Total time of flight (returning to projection level): T = 2u / g\n"
        "  - Speed upon returning to launch point: v = u (symmetry of gravity).",
        "s_nth = u + (a/2)(2n - 1). Max height H = u²/(2g). Total flight time T = 2u/g."
    )

    docx_styler.add_question(
        doc, 12,
        "Analyze motion down a smooth inclined plane of angle θ.",
        "Consider a particle of mass m sliding down a frictionless plane inclined at angle θ to horizontal:\n"
        "• Resolving gravity mg: Normal to plane = mg cos θ (balanced by normal reaction R = mg cos θ). Parallel to plane down the incline = mg sin θ.\n"
        "• Effective acceleration down the incline: a = (mg sin θ) / m = g sin θ.\n"
        "• Time to slide distance s from rest (u = 0):\n"
        "  s = (1/2) a t² = (1/2) (g sin θ) t² ⇒ t = √[ 2s / (g sin θ) ].\n"
        "• Final velocity at base: v² = 2as = 2(g sin θ)s = 2gh (where h = s sin θ is the vertical height).\n"
        "  Notice that the final speed v = √(2gh) depends ONLY on the vertical height h, identical to free fall!",
        "Acceleration down incline a = g sin θ. Speed at base v = √(2gh) depends only on vertical drop."
    )

    docx_styler.add_question(
        doc, 13,
        "Derive the trajectory equation, maximum height, time of flight, and horizontal range for an oblique projectile.",
        "A body is projected with initial velocity u at angle α to horizontal in vacuum (g acting downward):\n"
        "• Velocity components: u_x = u cos α (constant, a_x = 0); u_y = u sin α (a_y = -g).\n"
        "1. Trajectory Equation:\n"
        "   x = (u cos α) t ⇒ t = x / (u cos α).\n"
        "   y = (u sin α) t - (1/2) g t² = u sin α [x / (u cos α)] - (1/2) g [x / (u cos α)]²\n"
        "   y = x tan α - [ g x² / (2 u² cos²α) ]  (Equation of a PARABOLA!).\n"
        "2. Time of Flight (T): Set y = 0 ⇒ T = (2 u sin α) / g.\n"
        "3. Maximum Height (H): At peak, v_y = 0 ⇒ H = (u² sin²α) / (2g).\n"
        "4. Horizontal Range (R): R = u_x · T = (u cos α) · [(2 u sin α) / g] = [ u² (2 sin α cos α) ] / g\n"
        "   R = (u² sin 2α) / g.",
        "Trajectory is parabolic: y = x tan α - gx²/(2u²cos²α). Range R = (u² sin 2α)/g."
    )

    docx_styler.add_question(
        doc, 14,
        "Explain maximum range at 45° and prove that complementary projection angles produce identical horizontal range.",
        "1. Maximum Range: R = (u² sin 2α) / g.\n"
        "   Since maximum value of sin 2α is 1 (which occurs when 2α = 90° ⇒ α = 45°):\n"
        "   R_max = u² / g  (achieved strictly at projection angle α = 45°).\n"
        "2. Complementary Angles Phenomenon:\n"
        "   Consider projection angle α and complementary angle β = 90° - α.\n"
        "   For angle β: R_β = [ u² sin 2(90° - α) ] / g = [ u² sin(180° - 2α) ] / g.\n"
        "   Since sin(180° - 2α) = sin 2α:\n"
        "   R_β = (u² sin 2α) / g = R_α!\n"
        "   Conclusion: Any two complementary launch angles (e.g., 30° and 60°, or 15° and 75°) yield the EXACT SAME horizontal range for the same launch speed u!",
        "Max Range at 45°: R_max = u²/g. Complementary angles α and (90° - α) produce EQUAL range."
    )

    docx_styler.add_question(
        doc, 15,
        "State Newton's Laws of Motion, Linear Momentum, Impulse, and the Work-Energy Theorem.",
        "• Newton's 2nd Law: The rate of change of momentum is proportional to the applied force: F = dp/dt = d(mv)/dt = m a (for constant mass m).\n"
        "• Impulse (J): The product of a large force and the short time interval over which it acts:\n"
        "  J = ∫ F dt = F_avg · Δt = Δp = m v - m u (Impulse equals change in linear momentum!).\n"
        "• Principle of Conservation of Linear Momentum: In the absence of an external net force (∑ F_ext = 0), the total momentum of a system remains strictly constant: m₁ u₁ + m₂ u₂ = m₁ v₁ + m₂ v₂.\n"
        "• Work-Energy Theorem: The net work done by all forces acting on a particle equals the change in its kinetic energy:\n"
        "  W_net = Δ KE = (1/2) m v² - (1/2) m u².",
        "Impulse = Force × time = Change in momentum (Δp). Work done = Change in kinetic energy."
    )

    docx_styler.add_compare_section_header(doc, "7.4", "Dynamics Matrices")
    docx_styler.add_compare_table(
        doc, "Comparison of Projectile Motion Components",
        ["Parameter", "Horizontal Component (X)", "Vertical Component (Y)"],
        [
            ["Initial Velocity", "u_x = u cos α", "u_y = u sin α"],
            ["Acceleration", "a_x = 0 (constant speed)", "a_y = -g (uniformly decelerated/accelerated)"],
            ["Velocity at Time t", "v_x = u cos α (unchanged throughout flight)", "v_y = u sin α - gt (reverses sign at peak)"],
            ["Displacement at Time t", "x = (u cos α) t", "y = (u sin α) t - (1/2) g t²"],
            ["At Maximum Height", "v_x = u cos α (particle never stops moving horizontally!)", "v_y = 0 (instantaneously at rest vertically)"]
        ]
    )

    # ==========================================
    # Professor's Theory & Viva Bank
    # ==========================================
    docx_styler.add_viva_header(doc)

    docx_styler.add_viva_category(doc, "Derive", "deriving formulas & results")
    docx_styler.add_viva_question(
        doc, "Derive", 1,
        "Derive the Newton-Raphson iteration formula xₙ₊₁ = xₙ - f(xₙ)/f'(xₙ) using Taylor series expansion.",
        "Let xₙ be an approximation to root α, and let h be the correction such that α = xₙ + h (so f(xₙ + h) = 0).\n"
        "Expand f(xₙ + h) in a Taylor series about xₙ:\n"
        "f(xₙ + h) = f(xₙ) + h f'(xₙ) + (h²/2!) f''(xₙ) + ... = 0.\n"
        "Assuming h is small, neglect second- and higher-order terms (linear approximation):\n"
        "f(xₙ) + h f'(xₙ) ≈ 0.\n"
        "Solving for h: h ≈ - f(xₙ) / f'(xₙ) (provided f'(xₙ) ≠ 0).\n"
        "The next improved approximation is xₙ₊₁ = xₙ + h = xₙ - [ f(xₙ) / f'(xₙ) ]. Q.E.D."
    )

    docx_styler.add_viva_question(
        doc, "Derive", 2,
        "Derive Lami's Theorem for three coplanar concurrent forces in equilibrium.",
        "Let three forces P, Q, R act at origin O in static equilibrium: P + Q + R = 0.\n"
        "By triangle law of forces, these three vectors can be represented by the sides of a closed triangle ABC taken in order.\n"
        "Let side BC represent P, CA represent Q, and AB represent R.\n"
        "Let α be the angle between Q and R, β between P and R, and γ between P and Q.\n"
        "In the force triangle ABC:\n"
        "Internal angle at A = 180° - α\n"
        "Internal angle at B = 180° - β\n"
        "Internal angle at C = 180° - γ.\n"
        "Applying the Sine Law to triangle ABC:\n"
        "BC / sin A = CA / sin B = AB / sin C\n"
        "⇒ P / sin(180° - α) = Q / sin(180° - β) = R / sin(180° - γ).\n"
        "Since sin(180° - θ) = sin θ:\n"
        "P / sin α = Q / sin β = R / sin γ. Q.E.D."
    )

    docx_styler.add_viva_category(doc, "Explain", "working, principles & viva probing")
    docx_styler.add_viva_question(
        doc, "Explain", 3,
        "Explain why Simpson's 1/3 Rule is exact for cubic polynomials despite being derived using second-degree parabolas.",
        "When approximating ∫₋ₕ⁺ʰ f(x) dx, expand f(x) in a Taylor series about x = 0:\n"
        "f(x) = a₀ + a₁ x + a₂ x² + a₃ x³ + a₄ x⁴ + ...\n"
        "True integral: ∫₋ₕ⁺ʰ f(x) dx = 2a₀ h + (2/3)a₂ h³ + (2/5)a₄ h⁵ + ... (notice odd powers integrate to 0!).\n"
        "Simpson's rule approximation: (h/3) [f(-h) + 4f(0) + f(h)]\n"
        "= (h/3) [ (a₀ - a₁h + a₂h² - a₃h³) + 4a₀ + (a₀ + a₁h + a₂h² + a₃h³) ]\n"
        "= (h/3) [ 6a₀ + 2a₂h² ] = 2a₀ h + (2/3)a₂ h³.\n"
        "Notice that both a₁ x and a₃ x³ terms cancel out completely due to the symmetric placement of the evaluation points!\n"
        "The approximation matches the true integral exactly up through degree 3 (cubic). The first discrepant term is of order h⁵ (from a₄ x⁴), meaning the error is O(h⁴)."
    )

    docx_styler.add_viva_question(
        doc, "Viva", 4,
        "Why does the horizontal velocity of a projectile remain strictly constant throughout its flight in vacuum?",
        "By Newton's First and Second Laws: acceleration requires a net external force in that direction: a_x = F_x / m.\n"
        "In vacuum (neglecting aerodynamic drag), the only force acting on the projectile is gravity, which acts strictly in the VERTICAL direction (towards Earth's center).\n"
        "Because there is zero net force acting along the horizontal direction (F_x = 0), horizontal acceleration a_x = 0.\n"
        "Consequently, the horizontal velocity component remains unchanged: v_x(t) = u cos α = constant."
    )

    docx_styler.add_viva_category(doc, "Numerical", "data & problem-based")
    docx_styler.add_viva_question(
        doc, "Numerical", 5,
        "Estimate ∫₀² x³ dx using Simpson's 1/3 Rule with n = 2 subintervals, and compare with the exact value.",
        "Here a = 0, b = 2, n = 2 subintervals ⇒ h = (b - a)/n = (2 - 0)/2 = 1.\n"
        "Evaluation points:\n"
        "• x₀ = 0 ⇒ y₀ = 0³ = 0\n"
        "• x₁ = 1 ⇒ y₁ = 1³ = 1\n"
        "• x₂ = 2 ⇒ y₂ = 2³ = 8.\n"
        "Simpson's 1/3 Rule formula:\n"
        "I ≈ (h/3) [ y₀ + y₂ + 4 y₁ ] = (1/3) [ 0 + 8 + 4(1) ] = (1/3) [ 12 ] = 4.0.\n"
        "Exact Analytical Value: ∫₀² x³ dx = [ x⁴/4 ]₀² = 2⁴/4 - 0 = 16/4 = 4.0.\n"
        "Conclusion: The Simpson's approximation is 100% EXACT, confirming our theoretical proof that Simpson's rule is exact for degree 3 polynomials!"
    )

    docx_styler.add_viva_question(
        doc, "Numerical", 6,
        "A projectile is launched with velocity 98 m/s at 30° to the horizontal. Calculate time of flight, maximum height, and horizontal range (g = 9.8 m/s²).",
        "Given u = 98 m/s, α = 30°, g = 9.8 m/s².\n"
        "sin 30° = 1/2 = 0.5; cos 30° = √3/2 ≈ 0.866; sin 60° = √3/2.\n"
        "1. Time of Flight: T = (2 u sin α) / g = [ 2(98)(0.5) ] / 9.8 = 98 / 9.8 = 10 seconds.\n"
        "2. Maximum Height: H = (u² sin²α) / (2g) = [ (98)² (0.5)² ] / [ 2(9.8) ] = [ 9604 × 0.25 ] / 19.6 = 2401 / 19.6 = 122.5 meters.\n"
        "3. Horizontal Range: R = (u² sin 2α) / g = [ (98)² sin 60° ] / 9.8 = [ 9604 × (√3/2) ] / 9.8 = 980 × (√3/2) = 490√3 ≈ 848.7 meters."
    )

    # ==========================================
    # Quick-Math Memos
    # ==========================================
    memos = [
        "Bisection: Root bracketed if f(a)f(b) < 0. Error ≤ (b - a)/2ⁿ. Guaranteed linear convergence.",
        "Newton-Raphson: xₙ₊₁ = xₙ - f(xₙ)/f'(xₙ). Quadratic convergence (order 2). Fails if f'(x) = 0.",
        "Trapezoidal: (h/2)[Ends + 2·Middles]. Error O(h²). Exact for linear.",
        "Simpson's 1/3: (h/3)[Ends + 4·Odds + 2·Evens]. Requires n EVEN! Error O(h⁴). Exact up to CUBICS.",
        "Parallelogram of Forces: R = √(P² + Q² + 2PQ cos θ). tan α = (Q sin θ) / (P + Q cos θ).",
        "Lami's Theorem: P / sin α = Q / sin β = R / sin γ (3 coplanar concurrent forces in equilibrium).",
        "Friction: f_L = μ R. tan λ = μ (angle of friction). Angle of repose = angle of friction.",
        "Linear Motion: v = u + at, s = ut + ½at², v² = u² + 2as. n-th second: s_nth = u + (a/2)(2n - 1).",
        "Smooth Incline: Acceleration down plane = g sin θ. Speed at base = √(2gh).",
        "Projectile Motion: Parabolic trajectory y = x tan α - gx²/(2u²cos²α).",
        "Projectile Formulas: T = 2u sin α / g ; H = u² sin²α / 2g ; R = u² sin 2α / g.",
        "Max Range: R_max = u² / g at α = 45°. Complementary angles α and (90° - α) give equal range.",
        "Impulse = F · Δt = Δp (change in momentum). Work-Energy: W_net = Δ KE."
    ]
    docx_styler.add_quick_memos_section(doc, memos)

    target_path = "C:/Users/ASUS/Math_XI_Unit_Docs/Math_XI_Unit_07_computational-mechanics.docx"
    doc.save(target_path)
    print(f"Successfully generated {target_path}")

if __name__ == '__main__':
    build()
