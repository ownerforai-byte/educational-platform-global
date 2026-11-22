/**
 * Unit 7 — Computational Methods and Mechanics: NEB model paper (75 marks, 3 hours).
 * A: [question, [4 options], answerIndex, why?] · B/C: [question, worked answer, answer line]
 */

export const PAPERS = [
  {
    unitNo: 7,
    title: "Unit 7 — Computational Methods and Mechanics",
    note: "Numerical answers need the iteration table or the rule written out with weights; mechanics answers need the resolved components or the equation each stage uses.",
    A: [
      ["The bisection method can be started on [a, b] only when", ["f(a) = f(b)", "f(a)f(b) < 0", "f(a)f(b) > 0", "f′(x) = 0"], 2, "a sign change guarantees a root for continuous f"],
      ["In Newton–Raphson, x₁ equals", ["x₀ + f(x₀)/f′(x₀)", "x₀ − f(x₀)/f′(x₀)", "x₀ − f′(x₀)/f(x₀)", "x₀ + f′(x₀)"], 2, "x₁ = x₀ − f(x₀)/f′(x₀)"],
      ["The error of the trapezoidal rule is proportional to", ["h", "h²", "h³", "h⁴"], 2, "error ≈ h²(b − a)f″/12"],
      ["Simpson's rule needs the number of strips to be", ["odd", "even", "prime", "any"], 2, "strips are paired, so the count must be even"],
      ["Two forces of 3 N and 4 N act at right angles. Their resultant is", ["1 N", "5 N", "7 N", "12 N"], 2, "√(9 + 16) = 5"],
      ["Three concurrent forces keep a particle in equilibrium. They must be", ["parallel", "coplanar and form a closed triangle", "perpendicular", "equal in magnitude"], 2, "zero resultant means zero vector sum"],
      ["A body starts from rest with a = 2 m/s². Its velocity after 3 s is", ["2 m/s", "5 m/s", "6 m/s", "9 m/s"], 3, "v = u + at = 6"],
      ["The distance fallen from rest in time t is", ["ut", "gt", "½gt²", "u²/2g"], 3, "s = ½gt² when u = 0"],
      ["Lami's theorem applies to", ["two forces", "three concurrent forces in equilibrium", "any number of forces", "parallel forces only"], 2, "each force is proportional to the sine of the opposite angle"],
      ["Newton–Raphson normally shows", ["linear convergence", "quadratic convergence", "no convergence", "slower convergence than bisection"], 2, "the error roughly squares at each step"],
      ["Starting at x₀ = 1.5 for x² − 2 = 0, one Newton step gives", ["1.4167", "1.5000", "1.3333", "1.2500"], 1, "(1.5 + 2/1.5)/2 = 1.41667"],
    ],
    B: [
      [
        "Show that x³ − 4x − 9 = 0 has a root between 2 and 3.",
        "1. f(2) = 8 − 8 − 9 = −9\n2. f(3) = 27 − 12 − 9 = 6\n3. the signs are opposite and f is a polynomial, hence continuous\n4. by the intermediate value theorem a root lies in (2, 3)",
        "f(2) < 0 < f(3), so the root lies in (2, 3)",
      ],
      [
        "Apply one Newton–Raphson step to x² − 5 = 0 from x₀ = 2.5.",
        "1. x₁ = (x₀ + 5/x₀)/2\n2. = (2.5 + 2)/2\n3. = 4.5/2",
        "x₁ = 2.25",
      ],
      [
        "Estimate ∫₀² x² dx by the trapezoidal rule with h = 1 and compare with the exact value.",
        "1. ordinates 0, 1, 4\n2. T = (1/2)[0 + 4 + 2(1)]\n3. = 3\n4. exact = [x³/3]₀² = 8/3 ≈ 2.667",
        "T = 3 against the exact 8/3 — an overestimate of about 0.33",
      ],
      [
        "Estimate ∫₀² x² dx by Simpson's rule with h = 1 and comment on the result.",
        "1. ordinates 0, 1, 4 with weights 1, 4, 1\n2. S = (1/3)[0 + 4 + 4(1)]\n3. = 8/3",
        "S = 8/3, exactly the true value — the rule is exact for quadratics",
      ],
      [
        "Find the resultant of two forces of 5 N each acting at 60°.",
        "1. R = √(25 + 25 + 2(25)cos60°)\n2. = √(50 + 25)\n3. = √75 = 5√3",
        "R = 5√3 ≈ 8.66 N, along the bisector of the angle",
      ],
      [
        "A body starts from rest with uniform acceleration 4 m/s². Find its velocity and the distance covered after 5 s.",
        "1. v = 0 + 4(5) = 20 m/s\n2. s = ½(4)(25)",
        "v = 20 m/s, s = 50 m",
      ],
      [
        "A car at 15 m/s comes to rest in 22.5 m. Find its retardation.",
        "1. v² = u² + 2as with v = 0\n2. 0 = 225 + 45a\n3. a = −5 m/s²",
        "retardation 5 m/s²",
      ],
      [
        "Forces of 3 N and 4 N act at right angles. Find the third force that keeps the point in equilibrium.",
        "1. resultant of 3 N and 4 N: R = √(9 + 16) = 5 N\n2. the equilibrant is equal in magnitude and opposite in direction\n3. its direction makes tan⁻¹(4/3) ≈ 53.13° with the 3 N force, on the other side",
        "5 N opposite to the resultant",
      ],
    ],
    C: [
      [
        "Perform three bisection steps on x³ − 9x + 1 = 0 in [2, 3] and state the resulting bracket.",
        "1. f(2) = 8 − 18 + 1 = −9, f(3) = 27 − 27 + 1 = 1 ⇒ root in (2, 3)\n2. x₁ = 2.5, f = 15.625 − 22.5 + 1 = −5.875 < 0 ⇒ [2.5, 3]\n3. x₂ = 2.75, f = 20.797 − 24.75 + 1 = −2.953 < 0 ⇒ [2.75, 3]\n4. x₃ = 2.875, f = 23.764 − 25.875 + 1 = −1.111 < 0 ⇒ [2.875, 3]\n5. error bound after 3 steps = 1/8 = 0.125\n6. estimate of the root ≈ 2.94",
        "bracket [2.875, 3], root ≈ 2.94 with error ≤ 0.125",
      ],
      [
        "Estimate ∫₀² x³ dx by the trapezoidal rule and by Simpson's rule with h = 0.5, and compare both with the exact value.",
        "1. ordinates: 0, 0.125, 1, 3.375, 8\n2. trapezoidal: (0.5/2)[0 + 8 + 2(0.125 + 1 + 3.375)] = 0.25(17) = 4.25\n3. Simpson: (0.5/3)[0 + 8 + 4(0.125 + 3.375) + 2(1)] = (1/6)(24) = 4\n4. exact: [x⁴/4]₀² = 4\n5. the trapezoidal rule overestimates by 0.25\n6. Simpson's rule is exact, as it is for every cubic",
        "trapezoidal 4.25, Simpson 4.00, exact 4 — Simpson is exact for cubics",
      ],
      [
        "(a) A body of weight 100 N hangs from two strings that each make 45° with the vertical. Find the tension in each string.\n(b) A stone is dropped from a tower 80 m high (g = 10 m/s²). Find the time of fall and the velocity on impact.",
        "1. (a) by symmetry the tensions are equal, T\n2. vertical equilibrium: 2T cos45° = 100\n3. T = 100/(2 × 0.7071) = 50√2\n4. (b) 80 = ½(10)t² ⇒ t² = 16 ⇒ t = 4 s\n5. v = gt = 10(4) = 40 m/s\n6. check: v = √(2gs) = √1600 = 40 ✓",
        "(a) T = 50√2 ≈ 70.7 N in each string  (b) t = 4 s, v = 40 m/s",
      ],
    ],
  },
];
