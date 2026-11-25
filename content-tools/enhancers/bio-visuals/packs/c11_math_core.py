# Mathematics class-11 — full enrichment for the 5 table-less files
PART_A = [
    {
        "file": "class-11/mathematics/analytic-geometry/02-angle-bisector-worked-example.json",
        "blocks": [
            {"after": "## 2. Theorem Mirror (as used in the example)",
             "table1": {"title": "Angle-bisector formulas at a glance",
                        "headers": ["Form", "Statement", "When to use"],
                        "rows": [
                            ["Distance form", "$\\dfrac{a_1x+b_1y+c_1}{&#8730;(a_1&#178;+b_1&#178;)} = &#177;\\dfrac{a_2x+b_2y+c_2}{&#8730;(a_2&#178;+b_2&#178;)}$", "always works; pick signs by region"],
                            ["Same-side check", "same sign for both lines on one side", "chooses the internal/external branch"],
                            ["Slope form", "$\\tan&#952; = \\dfrac{m_2&#8722;m_1}{1+m_1m_2}$ with $\\tan&#952; = \\tan(\\952;/2)$", "quick check for the bisector slope"],
                            ["Degenerate case", "$1+m_1m_2 = 0$ &#8594; lines perpendicular", "bisectors become y = x-type after rotation"],
                        ]},
             "table2": {"title": "Worked example sign map",
                        "headers": ["Region", "Sign of L&#8321;", "Sign of L&#8322;", "Bisector equation"],
                        "rows": [
                            ["Inside the acute angle", "+", "+", "use both with +"],
                            ["Outside L&#8321; side", "&#8722;", "+", "flip the first sign"],
                            ["Outside L&#8322; side", "+", "&#8722;", "flip the second sign"],
                            ["Opposite the origin", "&#8722;", "&#8722;", "both negative again"],
                        ]},
             "svg": ("Two bisectors of two intersecting lines",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M120 180 L 520 60\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M120 80 L 520 200\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<path d=\"M120 130 L 520 130\" stroke=\"#991b1b\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                     "<path d=\"M120 130 L 520 10\" stroke=\"#a16207\" stroke-width=\"2\" stroke-dasharray=\"4 5\"/>"
                     "<text x=\"540\" y=\"60\" fill=\"#1d4ed8\">L&#8321;</text>"
                     "<text x=\"540\" y=\"210\" fill=\"#166534\">L&#8322;</text>"
                     "<text x=\"540\" y=\"135\" fill=\"#991b1b\">internal bisector</text>"
                     "<text x=\"540\" y=\"10\" fill=\"#a16207\">external bisector</text>"
                     "</g></svg>"),
            },
            {"after": "## 6. Common Confusions",
             "svg": ("Equal distances from both lines — the defining property",
                     "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M140 160 L 500 60\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M140 180 L 500 200\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<path d=\"M140 170 L 500 130\" stroke=\"#991b1b\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                     "<circle cx=\"380\" cy=\"125\" r=\"5\" fill=\"#111827\"/>"
                     "<path d=\"M380 125 L 380 100\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                     "<path d=\"M380 125 L 380 150\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                     "<text x=\"420\" y=\"95\" fill=\"#6b7280\">d&#8321; = d&#8322;</text>"
                     "</g></svg>"),
            },
        ],
    },
    {
        "file": "class-11/mathematics/analytic-geometry/03-angle-bisector-tan-theta-verification.json",
        "blocks": [
            {"after": "## 2. Theorem Mirror",
             "table1": {"title": "Verification recipe with slopes",
                        "headers": ["Step", "Action", "Check"],
                        "rows": [
                            ["1", "find the bisector slope m", "from the distance-form equation"],
                            ["2", "compute tan&#952;&#8321; with L&#8321;", "$\\tan&#952; = (m&#8722;m_1)/(1+mm_1)$"],
                            ["3", "compute tan&#952;&#8322; with L&#8322;", "same formula with m&#8322;"],
                            ["4", "compare", "tan&#952;&#8321; = &#8722;tan&#952;&#8322; (equal angles)"],
                        ]},
             "table2": {"title": "Sign traps in the tan verification",
                        "headers": ["Situation", "Symptom", "Fix"],
                        "rows": [
                            ["Denominator zero", "$1+mm_1 = 0$", "angle is 90&#176;; use the limiting argument"],
                            ["Wrong branch", "angles equal but supplementary", "you picked the external bisector"],
                            ["Sign slip", "tan&#952;&#8321; = tan&#952;&#8322; instead of negatives", "one angle measured the wrong way"],
                        ]},
             "svg": ("Equal angles on both sides of the bisector",
                     "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M160 170 L 520 70\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M160 190 L 520 190\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<path d=\"M160 180 L 520 130\" stroke=\"#991b1b\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                     "<path d=\"M280 148 A 60 60 0 0 1 300 178\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                     "<path d=\"M300 182 A 60 60 0 0 0 280 152\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                     "<text x=\"350\" y=\"120\" fill=\"#a16207\">&#952;&#8321; = &#952;&#8322;</text>"
                     "</g></svg>"),
            },
            {"after": "## 6. Common Confusions",
             "svg": ("Supplementary vs equal angles — pick the right branch",
                     "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"90\" y=\"60\" width=\"220\" height=\"80\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"200\" y=\"95\" fill=\"#166534\">internal: equal acute angles</text>"
                     "<rect x=\"350\" y=\"60\" width=\"220\" height=\"80\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"460\" y=\"95\" fill=\"#991b1b\">external: supplementary pair</text>"
                     "<text x=\"320\" y=\"180\" fill=\"#6b7280\" font-size=\"12\">tan&#952;&#8321; = &#8722;tan&#952;&#8322; distinguishes the two</text>"
                     "</g></svg>"),
            },
        ],
    },
    {
        "file": "class-11/mathematics/analytic-geometry/03-coordinates-in-space-points-in-space-distance-between-two-points-direction-cosines-and-ratios-of.json",
        "blocks": [
            {"after": "## 2. Theorem Mirror",
             "table1": {"title": "3-D coordinate toolkit",
                        "headers": ["Tool", "Formula", "Notes"],
                        "rows": [
                            ["Distance", "$d = &#8730;((x_2&#8722;x_1)&#178;+(y_2&#8722;y_1)&#178;+(z_2&#8722;z_1)&#178;)$", "Pythagoras twice"],
                            ["Section (internal)", "$\\left(\\dfrac{mx_2+nx_1}{m+n}, \\dfrac{my_2+ny_1}{m+n}, \\dfrac{mz_2+nz_1}{m+n}\\right)$", "ratio m:n"],
                            ["Midpoint", "$\\left(\\dfrac{x_1+x_2}{2}, \\dfrac{y_1+y_2}{2}, \\dfrac{z_1+z_2}{2}\\right)$", "m = n = 1"],
                            ["Direction cosines", "$l = \\cos&#945;, m = \\cos&#946;, n = \\cos&#947;$", "$l&#178;+m&#178;+n&#178; = 1$"],
                            ["Centroid of triangle", "average of the three vertices", "equal weights"],
                        ]},
             "table2": {"title": "Direction cosines of the axes",
                        "headers": ["Axis", "(l, m, n)", "Angles with axes"],
                        "rows": [
                            ["x-axis", "(1, 0, 0)", "0&#176;, 90&#176;, 90&#176;"],
                            ["y-axis", "(0, 1, 0)", "90&#176;, 0&#176;, 90&#176;"],
                            ["z-axis", "(0, 0, 1)", "90&#176;, 90&#176;, 0&#176;"],
                            ["Any line", "$l&#178;+m&#178;+n&#178; = 1$", "never all zero"],
                        ]},
             "svg": ("A point in space and its direction angles",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M140 200 L 480 200\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<path d=\"M140 200 L 140 60\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<path d=\"M140 200 L 320 240\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<circle cx=\"380\" cy=\"110\" r=\"7\" fill=\"#991b1b\"/>"
                     "<path d=\"M140 200 L 380 110\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<text x=\"500\" y=\"205\" fill=\"#374151\">x</text>"
                     "<text x=\"140\" y=\"50\" fill=\"#374151\">z</text>"
                     "<text x=\"330\" y=\"255\" fill=\"#374151\">y</text>"
                     "<text x=\"300\" y=\"90\" fill=\"#991b1b\">P(x, y, z)</text>"
                     "<text x=\"240\" y=\"170\" fill=\"#1d4ed8\">OP = r</text>"
                     "</g></svg>"),
            },
            {"after": "## 6. Common Confusions",
             "svg": ("Direction cosines satisfy l² + m² + n² = 1",
                     "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"320\" cy=\"95\" r=\"60\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M320 95 L 380 95\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<path d=\"M320 95 L 295 45\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<path d=\"M320 95 L 280 135\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<text x=\"320\" y=\"185\" fill=\"#374151\">l&#178; + m&#178; + n&#178; = 1 (always)</text>"
                     "</g></svg>"),
            },
        ],
    },
    {
        "file": "class-11/mathematics/calculus/07-continuity-of-a-function.json",
        "blocks": [
            {"after": "## 2. Theorem Mirror",
             "table1": {"title": "The three-part continuity test at x = a",
                        "headers": ["Condition", "Meaning", "Failure mode"],
                        "rows": [
                            ["f(a) exists", "the point is defined", "hole or vertical asymptote"],
                            ["lim(x&#8594;a) f(x) exists", "both one-sided limits agree", "jump discontinuity"],
                            ["limit = f(a)", "the value matches the limit", "removable hole at (a, f(a))"],
                        ]},
             "table2": {"title": "Discontinuity types",
                        "headers": ["Type", "Signature", "Example"],
                        "rows": [
                            ["Removable", "limit exists, value missing or wrong", "f(x) = (x&#178;&#8722;1)/(x&#8722;1) at x = 1"],
                            ["Jump", "one-sided limits differ", "floor function, sign function"],
                            ["Infinite", "function blows up", "1/x at x = 0"],
                            ["Oscillating", "no limit from either side", "sin(1/x) at x = 0"],
                        ]},
             "svg": ("Removable hole vs jump discontinuity",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M100 80 C 200 100, 260 130, 320 150 C 380 170, 440 190, 540 205\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<circle cx=\"320\" cy=\"150\" r=\"6\" fill=\"#ffffff\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<text x=\"320\" y=\"130\" fill=\"#1d4ed8\">removable hole</text>"
                     "<path d=\"M380 60 L 500 60\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M380 180 L 500 180\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<circle cx=\"380\" cy=\"60\" r=\"5\" fill=\"#166534\"/>"
                     "<circle cx=\"380\" cy=\"180\" r=\"5\" fill=\"#166534\"/>"
                     "<text x=\"440\" y=\"215\" fill=\"#166534\">jump</text>"
                     "</g></svg>"),
            },
            {"after": "## 6. Common Confusions",
             "svg": ("Defined but discontinuous: the sign function",
                     "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M120 70 L 320 70\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M320 140 L 520 140\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<circle cx=\"320\" cy=\"70\" r=\"5\" fill=\"#1d4ed8\"/>"
                     "<circle cx=\"320\" cy=\"140\" r=\"5\" fill=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"180\" fill=\"#6b7280\" font-size=\"12\">sgn(0) = 0 is defined, yet the limit does not exist</text>"
                     "</g></svg>"),
            },
        ],
    },
    {
        "file": "class-11/mathematics/calculus/13-higher-order-derivatives.json",
        "blocks": [
            {"after": "## 2. Theorem Mirror",
             "table1": {"title": "Repeated derivatives of standard functions",
                        "headers": ["f(x)", "f&#8242;(x)", "f&#8243;(x)", "nth derivative"],
                        "rows": [
                            ["x&#8319;", "n x&#8319;&#8315;&#185;", "n(n&#8722;1)x&#8319;&#8315;&#178;", "n! pattern"],
                            ["e^(ax)", "a e^(ax)", "a&#178; e^(ax)", "a&#8319; e^(ax)"],
                            ["sin ax", "a cos ax", "&#8722;a&#178; sin ax", "a&#8319; sin(ax + n&#960;/2)"],
                            ["cos ax", "&#8722;a sin ax", "&#8722;a&#178; cos ax", "a&#8319; cos(ax + n&#960;/2)"],
                            ["ln x", "1/x", "&#8722;1/x&#178;", "(&#8722;1)^(n&#8722;1)(n&#8722;1)!/x&#8319;"],
                        ]},
             "table2": {"title": "What each order of derivative measures",
                        "headers": ["Order", "Name", "Physical meaning"],
                        "rows": [
                            ["f&#8242;(x)", "first derivative", "rate of change (velocity)"],
                            ["f&#8243;(x)", "second derivative", "concavity (acceleration)"],
                            ["f&#8243;(x) &gt; 0", "convex up", "minimum possible"],
                            ["f&#8243;(x) &lt; 0", "concave down", "maximum possible"],
                            ["f&#8243;(x) = 0", "possible inflection", "check sign change around the point"],
                        ]},
             "svg": ("Second derivative reads the concavity",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M100 70 C 200 70, 280 190, 380 190 C 460 190, 520 120, 560 90\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"180\" y=\"55\" fill=\"#991b1b\">f&#8243; &lt; 0 (concave down)</text>"
                     "<text x=\"470\" y=\"215\" fill=\"#166534\">f&#8243; &gt; 0 (concave up)</text>"
                     "<circle cx=\"380\" cy=\"190\" r=\"5\" fill=\"#a16207\"/>"
                     "<text x=\"380\" y=\"215\" fill=\"#a16207\">inflection: f&#8243; = 0</text>"
                     "</g></svg>"),
            },
            {"after": "## 6. Common Confusions",
             "svg": ("d²y/dx² is differentiation twice, not squaring",
                     "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"110\" y=\"60\" width=\"200\" height=\"80\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"210\" y=\"95\" fill=\"#166534\">d&#178;y/dx&#178; = d/dx(dy/dx)</text>"
                     "<rect x=\"350\" y=\"60\" width=\"200\" height=\"80\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"450\" y=\"95\" fill=\"#991b1b\">NOT (dy/dx)&#178;</text>"
                     "<text x=\"320\" y=\"180\" fill=\"#6b7280\" font-size=\"12\">the superscript counts the operators, not a power of the result</text>"
                     "</g></svg>"),
            },
        ],
    },
]
TOPICS = list(PART_A)
